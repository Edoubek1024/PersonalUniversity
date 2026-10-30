import { defineSubject } from '../define';

export default defineSubject({
  id: 'stellar-astrophysics',
  title: 'Stellar Astrophysics',
  category: 'astronomy',
  tagline:
    'From a point of light to a working physical model: how we measure stars, what holds them up, how they shine, evolve and die.',
  description: `A star is the simplest macroscopic object in astrophysics: a self-gravitating ball of gas whose structure is fixed by four ordinary differential equations and a handful of microphysics inputs (equation of state, opacity, nuclear reaction rates). Yet stars are the engines of almost everything else you will study: they synthesise the elements, light up galaxies, calibrate the cosmic distance ladder and leave behind the white dwarfs, neutron stars and black holes of high-energy astrophysics. Understanding them means understanding how observable quantities (flux, colour, spectrum, parallax, orbital period) are turned into physical ones (luminosity, temperature, mass, radius, age, composition).

This curriculum moves from observables to theory and back. You start with how distances, magnitudes and spectra are measured and organised in the Hertzsprung-Russell diagram, then learn the radiation physics needed to read a spectrum. The middle modules build the stellar-structure equations, the microphysics that closes them, and the solutions (polytropes, scaling relations, then full numerical models) that explain the main sequence. The later modules follow stars through their evolution to their remnants and place them in populations and binaries, where masses are actually measured.

Throughout you work with real data: Gaia parallaxes and colours, SDSS and Kepler/TESS light curves and spectra, MIST isochrones and the MESA stellar-evolution code. Onno Pols's free Utrecht lecture notes are the backbone text; OpenStax Astronomy fills in the descriptive background, and MIT OCW 8.901 supplies problem sets at the right level. By the end you should be able to write a simple stellar-structure code, read a MESA output file, and defend every feature of the HR diagram physically.`,
  difficulty: 'advanced',
  estimatedHours: 80,
  prerequisites: ['intro-astronomy', 'thermodynamics-statistical-mechanics', 'quantum-mechanics'],
  recommendedBackground: [
    'Ordinary differential equations and numerical integration in Python (scipy.integrate)',
    'Comfort with astropy units, tables and FITS files',
    'Basic hydrogen-atom spectroscopy and the Boltzmann and Saha distributions',
  ],
  tags: ['stars', 'stellar structure', 'stellar evolution', 'spectroscopy', 'MESA', 'Gaia'],
  core: true,
  modules: [
    {
      slug: 'stellar-observables',
      title: 'Stellar Observables',
      description:
        'How distance, brightness, colour, spectrum and mass are measured, and how the Hertzsprung-Russell diagram organises them.',
      lessons: [
        {
          slug: 'distances-and-parallax',
          title: 'Distances: parallax and the first rung of the ladder',
          summary:
            'Trigonometric parallax, the parsec, the Gaia revolution, and why inverting a noisy parallax is a statistical trap.',
          estimatedMinutes: 90,
          objectives: [
            'Convert between parallax, distance and distance modulus with correct units',
            'Explain the Gaia measurement principle and its typical precision as a function of magnitude',
            'Describe why 1/parallax is a biased distance estimator at low signal-to-noise and what a Bayesian prior does about it',
            'Query the Gaia archive with ADQL and build a clean sample with parallax quality cuts',
          ],
          concepts: [
            'Parallax angle and the parsec (1 pc = 1 AU / 1 arcsec)',
            'Distance modulus m - M = 5 log10(d/10 pc)',
            'Astrometric precision vs apparent magnitude',
            'Parallax zero-point offset',
            'Lutz-Kelker bias and distance priors',
            'Gaia DR3 catalogue columns: parallax, parallax_over_error, ruwe',
            'ADQL queries and astroquery',
          ],
          explanation: `Every physical property of a star except its surface temperature and chemistry depends on knowing its distance, so distance measurement is where stellar astrophysics starts. The only geometric method is **trigonometric parallax**: over a year the Earth's orbit shifts a nearby star's apparent position by an angle $p$ relative to distant background objects, and

$$ d = \\frac{1\\,\\mathrm{AU}}{\\tan p} \\approx \\frac{1}{p[\\mathrm{arcsec}]}\\ \\mathrm{pc}. $$

A parsec is defined by this relation: 1 pc $= 206265$ AU $= 3.086 \\times 10^{16}$ m. The nearest star, Proxima Centauri, has $p \\approx 0.77''$, so every stellar parallax is under one arcsecond; ground-based work historically reached a few hundred parsecs. **Gaia** measures positions to about 0.02-0.03 milliarcsecond for bright stars ($G < 15$) and ~1 mas at $G = 21$, which means ~10% distances to several kiloparsecs for the bright end.

The pitfall: parallax has roughly Gaussian errors, but distance does not. For $\\sigma_p / p \\gtrsim 0.2$ the naive estimator $1/p$ is biased and can even be negative. The correct approach treats distance as the parameter, with a likelihood $\\mathcal{L}(p \\mid d) \\propto \\exp[-(p - 1/d)^2 / 2\\sigma_p^2]$ and a prior on $d$ (for instance an exponentially decreasing space density). Bailer-Jones and collaborators publish such distances for Gaia DR3; understand what they did before using them. Also apply the published parallax **zero-point correction** (of order $-0.02$ mas), which matters for distant stars.

Work through OpenStax chapter 19 for the descriptive picture, then read the Gaia DR3 documentation on astrometric quality indicators. The practical core of this lesson is the astroquery exercise: you will write ADQL, apply the quality cuts (\`parallax_over_error > 10\`, \`ruwe < 1.4\`) and compute distance moduli that feed the HR-diagram lesson later in this module. Keep the sample; you will reuse it.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 19.2 Surveying the Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/19-2-surveying-the-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Descriptive introduction to parallax and the distance ladder; read chapter 19 in full.',
              primary: true,
            },
            {
              title: 'Gaia Archive (ESA)',
              url: 'https://gea.esac.esa.int/archive/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
              note: 'Use the Advanced (ADQL) tab. Table gaiadr3.gaia_source holds parallax, photometry and quality flags.',
            },
            {
              title: 'astroquery.gaia documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/gaia/gaia.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Shows how to launch asynchronous ADQL jobs from Python and get an astropy Table back.',
            },
            {
              title: 'MIT OCW 8.901 Astrophysics I',
              url: 'https://ocw.mit.edu/courses/8-901-astrophysics-i-spring-2006/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture notes on distances, magnitudes and stellar properties; the problem sets are used throughout this subject.',
            },
          ],
          exercises: [
            {
              slug: 'parallax-arithmetic',
              title: 'Parallax arithmetic',
              prompt:
                'Compute the distance in pc and light-years, and the distance modulus, for stars with parallaxes 768.5 mas (Proxima), 88.8 mas (Sirius), 7.0 mas (Betelgeuse-like) and 0.5 mas. For each, assume Gaia DR3 errors of 0.03 mas and give the fractional distance error from naive propagation. State at which parallax the naive error becomes unreliable and why.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gaia-100pc-sample',
              title: 'Build a 100 pc Gaia sample with ADQL',
              prompt:
                'Using astroquery.gaia, select all gaiadr3.gaia_source stars with parallax > 10 mas, parallax_over_error > 10 and ruwe < 1.4. Retrieve phot_g_mean_mag, bp_rp and parallax. Compute absolute G magnitude M_G = G + 5 log10(parallax/100) (parallax in mas). Plot the histogram of distances and report how many stars you get (expect of order 300,000) and the median parallax error. Save the table as a FITS or CSV file for later lessons.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Use Gaia.launch_job_async with a LIMIT of a few hundred thousand rows; the full query can take a minute.',
            },
            {
              slug: 'parallax-bias-simulation',
              title: 'Simulate the 1/parallax bias',
              prompt:
                'Generate 10,000 stars uniformly distributed in volume out to 2 kpc, compute their true parallaxes, add Gaussian noise with sigma = 0.1 mas, and estimate distances by 1/p. Plot the ratio of estimated to true distance against parallax_over_error. Show the mean bias in bins of signal-to-noise, then implement a simple Bayesian estimator with an exponentially decreasing space density prior (scale length 1 kpc) and show it reduces the bias.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'A star has a parallax of 25 mas. What is its distance and distance modulus?',
              answerOutline: 'd = 1/0.025 = 40 pc; m - M = 5 log10(40/10) = 3.01 mag.',
            },
            {
              question: 'Why can you not simply average 1/parallax over a sample of faint stars to get the mean distance?',
              answerOutline:
                'The inverse of a Gaussian variable is skewed and biased; at low S/N, 1/p overestimates distance on average and can be infinite or negative. Work in parallax space or use a prior.',
            },
            {
              question: 'What does RUWE flag and why would you cut on it?',
              answerOutline:
                'Renormalised unit weight error: how well a single-star astrometric model fits. High RUWE indicates unresolved binaries or problematic solutions whose parallaxes may be wrong.',
            },
          ],
        },
        {
          slug: 'magnitudes-fluxes-and-luminosity',
          title: 'Magnitudes, fluxes, colours and luminosity',
          summary:
            'The magnitude system, photometric bands, bolometric corrections, extinction, and the inverse-square law that connects flux to luminosity.',
          estimatedMinutes: 90,
          objectives: [
            'Convert between apparent magnitude, flux density and luminosity in a given band',
            'Explain what a colour index measures and how it relates to temperature',
            'Apply bolometric corrections and interstellar extinction corrections correctly',
            'Compute a stellar radius from luminosity and effective temperature',
          ],
          concepts: [
            'Apparent magnitude m = -2.5 log10(F/F0)',
            'Absolute magnitude and the distance modulus',
            'Photometric systems: Johnson UBV, SDSS ugriz, Gaia G/BP/RP',
            'Vega vs AB zero points',
            'Colour index (B - V, BP - RP) as a temperature proxy',
            'Bolometric magnitude and bolometric correction',
            'Interstellar extinction and reddening, E(B - V), R_V',
            'L = 4 pi R^2 sigma T_eff^4',
          ],
          explanation: `Astronomers measure **flux**, the energy per unit time per unit area arriving at the telescope, and express it on a logarithmic **magnitude** scale inherited from Hipparchus: $m = -2.5 \\log_{10}(F/F_0)$, so five magnitudes are a factor of 100 in flux and *larger* magnitudes are fainter. The zero point $F_0$ defines the system. In the Vega system Vega has $m \\approx 0$ in every band; in the AB system a source with flat $F_\\nu = 3631$ Jy has $m = 0$ in every band. SDSS uses AB, Johnson UBV uses Vega, Gaia uses its own Vega-based zero points. Mixing systems silently is a classic error.

The **absolute magnitude** $M$ is the apparent magnitude at 10 pc, so $m - M = 5\\log_{10}(d/10\\,\\mathrm{pc})$, and converting to luminosity requires the whole spectrum, not one band. The **bolometric correction** $BC = M_{\\mathrm{bol}} - M_V$ accounts for light outside the band; it is near zero for solar-type stars and large and negative for very hot or very cool stars. With $M_{\\mathrm{bol},\\odot} = 4.74$ you get $L/L_\\odot = 10^{-0.4(M_{\\mathrm{bol}} - 4.74)}$.

A **colour index** such as $B - V$ or Gaia's $BP - RP$ is a flux ratio in two bands and therefore a temperature proxy independent of distance. Dust between you and the star absorbs blue light more than red, making the star fainter ($A_V$) and redder ($E(B-V) = A_B - A_V$), with $A_V \\approx 3.1\\,E(B-V)$ for typical Milky Way dust. Ignoring extinction makes stars look cooler and more distant.

Finally, the Stefan-Boltzmann law closes the loop: $L = 4\\pi R^2 \\sigma T_{\\mathrm{eff}}^4$ defines the **effective temperature**, so a luminosity plus a temperature gives a radius. Read OpenStax chapter 17 for the magnitude system, then the 8.901 notes for the quantitative definitions. The exercises turn your Gaia sample from the previous lesson into absolute magnitudes and compare them with known calibrators.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 17.1 The Brightness of Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/17-1-the-brightness-of-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Sections 17.1-17.2 on magnitudes and colours.',
              primary: true,
            },
            {
              title: 'MIT OCW 8.901 Astrophysics I — lecture notes',
              url: 'https://ocw.mit.edu/courses/8-901-astrophysics-i-spring-2006/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Early lectures on magnitudes, bolometric corrections and extinction.',
            },
            {
              title: 'SDSS SkyServer',
              url: 'https://skyserver.sdss.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'The ugriz AB photometry used in the exercises; the SQL search page accepts the queries given below.',
            },
            {
              title: 'Astropy Learn tutorials',
              url: 'https://learn.astropy.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
              note: 'Units and quantities tutorial: use astropy.units for every conversion in this lesson.',
            },
          ],
          exercises: [
            {
              slug: 'magnitude-conversions',
              title: 'Magnitude and luminosity conversions',
              prompt:
                'Sirius A has V = -1.46, B - V = 0.00, parallax 379 mas and BC_V = -0.09; Betelgeuse has V = 0.42, parallax about 5.5 mas, BC_V = -1.6 (ignore extinction). Compute absolute V magnitude, bolometric magnitude, luminosity in solar units, and (using T_eff = 9940 K and 3600 K) the radius in solar radii for each. Comment on how a bolometric correction error of 0.3 mag propagates into the radius.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'sdss-colour-colour',
              title: 'SDSS stellar colour-colour diagram',
              prompt:
                'On SDSS SkyServer run: SELECT TOP 50000 psfMag_u, psfMag_g, psfMag_r, psfMag_i FROM star WHERE psfMag_r BETWEEN 14 AND 19 AND clean = 1. Plot u - g against g - r. Identify the main stellar locus, the hot white-dwarf region (blue in both colours) and the M-dwarf tail. Explain, using blackbody shapes and the Balmer jump, why the locus bends where it does.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'extinction-correction',
              title: 'Deredden a cluster',
              prompt:
                'Take Gaia DR3 photometry for stars within 10 arcmin of the open cluster NGC 2516 (or another cluster of your choice) with parallax between 2.2 and 2.6 mas. Apply A_G = 2.74 E(B - V) and E(BP - RP) = 1.34 E(B - V) with E(B - V) = 0.10. Plot the colour-magnitude diagram before and after correction and describe how the main sequence shifts. Estimate how a 0.05 mag error in E(B - V) changes the implied distance modulus.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Star A is 2.5 magnitudes fainter than star B. What is their flux ratio?',
              answerOutline: 'F_A / F_B = 10^(-0.4 x 2.5) = 0.1, so A is ten times fainter.',
            },
            {
              question: 'Why does a bolometric correction exist and when is it large?',
              answerOutline:
                'One band captures only part of the spectrum; BC accounts for the rest. It is large (very negative) for very hot stars (UV peak) and very cool stars (IR peak), near zero near 6500 K for the V band.',
            },
            {
              question: 'How does interstellar dust affect a star\'s position in a colour-magnitude diagram?',
              answerOutline:
                'It moves the star fainter and redder along a reddening vector of slope A_V / E(B - V) = R_V approximately 3.1, mimicking a cooler, more distant star.',
            },
            {
              question: 'What quantity does T_eff actually define?',
              answerOutline:
                'The temperature of a blackbody with the same total surface flux as the star: sigma T_eff^4 = L / (4 pi R^2). It is not the temperature at any specific depth.',
            },
          ],
        },
        {
          slug: 'stellar-spectra-and-classification',
          title: 'Stellar spectra and the MK classification',
          summary:
            'Why spectral lines appear, the OBAFGKM temperature sequence, luminosity classes, and reading a real SDSS stellar spectrum.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why the strength of a given absorption line peaks at a particular temperature',
            'Classify a spectrum by its dominant features (Balmer, He I/II, Ca II, TiO, molecular bands)',
            'Distinguish luminosity classes by pressure-sensitive line widths',
            'Retrieve and plot SDSS stellar spectra in Python and identify the main lines',
          ],
          concepts: [
            'Continuum plus absorption lines; Kirchhoff\'s laws',
            'Harvard spectral sequence OBAFGKM (hot to cool) and subtypes 0-9',
            'Balmer lines peak at A0 (about 10,000 K): excitation vs ionisation',
            'Morgan-Keenan luminosity classes I-V',
            'Pressure broadening and surface gravity log g',
            'Metallicity [Fe/H] and line strengths',
            'Spectral resolution R = lambda / delta lambda',
            'SDSS spectra: 3800-9200 A, R about 2000',
          ],
          explanation: `A stellar spectrum is a near-blackbody **continuum** with **absorption lines** cut into it by atoms and molecules in the cooler outer layers. The Harvard sequence **O B A F G K M** (plus L, T, Y for brown dwarfs) was built empirically from line patterns before anyone knew it was a temperature sequence, running from about 40,000 K to under 3000 K. The modern MK system adds a **luminosity class** (I supergiant to V dwarf) from pressure-sensitive features.

The physics is the Boltzmann and Saha equations, which you will do quantitatively in the next module. Here grasp the qualitative result: the hydrogen Balmer lines need atoms in the $n = 2$ level. Too cool and few atoms are excited; too hot and hydrogen is ionised. So Balmer strength peaks near A0 (about 10,000 K), falling on both sides. Helium lines need even higher temperatures (He I in B stars, He II only in O stars); ionised metals like Ca II H and K dominate in F-G stars; neutral metals in K stars; molecular bands of TiO carve up M-star spectra because molecules survive only below about 4000 K. The sequence is a story of which species exists and is excited at each temperature.

Luminosity classes come from **surface gravity**: a giant has a tenuous atmosphere where collisions are rare, so pressure (Stark) broadening of the Balmer lines is weak and the lines are narrow; a dwarf with $\\log g \\approx 4.5$ shows broad wings. Metallicity scales the strength of all metal lines together and is reported as $[\\mathrm{Fe/H}] = \\log_{10}(N_{\\mathrm{Fe}}/N_{\\mathrm{H}})_\\star - \\log_{10}(N_{\\mathrm{Fe}}/N_{\\mathrm{H}})_\\odot$.

Read OpenStax 17.3, then browse Richard Gray's digital spectral atlas, which shows real spectra along each sequence with the features labelled. The practical work uses SDSS spectra: pull a handful of stars of different classes with astroquery or SkyServer, overplot them normalised, and reproduce the atlas's trends yourself. Classifying by eye before computing anything builds the intuition every later lesson relies on.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 17.3 The Spectra of Stars (and Brown Dwarfs)',
              url: 'https://openstax.org/books/astronomy-2e/pages/17-3-the-spectra-of-stars-and-brown-dwarfs',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'A Digital Spectral Classification Atlas (R. O. Gray)',
              url: 'https://ned.ipac.caltech.edu/level5/Gray/frames.html',
              type: 'article',
              cost: 'free',
              provider: 'NED Level 5',
              note: 'The standard visual guide to MK classification with labelled spectra for every type and class.',
            },
            {
              title: 'SDSS SkyServer',
              url: 'https://skyserver.sdss.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'Use the Navigate and Explore tools to view spectra interactively, or query specObj with class = "STAR" and subClass.',
            },
            {
              title: 'Astroquery (SDSS module) documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/gaia/gaia.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Navigate to the SDSS module from the sidebar; SDSS.get_spectra returns FITS HDUs with flux and loglam columns.',
            },
          ],
          exercises: [
            {
              slug: 'classify-sdss-spectra',
              title: 'Classify five SDSS spectra by eye',
              prompt:
                'Query SDSS specObj for five stars with subClass in (O, B, A0, G2, M3) or simply sort stars by g - r colour and pick five spanning -0.3 to 1.5. Download the spectra with astroquery.sdss, divide each by its median flux, offset them vertically and plot 3800-9000 A. Mark H-beta, H-alpha, Ca II K, the Mg b triplet, Na D and the TiO bandheads. Assign a spectral type to each before reading the SDSS pipeline classification, then compare.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'balmer-strength-vs-colour',
              title: 'Balmer equivalent width versus colour',
              prompt:
                'For 200 SDSS stars spanning g - r from -0.4 to 1.2, measure the equivalent width of H-beta (integrate 1 - F/F_continuum over 4830-4890 A with a linear continuum fit from the flanking windows). Plot EW against g - r. Show that the strength peaks near g - r about 0 (A-type) and explain the two-sided fall-off physically.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Use a robust continuum estimate (median of flanking windows) and sigma-clip cosmic rays before integrating.',
            },
            {
              slug: 'luminosity-class-essay',
              title: 'Explain luminosity classes',
              prompt:
                'In one page explain why a G2 I supergiant and a G2 V dwarf with the same temperature have different Balmer line widths and different strengths of ionised versus neutral lines. Use the ideas of surface gravity, density, collision rate and the Saha equation qualitatively.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do the Balmer lines weaken in O stars even though they are hotter than A stars?',
              answerOutline:
                'Hydrogen is mostly ionised above about 10,000-15,000 K, leaving few neutral atoms in n = 2 to absorb. Excitation increases but ionisation removes the absorbers.',
            },
            {
              question: 'What spectral feature distinguishes a supergiant from a dwarf of the same spectral type?',
              answerOutline:
                'Narrower hydrogen lines (less pressure broadening at low surface gravity) and stronger lines of ionised species relative to neutral ones.',
            },
            {
              question: 'Why do M stars show molecular bands while G stars do not?',
              answerOutline:
                'Molecules such as TiO only survive below roughly 4000 K; at higher temperatures they dissociate.',
            },
          ],
        },
        {
          slug: 'hr-diagram-and-stellar-masses',
          title: 'The HR diagram and stellar masses',
          summary:
            'Build a Gaia HR diagram, read its main sequence, giant branch and white-dwarf sequence, and learn the mass-luminosity relation that anchors stellar physics.',
          estimatedMinutes: 100,
          objectives: [
            'Construct an absolute colour-magnitude diagram from Gaia data and name every major feature',
            'Explain why most stars lie on the main sequence and what sets its position',
            'State the empirical mass-luminosity relation and where it comes from observationally',
            'Estimate radii across the HR diagram using lines of constant radius',
          ],
          concepts: [
            'Hertzsprung-Russell diagram (L vs T_eff) and observational CMD (M vs colour)',
            'Main sequence, subgiants, red giant branch, red clump, white dwarfs',
            'Lines of constant radius in the log L - log T plane',
            'Mass-luminosity relation L proportional to M^3.5 (roughly, 1-10 solar masses)',
            'Mass as the primary parameter; metallicity and age secondary',
            'Main-sequence lifetime t proportional to M / L',
            'Selection effects: magnitude-limited vs volume-limited samples',
          ],
          explanation: `The **Hertzsprung-Russell diagram** plots luminosity against effective temperature (theorists) or absolute magnitude against colour (observers, the *colour-magnitude diagram*). It is the single most important diagram in stellar astrophysics because stars do not scatter randomly: about 90% of them lie on a narrow band, the **main sequence**, running from hot luminous blue stars to cool faint red ones. Above and to the right sit the **giants** and **supergiants**; below and to the left, the **white dwarfs**. Since $L = 4\\pi R^2 \\sigma T^4$, lines of constant radius are straight in the $\\log L$ - $\\log T$ plane, and you can read off that giants are tens to hundreds of solar radii and white dwarfs about one Earth radius.

The main sequence is where stars burn hydrogen in their cores, and position along it is set almost entirely by **mass**. The empirical **mass-luminosity relation** $L \\propto M^{\\alpha}$ with $\\alpha \\approx 3.5$ for roughly $1$-$10\\,M_\\odot$ (steeper below, shallower above) comes from binary stars with measured orbits, as you will see in the binaries module. It immediately gives the main-sequence lifetime, $t_{\\mathrm{MS}} \\propto M/L \\propto M^{-2.5}$: a $10\\,M_\\odot$ star lives about 300 times shorter than the Sun. Later modules derive both relations from the structure equations; here you should simply know them cold.

The diagram's other features are evolutionary stages (red giant branch, **red clump** of core-helium-burning stars, asymptotic giant branch) whose explanations occupy the evolution module. Metallicity shifts the main sequence slightly (metal-poor stars are bluer at fixed mass), and unresolved binaries sit about 0.75 mag above it.

A warning about **selection effects**: a magnitude-limited sample over-represents luminous stars; your volume-limited 100 pc Gaia sample from the first lesson shows the true population, dominated by M dwarfs. Read OpenStax chapter 18, then build the diagram yourself. Gaia's HR diagram paper (Gaia Collaboration, Babusiaux et al. 2018) shows what a clean sample reveals, including the white-dwarf cooling sequence splitting by atmosphere type.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 18.1 A Stellar Census (and chapter 18)',
              url: 'https://openstax.org/books/astronomy-2e/pages/18-1-a-stellar-census',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Sections 18.1-18.4 on the census, masses and the HR diagram.',
              primary: true,
            },
            {
              title: 'Gaia Data Release 2: Observational Hertzsprung-Russell diagrams (Babusiaux et al. 2018)',
              url: 'https://arxiv.org/abs/1804.09378',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Figures 1-5 show the diagram you will reproduce; the text explains every feature.',
            },
            {
              title: 'Gaia Archive (ESA)',
              url: 'https://gea.esac.esa.int/archive/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
            },
            {
              title: 'MIST: MESA Isochrones and Stellar Tracks',
              url: 'https://waps.cfa.harvard.edu/MIST/',
              type: 'dataset',
              cost: 'free',
              provider: 'Harvard CfA',
              note: 'Download isochrones in Gaia bands to overlay on your diagram.',
            },
          ],
          exercises: [
            {
              slug: 'gaia-hr-diagram',
              title: 'Build the Gaia 100 pc HR diagram',
              prompt:
                'Using the 100 pc sample from the parallax lesson, plot M_G against BP - RP as a 2D histogram (log colour scale, 300 x 300 bins). Label the main sequence, the binary sequence above it, the red clump, the giant branch and the white-dwarf sequence. Count the fraction of stars with M_G > 10 (M dwarfs) and compare with a naive magnitude-limited query (G < 12, no parallax cut) to show the selection effect.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'constant-radius-lines',
              title: 'Overlay lines of constant radius',
              prompt:
                'Convert your diagram to log L versus log T_eff using a BP - RP to T_eff relation and a bolometric correction (MIST provides both as functions of colour, or use a simple polynomial fit from the literature). Overlay lines for R = 0.01, 0.1, 1, 10, 100 R_sun. Read off typical radii of white dwarfs, M dwarfs, the Sun and red-clump giants.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'mass-luminosity-lifetimes',
              title: 'Mass-luminosity and lifetimes',
              prompt:
                'Assuming L = L_sun (M/M_sun)^3.5 and that 10% of the hydrogen is burned on the main sequence with 0.7% mass-to-energy efficiency, derive t_MS(M) and evaluate it for 0.5, 1, 3, 10 and 50 solar masses. Compare with MIST track lifetimes (download a few tracks) and discuss where and why the simple scaling fails.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the main sequence a sequence in mass rather than age?',
              answerOutline:
                'Core hydrogen burning is a long-lived equilibrium; position is set by mass (which fixes central temperature and luminosity), while age moves a star only slightly until hydrogen runs out.',
            },
            {
              question: 'A star has the same T_eff as the Sun but 100 times its luminosity. What is its radius?',
              answerOutline: 'R = sqrt(100) R_sun = 10 R_sun, from L proportional to R^2 T^4.',
            },
            {
              question: 'Where do unresolved equal-mass binaries appear on a CMD and why?',
              answerOutline:
                'About 0.75 mag (a factor of two in flux) above the single-star main sequence at the same colour.',
            },
            {
              question: 'Roughly how long does a 10 solar-mass main-sequence star live compared with the Sun?',
              answerOutline: 't scales as M^-2.5, so about 10^-2.5, roughly 1/300 of 10 Gyr, i.e. about 30 Myr.',
            },
          ],
        },
      ],
      project: {
        slug: 'gaia-stellar-census',
        title: 'Module project: a volume-limited stellar census',
        description:
          'Build a clean volume-limited sample of stars within 50 pc from Gaia DR3, derive absolute magnitudes, radii and approximate masses for each, and produce a luminosity function and an estimate of the local stellar mass density. Compare with published values (about 0.04 solar masses per cubic parsec in stars).',
        deliverables: [
          'A notebook with the ADQL query, quality cuts and completeness discussion',
          'HR diagram with labelled features and a luminosity function plot',
          'A short report with the derived local stellar density and its uncertainties',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'radiation-and-spectra',
      title: 'Radiation and Spectra',
      description:
        'The radiation physics needed to read a stellar spectrum quantitatively: blackbodies, radiative transfer, level populations and the structure of a stellar atmosphere.',
      lessons: [
        {
          slug: 'blackbody-radiation',
          title: 'Blackbody radiation and stellar temperatures',
          summary:
            'The Planck function, Wien and Stefan-Boltzmann laws, and the several different temperatures astronomers assign to one star.',
          estimatedMinutes: 80,
          objectives: [
            'Write the Planck function in frequency and wavelength forms and explain why their peaks differ',
            'Derive Wien\'s law and the Stefan-Boltzmann law from the Planck function',
            'Distinguish effective, colour, brightness and excitation temperatures',
            'Fit a blackbody to real broadband photometry and interpret the residuals',
          ],
          concepts: [
            'Specific intensity I_nu and flux F_nu',
            'Planck function B_nu(T) and B_lambda(T)',
            'Rayleigh-Jeans and Wien limits',
            'Wien displacement law lambda_max T = 2.898e-3 m K',
            'Stefan-Boltzmann law F = sigma T^4',
            'Effective, colour, brightness, excitation and kinetic temperatures',
            'Why stars are not perfect blackbodies: lines, Balmer jump, opacity variation',
          ],
          explanation: `Stellar photospheres are close enough to thermal equilibrium that the **Planck function** is the right starting point for their continuum:

$$ B_\\nu(T) = \\frac{2h\\nu^3}{c^2}\\,\\frac{1}{e^{h\\nu/kT} - 1}, \\qquad B_\\lambda(T) = \\frac{2hc^2}{\\lambda^5}\\,\\frac{1}{e^{hc/\\lambda kT} - 1}. $$

$B_\\nu$ is a **specific intensity**: energy per unit time, area, frequency and solid angle. Its two forms describe the same radiation but peak at different places because $d\\nu \\neq d\\lambda$; the famous $\\lambda_{\\max} T = 2.898 \\times 10^{-3}$ m K is for $B_\\lambda$. Integrating over frequency and over the outward hemisphere gives the **Stefan-Boltzmann** flux $F = \\sigma T^4$ with $\\sigma = 2\\pi^5 k^4 / 15 c^2 h^3$. The low-frequency **Rayleigh-Jeans** limit $B_\\nu \\approx 2\\nu^2 kT/c^2$ is why radio astronomers quote brightness temperatures; the high-frequency **Wien** limit is why the colour of a hot star changes little with temperature.

Because real stars have absorption lines, a Balmer discontinuity at 364.6 nm, and an opacity that varies with wavelength, no single temperature describes everything. Astronomers therefore define several: the **effective temperature** from the total flux, a **colour temperature** from matching a blackbody slope between two bands, a **brightness temperature** from matching $B_\\nu$ at one frequency, and **excitation** and **ionisation** temperatures from the Boltzmann and Saha equations applied to line ratios. For the Sun these agree to within a few hundred kelvin; for an A star with a strong Balmer jump the colour temperature depends strongly on which bands you use.

The statistical-mechanics derivation of the Planck function belongs to the thermodynamics track (see the related lesson). Here concentrate on using it: do the integrals once by hand, then fit blackbodies to real photometry in the exercises and see how far a star departs from the ideal.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 5.2 The Electromagnetic Spectrum (radiation laws)',
              url: 'https://openstax.org/details/books/astronomy-2e',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Chapter 5 sections 5.2-5.3 on blackbody radiation and Wien\'s law.',
            },
            {
              title: 'Rutten — Radiative Transfer in Stellar Atmospheres (lecture notes)',
              url: 'https://robrutten.nl/rrweb/rjr-pubs/2003rtsa.book.....R.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Utrecht University',
              note: 'Chapter 2 defines intensity, flux and the Planck function carefully. Used throughout this module.',
              primary: true,
            },
            {
              title: 'Rybicki & Lightman — Radiative Processes in Astrophysics',
              url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9783527618170',
              type: 'textbook',
              cost: 'paid',
              provider: 'Wiley',
              note: 'Chapter 1 is the canonical treatment. Rutten\'s notes above are the free alternative.',
            },
          ],
          exercises: [
            {
              slug: 'planck-derivations',
              title: 'Derive Wien and Stefan-Boltzmann',
              prompt:
                'Starting from B_lambda(T), show that the peak satisfies x e^x / (e^x - 1) = 5 with x = hc / (lambda k T), solve numerically for x and recover Wien\'s constant. Then integrate pi B_nu over all nu using the standard integral of x^3/(e^x - 1) = pi^4/15 to obtain sigma, and evaluate it numerically to 4 significant figures.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'blackbody-fit-vega',
              title: 'Fit a blackbody to Vega',
              prompt:
                'Collect Vega\'s flux densities in Johnson U, B, V, R, I and 2MASS J, H, K from the literature (zero-point tables give these directly since Vega defines the system). Fit a blackbody with free T and solid angle using scipy.optimize.curve_fit. Report T and compare with T_eff = 9600 K. Plot residuals and explain the U-band deficit using the Balmer jump.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'temperature-zoo',
              title: 'The temperature zoo',
              prompt:
                'For a star with T_eff = 5800 K, compute the colour temperature implied by the B and V fluxes of a pure blackbody and the brightness temperature at 1 cm wavelength if its radio flux is 10^-3 of the blackbody prediction (coronal and chromospheric effects aside). Explain in a paragraph why each of these can differ from T_eff for a real star.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do B_nu and B_lambda peak at different wavelengths for the same temperature?',
              answerOutline:
                'They are densities per unit frequency and per unit wavelength; the Jacobian |d nu / d lambda| = c / lambda^2 shifts the maximum.',
            },
            {
              question: 'What is the Rayleigh-Jeans approximation and when does it apply?',
              answerOutline:
                'B_nu approximately 2 nu^2 k T / c^2 when h nu much less than k T; valid in the radio for stellar temperatures.',
            },
            {
              question: 'Define brightness temperature.',
              answerOutline:
                'The temperature of a blackbody that would give the observed specific intensity at that frequency; it equals the kinetic temperature only for an optically thick thermal source.',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/quantum-statistics/photons-phonons-and-blackbody-radiation'],
        },
        {
          slug: 'radiative-transfer-basics',
          title: 'Radiative transfer: optical depth, source function and limb darkening',
          summary:
            'The equation of radiative transfer, its formal solution, and what optical depth and the Eddington approximation tell you about a stellar photosphere.',
          estimatedMinutes: 110,
          objectives: [
            'Write the transfer equation with emission and absorption and solve it for a constant source function',
            'Define optical depth and explain why we see to tau about 2/3 in a star',
            'Derive the grey-atmosphere temperature structure in the Eddington approximation',
            'Explain limb darkening and relate it to the temperature gradient',
          ],
          concepts: [
            'Absorption coefficient alpha_nu, emissivity j_nu, source function S_nu = j_nu / alpha_nu',
            'Optical depth d tau_nu = alpha_nu ds',
            'Transfer equation dI_nu / d tau_nu = -I_nu + S_nu',
            'Formal solution and the Eddington-Barbier relation',
            'LTE: S_nu = B_nu(T)',
            'Grey atmosphere: T^4 = (3/4) T_eff^4 (tau + 2/3)',
            'Limb darkening',
            'Mean intensity J, flux H, pressure K moments',
          ],
          explanation: `Radiation passing through gas is removed by absorption and added by emission. Along a ray, with absorption coefficient $\\alpha_\\nu$ (per unit length) and emissivity $j_\\nu$,

$$ \\frac{dI_\\nu}{ds} = -\\alpha_\\nu I_\\nu + j_\\nu \\quad \\Longrightarrow \\quad \\frac{dI_\\nu}{d\\tau_\\nu} = -I_\\nu + S_\\nu, $$

where the **optical depth** $d\\tau_\\nu = \\alpha_\\nu\\,ds$ counts mean free paths and the **source function** $S_\\nu = j_\\nu/\\alpha_\\nu$ is the ratio of emission to absorption. In **local thermodynamic equilibrium** (LTE), valid deep in a photosphere where collisions dominate, $S_\\nu = B_\\nu(T)$. The formal solution for a slab is $I_\\nu(\\tau) = I_\\nu(0)e^{-\\tau} + \\int_0^{\\tau} S_\\nu(t)\\,e^{-(\\tau - t)}\\,dt$: what emerges is a weighted average of the source function over the last optical depth or so. For a linear source function this gives the **Eddington-Barbier relation** $I_\\nu(\\mu) \\approx S_\\nu(\\tau_\\nu = \\mu)$, so looking straight down ($\\mu = \\cos\\theta = 1$) you see deeper and hotter layers than at the limb. That is **limb darkening**, visible in any image of the Sun, and it is direct evidence that temperature increases inward.

Taking angular moments of the transfer equation and closing them with the **Eddington approximation** ($K = J/3$) for a **grey** atmosphere (opacity independent of frequency) in radiative equilibrium gives the classic temperature structure

$$ T^4(\\tau) = \\tfrac{3}{4}\\,T_{\\mathrm{eff}}^4\\left(\\tau + \\tfrac{2}{3}\\right), $$

which says $T = T_{\\mathrm{eff}}$ at $\\tau = 2/3$: the "surface" of a star is where the optical depth to space is about two thirds. This single result justifies the whole observational apparatus of effective temperatures.

Rutten's notes chapters 2-4 are the primary reading; do the derivations with pencil. Then write the small numerical solver in the exercises, which will also be the kernel of the spectral-line exercise in the next lesson.`,
          resources: [
            {
              title: 'Rutten — Radiative Transfer in Stellar Atmospheres (lecture notes)',
              url: 'https://robrutten.nl/rrweb/rjr-pubs/2003rtsa.book.....R.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Utrecht University',
              note: 'Chapters 2-4: transfer equation, moments, grey atmosphere, limb darkening.',
              primary: true,
            },
            {
              title: 'Tatum — Stellar Atmospheres (LibreTexts)',
              url: 'https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Find "Stellar Atmospheres (Tatum)" on the Astronomy and Cosmology bookshelf; chapters on optical depth and limb darkening are concise.',
            },
            {
              title: 'Rybicki & Lightman — Radiative Processes in Astrophysics',
              url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9783527618170',
              type: 'textbook',
              cost: 'paid',
              provider: 'Wiley',
              note: 'Chapter 1.4-1.8 on transfer, LTE and the Eddington approximation; Rutten covers the same material free.',
            },
          ],
          exercises: [
            {
              slug: 'grey-atmosphere-derivation',
              title: 'Derive the grey-atmosphere solution',
              prompt:
                'Take the zeroth and first angular moments of the plane-parallel transfer equation, impose radiative equilibrium (J = S, flux constant) and the Eddington closure K = J/3, and derive T^4(tau) = (3/4) T_eff^4 (tau + 2/3). State every assumption. Then compute T at tau = 0, 2/3, 1 and 10 for T_eff = 5772 K.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'formal-solver',
              title: 'A numerical formal solver and limb darkening',
              prompt:
                'Write a Python function that integrates the formal solution I(mu) = integral of S(tau) exp(-tau/mu) dtau/mu for a given S(tau) tabulated on a grid. Use S = B_nu(T(tau)) with the grey T(tau) at 500 nm and plot I(mu)/I(1) for mu from 0.1 to 1. Compare with the solar limb-darkening law I(mu)/I(1) = 0.4 + 0.6 mu (approximately) and comment on the agreement.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'optical-depth-intuition',
              title: 'Optical depth estimates',
              prompt:
                'The solar photosphere at 500 nm has a continuum opacity of about kappa = 0.3 cm^2 g^-1 (dominated by H-minus) and density about 2e-7 g cm^-3. Estimate the photon mean free path and the geometric thickness of the layer from tau = 0 to tau = 1. Compare with the solar radius and explain why the Sun has a sharp edge.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the Eddington-Barbier relation say and what does it imply for limb darkening?',
              answerOutline:
                'Emergent intensity at angle mu is approximately the source function at tau = mu; near the limb we see shallower, cooler gas, so the limb is darker when temperature rises inward.',
            },
            {
              question: 'What does LTE assume and where in a star does it fail?',
              answerOutline:
                'Level populations and the source function are set by the local temperature (S = B). It fails in the low-density chromosphere/corona and in strong line cores where radiative rates beat collisional ones.',
            },
            {
              question: 'Why is T_eff reached at tau = 2/3 and not tau = 1?',
              answerOutline:
                'The grey Eddington solution T^4 = (3/4) T_eff^4 (tau + 2/3) gives T = T_eff at tau = 2/3; it reflects the angle-averaged escape depth of the flux.',
            },
          ],
        },
        {
          slug: 'boltzmann-and-saha-equations',
          title: 'Line formation: Boltzmann, Saha and the curve of growth',
          summary:
            'Quantitative line strengths: level populations, ionisation balance, line profiles and how abundances are extracted from equivalent widths.',
          estimatedMinutes: 120,
          objectives: [
            'Compute level populations with the Boltzmann equation and ionisation fractions with the Saha equation',
            'Explain quantitatively why Balmer lines peak at about 10,000 K',
            'Describe natural, thermal (Doppler) and pressure broadening and the Voigt profile',
            'Use the curve of growth to turn an equivalent width into an abundance',
          ],
          concepts: [
            'Boltzmann equation n_j / n_i = (g_j / g_i) exp(-Delta E / kT)',
            'Saha equation and partition functions',
            'Electron pressure dependence of ionisation',
            'Line opacity, oscillator strength f, Einstein coefficients',
            'Doppler width, Lorentz damping, Voigt profile',
            'Equivalent width',
            'Curve of growth: linear, flat (saturated), square-root (damping) parts',
            'Abundance analysis and [Fe/H]',
          ],
          explanation: `Line strength depends on how many absorbers sit in the right level of the right ion. In LTE the **Boltzmann equation** gives the ratio of populations in two levels of the same ion,

$$ \\frac{n_j}{n_i} = \\frac{g_j}{g_i}\\,e^{-(E_j - E_i)/kT}, $$

and the **Saha equation** gives the ratio of adjacent ionisation stages,

$$ \\frac{n_{r+1}\\,n_e}{n_r} = \\frac{2 U_{r+1}}{U_r}\\left(\\frac{2\\pi m_e kT}{h^2}\\right)^{3/2} e^{-\\chi_r/kT}, $$

with $U$ the partition functions and $\\chi_r$ the ionisation energy. Put together for hydrogen, the fraction of all hydrogen that is neutral *and* in $n = 2$ rises steeply with $T$ (Boltzmann, $E_2 - E_1 = 10.2$ eV) until ionisation (Saha, $\\chi = 13.6$ eV) takes over near 10,000 K at photospheric electron pressures. That is the quantitative reason Balmer lines peak at type A0; the same calculation explains every row of the spectral sequence and why the Sun's Ca II lines are strong though calcium is $10^{-6}$ as abundant as hydrogen. Note the explicit $n_e$: lower pressure (giants) means more ionisation at the same temperature, which is the physics behind luminosity classes.

A line's **profile** combines natural (Lorentzian) broadening, thermal **Doppler** broadening (Gaussian, $\\Delta\\lambda_D = \\lambda\\sqrt{2kT/m}/c$) and collisional (pressure) broadening, together forming the **Voigt** profile. The **equivalent width** $W = \\int (1 - F_\\lambda/F_c)\\,d\\lambda$ measures total absorption independent of resolution. As the number of absorbers $N$ increases, $W$ first grows linearly, then saturates on the flat part of the **curve of growth** (the Doppler core is black), then grows as $\\sqrt{N}$ when the damping wings take over. Abundance analysis means placing measured $W$ on a theoretical curve of growth for the star's $T$ and $\\log g$.

Read Rutten chapters 7-9 and the hydrogen-atom material in the quantum track if you need the energy levels. The Saha exercise is the heart of the lesson: once you have coded it you understand the spectral sequence.`,
          resources: [
            {
              title: 'Rutten — Radiative Transfer in Stellar Atmospheres (lecture notes)',
              url: 'https://robrutten.nl/rrweb/rjr-pubs/2003rtsa.book.....R.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Utrecht University',
              note: 'Chapters on LTE populations, line broadening and the curve of growth.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 17.3 Spectra of Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/17-3-the-spectra-of-stars-and-brown-dwarfs',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Qualitative statement of the excitation/ionisation argument to anchor the calculation.',
            },
            {
              title: 'MIT OCW 8.901 Astrophysics I — problem sets',
              url: 'https://ocw.mit.edu/courses/8-901-astrophysics-i-spring-2006/',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Includes Saha-equation and spectral-line problems.',
            },
          ],
          exercises: [
            {
              slug: 'saha-balmer-peak',
              title: 'Code the Saha-Boltzmann hydrogen calculation',
              prompt:
                'Write a Python function that, for T from 4000 to 40,000 K at electron pressure P_e = 10 Pa (and then 1 Pa and 100 Pa), computes the fraction of hydrogen atoms that are neutral and in n = 2. Use g_n = 2n^2, U_I about 2, U_II = 1. Plot the fraction against T on a log scale for the three pressures and read off the peak temperature. Explain the direction of the shift with pressure.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'calcium-vs-hydrogen',
              title: 'Why Ca II K beats H-alpha in the Sun',
              prompt:
                'For T = 5800 K and P_e = 1.5 Pa, compute (a) the fraction of hydrogen in n = 2 and (b) the fraction of calcium that is singly ionised and in its ground state (chi_I = 6.11 eV, chi_II = 11.87 eV, partition functions approximately 1.3, 2.3, 1). Multiply by the abundances (Ca/H = 2e-6) and show that Ca II ground-state absorbers outnumber Balmer absorbers by a large factor.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'curve-of-growth',
              title: 'Build a curve of growth',
              prompt:
                'Model a line with a Voigt profile (scipy.special.voigt_profile) of Doppler width 0.03 A and damping parameter a = 0.01 at 5000 A. For optical depths at line centre from 0.01 to 10,000, compute the equivalent width of the absorption line for a pure-absorption slab (F = F_c exp(-tau_lambda)) and plot log W against log tau_0. Identify the linear, flat and square-root regimes and measure their slopes.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does lowering the electron pressure increase the ionisation fraction at fixed temperature?',
              answerOutline:
                'Saha: n_{r+1} n_e / n_r is fixed by T, so lower n_e means a larger n_{r+1}/n_r; fewer electrons available to recombine.',
            },
            {
              question: 'What limits the growth of equivalent width on the flat part of the curve of growth?',
              answerOutline:
                'The Doppler core is saturated (black); adding absorbers only widens the core slightly (logarithmically) until the damping wings become significant.',
            },
            {
              question: 'What is the Doppler width of an iron line at 5000 A in a 5800 K photosphere?',
              answerOutline:
                'v = sqrt(2kT/m) about 1.3 km/s for Fe, so Delta lambda about 5000 x 1.3/3e5 = 0.02 A (plus microturbulence in practice).',
            },
          ],
          relatedLessons: [
            'thermodynamics-statistical-mechanics/applications/stellar-matter-saha-and-white-dwarfs',
            'quantum-mechanics/hydrogen-and-atoms/hydrogen-atom',
          ],
        },
        {
          slug: 'stellar-atmospheres-and-opacity',
          title: 'Stellar atmospheres and opacity sources',
          summary:
            'What makes stellar gas opaque: bound-free, free-free, electron scattering and H-minus, and how model atmospheres turn them into synthetic spectra.',
          estimatedMinutes: 100,
          objectives: [
            'List the main continuum opacity sources and the temperature regimes in which each dominates',
            'Explain why H-minus controls the solar photosphere and why the Balmer jump exists',
            'Describe the Rosseland mean opacity and Kramers\' law scaling',
            'Outline how a model-atmosphere code works and what a synthetic spectrum is',
          ],
          concepts: [
            'Bound-bound, bound-free, free-free, electron scattering',
            'H-minus ion opacity (photospheres of 4000-8000 K)',
            'Kramers opacity kappa proportional to rho T^-3.5',
            'Electron scattering kappa_es = 0.2 (1 + X) cm^2 g^-1',
            'Rosseland mean opacity',
            'Balmer and Lyman jumps',
            'Model atmosphere: hydrostatic + radiative equilibrium + LTE',
            'Opacity tables (OPAL, OP) and spectral synthesis',
          ],
          explanation: `Opacity $\\kappa$ (cm$^2$ g$^{-1}$) decides how radiation leaks out of a star, both in the atmosphere where the spectrum forms and in the interior where it sets the temperature gradient. Four processes matter. **Bound-bound** transitions make spectral lines. **Bound-free** (photoionisation) absorption has edges at the ionisation energies of each level: the **Balmer jump** at 364.6 nm is where photons become able to ionise hydrogen from $n = 2$, and its size is a sensitive temperature and gravity diagnostic in A and B stars. **Free-free** (inverse bremsstrahlung) absorption needs ions and electrons and dominates at high temperature and low frequency. Both bound-free and free-free follow **Kramers' law**, $\\kappa \\propto \\rho T^{-3.5}$, which governs stellar interiors between a few $10^4$ and $10^6$ K. **Electron scattering**, $\\kappa_{es} = 0.2(1 + X)$ cm$^2$ g$^{-1}$ for hydrogen mass fraction $X$, is grey and takes over in hot, fully ionised gas.

The solar photosphere is a surprise: at 5800 K hydrogen is neutral and in the ground state, so it absorbs almost nothing in the visible. The dominant opacity is the **negative hydrogen ion** H$^-$, a proton with two electrons bound by only 0.75 eV, whose bound-free absorption covers the whole visible and near-IR. Its abundance depends on the free electrons donated by metals, so metal-poor stars are *more* transparent and have slightly bluer colours.

For interiors one needs a frequency-averaged opacity. The **Rosseland mean** is a harmonic mean weighted by $dB_\\nu/dT$, so it is dominated by the most transparent frequencies, which is what matters when radiation diffuses. Tables from the OPAL and Opacity Project groups are what MESA reads.

A **model atmosphere** code solves hydrostatic equilibrium, radiative (plus convective) equilibrium and the LTE transfer equation on a $\\tau$ grid, then a spectral synthesis code produces the emergent spectrum line by line. Read Pols chapter 5 on opacity and Rutten's chapter on continua, then explore the opacity scaling in the exercises.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 5 (opacity, equation of state) gives the interior view.',
              primary: true,
            },
            {
              title: 'Rutten — Radiative Transfer in Stellar Atmospheres',
              url: 'https://robrutten.nl/rrweb/rjr-pubs/2003rtsa.book.....R.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Utrecht University',
              note: 'Chapters on continuous opacity, H-minus and the structure of model atmospheres.',
            },
            {
              title: 'MESA documentation — microphysics (opacity tables)',
              url: 'https://docs.mesastar.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'MESA',
              note: 'The kap module documentation lists the OPAL/OP tables MESA uses; browse to see what inputs a real code needs.',
            },
          ],
          exercises: [
            {
              slug: 'opacity-regimes',
              title: 'Map the opacity regimes',
              prompt:
                'Using kappa_es = 0.2 (1 + X), Kramers bound-free kappa_bf = 4e25 Z (1 + X) rho T^-3.5 and free-free kappa_ff = 4e22 (X + Y)(1 + X) rho T^-3.5 (cgs, X = 0.7, Y = 0.28, Z = 0.02), compute the total opacity on a grid of log rho from -8 to 2 and log T from 3.5 to 7.5. Plot contours of log kappa and shade the region where each source dominates. Overlay a rough density-temperature profile of the Sun (centre rho = 150 g cm^-3, T = 1.57e7 K to photosphere).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'balmer-jump-diagnostic',
              title: 'The Balmer jump as a thermometer',
              prompt:
                'Using SDSS spectra of about 20 stars of types B through F, measure the ratio of mean flux in 3500-3600 A to that in 3800-3900 A. Plot it against g - r. Explain the trend using the n = 2 population from your Saha code: why is the jump largest near A0 and weaker for both hotter and cooler stars?',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'h-minus-essay',
              title: 'H-minus and metallicity',
              prompt:
                'Write one page explaining why the opacity of the solar photosphere depends on the metal abundance even though H-minus is made of hydrogen, and predict qualitatively how a star with [Fe/H] = -2 but the same T_eff and log g differs in continuum opacity and in the depth of the layer at tau = 2/3.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is H-minus the dominant visible opacity in the Sun?',
              answerOutline:
                'Neutral ground-state hydrogen cannot absorb visible photons; H-minus has a 0.75 eV binding energy so its bound-free edge is at 1.6 microns, covering the whole visible range.',
            },
            {
              question: 'What is the Rosseland mean and why is it a harmonic mean?',
              answerOutline:
                'A weighted average of 1/kappa_nu over dB_nu/dT; radiation diffuses through the most transparent frequencies, so those dominate the flux.',
            },
            {
              question: 'In what regime does electron scattering dominate the opacity?',
              answerOutline:
                'Hot (above about 10^6 K), fully ionised, low-density gas where Kramers opacity (proportional to rho T^-3.5) has dropped below 0.34 cm^2 g^-1.',
            },
          ],
        },
      ],
    },
    {
      slug: 'stellar-structure-equations',
      title: 'The Equations of Stellar Structure',
      description:
        'Hydrostatic equilibrium, the virial theorem, the equation of state, polytropes and the scaling relations that explain the main sequence before any numerical model.',
      lessons: [
        {
          slug: 'hydrostatic-equilibrium-and-the-virial-theorem',
          title: 'Hydrostatic equilibrium and the virial theorem',
          summary:
            'The first structure equation, the central pressure of the Sun from one line of algebra, and the virial theorem that explains why stars heat up when they lose energy.',
          estimatedMinutes: 100,
          objectives: [
            'Derive hydrostatic equilibrium and the mass-continuity equation in Eulerian and Lagrangian form',
            'Estimate the central pressure and temperature of the Sun to order of magnitude',
            'Derive the virial theorem for a star and state its consequences for stability and evolution',
            'Explain the negative heat capacity of self-gravitating systems',
          ],
          concepts: [
            'Mass continuity dm/dr = 4 pi r^2 rho',
            'Hydrostatic equilibrium dP/dr = -G m rho / r^2',
            'Lagrangian (mass) coordinate',
            'Order-of-magnitude central pressure P_c about G M^2 / R^4',
            'Virial theorem 2 K + Omega = 0; E_total = Omega / 2',
            'Gravitational potential energy of a sphere',
            'Negative heat capacity',
            'Dynamical timescale',
          ],
          explanation: `A star is a sphere of gas in which, at every radius, the inward pull of gravity on a shell is balanced by the outward pressure gradient. With $m(r)$ the mass interior to $r$,

$$ \\frac{dm}{dr} = 4\\pi r^2 \\rho, \\qquad \\frac{dP}{dr} = -\\frac{G m \\rho}{r^2}. $$

These are the first two of the four structure equations. Because mass shells keep their identity as a star evolves, it is often better to use $m$ as the independent variable (**Lagrangian** form): $dr/dm = 1/(4\\pi r^2 \\rho)$ and $dP/dm = -Gm/(4\\pi r^4)$.

You can extract remarkable numbers without solving anything. Replacing the derivative by $P_c/R$ and $m\\rho/r^2$ by $M\\bar\\rho/R^2$ gives $P_c \\sim GM^2/R^4 \\approx 10^{15}$ Pa for the Sun (the real value is about $2.5 \\times 10^{16}$ Pa). With the ideal-gas law $P = \\rho k T/\\mu m_H$ and $\\mu \\approx 0.6$ for ionised solar gas, $T_c \\sim GM\\mu m_H/kR \\approx 10^7$ K. Nuclear fusion is inevitable at that temperature; the star does not choose to fuse, gravity forces it.

Multiplying hydrostatic equilibrium by $4\\pi r^3$ and integrating over the star gives the **virial theorem**: $\\int 3P\\,dV = -\\Omega$, where $\\Omega$ is the gravitational potential energy. For an ideal monatomic gas $3P\\,dV = 2\\,dK$, so $2K + \\Omega = 0$ and the total energy is $E = K + \\Omega = \\Omega/2 = -K$. A star that radiates energy away becomes more bound, contracts, and *gets hotter*: half the released gravitational energy goes to heating, half to radiation. This **negative heat capacity** is why a star cannot cool like a rock, why pre-main-sequence contraction leads to ignition, and why a core that exhausts its fuel contracts and heats until the next fuel burns.

Pols chapters 1-2 are the primary reading; do the virial derivation yourself and check the Kelvin-Helmholtz timescale $t_{KH} = GM^2/(2RL) \\approx 15$ Myr for the Sun, the number that once ruled out gravitational contraction as the Sun's power source. The dynamical timescale $t_{dyn} \\sim \\sqrt{R^3/GM} \\approx 30$ min shows how fast hydrostatic equilibrium is restored.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapters 1-2: observations, mechanical equilibrium and the virial theorem. The backbone text for modules 3-6.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 16.3 The Solar Interior: Theory',
              url: 'https://openstax.org/books/astronomy-2e/pages/16-3-the-solar-interior-theory',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'The descriptive picture of hydrostatic equilibrium; read before the maths.',
            },
            {
              title: 'Kippenhahn, Weigert & Weiss — Stellar Structure and Evolution (2nd ed.)',
              url: 'https://link.springer.com/book/10.1007/978-3-642-30304-3',
              type: 'textbook',
              cost: 'paid',
              provider: 'Springer',
              note: 'The classic graduate text; chapters 1-3 cover this lesson. Pols\'s notes are the free alternative.',
            },
            {
              title: 'MIT OCW 8.901 Astrophysics I',
              url: 'https://ocw.mit.edu/courses/8-901-astrophysics-i-spring-2006/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures and problem sets on stellar structure and the virial theorem.',
            },
          ],
          exercises: [
            {
              slug: 'virial-derivation',
              title: 'Derive the virial theorem',
              prompt:
                'Starting from dP/dr = -G m rho / r^2, multiply by 4 pi r^3, integrate from centre to surface by parts, and show that the integral of 3P dV equals -Omega. Then, for an ideal monatomic gas, show 2K + Omega = 0 and E = Omega/2. Finally compute Omega for a uniform-density sphere and for the n = 3 polytrope (Omega = -(3/(5-n)) G M^2 / R) and comment on the difference.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'solar-central-conditions',
              title: 'Central conditions of the Sun and other stars',
              prompt:
                'Using the order-of-magnitude estimates P_c about G M^2 / R^4 and T_c about G M mu m_H / (k R), compute P_c and T_c for the Sun, a 0.1 solar-mass M dwarf (R = 0.12 R_sun), a 20 solar-mass star (R = 6 R_sun) and a white dwarf (M = 0.6 M_sun, R = 0.01 R_sun). For the white dwarf, compare the ideal-gas T_c you get with its actual central temperature (about 10^7 K) and explain why the estimate fails.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'timescales-table',
              title: 'Dynamical, thermal and nuclear timescales',
              prompt:
                'Compute the dynamical timescale sqrt(R^3 / G M), the Kelvin-Helmholtz timescale G M^2 / (2 R L) and the nuclear timescale 0.007 x 0.1 M c^2 / L for the Sun, a 10 solar-mass star (R = 4 R_sun, L = 5000 L_sun) and a 0.3 solar-mass star (R = 0.3 R_sun, L = 0.01 L_sun). Tabulate the results and explain why the ordering t_dyn << t_KH << t_nuc is what makes stellar structure a sequence of quasi-static equilibria.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What happens to the temperature of a star in virial equilibrium when it loses energy by radiation and has no nuclear source?',
              answerOutline:
                'It contracts and heats up: E = -K, so losing energy raises K (temperature); half the gravitational energy released is radiated, half heats the star.',
            },
            {
              question: 'Why did the Kelvin-Helmholtz timescale cause a crisis in the 19th century?',
              answerOutline:
                'It gives about 15-30 Myr for the Sun, far shorter than geological and evolutionary ages of the Earth, so gravitational contraction cannot be the Sun\'s energy source.',
            },
            {
              question: 'Why is the Lagrangian form of the structure equations preferred in evolution codes?',
              answerOutline:
                'Mass shells are conserved during evolution while radii change enormously; composition and energy equations are naturally written per unit mass.',
            },
          ],
        },
        {
          slug: 'equation-of-state-and-degeneracy',
          title: 'The equation of state: ideal gas, radiation and degeneracy',
          summary:
            'Mean molecular weight, radiation pressure, electron degeneracy and the regions of the density-temperature plane where each pressure wins.',
          estimatedMinutes: 100,
          objectives: [
            'Compute the mean molecular weight for a fully ionised mixture',
            'Compare gas and radiation pressure and explain why massive stars are radiation-dominated',
            'Derive the non-relativistic and relativistic degenerate electron pressures',
            'Draw the density-temperature diagram with boundaries between ideal, degenerate and radiation-dominated regimes',
          ],
          concepts: [
            'Ideal gas P = rho k T / (mu m_H)',
            'Mean molecular weight mu; mu_e for electrons',
            'Radiation pressure P_rad = a T^4 / 3 and beta = P_gas / P',
            'Fermi momentum and degeneracy',
            'Non-relativistic degenerate pressure P proportional to rho^5/3',
            'Relativistic degenerate pressure P proportional to rho^4/3',
            'Adiabatic index gamma and dynamical stability (gamma > 4/3)',
            'Partial ionisation and the Saha equation in the envelope',
          ],
          explanation: `The structure equations need a relation $P(\\rho, T, X_i)$. In most of a main-sequence star the gas is a classical **ideal gas** of ions and electrons, $P = \\rho kT/(\\mu m_H)$, where the **mean molecular weight** counts particles per nucleon mass: for a fully ionised mixture $1/\\mu = 2X + \\tfrac{3}{4}Y + \\tfrac{1}{2}Z$, giving $\\mu \\approx 0.62$ for the Sun's surface composition and about 1.3 for pure ionised helium. Fusion raises $\\mu$ in the core, which is the thermodynamic reason a main-sequence star slowly brightens.

**Radiation pressure** $P_{rad} = aT^4/3$ adds to gas pressure. Defining $\\beta = P_{gas}/P$, the Eddington standard model shows $1 - \\beta \\propto M^2 \\mu^4 \\beta^4$ roughly, so radiation dominates above about $50$-$100\\,M_\\odot$. Because a radiation-dominated gas has adiabatic index $\\gamma \\to 4/3$, the limit of dynamical stability, very massive stars are fragile and pulsationally unstable, which is part of why the upper mass limit exists.

At high density, the Pauli principle takes over. Electrons fill momentum states up to the **Fermi momentum** $p_F = h(3n_e/8\\pi)^{1/3}$, and the pressure of a **degenerate** electron gas is independent of temperature:

$$ P_{nr} = K_1 \\left(\\frac{\\rho}{\\mu_e}\\right)^{5/3}, \\qquad P_{r} = K_2 \\left(\\frac{\\rho}{\\mu_e}\\right)^{4/3}, $$

the non-relativistic form when $p_F \\ll m_e c$ and the relativistic form when $p_F \\gg m_e c$ ($\\rho \\gtrsim 10^6$ g cm$^{-3}$). Degeneracy sets in when $kT$ drops below the Fermi energy, i.e. for $\\rho/T^{3/2} \\gtrsim 2.4 \\times 10^{-8}$ g cm$^{-3}$ K$^{-3/2}$. Because degenerate pressure does not respond to temperature, a degenerate core that ignites fuel cannot expand and cool: this is the helium flash. And because the relativistic index is exactly $4/3$, a fully relativistic degenerate star has no stable mass sequence: the Chandrasekhar limit.

Pols chapter 3 derives all of this; the quantum-statistics lesson in the thermodynamics track has the Fermi-gas derivation. The key exercise is drawing the $\\rho$-$T$ diagram and placing real stars on it; keep it, every later lesson refers to it.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 3: equation of state, including degeneracy and the rho-T diagram (figure 3.4).',
              primary: true,
            },
            {
              title: 'MIT OCW 8.901 Astrophysics I',
              url: 'https://ocw.mit.edu/courses/8-901-astrophysics-i-spring-2006/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Degenerate-gas problems in the problem sets.',
            },
            {
              title: 'Kippenhahn, Weigert & Weiss — Stellar Structure and Evolution',
              url: 'https://link.springer.com/book/10.1007/978-3-642-30304-3',
              type: 'textbook',
              cost: 'paid',
              provider: 'Springer',
              note: 'Chapters 13-16 on the equation of state. Free alternative: Pols chapter 3.',
            },
          ],
          exercises: [
            {
              slug: 'mean-molecular-weight',
              title: 'Mean molecular weights',
              prompt:
                'Derive 1/mu = 2X + 3Y/4 + Z/2 for a fully ionised gas (assume A/Z about 2 for metals) and 1/mu_e = (1 + X)/2. Evaluate mu and mu_e for (a) solar surface composition X = 0.74, Y = 0.24, Z = 0.02, (b) a solar core with X = 0.35, (c) pure helium, (d) a carbon-oxygen white dwarf. Explain how the core mu change over the main sequence affects the luminosity via homology (L proportional to mu^4 for Kramers opacity).',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'rho-t-diagram',
              title: 'Draw the rho-T diagram',
              prompt:
                'In Python, plot the lines where (i) P_gas = P_rad, (ii) ideal electron pressure equals non-relativistic degenerate pressure, (iii) non-relativistic and relativistic degenerate pressures are equal, on axes log rho (-10 to 10 g cm^-3) and log T (3 to 10 K). Mark the centres of the Sun, a 0.1 M_sun dwarf, a 20 M_sun star, a red-giant helium core (rho = 10^6, T = 10^8), a white dwarf and a neutron star (use published values). Which pressure dominates in each?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'degenerate-pressure-derivation',
              title: 'Derive the degenerate pressure',
              prompt:
                'Starting from the pressure integral P = (1/3) integral of n(p) p v dp with the zero-temperature Fermi distribution, derive P = (h^2 / 20 m_e) (3/pi)^(2/3) n_e^(5/3) for the non-relativistic case and P = (hc/8)(3/pi)^(1/3) n_e^(4/3) for the ultra-relativistic case. Give the numerical constants K_1 and K_2 in cgs with rho / mu_e as the variable.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a degenerate core ignite explosively while an ideal-gas core ignites gently?',
              answerOutline:
                'Degenerate pressure does not depend on T, so the energy released heats the gas without expansion and cooling; the reaction rate runs away until degeneracy is lifted.',
            },
            {
              question: 'What is the significance of gamma = 4/3?',
              answerOutline:
                'It is the marginal adiabatic index for dynamical stability of a self-gravitating sphere; radiation-dominated or relativistic-degenerate gas approaches it, so such stars are marginally stable.',
            },
            {
              question: 'What is mu_e and why does it appear in white-dwarf physics?',
              answerOutline:
                'Mean mass per electron in units of m_H (2 for He, C, O). Degenerate pressure depends on electron density n_e = rho / (mu_e m_H).',
            },
          ],
          relatedLessons: ['thermodynamics-statistical-mechanics/quantum-statistics/degenerate-fermi-gases'],
        },
        {
          slug: 'polytropes-and-the-lane-emden-equation',
          title: 'Polytropes and the Lane-Emden equation',
          summary:
            'Replace the energy equations with P proportional to rho^(1+1/n) and solve the resulting single ODE: the first real stellar models, and the origin of the Chandrasekhar mass.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the Lane-Emden equation from hydrostatic equilibrium and a polytropic equation of state',
            'Solve it analytically for n = 0, 1, 5 and numerically for any n',
            'Compute mass, radius, central density and central pressure of a polytrope',
            'Explain why the n = 3 polytrope has a unique mass and connect it to the Chandrasekhar limit',
          ],
          concepts: [
            'Polytropic relation P = K rho^(1 + 1/n)',
            'Lane-Emden equation and dimensionless variables xi, theta',
            'Analytic solutions n = 0, 1, 5',
            'First zero xi_1 and the mass-radius relation',
            'Central-to-mean density ratio',
            'n = 1.5: fully convective stars and non-relativistic white dwarfs',
            'n = 3: Eddington standard model and relativistic white dwarfs',
            'Chandrasekhar mass',
          ],
          explanation: `Two of the four structure equations (energy generation and transport) are hard; the other two are purely mechanical. A **polytrope** sidesteps the hard pair by assuming $P = K\\rho^{1 + 1/n}$ throughout the star, which is exact for a degenerate gas ($n = 3/2$ or $3$) and a good approximation for a fully convective star ($n = 3/2$) or a radiation-dominated one ($n = 3$). Writing $\\rho = \\rho_c\\theta^n$ and $r = a\\xi$ with $a^2 = (n+1)K\\rho_c^{1/n - 1}/4\\pi G$ turns hydrostatic equilibrium into the **Lane-Emden equation**

$$ \\frac{1}{\\xi^2}\\frac{d}{d\\xi}\\left(\\xi^2 \\frac{d\\theta}{d\\xi}\\right) = -\\theta^n, \\qquad \\theta(0) = 1,\\ \\theta'(0) = 0. $$

The surface is the first zero $\\xi_1$. Analytic solutions exist for $n = 0$ (uniform density, $\\xi_1 = \\sqrt6$), $n = 1$ ($\\theta = \\sin\\xi/\\xi$, $\\xi_1 = \\pi$) and $n = 5$ (infinite radius); otherwise you integrate numerically, which is a 20-line scipy task you will do here and reuse in the capstone. From the solution, $R = a\\xi_1$ and $M = 4\\pi a^3 \\rho_c\\,(-\\xi_1^2\\theta'(\\xi_1))$, so the central density exceeds the mean by a factor $-\\xi_1/3\\theta'(\\xi_1)$: about 6 for $n = 1.5$, 54 for $n = 3$. Eliminating $\\rho_c$ gives the mass-radius relation $M \\propto R^{(3-n)/(1-n)}$: for $n = 1.5$ white dwarfs, $R \\propto M^{-1/3}$, so heavier white dwarfs are *smaller*.

For $n = 3$ the exponent is singular: the mass is independent of radius and fixed by $K$ alone. With the relativistic degenerate $K_2$ this unique mass is the **Chandrasekhar mass**, $M_{Ch} = 1.456\\,(2/\\mu_e)^2\\,M_\\odot$. Adding mass beyond it has no equilibrium configuration. The same $n = 3$ solution with $K$ from the condition $\\beta = $ const is Eddington's standard model of a massive main-sequence star.

Pols chapter 4 is the reference; Chandrasekhar's 1931 paper is short and readable once you have the n = 3 solution in hand.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 4: polytropic models, with the table of xi_1 and theta\'(xi_1) you need.',
              primary: true,
            },
            {
              title: 'Chandrasekhar (1931), "The Maximum Mass of Ideal White Dwarfs"',
              url: 'https://ui.adsabs.harvard.edu/abs/1931ApJ....74...81C',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
              note: 'Two pages; read after you have solved the n = 3 polytrope.',
            },
            {
              title: 'MIT OCW 8.901 Astrophysics I',
              url: 'https://ocw.mit.edu/courses/8-901-astrophysics-i-spring-2006/',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Polytrope problems appear in the problem sets.',
            },
          ],
          exercises: [
            {
              slug: 'lane-emden-solver',
              title: 'Write a Lane-Emden solver',
              prompt:
                'Using scipy.integrate.solve_ivp with an event for theta = 0, solve the Lane-Emden equation for n = 0, 1, 1.5, 2, 3, 4, 4.5. Start at a small xi_0 with the series expansion theta = 1 - xi^2/6. Tabulate xi_1, -xi_1^2 theta\'(xi_1) and rho_c / rho_mean, and check n = 0 and 1 against the analytic values to 1e-6. Plot theta(xi) for all n on one figure.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'white-dwarf-mass-radius',
              title: 'White-dwarf mass-radius relation',
              prompt:
                'With K_1 for mu_e = 2 and your n = 1.5 solution, compute R(M) for white dwarfs of 0.2 to 1.0 solar masses and plot it. Then use the n = 3 solution and K_2 to compute the Chandrasekhar mass. Compare your non-relativistic R(M) with the Gaia white-dwarf radii from Gentile Fusillo et al. (2021, arXiv:2106.07669) for a few objects and discuss where relativity matters.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'sun-as-polytrope',
              title: 'The Sun as an n = 3 polytrope',
              prompt:
                'Treat the Sun as an n = 3 polytrope. From M and R compute rho_c, P_c and (assuming ideal gas with mu = 0.6) T_c. Compare with the standard solar model (rho_c = 150 g cm^-3, P_c = 2.3e17 dyn cm^-2, T_c = 1.57e7 K) and explain the sign of each discrepancy.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do more massive white dwarfs have smaller radii?',
              answerOutline:
                'For an n = 1.5 polytrope M is proportional to R^-3; degenerate pressure rises as rho^5/3, so more mass needs higher density and the star shrinks.',
            },
            {
              question: 'Why is the mass of an n = 3 polytrope independent of radius?',
              answerOutline:
                'With P proportional to rho^4/3, both pressure support and gravity scale the same way with radius, so a unique mass exists for a given K; this is the Chandrasekhar limit for relativistic degeneracy.',
            },
            {
              question: 'What is the ratio of central to mean density for n = 3 and what does it tell you about massive stars?',
              answerOutline:
                'About 54: centrally concentrated, so core conditions are far more extreme than mean values suggest.',
            },
          ],
        },
        {
          slug: 'homology-and-scaling-relations',
          title: 'Homology and the main-sequence scaling relations',
          summary:
            'Dimensional analysis on the structure equations reproduces the mass-luminosity and mass-radius relations and shows what sets the main sequence.',
          estimatedMinutes: 90,
          objectives: [
            'Apply homology transformations to the four structure equations',
            'Derive L proportional to M^3 (electron scattering) and M^5.5 R^-0.5 (Kramers) and compare with data',
            'Derive the mass-radius relation for pp-chain and CNO-burning stars',
            'Explain why the main sequence has the slope it does in the HR diagram',
          ],
          concepts: [
            'Homologous stars and scaling variables',
            'Energy-transport scaling L proportional to M^3 mu^4 / kappa',
            'Energy-generation scaling with epsilon proportional to rho T^nu',
            'Mass-radius relation R proportional to M^((nu-1)/(nu+3))',
            'Main-sequence slope in the HR diagram',
            'Dependence on mu: why metallicity and helium matter',
            'Limits of homology: convection, degeneracy, radiation pressure',
          ],
          explanation: `Before numerical models existed, Eddington and others extracted the main-sequence relations from the structure equations by **homology**: assume two stars have the same run of relative variables ($\\rho(m/M)/\\bar\\rho$ and so on) and ask how the absolute values scale with $M$ and $R$. Hydrostatic equilibrium gives $P \\propto M^2/R^4$; the ideal-gas law then gives $T \\propto \\mu M/R$. The radiative-transport equation $dT/dr \\propto \\kappa\\rho L/(r^2 T^3)$ gives

$$ L \\propto \\frac{M^3 \\mu^4}{\\kappa} $$

for constant opacity (electron scattering, massive stars) and $L \\propto M^{5.5}\\mu^{7.5}R^{-0.5}$ for Kramers opacity (solar-type stars). Notice that **luminosity is fixed by mass and transport alone**, not by the nuclear reactions: the core burns at whatever rate is needed to supply the leak. This is the deepest single insight of the module.

The energy-generation equation then sets the radius. With $\\epsilon \\propto \\rho T^{\\nu}$ and $L \\propto \\epsilon M$, equating the two expressions for $L$ gives $R \\propto M^{(\\nu - 1)/(\\nu + 3)}$: roughly $R \\propto M^{0.4}$ for pp burning ($\\nu \\approx 4$) and $R \\propto M^{0.8}$ for CNO burning ($\\nu \\approx 18$). Combining with $L = 4\\pi R^2\\sigma T_{eff}^4$ gives the slope of the main sequence, $L \\propto T_{eff}^{\\,\\sim 5\\text{-}8}$, close to what Gaia shows.

The $\\mu^4$ dependence explains why a helium-enriched or metal-poor star of fixed mass is brighter and hotter, and why the Sun has brightened by about 30% since the ZAMS as core hydrogen was converted to helium. Homology fails where its assumptions do: fully convective low-mass stars ($L \\propto M^{\\sim 2.5}$, set by the photospheric boundary), radiation-dominated massive stars ($L \\to L_{Edd} \\propto M$), and degenerate cores. Pols chapter 7 does the algebra; the exercise asks you to repeat it and then test the predictions on real binary-star masses.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 7: homology relations and the main sequence.',
              primary: true,
            },
            {
              title: 'Torres, Andersen & Gimenez (2010), accurate masses and radii of normal stars',
              url: 'https://arxiv.org/abs/0908.2624',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The DEBCat precursor: tables of eclipsing-binary masses, radii and luminosities to test scaling relations.',
            },
            {
              title: 'MIST: MESA Isochrones and Stellar Tracks',
              url: 'https://waps.cfa.harvard.edu/MIST/',
              type: 'dataset',
              cost: 'free',
              provider: 'Harvard CfA',
              note: 'Use the ZAMS points of the tracks to compare homology predictions with full models.',
            },
          ],
          exercises: [
            {
              slug: 'homology-derivation',
              title: 'Derive the scaling relations',
              prompt:
                'Write the four structure equations in Lagrangian form and substitute r = R x, m = M x etc. Derive P_c proportional to M^2 R^-4, T_c proportional to mu M R^-1, L proportional to M^3 mu^4 / kappa_0 for constant opacity and L proportional to M^5.5 mu^7.5 R^-0.5 for Kramers opacity. Then with epsilon proportional to rho T^nu derive R(M) and L(T_eff) for nu = 4 and nu = 18. Present the exponents in a table.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'test-against-binaries',
              title: 'Test the relations against eclipsing binaries',
              prompt:
                'Download the mass, radius and luminosity table from Torres et al. (2010) via its arXiv source or VizieR. Fit log L vs log M and log R vs log M with broken power laws (break at about 1.3 M_sun, the pp/CNO and convective/radiative transition). Report the exponents with uncertainties and compare with the homology predictions. Where do they disagree and why?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'solar-brightening',
              title: 'The faint young Sun',
              prompt:
                'Assume the Sun\'s luminosity scales as mu^7.5 (Kramers homology) with mu evaluated for the core. Taking the core hydrogen fraction to have gone from 0.70 to 0.35 (mass-averaged over the burning region, approximately), estimate the fractional increase in L since the ZAMS. Compare with the standard solar model value of about 30% and discuss why a core-averaged mu overestimates the effect.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What determines the luminosity of a main-sequence star: the nuclear reaction rate or the opacity?',
              answerOutline:
                'The opacity and transport: L proportional to M^3 mu^4 / kappa. The core adjusts its temperature so that fusion supplies exactly that luminosity.',
            },
            {
              question: 'Why is R proportional to M^0.8 for CNO stars but M^0.4 for pp stars?',
              answerOutline:
                'CNO burning is far more temperature-sensitive (nu about 18), so a small rise in T_c suffices for more massive stars; the radius grows faster with mass to keep T_c nearly constant.',
            },
            {
              question: 'Why does a metal-poor star of given mass lie to the left of a metal-rich one on the main sequence?',
              answerOutline:
                'Lower opacity (fewer bound-free absorbers) and slightly higher mu give higher L and smaller R, so higher T_eff.',
            },
          ],
        },
      ],
      project: {
        slug: 'polytrope-toolkit',
        title: 'Module project: a polytrope toolkit',
        description:
          'Package your Lane-Emden solver into a small library that, given n, K (or M and R), returns full profiles of rho, P, T (ideal gas) and m(r), plus derived quantities (central values, binding energy, moment of inertia). Validate against the analytic solutions and reproduce the white-dwarf mass-radius relation and the Chandrasekhar mass.',
        deliverables: [
          'Python module with unit tests for n = 0, 1 and 5',
          'A notebook producing the rho-T diagram with polytropic model loci',
          'A figure of the white-dwarf mass-radius relation with the relativistic correction and the Chandrasekhar limit marked',
        ],
        estimatedHours: 8,
      },
    },
    {
      slug: 'energy-generation-and-transport',
      title: 'Energy Generation and Transport',
      description:
        'The nuclear reactions that power stars and the radiative, conductive and convective processes that carry the energy out: the two equations that complete stellar structure.',
      lessons: [
        {
          slug: 'nuclear-reactions-pp-chain-and-cno',
          title: 'Thermonuclear reactions: the pp chain and the CNO cycle',
          summary:
            'Why fusion happens at only 15 million kelvin, the Gamow peak, and the two ways stars burn hydrogen.',
          estimatedMinutes: 110,
          objectives: [
            'Explain Coulomb-barrier tunnelling and derive the Gamow-peak energy and width',
            'Describe the pp-I, pp-II, pp-III chains and the CNO cycle, including their bottleneck reactions',
            'State the temperature sensitivities of pp and CNO burning and the crossover mass',
            'Compute the energy released per reaction and the hydrogen-burning lifetime of a star',
          ],
          concepts: [
            'Binding energy per nucleon and mass defect (0.7% for H to He)',
            'Coulomb barrier and Gamow tunnelling factor exp(-2 pi eta)',
            'Gamow peak energy E_0 and the astrophysical S-factor',
            'Reaction rate epsilon proportional to rho X^2 T^nu',
            'pp chain: the slow p + p weak step; branches I, II, III',
            'CNO cycle: 14N(p,gamma) bottleneck; catalytic',
            'Temperature exponents nu about 4 (pp) and 16-20 (CNO)',
            'Neutrino energy losses',
          ],
          explanation: `Fusing four protons into helium-4 releases 26.7 MeV, 0.7% of the rest mass; that efficiency, times the available fuel, sets the nuclear timescale of $10^{10}$ yr for the Sun. The puzzle is how protons fuse at all: at $1.5 \\times 10^7$ K the mean thermal energy is about 1 keV, while the Coulomb barrier at nuclear distances is about 1 MeV. The answer is quantum **tunnelling** with probability $\\propto \\exp(-2\\pi\\eta)$, $\\eta = Z_1 Z_2 e^2/\\hbar v$. Multiplying this rising tunnelling factor by the falling Maxwell-Boltzmann tail gives a sharply peaked integrand, the **Gamow peak** at $E_0 \\approx 1.22\\,(Z_1^2 Z_2^2 \\mu_r T_6^2)^{1/3}$ keV (about 6 keV for p+p in the Sun), and a rate that is a steep power law locally: $\\epsilon \\propto \\rho T^\\nu$ with $\\nu = (\\tau - 2)/3$, $\\tau = 3E_0/kT$. Laboratory cross sections are written as $\\sigma(E) = S(E)\\,e^{-2\\pi\\eta}/E$ so that the slowly varying **S-factor** can be extrapolated down to stellar energies.

The **pp chain** starts with $p + p \\to d + e^+ + \\nu_e$, a *weak* interaction so slow (mean proton lifetime $10^{10}$ yr) that it sets the pace; subsequent steps make $^3$He, then $^4$He via pp-I ($^3$He + $^3$He), pp-II (via $^7$Be) or pp-III (via $^8$B, source of the high-energy solar neutrinos). Its temperature sensitivity is mild, $\\nu \\approx 4$. The **CNO cycle** uses carbon, nitrogen and oxygen as catalysts; its slowest step, $^{14}$N(p,$\\gamma$)$^{15}$O, has a higher Coulomb barrier, so $\\nu \\approx 16$-$20$ and CNO wins above about $1.3\\,M_\\odot$ ($T_c \\gtrsim 1.7 \\times 10^7$ K). That steepness is why CNO cores are convective and why the main sequence changes character there. A by-product is that CNO-processed material has nitrogen enhanced at the expense of carbon, a signature seen in evolved stars.

Pols chapter 6 and OpenStax chapter 16 are the readings; the JINA REACLIB database holds the actual rate fits that MESA uses. The exercises have you compute a Gamow peak and a lifetime by hand and then read a real rate from REACLIB.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 6: nuclear reactions, Gamow peak, pp chain and CNO cycle.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 16.1-16.2 Sources of Sunshine and Mass-Energy',
              url: 'https://openstax.org/books/astronomy-2e/pages/16-3-the-solar-interior-theory',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Read sections 16.1-16.3 for the descriptive account of the pp chain.',
            },
            {
              title: 'JINA REACLIB nuclear reaction rate database',
              url: 'https://reaclib.jinaweb.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'JINA-CEE',
              note: 'Look up p(p,e+ nu)d and 14N(p,g)15O and plot their rate parametrisations versus temperature.',
            },
          ],
          exercises: [
            {
              slug: 'gamow-peak',
              title: 'Compute the Gamow peak',
              prompt:
                'For p + p, p + 14N and 4He + 4He + 4He (treat as alpha + 8Be) at T = 1.5e7 K, 2.5e7 K and 1e8 K respectively, compute the Gamow peak energy E_0, its width, and the local temperature exponent nu = (3 E_0 / kT - 2)/3. Plot the Maxwell-Boltzmann factor, the tunnelling factor and their product for the p + p case to show the peak graphically.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'reaclib-rates',
              title: 'Plot real reaction rates',
              prompt:
                'From REACLIB, obtain the seven-parameter fits for p(p,e+nu)d and 14N(p,gamma)15O. Compute N_A <sigma v> from 5e6 to 5e7 K and plot both on a log scale. Using solar-core density and composition (rho = 150, X = 0.35, X_CNO = 0.01), compute epsilon_pp and epsilon_CNO versus T and find the crossover temperature. Compare with the quoted 1.7e7 K.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'hydrogen-lifetime',
              title: 'Nuclear lifetime of the Sun',
              prompt:
                'Compute the energy released per 4He formed (use precise masses), the number of reactions per second needed for L_sun, the mass of hydrogen consumed per year, and the time to burn 10% of the Sun\'s hydrogen. Then compute the neutrino flux at Earth assuming two neutrinos per 4He, and compare with the measured 6.5e10 cm^-2 s^-1 pp-neutrino flux.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the first step of the pp chain so slow?',
              answerOutline:
                'It requires a proton to convert to a neutron via the weak interaction during the brief encounter; the cross section is about 20 orders of magnitude below strong-interaction values.',
            },
            {
              question: 'What is the astrophysical S-factor and why is it used?',
              answerOutline:
                'S(E) = sigma(E) E exp(2 pi eta) removes the steep Coulomb-tunnelling and 1/E dependence, leaving a slowly varying function that can be extrapolated from laboratory energies to stellar ones.',
            },
            {
              question: 'Why does CNO burning lead to a convective core?',
              answerOutline:
                'Its extreme temperature sensitivity concentrates energy release in a tiny central region, producing a radiative gradient steeper than adiabatic.',
            },
          ],
        },
        {
          slug: 'helium-burning-advanced-stages-and-neutrinos',
          title: 'Helium burning, advanced burning and solar neutrinos',
          summary:
            'The triple-alpha process and the Hoyle state, the sequence of burning stages up to iron, and how solar neutrinos confirmed the whole picture.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the triple-alpha reaction and the role of the 7.65 MeV resonance in carbon-12',
            'List the advanced burning stages, their temperatures, timescales and main products',
            'Explain why burning stops at iron-group elements and how neutrino losses accelerate late stages',
            'Describe the solar neutrino problem and its resolution by neutrino oscillations',
          ],
          concepts: [
            'Triple-alpha: 4He + 4He <-> 8Be, 8Be + 4He -> 12C via the Hoyle state',
            '12C(alpha,gamma)16O and the C/O ratio',
            'Carbon, neon, oxygen and silicon burning; nuclear statistical equilibrium',
            'Binding-energy curve peak at 56Fe/62Ni',
            'Neutrino cooling (pair, plasma, photo) in late stages',
            'Onion-shell structure of a presupernova star',
            'Solar neutrino spectrum: pp, 7Be, 8B, pep',
            'Homestake, SNO and the MSW effect',
          ],
          explanation: `When core hydrogen is exhausted, the helium core contracts and heats until, near $10^8$ K, helium burns. There is no stable nucleus with mass 5 or 8, so helium fusion needs a three-body encounter: two alphas form $^8$Be, which lives only $10^{-16}$ s but long enough for a third alpha to hit it. The rate is viable only because $^{12}$C has an excited state (the **Hoyle state**, 7.65 MeV) sitting just above the $^8$Be + $\\alpha$ energy, making the capture resonant. Hoyle predicted this level from the existence of carbon before it was measured. The temperature sensitivity is extreme, $\\epsilon_{3\\alpha} \\propto \\rho^2 T^{40}$, which, combined with degeneracy, produces the helium flash in low-mass stars. The subsequent $^{12}$C$(\\alpha,\\gamma)^{16}$O sets the final C/O ratio and remains one of the most important uncertain rates in astrophysics.

Massive stars continue: carbon burning ($\\sim 6 \\times 10^8$ K, centuries), neon, oxygen ($\\sim 2 \\times 10^9$ K, months), and silicon burning ($\\sim 3 \\times 10^9$ K, about a day), each stage producing the fuel for the next and leaving an **onion-shell** structure. Silicon burning proceeds by photodisintegration and recapture in quasi-equilibrium and ends at the iron group, where the binding energy per nucleon peaks: fusing further *costs* energy. The stages shorten dramatically because, above $\\sim 5 \\times 10^8$ K, the core loses energy mainly by **neutrinos** from pair annihilation and plasmon decay, which escape freely and bypass the slow photon diffusion.

The Sun's neutrinos test the whole framework. Standard solar models predict the pp, $^7$Be, pep and $^8$B fluxes; Davis's Homestake experiment saw only a third of the expected $^8$B rate, the **solar neutrino problem**. SNO's measurement of all flavours (2001-2002) showed the total flux matched the model and that electron neutrinos had **oscillated** into other flavours, enhanced in the dense solar core by the MSW effect. Borexino has since measured the pp and $^7$Be lines directly. Read Pols chapter 6 and the Nobel 2002 popular summary; the Vinyoles et al. (2017) standard solar model paper gives the modern fluxes you will use in the exercise.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 6 (helium burning and advanced stages) and the neutrino discussion.',
              primary: true,
            },
            {
              title: 'Nobel Prize in Physics 2002 (Davis, Koshiba, Giacconi)',
              url: 'https://www.nobelprize.org/prizes/physics/2002/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
              note: 'The popular and advanced information documents summarise the solar neutrino problem and its resolution.',
            },
            {
              title: 'Vinyoles et al. (2017), A new generation of standard solar models',
              url: 'https://arxiv.org/abs/1611.09867',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Table of predicted neutrino fluxes and comparison with measurements.',
            },
            {
              title: 'Heger et al. (2003), How massive single stars end their life',
              url: 'https://arxiv.org/abs/astro-ph/0212469',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The burning-stage and remnant map as a function of initial mass and metallicity.',
            },
          ],
          exercises: [
            {
              slug: 'triple-alpha-energetics',
              title: 'Triple-alpha energetics and temperature sensitivity',
              prompt:
                'Compute the Q value of 3 4He -> 12C from atomic masses and the energy per unit mass compared with hydrogen burning. Using the Gamow analysis for alpha + 8Be at 1e8 K, estimate nu and compare with the quoted value of about 40. Explain why helium burning on a degenerate core ignites unstably but on a non-degenerate core does not.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'burning-stage-table',
              title: 'Burning stages of a 20 solar-mass star',
              prompt:
                'From Heger et al. (2003) or Pols, build a table of burning stages (H, He, C, Ne, O, Si) for a 20 M_sun star: central temperature, density, duration, main products and dominant energy-loss channel. Plot log(duration) versus log(T_c) and explain the steepening with reference to neutrino losses and the decreasing energy per unit mass available.',
              kind: 'reading',
              difficulty: 1,
            },
            {
              slug: 'neutrino-flux-comparison',
              title: 'Solar neutrino budget',
              prompt:
                'Using the fluxes in Vinyoles et al. (2017), compute the expected capture rate in a chlorine detector (threshold 0.814 MeV: only 7Be, pep, 8B contribute; use the cross sections quoted in the Nobel advanced document or Bahcall\'s tables) in SNU, and compare with Homestake\'s 2.56 SNU. Then explain why the SNO neutral-current measurement resolved the discrepancy.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is there no stable mass-8 nucleus a problem for stellar nucleosynthesis, and how is it overcome?',
              answerOutline:
                'Helium cannot fuse by two-body reactions; the triple-alpha process uses the short-lived 8Be and the resonant Hoyle state of 12C to proceed at a useful rate.',
            },
            {
              question: 'Why do the advanced burning stages last days rather than millions of years?',
              answerOutline:
                'Less energy per gram is available near the iron peak, and neutrino losses dominate above about 5e8 K, so the core must burn fuel rapidly to supply both photon and neutrino luminosities.',
            },
            {
              question: 'What did SNO measure that Homestake could not?',
              answerOutline:
                'The neutral-current (all-flavour) flux via deuteron break-up, which matched the standard solar model, proving electron neutrinos had changed flavour.',
            },
          ],
        },
        {
          slug: 'radiative-and-conductive-transport',
          title: 'Radiative diffusion and conductive transport',
          summary:
            'The third structure equation: radiation diffusing through opaque gas, the Eddington luminosity, and conduction in degenerate cores.',
          estimatedMinutes: 90,
          objectives: [
            'Derive the radiative-diffusion equation for the temperature gradient',
            'Define the radiative temperature gradient nabla_rad and relate it to L, kappa and P',
            'Derive the Eddington luminosity and explain its role as a stability limit',
            'Explain when electron conduction dominates and why it makes degenerate cores isothermal',
          ],
          concepts: [
            'Photon diffusion: random walk with mean free path 1/(kappa rho)',
            'Radiative transport dT/dr = -3 kappa rho L / (16 pi a c r^2 T^3)',
            'nabla_rad = (3 kappa L P) / (16 pi a c G m T^4)',
            'Eddington luminosity L_Edd = 4 pi G M c / kappa',
            'Eddington factor and super-Eddington stability',
            'Thermal conduction and its effective opacity',
            'Isothermal degenerate cores',
            'Photon escape time of about 10^5 yr for the Sun',
          ],
          explanation: `Deep inside a star the photon mean free path $\\ell = 1/(\\kappa\\rho)$ is about a centimetre, so radiation **diffuses**. Treating it as a diffusion process with coefficient $D = c\\ell/3$ acting on the energy density $aT^4$ gives the flux $F = -(c/3\\kappa\\rho)\\,d(aT^4)/dr$, i.e. the third structure equation

