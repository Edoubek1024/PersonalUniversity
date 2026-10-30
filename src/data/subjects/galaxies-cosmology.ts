import { defineSubject } from '../define';

export default defineSubject({
  id: 'galaxies-cosmology',
  title: 'Galaxies and Cosmology',
  category: 'astronomy',
  tagline:
    'From the Milky Way to the cosmic microwave background: the structure, dynamics and formation of galaxies and the physics of the expanding Universe.',
  description: `Galaxies are the units in which the Universe organises its stars, gas and dark matter, and cosmology is the study of the Universe as a single physical system with a history. The two subjects are inseparable: galaxies form inside dark-matter halos whose growth is set by the cosmological model, and almost everything we know about that model comes from observing galaxies, clusters, supernovae and the light left over from the hot early Universe.

This curriculum starts at home with the Milky Way, where Gaia lets you measure a galaxy from the inside, then builds the dynamics needed to understand galaxies as gravitational systems and the evidence that most of their mass is dark. The middle modules treat how galaxies form and evolve inside the growing cosmic web. The last three modules are cosmology proper: the Friedmann equations, distances and the Hubble constant; the thermal history, nucleosynthesis and the cosmic microwave background; and the large-scale structure and dark energy that define the present concordance model and its open tensions.

Throughout, you work with real data: Gaia DR3 kinematics, SDSS galaxy spectra and redshifts, the SPARC rotation-curve database, Pantheon+ supernovae, the Planck power spectrum and public N-body outputs. The free backbone texts are Ned Wright's tutorial, David Tong's and Daniel Baumann's cosmology lecture notes, Jo Bovy's online galactic-dynamics book and MIT OCW 8.902 and 8.286, supplemented by review articles on arXiv. The capstone has you measure the Hubble constant and fit a cosmological model from scratch.`,
  difficulty: 'advanced',
  estimatedHours: 90,
  prerequisites: ['stellar-astrophysics', 'relativity'],
  recommendedBackground: [
    'Comfort with astropy (units, coordinates, cosmology) and SQL queries to SDSS and Gaia',
    'Bayesian parameter estimation and MCMC (emcee) at a practical level',
    'The FRW metric and geodesics from the relativity track',
  ],
  tags: ['galaxies', 'cosmology', 'dark matter', 'CMB', 'large-scale structure', 'Gaia', 'SDSS', 'Planck'],
  core: true,
  modules: [
    {
      slug: 'the-milky-way',
      title: 'The Milky Way',
      description:
        'Our own galaxy as a laboratory: its components, the rotation curve from Gaia, the supermassive black hole at the centre, and the fossil record in the stellar halo.',
      lessons: [
        {
          slug: 'galactic-structure-and-components',
          title: 'The structure of the Milky Way',
          summary:
            'Thin and thick disks, bulge and bar, stellar halo, gas and dust, and dark halo: what each component is, how we know, and how to map it with Galactic coordinates.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the main components of the Milky Way with their masses, scale lengths and stellar populations',
            'Convert between equatorial and Galactic coordinates and explain the Sun\'s position and motion',
            'Explain how dust extinction shapes what we can see of the Galaxy and how infrared surveys circumvent it',
            'Produce an all-sky map of Gaia star counts in Galactic coordinates',
          ],
          concepts: [
            'Galactic coordinates (l, b); the Sun at R_0 about 8.2 kpc',
            'Thin disk (scale length 2.6 kpc, height 300 pc) and thick disk',
            'Bulge and bar; the peanut-shaped boxy bulge',
            'Stellar halo and globular clusters',
            'Interstellar medium: HI, H2, HII, dust',
            'Zone of avoidance and extinction',
            'Total mass about 1e12 solar masses, mostly dark',
            'Local Standard of Rest and solar peculiar motion',
          ],
          explanation: `The Milky Way is a barred spiral of total mass about $10^{12}\\,M_\\odot$, of which stars contribute $\\sim 6 \\times 10^{10}\\,M_\\odot$ and gas $\\sim 10^{10}\\,M_\\odot$; the rest is dark. Its visible components are a **thin disk** of young and intermediate-age stars with an exponential surface density $\\Sigma \\propto e^{-R/R_d}$ ($R_d \\approx 2.6$ kpc) and scale height 300 pc; a **thick disk** of older, alpha-enhanced stars with scale height about 1 kpc; a **bar and boxy bulge** of $\\sim 10^{10}\\,M_\\odot$ inside 3 kpc; and a diffuse **stellar halo** of only $\\sim 10^9\\,M_\\odot$ of old metal-poor stars and globular clusters extending beyond 100 kpc. The Sun sits in the thin disk at $R_0 \\approx 8.2$ kpc from the centre (measured directly by the orbits of stars around Sgr A*), about 20 pc above the midplane, orbiting at $\\Theta_0 \\approx 235$ km s$^{-1}$.

Mapping all this is hard because we are inside it. **Galactic coordinates** $(l, b)$ put the centre at $l = 0$ and the plane at $b = 0$; astropy's \`SkyCoord\` converts from RA and Dec. Dust in the disk extinguishes visible light by tens of magnitudes toward the centre, creating the **zone of avoidance** where external galaxies seem absent; infrared surveys (2MASS, Spitzer GLIMPSE, WISE) and radio 21 cm maps of HI see through it, and Gaia's optical census is confined to a few kiloparsecs in the plane but reaches the halo at high latitude.

The reference frame for kinematics is the **Local Standard of Rest**, a fictitious point on a circular orbit at the Sun's position; the Sun's peculiar velocity relative to it is $(U, V, W) \\approx (11, 12, 7)$ km s$^{-1}$. Every rotation-curve and halo-kinematics measurement in this module depends on these solar parameters, so learn their values and uncertainties.

Read OpenStax chapter 25 for the descriptive overview and the Bland-Hawthorn & Gerhard review for the current numbers; the exercise builds your own Gaia star-count map, which reveals the disk, bulge, extinction lanes and the Magellanic Clouds in one figure.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 25.1 The Architecture of the Galaxy',
              url: 'https://openstax.org/books/astronomy-2e/pages/25-1-the-architecture-of-the-galaxy',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Read all of chapter 25 for the descriptive picture.',
            },
            {
              title: 'Bland-Hawthorn & Gerhard (2016), The Galaxy in context: structural, kinematic and integrated properties',
              url: 'https://arxiv.org/abs/1602.07702',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; the standard compilation of Milky Way parameters (tables 1-8).',
              primary: true,
            },
            {
              title: 'Gaia Archive (ESA)',
              url: 'https://gea.esac.esa.int/archive/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
              note: 'Use the gaiadr3.gaia_source table; HEALPix-indexed source_id makes all-sky counting easy.',
            },
            {
              title: 'Bovy — Dynamics and Astrophysics of Galaxies (online book)',
              url: 'https://galaxiesbook.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Toronto',
              note: 'Chapters on the Milky Way components and coordinate systems; used throughout modules 1-2.',
            },
          ],
          exercises: [
            {
              slug: 'gaia-all-sky-map',
              title: 'An all-sky Gaia star-count map',
              prompt:
                'Query the Gaia archive for star counts per HEALPix level-6 pixel (source_id / 2^35 / 4^(12-6) as the pixel index, GROUP BY) for all sources and separately for sources with G < 15. Plot both with healpy in Galactic coordinates (Mollweide). Identify the disk, bulge, dust lanes, the Magellanic Clouds, and the scanning-law pattern. Explain why the bright-star map and the all-source map look different.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Gaia source_id encodes a level-12 HEALPix index in its most significant bits; integer division gives coarser levels.',
            },
            {
              slug: 'coordinate-transformations',
              title: 'Coordinates and the solar motion',
              prompt:
                'Using astropy.coordinates, convert the positions of Sgr A* (RA 17h45m40s, Dec -29d00m28s), the Galactic north pole, and the LMC to Galactic coordinates. Then take 1000 Gaia stars within 100 pc with radial velocities, transform their velocities into (U, V, W) with the Galactocentric frame, and estimate the solar motion relative to them. Compare with (11, 12, 7) km/s and explain why the V component is biased (asymmetric drift).',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'component-mass-budget',
              title: 'A mass budget for the Galaxy',
              prompt:
                'Using the exponential disk with Sigma_0 = 800 M_sun/pc^2 (stars + gas) and R_d = 2.6 kpc, integrate the total disk mass. Add the bulge (1.5e10) and halo stars (1e9). Compare with the total mass inside 20 kpc from the rotation curve, M = v^2 R / G with v = 220 km/s, and compute the dark-matter fraction inside 20 kpc. Then explain why the fraction inside the solar circle is lower.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'List the main stellar components of the Milky Way and one distinguishing property of each.',
              answerOutline:
                'Thin disk (young, metal-rich, scale height 300 pc), thick disk (older, alpha-enhanced, 1 kpc), bar/bulge (old, metal-rich, central 3 kpc), stellar halo (old, metal-poor, diffuse, globular clusters).',
            },
            {
              question: 'How is the distance to the Galactic centre measured directly?',
              answerOutline:
                'From the orbits of stars around Sgr A*: combining the angular orbit and radial velocities (and the GRAVITY interferometer) gives a geometric distance of about 8.2 kpc.',
            },
            {
              question: 'What is the Local Standard of Rest?',
              answerOutline:
                'A reference point at the Sun\'s position moving on a circular orbit about the Galactic centre; the Sun moves relative to it at about (11, 12, 7) km/s.',
            },
          ],
        },
        {
          slug: 'disk-kinematics-and-the-rotation-curve',
          title: 'Disk kinematics and the rotation curve',
          summary:
            'Differential rotation, the Oort constants, the tangent-point method with HI, and the Gaia-era rotation curve that measures the dark halo from inside.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the Oort constants A and B and relate them to the local rotation curve',
            'Explain the tangent-point method for the inner rotation curve from 21 cm emission',
            'Derive the enclosed mass from a rotation curve and explain the evidence for a dark halo',
            'Measure the rotation curve from Gaia DR3 red-giant kinematics',
          ],
          concepts: [
            'Differential rotation; Theta(R)',
            'Oort constants A about 15, B about -12 km/s/kpc',
            'Tangent-point method with HI 21 cm',
            'Jeans-equation correction (asymmetric drift)',
            'Flat rotation curve and M(<R) = v^2 R / G',
            'Epicyclic frequency kappa and velocity ellipsoid',
            'Vertical kinematics and the local dark-matter density',
            'Gaia DR3 radial velocities and Galactocentric transformations',
          ],
          explanation: `The disk rotates **differentially**: the angular speed $\\Omega(R) = \\Theta(R)/R$ falls with radius, so nearby stars drift past the Sun in a shear pattern. Oort showed in 1927 that the line-of-sight velocity of a star at distance $d$ and longitude $l$ is $v_r \\approx A\\,d\\sin 2l$ and its proper motion $\\propto A\\cos 2l + B$, with the **Oort constants**

$$ A = \\tfrac12\\left(\\frac{\\Theta_0}{R_0} - \\frac{d\\Theta}{dR}\\right), \\qquad B = -\\tfrac12\\left(\\frac{\\Theta_0}{R_0} + \\frac{d\\Theta}{dR}\\right). $$

Gaia gives $A \\approx 15.3$, $B \\approx -11.9$ km s$^{-1}$ kpc$^{-1}$, so $A - B = \\Omega_0 \\approx 27$ km s$^{-1}$ kpc$^{-1}$ and the curve is nearly flat ($A + B = -d\\Theta/dR \\approx 3$).

Inside the solar circle, the classical **tangent-point method** uses HI 21 cm emission: along a line of sight at longitude $l$, the maximum radial velocity comes from the point closest to the centre, where $R = R_0\\sin l$ and $\\Theta(R) = v_{max} + \\Theta_0 \\sin l$. Outside the solar circle one needs distances to tracers, which Gaia now provides for millions of stars. Stars do not move on exact circles, so the mean rotation of a population lags the circular speed by the **asymmetric drift** (larger for kinematically hotter populations), which the Jeans equations of the next module let you correct. Eilers et al. (2019) applied exactly this to Gaia red giants out to 25 kpc.

The payoff is the **enclosed mass**: for a spherical system $M(<R) = \\Theta^2 R/G$. A flat curve at 220 km s$^{-1}$ means $M \\propto R$, i.e. density $\\propto R^{-2}$, far beyond where starlight ends; by 25 kpc the enclosed mass is $\\sim 3 \\times 10^{11}\\,M_\\odot$ against $\\sim 7 \\times 10^{10}$ in stars and gas. Vertical kinematics near the Sun give the **local dark-matter density**, about $0.01\\,M_\\odot$ pc$^{-3}$ ($0.4$ GeV cm$^{-3}$), the number direct-detection experiments assume.

Read Bovy's book chapters on disk kinematics, then reproduce the Eilers rotation curve in the exercise. It is a remarkable thing to measure the dark halo of your own galaxy from a laptop.`,
          resources: [
            {
              title: 'Bovy — Dynamics and Astrophysics of Galaxies (online book)',
              url: 'https://galaxiesbook.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Toronto',
              note: 'Chapters on the Milky Way rotation curve, Oort constants and kinematics of the solar neighbourhood.',
              primary: true,
            },
            {
              title: 'Eilers et al. (2019), The circular velocity curve of the Milky Way from 5 to 25 kpc',
              url: 'https://arxiv.org/abs/1810.09466',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The Gaia DR2 + APOGEE rotation curve with the Jeans-equation method you will reproduce.',
            },
            {
              title: 'Gaia Archive (ESA)',
              url: 'https://gea.esac.esa.int/archive/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
              note: 'gaiadr3.gaia_source has radial_velocity for 33 million stars; the distance column from Bailer-Jones is in external.gaiaedr3_distance.',
            },
            {
              title: 'galpy — Galactic dynamics in Python',
              url: 'https://docs.galpy.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Jo Bovy',
              note: 'Milky Way potential models (MWPotential2014) and orbit integration used in the exercises.',
            },
          ],
          exercises: [
            {
              slug: 'oort-constants-from-gaia',
              title: 'Measure the Oort constants',
              prompt:
                'Select Gaia DR3 stars with 0.5 < d < 2 kpc, |b| < 10 degrees and G < 13 with proper motions. Compute the proper motion in Galactic longitude mu_l, correct for the solar motion, and fit mu_l cos b (in km/s/kpc) = A cos 2l + B as a function of l. Report A and B with uncertainties, derive Omega_0 and dTheta/dR, and compare with the literature values.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'gaia-rotation-curve',
              title: 'The rotation curve from Gaia red giants',
              prompt:
                'Select Gaia DR3 stars with radial velocities, |z| < 0.5 kpc, parallax_over_error > 5, in the red-giant region of the CMD (M_G < 2, BP - RP > 1). Transform to Galactocentric cylindrical coordinates with astropy (R_0 = 8.2 kpc, z_0 = 20 pc, solar velocity from Bland-Hawthorn & Gerhard). In radial bins from 5 to 20 kpc compute the mean v_phi and the dispersions, apply the asymmetric-drift correction v_c^2 = <v_phi>^2 + sigma_R^2 [ ... ] as in Eilers et al. equation 4 (assume an exponential density with scale length 3 kpc), and plot v_c(R). Compare with the Eilers curve and with galpy\'s MWPotential2014.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'enclosed-mass',
              title: 'Enclosed mass and the dark halo',
              prompt:
                'From your rotation curve (or the Eilers table) compute M(<R) = v_c^2 R / G at 5, 10, 15, 20 and 25 kpc. Compute the baryonic mass inside each radius from an exponential disk (M_d = 5e10 M_sun, R_d = 2.6 kpc) plus bulge (1.5e10). Plot both and the dark fraction. Extrapolate a flat curve to 200 kpc and compare with the Milky Way virial mass of about 1e12 M_sun.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does A - B measure and what does A + B measure?',
              answerOutline:
                'A - B = Omega_0, the local angular rotation rate; A + B = -dTheta/dR, the local slope of the rotation curve (about zero for a flat curve).',
            },
            {
              question: 'Why does the mean rotation speed of a stellar population lag the circular speed?',
              answerOutline:
                'Asymmetric drift: non-circular motions plus a density gradient mean more stars are near apocentre (moving slowly) than pericentre at a given radius.',
            },
            {
              question: 'What does a flat rotation curve imply about the mass distribution?',
              answerOutline:
                'M(<R) grows linearly with R, so density falls as R^-2: mass keeps increasing where there is little light, requiring a dark halo.',
            },
          ],
        },
        {
          slug: 'the-galactic-centre-and-sgr-a-star',
          title: 'The Galactic centre and Sagittarius A*',
          summary:
            'The orbits of the S stars, the 4 million solar-mass black hole, the EHT image and the extreme environment of the inner parsec.',
          estimatedMinutes: 90,
          objectives: [
            'Derive the mass of Sgr A* from the orbit of S2 using Kepler\'s third law',
            'Explain why the orbital data rule out alternatives to a black hole',
            'Describe the GRAVITY tests of general relativity (redshift, Schwarzschild precession) and the EHT image',
            'Describe the nuclear star cluster, the circumnuclear disk and the Fermi bubbles',
          ],
          concepts: [
            'Sgr A*: radio source at the dynamical centre',
            'S stars; S2 period 16 yr, pericentre 120 AU',
            'Mass 4.3e6 solar masses; distance 8.2 kpc',
            'Gravitational redshift and Schwarzschild precession of S2',
            'EHT image: shadow diameter about 52 microarcseconds',
            'Nuclear star cluster and paradox of youth',
            'Low accretion rate and radiative inefficiency',
            'Fermi bubbles and past activity',
          ],
          explanation: `At the dynamical centre of the Galaxy sits a compact radio source, **Sgr A***, and around it a cluster of young stars, the **S stars**, whose orbits have been tracked with adaptive optics since the 1990s by the UCLA and MPE groups. The star S2 has a period of 16.05 yr, an eccentricity of 0.88 and a pericentre distance of only 120 AU (1400 Schwarzschild radii), where it moves at 7650 km s$^{-1}$. Kepler's third law with the measured semi-major axis (0.125 arcsec at 8.2 kpc) gives a central mass of $4.3 \\times 10^6\\,M_\\odot$ inside the pericentre distance. No cluster of stars or stellar remnants could be that dense without collapsing or evaporating in far less than the age of the Galaxy, and no boson-star alternative survives the EHT image: it is a black hole. Genzel and Ghez shared the 2020 Nobel Prize for this.

The 2018 pericentre passage, observed with the GRAVITY interferometer on the VLT, detected the **gravitational redshift** of S2's spectral lines (a combined transverse Doppler plus GR shift of 200 km s$^{-1}$) and later the **Schwarzschild precession** of the orbit (12 arcmin per orbit), both matching general relativity. In 2022 the Event Horizon Telescope published the image of Sgr A* itself: a ring of 52 microarcseconds diameter, consistent with the shadow $\\approx 5.2\\,r_s$ of a $4 \\times 10^6\\,M_\\odot$ black hole at 8.2 kpc.

Sgr A* is remarkably faint, radiating only $\\sim 10^{-9}$ of its Eddington luminosity, which requires a radiatively inefficient accretion flow (the subject of the high-energy track). Yet the **Fermi bubbles**, two gamma-ray lobes extending 10 kpc above and below the centre, show it was far more active a few million years ago. The inner parsec also hosts a nuclear star cluster of $10^7\\,M_\\odot$, young massive stars that should not be able to form so close to the hole (the "paradox of youth"), a circumnuclear molecular ring and the supernova remnant Sgr A East. Read the Ghez and GRAVITY papers and the UCLA Galactic Center Group site; the exercise fits the S2 orbit yourself from published astrometry.`,
          resources: [
            {
              title: 'UCLA Galactic Center Group',
              url: 'https://galacticcenter.astro.ucla.edu/',
              type: 'article',
              cost: 'free',
              provider: 'UCLA',
              note: 'Animations of the S-star orbits and links to the published astrometric data.',
            },
            {
              title: 'Ghez et al. (2008), Measuring distance and properties of the Milky Way\'s central supermassive black hole with stellar orbits',
              url: 'https://arxiv.org/abs/0808.2870',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Table of S2 astrometry and radial velocities you can fit directly.',
              primary: true,
            },
            {
              title: 'GRAVITY Collaboration (2018), Detection of the gravitational redshift in the orbit of S2',
              url: 'https://arxiv.org/abs/1807.09409',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Event Horizon Telescope Collaboration (2022), First Sagittarius A* results I',
              url: 'https://iopscience.iop.org/article/10.3847/2041-8213/ac6674',
              type: 'article',
              cost: 'free',
              provider: 'ApJ Letters',
              note: 'Open access; the image, ring diameter and mass-distance consistency.',
            },
            {
              title: 'Nobel Prize in Physics 2020 — popular information',
              url: 'https://www.nobelprize.org/prizes/physics/2020/popular-information/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
            },
          ],
          exercises: [
            {
              slug: 'fit-s2-orbit',
              title: 'Fit the orbit of S2',
              prompt:
                'Take the S2 astrometric positions (RA/Dec offsets from Sgr A*, with errors) and radial velocities from Ghez et al. (2008) or the GRAVITY 2018 paper. Write a Keplerian orbit model with seven parameters (P, e, a, i, Omega, omega, T_0) plus the black-hole mass and distance (which fix a in AU vs arcsec), and fit with scipy.optimize or emcee. Report M_BH and R_0 with uncertainties and compare with 4.3e6 M_sun and 8.2 kpc.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Fit the sky-plane orbit first with the mass-distance combination fixed, then add radial velocities to break the degeneracy.',
            },
            {
              slug: 'density-argument',
              title: 'Why it must be a black hole',
              prompt:
                'Compute the minimum mean density of the central object if 4.3e6 M_sun lies inside S2\'s pericentre (120 AU). Compare with the density of a neutron star and of a white dwarf. Then estimate the evaporation and collisional-collapse timescales for a cluster of 4.3e6 one-solar-mass objects in that volume and show that it is far shorter than 10 Gyr. Finally compute the expected shadow diameter 5.2 r_s in microarcseconds and compare with the EHT measurement.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'gr-effects-s2',
              title: 'Relativistic effects on S2',
              prompt:
                'For S2 at pericentre (v = 7650 km/s, r = 120 AU, M = 4.3e6 M_sun), compute the transverse Doppler shift (v^2 / 2c^2) and the gravitational redshift (GM / r c^2) in km/s, and the Schwarzschild precession per orbit 6 pi G M / (a (1 - e^2) c^2) in arcminutes. Compare with the GRAVITY measurements.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What single measurement gives the mass of Sgr A*?',
              answerOutline:
                'The period and semi-major axis of a star orbiting it (Kepler\'s third law), with the semi-major axis converted to physical units using the distance (itself fitted from radial velocities).',
            },
            {
              question: 'What did GRAVITY detect during S2\'s 2018 pericentre passage?',
              answerOutline:
                'The combined gravitational and transverse Doppler redshift of about 200 km/s, confirming the GR prediction; later the Schwarzschild precession.',
            },
            {
              question: 'Why is Sgr A* so faint compared with quasars?',
              answerOutline:
                'It accretes at a tiny rate (about 1e-8 M_sun/yr) through a radiatively inefficient flow, so its luminosity is about 1e-9 of Eddington.',
            },
          ],
        },
        {
          slug: 'the-stellar-halo-and-galactic-archaeology',
          title: 'The stellar halo and Galactic archaeology',
          summary:
            'Streams, the Gaia-Enceladus merger, the Sagittarius dwarf, chemical tagging and what the halo tells us about how the Milky Way was assembled.',
          estimatedMinutes: 90,
          objectives: [
            'Explain how tidal streams form and what they reveal about the Galactic potential',
            'Describe the evidence for the Gaia-Enceladus/Sausage merger and its timing',
            'Use chemical abundances ([alpha/Fe] vs [Fe/H]) to distinguish accreted from in-situ populations',
            'Identify halo substructure in Gaia velocity and action space',
          ],
          concepts: [
            'Hierarchical assembly and accreted substructure',
            'Tidal streams: Sagittarius, GD-1, Palomar 5',
            'Gaia-Enceladus/Sausage: radial-orbit debris of a 1e9 solar-mass dwarf',
            'Integrals of motion and action space',
            'Alpha-element knee and the timescale of enrichment',
            'In-situ vs accreted halo; the splash',
            'Satellite galaxies and the Magellanic system',
            'Milky Way mass from satellites and streams',
          ],
          explanation: `In the standard cosmology galaxies grow by merging, and the stellar halo is the debris of that process. Dwarf galaxies falling into the Milky Way are stretched by tides into **streams** that trace their orbits for billions of years: the Sagittarius stream wraps the whole sky, and thin streams from globular clusters such as GD-1 and Palomar 5 are so narrow that small perturbations (possibly dark-matter subhalos) leave visible gaps. Because a stream's stars share nearly the same orbit, fitting it constrains the Galactic potential at radii the disk cannot reach.

Gaia transformed this field in 2018. In the local velocity distribution, Helmi et al. and Belokurov et al. found a huge population of halo stars on highly radial orbits with a distinct chemistry: the remnant of **Gaia-Enceladus** (or the "Sausage"), a dwarf of $\\sim 10^9\\,M_\\odot$ in stars that merged about 10 Gyr ago and contributed most of the inner halo. The same merger heated the existing disk into the thick disk and the "splash" population. Dynamically, accreted groups stay coherent in **integrals of motion** (energy, angular momentum, or actions $J_R, J_\\phi, J_z$) long after they have phase-mixed in position, which is why action space, computed with galpy, is the natural place to hunt for them.

Chemistry provides the second fingerprint. Stars formed in a dwarf galaxy enrich slowly, so their **alpha-element** abundances fall at lower $[\\mathrm{Fe/H}]$ (type Ia supernovae add iron before much star formation has occurred) than in the Milky Way's own disk: the position of the $[\\alpha/\\mathrm{Fe}]$ "knee" dates the enrichment timescale of each progenitor. Large spectroscopic surveys (APOGEE, GALAH, Gaia RVS) make **chemical tagging** possible for millions of stars.

The halo's outer parts, satellites and streams also give the total mass of the Milky Way, $1.0$-$1.5 \\times 10^{12}\\,M_\\odot$ out to the virial radius, with the Large Magellanic Cloud (perhaps 10-20% of that) currently perturbing everything. Read the Helmi review and the discovery papers; the exercise finds Gaia-Enceladus in your own velocity-space plot.`,
          resources: [
            {
              title: 'Helmi (2020), Streams, substructures, and the early history of the Milky Way',
              url: 'https://arxiv.org/abs/2002.04340',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; the overview of Gaia-era halo archaeology.',
              primary: true,
            },
            {
              title: 'Helmi et al. (2018), The merger that led to the formation of the Milky Way\'s inner stellar halo and thick disk',
              url: 'https://arxiv.org/abs/1806.06038',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The Gaia-Enceladus discovery paper; figure 1 is the plot you will reproduce.',
            },
            {
              title: 'galpy — Galactic dynamics in Python',
              url: 'https://docs.galpy.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Jo Bovy',
              note: 'actionAngle routines compute (J_R, L_z, J_z) for Gaia stars in a Milky Way potential.',
            },
            {
              title: 'Gaia Archive (ESA)',
              url: 'https://gea.esac.esa.int/archive/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
            },
          ],
          exercises: [
            {
              slug: 'find-gaia-enceladus',
              title: 'Find Gaia-Enceladus in velocity space',
              prompt:
                'Select Gaia DR3 stars within 2.5 kpc with radial velocities and parallax_over_error > 5. Compute Galactocentric cylindrical velocities (v_R, v_phi, v_z). Plot v_phi against sqrt(v_R^2 + v_z^2) (the Toomre diagram) and v_R against v_phi as 2D histograms. Identify the disk (v_phi about 230 km/s) and the halo; show that halo stars with v_phi near 0 form an elongated "sausage" in v_R. Select them with |v - v_LSR| > 210 km/s and plot their CMD: note the distinct, bluer, metal-poor sequence.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'action-space-clustering',
              title: 'Halo substructure in action space',
              prompt:
                'For the halo sample from the previous exercise, compute energy and actions with galpy (MWPotential2014, Staeckel approximation). Plot E against L_z and J_R against L_z. Identify Gaia-Enceladus (low L_z, high J_R) and look for other over-densities (Sequoia at retrograde L_z, Helmi streams at high J_z). Explain why actions are better than velocities for finding ancient mergers.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'stream-potential-constraint',
              title: 'A stream as a potential probe',
              prompt:
                'Integrate the orbit of a globular cluster on a GD-1-like orbit (pericentre 14 kpc, apocentre 23 kpc) in galpy for 3 Gyr in MWPotential2014 and in the same potential with the halo mass scaled by 0.7 and 1.3. Release test particles at the tidal radius every 10 Myr to make a mock stream (or use galpy\'s streamdf). Show how the stream track on the sky and the radial-velocity gradient along it change with halo mass.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do accreted stars remain identifiable long after a merger?',
              answerOutline:
                'They conserve integrals of motion (energy, angular momentum, actions) in a slowly evolving potential, so they cluster in those spaces even after phase-mixing in position.',
            },
            {
              question: 'How does the [alpha/Fe] versus [Fe/H] diagram reveal a star\'s origin?',
              answerOutline:
                'The metallicity at which alpha/Fe declines (the knee) reflects how much enrichment occurred before type Ia supernovae; small, slowly enriching dwarfs have the knee at lower [Fe/H] than the Milky Way disk.',
            },
            {
              question: 'What is Gaia-Enceladus?',
              answerOutline:
                'The debris of a roughly 1e9 solar-mass (in stars) dwarf galaxy that merged about 10 Gyr ago, dominating the inner halo on radial orbits and heating the thick disk.',
            },
          ],
        },
      ],
      project: {
        slug: 'milky-way-from-gaia',
        title: 'Module project: the Milky Way from Gaia DR3',
        description:
          'Produce a single reproducible notebook that measures, from Gaia DR3 alone, the solar motion, the Oort constants, the rotation curve from 5 to 20 kpc, the enclosed dark-matter fraction, and the Gaia-Enceladus halo population, each with uncertainties and a comparison with the literature.',
        deliverables: [
          'The notebook with all ADQL queries and quality cuts',
          'A figure set: star-count map, Toomre diagram, rotation curve with literature overlay, mass budget',
          'A two-page summary of results and discrepancies',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'galaxy-structure-and-dynamics',
      title: 'Galaxy Structure and Dynamics',
      description:
        'Galaxies as gravitational systems: classification and scaling relations, potentials and orbits, collisionless dynamics and the Jeans equations, and the origin of spirals, bars and mergers.',
      lessons: [
        {
          slug: 'galaxy-classification-and-scaling-relations',
          title: 'Galaxy classification and scaling relations',
          summary:
            'The Hubble sequence and its physical meaning, surface-brightness profiles, and the Tully-Fisher, Faber-Jackson and fundamental-plane relations that connect light to mass.',
          estimatedMinutes: 90,
          objectives: [
            'Classify galaxies on the Hubble sequence and relate morphology to colour, gas content and star formation',
            'Fit Sersic profiles to surface-brightness data and interpret the index n',
            'State the Tully-Fisher and Faber-Jackson relations and the fundamental plane and explain their physical basis',
            'Build a colour-magnitude diagram of SDSS galaxies and identify the red sequence and blue cloud',
          ],
          concepts: [
            'Hubble sequence: E, S0, Sa-Sc, SB, Irr',
            'Sersic profile I(R) proportional to exp(-b_n (R/R_e)^(1/n)); exponential (n = 1) and de Vaucouleurs (n = 4)',
            'Bulge-to-disk ratio',
            'Red sequence, blue cloud, green valley',
            'Tully-Fisher relation L proportional to v_max^4',
            'Faber-Jackson L proportional to sigma^4 and the fundamental plane',
            'Luminosity function (Schechter)',
            'Mass-to-light ratio and stellar mass estimates',
          ],
          explanation: `Hubble's tuning-fork classification (ellipticals E0-E7, lenticulars S0, spirals Sa-Sc with barred counterparts, irregulars) is morphological but maps onto physics. Along the sequence from ellipticals to late-type spirals, galaxies become bluer, more gas-rich, more actively star-forming, less dominated by a bulge and less dominated by random motions relative to rotation. In the SDSS colour-magnitude diagram this appears as a bimodality: a tight **red sequence** of quiescent, mostly early-type galaxies and a broad **blue cloud** of star-forming disks, with a sparse **green valley** between.

Surface-brightness profiles are described by the **Sersic law**, $I(R) = I_e \\exp\\{-b_n[(R/R_e)^{1/n} - 1]\\}$, with $n = 1$ the exponential disk and $n = 4$ de Vaucouleurs' law for ellipticals; $R_e$ is the half-light radius. Bulge-plus-disk decompositions quantify the Hubble type.

The most important results are the **scaling relations**, because they turn a photometric measurement into a mass or a distance. For spirals, the **Tully-Fisher relation** $L \\propto v_{max}^{\\alpha}$ with $\\alpha \\approx 3.5$-$4$ (and tighter in baryonic mass, $M_b \\propto v^4$) follows from virial equilibrium, $v^2 \\propto M/R$, combined with roughly constant surface brightness and mass-to-light ratio. For ellipticals, **Faber-Jackson** $L \\propto \\sigma^4$ is the analogue, and its scatter is reduced by adding size: the **fundamental plane** $R_e \\propto \\sigma^{1.2} I_e^{-0.8}$, whose "tilt" from the virial prediction $R_e \\propto \\sigma^2 I_e^{-1}$ encodes a mass-to-light ratio that rises with mass. Both are secondary distance indicators.

The number of galaxies per luminosity bin follows the **Schechter function** $\\phi(L) \\propto (L/L_*)^{\\alpha}e^{-L/L_*}$ with $L_* \\approx 2 \\times 10^{10}\\,L_\\odot$ and faint-end slope $\\alpha \\approx -1.2$: the exponential cut-off is one of the central facts galaxy formation must explain. Read OpenStax chapter 26, then build the SDSS diagrams in the exercises; Galaxy Zoo gives you morphologies for the same objects.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 26.1 The Discovery of Galaxies (chapter 26)',
              url: 'https://openstax.org/books/astronomy-2e/pages/26-1-the-discovery-of-galaxies',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Sections 26.1-26.4 on types, properties and the extragalactic distance scale.',
            },
            {
              title: 'SDSS SkyServer (DR18) SQL search',
              url: 'https://skyserver.sdss.org/dr18/',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'Tables Galaxy, SpecObj and the zoo2MainSpecz Galaxy Zoo morphologies used below.',
              primary: true,
            },
            {
              title: 'Galaxy Zoo',
              url: 'https://www.zooniverse.org/projects/zookeeper/galaxy-zoo',
              type: 'interactive',
              cost: 'free',
              provider: 'Zooniverse',
              note: 'Classify a few dozen galaxies yourself before trusting the catalogue.',
            },
            {
              title: 'Bovy — Dynamics and Astrophysics of Galaxies (online book)',
              url: 'https://galaxiesbook.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Toronto',
              note: 'Introductory chapters on galaxy populations and surface photometry.',
            },
          ],
          exercises: [
            {
              slug: 'sdss-colour-magnitude',
              title: 'SDSS galaxy colour-magnitude diagram',
              prompt:
                'Query SDSS DR18: SELECT TOP 100000 p.modelMag_u, p.modelMag_r, p.petroR50_r, s.z FROM Galaxy p JOIN SpecObj s ON s.bestObjID = p.objID WHERE s.z BETWEEN 0.02 AND 0.06 AND p.modelMag_r < 17.7. Compute absolute r magnitudes with astropy.cosmology (ignore K-corrections for this redshift range). Plot u - r against M_r as a 2D histogram and identify the red sequence and blue cloud. Fit a Schechter function to the r-band luminosity function (account for the magnitude limit with 1/V_max weighting) and report M_* and alpha.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'sersic-fits',
              title: 'Sersic profiles from SDSS images',
              prompt:
                'Download SDSS r-band cutouts (via the SkyServer image service or astroquery.sdss) of one elliptical (e.g. NGC 4472) and one face-on spiral (e.g. NGC 5457 or a smaller SDSS spiral). Measure azimuthally averaged surface brightness in elliptical annuli with photutils and fit a Sersic profile to each. Report n and R_e, and show the spiral is better fit by an exponential disk plus a small bulge.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'tully-fisher-derivation',
              title: 'Derive the Tully-Fisher slope',
              prompt:
                'Assume all spirals have the same central surface brightness (Freeman\'s law, mu_0 = 21.65 mag/arcsec^2 in B) and the same mass-to-light ratio, and are in virial equilibrium with v^2 = G M / R. Show that L is proportional to v^4. Then discuss why the observed slope in the baryonic Tully-Fisher relation (M_b proportional to v^4 with small scatter) is challenging for simple models of dark-matter halos.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What physical trends run along the Hubble sequence from E to Sc?',
              answerOutline:
                'Decreasing bulge fraction, increasing gas fraction and star-formation rate, bluer colours, more rotational versus random support.',
            },
            {
              question: 'What is the fundamental plane and why is it tilted relative to the virial expectation?',
              answerOutline:
                'The relation R_e proportional to sigma^1.2 I_e^-0.8 for ellipticals; the tilt from sigma^2 I_e^-1 implies the mass-to-light ratio increases with mass (stellar populations and dark matter).',
            },
            {
              question: 'What does the exponential cut-off of the Schechter function tell us?',
              answerOutline:
                'Very luminous galaxies are exponentially rare; some process (AGN feedback, long cooling times) suppresses the growth of the most massive galaxies.',
            },
          ],
        },
        {
          slug: 'gravitational-potentials-and-orbits',
          title: 'Gravitational potentials and orbits',
          summary:
            'Poisson\'s equation, the potentials of spheres and disks, circular and epicyclic orbits, and orbit families in realistic galaxy potentials.',
          estimatedMinutes: 100,
          objectives: [
            'Compute the potential and circular velocity for point-mass, isothermal, Plummer, Hernquist and NFW spheres',
            'Explain why thin-disk potentials are not simple and use the Miyamoto-Nagai approximation',
            'Derive the epicyclic approximation and the frequencies kappa and nu',
            'Integrate orbits in a Milky Way potential with galpy and classify them',
          ],
          concepts: [
            'Poisson equation and Newton\'s theorems for spheres',
            'Circular speed v_c^2 = R dPhi/dR; escape speed',
            'Singular isothermal sphere: flat rotation curve',
            'Plummer, Hernquist, NFW profiles',
            'Miyamoto-Nagai disk potential',
            'Epicycle approximation: kappa, nu, Oort constants',
            'Orbits in axisymmetric potentials: E, L_z, third integral',
            'Loop, box and resonant orbits in bars',
          ],
          explanation: `A galaxy's gravitational field is set by **Poisson's equation** $\\nabla^2\\Phi = 4\\pi G\\rho$, and because galaxies are collisionless (a star's orbit is governed by the smooth potential, not by individual encounters), dynamics reduces to orbits in $\\Phi$. For spheres, Newton's theorems make life easy: the force at $r$ depends only on $M(<r)$, so $v_c^2 = GM(<r)/r$. Useful models are the **singular isothermal sphere** ($\\rho \\propto r^{-2}$, flat rotation curve, infinite mass), the **Plummer** sphere (finite, analytic, good for clusters), the **Hernquist** profile ($\\rho \\propto r^{-1}(r+a)^{-3}$, a good elliptical-galaxy and de Vaucouleurs match) and the **NFW** profile of dark-matter halos, $\\rho \\propto (r/r_s)^{-1}(1 + r/r_s)^{-2}$, whose $v_c$ rises, peaks near $2r_s$ and falls slowly.

Disks are harder because the force at $R$ depends on mass outside $R$ as well; for an exponential disk the rotation curve peaks at $2.2 R_d$ and then declines, which is why a flat curve beyond that radius demands a halo. The **Miyamoto-Nagai** potential, $\\Phi = -GM/\\sqrt{R^2 + (a + \\sqrt{z^2 + b^2})^2}$, is an analytic flattened model that interpolates between Plummer sphere and thin Kuzmin disk and is the standard building block of Milky Way models like galpy's MWPotential2014.

Nearly circular orbits in an axisymmetric disk are described by the **epicycle approximation**: the star oscillates radially about a guiding centre with frequency $\\kappa^2 = R\\,d\\Omega^2/dR + 4\\Omega^2$ and vertically with $\\nu^2 = \\partial^2\\Phi/\\partial z^2$. For a flat rotation curve $\\kappa = \\sqrt2\\,\\Omega$; in the solar neighbourhood $\\kappa \\approx 37$ km s$^{-1}$ kpc$^{-1}$ and the ratio of radial to azimuthal velocity dispersions is $\\sigma_\\phi/\\sigma_R = \\kappa/2\\Omega \\approx 0.7$, as observed. The Oort constants reappear: $\\kappa^2 = -4B(A - B)$.

General orbits conserve $E$ and $L_z$ and, in practice, a third integral (the vertical action), so they fill tori. In barred or triaxial potentials loop orbits are joined by **box** orbits and resonant families ($x_1$ orbits support the bar). Read Bovy's chapters on potentials and orbits and do the galpy exercises; nothing builds intuition like watching orbits.`,
          resources: [
            {
              title: 'Bovy — Dynamics and Astrophysics of Galaxies (online book)',
              url: 'https://galaxiesbook.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Toronto',
              note: 'Part I chapters on potentials of spherical and flattened systems and orbits.',
              primary: true,
            },
            {
              title: 'galpy documentation',
              url: 'https://docs.galpy.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Jo Bovy',
              note: 'Potential classes, rotation curves and Orbit integration; the tutorials map directly onto this lesson.',
            },
            {
              title: 'Binney & Tremaine — Galactic Dynamics (2nd ed.)',
              url: 'https://ui.adsabs.harvard.edu/abs/2008gady.book.....B',
              type: 'textbook',
              cost: 'paid',
              provider: 'Princeton University Press',
              note: 'Chapters 2-3 are the definitive treatment. Bovy\'s free book covers the same ground.',
            },
            {
              title: 'Navarro, Frenk & White (1997), A universal density profile from hierarchical clustering',
              url: 'https://arxiv.org/abs/astro-ph/9611107',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
          ],
          exercises: [
            {
              slug: 'rotation-curves-of-models',
              title: 'Rotation curves of model potentials',
              prompt:
                'Derive and plot v_c(r) for a point mass, Plummer, Hernquist (a = 5 kpc, M = 1e11), NFW (r_s = 20 kpc, M_200 = 1e12) and an exponential disk (M = 5e10, R_d = 3 kpc; use the Freeman formula with Bessel functions or galpy). Then combine disk + bulge + NFW halo to reproduce a flat 220 km/s curve from 3 to 25 kpc and compare the components\' contributions with MWPotential2014.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'epicycle-frequencies',
              title: 'Epicyclic frequencies and the velocity ellipsoid',
              prompt:
                'Derive kappa^2 = R dOmega^2/dR + 4 Omega^2 by expanding the effective potential about a circular orbit. Evaluate kappa and nu at the Sun in MWPotential2014 (galpy provides .epifreq and .verticalfreq) and predict sigma_phi / sigma_R. Compare with the Gaia measurement for nearby stars (about 0.65-0.7) and compute the radial and vertical oscillation periods of the Sun.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'orbit-zoo',
              title: 'Orbit zoo in galpy',
              prompt:
                'Integrate for 5 Gyr in MWPotential2014: the Sun, a thick-disk star (sigma 50 km/s offsets), a halo star on an eccentric orbit, and a star in a barred potential (add galpy\'s DehnenBarPotential). Plot each orbit in the meridional (R, z) plane and in x-y. Compute E, L_z, eccentricity, pericentre and apocentre. Identify loop versus box behaviour and discuss the third integral.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does an exponential disk alone produce a declining rotation curve beyond 2.2 scale lengths?',
              answerOutline:
                'Most of the disk mass is enclosed by then and the potential approaches Keplerian; the observed flatness therefore requires additional mass at large radii.',
            },
            {
              question: 'What is the relation between kappa and Omega for a flat rotation curve?',
              answerOutline: 'kappa = sqrt(2) Omega.',
            },
            {
              question: 'Why does the rotation curve of an NFW halo decline at large radius?',
              answerOutline:
                'Density falls as r^-3 beyond r_s so enclosed mass grows only logarithmically and v_c decreases slowly.',
            },
          ],
        },
        {
          slug: 'collisionless-dynamics-and-the-jeans-equations',
          title: 'Collisionless dynamics, the Jeans equations and the virial theorem',
          summary:
            'The distribution function, the collisionless Boltzmann equation, Jeans equations for mass modelling, velocity anisotropy and dynamical masses of ellipticals and clusters.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why galaxies are collisionless by computing the two-body relaxation time',
            'Write the collisionless Boltzmann equation and take its moments to get the Jeans equations',
            'Use the spherical Jeans equation to infer a mass profile from a dispersion profile and explain the mass-anisotropy degeneracy',
            'Apply the virial theorem to estimate cluster and galaxy masses',
          ],
          concepts: [
            'Relaxation time t_relax about (N / 8 ln N) t_cross',
            'Distribution function f(x, v, t) and the collisionless Boltzmann equation',
            'Jeans theorem: f depends on integrals of motion',
            'Jeans equations (moments of CBE)',
            'Velocity anisotropy parameter beta',
            'Mass-anisotropy degeneracy',
            'Virial theorem and virial mass estimators',
            'Dynamical friction',
          ],
          explanation: `Stars in a galaxy almost never collide and rarely even deflect one another: the **two-body relaxation time** $t_{relax} \\approx (N/8\\ln N)\\,t_{cross}$ is $\\sim 10^{16}$ yr for $N \\sim 10^{11}$ stars, so a galaxy is a **collisionless** system in which each star moves in the smooth mean potential. (Globular clusters, with $N \\sim 10^5$ and short crossing times, do relax, which is why they have core collapse and mass segregation.)

The state of such a system is the **distribution function** $f(\\mathbf{x}, \\mathbf{v}, t)$, the phase-space density of stars, which obeys the **collisionless Boltzmann equation** $\\partial f/\\partial t + \\mathbf{v}\\cdot\\nabla f - \\nabla\\Phi\\cdot\\partial f/\\partial\\mathbf{v} = 0$: phase-space density is conserved along orbits (Liouville). Jeans' theorem says steady-state solutions depend on phase-space coordinates only through integrals of motion, so $f(E)$, $f(E, L)$ and $f(\\mathbf{J})$ models are the building blocks of equilibrium galaxies.

Taking velocity moments of the CBE gives the **Jeans equations**, the stellar analogue of hydrostatic equilibrium. In spherical symmetry,

$$ \\frac{d(\\nu\\sigma_r^2)}{dr} + \\frac{2\\beta\\,\\nu\\sigma_r^2}{r} = -\\nu\\frac{GM(r)}{r^2}, \\qquad \\beta = 1 - \\frac{\\sigma_\\theta^2 + \\sigma_\\phi^2}{2\\sigma_r^2}, $$

where $\\nu$ is the tracer density and $\\beta$ the **anisotropy**. Given a measured dispersion profile you can solve for $M(r)$, except that only line-of-sight velocities are observed, so $\\beta$ is unknown: the **mass-anisotropy degeneracy** limits mass estimates of ellipticals, dwarf spheroidals and clusters unless proper motions or higher moments break it. In the disk, the axisymmetric Jeans equation yields the asymmetric-drift correction used in module 1.

Integrated over the whole system, the Jeans equations give the **virial theorem** $2K + W = 0$, so $M \\approx \\alpha\\,\\sigma^2 R_{eff}/G$ with a structure-dependent $\\alpha$ of order 5. Zwicky applied this to the Coma cluster in 1933 and found $\\sim 100$ times more mass than light: the first evidence for dark matter. A related concept, **dynamical friction**, is the drag a massive body feels from the wake it raises in a sea of lighter particles, $t_{df} \\propto r^2 v/(GM\\ln\\Lambda)$; it sinks satellites, globular clusters and black holes to galaxy centres. Read Bovy's part on equilibria and the Jeans equations; the exercise models a real dwarf spheroidal.`,
          resources: [
            {
              title: 'Bovy — Dynamics and Astrophysics of Galaxies (online book)',
              url: 'https://galaxiesbook.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Toronto',
              note: 'Chapters on equilibria of collisionless systems, the Jeans equations and the virial theorem.',
              primary: true,
            },
            {
              title: 'Binney & Tremaine — Galactic Dynamics (2nd ed.)',
              url: 'https://ui.adsabs.harvard.edu/abs/2008gady.book.....B',
              type: 'textbook',
              cost: 'paid',
              provider: 'Princeton University Press',
              note: 'Chapter 4 (equilibria) and 7-8 (relaxation, dynamical friction). Bovy is the free alternative.',
            },
            {
              title: 'MIT OCW 8.902 Astrophysics II',
              url: 'https://ocw.mit.edu/courses/8-902-astrophysics-ii-fall-2004/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures and problem sets on galactic dynamics and the virial theorem.',
            },
          ],
          exercises: [
            {
              slug: 'relaxation-times',
              title: 'Relaxation times across systems',
              prompt:
                'Compute the crossing time and two-body relaxation time for: an open cluster (N = 1000, R = 2 pc, sigma = 1 km/s), a globular cluster (N = 1e6, R = 5 pc, sigma = 7 km/s), an elliptical galaxy (N = 1e11, R = 10 kpc, sigma = 250 km/s) and a galaxy cluster treating galaxies as particles (N = 1000, R = 1 Mpc, sigma = 1000 km/s). Which are collisional on a Hubble time? What does that imply for each?',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'jeans-equations-derivation',
              title: 'Derive the spherical Jeans equation',
              prompt:
                'Starting from the collisionless Boltzmann equation in spherical coordinates, multiply by v_r and integrate over velocities to obtain the spherical Jeans equation with the anisotropy parameter beta. Then show that for beta = 0 and a power-law tracer density nu proportional to r^-gamma with constant sigma, M(r) = gamma sigma^2 r / G. Apply this to the Coma cluster (sigma about 1000 km/s, R about 1.5 Mpc, gamma about 2.5) and compare with the luminous mass of about 2e13 M_sun.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'dwarf-spheroidal-mass',
              title: 'Mass of a dwarf spheroidal from Jeans modelling',
              prompt:
                'Take the published line-of-sight velocities of Fornax or Sculptor dwarf spheroidal stars (Walker et al. 2009 catalogue on VizieR, or a similar public dataset). Compute the binned velocity-dispersion profile. Fit a spherical Jeans model with a Plummer stellar profile and an NFW (or cored) dark halo for beta = 0, then let beta vary, using emcee. Show the mass within the half-light radius is robust (M_1/2 about 3 sigma^2 r_1/2 / G, Wolf et al.) while the inner slope is not. Report M/L and compare with a globular cluster.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are galaxies collisionless but globular clusters not?',
              answerOutline:
                'Relaxation time scales as N / ln N times the crossing time; galaxies have N about 1e11 and t_relax far exceeding the Hubble time, globular clusters have N about 1e5-1e6 and t_relax of order 1 Gyr.',
            },
            {
              question: 'What is the mass-anisotropy degeneracy?',
              answerOutline:
                'Only line-of-sight velocities are observed, so a given dispersion profile can be fit by different combinations of mass profile and velocity anisotropy beta.',
            },
            {
              question: 'What does dynamical friction do to a satellite galaxy?',
              answerOutline:
                'The gravitational wake it induces in the host\'s stars and dark matter drags it, shrinking its orbit on a timescale proportional to r^2 v / (G M ln Lambda) until it merges.',
            },
          ],
        },
        {
          slug: 'spiral-structure-bars-and-mergers',
          title: 'Spiral structure, bars and galaxy interactions',
          summary:
            'The winding problem and density waves, swing amplification, bar formation and resonances, and what tidal interactions and mergers do to galaxies.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the winding problem and how density-wave theory resolves it',
            'Describe the Lindblad resonances and corotation and their role in bars and spirals',
            'Explain the Toomre Q criterion for disk stability',
            'Describe the outcomes of major and minor mergers and tidal interactions with reference to simulations',
          ],
          concepts: [
            'Winding problem for material arms',
            'Density-wave theory (Lin-Shu) and pattern speed',
            'Inner/outer Lindblad resonances and corotation',
            'Swing amplification and transient spirals',
            'Toomre Q = sigma_R kappa / (3.36 G Sigma)',
            'Bar formation and the bar instability',
            'Tidal tails, bridges and the Toomre sequence',
            'Major mergers forming ellipticals; minor mergers and disk heating',
          ],
          explanation: `Spiral arms cannot be material features. Differential rotation would wind an arm made of fixed stars into a tight coil within a few rotations (the **winding problem**), yet most spirals are open. Lin and Shu's **density-wave theory** treats the arms as a quasi-stationary pattern of enhanced density rotating rigidly at a **pattern speed** $\\Omega_p$ through which stars and gas stream; the gas is shocked on entering the arm, triggering star formation, which is why young stars and HII regions outline arms while the old stellar disk shows only a mild density contrast. The pattern lives between the **inner and outer Lindblad resonances**, where $\\Omega_p = \\Omega \\mp \\kappa/m$, and crosses **corotation** $\\Omega_p = \\Omega$ in between. Modern simulations suggest most arms are instead recurrent transient features produced by **swing amplification** of shearing perturbations, but the resonance framework survives.

Whether a disk can sustain such structure depends on its stability. **Toomre's criterion** for local axisymmetric stability of a stellar disk is

$$ Q = \\frac{\\sigma_R \\kappa}{3.36\\,G\\Sigma} > 1, $$

a balance of pressure (velocity dispersion), rotation (epicyclic frequency) and self-gravity (surface density); observed disks sit near $Q \\approx 1.5$-$2$, marginally stable, exactly where swing amplification is strongest. Cold, massive disks are also globally unstable to forming a **bar**, which then drives gas inward (fuelling bulges and nuclear star formation), slows down through dynamical friction with the halo, and buckles into the boxy or peanut-shaped bulges seen edge-on, including the Milky Way's.

Galaxies also interact. Toomre and Toomre showed in 1972 that tidal forces during a close passage pull out the long **tidal tails** and bridges of the Antennae and the Mice, and that successive mergers form a sequence ending in a spheroid. **Major mergers** of comparable-mass disks destroy the disks and produce elliptical-like remnants with de Vaucouleurs profiles, gas-rich ones first passing through a starburst and quasar phase; **minor mergers** thicken and heat disks and build stellar halos. Read Bovy's chapters on disk stability and the Toomre & Toomre paper; the exercises use galpy and a small N-body code.`,
          resources: [
            {
              title: 'Bovy — Dynamics and Astrophysics of Galaxies (online book)',
              url: 'https://galaxiesbook.org/',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Toronto',
              note: 'Chapters on disk stability, spiral structure and bars.',
              primary: true,
            },
            {
              title: 'Toomre & Toomre (1972), Galactic bridges and tails',
              url: 'https://ui.adsabs.harvard.edu/abs/1972ApJ...178..623T',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
              note: 'The classic restricted three-body simulations; still the clearest introduction to tidal interactions.',
            },
            {
              title: 'IllustrisTNG project',
              url: 'https://www.tng-project.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'TNG Collaboration',
              note: 'Public cosmological simulation data with merger trees and galaxy morphologies; browse the explorer to see mergers in action.',
            },
          ],
          exercises: [
            {
              slug: 'winding-problem',
              title: 'Quantify the winding problem',
              prompt:
                'Take a flat rotation curve with v = 220 km/s and an initially radial line of stars from 3 to 15 kpc. Compute the pitch angle of the resulting "arm" after 1, 3 and 10 rotations at 8 kpc. Compare with observed pitch angles (10-25 degrees) and state how many rotations the Milky Way disk has completed in 10 Gyr.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'toomre-q-map',
              title: 'Toomre Q across the Milky Way disk',
              prompt:
                'Using an exponential stellar disk (Sigma_0 = 800 M_sun/pc^2 at the centre, R_d = 2.6 kpc), kappa from MWPotential2014 and a radial dispersion profile sigma_R = 35 exp(-(R - 8 kpc)/(2 R_d)) km/s, compute Q(R) from 2 to 15 kpc. Add the gas (Sigma_gas = 10 M_sun/pc^2, sigma = 7 km/s) with the two-component approximation. Where is the disk closest to instability and what does that imply for spiral structure?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'tidal-encounter-simulation',
              title: 'Toomre & Toomre on your laptop',
              prompt:
                'Write a restricted three-body simulation: two point masses (galaxies) on a parabolic encounter, each surrounded by rings of massless test particles on circular orbits. Integrate through pericentre and 1 Gyr beyond, and plot snapshots. Show that a prograde encounter produces long tails while a retrograde one does not, and explain why using the resonance between orbital and encounter angular velocities.',
              kind: 'simulation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does density-wave theory resolve the winding problem?',
              answerOutline:
                'The arm is a pattern (a wave of enhanced density) rotating at a fixed pattern speed, not a fixed set of stars; stars pass through it, so differential rotation does not wind it up.',
            },
            {
              question: 'What does Toomre\'s Q compare?',
              answerOutline:
                'Stabilising velocity dispersion and rotation (sigma kappa) against destabilising self-gravity (G Sigma); Q < 1 means local gravitational instability.',
            },
            {
              question: 'Why do prograde encounters produce dramatic tidal tails?',
              answerOutline:
                'Stars orbiting in the same sense as the companion\'s passage experience a near-resonant, prolonged perturbation and are pulled out coherently; retrograde stars feel a rapidly varying force that averages out.',
            },
          ],
        },
      ],
    },
    {
      slug: 'dark-matter',
      title: 'Dark Matter',
      description:
        'The evidence that most matter is dark, from rotation curves and clusters to lensing; the structure of halos from simulations; and what dark matter might be.',
      lessons: [
        {
          slug: 'evidence-for-dark-matter',
          title: 'The evidence for dark matter',
          summary:
            'Zwicky\'s clusters, Rubin\'s rotation curves, hot gas in clusters, the Bullet Cluster and the CMB: five independent lines of evidence and what each measures.',
          estimatedMinutes: 100,
          objectives: [
            'Derive mass-to-light ratios from rotation curves and cluster dynamics and compare with stellar values',
            'Explain how X-ray gas in hydrostatic equilibrium measures cluster masses',
            'Explain why the Bullet Cluster rules out most modified-gravity alternatives',
            'Decompose a real rotation curve from the SPARC database into stellar, gas and halo components',
          ],
          concepts: [
            'Mass-to-light ratio M/L in solar units',
            'Zwicky (1933) and the Coma cluster virial mass',
            'Rubin & Ford: flat rotation curves of spirals',
            'Hydrostatic X-ray gas masses of clusters',
            'Gravitational lensing masses',
            'Bullet Cluster: offset between gas and mass',
            'CMB: Omega_b versus Omega_m',
            'MOND as an alternative and its difficulties',
          ],
          explanation: `Dark matter is inferred, never seen, so the strength of the case rests on the independence of the evidence. **Zwicky (1933)** applied the virial theorem to the Coma cluster and found $M/L \\sim 400$ in solar units, versus $M/L \\sim 1$-$5$ for stellar populations. **Rubin and Ford (1970)** and later HI observations showed that spiral rotation curves stay flat far beyond the optical disk, implying $M(<R) \\propto R$ where the light has run out; the SPARC database of 175 galaxies lets you repeat the analysis. Clusters confirm the result in two more ways: the **X-ray-emitting gas** at $10^7$-$10^8$ K sits in hydrostatic equilibrium, so its temperature and density profiles give $M(<r) = -(kT r/G\\mu m_p)(d\\ln\\rho/d\\ln r + d\\ln T/d\\ln r)$, and **gravitational lensing** of background galaxies measures the projected mass directly (next lesson). All agree: clusters are $\\sim 85\\%$ dark matter, $\\sim 12\\%$ hot gas and only $\\sim 3\\%$ stars.

The **Bullet Cluster** (1E 0657-56) is the cleanest demonstration. Two clusters collided; the gas, which dominates the baryons, was shocked and left behind at the centre (seen by Chandra), while weak lensing shows the mass peaks coincide with the galaxies that passed through unimpeded. Mass is where the collisionless component is, not where the baryons are, which no modification of gravity sourced by the visible matter reproduces.

Finally the **CMB** (module 6) measures the baryon density from the acoustic peak heights, $\\Omega_b h^2 = 0.0224$, and the total matter density from the peak positions and damping, $\\Omega_m h^2 = 0.143$: five-sixths of the matter is non-baryonic, independent of any astrophysical modelling. Big-bang nucleosynthesis gives the same $\\Omega_b$.

**MOND** (modified Newtonian dynamics) fits rotation curves with one parameter and predicts the tight baryonic Tully-Fisher relation naturally, which is a genuine challenge for halo models; but it fails on clusters, the Bullet Cluster and the CMB without adding dark matter anyway. Read the Bertone & Hooper history for the narrative and work through the SPARC decomposition, which shows how little the halo parameters are constrained by a rotation curve alone.`,
          resources: [
            {
              title: 'Bertone & Hooper (2018), History of dark matter',
              url: 'https://arxiv.org/abs/1605.04909',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Reviews of Modern Physics; a readable account of every line of evidence.',
              primary: true,
            },
            {
              title: 'SPARC: Spitzer Photometry and Accurate Rotation Curves',
              url: 'http://astroweb.cwru.edu/SPARC/',
              type: 'dataset',
              cost: 'free',
              provider: 'Case Western Reserve University',
              note: 'Rotation curves and 3.6-micron photometry for 175 galaxies, with stellar and gas contributions tabulated.',
            },
            {
              title: 'Clowe et al. (2006), A direct empirical proof of the existence of dark matter',
              url: 'https://arxiv.org/abs/astro-ph/0608407',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The Bullet Cluster paper; short and decisive.',
            },
            {
              title: 'Chandra image: 1E 0657-56, the Bullet Cluster',
              url: 'https://chandra.harvard.edu/photo/2006/1e0657/',
              type: 'article',
              cost: 'free',
              provider: 'Chandra X-ray Center',
            },
            {
              title: 'Rubin & Ford (1970), Rotation of the Andromeda Nebula from a spectroscopic survey of emission regions',
              url: 'https://ui.adsabs.harvard.edu/abs/1970ApJ...159..379R',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
            },
          ],
          exercises: [
            {
              slug: 'sparc-decomposition',
              title: 'Decompose SPARC rotation curves',
              prompt:
                'Download the SPARC rotation-curve table. For NGC 2403, NGC 3198 and DDO 154, plot the observed v(R) with the tabulated stellar-disk and gas contributions (scale the disk by a mass-to-light ratio of 0.5 at 3.6 micron). Fit the residual v_halo^2 = v_obs^2 - v_star^2 - v_gas^2 with an NFW halo (two parameters) and with a pseudo-isothermal cored halo. Report the best-fit parameters and chi-square and discuss the core-cusp question for the dwarf DDO 154.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'coma-virial-mass',
              title: 'Zwicky\'s Coma argument with modern numbers',
              prompt:
                'Using SDSS or NED redshifts of about 500 galaxies within 1.5 degrees of the Coma cluster centre (RA 194.95, Dec 27.98; cz between 4000 and 10,000 km/s), compute the line-of-sight velocity dispersion with sigma clipping and the projected virial mass M = (3 pi N / 2G) sigma^2 / sum(1/R_ij) (or the simpler 5 sigma^2 R / G). Compare with the total r-band luminosity of the members to get M/L. Then compare with the X-ray hydrostatic mass from the literature (about 1e15 M_sun within 2 Mpc).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'hydrostatic-cluster-mass',
              title: 'Cluster mass from X-ray gas',
              prompt:
                'A relaxed cluster has an isothermal gas at kT = 7 keV with a beta-model density rho proportional to [1 + (r/r_c)^2]^(-3 beta / 2), r_c = 250 kpc, beta = 0.7. Derive M(<r) from hydrostatic equilibrium and evaluate it at 1 Mpc. Compare with the gas mass (central density 1e-2 cm^-3) and a stellar mass of 1e13 M_sun. What fraction is dark?',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a flat rotation curve imply dark matter rather than, say, a massive outer stellar disk?',
              answerOutline:
                'The required mass grows linearly with radius where surface brightness has fallen exponentially; the implied M/L in the outer parts would be hundreds, far above any stellar population.',
            },
            {
              question: 'What makes the Bullet Cluster a critical test?',
              answerOutline:
                'The lensing mass peaks are displaced from the dominant baryonic component (the hot gas), so the gravitating mass cannot be the visible matter under any modified force law.',
            },
            {
              question: 'How does the CMB tell us dark matter is non-baryonic?',
              answerOutline:
                'The relative heights of the odd and even acoustic peaks fix the baryon density at about 5% of critical, while the overall peak structure needs a total matter density of about 31%.',
            },
          ],
        },
        {
          slug: 'gravitational-lensing',
          title: 'Gravitational lensing',
          summary:
            'Light deflection, the lens equation, Einstein radii, strong lensing of quasars and arcs, weak lensing shear and microlensing: mass measurement without dynamics.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the Einstein radius for a point mass and a singular isothermal sphere',
            'Write the lens equation and explain multiple images, magnification and time delays',
            'Explain how weak-lensing shear measures the projected mass of clusters and the cosmic shear power spectrum',
            'Describe microlensing and its use for MACHO searches and exoplanets',
          ],
          concepts: [
            'Deflection angle alpha = 4 G M / (b c^2)',
            'Lens equation; convergence kappa and shear gamma',
            'Einstein radius theta_E',
            'Strong lensing: multiple images, arcs, rings',
            'Time delays and H_0 (time-delay cosmography)',
            'Weak lensing: tangential shear, mass reconstruction, cosmic shear',
            'Microlensing light curves; MACHO constraints',
            'Critical surface density Sigma_cr',
          ],
          explanation: `General relativity bends light by twice the Newtonian value, $\\hat\\alpha = 4GM/bc^2$ for impact parameter $b$ (1.75 arcsec at the solar limb), and because deflection depends only on mass, lensing weighs galaxies and clusters with no assumption about dynamical state or the nature of the mass. The **lens equation** relates the true source position $\\beta$ to the observed image position $\\theta$: $\\beta = \\theta - \\alpha(\\theta)$, with $\\alpha$ the scaled deflection. For a point mass or any circular lens, a source directly behind it is imaged as a ring of **Einstein radius**

$$ \\theta_E = \\sqrt{\\frac{4GM}{c^2}\\,\\frac{D_{ls}}{D_l D_s}}, $$

about 1 arcsec for a galaxy ($10^{11}\\,M_\\odot$) and 30 arcsec for a cluster. For a singular isothermal sphere $\\theta_E = 4\\pi(\\sigma/c)^2 D_{ls}/D_s$, so the Einstein radius of a lensed quasar measures the velocity dispersion of the lensing galaxy directly. A surface density above the **critical density** $\\Sigma_{cr} = c^2 D_s/(4\\pi G D_l D_{ls})$ produces multiple images: **strong lensing**, seen as double and quadruple quasars, giant arcs and Einstein rings. Different images have different path lengths, and the **time delay** between them scales as $H_0^{-1}$, which makes lensed quasars and supernovae an independent route to the Hubble constant.

Most lines of sight are only weakly lensed. Each background galaxy is slightly stretched tangentially around a foreground mass; averaging the **shear** $\\gamma$ over thousands of galaxies reconstructs the projected mass map of a cluster (the Bullet Cluster map was made this way) and, over the whole sky, the **cosmic shear** power spectrum measures the amplitude of matter clustering $S_8 = \\sigma_8\\sqrt{\\Omega_m/0.3}$. Shape measurement is fiendishly hard (the atmosphere and optics distort images by more than the signal), which is why Euclid and Rubin were built the way they were.

**Microlensing** occurs when a star in the Milky Way or LMC passes behind a compact object: the images are unresolved but the magnification produces a symmetric achromatic light curve lasting weeks. The MACHO and EROS surveys found too few events for the halo to be made of compact objects between $10^{-7}$ and $10\\,M_\\odot$, ruling out the most conservative dark-matter candidate; the same technique now discovers planets. Read the Bartelmann & Schneider review (sections 2-4), then do the exercises, which include your own weak-lensing mass of a cluster from public catalogues.`,
          resources: [
            {
              title: 'Bartelmann & Schneider (2001), Weak gravitational lensing',
              url: 'https://arxiv.org/abs/astro-ph/9912508',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Physics Reports; sections 2-4 are the standard introduction to lensing theory.',
              primary: true,
            },
            {
              title: 'Kilbinger (2015), Cosmology with cosmic shear observations: a review',
              url: 'https://arxiv.org/abs/1411.0115',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'OpenStax Astronomy 2e — 24.5 Black Holes (and 28.2 on lensing)',
              url: 'https://openstax.org/books/astronomy-2e/pages/28-1-observations-of-distant-galaxies',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Chapter 28 contains the descriptive treatment of gravitational lensing by clusters.',
            },
            {
              title: 'OGLE — Optical Gravitational Lensing Experiment',
              url: 'https://ogle.astrouw.edu.pl/',
              type: 'dataset',
              cost: 'free',
              provider: 'Warsaw University Observatory',
              note: 'Real microlensing event light curves (OGLE Early Warning System) for the fitting exercise.',
            },
          ],
          exercises: [
            {
              slug: 'einstein-radius-derivation',
              title: 'Einstein radii',
              prompt:
                'Derive the Einstein radius for a point mass from the lens equation and for a singular isothermal sphere using its deflection alpha = 4 pi (sigma/c)^2 D_ls / D_s. Evaluate (using astropy.cosmology angular-diameter distances) theta_E for: a 1 M_sun star at 4 kpc lensing a bulge star at 8 kpc; a sigma = 250 km/s galaxy at z = 0.3 lensing a quasar at z = 2; a 1e15 M_sun cluster at z = 0.2 lensing a galaxy at z = 1. Compare with the resolution of ground telescopes and HST.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'microlensing-fit',
              title: 'Fit a microlensing light curve',
              prompt:
                'Download an OGLE microlensing event light curve (from the OGLE EWS archive). Fit the Paczynski model A(u) = (u^2 + 2)/(u sqrt(u^2 + 4)), u(t) = sqrt(u_0^2 + ((t - t_0)/t_E)^2), with blending, using scipy or emcee. Report t_E and estimate the lens mass for assumed distances and transverse velocity (D_l = 4 kpc, D_s = 8 kpc, v = 200 km/s). Explain the mass-distance-velocity degeneracy.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'weak-lensing-cluster-mass',
              title: 'A weak-lensing cluster mass',
              prompt:
                'Using a public shear catalogue (for example the HSC or KiDS/DES public releases, or the simulated catalogue in the astropy tutorials if access is difficult), select galaxies behind a known cluster (e.g. Abell 1689 or a cluster in the survey footprint), compute the tangential shear in radial bins around the cluster centre, and fit an NFW or SIS profile to gamma_t(R). Report the mass within 1 Mpc and compare with the X-ray or dynamical mass from the literature. Show the cross shear is consistent with zero as a null test.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is lensing a cleaner mass probe than dynamics?',
              answerOutline:
                'Deflection depends only on the mass distribution along the line of sight, with no assumptions about equilibrium, anisotropy or the nature of the mass.',
            },
            {
              question: 'What determines whether a lens produces multiple images?',
              answerOutline:
                'The surface mass density must exceed the critical density Sigma_cr somewhere; equivalently the source must lie within the Einstein radius (for an SIS).',
            },
            {
              question: 'How is a microlensing event distinguished from a variable star?',
              answerOutline:
                'It is achromatic, symmetric in time, non-repeating and follows the Paczynski magnification curve.',
            },
          ],
          relatedLessons: ['relativity/experimental-tests/classical-tests-and-the-ppn-framework'],
        },
        {
          slug: 'dark-matter-halos-and-simulations',
          title: 'Dark-matter halos and N-body simulations',
          summary:
            'How cold dark matter clusters: the NFW profile, concentration, substructure, the halo mass function and what we learn from Millennium, Illustris and friends.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the NFW profile, its parameters and the concentration-mass relation',
            'Explain how N-body simulations are set up and what resolution limits them',
            'Describe the halo mass function and subhalo population predicted by cold dark matter',
            'Query a public simulation database and measure a halo density profile',
          ],
          concepts: [
            'Cold dark matter: collisionless, non-relativistic at decoupling',
            'Virial radius and mass: M_200, r_200',
            'NFW profile and concentration c = r_200 / r_s',
            'Concentration-mass relation and assembly history',
            'N-body methods: tree, particle-mesh, softening',
            'Halo finders and merger trees',
            'Halo mass function (Press-Schechter, Sheth-Tormen)',
            'Subhalos, satellites, and the cosmic web',
          ],
          explanation: `If dark matter is **cold** (non-relativistic when it decoupled) and collisionless, its only interaction is gravity, and its behaviour can be computed from first principles by following $N$ particles in an expanding box. Such **N-body simulations**, from the Millennium Run ($10^{10}$ particles) to today's trillion-particle boxes, are the bridge between the smooth early Universe seen in the CMB and the galaxies around us. They use tree or particle-mesh methods to compute forces in $O(N\\log N)$ time, soften gravity on small scales to avoid artificial two-body scattering, and start from Gaussian initial conditions whose power spectrum comes from CMB physics (module 6).

Their first robust prediction is the structure of **halos**. Navarro, Frenk and White found that halos of every mass have the same density profile,

$$ \\rho(r) = \\frac{\\rho_s}{(r/r_s)(1 + r/r_s)^2}, $$

cuspy as $r^{-1}$ inside and falling as $r^{-3}$ outside the scale radius $r_s$. Halos are characterised by the mass $M_{200}$ inside the radius where the mean density is 200 times critical and by the **concentration** $c = r_{200}/r_s$, which is about 10 for galaxies and 4 for clusters because low-mass halos formed earlier when the Universe was denser. The profile is a consequence of hierarchical collapse, not of any special physics.

The second prediction is the **halo mass function**, the number density of halos per mass interval. Press and Schechter derived it in 1974 by asking what fraction of the linear density field, smoothed on mass scale $M$, exceeds the collapse threshold $\\delta_c = 1.686$; the result, $dn/dM \\propto M^{-2}$ at low mass with an exponential cut-off at the mass where $\\sigma(M) \\approx \\delta_c$, matches simulations to within a factor of two and is refined by Sheth-Tormen and empirical fits. It predicts a Universe full of small halos: a Milky Way halo should contain thousands of **subhalos** above $10^7\\,M_\\odot$, far more than the $\\sim 60$ known satellites, a discrepancy explored in the next lesson.

The simulations also show the **cosmic web** of filaments, sheets and voids, with halos at the nodes, which is exactly what galaxy surveys see. Read the NFW paper and the Millennium overview, then query the IllustrisTNG database in the exercise to measure a halo profile and the mass function yourself.`,
          resources: [
            {
              title: 'Navarro, Frenk & White (1997), A universal density profile from hierarchical clustering',
              url: 'https://arxiv.org/abs/astro-ph/9611107',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              primary: true,
            },
            {
              title: 'IllustrisTNG public data release',
              url: 'https://www.tng-project.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'TNG Collaboration',
              note: 'Register for an API key; group catalogues and particle cut-outs for the exercises. TNG100-1-Dark is the pure N-body run.',
            },
            {
              title: 'Press & Schechter (1974), Formation of galaxies and clusters of galaxies by self-similar gravitational condensation',
              url: 'https://ui.adsabs.harvard.edu/abs/1974ApJ...187..425P',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
            },
            {
              title: 'MIT OCW 8.902 Astrophysics II',
              url: 'https://ocw.mit.edu/courses/8-902-astrophysics-ii-fall-2004/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on structure formation and halo models.',
            },
          ],
          exercises: [
            {
              slug: 'nfw-properties',
              title: 'Properties of the NFW profile',
              prompt:
                'Derive M(<r), v_c(r) and the gravitational potential of an NFW halo. Show that the mass diverges logarithmically and that v_c peaks at r about 2.16 r_s. For a Milky Way-like halo (M_200 = 1e12 M_sun, c = 10) compute r_200, r_s, v_max, and the local dark-matter density at 8.2 kpc; compare with 0.01 M_sun/pc^3. Repeat for a cluster (M_200 = 1e15, c = 4).',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'tng-halo-profile',
              title: 'Measure a halo profile in IllustrisTNG',
              prompt:
                'Using the TNG web API (illustris_python or direct HTTP requests), download the dark-matter particle cut-out of a Milky Way-mass halo (M_200 about 1e12) from TNG100-1-Dark at z = 0. Compute the spherically averaged density profile in logarithmic bins and fit an NFW profile. Report c and compare with the concentration-mass relation (c about 10 at 1e12). Then plot the profile of a 1e14 halo on the same axes scaled by r_200 to show universality.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'halo-mass-function',
              title: 'The halo mass function from a simulation and from Press-Schechter',
              prompt:
                'From the TNG100-1-Dark group catalogue, build the halo mass function dn/dlog M at z = 0 and z = 2 (box volume 75^3 (Mpc/h)^3). Implement the Press-Schechter mass function using sigma(M) computed with a CAMB or colossus linear power spectrum, and overplot it. Comment on the low-mass slope, the exponential cut-off, and how the characteristic mass evolves with redshift.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are low-mass halos more concentrated than high-mass ones?',
              answerOutline:
                'They collapsed earlier, when the mean density of the Universe was higher, so their inner regions are denser relative to the present-day virial density.',
            },
            {
              question: 'What does Press-Schechter theory assume and what does it predict?',
              answerOutline:
                'Regions of the linearly extrapolated Gaussian density field above delta_c = 1.686 (smoothed on mass M) collapse into halos of mass M; it predicts a power-law mass function with an exponential cut-off at the nonlinear mass scale.',
            },
            {
              question: 'What is force softening and why is it needed?',
              answerOutline:
                'Gravity is suppressed below a small length so that simulation particles, each representing many real dark-matter particles, do not scatter off one another artificially.',
            },
          ],
        },
        {
          slug: 'dark-matter-candidates-and-small-scale-challenges',
          title: 'Dark-matter candidates and the small-scale challenges',
          summary:
            'WIMPs, axions, sterile neutrinos and primordial black holes; the direct, indirect and collider searches; and the missing-satellite, core-cusp and too-big-to-fail problems.',
          estimatedMinutes: 90,
          objectives: [
            'List the main particle candidates and the arguments for each',
            'Explain the thermal-relic abundance calculation and the WIMP miracle',
            'Summarise the status of direct, indirect and collider searches',
            'Describe the small-scale challenges to cold dark matter and the proposed baryonic and non-baryonic solutions',
          ],
          concepts: [
            'Thermal relic freeze-out; <sigma v> about 3e-26 cm^3/s',
            'WIMPs, axions, sterile neutrinos, primordial black holes',
            'Hot vs warm vs cold dark matter and free streaming',
            'Direct detection: nuclear recoils, annual modulation, neutrino floor',
            'Indirect detection: gamma rays, antimatter, Galactic-centre excess',
            'Missing satellites, core-cusp, too-big-to-fail',
            'Baryonic feedback and supernova-driven cores',
            'Self-interacting and fuzzy dark matter',
          ],
          explanation: `Cosmology says what dark matter does, not what it is. Any candidate must be non-baryonic (BBN and CMB), cold or at most warm (hot candidates like standard neutrinos free-stream and erase small-scale structure, giving a top-down formation sequence contradicted by observation), stable on Hubble timescales, and nearly collisionless. The classic candidate is a **WIMP**: a weakly interacting massive particle of 10 GeV to 10 TeV that was in thermal equilibrium in the early Universe and **froze out** when annihilation could no longer keep pace with expansion. The relic density then depends only on the annihilation cross-section, $\\Omega_\\chi h^2 \\approx 3 \\times 10^{-27}\\,\\mathrm{cm^3\\,s^{-1}}/\\langle\\sigma v\\rangle$, and a weak-scale cross-section gives the observed 0.12: the "WIMP miracle". **Axions** (very light bosons from the strong-CP problem, behaving as cold dark matter via coherent oscillations), **sterile neutrinos** (keV-scale, warm) and **primordial black holes** are the main alternatives.

Searches proceed three ways. **Direct detection** looks for nuclear recoils from halo WIMPs in deep-underground detectors (xenon time-projection chambers have reached $10^{-47}$ cm$^2$ at 30 GeV, approaching the floor set by coherent neutrino scattering); the DAMA annual-modulation claim remains unconfirmed. **Indirect detection** looks for annihilation products: Fermi-LAT gamma rays from dwarf spheroidals set limits below the thermal cross-section for masses under 100 GeV, while an excess from the Galactic centre is probably millisecond pulsars. **Collider** searches look for missing energy. Axion haloscopes (ADMX) are scanning the natural mass window.

Meanwhile CDM faces **small-scale challenges**. Simulations predict thousands of subhalos but the Milky Way has tens of satellites (**missing satellites**); dwarf galaxies prefer cored rather than cuspy profiles (**core-cusp**); and the most massive simulated subhalos are too dense to host the observed satellites (**too big to fail**). Baryonic physics resolves much of this: reionisation and supernova feedback keep most small halos dark, and repeated gas blow-outs transfer energy to the dark matter, turning cusps into cores in dwarfs. Alternatives such as self-interacting or ultralight "fuzzy" dark matter remain viable. Read the Bullock & Boylan-Kolchin review and the Particle Data Group dark-matter review; the exercise computes a freeze-out abundance yourself.`,
          resources: [
            {
              title: 'Bullock & Boylan-Kolchin (2017), Small-scale challenges to the Lambda-CDM paradigm',
              url: 'https://arxiv.org/abs/1707.04256',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; the definitive account of the problems and proposed solutions.',
              primary: true,
            },
            {
              title: 'Particle Data Group — Reviews (Dark Matter)',
              url: 'https://pdg.lbl.gov/',
              type: 'article',
              cost: 'free',
              provider: 'PDG',
              note: 'Find the "Dark matter" review under Reviews, Tables, Plots; updated every two years with the latest limits.',
            },
            {
              title: 'Bertone & Hooper (2018), History of dark matter',
              url: 'https://arxiv.org/abs/1605.04909',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Fermi Gamma-ray Space Telescope — data access',
              url: 'https://fermi.gsfc.nasa.gov/ssc/data/access/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'LAT photon data for the dwarf-spheroidal annihilation limit exercise.',
            },
          ],
          exercises: [
            {
              slug: 'freeze-out-calculation',
              title: 'WIMP freeze-out',
              prompt:
                'Solve the Boltzmann equation for the comoving number density Y = n/s of a Majorana WIMP of mass 100 GeV with <sigma v> = 3e-26 cm^3/s numerically (use the standard form dY/dx = -(lambda/x^2)(Y^2 - Y_eq^2) with x = m/T). Find the freeze-out temperature x_f and the relic Omega h^2. Vary <sigma v> by a factor of 10 each way and show Omega is inversely proportional to it. Explain the WIMP miracle.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'fermi-dwarf-limit',
              title: 'Gamma-ray limit from a dwarf galaxy',
              prompt:
                'Download Fermi-LAT photons (1-100 GeV, 10 years) within 1 degree of the Draco dwarf spheroidal using the LAT data server, and the same for a nearby blank control region. Compare the counts. Using the J-factor of Draco (log J about 18.8 GeV^2 cm^-5) and the expected annihilation spectrum per annihilation for b-bbar at 100 GeV (approximate with a published parametrisation), derive a rough upper limit on <sigma v> from the absence of excess counts. Compare with the thermal cross-section.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'small-scale-problems-essay',
              title: 'Are the small-scale problems real?',
              prompt:
                'Write a two-page essay on the missing-satellites, core-cusp and too-big-to-fail problems: state each quantitatively, explain how reionisation and supernova feedback address them, and describe one observation (for example, the Milky Way satellite census from DES/Gaia, or the rotation curves of low-surface-brightness galaxies) that could distinguish baryonic solutions from alternative dark-matter physics.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can standard neutrinos not be the dark matter?',
              answerOutline:
                'They are hot: relativistic at decoupling, they free-stream and erase structure below supercluster scales, contradicting the observed bottom-up formation; their mass is also too small (Omega_nu < 0.01).',
            },
            {
              question: 'What sets a thermal relic\'s abundance?',
              answerOutline:
                'The annihilation cross-section: freeze-out occurs when the annihilation rate drops below the expansion rate, leaving Omega inversely proportional to <sigma v>.',
            },
            {
              question: 'How can supernova feedback change the dark-matter profile?',
              answerOutline:
                'Repeated rapid gas outflows change the potential on timescales shorter than orbital periods, irreversibly transferring energy to dark-matter orbits and flattening the central cusp into a core.',
            },
          ],
        },
      ],
      project: {
        slug: 'rotation-curve-halo-fits',
        title: 'Module project: halo fits to the SPARC sample',
        description:
          'Fit NFW and cored halos plus stellar and gas disks to all 175 SPARC rotation curves with a consistent Bayesian approach (free mass-to-light ratio with a prior). Derive the distributions of concentration and halo mass, test the concentration-mass relation from simulations, and reproduce the baryonic Tully-Fisher relation and the radial-acceleration relation.',
        deliverables: [
          'A fitting pipeline with per-galaxy corner plots for a few examples',
          'Plots of c-M_200, baryonic Tully-Fisher and radial-acceleration relations with the fitted sample',
          'A short report on which halo model is preferred and the core-cusp evidence in dwarfs',
        ],
        estimatedHours: 12,
      },
    },
    {
      slug: 'galaxy-formation-and-evolution',
      title: 'Galaxy Formation and Evolution',
      description:
        'How galaxies grow inside dark-matter halos: the growth of perturbations, gas cooling and star formation, feedback from supernovae and black holes, and the observed history of cosmic star formation.',
      lessons: [
        {
          slug: 'linear-growth-and-halo-collapse',
          title: 'Linear growth of perturbations and spherical collapse',
          summary:
            'How small density fluctuations grow in an expanding Universe, the growth factor, the spherical-collapse model and the virial overdensity that defines a halo.',
          estimatedMinutes: 100,
          objectives: [
            'Derive the linear growth equation for matter perturbations and its solutions in matter- and Lambda-dominated eras',
            'Explain why growth stalls during radiation domination and in a Lambda-dominated Universe',
            'Work through the spherical top-hat collapse model to obtain delta_c = 1.686 and Delta_vir about 178',
            'Compute sigma_8 and sigma(M) from a linear power spectrum',
          ],
          concepts: [
            'Density contrast delta = delta rho / rho',
            'Linear growth equation and the growth factor D(a)',
            'Meszaros effect: stalled growth during radiation domination',
            'Growth suppression by dark energy; f = d ln D / d ln a about Omega_m^0.55',
            'Spherical top-hat collapse; turnaround; virialisation',
            'Critical overdensity delta_c = 1.686; virial overdensity about 178',
            'sigma(M) and sigma_8',
            'Jeans mass for baryons after recombination',
          ],
          explanation: `Structure grows from the tiny ($10^{-5}$) density fluctuations seen in the CMB by gravitational instability. For a pressureless fluid in an expanding background, perturbation theory of the fluid equations gives, for the **density contrast** $\\delta = \\delta\\rho/\\bar\\rho$ on sub-horizon scales,

$$ \\ddot\\delta + 2H\\dot\\delta = 4\\pi G\\bar\\rho_m\\,\\delta. $$

The Hubble drag term $2H\\dot\\delta$ is what makes cosmological growth slow: in a matter-dominated Universe $\\delta \\propto a$ (compared with exponential growth in a static medium), so fluctuations have grown by only $\\sim 10^3$ since recombination, and the $10^{-5}$ CMB amplitude is exactly what is needed to reach nonlinearity today. During **radiation domination** the expansion is too fast for matter to cluster (the Meszaros effect), which imprints the turnover in the matter power spectrum at the scale that entered the horizon at matter-radiation equality. When **dark energy** dominates, growth slows again: the growing mode freezes out, and the growth rate $f = d\\ln D/d\\ln a \\approx \\Omega_m(a)^{0.55}$ is a key test of general relativity on large scales.

Linear theory cannot describe halos, but the **spherical top-hat** model can be solved exactly: an overdense sphere behaves like a closed mini-universe, expands, reaches turnaround at $\\delta_{turn} \\approx 4.55$ (nonlinear), and collapses. Formally it collapses to a point when the *linearly extrapolated* density contrast reaches $\\delta_c = 1.686$; in reality it virialises at half the turnaround radius with mean density $\\Delta_{vir} \\approx 178$ times the background (hence "$M_{200}$"). The number 1.686 is the threshold in Press-Schechter theory, and these two numbers define what a halo is throughout the field.

Statistically, the field is characterised by its variance smoothed on mass scale $M$, $\\sigma^2(M) = \\int \\Delta^2(k)\\,W^2(kR)\\,d\\ln k$; the value on 8 $h^{-1}$ Mpc, $\\sigma_8 \\approx 0.81$, normalises the whole hierarchy. Read Tong's cosmology notes chapter on structure formation and MIT 8.942; the exercises implement both the growth factor and the top-hat collapse numerically.`,
          resources: [
            {
              title: 'Tong — Lectures on Cosmology (Cambridge)',
              url: 'https://www.damtp.cam.ac.uk/user/tong/cosmo.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
              note: 'Chapter on structure formation: linear perturbations, growth and spherical collapse.',
              primary: true,
            },
            {
              title: 'MIT OCW 8.942 Cosmology',
              url: 'https://ocw.mit.edu/courses/8-942-cosmology-fall-2001/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Problem sets on perturbation growth and the spherical collapse model.',
            },
            {
              title: 'CAMB documentation (Python)',
              url: 'https://camb.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'Antony Lewis',
              note: 'Compute linear matter power spectra, growth factors and sigma_8 for any cosmology.',
            },
          ],
          exercises: [
            {
              slug: 'growth-factor',
              title: 'Compute the growth factor',
              prompt:
                'Integrate the linear growth equation numerically for flat Lambda-CDM (Omega_m = 0.31) from a = 1e-3 to 1, normalising D(a) = a at early times. Plot D(a)/a and the growth rate f(a) and compare the latter with Omega_m(a)^0.55. Repeat for an Einstein-de Sitter Universe and an open Universe (Omega_m = 0.31, no Lambda). By what factor is growth suppressed today in each case relative to Einstein-de Sitter?',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'spherical-collapse',
              title: 'Spherical top-hat collapse',
              prompt:
                'Solve the parametric solution of a closed sphere in an Einstein-de Sitter background: r = A(1 - cos theta), t = B(theta - sin theta). Show that the nonlinear density contrast at turnaround (theta = pi) is 9 pi^2 / 16 - 1 = 4.55, that the linearly extrapolated contrast at collapse (theta = 2 pi) is (3/20)(12 pi)^(2/3) = 1.686, and that the virialised density (r = r_turn / 2 at t = t_collapse) is 18 pi^2 = 178 times the background.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'sigma-of-m',
              title: 'sigma(M) and sigma_8 from CAMB',
              prompt:
                'With CAMB compute the z = 0 linear matter power spectrum for Planck 2018 parameters. Compute sigma(R) with a top-hat window for R from 0.1 to 100 Mpc/h and verify sigma_8 about 0.81. Convert to sigma(M) and find the mass where sigma(M) = delta_c (the nonlinear mass M_* today, expect about 1e13 M_sun) and at z = 2 using D(a) from the first exercise.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do perturbations grow only as a power of the scale factor rather than exponentially?',
              answerOutline:
                'The Hubble expansion acts as a friction term (2H delta-dot) in the growth equation, so the Jeans-type instability is slowed to power-law growth, delta proportional to a in matter domination.',
            },
            {
              question: 'What do delta_c = 1.686 and Delta_vir = 178 represent?',
              answerOutline:
                'delta_c is the linear-theory density contrast at the moment a spherical perturbation collapses; Delta_vir is the actual mean overdensity of the virialised halo relative to the background.',
            },
            {
              question: 'Why does dark energy suppress the growth of structure?',
              answerOutline:
                'Accelerated expansion increases the Hubble drag relative to the gravitational source term, freezing the growing mode.',
            },
          ],
        },
        {
          slug: 'gas-cooling-star-formation-and-feedback',
          title: 'Gas cooling, star formation and stellar feedback',
          summary:
            'Why halos and galaxies are different: cooling curves and cooling times, the cold and hot accretion modes, the Kennicutt-Schmidt law, and supernova feedback that keeps small galaxies small.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the cooling function and compute cooling times for halos of different mass and metallicity',
            'Use the White & Rees argument to explain why galaxies occupy a limited mass range',
            'State the Kennicutt-Schmidt relation and the typical star-formation efficiency per free-fall time',
            'Explain why supernova feedback suppresses star formation in low-mass halos and the shape of the stellar-to-halo mass relation',
          ],
          concepts: [
            'Virial temperature of a halo',
            'Cooling function Lambda(T, Z): bremsstrahlung, line cooling, H2',
            'Cooling time vs free-fall time; White & Rees criterion',
            'Cold-mode and hot-mode accretion',
            'Angular momentum and disk formation (spin parameter lambda)',
            'Kennicutt-Schmidt law Sigma_SFR proportional to Sigma_gas^1.4',
            'Supernova feedback; mass loading; galactic winds',
            'Stellar-to-halo mass relation and abundance matching',
          ],
          explanation: `Dark matter makes halos; baryons must cool and condense to make galaxies. Gas falling into a halo shocks to the **virial temperature** $T_{vir} \\approx 36\\,(v_c/\\mathrm{km\\,s^{-1}})^2$ K, about $10^6$ K for a Milky Way halo, and then radiates through the **cooling function** $\\Lambda(T, Z)$: bremsstrahlung above $10^7$ K, collisionally excited metal and hydrogen lines in between, and only molecular hydrogen below $10^4$ K in primordial gas. White and Rees (1978) argued that a galaxy forms only where the **cooling time** $t_{cool} \\propto T/(n\\Lambda)$ is shorter than the free-fall time; because $\\Lambda$ peaks near $10^5$ K and halo density falls with time, efficient cooling is confined to halos below $\\sim 10^{12}\\,M_\\odot$ and to early times. This is the first explanation of the Schechter cut-off: cluster-mass halos hold their gas as a hot, slowly cooling atmosphere. Simulations refine this picture with **cold-mode** accretion along filaments that never shocks, dominant at high redshift and low mass.

Cooling gas retains the angular momentum its halo acquired from tidal torques (spin parameter $\\lambda \\approx 0.04$), and settles into a rotating **disk** of about one-tenth the halo radius, which is the right size. Within the disk, stars form from molecular gas at a rate described by the **Kennicutt-Schmidt law**, $\\Sigma_{SFR} \\propto \\Sigma_{gas}^{1.4}$, equivalent to converting only $\\sim 1\\%$ of the gas per local free-fall time; why star formation is so inefficient is a question of turbulence, magnetic fields and feedback in molecular clouds.

Without feedback, simulations overproduce stars by an order of magnitude and make galaxies in every small halo. **Supernova feedback** fixes the low-mass end: each $M_\\odot$ of stars yields $\\sim 10^{49}$ erg, enough to drive **winds** with mass-loading factors $\\dot M_{wind}/\\dot M_* \\gtrsim 1$ out of halos with $v_c \\lesssim 100$ km s$^{-1}$. The resulting **stellar-to-halo mass relation**, measured by abundance matching (ranking galaxies and halos and pairing them), peaks at only $\\sim 20\\%$ of the baryon budget at $M_h \\approx 10^{12}\\,M_\\odot$ and falls steeply on both sides; the high-mass fall is the subject of the next lesson. Read the Somerville & Dave and Naab & Ostriker reviews; the exercises compute cooling times and reconstruct the stellar-to-halo relation from SDSS and the halo mass function.`,
          resources: [
            {
              title: 'Somerville & Dave (2015), Physical models of galaxy formation in a cosmological framework',
              url: 'https://arxiv.org/abs/1412.2712',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; sections 2-4 on cooling, star formation and feedback.',
              primary: true,
            },
            {
              title: 'Naab & Ostriker (2017), Theoretical challenges in galaxy formation',
              url: 'https://arxiv.org/abs/1612.06891',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'White & Rees (1978), Core condensation in heavy halos: a two-stage theory for galaxy formation and clustering',
              url: 'https://ui.adsabs.harvard.edu/abs/1978MNRAS.183..341W',
              type: 'article',
              cost: 'free',
              provider: 'NASA ADS',
              note: 'The founding paper of modern galaxy-formation theory.',
            },
            {
              title: 'Kennicutt & Evans (2012), Star formation in the Milky Way and nearby galaxies',
              url: 'https://arxiv.org/abs/1204.3552',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; the Kennicutt-Schmidt relation and star-formation efficiencies.',
            },
          ],
          exercises: [
            {
              slug: 'cooling-times',
              title: 'Cooling versus free-fall',
              prompt:
                'Using a tabulated cooling function (e.g. the Sutherland & Dopita 1993 curves, available on VizieR or approximated by Lambda = 1e-22 (T/1e5)^-0.7 + 2e-27 T^0.5 erg cm^3/s for solar metallicity above 1e4 K), compute t_cool and t_ff for halos of 1e9, 1e11, 1e12, 1e13 and 1e15 M_sun at z = 0 and z = 3, assuming gas at the virial temperature with density 200 times the cosmic baryon density times the virial density factor. Plot the t_cool = t_ff line in the mass-redshift plane and discuss where galaxies form.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'stellar-to-halo-mass',
              title: 'Abundance matching',
              prompt:
                'Build the stellar mass function of SDSS galaxies at z about 0.05 (use the MPA-JHU stellar masses via CasJobs, or the published Baldry et al. 2012 fit) and the halo mass function from your Press-Schechter or a Sheth-Tormen implementation. Match cumulative number densities to derive M_*(M_h). Plot M_*/M_h against M_h, mark the cosmic baryon fraction, and identify the peak. Explain the physics at each end.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'supernova-energetics',
              title: 'Can supernovae empty a dwarf galaxy?',
              prompt:
                'A 1e10 M_sun halo (v_c = 40 km/s) contains 1e8 M_sun of gas and forms 1e7 M_sun of stars. With one supernova of 1e51 erg per 100 M_sun of stars, compute the total energy and compare with the binding energy of the gas (approximately M_gas v_c^2). If 10% of the energy couples to the gas, how much can be ejected? Repeat for a Milky Way halo (v_c = 220 km/s) and explain the mass dependence of the stellar-to-halo relation.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the White & Rees argument for an upper mass limit of galaxies?',
              answerOutline:
                'In massive halos the virial temperature is high and density low, so the cooling time exceeds the free-fall (and Hubble) time; gas stays hot and galaxies cannot grow further by cooling.',
            },
            {
              question: 'How efficient is star formation per free-fall time, and what does the Kennicutt-Schmidt law say?',
              answerOutline:
                'About 1% of the gas is converted per local free-fall time; the surface density of star formation scales as the gas surface density to the 1.4 power.',
            },
            {
              question: 'Why is the stellar-to-halo mass ratio low in dwarf galaxies?',
              answerOutline:
                'Supernova-driven winds easily escape shallow potential wells, ejecting gas before it forms stars; reionisation also prevents gas accretion in the smallest halos.',
            },
          ],
        },
        {
          slug: 'black-holes-quenching-and-agn-feedback',
          title: 'Supermassive black holes, quenching and AGN feedback',
          summary:
            'The M-sigma relation, how black holes grow, why massive galaxies stop forming stars, and the radiative and kinetic feedback that keeps cluster cores from cooling.',
          estimatedMinutes: 90,
          objectives: [
            'State the M_BH-sigma and M_BH-M_bulge relations and explain how black-hole masses are measured',
            'Use the Soltan argument to connect quasar light to black-hole mass density',
            'Explain quasar-mode and radio-mode feedback and the cooling-flow problem in clusters',
            'Describe the observational evidence for quenching and the transition to the red sequence',
          ],
          concepts: [
            'Black-hole mass measurement: stellar/gas dynamics, reverberation mapping, megamasers',
            'M_BH-sigma relation: M_BH proportional to sigma^4-5',
            'Soltan argument and radiative efficiency about 0.1',
            'Eddington-limited growth and the e-folding (Salpeter) time',
            'Quasar-mode (radiative) feedback and winds',
            'Radio-mode (kinetic) feedback: jets, bubbles, cooling-flow problem',
            'Quenching: mass quenching vs environmental quenching',
            'Red sequence growth and the green valley',
          ],
          explanation: `Every massive galaxy hosts a central black hole, and its mass correlates tightly with the bulge: $M_{BH} \\approx 0.5\\%\\,M_{bulge}$, and $M_{BH} \\propto \\sigma^{4\\text{-}5}$ with only 0.3 dex scatter (Kormendy & Ho 2013). Masses come from stellar and gas dynamics inside the sphere of influence (HST, now ALMA and adaptive optics), from **reverberation mapping** of broad-line variability in active galaxies, and from water megamasers (NGC 4258, the anchor). The tightness is surprising because a black hole's gravity is negligible beyond a few parsecs; the hole and bulge must have grown together.

**Soltan's argument** shows that the holes grew by accretion: integrating the quasar luminosity function over cosmic time and dividing by a radiative efficiency $\\epsilon \\approx 0.1$ reproduces the local black-hole mass density of $\\sim 4 \\times 10^5\\,M_\\odot$ Mpc$^{-3}$. Eddington-limited growth e-folds on the Salpeter time $t_S = \\epsilon\\,\\sigma_T c/(4\\pi G m_p) \\approx 45$ Myr, so a stellar seed can reach $10^9\\,M_\\odot$ by $z \\sim 6$ only with sustained near-Eddington accretion or heavy seeds, a live problem now that JWST finds overmassive holes at high redshift.

The energy liberated, $\\epsilon M_{BH} c^2 \\sim 10^{61}$ erg for a $10^9\\,M_\\odot$ hole, exceeds the binding energy of its host galaxy by a factor of 100. **AGN feedback** is the field's name for how a small fraction of this couples to the gas. In the **quasar mode**, radiatively driven winds during rapid accretion can expel gas from the galaxy, plausibly ending its star formation; in the **radio mode**, jets from low-accretion-rate holes inflate bubbles in cluster atmospheres (seen beautifully by Chandra in Perseus) and supply exactly the heating needed to offset the radiative cooling that would otherwise deposit hundreds of solar masses per year into the central galaxy, the classical **cooling-flow problem**.

This is the modern explanation for the high-mass end of the stellar-to-halo mass relation and for the existence of the red sequence: galaxies are **quenched** by their black holes above $M_* \\sim 10^{10.5}\\,M_\\odot$ (mass quenching), while satellites are quenched by their environment through ram-pressure and strangulation. Read the Kormendy & Ho and Fabian reviews; the exercises work with the published black-hole sample and Chandra cluster data.`,
          resources: [
            {
              title: 'Kormendy & Ho (2013), Coevolution (or not) of supermassive black holes and host galaxies',
              url: 'https://arxiv.org/abs/1304.7762',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article with the full black-hole mass table used in the exercise.',
              primary: true,
            },
            {
              title: 'Fabian (2012), Observational evidence of active galactic nuclei feedback',
              url: 'https://arxiv.org/abs/1204.4114',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article on radio-mode and quasar-mode feedback.',
            },
            {
              title: 'Chandra X-ray Observatory',
              url: 'https://chandra.harvard.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Chandra X-ray Center',
              note: 'Look at the Perseus and MS 0735 images; the Chandra Data Archive holds the observations for the exercise.',
            },
            {
              title: 'OpenStax Astronomy 2e — 27.1 Quasars (chapter 27)',
              url: 'https://openstax.org/books/astronomy-2e/pages/27-1-quasars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
          ],
          exercises: [
            {
              slug: 'm-sigma-fit',
              title: 'Fit the M-sigma relation',
              prompt:
                'Extract the table of black-hole masses, bulge velocity dispersions and bulge masses from Kormendy & Ho (2013) (available via their arXiv source files or VizieR). Fit log M_BH = alpha + beta log(sigma/200 km/s) with errors in both variables and intrinsic scatter (use a simple Bayesian linear fit). Report beta and the scatter. Repeat against M_bulge and discuss which relation is tighter and what the pseudobulge outliers suggest.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'soltan-argument',
              title: 'The Soltan argument',
              prompt:
                'Using a parametrised bolometric quasar luminosity function (e.g. the Hopkins et al. 2007 double power law; take the parameters from the paper), integrate the total energy radiated by AGN per comoving Mpc^3 over 0 < z < 6. Divide by epsilon c^2 with epsilon = 0.1 to get the accreted black-hole mass density and compare with the local value of about 4e5 M_sun/Mpc^3 obtained from the M-sigma relation and the velocity-dispersion function. What epsilon is needed to match?',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'cooling-flow-problem',
              title: 'The cooling-flow problem in Perseus',
              prompt:
                'The Perseus cluster core has an X-ray luminosity of about 1e45 erg/s within 100 kpc, gas temperature 4 keV and central density 0.05 cm^-3. Compute the cooling time of the central gas and the mass deposition rate Mdot = 2 mu m_p L / (5 k T) that would result if nothing reheated it. Compare with the observed star-formation rate in NGC 1275 (a few tens of M_sun/yr). Then compute the mechanical power of the radio bubbles (two bubbles of radius 7 kpc at pressure 1e-10 erg/cm^3, buoyancy timescale 1e7 yr, energy 4 p V each) and show it can balance the cooling.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the M-sigma relation surprising?',
              answerOutline:
                'The black hole\'s gravitational influence extends only a few parsecs, yet its mass correlates with the kpc-scale bulge, implying a shared growth history or feedback coupling.',
            },
            {
              question: 'What does the Soltan argument establish?',
              answerOutline:
                'That the total mass in local black holes is consistent with growth by radiatively efficient (epsilon about 0.1) accretion during luminous quasar phases.',
            },
            {
              question: 'What is the cooling-flow problem and its resolution?',
              answerOutline:
                'Cluster cores radiate fast enough to cool hundreds of M_sun/yr, yet little cold gas or star formation is seen; mechanical heating by AGN jets (radio-mode feedback) offsets the cooling.',
            },
          ],
        },
        {
          slug: 'galaxy-evolution-across-cosmic-time',
          title: 'Galaxy evolution across cosmic time',
          summary:
            'The cosmic star-formation history, the main sequence of star-forming galaxies, the evolution of mass functions and morphologies, reionisation, and what JWST sees at the frontier.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the cosmic star-formation history (Madau plot) and how it is measured',
            'Explain the star-forming main sequence and the concept of downsizing',
            'Describe the epoch of reionisation and the evidence from quasar spectra and the CMB',
            'Use SDSS and public high-redshift catalogues to measure galaxy evolution quantitatively',
          ],
          concepts: [
            'Star-formation rate indicators: UV, H-alpha, IR, radio',
            'Madau-Dickinson cosmic star-formation history; peak at z about 2',
            'Star-forming main sequence and specific SFR',
            'Downsizing: massive galaxies form first',
            'Lyman-break and photometric-redshift selection',
            'Morphological evolution: clumpy disks, compact quiescent galaxies',
            'Reionisation: Gunn-Peterson trough, CMB optical depth tau = 0.054',
            'JWST and the abundance of early galaxies',
          ],
          explanation: `The integrated history of star formation is one of the best-measured quantities in extragalactic astronomy. Star-formation rates are inferred from rest-frame ultraviolet continuum (young massive stars), H$\\alpha$ (ionising photons), far-infrared (dust-reprocessed light) or radio, each with its own calibration from stellar population synthesis. Combining surveys at every redshift gives the **Madau-Dickinson** curve: the comoving star-formation rate density rose from the first galaxies, peaked at $z \\approx 2$ ("cosmic noon", 10 Gyr ago) at ten times the present value, and has declined since. Half of all stars that exist formed before $z = 1.3$; the Universe is well past its prime. Integrating the curve with a stellar initial mass function and return fraction reproduces the growth of the stellar mass density, a strong consistency test, provided about half of the high-redshift star formation is dust-obscured.

At any epoch, star-forming galaxies lie on a **main sequence** $SFR \\propto M_*^{\\sim 0.8}$ with 0.3 dex scatter, whose normalisation falls by a factor of 20 from $z = 2$ to today, while starbursts (mergers) sit above it and quiescent galaxies far below. The massive galaxies left the sequence first (**downsizing**): most $10^{11}\\,M_\\odot$ galaxies were already quenched and compact by $z \\sim 2$, and have since grown in size by minor mergers.

The earliest epoch is seen through hydrogen. Before $z \\approx 6$ the intergalactic medium was neutral and absorbed everything blueward of Lyman-$\\alpha$ (the **Gunn-Peterson trough** in quasar spectra); Thomson scattering of CMB photons off the freed electrons gives an optical depth $\\tau = 0.054$, implying reionisation was half complete at $z \\approx 7.7$, driven mostly by faint star-forming galaxies. JWST now routinely confirms galaxies at $z > 10$ and finds more luminous ones than most models predicted, perhaps because early star formation is burstier or more efficient. Read the Madau & Dickinson and Fan et al. reviews and reproduce the Madau plot in the exercise from published tables; the SDSS exercise measures the local main sequence directly.`,
          resources: [
            {
              title: 'Madau & Dickinson (2014), Cosmic star-formation history',
              url: 'https://arxiv.org/abs/1403.0007',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; table 1 has the compiled SFR densities for the exercise.',
              primary: true,
            },
            {
              title: 'Fan, Carilli & Keating (2006), Observational constraints on cosmic reionization',
              url: 'https://arxiv.org/abs/astro-ph/0602375',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'JWST User Documentation',
              url: 'https://jwst-docs.stsci.edu/',
              type: 'documentation',
              cost: 'free',
              provider: 'STScI',
              note: 'Instrument capabilities; public JWST data are in MAST.',
            },
            {
              title: 'SDSS CasJobs',
              url: 'https://skyserver.sdss.org/casjobs/',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'The MPA-JHU galSpecExtra table provides stellar masses and star-formation rates for the main-sequence exercise.',
            },
          ],
          exercises: [
            {
              slug: 'madau-plot',
              title: 'Reproduce the Madau plot',
              prompt:
                'Take the UV and IR star-formation-rate densities compiled in Madau & Dickinson (2014) table 1 and plot them against redshift and against lookback time (astropy.cosmology). Fit their functional form psi(z) = 0.015 (1 + z)^2.7 / (1 + [(1 + z)/2.9]^5.6) and integrate it (with a return fraction of 0.27) to obtain the stellar mass density versus redshift; compare with the measured value at z = 0 of about 5e8 M_sun/Mpc^3 and find the redshift by which half of all stars had formed.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sdss-main-sequence',
              title: 'The star-forming main sequence in SDSS',
              prompt:
                'In CasJobs, join galSpecExtra (lgm_tot_p50, sfr_tot_p50) with galSpecInfo for 0.02 < z < 0.08 and extract 100,000 galaxies. Plot log SFR against log M_* as a 2D histogram; identify the main sequence and the quiescent cloud. Fit the ridge line of the main sequence and report its slope and scatter. Compute the quenched fraction as a function of stellar mass and show it rises steeply above 10^10.5 M_sun.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'reionisation-budget',
              title: 'Can galaxies reionise the Universe?',
              prompt:
                'The critical star-formation rate density to maintain ionisation is psi_crit about 0.05 (1 + z)^3 (C/3) (0.2/f_esc) M_sun/yr/Mpc^3 (approximately, from Madau et al. 1999 scaled). Compare with the observed Madau-Dickinson value at z = 6, 7 and 8, for escape fractions of 0.05, 0.1 and 0.2 and clumping factor C = 3. Then compute the Thomson optical depth to z = 7.7 for an instantaneous reionisation and compare with the Planck tau = 0.054.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When was the cosmic star-formation rate highest, and by how much has it declined?',
              answerOutline:
                'At z about 2 (10 Gyr ago), and it has declined by about a factor of 10 since.',
            },
            {
              question: 'What is downsizing?',
              answerOutline:
                'The most massive galaxies formed their stars earliest and fastest and quenched first, while lower-mass galaxies continue to form stars today; this runs opposite to the hierarchical growth of halos.',
            },
            {
              question: 'What two independent observations date reionisation?',
              answerOutline:
                'The appearance of the Gunn-Peterson trough in quasar spectra at z > 6, and the Thomson optical depth of the CMB, tau = 0.054, implying a midpoint at z about 7.7.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/stellar-populations-and-binaries/star-clusters-and-stellar-populations'],
        },
      ],
    },
    {
      slug: 'the-expanding-universe',
      title: 'The Expanding Universe',
      description:
        'Hubble\'s law and the distance ladder, the Friedmann equations, cosmological distances and ages, and the supernova discovery of acceleration.',
      lessons: [
        {
          slug: 'hubbles-law-and-the-distance-ladder',
          title: 'Hubble\'s law and the distance ladder',
          summary:
            'Redshift as expansion, the Hubble constant, and the chain of calibrations (parallax, Cepheids, TRGB, SNe Ia) that measures it, with the current tension.',
          estimatedMinutes: 100,
          objectives: [
            'Explain cosmological redshift as the stretching of wavelengths by the scale factor and distinguish it from Doppler shift',
            'Describe each rung of the distance ladder and its systematic errors',
            'Build a Hubble diagram from SDSS galaxies and estimate H_0 (with its limitations)',
            'State the current ladder and CMB values of H_0 and the significance of their disagreement',
          ],
          concepts: [
            'Redshift z and the scale factor: 1 + z = a_0 / a',
            'Hubble\'s law v = H_0 d; H_0 about 67-73 km/s/Mpc',
            'Peculiar velocities and the Hubble flow',
            'Distance ladder: parallax, Cepheids, TRGB, SNe Ia',
            'Leavitt law calibration with Gaia and megamasers',
            'Standard candles vs standard sirens',
            'Hubble time 1/H_0 about 14 Gyr',
            'The Hubble tension',
          ],
          explanation: `Hubble's 1929 discovery that galaxy recession velocities are proportional to distance, $v = H_0 d$, is the empirical foundation of cosmology. Interpreted in general relativity, redshift is not a Doppler shift through space but the stretching of wavelengths by the expansion of space itself: a photon emitted when the scale factor was $a$ arrives with $1 + z = a_0/a$. Galaxies have **peculiar velocities** of a few hundred km s$^{-1}$ on top of the Hubble flow, so the law is clean only beyond $\\sim 50$ Mpc ($z \\gtrsim 0.01$), which is beyond the reach of the primary distance indicators. Hence the **distance ladder**.

Rung one is geometry: Gaia parallaxes of Milky Way Cepheids and the water megamaser disk of NGC 4258, whose Keplerian rotation gives a 1.5% distance. Rung two is the Cepheid **period-luminosity** relation, calibrated on those anchors and measured with HST in $\\sim 40$ galaxies that hosted type Ia supernovae; the independent **tip of the red giant branch** (a fixed $M_I \\approx -4.05$ from the helium flash) provides a cross-check with different systematics. Rung three is the **type Ia supernova** peak luminosity, standardised by the light-curve width and colour, which reaches into the Hubble flow to $z \\sim 0.1$ where peculiar velocities are negligible. The SH0ES team obtains $H_0 = 73.0 \\pm 1.0$ km s$^{-1}$ Mpc$^{-1}$ this way.

The CMB plus $\\Lambda$CDM predicts $67.4 \\pm 0.5$ (module 6), and BAO plus BBN agree with the CMB independently of Planck. The $5\\sigma$ **Hubble tension** between the local and early-Universe routes is the most significant anomaly in cosmology today: either an unrecognised systematic (Cepheid crowding, dust, the TRGB calibration gives intermediate values) or new physics around recombination. Gravitational-wave **standard sirens** (module 7 of the high-energy track), whose distances come from GR with no ladder, will eventually arbitrate.

Read the Riess et al. (2022) and Di Valentino et al. reviews, and OpenStax chapter 26.5 and 29.1. The SDSS exercise lets you measure $H_0$ to 10% yourself using the Tully-Fisher or fundamental-plane rungs; the capstone does it properly.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 29.1 The Age of the Universe',
              url: 'https://openstax.org/books/astronomy-2e/pages/29-1-the-age-of-the-universe',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Also 26.5 on the extragalactic distance scale and 28.1 on Hubble\'s law.',
            },
            {
              title: 'Riess et al. (2022), A comprehensive measurement of the local value of the Hubble constant (SH0ES)',
              url: 'https://arxiv.org/abs/2112.04510',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The full ladder with every anchor and error term tabulated.',
              primary: true,
            },
            {
              title: 'Di Valentino et al. (2021), In the realm of the Hubble tension',
              url: 'https://arxiv.org/abs/2103.01183',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Review of the measurements and proposed solutions.',
            },
            {
              title: 'Hubble (1929), A relation between distance and radial velocity among extra-galactic nebulae',
              url: 'https://www.pnas.org/doi/10.1073/pnas.15.3.168',
              type: 'article',
              cost: 'free',
              provider: 'PNAS',
              note: 'The original paper; note the 24 galaxies and the value of 500 km/s/Mpc.',
            },
            {
              title: 'Ned Wright\'s Cosmology Tutorial',
              url: 'https://www.astro.ucla.edu/~wright/cosmolog.htm',
              type: 'textbook',
              cost: 'free',
              provider: 'UCLA',
              note: 'Part 1 on Hubble\'s law and the distance ladder; used throughout modules 5-7.',
            },
          ],
          exercises: [
            {
              slug: 'hubble-1929-redo',
              title: 'Redo Hubble 1929 with modern distances',
              prompt:
                'Take Hubble\'s 24 galaxies (table 1 of the 1929 paper) and look up modern Cepheid or TRGB distances for each in NED. Plot velocity against Hubble\'s distances and against modern distances; fit H_0 to each. Explain why Hubble\'s value was 500 km/s/Mpc (Cepheid confusion with brighter stars and HII regions, misclassified Population II Cepheids) and why even the modern fit to these galaxies is poor (peculiar velocities at d < 2 Mpc).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sdss-hubble-diagram',
              title: 'A Hubble diagram from SDSS',
              prompt:
                'Select 2000 SDSS early-type galaxies (0.02 < z < 0.1, velocity dispersion > 150 km/s) with r-band Petrosian magnitudes and half-light radii. Use the fundamental plane calibrated in nearby clusters (e.g. the Coma zero point with a known distance of 100 Mpc) as a distance indicator, or alternatively Tully-Fisher with HI line widths from the ALFALFA catalogue. Plot cz against distance and fit H_0. Discuss the dominant systematic (the cluster zero point) and compare with 70.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'ladder-error-budget',
              title: 'Propagate a ladder error budget',
              prompt:
                'Using the error terms in Riess et al. (2022) table 6 (anchor distances, Cepheid P-L slope and zero point, metallicity, SN Ia calibration, Hubble-flow sample), build a simple quadrature error budget and reproduce the total 1.4% uncertainty. Then determine which single term, if doubled, would be needed to make the result consistent with 67.4 at 2 sigma, and comment on its plausibility.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is cosmological redshift not a Doppler shift?',
              answerOutline:
                'It arises from the change of the scale factor between emission and reception (1 + z = a_0/a), not from motion through space; at low z the two descriptions coincide numerically.',
            },
            {
              question: 'Name the three rungs of the SH0ES ladder and the anchor of the first.',
              answerOutline:
                'Geometric anchors (Gaia parallaxes, NGC 4258 maser, LMC eclipsing binaries); Cepheids in SN Ia host galaxies; SNe Ia in the Hubble flow.',
            },
            {
              question: 'What is the Hubble tension?',
              answerOutline:
                'The about 5 sigma discrepancy between the local ladder (73 km/s/Mpc) and the CMB-plus-Lambda-CDM inference (67.4), unresolved by any confirmed systematic.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/stellar-populations-and-binaries/pulsating-stars-and-asteroseismology'],
        },
        {
          slug: 'friedmann-equations-and-cosmic-dynamics',
          title: 'The Friedmann equations and the dynamics of the Universe',
          summary:
            'The FRW metric, the Friedmann and fluid equations, the density parameters, and how matter, radiation, curvature and Lambda each drive the expansion.',
          estimatedMinutes: 110,
          objectives: [
            'Write the FRW metric and explain comoving coordinates and curvature',
            'Derive the Friedmann equation (Newtonian argument) and the fluid and acceleration equations',
            'Define the density parameters and the critical density and solve for a(t) in single-component universes',
            'Compute the age of the Universe for given parameters and explain the role of Lambda',
          ],
          concepts: [
            'FRW metric; comoving distance; curvature k',
            'Friedmann equation H^2 = (8 pi G / 3) rho - k c^2 / a^2 + Lambda / 3',
            'Fluid equation and equation of state w = P / rho c^2',
            'Acceleration equation; acceleration requires w < -1/3',
            'Critical density and Omega_m, Omega_r, Omega_Lambda, Omega_k',
            'Scaling: rho_m proportional to a^-3, rho_r to a^-4, rho_Lambda constant',
            'Matter-radiation equality at z about 3400; Lambda domination at z about 0.3',
            'Age of the Universe t_0 = 13.8 Gyr',
          ],
          explanation: `On scales above a few hundred megaparsecs the Universe is homogeneous and isotropic, and the only metric consistent with that is Friedmann-Robertson-Walker: $ds^2 = -c^2dt^2 + a(t)^2[dr^2/(1 - kr^2) + r^2 d\\Omega^2]$, with **comoving** coordinates that ride along with the expansion, a scale factor $a(t)$ and spatial curvature $k = -1, 0, +1$. Einstein's equations reduce to the **Friedmann equation**

$$ H^2 \\equiv \\left(\\frac{\\dot a}{a}\\right)^2 = \\frac{8\\pi G}{3}\\rho - \\frac{kc^2}{a^2} + \\frac{\\Lambda}{3}, $$

which a Newtonian energy argument for an expanding sphere reproduces exactly (the GR derivation is in the relativity track). Combined with energy conservation, the **fluid equation** $\\dot\\rho = -3H(\\rho + P/c^2)$, each component with equation of state $P = w\\rho c^2$ scales as $\\rho \\propto a^{-3(1+w)}$: matter ($w = 0$) as $a^{-3}$, radiation ($w = 1/3$) as $a^{-4}$ because photons also redshift, and a cosmological constant ($w = -1$) not at all. The **acceleration equation** $\\ddot a/a = -(4\\pi G/3)(\\rho + 3P/c^2) + \\Lambda/3$ shows that acceleration needs a component with $w < -1/3$: pressure gravitates, and only negative pressure repels.

Dividing by $H_0^2$ gives the **density parameters** $\\Omega_i = \\rho_i/\\rho_{crit}$ with $\\rho_{crit} = 3H_0^2/8\\pi G \\approx 9 \\times 10^{-27}$ kg m$^{-3}$ (about 5 protons per cubic metre), and the Friedmann equation becomes $H^2(z) = H_0^2[\\Omega_r(1+z)^4 + \\Omega_m(1+z)^3 + \\Omega_k(1+z)^2 + \\Omega_\\Lambda]$ with $\\sum\\Omega = 1$. Today $\\Omega_m = 0.31$, $\\Omega_\\Lambda = 0.69$, $\\Omega_r = 9 \\times 10^{-5}$ and $|\\Omega_k| < 0.005$. The history follows: radiation dominated until $z \\approx 3400$, matter until $z \\approx 0.3$ (6 Gyr ago), and $\\Lambda$ since, when the expansion began to accelerate. Single-component solutions ($a \\propto t^{1/2}$, $t^{2/3}$, $e^{Ht}$) are worth memorising. The **age** $t_0 = \\int_0^\\infty dz/[(1+z)H(z)] = 13.8$ Gyr; without $\\Lambda$ the same $H_0$ would give 9.3 Gyr, younger than the globular clusters, which was a serious problem before 1998.

Tong's notes chapter 1 and Baumann's chapters 1-2 are the readings; Ned Wright's tutorial gives the intuition. The exercises build your own Friedmann integrator, which you will reuse for distances in the next lesson.`,
          resources: [
            {
              title: 'Tong — Lectures on Cosmology (Cambridge)',
              url: 'https://www.damtp.cam.ac.uk/user/tong/cosmo.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
              note: 'Chapter 1: the expanding Universe and the Friedmann equations.',
              primary: true,
            },
            {
              title: 'Baumann — Cosmology lecture notes',
              url: 'https://cmb.wintherscoming.no/pdfs/baumann.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Daniel Baumann (via Hans Winther\'s site)',
              note: 'Chapters 1-2 on geometry, dynamics and the thermal history; the free precursor of his Cambridge University Press textbook.',
            },
            {
              title: 'Ned Wright\'s Cosmology Tutorial',
              url: 'https://www.astro.ucla.edu/~wright/cosmolog.htm',
              type: 'textbook',
              cost: 'free',
              provider: 'UCLA',
            },
            {
              title: 'Ryden — Introduction to Cosmology (2nd ed.)',
              url: 'https://doi.org/10.1017/9781316651087',
              type: 'textbook',
              cost: 'paid',
              provider: 'Cambridge University Press',
              note: 'The clearest undergraduate text (chapters 4-6 for this lesson). Tong and Baumann are free alternatives.',
            },
          ],
          exercises: [
            {
              slug: 'newtonian-friedmann',
              title: 'Derive Friedmann from Newton',
              prompt:
                'Consider a test particle on the surface of a uniform expanding sphere of density rho and radius r = a(t) x. Write its energy per unit mass and show that energy conservation gives (da/dt)^2 = (8 pi G / 3) rho a^2 - K with K a constant. Identify K with k c^2. Then derive the fluid equation from dE = -P dV for a comoving volume and combine the two to obtain the acceleration equation. State where the Newtonian argument is not rigorous.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'friedmann-integrator',
              title: 'Write a Friedmann integrator',
              prompt:
                'Write a Python class that takes (H_0, Omega_m, Omega_r, Omega_Lambda, w) and returns H(z), a(t) by integrating da/dt = a H(a), the age t_0, and lookback time t(z). Validate against astropy.cosmology.Planck18 for the age (13.79 Gyr) and lookback time at z = 1, 3, 10. Plot a(t) for Einstein-de Sitter, open (Omega_m = 0.3), and Lambda-CDM on one figure, with t_0 marked, and for a closed universe (Omega_m = 2) show the big crunch.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'epochs-of-domination',
              title: 'Epochs and transitions',
              prompt:
                'For Planck 2018 parameters compute: the redshift and age at matter-radiation equality (include three neutrino species in Omega_r), the redshift at which Lambda began to dominate the energy density, the redshift at which the expansion began to accelerate (q = 0), and the age without Lambda for the same H_0. Compare the last with the age of the oldest globular clusters.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does radiation energy density fall faster than matter density with expansion?',
              answerOutline:
                'Number density of both falls as a^-3, but each photon also loses energy as a^-1 through redshift, giving a^-4.',
            },
            {
              question: 'What condition on the equation of state gives accelerated expansion?',
              answerOutline:
                'w < -1/3, so that rho + 3P/c^2 < 0 in the acceleration equation; a cosmological constant has w = -1.',
            },
            {
              question: 'What is the critical density and what happens if the total density equals it?',
              answerOutline:
                'rho_crit = 3 H_0^2 / (8 pi G), about 9e-27 kg/m^3; a universe with exactly this density is spatially flat (k = 0).',
            },
          ],
          relatedLessons: ['relativity/gravitational-waves-and-cosmological-solutions/flrw-cosmology'],
        },
        {
          slug: 'cosmological-distances-and-parameters',
          title: 'Cosmological distances, horizons and parameters',
          summary:
            'Comoving, angular-diameter and luminosity distances, the horizon, the angular-size minimum, and how each observable constrains the parameters.',
          estimatedMinutes: 100,
          objectives: [
            'Define and compute comoving, proper, angular-diameter and luminosity distances for any cosmology',
            'Explain why angular size has a minimum near z about 1.6 and why surface brightness dims as (1 + z)^4',
            'Compute the particle horizon and explain the horizon problem',
            'Use astropy.cosmology fluently and verify it against your own integrator',
          ],
          concepts: [
            'Comoving distance D_C = c integral dz / H(z)',
            'Transverse comoving distance and curvature',
            'Angular-diameter distance D_A = D_M / (1 + z)',
            'Luminosity distance D_L = (1 + z) D_M; distance modulus',
            'Etherington relation D_L = (1 + z)^2 D_A',
            'Tolman surface-brightness dimming',
            'Particle horizon and Hubble radius',
            'K-correction',
          ],
          explanation: `In an expanding curved spacetime there is no single "distance", and every observable uses a different one. The fundamental quantity is the **comoving distance** to redshift $z$, $D_C = c\\int_0^z dz'/H(z')$, the distance measured today along the line of sight. In a curved universe the transverse comoving distance $D_M$ differs by a $\\sinh$ or $\\sin$ factor; for flat space $D_M = D_C$. An object of physical size $\\ell$ subtends $\\theta = \\ell/D_A$ with **angular-diameter distance** $D_A = D_M/(1 + z)$, while a source of luminosity $L$ has flux $F = L/4\\pi D_L^2$ with **luminosity distance** $D_L = (1 + z)D_M$; the two factors of $(1 + z)$ account for photon redshift and time dilation. The **Etherington relation** $D_L = (1 + z)^2 D_A$ holds in any metric theory and is itself a test of the framework.

Two consequences surprise newcomers. Because $D_A$ falls at high redshift ($D_M$ saturates while $1 + z$ grows), a galaxy of fixed size looks *larger* beyond $z \\approx 1.6$: the Universe was smaller when the light left. And **surface brightness** dims as $(1 + z)^4$ (Tolman), independent of cosmological parameters, which is why high-redshift galaxies are so hard to detect and why the CMB sky is so cold.

The distance modulus $\\mu = 5\\log_{10}(D_L/10\\,\\mathrm{pc})$ is what supernovae measure; its second-order dependence on the deceleration parameter $q_0 = \\Omega_m/2 - \\Omega_\\Lambda$ is how they detect acceleration. Angular-diameter distances are what BAO and the CMB acoustic scale measure. Because the integrals depend on $H(z)$ differently, combining probes breaks degeneracies: supernovae constrain roughly $\\Omega_m - \\Omega_\\Lambda$, the CMB $\\Omega_m + \\Omega_\\Lambda$.

The **particle horizon**, $D_H = c\\int_0^{t} dt'/a$, is the largest comoving distance from which light could have reached us; at recombination it was only $\\sim 1^\\circ$ on today's sky, so regions farther apart than that had never been in causal contact, yet have the same temperature to $10^{-5}$: the horizon problem that inflation solves. Hogg's short note is the canonical reference; read it, then implement every distance in Python and check against astropy.`,
          resources: [
            {
              title: 'Hogg (1999), Distance measures in cosmology',
              url: 'https://arxiv.org/abs/astro-ph/9905116',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Fifteen pages that every cosmologist keeps on hand; defines every distance with formulae and figures.',
              primary: true,
            },
            {
              title: 'astropy.cosmology documentation',
              url: 'https://docs.astropy.org/en/stable/cosmology/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Built-in Planck18 cosmology and all distance functions.',
            },
            {
              title: 'Ned Wright\'s Cosmology Calculator',
              url: 'https://www.astro.ucla.edu/~wright/CosmoCalc.html',
              type: 'interactive',
              cost: 'free',
              provider: 'UCLA',
              note: 'Check your numbers quickly.',
            },
            {
              title: 'MIT OCW 8.286 The Early Universe (Alan Guth)',
              url: 'https://ocw.mit.edu/courses/8-286-the-early-universe-fall-2013/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures 4-8 on the kinematics of the expanding Universe and horizons; videos and problem sets.',
            },
          ],
          exercises: [
            {
              slug: 'implement-distances',
              title: 'Implement all the distances',
              prompt:
                'Extend your Friedmann integrator with D_C, D_M (with curvature), D_A, D_L, distance modulus, lookback time and comoving volume. Verify against astropy Planck18 at z = 0.5, 2, 1100 to better than 0.1%. Plot D_A(z) and find the redshift of its maximum; plot the angular size of a 10 kpc galaxy from z = 0.1 to 10. Repeat D_A for an open universe with Omega_k = 0.5 and comment.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'horizon-problem',
              title: 'The horizon problem quantified',
              prompt:
                'Compute the comoving particle horizon at recombination (z = 1090) in a matter-plus-radiation universe and the comoving angular-diameter distance to the last-scattering surface. Show that the horizon subtends about 1-2 degrees today and compute how many causally disconnected patches the CMB sky contained. Then compute the Hubble radius c/H at z = 1090 and today in comoving units to show the ratio that inflation must have overcome.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'degeneracy-directions',
              title: 'Degeneracy directions of different probes',
              prompt:
                'On a grid of (Omega_m, Omega_Lambda) from 0 to 1.5, compute the distance modulus at z = 0.5 and 1.0, the angular-diameter distance to z = 1090, and the age. Plot contours of each at the Planck fiducial value. Show that supernova contours run roughly along Omega_Lambda - Omega_m = const while the CMB contour runs along Omega_m + Omega_Lambda = const, and explain why their intersection determines both.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does angular size have a minimum as a function of redshift?',
              answerOutline:
                'D_A = D_M / (1 + z): the comoving distance saturates at high z while the (1 + z) factor keeps growing, so objects beyond z about 1.6 appear larger again.',
            },
            {
              question: 'What is the Etherington relation and why is it a useful test?',
              answerOutline:
                'D_L = (1 + z)^2 D_A, which holds in any metric theory with photon number conservation; violations would indicate exotic physics such as photon-axion mixing or opacity.',
            },
            {
              question: 'State the horizon problem.',
              answerOutline:
                'Regions of the CMB sky more than about 1 degree apart were never in causal contact in standard expansion, yet have identical temperatures to 1e-5.',
            },
          ],
        },
        {
          slug: 'supernova-cosmology-and-acceleration',
          title: 'Supernova cosmology and the accelerating Universe',
          summary:
            'Type Ia supernovae as standardisable candles, the 1998 discovery, the Pantheon+ sample, and fitting Omega_m, Omega_Lambda and w with MCMC.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why SNe Ia are standardisable and how the Phillips relation and colour corrections work',
            'Reproduce the 1998 acceleration discovery from the original data',
            'Fit Lambda-CDM and wCDM to the Pantheon+ Hubble diagram with a covariance matrix using MCMC',
            'Discuss the main systematics: dust, host-galaxy correlations, evolution and calibration',
          ],
          concepts: [
            'SN Ia physics: thermonuclear white dwarf, 56Ni-powered light curve',
            'Phillips relation (width-luminosity) and colour correction',
            'Tripp standardisation: mu = m_B - M + alpha x_1 - beta c',
            'Hubble diagram residuals and the deceleration parameter',
            '1998 results: Riess et al., Perlmutter et al.',
            'Pantheon+ sample and covariance matrix',
            'wCDM and the w_0-w_a parametrisation',
            'Host-mass step and dust systematics',
          ],
          explanation: `Type Ia supernovae explode when a carbon-oxygen white dwarf is pushed toward instability by a companion, releasing a nearly fixed $\\sim 0.6\\,M_\\odot$ of $^{56}$Ni whose decay powers a peak luminosity near $M_B \\approx -19.3$. They are not perfect standard candles (intrinsic scatter is about 0.4 mag), but they are **standardisable**: brighter events have broader light curves (the **Phillips relation**) and bluer colours. The Tripp relation $\\mu = m_B - M + \\alpha x_1 - \\beta c$ with stretch $x_1$ and colour $c$ from a light-curve fitter (SALT) reduces the scatter to 0.12 mag, 6% in distance, per event.

In 1998 two teams measured a few dozen SNe Ia at $z \\sim 0.5$ and found them about 0.25 mag fainter than expected in an empty universe, let alone a decelerating one: the expansion is **accelerating**, requiring $\\Omega_\\Lambda \\approx 0.7$. The result was accepted quickly because it resolved the age problem and matched the flat geometry the CMB was then revealing; it won the 2011 Nobel Prize. The modern **Pantheon+** compilation has about 1550 spectroscopically confirmed SNe Ia from $z = 0.001$ to 2.3 with a full statistical-plus-systematic covariance matrix, and constrains $\\Omega_m = 0.33 \\pm 0.02$ in flat $\\Lambda$CDM on its own and $w = -0.90 \\pm 0.14$ when the ladder calibration is included.

Fitting is a textbook Bayesian problem: $\\chi^2 = \\Delta\\mu^T C^{-1}\\Delta\\mu$ with $\\Delta\\mu = \\mu_{obs} - \\mu_{model}(z; H_0, \\Omega_m, \\Omega_\\Lambda, w)$ and an absolute magnitude that is degenerate with $H_0$ unless anchored. The **systematics** now dominate: dust in host galaxies with a possibly varying extinction law, the "host-mass step" (SNe in massive galaxies are 0.05 mag brighter after standardisation), photometric calibration across surveys, and possible evolution of the progenitor population with redshift. Future surveys (Rubin, Roman) will deliver $10^5$ events, so these are the questions that matter.

Read the two 1998 papers (they are short and remarkably careful), then the Pantheon+ release documentation on GitHub. The MCMC exercise is a direct rehearsal for the capstone.`,
          resources: [
            {
              title: 'Pantheon+ and SH0ES data release (GitHub)',
              url: 'https://github.com/PantheonPlusSH0ES/DataRelease',
              type: 'dataset',
              cost: 'free',
              provider: 'Pantheon+ collaboration',
              note: 'The Hubble diagram (z, mu, host properties) and the full covariance matrix.',
              primary: true,
            },
            {
              title: 'Riess et al. (1998), Observational evidence from supernovae for an accelerating Universe and a cosmological constant',
              url: 'https://arxiv.org/abs/astro-ph/9805201',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Perlmutter et al. (1999), Measurements of Omega and Lambda from 42 high-redshift supernovae',
              url: 'https://arxiv.org/abs/astro-ph/9812133',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'emcee documentation',
              url: 'https://emcee.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'Dan Foreman-Mackey',
              note: 'The affine-invariant MCMC sampler used in the exercises and the capstone.',
            },
            {
              title: 'Nobel Prize in Physics 2011',
              url: 'https://www.nobelprize.org/prizes/physics/2011/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
            },
          ],
          exercises: [
            {
              slug: 'reproduce-1998',
              title: 'Reproduce the 1998 discovery',
              prompt:
                'Transcribe the distance moduli and redshifts of the SNe Ia in Riess et al. (1998) table 5 (or the Perlmutter 1999 table). Compute the residuals relative to an empty (Milne) universe and to Einstein-de Sitter for H_0 = 65. Fit (Omega_m, Omega_Lambda) by chi-square on a grid and plot the confidence contours. Show that Omega_Lambda = 0 is excluded at about 3 sigma with these data alone.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'pantheon-mcmc',
              title: 'MCMC fit to Pantheon+',
              prompt:
                'Download the Pantheon+ Hubble diagram and covariance matrix. Fit flat Lambda-CDM (free Omega_m and the magnitude offset M), then non-flat Lambda-CDM, then flat wCDM, using emcee with your distance code (or astropy). Produce corner plots and report Omega_m, Omega_Lambda and w with 68% intervals. Compare with the published Brout et al. (2022) values. Plot the Hubble diagram residuals against the best-fit model binned in redshift.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Invert the covariance once with numpy.linalg.cholesky and reuse it; marginalise M analytically if you want speed.',
            },
            {
              slug: 'host-mass-step',
              title: 'Detect the host-mass step',
              prompt:
                'Using the host stellar masses in the Pantheon+ table, split the SNe at log M_host = 10 and compute the mean Hubble residual (relative to your best-fit model) of each group with bootstrap errors. Report the step in magnitudes and discuss two physical explanations (progenitor age/metallicity versus dust properties) and how one would distinguish them.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What makes SNe Ia standardisable?',
              answerOutline:
                'Their peak luminosity correlates with light-curve width (Phillips relation) and colour; correcting for both reduces the scatter to about 0.12 mag.',
            },
            {
              question: 'What did the 1998 supernova data show and why was it accepted quickly?',
              answerOutline:
                'Distant SNe were fainter than in any decelerating model, implying acceleration and Omega_Lambda about 0.7; it resolved the age problem and matched the flat universe emerging from CMB measurements.',
            },
            {
              question: 'Why is H_0 degenerate with the SN Ia absolute magnitude in a Hubble-diagram fit?',
              answerOutline:
                'Both enter as additive constants in the distance modulus (5 log H_0 and M); only an external calibration of M (the ladder) breaks the degeneracy.',
            },
          ],
          relatedLessons: ['probability-statistics/bayesian-inference-and-mcmc/mcmc-sampling'],
        },
      ],
    },
    {
      slug: 'the-early-universe-and-cmb',
      title: 'The Early Universe and the Cosmic Microwave Background',
      description:
        'The hot big bang: thermal history, nucleosynthesis, recombination, the CMB and its anisotropies as the most precise cosmological probe, and inflation as the origin of structure.',
      lessons: [
        {
          slug: 'thermal-history-and-big-bang-nucleosynthesis',
          title: 'Thermal history and big-bang nucleosynthesis',
          summary:
            'Temperature versus time, decoupling and freeze-out, the neutron-proton ratio, and the primordial abundances of helium, deuterium and lithium as a test of the first three minutes.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the temperature-time relation in the radiation era and the role of relativistic degrees of freedom g_*',
            'Explain the general rule for decoupling (interaction rate versus expansion rate) and apply it to neutrinos',
            'Work through the neutron-proton freeze-out and the deuterium bottleneck to estimate Y_p about 0.25',
            'Explain how deuterium measures the baryon density and what the lithium problem is',
          ],
          concepts: [
            'Radiation-era relation T proportional to t^-1/2; g_* counting',
            'Decoupling rule Gamma about H',
            'Neutrino decoupling at 1 MeV; T_nu / T_gamma = (4/11)^1/3',
            'Neutron-proton freeze-out; n/p = 1/6, then 1/7 after decay',
            'Deuterium bottleneck at T about 0.07 MeV',
            'Primordial helium Y_p about 0.245',
            'Deuterium as a baryometer: Omega_b h^2 = 0.022',
            'Lithium problem; constraints on N_eff',
          ],
          explanation: `Running the expansion backward, the Universe was a hot plasma in thermal equilibrium, and its history is a sequence of departures from equilibrium as it cooled. In the radiation era $\\rho = (\\pi^2/30)g_* T^4$ gives

$$ t \\approx 2.4\\,g_*^{-1/2}\\left(\\frac{T}{1\\,\\mathrm{MeV}}\\right)^{-2}\\ \\mathrm{s}, $$

where $g_*$ counts relativistic degrees of freedom (10.75 at 1 MeV: photons, electrons, positrons, three neutrino species). Each species stays in equilibrium while its interaction rate $\\Gamma = n\\sigma v$ exceeds $H$ and **freezes out** when $\\Gamma \\sim H$. Weak interactions ($\\sigma \\propto G_F^2 T^2$) decouple neutrinos at $T \\approx 1$ MeV, after which electron-positron annihilation heats the photons but not the neutrinos, leaving $T_\\nu = (4/11)^{1/3}T_\\gamma = 1.95$ K today.

The same freeze-out fixes the **neutron-to-proton ratio**. In equilibrium $n/p = e^{-\\Delta m/kT}$ with $\\Delta m = 1.293$ MeV; at the 0.8 MeV freeze-out this is about 1/6, and free-neutron decay (lifetime 880 s) reduces it to about 1/7 by the time nucleosynthesis starts. Deuterium forms only once the photon density is too low to photodissociate it, at $T \\approx 0.07$ MeV ($t \\approx 3$ min), the **deuterium bottleneck**; then almost all neutrons end up in $^4$He, giving a mass fraction $Y_p = 2(n/p)/(1 + n/p) \\approx 0.25$, matching the $0.245 \\pm 0.003$ observed in metal-poor HII regions. This one number is a spectacular success of the hot big bang.

The trace elements are even more useful. Deuterium is destroyed in stars and never made, so its primordial abundance, measured in quasar absorption systems, D/H $= 2.5 \\times 10^{-5}$, is a sensitive **baryometer** giving $\\Omega_b h^2 = 0.022$, identical to the CMB value, which confirms that most matter is non-baryonic. The predicted $^7$Li is three times what old halo stars show, the **lithium problem**, probably stellar depletion. BBN also limits extra relativistic species ($N_{eff}$), a constraint on particle physics. Read Baumann chapter 3 and Guth's lectures 20-23; the exercise integrates the simplified network yourself.`,
          resources: [
            {
              title: 'Baumann — Cosmology lecture notes',
              url: 'https://cmb.wintherscoming.no/pdfs/baumann.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Daniel Baumann',
              note: 'Chapter 3: thermal history, decoupling and BBN.',
              primary: true,
            },
            {
              title: 'MIT OCW 8.286 The Early Universe (Alan Guth)',
              url: 'https://ocw.mit.edu/courses/8-286-the-early-universe-fall-2013/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on the thermal history and nucleosynthesis with problem sets.',
            },
            {
              title: 'Cyburt, Fields, Olive & Yeh (2016), Big bang nucleosynthesis: present status',
              url: 'https://arxiv.org/abs/1505.01076',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Reviews of Modern Physics; the comparison of predicted and observed abundances.',
            },
            {
              title: 'Particle Data Group — Reviews (Big-Bang Nucleosynthesis)',
              url: 'https://pdg.lbl.gov/',
              type: 'article',
              cost: 'free',
              provider: 'PDG',
              note: 'The concise, regularly updated review with the Schramm plot.',
            },
          ],
          exercises: [
            {
              slug: 'temperature-time',
              title: 'Temperature versus time',
              prompt:
                'Derive t(T) in the radiation era from the Friedmann equation with rho = (pi^2/30) g_* T^4. Tabulate g_* at T = 100 GeV, 1 GeV, 100 MeV, 1 MeV and 0.1 MeV (count the Standard Model species). Compute the age at the electroweak scale, the QCD transition, neutrino decoupling and the end of BBN. Then derive T_nu / T_gamma = (4/11)^(1/3) from entropy conservation at e+e- annihilation.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'neutron-proton-freeze-out',
              title: 'Neutron-proton freeze-out and helium',
              prompt:
                'Integrate the rate equation for the neutron fraction X_n with the weak rates lambda_np approximated by lambda = 255 / tau_n (12 + 6 x + x^2) / x^5 (x = Delta m / kT), from T = 10 MeV to 0.07 MeV, including neutron decay. Find X_n at freeze-out and at the deuterium bottleneck, and compute Y_p. Explore how Y_p changes if tau_n is 850 or 900 s, or if there are 4 neutrino species (g_* changes H).',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'deuterium-baryometer',
              title: 'Deuterium as a baryometer',
              prompt:
                'Using the fitting formula D/H = 2.6e-5 (Omega_b h^2 / 0.022)^-1.6 (approximately the BBN scaling), and the measured D/H = (2.527 +/- 0.030)e-5 from damped Lyman-alpha systems, derive Omega_b h^2 with its uncertainty and compare with the Planck value 0.02237 +/- 0.00015. Then compute Omega_b for h = 0.674 and the implied baryon-to-photon ratio eta.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the primordial helium abundance about 25% by mass?',
              answerOutline:
                'Weak interactions freeze out at about 0.8 MeV leaving n/p about 1/6; neutron decay during the deuterium bottleneck reduces it to about 1/7; essentially all neutrons then go into 4He, giving Y_p = 2(n/p)/(1 + n/p) about 0.25.',
            },
            {
              question: 'Why does deuterium measure the baryon density so well?',
              answerOutline:
                'Its surviving abundance depends steeply on the baryon-to-photon ratio (more baryons burn it more completely to helium), it has no other production source, and it is observed in pristine high-redshift gas.',
            },
            {
              question: 'What does the agreement between BBN and CMB baryon densities imply?',
              answerOutline:
                'Two independent epochs (3 minutes and 380,000 years) give the same Omega_b of about 5%, confirming that most matter is non-baryonic.',
            },
          ],
        },
        {
          slug: 'recombination-and-the-cosmic-microwave-background',
          title: 'Recombination and the cosmic microwave background',
          summary:
            'How the Universe became transparent, the Saha versus Peebles treatment of recombination, the last-scattering surface, and the perfect blackbody spectrum measured by COBE.',
          estimatedMinutes: 90,
          objectives: [
            'Apply the Saha equation to estimate the recombination redshift and explain why it is so late compared with 13.6 eV',
            'Explain why actual recombination is delayed and broadened relative to Saha (Peebles three-level atom)',
            'Describe the last-scattering surface and its thickness',
            'Explain the blackbody spectrum of the CMB, its temperature, dipole and spectral-distortion limits',
          ],
          concepts: [
            'Saha equation for hydrogen with eta = 6e-10',
            'Recombination at z about 1100, T about 3000 K',
            'Peebles equation; Lyman-alpha and two-photon bottleneck',
            'Decoupling vs recombination; freeze-out ionisation fraction 1e-4',
            'Last-scattering surface and its thickness (Delta z about 80)',
            'CMB blackbody at T_0 = 2.7255 K; COBE FIRAS',
            'Dipole: our motion at 370 km/s',
            'Spectral distortions (mu, y) and the Sunyaev-Zeldovich effect',
          ],
          explanation: `For 380,000 years the Universe was an opaque plasma in which photons scattered off free electrons every few thousand years. As it cooled, protons and electrons combined into hydrogen and the photons flew free: the **CMB** is the light from that **last-scattering surface**, redshifted from 3000 K to 2.7255 K today. A naive guess puts recombination at $kT = 13.6$ eV ($z \\sim 60{,}000$); the real answer is $z \\approx 1100$, $kT = 0.26$ eV, because there are $1.6 \\times 10^9$ photons per baryon and the Wien tail still contains enough ionising photons until $T$ is far below the binding energy. The **Saha equation** with $\\eta = 6 \\times 10^{-10}$ gives the right redshift for 50% ionisation.

Saha assumes equilibrium, which fails in detail. Each recombination directly to the ground state emits a Lyman-continuum photon that ionises another atom, and recombinations through $n = 2$ emit Lyman-$\\alpha$ photons that are reabsorbed; the gas can only recombine as fast as Lyman-$\\alpha$ photons redshift out of resonance or $2s$ atoms decay by the slow **two-photon** process (8 s$^{-1}$). **Peebles' three-level model** captures this and shows recombination lags Saha, the ionisation fraction freezes out at $x_e \\approx 10^{-4}$, and last scattering has a thickness of $\\Delta z \\approx 80$, which smooths the smallest-scale anisotropies. Modern codes (RECFAST, CosmoRec, HyRec) include hundreds of levels and are needed for Planck-level precision.

COBE's FIRAS instrument measured the spectrum in 1990 as a **blackbody** to 50 parts per million, the most perfect ever observed, proving the radiation was thermalised in a dense early phase. Deviations (**spectral distortions**) are limited to $|\\mu| < 9 \\times 10^{-5}$ and $|y| < 1.5 \\times 10^{-5}$, constraining energy injection after $z \\sim 10^6$. The largest anisotropy, the **dipole** of 3.36 mK, is our motion at 370 km s$^{-1}$ toward Leo; in clusters the hot gas inverse-Compton scatters the CMB producing the **Sunyaev-Zeldovich** decrement, a redshift-independent way to find clusters. Read Baumann chapter 3.3 and Guth's lectures; the exercise implements Saha and Peebles side by side.`,
          resources: [
            {
              title: 'Baumann — Cosmology lecture notes',
              url: 'https://cmb.wintherscoming.no/pdfs/baumann.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Daniel Baumann',
              note: 'Section 3.3 on recombination and decoupling.',
              primary: true,
            },
            {
              title: 'Wayne Hu — CMB tutorials',
              url: 'http://background.uchicago.edu/~whu/',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Chicago',
              note: 'The "Physics of microwave background anisotropies" tutorials; start with the introductory pages.',
            },
            {
              title: 'LAMBDA — Legacy Archive for Microwave Background Data Analysis',
              url: 'https://lambda.gsfc.nasa.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'COBE FIRAS spectrum data and WMAP/Planck maps.',
            },
            {
              title: 'Nobel Prize in Physics 2019 (Peebles)',
              url: 'https://www.nobelprize.org/prizes/physics/2019/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
            },
          ],
          exercises: [
            {
              slug: 'saha-recombination',
              title: 'Recombination from Saha',
              prompt:
                'Write the Saha equation for hydrogen in terms of the ionisation fraction x_e, the temperature and the baryon-to-photon ratio eta = 6.1e-10. Solve for x_e(z) and find the redshifts where x_e = 0.9, 0.5 and 0.1. Compute the corresponding temperatures and ages. Explain why 50% ionisation occurs at kT = 0.3 eV rather than 13.6 eV.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'peebles-equation',
              title: 'Peebles three-level recombination',
              prompt:
                'Implement Peebles\' equation dx_e/dz with the case-B recombination coefficient alpha_B(T) and the Peebles C factor (including the two-photon rate 8.22 s^-1 and the Lyman-alpha escape rate). Integrate from z = 1600 to 0 and overplot with Saha. Show that x_e freezes at about 2e-4 and compute the visibility function g(z) = -d(e^-tau)/dz; find its peak and FWHM.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'firas-blackbody-fit',
              title: 'Fit the FIRAS spectrum',
              prompt:
                'Download the COBE FIRAS monopole spectrum from LAMBDA (frequency, intensity, uncertainty). Fit a Planck function with T free and report T with its error (expect 2.725 K). Compute the residuals in units of the error and show they are consistent with zero; then add a mu-distortion term and find the 95% upper limit on |mu|.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does recombination occur at kT far below 13.6 eV?',
              answerOutline:
                'With a billion photons per baryon, the high-energy tail of the Planck distribution contains enough ionising photons to keep hydrogen ionised until kT is about 1/50 of the binding energy.',
            },
            {
              question: 'What delays recombination relative to Saha equilibrium?',
              answerOutline:
                'Recombination photons re-ionise atoms; net recombination proceeds only through redshifting of Lyman-alpha photons and the slow 2s-1s two-photon decay.',
            },
            {
              question: 'What does the blackbody shape of the CMB spectrum tell us?',
              answerOutline:
                'The radiation was in thermal equilibrium with matter in a hot dense phase and little energy was injected afterwards: direct evidence for a hot big bang.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/radiation-and-spectra/boltzmann-and-saha-equations'],
        },
        {
          slug: 'cmb-anisotropies-and-the-power-spectrum',
          title: 'CMB anisotropies and the acoustic power spectrum',
          summary:
            'Sachs-Wolfe, acoustic oscillations and damping; how each feature of the power spectrum maps to a cosmological parameter; and working with the Planck data.',
          estimatedMinutes: 120,
          objectives: [
            'Decompose a temperature map into spherical harmonics and define the power spectrum C_l',
            'Explain the physics of the Sachs-Wolfe plateau, acoustic peaks and Silk damping',
            'Explain how peak positions, heights and damping constrain Omega_k, Omega_b, Omega_m and H_0',
            'Compute a theoretical spectrum with CAMB and compare it with the Planck data',
          ],
          concepts: [
            'Spherical harmonics, a_lm, C_l and cosmic variance',
            'Sachs-Wolfe effect and the large-scale plateau',
            'Acoustic oscillations of the photon-baryon fluid; sound horizon',
            'First peak at l about 220 and flatness',
            'Baryon loading and odd/even peak heights',
            'Silk damping tail',
            'Polarisation: E modes, B modes, reionisation bump',
            'Integrated Sachs-Wolfe and lensing of the CMB',
          ],
          explanation: `The CMB is uniform to one part in $10^5$, and those tiny anisotropies contain more cosmological information than anything else we have. Expanding the temperature map in **spherical harmonics**, $\\Delta T(\\hat n) = \\sum a_{\\ell m}Y_{\\ell m}$, and averaging gives the **angular power spectrum** $C_\\ell = \\langle|a_{\\ell m}|^2\\rangle$; multipole $\\ell$ corresponds to angular scale $180^\\circ/\\ell$. Because we observe only one sky, each $C_\\ell$ is measured from $2\\ell + 1$ modes, giving an irreducible **cosmic variance** $\\sqrt{2/(2\\ell + 1)}$ that dominates at low $\\ell$.

Three physical regimes shape the spectrum. On the largest scales ($\\ell \\lesssim 30$) perturbations had not yet evolved at last scattering, and the **Sachs-Wolfe** effect (photons climbing out of potential wells, $\\Delta T/T = \\Phi/3c^2$) gives a flat plateau whose amplitude measures the primordial power. On intermediate scales the tightly coupled photon-baryon fluid fell into dark-matter potential wells and bounced out under photon pressure: **acoustic oscillations**, frozen at last scattering with phases set by how many oscillations fit in the available time. The result is a series of peaks at harmonics of the **sound horizon** $r_s \\approx 147$ Mpc (comoving). On small scales photons diffused out of the perturbations during the finite recombination period, erasing them: **Silk damping**.

Each feature is a parameter. The angular position of the first peak, $\\ell_1 \\approx 220$, is $r_s$ divided by the angular-diameter distance to last scattering, and measures **curvature**: a closed universe would shift it to lower $\\ell$. Flatness is now known to 0.2%. The ratio of odd to even peak heights depends on **baryon loading** (baryons add inertia, deepening compressions), giving $\\Omega_b h^2$. The overall height of the peaks relative to the plateau and the radiation-driving effect fix $\\Omega_m h^2$. The damping tail checks everything and constrains $N_{eff}$. Together with the **polarisation** spectra (E modes from scattering at last scattering, the low-$\\ell$ reionisation bump giving $\\tau$) and CMB lensing, Planck determines the six $\\Lambda$CDM parameters to sub-percent precision, including $H_0 = 67.4 \\pm 0.5$ under the assumption of $\\Lambda$CDM. Work through Wayne Hu's tutorials and Hu & Dodelson, then run CAMB against the Planck spectrum; watching the peaks move as you change parameters is the best way to learn this.`,
          resources: [
            {
              title: 'Wayne Hu — CMB tutorials',
              url: 'http://background.uchicago.edu/~whu/',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Chicago',
              note: 'The intermediate and advanced tutorials with animations of the acoustic peaks.',
              primary: true,
            },
            {
              title: 'Hu & Dodelson (2002), Cosmic microwave background anisotropies',
              url: 'https://arxiv.org/abs/astro-ph/0110414',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; the standard pedagogical review.',
            },
            {
              title: 'Planck Legacy Archive',
              url: 'https://pla.esac.esa.int/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
              note: 'Maps and the binned TT, TE, EE power spectra (COM_PowerSpect_CMB files).',
            },
            {
              title: 'Planck 2018 results VI: Cosmological parameters',
              url: 'https://arxiv.org/abs/1807.06209',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Table 2 is the definitive parameter table; section 2 explains the likelihood.',
            },
            {
              title: 'CAMB documentation (Python)',
              url: 'https://camb.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'Antony Lewis',
            },
          ],
          exercises: [
            {
              slug: 'planck-map-power-spectrum',
              title: 'Power spectrum from a Planck map',
              prompt:
                'Download the Planck SMICA CMB temperature map (HEALPix, Nside 2048, or a degraded Nside 512 version) and the common mask from the Planck Legacy Archive. With healpy, apply the mask, compute the pseudo-C_l with anafast, correct approximately for the sky fraction, and plot D_l = l(l+1)C_l/2pi up to l = 1500. Overlay the official Planck binned spectrum. Identify the first three peaks and estimate l_1. Compute the cosmic-variance band and discuss where it dominates.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'camb-parameter-tour',
              title: 'Parameter tour with CAMB',
              prompt:
                'With CAMB compute the TT spectrum for Planck 2018 parameters, then vary one parameter at a time: Omega_k = -0.05 and +0.05; Omega_b h^2 x 1.5 and x 0.67; Omega_c h^2 x 1.3 and x 0.7; H_0 = 60 and 75 (keeping physical densities fixed); n_s = 0.9 and 1.0; tau = 0.03 and 0.1. Plot each against the fiducial and the Planck data and write one sentence per parameter describing the effect and the physics behind it.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sound-horizon-and-curvature',
              title: 'Sound horizon and the first peak',
              prompt:
                'Compute the comoving sound horizon at recombination r_s = integral of c_s dz / H(z) with c_s = c / sqrt(3(1 + R)), R = 3 rho_b / 4 rho_gamma, for Planck parameters (expect about 147 Mpc). Compute the comoving angular-diameter distance to z = 1090 and the acoustic angular scale theta_* = r_s / D_M; convert to l_1 = pi / theta_* (with a correction factor of about 0.74 for the actual peak position). Repeat for Omega_k = +0.1 and -0.1 and show how l_1 shifts.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What sets the angular position of the first acoustic peak?',
              answerOutline:
                'The sound horizon at last scattering divided by the angular-diameter distance to last scattering; it is primarily sensitive to spatial curvature.',
            },
            {
              question: 'Why does increasing the baryon density raise odd peaks relative to even ones?',
              answerOutline:
                'Baryons add inertia and shift the zero point of the oscillation, enhancing compressions (odd peaks) relative to rarefactions (even peaks).',
            },
            {
              question: 'What is cosmic variance?',
              answerOutline:
                'The irreducible uncertainty in C_l from having only 2l + 1 modes on one sky: fractional error sqrt(2/(2l + 1)), largest at low l.',
            },
          ],
        },
        {
          slug: 'inflation',
          title: 'Inflation',
          summary:
            'The horizon, flatness and monopole problems, the slow-roll scalar field, the generation of a nearly scale-invariant spectrum of quantum fluctuations, and the observational tests.',
          estimatedMinutes: 100,
          objectives: [
            'State the horizon and flatness problems quantitatively and show how an accelerated phase solves both',
            'Describe slow-roll inflation and derive the slow-roll parameters and the number of e-folds',
            'Explain how quantum fluctuations become classical density perturbations and the predictions n_s < 1 and tensor modes',
            'Summarise the observational status: n_s = 0.965, r < 0.036, Gaussianity, and the open questions',
          ],
          concepts: [
            'Horizon and flatness problems',
            'Accelerated expansion and the shrinking comoving Hubble radius',
            'Inflaton field, slow-roll parameters epsilon and eta',
            'Number of e-folds N about 60',
            'Quantum fluctuations frozen at horizon exit',
            'Scalar spectral index n_s and running',
            'Tensor-to-scalar ratio r and B-mode polarisation',
            'Reheating; eternal inflation and the measure problem',
          ],
          explanation: `The hot big bang works from BBN onward but needs peculiar initial conditions. The **horizon problem**: the CMB is uniform across regions that were never in causal contact. The **flatness problem**: $|\\Omega - 1| \\propto a^2 H^2$ grows during decelerated expansion, so to be within 0.005 of flat today it had to be within $10^{-60}$ at the Planck time. Both are solved if the early Universe underwent a phase of **accelerated expansion** in which the comoving Hubble radius $(aH)^{-1}$ *shrank*: regions now far apart were once inside one causal patch, and curvature was stretched away. About 60 e-folds of expansion, $N = \\ln(a_{end}/a_{start}) \\approx 60$, suffice; this is **inflation**, proposed by Guth in 1981 and made viable by Linde, Albrecht and Steinhardt.

The simplest mechanism is a scalar field, the **inflaton** $\\phi$, slowly rolling down a flat potential $V(\\phi)$ so that its potential energy acts like a cosmological constant: $H^2 \\approx V/3M_{Pl}^2$. The **slow-roll parameters** $\\epsilon = (M_{Pl}^2/2)(V'/V)^2$ and $\\eta = M_{Pl}^2 V''/V$ must be small; inflation ends when $\\epsilon \\to 1$, after which the field oscillates and decays into particles (**reheating**), starting the hot big bang.

The profound consequence was realised in 1982: quantum fluctuations of $\\phi$ and of the metric are stretched beyond the Hubble radius, where they freeze as classical perturbations with amplitude $\\Delta_\\mathcal{R}^2 \\approx H^2/(8\\pi^2 M_{Pl}^2\\epsilon)$. Because $H$ decreases slowly during inflation, the spectrum is nearly but not exactly scale-invariant, with **spectral index** $n_s - 1 = 2\\eta - 6\\epsilon$. Planck measures $n_s = 0.965 \\pm 0.004$, excluding exact scale invariance at $8\\sigma$, a genuine prediction confirmed. Gravitational waves are also produced with **tensor-to-scalar ratio** $r = 16\\epsilon$; their signature is **B-mode** polarisation of the CMB, with the current limit $r < 0.036$ (BICEP/Keck plus Planck) already excluding the simplest monomial potentials. The fluctuations are Gaussian and adiabatic as predicted. What remains open is the identity of the inflaton, the energy scale, how inflation began, and whether it is past-eternal, producing a multiverse in which predictions require a measure. Guth's own course is the primary reading, with Baumann's TASI lectures for the fluctuation calculation.`,
          resources: [
            {
              title: 'MIT OCW 8.286 The Early Universe (Alan Guth)',
              url: 'https://ocw.mit.edu/courses/8-286-the-early-universe-fall-2013/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Lectures on the horizon and flatness problems and inflation, by its originator.',
              primary: true,
            },
            {
              title: 'Baumann — TASI lectures on inflation',
              url: 'https://arxiv.org/abs/0907.5424',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The standard graduate introduction including the quantum fluctuation calculation.',
            },
            {
              title: 'Planck 2018 results VI: Cosmological parameters',
              url: 'https://arxiv.org/abs/1807.06209',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Section 7 on inflationary constraints (n_s, r, running, non-Gaussianity).',
            },
            {
              title: 'Tong — Lectures on Cosmology (Cambridge)',
              url: 'https://www.damtp.cam.ac.uk/user/tong/cosmo.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
              note: 'Chapter on inflation with clear derivations of slow roll and the spectrum.',
            },
          ],
          exercises: [
            {
              slug: 'flatness-problem',
              title: 'The flatness problem by numbers',
              prompt:
                'Show from the Friedmann equation that Omega - 1 = k c^2 / (a H)^2. Using the radiation- and matter-era scalings of aH, compute how small |Omega - 1| must have been at BBN (t = 1 s), the electroweak scale (1e-10 s) and the Planck time (1e-43 s) for |Omega_k| < 0.005 today. Then show that N e-folds of de Sitter expansion reduce |Omega - 1| by e^-2N and find the N needed to undo the growth.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'slow-roll-models',
              title: 'Slow-roll predictions for three potentials',
              prompt:
                'For V = m^2 phi^2 / 2, V = lambda phi^4 and the Starobinsky potential V = V_0 (1 - exp(-sqrt(2/3) phi / M_Pl))^2, compute epsilon and eta as functions of phi, find phi_end where epsilon = 1, compute phi at N = 50 and 60 e-folds before the end, and predict n_s and r. Plot the three predictions on the Planck n_s-r plane (sketch the 68% and 95% contours from the Planck inflation paper) and state which models survive.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'inflation-essay',
              title: 'What inflation does and does not explain',
              prompt:
                'Write a two-page critical essay: list the predictions of inflation that have been tested (flatness, n_s < 1, adiabatic Gaussian perturbations, super-horizon correlations seen in TE polarisation), those still to be tested (r, running, non-Gaussianity), and the conceptual criticisms (initial conditions, eternal inflation, the measure problem). Conclude with what a detection or a non-detection of B modes at r about 0.001 would mean.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does inflation solve the horizon problem?',
              answerOutline:
                'During accelerated expansion the comoving Hubble radius shrinks, so the entire observable Universe was once inside a single causally connected region before inflation stretched it.',
            },
            {
              question: 'Why does inflation predict n_s slightly less than 1?',
              answerOutline:
                'The Hubble rate decreases slowly as the inflaton rolls, so modes that exit the horizon later (smaller scales) have slightly smaller amplitude: n_s - 1 = 2 eta - 6 epsilon < 0 for typical potentials.',
            },
            {
              question: 'What would a detection of primordial B-mode polarisation establish?',
              answerOutline:
                'The existence of primordial gravitational waves, fixing the energy scale of inflation via r = 16 epsilon (V^1/4 about 1e16 GeV for r about 0.01).',
            },
          ],
        },
      ],
      project: {
        slug: 'planck-parameter-estimation',
        title: 'Module project: cosmological parameters from the Planck spectrum',
        description:
          'Fit the six-parameter Lambda-CDM model to the Planck binned TT (and optionally TE, EE) power spectra using CAMB as the theory code and emcee as the sampler, with a Gaussian approximation to the likelihood above l = 30. Recover the Planck parameters (Omega_b h^2, Omega_c h^2, theta_*, tau, A_s, n_s) and derived H_0 and Omega_m, and compare with the published values.',
        deliverables: [
          'A likelihood code and sampler script with a documented approximation to the Planck likelihood',
          'Corner plot of the six parameters and derived H_0, with comparison to Planck 2018 table 2',
          'A short report on degeneracies (e.g. tau-A_s) and on how adding polarisation helps',
        ],
        estimatedHours: 15,
      },
    },
    {
      slug: 'large-scale-structure-and-dark-energy',
      title: 'Large-Scale Structure and Dark Energy',
      description:
        'The matter power spectrum and baryon acoustic oscillations, galaxy clusters and weak lensing as growth probes, and the dark-energy problem with its current tensions.',
      lessons: [
        {
          slug: 'matter-power-spectrum-and-bao',
          title: 'The matter power spectrum and baryon acoustic oscillations',
          summary:
            'Correlation functions and power spectra, the shape of P(k) and its features, galaxy bias and redshift-space distortions, and the BAO standard ruler measured by SDSS and DESI.',
          estimatedMinutes: 110,
          objectives: [
            'Define the two-point correlation function and the power spectrum and relate them',
            'Explain the shape of the linear matter power spectrum (turnover, BAO wiggles, nonlinear tail)',
            'Explain galaxy bias and redshift-space distortions and their uses',
            'Measure the galaxy correlation function from SDSS and detect the BAO peak',
          ],
          concepts: [
            'Two-point correlation function xi(r) and power spectrum P(k)',
            'Primordial spectrum P proportional to k^n_s and the transfer function',
            'Turnover at k_eq about 0.015 h/Mpc',
            'BAO wiggles and the 150 Mpc peak in xi(r)',
            'Galaxy bias b and the halo model',
            'Redshift-space distortions: Kaiser effect, fingers of God, f sigma_8',
            'Landy-Szalay estimator and random catalogues',
            'BAO as a standard ruler: D_M / r_d and H r_d',
          ],
          explanation: `Galaxy surveys map the density field through its statistics. The **two-point correlation function** $\\xi(r)$ is the excess probability of finding a pair at separation $r$; its Fourier transform is the **power spectrum** $P(k)$, the variance per wavenumber. For a Gaussian field these contain everything, and the primordial field was Gaussian, so $P(k)$ is the central quantity of large-scale structure.

Its shape is a history lesson. Inflation gives $P \\propto k^{n_s}$; modes that entered the horizon during radiation domination had their growth stalled (Meszaros), so the spectrum turns over at $k_{eq} \\approx 0.015\\,h$ Mpc$^{-1}$ and falls as $k^{-3}$ at high $k$. Superimposed are the **baryon acoustic oscillations**: the same sound waves that make the CMB peaks left a shell of slightly enhanced density at the sound horizon around every initial overdensity, which appears as a bump in $\\xi(r)$ at $r_d \\approx 147$ Mpc (100 $h^{-1}$ Mpc) and as wiggles in $P(k)$. Eisenstein et al. detected the peak in SDSS luminous red galaxies in 2005. Since $r_d$ is known from the CMB, the apparent size of the ring gives $D_M(z)/r_d$ across the line of sight and $H(z)r_d$ along it: a **standard ruler** at every redshift, robust to nonlinear effects because the scale is so large. DESI's 2024 results measure it to about 1% in seven redshift bins.

Two complications become tools. Galaxies trace mass with a **bias** $b$ ($P_g = b^2 P_m$, about 2 for luminous red galaxies), which the halo model explains by where galaxies live. And because redshifts include peculiar velocities, clustering in redshift space is squashed along the line of sight on large scales (the **Kaiser effect**, coherent infall) and stretched on small scales (**fingers of God**, virial motions). The large-scale anisotropy measures the growth rate combination $f\\sigma_8$, a test of gravity: $f \\approx \\Omega_m^{0.55}$ in GR.

Read Tong's structure chapter and the Eisenstein paper, then do the SDSS exercise, which uses Corrfunc and the public SDSS/BOSS catalogues with their random catalogues to compute $\\xi(r)$ with the Landy-Szalay estimator and see the BAO bump with your own eyes.`,
          resources: [
            {
              title: 'Eisenstein et al. (2005), Detection of the baryon acoustic peak in the large-scale correlation function of SDSS luminous red galaxies',
              url: 'https://arxiv.org/abs/astro-ph/0501171',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              primary: true,
            },
            {
              title: 'DESI 2024 VI: Cosmological constraints from the measurements of baryon acoustic oscillations',
              url: 'https://arxiv.org/abs/2404.03002',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The current state of the art; its BAO distance table is the one used in the capstone.',
            },
            {
              title: 'SDSS data release (DR18) and legacy BOSS catalogues',
              url: 'https://www.sdss.org/dr18/',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'The BOSS DR12 galaxy catalogues (galaxy_DR12v5_CMASS/LOWZ) and random catalogues are under the legacy data pages.',
            },
            {
              title: 'Corrfunc documentation',
              url: 'https://corrfunc.readthedocs.io/',
              type: 'tool',
              cost: 'free',
              provider: 'Manodeep Sinha',
              note: 'Fast pair counting for correlation functions.',
            },
            {
              title: 'Tong — Lectures on Cosmology (Cambridge)',
              url: 'https://www.damtp.cam.ac.uk/user/tong/cosmo.html',
              type: 'textbook',
              cost: 'free',
              provider: 'University of Cambridge',
            },
          ],
          exercises: [
            {
              slug: 'power-spectrum-shape',
              title: 'Anatomy of P(k)',
              prompt:
                'With CAMB compute the linear P(k) at z = 0 for Planck parameters and for Omega_b h^2 = 0 (no baryons, approximate by a tiny value) and for Omega_m h^2 x 2. Plot them and the ratio P/P_nowiggle to isolate the BAO wiggles. Mark k_eq. Fourier-transform P(k) to xi(r) numerically and show the BAO peak at about 100 Mpc/h. Then compute the nonlinear spectrum (halofit) and show where it departs from linear theory.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'sdss-correlation-function',
              title: 'Measure xi(r) and the BAO peak in BOSS',
              prompt:
                'Download the BOSS DR12 CMASS North galaxy catalogue and its random catalogue (use a 10x random sample). Convert RA, Dec, z to comoving Cartesian coordinates with a fiducial cosmology. Using Corrfunc, count DD, DR and RR pairs in 5 Mpc/h bins from 20 to 200 Mpc/h and compute the Landy-Szalay xi(r). Plot r^2 xi(r), apply FKP-like weights if available, and identify the BAO bump at about 105 Mpc/h. Fit a Gaussian bump plus power law to estimate the peak position and its error.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Subsample to about 200,000 galaxies and 2 million randoms to keep pair counting under an hour on a laptop.',
            },
            {
              slug: 'rsd-and-growth',
              title: 'Redshift-space distortions and the growth rate',
              prompt:
                'Derive the Kaiser formula P_s(k, mu) = (b + f mu^2)^2 P(k) by linearising the mapping from real to redshift space. Compute the monopole and quadrupole ratios for b = 2 and f = 0.55 at z = 0.5 and show how the quadrupole-to-monopole ratio measures beta = f/b. Discuss why combining with the amplitude gives f sigma_8 and how a 10% deviation from GR\'s f would appear.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the matter power spectrum turn over?',
              answerOutline:
                'Modes entering the horizon during radiation domination could not grow until matter-radiation equality, suppressing small scales relative to large ones; the turnover is at the equality scale k_eq.',
            },
            {
              question: 'Why is BAO such a robust standard ruler?',
              answerOutline:
                'The scale (147 Mpc) is set by well-understood linear physics calibrated by the CMB, and it is so large that nonlinear evolution and galaxy bias shift it by less than 1%.',
            },
            {
              question: 'What are the two redshift-space distortion effects and what does each measure?',
              answerOutline:
                'Large-scale squashing (Kaiser) from coherent infall measures the growth rate f; small-scale fingers of God from virial motions measure velocity dispersions in halos.',
            },
          ],
        },
        {
          slug: 'galaxy-clusters-and-cosmic-shear',
          title: 'Galaxy clusters and cosmic shear as growth probes',
          summary:
            'Cluster abundance and the mass function as a cosmological probe, the Sunyaev-Zeldovich and X-ray selection, and weak-lensing tomography measuring S_8.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why cluster counts are exponentially sensitive to sigma_8 and Omega_m',
            'Describe cluster detection by X-rays, SZ effect and optical richness and the mass-calibration problem',
            'Explain cosmic-shear tomography and the S_8 parameter',
            'Discuss the S_8 tension between lensing/clusters and the CMB',
          ],
          concepts: [
            'Cluster mass function and its exponential tail',
            'Degeneracy: sigma_8 Omega_m^0.4',
            'X-ray selection (eROSITA), SZ selection (Planck, SPT, ACT), optical richness',
            'Mass-observable relations and hydrostatic bias',
            'Cosmic shear two-point functions and tomography',
            'S_8 = sigma_8 (Omega_m / 0.3)^0.5',
            'Intrinsic alignments, photometric redshifts, baryonic feedback on P(k)',
            'S_8 tension (about 2-3 sigma)',
          ],
          explanation: `Clusters are the rarest, most massive collapsed objects, sitting on the exponential tail of the **halo mass function**, so their abundance is exquisitely sensitive to the amplitude of fluctuations: a 10% change in $\\sigma_8$ changes the number of $10^{15}\\,M_\\odot$ clusters by a factor of several. The evolution of that abundance with redshift tracks the growth factor and therefore dark energy. The measured combination is roughly $\\sigma_8\\Omega_m^{0.4}$. The catch is **mass**: surveys find clusters through X-ray luminosity (ROSAT, eROSITA), the **Sunyaev-Zeldovich** decrement (Planck, SPT, ACT, which is redshift-independent and finds clusters to $z > 1.5$), or optical richness (DES, redMaPPer), and each observable must be calibrated against true mass, using weak lensing. Hydrostatic X-ray masses are biased low by 10-30% by non-thermal pressure, which was the main reason Planck's cluster counts initially disagreed with its own CMB.

**Cosmic shear** avoids the mass calibration entirely. The coherent distortion of galaxy shapes by all the matter along the line of sight has a two-point function that is an integral of the matter power spectrum weighted by the lensing kernel; splitting source galaxies into photometric-redshift bins (**tomography**) recovers the growth history. Stage-III surveys (KiDS, DES, HSC) each measure $S_8 = \\sigma_8\\sqrt{\\Omega_m/0.3}$ to about 3%, and their joint value $\\approx 0.76$-$0.78$ sits 2-3$\\sigma$ below the Planck $\\Lambda$CDM prediction of $0.83$: the **S$_8$ tension**, milder than the Hubble tension but persistent. Systematics include intrinsic alignments of galaxies with their local tidal field, photometric-redshift errors, shear calibration and, increasingly, the effect of baryonic feedback on the small-scale power spectrum, which AGN outflows suppress by up to 20% at $k \\sim 1$-$10\\,h$ Mpc$^{-1}$. Combining shear with galaxy clustering and galaxy-galaxy lensing (the "3x2pt" analysis) tightens everything.

Euclid, Rubin and Roman are Stage-IV experiments designed to reduce the $S_8$ uncertainty to under 1% and test whether the growth of structure follows general relativity. Read the Kilbinger review and the DES Y3 paper; the exercises use the cluster mass function and a public shear correlation function.`,
          resources: [
            {
              title: 'Kilbinger (2015), Cosmology with cosmic shear observations: a review',
              url: 'https://arxiv.org/abs/1411.0115',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              primary: true,
            },
            {
              title: 'DES Year 3 results: cosmological constraints from galaxy clustering and weak lensing',
              url: 'https://arxiv.org/abs/2105.13549',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The 3x2pt analysis; the data vectors and chains are public on the DES data site.',
            },
            {
              title: 'Planck 2018 results VI: Cosmological parameters',
              url: 'https://arxiv.org/abs/1807.06209',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Section 5.5 on the comparison with weak lensing and cluster counts.',
            },
            {
              title: 'Chandra X-ray Observatory',
              url: 'https://chandra.harvard.edu/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Chandra X-ray Center',
            },
          ],
          exercises: [
            {
              slug: 'cluster-count-sensitivity',
              title: 'Cluster counts versus sigma_8',
              prompt:
                'Using your Press-Schechter or a Tinker mass function (via the colossus or hmf Python packages) compute the comoving number density of clusters above 1e14, 3e14 and 1e15 M_sun at z = 0 and 1 for sigma_8 = 0.75, 0.81, 0.87 with Omega_m fixed, and then for Omega_m = 0.25, 0.31, 0.37 with sigma_8 fixed. Tabulate the fractional changes and show that the combination sigma_8 Omega_m^0.4 is approximately degenerate. Multiply by survey volume to predict counts for a 5000 deg^2 survey.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'shear-correlation-model',
              title: 'Model a cosmic-shear correlation function',
              prompt:
                'Using CAMB\'s nonlinear P(k, z) and the Limber approximation, compute the convergence power spectrum C_l^kappa for a source redshift distribution n(z) proportional to z^2 exp(-(z/0.5)^1.5), then transform to xi_+(theta) from 1 to 100 arcmin. Compare with the published DES Y3 or KiDS-1000 xi_+ data vector (download from the survey data pages). Show how xi_+ changes for S_8 = 0.76 versus 0.83.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 's8-tension-essay',
              title: 'Is the S_8 tension real?',
              prompt:
                'Write a one-to-two-page assessment of the S_8 tension: list the measurements (Planck, DES, KiDS, HSC, cluster counts, redshift-space distortions) with values and errors, the leading systematics (baryonic feedback, intrinsic alignments, photo-z), and two physical explanations (e.g. massive neutrinos, modified growth). State what observation could settle it.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are cluster counts so sensitive to sigma_8?',
              answerOutline:
                'Clusters populate the exponential tail of the mass function, where the abundance depends on exp(-delta_c^2 / 2 sigma^2(M)); a small change in sigma changes the count by a large factor.',
            },
            {
              question: 'What is the advantage of SZ-selected cluster samples?',
              answerOutline:
                'The SZ decrement surface brightness is independent of redshift, so SZ surveys find clusters at any distance with a nearly mass-limited selection.',
            },
            {
              question: 'What is S_8 and why is it the natural parameter for lensing?',
              answerOutline:
                'S_8 = sigma_8 (Omega_m/0.3)^0.5; cosmic shear amplitude depends on both the clustering amplitude and the matter density in approximately this combination, along the degeneracy direction.',
            },
          ],
        },
        {
          slug: 'dark-energy-and-cosmological-tensions',
          title: 'Dark energy and the state of the cosmological model',
          summary:
            'What dark energy could be, the cosmological-constant problem, the equation of state from combined probes, DESI hints of evolution, and a sober look at the Hubble and S_8 tensions.',
          estimatedMinutes: 100,
          objectives: [
            'State the cosmological-constant problem (fine tuning and coincidence) quantitatively',
            'Describe quintessence, modified gravity and other alternatives and how w(z) distinguishes them',
            'Combine SN, BAO and CMB constraints to bound w and (w_0, w_a)',
            'Assess the current tensions and the proposed early- and late-time solutions',
          ],
          concepts: [
            'Cosmological constant as vacuum energy; 120 orders of magnitude',
            'Coincidence problem',
            'Quintessence: scalar field with w > -1; phantom w < -1',
            'Modified gravity (f(R), DGP) and the growth-expansion consistency test',
            'w_0-w_a parametrisation and figure of merit',
            'DESI 2024 BAO plus SN hints of w_a < 0',
            'Hubble tension solutions: early dark energy, extra radiation, systematics',
            'Falsifiability and the future: Euclid, Rubin, Roman, CMB-S4',
          ],
          explanation: `The six-parameter $\\Lambda$CDM model fits almost everything with a cosmological constant $\\Lambda$ contributing 69% of the energy density. Physically, $\\Lambda$ is indistinguishable from **vacuum energy**, and that is the problem: quantum field theory estimates the zero-point energy at the Planck cut-off to be $10^{120}$ times the observed value (still $10^{60}$ with a TeV cut-off). No known symmetry sets it to zero, and no mechanism explains why it is small but nonzero. A second puzzle is the **coincidence problem**: $\\rho_\\Lambda$ is constant while $\\rho_m \\propto a^{-3}$, so they are comparable only in a brief epoch, which happens to be now. Weinberg's anthropic argument (galaxies cannot form if $\\Lambda$ is much larger) predicted the observed order of magnitude before the discovery and remains the only "explanation" on offer.

Alternatives replace $\\Lambda$ with a dynamical component. **Quintessence** is a slowly rolling scalar field with $-1 < w < -1/3$; **phantom** energy has $w < -1$; and **modified gravity** (f(R), braneworld models) changes the Friedmann equation itself, which generically alters the growth of structure differently from the expansion history, so comparing $f\\sigma_8$ with $H(z)$ is the key test. Observationally one parametrises $w(a) = w_0 + w_a(1 - a)$ and asks whether $(w_0, w_a) = (-1, 0)$. Supernovae constrain $w$ at low redshift, BAO at intermediate redshift, and the CMB fixes the sound horizon and the distance to last scattering; only the combination is powerful. In 2024 DESI BAO combined with Pantheon+, Union3 or DES supernovae preferred $w_0 > -1$, $w_a < 0$ (dark energy weakening with time) at 2.5-3.9$\\sigma$ depending on the SN sample, the first serious hint of departure from $\\Lambda$ and one that Euclid and Rubin will test within years.

Alongside sit the **tensions**. The Hubble tension ($5\\sigma$) resists late-time fixes because BAO plus BBN tie the low-redshift expansion to the CMB sound horizon; **early dark energy**, a component contributing 10% of the energy just before recombination to shrink $r_s$, is the leading new-physics proposal but worsens $S_8$. The $S_8$ tension (2-3$\\sigma$) may be baryonic feedback. Whether these are systematics or a crack in the model is the central question of the decade. Read the Weinberg et al. and Di Valentino reviews and the DESI paper; the exercise combines the three probes yourself.`,
          resources: [
            {
              title: 'Weinberg et al. (2013), Observational probes of cosmic acceleration',
              url: 'https://arxiv.org/abs/1201.2434',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Physics Reports; the comprehensive review of every dark-energy probe.',
              primary: true,
            },
            {
              title: 'Frieman, Turner & Huterer (2008), Dark energy and the accelerating Universe',
              url: 'https://arxiv.org/abs/0803.0982',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Annual Reviews article; shorter and more conceptual.',
            },
            {
              title: 'DESI 2024 VI: Cosmological constraints from BAO',
              url: 'https://arxiv.org/abs/2404.03002',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The w_0-w_a results combining BAO with CMB and supernovae.',
            },
            {
              title: 'Di Valentino et al. (2021), In the realm of the Hubble tension',
              url: 'https://arxiv.org/abs/2103.01183',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
            {
              title: 'Nobel Prize in Physics 2011',
              url: 'https://www.nobelprize.org/prizes/physics/2011/',
              type: 'article',
              cost: 'free',
              provider: 'Nobel Foundation',
            },
          ],
          exercises: [
            {
              slug: 'vacuum-energy-estimate',
              title: 'The 120 orders of magnitude',
              prompt:
                'Compute the zero-point energy density of a free scalar field with a momentum cut-off at the Planck scale, rho = integral of (1/2) hbar omega d^3k / (2 pi)^3, and compare with rho_Lambda = 0.69 rho_crit. Repeat for cut-offs at the electroweak scale (1 TeV) and the QCD scale (200 MeV). Then show that the anthropic bound (galaxies must form before Lambda dominates) limits rho_Lambda to within a few hundred times the observed value.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'combined-w0-wa',
              title: 'Combine SN, BAO and CMB for (w_0, w_a)',
              prompt:
                'Build a joint likelihood from: the Pantheon+ Hubble diagram, the DESI 2024 BAO measurements (D_M / r_d and D_H / r_d in each bin with their covariance, with r_d computed from your sound-horizon code or fixed to 147.1 Mpc), and a CMB distance prior (theta_* and Omega_m h^2 from Planck). Sample (Omega_m, H_0, w_0, w_a) with emcee. Plot the (w_0, w_a) posterior for each probe and the combination and state the tension with (-1, 0).',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'early-dark-energy-sound-horizon',
              title: 'How early dark energy changes the sound horizon',
              prompt:
                'Add to H(z) an extra component with energy fraction f_EDE at z about 3500 that dilutes as a^-6 afterwards (a crude model). Recompute the sound horizon r_s and show that f_EDE = 0.1 reduces r_s by about 5%. Explain why a smaller r_s raises the H_0 inferred from the CMB acoustic scale, and compute the shift. Then discuss why this worsens the S_8 tension.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the cosmological-constant problem.',
              answerOutline:
                'Quantum vacuum energy estimates exceed the observed dark-energy density by 60-120 orders of magnitude, and no mechanism explains the small nonzero value.',
            },
            {
              question: 'How could one distinguish modified gravity from a dark-energy fluid with the same expansion history?',
              answerOutline:
                'By the growth of structure: modified gravity changes f sigma_8 and lensing relative to the GR prediction for the same H(z).',
            },
            {
              question: 'Why do late-time modifications struggle to resolve the Hubble tension?',
              answerOutline:
                'BAO plus BBN measure the expansion at z < 2 relative to the sound horizon independently of the CMB; they agree with Planck, so the discrepancy points to the sound horizon itself, i.e. pre-recombination physics.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'hubble-constant-and-cosmological-fit',
    title: 'Capstone: measure the Hubble constant and fit a cosmological model',
    description: `Reproduce the two pillars of modern cosmology from public data, end to end.

Part 1, the local distance ladder. Calibrate the Cepheid period-luminosity relation with Gaia DR3 parallaxes of Milky Way Cepheids (correcting for the parallax zero point), apply it to Cepheids in a few SN Ia host galaxies using published HST photometry (Riess et al. tables), calibrate the SN Ia peak absolute magnitude, and fit the Hubble flow with Pantheon+ supernovae at 0.023 < z < 0.15. Propagate every uncertainty with a proper covariance treatment and report H_0 with a full error budget.

Part 2, the cosmological model. Fit flat and non-flat Lambda-CDM (and wCDM) to the full Pantheon+ Hubble diagram with its covariance matrix, using the astropy.cosmology distance modulus and emcee. Then add the BAO distance measurements from SDSS/DESI and the Planck CMB distance prior (shift parameter and acoustic scale) and show how the combination breaks degeneracies. Compare your inferred H_0 from the CMB-plus-BAO route with the ladder value from Part 1 and discuss the Hubble tension quantitatively.`,
    deliverables: [
      'A reproducible repository with data-download scripts, the ladder calibration notebook and the cosmological-fit notebook',
      'Period-luminosity calibration plot, SN Ia Hubble diagram with residuals, and corner plots for each model fit',
      'A table of H_0, Omega_m, Omega_Lambda and w with uncertainties for each dataset combination',
      'A 6-10 page report in the style of a cosmology paper, including an honest error budget and a discussion of the Hubble tension',
    ],
    estimatedHours: 40,
    stretchGoals: [
      'Replace the Cepheid calibration with the tip of the red giant branch using Gaia and HST data and compare the two H_0 values',
      'Compute the CMB angular power spectrum with CAMB for your best-fit parameters and overlay the Planck data',
      'Fit a two-parameter dark-energy model (w_0, w_a) and assess whether the DESI BAO plus SN data prefer evolving dark energy',
    ],
  },
  masteryChecklist: [
    'I can describe the components of the Milky Way and measure its rotation curve, solar motion and halo substructure from Gaia data',
    'I can compute potentials, orbits and epicyclic frequencies for realistic galaxy models and use the Jeans equations to infer mass',
    'I can summarise the evidence for dark matter from rotation curves, clusters, lensing and the CMB and explain the NFW profile',
    'I can explain how galaxies form in dark-matter halos, including cooling, star formation, feedback and quenching, and read the cosmic star-formation history',
    'I can derive the Friedmann equations, compute cosmological distances and ages, and fit a cosmological model to supernova data',
    'I can describe the thermal history of the Universe, compute BBN abundances approximately, and explain recombination',
    'I can explain the physics of the CMB acoustic peaks and extract parameters from the Planck power spectrum',
    'I can explain inflation, the growth of structure, BAO and weak lensing, and state the current cosmological tensions',
    'I have measured the Hubble constant from real data and fitted a cosmological model with proper uncertainties',
  ],
});
