import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const openstax = (note: string): ResourceInput => ({
  title: 'OpenStax University Physics Volume 1',
  url: 'https://openstax.org/details/books/university-physics-volume-1',
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary: true,
});

const mit801 = (note: string): ResourceInput => ({
  title: 'MIT 8.01SC Classical Mechanics',
  url: 'https://ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/',
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

export default defineSubject({
  id: 'physics-mechanics',
  title: 'University Physics: Mechanics (PHYS 211)',
  category: 'physics',
  tagline:
    'Calculus-based introductory mechanics: forces, energy, momentum, rotation, gravity, fluids and waves, with a repeatable method for solving problems.',
  description: `This is a first university physics course. It follows the topics of PHYS 211 (University Physics: Mechanics) at the University of Illinois Urbana-Champaign, as given in the public catalog description. The course is original and is not affiliated with Illinois; nothing here comes from its lectures, homework or exams.

You will learn how to describe motion, why things move the way they do, and how the ideas of energy and momentum let you skip the details of a hard problem. The real subject, though, is method. Every lesson shows the same habits: draw the situation, choose axes, write the law that applies, solve with symbols, put in numbers last, then check units, size and limiting cases. A free-body diagram and a thirty-second estimate will save you more often than any formula.

The course assumes Calculus I and expects Calculus II alongside it. Derivatives and simple integrals appear from the start, because velocity is a derivative and work is an integral. Nothing here needs multivariable calculus or formal differential equations beyond the oscillator, which is solved by inspection. No lab equipment is needed: you experiment with PhET simulations and short Python models.

Throughout, take $g = 9.80\\ \\mathrm{m/s^2}$ unless a problem says otherwise. When you finish, \`classical-mechanics\` is the natural next step. It repeats these ideas with far stronger mathematics and goes on to Lagrangian and Hamiltonian mechanics.`,
  difficulty: 'beginner',
  estimatedHours: 100,
  prerequisites: ['calculus-1'],
  recommendedBackground: [
    'Calculus II taken alongside this course (integration techniques help from the rotation module on)',
    'High-school algebra and trigonometry, used without hesitation',
    'Enough Python to write a loop and make a plot, for the projects',
  ],
  tags: ['mechanics', 'newtons laws', 'energy', 'momentum', 'rotation', 'gravitation', 'fluids', 'waves', 'problem solving'],
  core: false,
  modules: [
    {
      slug: 'kinematics',
      title: 'Kinematics',
      description:
        'The language of motion: units and estimates, vectors, and position, velocity and acceleration in one and two dimensions, seen from different frames.',
      lessons: [
        {
          slug: 'units-estimates-and-method',
          title: 'Units, estimates and how to solve a physics problem',
          summary:
            'SI units, dimensional analysis, order-of-magnitude estimates and the five-step method used in every later lesson.',
          estimatedMinutes: 120,
          objectives: [
            'Convert between units by multiplying by factors equal to one',
            'Use dimensional analysis to catch errors and to guess the form of a formula',
            'Make an order-of-magnitude estimate with stated assumptions',
            'Follow a repeatable method: sketch, law, symbols, numbers, check',
            'Report an answer with sensible significant figures',
          ],
          concepts: [
            'SI base units: metre, kilogram, second',
            'Dimensions and dimensional homogeneity',
            'Unit conversion factors',
            'Order-of-magnitude estimate',
            'Significant figures',
            'Limiting-case check',
          ],
          explanation: `Most errors in physics are not deep. They are a lost unit, a wrong sign, or a number nobody looked at twice. This lesson gives you the habits that catch them.

**The method.** Use these five steps on every problem. (1) *Sketch* the situation and name the quantities. (2) Choose a *law* that connects what you know to what you want. (3) Solve in *symbols*. (4) Put in *numbers*, with units. (5) *Check*: are the units right, is the size believable, and does the formula behave in an extreme case?

**Units.** To convert, multiply by a fraction equal to one, so that unwanted units cancel. An equation can only be right if both sides have the same dimensions, written in terms of length $L$, mass $M$ and time $T$. You cannot add metres to seconds, and the argument of $\\sin$ or $e^x$ must have no dimensions. This check takes seconds and catches many algebra slips.

**Worked example.** You glance at a phone for $2.0\\ \\mathrm{s}$ while driving at $100\\ \\mathrm{km/h}$. How far do you travel blind? Sketch: straight line, constant speed. Law: $d = vt$. Convert first:

$$100\\ \\frac{\\mathrm{km}}{\\mathrm{h}} \\times \\frac{1000\\ \\mathrm{m}}{1\\ \\mathrm{km}} \\times \\frac{1\\ \\mathrm{h}}{3600\\ \\mathrm{s}} = 27.8\\ \\mathrm{m/s}.$$

Then $d = (27.8\\ \\mathrm{m/s})(2.0\\ \\mathrm{s}) = 56\\ \\mathrm{m}$. Check: metres, as required. The size is more than half a football field, which is alarming but plausible at motorway speed. The time has two significant figures, so the answer gets two.

**Estimates.** An order-of-magnitude estimate needs only rough inputs, stated openly. How many times does a heart beat in a lifetime? Take 70 beats per minute for 80 years: $70 \\times 60 \\times 24 \\times 365 \\times 80 \\approx 2.9\\times 10^{9}$. Say "about three billion"; more digits would be false precision.

**Dimensional guessing.** A pendulum's period can depend only on its length $L$, on $g$, and perhaps on its mass $m$. The only combination with units of time is $\\sqrt{L/g}$, and mass cannot appear because nothing else contains kilograms. So $T \\propto \\sqrt{L/g}$, found without solving anything. The pure number in front must come from real physics.`,
          resources: [
            openstax('Read the opening chapter on units and measurement, then its section on estimates.'),
            {
              title: 'NIST Guide to the SI',
              url: 'https://physics.nist.gov/cuu/Units/',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The official reference for unit names, symbols and how to write them.',
            },
            mit801('Skim the opening week to see how a problem is set up and how the course is organised.'),
          ],
          exercises: [
            {
              slug: 'conversions',
              title: 'Conversions with large and small numbers',
              prompt:
                'Using $c = 3.00\\times 10^{8}\\ \\mathrm{m/s}$ and one year $= 3.156\\times 10^{7}\\ \\mathrm{s}$, find (a) one light-year in metres. (b) Fingernails grow about $3\\ \\mathrm{mm}$ a month. Express this in m/s.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) $9.47\\times 10^{15}\\ \\mathrm{m}$; (b) about $1.2\\times 10^{-9}\\ \\mathrm{m/s}$, roughly a nanometre per second.',
            },
            {
              slug: 'guess-a-wave-speed',
              title: 'Guess a formula from dimensions',
              prompt:
                'The speed of a wave on a string can depend only on the tension $F$ (a force) and the mass per unit length $\\mu$. Find the combination $F^a \\mu^b$ with units of speed. Show the equations you solve for $a$ and $b$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Force has dimensions $MLT^{-2}$ and $\\mu$ has $ML^{-1}$. The result is $v \\propto \\sqrt{F/\\mu}$.',
            },
            {
              slug: 'walk-to-the-moon',
              title: 'A Fermi estimate you can defend',
              prompt:
                'The Moon is $3.84\\times 10^{8}\\ \\mathrm{m}$ away. Walking at $1.4\\ \\mathrm{m/s}$ without stopping, how many years would the trip take? Then estimate, with stated assumptions, how far you will walk in your lifetime, and say what fraction of the trip that is. Your assumptions must be written down and your final answer given to one significant figure.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The trip takes about 8.7 years. At 5 km a day for 70 years you walk about $1.3\\times 10^{8}\\ \\mathrm{m}$, about a third of the way.',
            },
          ],
          selfAssessment: [
            {
              question: 'Name the five steps of the problem-solving method and say why symbols come before numbers.',
              answerOutline:
                'Sketch, law, symbols, numbers, check. Symbols let you check dimensions and limiting cases, and reuse the result.',
            },
            {
              question: 'Why can a mass not appear in the formula for the period of a simple pendulum, on dimensional grounds alone?',
              answerOutline:
                'No other quantity available ($L$, $g$) contains kilograms, so nothing could cancel the units of mass.',
            },
            {
              question: 'A classmate writes $v = at^2$. How do you know at once that it is wrong?',
              answerOutline:
                'The right side has units $\\mathrm{m/s^2 \\cdot s^2} = \\mathrm{m}$, not $\\mathrm{m/s}$.',
            },
          ],
        },
        {
          slug: 'vectors-and-components',
          title: 'Vectors and components',
          summary:
            'Adding vectors by components, and the dot and cross products that later define work and torque.',
          estimatedMinutes: 150,
          objectives: [
            'Resolve a vector into components with respect to a chosen set of axes',
            'Add vectors by components and recover the magnitude and direction',
            'Compute a dot product and use it to find the angle between two vectors',
            'Compute a cross product and find its direction with the right-hand rule',
          ],
          concepts: [
            'Scalar versus vector',
            'Unit vectors i, j, k',
            'Components and the choice of axes',
            'Vector addition by components',
            'Dot product',
            'Cross product and right-hand rule',
          ],
          explanation: `Position, velocity, force and momentum all have direction as well as size. A **vector** carries both, and the reliable way to handle one is through its **components** along perpendicular axes:

$$\\vec A = A_x\\hat\\imath + A_y\\hat\\jmath, \\qquad A_x = A\\cos\\theta,\\quad A_y = A\\sin\\theta,$$

where $\\theta$ is measured from the $+x$ axis. If your angle is measured from some other direction, do not trust the formula: draw the triangle and decide by eye which side is which. Going back, $A = \\sqrt{A_x^2 + A_y^2}$ and $\\tan\\theta = A_y/A_x$. A calculator's $\\tan^{-1}$ cannot tell a vector in the second quadrant from one in the fourth, so always look at the signs.

**Adding** is then just adding components. Never add magnitudes unless the vectors point the same way.

**Worked example.** A hiker walks $6.0\\ \\mathrm{km}$ at $30^\\circ$ north of east, then $2.5\\ \\mathrm{km}$ due west, then $4.0\\ \\mathrm{km}$ due north. Find the net displacement. Take east as $+x$ and north as $+y$.

- First leg: $A_x = 6.0\\cos 30^\\circ = 5.20$, $A_y = 6.0\\sin 30^\\circ = 3.00$.
- Second leg: $(-2.50,\\ 0)$.
- Third leg: $(0,\\ 4.00)$.

Add columns: $R_x = 2.70\\ \\mathrm{km}$, $R_y = 7.00\\ \\mathrm{km}$. So $R = \\sqrt{2.70^2 + 7.00^2} = 7.50\\ \\mathrm{km}$, at $\\tan^{-1}(7.00/2.70) = 68.9^\\circ$ north of east. Check: the total walked is $12.5\\ \\mathrm{km}$, so a smaller net distance is right. Both components are positive, so the answer must be in the north-east quadrant.

**Two products.** The **dot product** gives a number:

$$\\vec A\\cdot\\vec B = AB\\cos\\theta = A_xB_x + A_yB_y + A_zB_z.$$

It measures how much two vectors point the same way, and it is zero when they are perpendicular. The **cross product** gives a vector of size $AB\\sin\\theta$, perpendicular to both. Curl the fingers of your right hand from $\\vec A$ to $\\vec B$, and your thumb gives its direction. In components, $\\vec A\\times\\vec B = (A_yB_z - A_zB_y,\\ A_zB_x - A_xB_z,\\ A_xB_y - A_yB_x)$. Order matters: $\\vec B\\times\\vec A = -\\vec A\\times\\vec B$. You will use the dot product for work and the cross product for torque.`,
          resources: [
            openstax('Read the chapter on vectors, including the worked examples on components.'),
            phet('Vector Addition', 'vector-addition', 'Build the worked example and watch the components add.'),
            hyperphysics('Look up vectors for a compact reference on dot and cross products.'),
          ],
          exercises: [
            {
              slug: 'components-and-back',
              title: 'Components and back',
              prompt:
                '(a) A $25\\ \\mathrm{N}$ force acts at $40^\\circ$ above the $+x$ axis. Find its components. (b) A vector has components $(7.0,\\ -3.0)$. Find its magnitude and direction, and say which quadrant it lies in.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) $(19.2,\\ 16.1)\\ \\mathrm{N}$; (b) magnitude 7.6, at $23^\\circ$ below the $+x$ axis, fourth quadrant.',
            },
            {
              slug: 'dot-and-cross',
              title: 'Dot and cross by hand',
              prompt:
                'Let $\\vec A = 3\\hat\\imath + 4\\hat\\jmath$ and $\\vec B = -2\\hat\\imath + \\hat\\jmath + 2\\hat k$. Find $\\vec A\\cdot\\vec B$, the angle between them, and $\\vec A\\times\\vec B$. Verify that your cross product is perpendicular to both vectors. Check everything with `numpy.dot` and `numpy.cross`.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The dot product is -2, the angle is $97.7^\\circ$, and the cross product is $(8,\\ -6,\\ 11)$.',
            },
            {
              slug: 'tilted-axes',
              title: 'Axes are your choice',
              prompt:
                'A weight $W$ acts straight down on a block on a ramp tilted at angle $\\theta$. Using axes along and perpendicular to the ramp, show that the component along the ramp is $W\\sin\\theta$ and the component into the ramp is $W\\cos\\theta$. Check both formulas at $\\theta = 0$ and $\\theta = 90^\\circ$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The angle between the weight and the perpendicular to the ramp equals the ramp angle. At $\\theta = 0$ the along-ramp part must vanish.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is adding components safer than adding magnitudes and angles?',
              answerOutline:
                'Components along fixed axes add as ordinary numbers; magnitudes add only for parallel vectors, and angles never simply add.',
            },
            {
              question: 'What does $\\vec A\\cdot\\vec B = 0$ tell you when neither vector is zero?',
              answerOutline: 'The vectors are perpendicular.',
            },
            {
              question: 'How do you find the direction of $\\vec A\\times\\vec B$, and how does it change if you swap the order?',
              answerOutline:
                'Right-hand rule: curl fingers from A to B, thumb gives the direction. Swapping the order reverses it.',
            },
          ],
          relatedLessons: ['classical-mechanics/kinematics-and-newtons-laws/vectors-and-kinematics'],
        },
        {
          slug: 'motion-in-one-dimension',
          title: 'Motion in one dimension',
          summary:
            'Velocity and acceleration as derivatives, the constant-acceleration equations as integrals, and free fall.',
          estimatedMinutes: 180,
          objectives: [
            'Find velocity and acceleration from position by differentiating',
            'Find velocity and position from acceleration by integrating, using initial conditions',
            'Distinguish displacement from distance travelled',
            'Solve constant-acceleration and free-fall problems with a consistent sign convention',
          ],
          concepts: [
            'Position, displacement, distance',
            'Average and instantaneous velocity',
            'Acceleration as dv/dt',
            'Initial conditions and constants of integration',
            'Constant-acceleration equations',
            'Free fall',
          ],
          explanation: `Calculus was invented for this problem. If $x(t)$ is the position of an object, then its velocity and acceleration are

$$v = \\frac{dx}{dt}, \\qquad a = \\frac{dv}{dt}.$$

Going the other way, you integrate, and each integration needs an initial condition: $v(t) = v_0 + \\int_0^t a\\,dt'$ and $x(t) = x_0 + \\int_0^t v\\,dt'$.

If $a$ is constant, those integrals give the equations you may know by heart:

$$v = v_0 + at, \\qquad x = x_0 + v_0t + \\tfrac12 at^2, \\qquad v^2 = v_0^2 + 2a(x - x_0).$$

Use them only when $a$ really is constant. The third has no $t$ in it, so it is the quick route when time is not given or wanted. In **free fall**, near Earth's surface and ignoring air, $a = -g$ if up is positive.

**Worked example.** A particle moves along a line with $x(t) = 2.0t^3 - 9.0t^2 + 12t$, with $x$ in metres and $t$ in seconds. Find its displacement and its total distance from $t = 0$ to $t = 3\\ \\mathrm{s}$.

Differentiate: $v = 6.0t^2 - 18t + 12 = 6.0(t-1)(t-2)$. The particle stops, and so can reverse, at $t = 1\\ \\mathrm{s}$ and $t = 2\\ \\mathrm{s}$. Evaluate $x$ at each key time:

| $t$ (s) | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $x$ (m) | 0 | 5 | 4 | 9 |

The displacement is $x(3) - x(0) = 9\\ \\mathrm{m}$. The distance adds the length of each leg: $5 + 1 + 5 = 11\\ \\mathrm{m}$. Check: distance can never be less than displacement, and it equals it only if the particle never reverses. Note that $a = 12t - 18$ changes with time, so the constant-acceleration equations would have given nonsense here.

**Pitfalls.** Choose a positive direction and keep to it: a falling ball has negative velocity *and* negative acceleration, so it speeds up. Velocity and acceleration need not point the same way. At the top of a throw, $v = 0$ but $a = -g$, not zero. "Decelerating" means only that $v$ and $a$ have opposite signs.`,
          resources: [
            openstax('Read the chapter on motion along a straight line, especially finding velocity and displacement from acceleration.'),
            mit801('Work the one-dimensional kinematics unit, including its problem-solving videos.'),
            hyperphysics('Look up motion in one dimension for a quick reference.'),
          ],
          exercises: [
            {
              slug: 'braking-car',
              title: 'A braking car',
              prompt:
                'A car travelling at $30\\ \\mathrm{m/s}$ stops in $45\\ \\mathrm{m}$ at constant acceleration. Find the size of the acceleration and the stopping time. Which equation avoids needing the time?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Use $v^2 = v_0^2 + 2a\\Delta x$. Answers: $10\\ \\mathrm{m/s^2}$ and $3.0\\ \\mathrm{s}$.',
            },
            {
              slug: 'ball-from-a-roof',
              title: 'A ball thrown up from a roof',
              prompt:
                'A ball is thrown straight up at $15\\ \\mathrm{m/s}$ from a roof $20\\ \\mathrm{m}$ above the ground. Ignoring air, find when it lands and how fast it is going. Explain why one root of the quadratic is rejected, and check that the landing speed is the same as if it had been thrown straight down at $15\\ \\mathrm{m/s}$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: about $4.1\\ \\mathrm{s}$ and $25\\ \\mathrm{m/s}$. The speed follows from $v^2 = v_0^2 + 2a\\Delta x$, which does not care about the initial direction.',
            },
            {
              slug: 'integrate-acceleration',
              title: 'Integrate a varying acceleration',
              prompt:
                'A cart has $a(t) = 4.0 - 2.0t$ (SI units), with $v(0) = 1.0\\ \\mathrm{m/s}$ and $x(0) = 0$. Find $v(t)$ and $x(t)$. When does the cart first come to rest, and where is it at $t = 3.0\\ \\mathrm{s}$?',
              kind: 'problem',
              difficulty: 2,
              hint: '$v = 1 + 4t - t^2$ and $x = t + 2t^2 - t^3/3$. It stops at $t = 2 + \\sqrt 5 = 4.24\\ \\mathrm{s}$, and $x(3) = 12\\ \\mathrm{m}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'When is it wrong to use $x = x_0 + v_0t + \\frac12at^2$?',
              answerOutline: 'Whenever the acceleration varies with time; then you must integrate $a(t)$ directly.',
            },
            {
              question: 'What is the acceleration of a ball at the very top of its flight?',
              answerOutline: '$g$ downward. The velocity is zero there, but it is still changing.',
            },
            {
              question: 'How do you get the total distance from $x(t)$?',
              answerOutline:
                'Find where $v = 0$, split the time interval there, and add the absolute values of the displacements. Equivalently, integrate $|v|$.',
            },
          ],
        },
        {
          slug: 'motion-in-two-dimensions',
          title: 'Motion in two dimensions and projectiles',
          summary:
            'Why horizontal and vertical motion can be treated separately, and how to solve any projectile problem.',
          estimatedMinutes: 180,
          objectives: [
            'Write position, velocity and acceleration as vectors with independent components',
            'Solve a projectile problem by treating x and y separately, linked by time',
            'Derive the range formula and state when it applies',
            'Interpret the velocity vector at any point on the path',
          ],
          concepts: [
            'Position vector as a function of time',
            'Independence of perpendicular motions',
            'Projectile motion',
            'Time of flight',
            'Range on level ground',
            'Parabolic path',
          ],
          explanation: `In two dimensions the rule is simple: the vector equations $\\vec v = d\\vec r/dt$ and $\\vec a = d\\vec v/dt$ are just two copies of the one-dimensional equations, one for each component. Perpendicular motions do not interfere with each other. A ball dropped and a ball thrown sideways from the same height hit level ground together, because gravity acts only on the vertical motion.

For a **projectile** with no air resistance, take $x$ horizontal and $y$ up. Then $a_x = 0$ and $a_y = -g$, so

$$x = x_0 + (v_0\\cos\\theta)\\,t, \\qquad y = y_0 + (v_0\\sin\\theta)\\,t - \\tfrac12 gt^2.$$

Time is the one thing the two motions share. The standard plan is to use one equation to find $t$, then put it into the other. On level ground, setting $y = 0$ gives flight time $2v_0\\sin\\theta/g$, and the range is

$$R = \\frac{v_0^2\\sin 2\\theta}{g}.$$

This is greatest at $45^\\circ$ and is the same for complementary angles. It applies only when the launch and landing heights are equal.

**Worked example.** A ball is kicked from the ground at $20\\ \\mathrm{m/s}$, $35^\\circ$ above the horizontal, towards a wall $25\\ \\mathrm{m}$ away. How high does it hit, and is it rising or falling?

Sketch the path and list components: $v_x = 20\\cos 35^\\circ = 16.4\\ \\mathrm{m/s}$ and $v_{0y} = 20\\sin 35^\\circ = 11.5\\ \\mathrm{m/s}$.

Horizontal motion gives the time: $t = 25/16.4 = 1.53\\ \\mathrm{s}$.

Vertical motion gives the height:

$$y = (11.5)(1.53) - \\tfrac12(9.80)(1.53)^2 = 6.1\\ \\mathrm{m}.$$

The vertical velocity there is $v_y = 11.5 - (9.80)(1.53) = -3.5\\ \\mathrm{m/s}$. It is negative, so the ball is on its way down. Check: the level-ground range is $R = 38\\ \\mathrm{m}$, so the peak is near $19\\ \\mathrm{m}$. The wall is past the peak, which agrees with the sign of $v_y$.

**Pitfalls.** The horizontal velocity does not change, so never apply $g$ to it. At the top of the path, $v_y = 0$ but $v_x$ is not zero. And in real air, especially for light fast objects, these formulas overestimate the range; you will model that in the next module.`,
          resources: [
            openstax('Read the chapter on motion in two and three dimensions, up to and including projectile motion.'),
            phet('Projectile Motion', 'projectile-motion', 'Reproduce the worked example, then turn air resistance on and compare.'),
            mit801('Work the two-dimensional kinematics unit.'),
          ],
          exercises: [
            {
              slug: 'off-a-cliff',
              title: 'Thrown from a cliff',
              prompt:
                'A stone is thrown horizontally at $12\\ \\mathrm{m/s}$ from a $45\\ \\mathrm{m}$ cliff. Find the flight time, the horizontal distance, and the speed and angle below the horizontal at impact.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $3.03\\ \\mathrm{s}$, $36\\ \\mathrm{m}$, $32\\ \\mathrm{m/s}$, $68^\\circ$ below the horizontal.',
            },
            {
              slug: 'complementary-angles',
              title: 'Prove the complementary-angle rule',
              prompt:
                'Show from the range formula that launches at $\\theta$ and $90^\\circ - \\theta$ have the same range on level ground. Then derive the equation of the path, $y(x)$, by eliminating $t$, and show that it is a parabola. Finally, find the launch speed for a $45^\\circ$ throw with a range of $60\\ \\mathrm{m}$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Use $\\sin(180^\\circ - 2\\theta) = \\sin 2\\theta$. The speed is about $24\\ \\mathrm{m/s}$.',
            },
            {
              slug: 'compare-with-simulation',
              title: 'Check a formula against a simulation',
              prompt:
                'In the PhET Projectile Motion simulation, with no air resistance, launch at any speed and angle of your choice from ground level. Record the range and peak height shown, and compare them with the formulas. Then turn on air resistance and record how much the range falls at three different speeds. Write two sentences on why the loss grows with speed.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What links the horizontal and vertical parts of a projectile problem?',
              answerOutline: 'The time. The two motions are independent, but both last the same time.',
            },
            {
              question: 'When does $R = v_0^2\\sin 2\\theta/g$ fail?',
              answerOutline:
                'When launch and landing heights differ, or when air resistance matters, or when $g$ varies over the path.',
            },
            {
              question: 'Describe the acceleration vector at three points on a path: rising, at the top, falling.',
              answerOutline: 'It is the same at all three: size $g$, straight down.',
            },
          ],
        },
        {
          slug: 'relative-motion',
          title: 'Relative motion',
          summary:
            'How velocities change between moving frames, with boats, planes and rain as examples.',
          estimatedMinutes: 120,
          objectives: [
            'Write the velocity-addition rule with clear subscripts',
            'Solve river-crossing and crosswind problems with a vector triangle',
            'Explain why acceleration is the same in frames moving at constant velocity',
          ],
          concepts: [
            'Reference frame',
            'Velocity addition',
            'Subscript bookkeeping',
            'Heading versus track',
            'Inertial frames',
          ],
          explanation: `A velocity has no meaning until you say relative to what. You walk at $1\\ \\mathrm{m/s}$ relative to a train, which moves at $30\\ \\mathrm{m/s}$ relative to the ground. The rule for frames in steady relative motion is vector addition, and subscripts keep it straight:

$$\\vec v_{A/C} = \\vec v_{A/B} + \\vec v_{B/C}.$$

Read it as "A relative to C equals A relative to B plus B relative to C". The inner subscripts match and cancel, like a chain. Also, $\\vec v_{B/A} = -\\vec v_{A/B}$.

Differentiate this rule. If frame $B$ moves at constant velocity relative to $C$, then $\\vec v_{B/C}$ has zero derivative, so $\\vec a_{A/C} = \\vec a_{A/B}$. All frames in steady relative motion agree on acceleration. That is why Newton's laws, which are about acceleration, look the same in each of them. These are **inertial frames**.

**Worked example.** A boat moves at $4.0\\ \\mathrm{m/s}$ relative to the water. A river $200\\ \\mathrm{m}$ wide flows east at $3.0\\ \\mathrm{m/s}$, and the boat starts on the south bank.

*(a) Aim straight across.* Here $\\vec v_{\\text{boat/ground}} = \\vec v_{\\text{boat/water}} + \\vec v_{\\text{water/ground}}$ gives $(3.0,\\ 4.0)\\ \\mathrm{m/s}$. Only the northward part crosses the river, so $t = 200/4.0 = 50\\ \\mathrm{s}$. In that time the current carries the boat $3.0 \\times 50 = 150\\ \\mathrm{m}$ downstream. Its ground speed is $5.0\\ \\mathrm{m/s}$.

*(b) Land directly opposite.* Now the eastward components must cancel, so the boat must point upstream at an angle $\\phi$ from north with $4.0\\sin\\phi = 3.0$, giving $\\phi = 49^\\circ$ west of north. The ground speed is what is left: $\\sqrt{4.0^2 - 3.0^2} = 2.6\\ \\mathrm{m/s}$. The crossing takes $200/2.65 = 76\\ \\mathrm{s}$.

Check: (b) must be slower than (a), since part of the boat's velocity is spent fighting the current. It is. And if the river ran faster than $4.0\\ \\mathrm{m/s}$, then $\\sin\\phi > 1$ and no such heading would exist, which matches intuition: the boat could not hold its position against the current.

**Pitfalls.** Say which velocity is which before adding. The direction a boat or plane points (its *heading*) is not the direction it actually travels (its *track*). This rule is only for speeds far below that of light; the relativity course treats the correction.`,
          resources: [
            openstax('Read the section on relative motion in two and three dimensions.'),
            mit801('Use the material on reference frames and relative velocity for a second explanation.'),
            hyperphysics('Look up relative velocity for short worked cases.'),
          ],
          exercises: [
            {
              slug: 'crosswind',
              title: 'A crosswind',
              prompt:
                'A plane flies at $250\\ \\mathrm{km/h}$ relative to the air. A wind blows due east at $50\\ \\mathrm{km/h}$. The pilot wants to travel due north. Find the heading and the ground speed.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $11.5^\\circ$ west of north, $245\\ \\mathrm{km/h}$.',
            },
            {
              slug: 'rain-on-a-window',
              title: 'Rain on a side window',
              prompt:
                'Rain falls straight down at $8.0\\ \\mathrm{m/s}$. You drive at $20\\ \\mathrm{m/s}$. Find the angle from the vertical of the streaks on the side window. Which way do they slant, and what does this say about the apparent direction of the rain?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The rain relative to the car is $\\vec v_{r/g} - \\vec v_{c/g}$. The angle is about $68^\\circ$ from the vertical.',
            },
            {
              slug: 'passing-trains',
              title: 'Two trains',
              prompt:
                'A $150\\ \\mathrm{m}$ train at $30\\ \\mathrm{m/s}$ and a $200\\ \\mathrm{m}$ train at $20\\ \\mathrm{m/s}$ pass on parallel tracks. How long does the passing take if they move in opposite directions? In the same direction? Solve it in the frame of one train.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The relative speeds are 50 and 10 m/s, and the distance is the sum of the lengths. Answers: $7.0\\ \\mathrm{s}$ and $35\\ \\mathrm{s}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write the velocity-addition rule with subscripts and say what the matching inner subscripts mean.',
              answerOutline:
                '$\\vec v_{A/C} = \\vec v_{A/B} + \\vec v_{B/C}$. The shared frame $B$ links the two velocities.',
            },
            {
              question: 'Why do two observers in steady relative motion measure the same acceleration?',
              answerOutline: 'Differentiating the addition rule removes the constant relative velocity.',
            },
            {
              question: 'What is the difference between heading and track?',
              answerOutline: 'Heading is where the craft points. Track is where it goes relative to the ground.',
            },
          ],
        },
      ],
    },
    {
      slug: 'newtons-laws',
      title: "Newton's Laws",
      description:
        'What makes motion change: forces, free-body diagrams, friction, drag and the forces needed for circular motion.',
      lessons: [
        {
          slug: 'forces-and-newtons-laws',
          title: "Forces and Newton's three laws",
          summary:
            'Force as the cause of acceleration, weight versus mass, normal forces, and how to read the third law correctly.',
          estimatedMinutes: 150,
          objectives: [
            "State Newton's three laws and say what each adds",
            'Distinguish mass from weight',
            'Apply the second law as a vector equation, component by component',
            'Identify third-law pairs correctly',
          ],
          concepts: [
            'Force and net force',
            'Inertia and inertial frames',
            'Second law as F = ma',
            'Mass versus weight',
            'Normal force and apparent weight',
            'Third-law pairs',
          ],
          explanation: `Kinematics describes motion. Dynamics explains it. Newton's three laws are the whole foundation.

**First law.** An object with zero net force keeps a constant velocity. Moving things do not need a push; they need a push only to fight friction. This law also defines what we mean by an *inertial frame*: one in which it holds.

**Second law.** The net force on an object equals its mass times its acceleration:

$$\\sum \\vec F = m\\vec a.$$

This is a vector equation, so it stands for one equation per axis. Only forces *on* the object count. The force unit is the newton: $1\\ \\mathrm{N} = 1\\ \\mathrm{kg\\,m/s^2}$. Note that "$m\\vec a$" is not a force and never goes on a diagram; it is what the forces produce.

**Third law.** If A pushes on B, then B pushes on A equally hard in the opposite direction. These two forces act on *different* objects, so they can never cancel each other. Your weight and the floor's upward push on you are not a third-law pair: both act on you. The pair of your weight is your pull on Earth.

**Weight and normal force.** Mass is how much an object resists acceleration, in kilograms, and it is the same anywhere. Weight is the gravitational force, $W = mg$, in newtons. A surface pushes back with a **normal force** $N$, perpendicular to the surface, as large as needed. It is not always equal to $mg$.

**Worked example.** A $60\\ \\mathrm{kg}$ person stands on a scale in a lift that accelerates upward at $2.0\\ \\mathrm{m/s^2}$. What does the scale read?

Sketch the person alone. Two forces act: $W = mg = 588\\ \\mathrm{N}$ down and $N$ up. The scale reads $N$, by the third law. Take up as positive and apply the second law:

$$N - mg = ma \\quad\\Rightarrow\\quad N = m(g + a) = (60)(9.80 + 2.0) = 708\\ \\mathrm{N}.$$

Check: the formula gives $mg$ when $a = 0$, as it must, and if the lift accelerated downward at $2.0\\ \\mathrm{m/s^2}$ then $N = 468\\ \\mathrm{N}$, so you would feel lighter. If the cable broke, $a = -g$ and $N = 0$. What you feel as your weight is really the normal force.

The direction of the velocity did not matter. A lift moving *down* and slowing has an *upward* acceleration, so it reads the same $708\\ \\mathrm{N}$.`,
          resources: [
            openstax("Read the chapter on Newton's laws of motion, especially the section on the third law."),
            phet('Forces and Motion: Basics', 'forces-and-motion-basics', 'Use the Motion and Friction screens to test the first and second laws.'),
            mit801("Work the unit on Newton's laws."),
          ],
          exercises: [
            {
              slug: 'two-forces',
              title: 'Two forces on a crate',
              prompt:
                'Forces $\\vec F_1 = (12,\\ 5)\\ \\mathrm{N}$ and $\\vec F_2 = (-4,\\ 9)\\ \\mathrm{N}$ act on a $5.0\\ \\mathrm{kg}$ crate on a frictionless table seen from above. Find the components and the size of the acceleration.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $(1.6,\\ 2.8)\\ \\mathrm{m/s^2}$, size $3.2\\ \\mathrm{m/s^2}$.',
            },
            {
              slug: 'growing-force',
              title: 'A force that grows with time',
              prompt:
                'A force $F(t) = (6.0\\ \\mathrm{N/s})\\,t$ acts on a $2.0\\ \\mathrm{kg}$ cart starting from rest on a level track with no friction. Integrate to find its speed and distance travelled at $t = 4.0\\ \\mathrm{s}$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$a = 3.0t$, $v = 1.5t^2$, $x = 0.50t^3$. Answers: $24\\ \\mathrm{m/s}$ and $32\\ \\mathrm{m}$.',
            },
            {
              slug: 'third-law-pairs',
              title: 'Sort the third-law pairs',
              prompt:
                'A horse pulls a cart forward along a road and both accelerate. List every horizontal force on the horse, on the cart and on the road. Identify the third-law pairs. Then answer the classic objection: "The cart pulls back as hard as the horse pulls forward, so nothing can move." Your answer must say which forces act on which object.',
              kind: 'writing',
              difficulty: 2,
              hint: 'Motion of the horse depends only on forces on the horse: the ground pushing forward and the cart pulling back.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do the two forces of a third-law pair never cancel?',
              answerOutline: 'They act on different objects, and cancellation needs forces on the same object.',
            },
            {
              question: 'When does the normal force on a person not equal $mg$?',
              answerOutline:
                'Whenever there is vertical acceleration, on a slope, or when another force has a vertical component.',
            },
            {
              question: 'A lift moves upward while slowing down. Is the scale reading above or below your weight?',
              answerOutline: 'Below. The acceleration is downward, so $N = m(g - |a|)$.',
            },
          ],
          relatedLessons: ['classical-mechanics/kinematics-and-newtons-laws/newtons-laws-and-free-body-diagrams'],
        },
        {
          slug: 'free-body-diagrams-and-connected-objects',
          title: 'Free-body diagrams and connected objects',
          summary:
            'The central skill of the course: one diagram per object, one equation per axis, and a shared acceleration for things tied together.',
          estimatedMinutes: 210,
          objectives: [
            'Draw a correct free-body diagram for each object in a system',
            'Choose axes that make the equations simple',
            'Solve for tension and acceleration in connected systems',
            'Check a result by limiting cases',
          ],
          concepts: [
            'Free-body diagram',
            'Contact forces and long-range forces',
            'Tension in an ideal string',
            'Constraint: shared acceleration',
            'Axes along the acceleration',
            'Limiting-case checks',
          ],
          explanation: `A **free-body diagram** (FBD) shows one object, cut off from everything else, with every force acting on it drawn as an arrow. Almost all mistakes in mechanics are FBD mistakes, so follow this recipe every time.

1. Pick one object and draw it alone.
2. Gravity acts on it. Then go round its boundary: every contact (a rope, a surface, a hand) may exert a force. Nothing else can touch it, so nothing else goes on the diagram.
3. Choose axes, with one along the acceleration if you know its direction. On a ramp, tilt the axes.
4. Write $\\sum F_x = ma_x$ and $\\sum F_y = ma_y$ from the diagram.
5. Add a *constraint*. A taut string of fixed length forces two objects to share one size of acceleration. An ideal string (massless, over a frictionless pulley) has the same tension all along.

**Worked example.** A $4.0\\ \\mathrm{kg}$ block sits on a frictionless $30^\\circ$ ramp. A string runs up the ramp, over a pulley at the top, and down to a hanging $3.0\\ \\mathrm{kg}$ block. Find the acceleration and the tension.

Each block gets its own diagram. Block 1 has its weight, the normal force, and the tension $T$ up the ramp. Block 2 has its weight and $T$ upward. Guess that block 2 falls, and define positive for each block to match that motion: up the ramp for block 1, down for block 2. Both then share one $a$.

$$T - m_1g\\sin 30^\\circ = m_1a, \\qquad m_2g - T = m_2a.$$

Add the two equations and $T$ vanishes:

$$a = \\frac{m_2g - m_1g\\sin 30^\\circ}{m_1 + m_2} = \\frac{29.4 - 19.6}{7.0} = 1.4\\ \\mathrm{m/s^2}.$$

Then $T = m_2(g - a) = 3.0(9.80 - 1.4) = 25\\ \\mathrm{N}$.

**Check.** The sign of $a$ is positive, so the guess was right; a negative result would simply mean the blocks move the other way. Limits: if $m_1 = 0$, then $a = g$, which is free fall. If $m_2 = 0$, then $a = -g\\sin 30^\\circ$, a block sliding down a ramp. The tension is less than block 2's weight of $29.4\\ \\mathrm{N}$, as it must be for block 2 to accelerate downward.

**Pitfalls.** Do not include forces the object exerts on others. Do not add "$ma$" as an arrow. And do not assume the tension equals the hanging weight: it does so only if nothing accelerates.`,
          resources: [
            openstax("Read the chapter on applications of Newton's laws, including its problem-solving strategy."),
            phet('The Ramp', 'the-ramp', 'Draw the free-body diagram first, then compare it with the arrows shown.'),
            mit801('Use the problem-solving videos on pulleys and connected masses.'),
          ],
          exercises: [
            {
              slug: 'atwood',
              title: 'Two masses over a pulley',
              prompt:
                'Blocks of $5.0\\ \\mathrm{kg}$ and $3.0\\ \\mathrm{kg}$ hang from a string over a light frictionless pulley. Draw both diagrams, then find the acceleration and tension. Check your formula when the masses are equal and when one mass is zero.',
              kind: 'problem',
              difficulty: 1,
              hint: '$a = (m_1 - m_2)g/(m_1 + m_2)$. Answers: $2.45\\ \\mathrm{m/s^2}$ and $37\\ \\mathrm{N}$.',
            },
            {
              slug: 'traffic-light',
              title: 'A hanging sign',
              prompt:
                'A $200\\ \\mathrm{N}$ sign hangs from two cables. One makes $30^\\circ$ with the horizontal on the left, and the other $45^\\circ$ on the right. Write the two equilibrium equations and find both tensions.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: $146\\ \\mathrm{N}$ for the $30^\\circ$ cable and $179\\ \\mathrm{N}$ for the $45^\\circ$ cable.',
            },
            {
              slug: 'pushed-blocks',
              title: 'Three blocks in a row',
              prompt:
                'Blocks of $1.0$, $2.0$ and $3.0\\ \\mathrm{kg}$ touch in a line on a frictionless floor. You push the $1.0\\ \\mathrm{kg}$ block with $12\\ \\mathrm{N}$ towards the others. Find the acceleration and the contact force between each pair. Use a separate diagram for each block, and confirm that a diagram of the two rear blocks together gives the same result.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Acceleration: $2.0\\ \\mathrm{m/s^2}$. The contact forces are $10\\ \\mathrm{N}$ and $6.0\\ \\mathrm{N}$.',
            },
            {
              slug: 'pulley-with-simulation',
              title: 'Solve a system by computer',
              prompt:
                'Write the worked example\'s two equations as a $2\\times 2$ linear system in $a$ and $T$ and solve it with `numpy.linalg.solve`. Sweep the ramp angle from $0^\\circ$ to $90^\\circ$ and plot $a$. Find the angle at which $a = 0$ for these masses, and explain the result with a force balance.',
              kind: 'coding',
              difficulty: 2,
              hint: 'At $a = 0$, $\\sin\\theta = m_2/m_1 = 0.75$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What may appear on a free-body diagram, and what may not?',
              answerOutline:
                'Only forces acting on that one object. Not forces it exerts on others, and not $ma$.',
            },
            {
              question: 'Does a hanging block always pull a string with a force equal to its weight?',
              answerOutline: 'No. Only with zero acceleration. If it accelerates down, the tension is less than its weight.',
            },
            {
              question: 'What does a negative value of $a$ mean after you guessed a direction?',
              answerOutline: 'The system moves the opposite way. The size is still right when the forces do not depend on direction.',
            },
          ],
        },
        {
          slug: 'friction-and-drag',
          title: 'Friction and drag',
          summary:
            'Static and kinetic friction, what the friction laws do and do not say, and how drag sets a terminal speed.',
          estimatedMinutes: 180,
          objectives: [
            'Apply the static and kinetic friction models and say when each is valid',
            'Solve problems where friction depends on a normal force changed by other forces',
            'Find terminal speed from a force balance',
            'Describe the difference between linear and quadratic drag',
          ],
          concepts: [
            'Static friction as an inequality',
            'Kinetic friction',
            'Coefficient of friction',
            'Drag force',
            'Terminal speed',
            'Characteristic time',
          ],
          explanation: `Friction opposes sliding between surfaces. It comes in two forms with different rules.

**Kinetic friction**, when surfaces slide, has size $f_k = \\mu_k N$, opposing the sliding. **Static friction**, when they do not slide, is an *inequality*:

$$f_s \\le \\mu_s N.$$

Static friction is only as large as it needs to be, up to that limit. If you push a heavy box gently, static friction exactly matches your push. So never write $f_s = \\mu_s N$ unless the object is on the verge of slipping. These are useful empirical rules, not fundamental laws, and $\\mu$ depends on the surfaces.

Friction depends on $N$, not on the weight. If you change $N$, you change the friction.

**Worked example.** You drag a $40\\ \\mathrm{kg}$ crate across a floor at constant speed with a rope at $30^\\circ$ above the horizontal, with $\\mu_k = 0.30$. What tension do you need?

The diagram shows weight $mg$, normal $N$, friction $f$ backward, and tension $T$ at $30^\\circ$. Constant velocity means zero acceleration:

$$x:\\ T\\cos 30^\\circ - \\mu_kN = 0, \\qquad y:\\ N + T\\sin 30^\\circ - mg = 0.$$

The rope lifts a little, so $N = mg - T\\sin 30^\\circ$. Substitute it and solve:

$$T = \\frac{\\mu_kmg}{\\cos 30^\\circ + \\mu_k\\sin 30^\\circ} = \\frac{(0.30)(392)}{0.866 + 0.150} = 116\\ \\mathrm{N}.$$

Then $N = 392 - 58 = 334\\ \\mathrm{N}$, less than the weight, and $f = 0.30 \\times 334 = 100\\ \\mathrm{N}$. Check: $T\\cos 30^\\circ = 100\\ \\mathrm{N}$, so the horizontal forces balance. A horizontal rope would need $118\\ \\mathrm{N}$, so the angle helps slightly.

**Drag.** An object moving through a fluid feels a force opposing its motion that grows with speed. For a small slow object, drag is about $bv$. For most everyday objects in air it is closer to

$$F_D = \\tfrac12 C\\rho Av^2,$$

where $\\rho$ is the air density, $A$ the frontal area and $C$ a drag coefficient near 1. As a falling object speeds up, drag grows until it balances the weight. The acceleration is then zero, at the **terminal speed**

$$v_t = \\sqrt{\\frac{2mg}{C\\rho A}}.$$

For a skydiver with $m = 80\\ \\mathrm{kg}$, $A = 0.70\\ \\mathrm{m^2}$, $C = 1.0$ and $\\rho = 1.2\\ \\mathrm{kg/m^3}$, this gives $v_t = 43\\ \\mathrm{m/s}$, close to the real figure of around $50\\ \\mathrm{m/s}$.

For linear drag, separating variables in $m\\,dv/dt = mg - bv$ gives $v = v_t(1 - e^{-t/\\tau})$ with $v_t = mg/b$ and $\\tau = m/b = v_t/g$. After one $\\tau$ the object has reached a fraction $1 - e^{-1} = 0.63$ of its terminal speed.`,
          resources: [
            openstax('Read the sections on friction and on drag force and terminal speed.'),
            phet('Forces and Motion: Basics', 'forces-and-motion-basics', 'On the Friction screen, push until the crate breaks free and watch friction change.'),
            hyperphysics('Look up friction for typical coefficients and their limits.'),
          ],
          exercises: [
            {
              slug: 'when-does-it-slip',
              title: 'When does it slip?',
              prompt:
                'A block rests on a board. You slowly raise one end. Show that it starts to slide when $\\tan\\theta = \\mu_s$, whatever the mass, and evaluate the angle for $\\mu_s = 0.50$. Next, a block slides down a $30^\\circ$ ramp with $\\mu_k = 0.20$. Find its acceleration.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $27^\\circ$ and $g(\\sin\\theta - \\mu_k\\cos\\theta) = 3.2\\ \\mathrm{m/s^2}$.',
            },
            {
              slug: 'stopping-distance',
              title: 'Stopping on a dry road',
              prompt:
                'A car at $25\\ \\mathrm{m/s}$ brakes without skidding on a road with $\\mu_s = 0.70$. Find the shortest stopping distance, and show that the mass cancels. How does the distance change if the speed doubles? Why does this matter for speed limits?',
              kind: 'problem',
              difficulty: 2,
              hint: '$d = v^2/(2\\mu g) = 46\\ \\mathrm{m}$. Doubling the speed multiplies the distance by four.',
            },
            {
              slug: 'linear-drag',
              title: 'Solve linear drag',
              prompt:
                'A small sphere falls from rest with drag $bv$. Separate variables in $m\\,dv/dt = mg - bv$ and derive $v(t) = v_t(1 - e^{-t/\\tau})$. For $v_t = 2.0\\ \\mathrm{m/s}$, find $\\tau$. Then integrate $v$ to get the distance fallen, and show that it approaches $v_t(t - \\tau)$ for large $t$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Calculus II technique: $\\int dv/(v_t - v) = -\\ln(v_t - v)$. Here $\\tau = v_t/g = 0.20\\ \\mathrm{s}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is static friction written as an inequality?',
              answerOutline: 'It adjusts to whatever value keeps the surfaces from sliding, up to the maximum $\\mu_sN$.',
            },
            {
              question: 'Why does pulling a crate slightly upward reduce the friction?',
              answerOutline: 'The upward component reduces the normal force, and friction is proportional to $N$.',
            },
            {
              question: 'If a skydiver spreads out and doubles the frontal area, what happens to the terminal speed?',
              answerOutline: 'It falls by a factor of $\\sqrt 2$, since $v_t \\propto A^{-1/2}$.',
            },
          ],
          relatedLessons: ['classical-mechanics/kinematics-and-newtons-laws/friction-drag-and-numerical-integration'],
        },
        {
          slug: 'circular-motion-dynamics',
          title: 'Circular motion',
          summary:
            'Why motion in a circle needs an inward force, and how to find what provides it.',
          estimatedMinutes: 180,
          objectives: [
            'Derive the centripetal acceleration v squared over r',
            'Identify which real forces supply the net inward force',
            'Solve flat-curve, banked-curve and vertical-circle problems',
            'Explain why there is no outward force in an inertial frame',
          ],
          concepts: [
            'Period and speed',
            'Centripetal acceleration',
            'Net inward force',
            'Banked curves',
            'Vertical circles',
            'The centrifugal illusion',
          ],
          explanation: `An object moving in a circle at constant speed is accelerating, because its velocity keeps changing direction. To see how much, write the position as $\\vec r = r(\\cos\\omega t,\\ \\sin\\omega t)$, with $\\omega = v/r$. Differentiating twice gives

$$\\vec a = -\\omega^2\\vec r, \\qquad a = \\omega^2r = \\frac{v^2}{r}.$$

The minus sign says the acceleration points toward the centre. It is called **centripetal**, meaning centre-seeking. The speed and period are related by $v = 2\\pi r/T$.

Now apply the second law along the inward direction:

$$\\sum F_{\\text{inward}} = \\frac{mv^2}{r}.$$

The left side is a sum of real forces: tension, friction, gravity, a normal force. There is no separate "centripetal force" to add to the diagram. It is a job that the real forces do. Likewise, the outward push you seem to feel in a turning car is not a force on you. Your body is trying to go straight, and the car door is pushing you inward.

**Worked example.** What is the fastest a car can round a flat curve of radius $50\\ \\mathrm{m}$ if $\\mu_s = 0.80$? The diagram shows weight, normal force and friction pointing to the centre of the curve. It is static friction, because the tyres are not skidding sideways.

Vertically, $N = mg$. Inward, $f_s = mv^2/r$. The limit is $f_s = \\mu_sN$, so

$$v_{\\max} = \\sqrt{\\mu_sgr} = \\sqrt{(0.80)(9.80)(50)} = 20\\ \\mathrm{m/s},$$

about $71\\ \\mathrm{km/h}$. Check: mass cancels, so a truck and a car have the same limit, and a wet road with a smaller $\\mu_s$ lowers it, as you would expect.

**Banked curves.** Tilt the road by $\\theta$ and the normal force itself has an inward part. With no friction, the vertical balance $N\\cos\\theta = mg$ and the inward equation $N\\sin\\theta = mv^2/r$ give

$$\\tan\\theta = \\frac{v^2}{gr}.$$

So a curve of radius $200\\ \\mathrm{m}$ designed for $30\\ \\mathrm{m/s}$ needs a bank of $25^\\circ$. Note the difference from a ramp: here the acceleration is horizontal, so use horizontal and vertical axes.

**Vertical circles.** On a loop the speed changes, but the inward equation still holds at each point. At the top of a loop of radius $r$, both gravity and the track push inward: $N + mg = mv^2/r$. The car just keeps contact when $N = 0$, so $v_{\\min} = \\sqrt{gr}$, which is $9.9\\ \\mathrm{m/s}$ for $r = 10\\ \\mathrm{m}$.`,
          resources: [
            openstax('Read the sections on uniform circular motion and on banked curves.'),
            mit801('Work the units on circular motion, using the problem-solving videos.'),
            hyperphysics('Look up centripetal force and banked curves.'),
          ],
          exercises: [
            {
              slug: 'conical-pendulum',
              title: 'A conical pendulum',
              prompt:
                'A ball on a $1.2\\ \\mathrm{m}$ string swings in a horizontal circle with the string at $25^\\circ$ to the vertical. Draw the diagram, explaining why the acceleration is horizontal. Show that the period is $T = 2\\pi\\sqrt{L\\cos\\theta/g}$ and evaluate it.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The circle has radius $L\\sin\\theta$. The period is about $2.1\\ \\mathrm{s}$.',
            },
            {
              slug: 'ferris-wheel',
              title: 'A big wheel',
              prompt:
                'A $70\\ \\mathrm{kg}$ rider is on a wheel of radius $15\\ \\mathrm{m}$ that turns once every $30\\ \\mathrm{s}$. Find the speed and centripetal acceleration, and the normal force from the seat at the top and at the bottom.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $3.1\\ \\mathrm{m/s}$, $0.66\\ \\mathrm{m/s^2}$, $640\\ \\mathrm{N}$ at the top, $732\\ \\mathrm{N}$ at the bottom.',
            },
            {
              slug: 'banked-friction',
              title: 'Banked curve with friction',
              prompt:
                'For a curve of radius $r$ banked at $\\theta$ with static friction coefficient $\\mu$, write the two force equations for a car at its top speed, with friction pointing down the slope. Show that $v_{\\max}^2 = gr(\\sin\\theta + \\mu\\cos\\theta)/(\\cos\\theta - \\mu\\sin\\theta)$. Show that it reduces to the flat result when $\\theta = 0$ and the frictionless result when $\\mu = 0$. What happens when $\\tan\\theta = 1/\\mu$?',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Use horizontal and vertical axes. When $\\tan\\theta = 1/\\mu$ the denominator is zero: no speed is too fast, within this model.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why should you not draw a centripetal force on a free-body diagram?',
              answerOutline: 'It is not a separate force. It is the net inward part of the real forces.',
            },
            {
              question: 'In which direction does friction act on a car rounding a flat curve at constant speed?',
              answerOutline: 'Toward the centre of the curve, perpendicular to the motion.',
            },
            {
              question: 'Why do you use tilted axes on a ramp but level axes on a banked curve?',
              answerOutline:
                'Choose an axis along the acceleration. On a ramp it is along the slope; on a banked curve it is horizontal.',
            },
          ],
          relatedLessons: ['classical-mechanics/kinematics-and-newtons-laws/circular-motion-and-non-inertial-frames'],
        },
      ],
      project: {
        slug: 'projectile-with-air-resistance',
        title: 'A projectile model with air resistance',
        description: `Write a short Python model of a baseball-like object in air and use it to test what the no-drag formulas get wrong. The force is gravity plus quadratic drag, $\\vec F_D = -\\tfrac12 C\\rho A\\,|\\vec v|\\,\\vec v$, so the $x$ and $y$ motions are no longer independent, and no simple formula exists. Step forward in time with small steps, either with your own loop or with \`scipy.integrate.solve_ivp\`.

Use a $0.145\\ \\mathrm{kg}$ ball of radius $3.7\\ \\mathrm{cm}$, $C = 0.35$ and $\\rho = 1.2\\ \\mathrm{kg/m^3}$. First confirm that with drag switched off your code reproduces the range formula to within $0.5\\%$. Then find out how far short of the ideal range a $40\\ \\mathrm{m/s}$ throw falls, and what launch angle now gives the longest range.`,
        deliverables: [
          'A Python script or notebook that models flight with and without drag',
          'A test showing the no-drag case matches the range formula to within 0.5 percent',
          'A plot of paths with and without drag at the same launch speed and angle',
          'A plot of range against launch angle, showing that the best angle falls below 45 degrees',
          'A step-size test showing the answer stops changing as the step shrinks',
          'A short note on what the free-body diagram looks like on the way up and on the way down',
        ],
        estimatedHours: 6,
        stretchGoals: [
          'Find how the best launch angle depends on launch speed',
          'Compare your result with the air-resistance option of the PhET Projectile Motion simulation',
        ],
      },
    },
    {
      slug: 'work-and-energy',
      title: 'Work and Energy',
      description:
        'A second way to do mechanics: instead of following forces through time, keep accounts of energy between two moments.',
      lessons: [
        {
          slug: 'work-and-kinetic-energy',
          title: 'Work and kinetic energy',
          summary:
            'Work as an integral of force along a path, and the theorem that links net work to a change in speed.',
          estimatedMinutes: 180,
          objectives: [
            'Compute the work done by a constant force using the dot product',
            'Compute the work done by a varying force as an integral',
            'State and derive the work-energy theorem in one dimension',
            'Use the work-energy theorem to find a speed without finding the time',
          ],
          concepts: [
            'Work as a dot product',
            'Sign of work',
            'Work by a varying force',
            'Area under a force-position graph',
            'Kinetic energy',
            'Work-energy theorem',
          ],
          explanation: `Newton's second law connects force to acceleration at one instant. Often you do not care about the instant. You want the speed after some distance, and the force may change along the way. **Work** handles this.

A constant force $\\vec F$ acting through a displacement $\\vec d$ does work

$$W = \\vec F\\cdot\\vec d = Fd\\cos\\theta.$$

Only the part of the force along the motion counts. A force at right angles to the motion, such as the normal force on a level floor, does no work. Work can be negative: friction usually removes energy. The unit is the joule, $1\\ \\mathrm{J} = 1\\ \\mathrm{N\\,m}$.

If the force varies with position, chop the path into small pieces and add. In one dimension that is an integral, the area under the $F$ against $x$ graph:

$$W = \\int_{x_1}^{x_2} F(x)\\,dx.$$

For a spring obeying Hooke's law, the force from the spring is $F = -kx$. So stretching it from rest length to $x$ takes work $\\tfrac12 kx^2$ from you.

**The theorem.** Start with $F_{\\text{net}} = m\\,dv/dt$ and use the chain rule, $dv/dt = v\\,dv/dx$:

$$W_{\\text{net}} = \\int F_{\\text{net}}\\,dx = \\int mv\\,\\frac{dv}{dx}\\,dx = \\tfrac12 mv_2^2 - \\tfrac12 mv_1^2.$$

The quantity $K = \\tfrac12 mv^2$ is the **kinetic energy**, and the net work equals its change. Time has disappeared.

**Worked example.** A $2.0\\ \\mathrm{kg}$ cart starts from rest at $x = 0$ on a frictionless track. A force $F(x) = 6.0 - 2.0x$ (newtons, with $x$ in metres) acts along the track. Find the speed at $x = 3.0\\ \\mathrm{m}$.

The acceleration is not constant, so the kinematic equations do not apply, but work is easy:

$$W = \\int_0^{3.0}(6.0 - 2.0x)\\,dx = \\left[6.0x - x^2\\right]_0^{3.0} = 18 - 9.0 = 9.0\\ \\mathrm{J}.$$

The cart starts from rest, so $9.0 = \\tfrac12(2.0)v^2$, giving $v = 3.0\\ \\mathrm{m/s}$. Check: the units work out, and a sketch shows a triangle of base $3.0$ and height $6.0$, whose area is $9.0$.

**Pitfalls.** The theorem uses the *net* work, including every force. Work depends on the frame, because displacement does. And "work" here has nothing to do with effort: holding a heavy bag still does zero work on it, however tired your arm gets.`,
          resources: [
            openstax('Read the chapter on work and kinetic energy.'),
            mit801('Work the unit on kinetic energy and work.'),
            hyperphysics('Look up work and the work-energy principle.'),
          ],
          exercises: [
            {
              slug: 'angled-push',
              title: 'Work with an angle',
              prompt:
                'You push a mower with $50\\ \\mathrm{N}$ along the handle, which is $40^\\circ$ below the horizontal, for $3.0\\ \\mathrm{m}$. Find the work you do. What work do gravity and the normal force do? Separately, find the work to stretch a spring with $k = 200\\ \\mathrm{N/m}$ from rest length to $0.10\\ \\mathrm{m}$, and the extra work to go on from $0.10\\ \\mathrm{m}$ to $0.20\\ \\mathrm{m}$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $115\\ \\mathrm{J}$; zero for both; $1.0\\ \\mathrm{J}$ and then $3.0\\ \\mathrm{J}$. Doubling the stretch quadruples the total work.',
            },
            {
              slug: 'slide-down-a-ramp',
              title: 'Net work on a slide',
              prompt:
                'A $12\\ \\mathrm{kg}$ box slides $5.0\\ \\mathrm{m}$ from rest down a $25^\\circ$ ramp with $\\mu_k = 0.25$. Find the net work and the final speed. Then get the same speed using forces and constant acceleration, and compare the effort.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: $115\\ \\mathrm{J}$ and $4.4\\ \\mathrm{m/s}$.',
            },
            {
              slug: 'position-dependent-force',
              title: 'A force growing with distance',
              prompt:
                'A force $F(x) = 3x^2$ (in newtons, $x$ in metres) acts along the $x$ axis. Find the work from $x = 0$ to $x = 2.0\\ \\mathrm{m}$ by integration. Then estimate the same integral numerically in Python with the trapezoid rule and $n = 10$ and $n = 100$ strips. State how the error changes with $n$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The exact result is $8.0\\ \\mathrm{J}$. Ten times as many strips should give about a hundredth of the error.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the normal force do no work on a crate sliding along a level floor?',
              answerOutline: 'It is perpendicular to the displacement, so $\\cos\\theta = 0$.',
            },
            {
              question: 'What does the area under a force-position graph represent?',
              answerOutline: 'The work done by that force.',
            },
            {
              question: 'Why does the work-energy theorem let you avoid finding the time?',
              answerOutline: 'Integrating over position with the chain rule removes $t$ from the calculation.',
            },
          ],
          relatedLessons: ['classical-mechanics/energy-momentum-and-systems/work-energy-and-conservative-forces'],
        },
        {
          slug: 'potential-energy-and-conservation',
          title: 'Potential energy and conservation of energy',
          summary:
            'Conservative forces, potential energy functions, conservation of mechanical energy and energy diagrams.',
          estimatedMinutes: 210,
          objectives: [
            'Define a conservative force and give examples and non-examples',
            'Write potential energies for gravity near Earth and for a spring',
            'Solve problems by equating total mechanical energy at two points',
            'Read force and equilibrium points from a potential energy graph',
          ],
          concepts: [
            'Conservative force',
            'Potential energy',
            'Mechanical energy',
            'Force as minus the slope of U',
            'Stable and unstable equilibrium',
            'Turning points',
          ],
          explanation: `Some forces give back the work you do against them. Lift a book and gravity returns that work when the book falls. A force is **conservative** if the work it does between two points does not depend on the path. Gravity and ideal springs are conservative. Friction is not: a longer path means more loss.

For a conservative force you can define a **potential energy** $U$ with $\\Delta U = -W$. Near Earth, $U = mgy$. For a spring, $U = \\tfrac12 kx^2$. Only differences in $U$ matter, so you may choose the zero wherever it is convenient.

If only conservative forces do work, then the work-energy theorem becomes a conservation law:

$$K_1 + U_1 = K_2 + U_2.$$

You compare two moments, and everything between them is irrelevant. A roller coaster's speed depends only on its height, however the track twists.

**Worked example.** A spring with $k = 500\\ \\mathrm{N/m}$ is compressed $0.20\\ \\mathrm{m}$ and launches a $0.50\\ \\mathrm{kg}$ block up a smooth curved ramp. Find the greatest height and the speed at a height of $1.0\\ \\mathrm{m}$.

Choose $y = 0$ at the launch point. At first, all the energy is in the spring:

$$U_s = \\tfrac12(500)(0.20)^2 = 10\\ \\mathrm{J}.$$

At the top the block is at rest for an instant, so $mgh = 10\\ \\mathrm{J}$ and $h = 10/(0.50 \\times 9.80) = 2.0\\ \\mathrm{m}$.

At $y = 1.0\\ \\mathrm{m}$, the energy is shared: $10 = (0.50)(9.80)(1.0) + \\tfrac12(0.50)v^2$, which gives $v = 4.5\\ \\mathrm{m/s}$. Check: a mass of $0.50\\ \\mathrm{kg}$ gains $4.9\\ \\mathrm{J}$ per metre of height, and $2.0\\ \\mathrm{m}$ of height uses all $10\\ \\mathrm{J}$. The shape of the ramp did not enter, and with forces alone this would be very hard.

**Force from energy.** Since $dU = -F\\,dx$, the force is the negative slope:

$$F(x) = -\\frac{dU}{dx}.$$

So a graph of $U(x)$ shows everything about one-dimensional motion. Picture a ball rolling on that curve. Force pushes it downhill. Where the slope is zero, the force is zero: an **equilibrium**. A valley is stable, because a small nudge produces a force back. A hilltop is unstable. If the total energy is $E$, the object can only be where $U(x) \\le E$, since $K$ cannot be negative. The points where $U = E$ are **turning points**.`,
          resources: [
            openstax('Read the chapter on potential energy and conservation of energy, including potential energy diagrams.'),
            phet('Energy Skate Park', 'energy-skate-park', 'Build a track and watch the bar chart: friction off first, then on.'),
            mit801('Work the unit on potential energy and energy conservation.'),
          ],
          exercises: [
            {
              slug: 'pendulum-speed',
              title: 'Speed at the bottom of a swing',
              prompt:
                'A pendulum of length $2.0\\ \\mathrm{m}$ is released from rest at $40^\\circ$ from the vertical. Find the height drop and the speed at the lowest point. Explain why the tension does no work.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Drop: $L(1 - \\cos\\theta)$. The speed is $3.0\\ \\mathrm{m/s}$.',
            },
            {
              slug: 'loop-the-loop',
              title: 'Height needed for a loop',
              prompt:
                'A small cart rolls without friction from rest down a track and into a vertical loop of radius $R$. Combine energy conservation with the minimum-speed condition from the last module to prove that the start must be at least $h = 2.5R$ above the bottom. Evaluate this for $R = 12\\ \\mathrm{m}$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'At the top the height is $2R$ and $v^2 = gR$. For $R = 12\\ \\mathrm{m}$, $h = 30\\ \\mathrm{m}$.',
            },
            {
              slug: 'read-a-potential',
              title: 'Read a potential energy curve',
              prompt:
                'A particle moves in $U(x) = x^3 - 3x$, with $U$ in joules and $x$ in metres. Find the force $F(x)$ and the equilibrium points, and classify each using the sign of $U\'\'$. If the particle sits near $x = 1$ with total energy $E = 0$, between which points can it move? Plot $U$ with matplotlib and mark them.',
              kind: 'problem',
              difficulty: 2,
              hint: '$F = 3 - 3x^2$. Equilibria at $x = \\pm 1$, stable at $+1$. Turning points for $E = 0$ near $x = 1$ are $x = 0$ and $x = \\sqrt 3$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What makes a force conservative? Give one example and one counterexample.',
              answerOutline: 'Its work is independent of path, or zero round a closed loop. Gravity yes, friction no.',
            },
            {
              question: 'Why can you choose the zero of potential energy freely?',
              answerOutline: 'Only differences in $U$ appear in the physics.',
            },
            {
              question: 'At a local maximum of $U(x)$, what are the force and the type of equilibrium?',
              answerOutline: 'Zero force, unstable equilibrium: a small push leads to a force away from that point.',
            },
          ],
          relatedLessons: ['classical-mechanics/energy-momentum-and-systems/potential-energy-landscapes-and-stability'],
        },
        {
          slug: 'nonconservative-forces-and-power',
          title: 'Friction, energy accounts and power',
          summary:
            'How to include energy losses, and power as the rate of doing work.',
          estimatedMinutes: 150,
          objectives: [
            'Extend energy conservation to include work by non-conservative forces',
            'Say where the energy lost to friction goes',
            'Compute average and instantaneous power',
            'Estimate the power needed for everyday tasks',
          ],
          concepts: [
            'Non-conservative work',
            'Thermal energy',
            'Conservation of total energy',
            'Average power',
            'Instantaneous power as F dot v',
            'Watt and horsepower',
          ],
          explanation: `Friction does not destroy energy. It moves it into thermal energy in the surfaces. If non-conservative forces act, the accounts become

$$K_1 + U_1 + W_{nc} = K_2 + U_2.$$

For kinetic friction, $W_{nc} = -f_kd$ for a sliding distance $d$. Total energy, including thermal, is always conserved. Mechanical energy alone is not.

**Power** is how fast work is done:

$$P = \\frac{dW}{dt} = \\vec F\\cdot\\vec v.$$

The unit is the watt, $1\\ \\mathrm{W} = 1\\ \\mathrm{J/s}$, and one horsepower is $746\\ \\mathrm{W}$. A person can sustain roughly $100\\ \\mathrm{W}$. That number is good for sanity checks. A fit cyclist manages a few hundred watts, not a few thousand.

**Worked example.** A $1200\\ \\mathrm{kg}$ car climbs a $5.0^\\circ$ road at a steady $25\\ \\mathrm{m/s}$, against air and rolling resistance of $400\\ \\mathrm{N}$. What power must reach the wheels?

The speed is constant, so forces along the road balance. The drive force must equal the weight component down the slope plus the resistance:

$$F = mg\\sin 5.0^\\circ + 400 = 1025 + 400 = 1425\\ \\mathrm{N}.$$

Then

$$P = Fv = (1425\\ \\mathrm{N})(25\\ \\mathrm{m/s}) = 3.6\\times 10^{4}\\ \\mathrm{W} = 36\\ \\mathrm{kW},$$

or about $48$ horsepower. Check: that is a reasonable fraction of an ordinary car's engine power of about $100\\ \\mathrm{kW}$. Since $P = Fv$, cars need lower gears on hills: at fixed power, more force needs less speed.

**A second example of the accounts.** Suppose a sled starts from rest at the top of a $30^\\circ$ slope that is $3.0\\ \\mathrm{m}$ high, so $6.0\\ \\mathrm{m}$ long, with $\\mu_k = 0.30$. On the slope, $N = mg\\cos 30^\\circ$, and the mass will cancel:

$$mgh - \\mu_kmg\\cos 30^\\circ\\,d = \\tfrac12 mv^2 \\quad\\Rightarrow\\quad v = 5.3\\ \\mathrm{m/s}.$$

Compare this with $7.7\\ \\mathrm{m/s}$ without friction. Friction took about half of the energy.

**Pitfalls.** The friction force changes when the normal force changes, so work out $N$ on each section. And $P = Fv$ is an instantaneous statement: use the speed at that moment. For a car accelerating at constant power, the force falls as the speed rises.`,
          resources: [
            openstax('Read the sections on nonconservative forces, conservation of energy and power.'),
            phet('Energy Skate Park', 'energy-skate-park', 'Turn on friction and watch the thermal bar grow while the total stays fixed.'),
            hyperphysics('Look up power and energy for reference values.'),
          ],
          exercises: [
            {
              slug: 'sled-and-floor',
              title: 'The sled reaches the flat',
              prompt:
                'Continue the sled example. After the slope, the sled moves onto level snow with the same $\\mu_k = 0.30$. How far does it go before stopping? Then find the fraction of the original potential energy lost on the slope.',
              kind: 'problem',
              difficulty: 2,
              hint: 'It stops after about $4.8\\ \\mathrm{m}$. Note that $N$ is larger on the flat than on the slope.',
            },
            {
              slug: 'lift-and-stairs',
              title: 'Everyday power',
              prompt:
                '(a) A lift of total mass $800\\ \\mathrm{kg}$ rises $20\\ \\mathrm{m}$ in $40\\ \\mathrm{s}$ at constant speed. Find the power in kW. (b) A $70\\ \\mathrm{kg}$ person climbs $18\\ \\mathrm{m}$ of stairs in $30\\ \\mathrm{s}$. Find the average useful power in watts, and comment on it against the sustainable figure of $100\\ \\mathrm{W}$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) $3.9\\ \\mathrm{kW}$; (b) $412\\ \\mathrm{W}$, which you can keep up only briefly.',
            },
            {
              slug: 'constant-power-car',
              title: 'Acceleration at constant power',
              prompt:
                'A $1500\\ \\mathrm{kg}$ car with constant power $100\\ \\mathrm{kW}$ at the wheels starts from rest. Ignore losses. Use energy to find the time to reach $30\\ \\mathrm{m/s}$. Find $v(t)$, and show that the acceleration is formally infinite at $t = 0$. Explain what limits it in a real car.',
              kind: 'derivation',
              difficulty: 3,
              hint: '$Pt = \\frac12mv^2$, so $v \\propto \\sqrt t$. The time is about $6.8\\ \\mathrm{s}$. Tyre friction limits the force at low speed.',
            },
          ],
          selfAssessment: [
            {
              question: 'Where does the mechanical energy go when a block slides to rest?',
              answerOutline: 'Into thermal energy of the block and the surface; total energy is conserved.',
            },
            {
              question: 'Why does a car use a lower gear on a steep hill?',
              answerOutline: 'Since $P = Fv$ and power is limited, a greater force needs a lower speed.',
            },
            {
              question: 'What everyday figure can you use to check a human power result?',
              answerOutline: 'About $100\\ \\mathrm{W}$ sustained, with several hundred watts only for short periods.',
            },
          ],
        },
      ],
    },
    {
      slug: 'momentum-and-systems',
      title: 'Momentum and Systems of Particles',
      description:
        'When forces are brief or internal, momentum lets you predict the outcome. Collisions, the centre of mass and rockets all follow from one conservation law.',
      lessons: [
        {
          slug: 'impulse-and-momentum',
          title: 'Impulse and momentum',
          summary:
            'Newton’s second law written in terms of momentum, the impulse of a force, and why padding works.',
          estimatedMinutes: 150,
          objectives: [
            'Define momentum and write the second law in terms of it',
            'Compute impulse from average force or from an integral over time',
            'Explain why longer stopping times mean smaller forces',
            'Apply conservation of momentum to recoil',
          ],
          concepts: [
            'Momentum',
            'Impulse',
            'Impulse-momentum theorem',
            'Average force',
            'Isolated system',
            'Recoil',
          ],
          explanation: `Newton actually wrote his second law in terms of **momentum**, $\\vec p = m\\vec v$:

$$\\vec F_{\\text{net}} = \\frac{d\\vec p}{dt}.$$

Integrating over a time interval gives the **impulse-momentum theorem**:

$$\\vec J = \\int \\vec F\\,dt = \\Delta\\vec p.$$

Energy came from integrating force over *distance*. Momentum comes from integrating force over *time*. That makes it the right tool for impacts, where the force is huge, brief and unknown in detail, but the change in motion is easy to measure. Momentum is a vector, so direction matters.

**Worked example.** A $0.145\\ \\mathrm{kg}$ baseball arrives at $40\\ \\mathrm{m/s}$ and leaves the bat in the opposite direction at $50\\ \\mathrm{m/s}$. Contact lasts $1.0\\ \\mathrm{ms}$. What is the average force?

Take the outgoing direction as positive, so $v_1 = -40\\ \\mathrm{m/s}$ and $v_2 = +50\\ \\mathrm{m/s}$:

$$\\Delta p = m(v_2 - v_1) = (0.145)(90) = 13\\ \\mathrm{kg\\,m/s}.$$

Then

$$F_{\\text{avg}} = \\frac{\\Delta p}{\\Delta t} = \\frac{13\\ \\mathrm{N\\,s}}{1.0\\times 10^{-3}\\ \\mathrm{s}} = 1.3\\times 10^{4}\\ \\mathrm{N}.$$

Check: the sign matters here. Getting $v_2 - v_1 = 10$ instead of $90$ is the classic error. The answer is about the weight of a large car, and it acts for only a millisecond.

**Why padding works.** For a given change in momentum, $F_{\\text{avg}} = \\Delta p/\\Delta t$. Air bags, gym mats and bent knees all extend $\\Delta t$ and so reduce the force. They do not change the impulse.

**Systems.** For several objects, forces between them are internal, and by the third law they come in equal and opposite pairs. They cancel in the sum. So the total momentum changes only because of **external** forces:

$$\\vec F_{\\text{ext}} = \\frac{d\\vec P}{dt}.$$

If the net external force is zero, the total momentum is conserved. In brief collisions and explosions, external forces such as gravity or friction are tiny compared with the internal forces, and they barely act for that short time. So momentum is conserved during the event, to a very good approximation.

**Pitfalls.** Conservation applies to the *total* momentum of the system, not to each piece. Decide what your system is before you start. Also add momenta as vectors, not as sizes.`,
          resources: [
            openstax('Read the chapter on linear momentum and collisions, through conservation of momentum.'),
            mit801('Work the units on momentum and impulse.'),
            hyperphysics('Look up impulse and momentum conservation.'),
          ],
          exercises: [
            {
              slug: 'measured-kick',
              title: 'Impulse from a force curve',
              prompt:
                'During a $10\\ \\mathrm{ms}$ kick, the force on a $0.45\\ \\mathrm{kg}$ ball at rest is modelled by $F(t) = (6.0\\times 10^{7})\\,t\\,(0.010 - t)$, in newtons with $t$ in seconds. Integrate to find the impulse and the launch speed. Find the peak force and the average force.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Impulse $10\\ \\mathrm{N\\,s}$, speed $22\\ \\mathrm{m/s}$, peak $1500\\ \\mathrm{N}$, average $1000\\ \\mathrm{N}$.',
            },
            {
              slug: 'egg-drop',
              title: 'Egg on a floor and on a cushion',
              prompt:
                'A $60\\ \\mathrm{g}$ egg falls $1.0\\ \\mathrm{m}$. Find its speed just before impact. Find the average force if it stops in $2.0\\ \\mathrm{ms}$ on a hard floor, and in $50\\ \\mathrm{ms}$ on a cushion. Compare each with the weight of the egg.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Speed $4.4\\ \\mathrm{m/s}$; about $133\\ \\mathrm{N}$ on the floor and $5.3\\ \\mathrm{N}$ on the cushion.',
            },
            {
              slug: 'rifle-recoil',
              title: 'Recoil',
              prompt:
                'A $4.0\\ \\mathrm{kg}$ rifle fires a $20\\ \\mathrm{g}$ bullet at $400\\ \\mathrm{m/s}$. Find the recoil speed if the rifle is held loosely. Compare the kinetic energies of the bullet and the rifle, and explain why they are so different even though the momenta have equal size.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Recoil is $2.0\\ \\mathrm{m/s}$. For equal momenta, $K = p^2/2m$ favours the lighter object.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is momentum, not energy, the natural tool when a force acts briefly?',
              answerOutline: 'Impulse is force integrated over time, and internal forces cancel for momentum whatever their details.',
            },
            {
              question: 'Do air bags reduce the impulse on a passenger?',
              answerOutline: 'No. The change in momentum is the same; they increase the time and so reduce the force.',
            },
            {
              question: 'Why can you ignore gravity during a collision that lasts a millisecond?',
              answerOutline: 'Its impulse in that time is tiny compared with that of the huge contact force.',
            },
          ],
          relatedLessons: ['classical-mechanics/energy-momentum-and-systems/momentum-impulse-and-collisions'],
        },
        {
          slug: 'collisions',
          title: 'Collisions in one and two dimensions',
          summary:
            'Elastic and inelastic collisions, and how to split a problem into a collision stage and an energy stage.',
          estimatedMinutes: 180,
          objectives: [
            'Classify a collision as elastic, inelastic or perfectly inelastic',
            'Solve one-dimensional collisions with momentum and, if elastic, energy',
            'Solve two-dimensional collisions by components',
            'Split a multi-stage problem at the moment of collision',
          ],
          concepts: [
            'Elastic collision',
            'Perfectly inelastic collision',
            'Kinetic energy loss',
            'Relative speed of approach',
            'Two-dimensional momentum components',
            'Multi-stage problems',
          ],
          explanation: `In every collision of isolated objects, momentum is conserved. Kinetic energy may or may not be.

- **Elastic:** kinetic energy is also conserved. Near enough for steel balls, exactly for many atomic collisions.
- **Inelastic:** some kinetic energy goes into heat, sound and deformation.
- **Perfectly inelastic:** the objects stick together, and this loses the most energy that momentum conservation allows.

For a one-dimensional elastic collision, solving the two conservation laws gives a simple result: the relative speed reverses, $v_1' - v_2' = -(v_1 - v_2)$. If $m_2$ starts at rest,

$$v_1' = \\frac{m_1 - m_2}{m_1 + m_2}v_1, \\qquad v_2' = \\frac{2m_1}{m_1 + m_2}v_1.$$

Check the limits. Equal masses swap velocities. A light ball bouncing off a heavy one reverses. A heavy ball hitting a light one barely slows, and sends it off at nearly $2v_1$.

**Worked example.** A $1500\\ \\mathrm{kg}$ car going east at $15\\ \\mathrm{m/s}$ collides with a $1000\\ \\mathrm{kg}$ car going north at $20\\ \\mathrm{m/s}$. They lock together. Find the velocity just after, and the fraction of kinetic energy lost.

Momentum is a vector, so treat each axis separately, with east as $x$ and north as $y$:

$$x:\\ (1500)(15) = (2500)v_x, \\qquad y:\\ (1000)(20) = (2500)v_y.$$

So $v_x = 9.0\\ \\mathrm{m/s}$ and $v_y = 8.0\\ \\mathrm{m/s}$. The speed is $v = \\sqrt{9.0^2 + 8.0^2} = 12\\ \\mathrm{m/s}$, at $\\tan^{-1}(8.0/9.0) = 42^\\circ$ north of east.

The kinetic energy before is $\\tfrac12(1500)(15)^2 + \\tfrac12(1000)(20)^2 = 369\\ \\mathrm{kJ}$. Afterwards it is $\\tfrac12(2500)(145) = 181\\ \\mathrm{kJ}$. The fraction lost is $0.51$. Check: the direction lies between east and north, slightly nearer east, which fits the eastward momentum ($22500$) being a little larger than the northward ($20000$). Energy goes down, as it must.

**Stages.** Many problems combine a collision with something else. Split them. During a collision, use momentum, since the energy is not conserved. Before and after, when the only forces are conservative, use energy. Mixing these stages is the commonest mistake here.`,
          resources: [
            openstax('Read the sections on collision types and on collisions in multiple dimensions.'),
            phet('Collision Lab', 'collision-lab', 'Vary the elasticity and masses, and watch the momentum and energy totals.'),
            mit801('Work the units on collision theory.'),
          ],
          exercises: [
            {
              slug: 'elastic-check',
              title: 'An elastic collision',
              prompt:
                'A $2.0\\ \\mathrm{kg}$ cart at $5.0\\ \\mathrm{m/s}$ hits a $3.0\\ \\mathrm{kg}$ cart at rest, elastically. Find both final velocities, and show that momentum, energy and the relative speed rule are all satisfied.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $-1.0\\ \\mathrm{m/s}$ and $4.0\\ \\mathrm{m/s}$.',
            },
            {
              slug: 'ballistic-pendulum',
              title: 'Ballistic pendulum',
              prompt:
                'A $10\\ \\mathrm{g}$ bullet embeds in a $2.0\\ \\mathrm{kg}$ block hanging on long strings, and the block rises $5.0\\ \\mathrm{cm}$. Split the problem into stages and find the bullet\'s speed. What fraction of its kinetic energy is lost in the collision? Explain why you cannot use energy conservation from start to finish.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Speed: about $199\\ \\mathrm{m/s}$. The fraction lost is $M/(M + m) = 0.995$.',
            },
            {
              slug: 'billiards',
              title: 'Glancing billiard balls',
              prompt:
                'A ball at $4.0\\ \\mathrm{m/s}$ hits an equal stationary ball elastically and leaves at $60^\\circ$ from its original line. First prove, using the vector momentum equation and energy, that equal masses separate at $90^\\circ$ when one starts at rest. Then find both final speeds.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Square $\\vec v = \\vec v_1\' + \\vec v_2\'$ and compare with the energy equation. The speeds are $2.0\\ \\mathrm{m/s}$ for the ball at $60^\\circ$ and $3.5\\ \\mathrm{m/s}$ for the other, which moves off at $30^\\circ$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which quantity is conserved in every isolated collision, and which only in some?',
              answerOutline: 'Momentum always; kinetic energy only when elastic.',
            },
            {
              question: 'What happens when a very light ball hits a very heavy stationary one elastically?',
              answerOutline: 'It bounces back with about the same speed, and the heavy ball barely moves.',
            },
            {
              question: 'Why does a ballistic pendulum need two stages?',
              answerOutline: 'The collision loses energy, so use momentum there; the swing conserves energy.',
            },
          ],
        },
        {
          slug: 'centre-of-mass-and-systems',
          title: 'Centre of mass and systems',
          summary:
            'The one point that moves as if all the mass and all the external force were there, plus a first look at rockets.',
          estimatedMinutes: 180,
          objectives: [
            'Find the centre of mass of particles and of simple continuous bodies',
            'State the theorem on the motion of the centre of mass',
            'Solve problems where internal motion leaves the centre of mass fixed',
            'Apply the rocket equation',
          ],
          concepts: [
            'Centre of mass',
            'Linear density',
            'Integral for a continuous body',
            'Motion of the centre of mass',
            'Internal forces',
            'Rocket equation',
          ],
          explanation: `A thrown wrench tumbles in a complicated way, yet one point in it follows a perfect parabola. That point is the **centre of mass**:

$$\\vec r_{\\text{cm}} = \\frac{1}{M}\\sum_i m_i\\vec r_i, \\qquad \\vec r_{\\text{cm}} = \\frac{1}{M}\\int \\vec r\\,dm.$$

It is a mass-weighted average position. Differentiate it twice and use the third law to remove internal forces, and you get

$$\\vec F_{\\text{ext}} = M\\vec a_{\\text{cm}}.$$

The whole system moves as if a single particle of mass $M$, at the centre of mass, felt all the external force. Internal forces cannot move the centre of mass. This is why point-particle physics works for real objects.

**Continuous bodies.** Use symmetry where you can: the centre of a uniform sphere is at its middle. Otherwise, set up $dm$. For a rod along $x$ with mass per unit length $\\lambda(x)$, $dm = \\lambda\\,dx$.

**Worked example 1.** A rod of length $L$ has density rising from the end at $x = 0$: $\\lambda = \\lambda_0x/L$. Its mass is $M = \\int_0^L\\lambda_0(x/L)\\,dx = \\lambda_0L/2$, and

$$x_{\\text{cm}} = \\frac{1}{M}\\int_0^Lx\\,\\frac{\\lambda_0x}{L}\\,dx = \\frac{1}{M}\\cdot\\frac{\\lambda_0L^2}{3} = \\frac{2L}{3}.$$

Check: the units are a length, and the answer lies nearer the heavy end than $L/2$ does.

**Worked example 2.** A $70\\ \\mathrm{kg}$ person walks $4.0\\ \\mathrm{m}$ from one end to the other of a $200\\ \\mathrm{kg}$ boat, initially at rest on still water. How far does the boat move? Ignore water resistance. No external horizontal force acts, so the centre of mass stays still. If the boat moves $d$ backward, the person moves $4.0 - d$ forward relative to the water, and

$$70(4.0 - d) = 200d \\quad\\Rightarrow\\quad d = \\frac{(70)(4.0)}{270} = 1.0\\ \\mathrm{m}.$$

Check: the heavier boat moves less than the person, and the ratio of distances is the inverse ratio of masses.

**Rockets.** A rocket throws mass backward at speed $v_e$ relative to itself. Applying momentum conservation over a small time gives $m\\,dv = -v_e\\,dm$, and integrating, with no gravity or drag,

$$\\Delta v = v_e\\ln\\frac{m_0}{m_f}.$$

The logarithm is why rockets are mostly fuel: more speed needs exponentially more propellant.`,
          resources: [
            openstax('Read the sections on centre of mass and rocket propulsion.'),
            phet('Balancing Act', 'balancing-act', 'A quick way to feel how a mass-weighted average works.'),
            mit801('Work the units on the centre of mass and on rockets.'),
          ],
          exercises: [
            {
              slug: 'three-particles',
              title: 'Three particles',
              prompt:
                'Find the centre of mass of $1.0\\ \\mathrm{kg}$ at $(0,\\ 0)$, $2.0\\ \\mathrm{kg}$ at $(4.0,\\ 0)$ and $3.0\\ \\mathrm{kg}$ at $(2.0,\\ 3.0)$, with positions in metres.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The answer is $(2.3,\\ 1.5)\\ \\mathrm{m}$.',
            },
            {
              slug: 'semicircular-wire',
              title: 'A bent wire',
              prompt:
                'A uniform wire is bent into a semicircle of radius $R$. Using $dm = \\lambda R\\,d\\theta$, show that the centre of mass lies at $2R/\\pi$ from the centre, along the axis of symmetry. Notice that this point is not on the wire. Then confirm the result numerically with a sum over many short pieces.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Integrate $R\\sin\\theta$ from 0 to $\\pi$ and divide by the length $\\pi R$.',
            },
            {
              slug: 'exploding-shell',
              title: 'An exploding shell',
              prompt:
                'A shell on level ground would land $600\\ \\mathrm{m}$ from the launch point. At the top of its path it splits into two equal pieces. One has zero speed just after the split and drops straight down. Where does the other land? Explain why you do not need the launch speed or angle.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The centre of mass still lands at $600\\ \\mathrm{m}$. The other piece lands at $900\\ \\mathrm{m}$.',
            },
            {
              slug: 'rocket-mass-ratio',
              title: 'Rocket mass ratio',
              prompt:
                'A rocket with exhaust speed $3000\\ \\mathrm{m/s}$ has a fuelled mass five times its empty mass. Ignoring gravity and drag, find its gain in speed. Then find the mass ratio needed to reach $7800\\ \\mathrm{m/s}$, and comment on the fraction of the launch mass that must be fuel.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The speed gain is $4.8\\ \\mathrm{km/s}$. The second mass ratio is $e^{2.6} \\approx 13$, so over 90 percent of the launch mass is fuel.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can internal forces not change the motion of the centre of mass?',
              answerOutline: 'By the third law they cancel in pairs, leaving only external forces in $\\vec F_{\\text{ext}} = M\\vec a_{\\text{cm}}$.',
            },
            {
              question: 'Must the centre of mass lie inside the object?',
              answerOutline: 'No. A ring or a bent wire has its centre of mass in empty space.',
            },
            {
              question: 'Why does doubling the rocket fuel not double the final speed?',
              answerOutline: 'The speed gain goes as the logarithm of the mass ratio.',
            },
          ],
          relatedLessons: ['classical-mechanics/energy-momentum-and-systems/systems-of-particles-and-variable-mass'],
        },
      ],
      project: {
        slug: 'collision-simulator',
        title: 'A one-dimensional collision simulator',
        description: `Build a small event-driven simulator of balls on a frictionless line, with an optional fixed wall. Each ball has a mass, a position and a velocity, and the program finds the next collision, moves everything to that moment, applies the collision rule, and repeats. A restitution setting $e$ runs from 1 (elastic) to 0 (sticking together): after each collision the relative speed is $e$ times its value before.

The aim is bookkeeping. After every collision your program should audit the total momentum and kinetic energy, so that any error shows up at once. Use it to explore two results you can predict by hand: a line of equal balls, where one ball hitting the row sends one ball out the far side, and a light ball following a heavy ball into a fixed wall, where the light ball can rebound at nearly three times its arrival speed.`,
        deliverables: [
          'A Python program that handles any number of balls and any restitution from 0 to 1',
          'An audit showing that momentum stays constant to rounding error in every run',
          'An audit showing that kinetic energy is constant at e = 1 and only falls at e < 1',
          'A test that reproduces the worked two-cart result of -1.0 m/s and 4.0 m/s',
          'A plot of position against time for at least four balls',
          'A comparison of one run against the PhET Collision Lab',
        ],
        estimatedHours: 7,
        stretchGoals: [
          'Add a third, much lighter ball behind the second and show that its rebound approaches seven times the arrival speed',
          'Extend to two dimensions with discs in a box',
        ],
      },
    },
    {
      slug: 'rotation',
      title: 'Rotation',
      description:
        'Spinning and rolling objects, using a close parallel with straight-line motion: torque for force, moment of inertia for mass, angular momentum for momentum.',
      lessons: [
        {
          slug: 'rotational-kinematics-and-moment-of-inertia',
          title: 'Rotational kinematics and moment of inertia',
          summary:
            'Angles in radians, angular velocity and acceleration, and how mass distribution sets resistance to spinning.',
          estimatedMinutes: 160,
          objectives: [
            'Use radians, angular velocity and angular acceleration',
            'Connect angular and linear quantities through the radius',
            'Compute a moment of inertia by a sum and by an integral',
            'Apply the parallel-axis theorem',
          ],
          concepts: [
            'Radian measure',
            'Angular velocity and acceleration',
            'Tangential and centripetal acceleration',
            'Moment of inertia',
            'Integral for continuous bodies',
            'Parallel-axis theorem',
          ],
          explanation: `A rigid body turning about a fixed axis has one angle $\\theta(t)$ that describes every point. In direct parallel with straight-line motion, define

$$\\omega = \\frac{d\\theta}{dt}, \\qquad \\alpha = \\frac{d\\omega}{dt}.$$

For constant $\\alpha$, the old equations carry over: $\\omega = \\omega_0 + \\alpha t$ and $\\theta = \\omega_0t + \\tfrac12\\alpha t^2$. Angles must be in **radians** for what follows, because the arc length formula $s = r\\theta$ defines the radian. It gives $v = r\\omega$ and tangential acceleration $a_t = r\\alpha$. A point on a turning body also has centripetal acceleration $\\omega^2r$.

**Kinetic energy** of rotation adds up $\\tfrac12mv^2$ over all the pieces, with $v = r\\omega$:

$$K = \\tfrac12\\Big(\\sum m_ir_i^2\\Big)\\omega^2 = \\tfrac12I\\omega^2.$$

The bracket is the **moment of inertia** $I$. It plays the role of mass, but it depends on how far the mass is from the axis, and on which axis you choose. For a continuous body, $I = \\int r^2\\,dm$.

**Worked example.** Find $I$ for a uniform thin rod of mass $M$ and length $L$, about one end. Put the axis at $x = 0$. A small piece has $dm = (M/L)\\,dx$, so

$$I = \\int_0^Lx^2\\frac{M}{L}\\,dx = \\frac{M}{L}\\cdot\\frac{L^3}{3} = \\frac13ML^2.$$

Check: units are $\\mathrm{kg\\,m^2}$. It is less than $ML^2$, which would be all the mass at the far end. It is more than $\\tfrac14ML^2$, which would be all the mass at the middle, as it should be, since $x^2$ favours distant mass.

**Parallel-axis theorem.** If you know $I_{\\text{cm}}$ about an axis through the centre of mass, then about a parallel axis a distance $d$ away,

$$I = I_{\\text{cm}} + Md^2.$$

For the rod, $I_{\\text{cm}} = \\tfrac1{12}ML^2$ and $d = L/2$, which gives $\\tfrac13ML^2$ again. Common results: a hoop has $MR^2$, a solid disc or cylinder $\\tfrac12MR^2$, and a solid sphere $\\tfrac25MR^2$.

**A numerical example.** A flywheel at $3000\\ \\mathrm{rpm}$ stops uniformly in $20\\ \\mathrm{s}$. Convert first: $\\omega_0 = 3000 \\times 2\\pi/60 = 314\\ \\mathrm{rad/s}$. Then $\\alpha = -15.7\\ \\mathrm{rad/s^2}$. The angle turned is the average rate times the time: $\\theta = \\tfrac12(314)(20) = 3142\\ \\mathrm{rad}$, which is $500$ revolutions.`,
          resources: [
            openstax('Read the chapter on fixed-axis rotation, through the sections on calculating moments of inertia.'),
            phet('Rotation', 'rotation', 'If it runs on your machine, use it to compare the linear and angular motion of points on a turntable.'),
            hyperphysics('Look up moment of inertia for a table of common shapes.'),
          ],
          exercises: [
            {
              slug: 'spinning-wheel',
              title: 'A spinning wheel',
              prompt:
                'A wheel of radius $0.30\\ \\mathrm{m}$ spins at $200\\ \\mathrm{rpm}$. Find the speed of a point on the rim and its centripetal acceleration. Separately, find $I$ for point masses of $2.0\\ \\mathrm{kg}$ at $0.50\\ \\mathrm{m}$ and $3.0\\ \\mathrm{kg}$ at $0.20\\ \\mathrm{m}$ from an axis.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $6.3\\ \\mathrm{m/s}$, $132\\ \\mathrm{m/s^2}$, $0.62\\ \\mathrm{kg\\,m^2}$.',
            },
            {
              slug: 'disc-by-integration',
              title: 'Moment of inertia of a disc',
              prompt:
                'Derive $I = \\tfrac12MR^2$ for a uniform disc by splitting it into thin rings of radius $r$, width $dr$ and mass $dm = (M/\\pi R^2)2\\pi r\\,dr$. Then use the parallel-axis theorem to find $I$ about a perpendicular axis through the rim.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The rim axis gives $\\frac32MR^2$.',
            },
            {
              slug: 'numerical-rod',
              title: 'Moment of inertia by computer',
              prompt:
                'Approximate the rod as $N$ equal point masses and sum $m_ix_i^2$ about one end, for $N = 10, 100, 1000$, taking each point at the middle of its segment. Compare with $\\frac13ML^2$. Then repeat for a rod whose density grows linearly from one end, and find the exact result by integration to compare.',
              kind: 'coding',
              difficulty: 2,
              hint: 'With $\\lambda = 2Mx/L^2$ the exact result about the light end is $\\frac12ML^2$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must angles be in radians in $v = r\\omega$?',
              answerOutline: 'The relation comes from $s = r\\theta$, which is true only in radians.',
            },
            {
              question: 'Two discs have equal mass, but one has its mass near the rim. Which is harder to spin up, and why?',
              answerOutline: 'The rim-heavy one: $I$ weights mass by $r^2$.',
            },
            {
              question: 'What does the parallel-axis theorem say, and for which axis is $I$ least?',
              answerOutline: '$I = I_{\\text{cm}} + Md^2$. Among parallel axes, the one through the centre of mass gives the least.',
            },
          ],
          relatedLessons: ['classical-mechanics/rotation-and-rigid-bodies/rotational-kinematics-and-moment-of-inertia'],
        },
        {
          slug: 'torque-and-rotational-dynamics',
          title: 'Torque and rotational dynamics',
          summary:
            'Why the place a force is applied matters, and the rotational form of the second law.',
          estimatedMinutes: 160,
          objectives: [
            'Compute a torque from a force and a lever arm, with sign',
            'Apply the rotational second law',
            'Solve problems that link rotation and straight-line motion',
            'Draw an extended free-body diagram showing where each force acts',
          ],
          concepts: [
            'Torque as r cross F',
            'Lever arm',
            'Rotational second law',
            'Extended free-body diagram',
            'Rope constraint a = r alpha',
            'Weight acts at the centre of mass',
          ],
          explanation: `To open a door easily, push far from the hinge and at right angles. That effect is **torque**:

$$\\vec\\tau = \\vec r\\times\\vec F, \\qquad \\tau = rF\\sin\\phi = r_\\perp F.$$

Here $\\vec r$ runs from the axis to the point where the force acts, and $r_\\perp$ is the lever arm, the perpendicular distance from the axis to the line of the force. A force through the axis gives no torque. For rotation about a fixed axis, pick one sense, usually anticlockwise, as positive.

The rotational second law, about a fixed axis or the centre of mass, is

$$\\sum\\tau = I\\alpha.$$

The parallel with $\\sum F = ma$ is exact, and the method is the same. The only change is that your diagram must show *where* each force acts, because that sets its torque. The weight of an object acts at its centre of mass.

**Worked example.** A light rope is wrapped round a solid $5.0\\ \\mathrm{kg}$ cylinder of radius $0.20\\ \\mathrm{m}$ on a frictionless axle. A $2.0\\ \\mathrm{kg}$ block hangs from it. Find the acceleration of the block and the tension.

Use two diagrams. For the block, taking down as positive:

$$mg - T = ma.$$

For the cylinder, the weight and the axle force act through the axis, so only the tension makes a torque:

$$TR = I\\alpha = \\tfrac12MR^2\\alpha.$$

The rope does not slip, so $a = R\\alpha$. Then $T = \\tfrac12Ma$. Substitute this into the block's equation:

$$a = \\frac{mg}{m + M/2} = \\frac{19.6}{4.5} = 4.4\\ \\mathrm{m/s^2}.$$

Then $T = \\tfrac12(5.0)(4.36) = 11\\ \\mathrm{N}$ and $\\alpha = a/R = 22\\ \\mathrm{rad/s^2}$.

Check: the formula gives free fall when $M \\to 0$ and no motion when $M$ is huge. The tension is less than the block's weight of $19.6\\ \\mathrm{N}$, which it must be for the block to accelerate down. The radius cancels from $a$, which you might not have guessed.

**Pitfalls.** Forces on the two sides of a massive pulley can differ; that difference is what spins it up. So never assume one tension throughout when the pulley has mass. And be consistent: if the block's positive direction is down, the cylinder's positive direction must be the sense it turns when the block falls.`,
          resources: [
            openstax('Read the sections on torque and on the second law for rotation.'),
            phet('Torque', 'torque', 'If it runs on your machine, apply forces at different radii and compare the angular acceleration.'),
            mit801('Work the units on torque and fixed-axis rotation dynamics.'),
          ],
          exercises: [
            {
              slug: 'wrench',
              title: 'A wrench',
              prompt:
                'You pull with $80\\ \\mathrm{N}$ on a wrench handle at a point $0.25\\ \\mathrm{m}$ from the bolt, at $60^\\circ$ to the handle. Find the torque, and find the force needed for the same torque if you pull at right angles.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The torque is $17\\ \\mathrm{N\\,m}$. At right angles you need about $69\\ \\mathrm{N}$.',
            },
            {
              slug: 'falling-rod',
              title: 'A rod starts to fall',
              prompt:
                'A uniform rod of length $L$ is hinged at one end and held horizontal, then released. Show that its initial angular acceleration is $3g/2L$. Show that the far end starts with an acceleration of $\\frac32g$, greater than free fall. If a coin rests on the far end, what happens to it at release?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The torque is $MgL/2$ and $I = \\frac13ML^2$. The coin cannot follow, because only gravity acts on it.',
            },
            {
              slug: 'massive-pulley',
              title: 'Pulley with mass',
              prompt:
                'Blocks of $5.0\\ \\mathrm{kg}$ and $3.0\\ \\mathrm{kg}$ hang over a $2.0\\ \\mathrm{kg}$ solid disc pulley, with no slipping. Write three equations with two different tensions. Show that the pulley adds $M/2$ to the masses being accelerated, and find $a$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$a = (m_1 - m_2)g/(m_1 + m_2 + M/2) = 2.2\\ \\mathrm{m/s^2}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'When is a force at a point far from the axis still unable to produce any torque?',
              answerOutline: 'When its line of action passes through the axis, so the lever arm is zero.',
            },
            {
              question: 'Why does a massive pulley need two different tensions?',
              answerOutline: 'Their difference supplies the net torque that spins it up.',
            },
            {
              question: 'What links the block equation and the cylinder equation?',
              answerOutline: 'The no-slip constraint $a = R\\alpha$.',
            },
          ],
          relatedLessons: ['classical-mechanics/rotation-and-rigid-bodies/torque-angular-momentum-and-rolling'],
        },
        {
          slug: 'rolling-and-rotational-energy',
          title: 'Rolling and rotational energy',
          summary:
            'Rolling as translation plus rotation, and why a solid ball beats a hoop down a ramp.',
          estimatedMinutes: 140,
          objectives: [
            'State the rolling-without-slipping condition',
            'Write the kinetic energy of a rolling body as two parts',
            'Use energy conservation for rolling objects',
            'Find the static friction a rolling object needs',
          ],
          concepts: [
            'Rolling without slipping',
            'Velocity of the contact point',
            'Translational and rotational kinetic energy',
            'Shape factor c in I = cMR squared',
            'Static friction does no net work in pure rolling',
          ],
          explanation: `A rolling wheel combines two motions: its centre moves forward at $v_{\\text{cm}}$, and it spins at $\\omega$. **Rolling without slipping** means the contact point is instantaneously at rest relative to the ground, which requires

$$v_{\\text{cm}} = R\\omega.$$

The top of the wheel then moves at $2v_{\\text{cm}}$, and the bottom at zero. The total kinetic energy is the sum of two terms:

$$K = \\tfrac12Mv_{\\text{cm}}^2 + \\tfrac12I_{\\text{cm}}\\omega^2.$$

Write $I_{\\text{cm}} = cMR^2$, where $c$ is a shape factor: $1$ for a hoop, $\\tfrac12$ for a solid cylinder, $\\tfrac25$ for a solid sphere. Using $\\omega = v/R$,

$$K = \\tfrac12(1 + c)Mv^2.$$

**Worked example.** A solid sphere, a solid cylinder and a hoop each roll without slipping from rest down a ramp, dropping $1.5\\ \\mathrm{m}$ in height. Find their speeds at the bottom.

Static friction makes them roll, but the contact point does not slide, so friction takes no energy out. Energy is conserved:

$$Mgh = \\tfrac12(1 + c)Mv^2 \\quad\\Rightarrow\\quad v = \\sqrt{\\frac{2gh}{1 + c}}.$$

With $2gh = 29.4\\ \\mathrm{m^2/s^2}$:

| Object | $c$ | $v$ (m/s) |
|---|---|---|
| Solid sphere | $2/5$ | $4.6$ |
| Solid cylinder | $1/2$ | $4.4$ |
| Hoop | $1$ | $3.8$ |

A frictionless sliding block would reach $5.4\\ \\mathrm{m/s}$, which is the case $c = 0$. Check: mass and radius both cancel, so a big hoop and a small one tie. The order follows $c$: an object with less of its mass far from the centre puts less energy into spin and more into speed.

**Forces.** You can also use $\\sum F$ and $\\sum\\tau$. Down a ramp at angle $\\theta$, these give $a = g\\sin\\theta/(1 + c)$, and a friction force up the slope of $f = Mg\\sin\\theta\\,\\tfrac{c}{1+c}$. Rolling requires $f \\le \\mu_sN$, so

$$\\mu_s \\ge \\frac{c}{1 + c}\\tan\\theta.$$

If the slope is too steep, the object slides as well as rolls, and then kinetic friction does remove energy.

**Pitfalls.** Static friction here points *up* the ramp on the way down. It slows the centre and spins the wheel up. And $v = R\\omega$ applies only without slipping: a spinning tyre on ice breaks it.`,
          resources: [
            openstax('Read the section on rolling motion.'),
            mit801('Work the unit on rolling, using the worked examples on ramps.'),
            hyperphysics('Look up rolling motion and the ramp race for comparison values.'),
          ],
          exercises: [
            {
              slug: 'sphere-on-a-ramp',
              title: 'Sphere on a steep ramp',
              prompt:
                'A solid sphere rolls down a $30^\\circ$ ramp. Find its acceleration, the least $\\mu_s$ that allows rolling without slipping, and the fraction of its kinetic energy that is rotational.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: $3.5\\ \\mathrm{m/s^2}$, $0.165$, and $0.29$ (which is $2/7$).',
            },
            {
              slug: 'yo-yo',
              title: 'A yo-yo',
              prompt:
                'A yo-yo modelled as a solid disc of radius $R$ falls as its string unwinds from the rim. Show that $a = \\frac23g$, and that the tension is one third of the weight. Why is the answer independent of mass and radius?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the disc, $Mg - T = Ma$ and $TR = \\frac12MR^2(a/R)$. Numerically, $a = 6.5\\ \\mathrm{m/s^2}$.',
            },
            {
              slug: 'ramp-race',
              title: 'Simulate the race',
              prompt:
                'Write a short Python model of the three objects racing down a $2.0\\ \\mathrm{m}$ ramp at $15^\\circ$, using $a = g\\sin\\theta/(1 + c)$. Print each finish time and the gaps between them. Then add a sliding block with $\\mu_k = 0.05$ and find which shape it beats.',
              kind: 'coding',
              difficulty: 2,
              hint: 'With $\\mu_k = 0.05$ the block has $a = g(\\sin\\theta - \\mu_k\\cos\\theta)$, which is larger than for any of the rolling shapes here.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the velocity of the point of a wheel touching the ground during pure rolling?',
              answerOutline: 'Zero, relative to the ground.',
            },
            {
              question: 'Why does static friction not reduce the mechanical energy of a rolling ball?',
              answerOutline: 'The contact point is at rest, so no sliding occurs and no energy is lost as heat.',
            },
            {
              question: 'Why do the mass and radius not affect a rolling race?',
              answerOutline: 'Both appear equally in $K$ and $Mgh$ and so cancel. Only the shape factor $c$ matters.',
            },
          ],
        },
        {
          slug: 'angular-momentum',
          title: 'Angular momentum',
          summary:
            'The rotational version of momentum, its conservation, and why a skater spins faster with arms pulled in.',
          estimatedMinutes: 140,
          objectives: [
            'Compute the angular momentum of a particle and of a rigid body',
            'Relate net torque to the rate of change of angular momentum',
            'Apply conservation of angular momentum',
            'Find how much kinetic energy changes in a rotational collision',
          ],
          concepts: [
            'Angular momentum of a particle',
            'L = I omega for a rigid body',
            'Torque as dL/dt',
            'Conservation when external torque is zero',
            'Rotational inelastic collision',
          ],
          explanation: `For a particle, **angular momentum** about a chosen point is

$$\\vec L = \\vec r\\times\\vec p.$$

For a rigid body turning about a fixed axis, adding over its pieces gives $L = I\\omega$. Differentiating and using the second law gives the rotational law in its best form:

$$\\sum\\vec\\tau_{\\text{ext}} = \\frac{d\\vec L}{dt}.$$

So if the net external torque about a point is zero, $\\vec L$ about that point stays constant. Unlike the rule $\\sum\\tau = I\\alpha$, this still holds if $I$ changes, because the body changes shape.

**Worked example.** A skater spins at $2.0\\ \\mathrm{rev/s}$ with arms out, with moment of inertia $4.0\\ \\mathrm{kg\\,m^2}$. She pulls her arms in, reducing it to $1.6\\ \\mathrm{kg\\,m^2}$. Find the new spin rate and the change in kinetic energy.

The ice gives almost no torque, so $L$ is conserved: $I_1\\omega_1 = I_2\\omega_2$, and the ratio means you can keep rev/s here:

$$\\omega_2 = \\frac{(4.0)(2.0)}{1.6} = 5.0\\ \\mathrm{rev/s}.$$

Now compare $K = \\tfrac12I\\omega^2 = L^2/2I$. Since $L$ is fixed, $K$ grows by the factor $I_1/I_2 = 2.5$. The extra energy is not free: she does work pulling her arms inward against their tendency to keep going straight. Check: momentum-type quantities are conserved here while the energy changes, just as in a collision run backward.

**Collisions with a pivot.** When something strikes a body on a fixed pivot, the pivot exerts a large force, so linear momentum of the system is not conserved. But that force has no torque about the pivot, so angular momentum about the pivot *is* conserved. That is the right choice of point.

For example, a child of mass $m$ running along a radius has no angular momentum about the axle of a merry-go-round. If she steps on at the rim, the moment of inertia rises and the rotation slows.

**The direction.** $\\vec L$ is a vector. Its direction lies along the axis, by the right-hand rule. This is why a spinning wheel or a bicycle resists being tipped: changing the direction of a large $\\vec L$ needs a sustained torque. Planets keep their orbits in a plane for the same reason, because gravity from the Sun gives zero torque about the Sun. You will use that in the next module to explain Kepler's second law.

**Pitfalls.** State the point about which you take $L$ and $\\tau$. They depend on it. A particle moving in a straight line can have nonzero angular momentum about a point off its line.`,
          resources: [
            openstax('Read the chapter on angular momentum, leaving precession as optional.'),
            mit801('Work the unit on angular momentum of a rigid body about a fixed axis.'),
            hyperphysics('Look up angular momentum and its conservation.'),
          ],
          exercises: [
            {
              slug: 'merry-go-round',
              title: 'Stepping on a merry-go-round',
              prompt:
                'A merry-go-round with $I = 200\\ \\mathrm{kg\\,m^2}$ turns at $1.5\\ \\mathrm{rad/s}$. A $30\\ \\mathrm{kg}$ child standing on the ground steps on at the rim, $2.0\\ \\mathrm{m}$ from the axis, with no tangential speed. Find the new rate, and find the fraction of the kinetic energy lost.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The new rate is $0.94\\ \\mathrm{rad/s}$. The fraction lost is $120/320$.',
            },
            {
              slug: 'bullet-and-rod',
              title: 'Bullet into a rod',
              prompt:
                'A $5.0\\ \\mathrm{g}$ bullet at $300\\ \\mathrm{m/s}$ hits and sticks in the end of a uniform $0.50\\ \\mathrm{kg}$, $1.0\\ \\mathrm{m}$ rod, pivoted at its other end, moving at right angles to the rod. Find the angular speed just after. Explain why you use angular momentum and not linear momentum.',
              kind: 'problem',
              difficulty: 2,
              hint: 'About $8.7\\ \\mathrm{rad/s}$. The pivot supplies an impulse, but no torque about itself.',
            },
            {
              slug: 'particle-on-a-line',
              title: 'A straight line has angular momentum',
              prompt:
                'A particle of mass $m$ moves at constant velocity $v$ along the line $y = b$. Show that its angular momentum about the origin stays constant, equal to size $mvb$, using $\\vec r\\times\\vec p$ at a general position. Explain the result in terms of torque.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The $x$ part of $\\vec r$ is parallel to $\\vec p$ and gives no cross product. No force means no torque.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a skater speed up when pulling her arms in?',
              answerOutline: 'External torque is about zero, so $L = I\\omega$ is fixed. Lower $I$ means higher $\\omega$.',
            },
            {
              question: 'Is kinetic energy conserved as she does this?',
              answerOutline: 'No, it increases, by the work her muscles do.',
            },
            {
              question: 'When a body hits a pivoted rod, why is angular momentum about the pivot conserved?',
              answerOutline: 'The large pivot force acts at the pivot, so it has no torque about that point.',
            },
          ],
        },
        {
          slug: 'static-equilibrium',
          title: 'Static equilibrium',
          summary:
            'The two conditions for a body at rest, and how to choose a pivot that removes unknowns.',
          estimatedMinutes: 140,
          objectives: [
            'State the two conditions for static equilibrium',
            'Choose a pivot to eliminate unknown forces',
            'Solve ladder, beam and cable problems',
            'Decide whether a friction limit is respected',
          ],
          concepts: [
            'Net force zero',
            'Net torque zero',
            'Freedom to choose the pivot',
            'Hinge reaction components',
            'Centre of gravity',
          ],
          explanation: `A body at rest and staying at rest has no acceleration of any kind. So two conditions hold:

$$\\sum\\vec F = 0, \\qquad \\sum\\vec\\tau = 0.$$

For a problem in a plane, that is three equations: two for force and one for torque. Here is the useful fact: if the net force is zero, then the net torque is the same about *every* point. So you may choose any point as your pivot, and the best one is where an unknown force acts, because that force then has no lever arm and vanishes from the equation.

**Worked example.** A uniform $5.0\\ \\mathrm{m}$ ladder of mass $20\\ \\mathrm{kg}$ leans on a frictionless wall at $60^\\circ$ to the floor. What least coefficient of static friction at the floor keeps it from slipping?

Draw the ladder. Four forces act: weight $mg$ at the middle, floor normal $N$ and floor friction $f$ at the foot, and wall normal $P$ at the top, which is horizontal since the wall is frictionless.

Force balance gives $N = mg = 196\\ \\mathrm{N}$ and $f = P$.

Take torques about the foot, which removes $N$ and $f$. The weight's lever arm is $\\tfrac12L\\cos 60^\\circ$. The wall's lever arm is $L\\sin 60^\\circ$:

$$PL\\sin 60^\\circ = mg\\,\\tfrac12L\\cos 60^\\circ \\quad\\Rightarrow\\quad P = \\frac{mg}{2\\tan 60^\\circ} = 57\\ \\mathrm{N}.$$

So $f = 57\\ \\mathrm{N}$, and we need $f \\le \\mu_sN$, which gives

$$\\mu_s \\ge \\frac{57}{196} = 0.29.$$

Check: $L$ cancelled, so a long ladder at the same angle is no safer. As the ladder gets steeper, $\\tan\\theta$ rises and the friction needed falls, which matches experience.

**Solving method.** Draw the body with each force at its true point of action. Replace a hinge force with two unknown components; if one turns out negative, that component just points the other way. Write the torque equation first, about the point with the most unknowns. Then use the two force equations.

**Stability.** An object standing on a base is stable while a vertical line through its centre of mass falls inside the base. Tilt it past that, and gravity's torque tips it further. That is the same stable-and-unstable idea you saw in potential energy graphs.

**Pitfalls.** Weight acts at the centre of mass, not at an end. Do not write $f = \\mu_sN$ unless the object is about to slip: in a static problem it is an inequality, and you usually need the friction first, and then you test it.`,
          resources: [
            openstax('Read the chapter on static equilibrium, skipping the material on elasticity if short of time.'),
            phet('Balancing Act', 'balancing-act', 'Predict the balance point first, then test it.'),
            mit801('Work the unit on static equilibrium.'),
          ],
          exercises: [
            {
              slug: 'seesaw',
              title: 'A seesaw',
              prompt:
                'A $30\\ \\mathrm{kg}$ child sits $2.0\\ \\mathrm{m}$ from the pivot of a uniform seesaw. Where must a $40\\ \\mathrm{kg}$ child sit for balance? Why does the mass of the plank not matter here, if the pivot is at its middle?',
              kind: 'problem',
              difficulty: 1,
              hint: '$1.5\\ \\mathrm{m}$ on the other side. The plank\'s weight acts through the pivot.',
            },
            {
              slug: 'sign-on-a-beam',
              title: 'A beam, a cable and a sign',
              prompt:
                'A uniform $300\\ \\mathrm{N}$ horizontal beam is hinged to a wall at one end. A $500\\ \\mathrm{N}$ sign hangs from the far end, where a cable runs up to the wall at $30^\\circ$ to the beam. Find the cable tension and the two components of the hinge force.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Take torques about the hinge. Tension $1300\\ \\mathrm{N}$; hinge force $1126\\ \\mathrm{N}$ along the beam, and $150\\ \\mathrm{N}$ upward.',
            },
            {
              slug: 'climbing-the-ladder',
              title: 'Climbing the ladder',
              prompt:
                'A $70\\ \\mathrm{kg}$ person stands $4.0\\ \\mathrm{m}$ along the ladder from the worked example, measured from the foot. Find the wall force and the least friction coefficient now needed. Write $\\mu_{\\min}$ as a function of the distance climbed, plot it in Python, and explain why ladders slip when you are near the top.',
              kind: 'problem',
              difficulty: 3,
              hint: 'The wall force is $373\\ \\mathrm{N}$, and $N = 882\\ \\mathrm{N}$, so $\\mu_{\\min} = 0.42$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why may you choose any point as the pivot in a static problem?',
              answerOutline: 'With zero net force, the net torque has the same value about every point.',
            },
            {
              question: 'How do you choose the best pivot?',
              answerOutline: 'Put it where unknown forces act, so that they have no lever arm.',
            },
            {
              question: 'A hinge force component comes out negative. What has gone wrong?',
              answerOutline: 'Nothing. It points opposite to the direction you assumed.',
            },
          ],
        },
      ],
    },
    {
      slug: 'gravitation-and-fluids',
      title: 'Gravitation and Fluids',
      description:
        "Newton's law of gravity and the orbits it produces, then the pressure, buoyancy and flow of fluids.",
      lessons: [
        {
          slug: 'universal-gravitation',
          title: 'Universal gravitation',
          summary:
            'The inverse-square law, what sets g at the surface of a planet, and what weightlessness really is.',
          estimatedMinutes: 130,
          objectives: [
            "State Newton's law of gravitation and use it for spherical bodies",
            'Derive the surface gravity of a planet',
            'Compute how g changes with height',
            'Explain weightlessness in orbit',
          ],
          concepts: [
            'Inverse-square law',
            'Gravitational constant G',
            'Shell theorem',
            'Surface gravity',
            'Weightlessness as free fall',
          ],
          explanation: `Newton realised that the force pulling an apple down also holds the Moon in orbit. Any two masses attract each other along the line between them, with

$$F = \\frac{Gm_1m_2}{r^2}, \\qquad G = 6.67\\times 10^{-11}\\ \\mathrm{N\\,m^2/kg^2}.$$

$G$ is tiny, which is why you do not feel a pull toward your desk. Two $1000\\ \\mathrm{kg}$ spheres whose centres are $1.0\\ \\mathrm{m}$ apart attract with a force of only $6.7\\times 10^{-5}\\ \\mathrm{N}$.

**The shell theorem.** A spherically symmetric body attracts objects outside it as if all its mass were at its centre, and the proof uses an integral over thin shells. Inside a uniform shell, the net force is zero. So Earth acts like a point at its centre for anything above its surface, even an apple on the ground.

**Surface gravity.** Setting $mg = GMm/R^2$ gives

$$g = \\frac{GM}{R^2}.$$

With $M_E = 5.97\\times 10^{24}\\ \\mathrm{kg}$ and $R_E = 6.37\\times 10^{6}\\ \\mathrm{m}$, this gives about $9.8\\ \\mathrm{m/s^2}$. The mass $m$ has cancelled, which is why all objects fall alike.

**Worked example.** How strong is gravity at the International Space Station, $400\\ \\mathrm{km}$ above the ground? Sketch Earth and the station. The law uses the distance from Earth's *centre*, not the height:

$$r = 6.37\\times 10^{6} + 0.40\\times 10^{6} = 6.77\\times 10^{6}\\ \\mathrm{m}.$$

$$g_{\\text{ISS}} = \\frac{(6.67\\times 10^{-11})(5.97\\times 10^{24})}{(6.77\\times 10^{6})^2} = 8.7\\ \\mathrm{m/s^2}.$$

That is $0.89$ of the surface value. Check by scaling: the ratio is $(6.37/6.77)^2$, which gives the same result without any constants.

So why do astronauts float? Not because gravity is absent. The station and everyone in it are in free fall together, going round Earth. As with the lift whose cable has broken, nothing pushes on them, so the normal force is zero. **Weightlessness** means no support force, not no gravity.

**Pitfalls.** The distance in the law is between centres. If you double $r$, the force falls by four, not two. And $g = 9.80\\ \\mathrm{m/s^2}$ with $U = mgy$ is only a near-surface approximation of this law.`,
          resources: [
            openstax('Read the chapter on gravitation through weight and gravity at the surface.'),
            phet('Gravity Force Lab', 'gravity-force-lab', 'Test the inverse-square law by doubling the distance and each mass.'),
            {
              title: 'NIST Fundamental Physical Constants',
              url: 'https://physics.nist.gov/cuu/Constants/',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The reference values of G and the other constants.',
            },
          ],
          exercises: [
            {
              slug: 'moon-gravity',
              title: 'Gravity on the Moon',
              prompt:
                'Given the Moon\'s mass $7.35\\times 10^{22}\\ \\mathrm{kg}$ and radius $1.74\\times 10^{6}\\ \\mathrm{m}$, find its surface gravity. By what factor does the time to fall through a given height change, compared with on Earth?',
              kind: 'problem',
              difficulty: 1,
              hint: 'About $1.6\\ \\mathrm{m/s^2}$. Time scales as $\\sqrt{1/g}$, so it is about 2.5 times as long.',
            },
            {
              slug: 'balance-point',
              title: 'Where the pulls cancel',
              prompt:
                'The Earth-Moon distance is $3.84\\times 10^{8}\\ \\mathrm{m}$. Find the point between them, measured from Earth\'s centre, where the two gravitational forces on a spacecraft are equal and opposite. Answer with symbols first, and check that the point is nearer the Moon.',
              kind: 'problem',
              difficulty: 2,
              hint: 'It is $d/(1 + \\sqrt{M_M/M_E})$ from Earth, about $3.5\\times 10^{8}\\ \\mathrm{m}$.',
            },
            {
              slug: 'inside-the-earth',
              title: 'Gravity inside a uniform Earth',
              prompt:
                'Treat Earth as a uniform sphere. Using the shell theorem, show that at radius $r < R$ only the mass inside $r$ matters, so that $g(r) = g_0r/R$. What is $g$ at half the radius? Explain why real Earth, with a dense core, differs.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The enclosed mass scales as $r^3$. At half the radius, $g = 4.9\\ \\mathrm{m/s^2}$ in this model.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the shell theorem let you do?',
              answerOutline: 'Treat a spherically symmetric body as a point at its centre for anything outside it.',
            },
            {
              question: 'Why is $r$ in the worked example not 400 km?',
              answerOutline: 'The law uses the distance between centres of mass.',
            },
            {
              question: 'Are astronauts in orbit free of gravity? Explain.',
              answerOutline: 'No. Gravity is almost as strong as on the ground. They are in free fall, so there is no support force.',
            },
          ],
          relatedLessons: ['classical-mechanics/oscillations-and-gravitation/newtonian-gravitation'],
        },
        {
          slug: 'orbits-and-energy',
          title: 'Orbits and gravitational energy',
          summary:
            'Circular orbits, Kepler’s laws, the gravitational potential energy formula and escape speed.',
          estimatedMinutes: 150,
          objectives: [
            'Derive orbital speed and period for a circular orbit',
            'State Kepler’s three laws and link the second to angular momentum',
            'Use the potential energy formula -GMm/r',
            'Compute escape speed and orbital energy',
          ],
          concepts: [
            'Circular orbit condition',
            "Kepler's laws",
            'Gravitational potential energy',
            'Total orbital energy',
            'Escape speed',
            'Geosynchronous orbit',
          ],
          explanation: `For a circular orbit, gravity supplies the net inward force:

$$\\frac{GMm}{r^2} = \\frac{mv^2}{r} \\quad\\Rightarrow\\quad v = \\sqrt{\\frac{GM}{r}}.$$

Using $v = 2\\pi r/T$ gives

$$T^2 = \\frac{4\\pi^2}{GM}r^3.$$

This is **Kepler's third law**, for circles. It also holds for ellipses if $r$ is replaced by the semi-major axis. The first law says planets move on ellipses with the Sun at one focus. The second says the line from Sun to planet sweeps out equal areas in equal times, which is conservation of angular momentum: gravity from the Sun exerts no torque about the Sun.

**Worked example.** Find the radius, height and speed of a geosynchronous orbit, which has a period of one sidereal day, $T = 86\\,164\\ \\mathrm{s}$, equal to Earth's actual rotation period. Solve Kepler's law for $r$:

$$r = \\left(\\frac{GMT^2}{4\\pi^2}\\right)^{1/3} = 4.22\\times 10^{7}\\ \\mathrm{m}.$$

The height is $r - R_E = 3.58\\times 10^{7}\\ \\mathrm{m}$, and the speed is $v = 2\\pi r/T = 3.07\\ \\mathrm{km/s}$. Check: a low orbit at $400\\ \\mathrm{km}$ gives $v = 7.7\\ \\mathrm{km/s}$ and a period of $92$ minutes. The higher orbit is slower, as $v \\propto r^{-1/2}$ says, and much longer.

**Energy.** Far from Earth, $U = mgy$ fails. Integrating the true force from infinity gives

$$U(r) = -\\frac{GMm}{r},$$

with the zero at infinite distance. It is negative because you must add energy to separate the masses. For a circular orbit, $K = \\tfrac12mv^2 = GMm/2r$, and so

$$E = K + U = -\\frac{GMm}{2r}.$$

Notice that $K = -E$. Adding energy raises the orbit and slows the craft. Pushing forward makes a satellite go higher, where it moves more slowly.

**Escape speed.** To just reach infinity with nothing left over, $E = 0$:

$$\\tfrac12mv^2 - \\frac{GMm}{R} = 0 \\quad\\Rightarrow\\quad v_{\\text{esc}} = \\sqrt{\\frac{2GM}{R}} = 11.2\\ \\mathrm{km/s}$$

from Earth's surface. That is $\\sqrt 2$ times the speed of a circular orbit just above the surface, and it does not depend on the mass $m$ or on the launch direction.

**Pitfalls.** Use radii from the centre, not heights. Keep $U$ negative when subtracting. And the ordinary potential energy $mgh$ is what you get by expanding $-GMm/r$ for small heights.`,
          resources: [
            openstax('Read the rest of the chapter on gravitation: orbits, energy and Kepler’s laws.'),
            phet("Kepler's Laws", 'keplers-laws', 'Change the eccentricity and verify the area and period laws.'),
            phet('Gravity And Orbits', 'gravity-and-orbits', 'Turn gravity off for a moment and see what the orbit was hiding.'),
          ],
          exercises: [
            {
              slug: 'weigh-the-sun',
              title: 'Weigh the Sun',
              prompt:
                'Use Earth\'s orbit, with radius $1.50\\times 10^{11}\\ \\mathrm{m}$ and period $3.156\\times 10^{7}\\ \\mathrm{s}$, to find the mass of the Sun. Then use Kepler\'s third law to find the period of Mars, whose orbit has semi-major axis $1.52$ times Earth\'s.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Mass about $2.0\\times 10^{30}\\ \\mathrm{kg}$. Mars has a period of $1.52^{3/2} = 1.87$ years.',
            },
            {
              slug: 'raising-an-orbit',
              title: 'Raising an orbit',
              prompt:
                'Find the energy needed to move a $1000\\ \\mathrm{kg}$ satellite from a circular orbit at radius $6.77\\times 10^{6}\\ \\mathrm{m}$ to a geosynchronous orbit. Show that its kinetic energy falls even though its total energy rises.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Use $E = -GMm/2r$. The energy needed is about $2.5\\times 10^{10}\\ \\mathrm{J}$.',
            },
            {
              slug: 'expand-the-potential',
              title: 'Recover mgh',
              prompt:
                'Using $U = -GMm/r$ with $r = R + h$ and the expansion $1/(1 + x) \\approx 1 - x$ for small $x$, show that $\\Delta U \\approx mgh$ near the surface, with $g = GM/R^2$. Then find the height at which this approximation is off by $1\\%$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The exact result is $mgh/(1 + h/R)$, so the error is about $h/R$. A $1\\%$ error needs $h$ near $64\\ \\mathrm{km}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is gravitational potential energy negative here?',
              answerOutline: 'Zero is chosen at infinity, and bound objects need added energy to get there.',
            },
            {
              question: 'A satellite fires its engine forward along its motion. What happens to its orbit and final speed?',
              answerOutline: 'It rises to a higher orbit, and ends up moving more slowly there.',
            },
            {
              question: 'Which conservation law explains Kepler’s second law?',
              answerOutline: 'Conservation of angular momentum, since a central force has no torque about the centre.',
            },
          ],
          relatedLessons: ['classical-mechanics/oscillations-and-gravitation/keplers-laws-and-orbits'],
        },
        {
          slug: 'pressure-and-buoyancy',
          title: 'Pressure and buoyancy',
          summary:
            'Pressure in a fluid at rest, how it grows with depth, and Archimedes’ principle.',
          estimatedMinutes: 130,
          objectives: [
            'Define pressure and density with SI units',
            'Derive how pressure changes with depth',
            'Apply Pascal’s principle to hydraulic systems',
            'Use Archimedes’ principle for floating and submerged objects',
          ],
          concepts: [
            'Density',
            'Pressure and the pascal',
            'Gauge and absolute pressure',
            'Pascal’s principle',
            'Buoyant force',
            'Archimedes’ principle',
          ],
          explanation: `A fluid at rest pushes on every surface with a **pressure** $P = F/A$, measured in pascals ($1\\ \\mathrm{Pa} = 1\\ \\mathrm{N/m^2}$). Pressure has no direction of its own: it pushes perpendicular to whatever surface is there.

**Depth.** Take a thin slab of fluid of area $A$ and thickness $dy$, and draw its free-body diagram. Its weight is $\\rho gA\\,dy$, and it balances the difference in pressure force between its faces. So $dP/dy = -\\rho g$, and for a liquid of constant density,

$$P = P_0 + \\rho gh,$$

at depth $h$ below a surface at pressure $P_0$. Atmospheric pressure is $1.013\\times 10^{5}\\ \\mathrm{Pa}$. The term $\\rho gh$ alone is the **gauge pressure**. Water has $\\rho = 1000\\ \\mathrm{kg/m^3}$, so every $10\\ \\mathrm{m}$ of depth adds about one atmosphere. Only depth matters here, not the shape of the container.

**Pascal's principle.** Pressure added to an enclosed fluid reaches every part of it. So in a hydraulic lift, a small force on a small piston makes a large force on a big one: $F_2 = F_1A_2/A_1$. You pay in distance, since the small piston must move further. The energy accounts balance.

**Archimedes' principle.** The pressure on the bottom of a submerged object exceeds that on the top, so the fluid pushes up. Summing the forces over the surface gives a neat result: the upward **buoyant force** equals the weight of the fluid displaced,

$$F_B = \\rho_{\\text{fluid}}gV_{\\text{displaced}}.$$

You can see why without any integral. If the object were replaced by fluid of the same shape, that fluid would float at rest. So the surrounding pressure must exactly hold up that weight.

**Worked example.** What fraction of an iceberg lies below the surface? Take ice at $917\\ \\mathrm{kg/m^3}$ and sea water at $1025\\ \\mathrm{kg/m^3}$. Draw the berg with its weight down and buoyancy up. It floats at rest, so these balance:

$$\\rho_{\\text{ice}}gV = \\rho_{\\text{sea}}gV_{\\text{sub}} \\quad\\Rightarrow\\quad \\frac{V_{\\text{sub}}}{V} = \\frac{917}{1025} = 0.895.$$

So about $90\\%$ is hidden. Check: $g$ cancelled, so the fraction would be the same on the Moon, and the fraction would be $1$ if the densities were equal, which is the limit of just floating.

**Pitfalls.** Use the density of the fluid in $F_B$, not of the object. For a floating object, $V_{\\text{displaced}}$ is only the submerged part. And $h$ is measured downward from the surface.`,
          resources: [
            openstax('Read the chapter on fluid mechanics through Archimedes’ principle.'),
            phet('Under Pressure', 'under-pressure', 'Test pressure against depth, and against container shape.'),
            phet('Buoyancy', 'buoyancy', 'Compare the buoyant force with the weight of displaced fluid.'),
          ],
          exercises: [
            {
              slug: 'pressure-at-depth',
              title: 'Pressure at depth, and a lift',
              prompt:
                '(a) Find the gauge and absolute pressure $10\\ \\mathrm{m}$ under fresh water. (b) A hydraulic lift has pistons whose radii differ by a factor of ten. What force on the small piston holds a $1500\\ \\mathrm{kg}$ car? If the car rises $1.0\\ \\mathrm{cm}$, how far does the small piston move?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Gauge $9.8\\times 10^{4}\\ \\mathrm{Pa}$, absolute about $2.0\\times 10^{5}\\ \\mathrm{Pa}$. Force $147\\ \\mathrm{N}$; it moves $1.0\\ \\mathrm{m}$.',
            },
            {
              slug: 'is-it-gold',
              title: 'Is it gold?',
              prompt:
                'A crown weighs $30.0\\ \\mathrm{N}$ in air and $28.2\\ \\mathrm{N}$ fully submerged in water. Find its volume and density. Pure gold has a density of $1.93\\times 10^{4}\\ \\mathrm{kg/m^3}$. Is the crown pure?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The buoyant force is $1.8\\ \\mathrm{N}$. The density is $\\rho_w W/F_B$, about $1.7\\times 10^{4}\\ \\mathrm{kg/m^3}$, so it is not pure gold.',
            },
            {
              slug: 'force-on-a-dam',
              title: 'Force on a dam',
              prompt:
                'A vertical dam is $50\\ \\mathrm{m}$ wide and holds water $20\\ \\mathrm{m}$ deep. Pressure varies with depth, so integrate $dF = \\rho gyw\\,dy$ to show that the net water force is $\\frac12\\rho gwH^2$. Evaluate it. Ignore the air, which pushes on both sides. Why are dams thicker at the bottom?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The force is $9.8\\times 10^{7}\\ \\mathrm{N}$. Pressure, and so the load, grows with depth.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the pressure at the bottom of a tank not depend on its shape?',
              answerOutline: 'Only depth enters the equation $dP/dy = -\\rho g$.',
            },
            {
              question: 'State Archimedes’ principle.',
              answerOutline: 'The buoyant force equals the weight of the fluid displaced.',
            },
            {
              question: 'Does a hydraulic lift give you free energy?',
              answerOutline: 'No. The force gain is paid for by moving the small piston further.',
            },
          ],
        },
        {
          slug: 'fluid-flow-and-bernoulli',
          title: 'Fluid flow and Bernoulli’s equation',
          summary:
            'The continuity equation, Bernoulli’s equation as energy conservation, and when they apply.',
          estimatedMinutes: 130,
          objectives: [
            'Apply the continuity equation to a pipe of changing area',
            'State Bernoulli’s equation and its conditions',
            'Solve draining-tank and pipe-flow problems',
            'Explain common misuses of Bernoulli’s equation',
          ],
          concepts: [
            'Steady flow',
            'Volume flow rate',
            'Continuity equation',
            'Bernoulli’s equation',
            'Torricelli’s law',
            'Limits: viscosity and turbulence',
          ],
          explanation: `For a moving fluid, we use an ideal model: incompressible, with no viscosity, and steady. Under these conditions, two equations suffice.

**Continuity.** Fluid cannot pile up in a pipe, so the volume passing each section per second is the same:

$$A_1v_1 = A_2v_2.$$

This is why a thumb over a hose makes a jet.

**Bernoulli's equation.** Apply the work-energy theorem to a small parcel moving along a streamline. The pressure forces do work, and the parcel's kinetic and potential energy change. Per unit volume, this gives

$$P + \\tfrac12\\rho v^2 + \\rho gy = \\text{constant}.$$

So where the fluid speeds up at the same height, the pressure falls. That can sound backward, but it is just Newton's law: to speed up, a parcel needs more pressure behind it than in front.

**Worked example 1.** Water flows at $1.5\\ \\mathrm{m/s}$ through a horizontal pipe of diameter $4.0\\ \\mathrm{cm}$, which narrows to $2.0\\ \\mathrm{cm}$. Find the speed in the narrow part and the pressure drop.

Halving the diameter divides the area by four, so continuity gives $v_2 = 4(1.5) = 6.0\\ \\mathrm{m/s}$. Bernoulli at equal height gives

$$P_1 - P_2 = \\tfrac12\\rho(v_2^2 - v_1^2) = \\tfrac12(1000)(36 - 2.25) = 17\\ \\mathrm{kPa}.$$

Check: this is about a sixth of an atmosphere, and a positive result says that the wide section is at the higher pressure, as needed to accelerate the water.

**Worked example 2.** A tank open at the top has a small hole $h$ below the surface. Both the surface and the jet are at atmospheric pressure, and the surface moves very slowly. Bernoulli between them gives $\\rho gh = \\tfrac12\\rho v^2$, so

$$v = \\sqrt{2gh},$$

**Torricelli's law**. For $h = 5.0\\ \\mathrm{m}$, $v = 9.9\\ \\mathrm{m/s}$. Check: this equals the speed of a stone dropped through $h$, and energy conservation says it should.

**Limits.** Real fluids have viscosity, so long thin pipes need a pressure drop just to keep the flow going. Fast flow turns turbulent, and Bernoulli then fails.

A common wrong account of lift says that air over a wing must "catch up" with the air below. It need not. The air on top actually arrives sooner. A wing makes lift by turning air downward; the pressure difference is real, but the equal-time story is false.

**Pitfalls.** Use the same streamline and the same units, and keep the terms in pascals. Bernoulli is about steady flow without energy added or lost, so a pump or a long rough pipe needs extra terms. Continuity gives speeds; use it first.`,
          resources: [
            openstax('Read the rest of the chapter on fluid mechanics, through viscosity and turbulence.'),
            hyperphysics('Look up Bernoulli and Torricelli for short derivations.'),
            phet('Fluid Pressure and Flow', 'fluid-pressure-and-flow', 'An older simulation: if it runs on your machine, measure pressure along a pipe of changing width.'),
          ],
          exercises: [
            {
              slug: 'hose-and-bucket',
              title: 'A hose and a bucket',
              prompt:
                'Water leaves a hose of inner diameter $2.0\\ \\mathrm{cm}$ at $3.0\\ \\mathrm{m/s}$. Find the flow rate in litres per second and the time to fill a $10\\ \\mathrm{L}$ bucket.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $0.94\\ \\mathrm{L/s}$ and about $11\\ \\mathrm{s}$.',
            },
            {
              slug: 'draining-a-tank',
              title: 'How long to drain a tank?',
              prompt:
                'A tank has surface area $A = 1.0\\ \\mathrm{m^2}$ and water $2.0\\ \\mathrm{m}$ deep, draining through a hole of area $a = 1.0\\ \\mathrm{cm^2}$. Using Torricelli and continuity, write $dh/dt = -(a/A)\\sqrt{2gh}$, separate the variables, and show that the drain time is $(A/a)\\sqrt{2h_0/g}$. Evaluate it in hours. Check it by stepping the equation numerically in Python.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'The time is about $1.8$ hours. Half the water leaves in well under half the time.',
            },
            {
              slug: 'pressure-on-a-wing',
              title: 'A pressure estimate',
              prompt:
                'Air of density $1.2\\ \\mathrm{kg/m^3}$ moves at $70\\ \\mathrm{m/s}$ over a wing and $60\\ \\mathrm{m/s}$ under it. Treat these speeds as given. Use Bernoulli to find the pressure difference, and the force on a wing of area $20\\ \\mathrm{m^2}$. State which assumption of Bernoulli you are relying on.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Pressure difference $780\\ \\mathrm{Pa}$; force $15600\\ \\mathrm{N}$. Ignore the height difference.',
            },
          ],
          selfAssessment: [
            {
              question: 'What physical law is Bernoulli’s equation a form of?',
              answerOutline: 'Energy conservation (the work-energy theorem) per unit volume.',
            },
            {
              question: 'Give two conditions under which Bernoulli’s equation fails.',
              answerOutline: 'Significant viscosity, turbulence, compressibility, or energy added by a pump.',
            },
            {
              question: 'Why does pressure fall where a pipe narrows?',
              answerOutline: 'The fluid speeds up, which requires a net forward force from higher pressure behind.',
            },
          ],
        },
      ],
      project: {
        slug: 'orbit-simulator',
        title: 'An orbit simulator',
        description: `Write a Python program that moves a satellite around Earth by stepping Newton's law forward in small time steps, without using any orbit formula. Then use it to test the formulas from the lesson. Work in two dimensions, with Earth fixed at the origin.

Use the leapfrog (velocity Verlet) update: half a kick, a full drift, half a kick. Compare it with simple Euler stepping, which spirals outward, to see why the choice of method matters. Start from a circular orbit at radius $6.77\\times 10^{6}\\ \\mathrm{m}$, then give the craft more speed for ellipses, and at last enough speed to escape.`,
        deliverables: [
          'A Python simulator with Euler and leapfrog steppers',
          'A plot of energy against time for both, showing Euler drift and leapfrog stability',
          'A check that the circular orbit period matches the formula to within 0.1 percent',
          'A table of period against semi-major axis for at least four ellipses, verifying Kepler’s third law',
          'A measurement of area swept per unit time that verifies Kepler’s second law',
          'A demonstration of escape: bound below the escape speed and unbound above it',
        ],
        estimatedHours: 5,
        stretchGoals: [
          'Model a Hohmann transfer from a low orbit to a geosynchronous orbit and report the total velocity change',
          'Add the Moon as a second attractor',
        ],
      },
    },
    {
      slug: 'oscillations-and-waves',
      title: 'Oscillations and Waves',
      description:
        'Motion that repeats and disturbances that travel: springs, pendulums, damping, strings and sound.',
      lessons: [
        {
          slug: 'simple-harmonic-motion',
          title: 'Simple harmonic motion',
          summary:
            'The motion produced by a restoring force proportional to displacement, and its energy.',
          estimatedMinutes: 140,
          objectives: [
            'Show that a linear restoring force gives simple harmonic motion',
            'Find the amplitude and phase from initial conditions',
            'Compute frequency, period, peak speed and peak acceleration',
            'Follow the exchange of kinetic and potential energy',
          ],
          concepts: [
            'Restoring force',
            'Angular frequency, frequency, period',
            'Amplitude and phase',
            'Oscillator equation',
            'Energy in an oscillator',
          ],
          explanation: `If you pull an object from a stable equilibrium, a restoring force brings it back. Near almost any stable point, that force is proportional to the displacement, because any smooth $U(x)$ looks like a parabola at the bottom of a valley. So one model describes springs, pendulums, atoms in solids and much else.

For a mass on a spring, the second law says $m\\ddot x = -kx$, or

$$\\frac{d^2x}{dt^2} = -\\omega^2x, \\qquad \\omega = \\sqrt{\\frac{k}{m}}.$$

You need a function whose second derivative is minus a constant times itself. Sine and cosine do this, so the general solution is

$$x(t) = A\\cos(\\omega t + \\phi).$$

Substitute it back to check. The **amplitude** $A$ and the **phase** $\\phi$ come from the initial position and velocity. The frequency is $f = \\omega/2\\pi$, and the period is $T = 1/f$. Note that $\\omega$ does not depend on $A$: a big swing and a small swing take the same time.

Differentiating gives $v = -A\\omega\\sin(\\omega t + \\phi)$ and $a = -\\omega^2x$. So peak speed is $A\\omega$ at the centre, and peak acceleration is $A\\omega^2$ at the ends.

**Energy.** The total energy is constant,

$$E = \\tfrac12mv^2 + \\tfrac12kx^2 = \\tfrac12kA^2,$$

and it moves back and forth between kinetic and potential forms.

**Worked example.** A $0.50\\ \\mathrm{kg}$ block on a spring with $k = 200\\ \\mathrm{N/m}$ is pulled $0.10\\ \\mathrm{m}$ from equilibrium on a frictionless table and released.

$$\\omega = \\sqrt{\\frac{200}{0.50}} = 20\\ \\mathrm{rad/s}, \\quad f = \\frac{\\omega}{2\\pi} = 3.2\\ \\mathrm{Hz}, \\quad T = 0.31\\ \\mathrm{s}.$$

Peak speed is $A\\omega = 2.0\\ \\mathrm{m/s}$, peak acceleration is $A\\omega^2 = 40\\ \\mathrm{m/s^2}$, and the energy is $\\tfrac12kA^2 = 1.0\\ \\mathrm{J}$.

Check: that energy gives the same peak speed, since $\\tfrac12(0.50)(2.0)^2 = 1.0\\ \\mathrm{J}$. A stiffer spring raises $\\omega$, and a heavier block lowers it, which fits intuition. Released from rest at $+A$, the motion is $x = A\\cos\\omega t$ with $\\phi = 0$.

**Pitfalls.** Keep your calculator in radians for $\\omega t$. Do not mix $f$ and $\\omega$: they differ by $2\\pi$. And the constant-acceleration equations are useless here, because $a$ changes all the time.`,
          resources: [
            openstax('Read the chapter on oscillations through energy in simple harmonic motion.'),
            phet('Masses and Springs', 'masses-and-springs', 'Measure the period against mass and against spring constant.'),
            mit801('Work the unit on simple harmonic motion.'),
          ],
          exercises: [
            {
              slug: 'initial-conditions',
              title: 'Amplitude from initial conditions',
              prompt:
                'An oscillator with $\\omega = 4.0\\ \\mathrm{rad/s}$ starts at $x_0 = 0.050\\ \\mathrm{m}$ moving at $v_0 = +0.60\\ \\mathrm{m/s}$. Find $A$ and $\\phi$ in $x = A\\cos(\\omega t + \\phi)$. Take care over the sign of $\\phi$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$A = \\sqrt{x_0^2 + (v_0/\\omega)^2} = 0.16\\ \\mathrm{m}$, and $\\tan\\phi = -v_0/(\\omega x_0)$, with $\\phi$ negative here.',
            },
            {
              slug: 'static-stretch',
              title: 'Period from a stretch',
              prompt:
                'A mass hung on a spring stretches it $5.0\\ \\mathrm{cm}$ at rest. Show that gravity shifts the equilibrium but not the period, and that $T = 2\\pi\\sqrt{\\delta/g}$, where $\\delta$ is the stretch. Evaluate $T$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'At rest, $k\\delta = mg$. The period is about $0.45\\ \\mathrm{s}$.',
            },
            {
              slug: 'energy-share',
              title: 'Energy at half amplitude',
              prompt:
                'At $x = A/2$, what fraction of the total energy is kinetic? Where is the energy shared equally? Confirm both with a small numerical table of $K$ and $U$ over one period.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The kinetic fraction is $0.75$. Equal shares occur at $x = A/\\sqrt 2$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is simple harmonic motion so common in nature?',
              answerOutline: 'Near any stable equilibrium, $U(x)$ is close to a parabola, giving a linear restoring force.',
            },
            {
              question: 'Does doubling the amplitude change the period?',
              answerOutline: 'No, for an ideal linear oscillator.',
            },
            {
              question: 'Where in the cycle are speed and acceleration greatest?',
              answerOutline: 'Speed at the centre, and acceleration at the extremes.',
            },
          ],
          relatedLessons: ['classical-mechanics/oscillations-and-gravitation/simple-harmonic-motion-and-damping'],
        },
        {
          slug: 'pendulums-and-damping',
          title: 'Pendulums, damping and resonance',
          summary:
            'Pendulums as oscillators, how friction makes oscillation decay, and what happens when you drive a system.',
          estimatedMinutes: 140,
          objectives: [
            'Derive the period of a simple pendulum for small angles',
            'Find the period of a physical pendulum',
            'Describe the decay of a lightly damped oscillator',
            'Explain resonance in driven systems',
          ],
          concepts: [
            'Simple pendulum',
            'Small-angle approximation',
            'Physical pendulum',
            'Light damping',
            'Quality factor',
            'Resonance',
          ],
          explanation: `A **simple pendulum** is a small mass on a light string of length $L$. Take torques about the pivot: the tension acts along the string, so only gravity counts, and $I = mL^2$. Then

$$mL^2\\ddot\\theta = -mgL\\sin\\theta.$$

For small angles, in radians, $\\sin\\theta \\approx \\theta$. So $\\ddot\\theta = -(g/L)\\theta$, the oscillator equation, with

$$T = 2\\pi\\sqrt{\\frac{L}{g}}.$$

This is the dimensional guess from the first lesson, now with the factor $2\\pi$ found. The mass cancels. The period is also nearly independent of amplitude, which made pendulums good clocks. The approximation is good: even at a $60^\\circ$ amplitude, the true period is only $1.07$ times this value.

For a **physical pendulum**, any rigid body swinging on a pivot a distance $d$ from its centre of mass, the same steps give

$$T = 2\\pi\\sqrt{\\frac{I}{Mgd}}.$$

**Worked example.** What pendulum length gives a period of $2.00\\ \\mathrm{s}$? Solve for $L$:

$$L = g\\left(\\frac{T}{2\\pi}\\right)^2 = (9.80)\\left(\\frac{2.00}{2\\pi}\\right)^2 = 0.993\\ \\mathrm{m}.$$

Check: about a metre, as in a tall clock. In fact the metre was once proposed as the length of a pendulum beating seconds, which is why $g \\approx \\pi^2$ in SI units.

**Damping.** Real oscillators lose energy. With a drag force $-bv$, the equation becomes $m\\ddot x + b\\dot x + kx = 0$. When damping is light, the solution is

$$x(t) = Ae^{-\\gamma t}\\cos(\\omega_dt + \\phi), \\qquad \\gamma = \\frac{b}{2m},$$

an oscillation inside a shrinking exponential envelope, at a frequency $\\omega_d$ very close to $\\omega_0$. Energy goes as amplitude squared, so it decays twice as fast, as $e^{-2\\gamma t}$. The **quality factor** $Q = \\omega_0/2\\gamma$ counts how many radians of swing the energy lasts, and it is large for a good oscillator.

**Resonance.** Push a swing at a steady rhythm. If a driving force at frequency $\\omega$ acts on the oscillator, then after the start-up dies away the system moves at the driving frequency, not its own. The amplitude is largest when $\\omega$ is near $\\omega_0$, and that peak is taller and narrower for larger $Q$. Each push then adds energy in step with the motion. That is why soldiers break step on bridges and how a radio picks one station.

**Pitfalls.** The small-angle result needs radians and small swings. For the physical pendulum, $d$ is the distance from pivot to centre of mass, and $I$ is about the pivot.`,
          resources: [
            openstax('Read the sections on pendulums, damped oscillations and forced oscillations.'),
            phet('Pendulum Lab', 'pendulum-lab', 'Find how the period depends on length, mass, amplitude and gravity.'),
            hyperphysics('Look up resonance for a clear picture of driven oscillators.'),
          ],
          exercises: [
            {
              slug: 'swinging-rod',
              title: 'A swinging rod',
              prompt:
                'A uniform rod of length $1.00\\ \\mathrm{m}$ swings from one end. Find its small-oscillation period. What length of simple pendulum has the same period? Separately, by what factor does the period of a given simple pendulum change on the Moon, where $g = 1.62\\ \\mathrm{m/s^2}$?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The period is $1.64\\ \\mathrm{s}$, the same as a simple pendulum of length $2L/3$. On the Moon, the factor is about $2.5$.',
            },
            {
              slug: 'ring-down',
              title: 'Measure a damping rate',
              prompt:
                'An oscillator with a period of $1.0\\ \\mathrm{s}$ falls to half its amplitude in $10\\ \\mathrm{s}$. Find $\\gamma$ and $Q$. What fraction of the energy remains after those $10\\ \\mathrm{s}$?',
              kind: 'problem',
              difficulty: 2,
              hint: '$\\gamma = \\ln 2/10 = 0.069\\ \\mathrm{s^{-1}}$ and $Q$ is about $45$. The energy remaining is the square of one half: $0.25$.',
            },
            {
              slug: 'large-angle-pendulum',
              title: 'When small angles fail',
              prompt:
                'Using `scipy.integrate.solve_ivp`, solve $\\ddot\\theta = -(g/L)\\sin\\theta$ for $L = 1.0\\ \\mathrm{m}$ from rest at amplitudes of $10^\\circ$ up to $170^\\circ$. Measure each period, and plot it divided by the small-angle value. Confirm the $1.07$ figure at $60^\\circ$.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Find the first time $\\dot\\theta$ returns to zero: that is half a period. Use an event function.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the mass not appear in the period of a simple pendulum?',
              answerOutline: 'Gravity\'s torque and the inertia are both proportional to $m$, so it cancels.',
            },
            {
              question: 'If the amplitude decays as $e^{-\\gamma t}$, how does the energy decay?',
              answerOutline: 'As $e^{-2\\gamma t}$, since energy goes as amplitude squared.',
            },
            {
              question: 'At what frequency does a driven oscillator move in the steady state?',
              answerOutline: 'At the driving frequency. The amplitude is greatest near its natural frequency.',
            },
          ],
          relatedLessons: ['classical-mechanics/oscillations-and-gravitation/driven-oscillators-and-resonance'],
        },
        {
          slug: 'waves-on-strings',
          title: 'Waves on strings',
          summary:
            'Travelling waves, wave speed, superposition and the standing waves of a fixed string.',
          estimatedMinutes: 140,
          objectives: [
            'Read amplitude, wavelength, period and speed from a wave function',
            'Compute wave speed on a string from tension and density',
            'Use superposition to explain interference and standing waves',
            'Find the harmonics of a string fixed at both ends',
          ],
          concepts: [
            'Transverse and longitudinal waves',
            'Wave number and angular frequency',
            'Wave speed on a string',
            'Superposition',
            'Standing waves, nodes and antinodes',
            'Harmonics',
          ],
          explanation: `A **wave** carries energy and a pattern, without carrying the medium along. Each piece of a string only moves up and down, while the shape travels. A sinusoidal wave moving in the $+x$ direction is

$$y(x, t) = A\\sin(kx - \\omega t),$$

with **wave number** $k = 2\\pi/\\lambda$ and angular frequency $\\omega = 2\\pi f$. A point of fixed phase moves at speed

$$v = \\frac{\\omega}{k} = f\\lambda.$$

Do not confuse this with the speed of the string itself, which is $\\partial y/\\partial t$, peaking at $A\\omega$.

**Wave speed.** On a string under tension $F$, with mass per unit length $\\mu$, Newton's law applied to a short piece gives

$$v = \\sqrt{\\frac{F}{\\mu}}.$$

This is the form you found from dimensions. The medium sets the speed, and the source sets the frequency. So when a wave crosses into a new medium, $f$ stays the same, and $\\lambda$ changes.

**Superposition.** When two waves overlap, their displacements add. They pass through each other unchanged. Adding two equal waves moving in opposite directions gives a **standing wave**:

$$A\\sin(kx - \\omega t) + A\\sin(kx + \\omega t) = 2A\\sin kx\\cos\\omega t.$$

Points where $\\sin kx = 0$ never move: these are **nodes**. Halfway between them lie the **antinodes**.

On a string fixed at both ends, each end must be a node, so a whole number of half-wavelengths must fit: $L = n\\lambda/2$. This gives the **harmonics**:

$$f_n = \\frac{nv}{2L}, \\qquad n = 1, 2, 3, \\ldots$$

**Worked example.** A guitar string has length $0.65\\ \\mathrm{m}$, $\\mu = 1.2\\ \\mathrm{g/m}$ and tension $70\\ \\mathrm{N}$. Find the wave speed and the first two harmonics.

First convert: $\\mu = 1.2\\times 10^{-3}\\ \\mathrm{kg/m}$. Then

$$v = \\sqrt{\\frac{70}{1.2\\times 10^{-3}}} = 242\\ \\mathrm{m/s}, \\qquad f_1 = \\frac{v}{2L} = \\frac{242}{1.30} = 186\\ \\mathrm{Hz},$$

and $f_2 = 372\\ \\mathrm{Hz}$. Check: this is a realistic note, and tightening a string raises the pitch, as $v \\propto \\sqrt F$ predicts. A real guitar string has a wavelength of $2L$ for its fundamental, but the sound in the air has a different wavelength, since the sound travels at a different speed with the same $f$.

**Pitfalls.** Keep $\\mu$ in kg/m. Check the sign in the wave function: $kx - \\omega t$ moves toward $+x$. And in a standing wave nothing travels; the energy stays put between nodes.`,
          resources: [
            openstax('Read the chapter on waves, including standing waves.'),
            phet('Wave on a String', 'wave-on-a-string', 'Try oscillate mode, a fixed end, and low damping to find harmonics.'),
            phet('Normal Modes', 'normal-modes', 'See a line of masses develop the standing-wave patterns.'),
          ],
          exercises: [
            {
              slug: 'read-a-wave',
              title: 'Read a wave function',
              prompt:
                'A wave is $y = 0.020\\sin(3.0x - 60t)$, in SI units. Find its wavelength, frequency, wave speed and direction, and the peak speed of a point on the string.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $2.1\\ \\mathrm{m}$, $9.5\\ \\mathrm{Hz}$, $20\\ \\mathrm{m/s}$ toward $+x$, and $1.2\\ \\mathrm{m/s}$.',
            },
            {
              slug: 'tuning',
              title: 'Tuning and pulses',
              prompt:
                '(a) What tension tunes the worked-example string to a fundamental of $440\\ \\mathrm{Hz}$? (b) A $20\\ \\mathrm{m}$ rope of mass $1.0\\ \\mathrm{kg}$ has a tension of $80\\ \\mathrm{N}$. How long does a pulse take to travel its length?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $393\\ \\mathrm{N}$. (b) $\\mu = 0.050\\ \\mathrm{kg/m}$, so the time is $0.50\\ \\mathrm{s}$.',
            },
            {
              slug: 'standing-wave-identity',
              title: 'Build a standing wave',
              prompt:
                'Prove the identity for the sum of two opposite waves using $\\sin(a \\pm b)$. Then write a Python animation or a set of snapshot plots showing the two travelling waves and their sum. Mark the nodes, and verify that they stay fixed.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Plot at $t$ values spaced one eighth of a period apart.',
            },
          ],
          selfAssessment: [
            {
              question: 'What sets the speed of a wave on a string, and what sets its frequency?',
              answerOutline: 'The tension and density set the speed. The source sets the frequency.',
            },
            {
              question: 'How does the speed of a point on the string differ from the wave speed?',
              answerOutline: 'Wave speed is how fast the shape moves. Point speed is transverse and changes with time, up to $A\\omega$.',
            },
            {
              question: 'Why are only certain frequencies allowed on a fixed string?',
              answerOutline: 'Both ends must be nodes, so a whole number of half-wavelengths must fit.',
            },
          ],
          relatedLessons: ['waves-optics/waves-on-strings-and-in-media/standing-waves-boundary-conditions-and-harmonics'],
        },
        {
          slug: 'sound-and-doppler',
          title: 'Sound, pipes and the Doppler effect',
          summary:
            'Sound as a pressure wave, loudness in decibels, resonance in pipes, beats and moving sources.',
          estimatedMinutes: 140,
          objectives: [
            'Relate intensity, power and distance for a point source',
            'Convert intensity to decibels',
            'Find the harmonics of open and closed pipes',
            'Apply the Doppler formula with correct signs',
          ],
          concepts: [
            'Speed of sound',
            'Intensity and the inverse-square law',
            'Decibel scale',
            'Open and closed pipes',
            'Beats',
            'Doppler effect',
          ],
          explanation: `Sound is a longitudinal pressure wave. In air at $20\\ ^\\circ\\mathrm{C}$ its speed is about $343\\ \\mathrm{m/s}$, which is set by the air and not by the pitch.

**Intensity** is power per unit area. A small source spreads evenly over a sphere, so $I = P/4\\pi r^2$. The ear covers an enormous range, so we use a log scale, with $I_0 = 1.0\\times 10^{-12}\\ \\mathrm{W/m^2}$:

$$\\beta = 10\\log_{10}\\frac{I}{I_0}\\ \\ \\mathrm{dB}.$$

Each factor of ten in intensity adds $10\\ \\mathrm{dB}$, and doubling it adds $3.0\\ \\mathrm{dB}$.

**Pipes.** An open end of a pipe is a pressure node and a displacement antinode. A pipe open at both ends has $f_n = nv/2L$, with all harmonics. A pipe closed at one end has a displacement node there, so a quarter-wavelength fits the fundamental, and only odd harmonics exist: $f_n = nv/4L$ for $n = 1, 3, 5, \\ldots$

**Beats.** Two tones with close frequencies drift in and out of step, and you hear the loudness rise and fall at $f_{\\text{beat}} = |f_1 - f_2|$. Musicians tune by removing beats.

**Doppler effect.** A moving source squeezes waves ahead of it and stretches them behind. A moving listener meets crests more or less often. The combined result, for motion along the line between them, is

$$f_L = f_S\\frac{v + v_L}{v - v_S}.$$

Here $v_L$ is positive if the listener moves toward the source, and $v_S$ is positive if the source moves toward the listener. Motion toward raises the pitch.

**Worked example.** An ambulance with a $700\\ \\mathrm{Hz}$ siren passes you at $30\\ \\mathrm{m/s}$. What frequencies do you hear before and after it passes? You are still, so $v_L = 0$. Approaching:

$$f = 700\\cdot\\frac{343}{343 - 30} = 767\\ \\mathrm{Hz}.$$

Receding, with $v_S = -30\\ \\mathrm{m/s}$:

$$f = 700\\cdot\\frac{343}{343 + 30} = 644\\ \\mathrm{Hz}.$$

Check: one result is above $700\\ \\mathrm{Hz}$ and the other below, as you hear in the familiar falling tone. The shifts are not quite equal, because the formula is not symmetric. The fractional shift is about $v_S/v \\approx 9\\%$, which agrees with both answers roughly.

**Pitfalls.** The source's speed is in the denominator and the listener's is in the numerator, so a moving source and a moving listener at the same speed give slightly different results. Air is the reference frame here. Also, $\\beta$ adds through intensities: two equal sources give $3.0\\ \\mathrm{dB}$ more, not double the decibels.`,
          resources: [
            openstax('Read the chapter on sound, including beats and the Doppler effect.'),
            phet('Sound Waves', 'sound-waves', 'See particle motion and pressure in a sound wave.'),
            hyperphysics('Look up sound for tables of pipes and decibels.'),
          ],
          exercises: [
            {
              slug: 'pipes',
              title: 'Open and closed pipes',
              prompt:
                'A $0.50\\ \\mathrm{m}$ pipe is in air with $v = 343\\ \\mathrm{m/s}$. Find its fundamental when open at both ends, and when closed at one end. What is the next harmonic of the closed pipe?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: $343\\ \\mathrm{Hz}$; $172\\ \\mathrm{Hz}$; $515\\ \\mathrm{Hz}$, which is the third harmonic.',
            },
            {
              slug: 'decibels',
              title: 'Decibels and distance',
              prompt:
                '(a) Find the level of a sound of intensity $1.0\\times 10^{-5}\\ \\mathrm{W/m^2}$. (b) A source of acoustic power $100\\ \\mathrm{W}$ radiates evenly. Find the intensity and the level at $10\\ \\mathrm{m}$. (c) Show that doubling the distance lowers the level by about $6\\ \\mathrm{dB}$.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) $70\\ \\mathrm{dB}$; (b) $0.080\\ \\mathrm{W/m^2}$ and $109\\ \\mathrm{dB}$; (c) intensity falls by four.',
            },
            {
              slug: 'beats-in-python',
              title: 'Hear and see beats',
              prompt:
                'Add two sine waves at $440\\ \\mathrm{Hz}$ and $444\\ \\mathrm{Hz}$ with NumPy and plot one second of the sum. Count the loudness peaks per second and compare with the beat formula. If you like, write the sum to a WAV file with `scipy.io.wavfile` and listen to it. Use the identity $\\sin a + \\sin b = 2\\sin\\frac{a+b}{2}\\cos\\frac{a-b}{2}$ to explain the result.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'You should count 4 beats per second. The cosine envelope has frequency 2 Hz, but loudness peaks twice per cycle.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do closed pipes have only odd harmonics?',
              answerOutline: 'With a node at one end and an antinode at the other, $L$ must be an odd number of quarter wavelengths.',
            },
            {
              question: 'What is the change in level when intensity grows by a factor of 100?',
              answerOutline: '$20\\ \\mathrm{dB}$.',
            },
            {
              question: 'Why do the signs of the Doppler formula work out as they do?',
              answerOutline: 'Each should raise the pitch for approach: a bigger numerator or a smaller denominator.',
            },
          ],
          relatedLessons: ['waves-optics/waves-on-strings-and-in-media/sound-waves-and-the-doppler-effect'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'roller-coaster-design-study',
    title: 'A roller coaster design study',
    description: `Design a roller coaster on paper and in Python, then prove with calculations that it is both exciting and safe. The aim is to use one model to bring the whole course together. Your train starts on a launch or a lift hill, drops, goes through a vertical loop and a banked turn, and stops in a braking section. All the design choices are yours, but each must be justified.

Describe the track as a smooth curve of height against distance. Use energy with a small friction term to find the speed everywhere, then use circular motion to find the normal force, and so the g-force felt by riders, at each point. Include the rotation of the wheels as a small correction to the kinetic energy, and use momentum for the coupling of two carriages at the start. Treat the seat suspension as a damped oscillator to estimate the shaking as a train crosses a bump, and use a sanity check for every number you report. A coaster that passes must keep its train on the track, must never go above $5\\ g$ of felt acceleration, must keep the seat pushing up on riders except for brief moments, and must stop within the braking section.`,
    deliverables: [
      'A one-page specification listing the track sections, train mass and design limits',
      'A Python model giving speed and felt g-force along the track, with a plot of each',
      'A free-body diagram of a rider at the top of the loop, in the banked turn and on the brakes, with the matching equations',
      'A closed-form check of two sections by hand, agreeing with the code to within 1 percent',
      'A calculation of the launch or lift energy and the power it requires',
      'A braking analysis giving distance, deceleration and thermal energy delivered to the brakes',
      'A damped-oscillator estimate of the seat motion crossing one bump',
      'A short written report of the design choices and a list of what the model leaves out',
    ],
    estimatedHours: 10,
    stretchGoals: [
      'Replace the circular loop with a clothoid-style loop of changing radius, and compare the peak g-force',
      'Find how much speed is lost as air drag is added to the model',
    ],
  },
  masteryChecklist: [
    'I can draw a correct free-body diagram for each object in a system and write the matching equations',
    'I can solve motion problems in one and two dimensions with calculus',
    'I can choose between forces, energy and momentum for a given problem, and say why',
    'I can solve rotation problems with torque, moment of inertia and angular momentum',
    'I can analyse orbits, floating objects and simple fluid flows',
    'I can describe oscillators and waves, and compute their frequencies and speeds',
    'I can check any answer by units, by estimate and by a limiting case',
    'I can test a physics result with a short Python model',
  ],
});
