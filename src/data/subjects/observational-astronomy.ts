import { defineSubject } from '../define';

export default defineSubject({
  id: 'observational-astronomy',
  title: 'Observational Astronomy and Data Analysis',
  category: 'astronomy',
  tagline:
    'From photons on a detector to a number with an error bar: coordinates, instruments, photometry, spectroscopy and real archive data in Python.',
  description: `Most of what an astronomer actually does is turn raw detector output into a measurement they can defend. This subject teaches that craft. You will learn how positions and times are specified so that two telescopes agree on where and when; how optics, detectors and the atmosphere limit what can be measured; how to extract brightnesses (photometry) and spectra (spectroscopy) from images; and how to attach honest uncertainties to the result.

The whole subject is hands-on and in Python. The tools are the standard ones used in research: astropy for FITS files, coordinates, time and units; photutils, ccdproc and specutils for reduction; lightkurve for Kepler and TESS light curves; astroquery and ADQL for pulling data out of Gaia, SDSS, MAST, HEASARC and the NASA Exoplanet Archive; and scipy and emcee for fitting. Every lesson includes an exercise on real data, not simulated data, and the capstone is a complete reduction from raw frames to a published-quality measurement.

The statistics module leans on the probability-statistics subject for the theory and concentrates on the specific habits of astronomers: chi-squared fitting and its abuses, Bayesian parameter estimation with MCMC, selection effects and upper limits. The surveys module is a guided tour of the archives you will use for the rest of your life.`,
  difficulty: 'intermediate',
  estimatedHours: 80,
  prerequisites: ['intro-astronomy', 'programming-fundamentals', 'probability-statistics'],
  recommendedBackground: [
    'Comfortable with numpy and matplotlib',
    'Basic calculus and trigonometry',
    'Having used a telescope or binoculars at least once helps the coordinates module make sense',
  ],
  tags: ['astronomy', 'data analysis', 'python', 'astropy', 'photometry', 'spectroscopy', 'surveys', 'Gaia', 'SDSS', 'TESS'],
  core: true,
  modules: [
    {
      slug: 'coordinates-time-and-the-celestial-sphere',
      title: 'Coordinates, Time and the Celestial Sphere',
      description:
        'The reference systems that let you say exactly where and when an observation was made, and the software that converts between them.',
      lessons: [
        {
          slug: 'celestial-coordinate-systems',
          title: 'Celestial coordinate systems',
          summary:
            'Horizontal, equatorial, ecliptic and galactic coordinates: what each is for, how they relate, and how to convert between them with astropy.',
          estimatedMinutes: 100,
          objectives: [
            'Define right ascension and declination and explain why the equatorial system is the catalogue standard',
            'Convert between horizontal (alt/az) and equatorial coordinates by hand for a simple case and with astropy in general',
            'Choose the appropriate system (ecliptic, galactic, supergalactic) for a given problem',
            'Compute angular separations and position angles correctly on the sphere',
          ],
          concepts: [
            'Horizontal system: altitude, azimuth; observer-dependent',
            'Equatorial system: RA (hours) and Dec (degrees); vernal equinox origin',
            'Hour angle and local sidereal time',
            'Ecliptic and galactic coordinates',
            'Spherical trigonometry; the cosine rule for separations',
            'astropy.coordinates SkyCoord and frames',
            'Sexagesimal notation and its pitfalls',
          ],
          explanation: `A position on the sky is a direction, so it needs two angles and a reference system. The **horizontal** system (altitude above the horizon, azimuth from north through east) is what a telescope mount or your eye uses, but it depends on where you stand and changes every second. The **equatorial** system fixes that by using the celestial equator and the vernal equinox as references: **declination** $\\delta$ is the angle north of the equator, **right ascension** $\\alpha$ the angle east of the equinox, measured in hours (24 h = 360 deg, so 1 h = 15 deg). Catalogues use equatorial coordinates because they are the same for every observer.

The link between the two systems is the **hour angle** $H = \\mathrm{LST} - \\alpha$, where LST is the **local sidereal time**, the right ascension currently on your meridian. The altitude then follows from spherical trigonometry:
$$\\sin a = \\sin\\phi\\sin\\delta + \\cos\\phi\\cos\\delta\\cos H ,$$
with $\\phi$ the latitude. Check the limits: at $H = 0$ (transit) the altitude is $90^\\circ - |\\phi - \\delta|$, the formula from intro-astronomy.

Other systems exist because other problems have other natural planes. **Ecliptic** coordinates (latitude and longitude relative to Earth's orbital plane) are natural for solar-system work. **Galactic** coordinates $(l, b)$ put the Milky Way's plane at $b = 0$ and its centre at $l = 0$, so a plot of the sky in galactic coordinates shows the structure of the Galaxy at a glance.

Two pitfalls dominate practical work. First, the angular separation between two points is *not* $\\sqrt{\\Delta\\alpha^2 + \\Delta\\delta^2}$; the RA difference must be scaled by $\\cos\\delta$, and for large separations you need the spherical cosine rule. Second, sexagesimal strings are error-prone: a declination of -00:30:00 is -0.5 degrees, and parsers that read the sign off the integer part get it wrong. Use **astropy.coordinates.SkyCoord**: it stores positions with a frame, converts between frames with one call, computes separations correctly, and parses strings safely. Work through the astropy coordinates documentation and do every exercise in code.`,
          resources: [
            {
              title: 'astropy.coordinates documentation',
              url: 'https://docs.astropy.org/en/stable/coordinates/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Read the overview, "Transforming between systems" and "Separations, offsets and position angles".',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 2.1 The Sky Above (the celestial sphere)',
              url: 'https://openstax.org/books/astronomy-2e/pages/2-1-the-sky-above',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Conceptual refresher on the celestial sphere; section 4.1 Earth and Sky introduces RA and Dec.',
            },
            {
              title: 'Celestial Mechanics (Tatum) — LibreTexts, chapter on the celestial sphere',
              url: 'https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Celestial_Mechanics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Chapter 6 "The Celestial Sphere" derives the spherical-trigonometry transformations in full.',
            },
            {
              title: 'Astronomical Algorithms (Meeus, 2nd ed.)',
              url: 'https://shopatsky.com/products/astronomical-algorithms-2nd-edition',
              type: 'textbook',
              cost: 'paid',
              provider: 'Willmann-Bell / Sky & Telescope',
              note: 'The classic reference for every transformation; the free alternatives above and astropy cover the same ground.',
            },
          ],
          exercises: [
            {
              slug: 'altaz-by-hand',
              title: 'Altitude and azimuth by hand',
              prompt:
                'Vega has RA 18h 36m 56s, Dec +38 47\' 01". For an observer at latitude 40 N, longitude 75 W, compute Vega\'s altitude and azimuth at local sidereal time 20h 00m using the spherical-trigonometry formulas. Then repeat with astropy (SkyCoord, EarthLocation, AltAz, choosing a UTC that gives that LST) and compare. Explain any difference larger than an arcminute (hint: refraction, precession of the catalogue epoch).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'separation-pitfall',
              title: 'The cos(dec) trap',
              prompt:
                'Write a function that computes the naive separation sqrt(dRA^2 + dDec^2) (in degrees) and compare it with SkyCoord.separation for pairs of points at declinations 0, 45, 70 and 85 degrees separated by 1 degree of RA. Plot the fractional error versus declination. Then compute the separation between the two components of Albireo from SIMBAD coordinates and compare with the catalogued 35 arcseconds.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'galactic-sky-map',
              title: 'A galactic-coordinate sky map from Gaia',
              prompt:
                'Query Gaia DR3 for 200,000 random stars (use a random_index < 200000 cut) with ra, dec and G magnitude. Transform to galactic coordinates with astropy and plot an Aitoff projection of the density. Overlay the ecliptic as a line. Identify the Galactic plane, the bulge, the Magellanic Clouds and any scanning-law artefacts, and explain why the Gaia density is not simply the true stellar density.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'matplotlib: subplot(projection="aitoff") takes longitude in radians in (-pi, pi]; wrap l accordingly.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is RA measured in hours, and what is the hour angle?',
              answerOutline:
                'Because the sky turns 15 degrees per hour; RA in hours tells you directly when an object transits. Hour angle = LST - RA is the time since (or until) transit.',
            },
            {
              question: 'Two stars at Dec +60 differ in RA by 1 hour. What is their separation?',
              answerOutline: '15 degrees times cos(60) = 7.5 degrees (to first order; the spherical formula gives 7.47).',
            },
            {
              question: 'When would you use galactic rather than equatorial coordinates?',
              answerOutline:
                'When the Milky Way\'s plane is the natural reference: mapping stellar populations, extinction, the distribution of star clusters or gas.',
            },
          ],
        },
        {
          slug: 'time-systems-and-julian-dates',
          title: 'Time systems: UTC, sidereal time, Julian dates and barycentric time',
          summary:
            'Why astronomy has half a dozen time scales, how to convert between them, and why a transit timing or pulsar measurement is meaningless without the right one.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish UT1, UTC, TAI and TT and explain the role of leap seconds',
            'Convert civil dates to Julian Date and Modified Julian Date and explain why astronomers use them',
            'Compute local sidereal time from longitude and UTC',
            'Explain barycentric correction and compute BJD_TDB for an observation with astropy',
          ],
          concepts: [
            'Solar vs sidereal day; Greenwich and local sidereal time',
            'UT1, UTC, TAI, TT, TDB; leap seconds',
            'Julian Date (JD) and Modified Julian Date (MJD = JD - 2400000.5)',
            'Light-travel-time (Roemer) correction to the barycentre',
            'HJD vs BJD; the 8-minute error',
            'astropy.time.Time scales and formats',
          ],
          explanation: `A date like "2026-03-01 22:00" is ambiguous for science. Which time zone? Daylight saving? And for intervals spanning months, how many days is that? Astronomers solve the first problem with **UTC** and the second with the **Julian Date**: a continuous count of days since noon on 1 January 4713 BC, so JD 2460000.5 is a midnight in early 2023 and differences are just subtractions. The **Modified Julian Date** MJD = JD - 2400000.5 starts at midnight and has fewer digits.

Beneath UTC are several **time scales**. **UT1** follows Earth's actual, slightly irregular rotation. **TAI** is atomic time, perfectly uniform. **UTC** is TAI with integer **leap seconds** inserted so it stays within 0.9 s of UT1; it therefore has discontinuities, and a difference of two UTC times can be off by a second across a leap. **TT** (Terrestrial Time) is TAI + 32.184 s, the uniform scale used for ephemerides. **TDB** additionally removes relativistic effects of Earth's orbit. The astropy **Time** object stores a time with its scale and converts between them; always store times with an explicit scale.

**Sidereal time** is the right ascension on the meridian. Greenwich sidereal time depends only on UT1; your local sidereal time adds your east longitude (in hours). You need it to point a telescope and to know when a target transits.

The subtlest issue is **where** the clock is. Earth moves around the Sun at 30 km/s, so light from a star arrives up to 8.3 minutes earlier or later depending on the season. Any periodic phenomenon (transit times, pulsar pulses, eclipsing-binary minima) must be referred to the solar-system **barycentre**: BJD = JD + light-travel correction, computed from the target's coordinates and the observatory position. Old papers used the heliocentre (HJD), which differs by up to several seconds from BJD. Reporting "JD" when you mean BJD_TDB can introduce 16-minute errors in an ephemeris. astropy's light_travel_time method does the correction in two lines; use it in the exercise and never trust a time series that does not state its scale and reference.`,
          resources: [
            {
              title: 'astropy.time documentation',
              url: 'https://docs.astropy.org/en/stable/time/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Time scales, formats, sidereal time, and "Barycentric and Heliocentric Light Travel Time Corrections".',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 4.3 Keeping Time',
              url: 'https://openstax.org/books/astronomy-2e/pages/4-3-keeping-time',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Conceptual background on solar and sidereal time.',
            },
            {
              title: 'US Naval Observatory Astronomical Applications',
              url: 'https://aa.usno.navy.mil/',
              type: 'tool',
              cost: 'free',
              provider: 'US Naval Observatory',
              note: 'Julian date converter and sidereal time calculator to check your code.',
            },
            {
              title: 'Skyfield documentation',
              url: 'https://rhodesmill.org/skyfield/',
              type: 'documentation',
              cost: 'free',
              provider: 'Brandon Rhodes',
              note: 'An alternative Python library with a particularly clear treatment of time scales.',
            },
          ],
          exercises: [
            {
              slug: 'jd-and-lst',
              title: 'Julian date and sidereal time from scratch',
              prompt:
                'Implement the standard algorithm for JD from a Gregorian calendar date (Meeus chapter 7; also in many online references) and a function for Greenwich mean sidereal time from JD. Compute LST for your longitude at the current UTC and compare with astropy Time.sidereal_time and with the USNO calculator. Then compute how many sidereal seconds elapse in one UTC day and explain the 3 m 56 s difference.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'barycentric-correction',
              title: 'Barycentric correction for a transit',
              prompt:
                'A transit of WASP-12 b (RA 06h 30m 32.8s, Dec +29 40\' 20") is observed from the Las Cumbres site at McDonald Observatory (lon -104.02, lat 30.67, alt 2070 m) at mid-time 2024-01-15 04:12:30 UTC. Using astropy, compute the light travel time to the barycentre and the heliocentre, and report BJD_TDB and HJD_UTC. Then compute the correction at six-month intervals over a year and plot it; explain its amplitude and shape in terms of the Earth\'s orbit and the target\'s ecliptic latitude.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'leap-second-trap',
              title: 'Leap seconds and time differences',
              prompt:
                'Using astropy Time with scale="utc", compute the difference between 2016-12-31 23:59:00 and 2017-01-01 00:01:00 in seconds; repeat with the times converted to TAI. Explain the result. Then write a paragraph on why pulsar timing and GNSS use TAI-like scales and what would go wrong with UTC.',
              kind: 'coding',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do astronomers use Julian Dates?',
              answerOutline:
                'A continuous day count makes intervals simple subtractions, avoids calendar and time-zone ambiguities, and spans all historical observations.',
            },
            {
              question: 'What is the maximum size of the barycentric light-travel correction and what sets it?',
              answerOutline:
                'About 8.3 minutes (1 AU / c) for a target in the ecliptic; it scales with cos of ecliptic latitude and varies sinusoidally through the year.',
            },
            {
              question: 'What is the difference between TT and UTC right now, approximately?',
              answerOutline:
                'TT = TAI + 32.184 s and TAI = UTC + 37 s (since 2017), so TT - UTC is about 69.2 s.',
            },
          ],
        },
        {
          slug: 'precession-proper-motion-and-epochs',
          title: 'Precession, nutation, aberration, proper motion and epochs',
          summary:
            'Why catalogue positions carry an epoch and an equinox, how the Earth\'s wobble and the star\'s own motion move coordinates, and how to propagate a Gaia position to tonight.',
          estimatedMinutes: 90,
          objectives: [
            'Explain precession and nutation and estimate their size over a given interval',
            'Distinguish equinox (reference frame orientation) from epoch (time of the position) and understand ICRS/J2000',
            'Propagate a star\'s position using its proper motion and parallax to a new epoch',
            'Explain stellar aberration and atmospheric refraction and when each matters',
          ],
          concepts: [
            'Precession: 50 arcsec/yr, 26,000-year cycle',
            'Nutation: 9 arcsec, 18.6-year period',
            'Equinox vs epoch; B1950, J2000, ICRS',
            'Proper motion in mas/yr; mu_alpha* = mu_alpha cos(dec)',
            'Parallax ellipse',
            'Annual aberration: 20.5 arcsec',
            'Refraction near the horizon',
          ],
          explanation: `The equatorial system is tied to Earth's equator and the equinox, and neither stays put. The Moon and Sun torque Earth's equatorial bulge, making the spin axis **precess** around the ecliptic pole once every 26,000 years; the equinox slides westward along the ecliptic at 50 arcseconds per year, so every star's RA and Dec change by up to about that much annually. Superposed is **nutation**, a 9-arcsecond wobble with the 18.6-year period of the lunar nodes. A catalogue must therefore state the **equinox** that defines its axes: B1950 and J2000 were the historical standards. Since 1998 the standard is the **ICRS**, a frame fixed by distant quasars that no longer precesses at all; it coincides with J2000 to within tens of milliarcseconds.

The star also moves. Its **proper motion** $\\mu$ (in milliarcseconds per year) shifts its position steadily; Barnard's Star moves 10 arcseconds per year, a lunar diameter in two centuries. The **epoch** of a catalogue is the date to which its positions refer; Gaia DR3 positions are for epoch 2016.0, so a target with $\\mu = 500$ mas/yr has moved 5 arcseconds by 2026, enough to miss a spectrograph slit. Note the convention $\\mu_{\\alpha*} = \\mu_\\alpha\\cos\\delta$: catalogues give the on-sky RA motion already multiplied by $\\cos\\delta$. The **parallax** adds an annual ellipse of semi-major axis equal to the parallax itself.

Two further effects apply to the apparent direction. **Annual aberration**, from Earth's 30 km/s orbital speed, tilts every star by up to $v/c = 20.5$ arcseconds toward the direction of motion; **refraction** lifts objects near the horizon by up to half a degree (the Sun is geometrically below the horizon when you see it set). Telescope control systems apply all of these; your job is to supply an ICRS position, epoch and proper motion and to know which corrections the system makes.

Do the exercises with astropy's apply_space_motion and frame transformations, and check the orders of magnitude against the numbers above.`,
          resources: [
            {
              title: 'astropy.coordinates — proper motion, parallax and apply_space_motion',
              url: 'https://docs.astropy.org/en/stable/coordinates/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'See "Velocities in SkyCoord" and the FK5/ICRS/GCRS frame descriptions for precession and aberration.',
              primary: true,
            },
            {
              title: 'Celestial Mechanics (Tatum) — LibreTexts',
              url: 'https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Celestial_Mechanics_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Chapter 6 covers precession, nutation and aberration with derivations.',
            },
            {
              title: 'Gaia DR3 release documentation',
              url: 'https://www.cosmos.esa.int/web/gaia/dr3',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
              note: 'Reference epoch, astrometric conventions and the definition of pmra (= mu_alpha cos delta).',
            },
          ],
          exercises: [
            {
              slug: 'propagate-barnards-star',
              title: 'Where is Barnard\'s Star tonight?',
              prompt:
                'Query Gaia DR3 for Barnard\'s Star (source_id 4472832130942575872) to get ra, dec, pmra, pmdec, parallax and radial_velocity at epoch 2016.0. Build a SkyCoord with full space motion and apply_space_motion to today\'s date. Report the shift in arcseconds and compare with the simple mu times dt estimate. Then transform the ICRS position to FK5 equinox B1950 and to the apparent GCRS frame for today and tabulate the differences, labelling which effect (precession, aberration) produces each.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'precession-rate',
              title: 'Precession from first principles',
              prompt:
                'The RA and Dec changes due to precession are approximately dRA/dt = m + n sin(RA) tan(Dec) and dDec/dt = n cos(RA), with m = 46.1 arcsec/yr and n = 20.0 arcsec/yr. Compute the annual change for Polaris (RA 2h 32m, Dec +89 16\'), Vega and a star on the equator at RA 6h. Explain why Polaris\'s RA changes so fast, and compute roughly when Polaris will be closest to the pole and which star will be the pole star in 12,000 years.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'refraction-sunset',
              title: 'Refraction at sunset',
              prompt:
                'Using the approximate refraction formula R = 1.02 / tan(h + 10.3/(h + 5.11)) arcminutes (h in degrees), compute the refraction at altitudes 0, 1, 5, 10, 30 and 60 degrees. Show that the Sun\'s upper limb appears on the horizon when its centre is geometrically about 50 arcminutes below it, and compute by how many seconds this lengthens the day at the equator. Why is the setting Sun flattened?',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between the equinox and the epoch of a catalogue?',
              answerOutline:
                'Equinox specifies the orientation of the coordinate axes (J2000, ICRS); epoch is the date the position refers to, which matters because of proper motion.',
            },
            {
              question: 'A Gaia DR3 star has pmra = 300 mas/yr and pmdec = -400 mas/yr. How far has it moved by 2026?',
              answerOutline:
                'Total proper motion 500 mas/yr over 10 years = 5 arcseconds along the direction of motion.',
            },
            {
              question: 'Why did the ICRS replace equinox-based systems?',
              answerOutline:
                'It is defined by extragalactic radio sources, so it is kinematically fixed and does not precess; positions no longer need to be re-reduced to a new equinox.',
            },
          ],
        },
        {
          slug: 'planning-observations',
          title: 'Planning observations: visibility, airmass, the Moon and exposure budgets',
          summary:
            'How to decide what can be observed from where and when, and how to write a night plan that a robotic telescope or a human can execute.',
          estimatedMinutes: 90,
          objectives: [
            'Compute rise, transit and set times and the hours a target is above a given altitude',
            'Compute airmass and explain why observations above airmass 2 are usually avoided',
            'Account for twilight, Moon phase and separation, and target priorities in a night plan',
            'Generate an airmass plot and a finding chart with astropy and astroplan',
          ],
          concepts: [
            'Airmass X ≈ sec z; extinction grows with X',
            'Astronomical twilight (Sun 18 degrees below horizon)',
            'Observing seasons and the Sun\'s RA',
            'Moon phase, sky brightness and separation',
            'Hour-angle limits and mount constraints',
            'Finding charts and blind offsets',
            'astroplan Observer, FixedTarget, constraints',
          ],
          explanation: `Observing time is the scarce resource, and a plan that puts targets at the wrong time wastes it. The first question is **when is the target up**: it transits when LST equals its RA, so a target with RA 6 h transits at local midnight around early December (when the Sun's RA is 18 h). Each day the sky shifts 4 minutes earlier, so every target has an **observing season** of a few months around its opposition.

The second question is **how high**. Light passes through more atmosphere at low altitude; the **airmass** $X \\approx \\sec z$ (with $z$ the zenith angle, $X = 1$ overhead, 2 at 30 degrees altitude, about 3 at 20 degrees) measures that. Extinction and seeing both degrade roughly in proportion to $X$, and differential refraction smears spectra, so most programmes restrict observations to $X < 2$ and precision photometry to $X < 1.5$. A target's usable window is the span of hour angles within that airmass limit, typically four to six hours per night.

Third, **the sky itself**. Astronomical night runs from the end of evening twilight (Sun 18 degrees below the horizon) to the start of morning twilight, which at mid-latitudes in summer may be only a few hours. The Moon brightens the sky by several magnitudes per square arcsecond near full and within 30 degrees; faint-object imaging is scheduled in dark time, bright-star photometry and spectroscopy in bright time. Robotic networks and queue-scheduled telescopes encode all of this as **constraints**: altitude, airmass, Moon separation, time windows and priority.

Build these calculations yourself once (the exercises) and then use **astroplan**, which wraps astropy with Observer and Target objects, constraint checking, airmass plots and finding charts. A good night plan lists each target with its window, exposure sequence, calibrations (bias, dark, flat, standard stars) and a fallback if conditions change. The 12.409 handouts show what a practical plan looks like for a small telescope.`,
          resources: [
            {
              title: 'astropy coordinates — "Observing planning" and AltAz examples',
              url: 'https://docs.astropy.org/en/stable/coordinates/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'The example of computing the altitude of M33 through a night is the template for the airmass exercise. The astroplan package (astroplan.readthedocs.io) builds on this.',
              primary: true,
            },
            {
              title: 'MIT OCW 12.409 Hands-On Astronomy — lecture notes',
              url: 'https://ocw.mit.edu/courses/12-409-hands-on-astronomy-observing-stars-and-planets-spring-2002/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Weekly handouts on planning, telescope setup and CCD observing at a student observatory.',
            },
            {
              title: 'Las Cumbres Observatory — Education and robotic telescope access',
              url: 'https://lco.global/education/',
              type: 'tool',
              cost: 'freemium',
              provider: 'Las Cumbres Observatory',
              note: 'Programmes that grant time on the 0.4 m network; their observation request form is a real constraint-based scheduler.',
            },
            {
              title: 'Stellarium',
              url: 'https://stellarium.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Stellarium',
              note: 'Quick visual check of visibility and Moon position for any date.',
            },
          ],
          exercises: [
            {
              slug: 'airmass-plot',
              title: 'Airmass plot for five targets',
              prompt:
                'For your location and a date of your choice, use astropy (or astroplan) to compute the altitude and airmass of M31, M42, the Pleiades, M13 and the Galactic centre every 10 minutes through the night between astronomical twilights. Plot airmass against time (inverted y axis, 1 at top, cut at 3). Mark the Moon\'s altitude and phase. State for each target the window during which X < 2 and rank them for a single-night programme with a justification.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'observing-season',
              title: 'Observing seasons by RA',
              prompt:
                'Derive the date on which a target of right ascension alpha transits at local midnight (use the Sun\'s RA, which increases by about 2 hours per month from 0h at the March equinox). Tabulate the best month for targets at RA 0, 3, 6, 9, 12, 15, 18 and 21 h. Then explain why, at a site at latitude 30 N, Omega Centauri (Dec -47) has a usable window of only about two hours per night even in its season, by computing its maximum altitude and the hour angles at which it reaches airmass 2.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'night-plan',
              title: 'Write a complete night plan',
              prompt:
                'Write a plan for one night on a 0.4 m robotic telescope to obtain a transit light curve of a known exoplanet (choose one from the NASA Exoplanet Archive with a transit predicted for your night; use its ephemeris to compute the transit window with BJD and a margin of one hour on each side), plus calibration frames and a comparison-star field check. Include airmass at ingress and egress, Moon separation, exposure time and cadence justification, and a fallback target. Format it as the LCO request form would require.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'At what altitude is the airmass 2, and why do observers usually stop there?',
              answerOutline:
                '30 degrees (sec 60 = 2). Extinction, seeing degradation and differential refraction all grow roughly linearly with airmass, doubling their effect relative to the zenith.',
            },
            {
              question: 'A target has RA 14h. When does it transit at midnight?',
              answerOutline: 'When the Sun is at RA 2h, around late April / early May.',
            },
            {
              question: 'Why does the Moon matter more for faint galaxies than for bright-star photometry?',
              answerOutline:
                'Scattered moonlight raises the sky background; faint-object signal-to-noise is sky-limited, while bright stars dominate their own noise budget.',
            },
          ],
        },
      ],
      project: {
        slug: 'ephemeris-and-visibility-tool',
        title: 'Project: a visibility and ephemeris tool',
        description: `Write a small command-line tool that takes a target name (resolved through SIMBAD with astroquery) or coordinates, an observatory (name from astropy's site list or lat/lon/alt), and a date, and prints: ICRS position propagated to the date with Gaia proper motion if available, rise/transit/set times, the window with airmass below 2, twilight times, Moon phase and separation, and the barycentric light-travel correction at transit. Add an option to output an airmass plot. Test it against Stellarium and the USNO calculators for three targets.`,
        deliverables: [
          'A Python package or script with a README and at least five unit tests (e.g. transit time of a known star, JD of a known date)',
          'Validation table comparing your outputs with Stellarium/USNO for three targets at two sites',
          'An example airmass plot',
        ],
        estimatedHours: 8,
        stretchGoals: ['Accept a list of targets and produce an optimised observing sequence subject to airmass and Moon constraints'],
      },
    },
    {
      slug: 'telescopes-detectors-and-noise',
      title: 'Telescopes, Detectors and Noise',
      description:
        'What limits a measurement: optics, the CCD and its calibration, the noise sources that set the signal-to-noise ratio, and the atmosphere.',
      lessons: [
        {
          slug: 'optics-resolution-and-plate-scale',
          title: 'Telescope optics: focal length, plate scale, resolution and sampling',
          summary:
            'The handful of optical relations you need to design or understand any imaging system, and how to match a detector to a telescope.',
          estimatedMinutes: 90,
          objectives: [
            'Compute plate scale, field of view and the pixel scale of a telescope-camera combination',
            'Compute the diffraction limit and the Airy pattern size and compare with seeing',
            'Apply the Nyquist sampling criterion to choose pixel scale',
            'Explain focal ratio, étendue and why fast systems are used for surveys',
          ],
          concepts: [
            'Focal length f, aperture D, focal ratio f/D',
            'Plate scale 206265/f arcsec per mm',
            'Airy disk: first dark ring at 1.22 lambda/D',
            'Point spread function (PSF) and FWHM',
            'Nyquist sampling: 2 pixels per FWHM',
            'Étendue A Omega and survey speed',
            'Reflector designs: Newtonian, Cassegrain, Ritchey-Chrétien',
          ],
          explanation: `A telescope forms an image in its focal plane; the **plate scale** converts angles on the sky to distances there. A small angle $\\theta$ (radians) lands at distance $f\\theta$ from the axis, so
$$s = \\frac{206265}{f\\,(\\mathrm{mm})}\\ \\mathrm{arcsec\\ per\\ mm}.$$
Multiply by the pixel size to get arcseconds per pixel, and by the detector width to get the field of view. A 1000 mm focal length with 4 micron pixels gives 0.83 arcsec/pixel.

Diffraction sets the smallest resolvable detail: a point source becomes an **Airy pattern** whose first dark ring has radius $1.22\\lambda/D$, i.e. 0.14 arcseconds for a 1 m telescope at 550 nm. From the ground, turbulence blurs the image into a **seeing disk** of 0.5-2 arcseconds, so for any telescope larger than about 20 cm the delivered **point spread function** (PSF) is set by seeing unless adaptive optics is used. The PSF's full width at half maximum (FWHM) is the number you will measure on every frame.

Pixels must sample the PSF properly. The **Nyquist criterion** says at least two pixels across the FWHM; coarser sampling loses resolution and makes PSF fitting unreliable, while much finer sampling spreads the light over many pixels and adds read noise. A 1 arcsecond site therefore wants about 0.5 arcsec/pixel, which fixes the focal length once the pixel size is known.

The **focal ratio** $f/D$ sets how concentrated the light is: a fast (low) f-ratio gives a wide field and bright extended-source images per pixel, which is why survey telescopes are fast and wide. The product of collecting area and field solid angle, the **étendue** $A\\Omega$, measures survey speed. Finally, the common reflector designs trade field quality for simplicity: a Newtonian has coma off-axis, a Cassegrain folds the path, and a Ritchey-Chrétien (Hubble, most research telescopes) corrects coma for wide fields. Read OpenStax 6.1 and 6.2 for the designs and the Bolte AY 257 notes for the quantitative treatment, then do the design exercise.`,
          resources: [
            {
              title: 'UCSC AY 257 Modern Observational Techniques (Bolte) — lecture notes',
              url: 'https://www.ucolick.org/~bolte/AY257/',
              type: 'course',
              cost: 'free',
              provider: 'UC Santa Cruz',
              note: 'The telescope optics and detector lectures are the quantitative reference for this module.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 6.1 Telescopes',
              url: 'https://openstax.org/books/astronomy-2e/pages/6-1-telescopes',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Designs and the concepts of light gathering and resolution.',
            },
            {
              title: 'Las Cumbres Observatory SpaceBook — How Telescopes Work',
              url: 'https://lco.global/spacebook/telescopes/',
              type: 'article',
              cost: 'free',
              provider: 'Las Cumbres Observatory',
            },
          ],
          exercises: [
            {
              slug: 'design-an-imaging-system',
              title: 'Design an imaging system',
              prompt:
                'You have a 0.4 m f/8 telescope at a site with median seeing 1.5 arcseconds and a choice of cameras with 3.76, 9 and 13.5 micron pixels (each 4096 x 4096). For each camera compute the pixel scale, field of view and pixels per FWHM. Choose the camera that best satisfies Nyquist sampling and justify it. Then compute the focal reducer factor needed to make the 9 micron camera Nyquist-sampled and the resulting field of view.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'airy-pattern',
              title: 'Simulate the Airy pattern and seeing',
              prompt:
                'In Python, compute the 2D Airy pattern for a 1 m aperture at 550 nm (intensity proportional to [2 J1(x)/x]^2 with x = pi D theta / lambda) on a grid of 0.02 arcsecond pixels and measure its FWHM. Then convolve it with a 2D Gaussian of 1.0 arcsecond FWHM (seeing) and measure the resulting FWHM. Repeat for a 0.1 m aperture. Report at what aperture seeing starts to dominate and plot radial profiles of all four cases.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'scipy.special.j1 for the Bessel function; astropy.convolution for the Gaussian kernel.',
            },
            {
              slug: 'etendue-comparison',
              title: 'Survey speed of real telescopes',
              prompt:
                'Compute the étendue (collecting area times field of view in square degrees) for: Hubble WFC3 (2.4 m, 2.7 x 2.7 arcmin), the Rubin Observatory (6.4 m effective, 9.6 square degrees), the Zwicky Transient Facility (1.2 m, 47 square degrees), a 0.4 m telescope with a 30 arcmin field, and Gaia (two 1.45 x 0.5 m apertures, about 0.7 x 0.7 degree field). Rank them and discuss why the ranking does not match aperture, and what each instrument is optimised for.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'A telescope has f = 2000 mm and a camera with 5 micron pixels. What is the pixel scale?',
              answerOutline: '206265/2000 = 103 arcsec/mm, times 0.005 mm = 0.52 arcsec/pixel.',
            },
            {
              question: 'Why is a 0.5 arcsec/pixel scale appropriate for a 1 arcsecond seeing site?',
              answerOutline:
                'Nyquist sampling requires about two pixels across the PSF FWHM; finer sampling adds read noise per source, coarser loses shape information.',
            },
            {
              question: 'Why are survey telescopes built with fast focal ratios?',
              answerOutline:
                'A fast f-ratio gives a wide field for a given detector size, increasing étendue and hence the sky area covered to a given depth per unit time.',
            },
          ],
        },
        {
          slug: 'ccd-detectors-and-calibration',
          title: 'CCD detectors and basic calibration: bias, dark, flat',
          summary:
            'How a CCD turns photons into numbers, what systematic signatures it imprints, and the standard calibration sequence that removes them.',
          estimatedMinutes: 110,
          objectives: [
            'Describe how a CCD collects, transfers and reads out charge and define gain, read noise, dark current, full well and quantum efficiency',
            'Explain the purpose of bias, dark and flat frames and how master calibration frames are built',
            'Apply the calibration equation to a raw science frame with ccdproc',
            'Recognise common artefacts: hot pixels, cosmic rays, saturation and blooming, nonlinearity, vignetting',
          ],
          concepts: [
            'Photoelectric effect in silicon; potential wells',
            'Gain (e-/ADU), read noise, dark current, full well',
            'Quantum efficiency curve',
            'Bias (zero-exposure offset) and overscan',
            'Dark frames and temperature scaling',
            'Flat fields: pixel-to-pixel and large-scale response',
            'Calibration equation: (raw - bias - dark) / flat',
            'Cosmic rays and sigma-clipped combination',
          ],
          explanation: `A **CCD** is a grid of silicon pixels. Each photon absorbed frees an electron (with probability equal to the **quantum efficiency**, up to 90 percent) which is held in the pixel's potential well. After the exposure the charge is shifted row by row to an output amplifier and digitised; the **gain** (electrons per ADU, analogue-to-digital unit) converts counts back to electrons. Every readout adds **read noise** (a few electrons); thermal generation adds **dark current** (electrons per pixel per second, halved for every 6-7 degrees of cooling); and each pixel saturates at its **full well**, beyond which charge **blooms** into neighbours. CMOS sensors differ in architecture but need the same calibrations.

The raw frame is the sky signal plus three instrumental signatures, removed in order. The **bias** is the electronic offset added before digitisation so negative noise excursions are not clipped; measure it with zero-second exposures (or the overscan strip) and subtract. The **dark** is the accumulated dark current; measure it with long exposures with the shutter closed at the same temperature and exposure time (or scale), subtract after bias. The **flat field** records the pixel-to-pixel sensitivity variation (a few percent) and large-scale effects (vignetting, dust donuts); obtain it by imaging a uniformly illuminated source (twilight sky, dome screen) in each filter, normalise to unity, and divide:
$$\\mathrm{science} = \\frac{\\mathrm{raw} - \\mathrm{bias} - \\mathrm{dark}}{\\mathrm{flat}_{\\rm norm}} .$$

Each master calibration frame is the median (or sigma-clipped mean) of many individual frames so that it adds negligible noise and rejects **cosmic rays**, the streaks and dots that energetic particles leave in every long exposure. Nonlinearity near full well and residual images are further traps; keep science exposures below about 70 percent of saturation.

Work through the Astropy CCD reduction guide, which does exactly this on real frames with ccdproc, and reproduce it on your own or downloaded data in the exercises. Keep every calibration frame and record the temperature and date; a flat taken in a different filter or a dark at a different temperature can do more harm than no calibration at all.`,
          resources: [
            {
              title: 'Astropy CCD Data Reduction Guide',
              url: 'https://www.astropy.org/ccd-reduction-and-photometry-guide/',
              type: 'textbook',
              cost: 'free',
              provider: 'Astropy',
              note: 'A complete, executable guide with real data: overscan, bias, dark, flat, combination and cosmic-ray removal.',
              primary: true,
            },
            {
              title: 'ccdproc documentation',
              url: 'https://ccdproc.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'OpenStax Astronomy 2e — 6.3 Visible-Light Detectors and Instruments',
              url: 'https://openstax.org/books/astronomy-2e/pages/6-3-visible-light-detectors-and-instruments',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'AAVSO CCD Photometry Guide',
              url: 'https://www.aavso.org/ccd-photometry-guide',
              type: 'textbook',
              cost: 'free',
              provider: 'AAVSO',
              note: 'A practical guide to calibration and photometry written for small-telescope observers.',
            },
          ],
          exercises: [
            {
              slug: 'full-reduction-pipeline',
              title: 'Reduce a set of real frames',
              prompt:
                'Using the example dataset from the Astropy CCD reduction guide (or your own raw frames), build master bias, dark and flat frames with ccdproc using sigma-clipped combination. Calibrate one science frame. Produce before/after images with the same display stretch and a plot of a row cut through each. Measure the standard deviation in an empty sky region before and after flat-fielding and explain the change.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'measure-gain-and-read-noise',
              title: 'Measure gain and read noise',
              prompt:
                'Take (or download) two bias frames and two flat frames of the same exposure. Using the standard method: gain = ((mean_f1 + mean_f2) - (mean_b1 + mean_b2)) / (var(f1 - f2) - var(b1 - b2)) and read noise = gain x std(b1 - b2) / sqrt(2). Compute both in electrons and compare with the manufacturer values in the FITS header. Explain why differencing two frames removes the fixed pattern.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'calibration-error-budget',
              title: 'How many calibration frames?',
              prompt:
                'A camera has read noise 5 e- and gain 1 e-/ADU; flats have 20,000 e- per pixel. Compute the noise contributed to a calibrated science pixel (sky level 500 e-) by a master bias made from N bias frames and a master flat made from N flats, for N = 1, 5, 10, 25. Find the N at which the calibration noise is below 10 percent of the science frame\'s own noise. Explain why flats need more frames than biases for the same precision.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must bias be subtracted before dividing by the flat?',
              answerOutline:
                'The flat describes multiplicative sensitivity; the bias is an additive offset that is not proportional to sensitivity, so it must be removed first or the division is wrong.',
            },
            {
              question: 'Why combine calibration frames with a median rather than a mean?',
              answerOutline:
                'The median rejects cosmic rays and other outliers that would bias a mean, while still averaging down noise.',
            },
            {
              question: 'What does a dust "donut" in a flat field tell you?',
              answerOutline:
                'A particle on a filter or window, out of focus, casts a ring shadow; the flat corrects it, provided it has not moved between flat and science frames.',
            },
          ],
        },
        {
          slug: 'noise-and-the-ccd-equation',
          title: 'Noise sources and the CCD equation: signal-to-noise and exposure times',
          summary:
            'Poisson statistics of photons, the full noise budget of a CCD measurement, and how to predict signal-to-noise and required exposure time.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why photon noise is Poisson and scales as the square root of the signal',
            'Write down the CCD equation and identify the regime (source, sky or read-noise limited) of a given observation',
            'Compute the exposure time needed to reach a target signal-to-noise ratio',
            'Convert a signal-to-noise ratio into a magnitude uncertainty',
          ],
          concepts: [
            'Poisson statistics: variance equals mean',
            'Source, sky, dark and read noise terms',
            'CCD equation: $S/N = N_*/\\sqrt{N_* + n_{pix}(N_S + N_D + N_R^2)}$',
            'Bright-source limit $S/N \\propto \\sqrt{t}$; sky limit; read-noise limit',
            'Magnitude error $\\sigma_m \\approx 1.0857/(S/N)$',
            'Zero points and count rates',
            'Co-adding vs long exposures',
          ],
          explanation: `Photons arrive at random, so the number counted in a fixed time follows a **Poisson** distribution whose variance equals its mean. If you expect $N$ photons you measure $N \\pm \\sqrt N$: the fractional precision is $1/\\sqrt N$, and reaching 1 percent photometry requires at least 10,000 detected photons, 0.1 percent requires a million. This is the floor beneath every measurement; everything else only makes it worse.

The other noise terms come from the detector and the sky. Within an aperture of $n_{pix}$ pixels, the sky contributes $N_S$ electrons per pixel, dark current $N_D$, and each pixel's readout adds variance $N_R^2$. Adding independent variances gives the **CCD equation**:
$$\\frac{S}{N} = \\frac{N_*}{\\sqrt{N_* + n_{pix}\\left(N_S + N_D + N_R^2\\right)}} ,$$
with $N_*$ the source electrons. Three regimes follow. For bright sources $N_*$ dominates and $S/N \\approx \\sqrt{N_*} \\propto \\sqrt t$. For faint sources on bright sky, $S/N \\approx N_*/\\sqrt{n_{pix}N_S}$, still $\\propto \\sqrt t$ but now improved by better seeing (smaller $n_{pix}$) or a darker sky. For very short exposures read noise dominates, $S/N \\propto t$, which is why many short exposures are worse than one long one unless the read noise is negligible.

To plan an exposure you need the **count rate**: the instrument's zero point gives the electrons per second for a magnitude-0 star, so $N_* = 10^{-0.4(m - ZP)}\\,t$. Measure the zero point from a standard star and the sky rate from an empty region, then solve the CCD equation for $t$ at the required $S/N$. Finally, a signal-to-noise ratio converts to a magnitude error via $\\sigma_m \\approx 2.5\\log_{10}(e)/(S/N) = 1.0857/(S/N)$, so $S/N = 100$ gives 0.01 mag.

Work through the Bolte notes on signal-to-noise and then build the exposure-time calculator in the exercises; you will use it in every later module.`,
          resources: [
            {
              title: 'UCSC AY 257 (Bolte) — signal-to-noise lecture notes',
              url: 'https://www.ucolick.org/~bolte/AY257/',
              type: 'course',
              cost: 'free',
              provider: 'UC Santa Cruz',
              note: 'Derivation of the CCD equation and worked examples for imaging and spectroscopy.',
              primary: true,
            },
            {
              title: 'Astropy CCD Data Reduction Guide — noise and uncertainty sections',
              url: 'https://www.astropy.org/ccd-reduction-and-photometry-guide/',
              type: 'textbook',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'AAVSO CCD Photometry Guide',
              url: 'https://www.aavso.org/ccd-photometry-guide',
              type: 'textbook',
              cost: 'free',
              provider: 'AAVSO',
              note: 'Chapter on signal-to-noise and exposure planning for small telescopes.',
            },
          ],
          exercises: [
            {
              slug: 'exposure-time-calculator',
              title: 'Build an exposure-time calculator',
              prompt:
                'Write a function snr(mag, t, zp, sky_rate_per_pix, npix, dark, readnoise) implementing the CCD equation, and its inverse that solves for t at a given S/N. For a 0.4 m telescope with ZP = 22.0 (1 e-/s at mag 22), sky 2 e-/s/pix, 1.2 arcsec seeing with 0.6 arcsec pixels (aperture radius 1.5 FWHM), dark 0.01 e-/s, read noise 8 e-: compute the exposure needed for S/N = 100 at magnitudes 10, 14, 18 and 20. Plot S/N vs t for each magnitude on log axes and mark where each transitions from read-noise-limited to sky-limited.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'poisson-demonstration',
              title: 'See Poisson noise in real data',
              prompt:
                'Take the calibrated science frame from the previous lesson (or any flat-fielded image). Select ten boxes of empty sky, measure mean and variance in each, and plot variance against mean. The slope should equal 1/gain if the data are in ADU; the intercept gives the read-noise contribution. Compare with the header values. Then repeat on a raw (uncalibrated) frame and explain why the variance is larger.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'coadd-vs-long',
              title: 'Many short exposures or one long one?',
              prompt:
                'For a magnitude-19 star with the parameters of the exposure-time exercise, compare the S/N of a single 600 s exposure with that of 60 co-added 10 s exposures and 6 co-added 100 s exposures. Repeat with read noise 2 e-. Discuss when short exposures are preferred anyway (saturation of bright stars, cosmic rays, tracking, variability) and quantify the S/N penalty you pay.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'How many detected photons are needed for 0.5 percent photometry if photon noise is the only source?',
              answerOutline: '(1/0.005)^2 = 40,000.',
            },
            {
              question: 'In the sky-limited regime, how does the S/N depend on exposure time and seeing?',
              answerOutline:
                'S/N proportional to sqrt(t) and inversely proportional to the FWHM (because the aperture area, hence sky noise, scales as FWHM^2 and S/N goes as 1/sqrt(area)).',
            },
            {
              question: 'What magnitude uncertainty corresponds to S/N = 20?',
              answerOutline: 'About 1.0857/20 = 0.054 mag.',
            },
          ],
          relatedLessons: ['probability-statistics/random-variables-and-distributions/discrete-distributions'],
        },
        {
          slug: 'the-atmosphere-seeing-extinction-and-sky',
          title: 'The atmosphere: seeing, extinction and sky background',
          summary:
            'What the air does to starlight on the way down, how to measure and correct for it, and why site selection and adaptive optics matter.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the physical origin of seeing and the dependence of the seeing disk on wavelength and site',
            'Measure the atmospheric extinction coefficient from standard stars at several airmasses and correct magnitudes to outside the atmosphere',
            'Describe the sources of sky background (airglow, moonlight, light pollution, zodiacal light) and their spectra',
            'Explain how adaptive optics and lucky imaging recover resolution',
          ],
          concepts: [
            'Turbulence, Fried parameter r0, seeing ∝ λ^(-1/5)',
            'Scintillation',
            'Extinction: m(X) = m0 + k X; Bouguer line',
            'Rayleigh scattering, aerosols, molecular absorption bands',
            'Second-order (colour-dependent) extinction',
            'Sky brightness in mag per square arcsecond; airglow lines (OH, [O I] 557.7 nm)',
            'Adaptive optics, laser guide stars, lucky imaging',
          ],
          explanation: `Starlight crosses about 10 km of turbulent air whose refractive index fluctuates with temperature. The wavefront that arrives is corrugated on a scale of the **Fried parameter** $r_0$, typically 10-20 cm at visible wavelengths at a good site. A telescope smaller than $r_0$ sees a sharp but dancing image; a larger one sees a blurred **seeing disk** of FWHM about $\\lambda/r_0$, 0.5-1.5 arcseconds at the best sites. Since $r_0 \\propto \\lambda^{6/5}$, seeing improves slowly toward the infrared, and the fast twinkling of intensity (**scintillation**) adds noise to bright-star photometry at the millimagnitude level.

The air also absorbs and scatters light. The magnitude observed at airmass $X$ is
$$m(X) = m_0 + kX ,$$
where $m_0$ is the magnitude outside the atmosphere and $k$ the **extinction coefficient** in magnitudes per airmass: about 0.5 in U, 0.25 in B, 0.15 in V, 0.1 in R at a good site, dominated by Rayleigh scattering ($\\propto\\lambda^{-4}$) and aerosols. Observe a standard star at several airmasses during the night, plot $m$ against $X$ (a **Bouguer plot**), and the slope is $k$. Because $k$ depends on wavelength, a broad filter has a slightly colour-dependent extinction (the second-order term), which matters for precision photometry of stars of very different colours.

The **sky** is not black. Airglow from excited molecules high in the atmosphere (the OH bands that plague the near-infrared, the green [O I] line at 557.7 nm), scattered moonlight, zodiacal light, and light pollution combine to give a dark-site sky of about 21.5-22 magnitudes per square arcsecond in V, several magnitudes brighter near a full Moon or a city. This background sets the faint limit of every ground-based survey, which is why observatories go to remote mountains and why space telescopes see so much deeper in the infrared.

**Adaptive optics** measures the wavefront on a bright reference star (natural or a laser-excited sodium layer at 90 km) and corrects it with a deformable mirror a thousand times a second, reaching the diffraction limit over a small field. **Lucky imaging** instead takes thousands of short exposures and keeps the sharpest few percent. Read the Bolte notes on the atmosphere, then measure extinction yourself.`,
          resources: [
            {
              title: 'UCSC AY 257 (Bolte) — atmosphere and extinction notes',
              url: 'https://www.ucolick.org/~bolte/AY257/',
              type: 'course',
              cost: 'free',
              provider: 'UC Santa Cruz',
              primary: true,
            },
            {
              title: 'Stellar Atmospheres (Tatum) — LibreTexts',
              url: 'https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Stellar_Atmospheres_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'The chapter on the Earth\'s atmosphere and extinction, with the Bouguer method.',
            },
            {
              title: 'ESO — observatory sites and conditions',
              url: 'https://www.eso.org/public/',
              type: 'article',
              cost: 'free',
              provider: 'ESO',
              note: 'Explore the Paranal and La Silla site pages for seeing statistics and adaptive-optics results.',
            },
          ],
          exercises: [
            {
              slug: 'measure-extinction',
              title: 'Measure the extinction coefficient',
              prompt:
                'Obtain instrumental magnitudes of a non-variable star observed at five or more airmasses between 1.0 and 2.5 (use your own frames, LCO archive data, or simulate from a given k and realistic noise if no data are available). Fit m = m0 + kX by least squares with uncertainties and report k and m0 with errors. Compare with the typical values in the lesson for your filter. Then show what error you would make in the star\'s magnitude by ignoring extinction at X = 1.8.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sky-brightness-limit',
              title: 'The sky-limited depth of a survey',
              prompt:
                'Using your exposure-time calculator, compute the 5-sigma limiting magnitude in a 60 s exposure for a 1 m telescope (ZP = 25.0) under three skies: dark (21.8 mag/arcsec^2), grey (20.5) and bright with full Moon (18.5), with 1.0 arcsecond seeing and 0.5 arcsecond pixels. Repeat for 2.0 arcsecond seeing. Tabulate and discuss which matters more, the Moon or the seeing, and why a space telescope with a 22.5 mag/arcsec^2 sky and 0.1 arcsecond PSF goes so much deeper.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'seeing-vs-wavelength',
              title: 'Seeing across wavelengths',
              prompt:
                'If r0 = 12 cm at 500 nm, compute r0 and the seeing FWHM (lambda/r0 in arcseconds) at 350, 500, 800, 1250 and 2200 nm. At which wavelength does a 2 m telescope become diffraction-limited without adaptive optics? Explain why adaptive optics works in the near-infrared on 8 m telescopes but is far harder in the visible, using the number of actuators needed (about (D/r0)^2) and the required correction rate.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the Bouguer method and what does its slope give?',
              answerOutline:
                'Plot the instrumental magnitude of a constant star against airmass; the slope is the extinction coefficient k and the intercept the magnitude above the atmosphere.',
            },
            {
              question: 'Why is seeing better in the infrared?',
              answerOutline:
                'The Fried parameter grows as lambda^(6/5), so the seeing FWHM (lambda/r0) shrinks as lambda^(-1/5); turbulence perturbs long wavelengths less.',
            },
            {
              question: 'Why does a full Moon hurt faint-galaxy imaging more than bright-star photometry?',
              answerOutline:
                'Moonlight raises the sky background by several magnitudes; faint sources are sky-noise-limited, so their S/N drops, while bright stars remain source-noise-limited.',
            },
          ],
        },
      ],
    },
    {
      slug: 'photometry',
      title: 'Photometry',
      description:
        'Measuring brightness: magnitude systems, extracting fluxes from images with apertures and PSF fits, calibrating to a standard system, and time-series photometry.',
      lessons: [
        {
          slug: 'magnitudes-and-photometric-systems',
          title: 'Magnitudes, filters and photometric systems',
          summary:
            'Instrumental versus standard magnitudes, the Vega and AB systems, the common filter sets (Johnson-Cousins, SDSS, Gaia, 2MASS) and how to convert between them.',
          estimatedMinutes: 90,
          objectives: [
            'Define instrumental, apparent and absolute magnitudes and the Vega and AB zero-point conventions',
            'Describe the main filter systems and the physical meaning of a colour index',
            'Convert fluxes in Jansky or erg/s/cm^2/Angstrom to AB magnitudes and back',
            'Explain interstellar extinction and reddening and correct magnitudes using E(B-V)',
          ],
          concepts: [
            'Instrumental magnitude -2.5 log10(counts/s)',
            'Vega system vs AB system: m_AB = -2.5 log10(f_nu) - 48.6',
            'Johnson-Cousins UBVRI, SDSS ugriz, Gaia G/BP/RP, 2MASS JHK',
            'Colour index and effective wavelength',
            'Bolometric magnitude and bolometric correction',
            'Extinction A_V and reddening E(B-V); R_V = 3.1',
            'Colour transformations between systems',
          ],
          explanation: `A detector gives you counts; a **magnitude** is a logarithmic brightness, $m = -2.5\\log_{10}(\\mathrm{flux}) + \\mathrm{const}$. The **instrumental magnitude** uses counts per second and an arbitrary constant; converting it to a **standard magnitude** on a recognised system requires a zero point from standard stars, plus corrections for extinction and for the difference between your filter and the standard one.

Two zero-point conventions coexist. In the **Vega system** (Johnson-Cousins UBVRI, 2MASS JHK) the star Vega has magnitude about zero in every band, so colours are relative to an A0 star. In the **AB system** (SDSS ugriz, most modern surveys) magnitudes are tied directly to physical flux density:
$$m_{\\rm AB} = -2.5\\log_{10}\\!\\left(\\frac{f_\\nu}{\\mathrm{erg\\,s^{-1}cm^{-2}Hz^{-1}}}\\right) - 48.60 ,$$
so a source of 3631 Jy has $m_{\\rm AB} = 0$ in any band. The two systems differ by band-dependent offsets (about 0.1-0.4 mag in the red and infrared); mixing them is a classic error.

A **filter system** defines the bands. Johnson-Cousins UBVRI is historical and still used for variable stars; SDSS ugriz is the survey standard; Gaia's broad G and the BP/RP bands cover a billion stars; 2MASS JHK samples the near-infrared. A **colour index** such as $B-V$ or $g-r$ is a magnitude difference between two bands and measures the slope of the spectrum, hence temperature for stars. Because every system has slightly different bandpasses, catalogues publish **colour transformations** (e.g. from Gaia to Johnson) as polynomials in colour.

Finally, interstellar dust dims and reddens starlight. **Extinction** in V, $A_V$, and the **colour excess** $E(B-V) = A_B - A_V$ are related by $R_V = A_V/E(B-V) \\approx 3.1$ for typical dust; the extinction curve tells you $A_\\lambda/A_V$ for other bands. Dust maps give $E(B-V)$ along any sightline for extragalactic work; for stars within the Galaxy the reddening must be estimated from the star's expected intrinsic colour. Read the OpenStax sections and the Gaia and SDSS photometric documentation, then do the conversions in the exercises until they are routine.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 17.1 The Brightness of Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/17-1-the-brightness-of-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Also 17.2 Colors of Stars and 20.2 Interstellar Dust (extinction and reddening).',
            },
            {
              title: 'Gaia DR3 documentation — photometric system',
              url: 'https://www.cosmos.esa.int/web/gaia/dr3',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
              note: 'Passbands, zero points and the photometric relationships with Johnson and SDSS.',
              primary: true,
            },
            {
              title: 'SDSS DR17 — optical spectra and photometry overview',
              url: 'https://www.sdss4.org/dr17/spectro/',
              type: 'documentation',
              cost: 'free',
              provider: 'SDSS',
              note: 'Navigate to the imaging section for the ugriz AB system and its known offsets.',
            },
            {
              title: 'Learn Astropy — interstellar reddening and synthetic photometry',
              url: 'https://learn.astropy.org/tutorials/color-excess.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
              note: 'Applies an extinction curve to a spectrum and computes magnitudes through filter curves.',
            },
          ],
          exercises: [
            {
              slug: 'ab-conversions',
              title: 'Flux-magnitude conversions',
              prompt:
                'Convert: 1 mJy to AB magnitude; m_AB = 20 to flux density in Jy and in erg/s/cm^2/Angstrom at 6000 Angstrom (use f_lambda = f_nu c / lambda^2); Vega\'s V = 0.03 to f_lambda using the Vega flux at 5500 Angstrom of 3.63e-9 erg/s/cm^2/Angstrom; and compute the AB magnitude of Vega in V. Explain why the Vega-AB offset is small in V but large in K.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gaia-to-johnson',
              title: 'Build a colour transformation from data',
              prompt:
                'Cross-match 500 stars with both Gaia DR3 photometry and Johnson V and B from a VizieR standard-star catalogue (e.g. Landolt or the AAVSO APASS catalogue via astroquery.vizier). Fit V - G as a polynomial in BP - RP and compare with the Gaia documentation\'s published relation. Plot residuals vs colour and vs magnitude and report the scatter. Identify any outliers and suggest why (variability, binarity, blending).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'dereddening',
              title: 'Correct a cluster for reddening',
              prompt:
                'The open cluster NGC 2420 has E(B-V) = 0.05 and M67 has E(B-V) = 0.04; the heavily reddened cluster NGC 6791 has E(B-V) = 0.15 (approximate values). Using the Learn Astropy reddening tutorial\'s extinction curve, compute A_V, A_B, A_g and A_r for each and show how much their observed colours and distance moduli change after correction. Then explain why an uncorrected reddening would bias a cluster\'s distance high.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the physical meaning of m_AB = 0?',
              answerOutline: 'A flux density of 3631 Jy (3.631e-20 erg/s/cm^2/Hz) at the band\'s effective frequency.',
            },
            {
              question: 'Why are colours relative to Vega not the same as AB colours?',
              answerOutline:
                'Vega\'s spectrum is not flat in f_nu, so its AB magnitude differs from zero by a band-dependent amount; the offset grows toward the red/IR where Vega is faint relative to a flat spectrum.',
            },
            {
              question: 'A star has E(B-V) = 0.3. What is A_V, and by how much is its observed B - V too red?',
              answerOutline: 'A_V = 3.1 x 0.3 = 0.93 mag; B - V is 0.3 mag redder than intrinsic.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/stellar-observables/magnitudes-fluxes-and-luminosity'],
        },
        {
          slug: 'source-detection-and-aperture-photometry',
          title: 'Source detection and aperture photometry',
          summary:
            'Finding stars in an image, measuring their flux in an aperture with a local sky annulus, choosing the aperture radius, and estimating the uncertainty on each measurement.',
          estimatedMinutes: 110,
          objectives: [
            'Detect point sources with a threshold-based or DAOFIND-style algorithm and understand the detection parameters',
            'Perform aperture photometry with a sky annulus using photutils and compute per-star uncertainties from the CCD equation',
            'Construct a curve of growth and apply an aperture correction',
            'Diagnose problems: crowding, saturation, bad sky estimates and centroiding errors',
          ],
          concepts: [
            'Background estimation: sigma-clipped median, 2D background models',
            'Detection threshold in units of background sigma; DAOStarFinder',
            'Centroiding',
            'Circular aperture and sky annulus',
            'Curve of growth; aperture correction',
            'Optimal aperture radius vs seeing',
            'Crowding and blending',
          ],
          explanation: `**Aperture photometry** is the simplest robust way to measure a star: sum the pixels inside a circle centred on it, subtract the sky estimated from an annulus around it, and convert to a magnitude. Simple, but every step has a choice that affects the answer.

First estimate the **background**. A sigma-clipped median over the whole frame works for sparse fields; for nebulosity or a gradient use a 2D model (photutils Background2D), which estimates the sky in boxes and interpolates. Then **detect** sources as peaks above a threshold, typically 5 times the background standard deviation; DAOStarFinder additionally matches a Gaussian kernel of the seeing FWHM and rejects sharp (cosmic ray) and extended (galaxy) objects. Each detection is **centroided** to sub-pixel precision.

Now choose an **aperture radius**. Too small and you lose flux in the wings of the PSF and become sensitive to centroid errors and seeing changes; too large and you add sky noise and neighbours. The sweet spot for signal-to-noise is around 1-1.5 times the FWHM. Because a small aperture misses some flux, measure the **curve of growth** (flux versus radius) on bright isolated stars and apply an **aperture correction** to a large radius where the curve has flattened. Estimate the sky in an annulus with inner radius well outside the PSF (say 3-4 FWHM) and use a sigma-clipped median so faint neighbours do not bias it.

The uncertainty on each star follows from the CCD equation with $n_{pix}$ the aperture area, plus the uncertainty of the sky estimate itself, which matters for faint stars. Convert to magnitude errors with $1.0857/(S/N)$.

Aperture photometry fails when stars overlap (**crowding**): the aperture then contains two stars' light. That is where PSF photometry (next lesson) takes over. Work through the photutils aperture documentation and the Astropy reduction guide's photometry chapters, then measure a real field and compare your magnitudes with a catalogue.`,
          resources: [
            {
              title: 'photutils — Aperture Photometry user guide',
              url: 'https://photutils.readthedocs.io/en/stable/user_guide/aperture.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              primary: true,
            },
            {
              title: 'photutils — Source detection (DAOStarFinder, IRAFStarFinder)',
              url: 'https://photutils.readthedocs.io/en/stable/user_guide/detection.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'Astropy CCD Data Reduction Guide — photometry chapters',
              url: 'https://www.astropy.org/ccd-reduction-and-photometry-guide/',
              type: 'textbook',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'AAVSO CCD Photometry Guide',
              url: 'https://www.aavso.org/ccd-photometry-guide',
              type: 'textbook',
              cost: 'free',
              provider: 'AAVSO',
              note: 'Practical aperture choices and comparison-star strategy.',
            },
          ],
          exercises: [
            {
              slug: 'aperture-photometry-field',
              title: 'Aperture photometry of a real field',
              prompt:
                'Using a calibrated frame (your own, LCO archive, or an SDSS frame downloaded via astroquery.sdss), estimate the background with Background2D, detect sources with DAOStarFinder at 5 sigma, and perform aperture photometry with radius 1.2 FWHM and a sky annulus from 4 to 6 FWHM. Compute instrumental magnitudes and errors. Cross-match with Gaia or SDSS by position (SkyCoord.match_to_catalog_sky) and plot instrumental minus catalogue magnitude against catalogue magnitude. The plot should be flat with scatter increasing toward faint magnitudes; explain any trend.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'curve-of-growth',
              title: 'Curve of growth and optimal aperture',
              prompt:
                'For five bright, isolated stars in your frame, measure flux in apertures of radius 0.5 to 5 FWHM in steps of 0.25. Plot the normalised curve of growth and determine the radius containing 99 percent of the light. Then, for a faint star, plot S/N against aperture radius using measured sky noise and find the radius that maximises it. Report the aperture correction from the optimal radius to the 99 percent radius.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sky-estimation-bias',
              title: 'How much does the sky estimate matter?',
              prompt:
                'Simulate an image with a 2D Gaussian star of FWHM 4 pixels and 10,000 total counts on a sky of 100 counts per pixel with Poisson noise, plus a neighbour of 2,000 counts 8 pixels away. Measure the star with aperture radius 5 pixels and sky annuli at (8-12), (10-15) and (15-20) pixels using mean, median and sigma-clipped median. Tabulate the recovered flux and its bias. Repeat 500 times to get the scatter and show which estimator is most robust to the neighbour.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why not use a very large aperture to capture all the light?',
              answerOutline:
                'Sky noise grows with aperture area and neighbouring stars contaminate; S/N peaks near 1-1.5 FWHM, and an aperture correction recovers the missing flux.',
            },
            {
              question: 'Why is the sky annulus placed well outside the aperture?',
              answerOutline:
                'So that the star\'s own PSF wings do not contaminate the sky estimate, which would subtract too much and bias the flux low.',
            },
            {
              question: 'What does a detection threshold of 5 sigma mean and why not 2 sigma?',
              answerOutline:
                'Peaks must exceed 5 background standard deviations; at 2 sigma the millions of pixels in a frame would produce thousands of spurious noise detections.',
            },
          ],
        },
        {
          slug: 'psf-photometry-and-crowded-fields',
          title: 'PSF photometry and crowded fields',
          summary:
            'Modelling the point spread function and fitting it simultaneously to overlapping stars, the method behind every cluster colour-magnitude diagram and most space-telescope photometry.',
          estimatedMinutes: 100,
          objectives: [
            'Build an empirical or analytic PSF model from isolated stars in an image',
            'Perform iterative PSF fitting with photutils and interpret the residual image',
            'Explain why PSF photometry outperforms apertures in crowded fields and how completeness is measured with artificial stars',
            'Recognise the limitations: PSF variation across the field, undersampling, and the need for an aperture correction',
          ],
          concepts: [
            'Analytic PSF models (Gaussian, Moffat) vs empirical ePSF',
            'Simultaneous fitting of groups of stars',
            'Iterative subtraction (DAOPHOT ALLSTAR style)',
            'Residual images as diagnostics',
            'Spatially varying PSF',
            'Completeness and artificial-star tests',
            'Aperture correction for PSF magnitudes',
          ],
          explanation: `In a globular cluster core or a galaxy's disk, stars overlap and any aperture contains several of them. The solution is to model the **point spread function** and fit it. All stars in a frame share the same PSF shape (to a first approximation), differing only in position and brightness, so an image of $N$ stars is a model with $3N$ parameters plus the sky, and overlapping stars can be separated by fitting them **simultaneously**.

The PSF can be an **analytic** function such as a **Moffat** profile, $I(r) \\propto [1 + (r/\\alpha)^2]^{-\\beta}$, whose broad wings match seeing-limited images far better than a Gaussian, or an **empirical PSF** built by stacking bright, isolated, unsaturated stars after sub-pixel registration (photutils EPSFBuilder). Empirical models capture real asymmetries and are the standard for space telescopes, but they require undersampled images to be handled carefully.

The DAOPHOT approach, which photutils reimplements, is iterative: detect stars, fit the PSF to each group, subtract the fitted stars, detect fainter stars in the residual, and repeat. The **residual image** is your main diagnostic. A clean residual with only noise means the model is adequate; systematic dipoles mean centroid errors, rings mean a wrong PSF width, and a brighter residual in one corner means the PSF varies across the field and must be modelled as a function of position.

Because the PSF model is normalised to a finite radius, PSF magnitudes still need an **aperture correction** measured on isolated stars to put them on the same scale as large-aperture photometry. And because detection is harder near bright stars and in dense regions, the catalogue's **completeness** must be measured by **artificial-star tests**: inject stars of known magnitude, re-run the pipeline, and record the recovered fraction and the photometric bias as a function of magnitude and position. Any luminosity function or colour-magnitude diagram of a crowded field is meaningless without this.

Work through the photutils PSF documentation and the Bolte DAOPHOT notes, then fit a crowded field in the exercises.`,
          resources: [
            {
              title: 'photutils — PSF Photometry user guide',
              url: 'https://photutils.readthedocs.io/en/stable/user_guide/psf.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              primary: true,
            },
            {
              title: 'UCSC AY 257 (Bolte) — DAOPHOT and crowded-field photometry notes',
              url: 'https://www.ucolick.org/~bolte/AY257/',
              type: 'course',
              cost: 'free',
              provider: 'UC Santa Cruz',
              note: 'The DAOPHOT lecture and homework describe the classic algorithm these tools implement.',
            },
            {
              title: 'ESA/Hubble archive',
              url: 'https://esahubble.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA/Hubble',
              note: 'Source of crowded-field images (globular cluster cores) if you want a harder test; raw data are at MAST.',
            },
          ],
          exercises: [
            {
              slug: 'psf-fit-cluster',
              title: 'PSF photometry of a cluster field',
              prompt:
                'Obtain an image of a moderately crowded field (an SDSS frame of a globular cluster outskirts, M13 or M3, via astroquery.sdss; or a Hubble ACS frame from MAST). Build an ePSF from 30 bright isolated stars, run iterative PSF photometry with photutils, and show the original, model and residual images with the same stretch. Compare PSF magnitudes with aperture magnitudes for the isolated stars (should agree after aperture correction) and show a case where the aperture result is badly wrong because of a neighbour.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'artificial-star-test',
              title: 'Completeness via artificial stars',
              prompt:
                'Inject 200 artificial stars (using your ePSF) per magnitude bin from 2 magnitudes brighter than your faintest detections to 2 magnitudes fainter, at random positions, into your frame. Re-run detection and PSF photometry. Plot completeness (recovered fraction) and photometric bias (recovered minus input magnitude) versus input magnitude, separately for the crowded centre and the sparse outskirts. Report the 50 percent completeness magnitude in each region.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'moffat-vs-gaussian',
              title: 'Moffat versus Gaussian PSF',
              prompt:
                'Fit both a Gaussian and a Moffat profile to the radial profile of a bright star in a ground-based image. Plot the data and both fits on a log scale out to 5 FWHM, and the residuals. Compute the fraction of flux beyond 2 FWHM for each model and explain how a Gaussian PSF model would bias faint-star photometry and aperture corrections.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can PSF fitting separate two stars that an aperture cannot?',
              answerOutline:
                'The PSF shape is known, so the summed image of overlapping stars is a model with few parameters; fitting it simultaneously assigns flux to each star.',
            },
            {
              question: 'What do dipole residuals after PSF subtraction indicate?',
              answerOutline: 'Centroid errors: the model is shifted relative to the star, leaving positive residual on one side and negative on the other.',
            },
            {
              question: 'Why are artificial-star tests necessary?',
              answerOutline:
                'Detection probability and photometric accuracy depend on magnitude and local crowding; only by injecting known stars can completeness and bias be measured for a given field and pipeline.',
            },
          ],
        },
        {
          slug: 'differential-photometry-and-calibration',
          title: 'Differential photometry and absolute calibration',
          summary:
            'Getting precise relative brightness from comparison stars, and getting accurate absolute magnitudes from standard stars, extinction and colour terms.',
          estimatedMinutes: 100,
          objectives: [
            'Perform differential photometry with an ensemble of comparison stars and reach the photon-noise limit',
            'Determine zero point, extinction and colour terms from standard-star observations and apply them to science targets',
            'Use all-sky catalogues (Gaia, APASS, Pan-STARRS) as in-field standards',
            'Identify systematic errors (flat-field residuals, colour-dependent extinction, variable comparisons) and test for them',
          ],
          concepts: [
            'Differential magnitude: target minus comparison',
            'Ensemble/weighted comparison stars',
            'Check star as a control',
            'Transformation equations: V = v + zp - k X + c (B-V)',
            'Landolt and other standard fields',
            'Catalogue-based calibration with Gaia/APASS/Pan-STARRS',
            'Systematics: second-order extinction, flat residuals, red noise',
          ],
          explanation: `Two different goals need two different techniques. For **precision** (is this star varying by 0.1 percent?) use **differential photometry**: measure the target and several nearby comparison stars in the same frame, and take the difference. Clouds, extinction changes and small focus drifts affect all stars nearly equally and cancel. Using an **ensemble** of comparisons, weighted by their S/N, averages down their noise; a **check star** treated like the target verifies that the ensemble is stable. With good comparisons a 0.4 m telescope reaches 1-2 millimagnitudes per point, enough to see an exoplanet transit.

For **accuracy** (what is this star's V magnitude on the standard system?) you must calibrate. The classical route observes **standard stars** of known magnitudes (Landolt fields) over a range of airmasses and colours and fits the transformation
$$V = v + \\mathrm{zp} - k_V X + c_V\\,(B-V) ,$$
where $v$ is the instrumental magnitude, zp the zero point, $k_V$ the extinction coefficient and $c_V$ the **colour term** that corrects for your filter-detector bandpass differing from the standard one. Solve the same for each filter, then apply to the science frames.

The modern shortcut uses **in-field catalogue stars**: every field now contains dozens of stars with Gaia, APASS or Pan-STARRS magnitudes. Transform their catalogue magnitudes into your filter with published relations, fit the zero point (and colour term, if enough colour range) directly on your science frame, and extinction cancels because the standards share the airmass. This is how most small-telescope and survey photometry is now calibrated, to 1-2 percent.

Systematics lurk. Flat-field errors make a star's magnitude depend on where it fell on the chip; second-order extinction makes a red target and a blue comparison drift apart with airmass; a comparison may itself be variable; and correlated ("red") noise from seeing and tracking is not reduced by averaging as white noise would be. The exercises make you test for each. Read the AAVSO guides and the Bolte calibration notes, then calibrate a real field.`,
          resources: [
            {
              title: 'AAVSO CCD Photometry Guide',
              url: 'https://www.aavso.org/ccd-photometry-guide',
              type: 'textbook',
              cost: 'free',
              provider: 'AAVSO',
              note: 'Comparison-star selection, transformation coefficients and submitting calibrated data.',
              primary: true,
            },
            {
              title: 'UCSC AY 257 (Bolte) — photometric calibration notes',
              url: 'https://www.ucolick.org/~bolte/AY257/',
              type: 'course',
              cost: 'free',
              provider: 'UC Santa Cruz',
            },
            {
              title: 'astroquery.vizier — access to APASS, Landolt and other catalogues',
              url: 'https://astroquery.readthedocs.io/en/latest/vizier/vizier.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Query catalogue magnitudes for in-field standards by coordinates.',
            },
            {
              title: 'AAVSO DSLR Observing Manual',
              url: 'https://www.aavso.org/dslr-observing-manual',
              type: 'textbook',
              cost: 'free',
              provider: 'AAVSO',
              note: 'If you only have a camera and a tripod, this shows how to do real differential photometry anyway.',
            },
          ],
          exercises: [
            {
              slug: 'ensemble-differential',
              title: 'Ensemble differential photometry',
              prompt:
                'From a time series of calibrated frames (your own, or an LCO archive sequence of a known variable or exoplanet host), perform aperture photometry on the target and 8-10 comparison stars. Build a weighted ensemble comparison, compute the differential light curve and that of a check star, and compare the check star\'s scatter with the photon-noise prediction from the CCD equation. Try removing each comparison in turn and identify any that is variable. Plot the final light curve with error bars.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'catalogue-zero-point',
              title: 'Zero point from in-field catalogue stars',
              prompt:
                'For a single calibrated frame, query APASS (via astroquery.vizier, catalogue II/336) or Pan-STARRS for stars in the field, cross-match with your detections, and fit the zero point and colour term for your filter by weighted least squares, iteratively sigma-clipping outliers. Report both with uncertainties, show the residual plot vs colour and vs chip position, and apply the calibration to a target star. Compare with a Gaia-based calibration using the published Gaia-to-Johnson relations.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'red-noise-test',
              title: 'White or red noise?',
              prompt:
                'Take the residuals of your check-star light curve and compute the standard deviation after binning into bins of 1, 2, 4, 8, 16 and 32 points. Plot against bin size on log axes with the expected white-noise line (sigma_1 / sqrt(N)). Quantify the excess (the beta factor) and discuss its sources. Then explain how red noise would affect the uncertainty on a transit depth measured from these data.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does differential photometry cancel thin clouds?',
              answerOutline:
                'Clouds attenuate all stars in the small field by nearly the same factor, so the ratio of target to comparison flux (difference of magnitudes) is unchanged.',
            },
            {
              question: 'What is a colour term and why does your system need one?',
              answerOutline:
                'A correction proportional to the star\'s colour, because your filter-plus-detector bandpass differs from the standard system\'s, so red and blue stars are weighted differently.',
            },
            {
              question: 'Why use a check star?',
              answerOutline:
                'It is reduced exactly like the target; if it shows variations, they are systematics or a bad comparison, not real variability in the target.',
            },
          ],
        },
        {
          slug: 'time-series-photometry-and-periodograms',
          title: 'Time-series photometry: light curves, periodograms and phase folding',
          summary:
            'Finding periodic signals in unevenly sampled light curves with the Lomb-Scargle and Box Least Squares periodograms, and judging their significance.',
          estimatedMinutes: 110,
          objectives: [
            'Explain why ordinary Fourier transforms fail for unevenly sampled data and how the Lomb-Scargle periodogram handles it',
            'Compute a Lomb-Scargle periodogram with astropy, choose the frequency grid, and interpret aliases and the window function',
            'Use Box Least Squares to search for transit-like signals and phase-fold a light curve',
            'Assess the false-alarm probability of a peak and refine a period',
          ],
          concepts: [
            'Uneven sampling and the spectral window',
            'Lomb-Scargle periodogram; Nyquist limit for uneven data',
            'Aliases at 1/day and the sampling pattern',
            'Frequency grid resolution 1/T and oversampling',
            'False-alarm probability and bootstrap',
            'Box Least Squares (BLS) for transits',
            'Phase folding and binning; O-C diagrams',
          ],
          explanation: `Ground-based light curves have gaps (daytime, weather, seasons), and space-based ones have outliers and systematics, so you cannot simply take a fast Fourier transform. The **Lomb-Scargle periodogram** fits a sinusoid at each trial frequency by least squares and reports the power, the reduction in chi-squared; it works for arbitrary sampling and reduces to the classical periodogram for even sampling. astropy.timeseries.LombScargle computes it in a few lines, including the floating-mean correction that matters when the sampling is poor.

Choosing the **frequency grid** is where beginners go wrong. The resolution of a periodogram is about $1/T$ for a baseline $T$, so peaks must be sampled several times per $1/T$ (oversample by 5-10). The maximum useful frequency is not a simple Nyquist frequency for uneven data; it is set by the smallest time differences, so go higher than you expect and look. The **window function**, the periodogram of the sampling times themselves, shows the **aliases** your data produce: ground-based data always show side lobes at $f \\pm 1$ cycles per day, and a one-year baseline adds $\\pm 1/365$ per day. A peak at the true frequency is always accompanied by aliases; the question is which one is real, and only better sampling or physics (e.g. the light-curve shape) can decide.

**Significance** needs care. The false-alarm probability from the analytic formulae assumes white Gaussian noise and an independent-frequency count that is hard to define; a bootstrap (shuffle the magnitudes, recompute the maximum peak, repeat) is more honest. Real light curves have red noise that produces spurious low-frequency power.

For **transits**, which are box-shaped dips rather than sinusoids, use **Box Least Squares** (astropy BoxLeastSquares), which searches period, duration and epoch. Once a period is found, **phase-fold** the data, bin it, and inspect the shape; refine the period with an **O-C diagram** (observed minus computed times of minimum). Read the astropy documentation for both periodograms and the Lightkurve tutorials, then find real periods in the exercises.`,
          resources: [
            {
              title: 'astropy.timeseries — Lomb-Scargle periodograms',
              url: 'https://docs.astropy.org/en/stable/timeseries/lombscargle.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Includes the discussion of frequency grids, the window function and false-alarm probabilities.',
              primary: true,
            },
            {
              title: 'astropy.timeseries — Box Least Squares periodograms',
              url: 'https://docs.astropy.org/en/stable/timeseries/bls.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'Lightkurve documentation and tutorials',
              url: 'https://lightkurve.github.io/lightkurve/',
              type: 'documentation',
              cost: 'free',
              provider: 'Lightkurve / STScI',
              note: 'The periodogram and "identifying transiting planet signals" tutorials apply both methods to Kepler and TESS data.',
            },
            {
              title: 'AAVSO data download (light curves of variable stars)',
              url: 'https://www.aavso.org/data-download',
              type: 'dataset',
              cost: 'free',
              provider: 'AAVSO',
              note: 'Decades-long, unevenly sampled light curves ideal for Lomb-Scargle practice.',
            },
          ],
          exercises: [
            {
              slug: 'rr-lyrae-period',
              title: 'Period of an RR Lyrae star from AAVSO or ZTF data',
              prompt:
                'Download the AAVSO light curve of RR Lyr itself or another bright RR Lyrae star (visual and V-band CCD points). Compute the Lomb-Scargle periodogram over 0.1 to 10 cycles/day with 10x oversampling, plot it with the window function, identify the true period (RR Lyr: 0.5668 d) and its 1/day aliases. Phase-fold on the best period and on the strongest alias and show that the fold distinguishes them. Estimate the period uncertainty from the peak width and from a bootstrap.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'bls-tess-transit',
              title: 'Find a transit with BLS in TESS data',
              prompt:
                'Using lightkurve, download a TESS light curve of WASP-18 or Pi Mensae (search_lightcurve with author="SPOC"), remove outliers and flatten it. Run BoxLeastSquares over periods 0.5 to 20 days with durations 0.5 to 5 hours. Report the best period, duration, depth and epoch, phase-fold and bin the light curve, and compare the period and depth with the NASA Exoplanet Archive values. Then mask the transits and re-run BLS to show the second-strongest peak is noise (or a second planet).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'alias-simulation',
              title: 'Build intuition for aliases',
              prompt:
                'Simulate a sinusoid with period 0.75 days sampled (a) every 10 minutes for 30 days, (b) only between local 20:00 and 04:00 each night for 30 days, (c) one point per night at random times for 200 days. Compute and plot the Lomb-Scargle periodogram and the window function for each. Identify which aliases appear in each case and explain them from the sampling pattern. Add Gaussian noise equal to the amplitude and find the data quantity at which the true peak is no longer the highest.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does nightly ground-based sampling produce peaks at f ± 1 cycle/day?',
              answerOutline:
                'The sampling is itself periodic with one day; the periodogram of the data is the true spectrum convolved with the window function, which has strong peaks at integer cycles per day.',
            },
            {
              question: 'How finely should the frequency grid be sampled?',
              answerOutline:
                'Peak width is about 1/T (T = baseline), so the grid spacing should be a fraction of that, typically 1/(5-10 T).',
            },
            {
              question: 'Why is BLS better than Lomb-Scargle for transits?',
              answerOutline:
                'A transit is a short box-shaped dip occupying a few percent of the phase; its power is spread over many sinusoidal harmonics, while BLS matches the box shape directly.',
            },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/model-selection-and-multiple-comparisons'],
        },
      ],
      project: {
        slug: 'exoplanet-transit-from-the-ground',
        title: 'Project: a complete transit light curve',
        description: `Obtain a time series of a transiting exoplanet (your own telescope, an LCO education allocation, or an archival ground-based sequence from the LCO science archive). Reduce the frames, perform ensemble differential photometry, detrend against airmass, and produce a light curve with realistic error bars that shows the transit. Fit a simple trapezoid or a proper transit model to measure the depth and mid-time, and compare with the ephemeris from the NASA Exoplanet Archive.`,
        deliverables: [
          'Reduction and photometry notebook with the calibrated light curve (BJD_TDB, differential magnitude, error)',
          'Fitted depth, duration and mid-time with uncertainties and a residual plot with the red-noise test',
          'Comparison with the archive ephemeris and a comment on whether the timing is consistent',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'spectroscopy',
      title: 'Spectroscopy',
      description:
        'How spectrographs disperse light, how a 2D frame becomes a wavelength-calibrated 1D spectrum, and how to measure lines, velocities and redshifts from it.',
      lessons: [
        {
          slug: 'spectrographs-dispersion-and-resolution',
          title: 'Spectrographs: dispersion, resolution and throughput',
          summary:
            'The optics of slit spectrographs and gratings, what resolving power means, and the trade-offs between resolution, wavelength coverage and signal-to-noise.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the path through a slit spectrograph (slit, collimator, grating, camera, detector) and the function of each element',
            'Apply the grating equation and compute dispersion in Angstroms per pixel',
            'Define resolving power R and relate it to velocity resolution and slit width',
            'Compare low-resolution, echelle and fibre/multi-object spectrographs and choose one for a science goal',
          ],
          concepts: [
            'Slit, collimator, dispersing element, camera',
            'Grating equation: $m\\lambda = d(\\sin\\alpha + \\sin\\beta)$',
            'Linear dispersion and sampling',
            'Resolving power $R = \\lambda/\\Delta\\lambda$; $\\Delta v = c/R$',
            'Slit width, seeing and slit losses',
            'Echelle, cross-dispersion, orders',
            'Fibre-fed and multi-object spectrographs (SDSS, DESI)',
          ],
          explanation: `A spectrograph makes an image of the **slit** at every wavelength, spread out along the dispersion direction. Light from the slit is made parallel by the **collimator**, dispersed by a **grating** (or prism, or grism), and refocused by the **camera** onto the detector. Each wavelength forms its own slit image, so the slit width sets the resolution: a narrower slit gives sharper spectral lines but, if narrower than the seeing disk, throws away light (**slit losses**).

The grating does the work. For a groove spacing $d$, incidence angle $\\alpha$ and diffraction angle $\\beta$, constructive interference in order $m$ occurs when
$$m\\lambda = d(\\sin\\alpha + \\sin\\beta) .$$
Differentiating gives the angular dispersion $d\\beta/d\\lambda = m/(d\\cos\\beta)$; with the camera focal length this becomes the **linear dispersion** in Angstroms per millimetre, and with the pixel size, Angstroms per pixel. Higher orders and finer gratings disperse more.

**Resolving power** $R = \\lambda/\\Delta\\lambda$, where $\\Delta\\lambda$ is the FWHM of an unresolved line, translates directly to velocity: $\\Delta v = c/R$. Low-resolution survey spectrographs ($R \\sim 2000$, 150 km/s) classify objects and measure redshifts; $R \\sim 10,000$ resolves stellar line profiles; precision radial-velocity work needs $R \\sim 100,000$ (3 km/s) plus exquisite stability. High resolution over a wide range is achieved with an **echelle**: a coarse grating used in high orders (m of 50-100) whose overlapping orders are separated by a **cross-disperser** onto a 2D detector, giving a hundred short spectra stacked in strips.

The trade-off is throughput: at fixed telescope and exposure the photons per resolution element fall as $1/R$, so higher resolution means brighter targets or longer exposures. Surveys sidestep this with **fibre-fed multi-object** spectrographs: SDSS placed 640-1000 fibres per plate and DESI 5000 robotic fibres, each feeding a low-resolution spectrograph, obtaining thousands of spectra per exposure. Read the Bolte spectroscopy notes and OpenStax 6.3, then size a spectrograph in the exercises.`,
          resources: [
            {
              title: 'UCSC AY 257 (Bolte) — spectrograph lecture notes',
              url: 'https://www.ucolick.org/~bolte/AY257/',
              type: 'course',
              cost: 'free',
              provider: 'UC Santa Cruz',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 6.3 Visible-Light Detectors and Instruments',
              url: 'https://openstax.org/books/astronomy-2e/pages/6-3-visible-light-detectors-and-instruments',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'The spectrograph subsection for the conceptual layout.',
            },
            {
              title: 'SDSS DR17 — optical spectra overview',
              url: 'https://www.sdss4.org/dr17/spectro/',
              type: 'documentation',
              cost: 'free',
              provider: 'SDSS',
              note: 'Specifications of the BOSS spectrographs: resolution, wavelength range, fibre size.',
            },
            {
              title: 'Overview of the Dark Energy Spectroscopic Instrument (Martini et al.)',
              url: 'https://arxiv.org/abs/1807.09287',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'A readable description of a modern 5000-fibre multi-object spectrograph.',
            },
          ],
          exercises: [
            {
              slug: 'grating-calculation',
              title: 'Design a low-resolution spectrograph',
              prompt:
                'A spectrograph has a 600 line/mm grating used in first order at incidence angle 20 degrees, a camera of focal length 150 mm and a detector with 15 micron pixels. Compute the diffraction angle for 400, 550 and 700 nm, the linear dispersion in Angstroms per pixel at 550 nm, and the wavelength range covered by a 2048-pixel detector. If the slit projects to 3 pixels, compute R and the velocity resolution. Then compute what grating or order would double R and what that costs in wavelength coverage.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'resolution-for-science',
              title: 'Match resolution to a science goal',
              prompt:
                'For each goal, choose a minimum resolving power and justify it with a calculation: (a) measuring a galaxy redshift to 0.001; (b) measuring the velocity dispersion of an elliptical galaxy (200 km/s); (c) resolving the rotational broadening of a star rotating at 20 km/s; (d) detecting a planet with radial-velocity amplitude 10 m/s (consider how precision below the resolution element is achieved by using thousands of lines); (e) separating the two components of a double-lined binary with velocity separation 50 km/s.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'slit-losses',
              title: 'Slit losses versus resolution',
              prompt:
                'Model the seeing disk as a 2D Gaussian with FWHM 1.2 arcseconds. Compute the fraction of light passing through slits of width 0.5, 1.0, 1.5 and 2.0 arcseconds. If R is inversely proportional to slit width (slit-limited regime), tabulate the product of throughput and R and find the slit width that maximises S/N per resolution element. Discuss why fibre spectrographs use fibres of 2-3 arcseconds.',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does R = 5000 mean in velocity terms?',
              answerOutline: 'Delta v = c/R = 60 km/s per resolution element.',
            },
            {
              question: 'Why does an echelle spectrograph need a cross-disperser?',
              answerOutline:
                'Used in high orders, the grating\'s orders overlap in wavelength; a second, low dispersion at right angles separates them into stacked strips on the detector.',
            },
            {
              question: 'Why not always use the highest resolution available?',
              answerOutline:
                'Photons per resolution element fall as 1/R, so higher resolution needs longer exposures or brighter targets, and wavelength coverage per detector shrinks.',
            },
          ],
        },
        {
          slug: 'spectral-reduction-and-wavelength-calibration',
          title: 'Spectral reduction: extraction, wavelength calibration and flux calibration',
          summary:
            'Turning a 2D spectrograph frame into a 1D spectrum in physical units: tracing, sky subtraction, optimal extraction, arc-lamp calibration and standard-star flux calibration.',
          estimatedMinutes: 120,
          objectives: [
            'Trace a spectrum on a 2D frame and extract it with a simple sum and with optimal (variance-weighted) extraction',
            'Identify arc-lamp lines and fit a wavelength solution, assessing its residuals',
            'Subtract the sky spectrum and remove cosmic rays',
            'Flux-calibrate using a spectrophotometric standard and correct for telluric absorption',
          ],
          concepts: [
            'Trace of the spectrum; tilt and curvature',
            'Sky subtraction from slit regions beside the object',
            'Optimal (Horne) extraction',
            'Arc lamps (He, Ne, Ar, ThAr); line identification',
            'Wavelength solution: polynomial fit and RMS residuals',
            'Sensitivity function from a spectrophotometric standard',
            'Telluric absorption bands (O2 A and B bands, H2O)',
            'specreduce and specutils',
          ],
          explanation: `A raw spectrograph frame, after the same bias/dark/flat calibration as an image, holds a horizontal band of light (the object), a fainter band everywhere along the slit (the sky), vertical emission lines from the night sky, and cosmic rays. Reduction follows a standard sequence.

**Trace** the object: fit the centre of the spectrum as a function of dispersion pixel, usually a low-order polynomial, because optics curve and tilt it. **Subtract the sky** by fitting, at each wavelength column, the sky level in regions of the slit away from the object and removing it. Then **extract**: the simple approach sums the pixels across the trace within an aperture. **Optimal extraction** (Horne 1986) instead weights each pixel by its expected signal fraction divided by its variance, which rejects cosmic rays and improves S/N by up to 70 percent for faint objects. The specreduce package implements tracing, background and both extractions.

The result is counts versus pixel. **Wavelength calibration** uses an arc lamp (He, Ne, Ar for low resolution; ThAr for echelles) exposed through the same slit; identify a few lines by eye from a line list, fit a polynomial pixel-to-wavelength relation, add the remaining lines automatically, and iterate. Report the RMS residual (should be a small fraction of a pixel) and check it is not systematic. Night-sky emission lines in the object frame provide a check of the zero point, which drifts with telescope flexure.

To get physical flux units, observe a **spectrophotometric standard** star with tabulated $f_\\lambda$; the ratio of its tabulated to observed spectrum, smoothed, is the **sensitivity function**, which also removes the detector's wavelength-dependent response. Divide every science spectrum by it (after correcting both for extinction). Residual **telluric absorption** from atmospheric O$_2$ and H$_2$O bands remains and is removed by dividing by a hot, featureless star observed at similar airmass.

Work through the Learn Astropy UVES tutorial (which reduces real echelle data) and the specreduce documentation, then reduce the dataset in the exercises end to end.`,
          resources: [
            {
              title: 'Learn Astropy — Analyzing UVES Spectroscopy with Astropy',
              url: 'https://learn.astropy.org/tutorials/UVES.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
              note: 'Real ESO echelle data: reading, wavelength handling, line measurement.',
              primary: true,
            },
            {
              title: 'specreduce documentation',
              url: 'https://specreduce.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Tracing, background subtraction, boxcar and Horne extraction, wavelength calibration.',
            },
            {
              title: 'specutils documentation',
              url: 'https://specutils.readthedocs.io/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Spectrum1D objects, continuum fitting, line finding and fitting.',
            },
            {
              title: 'UCSC AY 257 (Bolte) — spectroscopic reduction notes',
              url: 'https://www.ucolick.org/~bolte/AY257/',
              type: 'course',
              cost: 'free',
              provider: 'UC Santa Cruz',
            },
          ],
          exercises: [
            {
              slug: 'extract-and-calibrate',
              title: 'Reduce a long-slit spectrum end to end',
              prompt:
                'Using a 2D long-slit frame with its arc and standard-star frames (specreduce ships example data; the LCO FLOYDS archive or any observatory archive also works), trace the object, subtract sky, extract with both boxcar and optimal methods and compare S/N. Identify at least 10 arc lines, fit a 3rd-4th order polynomial, report the RMS residual in Angstroms and pixels, and plot residuals vs wavelength. Flux-calibrate with the standard and plot the final spectrum in erg/s/cm^2/Angstrom with the telluric bands marked.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'wavelength-solution-order',
              title: 'Choosing the polynomial order',
              prompt:
                'With your identified arc lines, fit wavelength solutions of order 1 through 7. For each, compute the RMS residual and, by leaving out each line in turn (leave-one-out), the prediction error. Plot both versus order and explain why the prediction error rises at high order while the RMS keeps falling. State the order you would adopt and the resulting wavelength uncertainty in km/s at 5000 Angstrom.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sky-line-check',
              title: 'Check the zero point with sky lines',
              prompt:
                'In your wavelength-calibrated science frame, measure the centroids of the night-sky lines [O I] 5577.34 and 6300.30 Angstrom and the strong OH lines. Compute the offset from their known wavelengths in Angstroms and km/s, and apply it as a zero-point correction. Explain why the arc solution can be offset (flexure, different light path through the slit) and how large a velocity error this would cause if uncorrected.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does optimal extraction beat a simple sum for faint objects?',
              answerOutline:
                'It weights pixels by signal fraction over variance, so noisy wing pixels and cosmic rays contribute little; the S/N gain can reach 70 percent and outliers are rejected.',
            },
            {
              question: 'What should the RMS of a good wavelength solution be?',
              answerOutline:
                'A small fraction (about a tenth) of a pixel, with residuals showing no trend with wavelength; larger or systematic residuals mean misidentified lines or wrong polynomial order.',
            },
            {
              question: 'What does a sensitivity function correct?',
              answerOutline:
                'The wavelength-dependent throughput of telescope, spectrograph and detector, converting counts to physical flux density using a standard star of known spectrum.',
            },
          ],
        },
        {
          slug: 'measuring-lines-and-radial-velocities',
          title: 'Measuring spectral lines and radial velocities',
          summary:
            'Fitting line profiles, measuring equivalent widths and velocities, cross-correlation against templates, and the corrections (barycentric, instrumental) a precise velocity needs.',
          estimatedMinutes: 110,
          objectives: [
            'Fit a continuum and measure the centroid, width and equivalent width of a line with uncertainties',
            'Measure a radial velocity by cross-correlating against a template and estimate its error',
            'Apply barycentric and instrumental zero-point corrections to get absolute velocities',
            'Interpret line widths in terms of thermal, rotational and instrumental broadening',
          ],
          concepts: [
            'Continuum normalisation',
            'Gaussian/Voigt line fits; centroid precision',
            'Equivalent width',
            'Cross-correlation function (CCF) and its peak',
            'Velocity precision ∝ 1/(S/N × sqrt(number of lines))',
            'Barycentric velocity correction',
            'Instrumental broadening and deconvolution in quadrature',
            'Rotational broadening v sin i',
          ],
          explanation: `Once you have a calibrated spectrum, the measurements are of **lines**. First divide out the **continuum** (fit a low-order polynomial or spline to line-free regions, or use specutils fit_generic_continuum) so lines are measured relative to 1. Then fit each line with a **Gaussian** (or a **Voigt** profile, whose Lorentzian wings matter for strong pressure-broadened lines). The fit gives the centroid, from which the velocity follows via the Doppler formula, the width, and the **equivalent width** $W = \\int (1 - F_\\lambda/F_c)\\,d\\lambda$, the width of a rectangular line of the same area, which measures the line's strength independent of resolution.

For velocities, a single line is limited by its S/N; combining many lines is far better, and the standard way is **cross-correlation**: shift a template spectrum (a synthetic spectrum or a well-measured standard star) in velocity, multiply by the observed spectrum, and find the shift that maximises the overlap. The **cross-correlation function** peak gives the velocity and its width the combined broadening; the precision scales roughly as $\\sigma_v \\propto \\Delta v_{\\rm res}/(\\mathrm{S/N}\\sqrt{N_{\\rm lines}})$, so a spectrum with thousands of lines yields a velocity far better than its resolution element. This is how planet searches reach metres per second from spectrographs with 3 km/s resolution.

A raw velocity is relative to the observatory. Add the **barycentric correction** (up to 30 km/s, computed with astropy as in the time lesson, and it changes with time during the night); subtract any **instrumental zero-point** drift measured from arc, sky lines or a simultaneous calibration source; and state the result as a barycentric radial velocity. For stars, the convention is positive for recession.

Finally, **line widths** carry physics. Subtract the instrumental width in quadrature ($\\sigma_{\\rm obs}^2 = \\sigma_{\\rm int}^2 + \\sigma_{\\rm instr}^2$) to get the intrinsic width, then interpret: thermal broadening $\\sqrt{2kT/m}$ (tiny for metals), rotational broadening giving $v\\sin i$ with a characteristic flat-bottomed profile, and galaxy velocity dispersion from the collective motion of stars. Read the UVES tutorial's line-measurement part and the specutils fitting documentation, then measure real velocities.`,
          resources: [
            {
              title: 'specutils — spectral analysis and line fitting',
              url: 'https://specutils.readthedocs.io/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'The "Analysis" and "Fitting" sections: continuum, centroids, equivalent widths, template cross-correlation.',
              primary: true,
            },
            {
              title: 'Learn Astropy — Analyzing UVES Spectroscopy with Astropy',
              url: 'https://learn.astropy.org/tutorials/UVES.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
              note: 'Measures line velocities in a real young-star spectrum.',
            },
            {
              title: 'Stellar Atmospheres (Tatum) — LibreTexts',
              url: 'https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Stellar_Atmospheres_(Tatum)',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Chapters on line profiles, equivalent width and broadening mechanisms.',
            },
            {
              title: 'RadVel documentation',
              url: 'https://radvel.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'RadVel',
              note: 'For fitting the resulting radial-velocity time series with Keplerian orbits (used in the planetary-science subject).',
            },
          ],
          exercises: [
            {
              slug: 'line-measurements',
              title: 'Measure lines in an SDSS stellar spectrum',
              prompt:
                'Download an SDSS spectrum of a G or K star via astroquery.sdss (get_spectra). Normalise the continuum around H-alpha, the Ca II triplet (8498, 8542, 8662 Angstrom) and the Mg b triplet. Fit Gaussians, report centroids with errors, convert to velocities and compare with the SDSS pipeline velocity (the elodie or specobj columns). Measure the equivalent widths and compare the Ca II triplet strength with what you expect for the star\'s type.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'cross-correlation-velocity',
              title: 'Velocity by cross-correlation',
              prompt:
                'Take two SDSS spectra of stars of similar type with different pipeline velocities. Using one as a template, implement cross-correlation in log-wavelength space (uniform velocity steps), find the CCF peak, fit a parabola or Gaussian to the peak to get sub-step precision, and estimate the error from the peak width and S/N. Compare with the difference of pipeline velocities. Then degrade the S/N of the target by adding noise and plot velocity error versus S/N.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'broadening-decomposition',
              title: 'What broadens this line?',
              prompt:
                'A line in a spectrum of resolving power R = 20,000 is measured to have FWHM 0.45 Angstrom at 5500 Angstrom. Compute the instrumental FWHM, subtract it in quadrature, and convert the intrinsic width to km/s. Compare with thermal broadening for iron at 6000 K and decide whether rotation (v sin i) or macroturbulence must dominate. Estimate v sin i assuming rotation dominates (FWHM about 1.7 v sin i for a rotational profile) and discuss whether an A star or a K star is more likely.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a spectrograph with 3 km/s resolution measure velocities to 1 m/s?',
              answerOutline:
                'Centroid precision is a small fraction of the resolution element at high S/N, and cross-correlating thousands of lines averages down the error by sqrt(N_lines).',
            },
            {
              question: 'What is an equivalent width and why is it resolution-independent?',
              answerOutline:
                'The area of the line in normalised flux units expressed as a width; convolution with the instrumental profile spreads the line but conserves its area.',
            },
            {
              question: 'List the corrections needed to turn a measured line shift into a barycentric radial velocity.',
              answerOutline:
                'Wavelength zero-point (arc/sky lines), instrumental drift, and the barycentric correction for Earth\'s rotation and orbital motion at the observation time.',
            },
          ],
        },
        {
          slug: 'spectral-classification-and-redshifts-with-sdss',
          title: 'Spectral classification and redshifts with SDSS spectra',
          summary:
            'Using the million-spectrum SDSS archive: classify stars, galaxies and quasars, measure redshifts by template fitting, and extract physical quantities like line ratios and velocity dispersions.',
          estimatedMinutes: 110,
          objectives: [
            'Retrieve SDSS spectra programmatically and interpret the pipeline outputs (class, subclass, z, zWarning)',
            'Measure a galaxy redshift from emission and absorption lines and by template fitting',
            'Use emission-line ratios (the BPT diagram) to separate star-forming galaxies from AGN',
            'Estimate a galaxy\'s stellar velocity dispersion from absorption-line widths',
          ],
          concepts: [
            'SDSS spectroscopic pipeline: class, subclass, z, zWarning',
            'Template fitting and chi-squared vs redshift',
            'Emission-line galaxies vs absorption-line galaxies',
            'BPT diagram: [O III]/H-beta vs [N II]/H-alpha',
            'Balmer decrement and dust',
            'Velocity dispersion sigma and the Faber-Jackson relation',
            'Quasar spectra and the Lyman-alpha forest',
          ],
          explanation: `The Sloan Digital Sky Survey has taken spectra of over four million objects with a fibre spectrograph of resolution about 2000 covering 3600-10,400 Angstrom. Every spectrum is public with pipeline measurements, which makes SDSS the best place to learn classification and redshift measurement on real data.

The pipeline fits each spectrum with templates of stars, galaxies and quasars over a grid of redshifts and reports the **class** and **subclass** of the best fit, the redshift **z** and its error, and a **zWarning** flag (zero means trustworthy; always filter on it). Reproduce this yourself: for a galaxy, identify the strongest lines (H-alpha 6563, [N II] 6584, [O III] 5007, H-beta 4861, [O II] 3727 for emission; Ca II H and K 3934/3968, the G band 4300, Mg b 5175 and Na D 5893 for absorption), compute $z = \\lambda_{\\rm obs}/\\lambda_{\\rm rest} - 1$ from each, and average. Template fitting generalises this: cross-correlate the whole spectrum against a template over a range of trial redshifts and take the chi-squared minimum. Multiple minima of similar depth are the source of catastrophic redshift errors.

Line **ratios** diagnose the ionising source. In the **BPT diagram**, log([O III]/H-beta) against log([N II]/H-alpha), star-forming galaxies lie on a curved sequence while galaxies whose gas is ionised by an active nucleus sit above and to the right; the demarcation curves are empirical and theoretical. The **Balmer decrement**, H-alpha/H-beta, is 2.86 for dust-free gas and larger with reddening, giving the extinction. **Velocity dispersion** $\\sigma$ comes from the broadening of absorption lines beyond the instrumental and template widths; for ellipticals it correlates with luminosity (Faber-Jackson) and enters the fundamental plane. SDSS reports it as velDisp.

**Quasars** show broad emission lines (thousands of km/s) and, at $z > 2$, the Lyman-alpha forest of intervening hydrogen absorption. Read the SDSS spectroscopy documentation and the SkyServer SQL tutorial, then do the exercises, which end with your own BPT diagram from a thousand galaxies.`,
          resources: [
            {
              title: 'SDSS DR17 — optical spectra overview and pipeline documentation',
              url: 'https://www.sdss4.org/dr17/spectro/',
              type: 'documentation',
              cost: 'free',
              provider: 'SDSS',
              note: 'What the pipeline measures, the meaning of zWarning, and the line-flux catalogues (galSpecLine).',
              primary: true,
            },
            {
              title: 'SDSS SkyServer DR18 — SQL search',
              url: 'https://skyserver.sdss.org/dr18/SearchTools/sql',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'Query SpecObj, galSpecLine and galSpecInfo tables.',
            },
            {
              title: 'astroquery.sdss documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/sdss/sdss.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'query_sql and get_spectra to pull spectra into Python.',
            },
            {
              title: 'SDSS Voyages',
              url: 'https://voyages.sdss.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'SDSS',
              note: 'Guided activities on spectral types, redshifts and the Hubble diagram.',
            },
          ],
          exercises: [
            {
              slug: 'redshift-by-hand-and-template',
              title: 'Redshift three ways',
              prompt:
                'Choose an emission-line galaxy with 0.05 < z < 0.2 and zWarning = 0 from SpecObj. Download its spectrum. (1) Measure z from five lines individually and report mean and scatter. (2) Implement template cross-correlation using an SDSS galaxy eigenspectrum or a nearby z = 0 galaxy spectrum as template, scanning z from 0 to 0.5, and plot chi-squared vs z. (3) Compare both with the pipeline z and zErr. Repeat for an absorption-line galaxy and discuss why its redshift is harder.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'bpt-diagram',
              title: 'Build a BPT diagram from SDSS line fluxes',
              prompt:
                'Query galSpecLine joined to SpecObj for 5000 galaxies with z < 0.1 and S/N > 5 in H-alpha, H-beta, [O III] 5007 and [N II] 6584. Plot log([O III]/H-beta) vs log([N II]/H-alpha) as a density plot and overlay the Kauffmann (2003) and Kewley (2001) demarcation curves (look up their forms). Report the fraction of star-forming, composite and AGN galaxies. Then colour the points by the Balmer decrement and interpret.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Kewley: log([OIII]/Hb) = 0.61/(log([NII]/Ha) - 0.47) + 1.19. Kauffmann: 0.61/(log([NII]/Ha) - 0.05) + 1.3.',
            },
            {
              slug: 'velocity-dispersion',
              title: 'Velocity dispersion of an elliptical galaxy',
              prompt:
                'Download the spectrum of a bright elliptical (class GALAXY, subclass blank, velDisp > 200 km/s). Fit a Gaussian to the Mg b and Ca II triplet absorption features, convert the widths to km/s, subtract the instrumental resolution (about 70 km/s for SDSS) in quadrature, and compare with the pipeline velDisp. Then, using the virial estimate M = 5 sigma^2 R_e / G with the SDSS effective radius, compute the dynamical mass and compare with a stellar mass from the r-band luminosity and a mass-to-light ratio of 3.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must you filter on zWarning = 0?',
              answerOutline:
                'Nonzero flags mark spectra where the template fit was ambiguous, low S/N or had other problems; their redshifts may be catastrophically wrong.',
            },
            {
              question: 'What does a galaxy\'s position above the Kewley line in the BPT diagram indicate?',
              answerOutline:
                'The gas is ionised by a harder spectrum than hot stars can produce, i.e. an active galactic nucleus (or shocks), not star formation.',
            },
            {
              question: 'Why is a Balmer decrement greater than 2.86 a dust indicator?',
              answerOutline:
                'Recombination physics fixes the intrinsic H-alpha/H-beta ratio; dust reddens, suppressing H-beta more than H-alpha, so the observed ratio rises with extinction.',
            },
          ],
        },
      ],
    },
    {
      slug: 'astronomical-data-in-python',
      title: 'Astronomical Data in Python',
      description:
        'The software toolkit: FITS files, world coordinate systems, units and quantities, programmatic archive queries and time-series objects.',
      lessons: [
        {
          slug: 'fits-files-headers-and-tables',
          title: 'FITS files: images, headers and binary tables',
          summary:
            'The universal astronomical file format and how to read, inspect, modify and write it with astropy.io.fits.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the structure of a FITS file (HDUs, headers, data) and the meaning of the mandatory keywords',
            'Open FITS images and tables with astropy, inspect headers and access data as numpy arrays or Tables',
            'Modify headers and write new files while preserving provenance',
            'Handle common pitfalls: byte order, BZERO/BSCALE, multi-extension files, memory mapping of large files',
          ],
          concepts: [
            'Header Data Unit (HDU): primary, image, table extensions',
            'Header keywords: NAXIS, BITPIX, BZERO/BSCALE, EXPTIME, DATE-OBS',
            'HISTORY and COMMENT cards; provenance',
            'Binary tables and astropy Table',
            'Data cubes',
            'Big-endian data and numpy',
            'Memory mapping and lazy loading',
          ],
          explanation: `Every observatory, archive and mission exchanges data as **FITS** (Flexible Image Transport System), a format from 1981 that has survived because it is simple and self-describing. A FITS file is a sequence of **Header Data Units**. Each HDU has a **header** of 80-character ASCII cards (KEYWORD = value / comment) followed by a binary **data** block: an N-dimensional array (image, spectrum, cube) or a **table**. The primary HDU comes first; extensions follow. The mandatory keywords describe the array (NAXIS, NAXISn, BITPIX), and conventions add exposure time, date, filter, object, telescope and the world-coordinate keywords of the next lesson.

With **astropy.io.fits**, fits.open returns a list-like HDUList; hdul.info() shows the structure, hdul[0].header the header (dict-like, with .comments), hdul[0].data a numpy array. Note that FITS stores images in big-endian byte order and row-major with the *last* axis fastest, so a 2D image's data[y, x] indexing is correct and matches what a viewer like DS9 shows. Integer data with BZERO/BSCALE keywords (unsigned 16-bit CCD data is stored as signed plus an offset) are scaled transparently to float on access.

**Tables** are the other half: catalogues, spectra and light curves come as binary table extensions with named, typed columns. astropy.table.Table.read(filename, hdu=1) gives you a Table with units and metadata, which converts to pandas if needed. Kepler and TESS light-curve files, SDSS spectra and Gaia query results all arrive this way.

Good practice: never overwrite raw files; when you write a processed file, copy the original header and add HISTORY cards saying what you did and with which software version. Use memmap=True for files larger than memory, and close files (or use a with block). Multi-extension files (one HDU per CCD amplifier, or science/error/mask planes) need you to pick the right extension by name, e.g. hdul['SCI'].

Work through the three Learn Astropy FITS tutorials in order (images, headers, tables), then inspect real files from MAST and SDSS in the exercises.`,
          resources: [
            {
              title: 'Learn Astropy — Viewing and manipulating FITS images',
              url: 'https://learn.astropy.org/tutorials/FITS-images.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
              primary: true,
            },
            {
              title: 'Learn Astropy — Edit a FITS header',
              url: 'https://learn.astropy.org/tutorials/FITS-header.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'Learn Astropy — Working with Chandra FITS tables',
              url: 'https://learn.astropy.org/tutorials/FITS-tables.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'astropy.io.fits documentation',
              url: 'https://docs.astropy.org/en/stable/io/fits/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'SAOImage DS9',
              url: 'https://ds9.si.edu/',
              type: 'tool',
              cost: 'free',
              provider: 'Smithsonian Astrophysical Observatory',
              note: 'The standard interactive FITS viewer; use it alongside Python to check what you load.',
            },
          ],
          exercises: [
            {
              slug: 'inspect-three-files',
              title: 'Anatomy of three real FITS files',
              prompt:
                'Download (a) a TESS light-curve file from MAST (lightkurve download_lightcurve().to_fits() or direct), (b) an SDSS spectrum (astroquery.sdss.get_spectra), and (c) a Hubble ACS image from MAST. For each, print hdul.info(), list the extensions and their types, print the 15 most informative header keywords with comments, and describe what each data array or table column holds. Draw the structure of each file as a diagram.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'write-a-processed-file',
              title: 'Write a processed image with provenance',
              prompt:
                'Load a raw CCD image, subtract a constant bias and divide by a normalised flat (use your calibration frames from the detector module or synthetic ones). Write the result as a new FITS file with the original header, updated BUNIT, a new keyword for the bias level, and HISTORY cards recording each step, the date and the astropy version. Re-open it and verify the data and header. Then show what goes wrong if you write uint16 data that has become float without updating BITPIX (astropy handles it, but explain the BZERO/BSCALE convention).',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'data-cube',
              title: 'Slice a spectral data cube',
              prompt:
                'Obtain a small integral-field data cube (an SDSS MaNGA cube via the SDSS archive, or an ALMA/VLA cube from the archives; a few hundred MB is fine with memmap). Identify the spatial and spectral axes from the header, extract the spectrum of the brightest spaxel and an image at the wavelength of H-alpha (redshifted), and a continuum image nearby. Plot all three. Report the cube\'s dimensions, pixel scale and spectral sampling from the header alone.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is an HDU and how many does a FITS file have?',
              answerOutline:
                'A header plus data block; a file has one primary HDU and any number of extensions (images or tables).',
            },
            {
              question: 'Why does astropy return float data for a 16-bit CCD image?',
              answerOutline:
                'BZERO/BSCALE keywords indicate the stored integers are offset/scaled (e.g. unsigned 16-bit stored as signed); astropy applies the scaling and returns floats.',
            },
            {
              question: 'Why add HISTORY cards when writing a processed file?',
              answerOutline:
                'Provenance: anyone (including you later) can see what processing was applied, in what order, with which software, which is essential for reproducibility.',
            },
          ],
          relatedLessons: ['programming-fundamentals/programs-and-files/csv-and-json'],
        },
        {
          slug: 'wcs-units-and-visualisation',
          title: 'World coordinate systems, units and image visualisation',
          summary:
            'Mapping pixels to sky with WCS, doing calculations safely with astropy units and constants, and displaying astronomical images properly.',
          estimatedMinutes: 100,
          objectives: [
            'Read a WCS from a header, convert between pixel and world coordinates, and plot an image with sky axes',
            'Obtain a WCS for an uncalibrated image using astrometry.net',
            'Use astropy.units and astropy.constants to carry units through calculations and catch errors',
            'Display images with appropriate stretches and make a three-colour composite',
          ],
          concepts: [
            'WCS keywords: CRPIX, CRVAL, CD/CDELT, CTYPE, projections (TAN)',
            'pixel_to_world and world_to_pixel',
            'Distortion terms (SIP, TPV)',
            'Plate solving with astrometry.net',
            'Quantity arithmetic and unit conversion; equivalencies',
            'Image stretches: linear, log, asinh, zscale',
            'RGB composites with make_lupton_rgb',
          ],
          explanation: `A calibrated image carries a **World Coordinate System**: header keywords that map pixel to sky. CRPIX gives the reference pixel, CRVAL its RA and Dec, the CD matrix (or CDELT and a rotation) the scale and orientation, and CTYPE the projection, almost always the gnomonic **TAN** projection for small fields. Distortion is encoded in SIP or TPV polynomials. astropy.wcs.WCS(header) parses all of this; wcs.pixel_to_world(x, y) returns SkyCoord objects, and the inverse places catalogue stars on your image. With matplotlib's projection=wcs you get axes labelled in RA and Dec, with grid lines, a necessity for any publication figure.

If your image has no WCS (your own telescope), **astrometry.net** solves it blind: upload the image (or run the solver locally) and it identifies star patterns against an index, returning a full WCS including distortion. The nova.astrometry.net service does this in a minute and you should use it for every field you take.

Numbers in astronomy come with units, and astropy's **units** module makes them explicit: 5 * u.pc, (3 * u.km/u.s).to(u.pc/u.Myr), and the constants in astropy.constants (G, c, M_sun) are Quantities. The payoff is that wrong operations fail loudly, that conversions between parsecs, light-years and AU or between flux density conventions are one call, and that **equivalencies** handle the non-linear ones (wavelength to frequency, temperature to energy, parallax to distance). The Learn Astropy quantities tutorial applies this to a real calculation; do the same in every exercise from now on.

Finally, displaying images well is a skill. Astronomical dynamic range is huge, so a linear display shows a few saturated stars on black. Use a **stretch** (log, square-root, asinh) with limits set by **zscale** or percentiles (astropy.visualization provides ImageNormalize with both). Three-colour composites from three filters, made with make_lupton_rgb, use an asinh stretch that preserves colour in bright regions. Work through the astropy WCS and visualisation documentation and the plot-catalog tutorial, then produce a finder chart with a catalogue overlay in the exercises.`,
          resources: [
            {
              title: 'astropy.wcs documentation',
              url: 'https://docs.astropy.org/en/stable/wcs/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              primary: true,
            },
            {
              title: 'Learn Astropy — Using Astropy Quantities and Units for astrophysical calculations',
              url: 'https://learn.astropy.org/tutorials/quantities.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'astropy.visualization documentation',
              url: 'https://docs.astropy.org/en/stable/visualization/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Image normalisation and stretches, WCS axes, RGB composites.',
            },
            {
              title: 'Astrometry.net (nova web service)',
              url: 'https://nova.astrometry.net/',
              type: 'tool',
              cost: 'free',
              provider: 'Astrometry.net',
              note: 'Upload any image to obtain a WCS solution.',
            },
            {
              title: 'astropy.units documentation',
              url: 'https://docs.astropy.org/en/stable/units/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
          ],
          exercises: [
            {
              slug: 'finder-chart-with-overlay',
              title: 'Finder chart with catalogue overlay',
              prompt:
                'Take an image with a WCS (an SDSS frame from astroquery.sdss or a Hubble image from MAST). Query Gaia DR3 for stars in the field, convert their coordinates to pixels with world_to_pixel, and plot the image with WCS axes, an asinh stretch with zscale limits, and circles on the Gaia stars sized by magnitude. Compute the median offset between Gaia positions and the centroids of the detected stars in arcseconds; it should be below a pixel. Save as a PDF finder chart with a scale bar and north/east arrows.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'plate-solve-own-image',
              title: 'Plate-solve an uncalibrated image',
              prompt:
                'Take an image without a WCS (your own, or strip the WCS from a downloaded one). Submit it to nova.astrometry.net (or run the solver locally), download the solved header, and attach it to your image. Verify by overlaying Gaia stars as in the previous exercise. Report the solved pixel scale, rotation and field centre and compare with what you expected from the optics.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'units-everywhere',
              title: 'Rewrite a calculation with units',
              prompt:
                'Rewrite your intro-astronomy calculations of the Sun\'s mass from Earth\'s orbit, the Schwarzschild radius of Sgr A*, and the luminosity of a star from radius and temperature using astropy.units and astropy.constants, so that each result prints in sensible units (solar masses, AU, solar luminosities). Then deliberately add a quantity in parsecs to one in seconds and show the error. Use equivalencies to convert a 21 cm wavelength to frequency and a 100 mas parallax to distance.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'rgb-composite',
              title: 'A three-colour image',
              prompt:
                'Download SDSS g, r and i frames of a bright galaxy (M51 or NGC 4565) via astroquery.sdss, align them (they share a WCS from the same run; otherwise reproject), and make an RGB composite with make_lupton_rgb, experimenting with the stretch and Q parameters. Compare with a simple linear composite and explain why the asinh stretch keeps the galaxy\'s colour gradient visible while the core is not saturated.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do CRPIX, CRVAL and the CD matrix encode?',
              answerOutline:
                'The reference pixel, the world coordinates at that pixel, and the linear transformation (scale and rotation) from pixel offsets to projected sky offsets.',
            },
            {
              question: 'Why use astropy Quantities rather than bare floats?',
              answerOutline:
                'Units are checked and converted automatically, dimensional errors raise exceptions, and conversions like parallax to distance or wavelength to frequency are explicit and correct.',
            },
            {
              question: 'Why does an asinh stretch suit astronomical images?',
              answerOutline:
                'It is linear for faint signal (preserving noise appearance) and logarithmic for bright signal, compressing a huge dynamic range without saturating cores.',
            },
          ],
        },
        {
          slug: 'archive-queries-with-astroquery-and-adql',
          title: 'Programmatic archive access: astroquery, TAP and ADQL',
          summary:
            'Pulling data out of Gaia, SDSS, SIMBAD, VizieR, MAST and the Exoplanet Archive from Python, and writing ADQL queries that run on the server.',
          estimatedMinutes: 110,
          objectives: [
            'Resolve object names and retrieve basic data from SIMBAD and catalogues from VizieR with astroquery',
            'Write ADQL queries with cone searches, joins and server-side aggregation and run them against Gaia and the Exoplanet Archive via TAP',
            'Cross-match catalogues on the server and on the client and understand the pitfalls',
            'Cache results, respect archive limits and make queries reproducible',
          ],
          concepts: [
            'Virtual Observatory protocols: TAP, cone search, SIA/SSA',
            'ADQL: SELECT, WHERE, CONTAINS(POINT, CIRCLE), JOIN, TOP',
            'Asynchronous jobs for large queries',
            'Cross-matching: server-side crossmatch tables vs SkyCoord matching',
            'Random subsets with random_index',
            'astroquery modules: simbad, vizier, gaia, sdss, mast, ipac.nexsci',
            'Caching and reproducibility',
          ],
          explanation: `Clicking through web forms does not scale and is not reproducible. Almost every archive now exposes **Virtual Observatory** services, and **astroquery** wraps them with a consistent Python interface. The most useful is **TAP** (Table Access Protocol), which accepts queries in **ADQL**, an SQL dialect with astronomical geometry functions. A Gaia cone search looks like:

    SELECT source_id, ra, dec, parallax, pmra, pmdec, phot_g_mean_mag
    FROM gaiadr3.gaia_source
    WHERE CONTAINS(POINT('ICRS', ra, dec), CIRCLE('ICRS', 56.75, 24.12, 1.0)) = 1
      AND parallax_over_error > 10

Run it with Gaia.launch_job_async (asynchronous jobs are required beyond a few thousand rows) and get an astropy Table. The same language, with slightly different table names and geometry quirks, works on the NASA Exoplanet Archive (astroquery.ipac.nexsci.nasa_exoplanet_archive, table ps or pscomppars), on VizieR's TAP service, and on SDSS via its own SQL dialect (CasJobs or astroquery.sdss.query_sql). The ADQL standard document and each archive's query help page list the supported functions.

Push work to the server. Filtering, aggregation (COUNT, AVG, GROUP BY), and joins run far faster there than after downloading millions of rows; Gaia even provides precomputed **cross-match tables** against 2MASS, Pan-STARRS, SDSS and others, so a three-way join is a single query. On the client, SkyCoord.match_to_catalog_sky does positional matching with a separation limit; always inspect the separation histogram to pick the limit and beware proper motion between epochs.

Smaller services matter too: **SIMBAD** resolves names to coordinates and basic data (Simbad.query_object), **VizieR** serves any published catalogue by its identifier (Vizier.query_region), **MAST** finds and downloads observations by target or position (Observations.query_criteria), and **HEASARC** does the same for high-energy missions. Be a good citizen: cache results locally (astroquery does by default), use TOP during development, avoid repeated identical queries, and record the exact query text and archive version in your notebook so the result can be reproduced. Work through the Gaia programmatic-access page and the astroquery module docs listed below, then do the exercises.`,
          resources: [
            {
              title: 'Gaia Archive — programmatic access',
              url: 'https://www.cosmos.esa.int/web/gaia-users/archive/programmatic-access',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
              note: 'Astroquery, TAP and DataLink examples; see also "Writing queries" for ADQL tips.',
              primary: true,
            },
            {
              title: 'astroquery.gaia documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/gaia/gaia.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'astroquery — NASA Exoplanet Archive module',
              url: 'https://astroquery.readthedocs.io/en/latest/ipac/nexsci/nasa_exoplanet_archive.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'astroquery.simbad documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/simbad/simbad.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Also see the vizier and mast modules in the same documentation.',
            },
            {
              title: 'IVOA ADQL specification',
              url: 'https://ivoa.net/documents/ADQL/',
              type: 'documentation',
              cost: 'free',
              provider: 'IVOA',
              note: 'The reference for the geometry functions and syntax.',
            },
          ],
          exercises: [
            {
              slug: 'three-archive-join',
              title: 'A three-archive join',
              prompt:
                'For the open cluster NGC 2516: (1) resolve its coordinates with SIMBAD; (2) query Gaia DR3 within 1 degree with parallax_over_error > 5, using the server-side crossmatch to 2MASS to add J and K magnitudes in the same query; (3) select members by proper motion and parallax; (4) plot the G vs BP-RP and K vs J-K colour-magnitude diagrams side by side. Record the query text, the number of rows at each step and the time taken. Then repeat the 2MASS match on the client with SkyCoord matching and compare the number of matches and the separation histogram.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'exoplanet-archive-tap',
              title: 'Server-side aggregation on the Exoplanet Archive',
              prompt:
                'Using the Exoplanet Archive TAP service via astroquery, write ADQL that returns, for each discovery method, the number of planets, the median orbital period and the median planet radius (use the pscomppars table). Then query all transiting planets with both a mass and radius measured to better than 20 percent and plot mass vs radius. Record how many rows each query returned and what a full-table download would have cost in comparison.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'mast-observation-search',
              title: 'Find and download observations from MAST',
              prompt:
                'Using astroquery.mast.Observations, search for all observations of the galaxy M87 by Hubble and JWST, list the instruments, filters and exposure times, and download the smallest calibrated image product. Then search by position for TESS light curves of the exoplanet host WASP-121 and list the sectors. Write a function that takes a target name and returns a summary table of what each mission holds for it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does CONTAINS(POINT(...), CIRCLE(...)) = 1 do in ADQL?',
              answerOutline:
                'Selects rows whose position lies inside the given circle on the sky, i.e. a cone search evaluated on the server.',
            },
            {
              question: 'Why prefer server-side cross-match tables over client-side matching?',
              answerOutline:
                'They are precomputed with proper handling of epochs and errors, run fast as joins, and avoid downloading entire catalogues; client matching is fine for small sets but needs care with separations and proper motion.',
            },
            {
              question: 'What should you record to make an archive query reproducible?',
              answerOutline:
                'The exact query text, the archive and data release (e.g. Gaia DR3), the date, and the row count; archives change and queries without TOP/ORDER BY may return different subsets.',
            },
          ],
        },
        {
          slug: 'lightkurve-and-space-based-time-series',
          title: 'Kepler and TESS light curves with lightkurve',
          summary:
            'Downloading, cleaning, detrending and analysing space-based photometry, and understanding the systematics that pipelines remove.',
          estimatedMinutes: 110,
          objectives: [
            'Search for and download Kepler/K2/TESS light curves and target pixel files with lightkurve',
            'Distinguish SAP and PDCSAP flux and explain the systematics each contains',
            'Remove outliers and detrend stellar variability while preserving transits',
            'Build a custom aperture light curve from a target pixel file and diagnose contamination',
          ],
          concepts: [
            'Target pixel files vs light-curve files',
            'SAP vs PDCSAP flux; cotrending basis vectors',
            'Quality flags, momentum dumps, scattered light',
            'Flattening with Savitzky-Golay / biweight; masking transits',
            'Custom apertures and centroid motion',
            'Stitching sectors/quarters',
            'Periodograms within lightkurve',
          ],
          explanation: `Kepler (2009-2018) and TESS (2018-) have produced millions of light curves with precision of tens of parts per million, and **lightkurve** makes them a few lines away: search_lightcurve('TIC 261136679', author='SPOC', sector=1).download() returns a LightCurve object with time (BTJD or BKJD), flux and error, plotting, folding and periodogram methods built in.

Two flux columns matter. **SAP** flux is simple aperture photometry: the raw sum over the pipeline's pixel mask, containing instrumental systematics such as pointing jitter, thermal focus changes and, for TESS, scattered Earth and Moon light at the start and end of each orbit. **PDCSAP** flux has had these removed by fitting and subtracting common trends (**cotrending basis vectors**) shared by many stars on the detector, and it is corrected for crowding. PDCSAP is usually what you want, but the correction can distort or remove long-period astrophysical signals, so for rotation periods longer than about ten days or for slow eclipses, inspect SAP too. Always apply the **quality flags** (remove_nans, quality_bitmask) and look for **momentum dumps** (thruster firings that leave spikes).

Stars vary, and a transit search needs a flat baseline: **flatten** with a running filter (Savitzky-Golay in lightkurve, or the biweight filter in the wotan package) with a window several times the transit duration, and **mask known transits** before flattening or the filter will eat them. Then remove outliers by sigma clipping (upward outliers only if you care about transits).

For anything unusual, go back to the **target pixel file**: a cube of postage-stamp images at every cadence. Define your own aperture (pixels above a threshold), check the **centroid** motion during dips (a shift means the signal comes from a neighbour, a classic false positive), and compare light curves from the core and the halo of the star. Finally **stitch** sectors or quarters after normalising each. Work through the lightkurve tutorials in order, reproduce them on new targets, then do the exercises; this is the foundation of the planetary-science capstone.`,
          resources: [
            {
              title: 'Lightkurve documentation and tutorials',
              url: 'https://lightkurve.github.io/lightkurve/',
              type: 'documentation',
              cost: 'free',
              provider: 'Lightkurve / STScI',
              note: 'Do "1. Getting started" and "2. Creating light curves" tutorials fully; "3. Science examples" covers transits, asteroseismology and rotation.',
              primary: true,
            },
            {
              title: 'Lightkurve on GitHub',
              url: 'https://github.com/lightkurve/lightkurve',
              type: 'tool',
              cost: 'free',
              provider: 'Lightkurve collaboration',
              note: 'Source, issue tracker and the tutorial notebooks in docs/source/tutorials.',
            },
            {
              title: 'MAST — TESS mission page',
              url: 'https://archive.stsci.edu/missions-and-data/tess',
              type: 'dataset',
              cost: 'free',
              provider: 'STScI',
              note: 'Data products description (SPOC, QLP, TESS-SPOC) and release notes per sector.',
            },
            {
              title: 'astropy.timeseries documentation',
              url: 'https://docs.astropy.org/en/stable/timeseries/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'The TimeSeries class that lightkurve builds on, with a Kepler example.',
            },
          ],
          exercises: [
            {
              slug: 'sap-vs-pdcsap',
              title: 'Compare SAP and PDCSAP',
              prompt:
                'Download TESS SPOC light curves for a quiet star and for a spotted, rotating star (e.g. a young K dwarf; find one with a 2-5 day rotation period in the literature or by trial). For each, plot SAP and PDCSAP flux on the same axes with quality-flagged points marked. Describe the systematics visible in SAP (orbit-start ramps, scattered light) and judge whether PDCSAP preserved or damaged the rotation signal. Compute a Lomb-Scargle periodogram of both and compare the rotation period and amplitude.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'custom-aperture-tpf',
              title: 'Custom aperture and centroid test from a target pixel file',
              prompt:
                'Download the TESS target pixel file for a known transiting planet host and for an eclipsing-binary false positive (TOI lists on ExoFOP mark false positives; or use a Kepler KOI flagged as a background eclipsing binary). Build light curves from the pipeline aperture, a tighter aperture and a larger one. Compute the flux-weighted centroid during and outside the dips. Show that the planet host\'s centroid is stable while the false positive\'s shifts, and explain how the depth changes with aperture in each case.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'flatten-without-eating-transits',
              title: 'Detrending that preserves transits',
              prompt:
                'Take a TESS light curve of a planet with 3-hour transits on an active star. Flatten with window lengths of 0.25, 0.5, 1, 2 and 5 days, with and without masking the transits. For each, measure the transit depth from a phase-fold and compare with the Exoplanet Archive. Plot depth vs window length for both cases and explain why too short a window suppresses the depth and why masking fixes it.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between SAP and PDCSAP flux?',
              answerOutline:
                'SAP is the raw aperture sum with instrumental systematics; PDCSAP has common-mode systematics removed via cotrending basis vectors and is corrected for crowding, at the cost of possibly distorting long-term astrophysical signals.',
            },
            {
              question: 'Why check the centroid during a transit-like dip?',
              answerOutline:
                'If the dip comes from a neighbouring eclipsing binary within the aperture, the light centroid shifts during the dip; a true planet on the target leaves the centroid unchanged.',
            },
            {
              question: 'Why mask transits before flattening?',
              answerOutline:
                'A running filter treats the transit as part of the trend and partially removes it, biasing the depth low; masking excludes those points from the trend estimate.',
            },
          ],
          relatedLessons: ['planetary-science-exoplanets/exoplanet-detection-methods/the-transit-method'],
        },
      ],
      project: {
        slug: 'archive-to-figure-pipeline',
        title: 'Project: a reproducible archive-to-figure pipeline',
        description: `Write a small package that, given a cluster name, queries SIMBAD for coordinates, Gaia DR3 (with 2MASS cross-match) for members by proper motion and parallax, computes absolute magnitudes with extinction from a published value, and produces a publication-quality colour-magnitude diagram with a labelled isochrone-free turn-off estimate, a sky plot with WCS axes over a downloaded survey image, and a table of members written to FITS and CSV with full provenance in the header. The package must run end to end from one command and be covered by tests that use cached query results.`,
        deliverables: [
          'Python package with command-line entry point, README and environment file',
          'Tests using cached small query results (no network in tests)',
          'Output for three clusters: figures, member tables, and a log of queries with row counts',
        ],
        estimatedHours: 10,
      },
    },
    {
      slug: 'statistics-for-astronomers',
      title: 'Statistics for Astronomers',
      description:
        'The specific statistical habits of observational work: honest error bars, chi-squared fitting and its abuses, Bayesian parameter estimation with MCMC, and the selection effects that bias every survey.',
      lessons: [
        {
          slug: 'uncertainties-and-error-propagation',
          title: 'Measurement uncertainty and error propagation',
          summary:
            'Random versus systematic errors, propagating uncertainties analytically and by Monte Carlo, weighted means, and why astronomers report what they report.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish statistical and systematic uncertainties and report both',
            'Propagate uncertainties through a formula with the linear (first-order) method, including correlated inputs',
            'Propagate uncertainties by Monte Carlo and know when the linear method fails',
            'Compute weighted means and their uncertainties and test for excess scatter',
          ],
          concepts: [
            'Statistical vs systematic errors; accuracy vs precision',
            'Linear propagation: $\\sigma_f^2 = \\sum (\\partial f/\\partial x_i)^2 \\sigma_i^2$ plus covariance terms',
            'Logarithms and magnitudes: $\\sigma_m = 1.0857\\,\\sigma_F/F$',
            'Monte Carlo propagation',
            'Weighted mean and its variance; reduced chi-squared of the mean',
            'Asymmetric errors and non-Gaussian cases (1/parallax)',
            'Significant figures and reporting conventions',
          ],
          explanation: `Every number you report needs an uncertainty, and that uncertainty has two parts. **Statistical** (random) errors come from noise and shrink with more data; **systematic** errors come from calibration, model assumptions or selection and do not. Report both, separately, as in $d = 412 \\pm 8\\,(\\mathrm{stat}) \\pm 15\\,(\\mathrm{sys})$ pc. A result with a tiny statistical error and an unexamined systematic is the commonest way to be confidently wrong.

To carry errors through a calculation $f(x_1, x_2, \\dots)$, the first-order (linear) formula is
$$\\sigma_f^2 = \\sum_i \\left(\\frac{\\partial f}{\\partial x_i}\\right)^2 \\sigma_i^2 + 2\\sum_{i<j} \\frac{\\partial f}{\\partial x_i}\\frac{\\partial f}{\\partial x_j}\\,\\mathrm{cov}(x_i, x_j) .$$
Products and ratios add fractional errors in quadrature; sums add absolute errors in quadrature; a logarithm turns a fractional error into an absolute one, which is why a magnitude error is $1.0857\\,\\sigma_F/F$. The covariance term is not optional: fitted parameters such as a line's slope and intercept are strongly correlated, and ignoring that over- or under-estimates the error of a prediction.

The linear method fails when the function is strongly nonlinear over the error range or the errors are not small. Distance from parallax, $d = 1/p$, with a 30 percent parallax error is the classic case: the distribution of $d$ is skewed with a long tail. The remedy is **Monte Carlo propagation**: draw many samples of the inputs from their error distributions, compute $f$ for each, and summarise the output distribution with its median and 16th-84th percentiles, which gives asymmetric errors honestly. It is ten lines of numpy and should be your default for anything nonlinear.

When combining independent measurements of the same quantity, use the **weighted mean** with weights $1/\\sigma_i^2$; its variance is $1/\\sum(1/\\sigma_i^2)$. Then compute the reduced chi-squared of the measurements about the mean: if it is much larger than 1, the quoted errors are too small or there is an unmodelled systematic, and the error of the mean should be inflated. Read Hogg, Bovy and Lang's "Fitting a model to data" introduction for the philosophy, then do the exercises, including the Gaia parallax case.`,
          resources: [
            {
              title: 'Data analysis recipes: Fitting a model to data (Hogg, Bovy & Lang)',
              url: 'https://arxiv.org/abs/1008.4686',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections 1-3: the generative-model view of uncertainty and why least squares works when it does.',
              primary: true,
            },
            {
              title: 'astropy.stats documentation',
              url: 'https://docs.astropy.org/en/stable/stats/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Sigma clipping, robust estimators, binomial and Poisson confidence intervals.',
            },
            {
              title: 'Dos and don\'ts of reduced chi-squared (Andrae, Schulze-Hartung & Melchior)',
              url: 'https://arxiv.org/abs/1012.3754',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Short and essential before you ever quote a reduced chi-squared.',
            },
          ],
          exercises: [
            {
              slug: 'propagate-stellar-radius',
              title: 'Propagate errors into a stellar radius',
              prompt:
                'A star has parallax 12.5 ± 0.4 mas, apparent bolometric magnitude 8.20 ± 0.03 and temperature 5600 ± 80 K. Compute its luminosity and radius with uncertainties (a) by linear propagation, carefully including the chain through distance and absolute magnitude, and (b) by Monte Carlo with 100,000 draws, reporting median and 16-84 percentile intervals. Compare, then repeat with parallax error 4 mas and show where the linear method breaks.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'weighted-mean-excess-scatter',
              title: 'Combine radial velocities with excess scatter',
              prompt:
                'Download the Gaia DR3 radial_velocity and radial_velocity_error for 20 stars in an open cluster, or use literature velocities of a cluster from VizieR. Compute the weighted mean velocity and its error, the reduced chi-squared about the mean, and the intrinsic velocity dispersion needed (added in quadrature to each error) to make reduced chi-squared equal 1. Explain why the dispersion is physical (cluster dynamics, binaries) rather than a measurement problem, and estimate the cluster mass from the virial theorem with a plausible radius.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'correlated-errors',
              title: 'Correlated fit parameters',
              prompt:
                'Fit a straight line to 20 noisy points with x between 10 and 20 and obtain the covariance matrix of slope and intercept (numpy.polyfit with cov=True or scipy.optimize.curve_fit). Predict y at x = 0, 15 and 30 with uncertainties, once ignoring the covariance and once including it. Show that the two agree near the data centre and differ badly at x = 0, and explain geometrically. Then refit with x centred on its mean and show the covariance nearly vanishes.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A flux is measured as 1000 ± 50 counts. What is the magnitude error?',
              answerOutline: '1.0857 x 50/1000 = 0.054 mag.',
            },
            {
              question: 'When should you use Monte Carlo rather than linear error propagation?',
              answerOutline:
                'When the function is nonlinear over the error range (e.g. 1/parallax with large fractional error), errors are non-Gaussian, or the output distribution is asymmetric; MC gives honest percentile intervals.',
            },
            {
              question: 'What does a reduced chi-squared of 4 for a weighted mean tell you?',
              answerOutline:
                'The measurements scatter twice as much as their errors predict: either the errors are underestimated or there is intrinsic scatter or a systematic; the error on the mean must be inflated accordingly.',
            },
          ],
          relatedLessons: ['probability-statistics/statistics-in-practice/uncertainty-propagation'],
        },
        {
          slug: 'model-fitting-least-squares-and-chi-squared',
          title: 'Model fitting: least squares, chi-squared and residual diagnostics',
          summary:
            'Fitting lines, curves and nonlinear models to data with errors, interpreting chi-squared and parameter covariances, and checking that the model is actually adequate.',
          estimatedMinutes: 110,
          objectives: [
            'Derive weighted least squares from the Gaussian likelihood and fit linear models analytically',
            'Fit nonlinear models with scipy.optimize.curve_fit and astropy.modeling, with sensible starting values and bounds',
            'Interpret chi-squared, degrees of freedom and the parameter covariance matrix, and know the limits of reduced chi-squared',
            'Diagnose a bad fit from residual plots and handle outliers robustly',
          ],
          concepts: [
            'Likelihood, chi-squared and weighted least squares',
            'Linear models and the normal equations',
            'Nonlinear fitting: Levenberg-Marquardt, initial guesses, local minima',
            'Degrees of freedom; chi-squared distribution',
            'Covariance matrix from the Hessian',
            'Residual plots; runs and structure',
            'Outliers: sigma clipping, mixture models, robust loss',
            'Errors in both variables; intrinsic scatter',
          ],
          explanation: `Fitting a model is asking which parameters make the data most probable. If each point $y_i$ has Gaussian error $\\sigma_i$ about the model $m(x_i; \\theta)$, the log-likelihood is $-\\tfrac12\\chi^2$ with
$$\\chi^2(\\theta) = \\sum_i \\frac{\\left[y_i - m(x_i;\\theta)\\right]^2}{\\sigma_i^2} ,$$
so maximising the likelihood is minimising $\\chi^2$: **weighted least squares**. For models linear in the parameters (a polynomial, a sum of templates) the minimum is found exactly by solving the normal equations, and the parameter covariance matrix comes for free: $\\mathbf{C} = (\\mathbf{A}^T \\mathbf{W} \\mathbf{A})^{-1}$. For nonlinear models (a Gaussian line, a transit, a Keplerian orbit) iterative methods such as Levenberg-Marquardt (scipy.optimize.curve_fit, astropy.modeling) find a local minimum from a starting guess; a bad guess finds the wrong minimum, so plot the initial model over the data before trusting any fit and use bounds for physical parameters.

At the minimum, $\\chi^2$ should be about the number of degrees of freedom $\\nu = N - p$ if the model is right and the errors are correct; the **reduced chi-squared** $\\chi^2/\\nu \\approx 1 \\pm \\sqrt{2/\\nu}$. A value of 3 means the model is inadequate or the errors are underestimated; a value of 0.3 means the errors are overestimated or the data were over-fitted. But read Andrae et al.: $\\nu$ is ill-defined for nonlinear models and the statistic is a weak test. Better diagnostics are **residual plots**: residuals against $x$, against the fitted value and against time should look like white noise with no runs, curvature or growing scatter. Any structure is a missing physical term or a systematic.

Real data have **outliers**, and a single one can drag a least-squares fit. Iterative sigma clipping (astropy.modeling's FittingWithOutlierRemoval) works when outliers are few and large; a **mixture model** that assigns each point a probability of being bad is the principled approach, described in Hogg et al. Two further complications recur in astronomy: errors in both variables (fit the perpendicular distance, or model $x$ as a latent variable), and **intrinsic scatter** beyond the errors, which must be added as a free parameter or your uncertainties will be wrong. Work through Hogg et al. sections 1-7 with their exercises, then the Learn Astropy fitting tutorial, then do the exercises here.`,
          resources: [
            {
              title: 'Data analysis recipes: Fitting a model to data (Hogg, Bovy & Lang)',
              url: 'https://arxiv.org/abs/1008.4686',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'Sections 1-7 with the worked exercises on their table of data; outliers, intrinsic scatter and errors in both variables.',
              primary: true,
            },
            {
              title: 'astropy.modeling documentation',
              url: 'https://docs.astropy.org/en/stable/modeling/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Model classes, compound models, fitters with outlier removal.',
            },
            {
              title: 'scipy.optimize.curve_fit reference',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.curve_fit.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Note the absolute_sigma argument: set it True when your errors are real.',
            },
            {
              title: 'Dos and don\'ts of reduced chi-squared (Andrae et al.)',
              url: 'https://arxiv.org/abs/1012.3754',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
            },
          ],
          exercises: [
            {
              slug: 'hogg-exercises',
              title: 'The Hogg, Bovy and Lang exercises',
              prompt:
                'Using the data table in Hogg et al. (2010), complete exercises 1-4 (straight line fits with and without the outliers, by hand with the normal equations and with numpy), then exercise 6 (the mixture model for outliers). Report parameters with covariance, plot the fits with the 1-sigma uncertainty band computed from the covariance, and compare the mixture-model result with simple sigma clipping.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'fit-a-spectral-line',
              title: 'Fit a spectral line properly',
              prompt:
                'Fit a Gaussian plus linear continuum to an emission line in an SDSS spectrum using astropy.modeling, with the pipeline inverse-variance as weights. Report centroid, width and flux with errors from the covariance, the chi-squared and degrees of freedom, and a residual plot. Then fit the same line with a Voigt or two-Gaussian model and decide, from the residuals and the change in chi-squared, whether the extra parameters are justified. Finally, show how the centroid error changes if you ignore the weights.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'intrinsic-scatter',
              title: 'A relation with intrinsic scatter',
              prompt:
                'Query SDSS for 2000 elliptical galaxies with velocity dispersion and absolute r magnitude (compute from z with astropy.cosmology) to recover the Faber-Jackson relation. Fit log(sigma) vs M_r by ordinary least squares, then with the measurement errors, then adding an intrinsic scatter parameter by maximising the likelihood with scipy.optimize.minimize. Compare slopes and uncertainties and explain why the error-only fit gives an absurdly large reduced chi-squared.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does minimising chi-squared correspond to maximum likelihood?',
              answerOutline:
                'For independent Gaussian errors the log-likelihood is a constant minus chi-squared/2, so the parameters that maximise likelihood minimise chi-squared.',
            },
            {
              question: 'What does a residual plot with a clear curve tell you that reduced chi-squared might not?',
              answerOutline:
                'The model is missing a term (wrong functional form); structured residuals reveal model inadequacy even when chi-squared per degree of freedom looks acceptable because errors were overestimated.',
            },
            {
              question: 'What happens to parameter uncertainties if you ignore intrinsic scatter?',
              answerOutline:
                'They are underestimated (the fit believes the data are tighter than they are) and the weighting is wrong; adding a scatter term inflates and corrects them.',
            },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/linear-regression-and-least-squares'],
        },
        {
          slug: 'bayesian-inference-and-mcmc',
          title: 'Bayesian parameter estimation with MCMC',
          summary:
            'Posteriors instead of best fits: priors, likelihoods, sampling with emcee, convergence checks, corner plots and reporting credible intervals.',
          estimatedMinutes: 120,
          objectives: [
            'Write down a posterior for an astronomical model with explicit priors and likelihood',
            'Sample it with emcee, choose walkers and burn-in, and check convergence with the autocorrelation time',
            'Summarise posteriors with corner plots, medians and credible intervals, and derive posteriors of derived quantities',
            'Explain when MCMC is needed and its limits (multimodality, model comparison, cost)',
          ],
          concepts: [
            'Bayes theorem: posterior ∝ likelihood × prior',
            'Choosing priors: uniform, log-uniform, informative',
            'Log-probability functions in code',
            'Affine-invariant ensemble sampler (emcee)',
            'Burn-in, thinning, autocorrelation time, acceptance fraction',
            'Corner plots and marginal distributions',
            'Credible intervals vs confidence intervals',
            'Nested sampling and evidence (dynesty) for model comparison',
          ],
          explanation: `Least squares gives a best fit and a covariance matrix that is only right if the likelihood is Gaussian in the parameters, which it rarely is for nonlinear models with bounded or correlated parameters. The Bayesian approach instead characterises the full **posterior** distribution,
$$p(\\theta \\mid D) \\propto p(D \\mid \\theta)\\, p(\\theta) ,$$
the likelihood times the **prior**. The prior is where you state what you knew before: a planet radius must be positive, a period is better described log-uniformly, a stellar density may be known from a spectrum. Write both as log-probability functions in code; the log-posterior is their sum. In practice the likelihood is the same $-\\tfrac12\\chi^2$ as before, possibly with a jitter term for underestimated errors.

Posteriors in more than a couple of dimensions cannot be gridded, so we **sample** them. **emcee** implements an affine-invariant ensemble sampler: dozens of walkers explore the space, each proposing moves based on the others' positions, which handles correlated parameters without tuning. You initialise the walkers in a small ball around a reasonable guess (a least-squares fit is ideal), run, discard the **burn-in** during which the walkers forget their start, and keep the rest. Convergence is checked with the **integrated autocorrelation time** $\\tau$: run for at least 50 $\\tau$ and thin by about $\\tau/2$; a chain shorter than that has not sampled the posterior. Watch the acceptance fraction (0.2-0.5 is healthy) and the walker traces.

The chain is a set of samples from the posterior, and everything follows from it. A **corner plot** shows every 1D marginal and 2D joint distribution, revealing correlations and non-Gaussian shapes. Report each parameter as the median with the 16th and 84th percentiles (a 68 percent **credible interval**). For any derived quantity (planet density from radius and mass), compute it per sample and summarise the resulting distribution; the errors propagate automatically, correlations included.

MCMC does not do everything. It can get stuck in one mode of a multimodal posterior (a period alias is the classic case), it does not compute the evidence needed to compare models (use nested sampling with dynesty for that), and it can be slow for expensive models. Read Hogg and Foreman-Mackey's MCMC recipes, follow the emcee quickstart, then fit a real transit in the exercises.`,
          resources: [
            {
              title: 'Data analysis recipes: Using Markov Chain Monte Carlo (Hogg & Foreman-Mackey)',
              url: 'https://arxiv.org/abs/1710.06068',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'When to use MCMC, how to initialise and run it, convergence and reporting.',
              primary: true,
            },
            {
              title: 'emcee documentation',
              url: 'https://emcee.readthedocs.io/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'Dan Foreman-Mackey',
              note: 'Quickstart, the "Fitting a model to data" tutorial and the autocorrelation analysis page.',
            },
            {
              title: 'corner.py documentation',
              url: 'https://corner.readthedocs.io/en/latest/',
              type: 'documentation',
              cost: 'free',
              provider: 'Dan Foreman-Mackey',
            },
            {
              title: 'dynesty documentation (nested sampling)',
              url: 'https://dynesty.readthedocs.io/en/stable/',
              type: 'documentation',
              cost: 'free',
              provider: 'Josh Speagle',
              note: 'For evidence computation and multimodal posteriors.',
            },
          ],
          exercises: [
            {
              slug: 'emcee-line-with-scatter',
              title: 'The emcee tutorial, then extend it',
              prompt:
                'Reproduce the emcee "Fitting a model to data" tutorial (line with underestimated errors and a log-f jitter term). Then extend it: add a quadratic term and compare the posteriors; compute and plot the autocorrelation time versus chain length and verify your chain is long enough; and produce posterior predictive bands (draw 100 samples and plot the lines) over the data.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'mcmc-transit-fit',
              title: 'MCMC fit of a TESS transit',
              prompt:
                'Using a flattened, phase-folded TESS light curve of a known hot Jupiter from lightkurve, fit a transit model (use the batman-like model in the exoplanet or lightkurve ecosystem, or a simple trapezoid as a first pass) with emcee for period, epoch, radius ratio, scaled semi-major axis and impact parameter, with quadratic limb darkening fixed or given Gaussian priors. Report medians and 68 percent intervals, a corner plot, and the derived planet radius (with the stellar radius and its error from the TESS Input Catalog, propagated through the samples). Compare with the Exoplanet Archive values and discuss the radius-impact-parameter degeneracy visible in the corner plot.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'prior-sensitivity',
              title: 'How much do priors matter?',
              prompt:
                'For the transit fit, rerun with (a) uniform vs log-uniform prior on the scaled semi-major axis, (b) a Gaussian prior on stellar density from the TIC vs no prior, and (c) 10 percent of the data removed. Tabulate the posterior medians and intervals for the radius ratio and impact parameter in each case. Explain which parameters are data-dominated and which are prior-dominated, and why the stellar-density prior breaks the degeneracy.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the role of the prior and how do you choose it?',
              answerOutline:
                'It encodes knowledge before the data (positivity, scale, external measurements); choose uniform or log-uniform for scale parameters without information, Gaussian from independent measurements, and always state it and test sensitivity.',
            },
            {
              question: 'How do you know an emcee chain has converged?',
              answerOutline:
                'The integrated autocorrelation time is estimated reliably and the chain is at least ~50 times longer; walker traces are stationary; acceptance fraction is reasonable; results are stable when the run is extended.',
            },
            {
              question: 'How do you get the uncertainty on a derived quantity from an MCMC chain?',
              answerOutline:
                'Compute the quantity for every sample and take the percentiles of the resulting distribution; this propagates correlations and non-Gaussianity automatically.',
            },
          ],
          relatedLessons: ['probability-statistics/bayesian-inference-and-mcmc/mcmc-sampling'],
        },
        {
          slug: 'selection-effects-detection-and-upper-limits',
          title: 'Selection effects, detection significance and upper limits',
          summary:
            'Why every astronomical sample is biased, how to recognise and correct Malmquist and Eddington bias, and how to state a detection or a non-detection honestly.',
          estimatedMinutes: 100,
          objectives: [
            'Explain Malmquist bias and Eddington bias and estimate their size for a given survey',
            'Use the V/Vmax method to estimate a luminosity function from a flux-limited sample',
            'Compute detection significance and false-positive rates in the presence of many trials',
            'Set upper limits for non-detections using Poisson and Bayesian methods',
          ],
          concepts: [
            'Flux-limited samples and Malmquist bias',
            'Eddington bias near the detection limit',
            'Completeness and the V/Vmax test',
            'Lutz-Kelker bias in parallax samples',
            'Look-elsewhere effect; trials factor',
            'Poisson upper limits (Gehrels); Feldman-Cousins',
            'Bayesian upper limits from the posterior',
            'Survey selection functions',
          ],
          explanation: `Astronomical samples are not random samples of the universe; they are samples of what was bright enough to detect. A **flux-limited** survey sees luminous objects to greater distances than faint ones, so the volume in which a luminous object can be found is larger and the sample is over-represented by luminous objects: **Malmquist bias**. If you average the luminosity of a sample of standard candles you get something brighter than the true mean, and any distance based on an assumed mean luminosity is biased. The correction requires knowing the luminosity function and the selection; the **V/Vmax** method (compute, for each object, the fraction of the maximum volume within which it could have been detected; the mean should be 0.5 for a uniform population) both tests for completeness and weights objects correctly.

Near the detection limit a second bias appears. Noise scatters some faint objects above the threshold and some bright ones below it; because faint objects are more numerous, more are scattered up than down, so the measured fluxes of objects near the limit are biased high: **Eddington bias**. Parallax samples suffer the analogous **Lutz-Kelker bias**. Any statistic involving the faintest bins must model this, typically by simulating the survey.

Detection claims need honest **significance**. A 3-sigma peak is impressive in one trial and expected among a thousand: the **look-elsewhere effect**. A periodogram searches thousands of frequencies, a transit search millions of (period, epoch, duration) combinations, a map millions of pixels; the false-alarm probability must include the trials factor or be calibrated by simulation (inject-and-recover, bootstrap). This is why exoplanet searches demand signal-to-noise above about 7 and why a 2-sigma "hint" in a single spectrum rarely survives.

When nothing is detected you still learn something: an **upper limit**. For counting experiments with few photons use the Poisson intervals (Gehrels 1986; astropy.stats.poisson_conf_interval), being clear whether you mean a 95 percent or 3-sigma limit. In a Bayesian fit the upper limit is simply the 95th percentile of the posterior of the amplitude with a positivity prior. State the confidence level, the assumed source shape or spectrum, and the aperture; a limit without these is meaningless. Read the relevant sections of the ADS literature cited below and do the simulation exercises, which make each bias visible.`,
          resources: [
            {
              title: 'astropy.stats — confidence intervals and robust statistics',
              url: 'https://docs.astropy.org/en/stable/stats/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'poisson_conf_interval (Gehrels, Feldman-Cousins and Bayesian options), binom_conf_interval.',
              primary: true,
            },
            {
              title: 'Data analysis recipes: Fitting a model to data (Hogg, Bovy & Lang)',
              url: 'https://arxiv.org/abs/1008.4686',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'The discussion of selection and censored data in the later sections.',
            },
            {
              title: 'NED Level 5 — knowledgebase for extragalactic astronomy',
              url: 'https://ned.ipac.caltech.edu/level5/',
              type: 'article',
              cost: 'free',
              provider: 'NASA/IPAC',
              note: 'Hosts classic review articles on luminosity functions, Malmquist bias and the V/Vmax method.',
            },
            {
              title: 'NASA ADS',
              url: 'https://ui.adsabs.harvard.edu/',
              type: 'documentation',
              cost: 'free',
              provider: 'NASA / Harvard',
              note: 'Search for Gehrels 1986 (Poisson limits), Schmidt 1968 (V/Vmax) and Lutz & Kelker 1973.',
            },
          ],
          exercises: [
            {
              slug: 'simulate-malmquist',
              title: 'Simulate Malmquist bias',
              prompt:
                'Generate 1,000,000 standard candles with absolute magnitude drawn from a Gaussian of mean -19.3 and scatter 0.3 (Type Ia-like), uniformly distributed in a volume out to 500 Mpc. Apply an apparent-magnitude limit of 18. Compute the mean absolute magnitude of the detected sample as a function of distance bin and plot it; show that it brightens by about 1.38 sigma^2 (in magnitudes) overall for a uniform population. Then compute the distance error you would make for the farthest bin using the true mean.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'v-over-vmax',
              title: 'V/Vmax on an SDSS quasar sample',
              prompt:
                'Query SDSS for quasars with 0.5 < z < 2 and i < 19.1 (the main survey limit), with their i magnitudes. Using astropy.cosmology, compute for each the maximum redshift at which it would still be brighter than 19.1 (ignore K-corrections at first, then include a simple power-law K-correction), the enclosed comoving volumes V and Vmax, and the distribution of V/Vmax. Report the mean and compare with 0.5; interpret the deviation in terms of quasar evolution and incompleteness.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'trials-factor-and-upper-limit',
              title: 'Look-elsewhere and an upper limit',
              prompt:
                'Simulate 1000 pure-noise light curves of 1000 points each and compute the maximum Lomb-Scargle peak over 10,000 frequencies in each; plot the distribution and read off the 1 percent false-alarm threshold. Compare with the single-frequency 1 percent threshold and compute the effective trials factor. Then, for a non-detection with 3 observed and 2.5 expected background counts, compute the 95 percent upper limit on the source counts with poisson_conf_interval using the Gehrels and Feldman-Cousins methods and explain the difference.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is Malmquist bias and when does it matter?',
              answerOutline:
                'In a flux-limited sample intrinsically luminous objects are over-represented because they are visible over larger volumes; it biases mean luminosities and distances whenever a sample is selected by apparent brightness.',
            },
            {
              question: 'Why does a 3-sigma peak in a periodogram not mean a 0.3 percent chance of being noise?',
              answerOutline:
                'Thousands of independent frequencies were searched; the probability that at least one noise peak reaches 3 sigma is far higher (look-elsewhere effect); the false-alarm probability must include the trials.',
            },
            {
              question: 'What must accompany any quoted upper limit?',
              answerOutline:
                'The confidence level, the method (Poisson/Bayesian), the assumed source properties (spectrum, size, aperture) and the background treatment.',
            },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/model-selection-and-multiple-comparisons'],
        },
      ],
    },
    {
      slug: 'surveys-and-archives',
      title: 'Surveys and Archives',
      description:
        'A working tour of the great surveys and the archives that hold them: what each contains, how it was selected, and how to get science out of it.',
      lessons: [
        {
          slug: 'sdss-skyserver-and-sql',
          title: 'SDSS: SkyServer, CasJobs and the science of a survey database',
          summary:
            'The Sloan Digital Sky Survey as the model of a survey database: its imaging and spectroscopy, its schema, and how to ask it scientific questions in SQL.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the SDSS imaging and spectroscopic surveys, their depth, area and selection',
            'Navigate the SDSS schema (PhotoObj, SpecObj, galSpec tables) and write joins that answer scientific questions',
            'Use flags and quality cuts correctly to build clean samples',
            'Run large queries in CasJobs or via astroquery and manage the results',
          ],
          concepts: [
            'SDSS imaging: ugriz to r ~ 22.2 over 14,000 square degrees',
            'SDSS spectroscopy: main galaxy sample, LRGs, BOSS/eBOSS, APOGEE, MaNGA',
            'Schema: PhotoObj, PhotoObjAll, SpecObj, Star/Galaxy views',
            'Flags: SATURATED, EDGE, clean photometry',
            'Petrosian, model and PSF magnitudes',
            'Target selection and its consequences',
            'CasJobs and MyDB for large queries',
          ],
          explanation: `The **Sloan Digital Sky Survey** has imaged a third of the sky in five bands and taken spectra of millions of objects, and it pioneered the idea that a survey is a database you query rather than a set of images you download. Learning its structure prepares you for every later survey.

The **imaging** catalogue is the PhotoObj table (and PhotoObjAll, which includes duplicates and secondaries): one row per detected object with positions, magnitudes in several definitions, shape parameters, flags and a type (star or galaxy). The magnitude definitions matter: **PSF magnitudes** for point sources, **model magnitudes** (best of exponential/de Vaucouleurs fits) for galaxy colours, **Petrosian magnitudes** for galaxy total light. The Star and Galaxy views pre-filter by type. The **spectroscopic** catalogue is SpecObj: one row per spectrum with class, subclass, redshift and flags, linked to PhotoObj through bestObjID. Derived tables (galSpecLine, galSpecInfo, the APOGEE stellar parameter tables, MaNGA data cubes) sit alongside.

Writing a good query means knowing the **selection**. The main galaxy sample is complete to Petrosian r = 17.77; LRGs and quasars were targeted by colour; BOSS targets are different again. A redshift distribution from SpecObj is a distribution of targets, not of galaxies. Likewise, **flags** must be applied: exclude SATURATED, EDGE, and objects with bad deblending, and use the clean-photometry recipe from the documentation; otherwise your colour-magnitude diagram is full of artefacts. The schema browser and the sample queries on SkyServer show the standard cuts.

For small queries (under a minute, a few tens of thousands of rows) the SkyServer SQL page or astroquery.sdss.query_sql suffices. For anything larger use **CasJobs**: submit queries to a queue, store results in your own database (MyDB), and join your tables against the survey. Download results as FITS or CSV when done. Work through the SkyServer help and the SDSS Voyages activities, then build the clean galaxy sample in the exercises; it is the kind of sample behind most SDSS papers.`,
          resources: [
            {
              title: 'SDSS SkyServer DR18 — SQL search',
              url: 'https://skyserver.sdss.org/dr18/SearchTools/sql',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'Includes sample queries; the schema browser is linked from the same site.',
              primary: true,
            },
            {
              title: 'SDSS DR17 documentation — spectroscopy overview',
              url: 'https://www.sdss4.org/dr17/spectro/',
              type: 'documentation',
              cost: 'free',
              provider: 'SDSS',
              note: 'Navigate to imaging, target selection and the flags documentation from here.',
            },
            {
              title: 'Sloan Digital Sky Survey IV overview (Blanton et al. 2017)',
              url: 'https://arxiv.org/abs/1703.00052',
              type: 'article',
              cost: 'free',
              provider: 'arXiv',
              note: 'What the surveys are, their selection and their data products.',
            },
            {
              title: 'astroquery.sdss documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/sdss/sdss.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'SDSS Voyages',
              url: 'https://voyages.sdss.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'SDSS',
            },
          ],
          exercises: [
            {
              slug: 'clean-galaxy-sample',
              title: 'Build a clean galaxy sample',
              prompt:
                'Write a SQL query that returns 50,000 galaxies from the main galaxy sample (Petrosian r < 17.77, class GALAXY, zWarning = 0, 0.02 < z < 0.2) with model magnitudes in all bands and the clean-photometry flag cuts from the documentation. Plot the colour-magnitude diagram (u - r vs M_r, using astropy.cosmology for distances) and identify the red sequence and blue cloud. Then remove the flag cuts and show, by colouring the extra points, what artefacts they add.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'schema-join-exercise',
              title: 'Three joins that answer questions',
              prompt:
                'Write and run queries that answer: (1) what fraction of spectroscopically confirmed quasars at z > 2 are classified as stars by the imaging type (join SpecObj and PhotoObj)? (2) what is the median H-alpha equivalent width of star-forming galaxies as a function of absolute magnitude (join galSpecLine, galSpecInfo and SpecObj)? (3) how many objects in a 1-degree field have both an SDSS spectrum and a Gaia counterpart within 1 arcsecond (use the SDSS-Gaia crossmatch table if present, otherwise export and match in Python)? Report each query, its runtime and row count.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'selection-function-redshift',
              title: 'The selection function in a redshift histogram',
              prompt:
                'Query the redshift distribution of (a) the main galaxy sample, (b) LRGs, (c) BOSS CMASS galaxies and (d) quasars, using the appropriate target flags from the documentation. Plot the four normalised histograms. Explain each shape in terms of the magnitude or colour selection and the luminosity function, and explain why none of them is the redshift distribution of galaxies in the universe.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Which SDSS magnitude would you use for a galaxy colour and which for its total brightness?',
              answerOutline:
                'Model magnitudes for colours (same aperture in all bands); Petrosian magnitudes for total flux (aperture independent of distance).',
            },
            {
              question: 'Why must you apply photometric flags before trusting a colour-magnitude diagram?',
              answerOutline:
                'Saturated stars, objects on chip edges, bad deblends and moving objects produce spurious colours and magnitudes that contaminate the diagram.',
            },
            {
              question: 'Why is the SpecObj redshift distribution not that of the galaxy population?',
              answerOutline:
                'Spectroscopic targets were selected by magnitude and colour for different programmes; the distribution reflects target selection and the flux limit, not the underlying population.',
            },
          ],
        },
        {
          slug: 'gaia-the-astrometric-revolution',
          title: 'Gaia: astrometry, photometry and the three-dimensional Galaxy',
          summary:
            'What Gaia measures and how well, the contents of DR3, the quality indicators you must use, and the science you can do with a billion parallaxes and proper motions.',
          estimatedMinutes: 110,
          objectives: [
            'Describe Gaia\'s measurement principle and the precision of its parallaxes, proper motions and photometry as a function of magnitude',
            'Select reliable astrometry using RUWE, parallax_over_error and other quality indicators and explain the parallax zero-point',
            'Convert Gaia astrometry to distances and space velocities with proper treatment of uncertainties',
            'Use the DR3 astrophysical parameters, radial velocities and variability catalogues appropriately',
          ],
          concepts: [
            'Scanning law and the astrometric solution',
            'Parallax precision: ~0.02 mas at G=15, ~0.5 mas at G=20',
            'RUWE and astrometric excess noise; binaries',
            'Parallax zero-point offset (~ -0.017 mas)',
            'Distance inference: Bailer-Jones priors',
            'Proper motions to tangential velocities: 4.74 mu / parallax km/s',
            'G, BP, RP photometry and the BP/RP excess factor',
            'DR3 radial velocities, astrophysical parameters, variability',
          ],
          explanation: `**Gaia** has measured the positions of nearly two billion sources repeatedly since 2014, and from the tiny apparent motions derives **parallaxes** and **proper motions** with precision of tens of microarcseconds for bright stars. The satellite spins and precesses so that every source is observed about 70 times from different directions; the global astrometric solution fits all sources simultaneously. The result, in DR3, is a five-parameter solution (position, parallax, two proper motions) for 1.5 billion sources, plus photometry in the broad G band and the BP and RP bands, low-resolution spectra, radial velocities for 33 million stars, astrophysical parameters (temperature, gravity, extinction) for hundreds of millions, and variability classifications.

Using it well means respecting its **quality indicators**. The **RUWE** (renormalised unit weight error) measures how well the single-star model fits; values above about 1.4 indicate a problem, often an unresolved binary, and such sources' parallaxes should not be trusted. parallax_over_error controls distance precision; astrometric_excess_noise and the number of visibility periods flag poor solutions; phot_bp_rp_excess_factor flags contaminated colours in crowded fields. Gaia parallaxes also have a small systematic **zero-point** offset (about -17 microarcseconds, depending on magnitude, colour and position) that must be corrected for precision work.

Converting astrometry to physics has two traps already met in this subject. Distance is not $1/p$ when the fractional error is large; the Bailer-Jones catalogues provide proper Bayesian distances with a Galactic prior, and you should use them or do the inference yourself. And tangential velocity is $v_t = 4.74\\,\\mu\\,(\\mathrm{mas/yr}) / p\\,(\\mathrm{mas})$ km/s, with the same nonlinearity; combine with the radial velocity to get full 3D motion, and use astropy's Galactocentric frame to put it in the Galaxy's rest frame.

With this, Gaia answers questions that were science fiction a decade ago: the full orbit of any nearby star, the membership of every cluster, the structure of the Milky Way's disk and halo, the discovery of stellar streams and the Galaxy's merger history. Read the DR3 documentation and the archive's use cases, then do the exercises, which end with a space-velocity analysis of a stream.`,
          resources: [
            {
              title: 'Gaia DR3 overview (ESA)',
              url: 'https://www.cosmos.esa.int/web/gaia/dr3',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
              note: 'Contents of the release, the data model and the known issues page.',
              primary: true,
            },
            {
              title: 'Gaia DR3 papers',
              url: 'https://www.cosmos.esa.int/web/gaia/dr3-papers',
              type: 'article',
              cost: 'free',
              provider: 'ESA',
              note: 'The astrometric solution, validation and zero-point papers are essential before quoting a parallax.',
            },
            {
              title: 'Gaia Archive — use cases and tutorials',
              url: 'https://www.cosmos.esa.int/web/gaia-users/archive/use-cases',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
            },
            {
              title: 'Learn Astropy — Computing Galactic orbits of stars with Gaia and Gala',
              url: 'https://learn.astropy.org/tutorials/gaia-galactic-orbits.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'ESA Gaia mission page',
              url: 'https://www.esa.int/Science_Exploration/Space_Science/Gaia',
              type: 'article',
              cost: 'free',
              provider: 'ESA',
            },
          ],
          exercises: [
            {
              slug: 'quality-cuts-effect',
              title: 'What quality cuts do to the H-R diagram',
              prompt:
                'Query 300,000 Gaia DR3 stars within 300 pc (parallax > 3.33). Plot the colour-magnitude diagram with no cuts, then with parallax_over_error > 10, then adding RUWE < 1.4, then adding the BP/RP excess-factor cut from the documentation. Show the four panels and count the stars. Identify the features that the cuts remove (the spurious faint blue sequence, the smeared binaries) and the ones they introduce (bias against binaries and crowded fields).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'space-velocities-of-a-stream',
              title: 'Space velocities of the Hyades or a stellar stream',
              prompt:
                'Select Hyades members (parallax 18-25 mas, within 15 degrees of RA 67, Dec 16, proper-motion box around pmra 100, pmdec -30 mas/yr) with DR3 radial velocities. Convert to Galactocentric Cartesian velocities with astropy (correcting the parallax zero-point and using Bailer-Jones distances if available). Plot the U-V and U-W velocity planes, compute the cluster\'s mean velocity and dispersion, and identify the tidal tails as the extended distribution along the orbit. Compare with published values.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'binary-detection-with-ruwe',
              title: 'Binaries from RUWE and radial-velocity scatter',
              prompt:
                'For 50,000 stars with G < 15 within 500 pc, plot the RUWE distribution and the distribution of rv_amplitude_robust (or radial_velocity_error relative to expectation). Estimate the fraction of stars with RUWE > 1.4 as a function of colour and compare with the known binary fraction trend with stellar mass. For a few high-RUWE stars, check SIMBAD for known binarity.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a high RUWE indicate and what should you do about it?',
              answerOutline:
                'The single-star astrometric model fits poorly, commonly because of an unresolved binary or crowding; the parallax and proper motion are unreliable and the source should be excluded or modelled as a binary.',
            },
            {
              question: 'How do you convert a proper motion to a tangential velocity?',
              answerOutline:
                'v_t = 4.74 x mu(mas/yr) / parallax(mas) km/s, taking care with the nonlinearity in 1/parallax when the parallax error is large.',
            },
            {
              question: 'Why is a parallax zero-point of 17 microarcseconds important?',
              answerOutline:
                'For distant stars with parallaxes of 0.1-0.5 mas it is a 3-17 percent systematic error in distance, which propagates into luminosities and the distance ladder.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/stellar-observables/distances-and-parallax'],
        },
        {
          slug: 'mast-and-space-mission-archives',
          title: 'MAST: Hubble, JWST, Kepler and TESS data products',
          summary:
            'The Mikulski Archive for Space Telescopes: how to find observations, what the calibrated data products contain, and how to use the Hubble and JWST pipelines\' outputs.',
          estimatedMinutes: 100,
          objectives: [
            'Search MAST by target, position, mission and instrument through the portal and astroquery',
            'Describe the levels of data products (raw, calibrated, drizzled/combined, high-level science products) for Hubble and JWST',
            'Work with the multi-extension FITS files of Hubble/JWST (SCI, ERR, DQ) and their WCS',
            'Find Kepler/TESS products (light curves, target pixel files, full-frame images) and the catalogues (KIC, TIC) that describe the targets',
          ],
          concepts: [
            'MAST portal, astroquery.mast Observations and Catalogs',
            'Hubble products: raw, flt/flc, drz/drc; drizzling',
            'JWST products: uncal, cal, i2d/s2d/x1d stages',
            'SCI/ERR/DQ extensions and data-quality flags',
            'Proprietary periods and public data',
            'Kepler/TESS products and the TIC',
            'High-Level Science Products (HLSPs)',
          ],
          explanation: `**MAST** holds the data of NASA's optical, ultraviolet and infrared space missions: Hubble, JWST, Kepler/K2, TESS, GALEX, Pan-STARRS and more. Everything is public after a proprietary period (typically 12 months for Hubble and JWST, none for TESS), and most of it can be found and downloaded with astroquery.mast.

For Hubble and JWST, understand the **processing levels**. Hubble raw frames are calibrated by the instrument pipeline into flt (or flc, CTE-corrected) files: bias, dark, flat and photometric calibration applied, one file per exposure, still with geometric distortion. **Drizzling** combines dithered exposures into a distortion-corrected, cosmic-ray-cleaned drz/drc mosaic with a clean WCS; this is usually the product you want for imaging, while flt files are needed for careful PSF photometry. JWST has analogous stages: uncal (raw ramps), cal (calibrated per exposure), and combined i2d images or s2d/x1d spectra. Each file is multi-extension: SCI holds the data, ERR the per-pixel uncertainty and DQ a bitmask of data-quality flags that you must apply (bad pixels, saturation, cosmic rays) before measuring anything. Pixel units are often count rates or MJy/sr; read the BUNIT and PHOTFLAM/PHOTFNU keywords to convert to physical flux.

Searching is by target name or coordinates with Observations.query_criteria (filterable by mission, instrument, filter, exposure time, proprietary status); Observations.get_product_list and download_products fetch the files. Prefer the smallest product that does the job; a single Hubble visit can be gigabytes.

For time series, MAST serves Kepler and TESS light curves, target pixel files and full-frame images, which lightkurve wraps; the **TESS Input Catalog** (TIC) via Catalogs.query gives stellar parameters for every target, needed to turn a radius ratio into a planet radius. **High-Level Science Products** are community-contributed, often the best starting point (e.g. the TESS-SPOC full-frame-image light curves or the Hubble Legacy Archive mosaics). Work through the MAST notebook repository examples for your mission of interest, then do the exercises.`,
          resources: [
            {
              title: 'MAST Portal',
              url: 'https://mast.stsci.edu/portal/Mashup/Clients/Mast/Portal.html',
              type: 'dataset',
              cost: 'free',
              provider: 'STScI',
              primary: true,
            },
            {
              title: 'MAST Notebook Repository',
              url: 'https://spacetelescope.github.io/mast_notebooks/intro.html',
              type: 'interactive',
              cost: 'free',
              provider: 'STScI',
              note: 'Jupyter notebooks per mission: searching, downloading and analysing Hubble, JWST, TESS and others.',
            },
            {
              title: 'astroquery.mast documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/mast/mast.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'MAST — TESS mission page',
              url: 'https://archive.stsci.edu/missions-and-data/tess',
              type: 'documentation',
              cost: 'free',
              provider: 'STScI',
            },
            {
              title: 'NASA Science — Webb mission',
              url: 'https://science.nasa.gov/mission/webb/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
            },
          ],
          exercises: [
            {
              slug: 'hubble-drizzled-photometry',
              title: 'Photometry on a Hubble drizzled image',
              prompt:
                'Find and download a drizzled ACS/WFC or WFC3/UVIS image of a globular cluster from MAST (query by name, instrument and filter; pick the smallest drc product). Open it, apply the DQ mask (or weight map), use the WCS to overlay Gaia stars, and perform aperture photometry on 50 isolated stars with the published aperture corrections and PHOTFLAM to get calibrated magnitudes in the ST or Vega system. Compare with Gaia G for the same stars after a colour transformation and comment on the agreement.',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'jwst-spectrum-product',
              title: 'Read a JWST spectral product',
              prompt:
                'Search MAST for a public JWST NIRSpec or NIRISS exoplanet transmission spectrum observation (e.g. WASP-39 b) and download the x1d or the equivalent HLSP. Plot the extracted spectrum with its errors, identify the extension structure, and read the wavelength solution. Then explain, from the file headers, the observation\'s exposure time, number of integrations and dispersion element, and write a paragraph on why a time series of such spectra reveals a planet\'s atmosphere.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'tic-and-tess-products',
              title: 'From TIC to light curve for a target list',
              prompt:
                'For a list of ten TOI (TESS Object of Interest) host stars (from ExoFOP or the Exoplanet Archive TOI table), query the TIC for their stellar radius, mass, temperature and contamination ratio, list which sectors observed each (Observations.query_criteria with target_name or by position), and download the SPOC 2-minute light curve where available and a TESS-SPOC FFI light curve otherwise. Produce a summary table and one phase-folded transit per target using the TOI ephemeris.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between an flt and a drz Hubble file?',
              answerOutline:
                'flt is a single calibrated exposure with geometric distortion and cosmic rays; drz is the drizzled combination of dithered exposures, distortion-corrected and cleaned, with a resampled pixel grid.',
            },
            {
              question: 'What are the SCI, ERR and DQ extensions?',
              answerOutline:
                'Science data, per-pixel uncertainty, and a data-quality bitmask flagging bad pixels, saturation, cosmic rays etc., which must be applied before measurement.',
            },
            {
              question: 'Why do you need the TIC to interpret a TESS transit?',
              answerOutline:
                'The transit gives only the planet-to-star radius ratio; the TIC stellar radius (and its error) is needed for the planet radius, and the contamination ratio corrects the depth for blended light.',
            },
          ],
        },
        {
          slug: 'heasarc-and-multiwavelength-archives',
          title: 'HEASARC and multiwavelength data: X-ray, gamma-ray, infrared and radio',
          summary:
            'Beyond the optical: where high-energy, infrared and radio data live, how their data products differ (event lists, counts, visibilities), and how to assemble a spectral energy distribution across the spectrum.',
          estimatedMinutes: 100,
          objectives: [
            'Find and retrieve high-energy data from HEASARC (Chandra, XMM, Swift, Fermi, NICER) and describe the event-list data model',
            'Explain how X-ray spectra and images are built from photon events and why Poisson statistics dominate',
            'Locate infrared (2MASS, WISE, Spitzer, Herschel) and radio (NVSS, VLASS, ALMA) catalogues and images through IRSA, VizieR and the NRAO/ALMA archives',
            'Assemble and plot a multiwavelength spectral energy distribution with correct unit conversions',
          ],
          concepts: [
            'HEASARC Browse, Xamin and astroquery.heasarc',
            'Event lists: time, position, energy per photon',
            'Response matrices (RMF/ARF) and forward modelling',
            'Low-count statistics: C-statistic',
            'IRSA: 2MASS, WISE/AllWISE, Spitzer, Herschel',
            'Radio surveys: NVSS, FIRST, VLASS; interferometric images',
            'SED construction: nu F_nu, Jansky, magnitude systems',
            'Multiwavelength cross-identification',
          ],
          explanation: `The optical is a narrow window. **HEASARC** (NASA's High Energy Astrophysics Science Archive Research Center) holds X-ray and gamma-ray missions past and present (Chandra, XMM-Newton, Swift, NuSTAR, NICER, Fermi, and many more) and their catalogues, searchable through its Browse and Xamin interfaces or astroquery.heasarc. The data model is different from optical imaging: X-ray detectors record **individual photons** as an **event list** with time, position and energy for each. Images, light curves and spectra are made by binning events in position, time or energy, which means you choose the binning, and the statistics are Poisson with often very few counts per bin. Spectral analysis cannot simply divide by a sensitivity function because the detector's energy response is broad and non-diagonal; instead you **forward-model**: fold a trial spectrum through the response matrix (RMF) and effective area (ARF) and compare with the counts, using the Cash statistic rather than chi-squared in the low-count regime. Tools such as XSPEC and Sherpa do this; the concepts are what matter here.

**Infrared** data live mostly at IRSA (IPAC): the all-sky 2MASS (JHK) and WISE/AllWISE (3.4-22 micron) catalogues, Spitzer and Herschel images and catalogues, plus dust maps. These are essential for reddening corrections, for cool and obscured objects, and for the thermal emission of dust and planets. **Radio** surveys (NVSS and FIRST at 1.4 GHz, VLASS at 3 GHz) are served by NRAO and VizieR; ALMA has its own archive. Interferometric images are reconstructions from visibilities and have a synthesised beam rather than a PSF, a restoring beam that must be used to convert from Jy/beam to flux.

Putting it together, the **spectral energy distribution** (SED) is the plot of $\\nu F_\\nu$ (or $\\lambda F_\\lambda$) against frequency over the whole spectrum, which shows where the energy comes out and hence what the source is. Building one requires converting every archive's units (Jy, AB magnitudes, Vega magnitudes, counts/s with a response, erg/s/cm$^2$ in a band) to a common flux density, matching apertures, and checking identifications across wavelengths with their different resolutions. astropy.units with spectral equivalencies does the conversions; the care is yours. Work through the HEASARC and IRSA astroquery documentation and build an SED in the exercises.`,
          resources: [
            {
              title: 'HEASARC (NASA High Energy Astrophysics Science Archive)',
              url: 'https://heasarc.gsfc.nasa.gov/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Browse and Xamin search interfaces, mission pages and the HEASoft tools.',
              primary: true,
            },
            {
              title: 'astroquery.heasarc documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/heasarc/heasarc.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
            },
            {
              title: 'astroquery.vizier documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/vizier/vizier.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Access to 2MASS, AllWISE, NVSS, FIRST and thousands of other catalogues by identifier.',
            },
            {
              title: 'Learn Astropy — Working with Chandra FITS tables',
              url: 'https://learn.astropy.org/tutorials/FITS-tables.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
              note: 'Reads a real Chandra event list and bins it into an image and a light curve.',
            },
            {
              title: 'NASA Science missions (Chandra, Fermi, Spitzer pages)',
              url: 'https://science.nasa.gov/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
            },
          ],
          exercises: [
            {
              slug: 'chandra-event-list',
              title: 'From events to image, light curve and spectrum',
              prompt:
                'Following the Learn Astropy Chandra tutorial, download an event list for a bright point source (e.g. the Chandra observation used there, or any public ObsID of a quasar from HEASARC). Bin events into an image and locate the source; extract events within a 2 arcsecond radius and a background annulus; make a light curve in 500 s bins with Poisson errors and test for variability with a chi-squared against constant; and make a counts spectrum in energy bins. Explain why you cannot convert the counts spectrum to physical flux without the response files.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'build-an-sed',
              title: 'Build a multiwavelength SED',
              prompt:
                'For a bright blazar (e.g. 3C 273) and a nearby star-forming galaxy (e.g. M82), collect flux measurements from: NVSS/FIRST (radio), AllWISE and 2MASS (infrared), SDSS or Pan-STARRS (optical), GALEX (UV, via MAST), and a catalogued X-ray flux from HEASARC (ROSAT, XMM or Swift catalogues). Convert everything to nu F_nu in erg/s/cm^2 using astropy.units, note the apertures and epochs, and plot both SEDs on the same axes. Interpret the shapes: where does each object emit most of its energy and what physical components (synchrotron, dust, stars, accretion) does that imply?',
              kind: 'data-analysis',
              difficulty: 3,
            },
            {
              slug: 'low-count-statistics',
              title: 'Why chi-squared fails for X-ray spectra',
              prompt:
                'Simulate a power-law spectrum observed with a mean of 2 counts per bin in 50 bins. Fit the normalisation and slope by (a) chi-squared with sigma = sqrt(counts) and (b) the Poisson likelihood (C-statistic). Repeat 1000 times and plot the distribution of fitted slopes for each; show that chi-squared is biased and the Poisson likelihood is not. Explain the origin of the bias (bins with zero counts, variance estimated from the data).',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How does X-ray data differ fundamentally from a CCD image?',
              answerOutline:
                'Each photon is recorded individually with time, position and energy; images, spectra and light curves are built by binning events, and the statistics are Poisson with few counts.',
            },
            {
              question: 'Why must X-ray spectra be forward-modelled through a response matrix?',
              answerOutline:
                'The detector redistributes photon energies broadly (non-diagonal response), so observed counts cannot be inverted to a spectrum; a model is folded through RMF and ARF and compared with counts.',
            },
            {
              question: 'What does an SED plotted as nu F_nu show?',
              answerOutline:
                'The energy output per logarithmic frequency interval, so the peak shows where most of the luminosity emerges and the shape identifies emission mechanisms.',
            },
          ],
          relatedLessons: ['high-energy-astrophysics/radiative-processes/x-ray-spectral-analysis'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'raw-data-to-measurement',
    title: 'Capstone: from raw data to a measurement with error bars',
    description: `Choose one of the following and carry it from raw archive or telescope data to a result with a full uncertainty analysis, written up as a short paper (abstract, data, method, results, discussion) with reproducible code:

- **Imaging photometry**: obtain raw CCD frames of an open cluster (Las Cumbres Observatory archive data are public after the proprietary period; or request time through an education programme) in two filters. Reduce them (bias, dark, flat), detect sources, perform aperture photometry, calibrate to the standard system using Gaia or Pan-STARRS stars in the field, build the colour-magnitude diagram, and estimate the cluster's distance modulus and reddening by main-sequence fitting, with uncertainties from a bootstrap.
- **Transit light curve**: obtain a TESS light curve with lightkurve, detrend it, fit a transit model with emcee (period, epoch, radius ratio, impact parameter, limb darkening), and report the planet radius with posterior uncertainties, comparing with the NASA Exoplanet Archive value. Then obtain a ground-based transit of the same planet (ExoFOP or your own) and measure the mid-time to test the ephemeris.
- **Spectroscopic measurement**: take an SDSS or archival long-slit spectrum of a galaxy, measure its redshift from at least five lines with a cross-correlation or line fitting, estimate the velocity dispersion from line widths after correcting for instrumental resolution, and compute the enclosed dynamical mass with error propagation; or measure the radial velocity curve of a spectroscopic binary from archival spectra and derive the minimum masses.
- **Variable star**: assemble a multi-year light curve from AAVSO and ZTF data for an RR Lyrae or Cepheid, determine the period with Lomb-Scargle and refine it with phase dispersion minimisation, fit the period-luminosity relation to get the distance, and compare with the Gaia parallax distance including its uncertainty.

Whichever you choose, the report must state every assumption, show residual plots, propagate uncertainties (analytically or by Monte Carlo), and compare with a literature value, explaining any discrepancy.`,
    deliverables: [
      'A reproducible repository: raw-data download script, reduction/analysis notebook, environment file',
      'A 6-10 page report with figures: data, method, results with uncertainties, comparison with literature',
      'A residual-analysis section demonstrating that the model fits and that the quoted uncertainties are realistic',
      'A short reflection on the dominant systematic and how you would reduce it with more or different data',
    ],
    estimatedHours: 20,
    stretchGoals: [
      'Submit the result (e.g. a transit mid-time to the Exoplanet Transit Database, or photometry to AAVSO)',
      'Repeat the analysis with a second, independent dataset and quantify the agreement',
      'Package your pipeline so that it runs on a new target from a single command',
    ],
  },
  masteryChecklist: [
    'I can specify any sky position and time unambiguously (ICRS, epoch, time scale, barycentric correction) and convert between systems with astropy',
    'I can calibrate raw CCD frames and explain what each calibration step removes and what noise it adds',
    'I can predict the signal-to-noise ratio of an observation from the CCD equation and plan exposure times accordingly',
    'I can perform aperture and PSF photometry, calibrate to a standard system, and extract a differential light curve with realistic errors',
    'I can wavelength-calibrate and extract a spectrum and measure line positions, widths and radial velocities',
    'I can read, write and inspect FITS files and WCS, and query Gaia, SDSS, MAST and HEASARC programmatically',
    'I can fit a model to data with least squares and with MCMC, check residuals and report posterior uncertainties',
    'I can recognise selection effects (Malmquist, Eddington bias) and set upper limits properly',
    'I have reduced real data from raw frames to a published-quality measurement with error bars',
  ],
});