$$ \\frac{dT}{dr} = -\\frac{3\\kappa\\rho L}{16\\pi a c\\, r^2 T^3}. $$

Dividing by the hydrostatic pressure gradient yields the dimensionless **radiative gradient** $\\nabla_{rad} = (d\\ln T/d\\ln P)_{rad} = 3\\kappa L P/(16\\pi a c G m T^4)$, which is the quantity compared with the adiabatic gradient to decide whether convection sets in (next lesson). A random walk of $N \\sim (R/\\ell)^2$ steps takes the Sun's photons of order $10^5$ years to escape: the light you see left the core before modern humans existed.

Radiation carries momentum, and the force it exerts on matter, $\\kappa F/c$ per unit mass, opposes gravity. Setting them equal gives the **Eddington luminosity**

$$ L_{Edd} = \\frac{4\\pi G M c}{\\kappa} \\approx 3.2 \\times 10^4 \\left(\\frac{M}{M_\\odot}\\right) L_\\odot $$

for electron scattering in hydrogen. A star cannot exceed it in hydrostatic equilibrium, which caps stellar masses near $100$-$150\\,M_\\odot$ (where $L \\propto M$ meets $L_{Edd}$), drives the winds of luminous stars, and reappears as the fundamental limit on accretion in high-energy astrophysics.

