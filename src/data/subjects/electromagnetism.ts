import { defineSubject } from '../define';

export default defineSubject({
  id: 'electromagnetism',
  title: 'Electromagnetism',
  category: 'physics',
  tagline:
    'From Coulomb\'s law to Maxwell\'s equations to radiation: the classical field theory that explains light, circuits, matter and the structure of relativity.',
  description: `Electromagnetism is the first field theory you meet and the most successful classical theory in physics. Four equations describe every electric and magnetic phenomenon above the atomic scale: static charges and currents, induction and circuits, the optical properties of matter, and the light radiated by accelerating charges. Their structure, with fields as the carriers of energy and momentum, potentials and gauge freedom, and Lorentz invariance built in from the start, is the template for every modern field theory.

This curriculum is pitched at the level of Griffiths' *Introduction to Electrodynamics* and MIT 8.02/8.07, using free resources throughout: David Tong's Cambridge lecture notes on Electromagnetism as the main text, the Feynman Lectures Vol. II for physical insight, OpenStax University Physics Vol. 2 for practice, and MIT OpenCourseWare for problem sets. You build from electrostatics and boundary-value problems through fields in matter and magnetostatics to induction, Maxwell's equations, electromagnetic waves, radiation and the relativistic formulation.

Computation runs alongside the analysis. You will compute fields of charge distributions numerically, solve Laplace's equation by relaxation, trace field lines, integrate the motion of charges in fields, and write a finite-difference time-domain (FDTD) Maxwell solver, checking every numerical result against an analytic one. The capstone applies a field solver to a real device and compares it with a derivation.`,
  difficulty: 'advanced',
  estimatedHours: 100,
  prerequisites: ['classical-mechanics', 'math-methods'],
  recommendedBackground: [
    'Vector calculus: gradient, divergence, curl, and the divergence and Stokes theorems (math-methods/vector-calculus)',
    'Separation of variables and Legendre polynomials (math-methods/partial-differential-equations-and-special-functions)',
    'An introductory E&M course at the level of OpenStax Vol. 2 is helpful but not required',
    'Python with NumPy, SciPy and Matplotlib',
  ],
  tags: ['electromagnetism', 'Maxwell', 'fields', 'radiation', 'FDTD', 'boundary-value problems'],
  core: true,
  modules: [
    {
      slug: 'electrostatics',
      title: 'Electrostatics',
      description:
        'Charges at rest: Coulomb\'s law and superposition, the electric field, Gauss\'s law, the scalar potential, and the energy stored in a charge configuration.',
      lessons: [
        {
          slug: 'coulombs-law-and-the-electric-field',
          title: 'Coulomb\'s law and the electric field',
          summary:
            'The inverse-square force between charges, superposition, and the electric field of continuous charge distributions computed analytically and numerically.',
          estimatedMinutes: 120,
          objectives: [
            'State Coulomb\'s law in vector form and use superposition to find forces among several charges',
            'Define the electric field and compute it for line, surface and volume charge distributions by integration',
            'Evaluate field integrals numerically and visualise fields with quiver plots and field lines',
            'Check results with symmetry, limiting cases and dimensional analysis',
          ],
          concepts: [
            'Coulomb\'s law $\\mathbf{F} = \\frac{1}{4\\pi\\epsilon_0}\\frac{qQ}{r^2}\\hat{\\boldsymbol{\\mathscr{r}}}$',
            'Separation vector from source to field point',
            'Superposition principle',
            'Electric field $\\mathbf{E} = \\mathbf{F}/q$',
            'Charge densities $\\lambda$, $\\sigma$, $\\rho$',
            'Field integral $\\mathbf{E} = \\frac{1}{4\\pi\\epsilon_0}\\int\\frac{\\rho(\\mathbf{r}\')\\,\\hat{\\boldsymbol{\\mathscr{r}}}}{\\mathscr{r}^2}d\\tau\'$',
            'Field lines and their density',
            'Electric dipole field (first look)',
          ],
          explanation: `Two point charges at rest exert a force $\\mathbf{F} = \\frac{1}{4\\pi\\epsilon_0}\\frac{qQ}{\\mathscr{r}^2}\\hat{\\boldsymbol{\\mathscr{r}}}$, where $\\boldsymbol{\\mathscr{r}} = \\mathbf{r} - \\mathbf{r}'$ points from the source $Q$ at $\\mathbf{r}'$ to the test charge $q$ at $\\mathbf{r}$. Two experimental facts carry the whole of electrostatics: the inverse-square law, and **superposition**, meaning the force from many charges is the vector sum of the individual forces. Superposition is not a logical necessity; it is a property of nature that holds to extraordinary precision at ordinary field strengths.

Divide out the test charge to define the **electric field** $\\mathbf{E}(\\mathbf{r}) = \\mathbf{F}/q$, a vector at every point in space produced by the sources. For a continuous distribution replace the sum by an integral,
$$\\mathbf{E}(\\mathbf{r}) = \\frac{1}{4\\pi\\epsilon_0}\\int\\frac{\\rho(\\mathbf{r}')}{\\mathscr{r}^2}\\hat{\\boldsymbol{\\mathscr{r}}}\\,d\\tau',$$
with $\\lambda\\,dl'$ or $\\sigma\\,da'$ for line and surface charges. At this stage the field is a bookkeeping device. Later in the subject it becomes a physical object with its own energy and momentum, and it propagates at finite speed.

Doing these integrals is a skill. Choose coordinates that fit the symmetry, use symmetry to argue which components cancel *before* you integrate, and write the separation vector carefully. Classic results to derive yourself: a finite line charge, a ring on its axis, a disc on its axis (which tends to $\\sigma/2\\epsilon_0$ near the disc, the infinite-plane result), and a spherical shell. Always check the limits. Far away, every finite distribution must look like a point charge $Q_{\\text{tot}}/4\\pi\\epsilon_0 r^2$. Close to a surface charge, the normal field jumps by $\\sigma/\\epsilon_0$.

Numerically, discretise the source into many small charges and sum. This is $O(NM)$ for $N$ sources and $M$ field points; vectorise with NumPy. Plot with \`quiver\` and \`streamplot\`. Watch out near the sources, where the sum is singular: a field point coinciding with a source element gives nonsense.

Read Tong's electrostatics chapter (sections on Coulomb and Gauss), Feynman II-4, and OpenStax Vol. 2 chapter 5 for practice problems. Walter Lewin's 8.02 lectures 1-2 are a good physical introduction.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 2: Electrostatics',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              note: 'The main text for this subject. Free PDF; clear and at the right level (comparable to Griffiths, which is paid).',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 4: Electrostatics',
              url: 'https://www.feynmanlectures.caltech.edu/II_04.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 5: Electric Charges and Fields',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/5-1-electric-charge',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Worked examples for line, ring and disc charges; use the end-of-chapter problems for practice.',
            },
            {
              title: 'PhET — Charges and Fields',
              url: 'https://phet.colorado.edu/en/simulations/charges-and-fields',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
          ],
          exercises: [
            {
              slug: 'disc-field-derivation',
              title: 'Field of a uniformly charged disc',
              prompt:
                'Derive the field on the axis of a uniformly charged disc of radius $R$ and surface charge $\\sigma$: $E_z = \\frac{\\sigma}{2\\epsilon_0}\\left(1 - \\frac{z}{\\sqrt{z^2 + R^2}}\\right)$. Show it tends to $\\sigma/2\\epsilon_0$ as $z \\to 0^+$ and to $Q/4\\pi\\epsilon_0 z^2$ as $z \\to \\infty$ (expand to first non-vanishing order). Explain the jump in $E_z$ across the disc and relate it to $\\sigma/\\epsilon_0$.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'numerical-field-of-distributions',
              title: 'Numerical field of arbitrary charge distributions',
              prompt:
                'Write a vectorised NumPy function that computes $\\mathbf{E}$ on a 2D grid from an array of point charges. Discretise (a) a finite line charge of length 2 and (b) a ring of radius 1 (in the plane containing its axis) into 2000 elements. Compare the on-axis field with the analytic results (relative error below 1e-3 away from the sources). Plot field lines with streamplot for a dipole, a quadrupole and the ring. Finally plot the error against the number of elements and report the convergence order.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'superposition-equilibrium',
              title: 'Equilibrium with point charges',
              prompt:
                'Charges $+q$ sit at $(\\pm a, 0)$ and a charge $Q$ sits at the origin. Find all equilibrium positions of a test charge on the $x$- and $y$-axes, and determine their stability along each axis. Show that no configuration of fixed charges can hold a test charge in stable equilibrium in all three directions (a first look at Earnshaw\'s theorem), and check numerically by plotting the potential energy landscape around the origin.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two experimental facts are the foundation of electrostatics?',
              answerOutline:
                'Coulomb\'s inverse-square law for two point charges, and the superposition principle (forces from several charges add as vectors).',
            },
            {
              question: 'How should the field of any finite charge distribution behave far away, and why is this a useful check?',
              answerOutline:
                'Like a point charge Q_total/(4 pi epsilon_0 r^2) (or like a dipole if Q_total = 0); any derived formula that fails this limit is wrong.',
            },
            {
              question: 'Why is the field of an infinite charged plane independent of distance?',
              answerOutline:
                'Moving away, more distant charge comes into view at angles that contribute normal field; the two effects cancel exactly (equivalently Gauss\'s law with a pillbox gives sigma/2 epsilon_0).',
            },
          ],
        },
        {
          slug: 'gauss-law-and-the-divergence-of-e',
          title: 'Gauss\'s law and the divergence of E',
          summary:
            'Flux, Gauss\'s law in integral and differential form, and how symmetry turns hard integrals into one-line calculations.',
          estimatedMinutes: 120,
          objectives: [
            'Derive Gauss\'s law $\\oint\\mathbf{E}\\cdot d\\mathbf{a} = Q_{\\text{enc}}/\\epsilon_0$ from Coulomb\'s law using solid angle',
            'Convert it to the differential form $\\nabla\\cdot\\mathbf{E} = \\rho/\\epsilon_0$ with the divergence theorem',
            'Use Gauss\'s law to find fields of spherically, cylindrically and planarly symmetric distributions',
            'Explain why Gauss\'s law is always true but only sometimes useful',
          ],
          concepts: [
            'Electric flux $\\Phi_E = \\int\\mathbf{E}\\cdot d\\mathbf{a}$',
            'Solid angle and why the inverse square law matters',
            'Gauss\'s law, integral form',
            'Divergence theorem; $\\nabla\\cdot\\mathbf{E} = \\rho/\\epsilon_0$',
            '$\\nabla\\cdot(\\hat{\\mathbf{r}}/r^2) = 4\\pi\\delta^3(\\mathbf{r})$',
            'Gaussian surfaces: sphere, cylinder, pillbox',
            'Discontinuity of $E_\\perp$ across surface charge',
            'Field inside a uniform sphere',
          ],
          explanation: `The flux of $\\mathbf{E}$ through a closed surface counts field lines leaving it. For a point charge, $\\mathbf{E}\\cdot d\\mathbf{a} = \\frac{q}{4\\pi\\epsilon_0}d\\Omega$, where $d\\Omega$ is the solid angle the surface element subtends. Integrated over any closed surface this gives $4\\pi$ if the charge is inside and $0$ if it is outside. The $1/r^2$ of Coulomb's law cancels the $r^2$ of the area exactly, and that cancellation is the whole of **Gauss's law**:
$$\\oint_S\\mathbf{E}\\cdot d\\mathbf{a} = \\frac{Q_{\\text{enc}}}{\\epsilon_0}.$$
Superposition extends it to any distribution. With the divergence theorem it becomes the local, **differential form** $\\nabla\\cdot\\mathbf{E} = \\rho/\\epsilon_0$. This is the first of Maxwell's equations, and it stays true when charges move.

The differential form hides a subtlety. The field of a point charge, $\\hat{\\mathbf{r}}/r^2$, has zero divergence everywhere except the origin, yet its flux through any sphere is $4\\pi$. The resolution is $\\nabla\\cdot(\\hat{\\mathbf{r}}/r^2) = 4\\pi\\delta^3(\\mathbf{r})$. The Dirac delta, canonical in math-methods, is the right way to describe point sources, and you will need it again.

Gauss's law always holds, but it only *determines* $\\mathbf{E}$ when symmetry fixes the field's direction and makes its magnitude constant over a suitable surface. That happens for **spherical** symmetry (sphere: $E = Q_{\\text{enc}}/4\\pi\\epsilon_0 r^2$), **cylindrical** symmetry (coaxial cylinder: $E = \\lambda/2\\pi\\epsilon_0 s$) and **planar** symmetry (pillbox: $E = \\sigma/2\\epsilon_0$). Inside a uniformly charged sphere, $Q_{\\text{enc}} \\propto r^3$, so $E \\propto r$. For a dipole or a finite line, Gauss's law is still true but no single surface helps, and you integrate instead. A pillbox straddling any surface charge gives the boundary condition $E_\\perp^{\\text{above}} - E_\\perp^{\\text{below}} = \\sigma/\\epsilon_0$, which is used constantly later.

The standard error is to argue "the field is zero because the enclosed charge is zero". Zero net flux does not imply zero field (think of a charge outside the surface). Read Tong's Gauss's law section, Feynman II-5 and OpenStax Vol. 2 chapter 6.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 2: Gauss\'s law and its applications',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 5: Application of Gauss\' Law',
              url: 'https://www.feynmanlectures.caltech.edu/II_05.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 6: Gauss\'s Law',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/6-1-electric-flux',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'HyperPhysics — Gauss\'s law',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/electric/gaulaw.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
          ],
          exercises: [
            {
              slug: 'gauss-symmetric-fields',
              title: 'Fields from Gauss\'s law',
              prompt:
                'Use Gauss\'s law to find $\\mathbf{E}$ everywhere for: (a) a sphere of radius $R$ with $\\rho = kr$; (b) an infinite cylinder with $\\rho = ks$ for $s < R$; (c) a thick slab $|z| < d$ with uniform $\\rho$; (d) a coaxial cable with inner line charge $\\lambda$ and outer cylindrical shell carrying $-\\lambda$. Sketch $E$ against the radial coordinate for each and check continuity or discontinuity at each surface against the boundary condition.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'delta-function-divergence',
              title: 'The divergence of a point-charge field',
              prompt:
                'Show directly that $\\nabla\\cdot(\\hat{\\mathbf{r}}/r^2) = 0$ for $r \\ne 0$ in spherical coordinates, yet its flux through a sphere is $4\\pi$. Resolve the paradox by showing that the regularised field $\\mathbf{r}/(r^2 + a^2)^{3/2}$ has a divergence that integrates to $4\\pi$ for every $a$ and tends to a delta function as $a \\to 0$. Plot the divergence for several $a$ to visualise the limit.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'numerical-flux-check',
              title: 'Gauss\'s law by numerical flux',
              prompt:
                'Using your point-charge field code, place three charges at random positions and compute the flux of $\\mathbf{E}$ numerically through (a) a sphere, (b) a cube and (c) an irregular closed surface (e.g. a deformed sphere $r(\\theta, \\phi) = 1 + 0.3\\cos 3\\phi\\sin^2\\theta$). Use quadrature over a fine surface mesh. Confirm the flux equals $Q_{\\text{enc}}/\\epsilon_0$ to the quadrature accuracy and is independent of the outside charges.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Which feature of Coulomb\'s law makes Gauss\'s law possible?',
              answerOutline:
                'The exact inverse-square dependence: the flux through a surface element depends only on the solid angle it subtends, so the total flux is independent of the surface shape.',
            },
            {
              question: 'When is Gauss\'s law useful for finding E, and when is it not?',
              answerOutline:
                'Useful when symmetry (spherical, cylindrical, planar) makes E normal and constant in magnitude on a Gaussian surface; otherwise it is true but does not determine E.',
            },
            {
              question: 'What is the boundary condition on E across a surface charge?',
              answerOutline:
                'The normal component jumps by sigma/epsilon_0; the tangential component is continuous.',
            },
          ],
          relatedLessons: ['math-methods/vector-calculus/integral-theorems'],
        },
        {
          slug: 'curl-free-fields-and-the-electric-potential',
          title: 'Curl-free fields and the electric potential',
          summary:
            'Why the electrostatic field is a gradient, the scalar potential and Poisson\'s equation, and the potential of the electric dipole.',
          estimatedMinutes: 120,
          objectives: [
            'Show that $\\nabla\\times\\mathbf{E} = 0$ in electrostatics and deduce the existence of a scalar potential $V$ with $\\mathbf{E} = -\\nabla V$',
            'Compute $V$ for continuous distributions and recover $\\mathbf{E}$ from it',
            'Derive Poisson\'s and Laplace\'s equations and state what boundary conditions they need',
            'Derive the potential and field of an electric dipole and its torque and energy in an external field',
          ],
          concepts: [
            '$\\nabla\\times\\mathbf{E} = 0$ and path-independence',
            'Potential $V(\\mathbf{r}) = -\\int_{\\mathcal{O}}^{\\mathbf{r}}\\mathbf{E}\\cdot d\\mathbf{l}$',
            'Reference point and gauge freedom $V \\to V + c$',
            '$V = \\frac{1}{4\\pi\\epsilon_0}\\int\\frac{\\rho}{\\mathscr{r}}d\\tau\'$',
            'Poisson $\\nabla^2 V = -\\rho/\\epsilon_0$; Laplace $\\nabla^2 V = 0$',
            'Equipotentials perpendicular to field lines',
            'Dipole potential $V = \\frac{\\mathbf{p}\\cdot\\hat{\\mathbf{r}}}{4\\pi\\epsilon_0 r^2}$',
            'Torque $\\mathbf{p}\\times\\mathbf{E}$ and energy $-\\mathbf{p}\\cdot\\mathbf{E}$',
          ],
          explanation: `The field of a point charge is radial and depends only on $r$, so its line integral between two points depends only on their radii. By superposition every electrostatic field has path-independent line integrals. Equivalently $\\nabla\\times\\mathbf{E} = 0$, and $\\mathbf{E}$ is the gradient of a scalar, the **electric potential**:
$$\\mathbf{E} = -\\nabla V, \\qquad V(\\mathbf{r}) = -\\int_{\\mathcal{O}}^{\\mathbf{r}}\\mathbf{E}\\cdot d\\mathbf{l}.$$
The reference point $\\mathcal{O}$ is arbitrary: adding a constant to $V$ changes nothing physical. This is the simplest example of a **gauge freedom**. For localised charges, take $\\mathcal{O}$ at infinity, and then $V = \\frac{1}{4\\pi\\epsilon_0}\\int\\frac{\\rho(\\mathbf{r}')}{\\mathscr{r}}d\\tau'$. This is a scalar integral, usually much easier than the vector integral for $\\mathbf{E}$. The economy is real: one function replaces three, and superposition becomes ordinary addition.

Combine $\\mathbf{E} = -\\nabla V$ with Gauss's law and you get **Poisson's equation** $\\nabla^2 V = -\\rho/\\epsilon_0$, which becomes **Laplace's equation** $\\nabla^2 V = 0$ in charge-free regions. Much of electrostatics consists of solving these PDEs with boundary conditions, which is the next module. Equipotential surfaces are everywhere perpendicular to field lines, and the field is strongest where equipotentials crowd together.

The most important distribution after the point charge is the **electric dipole**: charges $\\pm q$ separated by $\\mathbf{d}$, with moment $\\mathbf{p} = q\\mathbf{d}$. Far away, $V = \\frac{\\mathbf{p}\\cdot\\hat{\\mathbf{r}}}{4\\pi\\epsilon_0 r^2}$, falling one power of $r$ faster than a point charge, and
$$\\mathbf{E} = \\frac{1}{4\\pi\\epsilon_0 r^3}\\left[3(\\mathbf{p}\\cdot\\hat{\\mathbf{r}})\\hat{\\mathbf{r}} - \\mathbf{p}\\right].$$
In a uniform external field a dipole feels torque $\\mathbf{p}\\times\\mathbf{E}$ and has energy $U = -\\mathbf{p}\\cdot\\mathbf{E}$. In a non-uniform field it also feels a net force $(\\mathbf{p}\\cdot\\nabla)\\mathbf{E}$, which is why a charged comb picks up neutral bits of paper. Dipoles are the starting point of the multipole expansion and of dielectrics.

Pitfalls: $V$ is not potential *energy* ($qV$ is), and the formula $\\int\\rho/\\mathscr{r}$ fails for distributions that extend to infinity (an infinite line or plane), where you must choose another reference point. Read Tong's potential section, Feynman II-4 and II-6, and OpenStax Vol. 2 chapter 7.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 2: Electrostatic potential and dipoles',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 6: The Electric Field in Various Circumstances',
              url: 'https://www.feynmanlectures.caltech.edu/II_06.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Dipole potential and field, the dipole approximation for arbitrary distributions.',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 7: Electric Potential',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/7-1-electric-potential-energy',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'MIT 8.02 Physics II: Electricity and Magnetism (Spring 2007, TEAL)',
              url: 'https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Course notes chapters 3-4 on potential and capacitance; problem sets for practice throughout modules 1-5.',
            },
          ],
          exercises: [
            {
              slug: 'dipole-field-derivation',
              title: 'Derive the dipole potential and field',
              prompt:
                'For charges $\\pm q$ at $\\pm\\mathbf{d}/2$, expand the exact potential for $r \\gg d$ to obtain $V = \\mathbf{p}\\cdot\\hat{\\mathbf{r}}/4\\pi\\epsilon_0 r^2$. Take minus the gradient in spherical coordinates to get $E_r$ and $E_\\theta$, and rewrite in the coordinate-free form $[3(\\mathbf{p}\\cdot\\hat{\\mathbf{r}})\\hat{\\mathbf{r}} - \\mathbf{p}]/4\\pi\\epsilon_0 r^3$. Then derive the torque, force and energy of a dipole in an external field, and compute the interaction energy of two dipoles as a function of their orientations.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'potential-then-field',
              title: 'Potential first, field second',
              prompt:
                'Compute $V$ on the axis of a uniformly charged ring and of a disc, and everywhere for a uniformly charged spherical shell (inside and outside), by direct integration of $\\rho/\\mathscr{r}$. Differentiate to recover $\\mathbf{E}$ and compare with the previous lessons. For the infinite line charge, explain why the formula diverges, choose a reference radius $s_0$, and show $V = -\\frac{\\lambda}{2\\pi\\epsilon_0}\\ln(s/s_0)$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'equipotential-plots',
              title: 'Equipotentials and field lines numerically',
              prompt:
                'Compute $V$ on a 2D grid for (a) a dipole, (b) two equal like charges, (c) a charge $+2q$ and a charge $-q$. Plot equipotential contours together with field lines from streamplot of $-\\nabla V$ (numpy.gradient). Verify numerically that field lines cross equipotentials at right angles. For (c) find the neutral point and the equipotential that encloses only the $-q$ charge, and compare with the analytic location.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the electrostatic field curl-free?',
              answerOutline:
                'Each point-charge field is central and spherically symmetric, so its line integrals are path-independent; superposition preserves this, so curl E = 0 and E = -grad V.',
            },
            {
              question: 'Why does the dipole potential fall as 1/r^2 rather than 1/r?',
              answerOutline:
                'The net charge is zero, so the monopole term cancels; the leading term comes from the separation, and the difference of two 1/r terms gives one extra power of d/r.',
            },
            {
              question: 'What is the energy of a dipole in an external field, and which orientation is stable?',
              answerOutline:
                'U = -p dot E; aligned with the field is the minimum (stable), anti-aligned the maximum.',
            },
          ],
        },
        {
          slug: 'electrostatic-energy',
          title: 'Electrostatic energy and the energy in the field',
          summary:
            'The work needed to assemble a charge distribution, the field energy density, self-energy, and forces from energy.',
          estimatedMinutes: 90,
          objectives: [
            'Compute the work needed to assemble point charges and continuous distributions',
            'Derive $W = \\frac{\\epsilon_0}{2}\\int E^2\\,d\\tau$ and interpret it as energy stored in the field',
            'Explain the self-energy problem for point charges and the classical electron radius',
            'Use energy methods to find forces, e.g. the pressure on a charged conductor surface',
          ],
          concepts: [
            'Work to assemble charges $W = \\frac{1}{2}\\sum_{i}q_iV(\\mathbf{r}_i)$',
            'Continuous form $W = \\frac12\\int\\rho V\\,d\\tau$',
            'Field energy density $u = \\frac{\\epsilon_0}{2}E^2$',
            'Energy is not superposable (quadratic in E)',
            'Self-energy and its divergence for point charges',
            'Classical electron radius $r_e = e^2/4\\pi\\epsilon_0 m_e c^2$',
            'Force from virtual work $F = -\\partial W/\\partial x$',
            'Electrostatic pressure $\\sigma^2/2\\epsilon_0$',
          ],
          explanation: `Bring charges in from infinity one at a time. The work to bring $q_j$ in against the charges already present is $q_j$ times their potential at its destination, so the total is $W = \\frac{1}{4\\pi\\epsilon_0}\\sum_{i<j}\\frac{q_iq_j}{r_{ij}} = \\frac12\\sum_i q_iV(\\mathbf{r}_i)$. The factor of $\\tfrac12$ corrects for counting each pair twice. For a continuous distribution this becomes $W = \\frac12\\int\\rho V\\,d\\tau$. Substitute $\\rho = \\epsilon_0\\nabla\\cdot\\mathbf{E}$, integrate by parts, and let the surface go to infinity, and you get
$$W = \\frac{\\epsilon_0}{2}\\int_{\\text{all space}}E^2\\,d\\tau.$$
The energy can be thought of as stored in the field, with density $u = \\epsilon_0E^2/2$. In electrostatics the two formulas are just bookkeeping alternatives. In electrodynamics only the field version survives: energy really does travel through empty space with an electromagnetic wave (the Poynting theorem, module 6).

Two features are surprising. Energy is quadratic in the field, so it does **not superpose**: the energy of two charges is not the sum of their individual energies. The cross term is the interaction energy. Also, the field formula is always positive while the pair sum can be negative. The difference is the **self-energy** of each point charge, $\\frac{\\epsilon_0}{2}\\int E^2\\,d\\tau$ for a single point charge, which diverges at the origin. For a uniformly charged sphere of radius $R$ it is $\\frac{3}{5}\\frac{Q^2}{4\\pi\\epsilon_0R}$. Setting the electron's self-energy equal to $m_ec^2$ defines the **classical electron radius** $r_e = 2.8$ fm. This is a sign that classical electrodynamics breaks down at small scales; quantum electrodynamics handles the issue with renormalisation.

Energy gives forces by **virtual work**. Displace part of the system by $dx$ at fixed charge and $F = -\\partial W/\\partial x$. The surface of a charged conductor feels an outward pressure $\\sigma^2/2\\epsilon_0$, the field energy density just outside. Note the factor 2: the charge on a surface element feels the *average* of the fields above and below it. Read Tong's energy section, Feynman II-8, and the corresponding 8.02 notes.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 2: Electrostatic energy',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 8: Electrostatic Energy',
              url: 'https://www.feynmanlectures.caltech.edu/II_08.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Includes the energy of a nucleus and the electrostatic contribution to nuclear binding.',
            },
            {
              title: 'Fitzpatrick — Classical Electromagnetism (lecture notes)',
              url: 'https://farside.ph.utexas.edu/teaching/em/lectures/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
              note: 'Electrostatic energy section; a slightly more mathematical treatment.',
            },
          ],
          exercises: [
            {
              slug: 'sphere-self-energy',
              title: 'Energy of a uniformly charged sphere, two ways',
              prompt:
                'Compute the energy of a uniformly charged sphere of radius $R$ and charge $Q$ (a) by assembling it shell by shell, (b) from $\\frac12\\int\\rho V$, (c) from $\\frac{\\epsilon_0}{2}\\int E^2$. All three must give $\\frac35 Q^2/4\\pi\\epsilon_0 R$. Use the result to estimate the electrostatic contribution to the mass difference between mirror nuclei ${}^{15}$O and ${}^{15}$N, taking $R = 1.2A^{1/3}$ fm, and compare with the measured value (about 3.5 MeV including the neutron-proton mass difference).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'madelung-constant',
              title: 'The Madelung constant of NaCl numerically',
              prompt:
                'The electrostatic energy per ion pair of a rock-salt crystal is $-M e^2/4\\pi\\epsilon_0 a$ with Madelung constant $M \\approx 1.7476$. Compute $M$ numerically by summing $\\pm 1/r$ over a cube of ions of increasing size. Show that a naive spherical sum converges badly or not at all, and that summing over neutral cubes with fractional charges on faces, edges and corners (Evjen\'s method) converges quickly. Explain why conditionally convergent sums need care.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'electrostatic-pressure',
              title: 'Pressure on a charged soap bubble',
              prompt:
                'Show that the outward electrostatic pressure on a charged conductor surface is $\\sigma^2/2\\epsilon_0$, using both the average-field argument and virtual work on a spherical shell. A soap bubble of radius 1 cm and surface tension 0.025 N/m has a pressure excess $4\\gamma/R$ inside. Find the charge that would make the electrostatic pressure balance the surface-tension pressure, and the corresponding potential. Is this achievable before air breaks down (3 MV/m)?',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does electrostatic energy not obey superposition?',
              answerOutline:
                'It is quadratic in the field; the energy of combined fields contains cross terms (the interaction energy) in addition to the individual energies.',
            },
            {
              question: 'Why can the pair-sum energy of point charges be negative when the field energy is always positive?',
              answerOutline:
                'The field integral includes the infinite self-energies of the point charges, which the pair sum omits; the finite difference is the interaction energy.',
            },
            {
              question: 'What is the pressure on the surface of a charged conductor and why is there a factor of 1/2?',
              answerOutline:
                'sigma^2/(2 epsilon_0); the surface charge feels the average of the field just outside (sigma/epsilon_0) and just inside (zero).',
            },
          ],
        },
      ],
    },
    {
      slug: 'potentials-and-conductors',
      title: 'Potentials, Conductors and Boundary-Value Problems',
      description:
        'Conductors and capacitance, then the systematic solution of Laplace\'s equation: uniqueness, images, separation of variables, multipole expansions and numerical relaxation.',
      lessons: [
        {
          slug: 'conductors-and-capacitance',
          title: 'Conductors and capacitance',
          summary:
            'Why the field vanishes inside a conductor, where its charge goes, shielding, and the capacitance of conductor systems.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the electrostatic properties of conductors: zero interior field, equipotential surface, surface charge with $E = \\sigma/\\epsilon_0$ just outside',
            'Explain electrostatic shielding (the Faraday cage) and the charge induced on cavity walls',
            'Compute the capacitance of parallel-plate, spherical and cylindrical capacitors and the energy they store',
            'Define the capacitance matrix for several conductors and explain its symmetry',
          ],
          concepts: [
            'Conductor in equilibrium: $\\mathbf{E} = 0$ inside',
            'Charge resides on the surface',
            'Surface is an equipotential; field normal, $E = \\sigma/\\epsilon_0$',
            'Induced charge and cavities; Faraday cage',
            'Capacitance $C = Q/\\Delta V$',
            'Energy $W = \\tfrac12 CV^2$',
            'Capacitance (and elastance) matrix; reciprocity',
            'Charge concentration at sharp points',
          ],
          explanation: `A **conductor** has charges free to move. In equilibrium they move until the field inside is zero, because any interior field would push them further. Everything follows from that. Gauss's law gives $\\rho = 0$ inside, so any net charge sits on the surface. The conductor is an equipotential, so the field just outside is normal to the surface with magnitude $\\sigma/\\epsilon_0$. The relaxation happens fast: for a good metal it takes about $10^{-19}$ s, set by $\\epsilon_0/\\sigma_{\\text{cond}}$.

A cavity inside a conductor is **shielded**. If the cavity holds no charge, the field inside it is exactly zero whatever happens outside, because the cavity wall is an equipotential enclosing a charge-free region and the uniqueness theorem (next lesson) gives $V = $ const. If the cavity holds a charge $q$, an equal and opposite charge $-q$ is induced on the cavity wall, and $+q$ appears on the outer surface. The outer charge distribution depends only on the outer surface's shape, not on where $q$ sits inside. This is how Faraday cages, coaxial cables and shielded rooms work. Sharp points carry high $\\sigma$ (two connected spheres share a potential $Q/R$, so $\\sigma \\propto 1/R$), which is why lightning rods are pointed and why corona discharge starts at edges.

Two conductors carrying $\\pm Q$ form a **capacitor** with capacitance $C = Q/\\Delta V$. $C$ depends only on geometry: $\\epsilon_0A/d$ for parallel plates, $4\\pi\\epsilon_0ab/(b - a)$ for concentric spheres, $2\\pi\\epsilon_0L/\\ln(b/a)$ for a coaxial cable. The stored energy is $\\frac12 CV^2 = \\frac{Q^2}{2C}$, which equals $\\frac{\\epsilon_0}{2}\\int E^2$. To compute $C$, assume charges $\\pm Q$, find $\\mathbf{E}$, integrate to get $\\Delta V$, and divide. For $N$ conductors, the charges and potentials are linearly related, $Q_i = \\sum_j C_{ij}V_j$. The **capacitance matrix** is symmetric ($C_{ij} = C_{ji}$, a reciprocity theorem that follows from the energy), and you will compute one numerically in the relaxation lesson.

Pitfall: a conductor's interior field is zero only for *static* equilibrium. Time-varying fields penetrate a skin depth (module 6). Read Tong's conductor section, Feynman II-5 sections 5-9 to 5-10, and OpenStax Vol. 2 chapter 8. The PhET capacitor lab shows the fringing field the parallel-plate formula ignores.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 2: Conductors',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 8: Capacitance',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'PhET — Capacitor Lab: Basics',
              url: 'https://phet.colorado.edu/en/simulations/capacitor-lab-basics',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
            {
              title: 'Walter Lewin — 8.02x Electricity and Magnetism lectures',
              url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro2314mKyUiOILaOC2hk6Pc3j',
              type: 'lecture',
              cost: 'free',
              provider: 'YouTube (Lectures by Walter Lewin)',
              note: 'Lectures 4-7 on conductors, Faraday cages and capacitance, with demonstrations.',
            },
          ],
          exercises: [
            {
              slug: 'standard-capacitances',
              title: 'Derive standard capacitances',
              prompt:
                'Derive the capacitance of (a) parallel plates, (b) concentric spheres, (c) a coaxial cable per unit length, (d) an isolated sphere, (e) two parallel wires of radius $a$ separated by $d \\gg a$ (use superposition of line charges; expect $C/L = \\pi\\epsilon_0/\\ln(d/a)$). Check each stored energy $Q^2/2C$ against $\\frac{\\epsilon_0}{2}\\int E^2$. Evaluate the capacitance per metre of a typical 50-ohm coax ($b/a \\approx 3.5$ with polyethylene, $\\epsilon_r = 2.25$).',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'cavity-shielding-argument',
              title: 'Charges in a cavity',
              prompt:
                'A neutral conducting sphere of radius $R$ contains an off-centre spherical cavity in which a point charge $q$ sits off the cavity\'s centre. Determine (with justification): the charge on the cavity wall and its distribution (uniform or not?), the charge on the outer surface and its distribution, the field outside, and the force on a second charge $q\'$ placed outside. Explain which conclusions change if the outer sphere is grounded.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'connected-spheres',
              title: 'Charge concentration on small radii',
              prompt:
                'Two conducting spheres of radii $a$ and $b$, far apart, are connected by a thin wire and carry total charge $Q$. Find the charge and surface density on each and show $\\sigma_a/\\sigma_b = b/a$. Use this to estimate the field at the tip of a lightning rod of radius 1 mm connected to a structure of effective radius 10 m at a potential of 1 MV relative to the surrounding air, and compare with the breakdown field of air.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the field inside a conductor zero in electrostatic equilibrium?',
              answerOutline:
                'Free charges would move in any nonzero field; equilibrium is reached only when they have rearranged to cancel the interior field.',
            },
            {
              question: 'A charge q is inside a cavity in a neutral conductor. What charge appears on the outer surface and does its distribution depend on where q is?',
              answerOutline:
                '+q appears on the outer surface; its distribution depends only on the outer surface shape, not on the position of q in the cavity (the conductor shields the inside from the outside).',
            },
            {
              question: 'What does capacitance depend on?',
              answerOutline:
                'Only the geometry of the conductors and the medium between them, not on the charge or voltage.',
            },
          ],
        },
        {
          slug: 'laplaces-equation-uniqueness-and-images',
          title: 'Laplace\'s equation, uniqueness and the method of images',
          summary:
            'Properties of harmonic functions, the uniqueness theorems that justify guessing, and the method of images for planes and spheres.',
          estimatedMinutes: 150,
          objectives: [
            'State the mean-value property of solutions of Laplace\'s equation and deduce Earnshaw\'s theorem',
            'State and prove the first and second uniqueness theorems',
            'Solve the point charge near a grounded plane and near a grounded or isolated sphere by images',
            'Compute induced surface charge and the force on the real charge, and explain why the image energy is half the naive value',
          ],
          concepts: [
            'Harmonic functions; no local maxima or minima',
            'Mean-value property',
            'Earnshaw\'s theorem',
            'First uniqueness theorem (Dirichlet data)',
            'Second uniqueness theorem (given charges on conductors)',
            'Image charge for a grounded plane',
            'Image for a sphere: $q\' = -qR/a$ at $R^2/a$',
            'Induced charge $\\sigma = -\\epsilon_0\\partial V/\\partial n$',
          ],
          explanation: `In a charge-free region the potential satisfies **Laplace's equation** $\\nabla^2 V = 0$, and its solutions (**harmonic functions**) are very rigid. The value of $V$ at any point equals its average over any sphere centred there (the **mean-value property**). So $V$ has no local maxima or minima in the interior; its extremes occur on the boundary. An immediate consequence is **Earnshaw's theorem**: no static arrangement of charges can hold a test charge in stable equilibrium, because that would need a potential-energy minimum in empty space. This is why ion traps need oscillating fields (Paul traps) or magnetic fields (Penning traps).

The **first uniqueness theorem** says the solution of Laplace's equation in a volume is uniquely determined by $V$ on its boundary. Proof: the difference of two solutions is harmonic and vanishes on the boundary, so by the extremum property it vanishes everywhere. The **second uniqueness theorem** says that in a region bounded by conductors with specified total charges, the field is unique. The practical meaning is liberating: *any* method that produces a function satisfying Poisson's equation and the boundary conditions gives *the* answer, including a guess.

The **method of images** is an inspired guess. A point charge $q$ at height $d$ above a grounded infinite conducting plane: the region $z > 0$ has the same charge and the same boundary condition ($V = 0$ on the plane) as the system "$q$ at $d$ plus $-q$ at $-d$, no plane". So by uniqueness the potential above the plane is the two-charge potential. The induced surface charge, $\\sigma = -\\epsilon_0\\partial V/\\partial z|_{z=0} = -\\frac{qd}{2\\pi(x^2 + y^2 + d^2)^{3/2}}$, integrates to $-q$. The force on $q$ is the attraction to its image, $q^2/4\\pi\\epsilon_0(2d)^2$. But the energy is $-q^2/4\\pi\\epsilon_0(4d)$, *half* the two-charge value, because the field exists only in the upper half-space. For a **grounded sphere** of radius $R$ and an external charge $q$ at distance $a$, the image is $q' = -qR/a$ at distance $R^2/a$ from the centre. For an isolated neutral sphere, add a second image $-q'$ at the centre.

Images work only for a few geometries (planes, spheres, cylinders, wedges at angles $\\pi/n$). For everything else you need separation of variables or numerics, the next two lessons. Read Tong's section on Laplace's equation and images and Feynman II-7.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 2: Laplace\'s equation and the method of images',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 7: The Electric Field in Various Circumstances (Continued)',
              url: 'https://www.feynmanlectures.caltech.edu/II_07.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Images for planes and spheres, and two-dimensional fields from complex functions.',
            },
            {
              title: 'Fitzpatrick — Classical Electromagnetism: uniqueness and images',
              url: 'https://farside.ph.utexas.edu/teaching/em/lectures/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
            },
            {
              title: 'MIT 8.07 Electromagnetism II — lecture notes and problem sets',
              url: 'https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The Griffiths-level second course; its early problem sets cover boundary-value problems.',
            },
          ],
          exercises: [
            {
              slug: 'uniqueness-proofs',
              title: 'Prove the uniqueness theorems and the mean-value property',
              prompt:
                'Prove the mean-value property for a harmonic function by showing that $d/dR$ of the spherical average is proportional to the flux of $\\nabla V$ through the sphere, which vanishes. Deduce Earnshaw\'s theorem. Then prove the second uniqueness theorem by applying Green\'s first identity to the difference field $\\mathbf{E}_3 = \\mathbf{E}_1 - \\mathbf{E}_2$ and showing $\\int E_3^2\\,d\\tau = 0$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sphere-image-derivation',
              title: 'Image charge for a grounded sphere',
              prompt:
                'Show that a charge $q$ at distance $a$ from the centre of a grounded sphere of radius $R$ and an image $q\' = -qR/a$ at $b = R^2/a$ produce zero potential on the sphere. Compute the induced surface charge density and check it integrates to $q\'$. Find the force on $q$. Then handle an isolated, neutral sphere and show the force is always attractive and falls as $1/a^5$ at large distance (a charge-induced-dipole force). Plot the equipotentials in Python.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'images-numerical-check',
              title: 'Check the image solution numerically',
              prompt:
                'Using the plane-image solution, compute the induced surface charge on a grounded plane numerically on a grid and integrate it to confirm the total is $-q$. Then set up the problem of a charge between two grounded planes meeting at 90 degrees (three images) and at 60 degrees (five images), plot the potential, and check that $V = 0$ on both planes to machine precision. Explain why 70 degrees does not work.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a harmonic function have no local maximum in the interior of its domain?',
              answerOutline:
                'By the mean-value property its value at any point equals the average over a surrounding sphere, so it cannot exceed all nearby values.',
            },
            {
              question: 'Why is it legitimate to replace a grounded plane by an image charge?',
              answerOutline:
                'In the physical region the two-charge configuration has the same charges and boundary conditions; by uniqueness its potential there is the correct one.',
            },
            {
              question: 'Why is the energy of a charge near a grounded plane half the energy of the charge-image pair?',
              answerOutline:
                'The real field exists only in the upper half-space, so the field energy is half that of the full two-charge field; equivalently the work done moving q in uses the attraction force only.',
            },
          ],
        },
        {
          slug: 'separation-of-variables-and-the-multipole-expansion',
          title: 'Separation of variables and the multipole expansion',
          summary:
            'Solving Laplace\'s equation in Cartesian and spherical coordinates, Legendre polynomials, and the multipole expansion of a localised charge distribution.',
          estimatedMinutes: 150,
          objectives: [
            'Solve Laplace\'s equation in a rectangular region by separation of variables with Fourier series for the boundary data',
            'Solve azimuthally symmetric problems in spherical coordinates with $V = \\sum(A_\\ell r^\\ell + B_\\ell r^{-\\ell - 1})P_\\ell(\\cos\\theta)$',
            'Solve a conducting sphere in a uniform field and compute the induced dipole moment',
            'Derive the multipole expansion and compute monopole, dipole and quadrupole moments of a distribution',
          ],
          concepts: [
            'Separation of variables $V = X(x)Y(y)$',
            'Fourier sine series for boundary data',
            'Legendre polynomials and orthogonality',
            'General azimuthal solution in spherical coordinates',
            'Sphere in a uniform field; induced dipole $p = 4\\pi\\epsilon_0R^3E_0$',
            'Multipole expansion $\\frac{1}{\\mathscr{r}} = \\sum_\\ell\\frac{r\'^\\ell}{r^{\\ell + 1}}P_\\ell(\\cos\\alpha)$',
            'Monopole, dipole and quadrupole moments',
            'Origin dependence of the dipole moment',
          ],
          explanation: `When images fail, **separation of variables** is the general analytic method. It is canonical in math-methods; here you use it on electrostatics. In a rectangular slot with $V = 0$ on three sides and $V = V_0(y)$ on the fourth, try $V = X(x)Y(y)$. Laplace's equation splits into $X'' = k^2X$ and $Y'' = -k^2Y$. The homogeneous boundary conditions select $Y = \\sin(n\\pi y/a)$, the decay of the potential away from the driven side selects $X = e^{-n\\pi x/a}$, and the remaining boundary condition is met by a Fourier sine series. For constant $V_0$ the coefficients are $4V_0/n\\pi$ for odd $n$. Plot the partial sums and see the Gibbs overshoot at the corners.

In **spherical coordinates** with azimuthal symmetry the separated solutions are $r^\\ell P_\\ell(\\cos\\theta)$ and $r^{-\\ell - 1}P_\\ell(\\cos\\theta)$, so the general solution is
$$V(r, \\theta) = \\sum_{\\ell = 0}^\\infty\\left(A_\\ell r^\\ell + \\frac{B_\\ell}{r^{\\ell + 1}}\\right)P_\\ell(\\cos\\theta),$$
with the **Legendre polynomials** $P_\\ell$ ($1$, $\\cos\\theta$, $\\tfrac12(3\\cos^2\\theta - 1)$, ...), which are orthogonal on $[-1, 1]$. Regularity at the origin kills the $B_\\ell$ inside a sphere, and decay at infinity kills the $A_\\ell$ outside. The textbook example is a **conducting sphere in a uniform field** $E_0\\hat{\\mathbf{z}}$. Only $\\ell = 1$ survives, giving $V = -E_0\\left(r - \\frac{R^3}{r^2}\\right)\\cos\\theta$: the applied field plus the field of an induced dipole $p = 4\\pi\\epsilon_0R^3E_0$, with surface charge $3\\epsilon_0E_0\\cos\\theta$.

The **multipole expansion** describes a localised distribution seen from far away. Expand $1/\\mathscr{r}$ in Legendre polynomials of the angle between $\\mathbf{r}$ and $\\mathbf{r}'$:
$$V(\\mathbf{r}) = \\frac{1}{4\\pi\\epsilon_0}\\sum_{\\ell}\\frac{1}{r^{\\ell + 1}}\\int r'^\\ell P_\\ell(\\cos\\alpha)\\rho(\\mathbf{r}')\\,d\\tau'.$$
The terms are the **monopole** (total charge, $1/r$), **dipole** ($\\mathbf{p} = \\int\\mathbf{r}'\\rho\\,d\\tau'$, $1/r^2$), **quadrupole** (a symmetric traceless tensor, $1/r^3$), and so on. The lowest non-vanishing moment dominates at large distance and is independent of the choice of origin. Higher ones are not: the dipole moment changes with origin unless the total charge is zero. The same expansion describes the gravitational field of the oblate Earth ($J_2$), the quadrupole moments of nuclei, and the radiation multipoles of module 7.

Read Tong's sections on Laplace's equation in spherical coordinates and the multipole expansion; the math-methods lessons on separation of variables and Legendre polynomials are the canonical references for the mathematics.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 2: Multipole expansion and boundary-value problems',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'Fitzpatrick — Classical Electromagnetism: Laplace\'s equation in spherical coordinates',
              url: 'https://farside.ph.utexas.edu/teaching/em/lectures/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
            },
            {
              title: 'MIT 8.07 Electromagnetism II — lecture notes',
              url: 'https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Likharev — Essential Graduate Physics: Classical Electrodynamics (open textbook)',
              url: 'https://phys.libretexts.org/Bookshelves/Electricity_and_Magnetism/Essential_Graduate_Physics_-_Classical_Electrodynamics_(Likharev)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts Physics',
              note: 'Chapter 2 has many more worked boundary-value problems at a slightly higher level.',
            },
          ],
          exercises: [
            {
              slug: 'rectangular-slot',
              title: 'Potential in a rectangular slot',
              prompt:
                'An infinitely long slot has grounded walls at $y = 0$ and $y = a$ and at $x \\to \\infty$, and the end $x = 0$ is held at $V_0$. Derive $V(x, y) = \\frac{4V_0}{\\pi}\\sum_{n\\,\\text{odd}}\\frac1n e^{-n\\pi x/a}\\sin(n\\pi y/a)$. Sum the series in closed form (expect $\\frac{2V_0}{\\pi}\\arctan[\\sin(\\pi y/a)/\\sinh(\\pi x/a)]$). Plot the potential and the partial sums with 1, 5 and 50 terms, and compute the surface charge on the wall at $y = 0$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sphere-in-uniform-field',
              title: 'Conducting and charged spheres in a uniform field',
              prompt:
                'Solve for the potential outside a grounded conducting sphere in a uniform field $E_0\\hat{\\mathbf{z}}$ using the Legendre expansion, and find the induced surface charge and dipole moment. Then repeat for a sphere whose surface is held at potential $V_0(\\theta) = k\\cos 3\\theta$: expand in Legendre polynomials (use orthogonality and numerical integration to get the coefficients), give $V$ inside and outside, and plot it.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'multipole-moments-numerical',
              title: 'Compute multipole moments numerically',
              prompt:
                'Write code that takes a set of point charges and returns the monopole, dipole vector and quadrupole tensor $Q_{ij} = \\sum q(3x_ix_j - r^2\\delta_{ij})$. For a linear quadrupole ($-q, 2q, -q$), a square quadrupole and a water-molecule-like charge set, compute the exact potential on a circle of radius $r$ and compare with the truncated multipole expansion through order $\\ell = 2$. Plot the relative error against $r/d$ on log-log axes and confirm the expected power law for each truncation order.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'In the spherical solution, why are the r^{-(l+1)} terms absent inside a sphere and the r^l terms absent outside?',
              answerOutline:
                'Inside, the potential must be finite at the origin; outside, it must not grow at infinity (except for any applied uniform field term).',
            },
            {
              question: 'When is the dipole moment of a distribution independent of the origin?',
              answerOutline:
                'When the total charge is zero; in general the lowest non-vanishing multipole moment is origin-independent.',
            },
            {
              question: 'What is the induced dipole moment of a conducting sphere in a uniform field?',
              answerOutline:
                'p = 4 pi epsilon_0 R^3 E_0, along the applied field.',
            },
          ],
          relatedLessons: [
            'math-methods/partial-differential-equations-and-special-functions/separation-of-variables',
            'math-methods/partial-differential-equations-and-special-functions/legendre-polynomials-and-spherical-harmonics',
          ],
        },
        {
          slug: 'numerical-solution-by-relaxation',
          title: 'Numerical solution of Laplace\'s equation by relaxation',
          summary:
            'Discretise Laplace\'s equation on a grid, iterate to convergence with Jacobi, Gauss-Seidel and SOR, and compute capacitance and fields of geometries with no analytic solution.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the five-point finite-difference Laplacian and the discrete mean-value property',
            'Implement Jacobi, Gauss-Seidel and successive over-relaxation and compare their convergence rates',
            'Handle Dirichlet boundaries, internal conductors and symmetry planes, and verify against analytic solutions',
            'Compute the capacitance of a geometry with fringing fields and assess discretisation error',
          ],
          concepts: [
            'Five-point stencil: $V_{i,j} = \\frac14(V_{i+1,j} + V_{i-1,j} + V_{i,j+1} + V_{i,j-1})$',
            'Jacobi iteration',
            'Gauss-Seidel and red-black ordering',
            'Successive over-relaxation, optimal $\\omega \\approx 2/(1 + \\pi/N)$',
            'Convergence criteria and residuals',
            'Discretisation error $O(h^2)$ and Richardson extrapolation',
            'Neumann boundaries and symmetry planes',
            'Capacitance from charge or from field energy',
          ],
          explanation: `Laplace's equation on a grid of spacing $h$ becomes, with centred second differences, $V_{i+1,j} + V_{i-1,j} + V_{i,j+1} + V_{i,j-1} - 4V_{i,j} = 0$. That is,
$$V_{i,j} = \\tfrac14\\left(V_{i+1,j} + V_{i-1,j} + V_{i,j+1} + V_{i,j-1}\\right),$$
the **discrete mean-value property**. It suggests an algorithm. Fix $V$ on the boundaries and on any conductors, guess the interior, and repeatedly replace each interior value by the average of its neighbours. This is **relaxation**; it converges to the unique discrete solution.

The naive version (**Jacobi**, using only old values) converges painfully slowly. The number of iterations scales as $N^2$ for an $N\\times N$ grid, because information diffuses one cell per sweep. **Gauss-Seidel** uses new values as soon as they are computed and is about twice as fast. **Successive over-relaxation (SOR)** deliberately overshoots, $V \\leftarrow V + \\omega(V_{\\text{GS}} - V)$ with $1 < \\omega < 2$; near the optimum $\\omega \\approx 2/(1 + \\pi/N)$, the iteration count drops to order $N$. In Python, vectorise with **red-black ordering** (update the two checkerboard colours alternately with array slicing), or the loops will dominate. Production codes use multigrid or sparse direct solvers (\`scipy.sparse.linalg.spsolve\` on the assembled matrix is a good cross-check), and the computational-physics subject covers these.

Two kinds of error need watching. The **iteration error** is measured by the residual, the maximum change per sweep or the norm of the discrete Laplacian. Stop when it is far below the discretisation error, not at an arbitrary tolerance. The **discretisation error** is $O(h^2)$ for smooth solutions but worse near corners and sharp conductor edges, where the true field is singular. Halving $h$ and comparing (Richardson extrapolation) tells you how good the answer is. **Validate**: a coaxial geometry has the analytic solution $V \\propto \\ln s$, and the rectangular slot has the series of the previous lesson.

Once $V$ is known, $\\mathbf{E} = -\\nabla V$ by differences, the charge on a conductor comes from Gauss's law around it, and the **capacitance** follows from $Q/\\Delta V$ or from the energy $\\frac{\\epsilon_0}{2}\\int E^2 = \\frac12 C\\Delta V^2$. The two estimates converge differently, which is a useful check. A finite parallel-plate capacitor, a microstrip line or a pair of rods are all geometries with no closed-form answer that you can now solve. Read the relaxation section of Fitzpatrick's computational notes or Schroeder's simulation tutorial, and Feynman II-12 on analogue methods for the history.`,
          resources: [
            {
              title: 'Schroeder — Physics Simulations in Python (relaxation methods)',
              url: 'https://physics.weber.edu/schroeder/scicomp/',
              type: 'textbook',
              cost: 'free',
              provider: 'Weber State University',
              note: 'A short practical tutorial; the Laplace relaxation example is the starting point for this lesson.',
              primary: true,
            },
            {
              title: 'Fitzpatrick — Computational Physics: Poisson\'s equation (lecture notes)',
              url: 'https://farside.ph.utexas.edu/teaching/329/lectures/lectures.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
              note: 'Jacobi, Gauss-Seidel and SOR with convergence analysis.',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 12: Electrostatic Analogs',
              url: 'https://www.feynmanlectures.caltech.edu/II_12.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'The same equation in heat flow, membranes and fluids; the reason relaxation codes are reused everywhere.',
            },
          ],
          exercises: [
            {
              slug: 'relaxation-solver',
              title: 'Write and validate a relaxation solver',
              prompt:
                'Implement Jacobi, Gauss-Seidel (red-black, vectorised) and SOR for Laplace\'s equation on a square grid with Dirichlet boundaries. Validate on the rectangular slot problem against the analytic series. Plot iterations to reach a residual of 1e-8 against $N$ for $N = 32, 64, 128, 256$ for each method, and show the $N^2$ versus $N$ scaling. Find the optimal SOR $\\omega$ empirically for $N = 128$ and compare with $2/(1 + \\pi/N)$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'finite-capacitor',
              title: 'Capacitance of a finite parallel-plate capacitor',
              prompt:
                'Solve for the potential of two finite plates (length $L$, separation $d$, in 2D) held at $\\pm V_0$ inside a large grounded box. Compute the capacitance per unit length from the charge on one plate (via Gauss\'s law on a contour) and from the field energy. Plot $C/C_{\\text{ideal}}$ against $L/d$ for $L/d$ from 1 to 20 and compare with the leading fringing correction $C \\approx \\epsilon_0[L/d + (1/\\pi)\\ln(2\\pi L/d) + \\ldots]$. Check convergence by halving the grid spacing and by enlarging the box.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'coax-validation-and-error',
              title: 'Discretisation error near a corner',
              prompt:
                'Solve for the potential between a square inner conductor and a square outer conductor (square coax), and between circular conductors approximated on the grid. For the circular case compare the capacitance with $2\\pi\\epsilon_0/\\ln(b/a)$ and show the error scales as $h^2$ only if the boundary is represented carefully. For the square case, show that the field near the inner corners diverges as $r^{-1/3}$ and that the capacitance converges more slowly; use Richardson extrapolation to estimate the converged value.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Jacobi iteration converge so slowly on fine grids?',
              answerOutline:
                'Each sweep moves information only one grid cell, so low-frequency error modes decay at a rate of order 1/N^2 per sweep; you need about N^2 sweeps.',
            },
            {
              question: 'How do you know when to stop iterating?',
              answerOutline:
                'When the residual (or change per iteration) is well below the estimated discretisation error, which you estimate by grid refinement.',
            },
            {
              question: 'Why is the discretisation error larger near sharp conductor corners?',
              answerOutline:
                'The exact field is singular at a re-entrant corner, so the Taylor expansion behind the O(h^2) estimate fails; the convergence rate drops.',
            },
          ],
        },
      ],
      project: {
        slug: 'electrostatics-solver',
        title: 'Module project: a 2D electrostatics solver',
        description: `Build a reusable 2D electrostatics package: define conductors (held at potentials or carrying given charges) and fixed charge densities on a grid, solve Poisson's equation by SOR or a sparse direct solver, and return the potential, field, surface charges, capacitance matrix and stored energy. Validate against every analytic result in this module (images, coax, slot, sphere-in-field in an axisymmetric version), then use it on a microstrip transmission line and a model of an electrostatic lens.`,
        deliverables: [
          'A Solver class with geometry definition, SOR and sparse-direct back ends, and field/charge post-processing',
          'A validation notebook reproducing at least four analytic results with convergence plots',
          'The capacitance matrix of a three-conductor system, showing it is symmetric',
          'The characteristic capacitance per length of a microstrip line compared with a published formula',
        ],
        estimatedHours: 10,
        stretchGoals: [
          'Add an axisymmetric (r, z) mode and compute the field of an electrostatic einzel lens, then trace electron trajectories through it',
          'Implement a multigrid V-cycle and compare its scaling with SOR',
        ],
      },
    },
    {
      slug: 'fields-in-matter',
      title: 'Electric Fields in Matter',
      description:
        'How matter responds to fields: atomic and molecular polarisation, bound charge, the displacement field, linear dielectrics and their boundary conditions, and the microscopic origin of the dielectric constant.',
      lessons: [
        {
          slug: 'polarisation-and-bound-charge',
          title: 'Polarisation and bound charge',
          summary:
            'Induced and permanent dipoles, the polarisation density P, and why a polarised material behaves like surface and volume bound charges.',
          estimatedMinutes: 120,
          objectives: [
            'Model induced atomic dipoles with the polarisability $\\alpha$ and estimate it for hydrogen',
            'Explain orientational polarisation of polar molecules and its temperature dependence',
            'Define the polarisation $\\mathbf{P}$ and derive the bound charges $\\sigma_b = \\mathbf{P}\\cdot\\hat{\\mathbf{n}}$, $\\rho_b = -\\nabla\\cdot\\mathbf{P}$',
            'Compute the field of a uniformly polarised sphere and interpret it physically',
          ],
          concepts: [
            'Atomic polarisability $\\mathbf{p} = \\alpha\\mathbf{E}$',
            'Simple model: $\\alpha = 4\\pi\\epsilon_0a^3$',
            'Polar molecules; orientational polarisation $\\langle p\\rangle \\approx p^2E/3k_BT$',
            'Polarisation density $\\mathbf{P}$ (dipole moment per volume)',
            'Bound surface charge $\\sigma_b = \\mathbf{P}\\cdot\\hat{\\mathbf{n}}$',
            'Bound volume charge $\\rho_b = -\\nabla\\cdot\\mathbf{P}$',
            'Uniformly polarised sphere: uniform interior field $-\\mathbf{P}/3\\epsilon_0$',
            'Macroscopic (averaged) field',
          ],
          explanation: `A neutral atom in a field polarises: the electron cloud shifts against the nucleus until the restoring force balances the applied one, giving an induced dipole $\\mathbf{p} = \\alpha\\mathbf{E}$. A crude model treats the atom as a point nucleus inside a uniform sphere of electron charge of radius $a$. The restoring field is then linear in displacement, and $\\alpha = 4\\pi\\epsilon_0a^3$. That has the right order of magnitude: the measured value for hydrogen is $\\alpha/4\\pi\\epsilon_0 = 0.67\\times10^{-30}$ m³. Molecules like water carry **permanent** dipoles that are randomly oriented by thermal motion. A field partially aligns them, giving an average $\\langle p\\rangle \\approx p^2E/3k_BT$ (Langevin-Debye) that falls with temperature. This orientational effect is why water's dielectric constant is 80.

In a material, describe the response by the **polarisation** $\\mathbf{P}$, the dipole moment per unit volume. Add up the potentials of all these dipoles, $V = \\frac{1}{4\\pi\\epsilon_0}\\int\\frac{\\mathbf{P}\\cdot\\hat{\\boldsymbol{\\mathscr{r}}}}{\\mathscr{r}^2}d\\tau'$, and integrate by parts. The result is exactly the potential of two charge distributions:
$$\\sigma_b = \\mathbf{P}\\cdot\\hat{\\mathbf{n}}, \\qquad \\rho_b = -\\nabla\\cdot\\mathbf{P}.$$
These **bound charges** are real accumulations of charge, not a mathematical fiction. Where the polarisation is uniform, the head of each dipole cancels the tail of the next; at the surface, or where $\\mathbf{P}$ varies, the cancellation fails and net charge remains.

The model problem is a **uniformly polarised sphere**. Its bound charge is $\\sigma_b = P\\cos\\theta$ on the surface (no volume charge), and you met exactly this distribution as the induced charge on a conducting sphere in a uniform field. Outside, the field is that of a point dipole $\\mathbf{p} = \\frac43\\pi R^3\\mathbf{P}$. Inside, it is *uniform*, $\\mathbf{E} = -\\mathbf{P}/3\\epsilon_0$, opposing the polarisation (the **depolarising field**).

A subtle point is that the fields here are **macroscopic** averages over regions large compared with atoms, which hides the violent microscopic fields between molecules. That is fine for $\\mathbf{E}$ in Maxwell's equations, but it matters when you ask what field polarises an individual molecule (the Clausius-Mossotti lesson). Read Tong's chapter on electromagnetism in matter (dielectrics), Feynman II-10 and II-11.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 7: Electromagnetism in Matter (dielectrics)',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 10: Dielectrics',
              url: 'https://www.feynmanlectures.caltech.edu/II_10.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 11: Inside Dielectrics',
              url: 'https://www.feynmanlectures.caltech.edu/II_11.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Molecular dipoles, polar molecules, the local field and Clausius-Mossotti.',
            },
            {
              title: 'HyperPhysics — Dielectrics',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/electric/dielec.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
          ],
          exercises: [
            {
              slug: 'bound-charge-derivation',
              title: 'Derive the bound charges',
              prompt:
                'Starting from the potential of a continuous dipole distribution, use $\\nabla\'(1/\\mathscr{r}) = \\hat{\\boldsymbol{\\mathscr{r}}}/\\mathscr{r}^2$ and the divergence theorem to derive $\\sigma_b = \\mathbf{P}\\cdot\\hat{\\mathbf{n}}$ and $\\rho_b = -\\nabla\\cdot\\mathbf{P}$. Check that the total bound charge of any finite polarised object is zero. Then give a physical argument for $\\rho_b = -\\nabla\\cdot\\mathbf{P}$ by counting dipoles crossing the faces of a small cube.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'polarised-sphere-and-cylinder',
              title: 'Uniformly polarised sphere and cylinder',
              prompt:
                'Find the field inside and outside a uniformly polarised sphere (use the Legendre solution with $\\sigma_b = P\\cos\\theta$, or superpose two uniformly charged spheres displaced slightly). Repeat for a long cylinder polarised perpendicular to its axis (interior field $-\\mathbf{P}/2\\epsilon_0$) and for a thin slab polarised normal to its faces ($-\\mathbf{P}/\\epsilon_0$). Tabulate the depolarisation factors 1/3, 1/2, 1 and explain why they sum to 1 over three axes for an ellipsoid.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'polarisability-estimates',
              title: 'Polarisabilities and orientational response',
              prompt:
                'Derive $\\alpha = 4\\pi\\epsilon_0a^3$ in the uniform-cloud model and evaluate it for hydrogen with $a$ equal to the Bohr radius. Compare with the measured value. For water ($p = 6.2\\times10^{-30}$ C m), compute the orientational polarisability $p^2/3k_BT$ at 300 K and compare it with the induced polarisability (about $1.6\\times10^{-40}$ C m²/V). Estimate the field needed to align water molecules substantially, and comment on whether it is achievable.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Where do bound charges appear in a polarised material?',
              answerOutline:
                'On surfaces where P has a normal component (sigma_b = P dot n) and in the bulk wherever P is non-uniform (rho_b = -div P).',
            },
            {
              question: 'Why does the field inside a uniformly polarised sphere point opposite to P?',
              answerOutline:
                'The bound surface charge is positive on the side P points to and negative on the other; their field inside runs from + to -, i.e. opposite to P.',
            },
            {
              question: 'Why does orientational polarisation decrease with temperature while induced polarisation does not?',
              answerOutline:
                'Thermal agitation randomises permanent dipole orientations (Boltzmann factor), giving p^2 E/3 k_B T; induced dipoles come from electron-cloud distortion, which is essentially temperature-independent.',
            },
          ],
        },
        {
          slug: 'the-displacement-field-and-linear-dielectrics',
          title: 'The displacement field and linear dielectrics',
          summary:
            'Separating free from bound charge with D, linear media with permittivity epsilon, boundary conditions at interfaces, and dielectric-filled capacitors.',
          estimatedMinutes: 120,
          objectives: [
            'Define $\\mathbf{D} = \\epsilon_0\\mathbf{E} + \\mathbf{P}$ and derive Gauss\'s law $\\nabla\\cdot\\mathbf{D} = \\rho_f$',
            'Explain why $\\mathbf{D}$ is not determined by free charge alone and when it can be found from Gauss\'s law',
            'Use linear constitutive relations $\\mathbf{P} = \\epsilon_0\\chi_e\\mathbf{E}$, $\\mathbf{D} = \\epsilon\\mathbf{E}$ to solve problems with dielectrics',
            'Apply the boundary conditions at a dielectric interface, including field-line refraction and a dielectric sphere in a uniform field',
          ],
          concepts: [
            'Displacement $\\mathbf{D} = \\epsilon_0\\mathbf{E} + \\mathbf{P}$',
            '$\\nabla\\cdot\\mathbf{D} = \\rho_f$; $\\oint\\mathbf{D}\\cdot d\\mathbf{a} = Q_{f,\\text{enc}}$',
            '$\\nabla\\times\\mathbf{D}$ need not vanish',
            'Susceptibility $\\chi_e$, permittivity $\\epsilon = \\epsilon_0(1 + \\chi_e)$, dielectric constant $\\epsilon_r$',
            'Boundary conditions: $D_\\perp$ jumps by $\\sigma_f$, $E_\\parallel$ continuous',
            'Refraction of field lines $\\tan\\theta_1/\\tan\\theta_2 = \\epsilon_1/\\epsilon_2$',
            'Capacitor with dielectric: $C = \\epsilon_rC_0$',
            'Dielectric sphere in a uniform field',
          ],
          explanation: `Gauss's law involves all charge, $\\epsilon_0\\nabla\\cdot\\mathbf{E} = \\rho_f + \\rho_b = \\rho_f - \\nabla\\cdot\\mathbf{P}$. Moving the bound charge to the left defines the **electric displacement**
$$\\mathbf{D} = \\epsilon_0\\mathbf{E} + \\mathbf{P}, \\qquad \\nabla\\cdot\\mathbf{D} = \\rho_f.$$
Its divergence depends only on the **free charge**, the charge you put there. That is convenient, but be careful: $\\mathbf{D}$ is not determined by $\\rho_f$ alone, because $\\nabla\\times\\mathbf{D} = \\nabla\\times\\mathbf{P}$ need not vanish. Gauss's law for $\\mathbf{D}$ finds $\\mathbf{D}$ only under the same symmetry conditions as before, and only if the dielectric boundaries respect that symmetry. A dielectric cube in a uniform field breaks it, and there the integral form tells you nothing useful.

Most materials are **linear** at ordinary fields: $\\mathbf{P} = \\epsilon_0\\chi_e\\mathbf{E}$ with **electric susceptibility** $\\chi_e$. Then $\\mathbf{D} = \\epsilon\\mathbf{E}$ with $\\epsilon = \\epsilon_0(1 + \\chi_e) = \\epsilon_0\\epsilon_r$. In a region filled uniformly with a linear dielectric, every electrostatic result carries over with $\\epsilon_0 \\to \\epsilon$: the field of a free charge is reduced by $\\epsilon_r$ (partially screened by bound charge), and a capacitor filled with dielectric has $C = \\epsilon_rC_0$. Typical values of $\\epsilon_r$ are 1.0006 for air, about 2-10 for plastics and glass, 80 for water, and thousands for ferroelectric ceramics.

At an **interface** between dielectrics, a Gaussian pillbox gives $D_{1\\perp} - D_{2\\perp} = \\sigma_f$, and a thin rectangular loop (using $\\nabla\\times\\mathbf{E} = 0$) gives $\\mathbf{E}_{1\\parallel} = \\mathbf{E}_{2\\parallel}$. With no free surface charge, the field lines bend as $\\tan\\theta_1/\\tan\\theta_2 = \\epsilon_1/\\epsilon_2$, the electrostatic analogue of refraction. The model boundary-value problem is a **dielectric sphere in a uniform field**. The Legendre solution with these boundary conditions gives a uniform interior field $\\mathbf{E}_{\\text{in}} = \\frac{3}{\\epsilon_r + 2}\\mathbf{E}_0$ and an exterior dipole $p = 4\\pi\\epsilon_0\\frac{\\epsilon_r - 1}{\\epsilon_r + 2}R^3E_0$. The factor $(\\epsilon_r - 1)/(\\epsilon_r + 2)$ returns in the next lesson and again in light scattering.

A practical warning: inserting a dielectric into a capacitor at fixed *charge* lowers the energy and pulls the slab in; at fixed *voltage* the battery does work too, and the force is the same but the energy bookkeeping differs. Read Tong's dielectrics section and Feynman II-10.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 7: Dielectrics and the displacement field',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 10: Dielectrics',
              url: 'https://www.feynmanlectures.caltech.edu/II_10.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — 8.4-8.5: Capacitor with a Dielectric; Molecular Model of a Dielectric',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/8-1-capacitors-and-capacitance',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'Ellingson — Electromagnetics I (open textbook): electrostatics in media',
              url: 'https://phys.libretexts.org/Bookshelves/Electricity_and_Magnetism/Electromagnetics_I_(Ellingson)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts Physics',
              note: 'An engineering perspective on permittivity, boundary conditions and capacitors.',
            },
          ],
          exercises: [
            {
              slug: 'dielectric-sphere-uniform-field',
              title: 'Dielectric sphere in a uniform field',
              prompt:
                'Solve for the potential inside and outside a linear dielectric sphere ($\\epsilon_r$) in a uniform field $E_0\\hat{\\mathbf{z}}$ using the Legendre expansion and the two interface conditions. Show $\\mathbf{E}_{\\text{in}} = 3\\mathbf{E}_0/(\\epsilon_r + 2)$, find $\\mathbf{P}$ and the bound surface charge, and check the limit $\\epsilon_r \\to \\infty$ reproduces the conducting sphere. Repeat for a spherical cavity in an infinite dielectric.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'dielectric-relaxation-solver',
              title: 'Add dielectrics to your relaxation solver',
              prompt:
                'Generalise your relaxation code to solve $\\nabla\\cdot(\\epsilon\\nabla V) = -\\rho_f$ with spatially varying $\\epsilon$, using face-averaged permittivities in the stencil. Validate it on a parallel-plate capacitor half-filled with dielectric (two cases: slab parallel to the plates and slab perpendicular to them, with analytic series and parallel capacitances). Then compute the field around a dielectric cylinder in a uniform field and compare its interior field with the analytic $2E_0/(\\epsilon_r + 1)$.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'slab-force',
              title: 'Force on a dielectric slab',
              prompt:
                'A dielectric slab is partly inserted into a parallel-plate capacitor (plates $w$ wide, gap $d$). Compute the capacitance as a function of insertion depth $x$, and the force on the slab (a) at fixed charge and (b) at fixed voltage, using energy methods. Show the forces are equal. Explain physically, using the fringing field at the edge of the plates, why there is a force along $x$ at all.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can you not always find D from Gauss\'s law with free charge, even with a symmetric free-charge distribution?',
              answerOutline:
                'D has a curl equal to curl P, which need not vanish; the symmetry argument needs the whole configuration (including dielectric boundaries) to be symmetric.',
            },
            {
              question: 'State the boundary conditions at a dielectric interface.',
              answerOutline:
                'D_perp jumps by the free surface charge; E_parallel is continuous (equivalently V is continuous).',
            },
            {
              question: 'Why does a dielectric reduce the field of a free charge embedded in it?',
              answerOutline:
                'The material polarises, and the bound charge that accumulates around the free charge has the opposite sign, partially screening it by the factor epsilon_r.',
            },
          ],
        },
        {
          slug: 'microscopic-models-and-frequency-dependence',
          title: 'Microscopic models: Clausius-Mossotti and frequency dependence',
          summary:
            'Connecting molecular polarisability to the dielectric constant through the local field, and the oscillator model that makes epsilon depend on frequency.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the Clausius-Mossotti relation $\\frac{\\epsilon_r - 1}{\\epsilon_r + 2} = \\frac{N\\alpha}{3\\epsilon_0}$ using the Lorentz local field',
            'Test it against data for gases and liquids and explain where it fails',
            'Model bound electrons as damped driven oscillators to obtain a complex, frequency-dependent $\\epsilon(\\omega)$',
            'Relate the real and imaginary parts of $\\epsilon(\\omega)$ to dispersion and absorption, and preview the refractive index of glass',
          ],
          concepts: [
            'Local (Lorentz) field $\\mathbf{E}_{\\text{loc}} = \\mathbf{E} + \\mathbf{P}/3\\epsilon_0$',
            'Clausius-Mossotti / Lorentz-Lorenz relation',
            'Dilute limit $\\epsilon_r - 1 \\approx N\\alpha/\\epsilon_0$',
            'Electron oscillator model: $m\\ddot x + m\\gamma\\dot x + m\\omega_0^2x = -eE$',
            'Complex susceptibility $\\chi(\\omega) = \\frac{Ne^2/m\\epsilon_0}{\\omega_0^2 - \\omega^2 - i\\gamma\\omega}$',
            'Normal and anomalous dispersion',
            'Absorption from $\\mathrm{Im}\\,\\epsilon$',
            'Debye relaxation for polar molecules (qualitative)',
          ],
          explanation: `The dielectric constant should follow from molecular polarisability, $\\mathbf{P} = N\\alpha\\mathbf{E}_{\\text{loc}}$, where $N$ is the number density. The subtlety is which field polarises a molecule. It is not the macroscopic $\\mathbf{E}$, because that average includes the molecule's own contribution. Lorentz's argument removes a small sphere around the molecule. The rest of the material acts on it as a uniformly polarised medium with a spherical hole, contributing $+\\mathbf{P}/3\\epsilon_0$, the negative of the uniformly-polarised-sphere result. For cubic symmetry or random arrangements, the neighbours inside the sphere contribute zero on average. So $\\mathbf{E}_{\\text{loc}} = \\mathbf{E} + \\mathbf{P}/3\\epsilon_0$, and solving self-consistently gives the **Clausius-Mossotti relation**
$$\\frac{\\epsilon_r - 1}{\\epsilon_r + 2} = \\frac{N\\alpha}{3\\epsilon_0}.$$
For dilute gases it reduces to $\\epsilon_r - 1 \\approx N\\alpha/\\epsilon_0$. It works remarkably well for non-polar gases and liquids, linking a gas's $\\epsilon_r$ to the same molecule's in liquid form. It fails for strongly polar liquids like water, where molecular correlations matter. Written for optical frequencies with $\\epsilon_r = n^2$, it is the Lorentz-Lorenz formula for the refractive index.

Now make the field oscillate. Model each bound electron as a damped oscillator with natural frequency $\\omega_0$, the same equation as the first module of waves-optics: $m\\ddot x + m\\gamma\\dot x + m\\omega_0^2x = -eE_0e^{-i\\omega t}$. The induced dipole follows with the complex response function, so in the dilute limit
$$\\epsilon_r(\\omega) = 1 + \\frac{Ne^2}{m\\epsilon_0}\\sum_j\\frac{f_j}{\\omega_j^2 - \\omega^2 - i\\gamma_j\\omega},$$
summing over resonances with oscillator strengths $f_j$. The real part rises slowly with frequency below a resonance (**normal dispersion**: blue light bends more in glass) and falls through it (**anomalous dispersion**). The imaginary part, a Lorentzian peaked at $\\omega_j$, is **absorption**. Glass is transparent in the visible because its electronic resonances are in the ultraviolet and its vibrational ones in the infrared. Polar molecules add a slower **Debye relaxation** with a characteristic time of about 10 ps for water. That is why microwave ovens work at 2.45 GHz, where water's $\\mathrm{Im}\\,\\epsilon$ is large.

The causal structure of $\\epsilon(\\omega)$, with poles only in the lower half-plane, links its real and imaginary parts through the Kramers-Kronig relations, a deep consequence of the fact that a material cannot respond before it is pushed. Read Feynman II-11 and II-32 and Tong's section on dielectric response; module 6 uses $\\epsilon(\\omega)$ to propagate waves in matter.`,
          resources: [
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 11: Inside Dielectrics',
              url: 'https://www.feynmanlectures.caltech.edu/II_11.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 32: Refractive Index of Dense Materials',
              url: 'https://www.feynmanlectures.caltech.edu/II_32.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'The oscillator model of the refractive index, absorption, and the Lorentz-Lorenz formula.',
            },
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 7: Dispersion and the dielectric response',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              note: 'Includes the Drude model and the Kramers-Kronig relations.',
            },
          ],
          exercises: [
            {
              slug: 'clausius-mossotti-derivation',
              title: 'Derive and test Clausius-Mossotti',
              prompt:
                'Derive the Lorentz local field and the Clausius-Mossotti relation. Using tabulated data (polarisability volume of argon $1.64\\times10^{-30}$ m³; liquid argon density 1.40 g/cm³), predict $\\epsilon_r$ for argon gas at STP and for liquid argon and compare with measured values (1.000517 and about 1.53). Then attempt water ($\\alpha/4\\pi\\epsilon_0 \\approx 1.47\\times10^{-30}$ m³, $N = 3.3\\times10^{28}$ m$^{-3}$) and explain the spectacular failure.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'oscillator-model-dispersion',
              title: 'Dispersion and absorption from the oscillator model',
              prompt:
                'Implement $\\epsilon_r(\\omega)$ for a medium with two resonances (one in the UV at 10 eV and one in the IR at 0.1 eV) with chosen strengths and damping. Plot $\\mathrm{Re}\\,\\epsilon$ and $\\mathrm{Im}\\,\\epsilon$ from 1 meV to 30 eV on a log axis, and the refractive index $n = \\mathrm{Re}\\sqrt{\\epsilon_r}$ across the visible. Fit the UV resonance parameters to reproduce the Sellmeier-type dispersion of BK7 glass ($n = 1.5168$ at 587.6 nm, Abbe number 64.2). Verify the Kramers-Kronig relation numerically by computing $\\mathrm{Re}\\,\\epsilon$ from $\\mathrm{Im}\\,\\epsilon$ with a principal-value integral.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'microwave-heating',
              title: 'Why microwave ovens heat water',
              prompt:
                'Use the Debye model $\\epsilon_r(\\omega) = \\epsilon_\\infty + (\\epsilon_s - \\epsilon_\\infty)/(1 - i\\omega\\tau)$ with $\\epsilon_s = 78$, $\\epsilon_\\infty = 5$, $\\tau = 8.3$ ps for water at 25 C. Plot the real and imaginary parts from 100 MHz to 1 THz, find the frequency of maximum loss, and compute the power absorbed per unit volume, $\\frac12\\omega\\epsilon_0\\,\\mathrm{Im}\\,\\epsilon_r\\,E_0^2$, at 2.45 GHz for $E_0 = 1$ kV/m. Explain why ovens do not operate at the loss peak.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the local field acting on a molecule different from the macroscopic field?',
              answerOutline:
                'The macroscopic field is an average that includes the molecule\'s own field; removing its own contribution (Lorentz sphere) leaves E + P/3 epsilon_0 for isotropic or cubic surroundings.',
            },
            {
              question: 'What do the real and imaginary parts of epsilon(omega) describe physically?',
              answerOutline:
                'The real part sets the phase velocity and refraction (dispersion); the imaginary part describes absorption (energy dissipated in the medium).',
            },
            {
              question: 'Why is glass transparent in the visible but opaque in the ultraviolet?',
              answerOutline:
                'Its electronic resonances lie in the UV, where Im(epsilon) is large; in the visible we are below resonance, with small absorption and normal dispersion.',
            },
          ],
        },
      ],
    },
    {
      slug: 'magnetostatics',
      title: 'Magnetostatics',
      description:
        'Steady currents and the fields they make: the Lorentz force, Biot-Savart and Ampere\'s laws, the vector potential, magnetic dipoles, and magnetic fields in matter.',
      lessons: [
        {
          slug: 'the-lorentz-force-and-currents',
          title: 'The Lorentz force and currents',
          summary:
            'How magnetic fields act on moving charges and currents, why they do no work, and the motion of charged particles in uniform and crossed fields.',
          estimatedMinutes: 120,
          objectives: [
            'State the Lorentz force law and show that magnetic forces do no work',
            'Solve the motion of a charge in a uniform $\\mathbf{B}$ (cyclotron motion) and in crossed $\\mathbf{E}$ and $\\mathbf{B}$ (E x B drift)',
            'Define current, surface current and volume current densities, and the continuity equation',
            'Compute forces on current-carrying wires and loops',
          ],
          concepts: [
            'Lorentz force $\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})$',
            'Magnetic force does no work',
            'Cyclotron frequency $\\omega_c = qB/m$; Larmor radius',
            '$\\mathbf{E}\\times\\mathbf{B}$ drift velocity $\\mathbf{E}\\times\\mathbf{B}/B^2$',
            'Current $I$, surface current $\\mathbf{K}$, volume current $\\mathbf{J}$',
            'Continuity equation $\\nabla\\cdot\\mathbf{J} = -\\partial\\rho/\\partial t$',
            'Force on a wire $\\int I\\,d\\mathbf{l}\\times\\mathbf{B}$',
            'Steady currents: $\\nabla\\cdot\\mathbf{J} = 0$',
          ],
          explanation: `A charge moving with velocity $\\mathbf{v}$ feels the **Lorentz force** $\\mathbf{F} = q(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})$. The magnetic part is always perpendicular to the velocity, so it **does no work**: it can bend trajectories but never change a particle's speed. This fact has odd-looking consequences, such as a magnet lifting a paperclip without doing work. (The work there is done by the electric forces inside the magnet and the clip; Griffiths and Tong both discuss this.)

In a uniform field $\\mathbf{B}$ a charge spirals. Its velocity perpendicular to the field rotates at the **cyclotron frequency** $\\omega_c = qB/m$, independent of speed, on a circle of radius $r = mv_\\perp/qB$. Its parallel velocity is unaffected. Independence from speed is what made the cyclotron work (until relativity broke it) and is how mass spectrometers and Penning traps measure masses. Add a perpendicular electric field and the guiding centre **drifts** at $\\mathbf{v}_d = \\mathbf{E}\\times\\mathbf{B}/B^2$, independent of charge and mass. The trajectory is a cycloid. In a frame moving at $\\mathbf{v}_d$ the electric field disappears, a first hint that $\\mathbf{E}$ and $\\mathbf{B}$ are frame-dependent parts of one object (module 7).

Charges in motion form **currents**. The current $I$ is charge per time through a wire, the surface current density $\\mathbf{K}$ is current per unit width, and the volume current density $\\mathbf{J} = \\rho\\mathbf{v}$ is current per unit area. Local charge conservation is the **continuity equation** $\\nabla\\cdot\\mathbf{J} + \\partial_t\\rho = 0$. **Magnetostatics** is the regime of steady currents, $\\nabla\\cdot\\mathbf{J} = 0$, where nothing piles up. That is a different idealisation from electrostatics, and a point charge moving uniformly is *not* magnetostatic.

The force on a current element follows by summing over the moving charges: $d\\mathbf{F} = I\\,d\\mathbf{l}\\times\\mathbf{B}$. A closed loop in a uniform field feels no net force but does feel a torque (the magnetic dipole lesson). Two parallel wires carrying currents in the same direction attract with force per length $\\mu_0I_1I_2/2\\pi d$; this relation once defined the ampere. Read Tong's magnetostatics chapter introduction, OpenStax Vol. 2 chapter 11, and Feynman II-13.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 3: Magnetostatics',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 11: Magnetic Forces and Fields',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/11-1-magnetism-and-its-historical-discoveries',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 13: Magnetostatics',
              url: 'https://www.feynmanlectures.caltech.edu/II_13.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Section 13-6 shows that magnetism is a relativistic effect of electric forces between moving charges.',
            },
            {
              title: 'HyperPhysics — Magnetic field and force',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/magnetic/magfie.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
          ],
          exercises: [
            {
              slug: 'charge-in-fields-simulation',
              title: 'Simulate charged particles in E and B fields',
              prompt:
                'Implement the Boris pusher, the standard plasma-physics integrator for the Lorentz force. Simulate (a) cyclotron motion in uniform $\\mathbf{B}$, checking that the period is $2\\pi m/qB$ and the speed is conserved to machine precision over $10^5$ orbits; (b) crossed fields, measuring the drift velocity against $E/B$; (c) a magnetic bottle with $B_z$ increasing away from the centre, showing mirror reflection. Compare the Boris pusher with RK4 on energy conservation in (a).',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'cycloid-analytic',
              title: 'Cycloid motion in crossed fields, analytically',
              prompt:
                'A charge starts from rest at the origin in $\\mathbf{E} = E\\hat{\\mathbf{z}}$ and $\\mathbf{B} = B\\hat{\\mathbf{x}}$. Solve the equations of motion exactly using the complex variable $w = y + iz$, show the trajectory is a cycloid, and find the maximum height and the drift speed. Then transform to a frame moving at $\\mathbf{E}\\times\\mathbf{B}/B^2$ and show (for $E \\ll cB$) that the motion becomes pure circular motion.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'mass-spectrometer',
              title: 'Design a mass spectrometer',
              prompt:
                'Ions accelerated through 2 kV enter a 0.5 T field. Compute the radius for singly charged ${}^{12}$C, ${}^{13}$C and ${}^{14}$C and the separation of their impact points after a semicircle. What field is needed to separate ${}^{14}$N$^+$ from ${}^{14}$C$^+$ (mass difference about 1.7e-4 u) by 0.1 mm, and why do real radiocarbon labs use accelerators instead?',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a static magnetic field never change a charged particle\'s kinetic energy?',
              answerOutline:
                'The force q v x B is perpendicular to v, so its power F dot v is zero.',
            },
            {
              question: 'What is the E x B drift and why is it independent of the charge?',
              answerOutline:
                'The guiding centre moves at E x B/B^2; in the frame moving at that speed the electric field vanishes, so all particles drift together regardless of q and m.',
            },
            {
              question: 'What does the continuity equation express, and what does it reduce to in magnetostatics?',
              answerOutline:
                'Local charge conservation, div J = -d rho/dt; in magnetostatics charge density does not change, so div J = 0.',
            },
          ],
        },
        {
          slug: 'biot-savart-and-amperes-law',
          title: 'The Biot-Savart law and Ampere\'s law',
          summary:
            'Computing B from steady currents by direct integration and by Ampere\'s law, the divergence and curl of B, and the fields of wires, loops, solenoids and toroids.',
          estimatedMinutes: 150,
          objectives: [
            'Use the Biot-Savart law to compute $\\mathbf{B}$ for straight wires, circular loops and helices',
            'Derive $\\nabla\\cdot\\mathbf{B} = 0$ and $\\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J}$ from Biot-Savart',
            'Apply Ampere\'s law to wires, solenoids, toroids and current sheets',
            'Compute the field of arbitrary current paths numerically and verify Ampere\'s law around loops',
          ],
          concepts: [
            'Biot-Savart law $\\mathbf{B} = \\frac{\\mu_0}{4\\pi}\\int\\frac{I\\,d\\mathbf{l}\\times\\hat{\\boldsymbol{\\mathscr{r}}}}{\\mathscr{r}^2}$',
            'Field of an infinite wire $\\mu_0I/2\\pi s$',
            'Field on the axis of a loop',
            '$\\nabla\\cdot\\mathbf{B} = 0$: no magnetic monopoles',
            'Ampere\'s law $\\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J}$, $\\oint\\mathbf{B}\\cdot d\\mathbf{l} = \\mu_0I_{\\text{enc}}$',
            'Solenoid $B = \\mu_0nI$; toroid',
            'Boundary conditions: $B_\\perp$ continuous, $B_\\parallel$ jumps by $\\mu_0K$',
            'Helmholtz coils',
          ],
          explanation: `The magnetic analogue of Coulomb's law is the **Biot-Savart law**: a steady current produces
$$\\mathbf{B}(\\mathbf{r}) = \\frac{\\mu_0}{4\\pi}\\int\\frac{\\mathbf{J}(\\mathbf{r}')\\times\\hat{\\boldsymbol{\\mathscr{r}}}}{\\mathscr{r}^2}d\\tau',$$
or with $I\\,d\\mathbf{l}'$ for a wire. It is again an inverse-square law, but the cross product makes the field circulate around currents rather than point away from them. Standard results to derive: an infinite straight wire, $B = \\mu_0I/2\\pi s$, circling the wire by the right-hand rule; a finite segment; and a circular loop on its axis, $B = \\frac{\\mu_0IR^2}{2(R^2 + z^2)^{3/2}}$. Two coaxial loops separated by their radius (**Helmholtz coils**) give a region of remarkably uniform field, used to cancel Earth's field in labs.

Taking the divergence and curl of the Biot-Savart integral gives the differential laws of magnetostatics:
$$\\nabla\\cdot\\mathbf{B} = 0, \\qquad \\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J}.$$
The first says there are no magnetic charges: field lines never end, and the flux through any closed surface is zero. The second, **Ampere's law**, in integral form $\\oint\\mathbf{B}\\cdot d\\mathbf{l} = \\mu_0I_{\\text{enc}}$, plays the role of Gauss's law. It always holds for steady currents but only determines $\\mathbf{B}$ when symmetry makes the field constant along a suitable loop: infinite wires and cylinders, infinite planes of current ($B = \\mu_0K/2$), long **solenoids** ($B = \\mu_0nI$ inside, zero outside) and **toroids** ($B = \\mu_0NI/2\\pi s$ inside). Ampere's law cannot be applied to a finite segment of wire. A segment cannot carry a steady current on its own, which is exactly the inconsistency Maxwell's displacement current (module 6) resolves.

Across a surface current $\\mathbf{K}$, the normal component of $\\mathbf{B}$ is continuous and the tangential component jumps by $\\mu_0\\mathbf{K}\\times\\hat{\\mathbf{n}}$, the analogue of the $\\sigma/\\epsilon_0$ jump in $\\mathbf{E}$.

Numerically, discretise any wire path into short segments and sum the Biot-Savart contributions, vectorised as before. This is how coil designers compute fields, and it lets you check Ampere's law by computing line integrals around loops that link the current zero, one or several times. Read Tong's Ampere and Biot-Savart sections, OpenStax Vol. 2 chapter 12 and Feynman II-13 and II-14.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 3: Ampere\'s law and the Biot-Savart law',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 12: Sources of Magnetic Fields',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/12-1-the-biot-savart-law',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 14: The Magnetic Field in Various Situations',
              url: 'https://www.feynmanlectures.caltech.edu/II_14.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'MIT 8.02 Physics II (Spring 2007) — course notes on sources of magnetic fields',
              url: 'https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'loop-and-helmholtz',
              title: 'Field of a loop and Helmholtz coils',
              prompt:
                'Derive the on-axis field of a circular loop from Biot-Savart. For two coaxial loops of radius $R$ separated by $d$, show that $d^2B_z/dz^2 = 0$ at the midpoint when $d = R$ (Helmholtz condition). Then compute the full off-axis field numerically (discretise each loop into 500 segments) and plot the region where $B$ is uniform to 1% for $d = R$, $d = 0.8R$ and $d = 1.2R$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'curl-and-divergence-of-b',
              title: 'Derive the differential laws from Biot-Savart',
              prompt:
                'Starting from the Biot-Savart integral for a volume current, show that $\\nabla\\cdot\\mathbf{B} = 0$ identically and that $\\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J}$ provided $\\nabla\\cdot\\mathbf{J} = 0$ and the currents are localised. Identify precisely where the steady-current assumption enters. Then apply Ampere\'s law to (a) a thick wire with $J \\propto s$, (b) a solenoid, including a careful argument that the field outside is zero, and (c) a toroid of rectangular cross-section.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'numerical-ampere-check',
              title: 'Ampere\'s law around linked loops',
              prompt:
                'Compute $\\mathbf{B}$ numerically for a closed current loop of irregular shape (e.g. a trefoil knot or a tilted ellipse). Evaluate $\\oint\\mathbf{B}\\cdot d\\mathbf{l}$ around three test loops: one that does not link the current, one that links it once, one that winds around it twice. Confirm the results are $0$, $\\mu_0I$ and $2\\mu_0I$ to quadrature accuracy and are independent of the test loop\'s shape.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does div B = 0 mean physically?',
              answerOutline:
                'There are no magnetic monopoles: magnetic field lines have no sources or sinks and the net flux through any closed surface is zero.',
            },
            {
              question: 'Why is the field outside an ideal long solenoid zero?',
              answerOutline:
                'Ampere loops outside enclose zero net current, and symmetry plus the field vanishing far away force B_outside = 0; a rectangular loop straddling the winding then gives B = mu_0 n I inside.',
            },
            {
              question: 'State the boundary conditions on B across a surface current.',
              answerOutline:
                'The normal component is continuous; the tangential component jumps by mu_0 K (direction K x n).',
            },
          ],
        },
        {
          slug: 'vector-potential-and-magnetic-dipoles',
          title: 'The vector potential and magnetic dipoles',
          summary:
            'Writing B as the curl of A, the Coulomb gauge, the multipole expansion for currents, and the magnetic dipole moment with its torque and energy.',
          estimatedMinutes: 120,
          objectives: [
            'Introduce $\\mathbf{A}$ with $\\mathbf{B} = \\nabla\\times\\mathbf{A}$, explain gauge freedom and impose the Coulomb gauge',
            'Derive $\\nabla^2\\mathbf{A} = -\\mu_0\\mathbf{J}$ and the integral solution, and compute $\\mathbf{A}$ for a solenoid',
            'Derive the multipole expansion for $\\mathbf{A}$ and show the leading term is the magnetic dipole with moment $\\mathbf{m} = I\\mathbf{a}$',
            'Compute torque, force and energy of a magnetic dipole and relate $\\mathbf{m}$ to angular momentum',
          ],
          concepts: [
            'Vector potential $\\mathbf{B} = \\nabla\\times\\mathbf{A}$',
            'Gauge freedom $\\mathbf{A} \\to \\mathbf{A} + \\nabla\\lambda$; Coulomb gauge $\\nabla\\cdot\\mathbf{A} = 0$',
            '$\\mathbf{A} = \\frac{\\mu_0}{4\\pi}\\int\\frac{\\mathbf{J}}{\\mathscr{r}}d\\tau\'$',
            'Flux $\\Phi = \\oint\\mathbf{A}\\cdot d\\mathbf{l}$',
            'No magnetic monopole term',
            'Magnetic dipole $\\mathbf{m} = I\\int d\\mathbf{a}$; field identical in form to the electric dipole',
            'Torque $\\mathbf{m}\\times\\mathbf{B}$, energy $-\\mathbf{m}\\cdot\\mathbf{B}$, force $\\nabla(\\mathbf{m}\\cdot\\mathbf{B})$',
            'Gyromagnetic ratio $\\mathbf{m} = \\frac{q}{2m}\\mathbf{L}$; Larmor precession',
          ],
          explanation: `Since $\\nabla\\cdot\\mathbf{B} = 0$, $\\mathbf{B}$ is the curl of a **vector potential**: $\\mathbf{B} = \\nabla\\times\\mathbf{A}$. Only the curl of $\\mathbf{A}$ is fixed, so $\\mathbf{A} \\to \\mathbf{A} + \\nabla\\lambda$ leaves $\\mathbf{B}$ unchanged. This is **gauge freedom**, the vector version of adding a constant to $V$. Use it to impose the **Coulomb gauge** $\\nabla\\cdot\\mathbf{A} = 0$. Ampere's law then becomes three copies of Poisson's equation, $\\nabla^2\\mathbf{A} = -\\mu_0\\mathbf{J}$, with the solution
$$\\mathbf{A}(\\mathbf{r}) = \\frac{\\mu_0}{4\\pi}\\int\\frac{\\mathbf{J}(\\mathbf{r}')}{\\mathscr{r}}d\\tau'.$$
Everything you learned about solving Poisson's equation now applies component by component. By Stokes' theorem the line integral of $\\mathbf{A}$ around a loop is the magnetic flux through it, $\\oint\\mathbf{A}\\cdot d\\mathbf{l} = \\Phi$. For an ideal solenoid this means $\\mathbf{A}$ is nonzero *outside*, where $\\mathbf{B} = 0$: $A_\\phi = \\Phi/2\\pi s$. Classically that looks like an artefact. In quantum mechanics it produces the measurable Aharonov-Bohm phase, which is the first evidence that potentials are more fundamental than they look.

Expanding $1/\\mathscr{r}$ for a localised current loop gives the **magnetic multipole expansion**. The monopole term $\\oint d\\mathbf{l}'$ vanishes identically, since there are no magnetic charges. The leading term is the **magnetic dipole**, with moment $\\mathbf{m} = I\\int d\\mathbf{a} = I\\mathbf{a}$ (current times vector area), giving
$$\\mathbf{A} = \\frac{\\mu_0}{4\\pi}\\frac{\\mathbf{m}\\times\\hat{\\mathbf{r}}}{r^2}, \\qquad \\mathbf{B} = \\frac{\\mu_0}{4\\pi r^3}\\left[3(\\mathbf{m}\\cdot\\hat{\\mathbf{r}})\\hat{\\mathbf{r}} - \\mathbf{m}\\right].$$
Far away this has exactly the form of the electric dipole field; up close the two differ (inside a current loop the field points along $\\mathbf{m}$). In a uniform field a magnetic dipole feels torque $\\mathbf{m}\\times\\mathbf{B}$ and has energy $-\\mathbf{m}\\cdot\\mathbf{B}$. In a non-uniform field it feels a force $\\nabla(\\mathbf{m}\\cdot\\mathbf{B})$, the basis of the Stern-Gerlach experiment.

For an orbiting charge, $\\mathbf{m} = \\frac{q}{2m}\\mathbf{L}$. A torque on $\\mathbf{m}$ therefore changes $\\mathbf{L}$, so a magnetic moment in a field **precesses** like a gyroscope at the Larmor frequency $\\omega_L = qB/2m$, the classical basis of NMR and MRI (electron spin has twice this ratio, $g \\approx 2$, a quantum effect). Read Tong's vector potential and magnetic dipole sections and Feynman II-14 and II-15.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 3: The vector potential and magnetic dipoles',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 15: The Vector Potential',
              url: 'https://www.feynmanlectures.caltech.edu/II_15.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Section 15-5 is Feynman\'s famous discussion of the Aharonov-Bohm effect and the reality of A.',
            },
            {
              title: 'Fitzpatrick — Classical Electromagnetism: magnetostatics and the vector potential',
              url: 'https://farside.ph.utexas.edu/teaching/em/lectures/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
            },
          ],
          exercises: [
            {
              slug: 'solenoid-vector-potential',
              title: 'Vector potential of a solenoid and of a uniform field',
              prompt:
                'Find $\\mathbf{A}$ inside and outside an ideal solenoid using $\\oint\\mathbf{A}\\cdot d\\mathbf{l} = \\Phi$ and symmetry, and verify $\\nabla\\times\\mathbf{A}$ gives the right $\\mathbf{B}$ in both regions. Show that $\\mathbf{A} = \\tfrac12\\mathbf{B}\\times\\mathbf{r}$ gives a uniform field, and find a gauge function $\\lambda$ that converts it to the Landau gauge $\\mathbf{A} = Bx\\hat{\\mathbf{y}}$. Explain why both describe identical physics.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'magnetic-dipole-expansion',
              title: 'Multipole expansion of a current loop',
              prompt:
                'Derive the dipole term of the multipole expansion of $\\mathbf{A}$ for a planar current loop, showing $\\oint\\mathbf{r}\'\\,(\\hat{\\mathbf{r}}\\cdot d\\mathbf{l}\') $ reduces to $-\\hat{\\mathbf{r}}\\times\\mathbf{a}$. Then compute $\\mathbf{B}$ numerically for a square loop of side $a$ using Biot-Savart and compare with the dipole formula on a circle of radius $r$; plot the relative error against $r/a$ and show it falls as $(a/r)^2$ (quadrupole vanishes by symmetry).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'larmor-precession',
              title: 'Larmor precession and the Stern-Gerlach force',
              prompt:
                'Show that a magnetic moment $\\mathbf{m} = \\gamma\\mathbf{L}$ in a uniform field obeys $d\\mathbf{m}/dt = \\gamma\\mathbf{m}\\times\\mathbf{B}$ and precesses at $\\omega = \\gamma B$. Integrate this numerically with a time-dependent field $\\mathbf{B} = B_0\\hat{\\mathbf{z}} + B_1(\\cos\\omega t\\,\\hat{\\mathbf{x}} + \\sin\\omega t\\,\\hat{\\mathbf{y}})$ and demonstrate magnetic resonance: at $\\omega = \\gamma B_0$ the moment flips. Compute the proton resonance frequency in a 3 T MRI magnet ($\\gamma_p/2\\pi = 42.58$ MHz/T).',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is there no magnetic monopole term in the multipole expansion of A?',
              answerOutline:
                'The monopole term is proportional to the closed line integral of d l\', which vanishes; physically, there are no magnetic charges.',
            },
            {
              question: 'What freedom is there in choosing A, and what does the Coulomb gauge achieve?',
              answerOutline:
                'A can be changed by the gradient of any scalar without changing B; setting div A = 0 makes each Cartesian component obey Poisson\'s equation with source -mu_0 J.',
            },
            {
              question: 'Why does a magnetic moment precess rather than align in a uniform field?',
              answerOutline:
                'The torque m x B is perpendicular to m, and m is proportional to angular momentum, so the torque rotates L (and m) about B, like a gyroscope; alignment needs dissipation.',
            },
          ],
        },
        {
          slug: 'magnetic-fields-in-matter',
          title: 'Magnetic fields in matter',
          summary:
            'Magnetisation and bound currents, the auxiliary field H, linear magnetic media, and the physics of diamagnetism, paramagnetism and ferromagnetism.',
          estimatedMinutes: 120,
          objectives: [
            'Define magnetisation $\\mathbf{M}$ and derive the bound currents $\\mathbf{J}_b = \\nabla\\times\\mathbf{M}$ and $\\mathbf{K}_b = \\mathbf{M}\\times\\hat{\\mathbf{n}}$',
            'Introduce $\\mathbf{H} = \\mathbf{B}/\\mu_0 - \\mathbf{M}$ with $\\nabla\\times\\mathbf{H} = \\mathbf{J}_f$ and apply the boundary conditions',
            'Describe diamagnetism, paramagnetism and ferromagnetism microscopically and give typical susceptibilities',
            'Explain hysteresis, permanent magnets and why iron cores concentrate flux',
          ],
          concepts: [
            'Magnetisation $\\mathbf{M}$ (dipole moment per volume)',
            'Bound currents $\\mathbf{J}_b = \\nabla\\times\\mathbf{M}$, $\\mathbf{K}_b = \\mathbf{M}\\times\\hat{\\mathbf{n}}$',
            'Auxiliary field $\\mathbf{H}$; $\\oint\\mathbf{H}\\cdot d\\mathbf{l} = I_{f,\\text{enc}}$',
            'Linear media $\\mathbf{M} = \\chi_m\\mathbf{H}$, $\\mathbf{B} = \\mu\\mathbf{H}$',
            'Diamagnetism ($\\chi_m < 0$), paramagnetism ($\\chi_m > 0$, Curie law)',
            'Ferromagnetism, domains, exchange interaction',
            'Hysteresis loop, remanence, coercivity',
            'Uniformly magnetised sphere and bar magnet',
          ],
          explanation: `Matter responds to magnetic fields through atomic magnetic moments: orbital motion and, above all, electron spin. The **magnetisation** $\\mathbf{M}$ is the magnetic dipole moment per unit volume. Summing the vector potentials of these dipoles and integrating by parts (the same trick as for $\\mathbf{P}$) shows that a magnetised material is equivalent to **bound currents**
$$\\mathbf{J}_b = \\nabla\\times\\mathbf{M}, \\qquad \\mathbf{K}_b = \\mathbf{M}\\times\\hat{\\mathbf{n}}.$$
A uniformly magnetised cylinder (a bar magnet) has only the surface current $K_b = M$ circulating around its side, so it has exactly the field of a finite solenoid. A uniformly magnetised sphere has a uniform interior field $\\tfrac23\\mu_0\\mathbf{M}$ and a pure dipole field outside.

Separating free from bound currents in Ampere's law defines the **auxiliary field** $\\mathbf{H} = \\mathbf{B}/\\mu_0 - \\mathbf{M}$, with $\\nabla\\times\\mathbf{H} = \\mathbf{J}_f$. It is the magnetic counterpart of $\\mathbf{D}$, with the same caveat: its divergence $-\\nabla\\cdot\\mathbf{M}$ need not vanish, so $\\mathbf{H}$ is not fixed by free currents alone. $\\mathbf{H}$ is what you control in the lab (via the current in your coils), which is why engineers use it. In **linear media**, $\\mathbf{M} = \\chi_m\\mathbf{H}$ and $\\mathbf{B} = \\mu\\mathbf{H}$ with $\\mu = \\mu_0(1 + \\chi_m)$. At interfaces, $B_\\perp$ is continuous and $H_\\parallel$ jumps by the free surface current.

Three kinds of response. **Diamagnetism** ($\\chi_m \\approx -10^{-5}$, present in everything) arises because a field changes the orbital motion of electrons so as to oppose it, a Lenz's-law effect. It is weak, but in strong fields it levitates frogs, and superconductors are perfect diamagnets ($\\chi_m = -1$). **Paramagnetism** ($\\chi_m \\sim 10^{-5}$ to $10^{-3}$) is the partial alignment of permanent moments against thermal agitation, with Curie's law $\\chi_m \\propto 1/T$, the magnetic twin of orientational polarisation. **Ferromagnetism** (iron, nickel, cobalt) is a cooperative quantum effect: the exchange interaction aligns neighbouring spins within **domains**, an applied field grows the favourably oriented domains, and the response is huge ($\\mu_r$ up to $10^5$), nonlinear and history-dependent. The **hysteresis loop** of $B$ against $H$ shows **remanence** (a permanent magnet) and **coercivity** (the reverse field needed to demagnetise it). The loop's area is the energy lost per cycle, which is why transformer cores use soft iron with narrow loops. A high-$\\mu$ core in a magnetic circuit channels flux the way a wire channels current.

Read Tong's section on magnetism in matter and Feynman II-34 (magnetism of matter) and II-36 (ferromagnetism).`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 7: Magnetism in matter',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 34: The Magnetism of Matter',
              url: 'https://www.feynmanlectures.caltech.edu/II_34.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 36: Ferromagnetism',
              url: 'https://www.feynmanlectures.caltech.edu/II_36.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'PhET — Magnets and Electromagnets',
              url: 'https://phet.colorado.edu/en/simulations/magnets-and-electromagnets',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
          ],
          exercises: [
            {
              slug: 'bound-currents-bar-magnet',
              title: 'Bound currents and the field of a bar magnet',
              prompt:
                'Derive $\\mathbf{J}_b = \\nabla\\times\\mathbf{M}$ and $\\mathbf{K}_b = \\mathbf{M}\\times\\hat{\\mathbf{n}}$ from the vector potential of a magnetised body. For a uniformly magnetised cylinder (length $L$, radius $R$, $M = 1$ MA/m, typical of NdFeB), compute $\\mathbf{B}$ on and off the axis numerically by treating the surface current as a stack of loops. Plot $\\mathbf{B}$ and $\\mathbf{H}$ field lines and show that inside the magnet $\\mathbf{H}$ points opposite to $\\mathbf{M}$ (the demagnetising field) while $\\mathbf{B}$ forms closed loops.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'magnetic-circuit',
              title: 'An iron-core electromagnet as a magnetic circuit',
              prompt:
                'An iron toroid ($\\mu_r = 2000$, mean circumference 30 cm, cross-section 2 cm²) is wound with 500 turns carrying 1 A and has an air gap of 2 mm. Using $\\oint\\mathbf{H}\\cdot d\\mathbf{l} = NI$ and continuity of $B_\\perp$ across the gap, find the field in the gap. Show that the gap dominates the "reluctance" even though it is tiny, and compare with the field without iron. Explain why the linear model fails above about 1.5 T.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'ising-hysteresis',
              title: 'Hysteresis from a toy model',
              prompt:
                'Simulate a 2D Ising model (Metropolis Monte Carlo, 64x64 spins, $T$ below $T_c$) in a slowly swept external field $h$ from $+2$ to $-2$ and back. Plot the magnetisation against $h$ and show a hysteresis loop; measure the remanence and coercive field and how they change with temperature and sweep rate. Explain in a paragraph how domain-wall motion produces hysteresis in real ferromagnets and why the loop area is an energy loss.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the bound current of a uniformly magnetised cylinder and what field does it produce?',
              answerOutline:
                'A surface current K_b = M circulating around the curved side (no volume current); the field is that of a finite solenoid with nI = M.',
            },
            {
              question: 'Why is H more convenient than B in the lab, and what is its limitation?',
              answerOutline:
                'Its curl depends only on free currents, which you control; but its divergence equals -div M, so H is not determined by free currents alone.',
            },
            {
              question: 'Distinguish diamagnetism, paramagnetism and ferromagnetism in sign, size and mechanism.',
              answerOutline:
                'Diamagnetism: chi ~ -1e-5, induced orbital response opposing B. Paramagnetism: chi ~ +1e-5 to 1e-3, thermal alignment of permanent moments, Curie 1/T. Ferromagnetism: huge, nonlinear, hysteretic, from exchange-driven spontaneous alignment in domains.',
            },
          ],
        },
      ],
    },
    {
      slug: 'electrodynamics-and-induction',
      title: 'Electrodynamics and Induction',
      description:
        'Fields that change in time: Ohm\'s law and EMF, Faraday\'s law in its motional and transformer forms, inductance and magnetic energy, and circuits understood as field problems.',
      lessons: [
        {
          slug: 'ohms-law-emf-and-motional-emf',
          title: 'Ohm\'s law, EMF and motional EMF',
          summary:
            'Conduction and resistance, what an EMF really is, and the EMF of a conductor moving through a magnetic field, including the flux rule and its paradoxes.',
          estimatedMinutes: 120,
          objectives: [
            'State Ohm\'s law $\\mathbf{J} = \\sigma\\mathbf{E}$, derive it from the Drude model and compute resistances of simple geometries',
            'Explain why there is no charge inside a steady-current conductor and where the surface charges that drive a circuit sit',
            'Define EMF as $\\oint\\mathbf{f}\\cdot d\\mathbf{l}$ and compute motional EMF from the magnetic force on moving charges',
            'Derive the flux rule $\\mathcal{E} = -d\\Phi/dt$ for moving loops and recognise cases where it fails (Faraday disc, rocking plates)',
          ],
          concepts: [
            'Ohm\'s law $\\mathbf{J} = \\sigma\\mathbf{E}$; resistance $R = \\int dl/\\sigma A$',
            'Drude model $\\sigma = ne^2\\tau/m$',
            'Joule heating $P = I^2R = \\int\\mathbf{J}\\cdot\\mathbf{E}\\,d\\tau$',
            'Charge relaxation time $\\epsilon_0/\\sigma$',
            'EMF $\\mathcal{E} = \\oint\\mathbf{f}\\cdot d\\mathbf{l}$, a force per charge',
            'Motional EMF $\\oint(\\mathbf{v}\\times\\mathbf{B})\\cdot d\\mathbf{l}$',
            'Flux rule for moving loops',
            'Faraday disc (homopolar generator)',
          ],
          explanation: `In a conductor the current density is proportional to the force per unit charge. With electric forces only, that is **Ohm's law** $\\mathbf{J} = \\sigma\\mathbf{E}$. The **Drude model**, electrons accelerated by $\\mathbf{E}$ and randomised by collisions every $\\tau$ on average, gives $\\sigma = ne^2\\tau/m$ and the right order of magnitude for metals (with $\\tau \\sim 10^{-14}$ s). Integrating over a uniform wire gives $V = IR$ with $R = L/\\sigma A$. Energy is dissipated at the rate $\\int\\mathbf{J}\\cdot\\mathbf{E}\\,d\\tau = I^2R$. In a steady state no charge accumulates inside the conductor: any excess relaxes away in a time $\\epsilon_0/\\sigma$, about $10^{-19}$ s. The field that pushes current around a circuit is produced by small **surface charges** on the wires, arranged so the field follows the wire around corners.

A battery or generator maintains the current against resistance by supplying a non-electrostatic force per unit charge $\\mathbf{f}_s$. The **electromotive force** is its circulation, $\\mathcal{E} = \\oint\\mathbf{f}\\cdot d\\mathbf{l}$. Electrostatic fields contribute nothing to this integral ($\\nabla\\times\\mathbf{E} = 0$), so the EMF is what keeps the charges circulating. Despite the name it is not a force, and despite the units it is not a potential difference, though for an ideal battery it equals the terminal voltage.

The first non-chemical source of EMF is **motion**. Pull a conducting rod along rails through a field $\\mathbf{B}$. The charges in the rod feel $q\\mathbf{v}\\times\\mathbf{B}$, so the EMF is $\\mathcal{E} = \\oint(\\mathbf{v}\\times\\mathbf{B})\\cdot d\\mathbf{l} = vBL$. For any loop moving through a static field this works out to the **flux rule**
$$\\mathcal{E} = -\\frac{d\\Phi}{dt}.$$
The energy comes from whoever pulls the rod: the magnetic force on the induced current opposes the motion, which is Lenz's law, and the magnetic field itself does no work. The flux rule is a convenient shortcut, not a law. It fails when the "circuit" is ill-defined, as in the **Faraday disc**: a spinning conducting disc in a uniform field gives a steady EMF $\\tfrac12\\omega BR^2$ between axle and rim although the flux through any obvious circuit is constant. Always fall back on the Lorentz force when in doubt.

Read Tong's electrodynamics chapter (Ohm's law and induction), OpenStax Vol. 2 chapters 9 and 13, and Feynman II-17, whose section 17-2 discusses the exceptions to the flux rule.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 4: Electrodynamics (Ohm\'s law, induction)',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 17: The Laws of Induction',
              url: 'https://www.feynmanlectures.caltech.edu/II_17.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Section 17-2, "Exceptions to the flux rule", is essential reading.',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 9: Current and Resistance',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/9-1-electrical-current',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 13: Electromagnetic Induction',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/13-1-faradays-law',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
          ],
          exercises: [
            {
              slug: 'resistance-geometries',
              title: 'Resistances and the Drude model',
              prompt:
                'Compute the resistance between (a) the inner and outer surfaces of a cylindrical shell of length $L$ (radial current), (b) concentric spheres, (c) two small spherical electrodes of radius $a$ far apart in a large conducting medium (show $R \\approx 1/2\\pi\\sigma a$). Use the Drude model with copper\'s conductivity ($5.96\\times10^7$ S/m) and electron density ($8.5\\times10^{28}$ m$^{-3}$) to compute $\\tau$, the mean free path at the Fermi speed ($1.6\\times10^6$ m/s), and the drift speed in a 1 mm² wire carrying 1 A.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'rod-on-rails-simulation',
              title: 'Rod on rails: motional EMF and energy balance',
              prompt:
                'A rod of mass $m$ and resistance $R$ slides on frictionless rails a distance $L$ apart in a uniform vertical field $B$. It is given initial speed $v_0$. Derive $v(t) = v_0e^{-t/\\tau}$ with $\\tau = mR/B^2L^2$, and show the total Joule heat equals the initial kinetic energy. Then add a constant applied force and a battery in the circuit, solve numerically, and plot $v(t)$, current, mechanical power and electrical power to show the energy balance at every instant.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'faraday-disc',
              title: 'The Faraday disc and the limits of the flux rule',
              prompt:
                'Compute the EMF between axle and rim of a conducting disc of radius $R$ spinning at $\\omega$ in a uniform axial field $B$ by integrating $(\\mathbf{v}\\times\\mathbf{B})\\cdot d\\mathbf{l}$ along a radius. Evaluate for $R = 10$ cm, $B = 1$ T, 3000 rpm. Then explain carefully why the flux rule appears to fail and how choosing a circuit that includes the moving contact rescues it. Do the same analysis for Feynman\'s rocking-plates example.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is an EMF and why is it not a potential difference?',
              answerOutline:
                'The circulation of the force per unit charge around a circuit, including non-electrostatic forces; the electrostatic field has zero circulation, so EMF cannot be the line integral of a potential gradient around a closed loop.',
            },
            {
              question: 'In a motional EMF, who does the work that appears as Joule heat?',
              answerOutline:
                'The external agent pushing the conductor; the magnetic force does no net work, it redirects the work done against the retarding force on the current.',
            },
            {
              question: 'Where is the field that drives current around a wire circuit produced?',
              answerOutline:
                'By surface charges on the wires (and battery terminals) arranged so the field inside the wire follows the wire.',
            },
          ],
        },
        {
          slug: 'faradays-law-and-inductance',
          title: 'Faraday\'s law and inductance',
          summary:
            'A changing magnetic field makes a curling electric field: Faraday\'s law in differential form, Lenz\'s law, eddy currents, and mutual and self-inductance.',
          estimatedMinutes: 150,
          objectives: [
            'State Faraday\'s law $\\nabla\\times\\mathbf{E} = -\\partial\\mathbf{B}/\\partial t$ and explain how it extends the flux rule to stationary loops',
            'Compute induced electric fields with the Ampere-like method for symmetric changing fields',
            'Explain Lenz\'s law, eddy currents and magnetic braking quantitatively',
            'Compute mutual and self-inductances and prove $M_{12} = M_{21}$ via the Neumann formula',
          ],
          concepts: [
            'Faraday\'s law $\\oint\\mathbf{E}\\cdot d\\mathbf{l} = -\\frac{d}{dt}\\int\\mathbf{B}\\cdot d\\mathbf{a}$',
            'Induced E is not conservative',
            '$\\mathbf{E} = -\\nabla V - \\partial\\mathbf{A}/\\partial t$',
            'Lenz\'s law',
            'Eddy currents and magnetic braking',
            'Mutual inductance; Neumann formula $M = \\frac{\\mu_0}{4\\pi}\\oint\\oint\\frac{d\\mathbf{l}_1\\cdot d\\mathbf{l}_2}{\\mathscr{r}}$',
            'Self-inductance $L = \\Phi/I$; solenoid $L = \\mu_0n^2Al$',
            'Back EMF $-L\\,dI/dt$',
          ],
          explanation: `Faraday found that a current is induced not only when a loop moves through a field but also when the loop is still and the field changes. For a stationary loop there is no magnetic force on the charges, so something else must push them: a changing magnetic field produces an **electric field**. **Faraday's law**
$$\\nabla\\times\\mathbf{E} = -\\frac{\\partial\\mathbf{B}}{\\partial t}, \\qquad \\oint\\mathbf{E}\\cdot d\\mathbf{l} = -\\frac{d\\Phi}{dt}$$
says this induced field has a curl, so it is not conservative and cannot be written as $-\\nabla V$ alone. With the vector potential, $\\mathbf{E} = -\\nabla V - \\partial_t\\mathbf{A}$. Einstein's 1905 relativity paper starts from the observation that the moving-loop and changing-field cases give the same EMF despite completely different explanations. In relativity they are the same phenomenon seen from two frames.

For symmetric situations, find the induced $\\mathbf{E}$ exactly as you found $\\mathbf{B}$ from Ampere's law, with $-\\partial_t\\mathbf{B}$ playing the role of $\\mu_0\\mathbf{J}$. Inside a long solenoid with changing current, the induced field circles the axis with $E = \\frac{s}{2}\\frac{dB}{dt}$. That is the principle of the betatron. **Lenz's law**, the minus sign, says the induced current opposes the change in flux; otherwise energy would not be conserved. In a solid conductor the induced currents are **eddy currents**. They make a magnet fall slowly through a copper pipe (terminal speed set by the balance of gravity and eddy-current braking), heat the pan on an induction hob, and waste energy in transformer cores, which is why cores are laminated.

Two loops linked by flux have a **mutual inductance**: $\\Phi_2 = M_{21}I_1$. Writing the flux as $\\oint\\mathbf{A}\\cdot d\\mathbf{l}$ gives the **Neumann formula** $M = \\frac{\\mu_0}{4\\pi}\\oint\\oint\\frac{d\\mathbf{l}_1\\cdot d\\mathbf{l}_2}{\\mathscr{r}}$. It is manifestly symmetric, so $M_{12} = M_{21}$, a reciprocity that is far from obvious for two loops of different shapes. A loop also links its own flux, with **self-inductance** $L = \\Phi/I$: $\\mu_0n^2Al$ for a solenoid, $\\frac{\\mu_0}{2\\pi}\\ln(b/a)$ per length for a coax. Any change in current then induces a **back EMF** $-L\\,dI/dt$ opposing it, the electrical inertia of the RLC analogy in waves-optics.

Pitfall: Faraday's law in the form $\\nabla\\times\\mathbf{E} = -\\partial_t\\mathbf{B}$ is exact; the flux rule $\\mathcal{E} = -d\\Phi/dt$ for arbitrary moving circuits is not (previous lesson). Read Tong's Faraday section, Feynman II-17 and OpenStax Vol. 2 chapters 13-14. Lewin's lectures on induction include the falling-magnet demonstration.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 4: Faraday\'s law and inductance',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 14: Inductance',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/14-1-mutual-inductance',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'PhET — Faraday\'s Law',
              url: 'https://phet.colorado.edu/en/simulations/faradays-law',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
            {
              title: 'Walter Lewin — 8.02x lectures on Faraday\'s law and inductance',
              url: 'https://www.youtube.com/playlist?list=PLyQSN7X0ro2314mKyUiOILaOC2hk6Pc3j',
              type: 'lecture',
              cost: 'free',
              provider: 'YouTube (Lectures by Walter Lewin)',
              note: 'Lectures 16-20; the induction and "Kirchhoff is for the birds" lectures are memorable.',
            },
          ],
          exercises: [
            {
              slug: 'induced-field-solenoid',
              title: 'Induced electric field of a changing solenoid',
              prompt:
                'The current in a long solenoid (radius $R$, $n$ turns per length) rises as $I = kt$. Find the induced $\\mathbf{E}$ inside and outside using Faraday\'s law with a circular loop. A ring of resistance $R_r$ encircles the solenoid outside; find the current in it and explain why the voltmeter reading between two points on the ring depends on the path of the voltmeter leads (the induced field is non-conservative).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'neumann-inductance-numerical',
              title: 'Mutual inductance by the Neumann formula',
              prompt:
                'Implement the Neumann double line integral numerically for two discretised loops, handling the self-term singularity for self-inductance by using a wire of finite radius (exclude the region $\\mathscr{r} < a$ or use the standard $\\frac14$ internal correction). Validate: mutual inductance of two coaxial circular loops against the elliptic-integral formula, and self-inductance of a circular loop against $\\mu_0R[\\ln(8R/a) - 2]$. Then compute $M$ between a square loop and a circle as a function of their separation and tilt, and confirm $M_{12} = M_{21}$ numerically.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'magnet-in-pipe',
              title: 'Magnet falling through a conducting pipe',
              prompt:
                'Model a small magnetic dipole $m$ falling along the axis of a thin conducting pipe of radius $a$, wall thickness $w$ and conductivity $\\sigma$. Treat the pipe as a stack of rings, compute the EMF in each ring from the rate of change of dipole flux, the induced current, and the retarding force, and show the force is proportional to the speed. Integrate the force over all rings to find the terminal speed and compare with the known result $v_t \\propto mg a^4/(\\mu_0^2 m^2\\sigma w)$ (find the numerical prefactor). Evaluate for a NdFeB magnet in a copper pipe.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the electric field induced by a changing magnetic field not conservative?',
              answerOutline:
                'Its curl is -dB/dt, nonzero, so its line integral around a closed loop (the EMF) is nonzero; it cannot be the gradient of a scalar.',
            },
            {
              question: 'What does Lenz\'s law express, and what would go wrong without it?',
              answerOutline:
                'The induced current opposes the change in flux that produces it; with the opposite sign induced currents would amplify themselves and create energy from nothing.',
            },
            {
              question: 'Why is the mutual inductance symmetric?',
              answerOutline:
                'The Neumann formula is a symmetric double integral over both loops; equivalently the interaction energy M I_1 I_2 is symmetric.',
            },
          ],
        },
        {
          slug: 'magnetic-energy-and-circuits-as-fields',
          title: 'Magnetic energy and circuits as field problems',
          summary:
            'The energy stored in inductors and in the magnetic field, transients in RL and LC circuits, transformers, and when lumped-circuit theory stops working.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the energy of an inductor $\\tfrac12LI^2$ and show it equals $\\frac{1}{2\\mu_0}\\int B^2\\,d\\tau$',
            'Use field energy to compute inductances and magnetic forces',
            'Analyse RL transients and the ideal transformer from Faraday\'s law',
            'State the quasistatic assumptions behind lumped circuits and estimate when they fail',
          ],
          concepts: [
            'Work against back EMF: $W = \\tfrac12LI^2$',
            'Field energy density $u_B = B^2/2\\mu_0$',
            '$W = \\tfrac12\\oint\\mathbf{A}\\cdot\\mathbf{I}\\,dl$',
            'Inductance from energy',
            'RL time constant $L/R$',
            'Ideal transformer $V_2/V_1 = N_2/N_1$',
            'Quasistatic approximation and lumped elements',
            'Magnetic pressure $B^2/2\\mu_0$',
          ],
          explanation: `To build up a current $I$ in an inductor you must push charge against the back EMF $L\\,dI/dt$. The work done is $\\int LI\\,dI = \\tfrac12LI^2$, and it is recovered when the current falls. Where is this energy? Write $LI = \\Phi = \\oint\\mathbf{A}\\cdot d\\mathbf{l}$, generalise to volume currents, $W = \\tfrac12\\int\\mathbf{A}\\cdot\\mathbf{J}\\,d\\tau$, use Ampere's law and integrate by parts, exactly as for the electrostatic energy:
$$W = \\frac{1}{2\\mu_0}\\int_{\\text{all space}}B^2\\,d\\tau.$$
So the energy is stored in the magnetic field with density $u_B = B^2/2\\mu_0$. This gives a second way to compute inductance, often easier than flux: find $\\mathbf{B}$, integrate the energy, set it equal to $\\tfrac12LI^2$. It also gives forces. A magnetic field exerts a **magnetic pressure** $B^2/2\\mu_0$ on a surface carrying the current that confines it, which crushes solenoids built for high fields and confines fusion plasmas.

Circuit equations are Faraday's law applied around a loop. An **RL circuit** switched on reaches its final current exponentially with time constant $L/R$; switch it off abruptly and the back EMF can be large enough to arc across the switch (the reason for flyback diodes). Combined with capacitors you get the LC and RLC oscillators of waves-optics. An **ideal transformer**, two coils sharing all their flux through a high-$\\mu$ core, has $V_2/V_1 = N_2/N_1$ and, by energy conservation, $I_2/I_1 = N_1/N_2$. It transforms impedances by $(N_2/N_1)^2$, the same impedance-matching idea seen with strings and sound.

All of this rests on the **quasistatic approximation**: the circuit is small compared with the wavelength $c/f$ of the signals in it, so fields everywhere respond instantly, charge does not pile up except on capacitor plates, and Kirchhoff's laws hold. At 50 Hz the wavelength is 6000 km and any circuit qualifies. At 1 GHz it is 30 cm and a PC trace is a transmission line: signals propagate at finite speed, reflect at mismatched ends and radiate. The displacement current, which closes the gap through a capacitor in quasistatics, is the term that turns circuits into wave problems, and the next module is about exactly that transition. Read Tong's magnetic energy section, Feynman II-17 (inductance and energy) and II-23 (cavity resonators, a beautiful account of a circuit turning into a cavity as frequency rises).`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 4: Magnetic energy and inductance',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 23: Cavity Resonators',
              url: 'https://www.feynmanlectures.caltech.edu/II_23.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'How a lumped LC circuit turns into a resonant cavity as the frequency rises: the limit of circuit theory.',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — 14.3-14.6: Energy in a Magnetic Field; RL and LC circuits',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/14-1-mutual-inductance',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'PhET — Generator',
              url: 'https://phet.colorado.edu/en/simulations/generator',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
              note: 'Legacy simulation including a transformer tab.',
            },
          ],
          exercises: [
            {
              slug: 'coax-inductance-energy',
              title: 'Inductance from field energy',
              prompt:
                'Compute the self-inductance per unit length of a coaxial cable (inner radius $a$, outer $b$) in two ways: from the flux between the conductors, and from the magnetic field energy. Then include the field inside a solid inner conductor with uniform current and show the energy method gives the extra internal inductance $\\mu_0/8\\pi$ per length, which the naive flux method misses. Evaluate for a typical RG-58 cable and compare with its specified 250 nH/m.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rl-switching-transient',
              title: 'RL transients and the flyback spike',
              prompt:
                'Simulate an RL circuit (12 V, $L = 100$ mH, $R = 10\\,\\Omega$) switched on, then switched off by opening the switch, modelled as its resistance rising from 0 to 1 MΩ over 1 µs. Plot current and the voltage across the switch, and show a spike of kilovolts. Add a flyback diode (model as a small resistance when forward biased) and show the spike disappears while the current decays with time constant set by $L$ and the diode path. Explain where the stored energy $\\tfrac12LI^2$ goes in each case.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'quasistatic-limits',
              title: 'When do lumped circuits fail?',
              prompt:
                'For each case estimate the ratio of circuit size to wavelength and decide whether lumped analysis is valid: (a) a 50 Hz power grid substation, (b) a 100 MHz FM radio front end on a 5 cm board, (c) a 5 GHz WiFi trace 2 cm long on FR-4 ($\\epsilon_r \\approx 4.4$), (d) a 3 GHz CPU clock distribution across a 2 cm die. For (c) estimate the propagation delay along the trace and the trace impedance if it is a 50-ohm microstrip, and explain why terminations are needed.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Where is the energy of a current-carrying inductor stored?',
              answerOutline:
                'In the magnetic field, with energy density B^2/(2 mu_0); integrating over all space gives (1/2) L I^2.',
            },
            {
              question: 'Why does opening a switch in an inductive circuit produce a large voltage spike?',
              answerOutline:
                'The inductor resists a rapid change in current; V = -L dI/dt becomes huge when dI/dt is large, until the energy finds a path (arc, diode).',
            },
            {
              question: 'What is the quasistatic approximation and when does it break down?',
              answerOutline:
                'Assuming fields adjust instantaneously across the circuit, valid when its size is much less than the wavelength c/f; it fails at high frequency, where propagation, reflection and radiation matter.',
            },
          ],
        },
      ],
    },
    {
      slug: 'maxwells-equations-and-waves',
      title: 'Maxwell\'s Equations and Electromagnetic Waves',
      description:
        'The displacement current completes the theory; energy and momentum conservation follow; the equations predict light, and its behaviour in matter, at boundaries, in conductors and in waveguides.',
      lessons: [
        {
          slug: 'displacement-current-and-maxwells-equations',
          title: 'The displacement current and Maxwell\'s equations',
          summary:
            'Why Ampere\'s law fails for time-dependent fields, Maxwell\'s fix, the complete equations in vacuum and in matter, and what each one means.',
          estimatedMinutes: 120,
          objectives: [
            'Show that Ampere\'s law is inconsistent with charge conservation when $\\partial\\rho/\\partial t \\ne 0$',
            'Derive the displacement current $\\epsilon_0\\partial\\mathbf{E}/\\partial t$ from that inconsistency and apply it to a charging capacitor',
            'Write Maxwell\'s equations in differential and integral form, in vacuum and in linear media, and state each in words',
            'Derive the general boundary conditions on $\\mathbf{E}$, $\\mathbf{D}$, $\\mathbf{B}$ and $\\mathbf{H}$ at interfaces',
          ],
          concepts: [
            'Divergence of Ampere\'s law and charge conservation',
            'Displacement current density $\\mathbf{J}_d = \\epsilon_0\\partial\\mathbf{E}/\\partial t$',
            'Ampere-Maxwell law $\\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J} + \\mu_0\\epsilon_0\\partial_t\\mathbf{E}$',
            'The four Maxwell equations',
            'Maxwell\'s equations in matter with $\\mathbf{D}$ and $\\mathbf{H}$; polarisation current $\\partial_t\\mathbf{P}$',
            'Integral forms and their physical statements',
            'Interface boundary conditions',
            'Lorentz force completes classical electrodynamics',
          ],
          explanation: `Take the divergence of Ampere's law, $\\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J}$. The left side vanishes identically (the divergence of a curl is zero), so $\\nabla\\cdot\\mathbf{J} = 0$. That is fine for steady currents and wrong in general: the continuity equation says $\\nabla\\cdot\\mathbf{J} = -\\partial_t\\rho$. The textbook illustration is a **charging capacitor**. Ampere's loop around the wire encloses current $I$ if the surface it bounds cuts the wire, and none if the surface balloons out between the plates. Maxwell's fix uses Gauss's law, $\\partial_t\\rho = \\epsilon_0\\nabla\\cdot\\partial_t\\mathbf{E}$, to repair the divergence:
$$\\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J} + \\mu_0\\epsilon_0\\frac{\\partial\\mathbf{E}}{\\partial t}.$$
The new term, the **displacement current** $\\epsilon_0\\partial_t\\mathbf{E}$, flows between the capacitor plates exactly where the conduction current stops, so both surfaces give the same answer. In quasistatic circuits it is tiny and invisible. In a wave it is everything: a changing $\\mathbf{E}$ makes $\\mathbf{B}$, a changing $\\mathbf{B}$ makes $\\mathbf{E}$ (Faraday), and the pair sustains itself through empty space.

The complete set of **Maxwell's equations** is
$$\\nabla\\cdot\\mathbf{E} = \\frac{\\rho}{\\epsilon_0}, \\quad \\nabla\\cdot\\mathbf{B} = 0, \\quad \\nabla\\times\\mathbf{E} = -\\frac{\\partial\\mathbf{B}}{\\partial t}, \\quad \\nabla\\times\\mathbf{B} = \\mu_0\\mathbf{J} + \\mu_0\\epsilon_0\\frac{\\partial\\mathbf{E}}{\\partial t}.$$
Together with the Lorentz force law they contain all of classical electrodynamics. Learn them in integral form too, and be able to state each in a sentence: charge is the source of $\\mathbf{E}$; there are no magnetic charges; changing $\\mathbf{B}$ curls $\\mathbf{E}$; currents and changing $\\mathbf{E}$ curl $\\mathbf{B}$.

In matter, separate free from bound sources. Time-varying polarisation produces a **polarisation current** $\\partial_t\\mathbf{P}$ in addition to the magnetisation current $\\nabla\\times\\mathbf{M}$, and the equations become $\\nabla\\cdot\\mathbf{D} = \\rho_f$ and $\\nabla\\times\\mathbf{H} = \\mathbf{J}_f + \\partial_t\\mathbf{D}$, with the two source-free equations unchanged. The integral forms applied to pillboxes and thin loops give the general **boundary conditions**: $D_\\perp$ jumps by $\\sigma_f$, $B_\\perp$ is continuous, $\\mathbf{E}_\\parallel$ is continuous, and $\\mathbf{H}_\\parallel$ jumps by $\\mathbf{K}_f\\times\\hat{\\mathbf{n}}$. They govern reflection and refraction later in this module.

Read Tong's section on Maxwell's equations, Feynman II-18 (the chapter where Feynman calls this the most significant event of the nineteenth century), and OpenStax Vol. 2 chapter 16.1.`,
          resources: [
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 18: The Maxwell Equations',
              url: 'https://www.feynmanlectures.caltech.edu/II_18.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              primary: true,
            },
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 4: Maxwell\'s equations and the displacement current',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — 16.1 Maxwell\'s Equations and Electromagnetic Waves',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'HyperPhysics — Maxwell\'s equations',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/electric/maxeq.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
          ],
          exercises: [
            {
              slug: 'capacitor-displacement-current',
              title: 'Displacement current in a charging capacitor',
              prompt:
                'A parallel-plate capacitor with circular plates of radius $R$ is charged by a current $I$. Compute the displacement current density between the plates and the magnetic field between them as a function of $s$ (inside and outside $s = R$), and show it matches the field around the wire for $s > R$. Then show that Ampere\'s law without the displacement term gives contradictory answers for two surfaces bounded by the same loop. Estimate the field at the plate edge for $I = 1$ A, $R = 5$ cm.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'boundary-conditions-general',
              title: 'Derive the general interface conditions',
              prompt:
                'From the integral forms of Maxwell\'s equations in matter, derive all four interface conditions using pillboxes and rectangular loops, keeping careful track of which terms vanish as the box or loop is flattened (and why the time-derivative terms do not contribute). State the conditions for a perfect conductor and explain why $\\mathbf{E}_\\parallel = 0$ and $B_\\perp = 0$ at its surface for time-varying fields.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'maxwell-in-words',
              title: 'Maxwell\'s equations in words and experiments',
              prompt:
                'For each of the four equations, write one sentence stating it in words, name the historical experiment that established it (or for the displacement current, the argument), and describe one modern technology that depends on it. Then explain in a paragraph why the four equations plus the Lorentz force law imply charge conservation, rather than needing it as a separate postulate.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What inconsistency forced Maxwell to add the displacement current?',
              answerOutline:
                'The divergence of Ampere\'s law implies div J = 0, which contradicts charge conservation when charge densities change (e.g. a charging capacitor).',
            },
            {
              question: 'Why is the displacement current negligible in ordinary circuits but essential in waves?',
              answerOutline:
                'It scales with frequency; in quasistatic circuits epsilon_0 dE/dt is tiny except in capacitors, but in a wave it is the source of the magnetic field that regenerates the electric field.',
            },
            {
              question: 'Which components of the fields are continuous across an interface without free charges or currents?',
              answerOutline:
                'D_perp, B_perp, E_parallel and H_parallel.',
            },
          ],
        },
        {
          slug: 'energy-and-momentum-of-fields',
          title: 'Conservation laws: energy, momentum and the Poynting theorem',
          summary:
            'Maxwell\'s equations imply local conservation of energy and momentum carried by the fields: the Poynting vector, the Maxwell stress tensor, and the angular momentum of fields.',
          estimatedMinutes: 120,
          objectives: [
            'Derive Poynting\'s theorem $\\partial_t u + \\nabla\\cdot\\mathbf{S} = -\\mathbf{J}\\cdot\\mathbf{E}$ and interpret each term',
            'Compute the Poynting vector for a resistive wire and a charging capacitor and explain where the energy flows',
            'Derive momentum conservation with the Maxwell stress tensor and use it to compute forces on charge distributions',
            'Explain field momentum and angular momentum with Feynman\'s disc paradox',
          ],
          concepts: [
            'Energy density $u = \\frac{\\epsilon_0}{2}E^2 + \\frac{1}{2\\mu_0}B^2$',
            'Poynting vector $\\mathbf{S} = \\mathbf{E}\\times\\mathbf{B}/\\mu_0$',
            'Poynting\'s theorem',
            'Energy flows into resistors from the surrounding field',
            'Momentum density $\\mathbf{g} = \\epsilon_0\\mathbf{E}\\times\\mathbf{B} = \\mathbf{S}/c^2$',
            'Maxwell stress tensor $T_{ij}$',
            'Radiation pressure',
            'Field angular momentum; Feynman disc paradox',
          ],
          explanation: `The work done by the fields on charges per unit time and volume is $\\mathbf{J}\\cdot\\mathbf{E}$ (the magnetic force does none). Use the Ampere-Maxwell law to eliminate $\\mathbf{J}$, and Faraday's law and a vector identity to tidy up. The result is **Poynting's theorem**
$$\\frac{\\partial u}{\\partial t} + \\nabla\\cdot\\mathbf{S} = -\\mathbf{J}\\cdot\\mathbf{E}, \\qquad u = \\frac{\\epsilon_0}{2}E^2 + \\frac{1}{2\\mu_0}B^2, \\quad \\mathbf{S} = \\frac{1}{\\mu_0}\\mathbf{E}\\times\\mathbf{B}.$$
It is a continuity equation for energy. The field energy in a region decreases by the work done on charges plus the energy flowing out through the boundary at rate $\\oint\\mathbf{S}\\cdot d\\mathbf{a}$. The **Poynting vector** $\\mathbf{S}$ is the energy flux. The electrostatic and magnetostatic energy densities of modules 1 and 5 combine into one.

The pictures it paints are surprising. In a current-carrying wire, $\\mathbf{E}$ is along the wire and $\\mathbf{B}$ circles it, so $\\mathbf{S}$ points radially *inward*. The energy dissipated as heat flows into the resistor from the surrounding space, not along the wire, and integrating $\\mathbf{S}$ over the wire's surface gives exactly $I^2R$. In a battery-lamp circuit, energy flows from the battery through the space around the wires into the lamp, guided by the surface charges. For a charging capacitor, $\\mathbf{S}$ flows in through the gap's edge. (There is an ambiguity: adding any divergence-free field to $\\mathbf{S}$ leaves the theorem unchanged. The standard choice is the one that makes relativity consistent.)

The fields carry **momentum** too, with density $\\mathbf{g} = \\epsilon_0\\mathbf{E}\\times\\mathbf{B} = \\mathbf{S}/c^2$. The analogous calculation with the force density $\\rho\\mathbf{E} + \\mathbf{J}\\times\\mathbf{B}$ produces the **Maxwell stress tensor**
$$T_{ij} = \\epsilon_0\\left(E_iE_j - \\tfrac12\\delta_{ij}E^2\\right) + \\frac{1}{\\mu_0}\\left(B_iB_j - \\tfrac12\\delta_{ij}B^2\\right),$$
and the total force on the charges inside a volume is $\\oint T_{ij}\\,da_j - \\frac{d}{dt}\\int\\mathbf{g}\\,d\\tau$. This turns force calculations into surface integrals and gives radiation pressure as the momentum flux of light. Fields carry **angular momentum** $\\mathbf{r}\\times\\mathbf{g}$ as well. In Feynman's disc paradox, a disc holding charges and a solenoid starts to rotate when the solenoid current is switched off. It looks like a violation of angular momentum conservation, but the field held angular momentum all along.

Read Feynman II-27 (field energy and momentum), Tong's energy and momentum section, and the corresponding 8.07 lecture notes.`,
          resources: [
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 27: Field Energy and Field Momentum',
              url: 'https://www.feynmanlectures.caltech.edu/II_27.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Includes the energy flow into a resistor and the disc paradox (section 17-4 and 27-6).',
              primary: true,
            },
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 4: Energy and momentum in fields',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
            },
            {
              title: 'MIT 8.07 Electromagnetism II — lecture notes (conservation laws, stress tensor)',
              url: 'https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'poynting-theorem-derivation',
              title: 'Derive Poynting\'s theorem and apply it to a wire',
              prompt:
                'Derive Poynting\'s theorem from Maxwell\'s equations, stating the vector identity you use. For a long straight wire of radius $a$, length $L$ and resistance $R$ carrying current $I$, compute $\\mathbf{E}$ and $\\mathbf{B}$ at its surface and show that the inward Poynting flux through the surface equals $I^2R$. Sketch the energy flow around a simple circuit of battery, wires and resistor.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'stress-tensor-force',
              title: 'Forces from the Maxwell stress tensor',
              prompt:
                'Using the stress tensor, compute the force between two equal point charges by integrating $T_{ij}$ over the plane midway between them, and show it reproduces Coulomb\'s law. Repeat for opposite charges. Then compute the force per unit area on the plates of a parallel-plate capacitor and on the windings of a long solenoid (magnetic pressure $B^2/2\\mu_0$), and evaluate the latter for a 30 T research magnet.',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'feynman-disc-paradox',
              title: 'Field angular momentum and Feynman\'s disc',
              prompt:
                'A long solenoid of radius $R$ with $n$ turns per length carries current $I$; coaxial with it are two long cylindrical shells of radii $a < R < b$ carrying charges $+Q$ and $-Q$, free to rotate. Compute the field angular momentum $\\int\\mathbf{r}\\times\\mathbf{g}\\,d\\tau$ per unit length. Then compute the angular impulse delivered to the shells by the induced electric field as the current is switched off, and show it equals the initial field angular momentum.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does each term in Poynting\'s theorem represent?',
              answerOutline:
                'du/dt: rate of change of field energy density; div S: net outflow of energy flux; -J dot E: rate of work done by the fields on charges (with a minus sign, energy leaving the field).',
            },
            {
              question: 'In a DC circuit, how does energy get from the battery to the resistor?',
              answerOutline:
                'Through the space around the wires as Poynting flux, entering the resistor through its surface; the wires guide the fields, they do not carry the energy inside them.',
            },
            {
              question: 'What is the momentum density of an electromagnetic field?',
              answerOutline:
                'g = epsilon_0 E x B = S/c^2; for a plane wave it gives radiation pressure I/c on an absorber.',
            },
          ],
        },
        {
          slug: 'electromagnetic-waves-in-vacuum-and-matter',
          title: 'Electromagnetic waves in vacuum and in matter',
          summary:
            'The wave equation from Maxwell\'s equations, plane waves and polarisation, waves in linear dielectrics with a complex frequency-dependent permittivity, and absorption and dispersion.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the vacuum wave equation and the transverse plane-wave solution with $\\mathbf{B} = \\hat{\\mathbf{k}}\\times\\mathbf{E}/c$',
            'Compute energy density, intensity and radiation pressure of plane waves and describe polarisation states',
            'Derive the dispersion relation $k = n(\\omega)\\omega/c$ in a linear medium with complex $\\epsilon(\\omega)$ and interpret its real and imaginary parts',
            'Simulate a wave packet propagating through a dispersive medium and measure group velocity and absorption',
          ],
          concepts: [
            'Vacuum wave equation and $c = 1/\\sqrt{\\mu_0\\epsilon_0}$',
            'Monochromatic plane waves; transversality',
            'Intensity $I = \\tfrac12c\\epsilon_0E_0^2$',
            'Linear, circular and elliptical polarisation',
            'Waves in linear media: $v = 1/\\sqrt{\\mu\\epsilon}$, $n = \\sqrt{\\epsilon_r\\mu_r}$',
            'Complex index $\\tilde n = n + i\\kappa$; absorption coefficient $2\\omega\\kappa/c$',
            'Dispersion from the oscillator model',
            'Group velocity in matter',
          ],
          explanation: `In a source-free region, take the curl of Faraday's law and use the Ampere-Maxwell law. With $\\nabla\\cdot\\mathbf{E} = 0$ you get
$$\\nabla^2\\mathbf{E} = \\mu_0\\epsilon_0\\frac{\\partial^2\\mathbf{E}}{\\partial t^2},$$
and the same for $\\mathbf{B}$: waves at $c = 1/\\sqrt{\\mu_0\\epsilon_0}$. The **plane wave** $\\mathbf{E} = \\mathbf{E}_0e^{i(\\mathbf{k}\\cdot\\mathbf{r} - \\omega t)}$ with $\\omega = ck$ solves it, and the other Maxwell equations add constraints. The divergence equations make it **transverse** ($\\mathbf{k}\\cdot\\mathbf{E}_0 = 0$), and Faraday's law fixes $\\mathbf{B} = \\hat{\\mathbf{k}}\\times\\mathbf{E}/c$, in phase and perpendicular. The energy is shared equally between electric and magnetic fields, the intensity is $I = \\langle S\\rangle = \\tfrac12c\\epsilon_0E_0^2$, and the radiation pressure is $I/c$. The direction of $\\mathbf{E}_0$, possibly complex, gives the **polarisation**: linear, circular or elliptical. The waves-optics subject develops this in its optics modules; here the focus is the electromagnetic derivation and matter.

In a **linear medium** with no free charges or currents, the same steps give waves with $v = 1/\\sqrt{\\mu\\epsilon}$ and refractive index $n = \\sqrt{\\epsilon_r\\mu_r} \\approx \\sqrt{\\epsilon_r}$. The real physics lies in the frequency dependence. Module 3 derived $\\epsilon_r(\\omega)$ from damped bound-electron oscillators, and it is complex. Plugging a complex $\\epsilon$ into the wave equation gives a complex wavenumber $\\tilde k = \\tilde n\\omega/c$ with $\\tilde n = n + i\\kappa$. The wave becomes
$$\\mathbf{E} = \\mathbf{E}_0e^{-\\kappa\\omega z/c}e^{i(n\\omega z/c - \\omega t)},$$
so the real part of the index sets the phase velocity $c/n$ and the imaginary part sets the **absorption**: intensity falls as $e^{-\\alpha z}$ with $\\alpha = 2\\omega\\kappa/c$, the Beer-Lambert law. Below a resonance $n$ rises with frequency (normal dispersion, the prism and rainbow); near it absorption peaks and $n$ falls (anomalous dispersion). The **group velocity** $d\\omega/dk$ is the speed of pulses. In regions of anomalous dispersion it can exceed $c$ without carrying information faster than light, because a strongly absorbing medium reshapes the pulse.

This framework describes everything from the transparency of glass to the blue of the sky (Rayleigh scattering by the same oscillators, $\\propto\\omega^4$) and the opacity of water in the infrared. Read Tong's chapter on electromagnetic waves and on dispersion, Feynman II-20 and II-32, and OpenStax Vol. 2 chapter 16. The 1D FDTD exercise is the start of the module project.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 4 and 7: Electromagnetic waves; waves in matter and dispersion',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 20: Solutions of Maxwell\'s Equations in Free Space',
              url: 'https://www.feynmanlectures.caltech.edu/II_20.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 32: Refractive Index of Dense Materials',
              url: 'https://www.feynmanlectures.caltech.edu/II_32.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 16: Electromagnetic Waves',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
          ],
          exercises: [
            {
              slug: 'plane-wave-constraints',
              title: 'Plane-wave solutions and their constraints',
              prompt:
                'Derive the vacuum wave equations for $\\mathbf{E}$ and $\\mathbf{B}$, substitute a complex plane wave into all four Maxwell equations, and derive transversality, $\\mathbf{B} = \\hat{\\mathbf{k}}\\times\\mathbf{E}/c$ and $\\omega = ck$. Compute $\\langle u\\rangle$, $\\langle\\mathbf{S}\\rangle$ and $\\langle\\mathbf{g}\\rangle$ and show $\\langle S\\rangle = c\\langle u\\rangle$. Write the Jones vectors for linear, right- and left-circular polarisation and show that a circularly polarised wave carries angular momentum flux $I/\\omega$ per unit area.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'complex-index-absorption',
              title: 'Absorption and dispersion from a complex permittivity',
              prompt:
                'For a single-resonance oscillator model with $\\omega_0 = 2\\pi\\times10^{15}$ s$^{-1}$, $\\gamma = 0.05\\omega_0$ and plasma frequency $\\omega_p = 0.5\\omega_0$, compute $\\tilde n(\\omega) = \\sqrt{\\epsilon_r(\\omega)}$ (choose the branch with $\\kappa \\ge 0$). Plot $n$, $\\kappa$, the absorption length and the group velocity $c/(n + \\omega\\,dn/d\\omega)$ from $0.5\\omega_0$ to $1.5\\omega_0$. Identify where $v_g > c$ and where $v_g < 0$, and explain why neither violates causality.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'pulse-through-dispersive-medium',
              title: 'A pulse in a dispersive, absorbing medium',
              prompt:
                'Propagate a Gaussian pulse (carrier $\\omega_c$, duration 10 optical cycles) through 20 absorption lengths of the medium above by multiplying its Fourier components by $e^{i\\tilde k(\\omega)z}$ and transforming back. Do it for $\\omega_c$ well below resonance and close to resonance. Plot the envelope at several distances, measure the peak speed and pulse broadening, and compare with $v_g$ and the group-velocity-dispersion estimate. Show that the leading edge never moves faster than $c$.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What do the real and imaginary parts of the complex refractive index describe?',
              answerOutline:
                'The real part n sets the phase velocity c/n and the wavelength in the medium; the imaginary part kappa sets the exponential attenuation, with intensity absorption coefficient 2 omega kappa / c.',
            },
            {
              question: 'Why is an electromagnetic wave in vacuum transverse, and what fixes B given E?',
              answerOutline:
                'Gauss\'s laws with no sources give k dot E = k dot B = 0; Faraday\'s law gives B = (k-hat x E)/c.',
            },
            {
              question: 'Can the group velocity exceed c? Does that allow faster-than-light signalling?',
              answerOutline:
                'Yes, in regions of anomalous dispersion near an absorption line; no, because the pulse is strongly reshaped and the signal front, set by the high-frequency response, travels at c.',
            },
          ],
        },
        {
          slug: 'reflection-refraction-conductors-and-waveguides',
          title: 'Reflection, refraction, conductors and waveguides',
          summary:
            'Boundary conditions applied to waves: the Fresnel equations, waves in conductors and the skin depth, plasma reflection, and guided modes in metal waveguides.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the Fresnel equations for s and p polarisation from the boundary conditions, and recover Snell\'s law, Brewster\'s angle and total internal reflection',
            'Derive the skin depth of a good conductor and explain why metals reflect visible light',
            'Explain the plasma frequency and why the ionosphere reflects AM radio but transmits FM',
            'Solve for TE and TM modes of a rectangular waveguide, compute cutoff frequencies, and distinguish phase and group velocity in the guide',
          ],
          concepts: [
            'Fresnel coefficients $r_s, t_s, r_p, t_p$',
            'Brewster angle and total internal reflection from Fresnel',
            'Normal incidence $R = \\left(\\frac{n_1 - n_2}{n_1 + n_2}\\right)^2$',
            'Good conductor: $\\epsilon_{\\text{eff}} = \\epsilon + i\\sigma/\\omega$',
            'Skin depth $\\delta = \\sqrt{2/\\mu\\sigma\\omega}$',
            'Plasma frequency $\\omega_p = \\sqrt{ne^2/m\\epsilon_0}$',
            'Waveguide modes TE$_{mn}$, TM$_{mn}$; cutoff $\\omega_{mn} = c\\pi\\sqrt{(m/a)^2 + (n/b)^2}$',
            'Guide dispersion $k_z^2 = \\omega^2/c^2 - \\omega_{mn}^2/c^2$',
          ],
          explanation: `When a plane wave meets a flat interface between linear media, the incident, reflected and transmitted waves must together satisfy the boundary conditions of the first lesson at every point and time. Phase matching gives the laws of reflection and **Snell's law**. Matching the amplitudes gives the **Fresnel equations**, separately for $\\mathbf{E}$ perpendicular to the plane of incidence (s) and in it (p):
