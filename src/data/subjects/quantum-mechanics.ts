import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/** Resources reused across many lessons; spread them and add a lesson-specific note. */
const R = {
  mit804: {
    title: 'MIT 8.04 Quantum Physics I (Spring 2016, Zwiebach) — lecture notes and videos',
    url: 'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2016/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit804adams: {
    title: 'MIT 8.04 Quantum Physics I (Spring 2013, Adams) — video lectures',
    url: 'https://ocw.mit.edu/courses/8-04-quantum-physics-i-spring-2013/',
    type: 'lecture',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit805: {
    title: 'MIT 8.05 Quantum Physics II (Fall 2013, Zwiebach)',
    url: 'https://ocw.mit.edu/courses/8-05-quantum-physics-ii-fall-2013/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit806: {
    title: 'MIT 8.06 Quantum Physics III (Spring 2018, Zwiebach)',
    url: 'https://ocw.mit.edu/courses/8-06-quantum-physics-iii-spring-2018/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  tongQM: {
    title: 'David Tong — Lectures on Quantum Mechanics',
    url: 'https://davidtong.org/teaching/quantum-mechanics/',
    type: 'textbook',
    cost: 'free',
    provider: 'University of Cambridge',
  },
  tongTopics: {
    title: 'David Tong — Lectures on Topics in Quantum Mechanics',
    url: 'https://davidtong.org/teaching/topics-in-quantum-mechanics/',
    type: 'textbook',
    cost: 'free',
    provider: 'University of Cambridge',
  },
  susskind: {
    title: 'Susskind — The Theoretical Minimum: Quantum Mechanics (video lectures)',
    url: 'https://theoreticalminimum.com/courses/quantum-mechanics/2012/winter',
    type: 'lecture',
    cost: 'free',
    provider: 'Stanford University',
  },
  openstax3: {
    title: 'OpenStax University Physics Volume 3 — Chapters 6-8 (Photons and Matter Waves, Quantum Mechanics, Atomic Structure)',
    url: 'https://openstax.org/books/university-physics-volume-3/pages/7-introduction',
    type: 'textbook',
    cost: 'free',
    provider: 'OpenStax',
  },
  griffiths: {
    title: 'Griffiths & Schroeter — Introduction to Quantum Mechanics (3rd ed.)',
    url: 'https://www.cambridge.org/core/books/introduction-to-quantum-mechanics/990799CA07A83FC5312402AF6860311E',
    type: 'textbook',
    cost: 'paid',
    provider: 'Cambridge University Press',
  },
  libretexts: {
    title: 'Physics LibreTexts — Quantum Mechanics bookshelf',
    url: 'https://phys.libretexts.org/Bookshelves/Quantum_Mechanics',
    type: 'textbook',
    cost: 'free',
    provider: 'LibreTexts',
  },
  qutip: {
    title: 'QuTiP — Quantum Toolbox in Python',
    url: 'https://qutip.org/',
    type: 'tool',
    cost: 'free',
    provider: 'QuTiP project',
  },
  ibmq: {
    title: 'IBM Quantum Learning (successor to the Qiskit Textbook)',
    url: 'https://quantum.cloud.ibm.com/learning',
    type: 'course',
    cost: 'free',
    provider: 'IBM',
  },
  qiskitTextbook: {
    title: 'Qiskit Textbook (archived source, notebooks still runnable)',
    url: 'https://github.com/Qiskit/textbook',
    type: 'interactive',
    cost: 'free',
    provider: 'IBM / Qiskit',
  },
  preskill: {
    title: 'Preskill — Lecture Notes for Ph219/CS219 Quantum Computation',
    url: 'http://theory.caltech.edu/~preskill/ph229/',
    type: 'textbook',
    cost: 'free',
    provider: 'Caltech',
  },
} satisfies Record<string, ResourceInput>;

const feynman3 = (ch: number, title: string): ResourceInput => ({
  title: `Feynman Lectures Vol. III, Ch. ${ch}: ${title}`,
  url: `https://www.feynmanlectures.caltech.edu/III_${String(ch).padStart(2, '0')}.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'Caltech',
});

export default defineSubject({
  id: 'quantum-mechanics',
  title: 'Quantum Mechanics',
  category: 'physics',
  tagline:
    'Wavefunctions, operators, spin and entanglement: the theory that replaced trajectories with amplitudes, and the mathematics to compute with it.',
  description: `Quantum mechanics is the most precisely tested theory in science and the strangest. It replaces the trajectory of a particle with a complex-valued wavefunction whose squared modulus gives probabilities, it makes measurement an active process, and it allows two particles to share a state that neither has on its own. Everything from the stability of atoms to the transistor, the laser, MRI and the emerging quantum computer rests on it.

This curriculum follows the MIT sequence 8.04-8.05-8.06 (Zwiebach's lecture notes and videos are free on OpenCourseWare) with David Tong's Cambridge notes and the Feynman Lectures Vol. III as parallel readings. The first two modules build wave mechanics in one dimension, where every problem can be solved exactly or numerically and intuition forms. Module 3 abstracts to Dirac notation and the postulates. Modules 4-5 treat angular momentum, spin and the hydrogen atom, which is where quantum mechanics meets chemistry and spectroscopy. Module 6 covers the approximation methods every working physicist uses. Module 7 turns to entanglement, Bell's theorem, decoherence and quantum information, with real circuits run on IBM hardware.

Derivation and computation are at the centre. You will solve the Schrödinger equation analytically and with your own finite-difference and split-operator codes, diagonalise Hamiltonians numerically, simulate spin precession and Rabi oscillations, verify perturbation theory against exact diagonalisation, and test a Bell inequality. The capstone combines a numerical Schrödinger solver with a written treatment of a quantum information protocol.`,
  difficulty: 'advanced',
  estimatedHours: 110,
  prerequisites: ['waves-optics', 'math-methods'],
  recommendedBackground: [
    'Linear algebra: vector spaces, inner products, Hermitian matrices, eigenvalues (math-methods module 3)',
    'Fourier transforms and the wave equation (waves-optics modules 3-4)',
    'Ordinary differential equations and separation of variables',
    'Python with NumPy and SciPy for numerical work',
  ],
  tags: ['quantum mechanics', 'Schrödinger equation', 'spin', 'hydrogen atom', 'perturbation theory', 'entanglement', 'quantum information'],
  core: true,
  modules: [
    {
      slug: 'origins-and-wave-mechanics',
      title: 'Origins and Wave Mechanics',
      description:
        'The experiments that broke classical physics, matter waves, the Schrödinger equation and the probabilistic interpretation, and wave packets with the uncertainty principle.',
      lessons: [
        {
          slug: 'the-experiments-that-broke-classical-physics',
          title: 'The experiments that broke classical physics',
          summary:
            'Blackbody radiation, the photoelectric effect, Compton scattering and atomic spectra: four results no classical theory could explain and the quantum hypotheses that did.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why the classical Rayleigh-Jeans law fails and how Planck\'s $E = h\\nu$ resolves it',
            'Use Einstein\'s photon picture to predict the photoelectric stopping potential and explain its independence from intensity',
            'Derive the Compton shift $\\Delta\\lambda = (h/m_ec)(1 - \\cos\\theta)$ from relativistic energy-momentum conservation',
            'Derive the Bohr energy levels and explain the Rydberg formula, and state what Bohr\'s model cannot do',
          ],
          concepts: [
            'Ultraviolet catastrophe and Planck\'s quantum $E = h\\nu$',
            'Photoelectric effect; work function; $E_{max} = h\\nu - W$',
            'Photon momentum $p = h/\\lambda$ and Compton scattering',
            'Line spectra and the Rydberg formula',
            'Bohr model: quantised angular momentum $L = n\\hbar$',
            'Bohr radius $a_0$ and the Rydberg energy 13.6 eV',
            'Correspondence principle',
            'Franck-Hertz experiment',
          ],
          explanation: `By 1900 physics had Newton, Maxwell and thermodynamics, and four stubborn facts that contradicted them.

**Blackbody radiation.** Classical equipartition gives each cavity mode energy $k_BT$; with infinitely many high-frequency modes the energy diverges (Rayleigh-Jeans). Planck fitted the data by assuming each mode exchanges energy only in quanta $E = h\\nu$, so modes with $h\\nu \\gg k_BT$ are frozen out; $h = 6.626\\times10^{-34}$ J s came from that fit (the thermodynamics subject derives the full Planck law).

**Photoelectric effect.** Light ejects electrons from metals with a maximum kinetic energy that depends on frequency, not intensity, and with no delay even at low intensity. Einstein (1905) took Planck's quanta literally: light arrives as **photons** of energy $h\\nu$, each absorbed by one electron, so $E_{max} = h\\nu - W$. Millikan's measurement of the slope gave $h$ again, to 0.5%.

**Compton scattering.** X-rays scattering from electrons shift in wavelength by $\\Delta\\lambda = \\frac{h}{m_ec}(1 - \\cos\\theta)$, exactly what you get by treating the photon as a particle with $p = h/\\lambda$ colliding elastically with an electron, using relativistic kinematics. Waves cannot do this.

**Atomic spectra.** Hydrogen emits at wavelengths given by Rydberg's $1/\\lambda = R(1/n^2 - 1/m^2)$. Bohr (1913) postulated that the electron's angular momentum is quantised, $L = n\\hbar$, and that radiation occurs only in jumps between the resulting orbits. The energies come out as
$$E_n = -\\frac{m_ee^4}{2(4\\pi\\epsilon_0)^2\\hbar^2}\\frac{1}{n^2} = -\\frac{13.6\\ \\mathrm{eV}}{n^2},$$
with orbit radii $n^2a_0$, $a_0 = 0.529$ Å. It reproduces Rydberg's constant from fundamental constants, which was sensational, but it cannot explain intensities, fine structure, multi-electron atoms or why the postulate holds. The Bohr model is a scaffold: use it for order-of-magnitude estimates, then discard it in module 5.

These results share a pattern: energy and momentum are exchanged in discrete lumps whose size is set by $h$, and the wave and particle pictures each describe part of the truth. The next lesson shows that the same duality applies to electrons. Read OpenStax Vol. 3 chapter 6 for the phenomena, then Zwiebach's 8.04 lecture 1 notes, and do the Compton derivation yourself.`,
          resources: [
            { ...R.openstax3, url: 'https://openstax.org/books/university-physics-volume-3/pages/6-introduction', title: 'OpenStax University Physics Vol. 3, Chapter 6: Photons and Matter Waves', note: 'Sections 6.1-6.4: blackbody, photoelectric effect, Compton, Bohr.', primary: true },
            { ...R.mit804, note: 'Lecture 1 notes: "Quantum mechanics as a framework; photoelectric effect, Compton scattering".' },
            feynman3(1, 'Quantum Behavior'),
            {
              title: 'PhET — Blackbody Spectrum',
              url: 'https://phet.colorado.edu/en/simulations/blackbody-spectrum',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Colorado Boulder',
            },
          ],
          exercises: [
            {
              slug: 'compton-derivation',
              title: 'Derive the Compton formula',
              prompt:
                'A photon of wavelength $\\lambda$ scatters off a stationary electron through angle $\\theta$. Using relativistic energy and momentum conservation (with $E^2 = p^2c^2 + m^2c^4$ for the electron and $E = pc$ for the photon), derive $\\lambda\' - \\lambda = \\frac{h}{m_ec}(1 - \\cos\\theta)$. Compute the Compton wavelength $h/m_ec$ (2.43 pm), the maximum shift, and explain why the effect is invisible for visible light but obvious for X-rays. Then compute the recoil electron\'s kinetic energy for a 100 keV photon scattered at 90°.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'photoelectric-data',
              title: 'Extract h from photoelectric data',
              prompt:
                'Millikan-style data for sodium: stopping potentials of 0.17, 0.63, 1.07 and 1.52 V at wavelengths 546, 436, 365 and 313 nm. Fit a straight line of $eV_{stop}$ against frequency, extract $h$ and the work function with uncertainties, and compare with 6.626 × 10⁻³⁴ J s and 2.28 eV. Explain in one paragraph why the intensity of the light does not appear anywhere in the analysis.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'bohr-model-derivation',
              title: 'The Bohr model and its limits',
              prompt:
                'Derive $E_n$, $r_n$ and the orbital speed $v_n = \\alpha c/n$ from $L = n\\hbar$ plus Coulomb\'s law, where $\\alpha = e^2/4\\pi\\epsilon_0\\hbar c \\approx 1/137$. Reproduce the first four Balmer lines and compare with the measured 656.3, 486.1, 434.0 and 410.2 nm (include the reduced-mass correction and quantify its effect). Apply the model to He⁺ and to positronium. List three experimental facts the model cannot explain.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What feature of the photoelectric effect is impossible to explain with classical waves?',
              answerOutline:
                'The maximum electron energy depends on frequency, not intensity, with a sharp threshold and no time delay; classical waves deliver energy continuously in proportion to intensity.',
            },
            {
              question: 'Why does Compton scattering establish that photons carry momentum?',
              answerOutline:
                'The wavelength shift depends on angle exactly as elastic two-body kinematics with photon momentum h/λ predicts; a wave would scatter at unchanged frequency.',
            },
            {
              question: 'What does the Bohr model get right and what is wrong with it?',
              answerOutline:
                'Right: hydrogen energy levels, Rydberg constant, size of atoms. Wrong: postulated rather than derived, no intensities, no fine structure, fails for helium, wrong angular momentum for the ground state (0, not ħ).',
            },
          ],
        },
        {
          slug: 'matter-waves-and-the-double-slit',
          title: 'Matter waves and the double-slit experiment',
          summary:
            'De Broglie\'s hypothesis, its confirmation by electron diffraction, and the two-slit experiment with single electrons that defines what "quantum behaviour" means.',
          estimatedMinutes: 100,
          objectives: [
            'Compute de Broglie wavelengths for electrons, neutrons, atoms and macroscopic objects and judge when wave effects matter',
            'Explain the Davisson-Germer experiment with Bragg\'s law',
            'Describe the single-electron double-slit experiment and state the rules for combining probability amplitudes',
            'Explain why detecting which slit the electron passes through destroys the interference pattern',
          ],
          concepts: [
            'De Broglie relation $\\lambda = h/p$',
            'Electron and neutron diffraction; Bragg condition',
            'Probability amplitudes: add amplitudes, then square',
            'Interference of single particles with themselves',
            'Which-path information and complementarity',
            'Decoherence as the practical reason classical objects do not interfere',
            'Thermal de Broglie wavelength',
          ],
          explanation: `De Broglie (1924) guessed that if light waves are also particles, particles might also be waves, with the same relation $\\lambda = h/p$. For an electron accelerated through 100 V, $\\lambda = 1.2$ Å, comparable to atomic spacings, so crystals should diffract electrons. Davisson and Germer saw exactly that in 1927: electrons reflected from nickel at angles satisfying Bragg's law $n\\lambda = 2d\\sin\\theta$. Neutrons, atoms, and molecules with over 2000 atoms have since been diffracted. A thrown baseball has $\\lambda \\sim 10^{-34}$ m, which is why you never notice.

The **double-slit experiment** with single electrons is the cleanest statement of what quantum mechanics is. Send electrons one at a time through two slits onto a screen. Each arrives as a point: a particle. But the accumulated points form an interference pattern: a wave. The pattern persists when only one electron is in the apparatus at a time, so each electron interferes with itself. Hitachi's 1989 movie of this (in the resources) is worth ten pages of text.

Feynman's rules describe it. Associate a complex **amplitude** with each way an event can happen. If the ways are indistinguishable, add the amplitudes, then square: $P = |\\phi_1 + \\phi_2|^2 = |\\phi_1|^2 + |\\phi_2|^2 + 2\\,\\mathrm{Re}(\\phi_1^*\\phi_2)$, and the cross term is the interference. If you put a detector at the slits so that the paths are distinguishable, add the probabilities instead: $P = |\\phi_1|^2 + |\\phi_2|^2$, no fringes. This is not a matter of the detector "disturbing" the electron crudely; any physical record of which path, however gentle, removes the interference, because the record becomes entangled with the electron (module 7 makes this precise). **Complementarity**: the wave and particle descriptions are each complete in their own experimental context and never contradict each other because no experiment shows both at once.

Read Feynman III-1 and III-3 (the chapter on amplitudes is the best thing ever written on this), watch the Hitachi video, run the PhET Davisson-Germer simulation, and do the exercises, which make the amplitude rules quantitative.`,
          resources: [
            { ...feynman3(1, 'Quantum Behavior'), primary: true },
            feynman3(3, 'Probability Amplitudes'),
            {
              title: 'Hitachi — single-electron double-slit experiment (video and explanation)',
              url: 'https://www.hitachi.com/rd/research/materials/quantum/doubleslit/index.html',
              type: 'video',
              cost: 'free',
              provider: 'Hitachi R&D',
              note: 'Tonomura\'s 1989 experiment: watch the pattern build up one electron at a time.',
            },
            {
              title: 'PhET — Davisson-Germer: Electron Diffraction',
              url: 'https://phet.colorado.edu/en/simulations/davisson-germer',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Colorado Boulder',
            },
            { ...R.mit804, note: 'Lecture 2 notes on matter waves and the de Broglie relation.' },
          ],
          exercises: [
            {
              slug: 'de-broglie-table',
              title: 'A table of de Broglie wavelengths',
              prompt:
                'Compute $\\lambda$ for: an electron at 1 eV, 100 eV and 100 keV (relativistic!); a thermal neutron at 300 K; a rubidium atom at 100 nK; a C₆₀ molecule at 300 K; a 1 g bead at 1 mm/s. For each, name a structure of comparable size and say whether diffraction is observable. For the electron at 100 keV compare the relativistic and non-relativistic wavelengths.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'two-slit-amplitudes',
              title: 'Two-slit pattern from amplitudes',
              prompt:
                'Model each slit as a point source of amplitude $\\phi_j = e^{ikr_j}/r_j$ (slit separation $d$, screen distance $L \\gg d$). Derive the intensity $I(x) \\propto \\cos^2(\\pi dx/\\lambda L)$ and plot it in Python for electrons at 50 keV with $d = 1$ μm, $L = 1$ m. Then add a which-path detector of efficiency $\\eta$ (the fraction of electrons whose path is recorded) and show the fringe visibility is $1 - \\eta$. Plot the pattern for $\\eta = 0, 0.5, 1$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bragg-davisson-germer',
              title: 'Davisson-Germer analysis',
              prompt:
                'Davisson and Germer found a peak at 50° scattering angle for 54 eV electrons on nickel. Using the nickel lattice spacing for the relevant planes ($d = 0.091$ nm) and the geometry of their experiment (the relation between scattering angle and Bragg angle), show the peak corresponds to first-order Bragg reflection with the de Broglie wavelength. Predict the accelerating voltage of the second-order peak.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the rule for combining amplitudes when a process can happen in several indistinguishable ways.',
              answerOutline:
                'Add the complex amplitudes for each way and square the modulus of the sum; interference comes from the cross terms.',
            },
            {
              question: 'Why does recording which slit the electron used destroy the fringes?',
              answerOutline:
                'The alternatives become distinguishable (the detector state differs for each path), so probabilities rather than amplitudes add; formally the electron is entangled with the detector and its reduced state has no coherence.',
            },
            {
              question: 'Why do we not see interference of baseballs?',
              answerOutline:
                'λ = h/p is ∼10⁻³⁴ m, far below any slit size, and the object constantly interacts with its environment, which records its path (decoherence).',
            },
          ],
        },
        {
          slug: 'the-schrodinger-equation-and-the-born-rule',
          title: 'The Schrödinger equation and the Born rule',
          summary:
            'The wavefunction, the time-dependent Schrödinger equation, $|\\psi|^2$ as probability density, normalisation, probability current, and expectation values of position and momentum.',
          estimatedMinutes: 120,
          objectives: [
            'Motivate the Schrödinger equation from the free-particle plane wave and the energy relation $E = p^2/2m + V$',
            'State the Born rule and show that the Schrödinger equation preserves normalisation via the continuity equation',
            'Compute expectation values $\\langle x\\rangle$, $\\langle p\\rangle$ and $\\langle p^2\\rangle$ from a wavefunction using the momentum operator $-i\\hbar\\,\\partial_x$',
            'Derive Ehrenfest\'s theorem for $d\\langle x\\rangle/dt$ and $d\\langle p\\rangle/dt$',
          ],
          concepts: [
            'Wavefunction $\\psi(x,t)$ as a complex amplitude',
            'Time-dependent Schrödinger equation $i\\hbar\\,\\partial_t\\psi = -\\frac{\\hbar^2}{2m}\\partial_x^2\\psi + V\\psi$',
            'Born rule $P(x)dx = |\\psi|^2dx$',
            'Normalisation and square-integrability',
            'Probability current $j = \\frac{\\hbar}{m}\\mathrm{Im}(\\psi^*\\partial_x\\psi)$ and continuity',
            'Momentum operator $\\hat p = -i\\hbar\\,\\partial_x$',
            'Expectation values and operators',
            'Ehrenfest\'s theorem',
          ],
          explanation: `A free particle with definite momentum $p$ and energy $E$ should be a plane wave $\\psi = e^{i(kx - \\omega t)}$ with $p = \\hbar k$ and $E = \\hbar\\omega$ (de Broglie and Planck). Then $-i\\hbar\\,\\partial_x\\psi = p\\psi$ and $i\\hbar\\,\\partial_t\\psi = E\\psi$. Demanding $E = p^2/2m + V(x)$ for every such wave, and linearity so that superpositions are allowed, gives the **time-dependent Schrödinger equation**
$$i\\hbar\\frac{\\partial\\psi}{\\partial t} = -\\frac{\\hbar^2}{2m}\\frac{\\partial^2\\psi}{\\partial x^2} + V(x)\\psi \\equiv \\hat H\\psi .$$
This is a motivation, not a derivation; the equation is a postulate confirmed by every test. Note that it is first order in time (so $\\psi$ at one instant determines the future) and *complex*: the $i$ is essential, not a convenience. A real wave equation could not produce the interference and conservation properties below.

**Born's rule** gives $\\psi$ its meaning: $|\\psi(x,t)|^2dx$ is the probability of finding the particle in $[x, x+dx]$. Hence $\\int|\\psi|^2dx = 1$, and the Schrödinger equation must preserve this. It does: define the **probability current** $j = \\frac{\\hbar}{m}\\mathrm{Im}(\\psi^*\\partial_x\\psi)$ and the equation implies $\\partial_t|\\psi|^2 + \\partial_xj = 0$, the same continuity equation as for charge or fluid. Probability is conserved locally. Derive this; it is the first real calculation of the subject.

Physical quantities become **operators** acting on $\\psi$. Position is multiplication by $x$; momentum is $\\hat p = -i\\hbar\\,\\partial_x$. Expectation values are $\\langle A\\rangle = \\int\\psi^*\\hat A\\psi\\,dx$. With these, **Ehrenfest's theorem** follows from the Schrödinger equation: $\\frac{d}{dt}\\langle x\\rangle = \\langle p\\rangle/m$ and $\\frac{d}{dt}\\langle p\\rangle = -\\langle V'(x)\\rangle$. Averages obey Newton's laws (almost: $\\langle V'(x)\\rangle \\ne V'(\\langle x\\rangle)$ unless $V$ is at most quadratic). This is the correspondence principle made precise.

Read Zwiebach's 8.04 lectures 3-5 and Tong chapter 1; Griffiths chapter 1 is the standard textbook version. The exercises include your first numerical propagation of a wavefunction, which you will build on throughout module 2.`,
          resources: [
            { ...R.mit804, note: 'Lectures 3-5: Schrödinger equation, probability current, expectation values, Ehrenfest.', primary: true },
            { ...R.tongQM, note: 'Chapter 1: the wavefunction and the Schrödinger equation.' },
            { ...R.griffiths, note: 'Chapter 1. Free alternative: Tong chapter 1 and the 8.04 notes.' },
            { ...R.mit804adams, note: 'Adams\'s lectures 1-4 are a more conversational treatment of the same material.' },
          ],
          exercises: [
            {
              slug: 'continuity-equation',
              title: 'Probability conservation',
              prompt:
                'From the Schrödinger equation and its complex conjugate, derive the continuity equation $\\partial_t|\\psi|^2 + \\partial_xj = 0$ and the expression for $j$. Show that $\\int|\\psi|^2dx$ is constant if $\\psi \\to 0$ at infinity. Compute $j$ for the plane wave $e^{ikx}$, for the standing wave $\\cos kx$, and for the superposition $Ae^{ikx} + Be^{-ikx}$; interpret each. Show $j$ vanishes for any real wavefunction.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'ehrenfest-derivation',
              title: 'Ehrenfest\'s theorem',
              prompt:
                'Derive $d\\langle x\\rangle/dt = \\langle p\\rangle/m$ and $d\\langle p\\rangle/dt = -\\langle dV/dx\\rangle$ from the Schrödinger equation (integrate by parts, assume $\\psi$ vanishes at infinity). Show that for $V = \\tfrac{1}{2}m\\omega^2x^2$ the expectation values exactly follow the classical trajectory, and give an example potential where they do not.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'first-wavepacket-propagation',
              title: 'Propagate a wavefunction numerically',
              prompt:
                'Implement the split-operator (FFT) method for the free Schrödinger equation: $\\psi(t + dt) = \\mathcal F^{-1}[e^{-i\\hbar k^2dt/2m}\\mathcal F[\\psi]]$. Start with a Gaussian of width 1 (in units $\\hbar = m = 1$) centred at $x = -10$ with $k_0 = 2$ on a grid of 1024 points over $[-50, 50]$. Plot $|\\psi|^2$ at several times; check that the norm is conserved, that $\\langle x\\rangle$ moves at $k_0$, and that the width grows as predicted in the next lesson. Keep the code: it is the core of your module 2 and capstone solvers.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use numpy.fft.fft with k = 2π·fftfreq(N, dx). For a potential, alternate half-steps of e^{−iV dt/2ħ} in position space.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the wavefunction be complex?',
              answerOutline:
                'The equation is first order in time with i; a real ψ could not carry a conserved probability current or represent a travelling wave with definite momentum (e^{ikx}).',
            },
            {
              question: 'What is the probability current and what equation does it satisfy?',
              answerOutline:
                'j = (ħ/m) Im(ψ* ∂ₓψ); ∂ₜ|ψ|² + ∂ₓ j = 0, which guarantees local conservation of probability.',
            },
            {
              question: 'In what sense do quantum expectation values obey classical mechanics?',
              answerOutline:
                'Ehrenfest: d⟨x⟩/dt = ⟨p⟩/m and d⟨p⟩/dt = −⟨V′⟩; exactly Newtonian only when ⟨V′(x)⟩ = V′(⟨x⟩), e.g. for linear or quadratic potentials.',
            },
          ],
        },
        {
          slug: 'wave-packets-and-the-uncertainty-principle',
          title: 'Wave packets, Fourier transforms and the uncertainty principle',
          summary:
            'Momentum space, the Gaussian wave packet and its spreading, group velocity, and the Heisenberg uncertainty relation as a theorem about Fourier pairs.',
          estimatedMinutes: 110,
          objectives: [
            'Define the momentum-space wavefunction $\\phi(p)$ and show $|\\phi(p)|^2$ is the momentum probability density',
            'Construct a Gaussian wave packet, compute $\\Delta x\\,\\Delta p = \\hbar/2$ and derive its spreading with time',
            'Distinguish phase and group velocity and show the packet moves at $v_g = p/m$',
            'State the Heisenberg relation $\\Delta x\\,\\Delta p \\ge \\hbar/2$, explain its Fourier origin, and apply it to estimate ground-state energies',
          ],
          concepts: [
            'Momentum-space wavefunction via Fourier transform',
            'Plane waves as (non-normalisable) momentum eigenstates',
            'Gaussian wave packet; minimum uncertainty',
            'Dispersion relation $\\omega = \\hbar k^2/2m$',
            'Phase velocity vs group velocity',
            'Spreading of a free wave packet',
            'Heisenberg uncertainty principle',
            'Uncertainty estimates of ground-state energies',
          ],
          explanation: `A plane wave $e^{ipx/\\hbar}$ has a definite momentum and no location; a localised wavefunction must be a superposition of many momenta. The Fourier transform makes this exact:
$$\\psi(x) = \\frac{1}{\\sqrt{2\\pi\\hbar}}\\int\\phi(p)e^{ipx/\\hbar}dp,\\qquad \\phi(p) = \\frac{1}{\\sqrt{2\\pi\\hbar}}\\int\\psi(x)e^{-ipx/\\hbar}dx,$$
and $|\\phi(p)|^2dp$ is the probability of finding momentum in $[p, p+dp]$ (consistent with $\\langle p\\rangle = \\int\\psi^*(-i\\hbar\\partial_x)\\psi\\,dx$; check this). Position and momentum wavefunctions are two descriptions of the same state.

The **Gaussian packet** $\\psi \\propto e^{-x^2/4\\sigma^2}e^{ik_0x}$ has $\\phi(p)$ also Gaussian, centred at $\\hbar k_0$ with width $\\hbar/2\\sigma$. So $\\Delta x\\,\\Delta p = \\hbar/2$: the narrower in $x$, the wider in $p$. This is a theorem about Fourier transforms, not about measurement disturbing things, and the general statement is the **Heisenberg uncertainty principle** $\\Delta x\\,\\Delta p \\ge \\hbar/2$, with equality only for Gaussians (module 3 derives it from commutators). Its most useful application is estimation: an electron confined to $\\Delta x \\sim a$ has $p \\gtrsim \\hbar/a$ and kinetic energy $\\gtrsim \\hbar^2/2ma^2$; minimising this plus the Coulomb energy $-e^2/4\\pi\\epsilon_0a$ gives the Bohr radius and 13.6 eV without solving anything. It also explains why atoms are stable: the electron cannot fall into the nucleus without acquiring enormous kinetic energy.

Each momentum component evolves as $e^{i(kx - \\omega t)}$ with $\\omega = \\hbar k^2/2m$. Because $\\omega$ is not linear in $k$ the packet is **dispersive**: the phase velocity $\\omega/k = p/2m$ is not the particle velocity, but the **group velocity** $d\\omega/dk = \\hbar k/m = p/m$ is, and the packet's centre moves classically (Ehrenfest again). The different components also drift apart, so the packet spreads: $\\sigma(t)^2 = \\sigma_0^2 + (\\hbar t/2m\\sigma_0)^2$. An electron localised to 1 Å doubles its width in about $10^{-16}$ s; a dust grain never does in the age of the universe. You verified this spreading numerically last lesson; now derive it.

Read Zwiebach 8.04 lectures 5-6 and Tong 1.3-1.4; the Fourier machinery is reviewed in the linked math-methods lesson.`,
          resources: [
            { ...R.mit804, note: 'Lectures 5-6: wave packets, group velocity, uncertainty.', primary: true },
            { ...R.tongQM, note: 'Sections 1.3-1.4 on the free particle, wave packets and the uncertainty principle.' },
            { ...R.griffiths, note: 'Sections 2.4 and 3.5. Free alternative: Tong.' },
            feynman3(2, 'The Relation of Wave and Particle Viewpoints'),
          ],
          exercises: [
            {
              slug: 'gaussian-packet-evolution',
              title: 'Exact evolution of a Gaussian packet',
              prompt:
                'Starting from $\\phi(p, 0)$ for the Gaussian packet, multiply by $e^{-ip^2t/2m\\hbar}$ and transform back to obtain $\\psi(x,t)$ in closed form. Derive $\\langle x\\rangle(t) = \\hbar k_0t/m$ and $\\sigma(t)^2 = \\sigma_0^2 + (\\hbar t/2m\\sigma_0)^2$. Compare the analytic $|\\psi(x,t)|^2$ with your split-operator code from the previous lesson at three times; the agreement should be to machine precision.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'uncertainty-estimates',
              title: 'Ground-state energies from the uncertainty principle',
              prompt:
                'Using $p \\sim \\hbar/a$ for a particle localised within $a$, estimate the ground-state energy and size of: hydrogen; the harmonic oscillator ($\\tfrac{1}{2}\\hbar\\omega$); a particle in an infinite well; a neutron in a nucleus (radius 5 fm); and show that an electron confined in a nucleus would have kinetic energy ~ 100 MeV, ruling out the pre-1932 idea that nuclei contain electrons. Compare each estimate with the exact answer where known.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'momentum-space-numerics',
              title: 'Momentum distributions numerically',
              prompt:
                'For $\\psi(x) = $ (a) a Gaussian, (b) a rectangular pulse of width $a$, (c) the ground state of the infinite well $\\sqrt{2/a}\\sin(\\pi x/a)$, compute $\\phi(p)$ by FFT and plot $|\\phi(p)|^2$. Compute $\\Delta x$ and $\\Delta p$ numerically for each and check $\\Delta x\\Delta p \\ge \\hbar/2$. Explain why the rectangular pulse has infinite $\\Delta p$ and what that means physically.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is the uncertainty principle a statement about measurement disturbance?',
              answerOutline:
                'No; it is a property of the state: ψ(x) and φ(p) are Fourier pairs, so their widths satisfy ΔxΔp ≥ ħ/2 regardless of any measurement.',
            },
            {
              question: 'Why does a free wave packet spread?',
              answerOutline:
                'Its momentum components travel at different velocities p/m (dispersion, ω ∝ k²), so faster components outrun slower ones; the rate is set by Δp/m.',
            },
            {
              question: 'Which velocity of a wave packet corresponds to the particle\'s velocity?',
              answerOutline:
                'The group velocity dω/dk = ħk/m = p/m; the phase velocity p/2m has no direct physical meaning for a massive particle.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-transform'],
        },
      ],
    },
    {
      slug: 'one-dimensional-problems',
      title: 'One-Dimensional Problems',
      description:
        'Stationary states and the exactly solvable potentials: infinite and finite wells, the harmonic oscillator by two methods, scattering and tunnelling, and a numerical solver for everything else.',
      lessons: [
        {
          slug: 'stationary-states-and-the-infinite-well',
          title: 'Stationary states and the infinite square well',
          summary:
            'Separation of variables gives the time-independent Schrödinger equation; the infinite well shows quantisation, nodes, orthogonality and how superpositions evolve.',
          estimatedMinutes: 110,
          objectives: [
            'Separate the Schrödinger equation and show stationary states have time dependence $e^{-iEt/\\hbar}$ and time-independent probability density',
            'Solve the infinite square well: energies $E_n = n^2\\pi^2\\hbar^2/2ma^2$ and normalised eigenfunctions',
            'Prove orthogonality and completeness of energy eigenstates and expand an arbitrary initial state',
            'Compute the time evolution of a superposition and interpret the beating of probability density',
          ],
          concepts: [
            'Time-independent Schrödinger equation $\\hat H\\psi = E\\psi$',
            'Stationary states and energy eigenvalues',
            'Boundary conditions and quantisation',
            'Infinite well spectrum $E_n \\propto n^2$',
            'Nodes: the $n$-th state has $n - 1$ nodes',
            'Orthonormality $\\int\\psi_m^*\\psi_n = \\delta_{mn}$ and completeness',
            'General solution $\\psi(x,t) = \\sum c_n\\psi_n e^{-iE_nt/\\hbar}$',
            'Energy measurement probabilities $|c_n|^2$',
          ],
          explanation: `If $V$ does not depend on time, try $\\psi(x,t) = \\psi(x)f(t)$. The Schrödinger equation separates, $f = e^{-iEt/\\hbar}$ and
$$-\\frac{\\hbar^2}{2m}\\psi'' + V\\psi = E\\psi ,$$
the **time-independent Schrödinger equation**, an eigenvalue problem for the Hamiltonian. Its solutions are **stationary states**: $|\\psi|^2$ and all expectation values are constant in time. They are not "states where nothing moves" (the momentum distribution can be broad) but states of definite energy.

The **infinite square well**, $V = 0$ for $0 < x < a$ and $\\infty$ outside, is the simplest case. Inside, $\\psi = A\\sin kx + B\\cos kx$; the wavefunction must vanish at the walls (infinite potential), so $B = 0$ and $ka = n\\pi$:
$$\\psi_n(x) = \\sqrt{\\frac{2}{a}}\\sin\\frac{n\\pi x}{a},\\qquad E_n = \\frac{n^2\\pi^2\\hbar^2}{2ma^2},\\quad n = 1, 2, 3, \\dots$$
Quantisation comes from boundary conditions, exactly as for a vibrating string. Four features generalise to every bound-state problem: the energies are discrete; the ground-state energy is positive (zero-point energy, forced by the uncertainty principle); the $n$-th state has $n - 1$ nodes; and the eigenfunctions are **orthonormal** and **complete**, so any wavefunction in the well can be written $\\psi(x) = \\sum_nc_n\\psi_n(x)$ with $c_n = \\int\\psi_n^*\\psi\\,dx$ and $\\sum|c_n|^2 = 1$.

Completeness solves the initial-value problem: $\\psi(x,t) = \\sum_nc_n\\psi_n(x)e^{-iE_nt/\\hbar}$. A superposition of two states has a density that oscillates at the frequency $(E_2 - E_1)/\\hbar$, the Bohr frequency; it is the quantum origin of all spectral lines. And $|c_n|^2$ is the probability that an energy measurement returns $E_n$, the discrete version of the Born rule. Module 3 elevates these observations to postulates.

Zwiebach's 8.04 lectures 7-8 and Tong 2.1 are the readings; Griffiths 2.1-2.2 is the textbook standard. The exercises include expanding a non-eigenstate and animating its evolution, which is where the physics of "collapse and revival" lives.`,
          resources: [
            { ...R.mit804, note: 'Lectures 7-8: stationary states, infinite well, properties of bound states.', primary: true },
            { ...R.tongQM, note: 'Chapter 2, section 2.1.' },
            { ...R.griffiths, note: 'Sections 2.1-2.2. Free alternative: Tong and the 8.04 notes.' },
            { ...R.openstax3, note: 'Chapter 7, sections 7.1-7.4 for a gentler introduction with worked examples.' },
          ],
          exercises: [
            {
              slug: 'infinite-well-expansion',
              title: 'Expand and evolve a wavefunction in the well',
              prompt:
                'A particle in the infinite well starts in $\\psi(x,0) = \\sqrt{30/a^5}\\,x(a - x)$. Compute $c_n$ analytically (show $c_n = 0$ for even $n$ and $c_n \\propto 1/n^3$ for odd), verify $\\sum|c_n|^2 = 1$ numerically, compute $\\langle E\\rangle$ in closed form ($5\\hbar^2/ma^2$) and the probability of measuring the ground-state energy (0.9986). Then animate $|\\psi(x,t)|^2$ over one revival period $T = 4ma^2/\\pi\\hbar$ and show the state returns exactly.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bound-state-theorems',
              title: 'General properties of bound states',
              prompt:
                'Prove that for a real potential the energy eigenfunctions can be chosen real; that eigenfunctions with different energies are orthogonal; that in 1D bound states are non-degenerate; and that the ground state has no nodes (argue via the variational principle or the Sturm comparison idea). Prove also that $E > V_{min}$ for every normalisable solution.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'two-state-superposition',
              title: 'Beating in a two-state superposition',
              prompt:
                'For $\\psi = (\\psi_1 + \\psi_2)/\\sqrt2$ in the infinite well compute $\\langle x\\rangle(t)$ in closed form and show it oscillates at the Bohr frequency $\\omega_{21} = (E_2 - E_1)/\\hbar$ with amplitude $16a/9\\pi^2$. Compute the expectation of momentum and verify Ehrenfest. Evaluate the oscillation frequency for an electron in a 1 nm well and the wavelength of the light that would be emitted.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a stationary state and what is stationary about it?',
              answerOutline:
                'An energy eigenstate; its time dependence is a global phase e^{−iEt/ħ}, so |ψ|² and all expectation values are time independent.',
            },
            {
              question: 'Why is the ground-state energy of the infinite well not zero?',
              answerOutline:
                'ψ = 0 is not a state; the lowest allowed k is π/a, giving E₁ = π²ħ²/2ma² > 0, consistent with the uncertainty principle for a particle confined to width a.',
            },
            {
              question: 'What is the physical meaning of the expansion coefficients c_n?',
              answerOutline:
                '|c_n|² is the probability that a measurement of energy gives E_n; c_n is the amplitude ⟨ψ_n|ψ⟩.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/separation-of-variables'],
        },
        {
          slug: 'the-harmonic-oscillator',
          title: 'The harmonic oscillator: series solution and ladder operators',
          summary:
            'The most important potential in physics solved twice: by the power-series method, and algebraically with raising and lowering operators.',
          estimatedMinutes: 130,
          objectives: [
            'Solve the oscillator by the series method and show that normalisability forces $E_n = \\hbar\\omega(n + \\tfrac{1}{2})$',
            'Define $\\hat a$ and $\\hat a^\\dagger$, derive $[\\hat a, \\hat a^\\dagger] = 1$ and $\\hat H = \\hbar\\omega(\\hat N + \\tfrac{1}{2})$, and construct the spectrum algebraically',
            'Generate the eigenfunctions from the ground state and compute matrix elements of $\\hat x$ and $\\hat p$',
            'Explain why the oscillator approximates any potential near a minimum and underlies phonons and photons',
          ],
          concepts: [
            'Harmonic potential $V = \\tfrac{1}{2}m\\omega^2x^2$',
            'Hermite polynomials and Gaussian factor',
            'Zero-point energy $\\tfrac{1}{2}\\hbar\\omega$',
            'Ladder operators $\\hat a$, $\\hat a^\\dagger$; number operator',
            'Commutator $[\\hat x, \\hat p] = i\\hbar$',
            'Matrix elements $\\langle n|\\hat x|m\\rangle$',
            'Coherent states (preview)',
            'Oscillator as model for vibrations, phonons and field modes',
          ],
          explanation: `Any smooth potential near a minimum is approximately $\\tfrac{1}{2}m\\omega^2x^2$, which is why the oscillator appears in molecules, crystals, electromagnetic cavities and quantum field theory. Solve it twice.

**Analytically.** In the dimensionless variable $\\xi = x\\sqrt{m\\omega/\\hbar}$ the equation is $\\psi'' = (\\xi^2 - \\epsilon)\\psi$ with $\\epsilon = 2E/\\hbar\\omega$. For large $\\xi$, $\\psi \\sim e^{-\\xi^2/2}$; writing $\\psi = h(\\xi)e^{-\\xi^2/2}$ gives Hermite's equation for $h$, whose power series terminates (required, otherwise $h \\sim e^{\\xi^2}$ and $\\psi$ blows up) only when $\\epsilon = 2n + 1$:
$$E_n = \\hbar\\omega\\left(n + \\tfrac{1}{2}\\right),\\qquad \\psi_n \\propto H_n(\\xi)e^{-\\xi^2/2}.$$
Levels are equally spaced, there is zero-point energy, and the ground state is a Gaussian, the minimum-uncertainty packet.

**Algebraically** (Dirac). Define
$$\\hat a = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(\\hat x + \\frac{i\\hat p}{m\\omega}\\right),\\qquad \\hat a^\\dagger = \\sqrt{\\frac{m\\omega}{2\\hbar}}\\left(\\hat x - \\frac{i\\hat p}{m\\omega}\\right).$$
From $[\\hat x, \\hat p] = i\\hbar$ follows $[\\hat a, \\hat a^\\dagger] = 1$ and $\\hat H = \\hbar\\omega(\\hat a^\\dagger\\hat a + \\tfrac{1}{2})$. If $|n\\rangle$ has energy $E$, then $\\hat a^\\dagger|n\\rangle$ has energy $E + \\hbar\\omega$ and $\\hat a|n\\rangle$ has $E - \\hbar\\omega$ (check with the commutators). Since $\\langle\\hat H\\rangle \\ge 0$ the ladder must stop going down: $\\hat a|0\\rangle = 0$, which is a first-order ODE with solution the Gaussian, and $E_0 = \\tfrac{1}{2}\\hbar\\omega$. Everything follows without solving a second-order equation: $|n\\rangle = (\\hat a^\\dagger)^n|0\\rangle/\\sqrt{n!}$, $\\hat a^\\dagger|n\\rangle = \\sqrt{n+1}|n+1\\rangle$, and matrix elements of $\\hat x = \\sqrt{\\hbar/2m\\omega}(\\hat a + \\hat a^\\dagger)$ are read off directly. These matrix elements are what you need for perturbation theory and for selection rules in module 6.

The algebraic method is the template for angular momentum (module 4) and for creation and annihilation of particles in quantum field theory. Learn it until it is reflexive. Zwiebach 8.04 lectures 9-10 and Tong 2.2 are the readings; Griffiths 2.3 does both methods.`,
          resources: [
            { ...R.mit804, note: 'Lectures 9-10: harmonic oscillator, algebraic and analytic solution.', primary: true },
            { ...R.tongQM, note: 'Chapter 2, section 2.2.' },
            { ...R.griffiths, note: 'Section 2.3. Free alternative: Tong.' },
            { ...R.mit805, note: 'Lecture notes on the oscillator and coherent states for the stretch material.' },
          ],
          exercises: [
            {
              slug: 'ladder-operator-algebra',
              title: 'Ladder-operator derivations',
              prompt:
                'Derive $[\\hat a, \\hat a^\\dagger] = 1$ and $\\hat H = \\hbar\\omega(\\hat N + \\tfrac{1}{2})$. Show $[\\hat N, \\hat a^\\dagger] = \\hat a^\\dagger$ and deduce the ladder structure. Solve $\\hat a\\psi_0 = 0$ for $\\psi_0(x)$ and generate $\\psi_1, \\psi_2$ by applying $\\hat a^\\dagger$ as a differential operator. Then compute $\\langle n|\\hat x|m\\rangle$, $\\langle n|\\hat x^2|n\\rangle$, $\\langle n|\\hat p^2|n\\rangle$ and verify $\\Delta x\\Delta p = \\hbar(n + \\tfrac{1}{2})$ and the virial relation $\\langle T\\rangle = \\langle V\\rangle$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'oscillator-matrix-numerics',
              title: 'The oscillator as a matrix',
              prompt:
                'Build the $N\\times N$ matrices for $\\hat a$, $\\hat a^\\dagger$, $\\hat x$, $\\hat p$ in the number basis (NumPy), form $\\hat H = \\hat p^2/2m + \\tfrac{1}{2}m\\omega^2\\hat x^2$ and diagonalise it: the eigenvalues should be $n + \\tfrac{1}{2}$ for $n$ well below $N$. Then add a quartic term $\\lambda\\hat x^4$ and compute the perturbed spectrum for $\\lambda = 0.01, 0.1$; save these results to compare with perturbation theory in module 6.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'coherent-state',
              title: 'Coherent states',
              prompt:
                'Define $|\\alpha\\rangle = e^{-|\\alpha|^2/2}\\sum_n\\frac{\\alpha^n}{\\sqrt{n!}}|n\\rangle$. Show it is an eigenstate of $\\hat a$ with eigenvalue $\\alpha$, that $\\langle x\\rangle(t)$ and $\\langle p\\rangle(t)$ follow the classical oscillation with amplitude set by $|\\alpha|$, that $\\Delta x\\Delta p = \\hbar/2$ at all times, and that the number distribution is Poissonian. Use your split-operator code to propagate a displaced Gaussian in the oscillator potential and confirm it oscillates without spreading.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the series solution of the oscillator terminate only for E = ħω(n + ½)?',
              answerOutline:
                'A non-terminating Hermite series grows like e^{ξ²}, overwhelming the Gaussian factor and making ψ non-normalisable; termination requires ε = 2n + 1.',
            },
            {
              question: 'What ensures the ladder of states has a bottom?',
              answerOutline:
                'H = ħω(a†a + ½) has non-negative expectation values, so repeated lowering must terminate at a state annihilated by a; that state is the Gaussian ground state.',
            },
            {
              question: 'Why are the matrix elements ⟨n|x|m⟩ nonzero only for m = n ± 1?',
              answerOutline:
                'x ∝ a + a†, and a, a† change n by exactly one; this is the origin of the Δn = ±1 selection rule for vibrational transitions.',
            },
          ],
        },
        {
          slug: 'scattering-tunnelling-and-the-step-potential',
          title: 'Free particles, steps, barriers and tunnelling',
          summary:
            'Scattering states in one dimension: reflection and transmission at a step, resonances and tunnelling through a barrier, and the applications to alpha decay and scanning tunnelling microscopy.',
          estimatedMinutes: 120,
          objectives: [
            'Solve the step potential for $E > V_0$ and $E < V_0$, computing $R$ and $T$ from the probability current',
            'Derive the transmission coefficient of a rectangular barrier and its exponential limit $T \\approx e^{-2\\kappa a}$',
            'Explain transmission resonances above the barrier and relate them to the well\'s quasi-bound states',
            'Apply the WKB-style tunnelling estimate to alpha decay (Gamow) and the STM',
          ],
          concepts: [
            'Scattering states and boundary conditions at infinity',
            'Reflection and transmission coefficients from currents',
            'Evanescent waves and penetration depth $1/\\kappa$',
            'Rectangular barrier transmission formula',
            'Tunnelling exponent $e^{-2\\int\\kappa\\,dx}$',
            'Transmission resonances (Ramsauer-Townsend)',
            'Gamow theory of alpha decay',
            'Scanning tunnelling microscope',
          ],
          explanation: `For $E$ above the potential at infinity the solutions are not normalisable but are still essential: they describe beams of particles. Take a **step**, $V = 0$ for $x < 0$ and $V_0$ for $x > 0$, with a wave incident from the left. For $E > V_0$ write $\\psi = e^{ikx} + re^{-ikx}$ on the left and $te^{ik'x}$ on the right; continuity of $\\psi$ and $\\psi'$ at $x = 0$ gives $r$ and $t$. The reflection and transmission *probabilities* are ratios of currents: $R = |r|^2$, $T = (k'/k)|t|^2$, and $R + T = 1$. Even for $E > V_0$ there is reflection, which a classical particle never does. For $E < V_0$ the right-hand solution is the **evanescent** $e^{-\\kappa x}$ with $\\kappa = \\sqrt{2m(V_0 - E)}/\\hbar$: total reflection, but with the wavefunction penetrating a distance $1/\\kappa$ into the forbidden region.

Make the barrier finite, of width $a$, and the evanescent wave reaches the far side and emerges as a transmitted wave: **tunnelling**. Matching at both edges gives
$$T = \\left[1 + \\frac{V_0^2\\sinh^2(\\kappa a)}{4E(V_0 - E)}\\right]^{-1} \\approx \\frac{16E(V_0 - E)}{V_0^2}e^{-2\\kappa a}\\quad(\\kappa a \\gg 1).$$
The exponential sensitivity to $a$ and to $\\sqrt{V_0 - E}$ is the whole story of **alpha decay** (Gamow 1928: lifetimes spanning 20 orders of magnitude from a smooth variation in energy, the Geiger-Nuttall law), of the **scanning tunnelling microscope** (current changes by a factor ~10 per ångström), of nuclear fusion in the Sun, and of the tunnel diode and flash memory. For a general smooth barrier the exponent generalises to $-2\\int\\kappa(x)dx$, the WKB result of module 6.

Above the barrier, $T$ oscillates with $E$ and reaches 1 whenever $k'a = n\\pi$: **resonances**, where the waves reflected from the two edges cancel. The same effect in electron-atom scattering (Ramsauer-Townsend) was an early confirmation of wave mechanics.

Read Zwiebach 8.04 lectures 11-13 and Tong 2.3; the PhET tunnelling simulation gives the pictures, and the exercises make you compute $T(E)$ both analytically and with your numerical wave packet.`,
          resources: [
            { ...R.mit804, note: 'Lectures 11-13: scattering states, step, barrier, resonances, Ramsauer-Townsend.', primary: true },
            { ...R.tongQM, note: 'Chapter 2, section 2.3 on scattering in one dimension.' },
            {
              title: 'PhET — Quantum Tunneling and Wave Packets',
              url: 'https://phet.colorado.edu/en/simulations/quantum-tunneling',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Colorado Boulder',
              note: 'Watch a packet split into reflected and transmitted parts; vary barrier height and width.',
            },
            { ...R.griffiths, note: 'Sections 2.5-2.6 and problem 2.33 (barrier). Free alternative: Tong.' },
          ],
          exercises: [
            {
              slug: 'barrier-transmission-derivation',
              title: 'Transmission through a rectangular barrier',
              prompt:
                'Derive the exact $T(E)$ for a rectangular barrier of height $V_0$ and width $a$ for both $E < V_0$ and $E > V_0$. Plot $T$ versus $E/V_0$ from 0 to 4 for $a\\sqrt{2mV_0}/\\hbar = 3, 6, 10$; identify the resonances above the barrier and verify their positions. Show the thick-barrier approximation and quantify where it is accurate to 10%.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'wavepacket-tunnelling',
              title: 'Wave-packet tunnelling numerically',
              prompt:
                'Using your split-operator code, send a Gaussian packet (mean energy $E_0$, narrow in momentum) at a rectangular barrier. Measure the transmitted probability (integrate $|\\psi|^2$ beyond the barrier after the interaction) and compare with the analytic $T$ averaged over the packet\'s energy distribution for $E_0/V_0 = 0.5, 0.8, 1.2, 2$. Plot snapshots showing the reflected and transmitted packets. Note any delay of the transmitted packet relative to free propagation.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'gamow-alpha-decay',
              title: 'Alpha decay lifetimes',
              prompt:
                'Model alpha decay as a particle of energy $E$ tunnelling through the Coulomb barrier $V(r) = 2(Z-2)e^2/4\\pi\\epsilon_0r$ outside the nuclear radius $R = 1.2(A^{1/3} + 4^{1/3})$ fm. Compute the WKB exponent $2\\int_R^{r_1}\\kappa\\,dr$ analytically (the standard Gamow integral), multiply by an attempt frequency $v/2R$, and predict half-lives for $^{238}$U (4.2 MeV), $^{226}$Ra (4.8 MeV) and $^{212}$Po (8.8 MeV). Compare with the measured $4.5\\times10^9$ yr, 1600 yr and 0.3 μs, and plot $\\log t_{1/2}$ versus $1/\\sqrt E$ (Geiger-Nuttall).',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must transmission be defined with the current, not |t|²?',
              answerOutline:
                'Probability flux is |amplitude|² times velocity; when k′ ≠ k the transmitted wave travels at a different speed, so T = (k′/k)|t|² is what conserves probability (R + T = 1).',
            },
            {
              question: 'Why is tunnelling so sensitive to barrier width?',
              answerOutline:
                'T ∝ e^{−2κa}: the wavefunction decays exponentially inside the barrier with decay constant κ = √(2m(V₀−E))/ħ, so every additional 1/κ costs a factor e².',
            },
            {
              question: 'What causes transmission resonances above a barrier?',
              answerOutline:
                'Waves reflected from the two edges interfere destructively when the barrier width is an integer number of half-wavelengths of the inside wave (k′a = nπ), giving T = 1.',
            },
          ],
        },
        {
          slug: 'finite-wells-and-delta-potentials',
          title: 'Finite wells, delta potentials and bound-state matching',
          summary:
            'Bound states when the walls are finite: matching conditions, the transcendental equation of the finite well, the single delta-function bound state, and the double well as a model of molecular bonding.',
          estimatedMinutes: 100,
          objectives: [
            'Apply continuity conditions (including the derivative jump at a delta function) to find bound states',
            'Solve the finite square well graphically and show there is always at least one bound state in 1D',
            'Find the bound state of the attractive delta potential and its scattering coefficients',
            'Analyse the double delta well and explain bonding/antibonding splitting and its dependence on separation',
          ],
          concepts: [
            'Matching conditions for $\\psi$ and $\\psi\'$',
            'Derivative jump $\\Delta\\psi\' = -(2m\\alpha/\\hbar^2)\\psi(0)$ at $-\\alpha\\delta(x)$',
            'Even and odd solutions; parity',
            'Finite well transcendental equation $\\tan z = \\sqrt{(z_0/z)^2 - 1}$',
            'Shallow wells and the existence of a 1D bound state',
            'Delta-function bound state $E = -m\\alpha^2/2\\hbar^2$',
            'Double well: bonding and antibonding',
            'Tunnelling splitting',
          ],
          explanation: `Real wells have finite walls, so the wavefunction leaks into the classically forbidden regions and decays as $e^{-\\kappa|x|}$. Bound states are found by **matching**: inside the well, oscillatory solutions; outside, decaying exponentials; at the edges, $\\psi$ and $\\psi'$ continuous (unless the potential is infinite or a delta function). The counting is the key insight: matching conditions fix the ratios of amplitudes and leave one condition on $E$, so the spectrum is discrete.

For the **finite square well** of depth $V_0$ and half-width $a$, use parity. With $z = ka$ and $z_0 = a\\sqrt{2mV_0}/\\hbar$, even states satisfy $\\tan z = \\sqrt{(z_0/z)^2 - 1}$ and odd states $-\\cot z = \\sqrt{(z_0/z)^2 - 1}$. Plot both sides and the intersections give the levels. Two facts to notice: the number of bound states is $\\lceil 2z_0/\\pi\\rceil$, growing with depth and width, and there is *always* at least one, however shallow the well, because the even branch always intersects. (In 3D this is not true, which is why the deuteron barely binds.) As $z_0 \\to \\infty$ the levels approach the infinite-well values from below, since leakage lowers the kinetic energy.

The **delta potential** $V = -\\alpha\\delta(x)$ is the limit of a narrow deep well. Integrating the Schrödinger equation across the origin gives a derivative jump $\\psi'(0^+) - \\psi'(0^-) = -(2m\\alpha/\\hbar^2)\\psi(0)$, and the single bound state is $\\psi \\propto e^{-\\kappa|x|}$ with $E = -m\\alpha^2/2\\hbar^2$. Its scattering states give $T = 1/(1 + m\\alpha^2/2\\hbar^2E)$, and the bound state appears as a pole of $T$ at negative $E$, a connection that generalises to the whole theory of scattering.

Two delta wells separated by $d$ make the simplest model of a **molecule**. The even state (bonding) has lower energy than the single-well state and the odd (antibonding) higher, with the splitting decaying as $e^{-\\kappa d}$. The bonding state's lower energy at intermediate $d$ is, in this toy model, the chemical bond. Compute it; it is also the physics of the ammonia maser and of tunnelling splittings in every double-well system.

Read Zwiebach 8.04 lectures 12-14 and Griffiths 2.5-2.6 (or Tong 2.1-2.3).`,
          resources: [
            { ...R.mit804, note: 'Lectures 12-14: finite square well, delta potentials, double well.', primary: true },
            { ...R.griffiths, note: 'Sections 2.5 (delta) and 2.6 (finite well). Free alternative: Tong chapter 2 and LibreTexts.' },
            { ...R.libretexts, note: 'Search "finite square well" for additional worked solutions of the transcendental equation.' },
          ],
          exercises: [
            {
              slug: 'finite-well-graphical',
              title: 'Finite well: graphical and numerical solution',
              prompt:
                'Derive the even and odd transcendental equations for the finite well. Solve them numerically (scipy.optimize.brentq on each branch) for $z_0 = 1, 4, 10$ and tabulate the bound-state energies in units of $V_0$ and as fractions of the corresponding infinite-well energies. Plot the eigenfunctions including their exponential tails. Show that the number of bound states equals $\\lceil 2z_0/\\pi\\rceil$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'delta-potential-complete',
              title: 'The delta potential, bound and scattering',
              prompt:
                'Derive the derivative jump condition, find the bound state and its energy, and compute $R$ and $T$ for scattering at energy $E > 0$. Show that $T(E)$, continued to negative $E = -|E|$, has a pole exactly at the bound-state energy. Then compute $\\langle x^2\\rangle$ and $\\langle p^2\\rangle$ for the bound state and check the uncertainty relation.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'double-delta-molecule',
              title: 'Bonding in the double delta well',
              prompt:
                'For $V = -\\alpha[\\delta(x - d/2) + \\delta(x + d/2)]$ derive the transcendental equations for the even and odd bound states. Solve numerically and plot both energies versus $d$ (in units of $\\hbar^2/m\\alpha$). Show the even state always exists, the odd one only for $d$ above a threshold, and that the splitting decays exponentially at large $d$. Add a repulsive "nuclear" term $+\\beta/d$ to the even-state energy and find the equilibrium bond length.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a 1D attractive potential, however weak, always have a bound state?',
              answerOutline:
                'A trial function spread very widely has kinetic energy ∝ 1/L² but potential energy ∝ −1/L, so for large L the total is negative: a state below the continuum exists (variational argument; graphically the even branch always intersects).',
            },
            {
              question: 'What is the boundary condition at a delta-function potential?',
              answerOutline:
                'ψ continuous, ψ′ jumps by −(2mα/ħ²)ψ(0) for V = −αδ(x), obtained by integrating the Schrödinger equation across the origin.',
            },
            {
              question: 'Why is the bonding state of a double well lower in energy than the single-well state?',
              answerOutline:
                'The even combination spreads over both wells with less curvature (lower kinetic energy) while enjoying both attractive regions; the odd combination has a node between the wells and higher kinetic energy.',
            },
          ],
        },
        {
          slug: 'numerical-schrodinger-solvers',
          title: 'Numerical Schrödinger solvers',
          summary:
            'Three methods you will use for the rest of the subject: the shooting method, finite-difference diagonalisation for bound states, and the split-operator and Crank-Nicolson methods for time evolution.',
          estimatedMinutes: 130,
          objectives: [
            'Implement the shooting method with Numerov integration and find bound states by bisection on the energy',
            'Discretise the Hamiltonian as a tridiagonal matrix and obtain the spectrum and eigenfunctions by diagonalisation',
            'Implement Crank-Nicolson time stepping and compare with split-operator for accuracy, stability and unitarity',
            'Validate every method against exact results (infinite well, oscillator, Pöschl-Teller) and quantify discretisation error',
          ],
          concepts: [
            'Finite-difference Laplacian and the tridiagonal Hamiltonian',
            'Numerov method (fourth-order accuracy)',
            'Shooting method and node counting',
            'Matrix diagonalisation with scipy.linalg.eigh_tridiagonal',
            'Crank-Nicolson: implicit, unitary, second order',
            'Split-operator (FFT) method',
            'Convergence testing and Richardson extrapolation',
            'Absorbing boundaries for scattering',
          ],
          explanation: `Beyond the handful of exactly solvable potentials you need numerics, and in quantum mechanics the numerics are unusually clean because the problem is linear.

**Bound states by diagonalisation.** On a grid $x_j = x_0 + j\\,h$, replace $\\psi''$ by $(\\psi_{j+1} - 2\\psi_j + \\psi_{j-1})/h^2$. The Hamiltonian becomes a real symmetric **tridiagonal matrix** with diagonal $\\hbar^2/mh^2 + V(x_j)$ and off-diagonal $-\\hbar^2/2mh^2$. Its eigenvalues and eigenvectors, from \`scipy.linalg.eigh_tridiagonal\`, are the energies and wavefunctions, with hard-wall boundary conditions at the grid edges (so make the grid wide enough that bound states have decayed). The error is $O(h^2)$; halving $h$ should reduce the error fourfold, and you should always check that it does. For 1000 points this takes milliseconds and handles any potential you can write down.

**Shooting.** Integrate the ODE from one side with a guessed $E$ using the **Numerov** scheme (fourth order, specifically designed for $\\psi'' = f(x)\\psi$) and watch whether $\\psi$ diverges to $+\\infty$ or $-\\infty$ at the far side; bisect on $E$. The number of nodes identifies which state you have. Shooting is less convenient than diagonalisation but generalises to the radial equation of module 5 with its singular origin, and it teaches you what an eigenvalue problem *is*.

**Time evolution.** The split-operator method you already have is spectrally accurate in space and unitary by construction but needs periodic boundaries. **Crank-Nicolson** uses the implicit midpoint rule, $(1 + i\\hat H dt/2\\hbar)\\psi^{n+1} = (1 - i\\hat Hdt/2\\hbar)\\psi^n$, which is exactly unitary (Cayley form), second order in $dt$, unconditionally stable and a tridiagonal solve per step. Forward Euler, by contrast, is unstable for any $dt$: try it once to see. For scattering problems add a complex absorbing potential near the edges so reflected waves do not wrap around.

Validate obsessively. The infinite well, the oscillator and the Pöschl-Teller potential $V = -\\frac{\\hbar^2\\lambda(\\lambda+1)}{2ma^2}\\mathrm{sech}^2(x/a)$ (energies $-\\frac{\\hbar^2(\\lambda - n)^2}{2ma^2}$) give exact checks for both spectra and dynamics. The canonical treatment of the underlying ODE methods is in computational-physics; here the focus is using them correctly. Zwiebach's 8.04 problem sets include a numerical shooting assignment; the exercises below build your capstone solver.`,
          resources: [
            { ...R.mit804, note: 'Problem sets with numerical shooting-method assignments; lecture 14 on qualitative features of eigenfunctions.', primary: true },
            { ...R.qutip, note: 'Not needed yet, but browse the documentation: QuTiP\'s Qobj and sesolve will do these computations in later modules.' },
            { ...R.libretexts, note: 'Search "Numerov" and "finite difference Schrödinger" for worked examples.' },
          ],
          exercises: [
            {
              slug: 'tridiagonal-solver',
              title: 'Finite-difference bound-state solver',
              prompt:
                'Write a function bound_states(V, x) that builds the tridiagonal Hamiltonian and returns the lowest k eigenvalues and normalised eigenvectors. Validate on the oscillator (errors in $E_n$ versus $h$ should scale as $h^2$; plot this on log-log axes) and Pöschl-Teller with $\\lambda = 4$. Then compute the spectrum of the anharmonic oscillator $\\tfrac{1}{2}x^2 + 0.1x^4$ and the quartic double well $-x^2/2 + x^4/20$; for the double well, plot the lowest two eigenfunctions and the tunnelling splitting versus barrier height.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'numerov-shooting',
              title: 'Numerov shooting method',
              prompt:
                'Implement the Numerov integrator and a shooting routine that finds the $n$-th bound state by bisection on $E$ using node counting. Apply it to the finite square well and compare with the transcendental-equation results from the previous lesson to 6 digits. Discuss how to handle the matching when integrating from both sides (the log-derivative matching used for the radial equation).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'crank-nicolson-vs-split',
              title: 'Crank-Nicolson versus split-operator',
              prompt:
                'Implement Crank-Nicolson with scipy.sparse tridiagonal solves. Propagate a coherent state in the oscillator with both CN and split-operator for 10 periods and compare with the exact solution: plot the error in $\\langle x\\rangle$ versus $dt$ for each method, and the norm drift. Then propagate with forward Euler and show it blows up. Finally add a complex absorbing potential and demonstrate a packet leaving the grid without reflection.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the finite-difference Hamiltonian tridiagonal and why does that matter?',
              answerOutline:
                'The three-point Laplacian couples each grid point only to its neighbours; tridiagonal eigensolvers and linear solves cost O(N), so thousands of points are cheap.',
            },
            {
              question: 'Why is Crank-Nicolson unitary while forward Euler is not?',
              answerOutline:
                'CN applies (1 − iHdt/2ħ)/(1 + iHdt/2ħ), a Cayley transform of a Hermitian operator, which is exactly unitary; Euler applies 1 − iHdt/ħ, whose eigenvalues have modulus > 1.',
            },
            {
              question: 'How do you know your numerical eigenvalue is converged?',
              answerOutline:
                'Repeat with halved grid spacing (and wider box); the change should drop by the expected factor (4 for second-order methods). Compare with exact cases first.',
            },
          ],
          relatedLessons: ['computational-physics/ode-integrators/boundary-value-problems'],
        },
      ],
      project: {
        slug: 'one-dimensional-quantum-lab',
        title: 'A one-dimensional quantum laboratory',
        description: `Package your solvers into a small library with a consistent interface: bound states by diagonalisation and by shooting, time evolution by split-operator and Crank-Nicolson, and utilities for expectation values, momentum distributions and animation.

Use it to produce a "lab notebook" of six numerical experiments, each with a short written interpretation: (1) convergence study on the oscillator; (2) the finite-well spectrum versus depth; (3) tunnelling of a wave packet with $T(E)$ compared with theory; (4) revival of a wave packet in the infinite well and its fractional revivals; (5) the double-well tunnelling oscillation between left and right states, with period compared to $\\pi\\hbar/\\Delta E$; (6) a potential of your own design (e.g. a periodic potential showing the emergence of bands as the number of wells increases).`,
        deliverables: [
          'A Python package with docstrings and tests that compare against exact results',
          'A notebook with the six experiments, figures and a paragraph of physics for each',
        ],
        estimatedHours: 10,
        stretchGoals: ['Extend the diagonalisation solver to 2D (sparse matrices) and compute the spectrum of a 2D box and a 2D oscillator, showing degeneracies', 'Add a time-dependent potential and show resonant excitation of the oscillator by a driving field (preview of module 6)'],
      },
    },
    {
      slug: 'formalism-and-dirac-notation',
      title: 'Formalism and Dirac Notation',
      description:
        'The mathematical structure behind wave mechanics: Hilbert space, Hermitian operators, the measurement postulates, commutators and the general uncertainty relation, time evolution, and two-level systems as the simplest complete quantum systems.',
      lessons: [
        {
          slug: 'hilbert-space-states-and-operators',
          title: 'Hilbert space, kets, bras and operators',
          summary:
            'States are vectors, observables are Hermitian operators, and wavefunctions are components in the position basis. Dirac notation makes all of this compact and basis-independent.',
          estimatedMinutes: 120,
          objectives: [
            'Translate between wavefunctions and abstract kets, and between integrals and inner products',
            'Define Hermitian and unitary operators and prove the eigenvalue and orthogonality properties of Hermitian operators',
            'Use completeness $\\sum|n\\rangle\\langle n| = 1$ and $\\int|x\\rangle\\langle x|dx = 1$ to change basis and derive $\\langle x|p\\rangle = e^{ipx/\\hbar}/\\sqrt{2\\pi\\hbar}$',
            'Represent operators as matrices in a discrete basis and compute with them numerically',
          ],
          concepts: [
            'Hilbert space; kets $|\\psi\\rangle$ and bras $\\langle\\psi|$',
            'Inner product $\\langle\\phi|\\psi\\rangle$ and norm',
            'Linear operators; adjoint; Hermitian and unitary operators',
            'Eigenvalues of Hermitian operators are real; eigenvectors orthogonal',
            'Completeness and resolution of the identity',
            'Position and momentum bases; $\\psi(x) = \\langle x|\\psi\\rangle$',
            'Matrix representation of operators',
            'Projectors and outer products',
          ],
          explanation: `Module 2 used three facts repeatedly: eigenfunctions of $\\hat H$ are orthogonal, they are complete, and expansion coefficients give probabilities. These are not facts about particular differential equations; they are linear algebra. Quantum mechanics takes place in a **Hilbert space**, a complex vector space with an inner product, complete in the norm. A state is a vector $|\\psi\\rangle$ (a **ket**, Dirac's name); the wavefunction $\\psi(x) = \\langle x|\\psi\\rangle$ is its component along the position "basis vector" $|x\\rangle$, and $\\phi(p) = \\langle p|\\psi\\rangle$ its component along $|p\\rangle$. The inner product $\\langle\\phi|\\psi\\rangle = \\int\\phi^*(x)\\psi(x)dx$ is basis independent; $\\langle\\phi|$ is the **bra**, the linear functional dual to $|\\phi\\rangle$.

Observables are **Hermitian operators**, $\\hat A = \\hat A^\\dagger$, where the adjoint is defined by $\\langle\\phi|\\hat A\\psi\\rangle = \\langle\\hat A^\\dagger\\phi|\\psi\\rangle$. Two theorems do all the work: eigenvalues of a Hermitian operator are real, and eigenvectors with distinct eigenvalues are orthogonal (prove both in three lines). Together with the spectral theorem (eigenvectors form a basis) you get the **resolution of the identity** $\\sum_n|n\\rangle\\langle n| = 1$, or $\\int|x\\rangle\\langle x|dx = 1$ for a continuous spectrum. Inserting it anywhere changes basis: $\\langle p|\\psi\\rangle = \\int\\langle p|x\\rangle\\langle x|\\psi\\rangle dx$ is the Fourier transform once you know $\\langle x|p\\rangle = e^{ipx/\\hbar}/\\sqrt{2\\pi\\hbar}$, which follows from $\\hat p = -i\\hbar\\,\\partial_x$ in the position basis. The continuous bases are not normalisable ($\\langle x|x'\\rangle = \\delta(x - x')$) and live in a slightly larger "rigged" space; physicists ignore the subtlety and nothing goes wrong.

In a discrete basis an operator is a **matrix** $A_{mn} = \\langle m|\\hat A|n\\rangle$ and a state is a column vector; Hermitian means $A = A^\\dagger$ (conjugate transpose) and the numerical linear algebra of module 2 is literally this. Projectors $|n\\rangle\\langle n|$ and more general outer products $|\\phi\\rangle\\langle\\chi|$ are operators too, and the measurement postulates of the next lesson are stated with them.

Read Zwiebach 8.05 lectures 1-4 (the clearest treatment of this material anywhere) and Tong chapter 3 (section 3.1-3.2 is a compressed version). Griffiths chapter 3 and Susskind's lectures 1-4 are alternatives. The exercises are proofs and matrix computations; the linked math-methods lesson covers the underlying linear algebra if you need it.`,
          resources: [
            { ...R.mit805, note: 'Lectures 1-4 of 8.05: linear algebra for QM, Dirac notation, Hermitian and unitary operators.', primary: true },
            { ...R.tongQM, note: 'Chapter 3, sections 3.1-3.2.' },
            { ...R.susskind, note: 'Lectures 1-4 build the vector-space picture from scratch using spin.' },
            { ...R.griffiths, note: 'Chapter 3 (Formalism). Free alternative: the 8.05 notes.' },
          ],
          exercises: [
            {
              slug: 'hermitian-theorems',
              title: 'Theorems about Hermitian operators',
              prompt:
                'Prove: (a) eigenvalues of a Hermitian operator are real; (b) eigenvectors with different eigenvalues are orthogonal; (c) $\\hat x$ and $\\hat p = -i\\hbar\\partial_x$ are Hermitian on square-integrable functions (watch the boundary term); (d) the product of two Hermitian operators is Hermitian iff they commute; (e) $e^{i\\hat A}$ is unitary if $\\hat A$ is Hermitian. Then show $(\\hat A\\hat B)^\\dagger = \\hat B^\\dagger\\hat A^\\dagger$ and compute the adjoint of $\\hat x\\hat p$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'change-of-basis',
              title: 'Change of basis with the resolution of the identity',
              prompt:
                'Derive $\\langle x|p\\rangle$ from $\\langle x|\\hat p|p\\rangle = p\\langle x|p\\rangle$ and normalise it so $\\langle p|p\'\\rangle = \\delta(p - p\')$. Use it to show that $\\langle p|\\hat x|\\psi\\rangle = i\\hbar\\,\\partial_p\\phi(p)$ (so position acts as a derivative in momentum space). Then write the infinite-well Hamiltonian in the momentum basis and explain why it is not diagonal.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'operators-as-matrices',
              title: 'Operators as matrices, numerically',
              prompt:
                'In the basis of the first $N = 50$ oscillator states, build the matrices of $\\hat x$, $\\hat p$, $\\hat x^2$, $\\hat p^2$, $\\hat H$, and verify numerically: Hermiticity, $[\\hat x, \\hat p] = i\\hbar$ (except in the last row/column: explain), and that $U = e^{-i\\hat Ht/\\hbar}$ computed with scipy.linalg.expm is unitary. Change basis to the position grid (using the known $\\psi_n(x)$) and show the matrix of $\\hat x$ becomes diagonal to good accuracy.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the relationship between a ket |ψ⟩ and the wavefunction ψ(x)?',
              answerOutline:
                'ψ(x) = ⟨x|ψ⟩ is the component of the abstract state vector along the position eigenket |x⟩; the same state has components φ(p) = ⟨p|ψ⟩ in the momentum basis.',
            },
            {
              question: 'Why must observables be represented by Hermitian operators?',
              answerOutline:
                'Measurement outcomes are the eigenvalues and must be real; eigenvectors must form an orthonormal basis so that outcomes are mutually exclusive and exhaustive.',
            },
            {
              question: 'What does inserting Σ|n⟩⟨n| = 1 accomplish?',
              answerOutline:
                'Expresses a vector or operator in the basis {|n⟩}; it is the mechanism of every change of basis, including the Fourier transform between x and p representations.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/eigenvalues-and-eigenvectors'],
        },
        {
          slug: 'measurement-commutators-and-uncertainty',
          title: 'The measurement postulates, commutators and the uncertainty relation',
          summary:
            'The postulates of quantum mechanics stated precisely, compatible observables and simultaneous eigenstates, and the general uncertainty relation derived from the commutator.',
          estimatedMinutes: 110,
          objectives: [
            'State the postulates: states, observables, Born rule, collapse (projection), and unitary evolution',
            'Show that commuting observables have a common eigenbasis and can be measured simultaneously',
            'Derive the Robertson uncertainty relation $\\Delta A\\,\\Delta B \\ge \\tfrac{1}{2}|\\langle[\\hat A, \\hat B]\\rangle|$',
            'Compute commutators of $\\hat x$, $\\hat p$, functions of them, and the angular momentum components',
          ],
          concepts: [
            'Postulates of quantum mechanics',
            'Projective measurement and state collapse',
            'Probability $|\\langle a|\\psi\\rangle|^2$; degenerate spectra and projectors',
            'Commutator $[\\hat A, \\hat B]$ and compatible observables',
            'Complete set of commuting observables (CSCO)',
            'Robertson-Schrödinger uncertainty relation',
            'Canonical commutation relation $[\\hat x, \\hat p] = i\\hbar$',
            'Preparation vs measurement',
          ],
          explanation: `Here are the rules of the game, stated once and precisely.

1. **States** are rays in a Hilbert space (normalised vectors up to a global phase).
2. **Observables** are Hermitian operators. The possible results of measuring $\\hat A$ are its eigenvalues $a$.
3. **Born rule**: if the state is $|\\psi\\rangle$, the probability of getting $a$ is $|\\langle a|\\psi\\rangle|^2$, or $\\langle\\psi|\\hat P_a|\\psi\\rangle$ with $\\hat P_a$ the projector onto the eigenspace when $a$ is degenerate. Hence $\\langle\\hat A\\rangle = \\langle\\psi|\\hat A|\\psi\\rangle$.
4. **Collapse**: immediately after the result $a$, the state is $\\hat P_a|\\psi\\rangle/\\|\\hat P_a\\psi\\|$. Repeating the measurement returns $a$ with certainty.
5. **Evolution** between measurements is unitary, generated by $\\hat H$: $i\\hbar\\,\\partial_t|\\psi\\rangle = \\hat H|\\psi\\rangle$.

Postulate 4 is the one that makes quantum mechanics strange, because it is discontinuous and non-unitary. Module 7 discusses what it means and how decoherence makes it look the way it does; for now treat it as the operational rule it is. Note the distinction between *preparing* a state (filtering by a measurement) and *measuring* it (sampling the Born distribution), and that a single measurement reveals almost nothing about $|\\psi\\rangle$; statistics over an ensemble of identically prepared systems do.

When can two quantities have definite values at once? If $[\\hat A, \\hat B] = 0$, the operators share an eigenbasis (prove it, handling degeneracy), measuring one does not disturb the other, and the pair are **compatible**. A **complete set of commuting observables** labels each basis state uniquely; for hydrogen it is $(\\hat H, \\hat L^2, \\hat L_z)$ and the labels are $(n, l, m)$. If the operators do not commute, no state is an eigenstate of both, and the **Robertson relation** quantifies the trade-off:
$$\\Delta A\\,\\Delta B \\ge \\tfrac{1}{2}\\left|\\langle[\\hat A, \\hat B]\\rangle\\right| .$$
The proof is the Cauchy-Schwarz inequality applied to $(\\hat A - \\langle A\\rangle)|\\psi\\rangle$ and $(\\hat B - \\langle B\\rangle)|\\psi\\rangle$; with $[\\hat x, \\hat p] = i\\hbar$ it gives Heisenberg's $\\Delta x\\Delta p \\ge \\hbar/2$ as a theorem. Commutator algebra ($[\\hat A, \\hat B\\hat C] = [\\hat A, \\hat B]\\hat C + \\hat B[\\hat A, \\hat C]$, $[\\hat x, f(\\hat p)] = i\\hbar f'(\\hat p)$) is a skill to practise until automatic; it is the main computational tool of modules 4-6.

Read Zwiebach 8.05 lectures 5-6 and Tong 3.3; Feynman III-5 shows the postulates at work in a Stern-Gerlach experiment before the formalism is introduced.`,
          resources: [
            { ...R.mit805, note: 'Lectures 5-6: measurement, compatible observables, uncertainty relation.', primary: true },
            { ...R.tongQM, note: 'Chapter 3, section 3.3 on measurement and the uncertainty principle.' },
            feynman3(5, 'Spin One'),
            { ...R.susskind, note: 'Lectures 4-6 on measurement, compatible observables and uncertainty.' },
          ],
          exercises: [
            {
              slug: 'robertson-proof',
              title: 'Prove the uncertainty relation',
              prompt:
                'Prove the Robertson inequality from Cauchy-Schwarz and derive the stronger Schrödinger form including the anticommutator term. Find the condition for equality and show that for $\\hat x$, $\\hat p$ it is satisfied only by Gaussians. Apply the relation to (a) $\\hat L_x, \\hat L_y$ in an $L_z$ eigenstate, (b) $\\hat H$ and $\\hat x$ for the oscillator, (c) $\\hat N$ and the phase quadrature $\\hat a + \\hat a^\\dagger$ in a coherent state.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'commutator-drills',
              title: 'Commutator drills',
              prompt:
                'Compute: $[\\hat x, \\hat p^2]$, $[\\hat x^2, \\hat p]$, $[\\hat x, \\hat p^n]$, $[\\hat H, \\hat x]$ and $[\\hat H, \\hat p]$ for a general potential, $[\\hat L_x, \\hat L_y]$ from $\\hat L = \\hat r\\times\\hat p$, $[\\hat L^2, \\hat L_z]$, $[\\hat L_z, \\hat x]$, and $[\\hat a, (\\hat a^\\dagger)^n]$. For each, say which pairs of observables are compatible. Verify three of them numerically with the oscillator matrices from the previous lesson.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'sequential-measurements',
              title: 'Sequential measurements and collapse',
              prompt:
                'A spin-1/2 particle (use the Pauli matrices; details in module 4, but only 2×2 algebra is needed) is prepared in the $S_z = +\\hbar/2$ state. Compute the probabilities of outcomes for measuring $S_x$, then $S_z$ again. Show that inserting the $S_x$ measurement changes the subsequent $S_z$ statistics from certainty to 50/50. Then simulate 10,000 runs of the sequence with random outcomes and collapse, and confirm the statistics. Explain why this is impossible for classical properties.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a single measurement tell you about the state?',
              answerOutline:
                'Almost nothing: one outcome a, after which the state is the eigenstate |a⟩. The state before is only inferred statistically from an ensemble.',
            },
            {
              question: 'What is the precise condition for two observables to be simultaneously measurable?',
              answerOutline:
                'They commute; then they share a complete set of common eigenstates and measuring one leaves the system in an eigenstate of the other.',
            },
            {
              question: 'Where does Heisenberg\'s ΔxΔp ≥ ħ/2 come from in the formalism?',
              answerOutline:
                'The Robertson relation with [x, p] = iħ; it is a theorem from the commutator and Cauchy-Schwarz, independent of any measurement model.',
            },
          ],
        },
        {
          slug: 'time-evolution-and-the-heisenberg-picture',
          title: 'Time evolution, the Heisenberg picture and conservation laws',
          summary:
            'The unitary time-evolution operator, the Schrödinger and Heisenberg pictures, the Heisenberg equation of motion, conserved quantities from commuting with $\\hat H$, and the energy-time uncertainty relation.',
          estimatedMinutes: 100,
          objectives: [
            'Construct $\\hat U(t) = e^{-i\\hat Ht/\\hbar}$ and show it is unitary and composes correctly',
            'Define Heisenberg-picture operators and derive $\\frac{d\\hat A_H}{dt} = \\frac{i}{\\hbar}[\\hat H, \\hat A_H] + \\partial_t\\hat A_H$',
            'Show that observables commuting with $\\hat H$ are conserved and relate this to symmetries',
            'Derive and correctly interpret the energy-time uncertainty relation $\\Delta E\\,\\Delta t \\ge \\hbar/2$',
          ],
          concepts: [
            'Time-evolution operator $\\hat U(t)$',
            'Schrödinger picture vs Heisenberg picture',
            'Heisenberg equation of motion',
            'Conserved quantities: $[\\hat H, \\hat A] = 0$',
            'Symmetries and generators (translation, rotation)',
            'Energy-time uncertainty and lifetimes',
            'Ehrenfest revisited',
            'Interaction picture (preview for perturbation theory)',
          ],
          explanation: `For a time-independent Hamiltonian the Schrödinger equation integrates to $|\\psi(t)\\rangle = \\hat U(t)|\\psi(0)\\rangle$ with
$$\\hat U(t) = e^{-i\\hat Ht/\\hbar} = \\sum_n|n\\rangle e^{-iE_nt/\\hbar}\\langle n| ,$$
which is unitary because $\\hat H$ is Hermitian. Unitarity is probability conservation in abstract form, and the energy-eigenstate expansion from module 2 is just $\\hat U$ written in its eigenbasis.

Nothing observable depends on whether we let the states evolve and keep the operators fixed (**Schrödinger picture**) or keep the states fixed and evolve the operators, $\\hat A_H(t) = \\hat U^\\dagger\\hat A\\hat U$ (**Heisenberg picture**), since expectation values $\\langle\\psi(t)|\\hat A|\\psi(t)\\rangle = \\langle\\psi(0)|\\hat A_H(t)|\\psi(0)\\rangle$ agree. Differentiating gives the **Heisenberg equation**
$$\\frac{d\\hat A_H}{dt} = \\frac{i}{\\hbar}[\\hat H, \\hat A_H] + \\frac{\\partial\\hat A_H}{\\partial t},$$
the exact analogue of the classical $dA/dt = \\{A, H\\}$ with Poisson brackets replaced by $[\\,,]/i\\hbar$. For the oscillator, $\\hat x_H(t) = \\hat x\\cos\\omega t + (\\hat p/m\\omega)\\sin\\omega t$ exactly as classically, with operators in place of numbers: this is the cleanest statement of the correspondence principle and the form in which quantum field theory is usually written.

Two consequences. First, any observable with $[\\hat H, \\hat A] = 0$ is **conserved**: its expectation value and its whole probability distribution are constant. Momentum is conserved when $\\hat H$ is translation invariant because $\\hat p$ generates translations ($e^{-ia\\hat p/\\hbar}\\psi(x) = \\psi(x - a)$); angular momentum when $\\hat H$ is rotation invariant (module 4); parity when $V(-x) = V(x)$. Symmetry implies conservation here just as in Noether's theorem. Second, the **energy-time uncertainty** relation: $\\Delta t$ is not the uncertainty of a clock reading (there is no time operator) but the time $\\Delta A/|d\\langle A\\rangle/dt|$ for an observable to change by one standard deviation, and the Robertson relation with $\\hat H$ gives $\\Delta E\\,\\Delta t \\ge \\hbar/2$. For unstable states this becomes the relation between lifetime and spectral line width, $\\Gamma\\tau \\approx \\hbar$.

Read Zwiebach 8.05 lectures 7-8 and Tong 3.4; Griffiths 3.5-3.6 is the compact textbook version. The exercises include integrating the Heisenberg equations numerically for a non-trivial Hamiltonian using QuTiP, which you will rely on from here on.`,
          resources: [
            { ...R.mit805, note: 'Lectures 7-8: unitary time evolution, Heisenberg picture, conservation.', primary: true },
            { ...R.tongQM, note: 'Chapter 3, section 3.4.' },
            { ...R.qutip, note: 'Install QuTiP; the users guide sections on Qobj, time evolution (sesolve) and expectation values are the tutorial for this lesson\'s coding exercise.' },
          ],
          exercises: [
            {
              slug: 'heisenberg-oscillator',
              title: 'Heisenberg-picture oscillator and free particle',
              prompt:
                'Solve the Heisenberg equations for $\\hat x_H(t)$ and $\\hat p_H(t)$ for (a) the free particle and (b) the oscillator. Compute $[\\hat x_H(t), \\hat x_H(0)]$ in both cases and interpret the result for the free particle ($-i\\hbar t/m$) in terms of wave-packet spreading. Show that $\\Delta x(t)^2$ for the free particle follows from these operator solutions, reproducing the module 1 result.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'qutip-evolution',
              title: 'Time evolution in QuTiP',
              prompt:
                'Using QuTiP, build the Hamiltonian $\\hat H = \\hbar\\omega\\hat a^\\dagger\\hat a + \\lambda(\\hat a + \\hat a^\\dagger)^4$ in a 60-level truncation, evolve a coherent state with sesolve, and plot $\\langle\\hat x\\rangle(t)$ and $\\Delta x(t)$ for $\\lambda = 0$ and $\\lambda = 0.01\\hbar\\omega$. Verify for $\\lambda = 0$ that the result matches the exact Heisenberg solution, and describe the collapse and revival of the oscillation that the anharmonicity produces.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'energy-time-lifetime',
              title: 'Energy-time uncertainty and line widths',
              prompt:
                'Derive $\\Delta E\\,\\Delta t \\ge \\hbar/2$ from the Robertson relation with $\\Delta t \\equiv \\Delta A/|d\\langle A\\rangle/dt|$. Then model an unstable state as $\\psi(t) \\propto e^{-iE_0t/\\hbar}e^{-t/2\\tau}$ for $t > 0$, Fourier transform to get the energy distribution (a Lorentzian), and show its FWHM is $\\Gamma = \\hbar/\\tau$. Compute $\\Gamma$ for the hydrogen 2p state ($\\tau = 1.6$ ns) and compare with the Doppler width at 300 K.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the physical content of the statement that Û(t) is unitary?',
              answerOutline:
                'Norms (total probability) and inner products (distinguishability of states) are preserved in time; evolution is reversible.',
            },
            {
              question: 'How do you decide whether an observable is conserved?',
              answerOutline:
                'Check whether it commutes with the Hamiltonian (and has no explicit time dependence); then its full distribution is constant.',
            },
            {
              question: 'Why is the energy-time uncertainty relation different in character from ΔxΔp?',
              answerOutline:
                'There is no time operator; Δt is the characteristic time for some observable to change appreciably, and the relation follows from Robertson applied to H and that observable.',
            },
          ],
        },
        {
          slug: 'two-level-systems',
          title: 'Two-level systems: ammonia, Rabi oscillations and the Bloch sphere',
          summary:
            'The simplest nontrivial quantum system, solved completely: energy splitting from tunnelling, the Bloch-sphere picture of any two-state system, and driven transitions (Rabi oscillations) that underlie masers, NMR and qubits.',
          estimatedMinutes: 120,
          objectives: [
            'Write any two-level Hamiltonian as $\\hat H = E_0 + \\mathbf{h}\\cdot\\boldsymbol\\sigma$ and find its eigenstates and eigenvalues',
            'Represent a two-level state on the Bloch sphere and show that time evolution is precession about $\\mathbf h$',
            'Solve the driven two-level system at resonance and derive the Rabi formula for the transition probability',
            'Explain the ammonia molecule and maser, nuclear magnetic resonance and a qubit gate in this language',
          ],
          concepts: [
            'Two-level Hamiltonian in Pauli matrices',
            'Bloch sphere and the Bloch vector',
            'Tunnelling splitting and the ammonia molecule',
            'Precession of the Bloch vector',
            'Rotating-wave approximation',
            'Rabi oscillations and the Rabi frequency',
            'Resonance and detuning',
            'Masers, NMR and qubit rotations',
          ],
          explanation: `A system with two states, $|1\\rangle$ and $|2\\rangle$, is the hydrogen atom of the formalism: every piece of quantum mechanics appears, and everything can be solved. The most general Hermitian Hamiltonian is
$$\\hat H = E_0\\,\\mathbb 1 + h_x\\sigma_x + h_y\\sigma_y + h_z\\sigma_z = E_0 + \\mathbf h\\cdot\\boldsymbol\\sigma ,$$
with the Pauli matrices $\\sigma_x = \\begin{pmatrix}0&1\\\\1&0\\end{pmatrix}$, $\\sigma_y = \\begin{pmatrix}0&-i\\\\i&0\\end{pmatrix}$, $\\sigma_z = \\begin{pmatrix}1&0\\\\0&-1\\end{pmatrix}$. Its eigenvalues are $E_0 \\pm|\\mathbf h|$ and its eigenstates point along $\\pm\\hat{\\mathbf h}$ on the **Bloch sphere**: any normalised two-level state can be written $\\cos(\\theta/2)|1\\rangle + e^{i\\phi}\\sin(\\theta/2)|2\\rangle$ and represented by the unit vector $(\\theta, \\phi)$. Time evolution is **precession** of the Bloch vector about $\\mathbf h$ at angular frequency $2|\\mathbf h|/\\hbar$. This single picture covers spin-1/2 in a magnetic field, the polarisation of a photon, and every qubit.

**Ammonia.** The nitrogen in NH$_3$ can sit above or below the hydrogen plane; these two states have equal energy but tunnelling couples them with amplitude $-A$. The Hamiltonian is $E_0 - A\\sigma_x$, the eigenstates are the symmetric and antisymmetric combinations split by $2A$ (24 GHz, the double-delta-well physics of module 2), and a molecule prepared "up" oscillates to "down" and back at frequency $2A/h$. In an electric field the states acquire energies $\\pm\\mu\\mathcal E$ and the Hamiltonian becomes $E_0 + \\mu\\mathcal E\\sigma_z - A\\sigma_x$; Feynman III-8/9 show how this is used to sort molecules into a maser.

**Driven transitions.** Add an oscillating field, $\\hat H = \\frac{\\hbar\\omega_0}{2}\\sigma_z + \\hbar\\Omega\\cos(\\omega t)\\sigma_x$. Transform to the frame rotating at $\\omega$ and drop the counter-rotating terms (the **rotating-wave approximation**, valid for $\\Omega \\ll \\omega_0$); the problem becomes a static Hamiltonian with effective field $(\\Omega, 0, \\omega_0 - \\omega)$. The transition probability from $|1\\rangle$ to $|2\\rangle$ is the **Rabi formula**
$$P_2(t) = \\frac{\\Omega^2}{\\Omega^2 + \\delta^2}\\sin^2\\left(\\tfrac{1}{2}\\sqrt{\\Omega^2 + \\delta^2}\\,t\\right),\\qquad \\delta = \\omega - \\omega_0 .$$
On resonance the system cycles completely between the two states at the Rabi frequency $\\Omega$; a pulse of duration $\\pi/\\Omega$ is a "$\\pi$-pulse" that flips the state, a $\\pi/2$-pulse makes an equal superposition. This is how NMR and MRI manipulate nuclear spins and how single-qubit gates are implemented on every quantum computer.

Read Feynman III-8 and III-9 (ammonia) and Zwiebach 8.05 lectures 9-10; simulate everything with QuTiP in the exercises, including the breakdown of the rotating-wave approximation.`,
          resources: [
            { ...feynman3(8, 'The Hamiltonian Matrix'), primary: true },
            feynman3(9, 'The Ammonia Maser'),
            { ...R.mit805, note: 'Lectures 9-10: two-state systems, ammonia, NMR, Rabi oscillations.' },
            { ...R.qutip, note: 'Use sesolve with a time-dependent Hamiltonian for the Rabi simulations.' },
          ],
          exercises: [
            {
              slug: 'bloch-sphere-precession',
              title: 'Bloch sphere and precession',
              prompt:
                'Show that every pure two-level state corresponds to a unit Bloch vector $\\mathbf n = \\langle\\boldsymbol\\sigma\\rangle$ and that under $\\hat H = \\mathbf h\\cdot\\boldsymbol\\sigma$ it obeys $d\\mathbf n/dt = (2/\\hbar)\\mathbf h\\times\\mathbf n$ (precession). Derive this from the Heisenberg equation for $\\boldsymbol\\sigma$. Then compute, for a spin starting along $+z$ with $\\mathbf h$ along $x$, the probability of finding $+z$ at time $t$, and plot the Bloch-vector trajectory in 3D.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rabi-simulation',
              title: 'Rabi oscillations with and without the rotating-wave approximation',
              prompt:
                'Simulate $\\hat H(t) = \\frac{\\hbar\\omega_0}{2}\\sigma_z + \\hbar\\Omega\\cos(\\omega t)\\sigma_x$ in QuTiP for $\\omega_0 = 1$, $\\Omega = 0.05$, and detunings $\\delta = 0, 0.02, 0.05, 0.1$. Plot $P_2(t)$ and compare with the Rabi formula. Then increase $\\Omega$ to $0.5$ and $1.0$ and show the Bloch-Siegert shift and the breakdown of the rotating-wave approximation. Finally design a π-pulse and a π/2-pulse and verify their effect on the state.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'ammonia-in-field',
              title: 'Ammonia molecule in an electric field',
              prompt:
                'For $\\hat H = E_0 + \\mu\\mathcal E\\sigma_z - A\\sigma_x$ find the eigenvalues as functions of $\\mathcal E$, plot them, and show the energies vary quadratically for $\\mu\\mathcal E \\ll A$ (induced dipole) and linearly for $\\mu\\mathcal E \\gg A$ (permanent dipole). Compute the force on a molecule in a field gradient in each eigenstate and explain how the maser uses it to separate the upper state. With $2A = h\\times 23.87$ GHz and $\\mu = 1.47$ D, find the field at which the two regimes cross over.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the Bloch sphere and what does time evolution look like on it?',
              answerOutline:
                'The set of pure two-level states as unit vectors (θ, φ); under a static Hamiltonian the vector precesses about the direction of h at frequency 2|h|/ħ.',
            },
            {
              question: 'What is the Rabi frequency and what happens exactly on resonance?',
              answerOutline:
                'Ω, proportional to the drive strength; on resonance the population oscillates fully between the two levels as sin²(Ωt/2), so a pulse of duration π/Ω inverts the state.',
            },
            {
              question: 'What is the rotating-wave approximation and when is it valid?',
              answerOutline:
                'Dropping the terms oscillating at ω + ω₀ in the rotating frame; valid when Ω and the detuning are much smaller than ω₀.',
            },
          ],
        },
      ],
    },
    {
      slug: 'angular-momentum-and-spin',
      title: 'Angular Momentum and Spin',
      description:
        'Orbital angular momentum and spherical harmonics, the algebraic theory of angular momentum from the commutation relations alone, spin-1/2 and the Stern-Gerlach experiment, and the addition of angular momenta.',
      lessons: [
        {
          slug: 'orbital-angular-momentum-and-spherical-harmonics',
          title: 'Orbital angular momentum and spherical harmonics',
          summary:
            'The angular momentum operators in position space, separation of the three-dimensional Schrödinger equation in a central potential, and the spherical harmonics as simultaneous eigenfunctions of $\\hat L^2$ and $\\hat L_z$.',
          estimatedMinutes: 120,
          objectives: [
            'Write $\\hat L = \\hat r\\times\\hat p$ in spherical coordinates and derive the commutation relations $[\\hat L_i, \\hat L_j] = i\\hbar\\epsilon_{ijk}\\hat L_k$',
            'Separate the Schrödinger equation for a central potential into radial and angular parts',
            'Derive the spherical harmonics $Y_l^m$ with $\\hat L^2Y_l^m = \\hbar^2l(l+1)Y_l^m$ and $\\hat L_zY_l^m = \\hbar mY_l^m$, and explain why $l$ is a non-negative integer',
            'Interpret the centrifugal barrier and plot the angular probability distributions',
          ],
          concepts: [
            'Angular momentum operators in spherical coordinates',
            'Commutation relations and $[\\hat L^2, \\hat L_i] = 0$',
            'Central potentials and separation of variables',
            'Spherical harmonics $Y_l^m(\\theta, \\phi)$',
            'Quantum numbers $l$ and $m$; degeneracy $2l + 1$',
            'Radial equation and the centrifugal term $\\hbar^2l(l+1)/2mr^2$',
            'Parity of $Y_l^m$: $(-1)^l$',
            'Legendre polynomials',
          ],
          explanation: `In three dimensions the operator $\\hat{\\mathbf L} = \\hat{\\mathbf r}\\times\\hat{\\mathbf p}$ generates rotations, and from $[\\hat x_i, \\hat p_j] = i\\hbar\\delta_{ij}$ you can derive
$$[\\hat L_x, \\hat L_y] = i\\hbar\\hat L_z \\quad\\text{(and cyclic)},\\qquad [\\hat L^2, \\hat L_i] = 0 .$$
The components do not commute with one another, so no state has definite $L_x$, $L_y$ and $L_z$ at once, but $\\hat L^2$ and one component, conventionally $\\hat L_z$, can be diagonalised together. In spherical coordinates $\\hat L_z = -i\\hbar\\,\\partial_\\phi$ and $\\hat L^2 = -\\hbar^2\\left[\\frac{1}{\\sin\\theta}\\partial_\\theta(\\sin\\theta\\,\\partial_\\theta) + \\frac{1}{\\sin^2\\theta}\\partial_\\phi^2\\right]$, which is $-\\hbar^2$ times the angular part of the Laplacian.

That is why angular momentum controls every **central potential** problem: $\\hat H = \\frac{\\hat p_r^2}{2m} + \\frac{\\hat L^2}{2mr^2} + V(r)$. Since $\\hat H$ commutes with $\\hat L^2$ and $\\hat L_z$, write $\\psi = R(r)Y(\\theta, \\phi)$; the angular equation is $\\hat L^2Y = \\hbar^2\\lambda Y$ and the radial one is
$$-\\frac{\\hbar^2}{2m}\\frac{1}{r^2}\\frac{d}{dr}\\left(r^2\\frac{dR}{dr}\\right) + \\left[V(r) + \\frac{\\hbar^2\\lambda}{2mr^2}\\right]R = ER ,$$
a 1D problem with an added repulsive **centrifugal barrier**. With $u = rR$ it is exactly the 1D Schrödinger equation on $r > 0$ with $u(0) = 0$, so your module 2 solvers apply directly.

The angular equation separates again, $Y = \\Theta(\\theta)e^{im\\phi}$; single-valuedness in $\\phi$ forces integer $m$, and requiring $\\Theta$ to be finite at the poles turns the $\\theta$ equation (associated Legendre) into an eigenvalue problem with $\\lambda = l(l+1)$, $l = 0, 1, 2, \\dots$ and $|m| \\le l$. The solutions are the **spherical harmonics** $Y_l^m$, orthonormal on the sphere and complete, with parity $(-1)^l$. The familiar s, p, d orbitals are $l = 0, 1, 2$; plot $|Y_l^m|^2$ and you will recognise the chemistry textbook pictures (which usually show the real combinations $p_x$, $p_y$, $p_z$).

Read Zwiebach 8.04 lectures 20-21 (or 8.05 lecture 15) and Tong 4.1; Griffiths 4.1 has the separation step by step. The separation-of-variables and Legendre machinery is covered canonically in math-methods; the exercise set makes you compute, plot and verify the harmonics numerically.`,
          resources: [
            { ...R.mit804, note: 'Lectures 20-22: central potentials, angular momentum, spherical harmonics.', primary: true },
            { ...R.tongQM, note: 'Chapter 4, section 4.1 on angular momentum and the radial equation.' },
            { ...R.griffiths, note: 'Sections 4.1 and 4.3. Free alternative: Tong.' },
            feynman3(19, 'The Hydrogen Atom and the Periodic Table'),
          ],
          exercises: [
            {
              slug: 'angular-momentum-commutators',
              title: 'Angular momentum commutators and spherical form',
              prompt:
                'From $\\hat L_i = \\epsilon_{ijk}\\hat x_j\\hat p_k$ derive $[\\hat L_i, \\hat L_j] = i\\hbar\\epsilon_{ijk}\\hat L_k$ and $[\\hat L^2, \\hat L_z] = 0$. Show $[\\hat L_i, \\hat x_j] = i\\hbar\\epsilon_{ijk}\\hat x_k$ (so $\\hat{\\mathbf x}$ is a vector operator) and $[\\hat L_i, \\hat r^2] = 0$. Then transform $\\hat L_z$ and $\\hat L^2$ to spherical coordinates and confirm that $\\hat L^2/\\hbar^2r^2$ is minus the angular part of $\\nabla^2$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'spherical-harmonics-numerics',
              title: 'Spherical harmonics: compute, plot and verify',
              prompt:
                'Using scipy.special.sph_harm, (a) verify orthonormality $\\int Y_{l}^{m*}Y_{l\'}^{m\'}d\\Omega = \\delta_{ll\'}\\delta_{mm\'}$ numerically for $l \\le 3$; (b) plot $|Y_l^m|^2$ as 3D surfaces for $l = 0, 1, 2, 3$; (c) expand the function $f(\\theta, \\phi) = \\cos^2\\theta\\sin\\phi$ in spherical harmonics and verify the expansion reproduces $f$; (d) apply the finite-difference $\\hat L^2$ to $Y_2^1$ on a grid and confirm the eigenvalue $6\\hbar^2$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'three-d-well-and-oscillator',
              title: 'The 3D infinite well and isotropic oscillator',
              prompt:
                'Solve the radial equation with your module 2 shooting code for (a) the infinite spherical well of radius $a$ for $l = 0, 1, 2$ (compare $l = 0$ with the exact $E = n^2\\pi^2\\hbar^2/2ma^2$ and the others with zeros of spherical Bessel functions) and (b) the isotropic 3D harmonic oscillator, showing $E = \\hbar\\omega(2n_r + l + 3/2)$ and counting the degeneracy of the first four levels (1, 3, 6, 10). Explain the extra degeneracy beyond $2l + 1$.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a state not have definite values of all three components of L?',
              answerOutline:
                'The components do not commute ([L_x, L_y] = iħL_z), so they have no common eigenbasis except the trivial l = 0 state.',
            },
            {
              question: 'Why must l be an integer for orbital angular momentum?',
              answerOutline:
                'The φ dependence e^{imφ} must be single-valued, forcing integer m, and regularity at the poles then requires λ = l(l+1) with integer l ≥ |m|.',
            },
            {
              question: 'What does the centrifugal barrier do to the radial wavefunction?',
              answerOutline:
                'The repulsive ħ²l(l+1)/2mr² pushes the wavefunction away from the origin; R ∝ r^l near r = 0, so higher-l states have less probability near the nucleus.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/legendre-polynomials-and-spherical-harmonics'],
        },
        {
          slug: 'angular-momentum-algebra',
          title: 'The algebra of angular momentum: ladder operators and half-integer spin',
          summary:
            'Everything about angular momentum derived from $[\\hat J_i, \\hat J_j] = i\\hbar\\epsilon_{ijk}\\hat J_k$ alone: the ladder operators, the allowed values $j = 0, \\tfrac{1}{2}, 1, \\dots$, matrix representations, and rotation operators.',
          estimatedMinutes: 120,
          objectives: [
            'Define $\\hat J_\\pm = \\hat J_x \\pm i\\hat J_y$ and derive their action on $|j, m\\rangle$ including the coefficients $\\hbar\\sqrt{j(j+1) - m(m\\pm1)}$',
            'Show from the algebra alone that $j$ is a non-negative integer or half-integer and $m$ runs from $-j$ to $j$',
            'Construct the matrices of $\\hat J_x$, $\\hat J_y$, $\\hat J_z$ for $j = 1/2, 1, 3/2$',
            'Show that $e^{-i\\theta\\hat{\\mathbf n}\\cdot\\hat{\\mathbf J}/\\hbar}$ rotates states and explain the $4\\pi$ periodicity of spinors',
          ],
          concepts: [
            'General angular momentum $\\hat{\\mathbf J}$ defined by its commutation relations',
            'Ladder operators $\\hat J_\\pm$',
            'Eigenvalues $\\hbar^2j(j+1)$ and $\\hbar m$',
            'Half-integer $j$ allowed algebraically; realised as spin',
            'Matrix representations; Pauli matrices as $j = 1/2$',
            'Rotation operators and generators',
            'Spinors and the $4\\pi$ rotation',
            'Vector operators and the Wigner-Eckart theorem (statement)',
          ],
          explanation: `Forget position space. Define an angular momentum as any triple of Hermitian operators satisfying $[\\hat J_i, \\hat J_j] = i\\hbar\\epsilon_{ijk}\\hat J_k$. Then $\\hat J^2$ commutes with each $\\hat J_i$; label the simultaneous eigenstates of $\\hat J^2$ and $\\hat J_z$ by $|j, m\\rangle$ with eigenvalues $\\hbar^2\\lambda$ and $\\hbar m$. The **ladder operators** $\\hat J_\\pm = \\hat J_x \\pm i\\hat J_y$ satisfy $[\\hat J_z, \\hat J_\\pm] = \\pm\\hbar\\hat J_\\pm$, so they raise and lower $m$ by one while leaving $\\lambda$ unchanged, exactly like $\\hat a^\\dagger$ and $\\hat a$ for the oscillator. Because $\\langle\\hat J_x^2 + \\hat J_y^2\\rangle \\ge 0$, $m^2 \\le \\lambda$: the ladder is bounded above and below. At the top, $\\hat J_+|j, m_{max}\\rangle = 0$ gives $\\lambda = m_{max}(m_{max} + 1)$; at the bottom $\\lambda = m_{min}(m_{min} - 1)$; so $m_{min} = -m_{max} \\equiv -j$, and climbing from $-j$ to $j$ in integer steps requires $2j$ to be an integer:
$$j = 0, \\tfrac{1}{2}, 1, \\tfrac{3}{2}, \\dots,\\qquad m = -j, -j+1, \\dots, j,\\qquad \\hat J_\\pm|j,m\\rangle = \\hbar\\sqrt{j(j+1) - m(m\\pm1)}\\,|j, m\\pm1\\rangle .$$
Orbital angular momentum, where single-valuedness forced integer $l$, is one realisation. The **half-integer** values are allowed by the algebra and are realised by **spin**, an angular momentum with no position-space wavefunction at all. The $j = 1/2$ representation is $\\hat{\\mathbf S} = \\frac{\\hbar}{2}\\boldsymbol\\sigma$; write out the $3\\times3$ matrices for $j = 1$ and the $4\\times4$ for $j = 3/2$ from the ladder formula and you will see the pattern.

Angular momentum generates **rotations**: $\\hat R(\\theta\\hat{\\mathbf n}) = e^{-i\\theta\\hat{\\mathbf n}\\cdot\\hat{\\mathbf J}/\\hbar}$, which is why $[\\hat H, \\hat{\\mathbf J}] = 0$ for rotationally symmetric $\\hat H$ and why $\\hat J$ is conserved. For $j = 1/2$, $e^{-i\\theta\\hat{\\mathbf n}\\cdot\\boldsymbol\\sigma/2} = \\cos(\\theta/2) - i\\hat{\\mathbf n}\\cdot\\boldsymbol\\sigma\\sin(\\theta/2)$, so a rotation by $2\\pi$ gives $-1$: a spinor returns to itself only after $4\\pi$. This sign is physical (observed in neutron interferometry) and is the first hint of the spin-statistics connection.

Read Zwiebach 8.05 lectures 16-18 and Tong 4.2; Griffiths 4.3 is the standard textbook derivation. Do every exercise: this algebra is used daily in atomic, nuclear and particle physics and in quantum computing.`,
          resources: [
            { ...R.mit805, note: 'Lectures 16-18: angular momentum algebra, representations, rotations.', primary: true },
            { ...R.tongQM, note: 'Chapter 4, section 4.2 (and the discussion of spin).' },
            { ...R.griffiths, note: 'Section 4.3. Free alternative: Tong.' },
            { ...R.susskind, note: 'Lectures 2-3 and 7 build the spin algebra from the Stern-Gerlach experiment.' },
          ],
          exercises: [
            {
              slug: 'ladder-derivation',
              title: 'Derive the spectrum from the algebra',
              prompt:
                'Carry out the complete derivation: $[\\hat J^2, \\hat J_\\pm] = 0$, $[\\hat J_z, \\hat J_\\pm] = \\pm\\hbar\\hat J_\\pm$, $\\hat J_\\mp\\hat J_\\pm = \\hat J^2 - \\hat J_z^2 \\mp\\hbar\\hat J_z$, boundedness of $m$, the values of $j$ and $m$, and the normalisation of $\\hat J_\\pm|j, m\\rangle$ (fix the phase by the Condon-Shortley convention). Then prove that the orbital case restricts to integer $l$ by showing $\\hat L_\\pm$ acting on $e^{im\\phi}$ functions cannot produce half-integer $m$ without a branch cut.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'spin-matrices-builder',
              title: 'Build spin matrices for any j',
              prompt:
                'Write a function spin_matrices(j) that returns $\\hat J_x$, $\\hat J_y$, $\\hat J_z$ as $(2j+1)\\times(2j+1)$ matrices from the ladder formula. Verify the commutation relations and $\\hat J^2 = \\hbar^2j(j+1)$ numerically for $j = 1/2, 1, 3/2, 2, 5$. Diagonalise $\\hat J_x$ for $j = 1$ and interpret the eigenvectors. Compare with QuTiP\'s jmat.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rotations-and-spinors',
              title: 'Rotation operators and the 4π rotation',
              prompt:
                'Show $e^{-i\\theta\\hat{\\mathbf n}\\cdot\\boldsymbol\\sigma/2} = \\cos(\\theta/2) - i(\\hat{\\mathbf n}\\cdot\\boldsymbol\\sigma)\\sin(\\theta/2)$ using $(\\hat{\\mathbf n}\\cdot\\boldsymbol\\sigma)^2 = 1$. Rotate the state $|+z\\rangle$ by $\\theta$ about $y$ and show the result is the eigenstate of $\\hat{\\mathbf n}\\cdot\\hat{\\mathbf S}$ for $\\hat{\\mathbf n}$ in the $xz$-plane at angle $\\theta$. Rotate by $2\\pi$ and verify the state changes sign. Then design the neutron interferometer experiment (one arm passes through a magnetic field that rotates the spin by $2\\pi$) that reveals this sign as a shift of the interference pattern, and compute the field-length product needed.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Which assumptions go into deriving the allowed values of j, and which do not?',
              answerOutline:
                'Only the commutation relations and Hermiticity (positivity of J_x² + J_y²); no wavefunctions, no single-valuedness. Half-integer j is therefore allowed in general and excluded only for orbital L.',
            },
            {
              question: 'What is the coefficient in J₊|j, m⟩ and how is it derived?',
              answerOutline:
                'ħ√(j(j+1) − m(m+1)), from the norm ⟨j,m|J₋J₊|j,m⟩ = ⟨J² − J_z² − ħJ_z⟩.',
            },
            {
              question: 'What happens to a spin-1/2 state under a 2π rotation and is it observable?',
              answerOutline:
                'It acquires a factor −1; unobservable for the state alone (global phase) but observable in interference between a rotated and an unrotated path, as done with neutrons.',
            },
          ],
        },
        {
          slug: 'spin-one-half-and-stern-gerlach',
          title: 'Spin-1/2, Stern-Gerlach and magnetic resonance',
          summary:
            'The Stern-Gerlach experiment as the paradigm of quantum measurement, spinors and the magnetic moment, Larmor precession, and nuclear magnetic resonance as a two-level system in a time-dependent field.',
          estimatedMinutes: 110,
          objectives: [
            'Explain the Stern-Gerlach experiment and why it shows that spin components are quantised and incompatible',
            'Write the spin-1/2 Hamiltonian in a magnetic field, $\\hat H = -\\gamma\\mathbf B\\cdot\\hat{\\mathbf S}$, and solve for Larmor precession',
            'Describe the g-factor, the Bohr magneton and the magnetic moments of the electron, proton and neutron',
            'Analyse magnetic resonance (a rotating transverse field) and connect it to the Rabi formula and MRI',
          ],
          concepts: [
            'Stern-Gerlach apparatus and sequential filters',
            'Spinors $\\chi = (a, b)^T$ and the spin-1/2 Hilbert space',
            'Magnetic moment $\\boldsymbol\\mu = \\gamma\\mathbf S$, g-factor, Bohr magneton',
            'Larmor precession at $\\omega_L = \\gamma B$',
            'Spin eigenstates along an arbitrary axis',
            'Magnetic resonance and the rotating frame',
            'NMR, MRI and electron spin resonance',
            'Spin as intrinsic, non-orbital angular momentum',
          ],
          explanation: `In 1922 Stern and Gerlach sent silver atoms through an inhomogeneous magnetic field and saw the beam split into exactly two spots, not the continuous smear a classical magnetic moment would produce. The atom's magnetic moment is $\\boldsymbol\\mu = \\gamma\\mathbf S$ and the force is $\\nabla(\\boldsymbol\\mu\\cdot\\mathbf B)$, so the experiment *measures* $S_z$ and finds only $\\pm\\hbar/2$: the electron has spin $1/2$. Chain apparatuses with different orientations and you get the module 3 measurement postulates in the flesh: filtering $+z$ then measuring $x$ gives 50/50; then measuring $z$ again gives 50/50, the $z$ information having been erased. Feynman III-5 and III-6 and Susskind's first lectures start quantum mechanics here, and for good reason.

Spin states are **spinors**, two-component vectors $\\chi = a|\\uparrow\\rangle + b|\\downarrow\\rangle$, with $\\hat{\\mathbf S} = \\frac{\\hbar}{2}\\boldsymbol\\sigma$. The eigenstates of $\\hat{\\mathbf n}\\cdot\\hat{\\mathbf S}$ for $\\hat{\\mathbf n} = (\\sin\\theta\\cos\\phi, \\sin\\theta\\sin\\phi, \\cos\\theta)$ are $(\\cos\\frac\\theta2, e^{i\\phi}\\sin\\frac\\theta2)$ and $(-e^{-i\\phi}\\sin\\frac\\theta2, \\cos\\frac\\theta2)$, the Bloch-sphere parametrisation. The probability of finding spin up along $\\hat{\\mathbf n}$ when it was prepared up along $z$ is $\\cos^2(\\theta/2)$, a prediction you will test against Bell's theorem in module 7.

For an electron $\\gamma = -g_e\\mu_B/\\hbar$ with $\\mu_B = e\\hbar/2m_e$ and $g_e = 2.0023$ (the 2 from Dirac's equation, the 0.0023 from quantum electrodynamics, agreeing with experiment to 12 digits). In a field $\\mathbf B = B\\hat z$ the Hamiltonian $\\hat H = -\\gamma B\\hat S_z$ splits the levels by $\\hbar\\omega_L$ with $\\omega_L = |\\gamma|B$, and the Bloch vector **precesses** about $\\mathbf B$ at the Larmor frequency: 28 GHz/T for electrons, 42.6 MHz/T for protons.

**Magnetic resonance** adds a weak field rotating in the $xy$-plane at frequency $\\omega$. In the frame rotating with it the Hamiltonian is static with an effective field $(B_1, 0, B_0 - \\omega/\\gamma)$, and the problem is the Rabi problem of module 3: at $\\omega = \\omega_L$ even a tiny $B_1$ flips the spin completely. Rabi used this to measure nuclear moments; Bloch and Purcell made it NMR; Lauterbur and Mansfield made it MRI by adding field gradients so that $\\omega_L$ encodes position. Read Zwiebach 8.05 lectures 11-12 for the details, and simulate a spin-echo sequence in the exercises.`,
          resources: [
            { ...feynman3(6, 'Spin One-Half'), primary: true },
            { ...R.mit805, note: 'Lectures 11-12: spin-1/2, Stern-Gerlach, Larmor precession, magnetic resonance.' },
            {
              title: 'PhET — Stern-Gerlach Experiment',
              url: 'https://phet.colorado.edu/en/simulations/stern-gerlach',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Colorado Boulder',
              note: 'Chain analysers at different angles and record the probabilities before computing them.',
            },
            { ...R.susskind, note: 'Lectures 1-3 use the Stern-Gerlach experiment to motivate the entire formalism.' },
          ],
          exercises: [
            {
              slug: 'sequential-stern-gerlach',
              title: 'Sequential Stern-Gerlach analysers',
              prompt:
                'Derive the eigenstates of $\\hat{\\mathbf n}\\cdot\\hat{\\mathbf S}$ for a general direction. For a beam prepared spin-up along $z$ passing through an analyser at angle $\\theta$ (selecting "up") and then a $z$ analyser, compute the fraction of the original beam in each final spot as a function of $\\theta$. Then check it on the PhET simulation for $\\theta = 0°, 45°, 90°, 180°$. Explain why inserting the middle analyser can *increase* the transmission of spin-down through the final one.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'larmor-and-spin-echo',
              title: 'Larmor precession and the spin echo',
              prompt:
                'Simulate (QuTiP or 2×2 NumPy) an ensemble of 1000 proton spins in $B_0 = 1$ T with a Gaussian spread of 1% in the local field (inhomogeneity). Apply a π/2 pulse, let the transverse magnetisation dephase (plot $|\\langle S_x + iS_y\\rangle|$ decaying), then apply a π pulse at time $\\tau$ and show the echo at $2\\tau$. Explain why the echo refocuses inhomogeneous dephasing but not true relaxation, and what $T_2$ and $T_2^*$ mean.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'magnetic-moments-table',
              title: 'Magnetic moments and resonance frequencies',
              prompt:
                'Compute the Larmor frequency in a 3 T MRI magnet for protons ($g_p = 5.586$, nuclear magneton), electrons, and $^{13}$C ($g = 1.405$). Compute the thermal polarisation $\\tanh(\\hbar\\omega_L/2k_BT)$ of protons at 300 K and explain why MRI signals are so weak and why hyperpolarisation methods exist. Why is the neutron\'s moment ($g_n = -3.826$) evidence that it is not elementary?',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly did the Stern-Gerlach experiment demonstrate?',
              answerOutline:
                'Space quantisation: the component of the magnetic moment (spin) along the field takes only two discrete values, and sequential measurements along different axes show the components are incompatible.',
            },
            {
              question: 'What is Larmor precession and at what frequency?',
              answerOutline:
                'The spin expectation vector rotates about B at ω_L = |γ|B, from the Heisenberg equation for S in H = −γB·S; the level splitting is ħω_L.',
            },
            {
              question: 'Why does a weak rotating field at resonance have a large effect on a spin?',
              answerOutline:
                'In the rotating frame the large static field is cancelled by the detuning term at resonance, leaving only the small B₁ as an effective field about which the spin precesses fully (Rabi flopping).',
            },
          ],
        },
        {
          slug: 'addition-of-angular-momenta',
          title: 'Addition of angular momenta',
          summary:
            'Combining two angular momenta: the total $\\hat{\\mathbf J} = \\hat{\\mathbf J}_1 + \\hat{\\mathbf J}_2$, the allowed values $|j_1 - j_2| \\le j \\le j_1 + j_2$, Clebsch-Gordan coefficients, and the singlet and triplet of two spin-1/2 particles.',
          estimatedMinutes: 110,
          objectives: [
            'Show that $\\hat{\\mathbf J}_1 + \\hat{\\mathbf J}_2$ is an angular momentum and that $\\{\\hat J_1^2, \\hat J_2^2, \\hat J^2, \\hat J_z\\}$ is a CSCO alternative to $\\{\\hat J_1^2, \\hat J_2^2, \\hat J_{1z}, \\hat J_{2z}\\}$',
            'Derive the allowed total $j$ values and count states to verify $\\sum(2j+1) = (2j_1+1)(2j_2+1)$',
            'Construct the singlet and triplet states of two spin-1/2 particles explicitly using ladder operators',
            'Compute Clebsch-Gordan coefficients for small cases and use tables for larger ones; apply to spin-orbit coupling and the hyperfine structure',
          ],
          concepts: [
            'Tensor product of Hilbert spaces',
            'Total angular momentum and the coupled basis',
            'Triangle rule $|j_1 - j_2| \\le j \\le j_1 + j_2$',
            'Clebsch-Gordan coefficients',
            'Singlet $\\frac{1}{\\sqrt2}(|\\uparrow\\downarrow\\rangle - |\\downarrow\\uparrow\\rangle)$ and triplet',
            'Exchange symmetry of coupled states',
            'Spin-orbit coupling $\\hat{\\mathbf L}\\cdot\\hat{\\mathbf S}$ and $j = l \\pm 1/2$',
            'Hyperfine structure and the 21 cm line',
          ],
          explanation: `Two subsystems with angular momenta $\\hat{\\mathbf J}_1$ and $\\hat{\\mathbf J}_2$ (the orbital and spin angular momentum of one electron; the spins of two electrons; electron and nucleus) live in the tensor-product space spanned by $|j_1, m_1\\rangle|j_2, m_2\\rangle$, the **uncoupled basis**. The total $\\hat{\\mathbf J} = \\hat{\\mathbf J}_1 + \\hat{\\mathbf J}_2$ satisfies the angular-momentum algebra (check: the two sets commute with each other), so there is also a **coupled basis** $|j, m\\rangle$ of eigenstates of $\\hat J^2$ and $\\hat J_z$. Interactions like $\\hat{\\mathbf L}\\cdot\\hat{\\mathbf S} = \\frac{1}{2}(\\hat J^2 - \\hat L^2 - \\hat S^2)$ are diagonal in the coupled basis, so you need to be able to convert.

The rule: $j$ runs from $|j_1 - j_2|$ to $j_1 + j_2$ in integer steps, each value once. The proof is counting. The uncoupled state with $m = j_1 + j_2$ is unique and must be the top of the $j = j_1 + j_2$ ladder; lowering it with $\\hat J_- = \\hat J_{1-} + \\hat J_{2-}$ generates that multiplet; the $m = j_1 + j_2 - 1$ subspace is two-dimensional, and the state orthogonal to the ladder state is the top of $j = j_1 + j_2 - 1$; continue until the states are exhausted. The expansion coefficients $\\langle j_1m_1j_2m_2|jm\\rangle$ are the **Clebsch-Gordan coefficients**, tabulated everywhere and computed by this very algorithm.

For two spins 1/2 the result is the **triplet** ($j = 1$): $|\\uparrow\\uparrow\\rangle$, $\\frac{1}{\\sqrt2}(|\\uparrow\\downarrow\\rangle + |\\downarrow\\uparrow\\rangle)$, $|\\downarrow\\downarrow\\rangle$, symmetric under exchange, and the **singlet** ($j = 0$): $\\frac{1}{\\sqrt2}(|\\uparrow\\downarrow\\rangle - |\\downarrow\\uparrow\\rangle)$, antisymmetric. The singlet has total spin zero yet neither particle has a definite spin: it is the maximally entangled state of module 7, the state of the two electrons in a helium ground state or a covalent bond, and of the proton and electron in the lower hyperfine level of hydrogen. The triplet-singlet splitting of that hyperfine pair, 1420 MHz, is the 21 cm line that maps the hydrogen in galaxies.

For one electron with orbital $l$ and spin $1/2$, $j = l \\pm 1/2$, which is the structure behind the $p_{1/2}$, $p_{3/2}$ labels in spectroscopy and the fine-structure doublets of module 5. Read Zwiebach 8.05 lectures 19-21 and Griffiths 4.4.3; the exercises build a Clebsch-Gordan calculator and apply it.`,
          resources: [
            { ...R.mit805, note: 'Lectures 19-21: addition of angular momenta, Clebsch-Gordan coefficients, applications.', primary: true },
            { ...R.griffiths, note: 'Section 4.4.3 and the Clebsch-Gordan table inside the cover. Free alternative: Tong chapter 4 and the 8.05 notes.' },
            { ...R.tongQM, note: 'Chapter 4, addition of angular momentum.' },
            feynman3(18, 'Angular Momentum'),
          ],
          exercises: [
            {
              slug: 'singlet-triplet-construction',
              title: 'Construct the singlet and triplet',
              prompt:
                'Starting from $|\\uparrow\\uparrow\\rangle$, apply $\\hat S_- = \\hat S_{1-} + \\hat S_{2-}$ to generate the triplet with correct normalisation, then find the singlet by orthogonality. Verify by direct computation with 4×4 matrices ($\\hat S^2 = (\\hat{\\mathbf S}_1 + \\hat{\\mathbf S}_2)^2$ using Kronecker products) that the triplet states have $S^2 = 2\\hbar^2$ and the singlet $0$. Show $\\hat{\\mathbf S}_1\\cdot\\hat{\\mathbf S}_2 = \\hbar^2/4$ on the triplet and $-3\\hbar^2/4$ on the singlet.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'clebsch-gordan-calculator',
              title: 'A Clebsch-Gordan calculator',
              prompt:
                'Implement the ladder-and-orthogonalise algorithm to compute all Clebsch-Gordan coefficients for given $j_1, j_2$ (use your spin_matrices function and Kronecker products; the coupled states are eigenvectors of $\\hat J^2$ within each $m$ sector). Reproduce the tabulated $1/2\\otimes1/2$, $1\\otimes1/2$ and $1\\otimes1$ tables, checking phases against the Condon-Shortley convention. Verify unitarity of the transformation.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'hyperfine-21cm',
              title: 'Hyperfine splitting and the 21 cm line',
              prompt:
                'The hyperfine Hamiltonian of hydrogen\'s ground state is $\\hat H = A\\,\\hat{\\mathbf S}_e\\cdot\\hat{\\mathbf S}_p/\\hbar^2$. Find the energies of the $F = 0$ and $F = 1$ levels and the splitting in terms of $A$. Given the observed 1420.4 MHz, compute $A$ and the wavelength. Then add a magnetic field (Zeeman terms for both spins, with $g_p\\mu_N \\ll g_e\\mu_B$) and compute the four energies versus $B$ numerically (Breit-Rabi diagram), identifying the weak- and strong-field limits.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Which values of total j arise from combining j₁ = 1 and j₂ = 1/2, and how many states is that?',
              answerOutline:
                'j = 3/2 and 1/2; 4 + 2 = 6 states = 3 × 2, matching the uncoupled count.',
            },
            {
              question: 'Why is the singlet state entangled?',
              answerOutline:
                'It cannot be written as a product |a⟩|b⟩; each spin alone is completely unpolarised, yet their components along any common axis are perfectly anticorrelated.',
            },
            {
              question: 'Why are spin-orbit and hyperfine interactions diagonal in the coupled basis?',
              answerOutline:
                'They are proportional to J₁·J₂ = (J² − J₁² − J₂²)/2, which is a function of the coupled quantum numbers only.',
            },
          ],
        },
      ],
      project: {
        slug: 'spin-dynamics-simulator',
        title: 'A spin-dynamics simulator',
        description: `Build a small simulator (QuTiP or raw NumPy) for one or two spins of arbitrary $j$ in static and time-dependent magnetic fields, with a Bloch-sphere visualiser for spin-1/2.

Use it to reproduce: Larmor precession; Rabi oscillations with detuning; the Bloch-Siegert shift when the rotating-wave approximation fails; a spin-echo sequence in an inhomogeneous field; the Breit-Rabi diagram of hydrogen's ground state; and the dynamics of two coupled spins under an exchange interaction $J\\,\\hat{\\mathbf S}_1\\cdot\\hat{\\mathbf S}_2$, showing that the singlet is stationary while $|\\uparrow\\downarrow\\rangle$ oscillates to $|\\downarrow\\uparrow\\rangle$ (the SWAP dynamics used in spin qubits).`,
        deliverables: [
          'Simulator code with tests against the analytic Rabi formula and Larmor solution',
          'Notebook with the six simulations, each with a figure and a short physical explanation',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add relaxation via the Lindblad equation (QuTiP mesolve) and fit T₁ and T₂ from simulated data', 'Implement a composite pulse sequence (e.g. BB1) and show it is robust against pulse-amplitude errors'],
      },
    },
    {
      slug: 'hydrogen-and-atoms',
      title: 'Hydrogen and Atoms',
      description:
        'The hydrogen atom solved exactly, the corrections that produce fine and hyperfine structure and the Zeeman effect, identical particles and the exclusion principle, and the structure of multi-electron atoms and the periodic table.',
      lessons: [
        {
          slug: 'hydrogen-atom',
          title: 'The hydrogen atom',
          summary:
            'Solve the radial equation for the Coulomb potential: the Bohr energies emerge from normalisability, the quantum numbers $n, l, m$ and their degeneracy, the orbitals and their sizes, and the spectrum.',
          estimatedMinutes: 130,
          objectives: [
            'Reduce the two-body problem to one body with the reduced mass and solve the radial equation for $V = -e^2/4\\pi\\epsilon_0r$',
            'Show that normalisability quantises $E_n = -13.6\\ \\mathrm{eV}/n^2$ and that $l \\le n - 1$',
            'Write down and plot the radial functions $R_{nl}$ and compute $\\langle r\\rangle$, $\\langle 1/r\\rangle$ and the most probable radius',
            'Explain the $n^2$ degeneracy (accidental, from the hidden symmetry of the Coulomb problem) and the Rydberg spectrum with selection rules',
          ],
          concepts: [
            'Reduced mass and centre-of-mass separation',
            'Radial equation with Coulomb potential; Bohr radius $a_0$',
            'Asymptotics $u \\sim r^{l+1}$ and $e^{-\\kappa r}$; associated Laguerre polynomials',
            'Quantum numbers $n, l, m$ and degeneracy $n^2$',
            'Radial probability density $r^2|R|^2$',
            'Expectation values $\\langle r\\rangle = \\frac{a_0}{2}[3n^2 - l(l+1)]$',
            'Spectral series and the selection rule $\\Delta l = \\pm1$',
            'Hydrogen-like ions and Rydberg atoms',
          ],
          explanation: `With the angular part solved, hydrogen is the radial equation for $u = rR$:
$$-\\frac{\\hbar^2}{2\\mu}u'' + \\left[-\\frac{e^2}{4\\pi\\epsilon_0r} + \\frac{\\hbar^2l(l+1)}{2\\mu r^2}\\right]u = Eu ,$$
where $\\mu = m_em_p/(m_e + m_p)$ is the reduced mass. In units of $a_0 = 4\\pi\\epsilon_0\\hbar^2/\\mu e^2 = 0.529$ Å and $\\rho = r/a_0$, with $\\kappa = \\sqrt{-2\\mu E}/\\hbar$: the solution behaves as $\\rho^{l+1}$ near the origin and $e^{-\\kappa r}$ at infinity, and writing $u = \\rho^{l+1}e^{-\\kappa a_0\\rho}v(\\rho)$ gives a power series for $v$ that must **terminate** (otherwise $u \\sim e^{+\\kappa r}$), exactly as for the oscillator. Termination requires $\\kappa a_0 = 1/n$ with $n = l + 1, l + 2, \\dots$, hence
$$E_n = -\\frac{\\mu e^4}{2(4\\pi\\epsilon_0)^2\\hbar^2n^2} = -\\frac{13.6\\ \\mathrm{eV}}{n^2},\\qquad l = 0, 1, \\dots, n-1,\\qquad m = -l, \\dots, l .$$
Bohr's formula is recovered, but now it is derived, and the angular momentum of the ground state is zero, not $\\hbar$. The polynomials $v$ are associated Laguerre polynomials; $R_{10} \\propto e^{-\\rho}$, $R_{20} \\propto (1 - \\rho/2)e^{-\\rho/2}$, $R_{21} \\propto \\rho e^{-\\rho/2}$ should be in your memory, the rest in scipy.

Each level has degeneracy $\\sum_{l<n}(2l+1) = n^2$ (times 2 for spin). The $2l + 1$ part is rotational symmetry; the degeneracy in $l$ is special to the $1/r$ potential and comes from a hidden symmetry (the conserved Runge-Lenz vector, the same one that closes Kepler orbits). Any deviation from pure Coulomb, such as the screening in alkali atoms, lifts it: that is why sodium's 3s and 3p differ by 2.1 eV.

The radial probability density $r^2|R_{nl}|^2$ peaks at $a_0$ for the ground state, with $\\langle r\\rangle = 1.5a_0$ and $\\langle 1/r\\rangle = 1/a_0$ (so $\\langle V\\rangle = 2E$ and $\\langle T\\rangle = -E$, the virial theorem). The expectation values $\\langle r^k\\rangle$ for general $n, l$ are needed for the fine-structure corrections of the next lesson. Transitions obey $\\Delta l = \\pm1$ (from the parity and vector character of the dipole operator, module 6), which with $E_n$ gives the Lyman, Balmer and Paschen series.

Read Zwiebach 8.04 lectures 22-24 and Tong 4.3; Griffiths 4.2 is the standard. Use the NIST Atomic Spectra Database to compare the predicted lines with measured ones, including the reduced-mass isotope shift between hydrogen and deuterium.`,
          resources: [
            { ...R.mit804, note: 'Lectures 22-24: the hydrogen atom, spectrum, degeneracies.', primary: true },
            { ...R.tongQM, note: 'Chapter 4, section 4.3.' },
            {
              title: 'NIST Atomic Spectra Database',
              url: 'https://www.nist.gov/pml/atomic-spectra-database',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Energy levels and lines of H I, D I and He II for the comparison exercises.',
            },
            {
              title: 'PhET — Models of the Hydrogen Atom',
              url: 'https://phet.colorado.edu/en/simulations/models-of-the-hydrogen-atom',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Colorado Boulder',
              note: 'Compare the predictions of the classical, Bohr, de Broglie and Schrödinger models against the spectrum.',
            },
          ],
          exercises: [
            {
              slug: 'radial-equation-series',
              title: 'Solve the radial equation by series',
              prompt:
                'Carry out the full series solution: derive the recursion relation for the coefficients of $v(\\rho)$, show the series must terminate, obtain the quantisation condition and the restriction $l \\le n - 1$. Write out $R_{10}, R_{20}, R_{21}, R_{30}$ normalised, and verify orthogonality of $R_{10}$ and $R_{20}$ by integration. Compute $\\langle r\\rangle$ and $\\langle 1/r\\rangle$ for the 1s and 2p states and check the virial theorem.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'hydrogen-numerics',
              title: 'Hydrogen by numerical shooting and diagonalisation',
              prompt:
                'Use your radial solver on the Coulomb potential (grid in $r$ from 0 to 60 $a_0$) for $l = 0, 1, 2$ and recover $E_n = -1/2n^2$ Hartree for $n \\le 4$ to 5 digits; plot $r^2|R_{nl}|^2$ for the first six states. Then replace the Coulomb potential by a screened potential $-(1 + (Z-1)e^{-r/a})/r$ with $Z = 11$, $a = 0.5a_0$ (a crude sodium model) and show the $l$ degeneracy is lifted, with 3s below 3p below 3d. Compare the 3s-3p splitting with sodium\'s 2.1 eV and comment.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'spectral-lines-and-isotopes',
              title: 'Spectral lines, isotope shift and hydrogen-like ions',
              prompt:
                'Compute the Balmer-α wavelength for H and D including reduced mass and compare with NIST (656.28 and 656.10 nm). Compute the Lyman-α wavelength of He⁺ and of hydrogen-like uranium (U⁹¹⁺) and explain why the latter requires relativistic treatment. For a Rydberg atom with $n = 100$ compute the orbital radius, the binding energy, the classical orbital period and the spacing to $n = 101$ in GHz.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where does the quantisation of hydrogen\'s energy come from in the Schrödinger treatment?',
              answerOutline:
                'Normalisability: the series solution of the radial equation must terminate, which happens only for κa₀ = 1/n with integer n > l.',
            },
            {
              question: 'Why is the hydrogen degeneracy n² rather than 2l + 1?',
              answerOutline:
                'The 1/r potential has an extra conserved quantity (the Runge-Lenz vector), making states with different l but the same n degenerate; any other central potential breaks this.',
            },
            {
              question: 'At what radius is the 1s electron most likely to be found, and what is its mean radius?',
              answerOutline:
                'The radial density r²|R|² peaks at a₀ (the Bohr radius); ⟨r⟩ = 1.5 a₀.',
            },
          ],
        },
        {
          slug: 'fine-structure-zeeman-and-hyperfine',
          title: 'Fine structure, the Zeeman effect and hyperfine structure',
          summary:
            'The small corrections that make real spectra: relativistic kinetic energy, spin-orbit coupling and the Darwin term (fine structure, scaling as $\\alpha^2$), the Lamb shift, the Zeeman effect in weak and strong fields, and hyperfine structure.',
          estimatedMinutes: 120,
          objectives: [
            'Estimate the sizes of fine, hyperfine and Lamb-shift corrections using $\\alpha$ and mass ratios',
            'Derive the spin-orbit Hamiltonian $\\propto \\hat{\\mathbf L}\\cdot\\hat{\\mathbf S}/r^3$ and evaluate its first-order shift using the coupled basis',
            'Combine the corrections into the fine-structure formula $E_{nj} = E_n[1 + \\frac{\\alpha^2}{n^2}(\\frac{n}{j+1/2} - \\frac{3}{4})]$',
            'Compute the Zeeman splitting with the Landé g-factor in weak fields and the Paschen-Back limit in strong fields',
          ],
          concepts: [
            'Fine-structure constant $\\alpha \\approx 1/137$',
            'Relativistic correction $-\\hat p^4/8m^3c^2$',
            'Spin-orbit coupling and Thomas precession',
            'Darwin term for $l = 0$',
            'Fine-structure formula; degeneracy in $l$ at fixed $j$',
            'Lamb shift (QED)',
            'Zeeman effect; Landé g-factor; Paschen-Back regime',
            'Hyperfine structure and nuclear spin',
          ],
          explanation: `The Bohr levels are accurate to about one part in $10^4$. The corrections are organised by powers of the **fine-structure constant** $\\alpha = e^2/4\\pi\\epsilon_0\\hbar c \\approx 1/137$, which is also $v/c$ for the ground-state electron. Fine structure is of relative order $\\alpha^2 \\sim 5\\times10^{-5}$; the Lamb shift is of order $\\alpha^3\\ln\\alpha$; hyperfine is of order $\\alpha^2m_e/m_p$. (These are first-order perturbation theory calculations; the method is formalised in module 6, but each term here is simple enough to do now with the formulas $\\Delta E = \\langle\\hat H'\\rangle$.)

**Fine structure** has three pieces. The relativistic kinetic energy correction $-\\hat p^4/8m^3c^2$ comes from expanding $\\sqrt{p^2c^2 + m^2c^4}$. **Spin-orbit coupling** arises because in the electron's frame the nucleus orbits it, producing a magnetic field $\\mathbf B \\propto \\mathbf L/r^3$ that couples to the spin: $\\hat H_{SO} = \\frac{e^2}{8\\pi\\epsilon_0m^2c^2r^3}\\hat{\\mathbf L}\\cdot\\hat{\\mathbf S}$, where the factor $1/2$ relative to the naive result is Thomas precession. It is diagonal in the coupled basis of module 4, with $\\hat{\\mathbf L}\\cdot\\hat{\\mathbf S} = \\frac{\\hbar^2}{2}[j(j+1) - l(l+1) - 3/4]$. The Darwin term affects only $l = 0$. Remarkably the three sum to a formula depending only on $n$ and $j$:
$$E_{nj} = E_n\\left[1 + \\frac{\\alpha^2}{n^2}\\left(\\frac{n}{j + 1/2} - \\frac{3}{4}\\right)\\right].$$
The $2p_{1/2}$ and $2p_{3/2}$ levels split by 45 μeV (10.9 GHz), the famous doublet structure of every alkali spectrum (sodium D lines: 17 cm$^{-1}$). The $2s_{1/2}$ and $2p_{1/2}$ remain degenerate until QED, through vacuum fluctuations, lifts them by the **Lamb shift** of 1058 MHz, one of the founding measurements of quantum electrodynamics.

**Zeeman effect.** A field $B$ adds $\\hat H_Z = \\frac{\\mu_B B}{\\hbar}(\\hat L_z + 2\\hat S_z)$. When this is small compared with fine structure, $j$ is still good and the shift is $\\Delta E = g_J\\mu_BBm_j$ with the **Landé factor** $g_J = 1 + \\frac{j(j+1) + s(s+1) - l(l+1)}{2j(j+1)}$. When the field dominates (Paschen-Back), $m_l$ and $m_s$ are good instead and $\\Delta E = \\mu_BB(m_l + 2m_s)$. In between you diagonalise numerically, which is one of your exercises; the sodium D lines in a 1 T field are the classic test.

**Hyperfine structure** couples the electron to the nuclear spin; for hydrogen's ground state you computed the 21 cm splitting in module 4. Read Zwiebach 8.06 lectures 2-5 and Griffiths 7.3-7.5 (3rd ed.); verify every number against the NIST database.`,
          resources: [
            { ...R.mit806, note: 'Lectures 2-5 of 8.06: fine structure, Zeeman effect, hyperfine structure, Lamb shift.', primary: true },
            { ...R.griffiths, note: 'Sections 7.3-7.5 (3rd ed.; 6.3-6.5 in the 2nd). Free alternative: the 8.06 notes and Tong Topics in QM chapter on atoms.' },
            { ...R.tongTopics, note: 'Chapter on "Atoms": fine structure and the Zeeman effect with full derivations.' },
            {
              title: 'NIST Atomic Spectra Database',
              url: 'https://www.nist.gov/pml/atomic-spectra-database',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Fine-structure levels of H, Na, and the measured Lamb shift.',
            },
          ],
          exercises: [
            {
              slug: 'spin-orbit-first-order',
              title: 'Fine structure by first-order perturbation theory',
              prompt:
                'Evaluate $\\langle\\hat H_{rel}\\rangle$ using $\\hat p^2 = 2m(\\hat H_0 - V)$ and the hydrogen expectation values $\\langle 1/r\\rangle$, $\\langle 1/r^2\\rangle$; evaluate $\\langle\\hat H_{SO}\\rangle$ using $\\langle 1/r^3\\rangle = 1/[n^3l(l+1/2)(l+1)a_0^3]$ and the coupled basis; add the Darwin term for $l = 0$. Show the sum gives the fine-structure formula. Compute the splittings of $n = 2$ and $n = 3$ in GHz and compare with NIST.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'zeeman-intermediate-field',
              title: 'Zeeman effect from weak to strong fields',
              prompt:
                'For the $n = 2$, $l = 1$ states of hydrogen, write the $6\\times6$ matrix of $\\hat H_{SO} + \\hat H_Z$ in the uncoupled basis $|m_l, m_s\\rangle$ (use your Clebsch-Gordan tools or Kronecker products), diagonalise numerically for $B$ from 0 to 5 T, and plot the energies. Show the weak-field slopes match $g_J\\mu_Bm_j$ with $g_J = 2/3$ and $4/3$ and the strong-field asymptotes match $\\mu_BB(m_l + 2m_s)$. Do the same for the sodium D lines and reproduce the anomalous Zeeman pattern.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'corrections-order-of-magnitude',
              title: 'Hierarchy of corrections',
              prompt:
                'Using only $\\alpha$, $m_e/m_p$ and $E_1 = 13.6$ eV, estimate the magnitudes of: fine structure, Lamb shift ($\\sim\\alpha^3E_1\\ln(1/\\alpha)$ times a factor of order 1), hyperfine splitting, the ground-state energy shift from the finite proton size ($\\sim E_1(r_p/a_0)^2$), and the Zeeman shift in 1 T. Rank them, express each in MHz, and identify which measurement (NIST) confirms each. Discuss why the proton radius enters precision tests of QED.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three contributions to fine structure and what do they have in common?',
              answerOutline:
                'Relativistic p⁴ correction, spin-orbit coupling, Darwin term; all are of order α² relative to the Bohr energy and all emerge from the Dirac equation expanded in v/c.',
            },
            {
              question: 'Why does the fine-structure energy depend on j but not on l?',
              answerOutline:
                'A hidden property of the Coulomb problem (manifest in the exact Dirac solution): states with the same n and j but different l remain degenerate; only QED (Lamb shift) separates them.',
            },
            {
              question: 'What distinguishes the weak-field Zeeman effect from the Paschen-Back regime?',
              answerOutline:
                'Weak field: spin-orbit dominates, j and m_j are good quantum numbers, splitting g_J μ_B B m_j. Strong field: Zeeman dominates, m_l and m_s are good, splitting μ_B B(m_l + 2m_s).',
            },
          ],
        },
        {
          slug: 'identical-particles-and-the-exclusion-principle',
          title: 'Identical particles, exchange symmetry and the exclusion principle',
          summary:
            'Why identical particles need symmetric or antisymmetric wavefunctions, the exclusion principle as a consequence, exchange forces, and the helium atom as the first two-electron system.',
          estimatedMinutes: 120,
          objectives: [
            'Explain why the exchange operator has eigenvalues $\\pm1$ and why nature uses only symmetric (bosons) and antisymmetric (fermions) states',
            'Construct Slater determinants and derive the Pauli exclusion principle',
            'Show how exchange symmetry of spatial and spin parts combine for two electrons (singlet-symmetric, triplet-antisymmetric)',
            'Compute the ground and first excited states of helium at the level of the exchange integral and explain why orthohelium lies below parahelium',
          ],
          concepts: [
            'Exchange operator $\\hat P_{12}$ and its eigenvalues',
            'Symmetrisation postulate; bosons and fermions; spin-statistics',
            'Slater determinants',
            'Pauli exclusion principle',
            'Exchange "force" and the effective attraction/repulsion',
            'Helium: direct and exchange integrals $J$ and $K$',
            'Parahelium and orthohelium',
            'Bose-Einstein and Fermi-Dirac statistics (link to thermodynamics)',
          ],
          explanation: `Two electrons are not merely similar: no measurement can tell them apart. So the state $\\psi(1, 2)$ and the exchanged $\\psi(2, 1)$ must represent the same physics, and the exchange operator $\\hat P_{12}$, which commutes with any Hamiltonian of identical particles, can be diagonalised along with it. Since $\\hat P_{12}^2 = 1$ its eigenvalues are $\\pm1$: wavefunctions are **symmetric** or **antisymmetric** under exchange. Nature's rule, the **symmetrisation postulate**, is that integer-spin particles (bosons: photons, $^4$He, pions) are always symmetric and half-integer-spin particles (fermions: electrons, protons, neutrons, $^3$He) always antisymmetric. The connection to spin is a theorem of relativistic quantum field theory; in nonrelativistic QM it is a postulate, confirmed everywhere.

For $N$ fermions in single-particle states $\\phi_a, \\phi_b, \\dots$ the antisymmetric combination is the **Slater determinant**, which vanishes if any two of the states coincide: that is the **Pauli exclusion principle**, and it is the reason atoms have shells, metals conduct, white dwarfs resist collapse and chemistry exists. For two electrons the total wavefunction is $\\psi_{space}\\chi_{spin}$, and antisymmetry can be carried by either factor: a symmetric spatial state must pair with the antisymmetric **singlet**, an antisymmetric spatial state with the symmetric **triplet**. In an antisymmetric spatial state the electrons cannot be at the same point, which reduces their Coulomb repulsion; in a symmetric one they bunch. This **exchange interaction** is not a new force but it acts like one, and it is the origin of ferromagnetism and of Hund's first rule.

**Helium** shows all of this. With two electrons in $1s$ the spatial part is symmetric, so the ground state is a singlet (parahelium), and first-order perturbation theory in the electron repulsion gives $E \\approx -108.8 + 34 = -74.8$ eV against the measured $-79.0$ eV (module 6 improves this variationally). For the configuration $1s2s$ the spatial part can be either $\\phi_{1s}(1)\\phi_{2s}(2) \\pm \\phi_{1s}(2)\\phi_{2s}(1)$, with energies $E_0 + J \\pm K$, where $J$ is the direct Coulomb integral and $K$ the **exchange integral**. The triplet (orthohelium, minus sign) lies 0.8 eV *below* the singlet, with no spin-dependent force anywhere in the Hamiltonian: pure exchange symmetry.

Read Zwiebach 8.06 lectures 6-7 and Tong 4.4 (or Topics in QM, "Atoms"); Feynman III-4 for the physical picture of bosons and fermions; and link back to the quantum statistics module of the thermodynamics subject.`,
          resources: [
            { ...feynman3(4, 'Identical Particles'), primary: true },
            { ...R.mit806, note: 'Lectures 6-7: identical particles, exchange, helium.' },
            { ...R.tongTopics, note: 'Chapter "Atoms", section on helium and the exchange interaction.' },
            { ...R.griffiths, note: 'Chapter 5 (Identical Particles). Free alternative: Tong and Feynman.' },
          ],
          exercises: [
            {
              slug: 'exchange-symmetry-two-particles',
              title: 'Two particles in a box: bosons, fermions, distinguishable',
              prompt:
                'Two non-interacting particles in a 1D infinite well occupy states $n = 1$ and $n = 2$. Write the spatial wavefunctions for distinguishable particles, identical bosons and identical spin-polarised fermions; compute $\\langle(x_1 - x_2)^2\\rangle$ in each case (expect fermions furthest apart, bosons closest) and plot the joint density $|\\psi(x_1, x_2)|^2$ for each. Now add a weak contact interaction $g\\delta(x_1 - x_2)$ and compute its first-order energy shift in each case.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'slater-determinants',
              title: 'Slater determinants and the exclusion principle',
              prompt:
                'Write the Slater determinant for three electrons in spin-orbitals $\\phi_a\\alpha, \\phi_a\\beta, \\phi_b\\alpha$ and show it is antisymmetric under every pair exchange and vanishes if two spin-orbitals coincide. Show that for two electrons the determinant with $\\phi_a\\alpha, \\phi_a\\beta$ factorises into a symmetric spatial part times the singlet. Explain why no such factorisation exists in general for three or more electrons.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'helium-exchange-integral',
              title: 'Helium: direct and exchange integrals',
              prompt:
                'Using hydrogenic orbitals with $Z = 2$, compute the direct integral $J$ for the $1s^2$ configuration analytically (result $\\frac{5}{8}Z\\cdot 27.2$ eV $= 34$ eV) and hence the first-order ground-state energy. Then compute $J$ and $K$ for the $1s2s$ configuration numerically (6D integral reduced to radial integrals via the multipole expansion of $1/r_{12}$, or by Monte Carlo) and predict the singlet-triplet splitting $2K$; compare with the measured 0.80 eV.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the exchange operator have only the eigenvalues ±1, and which does nature use?',
              answerOutline:
                'P₁₂² = 1 so eigenvalues are ±1; bosons (integer spin) are symmetric (+1) and fermions (half-integer spin) antisymmetric (−1), by the spin-statistics theorem.',
            },
            {
              question: 'Why does orthohelium (triplet) lie below parahelium (singlet) for the same configuration?',
              answerOutline:
                'The triplet requires an antisymmetric spatial wavefunction, which vanishes when the electrons coincide, reducing Coulomb repulsion by the exchange energy 2K; no spin-dependent force is involved.',
            },
            {
              question: 'What is the Pauli exclusion principle a consequence of?',
              answerOutline:
                'Antisymmetry of the fermionic wavefunction: a Slater determinant with two identical spin-orbitals vanishes, so two fermions cannot occupy the same single-particle state.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/quantum-statistics/identical-particles-and-quantum-distributions'],
        },
        {
          slug: 'multi-electron-atoms-and-the-periodic-table',
          title: 'Multi-electron atoms and the periodic table',
          summary:
            'The central-field approximation, screening and the ordering of subshells, Hund\'s rules and spectroscopic term symbols, and how the periodic table follows from the exclusion principle and the Coulomb interaction.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the central-field (Hartree) approximation and why screening lifts the $l$ degeneracy to give the aufbau ordering',
            'Determine ground-state configurations and term symbols $^{2S+1}L_J$ using Hund\'s rules',
            'Interpret trends in ionisation energy, atomic radius and chemical behaviour across the periodic table',
            'Describe LS and jj coupling and where each applies',
          ],
          concepts: [
            'Central-field approximation and self-consistent (Hartree-Fock) potentials',
            'Screening and effective nuclear charge',
            'Aufbau ordering and its exceptions',
            'Term symbols $^{2S+1}L_J$',
            'Hund\'s rules',
            'LS vs jj coupling',
            'Ionisation energies and periodicity',
            'X-ray spectra and Moseley\'s law',
          ],
          explanation: `An atom with $Z$ electrons has a Hamiltonian with $Z$ kinetic terms, $Z$ nuclear attractions and $Z(Z-1)/2$ electron repulsions; it cannot be solved exactly beyond hydrogen. The **central-field approximation** replaces the repulsions by an average spherically symmetric potential $U(r)$ felt by each electron, so that each electron has its own orbital with quantum numbers $n, l, m_l, m_s$, found self-consistently (Hartree, and with exchange, Hartree-Fock). The effective potential goes from $-Ze^2/4\\pi\\epsilon_0r$ near the nucleus to $-e^2/4\\pi\\epsilon_0r$ far away: inner electrons **screen** the nuclear charge. Low-$l$ orbitals penetrate closer to the nucleus, see less screening and are bound more tightly, so the hydrogen degeneracy in $l$ is lifted and the subshells fill in the **aufbau** order $1s, 2s, 2p, 3s, 3p, 4s, 3d, \\dots$ with a few famous exceptions (Cr, Cu). The periodic table is this ordering plus the exclusion principle: each subshell holds $2(2l+1)$ electrons, and chemistry is set by the outermost ones.

Within a configuration the residual electron-electron interaction and spin-orbit coupling split the levels into **terms** labelled $^{2S+1}L_J$ (total spin $S$, total orbital $L$, total $J$), in the **LS coupling** scheme appropriate for light atoms. **Hund's rules** pick the ground term: maximise $S$ (exchange energy, as in helium), then maximise $L$, then take $J = |L - S|$ for a less-than-half-filled shell and $J = L + S$ for more than half. Carbon ($2p^2$) is $^3P_0$; nitrogen $^4S_{3/2}$; oxygen $^3P_2$. For heavy atoms spin-orbit coupling dominates the residual Coulomb term and each electron's $j$ couples first: **jj coupling**.

Trends follow. Ionisation energy rises across a period (increasing $Z_{eff}$) and drops at the start of each new shell; atomic radius does the opposite; noble gases have closed shells and alkalis have one loosely bound $s$ electron. Inner-shell holes produce X-rays at energies given by **Moseley's law** $\\propto (Z - \\sigma)^2$, which is how the elements were ordered correctly in 1913.

Read Zwiebach 8.06 lecture 8 and Feynman III-19 (the periodic table from quantum mechanics); use the NIST database for term symbols and ionisation energies. The exercises include a Hartree-style self-consistent calculation, which is a real taste of computational quantum chemistry.`,
          resources: [
            { ...feynman3(19, 'The Hydrogen Atom and the Periodic Table'), primary: true },
            { ...R.mit806, note: 'Lecture 8 on multi-electron atoms and the periodic table.' },
            { ...R.tongTopics, note: 'Chapter "Atoms": the self-consistent field, Hund\'s rules and term symbols.' },
            {
              title: 'NIST Atomic Spectra Database — levels, term symbols and ionisation energies',
              url: 'https://www.nist.gov/pml/atomic-spectra-database',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
            },
          ],
          exercises: [
            {
              slug: 'term-symbols-hund',
              title: 'Term symbols from Hund\'s rules',
              prompt:
                'For the ground configurations of B, C, N, O, F, Ti, Fe and Eu determine all allowed LS terms (for the $p^2$ and $d^2$ cases enumerate microstates and verify the term count), apply Hund\'s rules to find the ground term and $J$, and check against NIST. Explain why $p^2$ and $p^4$ have the same terms but opposite $J$ ordering.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'hartree-self-consistent',
              title: 'A self-consistent field calculation for helium or neon',
              prompt:
                'Implement a Hartree calculation: start with hydrogenic orbitals, compute the spherically averaged electron density, solve Poisson\'s equation for the screening potential, solve the radial Schrödinger equation (your module 2 solver) in the resulting central potential, and iterate to self-consistency. For helium compare the total energy with the measured −79.0 eV; for neon compare the orbital energies (approximately the ionisation energies by Koopmans\' theorem) with NIST and show the 2s/2p splitting emerges from screening.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'periodic-trends-data',
              title: 'Periodic trends from data',
              prompt:
                'Download first ionisation energies for Z = 1 to 54 from NIST and plot them against Z. Identify the shell closures and the dips at the start of p subshells and at half-filled p subshells (B, O and their analogues), and explain each feature with screening and exchange. Fit $Z_{eff}$ for the alkali atoms from their ionisation energies using the hydrogenic formula and compare with Slater\'s rules.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the 4s subshell filled before 3d in potassium and calcium?',
              answerOutline:
                'The 4s orbital penetrates closer to the nucleus (lower l), is less screened and is bound slightly more tightly than 3d at Z ≈ 19-20; the ordering reverses once 3d fills and becomes more tightly bound.',
            },
            {
              question: 'What physics underlies Hund\'s first rule?',
              answerOutline:
                'Maximising S forces a spatially antisymmetric wavefunction, which keeps electrons apart and lowers Coulomb repulsion (exchange energy), as in orthohelium.',
            },
            {
              question: 'What is the meaning of the term symbol ³P₂?',
              answerOutline:
                'Total spin S = 1 (multiplicity 2S+1 = 3), total orbital L = 1 (P), total angular momentum J = 2.',
            },
          ],
        },
      ],
    },
    {
      slug: 'approximation-methods',
      title: 'Approximation Methods',
      description:
        'The methods that make quantum mechanics usable beyond the exactly solvable cases: time-independent perturbation theory, the variational principle, WKB, time-dependent perturbation theory with Fermi\'s golden rule, and scattering theory.',
      lessons: [
        {
          slug: 'time-independent-perturbation-theory',
          title: 'Time-independent perturbation theory',
          summary:
            'Systematic expansion of energies and states in a small parameter, the non-degenerate formulas to second order, the degenerate case with its secular equation, and the Stark effect as the classic example.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the first- and second-order energy corrections and the first-order state correction for non-degenerate levels',
            'Explain why second-order corrections push levels apart (level repulsion) and when the series converges',
            'Handle degenerate levels by diagonalising the perturbation in the degenerate subspace',
            'Compute the quadratic Stark effect of the hydrogen ground state and the linear Stark effect of $n = 2$',
          ],
          concepts: [
            'Perturbative expansion $\\hat H = \\hat H_0 + \\lambda\\hat H\'$',
            'First order: $E_n^{(1)} = \\langle n|\\hat H\'|n\\rangle$',
            'Second order: $E_n^{(2)} = \\sum_{m\\ne n}|\\langle m|\\hat H\'|n\\rangle|^2/(E_n - E_m)$',
            'Level repulsion and the ground-state bound',
            'Degenerate perturbation theory and good quantum numbers',
            'Stark effect: quadratic (polarisability) and linear',
            'Anharmonic oscillator and asymptotic series',
            'Validity criterion $|\\langle m|\\hat H\'|n\\rangle| \\ll |E_n - E_m|$',
          ],
          explanation: `Almost no Hamiltonian is exactly solvable, but many are close to one that is. Write $\\hat H = \\hat H_0 + \\lambda\\hat H'$ with known $\\hat H_0|n\\rangle = E_n|n\\rangle$, expand $E = E_n + \\lambda E^{(1)} + \\lambda^2E^{(2)} + \\dots$ and the state likewise, and match powers of $\\lambda$. The results for a non-degenerate level are
$$E_n^{(1)} = \\langle n|\\hat H'|n\\rangle,\\qquad |n^{(1)}\\rangle = \\sum_{m\\ne n}\\frac{\\langle m|\\hat H'|n\\rangle}{E_n - E_m}|m\\rangle,\\qquad E_n^{(2)} = \\sum_{m\\ne n}\\frac{|\\langle m|\\hat H'|n\\rangle|^2}{E_n - E_m}.$$
First order is just the expectation value of the perturbation, which is what you used for fine structure. Second order mixes in other states, weighted by the coupling over the energy gap: **level repulsion**, since every term pushes $E_n$ away from $E_m$, and in particular the second-order correction to the ground state is always negative. The expansion is useful when $|\\langle m|\\hat H'|n\\rangle| \\ll |E_n - E_m|$; when a gap is zero the formula diverges, which is the signal for degenerate theory.

**Degenerate** levels are handled by noticing that any combination of degenerate states is an eigenstate of $\\hat H_0$, so the perturbation gets to choose the right combinations: diagonalise the matrix $\\langle n_i|\\hat H'|n_j\\rangle$ within the degenerate subspace. Its eigenvalues are the first-order shifts and its eigenvectors the "good" zeroth-order states. Often symmetry tells you the good states in advance: if some operator commutes with both $\\hat H_0$ and $\\hat H'$, its eigenstates diagonalise the perturbation.

The **Stark effect** illustrates both cases. For the hydrogen ground state in a field $\\mathcal E$, $\\hat H' = e\\mathcal Ez$ has zero first-order shift (parity) and a negative second-order shift $-\\frac{1}{2}\\alpha_{pol}\\mathcal E^2$ with polarisability $\\alpha_{pol} = \\frac{9}{2}(4\\pi\\epsilon_0)a_0^3$ (the exact value; a sum over discrete states alone gives about 80% of it, because the continuum contributes). For $n = 2$ the fourfold degeneracy allows a *linear* shift $\\pm3ea_0\\mathcal E$ for the combinations $(|2s\\rangle \\pm |2p_0\\rangle)/\\sqrt2$, which have permanent dipole moments, while $|2p_{\\pm1}\\rangle$ are unshifted.

Perturbation series are usually asymptotic rather than convergent; for the anharmonic oscillator $\\lambda x^4$ the coefficients grow factorially, and you will see this numerically by comparing with your exact diagonalisation from module 2. Read Zwiebach 8.06 lectures 1-2 and Griffiths chapter 7, and Tong Topics in QM chapter 1.`,
          resources: [
            { ...R.mit806, note: 'Lectures 1-2 (and the 8.06 lecture notes chapter 1): non-degenerate and degenerate perturbation theory, Stark effect.', primary: true },
            { ...R.tongTopics, note: 'Chapter 1: Perturbation theory, with the Stark effect and the hydrogen polarisability.' },
            { ...R.griffiths, note: 'Chapter 7 (3rd ed.). Free alternative: Tong Topics chapter 1.' },
          ],
          exercises: [
            {
              slug: 'perturbation-derivation',
              title: 'Derive the perturbation formulas',
              prompt:
                'Derive the first- and second-order energy and first-order state corrections, including the normalisation choice $\\langle n|n^{(1)}\\rangle = 0$. Then derive the third-order energy. Apply to the oscillator with $\\hat H\' = \\lambda\\hat x^4$: compute $E_n^{(1)}$ and $E_0^{(2)}$ using ladder-operator matrix elements, and compare the partial sums for $E_0$ with your exact diagonalisation at $\\lambda = 0.01, 0.1, 0.5$ (units $\\hbar = m = \\omega = 1$). Comment on the asymptotic nature of the series.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'stark-effect',
              title: 'Stark effect in hydrogen',
              prompt:
                'Compute the $4\\times4$ matrix of $e\\mathcal Ez$ in the $n = 2$ subspace (only $\\langle2s|z|2p_0\\rangle = -3a_0$ is nonzero; derive it), diagonalise, and obtain the linear Stark shifts and good states. For the ground state compute the second-order shift by summing over $np_0$ states up to $n = 20$ numerically (radial integrals via scipy) and compare with the exact polarisability $4.5a_0^3$; explain the shortfall. Estimate the field at which perturbation theory fails for $n = 2$.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'degenerate-pt-symmetry',
              title: 'Degenerate perturbation theory with symmetry',
              prompt:
                'A particle in a 2D square box has a degenerate pair $\\psi_{12}, \\psi_{21}$. For perturbations (a) $\\lambda xy$ and (b) $\\lambda\\delta(x - a/4)\\delta(y - a/4)$, find the good zeroth-order states and the first-order splittings. In case (a) identify the symmetry (reflection in the diagonal) that determines the good states without computation. Verify with a 2D finite-difference diagonalisation.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the second-order correction to the ground-state energy always negative?',
              answerOutline:
                'Every term |⟨m|H′|0⟩|²/(E₀ − E_m) has a negative denominator since E₀ is the lowest level.',
            },
            {
              question: 'What goes wrong when applying the non-degenerate formula to a degenerate level, and what is the fix?',
              answerOutline:
                'Energy denominators vanish. Diagonalise H′ within the degenerate subspace; its eigenvectors are the correct zeroth-order states and eigenvalues the first-order shifts.',
            },
            {
              question: 'Why does the hydrogen ground state have no linear Stark effect but the n = 2 level does?',
              answerOutline:
                'The ground state has definite parity so ⟨1s|z|1s⟩ = 0; the n = 2 level mixes 2s and 2p₀ of opposite parity, producing states with permanent dipole moments.',
            },
          ],
        },
        {
          slug: 'the-variational-method',
          title: 'The variational method',
          summary:
            'An upper bound on the ground-state energy from any trial wavefunction, how to choose and optimise trial functions, the helium ground state, and the Rayleigh-Ritz method that underlies quantum chemistry.',
          estimatedMinutes: 100,
          objectives: [
            'Prove the variational theorem $\\langle\\psi|\\hat H|\\psi\\rangle/\\langle\\psi|\\psi\\rangle \\ge E_0$',
            'Optimise simple trial functions for the oscillator, the hydrogen atom and the delta potential, and judge the quality of the bound',
            'Compute the helium ground state with an effective-charge trial function and obtain $-77.5$ eV',
            'Apply the linear (Rayleigh-Ritz) variational method and explain its connection to matrix diagonalisation',
          ],
          concepts: [
            'Variational theorem and its proof',
            'Trial wavefunctions and variational parameters',
            'Quality of bounds; error in energy vs error in wavefunction',
            'Helium with effective charge $Z_{eff} = 27/16$',
            'Rayleigh-Ritz (linear variational) method',
            'Excited states via orthogonality constraints',
            'Hartree-Fock as a variational method',
            'Hydrogen molecular ion (LCAO)',
          ],
          explanation: `Expand any normalised trial state in the exact eigenbasis, $|\\psi\\rangle = \\sum c_n|n\\rangle$. Then $\\langle\\hat H\\rangle = \\sum|c_n|^2E_n \\ge E_0\\sum|c_n|^2 = E_0$. That is the entire proof of the **variational theorem**: the expectation value of the Hamiltonian in *any* state is an upper bound on the ground-state energy. So guess a wavefunction with adjustable parameters, compute $\\langle\\hat H\\rangle$, and minimise. The result is always above $E_0$, often remarkably close, and the better your physical intuition about the shape of the ground state, the better the bound. Errors are second order: a trial function that is off by $\\epsilon$ in overlap gives an energy off by $\\epsilon^2$, which is why crude guesses do well for energies and badly for other observables.

Three examples calibrate the method. A Gaussian trial function for the oscillator gives the exact answer (because it is the exact state); for hydrogen it gives $-11.5$ eV instead of $-13.6$ (the cusp at the origin is missed); an exponential $e^{-r/a}$ with $a$ free gives hydrogen exactly. For **helium** take a product of hydrogenic $1s$ orbitals with the nuclear charge $Z$ replaced by a variational $Z_{eff}$: minimising gives $Z_{eff} = 27/16 = 1.69$, each electron partly screening the other, and $E = -77.5$ eV against the measured $-79.0$, far better than first-order perturbation theory's $-74.8$. Adding more parameters (Hylleraas, 1929, with explicit $r_{12}$ dependence) reaches $-79.0$ to six figures; modern calculations give 40 digits.

The **linear variational method** takes the trial state as a combination $\\sum c_i|\\phi_i\\rangle$ of fixed basis functions and minimises over the $c_i$. The result is the generalised eigenvalue problem $\\mathbf H\\mathbf c = E\\mathbf S\\mathbf c$ with $H_{ij} = \\langle\\phi_i|\\hat H|\\phi_j\\rangle$ and overlap matrix $S_{ij}$; its lowest eigenvalue is the bound, and (by the Hylleraas-Undheim theorem) its higher eigenvalues bound the excited states. Your module 2 diagonalisations were exactly this with a grid basis; quantum chemistry does it with Gaussian basis sets, and Hartree-Fock is the variational method over Slater determinants. For H$_2^+$ the two-atomic-orbital basis gives the bonding and antibonding states and a crude but qualitatively correct binding curve, the ancestor of every molecular-orbital diagram.

Read Zwiebach 8.06 lecture notes on the variational principle, Tong Topics chapter on the variational method, and Griffiths chapter 8.`,
          resources: [
            { ...R.mit806, note: 'Lecture notes and lectures on the variational principle and helium.', primary: true },
            { ...R.tongTopics, note: 'Chapter 1 section on the variational method and the chapter on atoms for helium.' },
            { ...R.griffiths, note: 'Chapter 8 (3rd ed.): the variational principle, helium, H₂⁺. Free alternative: Tong Topics.' },
          ],
          exercises: [
            {
              slug: 'variational-trial-functions',
              title: 'Trial functions for standard problems',
              prompt:
                'Compute the variational bound for: (a) hydrogen with a Gaussian $e^{-br^2}$ (expect $-11.5$ eV); (b) the delta potential with a Gaussian (compare with the exact $-m\\alpha^2/2\\hbar^2$); (c) the quartic oscillator $\\hat p^2/2 + x^4$ with a Gaussian of variable width (compare with the numerically exact 0.668); (d) the linear potential $|x|$ (Airy function problem) with a Gaussian and with $e^{-b|x|}$. For each state the optimised parameter, the bound, the exact energy and the fractional error.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'helium-variational',
              title: 'Helium with effective charge',
              prompt:
                'With the trial function $\\psi = \\phi_{1s}^{Z_{eff}}(r_1)\\phi_{1s}^{Z_{eff}}(r_2)$ compute $\\langle\\hat H\\rangle = [Z_{eff}^2 - 2ZZ_{eff} + \\tfrac{5}{8}Z_{eff}]\\times 27.2$ eV, derive $Z_{eff} = Z - 5/16$ and $E = -77.5$ eV. Then improve it numerically: use a trial function $e^{-a(r_1 + r_2)}(1 + cr_{12})$ and minimise over $(a, c)$ with Monte Carlo integration of $\\langle\\hat H\\rangle$ (variational Monte Carlo). Report the best energy and compare with $-79.0$ eV.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'rayleigh-ritz-and-h2plus',
              title: 'Rayleigh-Ritz and the H₂⁺ molecule',
              prompt:
                'Derive the generalised eigenvalue problem of the linear variational method. Apply it to H$_2^+$ with the two-orbital basis $\\phi_A, \\phi_B$ (1s orbitals on each proton): compute the overlap, Coulomb and exchange integrals as functions of internuclear distance $R$ (closed forms exist; or integrate numerically), plot the bonding and antibonding energies plus the proton repulsion versus $R$, and find the equilibrium bond length and dissociation energy (expect 1.32 Å and 1.76 eV versus the exact 1.06 Å and 2.79 eV). Explain why the simple LCAO underbinds.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the variational method give an upper bound rather than an estimate of unknown sign?',
              answerOutline:
                '⟨H⟩ = Σ|c_n|²E_n is a weighted average of eigenvalues, each ≥ E₀.',
            },
            {
              question: 'Why is the variational energy more accurate than the variational wavefunction?',
              answerOutline:
                'The energy is stationary at the exact state, so first-order errors in ψ produce only second-order errors in E; other observables are not stationary.',
            },
            {
              question: 'What is Z_eff = 27/16 for helium telling you physically?',
              answerOutline:
                'Each electron partially screens the nucleus from the other, so each sees an effective charge less than 2 (by 5/16); the orbitals expand compared to He⁺.',
            },
          ],
        },
        {
          slug: 'the-wkb-approximation',
          title: 'The WKB approximation',
          summary:
            'The semiclassical approximation for slowly varying potentials: the WKB wavefunction, connection formulas at turning points, the Bohr-Sommerfeld quantisation rule, and tunnelling rates through arbitrary barriers.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the WKB wavefunction $\\psi \\approx \\frac{C}{\\sqrt{p(x)}}e^{\\pm\\frac{i}{\\hbar}\\int p\\,dx}$ and state its validity condition',
            'Explain the role of turning points and the connection formulas (via Airy functions)',
            'Derive the Bohr-Sommerfeld rule $\\oint p\\,dx = (n + \\tfrac{1}{2})h$ and apply it to the oscillator, the linear potential and hydrogen',
            'Compute tunnelling probabilities $T \\approx e^{-2\\int\\kappa\\,dx}$ for smooth barriers and apply to field emission',
          ],
          concepts: [
            'Semiclassical limit $\\hbar \\to 0$; local wavelength',
            'WKB wavefunction and $1/\\sqrt p$ amplitude',
            'Validity: $|d\\lambda/dx| \\ll 1$',
            'Classical turning points and Airy functions',
            'Connection formulas',
            'Bohr-Sommerfeld quantisation with Maslov index',
            'WKB tunnelling exponent',
            'Classical probability density $\\propto 1/p$',
          ],
          explanation: `When the potential varies slowly on the scale of the local de Broglie wavelength, the wavefunction should look locally like a plane wave with slowly changing wavelength and amplitude. Write $\\psi = e^{iS(x)/\\hbar}$, expand $S = S_0 + \\hbar S_1 + \\dots$, and the Schrödinger equation gives at leading order $S_0' = \\pm p(x)$ with $p = \\sqrt{2m(E - V)}$, and at next order the amplitude $1/\\sqrt{p}$:
$$\\psi_{WKB}(x) \\approx \\frac{C_\\pm}{\\sqrt{p(x)}}\\exp\\left(\\pm\\frac{i}{\\hbar}\\int^xp(x')dx'\\right).$$
The $1/\\sqrt p$ makes $|\\psi|^2 \\propto 1/v$: the particle is most likely where it moves slowest, which is the classical probability density. In forbidden regions $p \\to i\\hbar\\kappa$ and the exponentials become real, growing or decaying. The approximation holds when $|d\\lambda/dx| \\ll 1$ (i.e. $\\hbar|p'| \\ll p^2$), which always fails at **classical turning points** where $p = 0$.

Near a turning point the potential is approximately linear and the exact solution is an **Airy function**; matching its asymptotics on both sides gives the **connection formulas** that join the oscillatory and exponential WKB solutions, with a phase of $\\pi/4$ at each turning point. For a bound state between two turning points, demanding a single-valued solution gives the **Bohr-Sommerfeld rule**
$$\\oint p\\,dx = 2\\int_{x_1}^{x_2}p\\,dx = \\left(n + \\tfrac{1}{2}\\right)h,\\qquad n = 0, 1, 2, \\dots$$
The $1/2$ (the Maslov index contribution) is what Bohr and Sommerfeld lacked. The rule is exact for the oscillator, gives the hydrogen energies exactly if the Langer correction $l(l+1) \\to (l + 1/2)^2$ is used, and is excellent for high $n$ in any potential: counting the area in phase space in units of $h$ is the deepest statement of the correspondence principle and the origin of the "one state per $h$ per degree of freedom" rule used in statistical mechanics.

For a smooth barrier the same analysis gives the tunnelling probability $T \\approx \\exp\\left(-\\frac{2}{\\hbar}\\int_{x_1}^{x_2}|p|\\,dx\\right)$, the result quoted for alpha decay in module 2 and used for field emission (Fowler-Nordheim), for the STM, and for chemical reaction rates at low temperature.

Read Zwiebach 8.06 lectures on WKB (notes chapter 3), Griffiths chapter 9 and Tong Topics chapter on WKB; the exercises test Bohr-Sommerfeld numerically against your exact diagonalisation.`,
          resources: [
            { ...R.mit806, note: 'Lectures and notes on the WKB approximation, connection formulas and tunnelling.', primary: true },
            { ...R.griffiths, note: 'Chapter 9 (3rd ed.). Free alternative: Tong Topics in QM chapter on WKB.' },
            { ...R.tongTopics, note: 'Chapter on the WKB approximation.' },
          ],
          exercises: [
            {
              slug: 'bohr-sommerfeld-tests',
              title: 'Bohr-Sommerfeld against exact spectra',
              prompt:
                'Implement the Bohr-Sommerfeld rule numerically (find turning points, integrate $p$ with quadrature, solve for $E_n$ by root finding). Apply to the oscillator (exact), the quartic oscillator $x^4$, the linear potential $|x|$ and the Morse potential, and compare with exact diagonalisation for $n = 0$ to 10. Plot the fractional error versus $n$ and show it decreases. Then drop the 1/2 and show how much worse the results are at low $n$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'wkb-derivation-and-airy',
              title: 'WKB derivation and the connection formula',
              prompt:
                'Derive the WKB wavefunction to order $\\hbar$ and the validity condition. Solve the linear-potential Schrödinger equation exactly in terms of the Airy function, write its asymptotic forms on both sides of the turning point, and show how they match onto the WKB solutions with a phase $\\pi/4$. Use this to derive the Bohr-Sommerfeld rule including the 1/2.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'field-emission',
              title: 'Field emission (Fowler-Nordheim)',
              prompt:
                'Electrons in a metal at the Fermi level face a barrier $V(x) = W - e\\mathcal Ex$ at the surface (work function $W = 4.5$ eV for tungsten). Compute the WKB tunnelling exponent, show $T \\propto \\exp(-\\frac{4\\sqrt{2m}W^{3/2}}{3\\hbar e\\mathcal E})$, and estimate the field at which emission becomes appreciable (~$10^9$ V/m). Explain why a sharp tip enhances the field and how this makes field-emission electron sources and the field-ion microscope work.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the physical meaning of the 1/√p factor in the WKB wavefunction?',
              answerOutline:
                '|ψ|² ∝ 1/p ∝ 1/v: probability density is proportional to the time a classical particle spends in dx, so WKB reproduces the classical distribution.',
            },
            {
              question: 'Why does WKB fail at turning points and how is that handled?',
              answerOutline:
                'p → 0 so the local wavelength diverges and the slow-variation condition fails; the region is treated exactly with Airy functions, whose asymptotics provide connection formulas.',
            },
            {
              question: 'Where does the 1/2 in the Bohr-Sommerfeld rule come from?',
              answerOutline:
                'The π/4 phase loss at each of the two turning points (from the Airy connection), totalling π/2, equivalent to n + 1/2.',
            },
          ],
        },
        {
          slug: 'time-dependent-perturbation-and-fermis-golden-rule',
          title: 'Time-dependent perturbation theory and Fermi\'s golden rule',
          summary:
            'Transitions driven by time-dependent perturbations: first-order amplitudes, harmonic perturbations and resonance, transitions to a continuum with Fermi\'s golden rule, and the electric dipole selection rules and spontaneous emission.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the first-order transition amplitude $c_f(t) = -\\frac{i}{\\hbar}\\int_0^t\\langle f|\\hat H\'(t\')|i\\rangle e^{i\\omega_{fi}t\'}dt\'$ in the interaction picture',
            'Analyse a harmonic perturbation and show the transition probability peaks at resonance with width $\\sim\\hbar/t$',
            'Derive Fermi\'s golden rule $\\Gamma = \\frac{2\\pi}{\\hbar}|\\langle f|\\hat H\'|i\\rangle|^2\\rho(E_f)$ for transitions to a continuum',
            'Derive the electric dipole selection rules ($\\Delta l = \\pm1$, $\\Delta m = 0, \\pm1$) and compute the spontaneous emission rate of hydrogen $2p \\to 1s$',
          ],
          concepts: [
            'Interaction picture',
            'First-order transition amplitude',
            'Harmonic perturbation and the sinc² resonance function',
            'Transitions to a continuum; density of states',
            'Fermi\'s golden rule',
            'Electric dipole approximation and selection rules',
            'Absorption, stimulated and spontaneous emission; Einstein coefficients',
            'Lifetimes and natural line width',
          ],
          explanation: `Now let the perturbation depend on time: $\\hat H = \\hat H_0 + \\hat H'(t)$. Expand $|\\psi(t)\\rangle = \\sum_nc_n(t)e^{-iE_nt/\\hbar}|n\\rangle$; the Schrödinger equation gives exact coupled equations $i\\hbar\\dot c_f = \\sum_n\\langle f|\\hat H'(t)|n\\rangle e^{i\\omega_{fn}t}c_n$ with $\\omega_{fn} = (E_f - E_n)/\\hbar$. Starting in $|i\\rangle$ and keeping only the first order in $\\hat H'$,
$$c_f^{(1)}(t) = -\\frac{i}{\\hbar}\\int_0^t\\langle f|\\hat H'(t')|i\\rangle e^{i\\omega_{fi}t'}dt' .$$
The transition probability is a Fourier transform of the perturbation evaluated at the Bohr frequency: a perturbation can only cause a transition if it contains that frequency.

For a **harmonic perturbation** $\\hat H' = \\hat V\\cos\\omega t$ the integral gives $P_{i\\to f} = \\frac{|V_{fi}|^2}{\\hbar^2}\\frac{\\sin^2[(\\omega_{fi} - \\omega)t/2]}{(\\omega_{fi} - \\omega)^2}$: a sharp peak at resonance of height $\\propto t^2$ and width $\\propto 1/t$ (an energy-time uncertainty statement), and the two-level Rabi result of module 3 at short times. For transitions into a **continuum** of final states with density $\\rho(E)$, integrate over the peak (which becomes $2\\pi t\\,\\delta(\\omega_{fi} - \\omega)/\\hbar$ for long times) and the probability grows linearly with time, giving a constant rate:
$$\\Gamma_{i\\to f} = \\frac{2\\pi}{\\hbar}|\\langle f|\\hat V|i\\rangle|^2\\rho(E_f).$$
This is **Fermi's golden rule** (derived by Dirac). It governs every decay and scattering rate in atomic, nuclear and condensed-matter physics: the rate is coupling squared times how many states are available.

For an atom in light, $\\hat H' = -e\\mathbf{\\mathcal E}\\cdot\\mathbf r\\cos\\omega t$ in the **dipole approximation** (wavelength $\\gg$ atom). The matrix element $\\langle f|\\mathbf r|i\\rangle$ vanishes unless $\\Delta l = \\pm1$ and $\\Delta m = 0, \\pm1$ (parity and the vector nature of $\\mathbf r$, via the Wigner-Eckart theorem), which are the **selection rules** behind every spectrum. Quantising the field adds spontaneous emission, which Einstein had deduced thermodynamically: the rate is $A = \\frac{\\omega^3|\\langle f|\\mathbf d|i\\rangle|^2}{3\\pi\\epsilon_0\\hbar c^3}$, giving $1.6$ ns for hydrogen $2p \\to 1s$, and the natural line width $\\Gamma = \\hbar A$ of module 3.

Read Zwiebach 8.06 lecture notes chapter on time-dependent perturbation theory, Griffiths chapter 11 and Tong Topics chapter; the exercises verify the golden rule numerically with a discretised continuum.`,
          resources: [
            { ...R.mit806, note: 'Lecture notes and lectures on time-dependent perturbation theory, Fermi\'s golden rule, atoms and light.', primary: true },
            { ...R.griffiths, note: 'Chapter 11 (3rd ed.): time-dependent perturbation theory, emission and absorption. Free alternative: Tong Topics.' },
            { ...R.tongTopics, note: 'Chapter on time-dependent perturbation theory and the interaction of atoms with light.' },
            { ...R.qutip, note: 'Use sesolve to simulate the exact dynamics and compare with first-order theory.' },
          ],
          exercises: [
            {
              slug: 'first-order-amplitude-tests',
              title: 'First-order amplitudes versus exact dynamics',
              prompt:
                'Derive $c_f^{(1)}(t)$ and the harmonic-perturbation probability formula. Then, in QuTiP, take a 10-level ladder with equal spacing and a perturbation $V\\cos\\omega t$ coupling neighbours; starting from the ground state, compare the exact populations with first-order theory for weak and strong $V$ and for $\\omega$ on and off resonance. Plot the resonance curve $P(\\omega)$ at fixed $t$ and verify its width scales as $1/t$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'golden-rule-numerical',
              title: 'Fermi\'s golden rule with a discretised continuum',
              prompt:
                'Model a discrete state coupled with equal matrix elements $V$ to $N = 400$ continuum states uniformly spaced by $\\Delta E$ around its energy. Solve the exact dynamics numerically and show the discrete-state population decays as $e^{-\\Gamma t}$ with $\\Gamma = 2\\pi V^2/\\hbar\\Delta E$ for times $t \\ll \\hbar/\\Delta E$ (after which recurrences appear). Vary $N$ and $\\Delta E$ at fixed density of states and confirm the rate is unchanged.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'selection-rules-and-lifetime',
              title: 'Selection rules and the 2p lifetime',
              prompt:
                'Derive the dipole selection rules $\\Delta m = 0, \\pm1$ from $[\\hat L_z, z] = 0$ and $[\\hat L_z, x \\pm iy] = \\pm\\hbar(x \\pm iy)$, and $\\Delta l = \\pm1$ from parity plus the triangle rule. Compute $\\langle1s|\\mathbf r|2p_m\\rangle$ (radial integral $= \\frac{2^7\\sqrt2}{3^5}a_0$ times angular factors), the spontaneous emission rate and the 2p lifetime (1.6 ns). Explain why 2s cannot decay by electric dipole radiation and estimate its lifetime (two-photon decay, 0.12 s) in words.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What determines whether a time-dependent perturbation can cause a transition between two levels?',
              answerOutline:
                'Its Fourier component at the Bohr frequency ω_fi must be nonzero, and the matrix element ⟨f|V|i⟩ must be nonzero (selection rules).',
            },
            {
              question: 'Why does a transition to a continuum give a constant rate while a transition to a discrete level gives oscillations?',
              answerOutline:
                'Summing the sinc² function over a dense set of final energies yields a probability linear in t (δ-function limit); a single final level gives coherent oscillation (Rabi).',
            },
            {
              question: 'State Fermi\'s golden rule and its two ingredients.',
              answerOutline:
                'Γ = (2π/ħ)|⟨f|V|i⟩|²ρ(E_f): the squared coupling matrix element and the density of final states at the energy conserving point.',
            },
          ],
        },
        {
          slug: 'scattering-theory',
          title: 'Scattering theory: cross sections, Born approximation and partial waves',
          summary:
            'How quantum mechanics describes collisions: the scattering amplitude and differential cross section, the Born approximation for weak potentials, partial-wave analysis with phase shifts for spherically symmetric ones, and resonances.',
          estimatedMinutes: 120,
          objectives: [
            'Define the scattering amplitude $f(\\theta, \\phi)$ via the asymptotic wavefunction and relate it to $d\\sigma/d\\Omega$',
            'Derive the Born approximation $f = -\\frac{m}{2\\pi\\hbar^2}\\int e^{-i\\mathbf q\\cdot\\mathbf r}V(\\mathbf r)d^3r$ and apply it to the Yukawa and screened Coulomb potentials',
            'Carry out partial-wave analysis: phase shifts, $\\sigma = \\frac{4\\pi}{k^2}\\sum(2l+1)\\sin^2\\delta_l$, the optical theorem',
            'Compute phase shifts for a hard sphere and a square well, and explain low-energy scattering (scattering length) and resonances',
          ],
          concepts: [
            'Scattering amplitude and differential cross section',
            'Lippmann-Schwinger equation and the Green\'s function',
            'Born approximation and momentum transfer $\\mathbf q$',
            'Rutherford formula from the screened Coulomb potential',
            'Partial waves and phase shifts $\\delta_l$',
            'Optical theorem',
            'Scattering length and low-energy limit',
            'Resonances and the Breit-Wigner form',
          ],
          explanation: `Most of what we know about atoms, nuclei and particles comes from scattering. Far from a localised potential the stationary scattering state looks like an incident plane wave plus an outgoing spherical wave:
$$\\psi \\to e^{ikz} + f(\\theta, \\phi)\\frac{e^{ikr}}{r},\\qquad \\frac{d\\sigma}{d\\Omega} = |f(\\theta, \\phi)|^2 .$$
The **scattering amplitude** $f$ contains everything measurable; the task is to compute it from $V$.

**Born approximation.** Rewrite the Schrödinger equation as an integral equation (Lippmann-Schwinger) using the outgoing Green's function, and iterate once with the plane wave as the zeroth approximation:
$$f(\\theta) \\approx -\\frac{m}{2\\pi\\hbar^2}\\int e^{-i\\mathbf q\\cdot\\mathbf r}V(\\mathbf r)\\,d^3r,\\qquad \\mathbf q = \\mathbf k' - \\mathbf k,\\quad q = 2k\\sin(\\theta/2).$$
The amplitude is the Fourier transform of the potential at the momentum transfer. It is valid when the potential is weak or the energy high, and it is the basis of the whole language of "form factors" in nuclear and particle physics. For the Yukawa potential $e^{-\\mu r}/r$ it gives $f \\propto 1/(q^2 + \\mu^2)$, and letting $\\mu \\to 0$ produces the **Rutherford cross section** $\\propto 1/\\sin^4(\\theta/2)$, exactly the classical result, which is a coincidence special to the Coulomb potential.

**Partial waves.** For a spherically symmetric potential expand in angular momentum. Each incoming partial wave $l$ scatters only by acquiring a **phase shift** $\\delta_l(k)$ (the potential cannot change $l$ or the flux in each channel), and
$$f(\\theta) = \\frac{1}{k}\\sum_l(2l+1)e^{i\\delta_l}\\sin\\delta_l\\,P_l(\\cos\\theta),\\qquad \\sigma = \\frac{4\\pi}{k^2}\\sum_l(2l+1)\\sin^2\\delta_l .$$
The **optical theorem** $\\sigma = \\frac{4\\pi}{k}\\mathrm{Im}f(0)$ follows from unitarity. At low energy only $l = 0$ matters, $\\sigma \\to 4\\pi a^2$ with the **scattering length** $a$ defined by $\\delta_0 \\approx -ka$; the hard sphere has $a = R$ and $\\sigma = 4\\pi R^2$, four times the geometric value. When a phase shift passes through $\\pi/2$ the cross section in that channel reaches its unitarity limit: a **resonance**, with the Breit-Wigner shape $\\propto 1/[(E - E_R)^2 + \\Gamma^2/4]$, which is how unstable particles and quasi-bound states show up in experiments. Phase shifts are found by solving the radial equation numerically (your shooting code) and matching to free solutions, which is one of the exercises.

Read Zwiebach 8.06 lecture notes chapter on scattering, Tong Topics chapter on scattering theory, and Griffiths chapter 10.`,
          resources: [
            { ...R.mit806, note: 'Lecture notes and lectures on scattering: partial waves, Born approximation, resonances.', primary: true },
            { ...R.tongTopics, note: 'Chapter on scattering theory, including the Lippmann-Schwinger equation and resonances.' },
            { ...R.griffiths, note: 'Chapter 10 (3rd ed.). Free alternative: Tong Topics.' },
          ],
          exercises: [
            {
              slug: 'born-approximation-potentials',
              title: 'Born amplitudes for standard potentials',
              prompt:
                'Derive the Born amplitude. Compute it for the Yukawa potential and take the Coulomb limit to obtain the Rutherford cross section. Then compute it for a Gaussian potential and a spherical square well; plot $d\\sigma/d\\Omega$ versus $\\theta$ at several energies, and show the forward peak narrows as $kR$ grows. State and check the validity condition for the Born approximation for the square well at low and high energy.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'phase-shifts-numerical',
              title: 'Phase shifts by numerical integration',
              prompt:
                'Write a code that integrates the radial equation for given $l$ and $k$ out to beyond the range of the potential, matches to $A[j_l(kr)\\cos\\delta_l - n_l(kr)\\sin\\delta_l]$, and extracts $\\delta_l$. Apply to (a) the hard sphere (compare with the analytic $\\tan\\delta_l = j_l(kR)/n_l(kR)$); (b) an attractive square well, computing $\\sigma(E)$ and showing a low-energy resonance in $l = 1$ when the well is nearly deep enough to bind a $p$ state; (c) verify the optical theorem numerically.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'scattering-length-and-resonance',
              title: 'Scattering length and Breit-Wigner resonance',
              prompt:
                'For the attractive square well of depth $V_0$ and radius $R$ derive $\\delta_0(k)$ and the scattering length $a(V_0)$; show $a$ diverges each time a new bound state appears (plot $a/R$ versus $\\sqrt{2mV_0}R/\\hbar$). Then expand the $l = 1$ phase shift near a resonance to derive the Breit-Wigner form and relate $\\Gamma$ to the slope of $\\delta_1$. Discuss how Feshbach resonances in cold atoms use this divergence of $a$.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Born approximation say the scattering amplitude is?',
              answerOutline:
                'Proportional to the Fourier transform of the potential at the momentum transfer q = k′ − k; valid for weak potentials or high energies.',
            },
            {
              question: 'Why does a potential only shift the phase of each partial wave?',
              answerOutline:
                'Angular momentum is conserved for a central potential and flux is conserved in each channel, so the only freedom in the asymptotic solution is a phase δ_l.',
            },
            {
              question: 'Why is the low-energy hard-sphere cross section 4πR², not πR²?',
              answerOutline:
                'At kR ≪ 1 the wave cannot resolve the sphere; s-wave scattering with scattering length a = R gives σ = 4πa² (at high energy the result approaches 2πR², with the extra πR² from diffraction).',
            },
          ],
        },
      ],
      project: {
        slug: 'approximation-methods-benchmark',
        title: 'Benchmarking approximation methods against exact numerics',
        description: `For a family of one-dimensional and radial potentials where you can compute exact numerical answers with your module 2 solvers, implement each approximation method of this module and quantify its accuracy. Potentials: the quartic-perturbed oscillator, the Morse potential, a double well, the screened Coulomb (Yukawa) potential for bound states, and a square well plus barrier for scattering.

Produce: perturbation theory to second (and where feasible third) order versus $\\lambda$; variational bounds with one- and two-parameter trial functions; Bohr-Sommerfeld energies versus $n$; WKB tunnelling rates versus exact transmission; Born versus exact phase-shift cross sections versus energy. For each, a plot of error versus the controlling parameter and a paragraph on the regime of validity.`,
        deliverables: [
          'Code implementing all five methods with a common interface and tests',
          'A report with the comparison plots and a one-page "when to use which method" summary',
        ],
        estimatedHours: 12,
        stretchGoals: ['Implement Padé resummation of the anharmonic-oscillator perturbation series and show it converges where the raw series diverges', 'Compute the Stark effect of hydrogen non-perturbatively by diagonalisation in a large basis and locate the field where levels start to ionise'],
      },
    },
    {
      slug: 'entanglement-measurement-and-information',
      title: 'Entanglement, Measurement and Quantum Information',
      description:
        'What is strange about quantum mechanics, made precise: entanglement and Bell\'s theorem, density matrices and decoherence as the explanation of apparent collapse, qubits and circuits, and the protocols (teleportation, key distribution, algorithms) that turn the strangeness into technology.',
      lessons: [
        {
          slug: 'entanglement-epr-and-bells-theorem',
          title: 'Entanglement, EPR and Bell\'s theorem',
          summary:
            'Product versus entangled states, the EPR argument for hidden variables, Bell\'s inequality (CHSH form) and its violation by the singlet state, and the experiments that closed the loopholes.',
          estimatedMinutes: 120,
          objectives: [
            'Define entanglement for pure states and test it with the Schmidt decomposition or the reduced density matrix',
            'Reproduce the EPR argument and state precisely what it assumes (locality and realism)',
            'Derive the CHSH inequality $|S| \\le 2$ for local hidden-variable theories and compute the quantum value $2\\sqrt2$ for the singlet',
            'Describe the Aspect, Zeilinger and loophole-free experiments and what they rule out',
          ],
          concepts: [
            'Tensor products; product vs entangled states',
            'Schmidt decomposition',
            'Singlet correlations $\\langle\\sigma_{\\mathbf a}\\otimes\\sigma_{\\mathbf b}\\rangle = -\\mathbf a\\cdot\\mathbf b$',
            'EPR argument; elements of reality',
            'Local hidden variables',
            'Bell / CHSH inequality and Tsirelson bound',
            'Loopholes: locality, detection, freedom of choice',
            'No-signalling: entanglement cannot transmit information',
          ],
          explanation: `A state of two systems is a **product** if it can be written $|\\psi\\rangle_A|\\phi\\rangle_B$ and **entangled** otherwise. The singlet $\\frac{1}{\\sqrt2}(|\\uparrow\\downarrow\\rangle - |\\downarrow\\uparrow\\rangle)$ is entangled: measure spin A along any axis $\\mathbf a$ and spin B along $\\mathbf b$, and quantum mechanics predicts the correlation $\\langle\\sigma_{\\mathbf a}\\sigma_{\\mathbf b}\\rangle = -\\mathbf a\\cdot\\mathbf b$. For $\\mathbf a = \\mathbf b$ the results are always opposite, whichever axis you choose, even if the particles are light-years apart.

Einstein, Podolsky and Rosen (1935) argued from this: since you can predict B's spin along $\\mathbf a$ with certainty by measuring A, without disturbing B (locality), B's spin along $\\mathbf a$ must be an "element of reality"; the same holds for every axis; but quantum mechanics assigns no state with definite spin along two axes, so it must be incomplete, and a **hidden-variable** theory should underlie it. For thirty years this was regarded as philosophy. Then Bell (1964) showed that *any* local hidden-variable theory makes a testable prediction that quantum mechanics violates.

The cleanest version is the **CHSH inequality**. Let A choose between measurements $a, a'$ with outcomes $\\pm1$, and B between $b, b'$. If outcomes are determined by a shared variable $\\lambda$ and A's choice cannot affect B's outcome, then for every $\\lambda$ the combination $a b + a b' + a'b - a'b' = \\pm2$, so the average satisfies
$$|S| = |E(a,b) + E(a,b') + E(a',b) - E(a',b')| \\le 2 .$$
For the singlet with $a, a'$ at $0°, 90°$ and $b, b'$ at $45°, 135°$, quantum mechanics gives $S = -2\\sqrt2 \\approx -2.83$. Experiments (Freedman-Clauser 1972, Aspect 1982, Zeilinger's group 1998, and loophole-free tests in 2015 by Hensen, Giustina and Shalm; Nobel Prize 2022 to Aspect, Clauser and Zeilinger) find $|S| > 2$ with overwhelming significance. Local realism is false. What is given up is a matter of interpretation, but the correlations are real and are the resource for everything in the rest of this module.

Entanglement does **not** allow signalling: B's local statistics are the same whatever A does (prove it with the reduced density matrix, next lesson). Correlations only appear when the two records are compared, which needs a classical channel. Read Zwiebach 8.05 lecture 2 (EPR and Bell), the Stanford Encyclopedia article, and Preskill chapter 4; the exercises simulate a Bell test and a hidden-variable model that fails.`,
          resources: [
            { ...R.mit805, note: 'Lecture 2 and the notes on EPR and Bell inequalities.', primary: true },
            {
              title: 'Stanford Encyclopedia of Philosophy — Bell\'s Theorem',
              url: 'https://plato.stanford.edu/entries/bell-theorem/',
              type: 'article',
              cost: 'free',
              provider: 'Stanford University',
              note: 'Careful statement of the assumptions and survey of the experiments.',
            },
            { ...R.preskill, note: 'Chapter 4 (Quantum Entanglement) for the CHSH proof and Tsirelson bound.' },
            {
              title: 'Nobel Prize in Physics 2022 — Aspect, Clauser and Zeilinger (summary and scientific background)',
              url: 'https://www.nobelprize.org/prizes/physics/2022/summary/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
            },
          ],
          exercises: [
            {
              slug: 'chsh-derivation-and-quantum-value',
              title: 'CHSH: classical bound and quantum violation',
              prompt:
                'Prove $|S| \\le 2$ for any local hidden-variable model. Compute $E(\\mathbf a, \\mathbf b) = \\langle\\psi|\\sigma_{\\mathbf a}\\otimes\\sigma_{\\mathbf b}|\\psi\\rangle$ for the singlet using 4×4 matrices and show it equals $-\\mathbf a\\cdot\\mathbf b$. Evaluate $S$ for the optimal angles and obtain $2\\sqrt2$. Prove the Tsirelson bound $|S| \\le 2\\sqrt2$ for any quantum state (hint: compute the square of the CHSH operator).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'simulate-bell-test',
              title: 'Simulate a Bell test and a hidden-variable model',
              prompt:
                'Write a simulation that generates singlet measurement outcomes by sampling from the quantum joint probabilities for random settings $(a, a\', b, b\')$ and estimates $S$ with error bars from $10^5$ trials. Then implement a local hidden-variable model (e.g. each particle carries a unit vector $\\lambda$ and reports $\\mathrm{sign}(\\mathbf a\\cdot\\lambda)$) and show it gives $|S| \\le 2$ and the wrong correlation function ($1 - 2\\theta/\\pi$ rather than $-\\cos\\theta$). Plot both correlation functions.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'schmidt-decomposition',
              title: 'Schmidt decomposition and entanglement detection',
              prompt:
                'Show that any two-qubit pure state can be written $\\sum_i\\sqrt{p_i}|i\\rangle_A|i\\rangle_B$ (Schmidt form) via the singular value decomposition of its 2×2 coefficient matrix, and that the state is entangled iff more than one $p_i$ is nonzero. Compute the Schmidt coefficients for the singlet, for $\\cos\\theta|00\\rangle + \\sin\\theta|11\\rangle$, and for a random state. Define the entanglement entropy $-\\sum p_i\\ln p_i$ and plot it versus $\\theta$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two assumptions does Bell\'s inequality rest on, and which does quantum mechanics violate?',
              answerOutline:
                'Locality (a measurement choice here cannot influence an outcome there) and realism/hidden variables (outcomes are predetermined). Experiments show at least one is false; quantum mechanics is usually read as non-local in correlations but no-signalling.',
            },
            {
              question: 'Can entanglement be used to send a message faster than light?',
              answerOutline:
                'No: the reduced state of B is independent of what A measures, so B\'s statistics never change; correlations become visible only after classical communication.',
            },
            {
              question: 'What is the quantum maximum of the CHSH quantity and for which state and settings?',
              answerOutline:
                '2√2 (Tsirelson bound), achieved by maximally entangled states with measurement axes separated by 45° in the appropriate plane.',
            },
          ],
        },
        {
          slug: 'density-matrices-and-decoherence',
          title: 'Density matrices, mixed states and decoherence',
          summary:
            'The density operator for ensembles and subsystems, the reduced density matrix and the partial trace, how entanglement with an environment destroys interference, and why decoherence explains the appearance of collapse and the classical world.',
          estimatedMinutes: 120,
          objectives: [
            'Define the density operator, state its properties and distinguish pure from mixed states by $\\mathrm{Tr}\\rho^2$',
            'Compute reduced density matrices by partial trace and show that a subsystem of an entangled pure state is mixed',
            'Model decoherence as entanglement with an environment and show the off-diagonal elements of $\\rho$ decay',
            'Explain pointer states, the preferred basis, and the relation between decoherence and the measurement problem',
          ],
          concepts: [
            'Density operator $\\rho = \\sum p_i|\\psi_i\\rangle\\langle\\psi_i|$',
            'Pure vs mixed; purity and von Neumann entropy',
            'Bloch ball for a qubit',
            'Partial trace and reduced density matrix',
            'Von Neumann equation $i\\hbar\\dot\\rho = [\\hat H, \\rho]$',
            'Decoherence and loss of off-diagonal coherences',
            'Pointer states and einselection',
            'Lindblad master equation (statement)',
          ],
          explanation: `A pure state is a ket. But if you know only that the system is in $|\\psi_i\\rangle$ with probability $p_i$, or if the system is part of a larger entangled whole, no ket describes it. The **density operator**
$$\\rho = \\sum_ip_i|\\psi_i\\rangle\\langle\\psi_i|,\\qquad \\langle\\hat A\\rangle = \\mathrm{Tr}(\\rho\\hat A),$$
does. It is Hermitian, positive and has unit trace; it is pure iff $\\rho^2 = \\rho$ (equivalently $\\mathrm{Tr}\\rho^2 = 1$), and the von Neumann entropy $S = -\\mathrm{Tr}\\rho\\ln\\rho$ measures the mixedness (the Gibbs entropy of the thermodynamics subject is exactly this for a thermal $\\rho \\propto e^{-\\beta\\hat H}$). For a qubit $\\rho = \\frac{1}{2}(1 + \\mathbf r\\cdot\\boldsymbol\\sigma)$ with $|\\mathbf r| \\le 1$: pure states are the surface of the Bloch sphere, mixed states its interior, and the maximally mixed state is the centre. Time evolution is $i\\hbar\\dot\\rho = [\\hat H, \\rho]$.

The crucial construction is the **partial trace**. If AB is in a pure state $|\\Psi\\rangle$, then every measurement on A alone is predicted by $\\rho_A = \\mathrm{Tr}_B|\\Psi\\rangle\\langle\\Psi|$. For a product state $\\rho_A$ is pure; for the singlet $\\rho_A = \\frac{1}{2}\\mathbb 1$, completely mixed. This proves no-signalling (nothing B does changes $\\rho_A$), and it is the quantitative meaning of entanglement: the entropy of $\\rho_A$ is the entanglement entropy of the previous lesson.

Now let a system S in a superposition $\\alpha|0\\rangle + \\beta|1\\rangle$ interact with an environment E so that $|0\\rangle|E_0\\rangle$ and $|1\\rangle|E_1\\rangle$ result. The reduced state is
$$\\rho_S = \\begin{pmatrix}|\\alpha|^2 & \\alpha\\beta^*\\langle E_1|E_0\\rangle\\\\ \\alpha^*\\beta\\langle E_0|E_1\\rangle & |\\beta|^2\\end{pmatrix}.$$
As the environment states become distinguishable, $\\langle E_0|E_1\\rangle \\to 0$, the off-diagonal **coherences** vanish and $\\rho_S$ becomes indistinguishable from a classical mixture of $|0\\rangle$ and $|1\\rangle$. This is **decoherence**. For a dust grain scattering air molecules and photons it happens in $10^{-30}$ s in the position basis; the environment "measures" position continuously, which selects position (more precisely, coherent-state-like **pointer states**) as the basis in which classical objects appear (Zurek's einselection). This is the mechanism behind the double-slit which-path argument of module 1, and it explains why we never see superpositions of macroscopic objects. It does *not* by itself explain why a particular outcome occurs; that remains the measurement problem, addressed differently by the Copenhagen, many-worlds, Bohmian and other interpretations, and it is worth reading one careful account (Zurek's review) and forming your own view.

Read Zwiebach 8.06 lecture notes on density matrices, Preskill chapters 2-3, and Zurek's review; the exercises simulate decoherence with QuTiP's Lindblad solver.`,
          resources: [
            { ...R.preskill, note: 'Chapter 2 (Density operators, Schmidt decomposition) and chapter 3 (Measurement and evolution, decoherence).', primary: true },
            {
              title: 'Zurek — Decoherence, einselection, and the quantum origins of the classical (Rev. Mod. Phys. 2003, arXiv)',
              url: 'https://arxiv.org/abs/quant-ph/0105127',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections I-IV for the physics; the rest is optional.',
            },
            { ...R.mit806, note: 'Lecture notes on density matrices and open quantum systems.' },
            { ...R.qutip, note: 'mesolve and the Lindblad equation for the decoherence simulations.' },
          ],
          exercises: [
            {
              slug: 'density-matrix-basics',
              title: 'Density matrix basics',
              prompt:
                'Prove the properties of ρ (Hermitian, positive, Tr ρ = 1, Tr ρ² ≤ 1 with equality iff pure). Show that the mixture of 50% |↑z⟩ and 50% |↓z⟩ has the same ρ as 50% |↑x⟩ and 50% |↓x⟩, and explain why no measurement can distinguish them. Compute the Bloch vector for the mixed state $0.7|\\uparrow\\rangle\\langle\\uparrow| + 0.3|\\!\\rightarrow\\rangle\\langle\\rightarrow\\!|$ and its von Neumann entropy. Derive the von Neumann equation from the Schrödinger equation.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'partial-trace-and-no-signalling',
              title: 'Partial trace and no-signalling',
              prompt:
                'Implement the partial trace for two-qubit states (NumPy reshape or QuTiP ptrace). Compute $\\rho_A$ for the singlet, for a product state, and for $\\cos\\theta|00\\rangle + \\sin\\theta|11\\rangle$; plot the entropy of $\\rho_A$ versus $\\theta$. Then show explicitly that applying any unitary or any projective measurement (averaged over outcomes) on B leaves $\\rho_A$ unchanged.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'decoherence-simulation',
              title: 'Simulate decoherence of a qubit and of a cat state',
              prompt:
                'Using QuTiP mesolve with a dephasing collapse operator $\\sqrt{\\gamma}\\sigma_z$, evolve a qubit from $|+x\\rangle$ and plot the Bloch vector shrinking toward the $z$-axis; show the coherence decays as $e^{-2\\gamma t}$ while populations are constant. Then take an oscillator in a superposition of two coherent states $|\\alpha\\rangle + |-\\alpha\\rangle$ with amplitude damping $\\sqrt\\kappa\\hat a$, and show the Wigner-function interference fringes vanish at a rate $\\propto|\\alpha|^2$, much faster than the energy decays: large superpositions decohere faster.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How do you tell whether a density matrix describes a pure state?',
              answerOutline:
                'ρ² = ρ, or Tr ρ² = 1, or zero von Neumann entropy; for a qubit, Bloch vector of unit length.',
            },
            {
              question: 'What does decoherence do to the density matrix and what does it not do?',
              answerOutline:
                'It suppresses off-diagonal elements in the pointer basis, making ρ look like a classical mixture; it does not select which outcome occurs, so it does not by itself solve the measurement problem.',
            },
            {
              question: 'Why is the reduced state of one half of an entangled pair mixed?',
              answerOutline:
                'Tracing out the partner averages over its correlated states; the Schmidt decomposition shows ρ_A = Σp_i|i⟩⟨i| with more than one nonzero p_i.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/statistical-foundations/shannon-entropy-and-maximum-entropy'],
        },
        {
          slug: 'qubits-gates-and-quantum-circuits',
          title: 'Qubits, gates, circuits and teleportation',
          summary:
            'Quantum computation as unitary evolution of qubits: single-qubit and two-qubit gates, universality, the no-cloning theorem, superdense coding and quantum teleportation, run on a simulator and on real IBM hardware.',
          estimatedMinutes: 130,
          objectives: [
            'Express single-qubit gates (X, Y, Z, H, S, T, rotations) as unitaries and visualise them on the Bloch sphere',
            'Construct entangling gates (CNOT, CZ) and build Bell states with a circuit',
            'Prove the no-cloning theorem and explain its consequences',
            'Implement and verify the teleportation and superdense-coding protocols in Qiskit, on a simulator and on real hardware',
          ],
          concepts: [
            'Qubit and computational basis',
            'Pauli, Hadamard, phase and rotation gates',
            'CNOT and controlled gates; universality',
            'Circuit model and measurement',
            'No-cloning theorem',
            'Bell basis and Bell measurement',
            'Superdense coding',
            'Quantum teleportation',
          ],
          explanation: `A **qubit** is any two-level system, and a quantum computation is a unitary operator on $n$ of them, built from a small set of **gates**, followed by measurement. Single-qubit gates are the $2\\times2$ unitaries of module 3: the Paulis $X, Y, Z$; the **Hadamard** $H = \\frac{1}{\\sqrt2}\\begin{pmatrix}1&1\\\\1&-1\\end{pmatrix}$, which maps $|0\\rangle$ to $(|0\\rangle + |1\\rangle)/\\sqrt2$; the phase gates $S = \\mathrm{diag}(1, i)$ and $T = \\mathrm{diag}(1, e^{i\\pi/4})$; and general rotations $R_{\\mathbf n}(\\theta) = e^{-i\\theta\\mathbf n\\cdot\\boldsymbol\\sigma/2}$, the Rabi pulses of module 3. Each is a rotation of the Bloch sphere.

Entanglement needs two-qubit gates. The **CNOT** flips the target if the control is $|1\\rangle$: $|c, t\\rangle \\to |c, t\\oplus c\\rangle$. Applying $H$ to the first qubit and then CNOT to $|00\\rangle$ gives the Bell state $(|00\\rangle + |11\\rangle)/\\sqrt2$; the same circuit run backwards is a **Bell measurement**. CNOT plus arbitrary single-qubit rotations is **universal**: any unitary on $n$ qubits can be approximated to any accuracy, which is the quantum analogue of NAND being universal classically.

Two theorems shape everything. **No-cloning**: there is no unitary with $U|\\psi\\rangle|0\\rangle = |\\psi\\rangle|\\psi\\rangle$ for all $|\\psi\\rangle$; the proof is two lines using linearity on a superposition. So quantum information cannot be copied, backed up or amplified, which is why error correction is hard, why eavesdropping is detectable (next lesson), and why measurement is destructive. Yet it can be *moved*. In **teleportation**, Alice and Bob share a Bell pair; Alice performs a Bell measurement on her half together with an unknown qubit $|\\psi\\rangle$, obtains two classical bits, and sends them to Bob, who applies one of $\\{\\mathbb 1, X, Z, XZ\\}$. His qubit is now exactly $|\\psi\\rangle$, while Alice's copy is destroyed (consistent with no-cloning) and nothing travelled faster than light (the two bits were needed). The dual protocol, **superdense coding**, sends two classical bits with one qubit plus a shared pair. Both have been demonstrated over hundreds of kilometres, and teleportation is the basic operation of quantum repeaters and of fault-tolerant architectures.

This lesson is hands-on. Work through the IBM Quantum Learning "Basics of quantum information" course, then build the circuits yourself in Qiskit: run on the statevector simulator to check the mathematics, then on a real device and compare the fidelity. Preskill chapter 4 and 6 give the theory. The capstone's written component starts from the protocol you analyse here.`,
          resources: [
            { ...R.ibmq, note: '"Basics of quantum information" and "Fundamentals of quantum algorithms" courses: single- and multi-qubit systems, teleportation, with runnable Qiskit code.', primary: true },
            { ...R.preskill, note: 'Chapter 4 (teleportation, superdense coding) and chapter 6 (circuit model, universality).' },
            { ...R.qiskitTextbook, note: 'The archived notebooks on gates, Bell states and teleportation still run with Qiskit 1.x after minor import changes.' },
            { ...R.qutip, note: 'QuTiP\'s qip module is an alternative circuit simulator if you prefer to stay in one toolkit.' },
          ],
          exercises: [
            {
              slug: 'gate-algebra',
              title: 'Gate identities and Bloch-sphere rotations',
              prompt:
                'Verify algebraically and numerically: $HXH = Z$, $HZH = X$, $S^2 = Z$, $T^2 = S$, $(HT)^n$ is not periodic (hence generates a dense set of rotations); express $H$ as a rotation on the Bloch sphere; show CNOT $= |0\\rangle\\langle0|\\otimes\\mathbb 1 + |1\\rangle\\langle1|\\otimes X$ and that CNOT conjugated by Hadamards on both qubits reverses control and target. Prove the no-cloning theorem.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'teleportation-qiskit',
              title: 'Teleportation on a simulator and on hardware',
              prompt:
                'Implement the teleportation circuit in Qiskit. On the statevector simulator, teleport the states $|0\\rangle$, $|+\\rangle$, $R_y(\\pi/3)|0\\rangle$ and verify Bob\'s reduced state equals the input (use the density matrix). Then run on a real IBM device (free tier) with measurement of Bob\'s qubit in the appropriate basis and report the fidelity with error bars from 4000 shots. Discuss the main error sources (two-qubit gate error, readout, decoherence) using the device\'s calibration data.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'superdense-and-bell-measurement',
              title: 'Superdense coding and Bell-state discrimination',
              prompt:
                'Show that applying $\\mathbb 1, X, Z, XZ$ to one half of $(|00\\rangle + |11\\rangle)/\\sqrt2$ produces the four orthogonal Bell states, and that the circuit CNOT then $H$ maps them to the computational basis. Implement superdense coding in Qiskit and verify all four two-bit messages are decoded correctly on the simulator. Explain why this does not violate the Holevo bound.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is CNOT plus single-qubit rotations universal, and why does this matter?',
              answerOutline:
                'Any n-qubit unitary decomposes into two-level unitaries, each realisable by controlled operations built from CNOTs and single-qubit gates; so one fixed gate set can run any quantum algorithm.',
            },
            {
              question: 'In teleportation, what is sent, what is not, and why is there no faster-than-light signalling?',
              answerOutline:
                'Two classical bits are sent; no qubit travels. Until the bits arrive Bob\'s qubit is maximally mixed; the correction operations that reconstruct |ψ⟩ depend on the bits.',
            },
            {
              question: 'State the no-cloning theorem and one consequence.',
              answerOutline:
                'No unitary copies an arbitrary unknown quantum state (linearity forbids it). Consequences: quantum states cannot be backed up or amplified; eavesdropping on a quantum channel leaves traces; classical error correction by repetition does not transfer directly.',
            },
          ],
        },
        {
          slug: 'quantum-cryptography-and-algorithms',
          title: 'Quantum key distribution and quantum algorithms',
          summary:
            'Two things quantum computers and channels can do that classical ones cannot: distribute cryptographic keys with security guaranteed by physics (BB84), and solve certain problems faster (Deutsch-Jozsa, Grover, and the structure of Shor).',
          estimatedMinutes: 130,
          objectives: [
            'Describe the BB84 protocol and explain why an eavesdropper is detected, using no-cloning and the uncertainty between conjugate bases',
            'Implement and analyse the Deutsch-Jozsa algorithm as the simplest example of quantum parallelism plus interference',
            'Explain Grover\'s search as amplitude amplification and derive the $\\sqrt N$ scaling',
            'Outline Shor\'s algorithm: period finding via the quantum Fourier transform, and its implications for RSA',
          ],
          concepts: [
            'BB84 protocol; conjugate bases; sifting',
            'Intercept-resend attack and error rate 25%',
            'Oracle model and query complexity',
            'Deutsch-Jozsa: interference of all inputs',
            'Grover iteration; amplitude amplification; $O(\\sqrt N)$',
            'Quantum Fourier transform',
            'Shor\'s algorithm: order finding and factoring',
            'Decoherence, error correction and the threshold (outlook)',
          ],
          explanation: `**Key distribution (BB84, Bennett and Brassard 1984).** Alice sends qubits prepared randomly in one of four states: $|0\\rangle, |1\\rangle$ (Z basis) or $|+\\rangle, |-\\rangle$ (X basis), encoding random bits. Bob measures each in a random basis. Afterwards they publicly compare bases (not results) and keep the bits where the bases matched: about half. An eavesdropper Eve cannot copy the qubits (no-cloning) and does not know the basis; if she measures in the wrong one she disturbs the state, and an intercept-resend attack causes a 25% error rate in the sifted key, which Alice and Bob detect by sacrificing a sample of bits. The security rests on the incompatibility of $\\sigma_z$ and $\\sigma_x$ measurements, i.e. on the uncertainty principle, not on any computational assumption. Commercial systems run over 100 km of fibre; the Micius satellite did it between continents in 2017.

**Algorithms.** A quantum computer applies a unitary to a superposition of all $2^n$ inputs at once, but measurement returns only one result, so "quantum parallelism" alone is useless; the art is arranging **interference** so that the answer is read out with high probability. **Deutsch-Jozsa** is the textbook case: given a function $f: \\{0,1\\}^n \\to \\{0,1\\}$ promised to be constant or balanced, one query of a phase oracle $|x\\rangle \\to (-1)^{f(x)}|x\\rangle$ between two layers of Hadamards decides which, while a classical algorithm needs up to $2^{n-1} + 1$ queries. **Grover's search** finds a marked item among $N$ in $O(\\sqrt N)$ oracle calls by repeatedly reflecting the state about the marked item and about the uniform superposition: each iteration rotates the state vector by $2\\theta$ with $\\sin\\theta = 1/\\sqrt N$ in a 2D subspace, and after $\\sim\\frac{\\pi}{4}\\sqrt N$ iterations it points at the answer. **Shor's algorithm** factors $N$ by finding the period of $a^x \\bmod N$ with the quantum Fourier transform, in polynomial time, which breaks RSA; running it on cryptographically relevant numbers needs millions of error-corrected qubits, which is why post-quantum cryptography is being deployed now, decades in advance.

The obstacle to all of this is decoherence (previous lesson). Quantum error correction, which protects information by spreading it over entangled qubits without ever measuring it directly (no-cloning forbids simple copies), and the threshold theorem are where this subject leads next.

Work through the IBM Quantum Learning algorithm course and Preskill chapter 6; the Bennett-Brassard paper is short and readable. Implement BB84, Deutsch-Jozsa and Grover in Qiskit in the exercises.`,
          resources: [
            { ...R.ibmq, note: '"Fundamentals of quantum algorithms" (Deutsch-Jozsa, Grover, phase estimation, Shor) with runnable notebooks.', primary: true },
            {
              title: 'Bennett & Brassard (1984) — Quantum cryptography: Public key distribution and coin tossing (arXiv reprint)',
              url: 'https://arxiv.org/abs/2003.06557',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The original BB84 paper; five pages.',
            },
            { ...R.preskill, note: 'Chapter 6 (Quantum computation) for Deutsch-Jozsa, Grover, the QFT and Shor.' },
            { ...R.qiskitTextbook, note: 'Archived notebooks for BB84, Deutsch-Jozsa, Grover and Shor.' },
          ],
          exercises: [
            {
              slug: 'bb84-simulation',
              title: 'Simulate BB84 with and without an eavesdropper',
              prompt:
                'Simulate BB84 for 10,000 qubits (classical simulation of the quantum statistics is fine, or use Qiskit). Verify the sifted key is about half the raw bits and error-free without Eve. Add an intercept-resend Eve measuring in a random basis and show the sifted-key error rate is 25%; compute how many check bits Alice and Bob must compare to detect Eve with 99.9% confidence. Then let Eve attack only a fraction $f$ of qubits and plot error rate versus $f$ and the information Eve gains.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'deutsch-jozsa-and-grover',
              title: 'Deutsch-Jozsa and Grover in Qiskit',
              prompt:
                'Implement Deutsch-Jozsa for $n = 3$ with constant and balanced oracles and show the output is $|000\\rangle$ iff constant. Derive this by tracking the state through the circuit. Then implement Grover\'s algorithm for $N = 16$ ($n = 4$) with one marked item: plot the success probability versus the number of iterations and show it peaks near $\\frac{\\pi}{4}\\sqrt{16} \\approx 3$ and then decreases (over-rotation). Derive the rotation-angle picture.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'shor-structure',
              title: 'Period finding and Shor\'s algorithm by hand and in simulation',
              prompt:
                'Factor 15 "by Shor": choose $a = 7$, find the period $r$ of $7^x \\bmod 15$ classically, and show $\\gcd(7^{r/2} \\pm 1, 15)$ gives the factors. Explain how the quantum Fourier transform over $2^8$ states extracts $r$ from a superposition of $|x\\rangle|7^x \\bmod 15\\rangle$ by computing the probability distribution of the measured register (write code for the classical probability calculation). Estimate the number of logical qubits and gates for a 2048-bit RSA modulus and compare with current hardware.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What physical principle makes BB84 secure?',
              answerOutline:
                'Measuring in the wrong one of two conjugate bases disturbs the state (uncertainty/incompatibility) and no-cloning prevents copying, so eavesdropping creates detectable errors.',
            },
            {
              question: 'Why is "evaluating f on all inputs at once" not by itself a speed-up?',
              answerOutline:
                'Measurement returns a single random outcome; the algorithm must arrange interference so that the desired global property of f concentrates the amplitude on a readable answer.',
            },
            {
              question: 'What is the speed-up of Grover\'s algorithm and why is it optimal?',
              answerOutline:
                'Quadratic: O(√N) oracle queries versus O(N); it is provably optimal for unstructured search (BBBV lower bound), so exponential speed-ups need problem structure, as in Shor.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'schrodinger-solver-and-quantum-protocol',
    title: 'Capstone: a numerical Schrödinger solver and a quantum information protocol',
    description: `**Part A — Solver.** Consolidate your module 2 and 5 code into a documented Python package that solves the time-independent Schrödinger equation in 1D (finite-difference and shooting), for radial problems in 3D (with the centrifugal term and the Numerov method), and the time-dependent equation (split-operator and Crank-Nicolson), with a consistent API, unit tests against every exact result in this subject, and convergence diagnostics. Demonstrate it on: the hydrogen spectrum and orbitals for $n \\le 4$ with comparison to NIST; the Stark effect of hydrogen computed non-perturbatively; wave-packet tunnelling through a double barrier showing resonant transmission; and one problem of your choice (a periodic potential and band formation, a Morse potential and its spectrum against molecular data, or a 2D quantum dot).

**Part B — Protocol.** Write a 6-10 page treatment of one quantum information protocol: teleportation, BB84 (with a proof sketch of security against intercept-resend and a discussion of the general case), Grover's algorithm, or quantum error correction with the three-qubit or Shor code. The treatment must contain the full mathematics (state evolution step by step), a Qiskit implementation run on a simulator and on real hardware with a quantitative comparison of fidelities, and an honest account of the protocol's assumptions and limits.`,
    deliverables: [
      'Solver package with README, tests, convergence plots and the four demonstration notebooks',
      'A short technical report (4-6 pages) on the solver: methods, validation table and the physics of the demonstrations',
      'The protocol treatment (6-10 pages) with mathematics, circuits, hardware results and discussion',
      'All code and data in one repository with instructions to reproduce every figure',
    ],
    estimatedHours: 30,
    stretchGoals: [
      'Add a Hartree-Fock solver for light atoms (He, Li, Be) and compare total energies with experiment',
      'Implement a variational quantum eigensolver for H₂ in Qiskit and compare with the exact curve from your solver',
      'Simulate the three-qubit bit-flip code under a realistic noise model and show the error threshold behaviour',
    ],
  },
  masteryChecklist: [
    'I can explain the experiments that forced quantum mechanics and compute photon, Compton and Bohr-model quantities',
    'I can solve the Schrödinger equation for the standard 1D potentials analytically and for arbitrary potentials numerically, with validated code',
    'I can state the postulates in Dirac notation, prove the properties of Hermitian operators, derive the uncertainty relation from commutators and move between the Schrödinger and Heisenberg pictures',
    'I can solve any two-level system, including driven Rabi oscillations, and relate it to NMR and qubits',
    'I can derive the angular momentum spectrum from the commutation relations, construct spin matrices, and add angular momenta with Clebsch-Gordan coefficients',
    'I can derive the hydrogen spectrum, compute fine, hyperfine and Zeeman structure, and explain the periodic table from the exclusion principle and screening',
    'I can apply perturbation theory (time-independent and time-dependent), the variational method, WKB and the Born approximation, and know when each is valid',
    'I can derive and simulate a Bell-inequality violation, compute reduced density matrices and explain decoherence',
    'I can build and run quantum circuits for teleportation, BB84, Deutsch-Jozsa and Grover, and explain where their power comes from',
    'I have written a validated numerical Schrödinger solver and a complete written treatment of a quantum information protocol',
  ],
});