When electrons are degenerate their mean free path becomes long and **conduction** carries heat efficiently; one folds it into the opacity as $1/\\kappa_{tot} = 1/\\kappa_{rad} + 1/\\kappa_{cond}$. Because conductive opacity is tiny, degenerate cores (helium cores of red giants, white dwarf interiors) are nearly **isothermal**, which is why white dwarfs cool as a whole and why the helium flash begins off-centre where neutrino cooling has produced a temperature inversion. Pols chapter 5 covers transport; the MIT 8.901 notes have the Eddington limit.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 5: energy transport by radiation and conduction.',
              primary: true,
            },
            {
              title: 'MIT OCW 8.901 Astrophysics I',
              url: 'https://ocw.mit.edu/courses/8-901-astrophysics-i-spring-2006/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture notes on radiative transport and the Eddington luminosity.',
            },
            {
              title: 'Kippenhahn, Weigert & Weiss — Stellar Structure and Evolution',
              url: 'https://link.springer.com/book/10.1007/978-3-642-30304-3',
              type: 'textbook',
              cost: 'paid',
              provider: 'Springer',
              note: 'Chapter 5 on radiative and conductive transport. Pols is the free alternative.',
            },
          ],
          exercises: [
            {
              slug: 'diffusion-equation-derivation',
              title: 'Derive radiative diffusion',
              prompt:
                'Starting from the first moment of the transfer equation in the diffusion limit (F_nu = -(4 pi / 3 kappa_nu rho) dB_nu/dr), integrate over frequency with the Rosseland mean to obtain dT/dr = -3 kappa rho L / (16 pi a c r^2 T^3). Then derive nabla_rad and evaluate it at the solar centre (kappa = 1.2 cm^2 g^-1, L = 3.8e33 erg s^-1 interior to m = 0.1 M_sun, P = 2e17, T = 1.4e7 K).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'eddington-limit',
              title: 'Eddington limit across the HR diagram',
              prompt:
                'Compute L_Edd for 1, 10, 100 solar masses with electron-scattering opacity (X = 0.7). Using L proportional to M^3 (massive-star homology) normalised to 10 M_sun, 5000 L_sun, find the mass where L = L_Edd. Then compute the Eddington factor Gamma = L / L_Edd for Eta Carinae (L about 5e6 L_sun, M about 100 M_sun) and discuss what a photospheric opacity of 0.5 cm^2 g^-1 (iron-bump) does to the result.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'photon-random-walk',
              title: 'Simulate a photon random walk',
              prompt:
                'Write a Monte Carlo that releases photons at the centre of a uniform sphere of radius R with mean free path l and tracks isotropic scatterings until escape. Verify the escape step count scales as (R/l)^2 for R/l = 10, 30, 100. Then use a realistic solar profile of kappa rho (from a tabulated standard solar model or a polytrope with Kramers opacity) to estimate the escape time.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the radiative temperature gradient depend on opacity?',
              answerOutline:
                'Higher opacity means shorter mean free path and slower diffusion; a steeper gradient is needed to drive the same flux.',
            },
            {
              question: 'What physically happens if L > L_Edd?',
              answerOutline:
                'Radiation force exceeds gravity on the gas; hydrostatic equilibrium is impossible and the outer layers are driven off in a wind or outburst.',
            },
            {
              question: 'Why are degenerate cores isothermal?',
              answerOutline:
                'Degenerate electrons conduct heat extremely efficiently (long mean free path), so any temperature gradient is erased quickly.',
            },
          ],
        },
        {
          slug: 'convection-and-mixing-length-theory',
          title: 'Convection and mixing-length theory',
          summary:
            'The Schwarzschild and Ledoux criteria, why some stars have convective cores and others convective envelopes, and the crude but indispensable mixing-length model.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the Schwarzschild criterion for convective instability from a displaced-blob argument',
            'Explain the Ledoux criterion and semiconvection in the presence of composition gradients',
            'Describe mixing-length theory and what the parameter alpha_MLT does',
            'Predict which parts of a star of given mass are convective and why',
          ],
          concepts: [
            'Adiabatic gradient nabla_ad = 0.4 for ideal monatomic gas',
            'Schwarzschild criterion nabla_rad > nabla_ad',
            'Ledoux criterion with mu gradient; semiconvection',
            'Mixing-length theory: alpha_MLT = l / H_P',
            'Efficient (adiabatic) vs inefficient (superadiabatic) convection',
            'Convective cores above about 1.2 solar masses',
            'Convective envelopes below about 1.3 solar masses; fully convective below 0.35',
            'Convective overshoot and chemical mixing',
          ],
          explanation: `Imagine a parcel of gas displaced upward adiabatically. It expands to match the ambient pressure; if it is now *less dense* than its surroundings, buoyancy pushes it further and the layer is **convectively unstable**. Working this through with $\\nabla \\equiv d\\ln T/d\\ln P$ gives the **Schwarzschild criterion**: convection occurs where

$$ \\nabla_{rad} > \\nabla_{ad}, \\qquad \\nabla_{ad} = \\frac{\\gamma - 1}{\\gamma} = 0.4 \\text{ (ideal monatomic gas)}. $$

A composition gradient (heavier material below) stabilises; the **Ledoux criterion** adds a $\\nabla_\\mu$ term, and layers that are Schwarzschild-unstable but Ledoux-stable undergo slow **semiconvection**, important above the cores of massive stars.

Since $\\nabla_{rad} \\propto \\kappa L/m$, convection appears in two very different places. In **cores** burning by the temperature-sensitive CNO cycle, the local $L/m$ is huge, so stars above about $1.2\\,M_\\odot$ have convective cores that mix fresh hydrogen inward and extend the main-sequence lifetime. In cool **envelopes**, the opacity is large (H$^-$ and partial ionisation also lower $\\nabla_{ad}$ below 0.4), so stars below about $1.3\\,M_\\odot$ have convective envelopes that deepen with decreasing mass until stars below $0.35\\,M_\\odot$ are fully convective. The Sun has both a radiative core and an outer convection zone extending 30% of its radius, confirmed by helioseismology.

No first-principles theory of turbulent convection exists for stellar codes, so they use **mixing-length theory**: blobs travel a distance $\\ell = \\alpha_{MLT} H_P$ (a pressure scale height times a free parameter near 2) before dissolving. Deep inside, convection is so efficient that $\\nabla \\approx \\nabla_{ad}$ regardless of $\\alpha$; near the surface it is inefficient and the actual gradient, hence the stellar radius and $T_{eff}$, depends on $\\alpha_{MLT}$, which is calibrated on the Sun. **Overshoot** beyond the formal boundary and its effect on core masses remains a leading uncertainty in stellar ages. Pols chapter 5 is the reading; the MESA documentation shows how these choices appear as inlist parameters.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 5 sections on convection, the Schwarzschild/Ledoux criteria and mixing-length theory.',
              primary: true,
            },
            {
              title: 'MESA documentation',
              url: 'https://docs.mesastar.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'MESA',
              note: 'Search the controls reference for mixing_length_alpha and overshoot parameters to see how a real code exposes them.',
            },
            {
              title: 'GONG — Global Oscillation Network Group (helioseismology)',
              url: 'https://gong.nso.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'NSO',
              note: 'Background on how the solar convection-zone depth and rotation profile are measured from p-modes.',
            },
          ],
          exercises: [
            {
              slug: 'schwarzschild-derivation',
              title: 'Derive the Schwarzschild and Ledoux criteria',
              prompt:
                'Consider a blob displaced upward by dr, expanding adiabatically to ambient pressure. Show that instability requires (d ln rho / d ln P)_ad < (d ln rho / d ln P)_star, and translate to nabla_rad > nabla_ad for uniform composition. Then include a mu gradient via the ideal-gas law to obtain the Ledoux criterion nabla_rad > nabla_ad + (phi/delta) nabla_mu. Finally derive nabla_ad = 0.4 for a monatomic ideal gas and explain why it drops in partial-ionisation zones.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'convective-regions-from-polytrope',
              title: 'Where is a star convective?',
              prompt:
                'Using your n = 3 polytrope for a 1 M_sun and a 5 M_sun star (ideal gas, mu = 0.6), compute nabla_rad(r) using Kramers plus electron-scattering opacity and assuming L(r) follows epsilon proportional to rho T^4 (pp, 1 M_sun) or rho T^18 (CNO, 5 M_sun), normalised to the total L. Plot nabla_rad and nabla_ad = 0.4 against m/M and identify convective regions. Explain the differences between the two masses.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'mlt-sensitivity',
              title: 'Mixing-length sensitivity in MESA',
              prompt:
                'If you have MESA installed (or using published MIST tracks computed with alpha = 1.82), run or examine 1 M_sun models with alpha_MLT = 1.5, 1.8, 2.1 to the solar age. Report R and T_eff for each and explain why only the envelope (not the core) structure and luminosity are affected. If MESA is unavailable, write a one-page explanation using the efficiency argument.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the Schwarzschild criterion in words and in symbols.',
              answerOutline:
                'A layer is convective when the temperature gradient needed to carry the flux radiatively exceeds the adiabatic gradient: nabla_rad > nabla_ad.',
            },
            {
              question: 'Why do massive stars have convective cores but radiative envelopes, while the Sun is the reverse?',
              answerOutline:
                'CNO burning concentrates L/m in the core (large nabla_rad); the Sun\'s pp core is gentle, but its cool envelope has high opacity and low nabla_ad from partial ionisation.',
            },
            {
              question: 'Why does alpha_MLT affect the radius of a star but barely its luminosity?',
              answerOutline:
                'Luminosity is set by the core and radiative interior; alpha only changes the superadiabatic layer near the surface, which sets the entropy of the convective envelope and hence R and T_eff.',
            },
          ],
        },
      ],
    },
    {
      slug: 'stellar-evolution',
      title: 'Stellar Evolution',
      description:
        'Following a star from collapsing cloud to the end of nuclear burning, with the interior physics behind every turn in the HR diagram and hands-on runs of the MESA code.',
      lessons: [
        {
          slug: 'star-formation-and-pre-main-sequence',
          title: 'Star formation and pre-main-sequence contraction',
          summary:
            'Jeans collapse, protostars, Hayashi and Henyey tracks, and the initial mass function that sets what a population of stars looks like.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the Jeans mass and explain fragmentation in a collapsing molecular cloud',
            'Describe the protostellar phases and the role of accretion and disks',
            'Explain the Hayashi forbidden zone and why pre-main-sequence stars descend vertical tracks',
            'State the initial mass function and its consequences for cluster light and mass',
          ],
          concepts: [
            'Jeans mass and length; free-fall time',
            'Molecular clouds, cores, isothermal collapse',
            'Protostar, accretion disk, outflows; T Tauri stars',
            'Hayashi track (fully convective, nearly vertical)',
            'Henyey track (radiative core, nearly horizontal)',
            'Deuterium burning; brown-dwarf limit at 0.075 solar masses',
            'Kelvin-Helmholtz contraction to the ZAMS',
            'Initial mass function: Salpeter dN/dM proportional to M^-2.35',
          ],
          explanation: `Stars form when a region of a cold molecular cloud becomes gravitationally unstable. Balancing thermal energy against gravitational binding for a uniform sphere gives the **Jeans mass**

