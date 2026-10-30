import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/** Resources reused across many lessons; spread them and add a lesson-specific note. */
const R = {
  tong: {
    title: "David Tong — Lectures on Statistical Physics",
    url: 'https://davidtong.org/teaching/statistical-physics/',
    type: 'textbook',
    cost: 'free',
    provider: 'University of Cambridge',
  },
  tongKinetic: {
    title: "David Tong — Lectures on Kinetic Theory",
    url: 'https://davidtong.org/teaching/kinetic-theory/',
    type: 'textbook',
    cost: 'free',
    provider: 'University of Cambridge',
  },
  mit8044: {
    title: 'MIT 8.044 Statistical Physics I (Spring 2013)',
    url: 'https://ocw.mit.edu/courses/8-044-statistical-physics-i-spring-2013/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit8333: {
    title: 'MIT 8.333 Statistical Mechanics I: Statistical Mechanics of Particles (Kardar)',
    url: 'https://ocw.mit.edu/courses/8-333-statistical-mechanics-i-statistical-mechanics-of-particles-fall-2013/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit8334: {
    title: 'MIT 8.334 Statistical Mechanics II: Statistical Physics of Fields (Kardar)',
    url: 'https://ocw.mit.edu/courses/8-334-statistical-mechanics-ii-statistical-physics-of-fields-spring-2014/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  mit560: {
    title: 'MIT 5.60 Thermodynamics and Kinetics (Spring 2008)',
    url: 'https://ocw.mit.edu/courses/5-60-thermodynamics-kinetics-spring-2008/',
    type: 'course',
    cost: 'free',
    provider: 'MIT OpenCourseWare',
  },
  sethna: {
    title: 'Sethna — Statistical Mechanics: Entropy, Order Parameters, and Complexity (free PDF)',
    url: 'https://sethna.lassp.cornell.edu/StatMech/',
    type: 'textbook',
    cost: 'free',
    provider: 'Cornell University / Oxford University Press',
  },
  schroeder: {
    title: 'Schroeder — An Introduction to Thermal Physics (course page with free problem sets and software)',
    url: 'https://physics.weber.edu/schroeder/thermal/',
    type: 'textbook',
    cost: 'paid',
    provider: 'Weber State University',
  },
  openstax2: {
    title: 'OpenStax University Physics Volume 2 — Thermodynamics (Chapters 1-4)',
    url: 'https://openstax.org/books/university-physics-volume-2/pages/1-introduction',
    type: 'textbook',
    cost: 'free',
    provider: 'OpenStax',
  },
  susskind: {
    title: "Susskind — The Theoretical Minimum: Statistical Mechanics (video lectures)",
    url: 'https://theoreticalminimum.com/courses/statistical-mechanics/2013/spring',
    type: 'lecture',
    cost: 'free',
    provider: 'Stanford University',
  },
  libretexts: {
    title: 'Physics LibreTexts — Thermodynamics and Statistical Mechanics bookshelf',
    url: 'https://phys.libretexts.org/Bookshelves/Thermodynamics_and_Statistical_Mechanics',
    type: 'textbook',
    cost: 'free',
    provider: 'LibreTexts',
  },
} satisfies Record<string, ResourceInput>;

