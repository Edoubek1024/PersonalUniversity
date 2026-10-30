import { defineSubject } from '../define';

export default defineSubject({
  id: 'high-energy-astrophysics',
  title: 'High-Energy Astrophysics and Compact Objects',
  category: 'astronomy',
  tagline:
    'X-rays, gamma rays, cosmic rays, neutrinos and gravitational waves: the physics of the most extreme objects in the Universe, read from real mission data.',
  description: `High-energy astrophysics studies the Universe where gravity is strongest, temperatures exceed a million kelvin and particles approach the speed of light: neutron stars, black holes, accreting binaries, active galactic nuclei, supernova remnants and gamma-ray bursts. Almost none of this is visible in optical light. It is seen in X-rays and gamma rays from space telescopes, in cosmic-ray air showers, in neutrinos detected under ice and rock, and since 2015 in gravitational waves.

The curriculum begins with the radiative processes that turn energetic particles into photons (synchrotron, inverse Compton, bremsstrahlung, Comptonisation), because every later inference depends on reading a high-energy spectrum. It then develops accretion physics, the most efficient power source in nature, and applies it to neutron stars and pulsars, stellar and supermassive black holes and active galaxies. The last two modules treat explosive transients (supernova remnants, gamma-ray bursts, fast radio bursts, tidal disruptions) and the multimessenger era: cosmic-ray acceleration, neutrino astronomy and gravitational-wave astronomy, culminating in GW170817.

You will work directly with public mission data: Chandra and XMM-Newton spectra from HEASARC fitted with XSPEC or Sherpa, Fermi-LAT and GBM gamma-ray data, Swift light curves, NICER pulse profiles, the ATNF pulsar catalogue, LIGO-Virgo strain data from GWOSC, IceCube public events, and Event Horizon Telescope results. Rybicki and Lightman is the classic text (paid); free alternatives are given throughout, chiefly the NRAO Essential Radio Astronomy chapters, MIT OCW 8.902 and review articles. The capstone has you analyse a real X-ray or gravitational-wave dataset end to end and interpret it physically.`,
  difficulty: 'expert',
  estimatedHours: 70,
  prerequisites: ['stellar-astrophysics', 'relativity', 'electromagnetism'],
  recommendedBackground: [
    'Special relativity, Lorentz transformations and four-vectors',
    'Radiation from accelerated charges (Larmor formula, Lienard-Wiechert potentials)',
    'Python data analysis with astropy and FITS files; basic Bayesian fitting',
  ],
  tags: ['X-ray', 'gamma-ray', 'compact objects', 'accretion', 'pulsars', 'black holes', 'gravitational waves', 'multimessenger'],
  core: true,
  modules: [
    {
      slug: 'radiative-processes',
      title: 'Radiative Processes',
      description:
        'How energetic particles make high-energy photons: synchrotron radiation, inverse Compton scattering and Comptonisation, thermal bremsstrahlung, and fitting real X-ray spectra.',
      lessons: [
        {
          slug: 'synchrotron-radiation',
          title: 'Synchrotron radiation',
          summary:
            'Radiation from relativistic electrons spiralling in magnetic fields: the critical frequency, power-law spectra from power-law electrons, self-absorption and polarisation.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the synchrotron power of a relativistic electron and its characteristic frequency',
            'Show that a power-law electron distribution N(E) proportional to E^-p gives a spectrum F_nu proportional to nu^-(p-1)/2',
            'Explain synchrotron self-absorption, the nu^(5/2) turnover and the brightness-temperature limit',
            'Estimate magnetic fields and minimum energies of radio sources from equipartition',
          ],
          concepts: [
            'Larmor formula and relativistic beaming into a cone of angle 1/gamma',
            'Synchrotron power P = (4/3) sigma_T c gamma^2 beta^2 U_B',
            'Critical frequency nu_c proportional to gamma^2 B',
            'Power-law electrons and spectral index alpha = (p - 1)/2',
            'Synchrotron cooling time and spectral breaks',
            'Self-absorption and the brightness-temperature limit about 1e12 K',
            'Linear polarisation up to (p + 1)/(p + 7/3), about 70%',
            'Equipartition and minimum-energy arguments',
          ],
          explanation: `An electron of Lorentz factor $\\gamma$ gyrating in a magnetic field $B$ radiates because it is accelerated. Relativistic beaming concentrates the emission into a cone of half-angle $1/\\gamma$ along its velocity, so a distant observer sees a sharp pulse once per orbit, and the Fourier transform of a short pulse is a broad spectrum extending to the **critical frequency**

$$ \\nu_c = \\frac{3}{2}\\gamma^2\\,\\nu_g \\sin\\alpha, \\qquad \\nu_g = \\frac{eB}{2\\pi m_e c} = 2.8\\,\\mathrm{MHz}\\,\\left(\\frac{B}{1\\,\\mathrm{G}}\\right). $$

The total power, averaged over pitch angles, is $P = \\tfrac43\\sigma_T c\\,\\gamma^2\\beta^2\\,U_B$ with $U_B = B^2/8\\pi$: proportional to the magnetic energy density, which will make the comparison with inverse Compton trivial in the next lesson. The **cooling time** $t_{cool} = \\gamma m_e c^2/P \\propto 1/(\\gamma B^2)$ is short for the most energetic electrons, which is why X-ray synchrotron emission (in the Crab Nebula, in supernova-remnant rims) requires continuous acceleration.

Real sources contain a **power-law** distribution of electrons, $N(\\gamma) \\propto \\gamma^{-p}$, the natural product of shock acceleration (module 6). Because each electron radiates near its own $\\nu_c \\propto \\gamma^2$, the summed spectrum is a power law $F_\\nu \\propto \\nu^{-\\alpha}$ with $\\alpha = (p - 1)/2$; the typical $p \\approx 2.4$ gives $\\alpha \\approx 0.7$, the classic radio-source index. Cooling steepens the spectrum by 0.5 above the frequency where $t_{cool}$ equals the source age, a **spectral break** that dates the source. At low frequencies the source becomes optically thick to its own emission (**synchrotron self-absorption**) and the spectrum rises as $\\nu^{5/2}$; the brightness temperature of an incoherent synchrotron source cannot exceed $\\sim 10^{12}$ K (the inverse-Compton catastrophe), so higher apparent values imply relativistic beaming. Emission is strongly **linearly polarised**, up to 70% for an ordered field, which is the observational fingerprint of synchrotron.

The **minimum-energy** argument: the radio luminosity fixes the product of electron energy and $B^{(p+1)/2}$; minimising total energy gives near-equipartition between particles and field and a field estimate of $10$-$100\\,\\mu$G in radio lobes. Rybicki & Lightman chapter 6 is the canonical derivation; the NRAO Essential Radio Astronomy chapter 5 is the free alternative and is excellent.`,
          resources: [
            {
              title: 'Condon & Ransom — Essential Radio Astronomy, Chapter 5: Synchrotron radiation',
              url: 'https://www.cv.nrao.edu/~sransom/web/Ch5.html',
              type: 'textbook',
              cost: 'free',
              provider: 'NRAO',
              note: 'Free, rigorous and well illustrated; derivations of the power, spectrum and self-absorption.',
              primary: true,
            },
            {
              title: 'Rybicki & Lightman — Radiative Processes in Astrophysics',
              url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9783527618170',
              type: 'textbook',
              cost: 'paid',
              provider: 'Wiley',
              note: 'Chapter 6 is the canonical treatment. The NRAO chapter is the free alternative.',
            },
            {
              title: 'MIT OCW 8.902 Astrophysics II',
              url: 'https://ocw.mit.edu/courses/8-902-astrophysics-ii-fall-2004/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lecture notes and problem sets on radiative processes.',
            },
            {
              title: 'Chandra X-ray Observatory',
              url: 'https://chandra.harvard.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Chandra X-ray Center',
              note: 'See the Crab Nebula and Cas A images for X-ray synchrotron morphology.',
            },
          ],
          exercises: [
            {
              slug: 'synchrotron-power-derivation',
              title: 'Derive the synchrotron power and critical frequency',
              prompt:
                'Starting from the relativistic Larmor formula P = (2 e^2 / 3 c^3) gamma^4 (a_perp^2) for acceleration perpendicular to the velocity, derive P = 2 sigma_T c gamma^2 beta^2 U_B sin^2 alpha and average over an isotropic pitch-angle distribution. Then argue from the pulse duration (cone angle 1/gamma and the retardation factor 1 - beta about 1/(2 gamma^2)) that nu_c is of order gamma^2 nu_g. Evaluate nu_c and t_cool for gamma = 1e4 in B = 10 microgauss and gamma = 1e9 in B = 100 microgauss (Crab).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'power-law-spectrum',
              title: 'Synchrotron spectrum of a power-law population numerically',
              prompt:
                'Implement the single-electron synchrotron function F(x) = x integral from x to infinity of K_{5/3}(t) dt (scipy.special.kv) and convolve it with N(gamma) proportional to gamma^-p for p = 2.0, 2.4, 3.0 between gamma = 10 and 1e6 in B = 1 G. Plot the resulting spectrum and measure the slope; verify alpha = (p - 1)/2. Then add cooling (steepen N by one power above gamma_break = 1e4) and show the 0.5 break.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'equipartition-field',
              title: 'Equipartition field of a radio lobe',
              prompt:
                'Cygnus A\'s lobes emit about 1e44 erg/s between 10 MHz and 100 GHz with alpha = 0.7, from two lobes of radius about 30 kpc each. Using the minimum-energy formula (assume protons carry as much energy as electrons and filling factor 1), estimate B_min and the total minimum energy. Compute the electron Lorentz factor radiating at 1.4 GHz and its cooling time, and compare with a lobe age of 1e7 yr.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          relatedLessons: ['electromagnetism/radiation-and-relativistic-electrodynamics/dipole-radiation-and-the-larmor-formula', 'electromagnetism/radiation-and-relativistic-electrodynamics/fields-of-moving-charges'],
          selfAssessment: [
            {
              question: 'Why does a power-law electron spectrum produce a power-law photon spectrum with alpha = (p - 1)/2?',
              answerOutline:
                'Each electron emits near nu_c proportional to gamma^2 with power proportional to gamma^2; changing variables from gamma to nu in N(gamma) gamma^2 d gamma gives F_nu proportional to nu^-(p-1)/2.',
            },
            {
              question: 'What does a brightness temperature above 1e12 K imply for a radio source?',
              answerOutline:
                'Inverse-Compton losses would cool the electrons catastrophically; the source must be relativistically beamed (Doppler-boosted) toward us, or the emission is coherent.',
            },
            {
              question: 'Why does X-ray synchrotron emission require ongoing particle acceleration?',
              answerOutline:
                'The electrons responsible (gamma about 1e8-1e9) cool in years or less, much shorter than the source age.',
            },
          ],
        },
        {
          slug: 'inverse-compton-and-comptonisation',
          title: 'Inverse Compton scattering and Comptonisation',
          summary:
            'Relativistic electrons boosting photons to X-ray and gamma-ray energies, the synchrotron self-Compton model of blazars, and thermal Comptonisation in accretion coronae.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the energy boost of an inverse-Compton scattered photon (gamma^2) and the power P_IC',
            'Use the ratio P_IC / P_sync = U_rad / U_B to interpret two-hump spectral energy distributions',
            'Explain the Compton y parameter and how thermal Comptonisation produces power-law X-ray spectra with a cut-off',
            'Explain the Klein-Nishina regime and the Sunyaev-Zeldovich effect as special cases',
          ],
          concepts: [
            'Thomson and Klein-Nishina cross-sections',
            'Energy boost epsilon_1 about (4/3) gamma^2 epsilon_0',
            'P_IC = (4/3) sigma_T c gamma^2 beta^2 U_rad',
            'Synchrotron self-Compton (SSC) and two-humped SEDs',
            'Compton y parameter y = (4kT / m_e c^2) max(tau, tau^2)',
            'Thermal Comptonisation: power law with cut-off at about 2-3 kT_e',
            'Kompaneets equation (qualitative)',
            'Compton cooling and the Compton temperature',
          ],
          explanation: `When a relativistic electron meets a low-energy photon, the photon gains energy. In the electron's rest frame the photon arrives with energy boosted by $\\sim\\gamma$; if it is still below $m_e c^2$ it Thomson-scatters elastically, and transforming back gives another factor of $\\gamma$. The average result is

$$ \\langle\\epsilon_1\\rangle = \\tfrac43\\gamma^2\\epsilon_0, $$

so electrons with $\\gamma \\sim 10^3$ turn radio photons into optical and optical photons into GeV gamma rays. The power radiated per electron, $P_{IC} = \\tfrac43\\sigma_T c\\gamma^2\\beta^2 U_{rad}$, has exactly the same form as synchrotron with the radiation energy density replacing the magnetic one. Hence $P_{IC}/P_{sync} = U_{rad}/U_B$: if the same electrons make both, the ratio of the two peaks in a source's spectral energy distribution measures the ratio of photon to magnetic energy density. When the seed photons are the synchrotron photons themselves (**synchrotron self-Compton**), you get the characteristic **two-humped SED** of blazars observed by Fermi: a synchrotron peak in the IR-to-X-ray band and an inverse-Compton peak at GeV-TeV energies. When $\\gamma\\epsilon_0 \\gtrsim m_e c^2$ the scattering enters the **Klein-Nishina** regime, the cross-section falls and the electron loses most of its energy in one scattering.

In accretion flows the electrons are not a power law but a hot thermal plasma ($kT_e \\sim 100$ keV) of modest optical depth: a **corona**. Soft photons from the disk are repeatedly scattered, each time gaining a fraction $\\sim 4kT_e/m_e c^2$ of their energy; the **Compton y parameter** $y = (4kT_e/m_ec^2)\\max(\\tau, \\tau^2)$ measures the total amplification. For $y \\sim 1$ the escaping photons form a **power law** $F_E \\propto E^{-\\Gamma + 1}$ with photon index $\\Gamma \\approx 1.7$-$2.2$ that rolls over near $2$-$3\\,kT_e$, which is precisely the hard X-ray spectrum of Seyfert galaxies and black-hole binaries in the hard state. The Kompaneets equation describes the process in detail; models like nthcomp and comptt in XSPEC implement it. The same physics at low $\\tau$ and $kT \\sim 10$ keV produces the **Sunyaev-Zeldovich** effect of cluster gas on the CMB.

Read the NRAO chapter, Rybicki & Lightman chapter 7, and the Fermi blazar SED papers; the exercises fit a real blazar SED and estimate a coronal temperature from NuSTAR data.`,
          resources: [
            {
              title: 'Rybicki & Lightman — Radiative Processes in Astrophysics',
              url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9783527618170',
              type: 'textbook',
              cost: 'paid',
              provider: 'Wiley',
              note: 'Chapter 7 (Compton scattering, Kompaneets equation). Free alternatives below.',
            },
            {
              title: 'Condon & Ransom — Essential Radio Astronomy (inverse Compton section)',
              url: 'https://www.cv.nrao.edu/~sransom/web/Ch5.html',
              type: 'textbook',
              cost: 'free',
              provider: 'NRAO',
              note: 'Section 5.5 covers inverse Compton and the brightness-temperature limit.',
              primary: true,
            },
            {
              title: 'Fermi Gamma-ray Space Telescope',
              url: 'https://fermi.gsfc.nasa.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'LAT data and the 4FGL source catalogue with blazar spectra.',
            },
            {
              title: 'NuSTAR mission (Caltech)',
              url: 'https://www.nustar.caltech.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'Caltech / NASA',
              note: 'Hard X-ray (3-79 keV) data, archived at HEASARC; the best instrument for coronal cut-offs.',
            },
          ],
          exercises: [
            {
              slug: 'ic-boost-derivation',
              title: 'Derive the inverse-Compton boost and power',
              prompt:
                'Transform an isotropic photon field into the electron rest frame, apply Thomson scattering, and transform back to derive <epsilon_1> = (4/3) gamma^2 epsilon_0 and P_IC = (4/3) sigma_T c gamma^2 beta^2 U_rad. Then compute the typical scattered energy of CMB photons (6e-4 eV) by electrons of gamma = 1e3, 1e6 and 1e8, and of optical photons (2 eV) by gamma = 1e4 electrons. State which cases are in the Klein-Nishina regime.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'blazar-sed',
              title: 'Model a blazar SED with SSC',
              prompt:
                'Assemble the broadband SED of Mrk 421 from published multiwavelength campaign data (Abdo et al. 2011, available via arXiv tables) or the Fermi 4FGL plus Swift archival fluxes. Plot nu F_nu from radio to TeV. Identify the two peaks, measure their frequencies and luminosities, and use L_IC / L_sync = U_rad / U_B together with a source size from variability (R < c t_var delta) to estimate B and the Doppler factor delta. Comment on the consistency with brightness-temperature limits.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'compton-y',
              title: 'Comptonisation spectra by Monte Carlo',
              prompt:
                'Write a Monte Carlo that injects 0.1 keV photons into the centre of a uniform sphere of optical depth tau and electron temperature kT_e (sample electron velocities from a Maxwell-Juttner distribution and use Thomson scattering in the electron frame). Run tau = 1, 2, 3 with kT_e = 100 keV and plot the escaping spectra. Measure the photon index and the cut-off energy and compare with the y-parameter prediction.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the ratio of the two peaks of a blazar SED measure?',
              answerOutline:
                'If the same electrons produce both by synchrotron and inverse Compton, L_IC / L_sync = U_rad / U_B, the ratio of seed-photon to magnetic energy density.',
            },
            {
              question: 'Why does thermal Comptonisation produce a power-law spectrum?',
              answerOutline:
                'Photons gain a fixed fractional energy per scattering while the probability of undergoing k scatterings falls geometrically; the combination gives a power law up to about kT_e.',
            },
            {
              question: 'What is the Klein-Nishina regime and what is its effect?',
              answerOutline:
                'When the photon energy in the electron rest frame approaches m_e c^2, the cross-section drops below Thomson and recoil is large, so inverse-Compton efficiency falls and spectra steepen at the highest energies.',
            },
          ],
        },
        {
          slug: 'bremsstrahlung-and-thermal-plasmas',
          title: 'Bremsstrahlung, thermal plasmas and X-ray lines',
          summary:
            'Free-free emission from hot gas, the exponential cut-off that measures temperature, collisional-ionisation equilibrium and emission lines from clusters, supernova remnants and stellar coronae.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the thermal bremsstrahlung emissivity scaling epsilon proportional to n^2 T^(1/2) and its spectral shape',
            'Explain how the X-ray continuum cut-off and line ratios measure temperature and abundances',
            'Describe collisional-ionisation equilibrium versus non-equilibrium ionisation and their diagnostics',
            'Compute the emission measure, cooling time and gas mass of a hot plasma from an X-ray spectrum',
          ],
          concepts: [
            'Free-free emission from electron-ion encounters',
            'Emissivity j_nu proportional to n_e n_i Z^2 T^-1/2 exp(-h nu / kT) g_ff',
            'Total emissivity proportional to n^2 T^1/2; free-free absorption',
            'Emission measure EM = integral n_e n_H dV',
            'Collisional ionisation equilibrium (CIE): APEC/MEKAL models',
            'Fe K lines at 6.7 and 6.97 keV as thermometers',
            'Non-equilibrium ionisation in young supernova remnants',
            'Radiative cooling time of cluster gas',
          ],
          explanation: `An electron passing an ion is accelerated by its Coulomb field and radiates: **bremsstrahlung** ("braking radiation", free-free emission). For a thermal plasma, averaging the single-encounter spectrum over a Maxwellian gives an emissivity

$$ \\epsilon_\\nu \\approx 6.8 \\times 10^{-38}\\,Z^2 n_e n_i\\,T^{-1/2}\\,e^{-h\\nu/kT}\\,\\bar g_{ff}\\ \\ \\mathrm{erg\\,s^{-1}\\,cm^{-3}\\,Hz^{-1}}, $$

nearly flat in frequency up to an **exponential cut-off** at $h\\nu \\approx kT$. That cut-off is the plasma thermometer: a cluster at $kT = 7$ keV emits a spectrum that rolls over in the Chandra band, and fitting it gives $T$ directly. The integrated emissivity is $\\epsilon \\approx 1.4 \\times 10^{-27}\\,T^{1/2} n_e n_i Z^2 \\bar g_B$ erg s$^{-1}$ cm$^{-3}$; because it scales as density squared, the normalisation of a fitted spectrum measures the **emission measure** $\\int n_e n_H\\,dV$, which with an assumed geometry gives the gas mass, and the luminosity per particle gives the **cooling time** $t_{cool} = 3nkT/\\epsilon$.

Hot astrophysical plasmas are not pure hydrogen, and below $\\sim 3$ keV the spectrum is dominated by **emission lines** of highly ionised metals (O VIII, Ne X, Si XIII, S XV, Fe L-shell) excited by electron collisions. In **collisional-ionisation equilibrium** the ionisation balance is a function of $T$ alone, so models like APEC (in XSPEC/Sherpa) predict the full spectrum from $T$, abundances and emission measure. The Fe K complex is particularly useful: helium-like Fe XXV at 6.7 keV and hydrogen-like Fe XXVI at 6.97 keV have a ratio that is a sensitive thermometer above 3 keV, and their strength measures the iron abundance (about one-third solar in clusters, from billions of years of supernova enrichment). In young **supernova remnants** the gas has been shocked too recently to reach ionisation equilibrium: the ionisation timescale $n_e t \\lesssim 10^{12}$ cm$^{-3}$ s is itself a parameter of the non-equilibrium models and dates the shock.

Rybicki & Lightman chapter 5 derives the emissivity; the NRAO free-free chapter is the free alternative. The exercise fits an APEC model to a real Chandra cluster spectrum, which is also your first hands-on use of HEASARC data before the dedicated X-ray analysis lesson.`,
          resources: [
            {
              title: 'Condon & Ransom — Essential Radio Astronomy, Chapter 4: Free-free radiation',
              url: 'https://www.cv.nrao.edu/~sransom/web/xxx.html',
              type: 'textbook',
              cost: 'free',
              provider: 'NRAO',
              note: 'The book\'s table of contents; open chapter 4 for the free-free derivation (radio context, same physics).',
              primary: true,
            },
            {
              title: 'Rybicki & Lightman — Radiative Processes in Astrophysics',
              url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9783527618170',
              type: 'textbook',
              cost: 'paid',
              provider: 'Wiley',
              note: 'Chapter 5 on bremsstrahlung. NRAO chapter 4 is the free alternative.',
            },
            {
              title: 'Sherpa — CIAO modelling and fitting package',
              url: 'https://cxc.cfa.harvard.edu/sherpa/',
              type: 'tool',
              cost: 'free',
              provider: 'Chandra X-ray Center',
              note: 'Python-native fitting of X-ray spectra; xsapec and xsphabs models are available.',
            },
            {
              title: 'Chandra Data Archive',
              url: 'https://cxc.harvard.edu/cda/',
              type: 'dataset',
              cost: 'free',
              provider: 'Chandra X-ray Center',
            },
          ],
          exercises: [
            {
              slug: 'bremsstrahlung-scaling',
              title: 'Bremsstrahlung from a cluster',
              prompt:
                'A cluster has an isothermal atmosphere at kT = 6 keV with electron density n_e = 3e-3 cm^-3 within 500 kpc. Compute the bolometric bremsstrahlung luminosity (gaunt factor 1.2, mu_e = 1.17), the 2-10 keV fraction, the gas mass and the cooling time. Plot the photon spectrum dN/dE from 0.5 to 20 keV and mark where the cut-off lies relative to the Chandra and NuSTAR bands.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'fit-cluster-spectrum',
              title: 'Fit an APEC model to a cluster spectrum',
              prompt:
                'Download a Chandra ACIS observation of the Perseus or Abell 1795 cluster from the Chandra Data Archive (or the HEASARC browse interface), and extract a spectrum from an annulus 100-300 arcsec from the centre with CIAO specextract (or use a pre-extracted spectrum provided with the CIAO threads). Fit phabs*apec in Sherpa or XSPEC over 0.5-7 keV. Report kT, the Fe abundance, the normalisation (and hence emission measure) with 90% errors. Identify the Fe K line and comment on the line ratio.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'If installing CIAO is impractical, start from the CIAO "Sherpa threads" example datasets, which include fully processed spectra.',
            },
            {
              slug: 'nei-age',
              title: 'Date a supernova remnant from its ionisation state',
              prompt:
                'A young remnant\'s spectrum is fitted with a non-equilibrium model giving n_e t = 3e10 cm^-3 s and n_e = 1 cm^-3 behind the shock. Compute the time since the gas was shocked. Explain physically why the Fe lines would appear at lower energy (Fe XVII-XX) than in a CIE plasma of the same electron temperature, and how this lets you distinguish NEI from a cooler CIE plasma.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What feature of a thermal bremsstrahlung spectrum measures the temperature?',
              answerOutline: 'The exponential cut-off at h nu about kT; below it the spectrum is nearly flat.',
            },
            {
              question: 'What does the normalisation of a thermal X-ray fit tell you?',
              answerOutline:
                'The emission measure integral of n_e n_H dV (scaled by distance squared); with a geometry it gives density and gas mass.',
            },
            {
              question: 'What is non-equilibrium ionisation and where is it seen?',
              answerOutline:
                'Gas whose ions have not yet caught up with the electron temperature after shock heating; seen in young supernova remnants, characterised by the ionisation timescale n_e t.',
            },
          ],
        },
        {
          slug: 'x-ray-spectral-analysis',
          title: 'X-ray spectral analysis in practice',
          summary:
            'Detectors, response matrices and forward-folding; Poisson statistics and the C-statistic; absorption; and a complete fit of a real HEASARC spectrum with XSPEC or Sherpa.',
          estimatedMinutes: 120,
          objectives: [
            'Explain why X-ray spectra must be forward-folded through the RMF and ARF rather than deconvolved',
            'Choose between chi-square and C-statistic and handle background correctly',
            'Model photoelectric absorption and interpret N_H',
            'Download, fit and interpret a real Chandra, XMM-Newton or NICER spectrum with error estimates',
          ],
          concepts: [
            'Photon-counting detectors: CCDs, gratings, microcalorimeters',
            'Redistribution matrix (RMF) and ancillary response (ARF)',
            'Forward folding: counts = RMF x ARF x model',
            'Poisson likelihood and the Cash C-statistic',
            'Background subtraction vs background modelling',
            'Photoelectric absorption (tbabs) and hydrogen column N_H',
            'Pile-up in bright sources',
            'Confidence intervals: delta-statistic 2.706 for 90%',
          ],
          explanation: `An X-ray telescope does not record a spectrum; it records individual photon events, each with an approximate energy (pulse height), arrival time and position. The relation between the true source spectrum $S(E)$ and the counts in detector channel $i$ is

$$ C_i = T\\int R(i, E)\\,A(E)\\,S(E)\\,dE + B_i, $$

where $A(E)$ is the effective area (the **ARF**, mirror plus filter plus detector efficiency), $R(i, E)$ the **redistribution matrix** (the **RMF**, the probability a photon of energy $E$ lands in channel $i$), $T$ the exposure and $B_i$ the background. Because $R$ is broad and non-invertible at CCD resolution ($\\sim 100$ eV), you never deconvolve the data. Instead you **forward-fold**: choose a physical model, multiply through the response, compare predicted with observed counts and adjust parameters. Software (XSPEC from HEASoft, Sherpa from CIAO, or Python packages such as 3ML) does this, but you must understand it to avoid nonsense.

Counts are Poisson. With many counts per bin, $\\chi^2$ is fine; with few, it is biased and you should use the **Cash C-statistic** (the Poisson log-likelihood), modelling the background rather than subtracting it (W-stat in XSPEC). Grouping to a minimum of one count per bin with C-stat is the modern default. Confidence intervals come from changes in the fit statistic: $\\Delta C = 2.706$ for a 90% interval on one parameter, the X-ray convention.

Nearly every source is seen through the interstellar medium, whose metals photoelectrically absorb soft X-rays with cross-section $\\sigma(E) \\propto E^{-8/3}$; models such as tbabs parametrise this by the equivalent **hydrogen column** $N_H$ (about $10^{20}$-$10^{22}$ cm$^{-2}$ in the Galaxy). $N_H$ is degenerate with the soft spectral slope, so fit them together. Bright sources suffer **pile-up** (two photons in one frame recorded as one of higher energy), which hardens the spectrum artificially; check with the pile-up tools or use timing modes.

The HEASARC archive provides almost every X-ray observation ever made with standard products. Work through the XSPEC manual's walk-through and the CIAO/Sherpa threads, then do the exercise below on a real source. This lesson is the foundation of the capstone's X-ray option.`,
          resources: [
            {
              title: 'XSPEC — X-ray spectral fitting package (HEASARC)',
              url: 'https://heasarc.gsfc.nasa.gov/xanadu/xspec/',
              type: 'tool',
              cost: 'free',
              provider: 'NASA HEASARC',
              note: 'Read the manual\'s "Walk through XSPEC" and the fit-statistics appendix.',
              primary: true,
            },
            {
              title: 'XSPEC manual',
              url: 'https://heasarc.gsfc.nasa.gov/xanadu/xspec/manual/manual.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NASA HEASARC',
            },
            {
              title: 'HEASARC Browse (archive query interface)',
              url: 'https://heasarc.gsfc.nasa.gov/cgi-bin/W3Browse/w3browse.pl',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA HEASARC',
              note: 'Search observations by source and mission; download event files and products.',
            },
            {
              title: 'CIAO — Chandra Interactive Analysis of Observations',
              url: 'https://cxc.cfa.harvard.edu/ciao/',
              type: 'tool',
              cost: 'free',
              provider: 'Chandra X-ray Center',
              note: 'The analysis threads walk through spectral extraction step by step.',
            },
            {
              title: 'HEASoft software suite',
              url: 'https://heasarc.gsfc.nasa.gov/docs/software/heasoft/',
              type: 'tool',
              cost: 'free',
              provider: 'NASA HEASARC',
            },
          ],
          exercises: [
            {
              slug: 'forward-folding-by-hand',
              title: 'Forward-folding by hand',
              prompt:
                'Using astropy.io.fits, open an RMF and ARF from any HEASARC observation (e.g. a NICER or XMM-Newton pn response). Build the response matrix in numpy, fold an absorbed power law (N_H = 1e22, Gamma = 2, norm = 1e-2) through it for a 10 ks exposure, and plot predicted counts per channel. Then simulate Poisson data, fit it by minimising your own C-statistic with scipy, and confirm you recover the input parameters. Compare with XSPEC fakeit.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'fit-real-spectrum',
              title: 'Fit a real X-ray spectrum',
              prompt:
                'Download an XMM-Newton or Chandra observation of a bright AGN (e.g. NGC 4151 or MCG-6-30-15) or an X-ray binary from HEASARC, with its pipeline spectrum, background, RMF and ARF. In XSPEC or Sherpa fit tbabs*powerlaw over 0.5-10 keV with C-stat. Report N_H and Gamma with 90% errors. Inspect residuals; add components (soft excess with a blackbody, Fe K line with a Gaussian near 6.4 keV) and justify each with the change in statistic. Interpret the final model physically.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'chi2-vs-cstat',
              title: 'Chi-square versus C-statistic bias',
              prompt:
                'Simulate 1000 low-count spectra (total 200 counts) from a known power law using your forward-folding code. Fit each with chi-square (Gehrels errors, minimum 20 counts per bin) and with C-stat (1 count per bin). Plot the distributions of fitted Gamma for each method and show which is biased and by how much.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are X-ray spectra fitted by forward-folding rather than inverted?',
              answerOutline:
                'The redistribution matrix is broad and ill-conditioned; deconvolution amplifies noise. Folding a model through RMF and ARF and comparing counts is stable and statistically correct.',
            },
            {
              question: 'When should you use the C-statistic instead of chi-square?',
              answerOutline:
                'When counts per bin are low (Poisson regime): chi-square is biased because Gaussian errors are a poor approximation; C-stat is the exact Poisson likelihood.',
            },
            {
              question: 'What is N_H and why is it degenerate with the photon index?',
              answerOutline:
                'The equivalent hydrogen column of absorbing gas; absorption suppresses soft X-rays, mimicking a harder spectrum, so both affect the low-energy slope.',
            },
          ],
        },
      ],
      project: {
        slug: 'radiative-toolkit',
        title: 'Module project: a radiative-processes toolkit',
        description:
          'Write a small Python library that computes synchrotron, inverse-Compton (Thomson and Klein-Nishina) and thermal bremsstrahlung spectra for user-specified particle distributions, plus a forward-folding fitter that reads standard OGIP RMF/ARF files. Validate each process against analytic limits and use the toolkit to fit both a blazar SED and a cluster X-ray spectrum.',
        deliverables: [
          'A tested Python package with documented functions and analytic-limit tests',
          'Notebook fitting a real blazar SED with an SSC model',
          'Notebook forward-folding and fitting a real HEASARC spectrum, compared with XSPEC results',
        ],
        estimatedHours: 14,
      },
    },
    {
      slug: 'accretion-physics',
      title: 'Accretion Physics',
      description:
        'The most efficient power source in nature: the Eddington limit, thin accretion disks and their spectra, X-ray binaries and their states, and relativistic jets.',
      lessons: [
        {
          slug: 'accretion-efficiency-and-the-eddington-limit',
          title: 'Accretion efficiency and the Eddington limit',
          summary:
            'Why falling onto a compact object releases up to 40% of rest mass, the ISCO, the Eddington luminosity for accretion, and the characteristic temperatures of accreting sources.',
          estimatedMinutes: 90,
          objectives: [
            'Compute the accretion luminosity L = G M Mdot / R and the efficiency for white dwarfs, neutron stars and black holes',
            'Explain the innermost stable circular orbit and the spin dependence of black-hole efficiency',
            'Derive the Eddington luminosity and accretion rate and their role in self-regulation',
            'Estimate the characteristic emission temperatures (blackbody and virial) and explain why accretion shines in X-rays',
          ],
          concepts: [
            'Accretion luminosity L_acc = G M Mdot / R',
            'Efficiency eta: 0.0001 (WD), 0.1-0.2 (NS), 0.057-0.42 (BH)',
            'Innermost stable circular orbit: 6 GM/c^2 (Schwarzschild) to 1 GM/c^2 (maximal Kerr)',
            'Eddington luminosity L_Edd = 1.26e38 (M/M_sun) erg/s',
            'Eddington accretion rate',
            'Blackbody temperature T_b and virial temperature T_th',
            'Spherical (Bondi) accretion rate',
            'Super-Eddington accretion and photon trapping',
          ],
          explanation: `Matter falling from far away onto a body of mass $M$ and radius $R$ releases its gravitational binding energy, $\\Delta E = GMm/R$ per mass $m$. With a mass inflow rate $\\dot M$ the luminosity is $L_{acc} = GM\\dot M/R = \\eta\\dot Mc^2$, with efficiency $\\eta = GM/Rc^2$ set by **compactness**. For a white dwarf $\\eta \\sim 10^{-4}$, less than nuclear burning; for a neutron star $\\eta \\approx 0.15$, twenty times nuclear fusion; for a black hole the inner edge is not a surface but the **innermost stable circular orbit**, $r_{ISCO} = 6GM/c^2$ for a non-spinning hole, inside which gas plunges without radiating much. The binding energy at the ISCO gives $\\eta = 1 - \\sqrt{8/9} = 0.057$, rising to 0.42 for a maximally spinning Kerr hole whose prograde ISCO shrinks toward $GM/c^2$. Accretion is the most efficient way known to convert mass to radiation, which is why it powers quasars.

Radiation pressure limits the process. Setting the outward force on electrons, $\\sigma_T L/(4\\pi r^2 c)$, equal to gravity on the associated protons gives the **Eddington luminosity**

$$ L_{Edd} = \\frac{4\\pi GMm_pc}{\\sigma_T} = 1.26 \\times 10^{38}\\left(\\frac{M}{M_\\odot}\\right)\\ \\mathrm{erg\\,s^{-1}}, $$

and a corresponding $\\dot M_{Edd} = L_{Edd}/\\eta c^2 \\approx 2 \\times 10^{-8}\\,(M/M_\\odot)\\,M_\\odot$ yr$^{-1}$ for $\\eta = 0.1$. Spherical accretion above it is choked off by its own radiation; disks can exceed it modestly through photon trapping and outflows, which is how ultraluminous X-ray sources reach $10^{40}$ erg s$^{-1}$.

Where does the energy come out? If an Eddington luminosity is radiated as a blackbody from the size of the emitting region, $T_b = (L_{Edd}/4\\pi R^2\\sigma)^{1/4} \\approx 2 \\times 10^7\\,(M/M_\\odot)^{-1/4}$ K for $R \\sim 10\\,GM/c^2$: about 1 keV for a stellar black hole and 10-100 eV (ultraviolet) for a supermassive one. If instead the gravitational energy thermalises into ions without radiating, the **virial temperature** $T_{th} = GMm_p/3kR \\sim 10^{11}$-$10^{12}$ K near a compact object. Accretion luminosity therefore emerges between these limits, in X-rays for stellar compact objects, which is why X-ray astronomy discovered them. Frank, King & Raine chapters 1-2 are the standard reading (paid); MIT 8.902 and the Done, Gierlinski & Kubota review are free.`,
          resources: [
            {
              title: 'Frank, King & Raine — Accretion Power in Astrophysics (3rd ed.)',
              url: 'https://ui.adsabs.harvard.edu/abs/2002apa..book.....F',
              type: 'textbook',
              cost: 'paid',
              provider: 'Cambridge University Press',
              note: 'Chapters 1-2 and 5. MIT 8.902 and the review below are free alternatives.',
            },
            {
              title: 'MIT OCW 8.902 Astrophysics II',
              url: 'https://ocw.mit.edu/courses/8-902-astrophysics-ii-fall-2004/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on accretion and compact objects with problem sets.',
              primary: true,
            },
            {
              title: 'Done, Gierlinski & Kubota (2007), Modelling the behaviour of accretion flows in X-ray binaries',
              url: 'https://arxiv.org/abs/0708.0148',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Section 2 summarises efficiency, the Eddington limit and characteristic temperatures.',
            },
          ],
          exercises: [
            {
              slug: 'efficiency-table',
              title: 'Efficiency and luminosity of accretors',
              prompt:
                'For accretion at Mdot = 1e-9 M_sun/yr compute L_acc and eta for: a 0.8 M_sun white dwarf (R = 7000 km), a 1.4 M_sun neutron star (R = 12 km), and Schwarzschild and maximal-Kerr black holes of 10 M_sun at their ISCOs. Compare each with hydrogen fusion (0.007). Then compute L_Edd and Mdot_Edd for each and the Eddington ratio of the given Mdot.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'isco-binding-energy',
              title: 'ISCO and efficiency versus spin',
              prompt:
                'Implement the Bardeen-Press-Teukolsky formula for r_ISCO(a) for prograde and retrograde orbits and the corresponding specific energy E(r_ISCO). Plot r_ISCO and eta = 1 - E against dimensionless spin a from -1 to 1. Verify 6 GM/c^2 and 0.057 at a = 0 and 0.42 at a = 1. State the spin needed for eta = 0.2.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'characteristic-temperatures',
              title: 'Where does accretion shine?',
              prompt:
                'Compute T_b and T_th for accretion at the Eddington rate onto a 1 M_sun white dwarf, a 1.4 M_sun neutron star, a 10 M_sun black hole and a 1e8 M_sun black hole. Convert to keV and identify the waveband of peak emission. Explain why AGN disks peak in the UV but AGN are still bright X-ray sources.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is accretion onto a black hole more efficient than nuclear fusion?',
              answerOutline:
                'The binding energy at the ISCO is 6-42% of rest mass, versus 0.7% for converting hydrogen to helium.',
            },
            {
              question: 'Derive the Eddington luminosity in one line.',
              answerOutline:
                'Radiation force on an electron sigma_T L / (4 pi r^2 c) equals gravity on a proton G M m_p / r^2, so L_Edd = 4 pi G M m_p c / sigma_T.',
            },
            {
              question: 'Why do stellar-mass accreting compact objects emit mainly X-rays?',
              answerOutline:
                'The emitting region is tens of km across; radiating near L_Edd from such a small area requires temperatures of about 1e7 K (keV), and coronae reach far higher.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/energy-generation-and-transport/radiative-and-conductive-transport'],
        },
        {
          slug: 'thin-accretion-disks',
          title: 'Thin accretion disks',
          summary:
            'Angular-momentum transport and viscosity, the Shakura-Sunyaev alpha disk, the multicolour blackbody spectrum, the magnetorotational instability and disk instabilities in dwarf novae.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why accretion requires outward angular-momentum transport and derive the viscous timescale',
            'Derive the radial temperature profile T proportional to R^-3/4 of a steady thin disk',
            'Compute the multicolour blackbody spectrum and explain the nu^(1/3) segment',
            'Describe the alpha prescription, the magnetorotational instability and the disk thermal-viscous instability',
          ],
          concepts: [
            'Angular momentum problem; Keplerian shear',
            'Viscous torque and viscous timescale t_visc about R^2 / nu',
            'Shakura-Sunyaev alpha: nu = alpha c_s H',
            'Steady disk T(R) = [3 G M Mdot / (8 pi sigma R^3) (1 - sqrt(R_in/R))]^1/4',
            'Multicolour blackbody: F_nu proportional to nu^1/3',
            'Magnetorotational instability (MRI)',
            'Thermal-viscous (hydrogen ionisation) instability; dwarf novae and X-ray novae',
            'Radiatively inefficient flows (ADAF) at low Mdot',
          ],
          explanation: `Gas orbiting a compact object cannot fall in unless it loses angular momentum, and a Keplerian orbit at small radius has much less specific angular momentum ($\\sqrt{GMR}$) than at large radius. A **disk** forms in which some agent transports angular momentum outward while mass moves inward. Differential rotation provides free energy; a **viscosity** couples adjacent annuli. Molecular viscosity is hopelessly small (viscous timescales longer than the age of the Universe), so the transport must be turbulent. Shakura and Sunyaev (1973) parametrised our ignorance as $\\nu = \\alpha c_s H$ with $H$ the disk thickness and $\\alpha < 1$; observations of dwarf-nova outbursts imply $\\alpha \\approx 0.1$-$0.3$. Balbus and Hawley (1991) identified the physical cause: the **magnetorotational instability**, in which a weak magnetic field threading a disk with angular velocity decreasing outward becomes unstable and drives turbulence that simulations confirm transports angular momentum at roughly the needed rate.

The beauty of the thin-disk model is that its emission is independent of $\\alpha$ in a steady state. Energy conservation per annulus gives the dissipation rate $D(R) = (3GM\\dot M/8\\pi R^3)[1 - (R_{in}/R)^{1/2}]$ per face, and if each annulus radiates as a blackbody,

$$ T(R) = \\left[\\frac{3GM\\dot M}{8\\pi\\sigma R^3}\\left(1 - \\sqrt{R_{in}/R}\\right)\\right]^{1/4} \\propto R^{-3/4}. $$

The spectrum is a **multicolour blackbody**: a Rayleigh-Jeans $\\nu^2$ tail at low frequency, a characteristic $F_\\nu \\propto \\nu^{1/3}$ segment over the range of temperatures, and a Wien cut-off at the inner-edge temperature, which scales as $M^{-1/4}$ for Eddington-limited accretion. Fitting the X-ray disk component of a black-hole binary (the diskbb model) gives $R_{in}$ and hence, if it is the ISCO, the black-hole **spin** (the continuum-fitting method).

Disks are not always steady. Where the temperature passes through the hydrogen ionisation range ($\\sim 7000$ K), opacity changes abruptly and the disk has two stable states; it cycles between them in a **thermal-viscous instability** that explains dwarf-nova outbursts in white-dwarf binaries and X-ray novae in black-hole transients. At very low accretion rates the gas cannot cool and the flow becomes hot, thick and **radiatively inefficient** (ADAF), the state of Sgr A* and of quiescent binaries. Read Frank, King & Raine chapter 5 or the free Lasota review and Balbus & Hawley; the exercises build a disk spectrum and fit a real one.`,
          resources: [
            {
              title: 'Shakura & Sunyaev (1973), Black holes in binary systems: observational appearance',
              url: 'https://ui.adsabs.harvard.edu/abs/1973A&A....24..337S',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
              note: 'One of the most cited papers in astrophysics; the alpha disk.',
              primary: true,
            },
            {
              title: 'Balbus & Hawley (1998), Instability, turbulence, and enhanced transport in accretion disks',
              url: 'https://ui.adsabs.harvard.edu/abs/1998RvMP...70....1B',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
              note: 'Reviews of Modern Physics account of the MRI.',
            },
            {
              title: 'Lasota (2001), The disc instability model of dwarf novae and low-mass X-ray binary transients',
              url: 'https://arxiv.org/abs/astro-ph/0102072',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Frank, King & Raine — Accretion Power in Astrophysics',
              url: 'https://ui.adsabs.harvard.edu/abs/2002apa..book.....F',
              type: 'textbook',
              cost: 'paid',
              provider: 'Cambridge University Press',
              note: 'Chapter 5 on thin disks. The papers above are free alternatives.',
            },
          ],
          exercises: [
            {
              slug: 'disk-temperature-derivation',
              title: 'Derive the steady thin-disk temperature profile',
              prompt:
                'From conservation of mass and angular momentum in a steady disk with zero torque at R_in, derive nu Sigma = (Mdot / 3 pi)[1 - sqrt(R_in/R)] and the dissipation rate D(R). Integrate D over both faces to show the disk luminosity is G M Mdot / (2 R_in), half the accretion energy, and explain where the other half goes for a neutron star versus a black hole. Compute T_max and the radius at which it occurs.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'multicolour-spectrum',
              title: 'Compute a multicolour disk spectrum',
              prompt:
                'Numerically integrate F_nu = (4 pi h cos i nu^3 / c^2 D^2) integral of R dR / (exp(h nu / kT(R)) - 1) for a 10 M_sun black hole at 0.1 L_Edd (R_in = 6 GM/c^2) and for a 1e8 M_sun AGN at 0.1 L_Edd. Plot nu F_nu, identify the nu^(1/3) segment and the peak energy, and verify T_max scales as M^-1/4.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'disk-fit-black-hole-binary',
              title: 'Fit the disk of a black-hole binary',
              prompt:
                'Download a NICER, Swift-XRT or RXTE spectrum of a black-hole X-ray binary in the soft state (e.g. LMC X-3 or GX 339-4 during an outburst) from HEASARC. Fit tbabs*(diskbb + powerlaw) in XSPEC or Sherpa. From the diskbb normalisation N = (R_in/km / (D/10 kpc))^2 cos i, derive R_in for published distance and inclination, convert to units of GM/c^2 using the black-hole mass, and comment on what it implies about spin (noting colour-correction factors of about 1.7).',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the steady-disk spectrum independent of the viscosity?',
              answerOutline:
                'In steady state the energy dissipated at each radius is fixed by the mass flow rate and the gravitational potential (angular-momentum conservation); viscosity sets the surface density and timescale, not the emission.',
            },
            {
              question: 'What is the magnetorotational instability?',
              answerOutline:
                'A weak magnetic field in a disk whose angular velocity decreases outward couples fluid elements like springs, transferring angular momentum outward and growing turbulence; the physical origin of disk viscosity.',
            },
            {
              question: 'What causes dwarf-nova outbursts?',
              answerOutline:
                'The thermal-viscous instability: near the hydrogen ionisation temperature the disk has two stable branches, and it cycles between a cool low-viscosity quiescent state and a hot high-viscosity outburst state.',
            },
          ],
        },
        {
          slug: 'x-ray-binaries',
          title: 'X-ray binaries and their accretion states',
          summary:
            'Low- and high-mass X-ray binaries, neutron-star versus black-hole signatures, spectral states and the hardness-intensity diagram, and timing with power spectra and QPOs.',
          estimatedMinutes: 110,
          objectives: [
            'Distinguish low-mass and high-mass X-ray binaries by donor, accretion mode and population',
            'List observational signatures that distinguish neutron-star from black-hole accretors',
            'Describe the hard and soft states and the outburst track in the hardness-intensity diagram',
            'Compute and interpret a power-density spectrum including QPOs from real timing data',
          ],
          concepts: [
            'LMXBs (Roche-lobe overflow) vs HMXBs (wind accretion, Be/X-ray binaries)',
            'Type I X-ray bursts and coherent pulsations as neutron-star signatures',
            'Dynamical mass functions for black holes',
            'Hard state (corona, jet) and soft state (disk dominated)',
            'Hardness-intensity diagram (q-shaped track)',
            'Power-density spectrum, Leahy normalisation, rms',
            'Quasi-periodic oscillations; kHz QPOs',
            'Ultraluminous X-ray sources',
          ],
          explanation: `An X-ray binary is a compact object accreting from a stellar companion. In **low-mass X-ray binaries** (LMXBs) a donor below $\\sim 1\\,M_\\odot$ fills its Roche lobe and transfers mass through a disk; they are old, concentrated in the bulge and globular clusters, and often transient. In **high-mass X-ray binaries** (HMXBs) an O or B star loses mass in a wind or a decretion disk (Be/X-ray binaries) that the compact object captures; they are young and trace star formation. Their population, from the eROSITA and Chandra surveys, is a probe of compact-object formation.

Is the accretor a neutron star or a black hole? A neutron star has a **surface** and usually a magnetic field: thermonuclear **type I X-ray bursts** (helium flashes on the surface, rising in a second and decaying in tens of seconds) and coherent **pulsations** (accretion funnelled onto magnetic poles) are unambiguous. A black hole shows neither and is established dynamically: optical radial velocities of the donor give a mass function above $3\\,M_\\odot$, as for Cygnus X-1, GRS 1915+105 and about two dozen others.

Black-hole transients cycle through **accretion states** with remarkable regularity. An outburst begins in the **hard state**, where the spectrum is a $\\Gamma \\approx 1.7$ power law from a hot corona (or truncated disk plus inner hot flow) with a cut-off near 100 keV, strong variability (30% rms) and a steady radio **jet**. As the luminosity rises it moves to the **soft state**, dominated by the multicolour disk at $kT_{in} \\sim 1$ keV, with weak variability and the jet quenched. The decay returns to the hard state at lower luminosity, tracing a "q" in the **hardness-intensity diagram**. This hysteresis is still not fully explained.

Timing is the second dimension. The **power-density spectrum** (the squared Fourier amplitude of the light curve) shows broad-band noise and **quasi-periodic oscillations** (QPOs) at frequencies from mHz to hundreds of Hz; low-frequency QPOs track the state transition and may be Lense-Thirring precession of the inner flow, while neutron stars show kHz QPOs near the orbital frequency at the inner disk. Read the Remillard & McClintock review and the Done et al. review, and use NICER or RXTE data with Stingray for the timing exercise.`,
          resources: [
            {
              title: 'Remillard & McClintock (2006), X-ray properties of black-hole binaries',
              url: 'https://arxiv.org/abs/astro-ph/0606352',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; definitions of states and timing properties.',
              primary: true,
            },
            {
              title: 'Stingray — spectral-timing software for astronomy',
              url: 'https://docs.stingray.science/',
              type: 'tool',
              cost: 'free',
              provider: 'StingraySoftware',
              note: 'Python library for power spectra, cross spectra and QPO fitting from event files.',
            },
            {
              title: 'NICER mission (HEASARC)',
              url: 'https://heasarc.gsfc.nasa.gov/docs/nicer/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA HEASARC',
              note: 'High-throughput soft X-ray timing data; many black-hole and neutron-star outbursts.',
            },
            {
              title: 'Done, Gierlinski & Kubota (2007), Modelling the behaviour of accretion flows in X-ray binaries',
              url: 'https://arxiv.org/abs/0708.0148',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
          ],
          exercises: [
            {
              slug: 'hardness-intensity',
              title: 'Build a hardness-intensity diagram',
              prompt:
                'Download the daily Swift/BAT (15-50 keV) and MAXI (2-20 keV) light curves (MAXI public site or HEASARC) of the 2010-2011 outburst of GX 339-4 or the 2018 outburst of MAXI J1820+070. Compute a hardness ratio (BAT/MAXI) and plot intensity against hardness, colour-coded by time. Identify the hard state, the transition and the soft state, and the hysteresis. Mark the dates of radio jet detections from the literature.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'power-spectrum-qpo',
              title: 'Find a QPO in NICER data',
              prompt:
                'Download a NICER observation of MAXI J1820+070 in its hard-intermediate state from HEASARC. With Stingray, build an averaged power-density spectrum (segments of 64 s, 1/128 s bins, rms normalisation). Fit broad Lorentzians plus a narrow Lorentzian QPO and report the QPO frequency, quality factor and fractional rms. Compute the Keplerian radius corresponding to the QPO frequency for a 8 M_sun black hole and discuss whether a Keplerian interpretation is plausible.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'burst-radius',
              title: 'A neutron-star radius from a type I burst',
              prompt:
                'A photospheric-radius-expansion burst reaches a peak flux of 6e-8 erg/cm^2/s, assumed to equal the Eddington luminosity for helium (kappa = 0.2). Derive the distance for a 1.4 M_sun neutron star. In the cooling tail a blackbody fit gives normalisation (R/km / (D/10 kpc))^2 = 120; derive the apparent radius and discuss colour corrections and gravitational redshift.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What observations prove an X-ray binary hosts a neutron star rather than a black hole?',
              answerOutline:
                'Type I X-ray bursts (requiring a surface) or coherent pulsations (magnetic poles on a rotating surface).',
            },
            {
              question: 'Contrast the hard and soft states of black-hole binaries.',
              answerOutline:
                'Hard: power-law from a hot corona, high variability, steady jet. Soft: thermal disk at about 1 keV, low variability, jet quenched.',
            },
            {
              question: 'What is a QPO and why is it physically interesting?',
              answerOutline:
                'A broad peak in the power spectrum; its frequency maps onto characteristic timescales of the inner flow (orbits, precession), probing strong-field gravity.',
            },
          ],
        },
        {
          slug: 'jets-and-relativistic-beaming',
          title: 'Relativistic jets and beaming',
          summary:
            'Superluminal motion, Doppler boosting, the Blandford-Znajek mechanism and the jets of microquasars and AGN.',
          estimatedMinutes: 90,
          objectives: [
            'Derive the apparent transverse velocity of a relativistic blob and explain superluminal motion',
            'Compute the Doppler factor and the boosting of flux for continuous and discrete jets',
            'Explain jet one-sidedness and the unification of beamed sources',
            'Describe magnetic jet-launching mechanisms (Blandford-Znajek, Blandford-Payne) qualitatively',
          ],
          concepts: [
            'Apparent velocity beta_app = beta sin theta / (1 - beta cos theta)',
            'Doppler factor delta = 1 / (gamma (1 - beta cos theta))',
            'Flux boosting S proportional to delta^(3 + alpha) (discrete) or delta^(2 + alpha) (continuous)',
            'Jet/counter-jet ratio',
            'Microquasars: GRS 1915+105, SS 433',
            'Blandford-Znajek: extracting black-hole spin energy',
            'Blandford-Payne magnetocentrifugal winds',
            'Jet power and the radio-mode feedback connection',
          ],
          explanation: `Many accreting systems launch collimated **jets** at relativistic speeds, and relativity produces dramatic observational effects. Consider a blob moving at speed $\\beta c$ at angle $\\theta$ to the line of sight. Because it nearly keeps up with its own light, successive signals arrive compressed in time, and the apparent transverse speed is

$$ \\beta_{app} = \\frac{\\beta\\sin\\theta}{1 - \\beta\\cos\\theta}, $$

which exceeds 1 for $\\beta$ close to 1 and small $\\theta$, with a maximum of $\\beta\\gamma$ at $\\cos\\theta = \\beta$. **Superluminal motion** of 5-40 $c$ is routinely measured by VLBI in quasar jets (3C 279, M87's inner jet), and of order 1 $c$ in the Galactic microquasar GRS 1915+105, where both jet and counter-jet are seen.

Relativistic aberration also beams the emission. With **Doppler factor** $\\delta = [\\gamma(1 - \\beta\\cos\\theta)]^{-1}$, observed frequencies are multiplied by $\\delta$, timescales divided by $\\delta$, and flux densities boosted by $\\delta^{3+\\alpha}$ for a discrete blob (or $\\delta^{2+\\alpha}$ for a steady stream). For $\\gamma = 10$ viewed at $\\theta = 1/\\gamma$, $\\delta \\approx 10$ and the boost is $\\sim 10^4$. The approaching jet outshines the receding one by $[(1 + \\beta\\cos\\theta)/(1 - \\beta\\cos\\theta)]^{2+\\alpha}$, explaining why most quasar jets look one-sided, why **blazars** (jets pointed at us) dominate the gamma-ray sky, why their variability can be hours and their brightness temperatures exceed $10^{12}$ K, and why they are a tiny fraction of the parent population (module 4's unification).

How are jets launched? The leading idea is magnetic. In the **Blandford-Znajek** process, magnetic field lines threading a spinning black hole's ergosphere are twisted by frame dragging, extracting rotational energy as a Poynting flux with power $P_{BZ} \\sim \\kappa\\,\\Phi_B^2\\Omega_H^2/c$; general-relativistic MHD simulations of "magnetically arrested disks" produce jets with efficiency exceeding 100% of the accretion power, possible only because spin energy is tapped. **Blandford-Payne** magnetocentrifugal winds from the disk itself may provide the slower sheath. Jets carry enough power to heat cluster atmospheres (the radio-mode feedback of the galaxies track). Read the Blandford, Meier & Readhead review and the MOJAVE superluminal-motion results; the exercises compute beaming and fit apparent speeds.`,
          resources: [
            {
              title: 'Blandford, Meier & Readhead (2019), Relativistic jets from active galactic nuclei',
              url: 'https://arxiv.org/abs/1812.06025',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; kinematics, launching and emission.',
              primary: true,
            },
            {
              title: 'Mirabel & Rodriguez (1994), A superluminal source in the Galaxy',
              url: 'https://ui.adsabs.harvard.edu/abs/1994Natur.371...46M',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
              note: 'GRS 1915+105: jet and counter-jet, which together determine beta and theta.',
            },
            {
              title: 'Event Horizon Telescope',
              url: 'https://eventhorizontelescope.org/',
              type: 'article',
              cost: 'free',
              provider: 'EHT Collaboration',
              note: 'M87 jet-base polarisation results connecting the jet to the black-hole magnetic field.',
            },
          ],
          exercises: [
            {
              slug: 'superluminal-derivation',
              title: 'Derive superluminal motion',
              prompt:
                'Derive beta_app = beta sin theta / (1 - beta cos theta) from the light-travel time between two emission events. Show that the maximum is beta gamma at cos theta = beta. Plot beta_app against theta for gamma = 2, 5, 10, 20. For 3C 279 with beta_app = 20, find the minimum Lorentz factor and the maximum viewing angle.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'grs1915-jets',
              title: 'Solve for jet speed and angle from jet and counter-jet',
              prompt:
                'Mirabel & Rodriguez measured proper motions mu_a = 17.6 mas/day and mu_r = 9.0 mas/day for the approaching and receding blobs of GRS 1915+105. Using mu_{a,r} = beta sin theta c / (D (1 -/+ beta cos theta)), derive beta cos theta and, with the distance D (use 8.6 kpc from the modern parallax), beta and theta. Compute the expected flux ratio for alpha = 0.8 and compare with the observed ratio of about 8.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'beaming-population',
              title: 'Beaming and source counts',
              prompt:
                'Simulate 1e6 jets with gamma = 10, random isotropic orientations and intrinsic luminosity drawn from a power law. Compute observed luminosities with delta^(3 + alpha). Show what fraction of sources above a flux limit are viewed within 1/gamma, and how the observed luminosity function compares with the intrinsic one. Relate this to the ratio of blazars to radio galaxies.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is superluminal motion a violation of relativity?',
              answerOutline:
                'No: it is a projection and light-travel-time effect for a source moving close to c nearly toward us; the true speed is below c.',
            },
            {
              question: 'Why do blazars dominate the extragalactic gamma-ray sky?',
              answerOutline:
                'Doppler boosting by delta^(3 + alpha) with delta about 10-30 amplifies their flux by orders of magnitude and compresses variability timescales.',
            },
            {
              question: 'What is the energy source of a Blandford-Znajek jet?',
              answerOutline:
                'The rotational energy of the spinning black hole, extracted through magnetic field lines threading the ergosphere.',
            },
          ],
          relatedLessons: ['relativity/special-relativity-foundations/lorentz-transformation-and-the-interval'],
        },
      ],
    },
    {
      slug: 'neutron-stars-and-pulsars',
      title: 'Neutron Stars and Pulsars',
      description:
        'Rotation-powered pulsars and their spin-down, precision pulsar timing and its tests of gravity, magnetars and the neutron-star zoo, and measuring neutron-star radii with X-ray pulse profiles.',
      lessons: [
        {
          slug: 'pulsars-and-spin-down',
          title: 'Pulsars: the magnetic dipole model and the P-Pdot diagram',
          summary:
            'From the 1967 discovery to the spin-down luminosity, characteristic age and magnetic field, the P-Pdot diagram from the ATNF catalogue, and the Crab as a calorimeter.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the spin-down luminosity, characteristic age and dipole field from P and Pdot',
            'Build and interpret the P-Pdot diagram from the ATNF pulsar catalogue',
            'Explain the light cylinder, the Goldreich-Julian picture and why pulsars emit coherent radio pulses',
            'Show that the Crab Nebula is powered by its pulsar\'s spin-down',
          ],
          concepts: [
            'Rotating magnetised neutron star; lighthouse model',
            'Spin-down luminosity Edot = 4 pi^2 I Pdot / P^3',
            'Characteristic age tau_c = P / (2 Pdot)',
            'Surface dipole field B = 3.2e19 sqrt(P Pdot) G',
            'Braking index n = nu nuddot / nudot^2',
            'Light cylinder R_L = c P / 2 pi; Goldreich-Julian magnetosphere',
            'P-Pdot diagram: young, millisecond, magnetars, death line',
            'Dispersion measure and the ISM',
          ],
          explanation: `Jocelyn Bell Burnell's 1967 discovery of radio pulses repeating every 1.337 s was quickly explained as a rotating, magnetised neutron star whose beamed emission sweeps past Earth like a lighthouse; only a neutron star can rotate that fast without breaking up, and the Crab pulsar's 33 ms period clinched it. Pulsars slow down, and $P$ and its derivative $\\dot P$ are the two numbers from which almost everything follows. The rotational energy loss is the **spin-down luminosity**

$$ \\dot E = -I\\Omega\\dot\\Omega = \\frac{4\\pi^2 I\\dot P}{P^3}, $$

with moment of inertia $I \\approx 10^{45}$ g cm$^2$. If the braking is by **magnetic dipole radiation** ($\\dot E = B^2R^6\\Omega^4\\sin^2\\alpha/6c^3$), the surface field is $B \\approx 3.2 \\times 10^{19}\\sqrt{P\\dot P}$ G: $10^{12}$ G for normal pulsars, $10^8$ G for millisecond pulsars, $10^{14}$-$10^{15}$ G for magnetars. If the initial period was much shorter than now, the **characteristic age** is $\\tau_c = P/2\\dot P$ (1240 yr for the Crab, which exploded in 1054, a good check). The **braking index** $n = \\nu\\ddot\\nu/\\dot\\nu^2$ should be 3 for a pure dipole; measured values of 2-3 indicate additional torques from winds or field evolution.

The **P-Pdot diagram** made from the ATNF catalogue's 3500 pulsars is the HR diagram of neutron stars: young pulsars at top left with lines of constant $B$ and $\\tau_c$ crossing it, the main population at $P \\sim 0.5$ s and $\\tau_c \\sim 10^7$ yr, a separate island of **millisecond pulsars** at bottom left (old neutron stars spun up by accretion in LMXBs, the "recycling" scenario, confirmed by accreting millisecond X-ray pulsars), magnetars at top right, and a **death line** below which pair production in the magnetosphere stops and radio emission ceases.

The physics of the magnetosphere: a rotating conductor in a magnetic field induces electric fields of $10^{12}$ V that pull charges from the surface and fill the magnetosphere with plasma at the **Goldreich-Julian** density; field lines closing within the **light cylinder** $R_L = cP/2\\pi$ co-rotate, open lines carry a relativistic wind. The radio emission is **coherent** (brightness temperatures up to $10^{30}$ K) by a mechanism still debated. Most of $\\dot E$ goes into the wind, which in the Crab powers the synchrotron nebula: its total luminosity, $\\sim 1.3 \\times 10^{38}$ erg s$^{-1}$, matches the pulsar's $\\dot E = 4.5 \\times 10^{38}$ erg s$^{-1}$. Read Lorimer & Kramer (paid; Lyne & Graham-Smith similar), the free NRAO pulsar chapter, and the ATNF documentation, then build the diagram yourself.`,
          resources: [
            {
              title: 'ATNF Pulsar Catalogue',
              url: 'https://www.atnf.csiro.au/research/pulsar/psrcat/',
              type: 'dataset',
              cost: 'free',
              provider: 'CSIRO',
              note: 'P, Pdot, DM, binary parameters and derived quantities for all known pulsars.',
              primary: true,
            },
            {
              title: 'psrqpy — Python interface to the ATNF catalogue',
              url: 'https://psrqpy.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'Matthew Pitkin',
              note: 'Includes a built-in P-Pdot diagram function.',
            },
            {
              title: 'Condon & Ransom — Essential Radio Astronomy (pulsars chapter)',
              url: 'https://www.cv.nrao.edu/~sransom/web/xxx.html',
              type: 'textbook',
              cost: 'free',
              provider: 'NRAO',
              note: 'Chapter 6 covers pulsar properties, spin-down and dispersion; free alternative to Lorimer & Kramer.',
            },
            {
              title: 'OpenStax Astronomy 2e — 23.4 Pulsars and the Discovery of Neutron Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/23-4-pulsars-and-the-discovery-of-neutron-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
          ],
          exercises: [
            {
              slug: 'p-pdot-diagram',
              title: 'Build the P-Pdot diagram',
              prompt:
                'With psrqpy query P0, P1, BINARY, TYPE and ASSOC for all pulsars. Plot log Pdot against log P, colour binaries, magnetars (TYPE containing AXP or SGR) and supernova-remnant associations. Overlay lines of constant B (1e8, 1e10, 1e12, 1e14 G), constant tau_c (1e3 to 1e9 yr) and constant Edot, and a death line B/P^2 = 0.17e12 G/s^2. Count each population and comment on what the diagram implies about pulsar evolution and recycling.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'crab-calorimeter',
              title: 'The Crab as a calorimeter',
              prompt:
                'The Crab pulsar has P = 33.7 ms and Pdot = 4.2e-13. Compute Edot, B, tau_c and the light-cylinder radius. Compare tau_c with the true age since 1054 and derive the initial spin period for n = 2.5. Compare Edot with the nebula\'s total luminosity and with the energy needed to accelerate the synchrotron-emitting electrons (use the X-ray synchrotron cooling time from the radiative-processes module).',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'dispersion-measure',
              title: 'Distances from dispersion measures',
              prompt:
                'Derive the dispersion delay Delta t = 4.15 ms DM (nu/GHz)^-2 for DM in pc cm^-3. For pulsars in the ATNF catalogue that have both DM and independent (parallax) distances, plot DM against distance and estimate the mean electron density of the ISM. Then simulate a dispersed pulse across 1.2-1.5 GHz for DM = 300 and show how incoherent dedispersion recovers it.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'From P and Pdot, what three quantities do you derive and under what assumptions?',
              answerOutline:
                'Spin-down luminosity (I about 1e45 g cm^2), dipole surface field (magnetic dipole braking, R about 10 km) and characteristic age (n = 3 and P_0 much less than P).',
            },
            {
              question: 'Where do millisecond pulsars come from?',
              answerOutline:
                'Old neutron stars spun up by accretion of angular momentum from a companion in an LMXB, during which their field decays to about 1e8 G.',
            },
            {
              question: 'What powers the Crab Nebula?',
              answerOutline:
                'The pulsar\'s rotational energy loss (Edot about 5e38 erg/s), carried by a relativistic wind that is shocked and radiates synchrotron emission.',
            },
          ],
        },
        {
          slug: 'pulsar-timing',
          title: 'Pulsar timing and tests of gravity',
          summary:
            'Times of arrival and the timing model, binary pulsars and post-Keplerian parameters, the Hulse-Taylor and double pulsar tests of GR, and pulsar timing arrays.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the timing model: spin, astrometry, dispersion and binary terms, and barycentring',
            'Explain the Roemer, Shapiro and Einstein delays and the post-Keplerian parameters',
            'Reproduce the Hulse-Taylor orbital decay and compare with the GR prediction for gravitational-wave emission',
            'Explain how pulsar timing arrays detect nanohertz gravitational waves and the Hellings-Downs curve',
          ],
          concepts: [
            'Time of arrival (TOA), timing residuals',
            'Barycentric correction: Roemer, Shapiro, Einstein delays',
            'Keplerian binary parameters',
            'Post-Keplerian parameters: omega-dot, gamma, Pb-dot, r, s',
            'Hulse-Taylor pulsar PSR B1913+16',
            'Double pulsar PSR J0737-3039',
            'Pulsar timing arrays; Hellings-Downs correlation',
            'NANOGrav 15-year evidence for a gravitational-wave background',
          ],
          explanation: `Millisecond pulsars are the most stable clocks in nature that are not made by people, and **pulsar timing** exploits this. The observable is the **time of arrival** (TOA) of each pulse, measured to better than a microsecond by cross-correlating an averaged profile with a template. A **timing model** predicts every TOA from the spin frequency and its derivatives, the pulsar's position, proper motion and parallax, the dispersion measure, and, for binaries, the orbit; fitting the model by least squares leaves **residuals** whose structure reveals anything unmodelled. All TOAs are first transformed to the Solar System barycentre, correcting for the Earth's orbital light-travel time (**Roemer delay**, up to 500 s), the Sun's gravitational time delay (**Shapiro**), and gravitational redshift and time dilation (**Einstein**). Software: TEMPO2 and the Python package PINT.

In a binary the same three delays occur across the pulsar's orbit. Five Keplerian parameters describe a Newtonian orbit; in a relativistic system measurable **post-Keplerian** parameters appear: periastron advance $\\dot\\omega$, the time-dilation term $\\gamma$, orbital decay $\\dot P_b$, and the range $r$ and shape $s$ of the Shapiro delay. In GR each is a known function of the two masses, so measuring any two fixes the masses and every further one is a **test**. The **Hulse-Taylor pulsar** PSR B1913+16 (discovered 1974, Nobel 1993) has $\\dot\\omega = 4.2^\\circ$ yr$^{-1}$ and $\\gamma$ giving masses 1.44 and 1.39 $M_\\odot$; GR then predicts the orbital decay from gravitational-wave emission,

$$ \\dot P_b = -\\frac{192\\pi G^{5/3}}{5c^5}\\left(\\frac{P_b}{2\\pi}\\right)^{-5/3} f(e)\\,\\frac{m_p m_c}{(m_p + m_c)^{1/3}}, $$

and the observed cumulative periastron shift matches it to 0.2% over 40 years: the first evidence for gravitational waves. The **double pulsar** J0737-3039A/B, with both neutron stars visible as pulsars, tests GR at the $10^{-4}$ level.

Pulsars also serve as a galaxy-scale detector. A gravitational wave passing the Earth perturbs all pulsar TOAs with a characteristic angular correlation between pulsar pairs, the **Hellings-Downs curve**. **Pulsar timing arrays** (NANOGrav, EPTA, PPTA, IPTA) timing dozens of millisecond pulsars for 15+ years announced evidence in 2023 for a nanohertz background with this correlation, most likely from the inspiral of supermassive black-hole binaries. Read the Weisberg & Huang Hulse-Taylor update and the NANOGrav papers; the exercises use PINT and the published timing data.`,
          resources: [
            {
              title: 'PINT — pulsar timing software (Python)',
              url: 'https://nanograv-pint.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'NANOGrav',
              note: 'Tutorials fit timing models to example datasets; use it for the exercises.',
              primary: true,
            },
            {
              title: 'Weisberg & Huang (2016), Relativistic measurements from timing the binary pulsar PSR B1913+16',
              url: 'https://arxiv.org/abs/1606.02744',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'NANOGrav',
              url: 'https://nanograv.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'NANOGrav Physics Frontiers Center',
              note: 'The 15-year data set and gravitational-wave background papers.',
            },
            {
              title: 'Nobel Prize in Physics 1993 (Hulse and Taylor)',
              url: 'https://www.nobelprize.org/prizes/physics/1993/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
            },
            {
              title: 'ATNF Pulsar Catalogue',
              url: 'https://www.atnf.csiro.au/research/pulsar/psrcat/',
              type: 'dataset',
              cost: 'free',
              provider: 'CSIRO',
            },
          ],
          exercises: [
            {
              slug: 'hulse-taylor-decay',
              title: 'Reproduce the Hulse-Taylor orbital decay',
              prompt:
                'Using P_b = 7.752 h, e = 0.617, m_p = 1.438, m_c = 1.390 M_sun, compute the GR prediction of Pb-dot with the Peters-Mathews formula including f(e) = (1 + 73e^2/24 + 37e^4/96)(1 - e^2)^-7/2. Compute the cumulative shift of periastron time Delta T(t) = (Pb-dot / 2 P_b) t^2 from 1975 to 2015 and plot it. Compare with the measured points in Weisberg & Huang (2016) figure 2 and the corrected observed Pb-dot (including the Galactic acceleration correction).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'pint-timing-fit',
              title: 'Fit a timing model with PINT',
              prompt:
                'Follow the PINT tutorial using the bundled NGC6440E or a NANOGrav 15-year pulsar (par and tim files are public). Load the TOAs, fit spin frequency, frequency derivative, position and DM, and plot pre- and post-fit residuals. Then deliberately offset the position by 1 arcsec and show the annual sinusoid that appears in the residuals; explain it as a Roemer-delay error. Report the post-fit rms.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'hellings-downs',
              title: 'Derive and simulate the Hellings-Downs curve',
              prompt:
                'Derive (or take from the NANOGrav paper) the Hellings-Downs function Gamma(zeta) = 1/2 - x/4 + (3/2) x ln x with x = (1 - cos zeta)/2. Simulate an isotropic background of many plane gravitational waves with random directions and polarisations, compute the induced redshift for 50 pulsars at random sky positions, and show that pairwise correlations of the timing residuals follow the curve.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does measuring three post-Keplerian parameters constitute a test of GR?',
              answerOutline:
                'Each PK parameter depends in GR only on the two masses; two parameters determine the masses, so the third must agree with the GR prediction or the theory fails.',
            },
            {
              question: 'What do the Hulse-Taylor observations show about gravitational waves?',
              answerOutline:
                'The orbit shrinks at exactly the rate GR predicts from quadrupole gravitational-wave emission, indirect evidence that gravitational waves carry energy.',
            },
            {
              question: 'What is the Hellings-Downs curve?',
              answerOutline:
                'The expected correlation of timing residuals between pulsar pairs as a function of angular separation for an isotropic GW background; its quadrupolar signature distinguishes a GW signal from clock or ephemeris errors.',
            },
          ],
          relatedLessons: ['relativity/gravitational-waves-and-cosmological-solutions/generation-of-gravitational-waves'],
        },
        {
          slug: 'magnetars-and-the-neutron-star-zoo',
          title: 'Magnetars and the neutron-star zoo',
          summary:
            'Soft gamma repeaters and anomalous X-ray pulsars, giant flares, the X-ray dim isolated neutron stars and central compact objects, and the unified picture of field evolution.',
          estimatedMinutes: 90,
          objectives: [
            'Describe magnetar observables and explain why they must be magnetically powered',
            'Estimate the energetics of a magnetar giant flare and its magnetic energy budget',
            'List the classes of neutron stars (rotation-powered, accretion-powered, magnetars, XDINS, CCOs) and their distinguishing properties',
            'Explain neutron-star cooling and what thermal emission reveals about interiors',
          ],
          concepts: [
            'Soft gamma repeaters (SGRs) and anomalous X-ray pulsars (AXPs)',
            'Fields 1e14-1e15 G; L_X > Edot',
            'Giant flares (SGR 1806-20, 2004) and quasi-periodic oscillations',
            'Magnetic energy E_B about B^2 R^3 / 6',
            'X-ray dim isolated neutron stars (Magnificent Seven)',
            'Central compact objects (anti-magnetars)',
            'Neutron-star cooling curves; direct vs modified Urca',
            'Magnetars as fast radio burst sources (SGR 1935+2154)',
          ],
          explanation: `Not all neutron stars are powered by rotation or accretion. The **soft gamma repeaters** (SGRs), which emit repeated bursts of soft gamma rays, and the **anomalous X-ray pulsars** (AXPs), with steady X-ray luminosities of $10^{34}$-$10^{36}$ erg s$^{-1}$ and slow spins of 2-12 s, turned out to be one class: **magnetars**. Their $P$ and $\\dot P$ imply dipole fields of $10^{14}$-$10^{15}$ G, above the quantum critical field $B_Q = m_e^2c^3/e\\hbar = 4.4 \\times 10^{13}$ G, and their X-ray luminosity exceeds the spin-down power $\\dot E$, so rotation cannot power them, and there is no companion to accrete from. The energy source is the decay of the magnetic field itself: a magnetic energy $E_B \\approx B^2R^3/6 \\sim 10^{47}$-$10^{49}$ erg, released as the twisted field stresses the crust until it cracks.

The most dramatic release is a **giant flare**. On 27 December 2004, SGR 1806-20 emitted $\\sim 2 \\times 10^{46}$ erg in 0.2 s, ionising Earth's upper atmosphere from 9 kpc, followed by a pulsating tail; QPOs in the tail are interpreted as torsional oscillations of the crust, a seismic probe of neutron-star interiors. In 2020 a radio burst from the Galactic magnetar SGR 1935+2154 was detected simultaneously by CHIME and STARE2, coinciding with an X-ray burst: the first link between magnetars and **fast radio bursts** (module 5).

The neutron-star zoo includes other members. The **X-ray dim isolated neutron stars** (the "Magnificent Seven") are nearby, thermally emitting, radio-quiet neutron stars with $kT \\sim 50$-$100$ eV and fields $\\sim 10^{13}$ G, likely aged magnetars. **Central compact objects** in young supernova remnants (e.g. Cas A) are hot point sources with weak fields ("anti-magnetars"). Their thermal emission tests **neutron-star cooling**: after birth, neutrino emission by the modified Urca process cools the star over $10^5$ yr, while faster direct Urca or superfluid pair-breaking processes would indicate exotic interior physics. The Cas A CCO's reported rapid cooling was interpreted as onset of neutron superfluidity. Read the Kaspi & Beloborodov review; the exercises analyse Fermi/GBM or Swift burst data and cooling curves.`,
          resources: [
            {
              title: 'Kaspi & Beloborodov (2017), Magnetars',
              url: 'https://arxiv.org/abs/1703.00068',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; observational classes, energetics and theory.',
              primary: true,
            },
            {
              title: 'ATNF Pulsar Catalogue (magnetar entries)',
              url: 'https://www.atnf.csiro.au/research/pulsar/psrcat/',
              type: 'dataset',
              cost: 'free',
              provider: 'CSIRO',
              note: 'Magnetars are included with TYPE = AXP/SGR; use for the P-Pdot location exercise.',
            },
            {
              title: 'Swift mission (NASA)',
              url: 'https://swift.gsfc.nasa.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'BAT and XRT data on magnetar outbursts, archived at HEASARC.',
            },
            {
              title: 'CHIME/FRB Collaboration (2020), A bright millisecond-duration radio burst from a Galactic magnetar',
              url: 'https://arxiv.org/abs/2005.10324',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
          ],
          exercises: [
            {
              slug: 'magnetar-energetics',
              title: 'Magnetar energetics',
              prompt:
                'For SGR 1806-20 (P = 7.6 s, Pdot = 5e-10), compute Edot, B_dipole and tau_c. Compare Edot with its persistent X-ray luminosity of about 1e35 erg/s. Compute the external magnetic energy for B = 2e15 G and R = 12 km, and the number of giant flares of 2e46 erg it could power. Compute the fraction of the Eddington luminosity the giant flare peak represented and explain how a magnetar can exceed L_Edd (suppressed scattering cross-section in strong fields).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'magnetar-burst-spectrum',
              title: 'Spectrum of a magnetar short burst',
              prompt:
                'Download Fermi GBM data (TTE or CSPEC) of a short burst from SGR J1550-5418 or SGR 1935+2154 from the HEASARC Fermi GBM burst catalogue, or Swift-BAT event data from an outburst. Extract the burst light curve and spectrum, fit a blackbody and a cut-off power law with Sherpa or 3ML/threeML, and report the temperature, duration, peak flux and fluence. Convert fluence to energy using the distance and compare with typical short bursts (1e38-1e41 erg).',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'cooling-curve-comparison',
              title: 'Neutron-star cooling ages',
              prompt:
                'Compile surface temperatures (from the literature, e.g. the Magnificent Seven, Vela, Cas A CCO, PSR B0656+14) and ages (kinematic or SNR ages when possible, otherwise tau_c). Plot log T_s against log age. Overlay a simple cooling model: T_s proportional to t^-1/12 for modified Urca neutrino cooling until 1e5 yr, then photon cooling. Discuss which objects require faster cooling or heating.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must magnetars be powered by magnetic-field decay?',
              answerOutline:
                'Their X-ray luminosity exceeds spin-down power and they have no accretion companion; only the stored magnetic energy (1e47-1e49 erg) can supply it.',
            },
            {
              question: 'What links magnetars to fast radio bursts?',
              answerOutline:
                'In 2020 the Galactic magnetar SGR 1935+2154 emitted an FRB-like millisecond radio burst coincident with an X-ray burst.',
            },
            {
              question: 'What does a neutron-star cooling curve probe?',
              answerOutline:
                'The neutrino emission processes and superfluidity in the dense interior, hence the equation of state and composition.',
            },
          ],
        },
        {
          slug: 'neutron-star-interiors-and-the-equation-of-state',
          title: 'Neutron-star interiors and the dense-matter equation of state',
          summary:
            'The layered structure from crust to core, how masses (Shapiro delay) and radii (NICER pulse-profile modelling) constrain the equation of state, and tidal deformability from GW170817.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the internal structure of a neutron star from the outer crust to the inner core',
            'Explain how the mass-radius relation maps onto the equation of state through the TOV equation',
            'Explain NICER pulse-profile modelling and what it has measured',
            'Combine maximum-mass, radius and tidal-deformability constraints into an allowed EOS region',
          ],
          concepts: [
            'Outer crust (nuclei lattice), inner crust (neutron drip, pasta), outer core (npe-mu), inner core (exotica?)',
            'Nuclear saturation density 2.8e14 g/cm^3',
            'Mass-radius curves and the TOV equation',
            'Maximum mass and the 2 solar-mass pulsars (J0740+6620)',
            'Shapiro-delay masses',
            'NICER pulse-profile modelling: light bending, hot spots',
            'Tidal deformability Lambda from GW170817',
            'Symmetry energy and nuclear experiments',
          ],
          explanation: `A neutron star is a laboratory for matter at densities unreachable on Earth. Its **outer crust** is a lattice of neutron-rich nuclei in a degenerate electron sea; at $4 \\times 10^{11}$ g cm$^{-3}$ neutrons drip out of nuclei, forming the **inner crust**, where near the base nuclei may deform into "nuclear pasta"; at about half nuclear **saturation density** ($\\rho_0 = 2.8 \\times 10^{14}$ g cm$^{-3}$) the nuclei dissolve into a uniform fluid of neutrons with some protons, electrons and muons, likely superfluid and superconducting. In the inner core, at several times $\\rho_0$, hyperons, meson condensates or deconfined quark matter may appear. The **equation of state** (EOS) $P(\\rho)$ above $\\rho_0$ is the central unknown.

Each EOS, through the TOV equation, predicts a unique **mass-radius curve**, and conversely precise masses and radii constrain the EOS. **Masses** come from pulsar timing: the Shapiro delay in edge-on binaries gives the most precise values, and PSR J0740+6620 at $2.08 \\pm 0.07\\,M_\\odot$ (with J0348+0432 at 2.01) rules out EOSs that are too soft to support two solar masses, including many with early hyperon or quark phases. **Radii** are harder. NICER measures the X-ray pulse profiles of hot magnetic polar caps on millisecond pulsars; gravitational **light bending** (which depends on compactness $GM/Rc^2$) and Doppler boosting shape the profile, so Bayesian **pulse-profile modelling** yields $M$ and $R$ jointly. For J0030+0451 and J0740+6620, both teams find $R \\approx 12$-$13$ km to about 8%.

Gravitational waves provide the third constraint. In the late inspiral of a binary neutron star, each star is tidally deformed by its companion, with **tidal deformability** $\\Lambda = (2/3)k_2(Rc^2/GM)^5$ affecting the phase evolution. GW170817 limits $\\tilde\\Lambda \\lesssim 720$, excluding the stiffest EOSs and implying $R_{1.4} \\lesssim 13.5$ km. Combined with nuclear experiments (the neutron-skin thickness constrains the symmetry energy) and chiral effective field theory at low density, the allowed region has shrunk dramatically in a decade: $R_{1.4} = 12.0$-$13.0$ km and $M_{max} = 2.1$-$2.4\\,M_\\odot$. Read the Ozel & Freire review and the NICER papers; the exercises reuse your TOV solver from the stellar track.`,
          resources: [
            {
              title: 'Ozel & Freire (2016), Masses, radii, and the equation of state of neutron stars',
              url: 'https://arxiv.org/abs/1603.02698',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              primary: true,
            },
            {
              title: 'Riley et al. (2019), A NICER view of PSR J0030+0451: millisecond pulsar parameter estimation',
              url: 'https://arxiv.org/abs/1912.05702',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The pulse-profile modelling method; posterior samples are public on Zenodo.',
            },
            {
              title: 'NICER mission (HEASARC)',
              url: 'https://heasarc.gsfc.nasa.gov/docs/nicer/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA HEASARC',
            },
            {
              title: 'LIGO-Virgo (2018), GW170817: measurements of neutron star radii and equation of state',
              url: 'https://arxiv.org/abs/1805.11581',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
          ],
          exercises: [
            {
              slug: 'eos-mass-radius',
              title: 'Mass-radius curves for candidate equations of state',
              prompt:
                'Using piecewise polytropes (Read et al. 2009 parametrisation: a fixed crust plus three segments with adiabatic indices Gamma_1, Gamma_2, Gamma_3 and a pressure p_1 at 10^14.7 g/cm^3), integrate the TOV equation to obtain M(R) for the SLy, APR4, MS1 and H4 parameter sets (table III of Read et al.). Plot all four with the J0740+6620 mass band and the NICER J0030 radius region, and state which are excluded.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'light-bending',
              title: 'Light bending and pulse profiles',
              prompt:
                'Using Beloborodov\'s approximation 1 - cos alpha = (1 - cos psi)(1 - 2GM/Rc^2), compute the observed flux from a small hot spot on a rotating neutron star (ignore Doppler effects) as a function of rotational phase for compactness 0.15, 0.20 and 0.25, inclination 60 degrees and spot colatitude 45 degrees. Plot the pulse profiles and show how the pulsed fraction decreases with compactness. Explain why this constrains M/R.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tidal-deformability',
              title: 'Tidal deformability and radius',
              prompt:
                'Using the approximate relation Lambda about a (R c^2 / G M)^6 with a calibrated so that Lambda_1.4 = 400 for R = 12 km, compute the binary tidal deformability tilde-Lambda for an equal-mass 1.36 + 1.36 M_sun system as a function of radius and find the radius implied by the GW170817 bound tilde-Lambda < 720. Discuss the systematic uncertainty from the approximation.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do 2 solar-mass neutron stars rule out many exotic equations of state?',
              answerOutline:
                'Exotic phases (hyperons, quark matter) soften the EOS, lowering the maximum mass supported by the TOV equation below 2 M_sun unless they are very stiff.',
            },
            {
              question: 'How does NICER measure a neutron-star radius?',
              answerOutline:
                'By modelling the energy-resolved pulse profile of rotating hot spots, whose shape depends on light bending (compactness) and Doppler effects (radius times spin frequency), giving joint M and R posteriors.',
            },
            {
              question: 'What is tidal deformability and how is it measured?',
              answerOutline:
                'The quadrupole response of a star to an external tidal field, Lambda proportional to (R/M)^5; it modifies the late-inspiral phase of a binary neutron-star gravitational-wave signal.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/stellar-remnants/neutron-stars-and-stellar-black-holes'],
        },
      ],
      project: {
        slug: 'pulsar-population-and-timing',
        title: 'Module project: pulsar population and a timing analysis',
        description:
          'Use the ATNF catalogue to model the pulsar population: assume Gaussian initial periods and log-normal fields, evolve with magnetic-dipole spin-down, apply a death line and a beaming fraction, and compare the synthetic P-Pdot distribution with the real one. Then fit a public NANOGrav millisecond-pulsar timing dataset with PINT and measure its Shapiro delay to derive a companion mass.',
        deliverables: [
          'Population synthesis code and P-Pdot comparison figures with a goodness-of-fit statistic',
          'PINT timing notebook with residual plots and Shapiro-delay mass measurement',
          'A short report on what each part tells you about neutron-star birth properties and masses',
        ],
        estimatedHours: 14,
      },
    },
    {
      slug: 'black-holes-and-agn',
      title: 'Black Holes and Active Galactic Nuclei',
      description:
        'Black-hole spacetimes and their observable signatures, X-ray reflection and spin, active galactic nuclei and their unification, and imaging the event horizon.',
      lessons: [
        {
          slug: 'black-hole-spacetimes-and-observables',
          title: 'Black-hole spacetimes and their observable signatures',
          summary:
            'Schwarzschild and Kerr black holes, the photon sphere, ISCO, ergosphere and frame dragging, and how each appears in electromagnetic data.',
          estimatedMinutes: 100,
          objectives: [
            'State the key radii of Schwarzschild and Kerr black holes (horizon, photon sphere, ISCO, ergosphere) and how they depend on spin',
            'Compute gravitational redshift and time dilation for emitters near a black hole',
            'Explain the no-hair theorem and what "measuring a black hole" means',
            'Map each observable (disk continuum, Fe line, QPOs, shadow, ringdown) to the spacetime feature it probes',
          ],
          concepts: [
            'Schwarzschild radius r_s = 2GM/c^2',
            'Photon sphere 3GM/c^2 and shadow radius sqrt(27) GM/c^2',
            'ISCO 6GM/c^2 (a = 0) to GM/c^2 (a = 1)',
            'Kerr metric, spin parameter a = J c / G M^2',
            'Ergosphere and frame dragging; Lense-Thirring precession',
            'Gravitational redshift 1 + z = (1 - r_s/r)^-1/2',
            'No-hair theorem: M, J, Q',
            'Penrose process and spin energy',
          ],
          explanation: `An astrophysical black hole is completely described by its **mass** and **spin** (charge is neutralised quickly): the **no-hair theorem**. The non-spinning Schwarzschild solution has an event horizon at $r_s = 2GM/c^2$ (3 km per solar mass), a **photon sphere** at $3GM/c^2$ where light can orbit, and the innermost stable circular orbit at $6GM/c^2$. Spin, parametrised by $a = Jc/GM^2$ between 0 and 1, changes everything in the inner region: the Kerr horizon shrinks to $GM/c^2$ at $a = 1$, the prograde ISCO moves inward to the horizon, and an **ergosphere** appears outside the horizon where spacetime is dragged so strongly that nothing can remain at rest relative to distant stars. Frame dragging also makes tilted orbits precess (**Lense-Thirring**), a candidate explanation for low-frequency QPOs. The rotational energy of a Kerr hole, up to 29% of its mass, is extractable in principle (the Penrose process) and in practice via magnetic fields (Blandford-Znajek).

Light emitted near the hole is **gravitationally redshifted**, $1 + z = (1 - r_s/r)^{-1/2}$ for a static emitter, with additional transverse-Doppler and Doppler shifts for orbiting gas. Photons skimming the photon sphere wind around before escaping or being captured, so a distant observer sees a dark **shadow** of radius $\\sqrt{27}\\,GM/c^2 \\approx 5.2\\,GM/c^2$ (nearly independent of spin) bounded by a bright photon ring, which is what the Event Horizon Telescope imaged.

Each observable probes a different radius. The **disk continuum** and the red wing of the **broad Fe K line** probe the ISCO and hence spin; **QPOs** probe orbital and precession frequencies near the ISCO; **reverberation lags** probe light-travel distances in the inner flow; the **shadow** probes the photon sphere; and the **ringdown** of a merger remnant (module 6) probes the quasi-normal modes of the horizon itself, testing the no-hair theorem directly. Keep this map in mind for the rest of the module. The GR derivations are in the relativity track; here the emphasis is on numbers and observables. Read the McClintock, Narayan & Steiner review of spin measurement and the EHT M87 papers.`,
          resources: [
            {
              title: 'McClintock, Narayan & Steiner (2014), Black hole spin via continuum fitting and the role of spin in powering transient jets',
              url: 'https://arxiv.org/abs/1303.1583',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Section 2 reviews the Kerr radii and their observational consequences.',
              primary: true,
            },
            {
              title: 'Event Horizon Telescope',
              url: 'https://eventhorizontelescope.org/',
              type: 'article',
              cost: 'free',
              provider: 'EHT Collaboration',
            },
            {
              title: 'OpenStax Astronomy 2e — 24.5 Black Holes',
              url: 'https://openstax.org/books/astronomy-2e/pages/24-5-black-holes',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'MIT OCW 8.902 Astrophysics II',
              url: 'https://ocw.mit.edu/courses/8-902-astrophysics-ii-fall-2004/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
            },
          ],
          exercises: [
            {
              slug: 'kerr-radii',
              title: 'Kerr radii versus spin',
              prompt:
                'Compute and plot, for a from 0 to 0.998: the outer horizon r_+ = GM/c^2 (1 + sqrt(1 - a^2)), the equatorial ergosphere (2 GM/c^2), the prograde and retrograde photon orbits and the ISCOs. Tabulate the values for a = 0, 0.5, 0.9, 0.998. Then compute the orbital frequency at the ISCO for a 10 M_sun and a 4.3e6 M_sun black hole and compare with observed QPO frequencies and Sgr A* flare periodicities.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'redshift-near-isco',
              title: 'Line shifts near a black hole',
              prompt:
                'For a Keplerian ring at r = 6 GM/c^2 around a Schwarzschild black hole viewed at inclination 30 degrees, compute the observed energy of a 6.4 keV line as a function of orbital azimuth, including gravitational redshift and the special-relativistic Doppler factor (g = sqrt(1 - 3GM/rc^2) / (1 + beta sin i sin phi / sqrt(1 - 2GM/rc^2)) approximately). Plot the range of g and sketch the resulting double-horned, skewed profile.',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'observable-map',
              title: 'Which observable probes which radius?',
              prompt:
                'Write a one-page table and commentary mapping each black-hole observable (disk continuum, Fe K line, X-ray reverberation lags, QPOs, EHT shadow, GW ringdown, stellar orbits like S2) to the radius in units of GM/c^2 that it probes, the physical quantity it measures, and its main systematic uncertainty.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does spin affect the radiative efficiency of a black hole?',
              answerOutline:
                'Prograde spin moves the ISCO inward (to GM/c^2 at a = 1), so gas releases more binding energy before plunging: 5.7% at a = 0 up to 42% at a = 1.',
            },
            {
              question: 'Why is the shadow size nearly independent of spin?',
              answerOutline:
                'The photon orbits shift in opposite directions on the prograde and retrograde sides; the overall shadow diameter stays near 2 sqrt(27) GM/c^2 within a few per cent.',
            },
            {
              question: 'What does the no-hair theorem say and how can it be tested?',
              answerOutline:
                'A stationary black hole is described only by M, J (and Q); testing it requires measuring more than two independent properties (e.g. multiple ringdown modes) and checking consistency.',
            },
          ],
          relatedLessons: ['relativity/schwarzschild-solution-and-black-holes/rotating-black-holes-and-black-hole-thermodynamics'],
        },
        {
          slug: 'agn-structure-and-unification',
          title: 'Active galactic nuclei: structure and unification',
          summary:
            'Seyferts, quasars, radio galaxies and blazars; the broad-line region, torus and corona; reverberation mapping; and orientation-plus-power unification.',
          estimatedMinutes: 100,
          objectives: [
            'Classify AGN by optical spectrum, radio loudness and orientation',
            'Describe the components of the standard AGN model and their sizes and emission',
            'Use reverberation mapping and the radius-luminosity relation to estimate a black-hole mass',
            'Explain the unification scheme and the evidence for it (polarised broad lines, X-ray absorption)',
          ],
          concepts: [
            'Seyfert 1 and 2, quasars, LINERs',
            'Radio-loud vs radio-quiet; FR I and FR II radio galaxies',
            'Accretion disk (UV big blue bump), corona (X-ray), broad-line region, narrow-line region',
            'Dusty torus and infrared emission',
            'Reverberation mapping: R_BLR = c tau; M = f R v^2 / G',
            'R-L relation and single-epoch masses',
            'Unification by orientation; polarised broad lines in NGC 1068',
            'Compton-thick AGN and the X-ray background',
          ],
          explanation: `Active galactic nuclei are accreting supermassive black holes whose luminosity, $10^{42}$-$10^{48}$ erg s$^{-1}$, can outshine their host galaxies a thousandfold from a region smaller than the Solar System. Observationally they come in bewildering variety: **Seyfert 1** galaxies show broad (several thousand km s$^{-1}$) and narrow permitted lines, **Seyfert 2** only narrow lines; **quasars** are the luminous versions; about 10% are **radio-loud**, appearing as Fanaroff-Riley **radio galaxies** (FR I, edge-darkened, low power; FR II, edge-brightened lobes with hotspots) or, when viewed down the jet, as **blazars**.

The **standard model** organises the zoo into components at characteristic radii. An **accretion disk** at $\\sim 10$-$100\\,GM/c^2$ emits the ultraviolet "big blue bump"; a hot **corona** above it Comptonises disk photons into the power-law X-ray continuum ($\\Gamma \\approx 1.9$); the **broad-line region** of dense clouds at light-days to light-months orbits at thousands of km s$^{-1}$; a dusty, clumpy **torus** at parsec scales absorbs and re-emits in the infrared; and the **narrow-line region** extends to kiloparsecs. **Reverberation mapping** measures the BLR size directly: broad-line flux echoes continuum variations with a lag $\\tau$, giving $R_{BLR} = c\\tau$, and with the line width $\\Delta v$ the virial mass $M = fR\\Delta v^2/G$, calibrated against the M-sigma relation. The empirical **radius-luminosity relation** $R_{BLR} \\propto L^{0.5}$ then gives masses from a single spectrum for millions of SDSS quasars.

**Unification** says that much of the diversity is orientation. Seyfert 2s are Seyfert 1s seen through the torus: Antonucci and Miller found broad lines in the *polarised* (scattered) light of the Seyfert 2 NGC 1068, and X-ray spectra of Seyfert 2s show large absorbing columns, $N_H \\sim 10^{22}$-$10^{25}$ cm$^{-2}$. Blazars are radio galaxies seen down the jet, with Doppler boosting (previous module). The second parameter is accretion rate (Eddington ratio), which separates radiatively efficient quasars from radiatively inefficient low-luminosity AGN. Heavily obscured **Compton-thick** AGN are needed to explain the spectrum of the cosmic X-ray background, which peaks at 30 keV. Read the Netzer review and the Peterson reverberation lectures; the exercise measures single-epoch masses from SDSS quasar spectra.`,
          resources: [
            {
              title: 'Netzer (2015), Revisiting the unified model of active galactic nuclei',
              url: 'https://arxiv.org/abs/1505.00811',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; the modern version of unification.',
              primary: true,
            },
            {
              title: 'Peterson (1993), Reverberation mapping of active galactic nuclei',
              url: 'https://ui.adsabs.harvard.edu/abs/1993PASP..105..247P',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
              note: 'Reverberation mapping explained by one of its pioneers.',
            },
            {
              title: 'SDSS SkyServer',
              url: 'https://skyserver.sdss.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'Quasar spectra (specObj class = "QSO") for the mass exercise.',
            },
            {
              title: 'OpenStax Astronomy 2e — 27.1 Quasars',
              url: 'https://openstax.org/books/astronomy-2e/pages/27-1-quasars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
          ],
          exercises: [
            {
              slug: 'single-epoch-masses',
              title: 'Single-epoch black-hole masses from SDSS quasars',
              prompt:
                'Download 50 SDSS DR16 quasar spectra at 0.3 < z < 0.8. For each, fit the H-beta region (4700-5100 A rest frame) with a power-law continuum, a broad Gaussian (or two) for H-beta and narrow [O III] lines. Measure the FWHM of broad H-beta and the 5100 A continuum luminosity. Apply R_BLR = 33.65 (L_5100 / 1e44)^0.533 light-days (Bentz et al. 2013) and M = f R FWHM^2 / G with f = 1.0. Plot the mass distribution and the Eddington ratios (L_bol = 9.26 L_5100).',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'reverberation-lag',
              title: 'Measure a reverberation lag',
              prompt:
                'Using a published continuum and H-beta light curve of NGC 5548 (e.g. from the AGN Watch archive or the AGN STORM papers on arXiv), compute the interpolated cross-correlation function and find the lag. Estimate its uncertainty with flux randomisation and random subset selection. Combine with the line width to get the black-hole mass and compare with the published value.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'agn-component-sizes',
              title: 'Sizes of AGN components',
              prompt:
                'For a 1e8 M_sun black hole accreting at 0.1 L_Edd, compute: r_g; the radius where the disk peaks at 2500 A; the BLR radius from the R-L relation; the dust sublimation radius R_sub = 0.4 (L / 1e45)^0.5 (1500 K / T_sub)^2.6 pc; and the NLR size of about 1 kpc. Express each in r_g, light-days and arcseconds at z = 0.05, and identify which can be resolved by which instrument (EHT, GRAVITY, HST, ALMA).',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the evidence that Seyfert 2s contain hidden broad-line regions?',
              answerOutline:
                'Broad lines appear in polarised (scattered) light, as in NGC 1068, and their X-ray spectra show large absorbing columns consistent with a torus.',
            },
            {
              question: 'How does reverberation mapping weigh a black hole?',
              answerOutline:
                'The lag between continuum and broad-line variations gives the BLR radius; with the line width as the orbital velocity, M = f R v^2 / G.',
            },
            {
              question: 'What two parameters primarily drive AGN unification?',
              answerOutline:
                'Orientation (obscuration and beaming) and accretion rate/luminosity (radiatively efficient vs inefficient), plus radio loudness.',
            },
          ],
        },
        {
          slug: 'x-ray-reflection-and-black-hole-spin',
          title: 'X-ray reflection, relativistic iron lines and black-hole spin',
          summary:
            'How coronal X-rays illuminate the disk, the Compton hump and fluorescent Fe K line, relativistic broadening as a spin probe, and reverberation lags.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the origin of the reflection spectrum: Compton hump, Fe K-alpha fluorescence and absorption edge',
            'Explain how relativistic effects broaden and skew the Fe line and how the red wing measures the ISCO',
            'Fit a reflection model to real XMM-Newton/NuSTAR data and interpret the spin constraint',
            'Explain X-ray reverberation lags and what they say about coronal geometry',
          ],
          concepts: [
            'Reflection: Compton hump at 20-30 keV',
            'Fe K-alpha fluorescence at 6.4 keV; fluorescence yield',
            'Ionised reflection and the soft excess',
            'Relativistic line profile: Doppler, beaming, gravitational redshift',
            'Emissivity profile and lamppost geometry',
            'relxill and other reflection models',
            'Spin measurements in AGN and X-ray binaries',
            'Soft and Fe K reverberation lags',
          ],
          explanation: `The X-ray corona irradiates the accretion disk, and the disk's response is a rich **reflection spectrum**. Hard X-rays penetrating the disk are Compton down-scattered and absorbed; the reflected component rises to a **Compton hump** at 20-30 keV (above which photons penetrate and are lost, below which photoelectric absorption removes them). Iron, the most abundant heavy element with a high fluorescence yield, absorbs above its K edge (7.1 keV) and re-emits a **K-alpha line at 6.4 keV**. Ionised disk surfaces add many soft lines that blend into a "soft excess".

A line emitted from a disk near a black hole is distorted in three ways. Doppler shifts from orbital motion (a fraction of $c$) split it into blue and red horns; relativistic **beaming** enhances the blue horn; and **gravitational redshift** shifts the whole profile redward, increasingly so close to the hole. The result is a broad, skewed line with an extended **red wing** reaching down to $\\sim 3$-4 keV. Because emission stops at the inner edge of the disk, assumed to be the ISCO, the extent of the red wing measures $r_{ISCO}$ and hence **spin**. MCG-6-30-15, observed by ASCA in 1995 (Tanaka et al.), showed the first such line; XMM-Newton and NuSTAR (which captures the Compton hump simultaneously, breaking degeneracies with absorption) now give spins for dozens of AGN and binaries, many with $a > 0.9$. Modern models like **relxill** compute the full ionised reflection spectrum convolved with ray-traced relativistic transfer functions, with the emissivity profile often set by a "lamppost" corona at height $h$ above the hole.

The method has critics. Partial-covering absorption can mimic a red wing; spin depends on the assumption that the disk extends to the ISCO, the iron abundance (often fitted supersolar) and the coronal geometry. **X-ray reverberation** offers an independent check: soft reflected emission lags the coronal continuum by light-travel times of tens of $GM/c^2$, discovered in 1H0707-495 (Fabian et al. 2009), and Fe K lags with energy dependence tracing the line profile confirm that the reflection arises close to the hole. Read the Reynolds review and the relxill documentation, then fit a real NuSTAR+XMM spectrum in the exercise.`,
          resources: [
            {
              title: 'Reynolds (2021), Observational constraints on black hole spin',
              url: 'https://arxiv.org/abs/2011.08948',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; reflection and continuum methods and their systematics.',
              primary: true,
            },
            {
              title: 'Fabian et al. (2009), The detection of broad iron K and L line emission in the narrow-line Seyfert 1 galaxy 1H0707-495 using XMM-Newton',
              url: 'https://arxiv.org/abs/0905.4383',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Discovery of reverberation lags.',
            },
            {
              title: 'XMM-Newton Science Archive / SAS documentation',
              url: 'https://xmm-tools.cosmos.esa.int/external/xmm_user_support/documentation/sas_usg/USG/',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
              note: 'The SAS user guide for reducing EPIC-pn data.',
            },
            {
              title: 'HEASARC',
              url: 'https://heasarc.gsfc.nasa.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'NuSTAR and XMM-Newton data for MCG-6-30-15, NGC 1365 and others.',
            },
          ],
          exercises: [
            {
              slug: 'fit-relativistic-line',
              title: 'Fit a broad iron line',
              prompt:
                'Retrieve simultaneous XMM-Newton and NuSTAR observations of MCG-6-30-15 or NGC 1365 from HEASARC (use pipeline products where possible). Fit 3-79 keV with (a) tbabs*cutoffpl + gaussian at 6.4 keV, (b) tbabs*(cutoffpl + relline) and (c) tbabs*relxill. Compare the fit statistics, show the residuals of (a) around 4-7 keV and 20-30 keV, and report the spin, inclination and emissivity index from (c) with 90% errors. Discuss which assumptions most affect the spin.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'line-profile-ray-tracing',
              title: 'Compute a relativistic line profile',
              prompt:
                'Using the approximate transfer of your Kerr-radii and line-shift exercise, integrate the line emission over a disk from r_ISCO to 400 GM/c^2 with emissivity proportional to r^-3, for a = 0 and a = 0.998 at inclinations of 30 and 60 degrees (use the Schwarzschild g-factor with ISCO from the spin, a rough approximation). Plot the profiles and compare qualitatively with relline outputs from XSPEC.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'reverberation-scale',
              title: 'Reverberation lags in gravitational units',
              prompt:
                'The soft lag in 1H0707-495 is about 30 s at a frequency of 6e-4 Hz; its black-hole mass is about 2e6 M_sun. Convert the lag to a light-travel distance in GM/c^2 and discuss what it implies about coronal height. Then scale to a 10 M_sun binary and compute the lag and frequency at which the same geometry would appear, and comment on NICER\'s ability to detect it.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the main features of an X-ray reflection spectrum?',
              answerOutline:
                'Fe K-alpha fluorescence at 6.4 keV, the Fe K absorption edge near 7 keV, a Compton hump at 20-30 keV and, for ionised disks, a soft excess of blended lines.',
            },
            {
              question: 'How does a broad iron line constrain spin?',
              answerOutline:
                'The red wing extends to lower energies the closer the disk\'s inner edge is to the hole; assuming the inner edge is the ISCO, its radius gives the spin.',
            },
            {
              question: 'Name two systematics in reflection spin measurements.',
              answerOutline:
                'Complex absorption mimicking the red wing; assumption that the disk extends to the ISCO; iron abundance; coronal geometry and emissivity profile.',
            },
          ],
        },
        {
          slug: 'imaging-black-holes-with-the-eht',
          title: 'Imaging black holes with the Event Horizon Telescope',
          summary:
            'Very long baseline interferometry at 1.3 mm, the images of M87* and Sgr A*, what the ring diameter and asymmetry measure, and polarisation and the magnetic field.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the angular resolution of Earth-sized VLBI at 230 GHz and why only two black holes are resolvable',
            'Describe how visibilities sampled on a sparse uv-plane are turned into images and the role of priors',
            'Interpret the ring diameter, brightness asymmetry and polarisation pattern of M87* and Sgr A*',
            'Compare the EHT mass of M87* with stellar- and gas-dynamical masses',
          ],
          concepts: [
            'Resolution lambda / D about 25 microarcseconds at 1.3 mm',
            'Visibilities and the uv-plane; closure phases and amplitudes',
            'Imaging algorithms: CLEAN and regularised maximum likelihood',
            'Ring diameter about 42 microarcseconds (M87*) and 52 (Sgr A*)',
            'Mass from ring size: theta proportional to G M / (c^2 D)',
            'Brightness asymmetry from Doppler boosting and rotation sense',
            'Polarised images and magnetically arrested disks',
            'GRMHD simulation libraries',
          ],
          explanation: `To resolve the shadow of a black hole you need angular resolution comparable to $\\theta_{sh} \\approx 2\\sqrt{27}\\,GM/(c^2D)$. Only two black holes are large enough on the sky: Sgr A* (52 $\\mu$as, $4 \\times 10^6\\,M_\\odot$ at 8 kpc) and M87* (42 $\\mu$as, $6.5 \\times 10^9\\,M_\\odot$ at 16.8 Mpc). An interferometer's resolution is $\\lambda/B$ for baseline $B$; at $\\lambda = 1.3$ mm and $B \\approx$ Earth's diameter, $\\theta \\approx 25\\,\\mu$as. The **Event Horizon Telescope** links radio dishes from Hawaii to the South Pole, recording raw voltages with hydrogen-maser clocks and correlating them later. At 1.3 mm the accretion flow becomes optically thin, so the emission near the horizon is visible.

An interferometer measures **visibilities**, Fourier components of the image at spatial frequencies set by the projected baselines (the **uv-plane**). The EHT samples the uv-plane very sparsely, so the image is underdetermined; atmospheric phase errors at each station are removed by using **closure phases** (sums of phases around triangles of stations) and closure amplitudes, which are immune to station-based errors. Images are reconstructed with CLEAN and with regularised maximum-likelihood methods, and the collaboration tested robustness by having independent teams image blind and by fitting geometric ring models directly to the data.

The M87* image (2019) is a ring of diameter $42 \\pm 3\\,\\mu$as, brighter in the south. Calibrated against general-relativistic MHD simulations, the ring diameter gives $M = (6.5 \\pm 0.7) \\times 10^9\\,M_\\odot$, consistent with stellar dynamics and inconsistent with the lower gas-dynamical estimate. The **brightness asymmetry** arises from Doppler boosting of plasma rotating clockwise on the sky, aligned with the jet's rotation. **Polarised** images (2021) show a spiral pattern of the electric vector that favours a **magnetically arrested disk**, the configuration that powers jets by Blandford-Znajek. Sgr A* (2022) was harder because its variability timescale ($GM/c^3 \\approx 20$ s) is shorter than an observing night. Read the EHT papers I and VI for M87* and paper I for Sgr A*, and play with ehtim on the public data.`,
          resources: [
            {
              title: 'Event Horizon Telescope Collaboration (2019), First M87 Event Horizon Telescope results I: the shadow of the supermassive black hole',
              url: 'https://iopscience.iop.org/article/10.3847/2041-8213/ab0ec7',
              type: 'article',
              cost: 'free',
              provider: 'ApJ Letters',
              note: 'Open access. Papers II-VI (linked from it) cover the array, calibration, imaging, theory and mass.',
              primary: true,
            },
            {
              title: 'Event Horizon Telescope Collaboration (2022), First Sagittarius A* results I',
              url: 'https://iopscience.iop.org/article/10.3847/2041-8213/ac6674',
              type: 'article',
              cost: 'free',
              provider: 'ApJ Letters',
            },
            {
              title: 'Event Horizon Telescope',
              url: 'https://eventhorizontelescope.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'EHT Collaboration',
              note: 'Links to public data products and the ehtim imaging library.',
            },
          ],
          exercises: [
            {
              slug: 'eht-resolution',
              title: 'Resolution and shadow sizes',
              prompt:
                'Compute the shadow angular diameter for Sgr A*, M87*, the next-largest candidates (e.g. NGC 4594 Sombrero, 1e9 M_sun at 9.5 Mpc; Cen A, 5.5e7 M_sun at 3.8 Mpc) and a 10 M_sun black hole at 2 kpc. Compute the resolution of a 10,000 km baseline at 1.3 mm and 0.87 mm and of a space baseline of 50,000 km. Which targets become accessible with each?',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'ring-model-fit',
              title: 'Fit a ring to visibility amplitudes',
              prompt:
                'Derive the visibility function of an infinitely thin ring of diameter d: V(u) = J_0(pi d u). Using the public EHT M87* 2017 calibrated visibility data (via the EHT data release links), plot visibility amplitude against baseline length and fit a thin ring (and a ring convolved with a Gaussian of width w). Report d and compare with 42 microarcseconds. Identify the first null and explain why it is so diagnostic.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'closure-phase',
              title: 'Why closure phases work',
              prompt:
                'Show algebraically that for three stations i, j, k with station-based phase errors phi_i, the closure phase psi_ijk = arg(V_ij) + arg(V_jk) + arg(V_ki) is independent of the phi_i. Simulate a simple asymmetric source (a ring with a bright crescent), add random station phases, and show that closure phases recover the asymmetry while raw phases do not.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can the EHT resolve only Sgr A* and M87*?',
              answerOutline:
                'Only they have shadows larger than the about 20-25 microarcsecond resolution of Earth-sized baselines at 1.3 mm.',
            },
            {
              question: 'What does the brightness asymmetry of the M87* ring indicate?',
              answerOutline:
                'Doppler boosting of plasma moving toward us on one side, revealing the rotation sense of the flow (and black hole), aligned with the jet.',
            },
            {
              question: 'What are closure phases and why are they essential for mm VLBI?',
              answerOutline:
                'Sums of visibility phases around station triangles, immune to station-specific atmospheric and instrumental phase errors that otherwise scramble mm-wavelength phases.',
            },
          ],
        },
      ],
      project: {
        slug: 'agn-x-ray-spectral-survey',
        title: 'Module project: an X-ray spectral survey of AGN',
        description:
          'Select 15-20 nearby Seyfert galaxies with public XMM-Newton or NuSTAR observations (e.g. from the BAT AGN sample). Fit each with a consistent model (absorbed power law plus reflection), measure N_H, Gamma and reflection strength, and test unification: compare N_H with optical type, and photon index with Eddington ratio using published black-hole masses.',
        deliverables: [
          'A reduction and fitting pipeline applied uniformly to the sample',
          'Tables of fitted parameters with errors and plots of N_H versus optical type and Gamma versus Eddington ratio',
          'A short report evaluating the evidence for orientation unification',
        ],
        estimatedHours: 15,
      },
    },
    {
      slug: 'supernovae-grbs-and-transients',
      title: 'Supernovae, Gamma-Ray Bursts and Transients',
      description:
        'The violent sky: supernova remnants and shocks, gamma-ray bursts and their afterglows, fast radio bursts, and tidal disruption events in time-domain surveys.',
      lessons: [
        {
          slug: 'supernova-remnants-and-shock-physics',
          title: 'Supernova remnants and shock physics',
          summary:
            'The Rankine-Hugoniot conditions, free expansion, Sedov-Taylor and radiative phases, and X-ray observations of Cas A, Tycho and SN 1006.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the strong-shock jump conditions and the post-shock temperature',
            'Derive the Sedov-Taylor solution by dimensional analysis and apply it to real remnants',
            'Describe the evolutionary phases of a remnant and their timescales',
            'Interpret X-ray images and spectra of young remnants (ejecta, reverse shock, synchrotron rims)',
          ],
          concepts: [
            'Rankine-Hugoniot conditions; compression ratio 4',
            'Post-shock temperature kT = (3/16) mu m_p v_s^2',
            'Free expansion, Sedov-Taylor, snowplough, merging',
            'Sedov solution R = 1.15 (E t^2 / rho)^1/5',
            'Forward and reverse shocks; contact discontinuity',
            'Electron-ion temperature non-equilibration',
            'Thin X-ray synchrotron rims and magnetic-field amplification',
            'Remnant typing from ejecta composition (Ia vs core collapse)',
          ],
          explanation: `A supernova ejects $\\sim 1$-$10\\,M_\\odot$ at $10^4$ km s$^{-1}$ with $10^{51}$ erg, into an interstellar medium where the sound speed is $\\sim 10$ km s$^{-1}$: the ejecta drive a **strong shock**. Conservation of mass, momentum and energy across a shock (the **Rankine-Hugoniot** conditions) give, for a monatomic gas in the strong limit, a compression ratio of 4 and a post-shock temperature

$$ kT_s = \\frac{3}{16}\\mu m_p v_s^2 \\approx 1.2\\,\\mathrm{keV}\\left(\\frac{v_s}{1000\\,\\mathrm{km\\,s^{-1}}}\\right)^2, $$

so young remnants glow in X-rays. The shock is **collisionless** (the Coulomb mean free path is far larger than the shock thickness), and electrons and ions need not reach the same temperature immediately: H$\\alpha$ line widths and X-ray spectra show $T_e < T_i$ in fast shocks.

A remnant evolves through phases. In **free expansion** the ejecta coast until they have swept up a comparable mass, $\\sim$ a few hundred years. A **reverse shock** then propagates back into the ejecta, heating them to X-ray temperatures; between forward and reverse shocks lies the **contact discontinuity**, unstable to Rayleigh-Taylor fingers. When the swept mass dominates, the remnant enters the adiabatic **Sedov-Taylor** phase, whose radius follows from dimensional analysis alone: the only combination of $E$, $\\rho$ and $t$ with dimensions of length is $R = \\xi(Et^2/\\rho)^{1/5}$ with $\\xi = 1.15$, so $v_s = 2R/5t$. After $\\sim 3 \\times 10^4$ yr radiative cooling becomes important and the shell coasts as a **snowplough** with momentum conservation, finally merging with the ISM after $\\sim 10^6$ yr. Remnants inject energy and momentum that regulate the ISM and drive galactic winds.

X-ray observations reveal all of this. Chandra's image of **Cas A** (340 yr old) separates the outer forward shock, marked by thin rims of **synchrotron** X-rays, from the clumpy reverse-shocked ejecta with lines of Si, S, Ar, Ca and Fe; Fe-rich ejecta outside Si show overturning. The thin rims require electrons of 10-100 TeV and fields of $100$-$500\\,\\mu$G, far above interstellar, implying magnetic-field amplification by cosmic rays (module 6). Ejecta abundances and Fe K line centroids distinguish Ia from core-collapse remnants. Read the Vink review and the Chandra Cas A pages; the exercises fit Sedov models to real remnants.`,
          resources: [
            {
              title: 'Vink (2012), Supernova remnants: the X-ray perspective',
              url: 'https://arxiv.org/abs/1112.0576',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Astronomy & Astrophysics Review; comprehensive and pedagogical.',
              primary: true,
            },
            {
              title: 'Chandra X-ray Observatory',
              url: 'https://chandra.harvard.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Chandra X-ray Center',
              note: 'Cas A, Tycho and SN 1006 deep observations; the Chandra Source Catalog and archive.',
            },
            {
              title: 'Chandra Data Archive',
              url: 'https://cxc.harvard.edu/cda/',
              type: 'dataset',
              cost: 'free',
              provider: 'Chandra X-ray Center',
            },
            {
              title: 'MIT OCW 8.902 Astrophysics II',
              url: 'https://ocw.mit.edu/courses/8-902-astrophysics-ii-fall-2004/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on shocks and blast waves.',
            },
          ],
          exercises: [
            {
              slug: 'rankine-hugoniot',
              title: 'Derive the strong-shock conditions',
              prompt:
                'Write the conservation of mass, momentum and energy flux across a planar shock in the shock frame. Solve for the density and pressure ratios as functions of Mach number and show that rho_2/rho_1 approaches (gamma + 1)/(gamma - 1) = 4 and kT_2 = (3/16) mu m_p v_s^2 in the strong-shock limit. Evaluate T for v_s = 500, 3000 and 10,000 km/s.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'sedov-fit',
              title: 'Sedov ages and energies of real remnants',
              prompt:
                'For Tycho (SN 1572, distance about 3 kpc, angular radius 4 arcmin, expansion rate from Chandra proper motions about 0.3 arcsec/yr) and SN 1006 (distance 2.2 kpc, radius 15 arcmin), compute R and v_s, test the Sedov relation v_s = 2R/5t with the known ages, and infer the ambient density for E = 1e51 erg. Compare the post-shock temperature with X-ray fits from the literature and discuss electron-ion non-equilibration.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cas-a-image-analysis',
              title: 'Cas A in X-ray colours',
              prompt:
                'Download a Chandra ACIS observation of Cas A (event file) from the Chandra Data Archive. Make images in the Si He-alpha (1.78-1.94 keV), Fe K (6.4-6.8 keV) and 4-6 keV continuum bands with astropy (bin the events by energy and position). Display them as an RGB image. Identify the forward-shock rims (continuum), Si-rich and Fe-rich ejecta, and measure the radii of the forward and reverse shocks. Discuss the Fe-outside-Si regions.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do young supernova remnants emit X-rays?',
              answerOutline:
                'Shock velocities of thousands of km/s heat the gas to kT = (3/16) mu m_p v^2, of order keV, producing thermal bremsstrahlung and lines; the fastest shocks also accelerate electrons to synchrotron X-ray energies.',
            },
            {
              question: 'How does dimensional analysis give the Sedov solution?',
              answerOutline:
                'In the adiabatic phase only E, rho and t matter; the only length is (E t^2/rho)^(1/5), so R proportional to t^(2/5) and v proportional to t^(-3/5).',
            },
            {
              question: 'What is the reverse shock?',
              answerOutline:
                'A shock driven back into the expanding ejecta by the pressure of swept-up material, heating the ejecta and making their composition visible in X-rays.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/stellar-remnants/core-collapse-supernovae'],
        },
        {
          slug: 'gamma-ray-bursts',
          title: 'Gamma-ray bursts and their afterglows',
          summary:
            'Long and short GRBs, the compactness problem and relativistic fireballs, internal and external shocks, afterglow light curves and jet breaks, and the collapsar and merger progenitors.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the observed properties of GRBs (durations, spectra, energetics) using Fermi GBM and Swift data',
            'Explain the compactness problem and derive the minimum Lorentz factor',
            'Explain the fireball model: prompt emission and afterglow from external shocks',
            'Interpret afterglow light curves, jet breaks and true energetics; connect long GRBs to collapsars and short GRBs to mergers',
          ],
          concepts: [
            'BATSE bimodality: long (> 2 s) and short GRBs',
            'Band function spectra and E_peak',
            'Isotropic-equivalent energy up to 1e54 erg',
            'Compactness problem; Lorentz factor Gamma > 100',
            'Internal shocks vs photospheric prompt emission',
            'External-shock afterglow: synchrotron, F_nu proportional to t^-alpha nu^-beta',
            'Jet break and beaming-corrected energy about 1e51 erg',
            'Collapsars and SN Ic-BL; short GRBs and GW170817',
          ],
          explanation: `Gamma-ray bursts are flashes of 100 keV-MeV photons lasting from milliseconds to minutes, arriving about once a day from random directions. BATSE showed their isotropy and a bimodal duration distribution: **long** bursts ($T_{90} > 2$ s) with softer spectra and **short** bursts with harder ones. In 1997 BeppoSAX located fading X-ray **afterglows**, enabling optical redshifts: GRBs are cosmological, at $z \\sim 0.1$-9, and their isotropic-equivalent energies reach $10^{54}$ erg. Prompt spectra are well fitted by the empirical **Band function** with a peak energy $E_{peak}$ of hundreds of keV. Fermi GBM and Swift BAT/XRT/UVOT now detect hundreds per year with public data.

Such energies from such small regions create the **compactness problem**. Variability on timescale $\\delta t \\sim 10$ ms implies a source size $R < c\\,\\delta t \\sim 3000$ km; packing $10^{51}$ erg of MeV photons in that volume gives a pair-production optical depth $\\tau_{\\gamma\\gamma} \\sim 10^{15}$, and the spectrum would be thermal, contrary to observation. The resolution is **relativistic motion**: if the emitter moves toward us with Lorentz factor $\\Gamma$, the true size is $\\Gamma^2 c\\,\\delta t$ and photon energies in the comoving frame are lower by $\\Gamma$; requiring $\\tau_{\\gamma\\gamma} < 1$ gives $\\Gamma \\gtrsim 100$-1000, confirmed by Fermi-LAT detections of GeV photons. In the **fireball model**, a relativistic outflow dissipates energy at internal shocks or a photosphere (prompt emission) and is then decelerated by the surrounding medium, driving an **external forward shock** whose synchrotron emission is the afterglow: broken power laws $F_\\nu \\propto t^{-\\alpha}\\nu^{-\\beta}$ with closure relations linking $\\alpha$ and $\\beta$ to the electron index $p$.

When the decelerating jet's Lorentz factor drops below $1/\\theta_j$, the observer sees the jet edge and the light curve steepens: a **jet break**, typically at days, implying opening angles of a few degrees and **beaming-corrected energies** of $\\sim 10^{51}$ erg, comparable to supernovae. Long GRBs occur in star-forming dwarf galaxies and several have broad-lined type Ic supernovae underneath (GRB 980425/SN 1998bw, GRB 030329): they are **collapsars**, massive stripped stars whose cores form black holes that launch jets. Short GRBs occur in all galaxy types with offsets from their hosts and no supernova; GW170817 confirmed they come from **neutron-star mergers**. Read the Kumar & Zhang review and use the Swift XRT light-curve repository and the Fermi GBM burst catalogue for the exercises.`,
          resources: [
            {
              title: 'Kumar & Zhang (2015), The physics of gamma-ray bursts and relativistic jets',
              url: 'https://arxiv.org/abs/1410.0679',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Physics Reports; comprehensive treatment of prompt emission and afterglows.',
              primary: true,
            },
            {
              title: 'Fermi GBM Burst Catalog (HEASARC)',
              url: 'https://heasarc.gsfc.nasa.gov/W3Browse/fermi/fermigbrst.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA HEASARC',
              note: 'Durations, fluences, spectral fits and data for thousands of GRBs.',
            },
            {
              title: 'Swift-XRT GRB light curve repository (UK Swift Science Data Centre)',
              url: 'https://www.swift.ac.uk/xrt_curves/',
              type: 'dataset',
              cost: 'free',
              provider: 'University of Leicester',
              note: 'Automatically processed X-ray afterglow light curves and spectra.',
            },
            {
              title: 'Swift mission (NASA)',
              url: 'https://swift.gsfc.nasa.gov/',
              type: 'documentation',
              cost: 'free',
              provider: 'NASA',
            },
          ],
          exercises: [
            {
              slug: 'gbm-duration-bimodality',
              title: 'The duration bimodality in the Fermi GBM catalogue',
              prompt:
                'Download the Fermi GBM burst catalogue table from HEASARC (t90, fluence, flnc_band_epeak). Plot the histogram of log T90 and fit a two-component Gaussian mixture; report the means and the crossing point. Plot hardness (E_peak) against T90 and show short bursts are harder. Then compute E_iso for bursts with known redshifts (from the literature or GRBOX) and plot E_peak against E_iso (the Amati relation).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'compactness-lorentz-factor',
              title: 'Solve the compactness problem',
              prompt:
                'For a burst at z = 1 with fluence 1e-5 erg/cm^2, variability 10 ms and photons up to 1 GeV, compute E_iso, the naive source size and the pair-production optical depth tau = f sigma_T E / (4 pi R^2 m_e c^2) for a fraction f = 0.1 of photons above threshold. Then include relativistic motion (R = 2 Gamma^2 c delta t and the threshold shift) and derive the minimum Gamma such that tau < 1. Compare with Fermi-LAT estimates for GRB 080916C (Gamma > 600).',
              kind: 'problem',
              difficulty: 3,
            },
            {
              slug: 'afterglow-fit',
              title: 'Fit an X-ray afterglow and find the jet break',
              prompt:
                'From the Swift XRT repository, download the 0.3-10 keV light curve and photon index of a well-sampled long GRB with known redshift (e.g. GRB 130427A or GRB 060729). Fit a broken power law (or the canonical steep-decay, plateau, normal-decay segments). Using closure relations for a constant-density medium, check consistency between temporal and spectral indices and infer p. If a late steepening is present, interpret it as a jet break and compute the opening angle and beaming-corrected energy using the Sari, Piran & Halpern formula.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the compactness problem and how is it solved?',
              answerOutline:
                'The inferred photon density from luminosity and variability size would make the source opaque to pair production; relativistic motion with Gamma > 100 enlarges the emission region and lowers comoving photon energies.',
            },
            {
              question: 'What is a jet break and why does it matter?',
              answerOutline:
                'A steepening of the afterglow when the jet decelerates to Gamma about 1/theta_j and the observer sees its edge; it gives the opening angle and reduces true energies by theta_j^2/2 to about 1e51 erg.',
            },
            {
              question: 'What are the progenitors of long and short GRBs, and what is the evidence?',
              answerOutline:
                'Long: collapsing massive stars (SN Ic-BL associations, star-forming hosts). Short: compact-object mergers (old hosts, offsets, no supernova, GW170817/GRB 170817A).',
            },
          ],
        },
        {
          slug: 'fast-radio-bursts-and-the-time-domain-sky',
          title: 'Fast radio bursts and the time-domain sky',
          summary:
            'Millisecond radio bursts from cosmological distances, dispersion as a baryon census, repeaters and magnetars, and the survey machinery (CHIME, ZTF, Rubin, alerts) behind transient astronomy.',
          estimatedMinutes: 90,
          objectives: [
            'Describe FRB observables and derive brightness temperatures that require coherent emission',
            'Use the Macquart relation between dispersion measure and redshift to estimate the cosmic baryon density',
            'Describe repeaters, localisations and the magnetar connection',
            'Explain how modern time-domain surveys and alert brokers find and classify transients',
          ],
          concepts: [
            'FRBs: millisecond durations, Jy fluxes, DM 100-3000 pc/cm^3',
            'Brightness temperature > 1e35 K: coherent emission',
            'DM budget: Milky Way, halo, IGM, host',
            'Macquart relation and the missing baryons',
            'Repeaters (FRB 121102, 20180916B) and periodicities',
            'CHIME/FRB catalogue',
            'Time-domain surveys: ZTF, ATLAS, Rubin LSST',
            'Alert streams, brokers and the Transient Name Server',
          ],
          explanation: `**Fast radio bursts** are millisecond flashes of radio emission with fluxes of a jansky or more and dispersion measures (DMs) far exceeding what the Milky Way can supply, discovered in archival Parkes data by Lorimer et al. in 2007. The dispersion delay $\\Delta t \\propto \\mathrm{DM}\\,\\nu^{-2}$ measures the column of free electrons along the line of sight; subtracting the Galactic disk and halo contributions leaves an extragalactic DM that, for localised bursts with host redshifts, rises linearly with $z$: the **Macquart relation**. Because the intergalactic contribution counts *all* ionised baryons, the relation measures the cosmic baryon density and found the "missing baryons" that had eluded other probes, consistent with $\\Omega_b h^2 = 0.022$.

The physics is extreme. A 1 Jy, 1 ms burst at 1 Gpc from a region no larger than $c\\,\\Delta t \\sim 300$ km has brightness temperature $T_b \\gtrsim 10^{35}$ K, so the emission must be **coherent** (like pulsar radio emission, only far more energetic). CHIME/FRB has detected thousands, finding a sky rate of $\\sim 10^3$ per day above 5 Jy ms, and dozens of **repeaters**; FRB 20180916B repeats with a 16-day periodicity, FRB 20121102A sits in a dwarf galaxy next to a persistent radio source with enormous rotation measure, and FRB 20200120E is in a globular cluster of M81. The 2020 burst from the Galactic magnetar SGR 1935+2154 showed that magnetars can produce FRBs, making them the leading progenitor class, though whether all FRBs share it is open.

FRBs exemplify the **time-domain** revolution. Optical surveys (ZTF, ATLAS, Pan-STARRS, and from 2025 the Rubin Observatory's LSST, imaging the whole southern sky every few nights) produce millions of alerts per night of things that changed. **Alert brokers** (ALeRCE, Fink, ANTARES, Lasair) classify them with machine learning in real time; promising events are reported to the **Transient Name Server**, which assigns official designations (AT 2024abc, SN 2024abc after spectroscopic classification). Supernovae, tidal disruptions, kilonovae, novae, and orphan afterglows are all found this way, and gravitational-wave and neutrino alerts trigger follow-up searches. Read the Petroff, Hessels & Lorimer review and the Macquart et al. paper; the exercises use the CHIME catalogue and the TNS.`,
          resources: [
            {
              title: 'Petroff, Hessels & Lorimer (2022), Fast radio bursts at the dawn of the 2020s',
              url: 'https://arxiv.org/abs/2107.10113',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Astronomy & Astrophysics Review; observations and models.',
              primary: true,
            },
            {
              title: 'CHIME/FRB catalogue',
              url: 'https://www.chime-frb.ca/catalog',
              type: 'dataset',
              cost: 'free',
              provider: 'CHIME/FRB Collaboration',
              note: 'The first catalogue of 536 FRBs with DMs, fluences and morphologies.',
            },
            {
              title: 'Macquart et al. (2020), A census of baryons in the Universe from localized fast radio bursts',
              url: 'https://arxiv.org/abs/2005.13161',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Transient Name Server',
              url: 'https://www.wis-tns.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'IAU / Weizmann Institute',
            },
            {
              title: 'Zwicky Transient Facility',
              url: 'https://www.ztf.caltech.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'Caltech',
              note: 'Public alert stream and data releases; forced-photometry service for light curves.',
            },
          ],
          exercises: [
            {
              slug: 'chime-dm-distribution',
              title: 'The CHIME FRB DM distribution',
              prompt:
                'Download the CHIME/FRB Catalog 1 table. Plot the distribution of DM and of DM minus the Galactic contribution (column dm_exc_ne2001). Using the Macquart relation <DM_IGM> about 935 z pc/cm^3 (for Planck baryon density and f_IGM about 0.84) and an assumed host contribution of 50/(1 + z), convert to approximate redshifts and plot the inferred redshift distribution. Compare repeaters with non-repeaters in DM and burst width.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'macquart-relation',
              title: 'Derive the Macquart relation and weigh the baryons',
              prompt:
                'Derive <DM_IGM>(z) = (3 c H_0 Omega_b f_IGM / 8 pi G m_p) integral of (1 + z) chi_e / E(z) dz, with chi_e = 7/8 for ionised H and He. Evaluate it for Planck parameters. Using a published table of localised FRBs with host redshifts (Macquart et al. 2020 table 1 or later compilations), fit Omega_b h_70 and compare with BBN.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'brightness-temperature-frb',
              title: 'Brightness temperature of an FRB',
              prompt:
                'For a burst with peak flux 1 Jy at 1.4 GHz, duration 1 ms, at luminosity distance 1 Gpc, compute T_b = S D^2 / (2 pi k (nu Delta t)^2) (using the light-crossing size limit). Compare with the 1e12 K inverse-Compton limit for incoherent synchrotron and with pulsars. Then compute the isotropic energy and compare with the Galactic magnetar burst from SGR 1935+2154.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must FRB emission be coherent?',
              answerOutline:
                'Brightness temperatures exceed 1e35 K, far above the 1e12 K limit for incoherent synchrotron sources; only coherent processes (bunched charges, masers) can do this.',
            },
            {
              question: 'What does the Macquart relation measure?',
              answerOutline:
                'The mean extragalactic DM versus redshift, which is proportional to the cosmic density of ionised baryons; it located the missing baryons in the IGM.',
            },
            {
              question: 'What role do alert brokers play in time-domain astronomy?',
              answerOutline:
                'They ingest millions of survey alerts per night, cross-match and classify them in real time so that rare transients can be followed up quickly.',
            },
          ],
        },
        {
          slug: 'tidal-disruption-events',
          title: 'Tidal disruption events',
          summary:
            'Stars torn apart by supermassive black holes: the tidal radius, the t^(-5/3) fallback rate, optical/X-ray/radio signatures, and what TDEs reveal about dormant black holes.',
          estimatedMinutes: 90,
          objectives: [
            'Derive the tidal radius and the Hills mass above which stars are swallowed whole',
            'Derive the fallback rate proportional to t^(-5/3) and its peak timescale',
            'Describe optical, X-ray and radio observational classes of TDEs',
            'Fit a TDE light curve from ZTF or Swift data and infer the black-hole mass',
          ],
          concepts: [
            'Tidal radius r_t = R_* (M_BH / M_*)^1/3',
            'Hills mass about 1e8 solar masses',
            'Energy spread and fallback Mdot proportional to t^-5/3',
            'Super-Eddington fallback',
            'Optical/UV TDEs: blue continuum, broad H and He lines, T about 2-4e4 K',
            'Thermal soft X-ray TDEs',
            'Jetted TDEs (Swift J1644+57) and radio outflows',
            'Rates about 1e-4 per galaxy per year; MOSFiT, TDE models',
          ],
          explanation: `A star wandering too close to a supermassive black hole is torn apart when the hole's tidal acceleration across it exceeds its self-gravity, at the **tidal radius**

$$ r_t \\approx R_*\\left(\\frac{M_{BH}}{M_*}\\right)^{1/3} \\approx 7 \\times 10^{12}\\,\\mathrm{cm}\\left(\\frac{M_{BH}}{10^6\\,M_\\odot}\\right)^{1/3} $$

for a Sun-like star. Because $r_t \\propto M^{1/3}$ while $r_s \\propto M$, above the **Hills mass** ($\\sim 10^8\\,M_\\odot$ for the Sun) the tidal radius lies inside the horizon and stars are swallowed whole; TDEs therefore probe black holes in the low-mass, mostly quiescent galaxies where accretion is otherwise invisible.

The disruption spreads the debris in specific orbital energy by $\\Delta\\epsilon \\approx GM_{BH}R_*/r_t^2$. Half is unbound and escapes; the bound half returns to pericentre with Kepler periods set by its energy. If the mass is distributed roughly uniformly in energy, the **fallback rate** follows $\\dot M \\propto (d M/d\\epsilon)\\,(d\\epsilon/dt) \\propto t^{-5/3}$ after a peak at $t_{min} \\approx 40\\,\\mathrm{d}\\,(M_{BH}/10^6\\,M_\\odot)^{1/2}$, with peak rates exceeding Eddington for black holes below $\\sim 10^7\\,M_\\odot$. The $t^{-5/3}$ power law, predicted by Rees (1988), is a hallmark seen in many light curves.

Observationally, most TDEs are now found by optical surveys (ZTF finds dozens per year): blue, hot ($2$-$4 \\times 10^4$ K), with broad H and He II lines and luminosities of $10^{43}$-$10^{44}$ erg s$^{-1}$ that decline over months, preferentially in post-starburst "E+A" galaxies. The optical emission comes from a radius much larger than the disk would be, probably reprocessing by an outflow or shocks between debris streams, an open question. Some show **soft thermal X-rays** ($kT \\sim 50$-100 eV) from the newly formed disk, sometimes rising late as the reprocessing envelope clears; a few, like **Swift J1644+57** (2011), launched relativistic **jets** seen in hard X-rays and radio, and radio follow-up of others shows sub-relativistic outflows. TDE rates of $\\sim 10^{-4}$ per galaxy per year constrain stellar dynamics in galactic nuclei, and light-curve fits (MOSFiT and similar) estimate black-hole masses consistent with M-sigma. Read the Gezari review and Rees (1988); the exercises use ZTF and Swift data.`,
          resources: [
            {
              title: 'Gezari (2021), Tidal disruption events',
              url: 'https://arxiv.org/abs/2104.14580',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; observations and theory of TDEs.',
              primary: true,
            },
            {
              title: 'Rees (1988), Tidal disruption of stars by black holes of 1e6-1e8 solar masses in nearby galaxies',
              url: 'https://ui.adsabs.harvard.edu/abs/1988Natur.333..523R',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
            },
            {
              title: 'Zwicky Transient Facility',
              url: 'https://www.ztf.caltech.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'Caltech',
              note: 'Forced-photometry light curves of ZTF TDEs (e.g. AT2018hyz, AT2019dsg).',
            },
            {
              title: 'Swift mission (NASA)',
              url: 'https://swift.gsfc.nasa.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'UVOT and XRT follow-up of TDEs, archived at HEASARC.',
            },
          ],
          exercises: [
            {
              slug: 'tidal-radius-hills-mass',
              title: 'Tidal radius and the Hills mass',
              prompt:
                'Derive r_t by equating the tidal acceleration G M_BH R_* / r^3 with the star\'s surface gravity G M_* / R_*^2. Compute r_t / r_s for a Sun-like star, an M dwarf (0.3 M_sun, 0.3 R_sun) and a red giant (1 M_sun, 10 R_sun) as a function of M_BH, and find the Hills mass for each (including the factor for Kerr black holes qualitatively). Discuss why giants can be disrupted by heavier black holes.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'fallback-rate',
              title: 'Derive and simulate fallback',
              prompt:
                'Derive t_min and Mdot proportional to t^-5/3 assuming dM/d epsilon is constant across the bound debris. Then simulate: draw 1e5 debris particles with energies uniform in [-Delta epsilon, +Delta epsilon], compute return times for the bound ones from Kepler\'s third law, and histogram them to get Mdot(t). Show the -5/3 tail and compute the peak Eddington ratio for M_BH = 1e6 and 1e7 M_sun with radiative efficiency 0.1.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'ztf-tde-light-curve',
              title: 'Fit a ZTF TDE light curve',
              prompt:
                'Obtain ZTF g and r forced-photometry light curves of a classified TDE (e.g. AT2019dsg or AT2018hyz; use the ZTF forced-photometry service, or published photometry from the discovery papers on arXiv). Fit a blackbody to the colours to get temperature and radius versus time, and fit the post-peak luminosity with a power law L proportional to (t - t_0)^-alpha. Compare alpha with 5/3, and estimate M_BH from t_min. Compare with the host-galaxy M-sigma mass if available.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can black holes above about 1e8 M_sun not produce visible TDEs of Sun-like stars?',
              answerOutline:
                'r_t scales as M^1/3 but r_s as M, so above the Hills mass the tidal radius lies inside the horizon and the star is swallowed whole.',
            },
            {
              question: 'Where does the t^-5/3 law come from?',
              answerOutline:
                'Debris with a flat distribution of specific energy returns on Kepler periods t proportional to |epsilon|^-3/2, so dM/dt = (dM/d epsilon)(d epsilon/dt) proportional to t^-5/3.',
            },
            {
              question: 'Why are TDEs valuable for black-hole demographics?',
              answerOutline:
                'They light up otherwise dormant, low-mass black holes in quiescent galaxies, which are hard to find any other way.',
            },
          ],
        },
      ],
    },
    {
      slug: 'cosmic-rays-and-multimessenger-astronomy',
      title: 'Cosmic Rays and Multimessenger Astronomy',
      description:
        'Messengers beyond light: cosmic rays and their acceleration, high-energy neutrinos, gravitational waves from compact binaries, and the multimessenger landmark GW170817.',
      lessons: [
        {
          slug: 'cosmic-rays-and-particle-acceleration',
          title: 'Cosmic rays and diffusive shock acceleration',
          summary:
            'The cosmic-ray spectrum from GeV to 1e20 eV, Fermi acceleration at shocks and its universal E^-2 spectrum, the Hillas criterion, propagation, and the GZK cut-off.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the cosmic-ray energy spectrum, composition and its knee and ankle features',
            'Derive the power-law spectrum from diffusive shock acceleration and the spectral index 2 for strong shocks',
            'Apply the Hillas criterion to candidate accelerators',
            'Explain cosmic-ray propagation in the Galaxy (B/C ratio), the GZK cut-off and the evidence from gamma rays for acceleration in supernova remnants',
          ],
          concepts: [
            'Cosmic-ray spectrum E^-2.7 to the knee (3e15 eV), E^-3.1 to the ankle (5e18 eV)',
            'Composition and secondary-to-primary ratios (B/C)',
            'Second-order and first-order Fermi acceleration',
            'Diffusive shock acceleration: N(E) proportional to E^-2 for compression ratio 4',
            'Hillas criterion E_max about Z e B R beta',
            'Galactic confinement and escape time',
            'GZK cut-off from photopion production on the CMB',
            'Pion-decay gamma-ray bump in supernova remnants (Fermi-LAT)',
          ],
          explanation: `Cosmic rays are fully ionised nuclei (90% protons, 9% helium, 1% heavier) and electrons arriving at Earth with energies from $10^9$ to beyond $10^{20}$ eV. Their spectrum is a remarkably smooth power law, $dN/dE \\propto E^{-2.7}$ up to the **knee** at $\\sim 3 \\times 10^{15}$ eV, steepening to $E^{-3.1}$ until the **ankle** at $\\sim 5 \\times 10^{18}$ eV, with a suppression above $5 \\times 10^{19}$ eV. Below the knee they are believed to be Galactic; above the ankle extragalactic (the Pierre Auger Observatory found a dipole anisotropy pointing away from the Galactic centre above 8 EeV). The energy density of Galactic cosmic rays, $\\sim 1$ eV cm$^{-3}$, comparable to the magnetic and turbulent energy of the ISM, needs a power of $\\sim 10^{41}$ erg s$^{-1}$, about 10% of the Galactic supernova kinetic power: the energetic argument for supernova remnants as sources.

The mechanism is **diffusive shock acceleration** (first-order Fermi). Particles scattering off magnetic turbulence cross a shock back and forth; each round trip gains a fractional energy $\\Delta E/E \\approx \\tfrac43(u_1 - u_2)/c$, and each cycle carries an escape probability $\\approx 4u_2/c$ downstream. Balancing gain against loss gives a power law

$$ N(E) \\propto E^{-s}, \\qquad s = \\frac{r + 2}{r - 1} = 2 \\text{ for a strong shock } (r = 4), $$

independent of the shock details, which is why power laws are everywhere in high-energy astrophysics. The observed $E^{-2.7}$ results from energy-dependent escape from the Galaxy: the ratio of secondary nuclei (boron, made by spallation) to primaries (carbon) falls as $E^{-0.3}$-$E^{-0.5}$, showing that higher-energy cosmic rays escape faster, after traversing $\\sim 10$ g cm$^{-2}$ in $\\sim 10^7$ yr.

The maximum energy follows from the **Hillas criterion**: a particle must stay confined while being accelerated, so its Larmor radius must be smaller than the accelerator, $E_{max} \\approx Z e B R\\beta$. Supernova remnants with amplified fields reach PeV only marginally; ultra-high-energy cosmic rays need AGN jets, GRBs or cluster shocks. At $\\sim 5 \\times 10^{19}$ eV, protons photoproduce pions on CMB photons and lose energy within $\\sim 50$ Mpc: the **GZK cut-off**, consistent with the observed suppression. Direct evidence of hadronic acceleration came from Fermi-LAT's detection of the characteristic **pion-decay bump** at $\\sim 70$ MeV in the gamma-ray spectra of the remnants IC 443 and W44 (Ackermann et al. 2013). Read the PDG cosmic-ray review and Bell's review of shock acceleration; the exercises use Auger open data and Fermi-LAT.`,
          resources: [
            {
              title: 'Particle Data Group — Reviews (Cosmic Rays)',
              url: 'https://pdg.lbl.gov/',
              type: 'article',
              cost: 'free',
              provider: 'PDG',
              note: 'The "Cosmic rays" review with the all-particle spectrum figure and composition data.',
              primary: true,
            },
            {
              title: 'Bell (2013), Particle acceleration by shocks in supernova remnants',
              url: 'https://arxiv.org/abs/1311.5779',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Review of diffusive shock acceleration and cosmic-ray-driven magnetic-field amplification by its originator.',
            },
            {
              title: 'Pierre Auger Observatory open data',
              url: 'https://opendata.auger.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'Pierre Auger Collaboration',
              note: 'About 10% of the events with energies and arrival directions, plus analysis notebooks.',
            },
            {
              title: 'Ackermann et al. (2013), Detection of the characteristic pion-decay signature in supernova remnants',
              url: 'https://arxiv.org/abs/1302.3307',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
          ],
          exercises: [
            {
              slug: 'dsa-spectrum',
              title: 'Derive and simulate diffusive shock acceleration',
              prompt:
                'Derive the mean fractional energy gain per crossing cycle and the escape probability for a non-relativistic shock, and hence the spectral index s = (r + 2)/(r - 1). Then write a Monte Carlo: particles start at the shock with energy E_0, gain (4/3)(u_1 - u_2)/c per cycle and escape with probability 4 u_2 / c. Histogram the final energies for compression ratios r = 4, 3 and 2 and confirm the predicted slopes.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'hillas-plot',
              title: 'Make a Hillas plot',
              prompt:
                'For neutron stars (B = 1e12 G, R = 10 km), white dwarfs, supernova remnants (B = 100 microgauss, R = 5 pc, beta = 0.03), AGN cores and jets, radio-galaxy lobes, GRB fireballs (relativistic correction), galaxy clusters and the Galactic disk, estimate B and R and plot log B against log R with lines of E_max = 1e15, 1e18 and 1e20 eV for protons (beta = 1). Identify plausible accelerators of ultra-high-energy cosmic rays and explain why relativistic shocks change the estimate.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'auger-spectrum',
              title: 'The cosmic-ray spectrum from Auger open data',
              prompt:
                'Download the Pierre Auger open-data event list (energies and arrival directions for the surface-detector events above 2.5 EeV). Build the energy spectrum with exposure correction as described in the open-data documentation, plot E^3 J(E), and fit a broken power law to locate the ankle and the suppression. Make a sky map of the arrival directions of events above 8 EeV in equatorial coordinates with healpy and estimate the dipole amplitude.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does diffusive shock acceleration produce E^-2 for strong shocks?',
              answerOutline:
                'The fractional energy gain per cycle and escape probability per cycle are both proportional to the shock speed; their ratio depends only on the compression ratio, giving s = (r + 2)/(r - 1) = 2 for r = 4.',
            },
            {
              question: 'Why is the observed Galactic cosmic-ray spectrum steeper than the source spectrum?',
              answerOutline:
                'Energy-dependent escape: higher-energy particles diffuse out of the Galaxy faster (B/C ratio decreases with energy), steepening the equilibrium spectrum from about E^-2.2 to E^-2.7.',
            },
            {
              question: 'What is the GZK cut-off?',
              answerOutline:
                'Above about 5e19 eV, protons interact with CMB photons via the Delta resonance (photopion production), losing energy within about 50 Mpc and suppressing the flux from distant sources.',
            },
          ],
        },
        {
          slug: 'high-energy-neutrino-astronomy',
          title: 'High-energy neutrino astronomy',
          summary:
            'Why neutrinos trace hadronic accelerators, how IceCube detects them, the diffuse astrophysical flux, TXS 0506+056 and NGC 1068, and the Galactic-plane neutrinos.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why high-energy neutrinos are unambiguous tracers of hadronic cosmic-ray acceleration',
            'Describe the IceCube detector, event topologies (tracks, cascades) and atmospheric backgrounds',
            'Summarise the evidence for astrophysical neutrinos: the diffuse flux, TXS 0506+056, NGC 1068 and the Galactic plane',
            'Perform a simple point-source search on IceCube public data',
          ],
          concepts: [
            'Pion production p + p and p + gamma; neutrino and gamma-ray connection',
            'Flavour ratio 1:1:1 at Earth after oscillations',
            'IceCube: 1 km^3 of Antarctic ice, Cherenkov light',
            'Tracks (muon neutrinos, good angular resolution) vs cascades',
            'Atmospheric muon and neutrino backgrounds',
            'Diffuse astrophysical flux discovered 2013',
            'TXS 0506+056 flare coincidence (2017) and NGC 1068 (2022)',
            'Unbinned likelihood point-source searches',
          ],
          explanation: `Cosmic rays are charged and bent by magnetic fields, so their arrival directions do not point back to their sources (except perhaps at the highest energies). Gamma rays point back but can be made by electrons via inverse Compton as well as by protons. **Neutrinos** are unambiguous: they are produced only when accelerated hadrons collide with gas or photons, making charged pions that decay as $\\pi^+ \\to \\mu^+\\nu_\\mu \\to e^+\\nu_e\\bar\\nu_\\mu\\nu_\\mu$. Each neutrino carries about 5% of the parent proton's energy, so PeV neutrinos imply 20 PeV protons. They travel unabsorbed across the Universe and undeflected, and after oscillations arrive with flavours near $1:1:1$. Neutral pions produced alongside give gamma rays of comparable power, a multimessenger link that also means sources opaque to gamma rays may be the brightest neutrino emitters.

Neutrinos interact so weakly that a cubic kilometre of detector is needed. **IceCube** instruments a cubic kilometre of Antarctic ice with 5160 optical modules recording Cherenkov light from secondary charged particles. Muon neutrinos make long **tracks** with sub-degree pointing; electron and tau neutrinos and neutral-current events make roughly spherical **cascades** with good energy resolution but 10-degree pointing. The backgrounds are atmospheric muons (rejected by using the Earth as a shield or by vetoing events starting outside the detector) and atmospheric neutrinos (softer spectrum, falling as $E^{-3.7}$), above which an astrophysical $E^{-2.5}$ component emerges.

The milestones came quickly. In 2013 IceCube reported a **diffuse astrophysical flux** of PeV events (nicknamed Bert and Ernie, then Big Bird). In 2017 a 290 TeV track alert, IceCube-170922A, coincided with a gamma-ray flare of the blazar **TXS 0506+056** detected by Fermi-LAT and MAGIC, and archival data showed a neutrino excess from the same source in 2014-15. In 2022 an excess of TeV neutrinos from the Seyfert galaxy **NGC 1068**, which is faint in GeV gamma rays, pointed to obscured coronae as neutrino factories, and in 2023 neutrinos from the **Galactic plane** were detected, consistent with cosmic-ray interactions in the ISM. Point-source searches use an unbinned likelihood comparing a signal PDF (a Gaussian around the source with the event's angular error) against a background PDF from the data. Read the Halzen review and the IceCube data-release pages; the exercise performs a search on the public 10-year track sample.`,
          resources: [
            {
              title: 'IceCube public data releases',
              url: 'https://icecube.wisc.edu/science/data-releases/',
              type: 'dataset',
              cost: 'free',
              provider: 'IceCube Collaboration',
              note: 'The 10-year point-source track sample with effective areas and instrument responses.',
              primary: true,
            },
            {
              title: 'IceCube Collaboration (2018), Multimessenger observations of a flaring blazar coincident with high-energy neutrino IceCube-170922A',
              url: 'https://arxiv.org/abs/1807.08816',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'IceCube Collaboration (2022), Evidence for neutrino emission from the nearby active galaxy NGC 1068',
              url: 'https://arxiv.org/abs/2211.09972',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Halzen & Klein (2010), IceCube: an instrument for neutrino astronomy',
              url: 'https://arxiv.org/abs/1007.1247',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Detector principles and science goals.',
            },
          ],
          exercises: [
            {
              slug: 'neutrino-gamma-connection',
              title: 'The neutrino-gamma connection',
              prompt:
                'For p + p interactions, roughly one-third of the energy goes to neutral pions (gamma rays) and two-thirds to charged pions; derive the approximate relation E^2 dN_nu/dE (all flavours) about (3/2) E^2 dN_gamma/dE at E_nu about E_gamma / 2. Apply it to the Fermi-LAT flux of TXS 0506+056 during the 2017 flare to predict the neutrino flux and the expected number of IceCube events using a constant effective area of 10 m^2 at 100 TeV over the flare duration. Compare with the single observed event.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'icecube-point-source-search',
              title: 'Point-source search in IceCube public data',
              prompt:
                'Download the IceCube 10-year point-source event sample. Implement an unbinned likelihood L = product over events of [n_s/N S_i + (1 - n_s/N) B_i] with S_i a 2D Gaussian of the event angular error around the source and B_i the declination-dependent background density from the data. Maximise over n_s for NGC 1068 and TXS 0506+056 and compute the test statistic. Estimate significance by scrambling right ascensions 1000 times. Compare with the published results.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Restrict to events within 10 degrees of the source and to the declination band for the background PDF to keep the computation fast.',
            },
            {
              slug: 'neutrino-energetics',
              title: 'What do PeV neutrinos imply?',
              prompt:
                'IceCube\'s diffuse flux is about E^2 Phi = 1e-8 GeV cm^-2 s^-1 sr^-1 (all flavours) at 100 TeV. Convert to an energy density production rate and compare with the energy budget of ultra-high-energy cosmic rays (the Waxman-Bahcall bound) and with the extragalactic gamma-ray background measured by Fermi. Discuss why the comparison suggests that many neutrino sources must be gamma-ray dark.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do high-energy neutrinos uniquely identify hadronic accelerators?',
              answerOutline:
                'They are produced only by decays of charged pions from proton/nucleus interactions; leptonic processes do not produce them, and they travel undeflected and unabsorbed.',
            },
            {
              question: 'What is the difference between track and cascade events in IceCube?',
              answerOutline:
                'Tracks come from muons (charged-current nu_mu) and point to within about a degree; cascades come from nu_e, nu_tau and neutral currents, with good energy but poor direction.',
            },
            {
              question: 'What made TXS 0506+056 the first neutrino source candidate?',
              answerOutline:
                'A 290 TeV neutrino in 2017 coincided in time and direction with a gamma-ray flare of the blazar, and archival IceCube data showed a further neutrino excess in 2014-15.',
            },
          ],
        },
        {
          slug: 'gravitational-wave-astronomy',
          title: 'Gravitational-wave astronomy with LIGO, Virgo and KAGRA',
          summary:
            'Gravitational waves from compact binaries, interferometric detection, matched filtering on real GWOSC strain data, chirp masses, and the population of merging black holes.',
          estimatedMinutes: 120,
          objectives: [
            'Derive the chirp mass from the frequency evolution of an inspiral and estimate strain amplitudes',
            'Explain how an interferometer measures strain and what limits its sensitivity',
            'Whiten and band-pass real GWOSC strain data and recover GW150914 by matched filtering',
            'Describe the GWTC population results: masses, spins, rates and the pair-instability gap',
          ],
          concepts: [
            'Quadrupole formula and strain h about (G/c^4) (M_c)^(5/3) (pi f)^(2/3) / D',
            'Chirp mass M_c = (m_1 m_2)^(3/5) / (m_1 + m_2)^(1/5)',
            'Frequency evolution f-dot proportional to M_c^(5/3) f^(11/3)',
            'Inspiral, merger, ringdown',
            'Michelson interferometer with Fabry-Perot arms; strain sensitivity 1e-23',
            'Noise PSD, whitening, matched filtering, SNR',
            'Parameter estimation: masses, spins, distance, sky location',
            'GWTC-3 population: mass gap, pair-instability gap, effective spin, merger rates',
          ],
          explanation: `A pair of compact objects in orbit radiates gravitational waves at twice the orbital frequency. The quadrupole formula gives the strain amplitude at distance $D$,

$$ h \\approx \\frac{4}{D}\\left(\\frac{G\\mathcal{M}_c}{c^2}\\right)^{5/3}\\left(\\frac{\\pi f}{c}\\right)^{2/3}, $$

and the energy loss drives an inspiral whose frequency rises as $\\dot f = (96/5)\\pi^{8/3}(G\\mathcal{M}_c/c^3)^{5/3}f^{11/3}$. Both depend on a single combination, the **chirp mass** $\\mathcal{M}_c = (m_1m_2)^{3/5}/(m_1 + m_2)^{1/5}$, which is therefore the best-measured parameter: you can read it from a time-frequency plot of the "chirp" with a ruler. Higher-order post-Newtonian terms give the mass ratio and spins; the **merger** and **ringdown** (the remnant black hole settling via quasi-normal modes) are computed with numerical relativity. For GW150914 ($36 + 29\\,M_\\odot$ at 410 Mpc), the peak strain was $10^{-21}$ and $3\\,M_\\odot c^2$ was radiated in 0.2 s, a peak power exceeding all the stars in the observable Universe.

A strain of $10^{-21}$ changes the 4 km LIGO arms by $4 \\times 10^{-18}$ m, a few thousandths of a proton radius. LIGO measures it with a Michelson interferometer whose arms are Fabry-Perot cavities (light bounces ~300 times) with power recycling and squeezed light. Sensitivity is limited by seismic noise below $\\sim 10$ Hz, thermal noise in the mirrors and suspensions at tens of Hz, and quantum shot noise above $\\sim 200$ Hz, giving a best strain sensitivity of a few $\\times 10^{-24}$ Hz$^{-1/2}$ near 100 Hz.

Signals are buried in noise, so detection uses **matched filtering**: correlate the data with a bank of template waveforms, weighting by the inverse noise power spectral density (equivalent to **whitening** the data). The optimal signal-to-noise ratio is $\\rho^2 = 4\\int|\\tilde h(f)|^2/S_n(f)\\,df$. Coincidence between detectors and time-slide backgrounds give false-alarm rates. Bayesian **parameter estimation** (bilby, with stochastic samplers) then yields posteriors on masses, spins, distance and sky position. All this can be done on GWOSC public data with GWpy and PyCBC on a laptop, which is the core exercise of this lesson.

The catalogues (GWTC-1 to 3, about 90 events through O3) reveal a population of black holes from 5 to 100 $M_\\odot$ with a peak near $35\\,M_\\odot$, generally small effective spins, merger rates of 17-45 Gpc$^{-3}$ yr$^{-1}$, a few objects in the predicted **pair-instability gap** (GW190521) that may be hierarchical mergers, and objects in the 2.5-5 $M_\\odot$ lower gap (GW190814). Read the GW150914 discovery paper and the GWOSC tutorials, then work through the exercises.`,
          resources: [
            {
              title: 'Gravitational Wave Open Science Center (GWOSC)',
              url: 'https://gwosc.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'LIGO-Virgo-KAGRA',
              note: 'Strain data for all events and full observing runs, event catalogues and parameter tables.',
              primary: true,
            },
            {
              title: 'GWOSC tutorials and Open Data Workshop materials',
              url: 'https://gwosc.org/tutorials/',
              type: 'interactive',
              cost: 'free',
              provider: 'LIGO-Virgo-KAGRA',
              note: 'Jupyter notebooks for data access, whitening, matched filtering and parameter estimation.',
            },
            {
              title: 'GWpy documentation',
              url: 'https://gwpy.github.io/',
              type: 'tool',
              cost: 'free',
              provider: 'LIGO',
            },
            {
              title: 'PyCBC',
              url: 'https://pycbc.org/',
              type: 'tool',
              cost: 'free',
              provider: 'PyCBC team',
              note: 'Waveform generation and matched-filter search tools.',
            },
            {
              title: 'Abbott et al. (2016), Observation of gravitational waves from a binary black hole merger',
              url: 'https://arxiv.org/abs/1602.03837',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
          ],
          exercises: [
            {
              slug: 'chirp-mass-by-eye',
              title: 'Chirp mass from the frequency evolution',
              prompt:
                'Integrate f-dot = (96/5) pi^(8/3) (G M_c / c^3)^(5/3) f^(11/3) to get f(t) and the time to coalescence from 35 Hz. Using the GW150914 Q-transform from GWpy (or the published figure), read off two (t, f) points during the chirp and solve for M_c. Compare with the published 28.6 M_sun (detector frame about 30). Then compute the time spent above 10 Hz for a binary neutron star (1.4 + 1.4) and a 10 + 10 M_sun binary black hole.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'matched-filter-gw150914',
              title: 'Recover GW150914 by matched filtering',
              prompt:
                'With GWpy, fetch 32 s of H1 and L1 strain around GPS 1126259462.4 from GWOSC. Estimate the PSD with Welch\'s method, whiten, band-pass 35-350 Hz and plot both detectors, shifting L1 by 7 ms and inverting its sign. Using PyCBC, generate an IMRPhenomD template with m_1 = 36, m_2 = 29 M_sun and compute the matched-filter SNR time series for each detector. Report the peak SNRs (expect about 20 and 13) and the arrival-time difference. Then scan a small grid of masses and find which maximises the network SNR.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'gwtc-population',
              title: 'The black-hole mass distribution from GWTC',
              prompt:
                'Download the GWTC-3 confident-event parameter table via the GWOSC event API. Plot m_1 against m_2 (source frame) with error bars, the chirp-mass histogram and the effective-spin distribution. Mark the predicted pair-instability gap (about 50-130 M_sun) and the lower mass gap (2.5-5 M_sun) and identify the events within them. Discuss selection effects (detectable volume scales as M_c^(5/2)) and correct the chirp-mass histogram by weighting each event by M_c^(-5/2).',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the chirp mass the best-measured parameter of an inspiral?',
              answerOutline:
                'Both the amplitude and, at leading order, the frequency evolution (f-dot proportional to M_c^5/3 f^11/3) depend only on M_c, so the phase evolution over many cycles pins it down precisely.',
            },
            {
              question: 'Why does matched filtering use a noise-weighted inner product?',
              answerOutline:
                'Detector noise is coloured; weighting by 1/S_n(f) (whitening) emphasises frequencies where the detector is most sensitive and gives the optimal SNR for Gaussian noise.',
            },
            {
              question: 'What is the pair-instability mass gap and why is GW190521 interesting?',
              answerOutline:
                'Stars with helium cores of about 65-130 M_sun undergo pair-instability supernovae leaving no remnant, so black holes of about 50-130 M_sun should not form from single stars; GW190521\'s components lie in the gap, suggesting hierarchical mergers or other channels.',
            },
          ],
          relatedLessons: ['relativity/gravitational-waves-and-cosmological-solutions/analysing-ligo-data'],
        },
        {
          slug: 'gw170817-and-multimessenger-astronomy',
          title: 'GW170817 and the multimessenger era',
          summary:
            'The binary neutron-star merger seen in gravitational waves, gamma rays and across the spectrum: the kilonova and r-process, the speed of gravity, the standard-siren Hubble constant, and the future.',
          estimatedMinutes: 110,
          objectives: [
            'Reconstruct the timeline of GW170817 and its electromagnetic counterparts',
            'Explain the kilonova: r-process nucleosynthesis, lanthanide opacity and red/blue components',
            'Derive the bound on the speed of gravity from the 1.7 s GW-GRB delay',
            'Compute the standard-siren Hubble constant and explain its degeneracy with inclination',
          ],
          concepts: [
            'GW170817: chirp mass 1.186 M_sun, 40 Mpc, localised to 28 deg^2',
            'GRB 170817A 1.7 s after merger; off-axis structured jet',
            'Kilonova AT 2017gfo in NGC 4993: blue then red',
            'r-process nucleosynthesis and lanthanide opacity',
            'Late X-ray and radio afterglow; superluminal motion of the jet',
            'Speed-of-gravity constraint |v_gw - c|/c < 1e-15',
            'Standard sirens: H_0 = 70 +12/-8',
            'Future: O4/O5, Einstein Telescope, Cosmic Explorer, LISA',
          ],
          explanation: `On 17 August 2017 the LIGO detectors recorded a 100-second inspiral of chirp mass $1.186\\,M_\\odot$: two neutron stars of total mass $\\sim 2.7\\,M_\\odot$. **1.7 seconds** after the merger, Fermi GBM and INTEGRAL detected a weak short gamma-ray burst, **GRB 170817A**. The three-detector GW localisation (Virgo's non-detection was itself informative) confined the source to 28 deg$^2$ at $40 \\pm 8$ Mpc, and within 11 hours the Swope telescope found an optical transient, **AT 2017gfo**, in the galaxy NGC 4993. Some 70 observatories followed it from radio to gamma rays: the birth of multimessenger astronomy with gravitational waves.

The optical/infrared transient was a **kilonova**, powered by the radioactive decay of freshly synthesised heavy nuclei. In the neutron-rich ejecta ($\\sim 0.05\\,M_\\odot$ at 0.1-0.3$c$), rapid neutron capture (the **r-process**) builds elements up to uranium. Ejecta containing **lanthanides**, whose dense forest of f-shell transitions gives huge opacities, produce a slow, red, infrared-peaked component; lanthanide-poor polar ejecta (exposed to neutrinos from a short-lived remnant) produce a fast blue component. AT 2017gfo evolved from blue to red over a week exactly as predicted, and spectra showed broad features attributed to strontium. Neutron-star mergers are therefore a major, perhaps dominant, site of the r-process: the origin of the Universe's gold.

The gamma-ray burst was $10^4$ times fainter than typical short GRBs, and X-ray and radio afterglows rose for 150 days. VLBI imaging showed the radio centroid moving superluminally at $4c$: a narrow relativistic **structured jet** viewed $\\sim 20^\\circ$ off axis, confirming that short GRBs come from mergers. The 1.7 s delay over 40 Mpc ($\\sim 4 \\times 10^{15}$ s of travel) bounds the difference between the speeds of gravity and light to $-3 \\times 10^{-15} < \\Delta v/c < 7 \\times 10^{-16}$, eliminating at a stroke a large class of modified-gravity models of dark energy.

Finally, GW170817 was the first **standard siren**: the GW amplitude gives the luminosity distance directly from GR, with no distance ladder, while the host galaxy gives the redshift. The result, $H_0 = 70^{+12}_{-8}$ km s$^{-1}$ Mpc$^{-1}$, is limited by the degeneracy between distance and inclination; the jet's inclination from VLBI tightens it. About 50 such events would resolve the Hubble tension. Read the multimessenger paper and the H_0 paper, then download GW170817 strain from GWOSC for the exercises; the capstone can extend this.`,
          resources: [
            {
              title: 'Abbott et al. (2017), Multi-messenger observations of a binary neutron star merger',
              url: 'https://arxiv.org/abs/1710.05833',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The timeline paper with figure 2 summarising every observation.',
              primary: true,
            },
            {
              title: 'Abbott et al. (2017), A gravitational-wave standard siren measurement of the Hubble constant',
              url: 'https://arxiv.org/abs/1710.05835',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Metzger (2019), Kilonovae',
              url: 'https://arxiv.org/abs/1910.01617',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Living Reviews in Relativity; the physics of r-process transients.',
            },
            {
              title: 'Gravitational Wave Open Science Center (GWOSC)',
              url: 'https://gwosc.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'LIGO-Virgo-KAGRA',
              note: 'GW170817 strain data (with the glitch-subtracted L1 frame).',
            },
            {
              title: 'bilby — Bayesian inference library for gravitational-wave astronomy',
              url: 'https://lscsoft.docs.ligo.org/bilby/',
              type: 'tool',
              cost: 'free',
              provider: 'LIGO-Virgo-KAGRA',
            },
          ],
          exercises: [
            {
              slug: 'speed-of-gravity',
              title: 'Bound the speed of gravity',
              prompt:
                'Using the 1.74 s delay between merger and GRB onset, a conservative distance of 26 Mpc (lower 90% bound), and an assumed intrinsic emission delay between 0 and 10 s, derive the bounds on (v_gw - c)/c. Explain why theories in which v_gw differs from c (e.g. some Horndeski and beyond-Horndeski scalar-tensor theories) were ruled out as explanations of dark energy.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'standard-siren-h0',
              title: 'A standard-siren H_0',
              prompt:
                'Using the GWOSC posterior samples for GW170817 (luminosity distance and inclination), combine with the Hubble-flow velocity of NGC 4993 (3017 +/- 166 km/s after peculiar-velocity correction) to compute the H_0 posterior with a uniform-in-volume distance prior. Report the median and 68% interval. Then impose the inclination constraint from the VLBI jet (theta about 15-25 degrees) and show how much the interval shrinks. Estimate how many similar events would reach 2% precision.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'kilonova-model',
              title: 'A one-zone kilonova light curve',
              prompt:
                'Implement the Arnett-like one-zone model with r-process heating epsilon(t) = 1e10 (t / 1 day)^-1.3 erg/g/s, ejecta mass M, velocity v and grey opacity kappa: diffusion time t_d = sqrt(kappa M / (4 pi v c)), and L(t) from the Arnett integral. Compute light curves for (M, v, kappa) = (0.02, 0.3c, 1) blue and (0.04, 0.1c, 10) red, and the blackbody temperature evolution. Compare peak times and luminosities with AT 2017gfo (blue peak about 1 day, 1e42 erg/s; red peak about a week in the infrared).',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What powers a kilonova and why is it red?',
              answerOutline:
                'Radioactive decay of r-process nuclei; lanthanide-rich ejecta have enormous opacity, delaying and reddening the emission into the infrared.',
            },
            {
              question: 'How did GW170817 constrain the speed of gravity?',
              answerOutline:
                'Gamma rays arrived 1.7 s after the merger after travelling about 40 Mpc, so the speeds differ by less than about 1e-15 fractionally.',
            },
            {
              question: 'Why is a standard siren independent of the distance ladder, and what limits its precision?',
              answerOutline:
                'The GW amplitude and phase evolution give luminosity distance directly from GR; precision is limited by the distance-inclination degeneracy and detector noise.',
            },
          ],
        },
      ],
      project: {
        slug: 'multimessenger-event-analysis',
        title: 'Module project: a multimessenger event reconstruction',
        description:
          'Reconstruct GW170817 from public data: matched-filter the GWOSC strain to recover the signal and chirp mass, run a fast bilby parameter estimation (with the sky position fixed to NGC 4993), fit the Fermi GBM light curve of GRB 170817A, model the kilonova light curve from published photometry, and combine distance and redshift into an H_0 posterior.',
        deliverables: [
          'Notebook with GW data processing, SNR time series and bilby posteriors',
          'GRB light curve and spectral fit from GBM data',
          'Kilonova model fit to published photometry and an H_0 posterior plot',
          'A short synthesis report on what each messenger contributed',
        ],
        estimatedHours: 16,
      },
    },
  ],
  capstone: {
    slug: 'real-data-high-energy-analysis',
    title: 'Capstone: analyse a real X-ray or gravitational-wave dataset and interpret it physically',
    description: `Choose one of two tracks and carry it from raw public data to a physical interpretation written up as a short paper.

X-ray track. Select a black-hole X-ray binary outburst or a Seyfert galaxy with deep XMM-Newton, NuSTAR or NICER observations in HEASARC. Reduce the data from the archived event files (filtering, source and background extraction, response generation), fit physically motivated models (absorbed multicolour disk plus thermal Comptonisation, a relativistic reflection component or Fe K line), compute the power spectrum and any QPOs, and derive physical quantities: Eddington ratio, inner disk radius, coronal temperature and optical depth, and where possible black-hole spin, with full uncertainties. Interpret the source's accretion state and geometry.

Gravitational-wave track. Download LIGO-Virgo strain data for a binary black-hole event (GW150914 or a GWTC-3 event) and for GW170817 from GWOSC. Whiten and band-pass the data, build a matched-filter search with PyCBC templates, recover the signal-to-noise ratio and chirp mass, then run parameter estimation with bilby to obtain component masses, effective spin, distance and sky location. For GW170817 combine the GW distance with the host-galaxy redshift to measure H_0 as a standard siren, and discuss the multimessenger context (GRB 170817A, the kilonova).`,
    deliverables: [
      'A reproducible repository with data-download scripts and analysis notebooks',
      'For the X-ray track: reduced spectra, model fits with residuals, power spectra, and a table of derived physical parameters',
      'For the GW track: whitened strain and spectrograms, matched-filter SNR time series, posterior corner plots and an H_0 posterior',
      'A 6-10 page paper-style report with methods, results, uncertainties and a physical interpretation',
    ],
    estimatedHours: 45,
    stretchGoals: [
      'X-ray track: fit a relativistic reflection model (relxill) and compare the spin with the continuum-fitting estimate',
      'GW track: test general relativity with a ringdown analysis of the remnant black hole (quasi-normal mode frequency and damping time)',
      'Do both tracks and compare the black-hole mass and spin distributions from X-ray binaries and gravitational waves',
    ],
  },
  masteryChecklist: [
    'I can derive and apply synchrotron, inverse-Compton and bremsstrahlung spectra and identify them in real data',
    'I can reduce and fit real X-ray spectra with correct statistics, responses and absorption, and quote meaningful uncertainties',
    'I can explain accretion efficiency, the Eddington limit and thin-disk spectra, and classify accretion states in X-ray binaries',
    'I can derive pulsar properties from P and Pdot, explain pulsar timing tests of GR and the pulsar-timing-array detection',
    'I can explain how neutron-star masses, radii and tidal deformabilities constrain the dense-matter equation of state',
    'I can describe black-hole observables (ISCO, shadow, reflection, QPOs), AGN unification and relativistic jets with beaming',
    'I can explain supernova remnants, gamma-ray bursts, fast radio bursts and tidal disruptions physically and estimate their energetics',
    'I can explain diffusive shock acceleration, cosmic-ray spectra and neutrino astronomy',
    'I can analyse public LIGO-Virgo strain data with matched filtering and parameter estimation and interpret GW170817 as a multimessenger event',
  ],
});
