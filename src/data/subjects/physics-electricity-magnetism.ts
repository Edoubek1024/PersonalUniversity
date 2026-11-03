import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const openstax2 = (note: string): ResourceInput => ({
  title: 'OpenStax University Physics Volume 2',
  url: 'https://openstax.org/details/books/university-physics-volume-2',
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary: true,
});

const openstax3 = (note: string): ResourceInput => ({
  title: 'OpenStax University Physics Volume 3',
  url: 'https://openstax.org/details/books/university-physics-volume-3',
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary: true,
});

const mit802 = (note: string): ResourceInput => ({
  title: 'MIT 8.02 Physics II: Electricity and Magnetism',
  url: 'https://ocw.mit.edu/courses/8-02-physics-ii-electricity-and-magnetism-spring-2007/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const phet = (name: string, slug: string, note: string): ResourceInput => ({
  title: `PhET simulation: ${name}`,
  url: `https://phet.colorado.edu/en/simulations/${slug}`,
  type: 'interactive',
  cost: 'free',
  provider: 'PhET, University of Colorado Boulder',
  note,
});

const hyperphysics = (note: string): ResourceInput => ({
  title: 'HyperPhysics',
  url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html',
  type: 'article',
  cost: 'free',
  provider: 'Georgia State University',
  note,
});

const falstad = (note: string): ResourceInput => ({
  title: 'Falstad Circuit Simulator',
  url: 'https://www.falstad.com/circuit/',
  type: 'tool',
  cost: 'free',
  provider: 'Paul Falstad',
  note,
});