$$ M_J \\approx \\left(\\frac{5kT}{G\\mu m_H}\\right)^{3/2}\\left(\\frac{3}{4\\pi\\rho}\\right)^{1/2} \\approx 1\\,M_\\odot \\left(\\frac{T}{10\\,\\mathrm{K}}\\right)^{3/2}\\left(\\frac{n}{10^4\\,\\mathrm{cm^{-3}}}\\right)^{-1/2}, $$

above which collapse proceeds on the free-fall time $t_{ff} = \\sqrt{3\\pi/32G\\rho}$, about $10^5$ yr for a dense core. Because collapse is initially isothermal (the gas radiates freely), $M_J \\propto \\rho^{-1/2}$ falls as density rises and the cloud **fragments** into many cores, which is why stars form in clusters. Once a core becomes optically thick it heats, $M_J$ rises, and fragmentation stops: this sets the minimum fragment mass near $0.01\\,M_\\odot$.

The protostar then grows by accretion through a disk (angular momentum must be shed; outflows and jets are the signature) and becomes visible as a **T Tauri star**. It is now a fully convective, slowly contracting object radiating gravitational energy on the Kelvin-Helmholtz timescale. Hayashi showed that a fully convective star has a nearly fixed $T_{eff}$ of 3000-4000 K regardless of luminosity, because the H$^-$ opacity at the photosphere fixes the surface boundary condition: cooler configurations have no hydrostatic solution, the **Hayashi forbidden zone**. So the star descends a vertical **Hayashi track** in the HR diagram at nearly constant temperature, shrinking and dimming. When the interior becomes hot enough to be radiative, it turns left along a **Henyey track** at roughly constant luminosity until hydrogen ignites at the **zero-age main sequence**. Stars below $0.075\\,M_\\odot$ never reach hydrogen ignition and become brown dwarfs (though they burn deuterium briefly).