$$r_s = \\frac{n_1\\cos\\theta_i - n_2\\cos\\theta_t}{n_1\\cos\\theta_i + n_2\\cos\\theta_t}, \\qquad r_p = \\frac{n_2\\cos\\theta_i - n_1\\cos\\theta_t}{n_2\\cos\\theta_i + n_1\\cos\\theta_t}.$$
Everything in elementary optics is in these formulas. At normal incidence $R = \\left(\\frac{n_1 - n_2}{n_1 + n_2}\\right)^2$ (4% for glass). $r_p$ vanishes at **Brewster's angle** $\\tan\\theta_B = n_2/n_1$. Beyond the critical angle $\\cos\\theta_t$ becomes imaginary, $|r| = 1$, and the transmitted field is evanescent (**total internal reflection**). There is a phase shift of $\\pi$ for reflection off a denser medium at normal incidence.

In a **conductor**, Ohm's law adds a current $\\sigma\\mathbf{E}$, equivalent to a complex permittivity $\\epsilon + i\\sigma/\\omega$. For a good conductor ($\\sigma \\gg \\epsilon\\omega$) the wave decays within the **skin depth** $\\delta = \\sqrt{2/\\mu\\sigma\\omega}$: about 9 mm for copper at 50 Hz, 2 µm at 1 GHz. That is why high-frequency current flows on the surface of wires and why a thin metal enclosure shields RF. With so large an index mismatch, metals reflect almost perfectly. For free electrons with little damping, $\\epsilon_r = 1 - \\omega_p^2/\\omega^2$ with **plasma frequency** $\\omega_p = \\sqrt{ne^2/m\\epsilon_0}$. Below $\\omega_p$, $\\epsilon_r < 0$ and the wave cannot propagate: it reflects. Metals have $\\omega_p$ in the ultraviolet, so they reflect visible light and become transparent in the UV. The ionosphere has $f_p \\sim$ 10 MHz, so it reflects AM and shortwave radio around the globe and lets FM and satellite signals through.

