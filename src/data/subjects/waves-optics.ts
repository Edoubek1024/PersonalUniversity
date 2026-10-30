import { defineSubject } from '../define';

export default defineSubject({
  id: 'waves-optics',
  title: 'Waves, Oscillations and Optics',
  category: 'physics',
  tagline:
    'From one oscillator to coupled systems to continuous media: the wave equation, Fourier analysis, and the interference and diffraction of light.',
  description: `Almost every linear phenomenon in physics is an oscillation or a wave: a pendulum, an LC circuit, a vibrating string, sound, light, the wavefunction of an electron. This subject builds the common machinery once, carefully, so that later subjects (quantum mechanics, electromagnetism, optics, acoustics, signal processing) can use it without re-deriving it.

The structure follows MIT 8.03 and Howard Georgi's *The Physics of Waves*. You begin with the damped, driven harmonic oscillator and the complex-exponential method, couple two oscillators to discover normal modes, then take the number of oscillators to infinity to obtain the wave equation. Fourier analysis arrives as the natural language for superposing modes and for describing pulses and wave packets. The second half turns to light: electromagnetic plane waves, the ray limit (lenses, mirrors, instruments), and then the wave phenomena the ray picture cannot explain, namely interference, diffraction and polarisation.

Every module pairs derivation with computation: you will diagonalise coupled-oscillator matrices, integrate the wave equation on a grid, compute FFTs of real signals, and simulate diffraction patterns, then compare each against an analytic result or a simple experiment you can do with a laser pointer.`,
  difficulty: 'intermediate',
  estimatedHours: 60,
  prerequisites: ['classical-mechanics'],
  recommendedBackground: [
    'Complex numbers and Euler\'s formula',
    'Linear algebra: matrices, eigenvalues (math-methods/linear-algebra)',
    'Partial derivatives and basic ODEs',
    'Python with NumPy, SciPy and Matplotlib',
  ],
  tags: ['waves', 'oscillations', 'optics', 'Fourier', 'interference', 'diffraction', 'simulation'],
  core: true,
  modules: [
    {
      slug: 'oscillators-and-resonance',
      title: 'Oscillators and Resonance',
      description:
        'The harmonic oscillator as the atom of wave physics: the complex-exponential method, damping and Q, driven response and resonance, and the mechanical-electrical analogy.',
      lessons: [
        {
          slug: 'the-harmonic-oscillator-and-complex-exponentials',
          title: 'The harmonic oscillator and the complex-exponential method',
          summary:
            'Why linear systems with constant coefficients are solved by exponentials, how to use complex amplitudes fluently, and the physics of phase.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why $e^{i\\omega t}$ is the natural solution of linear, time-translation-invariant equations',
            'Represent any sinusoid as the real part of a complex amplitude times $e^{i\\omega t}$ and manipulate phases with it',
            'Identify the harmonic oscillator in mechanical, electrical and other guises and extract $\\omega_0$ by inspection',
            'Write energy, average power and phasor diagrams in complex notation',
          ],
          concepts: [
            'Linearity and superposition',
            'Time-translation invariance implies exponential solutions',
            'Complex amplitude $\\tilde A = Ae^{i\\phi}$; $x = \\mathrm{Re}[\\tilde A e^{i\\omega t}]$',
            'Phasor diagrams',
            'Time averages: $\\langle x y\\rangle = \\tfrac12\\mathrm{Re}[\\tilde x\\tilde y^*]$',
            'Oscillators everywhere: mass-spring, pendulum, LC circuit, torsion, floating body',
            'Energy exchange between kinetic and potential forms',
          ],
          explanation: `A **linear** system obeys superposition: if $x_1(t)$ and $x_2(t)$ are solutions, so is $a x_1 + b x_2$. A **time-translation-invariant** system has equations whose coefficients do not depend on $t$. Georgi's central observation is that these two properties alone force the solutions to be exponentials in time: the time-shift operator commutes with the dynamics, so its eigenfunctions, $e^{i\\omega t}$, are the natural modes. That is why the complex-exponential method works for *every* system in this subject, not just the mass on a spring.

Write any sinusoidal quantity as $x(t) = \\mathrm{Re}[\\tilde A e^{i\\omega t}]$ with a **complex amplitude** $\\tilde A = Ae^{i\\phi}$. Differentiation becomes multiplication by $i\\omega$; a phase lead of $90°$ is multiplication by $i$; adding sinusoids of the same frequency is adding complex numbers, which you can draw as a **phasor diagram**. Products need care: the time average of two sinusoids is $\\langle xy\\rangle = \\tfrac12\\mathrm{Re}[\\tilde x\\tilde y^*]$, not the real part of the product of complex amplitudes. Learn this rule now, because average power and intensity use it constantly.

The harmonic oscillator $\\ddot x + \\omega_0^2 x = 0$ appears whenever a system is displaced slightly from a stable equilibrium (see the energy-landscape lesson of classical mechanics). Practise spotting it: a mass on a spring ($\\omega_0^2 = k/m$), a pendulum ($g/L$), an LC circuit ($1/LC$), a torsion pendulum ($\\kappa/I$), a floating cylinder ($\\rho_w g A/m$), a gas in a tube with a piston. In every case the energy sloshes between two forms, kinetic and potential, electric and magnetic, with the total constant and each averaging to half.

Watch the first 8.03SC lecture and read Georgi chapter 1 (free PDF); it is slower and deeper than the usual treatment, and the time-translation argument is the reason the rest of the subject is coherent. The Feynman chapter is a lighter alternative for the complex method.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 1: Harmonic Oscillation (free PDF)',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              note: 'The whole book is free from the author; chapter 1 establishes the complex method from symmetry.',
              primary: true,
            },
            {
              title: 'MIT 8.03SC Physics III: Vibrations and Waves — Lecture 1',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Yen-Jie Lee\'s course; used throughout this subject. Problem sets are excellent.',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 21-22: The Harmonic Oscillator; Algebra',
              url: 'https://www.feynmanlectures.caltech.edu/I_21.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Chapter 22 builds complex exponentials from scratch for the oscillator.',
            },
            {
              title: 'HyperPhysics — Simple harmonic motion',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/shm.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
          ],
          exercises: [
            {
              slug: 'phasor-addition',
              title: 'Add sinusoids with phasors',
              prompt:
                'Add $3\\cos(\\omega t)$, $4\\cos(\\omega t + \\pi/2)$ and $2\\cos(\\omega t - 2\\pi/3)$ using complex amplitudes; give the resulting amplitude and phase. Draw the phasor diagram. Then verify numerically in Python by sampling the sum over one period and fitting it to $A\\cos(\\omega t + \\phi)$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'time-average-rule',
              title: 'Prove the time-average rule and use it for power',
              prompt:
                'Prove that for $x = \\mathrm{Re}[\\tilde x e^{i\\omega t}]$ and $y = \\mathrm{Re}[\\tilde y e^{i\\omega t}]$, $\\langle xy\\rangle = \\tfrac12\\mathrm{Re}[\\tilde x\\tilde y^*]$. Use it to compute the average power $\\langle F\\dot x\\rangle$ delivered to an oscillator driven at frequency $\\omega$ with displacement amplitude $\\tilde A$ and force amplitude $F_0$, and show it vanishes when displacement and force are in phase.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'oscillators-in-disguise',
              title: 'Spot the oscillator',
              prompt:
                'For each system derive the equation of motion and $\\omega_0$: (a) an LC circuit, (b) a U-tube of liquid of column length $\\ell$, (c) a mass on a spring on a frictionless incline, (d) a small bead sliding in a smooth spherical bowl of radius $R$, (e) a charged particle displaced along the axis of a uniformly charged ring. Identify the two energy forms in each.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are exponentials the natural solutions of linear time-translation-invariant systems?',
              answerOutline:
                'The time-shift operator commutes with the equation of motion, so solutions can be chosen as its eigenfunctions, which are exponentials e^{i omega t}; superposition then builds everything else.',
            },
            {
              question: 'What is wrong with computing the average power as Re[F_tilde] Re[v_tilde]?',
              answerOutline:
                'The product of real parts is not the real part of the product; the correct time average is (1/2) Re[F_tilde v_tilde*], which includes the phase between them.',
            },
            {
              question: 'What does multiplying a complex amplitude by i do to the signal?',
              answerOutline:
                'Advances its phase by 90 degrees (a quarter period), which is what differentiating does up to the factor omega.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/second-order-linear-odes-and-oscillators'],
        },
        {
          slug: 'damped-oscillations-and-quality-factor',
          title: 'Damped oscillations and the quality factor',
          summary:
            'The three damping regimes, energy decay, and Q as the single number that characterises an oscillator from a tuning fork to an atomic clock.',
          estimatedMinutes: 90,
          objectives: [
            'Solve the damped oscillator with the complex method and classify under-, over- and critically damped motion',
            'Compute the energy decay rate and relate the logarithmic decrement to $Q$',
            'Estimate $Q$ for physical systems and explain its consequences for ring-down time and frequency precision',
            'Measure $Q$ from a recorded decaying signal',
          ],
          concepts: [
            'Equation $\\ddot x + \\Gamma\\dot x + \\omega_0^2 x = 0$ ($\\Gamma = 2\\beta$)',
            'Complex frequency $\\omega = \\pm\\sqrt{\\omega_0^2 - \\Gamma^2/4} + i\\Gamma/2$',
            'Underdamped envelope $e^{-\\Gamma t/2}$',
            'Critical damping and overdamping',
            'Energy decays as $e^{-\\Gamma t}$',
            'Quality factor $Q = \\omega_0/\\Gamma$',
            'Logarithmic decrement',
            'Q of real systems: pendulum, tuning fork, quartz, laser cavity, atomic transition',
          ],
          explanation: `Add a damping force proportional to velocity: $\\ddot x + \\Gamma\\dot x + \\omega_0^2 x = 0$. Try $x = \\mathrm{Re}[\\tilde A e^{i\\omega t}]$ and you get a quadratic for $\\omega$: $-\\omega^2 + i\\Gamma\\omega + \\omega_0^2 = 0$, so $\\omega = i\\Gamma/2 \\pm \\sqrt{\\omega_0^2 - \\Gamma^2/4}$. The frequency is now **complex**; its imaginary part is the decay rate, its real part the oscillation frequency. This is a pattern you will see again: the poles of a response function in the complex frequency plane encode both the resonant frequency and the damping.

For $\\Gamma < 2\\omega_0$ (**underdamped**) the motion is $x = Ae^{-\\Gamma t/2}\\cos(\\omega_1 t + \\phi)$, with $\\omega_1 = \\sqrt{\\omega_0^2 - \\Gamma^2/4}$ slightly below $\\omega_0$. The energy, proportional to amplitude squared, decays as $e^{-\\Gamma t}$. For $\\Gamma > 2\\omega_0$ (**overdamped**) both roots are imaginary and the motion is a sum of two decaying exponentials; at $\\Gamma = 2\\omega_0$ (**critical**) the double root gives $(A + Bt)e^{-\\Gamma t/2}$, the fastest non-oscillatory return. Classical mechanics covered the regimes; the emphasis here is on $Q$.

The **quality factor** $Q = \\omega_0/\\Gamma$ is the number of radians of oscillation in one energy-decay time, or $2\\pi$ times the energy stored over the energy lost per cycle. Measured from a ring-down, $Q = \\pi/\\delta$ where the **logarithmic decrement** $\\delta = \\ln(x_n/x_{n+1})$ compares successive peaks. $Q$ is the number that matters: it sets how long an oscillator rings, how sharp its resonance is (next lesson), and how precisely its frequency is defined. A pendulum clock has $Q \\sim 10^2$-$10^4$, a tuning fork $10^3$, a quartz watch crystal $10^5$, a superconducting microwave cavity $10^{10}$, and the caesium hyperfine transition in an atomic clock $10^{10}$ or more; frequency stability scales with $Q$ because the linewidth is $\\omega_0/Q$.

Pitfalls: $\\Gamma$ here is $2\\beta$ in many mechanics texts, so check conventions before comparing formulas; and the energy decays at twice the amplitude rate. Work through Georgi section 2.1-2.2 and 8.03SC lecture 2, then do the measurement exercise with a real sound recording.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 2.1-2.2: Damped oscillators',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Lecture 2: Damped free oscillators',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'HyperPhysics — Damped harmonic oscillator',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/oscda.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
            {
              title: 'Fitzpatrick — Oscillations and Waves (online textbook), damped oscillation chapter',
              url: 'https://farside.ph.utexas.edu/teaching/315/Waveshtml/Waveshtml.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
            },
          ],
          exercises: [
            {
              slug: 'complex-frequency-solution',
              title: 'Solve the damped oscillator via complex frequency',
              prompt:
                'Derive the complex roots $\\omega$ for the damped oscillator and write the general real solution in each regime, including the critically damped case as a limit. Show that the energy $E = \\tfrac12 m\\dot x^2 + \\tfrac12 kx^2$ in the underdamped case, averaged over a cycle, decays as $e^{-\\Gamma t}$ and derive the relation $Q = 2\\pi E/\\Delta E_{\\text{cycle}}$ for $Q \\gg 1$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'q-from-recording',
              title: 'Measure Q from a real recording',
              prompt:
                'Record a struck wine glass, tuning fork or guitar string with your phone (or use any free sound sample). Load it in Python (scipy.io.wavfile), band-pass filter around the fundamental, compute the amplitude envelope with the Hilbert transform (scipy.signal.hilbert), fit $\\ln$(envelope) to a straight line to get $\\Gamma$, and estimate $Q$. Compare with the logarithmic-decrement method applied to successive peaks. Report your value and its uncertainty.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'q-estimates',
              title: 'Estimate Q for real systems',
              prompt:
                'Estimate $Q$ for (a) a playground swing that loses half its amplitude in 10 swings, (b) a tuning fork whose sound is audible for 20 s at 440 Hz with an initial energy 10^6 times the hearing threshold, (c) a LIGO mirror suspension with a 0.7 Hz pendulum mode that rings for a day. Explain in one sentence why a high-Q oscillator is both a blessing and a curse for a measuring instrument.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the imaginary part of the complex frequency represent?',
              answerOutline:
                'The exponential decay rate of the amplitude (Gamma/2); the real part is the oscillation frequency.',
            },
            {
              question: 'How is Q related to the logarithmic decrement?',
              answerOutline:
                'delta = ln(x_n / x_{n+1}) = Gamma T/2 = pi/Q for high Q, so Q = pi/delta.',
            },
            {
              question: 'Why does high Q imply precise frequency?',
              answerOutline:
                'The oscillation lasts about Q cycles, and a signal of N cycles has a frequency uncertainty of order f/N; equivalently the resonance linewidth is omega_0/Q.',
            },
          ],
        },
        {
          slug: 'driven-oscillations-resonance-and-transients',
          title: 'Driven oscillations, resonance and transients',
          summary:
            'The steady-state response to a sinusoidal drive, the resonance curve and its Lorentzian width, phase lag, and the transient that connects initial conditions to the steady state.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the complex response function of a driven damped oscillator and plot amplitude and phase against frequency',
            'Relate the resonance width, the ring-down time and $Q$ by one relation',
            'Explain the transient as the homogeneous solution needed to match initial conditions and simulate its build-up and beats',
            'Apply the response function to real resonators: driven pendulum, RLC circuit, atom in a light field',
          ],
          concepts: [
            'Response function $\\tilde A(\\omega) = (F_0/m)/(\\omega_0^2 - \\omega^2 + i\\Gamma\\omega)$',
            'Amplitude resonance and the Lorentzian line shape',
            'Phase lag 0 to $\\pi$; $\\pi/2$ at $\\omega_0$',
            'FWHM $= \\Gamma = \\omega_0/Q$',
            'Power absorbed $\\propto \\Gamma\\omega^2|\\tilde A|^2$',
            'Transient = homogeneous solution; beats during build-up',
            'Impulse response and the step response',
            'Resonances in nature: spectral lines, NMR, tidal resonances, Tacoma Narrows (not resonance!)',
          ],
          explanation: `Drive the oscillator with $F_0\\cos\\omega t$. Because the system is linear and time-translation invariant, the steady state oscillates at the drive frequency, and the complex method gives the **response function**
$$\\tilde A(\\omega) = \\frac{F_0/m}{\\omega_0^2 - \\omega^2 + i\\Gamma\\omega}.$$
Its modulus is the amplitude, its argument minus the phase lag. Three facts to internalise. The amplitude peaks near $\\omega_0$ at about $Q$ times the static response $F_0/k$. The phase lag sweeps from $0$ far below resonance through exactly $\\pi/2$ at $\\omega_0$ to $\\pi$ far above; at $\\pi/2$ the velocity is in phase with the force and power transfer is maximal. The absorbed power is a **Lorentzian** in $\\omega - \\omega_0$ with full width at half maximum $\\Gamma$, so
$$\\text{FWHM} = \\Gamma = \\frac{\\omega_0}{Q} = \\frac{1}{\\tau_{\\text{energy}}}.$$
Width in frequency and duration in time are reciprocal: a resonance you can see sharply is one that rings long. This is the classical version of the time-energy uncertainty relation, and it is why spectral lines from long-lived atomic states are narrow.

The steady state does not satisfy arbitrary initial conditions. Add the homogeneous solution, which decays at rate $\\Gamma/2$: this **transient** carries the memory of how the system was started. Drive an oscillator at resonance from rest and the amplitude builds as $1 - e^{-\\Gamma t/2}$, taking about $Q$ cycles to reach steady state. Drive it slightly off resonance and the transient at $\\omega_1$ beats against the steady state at $\\omega$. Both are easy to see by simulation and both matter in practice: a resonant detector responds slowly, and a signal shorter than $Q$ periods never reaches full amplitude.

A common misconception: the Tacoma Narrows bridge was destroyed by aeroelastic flutter (negative damping), not by resonance with the wind; the physics of this lesson does explain the Broughton bridge, opera singers breaking glasses, and the Millennium Bridge's lateral sway. Read Georgi 2.3-2.5 and 8.03SC lecture 3; use the PhET resonance simulation to watch the phase lag cross $\\pi/2$.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 2.3-2.5: Forced oscillation and resonance',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Lecture 3: Driven oscillators, transient phenomena, resonance',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 23-24: Resonance; Transients',
              url: 'https://www.feynmanlectures.caltech.edu/I_23.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'PhET — Resonance',
              url: 'https://phet.colorado.edu/en/simulations/resonance',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
          ],
          exercises: [
            {
              slug: 'response-function-plots',
              title: 'Plot and interpret the response function',
              prompt:
                'Derive $\\tilde A(\\omega)$ and plot $|\\tilde A|$ and the phase lag against $\\omega/\\omega_0$ for $Q = 1, 3, 10, 30$. Mark the FWHM of the absorbed-power curve and confirm it equals $\\omega_0/Q$ numerically. Show that the frequency of maximum amplitude is $\\omega_0\\sqrt{1 - 1/2Q^2}$ and that the velocity amplitude peaks exactly at $\\omega_0$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'transient-simulation',
              title: 'Simulate transients and beats',
              prompt:
                'Integrate the driven oscillator with $Q = 25$ from rest, driven (a) at $\\omega_0$, (b) at $1.05\\,\\omega_0$, (c) at $0.5\\,\\omega_0$. Plot $x(t)$ for 100 periods and overlay the analytic solution (steady state plus the transient fitted to initial conditions). Measure the beat period in (b) and the time to reach 90% of steady state in (a) and compare with $2\\pi/|\\omega - \\omega_1|$ and $2\\ln(10)/\\Gamma$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'rlc-resonance-measurement',
              title: 'RLC resonance in simulation or on a breadboard',
              prompt:
                'A series RLC circuit with $L = 10$ mH, $C = 100$ nF, $R = 50\\,\\Omega$ is driven by a 1 V sinusoid. Derive the current amplitude vs frequency, find $f_0$, $Q$ and the bandwidth. Plot the response, then either build the circuit (with a signal generator and oscilloscope, or the PhET AC circuit kit) or simulate it with solve_ivp and verify the bandwidth to 10%.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What single relation connects resonance width, Q and ring-down time?',
              answerOutline:
                'FWHM = Gamma = omega_0/Q = 1/(energy decay time); narrow resonances ring long.',
            },
            {
              question: 'Why does the phase lag pass through exactly 90 degrees at omega_0 regardless of damping?',
              answerOutline:
                'At omega = omega_0 the real part of the denominator (omega_0^2 - omega^2) vanishes, leaving a purely imaginary denominator i Gamma omega, hence a phase of -pi/2.',
            },
            {
              question: 'An oscillator with Q = 1000 is driven at resonance. Roughly how many cycles until it reaches steady state?',
              answerOutline:
                'About Q cycles (the build-up time is 2/Gamma = 2Q/omega_0, i.e. Q/pi periods to reach 1 - 1/e; a few times that to approach steady state).',
            },
          ],
          relatedLessons: ['classical-mechanics/oscillations-and-gravitation/driven-oscillators-and-resonance'],
        },
        {
          slug: 'lc-circuits-and-the-mechanical-electrical-analogy',
          title: 'LC circuits and the mechanical-electrical analogy',
          summary:
            'The same equations with different letters: RLC circuits as damped driven oscillators, impedance as the complex response, and why engineers think in these terms.',
          estimatedMinutes: 90,
          objectives: [
            'Map mass, damping, spring, force and displacement onto $L$, $R$, $1/C$, voltage and charge',
            'Define complex impedance and use it to analyse series and parallel RLC circuits as driven oscillators',
            'Explain filters (low-pass, high-pass, band-pass) as frequency-dependent response functions',
            'Compute energy flow in an LC circuit and identify the electrical analogue of kinetic and potential energy',
          ],
          concepts: [
            'Kirchhoff loop rule as the equation of motion',
            'Analogy table: $m \\leftrightarrow L$, $b \\leftrightarrow R$, $k \\leftrightarrow 1/C$, $x \\leftrightarrow q$',
            'Impedance $Z_R = R$, $Z_L = i\\omega L$, $Z_C = 1/i\\omega C$',
            'Series and parallel resonance',
            'Bandwidth and $Q = \\omega_0 L/R$',
            'Filters as response functions; Bode plot',
            'Energy in $L$ and $C$',
            'Mechanical impedance (preview for waves)',
          ],
          explanation: `Write Kirchhoff's loop rule for a series RLC circuit driven by $V_0\\cos\\omega t$: $L\\ddot q + R\\dot q + q/C = V_0\\cos\\omega t$. It is the driven damped oscillator letter for letter, with the dictionary $m \\to L$, $b \\to R$, $k \\to 1/C$, $F \\to V$, $x \\to q$, $v \\to I$. Everything from the previous three lessons transfers: $\\omega_0 = 1/\\sqrt{LC}$, $\\Gamma = R/L$, $Q = \\omega_0 L/R = \\frac1R\\sqrt{L/C}$, a Lorentzian resonance in the current with width $R/L$, and transients that ring at $\\omega_1$. The energy stored in the inductor, $\\tfrac12 LI^2$, plays kinetic energy; that in the capacitor, $q^2/2C$, plays potential energy.

Engineers exploit the analogy through **impedance**. With everything $\\propto e^{i\\omega t}$, each element relates its voltage and current amplitudes by a complex number: $Z_R = R$, $Z_L = i\\omega L$, $Z_C = 1/(i\\omega C)$. Impedances in series add; in parallel their reciprocals add; and the response of any linear circuit is a ratio of polynomials in $i\\omega$. A series RLC has $Z = R + i(\\omega L - 1/\\omega C)$, minimal (pure resistance) at resonance, which is why a radio tuned to $\\omega_0$ passes that station and rejects others. The ratio of output to input voltage across a chosen element is a **filter**: across $C$ a low-pass, across $L$ a high-pass, across $R$ a band-pass with bandwidth $\\omega_0/Q$. Plotting its magnitude in decibels against log frequency is a **Bode plot**, the engineer's resonance curve.

The analogy runs the other way too. Mechanical engineers define **mechanical impedance** $F/v$, and acousticians define acoustic impedance $p/U$; in the waves module, the impedance of a string, $\\sqrt{T\\mu}$, decides how much of a wave reflects at a junction, exactly as mismatched electrical impedances reflect signals on a cable. Learning to see all these as one response function is the point of this lesson.

Read Feynman II-22 (AC circuits) and the relevant 8.03SC problem set; the PhET AC circuit construction kit lets you build and measure the filters before you solve them.`,
          resources: [
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 22: AC Circuits',
              url: 'https://www.feynmanlectures.caltech.edu/II_22.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Impedance, filters, and the energy view; sections 22-1 to 22-5.',
              primary: true,
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 15: Alternating-Current Circuits',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/14-1-mutual-inductance',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Chapter 14 (inductance, LC oscillations) and chapter 15 (RLC, resonance, power).',
            },
            {
              title: 'PhET — Circuit Construction Kit: AC',
              url: 'https://phet.colorado.edu/en/simulations/circuit-construction-kit-ac',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
            {
              title: 'MIT 8.03SC — problem sets',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'analogy-table',
              title: 'Build the analogy table and check it dimensionally',
              prompt:
                'Construct a table mapping every mechanical quantity (mass, damping, stiffness, displacement, velocity, force, kinetic energy, potential energy, power, Q, omega_0) to its series-RLC counterpart, and a second column for a parallel RLC driven by a current source. Check each entry dimensionally. Then explain why a parallel RLC has maximum impedance at resonance while a series one has minimum.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'filter-bode-plots',
              title: 'Design and plot three filters',
              prompt:
                'For a series RLC with $L = 1$ mH, $C = 1\\,\\mu$F, $R = 10\\,\\Omega$, compute the transfer functions $V_C/V_{in}$, $V_L/V_{in}$ and $V_R/V_{in}$ using impedances. Plot Bode magnitude (dB) and phase plots for each from 100 Hz to 1 MHz. Identify the cutoff/centre frequencies and the roll-off slopes in dB per decade. Then choose $R$ to make the band-pass filter 1 kHz wide.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lc-energy-exchange',
              title: 'Energy exchange in an LC circuit',
              prompt:
                'Simulate an undriven LC circuit from $q(0) = q_0$, $I(0) = 0$ and plot the electric and magnetic energies against time, showing each oscillates at $2\\omega_0$ while the sum is constant. Add a resistor with $Q = 10$ and plot the total energy decay; verify it decays as $e^{-Rt/L}$. Explain why the frequency of energy oscillation is twice the current frequency.',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What plays the role of mass in an RLC circuit and why?',
              answerOutline:
                'Inductance L: it resists changes in current (L dI/dt = V) as mass resists changes in velocity, and stores energy (1/2) L I^2 analogous to kinetic energy.',
            },
            {
              question: 'What is the impedance of a series RLC at resonance, and what does that imply for current?',
              answerOutline:
                'Purely resistive, Z = R, the minimum magnitude; current amplitude is maximal, V_0/R.',
            },
            {
              question: 'What is the bandwidth of a band-pass RLC filter in terms of circuit elements?',
              answerOutline:
                'Delta omega = R/L = omega_0/Q.',
            },
          ],
        },
      ],
    },
    {
      slug: 'coupled-oscillators-and-normal-modes',
      title: 'Coupled Oscillators and Normal Modes',
      description:
        'Two oscillators that talk to each other, the discovery that the right coordinates decouple them, and the generalisation to N oscillators that becomes the wave equation in the limit.',
      lessons: [
        {
          slug: 'two-coupled-oscillators-and-beats',
          title: 'Two coupled oscillators and beats',
          summary:
            'Two pendulums joined by a spring: the symmetric and antisymmetric modes, energy sloshing back and forth, and beats as the signature of two nearby frequencies.',
          estimatedMinutes: 120,
          objectives: [
            'Write the coupled equations for two identical oscillators with a coupling spring and find the normal modes by symmetry',
            'Show that any motion is a superposition of modes and derive the beat phenomenon from it',
            'Interpret the beat period as the time for energy to transfer between oscillators',
            'Handle unequal oscillators and explain the avoided crossing of mode frequencies as a parameter is tuned',
          ],
          concepts: [
            'Coupled equations $m\\ddot x_1 = -kx_1 - \\kappa(x_1 - x_2)$ and partner',
            'Symmetric mode $\\omega_s^2 = k/m$, antisymmetric mode $\\omega_a^2 = (k + 2\\kappa)/m$',
            'Normal coordinates $x_1 \\pm x_2$',
            'Superposition of modes; general solution has four constants',
            'Beats: $\\cos\\omega_s t + \\cos\\omega_a t = 2\\cos(\\bar\\omega t)\\cos(\\Delta\\omega\\, t/2)$',
            'Energy transfer time $\\pi/\\Delta\\omega$',
            'Weak coupling and strong coupling',
            'Avoided crossing (level repulsion)',
          ],
          explanation: `Connect two identical pendulums (or masses on springs, frequency $\\omega_0^2 = k/m$) with a weak spring $\\kappa$. The equations of motion are coupled: $m\\ddot x_1 = -kx_1 - \\kappa(x_1 - x_2)$ and the mirror image. Neither mass oscillates at a single frequency in general, but two special motions do. If $x_1 = x_2$ the coupling spring never stretches and both swing at $\\omega_0$: the **symmetric mode**. If $x_1 = -x_2$ the coupling spring is stretched twice as much as either displacement and the frequency is $\\omega_a^2 = (k + 2\\kappa)/m$: the **antisymmetric mode**. In the **normal coordinates** $q_\\pm = x_1 \\pm x_2$ the equations decouple into two independent oscillators. The symmetry of the system handed you its modes; the next lesson shows how to find them when symmetry does not.

Every motion is a superposition of the two modes with four constants fixed by initial conditions. Pull pendulum 1 aside and release: that is equal parts of both modes, $x_1 = \\tfrac{A}{2}(\\cos\\omega_s t + \\cos\\omega_a t) = A\\cos(\\bar\\omega t)\\cos(\\tfrac{\\Delta\\omega}{2}t)$, a fast oscillation at the mean frequency inside a slow envelope. These are **beats**. Pendulum 1 gradually stops while pendulum 2 takes over, then the energy returns; the full transfer takes time $\\pi/\\Delta\\omega$, which for weak coupling is long. Beats are what you hear tuning a guitar, what makes two coupled LC circuits exchange energy (the basis of resonant wireless power transfer), and what makes a neutrino change flavour.

With **unequal** oscillators the modes are no longer purely symmetric or antisymmetric and the energy transfer is incomplete. Sweep one oscillator's frequency through the other's and plot the two mode frequencies: they never cross but repel, with a minimum gap of order $\\kappa$ (the **avoided crossing**). This is the generic behaviour of any two coupled modes, from molecular orbitals to the polariton. Read Georgi chapter 3 and 8.03SC lecture 4; the PhET normal modes simulation lets you set initial conditions and watch the beats.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 3: Normal Modes',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Lecture 4: Coupled oscillators, normal modes',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'PhET — Normal Modes',
              url: 'https://phet.colorado.edu/en/simulations/normal-modes',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
              note: 'Legacy simulation; set one mass moving and watch beats in the 1D case.',
            },
            {
              title: 'HyperPhysics — Beats',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/Sound/beat.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
          ],
          exercises: [
            {
              slug: 'two-pendulums-modes',
              title: 'Modes and beats of two coupled pendulums',
              prompt:
                'Two pendulums of length $L$ and mass $m$ are coupled by a spring $\\kappa$ attached at distance $d$ below the pivots. Derive the equations of motion for small angles, find both mode frequencies, and the general solution. For release of pendulum 1 from angle $\\theta_0$ with pendulum 2 at rest, find $\\theta_1(t)$ and $\\theta_2(t)$, the beat period, and the time for the energy to be fully transferred. Simulate and plot both angles for $\\kappa d^2/mgL = 0.05$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'avoided-crossing',
              title: 'Avoided crossing of two coupled modes',
              prompt:
                'Two oscillators with frequencies $\\omega_1$ and $\\omega_2$ are coupled by $\\kappa$. Write the 2x2 eigenvalue problem, solve it, and plot both mode frequencies against $\\omega_2$ as it is swept from $0.5\\omega_1$ to $1.5\\omega_1$ for two values of $\\kappa$. Show the minimum splitting is proportional to $\\kappa$ and that far from the crossing each mode is localised on one oscillator (plot the mode-shape components). Explain what fraction of energy is transferred when the frequencies are detuned.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'beats-with-sound',
              title: 'Hear and measure beats',
              prompt:
                'Generate two sine tones at 440 Hz and 444 Hz in Python, sum them, and write a WAV file. Listen; then compute the envelope with the Hilbert transform and confirm the beat frequency is 4 Hz. Repeat with 440 and 480 Hz and explain why you hear a rough tone rather than beats (the beat period is shorter than the ear\'s integration time). Finally use the FFT to show both components are present in the spectrum: beats are not a new frequency.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a normal mode?',
              answerOutline:
                'A motion in which every part of the system oscillates at the same frequency with fixed relative amplitudes and phases; the general motion is a superposition of modes.',
            },
            {
              question: 'Why does energy transfer completely between two identical coupled pendulums but not between unequal ones?',
              answerOutline:
                'For identical pendulums the modes have equal amplitude on both, so their superposition can cancel fully on one side; for unequal ones the modes are localised and the exchange is partial.',
            },
            {
              question: 'What is the beat frequency and how does it relate to the two mode frequencies?',
              answerOutline:
                'The envelope repeats at the difference frequency omega_a - omega_s (the amplitude envelope cos(Delta omega t/2) has two maxima per period).',
            },
          ],
        },
        {
          slug: 'normal-modes-as-an-eigenvalue-problem',
          title: 'Normal modes as an eigenvalue problem',
          summary:
            'The general method: write the equations as a matrix, look for solutions where everything oscillates at one frequency, and solve the eigenvalue problem by hand and with NumPy.',
          estimatedMinutes: 120,
          objectives: [
            'Write a coupled linear system as $\\mathsf{M}\\ddot{\\mathbf{x}} = -\\mathsf{K}\\mathbf{x}$ and reduce it to the eigenvalue problem $\\mathsf{M}^{-1}\\mathsf{K}\\mathbf{a} = \\omega^2\\mathbf{a}$',
            'Prove that the modes of a symmetric $\\mathsf{K}$ with symmetric positive-definite $\\mathsf{M}$ are orthogonal in the $\\mathsf{M}$ inner product and the frequencies real',
            'Decompose arbitrary initial conditions into modes using orthogonality and reconstruct the motion',
            'Use symmetry to predict mode shapes before computing them, and solve a three-mass system both ways',
          ],
          concepts: [
            'Matrix form $\\mathsf{M}\\ddot{\\mathbf{x}} + \\mathsf{K}\\mathbf{x} = 0$',
            'Ansatz $\\mathbf{x} = \\mathbf{a}e^{i\\omega t}$',
            'Generalised eigenvalue problem $\\mathsf{K}\\mathbf{a} = \\omega^2\\mathsf{M}\\mathbf{a}$',
            'Secular determinant $\\det(\\mathsf{K} - \\omega^2\\mathsf{M}) = 0$',
            'Orthogonality $\\mathbf{a}_i^T\\mathsf{M}\\mathbf{a}_j = 0$',
            'Mode expansion of initial conditions',
            'Zero modes (translations) and their meaning',
            'Symmetry and degeneracy',
          ],
          explanation: `Any system of coupled linear oscillators can be written as $\\mathsf{M}\\ddot{\\mathbf{x}} = -\\mathsf{K}\\mathbf{x}$, where $\\mathbf{x}$ collects the displacements, $\\mathsf{M}$ is the (often diagonal) mass matrix and $\\mathsf{K}$ the stiffness matrix. Look for a **normal mode**, a solution in which every coordinate oscillates at the same frequency: $\\mathbf{x} = \\mathbf{a}e^{i\\omega t}$. Substituting gives the **generalised eigenvalue problem** $\\mathsf{K}\\mathbf{a} = \\omega^2\\mathsf{M}\\mathbf{a}$. Nontrivial solutions exist only when the **secular determinant** $\\det(\\mathsf{K} - \\omega^2\\mathsf{M})$ vanishes, a polynomial of degree $n$ in $\\omega^2$ whose roots are the squared mode frequencies; each root's null vector is the mode shape.

For a physical system $\\mathsf{K}$ is symmetric (it comes from a potential energy $\\tfrac12\\mathbf{x}^T\\mathsf{K}\\mathbf{x}$) and $\\mathsf{M}$ is symmetric positive-definite. Then all $\\omega^2$ are real, positive if the equilibrium is stable, and the modes are **orthogonal** in the inner product weighted by $\\mathsf{M}$: $\\mathbf{a}_i^T\\mathsf{M}\\mathbf{a}_j = 0$ for $i \\ne j$. Orthogonality is the practical tool. Given initial displacements and velocities, project them onto the modes with the $\\mathsf{M}$-inner product to get each mode's amplitude and phase, and the full motion is the sum. This is the same mathematics as expanding a vector in an orthonormal basis, and in the next modules it becomes the Fourier series.

Two things to look for. A **zero mode** ($\\omega = 0$) means the system can move without restoring force, e.g. a free molecule translating; it is not an oscillation but the eigenvalue problem still finds it. **Degeneracy** (equal frequencies) signals a symmetry, and any combination of degenerate modes is also a mode, so the eigenvectors are not unique.

Symmetry can give you the modes before you compute: for three equal masses on a line with equal springs, the mode shapes are symmetric or antisymmetric under reflection, which reduces the problem to 2x2 and 1x1 blocks. Numerically, \`scipy.linalg.eigh(K, M)\` returns the frequencies and $\\mathsf{M}$-orthonormal modes directly. The eigenvalue theory itself is canonical in math-methods; here you apply it. Read Georgi 3.3-3.5 and 8.03SC lecture 5.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 3.3-3.5 and Ch. 4: Symmetries',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Lecture 5: Beats, damped driven coupled oscillators, matrix method',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Cline — Variational Principles in Classical Mechanics, Ch. 14: Coupled linear oscillators',
              url: 'https://phys.libretexts.org/Bookshelves/Classical_Mechanics/Variational_Principles_in_Classical_Mechanics_(Cline)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts Physics',
            },
          ],
          exercises: [
            {
              slug: 'three-mass-chain',
              title: 'Three masses, four springs',
              prompt:
                'Three equal masses $m$ on a line between fixed walls are connected by four equal springs $k$. Write $\\mathsf{M}$ and $\\mathsf{K}$, solve the secular equation by hand (use reflection symmetry to block-diagonalise), and find the three frequencies $\\omega^2 = (2 - \\sqrt2, 2, 2 + \\sqrt2)\\,k/m$ and mode shapes. Verify with scipy.linalg.eigh. Then release the middle mass displaced with the others at rest; decompose into modes and plot all three displacements for 20 periods.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'orthogonality-proof',
              title: 'Prove orthogonality and reality of modes',
              prompt:
                'For symmetric $\\mathsf{K}$ and symmetric positive-definite $\\mathsf{M}$, prove that the eigenvalues of $\\mathsf{K}\\mathbf{a} = \\lambda\\mathsf{M}\\mathbf{a}$ are real and that eigenvectors with distinct eigenvalues satisfy $\\mathbf{a}_i^T\\mathsf{M}\\mathbf{a}_j = 0$. Show that in normal coordinates (components along the modes) the kinetic and potential energies are both diagonal, so the total energy is a sum of independent mode energies.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'co2-and-water-modes',
              title: 'Vibrational modes of CO2 and H2O',
              prompt:
                'Model CO$_2$ as three collinear masses with two bonds (bending ignored) and H$_2$O as a bent molecule with two O-H bonds and an angle of 104.5 degrees, using harmonic bond stretches only. Build $\\mathsf{M}$ and $\\mathsf{K}$ numerically in 2D Cartesian coordinates, find all modes with eigh, identify the zero modes (translations and rotation) and the vibrational ones, and plot the mode shapes as arrows on the atoms. Compare the ratio of symmetric to antisymmetric stretch frequencies with the observed values (H2O: 3657 and 3756 cm^-1).',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the secular equation det(K - omega^2 M) = 0 express physically?',
              answerOutline:
                'That a non-trivial pattern of displacements can oscillate at frequency omega with all restoring forces proportional to the displacements; its roots are the only frequencies at which single-frequency motion exists.',
            },
            {
              question: 'Why are the normal modes orthogonal, and in what inner product?',
              answerOutline:
                'Because K and M are symmetric; the orthogonality is a_i^T M a_j = 0, weighted by the mass matrix, which reduces to ordinary orthogonality for equal masses.',
            },
            {
              question: 'What does a zero-frequency mode signify?',
              answerOutline:
                'A direction in configuration space with no restoring force, such as rigid translation or rotation of a free system; the motion in that mode is uniform, not oscillatory.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/eigenvalues-and-eigenvectors'],
        },
        {
          slug: 'n-coupled-oscillators-and-the-continuum-limit',
          title: 'N coupled oscillators and the continuum limit',
          summary:
            'The beaded string: N masses give N modes that are sampled sinusoids, with a dispersion relation that becomes the wave equation when N goes to infinity.',
          estimatedMinutes: 120,
          objectives: [
            'Solve the N-mass beaded string exactly using the translation-invariance ansatz $a_j = \\sin(jka)$',
            'Derive the dispersion relation $\\omega(k) = 2\\omega_0|\\sin(ka/2)|$ and identify the cutoff frequency',
            'Take the continuum limit to obtain the wave equation $\\partial_t^2 y = v^2\\partial_x^2 y$ with $v = \\sqrt{T/\\mu}$',
            'Explain the Brillouin zone and why modes with $k$ beyond $\\pi/a$ are not new',
          ],
          concepts: [
            'Beaded string: equation $m\\ddot y_j = (T/a)(y_{j+1} - 2y_j + y_{j-1})$',
            'Translation invariance and the ansatz $y_j \\propto e^{ijka}$',
            'Dispersion relation $\\omega(k) = 2\\sqrt{T/ma}\\,|\\sin(ka/2)|$',
            'Boundary conditions quantise $k$: $k_n = n\\pi/(N+1)a$',
            'Mode shapes are sampled sinusoids',
            'Brillouin zone $|k| \\le \\pi/a$; aliasing',
            'Continuum limit: $a \\to 0$, $m/a \\to \\mu$',
            'Wave equation and $v = \\sqrt{T/\\mu}$',
          ],
          explanation: `Put $N$ beads of mass $m$ at spacing $a$ on a massless string under tension $T$, fixed at both ends. The transverse equation of motion for bead $j$ is $m\\ddot y_j = \\frac{T}{a}(y_{j+1} - 2y_j + y_{j-1})$: each bead is pulled toward the average of its neighbours. The $N\\times N$ stiffness matrix is tridiagonal, but you do not need to diagonalise it by brute force. Away from the ends the system is **translation invariant** (shift by one bead and it looks the same), so Georgi's symmetry argument applies in *space* as it did in time: the modes can be chosen as eigenfunctions of the shift, $y_j \\propto e^{ijka}$. Substituting gives the **dispersion relation**
$$\\omega(k) = 2\\sqrt{\\frac{T}{ma}}\\left|\\sin\\frac{ka}{2}\\right|.$$
The fixed ends select standing waves $y_j = A\\sin(jka)$ with $k_n = \\frac{n\\pi}{(N+1)a}$, $n = 1, \\ldots, N$: exactly $N$ modes, each a sinusoid sampled at the bead positions. The $n$-th mode has $n - 1$ nodes between the ends. Check it against the two- and three-mass results of the previous lessons: they are the cases $N = 2, 3$.

Two features have no counterpart in continuous strings. There is a **cutoff frequency** $\\omega_{\\max} = 2\\sqrt{T/ma}$ at $ka = \\pi$, above which no travelling wave propagates (the beads then move in alternation and the disturbance decays exponentially). And $k$ values differing by $2\\pi/a$ give identical bead displacements, so only the **first Brillouin zone** $|k| \\le \\pi/a$ is physical; higher $k$ is **aliasing**, the same phenomenon that limits digital sampling. These are the physics of phonons in a crystal and of lattice simulations.

Now let $a \\to 0$ and $N \\to \\infty$ with the mass per length $\\mu = m/a$ and total length fixed. The difference $(y_{j+1} - 2y_j + y_{j-1})/a^2 \\to \\partial_x^2 y$, and the equation becomes the **wave equation** $\\partial_t^2 y = v^2\\partial_x^2 y$ with $v = \\sqrt{T/\\mu}$. The dispersion relation becomes linear, $\\omega = vk$, for $ka \\ll 1$. Everything in the next module is this limit. Read Georgi chapter 5 and 8.03SC lectures 6-7; build the matrix numerically and watch the mode shapes converge to sines as $N$ grows.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 5: Waves (the beaded string and the continuum limit)',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Lectures 6-7: Driven oscillators and resonance; symmetry, infinite number of coupled oscillators',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'PhET — Normal Modes (1D chain)',
              url: 'https://phet.colorado.edu/en/simulations/normal-modes',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
              note: 'Increase the number of masses and excite single modes.',
            },
          ],
          exercises: [
            {
              slug: 'beaded-string-dispersion',
              title: 'Derive and verify the beaded-string dispersion relation',
              prompt:
                'Derive $\\omega(k)$ for the infinite beaded string and the quantisation $k_n$ for fixed ends. Then build the $N \\times N$ stiffness matrix numerically for $N = 5, 20, 100$, compute the frequencies with numpy.linalg.eigh, and plot them against $n$ with the analytic formula. Plot the mode shapes for $n = 1, 2, 3$ and $n = N$ for $N = 20$, and show that the highest mode is the alternating pattern.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'continuum-limit-derivation',
              title: 'Take the continuum limit',
              prompt:
                'Starting from the beaded-string equation, define $\\mu = m/a$ and $y(x = ja, t) = y_j(t)$, expand $y_{j\\pm1}$ in Taylor series to second order, and derive the wave equation with $v = \\sqrt{T/\\mu}$. Show the dispersion relation reduces to $\\omega = vk$ to leading order and find the first correction term in $(ka)^2$. For a guitar string modelled as 1000 beads, estimate at which harmonic the discreteness correction reaches 1%.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'above-cutoff-evanescence',
              title: 'Drive the chain above cutoff',
              prompt:
                'Simulate a chain of 60 beads with the first bead driven sinusoidally at frequencies $0.5\\,\\omega_{\\max}$, $0.95\\,\\omega_{\\max}$ and $1.3\\,\\omega_{\\max}$ (with light damping to reach steady state). Plot the steady-state amplitude vs bead index. Below cutoff you should see a propagating wave; above cutoff an exponentially decaying profile. Measure the decay length above cutoff and compare with the prediction from the dispersion relation continued to complex $k$.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a chain of N beads have exactly N normal modes?',
              answerOutline:
                'The system has N degrees of freedom, so the eigenvalue problem is N x N; equivalently the allowed k values n pi/((N+1)a) for n = 1..N give distinct bead patterns and n > N repeats them.',
            },
            {
              question: 'What is the cutoff frequency of a beaded string and what happens above it?',
              answerOutline:
                'omega_max = 2 sqrt(T/(m a)) at ka = pi; above it k becomes complex and a driven disturbance decays exponentially instead of propagating.',
            },
            {
              question: 'What two limits are taken to get the wave equation, and what is held fixed?',
              answerOutline:
                'Spacing a to zero and N to infinity with total length and mass per unit length mu = m/a fixed, so the tension and mu define v = sqrt(T/mu).',
            },
          ],
        },
        {
          slug: 'driven-coupled-systems-and-symmetry',
          title: 'Driven coupled systems, damping and symmetry',
          summary:
            'Modes as independent driven oscillators, resonances of a coupled system, and how symmetry (reflection, translation, rotation) organises the modes of anything from a molecule to a drumhead.',
          estimatedMinutes: 90,
          objectives: [
            'Solve a driven, damped coupled system by expanding the drive in modes and treating each mode as an independent driven oscillator',
            'Predict which modes a given drive excites from symmetry (selection rules in classical form)',
            'Use the symmetry group of a system to classify its modes and predict degeneracies',
            'Explain mode localisation and why a small defect in a chain traps a mode',
          ],
          concepts: [
            'Projecting the drive onto modes',
            'Each mode: independent driven damped oscillator',
            'Resonance at each mode frequency',
            'Selection rules: a symmetric drive cannot excite an antisymmetric mode',
            'Symmetry operations commuting with the dynamics',
            'Degenerate modes from rotational symmetry (square membrane, triangle molecule)',
            'Defect modes and localisation',
            'Preview: Chladni figures and musical instruments',
          ],
          explanation: `Drive a coupled system with forces $\\mathbf{F}(t) = \\mathbf{f}\\cos\\omega t$ and add damping proportional to velocity (for simplicity, the same $\\Gamma$ for all modes). Expand both the motion and the force in the normal modes: $\\mathbf{x} = \\sum_n q_n(t)\\mathbf{a}_n$ and $f_n = \\mathbf{a}_n^T\\mathbf{f}$ (using $\\mathsf{M}$-orthonormal modes). The equations decouple into one driven damped oscillator per mode: $\\ddot q_n + \\Gamma\\dot q_n + \\omega_n^2 q_n = f_n\\cos\\omega t$. The whole machinery of module 1 applies to each mode separately: the system has a resonance at every $\\omega_n$, with width $\\Gamma$ and strength proportional to $f_n^2$, and the total response is the sum of $N$ Lorentzians. Sweep the drive frequency across a structure and you map its mode spectrum; this is modal analysis, used on everything from bridges to violins to spacecraft.

The projection $f_n = \\mathbf{a}_n^T\\mathbf{f}$ is a classical **selection rule**. If the drive is symmetric under a reflection that leaves the system invariant, and mode $n$ is antisymmetric, then $f_n = 0$ and that mode is never excited no matter how exactly you hit its frequency. Push two coupled pendulums with equal forces and the antisymmetric mode stays silent. The same logic explains why a uniform electric field drives only certain vibrations of a molecule (the infrared-active ones) and why an atom's dipole transitions obey parity rules.

Symmetry organises modes more generally. The operations that leave the system invariant (reflections, rotations, translations) commute with the equations of motion, so modes can be chosen to transform simply under them. A square membrane has a $90°$ rotation symmetry, which forces pairs of modes to be **degenerate**; any linear combination of a degenerate pair is also a mode, which is why the nodal patterns (Chladni figures) of a square plate vary with where you drive it. An equilateral triangle of masses has a degenerate pair for the same reason.

Finally, break the symmetry slightly: make one bead in a long chain lighter. A mode appears above the cutoff frequency, exponentially **localised** on the defect. Impurity modes in crystals, and much of Anderson localisation, start here. Read Georgi chapter 4 (symmetries) and sections 3.4 (forced oscillation of coupled systems); the exercises use the matrices you already built.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 3.4 and Ch. 4: Forced coupled oscillators; Symmetries',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Lecture 7: Symmetry, infinite number of coupled oscillators',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 49: Modes',
              url: 'https://www.feynmanlectures.caltech.edu/I_49.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Modes of strings, membranes and coupled pendulums with Feynman\'s physical pictures.',
            },
          ],
          exercises: [
            {
              slug: 'modal-response-sweep',
              title: 'Modal analysis of a chain',
              prompt:
                'For a 10-bead chain with damping $\\Gamma = 0.02\\,\\omega_1$, drive bead 3 sinusoidally and compute the steady-state amplitude of bead 7 as a function of drive frequency across all 10 modes, using the mode expansion (not time integration). Plot it on a log scale and identify each peak. Then drive beads 3 and 8 in phase, and again with opposite phase, and explain from the mode shapes which peaks disappear in each case.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'square-membrane-degeneracy',
              title: 'Degenerate modes of a square grid',
              prompt:
                'Build the stiffness matrix for a 6x6 grid of masses on a square lattice with nearest-neighbour springs and fixed boundary. Compute the modes, list the frequencies, and identify degenerate pairs. Show that the pairs are related by the 90-degree rotation, and plot the nodal patterns of several linear combinations of one degenerate pair to reproduce the variety of Chladni figures. Then break the symmetry by stretching the grid 10% in one direction and show the degeneracies split.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'defect-mode',
              title: 'A localised defect mode',
              prompt:
                'In a chain of 51 equal beads, make the central bead half the mass. Compute the modes and show one frequency now lies above the cutoff of the uniform chain. Plot its mode shape and fit the exponential decay away from the defect. Vary the defect mass ratio from 0.9 to 0.2 and plot the defect-mode frequency and localisation length against it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a driven coupled system show a resonance at every normal-mode frequency?',
              answerOutline:
                'In normal coordinates the system is N independent driven oscillators, each resonating at its own omega_n; the physical response is their superposition.',
            },
            {
              question: 'State a classical selection rule and explain its origin.',
              answerOutline:
                'A drive symmetric under a symmetry of the system cannot excite a mode that is antisymmetric under it, because the projection of the force onto that mode vanishes.',
            },
            {
              question: 'What causes degenerate modes, and why are their mode shapes not unique?',
              answerOutline:
                'A symmetry (e.g. rotation) maps one mode to another at the same frequency; any linear combination of degenerate modes is also a mode, so the eigenvectors form a subspace.',
            },
          ],
        },
      ],
      project: {
        slug: 'normal-mode-explorer',
        title: 'Module project: a normal-mode explorer',
        description: `Write a Python tool that takes a description of masses and springs (a graph with positions, masses and spring constants), builds the mass and stiffness matrices, solves for normal modes, animates any mode or superposition, and computes the steady-state response to a given sinusoidal drive. Use it to study the beaded string, 2D lattices, a model molecule and a defect chain.`,
        deliverables: [
          'A class that builds M and K from a mass-spring graph in 1D or 2D and returns frequencies and M-orthonormal modes',
          'An animation function for individual modes and for arbitrary initial conditions decomposed into modes',
          'A driven-response function returning the amplitude at every mass for a drive at frequency omega',
          'A notebook reproducing the beaded-string dispersion relation, a degenerate pair on a square lattice, and a defect mode',
        ],
        estimatedHours: 8,
        stretchGoals: [
          'Add nonlinear springs and show the breakdown of superposition (FPUT recurrence)',
          'Import a real molecule geometry and compare computed stretch-mode ratios with spectroscopic data',
        ],
      },
    },
    {
      slug: 'waves-on-strings-and-in-media',
      title: 'Waves on Strings and in Media',
      description:
        'The one-dimensional wave equation and everything it contains: travelling and standing waves, energy and impedance, reflection and transmission, sound, and the dispersion that makes real media interesting.',
      lessons: [
        {
          slug: 'the-wave-equation-and-dalemberts-solution',
          title: 'The wave equation and d\'Alembert\'s solution',
          summary:
            'Deriving the wave equation from Newton\'s law on a string, its general solution as left- and right-moving shapes, and the initial-value problem.',
          estimatedMinutes: 120,
          objectives: [
            'Derive $\\partial_t^2 y = v^2\\partial_x^2 y$ for a string from the net transverse force on an element',
            'Prove that $y = f(x - vt) + g(x + vt)$ is the general solution and interpret each term',
            'Solve the initial-value problem on an infinite string (d\'Alembert\'s formula) and sketch the evolution of a plucked shape',
            'Integrate the wave equation numerically with a finite-difference scheme and respect the CFL condition',
          ],
          concepts: [
            'Wave equation $\\partial_t^2 y = v^2\\partial_x^2 y$, $v = \\sqrt{T/\\mu}$',
            'Small-slope approximation',
            'Travelling waves $f(x - vt)$, $g(x + vt)$',
            'd\'Alembert\'s formula $y = \\tfrac12[y_0(x - vt) + y_0(x + vt)] + \\tfrac{1}{2v}\\int_{x-vt}^{x+vt}v_0\\,ds$',
            'Sinusoidal waves: $k$, $\\omega$, $\\lambda$, $T$, $v = \\omega/k = \\lambda f$',
            'Superposition and linearity',
            'Finite differences, leapfrog in time, CFL condition $v\\Delta t \\le \\Delta x$',
            'Characteristics',
          ],
          explanation: `Consider a string of mass per length $\\mu$ under tension $T$, displaced transversely by $y(x, t)$ with small slope. The net transverse force on the element between $x$ and $x + dx$ is $T[\\partial_x y(x + dx) - \\partial_x y(x)] = T\\partial_x^2 y\\,dx$ (the tension is the same at both ends but points along slightly different directions). Newton's law for the element gives the **wave equation**
$$\\frac{\\partial^2 y}{\\partial t^2} = v^2\\frac{\\partial^2 y}{\\partial x^2}, \\qquad v = \\sqrt{T/\\mu}.$$
This is the same equation you obtained as the continuum limit of the beaded string, now derived directly. It is linear, so solutions superpose, and it is second order in both $x$ and $t$.

Its **general solution** is remarkable: $y = f(x - vt) + g(x + vt)$ for *any* twice-differentiable $f$ and $g$. Check by substitution. $f(x - vt)$ is a shape that moves rigidly to the right at speed $v$ without changing form; $g$ moves left. Nothing about the solution needs sinusoids. Given the initial displacement $y_0(x)$ and velocity $v_0(x)$ on an infinite string, **d'Alembert's formula** $y(x, t) = \\tfrac12[y_0(x - vt) + y_0(x + vt)] + \\frac{1}{2v}\\int_{x - vt}^{x + vt}v_0(s)\\,ds$ gives the answer: a plucked (displaced, at rest) string splits into two half-height copies travelling in opposite directions. Sketch this for a triangle; it is the single most useful picture in the subject.

Sinusoidal solutions $y = A\\cos(kx - \\omega t)$ are the special case $f(u) = A\\cos ku$, and they matter because any shape is a superposition of them (module 4). For them $\\omega = vk$, i.e. $v = \\lambda f$; learn the vocabulary of wavenumber $k = 2\\pi/\\lambda$ and angular frequency $\\omega = 2\\pi f$ now.

Numerically, replace both second derivatives with centred differences: $y_j^{n+1} = 2y_j^n - y_j^{n-1} + (v\\Delta t/\\Delta x)^2(y_{j+1}^n - 2y_j^n + y_{j-1}^n)$. It is stable only if $v\\Delta t \\le \\Delta x$ (the **CFL condition**: information must not travel more than one cell per step), and with $v\\Delta t = \\Delta x$ exactly it is in fact exact for this equation. You will use this scheme for the rest of the subject and extend it to 2D in the capstone. Read Georgi chapter 6 (or 8.03SC lecture 8) and the OpenStax chapter for the vocabulary and simple problems.`,
          resources: [
            {
              title: 'MIT 8.03SC — Lecture 8: Traveling waves without damping',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Georgi — The Physics of Waves, Ch. 6-8: Continuum limit, longitudinal oscillations, traveling waves',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
            },
            {
              title: 'OpenStax University Physics Vol. 1 — Ch. 16: Waves',
              url: 'https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Sections 16.1-16.3 for the vocabulary and the derivation of the wave speed on a string.',
            },
            {
              title: 'PhET — Wave on a String',
              url: 'https://phet.colorado.edu/en/simulations/wave-on-a-string',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
              note: 'Send a pulse, change tension and damping, and watch reflections from fixed and free ends.',
            },
          ],
          exercises: [
            {
              slug: 'wave-equation-derivation',
              title: 'Derive the wave equation and verify d\'Alembert',
              prompt:
                'Derive the wave equation for a string including the small-slope approximation explicitly, and state where it fails. Verify by direct substitution that $f(x - vt) + g(x + vt)$ solves it. Then derive d\'Alembert\'s formula from the initial conditions $y(x, 0) = y_0$, $\\partial_t y(x, 0) = v_0$. Apply it to a string given an initial velocity $v_0$ on a short segment with zero displacement (a hammer strike) and sketch $y(x, t)$ at several times.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fd-wave-solver',
              title: 'Write a finite-difference wave solver',
              prompt:
                'Implement the leapfrog finite-difference scheme for the 1D wave equation on an infinite (large) domain. Start from a Gaussian displacement at rest and show it splits into two half-height Gaussians moving at $\\pm v$. Compare with d\'Alembert\'s exact solution at several times and plot the error. Then set the Courant number $v\\Delta t/\\Delta x$ to 0.5, 1.0 and 1.05 and show the scheme is accurate, exact, and unstable respectively.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'wave-vocabulary',
              title: 'Wave parameters in practice',
              prompt:
                'A steel guitar string (E2, 82.4 Hz) has length 0.65 m and mass per length 6.8 g/m. Find the wave speed, tension, and the wavelength of the fundamental. The string is plucked at 1/5 of its length with amplitude 3 mm: using d\'Alembert\'s picture on the finite string (image method, next lesson) sketch the shape at $t = 0, T/8, T/4, T/2$. What is the maximum transverse velocity of the string and how does it compare with $v$?',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What approximation makes the string equation linear, and when does it fail?',
              answerOutline:
                'Small slope, so sin(theta) ~ tan(theta) ~ dy/dx and the tension is uniform; it fails for large amplitudes where the tension changes with stretching and the equation becomes nonlinear.',
            },
            {
              question: 'Describe what happens to a plucked (displaced, at rest) shape on an infinite string.',
              answerOutline:
                'It splits into two copies of half the amplitude travelling in opposite directions at speed v, by d\'Alembert\'s formula with v_0 = 0.',
            },
            {
              question: 'What is the CFL condition and why is it needed?',
              answerOutline:
                'v dt <= dx: the numerical domain of dependence must contain the physical one; otherwise the scheme cannot propagate information fast enough and errors grow exponentially.',
            },
          ],
          relatedLessons: ['math-methods/partial-differential-equations-and-special-functions/separation-of-variables'],
        },
        {
          slug: 'standing-waves-boundary-conditions-and-harmonics',
          title: 'Standing waves, boundary conditions and harmonics',
          summary:
            'What boundaries do to waves: reflection from fixed and free ends, standing waves as superpositions of travelling waves, and the harmonic series of strings and pipes.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the reflection of a pulse from a fixed end (inverted) and a free end (upright) using the image method',
            'Show that a standing wave is the sum of two counter-propagating travelling waves and identify nodes and antinodes',
            'Solve the wave equation on a finite string by separation of variables and obtain the harmonic series $f_n = nv/2L$',
            'Apply the same analysis to open and closed pipes and explain why a closed pipe has only odd harmonics',
          ],
          concepts: [
            'Boundary conditions: fixed ($y = 0$), free ($\\partial_x y = 0$)',
            'Image method for reflections',
            'Standing wave $2A\\sin kx\\cos\\omega t$; nodes and antinodes',
            'Separation of variables; eigenfunctions $\\sin(n\\pi x/L)$',
            'Harmonic series and overtones',
            'Open-open vs open-closed pipes',
            'End correction',
            'Timbre as the harmonic recipe',
          ],
          explanation: `A boundary turns a travelling wave into a reflected one. At a **fixed end** $y(0, t) = 0$ always, which the general solution satisfies only if $g(vt) = -f(-vt)$: the reflected pulse is the **inverted** mirror image of the incident one. The slick way to see this is the **image method**: extend the string to $x < 0$ with an inverted, reflected copy of the pulse travelling toward the end; the two pass through each other and their sum is always zero at $x = 0$. At a **free end** (a ring sliding on a frictionless pole, so $\\partial_x y = 0$) the image is upright, and the reflected pulse comes back the same way up with momentary doubling of the amplitude at the end.

Send a sinusoid against a fixed end and the incident and reflected waves superpose to $A\\cos(kx - \\omega t) - A\\cos(kx + \\omega t) = 2A\\sin kx\\sin\\omega t$: a **standing wave**, with **nodes** at $kx = n\\pi$ that never move and **antinodes** between them. Every point oscillates in phase (or exactly out of phase); the wave does not travel. A standing wave is therefore nothing new, just two travelling waves.

With *two* fixed ends at $x = 0$ and $x = L$, only wavelengths with nodes at both ends fit: $L = n\\lambda/2$, so $f_n = nv/2L$. These are the **normal modes** of the string, the $N \\to \\infty$ limit of the beaded-string modes, and they form the **harmonic series**: a fundamental and integer multiples. Formally, separation of variables $y = X(x)T(t)$ turns the PDE into two ODEs with the eigenvalue problem $X'' = -k^2 X$, $X(0) = X(L) = 0$, whose eigenfunctions are $\\sin(n\\pi x/L)$. Any motion of the string is a superposition of these with amplitudes fixed by the initial shape, which is a Fourier series: module 4.

Air columns obey the same equation (in pressure or displacement). An open end is a pressure node, a closed end a pressure antinode. An **open-open** pipe (flute) has $f_n = nv/2L$, all harmonics; an **open-closed** pipe (clarinet, a bottle) has $f_n = (2n - 1)v/4L$, odd harmonics only, with a fundamental an octave lower for the same length. The missing even harmonics are why a clarinet sounds hollow. Real pipes need a small **end correction** because the pressure node sits slightly outside the opening.

Work through 8.03SC lecture 9 and OpenStax 16.6-17.5; the PhET string simulation shows the reflections.`,
          resources: [
            {
              title: 'MIT 8.03SC — Lecture 9: Wave equation, standing waves, Fourier series',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'OpenStax University Physics Vol. 1 — 16.6 Standing Waves and Resonance; 17.5 Sources of Musical Sound',
              url: 'https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'HyperPhysics — Standing waves',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/Waves/standw.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
              note: 'Links to pages on strings, open and closed pipes, and end corrections.',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 49: Modes',
              url: 'https://www.feynmanlectures.caltech.edu/I_49.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
          ],
          exercises: [
            {
              slug: 'image-method-reflections',
              title: 'Reflections by the image method',
              prompt:
                'Using your finite-difference solver, send a Gaussian pulse toward (a) a fixed end and (b) a free end, and plot snapshots through the reflection. Then construct the same evolution analytically with the image method (an inverted or upright image pulse on the extended string) and overlay it on the numerical result. Explain the momentary amplitude doubling at a free end and the momentary cancellation at a fixed end in terms of the images.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'separation-of-variables-string',
              title: 'Modes of a string by separation of variables',
              prompt:
                'Solve the wave equation on $[0, L]$ with fixed ends by separation of variables and derive the mode frequencies. Then do the same for a string with one fixed and one free end, and for a string with a mass $M$ attached at the free end (the boundary condition becomes $M\\partial_t^2 y = -T\\partial_x y$); derive the transcendental equation for the frequencies and solve it numerically for $M = \\mu L$, comparing with the fixed-free and fixed-fixed limits.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'pipe-harmonics-measurement',
              title: 'Measure the harmonics of a pipe',
              prompt:
                'Record yourself blowing across a bottle or a cardboard tube with one end open and one closed, and separately an open-open tube. Compute the spectrum with an FFT and identify the peaks. Show the closed pipe has odd harmonics only and the open pipe all harmonics, and use the fundamental to infer the effective length including the end correction (about 0.6 times the radius per open end). Compare with the measured length.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a pulse inverted on reflection from a fixed end but not from a free end?',
              answerOutline:
                'The fixed end forces y = 0, which requires an inverted image; the free end forces zero slope, which requires an upright image. Equivalently the fixed end exerts a downward force on an upward pulse.',
            },
            {
              question: 'Is a standing wave a new kind of solution of the wave equation?',
              answerOutline:
                'No: it is the superposition of two equal counter-propagating travelling waves; the nodes are where they always cancel.',
            },
            {
              question: 'Why does a closed pipe sound an octave below an open pipe of the same length and lack even harmonics?',
              answerOutline:
                'A closed end is a pressure antinode and an open end a node, so the pipe must hold an odd number of quarter wavelengths: f = (2n-1)v/4L, fundamental at v/4L rather than v/2L.',
            },
          ],
        },
        {
          slug: 'energy-impedance-reflection-and-transmission',
          title: 'Energy, impedance, reflection and transmission',
          summary:
            'How waves carry energy, why the impedance of a medium decides how much of a wave bounces off a junction, and how to match impedances to avoid reflections.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the energy density and energy flux of a wave on a string and show the time-averaged power is $\\tfrac12 Z\\omega^2 A^2$',
            'Define the impedance of a string $Z = \\sqrt{T\\mu}$ as the ratio of transverse force to transverse velocity',
            'Derive the reflection and transmission coefficients at a junction between two strings and check energy conservation',
            'Explain impedance matching (quarter-wave transformer, anti-reflection coating, horn) and its applications',
          ],
          concepts: [
            'Kinetic and potential energy densities of a string',
            'Energy flux (power) $P = -T\\partial_x y\\,\\partial_t y$',
            'Impedance $Z = T/v = \\sqrt{T\\mu}$',
            'Boundary conditions at a junction: continuity of $y$ and of $T\\partial_x y$',
            'Amplitude coefficients $r = (Z_1 - Z_2)/(Z_1 + Z_2)$, $\\tau = 2Z_1/(Z_1 + Z_2)$',
            'Power coefficients $R = r^2$, $\\mathcal{T} = 1 - R$',
            'Impedance matching and the quarter-wave transformer',
            'Termination: matched load absorbs completely',
          ],
          explanation: `A travelling wave carries energy. For a string the kinetic energy density is $\\tfrac12\\mu(\\partial_t y)^2$ and the potential energy density (from stretching) is $\\tfrac12 T(\\partial_x y)^2$; for a travelling wave the two are equal at every point and instant. The power transmitted across a point is the transverse force exerted by the left part on the right times the transverse velocity: $P = -T\\,\\partial_x y\\,\\partial_t y$. For $y = A\\cos(kx - \\omega t)$ this averages to $\\langle P\\rangle = \\tfrac12\\sqrt{T\\mu}\\,\\omega^2A^2$. The combination
$$Z = \\sqrt{T\\mu} = \\frac{T}{v} = \\mu v$$
is the **impedance** of the string: the ratio of transverse force to transverse velocity for a travelling wave. A high-impedance string is heavy or taut and needs a large force to be driven at a given velocity.

Join two strings with impedances $Z_1$ and $Z_2$. At the junction the displacement is continuous (the string does not break) and the transverse force $T\\partial_x y$ is continuous (a massless junction cannot sustain a net force). Writing incident, reflected and transmitted sinusoids and imposing both conditions gives the **reflection and transmission amplitude coefficients**
$$r = \\frac{Z_1 - Z_2}{Z_1 + Z_2}, \\qquad \\tau = \\frac{2Z_1}{Z_1 + Z_2}.$$
If $Z_2 > Z_1$ (into a heavier string) the reflection is inverted; $Z_2 \\to \\infty$ is the fixed end, $Z_2 \\to 0$ the free end, of the previous lesson. The power reflection coefficient is $R = r^2$ and the transmitted fraction is $1 - R$ (check it: $\\tau^2 Z_2/Z_1 = 1 - r^2$). Only the impedance mismatch matters, not the speeds separately.

The same formulas, with the appropriate impedance, govern sound crossing from air to water (which is why you hear almost nothing underwater from above: $R \\approx 0.999$), light crossing from air to glass ($Z \\propto 1/n$, so $R = 4\\%$ per surface), and electrical signals meeting a mismatched cable. **Impedance matching** is the art of removing the reflection: a **quarter-wave layer** of impedance $\\sqrt{Z_1 Z_2}$ cancels it at one wavelength (anti-reflection coatings on lenses), a gradual taper does it over a broad band (a horn on a trumpet, the shape of your outer ear), and a **matched termination** $Z_2 = Z_1$ absorbs a wave with no echo, which is how you end a transmission line and how you build an absorbing boundary in a simulation.

Read Georgi chapter 9 or 8.03SC lecture 10 and OpenStax 16.4; do the junction simulation, which makes the formulas concrete.`,
          resources: [
            {
              title: 'MIT 8.03SC — Lecture 10: Boundary conditions, reflection and transmission',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Georgi — The Physics of Waves, Ch. 9: The Boundary at Infinity (impedance, reflection, transmission)',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
            },
            {
              title: 'OpenStax University Physics Vol. 1 — 16.4 Energy and Power of a Wave; 16.5 Interference of Waves',
              url: 'https://openstax.org/books/university-physics-volume-1/pages/16-1-traveling-waves',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
          ],
          exercises: [
            {
              slug: 'junction-coefficients',
              title: 'Derive the junction coefficients and check energy',
              prompt:
                'Derive $r$ and $\\tau$ for a junction between strings of impedance $Z_1$ and $Z_2$ from continuity of displacement and of transverse force. Show that the power reflection and transmission coefficients sum to 1. Then add a point mass $M$ at the junction and show $r$ becomes complex and frequency-dependent; interpret the phase shift and the high-frequency limit.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'junction-simulation',
              title: 'Simulate a pulse hitting a junction',
              prompt:
                'Extend your finite-difference solver to a string with $\\mu$ changing at the midpoint (keep $T$ fixed). Send a Gaussian pulse from the light side into a string 4 times heavier, and from the heavy side into the light one. Measure the reflected and transmitted amplitudes and compare with $r$ and $\\tau$; also integrate the energy on each side and verify conservation. Then insert a quarter-wave matching section (for a sinusoidal wave train) and show the reflection nearly vanishes at the design frequency.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'impedance-estimates',
              title: 'Impedances in the real world',
              prompt:
                'Compute the acoustic impedance $\\rho c$ of air, water and steel, and the power reflection coefficient at air-water and water-steel interfaces. Explain why ultrasound imaging requires gel, why a stethoscope has a diaphragm, and why the middle ear bones act as an impedance transformer (estimate the area ratio needed to match air to the cochlear fluid, and compare with the eardrum/oval-window ratio of about 20).',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the impedance of a string and what does a large value mean physically?',
              answerOutline:
                'Z = sqrt(T mu), the ratio of transverse driving force to transverse velocity; a large Z means the medium is hard to set moving and carries more power at a given amplitude.',
            },
            {
              question: 'A wave passes from a light string to a heavy one. Describe the reflected and transmitted pulses.',
              answerOutline:
                'Reflected pulse inverted with amplitude r = (Z1 - Z2)/(Z1 + Z2) < 0; transmitted upright, smaller, and shorter (lower speed), with total power conserved.',
            },
            {
              question: 'How does a quarter-wave layer eliminate reflection?',
              answerOutline:
                'A layer of impedance sqrt(Z1 Z2) and thickness lambda/4 produces two reflections of equal magnitude and opposite phase (half a wavelength round trip), which cancel.',
            },
          ],
        },
        {
          slug: 'sound-waves-and-the-doppler-effect',
          title: 'Sound waves and the Doppler effect',
          summary:
            'Longitudinal waves in a fluid: deriving the speed of sound, pressure and displacement waves, intensity and decibels, and what moving sources and observers do to frequency.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the wave equation for sound in a fluid and the speed $c = \\sqrt{B/\\rho} = \\sqrt{\\gamma p/\\rho}$',
            'Relate pressure and displacement amplitudes and compute intensity and sound level in decibels',
            'Derive the Doppler shift for moving source and moving observer and explain why they differ',
            'Describe shock waves, the Mach cone and the sonic boom',
          ],
          concepts: [
            'Longitudinal displacement wave $s(x, t)$ and pressure wave $\\delta p = -B\\partial_x s$',
            'Bulk modulus; adiabatic sound speed $\\sqrt{\\gamma RT/M}$',
            'Pressure and displacement are $90°$ out of phase in space',
            'Intensity $I = \\tfrac12\\rho c\\omega^2 s_0^2 = \\delta p_0^2/2\\rho c$',
            'Decibels: $\\beta = 10\\log_{10}(I/10^{-12}\\,\\text{W/m}^2)$',
            'Doppler: $f\' = f\\,(c \\pm v_o)/(c \\mp v_s)$',
            'Mach cone $\\sin\\theta = c/v$',
            'Hearing: frequency range, threshold, loudness',
          ],
          explanation: `Sound is a longitudinal wave: fluid elements oscillate along the direction of propagation, producing alternating compressions and rarefactions. Let $s(x, t)$ be the displacement of the element whose rest position is $x$. The fractional volume change is $\\partial_x s$, so the excess pressure is $\\delta p = -B\\,\\partial_x s$ with $B$ the bulk modulus. Newton's law on a slab, $\\rho\\,\\partial_t^2 s = -\\partial_x\\delta p$, gives the wave equation with
$$c = \\sqrt{\\frac{B}{\\rho}} = \\sqrt{\\frac{\\gamma p}{\\rho}} = \\sqrt{\\frac{\\gamma RT}{M}}.$$
Newton himself used the isothermal modulus $B = p$ and got $c$ wrong by 15%; the compressions are too fast for heat to flow, so the adiabatic modulus $\\gamma p$ applies (Laplace's correction). In air at 20°C, $c \\approx 343$ m/s; it depends on temperature, not pressure.

The pressure wave and the displacement wave are a quarter wavelength apart: pressure is maximal where the displacement gradient is most negative. Both descriptions are equivalent, but boundary conditions differ (a rigid wall is a displacement node and a pressure antinode). The **intensity** is $I = \\tfrac12\\rho c\\,\\omega^2 s_0^2 = \\delta p_0^2/(2\\rho c)$, with $\\rho c$ the acoustic impedance from the previous lesson. Because the ear spans twelve orders of magnitude in intensity, levels are quoted in **decibels** relative to $10^{-12}$ W/m²; the threshold of hearing corresponds to a pressure amplitude of about $2\\times10^{-5}$ Pa, a displacement smaller than an atom.

The **Doppler effect** follows from counting wavefronts. A moving observer meets wavefronts at a changed rate: $f' = f(1 \\pm v_o/c)$. A moving source compresses the wavelength ahead of it: $f' = f/(1 \\mp v_s/c)$. The combined formula $f' = f\\frac{c \\pm v_o}{c \\mp v_s}$ is *not* symmetric between source and observer, because the medium defines a preferred frame; the relativistic Doppler effect for light, which has no medium, is symmetric. For a source faster than sound the wavefronts pile up into a **Mach cone** of half-angle $\\sin\\theta = c/v$, the sonic boom; the same geometry gives the bow wave of a boat and Cherenkov radiation.

Read OpenStax chapter 17 and 8.03SC lecture 11; the Feynman chapter on sound is an excellent overview. The Doppler measurement exercise is a classic you can do with a phone and a passing car.`,
          resources: [
            {
              title: 'OpenStax University Physics Vol. 1 — Ch. 17: Sound',
              url: 'https://openstax.org/books/university-physics-volume-1/pages/17-1-sound-waves',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Lecture 11: Sound waves',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 47: Sound. The wave equation',
              url: 'https://www.feynmanlectures.caltech.edu/I_47.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'The derivation of the sound wave equation from first principles, with the adiabatic subtlety.',
            },
            {
              title: 'PhET — Sound Waves',
              url: 'https://phet.colorado.edu/en/simulations/sound-waves',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
          ],
          exercises: [
            {
              slug: 'sound-speed-derivation',
              title: 'Derive the speed of sound and Laplace\'s correction',
              prompt:
                'Derive the wave equation for sound in a fluid from the continuity equation and Newton\'s law for a slab, and obtain $c = \\sqrt{B/\\rho}$. Show that the isothermal assumption gives $c = \\sqrt{p/\\rho} = 290$ m/s for air at STP while the adiabatic one gives 331 m/s. Estimate the thermal diffusion length during one period at 1 kHz and argue quantitatively why heat does not flow between compressions and rarefactions.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'doppler-measurement',
              title: 'Measure a car\'s speed by Doppler shift',
              prompt:
                'Record a car (or any vehicle with a steady tone) passing by. Compute a spectrogram (scipy.signal.spectrogram) and track the frequency of a prominent harmonic before and after the pass. From the ratio $f_{before}/f_{after}$ derive the speed; include the geometry correction if the car does not pass through your position. Report the speed with an uncertainty and compare with any independent estimate.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'intensity-and-decibels',
              title: 'Intensity, decibels and hearing',
              prompt:
                'A loudspeaker emits 1 W of acoustic power isotropically. Find the intensity, sound level, pressure amplitude and displacement amplitude at 1 m and at 10 m for a 1 kHz tone. How many such speakers would reach the pain threshold (120 dB) at 10 m? Explain why doubling the number of speakers adds 3 dB while doubling the perceived loudness needs roughly 10 dB.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the speed of sound in air depend on temperature but not on pressure?',
              answerOutline:
                'c = sqrt(gamma p/rho) and for an ideal gas p/rho = RT/M, so pressure cancels and only T and the molar mass remain.',
            },
            {
              question: 'Why are the Doppler formulas for a moving source and a moving observer different?',
              answerOutline:
                'The medium defines a rest frame: a moving source changes the wavelength in the medium, a moving observer changes the rate at which fixed wavelengths are encountered; the two are not symmetric unless v << c.',
            },
            {
              question: 'Where is the pressure maximum relative to the displacement in a sound wave?',
              answerOutline:
                'A quarter wavelength from the displacement maximum, where the displacement gradient is most negative (maximum compression); pressure and displacement are 90 degrees out of phase.',
            },
          ],
        },
        {
          slug: 'dispersion-phase-and-group-velocity',
          title: 'Dispersion, phase velocity and group velocity',
          summary:
            'When the wave speed depends on frequency: dispersion relations, the difference between the speed of crests and the speed of a packet, and the spreading of pulses in real media.',
          estimatedMinutes: 120,
          objectives: [
            'Define a dispersion relation $\\omega(k)$ and compute phase velocity $\\omega/k$ and group velocity $d\\omega/dk$ for several media',
            'Derive the group velocity from the superposition of two nearby frequencies and from the stationary-phase argument',
            'Explain why energy and information travel at the group velocity and what happens when $v_g > c$ or $v_g < 0$',
            'Simulate the propagation and spreading of a wave packet in a dispersive medium',
          ],
          concepts: [
            'Dispersion relation $\\omega(k)$',
            'Phase velocity $v_p = \\omega/k$; group velocity $v_g = d\\omega/dk$',
            'Examples: deep-water waves $\\omega^2 = gk$, stiff string, plasma $\\omega^2 = \\omega_p^2 + c^2k^2$, quantum particle $\\omega = \\hbar k^2/2m$',
            'Non-dispersive: $v_p = v_g$',
            'Wave packet envelope moves at $v_g$',
            'Group velocity dispersion and pulse spreading',
            'Anomalous dispersion and the meaning of $v_g > c$',
            'Stationary phase',
          ],
          explanation: `The ideal string has $\\omega = vk$, so every frequency travels at the same speed and shapes propagate undistorted. Most media are **dispersive**: the wave speed depends on wavelength, encoded in a **dispersion relation** $\\omega(k)$. Deep-water waves have $\\omega^2 = gk$ (long waves are faster, which is why ocean swell from a distant storm arrives as long waves first); a stiff piano string has $\\omega^2 = v^2k^2 + \\alpha k^4$ (its overtones are sharp, which piano tuners stretch octaves to accommodate); light in glass has $n(\\omega)$; a plasma has $\\omega^2 = \\omega_p^2 + c^2k^2$; and a quantum particle has $\\omega = \\hbar k^2/2m$. The beaded string was your first example.

Two velocities now matter. The **phase velocity** $v_p = \\omega/k$ is the speed of an individual crest of a single sinusoid. But a single sinusoid carries no information; a signal is a **wave packet**, a superposition of nearby frequencies, and its envelope moves at the **group velocity**
$$v_g = \\frac{d\\omega}{dk}.$$
The simplest derivation superposes two waves with $k \\pm \\Delta k$, $\\omega \\pm \\Delta\\omega$: the product form $2\\cos(\\Delta k\\,x - \\Delta\\omega\\,t)\\cos(kx - \\omega t)$ has an envelope moving at $\\Delta\\omega/\\Delta k$. For a general packet the stationary-phase argument gives the same: the packet is where the phases of the Fourier components agree, and that point moves at $d\\omega/dk$. Energy and information travel at $v_g$. For deep-water waves $v_g = v_p/2$: watch a group of ripples and you will see crests born at the back, move through the group, and die at the front.

Because $v_g$ itself depends on $k$ (**group velocity dispersion**), a packet spreads as it travels: its different frequency components drift apart. A short optical pulse in a fibre broadens by this mechanism, limiting data rates, and a free quantum wave packet spreads for exactly the same mathematical reason. Near an absorption resonance, $n(\\omega)$ falls with frequency (**anomalous dispersion**) and $v_g$ can exceed $c$ or go negative. This does not violate relativity: the packet is strongly distorted and the front of any signal still travels at $c$; the group velocity simply stops being the velocity of information.

Read 8.03SC lecture 12 and Georgi chapter 10; the exercises require your FFT skills, so revisit module 4 if needed. The quantum-mechanics subject will reuse everything here for the Schrödinger equation.`,
          resources: [
            {
              title: 'MIT 8.03SC — Lecture 12: Dispersion, phase velocity, group velocity',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Georgi — The Physics of Waves, Ch. 10: Signals and Fourier analysis (dispersion and group velocity)',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 48: Beats (includes group velocity)',
              url: 'https://www.feynmanlectures.caltech.edu/I_48.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Sections 48-4 to 48-7 on modulation, group velocity and the quantum-mechanical particle.',
            },
            {
              title: 'Fitzpatrick — Oscillations and Waves: dispersive waves',
              url: 'https://farside.ph.utexas.edu/teaching/315/Waveshtml/Waveshtml.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Texas at Austin',
            },
          ],
          exercises: [
            {
              slug: 'velocities-of-media',
              title: 'Phase and group velocities of real media',
              prompt:
                'For each dispersion relation compute $v_p$ and $v_g$ and the ratio $v_g/v_p$: deep water $\\omega^2 = gk$; shallow water $\\omega^2 = gk\\tanh(kh)$ in both limits; capillary waves $\\omega^2 = \\sigma k^3/\\rho$; plasma $\\omega^2 = \\omega_p^2 + c^2k^2$; a free quantum particle. For the plasma show $v_p v_g = c^2$ and that $v_p > c$ while $v_g < c$. For water waves find the wavelength at which $v_p$ is minimal (about 1.7 cm) and explain what happens to the ripples around a fishing line in a stream.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'wave-packet-simulation',
              title: 'Propagate a wave packet in a dispersive medium',
              prompt:
                'Construct a Gaussian wave packet $\\psi(x, 0) = e^{-x^2/2\\sigma^2}e^{ik_0x}$, take its FFT, multiply each component by $e^{-i\\omega(k)t}$ for (a) $\\omega = vk$, (b) $\\omega^2 = gk$, (c) $\\omega = \\hbar k^2/2m$, and inverse-transform to get $\\psi(x, t)$. Animate $|\\psi|$ and the real part. Measure the envelope speed and compare with $d\\omega/dk$ at $k_0$; measure the width growth in (c) and compare with the analytic $\\sigma(t) = \\sigma\\sqrt{1 + (\\hbar t/m\\sigma^2)^2}$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'stationary-phase-derivation',
              title: 'Group velocity by stationary phase',
              prompt:
                'Write a packet as $\\psi(x, t) = \\int A(k)e^{i(kx - \\omega(k)t)}dk$ with $A(k)$ peaked at $k_0$. Expand $\\omega(k)$ to second order about $k_0$ and show that to first order the packet moves rigidly at $v_g = \\omega\'(k_0)$, while the second-order term $\\tfrac12\\omega\'\'(k_0)$ broadens it. Derive the spreading formula for a Gaussian $A(k)$ and verify it against your simulation.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between phase velocity and group velocity, and which carries energy?',
              answerOutline:
                'Phase velocity omega/k is the speed of crests of a pure sinusoid; group velocity d omega/dk is the speed of the envelope of a packet and of the energy and information.',
            },
            {
              question: 'Why do pulses spread in a dispersive medium?',
              answerOutline:
                'Different frequency components travel at different group velocities (nonzero d^2 omega/dk^2), so the components drift apart and the envelope broadens.',
            },
            {
              question: 'Does a group velocity greater than c violate causality?',
              answerOutline:
                'No: in anomalous dispersion the packet is reshaped and v_g no longer tracks the signal; the front of any disturbance never exceeds c.',
            },
          ],
        },
      ],
      project: {
        slug: 'string-simulator',
        title: 'Module project: a realistic string simulator',
        description: `Build a finite-difference simulator of a plucked or struck string with variable mass density, stiffness (a fourth-derivative term), frequency-dependent damping, and a bridge with finite impedance. Validate it against the ideal-string harmonic series and the stiff-string inharmonicity formula, then synthesise sounds: export WAV files of a plucked guitar string and a struck piano string and compare their spectra with recordings.`,
        deliverables: [
          'A solver supporting fixed, free and impedance boundary conditions, validated against the analytic mode frequencies to 0.1%',
          'A demonstration that stiffness produces sharp overtones matching f_n = n f_1 sqrt(1 + B n^2)',
          'WAV output of a pluck and a strike, with spectrograms',
          'A short report on the CFL condition for the stiff string and how you chose the grid',
        ],
        estimatedHours: 8,
        stretchGoals: [
          'Couple two strings through a bridge and reproduce the beating of a piano unison',
          'Add a nonlinear tension term and show pitch glide for large-amplitude plucks',
        ],
      },
    },
    {
      slug: 'fourier-analysis-of-waves',
      title: 'Fourier Analysis of Waves',
      description:
        'Any wave is a sum of sinusoids: Fourier series for the plucked string, Fourier transforms for pulses and packets, the bandwidth-duration relation, and the FFT as a practical instrument.',
      lessons: [
        {
          slug: 'fourier-series-and-the-plucked-string',
          title: 'Fourier series and the plucked string',
          summary:
            'Expanding the initial shape of a string in its normal modes is a Fourier sine series; the coefficients are the harmonic recipe you hear.',
          estimatedMinutes: 120,
          objectives: [
            'Compute Fourier sine coefficients of a given initial shape using orthogonality of the modes',
            'Write the full time evolution of a plucked or struck string as a mode sum and animate it',
            'Explain why plucking position controls timbre and which harmonics are missing',
            'State Parseval\'s theorem and use it to distribute the energy among harmonics',
          ],
          concepts: [
            'Mode expansion $y(x, t) = \\sum_n [A_n\\cos\\omega_n t + B_n\\sin\\omega_n t]\\sin(n\\pi x/L)$',
            'Orthogonality $\\int_0^L \\sin(n\\pi x/L)\\sin(m\\pi x/L)dx = \\tfrac{L}{2}\\delta_{nm}$',
            'Coefficients $A_n = \\frac{2}{L}\\int_0^L y_0(x)\\sin(n\\pi x/L)dx$',
            'Pluck at $x = L/p$ kills harmonics that are multiples of $p$',
            'Gibbs phenomenon at corners',
            'Parseval: energy is the sum of mode energies',
            'Struck vs plucked spectra ($1/n$ vs $1/n^2$ envelopes)',
            'Timbre',
          ],
          explanation: `The normal modes of a fixed-fixed string are $\\sin(n\\pi x/L)$, and the general motion is the superposition
$$y(x, t) = \\sum_{n=1}^\\infty\\left[A_n\\cos\\omega_n t + B_n\\sin\\omega_n t\\right]\\sin\\frac{n\\pi x}{L}, \\qquad \\omega_n = \\frac{n\\pi v}{L}.$$
At $t = 0$ this says $y_0(x) = \\sum A_n\\sin(n\\pi x/L)$: the initial shape must be written as a sum of sines. That is a **Fourier sine series**, and the coefficients follow from the same orthogonality you proved for discrete modes, now as an integral: multiply by $\\sin(m\\pi x/L)$, integrate over the string, and all terms but one vanish, giving $A_n = \\frac{2}{L}\\int_0^L y_0(x)\\sin\\frac{n\\pi x}{L}dx$. The initial velocity fixes $B_n$ the same way. The mathematics of Fourier series (convergence, completeness, the Gibbs overshoot at a corner) is canonical in math-methods; here you use it.

Pluck a string at a point $x = L/p$ and the triangle shape has coefficients $A_n \\propto \\frac{\\sin(n\\pi/p)}{n^2}$. Two consequences you can hear. The amplitudes fall as $1/n^2$, so the sound is mellow; a *struck* string (initial velocity concentrated at a point, as in a piano) has coefficients falling as $1/n$, so it is brighter. And every harmonic with $n$ a multiple of $p$ is absent, because the pluck point is a node of those modes: pluck a guitar string at its midpoint and all even harmonics vanish, giving a hollow, clarinet-like tone, while plucking near the bridge excites many harmonics and sounds sharp. The **timbre** of an instrument is largely this recipe of harmonic amplitudes.

**Parseval's theorem** says the energy of the string is the sum of the energies of its modes, $E = \\sum_n \\tfrac14\\mu L\\omega_n^2(A_n^2 + B_n^2)$, with no cross terms, because the modes are orthogonal. You can therefore say what fraction of the energy of a pluck is in each harmonic.

Numerically, the sine-series coefficients of a sampled shape are a discrete sine transform, available as \`scipy.fft.dst\`, and the time evolution is then a sum you can animate in a few lines. Compare it with your finite-difference solver: they must agree. Read 8.03SC lecture 9 and Georgi 6.2-6.3; the OpenStax section is lighter.`,
          resources: [
            {
              title: 'MIT 8.03SC — Lecture 9: Wave equation, standing waves, Fourier series',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'Georgi — The Physics of Waves, Ch. 6: Continuum limit and Fourier series',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 50: Harmonics',
              url: 'https://www.feynmanlectures.caltech.edu/I_50.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Musical tones, Fourier coefficients, and the energy theorem, with Feynman\'s usual clarity.',
            },
            {
              title: 'PhET — Fourier: Making Waves',
              url: 'https://phet.colorado.edu/en/simulations/fourier-making-waves',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
              note: 'Build a shape from harmonics by hand; the game mode is an excellent test of intuition.',
            },
          ],
          exercises: [
            {
              slug: 'pluck-coefficients',
              title: 'Fourier coefficients of a plucked string',
              prompt:
                'A string of length $L$ is plucked to height $h$ at $x = L/p$ (a triangle) and released. Derive $A_n = \\frac{2hp^2}{\\pi^2 n^2(p-1)}\\sin\\frac{n\\pi}{p}$ and show that harmonics with $n$ a multiple of $p$ vanish. Compute the fraction of the energy in the fundamental for $p = 2, 5, 10$ using Parseval. Plot the partial sums for 1, 3, 10, 50 terms and observe the Gibbs overshoot at the corner.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'mode-sum-vs-fd',
              title: 'Mode-sum evolution vs finite differences',
              prompt:
                'Write the time evolution of a plucked string as a truncated mode sum (50 modes) using scipy.fft.dst for the coefficients, and animate it. Run your finite-difference solver from the same initial shape and overlay the two at several times; they should agree to the truncation error. Then synthesise the sound: evaluate $y(x_{pickup}, t)$ at 44.1 kHz for 2 s with a slight damping $e^{-\\gamma_n t}$ that grows with $n$, write a WAV, and listen to plucks at $L/2$, $L/5$ and $L/20$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'struck-string-spectrum',
              title: 'Struck vs plucked spectra',
              prompt:
                'A piano hammer gives the string an initial velocity $v_0$ over a short segment of width $w$ centred at $x = L/8$, with zero displacement. Compute the $B_n$ coefficients, show they fall as $1/n$ (with a cutoff at $n \\sim L/w$), and compare the spectrum with the plucked $1/n^2$ case on a log plot. Explain why pianos sound brighter than harps and why the hammer position near $L/8$ (used in real pianos) suppresses the dissonant seventh harmonic.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does plucking a string at its midpoint remove all even harmonics?',
              answerOutline:
                'The even modes have a node at the midpoint, so the projection of the triangle shape onto them vanishes; equivalently the triangle is symmetric and the even modes are antisymmetric about L/2.',
            },
            {
              question: 'What does Parseval\'s theorem say for a vibrating string?',
              answerOutline:
                'The total energy equals the sum over modes of the energy in each mode, with no cross terms, because the modes are orthogonal.',
            },
            {
              question: 'Why do the Fourier coefficients of a plucked string fall as 1/n^2 but those of a struck string as 1/n?',
              answerOutline:
                'The plucked shape is continuous with a kink (discontinuous first derivative), giving 1/n^2; the struck initial velocity is itself discontinuous (a step), giving 1/n.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-series'],
        },
        {
          slug: 'fourier-transforms-and-wave-packets',
          title: 'Fourier transforms and wave packets',
          summary:
            'For pulses on an infinite line the sum becomes an integral: the Fourier transform, its key pairs, and the construction and propagation of wave packets.',
          estimatedMinutes: 120,
          objectives: [
            'Pass from the Fourier series on a finite interval to the Fourier transform on the line and state the inversion formula',
            'Compute the transforms of a Gaussian, a rectangular pulse and a decaying exponential, and know what each pair teaches',
            'Build a wave packet from its spectrum and propagate it with a given dispersion relation',
            'Use the convolution theorem to understand filtering and the response of a linear system',
          ],
          concepts: [
            'Fourier transform $\\tilde f(k) = \\int f(x)e^{-ikx}dx$ and inverse',
            'Transform pairs: Gaussian to Gaussian, rectangle to sinc, exponential decay to Lorentzian',
            'Delta function and the plane wave',
            'Wave packet $\\psi(x, t) = \\int \\tilde\\psi(k)e^{i(kx - \\omega(k)t)}dk$',
            'Convolution theorem',
            'Linear system response: multiply in the frequency domain',
            'Parseval/Plancherel for transforms',
            'Conventions: $2\\pi$ placement',
          ],
          explanation: `On a finite string the modes are discrete, $k_n = n\\pi/L$. Let $L \\to \\infty$: the spacing between allowed $k$ shrinks to zero, the sum becomes an integral, and the Fourier series becomes the **Fourier transform**
$$\\tilde f(k) = \\int_{-\\infty}^{\\infty}f(x)e^{-ikx}dx, \\qquad f(x) = \\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}\\tilde f(k)e^{ikx}dk.$$
(Conventions differ in where the $2\\pi$ goes; pick one and keep it.) Any localised disturbance is a superposition of plane waves $e^{ikx}$ with amplitude $\\tilde f(k)$. The transform is linear, and it turns differentiation into multiplication by $ik$, which is why it solves linear PDEs: transform, multiply, transform back.

Three transform pairs carry most of the physics. A **Gaussian** $e^{-x^2/2\\sigma^2}$ transforms to a Gaussian $\\propto e^{-\\sigma^2k^2/2}$: narrow in $x$ means wide in $k$. A **rectangle** of width $a$ transforms to $\\text{sinc}(ka/2)$, the amplitude pattern of single-slit diffraction (module 6 will show this is not a coincidence). A **decaying exponential** $e^{-\\Gamma t/2}$ (a ring-down) transforms to a **Lorentzian** in frequency of width $\\Gamma$: the resonance curve of module 1 is the Fourier transform of the free decay. The delta function transforms to a constant (a point source contains all wavelengths equally) and a plane wave to a delta function.

A **wave packet** is $\\psi(x, t) = \\frac{1}{2\\pi}\\int\\tilde\\psi(k)e^{i(kx - \\omega(k)t)}dk$: each plane-wave component advances its own phase at its own frequency. This is the recipe you simulated in the dispersion lesson and the exact way the free-particle Schrödinger equation is solved.

The **convolution theorem** says the transform of a convolution is the product of the transforms. A linear time-invariant system (an oscillator, a filter, a room's acoustics) convolves its input with its impulse response, so in the frequency domain it simply multiplies by the response function $\\tilde A(\\omega)$ of module 1. Filtering is multiplication; smoothing by a window is multiplication by the window's transform; the resolution of any instrument is a convolution. Read Georgi chapter 10 and the Feynman chapter; the math-methods lesson on the Fourier transform is the canonical reference for the theorems. Then do the exercises, which make the pairs concrete with numerical transforms.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 10: Signals and Fourier Analysis',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Lecture 13: Electromagnetic waves and Fourier analysis of pulses (see part I lectures 12-13)',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-i-mechanical-vibrations-and-waves/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: '3Blue1Brown — But what is the Fourier Transform? A visual introduction',
              url: 'https://www.youtube.com/watch?v=spUNpyF58BY',
              type: 'video',
              cost: 'free',
              provider: 'YouTube (3Blue1Brown)',
              note: 'The winding-frequency picture of the transform; 20 minutes well spent before the formal treatment.',
            },
            {
              title: 'David Tong — Vector Calculus notes (Fourier methods appendix) and teaching page',
              url: 'https://www.damtp.cam.ac.uk/user/tong/teaching.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge (DAMTP)',
              note: 'Use as a reference for transform conventions and theorems.',
            },
          ],
          exercises: [
            {
              slug: 'transform-pairs-by-hand',
              title: 'Compute the three key transform pairs',
              prompt:
                'Compute analytically the Fourier transforms of (a) $e^{-x^2/2\\sigma^2}$ (complete the square), (b) the rectangle of width $a$ and height 1, (c) $e^{-\\Gamma|t|/2}$ and the one-sided $e^{-\\Gamma t/2}\\cos\\omega_0 t\\,\\theta(t)$. For (c) show that the power spectrum near $\\omega_0$ is a Lorentzian of FWHM $\\Gamma$, and relate this to the resonance curve of a driven oscillator. Verify each numerically with numpy.fft and the correct scaling.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'convolution-and-response',
              title: 'Impulse response, convolution and the response function',
              prompt:
                'Compute numerically the impulse response of a damped oscillator ($Q = 10$) by integrating from a delta-function kick. Convolve it (numpy.convolve) with an arbitrary input force (e.g. a noisy square wave) and compare with direct integration of the driven oscillator; they must agree. Then take FFTs and show that output spectrum = input spectrum times the response function $\\tilde A(\\omega)$, reproducing the Lorentzian from the FFT of the impulse response.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'packet-from-spectrum',
              title: 'Design a wave packet from its spectrum',
              prompt:
                'Construct spectra $\\tilde\\psi(k)$ that are (a) a Gaussian centred at $k_0$, (b) a rectangle, (c) two Gaussians at $k_0 \\pm \\delta$. Inverse transform to get $\\psi(x, 0)$ and describe the resulting packets (envelope shape, carrier, beats). Propagate each with $\\omega = \\hbar k^2/2m$ and show that (c) separates into two packets moving at different group velocities. Explain the result in terms of the stationary-phase argument.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Fourier transform of a rectangular pulse look like and why does it matter in optics?',
              answerOutline:
                'A sinc function with zeros at k = 2 pi n / a; the Fraunhofer diffraction amplitude of a slit of width a is the Fourier transform of its aperture, hence the same sinc.',
            },
            {
              question: 'What does the convolution theorem say and how does it describe a linear system?',
              answerOutline:
                'The transform of a convolution is the product of transforms; a linear time-invariant system convolves input with its impulse response, so in frequency space it multiplies by its response function.',
            },
            {
              question: 'What is the Fourier transform of a free ring-down e^{-Gamma t/2} cos(omega_0 t)?',
              answerOutline:
                'A Lorentzian centred at omega_0 with full width at half maximum Gamma; decay time and linewidth are reciprocal.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-transform'],
        },
        {
          slug: 'bandwidth-duration-and-the-uncertainty-relation',
          title: 'Bandwidth, duration and the uncertainty relation',
          summary:
            'A short pulse must contain a broad band of frequencies: the classical uncertainty relation, with consequences from radar and spectroscopy to the Heisenberg principle.',
          estimatedMinutes: 90,
          objectives: [
            'State and prove $\\Delta k\\,\\Delta x \\ge \\tfrac12$ (and $\\Delta\\omega\\,\\Delta t \\ge \\tfrac12$) for rms widths, with equality for Gaussians',
            'Apply the relation to estimate the bandwidth of pulses, the linewidth of decaying signals and the resolution of spectral measurements',
            'Explain the trade-offs in a spectrogram and the meaning of time-frequency resolution',
            'Connect the relation to the Heisenberg uncertainty principle via $p = \\hbar k$',
          ],
          concepts: [
            'RMS width of a function and of its transform',
            '$\\Delta x\\,\\Delta k \\ge 1/2$; Gaussians saturate it',
            '$\\Delta t\\,\\Delta\\omega \\ge 1/2$; a pulse of $N$ cycles has fractional bandwidth $\\sim 1/N$',
            'Natural linewidth of a decaying oscillator',
            'Spectral resolution requires observation time',
            'Spectrogram and window length trade-off',
            'Chirped pulses and time-bandwidth product',
            'Heisenberg: $\\Delta x\\,\\Delta p \\ge \\hbar/2$',
          ],
          explanation: `The Gaussian transform pair already showed it: a function narrow in $x$ has a transform wide in $k$. The general statement is the **bandwidth theorem** or classical uncertainty relation. Define the rms widths $\\Delta x^2 = \\langle x^2\\rangle - \\langle x\\rangle^2$ with weight $|f|^2$ and likewise $\\Delta k$ with weight $|\\tilde f|^2$. Then
$$\\Delta x\\,\\Delta k \\ge \\frac12,$$
with equality if and only if $f$ is a Gaussian. The proof is a Cauchy-Schwarz inequality applied to $xf$ and $f'$ with an integration by parts; it is two lines once set up, and it is identical to the proof of Heisenberg's relation because Heisenberg's relation *is* this theorem with $p = \\hbar k$. Replacing $x \\to t$ and $k \\to \\omega$ gives $\\Delta t\\,\\Delta\\omega \\ge \\tfrac12$.

The practical content is enormous. A pulse of duration $\\Delta t$ necessarily contains a band of frequencies at least $1/2\\Delta t$ wide: a 10 fs laser pulse spans tens of nanometres of wavelength, a radar pulse that resolves range to 1 m must have 150 MHz of bandwidth, and a musical note of $N$ cycles has a pitch defined only to about one part in $N$ (which is why very low bass notes are hard to tune and why a struck drum has no definite pitch). A decaying oscillation of lifetime $\\tau$ has a **natural linewidth** $\\Gamma = 1/\\tau$, the Lorentzian of module 1; for an atomic transition this is the minimum width of its spectral line. Conversely, to measure a frequency to precision $\\delta f$ you must observe for at least $1/\\delta f$: atomic clocks interrogate for seconds, and gravitational-wave searches integrate for months.

A **spectrogram** displays frequency against time by transforming successive windowed segments; the window length $T_w$ fixes the time resolution and, by the theorem, the frequency resolution $1/T_w$. There is no window that gives both; you choose the trade-off for the signal at hand. (Chirped pulses have larger time-bandwidth products than the minimum; a chirped radar pulse can be compressed by matched filtering to a short pulse of high range resolution, which is how real radars combine long pulses with fine resolution.)

Read Georgi 10.3-10.4 and the Feynman section 48-7 on the quantum connection; then prove the theorem yourself and test it numerically.`,
          resources: [
            {
              title: 'Georgi — The Physics of Waves, Ch. 10.3-10.4: Bandwidth, fidelity and uncertainty',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 48: Beats (section 48-7, wave packets and the uncertainty principle)',
              url: 'https://www.feynmanlectures.caltech.edu/I_48.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'MIT 8.03SC — Part I lectures on Fourier analysis and uncertainty',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-i-mechanical-vibrations-and-waves/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'uncertainty-proof',
              title: 'Prove the bandwidth theorem',
              prompt:
                'Prove $\\Delta x\\,\\Delta k \\ge 1/2$ for a normalised $f(x)$ with $\\langle x\\rangle = \\langle k\\rangle = 0$, using Cauchy-Schwarz on $\\int |xf|^2 \\int |f\'|^2 \\ge |\\int x f^* f\'|^2$ and integrating by parts, together with Plancherel to express $\\int|f\'|^2$ in terms of $\\Delta k$. Show equality requires $f\' \\propto xf$, i.e. a Gaussian. Then verify numerically that a rectangle and a two-sided exponential exceed the bound and compute their time-bandwidth products.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'spectrogram-tradeoff',
              title: 'Time-frequency trade-off in a spectrogram',
              prompt:
                'Synthesise a signal consisting of a 1 kHz tone that switches abruptly to 1.1 kHz at t = 1 s, plus a short 5 ms click. Compute spectrograms with window lengths 2 ms, 20 ms and 200 ms (scipy.signal.spectrogram). Show that the short window resolves the click and the switch time but blurs the two tones, while the long window separates the tones but smears the click. Quantify the frequency resolution in each case and compare with 1/T_window.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'bandwidth-estimates',
              title: 'Bandwidth estimates in practice',
              prompt:
                'Estimate: (a) the spectral width in nm of a 10 fs pulse at 800 nm; (b) the minimum bandwidth of a radar pulse that resolves targets 0.5 m apart; (c) the natural linewidth of the sodium D line (lifetime 16 ns) in MHz and compare it with the Doppler width at 500 K; (d) the number of cycles needed to define the pitch of a 40 Hz bass note to within a semitone (6%), and the time that takes.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'State the bandwidth theorem and the function that saturates it.',
              answerOutline:
                'Delta t Delta omega >= 1/2 (rms widths), with equality only for a Gaussian envelope.',
            },
            {
              question: 'Why can a short pulse not have a precise frequency?',
              answerOutline:
                'Its Fourier transform must be broad: a function confined to duration Delta t requires components spread over at least 1/(2 Delta t) in angular frequency to cancel outside the pulse.',
            },
            {
              question: 'How is Heisenberg\'s uncertainty principle related to this theorem?',
              answerOutline:
                'It is the same theorem applied to the wavefunction with p = hbar k; Delta x Delta p >= hbar/2 is Delta x Delta k >= 1/2 multiplied by hbar.',
            },
          ],
        },
        {
          slug: 'fft-and-spectral-analysis-in-python',
          title: 'The FFT and spectral analysis in Python',
          summary:
            'Turning the theory into an instrument: sampling, aliasing, the discrete Fourier transform, windowing and leakage, and the analysis of real recorded signals.',
          estimatedMinutes: 120,
          objectives: [
            'Relate the discrete Fourier transform to the continuous transform and state the Nyquist-Shannon sampling theorem',
            'Explain aliasing and demonstrate it on a synthetic signal',
            'Use windowing to control spectral leakage and choose zero-padding and resolution sensibly',
            'Analyse a real recording: find its harmonics, estimate pitch, and measure a decay rate from the spectrum',
          ],
          concepts: [
            'Sampling at rate $f_s$; Nyquist frequency $f_s/2$',
            'Aliasing: frequencies above Nyquist fold back',
            'DFT $X_m = \\sum_n x_n e^{-2\\pi i mn/N}$; FFT in $O(N\\log N)$',
            'Frequency resolution $f_s/N$; zero padding interpolates, does not resolve',
            'Spectral leakage and window functions (Hann, Hamming, Blackman)',
            'Power spectral density; Welch\'s method',
            'rfft for real signals; scaling conventions',
            'Spectrogram',
          ],
          explanation: `Real signals are sampled: $x_n = x(n/f_s)$ for $n = 0, \\ldots, N - 1$. The **discrete Fourier transform** $X_m = \\sum_n x_n e^{-2\\pi imn/N}$ is the Fourier series of the sampled, periodically extended signal, and the **FFT** computes it in $O(N\\log N)$ instead of $O(N^2)$, which is the single reason spectral analysis is routine. Bin $m$ corresponds to frequency $mf_s/N$, so the **frequency resolution** is $f_s/N = 1/T_{\\text{record}}$, the bandwidth theorem again: to resolve two tones 1 Hz apart you need at least a second of data. Zero-padding the record interpolates the spectrum more finely but does not add resolution.

Sampling imposes the **Nyquist limit**: a sampled signal cannot represent frequencies above $f_s/2$. Anything higher is **aliased**, folding back to a lower apparent frequency (the beaded string's Brillouin zone is the same physics; wagon wheels in films turning backwards is the same again). Anti-aliasing filters before the sampler are mandatory in real instruments, and you should always check that your sampling rate exceeds twice the highest frequency present.

The DFT assumes the record repeats periodically. If a sinusoid does not complete an integer number of cycles in the record, the implied periodic signal has a jump at the ends and its spectrum **leaks** into neighbouring bins with slowly decaying sidelobes. Multiplying the record by a **window** that tapers to zero (Hann, Hamming, Blackman) suppresses the sidelobes at the cost of slightly widening the main lobe; this is the convolution theorem in action, since windowing convolves the true spectrum with the window's transform. For noisy signals, average the spectra of overlapping windowed segments (**Welch's method**, \`scipy.signal.welch\`) to estimate the power spectral density with reduced variance.

Use \`numpy.fft.rfft\` for real signals, and keep track of scaling: dividing by $N$ gives amplitudes, and the one-sided spectrum needs a factor 2 for all but the DC and Nyquist bins. The exercises take you from synthetic tests, where you know the answer, to a real recording. The computational-physics subject treats the FFT and spectral methods for PDEs in depth; this lesson is the practical minimum every physicist needs.`,
          resources: [
            {
              title: 'SciPy documentation — Fourier Transforms (scipy.fft tutorial)',
              url: 'https://docs.scipy.org/doc/scipy/tutorial/fft.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'The DFT definitions, rfft, and worked examples with windowing.',
              primary: true,
            },
            {
              title: 'Georgi — The Physics of Waves, Ch. 10: Signals and Fourier analysis',
              url: 'https://www.people.fas.harvard.edu/~hgeorgi/onenew.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Harvard University',
            },
            {
              title: 'Schroeder — Physics Simulations in Python',
              url: 'https://physics.weber.edu/schroeder/scicomp/',
              type: 'textbook',
              cost: 'free',
              provider: 'Weber State University',
              note: 'Includes a short, practical introduction to Fourier analysis of simulated signals.',
            },
            {
              title: '3Blue1Brown — But what is the Fourier Transform?',
              url: 'https://www.youtube.com/watch?v=spUNpyF58BY',
              type: 'video',
              cost: 'free',
              provider: 'YouTube (3Blue1Brown)',
            },
          ],
          exercises: [
            {
              slug: 'aliasing-demo',
              title: 'Demonstrate aliasing and the Nyquist limit',
              prompt:
                'Sample a 900 Hz sine at $f_s = 1000$ Hz and plot the samples: they look like a 100 Hz sine. Compute the rfft and show the peak at 100 Hz. Then sweep the true frequency from 0 to 2500 Hz and plot the apparent frequency against the true one, reproducing the folding pattern. Finally apply a low-pass anti-aliasing filter (scipy.signal.butter) before downsampling a 44.1 kHz recording to 8 kHz and compare the spectra with and without the filter.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'leakage-and-windows',
              title: 'Leakage, windows and resolution',
              prompt:
                'Generate 1 s of a 100.5 Hz sine at 1 kHz sampling plus a 110 Hz sine 60 dB weaker. Compute the spectrum with a rectangular window and show the weak tone is buried in leakage sidelobes. Repeat with Hann and Blackman windows and show it emerges. Then shorten the record to 0.05 s and show that no window can separate the two tones, in agreement with the 1/T resolution limit. Tabulate main-lobe width and first-sidelobe level for each window.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'analyse-a-recording',
              title: 'Full spectral analysis of a real sound',
              prompt:
                'Record a sustained note from any instrument or voice (or use a free sample). Compute the Welch PSD and identify the fundamental and at least five harmonics; estimate the pitch in cents relative to equal temperament. Make a spectrogram and describe the attack and decay. Isolate one harmonic with a band-pass filter, compute its envelope with the Hilbert transform and measure its decay rate; compare the decay rates of the fundamental and a high harmonic and explain the difference physically.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the frequency resolution of an N-point FFT of data sampled at f_s, and does zero-padding improve it?',
              answerOutline:
                'f_s/N = 1/T_record; zero-padding interpolates the spectrum but cannot separate tones closer than 1/T, since no new data is added.',
            },
            {
              question: 'What is aliasing and how is it prevented?',
              answerOutline:
                'Frequencies above f_s/2 appear at a lower folded frequency because the samples cannot distinguish them; prevent it with an analogue low-pass filter before sampling or by sampling faster.',
            },
            {
              question: 'Why does a window function reduce leakage, and what is the cost?',
              answerOutline:
                'Tapering removes the discontinuity of the periodic extension, so the window\'s transform has low sidelobes; the main lobe widens, slightly reducing resolution.',
            },
          ],
          relatedLessons: ['math-methods/fourier-and-complex-analysis/fourier-transform'],
        },
      ],
      project: {
        slug: 'spectrum-analyser',
        title: 'Module project: a real-time spectrum analyser',
        description: `Build a small spectrum analyser in Python that reads audio from a file or microphone (sounddevice or pyaudio), displays the live spectrum and a scrolling spectrogram with selectable window and FFT length, detects the dominant pitch, and estimates the Q of a decaying note. Validate it against synthetic signals with known content, then use it to measure the harmonic content of three instruments and the resonance frequency and Q of a wine glass.`,
        deliverables: [
          'A script or small app showing live spectrum and spectrogram with adjustable window length and type',
          'A validation notebook with synthetic tests (aliasing, leakage, two-tone resolution)',
          'Measurements of harmonic spectra for three sources and a short interpretation of their timbre',
          'A Q measurement of a wine glass by ring-down and by resonance width, with agreement discussed',
        ],
        estimatedHours: 8,
        stretchGoals: [
          'Implement a chirp and matched-filter pulse compression and show the range resolution improvement',
          'Add a Doppler speed estimator for a passing vehicle',
        ],
      },
    },
    {
      slug: 'electromagnetic-waves-and-geometric-optics',
      title: 'Electromagnetic Waves and Geometric Optics',
      description:
        'Light as an electromagnetic wave, then light as rays: plane waves and energy flow from Maxwell\'s equations, reflection and refraction from Fermat\'s principle, lenses and mirrors, and the instruments built from them.',
      lessons: [
        {
          slug: 'electromagnetic-plane-waves-and-the-poynting-vector',
          title: 'Electromagnetic plane waves and the Poynting vector',
          summary:
            'From Maxwell\'s equations in vacuum to the wave equation at speed c, the transverse plane-wave solution, and the energy and momentum light carries.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the vacuum wave equation for $\\mathbf{E}$ and $\\mathbf{B}$ from Maxwell\'s equations and identify $c = 1/\\sqrt{\\mu_0\\epsilon_0}$',
            'Write the plane-wave solution and show $\\mathbf{E}$, $\\mathbf{B}$ and $\\mathbf{k}$ are mutually perpendicular with $E = cB$',
            'Compute the Poynting vector, intensity and radiation pressure of a plane wave',
            'Place the electromagnetic spectrum and the refractive index $n = \\sqrt{\\epsilon_r}$ in this framework',
          ],
          concepts: [
            'Maxwell\'s equations in vacuum',
            'Wave equation $\\nabla^2\\mathbf{E} = \\mu_0\\epsilon_0\\partial_t^2\\mathbf{E}$',
            'Plane wave $\\mathbf{E} = \\mathbf{E}_0\\cos(\\mathbf{k}\\cdot\\mathbf{r} - \\omega t)$',
            'Transversality and $\\mathbf{B} = \\hat{\\mathbf{k}}\\times\\mathbf{E}/c$',
            'Poynting vector $\\mathbf{S} = \\mathbf{E}\\times\\mathbf{B}/\\mu_0$; intensity $I = \\tfrac12 c\\epsilon_0 E_0^2$',
            'Radiation pressure $I/c$ (absorbed) or $2I/c$ (reflected)',
            'Waves in a dielectric: $v = c/n$, $n = \\sqrt{\\epsilon_r\\mu_r}$',
            'The electromagnetic spectrum',
          ],
          explanation: `In empty space Maxwell's equations are $\\nabla\\cdot\\mathbf{E} = 0$, $\\nabla\\cdot\\mathbf{B} = 0$, $\\nabla\\times\\mathbf{E} = -\\partial_t\\mathbf{B}$, $\\nabla\\times\\mathbf{B} = \\mu_0\\epsilon_0\\partial_t\\mathbf{E}$. Take the curl of the third, use the identity $\\nabla\\times(\\nabla\\times\\mathbf{E}) = \\nabla(\\nabla\\cdot\\mathbf{E}) - \\nabla^2\\mathbf{E}$ and the fourth equation, and you get
$$\\nabla^2\\mathbf{E} = \\mu_0\\epsilon_0\\frac{\\partial^2\\mathbf{E}}{\\partial t^2},$$
a wave equation with speed $c = 1/\\sqrt{\\mu_0\\epsilon_0} = 3.00\\times10^8$ m/s. Maxwell computed this number from electrical measurements, found it equal to the measured speed of light, and concluded that light is an electromagnetic wave. The same equation holds for $\\mathbf{B}$.

The **plane wave** $\\mathbf{E} = \\mathbf{E}_0\\cos(\\mathbf{k}\\cdot\\mathbf{r} - \\omega t)$ with $\\omega = ck$ solves it, but Maxwell's equations impose more. $\\nabla\\cdot\\mathbf{E} = 0$ gives $\\mathbf{k}\\cdot\\mathbf{E}_0 = 0$: the wave is **transverse**. Faraday's law gives $\\mathbf{B} = \\hat{\\mathbf{k}}\\times\\mathbf{E}/c$: the magnetic field is perpendicular to both, in phase, with magnitude $E/c$. The direction of $\\mathbf{E}_0$ is the **polarisation**, which module 6 develops.

Energy flows along $\\mathbf{k}$ at rate given by the **Poynting vector** $\\mathbf{S} = \\mathbf{E}\\times\\mathbf{B}/\\mu_0$. Its time average is the **intensity** $I = \\tfrac12 c\\epsilon_0 E_0^2$; the electric and magnetic energy densities are equal, each $\\tfrac14\\epsilon_0 E_0^2$ on average. Light also carries momentum $S/c^2$ per volume, so it exerts **radiation pressure** $I/c$ on an absorber and $2I/c$ on a mirror: tiny for sunlight (about 5 µPa) but enough to push a solar sail or to trap atoms with a laser.

In a linear dielectric replace $\\epsilon_0 \\to \\epsilon_r\\epsilon_0$: the speed drops to $v = c/n$ with **refractive index** $n = \\sqrt{\\epsilon_r}$ (for non-magnetic media), and the wavelength shrinks to $\\lambda/n$ while the frequency is unchanged. The frequency dependence of $\\epsilon_r$ is the dispersion of glass, and the resonance model of module 1 explains it, as the electromagnetism subject shows in detail. This lesson keeps to what optics needs; the full derivations of Maxwell's equations and of waves in matter live in electromagnetism, which is the canonical home. Read Feynman II-20 (or OpenStax ch. 16) and 8.03SC part II.`,
          resources: [
            {
              title: 'MIT 8.03SC — Part II: Electromagnetic Waves (lectures 13-16)',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-ii-electromagnetic-waves/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              primary: true,
            },
            {
              title: 'OpenStax University Physics Vol. 2 — Ch. 16: Electromagnetic Waves',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/16-1-maxwells-equations-and-electromagnetic-waves',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. II, Ch. 20: Solutions of Maxwell\'s Equations in Free Space',
              url: 'https://www.feynmanlectures.caltech.edu/II_20.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'PhET — Radiating Charge',
              url: 'https://phet.colorado.edu/en/simulations/radiating-charge',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
              note: 'Legacy simulation: wiggle a charge and watch the transverse wave propagate.',
            },
          ],
          exercises: [
            {
              slug: 'em-wave-equation-derivation',
              title: 'Derive the wave equation and the plane-wave constraints',
              prompt:
                'Derive the vacuum wave equations for $\\mathbf{E}$ and $\\mathbf{B}$ from Maxwell\'s equations. Substitute the plane wave $\\mathbf{E} = \\mathbf{E}_0 e^{i(\\mathbf{k}\\cdot\\mathbf{r} - \\omega t)}$ into all four equations and derive transversality, $\\mathbf{B} = \\hat{\\mathbf{k}}\\times\\mathbf{E}/c$, and $\\omega = ck$. Compute the Poynting vector and the energy densities and show $\\langle u_E\\rangle = \\langle u_B\\rangle$ and $\\langle S\\rangle = c\\langle u\\rangle$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'field-amplitudes-and-pressure',
              title: 'Field amplitudes and radiation pressure in practice',
              prompt:
                'Compute the electric and magnetic field amplitudes of (a) sunlight at Earth ($I = 1.36$ kW/m²), (b) a 5 mW laser pointer focused to a 10 µm spot, (c) a 1 PW laser focused to 1 µm². For (c) compare $E_0$ with the field binding the hydrogen electron. Compute the radiation pressure on a perfectly reflecting solar sail of 1000 m² at 1 AU and the resulting acceleration for a 100 kg spacecraft; how long to reach 1 km/s?',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'fdtd-1d-em',
              title: 'A one-dimensional FDTD electromagnetic simulation',
              prompt:
                'Implement the 1D Yee scheme: $E_z$ on integer grid points, $H_y$ on half-integer points, updated alternately from Faraday\'s and Ampère\'s laws. Launch a Gaussian pulse from a source point and show it splits into two pulses travelling at $c$ (in grid units with Courant number 1). Add a dielectric slab with $\\epsilon_r = 4$ in half the domain and measure the reflected and transmitted amplitudes; compare with $r = (1 - n)/(1 + n)$ and $\\tau = 2/(1 + n)$. Verify the wave slows to $c/2$ inside the slab.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must an electromagnetic plane wave in vacuum be transverse?',
              answerOutline:
                'Gauss\'s law with no charge gives div E = 0, which for a plane wave means k dot E = 0; similarly for B.',
            },
            {
              question: 'What is the relation between E and B in a plane wave, and in which direction does energy flow?',
              answerOutline:
                'B = (k-hat x E)/c, in phase, perpendicular; energy flows along S = E x B / mu_0, i.e. along k.',
            },
            {
              question: 'What changes and what stays the same when light enters glass?',
              answerOutline:
                'Frequency is unchanged; speed drops to c/n and wavelength to lambda/n; the fields\' amplitudes change by the Fresnel coefficients.',
            },
          ],
          relatedLessons: ['electromagnetism/maxwells-equations-and-waves/electromagnetic-waves-in-vacuum-and-matter'],
        },
        {
          slug: 'reflection-refraction-and-fermats-principle',
          title: 'Reflection, refraction and Fermat\'s principle',
          summary:
            'The laws of reflection and refraction derived three ways (wavefronts, boundary conditions, least time), total internal reflection, and dispersion in prisms and rainbows.',
          estimatedMinutes: 120,
          objectives: [
            'Derive Snell\'s law from the continuity of the wave phase along a boundary (Huygens construction)',
            'Derive both laws from Fermat\'s principle of least time and explain what "least" means',
            'Compute the critical angle, explain total internal reflection and the evanescent wave, and apply it to fibres',
            'Explain prism dispersion and the primary rainbow angle quantitatively',
          ],
          concepts: [
            'Law of reflection; Snell\'s law $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$',
            'Huygens wavefront construction',
            'Phase matching along the boundary: $k_{1x} = k_{2x}$',
            'Fermat\'s principle: stationary optical path length $\\int n\\,ds$',
            'Total internal reflection; critical angle $\\sin\\theta_c = n_2/n_1$',
            'Evanescent wave and frustrated TIR',
            'Dispersion $n(\\lambda)$; prism deviation',
            'Rainbow: minimum deviation at $42°$',
          ],
          explanation: `When a plane wave hits a flat boundary between media of indices $n_1$ and $n_2$, the reflected and transmitted waves must match the incident wave's phase at every point of the boundary at every time. This requires equal frequency and equal tangential wavevector, $k_1\\sin\\theta_1 = k_2\\sin\\theta_2$; with $k = n\\omega/c$ that is **Snell's law** $n_1\\sin\\theta_1 = n_2\\sin\\theta_2$, and for the reflected wave (same medium) the angle of reflection equals the angle of incidence. Huygens' construction, drawing secondary wavelets from each point of the boundary, is the geometric version of the same phase-matching argument.

**Fermat's principle** says light takes the path for which the optical path length $\\int n\\,ds$ (proportional to travel time) is stationary. Write the time for a path through a point on the boundary, differentiate, and both laws drop out. "Least" is a misnomer, as with least action: for reflection in a concave mirror the stationary path can be a maximum. Feynman's chapter on least time is the best explanation of why a wave would obey such a principle: neighbouring paths have nearly equal phase only near the stationary one, so only there do contributions add rather than cancel. This is the eikonal limit of wave optics and the optical twin of the Hamilton-Jacobi equation.

Going from high to low index, Snell's law has no solution when $\\sin\\theta_1 > n_2/n_1$: **total internal reflection**. The transmitted field does not vanish but becomes an **evanescent wave**, decaying exponentially into the second medium over about a wavelength and carrying no energy away; bring a third medium within that distance and light tunnels across (frustrated TIR, the optical analogue of quantum tunnelling and the principle of fingerprint scanners). TIR confines light in optical fibres and makes prisms into mirrors.

Because $n$ depends on wavelength (normal dispersion: $n$ larger for blue), a prism spreads white light, and a water drop makes a rainbow: light refracts in, reflects once, refracts out, and the deviation has a *minimum* near $138°$ (viewing angle $42°$) where rays pile up; the minimum shifts with $n(\\lambda)$, giving the colours, with red outside. Read OpenStax vol. 3 ch. 1 and Feynman I-26; the PhET bending-light simulation is ideal for the critical angle and the evanescent region.`,
          resources: [
            {
              title: 'OpenStax University Physics Vol. 3 — Ch. 1: The Nature of Light',
              url: 'https://openstax.org/books/university-physics-volume-3/pages/1-1-the-propagation-of-light',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 26: Optics: The Principle of Least Time',
              url: 'https://www.feynmanlectures.caltech.edu/I_26.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'PhET — Bending Light',
              url: 'https://phet.colorado.edu/en/simulations/bending-light',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
            {
              title: 'HyperPhysics — Refraction of light',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/geoopt/refr.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
          ],
          exercises: [
            {
              slug: 'snell-three-ways',
              title: 'Derive Snell\'s law three ways',
              prompt:
                'Derive the law of reflection and Snell\'s law (a) from phase matching of plane waves along the boundary, (b) from Huygens\' construction with a diagram, (c) from Fermat\'s principle by minimising the travel time of a two-segment path. Then use Fermat\'s principle to derive the path of a ray in a medium with $n(y)$ varying continuously (the ray equation $n\\sin\\theta = $ const) and apply it to a mirage: a road surface where $n$ increases with height.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rainbow-angle',
              title: 'Compute the rainbow',
              prompt:
                'For a ray entering a spherical drop at impact parameter $b$ (angle of incidence $\\sin i = b/R$), derive the total deviation after one internal reflection, $D = 180° + 2i - 4r$ with $\\sin i = n\\sin r$. Plot $D(i)$ for $n = 1.333$ and find the minimum (expect $D = 137.6°$, so a rainbow at $42.4°$). Repeat for $n = 1.331$ (red) and $1.343$ (violet) to get the angular width of the bow, and for two internal reflections to find the secondary bow and show its colours are reversed. Explain why the sky is brighter inside the primary bow.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'fibre-and-evanescent',
              title: 'Optical fibre acceptance and the evanescent wave',
              prompt:
                'A step-index fibre has core $n_1 = 1.48$ and cladding $n_2 = 1.46$. Find the critical angle, the maximum acceptance angle from air (numerical aperture), and the maximum spread in arrival times per km of pulse energy entering at different angles (modal dispersion); explain why single-mode fibres exist. Then, for TIR at a glass-air interface at $45°$, compute the 1/e decay length of the evanescent wave for 600 nm light using $\\kappa = k_0\\sqrt{n_1^2\\sin^2\\theta_1 - n_2^2}$.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the tangential component of the wavevector conserved across a boundary?',
              answerOutline:
                'The incident, reflected and transmitted waves must stay in phase with one another at every point along the boundary for all time; equal phase variation along the surface means equal tangential k.',
            },
            {
              question: 'Does light really take the path of least time? What is the wave explanation?',
              answerOutline:
                'The path is stationary, not necessarily least; only near a stationary path do neighbouring paths have nearly equal phase and add constructively, elsewhere they cancel.',
            },
            {
              question: 'Does total internal reflection mean no field exists in the second medium?',
              answerOutline:
                'No: an evanescent wave penetrates about a wavelength with exponentially decaying amplitude and no net energy flow; a nearby third medium can couple to it (frustrated TIR).',
            },
          ],
        },
        {
          slug: 'lenses-mirrors-and-ray-matrices',
          title: 'Lenses, mirrors and ray matrices',
          summary:
            'Image formation in the paraxial approximation: the thin-lens and mirror equations, real and virtual images, and the ABCD matrix method for systems of elements.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the thin-lens equation and the lensmaker\'s formula from refraction at spherical surfaces in the paraxial limit',
            'Locate images by ray tracing and by the lens/mirror equation, with correct sign conventions, for converging and diverging elements',
            'Represent any paraxial element as a 2x2 ABCD matrix and multiply matrices to analyse a compound system',
            'Write a numerical ray tracer and use it to check the paraxial predictions and reveal spherical aberration',
          ],
          concepts: [
            'Paraxial approximation',
            'Refraction at a spherical surface: $n_1/s + n_2/s\' = (n_2 - n_1)/R$',
            'Lensmaker\'s formula; thin-lens equation $1/s + 1/s\' = 1/f$',
            'Sign conventions; real vs virtual; magnification $m = -s\'/s$',
            'Spherical mirrors $f = R/2$',
            'ABCD ray-transfer matrices for translation, refraction, thin lens, mirror',
            'Principal planes of a thick system',
            'Spherical aberration as the failure of the paraxial limit',
          ],
          explanation: `Geometric optics treats light as rays obeying the laws of reflection and refraction; it is valid when everything is much larger than the wavelength. The **paraxial approximation** goes further: rays close to the axis and at small angles, so $\\sin\\theta \\approx \\tan\\theta \\approx \\theta$. In that limit a spherical surface of radius $R$ between media $n_1$ and $n_2$ images an object at distance $s$ to an image at $s'$ with $\\frac{n_1}{s} + \\frac{n_2}{s'} = \\frac{n_2 - n_1}{R}$. Apply this twice for a thin lens in air and you get the **lensmaker's formula** $\\frac1f = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)$ and the **thin-lens equation**
$$\\frac1s + \\frac1{s'} = \\frac1f, \\qquad m = -\\frac{s'}{s}.$$
Spherical mirrors obey the same equation with $f = R/2$. Everything hinges on **sign conventions** (real objects and images positive on their proper sides; a negative $s'$ is a virtual image on the same side as the object); choose a convention and never deviate. The three principal rays (parallel then through the focus, through the centre undeviated, through the focus then parallel) locate any image graphically and are the sanity check for the algebra.

For systems of several elements the matrix method replaces chains of lens equations. A paraxial ray is a column vector $(y, \\theta)$ of height and angle; each element is a $2\\times2$ **ABCD matrix**: translation by $d$ is $\\begin{pmatrix}1 & d\\\\0 & 1\\end{pmatrix}$, a thin lens is $\\begin{pmatrix}1 & 0\\\\-1/f & 1\\end{pmatrix}$, refraction at a surface and mirrors have their own. Multiply the matrices in order (right to left) and the system matrix gives the effective focal length ($-1/C$), the principal planes, and the imaging condition ($B = 0$). The same matrices propagate Gaussian laser beams (the complex $q$ parameter), which is how resonators and beam optics are designed.

Outside the paraxial limit, rays through the edge of a spherical lens focus closer than central rays: **spherical aberration**. A numerical ray tracer applying exact Snell's law at each surface shows it directly, and it is the first thing a lens designer fights. Read OpenStax vol. 3 ch. 2 and 8.03SC part III; the PhET geometric optics simulation is a good check of your ray diagrams.`,
          resources: [
            {
              title: 'OpenStax University Physics Vol. 3 — Ch. 2: Geometric Optics and Image Formation',
              url: 'https://openstax.org/books/university-physics-volume-3/pages/2-1-images-formed-by-plane-mirrors',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'MIT 8.03SC — Part III: Optics',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-iii-optics/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'Tatum — Geometric Optics (open textbook)',
              url: 'https://phys.libretexts.org/Bookshelves/Optics/Geometric_Optics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts Physics',
              note: 'Careful treatment of sign conventions, thick lenses and the matrix method.',
            },
            {
              title: 'PhET — Geometric Optics',
              url: 'https://phet.colorado.edu/en/simulations/geometric-optics',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
            },
          ],
          exercises: [
            {
              slug: 'thin-lens-derivation',
              title: 'Derive the thin-lens equation and lensmaker\'s formula',
              prompt:
                'Derive the paraxial refraction formula for a single spherical surface from Snell\'s law and small-angle geometry. Apply it to the two surfaces of a thin lens in air to get the lensmaker\'s formula and the thin-lens equation. Then derive the ABCD matrices for translation, refraction at a spherical surface and a thin lens, and show that the matrix product for a thin lens between two translations reproduces the imaging condition and magnification.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'abcd-system-design',
              title: 'Design with ray matrices',
              prompt:
                'Write Python functions returning ABCD matrices for the basic elements. Use them to (a) find the effective focal length and principal planes of a thick biconvex lens ($n = 1.5$, $R_1 = -R_2 = 50$ mm, thickness 10 mm) and compare with the thin-lens prediction; (b) design a two-lens telescope with angular magnification 10 and show the system matrix has $C = 0$ (afocal); (c) find the image of an object 30 cm in front of a two-lens system and verify by tracing three rays through it graphically.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'exact-ray-tracer',
              title: 'An exact ray tracer and spherical aberration',
              prompt:
                'Write a 2D ray tracer that propagates rays through spherical surfaces using exact Snell\'s law (vector form) and ray-sphere intersections. Trace a fan of parallel rays at heights 0 to 20 mm through a plano-convex lens of $f = 100$ mm (both orientations), and plot the rays near focus. Measure the longitudinal spherical aberration (focus shift of the edge ray) and show which orientation is better and why. Then plot the spot diagram at the paraxial focus.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the paraxial approximation assume, and what is its first failure called?',
              answerOutline:
                'Small angles and small heights so sin and tan equal the angle; its first failure is spherical aberration, where marginal rays focus at a different point from paraxial ones.',
            },
            {
              question: 'What is a virtual image and how do you recognise it in the lens equation?',
              answerOutline:
                'An image from which rays appear to diverge but do not actually pass; it gives a negative image distance (same side as the object for a lens) and cannot be projected on a screen.',
            },
            {
              question: 'What do the elements of the system ABCD matrix tell you?',
              answerOutline:
                'C = -1/f_eff; B = 0 is the imaging condition with A the magnification; C = 0 means an afocal (telescopic) system with angular magnification D.',
            },
          ],
        },
        {
          slug: 'optical-instruments-and-aberrations',
          title: 'Optical instruments, the eye and aberrations',
          summary:
            'Putting lenses to work: the eye and its corrections, the magnifier, microscope and telescope, the apertures that set brightness, and the aberrations that limit real designs.',
          estimatedMinutes: 90,
          objectives: [
            'Model the eye as a lens-screen system and compute the corrective lens for myopia and hyperopia',
            'Derive the magnifying power of a simple magnifier, a compound microscope and a refracting telescope',
            'Explain f-number, aperture stop, entrance pupil, depth of field and the light-gathering power of a telescope',
            'Describe the five Seidel aberrations and chromatic aberration and how each is corrected',
          ],
          concepts: [
            'Near point (25 cm) and far point; accommodation',
            'Myopia and hyperopia corrections in dioptres',
            'Simple magnifier $M = 25\\,\\text{cm}/f$',
            'Microscope $M = -(L/f_o)(25/f_e)$',
            'Telescope angular magnification $f_o/f_e$',
            'Aperture stop, f-number, exposure, depth of field',
            'Seidel aberrations: spherical, coma, astigmatism, field curvature, distortion',
            'Chromatic aberration and the achromatic doublet',
          ],
          explanation: `The **eye** is a converging lens of variable power (cornea plus crystalline lens, about 60 dioptres total) forming a real inverted image on the retina, roughly 1.7 cm behind. Accommodation changes the lens power to focus objects from the **near point** (about 25 cm for a young adult) to infinity. In **myopia** the far point is finite because the eye is too long; a diverging spectacle lens with $f$ equal to minus the far-point distance fixes it. In **hyperopia** the near point is too far and a converging lens helps. Lens powers in dioptres ($1/f$ in metres) add, which is why opticians use them.

Instruments extend the eye. A **simple magnifier** lets you bring an object closer than the near point by forming a virtual image at infinity: angular magnification $M = 25\\,\\text{cm}/f$. A **compound microscope** uses an objective of short focal length to form a real, magnified intermediate image at the tube length $L$, which an eyepiece then magnifies again: $M = -(L/f_o)(25\\,\\text{cm}/f_e)$. A **refracting telescope** has objective and eyepiece sharing a focal plane; the angular magnification is $f_o/f_e$, and the image is inverted unless an erecting system is added. Reflectors replace the objective with a mirror, which is free of chromatic aberration and can be made enormous.

Magnification is only half of an instrument's performance. The **aperture stop** limits the bundle of rays; its image seen from the object side is the **entrance pupil**. For a camera the **f-number** $N = f/D$ sets the image irradiance ($\\propto 1/N^2$) and the **depth of field**; for a telescope the light-gathering power scales with $D^2$ and, as module 6 shows, so does the resolution limit $1.22\\lambda/D$. A large aperture is the reason to build a large telescope; magnification is cheap.

Real lenses deviate from the paraxial ideal. The five monochromatic **Seidel aberrations** are spherical aberration (focus varies with ray height), coma (magnification varies with ray height, giving comet-shaped off-axis images), astigmatism (different foci in two planes for off-axis points), field curvature (a flat object images onto a curved surface), and distortion (magnification varies with field, giving barrel or pincushion). **Chromatic aberration** comes from $n(\\lambda)$ and is corrected with an **achromatic doublet** of crown and flint glass whose dispersions cancel at two wavelengths. Designers trade these off by combining several elements, aspherics and stops, and your ray tracer from the previous lesson can show each one. Read OpenStax vol. 3 ch. 2.5-2.9 and Tatum's chapters on instruments.`,
          resources: [
            {
              title: 'OpenStax University Physics Vol. 3 — 2.5-2.9: The Eye, The Camera, The Simple Magnifier, Microscopes and Telescopes',
              url: 'https://openstax.org/books/university-physics-volume-3/pages/2-1-images-formed-by-plane-mirrors',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'Tatum — Geometric Optics (open textbook): optical instruments and aberrations',
              url: 'https://phys.libretexts.org/Bookshelves/Optics/Geometric_Optics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts Physics',
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 27: Geometrical Optics',
              url: 'https://www.feynmanlectures.caltech.edu/I_27.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Includes the resolving power argument and a clear discussion of aberrations.',
            },
          ],
          exercises: [
            {
              slug: 'eye-corrections',
              title: 'Prescribe spectacle lenses',
              prompt:
                'A person has a far point of 50 cm and a near point of 15 cm. Find the spectacle lens (in dioptres, worn at the eye) that moves the far point to infinity, and the new near point with that lens. A second person\'s near point is 100 cm; find the reading lens that gives a near point of 25 cm. Then model the eye as a single lens 17 mm from the retina and compute the required lens power for objects at infinity and at 25 cm; the difference is the accommodation in dioptres.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'instrument-magnifications',
              title: 'Derive instrument magnifications and build one in the ray tracer',
              prompt:
                'Derive the angular magnification of a simple magnifier (image at infinity and at the near point), a compound microscope and an astronomical telescope. Then model a telescope with $f_o = 500$ mm, $f_e = 25$ mm in your ABCD code: show the system is afocal with angular magnification 20, locate the exit pupil for a 50 mm objective aperture, and explain why the exit pupil diameter (2.5 mm) should match the eye\'s pupil.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'aberrations-in-ray-tracer',
              title: 'Produce the Seidel aberrations numerically',
              prompt:
                'Using your exact ray tracer, trace a fan of rays from an off-axis point source through a single lens and plot the image spot: identify coma. Trace fans in the tangential and sagittal planes and show they focus at different distances (astigmatism). Trace rays from several field heights and plot the locus of best focus (field curvature). Finally, trace a square grid of object points through a lens with a stop in front and behind it and show barrel vs pincushion distortion.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a myopic eye need a diverging lens?',
              answerOutline:
                'The eye focuses parallel rays in front of the retina; a diverging lens makes distant objects appear at the eye\'s far point, where the unaided eye can focus them.',
            },
            {
              question: 'What limits a telescope\'s usefulness more fundamentally, magnification or aperture, and why?',
              answerOutline:
                'Aperture: it sets both light-gathering power (D^2) and diffraction-limited resolution (1.22 lambda/D); magnification beyond what the resolution supports adds no detail.',
            },
            {
              question: 'How does an achromatic doublet reduce chromatic aberration?',
              answerOutline:
                'A converging crown-glass lens is paired with a weaker diverging flint-glass lens of higher dispersion so the chromatic focal shifts cancel at two chosen wavelengths while net power remains positive.',
            },
          ],
        },
      ],
    },
    {
      slug: 'interference-diffraction-and-polarisation',
      title: 'Interference, Diffraction and Polarisation',
      description:
        'The wave nature of light made visible: two-beam and multiple-beam interference, diffraction from slits and apertures, the resolution limit, and the vector character of light.',
      lessons: [
        {
          slug: 'two-source-interference-and-thin-films',
          title: 'Two-source interference and thin films',
          summary:
            'Young\'s double slit as the paradigm of interference, the role of coherence, and the interference of reflections from thin films from soap bubbles to anti-reflection coatings.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the double-slit intensity pattern $I = 4I_0\\cos^2(\\pi d\\sin\\theta/\\lambda)$ from the superposition of two phasors',
            'Explain temporal and spatial coherence and why ordinary light sources need a single slit or a laser',
            'Compute thin-film interference conditions including the phase change on reflection from a denser medium',
            'Apply the results to Newton\'s rings, anti-reflection coatings and the Michelson interferometer',
          ],
          concepts: [
            'Path difference $d\\sin\\theta$ and phase difference $2\\pi d\\sin\\theta/\\lambda$',
            'Phasor addition of two waves',
            'Fringe spacing $\\lambda L/d$',
            'Coherence time and length; spatial coherence',
            'Phase change $\\pi$ on reflection from higher index',
            'Thin film: $2nt\\cos\\theta_t = m\\lambda$ or $(m + \\tfrac12)\\lambda$',
            'Newton\'s rings; anti-reflection coating thickness $\\lambda/4n$',
            'Michelson interferometer; fringe counting',
          ],
          explanation: `Light from two coherent sources (two slits illuminated by one wave) arrives at a distant point with a **path difference** $d\\sin\\theta$ and hence a phase difference $\\delta = 2\\pi d\\sin\\theta/\\lambda$. The fields add as phasors: amplitude $|1 + e^{i\\delta}| = 2|\\cos(\\delta/2)|$, so the intensity is
$$I(\\theta) = 4I_0\\cos^2\\left(\\frac{\\pi d\\sin\\theta}{\\lambda}\\right),$$
bright where the path difference is an integer number of wavelengths. On a screen at distance $L$ the fringes are spaced $\\lambda L/d$ apart, which is how Young measured the wavelength of light in 1801 and how you will measure a laser in the capstone. Intensities do not add; amplitudes do. That is the whole content of interference, and it is why the energy at a bright fringe ($4I_0$) is paid for by the dark ones.

Interference requires **coherence**: a fixed phase relation between the two waves over the observation time. A thermal source emits wave trains of finite length (the **coherence length** $c\\tau_c \\sim \\lambda^2/\\Delta\\lambda$, a fraction of a millimetre for white light, metres for a laser) with random phases between trains, so path differences larger than the coherence length show no fringes. An extended source also has limited **spatial coherence**: different points of it produce displaced fringe patterns that wash out unless the source is small, which is why Young used a pinhole first and why a laser (both temporally and spatially coherent) makes everything easy.

**Thin films** interfere light reflected from their two surfaces. The path difference inside a film of thickness $t$ and index $n$ is $2nt\\cos\\theta_t$, and reflection from a medium of higher index adds a phase change of $\\pi$ (the inverted pulse of the string lesson). A soap film in air has one such phase change, so it reflects strongly when $2nt = (m + \\tfrac12)\\lambda$ and goes black as it thins to nothing; the colours of films and oil slicks are this condition read in wavelength. An **anti-reflection coating** of index $\\sqrt{n_{\\text{glass}}}$ and thickness $\\lambda/4n$ has two equal reflections exactly out of phase, the quarter-wave matching layer again. **Newton's rings** between a lens and a flat let you measure a curvature to a fraction of a wavelength, and the **Michelson interferometer** turns fringe counting into length measurement, the basis of the Michelson-Morley experiment and of LIGO. Read OpenStax vol. 3 ch. 3 and Feynman I-29; the PhET wave-interference simulation shows the two-source pattern forming.`,
          resources: [
            {
              title: 'OpenStax University Physics Vol. 3 — Ch. 3: Interference',
              url: 'https://openstax.org/books/university-physics-volume-3/pages/3-1-youngs-double-slit-interference',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 29: Interference',
              url: 'https://www.feynmanlectures.caltech.edu/I_29.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'MIT 8.03SC — Part III: Optics (interference lectures)',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-iii-optics/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
            {
              title: 'PhET — Wave Interference',
              url: 'https://phet.colorado.edu/en/simulations/wave-interference',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado Boulder)',
              note: 'Water, sound and light tabs; the light tab with two slits reproduces Young\'s experiment.',
            },
          ],
          exercises: [
            {
              slug: 'double-slit-derivation-and-sim',
              title: 'Double-slit pattern: derivation and 2D simulation',
              prompt:
                'Derive the double-slit intensity by phasor addition, including the small-angle fringe spacing. Then compute the pattern numerically on a 2D grid by summing the fields of two point sources $e^{ikr_1}/\\sqrt{r_1} + e^{ikr_2}/\\sqrt{r_2}$ and plot the intensity; show it approaches the $\\cos^2$ formula far from the slits. Add a random phase between the sources that changes every "coherence time" and average over many realisations to show the fringes disappear.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'thin-film-problems',
              title: 'Thin films: soap, coatings and Newton\'s rings',
              prompt:
                '(a) A soap film ($n = 1.33$) appears green (550 nm) in reflection at normal incidence; find its three smallest possible thicknesses. (b) Design a single-layer anti-reflection coating on glass ($n = 1.52$) for 550 nm: ideal index and thickness; compute the residual reflectance at 450 and 650 nm with MgF$_2$ ($n = 1.38$) using the full two-surface phasor sum. (c) Newton\'s rings with a lens of radius of curvature $R$ on a flat: derive $r_m = \\sqrt{m\\lambda R}$ for dark rings and find $R$ if the 10th dark ring has radius 3.0 mm at 589 nm.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'coherence-length-measurement',
              title: 'Coherence length and the Michelson interferometer',
              prompt:
                'Simulate a Michelson interferometer illuminated by a source with a Gaussian spectrum centred at 600 nm with width $\\Delta\\lambda$: compute the fringe visibility as a function of path difference by integrating the two-beam interference over the spectrum, and show it falls off over the coherence length $\\lambda^2/\\Delta\\lambda$. Do it for $\\Delta\\lambda = 100$ nm (white light), 1 nm (a spectral lamp) and 0.001 nm (a laser). Explain how this is used to measure spectra (Fourier-transform spectroscopy).',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where does the energy go at a dark fringe?',
              answerOutline:
                'It is redistributed to the bright fringes; the average intensity over the pattern is still 2 I_0, and bright fringes reach 4 I_0.',
            },
            {
              question: 'Why does white light show only a few coloured fringes in a double-slit experiment?',
              answerOutline:
                'The fringe spacing depends on wavelength, so the colours overlap and wash out after a few orders; equivalently the coherence length of white light is only a few wavelengths.',
            },
            {
              question: 'Why is the centre of a Newton\'s-rings pattern dark in reflection?',
              answerOutline:
                'At zero air-gap thickness the only phase difference is the pi shift at the glass surface reflection, so the two reflected waves cancel.',
            },
          ],
        },
        {
          slug: 'multiple-slits-and-diffraction-gratings',
          title: 'Multiple slits and diffraction gratings',
          summary:
            'N slits give sharp principal maxima with N-2 secondary ones between; the grating equation, resolving power, and the grating as the heart of spectroscopy.',
          estimatedMinutes: 90,
          objectives: [
            'Derive the N-slit intensity $I = I_0\\sin^2(N\\delta/2)/\\sin^2(\\delta/2)$ by summing a geometric series of phasors',
            'Explain why principal maxima sharpen as $N$ grows and locate the secondary maxima and zeros',
            'Use the grating equation to compute diffraction angles and the dispersion of a spectrometer',
            'Compute the resolving power $R = mN$ and apply it to resolving spectral lines',
          ],
          concepts: [
            'Geometric series of phasors $\\sum e^{in\\delta}$',
            'N-slit interference function',
            'Principal maxima at $d\\sin\\theta = m\\lambda$',
            'Width of principal maxima $\\propto 1/N$; $N - 2$ secondary maxima',
            'Grating equation and orders',
            'Angular dispersion $d\\theta/d\\lambda = m/(d\\cos\\theta)$',
            'Resolving power $\\lambda/\\Delta\\lambda = mN$',
            'Reflection gratings, blazing, CD/DVD as gratings',
          ],
          explanation: `Replace two slits by $N$ equally spaced slits. The phasors of successive slits differ by the same phase $\\delta = 2\\pi d\\sin\\theta/\\lambda$, so the total amplitude is a geometric series, $\\sum_{n=0}^{N-1}e^{in\\delta} = \\frac{1 - e^{iN\\delta}}{1 - e^{i\\delta}}$, with squared modulus
$$I(\\theta) = I_0\\frac{\\sin^2(N\\delta/2)}{\\sin^2(\\delta/2)}.$$
Whenever $\\delta = 2\\pi m$, all $N$ phasors align and the intensity is $N^2I_0$: these are the **principal maxima**, at exactly the double-slit positions $d\\sin\\theta = m\\lambda$, the **grating equation**. Between two principal maxima the numerator vanishes $N - 1$ times, giving $N - 2$ weak **secondary maxima**. The crucial point is that the principal maxima have angular width $\\propto 1/N$: the more slits, the sharper the lines, because a small departure from $\\delta = 2\\pi m$ accumulates over $N$ slits until the phasors close into a polygon and cancel. Draw the phasor diagram; it makes the whole formula obvious.

A **diffraction grating** has thousands of lines per millimetre, so $N \\sim 10^4$-$10^5$ and the principal maxima are razor-sharp lines whose position depends on wavelength through the grating equation. That is a spectrometer. Its **angular dispersion** is $d\\theta/d\\lambda = m/(d\\cos\\theta)$, larger in higher orders and for finer gratings. Its **resolving power** follows from Rayleigh's criterion (next lesson applied to the line width): two wavelengths are just resolved when the principal maximum of one falls on the first zero of the other, giving $\\frac{\\lambda}{\\Delta\\lambda} = mN$. A 5 cm grating with 600 lines/mm in second order resolves $\\lambda/\\Delta\\lambda = 60{,}000$, enough to separate the sodium D lines (0.6 nm apart at 589 nm) a hundred times over. Reflection gratings, often **blazed** so most light goes into one chosen order, are what sit inside every astronomical spectrograph; the pits on a CD (1.6 µm pitch) or DVD (0.74 µm) make a serviceable reflection grating, which the capstone uses to measure your laser.

The single-slit envelope of each slit's own diffraction multiplies this pattern and can suppress some orders entirely (the "missing orders"), which the next lesson explains. Read OpenStax vol. 3 ch. 4.4-4.5 and Feynman I-30 (sections 30-1 to 30-3); the HyperPhysics grating pages are a quick reference.`,
          resources: [
            {
              title: 'OpenStax University Physics Vol. 3 — 4.4 Double-Slit Diffraction; 4.5 Diffraction Gratings',
              url: 'https://openstax.org/books/university-physics-volume-3/pages/4-1-single-slit-diffraction',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 30: Diffraction',
              url: 'https://www.feynmanlectures.caltech.edu/I_30.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'The phasor derivation of the N-slit formula and the resolving power argument.',
            },
            {
              title: 'HyperPhysics — Interference (diffraction grating pages)',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/interf.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
          ],
          exercises: [
            {
              slug: 'n-slit-derivation',
              title: 'Derive and plot the N-slit pattern',
              prompt:
                'Sum the geometric series of phasors to derive the N-slit intensity formula. Show that the principal maxima have height $N^2I_0$, that the first zero beside a principal maximum is at $\\Delta\\delta = 2\\pi/N$, and that there are $N - 2$ secondary maxima. Plot the pattern for $N = 2, 3, 5, 10, 50$ on the same axes (normalised to the peak) and draw the phasor polygon at a secondary maximum and at a zero for $N = 5$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'grating-spectrometer-design',
              title: 'Design a grating spectrometer',
              prompt:
                'A grating has 1200 lines/mm and is 25 mm wide, used in first order with a 500 mm focal-length camera lens and a detector with 10 µm pixels. Compute the diffraction angle for 500 and 600 nm, the linear dispersion in nm per pixel, the theoretical resolving power, and the resolution limit set by the pixels. Can it resolve the sodium D doublet? The H-alpha line from a star rotating at 100 km/s is Doppler-broadened by about 0.2 nm; can it measure that width? What changes in second order?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cd-dvd-grating',
              title: 'Measure a CD and a DVD as gratings',
              prompt:
                'Shine a laser pointer (nominal 650 nm or 532 nm) onto a CD and then a DVD at near-normal incidence and measure the angles of the first-order reflected spots on a wall or ceiling. Compute the track pitch from the grating equation and compare with the standard values (1.60 µm for CD, 0.74 µm for DVD). Then reverse the logic: assuming the standard pitch, measure the laser wavelength with an uncertainty estimate. This is a rehearsal for the capstone.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do the principal maxima become sharper as the number of slits increases?',
              answerOutline:
                'A small phase error per slit accumulates to a full turn of the phasor polygon after N slits, so cancellation occurs within an angular width proportional to 1/N.',
            },
            {
              question: 'What is the resolving power of a grating and what does it depend on?',
              answerOutline:
                'lambda/Delta lambda = m N: the order times the total number of illuminated lines; the groove spacing affects dispersion but not resolving power.',
            },
            {
              question: 'Why does a grating spectrum show missing orders?',
              answerOutline:
                'The single-slit diffraction envelope of each line has zeros; if a principal maximum falls on such a zero it is suppressed, e.g. when d/a is an integer.',
            },
          ],
        },
        {
          slug: 'single-slit-and-fraunhofer-diffraction',
          title: 'Single-slit and Fraunhofer diffraction',
          summary:
            'Diffraction as interference of a continuum of sources: the sinc pattern of a slit, the Fraunhofer pattern as a Fourier transform of the aperture, and the circular aperture\'s Airy disc.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the single-slit Fraunhofer pattern $I = I_0\\,\\text{sinc}^2(\\pi a\\sin\\theta/\\lambda)$ by integrating phasors across the slit',
            'Show that the Fraunhofer amplitude is the Fourier transform of the aperture function and use it for arbitrary apertures',
            'Combine single-slit and multi-slit factors to explain missing orders in a real grating',
            'Compute the Airy pattern of a circular aperture numerically and state the position of its first zero',
          ],
          concepts: [
            'Huygens-Fresnel: every aperture point is a source',
            'Far-field (Fraunhofer) condition $L \\gg a^2/\\lambda$',
            'Single slit: zeros at $a\\sin\\theta = m\\lambda$',
            'Fraunhofer pattern $=$ Fourier transform of the aperture',
            'Convolution theorem: grating = slit array convolved with slit shape',
            'Circular aperture: Airy pattern, first zero at $\\sin\\theta = 1.22\\lambda/D$',
            'Babinet\'s principle',
            'Numerical diffraction with the 2D FFT',
          ],
          explanation: `A single slit of width $a$ diffracts because, by the Huygens-Fresnel principle, every point across it radiates and the contributions interfere. In the **Fraunhofer** (far-field) limit, when the screen is far enough that the path from each point to the observation direction varies linearly across the aperture, the amplitude in direction $\\theta$ is $\\int_{-a/2}^{a/2}e^{ikx\\sin\\theta}dx$. Doing the integral gives
$$I(\\theta) = I_0\\left[\\frac{\\sin\\beta}{\\beta}\\right]^2, \\qquad \\beta = \\frac{\\pi a\\sin\\theta}{\\lambda},$$
with zeros at $a\\sin\\theta = m\\lambda$ ($m \\ne 0$). The central maximum has twice the width of the side lobes and holds about 90% of the light; narrower slits spread the light more. The phasor picture is a curling strip: at the first zero the phasors across the slit have wrapped once around a circle.

Look at that integral again: it is the **Fourier transform of the aperture function** $A(x)$ evaluated at spatial frequency $k\\sin\\theta$. This is the central theorem of Fraunhofer diffraction, valid for any aperture in one or two dimensions, and it explains everything in module 4 reappearing here: the rectangle gives the sinc; a grating is an array of delta functions (whose transform is the N-slit comb) convolved with a slit (whose transform is the sinc envelope), so by the convolution theorem the grating pattern is the product of the two, with **missing orders** where a principal maximum lands on a sinc zero. A lens placed after the aperture brings the far field to its focal plane, so an ordinary lens performs an optical Fourier transform, the basis of spatial filtering and of the image-formation theory of the microscope.

For a **circular aperture** of diameter $D$ the transform is a Bessel function and the pattern is the **Airy disc**, with first dark ring at $\\sin\\theta = 1.22\\lambda/D$. This number sets the resolution of every telescope, microscope and camera, as the next lesson develops. **Babinet's principle** says a complementary screen (an obstacle instead of a hole) gives the same diffraction pattern away from the forward direction, which is why a hair diffracts like a slit of the same width, a fact the capstone exploits.

Numerically, a 2D FFT of a sampled aperture gives its Fraunhofer pattern directly, and you should compute slits, double slits, gratings, circles, hexagons and a telescope aperture with a secondary-mirror obstruction. Read OpenStax vol. 3 ch. 4.1-4.3 and Feynman I-30; 8.03SC part III covers the same with the phasor pictures.`,
          resources: [
            {
              title: 'OpenStax University Physics Vol. 3 — Ch. 4: Diffraction (4.1-4.3)',
              url: 'https://openstax.org/books/university-physics-volume-3/pages/4-1-single-slit-diffraction',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 30: Diffraction',
              url: 'https://www.feynmanlectures.caltech.edu/I_30.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'Tatum — Physical Optics (open textbook)',
              url: 'https://phys.libretexts.org/Bookshelves/Optics/Physical_Optics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts Physics',
              note: 'Fraunhofer diffraction from various apertures with the Fourier viewpoint.',
            },
            {
              title: 'MIT 8.03SC — Part III: Optics (diffraction lectures)',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-iii-optics/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'single-slit-derivation',
              title: 'Derive the single-slit pattern and the Fourier theorem',
              prompt:
                'Derive the Fraunhofer single-slit intensity by integrating phasors across the slit, and show the condition for the Fraunhofer regime, $L \\gg a^2/\\lambda$, by expanding the exact path length to second order. Then show in general that the far-field amplitude is the Fourier transform of the aperture function, and use the convolution theorem to write the pattern of $N$ slits of width $a$ and spacing $d$ as the product of the sinc envelope and the N-slit comb. Find the condition for missing orders.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fft-diffraction-gallery',
              title: 'Diffraction patterns by 2D FFT',
              prompt:
                'Represent apertures as 1024x1024 binary arrays and compute their Fraunhofer patterns with numpy.fft.fft2 (with fftshift and a log colour scale). Produce and interpret the patterns of: a single slit, a double slit, a 10-slit grating, a square, a circle, a hexagon, an annulus (telescope with central obstruction), and a circle with four thin spider vanes. For the circle, extract a radial profile and confirm the first zero at 1.22 lambda/D in the appropriate units. Explain the diffraction spikes on star images.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'babinet-hair-measurement',
              title: 'Measure a hair with Babinet\'s principle',
              prompt:
                'Tape a human hair across a laser pointer beam and project the pattern on a wall 2-3 m away. Measure the spacing of the dark fringes, apply the single-slit zero condition to infer the hair diameter (expect 50-100 µm), and estimate the uncertainty. Explain, using Babinet\'s principle, why an obstacle produces the same fringe spacing as a slit of its width. Then digitise a photo of the pattern (any image library) and fit the intensity profile to sinc^2.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the central maximum of a single-slit pattern twice as wide as the others?',
              answerOutline:
                'Zeros are at a sin(theta) = m lambda for m = +/-1, +/-2, ...; the central lobe spans from m = -1 to +1, twice the spacing between successive zeros.',
            },
            {
              question: 'In what sense is a Fraunhofer diffraction pattern a Fourier transform?',
              answerOutline:
                'The far-field amplitude in direction theta is the integral of the aperture function times exp(i k x sin theta), i.e. its Fourier transform at spatial frequency k sin theta; intensity is its modulus squared.',
            },
            {
              question: 'What is the angular radius of the first dark ring of the Airy pattern, and why does it matter?',
              answerOutline:
                'sin(theta) = 1.22 lambda/D; it sets the diffraction-limited resolution of any circular-aperture instrument.',
            },
          ],
        },
        {
          slug: 'resolution-and-fresnel-diffraction',
          title: 'Resolution limits and Fresnel diffraction',
          summary:
            'What diffraction forbids: the Rayleigh criterion for telescopes, microscopes and the eye, Abbe\'s limit and how super-resolution evades it, and the near-field diffraction that precedes Fraunhofer.',
          estimatedMinutes: 120,
          objectives: [
            'Apply the Rayleigh criterion to compute the resolution of telescopes, cameras, the eye and microscopes',
            'Explain Abbe\'s diffraction limit for microscopy in terms of spatial frequencies and numerical aperture, and outline how super-resolution methods circumvent it',
            'Distinguish Fresnel from Fraunhofer diffraction by the Fresnel number and describe the near-field pattern of an edge and a circular aperture',
            'Simulate the transition from near field to far field numerically',
          ],
          concepts: [
            'Rayleigh criterion $\\theta_{\\min} = 1.22\\lambda/D$',
            'Resolution of telescopes, eye, cameras; pixel matching',
            'Abbe limit $d = \\lambda/2\\,\\text{NA}$; numerical aperture',
            'Spatial-frequency view of imaging',
            'Super-resolution: STED, PALM/STORM, structured illumination (qualitative)',
            'Fresnel number $N_F = a^2/\\lambda L$',
            'Fresnel zones; the Poisson/Arago spot',
            'Angular-spectrum propagation with FFT',
          ],
          explanation: `Every instrument with an aperture of diameter $D$ images a point as an Airy pattern of angular radius $1.22\\lambda/D$. **Rayleigh's criterion** declares two points resolved when the maximum of one falls on the first zero of the other, $\\theta_{\\min} = 1.22\\lambda/D$. For the eye ($D \\approx 3$ mm) this is about $1'$ of arc, matching the spacing of the cones; for a 10 m telescope at 500 nm it is $0.013''$, which atmospheric turbulence spoils to about $1''$ unless adaptive optics restores it; for a camera, matching pixel size to the Airy disc is why small-sensor phones cannot exploit very small f-numbers. Note that resolution improves with aperture, not with magnification: a telescope's useful magnification is limited to roughly $D$ in millimetres times two.

For a microscope, **Abbe** reformulated the limit in terms of spatial frequencies: a periodic object of spacing $d$ diffracts light into orders at $\\sin\\theta = \\lambda/d$, and the image reproduces the periodicity only if the objective collects at least the first order, giving $d_{\\min} = \\lambda/(2\\,\\text{NA})$ with numerical aperture $\\text{NA} = n\\sin\\theta_{\\max}$ (oil immersion raises $n$ to 1.5). That is about 200 nm for visible light. **Super-resolution** microscopy evades it by not forming a linear image: STED switches off fluorescence outside a sub-diffraction spot, PALM/STORM localise single molecules one at a time to a precision far below the Airy width, and structured illumination mixes spatial frequencies to pull unresolvable ones into the passband. The limit is real for a linear imaging system, but it is a limit on that system, not on knowledge.

The Fraunhofer formulas hold when the screen is far enough that $N_F = a^2/\\lambda L \\ll 1$ (the **Fresnel number**). Closer in, the quadratic phase across the aperture matters and you are in the **Fresnel** regime: a straight edge produces fringes on the bright side and a gradual fall-off into the shadow; a circular aperture is alternately bright and dark at its centre as $N_F$ passes through integers (counting Fresnel zones); and a circular obstacle has a bright spot at the centre of its shadow, the **Poisson-Arago spot**, whose prediction by Poisson was meant to refute the wave theory and whose observation by Arago confirmed it. Fresnel integrals handle the edge and the slit; numerically, the **angular-spectrum method** (FFT, multiply by the propagation phase $e^{ik_z z}$, inverse FFT) propagates any field any distance and shows the whole near-to-far transition. Read OpenStax vol. 3 ch. 4.6-4.7 and Feynman I-30 and I-27 (resolving power); Tatum's physical optics has the Fresnel integrals.`,
          resources: [
            {
              title: 'OpenStax University Physics Vol. 3 — 4.6 Circular Apertures and Resolution; 4.7 X-Ray Diffraction',
              url: 'https://openstax.org/books/university-physics-volume-3/pages/4-1-single-slit-diffraction',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 27 (section 27-7, resolving power) and Ch. 30',
              url: 'https://www.feynmanlectures.caltech.edu/I_27.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
            },
            {
              title: 'Tatum — Physical Optics (open textbook): Fresnel diffraction',
              url: 'https://phys.libretexts.org/Bookshelves/Optics/Physical_Optics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts Physics',
            },
            {
              title: 'MIT 8.03SC — Part III: Optics',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-iii-optics/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'resolution-estimates',
              title: 'Resolution of real instruments',
              prompt:
                'Compute the diffraction-limited angular resolution of: the human eye (3 mm pupil, 550 nm), a 10 cm amateur telescope, the 2.4 m Hubble mirror, the 6.5 m JWST at 2 µm, and a radio dish of 100 m at 21 cm. For each, give the smallest resolvable feature at a stated distance (e.g. craters on the Moon, a car on Mars). Explain why radio interferometers spanning continents are needed and what their effective D is. Then compute the Abbe limit for a 1.4 NA oil objective at 500 nm.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'angular-spectrum-propagation',
              title: 'Near-field to far-field by the angular-spectrum method',
              prompt:
                'Implement angular-spectrum propagation: FFT the aperture field, multiply by $\\exp(iz\\sqrt{k^2 - k_x^2 - k_y^2})$, inverse FFT. For a circular aperture of radius 0.5 mm at 633 nm, propagate to distances with Fresnel numbers 10, 4, 3, 2, 1, 0.5 and 0.1 and plot the on-axis intensity against distance and the transverse profiles; the centre should alternate bright/dark at integer $N_F$ and converge to the Airy pattern at small $N_F$. Then replace the aperture by an opaque disc and show the Poisson-Arago spot. Watch the sampling: the grid must resolve the propagation phase.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'two-point-resolution-sim',
              title: 'Simulate the Rayleigh criterion',
              prompt:
                'Generate the Airy pattern of a circular aperture numerically and add two such patterns (incoherent: add intensities) with separations of 1.5, 1.22, 1.0 and 0.8 times lambda/D. Plot the summed profiles and show the dip between the peaks vanishes near the Rayleigh separation (about 26% dip at exactly 1.22). Then add Poisson noise corresponding to 100, 10^4 and 10^6 photons and discuss whether the Rayleigh criterion is a hard limit when the noise is low (it is not; it is a convention).',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the Rayleigh criterion and explain why it is a convention rather than a law.',
              answerOutline:
                'Two points are "resolved" when separated by 1.22 lambda/D so one maximum sits on the other\'s first zero; with enough signal-to-noise closer pairs can be distinguished by fitting, so it marks a practical not absolute limit.',
            },
            {
              question: 'Why does oil immersion improve microscope resolution?',
              answerOutline:
                'It raises the numerical aperture n sin(theta) by increasing n, letting the objective collect higher diffraction orders (finer spatial frequencies), so the Abbe limit lambda/(2 NA) shrinks.',
            },
            {
              question: 'What distinguishes Fresnel from Fraunhofer diffraction?',
              answerOutline:
                'The Fresnel number a^2/(lambda L): when it is large the quadratic phase across the aperture matters (near field, Fresnel); when small the pattern is the Fourier transform of the aperture (far field, Fraunhofer).',
            },
          ],
        },
        {
          slug: 'polarisation-malus-law-and-birefringence',
          title: 'Polarisation, Malus\'s law and birefringence',
          summary:
            'The vector nature of light: linear, circular and elliptical states, polarisers and Malus\'s law, polarisation by reflection and scattering, and wave plates made from birefringent crystals.',
          estimatedMinutes: 120,
          objectives: [
            'Describe linear, circular and elliptical polarisation with Jones vectors and relate them to the phase between two orthogonal components',
            'Apply Malus\'s law and Jones matrices to chains of polarisers and wave plates, including the three-polariser paradox',
            'Derive Brewster\'s angle and explain polarisation by reflection and by Rayleigh scattering',
            'Explain birefringence, quarter- and half-wave plates, and optical activity, and use them in a measurement',
          ],
          concepts: [
            'Polarisation as the direction of $\\mathbf{E}$',
            'Jones vectors; circular = linear components with $\\pm\\pi/2$ phase',
            'Malus\'s law $I = I_0\\cos^2\\theta$',
            'Jones matrices for polariser, rotator, retarder',
            'Brewster\'s angle $\\tan\\theta_B = n_2/n_1$',
            'Polarisation by scattering; the blue sky',
            'Birefringence: ordinary and extraordinary indices; wave plates',
            'Optical activity; stress-induced birefringence; LCDs',
          ],
          explanation: `A plane wave's $\\mathbf{E}$ lies in the plane transverse to $\\mathbf{k}$, and how it moves in that plane is its **polarisation**. Decompose $\\mathbf{E}$ into $x$ and $y$ components with amplitudes and phases: in phase gives **linear** polarisation along some direction; equal amplitudes with a $\\pm\\pi/2$ phase give **circular**; anything else gives **elliptical**. The **Jones vector** $(E_x, E_y)$ of complex amplitudes captures all of this, and optical elements become $2\\times2$ **Jones matrices**. Natural light is unpolarised: a rapidly varying random mixture.

A **polariser** passes the component along its axis. Project the Jones vector and square: **Malus's law** $I = I_0\\cos^2\\theta$. Crossed polarisers pass nothing, yet a third polariser inserted between them at $45°$ lets through $I_0/8$: each projection rotates the field, and the "paradox" dissolves once you think in amplitudes rather than intensities. (The quantum version, with single photons, is the first lesson in measurement theory.)

Light becomes polarised on **reflection**. At **Brewster's angle** $\\tan\\theta_B = n_2/n_1$ the reflected and refracted rays are perpendicular; the p-polarised component (in the plane of incidence) cannot be re-radiated along the reflected direction by the dipoles it induces, so the reflected light is purely s-polarised. Polarising sunglasses block that horizontal glare. The same dipole argument explains why light **scattered** at $90°$ from the Sun is polarised, which bees and Vikings used for navigation, and why the sky is blue (Rayleigh scattering $\\propto \\omega^4$, from the resonance model of module 1 far below resonance).

**Birefringent** crystals (calcite, quartz) have different refractive indices for the two orthogonal polarisations, so a slab delays one component relative to the other. A **quarter-wave plate** introduces a $\\pi/2$ phase and turns linear light at $45°$ into circular; a **half-wave plate** rotates linear polarisation by twice the angle to its axis. Between crossed polarisers, a birefringent sample lights up in colours that depend on its retardation, which is how geologists identify minerals, how engineers see stress in transparent models, and how every LCD pixel works (a liquid crystal whose retardation is switched by a voltage). **Optically active** substances like sugar solutions rotate linear polarisation, the basis of the saccharimeter. Read OpenStax vol. 3 ch. 1.7 and Feynman I-33; the electromagnetism subject derives the Fresnel equations behind Brewster's angle. Then do the measurements: a polarising filter and a phone camera are enough.`,
          resources: [
            {
              title: 'The Feynman Lectures on Physics Vol. I, Ch. 33: Polarization',
              url: 'https://www.feynmanlectures.caltech.edu/I_33.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Caltech',
              note: 'Birefringence, polarisers, Brewster\'s angle, optical activity, and the scattering argument, all in one chapter.',
              primary: true,
            },
            {
              title: 'OpenStax University Physics Vol. 3 — 1.7 Polarization',
              url: 'https://openstax.org/books/university-physics-volume-3/pages/1-1-the-propagation-of-light',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'HyperPhysics — Polarization',
              url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/phyopt/polar.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Georgia State University',
            },
            {
              title: 'MIT 8.03SC — Part II: Electromagnetic waves (polarisation lecture)',
              url: 'https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-ii-electromagnetic-waves/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'jones-calculus',
              title: 'Jones calculus for polarisation chains',
              prompt:
                'Write the Jones matrices for a linear polariser at angle $\\theta$, a quarter-wave plate and a half-wave plate with fast axis at angle $\\theta$. Use them to (a) prove Malus\'s law, (b) compute the transmission of the three-polariser arrangement (0, 45, 90 degrees) and of $N$ polarisers equally spaced from 0 to 90 degrees, showing the transmission tends to 1 as $N \\to \\infty$, (c) show that a QWP at 45 degrees converts linear to circular and that a HWP rotates linear polarisation by $2\\theta$, (d) design an optical isolator from a polariser and a QWP and show light reflected back is blocked.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'brewster-derivation',
              title: 'Brewster\'s angle from the dipole picture and from Fresnel',
              prompt:
                'Show that at Brewster\'s angle the reflected and refracted rays are perpendicular, and use the dipole radiation pattern (no radiation along the dipole axis) to argue that the p-polarised reflection vanishes. Then, using the Fresnel coefficient for p-polarisation $r_p = \\frac{n_2\\cos\\theta_i - n_1\\cos\\theta_t}{n_2\\cos\\theta_i + n_1\\cos\\theta_t}$, show $r_p = 0$ exactly at $\\tan\\theta_B = n_2/n_1$. Plot $|r_s|^2$ and $|r_p|^2$ against angle for air-glass and compute the degree of polarisation of the reflected light at 45 degrees.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'polarisation-experiments',
              title: 'Polarisation measurements with a filter and a phone',
              prompt:
                'With a polarising filter (from sunglasses or a photographic filter) and a phone camera: (a) measure the brightness of a laptop screen through the filter at 0, 30, 60, 90 degrees and fit Malus\'s law (the screen is linearly polarised); (b) photograph a clear patch of sky 90 degrees from the Sun through the filter at several angles and estimate the degree of polarisation; (c) view a clear plastic ruler or CD case between the filter and a laptop screen and photograph the stress birefringence colours; (d) if you have a second filter, verify the three-polariser effect. Report each with a plot or image and a one-paragraph explanation.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does a quarter-wave plate turn linear into circular polarisation?',
              answerOutline:
                'Linear light at 45 degrees to the fast axis has equal components along fast and slow axes; the plate delays one by a quarter wave, giving a pi/2 phase difference, which is circular polarisation.',
            },
            {
              question: 'Why is reflected light at Brewster\'s angle completely s-polarised?',
              answerOutline:
                'The induced dipoles in the second medium oscillate along the refracted E; for p-polarisation at Brewster\'s angle that direction coincides with the reflected ray, and a dipole does not radiate along its axis.',
            },
            {
              question: 'Why does inserting a polariser at 45 degrees between crossed polarisers let light through?',
              answerOutline:
                'The middle polariser projects the field onto its axis, producing a component along the final polariser\'s axis; projections act on amplitudes, and cos^2(45) twice gives 1/4 of the light after the first polariser.',
            },
          ],
        },
      ],
      project: {
        slug: 'diffraction-toolkit',
        title: 'Module project: a scalar diffraction toolkit',
        description: `Write a Python package for scalar diffraction: Fraunhofer patterns by FFT, Fresnel/near-field propagation by the angular-spectrum method, polychromatic patterns by summing over a spectrum, and Jones-calculus polarisation elements. Validate it against the analytic sinc, N-slit and Airy formulas, reproduce the Poisson-Arago spot and the Talbot carpet behind a grating, and use it to design a diffractive element (a Fresnel zone plate) that focuses light.`,
        deliverables: [
          'Functions fraunhofer(aperture, wavelength), propagate(field, distance, wavelength) and jones elements, with docstrings and unit tests against analytic results',
          'A gallery notebook: slits, gratings with missing orders, Airy disc, Fresnel edge, Poisson spot, Talbot carpet',
          'A zone-plate design with simulated focal spot and a comparison of its focal length with the formula f = r_1^2 / lambda',
          'A short report on sampling requirements and aliasing in the angular-spectrum method',
        ],
        estimatedHours: 10,
        stretchGoals: [
          'Add a lens (quadratic phase) and simulate 4f spatial filtering: remove the high frequencies from an image',
          'Simulate a Michelson interferometer with a tilted mirror and a finite-bandwidth source',
        ],
      },
    },
  ],
  capstone: {
    slug: 'wave-simulator-and-diffraction-experiment',
    title: 'Capstone: a 2D wave simulator and a laser diffraction experiment',
    description: `Two linked projects. First, write a two-dimensional wave simulator (finite differences on a grid, absorbing boundaries, arbitrary sources and obstacles) and use it to reproduce the phenomena of the last two modules numerically: single- and double-slit diffraction, a diffraction grating, refraction at an interface between media of different wave speed, focusing by a lens-shaped region, and a waveguide. Compare each result quantitatively with the analytic formula in its regime of validity (Fraunhofer far field, Snell's law, the thin-lens equation).

Second, do the experiment. With a laser pointer, a ruler, a wall, and homemade or purchased slits (a hair, a CD or DVD as a reflection grating, a pinhole, a razor-blade single slit), measure diffraction patterns, extract the wavelength of the laser and the slit widths or grating spacing, and estimate uncertainties. Photograph the patterns, digitise the intensity profiles, and fit them to the sinc-squared and multiple-slit formulas.

Write up both parts as a lab report with a theory section, a numerical-methods section including convergence tests, the experimental data with fits, and a discussion of where theory, simulation and experiment agree and where they do not.`,
    deliverables: [
      'A 2D FDTD wave solver with absorbing boundaries, validated by convergence tests and comparison with analytic Fraunhofer patterns',
      'Simulated images of slits, grating, refraction, lens focusing and waveguide, each with a quantitative comparison to theory',
      'Experimental measurements of the laser wavelength from a CD/DVD grating and of a hair or slit width, with uncertainties',
      'A lab report (8-12 pages) with theory, numerics, experiment, fits and discussion',
    ],
    estimatedHours: 20,
    stretchGoals: [
      'Simulate and measure Fresnel (near-field) diffraction and show the transition to the Fraunhofer regime',
      'Use the simulator to design and test a simple phased-array beam steerer',
      'Measure the polarisation of your laser and of sky light with a polarising filter and a phone camera',
    ],
  },
  masteryChecklist: [
    'I can solve any damped, driven linear oscillator with complex amplitudes and read Q, bandwidth and ring-down time off each other',
    'I can set up the mass and stiffness matrices for a coupled system, find its normal modes by hand or with NumPy, and decompose any motion into them',
    'I can derive the wave equation from a physical model, write its general solution, and handle boundaries, junctions and impedance',
    'I can compute phase and group velocities from a dispersion relation and explain the spreading of pulses',
    'I can expand a signal in a Fourier series or transform, compute and interpret an FFT of real data, and state the bandwidth-duration relation',
    'I can derive the EM wave equation from Maxwell\'s equations and use ray optics (Snell, lenses, mirrors, ray matrices) to design a simple instrument',
    'I can predict interference and diffraction patterns for slits, gratings and thin films, including resolution limits, and verify them by simulation and by experiment',
    'I can describe polarisation states, Malus\'s law, Brewster\'s angle and birefringence, and use them in a measurement',
  ],
});
