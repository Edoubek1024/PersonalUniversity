import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/** Resources reused across many lessons; spread them and add a lesson-specific note. */
const R = {
  mit820: {
    title: 'MIT 8.20 Introduction to Special Relativity (IAP 2021)',
    url: 'https://ocw.mit.edu/courses/8-20-introduction-to-special-relativity-january-iap-2021/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit8033: {
    title: 'MIT 8.033 Relativity (Fall 2006)',
    url: 'https://ocw.mit.edu/courses/8-033-relativity-fall-2006/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit8962: {
    title: 'MIT 8.962 General Relativity (Spring 2020, Hughes) — lecture videos and notes',
    url: 'https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit8224: {
    title: 'MIT 8.224 Exploring Black Holes: General Relativity and Astrophysics',
    url: 'https://ocw.mit.edu/courses/8-224-exploring-black-holes-general-relativity-astrophysics-spring-2003/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  carroll: {
    title: 'Sean Carroll — Lecture Notes on General Relativity (arXiv gr-qc/9712019)',
    url: 'https://arxiv.org/abs/gr-qc/9712019',
    type: 'textbook',
    cost: 'free',
    provider: 'arXiv',
  },
  carrollPage: {
    title: 'Sean Carroll — Lecture Notes on General Relativity (chapter-by-chapter page)',
    url: 'https://preposterousuniverse.com/grnotes/',
    type: 'textbook',
    cost: 'free',
    provider: 'Sean Carroll',
  },
  carrollBook: {
    title: 'Carroll — Spacetime and Geometry: An Introduction to General Relativity',
    url: 'https://www.preposterousuniverse.com/spacetimeandgeometry/',
    type: 'textbook',
    cost: 'paid',
    provider: 'Cambridge University Press (book page by the author)',
  },
  tongGR: {
    title: 'David Tong — Lectures on General Relativity',
    url: 'https://davidtong.org/teaching/general-relativity/',
    type: 'textbook',
    cost: 'free',
    provider: 'University of Cambridge',
  },
  tongDR: {
    title: 'David Tong — Dynamics and Relativity (special relativity chapters)',
    url: 'https://davidtong.org/teaching/dynamics-and-relativity/',
    type: 'textbook',
    cost: 'free',
    provider: 'University of Cambridge',
  },
  tongCosmo: {
    title: 'David Tong — Lectures on Cosmology',
    url: 'https://davidtong.org/teaching/cosmology/',
    type: 'textbook',
    cost: 'free',
    provider: 'University of Cambridge',
  },
  susskindSR: {
    title: 'Susskind — The Theoretical Minimum: Special Relativity and Electrodynamics (video lectures)',
    url: 'https://theoreticalminimum.com/courses/special-relativity-and-electrodynamics/2012/spring',
    type: 'lecture',
    cost: 'free',
    provider: 'Stanford University',
  },
  susskindGR: {
    title: 'Susskind — The Theoretical Minimum: General Relativity (video lectures)',
    url: 'https://theoreticalminimum.com/courses/general-relativity/2012/fall',
    type: 'lecture',
    cost: 'free',
    provider: 'Stanford University',
  },
  spacetimePhysics: {
    title: 'Taylor & Wheeler — Spacetime Physics, 2nd ed. (free PDF from the authors)',
    url: 'https://www.eftaylor.com/spacetimephysics/',
    type: 'textbook',
    cost: 'free',
    provider: 'Edwin F. Taylor',
  },
  exploringBH: {
    title: 'Taylor, Wheeler & Bertschinger — Exploring Black Holes, 2nd ed. (free PDF)',
    url: 'https://www.eftaylor.com/exploringblackholes/',
    type: 'textbook',
    cost: 'free',
    provider: 'Edwin F. Taylor',
  },
  openstax3: {
    title: 'OpenStax University Physics Volume 3, Chapter 5: Relativity',
    url: 'https://openstax.org/books/university-physics-volume-3/pages/5-introduction',
    type: 'textbook',
    cost: 'free',
    provider: 'OpenStax',
  },
  einsteinOnline: {
    title: 'Einstein Online — explanations of special and general relativity',
    url: 'https://www.einstein-online.info/en/',
    type: 'article',
    cost: 'free',
    provider: 'Max Planck Institute for Gravitational Physics',
  },
  will: {
    title: 'Will — The Confrontation between General Relativity and Experiment (Living Reviews, arXiv 1403.7377)',
    url: 'https://arxiv.org/abs/1403.7377',
    type: 'article',
    cost: 'free',
    provider: 'arXiv',
  },
  ligo: {
    title: 'LIGO Caltech — Laser Interferometer Gravitational-Wave Observatory',
    url: 'https://www.ligo.caltech.edu/',
    type: 'article',
    cost: 'free',
    provider: 'Caltech / MIT LIGO Laboratory',
  },
  gwosc: {
    title: 'Gravitational Wave Open Science Center — tutorials and open data',
    url: 'https://gwosc.org/tutorials/',
    type: 'dataset',
    cost: 'free',
    provider: 'LIGO / Virgo / KAGRA',
  },
  einsteinpy: {
    title: 'EinsteinPy — Python package for general relativity',
    url: 'https://einsteinpy.org/',
    type: 'tool',
    cost: 'free',
    provider: 'EinsteinPy project',
  },
} satisfies Record<string, ResourceInput>;

