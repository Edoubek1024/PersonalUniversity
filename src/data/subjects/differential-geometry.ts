import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/** Builds a resource from a shared source, so each lesson only says which part to use and why. */
const source =
  (base: Omit<ResourceInput, 'note' | 'primary'>) =>
  (note: string, primary = false): ResourceInput => ({ ...base, note, ...(primary ? { primary } : {}) });

const wikipedia = (title: string, page: string) =>
  source({ title, url: 'https://en.wikipedia.org/wiki/' + page, type: 'article', cost: 'free', provider: 'Wikipedia' });
const mathWorld = (title: string, page: string) =>
  source({ title, url: 'https://mathworld.wolfram.com/' + page + '.html', type: 'article', cost: 'free', provider: 'Wolfram MathWorld' });

const mit18950 = source({
  title: 'MIT 18.950 Differential Geometry: lecture notes',
  url: 'https://ocw.mit.edu/courses/18-950-differential-geometry-fall-2008/pages/lecture-notes/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
});
const craneNotes = source({
  title: 'Crane, Discrete Differential Geometry: An Applied Introduction',
  url: 'https://www.cs.cmu.edu/~kmcrane/Projects/DDG/paper.pdf',
  type: 'textbook',
  cost: 'free',
  provider: 'Carnegie Mellon University',
});
const craneLectures = source({
  title: 'Crane, Discrete Differential Geometry lectures (CMU 15-458/858)',
  url: 'https://www.youtube.com/playlist?list=PL9_jI1bdZmz0hIrNCMQW1YmZysAiIYSSS',
  type: 'lecture',
  cost: 'free',
  provider: 'Carnegie Mellon University',
});
const sjamaar = source({
  title: 'Sjamaar, Manifolds and Differential Forms',
  url: 'https://pi.math.cornell.edu/~sjamaar/manifolds/manifold.pdf',
  type: 'textbook',
  cost: 'free',
  provider: 'Cornell University',
});
const taoForms = source({
  title: 'Tao, Differential Forms and Integration',
  url: 'https://www.math.ucla.edu/~tao/preprints/forms.pdf',
  type: 'article',
  cost: 'free',
  provider: 'UCLA',
});
const gaussPaper = source({
  title: 'Gauss, General Investigations of Curved Surfaces',
  url: 'https://www.gutenberg.org/ebooks/36856',
  type: 'textbook',
  cost: 'free',
  provider: 'Project Gutenberg',
});
const sympyDocs = source({
  title: 'SymPy documentation',
  url: 'https://docs.sympy.org/latest/index.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SymPy',
});
const surfaceGallery = source({
  title: '3DXM Virtual Math Museum: surface galleries',
  url: 'https://virtualmathmuseum.org/Surface/gallery_m.html',
  type: 'interactive',
  cost: 'free',
  provider: 'Virtual Math Museum',
});

