import { defineSubject } from '../define';

export default defineSubject({
  id: 'planetary-science-exoplanets',
  title: 'Planetary Science and Exoplanets',
  category: 'astronomy',
  tagline:
    'The physics of planets, from the orbits and interiors of our own to the detection and characterisation of thousands of worlds around other stars.',
  description: `Planetary science asks how worlds work: why they orbit as they do, what they are made of inside, why their atmospheres and climates diverge, and how they formed from a disk of gas and dust. For most of history there were eight examples. There are now more than six thousand, and the same physics that explains Venus and Jupiter must explain hot Jupiters, super-Earths and the compact systems that fill the exoplanet catalogues.

This subject is built on that unity. The first half develops the physical tools using the solar system, where we have spacecraft data: two-body and perturbed orbits with real ephemerides from JPL Horizons and N-body simulation with REBOUND; interior structure from bulk density, moments of inertia and heat flow; atmospheres from radiative balance, scale heights and escape; and formation from meteorite chronology and disk physics. The second half applies them to exoplanets: each detection method is derived quantitatively and then practised on real data (radial velocities from the Exoplanet Archive, TESS and Kepler light curves with lightkurve, Gaia astrometry), followed by what we learn about compositions, atmospheres and habitability.

Every module has exercises on real datasets, and the capstone is the complete analysis of a transiting planet from a raw TESS or Kepler light curve to a characterised world with uncertainties. Classical mechanics is assumed; observational-astronomy is helpful but the needed tools are introduced where used.`,
  difficulty: 'intermediate',
  estimatedHours: 70,
  prerequisites: ['intro-astronomy', 'classical-mechanics'],
  recommendedBackground: [
    'Python with numpy, scipy and matplotlib',
    'Thermodynamics at the level of ideal gases and blackbody radiation',
    'The observational-astronomy subject (photometry, lightkurve, MCMC) makes the exoplanet modules much easier',
  ],
  tags: ['planetary science', 'exoplanets', 'orbital mechanics', 'atmospheres', 'transits', 'radial velocity', 'TESS', 'Kepler', 'habitability'],
  core: true,
  modules: [
    {
      slug: 'orbits-and-celestial-mechanics',
      title: 'Orbits and Celestial Mechanics',
      description:
        'The two-body problem solved and applied, orbital elements and real ephemerides, the perturbations that shape planetary systems, and N-body simulation.',
      lessons: [
        {
          slug: 'keplers-laws-and-the-two-body-problem',
          title: 'Kepler\'s laws from Newton: the two-body problem',
          summary:
            'Deriving elliptical orbits, the vis-viva equation and the generalised third law from gravity, and using them to compute speeds, energies and masses.',
          estimatedMinutes: 110,
          objectives: [
            'Reduce the two-body problem to a one-body problem with the reduced mass and derive conservation of energy and angular momentum',
            'Derive the conic-section orbit and relate eccentricity to energy and angular momentum',
            'Use the vis-viva equation to compute orbital speed anywhere on an orbit',
            'Apply Newton\'s form of Kepler\'s third law to measure masses of planets, stars and binaries',
          ],
          concepts: [
            'Reduced mass and relative motion',
            'Specific energy $\\varepsilon = -GM/2a$ and angular momentum $h = \\sqrt{GMa(1-e^2)}$',
            'Conic sections: $r = a(1-e^2)/(1+e\\cos\\nu)$',
            'Vis-viva: $v^2 = GM(2/r - 1/a)$',
            'Kepler\'s third law: $P^2 = 4\\pi^2 a^3/G(M_1+M_2)$',
            'Perihelion/aphelion speeds and distances',
            'Hyperbolic orbits and escape',
          ],
          explanation: `Two bodies attracting each other with $F = GM_1M_2/r^2$ can be described by the motion of their centre of mass (which moves uniformly) and the **relative** motion $\\mathbf{r} = \\mathbf{r}_2 - \\mathbf{r}_1$, which obeys $\\ddot{\\mathbf{r}} = -G(M_1+M_2)\\,\\mathbf{r}/r^3$. The relative orbit is therefore the orbit of a test particle around a mass $M = M_1 + M_2$; each body traces a scaled copy of it about the centre of mass. This is why a star wobbles when a planet orbits it.

Two conserved quantities solve the problem. The specific **angular momentum** $\\mathbf{h} = \\mathbf{r}\\times\\mathbf{v}$ is constant, so the motion is planar and sweeps equal areas in equal times (Kepler's second law). The specific **energy** $\\varepsilon = v^2/2 - GM/r$ is constant, and its sign decides the orbit: negative for bound ellipses, zero for a parabola, positive for a hyperbola. Solving the radial equation gives a conic section with the focus at the centre of mass,
$$r = \\frac{a(1-e^2)}{1 + e\\cos\\nu},$$
where $\\nu$ is the true anomaly, $a$ the semi-major axis and $e$ the eccentricity, with $\\varepsilon = -GM/2a$ and $h^2 = GMa(1-e^2)$. Kepler's first law is a theorem.

From the energy you get the **vis-viva equation**,
$$v^2 = GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right),$$
which gives the speed anywhere on any orbit; at perihelion $r = a(1-e)$ and the speed is a maximum. A circular orbit has $v = \\sqrt{GM/r}$ and escape requires $\\sqrt{2}$ times that. Integrating the area rate over a full orbit gives the third law in Newton's form,
$$P^2 = \\frac{4\\pi^2}{G(M_1 + M_2)}\\,a^3 ,$$
the single most used equation in this subject. It weighs the Sun from Earth's orbit, Jupiter from its moons, a binary star from its period and separation, and a black hole from the stars around it. With radial-velocity amplitudes it gives $M_p\\sin i$ for an exoplanet.

Work through Tatum's chapters 9 and 10 for the derivation in full, then the exercises; the classical-mechanics subject has the Lagrangian derivation and the effective-potential picture.`,
          resources: [
            {
              title: 'Celestial Mechanics (Tatum) — LibreTexts',
              url: 'https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Celestial_Mechanics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Chapter 9 (the two-body problem in two dimensions) and chapter 10 (computation of an ephemeris).',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 3.1 The Laws of Planetary Motion',
              url: 'https://openstax.org/books/astronomy-2e/pages/3-1-the-laws-of-planetary-motion',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Conceptual refresher; also 3.3 and 3.4.',
            },
            {
              title: 'MIT OCW 12.400 The Solar System',
              url: 'https://ocw.mit.edu/courses/12-400-the-solar-system-spring-2006/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The orbital-mechanics problem sets.',
            },
            {
              title: 'An Introduction to Modern Astrophysics (Carroll & Ostlie), chapter 2',
              url: 'https://doi.org/10.1017/9781108380980',
              type: 'textbook',
              cost: 'paid',
              provider: 'Cambridge University Press',
              note: 'Chapter 2 covers exactly this lesson; Tatum (free) is a complete substitute.',
            },
          ],
          exercises: [
            {
              slug: 'derive-vis-viva',
              title: 'Derive the vis-viva equation and the third law',
              prompt:
                'Starting from conservation of energy and angular momentum for the relative orbit, derive (a) the relation epsilon = -GM/2a using the perihelion and aphelion distances, (b) the vis-viva equation, and (c) Kepler\'s third law by integrating the areal velocity h/2 over one period using the area of the ellipse pi a^2 sqrt(1-e^2). Then evaluate the perihelion and aphelion speeds of Halley\'s Comet (a = 17.8 AU, e = 0.967).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'weigh-with-moons',
              title: 'Weigh four planets with their moons',
              prompt:
                'From the JPL planetary satellite mean elements table, take a and P for one moon each of Mars (Phobos), Jupiter (Ganymede), Saturn (Titan) and Neptune (Triton). Compute each planet\'s mass with astropy.units and compare with the NASA fact-sheet values. Then compute the mass of the Pluto-Charon system from Charon (a = 19,596 km, P = 6.387 d) and, given the mass ratio 0.122, locate the barycentre and show it lies outside Pluto.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'hohmann-transfer',
              title: 'A Hohmann transfer to Mars',
              prompt:
                'Using vis-viva, compute the delta-v needed to move from Earth\'s circular orbit (1 AU) onto a transfer ellipse with aphelion at Mars (1.524 AU), the delta-v to circularise at Mars, and the transfer time (half the ellipse period). Then explain why launch windows recur every synodic period (2.14 yr) and compute the required phase angle between Earth and Mars at departure.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'orbit-integrator-check',
              title: 'Integrate an orbit and check the conservation laws',
              prompt:
                'Write a leapfrog (or use scipy.integrate.solve_ivp with a tight tolerance) integrator for a test particle around a point mass, start it with e = 0.7, and integrate for 20 orbits. Plot the fractional errors in energy and angular momentum against time for leapfrog and for RK45; verify that the numerical period and the perihelion distance match the analytic values; and show that the orbit traces r(nu) = a(1-e^2)/(1+e cos nu) by overplotting it.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What determines whether an orbit is bound, and what is the energy of a bound orbit?',
              answerOutline:
                'The sign of the specific energy v^2/2 - GM/r; bound orbits have epsilon = -GM/2a < 0, depending only on the semi-major axis.',
            },
            {
              question: 'How does a planet\'s speed at perihelion compare with that at aphelion?',
              answerOutline: 'Larger by the factor (1+e)/(1-e), from angular momentum conservation r v = const at the apsides.',
            },
            {
              question: 'Why does Kepler\'s third law involve the sum of the two masses?',
              answerOutline:
                'The relative orbit obeys the equation of motion with G(M1+M2); for planets M2 is negligible, but for binaries or massive moons it is not.',
            },
          ],
          relatedLessons: ['classical-mechanics/oscillations-and-gravitation/keplers-laws-and-orbits'],
        },
        {
          slug: 'orbital-elements-and-ephemerides',
          title: 'Orbital elements, Kepler\'s equation and ephemerides',
          summary:
            'The six numbers that specify an orbit, how to go from elements to position at any time (and back), and how to use JPL Horizons and Skyfield for real ephemerides.',
          estimatedMinutes: 110,
          objectives: [
            'Define the six Keplerian elements and explain which are geometric and which fix the position in time',
            'Solve Kepler\'s equation numerically and convert mean anomaly to true anomaly and position',
            'Transform from the orbital plane to ecliptic or equatorial coordinates',
            'Retrieve and use ephemerides and orbital elements from JPL Horizons via astroquery',
          ],
          concepts: [
            'Elements: a, e, i, Omega, omega, and the epoch of perihelion (or mean anomaly)',
            'Mean, eccentric and true anomalies',
            'Kepler\'s equation $M = E - e\\sin E$',
            'Rotation matrices from the orbital frame',
            'Osculating elements and their drift',
            'State vectors vs elements',
            'JPL Horizons, SPICE kernels, Skyfield',
          ],
          explanation: `An orbit around a given mass is specified by six **orbital elements**. Two describe the ellipse: the semi-major axis $a$ and eccentricity $e$. Three orient it in space: the inclination $i$ to the reference plane (the ecliptic for the solar system, the sky plane for binaries and exoplanets), the longitude of the ascending node $\\Omega$ where the orbit crosses that plane going north, and the argument of perihelion $\\omega$ measured from the node to perihelion within the orbital plane. The sixth fixes where the body is at a reference time: the time of perihelion passage $T_0$ or equivalently the mean anomaly at an epoch.

Position at time $t$ follows in three steps. The **mean anomaly** $M = 2\\pi(t - T_0)/P$ increases uniformly. **Kepler's equation**
$$M = E - e\\sin E$$
links it to the **eccentric anomaly** $E$, a geometric angle on the auxiliary circle; it has no closed-form solution and is solved by Newton's method in a few iterations (start with $E = M$, or $E = \\pi$ for high $e$). Then the **true anomaly** follows from $\\tan(\\nu/2) = \\sqrt{(1+e)/(1-e)}\\,\\tan(E/2)$ and the radius from $r = a(1 - e\\cos E)$. Finally three rotations (by $\\omega$, $i$ and $\\Omega$) take the orbital-plane position $(r\\cos\\nu, r\\sin\\nu, 0)$ to the reference frame. The inverse problem, elements from a position and velocity (a **state vector**), uses the energy and angular momentum vectors and is equally routine.

Real orbits are perturbed, so published elements are **osculating**: the elements of the instantaneous Keplerian ellipse tangent to the true trajectory, valid near their epoch. For precise work you use a numerically integrated ephemeris instead. **JPL Horizons** provides positions, velocities and osculating elements for every known solar-system body at any time, queried from Python with astroquery.jplhorizons; **Skyfield** reads the same JPL ephemeris files (SPICE kernels) locally for planets and the Moon. Both handle light-time and the observer's position. Read Tatum's chapter 10 and the JPL approximate-elements page, then write your own ephemeris code and check it against Horizons in the exercises; agreement to arcminutes validates your understanding, and the residual shows the perturbations.`,
          resources: [
            {
              title: 'Celestial Mechanics (Tatum) — chapter 10, Computation of an Ephemeris',
              url: 'https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Celestial_Mechanics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              primary: true,
            },
            {
              title: 'JPL — Approximate positions of the planets (Keplerian elements)',
              url: 'https://ssd.jpl.nasa.gov/planets/approx_pos.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NASA JPL',
              note: 'Mean elements and their rates for all planets, with the algorithm to compute positions.',
            },
            {
              title: 'JPL Horizons system',
              url: 'https://ssd.jpl.nasa.gov/horizons/',
              type: 'tool',
              cost: 'free',
              provider: 'NASA JPL',
              note: 'Authoritative ephemerides; use the web app or the API.',
            },
            {
              title: 'astroquery.jplhorizons documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/jplhorizons/jplhorizons.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'Skyfield documentation',
              url: 'https://rhodesmill.org/skyfield/',
              type: 'documentation',
              cost: 'free',
              provider: 'Brandon Rhodes',
            },
          ],
          exercises: [
            {
              slug: 'keplers-equation-solver',
              title: 'Solve Kepler\'s equation and build an ephemeris',
              prompt:
                'Implement a Newton-Raphson solver for Kepler\'s equation and test it for e = 0.1, 0.5, 0.9 and 0.99 (count iterations and check against scipy.optimize.brentq). Then, using the JPL approximate elements for Mars, compute its heliocentric ecliptic position for today and every 10 days for a year, convert to geocentric RA and Dec using Earth\'s elements, and compare with Horizons. Plot the difference in arcseconds against time and explain its size.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'elements-from-state-vector',
              title: 'Elements from a state vector and back',
              prompt:
                'Query Horizons for the heliocentric state vector of asteroid (433) Eros at a chosen epoch. Compute a, e, i, Omega, omega and the true anomaly from the position and velocity (energy, angular momentum vector, eccentricity vector). Compare with the osculating elements Horizons returns for the same epoch. Then propagate your elements forward one year Keplerianly and compare with the Horizons position; attribute the difference.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'exoplanet-orbit-geometry',
              title: 'Orbital elements for an exoplanet',
              prompt:
                'For an exoplanet, the reference plane is the sky and i = 90 degrees means edge-on. Explain which elements a radial-velocity orbit constrains (P, e, omega, T0, K) and which it cannot (i, Omega), and which a transit adds. Using the Exoplanet Archive values for HD 80606 b (e = 0.93), compute the fraction of the orbit spent within 0.1 AU, the ratio of stellar flux at periastron and apastron, and sketch the radial-velocity curve shape for omega = 0, 90 and 180 degrees.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between mean, eccentric and true anomaly?',
              answerOutline:
                'Mean anomaly increases uniformly with time; eccentric anomaly is the auxiliary-circle angle related to it through Kepler\'s equation; true anomaly is the actual angle from perihelion as seen from the focus.',
            },
            {
              question: 'Why are published orbital elements called osculating?',
              answerOutline:
                'Perturbations make the true path non-Keplerian; the elements describe the Keplerian ellipse instantaneously tangent to the trajectory at the epoch and drift with time.',
            },
            {
              question: 'Which orbital elements can a radial-velocity measurement alone not determine?',
              answerOutline: 'The inclination i and the longitude of the ascending node Omega; hence only M sin i is measured.',
            },
          ],
        },
        {
          slug: 'tides-resonances-and-perturbations',
          title: 'Tides, resonances and perturbations',
          summary:
            'Beyond two bodies: tidal forces and their consequences (locking, heating, the Roche limit), orbital resonances, secular precession and the Hill sphere.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the tidal force and explain tidal locking, tidal heating and orbital evolution of the Earth-Moon system',
            'Compute the Roche limit and the Hill sphere and apply them to rings, moons and exoplanets',
            'Explain mean-motion resonances and give examples that stabilise and that destabilise orbits',
            'Describe secular perturbations (precession, Kozai-Lidov cycles) and relativistic precession',
          ],
          concepts: [
            'Tidal force $\\propto 2GMR/d^3$',
            'Tidal locking and the tidal timescale',
            'Tidal dissipation and heating; Q factor',
            'Roche limit $\\approx 2.44 R (\\rho_p/\\rho_m)^{1/3}$',
            'Hill sphere $r_H = a(m/3M)^{1/3}$',
            'Mean-motion resonances; Kirkwood gaps; Laplace resonance',
            'Secular precession; Kozai-Lidov oscillations',
            'GR perihelion precession',
          ],
          explanation: `Because gravity falls with distance, a planet pulls harder on the near side of its moon than on the far side. The difference, the **tidal force**, is $\\Delta F \\approx 2GMmR/d^3$ across a body of radius $R$ at distance $d$: it stretches the body along the line of centres and scales as the inverse cube. On Earth it raises the ocean tides; on a moon it raises a bulge that, if the moon rotates faster than it orbits, is carried ahead of the planet-moon line and torqued back. The result is **tidal locking**: the Moon, all the large moons in the solar system, and probably every habitable-zone planet of a red dwarf rotate synchronously. The locking timescale grows steeply with distance (roughly $d^6$). Friction in the flexing interior dissipates energy, **tidal heating**, that powers Io's volcanoes and Europa's and Enceladus's oceans; the rate depends on eccentricity (which keeps the tide varying) and on the body's rigidity and dissipation factor $Q$.

Tides also move orbits. Earth's tidal bulge, dragged ahead by Earth's rotation, pulls the Moon forward and transfers angular momentum: the Moon recedes 3.8 cm/yr (measured with lunar laser ranging) and Earth's day lengthens. Close in, tides win entirely: inside the **Roche limit**, about $2.44R_p(\\rho_p/\\rho_m)^{1/3}$ for a fluid satellite, tidal stress exceeds self-gravity and a moon is torn apart, which is where rings live. The complementary limit is the **Hill sphere**, $r_H = a(m/3M)^{1/3}$, inside which a planet's gravity dominates the star's; stable moons orbit within about half of it.

Where orbital periods are commensurate, **mean-motion resonances** make perturbations add coherently. Resonances with Jupiter empty the Kirkwood gaps in the asteroid belt by pumping eccentricities; the 3:2 resonance with Neptune protects Pluto and the plutinos; the 1:2:4 Laplace resonance of Io, Europa and Ganymede forces Io's eccentricity. Many exoplanet systems formed in resonant chains by migration. Over longer times, **secular** perturbations slowly precess orbits and exchange eccentricity and inclination; the **Kozai-Lidov** mechanism in inclined triple systems can drive a planet to very high eccentricity and, with tides, produce hot Jupiters. Finally, general relativity adds a perihelion advance of $6\\pi GM/(c^2 a(1-e^2))$ per orbit, 43 arcseconds per century for Mercury and measurable in some close-in exoplanets. Read Tatum's chapters on perturbations and the OpenStax ring/moon sections, then compute the exercises.`,
          resources: [
            {
              title: 'Celestial Mechanics (Tatum) — LibreTexts',
              url: 'https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Celestial_Mechanics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Chapters 14-16 on perturbation theory and the restricted three-body problem.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 12.1 Ring and Moon Systems Introduced',
              url: 'https://openstax.org/books/astronomy-2e/pages/12-1-ring-and-moon-systems-introduced',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Tidal heating of Io, the Roche limit and ring dynamics in the following sections.',
            },
            {
              title: 'MIT OCW 12.400 The Solar System',
              url: 'https://ocw.mit.edu/courses/12-400-the-solar-system-spring-2006/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture notes on tides and resonances.',
            },
            {
              title: 'JPL Small-Body Database Lookup',
              url: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA JPL',
              note: 'Asteroid orbital elements for the Kirkwood-gap exercise (the query API is documented at ssd-api.jpl.nasa.gov).',
            },
          ],
          exercises: [
            {
              slug: 'kirkwood-gaps-from-data',
              title: 'Find the Kirkwood gaps in real asteroid data',
              prompt:
                'Download the orbital elements of all numbered asteroids (the JPL SBDB query API at ssd-api.jpl.nasa.gov/doc/sbdb_query.html returns a, e, i for the whole belt; the Minor Planet Center also provides the file). Plot a histogram of semi-major axes between 1.8 and 3.6 AU with 0.005 AU bins and mark the locations of the 4:1, 3:1, 5:2, 7:3 and 2:1 resonances with Jupiter (a = 5.2 AU). Compute each resonance location from Kepler\'s third law and verify the gaps fall there. Then plot e vs a and identify the Hildas (3:2) and Trojans (1:1).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'tidal-heating-io',
              title: 'Tidal heating of Io',
              prompt:
                'The tidal heating rate for a synchronously rotating moon is approximately dE/dt = (21/2) (k2/Q) G M_p^2 R^5 n e^2 / a^6 with n the mean motion. For Io take k2/Q = 0.015, e = 0.0041, and the known mass, radius and orbit. Compute the heating in watts and the surface heat flux in W/m^2; compare with Earth\'s 0.09 W/m^2 and the observed Io value of about 2 W/m^2. Then compute the heating for Europa (e = 0.009, k2/Q about 0.01) and discuss whether it suffices to maintain an ocean under 20 km of ice.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'hill-sphere-and-roche-exoplanets',
              title: 'Hill spheres and Roche limits for exoplanets',
              prompt:
                'Compute the Hill radius and the Roche limit for: Earth; Jupiter; the hot Jupiter WASP-12 b (M = 1.4 MJ, R = 1.9 RJ, a = 0.023 AU around a 1.4 Msun star); and the rocky planet Kepler-10 b (a = 0.017 AU). Express the Hill radius in planetary radii. Which of these could host a moon? Which is close to being tidally disrupted? For WASP-12 b, compute the ratio of the planet\'s radius to its Roche-lobe size and explain the observed mass loss.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'gr-precession',
              title: 'Relativistic precession of Mercury and a hot Jupiter',
              prompt:
                'Compute the GR perihelion advance per orbit and per century for Mercury (a = 0.387 AU, e = 0.206) and compare with the famous 43 arcsec/century. Then compute it for WASP-12 b and for the eccentric planet HD 80606 b, and estimate how many years of transit timing would be needed to detect the precession through the change in transit duration or timing (literature estimates are of order decades; show the scaling).',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the tidal force scale as 1/d^3 rather than 1/d^2?',
              answerOutline:
                'It is the difference in gravitational acceleration across the body, i.e. the derivative of GM/d^2 times the body\'s size: 2GMR/d^3.',
            },
            {
              question: 'Why does the Moon recede from Earth?',
              answerOutline:
                'Earth rotates faster than the Moon orbits, so friction carries the tidal bulge ahead; its gravity pulls the Moon forward, adding orbital angular momentum at the expense of Earth\'s spin.',
            },
            {
              question: 'Give one resonance that protects a population and one that depletes it.',
              answerOutline:
                'Neptune\'s 3:2 resonance protects Pluto and the plutinos from close encounters; Jupiter\'s 3:1 resonance pumps asteroid eccentricities and clears a Kirkwood gap.',
            },
          ],
        },
        {
          slug: 'n-body-simulation-with-rebound',
          title: 'N-body simulation with REBOUND',
          summary:
            'Integrating many bodies accurately: symplectic integrators, timesteps, close encounters, and using REBOUND to test the stability of real planetary systems.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why symplectic integrators (WHFast, leapfrog) are preferred for long-term orbital integrations and when IAS15 is needed',
            'Set up a REBOUND simulation from orbital elements or from Horizons and choose units, timestep and integrator',
            'Measure energy conservation, detect close encounters and instability, and interpret the results',
            'Test the stability of a compact exoplanet system and of a hypothetical solar-system modification',
          ],
          concepts: [
            'Direct summation and its O(N^2) cost',
            'Symplectic integrators and bounded energy error',
            'Wisdom-Holman splitting; WHFast',
            'Adaptive high-order IAS15 for close encounters',
            'Timestep: ~1/20 of the shortest period',
            'Chaos, Lyapunov time and MEGNO',
            'Hill stability of planet pairs',
            'Units in REBOUND (G = 1 or SI/AU-yr-Msun)',
          ],
          explanation: `Once there are three or more bodies there is no closed-form solution and you integrate numerically. The forces are simple, direct pairwise summation, but orbital integrations run for millions of orbits and the choice of **integrator** decides whether the result is physical. Ordinary high-order methods (Runge-Kutta) have energy errors that grow secularly, so a planet slowly spirals in or out for purely numerical reasons. **Symplectic** integrators preserve the Hamiltonian structure; their energy error oscillates but stays bounded, so they are the standard for long-term dynamics. The leapfrog you wrote in the first lesson is the simplest. **Wisdom-Holman** methods go further for planetary systems: they split the motion into exact Keplerian orbits about the star plus small perturbations, allowing timesteps of a twentieth of the shortest orbital period while keeping errors tiny. REBOUND's **WHFast** implements this.

Symplectic methods assume a fixed timestep and no close approaches. When bodies pass near each other (scattering, moons, collisions), switch to **IAS15**, a 15th-order adaptive integrator that is accurate to machine precision; REBOUND's hybrid MERCURIUS integrator switches automatically. Rule of thumb: timestep about 5 percent of the innermost period for WHFast, and check that halving it does not change the outcome.

**REBOUND** makes all this a few lines: create a simulation, add particles by mass and orbital elements (or pull the real solar system from Horizons with one call), set the integrator and timestep, integrate, and read back orbital elements or positions. Units can be anything consistent; the convention G = 1 with masses in solar masses, distances in AU and time in years/2π is common.

What to measure: the relative **energy error** over the run (should stay below about $10^{-9}$ for WHFast), the evolution of each body's elements, the minimum pairwise separation, and for stability the **MEGNO** chaos indicator or the **Lyapunov time**. A system is Hill-stable if neighbouring planets are separated by more than about $2\\sqrt3$ mutual Hill radii, and this is the first thing to check for any new multi-planet system. Work through the REBOUND documentation examples and then run the real-system tests in the exercises; the computational-physics subject covers the numerical analysis behind the integrators.`,
          resources: [
            {
              title: 'REBOUND documentation',
              url: 'https://rebound.hanno-rein.de/',
              type: 'documentation',
              cost: 'free',
              provider: 'Hanno Rein',
              note: 'Quickstart, the integrator comparison, and the examples (solar system from Horizons, resonances, MEGNO).',
              primary: true,
            },
            {
              title: 'Transits and Occultations (Winn) — for exoplanet system context',
              url: 'https://arxiv.org/abs/1001.2010',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Section on transit timing variations, which N-body models predict.',
            },
            {
              title: 'NASA Exoplanet Archive — Planetary Systems table',
              url: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              note: 'Masses and orbital elements of multi-planet systems for the stability exercises.',
            },
            {
              title: 'Planet-Disc Interactions and Early Evolution of Planetary Systems (Baruteau et al.)',
              url: 'https://arxiv.org/abs/1312.4293',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Review context for resonant chains formed by migration, tested in the exercises.',
            },
          ],
          exercises: [
            {
              slug: 'integrator-comparison',
              title: 'Compare integrators on the outer solar system',
              prompt:
                'Load the Sun and the four giant planets from Horizons into REBOUND. Integrate for 10,000 years with (a) WHFast at dt = 0.5 yr, (b) WHFast at dt = 0.1 yr, (c) IAS15, and (d) scipy RK45 with your own force function. Plot the relative energy error vs time on a log scale for each, and the semi-major axis of Jupiter. Report the wall-clock time of each. Explain why RK45\'s error grows and WHFast\'s does not, and why dt = 0.5 yr is too large.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'stability-of-a-compact-system',
              title: 'Is TRAPPIST-1 stable?',
              prompt:
                'Take the masses and orbital elements of the seven TRAPPIST-1 planets from the Exoplanet Archive (use circular orbits if eccentricities are poorly constrained). Compute the mutual Hill separations of adjacent pairs. Integrate 1 million orbits of planet b with WHFast and MEGNO enabled; report the energy error, the MEGNO value and whether any eccentricity grows. Then increase all planet masses by a factor of 3 and repeat: at what factor does the system go unstable within your integration time?',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'resonant-chain-migration',
              title: 'Capture into resonance by migration',
              prompt:
                'Using REBOUND with the REBOUNDx migration or a simple additional drag force (reduce the outer planet\'s semi-major axis on a timescale of 10^4 orbits), start two Neptune-mass planets at period ratio 2.3 around a solar-mass star and migrate the outer one inward. Plot the period ratio and the resonant angle versus time and show capture into the 2:1 resonance with libration. Explain why migration that is too fast skips the resonance.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a symplectic integrator preferred for a million-orbit integration?',
              answerOutline:
                'Its energy error is bounded and oscillatory rather than growing secularly, so orbits do not artificially drift; non-symplectic methods accumulate drift.',
            },
            {
              question: 'When must you abandon WHFast for IAS15?',
              answerOutline:
                'During close encounters or collisions, where the Keplerian splitting fails and a fixed timestep cannot resolve the rapidly changing force; IAS15 adapts its step.',
            },
            {
              question: 'What does a MEGNO value near 2 versus one growing linearly indicate?',
              answerOutline: 'Near 2 means regular (quasi-periodic) motion; linear growth indicates chaos, with slope related to the Lyapunov exponent.',
            },
          ],
          relatedLessons: ['computational-physics/n-body-and-molecular-dynamics/symplectic-integrators'],
        },
      ],
      project: {
        slug: 'solar-system-dynamics-lab',
        title: 'Project: a solar-system dynamics lab',
        description: `Build a notebook that loads the real solar system from Horizons into REBOUND, verifies it reproduces the next decade of planetary positions to arcseconds, and then runs three experiments: (1) remove Jupiter and integrate the asteroid belt (a few hundred real asteroids from the SBDB) for 100,000 years to see the Kirkwood gaps fail to form; (2) add a hypothetical Earth-mass planet at 0.7 AU and determine whether the inner solar system stays stable for 10 million years; (3) measure Mercury's perihelion precession in a Newtonian integration and compare with the observed total, isolating the general-relativistic 43 arcseconds per century.`,
        deliverables: [
          'Notebook with validation against Horizons and the three experiments',
          'Plots of energy error, orbital elements vs time, and the asteroid a-distribution before and after',
          'A two-page write-up interpreting each experiment physically',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'planetary-interiors-and-surfaces',
      title: 'Planetary Interiors and Surfaces',
      description:
        'What is inside a planet and how we know: bulk density and compression, moments of inertia, heat sources and loss, surface processes and the cratering clock.',
      lessons: [
        {
          slug: 'bulk-composition-and-interior-structure',
          title: 'Bulk composition, hydrostatic equilibrium and interior structure',
          summary:
            'From mass and radius to what a planet is made of: uncompressed density, the hydrostatic equation, equations of state, and the mass-radius relations of rocky, icy and gas worlds.',
          estimatedMinutes: 110,
          objectives: [
            'Compute mean and uncompressed densities and infer bulk composition from them',
            'Integrate the equation of hydrostatic equilibrium with a simple equation of state to model a planet\'s interior',
            'Explain why mass-radius relations differ for rock, ice and gas and why giant planets all have similar radii',
            'Use gravity-field and moment-of-inertia data to constrain core size',
          ],
          concepts: [
            'Mean density and compression; uncompressed density',
            'Hydrostatic equilibrium $dP/dr = -\\rho g$',
            'Equations of state: incompressible, polytropic, Birch-Murnaghan',
            'Mass-radius relation $R \\propto M^{0.27}$ for rock; $R \\approx$ const for gas giants',
            'Moment of inertia factor $C/MR^2$ and core size',
            'Gravitational moments $J_2$ and flattening',
            'Differentiation',
          ],
          explanation: `The first thing you know about a planet is its mass (from moons or Kepler's law) and radius, hence its **mean density**: 5.5 g/cm$^3$ for Earth, 3.9 for Mars, 1.3 for Jupiter, 0.7 for Saturn. But density depends on compression as well as composition; Earth's rock and iron would have a density of about 4.0 g/cm$^3$ if uncompressed. Comparing **uncompressed densities** across the terrestrial planets reveals a real trend, from Mercury's iron-rich 5.3 to Mars's 3.7, that formation models must explain.

To go inside, assume **hydrostatic equilibrium**: at every radius the pressure gradient supports the weight of the overlying material,
$$\\frac{dP}{dr} = -\\rho(r)\\,g(r) = -\\frac{G m(r)\\rho(r)}{r^2},\\qquad \\frac{dm}{dr} = 4\\pi r^2\\rho .$$
Closing these equations requires an **equation of state** $\\rho(P)$ for each material: for rock and iron, the Birch-Murnaghan form fitted to laboratory high-pressure data; for hydrogen, a sequence of states from molecular gas to liquid metal. Integrating from the centre outward for a given central pressure and layer structure gives a mass and radius; matching the observed pair constrains the layers. Earth's central pressure is 360 GPa and its iron core occupies 55 percent of the radius.

The resulting **mass-radius relations** have a characteristic shape. Rocky planets follow roughly $R \\propto M^{0.27}$ because compression grows with mass; water worlds sit higher; a pure-iron planet lower. For gas giants, as mass increases compression increases so much that the radius stays nearly constant near Jupiter's: Saturn is a third of Jupiter's mass but 85 percent of its radius, and a 13-Jupiter-mass brown dwarf is the same size as Jupiter. Exoplanets whose mass and radius are both measured are placed on this diagram to read off their composition, which is the subject of a later module.

Two more observables break degeneracies. The **moment of inertia factor** $C/MR^2$ is 0.4 for a uniform sphere, 0.33 for Earth and 0.25 for Jupiter; smaller means more centrally concentrated. It is measured from the precession rate or, for giant planets, inferred from the **gravitational moments** $J_2, J_4, \\dots$ that spacecraft measure from the planet's flattening and that Juno and Cassini used to probe Jupiter's and Saturn's deep interiors. Read OpenStax 7.2, the MIT 12.002 interior lectures, and build the interior model in the exercises.`,
          resources: [
            {
              title: 'MIT OCW 12.002 Physics and Chemistry of the Terrestrial Planets — lecture notes',
              url: 'https://ocw.mit.edu/courses/12-002-physics-and-chemistry-of-the-terrestrial-planets-fall-2008/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on density, moment of inertia, gravity and internal structure.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 7.2 Composition and Structure of Planets',
              url: 'https://openstax.org/books/astronomy-2e/pages/7-2-composition-and-structure-of-planets',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'NASA Planetary Fact Sheet',
              url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Masses, radii, J2 and moment-of-inertia factors.',
            },
            {
              title: 'NASA Science — Juno mission',
              url: 'https://science.nasa.gov/mission/juno/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Gravity-science results on Jupiter\'s dilute core and deep winds.',
            },
          ],
          exercises: [
            {
              slug: 'two-layer-earth',
              title: 'A two-layer model of Earth',
              prompt:
                'Model Earth as an iron core of density 11,000 kg/m^3 and a rocky mantle of 4,500 kg/m^3 (both constant). Find the core radius that reproduces Earth\'s mass and radius, then compute the moment-of-inertia factor and compare with the observed 0.3307. Integrate the hydrostatic equation outward to get the central pressure and compare with 360 GPa. Repeat for Mars (C/MR^2 = 0.366) and Mercury (0.346) and tabulate the inferred core-radius fractions.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mass-radius-curves',
              title: 'Compute mass-radius curves with a polytropic equation of state',
              prompt:
                'Using a modified polytrope rho(P) = rho0 + c P^n with parameters for iron (rho0 = 8300 kg/m^3, c = 0.00349, n = 0.528 in SI with P in Pa), silicate (4100, 0.00161, 0.541) and water ice (1460, 0.00311, 0.513) (Seager et al. 2007 fits), integrate hydrostatic equilibrium from a range of central pressures for pure-iron, pure-rock and pure-water planets and plot R vs M from 0.1 to 20 Earth masses on log axes. Overlay solar-system planets and 30 exoplanets with well-measured masses and radii from the Exoplanet Archive. Comment on where Earth, Mercury and the sub-Neptunes fall.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'uncompressed-density-trend',
              title: 'The uncompressed density trend',
              prompt:
                'Using approximate uncompressed densities (Mercury 5.3, Venus 4.0, Earth 4.05, Moon 3.3, Mars 3.7 g/cm^3), estimate the iron mass fraction of each body assuming a mixture of iron (7.9) and silicate (3.3). Plot iron fraction against distance from the Sun. Propose two formation explanations for Mercury\'s anomaly (a giant impact stripping the mantle; condensation or sorting in the inner nebula) and state what observation would distinguish them.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a planet\'s mean density not a direct measure of its composition?',
              answerOutline:
                'Self-compression raises density with mass; the uncompressed density (corrected with an equation of state) must be compared across bodies of different size.',
            },
            {
              question: 'Why does Saturn have nearly the same radius as Jupiter despite a third of the mass?',
              answerOutline:
                'Hydrogen is highly compressible: added mass increases central pressure and density almost as fast as it adds volume, so giant-planet radii are nearly independent of mass.',
            },
            {
              question: 'What does a moment-of-inertia factor of 0.25 tell you?',
              answerOutline: 'Mass is strongly concentrated toward the centre (a uniform sphere gives 0.4), implying a dense core.',
            },
          ],
        },
        {
          slug: 'heat-flow-and-geological-activity',
          title: 'Heat sources, heat loss and geological activity',
          summary:
            'What heats a planet, how heat escapes by conduction and convection, why size controls how long a world stays active, and the signatures of activity: volcanism, tectonics and magnetic fields.',
          estimatedMinutes: 100,
          objectives: [
            'Quantify accretional, differentiation, radiogenic and tidal heat sources',
            'Estimate conductive cooling timescales and explain why mantle convection dominates in large planets',
            'Explain the surface-area-to-volume argument and apply it to predict which bodies are active today',
            'Describe planetary dynamos and the conditions for a global magnetic field',
          ],
          concepts: [
            'Accretion energy $\\sim 3GM^2/5R$',
            'Radiogenic heating: U, Th, K; half-lives and heat production per kg',
            'Conductive timescale $t \\sim R^2/\\kappa$',
            'Mantle convection and the Rayleigh number',
            'Surface heat flow (Earth 0.09 W/m^2)',
            'Lithosphere thickness and tectonic style',
            'Dynamo requirements: conducting fluid, convection, rotation',
          ],
          explanation: `A planet's geology is driven by heat escaping from inside, so the questions are where the heat comes from and how fast it leaves. The initial endowment is **accretional** energy, the gravitational binding energy released when the planetesimals fell together, roughly $3GM^2/5R$ (enough to melt the Earth several times over, partly radiated away during accretion), plus the energy released when iron sank to the core during **differentiation**. The long-term source is **radiogenic** decay of uranium, thorium and potassium-40; with half-lives of 0.7-14 billion years these produce about $5\\times10^{-12}$ W per kilogram of rock today, several times more when the solar system was young. Moons close to giant planets add **tidal** heating, which for Io exceeds its radiogenic budget a hundredfold.

Heat leaves by **conduction** through the rigid outer layer and by **convection** where the interior can flow. The conductive cooling time for a body of radius $R$ is $t \\sim R^2/\\kappa$ with diffusivity $\\kappa \\approx 10^{-6}$ m$^2$/s: about 10 billion years for a 500 km body and far longer than the age of the universe for Earth, so a planet larger than a few hundred kilometres cannot cool by conduction alone. Instead the mantle, solid but creeping over geological time, **convects** when the Rayleigh number (ratio of buoyancy drive to viscous and diffusive resistance) exceeds about 1000, and heat is carried to a thin conductive **lithosphere**. Earth's mantle convection manifests as plate tectonics; Venus and Mars, with thicker, stagnant lids, lose heat by conduction through the lid and episodic volcanism.

The surface-area-to-volume argument from intro-astronomy, heat content $\\propto R^3$ versus loss $\\propto R^2$, now has its physical basis: smaller bodies have thicker lithospheres relative to their size and exhaust their radiogenic heat sooner. Hence the sequence Moon (dead for 3 Gyr), Mercury, Mars (sporadic), Venus and Earth (active).

Heat also drives **dynamos**. A global magnetic field requires an electrically conducting fluid (liquid iron, metallic hydrogen, salty water), vigorous convection (needing a sufficient heat flow out of the core, often aided by latent heat and light-element release as the inner core freezes), and rotation to organise the flow. Earth, Mercury, Jupiter, Saturn, Uranus, Neptune and Ganymede have dynamos; Venus and Mars do not, Mars having lost its field about 4 billion years ago as recorded in its crustal magnetisation. Read the MIT 12.002 lectures on thermal evolution and do the exercises.`,
          resources: [
            {
              title: 'MIT OCW 12.002 Physics and Chemistry of the Terrestrial Planets — lecture notes',
              url: 'https://ocw.mit.edu/courses/12-002-physics-and-chemistry-of-the-terrestrial-planets-fall-2008/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on heat flow, thermal evolution, convection and magnetism.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 8.1 The Global Perspective',
              url: 'https://openstax.org/books/astronomy-2e/pages/8-1-the-global-perspective',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Earth\'s interior, plate tectonics and magnetic field at introductory level; 8.2 for the crust.',
            },
            {
              title: 'NASA Science — Mars',
              url: 'https://science.nasa.gov/mars/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'InSight mission results on Mars\'s heat flow, core size and seismicity.',
            },
          ],
          exercises: [
            {
              slug: 'heat-budget-earth',
              title: 'Earth\'s heat budget',
              prompt:
                'Compute Earth\'s present radiogenic heat production using mantle-plus-crust abundances of U (20 ppb), Th (80 ppb) and K (240 ppm) with heat production rates 9.5e-5, 2.6e-5 and 3.5e-9 W/kg respectively (K-40 is 0.012 percent of K). Compare with the observed total surface heat flow of 47 TW. What fraction is radiogenic? Then compute what the production was 4.5 Gyr ago using the half-lives (U-238 4.47, U-235 0.70, Th-232 14.0, K-40 1.25 Gyr) and the present isotope ratios.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'conductive-cooling',
              title: 'Conductive cooling of a small body',
              prompt:
                'Solve the 1D spherical heat-conduction equation numerically (finite differences) for a 200 km radius asteroid initially at 1500 K throughout with a 200 K surface, kappa = 1e-6 m^2/s, and no internal heating. Plot temperature profiles at 1, 10, 100 and 1000 Myr. Find the time at which the centre drops below 1000 K (the approximate solidus) and compare with the R^2/kappa estimate. Then add radiogenic heating of 5e-11 W/kg (early-solar-system Al-26 level decaying with a 0.7 Myr half-life) and show how it changes the early history.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'dynamo-checklist',
              title: 'Why these bodies and not those?',
              prompt:
                'For Earth, Venus, Mars, Mercury, the Moon, Ganymede, Europa, Jupiter and Uranus, make a table of: whether a present dynamo exists, the conducting fluid (if any), rotation period, and the likely reason for the presence or absence of a field. For Mars, use the crustal magnetisation evidence to argue when its dynamo died and propose a cause. For Venus, discuss why slow rotation alone may not be the answer.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can Earth not cool by conduction alone?',
              answerOutline:
                'The conductive timescale R^2/kappa for Earth is far longer than the age of the universe; mantle convection is needed to carry heat to the surface.',
            },
            {
              question: 'What are the three requirements for a planetary dynamo?',
              answerOutline: 'An electrically conducting fluid, convection vigorous enough to drive it, and rotation to organise the flow.',
            },
            {
              question: 'Why was radiogenic heating more important early in solar-system history?',
              answerOutline:
                'Short-lived isotopes (Al-26) and larger abundances of U-235 and K-40 produced far more heat per kilogram; production has decayed by factors of several since.',
            },
          ],
        },
        {
          slug: 'surfaces-and-cratering-chronology',
          title: 'Surface processes and the cratering clock',
          summary:
            'Reading planetary surfaces: impact crater formation and scaling, crater counting and absolute chronology, and the volcanic, tectonic and erosional processes that compete with it.',
          estimatedMinutes: 100,
          objectives: [
            'Describe impact crater formation and the scaling between impactor size, velocity and crater diameter',
            'Explain the crater size-frequency distribution and how crater counts are converted to absolute ages using lunar calibration',
            'Interpret surface features on the Moon, Mars, Venus and icy moons in terms of volcanism, tectonics, erosion and resurfacing',
            'Estimate the age of a surface from a crater count including the uncertainty',
          ],
          concepts: [
            'Crater formation: contact, excavation, modification',
            'Simple vs complex craters; the transition diameter',
            'Crater scaling $D \\propto E^{1/3.4}$ (gravity regime)',
            'Size-frequency distribution; cumulative N(>D) and R-plots',
            'Lunar calibration from Apollo samples; the Neukum chronology',
            'Saturation equilibrium',
            'Resurfacing: volcanism, tectonics, erosion, sublimation',
          ],
          explanation: `Every solid surface in the solar system records impacts, and that record is the main clock we have for surfaces we cannot sample. An impactor at 10-40 km/s transfers its kinetic energy in a shock that excavates a bowl far larger than the projectile: a crater's diameter scales roughly as $D \\propto E^{1/3.4}$ in the gravity-dominated regime and is typically 10-20 times the impactor size. Small craters are **simple** bowls; above a transition diameter (about 15 km on the Moon, 3 km on Earth, scaling inversely with gravity) the walls collapse to form **complex** craters with central peaks, terraces and, for the largest, multiple rings.

The impactor population has a steep size distribution, so a surface accumulates many more small craters than large ones. The **cumulative size-frequency distribution** $N(>D)$ per unit area, plotted on log axes or as an R-plot normalised to a $D^{-3}$ power law, is the basic measurement. Its *shape* reflects the impactor population and secondaries; its *level* reflects exposure age. The absolute calibration comes from the Moon: Apollo and Luna samples give radiometric ages for surfaces whose crater densities were measured, defining the **lunar chronology function**, which shows a heavy early bombardment declining steeply until about 3.5 Gyr ago and roughly constant since. Scaling to Mars or Mercury requires modelling the different impact rates and velocities, which is the dominant systematic. A very old surface reaches **saturation**, where new craters erase old ones as fast as they form and the count stops increasing: the lunar highlands.

Crater counting is only useful because other processes compete. **Volcanism** resurfaces (the lunar maria, the Tharsis plains, Venus wholesale around 500 Myr ago, Io continuously). **Tectonics** deforms (Earth's plates, Venus's folded ridges, the grooves of Ganymede). **Erosion** by water, wind and ice erases craters on Earth, Mars and Titan, while **sublimation** and ice flow reshape icy bodies; Europa's surface has so few craters that it must be under 100 Myr old, and Pluto's Sputnik Planitia has none at all. Each world is a different balance, and reading it is comparative planetology. Read OpenStax 9.3 and the MIT 12.002 cratering lecture, then count real craters in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 9.3 Impact Craters',
              url: 'https://openstax.org/books/astronomy-2e/pages/9-3-impact-craters',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'MIT OCW 12.002 Physics and Chemistry of the Terrestrial Planets — lecture notes',
              url: 'https://ocw.mit.edu/courses/12-002-physics-and-chemistry-of-the-terrestrial-planets-fall-2008/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on impact cratering and surface chronology.',
            },
            {
              title: 'NASA Planetary Data System',
              url: 'https://pds.nasa.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Raw and calibrated imagery from every NASA planetary mission (LRO, MRO, Cassini, New Horizons).',
            },
            {
              title: 'Planet Four (Zooniverse)',
              url: 'https://www.zooniverse.org/projects/mschwamb/planet-four',
              type: 'interactive',
              cost: 'free',
              provider: 'Zooniverse',
              note: 'Citizen-science mapping of seasonal surface features on Mars from HiRISE images.',
            },
          ],
          exercises: [
            {
              slug: 'crater-count-chronology',
              title: 'Date a lunar mare with a crater count',
              prompt:
                'Obtain an LRO WAC image of a region of Mare Imbrium or Mare Serenitatis of known area (the PDS or LRO QuickMap). Measure the diameters of all craters larger than 1 km (at least 50). Build the cumulative size-frequency distribution per km^2 and compare its slope with the production function exponent of about -2 (cumulative). Read off N(>1 km) and convert to an age using the Neukum chronology function N(1) = 5.44e-14 (exp(6.93 T) - 1) + 8.38e-4 T (N per km^2, T in Gyr). Estimate the uncertainty from Poisson counting statistics and compare with the Apollo sample ages for that mare.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'crater-scaling',
              title: 'From crater to impactor',
              prompt:
                'Using the Pi-scaling relation for the gravity regime (D_transient = 1.16 (rho_i/rho_t)^(1/3) L^0.78 v^0.44 g^-0.22 for a vertical impact, with final D about 1.25 D_transient for simple craters), estimate the impactor diameter L for Meteor Crater (D = 1.2 km, iron impactor, v = 15 km/s), for Tycho on the Moon (D = 85 km), and for Chicxulub (D = 180 km). Compute each impact energy and compare with the energies from the intro-astronomy impact exercise.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'surface-age-comparison',
              title: 'Rank the surfaces',
              prompt:
                'For the lunar highlands, lunar maria, Mercury\'s plains, Venus, Mars\'s southern highlands, Mars\'s northern plains, Europa, Enceladus\'s south polar terrain, Io and Pluto\'s Sputnik Planitia, write a table with the approximate crater retention age, the dominant resurfacing process, and the evidence. Then write a paragraph on why crater ages on icy moons are far more uncertain than on the Moon.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a crater count give an absolute age only for the Moon directly?',
              answerOutline:
                'Only lunar surfaces have both crater counts and radiometrically dated samples; other bodies require scaling the impact flux and velocities, adding model uncertainty.',
            },
            {
              question: 'What does a saturated surface tell you?',
              answerOutline:
                'It is older than the time to reach equilibrium between crater formation and erasure; the count gives only a lower limit on age.',
            },
            {
              question: 'Why do complex craters form at smaller diameters on Earth than on the Moon?',
              answerOutline: 'The simple-to-complex transition scales inversely with surface gravity; Earth\'s higher g causes wall collapse at smaller sizes.',
            },
          ],
        },
        {
          slug: 'moons-rings-and-icy-worlds',
          title: 'Moons, rings and the ocean worlds',
          summary:
            'The satellite systems of the giant planets as miniature planetary systems: regular and irregular moons, ring dynamics, tidal heating and the evidence for subsurface oceans.',
          estimatedMinutes: 100,
          objectives: [
            'Distinguish regular and irregular satellites and explain their origins',
            'Describe ring structure in terms of resonances, shepherding and the Roche limit, and discuss ring ages',
            'Summarise the evidence for subsurface oceans on Europa, Enceladus, Ganymede and Titan',
            'Explain the Moon\'s origin by giant impact and the evidence for it',
          ],
          concepts: [
            'Regular satellites: prograde, coplanar, formed in a circumplanetary disk',
            'Irregular satellites: captured, inclined, retrograde',
            'Ring particles, density waves, gaps and shepherd moons',
            'Ring ages from pollution and viscous spreading',
            'Induced magnetic fields as ocean detectors',
            'Enceladus plumes and Cassini sampling',
            'Titan: methane cycle and thick atmosphere',
            'Giant-impact origin of the Moon; isotopic evidence',
          ],
          explanation: `Each giant planet has a satellite system that recapitulates the solar system in miniature. The **regular satellites** orbit prograde, near the equatorial plane, on nearly circular orbits, and formed in a circumplanetary disk; the Galilean moons even show a compositional gradient, from rocky Io to icy Callisto, that mirrors the solar frost line. The **irregular satellites**, small, distant, inclined and often retrograde, are captured objects; Triton, large and retrograde, is a captured Kuiper belt object whose tidal evolution will eventually destroy it.

**Rings** lie inside the Roche limit, where tides prevent accretion. Saturn's are the archetype: ice particles from dust to house size, only tens of metres thick, sculpted by **resonances** with moons (the Cassini division at the 2:1 resonance with Mimas, density and bending waves launched at hundreds of resonances) and by small **shepherd moons** that confine narrow rings and ring edges through angular-momentum exchange. The rings spread viscously and are darkened by meteoroid pollution, and Cassini's measurement of their mass and pollution rate suggests they are only 100-400 million years old, a recent event, perhaps a disrupted moon or comet. Jupiter, Uranus and Neptune have thin, dark rings.

The great discovery of the past three decades is the **ocean worlds**. Europa's surface is young, cracked and shows chaos terrain; Galileo measured an **induced magnetic field** that requires a conducting layer, a salty ocean beneath 10-30 km of ice, kept liquid by tidal heating. **Enceladus** vents water, salts, silica and organic molecules from tiger-stripe fractures at its south pole, which Cassini flew through and sampled, implying a global ocean in contact with a rocky core. Ganymede has a deeper ocean sandwiched between ice layers, and Titan has one beneath its icy crust, above which runs a methane hydrological cycle with rain, rivers and lakes under a nitrogen atmosphere thicker than Earth's. These are the leading targets for life beyond Earth, and Europa Clipper and JUICE are on their way.

Our own Moon has an origin story the giant planets' moons do not: a **giant impact** of a Mars-sized body with the proto-Earth, which explains the Moon's small iron core, its depletion in volatiles, the Earth-Moon angular momentum, and the identical oxygen-isotope ratios of lunar and terrestrial rocks. Read OpenStax 12.1-12.4 and the mission pages, then do the exercises on real satellite data.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 12.1 Ring and Moon Systems Introduced',
              url: 'https://openstax.org/books/astronomy-2e/pages/12-1-ring-and-moon-systems-introduced',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 12.2 The Galilean Moons of Jupiter, 12.3 Titan and Triton, 12.4 Pluto and Charon, 12.5 Planetary Rings.',
              primary: true,
            },
            {
              title: 'NASA Science — Cassini mission',
              url: 'https://science.nasa.gov/mission/cassini/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Ring science, Enceladus plume sampling and Titan results.',
            },
            {
              title: 'JPL — Planetary Satellite Mean Orbital Parameters',
              url: 'https://ssd.jpl.nasa.gov/sats/elem/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA JPL',
              note: 'Elements of all known satellites for the regular/irregular exercise.',
            },
            {
              title: 'OpenStax Astronomy 2e — 9.2 The Lunar Surface',
              url: 'https://openstax.org/books/astronomy-2e/pages/9-2-the-lunar-surface',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 9.4 The Origin of the Moon for the giant-impact hypothesis.',
            },
          ],
          exercises: [
            {
              slug: 'regular-vs-irregular',
              title: 'Classify Jupiter\'s and Saturn\'s moons',
              prompt:
                'From the JPL satellite elements, plot inclination against semi-major axis (in planetary radii, log scale) for all moons of Jupiter and Saturn, marking retrograde orbits (i > 90) and sizing points by radius where known. Identify the regular and irregular populations and the prograde and retrograde irregular groups. Compute the Hill radius of each planet and show where the irregulars sit relative to it. Explain why the irregulars cluster in families.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'ring-resonances',
              title: 'Resonances in Saturn\'s rings',
              prompt:
                'Compute the orbital radii in Saturn\'s rings corresponding to the 2:1, 3:2, 4:3 and 5:4 inner Lindblad resonances with Mimas, Janus and Prometheus (resonance at the radius where the ring particle period is (m-1)/m times the moon\'s). Compare with the radii of the Cassini division (117,500-122,000 km), the B-ring edge, and the A-ring edge (136,800 km). Compute the Roche limit for ice and compare with the outer edge of the main rings and the orbit of the innermost moon that is not inside the rings.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'ocean-detection-induction',
              title: 'Detecting an ocean by magnetic induction',
              prompt:
                'Jupiter\'s tilted magnetic field sweeps past Europa with a period of 11.2 hours, inducing currents in any conducting layer. The induced dipole amplitude relative to the driving field depends on the layer\'s conductivity, thickness and depth. Using the simple skin-depth estimate delta = sqrt(2/(mu0 sigma omega)), compute the skin depth for seawater-like conductivity (3 S/m) at that period and argue that an ocean tens of km thick responds nearly perfectly while an icy shell does not. Then explain what Galileo measured and why the ice-shell thickness remains uncertain.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What distinguishes a regular from an irregular satellite and why?',
              answerOutline:
                'Regular: prograde, low inclination, close, formed in the planet\'s disk; irregular: distant, inclined or retrograde, captured from heliocentric orbit.',
            },
            {
              question: 'What is the strongest evidence for Europa\'s ocean?',
              answerOutline:
                'Galileo\'s detection of an induced magnetic field varying with Jupiter\'s rotation, requiring a near-surface global conducting layer, consistent with a salty ocean.',
            },
            {
              question: 'What evidence supports the giant-impact origin of the Moon?',
              answerOutline:
                'The Moon\'s small iron core, volatile depletion, the Earth-Moon system\'s high angular momentum, and identical oxygen isotope ratios in lunar and terrestrial rocks.',
            },
          ],
        },
      ],
    },
    {
      slug: 'atmospheres-and-climate',
      title: 'Atmospheres and Climate',
      description:
        'The physics of planetary atmospheres: radiative balance and the greenhouse effect, vertical structure, atmospheric escape, and the divergent climate histories of the terrestrial planets.',
      lessons: [
        {
          slug: 'radiative-equilibrium-and-the-greenhouse-effect',
          title: 'Radiative equilibrium and the greenhouse effect',
          summary:
            'Equilibrium temperature from energy balance, albedo, and how an infrared-absorbing atmosphere warms the surface, from a one-layer model to real greenhouse gases.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the equilibrium temperature of a planet from absorbed and emitted power',
            'Explain the one-layer and n-layer greenhouse models and compute their surface temperatures',
            'Identify why CO2, H2O and CH4 are greenhouse gases and N2 and O2 are not',
            'Compare equilibrium and observed temperatures across the solar system and explain the differences',
          ],
          concepts: [
            'Stellar flux $S = L/4\\pi d^2$',
            'Bond albedo A',
            'Equilibrium temperature $T_{eq} = [S(1-A)/4\\sigma]^{1/4}$',
            'Day-night redistribution factor',
            'One-layer greenhouse: $T_s = 2^{1/4} T_{eq}$',
            'Optical depth and the emission level',
            'Molecular vibration bands; the 15 micron CO2 band',
            'Climate feedbacks: water vapour, ice-albedo',
          ],
          explanation: `A planet's temperature is set by balancing absorbed starlight against emitted infrared. It intercepts flux $S = L_*/4\\pi d^2$ over its cross-section $\\pi R^2$ and reflects a fraction $A$ (the **Bond albedo**), so it absorbs $\\pi R^2 S(1-A)$. If it radiates as a blackbody from its whole surface $4\\pi R^2$, balance gives the **equilibrium temperature**
$$T_{\\rm eq} = \\left[\\frac{S(1-A)}{4\\sigma}\\right]^{1/4} = 279\\,\\mathrm{K}\\,(1-A)^{1/4}\\left(\\frac{d}{\\mathrm{AU}}\\right)^{-1/2}\\left(\\frac{L_*}{L_\\odot}\\right)^{1/4}.$$
The factor 4 assumes heat is redistributed around the planet; a tidally locked planet with no redistribution has a dayside hotter by up to $(8/3)^{1/4}$, a distinction that matters for hot Jupiters. Earth's $T_{\\rm eq}$ is 255 K; its mean surface is 288 K. The 33 K difference is the **greenhouse effect**.

The mechanism: the atmosphere is nearly transparent to visible sunlight but absorbs much of the planet's thermal infrared. In the simplest **one-layer model**, a layer absorbing all infrared re-emits half upward and half down, so the surface receives sunlight plus back-radiation and must warm to $T_s = 2^{1/4}T_{\\rm eq}$. Adding $n$ opaque layers gives $T_s = (n+1)^{1/4}T_{\\rm eq}$, which explains Venus qualitatively: its CO$_2$ atmosphere has an infrared optical depth of order 100. A better picture is that the planet radiates to space from the **emission level**, where the infrared optical depth to space is about one; adding absorbers raises that level to colder altitudes, so the surface below, linked by the temperature gradient, must warm to restore balance.

Which gases matter is molecular physics. Symmetric diatomics (N$_2$, O$_2$) have no changing dipole moment and barely interact with infrared; CO$_2$, H$_2$O, CH$_4$ and O$_3$ have vibrational and rotational transitions in the thermal infrared, notably the 15 micron CO$_2$ band near the peak of Earth's emission. **Feedbacks** amplify changes: warmer air holds more water vapour (a greenhouse gas), and melting ice lowers the albedo. These produce runaway or snowball states and set the edges of the habitable zone.

Read OpenStax 8.3 and the MIT 12.003 radiation lectures, then compute the models in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 8.3 Earth\'s Atmosphere',
              url: 'https://openstax.org/books/astronomy-2e/pages/8-3-earths-atmosphere',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'MIT OCW 12.003 Atmosphere, Ocean and Climate Dynamics',
              url: 'https://ocw.mit.edu/courses/12-003-atmosphere-ocean-and-climate-dynamics-fall-2008/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The early lectures on radiative balance and the greenhouse effect (Marshall & Plumb notes).',
            },
            {
              title: 'MIT OCW 12.842 Climate Physics and Chemistry',
              url: 'https://ocw.mit.edu/courses/12-842-climate-physics-and-chemistry-fall-2008/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Graduate-level treatment, including early-Earth and planetary climates.',
            },
            {
              title: 'NASA Planetary Fact Sheet',
              url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Bond albedos and observed temperatures.',
            },
          ],
          exercises: [
            {
              slug: 'equilibrium-temperatures-table',
              title: 'Equilibrium versus actual temperatures',
              prompt:
                'For Mercury, Venus, Earth, Mars, Jupiter, Saturn, Titan and Pluto, compute T_eq from the fact-sheet Bond albedos and distances, both with full redistribution and dayside-only. Compare with observed mean surface (or 1-bar) temperatures. Classify each discrepancy: greenhouse warming, internal heat (giant planets), or lack of redistribution (Mercury). Compute the internal-to-absorbed power ratio for Jupiter and Saturn from their effective temperatures (124 K and 95 K).',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'n-layer-greenhouse',
              title: 'Grey n-layer greenhouse model',
              prompt:
                'Derive T_s = (n+1)^(1/4) T_eq for n fully absorbing layers by writing the energy balance of each layer. Then implement a partially absorbing single layer with infrared emissivity epsilon and show T_s = T_eq [2/(2-epsilon)]^(1/4). Find the epsilon that reproduces Earth\'s 288 K, and the n that gives Venus\'s 735 K with its T_eq. Discuss why this grey model fails for real atmospheres.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'ice-albedo-bistability',
              title: 'Ice-albedo feedback and snowball states',
              prompt:
                'Build a zero-dimensional energy-balance model C dT/dt = S(1-A(T))/4 - epsilon sigma T^4 with albedo A(T) ramping from 0.6 below 250 K to 0.3 above 280 K and epsilon chosen to reproduce 288 K today. Plot equilibrium T against S from 0.8 to 1.2 times the present solar constant by integrating from cold and warm starts. Show the hysteresis loop and find the S at which Earth would fall into a snowball state and the S needed to escape.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is there a factor of 4 in the equilibrium temperature formula?',
              answerOutline: 'The planet absorbs over its cross-section pi R^2 but radiates over its whole surface 4 pi R^2 (assuming full heat redistribution).',
            },
            {
              question: 'Why are N2 and O2 not greenhouse gases?',
              answerOutline: 'Symmetric diatomic molecules have no dipole moment change in vibration, so they have no strong infrared absorption bands.',
            },
            {
              question: 'Explain the greenhouse effect in terms of the emission level.',
              answerOutline:
                'The planet radiates to space from where IR optical depth is ~1; more absorber raises that level to colder altitudes, reducing emission, so the surface and lower atmosphere warm until balance is restored.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/radiation-and-spectra/blackbody-radiation'],
        },
        {
          slug: 'vertical-structure-and-scale-height',
          title: 'Vertical structure: hydrostatic atmospheres, scale height and lapse rates',
          summary:
            'Why pressure falls exponentially with height, the adiabatic lapse rate and convection, temperature profiles of real atmospheres, and clouds.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the barometric law and compute scale heights for planetary atmospheres',
            'Derive the dry adiabatic lapse rate and explain when an atmosphere convects',
            'Interpret the temperature profiles of Earth, Venus, Mars, Titan and Jupiter (troposphere, stratosphere, thermosphere)',
            'Explain condensation clouds and why each planet has different cloud species at different levels',
          ],
          concepts: [
            'Hydrostatic equilibrium in an ideal-gas atmosphere',
            'Scale height $H = kT/\\mu m_H g$',
            'Dry adiabatic lapse rate $\\Gamma = g/c_p$',
            'Convective (Schwarzschild) stability criterion',
            'Troposphere, tropopause, stratosphere, thermosphere',
            'Stratospheric heating by ozone or haze absorption',
            'Condensation curves and cloud decks',
          ],
          explanation: `An atmosphere in hydrostatic equilibrium obeys $dP/dz = -\\rho g$; with the ideal gas law $\\rho = \\mu m_H P/kT$ this gives, for constant temperature,
$$P(z) = P_0\\,e^{-z/H},\\qquad H = \\frac{kT}{\\mu m_H g}.$$
The **scale height** $H$ is the height over which pressure falls by a factor $e$. Earth's is 8.5 km; Venus's 15 km; Mars's 11 km (low gravity offsets low temperature); Titan's 20 km; Jupiter's 27 km. Scale height also sets how large an atmosphere looks in transmission against its star: the signal of an exoplanet atmosphere scales as $2HR_p/R_*^2$, so hot, low-gravity, hydrogen-rich planets are the easiest to study.

Temperature does not stay constant. Near the surface, sunlight absorbed by the ground heats the air from below. A rising parcel expands adiabatically and cools at the **dry adiabatic lapse rate**
$$\\Gamma_d = \\frac{g}{c_p},$$
9.8 K/km on Earth, 10.5 on Venus, 4.5 on Mars. If the actual temperature falls faster than this with height, a displaced parcel stays warmer than its surroundings and keeps rising: the layer **convects** (Schwarzschild criterion). The convecting lower region is the **troposphere**, where weather happens; condensation releases latent heat and lowers the lapse rate (Earth's mean is 6.5 K/km). Above the **tropopause**, near 0.1 bar on almost every planet with a thick atmosphere, radiation dominates; where the gas absorbs sunlight (ozone on Earth, haze on Titan, methane on the giants) temperature rises again in a **stratosphere**. Higher still, extreme-ultraviolet heating produces a hot, tenuous **thermosphere**, the base of escape.

**Clouds** form where the temperature profile crosses a species' condensation curve. On Earth, water; on Venus, sulphuric acid at 50-70 km; on Mars, water ice and CO$_2$ ice; on Jupiter, layered ammonia, ammonium hydrosulphide and water clouds at increasing depth; on Titan, methane. Clouds raise albedo and complicate exoplanet spectra by muting absorption features. Read the MIT 12.003 notes on vertical structure and OpenStax 11.3, then compute and compare profiles in the exercises.`,
          resources: [
            {
              title: 'MIT OCW 12.003 Atmosphere, Ocean and Climate Dynamics — lecture notes',
              url: 'https://ocw.mit.edu/courses/12-003-atmosphere-ocean-and-climate-dynamics-fall-2008/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Chapters on hydrostatic balance, convection and the lapse rate.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 11.3 Atmospheres of the Giant Planets',
              url: 'https://openstax.org/books/astronomy-2e/pages/11-3-atmospheres-of-the-giant-planets',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'OpenStax Astronomy 2e — 10.3 The Massive Atmosphere of Venus',
              url: 'https://openstax.org/books/astronomy-2e/pages/10-3-the-massive-atmosphere-of-venus',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'NASA Planetary Data System',
              url: 'https://pds.nasa.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Atmospheric profiles from entry probes and radio occultations (Galileo probe, Huygens, Mars landers).',
            },
          ],
          exercises: [
            {
              slug: 'scale-heights',
              title: 'Scale heights and transmission signals',
              prompt:
                'Compute the scale height of Earth, Venus, Mars, Titan, Jupiter and of the hot Jupiter HD 209458 b (T = 1450 K, g = 9.4 m/s^2, mu = 2.3) and the sub-Neptune GJ 1214 b (T = 550 K, g = 8.9 m/s^2) for both mu = 2.3 and mu = 18 (steam). For the exoplanets compute the transit-depth variation 2 H R_p / R_*^2 over one scale height and multiply by 5 (a typical feature amplitude). Discuss which are accessible to JWST at about 30 ppm precision.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'lapse-rates',
              title: 'Adiabatic lapse rates and convective layers',
              prompt:
                'Derive Gamma_d = g/c_p from the first law of thermodynamics and hydrostatic equilibrium. Compute it for Earth (c_p = 1004 J/kg/K), Venus (CO2, c_p about 1100), Mars and Jupiter (H2, c_p about 12,000). Then, using the Venus International Reference Atmosphere or a published Venus temperature profile (digitise from a figure if needed), compute the actual lapse rate in the lowest 50 km and identify any stable layers.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cloud-condensation',
              title: 'Where do clouds form on Jupiter?',
              prompt:
                'Using a dry-adiabatic profile anchored at 165 K at 1 bar for Jupiter, compute T(P) from 0.1 to 10 bar (T proportional to P^(R/c_p)). Overlay the condensation curves of NH3 and H2O using Clausius-Clapeyron with solar-like abundances (saturation vapour pressure formulas from the literature) and find the cloud-base pressures. Compare with the Galileo probe results and discuss why the probe found the region drier than expected.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Mars have a larger scale height than Earth despite being colder?',
              answerOutline: 'H = kT / (mu m_H g); Mars\'s gravity is 0.38 g_Earth, which more than offsets its lower T and higher mu (CO2).',
            },
            {
              question: 'When does an atmospheric layer convect?',
              answerOutline: 'When the actual temperature decreases with height faster than the adiabatic lapse rate (Schwarzschild criterion), so a rising parcel stays buoyant.',
            },
            {
              question: 'What causes a stratospheric temperature inversion?',
              answerOutline: 'Absorption of sunlight high in the atmosphere (ozone UV on Earth, haze or methane on Titan and giants) heats those layers above the tropopause.',
            },
          ],
        },
        {
          slug: 'atmospheric-escape',
          title: 'Atmospheric escape and evolution',
          summary:
            'How planets lose their atmospheres: thermal (Jeans and hydrodynamic) escape, non-thermal processes, and the evidence from isotopes and from evaporating exoplanets.',
          estimatedMinutes: 100,
          objectives: [
            'Compute the Jeans escape parameter and decide which gases a body can retain',
            'Explain hydrodynamic and energy-limited escape and apply them to young planets and hot exoplanets',
            'Describe non-thermal escape (sputtering, ion pickup, photochemical) and the role of magnetic fields',
            'Use isotope ratios (D/H, 15N/14N, Ar isotopes) as evidence of past escape',
          ],
          concepts: [
            'Thermal speed $v_{th} = \\sqrt{2kT/m}$ and escape speed',
            'Jeans parameter $\\lambda = GMm/kTr$',
            'Exobase',
            'Hydrodynamic and energy-limited escape $\\dot M \\approx \\epsilon \\pi F_{XUV} R^3 / GM$',
            'Non-thermal escape and the solar wind',
            'Isotopic fractionation; Venus D/H',
            'Photoevaporation and the radius valley',
            'Helium 1083 nm and Lyman-alpha transits',
          ],
          explanation: `Gas molecules have a Maxwell distribution of speeds; at the **exobase**, the altitude above which collisions are rare, the fast tail escapes if it exceeds the escape speed. The ratio of gravitational to thermal energy, the **Jeans parameter** $\\lambda = GMm/(kTr) = (v_{\\rm esc}/v_{\\rm th})^2$, controls the rate: escape over the age of the solar system is significant if $\\lambda$ is below about 20-30, i.e. if the escape speed is less than about six times the thermal speed. This is why the Moon has no atmosphere, why Earth loses hydrogen but keeps nitrogen, and why the giants keep everything. Remember to use the exobase temperature (1000 K or more on Earth, heated by extreme ultraviolet), not the surface temperature.

When the upper atmosphere is heated strongly enough, escape becomes a bulk outflow, **hydrodynamic escape**, carrying heavier species along with hydrogen. A useful estimate is **energy-limited escape**: a fraction $\\epsilon \\sim 0.1$ of the absorbed X-ray and EUV energy lifts gas out of the potential well, giving $\\dot M \\approx \\epsilon\\pi F_{\\rm XUV}R^3/GM$. Young stars emit 100-1000 times more XUV than today, so most escape happened in the first few hundred million years. For close-in exoplanets this **photoevaporation** strips the hydrogen envelopes of small planets and is a leading explanation for the observed **radius valley** near 1.8 Earth radii between super-Earths and sub-Neptunes (core-powered mass loss is the competitor). Escape is observed directly: hot Jupiters show extended hydrogen in Lyman-alpha transits several percent deep, and metastable helium at 1083 nm traces outflows from the ground.

**Non-thermal** processes matter for heavy species: ions created above the exobase are picked up by the stellar wind, energetic particles sputter atoms off, and dissociative recombination gives atoms escape energy. A global magnetic field deflects the wind but channels escape near the poles, so its protective role is debated.

The record of escape lies in **isotope ratios**. Lighter isotopes escape preferentially, so the residual atmosphere becomes enriched in the heavy one. Venus's D/H ratio is 150 times Earth's, evidence that it once had far more water and lost it; Mars's enriched D/H, $^{15}$N/$^{14}$N and $^{38}$Ar/$^{36}$Ar (measured by Curiosity and MAVEN) record the loss of most of its early atmosphere. Read OpenStax 10.6 and the MIT 12.842 escape notes, then do the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 10.6 Divergent Planetary Evolution',
              url: 'https://openstax.org/books/astronomy-2e/pages/10-6-divergent-planetary-evolution',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'MIT OCW 12.842 Climate Physics and Chemistry',
              url: 'https://ocw.mit.edu/courses/12-842-climate-physics-and-chemistry-fall-2008/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on atmospheric evolution of the terrestrial planets.',
            },
            {
              title: 'NASA Science — Mars (MAVEN results)',
              url: 'https://science.nasa.gov/mars/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Atmospheric loss measurements and isotope ratios.',
            },
            {
              title: 'NASA Exoplanet Archive — Planetary Systems Composite table',
              url: 'https://exoplanetarchive.ipac.caltech.edu/docs/pscp_about.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              note: 'Radii and insolations for the radius-valley exercise.',
            },
          ],
          exercises: [
            {
              slug: 'jeans-parameter-table',
              title: 'Who keeps what?',
              prompt:
                'Compute the Jeans parameter at the exobase for H, He, N2 and CO2 on the Moon (T_exo 400 K), Mars (250 K, exobase 200 km), Earth (1000 K, 500 km), Venus (300 K, 200 km), Titan (150 K, 1500 km) and Jupiter (1000 K). Mark lambda < 15 (fast escape), 15-30 (significant over 4.5 Gyr) and > 30 (retained). Explain the outcome for each body and why Titan keeps a thick N2 atmosphere while Ganymede, similar in size, has none.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'radius-valley',
              title: 'Find the radius valley',
              prompt:
                'From the Exoplanet Archive pscomppars table, select planets with radius uncertainty under 10 percent and orbital period under 100 days around FGK stars (Teff 4700-6500 K). Plot a histogram of log radius between 1 and 4 Earth radii and a 2D plot of radius vs insolation flux. Locate the valley and measure its slope in the radius-insolation plane. Compare with the photoevaporation prediction (R_valley proportional to S^0.11 or P^-0.1) and discuss the role of measurement precision (California-Kepler Survey precision vs archive heterogeneity).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'energy-limited-escape',
              title: 'Energy-limited escape from hot planets',
              prompt:
                'Compute energy-limited mass-loss rates (epsilon = 0.1) for HD 209458 b (F_XUV about 1000 erg/s/cm^2), GJ 436 b (about 1300 erg/s/cm^2) and a 5 Earth-mass, 2.5 Earth-radius sub-Neptune at 0.05 AU around a young Sun-like star (F_XUV 100 times today\'s at 1 AU, scaled to 0.05 AU). For each, compute the time to lose 1 percent of the planet mass, and for the sub-Neptune the time to lose a 2 percent H/He envelope. Discuss the consequences for the radius valley.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you use the exobase temperature rather than the surface temperature for Jeans escape?',
              answerOutline: 'Escape happens from the exobase where collisions cease; that layer is heated by EUV to far higher temperatures than the surface.',
            },
            {
              question: 'What does Venus\'s high D/H ratio imply?',
              answerOutline: 'Preferential escape of H over D after water photolysis; Venus once had much more water and lost most of it.',
            },
            {
              question: 'What is the radius valley and one explanation for it?',
              answerOutline:
                'A deficit of planets near 1.5-2 Earth radii separating super-Earths from sub-Neptunes; photoevaporation strips thin H/He envelopes of close-in small planets, leaving bare cores.',
            },
          ],
        },
        {
          slug: 'comparative-climate-venus-earth-mars-titan',
          title: 'Comparative climate: Venus, Earth, Mars and Titan',
          summary:
            'Four worlds with atmospheres that started similarly and diverged: the carbonate-silicate cycle, the runaway greenhouse, the loss of Mars\'s water and Titan\'s methane cycle.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the carbonate-silicate cycle as Earth\'s long-term thermostat',
            'Explain the runaway and moist greenhouse limits and why Venus crossed them',
            'Summarise the geological and isotopic evidence for a warmer, wetter early Mars and the mechanisms of its loss',
            'Describe Titan\'s methane cycle and photochemistry as an analogue hydrological system',
          ],
          concepts: [
            'Carbonate-silicate cycle and weathering feedback',
            'Faint young Sun paradox',
            'Runaway greenhouse limit (~280 W/m^2 outgoing)',
            'Moist greenhouse and water loss',
            'Early Mars valley networks and clay minerals',
            'Mars atmospheric loss and obliquity variations',
            'Titan: methane rain, lakes, haze photochemistry',
            'Atmospheric superrotation (Venus, Titan)',
          ],
          explanation: `Venus, Earth and Mars probably began with similar inventories of water, carbon dioxide and nitrogen. Their climates today, 735 K, 288 K and 210 K, are the outcome of feedbacks acting over billions of years, and understanding them is the basis for predicting the climates of exoplanets.

Earth's long-term thermostat is the **carbonate-silicate cycle**. CO$_2$ dissolved in rain weathers silicate rocks, and the products are carried to the oceans and deposited as carbonates; subduction and volcanism return the CO$_2$. Weathering speeds up when the climate is warm and wet, removing CO$_2$, and slows when cold, letting volcanic CO$_2$ build up. This negative feedback, operating over hundreds of thousands of years, explains why Earth stayed habitable despite the **faint young Sun** being 30 percent dimmer 4 billion years ago, and it requires liquid water, plate tectonics and land.

Venus lost that thermostat. Closer to the Sun, its water evaporated; water vapour adds greenhouse warming, which evaporates more water. Beyond a limiting outgoing infrared flux (about 280 W/m$^2$, the **runaway greenhouse limit**) a moist atmosphere cannot radiate more and the oceans boil entirely. Even below it, a **moist greenhouse** puts water in the upper atmosphere where ultraviolet light splits it and hydrogen escapes. Either way Venus lost its water (the D/H evidence), and without water there was no weathering, so its carbon stayed in the atmosphere as 92 bar of CO$_2$.

Mars went the other way. Its ancient terrains show river valley networks, deltas, lake beds and clay minerals that form in liquid water, so 3.5-4 billion years ago it had a thicker, warmer atmosphere for at least episodes. Small size meant early loss of the dynamo, rapid internal cooling (less volcanic outgassing) and efficient escape to the solar wind (measured by MAVEN), plus loss of CO$_2$ to carbonates. Its chaotic obliquity swings still drive ice migration today.

**Titan** shows a hydrological cycle with a different liquid: methane evaporates from lakes, forms clouds, rains and carves river channels in water-ice bedrock at 94 K. Ultraviolet photolysis of methane builds an orange haze of complex organics and should exhaust the methane in tens of millions of years, so it must be resupplied from the interior. Both Venus and Titan have atmospheres that **superrotate**, circling the planet far faster than the surface. Read OpenStax 10.3-10.6 and the MIT 12.842 notes, then model these systems in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 10.6 Divergent Planetary Evolution',
              url: 'https://openstax.org/books/astronomy-2e/pages/10-6-divergent-planetary-evolution',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 10.4 The Geology of Mars',
              url: 'https://openstax.org/books/astronomy-2e/pages/10-4-the-geology-of-mars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 10.5 Water and Life on Mars.',
            },
            {
              title: 'MIT OCW 12.842 Climate Physics and Chemistry',
              url: 'https://ocw.mit.edu/courses/12-842-climate-physics-and-chemistry-fall-2008/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Carbonate-silicate cycle, faint young Sun and planetary climate evolution.',
            },
            {
              title: 'NASA Science — Venus',
              url: 'https://science.nasa.gov/venus/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Mission results and upcoming VERITAS/DAVINCI goals.',
            },
          ],
          exercises: [
            {
              slug: 'faint-young-sun',
              title: 'The faint young Sun paradox',
              prompt:
                'Using your energy-balance model, compute Earth\'s surface temperature 4 Gyr ago with a Sun 25 percent fainter and today\'s greenhouse (fixed emissivity). Then find the emissivity (equivalently greenhouse strength) needed to keep 288 K. Using a logarithmic CO2 forcing of 5.35 ln(C/C0) W/m^2, estimate the CO2 partial pressure required, and compare with geological constraints from palaeosols (roughly 0.01-0.1 bar in the Archean). Discuss methane as an additional solution.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'weathering-feedback',
              title: 'A toy carbonate-silicate cycle',
              prompt:
                'Model atmospheric CO2 with dC/dt = V - W(T), where V is a constant volcanic outgassing rate and the weathering rate W = W0 exp((T - 288)/13.7) increases with temperature, and T depends on C through the logarithmic forcing in an energy-balance model. Find the steady state for today\'s Sun and for solar luminosities 0.75 to 1.1. Show that the steady-state temperature changes far less than with fixed CO2 and compute the response timescale for a perturbation. Then switch off weathering (no water) to mimic Venus.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'mars-water-inventory',
              title: 'How much water did Mars lose?',
              prompt:
                'Mars\'s atmospheric D/H is about 5-6 times terrestrial. Assuming Rayleigh fractionation during escape with a fractionation factor f = 0.02-0.3 (the fraction of D escaping relative to H), compute the ratio of the initial to present exchangeable water reservoir. If the present polar caps and ground ice correspond to a 20-30 m global equivalent layer, estimate the initial ocean depth for the range of f. Discuss the uncertainties and compare with geomorphological estimates of a northern ocean.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the carbonate-silicate cycle a negative feedback?',
              answerOutline:
                'Warmer, wetter conditions speed silicate weathering, which removes CO2 and cools the planet; cold conditions slow weathering and let volcanic CO2 accumulate and warm it.',
            },
            {
              question: 'What happens beyond the runaway greenhouse limit?',
              answerOutline:
                'Outgoing infrared from a water-rich atmosphere saturates at ~280 W/m^2; if absorbed flux exceeds it, the surface heats until oceans fully evaporate.',
            },
            {
              question: 'Name three lines of evidence for liquid water on early Mars.',
              answerOutline:
                'Valley networks and deltas, lake-bed sediments and clay/sulfate minerals (Curiosity, Perseverance, orbiters), and enriched isotope ratios implying loss of a larger reservoir.',
            },
          ],
        },
      ],
      project: {
        slug: 'planetary-climate-model',
        title: 'Project: a one-dimensional radiative-convective climate model',
        description: `Build a 1D column model with a grey (or two-band) radiative scheme and convective adjustment to the adiabatic lapse rate. Validate it on Earth (surface temperature, tropopause height), then apply it to Venus, Mars and Titan with appropriate surface pressures, compositions and stellar fluxes, and finally to an Earth-like planet at the inner and outer edges of the Sun's habitable zone. Discuss where the grey approximation fails.`,
        deliverables: [
          'Model code with a description of the radiative scheme and convective adjustment',
          'Temperature profiles for the four solar-system bodies compared with measured profiles',
          'A sensitivity study of surface temperature to stellar flux and optical depth, with the runaway behaviour discussed',
        ],
        estimatedHours: 12,
        stretchGoals: ['Replace the grey scheme with a correlated-k or band model using published opacities'],
      },
    },
    {
      slug: 'small-bodies-and-system-formation',
      title: 'Small Bodies and Solar System Formation',
      description:
        'Asteroids, comets, meteorites and the Kuiper belt as fossils of formation, the physics of protoplanetary disks and planet growth, and the migration that rearranged the solar system.',
      lessons: [
        {
          slug: 'asteroids-comets-and-the-kuiper-belt',
          title: 'Asteroids, comets and the Kuiper belt',
          summary:
            'The small-body populations, their physical properties from photometry, spectroscopy and spacecraft, and what their orbits record about the solar system\'s history.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the main small-body reservoirs and their orbital distributions using real catalogue data',
            'Explain asteroid taxonomy (S, C, X types) and how reflectance spectra connect asteroids to meteorites',
            'Derive asteroid sizes from absolute magnitude and albedo and rotation periods and shapes from light curves',
            'Describe comet nuclei, activity and the dynamical pathways from the Kuiper belt and Oort cloud',
          ],
          concepts: [
            'Main belt, Trojans, near-Earth objects, centaurs, Kuiper belt, scattered disk, Oort cloud',
            'Absolute magnitude H and diameter $D = 1329\\,\\mathrm{km}\\,10^{-H/5}/\\sqrt{p_V}$',
            'Spectral types S, C, X and space weathering',
            'Rotation light curves and the spin barrier at 2.2 h',
            'Rubble piles and binary asteroids',
            'Tisserand parameter',
            'Comet activity, sublimation and the dust-to-gas ratio',
            'Yarkovsky and YORP effects',
          ],
          explanation: `Small bodies are the leftovers of planet formation, and their orbits and compositions are a record of how the system was assembled. The **main belt** between 2.1 and 3.3 AU contains over a million asteroids larger than a kilometre but only 4 percent of the Moon's mass; Jupiter's **Trojans** share its orbit at the L4 and L5 points; **near-Earth objects** are main-belt fragments delivered by resonances; **centaurs** cross the giant-planet region; and beyond Neptune lie the classical **Kuiper belt**, the resonant objects (Pluto and the plutinos at 3:2), the **scattered disk**, and the distant **Oort cloud** inferred from long-period comets.

For most asteroids all we have is brightness. The **absolute magnitude** $H$ is the magnitude at 1 AU from both Sun and observer at zero phase; converting it to size requires the geometric albedo $p_V$:
$$D = \\frac{1329\\ \\mathrm{km}}{\\sqrt{p_V}}\\,10^{-H/5}.$$
Albedos range from 0.04 (dark carbonaceous) to 0.4, so an asteroid of known $H$ has a size uncertain by a factor of three until thermal infrared (WISE/NEOWISE) or radar measures it. Reflectance spectra sort asteroids into **taxonomic types**: S-types with silicate absorption bands, linked to ordinary chondrites; dark C-types with hydrated minerals, linked to carbonaceous chondrites; and X-types including metal-rich bodies such as Psyche. The S-types dominate the inner belt and C-types the outer belt, a compositional gradient from formation (partly scrambled by migration). **Space weathering** reddens and darkens surfaces over time.

Brightness variations with rotation give **light curves**, from which rotation periods and shapes follow. Almost no asteroid larger than a few hundred metres spins faster than about 2.2 hours, the **spin barrier** at which a gravitationally bound **rubble pile** would fly apart; Hayabusa2 and OSIRIS-REx confirmed that Ryugu and Bennu are rubble piles. Sunlight absorbed and re-emitted anisotropically produces a tiny thrust (**Yarkovsky effect**) that drifts orbits and a torque (**YORP**) that changes spins, delivering asteroids to resonances over millions of years.

**Comets** come from the Kuiper belt (short-period, Jupiter-family comets, with Tisserand parameter between 2 and 3) and the Oort cloud (long-period comets). Their nuclei are dark, porous mixtures of ice and dust; activity is driven by sublimation of water inside about 3 AU and of CO and CO$_2$ further out. Read OpenStax chapter 13, then work with real catalogue data in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 13.1 Asteroids',
              url: 'https://openstax.org/books/astronomy-2e/pages/13-1-asteroids',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Through 13.4 on comets and their origin.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 13.4 The Origin and Fate of Comets and Related Objects',
              url: 'https://openstax.org/books/astronomy-2e/pages/13-4-the-origin-and-fate-of-comets-and-related-objects',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'JPL Solar System Dynamics APIs (SBDB query, close approaches)',
              url: 'https://ssd-api.jpl.nasa.gov/doc/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA JPL',
              note: 'Query orbital elements, H, albedo and diameter for whole populations.',
            },
            {
              title: 'Minor Planet Center',
              url: 'https://minorplanetcenter.net/',
              type: 'dataset',
              cost: 'free',
              provider: 'IAU Minor Planet Center',
              note: 'Orbit catalogues and observations of all known minor planets and comets.',
            },
            {
              title: 'NASA Science — Asteroids',
              url: 'https://science.nasa.gov/solar-system/asteroids/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Missions: OSIRIS-REx, Lucy, Psyche, DART.',
            },
          ],
          exercises: [
            {
              slug: 'population-plots',
              title: 'Map the small-body populations',
              prompt:
                'Query the JPL SBDB API for all asteroids and comets with known a, e, i and H (a few hundred thousand rows; restrict to numbered objects if needed). Plot e vs a and i vs a from 0.5 to 100 AU (log a), colour-coded by orbit class. Identify the NEOs, main belt, Hildas, Trojans, centaurs, plutinos, classical Kuiper belt and scattered disk. Compute the Tisserand parameter with respect to Jupiter for comets and show that Jupiter-family comets cluster between 2 and 3.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'size-from-h-and-albedo',
              title: 'Sizes and the albedo problem',
              prompt:
                'From the SBDB, select asteroids that have both H and NEOWISE diameters and albedos. Verify the D-H-albedo relation by plotting predicted vs measured diameter. Plot the albedo distribution in the inner (a < 2.5 AU) and outer (a > 2.8 AU) belt and interpret it in terms of S and C types. Then estimate the size range of an asteroid with H = 22 and discuss why planetary-defence surveys define their targets by H.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'spin-barrier',
              title: 'The spin barrier',
              prompt:
                'Derive the critical spin period for a strengthless sphere of density rho by equating centripetal and gravitational acceleration at the equator: P_crit = sqrt(3 pi / (G rho)). Evaluate for rho = 2000 kg/m^3. Then obtain rotation periods and diameters from the Asteroid Lightcurve Database (via VizieR or the LCDB site) or the SBDB rotation field, plot period vs diameter on log axes, and show the barrier and the fast-rotating monoliths below 200 m.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the size of an asteroid known only to a factor of ~3 from its brightness alone?',
              answerOutline: 'Brightness depends on D^2 times albedo; albedos range from ~0.04 to ~0.4, so D scales as 1/sqrt(albedo) over a factor ~3.',
            },
            {
              question: 'What does the 2.2 hour spin barrier tell us about asteroid structure?',
              answerOutline:
                'Most asteroids larger than a few hundred metres cannot spin faster without flying apart, meaning they are gravitationally bound aggregates (rubble piles) with little tensile strength.',
            },
            {
              question: 'How do Jupiter-family and long-period comets differ in origin?',
              answerOutline:
                'Jupiter-family comets come from the Kuiper belt/scattered disk with low inclinations and Tisserand 2-3; long-period comets come from the isotropic Oort cloud with random inclinations.',
            },
          ],
        },
        {
          slug: 'meteorites-and-cosmochemistry',
          title: 'Meteorites and the chronology of the solar system',
          summary:
            'What meteorites are, how radiometric and short-lived isotope dating give the solar system\'s age and the timing of planet formation, and what they reveal about the nebula.',
          estimatedMinutes: 100,
          objectives: [
            'Classify meteorites (chondrites, achondrites, irons, stony-irons) and connect each to its parent body',
            'Explain radiometric dating with isochrons and compute an age from isotope ratios',
            'Explain how short-lived radionuclides (Al-26, Hf-182) date events in the first few million years',
            'Summarise the timeline: CAIs at 4567 Myr, chondrules, differentiated planetesimals, Mars and Earth formation',
          ],
          concepts: [
            'Chondrites, chondrules and CAIs',
            'Achondrites and iron meteorites from differentiated bodies',
            'Radioactive decay $N = N_0 e^{-\\lambda t}$; half-life',
            'Isochron method; Pb-Pb dating',
            'Short-lived radionuclides: Al-26 (0.7 Myr), Hf-182 (9 Myr)',
            'Hf-W core formation chronometer',
            'Isotopic dichotomy: carbonaceous vs non-carbonaceous',
            'Presolar grains',
          ],
          explanation: `Meteorites are the only samples of asteroids (and some of the Moon and Mars) that we can put in a laboratory, and they hold the solar system's clock. Most are **chondrites**, never melted since they formed: aggregates of millimetre **chondrules** (once-molten droplets), metal, fine matrix and **calcium-aluminium-rich inclusions** (CAIs), the first solids to condense from the hot nebula. Carbonaceous chondrites contain water-bearing minerals and organics, even amino acids, and their bulk composition matches the Sun's photosphere for all but the most volatile elements: they are the best sample of the starting material. **Achondrites**, **irons** and **stony-irons** come from **differentiated** bodies, asteroids that melted and separated cores from mantles; iron meteorites are fragments of shattered cores.

Ages come from **radioactive decay**. A parent isotope decays to a daughter with half-life $t_{1/2}$, so $N = N_0 e^{-\\lambda t}$ with $\\lambda = \\ln 2/t_{1/2}$. Because the initial daughter amount is unknown, geochronologists use **isochrons**: minerals that formed together incorporated different parent/daughter ratios, and plotting daughter/stable against parent/stable gives a straight line whose slope is $e^{\\lambda t} - 1$. The **Pb-Pb** method, using two uranium decay chains, gives CAIs an age of 4567.3 $\\pm$ 0.2 Myr, the defining zero of solar-system history.

Finer timing within the first few million years comes from **short-lived radionuclides** now extinct but once present, inferred from excesses of their daughters. **Aluminium-26** (half-life 0.72 Myr) shows chondrules formed 1-3 Myr after CAIs; its decay heat also melted early planetesimals, which is why bodies that formed earlier differentiated and later ones (chondrite parents) did not. **Hafnium-182** decays to tungsten (9 Myr) and partitions differently into metal and silicate, timing core formation: iron-meteorite parent bodies within about 1 Myr, Mars within a few Myr (so Mars is a stranded planetary embryo), Earth over tens of Myr, ending with the Moon-forming impact.

Isotopes also reveal structure. Meteorites fall into two isotopically distinct groups, **carbonaceous** and **non-carbonaceous**, apparently separated early by the growing Jupiter acting as a barrier, the first evidence of Jupiter's formation time. **Presolar grains** with exotic isotopes are dust from other stars that survived. Read OpenStax 14.2-14.3 and the MIT 12.002 lectures on chronology, then compute ages in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 14.1 Meteors (and 14.2 Meteorites: Stones from Heaven)',
              url: 'https://openstax.org/books/astronomy-2e/pages/14-1-meteors',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'MIT OCW 12.002 Physics and Chemistry of the Terrestrial Planets — lecture notes',
              url: 'https://ocw.mit.edu/courses/12-002-physics-and-chemistry-of-the-terrestrial-planets-fall-2008/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on meteorites, isotopic dating and early solar-system chronology.',
            },
            {
              title: 'OpenStax Astronomy 2e — 14.3 Formation of the Solar System',
              url: 'https://openstax.org/books/astronomy-2e/pages/14-3-formation-of-the-solar-system',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'NASA Science — OSIRIS-REx sample return (Asteroids)',
              url: 'https://science.nasa.gov/solar-system/asteroids/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Results from the Bennu samples, the first pristine carbonaceous material returned by NASA.',
            },
          ],
          exercises: [
            {
              slug: 'isochron-age',
              title: 'Compute an isochron age',
              prompt:
                'Given Rb-Sr data for minerals from a meteorite (87Rb/86Sr and 87Sr/86Sr pairs: (0.05, 0.70168), (0.30, 0.71240), (0.80, 0.73393), (1.50, 0.76402), (2.20, 0.79415)), fit the isochron by weighted least squares with assumed errors of 0.00005 on Sr ratios, report the slope with uncertainty, and compute the age using lambda(87Rb) = 1.42e-11 /yr. Report the initial 87Sr/86Sr. Explain why the method does not need to know the initial daughter abundance.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'al26-heating',
              title: 'Did Al-26 melt the planetesimals?',
              prompt:
                'Chondritic material had an initial 26Al/27Al of 5e-5 at CAI formation, with aluminium 1.2 percent by mass, decay energy 3.12 MeV per decay and half-life 0.72 Myr. Compute the initial heat production in W/kg, and the total heat released per kg if a body accretes at time t_a after CAIs, for t_a = 0.5, 1, 2 and 3 Myr. Compare with the energy needed to heat rock from 200 K to melting (c = 800 J/kg/K, about 1500 K, plus latent heat 4e5 J/kg). Determine the latest accretion time for melting and relate it to which parent bodies differentiated.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'hf-w-timescale',
              title: 'Hafnium-tungsten core formation',
              prompt:
                'Explain the Hf-W chronometer qualitatively and then compute: if a body\'s core formed instantaneously at time t after CAIs, its mantle tungsten anomaly is proportional to exp(-lambda t) with half-life 8.9 Myr. Given that Mars\'s mantle anomaly is about 40 percent and Earth\'s about 2-3 percent of the maximum possible (rough illustrative values), estimate the core-formation times (with the instantaneous-model caveat). Discuss why Earth\'s value implies protracted accretion with a late giant impact.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are CAIs used to define time zero for the solar system?',
              answerOutline: 'They are the oldest dated solids (Pb-Pb 4567.3 Myr), the first condensates from the hot nebula.',
            },
            {
              question: 'How does an isochron avoid needing the initial daughter abundance?',
              answerOutline:
                'Cogenetic minerals share the same initial daughter ratio; plotting daughter vs parent (normalised to a stable isotope) gives a line whose intercept is the initial ratio and slope gives the age.',
            },
            {
              question: 'Why did early-formed planetesimals melt but later ones did not?',
              answerOutline: 'Al-26 decays with 0.72 Myr half-life; bodies accreting within ~1-2 Myr captured enough to melt and differentiate, later ones not.',
            },
          ],
        },
        {
          slug: 'protoplanetary-disks-and-planet-formation',
          title: 'Protoplanetary disks and planet formation',
          summary:
            'Disk structure and evolution, dust growth to planetesimals, core accretion versus gravitational instability, and the observational evidence from ALMA and young stars.',
          estimatedMinutes: 110,
          objectives: [
            'Describe disk structure (surface density, temperature, scale height) and the minimum-mass solar nebula',
            'Explain the stages of growth from dust to planetesimals, embryos and planets, and the barriers at each stage',
            'Compare core accretion and gravitational instability for giant-planet formation and their timescales',
            'Interpret ALMA images of disk gaps and rings and disk lifetimes from infrared excess',
          ],
          concepts: [
            'Minimum-mass solar nebula $\\Sigma \\propto r^{-3/2}$',
            'Disk scale height $h/r = c_s/v_K$',
            'Radial drift and the metre-size barrier',
            'Streaming instability and pebble accretion',
            'Runaway and oligarchic growth; isolation mass',
            'Core accretion: critical core mass ~10 Earth masses',
            'Gravitational instability and the Toomre Q parameter',
            'Disk lifetimes 3-5 Myr; ALMA rings and gaps',
          ],
          explanation: `Planets form in the disk of gas and dust that surrounds every young star. Spread the solar system's planets back into their solid and gaseous starting material and you get the **minimum-mass solar nebula**, a disk with surface density falling roughly as $r^{-3/2}$ and total mass about 1 percent of the Sun's. The disk is thin: its vertical **scale height** relative to radius is $h/r = c_s/v_K$, a few percent, because gas pressure is weak compared with the star's gravity. Temperature falls outward, placing the water **snow line** at about 3 AU for the young Sun.

Growth spans 40 orders of magnitude in mass. Micron dust sticks by van der Waals forces into fluffy aggregates. But at centimetre to metre sizes two barriers appear: collisions fragment or bounce rather than stick, and because the gas orbits slightly slower than Keplerian (it is partly pressure-supported) solids feel a headwind and **drift radially** into the star in a few hundred orbits. Overcoming this **metre barrier** is the major problem; the leading solution is the **streaming instability**, in which drifting pebbles concentrate into dense filaments that collapse gravitationally directly into 100 km **planetesimals**. Planetesimals then grow by collisions in **runaway growth** (the largest grow fastest because gravitational focusing enhances their cross-section) and then **oligarchic growth**, until each embryo has swept up its feeding zone and reaches the **isolation mass**: about a Mars mass in the inner disk. Adding **pebble accretion**, where embryos efficiently capture drifting pebbles aided by gas drag, speeds growth by orders of magnitude.

Giant planets need something more. In **core accretion**, a core of about 10 Earth masses (easier beyond the snow line where ices add solids) gravitationally captures gas, slowly at first, then in runaway once the envelope mass rivals the core's, and must do so before the gas disk disperses. Disk lifetimes, measured from the fraction of young stars in clusters still showing infrared excess, are only 3-5 million years, which sets the deadline. The alternative, **gravitational instability**, requires a massive cold disk with Toomre $Q = c_s\\kappa/\\pi G\\Sigma < 1$ to fragment directly into giant planets at large radii, possibly explaining wide-orbit giants seen by direct imaging. Terrestrial planets finish later, over 10-100 Myr, by giant impacts among embryos after the gas is gone.

ALMA has made this visible: disks such as HL Tau and those of the DSHARP survey show concentric **rings and gaps** that may be carved by forming planets. Read OpenStax 21.3 and Baruteau et al., then compute the timescales in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 21.1 Star Formation (and 21.3 Evidence That Planets Form around Other Stars)',
              url: 'https://openstax.org/books/astronomy-2e/pages/21-1-star-formation',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'Planet-Disc Interactions and Early Evolution of Planetary Systems (Baruteau et al.)',
              url: 'https://arxiv.org/abs/1312.4293',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Protostars and Planets VI review; sections 1-2 on disk structure and growth.',
            },
            {
              title: 'MIT OCW 12.002 — lecture notes (solar system formation)',
              url: 'https://ocw.mit.edu/courses/12-002-physics-and-chemistry-of-the-terrestrial-planets-fall-2008/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The opening lectures on nebular structure and accretion.',
            },
            {
              title: 'ESO public pages — ALMA images of protoplanetary disks',
              url: 'https://www.eso.org/public/',
              type: 'article',
              cost: 'free',
              provider: 'ESO',
              note: 'Search for HL Tau and DSHARP press releases for the images used in the exercises.',
            },
          ],
          exercises: [
            {
              slug: 'mmsn',
              title: 'Build the minimum-mass solar nebula',
              prompt:
                'Spread each planet\'s heavy-element mass (estimates: terrestrial planets their full mass, Jupiter 10-40, Saturn 15-30, Uranus and Neptune 12-14 Earth masses of heavies) over an annulus extending halfway to its neighbours, and multiply by the gas-to-solid ratio (~100 inside and ~70 outside the snow line) to get gas surface density. Plot Sigma vs r on log axes and fit a power law. Compare with Hayashi\'s 1700 (r/AU)^-1.5 g/cm^2 and compute the total disk mass out to 30 AU.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'radial-drift',
              title: 'The radial-drift problem',
              prompt:
                'The gas orbits at v_K (1 - eta) with eta ~ (h/r)^2 ~ 0.002. Show that a body that couples to the gas with stopping time t_s drifts at v_r = -2 eta v_K St / (1 + St^2) with Stokes number St = t_s Omega. Plot the drift timescale r / |v_r| at 1 AU against St from 1e-4 to 1e2 and find the minimum. Convert St = 1 to a physical particle size using Epstein drag in the MMSN at 1 AU. Explain why this defines the "metre-size barrier".',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'isolation-mass',
              title: 'Isolation masses across the disk',
              prompt:
                'An embryo clears a feeding zone of half-width b = 2 sqrt(3) r_H. Show that the isolation mass is M_iso = (4 pi b r Sigma_solid)^(3/2) / (3 M_sun)^(1/2) times appropriate factors, and evaluate it at 1, 5 and 30 AU for the MMSN solid surface density (7 (r/AU)^-1.5 g/cm^2 inside the snow line, 30 outside). Compare with Mars, the 10 Earth-mass critical core and Uranus/Neptune, and discuss what this implies for forming the giants in time.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do metre-sized bodies drift rapidly toward the star?',
              answerOutline:
                'Pressure-supported gas orbits sub-Keplerian; bodies with stopping time comparable to the orbital time feel a headwind, lose angular momentum and spiral inward in ~100 orbits.',
            },
            {
              question: 'What sets the deadline for giant-planet formation?',
              answerOutline: 'Gas disks disperse within ~3-5 Myr (infrared excess statistics); cores must reach ~10 Earth masses and accrete gas before then.',
            },
            {
              question: 'What does the Toomre Q parameter measure?',
              answerOutline: 'The stability of a rotating disk against self-gravitating collapse; Q < 1 allows fragmentation (gravitational instability).',
            },
          ],
        },
        {
          slug: 'migration-and-the-nice-model',
          title: 'Planetary migration and the dynamical history of the solar system',
          summary:
            'Type I and II migration in disks, the Grand Tack, the Nice model of giant-planet instability, and the evidence for them in the Kuiper belt, Trojans and lunar cratering.',
          estimatedMinutes: 100,
          objectives: [
            'Explain Type I and Type II migration and their timescales',
            'Describe the Grand Tack hypothesis and what it explains about Mars and the asteroid belt',
            'Describe the Nice model and the evidence for a giant-planet instability',
            'Connect migration to exoplanet architectures (hot Jupiters, resonant chains)',
          ],
          concepts: [
            'Disk torques and Type I migration',
            'Gap opening and Type II migration',
            'Grand Tack: Jupiter-Saturn 3:2 resonance reversal',
            'Nice model: planetesimal-driven migration and instability',
            'Resonance sweeping and Pluto\'s eccentricity',
            'Capture of Trojans and irregular satellites',
            'Late heavy bombardment debate',
            'Disk migration vs high-eccentricity migration for hot Jupiters',
          ],
          explanation: `Planets do not stay where they form. A planet embedded in a gas disk launches spiral density waves; the inner and outer waves exert torques that nearly cancel, but not quite, and the net torque usually drives the planet inward. For low-mass planets this **Type I migration** is fast, a few hundred thousand years for an Earth-mass body at 5 AU, faster than the disk lifetime, posing a puzzle (planet traps and corotation torques are the proposed brakes). A planet massive enough (about a Saturn mass) opens a **gap** in the disk and is then locked to the disk's viscous evolution, **Type II migration**, typically inward on the viscous timescale. Migration naturally leads planets into **mean-motion resonances** with each other, explaining the resonant chains common among exoplanets, and disk migration is one route to hot Jupiters (the other being high-eccentricity migration via scattering or Kozai-Lidov cycles followed by tidal circularisation).

In the solar system, the **Grand Tack** hypothesis proposes that Jupiter migrated inward to about 1.5 AU, was caught in the 3:2 resonance by the faster-migrating Saturn, and the pair reversed ("tacked") outward. This would truncate the inner disk at 1 AU, explaining why Mars is so small, and would scatter and mix the asteroid belt, explaining its low mass and the S-type/C-type gradient. It remains debated.

Later, after the gas was gone, the giant planets were probably in a more compact, resonant configuration surrounded by a massive disk of planetesimals. Scattering planetesimals made Saturn, Uranus and Neptune migrate outward and Jupiter slightly inward, until a resonance crossing or close encounter triggered a dynamical **instability**: the **Nice model**. Its predictions match a remarkable list of evidence: the eccentricities and inclinations of the giants; the capture of Jupiter's Trojans with their high inclinations; the capture of irregular satellites; Neptune's outward migration sweeping Pluto and the plutinos into the 3:2 resonance and pumping their eccentricities; the structure of the Kuiper belt; and perhaps a spike in impacts. Whether the lunar **late heavy bombardment** around 3.9 Gyr ago was a real spike or a sampling artefact of Apollo impact-melt ages is now contested, and many models put the instability within the first 100 Myr.

Read Baruteau et al. sections 3-5 and the Yale ASTR 160 lecture on our solar system, then simulate resonance sweeping in the exercises.`,
          resources: [
            {
              title: 'Planet-Disc Interactions and Early Evolution of Planetary Systems (Baruteau et al.)',
              url: 'https://arxiv.org/abs/1312.4293',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections on Type I/II migration and the solar system\'s early dynamical evolution.',
              primary: true,
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 3: Our Solar System and the Pluto Problem',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-3',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
            },
            {
              title: 'REBOUND documentation',
              url: 'https://rebound.hanno-rein.de/',
              type: 'documentation',
              cost: 'free',
              provider: 'Hanno Rein',
              note: 'Examples with additional forces for migration.',
            },
            {
              title: 'OpenStax Astronomy 2e — 12.4 Pluto and Charon',
              url: 'https://openstax.org/books/astronomy-2e/pages/12-4-pluto-and-charon',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
          ],
          exercises: [
            {
              slug: 'resonance-sweeping-pluto',
              title: 'Capture Pluto by Neptune\'s migration',
              prompt:
                'In REBOUND, place the Sun, Jupiter, Saturn, Uranus and Neptune with Neptune at 23 AU, and 100 massless test particles on circular, low-inclination orbits between 25 and 45 AU. Migrate Neptune outward to 30 AU over 10 Myr with an imposed exponential drift. Plot the final e vs a of the test particles and show capture into the 3:2 (39.4 AU) and 2:1 (47.8 AU) resonances with eccentricities pumped to ~0.2-0.3. Compare with the observed plutino distribution from the SBDB.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'type-i-timescale',
              title: 'Type I migration timescales',
              prompt:
                'The Type I migration timescale is approximately t_mig ~ (M_star/M_p) (M_star/(Sigma r^2)) (h/r)^2 Omega^-1. Evaluate it for planets of 0.1, 1, 10 Earth masses at 1 AU and 5 AU in the MMSN with h/r = 0.05. Compare with the disk lifetime and explain why Type I migration is a problem for core accretion. Compute the gap-opening mass (where the Hill radius exceeds the scale height) at 5 AU.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'nice-model-evidence',
              title: 'Weigh the evidence for the Nice model',
              prompt:
                'Write a two-page assessment of the giant-planet instability: list at least six observational constraints (giant-planet orbits, Trojans, irregular satellites, Kuiper belt structure, the asteroid belt, lunar and meteorite impact ages), state how the Nice model accounts for each, and identify the two constraints most in tension with it. Cite at least three papers found via ADS/arXiv.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between Type I and Type II migration?',
              answerOutline:
                'Type I: low-mass planets migrate via net torque from spiral density waves without opening a gap (fast). Type II: gap-opening giants move with the disk\'s viscous evolution (slower).',
            },
            {
              question: 'What does the Grand Tack explain?',
              answerOutline: 'Mars\'s small mass (inner disk truncated near 1 AU) and the low mass and compositional mixing of the asteroid belt.',
            },
            {
              question: 'How did Pluto get into the 3:2 resonance with Neptune?',
              answerOutline: 'As Neptune migrated outward, its 3:2 resonance swept through the disk, capturing Pluto and pumping its eccentricity.',
            },
          ],
        },
      ],
    },
    {
      slug: 'exoplanet-detection-methods',
      title: 'Exoplanet Detection Methods',
      description:
        'Each detection method derived from first principles and practised on real data: radial velocities, transits, transit timing, direct imaging, microlensing and astrometry.',
      lessons: [
        {
          slug: 'the-radial-velocity-method',
          title: 'The radial-velocity method',
          summary:
            'The stellar reflex motion, the Keplerian radial-velocity curve and its semi-amplitude, minimum masses, and fitting real RV data with stellar activity in mind.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the radial-velocity semi-amplitude K and compute it for planets of different masses and periods',
            'Describe the shape of an eccentric RV curve in terms of e and omega',
            'Fit Keplerian orbits to real RV data with a periodogram and RadVel or a least-squares/MCMC fit',
            'Explain stellar jitter and activity, and how they are distinguished from planets',
          ],
          concepts: [
            'Reflex motion about the barycentre',
            'Semi-amplitude $K = (2\\pi G/P)^{1/3} M_p\\sin i / [(M_*+M_p)^{2/3}\\sqrt{1-e^2}]$',
            'Minimum mass $M_p \\sin i$',
            'Keplerian RV model $v_r = K[\\cos(\\nu+\\omega) + e\\cos\\omega] + \\gamma$',
            'Generalised Lomb-Scargle periodogram',
            'Stellar jitter, activity, rotation and granulation',
            'Activity indicators: S-index, bisector span, FWHM',
            'Gaussian-process noise models',
          ],
          explanation: `A planet and its star orbit their common centre of mass, so the star moves on a small orbit with velocity amplitude set by momentum balance. Projected on the line of sight, this gives a periodic Doppler shift with **semi-amplitude**
$$K = \\left(\\frac{2\\pi G}{P}\\right)^{1/3}\\frac{M_p\\sin i}{(M_* + M_p)^{2/3}}\\frac{1}{\\sqrt{1-e^2}} ,$$
which evaluates to 28.4 m/s for a Jupiter mass in a one-year orbit around a solar-mass star, scaling as $M_p P^{-1/3} M_*^{-2/3}$. Jupiter moves the Sun by 12.5 m/s, Earth by 9 cm/s. Because only the line-of-sight component is measured, the method gives $M_p\\sin i$, a **minimum mass**; statistically $\\sin i$ is usually close to 1, and a transit or astrometry fixes it.

The **RV curve** is a sinusoid for a circular orbit. For eccentric orbits
$$v_r(t) = K\\left[\\cos(\\nu(t) + \\omega) + e\\cos\\omega\\right] + \\gamma ,$$
with the true anomaly $\\nu(t)$ from Kepler's equation and $\\gamma$ the systemic velocity; high-eccentricity curves are sharply peaked, with the shape set by $\\omega$. The analysis follows a standard pattern: compute a **generalised Lomb-Scargle periodogram** (floating mean, weighted) to find candidate periods, fit a Keplerian by least squares from the periodogram's best period, examine the residuals' periodogram for more planets, and finish with MCMC for posteriors. **RadVel** packages all of this, including multi-planet models and instrument offsets.

The limiting factor is no longer the spectrograph (the best reach 30 cm/s or better) but the **star**. Convection (granulation), oscillations, and above all magnetic activity (spots and faculae rotating across the disk) produce apparent velocity signals of 1-10 m/s, often at the rotation period and its harmonics, mimicking planets. Defences include monitoring **activity indicators** that track spots but not planets (the Ca II H&K S-index, the CCF bisector span and FWHM, H-alpha), checking that a signal is stable in amplitude and phase over years and consistent across wavelengths, and modelling activity with **Gaussian processes** whose covariance is tied to the rotation period. A signal at or near the rotation period, or correlated with an indicator, is not a planet until proven otherwise; several published planets have been retracted for this reason.

Read Yale lecture 4, the OpenStax 21.4 section, and the RadVel tutorials, then fit real data in the exercises.`,
          resources: [
            {
              title: 'Open Yale ASTR 160 — Lecture 4: Discovering Exoplanets: Hot Jupiters',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-4',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              primary: true,
            },
            {
              title: 'RadVel documentation',
              url: 'https://radvel.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'RadVel',
              note: 'Tutorials fitting K2-24 and other systems; Gaussian-process examples.',
            },
            {
              title: 'MIT OCW 12.425 Extrasolar Planets: Physics and Detection Techniques',
              url: 'https://ocw.mit.edu/courses/12-425-extrasolar-planets-physics-and-detection-techniques-fall-2007/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Seager\'s course: the RV lectures and problem sets.',
            },
            {
              title: 'NASA Exoplanet Archive — data and contributed RV time series',
              url: 'https://exoplanetarchive.ipac.caltech.edu/docs/data.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              note: 'Radial-velocity time series from published papers are available per system.',
            },
          ],
          exercises: [
            {
              slug: 'derive-k',
              title: 'Derive the RV semi-amplitude',
              prompt:
                'Starting from the centre-of-mass condition and Kepler\'s third law, derive K for a circular orbit, then generalise to eccentric orbits. Evaluate K for: Jupiter and Earth around the Sun; a hot Jupiter (1 MJ, 3 d) around a Sun-like star; an Earth-mass planet in the habitable zone of a 0.15 Msun M dwarf (period about 10 d); and Proxima b (1.07 Earth masses minimum, 11.2 d, M* = 0.12). Discuss why M dwarfs are favoured for RV searches for temperate rocky planets.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'fit-51-peg',
              title: 'Rediscover 51 Pegasi b',
              prompt:
                'Download a published RV time series of 51 Peg (from the Exoplanet Archive contributed data or the RadVel example data). Compute a generalised Lomb-Scargle periodogram (astropy LombScargle with errors), identify the period, and fit a Keplerian with RadVel, first with e fixed at 0, then free. Report P, K, e and M_p sin i with posterior uncertainties using emcee via RadVel, and compare with the literature (4.231 d, 56 m/s). Show the phased RV curve with residuals and the residual periodogram.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'activity-false-positive',
              title: 'Activity or planet?',
              prompt:
                'Simulate 200 RV measurements over 300 days for a star with rotation period 25 d, including (a) a planet with K = 3 m/s at P = 12 d, (b) a quasi-periodic activity signal modelled as a Gaussian process with a 25 d period, 3 m/s amplitude and 40 d decay, and (c) 1 m/s white noise. Compute the periodogram and show the activity peaks at P_rot and P_rot/2. Fit (i) a two-Keplerian model and (ii) one Keplerian plus a GP (RadVel or george/celerite). Compare the recovered planet K and discuss which model the Bayesian information criterion prefers.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the RV method give only M sin i?',
              answerOutline: 'Doppler shifts measure only the line-of-sight velocity, which is the true velocity times sin i; the inclination is unknown without another method.',
            },
            {
              question: 'How does K scale with planet period, and why are long-period planets harder to find?',
              answerOutline: 'K proportional to P^(-1/3) (at fixed masses); longer periods give smaller amplitudes and require longer baselines to cover an orbit.',
            },
            {
              question: 'Name three ways to tell stellar activity from a planet signal.',
              answerOutline:
                'Correlation with activity indicators (S-index, bisector, FWHM); period at or near rotation or its harmonics; incoherence (amplitude/phase changes) over time or wavelength dependence.',
            },
          ],
        },
        {
          slug: 'the-transit-method',
          title: 'The transit method',
          summary:
            'Transit geometry and probability, the light-curve shape (depth, duration, ingress, limb darkening), stellar density from transits, and finding and vetting transits in Kepler and TESS data.',
          estimatedMinutes: 120,
          objectives: [
            'Derive transit depth, probability and duration and compute them for real systems',
            'Explain the transit light-curve shape and the information in its ingress, egress and limb darkening',
            'Derive the stellar density from a transit light curve and use it as a vetting check',
            'Detect and vet a transit in a real TESS light curve (BLS, odd-even, secondary eclipse, centroid)',
          ],
          concepts: [
            'Depth $\\delta \\approx (R_p/R_*)^2$',
            'Transit probability $R_*/a$',
            'Impact parameter $b = a\\cos i / R_*$',
            'Total and full durations $T_{14}$, $T_{23}$',
            'Limb darkening (quadratic law)',
            'Stellar density $\\rho_* = 3\\pi (a/R_*)^3 / (G P^2)$',
            'False positives: eclipsing binaries, blends, grazing eclipses',
            'Secondary eclipses and phase curves',
          ],
          explanation: `If the orbit is nearly edge-on, the planet passes in front of its star once per orbit and blocks a fraction of its light:
$$\\delta \\approx \\left(\\frac{R_p}{R_*}\\right)^2 ,$$
1 percent for Jupiter across the Sun, 84 ppm for Earth. The chance that a randomly oriented orbit transits is the **transit probability** $p \\approx R_*/a$: 10 percent for a hot Jupiter, 0.5 percent for Earth. Surveys therefore monitor tens of thousands of stars; Kepler watched 150,000 continuously for four years and TESS observes most of the sky in 27-day sectors.

The light curve has a characteristic shape. The **impact parameter** $b = a\\cos i/R_*$ measures how far from the stellar centre the chord passes. The **total duration** (first to fourth contact) is
$$T_{14} = \\frac{P}{\\pi}\\arcsin\\left[\\frac{R_*}{a}\\frac{\\sqrt{(1+k)^2 - b^2}}{\\sin i}\\right]$$
(with $k = R_p/R_*$, circular orbit), about 13 hours for Earth and 3 hours for a hot Jupiter. **Ingress and egress**, when the planet is partly on the disk, last a fraction $\\sim k/(1-b^2)$ of the transit. The bottom is not flat but curved, because of **limb darkening**: the stellar disk is dimmer at the edge, so the planet blocks more light near the centre; a quadratic law with coefficients from stellar models describes it.

A remarkable consequence is that the light curve alone measures the star's **density**. Duration and ingress fix $a/R_*$ and $b$; with Kepler's third law,
$$\\rho_* = \\frac{3\\pi}{GP^2}\\left(\\frac{a}{R_*}\\right)^3 .$$
If that density disagrees with the star's spectroscopic type, the signal is probably not a planet transiting that star.

That leads to **vetting**, because most transit-like signals are not planets. **Eclipsing binaries** produce V-shaped eclipses, often with alternating depths (check **odd-even** transits) and **secondary eclipses** (a planet's secondary is tiny). **Blends**, where a background eclipsing binary dilutes into the aperture, are revealed by **centroid** shifts during transit. Grazing geometries mimic small planets. Statistical validation tools and radial-velocity follow-up confirm the rest. Finally the transit gives only $R_p/R_*$; the planet radius needs the stellar radius (from Gaia distance and photometry), and its uncertainty dominates. Read Winn's review sections 1-3, work through the lightkurve transit tutorial, then search a real light curve in the exercises.`,
          resources: [
            {
              title: 'Transits and Occultations (Winn 2010)',
              url: 'https://arxiv.org/abs/1001.2010',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The standard reference: geometry, light-curve parameters, durations and stellar density. Sections 1-3.',
              primary: true,
            },
            {
              title: 'Lightkurve documentation — identifying transiting planet signals',
              url: 'https://lightkurve.github.io/lightkurve/',
              type: 'documentation',
              cost: 'free',
              provider: 'Lightkurve / STScI',
              note: 'The tutorial on finding transits with BLS in Kepler and TESS data.',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 5: Planetary Transits',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-5',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
            },
            {
              title: 'Transit Least Squares documentation',
              url: 'https://transitleastsquares.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Hippke & Heller',
              note: 'A limb-darkened transit search that improves on BLS for small planets.',
            },
            {
              title: 'ExoFOP-TESS',
              url: 'https://exofop.ipac.caltech.edu/tess/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              note: 'TESS Objects of Interest with vetting reports and follow-up notes.',
            },
          ],
          exercises: [
            {
              slug: 'transit-numbers',
              title: 'Transit observables for six planets',
              prompt:
                'For Earth, Jupiter, a hot Jupiter (1 RJ, 3 d, Sun-like host), a sub-Neptune (2.5 Re, 10 d, K dwarf of 0.75 Rsun, 0.8 Msun) and TRAPPIST-1 e (0.92 Re, 6.1 d, star 0.12 Rsun, 0.09 Msun), compute the depth, transit probability, central-transit duration and ingress duration. Compare the depths with TESS precision (60 ppm per hour for bright stars, 1000 ppm for faint ones) and state which are detectable in a single transit.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'search-and-vet-tess',
              title: 'Search and vet a TESS light curve',
              prompt:
                'Choose a TOI from ExoFOP that is a confirmed planet and one labelled as an eclipsing-binary false positive. For each: download SPOC 2-min data with lightkurve, flatten (masking nothing at first), run BLS, and phase-fold. Then vet: compare odd and even transit depths (with errors), search for a secondary eclipse at phase 0.5, examine the transit shape (U vs V), compute the implied stellar density and compare with the TIC value, and check centroids in the target pixel file. Write a one-page vetting report for each with a verdict.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'stellar-density-derivation',
              title: 'Stellar density from a light curve',
              prompt:
                'Derive rho_* = 3 pi (a/R_*)^3 / (G P^2) from Kepler\'s third law, then derive the approximate relations between (T_14, T_23, depth, P) and (a/R_*, b) for a circular orbit with small k (Seager & Mallen-Ornelas 2003). Apply them to the phase-folded light curve of your confirmed planet from the previous exercise and compare the density with the TIC. Show how an eccentric orbit would bias the density and how this "photo-eccentric" effect can constrain e.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What fraction of Earth-Sun analogues would show transits to a random observer?',
              answerOutline: 'R_sun/1 AU = 0.0047, about 0.5 percent.',
            },
            {
              question: 'What does a V-shaped transit with unequal odd and even depths suggest?',
              answerOutline: 'An eclipsing binary (grazing or with two different stars), not a planet; planets produce flat-bottomed (limb-darkened U) transits of equal depth.',
            },
            {
              question: 'How can a transit light curve alone measure the host star\'s density?',
              answerOutline: 'Duration and shape give a/R_* and b; with the period and Kepler\'s third law, rho_* = 3 pi (a/R_*)^3 / (G P^2).',
            },
            {
              question: 'Why is the planet radius usually less precise than the radius ratio?',
              answerOutline: 'R_p = k R_* and the stellar radius uncertainty (from models, Gaia distance and photometry) is typically several percent, dominating k\'s uncertainty.',
            },
          ],
          relatedLessons: ['observational-astronomy/astronomical-data-in-python/lightkurve-and-space-based-time-series'],
        },
        {
          slug: 'transit-timing-and-multi-planet-systems',
          title: 'Transit timing variations and multi-planet systems',
          summary:
            'How mutual gravitational interactions shift transit times, measuring masses from TTVs, and what Kepler\'s multi-planet systems reveal about architectures.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the origin of transit timing variations near mean-motion resonances and their super-period',
            'Measure transit times from a light curve and build an O-C diagram',
            'Estimate planet masses from TTV amplitudes and understand the mass-eccentricity degeneracy',
            'Describe the architectures of Kepler multi-planet systems (peas in a pod, period-ratio distribution)',
          ],
          concepts: [
            'Linear ephemeris and O-C diagrams',
            'TTV super-period $P_{sup} = 1/|j/P_2 - (j-1)/P_1|$',
            'TTV amplitude scales with perturber mass and proximity to resonance',
            'Mass-eccentricity degeneracy',
            'Photodynamical modelling',
            'Transit duration variations',
            'Kepler multis: coplanarity, peas in a pod, period-ratio distribution',
          ],
          explanation: `A lone planet on a Keplerian orbit transits at strictly periodic times, $T_n = T_0 + nP$. Add a second planet and their mutual pull shifts each transit slightly early or late: **transit timing variations** (TTVs). Plotting observed minus computed times against epoch, the **O-C diagram**, reveals them. Most TTVs are tiny, but near a mean-motion resonance $j\\!:\\!j\\!-\\!1$ the perturbations add coherently and produce sinusoidal TTVs with the **super-period**
$$P_{\\rm sup} = \\frac{1}{|j/P_2 - (j-1)/P_1|},$$
which can be years even when the orbital periods are days, with amplitudes of minutes to hours. The two planets' TTVs are anti-correlated: one speeds up while the other slows down, a signature that confirms both are real and in the same system.

The TTV amplitude scales with the **perturber's mass** and with proximity to resonance, so TTVs measure planetary masses with no spectroscopy at all, crucial for faint Kepler stars and for compact systems of small planets around which RV signals are tiny. The amplitude also depends on the orbits' eccentricities, producing a **mass-eccentricity degeneracy**: a given TTV can be fitted by a lower mass with higher eccentricity. Breaking it requires the "chopping" signal of individual conjunctions, many years of data, or **photodynamical** modelling, which fits the light curve directly with an N-body integration. TTVs gave the masses of the seven TRAPPIST-1 planets to a few percent and revealed the low densities of the Kepler-11 and Kepler-51 "super-puff" planets.

Kepler's hundreds of **multi-planet systems** revealed regularities. Planets in the same system tend to be similar in size and evenly spaced in log period (**peas in a pod**); systems are very flat (mutual inclinations of a few degrees, since we see several transiting); most adjacent pairs are not in resonance, but there is an excess just wide of the 3:2 and 2:1 resonances, a clue to migration and tidal or disk evolution; and the period ratios are rarely below about 1.2 because of dynamical stability. Read Winn's TTV section and Yale lecture 6, then measure real TTVs in the exercises.`,
          resources: [
            {
              title: 'Transits and Occultations (Winn 2010) — transit timing section',
              url: 'https://arxiv.org/abs/1001.2010',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              primary: true,
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 6: Microlensing, Astrometry and Other Methods',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-6',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
            },
            {
              title: 'NASA Exoplanet Archive — Planetary Systems table',
              url: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              note: 'Multi-planet systems; the archive also hosts the Kepler TTV catalogues.',
            },
            {
              title: 'REBOUND documentation',
              url: 'https://rebound.hanno-rein.de/',
              type: 'documentation',
              cost: 'free',
              provider: 'Hanno Rein',
              note: 'Includes an example computing transit times from an N-body integration.',
            },
          ],
          exercises: [
            {
              slug: 'measure-transit-times',
              title: 'Measure individual transit times',
              prompt:
                'For a TTV system observed by Kepler (e.g. Kepler-9 b and c, or Kepler-36), download all long-cadence quarters with lightkurve, detrend, and fit each transit individually with a fixed-shape template (from the phase-folded fit), allowing only the mid-time and a local baseline to vary. Build the O-C diagram for both planets with error bars, fit a sinusoid with the predicted super-period, and show the anti-correlation. Compare amplitudes with published values.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'simulate-ttvs',
              title: 'Simulate TTVs with REBOUND',
              prompt:
                'Using REBOUND, simulate two planets of 5 and 10 Earth masses around a Sun-like star with periods 10.0 d and 15.15 d (just wide of 3:2). Compute transit times for 4 years (find when each planet crosses the line of sight with bisection on the x coordinate), fit linear ephemerides and plot O-C. Measure the super-period and amplitudes and compare with the formula. Then double the outer planet\'s mass and add e = 0.02 to the inner one, and discuss the mass-eccentricity degeneracy.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'peas-in-a-pod',
              title: 'Peas in a pod',
              prompt:
                'From the Exoplanet Archive, select all systems with three or more transiting planets. For each adjacent pair, compute the radius ratio R_outer/R_inner and the period ratio. Plot the distribution of radius ratios and the correlation of adjacent radius ratios (R_{i+1}/R_i vs R_i/R_{i-1}). Plot the period-ratio histogram and mark the 2:1, 3:2 and 4:3 resonances. Describe the patterns and compare with a randomly shuffled control sample.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are TTVs largest near mean-motion resonances?',
              answerOutline: 'Conjunctions recur at similar orbital longitudes, so perturbations accumulate coherently over the super-period instead of averaging out.',
            },
            {
              question: 'What is the super-period for planets at 10.0 and 15.15 days near 3:2?',
              answerOutline: '1/|3/15.15 - 2/10.0| = 1/|0.19802 - 0.2| = about 505 days.',
            },
            {
              question: 'What is the mass-eccentricity degeneracy in TTV analysis?',
              answerOutline: 'TTV amplitude depends on both perturber mass and orbital eccentricities; similar signals arise from lower mass with higher free eccentricity, so masses are uncertain unless the degeneracy is broken.',
            },
          ],
        },
        {
          slug: 'direct-imaging-microlensing-and-astrometry',
          title: 'Direct imaging, microlensing and astrometry',
          summary:
            'The methods that find planets far from their stars: high-contrast imaging, gravitational microlensing, and Gaia astrometry, with the parameter space each covers.',
          estimatedMinutes: 110,
          objectives: [
            'Compute planet-star contrast in reflected and thermal light and the angular separations accessible to imaging',
            'Explain coronagraphy, adaptive optics and differential imaging and their limits',
            'Explain microlensing light curves, the Einstein radius, and why microlensing finds cold and free-floating planets',
            'Compute astrometric signatures and explain what Gaia astrometry adds, including true masses',
          ],
          concepts: [
            'Reflected-light contrast $\\sim A_g (R_p/a)^2$; thermal contrast',
            'Inner working angle and the diffraction limit',
            'Coronagraphs, ADI and SDI',
            'Young self-luminous giants (HR 8799, beta Pic b)',
            'Einstein radius $\\theta_E = \\sqrt{4GM D_{LS}/(c^2 D_L D_S)}$',
            'Microlensing planetary anomalies; free-floating planets',
            'Astrometric signature $\\alpha = (M_p/M_*)(a/d)$',
            'Gaia astrometric orbits and true masses',
          ],
          explanation: `RV and transits favour planets close to their stars. Three other methods reach the outer regions.

**Direct imaging** separates the planet's light from the star's. The challenge is contrast and separation. In reflected light the planet-star flux ratio is about $A_g(R_p/a)^2$: $10^{-9}$ for Jupiter and $10^{-10}$ for Earth around the Sun. Young giant planets still hot from formation emit in the infrared at contrasts of $10^{-4}$ to $10^{-6}$, which is why every imaged planet so far is a young, massive, wide-orbit giant (HR 8799's four planets, beta Pictoris b, 51 Eridani b). The angular separation is $a/d$: 1 AU at 10 pc is 0.1 arcseconds, close to the diffraction limit of an 8 m telescope in the near-infrared, so imaging needs **adaptive optics**, a **coronagraph** to suppress starlight, and post-processing such as **angular differential imaging** (let the sky rotate so the planet moves and the speckles do not) or **spectral differential imaging**. Each planet gets a spectrum and, with years of monitoring, an orbit. JWST images giants in the mid-infrared, and the Roman Space Telescope coronagraph will test the technology for imaging Earth twins.

**Gravitational microlensing** uses a planet's gravity rather than its light. When a foreground star passes almost exactly in front of a background star, it bends and magnifies the light within its **Einstein radius**
$$\\theta_E = \\sqrt{\\frac{4GM}{c^2}\\frac{D_{LS}}{D_L D_S}},$$
about a milliarcsecond for a star halfway to the bulge, producing a symmetric brightening over weeks. A planet orbiting the lens near the Einstein radius (typically 1-5 AU) adds a short anomaly of hours to days. Microlensing is most sensitive to cold planets near the snow line and even **free-floating planets** with no star, which no other method can find, but events are one-offs and the hosts are usually too faint to study. Surveys (OGLE, MOA, KMTNet, and soon Roman) monitor the dense bulge fields.

**Astrometry** measures the star's wobble in the sky plane: angular amplitude
$$\\alpha = \\frac{M_p}{M_*}\\frac{a}{d},$$
0.5 milliarcseconds for Jupiter seen from 10 pc. This favours massive planets on long orbits around nearby stars and, unlike RV, gives the inclination and hence **true masses**. Gaia's precision makes it the first astrometric planet-finding survey; DR3 already contains astrometric orbits and candidate planets, and the final data release is expected to find thousands of giants. Read Yale lectures 6 and 7 and OpenStax 21.4, then do the exercises.`,
          resources: [
            {
              title: 'Open Yale ASTR 160 — Lecture 7: Direct Imaging of Exoplanets',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-7',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              primary: true,
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 6: Microlensing, Astrometry and Other Methods',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-6',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
            },
            {
              title: 'OpenStax Astronomy 2e — 21.4 Planets beyond the Solar System: Search and Discovery',
              url: 'https://openstax.org/books/astronomy-2e/pages/21-4-planets-beyond-the-solar-system-search-and-discovery',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'Gaia DR3 overview',
              url: 'https://www.cosmos.esa.int/web/gaia/dr3',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
              note: 'The non-single-star catalogue includes astrometric orbits and exoplanet candidates.',
            },
            {
              title: 'MIT OCW 12.425 Extrasolar Planets',
              url: 'https://ocw.mit.edu/courses/12-425-extrasolar-planets-physics-and-detection-techniques-fall-2007/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'contrast-and-separation',
              title: 'Contrast and separation for imaging targets',
              prompt:
                'Compute the reflected-light contrast (A_g = 0.5) and angular separation for: Jupiter and Earth analogues at 10 pc; Proxima b (a = 0.0485 AU, d = 1.30 pc, R about 1.1 Re); and HR 8799 e (a = 16 AU, d = 41 pc). For HR 8799 e also estimate the thermal contrast at 3.8 microns assuming T = 1150 K, R = 1.2 RJ, against an F0 star (7400 K, 1.5 Rsun) using Planck functions. Compare separations with the 3 lambda/D inner working angle of an 8 m telescope at 1.6 microns and of a 6 m space telescope at 0.5 microns.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'microlensing-light-curve',
              title: 'Model a microlensing event',
              prompt:
                'Implement the point-lens magnification A(u) = (u^2 + 2)/(u sqrt(u^2 + 4)) with u(t) = sqrt(u0^2 + ((t - t0)/tE)^2). Plot light curves for u0 = 0.01, 0.1, 0.5 and tE = 20 d. Compute theta_E and tE for a 0.5 Msun lens at 4 kpc and a source at 8 kpc with relative proper motion 5 mas/yr, and for a Jupiter-mass free-floating planet. Explain why the planetary anomaly lasts about tE sqrt(q) and estimate it for q = 1e-3 and 3e-6.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'astrometric-signature',
              title: 'Astrometric signatures and Gaia',
              prompt:
                'Compute the astrometric signature alpha for Jupiter and Earth analogues at 10 and 50 pc, for a hot Jupiter at 50 pc, and for a 3 MJ planet at 3 AU around a 0.3 Msun M dwarf at 20 pc. Compare with Gaia\'s per-scan precision (about 0.03-0.1 mas for bright stars) and the 10 yr mission. Explain why astrometry and RV are complementary (alpha grows with a, K falls with a), and look up one Gaia DR3 astrometric planet candidate and its derived true mass.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are all directly imaged planets young and massive?',
              answerOutline: 'Young giants are hot from formation and bright in the infrared, giving contrasts of 1e-4 to 1e-6 accessible with AO and coronagraphs; old or small planets are far fainter.',
            },
            {
              question: 'What makes microlensing unique among detection methods?',
              answerOutline: 'It detects mass via gravity, not light; it is sensitive to cold planets near the Einstein radius (1-5 AU), low-mass planets and free-floating planets, at kiloparsec distances.',
            },
            {
              question: 'How does astrometry give true masses where RV gives M sin i?',
              answerOutline: 'Astrometry measures the projected orbit on the sky, including its inclination, so the mass is no longer degenerate with sin i.',
            },
          ],
        },
      ],
      project: {
        slug: 'joint-rv-transit-fit',
        title: 'Project: a joint radial-velocity and transit analysis',
        description: `Choose a transiting planet with public radial velocities (e.g. from the Exoplanet Archive contributed time series). Fit the TESS transit and the RVs jointly with shared period and epoch, using emcee or RadVel plus a transit model, and derive the planet's true mass, radius, density, surface gravity and equilibrium temperature with full posterior uncertainties including the stellar parameters. Place the planet on the mass-radius diagram with the composition curves from module 2.`,
        deliverables: [
          'Analysis notebook with data download, joint model, MCMC and diagnostics',
          'Posterior table and corner plot; phase-folded light curve and RV curve with residuals',
          'Mass-radius diagram with composition curves and a paragraph interpreting the planet\'s bulk composition',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'exoplanet-characterisation-and-habitability',
      title: 'Exoplanet Characterisation and Habitability',
      description:
        'What the planets are like: the population and its demographics, bulk compositions, atmospheres from transmission and emission spectroscopy, and the habitable zone and biosignatures.',
      lessons: [
        {
          slug: 'exoplanet-demographics',
          title: 'Exoplanet demographics and occurrence rates',
          summary:
            'The planet population as measured, corrected for detection biases: occurrence rates from Kepler, the radius valley, the hot-Neptune desert, and the metallicity correlation.',
          estimatedMinutes: 100,
          objectives: [
            'Explain how occurrence rates are computed from a survey: detection efficiency, geometric probability and inverse detection weighting',
            'Describe the main features of the population (super-Earth/sub-Neptune dominance, radius valley, hot-Neptune desert, giant-planet metallicity correlation)',
            'Estimate eta-Earth and discuss its uncertainty',
            'Query the Exoplanet Archive and reproduce the main population diagrams with selection effects in mind',
          ],
          concepts: [
            'Detection efficiency from injection-recovery',
            'Geometric transit probability correction',
            'Inverse detection efficiency method',
            'Occurrence rate per star per period-radius bin',
            'Radius valley and hot-Neptune desert',
            'Giant-planet occurrence vs stellar metallicity',
            'M-dwarf planet occurrence',
            'eta-Earth',
          ],
          explanation: `The Exoplanet Archive's raw catalogue is a portrait of what is easy to find, not of what exists. To turn detections into **occurrence rates** (planets per star in a range of period and radius) you need to know, for each star in the survey, the probability that a planet of given properties would have been detected. That probability is the product of the **geometric transit probability** $R_*/a$ and the pipeline's **detection efficiency**, measured by injecting thousands of synthetic transits into the real light curves and recording which are recovered. The simplest estimator, **inverse detection efficiency**, weights each detected planet by one over its detection probability and divides by the number of stars searched; more careful work fits a parametric population model with a Poisson likelihood, accounting for false positives and measurement errors in radius.

Applied to Kepler, this gives a clear picture. Planets between 1 and 4 Earth radii with periods under a year are the most common outcome of planet formation, present around roughly half of Sun-like stars; hot Jupiters orbit only about 0.5-1 percent. The size distribution has a **radius valley** near 1.8 Earth radii separating rocky **super-Earths** from **sub-Neptunes** with hydrogen envelopes (attributed to photoevaporation or core-powered mass loss, as you saw in module 3). Close to the star there is a **hot-Neptune desert**: few Neptune-size planets with periods under a few days, because they are either stripped or never formed there. Giant-planet occurrence rises steeply with host-star **metallicity** (roughly as $10^{2[\\mathrm{Fe/H}]}$), strong evidence for core accretion, while small planets show little dependence. M dwarfs host more small planets but fewer giants than Sun-like stars.

The headline number is **eta-Earth**, the occurrence of roughly Earth-size planets in the habitable zone of Sun-like stars. Kepler barely detected any such planets, so eta-Earth depends on extrapolation from shorter periods and on the definition of the zone; estimates range from about 0.1 to 0.5, an uncertainty that matters greatly for planning future missions to image Earth twins. Read the OpenStax 21.5 summary and the Exoplanet Archive documentation, then reproduce the population diagrams and a simple occurrence calculation in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 21.5 Exoplanets Everywhere: What We Are Learning',
              url: 'https://openstax.org/books/astronomy-2e/pages/21-5-exoplanets-everywhere-what-we-are-learning',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'NASA Exoplanet Archive — pre-generated population plots',
              url: 'https://exoplanetarchive.ipac.caltech.edu/exoplanetplots/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
            },
            {
              title: 'NASA Exoplanet Archive — PS and PSCompPars column definitions',
              url: 'https://exoplanetarchive.ipac.caltech.edu/docs/API_PS_columns.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
            },
            {
              title: 'Three regimes of extrasolar planets inferred from host star metallicities (Buchhave et al. 2014)',
              url: 'https://arxiv.org/abs/1405.7695',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
          ],
          exercises: [
            {
              slug: 'population-diagrams',
              title: 'Reproduce the population diagrams',
              prompt:
                'Using TAP queries to pscomppars, make: (1) radius vs period for transiting planets, (2) mass (or M sin i) vs period coloured by discovery method, (3) radius vs insolation showing the hot-Neptune desert, and (4) giant-planet fraction vs host [Fe/H] (bin hosts by metallicity and compute the fraction with a planet above 0.3 MJ among RV-detected hosts, with binomial errors from astropy.stats.binom_conf_interval). Annotate each with the regions shaped by selection effects.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'toy-occurrence-rate',
              title: 'A toy occurrence-rate calculation',
              prompt:
                'Simulate a survey of 100,000 Sun-like stars with true occurrence of 0.3 planets per star uniformly distributed in log P (1-100 d) and log R (1-4 Re), random inclinations, and a detection efficiency that is a logistic function of transit S/N (50 percent at S/N = 7.1, with S/N from depth, number of transits in 4 years and 100 ppm per 6-hour noise). Generate the detected sample, then recover the occurrence rate per bin by inverse detection efficiency. Compare with truth and show where the method breaks down (low-efficiency bins).',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'eta-earth-estimate',
              title: 'Estimate eta-Earth',
              prompt:
                'Using published occurrence rates (or your toy model fit) for 1-1.5 Earth-radius planets as a function of period from 10 to 100 days, fit a power law in period and extrapolate to the habitable zone of a Sun-like star (roughly 237-860 d for conservative limits). Report eta-Earth with an uncertainty that reflects the extrapolation and the choice of habitable-zone limits. Explain why missions like the proposed Habitable Worlds Observatory need this number.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must each detected planet be weighted by the inverse of its detection probability?',
              answerOutline: 'For each detected planet, many similar planets were missed (non-transiting geometry or low S/N); weighting by 1/(p_geom p_det) estimates the true number.',
            },
            {
              question: 'What does the giant-planet metallicity correlation suggest about formation?',
              answerOutline: 'More solids in the disk make it easier to build a ~10 Earth-mass core before the gas disperses, supporting core accretion.',
            },
            {
              question: 'Why is eta-Earth so uncertain?',
              answerOutline: 'Kepler detected almost no Earth-size planets in the habitable zone of Sun-like stars; estimates depend on extrapolation, false-positive rates, stellar radii and habitable-zone definitions.',
            },
          ],
        },
        {
          slug: 'bulk-compositions-from-mass-and-radius',
          title: 'Bulk compositions from mass and radius',
          summary:
            'Reading composition from the mass-radius diagram: rocky, water-rich and gas-enveloped planets, degeneracies, inflated hot Jupiters and super-puffs.',
          estimatedMinutes: 100,
          objectives: [
            'Place exoplanets on the mass-radius diagram and infer bulk compositions using interior models',
            'Explain the degeneracy between water and hydrogen envelopes for sub-Neptunes',
            'Explain the inflated radii of hot Jupiters and the heating mechanisms proposed',
            'Use host-star abundances to constrain the iron fraction of rocky planets',
          ],
          concepts: [
            'Mass-radius relations for iron, rock, water and H/He',
            'Earth-like composition curve',
            'Envelope mass fraction and radius',
            'Compositional degeneracy',
            'Radius inflation of hot Jupiters; ohmic heating',
            'Super-puffs and low-density planets',
            'Host-star Fe/Mg/Si as a composition prior',
            'Super-Mercuries',
          ],
          explanation: `With both a mass (from RV or TTVs) and a radius (from transits) a planet's **bulk density** follows, and comparing with theoretical **mass-radius relations** (the ones you computed in module 2) constrains its composition. Rocky planets with an Earth-like 32 percent iron core follow $R \\approx M^{0.27}$ in Earth units; pure-iron planets are smaller, pure-water planets about 25 percent larger, and a few percent of hydrogen and helium by mass inflates a planet dramatically, so sub-Neptunes of 2-3 Earth radii can be 5-10 Earth-mass cores with 1-3 percent H/He envelopes.

Planets below the radius valley mostly sit on or near the Earth-like curve: they are rocky. A few, such as K2-229 b and Kepler-107 c, are denser than Earth (**super-Mercuries**), perhaps stripped by giant impacts. A useful test uses the host star: refractory elements (Fe, Mg, Si) condense together, so a star's abundance ratios predict the iron-to-rock ratio of its rocky planets, and most agree within errors.

Above the valley, interpretation is **degenerate**. A given mass and radius can be matched by a rocky core with a thin hydrogen envelope or by a water-rich interior with a thinner (or no) envelope: a "water world". Atmospheric spectroscopy (the next lesson) and population-level arguments (where in the disk did they form?) are needed to break the degeneracy, and the existence of abundant water worlds is actively debated. Some planets are puzzlingly light: the **super-puffs** of Kepler-51 have Neptune-like radii and densities below 0.1 g/cm$^3$, requiring large envelopes or high-altitude hazes that make them look larger.

Gas giants pose their own problem. Many **hot Jupiters** have radii well above what models of cooling hydrogen planets allow, up to 2 Jupiter radii. Inflation correlates strongly with stellar irradiation, pointing to some fraction of incident energy being deposited deep in the interior; proposals include **ohmic dissipation** of currents driven by winds in the planet's magnetic field, tidal heating, and delayed contraction. Cooler giants are not inflated, and their radii can be used to estimate heavy-element masses, which increase with planet mass and stellar metallicity as core accretion predicts. Read the Seager et al. 2007 mass-radius paper via ADS and the Exoplanet Archive documentation, and analyse real planets in the exercises.`,
          resources: [
            {
              title: 'NASA Exoplanet Archive — Planetary Systems Composite Parameters',
              url: 'https://exoplanetarchive.ipac.caltech.edu/docs/pscp_about.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              primary: true,
            },
            {
              title: 'NASA ADS (search: Seager Kuchner Hier-Majumder Militzer 2007 mass-radius relationships)',
              url: 'https://ui.adsabs.harvard.edu/',
              type: 'article',
              cost: 'free',
              provider: 'NASA / Harvard',
              note: 'The classic paper behind the polytropic fits used in module 2; free arXiv version linked from ADS.',
            },
            {
              title: 'MIT OCW 12.425 Extrasolar Planets',
              url: 'https://ocw.mit.edu/courses/12-425-extrasolar-planets-physics-and-detection-techniques-fall-2007/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on exoplanet interiors.',
            },
            {
              title: 'NASA Science — Exoplanets (planet types)',
              url: 'https://science.nasa.gov/exoplanets/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
            },
          ],
          exercises: [
            {
              slug: 'mass-radius-placement',
              title: 'Compositions of well-measured small planets',
              prompt:
                'Query all planets with radius < 4 Re and mass and radius both measured to better than 20 percent. Plot them on the mass-radius diagram with your module-2 composition curves (iron, Earth-like, rock, 50 percent water) and a curve for a 1 percent H/He envelope on an Earth-like core (use published fits if you did not compute it). Classify each planet as rocky, ambiguous or envelope-bearing, and draw error ellipses. Report how many lie below the Earth-like curve and discuss super-Mercuries.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'inflated-hot-jupiters',
              title: 'Radius inflation versus irradiation',
              prompt:
                'Select giant planets (M > 0.3 MJ) with measured radii. Plot radius against incident flux (in units of Earth\'s) on log axes. Identify the threshold flux above which inflation appears (about 2e8 erg/s/cm^2, roughly 150 times Earth\'s insolation). Fit the trend above the threshold and compare with the expectation that inflation power is a fixed fraction of the incident power. Discuss which mechanisms predict a flux threshold.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'envelope-fraction',
              title: 'How much hydrogen does a sub-Neptune have?',
              prompt:
                'Using a simple model where an envelope adds a thickness Delta R = n H ln(P_base/P_photo) on top of an Earth-like core (take n x ln factor ~ 7-10 scale heights, H at the equilibrium temperature with mu = 2.3), estimate the envelope mass needed for a 6 Re-mass core to have a total radius of 2.5 Re at T_eq = 800 K, given the base pressure relates to envelope mass by P_base = g M_env / (4 pi R_core^2). Compare with published envelope fractions (1-5 percent) and comment on the model\'s crudeness.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a 2.5 Earth-radius, 7 Earth-mass planet not be uniquely interpreted?',
              answerOutline: 'Its density can be matched by a rocky core with a ~1-2 percent H/He envelope or by a water-rich interior; mass and radius alone do not break the degeneracy.',
            },
            {
              question: 'What observation suggests hot-Jupiter inflation is driven by stellar irradiation?',
              answerOutline: 'Inflation correlates strongly with incident flux and is absent below a threshold flux; cooler giants have radii matching standard cooling models.',
            },
            {
              question: 'How can the host star constrain a rocky planet\'s composition?',
              answerOutline: 'Refractory elements condense together; the star\'s Fe/Mg/Si ratios predict the planet\'s core mass fraction, testable against its density.',
            },
          ],
        },
        {
          slug: 'exoplanet-atmospheres-and-spectroscopy',
          title: 'Exoplanet atmospheres: transmission, emission and phase curves',
          summary:
            'How transits and eclipses reveal atmospheres: transmission spectra, secondary eclipses and dayside spectra, phase curves and heat redistribution, and what JWST has measured.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the transmission-spectrum feature amplitude and the transmission spectroscopy metric',
            'Explain how secondary eclipses and phase curves give dayside temperatures, albedos and heat redistribution',
            'Interpret real transmission spectra (e.g. WASP-39 b from JWST) and identify molecular features, clouds and hazes',
            'Explain atmospheric retrieval and its degeneracies, and the stellar contamination problem',
          ],
          concepts: [
            'Transmission spectroscopy: wavelength-dependent radius',
            'Feature amplitude $\\Delta\\delta \\approx 2 n H R_p / R_*^2$',
            'Transmission Spectroscopy Metric (TSM)',
            'Secondary eclipse depth $(R_p/R_*)^2 B_\\lambda(T_p)/B_\\lambda(T_*)$',
            'Phase curves, day-night contrast, hotspot offset',
            'Clouds and hazes: flat spectra and Rayleigh slopes',
            'Retrievals; metallicity and C/O',
            'Stellar contamination from spots (transit light source effect)',
          ],
          explanation: `During transit a thin ring of atmosphere at the planet's limb is backlit by the star. At wavelengths where a molecule absorbs strongly the atmosphere is opaque higher up, so the planet looks bigger and the transit deeper. Measuring depth versus wavelength gives a **transmission spectrum**. A feature spanning $n$ scale heights changes the depth by
$$\\Delta\\delta \\approx \\frac{2nHR_p}{R_*^2},$$
which is several hundred ppm for a hot, puffy Jupiter but only a few ppm for an Earth around the Sun, which is why atmospheric characterisation favours hot, low-gravity planets and small stars. The **Transmission Spectroscopy Metric** ranks targets by expected signal-to-noise using exactly this scaling and the star's brightness.

The other side of the orbit gives complementary data. At **secondary eclipse** the planet passes behind the star and its light disappears; the depth is the planet-to-star flux ratio, $\\approx (R_p/R_*)^2\\,B_\\lambda(T_p)/B_\\lambda(T_*)$ in the infrared, giving the dayside **brightness temperature** and, across wavelengths, an **emission spectrum** sensitive to the vertical temperature profile (absorption features if temperature falls with height, emission features in a thermal inversion). Between transit and eclipse, the planet shows changing phases; the **phase curve** gives the day-night temperature contrast and the offset of the hottest spot from the substellar point, a direct measurement of winds and heat redistribution on tidally locked planets.

Real spectra are shaped by **clouds and hazes**. High clouds truncate features, producing flat spectra (GJ 1214 b's famous featureless spectrum); small haze particles add a Rayleigh-like slope at short wavelengths. JWST has transformed the field: the early-release WASP-39 b spectra detected H$_2$O, CO$_2$, CO, Na, K and SO$_2$, the last produced by **photochemistry**, the first such detection on an exoplanet. Spectra are interpreted by **retrieval**: a parametrised atmosphere (temperature profile, abundances, clouds) is fitted by nested sampling, yielding metallicity and carbon-to-oxygen ratio, clues to where in the disk the planet formed. Retrievals have degeneracies (clouds versus metallicity, temperature versus composition) and for small planets around M dwarfs, unocculted starspots and faculae imprint features on the spectrum (the **transit light source effect**) that can mimic or mask an atmosphere; JWST's rocky-planet observations are fighting exactly this. Read Winn's eclipse sections and browse the JWST WASP-39 b data at MAST, then do the exercises.`,
          resources: [
            {
              title: 'Transits and Occultations (Winn 2010) — occultations and phase curves',
              url: 'https://arxiv.org/abs/1001.2010',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              primary: true,
            },
            {
              title: 'MAST Portal (JWST exoplanet observations, e.g. WASP-39 b)',
              url: 'https://mast.stsci.edu/portal/Mashup/Clients/Mast/Portal.html',
              type: 'dataset',
              cost: 'free',
              provider: 'STScI',
              note: 'Public JWST transit spectra; also the ERS High-Level Science Products.',
            },
            {
              title: 'NASA Exoplanet Archive — atmospheric spectroscopy plots',
              url: 'https://exoplanetarchive.ipac.caltech.edu/exoplanetplots/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              note: 'Includes the JWST atmosphere observation summaries; the archive also hosts a transmission/emission spectra table.',
            },
            {
              title: 'NASA Science — Webb mission',
              url: 'https://science.nasa.gov/mission/webb/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
            },
            {
              title: 'ESA Cheops mission',
              url: 'https://www.esa.int/Science_Exploration/Space_Science/Cheops',
              type: 'article',
              cost: 'free',
              provider: 'ESA',
              note: 'Precision photometry for eclipses and phase curves of bright targets.',
            },
          ],
          exercises: [
            {
              slug: 'tsm-ranking',
              title: 'Rank planets for JWST',
              prompt:
                'Implement the Transmission Spectroscopy Metric (Kempton et al. 2018: TSM = scale factor x R_p^3 T_eq / (M_p R_*^2) x 10^(-m_J/5), with scale factors by planet size). Using pscomppars, compute TSM for all transiting planets with measured masses and rank the top 20 in each size class (< 1.5, 1.5-2.75, 2.75-4, 4-10 Re). Check whether the top targets have been observed by JWST (MAST search). Plot TSM against equilibrium temperature.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'secondary-eclipse-temperature',
              title: 'Dayside temperature from an eclipse depth',
              prompt:
                'For HD 189733 b, with a measured 8 micron secondary-eclipse depth of about 0.0034 and R_p/R_* = 0.155 around a 5050 K star, solve for the planet\'s brightness temperature using Planck functions. Compare with T_eq for full redistribution (A = 0) and for no redistribution. Then use the TESS phase curve of WASP-18 b or the published Spitzer phase curve of HD 189733 b (amplitude and hotspot offset) to estimate the nightside temperature and discuss heat redistribution.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'read-wasp39b-spectrum',
              title: 'Read the JWST spectrum of WASP-39 b',
              prompt:
                'Download a public JWST transmission spectrum of WASP-39 b (MAST HLSP or the published data from the ERS papers). Plot transit depth vs wavelength and identify the H2O bands, the 4.3 micron CO2 feature and the 4.05 micron SO2 feature. Compute the scale height (T = 1100 K, g = 4.3 m/s^2, mu = 2.3) and the feature amplitude in scale heights for CO2. Compare with a flat (cloudy) model and compute the chi-squared difference. Explain why SO2 indicates photochemistry.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is transmission spectroscopy easiest for hot, low-gravity planets around small stars?',
              answerOutline: 'Feature amplitude scales as 2 n H R_p / R_*^2 with H proportional to T/(mu g); hot, low-g, H-rich atmospheres have large H and small stars give a large R_p/R_* ratio.',
            },
            {
              question: 'What does a phase-curve hotspot offset tell you?',
              answerOutline: 'Winds (superrotating equatorial jets) advect heat eastward from the substellar point before it is reradiated; the offset and day-night contrast measure redistribution efficiency.',
            },
            {
              question: 'Why might a transmission spectrum be flat?',
              answerOutline: 'High-altitude clouds or hazes block the lower atmosphere; or a high mean molecular weight (small H); or no atmosphere at all for rocky planets.',
            },
          ],
        },
        {
          slug: 'the-habitable-zone-and-planetary-climate',
          title: 'The habitable zone, planetary climate and biosignatures',
          summary:
            'Defining and computing the habitable zone, the climate physics of its edges, special problems of M-dwarf planets, and how biosignatures might be detected and falsified.',
          estimatedMinutes: 120,
          objectives: [
            'Compute conservative and optimistic habitable-zone boundaries for any star from effective flux limits',
            'Explain the climate physics (runaway greenhouse, maximum CO2 greenhouse) that sets the inner and outer edges',
            'Assess the habitability challenges of tidally locked M-dwarf planets: flares, water loss, atmospheric retention',
            'Evaluate candidate biosignatures, their false positives, and the observations needed for a credible detection',
          ],
          concepts: [
            'Habitable zone as a flux range: $S_{\\rm eff}$ limits',
            'Inner edge: runaway/moist greenhouse',
            'Outer edge: maximum CO2 greenhouse',
            'Kopparapu parametrisation $S_{\\rm eff}(T_{\\rm eff})$; $d = \\sqrt{L/S_{\\rm eff}}$',
            'Tidal locking, terminator habitability, atmospheric collapse',
            'M-dwarf pre-main-sequence luminosity and flares',
            'Biosignatures: O2, O3, CH4, N2O; disequilibrium pairs',
            'False positives and planetary context; technosignatures',
          ],
          explanation: `The **habitable zone** is the range of orbital distances where a rocky planet with an Earth-like atmosphere and a carbonate-silicate cycle could maintain surface liquid water. It is defined by climate physics, so it is best expressed as a range of **stellar flux** $S_{\\rm eff}$ rather than distance. The **inner edge** is where a planet with abundant water crosses the moist or **runaway greenhouse** limit (module 3); for the Sun this is near 0.95-0.99 AU, about $S_{\\rm eff} \\approx 1.1$ times Earth's flux. The **outer edge** is set by the **maximum CO$_2$ greenhouse**: adding CO$_2$ warms a planet only up to a point, beyond which Rayleigh scattering by the thick CO$_2$ and its condensation outweigh further greenhouse warming; for the Sun this is near 1.67 AU ($S_{\\rm eff} \\approx 0.36$). Optimistic limits based on Venus 1 billion years ago and early Mars widen the zone. Kopparapu and collaborators provide polynomial fits of these limits as functions of stellar effective temperature (cooler stars emit more infrared, which water and ice absorb more efficiently, shifting the limits), and the distance follows as
$$d = \\sqrt{\\frac{L_*/L_\\odot}{S_{\\rm eff}}}\\ \\mathrm{AU}.$$

Being in the zone is necessary but not sufficient. The planet must have the right mass to retain an atmosphere and sustain geology, a volatile inventory, and long-term climate stabilisation. Around **M dwarfs**, which are the most common stars and host the most accessible temperate rocky planets (TRAPPIST-1, Proxima b, LHS 1140 b), extra problems arise. The zone lies at 0.02-0.2 AU, so planets are **tidally locked**, with permanent day and night sides; climate models show that a thick enough atmosphere or ocean can transport heat and avoid atmospheric collapse on the night side. M dwarfs are extremely luminous during their long pre-main-sequence phase, so their habitable-zone planets may have suffered a runaway greenhouse and water loss before the star settled, and they flare frequently with strong XUV emission that erodes atmospheres. JWST thermal-emission observations of rocky M-dwarf planets have so far found little evidence of thick atmospheres, a key open question.

The ultimate goal is to detect life through **biosignatures**: atmospheric gases or surface features produced by biology. Oxygen and its photochemical product ozone, methane, nitrous oxide, and especially **chemical disequilibrium** pairs such as O$_2$ with CH$_4$ are the main candidates. Each has **false positives**: abiotic O$_2$ from water photolysis with hydrogen escape, or from CO$_2$ photolysis around M dwarfs; abiotic CH$_4$ from serpentinisation. A credible claim requires the whole planetary context (stellar UV, the planet's water and CO$_2$, the absence of the abiotic by-products) and repeated detection. The recent controversy over dimethyl sulphide on K2-18 b illustrates how hard this is. Read OpenStax 30.3, the NASA astrobiology pages and the Kopparapu papers via ADS, then compute habitable zones and assess real candidates in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 30.3 Searching for Life beyond Earth',
              url: 'https://openstax.org/books/astronomy-2e/pages/30-3-searching-for-life-beyond-earth',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'NASA ADS (search: Kopparapu 2013 and 2014 habitable zones around main-sequence stars)',
              url: 'https://ui.adsabs.harvard.edu/',
              type: 'article',
              cost: 'free',
              provider: 'NASA / Harvard',
              note: 'The papers give the S_eff(T_eff) polynomial coefficients; free arXiv versions are linked.',
            },
            {
              title: 'NASA Astrobiology',
              url: 'https://astrobiology.nasa.gov/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Overviews of habitability, biosignatures and agnostic life detection.',
            },
            {
              title: 'NASA Exoplanet Archive — Planetary Systems Composite Parameters',
              url: 'https://exoplanetarchive.ipac.caltech.edu/docs/pscp_about.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              note: 'Insolation (pl_insol) and stellar parameters for the habitable-zone exercise.',
            },
          ],
          exercises: [
            {
              slug: 'compute-habitable-zones',
              title: 'Habitable zones for real stars',
              prompt:
                'Implement the Kopparapu et al. (2014) S_eff(T_eff) relations for the runaway greenhouse, maximum greenhouse, recent Venus and early Mars limits. Compute habitable-zone distances for the Sun, Tau Ceti, Kepler-452, Proxima Centauri, TRAPPIST-1 and LHS 1140. Then query pscomppars for all planets with radius < 2 Re (or M sin i < 10 Me) and insolation within the optimistic limits, and plot insolation vs stellar T_eff with the four limits overlaid. List the planets inside the conservative zone.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'pre-main-sequence-water-loss',
              title: 'Water loss during an M dwarf\'s youth',
              prompt:
                'A 0.1 solar-mass M dwarf has a luminosity about 10 times higher at 10 Myr than on the main sequence (where L = 0.001 Lsun), declining over ~1 Gyr. For a planet in the present habitable zone, compute the time it spent interior to the runaway greenhouse limit (approximate L(t) as a power law from 10 Myr to 1 Gyr). Using energy-limited escape of hydrogen with an XUV flux of 1e-3 of bolometric, estimate how many Earth oceans of water could be lost. Discuss the implications for TRAPPIST-1.',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'biosignature-assessment',
              title: 'Assess a biosignature claim',
              prompt:
                'Read the K2-18 b JWST papers claiming CH4, CO2 and a tentative dimethyl sulphide detection and at least one critical response (find them on arXiv/ADS). Write a two-page assessment: what was detected and at what significance; the competing interpretations of the planet (hycean world, gas-rich mini-Neptune, magma ocean); the abiotic pathways for each gas; and what further observations would be decisive. Conclude with your own judgement on the strength of the evidence.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What physical processes define the inner and outer edges of the habitable zone?',
              answerOutline: 'Inner: the moist/runaway greenhouse, where water vapour feedback leads to ocean loss. Outer: the maximum CO2 greenhouse, beyond which more CO2 cools via Rayleigh scattering and condensation.',
            },
            {
              question: 'Why is the habitable zone better expressed in stellar flux than distance?',
              answerOutline: 'Climate responds to absorbed flux; expressing limits in S_eff (adjusted for stellar spectral type) makes them transferable between stars, with distance following from sqrt(L/S_eff).',
            },
            {
              question: 'Why is O2 together with CH4 a stronger biosignature than O2 alone?',
              answerOutline: 'They react with each other, so their coexistence requires continuous large fluxes of both (chemical disequilibrium), hard to sustain abiotically; O2 alone has abiotic production routes.',
            },
            {
              question: 'Name two habitability challenges specific to M-dwarf planets.',
              answerOutline: 'Tidal locking with possible night-side atmospheric collapse; a long, luminous pre-main-sequence phase causing water loss; frequent flares and high XUV eroding atmospheres.',
            },
          ],
          relatedLessons: ['intro-astronomy/life-in-the-universe-and-how-astronomers-work/habitability-and-the-search-for-life'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'tess-transiting-planet',
    title: 'Capstone: detect and characterise a transiting exoplanet from TESS or Kepler data',
    description: `Starting from raw mission light curves, find a planet and characterise it as a professional would. Choose a target where the answer is known (a confirmed planet with published parameters) so you can validate, but do the work as if it were new.

1. **Data**: download all available TESS sectors (or Kepler quarters) for the host with lightkurve; inspect SAP and PDCSAP flux, apply quality masks, and build a stitched, normalised light curve. Document the systematics you see.
2. **Detection**: flatten the light curve with a window chosen to preserve transits, run Box Least Squares (and Transit Least Squares) over a sensible period grid, identify the strongest signal and assess its significance with an inject-and-recover or bootstrap test. Mask it and search for additional planets.
3. **Vetting**: check odd-even transit depths, look for a secondary eclipse, examine the centroid motion from the target pixel file, and compare the transit duration with that expected for the stellar density from the TESS Input Catalog. Decide whether the signal is a planet candidate or a false positive.
4. **Characterisation**: fit a full transit model (period, epoch, radius ratio, scaled semi-major axis or stellar density, impact parameter, limb darkening with priors) with MCMC; derive the planet radius with the TIC stellar radius, the orbital distance, the equilibrium temperature with assumed albedo, the transit probability and the expected radial-velocity amplitude for plausible masses. If radial velocities exist in the Exoplanet Archive, fit them for the mass and compute the density and a composition estimate from the mass-radius relations.
5. **Context**: place the planet on the population diagrams, compute its position relative to the habitable zone, and discuss what JWST could measure for it using the transmission-spectroscopy metric.

Write it up as a discovery-style paper with all figures, posterior summaries and a comparison with the published parameters.`,
    deliverables: [
      'A reproducible repository: data download, detection, vetting, MCMC fitting and figure scripts, with an environment file',
      'A 6-10 page paper: data, detection, vetting, characterisation with posterior tables and corner plots, context and discussion',
      'Validation table comparing every derived parameter with the NASA Exoplanet Archive values and discussing discrepancies',
      'An inject-and-recover completeness curve for your detection pipeline on this star',
    ],
    estimatedHours: 20,
    stretchGoals: [
      'Search for and model transit timing variations across all sectors and compare with the expectation from a known companion',
      'Apply your pipeline blind to a TESS Object of Interest without published parameters and report your candidate on ExoFOP',
      'Fit a joint transit and radial-velocity model and derive the planet density with full posterior uncertainties',
    ],
  },
  masteryChecklist: [
    'I can derive Kepler\'s laws and the vis-viva equation from Newtonian gravity and use the third law to weigh anything with an orbiting companion',
    'I can go from orbital elements to positions and back, and obtain and use real ephemerides from JPL Horizons',
    'I can explain tides, resonances and secular perturbations and run a trustworthy N-body integration with REBOUND',
    'I can infer a planet\'s bulk composition and interior structure from its mass, radius and moment of inertia',
    'I can compute equilibrium temperatures, scale heights and escape parameters and explain why Venus, Earth and Mars diverged',
    'I can explain how the solar system formed from meteorite chronology and disk physics, including migration',
    'I can derive the observables of each exoplanet detection method and analyse real radial-velocity and transit data to extract planet parameters',
    'I can place an exoplanet on mass-radius and population diagrams, interpret its atmosphere observations and assess its habitability',
    'I have detected and characterised a transiting planet from raw TESS or Kepler data with full uncertainty analysis',
  ],
});