The distribution of masses produced, the **initial mass function**, is observed to be a power law $dN/dM \\propto M^{-2.35}$ (Salpeter) above $\\sim 1\\,M_\\odot$, flattening below (Kroupa, Chabrier). Low-mass stars dominate the number and mass; high-mass stars dominate the light. Pols chapter 8 and Krumholz's star-formation notes are the readings; the exercises use MIST pre-main-sequence tracks and a real young cluster.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 8: star formation and pre-main-sequence evolution.',
              primary: true,
            },
            {
              title: 'Krumholz — Notes on Star Formation',
              url: 'https://arxiv.org/abs/1511.03457',
              type: 'textbook',
              cost: 'free',
              provider: 'arXiv',
              note: 'A full free graduate text; chapters on the Jeans instability, protostellar evolution and the IMF.',
            },
            {
              title: 'OpenStax Astronomy 2e — 21.1 Star Formation',
              url: 'https://openstax.org/books/astronomy-2e/pages/21-1-star-formation',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Descriptive overview with images of star-forming regions.',
            },
            {
              title: 'Kroupa (2001), On the variation of the initial mass function',
              url: 'https://arxiv.org/abs/astro-ph/0009005',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The broken-power-law IMF used in most population models.',
            },
          ],
          exercises: [
            {
              slug: 'jeans-mass-and-fragmentation',
              title: 'Jeans mass and fragmentation',
              prompt:
                'Compute M_J and t_ff for (a) a giant molecular cloud (T = 15 K, n = 100 cm^-3), (b) a dense core (T = 10 K, n = 1e5 cm^-3), (c) the same core after it becomes optically thick and heats adiabatically to T = 100 K at n = 1e10 cm^-3. Explain why fragmentation proceeds in isothermal collapse and stops in the adiabatic phase, and estimate the opacity-limited minimum fragment mass.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'pms-tracks-mist',
              title: 'Pre-main-sequence tracks from MIST',
              prompt:
                'Download MIST evolutionary tracks for 0.3, 1, 3 and 10 solar masses (solar metallicity, v/v_crit = 0) and plot the pre-main-sequence portion in the log L - log T_eff plane. Identify the Hayashi and Henyey segments. Read off the time to reach the ZAMS for each mass and compare with the Kelvin-Helmholtz estimate using ZAMS values of R and L.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'imf-light-and-mass',
              title: 'Who dominates a cluster: number, mass or light?',
              prompt:
                'For a Kroupa IMF between 0.08 and 100 M_sun, compute numerically the fraction of stars, of mass and of luminosity (use L proportional to M^3.5 up to 20 M_sun, then proportional to M) contributed by stars above 1, 8 and 20 M_sun. Then compute the number of stars above 8 M_sun (supernova progenitors) in a 10^4 M_sun cluster.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does isothermal collapse lead to fragmentation?',
              answerOutline:
                'The Jeans mass scales as rho^-1/2 at fixed T, so as the cloud compresses ever smaller sub-regions become unstable and collapse independently.',
            },
            {
              question: 'What is the Hayashi line and why is it almost vertical?',
              answerOutline:
                'The locus of fully convective stars in the HR diagram; the surface H-minus opacity fixes T_eff at about 3000-4000 K almost independently of L.',
            },
            {
              question: 'Roughly how many stars in a cluster are more massive than 8 solar masses, for a Salpeter-like IMF?',
              answerOutline: 'Of order 0.2-0.3% by number, yet they contribute most of the ultraviolet light.',
            },
          ],
        },
        {
          slug: 'main-sequence-and-hydrogen-exhaustion',
          title: 'The main sequence and the end of core hydrogen burning',
          summary:
            'What changes during the long main-sequence phase, the difference between low- and high-mass stars, the Schonberg-Chandrasekhar limit and the subgiant branch.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the slow evolution across the main-sequence band as mu increases',
            'Contrast the structure and evolution of stars above and below about 1.2 solar masses',
            'Explain the Schonberg-Chandrasekhar limit and why it produces the Hertzsprung gap',
            'Read a MESA history file and identify the main-sequence phase',
          ],
          concepts: [
            'ZAMS and TAMS; main-sequence band width',
            'Increase of L and R with core mu',
            'Radiative core with gradual H depletion (low mass)',
            'Convective core shrinking in mass (high mass); hook at TAMS',
            'Hydrogen-shell burning and the isothermal helium core',
            'Schonberg-Chandrasekhar limit (about 10% of M for mu ratio 0.6/1.3)',
            'Subgiant branch and the Hertzsprung gap',
            'MESA history columns: star_age, log_L, log_Teff, center_h1',
          ],
          explanation: `The main sequence is long because the star sits in a thermally stable equilibrium: if the core overheats, it expands and cools (ideal gas, non-degenerate), throttling the reactions. Yet it is not static. Hydrogen burning raises the core's mean molecular weight, which by homology ($L \\propto \\mu^4$) makes the star brighter and slightly larger; the Sun was 30% fainter at the ZAMS. This is why the main sequence is a *band* of finite width in a cluster colour-magnitude diagram.

Mass divides stars into two regimes. Below about $1.2\\,M_\\odot$ the core is **radiative**, hydrogen is depleted most quickly at the centre, and burning migrates smoothly outward into a shell around a growing helium core. Above that mass the **convective core** keeps itself homogeneous, so hydrogen runs out everywhere in the core at once; the star contracts briefly, producing the "hook" in the track at the terminal-age main sequence, before shell burning starts around an abrupt helium core.

An inert, isothermal helium core can support the overlying envelope only up to a limiting fraction of the total mass, the **Schonberg-Chandrasekhar limit**, $q_{SC} \\approx 0.37\\,(\\mu_{env}/\\mu_{core})^2 \\approx 0.10$. Low-mass stars build their cores slowly and the core becomes degenerate before reaching the limit, so they evolve gradually up the subgiant branch. Stars above about $2\\,M_\\odot$ exceed the limit immediately after the main sequence: the core contracts on a thermal timescale, the envelope expands enormously by the mirror principle (a contracting core with a burning shell makes the envelope expand), and the star crosses the HR diagram in under a million years. Almost no stars are seen in transit: the **Hertzsprung gap**.

This is the lesson in which you start using MESA. Install it (or run it in a container) and evolve a 1 and a 5 $M_\\odot$ star through the main sequence, reading the \`history.data\` file with a short Python script. Pols chapters 9-10 provide the theory; the MESA documentation's "Getting started" page walks through the first run.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapters 9 (main sequence) and 10 (post-main-sequence, Schonberg-Chandrasekhar limit).',
              primary: true,
            },
            {
              title: 'MESA documentation — Getting started and test suite',
              url: 'https://docs.mesastar.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'MESA',
              note: 'Installation, the 1M_pre_ms_to_wd test case, and the history-column reference.',
            },
            {
              title: 'MESA source repository (GitHub)',
              url: 'https://github.com/MESAHub/mesa',
              type: 'tool',
              cost: 'free',
              provider: 'MESA',
              note: 'Releases and the test_suite directory of worked example inlists.',
            },
            {
              title: 'OpenStax Astronomy 2e — 22.1 Evolution from the Main Sequence to Red Giants',
              url: 'https://openstax.org/books/astronomy-2e/pages/22-1-evolution-from-the-main-sequence-to-red-giants',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
          ],
          exercises: [
            {
              slug: 'mesa-first-run',
              title: 'Your first MESA run',
              prompt:
                'Install MESA (or use the MESA Docker image) and run a 1 M_sun model from pre-main-sequence to the end of core hydrogen burning (stop when center_h1 < 1e-3). Write a Python script using numpy.genfromtxt (or the mesa_reader package) to plot: the HR track, L and R versus age, and center_h1 versus age. Report the main-sequence lifetime and the ZAMS-to-TAMS change in L and R. Repeat for 5 M_sun and identify the hook.',
              kind: 'simulation',
              difficulty: 3,
              hint: 'Start from the 1M_pre_ms_to_wd test-suite inlist and modify initial_mass and the stopping condition; a run takes minutes.',
            },
            {
              slug: 'schonberg-chandrasekhar',
              title: 'The Schonberg-Chandrasekhar limit',
              prompt:
                'Using the virial theorem applied to an isothermal ideal-gas core of mass M_c, radius R_c and temperature T_c with external pressure P_env, show that the core can supply a maximum surface pressure proportional to T_c^4 / (mu_c^4 M_c^2), and that matching this to the envelope pressure (which scales as M^2 / R^4 with R set by T_c and mu_env) gives q_SC proportional to (mu_env / mu_c)^2. Evaluate it for mu_env = 0.6, mu_c = 1.3 using the coefficient 0.37.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'hertzsprung-gap-count',
              title: 'Count stars in the Hertzsprung gap',
              prompt:
                'Using your Gaia 100 pc sample (or a volume-limited sample to 200 pc), count stars in the region of the CMD between the upper main sequence (M_G < 2) and the red clump. Compare the number density per magnitude in the gap with that on the main sequence at the same M_G. Using MIST tracks for 3 M_sun, compute the ratio of gap-crossing time to main-sequence lifetime and show it explains the observed sparseness.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a main-sequence star slowly brighten?',
              answerOutline:
                'Burning hydrogen to helium raises mu in the core; for fixed opacity L scales as mu^4, and the core contracts and heats slightly to maintain pressure support.',
            },
            {
              question: 'What is the "hook" in massive-star tracks?',
              answerOutline:
                'When a convective core exhausts hydrogen everywhere at once, the star contracts on a thermal timescale (T_eff rises briefly) before shell burning begins.',
            },
            {
              question: 'Why is the Hertzsprung gap nearly empty?',
              answerOutline:
                'Intermediate-mass stars whose helium core exceeds the Schonberg-Chandrasekhar limit cross it on a thermal timescale, a tiny fraction of their life.',
            },
          ],
        },
        {
          slug: 'red-giants-helium-flash-and-the-agb',
          title: 'Red giants, the helium flash, the horizontal branch and the AGB',
          summary:
            'Why stars become giants, the core-mass luminosity relation, the explosive but invisible helium flash, and the thermally pulsing AGB that makes carbon stars and planetary nebulae.',
          estimatedMinutes: 110,
          objectives: [
            'Explain the mirror principle and why shell burning inflates the envelope',
            'State the core-mass luminosity relation and use it to explain the RGB tip and the red clump',
            'Describe the physics of the helium flash and the horizontal branch that follows',
            'Describe thermal pulses, third dredge-up and s-process nucleosynthesis on the AGB',
          ],
          concepts: [
            'Mirror principle of shell burning',
            'Red giant branch; first dredge-up',
            'Core-mass luminosity relation L proportional to M_c^7 or so',
            'RGB tip at M_c about 0.47 solar masses; helium flash',
            'Horizontal branch and red clump',
            'Asymptotic giant branch: double shell; thermal pulses',
            'Third dredge-up, carbon stars, s-process',
            'Superwind and planetary nebula ejection',
          ],
          explanation: `After the main sequence, hydrogen burns in a shell around an inert helium core. The **mirror principle** states that when a burning shell separates a contracting core from an envelope, the envelope expands (and vice versa); the result is a **red giant**, with a dense core the size of Earth inside an envelope hundreds of solar radii across and a deep convective envelope that brings processed material (the **first dredge-up**, visible as lowered $^{12}$C/$^{13}$C) to the surface.