Inside a hollow metal **waveguide** the boundary condition $\\mathbf{E}_\\parallel = 0$ on the walls quantises the transverse wavenumber. For a rectangular guide of sides $a \\times b$, the modes TE$_{mn}$ and TM$_{mn}$ propagate as $e^{i(k_zz - \\omega t)}$ with
$$k_z^2 = \\frac{\\omega^2}{c^2} - \\pi^2\\left(\\frac{m^2}{a^2} + \\frac{n^2}{b^2}\\right).$$
Each mode has a **cutoff frequency** below which it decays. The lowest, TE$_{10}$, has $\\omega_c = c\\pi/a$. The dispersion relation is that of the plasma (or the Klein-Gordon equation), with phase velocity above $c$, group velocity below $c$ and $v_pv_g = c^2$. Microwave plumbing, radar and particle accelerators are built from this. Read Feynman II-33 (reflection from surfaces) and II-24 (waveguides), Tong's sections on reflection and on conductors, and Ellingson's Electromagnetics II for engineering detail.`,
          resources: [
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 33: Reflection from Surfaces',
              url: 'https://www.feynmanlectures.caltech.edu/II_33.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 24: Waveguides',
              url: 'https://www.feynmanlectures.caltech.edu/II_24.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'Ellingson — Electromagnetics II (open textbook)',
              url: 'https://phys.libretexts.org/Bookshelves/Electricity_and_Magnetism/Electromagnetics_II_(Ellingson)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts Physics',
              note: 'Wave reflection and transmission at interfaces, waveguides and skin depth from an engineering viewpoint.',
            },
            {
              title: 'MIT 6.013 Electromagnetics and Applications',
              url: 'https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-spring-2009/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture notes and problems on waveguides, transmission lines and antennas.',
            },
          ],
          exercises: [
            {
              slug: 'fresnel-derivation-and-plots',
              title: 'Derive and plot the Fresnel equations',
              prompt:
                'Derive $r_s$, $t_s$, $r_p$, $t_p$ from the boundary conditions for non-magnetic media. Show $R + T = 1$ with $T = \\frac{n_2\\cos\\theta_t}{n_1\\cos\\theta_i}|t|^2$. Plot $R_s$ and $R_p$ against angle for air-to-glass and glass-to-air (with the evanescent regime), mark Brewster\'s and the critical angle, and plot the phase of $r_s$ and $r_p$ under total internal reflection. Use the phase difference to design a Fresnel rhomb that turns linear into circular polarisation.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'skin-depth-and-plasma',
              title: 'Skin depth, plasma frequency and the ionosphere',
              prompt:
                'Derive the complex wavenumber in a conductor and the skin depth in the good-conductor limit. Compute $\\delta$ for copper at 50 Hz, 1 MHz, 1 GHz and 100 GHz and for seawater ($\\sigma = 4$ S/m) at 10 kHz and 1 MHz; explain why submarines use VLF radio. Then compute the plasma frequency of the F-layer of the ionosphere ($n \\approx 10^{12}$ m$^{-3}$) and of copper ($8.5\\times10^{28}$ m$^{-3}$), and plot the reflectance of a Drude metal against frequency from 0.1 to 3 times $\\omega_p$ with a small damping.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'waveguide-modes',
              title: 'Modes of a rectangular waveguide',
              prompt:
                'Solve for the TE$_{mn}$ modes of a rectangular metal guide by separation of variables for $B_z$, with $\\partial B_z/\\partial n = 0$ on the walls. For a WR-90 guide ($a = 22.86$ mm, $b = 10.16$ mm) list the cutoff frequencies of the first five modes and the single-mode band. Plot the field patterns of TE$_{10}$ and TE$_{20}$. At 10 GHz compute the guide wavelength, phase velocity and group velocity of TE$_{10}$, and verify $v_pv_g = c^2$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are metals shiny in the visible but transparent to X-rays?',
              answerOutline:
                'Below the plasma frequency (in the UV for metals) epsilon_r is negative, waves cannot propagate and are reflected; far above it the electrons cannot respond, epsilon_r is close to 1, and the wave passes.',
            },
            {
              question: 'What is the skin depth and how does it scale?',
              answerOutline:
                'The 1/e penetration distance of fields into a conductor, delta = sqrt(2/(mu sigma omega)); it shrinks as the square root of frequency and of conductivity.',
            },
            {
              question: 'Why does a waveguide have a cutoff frequency?',
              answerOutline:
                'The walls force a transverse standing-wave pattern with minimum transverse wavenumber; below the corresponding frequency the longitudinal wavenumber becomes imaginary and the mode is evanescent.',
            },
          ],
        },
      ],
      project: {
        slug: 'fdtd-maxwell-solver',
        title: 'Module project: an FDTD Maxwell solver',
        description: `Implement the Yee finite-difference time-domain algorithm, first in 1D and then in 2D (TE or TM polarisation), with dielectric and conducting materials, a soft source, and absorbing boundaries (first-order Mur, then a simple PML). Validate it against the Fresnel coefficients at an interface, the skin depth in a lossy medium, the quarter-wave anti-reflection coating, and the cutoff frequency of a parallel-plate waveguide. Measure the numerical dispersion of the scheme as a function of grid resolution and Courant number.`,
        deliverables: [
          'A documented 1D and 2D Yee FDTD code with material, source and boundary support',
          'Validation plots: reflection and transmission at an interface versus Fresnel, field decay in a conductor versus skin depth, waveguide cutoff',
          'A numerical-dispersion study (phase velocity error versus points per wavelength)',
          'An animation of a pulse reflecting from a dielectric slab and of a guided mode',
        ],
        estimatedHours: 14,
        stretchGoals: [
          'Add a Drude dispersive material via an auxiliary differential equation and simulate a metal film\'s reflectance',
          'Compare your 2D results with MEEP for one geometry',
        ],
      },
    },
    {
      slug: 'radiation-and-relativistic-electrodynamics',
      title: 'Radiation and Relativistic Electrodynamics',
      description:
        'Where electromagnetic waves come from: potentials and gauges, retarded solutions, dipole radiation and the Larmor formula, the fields of moving charges, and the Lorentz-covariant form of the whole theory.',
      lessons: [
        {
          slug: 'potentials-gauges-and-retarded-solutions',
          title: 'Potentials, gauges and the retarded solutions',
          summary:
            'Writing Maxwell\'s equations for V and A, gauge transformations, the Lorenz gauge, and the retarded potentials that build in the finite speed of light.',
          estimatedMinutes: 120,
          objectives: [
            'Express $\\mathbf{E}$ and $\\mathbf{B}$ in terms of $V$ and $\\mathbf{A}$ for time-dependent fields and show the homogeneous Maxwell equations are automatic',
            'Define gauge transformations and compare the Coulomb and Lorenz gauges',
            'Derive the inhomogeneous wave equations for $V$ and $\\mathbf{A}$ in the Lorenz gauge',
            'State the retarded potentials and verify that they satisfy the wave equations and the gauge condition',
          ],
          concepts: [
            '$\\mathbf{E} = -\\nabla V - \\partial_t\\mathbf{A}$, $\\mathbf{B} = \\nabla\\times\\mathbf{A}$',
            'Gauge transformation $\\mathbf{A} \\to \\mathbf{A} + \\nabla\\lambda$, $V \\to V - \\partial_t\\lambda$',
            'Coulomb gauge: instantaneous $V$',
            'Lorenz gauge $\\nabla\\cdot\\mathbf{A} + \\frac{1}{c^2}\\partial_tV = 0$',
            'Wave equations $\\Box V = -\\rho/\\epsilon_0$, $\\Box\\mathbf{A} = -\\mu_0\\mathbf{J}$',
            'Retarded time $t_r = t - \\mathscr{r}/c$',
            'Retarded potentials',
            'Jefimenko\'s equations; causality',
          ],
          explanation: `For time-dependent fields $\\nabla\\cdot\\mathbf{B} = 0$ still allows $\\mathbf{B} = \\nabla\\times\\mathbf{A}$. Faraday's law then says $\\mathbf{E} + \\partial_t\\mathbf{A}$ is curl-free, so
