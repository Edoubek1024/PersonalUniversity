import { defineSubject } from '../define';

export default defineSubject({
  id: 'intro-astronomy',
  title: 'Introduction to Astronomy',
  category: 'astronomy',
  tagline:
    'From the motions you can see with your own eyes to the Big Bang: the physical story of the universe and the evidence behind it.',
  description: `Astronomy is the oldest science and still the one where a beginner can make a real measurement on the first night: the Moon's phase, a planet's slow drift against the stars, the length of the day. This subject starts there and builds outward to the Sun, the stars, the galaxies and the universe as a whole, always asking two questions: *what is physically happening*, and *how do we know*.

The spine is the free OpenStax *Astronomy 2e* textbook, supplemented by MIT OpenCourseWare 8.282 problem sets, the Open Yale ASTR 160 lectures, and a steady diet of real data. You will use Stellarium to predict what the sky does, NASA fact sheets to compute densities and surface gravities, Gaia and SDSS archive queries to build your own Hertzsprung-Russell diagrams, and simple Python to turn magnitudes into luminosities and redshifts into distances.

No physics beyond algebra and a little trigonometry is assumed, but you will not avoid quantitative reasoning: every module ends with numbers you computed yourself. By the end you should be able to explain any object in the night sky physically, estimate its properties from first principles, and read a popular astronomy news story critically enough to know what was actually measured.`,
  difficulty: 'beginner',
  estimatedHours: 60,
  prerequisites: [],
  recommendedBackground: [
    'Algebra and basic trigonometry; scientific notation',
    'Willingness to go outside at night with a notebook',
    'Beginner Python helps for the data exercises but is not required',
  ],
  tags: ['astronomy', 'solar system', 'stars', 'galaxies', 'cosmology', 'observing', 'OpenStax'],
  core: true,
  modules: [
    {
      slug: 'the-night-sky',
      title: 'The Night Sky',
      description:
        'What you can see without a telescope, why it moves the way it does, and how those motions led from Ptolemy to Newton.',
      lessons: [
        {
          slug: 'the-celestial-sphere-and-daily-motion',
          title: 'The celestial sphere and daily motion',
          summary:
            'The sky as a rotating sphere: horizon, zenith, celestial poles and equator, and why your latitude decides which stars you can ever see.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the celestial sphere model and name the horizon, zenith, meridian, celestial poles and celestial equator',
            'Predict which stars are circumpolar, which rise and set, and which never rise from a given latitude',
            'Relate the altitude of the celestial pole to the observer\'s latitude and use it to find your latitude from Polaris',
            'Use a planetarium program to check a prediction about the sky at a given time and place',
          ],
          concepts: [
            'Celestial sphere: a useful fiction',
            'Horizon, zenith, nadir, meridian',
            'North and south celestial poles; celestial equator',
            'Diurnal (daily) motion from Earth\'s rotation',
            'Circumpolar stars',
            'Altitude of the pole equals latitude',
            'Constellations as regions of the sky (88 IAU boundaries)',
          ],
          explanation: `Stand outside for an hour and the whole sky seems to turn about a fixed point. Astronomers model this with the **celestial sphere**: an imaginary sphere of enormous radius centred on you, onto which every star is projected. The sphere is a fiction (stars lie at wildly different distances) but a powerful one, because *directions* are all that the eye can measure, and directions behave exactly as if painted on a rotating sphere.

The sphere's axis is the extension of Earth's rotation axis; it pierces the sky at the **north and south celestial poles**, and the **celestial equator** is the projection of Earth's equator. The sky appears to turn westward once per sidereal day (23 h 56 m) because Earth turns eastward. Your own sky is cut off by the **horizon**; the point overhead is the **zenith**, and the great circle through the zenith and the poles is the **meridian**, which every object crosses at its highest point (its *transit*).

The key geometric fact is that **the altitude of the celestial pole above your horizon equals your latitude**. From latitude $\\phi$, stars within $\\phi$ degrees of the visible pole are **circumpolar** (never set), stars within $\\phi$ degrees of the other pole never rise, and the rest rise in the east and set in the west. At the equator every star rises and sets; at the pole none do. This is why a traveller to the southern hemisphere sees a completely new sky.

Pitfalls: north on a sky map is not the same as north on the ground (sky maps are drawn as seen looking *up*, so east and west are swapped relative to a ground map), and "the Pole Star" is only roughly at the pole (Polaris is about 0.7 degrees away).

Work through OpenStax section 2.1, then open Stellarium, set your location, and watch a whole night pass at 1000x speed. Find the point that does not move. Then change your latitude to 0 and to 80 degrees and watch how the motion changes. The exercises make these observations quantitative.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 2.1 The Sky Above',
              url: 'https://openstax.org/books/astronomy-2e/pages/2-1-the-sky-above',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'The celestial sphere, celestial poles and equator, and the constellations.',
              primary: true,
            },
            {
              title: 'Stellarium (desktop planetarium)',
              url: 'https://stellarium.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Stellarium',
              note: 'Install the desktop version; the web version at stellarium-web.org also works for most exercises.',
            },
            {
              title: 'MIT OCW 8.282J Introduction to Astronomy — lecture notes',
              url: 'https://ocw.mit.edu/courses/8-282j-introduction-to-astronomy-spring-2006/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The first lecture notes cover the celestial sphere at a slightly more mathematical level.',
            },
            {
              title: 'From Stargazers to Starships (NASA GSFC archived course)',
              url: 'https://pwg.gsfc.nasa.gov/stargaze/Sintro.htm',
              type: 'course',
              cost: 'free',
              provider: 'NASA',
              note: 'The first sections on the sky, the pole star and latitude are a gentle complement.',
            },
          ],
          exercises: [
            {
              slug: 'latitude-from-polaris',
              title: 'Measure your latitude from Polaris',
              prompt:
                'On a clear night, measure the altitude of Polaris above the horizon with a protractor and a weighted string (or a phone inclinometer app). Take five readings, average them and estimate the scatter. Compare with your true latitude. Then correct for Polaris being 0.7 degrees from the pole: using Stellarium, find where Polaris sits relative to the pole at the time you observed, and show how much of your residual error this explains.',
              kind: 'data-analysis',
              difficulty: 1,
              hint: 'Southern hemisphere: use Stellarium to find the altitude of the south celestial pole from the Southern Cross and the Pointers instead.',
            },
            {
              slug: 'circumpolar-prediction',
              title: 'Predict and verify circumpolar stars',
              prompt:
                'For your latitude, compute the declination limit above which stars are circumpolar and below which stars never rise. List five bright stars in each category (use a star catalogue or Stellarium\'s search). Then run Stellarium through 24 hours and confirm each prediction. Explain any star that you classified wrongly.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'sidereal-vs-solar-day',
              title: 'Why the stars rise four minutes earlier each night',
              prompt:
                'Explain, with a diagram, why the sidereal day (23 h 56 m 4 s) is shorter than the solar day (24 h). Compute how many sidereal days there are in one year and why that is exactly one more than the number of solar days. Then check with Stellarium: note the time a chosen star crosses the meridian on two nights one week apart.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the altitude of the north celestial pole tell you, and why?',
              answerOutline:
                'It equals the observer\'s latitude: the pole is the extension of Earth\'s axis, and the angle between the horizon plane and the axis is the latitude by simple geometry.',
            },
            {
              question: 'Which stars are circumpolar for an observer at latitude 40 N?',
              answerOutline:
                'Those with declination greater than +50 degrees (90 minus 40); they never dip below the horizon. Stars with declination below -50 never rise.',
            },
            {
              question: 'Why is the celestial sphere a useful model even though stars are at different distances?',
              answerOutline:
                'The naked eye measures only directions; directions on the sky behave exactly like points on a rotating sphere, so positions and motions can be predicted without knowing distances.',
            },
          ],
        },
        {
          slug: 'seasons-and-keeping-time',
          title: 'The Sun\'s yearly path, the seasons and keeping time',
          summary:
            'The ecliptic, the tilt of Earth\'s axis, why we have seasons (and why it is not distance), and how calendars and clocks are tied to the sky.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the cause of the seasons in terms of axial tilt, Sun altitude and day length, and refute the distance misconception',
            'Describe the ecliptic, the solstices and equinoxes, and how the Sun\'s rising point moves along the horizon through the year',
            'Compute the noon altitude of the Sun for any latitude and date',
            'Explain the relation between solar time, time zones, the equation of time and the calendar',
          ],
          concepts: [
            'Ecliptic: the Sun\'s annual path',
            'Obliquity: 23.4 degree axial tilt',
            'Solstices and equinoxes',
            'Insolation depends on Sun altitude and day length',
            'Solar day, mean solar time, time zones',
            'Equation of time; analemma',
            'Leap years and the Gregorian calendar',
          ],
          explanation: `Earth orbits the Sun once a year, so the Sun appears to drift eastward against the background stars along a great circle called the **ecliptic**. Because Earth's rotation axis is tilted by 23.4 degrees (the **obliquity**) with respect to the orbital axis, the ecliptic is tilted by the same angle to the celestial equator. The Sun crosses the equator at the **equinoxes** (around 20 March and 22 September) and reaches its extreme declinations of +23.4 and -23.4 degrees at the **solstices**.

That tilt is the entire cause of the seasons. In northern summer the Sun stands higher at noon and stays above the horizon longer; the same sunlight is spread over less ground (insolation scales with $\\sin$ of the Sun's altitude) and acts for more hours. Earth is actually *closest* to the Sun in early January; the 3 percent change in distance alters sunlight by 7 percent, far less than the factor of two or three that tilt produces at mid-latitudes. Noon altitude is easy to compute: $h_{\\rm noon} = 90^\\circ - |\\phi - \\delta_\\odot|$ where $\\phi$ is latitude and $\\delta_\\odot$ the Sun's declination. At latitude 50 N on the summer solstice that gives 63.4 degrees; on the winter solstice, 16.6 degrees.

Timekeeping grows out of these motions. A sundial reads *apparent solar time*; because Earth's orbit is elliptical and the ecliptic is tilted, apparent noon wanders by up to 16 minutes from clock noon through the year (the **equation of time**, visible as the figure-eight **analemma** if you photograph the Sun at the same clock time every week). Civil clocks use **mean solar time** stepped into zones. The calendar must track the 365.2422-day tropical year, hence Gregorian leap-year rules.

Read OpenStax 4.2 and 4.3. Then use Stellarium to measure the Sun's noon altitude on the four key dates for your latitude and compare with the formula.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 4.2 The Seasons',
              url: 'https://openstax.org/books/astronomy-2e/pages/4-2-the-seasons',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 4.3 Keeping Time',
              url: 'https://openstax.org/books/astronomy-2e/pages/4-3-keeping-time',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Solar vs sidereal time, time zones, the calendar.',
            },
            {
              title: 'US Naval Observatory Astronomical Applications',
              url: 'https://aa.usno.navy.mil/',
              type: 'tool',
              cost: 'free',
              provider: 'US Naval Observatory',
              note: 'Authoritative sunrise/sunset, Sun altitude and equation-of-time calculators for any location and date.',
            },
            {
              title: 'Stellarium',
              url: 'https://stellarium.org/',
              type: 'tool',
              cost: 'free',
              provider: 'Stellarium',
            },
          ],
          exercises: [
            {
              slug: 'noon-altitude-table',
              title: 'Noon Sun altitude through the year',
              prompt:
                'For your latitude, compute the noon altitude of the Sun on the 21st of every month using the formula in the lesson and the Sun\'s declination (approximate it as 23.4 sin of the angle since the March equinox, or read it from Stellarium). Tabulate your values beside Stellarium\'s and plot both. Explain the largest discrepancy.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'insolation-ratio',
              title: 'Summer vs winter insolation',
              prompt:
                'Estimate the ratio of daily solar energy received per square metre at your latitude on the summer solstice to that on the winter solstice. Account for both the noon altitude (use sin of altitude as the instantaneous factor, integrating roughly over the day) and the day length (get sunrise/sunset from the USNO calculator). Compare with the 7 percent effect of Earth\'s changing distance from the Sun.',
              kind: 'problem',
              difficulty: 2,
              hint: 'A crude integration with hourly steps is fine; the point is the order of magnitude.',
            },
            {
              slug: 'analemma-photo',
              title: 'Build an analemma from data',
              prompt:
                'Use the USNO site (or Stellarium) to record the Sun\'s altitude and azimuth at exactly 12:00 clock time on the 1st and 15th of each month. Plot azimuth against altitude. Identify the two causes of the figure-eight shape (eccentricity of the orbit, tilt of the ecliptic) and explain which one produces the asymmetry between the two lobes.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give two independent observational facts that rule out distance as the cause of the seasons.',
              answerOutline:
                'The hemispheres have opposite seasons at the same time; Earth is nearest the Sun in January (northern winter). Tilt explains both via Sun altitude and day length.',
            },
            {
              question: 'What is the Sun\'s noon altitude at the equator on an equinox, and at latitude 23.4 N on the June solstice?',
              answerOutline:
                '90 degrees in both cases (the Sun is at the zenith): declination equals latitude.',
            },
            {
              question: 'Why is a sundial up to a quarter of an hour wrong compared with a clock?',
              answerOutline:
                'The equation of time: Earth\'s elliptical orbit changes the Sun\'s eastward drift rate, and the ecliptic\'s tilt projects that drift unevenly onto the equator; both shift apparent noon relative to mean noon.',
            },
          ],
        },
        {
          slug: 'the-moon-phases-and-eclipses',
          title: 'The Moon: phases, motion and eclipses',
          summary:
            'Why the Moon shows phases, why eclipses do not happen every month, and how eclipse geometry lets you measure the size and distance of the Moon.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the phases of the Moon from Sun-Earth-Moon geometry and predict when each phase rises and sets',
            'Distinguish the sidereal and synodic months and compute one from the other',
            'Explain why solar and lunar eclipses require the Moon to be near a node and why eclipse seasons recur',
            'Use the angular size of the Moon and the Earth\'s shadow to estimate the Moon\'s distance as Aristarchus did',
          ],
          concepts: [
            'Phases from illumination geometry, not Earth\'s shadow',
            'Synodic month (29.53 d) vs sidereal month (27.32 d)',
            'Synchronous rotation and libration',
            'Orbital inclination (5.1 deg) and the nodes',
            'Solar eclipses: umbra, penumbra, totality and annularity',
            'Lunar eclipses and the Earth\'s shadow',
            'Angular size: 0.5 degrees; small-angle formula',
          ],
          explanation: `Half of the Moon is always lit by the Sun. The **phase** you see is simply how much of that lit half faces Earth, which depends on the angle between the Sun and Moon as seen from Earth: 0 degrees is new, 90 degrees first quarter, 180 degrees full. A common misconception is that phases are Earth's shadow; the shadow is involved only in lunar eclipses. Phase also fixes the Moon's rising time: the full Moon is opposite the Sun and rises at sunset, the first-quarter Moon is 90 degrees east of the Sun and crosses the meridian at sunset.

The Moon circles the sky in a **sidereal month** of 27.32 days, but because Earth has meanwhile moved along its orbit the Moon needs another two days to return to the same phase: the **synodic month** is 29.53 days. The relation is $1/P_{\\rm syn} = 1/P_{\\rm sid} - 1/P_{\\rm year}$, a formula you will meet again for planets. The Moon rotates once per orbit (**synchronous rotation**, the result of tidal locking), so we always see roughly the same face; small nods called **libration** let us see 59 percent over time.

Eclipses need the Moon to be new (solar) or full (lunar) *and* near one of the two **nodes** where its orbit, inclined 5.1 degrees, crosses the ecliptic. The line of nodes regresses around the sky every 18.6 years, giving two **eclipse seasons** per year. The Moon's and Sun's angular sizes are both about 0.5 degrees, which is why a total solar eclipse is possible at all, and why when the Moon is near apogee the eclipse is **annular**.

The small-angle formula $\\theta = D/d$ (radians) turns angular size into a ratio of true size to distance. Aristarchus noticed during lunar eclipses that Earth's shadow is about 2.7 Moon diameters wide, and from that plus the angular size inferred the Moon's distance in Earth radii, a result you will reproduce in the exercises. Read OpenStax 4.5 and 4.7, keep a phase log, and photograph a lunar eclipse if one is coming.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 4.5 Phases and Motions of the Moon',
              url: 'https://openstax.org/books/astronomy-2e/pages/4-5-phases-and-motions-of-the-moon',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 4.7 Eclipses of the Sun and Moon',
              url: 'https://openstax.org/books/astronomy-2e/pages/4-7-eclipses-of-the-sun-and-moon',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'In-The-Sky.org — Moon phase and eclipse calendars',
              url: 'https://in-the-sky.org/',
              type: 'tool',
              cost: 'free',
              provider: 'In-The-Sky.org',
              note: 'Use for upcoming phases, eclipse visibility maps and moonrise times at your location.',
            },
            {
              title: 'NASA Moon fact sheet (NSSDCA)',
              url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Perigee/apogee distances, orbital period and inclination used in the exercises.',
            },
          ],
          exercises: [
            {
              slug: 'moon-log',
              title: 'Two-week Moon log',
              prompt:
                'For 14 consecutive days, record the date, time, the Moon\'s phase (sketch it), its approximate altitude and azimuth, and its angular separation from the Sun (estimate with an outstretched hand: a fist is about 10 degrees). Plot illuminated fraction against days since new Moon and compare with the prediction (1 - cos of elongation)/2.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'aristarchus-distance',
              title: 'The Moon\'s distance from an eclipse',
              prompt:
                'Earth\'s umbral shadow at the Moon\'s distance is about 2.7 lunar diameters wide, and the Moon\'s angular diameter is 0.52 degrees. Following Aristarchus (and ignoring the shadow\'s taper at first), derive the Moon\'s diameter in Earth radii and its distance in Earth radii. Then include the taper: the shadow narrows by one solar angular diameter per unit distance. Compare your answer with the modern mean distance of 60.3 Earth radii.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'With taper, Moon diameter + shadow diameter = Earth diameter minus the taper over one Moon-distance; set up the geometry in angular units.',
            },
            {
              slug: 'eclipse-season-prediction',
              title: 'Why eclipses cluster',
              prompt:
                'Using the synodic month (29.53 d) and the eclipse year (346.6 d, the time for the Sun to return to the same node), show that 223 synodic months is almost exactly 19 eclipse years. This is the saros. Look up two eclipses one saros (18 y 11 d) apart on In-The-Sky.org and compare their geometry. Why does the later one occur about 120 degrees of longitude further west?',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'At roughly what time does a third-quarter Moon rise, and why?',
              answerOutline:
                'Around midnight: it is 90 degrees west of the Sun, so it rises six hours after the Sun sets (and is highest at sunrise).',
            },
            {
              question: 'Why is there not a solar eclipse at every new Moon?',
              answerOutline:
                'The Moon\'s orbit is tilted 5.1 degrees to the ecliptic; it usually passes above or below the Sun. Eclipses require new Moon near a node.',
            },
            {
              question: 'Why can some solar eclipses be annular?',
              answerOutline:
                'The Moon\'s orbit is elliptical; near apogee its angular diameter is smaller than the Sun\'s, leaving a ring of photosphere visible.',
            },
          ],
        },
        {
          slug: 'planets-kepler-and-newton',
          title: 'Wandering stars: from Ptolemy to Kepler and Newton',
          summary:
            'Retrograde motion, the Copernican revolution, Kepler\'s three laws and how Newton\'s gravity explains them and lets us weigh the Sun.',
          estimatedMinutes: 120,
          objectives: [
            'Explain retrograde motion in both the geocentric and heliocentric pictures and say why the heliocentric one is simpler',
            'State Kepler\'s three laws and apply the third law to compute periods and distances within the solar system',
            'Explain how Newton\'s law of gravitation reproduces Kepler\'s laws and generalises the third law to any orbiting pair',
            'Compute the mass of the Sun (or a planet) from an orbital period and semi-major axis',
          ],
          concepts: [
            'Retrograde motion and epicycles',
            'Copernican heliocentrism; Galileo\'s telescopic evidence',
            'Kepler\'s first law: ellipses with the Sun at a focus',
            'Kepler\'s second law: equal areas in equal times',
            'Kepler\'s third law: $P^2 = a^3$ in years and AU',
            'Newton\'s law of gravitation $F = GMm/r^2$',
            'Newton\'s form of the third law and weighing bodies',
            'Escape velocity and orbital velocity',
          ],
          explanation: `Five "stars" wander. Most of the time they drift eastward against the constellations, but every so often each one slows, reverses for weeks (**retrograde motion**) and then resumes. Ptolemy modelled this with circles riding on circles (epicycles) around a stationary Earth. Copernicus showed that if the Sun is at the centre, retrograde motion is just Earth overtaking an outer planet (or being overtaken by an inner one): no epicycle needed, and the ordering and relative spacing of the planets follow naturally. Galileo's telescope supplied the evidence: Venus shows a full set of phases, impossible in Ptolemy's arrangement, and Jupiter has moons that orbit something other than Earth.

Kepler, using Tycho Brahe's precise positions, replaced circles with his three laws. **First**: each orbit is an ellipse with the Sun at one focus. **Second**: the line from Sun to planet sweeps equal areas in equal times, so planets move fastest at perihelion. **Third**: $P^2 = a^3$ when $P$ is in years and $a$ in astronomical units. The third law is a tool you will use constantly; Mars at 1.52 AU must have a period of $1.52^{3/2} = 1.88$ years.

Newton explained why. With $F = GMm/r^2$ and his laws of motion, elliptical orbits and equal areas follow, and the third law becomes
$$P^2 = \\frac{4\\pi^2}{G(M+m)}\\,a^3 .$$
This generalised form is the single most important equation in this subject: it lets you *weigh* anything that has something orbiting it. Jupiter's mass comes from Io's period and distance, the Sun's from Earth's, and the mass of the Milky Way's central black hole from stars whizzing around it.

Two related speeds appear everywhere: circular orbital speed $v = \\sqrt{GM/r}$ and escape speed $v_{\\rm esc} = \\sqrt{2GM/r}$. Read OpenStax 3.1, 3.3 and 3.4, watch Yale ASTR 160 lecture 2, and do every calculation in the exercises by hand before checking in Python. Orbital mechanics is treated in full in the planetary-science subject; here the goal is fluency with the third law.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 3.1 The Laws of Planetary Motion',
              url: 'https://openstax.org/books/astronomy-2e/pages/3-1-the-laws-of-planetary-motion',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 3.3 Newton\'s Universal Law of Gravitation',
              url: 'https://openstax.org/books/astronomy-2e/pages/3-3-newtons-universal-law-of-gravitation',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Also read 3.4 Orbits in the Solar System for escape velocity and orbits.',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 2: Planetary Orbits',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-2',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              note: 'Bailyn derives the third law with Newton and does worked numerical examples.',
            },
            {
              title: 'PhET — Kepler\'s Laws simulation',
              url: 'https://phet.colorado.edu/en/simulations/keplers-laws',
              type: 'interactive',
              cost: 'free',
              provider: 'PhET (University of Colorado)',
              note: 'Watch the area-sweeping law and the period-distance relation interactively.',
            },
            {
              title: 'NASA Planetary Fact Sheet',
              url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Semi-major axes and periods for the Kepler third-law check.',
            },
          ],
          exercises: [
            {
              slug: 'third-law-check',
              title: 'Check Kepler\'s third law with real data',
              prompt:
                'From the NASA Planetary Fact Sheet take the semi-major axis a (AU) and orbital period P (years) for all eight planets plus Pluto and Ceres. In Python (or a spreadsheet) plot log P against log a and fit a straight line. Report the slope and intercept with their uncertainties and compare with the expected slope of 1.5 and intercept of 0. Which body deviates most, and is that deviation physically meaningful?',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'weigh-the-sun-and-jupiter',
              title: 'Weigh the Sun and Jupiter',
              prompt:
                'Use Newton\'s form of the third law with Earth\'s orbit (a = 1.496e11 m, P = 365.25 d) to compute the Sun\'s mass. Then use Io (a = 421,700 km, P = 1.769 d) to compute Jupiter\'s mass. Give both in kilograms and as a ratio. Finally compute the ratio of Jupiter\'s mass to the Sun\'s and explain why the (M + m) in the formula can be approximated as M in both cases.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'retrograde-simulation',
              title: 'Simulate retrograde motion',
              prompt:
                'Write a short Python script that places Earth on a circle of radius 1 AU and Mars on a circle of radius 1.52 AU, with periods from Kepler\'s third law, and computes the direction from Earth to Mars every 5 days for 800 days. Plot the ecliptic longitude of Mars as seen from Earth against time and identify the retrograde loops. Measure the interval between retrogrades and compare with the synodic period 1/(1/1 - 1/1.88) years.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'escape-velocities',
              title: 'Escape velocities across the solar system',
              prompt:
                'Compute the escape velocity from the surface of the Moon, Earth, Jupiter and the Sun using masses and radii from the fact sheet. Explain, in one paragraph, why the Moon has no atmosphere and Jupiter has kept hydrogen, using the typical thermal speed of a gas molecule (about 1 km/s for hydrogen at 300 K) as the comparison.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What single observation by Galileo was impossible in Ptolemy\'s system, and why?',
              answerOutline:
                'The full set of Venus phases including gibbous and full; in Ptolemy\'s model Venus stays between Earth and Sun and could only show crescents.',
            },
            {
              question: 'An asteroid has a semi-major axis of 4 AU. What is its period?',
              answerOutline:
                'P = 4^1.5 = 8 years.',
            },
            {
              question: 'How does Newton\'s version of Kepler\'s third law let you measure the mass of a planet?',
              answerOutline:
                'Measure the period and semi-major axis of a moon; M = 4 pi^2 a^3 / (G P^2) (neglecting the moon\'s mass).',
            },
            {
              question: 'Where in its orbit does a comet move fastest, and which law says so?',
              answerOutline:
                'At perihelion; Kepler\'s second law (equal areas) or equivalently conservation of angular momentum.',
            },
          ],
          relatedLessons: [
            'planetary-science-exoplanets/orbits-and-celestial-mechanics/keplers-laws-and-the-two-body-problem',
            'classical-mechanics/oscillations-and-gravitation/newtonian-gravitation',
          ],
        },
      ],
      project: {
        slug: 'sky-almanac',
        title: 'Project: a personal sky almanac',
        description: `Produce a one-page almanac for your location for the coming month: sunrise/sunset and day length for each week, Moon phases with rise times, which planets are visible and when, the altitude of the celestial pole, and a list of five circumpolar and five seasonal constellations. Every entry must be either computed by you (with the formula shown) or taken from a tool and then spot-checked against your own calculation.`,
        deliverables: [
          'A one-page almanac (PDF or Markdown) with sources for every number',
          'A short appendix showing at least three hand calculations that agree with the tools to within stated tolerances',
          'One night of your own observations confirming at least two predictions',
        ],
        estimatedHours: 5,
      },
    },
    {
      slug: 'light-and-telescopes',
      title: 'Light and Telescopes',
      description:
        'Almost everything we know about the universe arrives as light. This module covers what light carries, how matter imprints information on it, and how telescopes collect it.',
      lessons: [
        {
          slug: 'the-nature-of-light',
          title: 'The nature of light and the electromagnetic spectrum',
          summary:
            'Light as waves and photons, the electromagnetic spectrum from radio to gamma rays, and the inverse-square law that governs brightness.',
          estimatedMinutes: 90,
          objectives: [
            'Relate wavelength, frequency and photon energy and convert between them',
            'Name the regions of the electromagnetic spectrum and the kinds of objects or processes that dominate each',
            'Apply the inverse-square law to relate luminosity, distance and apparent brightness',
            'Explain which wavelengths reach the ground and why some telescopes must be in space',
          ],
          concepts: [
            'Electromagnetic wave: $c = \\lambda \\nu$',
            'Photon energy $E = h\\nu$',
            'Spectrum: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma',
            'Inverse-square law $b = L/4\\pi d^2$',
            'Atmospheric windows: optical and radio',
            'Light travel time and lookback',
          ],
          explanation: `Light is an electromagnetic wave: oscillating electric and magnetic fields travelling at $c = 3.00\\times10^{8}$ m/s. Wavelength $\\lambda$ and frequency $\\nu$ are tied by $c = \\lambda\\nu$, so a 500 nm green photon has frequency $6\\times10^{14}$ Hz. Light is also a stream of particles, **photons**, each carrying energy $E = h\\nu$ with $h = 6.63\\times10^{-34}$ J s. Both pictures are needed: waves explain interference and the operation of a spectrograph; photons explain why ultraviolet light ionises atoms while radio waves do not, and why a detector counts discrete events.

The **electromagnetic spectrum** runs over more than twenty orders of magnitude in wavelength, and each band reveals different physics. Radio waves come from cold gas and from electrons spiralling in magnetic fields; infrared from dust and cool stars; visible from stars like the Sun; ultraviolet from hot stars; X-rays from million-degree gas and accretion onto compact objects; gamma rays from nuclear processes. Earth's atmosphere is transparent only in two windows (visible/near-infrared and radio), which is why ultraviolet, X-ray and far-infrared astronomy had to wait for rockets and satellites.

The **inverse-square law** is the workhorse of the whole subject. A source of luminosity $L$ (watts) spreads its light over a sphere of area $4\\pi d^2$, so the flux you receive is
$$b = \\frac{L}{4\\pi d^2}.$$
Double the distance and the brightness drops by four. If you know $L$ (a "standard candle") and measure $b$, you get $d$; if you know $d$ (from parallax) and measure $b$, you get $L$. Almost every distance in astronomy beyond parallax range rests on this equation.

Finally, because light has finite speed, looking far is looking back in time: the Sun as it was 8 minutes ago, Andromeda 2.5 million years ago. Read OpenStax 5.1 and 5.2, then practise conversions until $c = \\lambda\\nu$ and $E = h\\nu$ are reflexes.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 5.2 The Electromagnetic Spectrum',
              url: 'https://openstax.org/books/astronomy-2e/pages/5-2-the-electromagnetic-spectrum',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Read 5.1 The Behavior of Light first (inverse-square law).',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 1.4 Numbers in Astronomy',
              url: 'https://openstax.org/books/astronomy-2e/pages/1-4-numbers-in-astronomy',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Scientific notation, light-years and the scale of things; essential if you are rusty.',
            },
            {
              title: 'NASA Science — the electromagnetic spectrum and NASA missions by wavelength',
              url: 'https://science.nasa.gov/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Browse mission pages (Webb, Chandra, Fermi, Hubble) and note which wavelength each covers and why it is in space.',
            },
          ],
          exercises: [
            {
              slug: 'spectrum-conversions',
              title: 'Wavelength, frequency, energy',
              prompt:
                'For each of the following compute the missing two of wavelength, frequency and photon energy (in eV): a 21 cm hydrogen line photon; an H-alpha photon at 656.3 nm; a 1 keV X-ray; the peak of the cosmic microwave background at 1.06 mm. Then rank the four by energy and name an astronomical source of each.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'inverse-square-sun',
              title: 'Solar luminosity from the solar constant',
              prompt:
                'Earth receives 1361 W per square metre from the Sun (the solar constant). Using the Earth-Sun distance of 1.496e11 m, compute the Sun\'s luminosity. Then compute the flux the Sun delivers at Neptune (30.1 AU) and at the nearest star (4.24 light-years), and the flux Earth receives from a Sun-like star at 10 parsecs. Express each as a fraction of the solar constant.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'atmospheric-windows',
              title: 'Why each observatory is where it is',
              prompt:
                'For five telescopes of your choice (for example: a radio dish, an optical telescope on a mountain, Hubble, Chandra and Webb), write one paragraph each explaining which wavelength range it observes, what physical process produces light in that range, and why its location (ground, mountain, orbit, L2) is necessary. Cite the mission pages you used.',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'If a star is moved three times farther away, by what factor does its apparent brightness change?',
              answerOutline: 'It drops by a factor of 9 (inverse square).',
            },
            {
              question: 'Why does ultraviolet light cause sunburn while far brighter visible light does not?',
              answerOutline:
                'Individual UV photons carry enough energy (E = h nu) to break molecular bonds; visible photons do not, regardless of how many arrive.',
            },
            {
              question: 'Name the two atmospheric windows and give one consequence for observatory design.',
              answerOutline:
                'Optical/near-IR and radio. X-ray, UV and far-IR telescopes must fly in space; infrared observatories go to high dry sites to escape water vapour.',
            },
          ],
        },
        {
          slug: 'blackbody-radiation-and-colour',
          title: 'Thermal radiation: temperature from colour',
          summary:
            'Why hot things glow, Wien\'s law and the Stefan-Boltzmann law, and how a star\'s colour and size fix its luminosity.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the blackbody spectrum and how its shape changes with temperature',
            'Use Wien\'s law to estimate a star\'s surface temperature from its peak wavelength or colour',
            'Use the Stefan-Boltzmann law to relate luminosity, radius and temperature',
            'Explain why a star\'s colour tells you its temperature but not its distance or size',
          ],
          concepts: [
            'Blackbody (thermal) radiation',
            'Wien\'s law: $\\lambda_{\\max} T = 2.898\\times10^{-3}$ m K',
            'Stefan-Boltzmann law: $F = \\sigma T^4$',
            'Luminosity-radius-temperature: $L = 4\\pi R^2 \\sigma T^4$',
            'Colour index as a temperature proxy',
            'Kelvin scale and typical stellar temperatures',
          ],
          explanation: `Any dense object with a temperature radiates a continuous spectrum whose shape depends *only* on temperature: the **blackbody** or thermal spectrum. Two laws capture it. **Wien's law** says the peak wavelength is inversely proportional to temperature,
$$\\lambda_{\\max} = \\frac{2.898\\times10^{-3}\\ \\mathrm{m\\,K}}{T},$$
so the Sun at 5800 K peaks near 500 nm (green-yellow), a 3500 K red dwarf peaks in the near infrared, and a 20,000 K blue star peaks in the ultraviolet. Your own body at 310 K peaks near 9 microns, which is why thermal cameras work. The **Stefan-Boltzmann law** says the power emitted per square metre of surface grows as the fourth power of temperature, $F = \\sigma T^4$ with $\\sigma = 5.67\\times10^{-8}$ W m$^{-2}$ K$^{-4}$. Multiply by the surface area of a sphere and you have the luminosity of a star:
$$L = 4\\pi R^2 \\sigma T^4 .$$

This equation does enormous work. Measure a star's temperature from its colour and its luminosity from its brightness and distance, and you can solve for its radius. That is how we know some red stars are giants hundreds of times the Sun's radius: they are cool (low $T$) yet luminous, so $R$ must be huge. Conversely white dwarfs are hot but faint, hence tiny.

Pitfalls: real stars are not perfect blackbodies (absorption lines carve out the spectrum, and hot stars have a Balmer jump), so astronomers use a **colour index** such as $B - V$, the difference of magnitudes through blue and visual filters, as a calibrated temperature proxy. And remember colour tells you temperature only; a faint red point could be a nearby dwarf or a distant giant.

Read OpenStax 5.2 (the thermal radiation section) and the first part of 17.2 (colours of stars). This topic is treated more deeply in the stellar-astrophysics subject; here the goal is to be able to use the two laws confidently.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 5.2 The Electromagnetic Spectrum (Radiation and Temperature)',
              url: 'https://openstax.org/books/astronomy-2e/pages/5-2-the-electromagnetic-spectrum',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'The "Radiation and Temperature" subsection: Wien and Stefan-Boltzmann with worked examples.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 17.1 The Brightness of Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/17-1-the-brightness-of-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 17.2 Colors of Stars for colour index.',
            },
            {
              title: 'MIT OCW 8.282J — problem sets',
              url: 'https://ocw.mit.edu/courses/8-282j-introduction-to-astronomy-spring-2006/pages/assignments/',
              type: 'problem-set',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'The early problem sets contain blackbody and luminosity problems with solutions.',
            },
          ],
          exercises: [
            {
              slug: 'star-radii-from-l-and-t',
              title: 'Radii of famous stars',
              prompt:
                'Using L = 4 pi R^2 sigma T^4, compute the radii (in solar radii) of: Sirius A (L = 25 Lsun, T = 9940 K), Betelgeuse (L = 100,000 Lsun, T = 3500 K), Proxima Centauri (L = 0.0017 Lsun, T = 3050 K), and Sirius B (L = 0.056 Lsun, T = 25,000 K). Take Tsun = 5772 K. Which is larger than the orbit of Mars? Which is smaller than Earth?',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'plot-planck-curves',
              title: 'Plot blackbody curves in Python',
              prompt:
                'Write a Python function for the Planck spectrum B(lambda, T) and plot it for T = 3000, 6000 and 10,000 K on log axes from 100 nm to 10 microns. Mark the visible band. Numerically find the peak of each curve and verify Wien\'s law; numerically integrate each curve (times pi) and verify the Stefan-Boltzmann law to within 1 percent.',
              kind: 'coding',
              difficulty: 2,
              hint: 'B(lambda,T) = (2hc^2/lambda^5) / (exp(hc/(lambda k T)) - 1). Use numpy and scipy.integrate.',
            },
            {
              slug: 'temperature-from-colour',
              title: 'Temperatures from Gaia colours',
              prompt:
                'In the Gaia archive, run an ADQL query returning bp_rp colour and teff_gspphot for 2000 bright stars with parallax over 10 mas. Plot temperature against colour. Describe the relation, explain qualitatively why it is monotonic, and fit a simple polynomial so you could estimate a temperature from a colour alone. (The Gaia archive is introduced properly in the observational-astronomy subject; the archive\'s help pages have a worked example query you can adapt.)',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'A star has twice the Sun\'s surface temperature and the same radius. How does its luminosity compare?',
              answerOutline: '16 times the Sun\'s (T^4).',
            },
            {
              question: 'Where does the spectrum of a 10,000 K star peak, and what colour does it look?',
              answerOutline:
                'About 290 nm, in the ultraviolet; to the eye it looks blue-white because the visible part of the curve is brightest at the blue end.',
            },
            {
              question: 'Why must a cool star that is very luminous be very large?',
              answerOutline:
                'L = 4 pi R^2 sigma T^4; low T means little power per unit area, so a large L requires a huge surface area.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/radiation-and-spectra/blackbody-radiation'],
        },
        {
          slug: 'spectra-and-the-doppler-effect',
          title: 'Spectral lines and the Doppler effect',
          summary:
            'How atoms imprint fingerprints on light, Kirchhoff\'s three kinds of spectra, and how a shift in those lines measures motion.',
          estimatedMinutes: 100,
          objectives: [
            'Explain the origin of emission and absorption lines in terms of atomic energy levels',
            'State Kirchhoff\'s rules and identify which kind of spectrum a given source produces',
            'Compute a radial velocity from a measured line shift with the Doppler formula',
            'Describe what a spectrum reveals about composition, temperature, motion and more',
          ],
          concepts: [
            'Energy levels and photon absorption/emission',
            'Continuous, emission-line and absorption-line spectra (Kirchhoff)',
            'Hydrogen Balmer series',
            'Doppler shift: $\\Delta\\lambda/\\lambda_0 = v_r/c$',
            'Radial velocity vs proper motion',
            'Line broadening (thermal, rotational) and line strength',
          ],
          explanation: `Pass sunlight through a prism and you see the rainbow crossed by hundreds of dark lines. Those lines are the key to almost everything in astrophysics. An atom can hold its electrons only in discrete **energy levels**; it absorbs or emits a photon only when the photon's energy exactly matches the gap between two levels. Each element therefore has a unique set of wavelengths, a fingerprint. Hydrogen's visible lines (the **Balmer series**: H-alpha at 656.3 nm, H-beta at 486.1 nm, ...) all involve the second level.

**Kirchhoff's rules** summarise what you see. A hot dense body gives a *continuous* spectrum. A hot thin gas gives bright *emission lines*. A continuous source seen through a cooler thin gas gives *absorption lines* where the gas removes photons at its own wavelengths. A star is case three: the hot photosphere shines through a cooler, thinner outer layer. An emission nebula is case two. Which lines appear, and how strong they are, depends on temperature as much as composition (hydrogen lines are weak in the hottest and the coolest stars for reasons you will learn in stellar astrophysics).

Lines also move. If a source approaches, its waves are compressed and every line shifts to shorter wavelength (a **blueshift**); if it recedes, to longer (**redshift**). For speeds well below $c$,
$$\\frac{\\Delta\\lambda}{\\lambda_0} = \\frac{v_r}{c},$$
where $v_r$ is the **radial velocity**, the component along the line of sight. Only that component shifts lines; motion across the sky (proper motion) needs years of position measurements instead. With Doppler shifts astronomers measure stellar orbits, galaxy rotation, the expansion of the universe and the wobble of a star tugged by an unseen planet.

Line *shapes* carry more information: thermal motion and rotation broaden lines, pressure broadens them in compact stars, and strong magnetic fields split them. Read OpenStax 5.3, 5.4 and 5.6 and then do the SDSS exercise, where you will measure a real redshift from a real spectrum.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 5.3 Spectroscopy in Astronomy',
              url: 'https://openstax.org/books/astronomy-2e/pages/5-3-spectroscopy-in-astronomy',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 5.4 The Structure of the Atom',
              url: 'https://openstax.org/books/astronomy-2e/pages/5-4-the-structure-of-the-atom',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Energy levels and the Bohr picture; then 5.5 Formation of Spectral Lines.',
            },
            {
              title: 'OpenStax Astronomy 2e — 5.6 The Doppler Effect',
              url: 'https://openstax.org/books/astronomy-2e/pages/5-6-the-doppler-effect',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'SDSS SkyServer DR18 — Explore tool (view any SDSS spectrum)',
              url: 'https://skyserver.sdss.org/dr18/VisualTools',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'Navigate to any galaxy or star with a spectrum and inspect its labelled lines.',
            },
          ],
          exercises: [
            {
              slug: 'balmer-wavelengths',
              title: 'Compute the Balmer series',
              prompt:
                'Hydrogen energy levels are E_n = -13.6 eV / n^2. Compute the wavelengths of the first four Balmer lines (transitions from n = 3, 4, 5, 6 to n = 2) and the series limit. Compare with the measured values 656.3, 486.1, 434.0 and 410.2 nm. Then compute the wavelength of the Lyman-alpha line (n = 2 to 1) and explain why it can only be observed from space.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'measure-a-redshift',
              title: 'Measure a galaxy redshift from an SDSS spectrum',
              prompt:
                'In SkyServer\'s Navigate tool, find a galaxy with a spectrum (for example near RA 185.0, Dec 15.0, or any object marked with a red square). Open its spectrum, read off the observed wavelength of H-alpha (or the strong [O III] 500.7 nm line) by zooming in, and compute z = (lambda_obs - lambda_0)/lambda_0 and the recession velocity. Compare with the pipeline redshift shown on the page. Repeat for two more galaxies at different redshifts.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'kirchhoff-classification',
              title: 'Classify spectra',
              prompt:
                'For each source, state which kind of spectrum (continuous, emission, absorption) you expect and why: a tungsten lamp; a neon sign; the Sun; the Orion Nebula; a quasar; a sunspot viewed against the photosphere; the Moon. Then explain what you would see if you observed the Sun\'s edge during a total eclipse (the flash spectrum).',
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'A line normally at 500.0 nm is observed at 500.5 nm. What is the radial velocity?',
              answerOutline: 'v = c (0.5/500) = +300 km/s, receding.',
            },
            {
              question: 'Why does a star show absorption lines rather than emission lines?',
              answerOutline:
                'The hot dense photosphere emits a continuum; the overlying cooler, thinner gas absorbs at its characteristic wavelengths (Kirchhoff\'s third rule).',
            },
            {
              question: 'Can the Doppler effect detect a star moving exactly across your line of sight?',
              answerOutline:
                'No (to first order). Only the radial component shifts lines; transverse motion is measured as proper motion over time.',
            },
          ],
        },
        {
          slug: 'telescopes-and-detectors',
          title: 'Telescopes and detectors',
          summary:
            'What a telescope is for (collecting area, resolution), refractors vs reflectors, the role of the atmosphere, and modern detectors and observatories.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why aperture, not magnification, is the primary figure of merit for a telescope',
            'Compute the diffraction-limited resolution of a telescope and compare it with atmospheric seeing',
            'Describe the main telescope designs and the reasons modern large telescopes are reflectors',
            'Describe how CCDs record images and why interferometry and adaptive optics matter',
          ],
          concepts: [
            'Light-gathering power scales with $D^2$',
            'Angular resolution: $\\theta \\approx 1.22\\,\\lambda/D$',
            'Refractors, reflectors, focal length and plate scale',
            'Seeing and adaptive optics',
            'CCD detectors: pixels, quantum efficiency',
            'Radio telescopes and interferometry',
            'Space observatories (Hubble, Webb, Chandra)',
          ],
          explanation: `A telescope does two things: it collects light and it resolves detail. Neither is magnification. **Light-gathering power** is proportional to the area of the aperture, so a 10 m mirror collects 25 times as much light as a 2 m mirror and sees objects 25 times fainter in the same exposure. Your dark-adapted pupil is about 7 mm; a modest 200 mm telescope gathers 800 times more light.

**Angular resolution**, the smallest detail you can separate, is limited by diffraction to about
$$\\theta \\approx 1.22\\,\\frac{\\lambda}{D}$$
radians (multiply by 206,265 for arcseconds). For visible light and a 2.4 m mirror (Hubble) that is 0.05 arcseconds. On the ground, turbulence in the atmosphere (**seeing**) smears images to about 1 arcsecond regardless of aperture, so a 10 m ground telescope has no better raw resolution than a 12 cm one. **Adaptive optics** corrects the turbulence hundreds of times per second with a deformable mirror and a reference star (natural or laser), recovering the diffraction limit in the infrared. Radio astronomers, whose wavelengths are 10,000 times longer, combine dishes separated by kilometres or continents (**interferometry**) so that $D$ becomes the baseline.

Early telescopes were **refractors** (a lens), but lenses sag, absorb light and suffer chromatic aberration, so every large modern telescope is a **reflector** with a mirror that can be supported from behind and made in segments. The focal length sets the **plate scale**, how many arcseconds fall on each millimetre (or pixel) of the detector.

Modern detectors are **CCDs** and CMOS sensors: arrays of millions of pixels that count photons with quantum efficiency near 90 percent, versus about 1 percent for photographic plates. They are linear, so brightness can be measured accurately, which is why most of observational astronomy is now data analysis. Read OpenStax 6.1 to 6.3 and the Las Cumbres Observatory telescope chapter, then compute the numbers in the exercises for a telescope you could actually use.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 6.1 Telescopes',
              url: 'https://openstax.org/books/astronomy-2e/pages/6-1-telescopes',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 6.2 Telescopes Today',
              url: 'https://openstax.org/books/astronomy-2e/pages/6-2-telescopes-today',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 6.3 Visible-Light Detectors and Instruments for CCDs and spectrographs.',
            },
            {
              title: 'Las Cumbres Observatory SpaceBook — How Telescopes Work',
              url: 'https://lco.global/spacebook/telescopes/',
              type: 'article',
              cost: 'free',
              provider: 'Las Cumbres Observatory',
              note: 'Includes robotic telescope networks and how a modern observation is scheduled.',
            },
            {
              title: 'MIT OCW 12.409 Hands-On Astronomy — lecture notes',
              url: 'https://ocw.mit.edu/courses/12-409-hands-on-astronomy-observing-stars-and-planets-spring-2002/pages/lecture-notes/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Practical handouts on telescope setup, CCD imaging and observing technique.',
            },
          ],
          exercises: [
            {
              slug: 'telescope-numbers',
              title: 'Numbers for three telescopes',
              prompt:
                'For a 70 mm refractor, a 250 mm Dobsonian and the 6.5 m Webb telescope, compute: light-gathering power relative to a 7 mm pupil; diffraction-limited resolution at 550 nm (and at 2 microns for Webb) in arcseconds; and the faintest magnitude reachable relative to the naked-eye limit of 6 (each factor of 100 in light is 5 magnitudes). State which of the three is limited by seeing rather than diffraction under 1 arcsecond skies.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'resolve-a-double-star',
              title: 'Can you resolve it?',
              prompt:
                'Albireo\'s components are 35 arcseconds apart; the components of Epsilon Lyrae\'s pairs are 2.3 and 2.6 arcseconds apart; the Mizar A spectroscopic pair would be about 0.01 arcseconds apart. For each, say whether a 100 mm telescope, a 1 m telescope with adaptive optics, and a radio interferometer with a 1000 km baseline at 1 cm wavelength could resolve it, and show the calculation. If you can, observe Albireo or Epsilon Lyrae and report what you saw.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'plate-scale',
              title: 'Plate scale and field of view',
              prompt:
                'A telescope has focal length 1200 mm and a camera with 3.76 micron pixels in a 6000 x 4000 array. Compute the plate scale in arcseconds per pixel and the field of view in degrees. Would the full Moon fit? Would the Andromeda Galaxy (3 degrees long)? What focal length would you need to sample 1 arcsecond seeing with 2 pixels per arcsecond?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Plate scale (arcsec/mm) = 206265 / focal length (mm).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a telescope\'s aperture more important than its magnification?',
              answerOutline:
                'Aperture sets light-gathering power (D^2) and the diffraction limit (lambda/D); magnification only enlarges the image, including its blur, and can be changed with an eyepiece.',
            },
            {
              question: 'Why does Hubble outperform much larger ground telescopes in the visible without adaptive optics?',
              answerOutline:
                'Above the atmosphere there is no seeing, so Hubble reaches its 0.05 arcsecond diffraction limit while ground telescopes are blurred to about 1 arcsecond.',
            },
            {
              question: 'What problem does interferometry solve for radio astronomy?',
              answerOutline:
                'Long wavelengths make the diffraction limit of a single dish coarse; combining dishes gives the resolution of a telescope the size of the baseline.',
            },
          ],
          relatedLessons: ['observational-astronomy/telescopes-detectors-and-noise/optics-resolution-and-plate-scale'],
        },
      ],
    },
    {
      slug: 'the-solar-system',
      title: 'The Solar System',
      description:
        'A comparative tour of our planetary system: what it contains, how it formed, and why the terrestrial and giant planets are so different.',
      lessons: [
        {
          slug: 'overview-and-formation',
          title: 'Overview of the solar system and how it formed',
          summary:
            'The inventory and architecture of the solar system, the clues it preserves, and the nebular theory that explains them.',
          estimatedMinutes: 90,
          objectives: [
            'List the main components of the solar system and their locations, masses and compositions',
            'Identify the regularities (coplanar, prograde, nearly circular orbits; composition gradient) that any formation theory must explain',
            'Describe the solar nebula theory: collapse, disk formation, condensation, accretion and clearing',
            'Explain the frost line and why it separates rocky from gas-rich planets',
          ],
          concepts: [
            'Terrestrial vs jovian planets',
            'Asteroid belt, Kuiper belt, Oort cloud',
            'Angular momentum and disk formation',
            'Condensation sequence and the frost (snow) line',
            'Planetesimals and accretion',
            'Radiometric age of 4.57 billion years',
            'Comparative planetology',
          ],
          explanation: `The solar system is mostly empty space with a few islands of matter, and 99.8 percent of its mass is the Sun. Inside about 2 AU orbit four small, dense, rocky **terrestrial planets**; beyond 5 AU orbit four **giant planets**, two gas giants rich in hydrogen and helium and two ice giants rich in water, ammonia and methane. In between is the asteroid belt; beyond Neptune the icy Kuiper belt (home of Pluto); and far out, inferred from comet orbits, the spherical Oort cloud.

Look at the pattern and it tells you a story. All the planets orbit in nearly the same plane, in the same direction the Sun rotates, on nearly circular orbits. Most spin the same way. Composition changes smoothly with distance from the Sun. Meteorites, the oldest rocks we can hold, give a **radiometric age** of 4.57 billion years for the oldest solids. These are the facts any theory must explain.

The **solar nebula theory** does. A slowly rotating cloud of gas and dust collapsed under gravity. Conservation of angular momentum spun it faster and flattened it into a disk around the growing proto-Sun, which is why everything orbits in one plane and one direction. As the disk cooled, material **condensed** in a sequence: metals and rock everywhere, but water ice only beyond the **frost line** at a few AU where temperatures fell below about 150 K. Inside the frost line only rock and metal were solid, so the planets that grew there by **accretion** of planetesimals were small and rocky. Outside, abundant ices let cores grow large enough (about 10 Earth masses) to capture hydrogen and helium gas before the Sun's wind cleared the nebula.

What remains in the belts are leftover planetesimals, which is why asteroids and comets are so valuable: they are samples of the original disk. Read OpenStax 7.1, 7.2 and 14.3, then the first MIT 12.400 lecture notes, and build the density table in the exercises. The mechanics of formation are revisited in detail in the planetary-science subject.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 7.1 Overview of Our Planetary System',
              url: 'https://openstax.org/books/astronomy-2e/pages/7-1-overview-of-our-planetary-system',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 14.3 Formation of the Solar System',
              url: 'https://openstax.org/books/astronomy-2e/pages/14-3-formation-of-the-solar-system',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Also 7.2 Composition and Structure of Planets.',
            },
            {
              title: 'MIT OCW 12.400 The Solar System',
              url: 'https://ocw.mit.edu/courses/12-400-the-solar-system-spring-2006/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Binzel\'s course notes and problem sets; the first weeks cover the inventory and formation.',
            },
            {
              title: 'NASA Planetary Fact Sheet',
              url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Masses, radii, densities, distances and rotation periods for the density exercise.',
            },
          ],
          exercises: [
            {
              slug: 'density-table',
              title: 'Compute planetary densities',
              prompt:
                'From the NASA fact sheet take the mass and mean radius of each planet, the Moon, Ceres and Pluto. Compute the mean density in g/cm^3 and plot density against distance from the Sun on a log x-axis. Mark the densities of rock (3), iron (8), water ice (0.9) and the Sun (1.4). Write a paragraph explaining the trend in terms of the condensation sequence, and identify the one body whose density is anomalous for its location.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'angular-momentum-puzzle',
              title: 'The angular momentum problem',
              prompt:
                'Estimate the orbital angular momentum of Jupiter (M v r with v from Kepler) and the spin angular momentum of the Sun (treat it as a uniform sphere, I = 0.4 M R^2, rotating once in 25 days). Show that Jupiter carries far more angular momentum than the Sun despite having 0.1 percent of its mass. Explain why this is a puzzle for the nebular theory and summarise one proposed resolution (magnetic braking or disk viscosity).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'frost-line-estimate',
              title: 'Where was the frost line?',
              prompt:
                'A blackbody in equilibrium with sunlight at distance d has temperature T = 279 K / sqrt(d/AU) (ignoring albedo). Find the distance at which T = 150 K (water ice condenses in a vacuum). Compare with the asteroid belt and Jupiter\'s orbit. Then repeat for the young Sun being 30 percent less luminous than today, and discuss whether the frost line was inside or outside its present location when the planets formed.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Name three regularities of the solar system that the nebular theory explains and say how.',
              answerOutline:
                'Coplanar orbits (flattened disk), same orbital direction (disk rotation), composition gradient (condensation sequence with frost line).',
            },
            {
              question: 'Why are the giant planets rich in hydrogen and helium while the terrestrial planets are not?',
              answerOutline:
                'Beyond the frost line ices let cores grow large enough to gravitationally capture nebular gas; inner cores stayed small and the gas was cleared before they could.',
            },
            {
              question: 'How do we know the solar system is 4.57 billion years old?',
              answerOutline:
                'Radiometric dating of the oldest meteorite inclusions (calcium-aluminium-rich inclusions) using isotope decay with known half-lives.',
            },
          ],
        },
        {
          slug: 'the-terrestrial-planets',
          title: 'Earth, Moon, Venus and Mars: the terrestrial worlds',
          summary:
            'Interiors, surfaces and atmospheres of the rocky planets, and why three similar worlds ended up with such different climates.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the layered interior of a terrestrial planet and the evidence (seismology, density, magnetism) for it',
            'Explain how size controls geological activity through heat loss, and apply it to the Moon, Mars, Venus and Earth',
            'Read a cratered surface: use crater density to rank surface ages',
            'Explain the greenhouse effect and the divergent climates of Venus, Earth and Mars',
          ],
          concepts: [
            'Differentiation: core, mantle, crust',
            'Heat sources: accretion, differentiation, radioactivity',
            'Surface-area-to-volume ratio and cooling time',
            'Plate tectonics, volcanism, impact cratering, erosion',
            'Crater counting as a clock',
            'Greenhouse effect; runaway greenhouse on Venus',
            'Atmospheric loss on small, warm worlds',
          ],
          explanation: `Earth, Venus, Mars and the Moon formed from similar material, so their differences are an experiment in what size and distance do to a rocky world. All were hot enough when young to **differentiate**: dense iron sank to form a core, lighter rock floated as mantle and crust. Earth's seismology shows a liquid outer core (it blocks shear waves) and a solid inner core; Earth's magnetic field comes from the convecting liquid iron. Mars and the Moon have small cores and today no global field; Venus has a core but rotates too slowly, or has too little convection, to make one.

What drives geology is internal heat escaping. Heat content scales with volume ($R^3$) but loss with surface area ($R^2$), so **small bodies cool fast**. The Moon's geology ended about 3 billion years ago; Mars has had only sporadic volcanism in the last billion years; Earth, the largest, still has active plate tectonics and continuous resurfacing. Venus, nearly Earth's size, is also active but apparently without plates; its surface seems to have been resurfaced wholesale about 500 million years ago.

You can read these histories from **craters**. Impacts have rained down at a roughly known, declining rate, so a surface with many craters is old and one with few is young: lunar highlands are saturated, lunar maria have ten times fewer craters, Earth's ocean floor has almost none. Crater counting, calibrated by the ages of Apollo samples, is the main clock for every solid surface in the solar system.

Atmospheres diverged most dramatically. Venus has a 92 bar CO$_2$ atmosphere and a 735 K surface; Earth is temperate; Mars has 0.006 bar and a frozen surface. The **greenhouse effect** (atmosphere transparent to sunlight but opaque to the planet's infrared) is the driver. Earth's oceans lock most of its CO$_2$ in carbonate rock. Venus, closer to the Sun, lost its water to a **runaway greenhouse** and kept its CO$_2$ in the air. Mars, small and far, lost most of its atmosphere to space and froze. Read OpenStax 8.1, 9.3, 10.3, 10.4 and 10.6, then do the crater-count exercise on real images.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 8.1 The Global Perspective (Earth as a Planet)',
              url: 'https://openstax.org/books/astronomy-2e/pages/8-1-the-global-perspective',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 8.3 Earth\'s Atmosphere for the greenhouse effect.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 9.3 Impact Craters',
              url: 'https://openstax.org/books/astronomy-2e/pages/9-3-impact-craters',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Crater formation and crater counting as a dating method.',
            },
            {
              title: 'OpenStax Astronomy 2e — 10.6 Divergent Planetary Evolution',
              url: 'https://openstax.org/books/astronomy-2e/pages/10-6-divergent-planetary-evolution',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Read 10.3 (Venus atmosphere) and 10.4 (Mars geology) first.',
            },
            {
              title: 'NASA Science — Mars',
              url: 'https://science.nasa.gov/mars/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Mission pages and image galleries (rovers, orbiters) for the crater exercise.',
            },
          ],
          exercises: [
            {
              slug: 'crater-counting',
              title: 'Date two surfaces by crater counting',
              prompt:
                'Find two Moon images of equal scale, one of a mare and one of the highlands (NASA image galleries or the Lunar Reconnaissance Orbiter QuickMap). Count craters larger than a chosen diameter in equal areas. Report the ratio of crater densities and, assuming the highlands are 4.4 billion years old and the cratering rate has been roughly constant for the last 3.5 billion years (with a heavy bombardment before), estimate the mare age. Discuss the main sources of error.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'cooling-time-scaling',
              title: 'Why small worlds die young',
              prompt:
                'Show that for a body of radius R the ratio of heat content to heat loss rate scales as R. Using Earth (R = 6371 km) as still geologically active after 4.5 billion years and the Moon (R = 1737 km) as having stopped around 3 billion years ago, predict the geological lifetimes of Mars (3390 km) and Mercury (2440 km). Compare with the evidence: when did each last have widespread volcanism?',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'greenhouse-equilibrium',
              title: 'Equilibrium temperatures with and without greenhouse',
              prompt:
                'Compute the equilibrium temperature T = 279 K (1-A)^(1/4) / sqrt(d/AU) for Venus (A = 0.77, d = 0.72), Earth (A = 0.30, d = 1), and Mars (A = 0.25, d = 1.52). Compare with the observed mean surface temperatures (735 K, 288 K, 210 K) and compute the greenhouse warming of each. Explain why Venus, despite its high albedo, is the hottest.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What evidence shows that Earth\'s outer core is liquid?',
              answerOutline:
                'Seismic S waves (shear) do not pass through it, producing a shadow zone; liquids cannot support shear.',
            },
            {
              question: 'Why does the Moon have far more craters than Earth?',
              answerOutline:
                'The Moon\'s surface is ancient and unrenewed (no plate tectonics, erosion or atmosphere); Earth erases craters continually.',
            },
            {
              question: 'Why did Venus end up with a runaway greenhouse and Earth did not?',
              answerOutline:
                'Closer to the Sun, Venus\'s water evaporated, water vapour added greenhouse warming, oceans never formed to remove CO2 into rock, and ultraviolet light split the water with hydrogen escaping.',
            },
          ],
        },
        {
          slug: 'giant-planets-moons-and-rings',
          title: 'The giant planets, their moons and rings',
          summary:
            'Jupiter, Saturn, Uranus and Neptune inside and out, the extraordinary diversity of their moons, and why rings exist.',
          estimatedMinutes: 90,
          objectives: [
            'Contrast the interiors and atmospheres of the gas giants and ice giants',
            'Explain why the giant planets have strong magnetic fields and internal heat sources',
            'Describe the major moons (Io, Europa, Titan, Enceladus, Triton) and the processes that make them geologically alive',
            'Explain ring formation with the Roche limit and tidal forces',
          ],
          concepts: [
            'Metallic hydrogen and giant-planet interiors',
            'Internal heat: Kelvin-Helmholtz contraction and helium rain',
            'Belts, zones and the Great Red Spot',
            'Tidal heating of Io and Europa',
            'Subsurface oceans',
            'Roche limit and ring stability',
            'Shepherd moons and gaps',
          ],
          explanation: `Jupiter and Saturn are mostly hydrogen and helium; Uranus and Neptune are mostly "ices" (water, ammonia, methane) beneath thinner hydrogen envelopes. None has a surface. Pressure rises with depth until, inside Jupiter and Saturn, hydrogen becomes a liquid metal; convection in that conducting fluid generates magnetic fields far stronger than Earth's. Jupiter, Saturn and Neptune all radiate about twice the energy they receive from the Sun: Jupiter is still slowly contracting and releasing gravitational energy, Saturn additionally has helium raining out of its envelope. The visible cloud bands (**belts and zones**) are rising and sinking regions of an atmosphere whose storms, like the Great Red Spot, can outlive any earthly weather system because there is no land to disrupt them.

The moons are at least as interesting as the planets. Jupiter's **Io** is the most volcanically active body known, because Jupiter's tides, continually flexed by the orbital resonance with Europa and Ganymede, heat its interior. The same **tidal heating** keeps an ocean liquid beneath Europa's ice shell, which is why Europa is a prime astrobiology target. Saturn's **Titan** has a thick nitrogen atmosphere and lakes of liquid methane; **Enceladus** sprays water from its south pole, revealing a subsurface ocean. Neptune's **Triton** orbits backwards, so it must be a captured Kuiper belt object.

**Rings** are not solid: they are countless particles, each on its own orbit, lying within the **Roche limit** (about 2.4 planetary radii for a fluid body), inside which tidal forces exceed the self-gravity that would let the particles coalesce into a moon. Small **shepherd moons** confine ring edges, and resonances with larger moons carve gaps such as Saturn's Cassini division. Saturn's rings are mostly ice and may be geologically young.

Read OpenStax 11.1 to 11.3 and 12.1, browse the Juno and Cassini mission pages for images, and then use the real satellite elements in the exercises to apply Kepler's law and the Roche criterion yourself.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 11.2 The Giant Planets',
              url: 'https://openstax.org/books/astronomy-2e/pages/11-2-the-giant-planets',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Also 11.1 Exploring the Outer Planets and 11.3 Atmospheres of the Giant Planets.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 12.1 Ring and Moon Systems Introduced',
              url: 'https://openstax.org/books/astronomy-2e/pages/12-1-ring-and-moon-systems-introduced',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Continue with the sections on the Galilean moons, Titan and Enceladus, and rings.',
            },
            {
              title: 'JPL Solar System Dynamics — Planetary Satellite Mean Orbital Parameters',
              url: 'https://ssd.jpl.nasa.gov/sats/elem/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA JPL',
              note: 'Semi-major axes and periods of every known moon, for the exercises.',
            },
            {
              title: 'NASA Science — Juno mission',
              url: 'https://science.nasa.gov/mission/juno/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Results on Jupiter\'s interior, gravity field and polar cyclones.',
            },
          ],
          exercises: [
            {
              slug: 'galilean-moons-kepler',
              title: 'Weigh Jupiter four times',
              prompt:
                'From the JPL satellite table take a and P for Io, Europa, Ganymede and Callisto. Compute Jupiter\'s mass from each and report the mean and spread. Then verify the Laplace resonance: show that the orbital periods of Io, Europa and Ganymede are in a 1:2:4 ratio to better than 1 percent, and explain in one paragraph why this resonance matters for Io\'s volcanism.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'roche-limit',
              title: 'Rings and the Roche limit',
              prompt:
                'The fluid Roche limit is d = 2.44 R_planet (rho_planet / rho_moon)^(1/3). Compute it for Saturn with an icy moon (rho = 0.9 g/cm^3) and compare with the outer edge of the A ring (137,000 km) and the orbit of Mimas (185,500 km). Repeat for Earth and the Moon. Comment on whether a moon could exist where Saturn\'s main rings are.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'tidal-heating-estimate',
              title: 'Why Io and not Callisto?',
              prompt:
                'Tidal force on a moon scales as M_planet R_moon / a^3. Compute this quantity for Io, Europa, Ganymede and Callisto relative to Io. Combine with the fact that Io\'s orbit is forced to be eccentric (e = 0.004) by the resonance while Callisto\'s is nearly circular, and explain why tidal heating falls off so steeply across the system. Compare with the observed geology of each moon.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Jupiter emit more energy than it receives from the Sun?',
              answerOutline:
                'It is still slowly contracting, converting gravitational potential energy into heat (Kelvin-Helmholtz); Saturn adds helium differentiation.',
            },
            {
              question: 'What keeps Europa\'s ocean liquid so far from the Sun?',
              answerOutline:
                'Tidal heating: Jupiter\'s varying tidal stress, maintained by the resonance with Io and Ganymede, flexes and heats the interior.',
            },
            {
              question: 'Why are rings always found close to their planet?',
              answerOutline:
                'Inside the Roche limit tidal forces prevent particles from accreting into a moon (and can disrupt one); outside it, material would coalesce.',
            },
          ],
        },
        {
          slug: 'small-bodies-and-impacts',
          title: 'Asteroids, comets, meteorites and impacts',
          summary:
            'The debris of the solar system: where asteroids and comets live, what they are made of, what meteorites tell us, and the hazard and history of impacts.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the populations of small bodies (main belt, Trojans, near-Earth objects, Kuiper belt, Oort cloud) and their origins',
            'Explain what happens to a comet as it approaches the Sun and why it has two tails',
            'Explain how meteorites are classified and why they date the solar system',
            'Estimate the energy of an impact and discuss impact frequency and planetary defence',
          ],
          concepts: [
            'Main belt, Kirkwood gaps and resonances',
            'Near-Earth objects and the Torino/Palermo scales',
            'Comet nucleus, coma, ion and dust tails',
            'Short-period vs long-period comets',
            'Meteors, meteoroids, meteorites; chondrites and CAIs',
            'Impact energy $E = \\tfrac{1}{2} m v^2$',
            'Chicxulub and the K-Pg extinction',
          ],
          explanation: `Between Mars and Jupiter orbit millions of **asteroids**, leftover planetesimals that Jupiter's gravity stopped from assembling into a planet. Their total mass is only 4 percent of the Moon's. Resonances with Jupiter clear the **Kirkwood gaps** in the belt and also deliver fragments inward to become **near-Earth objects**. Beyond Neptune the **Kuiper belt** holds icy bodies including Pluto; the **Oort cloud**, a spherical swarm out to 100,000 AU, is inferred from the random orbital orientations of long-period comets.

A **comet** is a few-kilometre nucleus of ice and dust. Near the Sun its ices sublimate, releasing gas and dust into a **coma** tens of thousands of kilometres across. Sunlight pressure pushes the dust into a curved, yellowish **dust tail** while the solar wind sweeps ionised gas into a straight, blue **ion tail** pointing directly away from the Sun, whichever way the comet is moving. Each passage loses material, so short-period comets (Halley, 76 years) are transient visitors that must be resupplied from the Kuiper belt.

**Meteorites** are the pieces that reach the ground. Most are **chondrites**, primitive aggregates containing millimetre droplets (chondrules) and calcium-aluminium-rich inclusions (CAIs), the first solids to condense; radiometric dating of CAIs gives the 4.567-billion-year age of the solar system. Iron meteorites come from the shattered cores of differentiated asteroids, proof that differentiation happened in bodies only a few hundred kilometres across.

Impacts shaped every surface and occasionally rewrote the history of life. The energy is simple kinetic energy, $E = \\tfrac{1}{2} m v^2$, with $v$ typically 20 km/s; a 10 km asteroid delivers about $10^{23}$ J, a hundred million megatons, the Chicxulub impact that ended the Cretaceous. Smaller impacts are more frequent: a Tunguska-size (50 m) airburst roughly every few centuries. Read OpenStax 13.1, 13.2 and 14.1, look up a real near-Earth object in JPL's database, and compute the numbers yourself.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 13.1 Asteroids',
              url: 'https://openstax.org/books/astronomy-2e/pages/13-1-asteroids',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Continue through 13.2 (planetary defense) and the comet sections.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 14.1 Meteors',
              url: 'https://openstax.org/books/astronomy-2e/pages/14-1-meteors',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 14.2 Meteorites: Stones from Heaven.',
            },
            {
              title: 'JPL Small-Body Database Lookup',
              url: 'https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA JPL',
              note: 'Orbital elements, size and close-approach data for any asteroid or comet.',
            },
            {
              title: 'ESA Rosetta mission',
              url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta',
              type: 'article',
              cost: 'free',
              provider: 'ESA',
              note: 'The close-up study of comet 67P: nucleus structure, outgassing and composition.',
            },
          ],
          exercises: [
            {
              slug: 'impact-energy',
              title: 'Impact energies and frequencies',
              prompt:
                'Compute the kinetic energy (joules and megatons of TNT, 1 Mt = 4.2e15 J) of impactors of diameter 20 m, 140 m, 1 km and 10 km, assuming density 3000 kg/m^3 and speed 20 km/s. For each, use the rough rule that impact frequency scales as D^-2 with a 1 km impactor every 500,000 years to estimate the mean interval between impacts. Compare the 20 m case with the 2013 Chelyabinsk event (about 0.5 Mt).',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'neo-lookup',
              title: 'Profile a near-Earth asteroid',
              prompt:
                'Using the JPL Small-Body Database, look up asteroid (99942) Apophis and (101955) Bennu. For each record a, e, i, perihelion and aphelion distance, estimated diameter and the date and distance of the closest approach to Earth this century. Compute each one\'s orbital period from a and check it against the database value. Write a short paragraph on why Bennu was chosen as a sample-return target.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'comet-tails',
              title: 'Comet tail geometry',
              prompt:
                'Sketch a comet\'s orbit around the Sun at six positions and draw the dust and ion tails at each, explaining the direction and curvature of each tail. Then, using Kepler\'s second law, explain why a long-period comet with aphelion at 50,000 AU spends essentially all its time far from the Sun, and estimate what fraction of a 1-million-year orbit it spends inside 5 AU.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a comet\'s ion tail always point away from the Sun, even when the comet is moving outward?',
              answerOutline:
                'The solar wind, flowing radially outward from the Sun, drags the ions with it at hundreds of km/s, far faster than the comet moves.',
            },
            {
              question: 'What are chondrites and why are they important?',
              answerOutline:
                'Primitive, undifferentiated meteorites with chondrules and CAIs; they preserve the composition of the solar nebula and give the solar system\'s age.',
            },
            {
              question: 'Why is a 140 m asteroid the threshold for the congressional NEO survey mandate?',
              answerOutline:
                'Its impact energy (~100 Mt) is enough to devastate a region; such impacts occur every ~10,000-20,000 years, often enough to matter and large enough to be detectable.',
            },
          ],
        },
      ],
      project: {
        slug: 'comparative-planetology-dossier',
        title: 'Project: a comparative planetology dossier',
        description: `Build a single spreadsheet or Python notebook containing, for every planet, five major moons, Ceres and Pluto: mass, radius, density, surface gravity, escape velocity, equilibrium temperature, actual surface or cloud-top temperature, orbital period (observed and from Kepler's third law), and rotation period. Compute every derived quantity yourself from NASA fact-sheet inputs. Then produce three plots (density vs distance, escape velocity vs temperature with the thermal speeds of H2, He, N2 and CO2 overlaid, and crater age vs body size) and write two pages interpreting the patterns.`,
        deliverables: [
          'The notebook or spreadsheet with inputs cited and formulas visible',
          'Three annotated plots',
          'A two-page interpretation that explains which worlds keep which gases, which are geologically alive, and why',
        ],
        estimatedHours: 6,
      },
    },
    {
      slug: 'the-sun-and-stars',
      title: 'The Sun and the Stars',
      description:
        'Our star in detail, then the three measurements (brightness, distance, spectrum) that turn points of light into physical objects, and the diagram that organises them.',
      lessons: [
        {
          slug: 'the-sun',
          title: 'The Sun: structure, energy and activity',
          summary:
            'The layers of the Sun from core to corona, how nuclear fusion powers it, and the magnetic activity cycle you can watch from Earth.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the Sun\'s interior zones and atmosphere (photosphere, chromosphere, corona) and how each is observed',
            'Explain hydrogen fusion via the proton-proton chain and compute the Sun\'s mass-loss rate from its luminosity',
            'Explain how the solar neutrino and helioseismology observations confirm the interior model',
            'Describe sunspots, the 11-year cycle, flares, coronal mass ejections and their effects on Earth',
          ],
          concepts: [
            'Core, radiative zone, convective zone',
            'Photosphere, chromosphere, corona, solar wind',
            'Proton-proton chain; $E = mc^2$',
            'Hydrostatic equilibrium and the thermostat',
            'Solar neutrinos and helioseismology',
            'Sunspots, magnetic field and the 11/22-year cycle',
            'Space weather',
          ],
          explanation: `The Sun is an ordinary star we can study in detail, so it anchors everything we say about the others. It is a ball of plasma held in **hydrostatic equilibrium**: at every depth the outward push of pressure balances the inward pull of gravity. That balance acts as a thermostat; if fusion sped up, the core would expand and cool, slowing it again, which is why stars are stable for billions of years.

Energy comes from the **proton-proton chain** in the core, where at 15 million K four hydrogen nuclei fuse into one helium nucleus, releasing 0.7 percent of their mass as energy via $E = mc^2$. The Sun's luminosity of $3.8\\times10^{26}$ W therefore corresponds to converting about 4 million tonnes of mass to energy every second, and 600 million tonnes of hydrogen to helium. Energy diffuses outward by radiation through the **radiative zone** (a random walk taking about 100,000 years), then by **convection** in the outer 30 percent, whose boiling tops we see as granulation on the **photosphere**, the 5800 K visible surface. Above lie the thin pink **chromosphere** and the million-degree **corona**, visible during eclipses and in X-rays, whose outflow is the **solar wind**.

How do we know the interior? Two ways. **Neutrinos** produced by fusion escape directly; their detection (and the solution of the "solar neutrino problem" through neutrino oscillation) confirmed the core temperature. **Helioseismology** measures sound waves that make the surface oscillate with five-minute periods; their frequencies map the interior's sound speed and rotation, like seismology of Earth.

The Sun's magnetic field, generated by its differential rotation, breaks through the surface as **sunspots** (cooler, so darker) whose number rises and falls on an **11-year cycle** with a 22-year magnetic polarity cycle. Twisted fields release **flares** and **coronal mass ejections** that drive auroras and can damage satellites and power grids. Read OpenStax 15.1, 15.2 and 16.1 onward, then measure the Sun's rotation yourself from SDO images in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 15.1 The Structure and Composition of the Sun',
              url: 'https://openstax.org/books/astronomy-2e/pages/15-1-the-structure-and-composition-of-the-sun',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 15.2 The Solar Cycle',
              url: 'https://openstax.org/books/astronomy-2e/pages/15-2-the-solar-cycle',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 15.3 Solar Activity above the Photosphere and 15.4 Space Weather.',
            },
            {
              title: 'OpenStax Astronomy 2e — 16.1 Sources of Sunshine',
              url: 'https://openstax.org/books/astronomy-2e/pages/16-1-sources-of-sunshine-thermal-and-gravitational-energy',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 16.2 Mass, Energy and the Theory of Relativity, 16.3 The Solar Interior, 16.4 The Solar Interior: Observations.',
            },
            {
              title: 'NASA Solar Dynamics Observatory — data',
              url: 'https://sdo.gsfc.nasa.gov/data/',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA',
              note: 'Daily full-disk images (HMI intensitygrams show sunspots) for the rotation exercise.',
            },
          ],
          exercises: [
            {
              slug: 'solar-mass-loss',
              title: 'How fast is the Sun losing mass?',
              prompt:
                'From the Sun\'s luminosity 3.83e26 W compute the mass converted to energy each second, the mass of hydrogen fused each second (0.7 percent efficiency), and the fraction of the Sun\'s mass that will be converted in a 10-billion-year main-sequence life. If only the inner 10 percent of the Sun\'s mass is hot enough to fuse, show that this gives a lifetime of about 10 billion years.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'sunspot-rotation',
              title: 'Measure the Sun\'s rotation from sunspots',
              prompt:
                'Download SDO/HMI intensitygram images for 7-10 consecutive days when a large sunspot group is visible. Measure the spot\'s position each day (pixel x relative to disk centre and disk radius), convert to heliographic longitude with longitude = arcsin(x/R cos(latitude)), and fit a line to longitude vs time. Report the synodic rotation period, correct it for Earth\'s orbital motion to get the sidereal period, and compare with the known equatorial value of 24.5 days. Repeat for a spot at higher latitude if available and comment on differential rotation.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Sidereal period: 1/P_sid = 1/P_syn + 1/365.25.',
            },
            {
              slug: 'random-walk-photon',
              title: 'The photon random walk',
              prompt:
                'If a photon travels a mean free path of about 1 mm between scatterings in the solar interior, use the random-walk result (distance = step x sqrt(N)) to estimate how many steps and how long it takes to cross the 500,000 km radiative zone. Compare with the 2 seconds light would need in a straight line, and with the 8 minutes it takes to reach Earth.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the Sun not collapse under its own gravity, and why does it not blow apart?',
              answerOutline:
                'Hydrostatic equilibrium: gas pressure (maintained by fusion heating) balances gravity at every layer; negative feedback keeps the balance stable.',
            },
            {
              question: 'Why are sunspots dark?',
              answerOutline:
                'Strong magnetic fields suppress convection, so spots are about 1500 K cooler than the surrounding photosphere and radiate less (T^4).',
            },
            {
              question: 'What two kinds of observation probe the Sun\'s interior directly?',
              answerOutline:
                'Neutrinos (produced by fusion in the core) and helioseismology (surface oscillations that depend on interior sound speed).',
            },
          ],
        },
        {
          slug: 'brightness-distance-and-luminosity',
          title: 'Measuring stars: brightness, parallax and luminosity',
          summary:
            'The magnitude system, parallax as the foundation of all distances, and how apparent and absolute magnitude connect to luminosity.',
          estimatedMinutes: 100,
          objectives: [
            'Use the magnitude scale to convert between magnitude differences and brightness ratios',
            'Compute distances from parallaxes and understand the limits of the method, including Gaia\'s',
            'Relate apparent magnitude, absolute magnitude and distance with the distance modulus',
            'Compute a star\'s luminosity in solar units from its absolute magnitude',
          ],
          concepts: [
            'Apparent magnitude: $m_1 - m_2 = -2.5\\log_{10}(b_1/b_2)$',
            'Parallax: $d(\\mathrm{pc}) = 1/p(\\mathrm{arcsec})$',
            'Parsec and light-year',
            'Absolute magnitude (at 10 pc)',
            'Distance modulus $m - M = 5\\log_{10} d - 5$',
            'Gaia and the precision of modern parallaxes',
            'Parallax error and distance bias',
          ],
          explanation: `Hipparchus ranked naked-eye stars from first magnitude (brightest) to sixth (faintest). Modern astronomy kept the scheme but made it logarithmic: five magnitudes is exactly a factor of 100 in brightness, so
$$m_1 - m_2 = -2.5\\log_{10}\\frac{b_1}{b_2}.$$
Bigger magnitude means fainter; one magnitude is a factor of 2.512. The Sun is $-26.7$, Sirius $-1.4$, the faintest Hubble sources about $+30$. Get comfortable with this: it is the language of every catalogue you will touch.

Apparent brightness alone cannot tell a nearby candle from a distant searchlight; you need a distance. The only direct method is **parallax**: as Earth orbits the Sun, a nearby star shifts against the background by a tiny angle $p$ (half the total yearly shift). Define the **parsec** as the distance at which $p$ is one arcsecond, and
$$d\\,(\\mathrm{pc}) = \\frac{1}{p\\,(\\mathrm{arcsec})}.$$
One parsec is 3.26 light-years; Proxima's parallax is 0.77 arcsec, so it lies at 1.3 pc. Ground-based parallaxes reached only about 100 pc; ESA's **Gaia** mission measures parallaxes to tens of microarcseconds for over a billion stars, giving good distances to several kiloparsecs. Because $d = 1/p$ is nonlinear, a noisy parallax gives a biased distance; beware of inverting parallaxes with large fractional errors.

With a distance in hand, define the **absolute magnitude** $M$ as the apparent magnitude the star would have at 10 pc. The inverse-square law then gives the **distance modulus**
$$m - M = 5\\log_{10} d - 5 \\quad (d\\ \\mathrm{in\\ pc}).$$
Absolute magnitude is luminosity in disguise: $L/L_\\odot = 10^{-0.4(M - 4.83)}$ with $M_\\odot = 4.83$. Read OpenStax 17.1 and 19.2, then run the Gaia query in the exercises and compute real luminosities for real stars.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 17.1 The Brightness of Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/17-1-the-brightness-of-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 19.2 Surveying the Stars (parallax)',
              url: 'https://openstax.org/books/astronomy-2e/pages/19-2-surveying-the-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Read 19.1 Fundamental Units of Distance first.',
            },
            {
              title: 'ESA Gaia Archive',
              url: 'https://gea.esac.esa.int/archive/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA',
              note: 'Use the Search tab with ADQL; the Gaia Users help pages have example queries.',
            },
            {
              title: 'Las Cumbres Observatory SpaceBook — Stellar Parallax',
              url: 'https://lco.global/spacebook/distance/parallax-and-distance-measurement/',
              type: 'article',
              cost: 'free',
              provider: 'Las Cumbres Observatory',
            },
          ],
          exercises: [
            {
              slug: 'magnitude-arithmetic',
              title: 'Magnitude arithmetic',
              prompt:
                'Compute: the brightness ratio between Sirius (m = -1.44) and Polaris (m = 1.98); the apparent magnitude of the Sun seen from Neptune; the apparent magnitude of a 100 W light bulb at 1 km if the Sun (3.8e26 W at 1.5e11 m) has m = -26.7; and how many stars of magnitude 6 it would take to equal one star of magnitude 1.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gaia-nearest-stars',
              title: 'The hundred nearest stars from Gaia',
              prompt:
                'In the Gaia archive run: SELECT TOP 100 source_id, ra, dec, parallax, parallax_error, phot_g_mean_mag, bp_rp FROM gaiadr3.gaia_source WHERE parallax > 100 AND parallax_over_error > 20 ORDER BY parallax DESC. Convert each parallax to distance in parsecs and light-years, compute absolute G magnitude via the distance modulus, and plot absolute magnitude against bp_rp colour. Comment on what kinds of stars dominate the solar neighbourhood and note that the Sun\'s nearest neighbour (Proxima) is present.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'parallax-bias',
              title: 'Why 1/parallax is dangerous',
              prompt:
                'Simulate 10,000 stars all at a true distance of 1 kpc (true parallax 1 mas). Add Gaussian noise with sigma = 0.3 mas to each parallax, compute d = 1/p for each, and plot the histogram of inferred distances. Report the median and mean and the fraction of negative parallaxes. Explain why the naive inversion is biased and what astronomers do instead (reference Bayesian distance estimation).',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A star has parallax 0.025 arcseconds. What is its distance in parsecs and light-years?',
              answerOutline: '40 pc; about 130 light-years.',
            },
            {
              question: 'A star has m = 7 and M = 2. How far away is it?',
              answerOutline: 'm - M = 5 so log d = 2, d = 100 pc.',
            },
            {
              question: 'Why did Gaia revolutionise distance measurement?',
              answerOutline:
                'Microarcsecond-level parallaxes for over a billion stars extended direct distances from ~100 pc to several kpc, recalibrating every rung of the distance ladder.',
            },
          ],
          relatedLessons: ['observational-astronomy/photometry/magnitudes-and-photometric-systems'],
        },
        {
          slug: 'stellar-spectra-and-classification',
          title: 'Stellar spectra: temperature, composition and spectral classes',
          summary:
            'The OBAFGKM sequence, why line strengths depend on temperature rather than abundance, and what spectra reveal about composition, rotation and motion.',
          estimatedMinutes: 90,
          objectives: [
            'Recite the spectral sequence OBAFGKM with temperature ranges and characteristic lines',
            'Explain why hydrogen lines peak at type A rather than in the hottest stars',
            'Describe how stellar compositions are measured and the near-universality of 73 percent hydrogen, 25 percent helium',
            'Explain luminosity classes and how line widths reveal giants versus dwarfs',
          ],
          concepts: [
            'Spectral classes O B A F G K M (and L, T, Y)',
            'Ionisation and excitation vs temperature',
            'Balmer line strength peaks at ~10,000 K',
            'Molecular bands in cool stars',
            'Abundances: hydrogen, helium, "metals"',
            'Luminosity classes I-V and pressure broadening',
            'Annie Jump Cannon and Cecilia Payne',
          ],
          explanation: `Sort stellar spectra by the pattern of their lines and you get the sequence **O B A F G K M**, from blue-white stars above 30,000 K to red stars below 3,500 K, each class subdivided 0-9 (the Sun is G2). Type O spectra show ionised helium; B neutral helium; A the strongest hydrogen Balmer lines; F and G ionised calcium and many metal lines; K and M ever stronger neutral metals and, in M, broad bands of molecules such as titanium oxide. Cooler brown dwarfs extend the sequence to L, T and Y.

The key insight, due to Cecilia Payne in 1925, is that this sequence is one of **temperature, not composition**. Hydrogen lines are weak in O stars not because they lack hydrogen but because at 40,000 K nearly all hydrogen is ionised and cannot absorb. They are weak in M stars because at 3,000 K almost no hydrogen atoms are in the second energy level, from which Balmer absorption starts. Only near 10,000 K is a large fraction of hydrogen both neutral and excited, so A stars have the strongest Balmer lines. Once this is accounted for, almost all stars have the same composition: about 73 percent hydrogen, 25 percent helium and 2 percent everything else, which astronomers loosely call **metals**. Metal content (metallicity) varies by a factor of a hundred between old halo stars and young disk stars and is a clock of galactic chemical evolution.

Spectra also reveal **luminosity class**. Lines in a giant are narrow because its vast, low-density atmosphere has little pressure broadening; a dwarf of the same temperature shows broader lines. Roman numerals I (supergiant) to V (main sequence dwarf) encode this; the Sun is G2 V. Rotation broadens lines further, and binary stars show two sets of lines moving back and forth.

Read OpenStax 17.3 (and 17.2 for colour), then use the SDSS spectra in the exercises to classify real stars yourself.`,
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
              title: 'SDSS SkyServer DR18 — Search Tools',
              url: 'https://skyserver.sdss.org/dr18/SearchTools',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'The Spectroscopic Query form can return stars of a chosen spectral class; the Explore tool shows each spectrum with lines labelled.',
            },
            {
              title: 'SDSS Voyages — guided activities with real SDSS data',
              url: 'https://voyages.sdss.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'SDSS',
              note: 'The "Spectral Types" expeditions walk through classification with the same data.',
            },
          ],
          exercises: [
            {
              slug: 'classify-sdss-stars',
              title: 'Classify ten SDSS stellar spectra',
              prompt:
                'Using SkyServer\'s Spectroscopic Query or SQL tool, retrieve ten stars with pipeline classes spread across O/B, A, F, G, K and M (the SpecObj table has a subClass column). Hide the labels, view each spectrum in Explore, and classify it yourself from the lines (helium, Balmer strength, Ca II H and K, G band, TiO bands). Then compare with the pipeline class and write a sentence on each disagreement.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'balmer-peak-explanation',
              title: 'Why do Balmer lines peak at type A?',
              prompt:
                'Write a one-page explanation of the Balmer-line strength curve across spectral type using the ideas of excitation (how many atoms are in level n = 2, growing with temperature) and ionisation (how many are ionised, also growing with temperature). Sketch the product of the two factors against temperature and locate the maximum. Identify the two physical laws (Boltzmann and Saha) that make this quantitative; they are derived in the stellar-astrophysics subject.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'luminosity-class',
              title: 'Giants vs dwarfs from the same spectrum',
              prompt:
                'Find in SDSS (or in the OpenStax figures) spectra of a K giant and a K dwarf. Describe at least two spectral differences. Explain physically why the lines in the giant are narrower in terms of surface gravity (g = GM/R^2) and pressure broadening, and compute the surface gravity ratio for a 1 solar-mass K dwarf (R = 0.8 Rsun) and a 1 solar-mass K giant (R = 20 Rsun).',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Order these from hottest to coolest: K5, B2, G2, A0, M7, O9.',
              answerOutline: 'O9, B2, A0, G2, K5, M7.',
            },
            {
              question: 'Why does a G star show stronger calcium lines than an A star despite having the same calcium abundance?',
              answerOutline:
                'At A-star temperatures calcium is mostly doubly ionised and cannot produce the Ca II H and K lines; at G temperatures singly ionised calcium dominates.',
            },
            {
              question: 'What does "G2 V" tell you about the Sun?',
              answerOutline: 'Temperature about 5800 K (G2) and that it is a main-sequence dwarf (V), not a giant.',
            },
          ],
          relatedLessons: ['stellar-astrophysics/radiation-and-spectra/boltzmann-and-saha-equations'],
        },
        {
          slug: 'the-hr-diagram-and-stellar-masses',
          title: 'The H-R diagram and the masses of stars',
          summary:
            'The single most important plot in stellar astronomy: what it shows, what the main sequence means, and how binary stars give the masses that explain it.',
          estimatedMinutes: 110,
          objectives: [
            'Construct an H-R diagram from real data and identify the main sequence, giants, supergiants and white dwarfs',
            'Explain why the main sequence is a mass sequence and state the mass-luminosity relation',
            'Explain how binary stars (visual, spectroscopic, eclipsing) yield stellar masses and radii',
            'Use the H-R diagram to estimate a star\'s distance (spectroscopic parallax) and radius',
          ],
          concepts: [
            'H-R diagram axes: temperature/colour vs luminosity/absolute magnitude',
            'Main sequence, red giants, supergiants, white dwarfs',
            'Mass-luminosity relation $L \\propto M^{3.5}$',
            'Main-sequence lifetime $\\propto M/L$',
            'Visual, spectroscopic and eclipsing binaries',
            'Lines of constant radius on the H-R diagram',
            'Spectroscopic parallax',
          ],
          explanation: `Plot luminosity (or absolute magnitude) against temperature (or colour, or spectral type) for a few thousand stars and most of them fall on a diagonal band from hot-and-bright to cool-and-faint: the **main sequence**. This is the **Hertzsprung-Russell diagram**. Off the band lie cool but luminous **red giants and supergiants** (which must be huge, by $L = 4\\pi R^2\\sigma T^4$) and hot but faint **white dwarfs** (which must be tiny). Lines of constant radius run diagonally across the diagram, so once you know where a star sits you know its size.

The main sequence is a sequence of **mass**. We know this because of **binary stars**: in a visual binary you measure the orbit and apply Kepler's third law in Newton's form; in a spectroscopic binary the Doppler shifts give the velocities; and in an **eclipsing binary** the light curve gives the inclination and even the radii. Combining these, masses on the main sequence run from 0.08 to over 100 solar masses, and luminosity rises steeply with mass, roughly
$$L \\propto M^{3.5}.$$
Since the fuel supply scales as $M$ and the burn rate as $L$, the main-sequence lifetime scales as $M/L \\propto M^{-2.5}$: a 10 solar-mass star lives only about 30 million years, a 0.5 solar-mass star about 100 billion. The H-R diagram is therefore also a diagram of stellar evolution, which the next module exploits.

The diagram works in reverse as a distance tool. Classify a star's spectrum, read off its absolute magnitude from the main sequence, compare with its apparent magnitude, and the distance modulus gives the distance (**spectroscopic parallax**), good to perhaps 20 percent, far beyond the reach of real parallax.

Read OpenStax 18.1, 18.2 and 18.4, then build your own H-R diagram from Gaia DR3 in the exercises. You will see the main sequence, the giant branch and the white-dwarf sequence emerge from a hundred thousand points.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 18.4 The H-R Diagram',
              url: 'https://openstax.org/books/astronomy-2e/pages/18-4-the-h-r-diagram',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 18.2 Measuring Stellar Masses',
              url: 'https://openstax.org/books/astronomy-2e/pages/18-2-measuring-stellar-masses',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Binary stars and the mass-luminosity relation; also 18.1 A Stellar Census.',
            },
            {
              title: 'Gaia Archive — use cases and tutorials',
              url: 'https://www.cosmos.esa.int/web/gaia-users/archive/use-cases',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
              note: 'Includes a worked tutorial on building a colour-magnitude (H-R) diagram with ADQL.',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 1: Introduction',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-1',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              note: 'Bailyn\'s overview of stellar properties and the scale of the problem.',
            },
          ],
          exercises: [
            {
              slug: 'gaia-hr-diagram',
              title: 'Build an H-R diagram from Gaia DR3',
              prompt:
                'Query the Gaia archive for 100,000 stars with parallax > 5 mas and parallax_over_error > 10 and good photometry (phot_bp_rp_excess_factor sensible, ruwe < 1.4). Compute absolute G magnitude M_G = G + 5 log10(parallax/1000) + 5 and plot M_G (inverted axis) against bp_rp as a 2D histogram. Label the main sequence, red clump/giant branch and white dwarf sequence. Overlay the Sun (M_G = 4.67, bp_rp = 0.82). Estimate from the plot what fraction of stars are main-sequence.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'astroquery.gaia.Gaia.launch_job_async with a TOP 100000 query is the easiest route; matplotlib hexbin or hist2d with log colour scale.',
            },
            {
              slug: 'binary-mass',
              title: 'Masses from an eclipsing binary',
              prompt:
                'An eclipsing spectroscopic binary has a period of 3.0 days and radial-velocity semi-amplitudes of 100 km/s and 200 km/s for the two stars; eclipses show the orbit is edge-on and circular. Compute the separation (from the velocities and period), the total mass from Kepler\'s third law, and each star\'s mass from the velocity ratio. If the primary eclipse lasts 4 hours, estimate the radius of the larger star.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'lifetimes-and-radii',
              title: 'Lifetimes and radii across the main sequence',
              prompt:
                'For main-sequence stars of 0.2, 0.5, 1, 2, 5, 20 and 60 solar masses, use L = M^3.5 (solar units) to estimate luminosities and lifetimes relative to the Sun\'s 10 billion years. Using typical temperatures (3300, 3800, 5800, 9000, 16,000, 35,000, 45,000 K), compute radii. Plot the stars on an H-R diagram with lines of constant radius (0.1, 1, 10, 100 Rsun) and check that your points fall on the main sequence of your Gaia diagram.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What physical quantity varies along the main sequence, and how do we know?',
              answerOutline:
                'Mass; binary-star orbits give masses that increase monotonically from the lower right to the upper left.',
            },
            {
              question: 'A star has the same temperature as the Sun but 10,000 times the luminosity. What is its radius?',
              answerOutline: 'R = sqrt(10,000) = 100 solar radii (a supergiant).',
            },
            {
              question: 'Why do massive stars live shorter lives even though they have more fuel?',
              answerOutline:
                'Luminosity rises as roughly M^3.5 while fuel rises only as M, so lifetime scales as M^-2.5.',
            },
            {
              question: 'What is spectroscopic parallax and what limits its accuracy?',
              answerOutline:
                'Estimating distance by reading absolute magnitude from spectral/luminosity class and applying the distance modulus; the main sequence has intrinsic width, and extinction must be corrected.',
            },
          ],
        },
      ],
    },
    {
      slug: 'stellar-lives-and-deaths',
      title: 'Stellar Lives and Deaths',
      description:
        'How stars are born from gas, how they change as they burn through their fuel, and the white dwarfs, neutron stars and black holes they leave behind.',
      lessons: [
        {
          slug: 'star-formation',
          title: 'Star formation: from molecular clouds to the main sequence',
          summary:
            'The interstellar medium, gravitational collapse of molecular clouds, protostars and disks, and what sets the range of stellar masses.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the phases of the interstellar medium and where stars form',
            'Explain the balance between gravity and pressure in a cloud and the conditions for collapse',
            'Trace a protostar\'s path onto the main sequence and explain the roles of accretion disks and outflows',
            'State why there are lower and upper limits to stellar masses',
          ],
          concepts: [
            'Interstellar gas and dust; molecular clouds',
            'Jeans mass and gravitational collapse',
            'Fragmentation and star clusters',
            'Protostars, T Tauri stars, accretion disks, jets',
            'Pre-main-sequence contraction',
            'Brown dwarfs below 0.08 solar masses',
            'Initial mass function',
          ],
          explanation: `The space between stars is not empty. The **interstellar medium** contains gas (mostly hydrogen) and dust at densities from a few thousandths to millions of atoms per cubic centimetre, in phases from million-degree hot gas to 10 K **molecular clouds**. Dust reddens and dims starlight, which is why the Milky Way looks patchy and why infrared telescopes see into clouds that are opaque in visible light.

Stars form where gravity wins against pressure. A cloud fragment collapses if its mass exceeds the **Jeans mass**, which scales as $T^{3/2}/\\sqrt{\\rho}$: cold, dense gas collapses easily, which is why molecular clouds are the nurseries. Collapse is usually triggered or helped by a nearby supernova shock, a spiral arm or colliding clouds, and the cloud fragments into many cores, so stars are born in **clusters**. Each core spins up as it shrinks, forming a **protostar** surrounded by an **accretion disk** (the raw material of planets) that feeds it, with excess angular momentum thrown off in bipolar **jets**. Young stars still contracting, the **T Tauri** stars, are visible once the surrounding envelope clears; they sit above and to the right of the main sequence in the H-R diagram and descend onto it as gravitational contraction heats the core to the 10 million K needed for hydrogen fusion. A solar-mass star takes about 30 million years to arrive; a 15 solar-mass star arrives in 100,000 years and begins destroying its own cloud with ultraviolet light and winds.

Mass limits follow from the physics. Below about **0.08 solar masses** the core never gets hot enough for sustained hydrogen fusion: these are **brown dwarfs**, which glow dimly from contraction and deuterium burning and cool forever. Above roughly 150 solar masses radiation pressure tears the star apart. Within those limits nature makes many more small stars than large ones, described by the **initial mass function**.

Read OpenStax 21.1 (and 20.1-20.3 for the interstellar medium), then do the Orion exercise with real images and the Jeans-mass calculation.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 21.1 Star Formation',
              url: 'https://openstax.org/books/astronomy-2e/pages/21-1-star-formation',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 21.2 The H-R Diagram and the Study of Stellar Evolution and 21.3 Evidence That Planets Form around Other Stars.',
              primary: true,
            },
            {
              title: 'NASA Science — Webb telescope (star-forming region images)',
              url: 'https://science.nasa.gov/mission/webb/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Infrared views of the Pillars of Creation, Orion and Carina show protostars and jets inside the dust.',
            },
            {
              title: 'ESA/Hubble image archive',
              url: 'https://esahubble.org/',
              type: 'dataset',
              cost: 'free',
              provider: 'ESA/Hubble',
              note: 'Compare visible and infrared images of the same nebula for the dust exercise.',
            },
          ],
          exercises: [
            {
              slug: 'jeans-mass',
              title: 'Jeans mass of a molecular cloud core',
              prompt:
                'The Jeans mass is approximately M_J = 2 Msun (T/10 K)^1.5 (n/10^4 cm^-3)^-0.5 for molecular hydrogen. Compute it for a typical cold core (T = 10 K, n = 10^4) and for warm diffuse gas (T = 100 K, n = 10). Explain why only the first forms stars. Then estimate the free-fall time t_ff = sqrt(3 pi / (32 G rho)) for the cold core and compare with the ages of the youngest stars in Orion (about 1 million years).',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'orion-visible-vs-infrared',
              title: 'Visible versus infrared views of a nursery',
              prompt:
                'Find a visible-light Hubble image and a Webb near-infrared image of the same star-forming region (the Pillars of Creation or the Orion Nebula are ideal). Describe three differences and explain each physically: why dust is transparent in the infrared, why protostars appear only in the infrared, and why the ionised gas glows in the visible. Identify at least one jet or outflow.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'brown-dwarf-limit',
              title: 'Why 0.08 solar masses?',
              prompt:
                'The central temperature of a contracting star scales roughly as T_c proportional to M/R, while electron degeneracy halts contraction at a radius R_deg proportional to M^(-1/3). Show that the maximum central temperature reached scales as M^(4/3), and use the fact that a 1 solar-mass star reaches 15 million K to estimate the mass below which the 3 million K needed for sustained hydrogen fusion is never reached. Compare with the accepted 0.08 solar-mass limit and comment on the crudeness of the scaling.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do stars form in cold molecular clouds rather than in hot gas?',
              answerOutline:
                'The Jeans mass scales as T^1.5 / sqrt(density); cold, dense gas has a small Jeans mass so even modest clumps can collapse against pressure.',
            },
            {
              question: 'Why do young stars have disks and jets?',
              answerOutline:
                'Collapsing gas conserves angular momentum and settles into a disk; magnetic fields and the disk launch jets that carry away excess angular momentum.',
            },
            {
              question: 'What distinguishes a brown dwarf from a star?',
              answerOutline:
                'Below 0.08 solar masses the core never sustains hydrogen fusion; brown dwarfs burn deuterium briefly and then cool and fade.',
            },
          ],
        },
        {
          slug: 'evolution-and-star-clusters',
          title: 'Stellar evolution and the clocks of star clusters',
          summary:
            'What happens when the core runs out of hydrogen: red giants, helium burning, and how the H-R diagrams of clusters let us measure stellar ages.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why a star becomes a red giant when core hydrogen is exhausted',
            'Describe helium burning, the helium flash and the horizontal branch',
            'Use the main-sequence turn-off of a cluster to estimate its age',
            'Contrast open and globular clusters and what their H-R diagrams reveal',
          ],
          concepts: [
            'Core hydrogen exhaustion and shell burning',
            'Red giant branch: core contracts, envelope expands',
            'Triple-alpha helium fusion; helium flash',
            'Horizontal branch and red clump',
            'Main-sequence turn-off age',
            'Open vs globular clusters',
            'Isochrones',
          ],
          explanation: `A star spends about 90 percent of its life on the main sequence, slowly converting core hydrogen to helium. When the core's hydrogen is gone fusion stops there, and without its energy the core, now inert helium, contracts under gravity and heats up. Hydrogen just outside the core ignites in a **shell**, burning faster and hotter than before. The extra energy pushes the envelope outward and cools it: the star swells to tens or hundreds of solar radii and becomes a **red giant**. On the H-R diagram it moves up and to the right. The Sun will do this in about 5 billion years, engulfing Mercury and Venus.

In the contracting core, at 100 million K, helium ignites by the **triple-alpha process**, fusing three helium nuclei into carbon (and some to oxygen). In stars below about 2 solar masses the core is degenerate when this happens and ignition is explosive, the **helium flash**, though it is buried and invisible from outside. The star then settles onto the **horizontal branch** (or, for metal-rich stars, the **red clump**), burning helium quietly for about 100 million years before helium too is exhausted and the story repeats with a double shell on the **asymptotic giant branch**.

**Star clusters** turn this theory into a measurement. All the stars in a cluster formed together, at the same distance, with the same composition, differing only in mass. Since massive stars evolve first, the point where the main sequence ends, the **turn-off**, moves to lower luminosity as the cluster ages. Match the turn-off to a theoretical **isochrone** and you have the age. Young **open clusters** such as the Pleiades (100 million years) still have B stars; ancient **globular clusters** (12-13 billion years) have turn-offs below the Sun's luminosity and well-populated giant and horizontal branches.

Read OpenStax 22.1 and 22.2, then build cluster colour-magnitude diagrams from Gaia and date them yourself in the exercises.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 22.1 Evolution from the Main Sequence to Red Giants',
              url: 'https://openstax.org/books/astronomy-2e/pages/22-1-evolution-from-the-main-sequence-to-red-giants',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 22.2 Star Clusters',
              url: 'https://openstax.org/books/astronomy-2e/pages/22-2-star-clusters',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 22.3 Checking Out the Theory and 22.4 Further Evolution of Stars.',
            },
            {
              title: 'Gaia Archive — use cases (cluster membership and CMDs)',
              url: 'https://www.cosmos.esa.int/web/gaia-users/archive/use-cases',
              type: 'documentation',
              cost: 'free',
              provider: 'ESA',
              note: 'Worked examples of selecting cluster members by proper motion and parallax.',
            },
            {
              title: 'astroquery.gaia documentation',
              url: 'https://astroquery.readthedocs.io/en/latest/gaia/gaia.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Run the same ADQL queries from Python.',
            },
          ],
          exercises: [
            {
              slug: 'cluster-cmds',
              title: 'Colour-magnitude diagrams of three clusters',
              prompt:
                'Using Gaia DR3, select members of the Pleiades (RA 56.75, Dec 24.1, radius 2 deg, pmra about 20, pmdec about -45 mas/yr, parallax 7.0-7.6 mas), the Hyades (RA 66.7, Dec 15.9, radius 8 deg, parallax 19-24 mas) and M67 (RA 132.8, Dec 11.8, radius 0.5 deg, pmra -11, pmdec -3, parallax 1.0-1.3 mas). Plot absolute G against bp_rp for each on the same axes. Rank the clusters by turn-off luminosity and hence by age, and compare with literature ages (about 100 Myr, 650 Myr, 4 Gyr). Which cluster shows a clear red clump?',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Use the proper-motion box to remove field stars; a 2D histogram of pmra vs pmdec will show the cluster as a tight clump.',
            },
            {
              slug: 'turnoff-age',
              title: 'Age from the turn-off mass',
              prompt:
                'The turn-off of a cluster is at absolute V magnitude +3.5. Convert to luminosity in solar units, infer the turn-off mass from L = M^3.5, and estimate the cluster age using t = 10 Gyr (M/Msun)^-2.5. Repeat for a turn-off at M_V = -2 and at +5, and comment on which of the three clusters could be a globular cluster.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'red-giant-sun',
              title: 'The Sun as a red giant',
              prompt:
                'When the Sun becomes a red giant its luminosity will reach about 2000 Lsun and its surface temperature about 3200 K. Compute its radius in solar radii and in AU; which planets will be engulfed? Compute Earth\'s equilibrium temperature at that time (ignoring any change in orbit) and discuss whether Earth would be habitable even if it survives.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a star expand and cool when its core runs out of hydrogen?',
              answerOutline:
                'The inert helium core contracts and heats, shell hydrogen burning becomes more vigorous, and the increased energy output inflates the envelope, which cools as it expands.',
            },
            {
              question: 'How does a cluster\'s H-R diagram give its age?',
              answerOutline:
                'Stars above the turn-off mass have evolved off the main sequence; the turn-off luminosity corresponds to a mass whose main-sequence lifetime equals the cluster age.',
            },
            {
              question: 'What is the helium flash and why does it occur only in low-mass stars?',
              answerOutline:
                'Runaway helium ignition in a degenerate core (pressure does not rise with temperature, so no self-regulation); cores above ~2 solar masses ignite helium before becoming degenerate.',
            },
          ],
        },
        {
          slug: 'deaths-of-low-mass-stars',
          title: 'Planetary nebulae and white dwarfs',
          summary:
            'How stars like the Sun shed their envelopes and leave behind Earth-sized, degenerate white dwarfs, and what the Chandrasekhar limit means.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the asymptotic giant branch, thermal pulses and mass loss that produce a planetary nebula',
            'Explain electron degeneracy pressure and why white dwarfs shrink as they gain mass',
            'State the Chandrasekhar limit and its significance',
            'Describe white-dwarf cooling and its use as a cosmic clock',
          ],
          concepts: [
            'Asymptotic giant branch and thermal pulses',
            'Mass loss and planetary nebulae',
            'Electron degeneracy pressure',
            'White dwarfs: Earth-sized, ~0.6 solar masses',
            'Mass-radius relation $R \\propto M^{-1/3}$',
            'Chandrasekhar limit, 1.4 solar masses',
            'White-dwarf cooling sequence',
            'Type Ia supernovae from accreting white dwarfs',
          ],
          explanation: `Stars below about 8 solar masses never get hot enough to fuse carbon. After helium is exhausted the star climbs the **asymptotic giant branch** with helium and hydrogen shells burning alternately in **thermal pulses**, dredging up carbon to the surface and driving a powerful wind. Over a few hundred thousand years the star sheds most of its envelope. The exposed hot core, at 100,000 K, ionises the departing gas, which glows for a few tens of thousands of years as a **planetary nebula** (a historical misnomer; it has nothing to do with planets). The Ring, Helix and Cat's Eye nebulae are examples, and the carbon, nitrogen and oxygen they return to the interstellar medium enrich the next generation of stars.