In low-mass stars the helium core is degenerate and the shell's luminosity is governed by the core alone: the **core-mass luminosity relation**, roughly $L \\propto M_c^{7}$ near $0.3$-$0.5\\,M_\\odot$. The star therefore climbs the giant branch at a rate set by how fast the shell adds helium to the core, independent of its total mass, which is why the red giant branch of a cluster is a tight sequence. Near $M_c \\approx 0.47\\,M_\\odot$ the core reaches $10^8$ K and helium ignites in degenerate matter: the **helium flash**, releasing $\\sim 10^{10}\\,L_\\odot$ for seconds, all absorbed in lifting the degeneracy. The tip of the RGB is therefore at a nearly fixed luminosity ($M_I \\approx -4$), a standard candle used in cosmology. Afterwards the star burns helium quietly in a non-degenerate core on the **horizontal branch** (metal-poor) or in the **red clump** (metal-rich) at $L \\approx 50\\,L_\\odot$ for 100 Myr. Stars above about $2\\,M_\\odot$ ignite helium non-degenerately and skip the flash.

When core helium is exhausted, the star enters the **asymptotic giant branch** with a carbon-oxygen core and two shells. The thin helium shell is thermally unstable, producing **thermal pulses** every $10^4$-$10^5$ yr during which convection dredges up freshly made carbon and **s-process** elements (built by slow neutron capture from $^{13}$C$(\\alpha,n)$) to the surface, creating carbon stars and enriching the Galaxy in Ba, Sr and Pb. Mass loss accelerates to a **superwind** of $10^{-5}\\,M_\\odot$ yr$^{-1}$ that strips the envelope entirely, leaving the hot core to ionise the ejecta as a planetary nebula before it fades as a white dwarf. Pols chapter 10-11 and the MESA run in the exercises take you through every step.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapters 10-11: red giants, helium burning, AGB evolution.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 23.1 The Death of Low-Mass Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/23-1-the-death-of-low-mass-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Planetary nebulae and the overview of low-mass stellar death.',
            },
            {
              title: 'MESA documentation',
              url: 'https://docs.mesastar.org/',
              type: 'documentation',
              cost: 'free',
              provider: 'MESA',
              note: 'The 1M_pre_ms_to_wd test case runs through the flash and the thermal pulses.',
            },
            {
              title: 'MIST: MESA Isochrones and Stellar Tracks',
              url: 'https://waps.cfa.harvard.edu/MIST/',
              type: 'dataset',
              cost: 'free',
              provider: 'Harvard CfA',
              note: 'Tracks include the RGB tip, core helium burning and early AGB with core-mass columns.',
            },
          ],
          exercises: [
            {
              slug: 'mesa-to-the-flash',
              title: 'Run a 1 solar-mass star through the helium flash',
              prompt:
                'Continue your MESA 1 M_sun run to the end of core helium burning. Plot log L vs age, the core mass (he_core_mass) vs log L on the RGB to verify the core-mass luminosity relation (fit the slope), the luminosity of the helium-burning region at the flash (log_LHe), and the HR track. Identify the RGB tip luminosity and compare with the observed M_I about -4 using BC_I about 0 for a cool giant.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'rgb-tip-in-gaia',
              title: 'Find the red clump and RGB tip in real data',
              prompt:
                'Query Gaia DR3 for stars within 2 kpc with parallax_over_error > 10, compute M_G and build the giant-branch luminosity function (histogram of M_G for BP - RP > 1.0). Identify the red clump peak (expected near M_G about 0.5) and the RGB tip as the sharp drop at bright magnitudes. Comment on why the clump is a peak while the tip is an edge, using the timescales from your MESA run.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'thermal-pulse-essay',
              title: 'Explain the thermal pulse cycle',
              prompt:
                'Using Pols chapter 11 (and your MESA output if the run reached the TP-AGB), write a two-page account of one thermal pulse cycle: why a thin helium shell is thermally unstable (derive the condition on shell thickness), what happens to the hydrogen shell, how third dredge-up occurs, and where the s-process neutrons come from. Include a sketch of luminosity versus time over two pulses.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the tip of the red giant branch a standard candle?',
              answerOutline:
                'Helium ignites in a degenerate core at a nearly fixed core mass (about 0.47 M_sun); the core-mass luminosity relation then fixes the luminosity nearly independently of total mass and metallicity (in the I band).',
            },
            {
              question: 'Why is the helium flash not seen at the surface?',
              answerOutline:
                'The 10^10 L_sun released for seconds is absorbed in expanding the core and lifting degeneracy; the envelope adjusts on a thermal timescale and the surface luminosity actually drops.',
            },
            {
              question: 'What makes a carbon star?',
              answerOutline:
                'Third dredge-up on the TP-AGB brings 12C from the helium shell to the surface until C/O exceeds 1.',
            },
          ],
        },
        {
          slug: 'massive-stars-and-mass-loss',
          title: 'Massive stars, winds and the approach to core collapse',
          summary:
            'How stars above 8 solar masses evolve, why their winds shape their fate, Wolf-Rayet stars, and the final onion-shell structure.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the evolution of a 15-25 solar-mass star from ZAMS to presupernova',
            'Explain line-driven winds and the metallicity dependence of mass-loss rates',
            'Explain blue and red supergiants, luminous blue variables and Wolf-Rayet stars as mass-loss sequences',
            'Relate initial mass and metallicity to final core mass and remnant type',
          ],
          concepts: [
            'Convective core and semiconvection in massive stars',
            'Line-driven winds (CAK theory), Mdot proportional to Z^0.7',
            'Humphreys-Davidson limit and luminous blue variables',
            'Red supergiants and the dust-driven wind',
            'Wolf-Rayet stars: WN, WC sequence of stripped layers',
            'Conti scenario',
            'Onion-shell presupernova structure',
            'Compactness and the remnant map (neutron star vs black hole)',
          ],
          explanation: `Stars above about $8\\,M_\\odot$ ignite carbon non-degenerately and proceed through all burning stages to an iron core. Their evolution is governed as much by **mass loss** as by nuclear burning. Hot luminous stars drive winds by absorbing momentum in thousands of ultraviolet metal lines (the Castor-Abbott-Klein mechanism), with rates $\\dot M \\sim 10^{-7}$-$10^{-5}\\,M_\\odot$ yr$^{-1}$ and terminal velocities of 1000-3000 km s$^{-1}$. Because the driving lines belong to metals, $\\dot M \\propto Z^{0.7}$ roughly, so massive stars in metal-poor galaxies keep more of their mass and die differently. Near the **Eddington limit** the winds become unstable and the star erupts as a luminous blue variable (Eta Carinae ejected $\\sim 10\\,M_\\odot$ in the 1840s); no stars are observed above the empirical **Humphreys-Davidson** luminosity limit.

A $15\\,M_\\odot$ star leaves the main sequence after 12 Myr, crosses the Hertzsprung gap in a few thousand years and becomes a **red supergiant** with a slow dusty wind. Whether it then returns to the blue depends on how much envelope is removed and on the treatment of semiconvection and overshoot, a notorious model uncertainty. Stars above $\\sim 25$-$40\\,M_\\odot$ (at solar metallicity) shed their whole hydrogen envelope and appear as **Wolf-Rayet stars**, whose emission-line spectra reveal successive layers: WN stars show CNO-processed helium and nitrogen, WC stars show helium-burning products. The **Conti scenario** links O star, LBV, WN, WC and type Ib/c supernova as one mass-loss sequence.

At the end, the star has an onion of shells (H, He, C, Ne, O, Si) around an iron core of 1.3-2 $M_\\odot$. The final **core mass and compactness**, not the initial mass alone, decide whether the collapse leaves a neutron star or a black hole, and the remnant map is non-monotonic in mass. Read Pols chapter 12, Smith's 2014 review of mass loss, and the Heger et al. map. The exercises use MIST tracks and the known progenitors of nearby supernovae.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 12: evolution of massive stars.',
              primary: true,
            },
            {
              title: 'Smith (2014), Mass loss: its effect on the evolution and fate of high-mass stars',
              url: 'https://arxiv.org/abs/1402.1237',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article on winds, eruptions and binaries in massive-star evolution.',
            },
            {
              title: 'Heger et al. (2003), How massive single stars end their life',
              url: 'https://arxiv.org/abs/astro-ph/0212469',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Figure 1 is the initial mass / metallicity map of remnant types.',
            },
            {
              title: 'Smartt (2009), Progenitors of core-collapse supernovae',
              url: 'https://arxiv.org/abs/0908.0700',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Direct detections of red-supergiant progenitors in pre-explosion images; the "red supergiant problem".',
            },
          ],
          exercises: [
            {
              slug: 'massive-tracks-with-and-without-winds',
              title: 'Massive-star tracks and mass loss',
              prompt:
                'Download MIST tracks for 15, 25 and 40 M_sun at [Fe/H] = 0 and -1. Plot the HR tracks and the total mass versus age. Determine for each the mass at the end of core helium burning, the maximum radius, and whether the star ends as a red supergiant or a hotter stripped star. Explain the metallicity dependence using Mdot proportional to Z^0.7.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'wind-momentum',
              title: 'Wind momentum and the Eddington factor',
              prompt:
                'For an O star with L = 5e5 L_sun, M = 40 M_sun, Mdot = 2e-6 M_sun/yr, v_inf = 2500 km/s compute the wind momentum rate Mdot v_inf and compare it with the photon momentum rate L/c (the single-scattering limit). Compute the Eddington factor for electron scattering. Discuss how multiple line scattering lets Wolf-Rayet winds exceed L/c.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'progenitor-mass-from-luminosity',
              title: 'Infer a progenitor mass from its pre-explosion luminosity',
              prompt:
                'Smartt (2009) lists red-supergiant progenitors with pre-explosion luminosities. Using the MIST 9-25 M_sun tracks, build the relation between initial mass and end-of-helium-burning luminosity (log L is nearly constant after core helium exhaustion), then infer initial masses for SN 2003gd, 2005cs and 2008bk from their published log L. Compare with the paper and discuss the upper limit of about 17 M_sun (the red supergiant problem).',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do metal-poor massive stars lose less mass?',
              answerOutline:
                'Line-driven winds are powered by absorption in metal lines; fewer metals means less momentum coupling, Mdot roughly proportional to Z^0.7.',
            },
            {
              question: 'What is the difference between WN and WC stars?',
              answerOutline:
                'WN stars show hydrogen-burning (CNO) products: helium and nitrogen. WC stars have lost those layers too and show helium-burning products: carbon and oxygen.',
            },
            {
              question: 'Why does the remnant type not depend monotonically on initial mass?',
              answerOutline:
                'The final core structure (compactness) depends on the interplay of shell burning and convective episodes and on mass loss; some mass ranges produce more compact cores than slightly heavier ones.',
            },
          ],
        },
      ],
      project: {
        slug: 'mesa-grid-and-isochrone',
        title: 'Module project: a MESA mini-grid and a cluster isochrone',
        description:
          'Run MESA for 0.8, 1, 1.5, 2, 3, 5 and 8 solar masses from pre-main-sequence to the end of core helium burning. Build isochrones at 100 Myr, 1 Gyr and 4 Gyr by interpolating the tracks in age, convert to Gaia magnitudes using MIST bolometric corrections and fit them to the Gaia colour-magnitude diagrams of the Pleiades, Hyades and M67 to derive ages and distance moduli.',
        deliverables: [
          'Inlists and a script that runs the grid and extracts history files',
          'A notebook that builds isochrones and overlays them on real Gaia cluster CMDs',
          'A short report of fitted ages and distances with uncertainties, compared with literature values',
        ],
        estimatedHours: 15,
        stretchGoals: ['Vary convective overshoot and show its effect on the main-sequence turn-off age of M67'],
      },
    },
    {
      slug: 'stellar-remnants',
      title: 'Stellar Remnants',
      description:
        'What stars leave behind: white dwarfs and their cooling, core collapse and supernova explosions, and the neutron stars and black holes that result.',
      lessons: [
        {
          slug: 'white-dwarfs-and-cooling',
          title: 'White dwarfs: structure, mass-radius relation and cooling',
          summary:
            'Degenerate stars in detail: the observed mass distribution, spectral types, crystallisation, and white-dwarf cooling as a clock for the Galaxy.',
          estimatedMinutes: 100,
          objectives: [
            'Describe white-dwarf structure (degenerate core, thin non-degenerate envelope) and spectral types DA, DB, DC, DQ, DZ',
            'Use the mass-radius relation to interpret Gaia white-dwarf photometry',
            'Derive the Mestel cooling law and explain departures from it (crystallisation, convective coupling)',
            'Estimate the age of a stellar population from its white-dwarf luminosity function',
          ],
          concepts: [
            'Isothermal degenerate core and radiative envelope',
            'Mass distribution peaked at 0.6 solar masses',
            'Spectral types DA (H), DB (He), DC, DQ, DZ',
            'Mass-radius relation and its Gaia confirmation',
            'Mestel cooling: L proportional to t^-7/5',
            'Crystallisation and latent heat; Debye cooling',
            'White-dwarf luminosity function and the age of the disk',
            'Initial-final mass relation',
          ],
          explanation: `A white dwarf is the exposed core of a star below about $8\\,M_\\odot$: a carbon-oxygen (or helium, or oxygen-neon) sphere of about $0.6\\,M_\\odot$ and Earth's radius, with density $10^6$ g cm$^{-3}$, held up by electron degeneracy and no longer generating energy. Its mass distribution is sharply peaked near $0.6\\,M_\\odot$ because the **initial-final mass relation** is shallow: stars from 1 to 7 $M_\\odot$ all leave cores of 0.55-1.1 $M_\\odot$. A thin ($10^{-4}$-$10^{-2}\\,M_\\odot$) non-degenerate envelope of hydrogen (type **DA**, 80%) or helium (**DB**) sits on top; gravitational settling makes the atmospheres almost pure, so DZ stars with metal lines must be accreting debris from disrupted planetesimals.

Gaia made the **mass-radius relation** visible directly: in the colour-magnitude diagram the white-dwarf sequence is a band whose width is mass, and the catalogue of Gentile Fusillo et al. (2021) gives masses and ages for 350,000 of them. The degenerate core is isothermal (electron conduction), so the star cools as a whole with the envelope acting as an insulating blanket. **Mestel's law** treats the core as an ion gas of heat capacity $\\tfrac32 k$ per ion losing energy through a Kramers-opacity envelope and gives

$$ L \\propto M\\, t^{-7/5}, \\qquad t_{cool} \\approx 10^{8}\\,\\mathrm{yr}\\,\\left(\\frac{L}{10^{-2}\\,L_\\odot}\\right)^{-5/7}. $$