export default defineSubject({
  id: 'differential-geometry',
  title: 'Differential Geometry',
  category: 'math',
  tagline:
    'Curvature of curves and surfaces, from the Frenet frame to the Gauss-Bonnet theorem and moving frames.',
  description: `This course follows the topics in the public catalog description of University of Illinois MATH 423, Differential Geometry: the application of calculus to the shape and curvature of curves and surfaces, with an introduction to vector fields, differential forms on Euclidean spaces and the method of moving frames. It is an original course written for self-study. It is not affiliated with or endorsed by the University of Illinois, and it does not reproduce any course's or textbook's materials.

The course asks how to measure shape with calculus. You start with curves, where curvature and torsion turn out to determine a curve completely. Then you move to surfaces, measure lengths and areas with the first fundamental form, and bend into space with the second. The central surprise comes in Module 4: Gauss's Theorema Egregium says that one kind of curvature can be measured by a creature living inside the surface, without any reference to the surrounding space. The Gauss-Bonnet theorem then ties that local curvature to a global number, the Euler characteristic, which only knows the topology of the surface.

Most exercises are proofs, and proofs here are short computations guided by a clear idea. The remaining exercises are explicit calculations, and you are expected to check them with SymPy. Sign conventions in this subject vary from one book to another, so each lesson states the convention it uses. When you read other sources, check theirs first. In particular, this course uses $\\mathbf{B}'=-\\tau\\mathbf{N}$ for torsion and $S=-d\\mathbf{n}$ for the shape operator.

You need multivariable calculus and linear algebra: the chain rule, the inverse function theorem as a statement, determinants, eigenvalues of symmetric matrices. The last module rewrites much of this in the language of differential forms, which is the language of modern geometry and of general relativity.`,
  difficulty: 'advanced',
  estimatedHours: 70,
  prerequisites: ['calculus-3', 'linear-algebra-computational'],
  recommendedBackground: [
    'Writing short proofs',
    'Green\'s theorem and surface integrals',
    'Basic Python, with SymPy for symbolic checks and SciPy for solving differential equations',
  ],
  tags: ['geometry', 'curves', 'surfaces', 'curvature', 'gauss-bonnet', 'differential forms', 'moving frames'],
  core: false,
  modules: [
    {
      slug: 'curves',
      title: 'Curves',
      description:
        'Arc length, curvature and torsion, the Frenet frame, the fundamental theorem of curves, and a first taste of global results for closed curves.',
      lessons: [
        {
          slug: 'parametrized-curves',
          title: 'Parametrized curves and arc length',
          summary:
            'A curve is a map, not just a set of points. Arc length gives every regular curve a natural parameter, which makes the geometry independent of how you trace it.',
          estimatedMinutes: 100,
          objectives: [
            'Define a regular parametrized curve',
            'Compute arc length and prove that it does not depend on the parametrization',
            'Reparametrize a regular curve by arc length',
            'Use the fact that a unit vector function is perpendicular to its derivative',
          ],
          concepts: [
            'Parametrized curve',
            'Regular curve',
            'Arc length',
            'Reparametrization',
            'Unit-speed curve',
          ],
          explanation: `A **parametrized curve** is a smooth map $\\gamma:I\\to\\mathbb{R}^n$ on an interval $I$. Here smooth means infinitely differentiable, which is more than we need, but it saves stating orders of differentiability. The curve is **regular** if $\\gamma'(t)\\ne0$ for all $t$. Regularity excludes stopping and turning back. The map $t\\mapsto(t^2,t^3)$ is smooth, yet its image has a cusp at the origin, exactly where $\\gamma'(0)=0$.

The **arc length** from $t_0$ to $t$ is
$$s(t)=\\int_{t_0}^t|\\gamma'(u)|\\,du.$$
This does not depend on the parametrization. If $t=\\phi(w)$ with $\\phi'\\neq 0$, then the chain rule and substitution give the same integral, and the sign of $\\phi'$ is absorbed by the swapped limits. So length belongs to the geometric curve, not the way it is traced.

For a regular curve, $s'(t)=|\\gamma'(t)|>0$, so $s$ has a smooth inverse $t(s)$. Then $\\tilde\\gamma(s)=\\gamma(t(s))$ has $|\\tilde\\gamma'(s)|=1$. Such a curve is **unit speed**. Every regular curve has a unit-speed reparametrization, unique up to a shift and a reversal of direction, so we may assume unit speed whenever we prove theorems. In practice the integral often cannot be done in closed form, as for an ellipse. This is why we also need formulas in an arbitrary parameter.

One small lemma gets used constantly. If $|V(t)|$ is constant, then differentiating $V\\cdot V$ gives $V\\cdot V'=0$. So on a unit-speed curve, $\\gamma''$ is perpendicular to $\\gamma'$.

**Worked example.** Take the helix $\\gamma(t)=(a\\cos t,a\\sin t,bt)$ with $a>0$. Then $\\gamma'(t)=(-a\\sin t,a\\cos t,b)$, so
$$|\\gamma'(t)|=\\sqrt{a^2+b^2}=:c,$$
a constant. From $t=0$, the arc length is $s=ct$. So $t=s/c$, and the unit-speed form is
$$\\tilde\\gamma(s)=\\big(a\\cos(s/c),\\,a\\sin(s/c),\\,bs/c\\big).$$
Checking: $|\\tilde\\gamma'|^2=(a^2+b^2)/c^2=1$. One full turn has length $2\\pi c$, which is the hypotenuse of a right triangle with legs $2\\pi a$ and $2\\pi b$. You can see why by unrolling the cylinder into a plane, which turns the helix into a straight line.`,
          resources: [
            mit18950('Start with the first part of the notes, on the local geometry of plane curves.', true),
            {
              title: 'OpenStax Calculus Volume 3',
              url: 'https://openstax.org/details/books/calculus-volume-3',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'A review of arc length and vector-valued functions, if you need one.',
            },
          ],
          exercises: [
            {
              slug: 'arc-length-invariance',
              title: 'Arc length is geometric',
              prompt: `Let $\\phi:[c,d]\\to[a,b]$ be a smooth bijection with $\\phi'\\neq 0$ everywhere, and let $\\tilde\\gamma=\\gamma\\circ\\phi$. Prove that the lengths of $\\gamma$ on $[a,b]$ and of $\\tilde\\gamma$ on $[c,d]$ are equal. Treat increasing and decreasing $\\phi$ separately.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'straight-lines-are-shortest',
              title: 'Lines are shortest',
              prompt: `Let $\\gamma:[a,b]\\to\\mathbb{R}^n$ be a smooth curve from $p$ to $q\\ne p$. Prove that its length is at least $|q-p|$, with equality if and only if $\\gamma$ traces the segment from $p$ to $q$ monotonically. Use the unit vector $w=(q-p)/|q-p|$ and $\\gamma'\\cdot w\\le|\\gamma'|$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cycloid-arch',
              title: 'An arch of a cycloid',
              prompt: `For the cycloid $\\gamma(t)=a(t-\\sin t,1-\\cos t)$ with $a>0$, find where it fails to be regular, and describe the image there. Show the speed is $2a|\\sin(t/2)|$, and find the length of one arch.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Not regular at $t=2\\pi k$. The length is $8a$.',
            },
            {
              slug: 'finite-length-spiral',
              title: 'Infinitely many turns, finite length',
              prompt: `For $\\gamma(t)=e^{-t}(\\cos t,\\sin t)$ with $t\\ge0$, show the total length is $\\sqrt2$, although the curve winds around the origin infinitely often. Find the arc length parametrization measured from the origin end. Show that the angle between $\\gamma$ and $\\gamma'$ is constant.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The speed is $\\sqrt2\\,e^{-t}$. The angle between position and velocity is $3\\pi/4$ here.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a unit-speed curve have $\\gamma\'\\cdot\\gamma\'\'=0$?',
              answerOutline: 'Differentiate $\\gamma\'\\cdot\\gamma\'=1$.',
            },
            {
              question: 'Give a smooth curve whose image is not smooth, and say why regularity excludes it.',
              answerOutline: '$(t^2,t^3)$ has a cusp at the origin, where its velocity is zero.',
            },
            {
              question: 'Why is the arc length parameter often unavailable in closed form?',
              answerOutline: 'The integral of the speed may not be elementary, as for the ellipse, and even if it is, inverting $s(t)$ may not be possible.',
            },
          ],
          relatedLessons: ['math-methods/vector-calculus/line-and-surface-integrals'],
        },
        {
          slug: 'curvature',
          title: 'Curvature',
          summary:
            'Curvature is the rate at which the tangent direction turns per unit length. In the plane it has a sign and determines the curve.',
          estimatedMinutes: 100,
          objectives: [
            'Define curvature for a unit-speed curve and derive the formula for any parametrization',
            'Compute signed curvature of plane curves',
            'Relate signed curvature to the tangent angle',
            'Describe the osculating circle',
          ],
          concepts: [
            'Curvature',
            'Signed curvature',
            'Tangent angle',
            'Osculating circle',
            'Radius of curvature',
          ],
          explanation: `For a unit-speed curve, the **unit tangent** is $\\mathbf{T}=\\gamma'$, and the **curvature** is
$$\\kappa(s)=|\\mathbf{T}'(s)|=|\\gamma''(s)|.$$
It measures how fast the direction turns per unit of length, so it does not depend on the speed of tracing. A line has $\\kappa\\equiv0$, and a circle of radius $r$ has $\\kappa\\equiv1/r$. In fact, $\\kappa\\equiv0$ forces a line, because then $\\gamma'$ is constant.

For a regular curve in $\\mathbb{R}^3$ with any parameter $t$, the chain rule gives
$$\\kappa=\\frac{|\\gamma'\\times\\gamma''|}{|\\gamma'|^3}.$$
The derivation: write $\\gamma'=v\\mathbf{T}$, with $v$ the speed, so $\\gamma''=v'\\mathbf{T}+v^2\\kappa\\mathbf{N}$, where $\\mathbf{N}$ is the unit normal defined below. Then the cross product kills the $\\mathbf{T}$ term.

**In the plane**, you can give curvature a sign. Let $J$ be rotation by $+90^\\circ$, and let $\\mathbf{N}_s=J\\mathbf{T}$. Since $\\mathbf{T}'\\perp\\mathbf{T}$, we have $\\mathbf{T}'=\\kappa_s\\mathbf{N}_s$ for a function $\\kappa_s$, the **signed curvature**. It is positive when the curve turns left. For $\\gamma(t)=(x(t),y(t))$,
$$\\kappa_s=\\frac{x'y''-y'x''}{(x'^2+y'^2)^{3/2}}.$$
If $\\theta(s)$ is the angle of $\\mathbf{T}$ with the $x$-axis, then $\\mathbf{T}=(\\cos\\theta,\\sin\\theta)$ and differentiating gives $\\kappa_s=\\theta'(s)$. So signed curvature is literally the turning rate, and you can recover a plane curve from it by integrating twice: first $\\theta$, then $\\gamma$.

The **osculating circle** at a point with $\\kappa>0$ is the circle of radius $1/\\kappa$, tangent to the curve, on the side of $\\mathbf{N}$. It is the best-fitting circle, agreeing with the curve to second order.

**Worked example.** Take the ellipse $\\gamma(t)=(a\\cos t,b\\sin t)$ with $a>b>0$. Then $x'=-a\\sin t$, $y'=b\\cos t$, $x''=-a\\cos t$, $y''=-b\\sin t$, so $x'y''-y'x''=ab(\\sin^2t+\\cos^2t)=ab$. Thus
$$\\kappa_s(t)=\\frac{ab}{(a^2\\sin^2t+b^2\\cos^2t)^{3/2}}.$$
At the end of the long axis, $t=0$, this gives $\\kappa=a/b^2$, the maximum. At $t=\\pi/2$ it gives $b/a^2$, the minimum. For $a=b=r$ you recover $1/r$. A positive sign everywhere is what you expect from a counterclockwise convex curve.`,
          resources: [
            mit18950('The notes on plane curves develop curvature through the tangent angle.', true),
            mathWorld('Curvature', 'Curvature')('Collects the formulas in different parametrizations.'),
          ],
          exercises: [
            {
              slug: 'curvature-formula',
              title: 'The general curvature formula',
              prompt: `Prove $\\kappa=|\\gamma'\\times\\gamma''|/|\\gamma'|^3$ for a regular curve in $\\mathbb{R}^3$, starting from the unit-speed definition and the chain rule. Deduce the plane formula for $|\\kappa_s|$ by embedding the plane in $\\mathbb{R}^3$.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'constant-curvature-plane',
              title: 'Constant curvature in the plane',
              prompt: `Let $\\gamma$ be a unit-speed plane curve with $\\kappa_s\\equiv c\\neq0$. Show that $\\gamma+\\frac1c\\mathbf{N}_s$ is constant, and conclude that $\\gamma$ lies on a circle of radius $1/|c|$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'graphs',
              title: 'Curvature of graphs',
              prompt: `For the graph $y=f(x)$ traced left to right, show $\\kappa_s=f''/(1+f'^2)^{3/2}$. Find the maximum curvature of $y=x^2$, and show that the catenary $y=\\cosh x$ has $\\kappa_s=1/\\cosh^2x$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'The parabola has maximum curvature 2, at the vertex.',
            },
            {
              slug: 'euler-spiral',
              title: 'The Euler spiral',
              prompt: `Find the unit-speed plane curve with $\\gamma(0)=0$, $\\mathbf{T}(0)=(1,0)$ and $\\kappa_s(s)=s$. Express it with Fresnel-type integrals, plot it for $s\\in[-8,8]$, and show that it spirals into the point $(\\sqrt\\pi/2,\\sqrt\\pi/2)$ as $s\\to\\infty$. Explain why road and railway designers use this curve for transitions.`,
              kind: 'simulation',
              difficulty: 2,
              hint: '$\\theta=s^2/2$, and $\\int_0^\\infty\\cos(s^2/2)\\,ds=\\sqrt\\pi/2$. Curvature, and thus sideways acceleration at constant speed, changes linearly with distance.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the sign of $\\kappa_s$ depend on?',
              answerOutline: 'The direction of travel and the orientation of the plane. Reversing the curve flips the sign.',
            },
            {
              question: 'Why does a space curve have no signed curvature in general?',
              answerOutline: 'There is no single normal direction to compare with, since the normal plane has dimension 2. Only $|\\mathbf{T}\'|$ is defined.',
            },
            {
              question: 'What is the radius of the osculating circle of $y=x^2$ at the vertex?',
              answerOutline: '$1/\\kappa=1/2$.',
            },
          ],
        },
        {
          slug: 'frenet-frame',
          title: 'Torsion and the Frenet frame',
          summary:
            'Where curvature is positive, a space curve carries a moving orthonormal frame. Its derivatives are given by curvature and torsion alone.',
          estimatedMinutes: 110,
          objectives: [
            'Define the Frenet frame and state where it exists',
            'Derive the Frenet equations',
            'Compute torsion with the determinant formula',
            'Interpret torsion as the failure of a curve to stay in a plane',
          ],
          concepts: [
            'Principal normal',
            'Binormal',
            'Frenet frame',
            'Torsion',
            'Frenet equations',
            'Osculating plane',
          ],
          explanation: `Let $\\gamma$ be unit speed with $\\kappa>0$. Define the **principal normal** $\\mathbf{N}=\\mathbf{T}'/\\kappa$ and the **binormal** $\\mathbf{B}=\\mathbf{T}\\times\\mathbf{N}$. Then $(\\mathbf{T},\\mathbf{N},\\mathbf{B})$ is a right-handed orthonormal frame at each point. It does not exist where $\\kappa=0$, since $\\mathbf{N}$ is undefined there.

Now differentiate. Because $\\mathbf{B}\\cdot\\mathbf{B}=1$, we get $\\mathbf{B}'\\perp\\mathbf{B}$. Because $\\mathbf{B}\\cdot\\mathbf{T}=0$, we get $\\mathbf{B}'\\cdot\\mathbf{T}=-\\mathbf{B}\\cdot\\mathbf{T}'=-\\kappa\\mathbf{B}\\cdot\\mathbf{N}=0$. So $\\mathbf{B}'$ is a multiple of $\\mathbf{N}$, and the **torsion** $\\tau$ is defined by $\\mathbf{B}'=-\\tau\\mathbf{N}$. The **Frenet equations** are
$$\\mathbf{T}'=\\kappa\\mathbf{N},\\qquad\\mathbf{N}'=-\\kappa\\mathbf{T}+\\tau\\mathbf{B},\\qquad\\mathbf{B}'=-\\tau\\mathbf{N}.$$
The coefficient matrix is skew-symmetric, as it must be for a frame that stays orthonormal.

**Sign convention.** With this choice a right-handed helix has $\\tau>0$. Some books, including do Carmo's, use $\\mathbf{B}'=\\tau\\mathbf{N}$, which reverses the sign of $\\tau$. Always check.

The binormal is the normal of the **osculating plane**, spanned by $\\mathbf{T}$ and $\\mathbf{N}$. So $\\tau$ measures how fast that plane twists about the tangent. In a regular curve with $\\kappa>0$, $\\tau\\equiv0$ exactly when the curve lies in a plane.

For any parameter, where $\\gamma'\\times\\gamma''\\ne0$,
$$\\tau=\\frac{\\det(\\gamma',\\gamma'',\\gamma''')}{|\\gamma'\\times\\gamma''|^2}.$$

**Worked example.** Compute for the helix $\\gamma(t)=(a\\cos t,a\\sin t,bt)$, $a>0$, $b\\neq 0$, using $c^2=a^2+b^2$. In unit speed, $\\mathbf{T}=\\frac1c(-a\\sin t,a\\cos t,b)$ with $t=s/c$, so
$$\\mathbf{T}'=-\\frac{a}{c^2}(\\cos t,\\sin t,0).$$
Thus $\\kappa=a/c^2$ and $\\mathbf{N}=-(\\cos t,\\sin t,0)$, pointing at the axis. Taking the cross product,
$$\\mathbf{B}=\\mathbf{T}\\times\\mathbf{N}=\\frac1c(b\\sin t,-b\\cos t,a).$$
Differentiating, $\\mathbf{B}'=\\frac{b}{c^2}(\\cos t,\\sin t,0)=-\\frac{b}{c^2}\\mathbf{N}$. So
$$\\kappa=\\frac{a}{a^2+b^2},\\qquad\\tau=\\frac{b}{a^2+b^2}.$$
Both are constant. For $b>0$ the helix is right-handed and $\\tau>0$, and replacing $b$ by $-b$ reverses $\\tau$ while keeping $\\kappa$. As $b\\to0$ you recover a circle with $\\tau=0$. Curves with constant $\\kappa>0$ and constant $\\tau$ are exactly the circles and helices, which the next lesson will prove.`,
          resources: [
            wikipedia('Frenet-Serret formulas', 'Frenet%E2%80%93Serret_formulas')('A reference for the equations. Check the sign convention against this lesson.', true),
            mathWorld('Torsion', 'Torsion')('Formulas for torsion under various parametrizations.'),
            sympyDocs('Use Matrix.cross and Matrix.det to compute curvature and torsion symbolically.'),
          ],
          exercises: [
            {
              slug: 'frenet-derivation',
              title: 'Deriving the frame equations',
              prompt: `Derive the formula for $\\mathbf{N}'$ by differentiating $\\mathbf{N}=\\mathbf{B}\\times\\mathbf{T}$. Prove in general that any smooth orthonormal frame $e_1,e_2,e_3$ satisfies $e_i'=\\sum_j a_{ij}e_j$ with $a_{ij}=-a_{ji}$. Then derive the determinant formula for $\\tau$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the formula, in unit speed show $\\det(\\gamma\',\\gamma\'\',\\gamma\'\'\')=\\kappa^2\\tau$, then handle general parameters by the chain rule.',
            },
            {
              slug: 'twisted-cubic',
              title: 'The twisted cubic',
              prompt: `For $\\gamma(t)=(t,t^2,t^3)$, derive $\\kappa(t)=\\dfrac{2\\sqrt{1+9t^2+9t^4}}{(1+4t^2+9t^4)^{3/2}}$ and $\\tau(t)=\\dfrac{3}{1+9t^2+9t^4}$. Evaluate at $t=0$, and verify with SymPy. Is the curve ever planar near a point?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'At $t=0$: $\\kappa=2$ and $\\tau=3$. Torsion never vanishes.',
            },
            {
              slug: 'planar-iff-zero-torsion',
              title: 'Planar curves',
              prompt: `Let $\\gamma$ be unit speed with $\\kappa>0$. Prove that $\\tau\\equiv0$ if and only if $\\gamma$ lies in a plane. Then give an example showing that the hypothesis $\\kappa>0$ cannot be dropped: a smooth curve with $\\kappa\\equiv 0$ on an interval and with no plane containing it.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Show $\\mathbf{B}$ is constant and that $(\\gamma-\\gamma(s_0))\\cdot\\mathbf{B}$ has zero derivative. For the example, glue two planar arcs in different planes along a flat segment using a smooth bump function.',
            },
            {
              slug: 'lancret',
              title: 'Generalised helices',
              prompt: `Let $\\gamma$ be unit speed with $\\kappa>0$. Prove Lancret's theorem: the tangent makes a constant angle with some fixed unit vector if and only if $\\tau/\\kappa$ is constant.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If $\\tau/\\kappa=\\cot\\alpha$, test $\\cos\\alpha\\,\\mathbf{T}+\\sin\\alpha\\,\\mathbf{B}$.',
            },
            {
              slug: 'viviani',
              title: 'Viviani\'s curve',
              prompt: `The curve $\\gamma(t)=(1+\\cos t,\\sin t,2\\sin(t/2))$ is the intersection of a sphere with a cylinder. Show it lies on the sphere of radius 2 centred at the origin. Compute $\\kappa$ and $\\tau$ at $t=0$ with the general formulas, and confirm with SymPy.`,
              kind: 'problem',
              difficulty: 2,
              hint: '$\\kappa(0)=1/2$ and $\\tau(0)=3/8$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is torsion undefined where $\\kappa=0$?',
              answerOutline: 'The principal normal, and so $\\mathbf{B}$, is not defined there.',
            },
            {
              question: 'State the Frenet equations with the convention of this course.',
              answerOutline: '$\\mathbf{T}\'=\\kappa\\mathbf{N}$, $\\mathbf{N}\'=-\\kappa\\mathbf{T}+\\tau\\mathbf{B}$, $\\mathbf{B}\'=-\\tau\\mathbf{N}$.',
            },
            {
              question: 'What happens to $\\kappa$ and $\\tau$ under a mirror reflection of space?',
              answerOutline: '$\\kappa$ is unchanged and $\\tau$ changes sign.',
            },
          ],
        },
        {
          slug: 'fundamental-theorem-of-curves',
          title: 'The fundamental theorem of curves',
          summary:
            'Curvature and torsion determine a space curve up to a rigid motion. Existence comes from a linear differential equation, and uniqueness from an orthogonality argument.',
          estimatedMinutes: 100,
          objectives: [
            'State the fundamental theorem of curves with its hypotheses',
            'Prove the uniqueness part',
            'Explain how existence follows from linear ODE theory',
            'Reconstruct a curve numerically from $\\kappa$ and $\\tau$',
          ],
          concepts: [
            'Rigid motion',
            'Invariants of a curve',
            'Existence and uniqueness for linear ODEs',
            'Congruence of curves',
          ],
          explanation: `A **rigid motion** is a map $x\\mapsto Ax+b$ with $A$ a rotation, so $A^TA=I$ and $\\det A=1$. It preserves lengths and orientation, so it preserves $\\kappa$ and $\\tau$.

**Theorem.** Let $\\kappa:I\\to(0,\\infty)$ and $\\tau:I\\to\\mathbb{R}$ be smooth. Then there is a unit-speed curve $\\gamma:I\\to\\mathbb{R}^3$ with curvature $\\kappa$ and torsion $\\tau$. Any two such curves differ by a rigid motion.

The hypothesis $\\kappa>0$ matters. Where $\\kappa$ vanishes the Frenet frame is not defined, and uniqueness can fail, as the bump-function example in the previous lesson suggests.

**Existence.** Let $F(s)$ be the $3\\times3$ matrix whose *rows* are $\\mathbf{T},\\mathbf{N},\\mathbf{B}$. The Frenet equations read $F'=\\Omega F$, with
$$\\Omega=\\begin{pmatrix}0&\\kappa&0\\\\-\\kappa&0&\\tau\\\\0&-\\tau&0\\end{pmatrix}.$$
This is a linear system, so it has a unique solution on all of $I$ with $F(s_0)=I$. Since $\\Omega$ is skew-symmetric,
$$(F^TF)'=F^T\\Omega^TF+F^T\\Omega F=0,$$
so $F^TF\\equiv I$, and $F$ stays orthogonal. Its determinant is continuous with values $\\pm1$, so it stays $+1$. Define $\\gamma(s)=\\int_{s_0}^s\\mathbf{T}(u)\\,du$. Then $\\gamma'=\\mathbf{T}$ is a unit vector, and by the equations $\\gamma$ has the required curvature and torsion.

**Uniqueness.** Let $\\gamma_1,\\gamma_2$ have the same $\\kappa,\\tau$, with frame matrices $F_1,F_2$. After a rigid motion, assume their frames agree at $s_0$ and $\\gamma_1(s_0)=\\gamma_2(s_0)$. Both frames solve $F'=\\Omega F$ with the same initial value, so uniqueness for linear ODEs gives $F_1\\equiv F_2$. In particular, $\\gamma_1'=\\gamma_2'$, so $\\gamma_1\\equiv\\gamma_2$.

**Worked example.** Find all unit-speed curves with $\\kappa\\equiv1$ and $\\tau\\equiv1$. Solving $\\kappa=a/(a^2+b^2)=1$ and $\\tau=b/(a^2+b^2)=1$ gives $a=b$ and $2a^2=a$, so $a=b=\\tfrac12$. The helix $(\\tfrac12\\cos t,\\tfrac12\\sin t,\\tfrac12t)$ has these invariants, with speed $1/\\sqrt2$, so $t=\\sqrt2\\,s$. By the theorem, every curve with these invariants is a rotated and translated copy of it. In general, constant $\\kappa>0$ and constant $\\tau\\neq 0$ force a helix with
$$a=\\frac{\\kappa}{\\kappa^2+\\tau^2},\\qquad b=\\frac{\\tau}{\\kappa^2+\\tau^2}.$$
Note the theorem uses orientation: the mirror image of a right-handed helix is left-handed with torsion $-\\tau$, so the two helices have different invariants, and no rotation carries one onto the other.`,
          resources: [
            wikipedia('Fundamental theorem of curves', 'Fundamental_theorem_of_curves')('A short statement. The proof is in this lesson.', true),
            craneLectures('The early lectures on curves give a discrete version of the same idea.'),
          ],
          exercises: [
            {
              slug: 'rigid-motion-invariance',
              title: 'Invariance under rigid motions',
              prompt: `Let $A$ be a rotation matrix and $\\tilde\\gamma=A\\gamma+b$. Prove from the definitions that $\\tilde\\gamma$ has the same $\\kappa$ and $\\tau$ as $\\gamma$. Use $A(u\\times v)=Au\\times Av$, and say where $\\det A=1$ is needed. If $\\det A=-1$, what happens to $\\tau$?`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'alternate-uniqueness',
              title: 'Uniqueness with an energy function',
              prompt: `Give a second proof of uniqueness. For two curves with the same $\\kappa,\\tau$ and equal frames at $s_0$, show that $f=\\mathbf{T}_1\\cdot\\mathbf{T}_2+\\mathbf{N}_1\\cdot\\mathbf{N}_2+\\mathbf{B}_1\\cdot\\mathbf{B}_2$ is constant, equal to 3. Conclude that the frames agree everywhere.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'reconstruct-from-invariants',
              title: 'Reconstruct a curve',
              prompt: `Integrate the Frenet system numerically with SciPy for (a) $\\kappa=1$, $\\tau=1$, and check against the helix in the lesson, and (b) $\\kappa(s)=1$, $\\tau(s)=s$ on $[-10,10]$. Plot both. Report how far $F^TF$ drifts from the identity, and how the error changes with the tolerance.`,
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sphere-curves',
              title: 'Curves on a sphere',
              prompt: `Let $\\gamma$ be unit speed with $\\kappa>0$ and $\\tau\\ne0$, lying on a sphere of radius $r$ centred at $c$. Let $\\rho=1/\\kappa$ and $\\sigma=1/\\tau$. Prove that $\\gamma-c=-\\rho\\mathbf{N}-\\rho'\\sigma\\mathbf{B}$, and deduce that $\\rho^2+(\\rho'\\sigma)^2=r^2$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Differentiate $|\\gamma-c|^2=r^2$ repeatedly to get the components along $\\mathbf{T}$, $\\mathbf{N}$ and $\\mathbf{B}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the fundamental theorem of curves.',
              answerOutline: 'Given smooth $\\kappa>0$ and $\\tau$, a unit-speed curve with those invariants exists, and is unique up to a rigid motion.',
            },
            {
              question: 'Why does the ODE stay orthogonal?',
              answerOutline: 'Skew-symmetry of $\\Omega$ gives $(F^TF)\'=0$.',
            },
            {
              question: 'What helix has $\\kappa=1/2$, $\\tau=1/2$?',
              answerOutline: '$a=b=1$, since $\\kappa^2+\\tau^2=\\tfrac12$ and $a=\\kappa/(\\kappa^2+\\tau^2)=1$.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/systems-of-odes-and-phase-plane'],
        },
        {
          slug: 'closed-curves',
          title: 'Closed curves and global results',
          summary:
            'Local quantities add up to global facts. Total curvature counts turns, and among curves of given length the circle encloses the most area.',
          estimatedMinutes: 100,
          objectives: [
            'Define the turning number of a closed plane curve',
            'State Hopf\'s theorem on turning tangents',
            'State and test the isoperimetric inequality',
            'State the Fenchel and Fáry-Milnor theorems',
          ],
          concepts: [
            'Closed and simple curves',
            'Turning number',
            'Hopf Umlaufsatz',
            'Isoperimetric inequality',
            'Total curvature',
            'Four-vertex theorem',
          ],
          explanation: `A closed plane curve is a periodic regular map, and it is **simple** if it has no self-intersections. For a closed unit-speed curve of length $L$, the tangent angle $\\theta$ changes over one period by a multiple of $2\\pi$, since $\\mathbf{T}$ returns to itself. So
$$\\int_0^L\\kappa_s\\,ds=\\theta(L)-\\theta(0)=2\\pi n,$$
where the integer $n$ is the **turning number**.

**Hopf's Umlaufsatz.** A simple closed regular plane curve has turning number $\\pm1$, with $+1$ for counterclockwise. A self-crossing curve can have other values. This theorem will drive the Gauss-Bonnet theorem in Module 5, where a version for curves with corners is used.

The value is local data summing to a topological integer. It cannot change under a smooth deformation through regular closed curves, because a continuous integer-valued function is constant.

**Worked example.** Find the turning number of the figure-eight $\\gamma(t)=(\\sin t,\\sin2t)$, $t\\in[0,2\\pi]$. It is regular: if $\\cos t=0$, then $\\cos 2t=-1\\neq 0$. Compare the two loops. Near $t=0$ the curve leaves the origin going up and to the right, then loops *clockwise* around the right lobe and returns to the origin at $t=\\pi$. Then it crosses into the left lobe, which it traverses counterclockwise. The two lobes contribute turning of equal size and opposite sign. A clean way to see this is the symmetry $\\gamma(t+\\pi)=(-\\sin t,\\sin2t)$, which is a mirror image of $\\gamma(t)$. A reflection reverses the sign of $\\kappa_s$, and the speed is unchanged, so the integral over $[\\pi,2\\pi]$ cancels that over $[0,\\pi]$. Thus the turning number is 0, and this curve is not simple.

**Other global theorems.** The **isoperimetric inequality** says a simple closed plane curve of length $L$ enclosing area $A$ satisfies $L^2\\ge4\\pi A$, with equality exactly for circles. The **four-vertex theorem** says the curvature of a simple closed plane curve has at least four critical points. An ellipse with $a>b$ has exactly four. In space, **Fenchel's theorem** says every closed curve has $\\int\\kappa\\,ds\\ge2\\pi$, with equality exactly for convex plane curves, and the **Fáry-Milnor theorem** says a knotted curve has $\\int\\kappa\\,ds>4\\pi$. So curvature can detect knotting.`,
          resources: [
            mit18950('The notes on the global geometry of plane curves, including the Umlaufsatz.', true),
            wikipedia('Total curvature', 'Total_curvature')('Covers the turning number and the relation between local and global.'),
            wikipedia('Turning number', 'Turning_number')('Examples of curves with different turning numbers.'),
          ],
          exercises: [
            {
              slug: 'isoperimetric-ellipse',
              title: 'Testing the isoperimetric inequality',
              prompt: `For the ellipse with semi-axes 2 and 1, compute the perimeter numerically and evaluate $L^2/(4\\pi A)$. Repeat for a square and for an equilateral triangle, where the inequality still holds. Rank the three shapes, and explain the ranking.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Ellipse: $L\\approx9.6884$, ratio about $1.189$. Square: $4/\\pi\\approx1.273$. Triangle: $9/(\\sqrt3\\pi)\\approx1.654$.',
            },
            {
              slug: 'limacon-turning',
              title: 'A loop inside a loop',
              prompt: `Compute numerically the turning number of the limaçon $r=1+2\\cos\\theta$, by unwrapping the angle of $\\gamma'$. Do the same for the curve in the worked example. Check by hand that the limaçon is regular for this choice of parameters.`,
              kind: 'simulation',
              difficulty: 2,
              hint: 'The answers are 2 and 0.',
            },
            {
              slug: 'hurwitz-proof',
              title: 'A Fourier proof of the isoperimetric inequality',
              prompt: `Let $\\gamma=(x,y)$ be a simple closed curve of length $2\\pi$ parametrized by arc length. Assume Wirtinger's inequality: if $f$ is $2\\pi$-periodic with mean 0, then $\\int f^2\\le\\int f'^2$, with equality exactly for $a\\cos s+b\\sin s$. Use $A=\\int x\\,y'\\,ds$ (up to sign) and $\\int(x'^2+y'^2)\\,ds=2\\pi$ to prove that $A\\le\\pi$. Translate so that $\\int x\\,ds=0$. Then scale to get $L^2\\ge4\\pi A$ for all lengths, and discuss the equality case.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Show $2\\pi-2A=\\int(x\'^2-x^2)\\,ds+\\int(y\'-x)^2\\,ds\\geq 0$.',
            },
            {
              slug: 'trefoil-curvature',
              title: 'Curvature of a knot',
              prompt: `Compute the total curvature of the trefoil $\\gamma(t)=(\\sin t+2\\sin2t,\\cos t-2\\cos2t,-\\sin3t)$ by summing turning angles of a fine polygon. Confirm the Fáry-Milnor bound. Then compute the total curvature of a tilted circle, and of a closed curve of your own, and confirm Fenchel's bound.`,
              kind: 'coding',
              difficulty: 2,
              hint: 'The trefoil gives about $4.44\\pi$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the turning number of a circle traversed clockwise?',
              answerOutline: '$-1$.',
            },
            {
              question: 'Why must $\\int\\kappa_s\\,ds$ be a multiple of $2\\pi$ on a closed curve?',
              answerOutline: 'The tangent returns to its starting direction, so the angle changes by a multiple of $2\\pi$.',
            },
            {
              question: 'Does Fenchel\'s theorem apply to open curves?',
              answerOutline: 'No. A short arc has small total curvature. Closure is essential.',
            },
          ],
        },
      ],
      project: {
        slug: 'curve-lab',
        title: 'Curve lab',
        description: `Build a small Python library that takes a parametrized curve and computes its geometry both symbolically and numerically, then goes the other way, from invariants back to a curve.

Given a SymPy expression for $\\gamma(t)$, your code returns $\\kappa$, $\\tau$ and the Frenet frame. Given sampled points of a closed curve, it estimates total curvature and turning number. Given functions $\\kappa(s)$ and $\\tau(s)$, it solves the Frenet system and returns the curve. A round trip from a curve to its invariants and back should reproduce the curve up to a rigid motion, which you measure by aligning the two with a best-fit rotation.

Test against known answers: the helix, with $\\kappa=a/(a^2+b^2)$ and $\\tau=b/(a^2+b^2)$; the twisted cubic at $t=0$, with $\\kappa=2$ and $\\tau=3$; and a plane curve, with $\\tau\\equiv0$.`,
        deliverables: [
          'A tested Python module with the three capabilities above',
          'A test suite that includes the three known cases, and a check that a mirror image reverses the sign of $\\tau$',
          'A round-trip experiment for the twisted cubic on $[0,1]$, reporting the error after alignment as a function of solver tolerance',
          'A plot of a helix or a knot with the Frenet frame drawn at several points',
          'A short note explaining where the method fails, such as near points with $\\kappa=0$',
        ],
        estimatedHours: 3,
        stretchGoals: [
          'Add the Bishop frame, which avoids the problem at points of zero curvature',
          'Compute the writhe of a closed curve and compare with its total torsion',
        ],
      },
    },
    {
      slug: 'surfaces',
      title: 'Surfaces',
      description:
        'Regular surfaces, tangent planes and orientation, the first fundamental form, and the measurement of area and angle on a surface.',
      lessons: [
        {
          slug: 'regular-surfaces',
          title: 'Regular surfaces',
          summary:
            'A regular surface is a subset of space that looks locally like a plane, through smooth patches with independent partial derivatives.',
          estimatedMinutes: 110,
          objectives: [
            'Define a regular parametrized patch and a regular surface',
            'Produce surfaces as graphs and as level sets',
            'Check regularity and find where it fails',
            'Explain why some surfaces need more than one patch',
          ],
          concepts: [
            'Coordinate patch',
            'Regularity condition',
            'Graphs as surfaces',
            'Regular value theorem',
            'Transition maps',
          ],
          explanation: `A **patch** is a smooth map $X:U\\to\\mathbb{R}^3$ on an open set $U\\subseteq\\mathbb{R}^2$ such that the partial derivatives $X_u,X_v$ are linearly independent at every point, which means $X_u\\times X_v\\ne0$. A **regular surface** $\\Sigma\\subseteq\\mathbb{R}^3$ is a set such that each point has a neighbourhood in $\\Sigma$ that is the image of a patch which is a homeomorphism onto that neighbourhood. The homeomorphism condition rules out self-intersections and pieces that pile up on each other.

Two ways of making surfaces cover most examples.

- **Graphs.** For smooth $f$, $X(u,v)=(u,v,f(u,v))$ is always a patch, since $X_u\\times X_v=(-f_u,-f_v,1)\\ne0$.
- **Level sets.** If $F:\\mathbb{R}^3\\to\\mathbb{R}$ is smooth and $\\nabla F\\ne0$ at every point of $F^{-1}(c)$, then $F^{-1}(c)$ is a regular surface, when it is not empty. The proof applies the implicit function theorem to write the set locally as a graph.

When two patches overlap, the **transition map** $X^{-1}\\circ Y$ between their parameter domains is smooth, by the inverse function theorem. This is what makes it possible to define smooth functions on a surface and to do calculus there.

**Worked example.** Let $0<r<R$ and
$$X(u,v)=\\big((R+r\\cos v)\\cos u,\\,(R+r\\cos v)\\sin u,\\,r\\sin v\\big).$$
Here $u$ goes around the central axis and $v$ around the tube. Computing,
$$X_u=(R+r\\cos v)(-\\sin u,\\cos u,0),\\qquad X_v=r(-\\sin v\\cos u,-\\sin v\\sin u,\\cos v),$$
and the cross product is
$$X_u\\times X_v=r(R+r\\cos v)\\,(\\cos v\\cos u,\\cos v\\sin u,\\sin v).$$
The last vector is a unit vector, and $R+r\\cos v\\ge R-r>0$, so $|X_u\\times X_v|=r(R+r\\cos v)\\neq0$. Every point is regular, and this unit vector points away from the core circle. The same torus is the level set $(\\sqrt{x^2+y^2}-R)^2+z^2=r^2$. On the whole of $\\mathbb{R}^2$ the map $X$ is not one-to-one, since it is periodic in both variables. Restricted to open squares of side less than $2\\pi$ it is a patch, and a few such squares cover the torus.

**Pitfall.** The cone $z^2=x^2+y^2$ is not regular at the origin. Away from it, each sheet is fine, but no patch can make the two sheets meeting at a point look like a plane.`,
          resources: [
            mit18950('The notes on the local geometry of hypersurfaces open with the definitions used here.', true),
            surfaceGallery('Rotate standard surfaces and their parametrizations to get a picture for each example.'),
          ],
          exercises: [
            {
              slug: 'hyperboloid-family',
              title: 'Which level sets are surfaces?',
              prompt: `Let $F(x,y,z)=x^2+y^2-z^2$. For which $c$ does the regular value criterion show that $F^{-1}(c)$ is a regular surface? Identify the surfaces for $c>0$, $c<0$ and $c=0$. For $c=0$, prove directly that no neighbourhood of the origin in the cone is the image of a patch that is a homeomorphism.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the last part, remove the origin from a small connected neighbourhood: a disc becomes connected, but the cone falls into two pieces.',
            },
            {
              slug: 'stereographic-charts',
              title: 'Two charts for the sphere',
              prompt: `Show that $X(u,v)=\\dfrac{(2u,2v,u^2+v^2-1)}{1+u^2+v^2}$ is a patch onto the unit sphere minus the north pole, inverting projection from that pole. Write the analogous patch for projection from the south pole, and show that on the overlap the transition map is $(u,v)\\mapsto(u,v)/(u^2+v^2)$. Explain why this proves the sphere is a regular surface.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sphere-needs-two',
              title: 'One patch is not enough',
              prompt: `Prove that the unit sphere is not the image of a single patch that is a homeomorphism onto it. Use that the sphere is compact while an open subset of the plane is not.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'regularity-of-revolution',
              title: 'Surfaces of revolution',
              prompt: `Let $(f(t),g(t))$ be a regular plane curve with $f>0$. Show that $X(t,\\theta)=(f(t)\\cos\\theta,f(t)\\sin\\theta,g(t))$ satisfies $|X_t\\times X_\\theta|=f\\sqrt{f'^2+g'^2}$, and so is regular. What goes wrong if the profile touches the axis, and when is the result still a regular surface there?`,
              kind: 'derivation',
              difficulty: 1,
              hint: 'For the last part, consider a sphere, where the profile meets the axis perpendicularly.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the condition $X_u\\times X_v\\ne0$ guarantee?',
              answerOutline: 'The image has a well-defined tangent plane, spanned by $X_u$ and $X_v$.',
            },
            {
              question: 'Why is a graph of a smooth function always regular?',
              answerOutline: 'Its partial derivatives have cross product $(-f_u,-f_v,1)$, which is never zero.',
            },
            {
              question: 'Is $x^2+y^2=1$ in $\\mathbb{R}^3$ a regular surface?',
              answerOutline: 'Yes. The gradient $(2x,2y,0)$ does not vanish on it, so it is a cylinder.',
            },
          ],
          relatedLessons: ['math-methods/multivariable-calculus/partial-derivatives-and-gradient'],
        },
        {
          slug: 'tangent-planes-and-orientation',
          title: 'Tangent planes, maps and orientation',
          summary:
            'Tangent vectors are velocities of curves on the surface. A unit normal field, when one exists, orients the surface.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the tangent plane in three equivalent ways',
            'Compute differentials of smooth maps between surfaces',
            'Define orientability using a continuous unit normal',
            'Show that the Möbius band is not orientable',
          ],
          concepts: [
            'Tangent plane',
            'Differential of a map',
            'Unit normal field',
            'Orientability',
            'Möbius band',
          ],
          explanation: `The **tangent plane** $T_p\\Sigma$ at $p=X(q)$ is the span of $X_u(q)$ and $X_v(q)$. It has two other descriptions, which help in different situations. It is the set of velocities $\\alpha'(0)$ of smooth curves $\\alpha$ in $\\Sigma$ with $\\alpha(0)=p$. And for a level set $F^{-1}(c)$ with $\\nabla F(p)\\ne0$, it is the plane perpendicular to $\\nabla F(p)$, since differentiating $F(\\alpha(t))=c$ gives $\\nabla F\\cdot\\alpha'=0$.

The first description shows that $T_p\\Sigma$ does not depend on the patch, which is the important part.

If $\\phi:\\Sigma_1\\to\\Sigma_2$ is smooth, its **differential** $d\\phi_p:T_p\\Sigma_1\\to T_{\\phi(p)}\\Sigma_2$ sends $\\alpha'(0)$ to $(\\phi\\circ\\alpha)'(0)$. It is linear, and it is the surface version of the derivative.

A **unit normal** at $p$ is one of the two unit vectors perpendicular to $T_p\\Sigma$. In a patch, $\\mathbf{n}=X_u\\times X_v/|X_u\\times X_v|$. The surface is **orientable** if a continuous unit normal field exists on all of it, and choosing one orients the surface. Level sets of regular values are always orientable, using $\\nabla F/|\\nabla F|$. So is every surface covered by patches whose transition maps have positive Jacobian determinant.

**Worked example.** The Möbius band
$$X(u,v)=\\Big(\\big(1+v\\cos\\tfrac u2\\big)\\cos u,\\ \\big(1+v\\cos\\tfrac u2\\big)\\sin u,\\ v\\sin\\tfrac u2\\Big),\\quad|v|<\\tfrac12,$$
is regular, and $X(u+2\\pi,v)=X(u,-v)$. Along the centre circle $v=0$, a computation gives
$$X_u\\times X_v=\\big(\\sin\\tfrac u2\\cos u,\\ \\sin\\tfrac u2\\sin u,\\ -\\cos\\tfrac u2\\big),$$
which is already a unit vector. At $u=0$ it is $(0,0,-1)$, and at $u=2\\pi$, back at the same point of the band, it is $(0,0,1)$. A continuous unit normal along this loop would have to come back to itself. The normal is determined up to sign at each point, so continuity forces it to follow this formula, and it comes back reversed. So no continuous unit normal exists, and the band is not orientable.

**Pitfall.** Orientability is a property of the whole surface. Every small enough piece of any surface is orientable.`,
          resources: [
            mit18950('The opening part of the notes on hypersurfaces, on tangent spaces and normals.', true),
            craneNotes('The early chapters treat surfaces through tangent spaces and normals with many pictures.'),
          ],
          exercises: [
            {
              slug: 'tangent-plane-graph',
              title: 'A tangent plane',
              prompt: `For the saddle $z=x^2-y^2$, find the unit normal and the equation of the tangent plane at $(1,1,0)$ in two ways: from the patch $X(u,v)=(u,v,u^2-v^2)$, and from $F(x,y,z)=x^2-y^2-z$. Confirm that both give the same plane.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Normal $\\pm(-2,2,1)/3$. Plane $z=2x-2y$.',
            },
            {
              slug: 'tangent-plane-independence',
              title: 'The tangent plane is well defined',
              prompt: `Prove that the span of $X_u,X_v$ at $p$ equals the set of velocities of curves in $\\Sigma$ through $p$. Deduce that two patches around $p$ give the same tangent plane. Where do you use the fact that a patch is a homeomorphism onto its image?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'A curve in the surface near $p$ lifts to a curve in the parameter domain. Smoothness of the lift needs the inverse function theorem.',
            },
            {
              slug: 'height-function',
              title: 'Critical points of height',
              prompt: `Let $h(p)=p\\cdot a$ for a fixed unit vector $a$. Prove that $p$ is a critical point of $h$ on $\\Sigma$, meaning $dh_p=0$, exactly when $a$ is normal to $\\Sigma$ at $p$. For the torus in the previous lesson, find all critical points of the height $h=x$, and classify them as maxima, minima or saddles by inspection.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'There are four: a maximum, a minimum and two saddles. Note that $1-2+1=0$, which will reappear as the Euler characteristic.',
            },
            {
              slug: 'mobius-normal',
              title: 'Checking the Möbius computation',
              prompt: `Verify the cross product along $v=0$ in the worked example with SymPy. Then show that the Möbius band cannot be covered by two patches whose transition map has positive Jacobian everywhere on the overlap. Use the normal argument in the lesson.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the tangent plane to a level set of $F$?',
              answerOutline: 'The plane perpendicular to $\\nabla F(p)$, through $p$.',
            },
            {
              question: 'What does a continuous unit normal field do?',
              answerOutline: 'It orients the surface, choosing a consistent side throughout.',
            },
            {
              question: 'Is the sphere orientable? Why?',
              answerOutline: 'Yes. It is a level set of $x^2+y^2+z^2$, so $p/|p|$ is a continuous unit normal.',
            },
          ],
        },
        {
          slug: 'first-fundamental-form',
          title: 'The first fundamental form',
          summary:
            'Restricting the dot product to tangent planes gives the metric of the surface. With it you can measure lengths and angles without leaving the surface.',
          estimatedMinutes: 110,
          objectives: [
            'Compute $E,F,G$ for a patch',
            'Find lengths of curves and angles between them',
            'Define a local isometry',
            'Transform the first fundamental form under a change of parameters',
          ],
          concepts: [
            'First fundamental form',
            'Metric coefficients $E,F,G$',
            'Length of a curve on a surface',
            'Angle between curves',
            'Local isometry',
          ],
          explanation: `The **first fundamental form** at $p$ is the dot product restricted to $T_p\\Sigma$. In a patch, write $w=aX_u+bX_v$. Then
$$I(w,w)=Ea^2+2Fab+Gb^2,\\qquad E=X_u\\cdot X_u,\\ F=X_u\\cdot X_v,\\ G=X_v\\cdot X_v.$$
The matrix $g=\\begin{pmatrix}E&F\\\\F&G\\end{pmatrix}$ is positive definite. A curve $\\alpha(t)=X(u(t),v(t))$ has length
$$\\int\\sqrt{E\\,u'^2+2F\\,u'v'+G\\,v'^2}\\,dt,$$
and the angle between the coordinate curves satisfies $\\cos\\theta=F/\\sqrt{EG}$.

The point is that once you know $E,F,G$ as functions of $(u,v)$, you can measure on the surface with no further reference to $\\mathbb{R}^3$. Geometry that can be computed from these alone is called **intrinsic**.

A smooth map $\\phi:\\Sigma_1\\to\\Sigma_2$ is a **local isometry** if each $d\\phi_p$ preserves the first fundamental form. Then it preserves lengths of curves. If $\\phi$ maps $X_1(u,v)$ to $X_2(u,v)$, it is a local isometry exactly when the two patches have the same $E,F,G$.

Under a change of parameters with Jacobian matrix $J$, the matrix changes as $\\tilde g=J^TgJ$. You can always check your algebra this way.

**Worked example.** On the unit sphere, use colatitude $\\varphi$ and longitude $\\theta$: $X=(\\sin\\varphi\\cos\\theta,\\sin\\varphi\\sin\\theta,\\cos\\varphi)$. Then $X_\\varphi=(\\cos\\varphi\\cos\\theta,\\cos\\varphi\\sin\\theta,-\\sin\\varphi)$ and $X_\\theta=(-\\sin\\varphi\\sin\\theta,\\sin\\varphi\\cos\\theta,0)$, so
$$E=1,\\qquad F=0,\\qquad G=\\sin^2\\varphi.$$
A parallel $\\varphi=\\varphi_0$ has length $\\int_0^{2\\pi}\\sin\\varphi_0\\,d\\theta=2\\pi\\sin\\varphi_0$. Now take a **loxodrome**, a curve crossing every meridian at a constant angle $\\beta$, with $0\\le\\beta<\\pi/2$. Along it, the meridian component of the unit tangent is $\\cos\\beta$. Since $E=1$ and $F=0$, the rate of change of colatitude per unit length is $\\cos\\beta$. So the length from colatitude $\\varphi_1$ to $\\varphi_2$ is
$$\\frac{|\\varphi_2-\\varphi_1|}{\\cos\\beta}.$$
A loxodrome from the equator to the pole is therefore finite, $\\pi/(2\\cos\\beta)$, though it spirals around the pole infinitely often. Every step used only $E$, $F$ and $G$, so a navigator who knew the metric but had never seen the globe from outside could do the same computation.`,
          resources: [
            wikipedia('First fundamental form', 'First_fundamental_form')('Formulas and examples. Notation matches this lesson.', true),
            mathWorld('First fundamental form', 'FirstFundamentalForm')('A quick reference for $E,F,G$ of standard surfaces.'),
          ],
          exercises: [
            {
              slug: 'fff-standard-surfaces',
              title: 'First fundamental forms',
              prompt: `Compute $E,F,G$ for (a) the cylinder $(a\\cos u,a\\sin u,v)$, (b) the torus in the regular surfaces lesson, (c) a graph $z=f(u,v)$, and (d) the surface of revolution with profile $(f(t),g(t))$. Check each with SymPy.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'The torus has $E=(R+r\\cos v)^2$, $F=0$, $G=r^2$.',
            },
            {
              slug: 'unroll-the-cone',
              title: 'Unrolling a cone',
              prompt: `Let $C$ be the cone $X(\\rho,\\theta)=(\\rho\\sin\\alpha\\cos\\theta,\\rho\\sin\\alpha\\sin\\theta,\\rho\\cos\\alpha)$ with $\\rho>0$ and fixed $0<\\alpha<\\pi/2$. Show $E=1$, $F=0$ and $G=\\rho^2\\sin^2\\alpha$. Find an explicit local isometry from a part of the cone to a part of the plane, using polar coordinates with angle $\\theta\\sin\\alpha$. Why is it only local?`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'helicoid-catenoid-metrics',
              title: 'Helicoid and catenoid',
              prompt: `Show that the catenoid $(\\cosh v\\cos u,\\cosh v\\sin u,v)$ and the helicoid $(\\sinh v\\cos u,\\sinh v\\sin u,u)$ both have $E=G=\\cosh^2v$ and $F=0$. Conclude that the map sending one parameter point to the same parameter point on the other is a local isometry. Describe in words how a strip of helicoid bends onto the catenoid.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'metric-transformation',
              title: 'Changing parameters',
              prompt: `Prove $\\tilde g=J^TgJ$ for a change of parameters, and deduce that the length of a curve does not depend on the patch used. Check the rule by passing from polar $(r,\\theta)$ to Cartesian coordinates in the plane.`,
              kind: 'derivation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $F=0$ mean geometrically?',
              answerOutline: 'The coordinate curves meet at right angles.',
            },
            {
              question: 'Name two surfaces that are locally isometric but look different in space.',
              answerOutline: 'A plane and a cylinder, or a helicoid and a catenoid.',
            },
            {
              question: 'What is the length of the equator in the sphere coordinates above?',
              answerOutline: '$2\\pi\\sin(\\pi/2)=2\\pi$.',
            },
          ],
        },
        {
          slug: 'area-and-conformal-maps',
          title: 'Area, conformal maps and map projections',
          summary:
            'The area element is $\\sqrt{EG-F^2}$. A map can preserve angles or areas, and Module 4 shows why a map of the globe cannot preserve both.',
          estimatedMinutes: 110,
          objectives: [
            'Compute surface areas with the area element',
            'Prove the area does not depend on the parametrization',
            'Define conformal and equal-area maps through the first fundamental form',
            'Analyse the stereographic, Mercator and Archimedes projections',
          ],
          concepts: [
            'Area element',
            'Conformal map',
            'Equal-area map',
            'Stereographic projection',
            'Mercator projection',
            'Scale factor',
          ],
          explanation: `The area of the region $X(D)$ covered by a patch is
$$A=\\iint_D|X_u\\times X_v|\\,du\\,dv=\\iint_D\\sqrt{EG-F^2}\\,du\\,dv,$$
using the identity $|a\\times b|^2=|a|^2|b|^2-(a\\cdot b)^2$. The change of variables formula and $\\tilde g=J^TgJ$ show that the answer does not depend on the patch. So area is intrinsic, like length.

Maps between surfaces can preserve some of this structure and not the rest. Suppose a map sends $X_1(u,v)$ to $X_2(u,v)$. It is **conformal**, preserving angles, if the first fundamental forms are proportional: $g_2=\\lambda(u,v)^2g_1$ for a positive function $\\lambda$, called the scale factor. It is **equal-area** if $\\sqrt{\\det g_2}=\\sqrt{\\det g_1}$. It is a local isometry exactly when it is both conformal and equal-area. That is because a $2\\times2$ positive definite matrix proportional to another and with the same determinant must equal it.

**Worked example.** Stereographic projection inverts to the patch
$$X(u,v)=\\frac{(2u,\\,2v,\\,u^2+v^2-1)}{1+u^2+v^2}$$
on the unit sphere minus the north pole. A direct computation, which you should do in SymPy, gives
$$E=G=\\frac{4}{(1+u^2+v^2)^2},\\qquad F=0.$$
So the map from the plane to the sphere is conformal, with scale factor $2/(1+u^2+v^2)$, and circles of the plane go to circles on the sphere. It is far from equal-area: the area of the sphere is
$$\\iint\\frac{4}{(1+u^2+v^2)^2}\\,du\\,dv=2\\pi\\int_0^\\infty\\frac{4\\rho}{(1+\\rho^2)^2}\\,d\\rho=4\\pi,$$
while the plane has infinite area. Most of the plane maps to a small region near the pole.

**Map projections.** The **Mercator** projection sends latitude $\\phi$ and longitude $\\lambda$ to $(\\lambda,\\ln\\tan(\\pi/4+\\phi/2))$. It is conformal with scale factor $\\sec\\phi$, so Greenland looks enormous, and loxodromes become straight lines, which is why sailors used it. **Archimedes' projection**, $(\\lambda,\\phi)\\mapsto(\\lambda,\\sin\\phi)$ onto a cylinder, is equal-area but distorts angles. No map from any part of the sphere to the plane is both, since it would be an isometry, and the Theorema Egregium forbids that.`,
          resources: [
            wikipedia('Stereographic projection', 'Stereographic_projection')('Properties of the projection, including conformality and circle preservation.', true),
            wikipedia('Mercator projection', 'Mercator_projection')('History, the derivation of the formula, and the distortion of areas.'),
          ],
          exercises: [
            {
              slug: 'torus-and-paraboloid-area',
              title: 'Two areas',
              prompt: `Find (a) the area of the torus with radii $R>r>0$, and (b) the area of the part of $z=x^2+y^2$ with $x^2+y^2\\le1$. Give the second as an exact expression and a decimal.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $4\\pi^2Rr$. (b) $\\pi(5\\sqrt5-1)/6\\approx5.3304$.',
            },
            {
              slug: 'mercator-derivation',
              title: 'Deriving Mercator',
              prompt: `On the unit sphere with latitude $\\phi$ and longitude $\\lambda$, $E_{\\phi\\phi}=1$ and $G_{\\lambda\\lambda}=\\cos^2\\phi$. Look for a map $(\\lambda,\\phi)\\mapsto(\\lambda,y(\\phi))$ to the plane that is conformal. Show that $y'(\\phi)=\\sec\\phi$, and integrate to get the Mercator formula. Prove that loxodromes become straight lines.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'archimedes-equal-area',
              title: 'Archimedes\' theorem',
              prompt: `Prove that radial horizontal projection from the unit sphere minus the poles to the cylinder $x^2+y^2=1$ preserves area. Deduce that the area of a spherical zone between heights $z=h_1$ and $z=h_2$ is $2\\pi(h_2-h_1)$. Show by example that it does not preserve angles.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'conformal-and-equal-area',
              title: 'Conformal and equal-area means isometric',
              prompt: `Prove that a map which is both conformal and equal-area is a local isometry. Then explain why no map from an open set on the sphere to the plane can preserve both angles and areas, assuming the result of Module 4 that the sphere and plane are not locally isometric.`,
              kind: 'derivation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the area element of the unit sphere in colatitude and longitude?',
              answerOutline: '$\\sin\\varphi\\,d\\varphi\\,d\\theta$.',
            },
            {
              question: 'What does conformal mean in terms of $E,F,G$?',
              answerOutline: 'The two first fundamental forms are proportional at each point.',
            },
            {
              question: 'Why does Greenland look as large as Africa on a Mercator map?',
              answerOutline: 'Lengths are scaled by $\\sec\\phi$, so areas by $\\sec^2\\phi$, which is large at high latitude.',
            },
          ],
        },
      ],
      project: {
        slug: 'map-projection-lab',
        title: 'Map projection lab',
        description: `Every flat map of the Earth distorts something, and the first fundamental form measures exactly what. Build a tool that takes a map projection, given as a formula from latitude and longitude to the plane, and computes its distortion at every point.

Treat the projection as the map from the sphere to the plane. At each point compute the pulled-back metric, which is the first fundamental form of the inverse map from the plane, in latitude and longitude coordinates, and compare it with the sphere metric $d\\phi^2+\\cos^2\\phi\\,d\\lambda^2$. The two eigenvalues of one metric relative to the other give the largest and smallest scale factors $a\\ge b$. From these you get the angular distortion, $2\\arcsin\\frac{a-b}{a+b}$, and the area scale, $ab$. Drawing an ellipse with axes $a,b$ at each point of a grid gives Tissot's indicatrix.

Do this for Mercator, equirectangular, stereographic, Archimedes' equal-area cylindrical, and one projection of your choice. Check each against what you proved: Mercator and stereographic have $a=b$ everywhere, and Archimedes has $ab=1$.`,
        deliverables: [
          'A function that, given a projection as SymPy expressions, returns $a$, $b$, angular distortion and area scale at any point',
          'Tests confirming $a=b$ for Mercator and stereographic, and $ab=1$ for Archimedes, at random points to within $10^{-10}$',
          'Tissot indicatrix plots for all five projections on the same grid',
          'A table of the maximum angular distortion and area scale over latitudes $|\\phi|\\le70^\\circ$ for each projection',
          'A one-page discussion connecting the results to the impossibility of a perfect map',
        ],
        estimatedHours: 3,
        stretchGoals: [
          'Find the projection that minimises a chosen mix of angle and area distortion over a region, by optimising a family of formulas',
          'Draw a coastline from public outline data with each projection',
        ],
      },
    },
    {
      slug: 'curvature-of-surfaces',
      title: 'Curvature of Surfaces',
      description:
        'How a surface bends in space: the Gauss map and shape operator, the second fundamental form, principal, Gaussian and mean curvature, and the classical examples.',
      lessons: [
        {
          slug: 'gauss-map-and-shape-operator',
          title: 'The Gauss map and the shape operator',
          summary:
            'Curvature of a surface is the rate at which its normal turns. The derivative of the normal is a self-adjoint map of each tangent plane.',
          estimatedMinutes: 110,
          objectives: [
            'Define the Gauss map and the shape operator',
            'Prove the shape operator is self-adjoint',
            'Compute the shape operator for planes, spheres and cylinders',
            'Explain how the choice of normal affects signs',
          ],
          concepts: [
            'Gauss map',
            'Shape operator',
            'Self-adjoint linear map',
            'Principal curvatures and directions',
            'Dependence on the normal',
          ],
          explanation: `Let $\\Sigma$ be oriented by a unit normal field $\\mathbf{n}$. The **Gauss map** sends each point $p$ to $\\mathbf{n}(p)$ on the unit sphere. Its image measures how much the surface turns: a plane has a constant normal, a sphere's normal covers the whole sphere.

The tangent planes $T_p\\Sigma$ and $T_{\\mathbf{n}(p)}S^2$ are the same plane, both perpendicular to $\\mathbf{n}(p)$. So the differential of the Gauss map is a linear map of $T_p\\Sigma$ to itself. The **shape operator**, or Weingarten map, is
$$S_p=-d\\mathbf{n}_p:T_p\\Sigma\\to T_p\\Sigma,\\qquad S_p(\\alpha'(0))=-(\\mathbf{n}\\circ\\alpha)'(0).$$
The minus sign is a convention that makes a sphere with its *inward* normal positively curved.

**$S_p$ is self-adjoint.** In a patch, $\\mathbf{n}\\cdot X_u=0$. Differentiating in $v$ gives $\\mathbf{n}_v\\cdot X_u=-\\mathbf{n}\\cdot X_{uv}$. Similarly $\\mathbf{n}_u\\cdot X_v=-\\mathbf{n}\\cdot X_{vu}$. Mixed partials are equal, so
$$S(X_u)\\cdot X_v=S(X_v)\\cdot X_u.$$
Thus $S_p$ has real eigenvalues $\\kappa_1,\\kappa_2$ and orthonormal eigenvectors, by the spectral theorem. These are the **principal curvatures** and **principal directions**, and they are the extreme rates of bending, as the next lesson shows.

Replacing $\\mathbf{n}$ by $-\\mathbf{n}$ replaces $S$ by $-S$. So both principal curvatures change sign, their product does not, and their sum does.

**Worked example.** Take the cylinder $X(u,v)=(a\\cos u,a\\sin u,v)$ with the outward normal $\\mathbf{n}=(\\cos u,\\sin u,0)$. Along the circle direction,
$$\\mathbf{n}_u=(-\\sin u,\\cos u,0)=\\frac1aX_u,$$
so $S(X_u)=-\\frac1aX_u$. Along the axis, $\\mathbf{n}_v=0$, so $S(X_v)=0$. So the principal curvatures are $-1/a$, around the cylinder, and $0$, along the rulings. With the inward normal they would be $1/a$ and $0$. Compare a sphere of radius $r$ with outward normal $\\mathbf{n}=p/r$. Then $d\\mathbf{n}=\\frac1r\\,\\mathrm{id}$, so $S=-\\frac1r\\,\\mathrm{id}$, and every direction is principal with curvature $-1/r$. For a plane, $S=0$.

The Gauss maps show the same thing. A cylinder's normals fill only a great circle, so the Gauss map squashes one direction to nothing, and that is the direction with curvature zero.`,
          resources: [
            mit18950('The notes on the local geometry of hypersurfaces define the shape operator and its eigenvalues.', true),
            wikipedia('Gauss map', 'Gauss_map')('Pictures of the Gauss map and its relation to curvature.'),
            craneLectures('The lectures on curvature of surfaces show the shape operator on meshes.'),
          ],
          exercises: [
            {
              slug: 'shape-matrix',
              title: 'The matrix of the shape operator',
              prompt: `Write $S(X_u)=aX_u+bX_v$ and $S(X_v)=cX_u+dX_v$. Show that the matrix of $S$ in the basis $X_u,X_v$ is $g^{-1}h$, where $g$ is the matrix of $E,F,G$ and $h$ is the matrix of $L=X_{uu}\\cdot\\mathbf{n}$, $M=X_{uv}\\cdot\\mathbf{n}$, $N=X_{vv}\\cdot\\mathbf{n}$. Why is this matrix not symmetric in general, though $S$ is self-adjoint?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use $-\\mathbf{n}_u\\cdot X_u=\\mathbf{n}\\cdot X_{uu}=L$ and similar identities. The basis $X_u,X_v$ need not be orthonormal.',
            },
            {
              slug: 'gauss-images',
              title: 'Images of the Gauss map',
              prompt: `Describe the image of the Gauss map for (a) a plane, (b) a cylinder, (c) a sphere, (d) the cone $z=\\sqrt{x^2+y^2}$ with $z>0$, (e) the paraboloid $z=x^2+y^2$, and (f) the saddle $z=x^2-y^2$. In each case relate the dimension of the image to the rank of $S$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'The paraboloid\'s image is an open hemisphere, and the cone\'s is a circle.',
            },
            {
              slug: 'umbilic-surfaces',
              title: 'Surfaces with all points umbilic',
              prompt: `A point is umbilic if $S_p=\\lambda(p)\\,\\mathrm{id}$. Prove that a connected surface on which every point is umbilic is part of a plane or a sphere. First show that $\\lambda$ is constant in a patch, using $\\mathbf{n}_{uv}=\\mathbf{n}_{vu}$ and the linear independence of $X_u,X_v$. Then treat $\\lambda=0$ and $\\lambda\\ne0$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'With $\\mathbf{n}_u=-\\lambda X_u$ and $\\mathbf{n}_v=-\\lambda X_v$, equating mixed partials gives $\\lambda_vX_u=\\lambda_uX_v$. If $\\lambda\\ne0$, show that $X+\\mathbf{n}/\\lambda$ is constant.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the shape operator map $T_p\\Sigma$ into itself?',
              answerOutline: 'Differentiating $\\mathbf{n}\\cdot\\mathbf{n}=1$ shows $d\\mathbf{n}$ is perpendicular to $\\mathbf{n}$, so it lies in the tangent plane.',
            },
            {
              question: 'What are the principal curvatures of a sphere of radius 2 with inward normal?',
              answerOutline: 'Both $1/2$.',
            },
            {
              question: 'What does self-adjointness buy you?',
              answerOutline: 'Real eigenvalues and an orthonormal basis of eigenvectors.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/eigenvalues-and-eigenvectors'],
        },
        {
          slug: 'second-fundamental-form',
          title: 'The second fundamental form and normal curvature',
          summary:
            'The second fundamental form measures how fast a surface bends away from its tangent plane in each direction. Euler\'s formula and Meusnier\'s theorem organise this.',
          estimatedMinutes: 110,
          objectives: [
            'Compute $L,M,N$ and the second fundamental form',
            'Define normal curvature and prove Meusnier\'s theorem',
            'Prove Euler\'s formula from the principal directions',
            'Find asymptotic directions',
          ],
          concepts: [
            'Second fundamental form',
            'Normal curvature',
            'Meusnier\'s theorem',
            'Euler\'s formula',
            'Asymptotic directions',
          ],
          explanation: `The **second fundamental form** is $II_p(w,w)=S_p(w)\\cdot w$. In a patch, with $w=aX_u+bX_v$,
$$II=La^2+2Mab+Nb^2,\\qquad L=X_{uu}\\cdot\\mathbf{n},\\ M=X_{uv}\\cdot\\mathbf{n},\\ N=X_{vv}\\cdot\\mathbf{n}.$$
The letter $N$ here is a coefficient, not the principal normal of a curve. Geometrically, by Taylor's theorem, the height of the surface above its tangent plane at $p$ is $\\tfrac12II(w,w)$ to second order along a displacement $w$. So $II$ describes the best-fitting quadric.

Now let $\\alpha$ be a unit-speed curve on $\\Sigma$ through $p$, with unit tangent $\\mathbf{T}$. Its **normal curvature** is the component of its acceleration along the surface normal: $\\kappa_n=\\alpha''\\cdot\\mathbf{n}$. Differentiating $\\alpha'\\cdot\\mathbf{n}=0$ gives
$$\\kappa_n=-\\alpha'\\cdot(\\mathbf{n}\\circ\\alpha)'=II(\\mathbf{T},\\mathbf{T}).$$
So $\\kappa_n$ depends only on the direction $\\mathbf{T}$, not on the curve. That is **Meusnier's theorem**. If the curve's principal normal makes an angle $\\phi$ with $\\mathbf{n}$, then $\\kappa\\cos\\phi=\\kappa_n$. All curves through $p$ in the same direction share their normal curvature. The ones that bend sideways have a larger curvature to make up for it.

Let $e_1,e_2$ be orthonormal principal directions, and take $\\mathbf{T}=\\cos\\theta\\,e_1+\\sin\\theta\\,e_2$. Since $S$ is diagonal in this basis, you get **Euler's formula**:
$$\\kappa_n(\\theta)=\\kappa_1\\cos^2\\theta+\\kappa_2\\sin^2\\theta.$$
So the principal curvatures are the largest and smallest normal curvatures. A direction with $\\kappa_n=0$ is **asymptotic**, and asymptotic directions exist exactly when $\\kappa_1\\kappa_2\\le0$.

**Worked example.** Take the saddle $X(u,v)=(u,v,u^2-v^2)$ at the origin. There $X_u=(1,0,0)$ and $X_v=(0,1,0)$, so $E=G=1$, $F=0$, and $\\mathbf{n}=(0,0,1)$. The second derivatives are $X_{uu}=(0,0,2)$, $X_{uv}=0$ and $X_{vv}=(0,0,-2)$, so $L=2$, $M=0$, $N=-2$. Since $g$ is the identity, the shape operator is $\\mathrm{diag}(2,-2)$. The principal curvatures are $\\pm2$, along the axes. Euler's formula gives
$$\\kappa_n(\\theta)=2\\cos^2\\theta-2\\sin^2\\theta=2\\cos2\\theta,$$
which vanishes at $\\theta=\\pm\\pi/4$. These are the asymptotic directions. Along them the surface contains straight lines through the origin, in the planes $x=\\pm y$, where $u^2-v^2=0$. A line on a surface always has zero normal curvature.`,
          resources: [
            wikipedia('Second fundamental form', 'Second_fundamental_form')('Formulas and the relation to the shape operator.', true),
            mathWorld('Second fundamental form', 'SecondFundamentalForm')('Coefficients for common surfaces, for checking your answers. Check the normal used.'),
          ],
          exercises: [
            {
              slug: 'meusnier-on-sphere',
              title: 'Meusnier on the sphere',
              prompt: `On the unit sphere with inward normal, every direction has $\\kappa_n=1$. Use Meusnier's theorem to find the curvature of the parallel at colatitude $\\varphi_0$, and check it against the radius $\\sin\\varphi_0$ of that circle. Prove Meusnier's relation $\\kappa\\cos\\phi=\\kappa_n$ in general.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'euler-formula',
              title: 'Euler\'s formula and its consequences',
              prompt: `Prove Euler's formula. Deduce (a) that $\\kappa_1,\\kappa_2$ are the maximum and minimum normal curvatures, (b) that the average of $\\kappa_n$ over all directions is $\\tfrac12(\\kappa_1+\\kappa_2)$, and (c) that the normal curvatures in any two perpendicular directions add to $\\kappa_1+\\kappa_2$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'saddle-xy',
              title: 'The saddle z = xy',
              prompt: `For $X(u,v)=(u,v,uv)$, compute $L,M,N$ at the origin, the principal curvatures and directions, and the asymptotic directions. Then show the curvature product at a general point is $-1/(1+u^2+v^2)^2$, and check with SymPy.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'At the origin $L=N=0$ and $M=1$, so the principal curvatures are $\\pm1$, at $45^\\circ$ to the axes.',
            },
            {
              slug: 'lines-are-asymptotic',
              title: 'Lines on surfaces',
              prompt: `Prove that a straight line segment lying on a surface is an asymptotic curve. Deduce that at a point of a doubly ruled surface such as $z=xy$, or the hyperboloid of one sheet, the two rulings are the asymptotic directions, and the point has $\\kappa_1\\kappa_2\\le0$.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the normal curvature in an asymptotic direction?',
              answerOutline: 'Zero.',
            },
            {
              question: 'State Euler\'s formula.',
              answerOutline: '$\\kappa_n(\\theta)=\\kappa_1\\cos^2\\theta+\\kappa_2\\sin^2\\theta$, with $\\theta$ measured from the first principal direction.',
            },
            {
              question: 'What does Meusnier\'s theorem say?',
              answerOutline: 'All curves through a point in the same tangent direction have the same normal curvature, $\\kappa\\cos\\phi$.',
            },
          ],
        },
        {
          slug: 'gaussian-and-mean-curvature',
          title: 'Gaussian and mean curvature',
          summary:
            'The determinant and half the trace of the shape operator give two numbers at each point that classify the local shape.',
          estimatedMinutes: 120,
          objectives: [
            'Compute $K$ and $H$ from the two fundamental forms',
            'Classify points as elliptic, hyperbolic, parabolic or planar',
            'Compute curvature of graphs, tori and ellipsoids',
            'Prove that a compact surface has a point of positive curvature',
          ],
          concepts: [
            'Gaussian curvature',
            'Mean curvature',
            'Elliptic, hyperbolic, parabolic and planar points',
            'Curvature of a graph',
            'Total curvature',
          ],
          explanation: `The **Gaussian curvature** is $K=\\det S=\\kappa_1\\kappa_2$, and the **mean curvature** is $H=\\tfrac12\\operatorname{tr}S=\\tfrac12(\\kappa_1+\\kappa_2)$. Since $S=g^{-1}h$,
$$K=\\frac{LN-M^2}{EG-F^2},\\qquad H=\\frac{EN-2FM+GL}{2(EG-F^2)},$$
and the principal curvatures are $H\\pm\\sqrt{H^2-K}$. Reversing the normal changes the sign of $H$ and leaves $K$ alone. A point is **elliptic** if $K>0$, where the surface lies locally on one side of its tangent plane. It is **hyperbolic** if $K<0$, a saddle. It is **parabolic** if $K=0$ with $S\\ne0$, and **planar** if $S=0$.

For a graph $z=f(x,y)$,
$$K=\\frac{f_{xx}f_{yy}-f_{xy}^2}{(1+f_x^2+f_y^2)^2}.$$
So $K$ has the sign of the Hessian determinant, as you would hope from the second-derivative test.

**Worked example.** Take the torus $X(u,v)=((R+r\\cos v)\\cos u,(R+r\\cos v)\\sin u,r\\sin v)$, with $0<r<R$. From the regular surfaces lesson, $E=(R+r\\cos v)^2$, $F=0$, $G=r^2$, and the normal $X_u\\times X_v/|X_u\\times X_v|$ points outward. The second derivatives give
$$L=-(R+r\\cos v)\\cos v,\\qquad M=0,\\qquad N=-r.$$
So
$$K=\\frac{LN}{EG}=\\frac{\\cos v}{r(R+r\\cos v)},\\qquad H=-\\frac{R+2r\\cos v}{2r(R+r\\cos v)}.$$
On the outer equator, $v=0$, $K=1/(r(R+r))>0$, which is elliptic like a sphere. On the inner equator, $v=\\pi$, $K<0$, a saddle. On the top and bottom circles, $v=\\pm\\pi/2$, $K=0$, so those points are parabolic. Integrating against the area element $r(R+r\\cos v)\\,du\\,dv$,
$$\\iint K\\,dA=\\int_0^{2\\pi}\\!\\int_0^{2\\pi}\\cos v\\,du\\,dv=0.$$
The positive and negative parts are each $4\\pi$ in size, independent of $R$ and $r$. That coincidence is the first sign of the Gauss-Bonnet theorem.

**A global fact.** Every compact surface in $\\mathbb{R}^3$ has an elliptic point. Take a point farthest from the origin. The surface lies inside the sphere through it centred at the origin, so it bends at least as much as that sphere in every direction.`,
          resources: [
            wikipedia('Gaussian curvature', 'Gaussian_curvature')('Definitions, the classification of points, and many examples.', true),
            mathWorld('Torus', 'Torus')('Gives the torus curvatures. Compare the signs with this lesson, which uses the outward normal.'),
            wikipedia('Mean curvature', 'Mean_curvature')('Formulas, and the connection to minimal surfaces.'),
          ],
          exercises: [
            {
              slug: 'k-and-h-formulas',
              title: 'Deriving the formulas',
              prompt: `From $S=g^{-1}h$, derive the formulas for $K$ and $H$, and show that the principal curvatures are the roots of $\\det(h-\\kappa g)=0$. Show $H^2\\ge K$, with equality exactly at umbilic points.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'graph-curvature',
              title: 'Curvature of graphs',
              prompt: `Derive $K$ and $H$ for the graph $z=f(x,y)$. Apply your formula to the monkey saddle $z=x^3-3xy^2$, find its curvature at the origin, and show $K=-\\dfrac{36(x^2+y^2)}{(1+9(x^2+y^2)^2)^2}$. What kind of point is the origin?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The origin is planar: $S=0$ there.',
            },
            {
              slug: 'ellipsoid-curvature',
              title: 'The ellipsoid',
              prompt: `For $x^2/a^2+y^2/b^2+z^2/c^2=1$, show that $K=\\dfrac{1}{a^2b^2c^2\\big(\\frac{x^2}{a^4}+\\frac{y^2}{b^4}+\\frac{z^2}{c^4}\\big)^2}$. Evaluate at $(a,0,0)$, and check your formula with SymPy using the patch $(a\\sin\\varphi\\cos\\theta,b\\sin\\varphi\\sin\\theta,c\\cos\\varphi)$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'At $(a,0,0)$, $K=a^2/(b^2c^2)$.',
            },
            {
              slug: 'compact-elliptic-point',
              title: 'Compact surfaces have elliptic points',
              prompt: `Prove that every compact regular surface in $\\mathbb{R}^3$ has a point with $K>0$. Let $p$ maximise $|x|$ on the surface, at distance $\\rho$. Show $\\mathbf{n}(p)=\\pm p/\\rho$, and compare normal curvatures with those of the sphere of radius $\\rho$ by considering $|\\alpha(t)|^2$ along curves through $p$. Deduce that no compact surface in space has $K\\le0$ everywhere.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Show every normal curvature at $p$ has absolute value at least $1/\\rho$, with the same sign.',
            },
          ],
          selfAssessment: [
            {
              question: 'What happens to $K$ and $H$ if you reverse the normal?',
              answerOutline: '$K$ is unchanged, and $H$ changes sign.',
            },
            {
              question: 'What does $K<0$ say about the surface near $p$?',
              answerOutline: 'It is saddle-shaped and crosses its tangent plane.',
            },
            {
              question: 'Where is the torus flat in the sense $K=0$?',
              answerOutline: 'On its top and bottom circles, $v=\\pm\\pi/2$.',
            },
          ],
        },
        {
          slug: 'revolution-and-minimal-surfaces',
          title: 'Surfaces of revolution and minimal surfaces',
          summary:
            'Surfaces of revolution have curvature given by one formula, which produces surfaces of constant curvature. Surfaces with $H=0$ are critical points of area and model soap films.',
          estimatedMinutes: 110,
          objectives: [
            'Derive $K=-r\'\'/r$ for a surface of revolution with unit-speed profile',
            'Construct surfaces of constant positive and negative curvature',
            'Derive the minimal surface equation for graphs',
            'Verify that the catenoid and helicoid are minimal',
          ],
          concepts: [
            'Surface of revolution',
            'Pseudosphere',
            'Minimal surface',
            'Minimal surface equation',
            'Catenoid and helicoid',
          ],
          explanation: `Rotate a unit-speed profile curve $(r(s),z(s))$, with $r>0$ and $r'^2+z'^2=1$, about the $z$-axis:
$$X(s,\\theta)=(r(s)\\cos\\theta,\\,r(s)\\sin\\theta,\\,z(s)).$$
Then $E=1$, $F=0$, $G=r^2$. The meridians and parallels are principal directions, and the curvature has a strikingly simple form:
$$K=-\\frac{r''}{r}.$$
This formula involves only the function $r$ in the metric $ds^2+r^2d\\theta^2$, which anticipates the Theorema Egregium.

It also builds surfaces of constant curvature. For $K=1$, solve $r''=-r$, so $r=\\cos s$, the unit sphere. For $K=-1$, solve $r''=r$, so for instance $r=e^{-s}$ with $s>0$. The **pseudosphere** has profile $r=e^{-s}$ and $z=\\int_0^s\\sqrt{1-e^{-2u}}\\,du$, a tractrix, and it has curvature $-1$ everywhere, with a cusp edge at $s=0$. Its area is $2\\pi\\int_0^\\infty e^{-s}\\,ds=2\\pi$, finite though it is infinitely long.

A surface is **minimal** if $H\\equiv0$, so $\\kappa_1=-\\kappa_2$ and $K\\le0$. The name comes from the first variation of area. If you push the surface along its normal by $t\\varphi\\mathbf{n}$ with $\\varphi$ compactly supported, then
$$\\frac{d}{dt}\\Big|_{0}\\mathrm{Area}=-2\\iint H\\varphi\\,dA.$$
So $H=0$ exactly when the surface is a critical point of area for every such variation. Soap films spanning a wire are minimal surfaces. For a graph $z=f(x,y)$, $H=0$ becomes the **minimal surface equation**
$$(1+f_y^2)f_{xx}-2f_xf_yf_{xy}+(1+f_x^2)f_{yy}=0.$$

**Worked example.** For the catenoid $X(u,v)=(\\cosh v\\cos u,\\cosh v\\sin u,v)$, you found $E=G=\\cosh^2v$ and $F=0$. Using $\\mathbf{n}=X_u\\times X_v/|X_u\\times X_v|$, the second derivatives give
$$L=-1,\\qquad M=0,\\qquad N=1.$$
Hence
$$H=\\frac{EN+GL}{2EG}=\\frac{\\cosh^2v-\\cosh^2v}{2\\cosh^4v}=0,\\qquad K=\\frac{LN}{EG}=-\\frac{1}{\\cosh^4v}.$$
So the catenoid is minimal. The helicoid $(\\sinh v\\cos u,\\sinh v\\sin u,u)$ has the same $E,F,G$ but $L=N=0$ and $M=1$. Its second fundamental form is different, yet it is also minimal, and it has the same $K=-1/\\cosh^4v$ at corresponding points. That equality of $K$ is no accident: the two surfaces are locally isometric, and Module 4 proves that isometries preserve $K$.`,
          resources: [
            wikipedia('Minimal surface', 'Minimal_surface')('Definitions, examples and the physical interpretation.', true),
            mathWorld('Pseudosphere', 'Pseudosphere')('The tractrix profile and the curvature of the pseudosphere.'),
            surfaceGallery('Rotate the minimal surfaces in the gallery and watch the helicoid-catenoid deformation.'),
          ],
          exercises: [
            {
              slug: 'revolution-formula',
              title: 'Curvature of a surface of revolution',
              prompt: `Derive $K=-r''/r$ for a unit-speed profile, by computing $L,M,N$ and using $r'r''+z'z''=0$. Find the principal curvatures, and check that $r=\\cos s$ gives the unit sphere.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'The principal curvatures, up to the normal\'s sign, are $r\'z\'\'-r\'\'z\'$ along meridians and $z\'/r$ along parallels.',
            },
            {
              slug: 'helicoid-minimal',
              title: 'The helicoid',
              prompt: `Show that the helicoid $X(u,v)=(u\\cos v,u\\sin v,v)$ has $H=0$ and $K=-1/(1+u^2)^2$. Find its asymptotic curves, and show that it is a ruled surface whose rulings are asymptotic.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'scherk',
              title: 'Scherk\'s surface',
              prompt: `Derive the minimal surface equation for a graph from $H=0$. Show that Scherk's surface $z=\\ln(\\cos x/\\cos y)$, on the square where $|x|,|y|<\\pi/2$, satisfies it. Confirm with SymPy.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'soap-film',
              title: 'When does a soap film break?',
              prompt: `Two coaxial rings of radius 1 lie in the planes $z=\\pm h$. A catenoid $r=c\\cosh(z/c)$ spans them if $c\\cosh(h/c)=1$. With $x=h/c$, show this means $h=x/\\cosh x$, and that a solution exists only if $h\\le h_{\\max}=\\max_{x>0}x/\\cosh x$. Find $h_{\\max}$ numerically. What happens physically when the rings are pulled farther apart?`,
              kind: 'simulation',
              difficulty: 2,
              hint: '$h_{\\max}\\approx0.6627$, at $x\\approx1.1997$.',
            },
            {
              slug: 'first-variation',
              title: 'The first variation of area',
              prompt: `For a graph $z=f(x,y)$ over a domain $D$, consider $f+t\\varphi$ with $\\varphi$ smooth and zero near the boundary of $D$. Differentiate $\\iint_D\\sqrt{1+|\\nabla(f+t\\varphi)|^2}$ at $t=0$, integrate by parts, and show the derivative vanishes for all $\\varphi$ exactly when $f$ satisfies the minimal surface equation.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must a minimal surface have $K\\le0$?',
              answerOutline: '$\\kappa_2=-\\kappa_1$, so $K=-\\kappa_1^2\\le0$.',
            },
            {
              question: 'What surface of revolution has $r(s)=\\cos s$?',
              answerOutline: 'The unit sphere, with $K=1$.',
            },
            {
              question: 'Do the catenoid and the helicoid have the same second fundamental form?',
              answerOutline: 'No. They share $E,F,G$ and $K$, but $L,M,N$ differ.',
            },
          ],
        },
      ],
      project: {
        slug: 'curvature-calculator',
        title: 'A curvature calculator',
        description: `Write a SymPy-based tool that takes a patch $X(u,v)$ and returns, in simplified form, $E,F,G$, $L,M,N$, the shape operator matrix, $K$, $H$ and the principal curvatures. Add a numerical mode that evaluates these on a grid and colours a 3D plot of the surface by $K$ or $H$.

Your test suite should contain known answers from this module: the sphere ($K=1$), the torus ($K=\\cos v/(r(R+r\\cos v))$), the catenoid and helicoid ($H=0$, $K=-1/\\cosh^4v$), the pseudosphere ($K=-1$), the monkey saddle (a planar point at the origin) and the ellipsoid (the formula from the exercise). Each test also checks that reversing the parametrization's orientation flips $H$ and keeps $K$.

Then use the tool to explore one surface no one has given you the answer for, such as a Dupin cyclide, an Enneper surface or a surface from your own field, and describe where it is elliptic, hyperbolic and parabolic.`,
        deliverables: [
          'A Python module with a symbolic function and a numerical function, both documented',
          'A test suite covering the seven known cases and the orientation check',
          'Curvature-coloured plots of the torus and the catenoid, with the parabolic curves marked',
          'A short report on the surface you chose, including the curve where $K=0$ and a check of $\\iint K\\,dA$ if the surface is closed',
        ],
        estimatedHours: 3,
        stretchGoals: [
          'Add lines of curvature, traced by following principal directions numerically',
          'Estimate $K$ and $H$ on a triangle mesh by fitting quadrics, and compare with the exact values',
        ],
      },
    },
    {
      slug: 'intrinsic-geometry',
      title: 'Intrinsic Geometry',
      description:
        'What a surface knows about itself: Christoffel symbols, Gauss\'s Theorema Egregium, parallel transport, and geodesics as the straightest and locally shortest curves.',
      lessons: [
        {
          slug: 'christoffel-symbols',
          title: 'Christoffel symbols',
          summary:
            'Second derivatives of a patch split into tangential and normal parts. The tangential coefficients are determined by the first fundamental form alone.',
          estimatedMinutes: 110,
          objectives: [
            'Write the Gauss formulas for $X_{uu}$, $X_{uv}$ and $X_{vv}$',
            'Compute Christoffel symbols from $E,F,G$',
            'Prove that the Christoffel symbols are intrinsic',
            'Compute them for spheres, surfaces of revolution and the hyperbolic plane',
          ],
          concepts: [
            'Gauss formulas',
            'Christoffel symbols',
            'Index notation and summation',
            'Intrinsic quantities',
            'Weingarten equations',
          ],
          explanation: `Write $u^1=u$ and $u^2=v$, $X_i=\\partial X/\\partial u^i$, and $g_{ij}=X_i\\cdot X_j$, so $g_{11}=E$, $g_{12}=F$, $g_{22}=G$. At each point, $X_1,X_2,\\mathbf{n}$ form a basis of $\\mathbb{R}^3$. So the second derivatives can be expanded in it:
$$X_{ij}=\\Gamma^1_{ij}X_1+\\Gamma^2_{ij}X_2+h_{ij}\\mathbf{n},$$
where $h_{11}=L$, $h_{12}=M$, $h_{22}=N$. These are the **Gauss formulas**, and the coefficients $\\Gamma^k_{ij}=\\Gamma^k_{ji}$ are the **Christoffel symbols**. The derivatives of the normal close the system: $\\mathbf{n}_i=-S(X_i)$, the **Weingarten equations**.

The key fact is that the $\\Gamma$'s depend only on $g$. Dot the Gauss formula with $X_l$:
$$X_{ij}\\cdot X_l=\\sum_k\\Gamma^k_{ij}g_{kl}.$$
The left side is expressible through derivatives of $g$. For instance, $\\partial_ig_{jl}=X_{ij}\\cdot X_l+X_j\\cdot X_{il}$. Combining three such identities and inverting $g$ gives
$$\\Gamma^k_{ij}=\\tfrac12\\sum_lg^{kl}\\big(\\partial_ig_{jl}+\\partial_jg_{il}-\\partial_lg_{ij}\\big),$$
where $g^{kl}$ are the entries of $g^{-1}$. So anything computed from the $\\Gamma$'s is intrinsic, and that includes acceleration along the surface and, in the next lesson, $K$.

**Worked example.** On the unit sphere, $(u^1,u^2)=(\\varphi,\\theta)$ with $g=\\mathrm{diag}(1,\\sin^2\\varphi)$. The only non-zero derivative of $g$ is $\\partial_\\varphi g_{22}=2\\sin\\varphi\\cos\\varphi$. For diagonal metrics the formula simplifies, and you get
$$\\Gamma^\\varphi_{\\theta\\theta}=-\\tfrac12g^{11}\\partial_\\varphi g_{22}=-\\sin\\varphi\\cos\\varphi,\\qquad\\Gamma^\\theta_{\\varphi\\theta}=\\Gamma^\\theta_{\\theta\\varphi}=\\tfrac12g^{22}\\partial_\\varphi g_{22}=\\cot\\varphi.$$
All others vanish. A check in space: along a parallel, $X_{\\theta\\theta}=-(\\sin\\varphi\\cos\\theta,\\sin\\varphi\\sin\\theta,0)$ points at the axis. Its tangential part points along $X_\\varphi$, which runs towards the south pole, with coefficient $-\\sin\\varphi\\cos\\varphi$. North of the equator, where $\\cos\\varphi>0$, this pushes towards the north pole, as the formula says. A body moving along a parallel north of the equator would have to be pushed north to stay on it, which already hints that parallels are not geodesics.

These symbols, with the same formula in more dimensions, are the ones used in general relativity.`,
          resources: [
            wikipedia('Christoffel symbols', 'Christoffel_symbols')('The general formula and its role in covariant derivatives. Use the surface case for now.', true),
            sympyDocs('Write a function that computes all $\\Gamma^k_{ij}$ from a metric matrix, and reuse it for the rest of the module.'),
          ],
          exercises: [
            {
              slug: 'derive-christoffel',
              title: 'The formula for the Christoffel symbols',
              prompt: `Derive the formula for $\\Gamma^k_{ij}$ in terms of $g$ and its derivatives. Write out the six symbols explicitly when $F=0$, in terms of $E$, $G$ and their partial derivatives.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'With $F=0$, for example, $\\Gamma^1_{11}=E_u/(2E)$ and $\\Gamma^2_{11}=-E_v/(2G)$.',
            },
            {
              slug: 'revolution-christoffel',
              title: 'Metrics of revolution',
              prompt: `For the metric $du^2+r(u)^2dv^2$, show the only non-zero symbols are $\\Gamma^u_{vv}=-rr'$ and $\\Gamma^v_{uv}=\\Gamma^v_{vu}=r'/r$. Check with the sphere, where $r=\\sin u$.`,
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'half-plane-christoffel',
              title: 'The hyperbolic half-plane',
              prompt: `On $\\{(u,v):v>0\\}$ take $E=G=1/v^2$, $F=0$. This metric does not come from a surface in $\\mathbb{R}^3$, but the formula still applies. Compute all six symbols.`,
              kind: 'problem',
              difficulty: 1,
              hint: '$\\Gamma^u_{uv}=-1/v$, $\\Gamma^v_{uu}=1/v$, $\\Gamma^v_{vv}=-1/v$, and the rest are 0.',
            },
            {
              slug: 'torus-gauss-formula',
              title: 'Checking the Gauss formula',
              prompt: `For the torus, compute the Christoffel symbols from the metric, then verify in SymPy that $X_{uu}-\\Gamma^1_{uu}X_u-\\Gamma^2_{uu}X_v$ is a multiple of $\\mathbf{n}$, equal to $L\\mathbf{n}$. Do the same for $X_{uv}$ and $X_{vv}$.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are the Christoffel symbols intrinsic?',
              answerOutline: 'They are given by a formula in $g$ and its first derivatives.',
            },
            {
              question: 'What is $\\Gamma^k_{ij}$ in the plane with Cartesian coordinates?',
              answerOutline: 'Zero, because $g$ is constant.',
            },
            {
              question: 'Which part of $X_{ij}$ is not intrinsic?',
              answerOutline: 'The normal part, $h_{ij}\\mathbf{n}$.',
            },
          ],
          relatedLessons: ['relativity/tensors-and-curved-spaces/covariant-derivatives-and-christoffel-symbols'],
        },
        {
          slug: 'theorema-egregium',
          title: 'Gauss\'s Theorema Egregium',
          summary:
            'Gaussian curvature, defined using the normal in space, can be computed from the metric alone. So isometric surfaces have the same curvature.',
          estimatedMinutes: 130,
          objectives: [
            'State and prove the Theorema Egregium',
            'Compute $K$ from $E,F,G$ in orthogonal coordinates',
            'Use the theorem to show surfaces are not isometric',
            'State the Codazzi equations and Bonnet\'s theorem',
          ],
          concepts: [
            'Theorema Egregium',
            'Gauss equation',
            'Codazzi-Mainardi equations',
            'Compatibility conditions',
            'Bonnet\'s theorem',
          ],
          explanation: `**Theorema Egregium.** The Gaussian curvature of a surface depends only on its first fundamental form and its derivatives. Hence a local isometry preserves $K$.

This is surprising, because $K=\\kappa_1\\kappa_2$ was defined through the normal. The individual principal curvatures are *not* intrinsic. A plane and a cylinder are locally isometric, with principal curvatures $(0,0)$ and $(0,-1/a)$, but both have $K=0$.

**Proof idea.** Mixed third derivatives commute: $(X_{11})_2=(X_{12})_1$. Expand each side using the Gauss formulas, then the Weingarten equations for the derivatives of $\\mathbf{n}$. Taking the $X_2$ component of the difference gives the **Gauss equation**: $LN-M^2$ equals an expression in the $\\Gamma$'s and their derivatives. Since $K=(LN-M^2)/(EG-F^2)$, $K$ is intrinsic. The normal components of the same identities give the **Codazzi-Mainardi equations**, which constrain $L,M,N$.

In orthogonal coordinates, $F=0$, the result is
$$K=-\\frac{1}{2\\sqrt{EG}}\\left[\\Big(\\frac{E_v}{\\sqrt{EG}}\\Big)_v+\\Big(\\frac{G_u}{\\sqrt{EG}}\\Big)_u\\right].$$
If moreover $E=1$, this becomes $K=-(\\sqrt G)_{uu}/\\sqrt G$. If $E=G=\\lambda^2$, the coordinates are isothermal, and $K=-\\Delta(\\ln\\lambda)/\\lambda^2$.

**Bonnet's theorem.** Given $g$ and $h$ on a simply connected domain, with $g$ positive definite, satisfying the Gauss and Codazzi equations, there is a surface with these fundamental forms, unique up to a rigid motion. It plays the role for surfaces that the fundamental theorem plays for curves.

**Worked example.** Find $K$ for the stereographic metric $E=G=4/(1+u^2+v^2)^2$, $F=0$. Here $\\lambda=2/(1+\\rho^2)$ with $\\rho^2=u^2+v^2$, so
$$\\ln\\lambda=\\ln2-\\ln(1+\\rho^2).$$
For a radial function, $\\Delta f=f''+f'/\\rho$, and with $f=-\\ln(1+\\rho^2)$,
$$f'=-\\frac{2\\rho}{1+\\rho^2},\\qquad f''=-\\frac{2(1-\\rho^2)}{(1+\\rho^2)^2},\\qquad\\Delta f=-\\frac{4}{(1+\\rho^2)^2}.$$
So $K=\\dfrac{4/(1+\\rho^2)^2}{4/(1+\\rho^2)^2}=1$, as it must be for the unit sphere. The calculation used only the metric.

Two consequences. No map of a region of the Earth to a flat sheet preserves all distances, since $K=1/R^2\\ne0$. And a slice of pizza held flat at the crust droops, but bent into a trough it stays rigid: it must keep $K=0$, so once it curves in one direction it cannot curve in the other.`,
          resources: [
            wikipedia('Theorema Egregium', 'Theorema_Egregium')('Statement, history and the pizza example.', true),
            gaussPaper('Gauss\'s 1827 paper in English translation, where the theorem first appears. Read it for history, alongside this lesson.'),
            wikipedia('Gauss-Codazzi equations', 'Gauss%E2%80%93Codazzi_equations')('The compatibility equations in index notation.'),
          ],
          exercises: [
            {
              slug: 'gauss-equation',
              title: 'Proving the Gauss equation',
              prompt: `Carry out the proof sketched in the lesson, in the case $F=0$. Expand $(X_{uu})_v-(X_{uv})_u$ and take its component along $X_v$ to obtain $LN-M^2$ in terms of $E$, $G$ and their derivatives. Confirm that the result matches the orthogonal formula in the lesson.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'orthogonal-formula-practice',
              title: 'Curvature from metrics',
              prompt: `Compute $K$ from the metric alone for (a) $du^2+\\sin^2u\\,dv^2$, (b) $du^2+\\cosh^2u\\,dv^2$, (c) the half-plane metric $(du^2+dv^2)/v^2$, and (d) the torus metric $(R+r\\cos v)^2du^2+r^2dv^2$. Check (d) against the extrinsic answer from Module 3.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 1, (b) $-1$, (c) $-1$, (d) $\\cos v/(r(R+r\\cos v))$.',
            },
            {
              slug: 'same-k-not-isometric',
              title: 'Equal curvature is not enough',
              prompt: `Let $X(u,v)=(u\\cos v,u\\sin v,\\ln u)$ and $Y(u,v)=(u\\cos v,u\\sin v,v)$ for $u>0$. Show both have $K=-1/(1+u^2)^2$ at the point with parameters $(u,v)$. Show the map $X(u,v)\\mapsto Y(u,v)$ is not an isometry, by computing both metrics. Explain why this does not contradict the Theorema Egregium.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'The metrics are $(1+1/u^2)du^2+u^2dv^2$ and $du^2+(1+u^2)dv^2$.',
            },
            {
              slug: 'codazzi-check',
              title: 'Codazzi on the torus',
              prompt: `Write the two Codazzi equations for $F=0$, and verify them for the torus with $L=-(R+r\\cos v)\\cos v$, $M=0$, $N=-r$. Then explain why a pair $(g,h)$ with $g$ the flat metric and $h=\\mathrm{diag}(1,1)$ cannot be the fundamental forms of any surface.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the second part, the Gauss equation would give $K=0$ from the metric, but $(LN-M^2)/(EG-F^2)=1$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Is mean curvature intrinsic?',
              answerOutline: 'No. A plane and a cylinder are locally isometric but have different $H$.',
            },
            {
              question: 'What does the theorem imply for flat maps of the Earth?',
              answerOutline: 'None can preserve all distances, since $K\\ne0$ on the sphere and $K=0$ in the plane.',
            },
            {
              question: 'What extra condition does Bonnet\'s theorem need beyond $g$ and $h$?',
              answerOutline: 'The Gauss and Codazzi equations must hold, and the domain must be simply connected.',
            },
          ],
        },
        {
          slug: 'parallel-transport',
          title: 'Covariant derivative and parallel transport',
          summary:
            'Differentiate a tangent field along a curve, keep only the tangential part, and you get a derivative an inhabitant of the surface can compute. Transport by it around a loop rotates vectors by the enclosed curvature.',
          estimatedMinutes: 110,
          objectives: [
            'Define the covariant derivative of a vector field along a curve',
            'Write and solve the parallel transport equations',
            'Prove that parallel transport preserves inner products',
            'Compute holonomy around a circle of latitude',
          ],
          concepts: [
            'Covariant derivative',
            'Parallel vector field',
            'Parallel transport',
            'Holonomy',
            'Foucault pendulum',
          ],
          explanation: `Let $\\alpha(t)$ be a curve on $\\Sigma$ and $V(t)$ a tangent vector field along it. The ordinary derivative $V'$ usually leaves the tangent plane. The **covariant derivative** keeps only the tangential part:
$$\\frac{DV}{dt}=V'-(V'\\cdot\\mathbf{n})\\mathbf{n}.$$
In coordinates, with $\\alpha=X(u^1(t),u^2(t))$ and $V=\\sum V^kX_k$, the Gauss formulas give
$$\\frac{DV}{dt}=\\sum_k\\Big(\\frac{dV^k}{dt}+\\sum_{i,j}\\Gamma^k_{ij}\\frac{du^i}{dt}V^j\\Big)X_k.$$
Only $g$ appears, through the $\\Gamma$'s, so the covariant derivative is intrinsic.

$V$ is **parallel** if $DV/dt=0$. This is a linear first-order system for $V^1,V^2$, so for any starting vector there is a unique parallel field along the curve, called **parallel transport**. If $V,W$ are parallel, then
$$(V\\cdot W)'=\\frac{DV}{dt}\\cdot W+V\\cdot\\frac{DW}{dt}=0,$$
because the normal parts of $V'$ and $W'$ are perpendicular to $W$ and $V$. So parallel transport preserves lengths and angles. In the plane it is ordinary translation, so a vector carried around a loop comes back unchanged. On a curved surface it need not, and the rotation is called **holonomy**.

**Worked example.** Transport a vector around the parallel at colatitude $a$ on the unit sphere, with $0<a<\\pi/2$, $\\alpha(t)=(a,t)$ for $t$ from 0 to $2\\pi$. With $u^1=\\varphi$ constant and $u^2=\\theta=t$, the equations become
$$\\dot V^\\varphi=\\sin a\\cos a\\,V^\\theta,\\qquad\\dot V^\\theta=-\\cot a\\,V^\\varphi.$$
Use orthonormal components $p=V^\\varphi$ and $q=\\sin a\\,V^\\theta$. Then $\\dot p=\\cos a\\,q$ and $\\dot q=-\\cos a\\,p$, a rotation at the constant rate $\\cos a$. After one trip the vector has turned by $-2\\pi\\cos a$ relative to the frame of the meridian and parallel directions, and that frame is back where it started. Modulo $2\\pi$, this equals $2\\pi(1-\\cos a)$, which is the area of the polar cap enclosed by the circle. The rotation equals the integral of $K$ over the cap, a first instance of Gauss-Bonnet. At the equator there is no rotation, and near the pole almost a full turn.

The same mathematics explains **Foucault's pendulum**. Its plane of swing is carried by parallel transport as the Earth turns, and it precesses at $360^\\circ\\sin(\\text{latitude})$ per sidereal day, about $271^\\circ$ in Paris.`,
          resources: [
            wikipedia('Parallel transport', 'Parallel_transport')('Definitions and the sphere example, in more general language.', true),
            craneLectures('The lectures on connections and parallel transport, with visual explanations of holonomy.'),
          ],
          exercises: [
            {
              slug: 'covariant-coordinates',
              title: 'Covariant derivative in coordinates',
              prompt: `Derive the coordinate formula for $DV/dt$ from the definition and the Gauss formulas. Deduce that if $\\phi$ is a local isometry, then $\\phi$ carries parallel fields along $\\alpha$ to parallel fields along $\\phi\\circ\\alpha$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'latitude-holonomy',
              title: 'Holonomy numerically',
              prompt: `Solve the parallel transport equations along the circle of colatitude $a$ with SciPy, for $a=0.3$, $1.0$ and $1.3$, and confirm the rotation of $-2\\pi\\cos a$. Then compute the Foucault precession for your own latitude, in degrees per sidereal day.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'octant-transport',
              title: 'Around a spherical triangle',
              prompt: `Transport a vector around the geodesic triangle on the unit sphere with vertices at the north pole and at $(1,0,0)$ and $(0,1,0)$, along three quarter great circles. Without solving any equations, use the fact that a parallel field makes a constant angle with the tangent of a geodesic to show that the vector turns by $\\pi/2$. Compare with the area of the triangle.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Track the angle between the vector and the tangent. It changes only at the corners, by the exterior angle $\\pi/2$ each time.',
            },
            {
              slug: 'cone-holonomy',
              title: 'Holonomy without curvature',
              prompt: `On the cone of half-angle $\\alpha$, the curvature is 0 away from the vertex. By unrolling the cone onto a plane sector of angle $2\\pi\\sin\\alpha$, show that parallel transport around a circle about the vertex rotates a vector by $2\\pi(1-\\sin\\alpha)$ modulo $2\\pi$. Explain where the curvature is.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does parallel transport preserve lengths?',
              answerOutline: 'The derivative of $V\\cdot V$ is $2\\frac{DV}{dt}\\cdot V$, because $V\'$ minus its tangential part is normal. This is 0 for parallel $V$.',
            },
            {
              question: 'What is the holonomy around the equator of a sphere?',
              answerOutline: 'None. The equator encloses half the sphere, area $2\\pi$, which is 0 modulo $2\\pi$.',
            },
            {
              question: 'Is parallel transport around a closed loop in the plane ever non-trivial?',
              answerOutline: 'No. It is translation.',
            },
          ],
        },
        {
          slug: 'geodesics',
          title: 'Geodesics',
          summary:
            'Geodesics are curves whose acceleration is purely normal, the straightest curves a surface allows. On a surface of revolution Clairaut\'s relation describes them all.',
          estimatedMinutes: 120,
          objectives: [
            'Define geodesics and write the geodesic equations',
            'Find geodesics on the plane, sphere, cylinder and cone',
            'Prove Clairaut\'s relation',
            'Integrate geodesics numerically and check conserved quantities',
          ],
          concepts: [
            'Geodesic',
            'Geodesic equations',
            'Constant speed',
            'Clairaut\'s relation',
            'Great circles',
          ],
          explanation: `A curve $\\gamma$ on $\\Sigma$ is a **geodesic** if $D\\gamma'/dt=0$: its velocity is parallel along itself. Equivalently, its acceleration in space is normal to the surface, so an inhabitant feels no sideways push. In coordinates,
$$\\ddot u^k+\\sum_{i,j}\\Gamma^k_{ij}\\dot u^i\\dot u^j=0,\\qquad k=1,2.$$
These are second-order ODEs, so through every point in every direction there is a unique geodesic, defined at least for a short time. Since $\\gamma'$ is parallel, its length is constant: geodesics have constant speed. Being intrinsic, geodesics are carried to geodesics by isometries.

Examples. In the plane, geodesics are straight lines at constant speed. On a sphere, great circles have acceleration pointing at the centre, which is normal, so they are geodesics, and by uniqueness they are all of them. On a cylinder, unrolling to a plane, an isometry, turns geodesics into straight lines, so they are helices, circles and rulings.

**Clairaut's relation.** On a surface of revolution with metric $ds^2+r(s)^2d\\theta^2$, the $\\theta$-equation is $\\frac{d}{dt}(r^2\\dot\\theta)=0$. So along a geodesic $r^2\\dot\\theta$ is constant. For a unit-speed geodesic, $r\\dot\\theta=\\sin\\psi$, where $\\psi$ is the angle between the geodesic and the meridian. So
$$r\\sin\\psi=\\text{constant}.$$
It is the conservation of angular momentum about the axis, and it explains a lot. A geodesic heading towards a narrower part of the surface must turn more sideways, and if $r$ gets as small as the constant, it turns back.

**Worked example.** Which parallels of a surface of revolution are geodesics? Along a parallel $s=s_0$ traced at unit speed, $\\dot s=0$ and $\\dot\\theta=1/r$. The $s$-equation reads $\\ddot s+\\Gamma^s_{\\theta\\theta}\\dot\\theta^2=\\ddot s-rr'\\dot\\theta^2=0$. With $\\ddot s=0$, this needs $r'(s_0)\\,r(s_0)\\cdot\\frac{1}{r(s_0)^2}=0$, so $r'(s_0)=0$. A parallel is a geodesic exactly where the profile is momentarily parallel to the axis, at a widest or narrowest circle. On the sphere, only the equator qualifies. On the torus, both the outer equator and the inner equator are geodesics, but the top and bottom circles are not. Meridians are always geodesics, by the reflection symmetry through the plane containing them.

The sphere also shows that geodesics need not be shortest. Going the long way round a great circle between two points is a geodesic, but longer than the short way.`,
          resources: [
            wikipedia('Geodesic', 'Geodesic')('Overview, including the equations and examples in many settings.', true),
            wikipedia('Clairaut\'s relation', 'Clairaut%27s_relation')('Statement and proof for surfaces of revolution.'),
            mathWorld('Geodesic', 'Geodesic')('The geodesic equations, and solutions on standard surfaces.'),
          ],
          exercises: [
            {
              slug: 'clairaut-proof',
              title: 'Clairaut\'s relation',
              prompt: `Prove Clairaut's relation from the geodesic equations for $ds^2+r(s)^2d\\theta^2$. Then prove the converse: a unit-speed curve that is not a parallel and satisfies $r\\sin\\psi=$ constant is a geodesic. Why is the restriction about parallels needed?`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cone-geodesics',
              title: 'Geodesics on a cone',
              prompt: `Use the unrolling map from Module 2 to describe all geodesics on the cone of half-angle $\\alpha$. Show that a geodesic that is not a ruling winds around the vertex a finite total angle, and that it can cross itself when $\\sin\\alpha<1/2$. How many self-crossings occur for $\\sin\\alpha=0.2$?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'A line in the plane covers an angle of $\\pi$ about a point not on it. On the cone that becomes an angle of $\\pi/\\sin\\alpha$ around the axis. For $\\sin\\alpha=0.2$, the geodesic wraps $2.5$ times around and crosses itself twice.',
            },
            {
              slug: 'great-circle-route',
              title: 'Flight routes',
              prompt: `Model the Earth as a sphere of radius 6371 km. Find the great-circle distance between Chicago ($41.88^\\circ$N, $87.63^\\circ$W) and Paris ($48.86^\\circ$N, $2.35^\\circ$E), and the length of the loxodrome between them. Explain the difference, and why the great-circle route passes farther north than either city.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'About 6650 km for the great circle and about 7060 km for the loxodrome.',
            },
            {
              slug: 'torus-geodesics',
              title: 'Geodesics on a torus',
              prompt: `Integrate the geodesic equations on the torus with $R=3$, $r=1$ from a point on the outer equator, for several launch angles. Check numerically that speed and Clairaut's constant are conserved to the solver tolerance. Find the launch angles for which the geodesic is trapped in the outer region and never reaches the inner equator.`,
              kind: 'simulation',
              difficulty: 2,
              hint: 'A geodesic starting on the outer equator at angle $\\psi$ to the meridian has constant $4\\sin\\psi$. It can reach the inner equator, where $r=2$, only if $4\\sin\\psi\\le2$.',
            },
            {
              slug: 'half-plane-geodesics',
              title: 'Geodesics of the hyperbolic plane',
              prompt: `For the half-plane metric $(du^2+dv^2)/v^2$, show that vertical lines and semicircles centred on the $u$-axis are geodesics. Verify that $u=\\tanh t$, $v=1/\\cosh t$ is a unit-speed solution of the geodesic equations. Explain why, by uniqueness, these are all the geodesics.`,
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do geodesics have constant speed?',
              answerOutline: 'Their velocity is parallel, and parallel transport preserves length.',
            },
            {
              question: 'Which parallels on a surface of revolution are geodesics?',
              answerOutline: 'Those where $r\'=0$, at widest or narrowest circles.',
            },
            {
              question: 'Is every geodesic the shortest path between its endpoints?',
              answerOutline: 'No. Only locally. The long arc of a great circle is a counterexample.',
            },
          ],
          relatedLessons: ['relativity/tensors-and-curved-spaces/geodesics'],
        },
        {
          slug: 'geodesic-coordinates-and-shortest-paths',
          title: 'Geodesic coordinates and shortest paths',
          summary:
            'Geodesics from a point give polar coordinates in which the metric is simple. In them, geodesics are locally shortest, and curvature appears in the circumference of small circles.',
          estimatedMinutes: 110,
          objectives: [
            'Define the exponential map and geodesic polar coordinates',
            'State the Gauss lemma and use it to show geodesics locally minimise length',
            'Express curvature through the circumference of small geodesic circles',
            'State Minding\'s theorem and the Hopf-Rinow theorem',
          ],
          concepts: [
            'Exponential map',
            'Geodesic polar coordinates',
            'Gauss lemma',
            'Local length minimisation',
            'Bertrand-Puiseux formula',
            'Completeness',
          ],
          explanation: `Fix $p$ on $\\Sigma$. For a tangent vector $w$ at $p$, follow the geodesic with initial velocity $w$ for unit time, and call the end point $\\exp_p(w)$. This is the **exponential map**. Its differential at 0 is the identity, so by the inverse function theorem it is a diffeomorphism from a small disc in $T_p\\Sigma$ onto a neighbourhood of $p$. Polar coordinates $(r,\\theta)$ on the disc then give **geodesic polar coordinates** on the surface: $r$ is the distance along the geodesic, and $\\theta$ the starting direction.

**Gauss lemma.** In these coordinates the metric has the form
$$ds^2=dr^2+G(r,\\theta)\\,d\\theta^2,\\qquad\\sqrt G=r-\\frac{K(p)}{6}r^3+O(r^4).$$
The radial geodesics are unit speed and cut the circles $r=$ constant at right angles.

**Geodesics are locally shortest.** Let $\\alpha$ be any curve from $p$ to a point $q$ at radius $r_0$, staying within the coordinate disc. Its length is
$$\\int\\sqrt{\\dot r^2+G\\dot\\theta^2}\\,dt\\ge\\int|\\dot r|\\,dt\\ge r_0,$$
which is the length of the radial geodesic. Equality needs $\\dot\\theta=0$, so it holds only for the geodesic itself, up to reparametrization. Over long distances this can fail: past the antipode, a great circle stops being shortest.

The expansion of $\\sqrt G$ gives curvature a vivid meaning. The circle of radius $r$ about $p$ has circumference
$$C(r)=\\int_0^{2\\pi}\\sqrt G\\,d\\theta=2\\pi r-\\frac{\\pi}{3}K(p)\\,r^3+O(r^4),$$
so
$$K(p)=\\lim_{r\\to0}\\frac{3\\big(2\\pi r-C(r)\\big)}{\\pi r^3}.$$
This is the **Bertrand-Puiseux formula**. An inhabitant can measure $K$ with a rope and a stake.

**Worked example.** On the unit sphere, take $p$ at the north pole. Geodesic polar coordinates are colatitude and longitude, so $G=\\sin^2r$, and $\\sqrt G=\\sin r=r-r^3/6+\\dots$, which matches $K=1$. Then
$$C(r)=2\\pi\\sin r=2\\pi r-\\frac{\\pi r^3}{3}+\\dots,$$
and the limit is 1. On the hyperbolic plane, $C(r)=2\\pi\\sinh r$, which is larger than $2\\pi r$, and the formula gives $-1$. The area of the disc behaves the same way: on the sphere $2\\pi(1-\\cos r)=\\pi r^2-\\pi r^4/12+\\dots$.

**Two theorems to know.** **Minding's theorem**: surfaces with the same constant curvature are locally isometric. **Hopf-Rinow**: if every geodesic of a connected surface extends for all time, then any two points are joined by a shortest geodesic.`,
          resources: [
            wikipedia('Exponential map', 'Exponential_map_(Riemannian_geometry)')('Definition in general dimension, and the Gauss lemma.', true),
            mit18950('The notes on the global geometry of hypersurfaces, for geodesics and their minimising properties.'),
          ],
          exercises: [
            {
              slug: 'gauss-lemma',
              title: 'The Gauss lemma',
              prompt: `Assume that in geodesic polar coordinates radial lines are unit-speed geodesics, so $E=1$. Use the geodesic equations to show $F_r=0$. Then show $F\\to0$ as $r\\to0$, using a Cartesian chart near $p$, and conclude $F=0$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'With $E=1$, $\\Gamma^r_{rr}=g^{r\\theta}F_r$ and $\\Gamma^\\theta_{rr}=g^{\\theta\\theta}F_r$. The radial lines solve the geodesic equations only if both vanish, and $g^{\\theta\\theta}\\ne0$.',
            },
            {
              slug: 'circumference-expansion',
              title: 'Curvature from circles',
              prompt: `From the metric $dr^2+G\\,d\\theta^2$ with $K=-(\\sqrt G)_{rr}/\\sqrt G$, $\\sqrt G\\to 0$ and $(\\sqrt G)_r\\to1$ as $r\\to0$, derive the expansion $\\sqrt G=r-\\tfrac16K(p)r^3+O(r^4)$, and the Bertrand-Puiseux formula. Check the formula with exact circumferences on the sphere, the plane and the hyperbolic plane.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'shortest-paths-fail',
              title: 'When geodesics stop being shortest',
              prompt: `(a) On the unit sphere, show the great circle arc of length $L$ from $p$ is shortest exactly when $L\\le\\pi$. (b) On the cylinder of radius 1, find all geodesics between two points on the same ruling a distance 1 apart, and determine which is shortest. (c) On the plane with the origin removed, show there is no shortest path between $(-1,0)$ and $(1,0)$, and explain why Hopf-Rinow does not apply.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'measure-k-on-a-mesh',
              title: 'Measuring curvature like an inhabitant',
              prompt: `On a triangulated sphere of radius 2, with at least 10,000 vertices, compute approximate geodesic distances from a vertex by Dijkstra's algorithm on edge lengths. Estimate $C(r)$ by counting edges crossed by the level set, or by another method you justify. Apply the Bertrand-Puiseux formula for several $r$, and compare with $K=1/4$. Discuss the errors.`,
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Gauss lemma say?',
              answerOutline: 'In geodesic polar coordinates the metric is $dr^2+G\\,d\\theta^2$, so radial geodesics meet geodesic circles at right angles.',
            },
            {
              question: 'Is the circumference of a small circle larger or smaller than $2\\pi r$ when $K<0$?',
              answerOutline: 'Larger.',
            },
            {
              question: 'What does Minding\'s theorem say?',
              answerOutline: 'Surfaces of the same constant curvature are locally isometric.',
            },
          ],
        },
      ],
      project: {
        slug: 'geodesic-tracer',
        title: 'Geodesic tracer',
        description: `Build a program that, given only a metric $E,F,G$ in some coordinates, computes Christoffel symbols symbolically, integrates geodesics and parallel transport numerically, and plots the results, either on an embedded surface or in the coordinate plane.

Validate it on cases you can solve by hand: great circles on the sphere, helices on the cylinder, semicircles in the half-plane, and the latitude holonomy of $-2\\pi\\cos a$. Then use it to explore. On the torus with $R=3$, $r=1$, map which launch angles from the outer equator give geodesics that cross the inner equator, and compare with the Clairaut prediction. On the catenoid, trace geodesics from a point on the neck and show that some spiral towards the neck forever.

Finally, test the claim that geodesics are only locally shortest. On the sphere or an ellipsoid, find two different geodesics between the same pair of points by shooting, and compare their lengths.`,
        deliverables: [
          'A module that builds geodesic and parallel transport equations from any metric, with tests against the four hand-solved cases',
          'Plots of geodesics on the torus, catenoid and half-plane',
          'A numerical check that speed and Clairaut\'s constant are conserved, as a plot of their drift against step size',
          'A shooting method that finds geodesics between two given points, demonstrated on an ellipsoid with at least two geodesics between one pair',
          'A short report on what you found, with the limits of the numerical method',
        ],
        estimatedHours: 4,
        stretchGoals: [
          'Compute the cut locus of a point on an ellipsoid, the set where geodesics stop being shortest',
          'Add a symplectic integrator and compare long-time conservation with an adaptive Runge-Kutta method',
        ],
      },
    },
    {
      slug: 'gauss-bonnet',
      title: 'The Gauss-Bonnet Theorem',
      description:
        'Geodesic curvature, the local Gauss-Bonnet formula for regions with corners, the global theorem linking total curvature to the Euler characteristic, and its consequences.',
      lessons: [
        {
          slug: 'geodesic-curvature',
          title: 'Geodesic curvature',
          summary:
            'The acceleration of a curve on a surface splits into a normal part, set by the surface, and a tangential part, the geodesic curvature, which an inhabitant can measure.',
          estimatedMinutes: 100,
          objectives: [
            'Define the Darboux frame and geodesic curvature',
            'Show that geodesic curvature is intrinsic',
            'Compute geodesic curvature with Liouville\'s formula',
            'Find the geodesic curvature of parallels on surfaces of revolution',
          ],
          concepts: [
            'Darboux frame',
            'Geodesic curvature',
            'Normal curvature',
            'Liouville\'s formula',
            'Orientation and sign',
          ],
          explanation: `Let $\\Sigma$ be oriented by $\\mathbf{n}$, and let $\\alpha$ be a unit-speed curve on it with tangent $\\mathbf{T}$. The **Darboux frame** is $(\\mathbf{T},\\ \\mathbf{n}\\times\\mathbf{T},\\ \\mathbf{n})$. The middle vector is $\\mathbf{T}$ rotated by $+90^\\circ$ within the tangent plane. The acceleration is perpendicular to $\\mathbf{T}$, so
$$\\alpha''=\\kappa_g\\,(\\mathbf{n}\\times\\mathbf{T})+\\kappa_n\\,\\mathbf{n},\\qquad\\kappa^2=\\kappa_g^2+\\kappa_n^2.$$
The normal part is the normal curvature from Module 3. The tangential part, the **geodesic curvature** $\\kappa_g$, equals $\\frac{D\\mathbf{T}}{ds}\\cdot(\\mathbf{n}\\times\\mathbf{T})$, so it is intrinsic. Geodesics are exactly the curves with $\\kappa_g=0$. For a plane curve in the plane, $\\kappa_g$ is the signed curvature $\\kappa_s$. The sign of $\\kappa_g$ depends on the orientation of the surface and the direction of the curve: it is positive when the curve turns to the left, as seen from the side $\\mathbf{n}$ points to.

In orthogonal coordinates there is a formula that separates turning relative to the coordinates from the turning of the coordinates themselves. Let $\\phi$ be the angle from $X_u$ to $\\mathbf{T}$. Then **Liouville's formula** says
$$\\kappa_g=\\frac{d\\phi}{ds}+\\frac{1}{2\\sqrt{EG}}\\Big(G_u\\frac{dv}{ds}-E_v\\frac{du}{ds}\\Big).$$
The second term is the rotation rate of the coordinate frame along the curve, which Module 6 will name the connection form. The formula is what makes the Gauss-Bonnet proof work.

**Worked example.** Take the parallel at colatitude $a$ on the unit sphere, with the outward normal, traversed eastward, so $\\theta$ increases. Use coordinates $u=\\varphi$, $v=\\theta$, with $E=1$ and $G=\\sin^2\\varphi$. The curve is $\\varphi=a$, $\\theta=s/\\sin a$, so $\\mathbf{T}$ points along $X_\\theta$, and $\\phi=\\pi/2$ is constant. Liouville's formula gives
$$\\kappa_g=0+\\frac{1}{2\\sin a}\\cdot2\\sin a\\cos a\\cdot\\frac{1}{\\sin a}=\\cot a.$$
The total curvature of this circle is $1/\\sin a$, and the normal curvature has size 1, so the identity $\\kappa^2=\\kappa_g^2+\\kappa_n^2$ is $1/\\sin^2a=\\cot^2a+1$, which checks. At the equator, $a=\\pi/2$, $\\kappa_g=0$: the equator is a geodesic. North of it, $\\kappa_g>0$: walking east, you must keep turning left, towards the pole. Along the boundary of the polar cap, then, $\\int\\kappa_g\\,ds=2\\pi\\sin a\\cot a=2\\pi\\cos a$, and the area of the cap, which is its total curvature, is $2\\pi(1-\\cos a)$. They add to exactly $2\\pi$. That is the Gauss-Bonnet theorem, as the next lesson proves.`,
          resources: [
            wikipedia('Geodesic curvature', 'Geodesic_curvature')('Definition and the relation to normal curvature.', true),
            craneNotes('The chapter on curvature of curves on surfaces gives the discrete analogue, turning angles on a mesh.'),
          ],
          exercises: [
            {
              slug: 'darboux-equations',
              title: 'The Darboux frame equations',
              prompt: `Let $\\mathbf{U}=\\mathbf{n}\\times\\mathbf{T}$. Show that $\\mathbf{T}'=\\kappa_g\\mathbf{U}+\\kappa_n\\mathbf{n}$, $\\mathbf{U}'=-\\kappa_g\\mathbf{T}+\\tau_g\\mathbf{n}$ and $\\mathbf{n}'=-\\kappa_n\\mathbf{T}-\\tau_g\\mathbf{U}$ for some function $\\tau_g$, called the geodesic torsion. Prove that $\\kappa_g$ depends only on the first fundamental form.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'liouville-formula',
              title: 'Liouville\'s formula',
              prompt: `Prove Liouville's formula. Use the orthonormal frame $e_1=X_u/\\sqrt E$, $e_2=X_v/\\sqrt G$ and write $\\mathbf{T}=\\cos\\phi\\,e_1+\\sin\\phi\\,e_2$. Show that $\\frac{De_1}{ds}\\cdot e_2=\\frac{1}{2\\sqrt{EG}}(G_uv'-E_vu')$ and conclude.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Compute $\\frac{De_1}{ds}\\cdot e_2$ from the Christoffel symbols with $F=0$.',
            },
            {
              slug: 'parallels-of-revolution',
              title: 'Parallels on surfaces of revolution',
              prompt: `For the metric $ds^2+r(s)^2d\\theta^2$, show that the parallel $s=s_0$, traversed with $\\theta$ increasing, has $\\kappa_g=r'(s_0)/r(s_0)$ when the frame $\\partial_s,\\ r^{-1}\\partial_\\theta$ is positively oriented. Apply this to the torus, using the profile arc length $s=rv$, and find which parallels are geodesics. Compare with the previous module.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'On the torus, $\\kappa_g=-\\sin v/(R+r\\cos v)$, which vanishes on the outer and inner equators only.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the geodesic curvature of a great circle?',
              answerOutline: 'Zero, since it is a geodesic.',
            },
            {
              question: 'How are $\\kappa$, $\\kappa_g$ and $\\kappa_n$ related?',
              answerOutline: '$\\kappa^2=\\kappa_g^2+\\kappa_n^2$.',
            },
            {
              question: 'Is $\\kappa_n$ intrinsic?',
              answerOutline: 'No. It depends on the second fundamental form.',
            },
          ],
        },
        {
          slug: 'local-gauss-bonnet',
          title: 'The local Gauss-Bonnet theorem',
          summary:
            'For a disc-shaped region, the curvature inside, the turning of the boundary and the corner angles always total $2\\pi$.',
          estimatedMinutes: 120,
          objectives: [
            'State the local Gauss-Bonnet theorem with its hypotheses',
            'Prove it from Liouville\'s formula, Green\'s theorem and the Umlaufsatz',
            'Compute angle sums of geodesic triangles',
            'Use the theorem to rule out certain configurations of geodesics',
          ],
          concepts: [
            'Simple region',
            'Positively oriented boundary',
            'Exterior angles',
            'Local Gauss-Bonnet theorem',
            'Angle excess of geodesic polygons',
          ],
          explanation: `**Theorem (local Gauss-Bonnet).** Let $X$ be an orthogonal patch, and let $R$ be a region in its image bounded by a simple closed piecewise regular curve, so that $R$ is homeomorphic to a closed disc. Orient the boundary positively, with $R$ on the left, and let $\\theta_1,\\dots,\\theta_k\\in(-\\pi,\\pi)$ be the exterior angles at its corners. Then
$$\\iint_RK\\,dA+\\int_{\\partial R}\\kappa_g\\,ds+\\sum_i\\theta_i=2\\pi.$$

**Proof.** By Liouville's formula, along each smooth arc
$$\\kappa_g\\,ds=d\\phi+\\frac{1}{2\\sqrt{EG}}(G_u\\,dv-E_v\\,du).$$
By the Umlaufsatz for curves with corners, in the parameter plane and with the appropriate angle, the total change of $\\phi$ along the smooth arcs plus the exterior angles is $2\\pi$. Green's theorem turns the remaining line integral into an area integral over the region $D$ in the parameter plane:
$$\\oint\\frac{G_u\\,dv-E_v\\,du}{2\\sqrt{EG}}=\\iint_D\\left[\\Big(\\frac{G_u}{2\\sqrt{EG}}\\Big)_u+\\Big(\\frac{E_v}{2\\sqrt{EG}}\\Big)_v\\right]du\\,dv=-\\iint_RK\\,dA,$$
where the last step is the orthogonal formula for $K$ from the Theorema Egregium, together with $dA=\\sqrt{EG}\\,du\\,dv$. Rearranging gives the theorem.

For a **geodesic polygon**, with $\\kappa_g=0$ on every side, put interior angles $\\alpha_i=\\pi-\\theta_i$. Then
$$\\iint_RK\\,dA=\\sum_{i=1}^k\\alpha_i-(k-2)\\pi.$$
For a triangle, $\\alpha_1+\\alpha_2+\\alpha_3=\\pi+\\iint K\\,dA$. On a sphere the angles add to more than $\\pi$, in the hyperbolic plane to less, and in the plane to exactly $\\pi$. Euclid's parallel postulate is a statement about curvature.

**Worked example.** On the unit sphere, take the triangle with vertices at the north pole, $(1,0,0)$ and $(0,1,0)$. Its sides are quarter great circles, so $\\kappa_g=0$. Each angle is $\\pi/2$: at the pole the two meridians are $90^\\circ$ apart, and at the equator each meridian meets the equator at a right angle. So
$$\\iint K\\,dA=\\frac{3\\pi}{2}-\\pi=\\frac{\\pi}{2}.$$
With $K=1$, this is the area, and indeed the triangle is one eighth of a sphere of area $4\\pi$. Without any integration, the theorem computed an area from three angles.

**A consequence.** On a surface with $K\\le0$, two geodesics cannot bound a disc-shaped region. Such a digon would have $\\iint K+\\theta_1+\\theta_2=2\\pi$ with each $\\theta_i<\\pi$, forcing $\\iint K>0$.`,
          resources: [
            wikipedia('Gauss-Bonnet theorem', 'Gauss%E2%80%93Bonnet_theorem')('Local and global statements, with history and generalisations.', true),
            mathWorld('Gauss-Bonnet formula', 'Gauss-BonnetFormula')('A compact statement for reference.'),
            mit18950('The notes on the global geometry of hypersurfaces include the Gauss-Bonnet theorem.'),
          ],
          exercises: [
            {
              slug: 'complete-the-proof',
              title: 'Completing the proof',
              prompt: `Write the proof of the local theorem in full. State exactly which version of the Umlaufsatz you need, including the condition on exterior angles, and where orthogonality of the patch is used. Check the result on the polar cap of the sphere, with no corners.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'three-cities',
              title: 'A triangle on the Earth',
              prompt: `Model the Earth as a sphere of radius 6371 km. Compute the interior angles of the geodesic triangle with vertices at Chicago ($41.88^\\circ$N, $87.63^\\circ$W), Paris ($48.86^\\circ$N, $2.35^\\circ$E) and Tokyo ($35.68^\\circ$N, $139.69^\\circ$E). Find its area from the angle excess, and check against the solid angle formula $\\tan(\\Omega/2)=\\frac{|a\\cdot(b\\times c)|}{1+a\\cdot b+b\\cdot c+c\\cdot a}$ for unit vectors $a,b,c$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The angles are about $86.2^\\circ$, $92.9^\\circ$ and $59.7^\\circ$. The excess is about $1.0272$ radians, giving about $4.17\\times10^7$ km$^2$.',
            },
            {
              slug: 'ideal-triangle',
              title: 'Hyperbolic triangles',
              prompt: `In the half-plane with $(du^2+dv^2)/v^2$, consider the region above the semicircle $u^2+v^2=1$ and between the lines $u=\\pm1$. It is a triangle with one vertex at infinity and angles 0 at $(\\pm1,0)$. Compute its area directly, and show it equals $\\pi$, as the Gauss-Bonnet formula would predict for a triangle with all angles 0. Explain why every hyperbolic triangle has area less than $\\pi$.`,
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'no-closed-geodesic',
              title: 'No closed geodesic bounds a disc',
              prompt: `Prove that on a surface with $K\\le0$, no simple closed geodesic bounds a region homeomorphic to a disc. Deduce that on the catenoid, the neck circle is not the boundary of a disc on the surface, and confirm this geometrically.`,
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the angles of a geodesic triangle in a region with $K=0$?',
              answerOutline: 'They add up to $\\pi$.',
            },
            {
              question: 'What hypothesis makes the region a disc, and why is it needed?',
              answerOutline: 'Its boundary is a simple closed curve in one patch. The Umlaufsatz needs a single simple loop, and the area integral needs a single region.',
            },
            {
              question: 'What is the area of a geodesic triangle on the unit sphere with angles $\\pi/2,\\pi/2,\\pi/3$?',
              answerOutline: '$\\pi/3$.',
            },
          ],
        },
        {
          slug: 'global-gauss-bonnet',
          title: 'The global Gauss-Bonnet theorem',
          summary:
            'Integrate curvature over a whole compact surface and you get $2\\pi$ times its Euler characteristic, a number that only depends on the shape of the surface up to deformation.',
          estimatedMinutes: 120,
          objectives: [
            'Define triangulations and the Euler characteristic',
            'State and prove the global Gauss-Bonnet theorem',
            'Apply it to spheres, tori and surfaces of higher genus',
            'Use the version for regions with boundary',
          ],
          concepts: [
            'Triangulation',
            'Euler characteristic',
            'Genus',
            'Global Gauss-Bonnet theorem',
            'Topological invariance',
          ],
          explanation: `A **triangulation** of a compact surface divides it into finitely many curvilinear triangles. Any two triangles meet in a common edge, a common vertex, or not at all. Every compact regular surface has one, and you may take each triangle inside a single orthogonal patch. If the triangulation has $V$ vertices, $E$ edges and $F$ faces, the **Euler characteristic** is $\\chi=V-E+F$. It does not depend on the triangulation, and it is unchanged by any homeomorphism. The sphere has $\\chi=2$, the torus $\\chi=0$, and the compact orientable surface of genus $g$, with $g$ holes, has $\\chi=2-2g$.

**Theorem (global Gauss-Bonnet).** For a compact orientable regular surface $\\Sigma$,
$$\\iint_\\Sigma K\\,dA=2\\pi\\chi(\\Sigma).$$

**Proof.** Triangulate with each triangle in an orthogonal patch, and orient each triangle's boundary positively. Apply the local theorem to each triangle and add the $F$ equations. Each edge is shared by two triangles, traversed in opposite directions, and $\\kappa_g$ changes sign with direction, so the boundary terms cancel. The exterior angles give $\\sum(\\pi-\\text{interior angle})$ over all $3F$ corners. The interior angles at each vertex add to $2\\pi$, so their total is $2\\pi V$. So
$$\\iint K\\,dA+3\\pi F-2\\pi V=2\\pi F.$$
Each face has three edges and each edge two faces, so $3F=2E$. Substituting $\\pi F=2\\pi E-2\\pi F$ gives $\\iint K\\,dA=2\\pi(V-E+F)$.

The left side is geometric and the right side topological. Deform a sphere however you like, and the total curvature stays $4\\pi$. For a region $R$ with piecewise smooth boundary, the same argument gives
$$\\iint_RK\\,dA+\\int_{\\partial R}\\kappa_g\\,ds+\\sum\\theta_i=2\\pi\\chi(R),$$
where a disc has $\\chi=1$ and an annulus $\\chi=0$.

**Worked example.** For the torus, Module 3 computed $\\iint K\\,dA=0$, and $\\chi=0$. Check with a triangulation. Take an $m\\times n$ grid of the square of parameters, with $m,n\\ge3$, glue opposite sides, and cut each small square along a diagonal. Then $V=mn$. Each square contributes one horizontal edge, one vertical edge and one diagonal, so $E=3mn$. And there are $F=2mn$ triangles. So $\\chi=mn-3mn+2mn=0$. Now a less obvious surface: any ellipsoid has $\\iint K\\,dA=4\\pi$, whatever its axes, because it is a deformed sphere. A direct integration with the formula from Module 3 is unpleasant, but numerical quadrature confirms it to many digits.`,
          resources: [
            wikipedia('Euler characteristic', 'Euler_characteristic')('Definitions, examples, and invariance under homeomorphism.', true),
            craneLectures('The lecture on discrete curvature shows a discrete version of this proof.'),
          ],
          exercises: [
            {
              slug: 'euler-characteristics',
              title: 'Counting faces',
              prompt: `Compute $V-E+F$ for the tetrahedron, cube, octahedron, dodecahedron and icosahedron. Then build a triangulation of the genus-2 surface by any method you can justify, such as gluing two tori after removing a disc from each, and show $\\chi=-2$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Removing a disc lowers $\\chi$ by 1, and gluing along a circle adds the two values.',
            },
            {
              slug: 'ellipsoid-total-curvature',
              title: 'Total curvature of an ellipsoid',
              prompt: `Integrate $K\\,dA$ numerically over the ellipsoid with semi-axes 1, 2, 3, using the patch $(\\sin\\varphi\\cos\\theta,2\\sin\\varphi\\sin\\theta,3\\cos\\varphi)$, and confirm $4\\pi$ to at least six digits. Then explain without integration why the Gauss map of any ellipsoid covers the sphere exactly once, which gives the same answer.`,
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'positive-curvature-sphere',
              title: 'Positive curvature forces a sphere',
              prompt: `Prove that a compact orientable surface in $\\mathbb{R}^3$ with $K>0$ everywhere has $\\chi=2$, so it is homeomorphic to a sphere, using the classification $\\chi=2-2g$. Can such a surface have $K\\ge0$ everywhere and genus 1? Show that a compact surface of genus $g\\ge2$ must have points where $K<0$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For genus 1, $\\iint K=0$ with $K\\ge0$ would force $K\\equiv0$, contradicting the existence of an elliptic point from Module 3.',
            },
            {
              slug: 'band-on-sphere',
              title: 'A band on the sphere',
              prompt: `For the band between colatitudes $a$ and $2a$ on the unit sphere, with $0<a<\\pi/4$, verify the version with boundary: compute the area, and the geodesic curvature of both boundary circles with the orientation that keeps the band on the left, and show the total is $0=2\\pi\\chi$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The upper circle is traversed westward, contributing $-2\\pi\\cos a$, and the lower eastward, contributing $2\\pi\\cos2a$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $\\iint K\\,dA$ for a surface of genus 3?',
              answerOutline: '$2\\pi(2-6)=-8\\pi$.',
            },
            {
              question: 'Why do the geodesic curvature terms cancel in the proof?',
              answerOutline: 'Each edge is traversed twice in opposite directions, and $\\kappa_g$ changes sign.',
            },
            {
              question: 'Can you change a torus\'s total curvature by squashing it?',
              answerOutline: 'No. It stays 0, though the curvature moves around.',
            },
          ],
        },
        {
          slug: 'gauss-bonnet-applications',
          title: 'Applications: vector fields, geodesics and meshes',
          summary:
            'Gauss-Bonnet constrains vector fields, closed geodesics and even polyhedra. Its discrete form is exact on a triangle mesh.',
          estimatedMinutes: 110,
          objectives: [
            'State the Poincaré-Hopf theorem and the hairy ball theorem',
            'Use Gauss-Bonnet to prove facts about closed geodesics',
            'State and prove the discrete Gauss-Bonnet theorem for polyhedra',
            'Compute angle defects on a mesh',
          ],
          concepts: [
            'Index of a zero of a vector field',
            'Poincaré-Hopf theorem',
            'Hairy ball theorem',
            'Angle defect',
            'Discrete Gauss-Bonnet theorem',
          ],
          explanation: `**Vector fields.** Let $V$ be a tangent vector field on a compact orientable surface with isolated zeros. At a zero $p$, the **index** is the number of turns $V$ makes as you go once around a small circle about $p$. A source or a sink has index 1, a saddle $-1$, and a dipole, with flow out of one side and back in at the other, index 2.

**Poincaré-Hopf theorem.** The sum of the indices equals $\\chi(\\Sigma)$. One proof compares the rotation of $V$ with parallel transport around each zero, where Gauss-Bonnet supplies the curvature terms. Consequence: since the sphere has $\\chi=2\\ne0$, every tangent vector field on it has a zero. This is the **hairy ball theorem**: a hairy ball cannot be combed flat. The torus, with $\\chi=0$, does have nowhere-zero fields.

**Closed geodesics.** On a compact orientable surface with $K>0$, two simple closed geodesics always intersect. If they were disjoint, they would bound an annulus, with $\\chi=0$, and the boundary version of Gauss-Bonnet would give $\\iint K\\,dA=0$, which is impossible for positive $K$. On an ellipsoid, the three principal sections are closed geodesics, and they do intersect.

**Discrete Gauss-Bonnet.** Let $P$ be a closed polyhedral surface made of flat triangles. At a vertex $v$, the **angle defect** is
$$\\delta(v)=2\\pi-\\sum(\\text{angles of triangles at }v).$$
On a flat piece the defect is zero, so all the curvature lives at vertices. **Descartes' theorem** says
$$\\sum_v\\delta(v)=2\\pi\\chi(P).$$
The proof is the counting from the last lesson: the angles of all $F$ triangles add to $\\pi F$, so $\\sum\\delta=2\\pi V-\\pi F$, and $3F=2E$ turns this into $2\\pi(V-E+F)$. This theorem is exact, not an approximation, which is why geometry processing software uses angle defects as discrete Gaussian curvature.

**Worked example.** On a cube, each vertex has three square corners of $\\pi/2$, so $\\delta=2\\pi-3\\pi/2=\\pi/2$. Eight vertices give $4\\pi=2\\pi\\cdot2$. On a regular icosahedron, five equilateral triangles meet at each vertex, so $\\delta=2\\pi-5\\pi/3=\\pi/3$, and twelve vertices give $4\\pi$ again. Now cut off one corner of the cube with a plane making equal angles with the three faces, so that the cut is an equilateral triangle. The old corner, with defect $\\pi/2$, disappears. Three new vertices appear, each with two angles of $3\\pi/4$ from the trimmed squares and one of $\\pi/3$ from the triangle, so each has defect $2\\pi-\\tfrac{3\\pi}{2}-\\tfrac{\\pi}{3}=\\tfrac{\\pi}{6}$. Together they carry $\\pi/2$, exactly the curvature that was removed. Cutting moves curvature around but cannot change the total. Checking this kind of bookkeeping by computer is the point of the project below.`,
          resources: [
            wikipedia('Poincaré-Hopf theorem', 'Poincar%C3%A9%E2%80%93Hopf_theorem')('Statement, examples of indices and the link with Euler characteristic.', true),
            craneNotes('The chapter on discrete curvature develops angle defects and the discrete Gauss-Bonnet theorem.'),
            wikipedia('Hairy ball theorem', 'Hairy_ball_theorem')('Statement and physical interpretations.'),
          ],
          exercises: [
            {
              slug: 'descartes-theorem',
              title: 'Descartes\' theorem',
              prompt: `Prove $\\sum_v\\delta(v)=2\\pi\\chi$ for a closed triangulated polyhedral surface. Then extend it to polyhedra with polygonal faces, by triangulating each face. Verify it for the five Platonic solids.`,
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'indices',
              title: 'Indices of vector fields',
              prompt: `Compute the index at the origin of (a) $(x,y)$, (b) $(-y,x)$, (c) $(x,-y)$, (d) $(x^2-y^2,2xy)$, (e) $(x^2-y^2,-2xy)$. On the unit sphere, describe a field with exactly one zero, and check its index is 2.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1, (b) 1, (c) $-1$, (d) 2, (e) $-2$.',
            },
            {
              slug: 'geodesics-must-meet',
              title: 'Closed geodesics on a positively curved surface',
              prompt: `Prove that two simple closed geodesics on a compact orientable surface with $K>0$ intersect. You may assume the facts that such a surface is homeomorphic to a sphere and that two disjoint simple closed curves on a sphere bound an annulus. Is the conclusion true for the torus?`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the torus the answer is no: two different meridian circles are disjoint closed geodesics, and so are the outer and inner equators. The torus has $K<0$ on its inner half, and $\\chi=0$.',
            },
            {
              slug: 'mesh-defects',
              title: 'Angle defects on a torus mesh',
              prompt: `Generate a triangle mesh of the torus with $R=3$, $r=1$ from a grid of $m\\times n$ parameter points. Compute the angle defect at every vertex, and check that the sum is 0 to rounding error. Then compare $\\delta(v)/A(v)$, with $A(v)$ one third of the area of the triangles at $v$, with the smooth $K$ at the same point, as $m,n$ grow.`,
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must every tangent field on a sphere vanish somewhere?',
              answerOutline: 'Indices sum to $\\chi=2$, so there must be at least one zero.',
            },
            {
              question: 'What is the angle defect at a vertex where six equilateral triangles meet?',
              answerOutline: 'Zero. The vertex is flat.',
            },
            {
              question: 'Is the discrete Gauss-Bonnet theorem an approximation?',
              answerOutline: 'No. It is exact for any closed polyhedral surface.',
            },
          ],
        },
      ],
      project: {
        slug: 'discrete-gauss-bonnet',
        title: 'Discrete Gauss-Bonnet on meshes',
        description: `Write a small mesh library that reads or generates triangle meshes, computes angle defects and vertex areas, and checks the discrete Gauss-Bonnet theorem.

Generate meshes for a sphere, an ellipsoid, a torus and a genus-2 surface. For the last, mesh the level set $\\big(x(x-1)^2(x-2)+y^2\\big)^2+z^2=0.01$ with the marching cubes function in scikit-image, on a grid covering $-0.6\\le x\\le2.6$, $|y|\\le1.2$, $|z|\\le0.6$, and confirm from $\\chi=-2$ that it has genus 2. For every mesh, compute $V-E+F$ and $\\sum\\delta(v)$, and confirm that $\\sum\\delta=2\\pi\\chi$ to rounding error.

Then study convergence. For the sphere, ellipsoid and torus, compare the discrete curvature $\\delta(v)/A(v)$ with the exact Gaussian curvature from Module 3 as the mesh is refined. Report how the maximum and the average error shrink, and where the method behaves badly, such as at long thin triangles.`,
        deliverables: [
          'A mesh module that computes $V,E,F$, angle defects and barycentric vertex areas',
          'A table showing $V-E+F$ and $\\sum\\delta/(2\\pi)$ for all four meshes',
          'Convergence plots of the discrete curvature error for the sphere, ellipsoid and torus',
          'A curvature-coloured rendering of each mesh',
          'A note explaining why the global sum is exact while the pointwise values are only approximate',
        ],
        estimatedHours: 3,
        stretchGoals: [
          'Add discrete mean curvature through the cotangent Laplacian and compare with the exact $H$',
          'Show experimentally that badly shaped triangles spoil pointwise convergence but not the total',
        ],
      },
    },
    {
      slug: 'differential-forms',
      title: 'Vector Fields, Differential Forms and Moving Frames',
      description:
        'The modern language: vector fields and their brackets, differential forms and the exterior derivative, pullbacks and Stokes\' theorem, and Cartan\'s method of moving frames, which recasts the whole course.',
      lessons: [
        {
          slug: 'vector-fields-and-flows',
          title: 'Vector fields, flows and brackets',
          summary:
            'A vector field generates a flow and acts on functions as a derivative. The bracket of two fields measures whether their flows commute.',
          estimatedMinutes: 100,
          objectives: [
            'Treat vector fields on open sets of $\\mathbb{R}^n$ as derivations of functions',
            'Find integral curves and flows of simple fields',
            'Compute Lie brackets and prove their basic properties',
            'Interpret a non-zero bracket geometrically',
          ],
          concepts: [
            'Vector field',
            'Integral curve and flow',
            'Directional derivative as a derivation',
            'Lie bracket',
            'Commuting flows',
            'Frobenius obstruction',
          ],
          explanation: `A **vector field** on an open set $U\\subseteq\\mathbb{R}^n$ is a smooth map $V:U\\to\\mathbb{R}^n$. It acts on smooth functions by the directional derivative:
$$V(f)=\\sum_iV^i\\,\\partial_if.$$
This action obeys the product rule $V(fg)=fV(g)+gV(f)$. A field is determined by this action, so we write $V=\\sum_iV^i\\partial_i$, and the coordinate fields $\\partial_i$ form a basis at each point. The same idea defines tangent vector fields on a surface without referring to the surrounding space.

An **integral curve** of $V$ is a curve with $\\gamma'(t)=V(\\gamma(t))$. The ODE theorem gives one through each point. The **flow** $\\phi_t$ moves each point along its integral curve for time $t$, and $\\phi_{s+t}=\\phi_s\\circ\\phi_t$.

Two fields act on functions in two orders, and the difference is again a field, the **Lie bracket**:
$$[V,W](f)=V(W(f))-W(V(f)),\\qquad[V,W]^j=\\sum_i\\big(V^i\\partial_iW^j-W^i\\partial_iV^j\\big).$$
The second derivatives cancel because mixed partials commute. The bracket is antisymmetric and satisfies the **Jacobi identity**
$$[U,[V,W]]+[V,[W,U]]+[W,[U,V]]=0.$$
Geometrically, $[V,W]=0$ exactly when the flows commute, so moving along $V$ then $W$ lands where $W$ then $V$ does. A non-zero bracket measures the gap left by a small loop of the flows.

**Worked example.** Let $X=-y\\partial_x+x\\partial_y$, whose flow rotates the plane by angle $t$, and $Y=x\\partial_x+y\\partial_y$, whose flow scales by $e^t$. Then
$$[X,Y]^x=X(x)-Y(-y)=-y+y=0,\\qquad[X,Y]^y=X(y)-Y(x)=x-x=0.$$
Rotating then scaling equals scaling then rotating, as it should. By contrast, $[\\partial_x,\\,x\\partial_y]=\\partial_y\\neq0$. Move right by $h$, up by $xh$, left by $h$, and down by the new $xh$: you end up displaced by about $h^2$ in the $y$-direction.

Coordinate fields always commute, since $[\\partial_i,\\partial_j]=0$. So two fields with a non-zero bracket cannot be the coordinate fields of any coordinate system. In $\\mathbb{R}^3$, $\\partial_x$ and $\\partial_y+x\\partial_z$ have bracket $\\partial_z$, which lies outside their span, and by the Frobenius theorem no surface is tangent to both at every point.`,
          resources: [
            wikipedia('Lie bracket of vector fields', 'Lie_bracket_of_vector_fields')('Definitions, properties and the flow interpretation.', true),
            sjamaar('The early chapters on vector fields and flows on open subsets of Euclidean space.'),
          ],
          exercises: [
            {
              slug: 'bracket-properties',
              title: 'Properties of the bracket',
              prompt: `Prove that $[V,W]$ is a vector field, meaning a derivation, by checking the product rule. Prove antisymmetry, the Jacobi identity, and $[fV,W]=f[V,W]-W(f)V$. Verify the Jacobi identity with SymPy for three fields of your choice on $\\mathbb{R}^3$.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'flows-by-hand',
              title: 'Flows by hand',
              prompt: `Find the flows of $x\\partial_x-y\\partial_y$, of $-y\\partial_x+x\\partial_y$, and of $y\\partial_x$. For each pair, compute the bracket and decide whether the flows commute. Check one non-commuting pair numerically by composing flows over a small time $h$ and comparing the gap with $h^2[V,W]$.`,
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'no-surface-tangent',
              title: 'Fields that span no surface',
              prompt: `Let $V=\\partial_x$ and $W=\\partial_y+x\\partial_z$ on $\\mathbb{R}^3$. Show $[V,W]=\\partial_z$. Prove directly that there is no surface through the origin tangent to both $V$ and $W$ at every point, by showing that the bracket of two fields tangent to a surface is tangent to it.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'If the surface is locally $z=h(x,y)$, the tangency conditions force $h_x=0$ and $h_y=x$, which are incompatible.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does $[V,W]=0$ mean for the flows?',
              answerOutline: 'They commute.',
            },
            {
              question: 'Why do coordinate fields have zero bracket?',
              answerOutline: 'Mixed partial derivatives are equal.',
            },
            {
              question: 'Is the bracket a vector field, even though it involves second derivatives?',
              answerOutline: 'Yes. The second-derivative terms cancel, leaving a first-order operator.',
            },
          ],
        },
        {
          slug: 'differential-forms',
          title: 'Differential forms and the exterior derivative',
          summary:
            'Forms are what you integrate. The wedge product and the exterior derivative unify gradient, curl and divergence, with $d^2=0$ explaining why curl of gradient and divergence of curl vanish.',
          estimatedMinutes: 110,
          objectives: [
            'Compute with 1-forms, 2-forms and 3-forms on $\\mathbb{R}^3$',
            'Use the wedge product and its antisymmetry',
            'Compute exterior derivatives and prove $d^2=0$',
            'Relate $d$ to gradient, curl and divergence',
            'Distinguish closed and exact forms',
          ],
          concepts: [
            '1-forms and the differential of a function',
            'Wedge product',
            'k-forms',
            'Exterior derivative',
            'Closed and exact forms',
          ],
          explanation: `A **1-form** on an open set of $\\mathbb{R}^n$ assigns to each point a linear function on vectors. For a function $f$, its differential $df$ is the 1-form with $df(V)=V(f)$. The differentials $dx^1,\\dots,dx^n$ form a basis, so every 1-form is $\\sum a_i\\,dx^i$. You integrate 1-forms along curves.

The **wedge product** of 1-forms is antisymmetric, $\\alpha\\wedge\\beta=-\\beta\\wedge\\alpha$, so $\\alpha\\wedge\\alpha=0$. On vectors it acts by
$$(\\alpha\\wedge\\beta)(V,W)=\\alpha(V)\\beta(W)-\\alpha(W)\\beta(V).$$
**2-forms** are combinations of $dx^i\\wedge dx^j$, and they are integrated over surfaces. On $\\mathbb{R}^3$, 3-forms are multiples of $dx\\wedge dy\\wedge dz$. In the plane, $(a\\,dx+b\\,dy)\\wedge(c\\,dx+e\\,dy)=(ae-bc)\\,dx\\wedge dy$: the wedge computes a determinant.

The **exterior derivative** $d$ takes $k$-forms to $(k+1)$-forms. It is $df=\\sum\\partial_if\\,dx^i$ on functions, and $d(f\\,dx^{i_1}\\wedge\\cdots)=df\\wedge dx^{i_1}\\wedge\\cdots$ on general forms. It is linear and satisfies $d(d\\omega)=0$, again because mixed partials commute.

On $\\mathbb{R}^3$, identify $a\\,dx+b\\,dy+c\\,dz$ with the field $(a,b,c)$, and $P\\,dy\\wedge dz+Q\\,dz\\wedge dx+R\\,dx\\wedge dy$ with $(P,Q,R)$. Then $d$ on functions is the gradient, $d$ on 1-forms is the curl, and $d$ on 2-forms is the divergence. And $d^2=0$ says both $\\mathrm{curl}\\,\\mathrm{grad}=0$ and $\\mathrm{div}\\,\\mathrm{curl}=0$.

A form is **closed** if $d\\omega=0$, and **exact** if $\\omega=d\\eta$. Exact forms are closed. On a star-shaped domain the converse holds, which is the Poincaré lemma, but not in general. On the punctured plane,
$$\\omega=\\frac{-y\\,dx+x\\,dy}{x^2+y^2}$$
is closed, but its integral around the unit circle is $2\\pi\\ne0$, so it is not $df$ for any function $f$. The obstruction is the hole, so forms can detect topology.

**Worked example.** Let $\\omega=xy\\,dx+z\\,dy+x^2\\,dz$. Then
$$d\\omega=d(xy)\\wedge dx+dz\\wedge dy+d(x^2)\\wedge dz=x\\,dy\\wedge dx+dz\\wedge dy+2x\\,dx\\wedge dz.$$
Reordering into the standard basis,
$$d\\omega=-dy\\wedge dz-2x\\,dz\\wedge dx-x\\,dx\\wedge dy.$$
This corresponds to the field $(-1,-2x,-x)$, which is exactly $\\mathrm{curl}(xy,z,x^2)$. Then
$$d(d\\omega)=-dx\\wedge dx\\wedge dy-2\\,dx\\wedge dz\\wedge dx=0,$$
since each term repeats $dx$. This is the divergence of the curl, $0-0+0$.`,
          resources: [
            taoForms('An informal, motivated introduction to forms and why they are the natural things to integrate.', true),
            wikipedia('Exterior derivative', 'Exterior_derivative')('Definition and properties, including $d^2=0$.'),
            craneNotes('The chapters on exterior algebra and exterior calculus, with pictures of forms.'),
          ],
          exercises: [
            {
              slug: 'wedge-practice',
              title: 'Wedge products',
              prompt: `Compute (a) $(dx+2dy)\\wedge(3dx-dy)$, (b) $(x\\,dx+y\\,dy)\\wedge(y\\,dx-x\\,dy)$, (c) $(dx+dy+dz)\\wedge(dx\\wedge dy+dy\\wedge dz)$. Then show that for 1-forms $\\alpha,\\beta$ in the plane, $(\\alpha\\wedge\\beta)(V,W)$ is the determinant of a $2\\times2$ matrix you should identify.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $-7\\,dx\\wedge dy$. (b) $-(x^2+y^2)\\,dx\\wedge dy$. (c) $2\\,dx\\wedge dy\\wedge dz$.',
            },
            {
              slug: 'd-squared',
              title: 'Applying d twice, and vector calculus',
              prompt: `Prove $d(d\\omega)=0$ for functions and 1-forms on $\\mathbb{R}^3$. Then verify the correspondence of $d$ with grad, curl and div, and translate $d(f\\omega)=df\\wedge\\omega+f\\,d\\omega$ into two identities of vector calculus.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'You get $\\mathrm{curl}(fF)=\\nabla f\\times F+f\\,\\mathrm{curl}\\,F$ and $\\mathrm{div}(fF)=\\nabla f\\cdot F+f\\,\\mathrm{div}\\,F$.',
            },
            {
              slug: 'closed-not-exact',
              title: 'Closed but not exact',
              prompt: `Show the form $\\omega$ in the lesson is closed on the punctured plane, and compute its integral around the unit circle. Show that on the plane with the negative $x$-axis removed, $\\omega=d\\theta$ for a polar angle function $\\theta$. Explain why this does not contradict the first part.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'poincare-lemma',
              title: 'The Poincaré lemma in the plane',
              prompt: `Let $\\omega=a\\,dx+b\\,dy$ be closed on $\\mathbb{R}^2$. Prove that $f(x,y)=\\int_0^1\\big(x\\,a(tx,ty)+y\\,b(tx,ty)\\big)\\,dt$ satisfies $df=\\omega$, by differentiating under the integral sign and using $a_y=b_x$. Apply this to $\\omega=2xy\\,dx+x^2\\,dy$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the example, $f=x^2y$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $dx\\wedge dx$?',
              answerOutline: 'Zero, by antisymmetry.',
            },
            {
              question: 'Which vector identity is $d^2=0$ on 1-forms in $\\mathbb{R}^3$?',
              answerOutline: '$\\mathrm{div}\\,\\mathrm{curl}=0$.',
            },
            {
              question: 'Is every closed 1-form on the punctured plane exact?',
              answerOutline: 'No. The angle form is closed with a non-zero loop integral.',
            },
          ],
          relatedLessons: ['math-methods/vector-calculus/vector-fields-div-grad-curl'],
        },
        {
          slug: 'pullbacks-and-stokes',
          title: 'Pullbacks, integration and Stokes\' theorem',
          summary:
            'Forms pull back along maps, which is how they are integrated over curves and surfaces. Stokes\' theorem then contains Green, Stokes and Gauss in one line.',
          estimatedMinutes: 110,
          objectives: [
            'Compute pullbacks of forms along smooth maps',
            'Prove that pullback commutes with $d$ and with wedge',
            'Integrate forms over parametrized oriented surfaces',
            'State Stokes\' theorem and recover the classical theorems',
          ],
          concepts: [
            'Pullback',
            'Naturality of $d$',
            'Integral of a form over an oriented surface',
            'Stokes\' theorem',
            'Orientation of the boundary',
          ],
          explanation: `Given a smooth map $F$ from an open set of $\\mathbb{R}^m$ to one of $\\mathbb{R}^n$, the **pullback** $F^*$ moves forms backwards. For a function, $F^*f=f\\circ F$. For a 1-form, $(F^*\\alpha)(V)=\\alpha(dF(V))$. In coordinates you simply substitute: if $x=F^1(u,v)$, and so on, replace each $dx$ by $dF^1=F^1_u\\,du+F^1_v\\,dv$, and expand. Pullback respects wedges, $F^*(\\alpha\\wedge\\beta)=F^*\\alpha\\wedge F^*\\beta$, and commutes with the exterior derivative, $F^*(d\\omega)=d(F^*\\omega)$. The second property is what makes $d$ independent of coordinates.

Integration is defined by pullback. For an oriented patch $X:D\\to\\mathbb{R}^3$ and a 2-form $\\omega$, write $X^*\\omega=h\\,du\\wedge dv$ and set
$$\\int_{X(D)}\\omega=\\iint_Dh\\,du\\,dv.$$
A reparametrization with positive Jacobian does not change this, and one with negative Jacobian flips the sign. So a form integrates over an oriented surface, not over a bare set. This is the step that makes the change of variables formula automatic.

**Stokes' theorem.** For a compact oriented surface $M$ with boundary $\\partial M$, oriented so that $M$ lies on the left when you walk along the boundary with your head along the normal, and for a 1-form $\\omega$,
$$\\int_Md\\omega=\\int_{\\partial M}\\omega.$$
The same statement holds in every dimension, for a $k$-form on a $(k+1)$-dimensional region. In the plane it is Green's theorem, on a surface in space it is the classical Stokes theorem, and for a solid region and a 2-form it is the divergence theorem.

**Worked example.** Check the theorem for $\\omega=x\\,dy$ on the upper unit hemisphere, oriented by the outward normal. The boundary is the equator traversed counterclockwise as seen from above. With $x=\\cos t$, $y=\\sin t$,
$$\\int_{\\partial M}x\\,dy=\\int_0^{2\\pi}\\cos^2t\\,dt=\\pi.$$
On the other side, $d\\omega=dx\\wedge dy$. Pull it back by the patch $X(u,v)=(u,v,\\sqrt{1-u^2-v^2})$ over the unit disc. This patch has upward normal, matching the orientation, and $X^*(dx\\wedge dy)=du\\wedge dv$. So
$$\\int_Md\\omega=\\iint_{u^2+v^2<1}du\\,dv=\\pi.$$
The two agree. The 2-form $dx\\wedge dy$ measures projected area, so any surface with this boundary, a hemisphere or a flat disc, gives $\\pi$.`,
          resources: [
            sjamaar('The chapters on pullbacks, integration of forms and Stokes\' theorem, with careful treatment of orientation.', true),
            wikipedia('Stokes\' theorem', 'Stokes%27_theorem')('The general statement and how it specialises to the classical theorems.'),
            {
              title: 'Differential form',
              url: 'https://en.wikipedia.org/wiki/Differential_form',
              type: 'article',
              cost: 'free',
              provider: 'Wikipedia',
              note: 'A reference for pullbacks and integration on manifolds.',
            },
          ],
          exercises: [
            {
              slug: 'pullback-naturality',
              title: 'Pullback commutes with the exterior derivative',
              prompt: `Prove $F^*(df)=d(F^*f)$ by the chain rule, and $F^*(d\\alpha)=d(F^*\\alpha)$ for a 1-form $\\alpha$ on $\\mathbb{R}^3$ and a map $F$ from $\\mathbb{R}^2$. Use it to show $dx\\wedge dy=r\\,dr\\wedge d\\theta$ in polar coordinates, and compute $dx\\wedge dy\\wedge dz$ in spherical coordinates.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'In spherical coordinates, $dx\\wedge dy\\wedge dz=\\rho^2\\sin\\varphi\\,d\\rho\\wedge d\\varphi\\wedge d\\theta$.',
            },
            {
              slug: 'area-by-green',
              title: 'Areas from boundaries',
              prompt: `Use Stokes' theorem in the plane to show that the area enclosed by a positively oriented simple closed curve is $\\tfrac12\\oint(x\\,dy-y\\,dx)$. Apply it to the ellipse $(a\\cos t,b\\sin t)$ and to one arch of the cycloid from Module 1 closed by the $x$-axis.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Ellipse: $\\pi ab$. Cycloid arch: $3\\pi a^2$.',
            },
            {
              slug: 'flux-through-sphere',
              title: 'Flux through the sphere',
              prompt: `Compute $\\int_{S^2}x\\,dy\\wedge dz+y\\,dz\\wedge dx+z\\,dx\\wedge dy$ over the unit sphere with outward orientation, in two ways: directly by pulling back along the colatitude-longitude patch, and with the divergence theorem. Then compute the integral of $\\frac{x\\,dy\\wedge dz+y\\,dz\\wedge dx+z\\,dx\\wedge dy}{(x^2+y^2+z^2)^{3/2}}$ and explain why its value does not depend on the radius.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Both integrals equal $4\\pi$. The second form is closed away from the origin.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does reversing the orientation of a surface do to $\\int\\omega$?',
              answerOutline: 'It changes the sign.',
            },
            {
              question: 'State Stokes\' theorem for forms.',
              answerOutline: '$\\int_Md\\omega=\\int_{\\partial M}\\omega$, with the boundary given the induced orientation.',
            },
            {
              question: 'What is the pullback of $dx\\wedge dy$ to polar coordinates?',
              answerOutline: '$r\\,dr\\wedge d\\theta$.',
            },
          ],
          relatedLessons: ['math-methods/vector-calculus/integral-theorems'],
        },
        {
          slug: 'moving-frames',
          title: 'Cartan\'s moving frames',
          summary:
            'Choose an orthonormal frame on a surface. Its dual forms and one connection form satisfy two structure equations, which give the curvature and a short proof of the Gauss-Bonnet theorem.',
          estimatedMinutes: 130,
          objectives: [
            'Define an orthonormal coframe and the connection form',
            'State the structure equations with this course\'s sign convention',
            'Compute $K$ by moving frames for standard metrics',
            'Prove the Theorema Egregium and the Gauss-Bonnet theorem with forms',
          ],
          concepts: [
            'Orthonormal frame and coframe',
            'Connection form',
            'First structure equations',
            'Gauss curvature equation',
            'Proof of Gauss-Bonnet with forms',
          ],
          explanation: `Let $e_1,e_2$ be an orthonormal frame of tangent vector fields on part of a surface, positively oriented. Let $\\theta^1,\\theta^2$ be the dual 1-forms, so $\\theta^i(e_j)=\\delta^i_j$. Then the metric is $(\\theta^1)^2+(\\theta^2)^2$, and the area form is $dA=\\theta^1\\wedge\\theta^2$. Define the **connection form** by
$$\\omega_{12}(V)=(\\nabla_Ve_1)\\cdot e_2,$$
where $\\nabla_Ve_1$ is the covariant derivative of $e_1$ in the direction $V$, the tangential part of its ordinary derivative. It is the rate at which the frame turns as you move in direction $V$, and $\\omega_{21}=-\\omega_{12}$. **Cartan's structure equations** are
$$d\\theta^1=\\omega_{12}\\wedge\\theta^2,\\qquad d\\theta^2=\\omega_{21}\\wedge\\theta^1,\\qquad d\\omega_{12}=-K\\,\\theta^1\\wedge\\theta^2.$$
Sign conventions vary between books, so check how a source defines $\\omega_{12}$ before comparing.

A short algebraic lemma shows that $\\omega_{12}$ is the *only* 1-form satisfying the first two equations. So it is determined by the coframe, and hence by the metric. The third equation then defines $K$ from the metric alone. This is a two-line proof of the Theorema Egregium.

For an orthogonal metric $E\\,du^2+G\\,dv^2$, take $\\theta^1=\\sqrt E\\,du$ and $\\theta^2=\\sqrt G\\,dv$. Then
$$\\omega_{12}=-\\frac{(\\sqrt E)_v}{\\sqrt G}\\,du+\\frac{(\\sqrt G)_u}{\\sqrt E}\\,dv.$$

**Worked example.** On the unit sphere, $\\theta^1=d\\varphi$ and $\\theta^2=\\sin\\varphi\\,d\\theta$. The formula gives $\\omega_{12}=\\cos\\varphi\\,d\\theta$. Check the structure equations. First, $d\\theta^1=0$, and $\\omega_{12}\\wedge\\theta^2=\\cos\\varphi\\sin\\varphi\\,d\\theta\\wedge d\\theta=0$. Second,
$$d\\theta^2=\\cos\\varphi\\,d\\varphi\\wedge d\\theta,\\qquad\\omega_{21}\\wedge\\theta^1=-\\cos\\varphi\\,d\\theta\\wedge d\\varphi=\\cos\\varphi\\,d\\varphi\\wedge d\\theta.$$
Finally,
$$d\\omega_{12}=-\\sin\\varphi\\,d\\varphi\\wedge d\\theta=-\\theta^1\\wedge\\theta^2,$$
so $K=1$, with no Christoffel symbols in sight.

**Gauss-Bonnet in three lines.** On a disc-shaped region $R$ where the frame is defined, $K\\,dA=-d\\omega_{12}$, so Stokes' theorem gives $\\iint_RK\\,dA=-\\oint_{\\partial R}\\omega_{12}$. Along the boundary, with $\\phi$ the angle from $e_1$ to the tangent, $\\kappa_g\\,ds=d\\phi+\\omega_{12}$. This is Liouville's formula in the language of forms. Adding, and using that $\\phi$ turns by $2\\pi$ minus the exterior angles,
$$\\iint_RK\\,dA+\\oint\\kappa_g\\,ds+\\sum\\theta_i=2\\pi.$$
For a surface in space, the frame $e_1,e_2,e_3=\\mathbf{n}$ adds forms $\\omega_{13},\\omega_{23}$ built from the second fundamental form. The equation $d\\omega_{12}=\\omega_{13}\\wedge\\omega_{32}$ is then the Gauss equation, because $\\omega_{13}\\wedge\\omega_{23}=K\\,\\theta^1\\wedge\\theta^2$.`,
          resources: [
            wikipedia('Moving frame', 'Moving_frame')('History and the general method. The surface case is what this lesson covers.', true),
            {
              title: 'Carroll, Lecture Notes on General Relativity',
              url: 'https://arxiv.org/abs/gr-qc/9712019',
              type: 'textbook',
              cost: 'free',
              provider: 'arXiv',
              note: 'The chapter on curvature includes the tetrad, or orthonormal frame, formalism in general dimension, with the same structure equations.',
            },
            sjamaar('The later chapters, for forms on manifolds in general.'),
          ],
          exercises: [
            {
              slug: 'uniqueness-of-connection',
              title: 'The connection form is unique',
              prompt: `Prove that given an orthonormal coframe $\\theta^1,\\theta^2$, there is exactly one 1-form $\\omega$ with $d\\theta^1=\\omega\\wedge\\theta^2$ and $d\\theta^2=-\\omega\\wedge\\theta^1$. Write $\\omega=a\\theta^1+b\\theta^2$, and show $a$ and $b$ are determined. Explain why this proves the Theorema Egregium.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'orthogonal-connection-form',
              title: 'The connection form of an orthogonal metric',
              prompt: `Derive the formula for $\\omega_{12}$ in the lesson from the first structure equations. Use the third equation to recover the orthogonal formula for $K$ from the Theorema Egregium lesson, and check with SymPy on the torus metric.`,
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'hyperbolic-by-frames',
              title: 'The hyperbolic plane by moving frames',
              prompt: `For $(du^2+dv^2)/v^2$, take $\\theta^1=du/v$ and $\\theta^2=dv/v$. Find $\\omega_{12}$ and show $K=-1$. Then do the same for the stereographic metric $4(du^2+dv^2)/(1+u^2+v^2)^2$ and show $K=1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'For the half-plane, $\\omega_{12}=du/v$ and $d\\omega_{12}=\\theta^1\\wedge\\theta^2$.',
            },
            {
              slug: 'gauss-equation-by-frames',
              title: 'The Gauss equation from frames in space',
              prompt: `For a surface in $\\mathbb{R}^3$ with adapted frame $e_1,e_2,e_3=\\mathbf{n}$, define $\\omega_{ij}(V)=(de_i(V))\\cdot e_j$. Show that $\\omega_{13}=h_{11}\\theta^1+h_{12}\\theta^2$ and $\\omega_{23}=h_{12}\\theta^1+h_{22}\\theta^2$, where $h_{ij}=II(e_i,e_j)$. Derive $d\\omega_{12}=\\omega_{13}\\wedge\\omega_{32}$ from $d(de_1)=0$, and conclude that $d\\omega_{12}=-K\\,\\theta^1\\wedge\\theta^2$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Write $de_i=\\sum_j\\omega_{ij}e_j$ and apply $d$ to both sides.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the connection form measure?',
              answerOutline: 'How fast the frame $e_1$ turns towards $e_2$ in a given direction.',
            },
            {
              question: 'State the curvature equation in this course\'s convention.',
              answerOutline: '$d\\omega_{12}=-K\\,\\theta^1\\wedge\\theta^2$.',
            },
            {
              question: 'Why does the Gauss-Bonnet proof by forms need the region to be a disc in one frame?',
              answerOutline: 'The frame, and so $\\omega_{12}$, must be defined on the whole region for Stokes\' theorem to apply.',
            },
          ],
          relatedLessons: ['relativity/tensors-and-curved-spaces/curvature-and-geodesic-deviation'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'atlas-of-a-surface',
    title: 'An atlas of one surface',
    description: `Pick one surface and explain its geometry completely, with every result computed two independent ways. The point is to show that the course fits together: extrinsic and intrinsic computations, local and global theorems, smooth and discrete versions all have to agree.

Use the torus with $R=3$, $r=1$ as the calibration case, where every answer is known. Then choose a second surface without a ready-made answer key: an ellipsoid with three different axes, a Dupin cyclide, a surface of revolution with a profile of your choice, or a surface from your own field.

For each surface, build the following.

1. **Fundamental forms and curvature.** Compute $E,F,G$, $L,M,N$, $K$ and $H$ symbolically. Compute $K$ again from the metric alone, with the orthogonal formula or the general one, and again by moving frames. All three must agree.
2. **Geodesics.** Integrate geodesics numerically and check that speed is conserved. For a surface of revolution, check Clairaut's constant too. Find two different geodesics between one pair of points, and compare their lengths.
3. **Parallel transport and local Gauss-Bonnet.** Transport a vector around a small loop and compare the rotation with $\\iint K\\,dA$ inside it, plus $\\oint\\kappa_g\\,ds$ if the loop is not a geodesic polygon.
4. **Global Gauss-Bonnet.** Integrate $K\\,dA$ over the whole surface, or over a region with boundary, and compare with $2\\pi\\chi$.
5. **Discrete check.** Mesh the surface, compute angle defects, and confirm that their sum is $2\\pi\\chi$ exactly while their pointwise values approximate $K\\,dA$.

For the torus, your answers must include $K=\\cos v/(3+\\cos v)$, $\\iint K\\,dA=0$, and the holonomy around the parallels.`,
    deliverables: [
      'A documented code repository that reproduces every number and figure from one command',
      'A calibration section for the torus, in which every computed quantity matches its known value within a stated tolerance',
      'For the second surface, a table of $K$ at five or more points computed extrinsically, from the metric, and by moving frames',
      'Plots of geodesics, of a parallel-transported vector around a loop, and of the surface coloured by $K$',
      'A numerical check of local and global Gauss-Bonnet, with errors reported',
      'A discrete Gauss-Bonnet check on a mesh of the second surface, with a convergence plot for the pointwise curvature',
      'A written report of 8-12 pages that explains each result in words, as for a reader who knows calculus but not this course',
    ],
    estimatedHours: 6,
    stretchGoals: [
      'Find the umbilic points of a triaxial ellipsoid and plot the lines of curvature around them',
      'Compute the holonomy group of the second surface around several loops and relate it to enclosed curvature',
      'Extend the moving-frame code to a three-dimensional metric, and compute a sectional curvature',
    ],
  },
  masteryChecklist: [
    'I can compute arc length, curvature and torsion of a curve in any parametrization, and state the sign convention I am using',
    'I can prove the fundamental theorem of curves and use the Frenet equations to reconstruct a curve',
    'I can check that a set is a regular surface and compute its tangent planes and normals',
    'I can compute the first and second fundamental forms, the shape operator, and Gaussian and mean curvature',
    'I can prove the Theorema Egregium and use it to show that two surfaces are not isometric',
    'I can compute Christoffel symbols, write the geodesic and parallel transport equations, and solve them on standard surfaces',
    'I can state and prove the local and global Gauss-Bonnet theorems and apply them to geodesic polygons and closed surfaces',
    'I can compute with differential forms, pullbacks and the exterior derivative, and apply Stokes\' theorem',
    'I can compute curvature by moving frames and give the forms proof of Gauss-Bonnet',
    'I can check any of these computations with SymPy and with a discrete mesh',
  ],
});