$$\\mathbf{E} = -\\nabla V - \\frac{\\partial\\mathbf{A}}{\\partial t}, \\qquad \\mathbf{B} = \\nabla\\times\\mathbf{A}.$$
Written this way, the two homogeneous Maxwell equations hold automatically, and four functions replace six field components. The price is **gauge freedom**: $\\mathbf{A} \\to \\mathbf{A} + \\nabla\\lambda$, $V \\to V - \\partial_t\\lambda$ leaves $\\mathbf{E}$ and $\\mathbf{B}$ unchanged for any $\\lambda(\\mathbf{r}, t)$. This freedom is not a nuisance but the central structural feature of the theory: in quantum field theory, demanding it as a local symmetry *produces* electromagnetism.

Substituting into the two inhomogeneous equations gives coupled equations for $V$ and $\\mathbf{A}$, and a choice of gauge decouples them. The **Coulomb gauge** $\\nabla\\cdot\\mathbf{A} = 0$ makes $V$ obey Poisson's equation instantaneously. That is not a violation of causality, because $V$ alone is not observable, but it hides the wave structure. The **Lorenz gauge** $\\nabla\\cdot\\mathbf{A} + \\frac{1}{c^2}\\partial_tV = 0$ gives four uncoupled wave equations,
$$\\Box V = -\\frac{\\rho}{\\epsilon_0}, \\qquad \\Box\\mathbf{A} = -\\mu_0\\mathbf{J}, \\qquad \\Box \\equiv \\nabla^2 - \\frac{1}{c^2}\\frac{\\partial^2}{\\partial t^2},$$
treating space and time symmetrically. In module 7's last lesson this becomes a single four-vector equation.