const feynman1 = (ch: number, title: string): ResourceInput => ({
  title: `Feynman Lectures Vol. I, Ch. ${ch}: ${title}`,
  url: `https://www.feynmanlectures.caltech.edu/I_${String(ch).padStart(2, '0')}.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'Caltech',
});

export default defineSubject({
  id: 'relativity',
  title: 'Special and General Relativity',
  category: 'physics',
  tagline:
    'Spacetime, four-vectors and curvature: from the invariance of the speed of light to black holes, gravitational waves and the expanding universe.',
  description: `Relativity is the theory of space and time. Special relativity (1905) follows from two postulates, that the laws of physics are the same in every inertial frame and that light moves at the same speed $c$ in all of them, and it fuses space and time into a single four-dimensional spacetime with a geometry of its own. General relativity (1915) goes further: gravity is not a force but the curvature of spacetime, produced by energy and momentum through Einstein's field equations. Its predictions, once exotic, are now engineering: GPS clocks must correct for both effects, black holes have been imaged, and gravitational waves from colliding black holes are detected every few days.

This curriculum uses MIT OpenCourseWare 8.20 and 8.033 for special relativity, MIT 8.962 (Scott Hughes's graduate course) for general relativity, and two free texts throughout: Sean Carroll's Lecture Notes on General Relativity and David Tong's Cambridge notes. Taylor and Wheeler's *Spacetime Physics* and *Exploring Black Holes*, both free from the authors, supply the physical intuition. Modules 1-2 build special relativity to the point of covariant electrodynamics. Module 3 develops the tensor calculus of curved manifolds. Module 4 derives the field equations; module 5 solves them for a star and a black hole; module 6 treats gravitational waves and cosmology; module 7 confronts everything with experiment.

You will derive, not just read. Each module asks you to compute Christoffel symbols and curvature (by hand and with SymPy), integrate geodesics numerically, reproduce Mercury's perihelion advance and the deflection of starlight, and analyse real LIGO strain data. The capstone combines a black-hole geodesic integrator with the reproduction of a classic test.`,
  difficulty: 'expert',
  estimatedHours: 100,
  prerequisites: ['electromagnetism', 'classical-mechanics'],
  recommendedBackground: [
    'Lagrangian mechanics and the action principle (classical-mechanics module 5)',
    'Maxwell\'s equations in differential form (electromagnetism modules 5-6)',
    'Multivariable and vector calculus, linear algebra, ODEs (math-methods)',
    'Python with NumPy, SciPy and SymPy',
  ],
  tags: ['special relativity', 'general relativity', 'tensors', 'black holes', 'gravitational waves', 'cosmology', 'geodesics'],
  core: true,
  modules: [
    {
      slug: 'special-relativity-foundations',
      title: 'Special Relativity Foundations',
      description:
        'The two postulates and the experiments behind them, the relativity of simultaneity, time dilation and length contraction, the Lorentz transformation and the invariant interval, and spacetime diagrams for resolving the paradoxes.',
      lessons: [
        {
          slug: 'postulates-and-the-speed-of-light',
          title: 'The postulates and the invariance of the speed of light',
          summary:
            'Why Galilean relativity and Maxwell\'s equations cannot both be right, the Michelson-Morley experiment, and Einstein\'s two postulates as the resolution.',
          estimatedMinutes: 90,
          objectives: [
            'State the principle of relativity and the Galilean transformation, and show Maxwell\'s wave equation is not Galilean invariant',
            'Analyse the Michelson-Morley experiment and compute the expected ether fringe shift',
            'State Einstein\'s two postulates and explain why the second follows from the first plus Maxwell\'s equations',
            'Describe modern tests of the constancy of $c$ and of Lorentz invariance',
          ],
          concepts: [
            'Inertial frames and the principle of relativity',
            'Galilean transformation and velocity addition',
            'Non-invariance of the wave equation under Galilean boosts',
            'The luminiferous ether',
            'Michelson-Morley interferometer and null result',
            'Einstein\'s postulates',
            'Events, observers and synchronised clocks',
            'Modern tests (Kennedy-Thorndike, Ives-Stilwell, cavity experiments)',
          ],
          explanation: `Newtonian mechanics obeys the **principle of relativity**: the laws are the same in every inertial frame, related by the Galilean transformation $x' = x - vt$, $t' = t$, under which velocities simply add. Maxwell's equations do not. They predict electromagnetic waves travelling at $c = 1/\\sqrt{\\mu_0\\epsilon_0}$, a definite number with no reference to any frame, and the wave equation $\\partial_t^2\\phi = c^2\\nabla^2\\phi$ changes form under a Galilean boost (check this: mixed derivatives appear). Either electromagnetism picks out a preferred frame, the **ether**, or Galilean relativity is wrong.

Michelson and Morley (1887) looked for the ether wind caused by Earth's 30 km/s orbital motion. Light in one arm of their interferometer should take longer than in the perpendicular arm by a fraction $\\sim v^2/c^2 = 10^{-8}$; rotating the apparatus should shift the interference pattern by about 0.4 fringes. They saw less than 0.01. Ad hoc fixes (ether drag, the Lorentz-FitzGerald contraction of the arm) could be made to fit, but each needed a new assumption.

Einstein (1905) took the opposite route: keep both relativity and Maxwell, and change the transformation between frames. His **postulates**: (1) the laws of physics take the same form in all inertial frames; (2) the speed of light in vacuum is $c$ in every inertial frame, independent of the motion of the source. Postulate 2 is really a consequence of 1 applied to Maxwell's equations, but stating it separately makes the logic explicit. The price is the absolute time of Newton: if two observers moving relative to each other both measure the same light pulse travelling at $c$, they cannot agree on which distant events are simultaneous. Everything in the rest of this module is a consequence.

The operational definitions matter. An **event** is a point in space and time. An observer is a lattice of rulers and clocks synchronised by Einstein's procedure (send a light signal out and back; the far clock should read the midpoint time). Measurements are made locally and assembled afterwards. Paradoxes almost always come from forgetting this.

Read Einstein's 1905 paper sections 1-2 (it is short and clear), Taylor and Wheeler chapters 1-3, and the 8.20 lecture on the postulates. Modern tests constrain any variation of $c$ with direction or velocity to parts in $10^{17}$; Will's review (module 7) summarises them.`,
          resources: [
            { ...R.spacetimePhysics, note: 'Chapters 1-3: spacetime, the principle of relativity, and the operational definition of frames.', primary: true },
            {
              title: 'Einstein (1905) — On the Electrodynamics of Moving Bodies (English translation)',
              url: 'https://www.fourmilab.ch/etexts/einstein/specrel/www/',
              type: 'article',
              cost: 'free',
              provider: 'Fourmilab',
              note: 'Read sections 1-4 of Part I: simultaneity, relativity of lengths and times, the transformation.',
            },
            { ...R.mit820, note: 'Lectures 1-2: historical motivation, Michelson-Morley, the postulates.' },
            feynman1(15, 'The Special Theory of Relativity'),
          ],
          exercises: [
            {
              slug: 'wave-equation-galilean',
              title: 'The wave equation is not Galilean invariant',
              prompt:
                'Transform the 1D wave equation $\\partial_t^2\\phi - c^2\\partial_x^2\\phi = 0$ to coordinates $x\' = x - vt$, $t\' = t$ using the chain rule and show the result contains a mixed term $2v\\partial_{x\'}\\partial_{t\'}\\phi$ and a modified spatial coefficient. Find the speed of waves in the primed frame. Then show that the transformation $x\' = \\gamma(x - vt)$, $t\' = \\gamma(t - vx/c^2)$ leaves the equation invariant.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'michelson-morley-calculation',
              title: 'The expected Michelson-Morley fringe shift',
              prompt:
                'For an interferometer with arms of length $L$ moving through the ether at $v$ parallel to one arm, compute the round-trip times in each arm to order $v^2/c^2$ and the time difference. Rotating by 90° doubles the shift. With $L = 11$ m (multiple reflections), $\\lambda = 590$ nm and $v = 30$ km/s, compute the expected fringe shift (about 0.4) and compare with the observed upper bound. Then show that contracting the parallel arm by $\\sqrt{1 - v^2/c^2}$ cancels the effect exactly.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'clock-synchronisation',
              title: 'Einstein synchronisation in practice',
              prompt:
                'Explain Einstein\'s clock-synchronisation procedure and show that it is transitive and symmetric for clocks at rest in one frame. Then show that clocks synchronised in frame S appear unsynchronised in frame S\' moving at $v$: a clock at position $x$ leads (or lags) by $vx/c^2$. Compute the offset for two clocks 1000 km apart on a train at 300 km/h, and for two GPS satellites on opposite sides of Earth as seen from an Earth-centred frame.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What conflict between Newtonian mechanics and electromagnetism did special relativity resolve?',
              answerOutline:
                'Maxwell\'s equations predict a frame-independent wave speed c, which is inconsistent with Galilean velocity addition; either a preferred ether frame exists or the transformation between frames is not Galilean.',
            },
            {
              question: 'What did Michelson and Morley expect and what did they find?',
              answerOutline:
                'A fringe shift of ~0.4 from the ether wind as the apparatus rotated; they found less than 0.01, no detectable ether motion.',
            },
            {
              question: 'Which Newtonian assumption must be given up to keep both postulates?',
              answerOutline:
                'Absolute time and absolute simultaneity; observers in relative motion disagree on which distant events are simultaneous.',
            },
          ],
        },
        {
          slug: 'simultaneity-time-dilation-and-length-contraction',
          title: 'Relativity of simultaneity, time dilation and length contraction',
          summary:
            'Three consequences derived from light clocks and thought experiments, with their experimental confirmations: muon lifetimes, atomic clocks on aircraft, and GPS.',
          estimatedMinutes: 110,
          objectives: [
            'Derive time dilation $\\Delta t = \\gamma\\Delta\\tau$ from a light clock and define proper time',
            'Derive length contraction $L = L_0/\\gamma$ and explain why transverse lengths are unchanged',
            'Show with the train-and-platform thought experiment that simultaneity is frame dependent and compute the offset $\\gamma v\\Delta x/c^2$',
            'Apply these to muon decay, the Hafele-Keating experiment and GPS',
          ],
          concepts: [
            'Lorentz factor $\\gamma = 1/\\sqrt{1 - v^2/c^2}$',
            'Proper time and coordinate time',
            'Light clock argument',
            'Proper length and length contraction',
            'Invariance of transverse lengths',
            'Relativity of simultaneity',
            'Cosmic-ray muons',
            'Hafele-Keating and GPS clock corrections',
          ],
          explanation: `Build a **light clock**: a pulse bouncing between two mirrors a distance $L$ apart, ticking every $2L/c$ in its rest frame. Watch it move sideways at speed $v$. In your frame the pulse travels a diagonal path, longer than $2L$, but still at $c$ (postulate 2), so each tick takes longer: by Pythagoras,
$$\\Delta t = \\frac{\\Delta\\tau}{\\sqrt{1 - v^2/c^2}} = \\gamma\\,\\Delta\\tau .$$
Since any clock (atomic, biological, radioactive) can be compared side by side with a light clock at rest relative to it, all moving clocks run slow by $\\gamma$. The time $\\tau$ read by a clock along its own path is the **proper time**, the one quantity all observers agree on.

**Simultaneity.** A flash at the midpoint of a moving train reaches front and back at the same time in the train frame. On the platform the back is moving toward the flash and the front away, so the back is reached first. Two events simultaneous in one frame, separated by $\\Delta x$, are separated in time by $\\gamma v\\Delta x/c^2$ in another. This is the most counter-intuitive and most important of the three effects; most paradoxes dissolve once you track it.

**Length contraction.** A rod's length is the distance between its ends measured *simultaneously*. Because simultaneity differs between frames, so does length: a rod of proper length $L_0$ moving along its length measures $L = L_0/\\gamma$. Lengths perpendicular to the motion are unchanged (a symmetry argument with two passing hoops shows this). Contraction and dilation are two views of the same fact; in the muon's frame, the atmosphere is contracted; in Earth's frame, the muon's clock runs slow; both give the same number of surviving muons.

The confirmations are routine. Muons produced 15 km up with $\\gamma \\approx 10$ reach the ground despite a 2.2 μs lifetime; storage-ring muons at $\\gamma = 29.3$ live 64 μs, agreeing with $\\gamma\\tau$ to 0.1%. Hafele and Keating (1971) flew caesium clocks around the world and measured shifts of tens of nanoseconds, combining velocity time dilation with the gravitational shift of module 7. GPS satellites at 3.9 km/s lose 7 μs/day from special relativity and gain 45 μs/day from general relativity; without the net 38 μs/day correction, positions would drift by about 10 km per day.

Work through Taylor and Wheeler chapter 4, the OpenStax chapter 5 sections 5.2-5.4 for worked numbers, and Tong's Dynamics and Relativity chapter on special relativity.`,
          resources: [
            { ...R.spacetimePhysics, note: 'Chapters 4-5: time dilation, length contraction, simultaneity; many exercises with answers.', primary: true },
            { ...R.openstax3, note: 'Sections 5.2-5.4 with worked examples on muons and GPS.' },
            { ...R.tongDR, note: 'Chapter 7 (Special relativity), sections 7.1-7.2.' },
            feynman1(15, 'The Special Theory of Relativity'),
          ],
          exercises: [
            {
              slug: 'light-clock-derivation',
              title: 'Light clocks and the transverse-length argument',
              prompt:
                'Derive $\\Delta t = \\gamma\\Delta\\tau$ from the light clock. Then prove, using two hoops of equal rest radius passing through each other, that lengths perpendicular to the motion cannot change (otherwise one hoop would pass inside the other in a frame-dependent way). Finally derive length contraction from time dilation by considering a rod and a clock moving past each other in both frames.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'muon-survival',
              title: 'Cosmic-ray muon survival',
              prompt:
                'Muons are produced at 15 km altitude with speed $0.995c$ and proper lifetime 2.20 μs. Compute the fraction reaching sea level (a) naively without relativity, (b) with time dilation in the Earth frame, (c) with length contraction in the muon frame, and show (b) and (c) agree. Plot the survival fraction versus $\\gamma$ for production altitude 15 km. Compare with the classic Frisch-Smith (1963) measurement: of 568 muons per hour at 1910 m, 412 per hour reached sea level.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gps-budget',
              title: 'The GPS relativity budget',
              prompt:
                'GPS satellites orbit at radius 26,560 km. Compute their orbital speed and the special-relativistic clock rate change per day relative to a clock at rest at the Earth\'s centre (−7.2 μs/day). Using the weak-field gravitational result $\\Delta\\tau/\\tau = \\Delta\\Phi/c^2$ (derived in module 4), compute the gravitational rate change relative to the geoid (+45.7 μs/day). Combine, include Earth\'s rotation for a ground receiver at the equator, and compute the ranging error per day if uncorrected.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is proper time and why do all observers agree on it?',
              answerOutline:
                'The time read by a clock along its own worldline; it equals the invariant interval along that worldline, which is the same in all inertial frames.',
            },
            {
              question: 'Explain how the muon experiment is described in the muon\'s own frame.',
              answerOutline:
                'The muon lives its proper 2.2 μs; the atmosphere is moving and contracted by γ, so the distance to the ground is short enough to cover in that time.',
            },
            {
              question: 'Why is length contraction a consequence of the relativity of simultaneity?',
              answerOutline:
                'Measuring a moving rod\'s length requires locating both ends at the same time; frames disagree about which events are simultaneous, hence about the length.',
            },
          ],
        },
        {
          slug: 'lorentz-transformation-and-the-interval',
          title: 'The Lorentz transformation and the invariant interval',
          summary:
            'Derive the Lorentz transformation from the postulates, show it preserves the spacetime interval, add velocities relativistically, and recognise boosts as hyperbolic rotations with rapidity.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the Lorentz transformation from linearity, isotropy and the invariance of $c$',
            'Show that $\\Delta s^2 = -c^2\\Delta t^2 + \\Delta x^2 + \\Delta y^2 + \\Delta z^2$ is invariant and classify intervals as timelike, spacelike or null',
            'Derive the relativistic velocity addition formula and the transformation of velocities transverse to the boost',
            'Introduce rapidity and show that collinear boosts add rapidities',
          ],
          concepts: [
            'Lorentz transformation and boosts',
            'Invariant interval and the light cone',
            'Timelike, spacelike and null separations',
            'Causality and the invariance of time ordering for timelike separations',
            'Velocity addition $u\' = (u - v)/(1 - uv/c^2)$',
            'Rapidity $\\phi$ with $v = c\\tanh\\phi$',
            'Boosts as hyperbolic rotations',
            'Lorentz group (preview)',
          ],
          explanation: `The transformation between inertial frames must be linear (a free particle moves in a straight line in both frames), must reduce to Galileo for $v \\ll c$, and must map a light ray $x = ct$ to a light ray $x' = ct'$. The unique answer for a boost along $x$ is the **Lorentz transformation**
$$ct' = \\gamma(ct - \\beta x),\\qquad x' = \\gamma(x - \\beta ct),\\qquad y' = y,\\qquad z' = z,$$
with $\\beta = v/c$ and $\\gamma = (1 - \\beta^2)^{-1/2}$. Time dilation, length contraction and the simultaneity offset are all special cases; derive each from this formula as a check.

The key invariant is the **spacetime interval** between two events,
$$\\Delta s^2 = -c^2\\Delta t^2 + \\Delta x^2 + \\Delta y^2 + \\Delta z^2 ,$$
which takes the same value in every inertial frame, just as distance is unchanged by rotations. (Sign conventions vary; this "mostly plus" one matches Carroll and MIT 8.962.) Its sign classifies separations. **Timelike** ($\\Delta s^2 < 0$): one event can influence the other, there is a frame where they happen at the same place, and $\\sqrt{-\\Delta s^2}/c$ is the proper time between them; all observers agree on their time order. **Spacelike** ($\\Delta s^2 > 0$): no signal can connect them, there is a frame where they are simultaneous, and different observers can disagree on their order, which is harmless because neither can cause the other. **Null** ($\\Delta s^2 = 0$): connected by a light ray. The set of null directions from an event is its **light cone**, the causal structure of spacetime.

Composing two boosts gives the velocity addition law $u = (u' + v)/(1 + u'v/c^2)$, which never exceeds $c$. It looks awkward because velocity is not the natural parameter. Define the **rapidity** $\\phi$ by $\\beta = \\tanh\\phi$, so $\\gamma = \\cosh\\phi$ and $\\gamma\\beta = \\sinh\\phi$; the boost becomes
$$\\begin{pmatrix}ct'\\\\x'\\end{pmatrix} = \\begin{pmatrix}\\cosh\\phi & -\\sinh\\phi\\\\-\\sinh\\phi & \\cosh\\phi\\end{pmatrix}\\begin{pmatrix}ct\\\\x\\end{pmatrix},$$
a hyperbolic rotation, and collinear rapidities simply add. A rocket with constant proper acceleration $a$ has rapidity $a\\tau/c$, which is the cleanest route to the relativistic rocket problems.

Read Taylor and Wheeler chapters 3 and L (the Lorentz transformation appendix), Tong 7.1-7.2 and 8.20 lectures 3-4. The exercises make you derive the transformation yourself and use it as a calculating tool.`,
          resources: [
            { ...R.tongDR, note: 'Chapter 7, sections 7.1-7.3: Lorentz transformations, the interval, rapidity.', primary: true },
            { ...R.spacetimePhysics, note: 'Chapters 3 and 6 plus the special topic on the Lorentz transformation.' },
            { ...R.mit820, note: 'Lectures 3-5: Lorentz transformations, interval, velocity addition.' },
            { ...R.susskindSR, note: 'Lectures 1-2 derive the transformation and the interval.' },
          ],
          exercises: [
            {
              slug: 'derive-lorentz',
              title: 'Derive the Lorentz transformation',
              prompt:
                'Assume $x\' = A x + B t$, $t\' = C x + D t$. Impose: (i) the origin of S\' moves at $v$ in S; (ii) by symmetry the origin of S moves at $-v$ in S\'; (iii) a light ray $x = ct$ maps to $x\' = ct\'$; (iv) the inverse transformation has the same form with $v \\to -v$. Derive $A, B, C, D$. Then prove the interval is invariant by direct substitution, and show that the Lorentz matrices form a group under composition.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'causality-and-order',
              title: 'Causal order and the light cone',
              prompt:
                'Two events have $(\\Delta t, \\Delta x) = (2\\ \\mathrm{s}, 3\\times10^8\\ \\mathrm{m})$ and another pair $(1\\ \\mathrm{s}, 6\\times10^8\\ \\mathrm{m})$. Classify each pair, find the frame in which the first pair occur at the same place (and the proper time between them) and the frame in which the second pair are simultaneous. Show that for the second pair there exist frames with either time order, and prove generally that a signal faster than light would allow a reply to arrive before the message was sent in some frame.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'relativistic-rocket',
              title: 'The relativistic rocket',
              prompt:
                'A rocket has constant proper acceleration $g = 9.8$ m/s². Using rapidity $\\phi = g\\tau/c$, derive $t(\\tau) = (c/g)\\sinh(g\\tau/c)$, $x(\\tau) = (c^2/g)(\\cosh(g\\tau/c) - 1)$. Numerically integrate the equations of motion in the launch frame as a check. How much proper time does it take to reach the Galactic centre (8 kpc), accelerating halfway and decelerating halfway? Plot the worldline on a spacetime diagram and show the "Rindler horizon": light emitted more than $c^2/g$ behind the rocket never catches it.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the Lorentz transformation be linear?',
              answerOutline:
                'Inertial motion (straight worldlines) must map to inertial motion and spacetime is homogeneous; only linear maps preserve straight lines and uniform structure.',
            },
            {
              question: 'What does it mean for an interval to be spacelike, and what can observers disagree on?',
              answerOutline:
                'Δs² > 0: no causal signal connects the events; observers can disagree on their time order (and one frame sees them simultaneous) without paradox.',
            },
            {
              question: 'Why is rapidity more natural than velocity?',
              answerOutline:
                'Boosts are hyperbolic rotations by the rapidity; collinear boosts add rapidities linearly, and constant proper acceleration means rapidity linear in proper time.',
            },
          ],
        },
        {
          slug: 'spacetime-diagrams-and-paradoxes',
          title: 'Spacetime diagrams, the twin paradox and other puzzles',
          summary:
            'Minkowski diagrams as a calculating tool: tilted axes, calibration hyperbolae, worldlines and proper time; resolve the twin, barn-and-pole and Bell spaceship paradoxes, and compute relativistic Doppler shifts.',
          estimatedMinutes: 110,
          objectives: [
            'Draw spacetime diagrams for two frames with correctly tilted and calibrated axes',
            'Show that the straight worldline between two events has the maximum proper time and resolve the twin paradox',
            'Resolve the barn-and-pole and Bell spaceship paradoxes using simultaneity',
            'Derive the longitudinal and transverse Doppler formulas and apply them to astronomical redshifts',
          ],
          concepts: [
            'Minkowski spacetime diagrams',
            'Tilted axes and calibration hyperbolae',
            'Worldlines and proper time as length',
            'Twin paradox: maximal proper time on straight worldlines',
            'Barn-and-pole paradox',
            'Bell\'s spaceship paradox and rigidity',
            'Relativistic Doppler effect $\\sqrt{(1+\\beta)/(1-\\beta)}$',
            'Transverse Doppler shift and Ives-Stilwell',
          ],
          explanation: `A **spacetime diagram** plots $ct$ upward and $x$ sideways, so light rays are at 45°. A particle's history is a **worldline**, steeper than 45° if it is slower than light. The axes of a frame moving at $\\beta$ are tilted symmetrically toward the light line: the $ct'$ axis has slope $1/\\beta$, the $x'$ axis slope $\\beta$. Lines parallel to the $x'$ axis are that frame's lines of simultaneity, which makes the relativity of simultaneity visible at a glance. Units on the tilted axes are stretched; the **calibration hyperbolae** $-c^2t^2 + x^2 = \\pm1$ (invariant!) mark unit distance on all axes. With these two rules, most problems in special relativity can be solved geometrically.

The proper time along a worldline is $\\tau = \\int\\sqrt{1 - v^2/c^2}\\,dt$, the "length" of the worldline in the Minkowski metric. Because of the minus sign, a **straight** (inertial) worldline between two events has the *maximum* proper time, the opposite of Euclidean geometry, where the straight line is shortest. That is the resolution of the **twin paradox**: the travelling twin's worldline is bent at the turnaround, so it is shorter in proper time, and the twins are not symmetric because only one changes inertial frames. Draw the lines of simultaneity before and after the turnaround: the travelling twin's notion of "now" at home jumps forward at the turnaround, which accounts for all the missing time. This principle, extremal proper time, becomes the geodesic equation of general relativity.

Two more puzzles train the same muscle. **Barn and pole**: a 20 m pole moving at $\\gamma = 2$ fits in a 10 m barn in the barn frame, but in the pole frame the barn is 5 m. Both are correct; the "doors closed simultaneously" events are simultaneous only in the barn frame. **Bell's spaceships**: two ships accelerating identically in the launch frame keep a constant separation in that frame, so in their own instantaneous frames they drift apart and a string between them breaks. Rigid bodies cannot exist in relativity.

The **Doppler effect** combines time dilation with the changing light-travel time: a source receding at $\\beta$ is observed at frequency $\\nu = \\nu_0\\sqrt{(1 - \\beta)/(1 + \\beta)}$; at right angles there is still a purely relativistic redshift by $1/\\gamma$ (the transverse Doppler effect, measured by Ives and Stilwell in 1938 and now to parts per billion with storage-ring ions).

Read Taylor and Wheeler chapters 5-6 and the twin-paradox discussion, and MIT 8.033 problem sets on paradoxes. The exercises are best done by drawing first and calculating second.`,
          resources: [
            { ...R.spacetimePhysics, note: 'Chapters 5-6 and the twin-paradox and pole-in-barn exercises.', primary: true },
            { ...R.mit8033, note: 'Lecture notes and problem sets 1-3 on spacetime diagrams, paradoxes and Doppler.' },
            feynman1(16, 'Relativistic Energy and Momentum'),
            { ...R.einsteinOnline, note: 'Search "twin paradox" for a careful visual treatment.' },
          ],
          exercises: [
            {
              slug: 'twin-paradox-diagram',
              title: 'Twin paradox on a spacetime diagram',
              prompt:
                'One twin travels to a star 4 light-years away at $0.8c$ and returns. Draw the spacetime diagram with lines of simultaneity for the outbound and return frames. Compute each twin\'s elapsed proper time (10 and 6 years). Then have both twins send a light signal to the other every year of their own proper time; count the signals each receives, and show the counts are consistent with the elapsed times using the Doppler factor. Finally, replace the instantaneous turnaround with a smooth deceleration and integrate $d\\tau$ numerically.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'spacetime-diagram-tool',
              title: 'A spacetime diagram plotter',
              prompt:
                'Write a Python tool that draws a spacetime diagram for frame S, overlays the axes and calibration hyperbolae of a frame moving at a given $\\beta$, and plots arbitrary worldlines given as parametric functions, with proper-time ticks marked along each. Use it to illustrate the barn-and-pole paradox (both door events, both pole ends) and Bell\'s spaceships (worldlines of both ships and their instantaneous lines of simultaneity).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'doppler-derivation',
              title: 'Relativistic Doppler: derivation and astronomical use',
              prompt:
                'Derive the longitudinal Doppler formula by counting wave crests, then the general formula $\\nu = \\nu_0/[\\gamma(1 - \\beta\\cos\\theta)]$ for a source moving at angle $\\theta$ to the line of sight in the observer frame. Show the transverse case gives $\\nu_0/\\gamma$. For a quasar with Lyman-α observed at 486.0 nm (rest 121.6 nm), compute $z$ and the velocity that would be implied by a pure special-relativistic Doppler interpretation, and explain why cosmological redshift (module 6) is the correct interpretation.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the travelling twin age less, and why is the situation not symmetric?',
              answerOutline:
                'The bent worldline has less proper time than the straight inertial one between the same events; only the traveller changes inertial frames (feels acceleration), so the twins are not equivalent.',
            },
            {
              question: 'How are lines of simultaneity of a moving frame drawn on a spacetime diagram?',
              answerOutline:
                'Parallel to its x′ axis, which is tilted toward the light line with slope β (mirror image of the ct′ axis about the 45° line).',
            },
            {
              question: 'What is the transverse Doppler effect and what does it test?',
              answerOutline:
                'A redshift by 1/γ for a source moving perpendicular to the line of sight (in the observer frame); it is pure time dilation, with no classical counterpart.',
            },
          ],
        },
      ],
    },
    {
      slug: 'relativistic-mechanics-and-four-vectors',
      title: 'Relativistic Mechanics and Four-Vectors',
      description:
        'Four-vectors and the Minkowski metric, energy-momentum and $E = mc^2$, collisions and particle physics kinematics, covariant electrodynamics, and the stress-energy tensor that will source gravity.',
      lessons: [
        {
          slug: 'four-vectors-and-the-minkowski-metric',
          title: 'Four-vectors and the Minkowski metric',
          summary:
            'Index notation, the metric $\\eta_{\\mu\\nu}$, raising and lowering indices, four-velocity and four-acceleration, and why writing physics in four-vector form makes Lorentz invariance automatic.',
          estimatedMinutes: 110,
          objectives: [
            'Use index notation with the Einstein summation convention and the metric $\\eta_{\\mu\\nu} = \\mathrm{diag}(-1, 1, 1, 1)$',
            'Distinguish contravariant and covariant components and raise and lower indices',
            'Define four-velocity $U^\\mu = dx^\\mu/d\\tau$ and show $U^\\mu U_\\mu = -c^2$',
            'Show that equations written as relations between four-vectors are automatically valid in all inertial frames',
          ],
          concepts: [
            'Four-position $x^\\mu = (ct, x, y, z)$',
            'Minkowski metric $\\eta_{\\mu\\nu}$ and the interval $ds^2 = \\eta_{\\mu\\nu}dx^\\mu dx^\\nu$',
            'Lorentz transformation matrix $\\Lambda^\\mu{}_\\nu$',
            'Contravariant and covariant vectors; index raising and lowering',
            'Scalar product and Lorentz invariants',
            'Four-velocity and its normalisation',
            'Four-acceleration, orthogonal to four-velocity',
            'Manifest covariance',
          ],
          explanation: `Spacetime events have coordinates $x^\\mu = (x^0, x^1, x^2, x^3) = (ct, x, y, z)$ with Greek indices running 0-3. The interval is $ds^2 = \\eta_{\\mu\\nu}dx^\\mu dx^\\nu$ with the **Minkowski metric** $\\eta_{\\mu\\nu} = \\mathrm{diag}(-1, 1, 1, 1)$, using Einstein's convention that a repeated upper-lower index is summed. A Lorentz transformation is a matrix $\\Lambda^\\mu{}_\\nu$ with $x'^\\mu = \\Lambda^\\mu{}_\\nu x^\\nu$ that preserves the metric: $\\Lambda^\\mu{}_\\alpha\\Lambda^\\nu{}_\\beta\\eta_{\\mu\\nu} = \\eta_{\\alpha\\beta}$. A **four-vector** is any set of four quantities that transforms like $dx^\\mu$.

The metric turns vectors into dual vectors: $A_\\mu = \\eta_{\\mu\\nu}A^\\nu = (-A^0, A^1, A^2, A^3)$, and the inverse $\\eta^{\\mu\\nu}$ raises indices back. Upper-index (**contravariant**) and lower-index (**covariant**) components are two descriptions of the same object; the distinction looks pedantic in flat spacetime with Cartesian coordinates but becomes essential in module 3. The scalar product $A\\cdot B = \\eta_{\\mu\\nu}A^\\mu B^\\nu = A_\\mu B^\\mu = -A^0B^0 + \\mathbf A\\cdot\\mathbf B$ is **Lorentz invariant**: every observer computes the same number.

The **four-velocity** of a particle is $U^\\mu = dx^\\mu/d\\tau = \\gamma(c, \\mathbf v)$, differentiating with respect to the invariant proper time. Its norm is fixed: $U^\\mu U_\\mu = -c^2$, for every particle in every frame. Differentiating that identity shows the **four-acceleration** $A^\\mu = dU^\\mu/d\\tau$ is always orthogonal to $U^\\mu$ (spacelike), and in the instantaneous rest frame it is $(0, \\mathbf a)$, so $A^\\mu A_\\mu = a^2$ is the proper acceleration that an onboard accelerometer reads.

The point of all this is **manifest covariance**. If a law of physics is written as an equation between four-vectors (or tensors, next lesson), both sides transform the same way, so if it holds in one inertial frame it holds in all. Relativity then becomes a *grammar* constraint on possible laws: every term must carry the same free indices. You will see that Newton's $\\mathbf F = m\\mathbf a$ does not satisfy it, and that Maxwell's equations do once written properly. In general relativity, the same grammar with $\\eta_{\\mu\\nu}$ replaced by a general metric $g_{\\mu\\nu}(x)$ produces the whole theory.

Read Carroll chapter 1 (sections 1.1-1.5) and Tong Dynamics and Relativity 7.3-7.4. Get fluent with the index gymnastics now; the exercises force it.`,
          resources: [
            { ...R.carroll, note: 'Chapter 1, sections 1.1-1.5: special relativity in index notation; the PDF is the whole notes.', primary: true },
            { ...R.tongDR, note: 'Chapter 7, sections 7.3-7.4: four-vectors and relativistic kinematics.' },
            { ...R.mit8962, note: 'Lectures 1-2: special relativity in geometric language.' },
            { ...R.carrollBook, note: 'Chapter 1 of the book expands the notes. Free alternative: the arXiv notes above.' },
          ],
          exercises: [
            {
              slug: 'index-gymnastics',
              title: 'Index gymnastics',
              prompt:
                'Show that (a) $\\eta^{\\mu\\alpha}\\eta_{\\alpha\\nu} = \\delta^\\mu_\\nu$; (b) a boost matrix along $x$ satisfies $\\Lambda^T\\eta\\Lambda = \\eta$; (c) $A_\\mu B^\\mu$ is invariant under any $\\Lambda$ satisfying (b); (d) the transformation of covariant components is given by the inverse transpose. Write the boost matrix along an arbitrary direction $\\hat{\\mathbf n}$ and verify (b) symbolically with SymPy. Compute $\\Lambda$ for two successive non-collinear boosts and show it is not a pure boost (the Wigner rotation).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'four-velocity-four-acceleration',
              title: 'Four-velocity and proper acceleration',
              prompt:
                'Compute $U^\\mu$ and $A^\\mu$ for (a) uniform circular motion at speed $v$ and radius $r$, and (b) hyperbolic motion with constant proper acceleration. Verify $U\\cdot U = -c^2$ and $U\\cdot A = 0$ in each case, and compute the proper acceleration $\\sqrt{A\\cdot A}$. Show that for circular motion it is $\\gamma^2v^2/r$. Evaluate for an electron in a storage ring at 3 GeV and 100 m radius.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'covariance-test',
              title: 'Which laws are Lorentz covariant?',
              prompt:
                'Decide which of the following can hold in all inertial frames, by checking index structure and transformation properties: $F^\\mu = m\\,dU^\\mu/d\\tau$; $\\mathbf F = m\\mathbf a$; $\\partial_\\mu J^\\mu = 0$; $\\nabla\\cdot\\mathbf E = \\rho/\\epsilon_0$ alone; the wave equation $\\Box\\phi = 0$ with $\\Box = \\eta^{\\mu\\nu}\\partial_\\mu\\partial_\\nu$; Newton\'s law of gravitation $\\nabla^2\\Phi = 4\\pi G\\rho$. For the last, explain in a paragraph why it cannot be correct and what a covariant replacement would need (preview of module 4).',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is U^μU_μ = −c² for every massive particle?',
              answerOutline:
                'U^μ = dx^μ/dτ and dτ² = −ds²/c²; dividing ds² = η dx dx by dτ² gives −c², in any frame.',
            },
            {
              question: 'What is the difference between A^μ and A_μ?',
              answerOutline:
                'Contravariant and covariant components of the same vector, related by the metric (A_μ = η_μν A^ν); in Minkowski space with this signature the time component flips sign.',
            },
            {
              question: 'Why does writing equations in four-vector form guarantee Lorentz covariance?',
              answerOutline:
                'Both sides transform with the same Λ matrices, so if the equation holds in one frame it holds in every frame related by a Lorentz transformation.',
            },
          ],
        },
        {
          slug: 'energy-momentum-and-e-equals-mc2',
          title: 'Energy, momentum and $E = mc^2$',
          summary:
            'The four-momentum, relativistic energy and momentum, the energy-momentum relation, massless particles, and the meaning and evidence for mass-energy equivalence.',
          estimatedMinutes: 110,
          objectives: [
            'Define $p^\\mu = mU^\\mu = (E/c, \\mathbf p)$ and derive $E = \\gamma mc^2$, $\\mathbf p = \\gamma m\\mathbf v$',
            'Derive $E^2 = p^2c^2 + m^2c^4$ from $p^\\mu p_\\mu = -m^2c^2$ and apply it to massless particles',
            'Explain mass-energy equivalence with Einstein\'s photon-box argument and nuclear binding energies',
            'Write the relativistic force law and solve for a charge in a uniform electric field',
          ],
          concepts: [
            'Four-momentum $p^\\mu$',
            'Relativistic energy $\\gamma mc^2$ and kinetic energy $(\\gamma - 1)mc^2$',
            'Relativistic momentum $\\gamma m\\mathbf v$',
            'Invariant mass and $E^2 = p^2c^2 + m^2c^4$',
            'Massless particles $E = pc$',
            'Rest energy and binding energy',
            'Conservation of four-momentum',
            'Relativistic force and motion in a constant field',
          ],
          explanation: `Multiply the four-velocity by the (invariant) mass to get the **four-momentum**
$$p^\\mu = mU^\\mu = (\\gamma mc, \\gamma m\\mathbf v) \\equiv (E/c, \\mathbf p).$$
In the low-speed limit $\\gamma mc^2 \\approx mc^2 + \\frac{1}{2}mv^2$, so the time component is the energy, including a **rest energy** $mc^2$ that Newtonian physics never saw, and the space components are the momentum, with $\\gamma$ making it grow without bound as $v \\to c$. The norm gives the **energy-momentum relation**
$$p^\\mu p_\\mu = -m^2c^2 \\quad\\Longleftrightarrow\\quad E^2 = p^2c^2 + m^2c^4 ,$$
which is the single most used formula in particle physics. For $m = 0$, $E = pc$ and the particle moves at $c$: photons and (to excellent approximation) neutrinos. Note that $m$ here is the invariant mass; the old "relativistic mass" $\\gamma m$ is best forgotten because it misleads about what is frame independent.

The conservation laws combine: in any interaction the total four-momentum is conserved, which packs energy and momentum conservation into one statement that is valid in all frames because four-vectors add. Kinetic energy is not separately conserved; in an inelastic collision kinetic energy becomes rest energy, and the composite object's invariant mass exceeds the sum of the parts. That is what $E = mc^2$ *means*: mass is the energy content of a body in its rest frame. Einstein's 1905 argument considered a body emitting two light pulses in opposite directions; viewing it from a moving frame shows its mass must drop by $E/c^2$. The evidence is everywhere: the deuteron weighs 2.2 MeV/$c^2$ less than a proton plus neutron, the Sun converts 4 million tonnes of mass to radiation per second, and the 2005 test by Rainville et al. confirmed $E = mc^2$ to 4 parts in $10^7$ by comparing gamma-ray energies with atomic mass differences.

Forces: $F^\\mu = dp^\\mu/d\\tau$, whose spatial part gives $d\\mathbf p/dt = \\mathbf F$ with relativistic momentum. For a charge in a uniform field $E$ starting at rest, $p = qEt$ grows linearly and $v = c\\,qEt/\\sqrt{m^2c^2 + q^2E^2t^2} \\to c$: the speed limit emerges automatically. The worldline is the hyperbola of constant proper acceleration from module 1.

Read Taylor and Wheeler chapters 7-8, Feynman I-16 and Tong 7.4. The exercises are standard numerical problems that build fluency.`,
          resources: [
            { ...R.spacetimePhysics, note: 'Chapters 7-8: momenergy, its conservation, and many solved collision problems.', primary: true },
            feynman1(16, 'Relativistic Energy and Momentum'),
            { ...R.tongDR, note: 'Chapter 7.4: relativistic dynamics.' },
            { ...R.openstax3, note: 'Sections 5.8-5.9 on relativistic momentum and energy with numerical examples.' },
          ],
          exercises: [
            {
              slug: 'energy-momentum-derivations',
              title: 'Energy-momentum relations',
              prompt:
                'From $p^\\mu = mU^\\mu$ derive $E = \\gamma mc^2$, $\\mathbf p = \\gamma m\\mathbf v$, $\\mathbf v = \\mathbf pc^2/E$ and $E^2 = p^2c^2 + m^2c^4$. Show that the kinetic energy reduces to $\\frac{1}{2}mv^2 + \\frac{3}{8}mv^4/c^2 + \\dots$ and evaluate the correction for an electron in a hydrogen atom ($v = \\alpha c$) relative to its kinetic energy (it is the origin of the fine-structure $p^4$ term). Compute $\\gamma$, $\\beta$ and $p$ for a 7 TeV LHC proton and a 50 GeV electron.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'binding-energy-masses',
              title: 'Mass defects and binding energies',
              prompt:
                'Using atomic masses (from NIST or the AME tables): compute the binding energy of the deuteron, of $^4$He, of $^{56}$Fe and of $^{238}$U, and the binding energy per nucleon; plot B/A versus A for a dozen nuclei. Compute the energy released in D + T → $^4$He + n and in the fission of $^{235}$U into $^{141}$Ba + $^{92}$Kr + 3n. Express each as a fraction of the initial rest energy.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'charge-in-uniform-field',
              title: 'A charge in a uniform electric field',
              prompt:
                'Solve $d\\mathbf p/dt = q\\mathbf E$ for a particle starting at rest, obtaining $x(t)$ and showing the worldline is a hyperbola. Then integrate numerically for an electron in a field with a perpendicular initial velocity and show the transverse velocity decreases as the longitudinal speed grows (momentum is conserved transversely, but $\\gamma$ rises). Compute the length of a linear accelerator needed to bring electrons to 50 GeV with a 20 MV/m gradient (SLAC), and the time in the lab and in the electron frame.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is invariant mass and how is it computed for a system of particles?',
              answerOutline:
                'm²c² = −P^μP_μ with P the total four-momentum; it equals the total energy in the zero-momentum frame divided by c², and it is generally larger than the sum of the rest masses.',
            },
            {
              question: 'Why can no massive particle reach c?',
              answerOutline:
                'E = γmc² diverges as v → c; finite energy input gives v < c. Equivalently, the four-velocity must remain timelike.',
            },
            {
              question: 'Is kinetic energy conserved in relativistic collisions?',
              answerOutline:
                'Only in elastic collisions; in general total energy (including rest energy) and momentum are conserved, and kinetic energy can convert to or from rest mass.',
            },
          ],
        },
        {
          slug: 'collisions-decays-and-particle-kinematics',
          title: 'Collisions, decays and particle-physics kinematics',
          summary:
            'Four-momentum conservation as a problem-solving method: decays, thresholds for particle production, Compton scattering, the centre-of-momentum frame, and invariant-mass reconstruction from detector data.',
          estimatedMinutes: 110,
          objectives: [
            'Solve two-body decays in the rest frame using invariants',
            'Compute threshold energies for particle production in fixed-target and colliding-beam experiments',
            'Use Mandelstam-style invariants and the centre-of-momentum frame to simplify collision problems',
            'Reconstruct an invariant mass from measured momenta and identify a resonance in data',
          ],
          concepts: [
            'Four-momentum conservation',
            'Invariant mass $s = -(p_1 + p_2)^2c^2$',
            'Centre-of-momentum frame',
            'Two-body decay kinematics',
            'Production thresholds: fixed target vs collider',
            'Compton scattering by four-vectors',
            'Mandelstam variables $s, t, u$',
            'Invariant-mass reconstruction and resonances',
          ],
          explanation: `The technique that solves most relativistic kinematics problems in a few lines: write four-momentum conservation, isolate the four-momentum you don't care about, and square it, using $p^2 = -m^2c^2$ for every particle. Squares are invariants, so you can evaluate each one in whichever frame is most convenient.

**Two-body decay.** A particle of mass $M$ at rest decays to $m_1$ and $m_2$. Write $P = p_1 + p_2$, so $p_2 = P - p_1$; squaring gives $m_2^2c^2 = M^2c^2 + m_1^2c^2 - 2P\\cdot p_1\\cdot(-1)$..., which in the rest frame yields
$$E_1 = \\frac{(M^2 + m_1^2 - m_2^2)c^2}{2M}.$$
The energies are fixed: a two-body decay produces monoenergetic products. When beta decay was found to give a continuous electron spectrum, Pauli concluded that a third, invisible particle was carrying energy away: the neutrino.

**Thresholds.** To produce final particles of total mass $\\sum m_f$ the invariant $s = -(\\sum p_i)^2c^2$ must be at least $(\\sum m_f)^2c^4$, because in the centre-of-momentum frame the final particles can at best be produced at rest. For a beam of energy $E$ on a fixed target of mass $m_t$, $s = m_b^2c^4 + m_t^2c^4 + 2Em_tc^2$, which grows only linearly with $E$; for colliding beams of energy $E$ each, $s = 4E^2$. This is why modern machines are colliders: the antiproton threshold on a fixed proton target is 5.6 GeV of beam kinetic energy, while in the centre-of-momentum frame only 1.9 GeV of total energy is needed. Compton scattering from quantum-mechanics module 1 is a three-line exercise in this method.

**Reconstruction.** Detectors measure the momenta (and identities) of final particles; the invariant mass $M^2c^4 = (\\sum E)^2 - |\\sum\\mathbf pc|^2$ of a chosen set is frame independent and peaks at the mass of the parent if they came from a decay. Every discovery from the $J/\\psi$ to the $Z$ to the Higgs boson (the 125 GeV peak in the two-photon and four-lepton spectra) was a bump in an invariant-mass histogram. The exercise uses CERN open data to find one yourself.

Read Taylor and Wheeler chapter 8 and the collision exercises, 8.033 problem sets on kinematics, and the CERN Open Data portal tutorial for the dimuon spectrum.`,
          resources: [
            { ...R.spacetimePhysics, note: 'Chapter 8 and the exercises on collisions, thresholds and decays.', primary: true },
            { ...R.mit8033, note: 'Problem sets on relativistic kinematics and collisions.' },
            {
              title: 'CERN Open Data Portal',
              url: 'https://opendata.cern.ch/',
              type: 'dataset',
              cost: 'free',
              provider: 'CERN',
              note: 'Search for the CMS dimuon datasets and educational examples for the invariant-mass exercise.',
            },
          ],
          exercises: [
            {
              slug: 'decay-and-threshold-problems',
              title: 'Decays and thresholds',
              prompt:
                'Using the squaring technique: (a) find the muon and neutrino energies in $\\pi^+ \\to \\mu^+\\nu$ at rest (the muon kinetic energy is 4.1 MeV); (b) find the minimum beam energy for $p + p \\to p + p + p + \\bar p$ on a fixed target (6.6 GeV total); (c) the threshold photon energy for $\\gamma + p \\to p + \\pi^0$; (d) the GZK threshold for cosmic-ray protons on CMB photons ($p + \\gamma \\to \\Delta^+$) with a typical photon energy of $6\\times10^{-4}$ eV; (e) derive the Compton formula with four-vectors in three lines.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'dimuon-invariant-mass',
              title: 'Find resonances in real dimuon data',
              prompt:
                'Download a CMS dimuon dataset from the CERN Open Data Portal (a CSV with the four-momenta or $p_T, \\eta, \\phi$ of muon pairs). Compute the invariant mass of each pair, histogram on a logarithmic mass axis from 1 to 120 GeV, and identify the $J/\\psi$, $\\psi(2S)$, $\\Upsilon$ states and the $Z$ boson. Fit the $Z$ peak with a Breit-Wigner convolved with a Gaussian resolution and report its mass and width.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'With p_T, η, φ: p_x = p_T cos φ, p_y = p_T sin φ, p_z = p_T sinh η, and E² = p² + m_μ².',
            },
            {
              slug: 'elastic-scattering-angles',
              title: 'Relativistic elastic scattering',
              prompt:
                'A particle of mass $m$ and energy $E$ scatters elastically off an identical particle at rest. Show that the angle between the outgoing particles is less than 90° (it is exactly 90° only non-relativistically), derive the relation for the opening angle in terms of the energies, and plot it versus the incident kinetic energy for protons. Explain why bubble-chamber photographs of high-energy p-p scattering show narrow opening angles.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are modern high-energy machines colliders rather than fixed-target experiments?',
              answerOutline:
                'For a fixed target s ≈ 2Em_tc² grows linearly with beam energy; for colliding beams s = 4E² grows quadratically, so much more energy is available for particle production.',
            },
            {
              question: 'Why does a two-body decay at rest produce particles of definite energy?',
              answerOutline:
                'Four-momentum conservation with two final particles fixes both energies in terms of the three masses; a continuous spectrum signals at least three final particles.',
            },
            {
              question: 'What is invariant-mass reconstruction and why is it frame independent?',
              answerOutline:
                'Computing M² = (ΣE)² − |Σp c|² for a set of final particles; it is the squared norm of a four-vector, so every frame gives the same value, which peaks at the parent mass.',
            },
          ],
        },
        {
          slug: 'covariant-electrodynamics',
          title: 'Covariant electrodynamics and the field tensor',
          summary:
            'Maxwell\'s equations in four-vector form: the four-current and four-potential, the field-strength tensor $F^{\\mu\\nu}$, the transformation of $\\mathbf E$ and $\\mathbf B$, the Lorentz force, and the invariants of the field.',
          estimatedMinutes: 120,
          objectives: [
            'Combine charge and current into $J^\\mu$ and write charge conservation as $\\partial_\\mu J^\\mu = 0$',
            'Construct $F_{\\mu\\nu} = \\partial_\\mu A_\\nu - \\partial_\\nu A_\\mu$ and write Maxwell\'s equations as $\\partial_\\mu F^{\\mu\\nu} = -\\mu_0J^\\nu$ (sign per convention) and $\\partial_{[\\lambda}F_{\\mu\\nu]} = 0$',
            'Derive the transformation laws of $\\mathbf E$ and $\\mathbf B$ under boosts and show the magnetic field of a current is the electric field of moving charges seen from another frame',
            'Write the Lorentz force as $dp^\\mu/d\\tau = qF^\\mu{}_\\nu U^\\nu$ and compute the field invariants',
          ],
          concepts: [
            'Four-current $J^\\mu = (c\\rho, \\mathbf J)$',
            'Four-potential $A^\\mu = (\\phi/c, \\mathbf A)$ and Lorenz gauge',
            'Field-strength tensor $F_{\\mu\\nu}$ (antisymmetric rank-2)',
            'Maxwell\'s equations in covariant form',
            'Transformation of $\\mathbf E$ and $\\mathbf B$',
            'Covariant Lorentz force',
            'Invariants $\\mathbf E^2 - c^2\\mathbf B^2$ and $\\mathbf E\\cdot\\mathbf B$',
            'Magnetism as a relativistic effect',
          ],
          explanation: `Electromagnetism was relativistic before relativity; the four-vector language just makes it obvious. Charge density and current form the **four-current** $J^\\mu = (c\\rho, \\mathbf J)$, and continuity becomes $\\partial_\\mu J^\\mu = 0$, manifestly invariant. The scalar and vector potentials form $A^\\mu = (\\phi/c, \\mathbf A)$; in the Lorenz gauge $\\partial_\\mu A^\\mu = 0$ Maxwell's equations reduce to the wave equation $\\Box A^\\mu = -\\mu_0J^\\mu$, with $\\Box = \\eta^{\\mu\\nu}\\partial_\\mu\\partial_\\nu$.

The fields themselves are not four-vectors. They are the six independent components of an antisymmetric rank-2 **tensor**,
$$F_{\\mu\\nu} = \\partial_\\mu A_\\nu - \\partial_\\nu A_\\mu,\\qquad F_{0i} = -E_i/c,\\quad F_{ij} = \\epsilon_{ijk}B_k .$$
(A tensor of rank 2 transforms with two factors of $\\Lambda$; next module makes this general.) All four of Maxwell's equations collapse to two:
$$\\partial_\\mu F^{\\nu\\mu} = \\mu_0J^\\nu\\quad(\\text{Gauss and Ampère-Maxwell}),\\qquad \\partial_\\lambda F_{\\mu\\nu} + \\partial_\\mu F_{\\nu\\lambda} + \\partial_\\nu F_{\\lambda\\mu} = 0\\quad(\\text{no monopoles and Faraday}).$$
(Signs depend on conventions; check them against Carroll's chapter 1 and stick to one.) The second set is automatic once $F = dA$. The Lorentz force becomes $dp^\\mu/d\\tau = qF^\\mu{}_\\nu U^\\nu$; check that its spatial part is $q(\\mathbf E + \\mathbf v\\times\\mathbf B)$ times $\\gamma$ and its time part is the power $q\\mathbf E\\cdot\\mathbf v$.

Because $F$ is a tensor, a boost mixes $\\mathbf E$ and $\\mathbf B$: for a boost along $x$, $E'_\\parallel = E_\\parallel$, $\\mathbf E'_\\perp = \\gamma(\\mathbf E + \\mathbf v\\times\\mathbf B)_\\perp$, $\\mathbf B'_\\perp = \\gamma(\\mathbf B - \\mathbf v\\times\\mathbf E/c^2)_\\perp$. Electric and magnetic fields are frame-dependent aspects of one object. The classic illustration: a neutral wire with a current exerts a magnetic force on a moving charge; in the charge's rest frame there is no magnetic force on it, but length contraction makes the wire's electrons and ions have different densities, so the wire is charged and the force is electric. Same force, same prediction. Two combinations are invariant, $\\mathbf E^2 - c^2\\mathbf B^2$ and $\\mathbf E\\cdot\\mathbf B$; for a plane wave both vanish in every frame.

The **stress-energy tensor** of the field, $T^{\\mu\\nu} = \\frac{1}{\\mu_0}(F^{\\mu\\alpha}F^\\nu{}_\\alpha - \\frac{1}{4}\\eta^{\\mu\\nu}F_{\\alpha\\beta}F^{\\alpha\\beta})$, packages energy density, Poynting flux and Maxwell stress; it is the bridge to the next lesson. Read Carroll 1.6-1.9, Tong's electromagnetism notes if available to you through the electromagnetism subject, and Feynman II-26 for the transformation of fields.`,
          resources: [
            { ...R.carroll, note: 'Chapter 1, sections 1.6-1.9: tensors in Minkowski space, Maxwell in covariant form, the energy-momentum tensor.', primary: true },
            {
              title: 'Feynman Lectures Vol. II, Ch. 26: Lorentz Transformations of the Fields',
              url: 'https://www.feynmanlectures.caltech.edu/II_26.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            { ...R.susskindSR, note: 'Lectures 5-10 build electrodynamics from the action principle in four-vector form.' },
            { ...R.mit8033, note: 'Lecture notes on relativistic electrodynamics.' },
          ],
          exercises: [
            {
              slug: 'maxwell-covariant-form',
              title: 'Maxwell\'s equations from the field tensor',
              prompt:
                'Write $F_{\\mu\\nu}$ as a 4×4 matrix in terms of $\\mathbf E$ and $\\mathbf B$ in your sign convention. Expand $\\partial_\\mu F^{\\nu\\mu} = \\mu_0J^\\nu$ for $\\nu = 0$ and $\\nu = i$ and recover Gauss\'s law and Ampère-Maxwell. Expand the Bianchi identity and recover $\\nabla\\cdot\\mathbf B = 0$ and Faraday. Show that $\\partial_\\nu\\partial_\\mu F^{\\nu\\mu} = 0$ implies charge conservation. Use SymPy to check every component.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'field-transformation',
              title: 'Transform the fields of a moving charge',
              prompt:
                'Starting from the Coulomb field of a charge at rest, boost to a frame where it moves at $v$ along $x$ (transform $F^{\\mu\\nu}$ and the coordinates) and derive the field of a uniformly moving charge: $\\mathbf E = \\frac{q}{4\\pi\\epsilon_0}\\frac{(1 - \\beta^2)\\mathbf R}{R^3(1 - \\beta^2\\sin^2\\theta)^{3/2}}$ and $\\mathbf B = \\mathbf v\\times\\mathbf E/c^2$. Plot the field lines for $\\beta = 0, 0.9, 0.99$ showing the pancake compression. Verify the invariants are unchanged.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'magnetism-from-contraction',
              title: 'Magnetism from length contraction',
              prompt:
                'A long neutral wire carries current $I$ with electrons drifting at $u$; a test charge $q$ moves parallel at speed $v$ at distance $r$. Compute the force in the lab frame (magnetic). Transform to the test charge\'s rest frame: compute the line charge densities of ions and electrons using length contraction and relativistic velocity addition, find the net charge density and the electric force, and transform the force back. Show the results agree exactly, not just to first order in $v/c$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are E and B components of a single tensor rather than two vectors?',
              answerOutline:
                'Under boosts they mix into each other; the six components transform together as the antisymmetric rank-2 tensor F_μν = ∂_μA_ν − ∂_νA_μ.',
            },
            {
              question: 'Name the Lorentz invariants of the electromagnetic field and what they tell you.',
              answerOutline:
                'E² − c²B² and E·B; e.g. if E·B = 0 and E > cB there is a frame with pure electric field; for radiation both vanish.',
            },
            {
              question: 'How is charge conservation built into the covariant Maxwell equations?',
              answerOutline:
                'Antisymmetry of F makes ∂_ν∂_μF^{νμ} = 0 identically, forcing ∂_νJ^ν = 0.',
            },
          ],
        },
        {
          slug: 'stress-energy-tensor-and-fluids',
          title: 'The stress-energy tensor and relativistic fluids',
          summary:
            'Energy and momentum densities and fluxes as a rank-2 tensor $T^{\\mu\\nu}$; dust, perfect fluids and radiation; conservation $\\partial_\\mu T^{\\mu\\nu} = 0$; and why this tensor, not mass density, must be the source of gravity.',
          estimatedMinutes: 100,
          objectives: [
            'Interpret each component of $T^{\\mu\\nu}$ as an energy density, momentum density, energy flux or stress',
            'Construct $T^{\\mu\\nu}$ for dust, a perfect fluid $(\\rho + p/c^2)U^\\mu U^\\nu + p\\eta^{\\mu\\nu}$ and radiation',
            'Derive the relativistic continuity and Euler equations from $\\partial_\\mu T^{\\mu\\nu} = 0$',
            'Explain why pressure contributes to inertia and why a relativistic theory of gravity must be sourced by $T^{\\mu\\nu}$',
          ],
          concepts: [
            'Stress-energy (energy-momentum) tensor $T^{\\mu\\nu}$',
            'Energy density, momentum density, flux, stress',
            'Symmetry of $T^{\\mu\\nu}$',
            'Dust: $T^{\\mu\\nu} = \\rho U^\\mu U^\\nu$',
            'Perfect fluid stress-energy',
            'Equation of state $p = w\\rho c^2$',
            'Conservation $\\partial_\\mu T^{\\mu\\nu} = 0$ and the relativistic Euler equation',
            'Energy conditions (preview)',
          ],
          explanation: `Newtonian gravity is sourced by mass density $\\rho$. But in relativity mass density is not invariant: a box of dust moving at $v$ has its number density increased by $\\gamma$ (length contraction) and each particle's energy increased by $\\gamma$, so the energy density transforms by $\\gamma^2$. That is the transformation of the 00 component of a rank-2 tensor. The complete object is the **stress-energy tensor** $T^{\\mu\\nu}$, defined so that $T^{\\mu\\nu}$ is the flux of $\\mu$-momentum across a surface of constant $x^\\nu$:
$T^{00}$ is the energy density; $T^{0i}$ the energy flux (= $c$ times momentum density); $T^{ij}$ the stress, with pressure on the diagonal and shear off it. It is symmetric, and for an isolated system local conservation of energy and momentum is the single equation
$$\\partial_\\mu T^{\\mu\\nu} = 0 .$$

Three cases cover most of astrophysics and cosmology. **Dust** (non-interacting particles with rest-frame density $\\rho$): $T^{\\mu\\nu} = \\rho U^\\mu U^\\nu$. A **perfect fluid** (isotropic pressure in its rest frame, no viscosity or heat flow):
$$T^{\\mu\\nu} = \\left(\\rho + \\frac{p}{c^2}\\right)U^\\mu U^\\nu + p\\,\\eta^{\\mu\\nu},$$
which in the rest frame is $\\mathrm{diag}(\\rho c^2, p, p, p)$. **Radiation** is a perfect fluid with $p = \\rho c^2/3$, so $T^\\mu{}_\\mu = 0$ (traceless, as for the electromagnetic tensor of the last lesson). Cosmologists write $p = w\\rho c^2$: $w = 0$ for matter, $1/3$ for radiation, $-1$ for a cosmological constant.

Applying conservation to the perfect fluid gives two equations: the projection along $U$ is energy conservation (the first law, $d(\\rho c^2 V) = -p\\,dV$), and the projection orthogonal to $U$ is the relativistic Euler equation, in which the inertia is $\\rho + p/c^2$, not $\\rho$. **Pressure has inertia and weight.** In neutron stars $p \\sim \\rho c^2$ and this matters enormously; in module 5 it is why there is a maximum neutron-star mass and why pressure cannot ultimately prevent collapse.

The conclusion: a relativistic field equation for gravity must have $T^{\\mu\\nu}$ on its right-hand side, which means the left-hand side must be a symmetric rank-2 tensor built from the gravitational field, with zero divergence. Finding that tensor is the content of modules 3 and 4. Read Carroll 1.9, Schutz-style derivations in Tong's GR chapter 3 (section on the energy-momentum tensor), and Baez-Bunn's "The Meaning of Einstein's Equation", which starts from exactly this point.`,
          resources: [
            { ...R.carroll, note: 'Chapter 1, section 1.9: energy-momentum tensor of dust, fluids and fields.', primary: true },
            { ...R.tongGR, note: 'Chapter 4 (Einstein equations) section on the energy-momentum tensor and perfect fluids.' },
            {
              title: 'Baez & Bunn — The Meaning of Einstein\'s Equation',
              url: 'https://math.ucr.edu/home/baez/einstein/',
              type: 'article',
              cost: 'free',
              provider: 'UC Riverside (John Baez)',
              note: 'Read the introduction now; return to it in module 4.',
            },
          ],
          exercises: [
            {
              slug: 'dust-transformation',
              title: 'Transform the stress-energy of dust',
              prompt:
                'For dust at rest with density $\\rho$, write $T^{\\mu\\nu}$, boost it along $x$ and show $T\'^{00} = \\gamma^2\\rho c^2$, $T\'^{01} = -\\gamma^2\\beta\\rho c^2$, $T\'^{11} = \\gamma^2\\beta^2\\rho c^2$. Interpret each component physically (number density × energy per particle, energy flux, momentum flux). Verify by direct counting of particles crossing surfaces.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'perfect-fluid-equations',
              title: 'Relativistic fluid equations',
              prompt:
                'Derive from $\\partial_\\mu T^{\\mu\\nu} = 0$ for a perfect fluid: (a) $U_\\nu\\partial_\\mu T^{\\mu\\nu} = 0$ gives $U^\\mu\\partial_\\mu\\rho + (\\rho + p/c^2)\\partial_\\mu U^\\mu = 0$; (b) the orthogonal projection gives $(\\rho + p/c^2)U^\\mu\\partial_\\mu U^\\nu = -(\\eta^{\\nu\\mu} + U^\\nu U^\\mu/c^2)\\partial_\\mu p$. Take the non-relativistic limit and recover the continuity and Euler equations. Derive the relativistic speed of sound $c_s^2 = dp/d\\rho$ and show the causality bound $c_s \\le c$ restricts equations of state.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'em-stress-energy',
              title: 'Stress-energy of the electromagnetic field',
              prompt:
                'From $T^{\\mu\\nu} = \\frac{1}{\\mu_0}(F^{\\mu\\alpha}F^\\nu{}_\\alpha - \\frac{1}{4}\\eta^{\\mu\\nu}F^2)$, compute $T^{00}$, $T^{0i}$ and $T^{ij}$ in terms of $\\mathbf E$ and $\\mathbf B$ and identify the energy density, Poynting vector and Maxwell stress tensor. Show $T^\\mu{}_\\mu = 0$. For a plane wave compute all components and show it behaves like a null fluid with $T^{\\mu\\nu} \\propto k^\\mu k^\\nu$. Compute the radiation pressure on a perfect absorber in sunlight at 1 AU.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the source of relativistic gravity be T^μν rather than mass density?',
              answerOutline:
                'Mass/energy density is the 00 component of a tensor and is not invariant; a covariant equation needs the whole tensor (energy, momentum, stress), so pressure and momentum flux also gravitate.',
            },
            {
              question: 'Write the perfect-fluid stress-energy tensor and explain each term.',
              answerOutline:
                'T = (ρ + p/c²)UU + pη; in the rest frame diag(ρc², p, p, p): energy density and isotropic pressure, no flux or shear.',
            },
            {
              question: 'What does ∂_μT^μν = 0 express?',
              answerOutline:
                'Local conservation of energy (ν = 0) and of each momentum component (ν = i): changes in a volume equal fluxes through its boundary.',
            },
          ],
        },
      ],
      project: {
        slug: 'relativistic-kinematics-toolkit',
        title: 'A relativistic kinematics and visualisation toolkit',
        description: `Build a Python library for special relativity: four-vector and Lorentz-transformation classes with tests, spacetime-diagram plotting with multiple frames and worldlines, a relativistic particle pusher (charged particles in arbitrary $\\mathbf E$ and $\\mathbf B$ fields using the Boris or Vay algorithm), and invariant-mass tools.

Use it to produce: the twin paradox with signal exchange; a charged particle's helical motion in a magnetic field with an $\\mathbf E\\times\\mathbf B$ drift, checked against the exact solution in the drift frame; the pancaked field of a relativistic charge; and the $Z$ boson peak from CERN open data.`,
        deliverables: [
          'Library with unit tests (Lorentz group properties, invariance of intervals, energy conservation of the particle pusher)',
          'Notebook with the four demonstrations and a short write-up of each',
        ],
        estimatedHours: 10,
        stretchGoals: ['Render the visual appearance of a fast-moving cube including light-travel-time effects (Terrell rotation)', 'Add synchrotron radiation reaction (Landau-Lifshitz) to the particle pusher and compute the energy loss per turn in a storage ring'],
      },
    },
    {
      slug: 'tensors-and-curved-spaces',
      title: 'Tensors and Curved Spaces',
      description:
        'The equivalence principle as the motivation for geometry, then the mathematics: manifolds and tensors, the metric, covariant derivatives and Christoffel symbols, geodesics, and the Riemann curvature tensor.',
      lessons: [
        {
          slug: 'the-equivalence-principle',
          title: 'The equivalence principle and gravity as geometry',
          summary:
            'Universality of free fall, Einstein\'s elevator, local inertial frames, the gravitational redshift and bending of light derived from the equivalence principle alone, and why this forces spacetime to be curved.',
          estimatedMinutes: 100,
          objectives: [
            'State the weak and Einstein equivalence principles and the experiments (Eötvös, MICROSCOPE) that test them',
            'Use the elevator thought experiment to derive the gravitational redshift $\\Delta\\nu/\\nu = -\\Delta\\Phi/c^2$ and qualitative light bending',
            'Explain local inertial frames and why tidal effects cannot be transformed away',
            'Argue that free-fall trajectories should be geodesics of a curved spacetime metric',
          ],
          concepts: [
            'Inertial and gravitational mass; universality of free fall',
            'Weak, Einstein and strong equivalence principles',
            'Einstein\'s elevator; freely falling frames',
            'Local inertial frames',
            'Tidal forces as the physical content of gravity',
            'Gravitational redshift and the Pound-Rebka experiment',
            'Light bending (heuristic)',
            'Gravity as spacetime curvature',
          ],
          explanation: `Every body falls with the same acceleration in a gravitational field, regardless of its composition: inertial mass equals gravitational mass. Galileo argued it, Newton tested it with pendulums, Eötvös with torsion balances to $10^{-9}$, and the MICROSCOPE satellite (2022) to $10^{-15}$. In Newtonian theory it is a coincidence. Einstein made it a principle.

In a closed elevator you cannot tell whether you are at rest on Earth or accelerating at $g$ in empty space; and in a freely falling elevator you float, exactly as in deep space. The **Einstein equivalence principle**: in a sufficiently small freely falling laboratory, over a sufficiently short time, all non-gravitational physics is that of special relativity. Gravity can be transformed away *locally*. Freely falling frames, not frames at rest on the ground, are the inertial frames of relativity; the ground is accelerating upward at $g$.

Consequences follow without any field equations. Shine light from the floor of a rocket accelerating at $g$ to the ceiling a height $h$ above. By the time it arrives the ceiling is moving faster, so the light is Doppler redshifted by $gh/c^2$. By equivalence, light climbing out of a gravitational well is **redshifted**, $\\Delta\\nu/\\nu = -\\Delta\\Phi/c^2$, and clocks lower in a potential run slow. Pound and Rebka measured it over 22.5 m in a Harvard tower in 1959 ($2.5\\times10^{-15}$, confirmed to 10%); optical clocks now see it over 1 cm. A horizontal light beam in the rocket appears to curve downward, so light must **bend** in gravity (the equivalence argument gives half the true value; curvature of space supplies the other half, module 7).

Why "only locally"? Two particles released side by side above the Earth fall toward its centre and converge; two released one above the other drift apart. These **tidal** accelerations cannot be removed by any choice of frame; they are the genuine, frame-independent content of gravity. Now recall that in special relativity free particles follow straight worldlines that maximise proper time. In a gravitational field freely falling particles follow paths that are locally straight (no force in their own frame) but that converge and diverge. That is precisely the behaviour of **geodesics** on a curved surface: lines of longitude are locally straight yet meet at the poles. Einstein's leap: spacetime is a curved four-dimensional manifold; free fall is geodesic motion; tidal forces are curvature. The rest of this module builds the mathematics to say this precisely.

Read Carroll chapter 2 introduction and 4.1, Tong GR chapter 1, and Einstein Online's equivalence-principle articles; Susskind GR lecture 1 covers the same ground with great physical clarity.`,
          resources: [
            { ...R.tongGR, note: 'Chapter 1 (Geodesics in spacetime) and the discussion of the equivalence principle.', primary: true },
            { ...R.carroll, note: 'Chapter 4.1 (physics in curved spacetime: the principle of equivalence).' },
            { ...R.susskindGR, note: 'Lecture 1: the equivalence principle and tidal forces.' },
            { ...R.einsteinOnline, note: 'Spotlight articles on the equivalence principle and gravitational redshift.' },
          ],
          exercises: [
            {
              slug: 'redshift-from-equivalence',
              title: 'Gravitational redshift from the elevator',
              prompt:
                'Derive $\\Delta\\nu/\\nu = -gh/c^2$ using a rocket accelerating at $g$ and the first-order Doppler shift, then generalise to $\\Delta\\Phi/c^2$ by stacking many small elevators. Compute the fractional shift for the Pound-Rebka tower (22.5 m), for a clock on Mount Everest relative to sea level, for light leaving the Sun\'s surface and a white dwarf of $0.6M_\\odot$ and $0.012R_\\odot$ (compare with the measured redshift of Sirius B, ~80 km/s equivalent).',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'tidal-tensor',
              title: 'Tidal forces as the gradient of gravity',
              prompt:
                'For the Newtonian potential $\\Phi = -GM/r$ compute the tidal tensor $\\partial_i\\partial_j\\Phi$ at a point on the $z$-axis and show the relative acceleration of nearby free particles separated by $\\boldsymbol\\xi$ is $\\ddot\\xi^i = -(\\partial_i\\partial_j\\Phi)\\xi^j$: stretching along $z$ by $2GM\\xi/r^3$, compression transverse by $GM\\xi/r^3$. Show the tensor is traceless in vacuum. Simulate a ring of test particles falling toward a point mass and plot its deformation into an ellipse.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'eotvos-analysis',
              title: 'Testing universality of free fall',
              prompt:
                'Explain how a torsion balance with two different materials, in the Earth\'s gravity and centrifugal field (or the Sun\'s field, Dicke-Braginsky), detects a difference in $m_g/m_i$. Define the Eötvös parameter $\\eta$ and estimate the torque produced on a balance with 10 g masses on a 5 cm arm if $\\eta = 10^{-13}$. Summarise the MICROSCOPE result and explain why a satellite helps.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly does the Einstein equivalence principle assert?',
              answerOutline:
                'In a small enough freely falling frame, over short times, all non-gravitational laws reduce to those of special relativity; gravity is locally indistinguishable from acceleration.',
            },
            {
              question: 'Why can tidal forces not be transformed away?',
              answerOutline:
                'They are differences in gravitational acceleration between nearby points; one frame can only cancel the acceleration at one point. Their frame-independent nature is curvature.',
            },
            {
              question: 'How does the equivalence principle predict that clocks run slow lower in a gravitational well?',
              answerOutline:
                'Light sent upward in an accelerating rocket arrives Doppler redshifted; by equivalence, a static observer above sees the lower clock\'s signals redshifted, so it ticks slower by ΔΦ/c².',
            },
          ],
        },
        {
          slug: 'manifolds-tensors-and-the-metric',
          title: 'Manifolds, tensors and the metric',
          summary:
            'The mathematics of curved spaces: manifolds and coordinate charts, vectors as directional derivatives, one-forms, general tensors and their transformation laws, and the metric as the object that measures lengths and angles.',
          estimatedMinutes: 130,
          objectives: [
            'Define a manifold, coordinate charts and coordinate transformations',
            'Define tangent vectors and one-forms and their coordinate bases $\\partial_\\mu$ and $dx^\\mu$',
            'Transform tensors of arbitrary rank under general coordinate changes and recognise tensorial equations',
            'Use the metric $g_{\\mu\\nu}$ to compute lengths, angles, volumes and proper times, including for the sphere, polar coordinates and Rindler spacetime',
          ],
          concepts: [
            'Manifold and charts',
            'Tangent space; vectors as directional derivatives',
            'Dual space; one-forms and gradients',
            'Tensors of type $(k, l)$ and their transformation law',
            'Metric tensor $g_{\\mu\\nu}$ and line element $ds^2$',
            'Raising and lowering indices with $g$',
            'Signature and local flatness',
            'Volume element $\\sqrt{-g}\\,d^4x$',
          ],
          explanation: `A **manifold** is a space that looks locally like $\\mathbb R^n$: it can be covered by overlapping coordinate patches (charts), with smooth transformations between them. The sphere is the standard example: no single chart covers it without singularities, but latitude-longitude works away from the poles. Physics on a manifold must not depend on the chart, so everything has to be built from objects with definite transformation laws.

At each point $p$ there is a **tangent space** of vectors. The cleanest definition is a vector as a directional derivative: $V = V^\\mu\\partial_\\mu$, with coordinate basis vectors $\\partial_\\mu$. Under a change of coordinates $x \\to x'$ the components transform as $V'^\\mu = \\frac{\\partial x'^\\mu}{\\partial x^\\nu}V^\\nu$. The dual space contains **one-forms**, with basis $dx^\\mu$ and components transforming with the inverse Jacobian, $\\omega'_\\mu = \\frac{\\partial x^\\nu}{\\partial x'^\\mu}\\omega_\\nu$; the gradient of a function is the prototype. A **tensor** of type $(k, l)$ has $k$ upper and $l$ lower indices and transforms with one Jacobian factor per index. The payoff: if a tensor equation holds in one coordinate system, it holds in all (both sides transform the same way). This is general covariance, the curved-space version of last module's manifest Lorentz covariance.

The **metric** $g_{\\mu\\nu}$ is a symmetric $(0,2)$ tensor that defines the inner product of vectors, $g(V, W) = g_{\\mu\\nu}V^\\mu W^\\nu$, and hence the line element
$$ds^2 = g_{\\mu\\nu}(x)\\,dx^\\mu dx^\\nu .$$
Examples to work through: the plane in polar coordinates, $ds^2 = dr^2 + r^2d\\theta^2$ (flat, but the components vary); the 2-sphere, $ds^2 = R^2(d\\theta^2 + \\sin^2\\theta\\,d\\phi^2)$ (genuinely curved); Minkowski space in Rindler coordinates, $ds^2 = -(1 + gx/c^2)^2c^2dt^2 + dx^2$ (flat, but describing a uniformly accelerating observer, whose $g_{00}$ is exactly the gravitational redshift of the previous lesson). Varying components do not by themselves indicate curvature; that is why the curvature tensor of lesson 5 is needed. The metric and its inverse $g^{\\mu\\nu}$ raise and lower indices, and the invariant volume element is $\\sqrt{|g|}\\,d^nx$.

At any point you can choose coordinates where $g_{\\mu\\nu} = \\eta_{\\mu\\nu}$ and $\\partial_\\lambda g_{\\mu\\nu} = 0$ (Riemann normal coordinates); the second derivatives cannot all be removed. This is the mathematical statement of the equivalence principle: locally inertial, but with curvature in the second derivatives.

Read Carroll chapter 2 (manifolds) and section 3.1, Tong GR chapter 2, and watch 8.962 lectures 3-5. This lesson is mathematically dense; do the exercises slowly and use SymPy to check every transformation.`,
          resources: [
            { ...R.carroll, note: 'Chapter 2: manifolds, vectors, one-forms, tensors, the metric.', primary: true },
            { ...R.tongGR, note: 'Chapter 2 (Introducing differential geometry), sections 2.1-2.2.' },
            { ...R.mit8962, note: 'Lectures 3-5: manifolds, tensors and the metric.' },
            { ...R.carrollBook, note: 'Chapter 2 of the book adds exercises. Free alternative: the notes and Tong.' },
          ],
          exercises: [
            {
              slug: 'tensor-transformations',
              title: 'Tensor transformation laws in practice',
              prompt:
                'Transform the Euclidean metric $\\delta_{ij}$ from Cartesian to polar coordinates and to spherical coordinates using $g\'_{\\mu\\nu} = \\frac{\\partial x^\\alpha}{\\partial x\'^\\mu}\\frac{\\partial x^\\beta}{\\partial x\'^\\nu}g_{\\alpha\\beta}$ (do it with SymPy). Transform the vector field $V = x\\partial_x + y\\partial_y$ and the one-form $df$ for $f = x^2 + y^2$ to polar components and check $df(V) = V(f)$ is the same scalar in both. Show that the partial derivative of a vector, $\\partial_\\mu V^\\nu$, does not transform as a tensor (extra term with second derivatives of the coordinate change).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'metric-geometry',
              title: 'Measuring with the metric',
              prompt:
                'On the 2-sphere of radius $R$: compute the length of a circle of latitude $\\theta_0$, the area of the cap $\\theta < \\theta_0$, and show the circumference is less than $2\\pi$ times the geodesic radius $R\\theta_0$. In Rindler spacetime compute the proper time ticked by clocks at fixed $x$ between $t = 0$ and $t = T$ and show the ratio between clocks at heights $x_1$ and $x_2$ is the gravitational redshift. For the 3-sphere $ds^2 = R^2(d\\chi^2 + \\sin^2\\chi\\,d\\Omega^2)$ compute the total volume ($2\\pi^2R^3$).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'normal-coordinates',
              title: 'Locally flat coordinates',
              prompt:
                'Count degrees of freedom: in 4D, show that a coordinate transformation has enough freedom (its first, second and third Taylor coefficients) to set $g_{\\mu\\nu} = \\eta_{\\mu\\nu}$ and $\\partial_\\lambda g_{\\mu\\nu} = 0$ at a point, but leaves 20 second derivatives that cannot be removed. Identify these 20 numbers with the independent components of the Riemann tensor (lesson 5). Construct explicit locally flat coordinates on the 2-sphere near $\\theta = \\pi/2$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What distinguishes a tensor equation from an arbitrary equation between components?',
              answerOutline:
                'Both sides transform identically under any coordinate change, so if it holds in one chart it holds in every chart (general covariance).',
            },
            {
              question: 'Do coordinate-dependent metric components mean the space is curved?',
              answerOutline:
                'No: flat space in polar or Rindler coordinates has varying components. Curvature is detected by the Riemann tensor, built from second derivatives that cannot be removed.',
            },
            {
              question: 'How does the existence of locally flat coordinates express the equivalence principle?',
              answerOutline:
                'At any point one can choose g = η with vanishing first derivatives: locally the laws of special relativity hold; only second derivatives (tidal effects/curvature) remain.',
            },
          ],
          relatedLessons: ['math-methods/vector-calculus/curvilinear-coordinates'],
        },
        {
          slug: 'covariant-derivatives-and-christoffel-symbols',
          title: 'Covariant derivatives, Christoffel symbols and parallel transport',
          summary:
            'Why partial derivatives of tensors are not tensors, the covariant derivative and the connection, the Christoffel symbols of the metric-compatible torsion-free connection, and parallel transport and holonomy.',
          estimatedMinutes: 130,
          objectives: [
            'Construct the covariant derivative $\\nabla_\\mu V^\\nu = \\partial_\\mu V^\\nu + \\Gamma^\\nu_{\\mu\\lambda}V^\\lambda$ and its action on one-forms and general tensors',
            'Derive the Christoffel symbols $\\Gamma^\\lambda_{\\mu\\nu} = \\frac{1}{2}g^{\\lambda\\sigma}(\\partial_\\mu g_{\\nu\\sigma} + \\partial_\\nu g_{\\mu\\sigma} - \\partial_\\sigma g_{\\mu\\nu})$ from metric compatibility and zero torsion',
            'Compute Christoffel symbols by hand and with SymPy for polar coordinates, the sphere and Schwarzschild',
            'Define parallel transport and show that transport around a closed loop on a sphere rotates a vector by the enclosed curvature',
          ],
          concepts: [
            'Covariant derivative $\\nabla_\\mu$',
            'Connection coefficients and their non-tensorial transformation',
            'Christoffel symbols (Levi-Civita connection)',
            'Metric compatibility $\\nabla_\\lambda g_{\\mu\\nu} = 0$ and zero torsion',
            'Comma-to-semicolon rule (minimal coupling)',
            'Parallel transport',
            'Holonomy and path dependence',
            'Covariant divergence $\\nabla_\\mu V^\\mu = \\frac{1}{\\sqrt{|g|}}\\partial_\\mu(\\sqrt{|g|}V^\\mu)$',
          ],
          explanation: `To write physics in curved spacetime you need derivatives, but the partial derivative of a vector is not a tensor: comparing $V$ at two neighbouring points means comparing vectors in two different tangent spaces, and the comparison depends on the coordinates. The fix is a **connection**, a rule for transporting vectors so they can be compared. The **covariant derivative**
$$\\nabla_\\mu V^\\nu = \\partial_\\mu V^\\nu + \\Gamma^\\nu_{\\mu\\lambda}V^\\lambda,\\qquad \\nabla_\\mu\\omega_\\nu = \\partial_\\mu\\omega_\\nu - \\Gamma^\\lambda_{\\mu\\nu}\\omega_\\lambda,$$
with one $\\Gamma$ term per index for higher tensors, is a tensor provided the $\\Gamma$s transform in exactly the non-tensorial way that cancels the bad term from $\\partial_\\mu V^\\nu$. Many connections exist; general relativity uses the unique one that is **torsion-free** ($\\Gamma^\\lambda_{\\mu\\nu} = \\Gamma^\\lambda_{\\nu\\mu}$) and **metric-compatible** ($\\nabla_\\lambda g_{\\mu\\nu} = 0$, so lengths and angles are preserved under transport). Those two conditions determine it from the metric:
$$\\Gamma^\\lambda_{\\mu\\nu} = \\tfrac{1}{2}g^{\\lambda\\sigma}\\left(\\partial_\\mu g_{\\nu\\sigma} + \\partial_\\nu g_{\\mu\\sigma} - \\partial_\\sigma g_{\\mu\\nu}\\right).$$
These are the **Christoffel symbols**. In Cartesian coordinates in flat space they vanish; in polar coordinates $\\Gamma^r_{\\theta\\theta} = -r$ and $\\Gamma^\\theta_{r\\theta} = 1/r$, which are the familiar centripetal and Coriolis-like terms. Since $\\Gamma$ is built from first derivatives of the metric, it can always be set to zero at a point (locally inertial coordinates), so the gravitational "force" is not a tensor and has no invariant meaning.

The rule for doing physics in curved spacetime is now simple to state: take a law valid in special relativity, written covariantly, and replace $\\eta_{\\mu\\nu} \\to g_{\\mu\\nu}$ and $\\partial_\\mu \\to \\nabla_\\mu$ ("comma goes to semicolon"). For example energy-momentum conservation becomes $\\nabla_\\mu T^{\\mu\\nu} = 0$ and Maxwell's equations $\\nabla_\\mu F^{\\nu\\mu} = \\mu_0J^\\nu$. This **minimal coupling** is the equivalence principle in mathematical form.

A vector is **parallel transported** along a curve $x^\\mu(\\lambda)$ if $\\frac{dV^\\mu}{d\\lambda} + \\Gamma^\\mu_{\\nu\\lambda}\\frac{dx^\\nu}{d\\lambda}V^\\lambda = 0$. In flat space this keeps the vector constant. On a sphere, carry a vector from the north pole down to the equator, a quarter of the way along it, and back up: it returns rotated by $90°$, equal to the solid angle enclosed. That path dependence (**holonomy**) is curvature, and Foucault's pendulum and the geodetic precession of Gravity Probe B (module 7) are physical instances.

Read Carroll chapter 3.1-3.3, Tong 3.1 and 8.962 lectures 6-8. Write a SymPy function that computes all Christoffel symbols from any metric; you will reuse it throughout the subject.`,
          resources: [
            { ...R.carroll, note: 'Chapter 3, sections 3.1-3.3: covariant derivatives, Christoffel symbols, parallel transport.', primary: true },
            { ...R.tongGR, note: 'Chapter 3 (Introducing differential geometry, continued): the connection and parallel transport.' },
            { ...R.mit8962, note: 'Lectures 6-8: covariant derivative, Christoffel symbols, parallel transport.' },
            { ...R.einsteinpy, note: 'einsteinpy.symbolic computes Christoffel symbols and curvature tensors; use it to check your own SymPy code.' },
          ],
          exercises: [
            {
              slug: 'derive-christoffel',
              title: 'Derive the Levi-Civita connection',
              prompt:
                'Starting from $\\nabla_\\lambda g_{\\mu\\nu} = 0$ written out with $\\Gamma$s, cyclically permute indices and combine three copies, using symmetry of $\\Gamma$, to derive the Christoffel formula. Show that $\\Gamma$ does not transform as a tensor (derive its transformation law) and that the difference of two connections does. Prove the divergence formula $\\nabla_\\mu V^\\mu = |g|^{-1/2}\\partial_\\mu(|g|^{1/2}V^\\mu)$ and use it to write the Laplacian in spherical coordinates.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'christoffel-sympy',
              title: 'A Christoffel-symbol calculator',
              prompt:
                'Write a SymPy function christoffel(g, coords) returning all nonzero $\\Gamma^\\lambda_{\\mu\\nu}$. Test it on polar coordinates, the 2-sphere ($\\Gamma^\\theta_{\\phi\\phi} = -\\sin\\theta\\cos\\theta$, $\\Gamma^\\phi_{\\theta\\phi} = \\cot\\theta$), and Schwarzschild $ds^2 = -(1 - r_s/r)c^2dt^2 + (1 - r_s/r)^{-1}dr^2 + r^2d\\Omega^2$, where you should find nine independent nonzero symbols, e.g. $\\Gamma^r_{tt} = \\frac{c^2r_s(r - r_s)}{2r^3}$. Cross-check with einsteinpy.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'parallel-transport-sphere',
              title: 'Parallel transport around a circle of latitude',
              prompt:
                'Solve the parallel-transport equations for a vector carried once around the circle of latitude $\\theta = \\theta_0$ on a unit sphere, analytically and numerically. Show the vector returns rotated by $2\\pi\\cos\\theta_0$ (equivalently, by $2\\pi(1 - \\cos\\theta_0)$, the enclosed solid angle, relative to the local frame). Relate this to the precession of a Foucault pendulum at latitude $\\lambda$ (rotation $2\\pi\\sin\\lambda$ per sidereal day). Plot the transported vector at several points along the loop.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a connection needed to differentiate vectors on a manifold?',
              answerOutline:
                'Vectors at different points live in different tangent spaces; comparing them requires a rule for transporting one to the other, which the connection supplies.',
            },
            {
              question: 'Which two conditions single out the Christoffel connection?',
              answerOutline:
                'Zero torsion (Γ symmetric in lower indices) and metric compatibility (∇g = 0); together they give Γ uniquely in terms of first derivatives of g.',
            },
            {
              question: 'Why can the Christoffel symbols be made to vanish at a point but curvature cannot?',
              answerOutline:
                'Γ depends on first derivatives of g, which locally inertial coordinates can remove; curvature involves second derivatives, which cannot all be removed.',
            },
          ],
        },
        {
          slug: 'geodesics',
          title: 'Geodesics: free fall in curved spacetime',
          summary:
            'Geodesics as curves that parallel transport their own tangent and as extremal proper-time paths; the geodesic equation, affine parameters, conserved quantities from Killing vectors, and numerical geodesic integration.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the geodesic equation $\\ddot x^\\lambda + \\Gamma^\\lambda_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu = 0$ from the variational principle and from parallel transport',
            'Show that the Newtonian limit of the geodesic equation for slow motion in a weak static field gives $\\ddot{\\mathbf x} = -\\nabla\\Phi$ with $g_{00} \\approx -(1 + 2\\Phi/c^2)$',
            'Use Killing vectors to find conserved energy and angular momentum along geodesics',
            'Integrate timelike and null geodesics numerically and check conservation laws',
          ],
          concepts: [
            'Geodesic equation',
            'Extremal proper time; the action $\\int\\sqrt{-g_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu}\\,d\\lambda$',
            'Affine parameters; timelike, null and spacelike geodesics',
            'Newtonian limit and $g_{00} \\approx -(1 + 2\\Phi/c^2)$',
            'Killing vectors and conserved quantities',
            'The Lagrangian $\\frac{1}{2}g_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu$ shortcut',
            'Numerical geodesic integration',
            'Great circles on the sphere',
          ],
          explanation: `A **geodesic** is the curved-space generalisation of a straight line, and it has two equivalent definitions. Geometrically, it is a curve that parallel transports its own tangent vector: it never turns. Variationally, it extremises the proper time $\\tau = \\int\\sqrt{-g_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu}\\,d\\lambda/c$ between two events. Either way you get
$$\\frac{d^2x^\\lambda}{d\\tau^2} + \\Gamma^\\lambda_{\\mu\\nu}\\frac{dx^\\mu}{d\\tau}\\frac{dx^\\nu}{d\\tau} = 0 .$$
For light, $d\\tau = 0$, so use any **affine parameter** $\\lambda$ (one in which the equation keeps this form) and the constraint $g_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu = 0$. A practical shortcut: the Euler-Lagrange equations of $L = \\frac{1}{2}g_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu$ give the geodesic equation directly, often faster than computing Christoffel symbols, and the Christoffel symbols can be read off from them.

Einstein's postulate is that freely falling particles follow timelike geodesics and light follows null geodesics. Check that this reproduces Newton. For slow motion in a weak static field, only $\\Gamma^i_{00}$ matters and $\\ddot x^i \\approx -\\Gamma^i_{00}c^2 = \\frac{c^2}{2}\\partial_ig_{00}$. Matching to $\\ddot{\\mathbf x} = -\\nabla\\Phi$ requires
$$g_{00} \\approx -\\left(1 + \\frac{2\\Phi}{c^2}\\right).$$
In the Newtonian limit gravity is entirely the warping of *time*: clocks run at different rates at different heights (the redshift of lesson 1), and freely falling bodies maximise their proper time by lingering where clocks run fast, which means higher up, so a thrown ball rises and falls. That is a satisfying explanation of why things fall.

Symmetries give conserved quantities. If the metric does not depend on some coordinate, say $t$ or $\\phi$, then the corresponding **Killing vector** $K = \\partial_t$ or $\\partial_\\phi$ satisfies Killing's equation, and $K_\\mu\\dot x^\\mu$ is constant along every geodesic. For a static, spherically symmetric spacetime this gives conserved energy $E = -g_{tt}\\dot t\\,c^2$ and angular momentum $L = g_{\\phi\\phi}\\dot\\phi$ per unit mass: two first integrals that reduce orbits to a one-dimensional effective-potential problem (module 5).

Most geodesics must be integrated numerically. Write the geodesic equation as a first-order system in $(x^\\mu, \\dot x^\\mu)$, integrate with an adaptive Runge-Kutta method, and monitor the normalisation $g_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu$ and the Killing constants as accuracy checks. The capstone is built on this code.

Read Carroll 3.4-3.5, Tong 1.2-1.3 (geodesics in spacetime, including the Newtonian limit) and 8.962 lectures 9-10.`,
          resources: [
            { ...R.carroll, note: 'Chapter 3, sections 3.4-3.5 (geodesics, Killing vectors in 3.8).', primary: true },
            { ...R.tongGR, note: 'Chapter 1: geodesics in spacetime, the Newtonian limit, and the effective-Lagrangian method.' },
            { ...R.mit8962, note: 'Lectures 9-10: geodesics, Killing vectors and conserved quantities.' },
            { ...R.einsteinpy, note: 'einsteinpy.geodesic integrates geodesics in Schwarzschild and Kerr; use it to validate your integrator.' },
          ],
          exercises: [
            {
              slug: 'geodesic-equation-derivation',
              title: 'Geodesic equation and Newtonian limit',
              prompt:
                'Derive the geodesic equation by varying the proper-time action, show that the parametrisation by proper time makes it affine, and show that $L = \\frac{1}{2}g\\dot x\\dot x$ gives the same equations. Derive the Newtonian limit and $g_{00} \\approx -(1 + 2\\Phi/c^2)$. Then show that the geodesic equation on the 2-sphere is solved by great circles, and that in Rindler spacetime geodesics are straight lines in the underlying Minkowski coordinates.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'geodesic-integrator',
              title: 'A general numerical geodesic integrator',
              prompt:
                'Write a Python geodesic integrator that takes a metric (as a SymPy expression, converted to fast NumPy functions with lambdify, including its Christoffel symbols), initial position and four-velocity, and integrates with scipy.integrate.solve_ivp (RK45 or DOP853, tight tolerances). Test on: great circles on the sphere; straight lines in polar coordinates; radial infall in Schwarzschild (compare with the analytic cycloid-like solution). Monitor $g_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu$ and the Killing energy and report their drift.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'ball-maximises-proper-time',
              title: 'A thrown ball maximises proper time',
              prompt:
                'In the weak-field metric $ds^2 = -(1 + 2gz/c^2)c^2dt^2 + dz^2$, consider paths from $(t, z) = (0, 0)$ to $(T, 0)$ of the form $z(t) = h\\,\\frac{4t(T - t)}{T^2}$. Compute the proper time to second order in small quantities as a function of $h$, and show it is maximised at $h = gT^2/8$, exactly the Newtonian trajectory. Plot $\\tau(h) - T$.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give two equivalent characterisations of a geodesic.',
              answerOutline:
                'A curve that parallel transports its own tangent (does not turn), and a curve that extremises proper time (or length) between its endpoints.',
            },
            {
              question: 'Which metric component carries Newtonian gravity and why?',
              answerOutline:
                'g₀₀ ≈ −(1 + 2Φ/c²); for slow motion the geodesic equation is dominated by Γⁱ₀₀ = −½∂ᵢg₀₀, reproducing −∇Φ. Gravity in this limit is the variation of clock rates.',
            },
            {
              question: 'How do Killing vectors simplify geodesic problems?',
              answerOutline:
                'Each Killing vector K gives a conserved quantity K_μẋ^μ along geodesics (energy from time translation, angular momentum from rotation), reducing the number of equations to integrate.',
            },
          ],
        },
        {
          slug: 'curvature-and-geodesic-deviation',
          title: 'Curvature: the Riemann tensor and geodesic deviation',
          summary:
            'The Riemann tensor as the failure of covariant derivatives to commute, its symmetries and contractions (Ricci tensor and scalar), the Bianchi identity, and geodesic deviation as the relativistic tidal force.',
          estimatedMinutes: 130,
          objectives: [
            'Define the Riemann tensor via $[\\nabla_\\mu, \\nabla_\\nu]V^\\rho = R^\\rho{}_{\\sigma\\mu\\nu}V^\\sigma$ and write it in terms of Christoffel symbols',
            'State its symmetries, count its 20 independent components in 4D, and construct the Ricci tensor and scalar',
            'Compute the curvature of the 2-sphere, the 3-sphere and Schwarzschild with SymPy',
            'Derive the geodesic deviation equation and show its Newtonian limit is the tidal tensor',
          ],
          concepts: [
            'Riemann curvature tensor $R^\\rho{}_{\\sigma\\mu\\nu}$',
            'Curvature from Christoffel symbols',
            'Symmetries and 20 independent components in 4D',
            'Ricci tensor $R_{\\mu\\nu}$ and Ricci scalar $R$',
            'Bianchi identity $\\nabla_{[\\lambda}R_{\\rho\\sigma]\\mu\\nu} = 0$',
            'Contracted Bianchi identity $\\nabla^\\mu G_{\\mu\\nu} = 0$',
            'Geodesic deviation equation',
            'Kretschmann scalar as an invariant measure of curvature',
          ],
          explanation: `Curvature is the path dependence of parallel transport. Transport a vector around an infinitesimal loop spanned by directions $\\mu$ and $\\nu$ and it comes back changed by an amount proportional to the loop's area; the proportionality is the **Riemann tensor**. Equivalently, covariant derivatives fail to commute:
$$[\\nabla_\\mu, \\nabla_\\nu]V^\\rho = R^\\rho{}_{\\sigma\\mu\\nu}V^\\sigma,\\qquad R^\\rho{}_{\\sigma\\mu\\nu} = \\partial_\\mu\\Gamma^\\rho_{\\nu\\sigma} - \\partial_\\nu\\Gamma^\\rho_{\\mu\\sigma} + \\Gamma^\\rho_{\\mu\\lambda}\\Gamma^\\lambda_{\\nu\\sigma} - \\Gamma^\\rho_{\\nu\\lambda}\\Gamma^\\lambda_{\\mu\\sigma}.$$
It is a tensor, so it is zero in one coordinate system if and only if it is zero in all: the Riemann tensor is the invariant test for flatness that varying metric components could not provide. With all indices down it is antisymmetric in each pair, symmetric under pair exchange, and obeys the cyclic identity $R_{\\rho[\\sigma\\mu\\nu]} = 0$, leaving $n^2(n^2 - 1)/12$ components: 1 in 2D (the Gaussian curvature), 6 in 3D, 20 in 4D, matching the count of unremovable second derivatives from lesson 2.

Contracting gives the **Ricci tensor** $R_{\\mu\\nu} = R^\\lambda{}_{\\mu\\lambda\\nu}$ (symmetric, 10 components) and the **Ricci scalar** $R = g^{\\mu\\nu}R_{\\mu\\nu}$. For a 2-sphere of radius $a$, $R = 2/a^2$. The **Bianchi identity** $\\nabla_{[\\lambda}R_{\\rho\\sigma]\\mu\\nu} = 0$, contracted twice, gives
$$\\nabla^\\mu\\left(R_{\\mu\\nu} - \\tfrac{1}{2}Rg_{\\mu\\nu}\\right) = 0 .$$
The combination $G_{\\mu\\nu} = R_{\\mu\\nu} - \\frac{1}{2}Rg_{\\mu\\nu}$, the **Einstein tensor**, is symmetric and automatically divergence-free: exactly the properties that module 2 said the left side of a gravitational field equation must have. Remember this; it is the key to the next module.

Physically, curvature is tidal acceleration. Take a family of neighbouring geodesics with separation vector $S^\\mu$; the **geodesic deviation equation** is
$$\\frac{D^2S^\\mu}{d\\tau^2} = R^\\mu{}_{\\nu\\rho\\sigma}U^\\nu U^\\rho S^\\sigma ,$$
and in the Newtonian limit $R^i{}_{0j0} \\approx \\partial_i\\partial_j\\Phi/c^2$, so it reduces to the tidal equation you derived in lesson 1. The parallel lines that converge on a sphere and the falling particles that converge toward the Earth are the same mathematics. Because coordinate singularities can masquerade as physical ones, use the **Kretschmann scalar** $R_{\\mu\\nu\\rho\\sigma}R^{\\mu\\nu\\rho\\sigma}$ to check: for Schwarzschild it is $12r_s^2/r^6$, finite at the horizon and infinite only at $r = 0$.

Read Carroll 3.6-3.10 and Tong 3.4; 8.962 lectures 11-13. Extend your SymPy code to compute Riemann, Ricci, Ricci scalar and Einstein tensors from any metric; you will need it for every remaining module.`,
          resources: [
            { ...R.carroll, note: 'Chapter 3, sections 3.6-3.10: curvature, symmetries, Bianchi identity, geodesic deviation.', primary: true },
            { ...R.tongGR, note: 'Chapter 3, section on curvature, the Riemann tensor and geodesic deviation.' },
            { ...R.mit8962, note: 'Lectures 11-13: the Riemann tensor, Bianchi identities, geodesic deviation.' },
            { ...R.einsteinpy, note: 'einsteinpy.symbolic RiemannCurvatureTensor, RicciTensor, EinsteinTensor for checking.' },
          ],
          exercises: [
            {
              slug: 'curvature-calculator',
              title: 'A curvature calculator',
              prompt:
                'Extend your SymPy Christoffel code to compute $R^\\rho{}_{\\sigma\\mu\\nu}$, $R_{\\mu\\nu}$, $R$, $G_{\\mu\\nu}$ and the Kretschmann scalar. Verify: polar coordinates give zero curvature; the 2-sphere gives $R = 2/a^2$; the 3-sphere $R = 6/a^2$; the Schwarzschild metric has $R_{\\mu\\nu} = 0$ but Kretschmann $= 12r_s^2/r^6$. Time your code on Schwarzschild and simplify aggressively (trigsimp, factor).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'riemann-symmetries',
              title: 'Symmetries and the contracted Bianchi identity',
              prompt:
                'Using Riemann normal coordinates, prove the symmetries $R_{\\rho\\sigma\\mu\\nu} = -R_{\\sigma\\rho\\mu\\nu} = -R_{\\rho\\sigma\\nu\\mu} = R_{\\mu\\nu\\rho\\sigma}$ and $R_{\\rho[\\sigma\\mu\\nu]} = 0$. Count independent components in $n$ dimensions. Prove the Bianchi identity in normal coordinates and contract it to obtain $\\nabla^\\mu G_{\\mu\\nu} = 0$. Show in 2D that $R_{\\mu\\nu} = \\frac{1}{2}Rg_{\\mu\\nu}$, so $G_{\\mu\\nu} = 0$ identically.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'geodesic-deviation-numerics',
              title: 'Geodesic deviation in Schwarzschild',
              prompt:
                'Integrate a pair of nearby radial infall geodesics in Schwarzschild (your integrator) and measure their separation versus proper time, both radially and transversely. Compare with the geodesic deviation equation using $R^{\\hat r}{}_{\\hat t\\hat r\\hat t} = -r_s c^2/r^3$ and $R^{\\hat\\theta}{}_{\\hat t\\hat\\theta\\hat t} = r_sc^2/2r^3$ in the infalling frame. Compute the tidal stretching felt by a 2 m astronaut at the horizon of a $10M_\\odot$ and a $4\\times10^6M_\\odot$ black hole.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the invariant test that a spacetime is flat?',
              answerOutline:
                'The Riemann tensor vanishes everywhere; being a tensor, this is coordinate independent.',
            },
            {
              question: 'Why is the Einstein tensor G_μν special?',
              answerOutline:
                'It is symmetric, built from the metric and its first two derivatives, and identically divergence-free by the contracted Bianchi identity, matching ∇_μT^μν = 0.',
            },
            {
              question: 'How does the geodesic deviation equation relate to Newtonian tides?',
              answerOutline:
                'Its weak-field slow-motion limit has R^i₀ⱼ₀ ≈ ∂ᵢ∂ⱼΦ/c², giving the Newtonian tidal acceleration −(∂ᵢ∂ⱼΦ)ξʲ.',
            },
          ],
        },
      ],
      project: {
        slug: 'symbolic-gr-toolkit',
        title: 'A symbolic and numerical GR toolkit',
        description: `Combine your SymPy curvature calculator and your numerical geodesic integrator into one package: given a metric, it computes Christoffel symbols, Riemann, Ricci, Einstein and Kretschmann tensors symbolically, then lambdifies the Christoffels to integrate geodesics numerically with conservation-law monitoring.

Validate it on: the 2-sphere and 3-sphere; Minkowski space in Rindler and rotating coordinates (all curvature must vanish); the weak-field metric of a point mass (Newtonian orbits); Schwarzschild (vacuum, radial infall). Include a gallery of geodesics on a torus or other surface embedded in 3D, plotted on the surface.`,
        deliverables: [
          'Package with tests that every flat-space metric gives zero curvature and that known curvature invariants are reproduced',
          'Notebook with the validation suite and the geodesic gallery',
        ],
        estimatedHours: 10,
        stretchGoals: ['Add an orthonormal-tetrad (Cartan) computation of curvature and compare its speed with the coordinate method', 'Compute the Weyl tensor and the Petrov type for Schwarzschild'],
      },
    },
    {
      slug: 'einsteins-field-equations',
      title: 'Einstein\'s Field Equations',
      description:
        'Physics in curved spacetime, the derivation of the field equations from physical requirements and from the Einstein-Hilbert action, the Newtonian limit and the meaning of the equations, and linearised gravity.',
      lessons: [
        {
          slug: 'physics-in-curved-spacetime',
          title: 'Physics in curved spacetime',
          summary:
            'How matter and fields behave in a given curved spacetime: minimal coupling, local conservation $\\nabla_\\mu T^{\\mu\\nu} = 0$ and why it does not imply global energy conservation, Maxwell in curved spacetime, and observers and measurements.',
          estimatedMinutes: 100,
          objectives: [
            'Apply minimal coupling to write Maxwell\'s equations, the Klein-Gordon equation and fluid equations in curved spacetime',
            'Explain why $\\nabla_\\mu T^{\\mu\\nu} = 0$ expresses local but not global energy conservation',
            'Describe what an observer with four-velocity $U^\\mu$ measures: energy $-p_\\mu U^\\mu$, local time, orthonormal frames',
            'Compute the gravitational redshift between static observers from the metric and Killing energy',
          ],
          concepts: [
            'Minimal coupling ("comma to semicolon")',
            'Covariant conservation $\\nabla_\\mu T^{\\mu\\nu} = 0$',
            'Non-conservation of global energy in curved spacetime',
            'Observers, tetrads and orthonormal frames',
            'Measured energy $E = -p_\\mu U^\\mu$',
            'Static observers and redshift $\\nu_\\infty/\\nu = \\sqrt{-g_{tt}}$',
            'Maxwell equations in curved spacetime',
            'Ambiguities of minimal coupling (curvature couplings)',
          ],
          explanation: `Before asking how matter curves spacetime, learn how a given curved spacetime acts on matter. The rule from module 3: write the special-relativistic law covariantly, then replace $\\eta_{\\mu\\nu} \\to g_{\\mu\\nu}$ and $\\partial_\\mu \\to \\nabla_\\mu$. Free particles obey $U^\\mu\\nabla_\\mu U^\\nu = 0$ (the geodesic equation); a charged particle obeys $mU^\\mu\\nabla_\\mu U^\\nu = qF^\\nu{}_\\mu U^\\mu$; Maxwell becomes $\\nabla_\\mu F^{\\nu\\mu} = \\mu_0J^\\nu$; fluids obey $\\nabla_\\mu T^{\\mu\\nu} = 0$. The prescription can be ambiguous when second derivatives appear (they do not commute in curved space, and terms like $R\\phi^2$ could be added), but for everything in this subject the minimal choice is correct.

$\\nabla_\\mu T^{\\mu\\nu} = 0$ deserves care. In flat space $\\partial_\\mu T^{\\mu\\nu} = 0$ integrates, via Gauss's theorem, to conservation of total energy and momentum. In curved space the $\\Gamma$ terms are not a total divergence, so in general there is **no conserved total energy**: matter exchanges energy with the gravitational field, and gravitational energy cannot be localised (by the equivalence principle you can always transform it away at a point). Conservation is recovered only when the spacetime has a symmetry: if $K^\\mu$ is a Killing vector, $J^\\mu = T^{\\mu\\nu}K_\\nu$ is a conserved current. In the expanding universe there is no timelike Killing vector, and indeed the energy in a comoving volume of radiation decreases as it redshifts (module 6).

**Measurements** are made by observers. An observer is a timelike worldline with four-velocity $U^\\mu$, carrying an orthonormal frame (tetrad) in which local physics looks special-relativistic. A particle with four-momentum $p^\\mu$ has energy $E = -p_\\mu U^\\mu$ as measured by that observer. Combine this with a Killing vector: in a static spacetime, a static observer has $U^\\mu = K^\\mu/\\sqrt{-K\\cdot K}$, the photon's conserved Killing energy is $-p_\\mu K^\\mu$, so the measured frequency scales as $1/\\sqrt{-g_{tt}}$. A photon emitted at $r_1$ and received at $r_2$ has
$$\\frac{\\nu_2}{\\nu_1} = \\sqrt{\\frac{g_{tt}(r_1)}{g_{tt}(r_2)}} ,$$
the exact gravitational redshift, which reduces to $\\Delta\\Phi/c^2$ in the weak field. This is the computation behind GPS, behind the redshift of light from white dwarfs and the S2 star near Sgr A*, and behind the "freezing" of objects falling into black holes as seen from far away.

Read Carroll 4.1-4.2 and Tong 4.1 (and the section on conserved quantities in 3.3); 8.962 lectures 14-15 treat observers carefully.`,
          resources: [
            { ...R.carroll, note: 'Chapter 4, sections 4.1-4.2: physics in curved spacetime, minimal coupling.', primary: true },
            { ...R.tongGR, note: 'Chapter 4.1 and chapter 3.3 on Killing vectors and conserved quantities.' },
            { ...R.mit8962, note: 'Lectures 14-15: stress-energy conservation, observers and measurement in curved spacetime.' },
          ],
          exercises: [
            {
              slug: 'redshift-exact',
              title: 'Exact gravitational redshift',
              prompt:
                'Using the Killing vector $\\partial_t$ and $E = -p_\\mu U^\\mu$, derive $\\nu_2/\\nu_1 = \\sqrt{g_{tt}(r_1)/g_{tt}(r_2)}$ for static observers in a static spacetime. For Schwarzschild compute the redshift factor for light from the surface of the Sun, a neutron star ($1.4M_\\odot$, 12 km) and from $r = 1.5r_s$, and plot $z(r)$ for an emitter approaching the horizon. Compare the Sun\'s value with the measured solar redshift (~636 m/s equivalent).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'local-conservation',
              title: 'Local conservation and Killing currents',
              prompt:
                'Show that $\\nabla_\\mu(T^{\\mu\\nu}K_\\nu) = 0$ if $K$ is a Killing vector and $T$ is symmetric and conserved, using Killing\'s equation $\\nabla_{(\\mu}K_{\\nu)} = 0$. Use the covariant divergence formula to turn this into an ordinary divergence and hence a conserved integral. Then show explicitly for dust in a flat FRW metric $ds^2 = -c^2dt^2 + a(t)^2d\\mathbf x^2$ that $\\nabla_\\mu T^{\\mu0} = 0$ gives $\\rho \\propto a^{-3}$ for matter and $\\rho \\propto a^{-4}$ for radiation, and explain where the radiation energy goes.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'maxwell-curved',
              title: 'Maxwell in curved spacetime',
              prompt:
                'Write Maxwell\'s equations $\\nabla_\\mu F^{\\nu\\mu} = \\mu_0J^\\nu$ using the divergence formula for antisymmetric tensors ($\\nabla_\\mu F^{\\nu\\mu} = |g|^{-1/2}\\partial_\\mu(|g|^{1/2}F^{\\nu\\mu})$). Solve for the electric field of a static point charge in Schwarzschild spacetime (giving the $Q$ term of Reissner-Nordström). Show that in the geometric-optics limit Maxwell\'s equations imply light rays follow null geodesics.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is there no general law of conservation of total energy in general relativity?',
              answerOutline:
                '∇_μT^μν = 0 contains connection terms that are not a total divergence; only with a Killing vector does T^μνK_ν give a conserved current. Gravitational energy cannot be localised.',
            },
            {
              question: 'How does an observer measure the energy of a photon?',
              answerOutline:
                'E = −p_μU^μ, the time component of the photon momentum in the observer\'s local orthonormal frame.',
            },
            {
              question: 'State the minimal-coupling rule and its physical justification.',
              answerOutline:
                'Replace η by g and ∂ by ∇ in covariant special-relativistic laws; justified by the equivalence principle, since in locally inertial coordinates the laws must reduce to special relativity.',
            },
          ],
        },
        {
          slug: 'deriving-the-field-equations',
          title: 'Deriving the Einstein field equations',
          summary:
            'Einstein\'s route to $G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu}$ from the requirements of covariance, conservation and the Newtonian limit, and Hilbert\'s route from the action principle.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the field equations from the requirements that the left side be a symmetric, divergence-free tensor built from the metric and up to second derivatives',
            'Fix the constant $8\\pi G/c^4$ from the Newtonian limit',
            'Vary the Einstein-Hilbert action $S = \\frac{c^4}{16\\pi G}\\int R\\sqrt{-g}\\,d^4x$ to obtain the vacuum equations, and add matter to obtain $T_{\\mu\\nu}$',
            'Explain the cosmological constant, the trace-reversed form $R_{\\mu\\nu} = \\frac{8\\pi G}{c^4}(T_{\\mu\\nu} - \\frac{1}{2}Tg_{\\mu\\nu})$, and why vacuum means $R_{\\mu\\nu} = 0$',
          ],
          concepts: [
            'Requirements on the field equations',
            'Lovelock\'s theorem (uniqueness in 4D)',
            'Einstein field equations',
            'Newtonian limit and the coupling constant $8\\pi G/c^4$',
            'Einstein-Hilbert action',
            'Variation of $\\sqrt{-g}$ and $R_{\\mu\\nu}$; Palatini identity',
            'Matter action and $T_{\\mu\\nu} = -\\frac{2}{\\sqrt{-g}}\\frac{\\delta S_M}{\\delta g^{\\mu\\nu}}$',
            'Cosmological constant and the trace-reversed form',
          ],
          explanation: `Newtonian gravity is $\\nabla^2\\Phi = 4\\pi G\\rho$: second derivatives of the potential equal a source. In the relativistic version the potential is the metric (recall $g_{00} \\approx -(1 + 2\\Phi/c^2)$) and the source is $T_{\\mu\\nu}$, a symmetric conserved tensor. So we need a symmetric tensor $E_{\\mu\\nu}[g]$, built from the metric and its first and second derivatives, linear in the second derivatives, with $\\nabla^\\mu E_{\\mu\\nu} = 0$ identically (so that matter conservation is consistent with the field equations). Last module produced exactly such a tensor: the Einstein tensor. Lovelock's theorem says that in four dimensions it is essentially the only one, up to adding a multiple of $g_{\\mu\\nu}$. Hence
$$G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = \\frac{8\\pi G}{c^4}T_{\\mu\\nu},\\qquad G_{\\mu\\nu} = R_{\\mu\\nu} - \\tfrac{1}{2}Rg_{\\mu\\nu}.$$
The constant is fixed by the Newtonian limit: for static dust with $\\Lambda = 0$, the 00 component reduces to $R_{00} \\approx \\nabla^2\\Phi/c^2 = 4\\pi G\\rho/c^2$, which requires exactly $8\\pi G/c^4$. Einstein reached the equations in November 1915 after years of false starts; read his story in the resources, it shows how hard the conservation requirement was to see.

Taking the trace gives $R = -\\frac{8\\pi G}{c^4}T$ (for $\\Lambda = 0$), so the equations can be written in **trace-reversed** form $R_{\\mu\\nu} = \\frac{8\\pi G}{c^4}(T_{\\mu\\nu} - \\frac{1}{2}Tg_{\\mu\\nu})$. In vacuum this is simply $R_{\\mu\\nu} = 0$. That does not mean flat: the Riemann tensor has 20 components and Ricci only 10; the remaining 10 (the Weyl tensor) describe tidal fields and gravitational waves that propagate through empty space. Baez and Bunn's paper gives a beautiful physical reading: in a small ball of freely falling test particles, $\\ddot V/V = -4\\pi G(\\rho + 3p/c^2)$ (for a perfect fluid), which shows directly that pressure gravitates.

**Hilbert** (simultaneously, 1915) found the equations from an action. The simplest scalar built from the metric is $R$, so take
$$S = \\frac{c^4}{16\\pi G}\\int(R - 2\\Lambda)\\sqrt{-g}\\,d^4x + S_M .$$
Varying with respect to $g^{\\mu\\nu}$ uses $\\delta\\sqrt{-g} = -\\frac{1}{2}\\sqrt{-g}g_{\\mu\\nu}\\delta g^{\\mu\\nu}$ and the Palatini identity (the variation of $R_{\\mu\\nu}$ is a total derivative), giving $G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu}$ from the gravitational part and $T_{\\mu\\nu}$ from the matter part, with $T_{\\mu\\nu} = -\\frac{2}{\\sqrt{-g}}\\delta S_M/\\delta g^{\\mu\\nu}$. The action route is the one used in modern theoretical physics (modified gravity, quantum gravity, string theory).

Read Carroll 4.3-4.5, Tong 4.2-4.3 and 8.962 lectures 16-17; Baez-Bunn throughout. The exercises do both derivations explicitly.`,
          resources: [
            { ...R.carroll, note: 'Chapter 4, sections 4.3-4.5: Einstein\'s equation, the Lagrangian formulation, properties.', primary: true },
            { ...R.tongGR, note: 'Chapter 4, sections 4.2-4.3: the Einstein-Hilbert action and its variation.' },
            {
              title: 'Baez & Bunn — The Meaning of Einstein\'s Equation',
              url: 'https://math.ucr.edu/home/baez/einstein/',
              type: 'article',
              cost: 'free',
              provider: 'UC Riverside (John Baez)',
              note: 'The ball-of-test-particles reading of the field equations, with derivations of Newtonian gravity and the Big Bang.',
            },
            { ...R.susskindGR, note: 'Lectures 5-7 build the field equations step by step.' },
          ],
          exercises: [
            {
              slug: 'newtonian-limit-field-equations',
              title: 'The Newtonian limit of the field equations',
              prompt:
                'For a static weak field $g_{\\mu\\nu} = \\eta_{\\mu\\nu} + h_{\\mu\\nu}$ with $h_{00} = -2\\Phi/c^2$ and slowly moving dust, compute $R_{00}$ to first order in $h$ and show the trace-reversed 00 equation gives $\\nabla^2\\Phi = 4\\pi G\\rho$, fixing the coupling $8\\pi G/c^4$. Show also that $h_{ij} = -2\\Phi\\delta_{ij}/c^2$ (space is curved too), which will double the light-bending angle in module 7.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'einstein-hilbert-variation',
              title: 'Vary the Einstein-Hilbert action',
              prompt:
                'Derive $\\delta\\sqrt{-g} = -\\frac{1}{2}\\sqrt{-g}\\,g_{\\mu\\nu}\\delta g^{\\mu\\nu}$ (use $\\delta\\ln\\det M = \\mathrm{tr}(M^{-1}\\delta M)$), the Palatini identity $\\delta R^\\rho{}_{\\mu\\lambda\\nu} = \\nabla_\\lambda\\delta\\Gamma^\\rho_{\\nu\\mu} - \\nabla_\\nu\\delta\\Gamma^\\rho_{\\lambda\\mu}$, and hence $\\delta(\\sqrt{-g}R) = \\sqrt{-g}G_{\\mu\\nu}\\delta g^{\\mu\\nu}$ + total derivative. Then compute $T_{\\mu\\nu}$ from the scalar-field action $S = -\\frac{1}{2}\\int(g^{\\mu\\nu}\\partial_\\mu\\phi\\partial_\\nu\\phi + m^2\\phi^2)\\sqrt{-g}\\,d^4x$ and from the Maxwell action, and check against module 2.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'ball-of-particles',
              title: 'Baez-Bunn: the field equations in plain words',
              prompt:
                'Show that the 00 component of the trace-reversed field equations, evaluated in the local rest frame of a small ball of test particles initially at rest, gives $\\ddot V/V|_{t=0} = -\\frac{4\\pi G}{c^2}(\\rho c^2 + p_x + p_y + p_z)$. Use it to (a) derive Newton\'s inverse-square law outside a spherical mass, (b) show that for radiation the gravitational effect is twice that of dust of the same energy density, and (c) show that a cosmological constant with $p = -\\rho c^2$ produces accelerated expansion. Write a one-page summary in your own words.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the left-hand side of the field equations be divergence-free?',
              answerOutline:
                'Because ∇_μT^μν = 0 holds for matter; if the geometric side did not satisfy ∇^μE_μν = 0 identically the equations would be inconsistent (or would over-constrain matter).',
            },
            {
              question: 'Does R_μν = 0 mean spacetime is flat?',
              answerOutline:
                'No; only the Ricci part vanishes. The Weyl part of the Riemann tensor can be nonzero, describing tidal fields outside masses and gravitational waves.',
            },
            {
              question: 'How is the constant 8πG/c⁴ determined?',
              answerOutline:
                'By requiring the weak-field, slow-motion limit of the 00 equation to reproduce Poisson\'s equation ∇²Φ = 4πGρ.',
            },
          ],
        },
        {
          slug: 'linearised-gravity',
          title: 'Linearised gravity and the weak-field limit',
          summary:
            'Expanding around flat spacetime: the linearised field equations in Lorenz (harmonic) gauge, gauge freedom as infinitesimal coordinate changes, the field of a static mass, gravitomagnetism, and the wave equation that predicts gravitational waves.',
          estimatedMinutes: 120,
          objectives: [
            'Linearise the Einstein equations for $g_{\\mu\\nu} = \\eta_{\\mu\\nu} + h_{\\mu\\nu}$, $|h| \\ll 1$',
            'Explain gauge freedom $h_{\\mu\\nu} \\to h_{\\mu\\nu} - \\partial_\\mu\\xi_\\nu - \\partial_\\nu\\xi_\\mu$ and impose the Lorenz gauge to get $\\Box\\bar h_{\\mu\\nu} = -\\frac{16\\pi G}{c^4}T_{\\mu\\nu}$',
            'Solve for the weak field of a static mass and of a slowly rotating body (gravitomagnetism, frame dragging)',
            'Show that in vacuum $\\bar h_{\\mu\\nu}$ obeys the wave equation with speed $c$',
          ],
          concepts: [
            'Metric perturbation $h_{\\mu\\nu}$',
            'Trace-reversed perturbation $\\bar h_{\\mu\\nu} = h_{\\mu\\nu} - \\frac{1}{2}h\\eta_{\\mu\\nu}$',
            'Gauge transformations as coordinate changes',
            'Lorenz (harmonic) gauge',
            'Retarded solution and the weak field of a static mass',
            'Gravitoelectromagnetism and frame dragging',
            'Wave equation in vacuum',
            'Limits of linearisation (no self-gravity)',
          ],
          explanation: `Most gravitational fields in the universe are weak: $|\\Phi|/c^2 \\sim 10^{-6}$ at the Sun's surface. Write $g_{\\mu\\nu} = \\eta_{\\mu\\nu} + h_{\\mu\\nu}$ and keep only first order in $h$. The Christoffel symbols become $\\Gamma \\sim \\partial h$, the Riemann tensor $R_{\\mu\\nu\\rho\\sigma} \\sim \\partial\\partial h$, and the field equations become linear partial differential equations in flat spacetime, which you can solve with the tools of electromagnetism.

There is a redundancy. An infinitesimal coordinate change $x^\\mu \\to x^\\mu + \\xi^\\mu$ changes $h_{\\mu\\nu}$ by $-\\partial_\\mu\\xi_\\nu - \\partial_\\nu\\xi_\\mu$ but describes the same physical spacetime (the linearised Riemann tensor is unchanged). This **gauge freedom** is the analogue of $A_\\mu \\to A_\\mu + \\partial_\\mu\\chi$ in electromagnetism, with four functions instead of one. Define the trace-reversed perturbation $\\bar h_{\\mu\\nu} = h_{\\mu\\nu} - \\frac{1}{2}h\\eta_{\\mu\\nu}$ and choose the **Lorenz gauge** $\\partial^\\mu\\bar h_{\\mu\\nu} = 0$. The linearised Einstein equations then reduce to ten decoupled wave equations:
$$\\Box\\bar h_{\\mu\\nu} = -\\frac{16\\pi G}{c^4}T_{\\mu\\nu}.$$
Compare $\\Box A^\\mu = -\\mu_0J^\\mu$. The solution is the retarded integral of the source, propagating at $c$.

**Static mass.** With $T_{00} = \\rho c^2$ only, $\\bar h_{00} = -4\\Phi/c^2$ and the others vanish, so $h_{00} = -2\\Phi/c^2$ and $h_{ij} = -2\\Phi\\delta_{ij}/c^2$:
$$ds^2 = -\\left(1 + \\frac{2\\Phi}{c^2}\\right)c^2dt^2 + \\left(1 - \\frac{2\\Phi}{c^2}\\right)d\\mathbf x^2 .$$
Both time and space are warped equally; the spatial part does not affect slow particles but doubles the deflection of light and causes the Shapiro delay (module 7). **Moving sources** give $\\bar h_{0i} \\propto$ mass current, a "gravitomagnetic" vector potential: a rotating body drags inertial frames around it (the Lense-Thirring effect), measured by Gravity Probe B and by laser-ranged satellites. And in **vacuum** $\\Box\\bar h_{\\mu\\nu} = 0$: perturbations of spacetime travel at the speed of light. Einstein found this in 1916 and doubted for decades whether the waves were physical or a gauge artefact; module 6 settles it by computing their effect on the Riemann tensor, and LIGO settled it experimentally.

Linear theory omits the gravitational field's own energy as a source, so it cannot describe strong fields, the inspiral's back-reaction, or black holes; those need the full equations or careful post-Newtonian expansions. Read Carroll chapter 6 (sections 6.1-6.4 of the notes; 7 in the book), Tong chapter 5 and 8.962 lectures on linearised gravity.`,
          resources: [
            { ...R.carroll, note: 'Chapter 6 (Weak fields and gravitational radiation), sections on the linearised equations and gauge.', primary: true },
            { ...R.tongGR, note: 'Chapter 5 (When gravity is weak): linearised theory, gauge, Newtonian limit.' },
            { ...R.mit8962, note: 'Lectures on linearised gravity and gauge transformations.' },
          ],
          exercises: [
            {
              slug: 'linearised-equations-derivation',
              title: 'Derive the linearised field equations',
              prompt:
                'Compute the linearised Riemann tensor, show it is gauge invariant, derive the linearised Ricci tensor and Einstein tensor, and show that in Lorenz gauge $G_{\\mu\\nu} = -\\frac{1}{2}\\Box\\bar h_{\\mu\\nu}$. Show that a gauge vector satisfying $\\Box\\xi_\\mu = \\partial^\\nu\\bar h_{\\mu\\nu}$ always exists to reach Lorenz gauge, and that residual gauge freedom with $\\Box\\xi = 0$ remains (used in module 6 for the TT gauge).',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'weak-field-static-mass',
              title: 'Weak field of a static mass and of a rotating body',
              prompt:
                'Solve $\\nabla^2\\bar h_{00} = 16\\pi G\\rho/c^2$ for a point mass and show the resulting metric agrees with Schwarzschild (module 5) expanded to first order in $r_s/r$ in isotropic coordinates. Then for a body of angular momentum $\\mathbf J$ solve for $\\bar h_{0i}$ and show $h_{0i} = -\\frac{2G}{c^3r^3}(\\mathbf J\\times\\mathbf r)_i$. Compute the Lense-Thirring precession of a gyroscope in a polar orbit at 642 km around Earth (39 mas/yr) and compare with the Gravity Probe B result.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'gauge-artefacts',
              title: 'Gauge artefacts versus physics',
              prompt:
                'Show that $h_{\\mu\\nu} = \\partial_\\mu\\xi_\\nu + \\partial_\\nu\\xi_\\mu$ for $\\xi_\\mu = \\epsilon_\\mu\\cos(k\\cdot x)$ satisfies the vacuum wave equation but has vanishing linearised Riemann tensor, so it is pure gauge. Compute the Riemann tensor of a genuine plane wave (module 6 form) to show it does not vanish. Write a paragraph on how Einstein\'s 1936 doubts and the 1957 Chapel Hill "sticky bead" argument settled the reality of gravitational waves.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is gauge freedom in linearised gravity and what is its physical meaning?',
              answerOutline:
                'h → h − ∂ξ − ∂ξ from infinitesimal coordinate changes; it leaves the linearised Riemann tensor unchanged, so it does not change any physical (tidal) effect.',
            },
            {
              question: 'Why does the weak-field metric of a mass include a spatial part h_ij = −2Φδ_ij/c²?',
              answerOutline:
                'The field equations for static dust give h̄₀₀ = −4Φ/c² only; trace reversal distributes this equally to h₀₀ and h_ij. Space is curved as well as time.',
            },
            {
              question: 'What does linearised theory fail to capture?',
              answerOutline:
                'Non-linear self-interaction of gravity: the field\'s own energy as a source, strong fields near compact objects, back-reaction of radiation on orbits beyond leading order, horizons.',
            },
          ],
        },
      ],
    },
    {
      slug: 'schwarzschild-solution-and-black-holes',
      title: 'The Schwarzschild Solution and Black Holes',
      description:
        'The unique spherically symmetric vacuum solution, orbits of massive particles and light around it, the horizon and the coordinates that cross it, and rotating (Kerr) black holes.',
      lessons: [
        {
          slug: 'the-schwarzschild-metric',
          title: 'The Schwarzschild metric and Birkhoff\'s theorem',
          summary:
            'Solve $R_{\\mu\\nu} = 0$ for a static spherically symmetric spacetime, identify the mass from the Newtonian limit, prove Birkhoff\'s theorem, and build interior stellar models with the Tolman-Oppenheimer-Volkoff equation.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the Schwarzschild metric $ds^2 = -(1 - r_s/r)c^2dt^2 + (1 - r_s/r)^{-1}dr^2 + r^2d\\Omega^2$ from the vacuum field equations',
            'State Birkhoff\'s theorem and explain why it forbids monopole gravitational radiation',
            'Interpret the coordinates $t$ and $r$ physically (areal radius, static observers) and compute proper distances and times',
            'Derive and numerically integrate the Tolman-Oppenheimer-Volkoff equation for a neutron star and find a maximum mass',
          ],
          concepts: [
            'Static, spherically symmetric ansatz',
            'Vacuum field equations $R_{\\mu\\nu} = 0$',
            'Schwarzschild radius $r_s = 2GM/c^2$',
            'Birkhoff\'s theorem',
            'Areal radius and proper radial distance',
            'Interior solution and the TOV equation',
            'Buchdahl bound $R > \\frac{9}{8}r_s$',
            'Maximum neutron-star mass',
          ],
          explanation: `The most important exact solution comes from the simplest assumptions. Take a static, spherically symmetric spacetime and write $ds^2 = -e^{2\\alpha(r)}c^2dt^2 + e^{2\\beta(r)}dr^2 + r^2d\\Omega^2$, where $r$ is defined so that the sphere at $r$ has area $4\\pi r^2$ (the **areal radius**). Compute the Ricci tensor (your SymPy code will do it in seconds) and set it to zero: $R_{tt}$ and $R_{rr}$ give $\\alpha' + \\beta' = 0$, and $R_{\\theta\\theta}$ gives $e^{-2\\beta}(1 - 2r\\beta') = 1$, so $e^{-2\\beta} = 1 - r_s/r$ with an integration constant $r_s$. The Newtonian limit $g_{tt} \\approx -(1 + 2\\Phi/c^2)$ with $\\Phi = -GM/r$ identifies $r_s = 2GM/c^2$:
$$ds^2 = -\\left(1 - \\frac{r_s}{r}\\right)c^2dt^2 + \\left(1 - \\frac{r_s}{r}\\right)^{-1}dr^2 + r^2d\\Omega^2 .$$
Schwarzschild found this in 1916, within weeks of the field equations, while serving on the Russian front. $r_s$ is 3 km for the Sun, 9 mm for the Earth.

**Birkhoff's theorem** strengthens the result: any spherically symmetric vacuum solution is Schwarzschild, even if the source is time dependent. A pulsating or collapsing spherical star has exactly this exterior, so there is no monopole (or "breathing") gravitational radiation, just as there is no monopole electromagnetic radiation.

Interpret the coordinates carefully. $t$ is the time of static observers at infinity; a static observer at $r$ ticks at $d\\tau = \\sqrt{1 - r_s/r}\\,dt$. $r$ is not radial distance: the proper distance between $r_1$ and $r_2$ is $\\int dr/\\sqrt{1 - r_s/r}$, larger than $r_2 - r_1$ (space is curved; the "Flamm paraboloid" embedding diagram makes this visible). The metric components misbehave at $r = r_s$; whether that is physical is the subject of lesson 3.

Inside a star the right-hand side is a perfect fluid. The field equations then give $m(r) = \\int 4\\pi r^2\\rho\\,dr$ and the **Tolman-Oppenheimer-Volkoff equation**
$$\\frac{dp}{dr} = -\\frac{G(\\rho + p/c^2)(m + 4\\pi r^3p/c^2)}{r^2(1 - 2Gm/rc^2)} ,$$
the relativistic hydrostatic equilibrium. Every correction relative to Newton (pressure contributing to inertia, to gravitating mass, and the $1 - 2Gm/rc^2$ factor) makes gravity stronger. Integrating with a neutron-star equation of state gives a maximum mass around $2$-$2.3M_\\odot$, consistent with the heaviest pulsars observed, and Buchdahl's theorem shows no static star can have $R < \\frac{9}{8}r_s$. Beyond that, collapse is inevitable.

Read Carroll chapter 7 (Schwarzschild; chapter 5 in the book), Tong 6.1, and 8.962 lectures 18-19. The TOV integration links to stellar-astrophysics.`,
          resources: [
            { ...R.carroll, note: 'Chapter 7 (The Schwarzschild solution and black holes), sections 7.1-7.2 (derivation, Birkhoff).', primary: true },
            { ...R.tongGR, note: 'Chapter 6, section 6.1: the Schwarzschild solution.' },
            { ...R.mit8962, note: 'Lectures 18-19: Schwarzschild, Birkhoff, stellar interiors and TOV.' },
            { ...R.carrollBook, note: 'Chapter 5 of the book has the TOV derivation in detail. Free alternative: Tong 6.1 and the 8.962 notes.' },
          ],
          exercises: [
            {
              slug: 'derive-schwarzschild',
              title: 'Derive the Schwarzschild solution',
              prompt:
                'With your SymPy curvature code, compute $R_{\\mu\\nu}$ for the ansatz $-e^{2\\alpha(r)}c^2dt^2 + e^{2\\beta(r)}dr^2 + r^2d\\Omega^2$, solve the vacuum equations, and identify $r_s$ from the Newtonian limit. Then allow $\\alpha$ and $\\beta$ to depend on $t$ and show that the vacuum equations force $\\beta$ to be time independent and $\\alpha$ to be time independent up to a redefinition of $t$ (Birkhoff). Compute the Kretschmann scalar.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'proper-distances-embedding',
              title: 'Proper distances and the embedding diagram',
              prompt:
                'Compute the proper radial distance from $r = r_s$ to $r = 2r_s$ and to $r = 10r_s$ analytically. Show that the equatorial slice $t = $ const, $\\theta = \\pi/2$ can be embedded in flat 3D space as the surface $z = 2\\sqrt{r_s(r - r_s)}$ (Flamm\'s paraboloid) and plot it. Compute the proper time per coordinate time for static observers at $r = 1.1r_s$, $2r_s$, $10r_s$, and the proper acceleration needed to hover there; show it diverges at $r_s$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'tov-neutron-star',
              title: 'Integrate the TOV equation for neutron stars',
              prompt:
                'Derive the TOV equation from the field equations with a perfect fluid. Integrate it (solve_ivp with an event at $p = 0$) for a polytrope $p = K\\rho^\\Gamma$ with $\\Gamma = 2$ and $K$ chosen so that a $1.4M_\\odot$ star has $R \\approx 12$ km, over a range of central densities. Plot $M(R)$ and $M(\\rho_c)$, locate the maximum mass, and compare with the Newtonian hydrostatic result for the same equation of state. Overlay the measured masses of PSR J0740+6620 ($2.08M_\\odot$) and the NICER radius.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the Schwarzschild radius of the Sun and of the Earth?',
              answerOutline: 'r_s = 2GM/c²: about 2.95 km for the Sun and 8.9 mm for the Earth.',
            },
            {
              question: 'What does Birkhoff\'s theorem imply for a spherically pulsating star?',
              answerOutline:
                'Its exterior is exactly static Schwarzschild; the pulsation emits no gravitational radiation (no monopole radiation).',
            },
            {
              question: 'Why is there a maximum mass for neutron stars in general relativity?',
              answerOutline:
                'In the TOV equation pressure adds to inertia and to the gravitating mass, and the (1 − 2Gm/rc²) factor strengthens gravity; above some central density added pressure increases gravity faster than support, so M(ρ_c) has a maximum.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/stellar-structure-equations/hydrostatic-equilibrium-and-the-virial-theorem'],
        },
        {
          slug: 'orbits-in-schwarzschild',
          title: 'Orbits of particles and light in Schwarzschild spacetime',
          summary:
            'Conserved energy and angular momentum, the effective potential, perihelion precession, the innermost stable circular orbit, the photon sphere, and light deflection, all derived and integrated numerically.',
          estimatedMinutes: 140,
          objectives: [
            'Derive the radial equation $\\frac{1}{2}\\dot r^2 + V_{eff}(r) = \\mathcal E$ with $V_{eff} = -\\frac{GM}{r} + \\frac{L^2}{2r^2} - \\frac{GML^2}{c^2r^3}$',
            'Classify orbits and derive the ISCO at $r = 3r_s$ and the photon sphere at $r = 1.5r_s$',
            'Derive the perihelion advance $\\Delta\\phi = 6\\pi GM/c^2a(1 - e^2)$ per orbit and the light deflection $4GM/bc^2$',
            'Integrate orbits numerically and measure the precession and deflection from the simulation',
          ],
          concepts: [
            'Killing energy $E$ and angular momentum $L$',
            'Effective potential with the GR $1/r^3$ term',
            'Circular orbits; stable and unstable',
            'Innermost stable circular orbit (ISCO)',
            'Perihelion precession',
            'Photon sphere and capture cross-section',
            'Light deflection and impact parameter',
            'Binet (u = 1/r) equation',
          ],
          explanation: `Use the two Killing vectors of Schwarzschild. Restricting to the equatorial plane, the conserved quantities per unit mass are $E = (1 - r_s/r)c^2\\dot t$ and $L = r^2\\dot\\phi$ (dots are $d/d\\tau$). Inserting them into the normalisation $g_{\\mu\\nu}\\dot x^\\mu\\dot x^\\nu = -c^2$ gives a one-dimensional energy equation:
$$\\frac{1}{2}\\dot r^2 + V_{eff}(r) = \\frac{E^2 - c^4}{2c^2},\\qquad V_{eff}(r) = -\\frac{GM}{r} + \\frac{L^2}{2r^2} - \\frac{GML^2}{c^2r^3}.$$
The first two terms are Newton's effective potential. The third, an attractive $1/r^3$ term, is general relativity's contribution, and it changes everything at small $r$.

**Circular orbits** sit at extrema of $V_{eff}$. For large $L$ there are two, a stable outer one and an unstable inner one; as $L$ decreases they merge at $L^2 = 3r_s^2c^2$, at radius $r = 3r_s = 6GM/c^2$, the **innermost stable circular orbit**. Inside it, matter plunges. The ISCO sets the inner edge of accretion discs and hence the radiative efficiency of black holes (5.7% of $mc^2$ for Schwarzschild, compared with 0.7% for hydrogen fusion), and it marks the end of the inspiral phase in gravitational-wave signals. For light, with $-c^2$ replaced by 0 in the normalisation, the effective potential has a single maximum at $r = 1.5r_s$, the **photon sphere** of unstable circular light orbits, whose image is the bright ring seen by the Event Horizon Telescope.

**Perihelion advance.** In terms of $u = 1/r$ and $\\phi$ the orbit equation is $u'' + u = GM/L^2 + 3GMu^2/c^2$. The last term is small for the planets; perturbation theory gives a precession per orbit of
$$\\Delta\\phi = \\frac{6\\pi GM}{c^2a(1 - e^2)},$$
which for Mercury is 0.1035 arcsec per orbit, 43 arcsec per century: precisely the anomaly that Le Verrier had found in 1859 and that Einstein explained in November 1915, the first success of the theory. **Light bending**: for null geodesics $u'' + u = 3GMu^2/c^2$, and to first order a ray with impact parameter $b$ is deflected by $\\delta = 4GM/bc^2 = 1.75''$ at the solar limb, twice the equivalence-principle (Newtonian corpuscle) value; module 7 covers the 1919 and modern measurements.

All of these should be checked numerically. Integrate the geodesic equations (or the $u(\\phi)$ equation) with high accuracy, measure the angle between successive perihelia and the asymptotic deflection angle, and compare with the formulas; then go into the strong-field regime ($r \\sim 5r_s$) where the formulas fail and only the numerics are right. Read Carroll 7.3-7.4, Tong 6.2-6.3, Taylor-Wheeler-Bertschinger chapters 8-9, and 8.962 lectures 20-21.`,
          resources: [
            { ...R.carroll, note: 'Chapter 7, sections on geodesics of Schwarzschild, precession and light bending.', primary: true },
            { ...R.tongGR, note: 'Chapter 6, sections 6.2-6.3: geodesics, perihelion, light bending, ISCO.' },
            { ...R.exploringBH, note: 'Chapters on orbits and light around black holes, with excellent physical commentary.' },
            { ...R.mit8962, note: 'Lectures 20-21: Schwarzschild orbits.' },
            { ...R.einsteinpy, note: 'Use its Schwarzschild geodesic module to cross-check your integrations.' },
          ],
          exercises: [
            {
              slug: 'effective-potential-analysis',
              title: 'Effective potential, ISCO and photon sphere',
              prompt:
                'Derive $V_{eff}$ for massive particles and for light. Find the circular-orbit radii as functions of $L$, show they merge at the ISCO $r = 3r_s$, and compute the energy per unit mass at the ISCO, $E/c^2 = \\sqrt{8/9}$, hence the binding efficiency $1 - \\sqrt{8/9} = 5.7\\%$. For light, find the photon sphere and the critical impact parameter $b_c = \\frac{3\\sqrt3}{2}r_s$; compute the angular diameter of the shadow of Sgr A* ($4.3\\times10^6M_\\odot$ at 8.3 kpc) and compare with the EHT ring (~52 μas). Plot $V_{eff}$ for several $L$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'perihelion-perturbation',
              title: 'Derive the perihelion advance',
              prompt:
                'From the geodesic equation derive the Binet equation $u\'\' + u = GM/L^2 + 3GMu^2/c^2$. Treat the last term perturbatively about the Newtonian ellipse $u_0 = (1 + e\\cos\\phi)/a(1 - e^2)$, find the secular term, and derive $\\Delta\\phi = 6\\pi GM/c^2a(1 - e^2)$. Evaluate for Mercury, Venus, Earth, the asteroid Icarus and the S2 star around Sgr A* (period 16 yr, $e = 0.88$, $a = 1000$ AU), giving arcsec per orbit and per century where relevant.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'orbit-integration',
              title: 'Measure precession and deflection numerically',
              prompt:
                'Integrate timelike geodesics in Schwarzschild for orbits with semi-major axis $a = 100, 30, 10\\,r_s$ and $e = 0.5$, measure the perihelion shift per orbit from successive minima of $r(\\phi)$, and compare with the formula (show the relative deviation grows as $a$ decreases). Integrate an orbit with $a$ near the ISCO showing zoom-whirl behaviour. Then integrate null geodesics from infinity with impact parameters from $10b_c$ down to $1.001b_c$, plot the trajectories, and plot the deflection angle versus $b$ together with $4GM/bc^2$ and the logarithmic divergence near $b_c$.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What feature of the Schwarzschild effective potential is absent in Newtonian gravity, and what are its consequences?',
              answerOutline:
                'The attractive −GML²/c²r³ term; it causes perihelion precession, makes the centrifugal barrier finite (orbits can plunge), and creates the ISCO and the photon sphere.',
            },
            {
              question: 'Where is the ISCO for a Schwarzschild black hole and why does it matter astrophysically?',
              answerOutline:
                'r = 3r_s = 6GM/c²; it is the inner edge of thin accretion discs, sets the 5.7% efficiency, and marks the transition from inspiral to plunge in binary mergers.',
            },
            {
              question: 'Why is the GR light deflection twice the Newtonian value?',
              answerOutline:
                'Newton/equivalence accounts only for the warping of time (g₀₀); the spatial curvature (h_ij = −2Φδ_ij/c²) contributes an equal amount for light, which moves at c.',
            },
          ],
        },
        {
          slug: 'horizons-and-black-holes',
          title: 'Event horizons, Kruskal coordinates and gravitational collapse',
          summary:
            'The coordinate singularity at $r_s$ versus the curvature singularity at $r = 0$, infall as seen by the falling observer and by a distant one, Eddington-Finkelstein and Kruskal-Szekeres coordinates, Penrose diagrams, and the formation of black holes by collapse.',
          estimatedMinutes: 130,
          objectives: [
            'Show that $r = r_s$ is a coordinate singularity (finite curvature, finite proper infall time) and $r = 0$ a curvature singularity',
            'Contrast the infall time measured by the falling observer with the infinite coordinate time measured from far away',
            'Construct ingoing Eddington-Finkelstein and Kruskal-Szekeres coordinates, draw light cones across the horizon, and read the causal structure from a Penrose diagram',
            'Describe Oppenheimer-Snyder collapse and the role of trapped surfaces and the singularity theorems',
          ],
          concepts: [
            'Coordinate vs curvature singularities',
            'Event horizon as a null surface',
            'Proper infall time vs coordinate time',
            'Ingoing Eddington-Finkelstein coordinates',
            'Kruskal-Szekeres extension: four regions, white hole, Einstein-Rosen bridge',
            'Penrose (conformal) diagrams',
            'Oppenheimer-Snyder collapse',
            'Trapped surfaces and the Penrose singularity theorem',
          ],
          explanation: `At $r = r_s$ the Schwarzschild $g_{tt}$ vanishes and $g_{rr}$ diverges. Is something physical happening? Check invariants: the Kretschmann scalar $12r_s^2/r^6$ is perfectly finite there. Check what an infalling observer experiences: the radial geodesic from rest at $r_0$ reaches $r_s$, and indeed $r = 0$, in a finite proper time (for a fall from rest at infinity, $\\tau = \\frac{2r_s}{3c}[(r/r_s)^{3/2}]$ evaluated between the limits). Nothing special is felt at $r_s$; for a supermassive black hole the tidal forces there are gentle. Yet the coordinate time $t$ to reach $r_s$ is infinite, and a distant observer sees the infaller's signals redshifted exponentially, with an $e$-folding time of order $r_s/c$, freezing and fading at the horizon. Both descriptions are correct; they refer to different observers, and $t$ is simply a bad coordinate at $r_s$, the way longitude is bad at the pole.

Better coordinates make this explicit. Define the tortoise coordinate $r^* = r + r_s\\ln|r/r_s - 1|$, in which radial light rays are $t = \\pm r^* + $ const, and the ingoing null coordinate $v = ct + r^*$. In **Eddington-Finkelstein** coordinates $(v, r, \\theta, \\phi)$ the metric $ds^2 = -(1 - r_s/r)dv^2 + 2\\,dv\\,dr + r^2d\\Omega^2$ is regular at $r_s$. Draw light cones: outside they open upward as usual; at $r_s$ the outgoing edge is vertical (light trying to escape stays at $r_s$); inside both edges point toward smaller $r$. The **event horizon** is the null surface from inside which no signal reaches infinity, and inside it $r$ is a timelike coordinate: moving toward $r = 0$ is as unavoidable as moving into the future. The singularity at $r = 0$, where curvature diverges, is a moment in time for anything inside, not a place.

**Kruskal-Szekeres** coordinates $(T, X)$ cover the maximal analytic extension: light rays are at 45° everywhere, the horizon is $T = \\pm X$, and the spacetime has four regions: our exterior, the black-hole interior, a white-hole interior, and a second exterior joined to ours by a non-traversable Einstein-Rosen bridge. Compactifying gives the **Penrose diagram**, the standard tool for reading causal structure. Real black holes form by collapse and have only the exterior and black-hole regions: Oppenheimer and Snyder (1939) solved the collapse of a pressureless ball exactly, gluing a collapsing FRW interior to Schwarzschild. Penrose (1965, Nobel 2020) proved that once a trapped surface forms, a singularity follows under reasonable energy conditions; collapse is generic, not an artefact of symmetry.

Read Carroll 7.5-7.7, Tong 6.1.x on Eddington-Finkelstein and Kruskal, Exploring Black Holes chapters 3 and 7, and 8.962 lectures 22-23.`,
          resources: [
            { ...R.carroll, note: 'Chapter 7, sections on singularities, Kruskal coordinates, Penrose diagrams, collapse.', primary: true },
            { ...R.tongGR, note: 'Chapter 6: Eddington-Finkelstein, Kruskal and Penrose diagrams.' },
            { ...R.exploringBH, note: 'Chapters on the horizon, plunging into a black hole and what the infaller sees.' },
            { ...R.mit8224, note: 'Lecture notes and problem sets for a gentler, observer-centred treatment.' },
          ],
          exercises: [
            {
              slug: 'infall-times',
              title: 'Infall: proper time versus coordinate time',
              prompt:
                'For radial infall from rest at $r_0 = 10r_s$, compute $\\tau(r)$ and $t(r)$ (numerically or with the cycloid parametrisation) and plot both: $\\tau$ reaches 0 finitely, $t$ diverges logarithmically at $r_s$. Compute the proper time from $r_s$ to the singularity for a $10M_\\odot$ black hole (~$10^{-4}$ s max) and for Sgr A* (~minutes). Compute the redshift of signals sent outward by the infaller at constant proper-time intervals as received at large $r$, and show it grows as $e^{t/2r_s c^{-1}}$ at late times.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'eddington-finkelstein-kruskal',
              title: 'Coordinates that cross the horizon',
              prompt:
                'Derive the tortoise coordinate, the ingoing Eddington-Finkelstein form of the metric, and the Kruskal-Szekeres coordinates $T, X$ with the metric $ds^2 = \\frac{4r_s^3}{r}e^{-r/r_s}(-dT^2 + dX^2) + r^2d\\Omega^2$. Plot a Kruskal diagram with curves of constant $r$ and $t$, the horizon, the singularity $T^2 - X^2 = 1$, and the worldline of an infalling observer with light cones. Then draw the Penrose diagram of the collapsing star (Oppenheimer-Snyder) by hand.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'light-cones-plot',
              title: 'Light cones near the horizon',
              prompt:
                'In ingoing Eddington-Finkelstein coordinates, compute the two radial null directions $dr/dv$ at each $r$ and plot light-cone glyphs on a $(r, v)$ diagram from $0.2r_s$ to $3r_s$. Show that at $r < r_s$ both future-directed null directions have $dr/dv < 0$. Write a paragraph explaining in these terms why no force can hold a particle at fixed $r$ inside the horizon.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you show that r = r_s is not a physical singularity?',
              answerOutline:
                'Curvature invariants (e.g. Kretschmann 12r_s²/r⁶) are finite there; infalling observers cross it in finite proper time; coordinates such as Eddington-Finkelstein are regular there.',
            },
            {
              question: 'Inside the horizon, why must every observer reach r = 0?',
              answerOutline:
                'r becomes timelike: all future-directed timelike and null directions point to decreasing r, so reaching r = 0 is as inevitable as the future.',
            },
            {
              question: 'What does the Penrose singularity theorem establish?',
              answerOutline:
                'If a trapped surface forms and the null energy condition holds (with global hyperbolicity), spacetime is geodesically incomplete: singularities are generic in collapse, not artefacts of symmetry.',
            },
          ],
        },
        {
          slug: 'rotating-black-holes-and-black-hole-thermodynamics',
          title: 'Rotating black holes, the no-hair theorem and black hole thermodynamics',
          summary:
            'The Kerr metric, frame dragging and the ergosphere, the Penrose process and the spin dependence of the ISCO, the no-hair theorem, the area theorem, and Hawking radiation.',
          estimatedMinutes: 120,
          objectives: [
            'Write the Kerr metric in Boyer-Lindquist coordinates and locate the horizons and ergosphere',
            'Explain frame dragging, the ergosphere and the Penrose process for extracting rotational energy',
            'Compute the ISCO and radiative efficiency as functions of spin, from 5.7% to 42%',
            'State the no-hair theorem, Hawking\'s area theorem, the four laws of black hole mechanics and the Hawking temperature $T = \\hbar c^3/8\\pi GMk_B$',
          ],
          concepts: [
            'Kerr metric and spin parameter $a = J/Mc$',
            'Outer and inner horizons $r_\\pm$',
            'Ergosphere and static limit',
            'Frame dragging and ZAMO observers',
            'Penrose process and superradiance',
            'Spin-dependent ISCO and efficiency',
            'No-hair theorem (Kerr-Newman family)',
            'Area theorem, black hole thermodynamics, Hawking radiation',
          ],
          explanation: `Astrophysical black holes rotate. Kerr (1963) found the exact solution; in Boyer-Lindquist coordinates with $G = c = 1$,
$$ds^2 = -\\left(1 - \\frac{2Mr}{\\Sigma}\\right)dt^2 - \\frac{4Mar\\sin^2\\theta}{\\Sigma}dt\\,d\\phi + \\frac{\\Sigma}{\\Delta}dr^2 + \\Sigma\\,d\\theta^2 + \\left(r^2 + a^2 + \\frac{2Ma^2r\\sin^2\\theta}{\\Sigma}\\right)\\sin^2\\theta\\,d\\phi^2,$$
with $\\Sigma = r^2 + a^2\\cos^2\\theta$, $\\Delta = r^2 - 2Mr + a^2$, and $a = J/M$. For $a = 0$ it is Schwarzschild. Horizons sit where $\\Delta = 0$: $r_\\pm = M \\pm\\sqrt{M^2 - a^2}$, so $|a| \\le M$; a larger spin would expose a naked singularity, which cosmic censorship forbids.

The $dt\\,d\\phi$ term means rotating spacetime **drags inertial frames**: observers with zero angular momentum rotate with angular velocity $\\omega = -g_{t\\phi}/g_{\\phi\\phi}$. Between the outer horizon and the surface where $g_{tt} = 0$, $r = M + \\sqrt{M^2 - a^2\\cos^2\\theta}$, lies the **ergosphere**, where dragging is so strong that no observer can remain static; everything must co-rotate, although escape is still possible. Inside it the Killing energy of a particle can be negative, so a particle that splits in the ergosphere, dropping a negative-energy fragment into the hole, can emerge with more energy than it brought: the **Penrose process**, which extracts rotational energy and spins the hole down. Its wave analogue is superradiance; its magnetic analogue (Blandford-Znajek) likely powers relativistic jets.

For prograde orbits the ISCO moves inward as spin increases, from $6M$ at $a = 0$ to $M$ at $a = M$, and the efficiency of a thin accretion disc rises from 5.7% to 42%. Fitting the inner edge of discs (X-ray reflection spectroscopy, continuum fitting) and gravitational-wave ringdown measure black-hole spins, many of them large.

The **no-hair theorem**: stationary black holes in Einstein-Maxwell theory are completely described by mass, spin and charge (the Kerr-Newman family). Everything else about the collapsing matter is radiated away or swallowed. Hawking's **area theorem** says the total horizon area never decreases classically, which, together with surface gravity $\\kappa$ being constant on the horizon, led to four laws of black hole mechanics formally identical to thermodynamics. Hawking (1974) showed the analogy is literal: quantum fields near the horizon make black holes radiate as blackbodies at
$$T_H = \\frac{\\hbar c^3}{8\\pi GMk_B} \\approx 6\\times10^{-8}\\ \\mathrm{K}\\,\\frac{M_\\odot}{M},$$
with entropy $S = k_BA/4\\ell_P^2$. Solar-mass holes are far colder than the CMB and grow; the information question this raises is still open. The thermodynamics subject provides the concepts.

Read Carroll chapter 7 (Kerr), Visser's introduction to Kerr, Tong 6.3, and 8.962 lectures 24-25. The exercises compute the spin dependence numerically.`,
          resources: [
            {
              title: 'Visser — The Kerr spacetime: A brief introduction (arXiv 0706.0622)',
              url: 'https://arxiv.org/abs/0706.0622',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections 1-5: forms of the metric, horizons, ergosphere.',
              primary: true,
            },
            { ...R.carroll, note: 'Chapter 7, final sections on charged and rotating black holes and Hawking radiation (see also chapter 9 of the book).' },
            { ...R.tongGR, note: 'Chapter 6, section on Kerr black holes, the ergoregion and the Penrose process.' },
            { ...R.mit8962, note: 'Lectures 24-25: Kerr spacetime and black hole thermodynamics.' },
          ],
          exercises: [
            {
              slug: 'kerr-structure',
              title: 'Horizons, ergosphere and frame dragging in Kerr',
              prompt:
                'With SymPy, verify the Kerr metric satisfies $R_{\\mu\\nu} = 0$ (this is a good stress test of your code; simplify carefully). Plot the outer and inner horizons and the ergosurface in the $(x, z)$ plane for $a/M = 0.5, 0.9, 0.998$. Compute the frame-dragging angular velocity at the horizon $\\Omega_H = a/(r_+^2 + a^2)$ and evaluate the horizon rotation period for a $10M_\\odot$ hole with $a = 0.9M$.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'spin-dependent-isco',
              title: 'ISCO and efficiency versus spin',
              prompt:
                'Implement the Bardeen-Press-Teukolsky formula for the equatorial ISCO radius as a function of $a/M$ for prograde and retrograde orbits, and the energy per unit mass at the ISCO. Plot $r_{ISCO}(a)$ and the efficiency $1 - E_{ISCO}$ from $a = -M$ to $a = M$. Verify three points by numerically finding the minimum of the effective potential for equatorial Kerr geodesics. Discuss what $a = 0.998$ (Thorne\'s limit) implies for quasar efficiencies.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'hawking-temperature',
              title: 'Black hole thermodynamics by the numbers',
              prompt:
                'Compute the Hawking temperature, entropy (in units of $k_B$), luminosity (Stefan-Boltzmann with the horizon area, as an estimate) and evaporation time $t \\sim 5120\\pi G^2M^3/\\hbar c^4$ for black holes of $1M_\\odot$, $10^{-19}M_\\odot$ ($\\sim 10^{11}$ kg) and $4\\times10^6M_\\odot$. Find the mass whose Hawking temperature equals the CMB temperature. Show that two merging Schwarzschild holes of mass $M$ can radiate at most $(2 - \\sqrt2)M c^2$ by the area theorem, and compare with GW150914\'s ~5% radiated.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the ergosphere and why can energy be extracted from it?',
              answerOutline:
                'The region between the outer horizon and the static limit (g_tt = 0) where frame dragging forbids static observers; there the Killing energy of a particle can be negative, enabling the Penrose process.',
            },
            {
              question: 'What does the no-hair theorem say?',
              answerOutline:
                'A stationary black hole in Einstein-Maxwell theory is fully characterised by mass, angular momentum and charge (Kerr-Newman); other details of the progenitor are lost.',
            },
            {
              question: 'Why is black hole thermodynamics more than an analogy?',
              answerOutline:
                'Hawking showed quantum fields make black holes radiate thermally at T = ħκ/2πck_B, so the area really is an entropy S = k_BA/4ℓ_P² and the laws of black-hole mechanics are thermodynamic laws.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/quantum-statistics/photons-phonons-and-blackbody-radiation'],
        },
      ],
      project: {
        slug: 'black-hole-imaging',
        title: 'Imaging a black hole by backward ray tracing',
        description: `Write a ray tracer that integrates null geodesics backward from a virtual camera at large distance through a Schwarzschild (and optionally Kerr) spacetime. Place a thin, optically thick accretion disc in the equatorial plane from the ISCO outward with a temperature profile $T \\propto r^{-3/4}$, and colour each pixel by the disc emission with the full redshift factor (gravitational plus Doppler from the disc's orbital motion) applied as $I_{obs} = g^4I_{em}$.

Produce images at inclinations of 10°, 60° and 85°, showing the lensed far side of the disc, the photon ring and the shadow, and the brightness asymmetry from Doppler beaming. Compare the shadow diameter with $2\\sqrt{27}\\,GM/c^2$ and with the Event Horizon Telescope images of M87* and Sgr A*.`,
        deliverables: [
          'Ray tracer code with validation (deflection angle of single rays against the weak-field formula and the critical impact parameter)',
          'Images at three inclinations and a short report explaining every visible feature physically',
        ],
        estimatedHours: 14,
        stretchGoals: ['Extend to Kerr and show the shadow asymmetry for a = 0.9', 'Render a sequence showing a hot spot orbiting at the ISCO and its light curve'],
      },
    },
    {
      slug: 'gravitational-waves-and-cosmological-solutions',
      title: 'Gravitational Waves and Cosmological Solutions',
      description:
        'Gravitational waves from linearised theory to detection: polarisations, the quadrupole formula, binary inspirals and LIGO data. Then the field equations for the whole universe: the FLRW metric, the Friedmann equations and the expanding universe.',
      lessons: [
        {
          slug: 'gravitational-wave-solutions',
          title: 'Gravitational waves: polarisations and their effect on matter',
          summary:
            'Plane-wave solutions of the linearised equations, the transverse-traceless gauge, the plus and cross polarisations, how a wave deforms a ring of test masses, and the principle of laser-interferometric detection.',
          estimatedMinutes: 120,
          objectives: [
            'Find plane-wave solutions of $\\Box\\bar h_{\\mu\\nu} = 0$ and reduce them to two physical polarisations in TT gauge',
            'Compute the geodesic deviation induced by a wave and show the $+$ and $\\times$ deformation patterns',
            'Explain why the effect is a strain and estimate the arm-length change in LIGO for $h \\sim 10^{-21}$',
            'Describe the interferometer, its noise sources and the sensitivity curve',
          ],
          concepts: [
            'Plane-wave solutions $h_{\\mu\\nu} = A_{\\mu\\nu}e^{ik\\cdot x}$',
            'Transverse-traceless (TT) gauge',
            'Plus and cross polarisations',
            'Strain $h = \\Delta L/L$',
            'Geodesic deviation in a wave',
            'Michelson interferometer with Fabry-Perot arms',
            'Noise: seismic, thermal, shot, radiation pressure',
            'Detector network and sky localisation',
          ],
          explanation: `In vacuum and Lorenz gauge the linearised equations are $\\Box\\bar h_{\\mu\\nu} = 0$, solved by plane waves $\\bar h_{\\mu\\nu} = A_{\\mu\\nu}e^{ik_\\alpha x^\\alpha}$ with $k^\\alpha k_\\alpha = 0$: waves moving at the speed of light. The gauge condition makes $A_{\\mu\\nu}$ transverse, $k^\\mu A_{\\mu\\nu} = 0$, and the residual gauge freedom (the $\\xi$ with $\\Box\\xi = 0$ from module 4) can be used to also set $A_{0\\mu} = 0$ and $A^\\mu{}_\\mu = 0$. In this **transverse-traceless gauge**, a wave moving along $z$ has only two independent components:
$$h^{TT}_{\\mu\\nu} = \\begin{pmatrix}0&0&0&0\\\\0&h_+&h_\\times&0\\\\0&h_\\times&-h_+&0\\\\0&0&0&0\\end{pmatrix}\\cos(\\omega(t - z/c)).$$
These are the **plus** and **cross** polarisations, rotated 45° from each other (electromagnetic polarisations are 90° apart; the halved angle reflects the spin-2 nature of the field).

What does a wave do? In TT coordinates free test masses stay at fixed coordinates, which is a statement about the coordinates, not physics. The physical effect is in the **geodesic deviation** equation, which with the wave's Riemann tensor gives $\\ddot\\xi^i = \\frac{1}{2}\\ddot h^{TT}_{ij}\\xi^j$. A ring of free particles in the $xy$-plane is squeezed along $x$ while stretched along $y$, then the reverse, each half period: the $+$ pattern; the $\\times$ pattern is the same rotated by 45°. The fractional change in separation is $h/2$, a **strain**. Real waves reaching Earth have $h \\sim 10^{-21}$: a 4 km arm changes length by $10^{-18}$ m, a thousandth of a proton radius.

**LIGO** measures this with a Michelson interferometer whose 4 km arms are Fabry-Perot cavities (light bounces ~300 times), with 200 kW of circulating power, seismically isolated mirrors on quadruple pendulums, and a signal-recycling scheme; since 2019 squeezed light reduces quantum shot noise. The sensitivity curve shows the noise budget: seismic and thermal noise at low frequencies, quantum shot noise at high frequencies, with best sensitivity near 100-300 Hz, exactly where stellar-mass binaries merge. Two LIGO sites plus Virgo and KAGRA give time delays that localise sources on the sky and distinguish polarisations.

Read Carroll chapter 6 (gravitational waves sections), Tong 5.2-5.3, and the LIGO educational pages; the GWOSC tutorials introduce the data you will analyse two lessons from now.`,
          resources: [
            { ...R.carroll, note: 'Chapter 6, sections on gravitational wave solutions, TT gauge and the effect on test particles.', primary: true },
            { ...R.tongGR, note: 'Chapter 5, sections 5.2-5.3: gravitational waves and their detection.' },
            { ...R.ligo, note: 'Pages on how LIGO works, the interferometer and noise sources.' },
            { ...R.einsteinOnline, note: 'Spotlights on gravitational waves and interferometric detectors.' },
          ],
          exercises: [
            {
              slug: 'tt-gauge-reduction',
              title: 'Reduce to two polarisations',
              prompt:
                'Starting from $\\bar h_{\\mu\\nu} = A_{\\mu\\nu}e^{ik\\cdot x}$ with $k^\\mu = (\\omega/c, 0, 0, \\omega/c)$, impose Lorenz gauge, then use a residual gauge vector $\\xi_\\mu = B_\\mu e^{ik\\cdot x}$ to set $A_{0\\mu} = 0$ and $A^\\mu{}_\\mu = 0$. Count the remaining components (2). Compute the linearised Riemann tensor of the wave and show it is nonzero and gauge invariant, so the wave is physical. Construct the TT projection operator $\\Lambda_{ij,kl}$ for a general propagation direction.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'ring-of-particles',
              title: 'Animate a ring of test masses',
              prompt:
                'Integrate the geodesic deviation equation $\\ddot\\xi^i = \\frac{1}{2}\\ddot h_{ij}\\xi^j$ for 32 test masses on a ring in the $xy$-plane for (a) pure $h_+$, (b) pure $h_\\times$, (c) circular polarisation $h_+ = h\\cos\\omega t$, $h_\\times = h\\sin\\omega t$, using an exaggerated $h = 0.2$. Animate and show the deformation patterns, and that circular polarisation rotates the ellipse without rotating the particles. Then compute the arm-length change in LIGO for $h = 10^{-21}$ and the phase shift of 1064 nm light in a Fabry-Perot arm with finesse 450.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'antenna-patterns',
              title: 'Detector antenna patterns',
              prompt:
                'For an L-shaped interferometer with arms along $x$ and $y$, the response is $h(t) = F_+h_+ + F_\\times h_\\times$ with $F_+ = \\frac{1}{2}(1 + \\cos^2\\theta)\\cos2\\phi\\cos2\\psi - \\cos\\theta\\sin2\\phi\\sin2\\psi$ and a similar $F_\\times$. Plot $\\sqrt{F_+^2 + F_\\times^2}$ over the sky (averaged over polarisation angle $\\psi$) and identify the blind directions. Explain why a network of detectors at different orientations is needed to measure both polarisations and localise sources.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How many physical polarisations does a gravitational wave have and how do they act?',
              answerOutline:
                'Two (plus and cross), rotated 45° relative to each other; each stretches one transverse direction while squeezing the perpendicular one, oscillating at the wave frequency.',
            },
            {
              question: 'Why is it misleading to say that test masses do not move in TT gauge?',
              answerOutline:
                'TT coordinates are comoving with free masses; their proper separations, measured by light travel time, do change. Physical effects are given by the gauge-invariant Riemann tensor via geodesic deviation.',
            },
            {
              question: 'What limits LIGO\'s sensitivity at low and high frequencies?',
              answerOutline:
                'Low: seismic and thermal (suspension) noise and radiation pressure; high: quantum shot noise of the laser light. Best sensitivity is ~100-300 Hz.',
            },
          ],
        },
        {
          slug: 'generation-of-gravitational-waves',
          title: 'Generating gravitational waves: the quadrupole formula and binary inspirals',
          summary:
            'The quadrupole formula for the wave amplitude and luminosity, the radiation from a circular binary, orbital decay and the chirp, the Hulse-Taylor pulsar, and the inspiral-merger-ringdown structure of a black hole coalescence.',
          estimatedMinutes: 130,
          objectives: [
            'Derive $\\bar h_{ij} = \\frac{2G}{c^4r}\\ddot I_{ij}(t - r/c)$ and the quadrupole luminosity $P = \\frac{G}{5c^5}\\langle\\dddot Q_{ij}\\dddot Q_{ij}\\rangle$',
            'Compute the waveform and power emitted by a circular binary and the resulting orbital decay',
            'Derive the chirp: $f(t)$ and the chirp mass $\\mathcal M = (m_1m_2)^{3/5}/(m_1 + m_2)^{1/5}$',
            'Explain the Hulse-Taylor pulsar timing result and the inspiral, merger and ringdown phases',
          ],
          concepts: [
            'Quadrupole moment $I_{ij}$ and reduced quadrupole $Q_{ij}$',
            'Quadrupole formula for $h$',
            'Gravitational-wave luminosity',
            'Circular binary: frequency $2f_{orb}$',
            'Orbital decay and the chirp',
            'Chirp mass',
            'Hulse-Taylor binary pulsar',
            'Inspiral, merger, ringdown; numerical relativity',
          ],
          explanation: `Solving $\\Box\\bar h_{\\mu\\nu} = -16\\pi GT_{\\mu\\nu}/c^4$ with the retarded Green's function for a slowly moving source far away, and using $\\partial_\\mu T^{\\mu\\nu} = 0$ to rewrite the stress integrals, gives the **quadrupole formula**
$$\\bar h_{ij}(t, r) = \\frac{2G}{c^4r}\\ddot I_{ij}(t - r/c),\\qquad I_{ij} = \\int\\rho\\,x_ix_j\\,d^3x .$$
There is no monopole radiation (mass is conserved) and no dipole radiation (momentum is conserved, so the mass dipole moves uniformly), unlike electromagnetism, where charge dipoles radiate. The leading radiation is quadrupolar, which together with the factor $G/c^4 \\approx 8\\times10^{-45}$ s²/(kg m) explains why it is so weak. The energy flux, computed from the effective stress-energy of the waves, gives the luminosity
$$P = \\frac{G}{5c^5}\\left\\langle\\dddot Q_{ij}\\dddot Q_{ij}\\right\\rangle,\\qquad Q_{ij} = I_{ij} - \\tfrac{1}{3}\\delta_{ij}I_{kk}.$$
A spinning steel beam in the lab radiates $10^{-37}$ W. Astrophysical sources compensate with enormous masses moving at a fair fraction of $c$.

For a **circular binary** of masses $m_1, m_2$ at separation $a$ and orbital frequency $\\Omega$, the quadrupole rotates at $\\Omega$ and the waves come out at $2\\Omega$, with $h \\sim \\frac{4G\\mu}{c^4r}(G M\\Omega)^{2/3}$ and power $P = \\frac{32G^4\\mu^2M^3}{5c^5a^5}$ (with $M$ the total and $\\mu$ the reduced mass). The energy comes from the orbit, $E = -Gm_1m_2/2a$, so the orbit shrinks, the frequency rises and so does the power: a runaway **chirp**. Combining gives
$$\\dot f = \\frac{96}{5}\\pi^{8/3}\\left(\\frac{G\\mathcal M}{c^3}\\right)^{5/3}f^{11/3},\\qquad \\mathcal M = \\frac{(m_1m_2)^{3/5}}{(m_1 + m_2)^{1/5}},$$
so measuring $f$ and $\\dot f$ gives the **chirp mass** directly, and $h$ then gives the distance: binaries are "standard sirens".

Hulse and Taylor's binary pulsar PSR B1913+16 (discovered 1974, Nobel 1993) is a neutron-star pair with an 7.75 h orbit; decades of timing show its orbital period decreasing exactly as the quadrupole formula predicts (with eccentricity corrections), to 0.2%: the first, indirect, detection of gravitational waves. For black-hole binaries the quadrupole inspiral breaks down near the ISCO; the **merger** requires numerical relativity (solved in 2005 by Pretorius and by the Baker and Campanelli groups) and the **ringdown** is the quasinormal-mode ringing of the final Kerr black hole, whose frequency and damping time give its mass and spin.

Read Carroll chapter 6 (energy loss and quadrupole sections), Tong 5.4, and the GW150914 detection paper sections on the waveform.`,
          resources: [
            { ...R.carroll, note: 'Chapter 6, sections on production of gravitational waves and energy loss.', primary: true },
            { ...R.tongGR, note: 'Chapter 5, section 5.4: production of gravitational waves, quadrupole formula, binaries.' },
            {
              title: 'LIGO/Virgo (2016) — Observation of Gravitational Waves from a Binary Black Hole Merger (arXiv 1602.03837)',
              url: 'https://arxiv.org/abs/1602.03837',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections on the waveform, chirp mass estimate and inspiral-merger-ringdown interpretation.',
            },
            { ...R.mit8962, note: 'Lectures on gravitational radiation and the quadrupole formula.' },
          ],
          exercises: [
            {
              slug: 'quadrupole-formula-derivation',
              title: 'Derive the quadrupole formula',
              prompt:
                'Starting from the retarded solution of the linearised equations, show for a slowly moving distant source that $\\bar h_{ij} = \\frac{4G}{c^4r}\\int T_{ij}d^3x$ and use $\\partial_\\mu T^{\\mu\\nu} = 0$ twice to prove $\\int T_{ij}d^3x = \\frac{1}{2}\\frac{d^2}{dt^2}\\int T^{00}x_ix_j\\,d^3x/c^2$. Explain physically why there is no monopole or dipole gravitational radiation. Then compute $P$ for a rod of mass 500 tonnes and length 20 m spinning at 30 rad/s.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'binary-chirp',
              title: 'Binary inspiral and the chirp',
              prompt:
                'For a circular binary compute $Q_{ij}(t)$, the waveforms $h_+(t)$, $h_\\times(t)$ for an observer on the orbital axis, and the power $P = \\frac{32G^4\\mu^2M^3}{5c^5a^5}$. Derive $da/dt$, the time to coalescence $\\tau = \\frac{5c^5a^4}{256G^3\\mu M^2}$, and the chirp equation for $f(t)$. Evaluate $\\tau$ for the Hulse-Taylor pulsar (ignoring eccentricity), for the Earth-Sun system, and for GW150914 from 35 Hz. Plot $h(t)$ for a $30 + 30M_\\odot$ binary at 400 Mpc from 30 Hz to the ISCO.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'hulse-taylor-decay',
              title: 'The Hulse-Taylor orbital decay',
              prompt:
                'Using the Peters-Mathews formula with the eccentricity enhancement factor $f(e) = (1 + \\frac{73}{24}e^2 + \\frac{37}{96}e^4)(1 - e^2)^{-7/2}$, compute the predicted $\\dot P_b$ for PSR B1913+16 ($P_b = 7.752$ h, $e = 0.617$, $m_1 = 1.438$, $m_2 = 1.390\\,M_\\odot$) and compare with the measured $-2.42\\times10^{-12}$ (after the Galactic acceleration correction). Plot the cumulative shift of periastron time versus year, the famous parabola, for 1975-2025.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is there no dipole gravitational radiation?',
              answerOutline:
                'The mass dipole moment\'s second time derivative is the rate of change of total momentum, which is conserved; so dipole radiation vanishes and the leading term is quadrupolar.',
            },
            {
              question: 'At what frequency does a circular binary radiate and why?',
              answerOutline:
                'At twice the orbital frequency, because the mass quadrupole returns to the same configuration after half an orbit.',
            },
            {
              question: 'What does the chirp mass determine and why is it well measured?',
              answerOutline:
                'The leading-order frequency evolution ḟ ∝ M_c^{5/3} f^{11/3}; it fixes the phase evolution over many cycles, so matched filtering measures it precisely.',
            },
          ],
        },
        {
          slug: 'analysing-ligo-data',
          title: 'Analysing real LIGO data',
          summary:
            'Download open strain data from GWOSC, whiten and band-pass it, find GW150914 by eye and by matched filtering, estimate the chirp mass from the time-frequency track, and understand what the published parameter estimates mean.',
          estimatedMinutes: 140,
          objectives: [
            'Load LIGO open data with gwpy or h5py and compute amplitude spectral densities',
            'Whiten and band-pass the strain and make a spectrogram (Q-transform) showing the chirp',
            'Implement matched filtering with a template bank and compute the signal-to-noise ratio',
            'Estimate the chirp mass from the frequency evolution and compare with the catalogue',
          ],
          concepts: [
            'Strain time series and sampling',
            'Power and amplitude spectral density',
            'Whitening and band-passing',
            'Q-transform spectrograms',
            'Matched filtering and SNR',
            'Template banks (post-Newtonian and IMR waveforms)',
            'Coincidence between detectors and time delay',
            'Bayesian parameter estimation (overview)',
          ],
          explanation: `LIGO's raw output is a strain time series sampled at 16 kHz (4 kHz downsampled versions are public), dominated by noise that is $10^{3}$ times larger than the signal at low frequencies. The Gravitational Wave Open Science Center (GWOSC) publishes data around every catalogued event and long stretches of observing runs, with tutorials. This lesson is a guided analysis of GW150914, the first detection.

**Characterise the noise.** Compute the amplitude spectral density (ASD) with Welch's method over many seconds. You will see the seismic wall below 20 Hz, the shot-noise rise above a few hundred Hz, and sharp lines: 60 Hz mains and harmonics, the suspension violin modes near 500 Hz, calibration lines. **Whiten**: divide the Fourier transform of the data by the ASD so every frequency has equal noise power; then band-pass to 35-350 Hz. In the whitened Hanford and Livingston data around 09:50:45 UTC on 14 September 2015 the chirp is visible by eye: a few cycles rising in frequency and amplitude over 0.2 s, appearing in Livingston 7 ms before Hanford and inverted (the detectors' arms are rotated relative to each other). A Q-transform spectrogram shows the characteristic upward-sweeping track.

**Matched filtering** is how signals are actually found. For a template $h(t)$, the optimal statistic is the noise-weighted inner product $\\langle d|h\\rangle = 4\\,\\mathrm{Re}\\int\\frac{\\tilde d(f)\\tilde h^*(f)}{S_n(f)}df$, normalised to give an SNR time series; slide the template in time by FFT and maximise over a bank of masses and spins. Templates come from post-Newtonian theory for the inspiral and effective-one-body or phenomenological models calibrated to numerical relativity for merger and ringdown (PyCBC and LALSuite provide them). GW150914 has a network SNR of 24.

**Parameters.** From the spectrogram track you can estimate the chirp mass with the formula from the last lesson: $\\mathcal M = \\frac{c^3}{G}\\left[\\frac{5}{96}\\pi^{-8/3}f^{-11/3}\\dot f\\right]^{3/5}$, which gives about $30M_\\odot$; the full Bayesian analysis gives $\\mathcal M = 28.6M_\\odot$ (detector frame), component masses 36 and 29 $M_\\odot$, a final 62 $M_\\odot$ black hole with spin 0.67, and 3 $M_\\odot c^2$ radiated in 0.2 s, a peak luminosity of $3.6\\times10^{49}$ W, more than all the stars in the observable universe. The frequency at peak amplitude (~150 Hz) also bounds the objects' compactness: only black holes fit.

Work through the GWOSC tutorials (the "Binary black hole event tutorial" notebook and the gwpy and PyCBC examples), then do the exercises. They require installing gwpy and pycbc in a conda environment.`,
          resources: [
            { ...R.gwosc, note: 'Event tutorials for GW150914 and the open-data workshop materials (gwpy, PyCBC, Bilby).', primary: true },
            {
              title: 'LIGO/Virgo (2016) — Observation of Gravitational Waves from a Binary Black Hole Merger',
              url: 'https://arxiv.org/abs/1602.03837',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Figure 1 and sections II-V; reproduce figure 1.',
            },
            { ...R.ligo, note: 'Background on detectors and the observing runs.' },
          ],
          exercises: [
            {
              slug: 'gw150914-whitening',
              title: 'See GW150914 in the data',
              prompt:
                'Download 32 s of Hanford and Livingston data around GW150914 from GWOSC. Plot the ASDs and identify the main noise features. Whiten and band-pass (35-350 Hz) both streams, shift Livingston by +7 ms and invert it, and overlay them around the event: reproduce the top panels of figure 1 of the detection paper. Make Q-transform spectrograms for both detectors.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'matched-filter-search',
              title: 'Matched filtering with a template bank',
              prompt:
                'Using PyCBC, generate IMRPhenom waveforms for equal-mass binaries with total mass from 20 to 100 $M_\\odot$ in steps of 2, compute the matched-filter SNR time series for each against the Hanford and Livingston data (with the measured PSD), and find the template with the highest network SNR. Plot SNR versus total mass and the SNR time series of the best template. Compare your best mass with the published values.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'chirp-mass-estimate',
              title: 'Estimate the chirp mass from the spectrogram',
              prompt:
                'Extract the frequency track $f(t)$ from your whitened data (zero crossings of the band-passed strain, or the ridge of the Q-transform). Fit $f^{-8/3}(t) = \\frac{(8\\pi)^{8/3}}{5}\\left(\\frac{G\\mathcal M}{c^3}\\right)^{5/3}(t_c - t)$ to estimate $\\mathcal M$ and $t_c$. Then, using Kepler\'s law at the frequency of peak amplitude, estimate the separation of the bodies and compare with the sum of their Schwarzschild radii to argue they must be black holes. Repeat for GW170817 (binary neutron star) and comment on the much longer signal.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the data be whitened before looking for a signal?',
              answerOutline:
                'Detector noise is highly coloured (huge at low frequencies, lines); dividing by the ASD gives equal weight to all frequencies so the signal is not swamped by the loudest noise bands.',
            },
            {
              question: 'What is matched filtering and why is it optimal for known waveforms in Gaussian noise?',
              answerOutline:
                'Correlating the data with a template weighted by the inverse noise PSD; for Gaussian stationary noise it maximises the signal-to-noise ratio (it is the likelihood-ratio test).',
            },
            {
              question: 'How did the GW150914 signal show the sources were black holes?',
              answerOutline:
                'The chirp mass and peak frequency imply a separation of a few hundred km at merger, only consistent with objects compact enough to be black holes (neutron stars would have touched earlier and be too light).',
            },
          ],
        },
        {
          slug: 'flrw-cosmology',
          title: 'Cosmological solutions: the FLRW metric and the Friedmann equations',
          summary:
            'Homogeneity and isotropy fix the spacetime of the universe up to a scale factor and a curvature; the field equations give the Friedmann equations, whose solutions describe the expansion, the Big Bang and the accelerating universe.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the FLRW metric $ds^2 = -c^2dt^2 + a(t)^2\\left[\\frac{dr^2}{1 - kr^2} + r^2d\\Omega^2\\right]$ from the cosmological principle',
            'Derive the Friedmann and acceleration equations from the field equations with a perfect fluid',
            'Solve them for matter, radiation, curvature and a cosmological constant, and define $H_0$, $\\Omega_i$ and $q_0$',
            'Compute cosmological redshift, comoving and luminosity distances, and the age of the universe numerically for $\\Lambda$CDM',
          ],
          concepts: [
            'Cosmological principle: homogeneity and isotropy',
            'FLRW metric; scale factor $a(t)$; curvature $k$',
            'Comoving coordinates and proper distance',
            'Friedmann equations',
            'Fluid equation $\\dot\\rho + 3H(\\rho + p/c^2) = 0$',
            'Density parameters and critical density',
            'Cosmological redshift $1 + z = a_0/a$',
            'Distances and the age of the universe in $\\Lambda$CDM',
          ],
          explanation: `On scales above a few hundred megaparsecs the universe is homogeneous and isotropic, as the CMB shows to one part in $10^5$. The most general metric with those symmetries is the **Friedmann-Lemaître-Robertson-Walker** metric
$$ds^2 = -c^2dt^2 + a(t)^2\\left[\\frac{dr^2}{1 - kr^2} + r^2d\\Omega^2\\right],$$
where comoving coordinates $(r, \\theta, \\phi)$ label galaxies, $a(t)$ is the **scale factor** and $k = +1, 0, -1$ gives spatially closed, flat or open sections. Proper distances between comoving objects grow as $a(t)$, so recession velocities obey Hubble's law $v = Hd$ with $H = \\dot a/a$. Light travels on null geodesics, and its wavelength stretches with $a$: the **cosmological redshift** $1 + z = a(t_{obs})/a(t_{em})$ is not a Doppler shift but the expansion of space during the light's journey.

Insert FLRW into the field equations with a perfect fluid. The 00 and $ii$ components give the **Friedmann equations**
$$H^2 = \\left(\\frac{\\dot a}{a}\\right)^2 = \\frac{8\\pi G}{3}\\rho - \\frac{kc^2}{a^2} + \\frac{\\Lambda c^2}{3},\\qquad \\frac{\\ddot a}{a} = -\\frac{4\\pi G}{3}\\left(\\rho + \\frac{3p}{c^2}\\right) + \\frac{\\Lambda c^2}{3},$$
and their combination is the fluid equation $\\dot\\rho + 3H(\\rho + p/c^2) = 0$, which you derived in module 4 from $\\nabla_\\mu T^{\\mu\\nu} = 0$. With $p = w\\rho c^2$, $\\rho \\propto a^{-3(1+w)}$: matter dilutes as $a^{-3}$, radiation as $a^{-4}$ (number dilution plus redshift), and vacuum energy stays constant. Single-component flat solutions: $a \\propto t^{2/3}$ (matter), $a \\propto t^{1/2}$ (radiation), $a \\propto e^{Ht}$ (Λ, de Sitter). Notice the acceleration equation: ordinary matter decelerates the expansion, and only a component with $p < -\\rho c^2/3$ can accelerate it.

Define the critical density $\\rho_c = 3H^2/8\\pi G$ and density parameters $\\Omega_i = \\rho_i/\\rho_c$; the Friedmann equation becomes $H(z)^2 = H_0^2[\\Omega_r(1+z)^4 + \\Omega_m(1+z)^3 + \\Omega_k(1+z)^2 + \\Omega_\\Lambda]$. The Planck-calibrated $\\Lambda$CDM model has $H_0 \\approx 67.4$ km/s/Mpc, $\\Omega_m \\approx 0.315$, $\\Omega_\\Lambda \\approx 0.685$, $\\Omega_k \\approx 0$. Integrating gives the age, $t_0 = \\int_0^\\infty\\frac{dz}{(1+z)H(z)} \\approx 13.8$ Gyr, and the distances that observations use: comoving distance $\\int c\\,dz/H$, luminosity distance $(1+z)$ times that (for $k = 0$), and the angular-diameter distance. The 1998 discovery that distant type Ia supernovae are fainter than a decelerating model allows was the evidence for $\\Omega_\\Lambda > 0$ (Nobel 2011). The galaxies-cosmology subject develops all of this observationally; here the goal is to see it as a solution of Einstein's equations.

Read Carroll chapter 8 (Cosmology), Tong's Cosmology notes chapter 1, and 8.962 lectures on cosmology.`,
          resources: [
            { ...R.carroll, note: 'Chapter 8 (Cosmology): maximally symmetric spaces, FLRW, Friedmann equations.', primary: true },
            { ...R.tongCosmo, note: 'Chapter 1 (The expanding universe): FLRW geometry, Friedmann equations, single-component universes.' },
            { ...R.mit8962, note: 'Lectures on cosmology (FLRW and the Friedmann equations).' },
            {
              title: 'ESA Planck mission — cosmological parameters',
              url: 'https://www.cosmos.esa.int/web/planck',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
              note: 'Source of the ΛCDM parameter values used in the exercises.',
            },
          ],
          exercises: [
            {
              slug: 'friedmann-derivation',
              title: 'Derive the Friedmann equations',
              prompt:
                'With your SymPy code, compute the Einstein tensor of the FLRW metric for general $k$ and set $G_{\\mu\\nu} + \\Lambda g_{\\mu\\nu} = 8\\pi GT_{\\mu\\nu}/c^4$ with a comoving perfect fluid. Obtain both Friedmann equations and show the fluid equation follows. Solve for single-component flat universes with $w = 0, 1/3, -1$ and for the open matter-only universe, and plot $a(t)$ for each on one figure with matched $H_0$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lcdm-integrator',
              title: 'ΛCDM distances and age',
              prompt:
                'Write a function computing $H(z)$, the age $t(z)$, comoving distance, luminosity distance, angular-diameter distance and lookback time for given $(H_0, \\Omega_m, \\Omega_r, \\Omega_\\Lambda)$. Verify against astropy.cosmology.Planck18 to 0.1%. Compute the age of the universe (13.8 Gyr), the redshift of matter-Λ equality ($z \\approx 0.3$), of matter-radiation equality ($z \\approx 3400$), and the redshift at which the expansion began to accelerate ($q = 0$, $z \\approx 0.63$). Plot $d_L(z)$ for ΛCDM and for a flat matter-only universe from $z = 0$ to 2 and explain why supernovae at $z \\sim 0.5$ distinguish them.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'redshift-from-geodesics',
              title: 'Cosmological redshift from null geodesics',
              prompt:
                'Show from the null geodesic equation in FLRW that a photon\'s physical momentum scales as $1/a$, hence $1 + z = a_0/a_e$. Show that the CMB temperature scales as $T \\propto 1/a$ and that a blackbody spectrum remains a blackbody under expansion. Explain why interpreting $z$ as a Doppler velocity fails for $z > 1$ (e.g. a galaxy at $z = 3$ has recession velocity greater than $c$ today) and why this does not violate special relativity.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does radiation density scale as a⁻⁴ while matter scales as a⁻³?',
              answerOutline:
                'Both number densities dilute as a⁻³; each photon\'s energy also redshifts as 1/a, giving an extra factor. Formally, ρ ∝ a^{−3(1+w)} with w = 1/3.',
            },
            {
              question: 'What does the acceleration equation imply about what can make the expansion accelerate?',
              answerOutline:
                'ä ∝ −(ρ + 3p/c²); acceleration requires p < −ρc²/3, e.g. a cosmological constant (p = −ρc²); ordinary matter and radiation always decelerate.',
            },
            {
              question: 'Is cosmological redshift a Doppler shift?',
              answerOutline:
                'No; it is the stretching of wavelengths by the growth of a(t) during propagation, 1 + z = a₀/a_e. Only for small z does it coincide with v/c.',
            },
          ],
          relatedLessons: ['galaxies-cosmology/the-expanding-universe/friedmann-equations-and-cosmic-dynamics'],
        },
      ],
    },
    {
      slug: 'experimental-tests',
      title: 'Experimental Tests',
      description:
        'General relativity confronted with experiment: the classical solar-system tests and the PPN framework, clocks, gyroscopes and GPS, binary pulsars and gravitational waves as strong-field tests, and images of black holes.',
      lessons: [
        {
          slug: 'classical-tests-and-the-ppn-framework',
          title: 'The classical tests and the parametrised post-Newtonian framework',
          summary:
            'Mercury\'s perihelion, the 1919 eclipse and modern VLBI light deflection, the Shapiro delay and Cassini, and how the PPN parameters $\\gamma$ and $\\beta$ quantify how well general relativity is tested.',
          estimatedMinutes: 120,
          objectives: [
            'Write the PPN metric with parameters $\\gamma$ and $\\beta$ and express the classical tests in terms of them',
            'Derive the Shapiro time delay $\\Delta t \\approx \\frac{(1 + \\gamma)GM}{c^3}\\ln\\frac{4r_Er_P}{b^2}$',
            'Evaluate the history and current precision of the perihelion, deflection and time-delay tests',
            'Explain why the Cassini bound $|\\gamma - 1| < 2.3\\times10^{-5}$ constrains alternative theories',
          ],
          concepts: [
            'PPN metric and parameters $\\gamma$, $\\beta$',
            'Perihelion advance $\\propto (2 + 2\\gamma - \\beta)/3$',
            'Light deflection $\\propto (1 + \\gamma)/2$',
            'Eddington 1919 and modern VLBI',
            'Shapiro delay and the Cassini experiment',
            'Lunar laser ranging and the Nordtvedt effect',
            'Solar quadrupole moment as a systematic',
            'Brans-Dicke and other alternatives',
          ],
          explanation: `To test a theory you need a framework in which alternatives are possible. The **parametrised post-Newtonian** (PPN) formalism writes the weak-field metric of the solar system in the most general form allowed by reasonable theories:
$$ds^2 = -\\left(1 - \\frac{2GM}{rc^2} + 2\\beta\\frac{G^2M^2}{r^2c^4}\\right)c^2dt^2 + \\left(1 + 2\\gamma\\frac{GM}{rc^2}\\right)d\\mathbf x^2 .$$
$\\gamma$ measures how much space curvature is produced by unit mass and $\\beta$ how nonlinear the superposition of gravity is; general relativity has $\\gamma = \\beta = 1$. (The full formalism has ten parameters, most testing preferred frames and conservation laws.) Each test measures a combination.

**Perihelion advance.** The PPN result is $\\Delta\\phi = \\frac{2 + 2\\gamma - \\beta}{3}\\frac{6\\pi GM}{c^2a(1 - e^2)}$. Mercury's observed precession is 5600″/century, almost all from the precession of the equinoxes and planetary perturbations; the residual 42.98″ matches GR to better than 0.1% once the solar quadrupole $J_2 \\approx 2\\times10^{-7}$ (from helioseismology) is included. MESSENGER radio tracking now tightens this further.

**Light deflection.** $\\delta = \\frac{1 + \\gamma}{2}\\frac{4GM}{bc^2}$: 1.75″ at the solar limb in GR, half that if space were flat ($\\gamma = 0$). Eddington and Dyson's 1919 eclipse expeditions found $1.98 \\pm 0.16″$ and $1.61 \\pm 0.40″$, which made Einstein famous; the error bars were larger than claimed, but the result was right. Today very-long-baseline radio interferometry of quasars passing near the Sun gives $\\gamma - 1 = (-0.8 \\pm 1.2)\\times10^{-4}$, and Gaia measures deflection by the Sun across the whole sky (even 90° from it, the effect is 4 mas).

**Shapiro delay.** Radar signals passing near the Sun take longer than in flat space, by $\\Delta t \\approx (1 + \\gamma)\\frac{GM}{c^3}\\ln\\frac{4r_Er_P}{b^2}$, about 200 μs for Venus near superior conjunction. Shapiro proposed and measured it in the 1960s (the "fourth test"). The Cassini spacecraft in 2002, using the frequency shift of the round-trip signal (immune to much of the plasma noise) gave the best bound: $\\gamma - 1 = (2.1 \\pm 2.3)\\times10^{-5}$. **Lunar laser ranging** constrains the Nordtvedt effect (does gravitational binding energy fall the same way?), giving $4\\beta - \\gamma - 3$ near zero at $10^{-4}$, and so $\\beta - 1 \\lesssim 10^{-4}$.

These bounds rule out, for example, Brans-Dicke scalar-tensor theory unless its coupling $\\omega > 40{,}000$, i.e. unless it is indistinguishable from GR in the solar system. Read Will's Living Review (sections 3-4) carefully: it is the standard reference and very readable. Then reproduce the numbers in the exercises.`,
          resources: [
            { ...R.will, note: 'Sections 3-4: the PPN formalism and solar-system tests, with the current bounds table.', primary: true },
            { ...R.carroll, note: 'Chapter 7 discussion of the classical tests.' },
            { ...R.tongGR, note: 'Chapter 6 sections on precession, light bending and time delay.' },
            { ...R.einsteinOnline, note: 'Spotlights on the 1919 eclipse and on the Shapiro delay.' },
          ],
          exercises: [
            {
              slug: 'shapiro-delay',
              title: 'Derive and evaluate the Shapiro delay',
              prompt:
                'Integrate the coordinate time for a radial-ish light ray past a mass in the PPN metric to first order and derive $\\Delta t = (1 + \\gamma)\\frac{GM}{c^3}\\ln\\frac{(r_E + \\mathbf x_E\\cdot\\hat n)(r_P - \\mathbf x_P\\cdot\\hat n)}{b^2}$, then its superior-conjunction approximation. Compute the round-trip delay for radar to Venus and to Mars at conjunction as a function of impact parameter from $1$ to $10R_\\odot$, and plot it. Explain how Cassini measured $\\gamma$ through the derivative $d\\Delta t/dt$ (a frequency shift) and why that reduced the plasma systematic.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'mercury-perihelion-budget',
              title: 'The full Mercury perihelion budget',
              prompt:
                'Collect the contributions to Mercury\'s observed perihelion precession (general precession of the equinoxes ~5025″/cy, each planet\'s perturbation, solar oblateness, GR) from Will\'s review or the historical literature. Compute the GR term from the formula. Then compute the Newtonian planetary perturbations yourself: integrate the Sun, Mercury, Venus, Earth and Jupiter with a symplectic N-body integrator for 1000 years with and without the 1PN correction to Mercury\'s acceleration $\\frac{GM}{c^2r^3}[(4GM/r - v^2)\\mathbf r + 4(\\mathbf r\\cdot\\mathbf v)\\mathbf v]$, and measure the difference in precession rates (expect 43″/cy).',
              kind: 'simulation',
              difficulty: 3,
              hint: 'Measure perihelion longitude from the Laplace-Runge-Lenz vector rather than by finding minima of r.',
            },
            {
              slug: 'eddington-reanalysis',
              title: 'Reanalyse the 1919 eclipse',
              prompt:
                'Using the published star displacements from the 1919 Sobral expedition (tabulated in Dyson, Eddington and Davidson 1920 and reproduced in many reviews), fit the model $\\delta(b) = \\delta_0R_\\odot/b$ with a plate-scale and rotation nuisance model, and report $\\delta_0$ with an uncertainty. Discuss whether the data really excluded the "Newtonian" 0.87″ and what systematic effects mattered. Compare with the modern VLBI and Gaia precision.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do the PPN parameters γ and β measure?',
              answerOutline:
                'γ: amount of space curvature per unit mass; β: nonlinearity in the superposition of gravitational fields. GR has γ = β = 1.',
            },
            {
              question: 'What is the current best bound on γ and how was it obtained?',
              answerOutline:
                '|γ − 1| ≲ 2 × 10⁻⁵ from the Cassini Shapiro-delay (frequency-shift) measurement during the 2002 solar conjunction.',
            },
            {
              question: 'Which tests are sensitive to the spatial curvature of the metric?',
              answerOutline:
                'Light deflection and Shapiro delay (both ∝ 1 + γ) and part of the perihelion advance; slow particles are dominated by g₀₀.',
            },
          ],
        },
        {
          slug: 'clocks-gyroscopes-and-frame-dragging',
          title: 'Clocks, gyroscopes and frame dragging',
          summary:
            'Gravitational redshift from Pound-Rebka to optical clocks at the centimetre level, GPS as an everyday test, geodetic and Lense-Thirring precession measured by Gravity Probe B and LAGEOS, and the S2 star around Sgr A*.',
          estimatedMinutes: 100,
          objectives: [
            'Compare the precision of gravitational-redshift tests from Pound-Rebka (1960) to Gravity Probe A, Galileo satellites and optical lattice clocks',
            'Derive the geodetic (de Sitter) precession $\\Omega = \\frac{3}{2}\\frac{GM}{c^2r^3}(\\mathbf r\\times\\mathbf v)$ and evaluate it for Gravity Probe B',
            'Explain Lense-Thirring frame dragging and its measurement by Gravity Probe B and the LAGEOS/LARES satellites',
            'Interpret the 2018-2020 GRAVITY measurements of redshift and precession of the star S2 near Sgr A*',
          ],
          concepts: [
            'Gravitational redshift and clock comparison tests',
            'Gravity Probe A (hydrogen maser rocket)',
            'Optical lattice clocks and relativistic geodesy',
            'GPS relativistic corrections',
            'Geodetic (de Sitter) precession',
            'Lense-Thirring (frame-dragging) precession',
            'Gravity Probe B and LAGEOS',
            'S2 orbit: redshift and Schwarzschild precession',
          ],
          explanation: `**Clocks.** The gravitational redshift is the most directly tested prediction because clocks are the most precise instruments humans make. Pound and Rebka (1960) used the Mössbauer effect in a 22.5 m tower to measure a $2.5\\times10^{-15}$ shift to 10%, later 1%. Gravity Probe A (1976) flew a hydrogen maser to 10,000 km and confirmed the redshift to $1.4\\times10^{-4}$. Two Galileo navigation satellites accidentally launched into eccentric orbits (2014) improved this to $2.5\\times10^{-5}$ by watching their clock rates oscillate around the orbit. Today's optical lattice clocks reach $10^{-18}$ fractional uncertainty, enough to see the redshift between clocks 1 cm apart in height (Bothwell et al. 2022, within a single strontium atom cloud); this turns clocks into gravimeters and promises "relativistic geodesy". GPS is a permanent engineering test, as you computed in module 1.

**Gyroscopes.** A gyroscope in orbit is parallel transported along its worldline (module 3), and in curved spacetime its spin axis precesses relative to distant stars. Two effects: the **geodetic** (de Sitter) precession from moving through curved space, $\\boldsymbol\\Omega_{geo} = \\frac{3}{2}\\frac{GM}{c^2r^3}(\\mathbf r\\times\\mathbf v)$, which is 6606 mas/yr for a polar orbit at 642 km; and the **Lense-Thirring** precession from the gravitomagnetic field of Earth's rotation (module 4), $\\boldsymbol\\Omega_{LT} = \\frac{G}{c^2r^3}\\left[\\frac{3(\\mathbf J\\cdot\\mathbf r)\\mathbf r}{r^2} - \\mathbf J\\right]$ averaged over the orbit, 39 mas/yr. Gravity Probe B (2004-2005) used four niobium-coated quartz spheres, the roundest objects ever made, read out by SQUIDs, and found $6602 \\pm 18$ and $37 \\pm 7$ mas/yr after a heroic analysis of unexpected patch-charge torques. Frame dragging is also measured, to a few percent, by the precession of the orbital planes of the laser-ranged LAGEOS and LARES satellites, and on a much larger scale in the inner discs and jets of accreting black holes.

**A star near a black hole.** The star S2 orbits Sgr A* with a 16-year period, passing within 120 AU (1400 $r_s$) at 7700 km/s. The GRAVITY collaboration measured at the 2018 pericentre a combined gravitational redshift and transverse Doppler shift of 200 km/s equivalent, matching GR with $f = 0.90 \\pm 0.09$ (where 1 is GR), and in 2020 the Schwarzschild precession of its orbit, 12′ per orbit, with $f_{SP} = 1.10 \\pm 0.19$. These are the first tests of the redshift and precession formulas around a supermassive black hole, and they pin its mass at $4.3\\times10^6M_\\odot$.

Read Will's review sections 2 and 3.7, the Gravity Probe B site, and the Einstein Online spotlights; do the computations below.`,
          resources: [
            {
              title: 'Gravity Probe B — Testing Einstein\'s Universe (Stanford mission site)',
              url: 'https://einstein.stanford.edu/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford University / NASA',
              note: 'Mission overview, the gyroscopes and the final results.',
              primary: true,
            },
            { ...R.will, note: 'Sections 2 (tests of the Einstein equivalence principle, redshift) and 3.7 (frame dragging).' },
            { ...R.einsteinOnline, note: 'Spotlights on clocks, GPS and frame dragging.' },
          ],
          exercises: [
            {
              slug: 'geodetic-precession',
              title: 'Geodetic and Lense-Thirring precession for Gravity Probe B',
              prompt:
                'Derive the geodetic precession rate by parallel transporting a spin vector around a circular orbit in Schwarzschild (or use the Fermi-Walker transport result) and show $\\Omega_{geo} = \\frac{3}{2}\\frac{(GM)^{3/2}}{c^2r^{5/2}}$. Evaluate for GP-B ($r = 7027$ km): 6606 mas/yr. Evaluate the orbit-averaged Lense-Thirring precession using Earth\'s angular momentum $J = 5.86\\times10^{33}$ kg m²/s for a polar orbit (39 mas/yr). Compare with the measured values and their uncertainties.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 's2-orbit',
              title: 'The S2 star: redshift and precession',
              prompt:
                'Using the orbital elements of S2 (period 16.05 yr, $e = 0.884$, semi-major axis 0.1255″ at 8.28 kpc, mass of Sgr A* $4.3\\times10^6M_\\odot$), integrate the orbit with and without the 1PN correction and compute: the pericentre distance in $r_s$, the pericentre speed, the combined gravitational plus transverse-Doppler redshift at pericentre ($\\approx 200$ km/s equivalent), and the Schwarzschild precession per orbit (≈12′). Plot the radial-velocity curve around the 2018 pericentre with and without the relativistic terms.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'clock-geodesy',
              title: 'Clocks as gravimeters',
              prompt:
                'Compute the fractional frequency shift between two clocks separated by 1 cm, 1 m and 1 km in height at Earth\'s surface. For an optical clock with fractional instability $10^{-16}/\\sqrt{\\tau/\\mathrm{s}}$, how long must you average to resolve 1 cm? Estimate the height precision achievable by comparing clocks in two cities via optical fibre and discuss what geophysical signals (tides, ground water) would show up.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between geodetic and Lense-Thirring precession?',
              answerOutline:
                'Geodetic: precession of a gyroscope moving through the curved space around a mass (present for a non-rotating Earth). Lense-Thirring: extra precession caused by the rotation of the central mass dragging inertial frames.',
            },
            {
              question: 'How did two misplaced Galileo satellites improve the redshift test?',
              answerOutline:
                'Their eccentric orbits made their altitude, and hence clock rate, oscillate periodically; the amplitude of the oscillation tests the redshift formula to 2.5 × 10⁻⁵.',
            },
            {
              question: 'What did the GRAVITY collaboration measure for S2?',
              answerOutline:
                'The gravitational redshift (plus transverse Doppler) at the 2018 pericentre and the Schwarzschild precession of the orbit, both consistent with GR, around a 4.3 × 10⁶ M☉ black hole.',
            },
          ],
        },
        {
          slug: 'strong-field-tests-pulsars-waves-and-black-hole-images',
          title: 'Strong-field tests: binary pulsars, gravitational waves and black hole images',
          summary:
            'Tests where gravity is strong or dynamical: the double pulsar, the speed of gravitational waves from GW170817, tests of the inspiral-merger-ringdown waveform and black-hole spectroscopy, and the Event Horizon Telescope shadows.',
          estimatedMinutes: 120,
          objectives: [
            'Explain how post-Keplerian parameters of binary pulsars over-determine the masses and test GR (the mass-mass diagram)',
            'Use GW170817 and GRB 170817A to bound the speed of gravitational waves and explain the impact on alternative theories',
            'Describe consistency tests of gravitational-wave signals: inspiral-merger-ringdown consistency, ringdown spectroscopy, and the area theorem test',
            'Interpret the EHT images of M87* and Sgr A* as tests of the Kerr shadow size',
          ],
          concepts: [
            'Post-Keplerian parameters: $\\dot\\omega$, $\\gamma$, $\\dot P_b$, Shapiro $r$ and $s$',
            'Mass-mass diagram and the double pulsar',
            'Speed of gravitational waves; GW170817',
            'Multi-messenger astronomy and standard sirens',
            'Inspiral-merger-ringdown consistency test',
            'Quasinormal modes and black-hole spectroscopy',
            'Area-theorem test with binary black-hole mergers',
            'Event Horizon Telescope shadow measurements',
          ],
          explanation: `Solar-system tests probe weak, slowly varying fields ($GM/rc^2 \\sim 10^{-6}$). Theories that agree with GR there can differ greatly where fields are strong or dynamical. Three laboratories now probe that regime.

**Binary pulsars.** A pulsar is a precise clock in orbit. Timing measures five Keplerian parameters and, for relativistic systems, several **post-Keplerian** ones: periastron advance $\\dot\\omega$, the combined gravitational redshift and time dilation $\\gamma_{PK}$, orbital decay $\\dot P_b$, and the range and shape $r, s$ of the Shapiro delay. In GR each is a known function of the two masses, so each defines a curve in the $(m_1, m_2)$ plane; if GR is right, all curves meet at a point. For the double pulsar PSR J0737-3039A/B (both neutron stars seen as pulsars, edge-on orbit), six curves meet, and the 16-year analysis (Kramer et al. 2021) confirms the quadrupole formula to $1.3\\times10^{-4}$, including tiny effects from the pulsar's spin-down mass loss. Scalar-tensor theories that predict dipole radiation from unequal-compactness binaries are strongly excluded by pulsar-white-dwarf systems.

**Gravitational waves.** On 17 August 2017 LIGO and Virgo detected a binary neutron star merger (GW170817), and the Fermi satellite detected a short gamma-ray burst 1.7 s later from a galaxy 40 Mpc away. Light and gravity raced for 130 million years and arrived within seconds: $|c_{gw} - c|/c \\lesssim 10^{-15}$, which in one stroke ruled out a broad class of modified-gravity models proposed to explain dark energy. The same event gave the first standard-siren measurement of $H_0$ and showed that such mergers make heavy r-process elements. Binary black-hole signals test GR in the most dynamical regime available: the mass and spin of the remnant inferred separately from the inspiral and from the merger-ringdown must agree; the ringdown frequencies must be those of a Kerr black hole with that mass and spin (black-hole spectroscopy; measuring more than one mode tests the no-hair theorem); the deviations of post-Newtonian phase coefficients from GR are bounded; and the total horizon area must not decrease (Hawking's area theorem was confirmed with GW150914 at about 97% confidence, and more strongly with louder later events). No deviation from GR has been found.

**Black hole images.** The Event Horizon Telescope, a planet-sized VLBI array at 1.3 mm, imaged M87* (2019) and Sgr A* (2022). The ring diameters, 42 and 52 μas, are consistent with the Kerr shadow size $\\approx 2\\sqrt{27}GM/c^2D$ (within a few percent, almost independent of spin) for the masses measured independently from stellar dynamics (Sgr A*, via S2) and gas dynamics (M87*). The agreement for Sgr A*, whose mass is known to 1%, tests the metric at a few $r_s$ to about 10%.

Read Will's review sections 6-7, the GW170817 multi-messenger summary on the LIGO site, and the EHT results pages. The exercises reproduce a mass-mass diagram and the speed-of-gravity bound.`,
          resources: [
            { ...R.will, note: 'Sections 6 (binary pulsars) and 7 (gravitational-wave tests).', primary: true },
            { ...R.ligo, note: 'News and detection pages for GW150914, GW170817 and the catalogue of events.' },
            {
              title: 'Event Horizon Telescope — results and images of M87* and Sgr A*',
              url: 'https://eventhorizontelescope.org/',
              type: 'article',
              cost: 'free',
              provider: 'EHT Collaboration',
            },
            { ...R.gwosc, note: 'Event catalogue (GWTC) with parameters for consistency checks.' },
          ],
          exercises: [
            {
              slug: 'mass-mass-diagram',
              title: 'Draw the double-pulsar mass-mass diagram',
              prompt:
                'Using the GR expressions for the post-Keplerian parameters $\\dot\\omega$, $\\gamma_{PK}$, $\\dot P_b$, $r$ and $s$ in terms of $m_1, m_2$ and the Keplerian elements, and the published values for PSR J0737-3039A/B (from Kramer et al. 2006 or 2021, $P_b = 2.45$ h, $e = 0.088$), plot the curves in the $(m_A, m_B)$ plane together with the mass ratio from the two pulsars\' projected semi-major axes. Show they intersect at $m_A \\approx 1.338$, $m_B \\approx 1.249\\,M_\\odot$, and quantify the consistency.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'speed-of-gravity-bound',
              title: 'Bound the speed of gravitational waves',
              prompt:
                'GW170817 and GRB 170817A arrived 1.74 s apart from a source at 40 Mpc. Assuming the gamma rays were emitted between 0 and 10 s after the merger, derive the bound $-3\\times10^{-15} < (c_{gw} - c)/c < 7\\times10^{-16}$. Explain why theories in which the graviton speed differs from $c$ in a cosmological background (e.g. some Horndeski or quartic galileon models) were excluded, and why the bound is far stronger than from any solar-system test.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'ringdown-and-shadow',
              title: 'Ringdown frequencies and shadow sizes',
              prompt:
                'Using the fitting formulas of Berti, Cardoso and Will (2006) for the fundamental $\\ell = m = 2$ quasinormal mode of a Kerr black hole, compute the ringdown frequency and damping time for the GW150914 remnant (62 $M_\\odot$, $\\chi = 0.67$) and compare with ~250 Hz and ~4 ms. Then compute the angular shadow diameters of M87* ($6.5\\times10^9M_\\odot$ at 16.8 Mpc) and Sgr A* and compare with the EHT ring diameters. Discuss what each test does and does not establish.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a binary pulsar provide a test of GR rather than only a measurement of masses?',
              answerOutline:
                'Two post-Keplerian parameters determine the masses; every additional one (e.g. Ṗ_b, Shapiro r, s) must agree with the same masses, over-determining the system.',
            },
            {
              question: 'What did GW170817 establish about the speed of gravitational waves?',
              answerOutline:
                'Equal to c to about one part in 10¹⁵, from the 1.7 s delay between the gravitational and gamma-ray signals after 130 Myr of travel.',
            },
            {
              question: 'What is black-hole spectroscopy and what does it test?',
              answerOutline:
                'Measuring the quasinormal mode frequencies and damping times in the ringdown; in GR all are fixed by the remnant\'s mass and spin, so measuring two or more tests the Kerr (no-hair) nature of the remnant.',
            },
          ],
        },
      ],
      project: {
        slug: 'tests-of-gr-report',
        title: 'A quantitative review of the tests of general relativity',
        description: `Produce your own version of Will's "confrontation" table: for each major test (perihelion, deflection, Shapiro delay, redshift, Nordtvedt, geodetic and Lense-Thirring precession, binary pulsar orbital decay, speed of gravitational waves, inspiral-merger-ringdown consistency, black-hole shadows), state the prediction in GR, the PPN or equivalent parameter it constrains, the best measurement with its uncertainty and reference, and the regime of field strength ($GM/rc^2$) and velocity ($v/c$) it probes.

Plot all tests on a "gravitational parameter space" diagram (potential versus curvature, as in Baker, Psaltis and Skordis 2015) and write a two-page discussion of which regimes remain untested.`,
        deliverables: [
          'A table of at least ten tests with predictions, measurements, parameters and references',
          'The parameter-space figure and a two-page discussion',
        ],
        estimatedHours: 8,
        stretchGoals: ['Reproduce one test numerically from published data (e.g. the Hulse-Taylor periastron-time parabola or the Cassini γ estimate from published Doppler residuals)'],
      },
    },
  ],
  capstone: {
    slug: 'black-hole-geodesics-and-classic-test',
    title: 'Capstone: geodesics around a black hole and the reproduction of a classic test',
    description: `**Part A — Geodesics.** Build a robust, documented geodesic integrator for Schwarzschild and Kerr spacetimes (in Boyer-Lindquist or Kerr-Schild coordinates), with symbolic metric input, automatic Christoffel symbols, adaptive integration, and monitoring of the Hamiltonian constraint and the conserved energy, angular momentum and (for Kerr) Carter constant. Validate against analytic results: radial infall times, circular-orbit frequencies, ISCO radii versus spin, the photon sphere and the critical impact parameter, and the weak-field perihelion and deflection formulas. Produce a gallery of computed and plotted orbits: precessing ellipses, zoom-whirl orbits, plunges from inside the ISCO, photon orbits near the photon sphere, and (for Kerr) non-equatorial orbits filling a torus and frame-dragged infall.

**Part B — A classic test.** Reproduce quantitatively one of: (1) Mercury's 43″/century perihelion advance, from an N-body integration of the solar system with 1PN corrections, showing the planetary and relativistic contributions separately; (2) the deflection of starlight by the Sun, by integrating null geodesics through the solar metric and comparing with the 1919 data and modern VLBI; (3) the Shapiro delay of radar signals to Venus or of the Cassini link. Include an error budget and a comparison with the historical and modern measurements.`,
    deliverables: [
      'Geodesic integrator package with tests and a validation report (tables of numerical versus analytic values with relative errors)',
      'Orbit gallery with figures and a paragraph of physics for each',
      'The classic-test reproduction: code, figures and a 4-6 page write-up with error budget and historical context',
      'Repository with instructions to reproduce every figure',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Combine your integrator with the module 5 ray tracer to render a Kerr black hole with a thin disc and compare the shadow with EHT images',
      'Compute the orbital frequencies (radial, azimuthal, polar) of eccentric Kerr orbits and the corresponding quasi-periodic oscillation predictions',
      'Add gravitational-wave back-reaction with the Peters formulas to evolve an inspiral and produce its quadrupole waveform',
    ],
  },
  masteryChecklist: [
    'I can derive the Lorentz transformation, use spacetime diagrams, and resolve the standard paradoxes of special relativity',
    'I can solve relativistic kinematics problems with four-momentum conservation and write electrodynamics in covariant form',
    'I can compute Christoffel symbols, the Riemann, Ricci and Einstein tensors for a given metric, by hand and symbolically',
    'I can derive the geodesic equation, its Newtonian limit, and conserved quantities from Killing vectors',
    'I can derive Einstein\'s field equations from physical requirements and from the Einstein-Hilbert action, and obtain the Newtonian limit',
    'I can derive the Schwarzschild solution, analyse orbits of particles and light, and explain horizons using Eddington-Finkelstein and Kruskal coordinates',
    'I can describe Kerr black holes, the ergosphere, the ISCO dependence on spin and black-hole thermodynamics',
    'I can derive gravitational-wave solutions, the quadrupole formula and the chirp, and I have analysed real LIGO data',
    'I can derive the Friedmann equations and compute ages and distances in ΛCDM',
    'I can state the main experimental tests of GR, the parameters they constrain and their current precision, and I have reproduced one quantitatively',
  ],
});