const feynman = (ch: number, title: string): ResourceInput => ({
  title: `Feynman Lectures Vol. I, Ch. ${ch}: ${title}`,
  url: `https://www.feynmanlectures.caltech.edu/I_${String(ch).padStart(2, '0')}.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'Caltech',
});

export default defineSubject({
  id: 'thermodynamics-statistical-mechanics',
  title: 'Thermodynamics and Statistical Mechanics',
  category: 'physics',
  tagline:
    'From heat engines to the Ising model: how the laws of large numbers turn microscopic chaos into entropy, temperature and phase transitions.',
  description: `Thermodynamics is the only physical theory that Einstein believed would never be overthrown: four laws about energy, entropy and temperature that hold regardless of what matter is made of. Statistical mechanics explains *why* they hold. It starts from the microscopic dynamics of $10^{23}$ particles, adds one assumption about probability, and derives every thermodynamic quantity from a single function, the partition function. Along the way it predicts things thermodynamics alone cannot: the heat capacity of a solid, the pressure inside a white dwarf, the spectrum of starlight, and why water boils all at once rather than gradually.

This curriculum is built around three free sources: David Tong's Cambridge lecture notes on Statistical Physics, MIT OpenCourseWare 8.044 and 8.333 (Kardar), and Sethna's *Entropy, Order Parameters, and Complexity*. The first two modules build classical thermodynamics carefully, because the later statistical machinery is only convincing if you know what it must reproduce. Modules 3-5 derive the ensembles and apply them to classical and quantum gases. Module 6 is the heart of modern statistical physics: phase transitions, Landau theory, scaling and the renormalization group. Module 7 takes the tools to stars, chemistry and information theory.

Every module contains derivations you must do yourself and simulations you must write. You will build a hard-sphere gas, compute partition functions numerically, implement the Metropolis algorithm for the Ising model and extract critical exponents by finite-size scaling. By the end you should be able to take an unfamiliar Hamiltonian and say what its thermodynamics looks like, and you should know when mean-field theory lies.`,
  difficulty: 'advanced',
  estimatedHours: 90,
  prerequisites: ['classical-mechanics', 'probability-statistics'],
  recommendedBackground: [
    'Multivariable calculus: partial derivatives, Lagrange multipliers, Gaussian integrals',
    'Hamiltonian mechanics and phase space (classical-mechanics modules 5-6)',
    'Python with NumPy and Matplotlib for simulations',
    'Basic quantum mechanics (energy levels, bosons vs fermions) is helpful for module 5 but is introduced where needed',
  ],
  tags: ['thermodynamics', 'statistical mechanics', 'entropy', 'phase transitions', 'Ising model', 'Monte Carlo'],
  core: true,
  modules: [
    {
      slug: 'temperature-heat-and-the-laws',
      title: 'Temperature, Heat and the Laws of Thermodynamics',
      description:
        'The macroscopic theory: what temperature is, how kinetic theory explains pressure, the first law as energy bookkeeping, and the second law as the limit on heat engines.',
      lessons: [
        {
          slug: 'temperature-and-the-zeroth-law',
          title: 'Temperature, equilibrium and the zeroth law',
          summary:
            'Thermal equilibrium defines temperature; equations of state relate the handful of variables that describe a system in equilibrium.',
          estimatedMinutes: 90,
          objectives: [
            'State the zeroth law and explain why it is what makes "temperature" a meaningful single number',
            'Distinguish state variables, equations of state and process-dependent quantities',
            'Use the ideal gas law and the van der Waals equation to compute pressures, volumes and temperatures',
            'Explain why the Kelvin scale is absolute and how the triple point of water fixes it',
          ],
          concepts: [
            'Thermodynamic system, surroundings, walls (adiabatic vs diathermal)',
            'Thermal equilibrium and the zeroth law',
            'State variables: extensive vs intensive',
            'Equation of state; ideal gas law $pV = N k_B T$',
            'Van der Waals equation and real gases',
            'Absolute temperature and the Kelvin scale',
            'Thermal expansion and compressibility as response functions',
          ],
          explanation: `Thermodynamics describes systems with $10^{23}$ particles using a few numbers: pressure $p$, volume $V$, temperature $T$, particle number $N$. That compression is only possible in **equilibrium**, the state a system reaches when left alone long enough that nothing macroscopic changes. The **zeroth law** says that if A is in thermal equilibrium with B and B with C, then A is with C. This sounds trivial, but it is what allows a *thermometer*: equilibrium is an equivalence relation, so each class can be labelled by a single number, the **temperature**.

Variables split into **extensive** ones that double when you double the system ($V$, $N$, energy $U$, entropy $S$) and **intensive** ones that do not ($p$, $T$, chemical potential $\\mu$). An **equation of state** is a relation among them that holds in equilibrium. For a dilute gas it is $pV = N k_B T$ with $k_B = 1.380649\\times10^{-23}\\ \\mathrm{J/K}$ (an exact SI constant since 2019). For a real gas, van der Waals adds an excluded volume $b$ and an attraction $a$:
$$\\left(p + \\frac{a N^2}{V^2}\\right)(V - Nb) = N k_B T .$$
You will meet this equation again in module 6, because it predicts a liquid-gas transition.

Derivatives of the equation of state are **response functions** you can measure: thermal expansion $\\alpha = \\frac{1}{V}(\\partial V/\\partial T)_p$ and isothermal compressibility $\\kappa_T = -\\frac{1}{V}(\\partial V/\\partial p)_T$. Notice the subscripts: in thermodynamics a partial derivative is meaningless unless you say what is held fixed. This is the single most common source of errors in the subject, so practise it now.

Work through Tong's chapter 4 (classical thermodynamics) sections 4.1-4.2 and OpenStax Vol. 2 chapters 1-2 for the phenomenology. Play with the PhET gas simulation and watch how $p$, $V$ and $T$ co-vary; then do the exercises, which make you manipulate equations of state and the partial-derivative identities you will need for the rest of the subject.`,
          resources: [
            { ...R.tong, note: 'Chapter 4, sections 4.1-4.2: the laws and temperature.', primary: true },
            { ...R.openstax2, note: 'Chapter 1 (Temperature and Heat) and chapter 2 (Kinetic Theory), for phenomenology and worked examples.' },
            {
              title: 'PhET — Gas Properties simulation',
              url: 'https://phet.colorado.edu/en/simulations/gas-properties',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Colorado Boulder',
              note: 'Vary volume at fixed T and fixed N; check pV = const.',
            },
            {
              title: 'NIST CODATA fundamental physical constants',
              url: 'https://physics.nist.gov/cuu/Constants/',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Exact values of k_B, N_A, h; use these in every numerical exercise.',
            },
          ],
          exercises: [
            {
              slug: 'partial-derivative-identities',
              title: 'Partial-derivative identities for state functions',
              prompt:
                'For a system described by an equation of state $f(p,V,T)=0$, prove the cyclic relation $(\\partial p/\\partial V)_T (\\partial V/\\partial T)_p (\\partial T/\\partial p)_V = -1$ and the reciprocal relation $(\\partial p/\\partial V)_T = 1/(\\partial V/\\partial p)_T$. Verify both explicitly for the ideal gas and for the van der Waals gas. Then show that $\\alpha/\\kappa_T = (\\partial p/\\partial T)_V$ and evaluate it for water at 20 °C using tabulated $\\alpha = 2.07\\times10^{-4}\\ \\mathrm{K^{-1}}$ and $\\kappa_T = 4.6\\times10^{-10}\\ \\mathrm{Pa^{-1}}$. The result (about $4.5\\times10^5$ Pa/K) explains why heating sealed water pipes bursts them.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'van-der-waals-isotherms',
              title: 'Plot van der Waals isotherms',
              prompt:
                'In Python, plot $p(V)$ for one mole of CO$_2$ using van der Waals constants $a = 0.364\\ \\mathrm{Pa\\,m^6/mol^2}$, $b = 4.27\\times10^{-5}\\ \\mathrm{m^3/mol}$ at $T = 280, 300, 304, 320, 350$ K, together with the ideal gas isotherms. Identify the temperature below which $p(V)$ is no longer monotonic and compare it with the critical temperature $T_c = 8a/(27 R b) \\approx 304$ K. Derive $T_c$, $p_c$, $V_c$ from the conditions $\\partial p/\\partial V = \\partial^2 p/\\partial V^2 = 0$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Work in molar quantities with R = 8.314 J/(mol K). The non-monotonic region signals a phase transition (module 6).',
            },
            {
              slug: 'gas-thermometer',
              title: 'The constant-volume gas thermometer',
              prompt:
                'A constant-volume gas thermometer reads $p = 1.000\\times10^5$ Pa at the triple point of water (273.16 K). Compute the temperature when it reads $1.366\\times10^5$ Pa. Then explain, with a sketch, why measurements at several decreasing fill pressures extrapolated to $p \\to 0$ give a gas-independent temperature, and why this motivates defining $T$ via the ideal gas.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the zeroth law let us define temperature as a number?',
              answerOutline:
                'It makes "in thermal equilibrium with" transitive (an equivalence relation); equilibrium classes can be labelled by one real number, and any system (a thermometer) can be used to read it.',
            },
            {
              question: 'Is heat a state variable? Is internal energy?',
              answerOutline:
                'Heat is process-dependent (a transfer), not a property of a state. Internal energy is a state function: it depends only on the current equilibrium state.',
            },
            {
              question: 'What do the parameters a and b in the van der Waals equation represent physically?',
              answerOutline:
                'b: excluded volume per particle from short-range repulsion (hard cores); a: reduction of pressure by long-range attraction, proportional to density squared.',
            },
            {
              question: 'Why must you specify what is held constant in a thermodynamic partial derivative?',
              answerOutline:
                'With three or more variables linked by an equation of state, (∂V/∂T) differs depending on whether p or S or U is held fixed; the subscript defines the path.',
            },
          ],
        },
        {
          slug: 'kinetic-theory-of-gases',
          title: 'Kinetic theory: pressure, equipartition and the Maxwell distribution',
          summary:
            'Derive the ideal gas law from molecular collisions, meet the Maxwell-Boltzmann speed distribution, and estimate mean free paths and transport coefficients.',
          estimatedMinutes: 120,
          objectives: [
            'Derive $pV = \\tfrac{1}{3} N m \\langle v^2\\rangle$ from momentum transfer to a wall',
            'State the equipartition theorem and use it to predict heat capacities of monatomic and diatomic gases',
            'Write down the Maxwell-Boltzmann speed distribution and compute its mean, rms and most probable speeds',
            'Estimate the mean free path and relate it to viscosity and diffusion',
          ],
          concepts: [
            'Pressure as momentum flux',
            'Equipartition: $\\tfrac{1}{2} k_B T$ per quadratic degree of freedom',
            'Maxwell-Boltzmann distribution $f(v) \\propto v^2 e^{-mv^2/2k_BT}$',
            'Mean, rms and most probable speed',
            'Mean free path $\\ell = 1/(\\sqrt{2}\\, n \\sigma)$',
            'Transport: viscosity, thermal conductivity, diffusion',
            'Effusion and the flux $\\tfrac{1}{4} n \\bar v$',
            'Frozen degrees of freedom (the first hint of quantum mechanics)',
          ],
          explanation: `Kinetic theory is where thermodynamics first touches molecules. Consider $N$ molecules of mass $m$ in a box of volume $V$. A molecule with velocity component $v_x$ hits the right wall every $2L/v_x$ and transfers momentum $2mv_x$. Summing over molecules, the pressure is $p = n m \\langle v_x^2 \\rangle = \\tfrac{1}{3} n m \\langle v^2\\rangle$ with $n = N/V$. Comparing with $pV = N k_B T$ gives the first microscopic meaning of temperature:
$$\\tfrac{1}{2} m \\langle v^2 \\rangle = \\tfrac{3}{2} k_B T .$$
This is a special case of **equipartition**: in classical equilibrium every quadratic term in the energy carries $\\tfrac{1}{2} k_B T$ on average. A monatomic gas has three translational terms, so $C_V = \\tfrac{3}{2} N k_B$; a rigid diatomic adds two rotations, $C_V = \\tfrac{5}{2} N k_B$; vibration should add two more. Measured $C_V$ for H$_2$ steps from $\\tfrac{3}{2}$ to $\\tfrac{5}{2}$ to $\\tfrac{7}{2}$ as $T$ rises. Classical physics cannot explain the steps; they are the first evidence that degrees of freedom can be **frozen out**, which only quantum mechanics (module 4) explains.

Maxwell found the velocity distribution in 1860 by a symmetry argument: the components are independent and the distribution depends only on speed, forcing a Gaussian in each component. The speed distribution is
$$f(v)\\,dv = 4\\pi \\left(\\frac{m}{2\\pi k_B T}\\right)^{3/2} v^2 e^{-mv^2/2k_BT}\\,dv,$$
with most probable speed $\\sqrt{2k_BT/m}$, mean $\\sqrt{8k_BT/\\pi m}$ and rms $\\sqrt{3k_BT/m}$. Know these three and why they are ordered as they are.

Collisions set the **mean free path** $\\ell = 1/(\\sqrt 2 n\\sigma)$, where $\\sigma \\approx \\pi d^2$ is the cross-section. For air at room conditions $\\ell \\approx 70$ nm, around 200 molecular diameters. Simple arguments then give viscosity $\\eta \\approx \\tfrac{1}{3} n m \\bar v \\ell$, which is independent of density, a prediction Maxwell himself found surprising and then confirmed experimentally.

Read Feynman I-39 and I-40 for the physical picture, then Tong's Kinetic Theory notes chapter 1 for the Boltzmann-equation view. The simulation exercise is important: you will reproduce the Maxwell distribution from nothing but Newton's laws.`,
          resources: [
            { ...feynman(39, 'The Kinetic Theory of Gases'), primary: true },
            feynman(40, 'The Principles of Statistical Mechanics'),
            { ...R.tongKinetic, note: 'Chapter 1 (From Liouville to BBGKY) is advanced; read section 1.1 and the discussion of the Maxwell distribution and transport in chapter 2.' },
            { ...R.openstax2, note: 'Chapter 2, Kinetic Theory: sections 2.2-2.4 on pressure, equipartition and the Maxwell distribution.' },
          ],
          exercises: [
            {
              slug: 'hard-sphere-gas-simulation',
              title: 'Simulate a hard-sphere gas and recover Maxwell',
              prompt:
                'Write a 2D event-driven or small-time-step molecular dynamics simulation of 400 hard discs in a box with elastic wall collisions. Start every disc with the same speed in a random direction. After enough collisions (thousands), histogram the speeds and compare with the 2D Maxwell distribution $f(v) = (m v/k_BT) e^{-mv^2/2k_BT}$, identifying $k_B T$ from the mean kinetic energy. Also measure pressure from wall momentum transfer per unit time and check $pA = N k_B T$ to within a few percent. Plot the histogram and the theory curve on the same axes.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'A simple approach: time-step with overlap detection and exchange of normal velocity components. Keep the box dilute (area fraction below 0.1) so the ideal gas law holds.',
            },
            {
              slug: 'maxwell-moments',
              title: 'Moments of the Maxwell distribution',
              prompt:
                'Starting from the normalised Maxwell speed distribution, derive the most probable, mean and rms speeds. Compute all three for N$_2$ at 300 K (answers near 422, 476 and 517 m/s). Then derive the effusion flux through a small hole, $\\Phi = \\tfrac{1}{4} n \\bar v$, and show that the mean kinetic energy of effusing molecules is $2 k_B T$, not $\\tfrac{3}{2} k_B T$. Explain the difference physically.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'mean-free-path-estimates',
              title: 'Mean free path and viscosity of air',
              prompt:
                'Using $d \\approx 0.37$ nm for N$_2$, compute the mean free path at 1 atm and 300 K and at the pressure of a laboratory vacuum ($10^{-6}$ mbar). Estimate the viscosity from $\\eta \\approx \\tfrac{1}{3} n m \\bar v \\ell$ and compare with the measured $1.8\\times10^{-5}$ Pa s. Explain why the estimate is independent of pressure and at what pressure that argument fails for a 10 cm apparatus.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the mean speed of a Maxwell gas larger than the most probable speed?',
              answerOutline:
                'The distribution is skewed with a long high-speed tail (the v² phase-space factor times a Gaussian), so the mean lies to the right of the peak; rms is larger still.',
            },
            {
              question: 'What does equipartition predict for C_V of a diatomic gas and why does the measured value change with temperature?',
              answerOutline:
                '7/2 Nk_B classically (3 translation + 2 rotation + 2 vibration). Measured values step up with T because rotational and vibrational quanta ($\\hbar\\omega$) exceed k_BT at low T and those modes freeze out.',
            },
            {
              question: 'Why is the viscosity of a dilute gas independent of its density?',
              answerOutline:
                'η ∝ n ℓ and ℓ ∝ 1/n, so n cancels: more carriers of momentum but each travels a shorter distance between collisions.',
            },
          ],
        },
        {
          slug: 'work-heat-and-the-first-law',
          title: 'Work, heat and the first law',
          summary:
            'Internal energy is a state function; heat and work are two ways of changing it. Quasi-static processes, heat capacities and adiabats of an ideal gas.',
          estimatedMinutes: 100,
          objectives: [
            'State the first law $dU = \\delta Q + \\delta W$ and explain why $U$ is exact while $Q$ and $W$ are not',
            'Compute work done in isothermal, isobaric, isochoric and adiabatic processes of an ideal gas',
            'Derive $C_p - C_V = N k_B$ for an ideal gas and the adiabatic relation $pV^\\gamma = $ const',
            'Explain the Joule expansion and why it shows $U$ of an ideal gas depends on $T$ alone',
          ],
          concepts: [
            'Internal energy $U$ as a state function',
            'Heat $Q$ and work $W$ as path-dependent transfers; inexact differentials',
            'Quasi-static (reversible) vs irreversible processes',
            'Work $\\delta W = -p\\,dV$ and the area under a $p$-$V$ curve',
            'Heat capacities $C_V$ and $C_p$; enthalpy $H = U + pV$',
            'Adiabatic index $\\gamma = C_p/C_V$',
            'Joule (free) expansion',
          ],
          explanation: `The **first law** is energy conservation with heat admitted as a form of energy transfer:
$$dU = \\delta Q + \\delta W .$$
The notation matters. $dU$ is an exact differential: integrate it around any closed loop in state space and you get zero, because $U$ is a property of the state. $\\delta Q$ and $\\delta W$ are not: the heat absorbed and the work done depend on the *path*. A gas taken from state A to state B by an isothermal route and by an adiabatic-then-isochoric route absorbs different heat and does different work, but ends with the same $U$. Confusing "the heat in a body" with a state function was the central error of the caloric theory, and students repeat it every year when they write $Q = C\\,\\Delta T$ without saying what process.

For a **quasi-static** process, one slow enough that the system is always in equilibrium, the work done *on* the gas is $\\delta W = -p\\,dV$. Then $C_V = (\\partial U/\\partial T)_V$ and, defining enthalpy $H = U + pV$, $C_p = (\\partial H/\\partial T)_p$. For an ideal gas $U = U(T)$ only, which Joule tested by letting a gas expand into vacuum (no work, no heat) and finding no temperature change. From this and $pV = N k_B T$ you can derive $C_p - C_V = N k_B$ and, for a reversible adiabat, $pV^\\gamma = \\text{const}$ with $\\gamma = C_p/C_V$ ($5/3$ monatomic, $7/5$ diatomic at room temperature). Adiabats are steeper than isotherms, which is why the Carnot cycle in the next lesson encloses a nonzero area.

A reliable technique for any process problem: draw it on a $p$-$V$ diagram, write $\\Delta U$ from the temperatures (state function!), compute $W$ as the signed area, and get $Q$ from the first law. Do not try to compute $Q$ directly.

Tong chapter 4.2-4.3 covers this crisply; OpenStax chapter 3 has many worked examples for fluency. Feynman I-44 gives the historical and physical setting. The exercises make you compute cycles numerically; the code you write will be reused for the Carnot analysis.`,
          resources: [
            { ...R.tong, note: 'Chapter 4, sections 4.2-4.3: the first law and heat capacities.', primary: true },
            { ...R.openstax2, note: 'Chapter 3, The First Law of Thermodynamics, including the worked examples on cycles.' },
            feynman(44, 'The Laws of Thermodynamics'),
            { ...R.mit8044, note: 'Lecture notes for weeks 1-2 (thermodynamic concepts, work and heat).' },
          ],
          exercises: [
            {
              slug: 'adiabat-derivation',
              title: 'Derive the adiabatic relations',
              prompt:
                'For an ideal gas with constant $C_V$, use the first law with $\\delta Q = 0$ and $pV = Nk_BT$ to derive $TV^{\\gamma-1} = $ const and $pV^\\gamma = $ const. Then compute the work done by one mole of helium ($\\gamma = 5/3$) expanding adiabatically from 1 L at 300 K to 3 L, and compare with isothermal expansion between the same volumes. Which does more work and why? (Answers: about 1.99 kJ adiabatic vs 2.74 kJ isothermal.)',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cycle-calculator',
              title: 'A numerical cycle calculator',
              prompt:
                'Write a Python function that takes a list of quasi-static ideal-gas process segments (type: isothermal/isobaric/isochoric/adiabatic, with endpoints) and returns $Q$, $W$ and $\\Delta U$ for each segment and for the whole cycle, plotting the cycle on a $p$-$V$ diagram. Verify on a rectangle in the $p$-$V$ plane that $\\sum \\Delta U = 0$ and that $W_{net}$ equals the enclosed area. Keep this code: you will reuse it for Carnot and Otto cycles.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'joule-expansion-vdw',
              title: 'Joule expansion of a van der Waals gas',
              prompt:
                'A van der Waals gas has $U = C_V T - aN^2/V$. It expands freely (no work, no heat) from volume $V_1$ to $2V_1$. Show the gas cools, compute the temperature drop for one mole of CO$_2$ from 1 L to 2 L (about 7 K using $C_V = 28$ J/(mol K)), and explain the sign in terms of intermolecular attraction. Why is there no cooling for an ideal gas?',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Explain in one sentence each why dU is exact but δQ is not.',
              answerOutline:
                'U is a function of the equilibrium state so its change is path independent; Q is defined only as a transfer along a process and different paths between the same states transfer different heat.',
            },
            {
              question: 'Why is C_p larger than C_V for a gas?',
              answerOutline:
                'At constant pressure part of the heat goes into pV work of expansion, so more heat is needed per degree; C_p − C_V = Nk_B for an ideal gas.',
            },
            {
              question: 'A gas is compressed rapidly by a piston. Is δW = −p dV valid?',
              answerOutline:
                'No: the process is not quasi-static, pressure is not uniform or well defined; the work is still done but must be computed from the piston force, and it exceeds the quasi-static value.',
            },
          ],
        },
        {
          slug: 'heat-engines-and-the-second-law',
          title: 'Heat engines, Carnot and the second law',
          summary:
            'The Kelvin and Clausius statements, the Carnot cycle, the universal efficiency bound, and the definition of thermodynamic temperature.',
          estimatedMinutes: 110,
          objectives: [
            'State the Kelvin-Planck and Clausius forms of the second law and prove they are equivalent',
            'Analyse the Carnot cycle on $p$-$V$ and $T$-$S$ diagrams and derive $\\eta = 1 - T_c/T_h$',
            "Prove Carnot's theorem: no engine between two reservoirs beats a reversible one",
            'Compute efficiencies and coefficients of performance for engines, refrigerators and heat pumps',
          ],
          concepts: [
            'Heat engine, reservoir, cycle',
            'Kelvin-Planck statement: no perfect engine',
            'Clausius statement: no perfect refrigerator',
            'Carnot cycle: two isotherms, two adiabats',
            "Carnot's theorem and reversibility",
            'Thermodynamic temperature via $Q_h/Q_c = T_h/T_c$',
            'Coefficient of performance',
            'Otto, Diesel and Stirling cycles',
          ],
          explanation: `The first law forbids engines that create energy; the **second law** forbids engines that merely convert heat fully into work. Kelvin's form: *no process has as its sole result the conversion of heat from a single reservoir into work*. Clausius's form: *no process has as its sole result the transfer of heat from a colder body to a hotter one*. They look different, but each implies the other: a Kelvin violator plus an ordinary refrigerator makes a Clausius violator, and vice versa. Do this proof yourself; it is the model for every "impossibility" argument in thermodynamics.

The **Carnot cycle** is the reversible engine: isothermal expansion at $T_h$ absorbing $Q_h$, adiabatic expansion to $T_c$, isothermal compression rejecting $Q_c$, adiabatic compression back. For an ideal gas you can compute each leg and find $Q_h/Q_c = T_h/T_c$, hence
$$\\eta_{Carnot} = 1 - \\frac{T_c}{T_h}.$$
**Carnot's theorem** says this is the maximum for *any* engine between those reservoirs, and that all reversible engines share it. The proof runs a hypothetical better engine forward and the Carnot engine backward as a refrigerator; the pair moves heat from cold to hot with no other effect, violating Clausius. Because the ratio $Q_h/Q_c$ of a reversible engine depends only on the reservoirs, Kelvin used it to *define* absolute temperature, independent of any thermometric substance. The ideal-gas temperature of lesson 1 and this thermodynamic temperature coincide, which is why the Carnot calculation worked.

Real engines are far from Carnot. A power station at $T_h = 800$ K, $T_c = 300$ K has a Carnot limit of 62% and achieves about 40%; the gap is irreversibility: finite temperature differences, friction, turbulence. Refrigerators and heat pumps are engines run backward; their coefficient of performance $Q_c/W$ can exceed 1, which confuses people who think of efficiency as capped at 100%.

Read Tong 4.3-4.4, then Feynman I-44 for the ratchet-free Carnot argument. Use your cycle calculator from the previous lesson on the exercises.`,
          resources: [
            { ...R.tong, note: 'Chapter 4, sections 4.3-4.4: second law, Carnot cycle and thermodynamic temperature.', primary: true },
            feynman(44, 'The Laws of Thermodynamics'),
            { ...R.openstax2, note: 'Chapter 4, The Second Law of Thermodynamics: heat engines, refrigerators, Carnot cycle, with examples.' },
            { ...R.susskind, note: 'Lectures 1-2 for a complementary, more statistical viewpoint on the second law.' },
          ],
          exercises: [
            {
              slug: 'kelvin-clausius-equivalence',
              title: 'Prove Kelvin and Clausius are equivalent',
              prompt:
                'Write a careful proof that a violation of the Kelvin-Planck statement implies a violation of the Clausius statement, and conversely. Draw the composite devices. Then prove Carnot\'s theorem (no engine beats a reversible one) and its corollary that all reversible engines between the same reservoirs have equal efficiency.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'carnot-ideal-gas',
              title: 'Carnot cycle for an ideal gas, by hand and by code',
              prompt:
                'By hand, compute $Q$, $W$ for each leg of a Carnot cycle of an ideal gas between $T_h$ and $T_c$ and show $Q_h/Q_c = T_h/T_c$. Then use your cycle calculator with $T_h = 500$ K, $T_c = 300$ K, $V_1 = 1$ L, $V_2 = 2$ L, one mole of a monatomic gas; plot the cycle in both the $p$-$V$ and $T$-$S$ planes (compute $S$ from $\\Delta S = Q_{rev}/T$ along each leg) and confirm $\\eta = 0.40$ numerically.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'otto-cycle-efficiency',
              title: 'Efficiency of the Otto cycle',
              prompt:
                'The Otto cycle (petrol engine idealisation) consists of two adiabats and two isochores. Show $\\eta = 1 - r^{1-\\gamma}$ where $r$ is the compression ratio. Evaluate for $r = 9$, $\\gamma = 1.4$ (about 58%) and compare with the Carnot bound using the maximum and minimum cycle temperatures. Explain why Otto is below Carnot even though both are reversible cycles.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Heat is absorbed over a range of temperatures, not from a single reservoir at the maximum temperature.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the Carnot cycle use adiabats and not, say, isochores to connect the two isotherms?',
              answerOutline:
                'Heat must be exchanged only at the two reservoir temperatures for reversibility; an isochore exchanges heat at intermediate temperatures with a reservoir at a different temperature, which is irreversible.',
            },
            {
              question: 'A heat pump has COP 4. What does that mean and is it consistent with energy conservation?',
              answerOutline:
                'It delivers 4 J of heat to the hot side per joule of work; the other 3 J came from the cold reservoir, so energy is conserved and the second law is respected provided COP ≤ T_h/(T_h − T_c).',
            },
            {
              question: 'How does the second law define a temperature scale with no reference to any substance?',
              answerOutline:
                'For any reversible engine Q_h/Q_c depends only on the reservoirs, so define T_h/T_c = Q_h/Q_c; one fixed point (the triple point of water, historically) sets the scale.',
            },
          ],
        },
      ],
      project: {
        slug: 'molecular-dynamics-thermometer',
        title: 'A molecular-dynamics gas that obeys thermodynamics',
        description: `Extend your hard-sphere simulation from lesson 2 into a tool that demonstrates the macroscopic laws. Add a movable piston wall with a prescribed force so you can compress the gas quasi-statically or suddenly, and record kinetic energy (temperature), wall momentum transfer (pressure) and volume versus time.

Use it to show: (1) $pV = Nk_BT$ in equilibrium; (2) a slow compression follows $pV^{\\gamma}$ with $\\gamma = 2$ in 2D; (3) a sudden compression ends at a higher temperature than a slow one between the same volumes (irreversibility); (4) two gases at different temperatures brought into thermal contact through a movable wall reach a common temperature.`,
        deliverables: [
          'Python package with the simulation and a notebook reproducing the four results with plots',
          'A short report comparing measured γ with the 2D prediction and quantifying the extra heating in sudden compression',
        ],
        estimatedHours: 8,
        stretchGoals: ['Measure the velocity autocorrelation function and extract a self-diffusion coefficient', 'Add a Lennard-Jones potential and show the equation of state deviates from ideal at high density'],
      },
    },
    {
      slug: 'entropy-and-thermodynamic-potentials',
      title: 'Entropy and Thermodynamic Potentials',
      description:
        'Entropy as a state function from the Clausius inequality, the thermodynamic potentials and Maxwell relations, chemical potential, and the third law.',
      lessons: [
        {
          slug: 'clausius-entropy',
          title: 'Entropy from the Clausius inequality',
          summary:
            'The Clausius inequality turns the second law into a state function: entropy. Entropy changes for reversible and irreversible processes, and the entropy of an ideal gas.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the Clausius inequality $\\oint \\delta Q/T \\le 0$ from Carnot\'s theorem',
            'Define entropy via $dS = \\delta Q_{rev}/T$ and prove it is a state function',
            'Compute entropy changes for heating, mixing, free expansion and heat flow between bodies',
            'State the entropy form of the second law and use it to decide which processes are possible',
          ],
          concepts: [
            'Clausius inequality',
            'Entropy $S$ as a state function; $dS = \\delta Q_{rev}/T$',
            'Second law: $\\Delta S_{universe} \\ge 0$',
            'Entropy of an ideal gas $S = Nk_B[\\ln(V T^{3/2}) + \\text{const}]$',
            'Entropy generation in irreversible processes',
            'Fundamental relation $dU = T\\,dS - p\\,dV + \\mu\\,dN$',
            '$T$-$S$ diagrams',
          ],
          explanation: `Carnot's theorem contains a hidden state function. Any reversible cycle can be approximated by many thin Carnot cycles, and for each $Q_h/T_h = Q_c/T_c$; summing with signs gives $\\oint \\delta Q_{rev}/T = 0$. A quantity whose integral around every closed path vanishes is the differential of a function of state, so define
$$dS = \\frac{\\delta Q_{rev}}{T}.$$
This is **entropy**. For an irreversible engine Carnot's theorem gives less work per unit heat, which becomes the **Clausius inequality** $\\oint \\delta Q/T \\le 0$, and from that the working form of the second law: for any process, $dS \\ge \\delta Q/T$, with equality only when reversible. For an isolated system $\\delta Q = 0$ so $\\Delta S \\ge 0$.

Two consequences you must internalise. First, $S$ is a state function, so to compute $\\Delta S$ for an *irreversible* process, invent any *reversible* path between the same endpoints and integrate $\\delta Q_{rev}/T$ along it. For the Joule expansion of an ideal gas from $V$ to $2V$ no heat flows, yet $\\Delta S = Nk_B \\ln 2 > 0$, found by using a reversible isothermal expansion instead. Second, combining with the first law gives the **fundamental relation**
$$dU = T\\,dS - p\\,dV + \\mu\\,dN ,$$
from which $T = (\\partial U/\\partial S)_{V,N}$ and $p = -(\\partial U/\\partial V)_{S,N}$. Everything in thermodynamics follows from $U(S,V,N)$ or equivalently $S(U,V,N)$.

For an ideal gas, integrating gives $S = Nk_B\\left[\\ln V + \\tfrac{3}{2}\\ln T\\right] + \\text{const}$. The undetermined constant, and the fact that this expression is not properly extensive, are flaws that statistical mechanics will fix in module 4 (the Sackur-Tetrode equation).

Read Tong 4.4 and Feynman I-44 sections 6-7; then do the exercises, which drill the one skill everybody fumbles: computing $\\Delta S$ for irreversible processes by choosing reversible paths.`,
          resources: [
            { ...R.tong, note: 'Chapter 4, section 4.4: entropy and the Clausius inequality.', primary: true },
            feynman(44, 'The Laws of Thermodynamics'),
            { ...R.openstax2, note: 'Chapter 4, sections 4.6-4.7 on entropy and entropy on a microscopic scale.' },
            { ...R.mit8044, note: 'Problem set 2-3 for practice computing entropy changes.' },
          ],
          exercises: [
            {
              slug: 'entropy-changes-catalogue',
              title: 'A catalogue of entropy changes',
              prompt:
                'Compute $\\Delta S$ of the system and of the universe for: (a) 1 kg of water heated from 20 °C to 80 °C by a reservoir at 80 °C; (b) the same heating by first a 50 °C reservoir then an 80 °C reservoir; (c) two 1 kg blocks of copper at 0 °C and 100 °C placed in contact in isolation; (d) one mole of ideal gas expanding freely to double its volume; (e) mixing one mole each of two different ideal gases at the same T and p. Show the universe entropy change is positive in every case and tends to zero in (b) as the number of intermediate reservoirs grows.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'clausius-inequality-proof',
              title: 'From Carnot to Clausius',
              prompt:
                'Prove the Clausius inequality by coupling an arbitrary cyclic device, which exchanges heat $\\delta Q$ at temperatures $T$, to a single reservoir at $T_0$ through small Carnot engines, and applying the Kelvin statement to the composite. Then show that the result implies $S$ is a state function and that $dS \\ge \\delta Q/T$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'ts-diagram-cycles',
              title: 'Cycles on the T-S diagram',
              prompt:
                'Extend your cycle calculator to plot each cycle in the $T$-$S$ plane using the ideal-gas entropy formula. Show that the Carnot cycle is a rectangle, that the enclosed area equals the net work for any reversible cycle, and that an Otto cycle has curved isochores. Explain why the $T$-$S$ representation makes Carnot\'s optimality visually obvious.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A gas expands freely into vacuum with no heat exchange. Why is its entropy change not zero?',
              answerOutline:
                'dS = δQ_rev/T applies only along reversible paths; free expansion is irreversible. Using a reversible isothermal path between the same states gives ΔS = Nk_B ln(V₂/V₁) > 0.',
            },
            {
              question: 'What is the physical content of dS ≥ δQ/T?',
              answerOutline:
                'Entropy can increase without heat input (internal generation by irreversibility) but can only be decreased by exporting heat; the equality holds for reversible processes.',
            },
            {
              question: 'Why does the ideal gas entropy S = Nk_B[ln V + (3/2) ln T] + c fail to be extensive, and what is missing?',
              answerOutline:
                'Doubling N and V doubles the ln V term incorrectly (ln 2V ≠ 2 ln V); the correct formula has ln(V/N), which arises from indistinguishability of particles (the N! in statistical mechanics).',
            },
          ],
        },
        {
          slug: 'thermodynamic-potentials-and-maxwell-relations',
          title: 'Thermodynamic potentials and Maxwell relations',
          summary:
            'Legendre transforms produce $H$, $F$ and $G$, each natural for a different experimental situation; their mixed second derivatives give the Maxwell relations.',
          estimatedMinutes: 110,
          objectives: [
            'Construct $H$, $F$ and $G$ as Legendre transforms of $U$ and state the natural variables of each',
            'Derive the four Maxwell relations and use them to express unmeasurable derivatives in terms of measurable ones',
            'Show that $F$ is minimised at fixed $T, V$ and $G$ at fixed $T, p$',
            'Compute $C_p - C_V = TV\\alpha^2/\\kappa_T$ for a general substance',
          ],
          concepts: [
            'Legendre transform',
            'Enthalpy $H = U + pV$; natural variables $(S, p)$',
            'Helmholtz free energy $F = U - TS$; natural variables $(T, V)$',
            'Gibbs free energy $G = U - TS + pV$; natural variables $(T, p)$',
            'Maxwell relations from equality of mixed partials',
            'Minimum principles for potentials',
            'Measurable response functions: $C_p$, $\\alpha$, $\\kappa_T$',
          ],
          explanation: `The fundamental relation $dU = T\\,dS - p\\,dV$ is complete but inconvenient: nobody controls entropy in the lab. A **Legendre transform** swaps an independent variable for its conjugate derivative without losing information, exactly as the Hamiltonian $H = p\\dot q - L$ swaps $\\dot q$ for $p$ in mechanics. Three transforms matter:
$$H = U + pV,\\quad dH = T\\,dS + V\\,dp;\\qquad F = U - TS,\\quad dF = -S\\,dT - p\\,dV;\\qquad G = U - TS + pV,\\quad dG = -S\\,dT + V\\,dp.$$
Each is the "energy" appropriate to what is held fixed. Enthalpy is for constant-pressure heat flow (chemists' reaction heats are $\\Delta H$). The Helmholtz free energy $F$ is for constant $T$ and $V$: the second law implies $dF \\le 0$ for spontaneous processes, so $F$ is *minimised* at equilibrium, and $-\\Delta F$ is the maximum work extractable isothermally. The Gibbs free energy does the same at fixed $T$ and $p$, which is why it governs phase transitions and chemistry.

Because each potential is a state function, mixed second derivatives commute, and that yields the **Maxwell relations**, e.g. from $dF$:
$$\\left(\\frac{\\partial S}{\\partial V}\\right)_T = \\left(\\frac{\\partial p}{\\partial T}\\right)_V .$$
The left side is unmeasurable directly; the right side comes from the equation of state. This is the main practical use of the potentials: turn any derivative involving $S$ into derivatives of $p$, $V$, $T$. The standard result $C_p - C_V = TV\\alpha^2/\\kappa_T$ is the showcase; for liquids and solids it explains why the two heat capacities differ by a few percent.

Tong section 4.5 is the primary reading. The mnemonic square (Born diagram) is in most texts and worth learning, but it is more important to be able to re-derive a Maxwell relation in 30 seconds from the appropriate differential. The exercises make you do exactly that, including one that is not in the standard set.`,
          resources: [
            { ...R.tong, note: 'Chapter 4, section 4.5: thermodynamic potentials and Maxwell relations.', primary: true },
            { ...R.schroeder, note: 'Chapter 5 of the book is the clearest textbook treatment; the course page has free problem sets. Free alternative: Tong chapter 4.' },
            { ...R.mit560, note: 'Lectures 8-12 on free energies and Maxwell relations from the chemists\' perspective.' },
            { ...R.libretexts, note: 'Search "Maxwell relations" for additional worked derivations.' },
          ],
          exercises: [
            {
              slug: 'maxwell-relations-derivation',
              title: 'Derive all four Maxwell relations and use one',
              prompt:
                'From $dU$, $dH$, $dF$, $dG$ derive the four Maxwell relations. Then prove the general identity $C_p - C_V = TV\\alpha^2/\\kappa_T$ and evaluate it for liquid water at 20 °C ($\\alpha = 2.07\\times10^{-4}\\ \\mathrm{K^{-1}}$, $\\kappa_T = 4.6\\times10^{-10}\\ \\mathrm{Pa^{-1}}$, molar volume $18\\ \\mathrm{cm^3}$); the result is about 0.5 J/(mol K), compared with $C_p \\approx 75$ J/(mol K).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'energy-volume-dependence',
              title: 'How does U depend on V at fixed T?',
              prompt:
                'Show that $(\\partial U/\\partial V)_T = T(\\partial p/\\partial T)_V - p$. Evaluate it for an ideal gas (zero, consistent with Joule) and for a van der Waals gas ($aN^2/V^2$). Then show that for a photon gas with $p = u/3$ where $u = U/V$ depends only on $T$, the identity forces $u \\propto T^4$: the Stefan-Boltzmann law from pure thermodynamics.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'rubber-band-thermodynamics',
              title: 'Thermodynamics of a rubber band',
              prompt:
                'A rubber band of length $L$ under tension $f$ has $dU = T\\,dS + f\\,dL$. Write down the analogue of $F$ and the Maxwell relation $(\\partial S/\\partial L)_T = -(\\partial f/\\partial T)_L$. Experimentally $f$ increases with $T$ at fixed $L$. Deduce the sign of $(\\partial S/\\partial L)_T$, predict whether a band warms or cools when stretched adiabatically, and test it by stretching a band against your lip.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do we need four potentials rather than just U?',
              answerOutline:
                'Each is a function of a different set of natural variables matching different constraints (S,V), (S,p), (T,V), (T,p); the one whose variables are held fixed is minimised at equilibrium and gives the available work.',
            },
            {
              question: 'Where do Maxwell relations come from mathematically?',
              answerOutline:
                'Equality of mixed second partial derivatives of a state function (an exact differential), applied to each potential.',
            },
            {
              question: 'Why is −ΔF the maximum work at constant T?',
              answerOutline:
                'W_on ≥ ΔU − TΔS = ΔF from dS ≥ δQ/T with T fixed; equality for reversible processes, so work extracted ≤ −ΔF.',
            },
          ],
        },
        {
          slug: 'chemical-potential-and-open-systems',
          title: 'Chemical potential, open systems and equilibrium conditions',
          summary:
            'The chemical potential governs particle exchange. Equilibrium conditions, the Gibbs-Duhem relation and the Euler equation for extensive systems.',
          estimatedMinutes: 100,
          objectives: [
            'Define the chemical potential as $\\mu = (\\partial U/\\partial N)_{S,V} = (\\partial G/\\partial N)_{T,p}$ and interpret its sign',
            'Derive the conditions for thermal, mechanical and diffusive equilibrium between subsystems',
            'Derive the Euler relation $U = TS - pV + \\mu N$ and the Gibbs-Duhem relation',
            'Compute $\\mu$ for an ideal gas and explain why it is negative',
          ],
          concepts: [
            'Chemical potential $\\mu$',
            'Open systems and particle exchange',
            'Equilibrium conditions: equal $T$, equal $p$, equal $\\mu$',
            'Euler relation from extensivity',
            'Gibbs-Duhem relation $S\\,dT - V\\,dp + N\\,d\\mu = 0$',
            'Grand potential $\\Phi = F - \\mu N = -pV$',
            'Ideal gas $\\mu = k_BT \\ln(n\\lambda^3)$',
          ],
          explanation: `When particles can move between systems, a third conjugate pair joins $(T,S)$ and $(p,V)$: the **chemical potential** $\\mu$ and $N$. Formally $\\mu = (\\partial U/\\partial N)_{S,V}$, the energy cost of adding one particle at fixed entropy and volume. More usefully, $\\mu = (\\partial G/\\partial N)_{T,p}$, so for a pure substance $\\mu = G/N$: the Gibbs free energy per particle.

The equilibrium conditions follow from maximising total entropy of two subsystems that can exchange energy, volume and particles. Writing $dS_{tot} = 0$ with $dU_1 = -dU_2$ etc. gives $T_1 = T_2$, $p_1 = p_2$, $\\mu_1 = \\mu_2$. Particles flow from high $\\mu$ to low $\\mu$, just as heat flows from high $T$ to low $T$. That rule governs diffusion, osmosis, chemical reactions (lesson 7.2), phase coexistence (module 6), and the band structure of semiconductors.

**Extensivity** gives a powerful constraint. Since $U(\\lambda S, \\lambda V, \\lambda N) = \\lambda U(S,V,N)$, differentiating with respect to $\\lambda$ at $\\lambda = 1$ yields the **Euler relation** $U = TS - pV + \\mu N$, so $G = \\mu N$ and the grand potential $\\Phi = U - TS - \\mu N = -pV$. Taking $d$ of Euler and subtracting the fundamental relation gives **Gibbs-Duhem**, $S\\,dT - V\\,dp + N\\,d\\mu = 0$: the intensive variables are not independent. A single-component system has only two intensive degrees of freedom, which is why a phase diagram is two-dimensional.

For an ideal gas you will find $\\mu = k_BT \\ln(n \\lambda^3)$, where $\\lambda = h/\\sqrt{2\\pi m k_B T}$ is the thermal de Broglie wavelength (module 4 derives it). It is negative whenever $n\\lambda^3 \\ll 1$, i.e. in the classical regime: adding a particle to a dilute gas at fixed $S$ and $V$ *lowers* the energy, because the extra particle gains a lot of entropy and the others must cool to compensate. Students find this sign counter-intuitive; work through the exercise that resolves it.

Read Tong 4.6-4.7 and Schroeder chapter 3.5 if you have it. Then the exercises.`,
          resources: [
            { ...R.tong, note: 'Chapter 4, sections 4.6-4.7 on the chemical potential and the grand potential.', primary: true },
            { ...R.schroeder, note: 'Section 3.5 on chemical potential has the best physical discussion. Free alternative: Tong.' },
            { ...R.mit8044, note: 'Lecture notes on the chemical potential and the grand canonical ensemble preview.' },
          ],
          exercises: [
            {
              slug: 'euler-gibbs-duhem',
              title: 'Euler and Gibbs-Duhem from extensivity',
              prompt:
                'Derive the Euler relation from the homogeneity of $U(S,V,N)$ and then the Gibbs-Duhem relation. Use Gibbs-Duhem to show that for an ideal gas at fixed $T$, $\\mu(p) = \\mu(p_0) + k_BT \\ln(p/p_0)$. Explain why this makes $\\mu$ the natural variable for describing equilibrium across a semipermeable membrane and derive the van \'t Hoff osmotic pressure $\\Pi = n_{solute} k_B T$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'why-mu-is-negative',
              title: 'Why is μ negative for an ideal gas?',
              prompt:
                'Using $S = Nk_B[\\ln(V/N\\lambda^3) + 5/2]$ (Sackur-Tetrode, derived in module 4), compute $\\mu = -T(\\partial S/\\partial N)_{U,V}$ and show $\\mu = k_BT\\ln(n\\lambda^3)$. Evaluate for N$_2$ at 300 K and 1 atm (about $-0.4$ eV) and for a hypothetical gas with $n\\lambda^3 = 1$. Write a paragraph explaining the sign in terms of entropy and why $\\mu$ must become positive when quantum degeneracy sets in.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'equilibrium-conditions',
              title: 'Equilibrium between two subsystems',
              prompt:
                'Two ideal gases (same species) are separated by a wall that becomes diathermal, movable and permeable in turn. Starting from $S_{tot}(U_1,V_1,N_1)$ with $U_2 = U - U_1$ etc., derive the conditions for each stage and compute the final state for $N_1 = N_2 = 1$ mol, $T_1 = 300$ K, $T_2 = 400$ K, $V_1 = 1$ L, $V_2 = 2$ L. Verify numerically (code the entropy and maximise it) that your analytic answer is the maximum.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'In which direction do particles flow between two systems at the same T and p but different μ?',
              answerOutline:
                'From higher μ to lower μ; this increases total entropy (dS = −(μ₁−μ₂)dN₁/T).',
            },
            {
              question: 'Why can a pure substance have only two independent intensive variables?',
              answerOutline:
                'Gibbs-Duhem links dT, dp and dμ; fixing two fixes the third.',
            },
            {
              question: 'What is the grand potential and why does it equal −pV?',
              answerOutline:
                'Φ = U − TS − μN, natural variables (T,V,μ); the Euler relation U = TS − pV + μN gives Φ = −pV.',
            },
          ],
        },
        {
          slug: 'the-third-law-and-low-temperatures',
          title: 'The third law and the approach to absolute zero',
          summary:
            'Nernst\'s postulate, its consequences for heat capacities and expansion coefficients, the unattainability of absolute zero, and how refrigeration actually works.',
          estimatedMinutes: 80,
          objectives: [
            'State the Nernst form of the third law and the unattainability statement',
            'Show that the third law forces $C \\to 0$ and $\\alpha \\to 0$ as $T \\to 0$',
            'Explain adiabatic demagnetisation and laser/evaporative cooling in thermodynamic terms',
            'Compute absolute entropies from heat-capacity data',
          ],
          concepts: [
            'Nernst postulate: $S \\to S_0$ as $T \\to 0$, independent of other variables',
            'Residual entropy and ground-state degeneracy',
            'Consequences: heat capacities and expansion coefficient vanish',
            'Unattainability of absolute zero',
            'Adiabatic demagnetisation',
            'Absolute entropy from $\\int C_p\\,dT/T$',
            'Evaporative cooling and Bose-Einstein condensation (preview)',
          ],
          explanation: `The **third law** fixes the arbitrary constant in entropy. Nernst's form: as $T \\to 0$ the entropy of a system approaches a constant $S_0$ that does not depend on any other parameter ($V$, $p$, magnetic field, composition). Planck took $S_0 = 0$ for perfect crystals. Statistical mechanics (module 3) explains both: $S = k_B \\ln \\Omega$ and a non-degenerate ground state has $\\Omega = 1$. Systems with frozen-in disorder, like ice with its hydrogen-bond arrangements, keep a **residual entropy** ($k_B \\ln(3/2)$ per molecule for ice, Pauling's famous estimate, confirmed by experiment).

The law has sharp consequences. Since $S(T) = S_0 + \\int_0^T C\\,dT'/T'$ must converge, the heat capacity must vanish as $T \\to 0$: classical equipartition, with constant $C_V$, violates the third law. Debye's $C \\propto T^3$ for solids and the electron $C \\propto T$ in metals (module 5) obey it. From the Maxwell relation $(\\partial S/\\partial p)_T = -(\\partial V/\\partial T)_p$ and $S$'s independence from $p$ at $T = 0$, the thermal expansion coefficient vanishes too.

The **unattainability** form says no finite sequence of processes reaches $T = 0$. Picture cooling by alternating isothermal entropy removal and adiabatic steps between two curves $S(T, X_1)$ and $S(T, X_2)$: because both curves meet at $S_0$ when $T = 0$, each step gets smaller and the zigzag never arrives. Real refrigeration follows exactly this pattern. **Adiabatic demagnetisation** uses a paramagnet: magnetise isothermally (entropy of the spins drops as they align), then demagnetise adiabatically (spins disorder, drawing heat from the lattice). Evaporative cooling of atomic gases is the same idea with the hottest atoms as the "entropy carrier"; it reaches nanokelvins and produces Bose-Einstein condensates.

This is a short lesson. Read Tong 4.4 (end) and Schroeder's section on the third law; spend most of your time on the exercise computing an absolute entropy from real data.`,
          resources: [
            { ...R.tong, note: 'End of chapter 4 on the third law; chapter 1.3 for the statistical view of S→0.', primary: true },
            { ...R.mit560, note: 'Lecture on the third law and absolute entropies (chemists use these in every reaction table).' },
            {
              title: 'NIST Chemistry WebBook',
              url: 'https://webbook.nist.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Tabulated heat capacities and standard entropies; use for the absolute-entropy exercise.',
            },
          ],
          exercises: [
            {
              slug: 'absolute-entropy-from-cp',
              title: 'Absolute entropy of a solid from heat-capacity data',
              prompt:
                'Take tabulated $C_p(T)$ for copper or aluminium (NIST WebBook, or a Debye model with $\\Theta_D = 343$ K for Cu). Numerically integrate $\\int_0^{298} C_p\\,dT/T$, using the $T^3$ law below the lowest data point, and compare with the standard molar entropy $S^\\circ_{298} = 33.2$ J/(mol K) for Cu. Plot $S(T)$ and the integrand $C_p/T$.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'third-law-consequences',
              title: 'Consequences of the third law',
              prompt:
                'Prove that the third law requires (a) $C_V, C_p \\to 0$, (b) $\\alpha \\to 0$, and (c) that the Carnot efficiency can never reach 1. Then show that a classical ideal gas with $S = Nk_B[\\ln V + \\frac{3}{2}\\ln T] + c$ violates (a) and explain why a real gas escapes the contradiction.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'adiabatic-demagnetisation',
              title: 'Model adiabatic demagnetisation',
              prompt:
                'For a paramagnet of $N$ spin-1/2 moments, the entropy depends on $B/T$ only (module 3 derives $S(B/T)$). Argue from this that an adiabatic reduction of $B$ from $B_i$ to $B_f$ lowers $T$ to $T_f = T_i B_f/B_i$. With $B_i = 1$ T, $T_i = 1$ K, $B_f = 0.01$ T, what $T_f$ results? Why does a residual internal field prevent $T_f \\to 0$ as $B_f \\to 0$?',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the third law forbid a constant heat capacity down to T = 0?',
              answerOutline:
                'S(T) − S(0) = ∫C dT/T would diverge logarithmically; C must vanish at least as fast as a positive power of T.',
            },
            {
              question: 'What is residual entropy and does it violate the third law?',
              answerOutline:
                'Entropy from a degenerate (or kinetically frozen) ground state, e.g. ice; it does not violate the Nernst form (S→ constant independent of parameters) but violates Planck\'s S→0 for a perfect crystal.',
            },
            {
              question: 'Explain why absolute zero cannot be reached with finitely many steps.',
              answerOutline:
                'All S(T, X) curves converge to the same S₀ at T = 0, so isothermal and adiabatic steps between two curves become ever smaller and never reach the axis.',
            },
          ],
        },
      ],
    },
    {
      slug: 'statistical-foundations',
      title: 'Statistical Foundations',
      description:
        'Microstates and multiplicity, Boltzmann\'s $S = k_B \\ln\\Omega$, the microcanonical ensemble, the ergodic hypothesis, and entropy as information.',
      lessons: [
        {
          slug: 'microstates-macrostates-and-multiplicity',
          title: 'Microstates, macrostates and multiplicity',
          summary:
            'Counting the microscopic arrangements consistent with a macroscopic description, for a two-state paramagnet and an Einstein solid, and why the counts are astronomically peaked.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish microstates from macrostates and define the multiplicity $\\Omega$',
            'Count microstates for a two-state paramagnet and an Einstein solid using binomial and multinomial coefficients',
            'Use Stirling\'s approximation to show $\\ln\\Omega$ is extensive and that $\\Omega$ is sharply peaked about the most probable macrostate',
            'Explain why "all accessible microstates are equally likely" leads to the second law',
          ],
          concepts: [
            'Microstate vs macrostate',
            'Multiplicity $\\Omega$',
            'Fundamental postulate: equal a priori probabilities',
            'Two-state paramagnet: $\\Omega = \\binom{N}{N_\\uparrow}$',
            'Einstein solid: $\\Omega = \\binom{q+N-1}{q}$',
            'Stirling\'s approximation $\\ln N! \\approx N\\ln N - N$',
            'Sharpness of the multiplicity peak: width $\\sim \\sqrt{N}$',
            'Interacting systems and the most probable energy split',
          ],
          explanation: `A **macrostate** is what thermodynamics sees: $N$, $U$, $V$, magnetisation. A **microstate** is the full microscopic specification: every spin, every position and momentum. The number of microstates compatible with a macrostate is the **multiplicity** $\\Omega$. Statistical mechanics rests on one postulate: *an isolated system in equilibrium is equally likely to be in any of its accessible microstates.* Everything else is counting.

Two toy systems carry most of the intuition. A **two-state paramagnet** of $N$ spins with $N_\\uparrow$ up has $\\Omega = \\binom{N}{N_\\uparrow}$. An **Einstein solid** of $N$ oscillators sharing $q$ energy quanta has $\\Omega = \\binom{q+N-1}{q}$ (stars and bars). For $N = 100$ these are big numbers; for $N = 10^{23}$ they are so big that only $\\ln\\Omega$ is usable, and **Stirling's approximation** $\\ln N! \\approx N\\ln N - N$ makes $\\ln\\Omega$ computable and shows it is *extensive*: it scales with $N$.

Now couple two Einstein solids A and B and share $q$ quanta between them. The total multiplicity for a given split is $\\Omega_A(q_A)\\Omega_B(q - q_A)$. Plot it: for $N_A = N_B = 300$ it is already a narrow peak; in general its relative width shrinks like $1/\\sqrt{N}$. With $N \\sim 10^{23}$ the peak has relative width $10^{-11}$. That is the **second law** in embryo: the system does not "want" to go to the most probable macrostate, it simply wanders among equally likely microstates and almost all of them belong to that macrostate. Irreversibility is probability, not dynamics.

The identification you will make next lesson, $S = k_B\\ln\\Omega$, then turns "most probable" into "maximum entropy", and the condition for the peak, $\\partial\\ln\\Omega_A/\\partial q_A = \\partial \\ln\\Omega_B/\\partial q_B$, into "equal temperatures".

Read Tong chapter 1.1-1.2 and Sethna chapter 3. Schroeder's chapter 2 is the gentlest version if you can access it. The coding exercise, where you enumerate and plot the multiplicities, is the one that makes the sharp-peak idea believable.`,
          resources: [
            { ...R.tong, note: 'Chapter 1, sections 1.1-1.2: the fundamental assumption and the microcanonical ensemble.', primary: true },
            { ...R.sethna, note: 'Chapter 3 (Temperature and equilibrium) and chapter 2 exercises on random walks.' },
            { ...R.schroeder, note: 'Chapter 2 (The Second Law) is the gentlest counting-based introduction. Free alternative: Sethna.' },
            { ...R.susskind, note: 'Lecture 2 on entropy and counting states.' },
          ],
          exercises: [
            {
              slug: 'einstein-solid-multiplicity',
              title: 'Multiplicities of coupled Einstein solids',
              prompt:
                'Write Python that computes $\\Omega(N, q)$ for an Einstein solid using log-gamma to avoid overflow. For two solids with $N_A = N_B = 300$ and $q = 600$, plot $\\Omega_A\\Omega_B$ versus $q_A$ and measure the full width at half maximum. Repeat for $N = 3000$ and $30000$ and show the relative width scales as $1/\\sqrt{N}$. Then compute the probability that $q_A$ deviates by more than 10% from the mean for $N = 30000$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stirling-and-extensivity',
              title: 'Stirling\'s approximation and the extensive entropy',
              prompt:
                'Derive Stirling\'s approximation from $\\ln N! = \\sum \\ln k \\approx \\int_1^N \\ln x\\,dx$ and quantify the error for $N = 10, 100, 1000$ against the exact value (also derive the next term $\\tfrac{1}{2}\\ln(2\\pi N)$). Apply it to the paramagnet to show $\\ln\\Omega \\approx N[-x\\ln x - (1-x)\\ln(1-x)]$ with $x = N_\\uparrow/N$, and to the Einstein solid in the high-temperature limit $q \\gg N$ to show $\\ln\\Omega \\approx N\\ln(eq/N)$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fundamental-postulate-essay',
              title: 'Why equal probabilities?',
              prompt:
                'Write 300 words defending the postulate of equal a priori probabilities. Address: what "accessible" means, why Liouville\'s theorem makes the uniform distribution on the energy shell stationary, and why the sharpness of the multiplicity peak makes the predictions insensitive to the postulate\'s details.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the multiplicity of the macrostate "all 100 spins up" versus "50 up, 50 down"?',
              answerOutline:
                '1 versus C(100,50) ≈ 1.0 × 10^29; the balanced macrostate is overwhelmingly more probable.',
            },
            {
              question: 'Why is ln Ω rather than Ω the useful quantity?',
              answerOutline:
                'ln Ω is extensive (additive for independent systems since Ω multiplies) and of manageable size; it is what becomes entropy.',
            },
            {
              question: 'In what sense does the second law follow from counting?',
              answerOutline:
                'Almost all accessible microstates belong to the macrostate with maximal Ω; a system wandering among microstates is found there with probability 1 − (tiny), so entropy effectively never decreases.',
            },
          ],
        },
        {
          slug: 'boltzmann-entropy-and-the-microcanonical-ensemble',
          title: 'Boltzmann entropy, temperature and the microcanonical ensemble',
          summary:
            '$S = k_B\\ln\\Omega$ makes statistical entropy coincide with Clausius entropy; temperature and pressure emerge as derivatives of $\\ln\\Omega$.',
          estimatedMinutes: 110,
          objectives: [
            'Define $S = k_B\\ln\\Omega$ and show it is additive and maximised in equilibrium',
            'Derive $1/T = (\\partial S/\\partial U)_{V,N}$ and $p/T = (\\partial S/\\partial V)_{U,N}$ from the condition of maximum multiplicity',
            'Compute $S(U)$, $T(U)$ and $C$ for the two-state paramagnet and Einstein solid, including negative temperatures',
            'Count the phase-space volume of a classical ideal gas and obtain the Sackur-Tetrode entropy',
          ],
          concepts: [
            'Boltzmann entropy $S = k_B \\ln\\Omega$',
            'Microcanonical ensemble',
            'Temperature as $1/T = \\partial S/\\partial U$',
            'Negative temperature in bounded spectra',
            'Phase space volume and $h^{3N}$',
            'Gibbs factor $1/N!$ and the Gibbs paradox',
            'Sackur-Tetrode equation',
            'Equipartition derived',
          ],
          explanation: `Boltzmann's tombstone carries the equation that founded the subject:
$$S = k_B \\ln\\Omega .$$
The logarithm makes $S$ additive for independent systems and extensive; the constant fixes the units. Everything in modules 1-2 now has a microscopic meaning. Two systems exchanging energy settle at the split that maximises $\\Omega_A\\Omega_B$, i.e. $\\partial S_A/\\partial U_A = \\partial S_B/\\partial U_B$. Since equilibrium means equal temperature, we identify
$$\\frac{1}{T} = \\left(\\frac{\\partial S}{\\partial U}\\right)_{V,N}, \\qquad \\frac{p}{T} = \\left(\\frac{\\partial S}{\\partial V}\\right)_{U,N}, \\qquad -\\frac{\\mu}{T} = \\left(\\frac{\\partial S}{\\partial N}\\right)_{U,V}.$$
This is the **microcanonical ensemble**: fix $U$, count, differentiate.

Apply it to the two-state paramagnet in field $B$ with $U = -\\mu_B B(N_\\uparrow - N_\\downarrow)$. You get $S(U)$ as an inverted parabola-like curve; $1/T = \\partial S/\\partial U$ is positive on the low-energy side and *negative* on the high-energy side, where more than half the spins point against the field. **Negative temperatures** are hotter than any positive temperature (heat flows from them to anything else) and are realised in nuclear spin systems and cold-atom experiments. They are only possible when the energy spectrum is bounded above.

For a classical gas, "counting" means measuring phase-space volume in units of $h^{3N}$ (Planck's constant appears even classically, to make $\\Omega$ dimensionless). The volume of a $3N$-dimensional sphere gives $\\Omega \\propto V^N U^{3N/2}$, and so $U = \\tfrac{3}{2}Nk_BT$: equipartition is derived, not assumed. But the result is not extensive unless you divide by $N!$ for indistinguishable particles. Gibbs saw this before quantum mechanics justified it. With the $N!$ you obtain the **Sackur-Tetrode equation**
$$S = Nk_B\\left[\\ln\\frac{V}{N\\lambda^3} + \\frac{5}{2}\\right], \\qquad \\lambda = \\frac{h}{\\sqrt{2\\pi m k_B T}},$$
which agrees with measured entropies of noble gases to four digits. Checking it against data is one of your exercises.

Read Tong 1.2-1.3 and Sethna chapter 3; MIT 8.333 lectures 7-8 (Kardar) give the careful phase-space treatment.`,
          resources: [
            { ...R.tong, note: 'Chapter 1, sections 1.2-1.3 and the Sackur-Tetrode derivation in chapter 2.2.', primary: true },
            { ...R.mit8333, note: 'Lectures 7-8: microcanonical ensemble, phase space, Gibbs paradox.' },
            { ...R.sethna, note: 'Chapter 3, including the exercise on negative temperatures.' },
            {
              title: 'NIST Chemistry WebBook — gas-phase thermochemistry (standard entropies)',
              url: 'https://webbook.nist.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Look up S° for Ar, Ne, Kr to test Sackur-Tetrode.',
            },
          ],
          exercises: [
            {
              slug: 'paramagnet-thermodynamics',
              title: 'Full thermodynamics of the two-state paramagnet',
              prompt:
                'Using $\\Omega = \\binom{N}{N_\\uparrow}$ and Stirling, derive $S(U)$, then $T(U)$, invert to get $U(T) = -N\\mu_B B\\tanh(\\mu_B B/k_BT)$, the magnetisation and the heat capacity (Schottky anomaly). Plot $S$, $T$ and $C$ versus $U$ in Python and mark the negative-temperature region. Show that $C$ has a maximum near $k_BT \\approx 0.8\\,\\mu_B B$ and explain it physically.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sackur-tetrode-check',
              title: 'Test the Sackur-Tetrode equation against data',
              prompt:
                'Compute the Sackur-Tetrode entropy for argon, neon and krypton at 298.15 K and 1 bar, and compare with the NIST standard molar entropies (Ar: 154.8 J/(mol K)). Then show what the formula predicts without the $N!$ term and that it fails extensivity: compute $S(2N, 2V, 2U) - 2S(N,V,U)$ in both versions.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'phase-space-sphere',
              title: 'Phase-space volume of the ideal gas',
              prompt:
                'Derive the volume of a $d$-dimensional ball of radius $R$, $V_d = \\pi^{d/2}R^d/\\Gamma(d/2+1)$, by computing the Gaussian integral $\\int e^{-|x|^2}d^dx$ two ways. Use it to find $\\Omega(U,V,N)$ for $N$ free particles in a box, then $S$, $T(U)$ and $p$. Show the pressure obeys $pV = Nk_BT$ and that almost all the volume of a high-dimensional ball lies within a thin shell near its surface, so counting states "with energy ≤ U" and "with energy in [U, U+δU]" give the same entropy to leading order.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a system at negative temperature hotter than any system at positive temperature?',
              answerOutline:
                'Its entropy decreases when it gains energy, so giving energy to any positive-T system raises total entropy; heat flows out of it. Ordering by 1/T, −0 is hotter than +∞.',
            },
            {
              question: 'Where does Planck\'s constant enter the entropy of a classical gas?',
              answerOutline:
                'Phase-space volume must be made dimensionless by dividing by h^{3N} (one state per h per degree of freedom); it only shifts S by a constant but is needed for absolute entropy.',
            },
            {
              question: 'What goes wrong without the 1/N! and how does quantum mechanics justify it?',
              answerOutline:
                'Entropy becomes non-extensive and mixing identical gases appears to increase entropy (Gibbs paradox); identical particles are indistinguishable, so permuted configurations are the same state.',
            },
            {
              question: 'How is temperature defined in the microcanonical ensemble?',
              answerOutline:
                '1/T = (∂S/∂U)_{V,N}, the rate at which the log of the number of accessible states grows with energy.',
            },
          ],
        },
        {
          slug: 'phase-space-ergodicity-and-the-arrow-of-time',
          title: 'Phase space, Liouville, ergodicity and the arrow of time',
          summary:
            'Why a uniform distribution on the energy shell is stationary, what the ergodic hypothesis claims, and how reversible dynamics produces irreversible behaviour.',
          estimatedMinutes: 90,
          objectives: [
            'State Liouville\'s theorem and explain why it makes the microcanonical distribution stationary',
            'Explain the ergodic hypothesis and the difference between time averages and ensemble averages',
            'Resolve Loschmidt\'s reversibility objection and Zermelo\'s recurrence objection to the second law',
            'Describe Boltzmann\'s H-theorem and the molecular-chaos assumption qualitatively',
          ],
          concepts: [
            'Phase space and the energy shell',
            'Liouville\'s theorem: phase-space flow is incompressible',
            'Ergodic hypothesis; time average = ensemble average',
            'Mixing and coarse-graining',
            'Loschmidt\'s paradox (reversibility)',
            'Poincaré recurrence and Zermelo\'s objection',
            'Boltzmann H-theorem and Stosszahlansatz',
            'Typicality and the initial-condition origin of the arrow of time',
          ],
          explanation: `The microcanonical ensemble assigns equal probability to all microstates on the energy shell. Why is that consistent with the dynamics? **Liouville's theorem** (from classical-mechanics) says Hamiltonian flow preserves phase-space volume: $\\partial\\rho/\\partial t + \\{\\rho, H\\} = 0$. A distribution that is constant on the energy shell is therefore stationary. Equilibrium is self-consistent. But Liouville does not say the uniform distribution is *reached*; that is the content of the **ergodic hypothesis**: a single trajectory visits every region of the energy shell with frequency proportional to its volume, so the long-time average of any observable equals its ensemble average. Ergodicity is proved for very few systems (hard-sphere gases, famously by Sinai) and is false for integrable ones, yet statistical mechanics works superbly. The reason is the sharp peak of lesson 1: almost every microstate gives the equilibrium value, so you do not need the trajectory to explore everything, only to avoid an atypical set of tiny measure.

Two classical objections sharpen the picture. **Loschmidt**: the equations are time-reversible, so for every entropy-increasing trajectory there is an entropy-decreasing one. True, but the decreasing ones start in the atypical set; reversing all velocities of a gas that has just expanded does put you there, and the gas recompresses, briefly, until the slightest perturbation destroys the correlations. **Zermelo**: Poincaré recurrence guarantees the system returns near its initial state. True, after a time of order $e^{N}$, far longer than the age of the universe. Boltzmann's **H-theorem** derives a monotonically decreasing $H = \\int f\\ln f$ from the Boltzmann equation, but only because the *Stosszahlansatz* assumes colliding molecules are uncorrelated before each collision, which is an asymmetric assumption about the past.

The modern consensus is that the arrow of time comes from a low-entropy initial condition (ultimately, the early universe), not from the dynamics. Sethna chapter 5 and Tong's Kinetic Theory chapter 2 are the readings; Feynman I-46 (the ratchet and pawl) is the classic physical discussion.`,
          resources: [
            { ...R.sethna, note: 'Chapter 4 (Phase-space dynamics and ergodicity) and chapter 5 (Entropy), including the exercises on Liouville and the arrow of time.', primary: true },
            { ...R.tongKinetic, note: 'Chapter 1 for Liouville and the BBGKY hierarchy; chapter 2 for the Boltzmann equation and the H-theorem.' },
            feynman(46, 'Ratchet and Pawl'),
            { ...R.mit8333, note: 'Lectures 4-6 cover Liouville, BBGKY and the Boltzmann equation with full derivations.' },
          ],
          exercises: [
            {
              slug: 'liouville-check',
              title: 'Liouville\'s theorem numerically',
              prompt:
                'Integrate a cloud of 10,000 initial conditions for the pendulum $H = p^2/2 - \\cos q$ with a symplectic integrator (leapfrog) and with forward Euler. Track the area of the convex hull or the local density of a small blob as it stretches and folds. Show that leapfrog preserves phase-space area to round-off while Euler inflates it, and plot the stretched blob at several times to see mixing.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'loschmidt-reversal',
              title: 'Reverse the velocities',
              prompt:
                'Using your hard-sphere gas from module 1, start all particles in the left half of the box, run until they spread uniformly, then reverse all velocities and continue. Show that the gas returns to the left half. Repeat with a $10^{-10}$ relative perturbation to one velocity before reversal and observe the recompression fail. Discuss what this says about Loschmidt\'s objection and the role of correlations.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'kac-ring',
              title: 'The Kac ring model',
              prompt:
                'Implement the Kac ring: $N$ sites on a ring, each carrying a black or white ball, with $M$ marked edges; each step every ball moves one site and flips colour crossing a marked edge. Starting from all black, plot the number of black balls versus time for $N = 1000$, $M = 100$, and compare with the molecular-chaos prediction $B(t) - W(t) = N(1 - 2\\mu)^t$ where $\\mu = M/N$. Show that the exact dynamics recur at $t = 2N$ (or $N$) and explain why the Stosszahlansatz works at short times.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does Liouville\'s theorem say and what does it imply for the microcanonical distribution?',
              answerOutline:
                'Hamiltonian flow preserves phase-space volume (dρ/dt = 0 along trajectories); a distribution uniform on the energy shell is therefore time-independent.',
            },
            {
              question: 'Does statistical mechanics require the ergodic hypothesis to be true?',
              answerOutline:
                'Not strictly: because the equilibrium macrostate occupies almost all of the energy shell, typical trajectories give equilibrium values whether or not they explore everything.',
            },
            {
              question: 'How is Zermelo\'s recurrence objection answered?',
              answerOutline:
                'Recurrence times for macroscopic systems are of order exp(N), astronomically larger than any observation time; entropy decreases only over such times.',
            },
          ],
          relatedLessons: ['classical-mechanics/hamiltonian-mechanics-and-symmetry/phase-space-and-liouvilles-theorem'],
        },
        {
          slug: 'shannon-entropy-and-maximum-entropy',
          title: 'Gibbs-Shannon entropy and the maximum-entropy principle',
          summary:
            'Entropy as missing information, the Gibbs entropy $-k_B\\sum p_i\\ln p_i$, and the derivation of the Boltzmann distribution by maximising entropy under constraints.',
          estimatedMinutes: 90,
          objectives: [
            'Define the Shannon entropy and state the properties that uniquely characterise it',
            'Show that the Gibbs entropy reduces to $k_B\\ln\\Omega$ for a uniform distribution',
            'Derive the Boltzmann distribution by maximising entropy at fixed mean energy using Lagrange multipliers',
            'Interpret the Lagrange multiplier as $1/k_BT$ and explain the MaxEnt view of ensembles',
          ],
          concepts: [
            'Shannon entropy $H = -\\sum p_i \\log p_i$',
            'Gibbs entropy $S = -k_B\\sum p_i\\ln p_i$',
            'Maximum-entropy principle (Jaynes)',
            'Lagrange multipliers and constraints',
            'Boltzmann distribution $p_i \\propto e^{-\\beta E_i}$',
            'Entropy of a continuous distribution and the Gaussian',
            'Information-theoretic meaning of $k_B T$',
          ],
          explanation: `Boltzmann's $S = k_B\\ln\\Omega$ assumes equal probabilities. Gibbs generalised it to any distribution $\\{p_i\\}$ over microstates:
$$S = -k_B\\sum_i p_i\\ln p_i ,$$
which equals $k_B\\ln\\Omega$ when $p_i = 1/\\Omega$ and is smaller for any non-uniform distribution. Shannon rediscovered the same functional in 1948 as the unique measure of the *information missing* when you know only the probabilities, up to a constant; the characterising properties are continuity, maximum at uniformity, and additivity for independent systems (Shannon's paper, in the resources, proves uniqueness in two pages and is very readable).

Jaynes turned this into a method. Suppose you know only the mean energy $\\langle E\\rangle = \\sum p_i E_i$. The least-biased distribution consistent with that knowledge is the one that maximises $S$ subject to the constraints $\\sum p_i = 1$ and $\\sum p_i E_i = U$. Lagrange multipliers give immediately
$$p_i = \\frac{e^{-\\beta E_i}}{Z}, \\qquad Z = \\sum_i e^{-\\beta E_i},$$
the **Boltzmann distribution**, with $\\beta$ fixed by the energy constraint. Comparing $dS$ with $dU$ identifies $\\beta = 1/k_BT$. Next module derives the same distribution dynamically, by coupling to a heat bath; the agreement is what makes MaxEnt convincing. Constrain the mean particle number too and you get the grand canonical ensemble. Constrain the second moment of a continuous variable and you get a Gaussian, which is why Maxwell's velocity distribution is Gaussian.

The MaxEnt viewpoint also clarifies what $k_BT$ is: the energy cost per nat of information, the exchange rate between energy and missing information. That reading pays off in module 7, where Landauer's principle sets the minimum energy to erase a bit at $k_BT\\ln 2$.

Read Tong 1.4, Jaynes's 1957 paper (the resource) and Shannon's section 6. The exercises implement MaxEnt numerically; the Lagrange-multiplier machinery is standard multivariable calculus, see the linked math-methods lesson if it is rusty.`,
          resources: [
            { ...R.tong, note: 'Chapter 1, section 1.4 on the Gibbs entropy and section 1.3 on the canonical ensemble from maximum entropy.', primary: true },
            {
              title: 'Jaynes (1957) — Information Theory and Statistical Mechanics',
              url: 'https://bayes.wustl.edu/etj/articles/theory.1.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Washington University (E. T. Jaynes archive)',
              note: 'The original MaxEnt paper; sections 1-4 are enough.',
            },
            {
              title: 'Shannon (1948) — A Mathematical Theory of Communication',
              url: 'https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf',
              type: 'article',
              cost: 'free',
              provider: 'Harvard Mathematics (mirror)',
              note: 'Section 6 defines entropy and proves its uniqueness.',
            },
            { ...R.sethna, note: 'Chapter 5, especially 5.3 on entropy as ignorance and the exercises on information.' },
          ],
          exercises: [
            {
              slug: 'maxent-numerical',
              title: 'Maximum entropy with constraints, numerically',
              prompt:
                'For a system with energy levels $E_n = n\\epsilon$, $n = 0..20$, write code that finds the distribution maximising $-\\sum p_n\\ln p_n$ subject to $\\sum p_n = 1$ and $\\sum p_n E_n = U$ for $U = 2\\epsilon, 5\\epsilon, 10\\epsilon$, using scipy.optimize with constraints. Show the result is $e^{-\\beta E_n}/Z$ by fitting $\\ln p_n$ against $E_n$, and report $\\beta$ for each $U$. Then add a constraint on $\\langle E^2\\rangle$ and show the solution becomes a Gaussian in $E$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'shannon-uniqueness',
              title: 'Properties of the Shannon entropy',
              prompt:
                'Prove that $H(p) = -\\sum p_i\\ln p_i$ (a) is maximised by the uniform distribution (use Jensen or Lagrange multipliers), (b) is additive for independent systems, and (c) satisfies the grouping property $H(p_1,\\dots,p_n) = H(p_1 + p_2, p_3, \\dots) + (p_1+p_2)H\\!\\left(\\frac{p_1}{p_1+p_2}, \\frac{p_2}{p_1+p_2}\\right)$. Compute the entropy in bits of a fair die, a loaded die with $p(6) = 1/2$, and the English alphabet with its letter frequencies.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gaussian-from-maxent',
              title: 'Maxwell\'s distribution as a MaxEnt distribution',
              prompt:
                'Show that the continuous distribution maximising $-\\int p\\ln p\\,dv$ subject to a fixed mean of $v^2$ is Gaussian, and that fixing the mean kinetic energy of three velocity components reproduces the Maxwell-Boltzmann distribution. Discuss the subtlety that continuous entropy depends on the choice of measure, and why phase-space measure ($d^3x\\,d^3p/h^3$) is the right one.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does the Gibbs entropy relate to the Boltzmann entropy?',
              answerOutline:
                'S = −k_B Σ p ln p reduces to k_B ln Ω for the uniform distribution and is smaller for any other; Boltzmann\'s is the special (microcanonical) case.',
            },
            {
              question: 'What does the Lagrange multiplier for the energy constraint turn out to be?',
              answerOutline:
                'β = 1/k_BT; it follows from comparing dS = k_B β dU with the thermodynamic dS = dU/T.',
            },
            {
              question: 'In the MaxEnt view, what is the status of the canonical distribution: a fact about dynamics or about inference?',
              answerOutline:
                'Inference: it is the least-biased assignment given the mean energy. Its agreement with the dynamical heat-bath derivation (next module) is what makes it physically correct.',
            },
          ],
          relatedLessons: ['math-methods/multivariable-calculus/lagrange-multipliers-and-optimization'],
        },
      ],
    },
    {
      slug: 'canonical-ensembles',
      title: 'The Canonical and Grand Canonical Ensembles',
      description:
        'The partition function as the central object of statistical mechanics: its derivation from a heat bath, free energy and fluctuations, the classical ideal gas, molecular degrees of freedom, and the grand canonical ensemble.',
      lessons: [
        {
          slug: 'the-canonical-ensemble-and-partition-function',
          title: 'The canonical ensemble and the partition function',
          summary:
            'A system in contact with a heat bath has Boltzmann-distributed microstates; the partition function $Z$ encodes all its thermodynamics and its fluctuations.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the Boltzmann distribution for a small system in thermal contact with a large reservoir',
            'Compute $U$, $S$, $F$, $p$ and $C_V$ from $Z$ and show $F = -k_BT\\ln Z$',
            'Show that energy fluctuations satisfy $\\langle(\\Delta E)^2\\rangle = k_BT^2 C_V$ and are negligible for macroscopic systems',
            'Explain why canonical and microcanonical ensembles agree in the thermodynamic limit',
          ],
          concepts: [
            'Heat bath and the canonical ensemble',
            'Boltzmann factor $e^{-\\beta E}$',
            'Partition function $Z = \\sum_i e^{-\\beta E_i}$',
            'Helmholtz free energy $F = -k_BT\\ln Z$',
            '$U = -\\partial\\ln Z/\\partial\\beta$',
            'Energy fluctuations and heat capacity',
            'Equivalence of ensembles',
            'Factorisation of $Z$ for independent subsystems',
          ],
          explanation: `Fixing the energy exactly is unnatural; real systems sit in contact with surroundings at temperature $T$. Consider a system S with microstates $i$ of energy $E_i$, coupled weakly to a huge reservoir R so that $E_{tot} = E_i + E_R$ is fixed. The probability of microstate $i$ is proportional to the number of reservoir states with energy $E_{tot} - E_i$:
$$p_i \\propto \\Omega_R(E_{tot} - E_i) = e^{S_R(E_{tot}-E_i)/k_B} \\approx e^{S_R(E_{tot})/k_B}\\,e^{-E_i/k_BT},$$
expanding $S_R$ to first order because $E_i \\ll E_{tot}$ and using $\\partial S_R/\\partial E = 1/T$. Hence $p_i = e^{-\\beta E_i}/Z$ with $\\beta = 1/k_BT$. Note what happened: the bath's enormous multiplicity is what weights lower system energies; the system does not "prefer" low energy, the universe prefers the states where the bath has more.

The **partition function** $Z(T,V,N) = \\sum_i e^{-\\beta E_i}$ is a generating function for everything:
$$U = -\\frac{\\partial\\ln Z}{\\partial\\beta},\\quad F = -k_BT\\ln Z,\\quad S = -\\frac{\\partial F}{\\partial T},\\quad p = -\\frac{\\partial F}{\\partial V},\\quad C_V = k_B\\beta^2\\frac{\\partial^2\\ln Z}{\\partial\\beta^2}.$$
The last formula also equals $\\langle E^2\\rangle - \\langle E\\rangle^2$ divided by $k_BT^2$, which gives the **fluctuation-response** relation $\\langle(\\Delta E)^2\\rangle = k_BT^2C_V$. Since $C_V \\propto N$, the relative fluctuation is $\\Delta E/U \\sim 1/\\sqrt N$: for a macroscopic system the canonical energy is as sharp as the microcanonical one, which is why the two ensembles give the same thermodynamics. For small systems (a protein, a nanoparticle) they differ, and the canonical one is usually right.

For non-interacting subsystems $Z$ factorises: $Z = Z_1^N$ for distinguishable particles, $Z_1^N/N!$ for identical classical particles. This is why the whole next lesson is about computing $Z_1$.

Tong chapter 1.3 is the primary derivation; Kardar's lecture 9 gives it with full rigour. The exercises make you compute $Z$ for small systems by hand and numerically, and verify the fluctuation formula by Monte Carlo sampling, a warm-up for the Ising capstone.`,
          resources: [
            { ...R.tong, note: 'Chapter 1, section 1.3: canonical ensemble, free energy, fluctuations.', primary: true },
            { ...R.mit8333, note: 'Lecture 9 (canonical ensemble) and problem set 4.' },
            { ...R.susskind, note: 'Lectures 3-5 develop the Boltzmann distribution and partition function slowly and physically.' },
            { ...R.sethna, note: 'Chapter 6 (Free energies), sections 6.1-6.3.' },
          ],
          exercises: [
            {
              slug: 'two-level-and-oscillator-z',
              title: 'Partition functions of a two-level system and an oscillator',
              prompt:
                'Compute $Z$, $U$, $S$ and $C$ for (a) a two-level system with energies $0, \\epsilon$ and (b) a quantum harmonic oscillator with $E_n = \\hbar\\omega(n + 1/2)$. Plot $C(T)$ for both in Python and identify the Schottky peak and the Einstein heat capacity. Show that the oscillator result gives $C \\to k_B$ at high $T$ (equipartition) and $C \\propto e^{-\\hbar\\omega/k_BT}$ at low $T$. Explain why a two-level system\'s $C$ vanishes at high $T$ while the oscillator\'s does not.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fluctuation-response-mc',
              title: 'Verify the fluctuation-response relation by sampling',
              prompt:
                'For $N = 100$ independent two-level systems at several temperatures, sample microstates from the Boltzmann distribution (each unit independently), compute the variance of total energy over $10^5$ samples, and compare with $k_BT^2C_V$ from the analytic $C_V$. Plot both versus $T$. Then show the relative fluctuation $\\sigma_E/U$ scales as $N^{-1/2}$ by repeating for $N = 10, 100, 1000$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'ensemble-equivalence',
              title: 'Canonical versus microcanonical for the Einstein solid',
              prompt:
                'For an Einstein solid of $N$ oscillators, compute $U(T)$ canonically (from $Z_1^N$) and microcanonically (from $\\Omega(q,N)$ and $1/T = \\partial S/\\partial U$) and plot the two curves for $N = 3, 30, 300$. Show they converge as $N$ grows and quantify the difference at $k_BT = \\hbar\\omega$ as a function of $N$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the Boltzmann factor favour low-energy microstates if all microstates of the combined system are equally likely?',
              answerOutline:
                'A low system energy leaves more energy for the reservoir, which has exponentially more microstates; the weighting comes from the reservoir\'s multiplicity, e^{S_R/k_B}.',
            },
            {
              question: 'State the relation between energy fluctuations and heat capacity and its consequence.',
              answerOutline:
                '⟨(ΔE)²⟩ = k_BT²C_V; since C_V ∝ N, relative fluctuations go as N^{-1/2}, so macroscopic canonical and microcanonical descriptions coincide.',
            },
            {
              question: 'Why is F = −k_BT ln Z the natural thermodynamic potential of the canonical ensemble?',
              answerOutline:
                'Its natural variables (T,V,N) are exactly what the ensemble fixes; all other quantities follow by differentiation, and F is minimised at equilibrium at fixed T,V.',
            },
          ],
        },
        {
          slug: 'the-classical-ideal-gas',
          title: 'The classical ideal gas from the partition function',
          summary:
            'Compute the single-particle partition function, meet the thermal de Broglie wavelength, and derive the ideal gas law, Sackur-Tetrode entropy and chemical potential in a few lines.',
          estimatedMinutes: 100,
          objectives: [
            'Evaluate $Z_1 = V/\\lambda^3$ by integrating over phase space or summing over box states',
            'Derive $pV = Nk_BT$, $U = \\tfrac{3}{2}Nk_BT$, Sackur-Tetrode $S$ and $\\mu = k_BT\\ln(n\\lambda^3)$ from $Z = Z_1^N/N!$',
            'Explain the physical meaning of $\\lambda$ and the criterion $n\\lambda^3 \\ll 1$ for classical behaviour',
            'Derive the barometric formula and the Maxwell distribution as canonical-ensemble results',
          ],
          concepts: [
            'Single-particle partition function $Z_1$',
            'Thermal de Broglie wavelength $\\lambda = h/\\sqrt{2\\pi mk_BT}$',
            'Density of states in a box',
            'Classical limit $n\\lambda^3 \\ll 1$',
            'Sackur-Tetrode from $Z$',
            'Gibbs paradox resolved',
            'Barometric formula and external potentials',
          ],
          explanation: `A free particle of mass $m$ in a box of volume $V$ has
$$Z_1 = \\frac{1}{h^3}\\int d^3x\\,d^3p\\; e^{-\\beta p^2/2m} = \\frac{V}{\\lambda^3},\\qquad \\lambda = \\frac{h}{\\sqrt{2\\pi mk_BT}} .$$
The same result follows from summing $e^{-\\beta E}$ over the quantum states $E = \\hbar^2k^2/2m$ with $\\mathbf k = \\pi\\mathbf n/L$, converting the sum to an integral; do it both ways, because the quantum route is the one that generalises to module 5. The **thermal wavelength** $\\lambda$ is the de Broglie wavelength of a particle with thermal momentum. $Z_1 = V/\\lambda^3$ counts the number of "thermal cells" in the box, and the classical treatment is valid when each cell holds far fewer than one particle, $n\\lambda^3 \\ll 1$. For air at room temperature $n\\lambda^3 \\sim 10^{-7}$; for conduction electrons in copper it is $\\sim 10^3$, and they are degenerate.

With $Z = Z_1^N/N!$ (identical particles), $F = -k_BT\\ln Z$ gives, after Stirling,
$$F = Nk_BT\\left[\\ln(n\\lambda^3) - 1\\right],$$
and then $p = -\\partial F/\\partial V = Nk_BT/V$, $U = \\tfrac{3}{2}Nk_BT$, $S$ = Sackur-Tetrode, and $\\mu = \\partial F/\\partial N = k_BT\\ln(n\\lambda^3)$. Four classic results in four lines; that economy is the whole case for the canonical ensemble. The $N!$ is essential: without it $F$ is not extensive and mixing two volumes of the same gas appears to raise entropy.

An external potential $\\phi(\\mathbf x)$ simply multiplies the integrand by $e^{-\\beta\\phi}$; the density is then $n(\\mathbf x) \\propto e^{-\\beta\\phi(\\mathbf x)}$. With $\\phi = mgz$ that is the **barometric formula**, and the momentum part of the same integrand is the **Maxwell distribution**, now derived rather than guessed.

Read Tong 2.1-2.2 and Kardar lecture 10. The numerical exercise asks you to compute $Z_1$ by brute-force summation over box states and watch it converge to $V/\\lambda^3$, which is the best way to see when the classical approximation fails.`,
          resources: [
            { ...R.tong, note: 'Chapter 2, sections 2.1-2.2: the classical ideal gas, including the Gibbs paradox.', primary: true },
            { ...R.mit8333, note: 'Lecture 10 and problem set 5.' },
            { ...R.schroeder, note: 'Sections 6.6-6.7 on the ideal gas partition function. Free alternative: Tong chapter 2.' },
          ],
          exercises: [
            {
              slug: 'z1-by-summation',
              title: 'Compute Z₁ by summing over box states',
              prompt:
                'For a particle in a cubic box of side $L$, compute $Z_1 = \\sum_{n_x,n_y,n_z \\ge 1} e^{-\\beta\\hbar^2\\pi^2(n_x^2+n_y^2+n_z^2)/2mL^2}$ numerically for helium at $L = 10$ nm and $T$ from 0.01 K to 100 K. Plot the ratio of the sum to $V/\\lambda^3$ versus $L/\\lambda$ and identify where the classical formula fails (below $L/\\lambda \\sim$ a few). Explain the deviation in terms of the discreteness of levels.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ideal-gas-from-f',
              title: 'All of ideal-gas thermodynamics from F',
              prompt:
                'Starting from $Z = (V/\\lambda^3)^N/N!$, derive $F$, $p$, $U$, $S$, $\\mu$, $C_V$ and $C_p$. Then redo the calculation without the $N!$ and show explicitly that $S$ is not extensive and that mixing two identical gases at the same $T$ and $p$ gives a spurious $\\Delta S = 2Nk_B\\ln 2$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'barometric-and-centrifuge',
              title: 'Gases in external fields',
              prompt:
                'Derive the barometric formula $n(z) = n_0 e^{-mgz/k_BT}$ and compute the scale height for N$_2$ at 250 K (about 7.5 km). Then treat a gas centrifuge rotating at $\\omega$: in the rotating frame the effective potential is $-\\tfrac{1}{2}m\\omega^2 r^2$. Find $n(r)$ and compute the enrichment ratio of $^{235}$UF$_6$ to $^{238}$UF$_6$ between axis and wall for $r = 10$ cm, $\\omega = 2\\pi\\times 1000$ Hz at 300 K.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the thermal de Broglie wavelength and what does nλ³ ≪ 1 mean?',
              answerOutline:
                'λ = h/√(2πmk_BT), the quantum wavelength of a thermal particle; nλ³ ≪ 1 means wave packets do not overlap, so quantum statistics (and the exchange symmetry) are irrelevant.',
            },
            {
              question: 'Where does the ideal gas law come from in the canonical calculation?',
              answerOutline:
                'Z ∝ V^N so F = −k_BT ln Z contains −Nk_BT ln V; p = −∂F/∂V = Nk_BT/V.',
            },
            {
              question: 'How does the canonical ensemble produce the Maxwell velocity distribution?',
              answerOutline:
                'The Boltzmann weight e^{−βp²/2m} for a single particle\'s momentum, normalised, is a Gaussian in each component; converting to speed gives the Maxwell distribution.',
            },
          ],
        },
        {
          slug: 'molecules-paramagnets-and-equipartition-limits',
          title: 'Diatomic molecules, paramagnets and the limits of equipartition',
          summary:
            'Rotational and vibrational partition functions explain the stepwise heat capacity of gases; the paramagnet gives Curie\'s law. Quantum levels and $k_BT$ decide which degrees of freedom count.',
          estimatedMinutes: 100,
          objectives: [
            'Factorise the molecular partition function into translational, rotational, vibrational and electronic parts',
            'Compute $Z_{rot}$ and $Z_{vib}$ and derive the high- and low-temperature limits of $C_V$ for a diatomic gas',
            'Derive Curie\'s law for a spin-1/2 paramagnet from $Z$ and compute the magnetisation curve',
            'Explain, using characteristic temperatures, when equipartition applies',
          ],
          concepts: [
            'Factorisation $Z_1 = Z_{trans}Z_{rot}Z_{vib}Z_{el}$',
            'Rotational temperature $\\Theta_{rot} = \\hbar^2/2Ik_B$',
            'Vibrational temperature $\\Theta_{vib} = \\hbar\\omega/k_B$',
            'Freezing out of degrees of freedom',
            'Symmetry number for homonuclear molecules',
            'Paramagnet: $M = N\\mu\\tanh(\\mu B/k_BT)$',
            'Curie\'s law $\\chi \\propto 1/T$',
            'Ortho/para hydrogen (nuclear spin statistics)',
          ],
          explanation: `When a molecule's energy separates into independent parts, $E = E_{trans} + E_{rot} + E_{vib} + \\dots$, the single-molecule partition function factorises, $Z_1 = Z_{trans}Z_{rot}Z_{vib}\\cdots$, and the free energies add. Each factor contributes to $C_V$ only when $k_BT$ is comparable to or larger than its level spacing. This resolves the puzzle from module 1.

**Rotation.** A rigid rotor has $E_J = \\hbar^2J(J+1)/2I$ with degeneracy $2J+1$, so $Z_{rot} = \\sum_J (2J+1)e^{-J(J+1)\\Theta_{rot}/T}$ with $\\Theta_{rot} = \\hbar^2/2Ik_B$ ($\\approx 2.9$ K for N$_2$, 85 K for H$_2$). For $T \\gg \\Theta_{rot}$ the sum becomes an integral, $Z_{rot} \\approx T/\\Theta_{rot}$, and rotation contributes $k_B$ per molecule to $C_V$ (two quadratic degrees of freedom, as equipartition says). For homonuclear molecules you must divide by a symmetry number 2, because rotating by $\\pi$ gives the same configuration; for hydrogen the full story involves nuclear spin and the famous ortho/para mixture.

**Vibration.** $Z_{vib} = \\sum_n e^{-(n+1/2)\\Theta_{vib}/T} = \\frac{e^{-\\Theta_{vib}/2T}}{1 - e^{-\\Theta_{vib}/T}}$ with $\\Theta_{vib} = \\hbar\\omega/k_B \\approx 3400$ K for N$_2$. At room temperature vibration is frozen and $C_V = \\tfrac{5}{2}Nk_B$; above $\\sim 1000$ K it unfreezes toward $\\tfrac{7}{2}Nk_B$. The heat-capacity curve of a diatomic gas is thus a staircase whose step positions measure $I$ and $\\omega$: spectroscopy by calorimetry.

**Paramagnet.** For $N$ spin-1/2 moments $\\mu$ in field $B$, $Z_1 = 2\\cosh(\\beta\\mu B)$, so $M = N\\mu\\tanh(\\mu B/k_BT)$. For weak fields $M \\approx N\\mu^2B/k_BT$: **Curie's law**, the $1/T$ susceptibility used to measure low temperatures. Compare with the microcanonical derivation in module 3 and note how much shorter this is.

Read Tong 2.4 (and 2.3 on the Debye model preview, which you will revisit in module 5), then Schroeder 6.2 if available. The exercises have you compute the full $C_V(T)$ staircase of hydrogen and compare with data.`,
          resources: [
            { ...R.tong, note: 'Chapter 2, section 2.4 on diatomic gases and section 1.3 example on the paramagnet.', primary: true },
            { ...R.mit8044, note: 'Lecture notes on the canonical ensemble applied to paramagnets and molecular gases.' },
            {
              title: 'NIST Chemistry WebBook — constants of diatomic molecules and gas-phase heat capacities',
              url: 'https://webbook.nist.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Look up B_e (rotational constant) and ω_e for H₂, N₂, Cl₂ and C_p(T) tables.',
            },
          ],
          exercises: [
            {
              slug: 'diatomic-heat-capacity-staircase',
              title: 'The heat-capacity staircase of a diatomic gas',
              prompt:
                'Using NIST rotational and vibrational constants for H$_2$ ($\\Theta_{rot} = 85$ K, $\\Theta_{vib} = 6330$ K) and Cl$_2$, compute $Z_{rot}$ (direct summation, no high-T approximation) and $Z_{vib}$ and plot $C_V/Nk_B$ from 10 K to 5000 K. Reproduce the 3/2 → 5/2 → 7/2 staircase and compare the room-temperature value with NIST\'s $C_p - R$. For H$_2$ include the ortho/para statistics (odd $J$ weight 3, even $J$ weight 1) and compare with the "normal hydrogen" curve.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'paramagnet-curie',
              title: 'Paramagnet: magnetisation, susceptibility and entropy',
              prompt:
                'From $Z_1 = 2\\cosh(\\beta\\mu B)$ derive $M(T,B)$, the susceptibility, the entropy $S(B/T)$ and the heat capacity. Show $S$ depends on $B/T$ only and use this to re-derive the adiabatic demagnetisation cooling rule from module 2. Plot $M/N\\mu$ versus $\\mu B/k_BT$ and the Brillouin function for spin $J = 1, 3/2, 7/2$ (gadolinium) for comparison.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rotational-partition-asymptotics',
              title: 'Euler-Maclaurin corrections to Z_rot',
              prompt:
                'Show that $Z_{rot} = \\frac{T}{\\Theta_{rot}} + \\frac{1}{3} + \\frac{\\Theta_{rot}}{15T} + \\dots$ using the Euler-Maclaurin formula, and compute the corresponding correction to $C_V$. At what $T/\\Theta_{rot}$ is the correction to $C_V$ below 1%?',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does vibration not contribute to the heat capacity of N₂ at room temperature?',
              answerOutline:
                'ħω ≫ k_BT (Θ_vib ≈ 3400 K), so the molecule is almost always in the vibrational ground state and cannot absorb energy in that mode.',
            },
            {
              question: 'What is Curie\'s law and in what limit does it hold?',
              answerOutline:
                'χ = Nμ²/k_BT (M ∝ B/T) in the weak-field, high-temperature limit μB ≪ k_BT; it saturates at strong fields.',
            },
            {
              question: 'Why must Z_rot for a homonuclear diatomic be divided by 2?',
              answerOutline:
                'Rotation by π interchanges identical nuclei and gives the same microstate; overcounting by the symmetry number must be removed (in detail, nuclear spin statistics restrict allowed J).',
            },
          ],
        },
        {
          slug: 'grand-canonical-ensemble',
          title: 'The grand canonical ensemble',
          summary:
            'Allowing particle exchange with a reservoir introduces the fugacity and the grand partition function; number fluctuations and the route to quantum gases.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the grand canonical distribution $p \\propto e^{-\\beta(E - \\mu N)}$ from a reservoir of energy and particles',
            'Define the grand partition function $\\mathcal{Z}$ and show $\\Phi = -k_BT\\ln\\mathcal Z = -pV$',
            'Compute $\\langle N\\rangle$ and number fluctuations from $\\mathcal Z$ and relate them to compressibility',
            'Apply the ensemble to the ideal gas and to adsorption on a surface (Langmuir isotherm)',
          ],
          concepts: [
            'Grand canonical ensemble',
            'Fugacity $z = e^{\\beta\\mu}$',
            'Grand partition function $\\mathcal Z = \\sum_N z^N Z_N$',
            'Grand potential $\\Phi = -k_BT\\ln\\mathcal Z$',
            'Number fluctuations and $\\kappa_T$',
            'Langmuir adsorption isotherm',
            'Occupation-number formulation (preview of quantum statistics)',
          ],
          explanation: `Repeat the heat-bath argument of lesson 1, but let the reservoir exchange particles as well as energy. Expanding $S_R(E_{tot} - E, N_{tot} - N)$ to first order and using $\\partial S/\\partial N = -\\mu/T$ gives
$$p(i, N) = \\frac{e^{-\\beta(E_i - \\mu N)}}{\\mathcal Z},\\qquad \\mathcal Z(T,V,\\mu) = \\sum_N e^{\\beta\\mu N} Z_N = \\sum_N z^N Z_N ,$$
where $z = e^{\\beta\\mu}$ is the **fugacity**. The associated potential is the grand potential $\\Phi = -k_BT\\ln\\mathcal Z = F - \\mu N = -pV$ (module 2's Euler relation). Mean number and fluctuations come from $\\mu$-derivatives:
$$\\langle N\\rangle = k_BT\\frac{\\partial\\ln\\mathcal Z}{\\partial\\mu},\\qquad \\langle(\\Delta N)^2\\rangle = k_BT\\frac{\\partial\\langle N\\rangle}{\\partial\\mu} = \\frac{\\langle N\\rangle^2 k_BT\\kappa_T}{V} .$$
Number fluctuations are proportional to the isothermal compressibility, another fluctuation-response relation; near a liquid-gas critical point $\\kappa_T$ diverges and so do density fluctuations, which is why the fluid turns milky (critical opalescence).

For the classical ideal gas $Z_N = Z_1^N/N!$, so $\\mathcal Z = \\exp(zZ_1)$, $\\langle N\\rangle = zV/\\lambda^3$, recovering $\\mu = k_BT\\ln(n\\lambda^3)$, and $pV = k_BT\\ln\\mathcal Z = \\langle N\\rangle k_BT$. Number fluctuations are Poissonian, $\\langle(\\Delta N)^2\\rangle = \\langle N\\rangle$, as they must be for independent particles.

The real power of the grand ensemble shows for systems where $N$ is awkward to fix: adsorption of gas molecules on surface sites (each site empty or occupied, giving the **Langmuir isotherm** $\\theta = zq/(1 + zq)$), electrons exchanged between a metal and a semiconductor, and above all quantum gases, where the natural variables are the occupation numbers of single-particle states. Module 5 starts exactly there: with $\\mathcal Z$ written as a product over modes.

Read Tong 1.4 (end) and Kardar lecture 11. Then do the Langmuir and fluctuation exercises; the Monte Carlo one, where you sample a lattice gas at fixed $\\mu$, is a direct preparation for the Ising capstone (the lattice gas *is* the Ising model in disguise).`,
          resources: [
            { ...R.tong, note: 'End of chapter 1 on the grand canonical ensemble; chapter 3 introduction for the occupation-number form.', primary: true },
            { ...R.mit8333, note: 'Lecture 11: grand canonical ensemble, fluctuations and ensemble equivalence.' },
            { ...R.sethna, note: 'Chapter 6.3-6.4 on the grand canonical ensemble and chapter 6 exercises on Langmuir adsorption.' },
          ],
          exercises: [
            {
              slug: 'langmuir-isotherm',
              title: 'Derive and test the Langmuir isotherm',
              prompt:
                'A surface has $M$ identical sites; an adsorbed molecule has energy $-\\epsilon_0$. Treating the surface grand canonically in equilibrium with an ideal gas at pressure $p$, show the fractional coverage is $\\theta = p/(p + p_0(T))$ and find $p_0(T) = (k_BT/\\lambda^3)e^{-\\epsilon_0/k_BT}$. Plot $\\theta(p)$ at several $T$. Look up a real adsorption dataset (e.g. N$_2$ on activated carbon from a published isotherm) and fit $p_0$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'number-fluctuations',
              title: 'Number fluctuations and compressibility',
              prompt:
                'Prove $\\langle(\\Delta N)^2\\rangle = k_BT(\\partial\\langle N\\rangle/\\partial\\mu)_{T,V}$ from $\\mathcal Z$, then use Gibbs-Duhem to convert it to $\\langle N\\rangle^2 k_BT\\kappa_T/V$. Evaluate for an ideal gas (Poisson) and for a van der Waals gas near its critical point, showing the divergence. Estimate the rms density fluctuation in a 1 μm³ cell of air at STP.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lattice-gas-gcmc',
              title: 'Grand canonical Monte Carlo of a lattice gas',
              prompt:
                'Implement a 2D lattice gas on a $32\\times32$ grid where occupied neighbours attract with energy $-\\epsilon$. Use Metropolis moves that insert or remove a particle with acceptance based on $\\Delta(E - \\mu N)$. For $k_BT = 0.4\\epsilon$ sweep $\\mu$ and plot mean density versus $\\mu$: observe a jump (first-order transition). Repeat at $k_BT = 0.8\\epsilon$ where the curve is smooth. Map the model onto the Ising model ($n_i = (1 + s_i)/2$) and relate $\\mu$ to the magnetic field.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the fugacity and how does it relate to the classical limit?',
              answerOutline:
                'z = e^{βμ}; for a classical ideal gas z = nλ³, so z ≪ 1 is the classical regime and z → 1 (bosons) or z ≫ 1 (fermions) marks degeneracy.',
            },
            {
              question: 'Why does the grand potential equal −pV?',
              answerOutline:
                'Φ = U − TS − μN and the Euler relation U = TS − pV + μN give Φ = −pV; so pV = k_BT ln 𝒵 directly.',
            },
            {
              question: 'What physical phenomenon reflects divergent number fluctuations?',
              answerOutline:
                'Critical opalescence: near the liquid-gas critical point κ_T diverges, density fluctuations grow to optical wavelengths and scatter light strongly.',
            },
          ],
        },
      ],
      project: {
        slug: 'partition-function-toolkit',
        title: 'A partition-function toolkit',
        description: `Write a small Python library that takes a description of a system's energy levels (a list, a function, or a product of independent subsystems) and returns $Z(T)$, $U$, $S$, $F$, $C_V$ and the Boltzmann probabilities, using log-sum-exp to avoid overflow. Include built-in level sets for the two-level system, harmonic oscillator, rigid rotor (with symmetry number and nuclear-spin weights), particle in a box, and spin-$J$ paramagnet.

Use it to reproduce: the heat-capacity staircase of H$_2$ and N$_2$; the Schottky anomaly; the Einstein-model heat capacity of diamond compared with real data from the NIST WebBook; and the Brillouin magnetisation curves. Every plot should show theory against at least one real dataset.`,
        deliverables: [
          'Library with unit tests checking analytic limits (equipartition, Curie law, low-T exponential suppression)',
          'Notebook with the four comparisons against data and a paragraph interpreting each discrepancy',
        ],
        estimatedHours: 8,
        stretchGoals: ['Add anharmonic corrections to the vibrational levels and show their effect on C_V at high T', 'Compute the equilibrium constant of a simple dissociation reaction from partition functions (preview of module 7)'],
      },
    },
    {
      slug: 'quantum-statistics',
      title: 'Quantum Statistics',
      description:
        'Bosons and fermions, the Bose-Einstein and Fermi-Dirac distributions, and their four great applications: blackbody radiation, lattice vibrations, degenerate electrons and Bose-Einstein condensation.',
      lessons: [
        {
          slug: 'identical-particles-and-quantum-distributions',
          title: 'Identical particles: Bose-Einstein and Fermi-Dirac statistics',
          summary:
            'Occupation numbers replace particle labels; the grand canonical ensemble then gives the Bose-Einstein, Fermi-Dirac and Maxwell-Boltzmann distributions in one calculation.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why identical quantum particles require symmetric or antisymmetric many-body states and how this leads to occupation numbers',
            'Derive $\\langle n_k\\rangle = 1/(e^{\\beta(\\epsilon_k - \\mu)} \\mp 1)$ from the grand partition function',
            'Show that both distributions reduce to Maxwell-Boltzmann when $e^{\\beta(\\epsilon - \\mu)} \\gg 1$',
            'Compute the density of states for free particles in 3D and write $N$ and $U$ as integrals over it',
          ],
          concepts: [
            'Bosons and fermions; the spin-statistics connection',
            'Occupation-number representation',
            'Pauli exclusion principle',
            'Grand partition function as a product over modes',
            'Bose-Einstein and Fermi-Dirac distributions',
            'Classical limit and the fugacity',
            'Density of states $g(\\epsilon) \\propto \\sqrt\\epsilon$ in 3D',
            'Degeneracy criterion $n\\lambda^3 \\sim 1$',
          ],
          explanation: `Quantum particles of the same kind are **indistinguishable** in a stronger sense than classical ones: the many-body wavefunction must be symmetric (bosons, integer spin) or antisymmetric (fermions, half-integer spin) under exchange. The consequence is that a microstate is fully specified by the **occupation numbers** $\\{n_k\\}$ of single-particle states $k$. For fermions $n_k \\in \\{0, 1\\}$ (Pauli exclusion); for bosons $n_k \\in \\{0, 1, 2, \\dots\\}$. The $N!$ that Gibbs put in by hand is now automatic: there is no "which particle is in which state".

Fixing $N$ is awkward with occupation numbers, so use the grand canonical ensemble. Because $E = \\sum_k n_k\\epsilon_k$ and $N = \\sum_k n_k$, the grand partition function factorises over modes:
$$\\mathcal Z = \\prod_k \\sum_{n_k} e^{-\\beta(\\epsilon_k - \\mu)n_k} = \\prod_k \\begin{cases} (1 - e^{-\\beta(\\epsilon_k-\\mu)})^{-1} & \\text{bosons} \\\\ 1 + e^{-\\beta(\\epsilon_k - \\mu)} & \\text{fermions}\\end{cases}$$
and $\\langle n_k\\rangle = -\\partial\\ln\\mathcal Z_k/\\partial(\\beta\\epsilon_k)$ gives
$$\\langle n_k\\rangle = \\frac{1}{e^{\\beta(\\epsilon_k - \\mu)} \\mp 1}\\quad(-\\text{ bosons}, +\\text{ fermions}).$$
For bosons the formula requires $\\mu < \\epsilon_0$ (the ground-state energy), otherwise occupations go negative; this constraint drives Bose-Einstein condensation. For fermions $\\mu$ can be anything, and at $T = 0$ it is the Fermi energy. When $e^{\\beta(\\epsilon - \\mu)} \\gg 1$ for all states, i.e. $z \\ll 1$ or $n\\lambda^3 \\ll 1$, both reduce to $\\langle n\\rangle \\approx e^{-\\beta(\\epsilon - \\mu)}$, the Maxwell-Boltzmann result, and all of module 4 is recovered.

To do anything with these you convert sums over states to integrals with the **density of states**. For free particles in a box of volume $V$ with spin degeneracy $g_s$, $g(\\epsilon) = \\frac{g_s V}{4\\pi^2}\\left(\\frac{2m}{\\hbar^2}\\right)^{3/2}\\sqrt\\epsilon$. Then $N = \\int g(\\epsilon)\\langle n(\\epsilon)\\rangle d\\epsilon$, $U = \\int \\epsilon\\, g(\\epsilon)\\langle n(\\epsilon)\\rangle d\\epsilon$, and the next four lessons are different limits of these two integrals. Derive $g(\\epsilon)$ yourself (also in 2D and for photons with $\\epsilon = \\hbar c k$); you will need all three versions.

Read Tong chapter 3.1-3.2 and MIT 8.044's quantum-statistics notes. The derivation of $\\langle n_k\\rangle$ is short; the understanding of why bosons bunch and fermions exclude is the point of the exercises.`,
          resources: [
            { ...R.tong, note: 'Chapter 3, sections 3.1-3.2: quantum gases, density of states, Bose and Fermi distributions.', primary: true },
            { ...R.mit8044, note: 'Lecture notes on quantum statistics (weeks 11-13).' },
            { ...R.mit8333, note: 'Lecture 16-17: quantum statistical mechanics, identical particles.' },
            {
              title: 'Feynman Lectures Vol. III, Ch. 4: Identical Particles',
              url: 'https://www.feynmanlectures.caltech.edu/III_04.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'The clearest physical account of why bosons bunch and fermions exclude.',
            },
          ],
          exercises: [
            {
              slug: 'three-statistics-two-particles',
              title: 'Two particles, three statistics',
              prompt:
                'Two particles share three single-particle states of energies $0, \\epsilon, 2\\epsilon$. Enumerate the microstates and write $Z$ for (a) distinguishable classical particles, (b) identical bosons, (c) identical fermions, (d) "corrected Boltzmann" (classical divided by 2!). Compute the mean energy at $k_BT = \\epsilon$ for each and discuss why (d) is not equal to (b) or (c). Then show the three agree when $k_BT \\gg \\epsilon$ and many states are available.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'density-of-states-derivations',
              title: 'Density of states in 1, 2 and 3 dimensions',
              prompt:
                'Derive $g(\\epsilon)$ for free non-relativistic particles in 1D, 2D and 3D, for ultra-relativistic particles ($\\epsilon = pc$) in 3D, and for photons (two polarisations). Then compute $N(\\mu, T)$ numerically for 3D fermions and bosons as a function of $z$ and plot $n\\lambda^3$ versus $z$ for both, showing the classical line $n\\lambda^3 = z$ and the boson curve ending at $z = 1$ with $n\\lambda^3 = \\zeta(3/2) \\approx 2.612$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'occupation-fluctuations',
              title: 'Fluctuations in occupation numbers',
              prompt:
                'From $\\mathcal Z_k$ show that $\\langle(\\Delta n_k)^2\\rangle = \\langle n_k\\rangle(1 \\pm \\langle n_k\\rangle)$ (+ bosons, − fermions). Interpret: bosons have super-Poissonian fluctuations (bunching, the origin of the Hanbury Brown-Twiss effect), fermions sub-Poissonian. Plot the relative fluctuation versus $\\langle n\\rangle$ for both.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the grand canonical ensemble make quantum gases tractable?',
              answerOutline:
                'With occupation numbers and no fixed N, 𝒵 factorises into a product over single-particle modes, each summed independently.',
            },
            {
              question: 'Why must μ be below the ground-state energy for bosons?',
              answerOutline:
                'Otherwise the Bose occupation 1/(e^{β(ε−μ)} − 1) is negative or divergent for some state; μ → ε₀ from below signals condensation.',
            },
            {
              question: 'In what regime do Bose and Fermi statistics both reduce to Maxwell-Boltzmann?',
              answerOutline:
                'When every occupation is small, e^{β(ε−μ)} ≫ 1, equivalently fugacity z ≪ 1 or nλ³ ≪ 1.',
            },
          ],
        },
        {
          slug: 'photons-phonons-and-blackbody-radiation',
          title: 'Photons and phonons: blackbody radiation and the Debye model',
          summary:
            'Bosons with no conserved number: Planck\'s law and the Stefan-Boltzmann constant from the photon gas, and the $T^3$ heat capacity of solids from the Debye model.',
          estimatedMinutes: 120,
          objectives: [
            'Explain why photons and phonons have $\\mu = 0$ and derive Planck\'s spectral distribution',
            'Derive the Stefan-Boltzmann law $u = aT^4$, the radiation pressure $p = u/3$ and Wien\'s displacement law',
            'Set up the Debye model, derive $C_V \\propto T^3$ at low temperature and the Dulong-Petit limit at high temperature',
            'Fit Planck and Debye curves to real data (the CMB spectrum; heat capacities of solids)',
          ],
          concepts: [
            'Photon gas with $\\mu = 0$',
            'Planck distribution $u(\\omega) \\propto \\omega^3/(e^{\\beta\\hbar\\omega} - 1)$',
            'Stefan-Boltzmann law and constant $\\sigma$',
            'Wien\'s displacement law',
            'Radiation pressure $p = u/3$',
            'Phonons; Debye frequency and temperature',
            'Debye $T^3$ law and Dulong-Petit',
            'Einstein vs Debye models',
          ],
          explanation: `Photons in a cavity are created and absorbed freely by the walls, so the number is not conserved and the free energy is minimised with respect to $N$: $\\partial F/\\partial N = \\mu = 0$. The Bose distribution with $\\mu = 0$ and $\\epsilon = \\hbar\\omega$, times the photon density of states $g(\\omega) = V\\omega^2/\\pi^2c^3$ (two polarisations), gives **Planck's law** for the energy per unit volume per unit frequency:
$$u(\\omega, T) = \\frac{\\hbar}{\\pi^2c^3}\\frac{\\omega^3}{e^{\\hbar\\omega/k_BT} - 1}.$$
Check the limits: for $\\hbar\\omega \\ll k_BT$ it becomes the classical Rayleigh-Jeans $\\omega^2k_BT/\\pi^2c^3$ (equipartition per mode), whose integral diverges (the ultraviolet catastrophe); for $\\hbar\\omega \\gg k_BT$ Wien's exponential tail saves it. Integrating over $\\omega$ gives $u = \\frac{\\pi^2k_B^4}{15\\hbar^3c^3}T^4$, and the flux from a surface is $\\sigma T^4$ with $\\sigma = 5.67\\times10^{-8}\\ \\mathrm{W\\,m^{-2}K^{-4}}$. The peak of $u(\\omega)$ moves linearly with $T$ (**Wien's law**); the cosmic microwave background, a 2.725 K Planck curve measured by COBE/FIRAS to better than 0.01%, is the most perfect blackbody known. Radiation pressure $p = u/3$ follows from $\\Phi = -pV$ and matters in stars (module 7).

Sound waves in a crystal are quantised the same way into **phonons**, also with $\\mu = 0$. Debye's model treats the solid as an elastic continuum with three acoustic branches but cuts the spectrum off at $\\omega_D$ so that the total number of modes is $3N$. At $T \\ll \\Theta_D = \\hbar\\omega_D/k_B$ only long-wavelength phonons are excited and the photon calculation repeats with $c \\to$ sound speed: $C_V = \\frac{12\\pi^4}{5}Nk_B(T/\\Theta_D)^3$. At $T \\gg \\Theta_D$ every mode holds $k_BT$ and $C_V = 3Nk_B$ (Dulong-Petit). Einstein's earlier model, with all oscillators at one frequency, gets the high-$T$ limit but the wrong (exponential) low-$T$ behaviour; the data for copper or diamond discriminate clearly between them, which is one of your exercises.

Read Tong 3.2-3.4; Feynman I-41 and I-42 add the historical path. Use the PhET blackbody simulation to build intuition before fitting the real CMB and heat-capacity data.`,
          resources: [
            { ...R.tong, note: 'Chapter 3, sections 3.2 (photons) and 3.4 (phonons, Debye model).', primary: true },
            {
              title: 'PhET — Blackbody Spectrum',
              url: 'https://phet.colorado.edu/en/simulations/blackbody-spectrum',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Colorado Boulder',
              note: 'See Wien\'s law and the T⁴ area scaling before deriving them.',
            },
            feynman(41, 'The Brownian Movement'),
            {
              title: 'ESA Planck mission (CMB data and science results)',
              url: 'https://www.cosmos.esa.int/web/planck',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
              note: 'Background on the CMB blackbody; COBE/FIRAS spectrum values are tabulated in many places for the fitting exercise.',
            },
          ],
          exercises: [
            {
              slug: 'planck-derivation-and-limits',
              title: 'Derive Planck, Stefan-Boltzmann and Wien',
              prompt:
                'Derive $u(\\omega,T)$ from the Bose distribution and photon density of states. Integrate to get $u = aT^4$ and evaluate $a$ (you will need $\\int_0^\\infty x^3/(e^x - 1)dx = \\pi^4/15$; derive it via a geometric series and $\\zeta(4)$). Show $\\lambda_{max}T = 2.898$ mm K by solving the transcendental equation numerically. Compute the number density of photons at 2.725 K (about 411 cm$^{-3}$) and the entropy per photon.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fit-the-cmb',
              title: 'Fit the COBE/FIRAS spectrum',
              prompt:
                'Obtain the COBE/FIRAS CMB monopole spectrum (frequency in cm$^{-1}$, intensity in MJy/sr; it is tabulated in the FIRAS papers and reproduced on many course sites). Fit a Planck function with $T$ as the only free parameter using least squares, and report $T$ with uncertainty. Plot data, fit and residuals. Then add a free "chemical potential" $\\mu$ to the Bose factor and show the fit constrains $|\\mu/k_BT|$ to be tiny.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'debye-vs-einstein',
              title: 'Debye versus Einstein against real heat capacities',
              prompt:
                'Implement $C_V(T)$ for the Debye model (numerical integral of $x^4e^x/(e^x-1)^2$) and the Einstein model. Using tabulated $C_p$ data for copper ($\\Theta_D \\approx 343$ K) and diamond ($\\Theta_D \\approx 2230$ K) from the NIST WebBook or a solid-state text, fit $\\Theta_D$ and $\\Theta_E$ by least squares and plot $C/3Nk_B$ versus $T/\\Theta$ on a log-log scale. Show that the Debye fit captures the $T^3$ region and the Einstein fit does not.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the chemical potential of a photon gas zero?',
              answerOutline:
                'Photon number is not conserved; equilibrium minimises F over N, giving ∂F/∂N = μ = 0.',
            },
            {
              question: 'What is the ultraviolet catastrophe and how does quantisation cure it?',
              answerOutline:
                'Classical equipartition gives k_BT per mode and infinitely many high-frequency modes, so u diverges; quantisation suppresses modes with ħω ≫ k_BT exponentially.',
            },
            {
              question: 'Why does the Debye model give C ∝ T³ at low temperature?',
              answerOutline:
                'Only phonons with ħω ≲ k_BT are excited; their number scales as (T/Θ_D)³ (volume of a sphere in k-space), each carrying ∼k_BT.',
            },
            {
              question: 'What does the Debye cutoff represent physically?',
              answerOutline:
                'A crystal of N atoms has only 3N vibrational modes; wavelengths shorter than the lattice spacing do not exist, so the continuum spectrum is truncated at ω_D.',
            },
          ],
        },
        {
          slug: 'degenerate-fermi-gases',
          title: 'Degenerate Fermi gases: metals and white dwarfs',
          summary:
            'At $T = 0$ fermions fill states up to the Fermi energy; the resulting degeneracy pressure explains metals\' heat capacity and holds up white dwarfs against gravity.',
          estimatedMinutes: 120,
          objectives: [
            'Compute the Fermi energy, Fermi momentum and total energy of a free electron gas at $T = 0$',
            'Derive the degeneracy pressure $p = \\tfrac{2}{5}n\\epsilon_F$ and explain its origin',
            'Use the Sommerfeld expansion to obtain the linear electronic heat capacity $C = \\frac{\\pi^2}{2}Nk_B(T/T_F)$',
            'Estimate the Chandrasekhar mass from the relativistic degenerate electron gas',
          ],
          concepts: [
            'Fermi energy, Fermi momentum, Fermi temperature',
            'Fermi sphere and the ground-state energy $\\tfrac{3}{5}N\\epsilon_F$',
            'Degeneracy pressure',
            'Sommerfeld expansion',
            'Linear electronic heat capacity',
            'Pauli paramagnetism',
            'Relativistic degenerate gas, $p \\propto n^{4/3}$',
            'Chandrasekhar limit',
          ],
          explanation: `At $T = 0$ the Fermi-Dirac distribution is a step: every state below $\\mu(0) \\equiv \\epsilon_F$ is filled, every state above is empty. Counting states in a sphere in $k$-space, $N = 2\\cdot\\frac{V}{(2\\pi)^3}\\cdot\\frac{4}{3}\\pi k_F^3$, gives
$$k_F = (3\\pi^2n)^{1/3},\\qquad \\epsilon_F = \\frac{\\hbar^2k_F^2}{2m},\\qquad U_0 = \\tfrac{3}{5}N\\epsilon_F .$$
For copper $\\epsilon_F \\approx 7$ eV, so $T_F = \\epsilon_F/k_B \\approx 80{,}000$ K: room temperature is deep in the degenerate regime. The energy depends on volume through $\\epsilon_F \\propto V^{-2/3}$, so there is a **degeneracy pressure** $p = -\\partial U/\\partial V = \\tfrac{2}{5}n\\epsilon_F$, around $10^{10}$ Pa for metals, resisted by the ionic lattice. It exists at absolute zero and comes purely from the exclusion principle: squeeze the box and all the occupied states rise in energy.

At $T > 0$ only electrons within $\\sim k_BT$ of the Fermi surface can be excited (all states deeper are blocked). The **Sommerfeld expansion** makes this precise: for a smooth $\\phi(\\epsilon)$, $\\int_0^\\infty \\phi(\\epsilon)f(\\epsilon)d\\epsilon = \\int_0^\\mu\\phi\\,d\\epsilon + \\frac{\\pi^2}{6}(k_BT)^2\\phi'(\\mu) + O(T^4)$. Applied to $N$ and $U$ it yields $\\mu(T) = \\epsilon_F[1 - \\frac{\\pi^2}{12}(T/T_F)^2]$ and the electronic heat capacity
$$C_V = \\frac{\\pi^2}{2}Nk_B\\frac{T}{T_F},$$
linear in $T$ and tiny compared with the classical $\\tfrac{3}{2}Nk_B$; this resolved the puzzle of why conduction electrons seemed not to contribute to the heat capacity of metals. Below a few kelvin the linear electron term dominates the Debye $T^3$ phonon term, and a plot of $C/T$ against $T^2$ gives a straight line whose intercept measures the density of states at the Fermi level: a standard experiment.

In a **white dwarf** the ionic lattice is gone and electron degeneracy pressure alone balances gravity. Non-relativistically $p \\propto n^{5/3}$ and a stable radius $R \\propto M^{-1/3}$ results. But as $M$ grows the electrons become relativistic, $p \\propto n^{4/3}$, and the pressure can no longer win: a maximum mass exists, Chandrasekhar's $1.4\\,M_\\odot$. Module 7 does the full calculation; here you do the scaling estimate.

Read Tong 3.6 and Kardar lecture 20; Chandrasekhar's Nobel lecture tells the story of the limit.`,
          resources: [
            { ...R.tong, note: 'Chapter 3, section 3.6: Fermi gases, Sommerfeld expansion, white dwarfs.', primary: true },
            { ...R.mit8333, note: 'Lectures 19-20 on degenerate Fermi gases.' },
            {
              title: 'Chandrasekhar — Nobel Lecture 1983: On Stars, Their Evolution and Their Stability',
              url: 'https://www.nobelprize.org/prizes/physics/1983/chandrasekhar/lecture/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
              note: 'Sections on the limiting mass of white dwarfs.',
            },
          ],
          exercises: [
            {
              slug: 'fermi-gas-ground-state',
              title: 'Ground state of the electron gas',
              prompt:
                'Derive $k_F$, $\\epsilon_F$, $U_0 = \\tfrac{3}{5}N\\epsilon_F$ and $p = \\tfrac{2}{5}n\\epsilon_F$. Compute $\\epsilon_F$, $T_F$, the Fermi velocity and the degeneracy pressure for copper ($n = 8.5\\times10^{28}$ m$^{-3}$), for a neutron star core ($n \\approx 10^{44}$ m$^{-3}$, neutrons) and for liquid $^3$He ($n = 1.6\\times10^{28}$ m$^{-3}$, mass $3m_p$). Comment on which are relativistic ($\\hbar k_F \\gtrsim mc$).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'sommerfeld-expansion',
              title: 'Sommerfeld expansion and the electronic heat capacity',
              prompt:
                'Derive the Sommerfeld expansion to order $T^2$. Apply it to find $\\mu(T)$ and $U(T)$ and hence $C_V = \\frac{\\pi^2}{2}Nk_B(T/T_F)$. Then compute $C_V(T)$ numerically by integrating the exact Fermi function (solving for $\\mu(T)$ at fixed $N$ with a root finder) from $T = 0.01\\,T_F$ to $5\\,T_F$, and plot it with the Sommerfeld result and the classical $\\tfrac{3}{2}Nk_B$ to show the crossover.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'white-dwarf-scaling',
              title: 'White dwarf radius and the Chandrasekhar limit by scaling',
              prompt:
                'Model a white dwarf as $N$ electrons (and $2N$ nucleons supplying the mass) in a sphere of radius $R$. Write the total energy as kinetic (degenerate, non-relativistic $\\propto N^{5/3}/R^2$) plus gravitational ($\\propto -GM^2/R$). Minimise to find $R(M)$ and evaluate for $M = 1\\,M_\\odot$ (expect of order $10^4$ km). Then repeat with ultra-relativistic kinetic energy $\\propto N^{4/3}/R$ and show that no minimum exists above a critical $N$; estimate the resulting mass and compare with 1.4 $M_\\odot$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the electronic heat capacity of a metal so much smaller than equipartition predicts?',
              answerOutline:
                'Only the fraction ∼T/T_F of electrons near the Fermi surface can absorb energy; the rest are Pauli-blocked. C ∝ Nk_B T/T_F with T_F ∼ 10⁵ K.',
            },
            {
              question: 'What is degeneracy pressure and does it require any interaction?',
              answerOutline:
                'Pressure from the increase of occupied kinetic energies when the volume shrinks, a pure consequence of the exclusion principle in a free (non-interacting) gas.',
            },
            {
              question: 'Why does relativity set a maximum mass for white dwarfs?',
              answerOutline:
                'Ultra-relativistic degeneracy energy scales as 1/R, the same as gravity, so the balance becomes independent of R and fails entirely above a critical mass (Chandrasekhar limit).',
            },
          ],
        },
        {
          slug: 'bose-einstein-condensation',
          title: 'Bose-Einstein condensation',
          summary:
            'Below a critical temperature a macroscopic fraction of bosons occupies the single-particle ground state; the thermodynamics of the condensed phase and its realisation in ultracold atoms.',
          estimatedMinutes: 110,
          objectives: [
            'Show that the excited-state population of an ideal Bose gas saturates at $N_{max} = \\zeta(3/2)V/\\lambda^3$ and derive $T_c$',
            'Compute the condensate fraction $N_0/N = 1 - (T/T_c)^{3/2}$ and the heat capacity below $T_c$',
            'Explain why condensation is a phase transition driven by statistics rather than interactions',
            'Describe how BEC is achieved in dilute atomic gases and how it differs from superfluid helium',
          ],
          concepts: [
            'Saturation of excited states',
            'Critical temperature $T_c$ and $n\\lambda^3 = \\zeta(3/2)$',
            'Condensate fraction',
            'Macroscopic occupation of the ground state',
            'Heat capacity cusp at $T_c$',
            'Bose gas in a harmonic trap',
            'Superfluid $^4$He and the lambda point',
            'Laser and evaporative cooling (experimental route)',
          ],
          explanation: `For bosons $\\mu < \\epsilon_0 = 0$, so the fugacity $z = e^{\\beta\\mu}$ lies in $[0,1)$. The number of particles in excited states, computed with the density of states, is
$$N_{exc} = \\frac{V}{\\lambda^3}g_{3/2}(z),\\qquad g_{3/2}(z) = \\sum_{k=1}^\\infty\\frac{z^k}{k^{3/2}},$$
and $g_{3/2}$ is bounded: its maximum is $g_{3/2}(1) = \\zeta(3/2) = 2.612$. Here is the surprise. The excited states can hold at most $N_{max} = 2.612\\,V/\\lambda^3$ particles. If you cool the gas at fixed density until $\\lambda$ grows so much that $N > N_{max}$, the surplus has nowhere to go but the ground state, whose occupation $z/(1-z)$ the density-of-states integral neglected (because $g(0) = 0$). Below
$$T_c = \\frac{2\\pi\\hbar^2}{mk_B}\\left(\\frac{n}{\\zeta(3/2)}\\right)^{2/3}$$
a **macroscopic** fraction $N_0/N = 1 - (T/T_c)^{3/2}$ sits in a single quantum state. This is **Bose-Einstein condensation**, a phase transition in a gas with no interactions at all; the "attraction" is purely statistical, the bunching tendency you computed in lesson 1.

Below $T_c$ the pressure depends on $T$ alone ($p \\propto T^{5/2}$, independent of $V$, like a saturated vapour), the heat capacity rises as $T^{3/2}$ to $1.93\\,Nk_B$ at $T_c$ and then has a cusp. Einstein predicted this in 1925; superfluid $^4$He (lambda point 2.17 K) is a strongly interacting cousin, so the clean test waited until 1995, when Cornell, Wieman and Ketterle condensed dilute rubidium and sodium vapours at ~100 nK, by laser cooling followed by evaporative cooling in a magnetic trap (module 2's third-law discussion). In a harmonic trap the density of states changes to $g(\\epsilon) \\propto \\epsilon^2$, $T_c \\propto N^{1/3}\\hbar\\bar\\omega/k_B$, and the condensate fraction becomes $1 - (T/T_c)^3$; you will derive this version because it is what experiments measure.

Read Tong 3.5 and the 2001 Nobel summary. The numerical exercise, solving $N(z, T)$ with the ground state included for finite $N$, shows how the sharp transition emerges from a smooth crossover as $N \\to \\infty$.`,
          resources: [
            { ...R.tong, note: 'Chapter 3, section 3.5: Bose-Einstein condensation.', primary: true },
            {
              title: 'Nobel Prize in Physics 2001 — Bose-Einstein condensation in dilute gases (summary and lectures)',
              url: 'https://www.nobelprize.org/prizes/physics/2001/summary/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
              note: 'Read the popular summary and skim Ketterle\'s lecture for the experimental method.',
            },
            { ...R.mit8333, note: 'Lecture 18 on Bose gases and condensation.' },
          ],
          exercises: [
            {
              slug: 'bec-finite-n',
              title: 'Condensation at finite N',
              prompt:
                'For $N$ bosons in a cubic box with the exact discrete spectrum, solve $N = \\sum_{\\mathbf n} 1/(z^{-1}e^{\\beta\\epsilon_{\\mathbf n}} - 1)$ for $z$ at each $T$ by bisection (include enough levels), and plot the ground-state fraction $N_0/N$ versus $T/T_c$ for $N = 100, 1000, 10^4$. Show the curves approach $1 - (T/T_c)^{3/2}$ as $N$ grows and that the transition sharpens.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'bec-thermodynamics',
              title: 'Thermodynamics of the condensed phase',
              prompt:
                'Derive $T_c$, the condensate fraction, $U = 0.770\\,Nk_BT(T/T_c)^{3/2}$, $C_V = 1.93\\,Nk_B(T/T_c)^{3/2}$ and $p = 0.513\\,k_BT/\\lambda^3$ for $T < T_c$ (you will need $\\zeta(5/2) = 1.341$). Explain why the pressure is independent of volume below $T_c$ and sketch the isotherms in the $p$-$V$ plane, comparing with a liquid-gas coexistence region.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'harmonic-trap-bec',
              title: 'BEC in a harmonic trap',
              prompt:
                'Show the density of states for an isotropic 3D harmonic trap of frequency $\\omega$ is $g(\\epsilon) = \\epsilon^2/2(\\hbar\\omega)^3$ and derive $k_BT_c = \\hbar\\omega(N/\\zeta(3))^{1/3}$ and $N_0/N = 1 - (T/T_c)^3$. For the first rubidium BEC ($N \\approx 2000$, $\\bar\\omega \\approx 2\\pi\\times 120$ Hz) compute $T_c$ and compare with the observed ~170 nK. Why is the condensate visible in a time-of-flight image?',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What mathematical fact causes Bose-Einstein condensation?',
              answerOutline:
                'The excited-state integral ∫g(ε)n(ε)dε is bounded (g_{3/2}(z) ≤ ζ(3/2)); once N exceeds that bound at fixed T, extra particles must occupy the ground state, which the integral misses because g(0) = 0.',
            },
            {
              question: 'Is BEC caused by interactions?',
              answerOutline:
                'No; the ideal Bose gas condenses. Interactions modify T_c and the excitation spectrum (and make helium a superfluid) but are not the cause.',
            },
            {
              question: 'Why is n λ³ the right criterion for the onset of condensation?',
              answerOutline:
                'nλ³ ≈ 2.612 means the thermal wavelength is comparable to the interparticle spacing, so wavefunctions overlap and quantum statistics dominate.',
            },
          ],
        },
      ],
    },
    {
      slug: 'phase-transitions-and-critical-phenomena',
      title: 'Phase Transitions and Critical Phenomena',
      description:
        'First-order transitions and coexistence, the Ising model and mean-field theory, Landau theory and broken symmetry, exact results and scaling, and the renormalization group.',
      lessons: [
        {
          slug: 'phase-diagrams-and-first-order-transitions',
          title: 'Phase diagrams, coexistence and first-order transitions',
          summary:
            'Phases coexist when their chemical potentials match; the Clausius-Clapeyron equation, the van der Waals liquid-gas transition and the Maxwell construction.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the Clausius-Clapeyron equation from equality of chemical potentials along a coexistence line',
            'Explain the structure of a $p$-$T$ phase diagram: triple point, critical point, Gibbs phase rule',
            'Apply the Maxwell equal-area construction to van der Waals isotherms and locate the coexistence region',
            'Compute the van der Waals critical exponents and explain the law of corresponding states',
          ],
          concepts: [
            'Coexistence condition $\\mu_1 = \\mu_2$',
            'Clausius-Clapeyron equation $dp/dT = L/T\\Delta V$',
            'Latent heat and discontinuities (first-order)',
            'Gibbs phase rule $f = c - \\phi + 2$',
            'Critical point and continuous transition',
            'Van der Waals loops and the Maxwell construction',
            'Metastability: superheating, supercooling, spinodal',
            'Law of corresponding states',
          ],
          explanation: `Two phases of the same substance coexist when they have equal $T$, $p$ and, crucially, equal **chemical potential**: $\\mu_{liq}(T,p) = \\mu_{gas}(T,p)$. That single equation defines a *line* in the $p$-$T$ plane. Moving along it, $d\\mu_1 = d\\mu_2$ with $d\\mu = -s\\,dT + v\\,dp$ (per particle, from Gibbs-Duhem) gives the **Clausius-Clapeyron equation**
$$\\frac{dp}{dT} = \\frac{s_2 - s_1}{v_2 - v_1} = \\frac{L}{T\\,\\Delta V} .$$
It predicts the slope of every coexistence line from the latent heat $L$ and volume change: for water-ice, $\\Delta V < 0$, so the melting line slopes backward and pressure melts ice. Across the line $S$ and $V$ jump: a **first-order** transition, with latent heat and coexistence. Along the liquid-gas line the jump shrinks until it vanishes at the **critical point** $(T_c, p_c)$, beyond which liquid and gas are the same phase; there the transition is **continuous**, the subject of the rest of this module. The Gibbs phase rule, $f = c - \\phi + 2$ degrees of freedom for $c$ components and $\\phi$ phases, follows from counting Gibbs-Duhem constraints and explains why the triple point is a point.

The van der Waals equation from module 1 contains all of this. Below $T_c$ its isotherms have an unphysical loop where $\\partial p/\\partial V > 0$ (negative compressibility). Maxwell's fix: replace the loop by a horizontal line at the pressure that makes the two cut-off areas equal, which is exactly the condition $\\mu_{liq} = \\mu_{gas}$ since $\\int v\\,dp = 0$ around the loop. Between the line's endpoints the gas is a mixture of two phases. The loop's descending parts are metastable (superheated liquid, supercooled vapour: real and used in bubble and cloud chambers); the ascending part, inside the **spinodal**, is unstable. Expanding around the critical point gives the **mean-field exponents**: $\\Delta n \\propto (T_c - T)^{1/2}$, $\\kappa_T \\propto |T - T_c|^{-1}$, $p - p_c \\propto (v - v_c)^3$ on the critical isotherm. Experiments give 0.32, 1.24 and 4.8 instead of 1/2, 1, 3. Why mean-field theory is wrong, and by how much, is what lessons 3-5 explain.

Read Tong 5.1 and Kardar's chapter on interacting gases (8.333 lectures 12-14). The exercises implement the Maxwell construction numerically, which is harder than it looks and very instructive.`,
          resources: [
            { ...R.tong, note: 'Chapter 5, section 5.1: liquid-gas transition, Maxwell construction, critical exponents.', primary: true },
            { ...R.mit8333, note: 'Lectures 12-14 on interacting gases and the van der Waals theory.' },
            { ...R.openstax2, note: 'Chapter 1, section 1.5 (Phase changes) for the phenomenology of phase diagrams.' },
            {
              title: 'NIST Chemistry WebBook — fluid thermophysical properties',
              url: 'https://webbook.nist.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Saturation pressure and density tables for water, CO₂, argon: use for the coexistence-curve exercise.',
            },
          ],
          exercises: [
            {
              slug: 'maxwell-construction-code',
              title: 'Maxwell construction, numerically',
              prompt:
                'Write code that, for the van der Waals equation in reduced variables ($p_r = 8t/(3v-1) - 3/v^2$), finds the coexistence pressure at a given $t < 1$ by solving the equal-area condition with a root finder. Plot the binodal (coexistence densities) and spinodal curves in the $t$-$v$ plane for $t \\in [0.85, 1]$. Fit $\\Delta v \\propto (1 - t)^\\beta$ near $t = 1$ and confirm $\\beta = 1/2$. Then overlay real saturation densities of argon from NIST in reduced units and fit their $\\beta$ (expect ≈ 0.33).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'clausius-clapeyron-applications',
              title: 'Clausius-Clapeyron applications',
              prompt:
                'Derive the Clausius-Clapeyron equation. (a) Using $L = 2.26\\times10^6$ J/kg for water and treating the vapour as ideal, integrate to get $p_{sat}(T)$ and compare with NIST data from 0 °C to 100 °C. (b) Compute the melting-point depression of ice at 100 atm ($L = 3.34\\times10^5$ J/kg, $\\Delta v = -9\\times10^{-5}$ m³/kg). (c) Explain why the boiling point at the top of Everest (0.34 atm) is about 71 °C.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'vdw-critical-exponents',
              title: 'Mean-field exponents of the van der Waals fluid',
              prompt:
                'Expand the reduced van der Waals equation around the critical point in $\\delta t = t - 1$ and $\\delta v = v - 1$. Derive the exponents $\\beta = 1/2$ (coexistence curve), $\\gamma = 1$ (compressibility) and $\\delta = 3$ (critical isotherm), and show the heat capacity $C_V$ has a jump (so $\\alpha = 0$). Compare with the measured 3D values and tabulate.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What distinguishes a first-order from a continuous phase transition?',
              answerOutline:
                'First-order: discontinuities in first derivatives of G (entropy, volume), latent heat, coexistence and metastability. Continuous: those are continuous but second derivatives (C, κ, χ) diverge, with no latent heat.',
            },
            {
              question: 'Why does the Maxwell equal-area rule follow from μ_liq = μ_gas?',
              answerOutline:
                'Along an isotherm dμ = v dp; integrating around the loop from liquid to gas gives μ_gas − μ_liq = ∫v dp, which vanishes exactly when the two areas are equal.',
            },
            {
              question: 'What does the law of corresponding states claim?',
              answerOutline:
                'In reduced variables (p/p_c, T/T_c, V/V_c) all fluids obey the same equation of state; it holds approximately for simple fluids and exactly for any two-parameter model like van der Waals.',
            },
          ],
        },
        {
          slug: 'the-ising-model-and-mean-field-theory',
          title: 'The Ising model and mean-field theory',
          summary:
            'The simplest model with a phase transition: its definition, the mean-field solution with a spontaneous magnetisation below $T_c$, and the mean-field critical exponents.',
          estimatedMinutes: 120,
          objectives: [
            'Define the Ising Hamiltonian and relate it to ferromagnets, lattice gases and binary alloys',
            'Derive the mean-field self-consistency equation $m = \\tanh(\\beta(Jqm + B))$ and solve it graphically and numerically',
            'Obtain the mean-field $T_c = qJ/k_B$ and exponents $\\beta = 1/2$, $\\gamma = 1$, $\\delta = 3$',
            'State where mean-field theory fails and why (dimension, fluctuations, the Ginzburg criterion)',
          ],
          concepts: [
            'Ising Hamiltonian $H = -J\\sum_{\\langle ij\\rangle}s_is_j - B\\sum_i s_i$',
            'Order parameter: magnetisation $m$',
            'Spontaneous symmetry breaking',
            'Mean-field (Weiss) approximation',
            'Self-consistency equation and graphical solution',
            'Mean-field critical temperature $k_BT_c = qJ$',
            'Mean-field exponents',
            'Upper critical dimension and the Ginzburg criterion',
          ],
          explanation: `Put a spin $s_i = \\pm1$ on every site of a lattice with coordination number $q$ and let neighbours interact:
$$H = -J\\sum_{\\langle ij\\rangle}s_is_j - B\\sum_i s_i .$$
For $J > 0$ aligned neighbours lower the energy. At $T = 0$ all spins align (energy wins); at high $T$ they are random (entropy wins). The question is whether there is a sharp temperature $T_c$ below which the **magnetisation** $m = \\langle s_i\\rangle$ is nonzero at $B = 0$, and if so how $m$, the susceptibility $\\chi$ and the heat capacity behave near it. Besides magnets, the same model describes a lattice gas (module 4's project), binary alloys, neural networks and opinion dynamics; its universality is why it is the central model of the field.

**Mean-field theory** replaces each spin's neighbours by their average: $s_j \\to m$. Each spin then sees an effective field $B_{eff} = B + qJm$, and a single spin in a field is the paramagnet of module 4, so
$$m = \\tanh\\big(\\beta(qJm + B)\\big).$$
At $B = 0$ plot $y = m$ and $y = \\tanh(\\beta qJm)$: for $\\beta qJ < 1$ the only intersection is $m = 0$; for $\\beta qJ > 1$ two symmetric nonzero solutions appear, and they have lower free energy. Hence $k_BT_c = qJ$ and spontaneous **symmetry breaking** below it. Expanding $\\tanh$ gives $m \\propto (T_c - T)^{1/2}$, $\\chi \\propto |T - T_c|^{-1}$, $m \\propto B^{1/3}$ at $T_c$: the same exponents as van der Waals, because both are mean-field theories, and both are wrong in the same way.

Where does it fail? It predicts a transition in 1D, where the exact solution (lesson 4) shows there is none; it gets $T_c$ for the 2D square lattice as $4J$ against Onsager's $2.27J$; and it gives $\\beta = 1/2$ where 2D has $1/8$ and 3D has $0.33$. The error is neglecting **fluctuations** and correlations between neighbours. The Ginzburg criterion shows that fluctuations are negligible near $T_c$ only above the **upper critical dimension** $d = 4$; below it, mean-field exponents are quantitatively wrong, though qualitatively right.

Read Tong 5.2 and Sethna chapter 12. Your Monte Carlo from the lattice-gas exercise now becomes the Ising model; the exercises compare its results with mean-field predictions, which is the beginning of the capstone.`,
          resources: [
            { ...R.tong, note: 'Chapter 5, section 5.2: the Ising model and mean-field theory.', primary: true },
            { ...R.sethna, note: 'Chapter 12 (Continuous phase transitions) and the Ising exercises in chapter 8.' },
            { ...R.mit8334, note: 'Lectures 1-3 of Statistical Physics of Fields for mean-field theory in the Landau-Ginzburg language.' },
            { ...R.susskind, note: 'Lecture 9-10 on the Ising model.' },
          ],
          exercises: [
            {
              slug: 'mean-field-solver',
              title: 'Solve the mean-field equation',
              prompt:
                'Write a root-finder for $m = \\tanh(\\beta(qJm + B))$. Plot $m(T)$ at $B = 0$ for $q = 4$, verify $T_c = 4J/k_B$ and fit $m \\propto (T_c - T)^\\beta$ near $T_c$ to get $\\beta = 1/2$. Plot $m(B)$ at $T = T_c$ and fit $\\delta = 3$. Compute $\\chi = \\partial m/\\partial B$ numerically above and below $T_c$, fit $\\gamma$ on both sides and check the amplitude ratio is 2.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mean-field-free-energy',
              title: 'Mean-field free energy and the Bragg-Williams derivation',
              prompt:
                'Derive the mean-field free energy per spin $f(m) = -\\tfrac{1}{2}qJm^2 - Bm - k_BT\\,s(m)$ with $s(m)$ the entropy of a paramagnet at magnetisation $m$. Show that $\\partial f/\\partial m = 0$ reproduces the self-consistency equation, plot $f(m)$ for $T$ above, at and below $T_c$, and show that at $B \\ne 0$ below $T_c$ one of the two minima is metastable (hysteresis).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'metropolis-ising-first-pass',
              title: 'Metropolis Ising: compare with mean field',
              prompt:
                'Implement the Metropolis algorithm for a $32\\times32$ Ising model with periodic boundaries. For $k_BT/J$ from 1.5 to 3.5, equilibrate (at least 1000 sweeps) then measure $\\langle|m|\\rangle$, energy, $\\chi$ and $C$ over 5000 sweeps. Plot against $T$ with the mean-field curves and mark the exact $T_c = 2.269J/k_B$. Comment on the differences: location of $T_c$, shape near $T_c$ and the finite-size rounding.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'Precompute the five possible Boltzmann factors; flip acceptance is min(1, exp(−βΔE)) with ΔE = 2J s_i Σ_neighbours s_j.',
            },
          ],
          selfAssessment: [
            {
              question: 'What approximation defines mean-field theory and what does it neglect?',
              answerOutline:
                'Each spin interacts with the average of its neighbours rather than their actual values; it neglects correlations and fluctuations between neighbouring spins.',
            },
            {
              question: 'What is spontaneous symmetry breaking in the Ising model?',
              answerOutline:
                'Below T_c at B = 0 the system picks one of two equivalent states with m ≠ 0, although H is symmetric under s → −s; the symmetry is broken by the state, not the Hamiltonian.',
            },
            {
              question: 'Why is mean-field theory exact in high dimensions?',
              answerOutline:
                'Each spin has many neighbours whose average fluctuates little (law of large numbers); the Ginzburg criterion shows fluctuation corrections vanish for d > 4.',
            },
          ],
          relatedLessons: ['computational-physics/monte-carlo-methods/metropolis-and-the-ising-model'],
        },
        {
          slug: 'landau-theory-and-broken-symmetry',
          title: 'Landau theory, order parameters and broken symmetry',
          summary:
            'Phase transitions described by expanding the free energy in the order parameter, constrained by symmetry: continuous and first-order transitions, Goldstone modes and the Landau-Ginzburg functional.',
          estimatedMinutes: 110,
          objectives: [
            'Construct a Landau free energy from symmetry and derive the critical exponents $\\beta$, $\\gamma$, $\\delta$, $\\alpha$',
            'Explain how a cubic term or negative quartic term produces a first-order transition',
            'Identify order parameters and broken symmetries for magnets, superfluids, crystals and liquid crystals',
            'Write the Landau-Ginzburg functional with a gradient term and derive the correlation length $\\xi \\propto |T - T_c|^{-1/2}$',
          ],
          concepts: [
            'Order parameter and symmetry',
            'Landau expansion $f = a(T)m^2 + bm^4 + \\dots$',
            'Continuous vs first-order within Landau theory',
            'Mean-field exponents from Landau theory',
            'Landau-Ginzburg functional and the gradient term',
            'Correlation length and the exponent $\\nu$',
            'Goldstone modes for continuous symmetries',
            'Universality of mean-field predictions',
          ],
          explanation: `Landau's insight was that near a continuous transition the order parameter $m$ is small, so the free energy can be expanded in it, with the terms allowed dictated by **symmetry**. For the Ising magnet $f$ must be even in $m$:
$$f(m, T) = f_0 + a(T)m^2 + b\\,m^4 + \\dots,\\qquad a(T) = a_0(T - T_c),\\ b > 0 .$$
For $T > T_c$ the minimum is at $m = 0$; for $T < T_c$ the quadratic term goes negative and the minima move to $m = \\pm\\sqrt{-a/2b} \\propto (T_c - T)^{1/2}$. Add $-Bm$ and you get $\\chi \\propto 1/|a|$, so $\\gamma = 1$; at $T_c$, $B \\propto m^3$, so $\\delta = 3$; the heat capacity has a finite jump, $\\alpha = 0$. These are exactly the mean-field exponents, now seen to follow from nothing but analyticity of $f$ and symmetry. That is why the van der Waals fluid and the Ising mean-field theory agree: Landau theory is the common core of all mean-field theories.

The same expansion explains **first-order** transitions. If symmetry permits a cubic term (as for a liquid-solid or nematic transition) or if $b < 0$ (with a stabilising $m^6$ term), $f$ develops a second minimum at finite $m$ that becomes the global minimum while $m = 0$ is still locally stable: the order parameter jumps, with latent heat and hysteresis. Landau theory thus gives a classification of transitions by symmetry, which is still how phases are organised today (with topological order as the modern exception).

To describe **fluctuations** you let $m$ vary in space and penalise gradients: the **Landau-Ginzburg functional** $F[m] = \\int d^dx\\,[\\tfrac{1}{2}c(\\nabla m)^2 + a m^2 + bm^4]$. Linearising around the minimum gives correlations that decay as $e^{-r/\\xi}$ with correlation length $\\xi = \\sqrt{c/2|a|} \\propto |T - T_c|^{-1/2}$, i.e. $\\nu = 1/2$. The divergence of $\\xi$ at $T_c$ is the central fact of critical phenomena: the system has no characteristic length, fluctuations on all scales matter, and that is what the renormalization group exploits. When the broken symmetry is continuous (superfluid phase, spin direction in a Heisenberg magnet) rotating the order parameter slowly costs only gradient energy, producing gapless **Goldstone modes** (spin waves, phonons, second sound).

Read Tong 5.3-5.4 and Kardar 8.334 lectures 1-4. The exercises include a numerical Landau-Ginzburg relaxation that lets you watch domains coarsen.`,
          resources: [
            { ...R.tong, note: 'Chapter 5, sections 5.3-5.4: Landau theory, Landau-Ginzburg and correlations.', primary: true },
            { ...R.mit8334, note: 'Lectures 1-5: Landau-Ginzburg Hamiltonian, saddle-point, fluctuations.' },
            { ...R.sethna, note: 'Chapter 9 (Order parameters, broken symmetry, and topology).' },
          ],
          exercises: [
            {
              slug: 'landau-exponents',
              title: 'Exponents and discontinuities from Landau theory',
              prompt:
                'From $f = a_0(T - T_c)m^2 + bm^4 - Bm$ derive $\\beta$, $\\gamma$ (both sides of $T_c$, including the amplitude ratio 2), $\\delta$ and the heat-capacity jump $\\Delta C = a_0^2T_c/2b$. Then add a cubic term $-cm^3$ and show the transition becomes first-order at a temperature $T^* > T_c$; find $T^*$ and the jump in $m$. Plot $f(m)$ at several temperatures for both cases.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'correlation-length-derivation',
              title: 'Correlation function from Landau-Ginzburg',
              prompt:
                'Linearise the Landau-Ginzburg functional about $m = 0$ (for $T > T_c$) with a point source and solve $(-c\\nabla^2 + 2a)G(r) = \\delta(\\mathbf r)$ in 3D to obtain $G(r) \\propto e^{-r/\\xi}/r$ with $\\xi = \\sqrt{c/2a}$. Identify $\\nu = 1/2$ and $\\eta = 0$. Show that the susceptibility is $\\chi \\propto \\int G\\,d^3r \\propto \\xi^2$, which is the mean-field version of the scaling relation $\\gamma = \\nu(2 - \\eta)$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'lg-relaxation-coarsening',
              title: 'Simulate domain coarsening',
              prompt:
                'Integrate the relaxational dynamics $\\partial_t m = -\\delta F/\\delta m = c\\nabla^2m - 2am - 4bm^3$ (Allen-Cahn equation) on a $256\\times256$ grid with $a < 0$, starting from small random noise. Show snapshots at increasing times, measure the typical domain size $L(t)$ from the structure factor or the inverse interface length, and verify $L \\propto t^{1/2}$. Explain why the final state is not reached in finite time.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can the Landau free energy of an Ising magnet contain no odd powers of m at B = 0?',
              answerOutline:
                'The Hamiltonian is invariant under s → −s, so f(m) must equal f(−m); odd terms would break this symmetry.',
            },
            {
              question: 'How does Landau theory produce a first-order transition?',
              answerOutline:
                'A symmetry-allowed cubic term, or a negative quartic coefficient with a positive sextic, creates a second minimum at finite m that overtakes m = 0 while both are locally stable; m jumps discontinuously.',
            },
            {
              question: 'What is the physical meaning of the correlation length ξ and how does it behave at T_c?',
              answerOutline:
                'The distance over which order-parameter fluctuations are correlated; it diverges at T_c (ξ ∝ |T−T_c|^{−ν}), so fluctuations exist at all scales.',
            },
          ],
        },
        {
          slug: 'exact-solutions-scaling-and-universality',
          title: 'Exact solutions, scaling and universality',
          summary:
            'The transfer-matrix solution of the 1D Ising chain, Onsager\'s 2D result, the scaling hypothesis that links exponents, and the universality classes it predicts.',
          estimatedMinutes: 120,
          objectives: [
            'Solve the 1D Ising model exactly with the transfer matrix and show it has no transition at $T > 0$',
            'State Onsager\'s result $k_BT_c = 2J/\\ln(1 + \\sqrt2)$ and the 2D exponents, and explain the Peierls argument for why 2D orders',
            'Formulate the scaling hypothesis for the free energy and derive the exponent relations (Rushbrooke, Widom, Josephson)',
            'Explain universality and the role of dimension and symmetry in determining the class',
          ],
          concepts: [
            'Transfer matrix method',
            'Absence of a 1D transition; Peierls argument',
            'Onsager solution and 2D Ising exponents',
            'Correlation length divergence $\\xi \\propto |t|^{-\\nu}$',
            'Scaling hypothesis for $f(t, h)$',
            'Exponent relations: $\\alpha + 2\\beta + \\gamma = 2$, $\\gamma = \\beta(\\delta - 1)$, $2 - \\alpha = d\\nu$',
            'Universality classes',
            'Finite-size scaling (capstone preview)',
          ],
          explanation: `A few models can be solved exactly, and they calibrate every approximation. For the **1D Ising chain** with periodic boundaries, write the Boltzmann weight as a product of factors $T_{s_is_{i+1}} = e^{\\beta Js_is_{i+1} + \\beta B(s_i + s_{i+1})/2}$; then $Z = \\mathrm{Tr}\\,T^N = \\lambda_+^N + \\lambda_-^N$ where $\\lambda_\\pm$ are the eigenvalues of the $2\\times2$ **transfer matrix**. For $N \\to \\infty$, $f = -k_BT\\ln\\lambda_+$, and $\\lambda_+$ is analytic for all $T > 0$: the 1D chain never orders. Physically, a single domain wall costs energy $2J$ but gains entropy $k_B\\ln N$ from its position, and entropy wins for any $T > 0$. In 2D a domain of size $L$ costs $\\sim JL$ against entropy $\\sim k_B L\\ln 3$, so for low enough $T$ energy wins: this is **Peierls' argument** that the 2D model orders. Onsager (1944) solved it exactly: $k_BT_c = 2J/\\ln(1 + \\sqrt2) = 2.269J$, $m \\propto (T_c - T)^{1/8}$, $C \\propto -\\ln|T - T_c|$ ($\\alpha = 0$ logarithmic), $\\gamma = 7/4$, $\\nu = 1$. Mean-field theory is badly wrong in 2D.

The exponents are not independent. Widom's **scaling hypothesis** states that near $T_c$ the singular part of the free energy is a generalised homogeneous function, $f(t, h) = |t|^{2-\\alpha}\\Phi(h/|t|^{\\Delta})$ with $t = (T - T_c)/T_c$. Differentiating gives the exponent relations $\\alpha + 2\\beta + \\gamma = 2$ and $\\gamma = \\beta(\\delta - 1)$, and adding the hypothesis that $\\xi$ is the only relevant length gives $2 - \\alpha = d\\nu$ (hyperscaling). Only two exponents are independent. Check that Onsager's values satisfy all three; mean-field values violate hyperscaling except at $d = 4$.

**Universality** is the empirical and (after the RG, next lesson) theoretical statement that exponents depend only on the dimension of space, the symmetry and dimension of the order parameter, and the range of interactions, not on microscopic details. The liquid-gas critical point, uniaxial magnets and binary alloys share the 3D Ising class ($\\beta = 0.326$, $\\gamma = 1.237$, $\\nu = 0.630$); superfluid helium and XY magnets share another; the measured argon exponent from lesson 1's exercise is an Ising exponent. Finite-size scaling, the tool of the capstone, is the scaling hypothesis applied with the system size $L$ as the extra length: $\\chi(T, L) = L^{\\gamma/\\nu}\\tilde\\chi(tL^{1/\\nu})$.

Read Tong 5.4-5.5 and Kardar 8.334 lectures 6-8; the transfer-matrix exercise is essential and the finite-size scaling one is the capstone's first step.`,
          resources: [
            { ...R.tong, note: 'Chapter 5, sections 5.4-5.5: 1D Ising solution, scaling, universality.', primary: true },
            { ...R.mit8334, note: 'Lectures 6-9: scaling hypothesis, exponent identities, exact 1D and 2D results.' },
            { ...R.sethna, note: 'Chapter 12, including the exercises on scaling collapse of real data.' },
          ],
          exercises: [
            {
              slug: 'transfer-matrix-1d',
              title: 'The 1D Ising chain by transfer matrix',
              prompt:
                'Derive the transfer matrix and its eigenvalues; obtain $f$, $m(T, B)$, $\\chi(T)$ and the correlation function $\\langle s_0 s_r\\rangle = \\tanh^r(\\beta J)$ at $B = 0$, hence $\\xi = -1/\\ln\\tanh(\\beta J)$. Show $\\xi \\sim \\tfrac{1}{2}e^{2\\beta J}$ as $T \\to 0$ (an "essential singularity" at $T = 0$). Implement the transfer matrix numerically for a finite ring and compare with a brute-force enumeration for $N = 10$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'exponent-relations',
              title: 'Scaling relations and their verification',
              prompt:
                'From $f(t,h) = |t|^{2-\\alpha}\\Phi(h/|t|^\\Delta)$ derive $\\beta = 2 - \\alpha - \\Delta$, $\\gamma = 2\\Delta - 2 + \\alpha$, $\\delta = \\Delta/\\beta$ and hence Rushbrooke and Widom. Verify them with the exact 2D Ising exponents, the 3D Ising values ($\\alpha = 0.110$, $\\beta = 0.326$, $\\gamma = 1.237$, $\\delta = 4.79$, $\\nu = 0.630$) and the mean-field set. Check hyperscaling in each case and explain the mean-field failure.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'finite-size-scaling-intro',
              title: 'First finite-size scaling collapse',
              prompt:
                'Using your Metropolis Ising code, measure $\\chi(T)$ for $L = 8, 16, 32$ near $T_c$. Plot $\\chi L^{-\\gamma/\\nu}$ versus $tL^{1/\\nu}$ with the exact 2D exponents and show the three curves collapse. Then treat $T_c$ as unknown: locate the peak of $\\chi$ for each $L$ and extrapolate $T_c(L) = T_c + aL^{-1/\\nu}$ to $L \\to \\infty$, comparing with 2.269.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the 1D Ising model have no phase transition at finite temperature?',
              answerOutline:
                'Domain walls cost finite energy 2J but gain entropy k_B ln N from their position; free energy of a wall is negative for any T > 0, so order is destroyed. Equivalently λ₊ is analytic.',
            },
            {
              question: 'What is the content of the scaling hypothesis?',
              answerOutline:
                'The singular free energy near T_c is a homogeneous function of t and h, so all exponents follow from two; physically ξ is the only relevant length.',
            },
            {
              question: 'Which properties determine a universality class?',
              answerOutline:
                'Spatial dimension, symmetry and number of components of the order parameter, and the range of interactions; microscopic details (lattice, J value) only set T_c and amplitudes.',
            },
          ],
        },
        {
          slug: 'the-renormalization-group',
          title: 'The renormalization group',
          summary:
            'Coarse-graining as a transformation on Hamiltonians: fixed points, relevant and irrelevant operators, and why exponents are universal. Exact decimation in 1D and the block-spin picture in 2D.',
          estimatedMinutes: 130,
          objectives: [
            'Explain the renormalization group as iterated coarse-graining and rescaling, and what a fixed point means',
            'Carry out the exact decimation RG for the 1D Ising chain and interpret the flow',
            'Linearise an RG map about its critical fixed point and derive $\\nu$ from the relevant eigenvalue',
            'Explain relevant, irrelevant and marginal operators and how they explain universality',
          ],
          concepts: [
            'Coarse-graining and rescaling; block spins',
            'RG flow in coupling space',
            'Fixed points: trivial ($T = 0$, $T = \\infty$) and critical',
            'Relevant, irrelevant and marginal directions',
            'Exponent $\\nu$ from the eigenvalue $y_t$: $\\nu = 1/y_t$',
            'Decimation of the 1D Ising chain',
            'Migdal-Kadanoff and real-space RG approximations',
            'Universality explained by fixed points',
          ],
          explanation: `At $T_c$ the correlation length is infinite, so the system looks the same at every magnification. Kadanoff (1966) turned that into a method, and Wilson (1971, Nobel 1982) into a calculus. **Coarse-grain**: group spins into blocks of linear size $b$ and replace each block by a single spin (majority rule, or sum over the block's internal configurations). **Rescale** lengths by $b$ so the new lattice looks like the old. The result is a new Hamiltonian for the block spins, with new couplings $K' = R(K)$. Iterating this map gives an **RG flow** in the space of couplings. Away from $T_c$ the correlation length shrinks, $\\xi' = \\xi/b$, so after enough steps the system looks either fully ordered ($K \\to \\infty$) or fully disordered ($K \\to 0$): two trivial **fixed points**. Exactly at $T_c$, $\\xi = \\infty$ is unchanged, so the critical state is a *third* fixed point $K^*$ of the map, unstable in the temperature direction.

Linearising near $K^*$, $K' - K^* \\approx b^{y_t}(K - K^*)$, and since $\\xi \\propto |K - K^*|^{-\\nu}$ must satisfy $\\xi' = \\xi/b$, you get
$$\\nu = \\frac{1}{y_t}.$$
All exponents follow from the eigenvalues of the linearised RG at the critical fixed point. Directions with $y > 0$ are **relevant** (temperature, field): they must be tuned to reach criticality. Directions with $y < 0$ are **irrelevant**: any microscopic detail along them flows away to zero under coarse-graining. That is **universality**: all Hamiltonians in the basin of attraction of the same fixed point share its exponents, and the basin is determined by symmetry and dimension. Mean-field theory corresponds to the Gaussian fixed point, which is the stable critical fixed point only for $d > 4$; below 4 the Wilson-Fisher fixed point takes over, and the $\\epsilon = 4 - d$ expansion computes its exponents.

Two calculations make this concrete. **1D decimation**: summing over every second spin of the Ising chain gives an exact map $\\tanh K' = \\tanh^2 K$, whose only fixed points are $K = 0$ and $K = \\infty$: no critical point, as the transfer matrix showed, and the flow explains why $\\xi$ halves per step. **2D block spins** on the triangular lattice (Niemeijer-van Leeuwen) or the Migdal-Kadanoff bond-moving approximation give an approximate critical fixed point with $\\nu \\approx 1$ and $T_c$ within 10-20%, which is remarkable for such a crude scheme.

Read Tong 5.6-5.7, Kardar 8.334 lectures 10-14, and Wilson's Nobel lecture for the history. The exercises do both calculations and then apply a numerical block-spin RG to Ising Monte Carlo configurations, which is the perfect bridge to the capstone.`,
          resources: [
            { ...R.tong, note: 'Chapter 5, sections 5.6-5.7: real-space RG, the 1D decimation, and the epsilon expansion overview.', primary: true },
            { ...R.mit8334, note: 'Lectures 10-14: the renormalization group, fixed points, relevant operators, Wilson-Fisher.' },
            {
              title: 'Kenneth Wilson — Nobel Lecture 1982: The Renormalization Group and Critical Phenomena',
              url: 'https://www.nobelprize.org/prizes/physics/1982/wilson/lecture/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
              note: 'The physical motivation in Wilson\'s own words.',
            },
            { ...R.sethna, note: 'Chapter 12.3 and the exercises on the RG for the Ising model and for period doubling.' },
          ],
          exercises: [
            {
              slug: 'decimation-1d',
              title: 'Exact decimation of the 1D Ising chain',
              prompt:
                'Sum over every second spin of the chain with $K = \\beta J$ and show the remaining spins have the same form of Hamiltonian with $K\' = \\tfrac{1}{2}\\ln\\cosh 2K$, equivalently $\\tanh K\' = \\tanh^2 K$, plus a constant. Find the fixed points, show $K = \\infty$ is unstable and $K = 0$ stable, and verify that $\\xi(K\') = \\xi(K)/2$ using the exact $\\xi = -1/\\ln\\tanh K$. Iterate the map numerically from $K = 2$ and plot the flow.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'migdal-kadanoff-2d',
              title: 'Migdal-Kadanoff RG for the 2D Ising model',
              prompt:
                'Apply the Migdal-Kadanoff scheme with $b = 2$ to the square lattice: move bonds so that decimation is possible, which gives $K\' = \\tfrac{1}{2}\\ln\\cosh(4K)$ (or an equivalent form depending on the bond-moving order). Find the nontrivial fixed point $K^*$ numerically, compute $y_t = \\ln(dK\'/dK|_{K^*})/\\ln 2$ and $\\nu = 1/y_t$, and compare with the exact $K_c = 0.4407$ and $\\nu = 1$.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'block-spin-monte-carlo',
              title: 'Block-spin RG on Monte Carlo configurations',
              prompt:
                'Generate equilibrium $128\\times128$ Ising configurations at $T = 2.0, 2.269, 2.6$ (in units $J/k_B$). Apply the majority-rule block-spin transformation with $b = 2$ repeatedly and display the sequence of coarse-grained images. Show that below $T_c$ the images become uniform, above $T_c$ they become noise, and at $T_c$ they keep the same statistical appearance (compute the block magnetisation distribution at each level to make this quantitative).',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a fixed point of the RG and why is the critical point one?',
              answerOutline:
                'A Hamiltonian unchanged by coarse-graining plus rescaling; at T_c, ξ = ∞ is invariant under rescaling, so the critical system maps to itself.',
            },
            {
              question: 'How does the RG explain universality?',
              answerOutline:
                'Irrelevant couplings flow to zero under coarse-graining, so all microscopically different Hamiltonians in the same basin of attraction reach the same fixed point and share its exponents.',
            },
            {
              question: 'How is ν obtained from an RG map?',
              answerOutline:
                'Linearise at the critical fixed point; the relevant eigenvalue λ_t = b^{y_t} gives ν = 1/y_t, because ξ ∝ |K − K*|^{−ν} must shrink by b each step.',
            },
            {
              question: 'Why does mean-field theory become correct above four dimensions?',
              answerOutline:
                'The quartic coupling is irrelevant at the Gaussian fixed point for d > 4 (its RG eigenvalue is 4 − d), so fluctuations do not change the mean-field exponents.',
            },
          ],
        },
      ],
      project: {
        slug: 'ising-monte-carlo-engine',
        title: 'An Ising Monte Carlo engine with error analysis',
        description: `Turn the Metropolis code from this module into a reusable, tested engine for the capstone. It should support arbitrary square lattice sizes, periodic boundaries, external field, both Metropolis single-spin flips and the Wolff cluster algorithm, and should output time series of energy and magnetisation.

Implement proper error analysis: measure the integrated autocorrelation time $\\tau$ of the magnetisation at several temperatures, demonstrate critical slowing down for Metropolis ($\\tau \\propto L^{z}$ with $z \\approx 2$ at $T_c$) and its near-absence for Wolff, and compute error bars by binning or jackknife. Validate against the exact 1D chain and against Onsager's exact energy and magnetisation curves for $L \\to \\infty$.`,
        deliverables: [
          'Python (NumPy, optionally Numba) package with tests comparing to exact 1D and known 2D results',
          'A notebook showing autocorrelation times versus L for both algorithms and the measured dynamic exponent z',
          'Equilibrium curves of energy, |m|, C and χ for L = 32 with error bars, overlaid on Onsager\'s solution',
        ],
        estimatedHours: 12,
        stretchGoals: ['Add the 3D cubic lattice and locate its T_c ≈ 4.51 J/k_B', 'Implement histogram reweighting to obtain observables at nearby temperatures from one run'],
      },
    },
    {
      slug: 'applications',
      title: 'Applications: Stars, Chemistry and Information',
      description:
        'The machinery applied outside the textbook: degenerate stars and ionisation equilibrium, chemical reactions and the law of mass action, Brownian motion and fluctuation-dissipation, and the thermodynamics of information.',
      lessons: [
        {
          slug: 'stellar-matter-saha-and-white-dwarfs',
          title: 'Stellar matter: the Saha equation and white dwarf structure',
          summary:
            'Ionisation equilibrium from the chemical potential of an ideal gas, radiation pressure in massive stars, and the full hydrostatic structure of a degenerate star.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the Saha equation from equality of chemical potentials in the reaction $H \\rightleftharpoons p + e^-$',
            'Compute the ionisation fraction of hydrogen as a function of temperature and density, and explain the spectral-type sequence of stars',
            'Compare gas and radiation pressure inside stars and derive the Eddington ratio $\\beta = p_{gas}/p$',
            'Integrate the hydrostatic equilibrium equations for a degenerate star and obtain the mass-radius relation and Chandrasekhar limit numerically',
          ],
          concepts: [
            'Saha equation',
            'Ionisation fraction and the role of density',
            'Stellar spectral sequence as a temperature sequence',
            'Radiation pressure $p_{rad} = aT^4/3$',
            'Hydrostatic equilibrium $dp/dr = -G m\\rho/r^2$',
            'Degenerate equation of state $p \\propto \\rho^{5/3}$ and $\\rho^{4/3}$',
            'Polytropes and the Lane-Emden equation',
            'Chandrasekhar mass $1.44\\,M_\\odot$',
          ],
          explanation: `Everything in this lesson follows from two tools you already own: the chemical potential of an ideal gas, $\\mu = k_BT\\ln(n\\lambda^3) - \\epsilon_{int}$ (with internal energy offset and degeneracy factors), and the degenerate Fermi gas.

**Saha.** In a stellar atmosphere hydrogen atoms, protons and electrons are in equilibrium through $H \\rightleftharpoons p + e^-$. Equilibrium at fixed $T$ and $V$ minimises $F$, which (as in any reaction) means $\\mu_H = \\mu_p + \\mu_e$. Inserting the ideal-gas chemical potentials, with the binding energy $-13.6$ eV in $\\mu_H$ and spin degeneracies, gives the **Saha equation**
$$\\frac{n_pn_e}{n_H} = \\frac{(2\\pi m_ek_BT)^{3/2}}{h^3}\\,e^{-13.6\\,\\mathrm{eV}/k_BT} .$$
The exponential suggests ionisation at $k_BT \\sim 13.6$ eV, i.e. 150,000 K, but the enormous prefactor (the number of thermal cells per electron) means hydrogen is half-ionised near 10,000 K at solar photospheric densities. The dependence on density is why ionisation is not a function of temperature alone. Saha's 1920 result explained why the Balmer lines are strongest in A stars: cooler stars have too few excited atoms, hotter ones too few neutral atoms. It is the bridge from statistical mechanics to stellar spectroscopy (the stellar-astrophysics subject builds on it).

**Pressure in stars.** Gas pressure $\\rho k_BT/\\mu m_p$ competes with radiation pressure $aT^4/3$ from lesson 5.2. Their ratio scales as $M^2$ along the main sequence, which is why stars above $\\sim 100\\,M_\\odot$ blow themselves apart and the upper main sequence is bounded.

**White dwarfs.** Combine hydrostatic equilibrium, $dp/dr = -Gm\\rho/r^2$ and $dm/dr = 4\\pi r^2\\rho$, with the degenerate electron equation of state, $p = K\\rho^{5/3}$ non-relativistic, $p = K'\\rho^{4/3}$ relativistic (the module 5 results, with $\\rho = \\mu_e m_p n_e$). A polytrope $p = K\\rho^{1+1/n}$ reduces this to the **Lane-Emden equation**. For $n = 3/2$ you get $R \\propto M^{-1/3}$; for $n = 3$ the mass is independent of radius and equals the Chandrasekhar mass $1.44\\,(2/\\mu_e)^2\\,M_\\odot$. You will integrate these equations yourself and reproduce both results; it is the most satisfying exercise in the subject.

Read Tong 3.6 (white dwarf section), Kardar's problem on Saha, and Chandrasekhar's Nobel lecture.`,
          resources: [
            { ...R.tong, note: 'Chapter 3.6.3 for white dwarfs; chapter 2 problem sheet for the Saha equation.', primary: true },
            {
              title: 'Chandrasekhar — Nobel Lecture 1983',
              url: 'https://www.nobelprize.org/prizes/physics/1983/chandrasekhar/lecture/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
            },
            { ...R.mit8333, note: 'Problem sets include the Saha equation and degenerate stars.' },
            {
              title: 'NIST Atomic Spectra Database',
              url: 'https://www.nist.gov/pml/atomic-spectra-database',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Ionisation energies and level degeneracies for Saha calculations beyond hydrogen.',
            },
          ],
          exercises: [
            {
              slug: 'saha-ionisation-curve',
              title: 'Hydrogen ionisation versus temperature',
              prompt:
                'Derive the Saha equation from $\\mu_H = \\mu_p + \\mu_e$. Then, for a pure hydrogen gas at total number density $n = 10^{21}$ m$^{-3}$ (solar photosphere) and $10^{26}$ m$^{-3}$, solve for the ionisation fraction $x = n_p/n$ as a function of $T$ (it satisfies $x^2/(1-x) = S(T)/n$) and plot $x(T)$ from 3000 K to 30,000 K. Report the temperature of 50% ionisation in each case and explain why it is far below 13.6 eV/k_B.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lane-emden-white-dwarf',
              title: 'Integrate white dwarf structure',
              prompt:
                'Write a code that integrates $dp/dr$ and $dm/dr$ outward from a central density $\\rho_c$ with the full (not polytropic) degenerate electron equation of state, which interpolates between $\\rho^{5/3}$ and $\\rho^{4/3}$ (use the exact parametric form $p(x_F)$ with $x_F = p_F/m_ec$), for $\\mu_e = 2$. Stop where $p \\to 0$. Scan $\\rho_c$ from $10^8$ to $10^{13}$ kg/m³ and plot $R(M)$. Confirm $R \\propto M^{-1/3}$ at low mass and $M \\to 1.44\\,M_\\odot$ as $R \\to 0$. Overlay the measured mass and radius of Sirius B ($1.02\\,M_\\odot$, $0.0084\\,R_\\odot$).',
              kind: 'simulation',
              difficulty: 3,
              hint: 'Use scipy.integrate.solve_ivp with an event at p = 0 and a logarithmic grid in r; the n = 3/2 and n = 3 polytropes are useful checks.',
            },
            {
              slug: 'eddington-standard-model',
              title: 'Gas versus radiation pressure',
              prompt:
                'Assume the ratio $\\beta = p_{gas}/(p_{gas} + p_{rad})$ is constant through a star (Eddington\'s standard model). Show that eliminating $T$ gives a polytrope of index 3 with $K \\propto [(1-\\beta)/\\beta^4]^{1/3}$, and hence that the stellar mass satisfies $M \\propto (1-\\beta)^{1/2}/(\\beta^2\\mu^2)$ (Eddington\'s quartic). Solve for $\\beta$ for $M = 1, 10, 100\\,M_\\odot$ with $\\mu = 0.6$ and comment on the stability of very massive stars.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does hydrogen ionise at ~10,000 K rather than ~150,000 K?',
              answerOutline:
                'The Saha prefactor (2πm_ek_BT)^{3/2}/h³ ≫ n: the free electron has enormous phase space (entropy) available, which outweighs the Boltzmann penalty until k_BT is only ~1/15 of the binding energy.',
            },
            {
              question: 'What equation of state gives the Chandrasekhar limit and why is there a limit?',
              answerOutline:
                'Ultra-relativistic degenerate electrons, p ∝ ρ^{4/3} (n = 3 polytrope); for this index the hydrostatic mass is independent of central density, so one unique mass exists and heavier stars cannot be supported.',
            },
            {
              question: 'What is the thermodynamic condition for chemical/ionisation equilibrium?',
              answerOutline:
                'Σ ν_i μ_i = 0 over the reaction (μ_H = μ_p + μ_e here), from minimising F or G with respect to the reaction coordinate.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/radiation-and-spectra/boltzmann-and-saha-equations'],
        },
        {
          slug: 'chemical-equilibrium-and-reaction-rates',
          title: 'Chemical equilibrium, the law of mass action and reaction rates',
          summary:
            'Why reactions stop before completion: the Gibbs energy of reaction, the equilibrium constant from partition functions, Le Chatelier\'s principle, and the Arrhenius law from transition-state ideas.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the law of mass action $K(T) = \\prod_i n_i^{\\nu_i}$ from $\\sum\\nu_i\\mu_i = 0$ and express $K$ through partition functions',
            'Relate $K$ to the standard Gibbs energy of reaction and derive the van \'t Hoff equation',
            'Use Le Chatelier\'s principle quantitatively for changes in $T$ and $p$',
            'Derive the Arrhenius form of a rate constant from a Boltzmann factor over a barrier and explain its limits',
          ],
          concepts: [
            'Reaction coordinate and stoichiometric coefficients $\\nu_i$',
            'Equilibrium: $\\sum_i\\nu_i\\mu_i = 0$',
            'Law of mass action and equilibrium constant $K$',
            '$\\Delta G^\\circ = -RT\\ln K$',
            'Van \'t Hoff equation $d\\ln K/dT = \\Delta H^\\circ/RT^2$',
            'Le Chatelier\'s principle',
            'Arrhenius law and activation energy',
            'Transition-state theory (sketch)',
          ],
          explanation: `A chemical reaction $\\sum_i\\nu_iA_i = 0$ (products positive, reactants negative) proceeds until the Gibbs free energy at fixed $T$ and $p$ is minimal with respect to the extent of reaction, which gives $\\sum_i\\nu_i\\mu_i = 0$, the Saha condition generalised. For ideal gases $\\mu_i = k_BT\\ln(n_i\\lambda_i^3/z_i^{int}) + \\epsilon_i^0$, where $z_i^{int}$ is the internal (rotational, vibrational, electronic) partition function of module 4 and $\\epsilon_i^0$ the ground-state energy. Substituting yields the **law of mass action**
$$\\prod_i n_i^{\\nu_i} = K(T) = \\prod_i\\left(\\frac{z_i^{int}}{\\lambda_i^3}\\right)^{\\nu_i}e^{-\\Delta\\epsilon^0/k_BT},$$
with $\\Delta\\epsilon^0 = \\sum\\nu_i\\epsilon_i^0$ the reaction energy. The equilibrium constant is computed entirely from molecular data: masses, moments of inertia, vibrational frequencies and bond energies, all available from the NIST WebBook. This is statistical mechanics doing chemistry, and for small molecules it is accurate to a few percent.

Chemists write $\\Delta G^\\circ = -RT\\ln K$ with $K$ in terms of partial pressures relative to a standard pressure, and tabulate $\\Delta H^\\circ$, $\\Delta S^\\circ$. Differentiating gives the **van 't Hoff equation** $d\\ln K/dT = \\Delta H^\\circ/RT^2$: exothermic reactions shift toward reactants when heated. Together with the pressure dependence through $\\Delta\\nu$ (the change in the number of gas molecules) this is **Le Chatelier's principle** in quantitative form, and it is why ammonia synthesis runs at high pressure and only moderately high temperature.

Equilibrium says nothing about *rates*. Most reactions must cross an energy barrier $E_a$; the fraction of collisions with enough energy is a Boltzmann factor, giving the **Arrhenius law** $k = A\\,e^{-E_a/k_BT}$. Transition-state theory makes this quantitative by treating the barrier top as an equilibrium "activated complex" with its own partition function, $k = (k_BT/h)\\,(z^\\ddagger/z_{reactants})e^{-E_a/k_BT}$. The factor $k_BT/h \\approx 6\\times10^{12}$ s$^{-1}$ is the universal attempt frequency.

Read MIT 5.60 lectures 17-22 for the chemist's development and Tong's problem sheet for the statistical one; use the WebBook for real numbers in the exercises.`,
          resources: [
            { ...R.mit560, note: 'Lectures 17-22: chemical equilibrium, temperature and pressure dependence, and the statistical-mechanical derivation of K.', primary: true },
            {
              title: 'NIST Chemistry WebBook',
              url: 'https://webbook.nist.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Thermochemical data (ΔH°, S°) and molecular constants for computing K from partition functions.',
            },
            { ...R.tong, note: 'Chapter 2 problem sheet and section 2.4 for internal partition functions.' },
          ],
          exercises: [
            {
              slug: 'k-from-partition-functions',
              title: 'Equilibrium constant of H₂ ⇌ 2H from partition functions',
              prompt:
                'Compute $K(T)$ for the dissociation of hydrogen from 1000 K to 6000 K using $\\Theta_{rot} = 85$ K, $\\Theta_{vib} = 6330$ K, bond energy $D_0 = 4.48$ eV, and the electronic degeneracy 2 of the H atom. Plot the degree of dissociation at 1 atm versus $T$ and compare $K$ at 3000 K with the value from the NIST thermochemical tables ($\\Delta G^\\circ = -RT\\ln K$).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'haber-process-le-chatelier',
              title: 'The Haber process quantitatively',
              prompt:
                'For N$_2$ + 3H$_2$ ⇌ 2NH$_3$ use NIST $\\Delta H^\\circ_{298} = -92$ kJ/mol and $\\Delta S^\\circ_{298} = -199$ J/(mol K) (assume constant) to compute $K_p(T)$ from 300 K to 800 K. For a stoichiometric feed, compute the equilibrium NH$_3$ mole fraction at 1, 100 and 300 atm at 700 K (solve the resulting polynomial numerically). Explain the engineering compromise between rate and yield.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'arrhenius-fit',
              title: 'Fit an Arrhenius law',
              prompt:
                'Take published rate constants versus temperature for a simple gas-phase reaction (e.g. the decomposition of N$_2$O$_5$, or any dataset from the NIST Chemical Kinetics Database), fit $\\ln k$ versus $1/T$, and extract $E_a$ and $A$ with uncertainties. Compare $A$ with the transition-state estimate $k_BT/h$ and discuss the entropy of activation implied by the ratio.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a reaction with negative ΔG° not proceed to completion?',
              answerOutline:
                'The entropy of mixing of reactants and products makes G of the mixture lower than that of pure products; G is minimised at a finite extent of reaction where Σν_iμ_i = 0.',
            },
            {
              question: 'What does the van \'t Hoff equation say about an exothermic reaction heated at constant pressure?',
              answerOutline:
                'd ln K/dT = ΔH°/RT² < 0, so K decreases: equilibrium shifts toward reactants (Le Chatelier).',
            },
            {
              question: 'Where does the Arrhenius exponential come from?',
              answerOutline:
                'The Boltzmann probability of having energy ≥ E_a to cross the barrier (or the equilibrium population of the transition state).',
            },
          ],
        },
        {
          slug: 'brownian-motion-and-fluctuation-dissipation',
          title: 'Brownian motion, the Langevin equation and fluctuation-dissipation',
          summary:
            'Random walks, Einstein\'s relation between diffusion and friction, the Langevin equation, and the general principle that the fluctuations of a system in equilibrium determine its response to perturbations.',
          estimatedMinutes: 110,
          objectives: [
            'Derive $\\langle x^2\\rangle = 2Dt$ for a random walk and relate $D$ to the step statistics',
            'Derive the Einstein relation $D = k_BT/\\gamma$ (and the Stokes-Einstein formula) from the balance of diffusion and drift',
            'Solve the Langevin equation for the velocity autocorrelation and show the noise strength is fixed by $k_BT$',
            'State the fluctuation-dissipation theorem and recognise its instances (Johnson noise, energy fluctuations, compressibility)',
          ],
          concepts: [
            'Random walk and diffusion equation',
            'Einstein relation $D = \\mu k_BT$',
            'Stokes-Einstein $D = k_BT/6\\pi\\eta a$',
            'Langevin equation $m\\dot v = -\\gamma v + \\xi(t)$',
            'White noise and $\\langle\\xi(t)\\xi(t\')\\rangle = 2\\gamma k_BT\\delta(t - t\')$',
            'Velocity autocorrelation function',
            'Fluctuation-dissipation theorem',
            'Johnson-Nyquist noise',
          ],
          explanation: `A pollen grain in water jitters because water molecules kick it unevenly. Einstein (1905) saw that the same molecular motion that causes the jitter also causes viscous friction, and that relating the two measures Avogadro's number. Perrin's experiments confirmed it and ended doubts about atoms.

**Random walk.** Independent steps of mean-square length $\\ell^2$ every $\\tau$ give $\\langle x^2\\rangle = (\\ell^2/\\tau)\\,t \\equiv 2Dt$. The distribution of displacements is Gaussian by the central limit theorem and obeys the diffusion equation $\\partial_tP = D\\partial_x^2P$. **Einstein's relation.** Put the particles in a force field $F$; they drift with velocity $v = F/\\gamma$ (mobility $1/\\gamma$) and the density current is $nF/\\gamma - D\\partial_xn$. In equilibrium the current vanishes and $n \\propto e^{-U/k_BT}$ (Boltzmann), which forces
$$D = \\frac{k_BT}{\\gamma} .$$
With Stokes' $\\gamma = 6\\pi\\eta a$ you can measure $k_B$, hence $N_A = R/k_B$, with a microscope and a stopwatch.

**Langevin** wrote the Newtonian version: $m\\dot v = -\\gamma v + \\xi(t)$ with a random force of zero mean and $\\langle\\xi(t)\\xi(t')\\rangle = \\Gamma\\delta(t - t')$. Solving for the stationary $\\langle v^2\\rangle$ and demanding equipartition, $\\tfrac{1}{2}m\\langle v^2\\rangle = \\tfrac{1}{2}k_BT$, fixes $\\Gamma = 2\\gamma k_BT$. The random force and the friction are not independent: they come from the same collisions. The velocity autocorrelation is $\\langle v(0)v(t)\\rangle = (k_BT/m)e^{-\\gamma t/m}$, and its time integral is $D$: the **Green-Kubo** relation.

This is one instance of the **fluctuation-dissipation theorem**: for any system in equilibrium, the response to a small perturbation is determined by the spontaneous fluctuations of the conjugate variable. You have met others already: $\\langle(\\Delta E)^2\\rangle = k_BT^2C_V$, $\\langle(\\Delta N)^2\\rangle \\propto \\kappa_T$, $\\chi = \\beta\\langle(\\Delta M)^2\\rangle$ for the Ising model (which is how you measure $\\chi$ in the capstone). Nyquist's version, the voltage noise $\\langle V^2\\rangle = 4k_BTR\\,\\Delta f$ across any resistor, is used to measure temperatures and is the noise floor of every electronic measurement.

Read Tong's Kinetic Theory chapter 3 (stochastic processes) and Feynman I-41; Sethna chapter 10 gives the general FDT. The simulation exercise reproduces Perrin's measurement of $k_B$ from a simulated Langevin trajectory.`,
          resources: [
            { ...R.tongKinetic, note: 'Chapter 3 (Stochastic processes): Langevin and Fokker-Planck equations; chapter 4 on linear response.', primary: true },
            feynman(41, 'The Brownian Movement'),
            { ...R.sethna, note: 'Chapter 10 (Correlations, response, and dissipation), including Johnson noise and the FDT exercises.' },
            { ...R.mit8333, note: 'Lectures on the Boltzmann equation and transport (lectures 4-6) complement the Langevin picture.' },
          ],
          exercises: [
            {
              slug: 'langevin-simulation-perrin',
              title: 'Simulate Brownian motion and measure k_B',
              prompt:
                'Integrate the overdamped Langevin equation $\\dot x = \\sqrt{2D}\\,\\eta(t)$ (Euler-Maruyama) for 1000 particles of radius 0.5 μm in water ($\\eta = 10^{-3}$ Pa s) at 293 K, using $D = k_BT/6\\pi\\eta a$. Plot $\\langle x^2\\rangle(t)$, fit the slope to recover $D$, and from it compute $k_B$ and $N_A$ "as Perrin did". Then simulate the underdamped version with a finite mass and show the crossover from ballistic $\\langle x^2\\rangle \\propto t^2$ to diffusive behaviour at $t \\sim m/\\gamma$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'langevin-solution',
              title: 'Solve the Langevin equation',
              prompt:
                'Solve $m\\dot v = -\\gamma v + \\xi$ formally, compute $\\langle v(t)^2\\rangle$ in the stationary state in terms of $\\Gamma$, impose equipartition to obtain $\\Gamma = 2\\gamma k_BT$, then derive $\\langle v(0)v(t)\\rangle$ and $\\langle x^2(t)\\rangle = \\frac{2k_BT}{\\gamma}\\left[t - \\frac{m}{\\gamma}(1 - e^{-\\gamma t/m})\\right]$. Verify the Green-Kubo relation $D = \\int_0^\\infty\\langle v(0)v(t)\\rangle dt$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'johnson-noise-estimate',
              title: 'Johnson noise and the noise floor',
              prompt:
                'Derive the Nyquist formula $\\langle V^2\\rangle = 4k_BTR\\Delta f$ by treating a transmission line of length $L$ terminated by resistors $R$ as a 1D blackbody (count modes, apply equipartition in the classical limit). Compute the rms noise voltage of a 1 MΩ resistor at 300 K over a 1 MHz bandwidth, and the temperature at which quantum corrections ($hf \\sim k_BT$) matter at 1 GHz.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Einstein relation connect and what physical fact underlies it?',
              answerOutline:
                'Diffusion coefficient and mobility (friction), D = k_BT/γ; both arise from the same molecular collisions, and equilibrium (Boltzmann distribution) forces their ratio.',
            },
            {
              question: 'Why is the strength of the Langevin random force not a free parameter?',
              answerOutline:
                'The stationary velocity distribution must satisfy equipartition; this fixes Γ = 2γk_BT, an instance of fluctuation-dissipation.',
            },
            {
              question: 'Give three examples of fluctuation-dissipation relations you have met.',
              answerOutline:
                'Energy variance ↔ heat capacity; number variance ↔ compressibility; magnetisation variance ↔ susceptibility; velocity correlations ↔ diffusion; voltage noise ↔ resistance.',
            },
          ],
          relatedLessons: ['probability-statistics/limit-theorems-and-sampling/central-limit-theorem'],
        },
        {
          slug: 'information-maxwells-demon-and-landauer',
          title: 'Information, Maxwell\'s demon and Landauer\'s principle',
          summary:
            'Entropy as information closes the loop: why a demon cannot beat the second law, the Szilard engine, Landauer\'s $k_BT\\ln2$ per erased bit, and what it means for computation.',
          estimatedMinutes: 90,
          objectives: [
            'Describe Maxwell\'s demon and explain why measurement alone does not save the second law',
            'Analyse the Szilard engine and show it extracts $k_BT\\ln2$ of work per bit of information',
            'State Landauer\'s principle and explain why erasure, not measurement, carries the thermodynamic cost',
            'Relate Shannon entropy, thermodynamic entropy and the energy cost of computation, with current experimental tests',
          ],
          concepts: [
            'Maxwell\'s demon',
            'Szilard engine: one molecule, one bit, $k_BT\\ln2$ of work',
            'Landauer\'s principle: erasure costs $k_BT\\ln2$',
            'Reversible (logically) vs irreversible computation',
            'Bennett\'s exorcism of the demon',
            'Mutual information and feedback control',
            'Experimental tests with colloids and single electrons',
            'Thermodynamic cost of computing: current chips vs the Landauer bound',
          ],
          explanation: `Maxwell (1867) imagined a tiny being that watches molecules and opens a trapdoor only for fast ones, sorting a gas into hot and cold halves with no work. If possible, it would violate the second law. The resolution took a century and ended up redefining entropy.

**Szilard** (1929) reduced the demon to its essence: a single molecule in a box with a partition. The demon measures which half the molecule is in (one bit), inserts a piston from the empty side and lets the molecule push it out isothermally, extracting $W = k_BT\\int_{V/2}^V dV/V = k_BT\\ln2$ from the heat bath. Information has been converted into work. Where is the compensating entropy increase? Szilard guessed the measurement cost $k_B\\ln2$, but Bennett showed measurement can be done reversibly. The real cost is **erasure**: to repeat the cycle the demon must reset its one-bit memory, and **Landauer** (1961) proved that erasing a bit, compressing two memory states into one, reduces the memory's entropy by $k_B\\ln2$ and must dump at least $k_BT\\ln2$ of heat into the environment. The demon's gain and the erasure cost cancel exactly. The second law survives, provided the demon's memory is included in the system.

This is the physical meaning of the Shannon-Gibbs connection from module 3: information entropy *is* thermodynamic entropy, with the exchange rate $k_B\\ln2$ per bit. A memory that stores $N$ random bits is a system in a state of entropy $Nk_B\\ln2$, and you cannot make that entropy disappear for free. Logically irreversible operations (AND, erasure) must dissipate; logically reversible ones (NOT, CNOT, and in principle any computation built from Toffoli gates) need not, which is why reversible and quantum computing are studied. Landauer's bound has been measured directly: experiments with a colloidal particle in a double-well optical trap (2012) and with single-electron boxes recover $k_BT\\ln2 \\approx 3\\times10^{-21}$ J per bit at room temperature. A modern CPU dissipates roughly $10^{-15}$ J per logic operation, still a thousand times the bound, and that gap is a real topic in computer architecture.

Read Sethna chapter 5.3 and Feynman I-46 (the ratchet) for the mechanical demon; the Jaynes and Shannon papers from module 3 give the information side. The exercises analyse the Szilard engine quantitatively and simulate an erasure protocol.`,
          resources: [
            { ...R.sethna, note: 'Chapter 5.3 and the exercises on Maxwell\'s demon and the Szilard engine.', primary: true },
            feynman(46, 'Ratchet and Pawl'),
            {
              title: 'Jaynes (1957) — Information Theory and Statistical Mechanics',
              url: 'https://bayes.wustl.edu/etj/articles/theory.1.pdf',
              type: 'article',
              cost: 'free',
              provider: 'E. T. Jaynes archive',
              note: 'Re-read sections 1-2 in light of Landauer.',
            },
            { ...R.susskind, note: 'Lecture 1-2 contain Susskind\'s discussion of entropy as information.' },
          ],
          exercises: [
            {
              slug: 'szilard-engine-analysis',
              title: 'Quantitative Szilard engine',
              prompt:
                'Analyse a Szilard engine in which the measurement is imperfect: with probability $1 - \\epsilon$ the demon learns the correct half. Compute the average work extracted per cycle as a function of $\\epsilon$ (note that the wrong guess costs work), relate it to the mutual information between measurement and molecule position, $I = \\ln2 - H(\\epsilon)$, and show $W \\le k_BT\\,I$. Plot $W/k_BT$ versus $\\epsilon$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'landauer-erasure-simulation',
              title: 'Simulate bit erasure in a double well',
              prompt:
                'Simulate an overdamped Brownian particle in a double-well potential $U(x) = a(x^2 - 1)^2$ with $a = 5k_BT$ using the Langevin code from the previous lesson. Implement an erasure protocol: lower the barrier, tilt the potential to push the particle to the right well, remove the tilt, raise the barrier, over a total time $\\tau$. Compute the work done, averaged over many runs starting from either well, and show it approaches $k_BT\\ln2$ from above as $\\tau \\to \\infty$ and exceeds it for fast protocols. Plot $\\langle W\\rangle$ versus $\\tau$.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'computation-energy-budget',
              title: 'The energy budget of computation',
              prompt:
                'Estimate the number of bit operations per second performed by a modern data centre (say $10^{21}$ s$^{-1}$) and compute the Landauer-bound power at 300 K. Compare with the actual electricity consumption (~100 MW). Then estimate the Landauer cost of erasing the entire internet ($\\sim 10^{23}$ bits) and compare with the energy of a cup of tea. Write a paragraph on which of these comparisons are meaningful.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does measurement not rescue the second law from Maxwell\'s demon, but erasure does?',
              answerOutline:
                'Measurement can in principle be done reversibly (copying into a blank memory); resetting the memory compresses phase space and must export k_BT ln 2 of heat per bit (Landauer), paying for the work extracted.',
            },
            {
              question: 'How much work can be extracted from one bit of information about a system at temperature T?',
              answerOutline:
                'At most k_BT ln 2 (Szilard); more generally k_BT times the mutual information in nats.',
            },
            {
              question: 'Which logical operations are thermodynamically free in principle, and which are not?',
              answerOutline:
                'Logically reversible operations (bijections such as NOT, CNOT, Toffoli) can be done with no dissipation; irreversible ones (AND, OR, erasure) merge states and must dissipate at least k_BT ln 2 per lost bit.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'ising-finite-size-scaling',
    title: 'Capstone: an Ising-model Monte Carlo study with finite-size scaling',
    description: `Perform a complete computational study of the 2D Ising model as if you were writing a short paper. Using your Monte Carlo engine (module 6 project) with the Wolff cluster algorithm, simulate square lattices of $L = 8, 16, 32, 64, 128$ across a fine temperature grid around $T_c$, with autocorrelation-aware error bars.

Then extract the critical behaviour without assuming Onsager's answer. Locate $T_c$ from the crossing of the Binder cumulant $U_L = 1 - \\langle m^4\\rangle/3\\langle m^2\\rangle^2$, estimate $\\nu$ from the scaling of $dU_L/dT$ at $T_c$, $\\gamma/\\nu$ from the peak of $\\chi$ versus $L$, $\\beta/\\nu$ from $|m|$ at $T_c$ versus $L$, and show data collapse of $m$, $\\chi$ and $U_L$. Verify the hyperscaling relation $2\\beta/\\nu + \\gamma/\\nu = d$. Compare all values with the exact 2D results ($T_c = 2.269$, $\\nu = 1$, $\\beta = 1/8$, $\\gamma = 7/4$) and with mean-field theory, and discuss the systematic errors.

Finally, extend the study to one of: the 3D Ising model (expect $\\nu \\approx 0.63$, $\\beta \\approx 0.33$); the Ising model with an external field (first-order line and its finite-size signature); or the lattice-gas mapping to a liquid-gas transition with a comparison to the argon coexistence data from module 6.`,
    deliverables: [
      'Reproducible code repository with a single script that regenerates every figure from raw data',
      'Raw time series and processed observables with error bars for every (L, T)',
      'Binder-cumulant crossing plot, the three exponent fits with uncertainties, and data-collapse plots',
      'A 6-10 page report in the style of a Physical Review paper: method, error analysis, results, comparison with exact and mean-field theory, discussion of the extension',
    ],
    estimatedHours: 25,
    stretchGoals: [
      'Measure the dynamic critical exponent z for Metropolis and Wolff and explain the difference',
      'Implement histogram reweighting (Ferrenberg-Swendsen) and use it to refine T_c',
      'Apply a block-spin RG to your configurations and extract y_t directly from the flow of the coupling',
      'Compute the specific-heat exponent α and show it is consistent with the logarithmic divergence of the 2D model',
    ],
  },
  masteryChecklist: [
    'I can state the four laws of thermodynamics precisely and compute heat, work and entropy changes for reversible and irreversible processes',
    'I can construct the thermodynamic potentials, derive Maxwell relations and use them to express any derivative in terms of measurable response functions',
    'I can explain entropy both as k_B ln Ω and as Gibbs-Shannon information, and derive the Boltzmann distribution from a heat bath and from maximum entropy',
    'I can write down the partition function of a given system, compute its thermodynamics, and judge when the classical approximation fails',
    'I can derive the Bose-Einstein and Fermi-Dirac distributions and apply them to photons, phonons, electrons in metals, white dwarfs and Bose-Einstein condensates',
    'I can analyse first-order transitions with Clausius-Clapeyron and the Maxwell construction, and continuous ones with Landau theory, scaling and the renormalization group',
    'I can explain why mean-field exponents are wrong below four dimensions and what universality means',
    'I have written and validated an Ising Monte Carlo code with proper error analysis and extracted critical exponents by finite-size scaling',
    'I can apply the chemical potential to ionisation and chemical equilibria, and the fluctuation-dissipation theorem to Brownian motion and noise',
    'I can explain Landauer\'s principle and resolve Maxwell\'s demon using the equivalence of information and thermodynamic entropy',
  ],
});