export default defineSubject({
  id: 'physics-electricity-magnetism',
  title: 'University Physics: Electricity and Magnetism (PHYS 212)',
  category: 'physics',
  tagline:
    'Calculus-based introductory electricity and magnetism: fields, circuits, induction, electromagnetic waves and optics.',
  description: `This course follows the topics of PHYS 212 (University Physics: Electricity and Magnetism) at the University of Illinois Urbana-Champaign, as given in the public catalog description. It is original work and is not affiliated with Illinois; nothing here comes from its lectures, homework or exams.

Electric and magnetic forces hold atoms together and run almost every device you own. In this course you follow one idea, the field, from a single charge through circuits, motors and generators, to the discovery that light is an electromagnetic wave. Unlike mechanics, you cannot see most of what is going on. So the course leans on pictures: field lines, symmetric Gaussian surfaces and vector diagrams drawn before any integral.

The method from mechanics carries over. Draw the situation, use symmetry, solve in symbols, then check units, size and limits. Typical sizes matter here: a coulomb is enormous, a volt is familiar, and a tesla is a very strong field. You will learn to notice when an answer is off by a factor of a million.

The course assumes the mechanics course and Calculus II, and expects Calculus III alongside it. Flux and line integrals are used only in simple, symmetric cases where they reduce to ordinary multiplication. There is no lab equipment: you use PhET simulations, a circuit simulator and short Python models. \`electromagnetism\` is the next step, and treats the same physics with full vector calculus.

Constants used throughout: $k = 8.99\\times 10^{9}\\ \\mathrm{N\\,m^2/C^2}$, $\\epsilon_0 = 8.85\\times 10^{-12}\\ \\mathrm{F/m}$, $\\mu_0 = 4\\pi\\times 10^{-7}\\ \\mathrm{T\\,m/A}$, $e = 1.60\\times 10^{-19}\\ \\mathrm{C}$ and $c = 3.00\\times 10^{8}\\ \\mathrm{m/s}$.`,
  difficulty: 'intermediate',
  estimatedHours: 100,
  prerequisites: ['physics-mechanics', 'calculus-2'],
  recommendedBackground: [
    'Calculus III alongside this course, for the idea of line and surface integrals',
    'Comfort with vectors, dot products and cross products',
    'Basic Python for the projects: loops, NumPy arrays and plots',
  ],
  tags: ['electricity', 'magnetism', 'circuits', 'induction', 'maxwell', 'optics', 'electromagnetic waves', 'problem solving'],
  core: false,
  modules: [
    {
      slug: 'electric-fields',
      title: 'Electric Fields',
      description:
        'Charge, the force between charges, the idea of a field, and how to add up the field of a continuous charge.',
      lessons: [
        {
          slug: 'charge-and-coulombs-law',
          title: "Charge and Coulomb's law",
          summary:
            'Electric charge, conductors and insulators, the inverse-square force between charges, and adding forces as vectors.',
          estimatedMinutes: 170,
          objectives: [
            'Describe charge as quantised and conserved',
            'Distinguish conductors from insulators',
            "Apply Coulomb's law with correct direction",
            'Add electric forces from several charges by components',
          ],
          concepts: [
            'Positive and negative charge',
            'Elementary charge',
            'Conservation of charge',
            'Conductors and insulators',
            "Coulomb's law",
            'Superposition',
          ],
          explanation: `Charge is a property of matter that comes in two kinds, positive and negative. Like charges repel and unlike charges attract. All observed free charge comes in whole multiples of the **elementary charge** $e = 1.60\\times 10^{-19}\\ \\mathrm{C}$, and total charge is conserved. Rubbing a balloon does not make charge. It moves electrons from one object to another.

In a **conductor**, some electrons are free to move through the material. In an **insulator**, they stay bound to their atoms.

The force between two small charges is given by **Coulomb's law**:

$$F = \\frac{k|q_1q_2|}{r^2}, \\qquad k = \\frac{1}{4\\pi\\epsilon_0} = 8.99\\times 10^{9}\\ \\mathrm{N\\,m^2/C^2}.$$

The force acts along the line joining the charges. Use the magnitude from the formula, and find the direction from a sketch. **Superposition** says that the force from several charges is the vector sum of the separate forces, each calculated as if the others were not there.

One coulomb is huge: it is about $6.2\\times 10^{18}$ electrons. Lab charges are measured in nC or μC.

**Worked example.** Charge $q_1 = +2.0\\ \\mathrm{\\mu C}$ sits at the origin and $q_2 = -3.0\\ \\mathrm{\\mu C}$ at $(0.30,\\ 0)\\ \\mathrm{m}$. Find the force on $q_3 = +1.0\\ \\mathrm{\\mu C}$ at $(0,\\ 0.40)\\ \\mathrm{m}$.

Sketch all three. $q_1$ repels $q_3$ straight up with size

$$F_1 = \\frac{(8.99\\times 10^{9})(2.0\\times 10^{-6})(1.0\\times 10^{-6})}{(0.40)^2} = 0.112\\ \\mathrm{N}.$$

$q_2$ attracts $q_3$ toward it. The distance is $0.50\\ \\mathrm{m}$, a 3-4-5 triangle, so the size is $F_2 = 0.108\\ \\mathrm{N}$. The direction is down and to the right, along $(0.6,\\ -0.8)$. That gives components of $(0.065,\\ -0.086)\\ \\mathrm{N}$.

Add the components: $\\vec F = (0.065,\\ 0.026)\\ \\mathrm{N}$, of size $0.070\\ \\mathrm{N}$ at $22^\\circ$ above the $+x$ axis. Check: the net force is smaller than either part, since they partly cancel in the vertical direction. The units are right, and microcoulomb charges a few tenths of a metre apart give forces of a tenth of a newton, a sensible size.

Compare with gravity. In a hydrogen atom the electric force between electron and proton is $2.3\\times 10^{39}$ times the gravitational force. Gravity wins on large scales only because matter is neutral overall.

**Pitfalls.** Convert μC and cm first. Do not put signs into the formula and then also pick a direction from a sketch: use one method. Forces add as vectors, never as plain numbers.`,
          resources: [
            openstax2("Read the chapter on electric charges and fields, through Coulomb's law."),
            phet("Coulomb's Law", 'coulombs-law', 'Test the dependence on distance and on charge.'),
            mit802('Use the opening lectures on charge and force.'),
          ],
          exercises: [
            {
              slug: 'hydrogen-force',
              title: 'Forces in a hydrogen atom',
              prompt:
                'The electron and proton in hydrogen are $5.29\\times 10^{-11}\\ \\mathrm{m}$ apart. Find the electric force between them, and its ratio to the gravitational force. Using $m_e = 9.11\\times 10^{-31}\\ \\mathrm{kg}$ and $m_p = 1.67\\times 10^{-27}\\ \\mathrm{kg}$, explain why the ratio does not depend on the distance.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The force is $8.2\\times 10^{-8}\\ \\mathrm{N}$, and the ratio is $2.3\\times 10^{39}$. Both forces go as $1/r^2$.',
            },
            {
              slug: 'count-and-weigh',
              title: 'Sizes of charge',
              prompt:
                '(a) How many electrons make up $1.0\\ \\mathrm{\\mu C}$? (b) Two small beads carry $+1.0\\ \\mathrm{\\mu C}$ and $-1.0\\ \\mathrm{\\mu C}$, $10\\ \\mathrm{cm}$ apart. Find the mass whose weight equals the force between them, in kilograms.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $6.2\\times 10^{12}$; (b) about $0.092\\ \\mathrm{kg}$, the weight of a small apple.',
            },
            {
              slug: 'zero-force-point',
              title: 'Where is the force zero?',
              prompt:
                'A $+2.0\\ \\mathrm{nC}$ charge and a $+1.0\\ \\mathrm{nC}$ charge are $0.30\\ \\mathrm{m}$ apart. Where on the line between them does a test charge feel no net force? Solve in symbols. Then say whether any such point exists on that line if the second charge is negative, and where it would lie.',
              kind: 'problem',
              difficulty: 2,
              hint: 'For like charges, the point is $d/(1 + \\sqrt 2) = 0.12\\ \\mathrm{m}$ from the smaller charge. For unlike charges, it lies outside the pair, beyond the smaller charge.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does it mean to say charge is quantised and conserved?',
              answerOutline: 'Free charge comes in multiples of $e$, and the total in an isolated system never changes.',
            },
            {
              question: 'Why does the much stronger electric force not dominate at the scale of planets?',
              answerOutline: 'Bulk matter is almost exactly neutral, so electric forces cancel while gravity always adds.',
            },
            {
              question: 'How do you find the net force from several charges?',
              answerOutline: 'Find each force separately and add them as vectors, by components.',
            },
          ],
          relatedLessons: ['electromagnetism/electrostatics/coulombs-law-and-the-electric-field'],
        },
        {
          slug: 'the-electric-field',
          title: 'The electric field',
          summary:
            'The field as force per unit charge, field lines, the dipole, and charges moving through a uniform field.',
          estimatedMinutes: 170,
          objectives: [
            'Define the electric field and compute it for point charges',
            'Read field lines correctly',
            'Find the field of a dipole on its bisector',
            'Predict the motion of a charged particle in a uniform field',
          ],
          concepts: [
            'Electric field',
            'Test charge',
            'Field lines',
            'Superposition of fields',
            'Electric dipole',
            'Motion in a uniform field',
          ],
          explanation: `Rather than saying that charges act on each other across empty space, we say that a charge creates a **field** in the space around it, and that the field acts on anything placed there. The field at a point is the force per unit charge on a small test charge:

$$\\vec E = \\frac{\\vec F}{q_0}, \\qquad \\vec F = q\\vec E.$$

Its unit is N/C. The field exists whether or not a charge is there to feel it. A point charge $Q$ has

$$E = \\frac{k|Q|}{r^2},$$

pointing away from positive charge and toward negative charge. A negative charge placed in a field feels a force opposite to $\\vec E$.

**Field lines** help you see this. They start on positive charges and end on negative ones. Their direction at any point gives $\\vec E$, and where they crowd together the field is strong. They never cross.

**Worked example.** Two charges $+1.0\\ \\mathrm{nC}$ and $-1.0\\ \\mathrm{nC}$ form a **dipole**, $4.0\\ \\mathrm{cm}$ apart on the $x$ axis. Find the field at a point $3.0\\ \\mathrm{cm}$ along the perpendicular bisector.

Each charge is $r = \\sqrt{2.0^2 + 3.0^2} = 3.6\\ \\mathrm{cm}$ from the point, so the two fields have equal size. Sketch them. The $+$ charge pushes away, and the $-$ charge pulls toward. Their components along the bisector cancel by symmetry, and those along the axis add, pointing from the $+$ charge's side to the $-$ charge's side. If $a = 2.0\\ \\mathrm{cm}$ is half the separation, each charge gives an axial part $(kq/r^2)(a/r)$, so

$$E = \\frac{2kqa}{r^3} = 7.7\\times 10^{3}\\ \\mathrm{N/C}.$$

Check: units are N/C. Far away, with $r \\gg a$, this falls as $1/r^3$, faster than for one charge, because the two charges nearly cancel. That is the mark of a dipole. The product $p = 2qa$ is called the **dipole moment**.

**Moving charges.** In a uniform field, the force $qE$ is constant, so the motion is just projectile motion, with a much stronger "gravity". For an electron in $1000\\ \\mathrm{N/C}$,

$$a = \\frac{eE}{m_e} = 1.8\\times 10^{14}\\ \\mathrm{m/s^2}.$$

Here gravity is about $10^{13}$ times too small to matter. This is how old cathode-ray screens steered electrons.

**Pitfalls.** A field line is not a path: a charge's acceleration, not its velocity, lies along the field. Add fields as vectors, using symmetry first to see which components cancel. And do not include the charge's own field when finding the force on it.`,
          resources: [
            openstax2('Read the rest of the chapter on electric charges and fields: the field, field lines, and dipoles.'),
            phet('Charges and Fields', 'charges-and-fields', 'Place charges and map the field with sensors. Build a dipole.'),
            {
              title: 'Falstad 2D Electrostatic Field Applet',
              url: 'https://www.falstad.com/vector2de/',
              type: 'interactive',
              cost: 'free',
              provider: 'Paul Falstad',
              note: 'Browse preset field patterns to build intuition.',
            },
          ],
          exercises: [
            {
              slug: 'field-of-charges',
              title: 'Fields of point charges',
              prompt:
                '(a) Find the field $3.0\\ \\mathrm{cm}$ from a $5.0\\ \\mathrm{nC}$ charge. (b) Charges $+4.0\\ \\mathrm{nC}$ and $-4.0\\ \\mathrm{nC}$ are $10\\ \\mathrm{cm}$ apart. Find the size and direction of the field at the midpoint.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $5.0\\times 10^{4}\\ \\mathrm{N/C}$; (b) the two fields add: $2.9\\times 10^{4}\\ \\mathrm{N/C}$, toward the negative charge.',
            },
            {
              slug: 'electron-between-plates',
              title: 'Steering an electron',
              prompt:
                'An electron enters a region of uniform field $1000\\ \\mathrm{N/C}$, $2.0\\ \\mathrm{cm}$ long, moving at $2.0\\times 10^{7}\\ \\mathrm{m/s}$ at right angles to the field. Find the acceleration, the time in the field, and the sideways deflection. Use the projectile method. Compare the electric force with the electron\'s weight.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Acceleration $1.8\\times 10^{14}\\ \\mathrm{m/s^2}$; time $1.0\\ \\mathrm{ns}$; deflection about $0.088\\ \\mathrm{mm}$.',
            },
            {
              slug: 'dipole-falloff',
              title: 'Test the dipole law',
              prompt:
                'Write a Python function for the field of two opposite charges at any point, using vector superposition. Evaluate $|\\vec E|$ along the bisector for $r$ from $5a$ to $100a$, and plot it on log-log axes. Fit the slope, and confirm it approaches $-3$. Then show from the exact formula why the slope is not $-3$ at small $r$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use `numpy.polyfit` on the logs of the values.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the direction of the force on an electron in a field pointing east?',
              answerOutline: 'West, since $\\vec F = q\\vec E$ and the charge is negative.',
            },
            {
              question: 'Why does a dipole field fall faster than the field of a single charge?',
              answerOutline: 'From far away, the opposite charges nearly cancel.',
            },
            {
              question: 'Do field lines show the path a charge will take?',
              answerOutline: 'Not in general. They show the direction of the force, and so of the acceleration.',
            },
          ],
        },
        {
          slug: 'continuous-charge-distributions',
          title: 'Continuous charge distributions',
          summary:
            'Turning a sum over charges into an integral, with the ring, the rod, the line and the plane.',
          estimatedMinutes: 190,
          objectives: [
            'Set up an integral for the field of a charged object',
            'Use symmetry to remove components before integrating',
            'Derive the field on the axis of a charged ring',
            'State the fields of a long line and a large plane',
          ],
          concepts: [
            'Linear, surface and volume charge density',
            'dq and the element of field',
            'Symmetry cancellation',
            'Field on the axis of a ring',
            'Long-line field',
            'Large-plane field',
          ],
          explanation: `Real charged objects are not points, so we add up many small pieces. Chop the object into pieces of charge $dq$, each acting as a point charge, and integrate:

$$\\vec E = \\int \\frac{k\\,dq}{r^2}\\hat r.$$

Use a density to replace $dq$: $dq = \\lambda\\,dx$ for a line, $dq = \\sigma\\,dA$ for a surface, and $dq = \\rho\\,dV$ for a volume.

The recipe has four steps. Sketch a typical $dq$ and the small field $d\\vec E$ it makes. Use **symmetry** to see which components cancel. Write the surviving component in terms of one variable. Integrate, and test the result in a limit.

**Worked example.** A thin ring of radius $R$ carries a total charge $Q$ spread evenly. Find the field at a point on its axis, a distance $z$ from the centre.

Every piece $dq$ is the same distance $r = \\sqrt{z^2 + R^2}$ from the point. The piece on the opposite side of the ring makes a field whose sideways part cancels, so only the part along the axis survives. That is $dE_z = dE\\cos\\alpha$ with $\\cos\\alpha = z/r$:

$$dE_z = \\frac{k\\,dq}{r^2}\\cdot\\frac{z}{r}.$$

Since $r$ and $z$ are the same for every piece, the integral is just the sum of the $dq$:

$$E_z = \\frac{kQz}{(z^2 + R^2)^{3/2}}.$$

Check two limits. At the centre, $z = 0$ and $E = 0$, as symmetry requires. Far away, with $z \\gg R$, $E \\to kQ/z^2$, the field of a point charge. For $Q = 10\\ \\mathrm{nC}$, $R = 5.0\\ \\mathrm{cm}$ and $z = 10\\ \\mathrm{cm}$, it gives $E = 6.4\\times 10^{3}\\ \\mathrm{N/C}$. The field is greatest at $z = R/\\sqrt 2$, which is $3.5\\ \\mathrm{cm}$ here.

**Two results to remember.** Integrating over a long straight line with charge per unit length $\\lambda$ gives

$$E = \\frac{2k\\lambda}{r},$$

falling as $1/r$. Stacking up rings to build a large flat sheet with charge per unit area $\\sigma$ gives

$$E = \\frac{\\sigma}{2\\epsilon_0},$$

which does not depend on distance at all. The reason is that as you move away, you see more of the sheet at a less helpful angle, and the two effects cancel.

So the dimension of the source controls the falloff: $1/r^2$ for a point, $1/r$ for a line, and constant for a plane. In the next module, Gauss's law will give these last two results almost without calculus.

**Pitfalls.** Never integrate the sizes $dE$ blindly when directions vary. Check which variable changes as you move around the object. And $r$ may change along the integral: on a rod it does, while on a ring it does not.`,
          resources: [
            openstax2('Read the section on calculating electric fields of charge distributions.'),
            hyperphysics('Look up electric field of a ring, a line and a plane.'),
            mit802('Work the material on continuous charge distributions.'),
          ],
          exercises: [
            {
              slug: 'rod-on-axis',
              title: 'Field beyond the end of a rod',
              prompt:
                'A uniform rod of length $L$ and total charge $Q$ lies along the $x$ axis from $0$ to $L$. Show that at a point on the axis a distance $d$ beyond the end, $E = kQ/[d(d + L)]$. Check the limit $d \\gg L$. Evaluate for $Q = 5.0\\ \\mathrm{nC}$, $L = 0.20\\ \\mathrm{m}$, $d = 0.10\\ \\mathrm{m}$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use $dq = (Q/L)\\,dx$ at distance $L + d - x$. The answer is $1.5\\times 10^{3}\\ \\mathrm{N/C}$.',
            },
            {
              slug: 'line-and-sheet',
              title: 'Line and sheet values',
              prompt:
                '(a) Find the field $5.0\\ \\mathrm{cm}$ from a long wire with $\\lambda = 2.0\\ \\mathrm{nC/m}$. (b) Find the field near a large sheet with $\\sigma = 3.0\\ \\mathrm{nC/m^2}$. (c) By what factor does each change if you double the distance?',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $719\\ \\mathrm{N/C}$; (b) $169\\ \\mathrm{N/C}$; (c) halves, and no change.',
            },
            {
              slug: 'integrate-numerically',
              title: 'Integrate a field numerically',
              prompt:
                'Compute the field on the axis of a ring by splitting it into $N$ point charges and adding the vectors with NumPy. Compare with the exact formula for $N = 4, 16, 64$. Then build a uniform disc from concentric rings, and show that near the centre the field approaches $\\sigma/2\\epsilon_0$.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The exact disc result is $(\\sigma/2\\epsilon_0)(1 - z/\\sqrt{z^2 + R^2})$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the integral for a ring on its axis so easy?',
              answerOutline: 'Every $dq$ is the same distance away and at the same angle, so $r$ and $\\cos\\alpha$ are constant.',
            },
            {
              question: 'How does the field fall with distance for a point, a line and a plane?',
              answerOutline: '$1/r^2$, $1/r$, and constant.',
            },
            {
              question: 'How do you test a formula for a charged ring or rod?',
              answerOutline: 'Check that it approaches the point-charge result at large distance, and that symmetry gives zero where expected.',
            },
          ],
        },
      ],
      project: {
        slug: 'electric-field-map',
        title: 'An electric field mapper',
        description: `Write a Python program that takes a list of point charges and draws the field they produce. Use NumPy to evaluate $\\vec E$ on a grid by superposition, and \`matplotlib.pyplot.streamplot\` to draw field lines, with colour showing $\\log_{10}|\\vec E|$.

Extend it to continuous objects by replacing a rod or ring with many small charges, and test your results against the formulas from the lesson. Finish with a small scientific question: how far from a dipole, or from a line of 10 charges, does the simple approximate formula work to within $1\\%$?`,
        deliverables: [
          'A Python function that returns the field vector at any point for any list of charges',
          'Field-line plots of a single charge, a dipole, and two like charges',
          'A plot for a line of many charges, compared with the long-line formula',
          'A test that the ring field on its axis matches the exact formula to within 1 percent',
          'A plot of relative error against distance, answering the 1 percent question',
        ],
        estimatedHours: 5,
        stretchGoals: [
          'Trace a single field line by stepping along the local direction of the field',
          'Compute and draw equipotential contours once you reach the next module',
        ],
      },
    },
    {
      slug: 'gauss-law-and-potential',
      title: "Gauss's Law and Electric Potential",
      description:
        'Two powerful shortcuts: a theorem that gives fields from symmetry, and a scalar potential that plays the part of energy per unit charge.',
      lessons: [
        {
          slug: 'flux-and-gauss-law',
          title: "Flux and Gauss's law",
          summary:
            'Electric flux through a surface, and how symmetry and a well-chosen surface give the field in a few lines.',
          estimatedMinutes: 190,
          objectives: [
            'Compute the flux of a uniform field through a flat surface',
            "State Gauss's law",
            'Choose a Gaussian surface that fits the symmetry',
            'Find fields of spheres, lines and planes',
          ],
          concepts: [
            'Electric flux',
            'Closed surface',
            'Enclosed charge',
            "Gauss's law",
            'Spherical, cylindrical and planar symmetry',
          ],
          explanation: `**Flux** measures how much field passes through a surface. For a uniform field and a flat area $A$,

$$\\Phi = \\vec E\\cdot\\vec A = EA\\cos\\theta,$$

where $\\vec A$ is perpendicular to the surface. For a curved surface, add up small pieces: $\\Phi = \\int\\vec E\\cdot d\\vec A$. On a closed surface, $d\\vec A$ points outward.

**Gauss's law** says that the net flux out of any closed surface depends only on the charge inside it:

$$\\oint\\vec E\\cdot d\\vec A = \\frac{Q_{\\text{enc}}}{\\epsilon_0}.$$

The picture: field lines start on positive charges, so the number of lines leaving a surface counts the charge inside. Charges outside send lines in and out equally. It is always true, but it is useful for finding $E$ only when symmetry makes $E$ constant over the surface. Then the integral is just $E$ times an area.

The method has four steps. Identify the symmetry. Choose a surface with that symmetry, passing through the point of interest. Argue that $E$ is constant on it, or that the flux is zero on some parts. Solve.

**Worked example.** A solid sphere of radius $R = 0.10\\ \\mathrm{m}$ has total charge $Q = 5.0\\ \\mathrm{nC}$ spread evenly through its volume. Find $E$ at $r = 0.05\\ \\mathrm{m}$ and $r = 0.20\\ \\mathrm{m}$.

By spherical symmetry $\\vec E$ is radial and depends only on $r$. Use a concentric sphere as the Gaussian surface, so that $\\oint\\vec E\\cdot d\\vec A = E\\cdot 4\\pi r^2$.

Outside, $r > R$: all the charge is enclosed, so

$$E = \\frac{Q}{4\\pi\\epsilon_0r^2} = \\frac{kQ}{r^2} = 1.1\\times 10^{3}\\ \\mathrm{N/C}\\ \\text{ at } r = 0.20\\ \\mathrm{m}.$$

So a charged sphere acts like a point charge from outside.

Inside, $r < R$: only the fraction $r^3/R^3$ of the charge is enclosed, so

$$E = \\frac{kQr}{R^3} = 2.2\\times 10^{3}\\ \\mathrm{N/C}\\ \\text{ at } r = 0.05\\ \\mathrm{m}.$$

Check: the two formulas agree at the surface, where each gives $kQ/R^2 = 4.5\\times 10^{3}\\ \\mathrm{N/C}$. The field rises linearly from zero at the centre to this peak, then falls as $1/r^2$.

This is the same mathematics as gravity inside a uniform Earth, since both are inverse-square forces.

**Other shapes.** For a long line, use a coaxial cylinder: $E(2\\pi rL) = \\lambda L/\\epsilon_0$, which gives $E = \\lambda/2\\pi\\epsilon_0r$. For a large sheet, use a short "pillbox" through the plane: $2EA = \\sigma A/\\epsilon_0$, which gives $E = \\sigma/2\\epsilon_0$. These are the results from the last lesson, with no integrals over the charge.

**Pitfalls.** The $\\vec E$ in Gauss's law comes from *all* charges, not only those inside. But only those inside affect the net flux. Zero flux does not mean zero field. And the law does not help for a cube or a finite rod, because the symmetry is not good enough.`,
          resources: [
            openstax2("Read the chapter on Gauss's law."),
            mit802("Work the material on Gauss's law, focusing on the choice of surface."),
            hyperphysics("Look up Gauss's law for spheres, lines and planes."),
          ],
          exercises: [
            {
              slug: 'flux-through-a-cube',
              title: 'Flux through a cube',
              prompt:
                'A charge of $6.0\\ \\mathrm{nC}$ sits at the centre of a cube. Find the total flux through the cube and the flux through one face. Explain why you do not need to integrate. What is the flux if the charge moves off centre, but stays inside?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Total $678\\ \\mathrm{N\\,m^2/C}$; one face $113\\ \\mathrm{N\\,m^2/C}$ by symmetry. The total stays the same; one face no longer gets a sixth.',
            },
            {
              slug: 'charged-shell',
              title: 'A hollow shell',
              prompt:
                'A thin spherical shell of radius $R$ has charge $Q$. Use Gauss\'s law to find $E$ inside and outside, and sketch $E(r)$. Where is the field discontinuous, and by how much? Compare your jump with $\\sigma/\\epsilon_0$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Inside, $E = 0$. Just outside, $E = kQ/R^2$, which equals $\\sigma/\\epsilon_0$.',
            },
            {
              slug: 'cylinder-inside',
              title: 'Inside a charged cylinder',
              prompt:
                'A long solid cylinder of radius $R$ has uniform charge density $\\rho$. Use a coaxial Gaussian cylinder to show that $E = \\rho r/2\\epsilon_0$ inside and $E = \\rho R^2/2\\epsilon_0r$ outside. Check that they agree at $r = R$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The ends of the Gaussian cylinder carry no flux, since $\\vec E$ is radial.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does Gauss\'s law say in one sentence?',
              answerOutline: 'Net outward flux through any closed surface equals enclosed charge over $\\epsilon_0$.',
            },
            {
              question: 'Why does Gauss\'s law not give the field of a finite rod easily?',
              answerOutline: 'The symmetry is too low: no surface exists on which $E$ is constant.',
            },
            {
              question: 'If the flux through a closed surface is zero, must the field be zero on it?',
              answerOutline: 'No. Only the net charge inside is zero; field lines may enter and leave.',
            },
          ],
          relatedLessons: ['electromagnetism/electrostatics/gauss-law-and-the-divergence-of-e'],
        },
        {
          slug: 'electric-potential',
          title: 'Electric potential',
          summary:
            'Potential energy per unit charge, how to get it from a field and back, and potentials of point charges.',
          estimatedMinutes: 190,
          objectives: [
            'Define potential difference and the volt',
            'Compute potential from a field and from point charges',
            'Find a field from a potential',
            'Use the electron volt and potential energy of a system of charges',
          ],
          concepts: [
            'Electric potential energy',
            'Potential and the volt',
            'Line integral of the field',
            'Potential of a point charge',
            'Equipotentials',
            'Electron volt',
          ],
          explanation: `The electric force is conservative, so it has a potential energy, just as gravity does. Dividing by the test charge gives a property of the place alone: the **electric potential**,

$$V = \\frac{U}{q}, \\qquad \\Delta V = -\\int_a^b\\vec E\\cdot d\\vec l.$$

The unit is the volt, $1\\ \\mathrm{V} = 1\\ \\mathrm{J/C}$. Think of $V$ as height, and of $q$ as mass in a uniform gravity: positive charges roll "downhill" from high potential to low. Negative charges go the other way. Only differences have meaning, so we choose a zero, usually at infinity for a local charge.

For a point charge, integrating from infinity gives

$$V = \\frac{kQ}{r}.$$

The sign of $Q$ is kept in this formula. Potential is a scalar, so for many charges you just add numbers, with no components. That makes it much easier than adding fields.

**From potential to field.** Reversing the integral gives

$$E_x = -\\frac{dV}{dx}.$$

The field points in the direction in which the potential falls fastest. **Equipotentials** are surfaces of constant $V$, and they meet field lines at right angles. In a uniform field, $E = V/d$. This shows why field is also measured in V/m.

**Worked example.** An electron starts at rest and is accelerated through a potential difference of $1000\\ \\mathrm{V}$. Find its energy and speed.

The energy lost as potential energy becomes kinetic energy: $K = eV$. In joules this is $(1.60\\times 10^{-19})(1000) = 1.6\\times 10^{-16}\\ \\mathrm{J}$. A convenient unit is the **electron volt**, the energy gained by charge $e$ across $1\\ \\mathrm{V}$, so this is simply $1000\\ \\mathrm{eV}$. Then

$$v = \\sqrt{\\frac{2eV}{m_e}} = \\sqrt{\\frac{2(1.6\\times 10^{-16})}{9.11\\times 10^{-31}}} = 1.9\\times 10^{7}\\ \\mathrm{m/s}.$$

Check: this is about $6\\%$ of the speed of light, so ignoring relativity is reasonable. No field shape or path was needed.

**Second example.** Find the potential at a point between charges $+2.0\\ \\mathrm{nC}$ and $-2.0\\ \\mathrm{nC}$ that is $5.0\\ \\mathrm{cm}$ from the positive one and $15\\ \\mathrm{cm}$ from the negative one. Just add:

$$V = kq\\left(\\frac{1}{0.05} - \\frac{1}{0.15}\\right) = 240\\ \\mathrm{V}.$$

**System energy.** To assemble charges from far apart, the work needed is $U = \\sum_{\\text{pairs}}kq_iq_j/r_{ij}$. Each pair counts once.

**Pitfalls.** High potential is not the same as a strong field: the field depends on how fast $V$ changes. A negative charge has *more* potential energy at low potential. Do not confuse $V$ (J/C), $U$ (J) and $E$ (V/m).`,
          resources: [
            openstax2('Read the chapter on electric potential.'),
            phet('Charges and Fields', 'charges-and-fields', 'Use the voltmeter tool to trace equipotentials around a dipole.'),
            mit802('Work the material on electric potential.'),
          ],
          exercises: [
            {
              slug: 'square-of-charges',
              title: 'Centre of a square',
              prompt:
                'Four $+1.0\\ \\mathrm{nC}$ charges sit at the corners of a square of side $10\\ \\mathrm{cm}$. Find the potential at the centre, and the field there. Then explain why a zero field does not imply a zero potential. Separately, find the energy to assemble three $1.0\\ \\mathrm{nC}$ charges on an equilateral triangle of side $10\\ \\mathrm{cm}$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Potential $509\\ \\mathrm{V}$; field zero by symmetry. Three pairs give $2.7\\times 10^{-7}\\ \\mathrm{J}$.',
            },
            {
              slug: 'field-from-potential',
              title: 'Field from a potential',
              prompt:
                'In a region, $V(x) = 3.0x^2 - 2.0x$ volts, with $x$ in metres. Find $E_x(x)$. Where is the field zero? In which direction is the force on an electron at $x = 2.0\\ \\mathrm{m}$?',
              kind: 'problem',
              difficulty: 2,
              hint: '$E_x = 2.0 - 6.0x$, which is zero at $x = 1/3\\ \\mathrm{m}$. At $x = 2.0\\ \\mathrm{m}$, $E_x$ is negative, so the force on an electron is toward $+x$.',
            },
            {
              slug: 'potential-of-a-ring',
              title: 'Potential of a ring',
              prompt:
                'Show that the potential on the axis of a ring is $V = kQ/\\sqrt{z^2 + R^2}$. Why is this one line, while the field took a page? Differentiate to recover the field formula from the previous module. Then, for a charge released at rest near the centre of a positive ring, describe the motion.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'A negative charge on the axis oscillates through the centre. A positive charge runs away along the axis.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which way does a positive charge accelerate relative to potential?',
              answerOutline: 'From high to low potential, along $\\vec E$.',
            },
            {
              question: 'Why is potential easier to add than field?',
              answerOutline: 'It is a scalar, so no components are needed.',
            },
            {
              question: 'How are equipotentials related to field lines?',
              answerOutline: 'They are perpendicular, since no work is done moving along an equipotential.',
            },
          ],
          relatedLessons: ['electromagnetism/electrostatics/curl-free-fields-and-the-electric-potential'],
        },
        {
          slug: 'conductors-in-equilibrium',
          title: 'Conductors in equilibrium',
          summary:
            'Why fields vanish inside metals, where the charge goes, and why sharp points discharge.',
          estimatedMinutes: 160,
          objectives: [
            'Explain why the field inside a conductor at rest is zero',
            'State where excess charge sits and how strong the surface field is',
            'Explain shielding',
            'Share charge between connected conductors',
          ],
          concepts: [
            'Electrostatic equilibrium',
            'Field inside a conductor',
            'Surface charge',
            'Surface field sigma over epsilon-naught',
            'Equipotential conductors',
            'Shielding',
          ],
          explanation: `A conductor has free electrons. If a field existed inside it, they would move. They move until they have arranged themselves so that the field inside is exactly zero. That takes a tiny fraction of a second. From this one fact, you can deduce the rest.

1. **$E = 0$ inside** the metal of a conductor at rest.
2. **Excess charge lies on the surface.** Take a Gaussian surface just inside the metal. The field is zero, so the enclosed charge is zero.
3. **Just outside, $\\vec E$ is perpendicular to the surface**, with size $E = \\sigma/\\epsilon_0$. Any sideways part would drive surface charge along.
4. **The whole conductor is one equipotential**, since no work is done moving charge inside where $E = 0$.

**Shielding.** A closed conducting shell with no charge in its cavity has zero field inside, whatever is happening outside. Charges on the outer surface rearrange to cancel any external field inside. This is why a car is a fairly safe place in a lightning storm, and why sensitive electronics live in metal boxes.

**Worked example.** Two metal spheres of radii $R_1 = 10\\ \\mathrm{cm}$ and $R_2 = 2.0\\ \\mathrm{cm}$ are far apart and joined by a thin wire. A total charge of $10\\ \\mathrm{nC}$ is put on them. How does it divide, and where is the surface field stronger?

The wire makes them one conductor, so they are at one potential. Since they are far apart, each sphere's potential is that of a point charge:

$$\\frac{kQ_1}{R_1} = \\frac{kQ_2}{R_2} \\quad\\Rightarrow\\quad \\frac{Q_1}{Q_2} = \\frac{R_1}{R_2} = 5.$$

With $Q_1 + Q_2 = 10\\ \\mathrm{nC}$, we get $Q_1 = 8.3\\ \\mathrm{nC}$ and $Q_2 = 1.7\\ \\mathrm{nC}$. The common potential is $V = kQ_1/R_1 = 749\\ \\mathrm{V}$.

The surface field of a sphere is $E = kQ/R^2 = V/R$. Since $V$ is the same for both, the smaller sphere has the field that is $5$ times stronger, even with less charge. Check: charges add up, and the two values of $V$ agree.

This explains **sharp points**: a point acts like a very small sphere, so the field near it is intense. Air breaks down at about $3\\times 10^{6}\\ \\mathrm{V/m}$. Lightning rods and static discharges from fingertips both come from this.

**Pitfalls.** Field is zero in the metal, but not necessarily in a hollow space if a charge sits in it. In that case the inner wall gets an opposite charge, and the outer wall gets the rest. Being at the same potential does not mean having the same charge. These results apply only at equilibrium; when a current flows there is a field inside the wire.`,
          resources: [
            openstax2('Read the section on conductors in electrostatic equilibrium.'),
            hyperphysics('Look up conductors and electric fields, and Van de Graaff generators.'),
            mit802('Use the material on conductors and shielding.'),
          ],
          exercises: [
            {
              slug: 'charge-in-a-shell',
              title: 'A charge in a metal shell',
              prompt:
                'A point charge $+q$ sits at the centre of a neutral metal shell with inner radius $a$ and outer radius $b$. Find the charges on the two surfaces and $E(r)$ everywhere. Sketch it. What changes outside if $+q$ moves off centre within the cavity?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Inner surface $-q$, outer surface $+q$. Moving the charge changes the inner surface distribution, but the outside field stays unchanged.',
            },
            {
              slug: 'van-de-graaff',
              title: 'Limit of a charged dome',
              prompt:
                'A metal sphere of radius $0.15\\ \\mathrm{m}$ sits in air, which breaks down at $3.0\\times 10^{6}\\ \\mathrm{V/m}$. Find the largest charge it can hold, and the corresponding potential in kV.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Charge $7.5\\times 10^{-6}\\ \\mathrm{C}$ and potential $450\\ \\mathrm{kV}$.',
            },
            {
              slug: 'why-a-car-is-safe',
              title: 'Explain shielding',
              prompt:
                'Write a paragraph explaining how the charges on a metal car body cancel an external field inside. Say what approximations go into "a car is a Faraday cage", given that it has windows and that lightning currents change quickly. Your answer must use the idea of free charges moving until the interior field is zero.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the field be zero in the metal of a conductor at rest?',
              answerOutline: 'Otherwise free electrons would move, so it would not be at rest.',
            },
            {
              question: 'Two spheres at the same potential have different radii. Which has the stronger surface field?',
              answerOutline: 'The smaller, since $E = V/R$.',
            },
            {
              question: 'Why is a conductor an equipotential?',
              answerOutline: 'With no field inside, no work is done moving charge from one point to another.',
            },
          ],
          relatedLessons: ['electromagnetism/potentials-and-conductors/conductors-and-capacitance'],
        },
      ],
    },
    {
      slug: 'capacitance-and-circuits',
      title: 'Capacitance and Circuits',
      description:
        'Storing charge, moving it through resistors, solving networks with Kirchhoff’s rules, and following circuits in time.',
      lessons: [
        {
          slug: 'capacitors-and-dielectrics',
          title: 'Capacitors and dielectrics',
          summary:
            'How two conductors store charge and energy, what a dielectric does, and how to combine capacitors.',
          estimatedMinutes: 170,
          objectives: [
            'Define capacitance and find it for parallel plates',
            'Combine capacitors in series and in parallel',
            'Compute the stored energy',
            'Explain the effect of a dielectric',
          ],
          concepts: [
            'Capacitance',
            'Parallel-plate capacitor',
            'Series and parallel combinations',
            'Stored energy',
            'Energy density of a field',
            'Dielectric constant',
          ],
          explanation: `A **capacitor** is two conductors separated by a gap. Move charge $Q$ from one to the other and a voltage $V$ appears. The ratio is fixed by geometry, and is called the **capacitance**:

$$C = \\frac{Q}{V},$$

measured in farads, $1\\ \\mathrm{F} = 1\\ \\mathrm{C/V}$. For two parallel plates of area $A$ and gap $d$, the field is $E = \\sigma/\\epsilon_0$ and $V = Ed$, which gives

$$C = \\frac{\\epsilon_0A}{d}.$$

**Energy.** Moving each small extra charge takes work $V\\,dq$. Integrating from zero gives

$$U = \\tfrac12QV = \\tfrac12CV^2.$$

The energy is stored in the field. Dividing by the volume $Ad$ gives an energy density of $\\tfrac12\\epsilon_0E^2$.

**Combinations.** Capacitors in **parallel** share a voltage, and their charges add: $C = C_1 + C_2$. In **series** they share a charge, and their voltages add: $1/C = 1/C_1 + 1/C_2$. Note that this is the reverse of resistors.

**Dielectrics.** An insulator placed in the gap has its molecules slightly polarised. This surface polarisation charge partly cancels the field, so the same charge gives a smaller voltage. The capacitance rises by the **dielectric constant**: $C = \\kappa C_0$. Water has $\\kappa \\approx 80$, and plastics about 2 to 4. A dielectric also resists breakdown better than air.

**Worked example.** Two plates of area $0.010\\ \\mathrm{m^2}$ are $1.0\\ \\mathrm{mm}$ apart, connected to a $12\\ \\mathrm{V}$ battery. Find $C$, $Q$ and $U$. Then find the new $C$ with a dielectric of $\\kappa = 3.0$.

$$C = \\frac{(8.85\\times 10^{-12})(0.010)}{1.0\\times 10^{-3}} = 88.5\\ \\mathrm{pF}.$$

So $Q = CV = 1.06\\ \\mathrm{nC}$ and $U = \\tfrac12CV^2 = 6.4\\ \\mathrm{nJ}$. Filling the gap gives $C = 266\\ \\mathrm{pF}$.

Check: the units give F. A picofarad scale is normal for such plates. Indeed, one farad with a $1\\ \\mathrm{mm}$ gap in air would need an area of $1.1\\times 10^{8}\\ \\mathrm{m^2}$, a square more than $10\\ \\mathrm{km}$ on a side. So the farad is a very large unit.

**What is held fixed?** Whether a dielectric raises or lowers the energy depends on the set-up. With the battery connected, $V$ is fixed, so $Q$ and $U$ grow by $\\kappa$. Disconnected, $Q$ is fixed, so $V$ and $U$ fall by $\\kappa$. A dielectric slab is even pulled into a charged, isolated capacitor, because that lowers the energy.

**Pitfalls.** Ask what stays constant before you start. $Q$ in $C = Q/V$ is the charge on one plate, not the sum of the two, which is zero. In a series chain the voltages split inversely with capacitance, so a small capacitor takes the largest voltage.`,
          resources: [
            openstax2('Read the chapter on capacitance.'),
            phet('Capacitor Lab: Basics', 'capacitor-lab-basics', 'Change plate area and gap, and watch charge and energy.'),
            hyperphysics('Look up capacitors and dielectric constants.'),
          ],
          exercises: [
            {
              slug: 'network-of-capacitors',
              title: 'Combine capacitors',
              prompt:
                '(a) Find the equivalent of $3.0\\ \\mathrm{\\mu F}$ and $6.0\\ \\mathrm{\\mu F}$ in series, and then in parallel. (b) $2.0\\ \\mathrm{\\mu F}$ and $4.0\\ \\mathrm{\\mu F}$ in parallel are in series with $3.0\\ \\mathrm{\\mu F}$. Find the equivalent.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $2.0\\ \\mathrm{\\mu F}$ and $9.0\\ \\mathrm{\\mu F}$; (b) $2.0\\ \\mathrm{\\mu F}$.',
            },
            {
              slug: 'camera-flash',
              title: 'A camera flash',
              prompt:
                'A $100\\ \\mathrm{\\mu F}$ capacitor is charged to $300\\ \\mathrm{V}$ and discharged through a lamp in $1.0\\ \\mathrm{ms}$. Find the energy and the average power, in kW. Explain why such a device does not just connect the lamp to its small battery.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Energy $4.5\\ \\mathrm{J}$; power $4.5\\ \\mathrm{kW}$. A small battery cannot deliver that power.',
            },
            {
              slug: 'plates-pulled-apart',
              title: 'Pulling plates apart',
              prompt:
                'An isolated charged parallel-plate capacitor has its gap doubled. Find the change in $C$, $V$, $E$ and $U$. Where did the extra energy come from? Then repeat, with the capacitor kept connected to a battery. Explain what happens to the charge and where the energy goes.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Isolated: $C$ halves, $V$ doubles, $E$ is unchanged, $U$ doubles; you did the work. Connected: $V$ is fixed, $Q$ and $U$ halve, and charge flows back into the battery.',
            },
          ],
          selfAssessment: [
            {
              question: 'Does capacitance depend on the charge stored?',
              answerOutline: 'No. It is set by geometry and material.',
            },
            {
              question: 'Why does a dielectric raise the capacitance?',
              answerOutline: 'Polarisation partly cancels the field, so the same charge needs less voltage.',
            },
            {
              question: 'Where is the energy of a capacitor stored?',
              answerOutline: 'In the electric field between the plates, with density $\\frac12\\epsilon_0E^2$.',
            },
          ],
          relatedLessons: ['electromagnetism/potentials-and-conductors/conductors-and-capacitance'],
        },
        {
          slug: 'current-resistance-and-power',
          title: 'Current, resistance and power',
          summary:
            'Current as moving charge, Ohm’s law, resistivity, the surprisingly slow drift of electrons, and electrical power.',
          estimatedMinutes: 160,
          objectives: [
            'Define current and estimate drift speed',
            'Relate resistance to resistivity and geometry',
            'Apply Ohm’s law and say when it fails',
            'Compute power dissipated and energy costs',
          ],
          concepts: [
            'Current',
            'Current density and drift speed',
            'Resistivity',
            'Ohm’s law',
            'Electrical power',
            'Kilowatt-hour',
          ],
          explanation: `**Current** is charge flow per unit time, $I = dQ/dt$, measured in amperes. By convention it points the way positive charge would move, which in a metal is opposite to the actual motion of the electrons.

In a wire, a field pushes the free electrons, which collide with atoms and settle at a small average **drift speed**. If the wire has $n$ free electrons per unit volume and area $A$, then

$$I = nAev_d.$$

**Resistance.** Many materials obey **Ohm's law**: current is proportional to voltage,

$$V = IR.$$

$R$ depends on shape and on the material's **resistivity** $\\rho$:

$$R = \\frac{\\rho L}{A}.$$

Longer wires resist more, and thicker wires less. Copper has $\\rho = 1.7\\times 10^{-8}\\ \\Omega\\,\\mathrm{m}$. Ohm's law is not a universal law. Diodes do not obey it, and even a lamp filament's resistance rises as it heats up.

**Power.** Charge dropping through voltage $V$ loses energy $qV$, so the rate is

$$P = IV = I^2R = \\frac{V^2}{R}.$$

**Worked example.** A copper wire of length $10\\ \\mathrm{m}$ and area $1.0\\ \\mathrm{mm^2}$ carries $2.0\\ \\mathrm{A}$. It has $n = 8.5\\times 10^{28}\\ \\mathrm{m^{-3}}$. Find the drift speed, the resistance and the power lost as heat.

Convert first: $A = 1.0\\times 10^{-6}\\ \\mathrm{m^2}$. The drift speed is

$$v_d = \\frac{I}{nAe} = \\frac{2.0}{(8.5\\times 10^{28})(1.0\\times 10^{-6})(1.60\\times 10^{-19})} = 1.5\\times 10^{-4}\\ \\mathrm{m/s}.$$

That is slower than a snail: about $1.9$ hours per metre. So why do lights turn on at once? The wire is already full of electrons, and the field that starts them moving spreads along the wire at close to the speed of light. The electrons themselves still crawl. Think of water in a hose that is already full.

$$R = \\frac{(1.7\\times 10^{-8})(10)}{1.0\\times 10^{-6}} = 0.17\\ \\Omega, \\qquad P = I^2R = (2.0)^2(0.17) = 0.68\\ \\mathrm{W}.$$

Check: a small resistance and a small heating fit a household cable that stays cool under moderate current.

**Pitfalls.** Use the right power form. $P = V^2/R$ uses the voltage across that resistor, not the whole supply. A battery has **internal resistance**, so its terminal voltage drops under load. And power lines run at high voltage for a reason: for fixed $P = IV$, a higher $V$ means less $I$ and much less $I^2R$ loss.

Energy bills count kilowatt-hours: $1\\ \\mathrm{kWh} = 3.6\\ \\mathrm{MJ}$, the energy of one kilowatt for one hour.`,
          resources: [
            openstax2('Read the chapter on current and resistance.'),
            phet('Resistance in a Wire', 'resistance-in-a-wire', 'Connect the sliders to the formula for R.'),
            phet("Ohm's Law", 'ohms-law', 'See the relation between V, I and R.'),
          ],
          exercises: [
            {
              slug: 'lamp-and-heater',
              title: 'Household numbers',
              prompt:
                '(a) A $60\\ \\mathrm{W}$ lamp runs at $120\\ \\mathrm{V}$. Find its current and its resistance while running. (b) A $1500\\ \\mathrm{W}$ heater runs for 2 hours a day for 30 days. Find the energy used, in kWh.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $0.50\\ \\mathrm{A}$ and $240\\ \\Omega$; $90\\ \\mathrm{kWh}$.',
            },
            {
              slug: 'wire-design',
              title: 'Choosing a wire',
              prompt:
                'Find the resistance of $2.0\\ \\mathrm{m}$ of copper wire $1.0\\ \\mathrm{mm}$ in diameter. Aluminium has $\\rho = 2.8\\times 10^{-8}\\ \\Omega\\,\\mathrm{m}$. For wires of equal length and equal resistance, by what factor must the aluminium area be larger? Given that its density is about $0.30$ of copper\'s, which is lighter?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Copper: $0.043\\ \\Omega$. The area ratio is $1.6$, so aluminium has about half the mass. This is why power lines use it.',
            },
            {
              slug: 'transmission-loss',
              title: 'Why transmission lines use high voltage',
              prompt:
                'A town needs $10\\ \\mathrm{MW}$ through a line of total resistance $5.0\\ \\Omega$. Find the current and the power lost in the line at $10\\ \\mathrm{kV}$ and at $200\\ \\mathrm{kV}$. Give each loss as a percentage of the power sent. Comment on the first result.',
              kind: 'problem',
              difficulty: 2,
              hint: 'At $10\\ \\mathrm{kV}$, $I = 1000\\ \\mathrm{A}$ and the loss is $5.0\\ \\mathrm{MW}$, half of it. At $200\\ \\mathrm{kV}$, $I = 50\\ \\mathrm{A}$ and the loss is $12.5\\ \\mathrm{kW}$, or $0.125\\%$.',
            },
          ],
          selfAssessment: [
            {
              question: 'If electrons drift so slowly, why does a lamp light almost at once?',
              answerOutline: 'The wire is full of electrons, and the field that starts them moving spreads at near light speed.',
            },
            {
              question: 'How does the resistance of a wire change if you double both its length and its diameter?',
              answerOutline: 'Length doubles it, while area becomes four times greater. The net is one half.',
            },
            {
              question: 'Why is $P = I^2R$ the key to choosing high-voltage transmission?',
              answerOutline: 'Higher voltage means less current for the same power, and loss goes as the square of the current.',
            },
          ],
          relatedLessons: ['electromagnetism/electrodynamics-and-induction/ohms-law-emf-and-motional-emf'],
        },
        {
          slug: 'kirchhoffs-rules',
          title: "Kirchhoff's rules",
          summary:
            'Series and parallel reduction, then the two rules that solve any network, with a linear system when needed.',
          estimatedMinutes: 190,
          objectives: [
            'Reduce series and parallel resistor networks',
            'State the junction and loop rules and what each conserves',
            'Write and solve loop equations with consistent signs',
            'Solve larger networks with NumPy',
          ],
          concepts: [
            'Series and parallel resistors',
            'EMF and internal resistance',
            'Junction rule',
            'Loop rule',
            'Sign conventions',
            'Linear systems',
          ],
          explanation: `Resistors in **series** carry the same current, so $R = R_1 + R_2$. In **parallel** they share a voltage, so $1/R = 1/R_1 + 1/R_2$. A parallel combination is always smaller than its smallest member. Many circuits can be reduced this way, one step at a time.

Some cannot, for example when two batteries sit in different branches. Then use **Kirchhoff's rules**:

- **Junction rule:** the currents into any junction sum to zero. This is conservation of charge.
- **Loop rule:** the voltage changes around any closed loop sum to zero. This is conservation of energy, since potential has a single value at each point.

**Method.** Label a current in each branch, with a guessed direction. Write a junction equation. Go round each independent loop in a chosen sense, and add: a resistor gives $-IR$ if you travel with the current, and $+IR$ against it. A battery gives $+\\mathcal E$ going from its negative to its positive terminal. Solve the linear system. A negative answer means only that you guessed the direction wrong.

**Worked example.** A $12\\ \\mathrm{V}$ battery in series with $R_1 = 2.0\\ \\Omega$ forms the left branch, and a $6.0\\ \\mathrm{V}$ battery in series with $R_2 = 4.0\\ \\Omega$ forms the right branch. A shared middle branch has $R_3 = 3.0\\ \\Omega$. Both batteries have their positive terminals toward the top junction. Take $I_1$ and $I_2$ flowing up the outer branches into the top junction, and $I_3$ flowing down the middle.

Junction: $I_1 + I_2 = I_3$.

Left loop: $12 - 2.0I_1 - 3.0I_3 = 0$.

Right loop: $6.0 - 4.0I_2 - 3.0I_3 = 0$.

Substitute, or solve by matrix, to get

$$I_1 = 2.54\\ \\mathrm{A}, \\quad I_2 = -0.23\\ \\mathrm{A}, \\quad I_3 = 2.31\\ \\mathrm{A}.$$

The negative $I_2$ is a real finding: the current runs *down* through the $6.0\\ \\mathrm{V}$ battery, so the stronger battery is charging the weaker one. Check with the outer loop, which we did not use: $12 - 2.0I_1 + 4.0I_2 - 6.0$ should vanish. Equivalently, $2.0I_1 - 4.0I_2 = 6.0\\ \\mathrm{V}$, which holds.

With $n$ branches you have $n$ unknowns. For a large network, writing this as $A\\vec I = \\vec b$ and using \`numpy.linalg.solve\` is much safer than algebra by hand.

**Real batteries.** A real battery is an ideal EMF in series with a small internal resistance $r$. Its terminal voltage is $V = \\mathcal E - Ir$, so it sags under load.

**Pitfalls.** Be consistent about signs within a loop. Choose only independent loops: a third loop adds nothing new here. Keep the junction equation, since the loop equations alone are not enough.`,
          resources: [
            openstax2('Read the chapter on direct-current circuits through Kirchhoff’s rules.'),
            phet('Circuit Construction Kit: DC', 'circuit-construction-kit-dc', 'Build the worked example and read the currents with an ammeter.'),
            falstad('Paste in a small network and watch the current flow.'),
          ],
          exercises: [
            {
              slug: 'reduce-and-load',
              title: 'Reduction and a real battery',
              prompt:
                '(a) $3.0\\ \\Omega$ and $6.0\\ \\Omega$ in parallel are in series with $4.0\\ \\Omega$. Find the equivalent. (b) A battery with $\\mathcal E = 12\\ \\mathrm{V}$ and $r = 0.50\\ \\Omega$ drives a $5.5\\ \\Omega$ load. Find the current and the terminal voltage.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $6.0\\ \\Omega$; (b) $2.0\\ \\mathrm{A}$ and $11\\ \\mathrm{V}$.',
            },
            {
              slug: 'bridge',
              title: 'A bridge circuit',
              prompt:
                'A $10\\ \\mathrm{V}$ supply feeds two arms in parallel: $R_1 = 100\\ \\Omega$ then $R_2 = 200\\ \\Omega$, and $R_3 = 300\\ \\Omega$ then $R_4 = 300\\ \\Omega$. A $100\\ \\Omega$ resistor joins the middle points. This circuit cannot be reduced by series and parallel. Write node equations for the two middle-point voltages, solve with NumPy, and find the bridging current. Show that the bridging current vanishes if $R_1/R_2 = R_3/R_4$.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The middle voltages are about $6.32\\ \\mathrm{V}$ and $5.79\\ \\mathrm{V}$, so the bridging current is about $5.3\\ \\mathrm{mA}$.',
            },
            {
              slug: 'best-load',
              title: 'Maximum power transfer',
              prompt:
                'A battery of EMF $\\mathcal E$ and internal resistance $r$ drives a load $R$. Write the load power $P(R)$, and use calculus to show that it is greatest at $R = r$. What fraction of the battery\'s total power reaches the load then? Why do power grids not operate this way?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'At the peak, half of the total power reaches the load. Grids need high efficiency, not peak transfer.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which conservation laws do the two Kirchhoff rules express?',
              answerOutline: 'Charge for the junction rule, energy for the loop rule.',
            },
            {
              question: 'What does a negative current in your solution mean?',
              answerOutline: 'The current flows opposite to the direction you guessed.',
            },
            {
              question: 'Why is a parallel combination less than each resistor alone?',
              answerOutline: 'Each extra path gives current another way through, so the total conductance rises.',
            },
          ],
        },
        {
          slug: 'rc-circuits',
          title: 'RC circuits',
          summary:
            'Circuits that change with time: charging and discharging a capacitor, and the time constant.',
          estimatedMinutes: 170,
          objectives: [
            'Write the differential equation of an RC circuit',
            'Solve it by separation of variables',
            'Use the time constant to estimate how fast the circuit responds',
            'Account for energy in the charging process',
          ],
          concepts: [
            'Time constant RC',
            'Charging curve',
            'Discharging curve',
            'Current at the start and at the end',
            'Half-life and time constant',
            'Energy in charging',
          ],
          explanation: `When a circuit contains a capacitor, its currents change with time. Put a resistor $R$ and an uncharged capacitor $C$ in series with a battery $\\mathcal E$, and close the switch at $t = 0$. The loop rule gives

$$\\mathcal E - IR - \\frac{Q}{C} = 0, \\qquad I = \\frac{dQ}{dt}.$$

This is a first-order differential equation. Separate variables and integrate:

$$\\frac{dQ}{C\\mathcal E - Q} = \\frac{dt}{RC} \\quad\\Rightarrow\\quad Q(t) = C\\mathcal E\\left(1 - e^{-t/RC}\\right).$$

The **time constant** is $\\tau = RC$, and it has units of seconds, since $\\Omega\\cdot\\mathrm{F} = \\mathrm{s}$. Differentiating gives $I(t) = (\\mathcal E/R)e^{-t/\\tau}$.

Two simple facts let you predict a circuit without any solving. At first, an uncharged capacitor has no voltage, so it acts like a plain wire. Much later, no current flows, so it acts like a break in the circuit.

If a charged capacitor discharges through $R$, the loop rule gives $Q(t) = Q_0e^{-t/\\tau}$. In each time $\\tau$ the charge falls to $e^{-1} = 37\\%$ of its value. The half-life is $\\tau\\ln 2$, or $0.69\\tau$.

**Worked example.** A $10\\ \\mathrm{\\mu F}$ capacitor charges through $100\\ \\mathrm{k\\Omega}$ from a $9.0\\ \\mathrm{V}$ battery. Find $\\tau$, the initial current, the final charge and the capacitor voltage at $t = 2.0\\ \\mathrm{s}$.

$$\\tau = RC = (1.0\\times 10^{5})(1.0\\times 10^{-5}) = 1.0\\ \\mathrm{s}.$$

At the start the capacitor acts as a wire, so $I_0 = 9.0/(1.0\\times 10^{5}) = 90\\ \\mathrm{\\mu A}$. At the end, $Q_f = C\\mathcal E = 90\\ \\mathrm{\\mu C}$. Then

$$V_C(2.0) = 9.0(1 - e^{-2.0}) = 7.8\\ \\mathrm{V}.$$

Check: after two time constants the capacitor should be about $86\\%$ charged, and $7.8/9.0$ is that.

**Energy.** The battery delivers $Q_f\\mathcal E = 810\\ \\mathrm{\\mu J}$. The capacitor stores only $\\tfrac12C\\mathcal E^2 = 405\\ \\mathrm{\\mu J}$. Exactly half goes to heat in the resistor, whatever the value of $R$. A small $R$ gives a brief large current; a large $R$ gives a long small one. You can show this by integrating $I^2R$.

**Pitfalls.** The $R$ in $\\tau$ is the resistance seen by the capacitor, which may not be the only resistor in the circuit. Also, the exponential never quite finishes. Engineers call five time constants "done".`,
          resources: [
            openstax2('Read the section on RC circuits.'),
            phet('Circuit Construction Kit: AC', 'circuit-construction-kit-ac', 'Add a capacitor and watch the charging curve on the meter.'),
            falstad('Open the RC example from its Circuits menu, and vary R and C.'),
          ],
          exercises: [
            {
              slug: 'time-to-discharge',
              title: 'How long does it take?',
              prompt:
                'A capacitor discharges through a resistor. How many time constants until it holds $1\\%$ of its charge? Separately, a $100\\ \\mathrm{\\mu F}$ capacitor must fall to a quarter of its voltage in $2.0\\ \\mathrm{s}$. What resistance does this need?',
              kind: 'problem',
              difficulty: 1,
              hint: 'About $4.6$ time constants. $R = t/(C\\ln 4) = 1.4\\times 10^{4}\\ \\Omega$.',
            },
            {
              slug: 'half-goes-to-heat',
              title: 'Half the energy is lost',
              prompt:
                'For the charging circuit, compute $\\int_0^\\infty I^2R\\,dt$ using $I = (\\mathcal E/R)e^{-t/RC}$. Show that it equals $\\frac12C\\mathcal E^2$ for any $R$. Why does this look like a paradox as $R \\to 0$, and how is it resolved?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The heat stays fixed because the current grows as $R$ falls. Real circuits always have some resistance and also radiate.',
            },
            {
              slug: 'step-the-circuit',
              title: 'Step an RC circuit',
              prompt:
                'Using Euler steps in Python, integrate $dQ/dt = (\\mathcal E - Q/C)/R$ for the worked example from $t = 0$ to $5\\ \\mathrm{s}$. Compare with the exact curve for steps of $0.5$, $0.1$ and $0.01\\ \\mathrm{s}$. State how the error depends on the step size, and find what goes wrong if the step is larger than $2\\tau$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Euler\'s error is proportional to the step. Above $2\\tau$ the numerical solution oscillates and grows.',
            },
          ],
          selfAssessment: [
            {
              question: 'How does an uncharged capacitor behave right after a switch closes? And a long time later?',
              answerOutline: 'First like a wire, then like an open circuit.',
            },
            {
              question: 'What fraction of final charge has a capacitor gained after one time constant?',
              answerOutline: '$1 - e^{-1}$, about $63\\%$.',
            },
            {
              question: 'What fraction of the battery\'s energy ends up in the capacitor?',
              answerOutline: 'One half. The rest goes to heat, independent of $R$.',
            },
          ],
        },
      ],
      project: {
        slug: 'circuit-solver',
        title: 'A small circuit solver',
        description: `Build a Python tool that reads a text list of circuit elements and solves it. Each line names a resistor, voltage source or current source and the two nodes it joins. The program assembles the nodal equations into a matrix and solves them with \`numpy.linalg.solve\`.

Then add capacitors, by stepping time with a small step and treating each capacitor as a source that depends on its charge. Verify the results with hand calculations and a simulator. This is the core of how real circuit simulators work, and you will come away with a much clearer picture of why Kirchhoff's rules are always enough.`,
        deliverables: [
          'A parser for a plain-text netlist with resistors and DC sources',
          'A nodal solver that prints every node voltage and branch current',
          'Tests that reproduce the two-battery worked example and the bridge exercise',
          'A time-stepping RC mode, tested against the exact exponential',
          'A check of one non-trivial circuit against the PhET kit or the Falstad simulator',
          'A short README explaining how the matrix is built',
        ],
        estimatedHours: 6,
        stretchGoals: [
          'Add inductors, so that your solver can also handle the next module',
          'Plot how a voltage divider sags as you add a load',
        ],
      },
    },
    {
      slug: 'magnetism',
      title: 'Magnetism',
      description:
        'Magnetic forces on moving charges and currents, and the fields that currents produce, found with the Biot-Savart law and Ampere’s law.',
      lessons: [
        {
          slug: 'magnetic-force-on-charges',
          title: 'Magnetic force on moving charges',
          summary:
            'The force that acts only on moving charges, circular motion in a field, and how to measure the mass of an ion.',
          estimatedMinutes: 170,
          objectives: [
            'Apply the magnetic force law with the right-hand rule',
            'Explain why a magnetic force does no work',
            'Derive the radius and frequency of cyclotron motion',
            'Analyse velocity selectors and mass spectrometers',
          ],
          concepts: [
            'Magnetic field and the tesla',
            'Lorentz force',
            'Right-hand rule',
            'Cyclotron motion',
            'Velocity selector',
            'Mass spectrometer',
          ],
          explanation: `A magnetic field exerts a force only on *moving* charge:

$$\\vec F = q\\vec v\\times\\vec B, \\qquad F = |q|vB\\sin\\theta.$$

The unit of $B$ is the tesla, $1\\ \\mathrm{T} = 1\\ \\mathrm{N/(A\\,m)}$. Earth's field is about $5\\times 10^{-5}\\ \\mathrm{T}$, and a strong lab magnet a tesla or so. To find the direction, point your right hand's fingers along $\\vec v$, curl them toward $\\vec B$, and your thumb gives the direction for a positive charge. For a negative charge, reverse it.

Two facts follow from the cross product. A charge moving along $\\vec B$ feels no force. And the force is always perpendicular to the velocity, so **it does no work**. A magnetic field can bend a path, but it cannot change a speed. This makes it very different from an electric field.

**Circular motion.** If $\\vec v$ is perpendicular to a uniform $\\vec B$, the force acts as a centripetal force:

$$qvB = \\frac{mv^2}{r} \\quad\\Rightarrow\\quad r = \\frac{mv}{qB}.$$

The time per revolution is $2\\pi r/v$, and $v$ cancels:

$$f = \\frac{qB}{2\\pi m}.$$

This **cyclotron frequency** does not depend on speed, the fact that makes the cyclotron accelerator work. If $\\vec v$ also has a part along $\\vec B$, the path is a helix.

**Worked example.** A proton moves at $1.0\\times 10^{6}\\ \\mathrm{m/s}$ perpendicular to a $0.50\\ \\mathrm{T}$ field. Find the force, the radius and the frequency.

$$F = qvB = (1.60\\times 10^{-19})(1.0\\times 10^{6})(0.50) = 8.0\\times 10^{-14}\\ \\mathrm{N}.$$

$$r = \\frac{mv}{qB} = \\frac{(1.67\\times 10^{-27})(1.0\\times 10^{6})}{(1.60\\times 10^{-19})(0.50)} = 2.1\\ \\mathrm{cm}.$$

$$f = \\frac{qB}{2\\pi m} = 7.6\\ \\mathrm{MHz}.$$

Check: the units reduce correctly, and $v/(2\\pi r) = 7.6\\ \\mathrm{MHz}$ too. An electron at the same speed would have a radius nearly $2000$ times smaller, since $r \\propto m$.

**Combined fields.** With both fields present, the force is $\\vec F = q(\\vec E + \\vec v\\times\\vec B)$. In a **velocity selector**, crossed fields balance when $qE = qvB$, so only particles with $v = E/B$ pass straight through. A **mass spectrometer** then measures $r$ in a known $B$, which gives $m$ and separates isotopes.

**Pitfalls.** Check the sign of the charge for direction. Do not write $\\vec F$ along $\\vec B$: it is perpendicular to both $\\vec v$ and $\\vec B$. And a charge at rest feels nothing from a steady magnetic field.`,
          resources: [
            openstax2('Read the chapter on magnetic forces and fields, through motion of a charged particle.'),
            phet('Magnets and Electromagnets', 'magnets-and-electromagnets', 'Get a feel for field direction with the compass tool.'),
            mit802('Work the material on the magnetic force.'),
          ],
          exercises: [
            {
              slug: 'electron-in-earth-field',
              title: 'An electron in Earth’s field',
              prompt:
                'An electron moves at $1.0\\times 10^{6}\\ \\mathrm{m/s}$ perpendicular to a field of $5.0\\times 10^{-5}\\ \\mathrm{T}$. Find the radius of its path. Separately, crossed fields of $E = 1.0\\times 10^{5}\\ \\mathrm{V/m}$ and $B = 0.20\\ \\mathrm{T}$ form a velocity selector. Find the speed it passes.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Radius $0.11\\ \\mathrm{m}$; speed $5.0\\times 10^{5}\\ \\mathrm{m/s}$.',
            },
            {
              slug: 'separate-isotopes',
              title: 'Separate two isotopes',
              prompt:
                'Singly charged ions of mass $1.99\\times 10^{-26}\\ \\mathrm{kg}$ (carbon-12) start at rest and pass through $1000\\ \\mathrm{V}$, then enter a $0.20\\ \\mathrm{T}$ field at right angles. Show that $r = \\sqrt{2mV/q}/B$, and find the radius. Find the radius for carbon-13, which has $13/12$ of that mass, and the distance between their landing points after a half circle.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Radii about $7.9\\ \\mathrm{cm}$ and $8.2\\ \\mathrm{cm}$. The separation after a half circle is twice the difference in radius.',
            },
            {
              slug: 'helix',
              title: 'Simulate a helix',
              prompt:
                'Use `scipy.integrate.solve_ivp` to integrate $m\\,d\\vec v/dt = q\\vec v\\times\\vec B$ for a proton in a $0.50\\ \\mathrm{T}$ field along $z$, with velocity having both $x$ and $z$ parts. Plot the path in 3D. Verify the radius and the frequency. Show numerically that the speed stays constant, and explain why this is a good test of the integrator.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Use tight tolerances. A sloppy integrator will show the speed drifting, which physics forbids.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a magnetic field not change a particle\'s speed?',
              answerOutline: 'The force is perpendicular to the velocity, so it does no work.',
            },
            {
              question: 'What happens to the radius of a path if the speed doubles? To the frequency?',
              answerOutline: 'The radius doubles, and the frequency is unchanged.',
            },
            {
              question: 'What is the condition for a velocity selector?',
              answerOutline: 'Electric and magnetic forces balance, so $v = E/B$.',
            },
          ],
          relatedLessons: ['electromagnetism/magnetostatics/the-lorentz-force-and-currents'],
        },
        {
          slug: 'forces-on-currents-and-torque',
          title: 'Forces and torques on currents',
          summary:
            'From forces on single charges to forces on wires, and the torque on a loop that makes every electric motor turn.',
          estimatedMinutes: 160,
          objectives: [
            'Compute the force on a straight current in a field',
            'Find the torque on a current loop',
            'Define the magnetic dipole moment',
            'Explain how a motor works',
          ],
          concepts: [
            'Force on a current',
            'Magnetic dipole moment',
            'Torque on a loop',
            'Orientation energy',
            'Electric motor',
          ],
          explanation: `A current is many moving charges, so a wire in a field feels a force. Adding up $q\\vec v\\times\\vec B$ over the moving charges in a length $L$ gives

$$\\vec F = I\\vec L\\times\\vec B, \\qquad F = ILB\\sin\\theta.$$

Here $\\vec L$ points along the current. For a curved wire, add up $I\\,d\\vec l\\times\\vec B$.

**Current loops.** In a uniform field, the net force on a closed loop is zero, because the sides pull in opposite directions. But those forces act at different places, so there is a net **torque**. For a flat loop of area $A$ and $N$ turns,

$$\\vec\\tau = \\vec\\mu\\times\\vec B, \\qquad \\mu = NIA,$$

where $\\vec\\mu$ is the **magnetic dipole moment**, which points perpendicular to the loop by a right-hand rule: curl your fingers with the current, and your thumb gives $\\vec\\mu$. The torque turns $\\vec\\mu$ toward $\\vec B$, just as a compass needle turns. The energy is $U = -\\vec\\mu\\cdot\\vec B$, which is lowest when the two are aligned.

**Worked example.** A rectangular coil of 20 turns, $10\\ \\mathrm{cm}$ by $5.0\\ \\mathrm{cm}$, carries $2.0\\ \\mathrm{A}$ in a $0.40\\ \\mathrm{T}$ field. Find the dipole moment, the greatest torque and the torque when $\\vec\\mu$ makes $30^\\circ$ with $\\vec B$.

$$\\mu = NIA = (20)(2.0)(0.10)(0.050) = 0.20\\ \\mathrm{A\\,m^2}.$$

$$\\tau_{\\max} = \\mu B = (0.20)(0.40) = 0.080\\ \\mathrm{N\\,m},$$

which occurs when $\\vec\\mu$ is at right angles to $\\vec B$. At $30^\\circ$, $\\tau = \\mu B\\sin 30^\\circ = 0.040\\ \\mathrm{N\\,m}$.

Check by forces: the two long sides feel a force of $NILB = (20)(2.0)(0.10)(0.40) = 1.6\\ \\mathrm{N}$ each, in opposite directions. Their lever arms are each half of the $5.0\\ \\mathrm{cm}$ width, so the torque is $1.6 \\times 0.050 = 0.080\\ \\mathrm{N\\,m}$. It matches.

**Motors.** The torque rotates the coil until $\\vec\\mu$ lines up with $\\vec B$. To keep turning, the motor must reverse the current at that point, which a **commutator** does in a simple DC motor. So electrical energy becomes mechanical work, with the torque set by the current.

**Electrons in a wire.** Moving electrons pile up slightly on one side of a wire in a field. This builds a small sideways voltage called the **Hall effect**, whose sign shows the sign of the carriers, and which is used to measure $B$.

**Pitfalls.** The angle in $\\tau = \\mu B\\sin\\theta$ is between $\\vec\\mu$ and $\\vec B$, not between the plane of the loop and $\\vec B$. Torque is zero when the loop's plane is perpendicular to $\\vec B$. Note also that the formula does not depend on the shape of the loop, only on its area.`,
          resources: [
            openstax2('Read the rest of the chapter on magnetic forces and fields.'),
            mit802('Use the material on torque on a current loop, and the motor demonstration.'),
            hyperphysics('Look up DC motors and the Hall effect.'),
          ],
          exercises: [
            {
              slug: 'wire-forces',
              title: 'Forces on wires',
              prompt:
                '(a) Find the force on $0.50\\ \\mathrm{m}$ of wire carrying $10\\ \\mathrm{A}$ at right angles to a $0.30\\ \\mathrm{T}$ field. (b) A horizontal wire of $10\\ \\mathrm{g/m}$ sits in a horizontal $0.10\\ \\mathrm{T}$ field at right angles to it. What current makes it float?',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $1.5\\ \\mathrm{N}$; (b) $I = \\mu g/B = 0.98\\ \\mathrm{A}$, with its direction chosen so the force is up.',
            },
            {
              slug: 'circular-coil',
              title: 'Torque on a circular loop',
              prompt:
                'A single circular loop of radius $10\\ \\mathrm{cm}$ carries $3.0\\ \\mathrm{A}$ in a $0.20\\ \\mathrm{T}$ field. Find its largest torque. Then find the work done by the field as $\\vec\\mu$ swings from perpendicular to aligned, using $U = -\\vec\\mu\\cdot\\vec B$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The torque is $0.019\\ \\mathrm{N\\,m}$, and so is the work, in joules: $\\mu B$.',
            },
            {
              slug: 'force-closed-loop',
              title: 'No net force on a loop',
              prompt:
                'Prove that the net force on any closed current loop in a uniform field is zero, using $\\vec F = I\\oint d\\vec l\\times\\vec B$. Then explain how a *non-uniform* field can exert a net force on a loop, and use this to say why a magnet attracts a piece of iron.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'With $\\vec B$ constant it comes out of the integral, and $\\oint d\\vec l = 0$. In a non-uniform field, the two sides feel different forces.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the net force and the net torque on a current loop in a uniform field?',
              answerOutline: 'Zero net force, and generally non-zero torque, $\\vec\\mu\\times\\vec B$.',
            },
            {
              question: 'When is the torque on a loop greatest?',
              answerOutline: 'When $\\vec\\mu$ is perpendicular to $\\vec B$, so the field lies in the plane of the loop.',
            },
            {
              question: 'Why must a DC motor reverse its current each half turn?',
              answerOutline: 'Otherwise the torque would reverse after alignment, and the coil would rock to rest.',
            },
          ],
        },
        {
          slug: 'biot-savart-law',
          title: 'The Biot-Savart law',
          summary:
            'How a current creates a magnetic field, built up piece by piece, with loops and long wires.',
          estimatedMinutes: 180,
          objectives: [
            'State the Biot-Savart law and find the field direction',
            'Derive the field at the centre of a circular loop',
            'State the field of a long wire',
            'Compute the force between two parallel currents',
          ],
          concepts: [
            'Biot-Savart law',
            'Permeability of free space',
            'Right-hand grip rule',
            'Field of a loop',
            'Field of a long wire',
            'Force between currents',
          ],
          explanation: `Moving charges feel magnetic fields, and they also create them. The field of a short piece of current $I\\,d\\vec l$ is given by the **Biot-Savart law**:

$$d\\vec B = \\frac{\\mu_0}{4\\pi}\\frac{I\\,d\\vec l\\times\\hat r}{r^2}, \\qquad \\mu_0 = 4\\pi\\times 10^{-7}\\ \\mathrm{T\\,m/A}.$$

Here $\\hat r$ points from the piece of wire to the field point. It is an inverse-square law, like Coulomb's. The cross product makes the field perpendicular to both the current and the line to the point, so magnetic field lines form closed loops around currents. They never start or end. For a straight wire, use the right-hand grip rule: thumb along the current, and fingers curl with the field.

**Worked example.** Find the field at the centre of a circular loop of radius $R$ carrying current $I$, and evaluate it for $I = 5.0\\ \\mathrm{A}$ and $R = 10\\ \\mathrm{cm}$.

Every piece $d\\vec l$ is the same distance $R$ from the centre, and at right angles to $\\hat r$, so $|d\\vec l\\times\\hat r| = dl$. All the pieces give a $d\\vec B$ in the same direction, along the axis. So the integral is just a sum of lengths:

$$B = \\frac{\\mu_0I}{4\\pi R^2}\\oint dl = \\frac{\\mu_0I}{4\\pi R^2}(2\\pi R) = \\frac{\\mu_0I}{2R}.$$

Numerically, $B = (4\\pi\\times 10^{-7})(5.0)/(2 \\times 0.10) = 3.1\\times 10^{-5}\\ \\mathrm{T}$. Check: the size is similar to Earth's field, so $5\\ \\mathrm{A}$ in one loop makes a compass twitch, which is true. A part of a loop gives the same fraction of this field, since the pieces just add.

For $N$ turns, multiply by $N$. On the axis at a distance $z$, the same approach, keeping only the axial part, gives

$$B = \\frac{\\mu_0IR^2}{2(z^2 + R^2)^{3/2}}.$$

**Long straight wire.** Integrating along an infinite line gives

$$B = \\frac{\\mu_0I}{2\\pi r},$$

circling the wire and falling as $1/r$.

**Force between wires.** Each wire sits in the field of the other. With the force law from the last lesson, parallel currents $I_1$ and $I_2$ a distance $d$ apart feel a force per unit length of

$$\\frac{F}{L} = \\frac{\\mu_0I_1I_2}{2\\pi d}.$$

Parallel currents *attract* and opposite currents repel, the reverse of what charges do.

**Pitfalls.** Unlike with $\\vec E$, the field is perpendicular to the source direction, so draw it carefully. A long wire does not give the same formula as the loop. The direction from the right-hand rule must be worked out, since the sign of the cross product is easy to mix up.`,
          resources: [
            openstax2('Read the chapter on sources of magnetic fields, through the Biot-Savart law and loops.'),
            mit802('Work the material on the Biot-Savart law.'),
            hyperphysics('Look up the magnetic field of a current loop and a long wire.'),
          ],
          exercises: [
            {
              slug: 'wire-and-pair',
              title: 'A wire and a pair of wires',
              prompt:
                '(a) Find the field $5.0\\ \\mathrm{cm}$ from a long wire carrying $20\\ \\mathrm{A}$. (b) Two long wires $1.0\\ \\mathrm{cm}$ apart each carry $10\\ \\mathrm{A}$ in the same direction. Find the force per metre, and say whether it attracts or repels.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $8.0\\times 10^{-5}\\ \\mathrm{T}$; (b) $2.0\\times 10^{-3}\\ \\mathrm{N/m}$, attractive.',
            },
            {
              slug: 'loop-axis',
              title: 'Field on the axis',
              prompt:
                'Derive the on-axis formula for a loop, and evaluate it for $I = 5.0\\ \\mathrm{A}$, $R = 10\\ \\mathrm{cm}$, at $z = 10\\ \\mathrm{cm}$. Show that for $z \\gg R$ it has the same $1/z^3$ form as the electric dipole.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'At $z = R$, $B = 1.1\\times 10^{-5}\\ \\mathrm{T}$. Far away, $B \\approx \\mu_0(2\\mu)/(4\\pi z^3)$.',
            },
            {
              slug: 'helmholtz-coils',
              title: 'Helmholtz coils',
              prompt:
                'Two coaxial coils, each of $N$ turns and radius $R$, are placed a distance $R$ apart, with equal currents in the same sense. Show that the field at the midpoint is $(4/5)^{3/2}\\mu_0NI/R$. For $N = 100$, $I = 1.0\\ \\mathrm{A}$ and $R = 0.10\\ \\mathrm{m}$, evaluate it. Plot $B$ along the axis in Python, and compare the uniformity with the same coils placed at $2R$ apart.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The midpoint field is $9.0\\times 10^{-4}\\ \\mathrm{T}$. At separation $R$, both the first and second derivatives vanish at the midpoint.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the shape of magnetic field lines around a long straight wire?',
              answerOutline: 'Circles around the wire.',
            },
            {
              question: 'Do parallel currents attract or repel? How does this compare with charges?',
              answerOutline: 'They attract, whereas like charges repel.',
            },
            {
              question: 'What makes the integral for the centre of a loop so simple?',
              answerOutline: 'Each piece is the same distance away, at right angles, and adds in the same direction.',
            },
          ],
          relatedLessons: ['electromagnetism/magnetostatics/biot-savart-and-amperes-law'],
        },
        {
          slug: 'amperes-law',
          title: "Ampere's law",
          summary:
            'A line-integral shortcut for magnetic fields, used for wires, solenoids and toroids.',
          estimatedMinutes: 170,
          objectives: [
            "State Ampere's law and use it with symmetry",
            'Find the field inside and outside a thick wire',
            'Derive the field of an ideal solenoid',
            'Find the field of a toroid',
          ],
          concepts: [
            "Ampere's law",
            'Amperian loop',
            'Enclosed current',
            'Solenoid',
            'Toroid',
          ],
          explanation: `Magnetism has its own shortcut, much like Gauss's law. Take any closed loop and add up the part of $\\vec B$ along it. **Ampere's law** says this depends only on the current passing through the loop:

$$\\oint\\vec B\\cdot d\\vec l = \\mu_0I_{\\text{enc}}.$$

The sign of the enclosed current comes from a right-hand rule: curl your fingers around the loop, and current along your thumb counts as positive. As with Gauss's law, this is always true, but it gives the field only when symmetry makes $B$ constant along parts of the loop. It holds for steady currents; a correction for changing fields comes in the last module.

**Long wire.** Take a circle of radius $r$ around the wire. By symmetry, $B$ is constant around it, and along the path. So $B(2\\pi r) = \\mu_0I$, or $B = \\mu_0I/2\\pi r$. That is the Biot-Savart result in one line.

**Worked example.** A long copper wire of radius $a = 2.0\\ \\mathrm{mm}$ carries $10\\ \\mathrm{A}$ spread evenly over its section. Find $B$ at $r = 1.0\\ \\mathrm{mm}$, at $r = 2.0\\ \\mathrm{mm}$ and at $r = 4.0\\ \\mathrm{mm}$.

Inside, the circle encloses only a fraction $r^2/a^2$ of the current:

$$B(2\\pi r) = \\mu_0I\\frac{r^2}{a^2} \\quad\\Rightarrow\\quad B = \\frac{\\mu_0Ir}{2\\pi a^2}.$$

So at $1.0\\ \\mathrm{mm}$, $B = 0.50\\ \\mathrm{mT}$, and at the surface, $1.0\\ \\mathrm{mT}$. Outside, all the current is enclosed, so $B = \\mu_0I/2\\pi r = 0.50\\ \\mathrm{mT}$ at $4.0\\ \\mathrm{mm}$.

Check: the two formulas agree at $r = a$. The field rises linearly in the wire and then falls as $1/r$, the same shape as $E$ for a charged solid cylinder. The field at $r = a/2$ and at $r = 2a$ is the same.

**Solenoid.** A long tight coil with $n$ turns per unit length has a nearly uniform field inside and almost none outside. Take a rectangular loop with one side inside. Only that side counts: the outer side has $B \\approx 0$, and the short sides are perpendicular to $\\vec B$. So $BL = \\mu_0nLI$, and

$$B = \\mu_0nI.$$

It does not depend on the coil's radius, or on where you are inside. For $n = 2000\\ \\mathrm{m^{-1}}$ and $I = 1.5\\ \\mathrm{A}$, $B = 3.8\\times 10^{-3}\\ \\mathrm{T}$. An iron core raises this by a large factor.

**Toroid.** Bend a solenoid into a ring with $N$ turns. A circle inside the ring gives $B = \\mu_0NI/2\\pi r$, and zero outside, as no net current is enclosed.

**Pitfalls.** Zero enclosed current does not always mean zero field on the loop, only that the integral vanishes. Do not use this law without enough symmetry: for a short coil or a single loop, you need Biot-Savart.`,
          resources: [
            openstax2("Read the sections on Ampere's law, solenoids and toroids."),
            mit802("Work the material on Ampere's law."),
            hyperphysics('Look up solenoids and toroids.'),
          ],
          exercises: [
            {
              slug: 'toroid-and-solenoid',
              title: 'Toroid and solenoid',
              prompt:
                '(a) A toroid of 500 turns carries $2.0\\ \\mathrm{A}$. Find $B$ at a radius of $10\\ \\mathrm{cm}$ inside. (b) Show that the $B$ in an ideal solenoid has units of tesla, by writing out $\\mu_0nI$. Then say how many amps through $1000$ turns per metre would match a $1.0\\ \\mathrm{T}$ MRI magnet, and why superconducting wire is used.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $2.0\\times 10^{-3}\\ \\mathrm{T}$. (b) About $800\\ \\mathrm{A}$, which would overheat ordinary wire.',
            },
            {
              slug: 'coaxial-cable',
              title: 'A coaxial cable',
              prompt:
                'A coaxial cable has a central wire carrying $I$ one way and a thin outer sheath carrying $I$ back. Use Ampere\'s law to find $B$ in the space between them and outside. Why is this good for a signal cable?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Between them, $B = \\mu_0I/2\\pi r$. Outside, the net current is zero, so $B = 0$.',
            },
            {
              slug: 'ampere-law-check',
              title: 'Verify Ampere’s law numerically',
              prompt:
                'Compute $\\oint\\vec B\\cdot d\\vec l$ numerically in Python for the field of a long wire along $z$, around a square loop that encloses the wire off centre. Then repeat for a loop that does not enclose it. Show that you get $\\mu_0I$ and zero to within numerical error.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use many small steps along each side of the square, and add $\\vec B\\cdot\\Delta\\vec l$.',
            },
          ],
          selfAssessment: [
            {
              question: 'When does Ampere\'s law let you actually find $B$?',
              answerOutline: 'When symmetry makes $B$ constant along the path, or makes parts of it contribute nothing.',
            },
            {
              question: 'Why does the solenoid field not depend on the radius?',
              answerOutline: 'Only turns per length and current enter the loop integral.',
            },
            {
              question: 'How does $B$ vary inside a wire with uniform current?',
              answerOutline: 'It rises linearly with $r$, since the enclosed current grows as $r^2$.',
            },
          ],
          relatedLessons: ['electromagnetism/magnetostatics/biot-savart-and-amperes-law'],
        },
      ],
    },
    {
      slug: 'induction',
      title: 'Induction',
      description:
        'Changing magnetic fields make electric fields. That single fact gives generators, inductors, transformers and alternating current.',
      lessons: [
        {
          slug: 'faradays-and-lenzs-law',
          title: "Faraday's law and Lenz's law",
          summary:
            'Magnetic flux, the EMF made by changing it, and the rule that gives the direction of the induced current.',
          estimatedMinutes: 180,
          objectives: [
            'Compute magnetic flux through a loop',
            "Apply Faraday's law to find an induced EMF",
            "Use Lenz's law to find the direction of an induced current",
            'Analyse motional EMF and energy conservation in a sliding bar',
          ],
          concepts: [
            'Magnetic flux',
            "Faraday's law",
            "Lenz's law",
            'Motional EMF',
            'Induced electric field',
            'Generators',
          ],
          explanation: `Move a magnet near a coil and a current appears. Hold it still and the current stops. The cause is a changing **magnetic flux**, $\\Phi_B = \\int\\vec B\\cdot d\\vec A$, which for a uniform field and a flat loop is $BA\\cos\\theta$. The unit is the weber, $1\\ \\mathrm{Wb} = 1\\ \\mathrm{T\\,m^2}$.

**Faraday's law** says that the EMF around a loop equals the rate of change of the flux through it:

$$\\mathcal E = -N\\frac{d\\Phi_B}{dt}.$$

There are three ways to change a flux: change $B$, change the area, or change the angle.

The minus sign is **Lenz's law**: the induced current flows in the direction that opposes the *change* in flux. If flux into a loop is growing, the current makes a field out of it. If that flux is shrinking, the current makes a field into it, to prop it up. This must be so, or energy would not be conserved: the current would feed itself.

**Worked example.** A metal bar of length $L = 0.20\\ \\mathrm{m}$ slides at $v = 3.0\\ \\mathrm{m/s}$ along two rails joined by a resistor $R = 1.5\\ \\Omega$. A field $B = 0.50\\ \\mathrm{T}$ points into the plane of the circuit. Find the EMF, the current, the force needed, and compare the powers.

The area grows at the rate $Lv$, so

$$\\mathcal E = BLv = (0.50)(0.20)(3.0) = 0.30\\ \\mathrm{V}, \\qquad I = \\frac{\\mathcal E}{R} = 0.20\\ \\mathrm{A}.$$

The flux into the page is growing. By Lenz's law, the current makes a field out of the page, so it runs anticlockwise round the circuit. The field then pushes on the current in the bar with a force $ILB = 0.020\\ \\mathrm{N}$, directed against the motion. So you must pull with that force to keep the speed constant.

Your mechanical power is $Fv = 0.060\\ \\mathrm{W}$. The heating in the resistor is $I^2R = 0.060\\ \\mathrm{W}$. These agree exactly. Check: energy is conserved, and that is the deep reason for the sign in Lenz's law. If the force helped the motion, the bar would speed up on its own.

**Induced fields.** Even with no wires, a changing $\\vec B$ creates an electric field whose lines form closed loops:

$$\\oint\\vec E\\cdot d\\vec l = -\\frac{d\\Phi_B}{dt}.$$

Unlike a static field, this one is not conservative, so there is no potential for it.

**Generators.** A coil of $N$ turns spinning at $\\omega$ in a field has flux $BA\\cos\\omega t$, which gives

$$\\mathcal E = NBA\\omega\\sin\\omega t.$$

This is how almost all electrical power is produced.

**Pitfalls.** Lenz's law opposes the *change*, not the field itself. A large constant flux induces nothing. For several turns, multiply by $N$. And remember to use the component of $\\vec B$ perpendicular to the loop.`,
          resources: [
            openstax2('Read the chapter on electromagnetic induction.'),
            phet("Faraday's Law", 'faradays-law', 'Move the magnet, and find what sets the EMF.'),
            mit802("Work the material on Faraday's law."),
          ],
          exercises: [
            {
              slug: 'collapsing-field',
              title: 'A collapsing field',
              prompt:
                '(a) A coil of 200 turns and area $0.010\\ \\mathrm{m^2}$ is perpendicular to a $0.40\\ \\mathrm{T}$ field, which falls to zero in $50\\ \\mathrm{ms}$. Find the average EMF. (b) A loop of radius $5.0\\ \\mathrm{cm}$ is perpendicular to a field. Find the flux at $0.40\\ \\mathrm{T}$.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) $16\\ \\mathrm{V}$; (b) $3.1\\times 10^{-3}\\ \\mathrm{Wb}$.',
            },
            {
              slug: 'generator',
              title: 'Design a generator',
              prompt:
                'A generator has 100 turns of area $0.010\\ \\mathrm{m^2}$ in a $0.50\\ \\mathrm{T}$ field, spinning at $60$ revolutions per second. Find the peak EMF. If you connect a load, why does it get harder to spin? Explain in terms of Lenz\'s law and energy.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The peak is $NBA\\omega = 188\\ \\mathrm{V}$. The load draws a current, and the field exerts a torque opposing the rotation.',
            },
            {
              slug: 'falling-bar',
              title: 'A bar falling under gravity',
              prompt:
                'The bar from the worked example hangs vertically on the rails, with the plane vertical and $B$ at right angles to it. It falls under gravity from rest. Write the equation of motion, $m\\,dv/dt = mg - B^2L^2v/R$. Find the terminal speed, show that it has the form of linear drag, and solve for $v(t)$. Check by simulating in Python.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Terminal speed $v_t = mgR/(B^2L^2)$, with $\\tau = v_t/g$, as in the linear-drag result from mechanics.',
            },
          ],
          selfAssessment: [
            {
              question: 'Name the three ways of changing a flux through a loop.',
              answerOutline: 'Change the field, the area, or the angle.',
            },
            {
              question: 'What would go wrong if Lenz\'s law had the opposite sign?',
              answerOutline: 'Induced currents would reinforce the change, giving energy from nothing.',
            },
            {
              question: 'Why is an induced electric field not conservative?',
              answerOutline: 'Its integral around a closed loop is not zero, so no potential function exists for it.',
            },
          ],
          relatedLessons: ['electromagnetism/electrodynamics-and-induction/faradays-law-and-inductance'],
        },
        {
          slug: 'inductors-and-rl-circuits',
          title: 'Inductors and RL circuits',
          summary:
            'A coil that resists changes in its own current, the energy stored in its field, and how RL circuits rise and fall.',
          estimatedMinutes: 170,
          objectives: [
            'Define inductance and find it for a solenoid',
            'Write the voltage across an inductor with the correct sign',
            'Solve the RL circuit equation',
            'Compute the energy stored in an inductor and in a magnetic field',
          ],
          concepts: [
            'Self-inductance',
            'Back EMF',
            'Inductance of a solenoid',
            'RL time constant',
            'Energy in an inductor',
            'Magnetic energy density',
          ],
          explanation: `A current through a coil makes a flux through that same coil. If the current changes, so does the flux, and Faraday's law then induces an EMF in the coil itself, opposing the change. The flux is proportional to the current, $N\\Phi_B = LI$, where $L$ is the **inductance**, measured in henrys. So

$$\\mathcal E_L = -L\\frac{dI}{dt}.$$

An inductor resists changes in current, just as a mass resists changes in velocity. Its current cannot jump. For a long solenoid of length $\\ell$ and area $A$, using $B = \\mu_0nI$, you get

$$L = \\mu_0n^2A\\ell.$$

**RL circuit.** Put $L$ and $R$ in series with a battery $\\mathcal E$. The loop rule gives

$$\\mathcal E - IR - L\\frac{dI}{dt} = 0.$$

This has the same form as the RC equation. With $I(0) = 0$, the solution is

$$I(t) = \\frac{\\mathcal E}{R}\\left(1 - e^{-t/\\tau}\\right), \\qquad \\tau = \\frac{L}{R}.$$

As with the capacitor, two facts give you quick answers. Just after the switch closes, no current flows, so the inductor acts like a break. Much later, the current is steady, $dI/dt = 0$, and the inductor acts like a plain wire. This is the opposite of a capacitor.

**Energy.** The battery does work to build up the current against the back EMF. Integrating $LI\\,dI$ gives

$$U = \\tfrac12LI^2.$$

This energy is stored in the magnetic field, with density $B^2/2\\mu_0$, which matches $\\tfrac12\\epsilon_0E^2$ for the electric field.

**Worked example.** A $0.50\\ \\mathrm{H}$ inductor and a $10\\ \\Omega$ resistor are connected to a $12\\ \\mathrm{V}$ battery. Find $\\tau$, the rate of current rise at the start, the final current, the current after one time constant, and the final stored energy.

$$\\tau = \\frac{L}{R} = 0.050\\ \\mathrm{s}, \\qquad \\frac{dI}{dt}\\bigg|_{0} = \\frac{\\mathcal E}{L} = 24\\ \\mathrm{A/s}.$$

Finally, $I_f = 12/10 = 1.2\\ \\mathrm{A}$. After one $\\tau$, $I = 1.2(1 - e^{-1}) = 0.76\\ \\mathrm{A}$. The stored energy is $U = \\tfrac12(0.50)(1.2)^2 = 0.36\\ \\mathrm{J}$.

Check: at the start, all of the battery's voltage is across the inductor. If the current kept rising at $24\\ \\mathrm{A/s}$, it would reach $1.2\\ \\mathrm{A}$ in exactly $0.050\\ \\mathrm{s}$, which is $\\tau$. The units work out: $\\mathrm{H/\\Omega} = \\mathrm{s}$. It settles after about five time constants, or $0.25\\ \\mathrm{s}$.

**Danger of breaking the circuit.** If you open a switch on a large inductor, $dI/dt$ tries to be huge, so a large voltage appears and can arc across the gap. This is how a car's ignition coil makes a spark, and why relays need a protective diode.

**Pitfalls.** The time constant is $L/R$, not $LR$. Do not take a capacitor's "wire then break" rule and use it for an inductor.`,
          resources: [
            openstax2('Read the chapter on inductance through RL circuits.'),
            falstad('Open the inductor examples and compare the current rise with the formula.'),
            hyperphysics('Look up inductance and energy in an inductor.'),
          ],
          exercises: [
            {
              slug: 'solenoid-inductance',
              title: 'Inductance of a solenoid',
              prompt:
                'A solenoid has $n = 2000\\ \\mathrm{m^{-1}}$, area $1.0\\times 10^{-3}\\ \\mathrm{m^2}$ and length $0.30\\ \\mathrm{m}$. Find $L$. Separately, find the energy density of a $1.0\\ \\mathrm{T}$ field in $\\mathrm{J/m^3}$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$L = 1.5\\times 10^{-3}\\ \\mathrm{H}$; $u = 4.0\\times 10^{5}\\ \\mathrm{J/m^3}$.',
            },
            {
              slug: 'switch-off',
              title: 'Turning off',
              prompt:
                'After the worked-example circuit reaches steady current, the battery is replaced by a wire, so that the current decays through $R$. Find $I(t)$, and show that the total heat in the resistor equals the stored energy, by integrating $I^2R$.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$I = I_fe^{-t/\\tau}$. The integral gives $\\frac12LI_f^2$.',
            },
            {
              slug: 'rl-simulation',
              title: 'Simulate a sudden switch',
              prompt:
                'Using the Falstad simulator or Python, set up an RL circuit with a large resistor placed in parallel with the coil. Open the switch, and record the voltage across the coil at that moment. Use the rule that the inductor current cannot jump to predict the voltage first, then compare. Explain how this makes a spark in an ignition system.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Just after opening, the coil current passes through the large resistor, so the voltage is about $I_fR_{\\text{large}}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does an inductor act like just after a switch closes, and much later?',
              answerOutline: 'An open circuit, and then a wire.',
            },
            {
              question: 'What is the mechanical analogue of inductance?',
              answerOutline: 'Mass: it resists a change in current as mass resists a change in velocity.',
            },
            {
              question: 'Where is the energy of an inductor stored?',
              answerOutline: 'In its magnetic field, with density $B^2/2\\mu_0$.',
            },
          ],
          relatedLessons: ['electromagnetism/electrodynamics-and-induction/magnetic-energy-and-circuits-as-fields'],
        },
        {
          slug: 'lc-and-ac-circuits',
          title: 'LC oscillations and alternating current',
          summary:
            'Energy sloshing between capacitor and inductor, then reactance, resonance, RMS values and transformers.',
          estimatedMinutes: 190,
          objectives: [
            'Derive the LC oscillation frequency',
            'Compute reactance and impedance',
            'Find the resonance of a series RLC circuit',
            'Use RMS values and the transformer ratio',
          ],
          concepts: [
            'LC oscillator',
            'Inductive and capacitive reactance',
            'Impedance',
            'Resonance and quality factor',
            'RMS voltage and current',
            'Transformers',
          ],
          explanation: `Connect a charged capacitor across an inductor. Charge flows, building a magnetic field; the capacitor empties; the current then charges it in reverse. The energy moves back and forth just like a mass on a spring. The loop rule gives

$$L\\frac{d^2Q}{dt^2} + \\frac{Q}{C} = 0,$$

which is the oscillator equation with

$$\\omega_0 = \\frac{1}{\\sqrt{LC}}.$$

Here $L$ plays the role of mass, and $1/C$ of the spring constant. For $L = 1.0\\ \\mathrm{mH}$ and $C = 1.0\\ \\mathrm{\\mu F}$, $\\omega_0 = 3.2\\times 10^{4}\\ \\mathrm{rad/s}$, so $f = 5.0\\ \\mathrm{kHz}$. With an initial charge $Q_0 = 10\\ \\mathrm{\\mu C}$, the peak current is $Q_0\\omega_0 = 0.32\\ \\mathrm{A}$. A resistor added in series damps the swing, giving exactly the decay you saw for damped mechanical oscillators.

**Alternating current.** With a sinusoidal source, each element has its own opposition to current. A resistor has $R$. An inductor has **reactance** $X_L = \\omega L$, because fast changes are hard for it. A capacitor has $X_C = 1/\\omega C$, because fast changes barely charge it. The voltage leads the current by $90^\\circ$ in an inductor, and lags it by $90^\\circ$ in a capacitor. In a series RLC circuit these combine into the **impedance**:

$$Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\qquad I = \\frac{V}{Z}.$$

**Worked example.** A series circuit has $R = 50\\ \\Omega$, $L = 0.10\\ \\mathrm{H}$ and $C = 10\\ \\mathrm{\\mu F}$, driven at $10\\ \\mathrm{V}$ (RMS). Find the resonant frequency, the current at resonance, and the current at $60\\ \\mathrm{Hz}$.

At resonance, $X_L = X_C$, so $Z = R$:

$$f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = 159\\ \\mathrm{Hz}, \\qquad I = \\frac{10}{50} = 0.20\\ \\mathrm{A}.$$

There, $X_L = \\omega_0L = 100\\ \\Omega$, which equals $X_C$. The quality factor is $Q = \\omega_0L/R = 2.0$.

At $60\\ \\mathrm{Hz}$, $X_L = 37.7\\ \\Omega$ and $X_C = 265\\ \\Omega$, so

$$Z = \\sqrt{50^2 + (37.7 - 265)^2} = 233\\ \\Omega, \\qquad I = 43\\ \\mathrm{mA}.$$

Check: the current off resonance is much smaller, and the capacitor dominates at low frequency. This selectivity is how a radio tunes in one station.

**RMS values.** Mains voltage is quoted as the **root mean square**, which gives the same heating as a steady voltage of that size. For a sine wave, $V_{\\text{peak}} = \\sqrt 2\\,V_{\\text{rms}}$, so $120\\ \\mathrm{V}$ mains peaks at $170\\ \\mathrm{V}$.

**Transformers.** Two coils on one iron core share a changing flux, so voltages go as the number of turns: $V_2/V_1 = N_2/N_1$. An ideal transformer conserves power, so current goes the other way. This works only for AC, which is why grids use it. A $10:1$ transformer takes $120\\ \\mathrm{V}$ down to $12\\ \\mathrm{V}$.

**Pitfalls.** Voltages across $L$ and $C$ are out of phase, so they cannot be added as plain numbers. At resonance each can far exceed the source voltage.`,
          resources: [
            openstax2('Read the chapter on alternating-current circuits, and the section on LC oscillations.'),
            phet('Circuit Construction Kit: AC', 'circuit-construction-kit-ac', 'Build an LC loop and watch the charge slosh.'),
            falstad('Open an RLC example and sweep the frequency.'),
          ],
          exercises: [
            {
              slug: 'lc-energy',
              title: 'Energy in an LC circuit',
              prompt:
                'For the $L = 1.0\\ \\mathrm{mH}$, $C = 1.0\\ \\mathrm{\\mu F}$ circuit with initial charge $10\\ \\mathrm{\\mu C}$, write $Q(t)$ and $I(t)$. Show that $Q^2/2C + LI^2/2$ stays constant. Find the first time the capacitor is empty.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$Q = Q_0\\cos\\omega_0t$. The capacitor first empties at a quarter of a period, which is $\\pi/2\\omega_0$, about $50\\ \\mathrm{\\mu s}$.',
            },
            {
              slug: 'mains-and-transformer',
              title: 'Mains and a transformer',
              prompt:
                'A device has a transformer with 1000 primary turns on $120\\ \\mathrm{V}$ RMS mains, and draws $1.0\\ \\mathrm{A}$ RMS at $12\\ \\mathrm{V}$ from its secondary. Find the number of secondary turns, the primary current if ideal, and the peak voltage of the mains.',
              kind: 'problem',
              difficulty: 1,
              hint: '100 turns; $0.10\\ \\mathrm{A}$; $170\\ \\mathrm{V}$.',
            },
            {
              slug: 'resonance-curve',
              title: 'Plot a resonance curve',
              prompt:
                'Using the worked-example circuit, plot $I(f)$ from $10\\ \\mathrm{Hz}$ to $1\\ \\mathrm{kHz}$ on a log axis. Mark $f_0$. Then reduce $R$ to $5.0\\ \\Omega$, and find how the peak height and the width change. Measure the width at $1/\\sqrt 2$ of the peak, and compare with $f_0/Q$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'For a series RLC, the width is exactly $R/2\\pi L$. At small $R$, the peak is ten times taller and ten times narrower.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which parts of an LC circuit correspond to mass and spring?',
              answerOutline: 'Inductance acts as mass, and $1/C$ as spring constant.',
            },
            {
              question: 'What is the impedance at resonance in a series RLC circuit?',
              answerOutline: 'Just $R$, since the reactances cancel.',
            },
            {
              question: 'Why can a transformer not work with DC?',
              answerOutline: 'It needs a changing flux to induce a secondary voltage.',
            },
          ],
          relatedLessons: ['waves-optics/oscillators-and-resonance/lc-circuits-and-the-mechanical-electrical-analogy'],
        },
      ],
      project: {
        slug: 'rlc-transients',
        title: 'RLC transients and resonance',
        description: `Model a series RLC circuit in Python in two ways: in the time domain, by stepping the differential equation with \`scipy.integrate.solve_ivp\`, and in the frequency domain, with the impedance formula. Then show that they agree.

Use $L = 0.10\\ \\mathrm{H}$ and $C = 10\\ \\mathrm{\\mu F}$. A series circuit changes from ringing to overdamped at a critical resistance $R_c = 2\\sqrt{L/C}$, which is $200\\ \\Omega$ here. Show this by simulating a step of voltage at several resistances, then drive the circuit with a sine wave and let the start-up transient die away before you measure the steady amplitude. Sweep the driving frequency, and you should recover the resonance curve from the impedance formula.`,
        deliverables: [
          'A Python model of a series RLC circuit driven by any input voltage',
          'Step-response plots for R below, at and above the critical resistance',
          'A measurement of the ring-down rate, matched to the expected value R/2L',
          'A resonance curve from time-domain runs, overlaid on the impedance formula',
          'A note on how the mechanical oscillator from the mechanics course maps to this circuit',
        ],
        estimatedHours: 5,
        stretchGoals: [
          'Compare results with the same circuit built in the Falstad simulator',
          'Add a second coupled LC circuit and find its two normal frequencies',
        ],
      },
    },
    {
      slug: 'electromagnetic-waves-and-optics',
      title: 'Electromagnetic Waves and Optics',
      description:
        'Maxwell’s equations in outline, the prediction that light is an electromagnetic wave, and how rays reflect, refract and form images.',
      lessons: [
        {
          slug: 'maxwells-equations-in-outline',
          title: "Maxwell's equations in outline",
          summary:
            'The missing term in Ampere’s law, and the four equations that summarise everything in this course.',
          estimatedMinutes: 170,
          objectives: [
            'Explain why Ampere’s law needs a correction',
            'Compute the displacement current in a charging capacitor',
            "State Maxwell's four equations in integral form, and say what each one means",
            'Show how they predict the speed of light',
          ],
          concepts: [
            'Displacement current',
            "Gauss's law for electricity",
            "Gauss's law for magnetism",
            "Faraday's law",
            'Ampere-Maxwell law',
            'Speed of light from constants',
          ],
          explanation: `By now you have four laws. Maxwell noticed that one of them was incomplete.

Consider a capacitor being charged by a current $I$. Draw a loop around the wire and apply Ampere's law. Now take two surfaces bounded by that loop: a flat one pierced by the wire, and a balloon one that passes through the gap between the plates. No current crosses the balloon, yet the law must give the same answer for both. Something is missing.

In the gap, the electric field is changing. Maxwell added a term that acts just like a current, the **displacement current**:

$$I_d = \\epsilon_0\\frac{d\\Phi_E}{dt}.$$

For a charging capacitor, this equals the wire current exactly, so the two surfaces then agree. A changing electric field makes a magnetic field.

Now the whole subject fits in four equations:

$$\\oint\\vec E\\cdot d\\vec A = \\frac{Q_{\\text{enc}}}{\\epsilon_0} \\quad\\text{(charges make electric fields)}$$

$$\\oint\\vec B\\cdot d\\vec A = 0 \\quad\\text{(no magnetic charges)}$$

$$\\oint\\vec E\\cdot d\\vec l = -\\frac{d\\Phi_B}{dt} \\quad\\text{(changing B makes E)}$$

$$\\oint\\vec B\\cdot d\\vec l = \\mu_0I_{\\text{enc}} + \\mu_0\\epsilon_0\\frac{d\\Phi_E}{dt} \\quad\\text{(currents and changing E make B)}$$

**Worked example.** A capacitor with circular plates of radius $R = 3.0\\ \\mathrm{cm}$ charges with current $I = 2.0\\ \\mathrm{A}$. Find $dE/dt$ in the gap, and $B$ at $r = 1.0\\ \\mathrm{cm}$ from the axis, in the gap.

The field is $E = Q/\\epsilon_0\\pi R^2$, so

$$\\frac{dE}{dt} = \\frac{I}{\\epsilon_0\\pi R^2} = 8.0\\times 10^{13}\\ \\mathrm{V/(m\\,s)}.$$

For an Amperian circle of radius $r$ in the gap, the enclosed displacement current is $Ir^2/R^2$, so

$$B(2\\pi r) = \\mu_0I\\frac{r^2}{R^2} \\quad\\Rightarrow\\quad B = \\frac{\\mu_0Ir}{2\\pi R^2} = 4.4\\times 10^{-6}\\ \\mathrm{T}.$$

Check: this has the same form as $B$ inside a wire, as it should, and at the edge $r = R$ it gives $13\\ \\mathrm{\\mu T}$, the value for a wire with $2.0\\ \\mathrm{A}$ at that distance.

**The great prediction.** In empty space, there are no charges. But a changing $\\vec E$ makes $\\vec B$, and a changing $\\vec B$ makes $\\vec E$. So the fields can sustain each other and travel as a wave. Maxwell found its speed from two constants measured in bench-top electric and magnetic experiments:

$$c = \\frac{1}{\\sqrt{\\mu_0\\epsilon_0}} = 3.00\\times 10^{8}\\ \\mathrm{m/s}.$$

That is the measured speed of light. So light is an electromagnetic wave.

**Pitfalls.** Displacement current is not a flow of charge. It has the same effect on $\\vec B$ as a current, but it is a changing field. Also, the differential forms of these equations belong to the follow-on course, and you do not need them here.`,
          resources: [
            openstax2("Read the opening sections of the chapter on electromagnetic waves, on Maxwell's equations."),
            mit802('Use the lecture on displacement current and Maxwell’s equations.'),
            hyperphysics("Look up Maxwell's equations for a compact summary."),
          ],
          exercises: [
            {
              slug: 'compute-c',
              title: 'Compute the speed of light',
              prompt:
                'Using the given values of $\\mu_0$ and $\\epsilon_0$, compute $1/\\sqrt{\\mu_0\\epsilon_0}$ and confirm that its units are m/s, starting from the units of $\\mu_0$ (T m/A) and $\\epsilon_0$ ($\\mathrm{C^2/N\\,m^2}$). Write the results of each step.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Use $1\\ \\mathrm{T} = 1\\ \\mathrm{N/(A\\,m)}$ and $1\\ \\mathrm{A} = 1\\ \\mathrm{C/s}$. You should find $3.00\\times 10^{8}\\ \\mathrm{m/s}$.',
            },
            {
              slug: 'match-the-law',
              title: 'What each equation does',
              prompt:
                'For each of these, name the Maxwell equation that explains it and say why: (a) a compass needle moves near a current; (b) a charged balloon sticks to a wall; (c) a transformer steps down voltage; (d) you can never isolate a north pole; (e) a radio wave carries through empty space. Your answer should cite the correct equation and give one sentence for each.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'displacement-current',
              title: 'Displacement current equals the wire current',
              prompt:
                'For a parallel-plate capacitor of area $A$ with charge $Q$, write $\\Phi_E$ between the plates and show that $\\epsilon_0\\,d\\Phi_E/dt = dQ/dt$. Then find the field $B$ just outside the plate edge, at $r = R$, for the worked example. Compare it with $\\mu_0I/2\\pi R$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The flux is $EA = Q/\\epsilon_0$. The field at the edge is about $13\\ \\mathrm{\\mu T}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why did Ampere\'s law need a correction?',
              answerOutline: 'It gave different answers for different surfaces around a charging capacitor.',
            },
            {
              question: 'Which equation says there are no magnetic monopoles?',
              answerOutline: 'Gauss\'s law for magnetism: net magnetic flux through any closed surface is zero.',
            },
            {
              question: 'What does displacement current have in common with real current?',
              answerOutline: 'Both make magnetic fields, though no charge moves through the gap.',
            },
          ],
          relatedLessons: ['electromagnetism/maxwells-equations-and-waves/displacement-current-and-maxwells-equations'],
        },
        {
          slug: 'electromagnetic-waves',
          title: 'Electromagnetic waves',
          summary:
            'The structure of a plane wave, the spectrum, energy flow and radiation pressure.',
          estimatedMinutes: 150,
          objectives: [
            'Describe a plane electromagnetic wave',
            'Relate E, B, frequency and wavelength',
            'Compute intensity from the fields',
            'Compute radiation pressure',
          ],
          concepts: [
            'Transverse electromagnetic wave',
            'E over B equals c',
            'Electromagnetic spectrum',
            'Poynting vector',
            'Intensity',
            'Radiation pressure',
          ],
          explanation: `A plane electromagnetic wave moving along $x$ has $\\vec E$ and $\\vec B$ at right angles to each other, and to the direction of travel:

$$E_y = E_0\\sin(kx - \\omega t), \\qquad B_z = B_0\\sin(kx - \\omega t).$$

The two oscillate in step, with $E_0 = cB_0$. The direction of travel is the direction of $\\vec E\\times\\vec B$. As with other waves, $c = f\\lambda$ and $\\omega = ck$.

All the kinds of light are this one wave, with different wavelengths: radio (metres and more), microwaves, infrared, visible ($400$ to $700\\ \\mathrm{nm}$), ultraviolet, X-rays and gamma rays. An FM station at $100\\ \\mathrm{MHz}$ has $\\lambda = 3.0\\ \\mathrm{m}$, and green light at $550\\ \\mathrm{nm}$ has $f = 5.5\\times 10^{14}\\ \\mathrm{Hz}$.

**Energy.** Both fields hold energy, and equal amounts of it. The rate of energy flow per unit area is given by the **Poynting vector**,

$$\\vec S = \\frac{1}{\\mu_0}\\vec E\\times\\vec B.$$

Its average over a cycle is the **intensity**:

$$I = \\frac{E_0B_0}{2\\mu_0} = \\frac{E_0^2}{2\\mu_0c}.$$

**Worked example.** Sunlight above the atmosphere has intensity $1361\\ \\mathrm{W/m^2}$. Find the peak electric and magnetic fields.

Solve for $E_0$:

$$E_0 = \\sqrt{2\\mu_0cI} = \\sqrt{2(4\\pi\\times 10^{-7})(3.00\\times 10^{8})(1361)} = 1.0\\times 10^{3}\\ \\mathrm{V/m}.$$

Then $B_0 = E_0/c = 3.4\\ \\mathrm{\\mu T}$.

Check: the magnetic field is small, about a tenth of Earth's. The electric field is thousands of times below what would break down air. So sunlight is gentle in terms of field size, even though its energy flow is large. Units: $\\mathrm{V/m}$ divided by $\\mathrm{m/s}$ gives tesla.

**Momentum.** Light also carries momentum, $p = U/c$. So when it is absorbed, it exerts a **radiation pressure** of $P = I/c$, and twice that if reflected. For sunlight, the absorbed pressure is $4.5\\ \\mathrm{\\mu Pa}$. That is tiny, but in space, with nothing else to push, it matters, and solar sails use it.

**Spreading.** For a small source radiating in all directions, $I = P/4\\pi r^2$, so fields fall as $1/r$. That slow falloff is why radio works over large distances.

**Pitfalls.** $E_0 = cB_0$ does not mean that the electric part is stronger, since the two fields have different units and hold equal energy. Do not confuse the peak with the RMS: some books write $I = E_{\\text{rms}}^2/\\mu_0c$. All electromagnetic waves travel at $c$ in a vacuum, whatever their frequency.`,
          resources: [
            openstax2('Read the rest of the chapter on electromagnetic waves.'),
            phet('Radio Waves & Electromagnetic Fields', 'radio-waves', 'Wiggle a charge at one antenna, and watch the field reach the other.'),
            {
              title: 'NIST Fundamental Physical Constants',
              url: 'https://physics.nist.gov/cuu/Constants/',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'Exact and measured values of c, μ0 and ε0.',
            },
          ],
          exercises: [
            {
              slug: 'laser-pointer',
              title: 'A laser pointer',
              prompt:
                'A $1.0\\ \\mathrm{mW}$ laser makes a spot of area $1.0\\ \\mathrm{mm^2}$. Find the intensity, and the peak electric field. Compare the intensity with sunlight, and explain why a laser beam entering the eye is dangerous.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Intensity $1000\\ \\mathrm{W/m^2}$, about that of sunlight; $E_0 = 868\\ \\mathrm{V/m}$. The eye focuses a laser to a very small spot.',
            },
            {
              slug: 'solar-sail',
              title: 'A solar sail',
              prompt:
                'A perfectly reflecting sail of area $1000\\ \\mathrm{m^2}$ faces the Sun at Earth\'s distance. Find the force on it, in mN. If the total craft has a mass of $10\\ \\mathrm{kg}$, find its acceleration, and the speed gained in one day, ignoring gravity.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Force $9.1\\ \\mathrm{mN}$; acceleration about $9.1\\times 10^{-4}\\ \\mathrm{m/s^2}$; about $78\\ \\mathrm{m/s}$ in a day.',
            },
            {
              slug: 'frequency-sort',
              title: 'Wavelengths and frequencies',
              prompt:
                'Find $\\lambda$ for each of: an AM station at $1.0\\ \\mathrm{MHz}$, Wi-Fi at $2.4\\ \\mathrm{GHz}$, and a dental X-ray at $3.0\\times 10^{18}\\ \\mathrm{Hz}$. For each, name something of about that size. Explain why antenna size is often about half a wavelength.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Respectively $300\\ \\mathrm{m}$, $12.5\\ \\mathrm{cm}$ and $0.10\\ \\mathrm{nm}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the relation among the directions of $\\vec E$, $\\vec B$ and the wave?',
              answerOutline: 'All three are mutually perpendicular, and travel is along $\\vec E\\times\\vec B$.',
            },
            {
              question: 'Is the energy of a wave mostly electric or magnetic?',
              answerOutline: 'They are equal.',
            },
            {
              question: 'How does radiation pressure differ between absorbing and reflecting a beam?',
              answerOutline: 'A reflecting surface feels twice the pressure.',
            },
          ],
          relatedLessons: ['waves-optics/electromagnetic-waves-and-geometric-optics/electromagnetic-plane-waves-and-the-poynting-vector'],
        },
        {
          slug: 'reflection-and-refraction',
          title: 'Reflection and refraction',
          summary:
            'Rays at a surface: the law of reflection, Snell’s law and total internal reflection.',
          estimatedMinutes: 150,
          objectives: [
            'Define the index of refraction',
            'Apply the law of reflection and Snell’s law',
            'Find the critical angle for total internal reflection',
            'Explain optical fibres',
          ],
          concepts: [
            'Ray model',
            'Index of refraction',
            'Law of reflection',
            "Snell's law",
            'Total internal reflection',
            'Dispersion',
          ],
          explanation: `When light meets objects much larger than its wavelength, we can follow **rays**, straight lines perpendicular to the wavefronts.

In a material, light slows down to $v = c/n$, where $n$ is the **index of refraction**: $1.00$ for air, $1.33$ for water, and about $1.5$ for glass. The frequency stays the same, so the wavelength shrinks to $\\lambda/n$.

At a surface, some light reflects, and some enters. All angles are measured from the **normal**, the line perpendicular to the surface.

- **Reflection:** $\\theta_r = \\theta_i$.
- **Refraction (Snell's law):**

$$n_1\\sin\\theta_1 = n_2\\sin\\theta_2.$$

Light bends toward the normal when it slows down. You can see why from the wave picture: think of a line of marchers entering mud at an angle. The side that gets there first slows down first, so the line turns.

**Worked example.** Light goes from air into glass with $n = 1.50$ at $30^\\circ$ to the normal. Find the angle in the glass, the speed, and the wavelength if $\\lambda = 600\\ \\mathrm{nm}$ in air. Then find the critical angle for light going from glass to air.

Snell's law gives

$$\\sin\\theta_2 = \\frac{\\sin 30^\\circ}{1.50} = 0.333 \\quad\\Rightarrow\\quad \\theta_2 = 19.5^\\circ.$$

Speed: $v = c/1.50 = 2.0\\times 10^{8}\\ \\mathrm{m/s}$. Wavelength: $600/1.50 = 400\\ \\mathrm{nm}$. Check: the ray bends toward the normal, since it slows down, and $f$ is the same in both, because $v/\\lambda$ is unchanged.

**Total internal reflection.** Going the other way, light bends away from the normal. At a certain incident angle, the refracted ray runs along the surface, at $90^\\circ$. Beyond this **critical angle**, no light gets out, and all of it reflects:

$$\\sin\\theta_c = \\frac{n_2}{n_1}, \\qquad n_1 > n_2.$$

For glass to air, $\\theta_c = \\sin^{-1}(1/1.50) = 41.8^\\circ$. For water to air, it is $48.8^\\circ$. A diver looking up sees the whole sky squeezed into a cone around that angle. **Optical fibres** trap light by this rule, and that is how the internet travels under oceans.

**Dispersion.** Since $n$ varies slightly with wavelength, with blue bending more than red, a prism spreads white light, and raindrops make rainbows.

**Pitfalls.** Measure angles from the normal, not from the surface. Total internal reflection can happen only when going into a *lower* index. Keep the calculator in degrees for these angles.`,
          resources: [
            openstax3('Read the chapter on the nature of light.'),
            phet('Bending Light', 'bending-light', 'Measure angles, and find the critical angle in glass and water.'),
            hyperphysics('Look up refraction and total internal reflection.'),
          ],
          exercises: [
            {
              slug: 'apparent-depth',
              title: 'How deep is that pool?',
              prompt:
                'Looking straight down, a pool $2.0\\ \\mathrm{m}$ deep seems shallower. Using Snell\'s law with the small-angle approximation, show that the apparent depth is $d/n$. Evaluate with $n = 1.33$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For small angles, $\\sin\\theta \\approx \\tan\\theta$. The apparent depth is $1.5\\ \\mathrm{m}$.',
            },
            {
              slug: 'optical-fibre',
              title: 'Light in a fibre',
              prompt:
                'A fibre has a core with $n_1 = 1.50$ and cladding with $n_2 = 1.46$. Show that the largest angle from the axis, in air, at which a ray can enter and stay trapped satisfies $\\sin\\theta_{\\max} = \\sqrt{n_1^2 - n_2^2}$. Evaluate $\\theta_{\\max}$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'At the side wall, the ray must meet the critical angle. The result is about $20^\\circ$.',
            },
            {
              slug: 'ray-through-a-slab',
              title: 'Through a glass slab',
              prompt:
                'A ray enters a flat glass slab ($n = 1.50$, thickness $5.0\\ \\mathrm{cm}$) from air at $45^\\circ$. Show that it leaves parallel to its original direction, and find the sideways shift. Check with a short Python calculation.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The shift is $t\\sin(\\theta_1 - \\theta_2)/\\cos\\theta_2$, about $1.6\\ \\mathrm{cm}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What changes and what stays the same when light enters glass?',
              answerOutline: 'Speed and wavelength fall. Frequency stays the same.',
            },
            {
              question: 'Going from water to air, does light bend toward or away from the normal?',
              answerOutline: 'Away, as it speeds up.',
            },
            {
              question: 'Why can total internal reflection not happen going from air into glass?',
              answerOutline: 'The refracted ray bends toward the normal, so it always exists.',
            },
          ],
          relatedLessons: ['waves-optics/electromagnetic-waves-and-geometric-optics/reflection-refraction-and-fermats-principle'],
        },
        {
          slug: 'mirrors-and-lenses',
          title: 'Mirrors and lenses',
          summary:
            'Forming images: the thin lens equation, sign conventions, ray diagrams and simple systems of lenses.',
          estimatedMinutes: 170,
          objectives: [
            'Use the thin lens and mirror equation with sign conventions',
            'Draw a principal-ray diagram',
            'Find image position, size and type',
            'Solve a two-lens system',
          ],
          concepts: [
            'Real and virtual images',
            'Focal length',
            'Thin lens equation',
            'Magnification',
            'Principal rays',
            'Lensmaker’s equation',
          ],
          explanation: `Curved surfaces gather rays. A **converging** lens or a concave mirror brings parallel rays together at a **focal point**, a distance $f$ from it. A **diverging** lens or a convex mirror spreads them, as if from a point behind.

If rays from a point on an object meet again at another point, that is a **real image**, which can be shown on a screen. If they only seem to come from a point, that is a **virtual image**, which you can only see through the lens or mirror.

Both lenses and mirrors, with thin-lens and small-angle assumptions, obey

$$\\frac{1}{o} + \\frac{1}{i} = \\frac{1}{f}, \\qquad m = -\\frac{i}{o}.$$

**Signs.** Use these conventions. $o > 0$ for a real object. $i > 0$ for a real image: on the far side of a lens, or the same side as the object for a mirror. $i < 0$ for a virtual image. $f > 0$ for converging, and $f < 0$ for diverging. A negative $m$ means an inverted image. For a mirror, $f = R/2$.

**Ray diagrams.** Draw this every time, as a check on the algebra. For a lens, draw three rays from the top of the object: one parallel to the axis, which passes through the far focus; one through the centre, undeviated; and one through the near focus, which leaves parallel.

**Worked example.** An object is $15\\ \\mathrm{cm}$ from a converging lens with $f = 10\\ \\mathrm{cm}$. Find the image.

$$\\frac{1}{i} = \\frac{1}{10} - \\frac{1}{15} = \\frac{1}{30} \\quad\\Rightarrow\\quad i = 30\\ \\mathrm{cm}.$$

$$m = -\\frac{30}{15} = -2.0.$$

So the image is real, $30\\ \\mathrm{cm}$ beyond the lens, inverted, and twice the size. Check with a ray diagram: the object lies between $f$ and $2f$, which should give a real, enlarged, inverted image beyond $2f$. It does, and this is how a projector works.

Move the object inside $f$, and $i$ goes negative. That gives a virtual, upright, enlarged image, which is a magnifying glass.

**Two lenses.** Handle one at a time. The image from the first lens becomes the object for the second, with a distance measured from the second lens. If that image falls beyond the second lens, the object distance is negative. Total magnification is the product $m_1m_2$.

**Lens shape.** The focal length follows from the surfaces, as given by the **lensmaker's equation**:

$$\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right).$$

For a symmetric glass lens with $n = 1.5$ and radii of $20\\ \\mathrm{cm}$, that is $R_1 = +20$ and $R_2 = -20$, so $f = 20\\ \\mathrm{cm}$.

**Pitfalls.** The equations are only for small angles, and thin lenses. Real lenses suffer from aberrations. Stick to one sign convention, as books differ. A virtual object is not a mistake: it is a normal case in lens systems.`,
          resources: [
            openstax3('Read the chapter on geometric optics and image formation.'),
            phet('Geometric Optics', 'geometric-optics', 'Move the object through f and 2f, and compare with your predictions.'),
            hyperphysics('Look up thin lenses and spherical mirrors.'),
          ],
          exercises: [
            {
              slug: 'concave-mirror',
              title: 'A concave mirror',
              prompt:
                'A concave mirror has a radius of curvature of $40\\ \\mathrm{cm}$. Find the image distance and magnification for an object at $30\\ \\mathrm{cm}$, and at $10\\ \\mathrm{cm}$. Say in each case whether the image is real or virtual, upright or inverted. Then draw ray diagrams to confirm.',
              kind: 'problem',
              difficulty: 1,
              hint: 'With $f = 20\\ \\mathrm{cm}$: $i = 60\\ \\mathrm{cm}$, $m = -2$, real and inverted. Then $i = -20\\ \\mathrm{cm}$, $m = +2$, virtual and upright.',
            },
            {
              slug: 'two-lenses',
              title: 'Two lenses',
              prompt:
                'Lenses with $f_1 = 10\\ \\mathrm{cm}$ and $f_2 = 20\\ \\mathrm{cm}$ are $40\\ \\mathrm{cm}$ apart. An object sits $15\\ \\mathrm{cm}$ in front of the first lens. Find the final image position, its type, and the overall magnification.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The first image is $30\\ \\mathrm{cm}$ past lens 1, so $10\\ \\mathrm{cm}$ before lens 2. That gives $i_2 = -20\\ \\mathrm{cm}$, virtual, with total $m = -4.0$.',
            },
            {
              slug: 'ray-tracer',
              title: 'A paraxial ray tracer',
              prompt:
                'Write a Python function that traces rays through thin lenses, using the small-angle rule that a lens at height $y$ changes the slope by $-y/f$. Launch a fan of rays from one object point in the two-lens exercise, plot them, and confirm that they meet (or appear to meet) at the predicted image.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Between lenses, $y$ grows by slope times distance. A virtual image appears where the rays traced backward meet.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a real and a virtual image?',
              answerOutline: 'Light really converges at a real image and it can be shown on a screen; a virtual image is only apparent.',
            },
            {
              question: 'What does a negative magnification mean?',
              answerOutline: 'The image is inverted.',
            },
            {
              question: 'Where must an object sit for a converging lens to act as a magnifying glass?',
              answerOutline: 'Inside the focal length.',
            },
          ],
          relatedLessons: ['waves-optics/electromagnetic-waves-and-geometric-optics/lenses-mirrors-and-ray-matrices'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'simulated-mass-spectrometer',
    title: 'A simulated mass spectrometer',
    description: `Design and simulate an instrument that sorts ions by mass, using every part of the course. Ions start at rest, pass through an accelerating gap, enter a magnetic sector, and strike a detector. Your job is to choose the voltage, the field and the geometry that separate two chosen isotopes, then prove the design works.

The magnetic field should come from a real pair of Helmholtz coils, which you compute numerically from the Biot-Savart law, rather than from a perfect uniform field. Add a power supply model: an AC source, a transformer, an RC smoothing stage for the accelerating voltage, and an RL model for the coil current. Ripple in the supply becomes ripple in ion energy, and you can measure how much that blurs the two peaks. Finally, the detector is a phosphor screen read by a camera through a lens, so you must choose a lens that images the spots at a useful size.

Keep each stage simple and checked. The goal is a clear chain of reasoning from a circuit diagram to a spectrum with two separated peaks.`,
    deliverables: [
      'A one-page design: voltages, currents, geometry, the two isotopes and the separation target',
      'A numerical Biot-Savart model of the coils, with a plot of field uniformity across the sector',
      'A particle tracer for ions in the fields, tested against the formula r = mv/qB',
      'Models of the transformer, RC smoothing and RL coil stages, with computed ripple and settling time',
      'A simulated spectrum showing two separated peaks, with and without supply ripple',
      'A thin-lens calculation for the camera, giving image size and position',
      'A short report on what limits the mass resolution, with estimates of each effect',
    ],
    estimatedHours: 14,
    stretchGoals: [
      'Add a velocity selector and show how much it sharpens the peaks',
      'Include the small electric repulsion between ions in the beam and estimate when it matters',
    ],
  },
  masteryChecklist: [
    'I can find electric fields by superposition and by Gauss’s law, choosing the better tool',
    'I can compute potentials and move between potential and field',
    'I can solve DC networks and predict RC, RL and LC behaviour in time',
    'I can find magnetic forces and fields with the right directions',
    'I can apply Faraday’s and Lenz’s laws and check them with energy conservation',
    'I can state Maxwell’s four equations in words and explain how they predict light',
    'I can trace rays through surfaces, lenses and mirrors',
    'I can test any of these results with a simulation or a short Python model',
  ],
});