Real cooling departs from this: at $\\sim 10^{-3}\\,L_\\odot$ the core **crystallises** into a Coulomb lattice, releasing latent heat that delays cooling (seen by Gaia as a pile-up in the sequence); later Debye cooling accelerates it; and $^{22}$Ne sedimentation adds further delays. Because the oldest white dwarfs of the disk have had only so long to cool, the **white-dwarf luminosity function** cuts off sharply at $L \\approx 10^{-4.5}\\,L_\\odot$, giving a disk age of 8-10 Gyr independent of stellar evolution models for the main sequence. Pols chapter 13 is the reading; the Montreal cooling models and the Gaia catalogue supply the exercise data.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 13 on white dwarfs and their cooling.',
              primary: true,
            },
            {
              title: 'Gentile Fusillo et al. (2021), Gaia EDR3 white dwarf catalogue',
              url: 'https://arxiv.org/abs/2106.07669',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The catalogue (on VizieR) with photometric masses, temperatures and cooling ages.',
            },
            {
              title: 'Montreal White Dwarf Cooling Models (Bergeron group)',
              url: 'https://www.astro.umontreal.ca/~bergeron/CoolingModels/',
              type: 'dataset',
              cost: 'free',
              provider: 'Universite de Montreal',
              note: 'Tables of L, T_eff, colours and cooling age versus mass for DA and DB white dwarfs.',
            },
          ],
          exercises: [
            {
              slug: 'mestel-derivation',
              title: 'Derive Mestel cooling',
              prompt:
                'Model a white dwarf as an isothermal ion-gas core (energy U = (3/2) N_ion k T_c) losing luminosity through a radiative envelope with Kramers opacity. Show that the envelope solution gives L proportional to M T_c^3.5 and hence dT_c/dt proportional to -T_c^3.5, so that L proportional to t^-7/5. Evaluate the cooling time to reach 10^-4 L_sun for a 0.6 M_sun CO white dwarf and compare with the Montreal tables.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gaia-wd-sequence',
              title: 'The Gaia white-dwarf sequence',
              prompt:
                'Select white dwarfs within 100 pc from Gaia DR3 (parallax > 10 mas, M_G > 8 + 5(BP - RP), quality cuts). Plot M_G versus BP - RP and overlay the Montreal cooling tracks for 0.4, 0.6, 0.8 and 1.0 M_sun. Identify the crystallisation pile-up near BP - RP about 0.8-1.2. Build the luminosity function (number per M_bol bin per pc^3) and locate the faint cut-off; convert it to a disk age with the cooling tables.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'ifmr-cluster',
              title: 'The initial-final mass relation from a cluster',
              prompt:
                'White dwarfs in the Hyades and Praesepe have known total ages (about 650 Myr). Using Montreal cooling ages for a few catalogued members (from the Gentile Fusillo catalogue) and the cluster age, compute each progenitor\'s main-sequence lifetime and hence its initial mass from MIST lifetimes. Plot final mass against initial mass and compare with the published relation.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a white dwarf not simply cool at a rate set by its surface area and temperature?',
              answerOutline:
                'The degenerate core is isothermal and stores heat in the ions; the thin non-degenerate envelope acts as an insulating blanket whose opacity controls the leak rate.',
            },
            {
              question: 'Why does crystallisation slow cooling?',
              answerOutline:
                'Latent heat is released as the Coulomb liquid of ions freezes into a lattice, supplying luminosity without a drop in core temperature.',
            },
            {
              question: 'How does the white-dwarf luminosity function give the age of the Galactic disk?',
              answerOutline:
                'The faint cut-off marks the coolest white dwarfs; their cooling age plus the short progenitor lifetime equals the age of the oldest disk stars.',
            },
          ],
        },
        {
          slug: 'core-collapse-supernovae',
          title: 'Core collapse and supernova explosions',
          summary:
            'How an iron core collapses, bounces and (usually) explodes, what the neutrinos of SN 1987A showed, and how to classify supernovae from spectra and light curves.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why an iron core collapses (photodisintegration, electron capture) and what halts the collapse',
            'Describe the neutrino-driven explosion mechanism and the energetics (10^53 erg in neutrinos, 10^51 erg kinetic)',
            'Classify supernovae (Ia, Ib, Ic, II-P, II-L, IIn) from spectra and light curves',
            'Explain the radioactive 56Ni to 56Co to 56Fe light-curve tail',
          ],
          concepts: [
            'Chandrasekhar-mass iron core; electron capture; photodisintegration',
            'Collapse to nuclear density; bounce; shock stall',
            'Neutrino heating and the delayed explosion',
            'Energetics: binding energy of a neutron star about 3e53 erg',
            'SN 1987A neutrinos (Kamiokande, IMB)',
            'Supernova types and their progenitors',
            'Light curves: plateau (II-P), radioactive tail, 56Co decay time 111 days',
            'Explosive nucleosynthesis and r-process (partial)',
          ],
          explanation: `When silicon burning builds an iron core approaching the Chandrasekhar mass ($\\sim 1.4\\,M_\\odot$ for $Y_e \\approx 0.46$), no further fusion can supply pressure. Two processes then remove it: **photodisintegration** of iron nuclei into alphas and nucleons absorbs energy, and **electron capture** on protons and nuclei ($e^- + p \\to n + \\nu_e$) removes the degenerate electrons that were holding the core up. The core collapses almost in free fall, from Earth size to 30 km in a fraction of a second, until nuclear density is reached and the stiff nuclear equation of state halts the inner core, launching a **bounce shock**.

The shock does not simply blow the star apart. It loses energy dissociating infalling iron and to neutrinos, and stalls at about 150 km. The current paradigm, confirmed by three-dimensional simulations in the past decade, is the **delayed neutrino-driven mechanism**: the proto-neutron star radiates its binding energy, $E_b \\approx 3 \\times 10^{53}$ erg, in neutrinos over about 10 s, and absorption of a few per cent of them behind the shock, aided by turbulence and the standing accretion shock instability, revives it. The explosion carries only $\\sim 10^{51}$ erg ("1 foe" or 1 Bethe) of kinetic energy and radiates $10^{49}$ erg in light. SN 1987A confirmed the energetics: Kamiokande and IMB detected 24 neutrinos over 13 seconds, exactly as expected for neutron-star formation.

Observationally, supernovae are classified by spectrum: **type II** show hydrogen (red-supergiant progenitors), **Ib** show helium but no hydrogen, **Ic** neither (stripped Wolf-Rayet or binary-stripped progenitors), while **type Ia** show strong silicon and no hydrogen and are thermonuclear white-dwarf explosions, not core collapse. Type II-P light curves show a 100-day **plateau** as the hydrogen recombination wave moves inward through the ejecta, then fall onto a **radioactive tail** powered by $^{56}$Ni $\\to$ $^{56}$Co $\\to$ $^{56}$Fe with the 111-day cobalt e-folding time; the tail's brightness measures the nickel mass (0.07 $M_\\odot$ for SN 1987A). Read Pols chapter 12 and Janka's review; the exercises use real light curves from the Open Astronomy Catalogs' successors and the Transient Name Server.`,
          resources: [
            {
              title: 'Janka (2012), Explosion mechanisms of core-collapse supernovae',
              url: 'https://arxiv.org/abs/1206.2503',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; sections 2-4 on collapse, bounce and neutrino heating.',
              primary: true,
            },
            {
              title: 'Burrows & Vartanyan (2021), Core-collapse supernova explosion theory',
              url: 'https://arxiv.org/abs/2009.14157',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Nature review of the modern 3D simulation picture.',
            },
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'Chapter 12-13 on the final stages and supernova types.',
            },
            {
              title: 'Transient Name Server',
              url: 'https://www.wis-tns.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'IAU / Weizmann Institute',
              note: 'Official registry of supernovae with classification spectra and photometry links.',
            },
          ],
          exercises: [
            {
              slug: 'collapse-energetics',
              title: 'Energetics of core collapse',
              prompt:
                'Compute the gravitational binding energy released when a 1.4 M_sun core collapses from R = 3000 km to R = 12 km (use the uniform-sphere formula, then the n = 1 polytrope correction). Compare with: the kinetic energy of a typical supernova (1e51 erg), the radiated light (1e49 erg), the energy to photodisintegrate 1.4 M_sun of iron to nucleons (8.8 MeV per nucleon), and the energy needed to unbind a 15 M_sun envelope. Where does the rest go?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'sn1987a-neutrinos',
              title: 'SN 1987A neutrino analysis',
              prompt:
                'The Kamiokande II detector (2140 tonnes of water) saw 11 events with energies 7-35 MeV in 13 s. Assuming a Fermi-Dirac spectrum with kT about 4 MeV, the inverse-beta cross section sigma about 9e-44 (E/MeV)^2 cm^2 and a distance of 51.4 kpc, estimate the total energy emitted in electron antineutrinos and multiply by 6 flavours. Compare with the binding energy of a neutron star. Then use the 13 s spread and the energy range to set an upper limit on the neutrino mass (time-of-flight argument).',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'light-curve-nickel-mass',
              title: 'Nickel mass from a light-curve tail',
              prompt:
                'Obtain a bolometric or V-band light curve of a type II-P supernova (SN 1987A, SN 1999em or SN 2004et; data via TNS links, the literature, or the ZTF/ATLAS forced-photometry services for recent events). Fit the tail beyond day 150 with L = L_0 exp(-t/111.3 d) and compare the decline rate with 56Co decay (0.0098 mag/day). From the tail luminosity derive the 56Ni mass using L(t) = 1.4e43 (M_Ni / M_sun) exp(-t/111.3 d) erg/s (approximate, full gamma-ray trapping).',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the prompt bounce shock stall?',
              answerOutline:
                'It loses energy dissociating infalling iron nuclei (about 1e51 erg per 0.1 M_sun) and to neutrino emission from the shocked matter; ram pressure of infall then halts it.',
            },
            {
              question: 'How much energy does a core-collapse supernova release, and in what form?',
              answerOutline:
                'About 3e53 erg, 99% in neutrinos of all flavours, 1% kinetic energy of ejecta, 0.01% in light.',
            },
            {
              question: 'What distinguishes a type Ib from a type II supernova and what does it imply?',
              answerOutline:
                'Type Ib lacks hydrogen lines: the progenitor lost its hydrogen envelope through winds or binary stripping before collapse.',
            },
          ],
        },
        {
          slug: 'neutron-stars-and-stellar-black-holes',
          title: 'Neutron stars and stellar-mass black holes',
          summary:
            'The basic structure of neutron stars, the maximum mass, pulsars as evidence, and the mass distribution of compact remnants from X-ray binaries and gravitational waves.',
          estimatedMinutes: 100,
          objectives: [
            'Estimate neutron-star radius and density from degeneracy arguments and explain why general relativity matters',
            'Explain the Tolman-Oppenheimer-Volkoff limit and its dependence on the nuclear equation of state',
            'Summarise the evidence from pulsars, X-ray binaries and gravitational waves for the compact-object mass distribution',
            'Describe the Schwarzschild radius and the observational signatures of stellar-mass black holes',
          ],
          concepts: [
            'Neutron degeneracy; R about 10-12 km for 1.4 solar masses',
            'Tolman-Oppenheimer-Volkoff equation and maximum mass 2-2.5 solar masses',
            'Nuclear equation of state and its uncertainty',
            'Pulsars as rotating neutron stars; spin and magnetic field',
            'Measured masses: binary pulsars, NICER radii',
            'Schwarzschild radius r_s = 2GM/c^2',
            'Black holes in X-ray binaries; dynamical mass measurements',
            'Mass gap and the LIGO/Virgo black-hole mass distribution',
          ],
          explanation: `Above the Chandrasekhar mass, electrons are captured by protons and the remnant is a ball of neutrons held up by neutron degeneracy and nuclear repulsion. Scaling the white-dwarf $n = 3/2$ polytrope from electron to neutron mass gives $R \\propto m^{-1}$, so a $1.4\\,M_\\odot$ neutron star is about 2000 times smaller than a white dwarf: radius about 10-12 km and mean density above nuclear density, $2.8 \\times 10^{14}$ g cm$^{-3}$. At such compactness $GM/Rc^2 \\approx 0.2$, so Newtonian hydrostatic equilibrium fails and one must solve the **Tolman-Oppenheimer-Volkoff** equation, in which pressure itself gravitates. That extra gravity, plus causality, gives a maximum mass of about 2-2.5 $M_\\odot$ depending on the poorly known **nuclear equation of state** above saturation density; observations of 2 $M_\\odot$ pulsars already rule out soft equations of state, and NICER's X-ray pulse-profile radii of about 12 km constrain it further.

The evidence that neutron stars exist came with pulsars in 1967: millisecond-to-second periodicities that only a compact rotating object can sustain (a body rotating faster than $\\sqrt{GM/R^3}/2\\pi$ flies apart, which for a 1 ms period demands nuclear densities). Masses from binary pulsars cluster near $1.35\\,M_\\odot$ with a tail to 2.1; a full treatment of pulsars belongs to the high-energy track.

A core that exceeds the maximum mass, or a star whose collapse never launches an explosion, forms a **black hole**. The Schwarzschild radius $r_s = 2GM/c^2 \\approx 3\\,(M/M_\\odot)$ km is the boundary; nothing inside can be observed, so stellar black holes are found by dynamics. In X-ray binaries a mass function $f(M) = P K^3/2\\pi G > 3\\,M_\\odot$ for the unseen companion is the classical criterion (Cygnus X-1, V404 Cyg), giving about two dozen masses of 5-20 $M_\\odot$. Gravitational-wave mergers have added over a hundred, extending to 80 $M_\\odot$ and revealing a possible dearth between 2.5 and 5 $M_\\odot$ (the **mass gap**) whose reality is still debated. Read OpenStax chapters 23-24 for the overview and the Ozel & Freire review for the mass data; the exercises use the ATNF catalogue and GWOSC event list.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 23.4 Pulsars and the Discovery of Neutron Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/23-4-pulsars-and-the-discovery-of-neutron-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Also read 24.5 Black Holes.',
            },
            {
              title: 'Ozel & Freire (2016), Masses, radii and the equation of state of neutron stars',
              url: 'https://arxiv.org/abs/1603.02698',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; the compilation of measured neutron-star masses.',
              primary: true,
            },
            {
              title: 'ATNF Pulsar Catalogue',
              url: 'https://www.atnf.csiro.au/research/pulsar/psrcat/',
              type: 'dataset',
              cost: 'free',
              provider: 'CSIRO',
              note: 'Query periods, period derivatives and binary parameters for about 3500 pulsars.',
            },
            {
              title: 'GWOSC event portal (GWTC catalogues)',
              url: 'https://gwosc.org/eventapi/',
              type: 'dataset',
              cost: 'free',
              provider: 'LIGO-Virgo-KAGRA',
              note: 'Component masses of all detected compact binary mergers, downloadable as JSON or CSV.',
            },
          ],
          exercises: [
            {
              slug: 'neutron-star-scaling',
              title: 'Scale from white dwarf to neutron star',
              prompt:
                'Using the n = 1.5 polytrope with neutron degeneracy pressure (replace m_e by m_n and mu_e m_H by m_n), compute the radius of a 1.4 M_sun neutron star and its mean density. Compute the compactness GM/(Rc^2), the surface gravitational redshift, and the break-up rotation period. Explain why the Newtonian estimate is only indicative.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'tov-integration',
              title: 'Integrate the TOV equation',
              prompt:
                'Write a Python integrator for the TOV equations with a simple polytropic equation of state P = K rho^2 (K chosen so that a 1.4 M_sun star has R about 12 km). Compute the mass-radius curve by varying central density and find the maximum mass. Repeat for P = K rho^(5/3) and compare. Discuss how a stiffer EOS raises the maximum mass.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Integrate in r with solve_ivp until P drops to zero; use geometric units or keep careful track of c and G.',
            },
            {
              slug: 'compact-object-mass-distribution',
              title: 'The compact-object mass distribution from real catalogues',
              prompt:
                'Download the GWTC event list from the GWOSC event API (mass_1_source, mass_2_source) and the ATNF catalogue binary pulsar masses (via psrqpy or the web form, parameters MASSFN and total mass where available). Plot a histogram of all component masses on a log axis. Identify the neutron-star peak, the putative mass gap, and the black-hole distribution; comment on selection effects in each sample.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does general relativity raise the required pressure in a neutron star compared with Newtonian gravity?',
              answerOutline:
                'In the TOV equation pressure and internal energy contribute to the gravitating mass-energy and the metric factor (1 - 2Gm/rc^2)^-1 amplifies the gradient; this is why a maximum mass exists even for an incompressible fluid.',
            },
            {
              question: 'What observable proves that a pulsar must be a neutron star rather than a white dwarf?',
              answerOutline:
                'Millisecond periods: a white dwarf would fly apart (break-up period of seconds); only nuclear-density objects can rotate so fast.',
            },
            {
              question: 'How is a stellar-mass black hole identified in an X-ray binary?',
              answerOutline:
                'From the orbital period and radial-velocity amplitude of the companion, the mass function sets a lower limit on the compact object\'s mass; above about 3 M_sun it cannot be a neutron star.',
            },
          ],
          relatedLessons: ['relativity/schwarzschild-solution-and-black-holes/the-schwarzschild-metric'],
        },
      ],
    },
    {
      slug: 'stellar-populations-and-binaries',
      title: 'Stellar Populations and Binaries',
      description:
        'Where masses, radii and ages really come from: binary orbits, eclipses, pulsating stars, asteroseismology and star clusters as snapshots of stellar evolution.',
      lessons: [
        {
          slug: 'binary-stars-and-mass-determination',
          title: 'Binary stars and the measurement of stellar masses',
          summary:
            'Visual, spectroscopic and eclipsing binaries, Kepler\'s third law in practice, the mass function, and the eclipsing-binary method for radii and distances.',
          estimatedMinutes: 110,
          objectives: [
            'Derive masses from a visual binary orbit with parallax and from a double-lined spectroscopic eclipsing binary',
            'Explain the mass function and the sin i degeneracy for single-lined systems',
            'Model an eclipsing-binary light curve to extract radii and inclination',
            'Explain why eclipsing binaries are distance indicators',
          ],
          concepts: [
            'Kepler\'s third law a^3 / P^2 = G (M_1 + M_2) / 4 pi^2',
            'Visual binaries: angular semi-major axis and parallax',
            'Radial-velocity curves; K_1, K_2 and mass ratio',
            'Mass function f(M) = P K^3 / 2 pi G',
            'Eclipsing binaries: contact times, radii, inclination',
            'Limb darkening and ellipsoidal variation',
            'Binary fraction and its dependence on mass',
            'Eclipsing binaries as distance indicators',
          ],
          explanation: `Nearly every stellar mass we know comes from a binary. Kepler's third law, $a^3/P^2 = G(M_1 + M_2)/4\\pi^2$, gives the total mass from the period and semi-major axis; the ratio comes from the stars' motions about the centre of mass. In a **visual binary** you measure the angular orbit and need the parallax to get $a$ in AU; the result is $(M_1 + M_2)/M_\\odot = (a'' / p'')^3 / P_{yr}^2$. In a **double-lined spectroscopic binary** the radial-velocity semi-amplitudes $K_1, K_2$ give $M_1/M_2 = K_2/K_1$ and $a\\sin i$, so masses scale as $M \\sin^3 i$. With only one visible spectrum you get the **mass function**

$$ f(M) = \\frac{P K_1^3}{2\\pi G} = \\frac{M_2^3 \\sin^3 i}{(M_1 + M_2)^2}, $$

a strict lower limit on $M_2$: this is how black holes in X-ray binaries are weighed.

The $\\sin i$ degeneracy is broken by **eclipses**, which require $i \\approx 90^\\circ$. An eclipsing light curve encodes the radii in units of the separation (from the durations of ingress and totality), the inclination (from eclipse depth and shape), the surface-brightness ratio (from the ratio of eclipse depths) and limb darkening. Combined with the velocity curves, a detached double-lined eclipsing binary yields masses and radii to 1-2%, the gold standard against which every evolutionary model is tested (the Torres et al. compilation). Because the radii and temperatures give the luminosity, such systems are also **distance indicators**: eclipsing binaries fix the distance to the LMC to 1%, the first rung of the Hubble-constant ladder.

Binaries are not rare: about half of solar-type stars and over 70% of O stars have companions, and most massive stars will interact. Read OpenStax 18.2 then the Kepler eclipsing-binary catalogue pages, and work through the light-curve modelling exercise; the Kepler data are superb and free.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 18.2 Measuring Stellar Masses',
              url: 'https://openstax.org/books/astronomy-2e/pages/18-1-a-stellar-census',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Section 18.2 on binaries and Kepler\'s law; 18.3 on eclipsing binaries.',
            },
            {
              title: 'Kepler Eclipsing Binary Catalog (Villanova)',
              url: 'https://keplerebs.villanova.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'Villanova University',
              note: 'About 2900 eclipsing binaries with periods, morphology and detrended light curves.',
              primary: true,
            },
            {
              title: 'Torres, Andersen & Gimenez (2010), accurate masses and radii of normal stars',
              url: 'https://arxiv.org/abs/0908.2624',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The reference compilation of detached eclipsing-binary parameters.',
            },
            {
              title: 'lightkurve documentation',
              url: 'https://lightkurve.github.io/lightkurve/',
              type: 'tool',
              cost: 'free',
              provider: 'NASA / STScI',
              note: 'Python package to download and fold Kepler and TESS light curves.',
            },
          ],
          exercises: [
            {
              slug: 'sirius-visual-binary',
              title: 'Weigh Sirius',
              prompt:
                'Sirius A and B have P = 50.1 yr, angular semi-major axis 7.50 arcsec and parallax 379 mas; the ratio of distances from the centre of mass is a_B / a_A = 2.05. Compute the total mass and the individual masses in solar units. Using Sirius B\'s T_eff = 25,000 K and L = 0.026 L_sun, compute its radius and compare with the white-dwarf mass-radius relation.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'kepler-eb-light-curve',
              title: 'Model a Kepler eclipsing binary',
              prompt:
                'With lightkurve, download the Kepler light curve of a detached eclipsing binary (e.g. KIC 6131659 or any system with morphology parameter < 0.3 from the Villanova catalogue). Determine the period with a box-least-squares or Lomb-Scargle search, fold the curve, and measure the depths and durations of both eclipses. From the durations and period estimate (R_1 + R_2)/a and the inclination, and from the depth ratio the surface-brightness ratio. If you have radial velocities from the literature, derive absolute radii.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'For a circular orbit the total eclipse duration gives (R_1 + R_2)/a times a geometric factor involving cos i; start by assuming i = 90 degrees.',
            },
            {
              slug: 'mass-function-black-hole',
              title: 'Mass function of an X-ray binary',
              prompt:
                'The companion in GRS 1915+105 has P = 33.9 d and K = 126 km/s (a K giant of about 0.5 M_sun). Compute f(M) and the minimum compact-object mass. For i = 60 and 70 degrees, compute the compact-object mass. Explain why this object must be a black hole.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a single-lined spectroscopic binary tell you about the unseen companion?',
              answerOutline:
                'Only the mass function, a lower limit on its mass that depends on sin^3 i and the primary mass.',
            },
            {
              question: 'How do eclipse durations yield stellar radii?',
              answerOutline:
                'Ingress duration is set by the smaller star\'s diameter crossing the limb, total duration by the sum of radii, both relative to the orbital separation and modulated by inclination.',
            },
            {
              question: 'Why are detached eclipsing binaries distance indicators?',
              answerOutline:
                'Absolute radii plus temperatures (from spectra/colours) give luminosities; comparing with observed fluxes gives the distance without any calibration on other stars.',
            },
          ],
        },
        {
          slug: 'binary-evolution-and-mass-transfer',
          title: 'Binary evolution and mass transfer',
          summary:
            'Roche lobes, the three cases of mass transfer, stability, common envelopes, and the exotic objects (Algols, cataclysmic variables, X-ray binaries, type Ia progenitors) that result.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the Roche potential and compute the Roche-lobe radius with the Eggleton formula',
            'Explain cases A, B and C of mass transfer and when each occurs',
            'Determine whether mass transfer is stable from the response of the donor and of the Roche lobe',
            'Explain the common-envelope phase and the formation of close compact binaries',
          ],
          concepts: [
            'Roche potential, Lagrange points, Roche lobe',
            'Eggleton approximation for R_L / a',
            'Roche-lobe overflow; cases A, B, C',
            'Conservative mass transfer and orbital evolution',
            'Stability: donor and Roche-lobe mass-radius exponents',
            'Algol paradox',
            'Common envelope and alpha-lambda energy prescription',
            'Outcomes: cataclysmic variables, X-ray binaries, double degenerates, SN Ia channels',
          ],
          explanation: `In a close binary each star sits in a potential well bounded by its **Roche lobe**, the equipotential through the inner Lagrange point $L_1$. Eggleton's formula gives its effective radius to 1%:

$$ \\frac{R_L}{a} = \\frac{0.49\\,q^{2/3}}{0.6\\,q^{2/3} + \\ln(1 + q^{1/3})}, \\qquad q = M_{donor}/M_{accretor}. $$

Stars expand as they evolve, so a star in a binary tighter than a few AU will eventually fill its lobe and transfer mass through $L_1$. Kippenhahn's classification is by evolutionary stage at overflow: **case A** on the main sequence, **case B** after core-hydrogen exhaustion but before helium ignition (the most common), and **case C** afterwards.

Whether transfer is gentle or catastrophic depends on how the donor's radius responds to mass loss compared with how its Roche lobe responds. For conservative transfer, angular-momentum conservation gives $a \\propto (M_1 M_2)^{-2}$, so the orbit shrinks while the donor is the more massive star and the lobe shrinks with it; transfer from a more massive donor is therefore **unstable** on a thermal or dynamical timescale until the mass ratio reverses, after which it slows. This resolves the **Algol paradox** (the less massive star is the more evolved one: it was originally the heavier star and has given most of its mass away). Donors with convective envelopes expand on mass loss and are prone to **dynamical instability**.

Dynamical-timescale transfer engulfs the companion in a **common envelope**. Drag spirals the two cores together on a few hundred years, and orbital energy expels the envelope (the $\\alpha_{CE}\\lambda$ energy prescription), leaving a close binary of a compact object and a stripped star, or a merger. This is the route to cataclysmic variables, low-mass X-ray binaries, double white dwarfs, double neutron stars and the gravitational-wave mergers of the high-energy track, and one of the two channels (single-degenerate accretion to the Chandrasekhar mass versus double-degenerate mergers) for type Ia supernovae, whose progenitors remain unidentified. Read Pols chapter 14 (binary notes) and the Maoz et al. review of Ia progenitors; the exercise builds a small orbital-evolution code.`,
          resources: [
            {
              title: 'Pols — Stellar Structure and Evolution lecture notes (Utrecht)',
              url: 'https://www.astro.ru.nl/~onnop/education/stev_utrecht_notes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Radboud University',
              note: 'The binary chapter and the companion "Binary stars" notes on the same site.',
              primary: true,
            },
            {
              title: 'Maoz, Mannucci & Nelemans (2014), Observational clues to the progenitors of type Ia supernovae',
              url: 'https://arxiv.org/abs/1312.0628',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article on single- and double-degenerate channels.',
            },
            {
              title: 'Hurley, Pols & Tout (2000), Comprehensive analytic formulae for stellar evolution',
              url: 'https://arxiv.org/abs/astro-ph/0001295',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The fitting formulae used in rapid binary population synthesis; useful for the exercise.',
            },
          ],
          exercises: [
            {
              slug: 'roche-lobe-calculator',
              title: 'Roche lobes and the onset of mass transfer',
              prompt:
                'Write a function implementing the Eggleton formula. For a 5 + 3 M_sun binary with P = 2, 20 and 200 days compute a and R_L of the primary. Using MIST tracks for 5 M_sun, find the evolutionary phase (case A, B or C) at which the primary fills its lobe in each case and the age at which it happens.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'conservative-transfer-evolution',
              title: 'Simulate conservative mass transfer',
              prompt:
                'Derive a / a_0 = (M_1,0 M_2,0 / M_1 M_2)^2 for conservative transfer and implement it. Starting from 5 + 3 M_sun, P = 5 d, transfer mass from star 1 to star 2 in 0.1 M_sun steps and plot a, P and R_L,1 versus M_1. Mark the point of mass-ratio reversal and explain why transfer is fast before it and slow after. Show the final state resembles an Algol system.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'common-envelope-energy',
              title: 'Common-envelope energetics',
              prompt:
                'A 1.2 M_sun red giant (core 0.4 M_sun, R = 100 R_sun, lambda = 0.5) engulfs a 0.6 M_sun white dwarf at a = 150 R_sun. Using the energy prescription alpha_CE [G M_c M_WD / (2 a_f) - G M_1 M_WD / (2 a_i)] = G M_1 M_env / (lambda R), compute the final separation and period for alpha_CE = 0.3 and 1.0. Is the result a cataclysmic variable or a merger? Discuss which assumptions dominate the uncertainty.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the Algol paradox and its resolution.',
              answerOutline:
                'The subgiant in Algol is less massive than its main-sequence companion, contradicting single-star evolution; it was originally the more massive star and transferred most of its mass through Roche-lobe overflow.',
            },
            {
              question: 'Why does conservative mass transfer from the more massive star shrink the orbit?',
              answerOutline:
                'Angular momentum conservation gives a proportional to (M_1 M_2)^-2; moving mass from the heavier to the lighter star increases the product M_1 M_2, so a decreases.',
            },
            {
              question: 'What does the common-envelope phase accomplish?',
              answerOutline:
                'It converts a wide binary with an evolved donor into a very close binary (or merger) by using orbital energy to eject the envelope on a dynamical timescale.',
            },
          ],
        },
        {
          slug: 'pulsating-stars-and-asteroseismology',
          title: 'Pulsating stars and asteroseismology',
          summary:
            'Why some stars pulsate, the kappa mechanism and the instability strip, the Cepheid period-luminosity law, and how solar-like oscillations measure masses, radii and ages.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the period-mean-density relation and the kappa mechanism',
            'Locate the instability strip and the main pulsator classes in the HR diagram',
            'Use the Cepheid period-luminosity relation and explain its physical basis',
            'Extract nu_max and the large separation from a Kepler power spectrum and derive mass and radius via the scaling relations',
          ],
          concepts: [
            'Period-mean density relation P proportional to rho^-1/2',
            'Kappa (opacity) mechanism in the He II partial-ionisation zone',
            'Instability strip; Cepheids, RR Lyrae, delta Scuti',
            'Leavitt law: Cepheid period-luminosity relation',
            'p-modes and g-modes; radial order n, degree l',
            'Solar-like oscillations: nu_max and large frequency separation Delta nu',
            'Scaling relations for M and R',
            'Red-giant mixed modes and core-helium-burning diagnostics',
          ],
          explanation: `A star can oscillate like an organ pipe, and its fundamental period is set by the sound-crossing time, $\\Pi \\propto 1/\\sqrt{G\\bar\\rho}$: hours for a white dwarf, days for a Cepheid, a year for a Mira. Most stars damp such oscillations, but in a strip of the HR diagram the **kappa mechanism** drives them. In the layer where He II is partially ionised, compression raises the opacity (energy goes into ionisation rather than temperature), trapping heat that is released on expansion, exactly the phasing of a heat engine. The **instability strip** is where that layer sits at the right depth: too hot and it is too shallow to hold the mass needed, too cool and convection carries the flux. Classical **Cepheids** (5-20 $M_\\odot$ crossing the strip), **RR Lyrae** (old horizontal-branch stars) and **delta Scuti** stars all live here.

Because the period depends on mean density and the strip has nearly fixed temperature, period correlates with luminosity: Henrietta Leavitt's **period-luminosity relation**, $M_V \\approx -2.43\\log_{10}(P/\\mathrm{d}) - 1.6$ (roughly, metallicity-dependent), makes Cepheids the second rung of the distance ladder and a direct input to the Hubble constant. OGLE's Magellanic Cloud light curves are the modern calibration set.

The Sun and all cool stars also oscillate at low amplitude, stochastically excited by convection. These **solar-like oscillations** are acoustic **p-modes** with a comb-like spectrum: a peak frequency $\\nu_{max} \\propto g/\\sqrt{T_{eff}}$ and a **large separation** $\\Delta\\nu \\propto \\sqrt{\\bar\\rho}$. Inverting these two scaling relations gives mass and radius to a few per cent for thousands of Kepler and TESS stars without any binary, and the mixed p-g modes of red giants even distinguish hydrogen-shell from core-helium burning. Asteroseismology, reviewed by Aerts (2021), has become the main source of stellar ages for Galactic archaeology. Read Pols chapter 10 on pulsation and the GONG/JCD notes for the solar case; the exercise takes a Kepler light curve all the way to a mass.`,
          resources: [
            {
              title: 'Aerts (2021), Probing the interior physics of stars through asteroseismology',
              url: 'https://arxiv.org/abs/1912.12300',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Reviews of Modern Physics article; sections 1-3 for the basics, later ones for red giants and massive stars.',
              primary: true,
            },
            {
              title: 'Christensen-Dalsgaard — Lecture Notes on Stellar Oscillations',
              url: 'https://users-phys.au.dk/jcd/oscilnotes/',
              type: 'textbook',
              cost: 'free',
              provider: 'Aarhus University',
              note: 'The standard free graduate notes on the theory of stellar pulsation.',
            },
            {
              title: 'OGLE — Optical Gravitational Lensing Experiment',
              url: 'https://ogle.astrouw.edu.pl/',
              type: 'dataset',
              cost: 'free',
              provider: 'Warsaw University Observatory',
              note: 'Catalogues of Cepheids and RR Lyrae in the Magellanic Clouds with periods and mean magnitudes.',
            },
            {
              title: 'lightkurve documentation',
              url: 'https://lightkurve.github.io/lightkurve/',
              type: 'tool',
              cost: 'free',
              provider: 'NASA / STScI',
              note: 'The periodogram and seismology modules compute nu_max and Delta nu from Kepler light curves.',
            },
          ],
          exercises: [
            {
              slug: 'leavitt-law-from-ogle',
              title: 'Rebuild the Leavitt law',
              prompt:
                'Download the OGLE-IV catalogue of classical Cepheids in the LMC (fundamental-mode pulsators, periods and mean I and V magnitudes). Plot mean I against log P and fit a line. Using the LMC distance modulus 18.477 (from eclipsing binaries), convert to absolute magnitudes. Apply your relation to a Milky Way Cepheid with a Gaia parallax (e.g. delta Cephei: P = 5.366 d, <V> = 3.95, parallax about 3.6 mas) and compare predicted with observed distance.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'kepler-seismology',
              title: 'Seismic mass and radius of a Kepler star',
              prompt:
                'With lightkurve, download the Kepler short-cadence light curve of KIC 11904151 (Kepler-10) or long-cadence data for a bright red giant such as KIC 1435467. Compute the power spectrum, estimate nu_max (centre of the Gaussian envelope) and Delta nu (via the autocorrelation of the spectrum). Apply the scaling relations M/M_sun = (nu_max/3090)^3 (Delta nu/135.1)^-4 (T_eff/5777)^1.5 and R/R_sun = (nu_max/3090)(Delta nu/135.1)^-2 (T_eff/5777)^0.5 with T_eff from the Kepler Input Catalog. Compare with published values.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'kappa-mechanism-explanation',
              title: 'Explain the kappa mechanism',
              prompt:
                'Write a one-page explanation of why the He II ionisation zone drives pulsation, using the Carnot-engine analogy: what happens to opacity on compression, why energy is stored, and why the blue and red edges of the instability strip exist. Estimate the depth (in temperature) of the He II zone and explain why it lies at the right depth only in a limited range of T_eff.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does pulsation period correlate with luminosity for Cepheids?',
              answerOutline:
                'Period scales with (mean density)^-1/2; in the narrow instability strip T_eff is nearly fixed, so larger (more luminous) stars have lower density and longer periods.',
            },
            {
              question: 'What two seismic observables give a star\'s mass and radius, and what does each measure physically?',
              answerOutline:
                'nu_max (proportional to g / sqrt(T_eff), the acoustic cut-off) and Delta nu (proportional to sqrt(mean density), the inverse sound-crossing time).',
            },
            {
              question: 'Why does ordinary opacity damp rather than drive pulsation in most layers?',
              answerOutline:
                'Kramers opacity decreases with temperature, so compression (heating) makes gas more transparent and it loses heat at maximum compression, the wrong phase for driving; only in partial-ionisation zones does opacity rise on compression.',
            },
          ],
        },
        {
          slug: 'star-clusters-and-stellar-populations',
          title: 'Star clusters, isochrones and stellar populations',
          summary:
            'Clusters as coeval, equidistant samples: isochrone fitting for ages and distances, globular clusters and the age of the Universe, and the synthesis of integrated populations.',
          estimatedMinutes: 100,
          objectives: [
            'Fit an isochrone to a cluster colour-magnitude diagram to derive age, distance, reddening and metallicity',
            'Explain the main-sequence turn-off as an age clock and its uncertainties',
            'Describe Population I, II and III and the chemical evolution that distinguishes them',
            'Explain stellar population synthesis and its use for galaxy ages and masses',
          ],
          concepts: [
            'Open vs globular clusters',
            'Isochrones and the turn-off age',
            'Degeneracies: age-metallicity, distance-reddening',
            'Globular-cluster ages and the age of the Universe',
            'Populations I, II, III; alpha-element ratios',
            'Binary sequence and blue stragglers',
            'Simple stellar population; integrated spectra and colours',
            'Mass-to-light ratio and its age dependence',
          ],
          explanation: `A star cluster is nature's controlled experiment: thousands of stars with the same age, distance and composition but different masses. Its colour-magnitude diagram is therefore an **isochrone**, a snapshot of evolution at one age, and comparing it with model isochrones (MIST, PARSEC, BaSTI) yields age, distance, reddening and metallicity. The most sensitive clock is the **main-sequence turn-off**: stars more massive than $M_{TO}$ have left the main sequence, and since $t_{MS} \\propto M^{-2.5}$, the turn-off luminosity drops with age. For young open clusters (Pleiades, 125 Myr) the turn-off is at B stars; for the oldest **globular clusters** it is below the Sun's mass, giving ages of 12-13 Gyr that were, before the CMB, the strongest lower limit on the age of the Universe and a check on cosmology that still holds.

Fitting is harder than it looks. Age and metallicity both redden the turn-off; distance and reddening shift the diagram along similar directions; unresolved binaries blur the sequence upward; convective overshoot changes turn-off morphology; and **blue stragglers** (merger or mass-transfer products) sit above the turn-off where no single star should. Good fits use multiple features (turn-off, subgiant branch, red clump, white-dwarf sequence) and marginalise over nuisance parameters, which the exercise asks you to do with Gaia data.

Baade's **Population I** (young, metal-rich, disk) and **Population II** (old, metal-poor, halo and bulge) are the extremes of Galactic chemical evolution; **Population III**, the first metal-free stars, has never been observed directly. Abundance ratios such as $[\\alpha/\\mathrm{Fe}]$ encode the timescale of enrichment (core-collapse supernovae make alpha elements quickly, type Ia add iron after a delay). Summing stellar spectra over an IMF and an isochrone gives a **simple stellar population** model; combinations of these fit galaxy spectra and give the ages, masses and star-formation histories that the galaxies track relies on. The mass-to-light ratio of a population rises steeply with age, which is why galaxy stellar masses are only known to a factor of two. Conroy's 2013 review covers population synthesis; OpenStax chapter 22.4 and Pols chapter 9 cover cluster ages.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 22.4 Further Evolution of Stars and Cluster Ages (chapter 22)',
              url: 'https://openstax.org/books/astronomy-2e/pages/22-1-evolution-from-the-main-sequence-to-red-giants',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Read 22.3-22.5 on star clusters and how their HR diagrams reveal ages.',
            },
            {
              title: 'MIST: MESA Isochrones and Stellar Tracks',
              url: 'https://waps.cfa.harvard.edu/MIST/',
              type: 'dataset',
              cost: 'free',
              provider: 'Harvard CfA',
              note: 'Isochrone interpolator with Gaia, 2MASS and SDSS photometry.',
              primary: true,
            },
            {
              title: 'Conroy (2013), Modeling the panchromatic spectral energy distributions of galaxies',
              url: 'https://arxiv.org/abs/1301.7095',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article on stellar population synthesis and its uncertainties.',
            },
            {
              title: 'Gaia Archive (ESA)',
              url: 'https://gea.esac.esa.int/archive/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
              note: 'Cluster members can be selected by position, parallax and proper motion in ADQL.',
            },
          ],
          exercises: [
            {
              slug: 'isochrone-fit-m67',
              title: 'Fit an isochrone to M67',
              prompt:
                'Select Gaia DR3 stars within 25 arcmin of M67 with proper motions within 1 mas/yr of (-11.0, -2.9) mas/yr and parallax 1.0-1.3 mas. Plot the CMD. Download MIST isochrones for ages 2, 3, 4, 5 Gyr at [Fe/H] = 0 and overlay them with distance modulus and reddening as free parameters. Fit by minimising a robust distance between stars and the isochrone (or by eye, then refine). Report age, distance and E(B - V) with rough uncertainties and identify the blue stragglers and the binary sequence.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'globular-cluster-age',
              title: 'Age of a globular cluster',
              prompt:
                'Repeat the isochrone fit for the globular cluster NGC 6397 (parallax about 0.41 mas, [Fe/H] = -2.0) or M4 using Gaia DR3 members selected by proper motion. Use metal-poor MIST isochrones at 10, 12, 14 Gyr. Report the age, discuss the age-metallicity degeneracy, and compare the result with the age of the Universe from Planck (13.8 Gyr).',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'simple-stellar-population',
              title: 'Build a toy simple stellar population',
              prompt:
                'Using a MIST isochrone at 10 Myr, 100 Myr, 1 Gyr and 10 Gyr and a Kroupa IMF, compute the integrated B - V colour and the V-band mass-to-light ratio of a 10^6 M_sun population at each age (include the stellar mass that remains after accounting for lost mass, ignore remnants). Plot M/L_V versus age on log axes and explain why galaxy stellar masses depend on the assumed star-formation history.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the main-sequence turn-off a good age indicator?',
              answerOutline:
                'Main-sequence lifetime depends steeply on mass (M^-2.5); the most massive star still on the main sequence therefore dates the population.',
            },
            {
              question: 'Name two degeneracies in isochrone fitting and how to break them.',
              answerOutline:
                'Age-metallicity (both redden the turn-off: use spectroscopic metallicity or the subgiant/giant-branch shape) and distance-reddening (use Gaia parallaxes or multi-band photometry).',
            },
            {
              question: 'What are blue stragglers?',
              answerOutline:
                'Stars above and bluer than the turn-off, more massive than the single-star limit; formed by mergers or mass transfer in binaries.',
            },
            {
              question: 'Why did globular-cluster ages matter for cosmology?',
              answerOutline:
                'Their ages of 12-13 Gyr set a lower bound on the age of the Universe, once in tension with high H_0 values and now consistent with the Lambda-CDM age of 13.8 Gyr.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'stellar-structure-code',
    title: 'Capstone: a stellar-structure code validated against MESA and Gaia',
    description: `Build, from the four stellar-structure equations, a working code that produces zero-age main-sequence models and then compare it with a professional code and with real stars.

Start with the polytrope solver from module 3 and extend it to a full ZAMS model: integrate mass, pressure, luminosity and temperature with an ideal-gas plus radiation equation of state, Kramers plus electron-scattering opacity, pp-chain and CNO energy generation, and the Schwarzschild criterion with a simple mixing-length prescription for convection. Use a shooting (or Henyey-style relaxation) method to satisfy boundary conditions at both centre and surface. Produce models from 0.5 to 20 solar masses.

Then validate. Run the same masses in MESA (or download MIST ZAMS points) and compare central temperature, central density, radius and luminosity; explain each discrepancy physically (opacity tables, equation of state, convection). Finally overlay your theoretical ZAMS on the Gaia 100 pc colour-magnitude diagram using bolometric corrections and show that the lower envelope of the observed main sequence is reproduced to within about 0.3 mag.`,
    deliverables: [
      'A documented Python package or notebook implementing the structure solver with tests against the n = 1.5 and n = 3 polytropes',
      'A table and plot of ZAMS models (M, R, L, T_c, rho_c, convective zones) from 0.5 to 20 solar masses',
      'A comparison figure and discussion against MESA/MIST for the same masses',
      'The theoretical ZAMS overlaid on the Gaia HR diagram with a quantitative residual statement',
      'A 5-8 page report in the style of a methods paper',
    ],
    estimatedHours: 40,
    stretchGoals: [
      'Add time evolution by following hydrogen depletion in the core and reproduce the main-sequence turn-off for a few masses',
      'Include the Saha equation and a proper partial-ionisation equation of state in the envelope and show its effect on radius',
      'Fit a MIST isochrone to a real open cluster (Pleiades, Hyades or M67) with Gaia data and derive its age and distance with uncertainties',
    ],
  },
  masteryChecklist: [
    'I can turn parallax, apparent magnitude and colour into distance, luminosity, temperature and radius with correct uncertainties',
    'I can explain every feature of the Hertzsprung-Russell diagram physically and reproduce it from Gaia data',
    'I can compute level populations and ionisation fractions with the Boltzmann and Saha equations and explain the spectral sequence',
    'I can derive and solve the equations of stellar structure, including polytropes and the Lane-Emden equation',
    'I can state the pp-chain and CNO-cycle energy generation rates and explain their temperature sensitivity and consequences',
    'I can derive the mass-luminosity and mass-radius relations from homology and explain where they fail',
    'I can trace the evolution of low- and high-mass stars through the HR diagram and justify each phase with interior physics',
    'I can derive the Chandrasekhar mass and explain the structure of white dwarfs and neutron stars',
    'I can measure stellar masses from binary orbits and ages from cluster isochrones using real data',
    'I have built a stellar-structure code and compared it with MESA and with real stars',
  ],
});