What is left is a **white dwarf**: typically 0.6 solar masses packed into an Earth-sized sphere, so dense that a teaspoon weighs tons. No fusion occurs. It is supported by **electron degeneracy pressure**, a quantum-mechanical effect: the Pauli exclusion principle forbids electrons from occupying the same state, so compressing them forces them into higher momenta regardless of temperature. This pressure gives a strange **mass-radius relation**, $R \\propto M^{-1/3}$: a more massive white dwarf is *smaller*. Chandrasekhar showed in 1930 that as the mass approaches about **1.4 solar masses** the electrons become relativistic and degeneracy pressure can no longer win; above that limit no white dwarf can exist.

Because it generates no energy, a white dwarf simply **cools**, from 100,000 K through the Sun's temperature to a few thousand kelvin over billions of years. Cooling is slow and well understood, so the faintest, coolest white dwarfs in the Galaxy give an independent age for the disk (about 9-10 billion years) and for globular clusters. In a close binary, a white dwarf can accrete from its companion; approaching the Chandrasekhar limit triggers carbon fusion throughout the star and a **Type Ia supernova**, the standard candle that revealed the accelerating universe.

Read OpenStax 23.1 and the white-dwarf parts of 22.4, then find the white-dwarf sequence in your own Gaia H-R diagram.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 23.1 The Death of Low-Mass Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/23-1-the-death-of-low-mass-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 22.1 onward (AGB evolution)',
              url: 'https://openstax.org/books/astronomy-2e/pages/22-1-evolution-from-the-main-sequence-to-red-giants',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Section 22.4 Further Evolution of Stars covers the AGB and planetary nebula phases.',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 22: Supernovae',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-22',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              note: 'Includes Type Ia supernovae from white dwarfs and why they are standard candles.',
            },
          ],
          exercises: [
            {
              slug: 'white-dwarf-density',
              title: 'White dwarf numbers',
              prompt:
                'Sirius B has mass 1.02 solar masses and radius 0.0084 solar radii. Compute its mean density in kg/m^3, its surface gravity relative to Earth\'s, and its escape velocity as a fraction of c. Using R proportional to M^-1/3, predict the radius of a 0.6 solar-mass white dwarf and of a 1.3 solar-mass one. Then compute the luminosity of Sirius B from its temperature (25,000 K) and radius and compare with the Sun.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'gaia-white-dwarfs',
              title: 'The white-dwarf sequence in Gaia',
              prompt:
                'From your Gaia H-R diagram (or a new query with parallax > 10 mas, parallax_over_error > 10), select stars with absolute G fainter than 10 and bp_rp less than 1.0. Plot them. Explain why they form a narrow sequence, why it runs roughly parallel to the main sequence but 10 magnitudes fainter, and why there is a gap in colour between the hottest and the bulk. Estimate what fraction of stars within 100 pc are white dwarfs and discuss why the true fraction is higher than the detected one.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'planetary-nebula-age',
              title: 'Age of a planetary nebula',
              prompt:
                'The Ring Nebula (M57) has an angular radius of about 40 arcseconds at a distance of 790 pc, and its gas expands at about 20 km/s (from Doppler shifts of the near and far sides). Compute its physical radius in AU and light-years and its expansion age. Explain why planetary nebulae are so short-lived compared with the stars that make them, and estimate how many should exist in the Galaxy at any time if one star per year enters this phase.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What holds up a white dwarf, and why does it not depend on temperature?',
              answerOutline:
                'Electron degeneracy pressure from the Pauli exclusion principle; it arises from the quantum requirement that electrons occupy distinct momentum states, not from thermal motion.',
            },
            {
              question: 'What happens to a white dwarf that accretes mass up to 1.4 solar masses?',
              answerOutline:
                'It approaches the Chandrasekhar limit; carbon ignites under degenerate conditions and the star explodes as a Type Ia supernova.',
            },
            {
              question: 'How can white dwarfs be used to measure the age of the Galactic disk?',
              answerOutline:
                'They cool at a well-modelled rate; the temperature of the faintest, coolest white dwarfs gives the time since the first ones formed.',
            },
          ],
        },
        {
          slug: 'supernovae-neutron-stars-and-black-holes',
          title: 'Supernovae, neutron stars and black holes',
          summary:
            'How massive stars build an iron core and collapse, what a core-collapse supernova does for the universe, and the exotic remnants: pulsars and black holes.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the onion-layer burning stages of a massive star and why iron is the end',
            'Explain core collapse, neutrino emission and the supernova explosion, and the evidence from SN 1987A',
            'Describe neutron stars and pulsars and explain how we know pulsars are rotating neutron stars',
            'Describe the event horizon and Schwarzschild radius, and the observational evidence for stellar-mass black holes',
          ],
          concepts: [
            'Advanced burning stages up to iron',
            'Iron core collapse and neutron star formation',
            'Core-collapse (Type II) vs Type Ia supernovae',
            'Nucleosynthesis and enrichment of the Galaxy',
            'Neutron stars: 1.4 solar masses in 10 km',
            'Pulsars and the lighthouse model',
            'Schwarzschild radius $R_s = 2GM/c^2$',
            'Black holes in X-ray binaries; gravitational waves',
          ],
          explanation: `A star above about 8 solar masses burns through its fuels in sequence, each stage hotter and shorter than the last: hydrogen for millions of years, helium for hundreds of thousands, carbon for centuries, oxygen for a year, silicon for a day. The star becomes an onion with an **iron core** at the centre. Iron is the end because it has the most tightly bound nucleus; fusing it *absorbs* energy. When the core exceeds the Chandrasekhar mass it collapses in less than a second from the size of Earth to about 20 km, the protons and electrons combining into neutrons and releasing a colossal burst of **neutrinos**. The infalling outer layers bounce off the stiff neutron core and, heated by the neutrinos, are blasted outward: a **core-collapse supernova**, briefly outshining its whole galaxy.

**SN 1987A** in the Large Magellanic Cloud confirmed the picture: two dozen neutrinos were detected on Earth hours before the light, the progenitor was identified on old photographs, and the radioactive decay of freshly made nickel and cobalt powered the fading light curve. Supernovae make and scatter most of the elements heavier than oxygen (with neutron-star mergers supplying much of the gold and platinum), so the calcium in your bones and the iron in your blood passed through one.

What remains depends on mass. Cores below about 3 solar masses become **neutron stars**, 1.4 solar masses in a 10 km sphere supported by neutron degeneracy, spinning fast and strongly magnetised because of conservation of angular momentum and flux. We see them as **pulsars**: beams of radio waves sweep past us once per rotation, with periods from milliseconds to seconds, so stable that pulsars are among the best clocks known. The Crab pulsar, in the remnant of the supernova of 1054, spins 30 times a second.

Heavier cores leave **black holes**. Inside the **Schwarzschild radius**
$$R_s = \\frac{2GM}{c^2} \\approx 3\\ \\mathrm{km}\\times\\frac{M}{M_\\odot}$$
escape velocity exceeds $c$, and nothing returns. We detect stellar black holes by their effect on companions in X-ray binaries (gas spiralling in heats to millions of degrees) and, since 2015, by the gravitational waves emitted when two merge. Read OpenStax 23.2, 23.4 and 24.1, and watch Yale lectures 12 and 14.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 23.2 Evolution of Massive Stars: An Explosive Finish',
              url: 'https://openstax.org/books/astronomy-2e/pages/23-2-evolution-of-massive-stars-an-explosive-finish',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 23.3 Supernova Observations.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 23.4 Pulsars and the Discovery of Neutron Stars',
              url: 'https://openstax.org/books/astronomy-2e/pages/23-4-pulsars-and-the-discovery-of-neutron-stars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'OpenStax Astronomy 2e — 24.1 Introducing General Relativity',
              url: 'https://openstax.org/books/astronomy-2e/pages/24-1-introducing-general-relativity',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Continue through the black hole sections (24.5-24.7) and gravitational waves.',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 12: Stellar Mass Black Holes',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-12',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              note: 'Lecture 14 (Pulsars) and 22 (Supernovae) are the companions.',
            },
          ],
          exercises: [
            {
              slug: 'neutron-star-spin',
              title: 'Why pulsars spin so fast',
              prompt:
                'A stellar core with radius 10,000 km rotating once every 10 days collapses to a neutron star of radius 10 km. Using conservation of angular momentum (I proportional to M R^2), compute the final rotation period. Then compute the minimum period before the star would fly apart (set centripetal acceleration at the equator equal to gravity for M = 1.4 Msun, R = 10 km) and compare with the fastest known pulsar (1.4 ms). Finally compute how much the magnetic field is amplified if flux (B R^2) is conserved from an initial 100 gauss.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'schwarzschild-radii',
              title: 'Schwarzschild radii across the mass scale',
              prompt:
                'Compute the Schwarzschild radius for: Earth, the Sun, a 10 solar-mass stellar black hole, Sagittarius A* (4.3 million solar masses) and the M87 black hole (6.5 billion solar masses). For each, compute the mean density inside R_s and comment on the surprising result for the largest black holes. Compute the angular size of the M87 event horizon (distance 16.8 Mpc) in microarcseconds and compare with the Event Horizon Telescope resolution of about 20 microarcseconds.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'supernova-energy-budget',
              title: 'The energy budget of a supernova',
              prompt:
                'Estimate the gravitational binding energy released when a 1.4 solar-mass core shrinks from 3000 km to 12 km (use E = 3GM^2/5R). Compare with: the kinetic energy of 10 solar masses of ejecta at 10,000 km/s; the light emitted if the supernova shines at 10^9 Lsun for 100 days; and the Sun\'s total lifetime energy output. What fraction of the released energy is carried by neutrinos?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'pulsar-sound',
              title: 'Pulsar timing from real data',
              prompt:
                'Download the Crab pulsar\'s period history or use the published values: P = 0.0334 s with dP/dt = 4.2e-13 s/s. Compute the characteristic age P/(2 dP/dt) in years and compare with the known age since AD 1054. Compute the rotational energy loss rate dE/dt = 4 pi^2 I (dP/dt)/P^3 with I = 10^38 kg m^2 and compare with the Crab Nebula\'s luminosity of about 10^31 W. Explain what powers the nebula.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does fusion stop at iron?',
              answerOutline:
                'Iron-56 has the highest binding energy per nucleon; fusing it to heavier elements consumes rather than releases energy, so it cannot support the star.',
            },
            {
              question: 'What evidence shows that pulsars are rotating neutron stars rather than vibrating white dwarfs?',
              answerOutline:
                'Millisecond periods are too fast for a white dwarf to survive rotation or vibration; only a neutron-star-density object can spin that fast, and the slow, steady spin-down matches rotation.',
            },
            {
              question: 'How do we detect a black hole if no light escapes it?',
              answerOutline:
                'By its gravitational effect: companion star orbits yielding a mass above 3 solar masses in a compact volume, X-rays from accreting gas, gravitational waves from mergers, and the EHT shadow.',
            },
          ],
          relatedLessons: ['high-energy-astrophysics/neutron-stars-and-pulsars/pulsar-timing'],
        },
      ],
    },
    {
      slug: 'galaxies-and-the-universe',
      title: 'Galaxies and the Universe',
      description:
        'From our own Milky Way to the expanding universe: galaxy structure, the evidence for dark matter, Hubble\'s law and the Big Bang.',
      lessons: [
        {
          slug: 'the-milky-way',
          title: 'The Milky Way: our galaxy from the inside',
          summary:
            'The structure of the Galaxy (disk, bulge, halo), how we mapped it from inside, the rotation curve that reveals dark matter, and the central black hole.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the components of the Milky Way and their stellar populations',
            'Explain how Shapley used globular clusters to find the Galactic centre and why interstellar dust misled earlier astronomers',
            'Interpret the Galactic rotation curve and compute the enclosed mass',
            'Describe the evidence for the supermassive black hole at the Galactic centre',
          ],
          concepts: [
            'Disk, bulge, bar, halo, spiral arms',
            'Population I and II stars',
            'Globular cluster distribution and the Galactic centre',
            'Rotation curve and $M(r) = v^2 r / G$',
            'Flat rotation curve and dark matter halo',
            'Sagittarius A* and stellar orbits',
            'Galactic coordinates',
          ],
          explanation: `The band of light across the sky is our **Galaxy** seen edge-on from inside. It is a flattened **disk** about 100,000 light-years across containing gas, dust and young, metal-rich **Population I** stars in spiral arms; a central **bulge** with a bar; and a vast spherical **halo** of old, metal-poor **Population II** stars and globular clusters. The Sun sits in the disk about 26,000 light-years (8 kpc) from the centre, orbiting at 220 km/s once every 230 million years.