The solution, built from the Green's function of the wave equation, is the pair of **retarded potentials**
$$V(\\mathbf{r}, t) = \\frac{1}{4\\pi\\epsilon_0}\\int\\frac{\\rho(\\mathbf{r}', t_r)}{\\mathscr{r}}d\\tau', \\qquad \\mathbf{A}(\\mathbf{r}, t) = \\frac{\\mu_0}{4\\pi}\\int\\frac{\\mathbf{J}(\\mathbf{r}', t_r)}{\\mathscr{r}}d\\tau', \\qquad t_r = t - \\frac{\\mathscr{r}}{c}.$$
They are the static formulas with each source evaluated at the **retarded time**, when the signal that arrives now was sent. Information travels at $c$. The advanced solution with $t + \\mathscr{r}/c$ also solves the equations, but it is excluded on physical grounds (causality). Differentiating gives Jefimenko's equations for $\\mathbf{E}$ and $\\mathbf{B}$ directly. Be careful: the fields are *not* the static Coulomb and Biot-Savart fields evaluated at retarded time. Extra terms involving time derivatives of the sources appear, and those terms are the radiation.

Read Tong's chapter on electromagnetic radiation (retarded potentials), Feynman II-21, and Fitzpatrick's advanced electromagnetism notes on the Green's function; the delta-function and Green's-function machinery is canonical in math-methods.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 6: Electromagnetic Radiation (retarded potentials)',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 21: Solutions of Maxwell\'s Equations with Currents and Charges',
              url: 'https://www.feynmanlectures.caltech.edu/II_21.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'Fitzpatrick — Advanced Classical Electromagnetism (Jackson-level lecture notes)',
              url: 'https://farside.ph.utexas.edu/teaching/jk1/lectures/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
              note: 'The Green\'s function of the wave equation and the retarded solution derived carefully.',
            },
            {
              title: 'MIT 8.07 Electromagnetism II — lecture notes on potentials and radiation',
              url: 'https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'gauge-equations-derivation',
              title: 'Potentials, gauges and wave equations',
              prompt:
                'Derive the general equations for $V$ and $\\mathbf{A}$ from Maxwell\'s equations. Show that any potentials can be gauge-transformed into the Lorenz gauge (what equation must $\\lambda$ satisfy?) and derive the uncoupled wave equations. Then show that a residual gauge freedom remains within the Lorenz gauge, and write the potentials of a plane wave in both the Lorenz and Coulomb (radiation) gauges.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'retarded-potential-check',
              title: 'Verify the retarded potentials',
              prompt:
                'Show by direct differentiation that $V = \\frac{1}{4\\pi\\epsilon_0}\\int\\rho(\\mathbf{r}\', t_r)/\\mathscr{r}\\,d\\tau\'$ satisfies $\\Box V = -\\rho/\\epsilon_0$ (follow Griffiths 10.2 or Tong; keep the derivatives of $t_r$). Then apply the retarded potentials to a wire along $z$ in which a current $I_0$ is switched on at $t = 0$: find $\\mathbf{A}$, $\\mathbf{E}$ and $\\mathbf{B}$ at distance $s$ for $t > s/c$ and show they approach the magnetostatic field as $t \\to \\infty$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'causality-numerical',
              title: 'See retardation numerically',
              prompt:
                'Compute numerically the retarded potential at a set of observation points from a small oscillating charge distribution ($\\rho = \\rho_0(\\mathbf{r})\\cos\\omega t$ plus the current required by continuity) by evaluating the retarded-time integral on a grid. Plot $V$ in a plane at successive times and show expanding wavefronts with spacing $2\\pi c/\\omega$. Compare with an instantaneous (Coulomb) evaluation to show where they differ: in the far zone.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a gauge transformation and why does it leave physics unchanged?',
              answerOutline:
                'A -> A + grad lambda, V -> V - d lambda/dt; E and B depend on the potentials only through combinations in which lambda cancels.',
            },
            {
              question: 'Why is the Lorenz gauge preferred for radiation problems?',
              answerOutline:
                'It decouples the equations into four wave equations with sources, treating space and time symmetrically, which is Lorentz-covariant and gives retarded solutions directly.',
            },
            {
              question: 'Are the fields of time-dependent sources just the static Coulomb and Biot-Savart fields evaluated at the retarded time?',
              answerOutline:
                'No: the derivatives of the retarded time produce extra terms involving time derivatives of rho and J (Jefimenko\'s equations), and these extra terms include the radiation fields.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/dirac-delta-and-greens-functions'],
        },
        {
          slug: 'dipole-radiation-and-the-larmor-formula',
          title: 'Dipole radiation and the Larmor formula',
          summary:
            'The fields far from an oscillating dipole, the sin-squared radiation pattern, total radiated power, the Larmor formula for an accelerated charge, and antennas.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the radiation fields of an oscillating electric dipole in the far zone and identify the near, intermediate and radiation zones',
            'Compute the angular distribution and total power $P = \\frac{\\mu_0p_0^2\\omega^4}{12\\pi c}$',
            'Derive the Larmor formula $P = \\frac{q^2a^2}{6\\pi\\epsilon_0c^3}$ and apply it to atoms, antennas and synchrotrons',
            'Explain radiation resistance, the half-wave antenna and the classical instability of the atom',
          ],
          concepts: [
            'Approximations $d \\ll \\lambda \\ll r$',
            'Radiation fields $\\propto 1/r$, transverse, in phase',
            'Pattern $\\propto\\sin^2\\theta$; no radiation along the dipole axis',
            'Total power $\\propto\\omega^4p_0^2$',
            'Larmor formula',
            'Rayleigh scattering and the blue sky',
            'Radiation resistance; short and half-wave dipole antennas',
            'Magnetic dipole radiation',
          ],
          explanation: `Consider a dipole $\\mathbf{p}(t) = p_0\\cos\\omega t\\,\\hat{\\mathbf{z}}$. Make three approximations: the source is small compared with the wavelength ($d \\ll \\lambda$), the observer is far compared with both ($r \\gg \\lambda$), and you keep only terms falling as $1/r$. The retarded potentials then reduce to $\\mathbf{A} = \\frac{\\mu_0}{4\\pi r}\\dot{\\mathbf{p}}(t - r/c)$ plus a matching $V$, and the **radiation fields** are
$$\\mathbf{E} = \\frac{\\mu_0}{4\\pi r}\\left[\\hat{\\mathbf{r}}\\times(\\hat{\\mathbf{r}}\\times\\ddot{\\mathbf{p}})\\right]_{t_r}, \\qquad \\mathbf{B} = \\frac{1}{c}\\hat{\\mathbf{r}}\\times\\mathbf{E}.$$
They are transverse, in phase, mutually perpendicular and fall as $1/r$, which is a locally plane spherical wave. Because $|\\mathbf{S}| \\propto 1/r^2$, the power through a large sphere is independent of its radius: energy genuinely escapes to infinity. That is the definition of **radiation**. The static $1/r^2$ and $1/r^3$ fields carry energy back and forth but none away.

The intensity $\\langle S\\rangle \\propto \\frac{\\sin^2\\theta}{r^2}$ is a doughnut. It is zero along the dipole axis and maximal broadside. Integrating gives the total power
$$\\langle P\\rangle = \\frac{\\mu_0p_0^2\\omega^4}{12\\pi c}.$$
The $\\omega^4$ dependence explains why the sky is blue. Air molecules are oscillators driven far below their UV resonances, so each scattered intensity scales as $\\omega^4$, and blue light is scattered about 5.5 times more than red. The scattered light at $90°$ is polarised, as the waves-optics polarisation lesson described.

For a single point charge, $\\ddot{\\mathbf{p}} = q\\mathbf{a}$, and the same result gives the **Larmor formula** $P = \\frac{q^2a^2}{6\\pi\\epsilon_0c^3}$ (non-relativistic): *any accelerated charge radiates*. Applied to a classical electron orbiting a proton, it predicts a spiral into the nucleus within about $10^{-11}$ s, the famous failure that quantum mechanics resolves. Applied to electrons in a synchrotron, it explains why circular electron accelerators are limited by radiation loss and why synchrotron light sources exist. In the relativistic version (next lesson) the power grows as $\\gamma^4$.

An **antenna** is a driven dipole. Writing the radiated power as $\\tfrac12I_0^2R_{\\text{rad}}$ defines the **radiation resistance**: $R_{\\text{rad}} = 790(d/\\lambda)^2\\,\\Omega$ for a short dipole, so short antennas radiate poorly. For the half-wave dipole, integrating the current distribution gives about $73\\,\\Omega$, one of the capstone options. **Magnetic dipole** radiation from a current loop has the same pattern with $\\mathbf{E}$ and $\\mathbf{B}$ swapped, and is weaker by $(d/\\lambda)^2$. Read Tong's radiation chapter, Feynman I-28 and I-32, and the PhET radiating-charge simulation.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 6: Dipole radiation and the Larmor formula',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 28: Electromagnetic Radiation',
              url: 'https://www.feynmanlectures.caltech.edu/I_28.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 32: Radiation Damping. Light Scattering',
              url: 'https://www.feynmanlectures.caltech.edu/I_32.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Radiation resistance, Rayleigh scattering and the blue sky.',
            },
            {
              title: 'PhET — Radiating Charge',
              url: 'https://phet.colorado.edu/en/simulations/radiating-charge',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
          ],
          exercises: [
            {
              slug: 'dipole-radiation-derivation',
              title: 'Derive the dipole radiation fields and power',
              prompt:
                'Starting from the retarded potentials of an oscillating dipole (two small spheres connected by a wire, as in Griffiths 11.1), make the three approximations explicitly and derive $\\mathbf{E}$, $\\mathbf{B}$, $\\langle\\mathbf{S}\\rangle$ and $\\langle P\\rangle$. Then derive the Larmor formula as the special case of a point charge. Show that the total power of a dipole $p = ed$ oscillating at optical frequency, with $d = 0.1$ nm, gives a radiative lifetime of a few nanoseconds, comparable to real atomic lifetimes.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'radiation-pattern-numerical',
              title: 'Radiation patterns of dipoles and arrays',
              prompt:
                'Compute the far-field pattern $|E(\\theta, \\phi)|^2$ numerically for (a) a single short dipole, (b) two parallel dipoles separated by $\\lambda/2$ driven in phase and in antiphase, (c) a linear array of 8 dipoles with a progressive phase shift (a phased array). Plot polar diagrams, show how the main lobe steers with the phase shift, and compute the directivity of each. Relate the array factor to the N-slit interference pattern of waves-optics.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'classical-atom-collapse',
              title: 'Collapse of the classical atom and synchrotron losses',
              prompt:
                'Using the Larmor formula and the circular-orbit energy $-e^2/8\\pi\\epsilon_0r$, derive $dr/dt$ and integrate to find the time for a classical electron to spiral from the Bohr radius to zero (expect about $1.6\\times10^{-11}$ s). Simulate the spiral numerically with a radiation-reaction drag force. Then estimate the energy radiated per turn by a 100 GeV electron in LEP (radius 4.2 km) using the relativistic Larmor result $P \\propto\\gamma^4$, and explain why the LHC accelerates protons instead.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What distinguishes radiation fields from the static fields of a source?',
              answerOutline:
                'Radiation fields fall as 1/r so the Poynting flux through a large sphere is independent of radius and energy escapes to infinity; static fields fall faster and carry no net energy away.',
            },
            {
              question: 'In which direction does an oscillating dipole radiate most and least?',
              answerOutline:
                'Most perpendicular to the dipole axis (sin^2 theta maximal); none along the axis.',
            },
            {
              question: 'Why is the sky blue and the sunset red?',
              answerOutline:
                'Molecules scatter as dipoles driven below resonance with power proportional to omega^4, so blue is scattered much more than red; at sunset the long path removes the blue, leaving red in the direct beam.',
            },
          ],
        },
        {
          slug: 'fields-of-moving-charges',
          title: 'Fields of moving charges: Lienard-Wiechert',
          summary:
            'The exact potentials and fields of a point charge in arbitrary motion, the velocity and acceleration fields, relativistic beaming, and synchrotron and Cherenkov radiation.',
          estimatedMinutes: 150,
          objectives: [
            'Derive the Lienard-Wiechert potentials and explain the factor $(1 - \\hat{\\boldsymbol{\\mathscr{r}}}\\cdot\\mathbf{v}/c)^{-1}$',
            'Separate the fields of a moving charge into velocity (Coulomb) and acceleration (radiation) parts',
            'Derive the field of a uniformly moving charge and show it is flattened toward the plane perpendicular to the motion',
            'Explain relativistic beaming, the Lienard generalisation of Larmor, synchrotron radiation and Cherenkov radiation qualitatively and with estimates',
          ],
          concepts: [
            'Retarded position and retarded time of a point charge',
            'Lienard-Wiechert potentials $V = \\frac{q}{4\\pi\\epsilon_0}\\frac{1}{\\mathscr{r}(1 - \\hat{\\boldsymbol{\\mathscr{r}}}\\cdot\\boldsymbol{\\beta})}$',
            'Velocity field $\\propto 1/\\mathscr{r}^2$; acceleration field $\\propto 1/\\mathscr{r}$',
            'Field of a uniformly moving charge; "pancake" compression by $\\gamma$',
            'Lienard formula $P = \\frac{q^2\\gamma^6}{6\\pi\\epsilon_0c^3}\\left[a^2 - |\\mathbf{v}\\times\\mathbf{a}|^2/c^2\\right]$',
            'Relativistic beaming into a cone of angle $1/\\gamma$',
            'Synchrotron radiation; critical frequency $\\sim\\gamma^3\\omega_0$',
            'Cherenkov radiation for $v > c/n$',
          ],
          explanation: `For a single point charge moving on a trajectory $\\mathbf{w}(t)$, the retarded-time integral picks out the one past position whose light-signal reaches the observer now. The integral does not simply give $q/\\mathscr{r}$, though. Because the charge moves while the "information" sweeps across it, the effective volume is changed by a factor $(1 - \\hat{\\boldsymbol{\\mathscr{r}}}\\cdot\\mathbf{v}/c)^{-1}$. That is a purely geometric effect, the same one that makes a train approaching you appear longer. The result is the **Lienard-Wiechert potentials**
$$V = \\frac{q}{4\\pi\\epsilon_0}\\frac{1}{\\mathscr{r} - \\boldsymbol{\\mathscr{r}}\\cdot\\mathbf{v}/c}, \\qquad \\mathbf{A} = \\frac{\\mathbf{v}}{c^2}V,$$
everything evaluated at the retarded time.

Differentiating them (a page of careful algebra) gives the fields as two pieces. The **velocity field** falls as $1/\\mathscr{r}^2$ and depends only on $\\mathbf{v}$: the generalised Coulomb field. The **acceleration field** falls as $1/\\mathscr{r}$, is proportional to $\\mathbf{a}$ and is transverse: the radiation. For a **uniformly moving** charge only the velocity field exists. It turns out to point from the charge's *present* position, not its retarded one, with magnitude enhanced by $\\gamma$ perpendicular to the motion and reduced by $\\gamma^2$ along it: a field "pancake". This is exactly what a Lorentz boost of the Coulomb field gives, which the next lesson confirms. It is also why a fast charged particle passing an atom delivers a short, intense transverse kick.

For a charge at relativistic speed the radiation is concentrated forward into a cone of half-angle about $1/\\gamma$ (**relativistic beaming**), and the total power is the **Lienard formula**, which grows as $\\gamma^6$ for acceleration along the velocity and $\\gamma^4$ for acceleration perpendicular to it. An electron circling in a magnetic field sweeps this narrow beam past an observer, producing short pulses whose spectrum extends up to a critical frequency of order $\\gamma^3$ times the orbital frequency. That is **synchrotron radiation**, the light of the Crab Nebula, of radio galaxies and of dedicated X-ray light sources. A charge moving through a medium faster than the light speed $c/n$ there produces a shock-front cone, **Cherenkov radiation**, the blue glow in reactor pools and the detection principle of neutrino observatories like Super-Kamiokande.

This lesson is the high point of classical radiation theory. Read Tong's section on the Lienard-Wiechert potentials, Feynman II-21 (sections 21-5 and 21-6) and I-34, and Fitzpatrick's advanced notes; do the numerical exercise, which shows the radiation pattern emerging from the exact formulas.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 6: Lienard-Wiechert potentials',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 21: Solutions of Maxwell\'s Equations with Currents and Charges (21-5, 21-6)',
              url: 'https://www.feynmanlectures.caltech.edu/II_21.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 34: Relativistic Effects in Radiation',
              url: 'https://www.feynmanlectures.caltech.edu/I_34.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Synchrotron radiation and beaming explained geometrically.',
            },
            {
              title: 'Fitzpatrick — Advanced Classical Electromagnetism: radiation from moving charges',
              url: 'https://farside.ph.utexas.edu/teaching/jk1/lectures/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
            },
          ],
          exercises: [
            {
              slug: 'uniform-motion-field',
              title: 'Field of a uniformly moving charge',
              prompt:
                'Starting from the Lienard-Wiechert potentials for a charge moving at constant velocity $\\mathbf{v}$, show that the electric field at time $t$ is $\\mathbf{E} = \\frac{q}{4\\pi\\epsilon_0}\\frac{1 - \\beta^2}{(1 - \\beta^2\\sin^2\\theta)^{3/2}}\\frac{\\hat{\\mathbf{R}}}{R^2}$, where $\\mathbf{R}$ points from the *present* position. Plot field lines for $\\beta = 0, 0.5, 0.9, 0.99$, and compute the duration and peak of the transverse field pulse felt at impact parameter $b$ as a function of $\\gamma$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'lienard-wiechert-numerical',
              title: 'Exact fields of an accelerating charge numerically',
              prompt:
                'Write code that, for a given trajectory $\\mathbf{w}(t)$, solves the retarded-time equation $t_r = t - |\\mathbf{r} - \\mathbf{w}(t_r)|/c$ by root finding at every grid point, then evaluates the full Lienard-Wiechert $\\mathbf{E}$ field. Visualise it for (a) a charge oscillating with $v_{\\max} = 0.1c$ (compare the far field with the dipole pattern), (b) the same with $v_{\\max} = 0.8c$ (beaming), (c) a charge suddenly stopped (show the kinked field lines propagating outward, the Purcell picture of radiation).',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'synchrotron-and-cherenkov-estimates',
              title: 'Synchrotron and Cherenkov estimates',
              prompt:
                '(a) Electrons of 6 GeV circulate in a storage ring with bending radius 25 m. Compute $\\gamma$, the beaming angle, the energy loss per turn, and the critical photon energy $\\hbar\\omega_c = \\frac32\\hbar\\gamma^3c/\\rho$ (expect several keV: X-rays). (b) Compute the Cherenkov angle $\\cos\\theta = 1/n\\beta$ for a 1 GeV muon in water ($n = 1.33$) and the threshold kinetic energy for electrons and muons. Explain how Super-Kamiokande distinguishes electrons from muons by ring sharpness.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the velocity and acceleration fields of a moving charge, and which one radiates?',
              answerOutline:
                'The velocity field falls as 1/r^2 and depends only on v (a moving Coulomb field); the acceleration field falls as 1/r, is proportional to a and is transverse; only the acceleration field carries energy to infinity.',
            },
            {
              question: 'Why does the field of a uniformly moving charge point from its present rather than retarded position?',
              answerOutline:
                'The retarded-time factors conspire so the velocity field extrapolates along the straight trajectory to the present position; it is equivalent to the Lorentz-boosted Coulomb field.',
            },
            {
              question: 'What is relativistic beaming and why does it make synchrotron radiation high-frequency?',
              answerOutline:
                'Radiation from a relativistic charge is concentrated in a cone of angle about 1/gamma along v; an orbiting charge sweeps this cone past an observer in a very short time, giving pulses with frequencies up to about gamma^3 times the orbital frequency.',
            },
          ],
        },
        {
          slug: 'relativistic-electrodynamics-and-the-field-tensor',
          title: 'Relativistic electrodynamics and the field tensor',
          summary:
            'Electromagnetism is already relativistic: the four-current and four-potential, the field-strength tensor, covariant Maxwell equations, and how E and B transform between frames.',
          estimatedMinutes: 150,
          objectives: [
            'Assemble the four-current $J^\\mu = (c\\rho, \\mathbf{J})$ and four-potential $A^\\mu = (V/c, \\mathbf{A})$ and write continuity and the Lorenz gauge covariantly',
            'Construct the field-strength tensor $F^{\\mu\\nu} = \\partial^\\mu A^\\nu - \\partial^\\nu A^\\mu$ and write all four Maxwell equations in two covariant equations',
            'Derive the transformation of $\\mathbf{E}$ and $\\mathbf{B}$ under a boost and use it to explain magnetism as a relativistic effect',
            'Identify the Lorentz invariants $E^2 - c^2B^2$ and $\\mathbf{E}\\cdot\\mathbf{B}$ and write the covariant Lorentz force',
          ],
          concepts: [
            'Four-vectors and the Minkowski metric',
            'Four-current $J^\\mu$; continuity $\\partial_\\mu J^\\mu = 0$',
            'Four-potential $A^\\mu$; Lorenz gauge $\\partial_\\mu A^\\mu = 0$',
            'Field tensor $F^{\\mu\\nu}$ and its components',
            'Covariant Maxwell: $\\partial_\\mu F^{\\mu\\nu} = \\mu_0J^\\nu$, $\\partial_{[\\lambda}F_{\\mu\\nu]} = 0$',
            'Field transformations $\\mathbf{E}\'_\\parallel = \\mathbf{E}_\\parallel$, $\\mathbf{E}\'_\\perp = \\gamma(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})_\\perp$',
            'Invariants $E^2 - c^2B^2$, $\\mathbf{E}\\cdot\\mathbf{B}$',
            'Covariant Lorentz force $dp^\\mu/d\\tau = qF^{\\mu\\nu}u_\\nu$',
          ],
          explanation: `Maxwell's equations predict waves at speed $c$ in every inertial frame, which is incompatible with Galilean relativity. That incompatibility led Einstein to special relativity, and the theory turns out to be **already Lorentz-covariant**: it only needs rewriting in four-dimensional notation to make this manifest. (The relativity subject develops four-vectors in general; here you apply them.)

Charge density and current combine into the **four-current** $J^\\mu = (c\\rho, \\mathbf{J})$, and the continuity equation becomes $\\partial_\\mu J^\\mu = 0$. The potentials form the **four-potential** $A^\\mu = (V/c, \\mathbf{A})$. The Lorenz gauge is $\\partial_\\mu A^\\mu = 0$, and the two wave equations of the first lesson merge into one, $\\Box A^\\mu = -\\mu_0J^\\mu$. The fields are the components of the antisymmetric **field-strength tensor**
$$F^{\\mu\\nu} = \\partial^\\mu A^\\nu - \\partial^\\nu A^\\mu, \\qquad F^{0i} = -E_i/c, \\quad F^{ij} = -\\epsilon_{ijk}B_k.$$
Electric and magnetic fields are not separate vectors but the six components of one tensor. All of Maxwell's equations collapse to two:
$$\\partial_\\mu F^{\\mu\\nu} = \\mu_0J^\\nu, \\qquad \\partial_\\lambda F_{\\mu\\nu} + \\partial_\\mu F_{\\nu\\lambda} + \\partial_\\nu F_{\\lambda\\mu} = 0.$$
The first contains Gauss's and Ampere-Maxwell's laws; the second, satisfied automatically by $F = \\partial A - \\partial A$, contains $\\nabla\\cdot\\mathbf{B} = 0$ and Faraday's law. The Lorentz force becomes $\\frac{dp^\\mu}{d\\tau} = qF^{\\mu\\nu}u_\\nu$, whose spatial part is $q(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})$ and whose time part is the power $q\\mathbf{E}\\cdot\\mathbf{v}$.

Transforming $F^{\\mu\\nu}$ as a tensor under a boost with velocity $\\mathbf{v}$ gives
$$\\mathbf{E}'_\\parallel = \\mathbf{E}_\\parallel, \\quad \\mathbf{E}'_\\perp = \\gamma(\\mathbf{E} + \\mathbf{v}\\times\\mathbf{B})_\\perp, \\quad \\mathbf{B}'_\\parallel = \\mathbf{B}_\\parallel, \\quad \\mathbf{B}'_\\perp = \\gamma\\left(\\mathbf{B} - \\frac{\\mathbf{v}\\times\\mathbf{E}}{c^2}\\right)_\\perp.$$
A pure electric field in one frame has a magnetic part in another. **Magnetism is a relativistic consequence of electrostatics plus Lorentz invariance**. Purcell's argument makes this concrete: a neutral current-carrying wire acquires a net charge density in the frame of a moving test charge because of length contraction, and the resulting electric force is exactly the magnetic force of the lab frame. Boosting the Coulomb field reproduces the pancake field of the previous lesson. Two combinations are the same in every frame, $E^2 - c^2B^2$ and $\\mathbf{E}\\cdot\\mathbf{B}$. So a pure magnetic field can never be transformed into a pure electric one, and a plane wave ($E = cB$, $\\mathbf{E}\\perp\\mathbf{B}$) is a plane wave in every frame. The Lagrangian density $-\\frac{1}{4\\mu_0}F_{\\mu\\nu}F^{\\mu\\nu} - J^\\mu A_\\mu$ generates the whole theory and is the starting point of quantum electrodynamics.

Read Tong's chapter on electromagnetism and relativity, Feynman II-25 and II-26, and the 8.07 notes on covariant electrodynamics.`,
          resources: [
            {
              title: 'David Tong — Lectures on Electromagnetism, Ch. 5: Electromagnetism and Relativity',
              url: 'https://www.damtp.cam.ac.uk/user/tong/em.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 25: Electrodynamics in Relativistic Notation',
              url: 'https://www.feynmanlectures.caltech.edu/II_25.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 26: Lorentz Transformations of the Fields',
              url: 'https://www.feynmanlectures.caltech.edu/II_26.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'MIT 8.07 Electromagnetism II — lecture notes on relativistic electrodynamics',
              url: 'https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'covariant-maxwell',
              title: 'Covariant Maxwell equations from the field tensor',
              prompt:
                'Write out $F^{\\mu\\nu}$ as a 4x4 matrix in terms of $\\mathbf{E}$ and $\\mathbf{B}$ from $F = \\partial A - \\partial A$. Show that $\\partial_\\mu F^{\\mu\\nu} = \\mu_0J^\\nu$ gives Gauss\'s law ($\\nu = 0$) and the Ampere-Maxwell law ($\\nu = i$), and that the Bianchi identity gives the other two. Compute $F_{\\mu\\nu}F^{\\mu\\nu}$ and $\\epsilon_{\\mu\\nu\\lambda\\sigma}F^{\\mu\\nu}F^{\\lambda\\sigma}$ and show they are proportional to $B^2 - E^2/c^2$ and $\\mathbf{E}\\cdot\\mathbf{B}$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'field-transformations-numerical',
              title: 'Transform fields between frames',
              prompt:
                'Implement the Lorentz transformation of $F^{\\mu\\nu}$ as $\\Lambda F\\Lambda^T$ in NumPy for an arbitrary boost. Verify (a) the invariants are unchanged for random fields and boosts, (b) boosting a static Coulomb field reproduces the pancake field of a moving charge, (c) for crossed fields with $E < cB$ there is a frame where $\\mathbf{E}\' = 0$, moving at $\\mathbf{E}\\times\\mathbf{B}/B^2$ (the drift of the magnetostatics module), and (d) for $E > cB$ there is a frame where $\\mathbf{B}\' = 0$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'purcell-magnetism-from-relativity',
              title: 'Magnetism from electrostatics plus relativity',
              prompt:
                'A neutral wire contains positive ions at rest and electrons moving at speed $u$ with line density $-\\lambda$. A test charge $q$ moves parallel to the wire at speed $v$ at distance $s$. Transform to the test charge\'s rest frame, compute the line densities of ions and electrons there using relativistic velocity addition and length contraction, find the net line charge and the electric force on $q$, and transform the force back to the lab. Show it equals $qvB$ with $B = \\mu_0I/2\\pi s$, to all orders in $u$ and $v$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are E and B not separately meaningful in relativity?',
              answerOutline:
                'They are components of the single antisymmetric tensor F^{mu nu}, which mixes them under boosts; what one observer calls electric another calls partly magnetic.',
            },
            {
              question: 'What are the Lorentz invariants of the electromagnetic field and what do they tell you?',
              answerOutline:
                'E^2 - c^2 B^2 and E dot B; e.g. if E dot B = 0 and E < cB there is a frame with pure magnetic field; a pure B field can never become pure E.',
            },
            {
              question: 'How many independent covariant equations are Maxwell\'s equations, and which ones are automatic given A^mu?',
              answerOutline:
                'Two tensor equations: d_mu F^{mu nu} = mu_0 J^nu (inhomogeneous) and the Bianchi identity, which holds automatically when F is derived from a potential.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'field-solver-for-a-real-device',
    title: 'Capstone: a field solver applied to a real device',
    description: `Choose a real device and build a numerical field solver that predicts its behaviour, together with an analytic derivation of the result the solver should reproduce in some limit. Suggested options:

- **Electrostatic**: a microstrip or coplanar-waveguide transmission line (solve Laplace's equation with dielectrics by relaxation or sparse direct methods, extract capacitance per unit length and characteristic impedance, compare with published closed-form approximations and the ideal parallel-plate limit), or an electrostatic lens for electrons (trace trajectories and find the focal length).
- **Electrodynamic**: an FDTD simulation of a dielectric waveguide, a rectangular metal waveguide (cutoff frequencies and mode patterns), a Fabry-Perot cavity or thin-film coating (compare with the Fresnel and multilayer transfer-matrix result), or a half-wave dipole antenna (radiation pattern and radiation resistance, compare with the analytic $73\\,\\Omega$).

Your solver must be validated: show convergence with grid spacing, check a case with a known analytic solution, and quantify numerical dispersion or discretisation error. Then use it to answer a design question the analytic theory cannot, such as the impedance of a line with finite ground width, the bandwidth of a coating at oblique incidence, or the pattern of an antenna near a ground plane.

Write it up as a technical report: physics and derivation, numerical method and validation, results, comparison with literature or measurement, and limitations.`,
    deliverables: [
      'A derivation (Markdown or LaTeX) of the analytic result for the chosen device, including all assumptions',
      'A documented Python solver (relaxation or FDTD) with convergence tests and at least one exact validation case',
      'Figures: field maps, convergence plots, and the comparison between numerical, analytic and published results',
      'An 8-12 page technical report with a design question answered by the solver',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Implement perfectly matched layer (PML) absorbing boundaries and quantify the reflection they produce',
      'Compare your results with an established open-source solver such as MEEP',
      'Build the device (e.g. a PCB microstrip or a wire dipole) and measure it with an inexpensive VNA',
    ],
  },
  masteryChecklist: [
    'I can compute electric fields and potentials of charge distributions by direct integration, Gauss\'s law, or numerically, and check them with limits and symmetry',
    'I can solve electrostatic boundary-value problems by images, separation of variables and numerical relaxation, and justify the answer with the uniqueness theorems',
    'I can describe the response of matter to fields with P, D, M and H, apply the boundary conditions, and relate macroscopic constants to microscopic models',
    'I can compute magnetic fields from Biot-Savart, Ampere\'s law and the vector potential, and describe magnetic dipoles and their forces and torques',
    'I can apply Faraday\'s law to motional and transformer EMFs, compute inductances and magnetic energy, and analyse simple circuits as field problems',
    'I can write Maxwell\'s equations in differential and integral form, derive the wave equation, energy and momentum conservation, and the Fresnel equations',
    'I can solve for potentials in Lorenz gauge, derive dipole radiation and the Larmor formula, and explain the radiation of an accelerated charge',
    'I can write electrodynamics in four-vector and field-tensor form, transform fields between frames, and implement and validate an FDTD Maxwell solver',
  ],
});
