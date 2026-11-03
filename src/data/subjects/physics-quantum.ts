import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const openstax3 = (note: string): ResourceInput => ({
  title: 'OpenStax University Physics Volume 3',
  url: 'https://openstax.org/details/books/university-physics-volume-3',
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary: true,
});

const mit804 = (note: string): ResourceInput => ({
  title: 'MIT 8.04 Quantum Physics I',
  url: 'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/',
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

const falstadQm = (note: string): ResourceInput => ({
  title: 'Falstad 1D Quantum States Applet',
  url: 'https://www.falstad.com/qm1d/',
  type: 'interactive',
  cost: 'free',
  provider: 'Paul Falstad',
  note,
});

export default defineSubject({
  id: 'physics-quantum',
  title: 'University Physics: Quantum Physics (PHYS 214)',
  category: 'physics',
  tagline:
    'Calculus-based introductory quantum physics: interference, photons, matter waves, the Schrodinger equation, atoms and modern devices.',
  description: `This course follows the topics of PHYS 214 (University Physics: Quantum Physics) at the University of Illinois Urbana-Champaign, as given in the public catalog description. It is original work and is not affiliated with Illinois; nothing here comes from its lectures, homework or exams.

It starts with something you can see: light passing through two slits makes bright and dark bands, which only waves can do. Then the puzzle begins. Light also arrives in lumps, called photons, and electrons, which you thought were particles, make interference patterns too. Quantum physics is the theory that makes sense of both facts at once. You will meet it through experiments and simple calculations first, and only then through the Schrodinger equation, which you solve for a particle in a box and for tunnelling through a barrier. The course ends with atoms, spin, lasers and semiconductors, the physics inside every phone.

The method is the one from the earlier courses, with one new habit. Quantum answers come in electron volts and nanometres, and the combination $hc = 1240\\ \\mathrm{eV\\,nm}$ turns many calculations into one line. Always compare an energy with a known scale: $k_BT \\approx 0.026\\ \\mathrm{eV}$ at room temperature, a few eV for visible light and chemistry, and MeV for nuclei.

The course assumes the electricity and magnetism course, and calculus through simple differential equations. No lab is needed: you use PhET and Falstad simulations and short Python models. \`quantum-mechanics\` is the next step, and builds the full formalism.

Constants used throughout: $h = 6.63\\times 10^{-34}\\ \\mathrm{J\\,s}$, $\\hbar = 1.05\\times 10^{-34}\\ \\mathrm{J\\,s}$, $c = 3.00\\times 10^{8}\\ \\mathrm{m/s}$, $e = 1.60\\times 10^{-19}\\ \\mathrm C$, $m_e = 9.11\\times 10^{-31}\\ \\mathrm{kg}$ and $hc = 1240\\ \\mathrm{eV\\,nm}$.`,
  difficulty: 'intermediate',
  estimatedHours: 50,
  prerequisites: ['physics-electricity-magnetism'],
  recommendedBackground: [
    'Waves from the mechanics course: wavelength, frequency, superposition',
    'Complex numbers help but are introduced where they are used',
    'Basic Python with NumPy, for the projects',
  ],
  tags: ['quantum physics', 'interference', 'photons', 'matter waves', 'schrodinger equation', 'atoms', 'lasers', 'semiconductors'],
  core: false,
  modules: [
    {
      slug: 'waves-and-interference',
      title: 'Waves and Interference',
      description:
        'The test that marks a wave: superposition, two-slit interference, diffraction, gratings and interferometers.',
      lessons: [
        {
          slug: 'superposition-and-double-slits',
          title: 'Superposition and the double slit',
          summary:
            'Two coherent sources, path differences, bright and dark fringes, and the intensity pattern.',
          estimatedMinutes: 130,
          objectives: [
            'Explain constructive and destructive interference from path difference',
            'Locate the bright and dark fringes of a double slit',
            'Compute fringe spacing in the small-angle limit',
            'Find the intensity pattern by adding amplitudes',
          ],
          concepts: [
            'Superposition',
            'Coherence',
            'Path difference and phase difference',
            'Double-slit maxima and minima',
            'Fringe spacing',
            'Adding amplitudes, not intensities',
          ],
          explanation: `When two waves overlap, their displacements add. If crests meet crests, the waves reinforce; if crests meet troughs, they cancel. Which happens at a point depends on the **path difference** $\\Delta$ from the two sources. A path difference of a whole number of wavelengths gives a bright spot, and a half-number gives a dark one.

The sources must be **coherent**, meaning they keep a fixed phase relation. Two separate bulbs do not. Two slits lit by one laser do.

**Double slit.** Slits a distance $d$ apart send light to a screen far away at angle $\\theta$. The extra path for the far slit is $d\\sin\\theta$, so

$$\\text{bright: } d\\sin\\theta = m\\lambda, \\qquad \\text{dark: } d\\sin\\theta = (m + \\tfrac12)\\lambda.$$

For small angles, $\\sin\\theta \\approx \\tan\\theta = y/L$, with $L$ the distance to the screen. So bright fringes are evenly spaced:

$$\\Delta y = \\frac{\\lambda L}{d}.$$

**Intensity.** Each slit gives a field amplitude $E_0$. With phase difference $\\phi = 2\\pi d\\sin\\theta/\\lambda$, adding the two waves gives an amplitude $2E_0\\cos(\\phi/2)$. Intensity goes as amplitude squared, so

$$I = 4I_0\\cos^2\\frac{\\phi}{2}.$$

The bright fringes are *four* times as bright as one slit alone, and the dark ones are zero. Energy is not lost: it moves from the dark places to the bright ones. You must add amplitudes first and then square. Adding intensities would give a flat $2I_0$, with no fringes at all.

**Worked example.** A $633\\ \\mathrm{nm}$ laser lights two slits $0.25\\ \\mathrm{mm}$ apart. The screen is $2.0\\ \\mathrm m$ away. Find the fringe spacing, and the intensity halfway between a bright fringe and the next dark one.

$$\\Delta y = \\frac{(633\\times 10^{-9})(2.0)}{0.25\\times 10^{-3}} = 5.1\\ \\mathrm{mm}.$$

The first bright fringe is at an angle of $\\lambda/d$, or about $0.15^\\circ$, so the small-angle step was justified. Halfway from bright to dark, the phase difference is $\\pi/2$, so $I = 4I_0\\cos^2(\\pi/4)$, which is $0.50$ of the peak.

Check: the units give metres. Fringes a few millimetres apart are easy to see, which is why this works with a laser pointer. Wider slits or a shorter wavelength squeeze the fringes together, as $\\lambda/d$ says. Under water, with $\\lambda$ reduced by $n = 1.33$, the spacing would fall to $3.8\\ \\mathrm{mm}$.

**Pitfalls.** Use $\\sin\\theta = y/L$ only for small angles. The slits must be narrow compared with their spacing for this simple pattern; otherwise single-slit diffraction shapes it, as the next lesson shows.`,
          resources: [
            openstax3('Read the chapter on interference, through the double-slit experiment.'),
            phet('Wave Interference', 'wave-interference', 'Use the Slits screen with light, and measure the fringe spacing.'),
            hyperphysics('Look up double-slit interference.'),
          ],
          exercises: [
            {
              slug: 'measure-a-wavelength',
              title: 'Measure a wavelength',
              prompt:
                'Fringes $1.5\\ \\mathrm{mm}$ apart appear on a screen $3.0\\ \\mathrm m$ from two slits lit by $550\\ \\mathrm{nm}$ light. Find the slit separation. If the whole set-up is put under water, what is the new fringe spacing for the $5.1\\ \\mathrm{mm}$ example?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The separation is $1.1\\ \\mathrm{mm}$. Under water the spacing is $3.8\\ \\mathrm{mm}$.',
            },
            {
              slug: 'thin-film',
              title: 'An anti-reflection coating',
              prompt:
                'A lens is coated with a film of $n = 1.38$. Light reflected from the top and bottom of the film should cancel at $550\\ \\mathrm{nm}$. Both reflections happen at a boundary into a higher index, so each has the same phase flip. Show that the thinnest film needs a thickness of $\\lambda/4n$, and evaluate it in nm.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The extra path $2t$ must equal half a wavelength in the film. The thickness is about $100\\ \\mathrm{nm}$.',
            },
            {
              slug: 'phasor-sum',
              title: 'Add amplitudes in Python',
              prompt:
                'Write a function that adds complex amplitudes $e^{ikr_j}$ from $N$ point sources along a line, and plots the intensity on a distant screen. For $N = 2$, check the fringe spacing against the formula and the peak value of $4I_0$. Then show what happens if you add intensities instead of amplitudes.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use `numpy.exp(1j*k*r)` and take the absolute value squared.',
            },
          ],
          selfAssessment: [
            {
              question: 'What condition on path difference gives a dark fringe?',
              answerOutline: 'An odd number of half wavelengths: $(m + \\frac12)\\lambda$.',
            },
            {
              question: 'Why must you add amplitudes rather than intensities?',
              answerOutline: 'Interference comes from the relative phase of the fields; intensities would just add to a constant.',
            },
            {
              question: 'Where does the energy go at a dark fringe?',
              answerOutline: 'It is redistributed into the bright fringes, which are four times brighter than one slit alone.',
            },
          ],
          relatedLessons: ['waves-optics/interference-diffraction-and-polarisation/two-source-interference-and-thin-films'],
        },
        {
          slug: 'diffraction-and-gratings',
          title: 'Diffraction and gratings',
          summary:
            'Light spreading through a single slit, the resolution limit of any lens, and gratings that split colours.',
          estimatedMinutes: 130,
          objectives: [
            'Find the minima of a single-slit pattern',
            'Apply the Rayleigh criterion to a circular aperture',
            'Use the grating equation and find the highest order',
            'Compute the resolving power of a grating',
          ],
          concepts: [
            'Huygens wavelets',
            'Single-slit minima',
            'Central maximum width',
            'Rayleigh criterion',
            'Diffraction grating',
            'Resolving power',
          ],
          explanation: `Light passing a small opening spreads out. This is **diffraction**, and it is just interference among wavelets from different parts of the opening.

**Single slit.** Divide a slit of width $a$ into two halves. A wavelet from the top of one half pairs with one from the top of the other half, $a/2$ lower. If their path difference is $\\lambda/2$, every such pair cancels, which gives a dark fringe. In general the minima are at

$$a\\sin\\theta = m\\lambda, \\qquad m = \\pm 1, \\pm 2, \\ldots$$

Note that $m = 0$ is the bright centre, not a minimum. The central bright band runs from $-\\lambda/a$ to $+\\lambda/a$, so a *narrower* slit gives a *wider* pattern.

**Circular openings.** A lens or a pupil of diameter $D$ blurs a point into a small disc, with its first dark ring at $\\sin\\theta = 1.22\\lambda/D$. Two points can just be told apart when the centre of one falls on the first ring of the other, which is the **Rayleigh criterion**. This sets a hard limit on every telescope, microscope and eye.

**Gratings.** Many slits, with spacing $d$, give very sharp maxima at the same angles as a double slit:

$$d\\sin\\theta = m\\lambda.$$

Since $\\sin\\theta \\le 1$, only orders with $m \\le d/\\lambda$ exist. A grating with $N$ illuminated lines can separate wavelengths with $\\lambda/\\Delta\\lambda = mN$, which is its **resolving power**.

**Worked example.** A grating has $600$ lines per mm. Sodium light at $589\\ \\mathrm{nm}$ falls on it at right angles. Find the angles of all the orders.

The spacing is $d = 1/600\\ \\mathrm{mm} = 1.67\\ \\mathrm{\\mu m}$. Then

$$\\sin\\theta_1 = \\frac{589\\times 10^{-9}}{1.67\\times 10^{-6}} \\Rightarrow \\theta_1 = 20.7^\\circ, \\qquad \\theta_2 = 45.0^\\circ.$$

For $m = 3$ we would need $\\sin\\theta = 1.06$, which is impossible, so only orders 1 and 2 exist on each side. Check: the angles grow with $m$, faster than linearly, as $\\sin^{-1}$ does. The answer depends only on $d/\\lambda$, a pure number.

Sodium's yellow light is really two lines, at $589.0$ and $589.6\\ \\mathrm{nm}$. To split them in first order needs $N \\ge 589.0/0.6$, about $982$ lines. A $1\\ \\mathrm{cm}$ wide beam on this grating covers $6000$ lines, which is plenty.

**Pitfalls.** The single-slit formula gives *minima*, while the double-slit and grating formulas give *maxima*. They look alike, so check which you need. Small-angle forms do not apply to gratings, where angles are large.`,
          resources: [
            openstax3('Read the chapter on diffraction.'),
            phet('Wave Interference', 'wave-interference', 'Use one slit and vary its width. Watch the central band grow as the slit narrows.'),
            hyperphysics('Look up single-slit diffraction and the Rayleigh criterion.'),
          ],
          exercises: [
            {
              slug: 'central-band',
              title: 'Width of the central band',
              prompt:
                'A slit $0.10\\ \\mathrm{mm}$ wide is lit with $633\\ \\mathrm{nm}$ light, and the screen is $1.5\\ \\mathrm m$ away. Find the width of the central bright band, from one first minimum to the other.',
              kind: 'problem',
              difficulty: 1,
              hint: 'It is $2\\lambda L/a$, about $19\\ \\mathrm{mm}$.',
            },
            {
              slug: 'resolution-limits',
              title: 'What can you resolve?',
              prompt:
                'Find the smallest angle that a pupil of $3.0\\ \\mathrm{mm}$ can resolve at $550\\ \\mathrm{nm}$, in radians and in arcminutes. Repeat for a $2.4\\ \\mathrm m$ space telescope. How far away could the eye tell apart two car headlights $1.5\\ \\mathrm m$ apart, if diffraction were the only limit?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Eye: $2.2\\times 10^{-4}\\ \\mathrm{rad}$, or $0.77$ arcminutes. Telescope: $2.8\\times 10^{-7}\\ \\mathrm{rad}$. The headlights resolve out to about $7\\ \\mathrm{km}$.',
            },
            {
              slug: 'grating-orders',
              title: 'A spectrum of white light',
              prompt:
                'White light from $400$ to $700\\ \\mathrm{nm}$ falls on the $600$ lines/mm grating. Find the angular range of the first-order and second-order spectra. Show that the second-order red overlaps the third-order violet, and explain why spectrometers use filters.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Second-order red needs $2 \\times 700 = 1400\\ \\mathrm{nm}$ of path, and third-order violet needs $1200\\ \\mathrm{nm}$, so they fall at similar angles; the third order of 400 nm still exists.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a narrower slit give a wider pattern?',
              answerOutline: 'The first minimum is at $\\sin\\theta = \\lambda/a$, so smaller $a$ means larger angle.',
            },
            {
              question: 'What sets the sharpest detail a telescope can see?',
              answerOutline: 'Diffraction at its aperture: an angle of about $1.22\\lambda/D$.',
            },
            {
              question: 'Why can a grating produce only a few orders?',
              answerOutline: '$\\sin\\theta = m\\lambda/d$ cannot exceed 1.',
            },
          ],
          relatedLessons: ['waves-optics/interference-diffraction-and-polarisation/single-slit-and-fraunhofer-diffraction'],
        },
        {
          slug: 'interferometers',
          title: 'Interferometers',
          summary:
            'Splitting and recombining one beam to measure tiny distances, from a lab bench to gravitational waves.',
          estimatedMinutes: 120,
          objectives: [
            'Explain how a Michelson interferometer works',
            'Relate mirror motion to fringe counts',
            'Measure a refractive index by counting fringes',
            'Explain the principle of gravitational-wave detectors',
          ],
          concepts: [
            'Beam splitter',
            'Michelson interferometer',
            'Fringe counting',
            'Optical path length',
            'Mach-Zehnder interferometer',
            'Gravitational-wave detection',
          ],
          explanation: `An interferometer splits one beam into two, sends them along different paths, and recombines them. The output depends on the difference in path length, measured in wavelengths. Since visible wavelengths are under a micrometre, the device is a ruler of extraordinary precision.

**Michelson interferometer.** A half-silvered mirror, the **beam splitter**, sends half of the light to a fixed mirror and half to a movable one. The two returning beams meet again at the splitter and go to a detector. If the movable mirror moves by $\\Delta L$, the light in that arm travels an extra $2\\Delta L$, out and back. Each extra wavelength of path moves the pattern by one fringe:

$$2\\Delta L = N\\lambda.$$

**Worked example.** With a $633\\ \\mathrm{nm}$ laser, you move one mirror by $0.10\\ \\mathrm{mm}$. How many fringes pass the detector, and what motion moves the pattern from bright to dark?

$$N = \\frac{2\\Delta L}{\\lambda} = \\frac{2(0.10\\times 10^{-3})}{633\\times 10^{-9}} = 316.$$

From bright to dark needs half a wavelength of path, which is a mirror motion of $\\lambda/4 = 158\\ \\mathrm{nm}$. Check: hundreds of fringes for a tenth of a millimetre makes sense, and it shows how such a device can sense motions far below a wavelength by reading the intensity between fringes.

**Optical path.** Light in a material with index $n$ acts as if it went a distance $n$ times longer, called the **optical path length**. So filling a gas cell of length $\\ell$ in one arm adds $2(n - 1)\\ell$, and counting the fringes as it fills gives $n$. Thirty fringes as a $5.0\\ \\mathrm{cm}$ cell fills with gas mean $n = 1.00019$, a typical value for air.

**Mach-Zehnder.** A second design splits and recombines the light at two separate splitters, so the paths do not retrace. It is widely used in optical telecoms. In the next module it becomes the clearest test of what a single photon does.

**Gravitational waves.** A passing gravitational wave stretches one arm while squeezing the other, changing the relative length by a strain $h$. LIGO's arms are $4\\ \\mathrm{km}$ long, and the signals detected so far have $h$ near $10^{-21}$. So the arm length changes by about $4\\times 10^{-18}\\ \\mathrm m$, a few thousandths of a proton's size. The detectors reach this by having light bounce many times along each arm, by using high laser power, and by heavy isolation from vibration.

**Pitfalls.** The factor of 2 matters: moving a mirror changes the path by twice the move. And the light must be coherent over the path difference, which a laser provides but a lamp does not for large differences.`,
          resources: [
            openstax3('Read the section on the Michelson interferometer.'),
            {
              title: 'LIGO Caltech: What is an interferometer?',
              url: 'https://www.ligo.caltech.edu/page/what-is-interferometer',
              type: 'article',
              cost: 'free',
              provider: 'LIGO Laboratory, Caltech',
              note: 'How the gravitational-wave detectors use a Michelson design.',
            },
            hyperphysics('Look up the Michelson interferometer.'),
          ],
          exercises: [
            {
              slug: 'count-fringes',
              title: 'Count fringes',
              prompt:
                'You count 316 fringes while moving one mirror of a Michelson interferometer, using $633\\ \\mathrm{nm}$ light. How far did it move? Separately, a $5.0\\ \\mathrm{cm}$ gas cell in one arm is pumped down from atmosphere to vacuum, and 30 fringes pass. Find the refractive index of the gas.',
              kind: 'problem',
              difficulty: 1,
              hint: 'It moved $0.10\\ \\mathrm{mm}$. The index is $n = 1 + N\\lambda/2\\ell = 1.00019$.',
            },
            {
              slug: 'ligo-numbers',
              title: 'How small a change?',
              prompt:
                'For arms of $4.0\\ \\mathrm{km}$ and a strain of $1\\times 10^{-21}$, find the length change. Compare it with the size of a proton, $1.7\\times 10^{-15}\\ \\mathrm m$, and with a laser wavelength of $1064\\ \\mathrm{nm}$. Explain in a few sentences why a single pass of light could not detect this, and what the detector does about it.',
              kind: 'writing',
              difficulty: 2,
              hint: 'The change is $4\\times 10^{-18}\\ \\mathrm m$, about $1/400$ of a proton.',
            },
            {
              slug: 'michelson-output',
              title: 'Model the output',
              prompt:
                'Write a Python function giving the output intensity of a Michelson interferometer as a function of mirror position, $I = I_{\\max}\\cos^2(2\\pi\\Delta L/\\lambda)$. Find the mirror positions where the output changes fastest with $\\Delta L$, and explain why detectors are set to work near those points, or near a dark fringe with a small offset.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does moving a Michelson mirror by $\\lambda/2$ move the pattern by one fringe?',
              answerOutline: 'The light goes out and back, so the path changes by $\\lambda$.',
            },
            {
              question: 'What is optical path length?',
              answerOutline: 'The geometric length times the refractive index.',
            },
            {
              question: 'Why do interferometers need coherent light?',
              answerOutline: 'Fringes appear only if the two beams keep a fixed phase over the path difference.',
            },
          ],
        },
      ],
      project: {
        slug: 'interference-simulator',
        title: 'An interference and diffraction simulator',
        description: `Build a Python tool that predicts the pattern on a distant screen from any set of openings in one dimension. Represent each opening as many point sources, add their complex amplitudes $e^{ikr}$, and plot the intensity. This single method reproduces every result of the module.

Use it to show that a double slit with slits of finite width gives fringes inside a single-slit envelope, that missing orders appear where a fringe meets an envelope zero, and that a grating's peaks sharpen as the number of slits grows. Compare at least one case against the PhET Wave Interference simulation.`,
        deliverables: [
          'A Python function that returns the screen intensity for any list of openings',
          'Plots for a single slit, a double slit and a grating of 10 slits, each checked against its formula',
          'A plot showing a double-slit pattern within its single-slit envelope, with a missing order marked',
          'A measured peak width against the number of slits, showing it falls as one over N',
          'A comparison of one pattern with the PhET simulation',
        ],
        estimatedHours: 3,
        stretchGoals: [
          'Extend to two-dimensional openings and compute the pattern of a circular hole using an FFT',
          'Model partial coherence by averaging patterns over a spread of wavelengths',
        ],
      },
    },
    {
      slug: 'photons',
      title: 'Photons',
      description:
        'Light arrives in lumps of energy hf. The photoelectric effect and Compton scattering show it, and single photons still interfere.',
      lessons: [
        {
          slug: 'the-photoelectric-effect',
          title: 'The photoelectric effect',
          summary:
            'Why light ejects electrons only above a threshold frequency, and Einstein’s photon explanation.',
          estimatedMinutes: 130,
          objectives: [
            'Describe what the wave model predicts, and what is observed',
            'Apply Einstein’s photoelectric equation',
            'Find the work function and threshold wavelength',
            'Use hc = 1240 eV nm to move between energy and wavelength',
          ],
          concepts: [
            'Photon energy E = hf',
            'Work function',
            'Stopping potential',
            'Threshold frequency',
            'Photon flux',
            'eV and nm units',
          ],
          explanation: `Shine light on a clean metal and electrons may come out. Measure their greatest kinetic energy by applying a reverse voltage until the current stops: that **stopping potential** $V_s$ gives $K_{\\max} = eV_s$. The results do not fit a wave picture:

- Below a **threshold frequency**, no electrons come out at all, however bright the light.
- Above it, $K_{\\max}$ depends on the frequency, not on the intensity. Brighter light only gives more electrons.
- Electrons appear at once, even in very dim light, with no delay for energy to build up.

A wave model predicts the opposite of each. Einstein's explanation is that light comes in **photons**, each with energy

$$E = hf = \\frac{hc}{\\lambda}.$$

One photon gives all of its energy to one electron. It must pay the **work function** $\\phi$ to escape, so

$$K_{\\max} = hf - \\phi.$$

Brightness means more photons, not bigger ones.

**Useful units.** For atoms and light, use electron volts and nanometres. Then

$$E\\ (\\mathrm{eV}) = \\frac{1240}{\\lambda\\ (\\mathrm{nm})}.$$

Red light at $700\\ \\mathrm{nm}$ has $1.77\\ \\mathrm{eV}$, and violet at $400\\ \\mathrm{nm}$ has $3.10\\ \\mathrm{eV}$.

**Worked example.** Violet light at $400\\ \\mathrm{nm}$ falls on sodium, with $\\phi = 2.28\\ \\mathrm{eV}$. Find the photon energy, $K_{\\max}$, the stopping potential, and the threshold wavelength.

$$E = \\frac{1240}{400} = 3.10\\ \\mathrm{eV}, \\qquad K_{\\max} = 3.10 - 2.28 = 0.82\\ \\mathrm{eV}.$$

So $V_s = 0.82\\ \\mathrm V$. At threshold, $hc/\\lambda = \\phi$, so $\\lambda_0 = 1240/2.28 = 544\\ \\mathrm{nm}$. Light redder than this does nothing.

Check: the energies are a few eV, which is the scale of chemistry and of visible light. In joules, the photon energy is $5.0\\times 10^{-19}\\ \\mathrm J$, a tiny amount, which is why light seems continuous. The fastest electron moves at $\\sqrt{2K/m_e} = 5.4\\times 10^{5}\\ \\mathrm{m/s}$, well below light speed.

**Counting photons.** A $1.0\\ \\mathrm{mW}$ laser at $633\\ \\mathrm{nm}$ emits $P/(hc/\\lambda) = 3.2\\times 10^{15}$ photons per second. Graininess shows only when light is very faint.

**Measuring $h$.** A plot of $V_s$ against $f$ is a straight line of slope $h/e$, whatever the metal. Millikan's careful measurements of this, intended to disprove Einstein, confirmed him instead.

**Pitfalls.** Intensity does not change $K_{\\max}$. The work function is a property of the surface. Do not mix eV and J in one equation.`,
          resources: [
            openstax3('Read the chapter on photons and matter waves, through the photoelectric effect.'),
            phet('Photoelectric Effect', 'photoelectric', 'An older simulation: if it runs on your machine, vary colour and brightness separately and record the stopping voltage.'),
            mit804('Use the opening lectures on the photoelectric effect.'),
          ],
          exercises: [
            {
              slug: 'which-metals',
              title: 'Which metals respond?',
              prompt:
                'Red light ($700\\ \\mathrm{nm}$) and violet light ($400\\ \\mathrm{nm}$) fall on sodium ($\\phi = 2.28\\ \\mathrm{eV}$) and on zinc ($\\phi = 4.3\\ \\mathrm{eV}$). For each of the four pairs, say whether electrons come out, and if so with what greatest energy.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Only violet on sodium works, giving $0.82\\ \\mathrm{eV}$. Red photons carry $1.77\\ \\mathrm{eV}$.',
            },
            {
              slug: 'two-wavelengths',
              title: 'Find h from two measurements',
              prompt:
                'A metal gives stopping potentials of $V_1$ at $300\\ \\mathrm{nm}$ and $V_2$ at $500\\ \\mathrm{nm}$. Show that $V_1 - V_2 = (hc/e)(1/300 - 1/500)$, in volts with wavelengths in nm. Evaluate it, and explain why the difference does not depend on the metal.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The difference is $1.65\\ \\mathrm V$. The work function cancels.',
            },
            {
              slug: 'wave-model-delay',
              title: 'What waves would predict',
              prompt:
                'Suppose light were a classical wave of intensity $1.0\\times 10^{-6}\\ \\mathrm{W/m^2}$, and an atom could collect energy from an area of $(0.10\\ \\mathrm{nm})^2$. How long would it take to gather $2.28\\ \\mathrm{eV}$? Compare with the observed delay of under $10^{-9}\\ \\mathrm s$. What does this rule out?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The power collected is $10^{-26}\\ \\mathrm W$, so it would take about $3.6\\times 10^{7}\\ \\mathrm s$, more than a year.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which observation is hardest for a wave model to explain?',
              answerOutline: 'The threshold frequency, or the energy depending on frequency not intensity, or the lack of delay.',
            },
            {
              question: 'What does making the light brighter change?',
              answerOutline: 'The number of electrons, not their greatest energy.',
            },
            {
              question: 'What is $hc$ in eV nm, and why is it convenient?',
              answerOutline: '$1240\\ \\mathrm{eV\\,nm}$. It gives photon energy from wavelength in one step.',
            },
          ],
          relatedLessons: ['quantum-mechanics/origins-and-wave-mechanics/the-experiments-that-broke-classical-physics'],
        },
        {
          slug: 'compton-scattering',
          title: 'Compton scattering',
          summary:
            'X-rays bouncing off electrons like billiard balls: photons carry momentum as well as energy.',
          estimatedMinutes: 120,
          objectives: [
            'State the momentum of a photon',
            'Apply the Compton formula for the shift in wavelength',
            'Find the energy given to the recoiling electron',
            'Explain why the effect is invisible for visible light',
          ],
          concepts: [
            'Photon momentum p = h / lambda',
            'Compton wavelength',
            'Wavelength shift with angle',
            'Recoil electron',
            'Rest energy of the electron',
          ],
          explanation: `If photons carry energy in lumps, they should carry momentum too. Relativity gives a particle with no mass a momentum of $p = E/c$, so a photon has

$$p = \\frac{h}{\\lambda}.$$

Compton tested this in 1923. He scattered X-rays off carbon and found that light scattered at an angle had a *longer* wavelength. A wave picture predicts no change. A photon picture predicts exactly what he saw: the photon hits a nearly free electron, gives it some energy, and so leaves with less.

Use conservation of energy and of momentum, with relativistic electron energy. The result is

$$\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_ec}(1 - \\cos\\theta).$$

The constant $h/m_ec = 2.43\\ \\mathrm{pm}$ is the **Compton wavelength** of the electron. The shift depends only on the angle, not on the starting wavelength. It is zero for a glancing hit, and largest, $2h/m_ec$, for straight backscatter.

**Worked example.** X-rays of $71.1\\ \\mathrm{pm}$ scatter at $90^\\circ$ from a free electron. Find the new wavelength, and the kinetic energy given to the electron.

At $90^\\circ$, $\\cos\\theta = 0$, so $\\Delta\\lambda = 2.43\\ \\mathrm{pm}$ and $\\lambda' = 73.5\\ \\mathrm{pm}$. The electron gains the energy the photon lost. Use $E = hc/\\lambda$, with $hc = 1240\\ \\mathrm{eV\\,nm}$ and wavelengths in nm:

$$K = \\frac{1240}{0.0711} - \\frac{1240}{0.0735} = 569\\ \\mathrm{eV}.$$

Check: the photon started with about $17\\ \\mathrm{keV}$ and lost about $3\\%$ of it. That is the same fraction as the wavelength grew, which is consistent. At $180^\\circ$, the wavelength would be $76.0\\ \\mathrm{pm}$.

**Why visible light shows nothing.** The shift is at most $4.9\\ \\mathrm{pm}$. For $500\\ \\mathrm{nm}$ light, that is a fractional change of about $1\\times 10^{-5}$, far too small to notice. For X-rays, with wavelengths of tens of pm, it is a few percent. The effect is the same; only the ratio differs.

The rest energy of the electron, $m_ec^2 = 511\\ \\mathrm{keV}$, is the energy of a photon whose wavelength equals the Compton wavelength. When photon energies approach this, as for gamma rays, the photon can hand most of its energy to the electron.

**Two views.** In the photoelectric effect, a photon is absorbed completely by a bound electron. In Compton scattering, a photon bounces off a nearly free one and survives with less energy. Both treat light as a particle with energy $hf$ and momentum $h/\\lambda$.

**Pitfalls.** The angle is that of the scattered photon, not the electron. Keep wavelengths in consistent units. Use the relativistic electron energy in a derivation, since the electron can move fast.`,
          resources: [
            openstax3('Read the section on the Compton effect.'),
            hyperphysics('Look up Compton scattering.'),
            mit804('Use the lecture material on Compton scattering.'),
          ],
          exercises: [
            {
              slug: 'backscatter',
              title: 'Straight back',
              prompt:
                'For the $71.1\\ \\mathrm{pm}$ X-rays, find the wavelength scattered at $180^\\circ$, and the photon momentum before scattering, in kg m/s. Explain why the electron recoils most for backscatter.',
              kind: 'problem',
              difficulty: 1,
              hint: '$76.0\\ \\mathrm{pm}$; momentum $9.3\\times 10^{-24}\\ \\mathrm{kg\\,m/s}$.',
            },
            {
              slug: 'derive-compton',
              title: 'Derive the Compton formula',
              prompt:
                'Write conservation of energy, $hc/\\lambda + m_ec^2 = hc/\\lambda\' + E_e$, and the vector momentum equation. Using $E_e^2 = (p_ec)^2 + (m_ec^2)^2$, eliminate the electron and derive $\\Delta\\lambda = (h/m_ec)(1 - \\cos\\theta)$. Then confirm $h/m_ec = 2.43\\ \\mathrm{pm}$ numerically.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Square the momentum equation to get $p_e^2$ in terms of the photon momenta and $\\cos\\theta$.',
            },
            {
              slug: 'shift-against-angle',
              title: 'Plot the shift',
              prompt:
                'Plot $\\Delta\\lambda$ against angle from $0$ to $180^\\circ$. On a second axis, plot the electron\'s kinetic energy for incoming photons of $17\\ \\mathrm{keV}$ and of $511\\ \\mathrm{keV}$. What fraction of the photon energy can the electron gain at most, in each case?',
              kind: 'coding',
              difficulty: 2,
              hint: 'At most, the fraction is $2\\epsilon/(1 + 2\\epsilon)$, where $\\epsilon = E/m_ec^2$: about $6\\%$ at 17 keV and two thirds at 511 keV.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the momentum of a photon?',
              answerOutline: '$p = h/\\lambda = E/c$.',
            },
            {
              question: 'Does the Compton shift depend on the starting wavelength?',
              answerOutline: 'No, only on the angle; but its fractional size does.',
            },
            {
              question: 'Why is the Compton effect obvious for X-rays but not for visible light?',
              answerOutline: 'The fixed shift of a few pm is a large fraction of an X-ray wavelength, and tiny for visible light.',
            },
          ],
        },
        {
          slug: 'wave-particle-duality',
          title: 'Wave-particle duality',
          summary:
            'Single photons building up an interference pattern, and the probability interpretation that resolves the paradox.',
          estimatedMinutes: 120,
          objectives: [
            'Describe the single-photon double-slit experiment',
            'Interpret intensity as probability per photon',
            'Explain why which-path information destroys the pattern',
            'Estimate when light behaves as a stream of particles',
          ],
          concepts: [
            'Single-photon interference',
            'Probability amplitude',
            'Born rule for photons',
            'Which-path information',
            'Complementarity',
          ],
          explanation: `Light makes interference patterns, which needs waves, and arrives as photons, which looks like particles. Which is it? The decisive experiment sends light so faint that only one photon is in the apparatus at a time.

**What happens.** Each photon lands at a single point on the detector, as a particle should. At first the dots look random. But as thousands collect, the double-slit fringes appear, built from dots. Each photon on its own must somehow "know" about both slits, because blocking one slit removes the pattern.

**The resolution.** The wave does not describe a spread-out lump of light. It describes **probability**. The wave amplitude at a point, squared, gives the probability per unit area that a photon is detected there. The interference happens in the amplitudes, as you added them in the first module, and the squared result is the chance. Nature does not tell us where an individual photon will land; it gives the odds exactly.

**Which path?** If you add a device that reveals which slit each photon went through, the fringes vanish, and you see the sum of two single-slit patterns. Knowledge of the path and the interference are **complementary**: you can have one or the other, but not both. It is not that the measurement clumsily disturbs the photon. Any record of the path, even one never read, removes the interference, because the two possibilities no longer overlap.

**Worked example.** How faint must a $633\\ \\mathrm{nm}$ beam be before only one photon is in a $1\\ \\mathrm m$ apparatus at a time? First, how far apart are the photons in a $1.0\\ \\mathrm{mW}$ beam?

From the last lesson, the beam carries $3.2\\times 10^{15}$ photons per second. In one second, they spread over $3.00\\times 10^{8}\\ \\mathrm m$ of beam, so the mean spacing is

$$\\frac{3.00\\times 10^{8}}{3.2\\times 10^{15}} = 9.4\\times 10^{-8}\\ \\mathrm m = 94\\ \\mathrm{nm}.$$

For a spacing of $1\\ \\mathrm m$, you need $3.0\\times 10^{8}$ photons per second, which means attenuating this beam by a factor of about $10^{7}$. Check: that power is about $10^{-10}\\ \\mathrm W$, a level that a good detector handles easily. Experiments of this kind have been done many times, and the fringes always appear.

**Not only light.** The next module shows that electrons, neutrons and even large molecules behave in the same way. This dual nature is not a special property of light. It is how all matter behaves.

**Pitfalls.** "The photon goes through both slits" and "the photon is a wave" are both shorthand. The precise statement is that amplitudes for the two paths add, and their squared sum gives the detection probability. Do not imagine a photon splitting into two half-photons: detectors only ever record whole ones.`,
          resources: [
            {
              title: 'Feynman Lectures on Physics, Volume III',
              url: 'https://www.feynmanlectures.caltech.edu/III_toc.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'The first chapter, on quantum behaviour, is the classic account of this experiment. The site may block scripts, but it opens in a browser.',
            },
            phet('Quantum Wave Interference', 'quantum-wave-interference', 'An older simulation: if it runs on your machine, send single photons through two slits and watch the pattern build up.'),
            openstax3('Read the section on wave-particle duality.'),
          ],
          exercises: [
            {
              slug: 'photons-from-the-sun',
              title: 'How many photons?',
              prompt:
                'Sunlight above the atmosphere delivers $1361\\ \\mathrm{W/m^2}$. Taking a typical wavelength of $550\\ \\mathrm{nm}$, estimate the photon rate per square metre. Then estimate how many photons per second reach a detector from a faint star delivering $1.0\\times 10^{-17}\\ \\mathrm W$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'About $3.8\\times 10^{21}$ per second per square metre, and about $28$ per second from the star.',
            },
            {
              slug: 'build-up-simulation',
              title: 'Build a pattern one photon at a time',
              prompt:
                'Using the double-slit intensity as a probability distribution, draw random landing points with NumPy one at a time. Plot histograms after 10, 100, 1000 and 100000 photons. At what count can you first see the fringes? Then draw from the which-path distribution (the sum of two single-slit patterns) and compare.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Use rejection sampling, or `numpy.random.choice` with probabilities proportional to the intensity on a fine grid.',
            },
            {
              slug: 'explain-duality',
              title: 'Explain it to a friend',
              prompt:
                'Write about 250 words explaining the single-photon double-slit experiment to someone who has not studied physics. Your answer must say what is seen, why it rules out both a pure wave and a pure particle model, what is meant by probability here, and what happens when which-path information is recorded.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the squared wave amplitude mean for single photons?',
              answerOutline: 'The probability per unit area of detecting a photon there.',
            },
            {
              question: 'Why does which-path information destroy the fringes?',
              answerOutline: 'The two paths no longer give overlapping amplitudes, so probabilities add instead of amplitudes.',
            },
            {
              question: 'Can you predict where one photon will land?',
              answerOutline: 'No, only the probability distribution.',
            },
          ],
          relatedLessons: ['quantum-mechanics/origins-and-wave-mechanics/matter-waves-and-the-double-slit'],
        },
      ],
      project: {
        slug: 'measure-plancks-constant',
        title: 'Measure Planck’s constant',
        description: `Use a photoelectric simulation as a virtual lab and measure $h$ from your own data, with uncertainties, as Millikan did. In the PhET Photoelectric Effect simulation, or, if it will not run, in your own Python model with a hidden work function chosen by a friend or a random seed, record the stopping voltage at at least eight wavelengths, for two different metals.

Fit $V_s$ against $f$ with a straight line for each metal. The slopes should agree with each other and with $h/e$, while the intercepts give each work function. Report $h$ with an uncertainty from the fit, and say whether it is consistent with the accepted value.`,
        deliverables: [
          'A table of wavelength, frequency and stopping voltage for two metals',
          'A plot of stopping voltage against frequency with straight-line fits',
          'A value of h with an uncertainty from the fit, compared with the accepted value',
          'Work functions and threshold wavelengths for both metals',
          'A paragraph on why the slope does not depend on the metal, while the intercept does',
        ],
        estimatedHours: 3,
        stretchGoals: [
          'Add random noise to the voltages and show how the uncertainty in h scales with the number of points',
          'Show that intensity changes the current but not the stopping voltage',
        ],
      },
    },
    {
      slug: 'matter-waves',
      title: 'Matter Waves',
      description:
        'Particles have wavelengths too. Electron diffraction proves it, and the uncertainty principle follows from it.',
      lessons: [
        {
          slug: 'de-broglie-waves',
          title: 'De Broglie waves',
          summary:
            'Every particle has a wavelength set by its momentum, and why you see it for electrons but never for baseballs.',
          estimatedMinutes: 120,
          objectives: [
            'State the de Broglie relation',
            'Compute the wavelength of an electron accelerated through a voltage',
            'Compare matter wavelengths with the sizes of things they meet',
            'Decide when the non-relativistic formula is good enough',
          ],
          concepts: [
            'De Broglie wavelength',
            'Momentum from kinetic energy',
            'Accelerating voltage',
            'Thermal neutrons',
            'When wave effects matter',
          ],
          explanation: `If light, a wave, has momentum $p = h/\\lambda$, perhaps particles with momentum have a wavelength. De Broglie proposed exactly that, in 1924:

$$\\lambda = \\frac{h}{p}.$$

Wave effects show up only when the wavelength is comparable with the size of whatever the particle meets: slits, atoms, the spacing in a crystal. So the question is always one of size.

For a slow particle of kinetic energy $K$, $p = \\sqrt{2mK}$. An electron accelerated from rest through a voltage $V$ has $K = eV$, so

$$\\lambda = \\frac{h}{\\sqrt{2m_eeV}} \\approx \\frac{1.23}{\\sqrt{V}}\\ \\mathrm{nm},$$

with $V$ in volts. At $100\\ \\mathrm V$ this gives $0.123\\ \\mathrm{nm}$, about the spacing of atoms in a solid. That is why electrons diffract from crystals.

**Worked example.** In the Davisson-Germer experiment, electrons of $54\\ \\mathrm{eV}$ struck a nickel crystal. Find their wavelength, and check that ignoring relativity was fair.

$$p = \\sqrt{2m_eK} = \\sqrt{2(9.11\\times 10^{-31})(54)(1.60\\times 10^{-19})} = 3.97\\times 10^{-24}\\ \\mathrm{kg\\,m/s},$$

$$\\lambda = \\frac{h}{p} = \\frac{6.63\\times 10^{-34}}{3.97\\times 10^{-24}} = 0.167\\ \\mathrm{nm}.$$

The speed is $p/m_e = 4.4\\times 10^{6}\\ \\mathrm{m/s}$, which is $1.5\\%$ of light speed. So the non-relativistic formula is fine. Check with the shortcut: $1.23/\\sqrt{54} = 0.167\\ \\mathrm{nm}$. Electrons this slow have wavelengths a little larger than atomic spacings, which is just what diffraction needs.

**Big objects.** A $0.145\\ \\mathrm{kg}$ baseball at $40\\ \\mathrm{m/s}$ has $\\lambda = 1.1\\times 10^{-34}\\ \\mathrm m$, which is $10^{19}$ times smaller than a proton. No opening could ever show its wave nature. This is why everyday objects seem to follow definite paths: the wave effects are there, but immeasurably small.

**Neutrons.** Neutrons slowed to room temperature, with $p$ found from $\\tfrac32k_BT$, have wavelengths near $0.15\\ \\mathrm{nm}$. They diffract from crystals too, and since they are neutral and carry a magnetic moment, they reveal the positions of light atoms and the magnetic order in materials.

**When relativity matters.** For electrons above some tens of keV, use $pc = \\sqrt{K^2 + 2Km_ec^2}$ instead. Electron microscopes, at hundreds of kV, need this.

**Pitfalls.** Use the momentum, not the energy, in $\\lambda = h/p$. The relation $E = hc/\\lambda$ is for photons only; for an electron, $E \\ne hc/\\lambda$. Convert eV to J before using SI values of $m$ and $h$.`,
          resources: [
            openstax3('Read the sections on matter waves in the chapter on photons and matter waves.'),
            phet('Davisson-Germer: Electron Diffraction', 'davisson-germer', 'An older simulation: if it runs on your machine, find the angle of the strongest peak as you vary the energy.'),
            hyperphysics('Look up the de Broglie wavelength.'),
          ],
          exercises: [
            {
              slug: 'electron-wavelengths',
              title: 'Electron wavelengths',
              prompt:
                'Show that $\\lambda = h/\\sqrt{2m_eeV}$ gives $1.23/\\sqrt V$ nm. Find the wavelength at $100\\ \\mathrm V$ and at $10\\ \\mathrm{kV}$, in pm for the second. Check whether the non-relativistic formula is still fair at $10\\ \\mathrm{kV}$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$0.123\\ \\mathrm{nm}$ and $12.3\\ \\mathrm{pm}$. At $10\\ \\mathrm{kV}$, $K/m_ec^2$ is about $2\\%$, so the error is about $0.5\\%$.',
            },
            {
              slug: 'neutron-and-ball',
              title: 'A neutron and a baseball',
              prompt:
                'Find the wavelength of a neutron with kinetic energy $\\frac32k_BT$ at $300\\ \\mathrm K$, using $m_n = 1.67\\times 10^{-27}\\ \\mathrm{kg}$. Find the wavelength of a $0.145\\ \\mathrm{kg}$ baseball at $40\\ \\mathrm{m/s}$. For each, name something of about that size.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The neutron has about $0.146\\ \\mathrm{nm}$, an atomic spacing. The baseball has $1.1\\times 10^{-34}\\ \\mathrm m$, smaller than anything measurable.',
            },
            {
              slug: 'relativistic-wavelength',
              title: 'Relativistic correction',
              prompt:
                'Write a Python function for an electron\'s wavelength from its kinetic energy, using $pc = \\sqrt{K^2 + 2Km_ec^2}$ with $m_ec^2 = 511\\ \\mathrm{keV}$. Compare with the non-relativistic formula from $10\\ \\mathrm{eV}$ to $1\\ \\mathrm{MeV}$, plot the ratio, and find where they differ by $1\\%$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The ratio is $\\sqrt{1 + K/2m_ec^2}$, so a $1\\%$ difference comes near $K = 20\\ \\mathrm{keV}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'When do wave effects of a particle become noticeable?',
              answerOutline: 'When its wavelength is comparable with the size of the obstacle or opening.',
            },
            {
              question: 'Is $E = hc/\\lambda$ true for an electron?',
              answerOutline: 'No. That relation is for massless photons. For electrons use $\\lambda = h/p$.',
            },
            {
              question: 'Why do we never see a baseball diffract?',
              answerOutline: 'Its wavelength is around $10^{-34}\\ \\mathrm m$, far smaller than any opening.',
            },
          ],
          relatedLessons: ['quantum-mechanics/origins-and-wave-mechanics/matter-waves-and-the-double-slit'],
        },
        {
          slug: 'electron-diffraction',
          title: 'Electron diffraction',
          summary:
            'Crystals as gratings for electrons, the Bragg condition, and the double slit with electrons and molecules.',
          estimatedMinutes: 120,
          objectives: [
            'Apply the Bragg condition',
            'Explain the Davisson-Germer result',
            'Describe the electron double-slit experiment',
            'Estimate wavelengths for large molecules',
          ],
          concepts: [
            'Crystal as a grating',
            'Bragg condition',
            'Davisson-Germer experiment',
            'Electron double slit',
            'Molecule interferometry',
          ],
          explanation: `A crystal is a regular array of atoms, and to a wave of matching wavelength, it is a grating.

**Bragg condition.** Picture the crystal as stacked planes of atoms, a spacing $d$ apart. A wave reflects weakly from each plane. Waves from neighbouring planes differ in path by $2d\\sin\\theta$, where $\\theta$ is measured from the plane, not the normal. They reinforce when

$$2d\\sin\\theta = n\\lambda.$$

This works for X-rays and electrons alike. It is the basis of crystallography: measure angles, and deduce spacings.

**Worked example.** Davisson and Germer sent $54\\ \\mathrm{eV}$ electrons at a nickel crystal, and found a strong reflected peak at $50^\\circ$ from the incoming beam. The surface atoms are in rows $D = 0.215\\ \\mathrm{nm}$ apart. Treat the surface as a reflection grating, for which maxima occur at $D\\sin\\phi = m\\lambda$. Predict $\\lambda$ and compare with de Broglie.

$$\\lambda = D\\sin\\phi = (0.215)\\sin 50^\\circ = 0.165\\ \\mathrm{nm}.$$

The de Broglie value from the last lesson is $0.167\\ \\mathrm{nm}$. They agree within about $1\\%$. Check: this was the first direct evidence that electrons are waves, and the agreement with a formula for light gratings is the point. Using a slightly different energy, the peak moves, as it should.

**Second example.** Electrons of $100\\ \\mathrm{eV}$ ($\\lambda = 0.123\\ \\mathrm{nm}$) meet planes with $d = 0.20\\ \\mathrm{nm}$. The first-order Bragg angle is $\\sin^{-1}(0.123/0.40) = 17.9^\\circ$, and the second is $38.0^\\circ$.

**Double slits.** Later, electrons were sent through true double slits, one at a time. As with photons, each electron arrives as a dot, and the dots build up fringes with the spacing $\\lambda L/d$ given by the de Broglie wavelength. Close one slit and the fringes go. The same has been done with neutrons, atoms and molecules as large as $\\mathrm{C_{60}}$ buckyballs, of 720 atomic mass units. Each molecule interferes only with itself.

**Uses.** Electron microscopes use electron waves with wavelengths of a few pm, so they can show detail far finer than light can. Low-energy electron diffraction maps crystal surfaces, because slow electrons barely get into the material.

**Pitfalls.** In the Bragg condition, $\\theta$ is the angle to the planes, so the beam is turned through $2\\theta$. Real crystals have many sets of planes, and each gives its own peaks. And the reflection grating formula used above is a different geometry, for the surface layer only.`,
          resources: [
            openstax3('Read the sections on electron diffraction and on wave-particle duality.'),
            phet('Davisson-Germer: Electron Diffraction', 'davisson-germer', 'An older simulation: if it runs on your machine, reproduce the peak near 50 degrees at 54 eV.'),
            mit804('Use the lecture material on matter waves and diffraction.'),
          ],
          exercises: [
            {
              slug: 'bragg-angles',
              title: 'Bragg angles',
              prompt:
                'Electrons accelerated through $100\\ \\mathrm V$ strike crystal planes $0.20\\ \\mathrm{nm}$ apart. Find all the Bragg angles that exist. By how much is the beam turned for each?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Orders 1 and 2 at $17.9^\\circ$ and $38.0^\\circ$; a third order would need $\\sin\\theta = 0.92$, which exists too, at about $67^\\circ$. The beam turns through $2\\theta$.',
            },
            {
              slug: 'buckyball',
              title: 'Interfering molecules',
              prompt:
                'A $\\mathrm{C_{60}}$ molecule, of mass $720\\ \\mathrm u$ with $1\\ \\mathrm u = 1.66\\times 10^{-27}\\ \\mathrm{kg}$, moves at $200\\ \\mathrm{m/s}$. Find its wavelength in pm, and compare it with the molecule\'s size of about $1\\ \\mathrm{nm}$. With gratings of period $100\\ \\mathrm{nm}$, find the first-order angle. Why is this experiment hard?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The wavelength is $2.8\\ \\mathrm{pm}$, hundreds of times smaller than the molecule. The angle is about $28\\ \\mathrm{\\mu rad}$.',
            },
            {
              slug: 'electron-buildup',
              title: 'Electron double slit',
              prompt:
                'Electrons of $50\\ \\mathrm{keV}$ pass through slits $1.0\\ \\mathrm{\\mu m}$ apart, with a screen $1.0\\ \\mathrm m$ away. Using the relativistic wavelength from the previous lesson, find the fringe spacing. Then adapt your photon build-up simulation to electrons and show the same pattern emerging.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'The wavelength is about $5.4\\ \\mathrm{pm}$, so the fringe spacing is about $5.4\\ \\mathrm{\\mu m}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What angle appears in the Bragg condition?',
              answerOutline: 'The angle between the beam and the crystal planes.',
            },
            {
              question: 'What did Davisson and Germer show?',
              answerOutline: 'That electrons diffract from a crystal at angles matching the de Broglie wavelength.',
            },
            {
              question: 'Does a molecule interfere with other molecules in a beam?',
              answerOutline: 'No. Each one interferes with itself; the pattern builds up one molecule at a time.',
            },
          ],
        },
        {
          slug: 'uncertainty-principle',
          title: 'The uncertainty principle',
          summary:
            'Why a wave cannot have a sharp position and a sharp wavelength at once, and what this means for atoms and nuclei.',
          estimatedMinutes: 120,
          objectives: [
            'State the position-momentum uncertainty relation',
            'Explain it with wave packets',
            'Use it to estimate energies of confined particles',
            'Apply the energy-time relation to line widths',
          ],
          concepts: [
            'Wave packet',
            'Spread in wave number',
            'Position-momentum uncertainty',
            'Confinement energy',
            'Energy-time relation',
            'Natural line width',
          ],
          explanation: `A pure sine wave has an exact wavelength, but it fills all space, so it has no position. To make a localised **wave packet**, you must add many waves with a spread of wavelengths, so that they reinforce in one place and cancel elsewhere. The narrower the packet, the wider the spread needed. That is a property of all waves, and with $p = h/\\lambda$ it becomes Heisenberg's **uncertainty principle**:

$$\\Delta x\\,\\Delta p \\ge \\frac{\\hbar}{2}, \\qquad \\hbar = \\frac{h}{2\\pi}.$$

The $\\Delta$s are standard deviations. This is not about clumsy measurement. A particle simply does not have a sharp position and a sharp momentum at the same time.

**Confinement costs energy.** If a particle is held within a region of size $\\Delta x$, its momentum must be spread by at least $\\hbar/2\\Delta x$. Even its average kinetic energy can then not be zero. This is why atoms do not collapse, and why the lowest energy of any trapped particle is above the bottom of its potential.

**Worked example.** Estimate the least kinetic energy of an electron confined to an atom-sized region, $\\Delta x = 0.10\\ \\mathrm{nm}$.

$$\\Delta p \\ge \\frac{\\hbar}{2\\Delta x} = \\frac{1.05\\times 10^{-34}}{2(1.0\\times 10^{-10})} = 5.3\\times 10^{-25}\\ \\mathrm{kg\\,m/s}.$$

Taking $p$ to be about $\\Delta p$, the kinetic energy is

$$K \\approx \\frac{(\\Delta p)^2}{2m_e} = 1.52\\times 10^{-19}\\ \\mathrm J = 0.95\\ \\mathrm{eV}.$$

Check: this is an order-of-magnitude estimate, and the result, about $1\\ \\mathrm{eV}$, is the scale of atomic energies, which are a few to tens of eV. So the uncertainty principle alone sets the energy scale of chemistry. The speed would be around $5.8\\times 10^{5}\\ \\mathrm{m/s}$.

Compare a nucleus. A proton confined to $5\\ \\mathrm{fm}$ gets about $0.21\\ \\mathrm{MeV}$ by the same estimate: a million times more, which is the scale of nuclear energies.

**Energy and time.** A state that lasts for a time $\\Delta t$ has an energy spread of

$$\\Delta E \\gtrsim \\frac{\\hbar}{2\\Delta t}.$$

An excited atom that lives $10\\ \\mathrm{ns}$ has $\\Delta E$ of about $3.3\\times 10^{-8}\\ \\mathrm{eV}$, so its spectral line has a tiny but definite **natural width**.

**Everyday objects.** A $0.145\\ \\mathrm{kg}$ ball located to $1\\ \\mathrm{mm}$ has a velocity uncertainty of only $3.6\\times 10^{-31}\\ \\mathrm{m/s}$. Uncertainty is real but unnoticeable at our scale.

**Pitfalls.** Use $\\hbar$, not $h$, and the factor of $\\frac12$ goes with standard deviations. Estimates of this kind are good to within a factor of a few; do not quote them to three figures. And the relation limits what *exists*, not just what we can know.`,
          resources: [
            openstax3('Read the section on the Heisenberg uncertainty principle.'),
            mit804('Use the lectures on wave packets and uncertainty.'),
            {
              title: 'NumPy FFT documentation',
              url: 'https://numpy.org/doc/stable/reference/routines.fft.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
              note: 'For the wave-packet exercise.',
            },
          ],
          exercises: [
            {
              slug: 'packet-widths',
              title: 'Measure a wave packet',
              prompt:
                'In Python, build a Gaussian wave packet $\\psi(x) = e^{-x^2/4\\sigma^2}e^{ik_0x}$ on a fine grid, and use `numpy.fft` to find its spread in wave number. Measure the standard deviations of $|\\psi|^2$ in $x$ and of $|\\tilde\\psi|^2$ in $k$, and show that their product is $\\frac12$ for several values of $\\sigma$. Explain why a Gaussian gives the minimum.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Normalise both distributions before taking standard deviations, and remember that $p = \\hbar k$.',
            },
            {
              slug: 'no-electrons-in-nuclei',
              title: 'Why electrons are not in nuclei',
              prompt:
                'An early idea put electrons inside nuclei. For an electron confined to $5\\ \\mathrm{fm}$, estimate $\\Delta p$, then $pc$ in MeV. Since this is much more than $m_ec^2$, the electron would be highly relativistic, with $K \\approx pc$. Compare with the energies of electrons emitted in beta decay, about $1\\ \\mathrm{MeV}$, and draw a conclusion.',
              kind: 'problem',
              difficulty: 2,
              hint: '$pc$ is about $20\\ \\mathrm{MeV}$, far too large for an electron to be held by nuclear energies.',
            },
            {
              slug: 'line-width',
              title: 'Width of a spectral line',
              prompt:
                'A state lives for $10\\ \\mathrm{ns}$ and emits at $656\\ \\mathrm{nm}$. Estimate $\\Delta E$ in eV, then the fractional width $\\Delta E/E$, and the width in wavelength. Compare with the Doppler broadening from atoms moving at $10\\ \\mathrm{km/s}$, which gives $\\Delta\\lambda/\\lambda$ of about $v/c$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$\\Delta E$ is about $3.3\\times 10^{-8}\\ \\mathrm{eV}$, a fraction of about $10^{-8}$. Doppler broadening, at $3\\times 10^{-5}$, is far larger.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must a localised wave contain many wavelengths?',
              answerOutline: 'Only a sum of many waves can cancel everywhere except in one region.',
            },
            {
              question: 'Why do atoms not collapse?',
              answerOutline: 'Squeezing the electron closer raises its kinetic energy through the uncertainty principle.',
            },
            {
              question: 'Is the uncertainty principle a limit on our instruments?',
              answerOutline: 'No. It is a property of waves: sharp position and sharp momentum do not exist together.',
            },
          ],
          relatedLessons: ['quantum-mechanics/origins-and-wave-mechanics/wave-packets-and-the-uncertainty-principle'],
        },
      ],
    },
    {
      slug: 'wave-mechanics',
      title: 'Wave Mechanics',
      description:
        'The Schrodinger equation, solved for a particle in a box and for a barrier: quantised energies and tunnelling.',
      lessons: [
        {
          slug: 'the-schrodinger-equation',
          title: 'The Schrodinger equation',
          summary:
            'The wave equation for matter, the meaning of the wave function, and how to normalise it.',
          estimatedMinutes: 130,
          objectives: [
            'Write the time-independent Schrodinger equation in one dimension',
            'State the Born rule',
            'Normalise a wave function',
            'Compute the probability of finding a particle in a region',
          ],
          concepts: [
            'Wave function',
            'Time-independent Schrodinger equation',
            'Born rule',
            'Normalisation',
            'Stationary states',
            'Conditions on a valid wave function',
          ],
          explanation: `Matter waves need an equation. For a particle of mass $m$ in a potential energy $U(x)$, with a definite energy $E$, the wave function $\\psi(x)$ obeys the **time-independent Schrodinger equation**:

$$-\\frac{\\hbar^2}{2m}\\frac{d^2\\psi}{dx^2} + U(x)\\psi = E\\psi.$$

Read it as energy accounting. The first term is the kinetic energy: more curvature means a shorter wavelength and so more momentum. For a free particle with $U = 0$, the solution $\\psi = e^{ikx}$ gives $E = \\hbar^2k^2/2m = p^2/2m$ with $p = \\hbar k = h/\\lambda$, which is de Broglie's relation. So the equation contains what you already know.

Where $E > U$, the solutions curve back toward the axis and oscillate. Where $E < U$, a region classically forbidden, they curve away and grow or decay exponentially. These two behaviours explain everything in the next two lessons.

**The Born rule.** The wave function itself is not observable. Its square gives a probability density:

$$P(a \\le x \\le b) = \\int_a^b|\\psi(x)|^2\\,dx.$$

So $\\psi$ must be **normalised**, $\\int_{-\\infty}^{\\infty}|\\psi|^2\\,dx = 1$, because the particle is somewhere. A valid $\\psi$ must also be finite, single-valued and continuous, and so must its slope wherever $U$ is finite. These conditions, applied at boundaries, are what force energies to take only certain values.

**Time.** States of definite energy, called **stationary states**, change with time only by a phase factor $e^{-iEt/\\hbar}$. So $|\\psi|^2$ does not change: nothing moves in a stationary state.

**Worked example.** A particle in a region $0 \\le x \\le L$ has $\\psi = A\\sin(\\pi x/L)$ inside and zero outside. Normalise it, and find the probability of finding the particle in the middle third.

Normalise, using $\\sin^2 = \\frac12(1 - \\cos 2\\theta)$:

$$\\int_0^LA^2\\sin^2\\frac{\\pi x}{L}\\,dx = A^2\\frac{L}{2} = 1 \\quad\\Rightarrow\\quad A = \\sqrt{\\frac{2}{L}}.$$

For the middle third,

$$P = \\frac{2}{L}\\int_{L/3}^{2L/3}\\sin^2\\frac{\\pi x}{L}\\,dx = \\frac13 + \\frac{\\sqrt 3}{2\\pi} = 0.609.$$

Check: a classical particle bouncing at constant speed would spend a third of its time there. The quantum probability is larger, since $|\\psi|^2$ peaks in the middle. Units: $A$ has units of $\\mathrm{m^{-1/2}}$, so $|\\psi|^2\\,dx$ is a pure number, as a probability must be.

**Pitfalls.** $\\psi$ can be negative or complex; only $|\\psi|^2$ is a probability. Normalise before computing probabilities. This is a postulate, checked by experiment, not a derivation from earlier physics.`,
          resources: [
            openstax3('Read the chapter on quantum mechanics, through the Schrodinger equation.'),
            falstadQm('Pick a potential and look at the shapes of its stationary states.'),
            mit804('Use the lectures on the Schrodinger equation and the meaning of the wave function.'),
          ],
          exercises: [
            {
              slug: 'normalise-a-parabola',
              title: 'Normalise a trial function',
              prompt:
                'On $0 \\le x \\le L$, take $\\psi = Ax(L - x)$. Find $A$ by normalising. Show that the probability of finding the particle in the left half is $0.50$, and explain this by symmetry. For $L = 1$, give $A$ to three figures.',
              kind: 'problem',
              difficulty: 1,
              hint: '$A = \\sqrt{30/L^5}$, which is $5.48$ for $L = 1$.',
            },
            {
              slug: 'probability-near-a-wall',
              title: 'Probability near a wall',
              prompt:
                'For the normalised ground state $\\sqrt{2/L}\\sin(\\pi x/L)$, find the probability of finding the particle in the first quarter of the box, by hand and by numerical integration. Compare it with the classical value of $0.25$, and explain the difference.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The probability is $\\frac14 - \\frac{1}{2\\pi} = 0.091$, much less than classical, since $\\psi$ vanishes at the wall.',
            },
            {
              slug: 'check-free-solution',
              title: 'Check a solution',
              prompt:
                'Substitute $\\psi = e^{ikx}$ into the equation with $U = 0$ and find $E$ in terms of $k$. Then substitute $\\psi = e^{-\\kappa x}$ with constant $U > E$ and find $\\kappa$. Explain what each result means physically, and which one occurs inside a barrier. Use SymPy to check your algebra.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$E = \\hbar^2k^2/2m$ and $\\kappa = \\sqrt{2m(U - E)}/\\hbar$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does $|\\psi(x)|^2$ represent?',
              answerOutline: 'The probability density for finding the particle at $x$.',
            },
            {
              question: 'Why must a wave function be normalised?',
              answerOutline: 'The total probability of finding the particle somewhere must be 1.',
            },
            {
              question: 'What does the wave function do where $E < U$?',
              answerOutline: 'It grows or decays exponentially, instead of oscillating.',
            },
          ],
          relatedLessons: ['quantum-mechanics/origins-and-wave-mechanics/the-schrodinger-equation-and-the-born-rule'],
        },
        {
          slug: 'particle-in-a-box',
          title: 'Particle in a box',
          summary:
            'The simplest quantum system: standing waves, quantised energies, and why small boxes have large spacings.',
          estimatedMinutes: 130,
          objectives: [
            'Solve the Schrodinger equation for an infinite square well',
            'Explain how boundary conditions give quantised energies',
            'Compute energy levels and transition wavelengths',
            'Describe what changes for a finite well',
          ],
          concepts: [
            'Infinite square well',
            'Boundary conditions',
            'Quantised energy levels',
            'Zero-point energy',
            'Transitions and photons',
            'Finite well and leakage',
          ],
          explanation: `Put a particle in a region $0 \\le x \\le L$ with impenetrable walls: $U = 0$ inside and infinite outside. Outside, $\\psi = 0$. Inside, the equation is $\\psi'' = -k^2\\psi$, with $k = \\sqrt{2mE}/\\hbar$. Its solutions are sines and cosines. Continuity at $x = 0$ rules out the cosine, so $\\psi = A\\sin kx$. Continuity at $x = L$ needs $\\sin kL = 0$, so $kL = n\\pi$.

That boundary condition is the whole story. Only waves that fit a whole number of half-wavelengths into the box are allowed, just like a guitar string. So the energy can only take the values

$$E_n = \\frac{n^2h^2}{8mL^2}, \\qquad n = 1, 2, 3, \\ldots$$

with $\\psi_n = \\sqrt{2/L}\\sin(n\\pi x/L)$. Three features matter.

- **Quantisation**: energy levels are separate, with gaps growing as $n^2$.
- **Zero-point energy**: the lowest energy is $E_1$, not zero, as the uncertainty principle demands.
- **Size**: energies go as $1/mL^2$, so small boxes and light particles have widely spaced levels.

**Worked example.** An electron is confined to $L = 0.50\\ \\mathrm{nm}$. Find $E_1$, and the wavelength of a photon emitted in a jump from $n = 2$ to $n = 1$.

$$E_1 = \\frac{(6.63\\times 10^{-34})^2}{8(9.11\\times 10^{-31})(0.50\\times 10^{-9})^2} = 2.41\\times 10^{-19}\\ \\mathrm J = 1.51\\ \\mathrm{eV}.$$

Then $E_2 - E_1 = 3E_1 = 4.52\\ \\mathrm{eV}$, and $\\lambda = 1240/4.52 = 274\\ \\mathrm{nm}$, in the ultraviolet.

Check: atomic-size boxes give energies of eV, as the last module estimated. Doubling $L$ to $1.0\\ \\mathrm{nm}$ quarters $E_1$ to $0.38\\ \\mathrm{eV}$. This is how **quantum dots** work: tiny crystals whose colour is set by their size.

**Bigger particles, bigger boxes.** A proton in a $10\\ \\mathrm{fm}$ nucleus gets $E_1$ near $2.1\\ \\mathrm{MeV}$. A $0.10\\ \\mathrm{kg}$ ball in a $1\\ \\mathrm m$ box has $5.5\\times 10^{-67}\\ \\mathrm J$, so its levels are so close that energy looks continuous. This is the **correspondence principle**: quantum results blend into classical ones at large scales.

**Finite walls.** Real wells have finite depth. Then $\\psi$ does not stop at the wall but decays exponentially into it. The waves effectively fit a slightly larger box, so the levels are a little lower, and only a finite number of them are bound. The leaking tail is the start of tunnelling.

**Pitfalls.** The quantum number starts at $n = 1$; $n = 0$ gives $\\psi = 0$, which is no particle at all. Use $h$ in this formula, or $\\hbar$ with $\\pi^2$: $E_n = n^2\\pi^2\\hbar^2/2mL^2$. And jumps give photons of the energy *difference*.`,
          resources: [
            openstax3('Read the section on the quantum particle in a box.'),
            phet('Quantum Bound States', 'bound-states', 'An older simulation: if it runs on your machine, compare the square well with finite depth, and watch levels move as you change its width.'),
            falstadQm('Choose the infinite well and look at the first few states and their energies.'),
          ],
          exercises: [
            {
              slug: 'box-energies',
              title: 'Energies in a box',
              prompt:
                'For an electron in a $1.0\\ \\mathrm{nm}$ box, find $E_1$, $E_2$ and $E_3$ in eV, and the wavelength of the $3 \\to 2$ transition. For a proton in a box of $10\\ \\mathrm{fm}$, find $E_1$ in MeV.',
              kind: 'problem',
              difficulty: 1,
              hint: '$E_1 = 0.38\\ \\mathrm{eV}$; the levels go as $n^2$. The proton has about $2.1\\ \\mathrm{MeV}$.',
            },
            {
              slug: 'dye-molecule',
              title: 'Colour of a long molecule',
              prompt:
                'Model the six mobile electrons of a chain molecule as particles in a box of length $0.70\\ \\mathrm{nm}$. Two electrons fit in each level, so levels $n = 1, 2, 3$ are full. Find the energy of the lowest jump, from $n = 3$ to $n = 4$, and the wavelength absorbed. In which part of the spectrum is it? How must the chain length change to absorb visible light?',
              kind: 'problem',
              difficulty: 2,
              hint: '$\\Delta E = 7h^2/8mL^2 = 5.4\\ \\mathrm{eV}$, so $\\lambda$ is about $230\\ \\mathrm{nm}$, ultraviolet. Longer chains absorb at longer wavelengths.',
            },
            {
              slug: 'shooting-method',
              title: 'Solve the box numerically',
              prompt:
                'Write a shooting-method solver: start with $\\psi(0) = 0$ and $\\psi\'(0) = 1$, integrate the Schrodinger equation across the box with `scipy.integrate.solve_ivp`, and adjust $E$ with `scipy.optimize.brentq` until $\\psi(L) = 0$. Use units where $\\hbar = m = L = 1$. Recover the first four energies to six figures, and compare with $n^2\\pi^2/2$.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Scan $E$ on a grid first to find sign changes of $\\psi(L)$, then refine each one.',
            },
          ],
          selfAssessment: [
            {
              question: 'What forces the energy of a particle in a box to be quantised?',
              answerOutline: 'The wave must vanish at both walls, so only whole numbers of half-wavelengths fit.',
            },
            {
              question: 'Why can the lowest energy not be zero?',
              answerOutline: 'Zero energy would mean $\\psi = 0$; equally, confinement requires a spread in momentum.',
            },
            {
              question: 'How does $E_1$ depend on the width of the box?',
              answerOutline: 'As $1/L^2$: halve the width and the energy goes up four times.',
            },
          ],
          relatedLessons: ['quantum-mechanics/one-dimensional-problems/stationary-states-and-the-infinite-well'],
        },
        {
          slug: 'tunnelling',
          title: 'Tunnelling',
          summary:
            'How a particle crosses a barrier it classically cannot, and how this runs microscopes, chips and the Sun.',
          estimatedMinutes: 130,
          objectives: [
            'Describe the wave function inside and beyond a barrier',
            'Estimate the tunnelling probability for a thick barrier',
            'Explain why tunnelling is so sensitive to width',
            'Give examples of tunnelling in nature and technology',
          ],
          concepts: [
            'Classically forbidden region',
            'Decay constant',
            'Transmission probability',
            'Exponential sensitivity to width',
            'Scanning tunnelling microscope',
            'Alpha decay',
          ],
          explanation: `A ball rolling toward a hill without enough energy to climb it turns back. A quantum particle need not. Inside a barrier where $U > E$, the Schrodinger equation gives decaying solutions,

$$\\psi \\propto e^{-\\kappa x}, \\qquad \\kappa = \\frac{\\sqrt{2m(U - E)}}{\\hbar}.$$

If the barrier ends before $\\psi$ has died away, the wave continues beyond it, as a smaller travelling wave. The particle has a chance of being found on the far side. That is **tunnelling**.

For a barrier of width $L$ that is thick compared with $1/\\kappa$, the transmission probability is roughly

$$T \\approx e^{-2\\kappa L},$$

since probability goes as $|\\psi|^2$. The exact formula has a prefactor of order one, which this estimate ignores.

The key feature is the exponential. Tunnelling is very sensitive to the width of the barrier, to its height, and to the mass of the particle.

**Worked example.** An electron of energy $5.0\\ \\mathrm{eV}$ meets a barrier $10\\ \\mathrm{eV}$ high and $0.50\\ \\mathrm{nm}$ wide. Estimate $T$, and the effect of widening the gap by $0.10\\ \\mathrm{nm}$.

$$\\kappa = \\frac{\\sqrt{2(9.11\\times 10^{-31})(5.0\\times 1.60\\times 10^{-19})}}{1.05\\times 10^{-34}} = 1.1\\times 10^{10}\\ \\mathrm{m^{-1}}.$$

So $2\\kappa L = 11.5$, and $T \\approx e^{-11.5} = 1.0\\times 10^{-5}$.

Adding $0.10\\ \\mathrm{nm}$ multiplies $T$ by $e^{-2\\kappa(0.10\\ \\mathrm{nm})} = 0.10$. Doubling the width to $1.0\\ \\mathrm{nm}$ gives $1.0\\times 10^{-10}$.

Check: $1/\\kappa$ is about $0.09\\ \\mathrm{nm}$, so the barrier is several decay lengths thick, and the estimate is fair. A tenfold change per tenth of a nanometre is the right size for what follows.

**The scanning tunnelling microscope.** A sharp tip is held about a nanometre above a surface, with a small voltage. Electrons tunnel across the gap, and the current changes about tenfold for each $0.1\\ \\mathrm{nm}$ of height. Holding the current steady while scanning maps the surface atom by atom.

**Mass matters.** A proton facing the same barrier has $2\\kappa L$ of about $490$, so $T$ is effectively zero. Heavy particles rarely tunnel far, except through very thin barriers.

**In nature.** Alpha particles escape nuclei by tunnelling through the barrier made by the electric repulsion. Small changes in energy change the lifetime from microseconds to billions of years. Protons in the Sun fuse by tunnelling through their mutual repulsion, at temperatures too low to climb over it. And modern flash memory stores bits by tunnelling electrons through thin insulators.

**Pitfalls.** Tunnelling does not violate energy conservation. The particle never has negative kinetic energy as a measured value; the potential just is not a wall. Use $U - E$, not $U$, in $\\kappa$. And $e^{-2\\kappa L}$ is only an estimate for thick barriers.`,
          resources: [
            openstax3('Read the section on quantum tunnelling of particles through potential barriers.'),
            phet('Quantum Tunneling and Wave Packets', 'quantum-tunneling', 'An older simulation: if it runs on your machine, change barrier width and height, and watch the transmitted part.'),
            falstadQm('Use a barrier potential to see the wave decay inside and continue beyond it.'),
          ],
          exercises: [
            {
              slug: 'stm-sensitivity',
              title: 'Sensitivity of a microscope',
              prompt:
                'In an STM, the electrons see a barrier $4.0\\ \\mathrm{eV}$ above their energy. Find $\\kappa$, and the factor by which the current changes when the gap grows by $0.10\\ \\mathrm{nm}$. If the electronics can detect a $2\\%$ change in current, what is the smallest height change it can detect?',
              kind: 'problem',
              difficulty: 2,
              hint: 'The factor is about $0.13$. A $2\\%$ change needs about $1\\ \\mathrm{pm}$ of height change.',
            },
            {
              slug: 'mass-dependence',
              title: 'Electrons against protons',
              prompt:
                'For the worked-example barrier, compare $2\\kappa L$ for an electron and for a proton. Express $T$ for the proton as a power of ten. How thin would the barrier need to be for the proton to have the same $T$ as the electron?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The exponent is $11.5$ for the electron and about $490$ for the proton, so $T$ is about $10^{-214}$. The barrier would have to be $\\sqrt{m_e/m_p}$ times as thick, about $0.012\\ \\mathrm{nm}$.',
            },
            {
              slug: 'exact-transmission',
              title: 'Exact transmission',
              prompt:
                'The exact transmission for a rectangular barrier with $E < U$ is $T = [1 + U^2\\sinh^2(\\kappa L)/(4E(U - E))]^{-1}$. Code it in Python and plot it against $L$ for the worked-example values, together with $e^{-2\\kappa L}$. Over what range of $L$ does the estimate hold within a factor of 2?',
              kind: 'coding',
              difficulty: 2,
              hint: 'For thick barriers the exact result approaches $16\\frac{E}{U}(1 - \\frac{E}{U})e^{-2\\kappa L}$, which here is $4e^{-2\\kappa L}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the wave function do inside a barrier?',
              answerOutline: 'It decays exponentially, with decay constant $\\kappa = \\sqrt{2m(U - E)}/\\hbar$.',
            },
            {
              question: 'Why is tunnelling so sensitive to the barrier width?',
              answerOutline: 'The probability goes as $e^{-2\\kappa L}$, an exponential in the width.',
            },
            {
              question: 'Name two places where tunnelling matters.',
              answerOutline: 'For example: STM, alpha decay, fusion in the Sun, flash memory.',
            },
          ],
          relatedLessons: ['quantum-mechanics/one-dimensional-problems/scattering-tunnelling-and-the-step-potential'],
        },
      ],
      project: {
        slug: 'schrodinger-solver',
        title: 'A one-dimensional Schrodinger solver',
        description: `Build a finite-difference solver for the time-independent Schrodinger equation in one dimension. Place the wave function on a grid of $N$ points, replace $\\psi''$ by $(\\psi_{i+1} - 2\\psi_i + \\psi_{i-1})/\\Delta x^2$, and the equation becomes a matrix eigenvalue problem that \`scipy.linalg.eigh_tridiagonal\` solves at once. The eigenvalues are the energies and the eigenvectors are the states.

Validate it on the infinite well, then use it on problems you cannot solve by hand: a finite well, a double well, and a harmonic potential. Use units where $\\hbar = m = 1$ during development, and convert to eV and nm for the final results.`,
        deliverables: [
          'A Python solver that takes any potential on a grid and returns energies and normalised states',
          'A convergence test on the infinite well showing that the error falls as the grid step squared',
          'Energies and plots for a finite well of depth 10 eV and width 1 nm, with the number of bound states',
          'A double well, showing the split of the lowest level into a close pair and the shapes of the two states',
          'A harmonic potential, with energies checked against the evenly spaced pattern (n + 1/2) times hbar omega',
          'A comparison of one case with the Falstad applet',
        ],
        estimatedHours: 4,
        stretchGoals: [
          'Add time evolution with the Crank-Nicolson method, and send a wave packet at a barrier',
          'Find how the double-well splitting depends on the barrier width, and link it to tunnelling',
        ],
      },
    },
    {
      slug: 'atoms-and-applications',
      title: 'Atoms and Applications',
      description:
        'The hydrogen atom and its spectrum, the structure of atoms with many electrons, spin, and an outline of lasers and semiconductors.',
      lessons: [
        {
          slug: 'the-bohr-atom',
          title: 'The Bohr atom and hydrogen spectra',
          summary:
            'The energy levels of hydrogen, the lines they produce, and what Bohr’s model got right and wrong.',
          estimatedMinutes: 130,
          objectives: [
            'State the energy levels of hydrogen',
            'Compute wavelengths of spectral lines',
            'Explain the Bohr model as standing electron waves',
            'Say where the Bohr model fails',
          ],
          concepts: [
            'Line spectra',
            'Energy levels of hydrogen',
            'Ionisation energy',
            'Lyman and Balmer series',
            'Bohr radius',
            'Limits of the Bohr model',
          ],
          explanation: `Heated hydrogen does not glow with all colours. It emits a few sharp **spectral lines**. The explanation is that the atom has only certain energies, and each line is a photon carrying the difference between two of them.

The levels of hydrogen are

$$E_n = -\\frac{13.6\\ \\mathrm{eV}}{n^2}, \\qquad n = 1, 2, 3, \\ldots$$

The zero is an electron at rest far from the proton, so bound states are negative. The ground state has $-13.6\\ \\mathrm{eV}$, which is the **ionisation energy**. A jump from $n_2$ to a lower $n_1$ emits a photon of energy

$$E = 13.6\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)\\ \\mathrm{eV}.$$

Jumps to $n_1 = 1$ form the ultraviolet **Lyman series**. Jumps to $n_1 = 2$ form the **Balmer series**, which includes the visible lines.

**Bohr's model.** In 1913, Bohr pictured the electron in circular orbits, but allowed only those with angular momentum $L = n\\hbar$. In de Broglie's language, a whole number of electron wavelengths fit around the orbit. With Coulomb attraction providing the centripetal force, this gives the energies above, and radii $r_n = n^2a_0$ with the **Bohr radius** $a_0 = 0.0529\\ \\mathrm{nm}$. It even predicts $13.6\\ \\mathrm{eV}$ from $m_e$, $e$, $\\hbar$ and $\\epsilon_0$ alone.

**Worked example.** Find the wavelength of the red Balmer line, from $n = 3$ to $n = 2$.

$$E = 13.6\\left(\\frac14 - \\frac19\\right) = 1.89\\ \\mathrm{eV}, \\qquad \\lambda = \\frac{1240}{1.89} = 656\\ \\mathrm{nm}.$$

Check: this is the familiar red line of hydrogen, H-alpha, measured at $656.3\\ \\mathrm{nm}$ in air. The jump from $4$ to $2$ gives $486\\ \\mathrm{nm}$, which is blue-green, and the series ends at $365\\ \\mathrm{nm}$ when $n_2$ goes to infinity. Lines come closer and closer at the short-wavelength end, just as the formula says.

**What Bohr got wrong.** The model works for hydrogen and for other one-electron ions such as $\\mathrm{He^+}$, whose energies scale as $Z^2$, giving $54.4\\ \\mathrm{eV}$ for its ground state. It fails for atoms with more electrons. It gives the wrong angular momentum, since the true ground state has $L = 0$. And the electron does not move in a definite orbit at all. The full solution of the Schrodinger equation in three dimensions keeps the energies, but replaces orbits with standing-wave clouds called **orbitals**. That solution is in the follow-on course.

**Pitfalls.** Use the difference of two levels for the photon energy. A larger $n$ is a higher, less negative energy. Absorption lines from cool gas take the same wavelengths as emission lines, starting from the lower level.`,
          resources: [
            openstax3('Read the chapter on atomic structure, through the Bohr model.'),
            phet('Models of the Hydrogen Atom', 'models-of-the-hydrogen-atom', 'Compare the Bohr and Schrodinger models, and watch which photons get absorbed.'),
            {
              title: 'NIST Atomic Spectra Database: Lines',
              url: 'https://physics.nist.gov/PhysRefData/ASD/lines_form.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Look up hydrogen (H I) to get measured wavelengths for comparison.',
            },
          ],
          exercises: [
            {
              slug: 'balmer-and-lyman',
              title: 'Lines of hydrogen',
              prompt:
                'Find the wavelengths of Lyman alpha ($2 \\to 1$), H-beta ($4 \\to 2$) and the Balmer series limit. Find the energy needed to ionise hydrogen from $n = 2$, and the radius of the $n = 3$ Bohr orbit. Separately, find the ground-state energy of $\\mathrm{He^+}$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$122\\ \\mathrm{nm}$, $486\\ \\mathrm{nm}$ and $365\\ \\mathrm{nm}$; $3.40\\ \\mathrm{eV}$; $0.476\\ \\mathrm{nm}$; $-54.4\\ \\mathrm{eV}$.',
            },
            {
              slug: 'derive-bohr',
              title: 'Derive the Bohr energies',
              prompt:
                'Combine $mv^2/r = ke^2/r^2$ with $mvr = n\\hbar$. Derive $r_n$ and $E_n = \\frac12mv^2 - ke^2/r$. Evaluate $a_0$ and $E_1$ from the constants in the course description, and show that you recover $0.0529\\ \\mathrm{nm}$ and $13.6\\ \\mathrm{eV}$ to within a percent.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'You should get $E_n = -mk^2e^4/(2\\hbar^2n^2)$.',
            },
            {
              slug: 'compare-with-nist',
              title: 'Compare with measured lines',
              prompt:
                'From the NIST Atomic Spectra Database, get the measured vacuum wavelengths of the first five Balmer lines of hydrogen. Compute the Bohr predictions, using the more precise Rydberg energy $13.606\\ \\mathrm{eV}$ and $hc = 1239.84\\ \\mathrm{eV\\,nm}$. Tabulate the fractional differences. The remaining difference of about 5 parts in $10^4$ comes mostly from the motion of the proton. Show that the reduced-mass factor $m_p/(m_p + m_e)$ explains it.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Compare vacuum wavelengths, not air wavelengths. The reduced-mass correction is about $5.4\\times 10^{-4}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does hydrogen emit only certain wavelengths?',
              answerOutline: 'Its energy levels are separate, and each photon carries one level difference.',
            },
            {
              question: 'Why are the levels negative?',
              answerOutline: 'Zero is a free electron at rest, and bound states have less energy.',
            },
            {
              question: 'Give one way in which the Bohr model is wrong.',
              answerOutline: 'It fails for many-electron atoms, gives the wrong ground-state angular momentum, and assumes definite orbits.',
            },
          ],
          relatedLessons: ['quantum-mechanics/hydrogen-and-atoms/hydrogen-atom'],
        },
        {
          slug: 'atomic-structure-and-spin',
          title: 'Atomic structure and spin',
          summary:
            'Four quantum numbers, the exclusion principle, the periodic table, and the intrinsic spin of the electron.',
          estimatedMinutes: 130,
          objectives: [
            'List the quantum numbers of an electron in an atom',
            'Count the states in a shell and subshell',
            'Explain the periodic table with the exclusion principle',
            'Describe spin and the Stern-Gerlach experiment',
          ],
          concepts: [
            'Quantum numbers n, l, m, ms',
            'Orbital angular momentum',
            'Spin',
            'Pauli exclusion principle',
            'Shells and the periodic table',
            'Stern-Gerlach and Zeeman effects',
          ],
          explanation: `Solving the Schrodinger equation for hydrogen in three dimensions gives three quantum numbers, one for each direction of space:

- $n = 1, 2, 3, \\ldots$ sets the energy, as in Bohr's formula.
- $l = 0, 1, \\ldots, n - 1$ sets the orbital angular momentum, $L = \\sqrt{l(l + 1)}\\,\\hbar$.
- $m_l = -l, \\ldots, +l$ sets the component of angular momentum along an axis, $L_z = m_l\\hbar$.

**Spin.** Experiment demands a fourth. In the **Stern-Gerlach experiment**, silver atoms passed through a non-uniform magnetic field split into exactly two beams. A classical magnet would give a smear of all orientations. Electrons have an intrinsic angular momentum, **spin**, with component $m_s = \\pm\\tfrac12$, so $S_z = \\pm\\hbar/2$. It is not literally a spinning ball; it is a built-in quantum property. With it comes a magnetic moment of about one **Bohr magneton**, $\\mu_B = 5.79\\times 10^{-5}\\ \\mathrm{eV/T}$. In a field $B$, the two spin states differ in energy by $2\\mu_BB$. This splitting of lines in a field is part of the **Zeeman effect**.

**The exclusion principle.** No two electrons in an atom can have the same set of four quantum numbers. Electrons therefore fill states from the bottom up, rather than all crowding into the ground state.

**Worked example.** How many electron states are in the $n = 3$ shell, and in its $l = 2$ subshell? Write the configuration of sodium, with 11 electrons.

Each value of $l$ has $2l + 1$ values of $m_l$, and each has 2 spins, so a subshell holds $2(2l + 1)$ electrons. For $l = 2$ that is $10$. The $n = 3$ shell has $l = 0, 1, 2$, holding $2 + 6 + 10 = 18$, which matches $2n^2$.

Sodium fills $1s^2\\,2s^2\\,2p^6$, which is 10 electrons and a closed shell like neon, and then puts one electron in $3s$. Check: that lone outer electron is easily removed, which is why sodium is a reactive metal with chemistry like the other alkali metals. The pattern of shells is the pattern of the periodic table.

In a field of $1.0\\ \\mathrm T$, the spin splitting is $2\\mu_BB = 1.16\\times 10^{-4}\\ \\mathrm{eV}$, much smaller than $k_BT$ at room temperature. To make it equal to $k_BT$ at $300\\ \\mathrm K$ would need $223\\ \\mathrm T$. This is why magnetic resonance needs sensitive detection, and why ordinary materials are only weakly magnetised.

**Many electrons.** In atoms with more electrons, the outer ones are partly shielded from the nucleus by the inner ones. Then orbitals with lower $l$, which penetrate closer in, sit lower in energy. This is why $4s$ fills before $3d$.

**Pitfalls.** The rule $l \\le n - 1$ is easy to forget. The value of $L$ is $\\sqrt{l(l+1)}\\hbar$, not $l\\hbar$. Spin is not orbital motion, and its magnetic moment is about twice what a classical spinning charge would give.`,
          resources: [
            openstax3('Read the sections on orbital angular momentum, electron spin, the exclusion principle and the periodic table.'),
            phet('Stern-Gerlach Experiment', 'stern-gerlach', 'An older simulation: if it runs on your machine, send atoms through one and then two magnets.'),
            hyperphysics('Look up quantum numbers and the periodic table.'),
          ],
          exercises: [
            {
              slug: 'count-states',
              title: 'Count states',
              prompt:
                'List all sets of $(n, l, m_l, m_s)$ for $n = 2$, and confirm there are $8$. How many electrons can the $4f$ subshell hold? Write the configurations of carbon (6), argon (18) and potassium (19).',
              kind: 'problem',
              difficulty: 1,
              hint: '$4f$ means $l = 3$, so it holds 14. Potassium puts its last electron in $4s$.',
            },
            {
              slug: 'zeeman-size',
              title: 'Size of the Zeeman splitting',
              prompt:
                'Find the spin splitting $2\\mu_BB$ in eV at $1.0\\ \\mathrm T$. Find the photon frequency that matches this energy, and say which part of the spectrum it is in. What field would make the splitting equal to $k_BT$ at $300\\ \\mathrm K$?',
              kind: 'problem',
              difficulty: 2,
              hint: '$1.16\\times 10^{-4}\\ \\mathrm{eV}$, about $28\\ \\mathrm{GHz}$, microwaves. About $223\\ \\mathrm T$.',
            },
            {
              slug: 'stern-gerlach-sequence',
              title: 'Successive Stern-Gerlach magnets',
              prompt:
                'Atoms pass a magnet along $z$, and only the up beam is kept. Describe what a second $z$ magnet does to it, and what an $x$ magnet does. Then a third $z$ magnet follows the $x$ magnet, keeping only one of its beams. What fractions emerge, and what does this say about measuring spin along different axes?',
              kind: 'writing',
              difficulty: 2,
              hint: 'A second $z$ magnet passes all of them up. An $x$ magnet splits them in half. The third $z$ magnet splits them in half again.',
            },
          ],
          selfAssessment: [
            {
              question: 'What did the Stern-Gerlach experiment show?',
              answerOutline: 'Angular momentum along a field direction is quantised: the beam splits into two, revealing spin one half.',
            },
            {
              question: 'State the exclusion principle.',
              answerOutline: 'No two electrons in an atom share the same four quantum numbers.',
            },
            {
              question: 'Why is sodium chemically similar to potassium?',
              answerOutline: 'Each has one electron outside a closed shell.',
            },
          ],
          relatedLessons: ['quantum-mechanics/angular-momentum-and-spin/spin-one-half-and-stern-gerlach'],
        },
        {
          slug: 'lasers-and-semiconductors',
          title: 'Lasers and semiconductors in outline',
          summary:
            'Stimulated emission and population inversion, energy bands and band gaps, LEDs and solar cells.',
          estimatedMinutes: 120,
          objectives: [
            'Explain absorption, spontaneous emission and stimulated emission',
            'Explain why a laser needs a population inversion',
            'Describe energy bands and band gaps',
            'Relate an LED colour or a cell cutoff to its band gap',
          ],
          concepts: [
            'Stimulated emission',
            'Population inversion',
            'Optical cavity',
            'Energy bands',
            'Band gap',
            'LEDs and solar cells',
          ],
          explanation: `**Lasers.** An atom can interact with light in three ways. It can **absorb** a photon and jump up. An excited atom can **emit spontaneously**, in a random direction at a random time. Or an incoming photon can trigger **stimulated emission**: the excited atom drops and releases a second photon identical to the first, with the same direction, frequency and phase.

To amplify light, stimulated emission must beat absorption, so more atoms must be in the upper level than the lower one. That is a **population inversion**, and it never happens at equilibrium. The Boltzmann factor makes upper levels emptier. For a gap of $1.9\\ \\mathrm{eV}$ at $300\\ \\mathrm K$, the thermal ratio is $e^{-1.9/0.026} = 1.2\\times 10^{-32}$. So a laser must be pumped, by current, by a flash lamp, or by another laser, usually through a three- or four-level scheme. Mirrors at each end form an **optical cavity**, sending photons back and forth through the gain medium, so that the beam builds up. The result is light that is very nearly one colour and is coherent, which is why the interference experiments of the first module are so easy with a laser.

**Bands.** In a solid, the levels of many atoms merge into broad **bands**. Electrons fill these from the bottom. In a metal, the top band is only partly full, so electrons can move freely. In an insulator or a semiconductor, a full band is separated by a **band gap** $E_g$ from an empty one above. Electrons can conduct only if they gain at least $E_g$. In a semiconductor the gap is about $1\\ \\mathrm{eV}$, small enough that heat, light or impurities can put electrons across. Silicon has $E_g = 1.12\\ \\mathrm{eV}$.

**Devices.** Adding a few impurity atoms makes a material with extra electrons (n-type) or missing ones, called holes (p-type). Where the two meet, at a **p-n junction**, electrons fall across the gap and release its energy. In an **LED**, that energy leaves as a photon, of energy about $E_g$. A **solar cell** runs this backward: a photon with at least $E_g$ lifts an electron across, and the junction's field pushes it into a circuit.

**Worked example.** A red LED has a band gap of $1.9\\ \\mathrm{eV}$. What wavelength does it emit? What is the longest wavelength a silicon solar cell can use?

$$\\lambda_{\\text{LED}} = \\frac{1240}{1.9} = 653\\ \\mathrm{nm}, \\qquad \\lambda_{\\text{Si}} = \\frac{1240}{1.12} = 1107\\ \\mathrm{nm}.$$

Check: $653\\ \\mathrm{nm}$ is red, as stated, and silicon absorbs all visible light and some near infrared, which is why cells look dark. A blue LED at $450\\ \\mathrm{nm}$ needs a gap of $2.76\\ \\mathrm{eV}$. That is why blue LEDs needed new materials such as gallium nitride, whose $3.4\\ \\mathrm{eV}$ gap corresponds to $365\\ \\mathrm{nm}$. Their invention won the 2014 Nobel prize.

**Pitfalls.** Real LEDs emit a little above $E_g$, over a spread of energies. A solar cell wastes the energy above $E_g$ in each photon as heat. Full band theory comes in later courses.`,
          resources: [
            openstax3('Read the chapters on condensed matter physics, the sections on band theory and semiconductor devices, and the section on lasers.'),
            phet('Lasers', 'lasers', 'An older simulation: if it runs on your machine, pump atoms until a population inversion appears.'),
            phet('Semiconductors', 'semiconductor', 'An older simulation: if it runs on your machine, build a p-n junction and see why it conducts one way.'),
          ],
          exercises: [
            {
              slug: 'band-gaps',
              title: 'Band gaps and colours',
              prompt:
                'Find the wavelength for a gap of $3.4\\ \\mathrm{eV}$ (gallium nitride) and the gap needed for a $450\\ \\mathrm{nm}$ blue LED. Separately, find how many photons per second a $5.0\\ \\mathrm{mW}$ red laser pointer at $650\\ \\mathrm{nm}$ emits.',
              kind: 'problem',
              difficulty: 1,
              hint: '$365\\ \\mathrm{nm}$; $2.76\\ \\mathrm{eV}$; about $1.6\\times 10^{16}$ per second.',
            },
            {
              slug: 'why-inversion',
              title: 'Why lasers need pumping',
              prompt:
                'Using the Boltzmann factor, find the ratio of upper to lower populations for a $1.9\\ \\mathrm{eV}$ gap at $300\\ \\mathrm K$, and find the temperature at which the ratio would reach $0.1$. Then explain in a few sentences why no temperature gives an inversion, and how a three-level scheme gets around this.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The ratio is $1.2\\times 10^{-32}$. A ratio of $0.1$ needs about $9600\\ \\mathrm K$, and at any temperature the ratio stays below 1.',
            },
            {
              slug: 'solar-cell-limit',
              title: 'How much sunlight can silicon use?',
              prompt:
                'Model sunlight as a blackbody at $5800\\ \\mathrm K$. With Python, integrate the Planck spectrum to find the fraction of the power carried by photons with energy above $1.12\\ \\mathrm{eV}$. Then find the fraction of the total power a cell could deliver if it kept exactly $E_g$ from each such photon and lost the rest. Comment on how this limit depends on the choice of gap.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Integrate over photon energy, and count photons as power divided by photon energy. The second fraction is about $0.44$ for silicon.',
            },
          ],
          selfAssessment: [
            {
              question: 'What makes stimulated emission useful for amplification?',
              answerOutline: 'The new photon matches the old one in direction, frequency and phase.',
            },
            {
              question: 'Why is a population inversion impossible at equilibrium?',
              answerOutline: 'The Boltzmann factor always makes the upper level less populated than the lower one.',
            },
            {
              question: 'How does a band gap set the colour of an LED?',
              answerOutline: 'Each photon carries about the gap energy, so $\\lambda \\approx hc/E_g$.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'quantum-toolkit-and-spectra',
    title: 'A numerical quantum toolkit, tested against real spectra',
    description: `Build a small Python toolkit for one-dimensional quantum problems, and use it to explain real measurements. The aim is the habit at the centre of this course: a model, a check against a case you know exactly, and then a comparison with data.

The toolkit has three parts. A bound-state solver for any potential, from the Wave Mechanics project or a new version. A transmission calculator for barriers, which works by matching wave solutions across a series of thin flat slices, and is checked against the exact rectangular-barrier formula. And a probabilistic detector that turns any $|\\psi|^2$ into simulated individual detection events.

Then apply it. Use the bound-state solver to model the absorption of a series of chain molecules of increasing length, and compare the trend with measured values you look up. Use the barrier calculator to model the current of a scanning tunnelling microscope against tip height. Compare the Bohr model of hydrogen with measured Balmer lines from the NIST Atomic Spectra Database, including the reduced-mass correction. Finally, simulate an electron double-slit experiment detection by detection, and show the pattern emerging.`,
    deliverables: [
      'A documented Python package with a bound-state solver, a barrier transmission calculator and a detection sampler',
      'Tests: infinite well energies, the harmonic oscillator, and the exact rectangular-barrier formula, each matched to within 0.1 percent',
      'A plot of predicted absorption wavelength against chain length, beside measured values, with a short discussion of the gap between them',
      'A plot of STM current against height on a log scale, with the decay constant extracted and compared with theory',
      'A table of measured and predicted Balmer lines with and without the reduced-mass correction',
      'Snapshots of a simulated electron double-slit pattern building up from 10 to 100000 detections',
      'A report of about 1500 words explaining what each result shows about wave-particle duality and quantisation',
    ],
    estimatedHours: 8,
    stretchGoals: [
      'Add time evolution and animate a wave packet hitting a barrier, measuring the transmitted fraction',
      'Model a quantum dot as a finite spherical well, solved through its radial equation, and compare colour with dot size',
    ],
  },
  masteryChecklist: [
    'I can predict interference and diffraction patterns and measure tiny distances with interferometers',
    'I can explain the photoelectric effect and Compton scattering with photons of energy hf and momentum h over lambda',
    'I can explain what the single-photon double-slit experiment shows',
    'I can compute de Broglie wavelengths and use the uncertainty principle to estimate energies',
    'I can solve the Schrodinger equation for a box, and estimate tunnelling through a barrier',
    'I can compute hydrogen spectra and explain the structure of atoms with quantum numbers and spin',
    'I can explain in outline how lasers, LEDs and solar cells work',
    'I can check a quantum result with units, energy scales and a short Python model',
  ],
});