Mapping the Galaxy from inside is hard because dust in the disk hides everything beyond a few kiloparsecs in visible light. Herschel and Kapteyn, counting stars, concluded we were near the centre of a small system. Shapley in 1918 used **globular clusters**, which lie above and below the obscuring dust and are distributed symmetrically about the true centre, to show the Galaxy is huge and we are far from its middle. Radio and infrared observations, which see through dust, later revealed the spiral arms and the bar.

The rotation of the disk measures the mass. A star at radius $r$ moving at speed $v$ on a circular orbit requires an enclosed mass
$$M(r) = \\frac{v^2 r}{G}.$$
If most of the mass were in the bright central regions, $v$ would fall as $r^{-1/2}$ beyond them, as the planets' speeds do. Instead the **rotation curve is flat** out to the edge of the visible disk and beyond, so $M(r)$ keeps growing linearly with $r$: the Galaxy is embedded in a halo of **dark matter** at least ten times the mass of all its stars, detectable only by gravity.

At the very centre, infrared observations tracking individual stars for decades show them orbiting an invisible point, **Sagittarius A***, on Keplerian ellipses; one star passes within 120 AU at 7,600 km/s. Kepler's third law gives 4.3 million solar masses within a volume smaller than the solar system: a supermassive black hole, now imaged by the Event Horizon Telescope. Read OpenStax 25.1 onward and reproduce the central black hole mass yourself.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 25.1 The Architecture of the Galaxy',
              url: 'https://openstax.org/books/astronomy-2e/pages/25-1-the-architecture-of-the-galaxy',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Continue through 25.3 (spiral structure), 25.4 (mass and dark matter) and 25.5 (the Galactic centre).',
              primary: true,
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 15: Supermassive Black Holes',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-15',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              note: 'The Galactic centre stellar orbits and the mass of Sgr A*.',
            },
            {
              title: 'ESA Gaia mission',
              url: 'https://www.esa.int/Science_Exploration/Space_Science/Gaia',
              type: 'article',
              cost: 'free',
              provider: 'ESA',
              note: 'Gaia\'s 3D maps of the Milky Way; browse the image and video releases.',
            },
            {
              title: 'Learn Astropy — computing Galactic orbits of stars with Gaia and Gala',
              url: 'https://learn.astropy.org/tutorials/gaia-galactic-orbits.html',
              type: 'interactive',
              cost: 'free',
              provider: 'Astropy',
              note: 'An advanced optional notebook: Gaia stars integrated in a Milky Way potential.',
            },
          ],
          exercises: [
            {
              slug: 'galactic-mass-from-rotation',
              title: 'Mass of the Galaxy from the Sun\'s orbit',
              prompt:
                'The Sun orbits at 8.2 kpc with speed 230 km/s. Compute the mass inside the Sun\'s orbit in solar masses. The rotation speed is still about 220 km/s at 30 kpc: compute the mass within 30 kpc. If the stars and gas of the Galaxy total about 6e10 solar masses, what fraction of the mass within 30 kpc is dark? Plot the Keplerian prediction v(r) for a central mass equal to your first answer and compare with the flat curve.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'sgr-a-star-mass',
              title: 'Weigh Sagittarius A* from the star S2',
              prompt:
                'The star S2 orbits Sgr A* with period 16.05 years and semi-major axis 0.1255 arcseconds at a distance of 8.2 kpc. Convert the semi-major axis to AU, apply Kepler\'s third law, and compute the mass of Sgr A* in solar masses. S2\'s eccentricity is 0.88: compute its pericentre distance in AU and its speed there, and compare with the Schwarzschild radius of the black hole. Why does this rule out a dense cluster of ordinary stars?',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'gaia-disk-kinematics',
              title: 'See the disk rotate in Gaia proper motions',
              prompt:
                'Query Gaia DR3 for 50,000 stars with parallax between 0.5 and 1 mas (1-2 kpc away) spread over all Galactic longitudes. Convert proper motions to Galactic coordinates with astropy (SkyCoord with pm_ra_cosdec and pm_dec, transform to Galactic) and plot the mean proper motion in longitude against Galactic longitude. Explain the sinusoidal pattern (Oort\'s A and B constants) in terms of differential rotation of the disk.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How did Shapley determine that the Sun is not at the centre of the Galaxy?',
              answerOutline:
                'Globular clusters, visible out of the dusty plane, are concentrated toward Sagittarius; their centre of distribution, about 8 kpc away, is the true Galactic centre.',
            },
            {
              question: 'What does a flat rotation curve imply about the mass distribution?',
              answerOutline:
                'Enclosed mass grows linearly with radius (M proportional to v^2 r) far beyond the visible stars, requiring an extended dark matter halo.',
            },
            {
              question: 'Why must the object at the Galactic centre be a black hole?',
              answerOutline:
                '4 million solar masses inside the pericentre of S2 (about 120 AU) is too dense for any cluster of stars or remnants to survive; only a black hole fits, confirmed by the EHT image.',
            },
          ],
          relatedLessons: ['galaxies-cosmology/the-milky-way/disk-kinematics-and-the-rotation-curve'],
        },
        {
          slug: 'galaxies-and-hubbles-law',
          title: 'Galaxies, distances and Hubble\'s law',
          summary:
            'The discovery that spiral nebulae are other galaxies, the galaxy types, the distance ladder, and the redshift-distance relation that implies an expanding universe.',
          estimatedMinutes: 110,
          objectives: [
            'Describe the Hubble classification (ellipticals, spirals, irregulars) and the properties of each type',
            'Explain how Cepheid variables and Type Ia supernovae extend the distance ladder beyond parallax',
            'State Hubble\'s law, use it to estimate distances and the age of the universe, and explain what the Hubble constant means',
            'Explain why cosmological redshift is expansion of space rather than motion through space',
          ],
          concepts: [
            'Shapley-Curtis debate; Hubble\'s Cepheids in Andromeda',
            'Elliptical, spiral, irregular galaxies; the tuning fork',
            'Distance ladder: parallax, Cepheids, Type Ia supernovae',
            'Period-luminosity relation',
            'Hubble\'s law $v = H_0 d$',
            'Hubble time $1/H_0$',
            'Cosmological redshift and the scale factor',
            'Galaxy groups, clusters, superclusters',
          ],
          explanation: `Until 1924 it was unclear whether the "spiral nebulae" were small clouds in our Galaxy or vast systems far outside it. Hubble settled the question by finding **Cepheid variables** in Andromeda. Cepheids pulsate with a period that depends on their luminosity (Leavitt's **period-luminosity relation**), so measuring the period gives the absolute magnitude and the distance modulus gives the distance: 2.5 million light-years, far beyond the Milky Way. The universe was suddenly full of galaxies.

Hubble sorted them into **ellipticals** (smooth, old red stars, little gas), **spirals** (disks with arms, ongoing star formation, often barred) and **irregulars**, the "tuning fork" diagram. Galaxies cluster: the Milky Way and Andromeda lead the Local Group of about 80 galaxies; the Virgo Cluster has thousands; clusters gather into superclusters and filaments around enormous voids.

Distances beyond Cepheid range (about 30 Mpc with Hubble) come from **Type Ia supernovae**, which all explode near the Chandrasekhar limit and so have nearly the same peak luminosity, visible across billions of light-years. Each rung of the **distance ladder** is calibrated on the one below, which is why Gaia's parallaxes matter even for cosmology.

Hubble's second discovery (1929) was that galaxies' redshifts increase with distance:
$$v = H_0\\, d,$$
with the **Hubble constant** $H_0 \\approx 70$ km/s/Mpc. Every galaxy sees every other receding; this is not an explosion from a centre but the **expansion of space** itself, stretching the wavelength of light in transit (cosmological redshift $1 + z = a_{\\rm now}/a_{\\rm then}$). Running the expansion backward gives the **Hubble time** $1/H_0 \\approx 14$ billion years, a first estimate of the age of the universe. Read OpenStax 26.1 and 26.5 and 19.3, watch Yale lecture 16, and measure $H_0$ yourself from SDSS data.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 26.5 The Expanding Universe',
              url: 'https://openstax.org/books/astronomy-2e/pages/26-5-the-expanding-universe',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Read 26.1 The Discovery of Galaxies and 26.2-26.4 on types, masses and distances first.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 19.3 Variable Stars: One Key to Cosmic Distances',
              url: 'https://openstax.org/books/astronomy-2e/pages/19-3-variable-stars-one-key-to-cosmic-distances',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Cepheids and the period-luminosity relation.',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 16: Hubble\'s Law and the Big Bang',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-16',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
            },
            {
              title: 'SDSS SkyServer DR18 — SQL search',
              url: 'https://skyserver.sdss.org/dr18/SearchTools/sql',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'Galaxy redshifts and magnitudes for the Hubble-law exercise.',
            },
            {
              title: 'Galaxy Zoo (Zooniverse)',
              url: 'https://www.zooniverse.org/projects/zookeeper/galaxy-zoo',
              type: 'interactive',
              cost: 'free',
              provider: 'Zooniverse',
              note: 'Classify real galaxies to internalise the Hubble types.',
            },
          ],
          exercises: [
            {
              slug: 'cepheid-distance',
              title: 'Distance to a galaxy from a Cepheid',
              prompt:
                'A Cepheid in a nearby galaxy has a period of 30 days and a mean apparent V magnitude of 24.0. Use the period-luminosity relation M_V = -2.43 (log10 P - 1) - 4.05 (P in days) to find its absolute magnitude, then compute the distance in Mpc. If interstellar dust dims it by 0.3 magnitudes, how much does the distance change? Express the galaxy\'s recession velocity from Hubble\'s law with H0 = 70 km/s/Mpc.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'hubble-constant-from-sdss',
              title: 'Measure the Hubble constant from SDSS',
              prompt:
                'In SkyServer SQL, select 2000 galaxies with spectroscopic redshift 0.02 < z < 0.1, their r-band Petrosian magnitude and petroR50_r (half-light radius). Assume giant ellipticals all have the same absolute magnitude M_r = -22 (a crude standard candle): compute distances from the distance modulus for the brightest, reddest galaxies (u - r > 2.5), plot cz against distance and fit a line through the origin. Report your H0 and discuss why it is biased (Malmquist bias, K-corrections, scatter in M_r).',
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'SELECT TOP 2000 z, petroMag_r, petroMag_u, petroR50_r FROM SpecObj JOIN PhotoObj ON SpecObj.bestObjID = PhotoObj.objID WHERE class = \'GALAXY\' AND z BETWEEN 0.02 AND 0.1 AND zWarning = 0',
            },
            {
              slug: 'galaxy-zoo-classification',
              title: 'Classify 100 galaxies',
              prompt:
                'Classify at least 100 galaxies on Galaxy Zoo. Keep a tally of spirals, ellipticals, and uncertain cases. Then in SDSS, for 20 of each type you can identify by eye in the Navigate tool, record the u - r colour and plot a histogram by type. Explain the colour difference physically (stellar populations, ongoing star formation) and estimate the fraction of ambiguous cases.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are Cepheids so valuable for measuring distances?',
              answerOutline:
                'Their pulsation period gives their luminosity (period-luminosity relation), and they are bright enough to see in other galaxies; comparing luminosity with apparent brightness gives distance.',
            },
            {
              question: 'If H0 = 70 km/s/Mpc, what is the Hubble time and what does it approximate?',
              answerOutline:
                '1/H0 = 1 Mpc / (70 km/s) = 3.09e19 km / 70 km/s = 4.4e17 s = 14 billion years; roughly the age of the universe if expansion were constant.',
            },
            {
              question: 'Does Hubble\'s law mean the Milky Way is at the centre of the expansion?',
              answerOutline:
                'No. In uniform expansion every observer sees every other galaxy receding with v proportional to d; there is no centre, as the raisin-bread or balloon analogy shows.',
            },
          ],
          relatedLessons: ['galaxies-cosmology/the-expanding-universe/hubbles-law-and-the-distance-ladder'],
        },
        {
          slug: 'dark-matter-and-active-galaxies',
          title: 'Dark matter, active galaxies and quasars',
          summary:
            'Three lines of evidence for dark matter, what it is not, and the supermassive black holes that power quasars and shape galaxy evolution.',
          estimatedMinutes: 90,
          objectives: [
            'Describe the evidence for dark matter from rotation curves, cluster dynamics and gravitational lensing',
            'Explain what dark matter cannot be (ordinary gas, dim stars) and summarise the leading candidates',
            'Describe quasars and active galactic nuclei and explain why accretion onto a black hole is the only viable power source',
            'Explain how galaxies and their central black holes appear to grow together',
          ],
          concepts: [
            'Galaxy rotation curves',
            'Cluster virial mass and hot X-ray gas',
            'Gravitational lensing: arcs, rings, weak lensing',
            'Baryonic vs non-baryonic dark matter; WIMPs, axions',
            'Quasars: high luminosity from small volumes',
            'Accretion efficiency vs fusion',
            'Jets, radio galaxies, unified model',
            'Black hole-galaxy coevolution',
          ],
          explanation: `Wherever we weigh a large system by gravity, we find more mass than we can see. **Rotation curves** of spiral galaxies stay flat to their outermost gas. In **galaxy clusters**, galaxy speeds (Zwicky, 1933) and the temperature of the X-ray-emitting gas both imply ten times more mass than stars and gas provide. And **gravitational lensing**, the bending of light from background galaxies into arcs and rings predicted by general relativity, maps the mass directly, agreeing with the dynamical estimates. The Bullet Cluster, where two clusters collided, shows the lensing mass separated from the hot gas: the dark matter passed straight through while the gas was stopped.

What is it? Not ordinary matter: the Big Bang production of deuterium and helium limits normal (baryonic) matter to about 5 percent of the cosmic budget, while dark matter is about 27 percent. Surveys for dim stars and rogue planets by their microlensing found far too few. The leading candidates are new particles that interact only gravitationally and weakly (WIMPs, axions), still undetected in the laboratory.

Meanwhile the centres of some galaxies shine with ferocity. **Quasars** can outshine a thousand galaxies from a region smaller than the solar system, as their brightness varies in days. No arrangement of stars can do that; the only mechanism efficient enough is gas spiralling into a supermassive black hole through an **accretion disk**, converting up to 10 percent of the infalling mass to energy versus 0.7 percent for fusion. Magnetic fields launch **jets** of particles at nearly light speed, producing giant radio lobes. Seyfert galaxies, radio galaxies, blazars and quasars are one phenomenon seen at different luminosities and angles (the **unified model**).

Quasars were far more common when the universe was a quarter of its present age, and today's quiet galaxies all harbour dormant black holes whose masses track the mass of their bulges. Galaxies and black holes evidently grew together, with quasar winds regulating star formation. Read OpenStax 27.1 and 28.4 and watch Yale lecture 20.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 28.4 The Challenge of Dark Matter',
              url: 'https://openstax.org/books/astronomy-2e/pages/28-4-the-challenge-of-dark-matter',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 27.1 Quasars',
              url: 'https://openstax.org/books/astronomy-2e/pages/27-1-quasars',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 27.2 Supermassive Black Holes and 27.3 Quasars as Probes of Evolution.',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 20: Dark Matter',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-20',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
            },
            {
              title: 'SDSS SkyServer DR18 — Explore tool (quasar spectra)',
              url: 'https://skyserver.sdss.org/dr18/VisualTools',
              type: 'dataset',
              cost: 'free',
              provider: 'SDSS',
              note: 'Search for objects with class QSO to inspect real quasar spectra and redshifts.',
            },
          ],
          exercises: [
            {
              slug: 'cluster-virial-mass',
              title: 'Weigh a galaxy cluster',
              prompt:
                'The Coma cluster has a velocity dispersion of about 1000 km/s and a radius of about 3 Mpc. Use the virial estimate M = 5 sigma^2 R / G (a common approximation) to compute its mass in solar masses. The cluster contains about 1000 galaxies with an average stellar mass of 1e11 solar masses and hot gas totalling about five times the stellar mass. What fraction of the mass is dark? Compare with the cosmic average of 84 percent of matter being dark.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'quasar-size-from-variability',
              title: 'How small is a quasar?',
              prompt:
                'A quasar with luminosity 1e40 W doubles its brightness in 3 days. Explain why the emitting region can be no larger than the light travel distance in that time, and compute that size in AU. Compute the Schwarzschild radius of a 1e9 solar-mass black hole and compare. Then compute the mass accretion rate (in solar masses per year) needed to supply the luminosity at 10 percent efficiency, and the Eddington luminosity L_Edd = 1.26e31 (M/Msun) W for this black hole.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'quasar-spectrum',
              title: 'Read a quasar spectrum',
              prompt:
                'In SkyServer, find a quasar with z between 2 and 3 (SQL: SELECT TOP 10 plate, mjd, fiberid, z FROM SpecObj WHERE class = \'QSO\' AND z BETWEEN 2 AND 3). Open its spectrum in Explore. Identify the Lyman-alpha (121.6 nm rest), C IV (154.9 nm) and C III] (190.9 nm) emission lines, verify the redshift from their observed wavelengths, and note the forest of absorption lines blueward of Lyman-alpha. Explain what causes the Lyman-alpha forest and compute the lookback time to the quasar for H0 = 70 (use astropy.cosmology).',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Give three independent lines of evidence for dark matter.',
              answerOutline:
                'Flat galaxy rotation curves; galaxy cluster dynamics and hot gas temperatures; gravitational lensing mass maps (plus CMB and structure formation).',
            },
            {
              question: 'Why cannot dark matter be ordinary matter in dim form?',
              answerOutline:
                'Big Bang nucleosynthesis limits baryons to ~5 percent of the critical density; microlensing surveys rule out enough compact objects; the CMB power spectrum separates baryonic from non-baryonic matter.',
            },
            {
              question: 'Why must quasars be powered by black holes rather than stars?',
              answerOutline:
                'Variability on days limits the size to light-days; stars cannot produce 10^13 solar luminosities in such a volume, but accretion onto a supermassive black hole converts mass to energy with ~10 percent efficiency.',
            },
          ],
        },
        {
          slug: 'the-big-bang-and-the-cmb',
          title: 'The Big Bang, the cosmic microwave background and dark energy',
          summary:
            'The three pillars of the Big Bang (expansion, CMB, light-element abundances), the universe\'s age and composition, and the discovery that expansion is accelerating.',
          estimatedMinutes: 110,
          objectives: [
            'Explain what the Big Bang model does and does not claim and how the universe\'s age is determined',
            'Describe the origin and properties of the cosmic microwave background and what its tiny fluctuations encode',
            'Explain how Big Bang nucleosynthesis predicts the helium and deuterium abundances',
            'Describe the supernova evidence for accelerating expansion and the cosmic inventory (5/27/68 percent)',
          ],
          concepts: [
            'Expansion, lookback time and the age of the universe',
            'Cosmic microwave background: 2.725 K blackbody',
            'Recombination and the surface of last scattering',
            'CMB anisotropies and acoustic peaks',
            'Big Bang nucleosynthesis: 25 percent helium',
            'Accelerating expansion and dark energy',
            'Critical density and flatness',
            'Inflation',
          ],
          explanation: `Hubble's law says the universe was denser and hotter in the past. The **Big Bang** model follows that back to a hot, dense early state 13.8 billion years ago; it is not an explosion into pre-existing space but the expansion of space itself, and it says nothing about a "before". Three independent observations hold the model up.

**First**, the expansion, measured now with Type Ia supernovae and galaxy surveys, gives an age of 13.8 billion years when combined with the known matter and energy content, consistent with the ages of the oldest stars (globular clusters at 12-13 billion years, which was not guaranteed).

**Second**, the **cosmic microwave background** (CMB). When the universe was 380,000 years old and 3000 K, electrons and protons combined into neutral hydrogen and the fog cleared; the light released then has been redshifted by a factor of 1100 to a 2.725 K blackbody filling the sky in every direction, a spectrum more perfect than any laboratory source. Predicted in 1948 and found by accident in 1965, it is the afterglow of the early universe. Its temperature varies by only one part in 100,000 across the sky, but those fluctuations, mapped by COBE, WMAP and Planck, are the seeds of all later structure and their pattern (the **acoustic peaks**) measures the geometry and contents of the universe.

**Third**, **Big Bang nucleosynthesis**. In the first three minutes the universe was a fusion reactor; its expansion froze out about 25 percent helium by mass, with traces of deuterium and lithium, before it cooled too far to make anything heavier. The observed abundances in the most primitive gas match, and the deuterium fraction fixes the density of ordinary matter at 5 percent of the total.

In 1998 supernova surveys found distant explosions fainter than expected: the expansion is **accelerating**, driven by **dark energy** making up 68 percent of the universe, with dark matter 27 percent and atoms 5 percent. The universe is spatially flat, and a brief early period of **inflation** explains why. Read OpenStax 29.1 and 29.4, watch Yale lectures 21 and 23, then compute ages and distances with astropy.cosmology.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 29.1 The Age of the Universe',
              url: 'https://openstax.org/books/astronomy-2e/pages/29-1-the-age-of-the-universe',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 29.2 A Model of the Universe and 29.3 The Beginning of the Universe.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 29.4 The Cosmic Microwave Background',
              url: 'https://openstax.org/books/astronomy-2e/pages/29-4-the-cosmic-microwave-background',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 29.5-29.7 on the cosmic inventory and inflation.',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 21: Dark Energy and the Accelerating Universe',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-21',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              note: 'Lecture 23 covers the CMB constraints.',
            },
            {
              title: 'astropy.cosmology documentation',
              url: 'https://docs.astropy.org/en/stable/cosmology/index.html',
              type: 'documentation',
              cost: 'free',
              provider: 'Astropy',
              note: 'Compute ages, lookback times and distances for any redshift with Planck18.',
            },
          ],
          exercises: [
            {
              slug: 'cmb-wien',
              title: 'The CMB as a blackbody',
              prompt:
                'The CMB is a 2.725 K blackbody. Compute its peak wavelength with Wien\'s law and the photon number density (about 2e7 photons per cubic metre per K^3 times T^3). Compare with the baryon density of about 0.25 per cubic metre to get the photon-to-baryon ratio. At recombination (z = 1100) what were the CMB temperature and peak wavelength? Explain why hydrogen stayed ionised above about 3000 K even though 13.6 eV corresponds to 160,000 K.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'cosmology-calculator',
              title: 'Ages and distances with astropy.cosmology',
              prompt:
                'Using astropy.cosmology.Planck18, tabulate for z = 0.1, 0.5, 1, 2, 6, 10 and 1100: the lookback time, the age of the universe at that redshift, the comoving distance and the luminosity distance. Plot age against z. Then explain in a paragraph why the luminosity distance to z = 1100 (about 14,000 Mpc) is larger than c times the age of the universe, and why that is not a contradiction.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'critical-density',
              title: 'The critical density',
              prompt:
                'Derive the critical density rho_c = 3 H0^2 / (8 pi G) by setting the kinetic energy of a shell of expanding matter equal to its gravitational potential energy. Evaluate it for H0 = 70 km/s/Mpc in kg/m^3 and in hydrogen atoms per cubic metre. Using the inventory 5/27/68 percent, compute the density of ordinary matter and compare with the mean density of the Milky Way (about 1e11 solar masses in a 15 kpc radius sphere).',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the three main observational pillars of the Big Bang?',
              answerOutline:
                'The Hubble expansion, the cosmic microwave background with its blackbody spectrum, and the primordial abundances of helium and deuterium.',
            },
            {
              question: 'Why is the CMB a microwave signal if it was emitted as visible/infrared light at 3000 K?',
              answerOutline:
                'Expansion by a factor of 1100 since recombination stretched the wavelengths by the same factor, cooling the blackbody to 2.7 K.',
            },
            {
              question: 'What observation showed that the expansion is accelerating?',
              answerOutline:
                'Distant Type Ia supernovae are fainter (farther) than expected for a decelerating universe, implying expansion sped up over the last several billion years.',
            },
          ],
          relatedLessons: ['galaxies-cosmology/the-early-universe-and-cmb/recombination-and-the-cosmic-microwave-background'],
        },
      ],
    },
    {
      slug: 'life-in-the-universe-and-how-astronomers-work',
      title: 'Life in the Universe and How Astronomers Work',
      description:
        'Exoplanets and habitability as a bridge to the planetary-science subject, and the practical craft of modern astronomy: archives, citizen science, papers and the observing community.',
      lessons: [
        {
          slug: 'exoplanets-everywhere',
          title: 'Exoplanets: a first look',
          summary:
            'How planets around other stars are found, what the thousands discovered look like as a population, and what surprised astronomers.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the radial-velocity and transit methods and what each measures',
            'Describe the exoplanet population (hot Jupiters, super-Earths, compact multi-planet systems) and the selection effects shaping it',
            'Compute a planet\'s radius from a transit depth and its orbital distance from its period',
            'Query the NASA Exoplanet Archive and plot the confirmed planets',
          ],
          concepts: [
            'Radial-velocity wobble and minimum mass',
            'Transit depth $(R_p/R_*)^2$',
            'Hot Jupiters and migration',
            'Super-Earths and sub-Neptunes',
            'Occurrence rates and selection effects',
            'Kepler, TESS and the Exoplanet Archive',
          ],
          explanation: `Until 1995 the only planets known were our own. Today over 6,000 are confirmed, mostly by two methods. In the **radial-velocity** method the star's spectral lines shift back and forth as the planet tugs it around their common centre of mass; the period gives the orbit and the velocity amplitude gives the planet's mass times $\\sin i$, a **minimum mass** because the inclination is usually unknown. Jupiter makes the Sun wobble at 12 m/s; Earth at 9 cm/s. In the **transit** method the planet crosses the star's face and blocks a fraction of its light equal to the ratio of areas,
$$\\delta = \\left(\\frac{R_p}{R_*}\\right)^2 ,$$
1 percent for Jupiter across the Sun, 0.008 percent for Earth. Transits give the radius, the period gives the orbital distance via Kepler's third law, and combined with a radial-velocity mass you get the density and hence the composition. Kepler stared at 150,000 stars for four years and found thousands of transiting planets; TESS now surveys the whole sky for bright, nearby ones that can be followed up.

The population surprised everyone. **Hot Jupiters** orbit in days, closer than Mercury, where they cannot have formed; they must have **migrated** inward through the disk. The most common planets have sizes between Earth and Neptune (**super-Earths** and **sub-Neptunes**), a class absent from our solar system. Many stars host compact systems of several planets packed inside Mercury's orbit. Roughly one star in five has a rocky planet in its habitable zone.

Beware **selection effects**: both methods favour big planets close to their stars, so the raw catalogue exaggerates them, and occurrence rates must be corrected for what could have been detected. Read OpenStax 21.4 and 21.5, watch Yale lectures 4 and 5, then make your own plots from the Exoplanet Archive. The planetary-science subject treats each method quantitatively.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 21.4 Planets beyond the Solar System: Search and Discovery',
              url: 'https://openstax.org/books/astronomy-2e/pages/21-4-planets-beyond-the-solar-system-search-and-discovery',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 21.5 Exoplanets Everywhere: What We Are Learning',
              url: 'https://openstax.org/books/astronomy-2e/pages/21-5-exoplanets-everywhere-what-we-are-learning',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'Open Yale ASTR 160 — Lecture 4: Discovering Exoplanets: Hot Jupiters',
              url: 'https://oyc.yale.edu/astronomy/astr-160/lecture-4',
              type: 'lecture',
              cost: 'free',
              provider: 'Open Yale Courses',
              note: 'Lecture 5 covers transits.',
            },
            {
              title: 'NASA Exoplanet Archive — Planetary Systems table',
              url: 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=PS',
              type: 'dataset',
              cost: 'free',
              provider: 'NASA / Caltech IPAC',
              note: 'Download the full table as CSV, or query it with the TAP service.',
            },
            {
              title: 'NASA Science — Exoplanets',
              url: 'https://science.nasa.gov/exoplanets/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
            },
          ],
          exercises: [
            {
              slug: 'exoplanet-archive-plots',
              title: 'Plot the exoplanet population',
              prompt:
                'Download the Planetary Systems Composite Parameters table (PSCompPars) from the NASA Exoplanet Archive as CSV (or query it via TAP with astroquery). Plot planet mass against orbital period on log axes, colouring points by discovery method. Then plot radius against period. Mark the solar system planets. Identify the hot Jupiters, the super-Earth/sub-Neptune population and the radius gap near 1.8 Earth radii. Write a paragraph on which regions are empty because of physics and which because of selection effects.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'transit-and-rv-arithmetic',
              title: 'From light curve to planet',
              prompt:
                'A Sun-like star (R = 1 Rsun, M = 1 Msun) shows transits 0.6 percent deep every 3.52 days with radial-velocity amplitude 56 m/s. Compute the planet\'s radius in Jupiter and Earth radii, its semi-major axis in AU, its mass (assume an edge-on orbit, use K = (2 pi G / P)^(1/3) Mp / M*^(2/3)), its density, and its equilibrium temperature. What kind of planet is it? (This is approximately HD 209458 b.)',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'detectability-earth-twin',
              title: 'Could we find Earth?',
              prompt:
                'Compute the transit depth, transit duration (for a central transit, about P R*/(pi a)), radial-velocity amplitude and transit probability (R*/a) for an Earth twin around a Sun twin. Compare with the typical precision of TESS (about 200 parts per million per hour for a bright star) and of the best spectrographs (about 0.3 m/s). Explain why Earth twins remain at the edge of detectability and which method is closer.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the radial-velocity method give only a minimum mass?',
              answerOutline:
                'It measures the velocity component along the line of sight, M_p sin i; the inclination i is unknown unless the planet also transits.',
            },
            {
              question: 'A transit is 1 percent deep. What is the planet-to-star radius ratio?',
              answerOutline: '0.1 (square root of 0.01); a Jupiter around a Sun-like star.',
            },
            {
              question: 'Why were hot Jupiters so surprising?',
              answerOutline:
                'Giant planets need ices beyond the frost line to form; finding them at 0.05 AU implies they migrated inward after forming.',
            },
          ],
          relatedLessons: ['planetary-science-exoplanets/exoplanet-detection-methods/the-transit-method'],
        },
        {
          slug: 'habitability-and-the-search-for-life',
          title: 'Habitability and the search for life',
          summary:
            'What life needs, where in the solar system and beyond it might exist, the habitable zone, biosignatures, and the Drake equation as a way of organising ignorance.',
          estimatedMinutes: 90,
          objectives: [
            'List the requirements for life as we know it and identify the solar-system environments that may meet them',
            'Define the habitable zone and compute its boundaries for stars of different luminosity',
            'Explain what a biosignature is and why oxygen, methane and their combination matter',
            'Use the Drake equation to structure an estimate and identify which factors are known and which are guesses',
          ],
          concepts: [
            'Requirements: liquid water, energy, carbon chemistry, time',
            'Extremophiles and the range of habitable conditions',
            'Habitable zone scaling $d \\propto \\sqrt{L}$',
            'Mars, Europa, Enceladus, Titan as targets',
            'Biosignature gases and false positives',
            'Drake equation',
            'Fermi paradox and SETI',
          ],
          explanation: `Life as we know it needs liquid water, a source of energy, carbon-based chemistry and time. Earth's **extremophiles** show the envelope is wide: organisms thrive in boiling vents, acid, ice and rock kilometres underground, feeding on chemical energy without sunlight. That widens the search. In the solar system, **Mars** had rivers and lakes 3.5 billion years ago and still has subsurface ice; **Europa** and **Enceladus** have global oceans beneath ice, warmed by tides and in contact with rock, with Enceladus venting organics in its plumes; **Titan** has an exotic chemistry in liquid methane. Missions to each are flying or planned.

For exoplanets the first filter is the **habitable zone**, the range of distances where a planet with an Earth-like atmosphere could keep liquid water on its surface. Since a planet's temperature depends on the flux it receives, the zone scales with the square root of the star's luminosity: $d_{\\rm HZ} \\approx d_\\oplus \\sqrt{L/L_\\odot}$, roughly 0.95 to 1.7 AU for the Sun. A star with 1 percent of the Sun's luminosity has its zone at 0.1 AU, where planets are tidally locked and bathed in flares; whether such worlds are habitable is an open question, and it matters because most stars are red dwarfs.

Finding life means finding **biosignatures**: atmospheric gases hard to explain without biology. Oxygen (from photosynthesis) alongside methane (which oxygen should destroy) is the classic pair; Earth seen from afar would show both, plus the red edge of vegetation. But abiotic processes can mimic some signatures (oxygen from water photolysis on a dried-out planet), so claims will need multiple lines of evidence. JWST is already measuring the atmospheres of small planets; a future large space telescope aims at Earth twins.

The **Drake equation** multiplies the star formation rate by the fractions with planets, habitable planets, life, intelligence, technology and the lifetime of civilisations. Its value is not an answer but a map of ignorance: the first three factors are now measured; the rest are guesses. Read OpenStax 30.1, 30.3 and 30.4 and compute habitable zones yourself.`,
          resources: [
            {
              title: 'OpenStax Astronomy 2e — 30.1 The Cosmic Context for Life',
              url: 'https://openstax.org/books/astronomy-2e/pages/30-1-the-cosmic-context-for-life',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Then 30.2 Astrobiology.',
              primary: true,
            },
            {
              title: 'OpenStax Astronomy 2e — 30.3 Searching for Life beyond Earth',
              url: 'https://openstax.org/books/astronomy-2e/pages/30-3-searching-for-life-beyond-earth',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'OpenStax Astronomy 2e — 30.4 The Search for Extraterrestrial Intelligence',
              url: 'https://openstax.org/books/astronomy-2e/pages/30-4-the-search-for-extraterrestrial-intelligence',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
            },
            {
              title: 'NASA Astrobiology',
              url: 'https://astrobiology.nasa.gov/',
              type: 'article',
              cost: 'free',
              provider: 'NASA',
              note: 'Current missions and research on habitability and biosignatures.',
            },
          ],
          exercises: [
            {
              slug: 'habitable-zones',
              title: 'Habitable zones for real stars',
              prompt:
                'Using inner and outer habitable-zone limits of 0.95 and 1.7 AU for the Sun, compute the zone for Proxima Centauri (L = 0.0017 Lsun), TRAPPIST-1 (L = 0.00055), Tau Ceti (L = 0.52), Sirius A (L = 25) and a 10 Lsun star. For each, compute the orbital period at the centre of the zone, and whether a planet there would be tidally locked (locking timescale is short inside about 0.1-0.2 AU for small stars). Look up which of these stars have known planets in or near their zone in the Exoplanet Archive.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'drake-equation-ranges',
              title: 'Drake equation with honest uncertainties',
              prompt:
                'For each factor of the Drake equation, write down your best estimate and a plausible range, citing a source where a measurement exists (star formation rate, fraction with planets, habitable planets per system from Kepler occurrence rates). Compute the result for the optimistic, central and pessimistic cases. Then write a page on which single factor dominates the uncertainty and what observation could narrow it.',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'biosignature-false-positives',
              title: 'Could oxygen fool us?',
              prompt:
                'Research and explain in two pages one abiotic mechanism that could produce an oxygen-rich atmosphere on a lifeless planet (for example, photolysis of water with hydrogen escape on a planet that lost its oceans, or CO2 photolysis around M dwarfs). Describe what additional measurements (other gases, the planet\'s position relative to the habitable zone, the star\'s ultraviolet output) would distinguish the abiotic case from biology.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the habitable zone scale with the square root of stellar luminosity?',
              answerOutline:
                'Equilibrium temperature depends on received flux L/d^2; keeping the flux constant requires d proportional to sqrt(L).',
            },
            {
              question: 'Why is oxygen alone not a conclusive biosignature?',
              answerOutline:
                'Abiotic processes such as water photolysis with hydrogen escape can build up oxygen; the combination with methane (which oxygen destroys) and planetary context is needed.',
            },
            {
              question: 'Which Drake equation factors are now measured and which are guesses?',
              answerOutline:
                'Star formation rate, fraction of stars with planets and habitable planets per star are measured (Kepler, Gaia); the fraction that develop life, intelligence and technology, and civilisation lifetime, are unknown.',
            },
          ],
          relatedLessons: ['planetary-science-exoplanets/exoplanet-characterisation-and-habitability/the-habitable-zone-and-planetary-climate'],
        },
        {
          slug: 'how-astronomers-work',
          title: 'How astronomers work: archives, papers and citizen science',
          summary:
            'The practical craft: where the data live, how to read a research paper, how to take part in real science as an amateur, and how to go on from here.',
          estimatedMinutes: 90,
          objectives: [
            'Locate data for any object or topic in the major archives (SIMBAD, NASA ADS, MAST, Gaia, SDSS, Exoplanet Archive)',
            'Read an astronomy research paper strategically: abstract, figures, conclusions, then methods',
            'Contribute observations or classifications to a real project (AAVSO, Zooniverse)',
            'Plan the next steps of your own study using the structure of this curriculum',
          ],
          concepts: [
            'SIMBAD and VizieR: object and catalogue lookup',
            'NASA ADS and arXiv: the literature',
            'MAST, Gaia Archive, SDSS SkyServer, Exoplanet Archive',
            'Anatomy of a research paper',
            'Citizen science and amateur contributions',
            'Proposals, telescope time and the data lifecycle',
            'Reproducibility and open data',
          ],
          explanation: `Modern astronomy is mostly done at a keyboard. Almost every professional observation ends up in a public **archive** after a short proprietary period, and the catalogues built from them are open to anyone. Knowing where things live is a skill in itself. For any named object, **SIMBAD** gives coordinates, identifiers, basic data and a bibliography; **VizieR** holds thousands of published catalogues. For the literature, the **NASA Astrophysics Data System** (ADS) indexes every paper, and nearly all new ones appear free on **arXiv** (astro-ph) the day they are submitted. For data, **MAST** holds Hubble, Webb, Kepler and TESS; the **Gaia Archive** holds positions and motions for two billion stars; **SDSS SkyServer** holds images and spectra for millions of objects; the **NASA Exoplanet Archive** holds every known planet; HEASARC holds X-ray and gamma-ray missions. Most are queryable in SQL-like languages or from Python with astroquery, which the observational-astronomy subject teaches in depth.

Reading papers is a skill too. Read the abstract, then look at every figure and read its caption, then the conclusions. Only then decide whether the methods section is worth your time. Ask of every paper: what was measured, with what instrument, what was assumed, and what is the uncertainty? **Astrobites** summarises a paper a day at a level written for undergraduates and is the best bridge from textbooks to the literature.

Amateurs still matter. The **AAVSO** has coordinated variable-star observations for over a century, and visual, DSLR or CCD estimates you submit become part of light curves professionals use. **Zooniverse** projects (Galaxy Zoo, Planet Hunters TESS) have discovered new classes of galaxy and dozens of planets from volunteer classifications. Comets and novae are still found by amateurs.

Finally, note how astronomers get telescope time: by writing a short **proposal** that is peer-reviewed against others for the same nights. Practise by writing one in the exercises. Then decide your path: observational astronomy and data analysis, planetary science and exoplanets, or stellar astrophysics are the natural next subjects.`,
          resources: [
            {
              title: 'SIMBAD astronomical database',
              url: 'https://simbad.cds.unistra.fr/simbad/',
              type: 'dataset',
              cost: 'free',
              provider: 'CDS Strasbourg',
              note: 'Look up any object by name; follow the links to VizieR catalogues and ADS references.',
            },
            {
              title: 'NASA Astrophysics Data System (ADS)',
              url: 'https://ui.adsabs.harvard.edu/',
              type: 'documentation',
              cost: 'free',
              provider: 'NASA / Harvard',
              note: 'The literature search engine; most papers link to free arXiv versions.',
            },
            {
              title: 'Astrobites',
              url: 'https://astrobites.org/',
              type: 'article',
              cost: 'free',
              provider: 'Astrobites collaboration',
              note: 'Daily readable summaries of new papers, plus guides on reading papers and applying to graduate school.',
            },
            {
              title: 'AAVSO — American Association of Variable Star Observers',
              url: 'https://www.aavso.org/',
              type: 'interactive',
              cost: 'free',
              provider: 'AAVSO',
              note: 'Observing manuals (visual, DSLR, CCD), finder charts and the light-curve generator.',
            },
            {
              title: 'Planet Hunters TESS (Zooniverse)',
              url: 'https://www.zooniverse.org/projects/nora-dot-eisner/planet-hunters-tess',
              type: 'interactive',
              cost: 'free',
              provider: 'Zooniverse',
              note: 'Classify real TESS light curves; several planets have been found this way.',
            },
          ],
          exercises: [
            {
              slug: 'object-dossier',
              title: 'Archive dossier on one object',
              prompt:
                'Choose a bright star, a nearby galaxy and an exoplanet host. For each, use SIMBAD to record coordinates, spectral type/classification, parallax or redshift, and the number of papers referencing it; find it in Gaia or SDSS and record one measured quantity; find it in MAST and list which missions observed it; and find the most-cited paper about it on ADS. Present the three dossiers as a one-page table with links.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'read-a-paper',
              title: 'Read and summarise a research paper',
              prompt:
                'Pick a recent Astrobites post on a topic from this subject, then read the original paper on arXiv. Write a one-page summary in your own words: the question, the data and instrument, the key figure (describe it), the main result with its uncertainty, and one limitation the authors acknowledge. Compare your summary with the Astrobites version and note what you missed.',
              kind: 'reading',
              difficulty: 2,
            },
            {
              slug: 'citizen-science-contribution',
              title: 'Contribute to real science',
              prompt:
                'Do one of: (a) submit at least five variable-star brightness estimates to the AAVSO for a star on their current alert or a bright Mira variable, following their visual or DSLR manual; (b) classify at least 200 light curves on Planet Hunters TESS and write up one candidate you flagged, including why it might be a false positive (eclipsing binary, systematics). Document your workflow and what you learned about data quality.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'write-a-proposal',
              title: 'Write a one-page observing proposal',
              prompt:
                'Write a one-page proposal for two hours on a 1 m robotic telescope (use the Las Cumbres Observatory instrument specifications): scientific justification (what question, why it matters), target list with coordinates and magnitudes, required signal-to-noise and exposure times (estimate using the telescope\'s aperture and the magnitude), and what you will do with the data. Have someone else review it for clarity.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where would you look for the parallax of a star, the spectrum of a galaxy and the light curve of a planet host?',
              answerOutline: 'Gaia Archive (or SIMBAD summary); SDSS SkyServer; MAST (Kepler/TESS) via lightkurve or the portal.',
            },
            {
              question: 'What four questions should you ask of any research paper?',
              answerOutline:
                'What was measured, with what instrument/data, what was assumed, and what is the uncertainty (and what do the authors say are the limitations).',
            },
            {
              question: 'Name two ways amateurs still contribute to professional astronomy.',
              answerOutline:
                'Variable-star monitoring through AAVSO; citizen-science classification on Zooniverse (Galaxy Zoo, Planet Hunters); also comet/nova discovery and exoplanet transit timing.',
            },
          ],
          relatedLessons: ['observational-astronomy/surveys-and-archives/mast-and-space-mission-archives'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'observing-log-and-measurement',
    title: 'Capstone: an observing log and a quantitative measurement',
    description: `Keep a structured observing log for at least eight sessions over two months (naked eye, binoculars, a small telescope, or a robotic telescope such as the Las Cumbres Observatory network if you can get time): date, time, site, conditions, what you observed, sketches or images, and what surprised you. Each session should test at least one prediction you made in advance with Stellarium or a calculation.

Then carry out one quantitative project from this list (or propose your own at the same level) and write it up as a short scientific report with method, data, analysis, uncertainty and conclusion:

- **Measure the Moon's distance** from the size of Earth's shadow during a lunar eclipse, or from the Moon's parallax using images taken simultaneously from two distant sites (coordinate with a friend or use online observatory images).
- **Measure the Sun's rotation period** from the daily motion of sunspots in SDO/HMI images (freely downloadable), including the correction for Earth's orbital motion.
- **Measure the age of a star cluster** by building its colour-magnitude diagram from Gaia DR3 photometry (query the archive for members of the Pleiades, Hyades or M67 by proper motion and parallax) and locating the main-sequence turn-off against isochrone estimates.
- **Measure the Hubble constant** from SDSS galaxy redshifts and a simple distance proxy, discussing honestly why the result is crude.

The point is not the final number but the chain of reasoning from raw observation to physical quantity with an uncertainty you can defend.`,
    deliverables: [
      'An observing log of at least eight sessions with predictions, observations and reflections',
      'A 4-8 page report on one quantitative measurement including raw data, method, result with uncertainty, and comparison with the accepted value',
      'Code or spreadsheet used for the analysis, reproducible from the raw data',
      'A one-page "what I would do differently" critique of your own method',
    ],
    estimatedHours: 15,
    stretchGoals: [
      'Submit variable-star estimates to the AAVSO and compare your light curve with the database',
      'Classify 500 galaxies on Galaxy Zoo and compare your morphology-colour relation with the published one',
      'Repeat the cluster-age project for a second cluster and explain the difference in turn-off',
    ],
  },
  masteryChecklist: [
    'I can predict what the sky will look like from any latitude at any time and explain seasons, phases and eclipses geometrically',
    'I can apply Kepler\'s third law in Newton\'s form to weigh the Sun, a planet or a galaxy\'s central black hole',
    'I can use the inverse-square law, Wien\'s law and the Stefan-Boltzmann law together to get luminosity, temperature and radius of a star',
    'I can read a spectrum: identify lines, classify the spectrum type, and measure a radial velocity or redshift',
    'I can explain the structure and formation of the solar system and account for the differences between terrestrial and giant planets',
    'I can place a star on the H-R diagram from its colour and luminosity and narrate its past and future life',
    'I can explain the evidence for dark matter, the expansion of the universe and the Big Bang, and the role of the CMB',
    'I can query a real archive (Gaia, SDSS) and turn a table of numbers into a diagram that tests a physical idea',
    'I have kept an observing log and completed a quantitative measurement with an honest uncertainty',
  ],
});
