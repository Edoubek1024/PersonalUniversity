import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const ostx = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `OpenStax Chemistry 2e: ${title}`,
  url: `https://openstax.org/books/chemistry-2e/pages/${slug}`,
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary,
});

const cc = (id: number, title: string, note: string, primary = false): ResourceInput => ({
  title: `ChemCollective virtual lab: ${title}`,
  url: `https://chemcollective.org/activities/vlab/${id}`,
  type: 'interactive',
  cost: 'free',
  provider: 'ChemCollective (Carnegie Mellon University)',
  note,
  primary,
});

const phet = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `PhET simulation: ${title}`,
  url: `https://phet.colorado.edu/en/simulations/${slug}`,
  type: 'interactive',
  cost: 'free',
  provider: 'PhET Interactive Simulations, University of Colorado Boulder',
  note,
  primary,
});

const smc = (path: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `LibreTexts lab manual: ${title}`,
  url: `https://chem.libretexts.org/Ancillary_Materials/Laboratory_Experiments/Wet_Lab_Experiments/General_Chemistry_Labs/Online_Chemistry_Lab_Manual/${path}`,
  type: 'textbook',
  cost: 'free',
  provider: 'LibreTexts (Santa Monica College general chemistry lab manual)',
  note,
  primary,
});

const mit = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `MIT Digital Lab Techniques Manual: ${title}`,
  url: `https://ocw.mit.edu/courses/res-5-0001-digital-lab-techniques-manual-spring-2007/resources/${slug}/`,
  type: 'video',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
  primary,
});

const pubchem = (name: string, note: string): ResourceInput => ({
  title: `PubChem: ${name.replace(/-/g, ' ')} (safety and hazards section)`,
  url: `https://pubchem.ncbi.nlm.nih.gov/compound/${name}`,
  type: 'documentation',
  cost: 'free',
  provider: 'US National Library of Medicine',
  note,
});

export default defineSubject({
  id: 'general-chemistry-lab-1',
  title: 'General Chemistry Lab I',
  category: 'chemistry',
  tagline:
    'The first-year chemistry laboratory, done at home: measurement and uncertainty, eight simulated experiments that behave like the real ones, and a full lab report for each.',
  description: `A chemistry laboratory course teaches three things a lecture cannot: how to measure (and how well a measurement can be trusted), how a quantitative experiment turns readings into a result, and how to write that result up so someone else can check it. This course follows the topics of CHEM 103, General Chemistry Lab I, at the University of Illinois Urbana-Champaign, which the catalog describes as laboratory studies to accompany CHEM 102 (one credit hour, taken with or after CHEM 102). Its experiments follow the Illinois lab schedule: equipment and the balance, the Mohr pipet and serial dilutions, Beer's law and food dyes, titrations and the buret, the empirical formula, calorimetry and changes of state, the enthalpy of formation of magnesium oxide by Hess's law, and Le Chatelier's principle, with a gas-collection experiment added from the standard first-semester repertoire. It is an original course built from public information, and it is not affiliated with or endorsed by the University of Illinois.

You are assumed to be working alone, without a teaching laboratory. So each experiment is run in a **simulator in the browser** that behaves like the bench: you decide how much to weigh, when to stop a titration, which wavelength to use and when to mix; you read a burette meniscus, a balance and a thermometer at their real precision; and the data carry realistic random and systematic errors, seeded so every attempt is different. The simulator never hands you the answer: you record your own readings, analyse them in a spreadsheet, and only then compare your result with the sample's true value. The chemistry and physics inside (charge-balance pH, Newton cooling in the calorimeter, stray light in the spectrophotometer, vapour pressure over water) are the real thing, with sources stated.

Every experiment has a pre-lab (the chemistry, the method, the hazards of the real reagents and pre-lab questions), the experiment itself, an analysis lesson (calculations, uncertainty, what good data look like, common errors) and a **lab report** written into a template with its own grading rubric, saved in your browser and downloadable as Markdown. Free virtual labs from ChemCollective and PhET and open lab manuals from LibreTexts are linked as extra practice.

What a simulator cannot give you is said plainly throughout: bench technique (swirling a flask, a steady hand on a stopcock), the judgement that comes from real hazards, and the feel of real glassware. If you later work in a real laboratory, expect to need supervised practice; this course gets the thinking, the arithmetic and the writing out of the way first. A few genuinely safe kitchen activities, with household materials only, are offered where they help.`,
  difficulty: 'beginner',
  estimatedHours: 86,
  prerequisites: [],
  recommendedBackground: [
    'Take it alongside General Chemistry I (general-chemistry-1 here), as CHEM 103 is taken alongside CHEM 102 at Illinois: the pre-labs assume the lecture topics of the same weeks (moles, stoichiometry, gases, thermochemistry, equilibrium)',
    'High-school algebra and logarithms (pH, absorbance)',
    'A spreadsheet program (Excel, LibreOffice Calc or Google Sheets); no programming is needed',
  ],
  tags: ['chemistry', 'laboratory', 'measurement', 'uncertainty', 'titration', 'spectrophotometry', 'calorimetry', 'lab reports', 'simulation'],
  core: false,
  modules: [
    {
      slug: 'lab-practice',
      title: 'Laboratory Practice: Safety, Measurement and Reporting',
      description:
        'The habits every experiment depends on: working safely, choosing and reading glassware and balances, significant figures and uncertainty, keeping a notebook, the structure of a lab report, and fitting straight lines in a spreadsheet.',
      lessons: [
        {
          slug: 'safety-and-hazards',
          title: 'Laboratory safety and why it matters',
          summary:
            'How chemists think about hazards and risk: the RAMP framework, GHS pictograms and safety data sheets, protective equipment, emergencies, waste, and what is and is not safe to do at home.',
          estimatedMinutes: 90,
          objectives: [
            'Distinguish a hazard from a risk and apply the RAMP steps to a procedure',
            'Read the GHS pictograms, signal word and key sections of a safety data sheet',
            'State the correct first response to a chemical splash on skin or in the eyes',
            'Explain the rules for diluting acids, handling waste and working with heat',
            'Judge whether a proposed at-home activity is safe, and say why',
          ],
          concepts: [
            'Hazard versus risk',
            'RAMP: recognise, assess, minimise, prepare',
            'GHS pictograms and signal words',
            'Safety data sheet (SDS), 16 sections',
            'Splash goggles and eyewash (15 minutes)',
            'Add acid to water',
            'Waste segregation',
            'Incompatible household chemicals',
          ],
          explanation: `A **hazard** is a property of a substance or situation that can cause harm: concentrated hydrochloric acid is corrosive, a hot plate burns. A **risk** is the chance that the harm actually happens, given what you do. Good laboratory practice does not avoid hazards (chemistry needs them); it keeps the risk low. The American Chemical Society teaches this as **RAMP**: **R**ecognise the hazards, **A**ssess the risks, **M**inimise the risks, **P**repare for emergencies.

**Recognising hazards.** Every container of a laboratory chemical carries the Globally Harmonized System (GHS) label: a signal word (*Danger* is more severe than *Warning*), hazard statements, and red-bordered pictograms such as the corrosion symbol (acids and bases that destroy skin and eyes), the flame (flammable), the exclamation mark (irritant, harmful) and the health hazard silhouette. The **safety data sheet** (SDS) has 16 standard sections; the ones you will use most are 2 (hazards), 4 (first aid), 7 (handling and storage) and 8 (exposure controls and personal protection).

**Minimising risk.** Splash goggles whenever anyone in the room is working with chemicals (UIUC requires a specific model of indirectly vented goggles, and a lab coat); closed shoes; no food or drink; the smallest quantity and lowest concentration that will do; a fume hood for volatile or smelly reagents. When diluting a concentrated acid, **add the acid slowly to the water**, never the reverse: dissolving releases heat, and a little water dropped on a lot of acid can boil and spit acid out. Hot glass looks exactly like cold glass.

**Preparing for emergencies.** Know where the eyewash, safety shower and fire extinguisher are before you start. For a splash in the eyes, the first response is always the same: rinse at the eyewash for at least 15 minutes, holding the eyelids open. Never try to neutralise a burn with another chemical. Chemical waste goes in the labelled container for its class, never automatically down the sink.

**What this course can and cannot give you.** The simulators let you practise the thinking, the measurement and the arithmetic. They cannot teach the reflexes that come from handling real hazards, so if you ever work in a laboratory, take its safety training seriously. **At home**, the rule is: only household materials, nothing heated beyond a kettle, no flames, and never mix cleaning products (bleach with acids releases chlorine; bleach with ammonia releases chloramines). If in doubt, do not do it.

Read the ACS safety resources page first, then the OSHA pictogram card, and use PubChem's *Safety and Hazards* section for every reagent in this course.`,
          resources: [
            {
              title: 'ACS Committee on Chemical Safety: publications and resources (RAMP, Safety in Academic Chemistry Laboratories)',
              url: 'https://www.acs.org/about/governance/committees/chemical-safety/publications-resources.html',
              type: 'documentation',
              cost: 'free',
              provider: 'American Chemical Society',
              note: 'Start with the student guide to safety in academic laboratories and the RAMP materials.',
              primary: true,
            },
            {
              title: 'OSHA Hazard Communication: the GHS pictograms',
              url: 'https://www.osha.gov/hazcom/pictograms',
              type: 'documentation',
              cost: 'free',
              provider: 'US Occupational Safety and Health Administration',
              note: 'The nine pictograms and the hazard classes each one stands for.',
            },
            {
              title: 'Prudent Practices in the Laboratory: Handling and Management of Chemical Hazards (updated edition)',
              url: 'https://nap.nationalacademies.org/catalog/12654/prudent-practices-in-the-laboratory-handling-and-management-of-chemical-hazards-updated',
              type: 'textbook',
              cost: 'free',
              provider: 'National Research Council (National Academies Press)',
              note: 'The standard reference; read chapter 2 (culture of safety) and skim chapter 4 (evaluating hazards). Free to read online or download.',
            },
          ],
          exercises: [
            {
              slug: 'hazard-table',
              title: 'A hazard table for this course',
              prompt:
                'Using PubChem (Safety and Hazards section) or a supplier SDS, make a table for the reagents of this course: hydrochloric acid (1 M and 6 M), sodium hydroxide (0.1 M and 1 M), potassium hydrogen phthalate, phenolphthalein solution (in ethanol), magnesium ribbon, ammonium nitrate, silver nitrate, iron(III) nitrate, potassium thiocyanate and cobalt(II) chloride. Columns: GHS pictograms, signal word, the main hazard in one phrase, first aid for skin or eye contact, and the PPE you would use. Note where a dilute solution is much less hazardous than the concentrated one.',
              kind: 'reading',
              difficulty: 1,
              hint: 'PubChem lists GHS classifications from several notifiers; use the most common one and say so.',
            },
            {
              slug: 'ramp-titration',
              title: 'RAMP for a titration',
              prompt:
                'Write a RAMP assessment (about 250 words) for the titration of KHP with 0.1 M NaOH: recognise every hazard (chemical, glass, a burette clamped above eye level), assess which is most likely to cause an injury, list the controls that minimise each, and describe what you would do if NaOH splashed into an eye.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'safe-or-not',
              title: 'Safe at home or not?',
              prompt:
                'For each proposal, say whether it is safe at home, and why, in one or two sentences: (a) red-cabbage extract tested with vinegar, baking soda solution and lemon juice; (b) mixing bleach with a toilet-bowl cleaner to make it "stronger"; (c) measuring the density of sugar solutions with a kitchen scale and a measuring jug; (d) heating a sealed jar of vinegar and baking soda in the microwave; (e) dissolving table salt in water and measuring the temperature change.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Unsafe: (b) releases chlorine gas; (d) a sealed container that generates gas and is heated can burst. The others use household materials at room temperature.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between a hazard and a risk? Give an example from a titration.',
              answerOutline: 'A hazard is the potential to cause harm (1 M NaOH is corrosive to eyes); risk is the likelihood of harm in the actual activity (low with goggles and small volumes, high when filling a burette above eye level without goggles).',
            },
            {
              question: 'Why must acid be added to water rather than water to acid?',
              answerOutline: 'Dilution releases heat. Adding acid to a large volume of water spreads the heat; a little water added to concentrated acid can boil locally and spray acid.',
            },
            {
              question: 'Name four SDS sections you would read before using a new reagent and what each tells you.',
              answerOutline: 'Section 2 hazards (pictograms, signal word); 4 first aid; 7 handling and storage; 8 exposure controls and PPE. Also 13 disposal.',
            },
          ],
          quiz: [
            {
              question: 'A drop of 1 M NaOH splashes into your eye. What do you do first?',
              options: [
                'Rinse with a little dilute vinegar to neutralise the base',
                'Go to the eyewash and rinse for at least 15 minutes, holding the eyelids open',
                'Blot the eye with a clean tissue and carry on if it stops stinging',
                'Look up the first-aid section of the SDS before doing anything',
              ],
              answer: 1,
              explanation:
                'Immediate, prolonged rinsing with water is the first response to any chemical in the eye; every second counts with bases, which damage the cornea quickly. Neutralising with an acid adds a second chemical and heat. Reading the SDS comes after rinsing has started, ideally by someone else.',
            },
            {
              question: 'Which section of a safety data sheet tells you which gloves and eye protection to wear?',
              options: ['Section 2: Hazard identification', 'Section 4: First-aid measures', 'Section 8: Exposure controls and personal protection', 'Section 11: Toxicological information'],
              answer: 2,
              explanation:
                'Section 8 lists exposure limits and the personal protective equipment. Section 2 tells you what the hazards are (pictograms, signal word) but not how to protect yourself; section 11 gives toxicity data.',
            },
            {
              question: 'You need 100 mL of 1 M sulfuric acid from the concentrated (18 M) acid. How do you mix them?',
              options: [
                'Pour the measured concentrated acid slowly into most of the water, stirring, then make up to volume',
                'Pour the water slowly into the measured concentrated acid, stirring',
                'Pour both into an empty beaker at the same time so neither is in excess',
                'Add the water quickly to the acid so the mixing is over before it heats up',
              ],
              answer: 0,
              explanation:
                'Acid into water: the large mass of water absorbs the heat of dilution. Water added to concentrated acid can boil at the point of contact and spatter acid. Speed does not help; the heat is released wherever the two first meet.',
            },
            {
              question: 'Which of these is a safe at-home chemistry activity?',
              options: [
                'Mixing chlorine bleach with an acidic toilet cleaner to see the reaction',
                'Mixing bleach with an ammonia-based glass cleaner',
                'Heating vinegar and baking soda in a sealed jar to speed up the reaction',
                'Testing vinegar, lemon juice and baking-soda solution with red-cabbage extract',
              ],
              answer: 3,
              explanation:
                'Red-cabbage extract is a natural acid-base indicator and every material is food-safe at room temperature. Bleach with acid releases chlorine; bleach with ammonia releases toxic chloramines; heating a sealed vessel that makes CO₂ can burst it.',
            },
          ],
        },
        {
          slug: 'glassware-and-balances',
          title: 'Glassware, balances and reading a meniscus',
          summary:
            'Which glassware measures volume precisely and which only roughly, what class A tolerances mean, how to read a meniscus to one tenth of a division, and how to weigh properly on an analytical balance.',
          estimatedMinutes: 110,
          objectives: [
            'Choose the right glassware for a volume that must be approximate, precise or exact',
            'Read a burette, graduated cylinder or gas tube to one tenth of its smallest division',
            'Explain to-deliver (TD) and to-contain (TC) calibration and class A tolerances',
            'Weigh by difference and with a tare on an analytical balance, and name what makes a reading wrong',
            'Use the measurement bench simulator to compare the precision and accuracy of glassware',
          ],
          concepts: [
            'Beaker and flask marks: about ±5%',
            'Graduated cylinder',
            'Volumetric pipet and flask',
            'Burette: read by difference',
            'Meniscus, parallax, eye level',
            'Class A tolerance',
            'TD versus TC',
            'Analytical balance: 0.0001 g',
            'Tare and weighing by difference',
          ],
          explanation: `Glassware falls into three groups. **Beakers and Erlenmeyer flasks** have marks good to about ±5%: use them to hold, mix and heat, never to measure. **Graduated cylinders** measure to about ±1% (a 10 mL class A cylinder has a tolerance of ±0.10 mL). **Volumetric glassware** (pipets, flasks) and **burettes** are for quantitative work: a 10 mL class A volumetric pipet delivers 10.00 ± 0.02 mL; a 50 mL class A burette is good to ±0.05 mL. Pipets and burettes are calibrated **to deliver** (TD): the stated volume flows out, and the film left behind is allowed for. Volumetric flasks are calibrated **to contain** (TC).

**Reading a meniscus.** Water wets glass, so its surface curves up at the walls. Read the **bottom** of the meniscus with your eye level with it (looking from above or below shifts the reading: parallax). Estimate **one digit beyond the smallest graduation**: a burette is graduated every 0.1 mL, so you record 23.43 mL, not 23.4. Burette numbers increase **downward**, because they count the volume delivered from the top; a common mistake is to read the scale upward.

\`\`\`interactive
lab-balance
{"glassware": ["burette", "cylinder", "pipet", "beaker"], "unknown": false, "caption": "Fill the burette and read the magnified meniscus to 0.01 mL, remembering the numbers grow downward. Then deliver from each piece of glassware into the weighing beaker three times, reading the balance before and after each delivery. The scatter of the masses is the precision; their mean against the nominal volume is the accuracy."}
\`\`\`

**Balances.** A top-loading balance reads to 0.01 or 0.001 g; an **analytical balance** reads to 0.0001 g and has a draft shield, because air currents push on the pan. Close its doors before reading. **Tare** zeroes the display with a container on the pan; **weighing by difference** (container plus sample, then container after the sample is tipped out) cancels any offset of the balance. Never weigh a warm object: rising warm air lifts the pan and the reading is several milligrams light. Never put chemicals directly on the pan.

Watch the MIT videos on the balance and volumetric technique: they show the hand movements a simulator cannot. Then use the bench above until you can read a burette quickly and the same way every time.`,
          resources: [
            mit('volumetric-techniques', 'Volumetric techniques', 'Pipets, volumetric flasks and burettes handled properly: rinsing, filling to the mark, reading. About 15 minutes.'),
            mit('using-a-balance', 'Using a balance', 'Analytical balance technique: doors, taring, weighing by difference.'),
            {
              title: 'UC Davis Chem 4A laboratory manual: Calibration of volumetric glassware',
              url: "https://chem.libretexts.org/Courses/University_of_California_Davis/Chem_4A_Lab%3A_General_Chemistry_for_Majors_I/Chem_4A%3A_Laboratory_Manual/04_1%3A_Calibration_of_Volumetric_Glassware_(Experiment)",
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'A real calibration experiment: read its procedure and data tables before the measurement module.',
              primary: true,
            },
          ],
          exercises: [
            {
              slug: 'pick-the-glassware',
              title: 'Pick the glassware',
              prompt:
                'For each task, name the glassware and the precision you would record: (a) 50 mL of water to dissolve a solid before a titration; (b) exactly 25.00 mL of a vinegar sample to titrate; (c) a solution made up to exactly 250.0 mL; (d) the volume of NaOH added in a titration; (e) about 10 mL of 6 M HCl for a gas-collection experiment. Explain each choice in one sentence.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) graduated cylinder or beaker, the amount of water does not enter the calculation; (b) 25 mL volumetric pipet; (c) volumetric flask; (d) burette, read to 0.01 mL; (e) graduated cylinder.',
            },
            {
              slug: 'read-ten-burettes',
              title: 'Read ten burettes',
              prompt:
                'In the bench above, fill the burette, write down your reading, deliver, and write the final reading; do this ten times. Then inspect each magnified view again and decide whether any of your readings was off by more than 0.02 mL. Record how long each reading takes you; aim for under ten seconds without loss of accuracy.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'kitchen-precision',
              title: 'Optional at home: kitchen measuring precision',
              prompt:
                'With a kitchen scale (1 g or 0.1 g resolution) and water at room temperature, weigh the water held by a measuring jug filled to its 250 mL mark, a measuring cup, and a tablespoon, three times each. Compute each volume (1.00 g per mL is close enough at this precision), the mean and the spread, and compare with the nominal volumes. Safety: water only, wipe up spills.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a burette read to 0.01 mL when its smallest graduation is 0.1 mL?',
              answerOutline: 'By convention you estimate one digit between graduations; the last digit is uncertain but still informative. Recording only 0.1 mL throws away precision.',
            },
            {
              question: 'What does TD mean on a pipet, and why should you not blow out the last drop of a TD volumetric pipet?',
              answerOutline: 'Calibrated to deliver: the stated volume flows out under gravity with a set drainage, and the drop left in the tip is part of the calibration. Blowing it out delivers too much.',
            },
            {
              question: 'Give two reasons an analytical balance reading can be wrong and how to prevent each.',
              answerOutline: 'Drafts (close the doors), a warm object (cool first), an unzeroed balance (tare or weigh by difference), spilled chemical on the pan (clean), static or fingerprints on a vessel (handle with tongs or paper).',
            },
          ],
          quiz: [
            {
              question:
                'In a magnified view of a burette, the bottom of the meniscus sits about three tenths of the way from the 23.4 mL line to the 23.5 mL line (the numbers increase downward). What do you record?',
              options: ['23.4 mL', '23.43 mL', '23.430 mL', '23.47 mL'],
              answer: 1,
              explanation:
                'Estimate one digit beyond the 0.1 mL graduations: 23.43 mL. Writing 23.4 discards a meaningful digit; 23.430 claims a precision the eye cannot reach. 23.47 is the error of counting from the wrong line, as if the scale ran upward.',
            },
            {
              question: 'You must transfer exactly 25.00 mL of a sample into a flask for analysis. Which do you use?',
              options: ['A 50 mL beaker filled to the 25 mL mark', 'A 50 mL graduated cylinder', 'A 25 mL class A volumetric pipet', 'An Erlenmeyer flask filled to its 25 mL mark'],
              answer: 2,
              explanation:
                'A class A 25 mL volumetric pipet delivers 25.00 ± 0.03 mL. A graduated cylinder is good to about ±1%, and beaker or flask marks only to about ±5%.',
            },
            {
              question: 'A crucible is taken from the burner and weighed while still hot on an analytical balance. The reading is:',
              options: [
                'too low, because warm air rising around it pushes up on the pan',
                'too high, because hot objects are denser',
                'correct, because a balance measures mass, not temperature',
                'unsteady, but the average of several readings is correct',
              ],
              answer: 0,
              explanation:
                'Convection currents from the hot crucible push up on the pan, so it reads several milligrams light. Cool it (in a desiccator) to room temperature before weighing. Averaging does not remove a bias.',
            },
            {
              question: 'A volumetric flask is marked "TC 100 mL, class A". What does TC mean?',
              options: [
                'It delivers 100 mL when emptied',
                'It is calibrated at 100 °C',
                'Its tolerance is 100 µL',
                'It contains 100 mL when filled to the mark, so pouring it out delivers slightly less',
              ],
              answer: 3,
              explanation:
                'To contain: the volume inside, filled to the mark, is 100 mL. A film stays on the walls when it is poured out, so use it to make up solutions, not to deliver volumes. Pipets and burettes are TD (to deliver).',
            },
          ],
        },
        {
          slug: 'significant-figures-and-uncertainty',
          title: 'Significant figures, uncertainty and error',
          summary:
            'How many digits a result deserves, how to describe the scatter of repeated trials, the difference between random and systematic error, and how uncertainties combine through a calculation.',
          estimatedMinutes: 120,
          relatedLessons: ['general-chemistry-1/measurement-atoms-and-the-mole/measurement-and-significant-figures'],
          objectives: [
            'Count significant figures and round results of sums and products correctly',
            'Compute the mean, standard deviation and relative standard deviation of repeated trials',
            'Distinguish accuracy from precision and random from systematic error',
            'Propagate uncertainties through sums, differences, products and quotients',
            'Report a result as value ± uncertainty with matching decimal places',
          ],
          concepts: [
            'Significant figures',
            'Absolute and relative uncertainty',
            'Mean and sample standard deviation',
            'Accuracy versus precision',
            'Random versus systematic error',
            'Propagation in quadrature',
            'Percent error',
          ],
          explanation: `Every measurement is a number with an uncertainty. A burette reading of 23.43 mL means "between about 23.42 and 23.44"; the **significant figures** are the digits you trust plus one estimated digit. Zeros that only place the decimal point (0.0042) are not significant; trailing zeros after a decimal point (0.4200) are.

**Rules for calculated results.** In a sum or difference, keep the decimal places of the least precise term: 25.4632 g − 24.98 g = 0.48 g. In a product or quotient, keep the significant figures of the least precise factor. Round only at the end, keeping one or two extra digits in intermediate steps.

**Repeated trials.** For $n$ results $x_i$ with mean $\\bar{x}$, the sample standard deviation is

$$
s = \\sqrt{\\frac{\\sum (x_i - \\bar{x})^2}{n - 1}}
$$

and the relative standard deviation is $s/\\bar{x}$. Titration students aim for agreement within about 0.2%. **Precision** is how closely trials agree (small $s$); **accuracy** is how close the mean is to the true value. **Random errors** (reading scatter, balance noise) shrink when you average more trials. **Systematic errors** (an uncalibrated pipet, the wrong indicator, an oxide coating) push every trial the same way and do not average out; you find them only by thinking about the method or by checking against a standard. **Percent error** compares a result with an accepted value: $100\\,(x - x_{\\mathrm{true}})/x_{\\mathrm{true}}$.

**Propagation.** For independent uncertainties: in sums and differences, absolute uncertainties add in quadrature, $u_{a \\pm b} = \\sqrt{u_a^2 + u_b^2}$; in products and quotients, relative uncertainties do, $\\frac{u_{ab}}{ab} = \\sqrt{(u_a/a)^2 + (u_b/b)^2}$. A burette volume is a difference of two readings each ±0.01 mL, so $u_V \\approx 0.014$ mL. A density $\\rho = m/V$ with $m = 12.46 \\pm 0.02$ g and $V = 10.00 \\pm 0.02$ mL has relative uncertainty $\\sqrt{0.0016^2 + 0.0020^2} = 0.0026$, so $\\rho = 1.246 \\pm 0.003$ g/mL. Quote the uncertainty to one or two significant figures and the value to the same decimal place.

UIUC's lab requires a significant-figures assignment before the first experiment; OpenStax sections 1.5 and 1.6 cover the same ground, and NIST Technical Note 1297 is the short official guide to expressing uncertainty.`,
          resources: [
            ostx('1-5-measurement-uncertainty-accuracy-and-precision', '1.5 Measurement uncertainty, accuracy and precision', 'Significant figures, rounding, accuracy against precision.', true),
            ostx('1-6-mathematical-treatment-of-measurement-results', '1.6 Mathematical treatment of measurement results', 'Dimensional analysis and unit conversions used in every calculation of this course.'),
            {
              title: 'NIST Technical Note 1297: Guidelines for evaluating and expressing the uncertainty of NIST measurement results',
              url: 'https://www.nist.gov/pml/nist-technical-note-1297',
              type: 'documentation',
              cost: 'free',
              provider: 'National Institute of Standards and Technology',
              note: 'Sections 2-5: Type A and Type B uncertainty and combined standard uncertainty. Short and authoritative.',
            },
          ],
          exercises: [
            {
              slug: 'sig-fig-drill',
              title: 'Significant-figure drill',
              prompt:
                'Give the number of significant figures and then compute, with correct rounding: (a) 0.004050 g; (b) 25.00 mL; (c) 1200 mg written as 1.20 × 10³ mg; (d) 23.43 mL − 0.87 mL; (e) 0.5123 g ÷ 204.22 g/mol; (f) (0.4815 g)(4.184 J g⁻¹ °C⁻¹)(6.3 °C).',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 4; (b) 4; (c) 3; (d) 22.56 mL; (e) 2.509 × 10⁻³ mol; (f) 13 J (6.3 has two significant figures).',
            },
            {
              slug: 'propagate-a-molarity',
              title: 'Propagate the uncertainty of a molarity',
              prompt:
                'A KHP titration gives m = 0.5123 ± 0.0002 g (two balance readings) and V = 24.87 ± 0.02 mL of NaOH. Compute c(NaOH) = m/(204.22 × V) and its uncertainty by quadrature. Which input dominates? How would the uncertainty change if the KHP mass were halved?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'c = 0.10087 M. Relative uncertainties 0.00039 and 0.00080: combined 0.00089, so ±0.00009 M. Halving the mass doubles both relative uncertainties because V also halves.',
            },
            {
              slug: 'accuracy-precision-cases',
              title: 'Accurate, precise, both or neither',
              prompt:
                'Classify each data set for a quantity whose true value is 10.00 and name the likely kind of error: (a) 10.21, 10.20, 10.22; (b) 9.6, 10.5, 9.9; (c) 10.01, 9.99, 10.00; (d) 9.2, 10.9, 10.4. For (a), suggest two systematic errors in a pipet calibration that could produce it.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does averaging more trials reduce random error but not systematic error?',
              answerOutline: 'Random errors scatter both ways and partly cancel; the standard error falls like 1/√n. A systematic error shifts every trial the same way, so the mean inherits it.',
            },
            {
              question: 'How do you combine the uncertainties of two burette readings into the uncertainty of the volume delivered?',
              answerOutline: 'The volume is a difference; absolute uncertainties add in quadrature: √(0.01² + 0.01²) ≈ 0.014 mL.',
            },
            {
              question: 'When is it legitimate to discard a trial?',
              answerOutline: 'When you know something went wrong (an overshoot, a spill, a bubble) and wrote it down at the time; or by a stated statistical test (for example Grubbs or Q test) decided before looking. Never because it disagrees with the expected answer.',
            },
          ],
          quiz: [
            {
              question: 'Combining independent uncertainties in quadrature, what is the density for $m = 12.46 \\pm 0.02$ g and $V = 10.00 \\pm 0.02$ mL?',
              options: ['1.246 ± 0.04 g/mL', '1.2460 ± 0.0001 g/mL', '1.25 ± 0.1 g/mL', '1.246 ± 0.003 g/mL'],
              answer: 3,
              explanation:
                'Relative uncertainties 0.02/12.46 = 0.0016 and 0.02/10.00 = 0.0020 combine to $\\sqrt{0.0016^2 + 0.0020^2} = 0.0026$, and 0.0026 × 1.246 = 0.003 g/mL. Adding the absolute uncertainties (0.04) mixes grams and millilitres; the balance resolution alone (0.0001) ignores the volume.',
            },
            {
              question: 'Five standardisation trials give 0.1012, 0.1009, 0.1015, 0.1011 and 0.1013 M. What is the sample standard deviation?',
              options: ['0.00020 M', '0.00022 M', '0.00010 M', '0.00060 M'],
              answer: 1,
              explanation:
                'The mean is 0.10120 M; the squared deviations sum to $2.0 \\times 10^{-7}$; dividing by $n - 1 = 4$ and taking the root gives $2.2 \\times 10^{-4}$ M. Dividing by $n$ gives 0.00020; 0.00010 is the standard error of the mean; 0.00060 is the range.',
            },
            {
              question: 'A balance shows 0.0150 g with nothing on the pan, and you do not notice. You weigh a sample by difference (vial before, vial after tipping out the sample). The sample mass is:',
              options: ['correct, because the offset is in both readings and cancels', '0.0150 g too high', '0.0300 g too high', 'correct on average but less precise'],
              answer: 0,
              explanation:
                'Both readings carry the same +0.0150 g, so their difference is unaffected. This is why weighing by difference is used. The offset would matter if you weighed a sample directly on an unzeroed pan.',
            },
            {
              question: 'Which error is systematic?',
              options: [
                'Reading a burette sometimes a little high, sometimes a little low',
                'Balance readings that wander in the last digit because of air currents',
                'A pipet with a chipped tip that always delivers 0.06 mL too little',
                'Scatter in the time at which you judge a colour change',
              ],
              answer: 2,
              explanation:
                'The chipped pipet shifts every delivery the same way, so averaging cannot remove it; calibration can. The other three scatter both ways from trial to trial: random errors.',
            },
          ],
        },
        {
          slug: 'lab-notebook',
          title: 'Keeping a laboratory notebook',
          summary:
            'The notebook is the legal and scientific record of what you did: what goes in it, how to correct a mistake, how to design data tables before the lab, and how to keep a digital record honest.',
          estimatedMinutes: 75,
          objectives: [
            'Set up a notebook entry with title, date, purpose, procedure reference and pre-lab calculations',
            'Record raw data immediately, in ink, with units and the instrument used',
            'Correct an entry with a single line, initials and date, never by erasing',
            'Design a data table before the experiment and keep a spreadsheet with an untouched raw-data sheet',
          ],
          concepts: [
            'Bound notebook, numbered pages, ink',
            'Raw data recorded immediately',
            'Single-line corrections',
            'Pre-designed data tables',
            'Observations as data',
            'Raw-data sheet in a spreadsheet',
          ],
          explanation: `A laboratory notebook is the primary record of an experiment. In industry it can decide a patent; in a course it decides whether your result can be trusted. The rules come from one principle: **someone else must be able to see exactly what you observed, when, and what you did with it.**

**Before the lab.** Start each experiment on a new page with the title, the date and a reference to the procedure you follow (and any changes you plan). Write the purpose in one sentence, the balanced equations, the pre-lab calculations (how much solid to weigh so a titration needs about 25 mL, say) and a hazard note. Then **draw the data tables**, with a column for each reading and its unit in the header. A table drawn in advance means you do not forget a reading at the bench.

**At the bench.** Record every reading **immediately**, in ink, with its unit and all the digits the instrument gives, directly into the notebook (never on a paper towel to copy later). Note which balance or burette you used. Observations are data too: "faint pink persisted 30 s", "white smoke when the lid was lifted", "bubble in burette tip, cleared before trial 2". If you make a mistake, draw **a single line** through it so it stays readable, write the correct value beside it, and initial it. Never erase, overwrite or use correction fluid. UIUC's CHEM 103 report pages follow exactly these rules: pen only, single-line corrections with initials, and a TA's initials on each page before you leave.

**Suspicious data.** Record it anyway, with a note of anything that went wrong. Decide later, with a stated criterion, whether to exclude it, and report that you did.

**After the lab.** Calculations can go in the notebook or a spreadsheet. In a spreadsheet, keep one sheet of **raw data exactly as recorded** and do every calculation in other sheets by formula, so a reader can trace each result back to a reading. Date and sign the entry.

In this course the simulators show readings on screen; treat them as the bench and write them into your notebook (or the raw-data sheet) as you go, not afterwards from memory.`,
          resources: [
            {
              title: 'MIT 5.310 Laboratory Chemistry (Fall 2019): course materials',
              url: 'https://ocw.mit.edu/courses/5-310-laboratory-chemistry-fall-2019/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'A first laboratory course; its lab manual includes notebook and report requirements to compare with these.',
              primary: true,
            },
            smc('Chem_10_Experiments/01%3A_Introducing_Measurements_in_the_Laboratory_(Experiment)', 'Introducing measurements in the laboratory', 'Shows a real report form with data tables designed before the lab.'),
          ],
          exercises: [
            {
              slug: 'pre-lab-page',
              title: 'Write a pre-lab page',
              prompt:
                'Write the complete pre-lab notebook page for the KHP standardisation you will do later: title, date, purpose, procedure reference, balanced equation, a calculation of the KHP mass that needs about 25 mL of 0.1 M NaOH, a short hazard note, and an empty data table for three trials (mass of KHP, initial and final burette readings, volume of NaOH, molarity).',
              kind: 'writing',
              difficulty: 1,
              hint: 'n = 0.1 mol/L × 0.025 L = 0.0025 mol; m = 0.0025 × 204.22 ≈ 0.51 g.',
            },
            {
              slug: 'fix-the-notebook',
              title: 'Fix a bad notebook entry',
              prompt:
                'This entry has at least six problems; list and correct them: "KHP .51; burette 0 → 24.9; pink!; recalculated c = .1003 (erased first try, was wrong); 2nd trial left out, too different". Rewrite it as it should look.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must data be recorded immediately and in ink?',
              answerOutline: 'Memory and copying introduce errors; ink and single-line corrections make the record tamper-evident, so it can be trusted later.',
            },
            {
              question: 'What should a spreadsheet for an experiment contain so that a reader can check it?',
              answerOutline: 'An untouched raw-data sheet as recorded, calculations by formula on other sheets, units in every header, and a note of any excluded data and why.',
            },
            {
              question: 'Give three observations (not numbers) worth recording in a titration.',
              answerOutline: 'End-point colour and how long it lasted, any overshoot, air bubbles, a leaking stopcock, solid not fully dissolved, splashes on the flask wall.',
            },
          ],
          quiz: [
            {
              question: 'You wrote 23.42 mL in your notebook but the reading was 24.32 mL. What do you do?',
              options: [
                'Draw one line through 23.42, write 24.32 beside it, and initial it',
                'Erase 23.42 carefully and write 24.32 in its place',
                'Cover 23.42 with correction fluid so the page stays neat',
                'Tear out the page and copy everything onto a clean one',
              ],
              answer: 0,
              explanation:
                'A single line keeps the original readable, so anyone can see what was changed and that it was done openly. Erasing, correction fluid and recopying all destroy the original record, which is why UIUC treats them as possible dishonesty.',
            },
            {
              question: 'Which notebook entry is complete?',
              options: ['KHP 0.5123', 'Mass of KHP: about half a gram', 'Mass of KHP (balance 3, by difference): 0.5123 g', 'Mass of KHP: 0.51 g (rounded to save space)'],
              answer: 2,
              explanation:
                'It has the quantity, the unit, every digit the balance gave and how it was measured. A number without a unit is ambiguous; rounding at the bench throws away precision you cannot recover.',
            },
            {
              question: 'Your third titration trial disagrees with the first two by 2%. Nothing unusual was noticed. What is the right record?',
              options: [
                'Leave it out of the notebook, since it is clearly wrong',
                'Record it as measured, note that it disagrees, and run a fourth trial',
                'Replace it with the average of the other two',
                'Record it only if your lab partner got a similar value',
              ],
              answer: 1,
              explanation:
                'Every measurement goes in the record. A further trial shows which value is unusual, and any exclusion is decided by a stated criterion and reported. Omitting or replacing data is fabrication.',
            },
          ],
        },
        {
          slug: 'lab-report-format',
          title: 'The laboratory report',
          summary:
            'The structure every report in this course follows (title, abstract, introduction, methods, results, calculations, discussion with error analysis, conclusion, references), what goes in each section, and how reports are graded.',
          estimatedMinutes: 110,
          objectives: [
            'Name the sections of a laboratory report and what belongs in each',
            'Write an abstract that gives the aim, method, result with uncertainty and comparison',
            'Present data in numbered, captioned tables and figures with units',
            'Write an error analysis that names specific errors and the direction each pushes the result',
            'Use the report template, save it, and export it as Markdown',
          ],
          concepts: [
            'IMRaD structure',
            'Abstract',
            'Results versus discussion',
            'Table and figure captions',
            'Sample calculation',
            'Error analysis with direction and size',
            'ACS reference style',
            'Grading rubric',
          ],
          explanation: `A lab report answers a question with evidence, in a form a reader can check. This course uses one structure for every report, close to the IMRaD form (introduction, methods, results and discussion) of scientific papers:

1. **Title** that says what was measured ("The molarity of a sodium hydroxide solution by titration with KHP").
2. **Abstract**: one paragraph with the aim, the method in a phrase, the main result **with its uncertainty and units**, and the comparison with an accepted value. Written last.
3. **Introduction**: the question, the chemistry behind the method (balanced equations, the key relationship such as $A = \\varepsilon b c$) and what you set out to measure.
4. **Materials and methods**: what you did, in the past tense and as a narrative (not a list of commands), with reagent concentrations, instruments and their precision, the procedure cited, and any deviations.
5. **Results**: raw and processed data in numbered tables with captions and units in the headers; figures with labelled axes, units, data points and fitted lines. Describe what the data show; do not interpret yet.
6. **Calculations**: one worked sample of each step with units, then a summary of all trials and how the uncertainty was obtained.
7. **Discussion and error analysis**: is the result accurate (percent error) and precise (relative standard deviation)? Is the difference from the accepted value bigger than your uncertainty? If so, which **specific** errors could explain it, in which **direction** does each push the result, and about how much? "Human error" is not an explanation; "an air bubble in the burette tip would make the recorded volume too large and the NaOH molarity too small" is.
8. **Conclusion**: two or three sentences answering the question with the number.
9. **References**: the procedure and the source of every constant (ACS style is standard in chemistry).

UIUC's CHEM 103 grades data entry, report sheets and a post-lab of calculations and analysis. Here each module's project is a full report, graded against a rubric you can tick yourself. Try the template below with the practice experiment (calibrating a pipet with the measurement bench); everything is saved in your browser and can be downloaded as a Markdown file.

\`\`\`interactive
lab-report
{"experiment": "practice", "caption": "Each section shows what to write. Insert the table skeleton in Results, fill it with your own pipet-calibration data from the measurement bench, and tick the rubric honestly when you finish. Download (.md) keeps a copy outside the browser."}
\`\`\``,
          resources: [
            {
              title: 'UNC Writing Center: Scientific reports',
              url: 'https://writingcenter.unc.edu/tips-and-tools/scientific-reports/',
              type: 'article',
              cost: 'free',
              provider: 'University of North Carolina at Chapel Hill',
              note: 'A clear guide to each section of a scientific report, with examples of good and weak writing.',
              primary: true,
            },
            {
              title: 'MIT 5.310 Laboratory Chemistry (Fall 2019): course materials',
              url: 'https://ocw.mit.edu/courses/5-310-laboratory-chemistry-fall-2019/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Look at how its report requirements match the structure above.',
            },
          ],
          exercises: [
            {
              slug: 'sort-the-sentences',
              title: 'Which section does it belong in?',
              prompt:
                'Assign each sentence to a report section and rewrite the two that are badly written: (a) "Add 0.5 g of KHP to the flask." (b) "The mean NaOH molarity was 0.1009 ± 0.0002 M (n = 3)." (c) "The result is lower than expected, probably due to human error." (d) "Phenolphthalein changes colour between pH 8.2 and 10." (e) "Table 1. Burette readings for the three trials." (f) "The NaOH solution was found to be 0.101 M, 0.9% below its label value."',
              kind: 'writing',
              difficulty: 1,
              hint: '(a) Methods, but should be past tense narrative; (c) Discussion, but must name a specific error and its direction.',
            },
            {
              slug: 'practice-report',
              title: 'Write the practice report',
              prompt:
                'Calibrate the 10 mL volumetric pipet with the measurement bench (at least five deliveries of water), then write the full practice report in the template above: abstract, introduction, methods, results table, calculations of each volume from mass and the density of water at your temperature, mean and standard deviation, discussion against the ±0.02 mL tolerance and the 0.1% buoyancy effect, conclusion, references. Self-grade with the rubric.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between the Results and the Discussion sections?',
              answerOutline: 'Results presents what was measured and calculated (tables, figures, a factual description); Discussion interprets it: accuracy, precision, error sources and meaning.',
            },
            {
              question: 'What makes an error-analysis statement useful?',
              answerOutline: 'It names a specific, plausible error in this procedure, gives the direction it moves the result (high or low) and, ideally, an estimate of the size compared with the observed discrepancy.',
            },
            {
              question: 'Why is the abstract written last?',
              answerOutline: 'It summarises the result and comparison, which are known only after analysis.',
            },
          ],
          quiz: [
            {
              question: 'Where does this sentence belong: "The calibration line had slope 0.1301 µM⁻¹ and R² = 0.9994 (Figure 1)"?',
              options: ['Introduction', 'Materials and methods', 'Results', 'Conclusion'],
              answer: 2,
              explanation:
                'It reports a processed result with a reference to a figure, without interpreting it: Results. The introduction gives the theory, methods the procedure, and the conclusion only the final answer.',
            },
            {
              question: 'Which is the best abstract sentence?',
              options: [
                'In this lab we learned how to titrate.',
                'The NaOH solution was standardised against KHP by titration to a phenolphthalein end point: c = 0.1009 ± 0.0002 M (three trials).',
                'The lab went well and our results were accurate.',
                'Titration is an important technique in analytical chemistry.',
              ],
              answer: 1,
              explanation:
                'An abstract gives the method and the numerical result with uncertainty and units. The others are vague, evaluative or background.',
            },
            {
              question: 'Which sentence is a useful piece of error analysis?',
              options: [
                'The difference from the accepted value was due to human error.',
                'Errors may have occurred in the measurements.',
                'More trials would have made the result more accurate.',
                'Magnesium nitride left unconverted would lower the measured O : Mg ratio, by about 3% if 6% of the Mg formed nitride.',
              ],
              answer: 3,
              explanation:
                'It names a specific error, says which way it moves the result and estimates by how much. More trials improve precision, not accuracy, and "human error" explains nothing.',
            },
          ],
        },
        {
          slug: 'graphs-and-linear-fits',
          title: 'Graphs and straight-line fits in a spreadsheet',
          summary:
            'How to plot laboratory data properly, fit a least-squares line with a trendline or LINEST, read the slope and intercept with their uncertainties, judge a fit by its residuals rather than only R², and use a calibration line to find an unknown.',
          estimatedMinutes: 120,
          objectives: [
            'Make a scatter plot with the independent variable on x, labelled axes and units',
            'Fit a least-squares line and obtain slope, intercept and their standard errors with LINEST',
            'Explain what R² does and does not tell you, and read a residual plot',
            'Invert a calibration line to find an unknown and estimate its uncertainty',
          ],
          concepts: [
            'Scatter plot, not line chart',
            'Least-squares line',
            'Slope and intercept with standard errors',
            'LINEST',
            'R² and its limits',
            'Residuals',
            'Inverting a calibration: x = (y − b)/m',
          ],
          explanation: `Half the experiments in this course end in a straight line: absorbance against concentration (Beer's law), temperature against time (calorimetry), pH against volume near the start of a titration. A good graph puts the **independent variable** (the one you set, such as concentration) on the x axis, uses a **scatter plot** (not the spreadsheet's "line chart", which spaces points evenly whatever their x values), labels both axes with quantity and unit, and shows the data as points with the fitted line drawn through them.

**Least squares.** The best-fit line $y = mx + b$ minimises the sum of squared vertical distances (residuals) from the points to the line. In Excel, LibreOffice or Google Sheets, a trendline gives the equation; the function \`=LINEST(y_range, x_range, TRUE, TRUE)\` gives more: the slope and intercept **with their standard errors**, and $R^2$. Use those standard errors as the uncertainties of $m$ and $b$.

\`\`\`interactive
least-squares
{"points": [[0, 0.004], [2, 0.262], [4, 0.519], [6, 0.786], [8, 1.031]], "xName": "c", "yName": "A", "view": [-0.5, 9, -0.1, 1.2], "title": "A Beer's-law calibration", "caption": "Absorbance A against concentration c in µM for five standards. Drag a point to see how one bad standard pulls the line; switch on your own line to see that none beats least squares. The vertical segments are the residuals."}
\`\`\`

**R² is not a quality certificate.** $R^2 = 0.998$ means the line accounts for 99.8% of the variance in y; data that curve gently can still give $R^2 > 0.99$. Plot the **residuals** (data minus fit) against x: they should scatter randomly about zero. A curved pattern (positive at both ends, negative in the middle, or the reverse) means a straight line is the wrong model over that range, which is exactly how stray light shows up at high absorbance.

**Using a calibration.** For an unknown with absorbance $A_u$, $c_u = (A_u - b)/m$. Its uncertainty comes mostly from the scatter of the points about the line; a simple estimate is $u_c \\approx s_y/m$, where $s_y$ is the standard error of y from LINEST. Should you force the line through the origin? Only if you have a reason to believe the intercept is exactly zero **and** your intercept is within its uncertainty of zero; otherwise forcing it biases the slope.

Work through the LibreTexts Excel exercise with your own spreadsheet program; the LINEST help pages say exactly where each statistic appears in the output array.`,
          resources: [
            smc('Chem_11_Experiments/01%3A_Using_Excel_for_Graphical_Analysis_of_Data_(Experiment)', 'Using Excel for graphical analysis of data', 'A complete exercise in plotting, trendlines and interpreting slopes; do it in your own spreadsheet.', true),
            {
              title: 'Microsoft Support: LINEST function',
              url: 'https://support.microsoft.com/en-us/office/linest-function-84d7d0d9-6e50-4101-977a-fa7abf772b6d',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft',
              note: 'Where the slope, intercept, their standard errors, R² and s_y appear in the output array.',
            },
            {
              title: 'Google Sheets: LINEST',
              url: 'https://support.google.com/docs/answer/3094249',
              type: 'documentation',
              cost: 'free',
              provider: 'Google',
              note: 'The same function in Google Sheets.',
            },
          ],
          exercises: [
            {
              slug: 'linest-by-hand',
              title: 'LINEST on a calibration',
              prompt:
                'Enter the five points of the interactive above (c = 0, 2, 4, 6, 8 µM; A = 0.004, 0.262, 0.519, 0.786, 1.031) in a spreadsheet. Make a proper scatter plot, fit the line, and use LINEST to get the slope and intercept with standard errors and R². Is the intercept consistent with zero? An unknown reads A = 0.652: find its concentration and an uncertainty estimate.',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The slope is about 0.1289 µM⁻¹ and the intercept about 0.005 (within its uncertainty of zero); the unknown is about 5.02 µM.',
            },
            {
              slug: 'residual-detective',
              title: 'Residual detective',
              prompt:
                'Fit a straight line to A = 0.000, 0.329, 0.651, 0.962, 1.248, 1.497, 1.700 at c = 0, 2.5, 5, 7.5, 10, 12.5, 15 µM. Report R², then plot the residuals. What pattern do you see, what physical effect could cause it, and which points would you keep for a calibration?',
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'R² is about 0.994, but the residuals arch: negative at both ends, positive in the middle, because the top points fall below a straight line as stray light makes high absorbances read low. Keep the range that is linear (up to about A = 1).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why should laboratory data be plotted as an x-y scatter plot rather than a line chart?',
              answerOutline: 'A line chart spaces categories evenly regardless of their values, distorting the slope; a scatter plot uses the real x values.',
            },
            {
              question: 'What does a curved residual plot tell you that R² does not?',
              answerOutline: 'That the model is systematically wrong (curvature) over the range even when R² is high.',
            },
            {
              question: 'How do you obtain an unknown concentration from a calibration line, and what dominates its uncertainty?',
              answerOutline: 'c = (A − b)/m; the scatter of the standards about the line (s_y / m), plus any error in making the standards.',
            },
          ],
          quiz: [
            {
              question: 'A calibration gives $A = 0.1291\\,c + 0.004$ with $c$ in µM. An unknown reads $A = 0.652$. What is its concentration?',
              options: ['0.0882 µM', '5.08 µM', '5.02 µM', '5.05 µM'],
              answer: 2,
              explanation:
                '$c = (0.652 - 0.004)/0.1291 = 5.02$ µM. Ignoring the intercept gives 5.05; adding it instead of subtracting gives 5.08; 0.0882 comes from substituting A as if it were c.',
            },
            {
              question: 'A straight-line fit has $R^2 = 0.998$. What can you conclude?',
              options: [
                'The measurements are 99.8% accurate',
                'The line accounts for 99.8% of the variance in y, but the residuals must still be checked for curvature',
                'The slope has a relative uncertainty of 0.2%',
                'The intercept is zero',
              ],
              answer: 1,
              explanation:
                '$R^2$ measures how much of the scatter in y the line explains. It says nothing about accuracy, does not give the slope uncertainty (LINEST does), and gently curved data can still give $R^2$ above 0.99.',
            },
            {
              question: 'The residuals of a Beer\'s-law fit are positive at low and middle concentrations and strongly negative for the two highest standards. The most likely explanation is:',
              options: [
                'random noise in the spectrophotometer',
                'the blank was measured at the wrong wavelength',
                'the slope was calculated with the wrong sign',
                'the response flattens at high absorbance (for example stray light), so those standards are outside the linear range',
              ],
              answer: 3,
              explanation:
                'A systematic pattern in the residuals means the straight line is the wrong model there. At high absorbance, stray light makes readings fall below the line. A blank error shifts every point equally (it changes the intercept, not the shape); random noise has no pattern.',
            },
          ],
        },
      ],
    },
    {
      slug: 'equipment-and-the-balance',
      title: 'Experiment 1: Laboratory Equipment, the Balance and Density',
      description:
        'Calibrate glassware by weighing the water it delivers, compare the precision and accuracy of a beaker, a graduated cylinder, a volumetric pipet and a burette, and use the best of them to measure the density of an unknown solution.',
      lessons: [
        {
          slug: 'equipment-prelab',
          title: 'Pre-lab: calibrating glassware and measuring density',
          summary:
            'Why weighing water is the most accurate way to measure a volume, the density of water at bench temperature, the plan of the experiment, its (small) hazards and the pre-lab questions.',
          estimatedMinutes: 80,
          relatedLessons: ['general-chemistry-1/measurement-atoms-and-the-mole/measurement-and-significant-figures', 'general-chemistry-1/measurement-atoms-and-the-mole/dimensional-analysis'],
          objectives: [
            'Convert a mass of water to a volume with the density of water at the measured temperature',
            'Explain why a calibration by mass is more accurate than reading a scale',
            'Plan the trials needed to compare the precision and accuracy of four pieces of glassware',
            'Compute a density from a mass and a calibrated volume',
          ],
          concepts: [
            'Density, an intensive property',
            'Density of water against temperature',
            'Calibration by weighing (gravimetric calibration)',
            'Weighing by difference',
            'Air buoyancy (about 0.1% for water)',
            'Precision and accuracy of glassware',
          ],
          explanation: `**Density** is mass per volume, $\\rho = m/V$, and it is **intensive**: a property of the substance (at a given temperature), not of how much you have. It is also how chemists check a volume. A balance measures mass to 0.0001 g, a relative precision of 0.001% for 10 g, far better than any scale on glass. So to find the volume a pipet really delivers, you weigh the water it delivers and divide by the density of water at that temperature:

$$
V = \\frac{m_{\\mathrm{water}}}{\\rho_{\\mathrm{water}}(T)}.
$$

The density of water changes in the fourth decimal place across room temperature: 0.99820 g/mL at 20 °C, 0.99799 at 21 °C, 0.99777 at 22 °C, 0.99754 at 23 °C, 0.99730 at 24 °C and 0.99705 at 25 °C (air-free water; CRC Handbook). Using 1.000 g/mL at 23 °C makes every volume 0.25% too small, ten times the tolerance of a good pipet.

A smaller effect: a balance in air is pushed up by the air the sample displaces, slightly more for water (1.0 g/mL) than for the steel calibration weights (8.0 g/mL). Water weighed in air reads about 0.1% light; precise calibrations multiply the apparent volume by about 1.0011. At this course's level you should know the correction exists and how big it is.

**The experiment** (UIUC Lab 1, "Laboratory Equipment and the Balance", covers the same skills). You will deliver water from a 50 mL beaker (to its 20 mL mark), a 10 mL graduated cylinder, a 10 mL volumetric pipet and a 50 mL burette into a weighing beaker, at least three times each, weighing by difference. For each piece you get a mean volume (accuracy, compared with the nominal volume) and a standard deviation (precision). Then you measure the mass of an unknown salt or sugar solution delivered by your calibrated pipet and compute its density.

**Hazards.** Low: water and a dilute salt or sugar solution. The main risks are broken glass (never force a pipet into a bulb or filler) and pipetting by mouth, which is never done: always use a pipet bulb or filler.

**Pre-lab questions.** (1) What volume corresponds to 9.9721 g of water at 22.0 °C? (2) A pipet delivers 9.994 mL; 10.6118 g of an unknown is delivered. Density? (3) Which glassware do you expect to be most precise, and which least accurate?`,
          resources: [
            smc('Chem_10_Experiments/02%3A_The_Density_of_Liquids_and_Solids_(Experiment)', 'The density of liquids and solids', 'A full density experiment with data tables; read the procedure and the sample calculations.', true),
            {
              title: 'UC Davis Chem 4A laboratory manual: Calibration of volumetric glassware',
              url: "https://chem.libretexts.org/Courses/University_of_California_Davis/Chem_4A_Lab%3A_General_Chemistry_for_Majors_I/Chem_4A%3A_Laboratory_Manual/04_1%3A_Calibration_of_Volumetric_Glassware_(Experiment)",
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'The gravimetric calibration method in detail, including the table of water densities.',
            },
            phet('density', 'Density', 'A quick refresher on mass, volume and density by displacement, for intuition.'),
          ],
          exercises: [
            {
              slug: 'pre-lab-questions',
              title: 'Answer the pre-lab questions',
              prompt:
                'Answer the three pre-lab questions at the end of the explanation, showing units and significant figures. For (3), give a reason for each choice in one sentence.',
              kind: 'problem',
              difficulty: 1,
              hint: '(1) 9.9721 / 0.99777 = 9.9944 mL. (2) 10.6118 / 9.994 = 1.0618 g/mL.',
            },
            {
              slug: 'temperature-sensitivity',
              title: 'How much does temperature matter?',
              prompt:
                'A 10 mL pipet delivers 9.9800 g of water. Compute the volume using the density at 20, 22 and 25 °C, and using 1.000 g/mL. Express each difference from the 22 °C value in mL and as a fraction of the class A tolerance (±0.02 mL). What does this say about recording the water temperature?',
              kind: 'problem',
              difficulty: 2,
              hint: 'At 20 °C 9.9980 mL, at 22 °C 10.0023 mL, at 25 °C 10.0095 mL, at 1.000 g/mL 9.9800 mL.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is weighing water a better way to find a delivered volume than reading the glassware?',
              answerOutline: 'Mass can be measured to 0.0001 g (relative 1e-5); the density of water is known to five figures; scales on glass are good to 0.1-1%.',
            },
            {
              question: 'Is density intensive or extensive? What does that mean for measuring it with a 10 mL or a 25 mL sample?',
              answerOutline: 'Intensive: the same for any amount; a bigger sample gives the same density with smaller relative uncertainty.',
            },
            {
              question: 'What is the size and direction of the air-buoyancy effect on weighing water?',
              answerOutline: 'Water reads about 0.1% light, so volumes computed from apparent mass are about 0.1% low unless corrected (factor about 1.0011).',
            },
          ],
          quiz: [
            {
              question: 'A pipet delivers 9.9721 g of water at 22.0 °C, where water has density 0.99777 g/mL. What volume did it deliver?',
              options: ['9.950 mL', '9.972 mL', '9.994 mL', '10.000 mL'],
              answer: 2,
              explanation:
                '$V = m/\\rho = 9.9721/0.99777 = 9.994$ mL. Taking the density as 1.000 g/mL gives 9.972 mL; multiplying by the density instead of dividing gives 9.950 mL.',
            },
            {
              question: 'Your calibrated pipet delivers 9.994 mL. It delivers 10.6118 g of an unknown solution. What is the density of the unknown?',
              options: ['1.0612 g/mL', '1.0618 g/mL', '0.9418 g/mL', '1.0606 g/mL'],
              answer: 1,
              explanation:
                '$\\rho = 10.6118/9.994 = 1.0618$ g/mL. Using the nominal 10.00 mL gives 1.0612, discarding your calibration; 0.9418 is volume divided by mass.',
            },
            {
              question: 'A student calibrates a pipet at 23 °C but uses 1.0000 g/mL for water instead of 0.99754 g/mL. The volumes they report are:',
              options: ['too small by about 0.25%', 'too large by about 0.25%', 'correct to four figures', 'too small by about 2.5%'],
              answer: 0,
              explanation:
                'Dividing by 1.0000 instead of 0.99754 makes every volume smaller by the ratio 0.99754, that is about 0.25% too small, more than ten times the tolerance of a class A pipet.',
            },
          ],
        },
        {
          slug: 'equipment-experiment',
          title: 'The experiment: calibrating glassware and the density of an unknown',
          summary:
            'Run the measurement bench: deliver water from four pieces of glassware into a weighing beaker, read the balance and the meniscus yourself, then measure the density of an unknown solution with your calibrated pipet.',
          estimatedMinutes: 120,
          objectives: [
            'Carry out a gravimetric calibration with weighing by difference',
            'Record balance readings to 0.0001 g and burette readings to 0.01 mL in a prepared table',
            'Measure the density of an unknown solution in at least three trials',
            'Recognise and avoid the errors that the simulator, like a real bench, allows',
          ],
          concepts: [
            'Procedure as numbered steps',
            'Successive deliveries into one beaker',
            'Draft-shield doors',
            'Burette reading by difference',
            'Replicate trials',
            'Data table prepared in advance',
          ],
          explanation: `Prepare your notebook table first: for each piece of glassware, columns for the balance reading before and after each delivery (g), the mass delivered (g) and, for the burette, the initial and final readings (mL). Record the bench temperature. Then follow the procedure.

**Procedure**

1. Start a new sample. Choose **Deionised water** and the **volumetric pipet**. Close the draft-shield doors.
2. **Read the balance** with the empty weighing beaker on it and record the mass (or press Tare and record 0.0000 g).
3. **Fill the pipet to the mark**, then **deliver into the beaker**. Read the balance again and record it.
4. Repeat step 3 at least four more times without emptying the beaker; each delivery's mass is the difference between successive readings.
5. **Empty and dry the beaker**, then repeat steps 2 to 4 with the graduated cylinder (fill to the mark, deliver), the beaker (fill to its 20 mL mark, deliver) and the burette. For the burette, read the **initial** meniscus in the magnifier before delivering and the **final** one after, both to 0.01 mL; the volume delivered is their difference.
6. Empty the beaker and switch to **Unknown solution**. Deliver it with the volumetric pipet into the beaker and weigh, at least three times.
7. Before you analyse: did any reading look odd? Note it beside the reading.

\`\`\`interactive
lab-balance
{"caption": "Work through the numbered procedure. The magnifier shows the meniscus after you fill (and, for the burette, after you deliver): read it yourself. Try one weighing with the doors open to see what drafts do to the last digits. Check your mean pipet volume and your density only after you have calculated them."}
\`\`\`

**What you cannot learn here.** At a real bench you would rinse the pipet with the liquid first, wipe the outside of the tip, hold it vertical and touch the tip to the wall at the end of drainage; and you would see whether a drop hangs on the tip. The simulator models the scatter those habits leave, not the habits.

**Optional at home: density of sugar solutions.** With a kitchen scale and a measuring jug, weigh 250 mL of water, then of solutions of 25, 50 and 75 g of table sugar made up to 250 mL. Plot density against concentration. Safety: food ingredients only, at room temperature; do not drink the samples afterwards if the jug has been used with anything else.`,
          resources: [
            mit('volumetric-techniques', 'Volumetric techniques', 'Watch the pipet section again: rinsing, filling to the mark, touching off the last drop.', true),
            smc('Chem_10_Experiments/01%3A_Introducing_Measurements_in_the_Laboratory_(Experiment)', 'Introducing measurements in the laboratory', 'Its data sheets are a model for your notebook table.'),
            cc(69, 'Identifying an unknown liquid from its density', 'Extra practice: measure a density in a second virtual lab and identify the liquid.'),
          ],
          exercises: [
            {
              slug: 'run-the-calibration',
              title: 'Run the full calibration',
              prompt:
                'Carry out steps 1-7 with one sample number and record every reading in your notebook table. Use at least five pipet deliveries, three each for the other glassware, and three for the unknown. Copy the raw data into a spreadsheet sheet named "raw" exactly as recorded.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'draft-experiment',
              title: 'What do drafts do?',
              prompt:
                'With the beaker empty, read the balance ten times with the doors closed and ten times with them open. Compute the mean and standard deviation of each set. By what factor does opening the doors worsen the precision, and does it also shift the mean?',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'sugar-density-at-home',
              title: 'Optional at home: density of sugar solutions',
              prompt:
                'Do the at-home sugar-solution activity described above (kitchen scale, measuring jug, table sugar, water). Report a table of mass, volume and density, a plot of density against grams of sugar per 250 mL, and the slope of the line with its meaning. State the resolution of your scale and how it limits your result.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is it better to weigh several deliveries in succession into one beaker than to tare and weigh each delivery separately?',
              answerOutline: 'Either works; successive readings save time and keep a complete record (each difference is one delivery), and a balance offset cancels in each difference.',
            },
            {
              question: 'What two readings define a burette delivery, and what is the uncertainty of the volume?',
              answerOutline: 'Initial and final meniscus readings, each ±0.01 mL; the difference has about ±0.014 mL from reading alone.',
            },
            {
              question: 'Which simulator choices reproduce errors a real student makes?',
              answerOutline: 'Leaving the balance doors open, misreading a meniscus (or reading it upward on a burette), forgetting to record temperature, mixing up readings when deliveries accumulate.',
            },
          ],
          quiz: [
            {
              question: 'Three deliveries from one pipet weigh 9.9871, 9.9902 and 9.9858 g of water at 22.0 °C (0.99777 g/mL). What is the mean volume delivered?',
              options: ['9.9877 mL', '10.0100 mL', '10.0000 mL', '9.9654 mL'],
              answer: 1,
              explanation:
                'The mean mass is 9.98770 g, and $9.98770/0.99777 = 10.0100$ mL. 9.9877 treats grams as millilitres; 9.9654 multiplies by the density.',
            },
            {
              question: 'You weigh with the draft-shield doors open. Compared with closed doors, what happens?',
              options: [
                'The last digits wander, so precision is worse, and the readings may also drift',
                'Every reading is exactly 0.1 g high',
                'The balance becomes more accurate because air can circulate',
                'Only the tare is affected',
              ],
              answer: 0,
              explanation:
                'Air currents push on the pan unpredictably, so readings scatter in the last digits and can drift. They do not add a neat fixed offset, and they never improve accuracy.',
            },
            {
              question: 'You deliver five pipet volumes into one beaker without emptying it, reading the balance after each delivery. How do you get the mass of each delivery?',
              options: [
                'Divide the final reading by five',
                'Use each reading directly',
                'Subtract the empty-beaker reading from each reading',
                'Subtract each reading from the next one',
              ],
              answer: 3,
              explanation:
                'Each delivery is the difference between successive readings. Subtracting the empty beaker from each reading gives the cumulative mass after one, two, three deliveries; dividing the final reading by five includes the beaker and hides the scatter.',
            },
          ],
        },
        {
          slug: 'equipment-analysis',
          title: 'Analysis: precision, accuracy and the density result',
          summary:
            'Turn the masses into volumes, compare each piece of glassware with its tolerance, compute the density of the unknown with an uncertainty, and write up the report.',
          estimatedMinutes: 110,
          objectives: [
            'Compute mean volumes and standard deviations for each piece of glassware',
            'Judge accuracy against the class tolerance and precision against the scatter',
            'Report the density of the unknown with a propagated uncertainty',
            'Identify the common errors in gravimetric calibration and their direction',
          ],
          concepts: [
            'Mean minus nominal (accuracy)',
            'Standard deviation (precision)',
            'Class tolerance',
            'Buoyancy correction factor about 1.0011',
            'Propagated uncertainty of a density',
            'Calibrated against nominal volume',
          ],
          explanation: `**Step 1: volumes.** For every delivery, $V = m/\\rho_{\\mathrm{water}}(T)$. For the burette the meniscus readings give a volume too: compare it with the mass-based one.

**Step 2: precision and accuracy.** For each piece of glassware compute the mean $\\bar V$ and standard deviation $s$. **Accuracy** is $\\bar V - V_{\\mathrm{nominal}}$; compare it with the tolerance (pipet ±0.02 mL, burette ±0.05 mL over 50 mL, graduated cylinder ±0.10 mL, beaker about ±5%). **Precision** is $s$. Expect something like: pipet $s \\approx 0.005$ mL, burette 0.01-0.02 mL, cylinder 0.04 mL, beaker 0.5 mL. A pipet can be very precise and still off by 0.015 mL (inside tolerance); a chipped one can be precise and well outside it. That is the difference between random and systematic error made visible.

**Step 3: the buoyancy correction** (for the pipet). Multiply the apparent volume by about 1.0011 (for water weighed against steel weights in ordinary air). A pipet that seems to deliver 9.9944 mL actually delivers about 10.005 mL. State whether you applied it.

**Step 4: density of the unknown.** $\\rho = m/V_{\\mathrm{pipet}}$, using **your** calibrated volume. The relative uncertainty combines that of the mass (tiny: 0.0002 g in 10.6 g is $2 \\times 10^{-5}$) and that of the volume (the standard deviation of your pipet mean, or the tolerance, whichever you justify): with $u_V = 0.004$ mL, $u_\\rho/\\rho = 0.004/9.994 = 4 \\times 10^{-4}$, so $\\rho = 1.0618 \\pm 0.0004$ g/mL. Buoyancy affects the unknown and the water almost equally, so it largely cancels in the density.

**What good data look like.** Five pipet deliveries within 0.01 g of each other; a burette volume from the meniscus that agrees with the mass-based volume to within 0.02 mL; three density trials agreeing in the fourth decimal place.

**Common errors and their direction.** A drop hanging outside the pipet tip that falls into the beaker: volumes too high. Blowing out the last drop of a TD pipet: too high. Not letting it drain: too low. Wrong water temperature or 1.000 g/mL: biased by up to 0.3%. Reading a burette upward: wildly wrong.

When your analysis is done, write the report in the template below; it is the module project.

\`\`\`interactive
lab-report
{"experiment": "density", "caption": "Your report for Experiment 1. Insert the table skeleton, paste your own data, and grade yourself with the rubric. It saves in this browser; download a copy when done."}
\`\`\``,
          resources: [
            ostx('1-5-measurement-uncertainty-accuracy-and-precision', '1.5 Measurement uncertainty, accuracy and precision', 'Review accuracy and precision with the textbook examples before writing the discussion.', true),
            {
              title: 'NIST Technical Note 1297: Guidelines for evaluating and expressing the uncertainty of NIST measurement results',
              url: 'https://www.nist.gov/pml/nist-technical-note-1297',
              type: 'documentation',
              cost: 'free',
              provider: 'National Institute of Standards and Technology',
              note: 'How to combine a Type A (scatter) and a Type B (tolerance) uncertainty for the pipet volume.',
            },
          ],
          exercises: [
            {
              slug: 'glassware-summary',
              title: 'Glassware summary table',
              prompt:
                'From your data, build a table with one row per piece of glassware: n, mean volume, standard deviation, mean − nominal, tolerance, and verdicts "within tolerance?" and "precision better than tolerance?". Then plot the four mean volumes as relative deviation from nominal (in %) with error bars of ±1 standard deviation.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'chipped-pipet',
              title: 'Find the chipped pipet',
              prompt:
                'A pipet gives 9.9112, 9.9131, 9.9120, 9.9126 and 9.9117 g of water at 21.0 °C (0.99799 g/mL). Compute the mean volume, standard deviation and accuracy. Is it within tolerance? Is the problem random or systematic? What would you do with it, and how would it bias a density measured with its nominal volume?',
              kind: 'problem',
              difficulty: 2,
              hint: 'Mean mass 9.91212 g, V = 9.9321 mL, s ≈ 0.0007 mL: very precise but 0.068 mL low, far outside ±0.02 mL. Densities computed with 10.00 mL would be 0.7% low.',
            },
            {
              slug: 'density-report',
              title: 'Write the Experiment 1 report',
              prompt:
                'Write the full report for this experiment in the template above, following its prompts and rubric. Include the glassware table, the density with its propagated uncertainty, and a discussion of at least two specific error sources with their directions.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'A pipet is precise but inaccurate. What kind of error does it have, and how do you deal with it?',
              answerOutline: 'Systematic. Calibrate it and use its calibrated volume, or replace it.',
            },
            {
              question: 'Why does air buoyancy largely cancel when you compute the density of the unknown with a pipet calibrated by weighing water?',
              answerOutline: 'Both the water and the unknown have similar densities, so both are weighed about 0.1% light; the ratio m/V is almost unaffected.',
            },
            {
              question: 'Which uncertainty dominates the density, and why?',
              answerOutline: 'The volume (about 4e-4 relative); the mass is known to about 2e-5.',
            },
          ],
          quiz: [
            {
              question:
                'A graduated cylinder gives 9.93 ± 0.05 mL (mean ± s, five trials) and a volumetric pipet 10.011 ± 0.004 mL. Which statement is correct?',
              options: [
                'The cylinder is more accurate than the pipet',
                'Both are within their class A tolerances (±0.10 mL and ±0.02 mL)',
                'The pipet is outside its tolerance',
                'The cylinder is more precise than the pipet',
              ],
              answer: 1,
              explanation:
                'The cylinder is 0.07 mL from nominal (tolerance 0.10) and the pipet 0.011 mL (tolerance 0.02): both pass. The pipet is both more accurate and more precise (s = 0.004 against 0.05).',
            },
            {
              question: 'Water weighed in air gives an apparent pipet volume of 9.9944 mL. With a buoyancy factor of 1.0011, what is the corrected volume?',
              options: ['10.0054 mL', '9.9834 mL', '9.9944 mL', '10.1043 mL'],
              answer: 0,
              explanation:
                '$9.9944 \\times 1.0011 = 10.0054$ mL: water reads light in air, so the true volume is larger. Dividing by the factor (9.9834) corrects the wrong way; 10.1043 applies a 1.1% correction instead of 0.11%.',
            },
            {
              question: 'An unknown gives $m = 10.6118 \\pm 0.0002$ g with a pipet volume of $9.994 \\pm 0.004$ mL. What is the uncertainty of its density (1.0618 g/mL)?',
              options: ['± 0.00002 g/mL', '± 0.004 g/mL', '± 0.0002 g/mL', '± 0.0004 g/mL'],
              answer: 3,
              explanation:
                'Relative uncertainties: $0.0002/10.6118 = 2 \\times 10^{-5}$ and $0.004/9.994 = 4.0 \\times 10^{-4}$. In quadrature the volume dominates: $4.0 \\times 10^{-4} \\times 1.0618 = 0.0004$ g/mL. ±0.00002 uses the mass alone; ±0.004 uses the volume\'s absolute uncertainty as if it were the density\'s.',
            },
            {
              question: 'A drop of water clings to the outside of the pipet tip and falls into the beaker with each delivery. The calibrated volume will be:',
              options: [
                'too low',
                'unchanged, since it is the same water',
                'too high, by roughly the volume of the drop (a few hundredths of a millilitre)',
                'unchanged on average but less precise',
              ],
              answer: 2,
              explanation:
                'The outside drop is not part of the calibrated delivery, but it ends up in the beaker and is weighed, so each mass (and volume) is too high by about one drop (0.03-0.05 mL). It is systematic, since it happens every time; wiping the tip prevents it.',
            },
          ],
        },
      ],
      project: {
        slug: 'equipment-lab-report',
        title: 'Lab report: equipment, the balance and density',
        description: `Write a full report on Experiment 1 in the report template at the end of the analysis lesson (it saves in your browser and downloads as Markdown). Use your own simulator data: at least five pipet deliveries and three of each other piece of glassware, and three density trials of one unknown. The report must answer two questions with numbers: how precise and how accurate is each piece of glassware, and what is the density of the unknown with its uncertainty? Grade it against the rubric, then check your density with the simulator's "Check my result".`,
        deliverables: [
          'Glassware table: n, mean volume, standard deviation, mean − nominal and tolerance for each piece',
          'Density of the unknown as mean ± propagated uncertainty, with a worked sample calculation',
          'Discussion of at least two specific error sources, the direction of each, and the buoyancy correction',
          'The completed rubric self-check (target 40/50 or better) and the downloaded .md file',
        ],
        estimatedHours: 2.5,
        stretchGoals: ['Apply the buoyancy correction properly (water density 0.9978, air 0.0012, weights 8.0 g/mL) and show the size of the change'],
      },
    },
    {
      slug: 'beers-law-and-food-dyes',
      title: "Experiment 2: Serial Dilutions, Beer's Law and Food Dyes",
      description:
        "Make a set of standards by serial dilution with a Mohr pipet, find a dye's wavelength of maximum absorbance, build a Beer's-law calibration line and use it to find the concentration of the dye in a drink.",
      lessons: [
        {
          slug: 'beers-law-prelab',
          title: "Pre-lab: light, absorbance and Beer's law",
          summary:
            "Why coloured solutions absorb the complementary colour, transmittance and absorbance, Beer's law and its limits, how a spectrophotometer works, the food dyes you will measure, and the pre-lab questions.",
          estimatedMinutes: 100,
          relatedLessons: ['general-chemistry-1/light-and-the-quantum-atom/light-and-photons'],
          objectives: [
            'Relate the colour of a solution to the wavelengths it absorbs',
            'Convert between transmittance and absorbance',
            "Use Beer's law, A = εbc, to relate absorbance and concentration",
            'Explain the role of the blank and why measurements are made at λmax',
            'Describe the parts of a spectrophotometer and the sources of deviation from Beer\'s law',
          ],
          concepts: [
            'Complementary colours',
            'Transmittance T = I/I₀',
            'Absorbance A = −log₁₀ T',
            "Beer's law A = εbc",
            'Molar absorptivity ε',
            'λmax',
            'Blank (reference)',
            'Stray light',
          ],
          explanation: `A solution looks blue because it **absorbs** orange-red light and lets the rest through: we see the complementary colour. FD&C Blue No. 1 (Brilliant Blue FCF) absorbs most strongly near 630 nm, Red No. 40 (Allura Red AC) near 504 nm and Yellow No. 5 (tartrazine) near 427 nm.

A spectrophotometer sends light of one selected wavelength (from a lamp through a grating or filter) through a 1.00 cm cuvette onto a detector. If $I_0$ reaches the detector through the **blank** (the solvent alone) and $I$ through the sample, the **transmittance** is $T = I/I_0$ and the **absorbance** is

$$
A = -\\log_{10} T .
$$

So $T = 10\\%$ is $A = 1$, and $T = 1\\%$ is $A = 2$. Blanking with the solvent in the same kind of cuvette removes the light lost to the cuvette walls and the solvent, so that $A$ measures the dye alone.

**Beer's law** says the absorbance is proportional to the path length $b$ (cm) and the concentration $c$ (mol/L):

$$
A = \\varepsilon b c ,
$$

where $\\varepsilon$, the **molar absorptivity** (L mol⁻¹ cm⁻¹), depends on the substance and the wavelength. Blue No. 1 is an intense dye: about $1.30 \\times 10^5$ L mol⁻¹ cm⁻¹ at 630 nm (FAO/JECFA specification, 164 L g⁻¹ cm⁻¹ times 792.85 g/mol), so a 6 µM solution already has $A \\approx 0.78$. Red No. 40 has about $2.6 \\times 10^4$ at 504 nm and Yellow No. 5 about $2.8 \\times 10^4$ at 427 nm.

You measure at **λmax** because there the absorbance per unit concentration is largest (best sensitivity) and the curve is flat, so a small error in the wavelength setting barely changes the reading. In practice you **calibrate**: measure standards of known concentration, fit a line, and read the unknown from it, rather than trusting a literature ε.

**Limits.** Beer's law is linear only up to an absorbance of about 1 to 1.5 on a typical instrument. Above that, so little light gets through that **stray light** (light of other wavelengths reaching the detector) dominates and readings fall below the line. Concentrated solutions can also deviate chemically. Keep standards and unknowns in the linear range.

**Hazards.** The dyes are food additives; the risks are glass, stains and the instrument's lamp. **Pre-lab questions.** (1) Convert $T = 25.0\\%$ to absorbance. (2) What concentration of Blue No. 1 gives $A = 0.780$ in a 1.00 cm cell? (3) Which colour of light would you use for a red solution?

As a warm-up, open the PhET Beer's Law Lab and change the concentration, path length and wavelength one at a time.`,
          resources: [
            phet('beers-law-lab', "Beer's Law Lab", 'Vary concentration, path length and wavelength and watch absorbance and transmittance respond; 20 minutes.', true),
            {
              title: "UC Davis Chem 4A laboratory manual: Quantitative spectrophotometry and Beer's law",
              url: "https://chem.libretexts.org/Courses/University_of_California_Davis/Chem_4A_Lab%3A_General_Chemistry_for_Majors_I/Chem_4A%3A_Laboratory_Manual/10_7%3A_Quantitative_Spectrophotometry_and_Beer's_Law_(Experiment)",
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'A complete Beer\'s-law experiment: theory, standards and calibration; read the introduction.',
            },
            ostx('6-1-electromagnetic-energy', '6.1 Electromagnetic energy', 'Wavelength, frequency and the visible spectrum, for the colour-wheel argument.'),
          ],
          exercises: [
            {
              slug: 'absorbance-conversions',
              title: 'Absorbance and transmittance',
              prompt:
                'Convert: (a) T = 50.0%, 10.0%, 1.0% and 0.10% to absorbance; (b) A = 0.150, 0.500 and 2.50 to %T. (c) A detector has a noise of ±0.1 %T. What absorbance uncertainty does that give at A = 0.2, 1.0 and 2.5? Explain from this why readings above A ≈ 1.5 are unreliable.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 0.301, 1.000, 2.000, 3.000. (c) dA = 0.434 dT/T: about 0.0007, 0.004 and 0.14.',
            },
            {
              slug: 'dye-concentrations',
              title: 'Plan the dye concentrations',
              prompt:
                'Using ε values from the explanation, find the concentration range (µM) of each of Blue No. 1, Red No. 40 and Yellow No. 5 that gives absorbances between 0.1 and 1.0 in a 1.00 cm cell. Why does the blue dye need much lower concentrations?',
              kind: 'problem',
              difficulty: 1,
              hint: 'Blue: 0.77-7.7 µM; Red: 3.9-39 µM; Yellow: 3.5-35 µM.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a blue dye absorb light near 630 nm rather than near 450 nm?',
              answerOutline: 'Its colour is what is transmitted; it absorbs the complementary orange-red light, so the transmitted light looks blue.',
            },
            {
              question: 'What does blanking the instrument remove, and what does it not remove?',
              answerOutline: 'It removes losses common to blank and sample (cuvette walls, solvent absorbance, lamp intensity). It does not remove differences between cuvettes, fingerprints, or stray light.',
            },
            {
              question: "Why is Beer's law used through a calibration line rather than with a literature ε?",
              answerOutline: 'ε depends on the instrument (bandwidth, wavelength accuracy) and conditions; calibrating with standards on the same instrument cancels those effects.',
            },
          ],
          quiz: [
            {
              question: 'A solution transmits 25.0% of the light at its λmax. What is its absorbance?',
              options: ['0.250', '1.386', '0.398', '0.602'],
              answer: 3,
              explanation:
                '$A = -\\log_{10}(0.250) = 0.602$. Using the natural logarithm gives 1.386; 0.250 is the transmittance itself; 0.398 is $1 - 0.602$.',
            },
            {
              question: 'Why does a solution of FD&C Blue No. 1 look blue?',
              options: [
                'It absorbs blue light and re-emits it',
                'It absorbs orange-red light (near 630 nm) and transmits the rest',
                'It absorbs all visible wavelengths equally',
                'It absorbs only ultraviolet light',
              ],
              answer: 1,
              explanation:
                'We see the light that is not absorbed. Removing orange-red from white light leaves a blue-green-violet mixture that looks blue. A solution absorbing all wavelengths equally would look grey; one absorbing only UV would look colourless.',
            },
            {
              question: 'A Blue No. 1 solution has $A = 0.780$ at 630 nm in a 1.00 cm cell, and $\\varepsilon = 1.30 \\times 10^5$ L mol⁻¹ cm⁻¹. What is its concentration?',
              options: ['60 µM', '0.17 µM', '6.0 µM', '1.0 × 10⁵ M'],
              answer: 2,
              explanation:
                '$c = A/(\\varepsilon b) = 0.780/(1.30 \\times 10^5) = 6.0 \\times 10^{-6}$ M = 6.0 µM. 60 µM is a slipped power of ten; $1.0 \\times 10^5$ multiplies instead of dividing.',
            },
            {
              question: 'Why are Beer\'s-law measurements made at λmax?',
              options: [
                "Beer's law holds only at λmax",
                'There is no stray light at λmax',
                'No blank is needed at λmax',
                'Sensitivity is greatest there and the absorbance changes least with a small error in wavelength',
              ],
              answer: 3,
              explanation:
                "Beer's law holds at any single wavelength, but at the peak the slope (sensitivity) is largest and the spectrum is flat, so wavelength errors matter least. Stray light and the need for a blank are unaffected.",
            },
          ],
        },
        {
          slug: 'serial-dilutions',
          title: 'The Mohr pipet and serial dilutions',
          summary:
            'How to make a set of standards from one stock solution: the dilution equation, serial dilution, delivering a measured volume with a graduated (Mohr) pipet, and how errors accumulate through a dilution series.',
          estimatedMinutes: 100,
          relatedLessons: ['general-chemistry-1/stoichiometry-and-solutions/solutions-and-molarity'],
          objectives: [
            'Use c₁V₁ = c₂V₂ to plan a dilution and a set of standards',
            'Plan a serial dilution and compute the concentration of each step',
            'Read and deliver a volume between two graduations of a Mohr pipet',
            'Estimate how the uncertainty of standards accumulates through a dilution series',
          ],
          concepts: [
            'Stock solution',
            'Dilution equation c₁V₁ = c₂V₂',
            'Made up to volume',
            'Serial dilution',
            'Mohr (graduated) pipet: deliver between marks',
            'Dilution factor',
            'Accumulated error',
          ],
          explanation: `Calibration standards are usually made from one **stock solution** of accurately known concentration. Diluting does not change the number of moles of solute, so

$$
c_1 V_1 = c_2 V_2 ,
$$

where $V_2$ is the final volume. "2.00 mL of stock **made up to** 10.00 mL" (in a volumetric flask, or by adding 8.00 mL of water) gives a dilution factor of 5; "2.00 mL **added to** 10.00 mL of water" gives 12.00 mL and a factor of 6. Read procedures carefully.

**Two ways to make standards.** In *parallel* dilution, each standard is made directly from the stock (1, 2, 3, 4 and 5 mL each made up to 25.00 mL). In *serial* dilution, each solution is made from the previous one (stock diluted 1 : 10, that diluted 1 : 10 again), which reaches very low concentrations with ordinary glassware. Serial dilution has a cost: errors **accumulate**. If each step has a relative uncertainty of 0.3%, two steps give $\\sqrt{2} \\times 0.3\\% = 0.42\\%$ and a systematic error in one step carries into every later solution.

**The Mohr pipet.** UIUC's Lab 3 is built around it. A Mohr pipet is a straight graduated tube (for example 5.00 mL in 0.1 mL divisions) whose scale **does not run to the tip**: you deliver **between two graduations**, never by draining it completely. Fill it a little above the zero mark with a pipet bulb or filler, let it down to a starting graduation, read that reading to 0.01 mL, deliver until the meniscus reaches the second reading, and record both: the volume is their difference, exactly like a burette. A Mohr pipet is less accurate than a volumetric pipet but delivers any volume.

**Planning standards for this experiment.** For Blue No. 1 with a 20.0 µM stock, standards of 1, 2, 4, 6 and 8 µM cover absorbances of about 0.13 to 1.04. Made up to 10.00 mL, they need 0.50, 1.00, 2.00, 3.00 and 4.00 mL of stock. Bracket the unknown: its absorbance should fall between your lowest and highest standards.

**Hazards.** Never pipet by mouth. Dyes stain; wipe spills at once.

The PhET *Concentration* and *Molarity* simulations show the dilution equation at work; ChemCollective's dilution problems ask you to plan dilutions with real glassware choices.`,
          resources: [
            ostx('3-3-molarity', '3.3 Molarity', 'Molarity and the dilution equation with worked examples.', true),
            cc(2, 'Glucose dilution problem', 'Plan and carry out a dilution with virtual glassware; check your concentration.'),
            phet('concentration', 'Concentration', 'Add solute, evaporate and dilute while watching the concentration.'),
          ],
          exercises: [
            {
              slug: 'plan-the-standards',
              title: 'Plan a standard set',
              prompt:
                'From a 50.0 µM stock of Red No. 40, plan five standards between 5 and 40 µM, each made up to 10.00 mL. Give the volume of stock for each, the expected absorbance at 504 nm (ε = 2.58 × 10⁴ L mol⁻¹ cm⁻¹, b = 1.00 cm), and which pipet (5 mL Mohr or volumetric) you would use for each volume.',
              kind: 'problem',
              difficulty: 1,
              hint: 'For example 5, 10, 20, 30, 40 µM need 1.00, 2.00, 4.00, 6.00 and 8.00 mL; A = 0.129, 0.258, 0.516, 0.774, 1.03.',
            },
            {
              slug: 'serial-chain',
              title: 'A serial dilution chain',
              prompt:
                'A 1.000 mM stock is diluted serially: 1.00 mL made up to 10.00 mL, then 1.00 mL of that made up to 10.00 mL, then 2.00 mL of that made up to 10.00 mL. (a) Give each concentration. (b) If each 1.00 mL transfer has an uncertainty of ±0.006 mL and each 10.00 mL flask ±0.02 mL, what is the relative uncertainty of the final solution? (c) Which single transfer contributes most?',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 100 µM, 10.0 µM, 2.00 µM. (b) Each 1.00 mL step contributes 0.6%, the 2.00 mL step 0.3%, each flask 0.2%: about √(0.36+0.36+0.09+3×0.04) ≈ 0.96%.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between "made up to 10.00 mL" and "added to 10.00 mL of water"?',
              answerOutline: 'Made up to: the final volume is 10.00 mL. Added to: the final volume is the sum of the two volumes.',
            },
            {
              question: 'Why is a Mohr pipet never drained completely to deliver its full volume?',
              answerOutline: 'Its graduations stop above the tip; the tip volume is not calibrated, so you deliver between two graduations and read both.',
            },
            {
              question: 'Give one advantage and one disadvantage of serial dilution.',
              answerOutline: 'Reaches very low concentrations with normal glassware; errors accumulate and propagate to every later solution.',
            },
          ],
          quiz: [
            {
              question: '2.00 mL of a 50.0 µM stock is made up to 10.00 mL. What is the new concentration?',
              options: ['8.33 µM', '10.0 µM', '250 µM', '0.400 µM'],
              answer: 1,
              explanation:
                '$c_2 = c_1V_1/V_2 = 50.0 \\times 2.00/10.00 = 10.0$ µM. 8.33 µM is what you get if 2.00 mL is added to 10.00 mL (12.00 mL in all); 250 µM inverts the ratio.',
            },
            {
              question: 'A 100 µM stock is diluted 1 : 10, and the result diluted 1 : 10 again. What is the final concentration?',
              options: ['1.00 µM', '10.0 µM', '0.100 µM', '20.0 µM'],
              answer: 0,
              explanation:
                'Each step divides by 10: 100 → 10.0 → 1.00 µM. Dilution factors multiply (×100), they do not add (which would wrongly give 100/20 = 5 µM).',
            },
            {
              question: 'A 5 mL Mohr pipet is filled; the meniscus starts at the 0.40 mL mark and you stop at 3.65 mL. What volume did you deliver?',
              options: ['3.65 mL', '4.05 mL', '3.25 mL', '1.35 mL'],
              answer: 2,
              explanation:
                'Like a burette, the Mohr pipet scale counts the volume delivered from the top: $3.65 - 0.40 = 3.25$ mL. 3.65 ignores the starting reading; 1.35 is what would be left below the 3.65 mark of a 5 mL scale.',
            },
            {
              question: 'Each step of a two-step serial dilution has an independent relative uncertainty of 0.3%. What is the relative uncertainty of the final solution?',
              options: ['0.09%', '0.6%', '0.3%', '0.42%'],
              answer: 3,
              explanation:
                'Relative uncertainties of products combine in quadrature: $\\sqrt{0.3^2 + 0.3^2} = 0.42\\%$. Adding them (0.6%) is a worst case; 0.3% ignores the second step; 0.09% multiplies them.',
            },
          ],
        },
        {
          slug: 'food-dye-experiment',
          title: 'The experiment: a Beer\'s-law calibration and an unknown',
          summary:
            "Run the spectrophotometer: blank it, scan a standard to find λmax, read every standard and the unknown at that wavelength, and see what skipping the blank, not rinsing the cuvette and over-concentrated standards do.",
          estimatedMinutes: 120,
          objectives: [
            'Blank a spectrophotometer and find λmax from a scan',
            'Measure a set of standards and an unknown at a fixed wavelength with replicate readings',
            'Recognise the effect of skipping the blank and of carry-over between cuvettes',
            'Show the stray-light limit of the linear range with a concentrated standard set',
          ],
          concepts: [
            'Calibrate with the blank',
            'Spectrum scan',
            'Fixed-wavelength reading',
            'Replicate readings',
            'Rinsing the cuvette',
            'Order of measurement: dilute to concentrated',
          ],
          explanation: `Prepare a notebook table: solution, concentration (µM), absorbance (three readings), mean. Record the dye and the wavelength you choose.

**Procedure**

1. Start a sample. Put the **Blank** (water) in the holder and press **Calibrate with blank**.
2. Put the highest standard in the holder and press **Scan spectrum**. Find the wavelength of maximum absorbance from the plot, then set the wavelength slider to it (refine by reading the absorbance a few nanometres either side).
3. Read the **blank** at that wavelength: it should read 0.000 ± 0.002. If not, calibrate again.
4. Measure the standards **from the most dilute to the most concentrated**, rinsing the cuvette with each new solution (leave the rinse switch on). Take three readings of each and record them all.
5. Measure the **unknown** three times.
6. Variations, each recorded separately: (a) start a new sample and measure the standards **without** calibrating with the blank; (b) switch rinsing off and go from S5 straight to the unknown; (c) measure at a wavelength 60 nm away from λmax.
7. Before leaving the bench, plot absorbance against concentration (a rough sketch is enough) to check the points are on a line and the unknown lies inside the range.

\`\`\`interactive
lab-spectrophotometer
{"dye": "blue1", "caption": "Blank first, scan a standard, set the wavelength to λmax, then read each standard three times and the unknown three times. Record every reading. Check your unknown concentration only after fitting your own calibration line."}
\`\`\`

The second bench below has standards up to 30 µM of the same dye. Measure them at λmax and look at what happens above A ≈ 1.5: this is stray light, and it is why calibrations are kept to absorbances below about 1.

\`\`\`interactive
lab-spectrophotometer
{"dye": "blue1", "standards": [2, 5, 10, 15, 20, 30], "stray": 0.004, "title": "Spectrophotometer: a concentrated standard set", "caption": "Read all six standards at λmax and plot them. The top two fall below the straight line through the others: stray light flattens the response at high absorbance."}
\`\`\`

**What you cannot learn here.** Handling cuvettes by the frosted sides, wiping the clear faces with lens tissue, avoiding bubbles and keeping the same orientation in the holder. The simulator imitates their effect as small random scatter; a real bench rewards the habits.

**Real-world sample.** The unknown stands for a drink diluted 1 : 10 before measurement; in the analysis you will convert back to the drink's concentration in mg/L.`,
          resources: [
            smc('Chem_11_Experiments/13%3A_Measuring_Manganese_Concentration_Using_Spectrophotometry_(Experiment)', 'Measuring manganese concentration using spectrophotometry', 'The same method on a different coloured species, with a real procedure and data sheet.', true),
            phet('beers-law-lab', "Beer's Law Lab", 'Compare with the simulator: what happens to %T as concentration rises?'),
          ],
          exercises: [
            {
              slug: 'run-the-calibration',
              title: 'Run the calibration and the unknown',
              prompt:
                'Carry out steps 1-5 in the first spectrophotometer, recording three readings of every solution. Then do variation (a), (b) and (c) of step 6 and record how each changes the readings. Put all raw data in a spreadsheet sheet named "raw".',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'other-dyes',
              title: 'Repeat with Red No. 40',
              prompt: `Repeat the calibration with Red No. 40 in the bench below: blank, scan, choose λmax, read the five standards and the unknown in triplicate. Compare the slope (sensitivity per µM) with your Blue No. 1 slope and explain the ratio from the two molar absorptivities.

\`\`\`interactive
lab-spectrophotometer
{"dye": "red40", "title": "Spectrophotometer: Red No. 40", "caption": "Same procedure, a different dye: find this dye's own λmax from a scan before reading the standards."}
\`\`\``,
              kind: 'simulation',
              difficulty: 2,
              hint: 'The slopes should be in the ratio of the molar absorptivities, about 2.58 × 10⁴ / 1.30 × 10⁵ ≈ 0.20.',
            },
            {
              slug: 'stray-light-limit',
              title: 'Find the linear range',
              prompt:
                'In the concentrated bench, measure all six standards three times at λmax. Fit a line to all six and to the lowest four. Compare the slopes and residuals, and state the largest absorbance you would trust on this instrument, with your evidence.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are standards measured from the most dilute to the most concentrated?',
              answerOutline: 'Any carry-over in the cuvette then adds a little of a more dilute solution to a more concentrated one, which matters least; going the other way inflates the dilute readings.',
            },
            {
              question: 'What happened to your readings when you skipped the blank, and why does the unknown still come out right if it was measured the same way?',
              answerOutline: 'Every reading rose by about the cuvette-and-water absorbance (≈0.05). The offset raises the intercept but not the slope; the unknown carries the same offset, so it cancels when read from the calibration.',
            },
            {
              question: 'Why does measuring 60 nm from λmax make the calibration worse even though it is still linear?',
              answerOutline: 'The slope (sensitivity) is smaller, so the same absolute noise is a larger relative error; on a steep part of the spectrum, small wavelength errors also change A.',
            },
          ],
          quiz: [
            {
              question: 'You measure all standards and the unknown without calibrating with the blank first. What happens?',
              options: [
                'Every concentration you report comes out too high',
                'The slope of the calibration doubles',
                "Beer's law no longer applies at all",
                'The intercept rises by the blank absorbance; the slope is unchanged, so the unknown read the same way is still found correctly',
              ],
              answer: 3,
              explanation:
                'Not blanking adds the same absorbance (cuvette and water) to every reading. The fitted line shifts up by that amount but keeps its slope, and the unknown carries the same offset, so reading it off the calibration cancels it. It does bias ε calculated from a single reading.',
            },
            {
              question: 'Which wavelength should you use for a Red No. 40 calibration?',
              options: ['About 504 nm', 'About 630 nm', 'About 427 nm', 'About 700 nm'],
              answer: 0,
              explanation:
                'Red No. 40 absorbs blue-green light most strongly, near 504 nm. 630 nm is the blue dye\'s peak and 427 nm the yellow dye\'s; at 700 nm a red solution barely absorbs.',
            },
            {
              question: 'You go from standard S5 (8 µM) straight to the unknown (about 5 µM) without rinsing the cuvette. The unknown\'s reading will be:',
              options: ['unchanged', 'too low', 'zero', 'slightly too high, because some of the more concentrated solution remains in the cuvette'],
              answer: 3,
              explanation:
                'The film of S5 left in the cuvette raises the unknown\'s concentration a little, so its absorbance and the concentration you report are slightly high. Rinsing the cuvette with the next solution first removes the problem.',
            },
          ],
        },
        {
          slug: 'beers-law-analysis',
          title: "Analysis: the calibration line, ε and the unknown",
          summary:
            'Fit the calibration with LINEST, judge its linearity from the residuals, compute the molar absorptivity from the slope, find the unknown concentration and the dye content of the drink with uncertainties, and write the report.',
          estimatedMinutes: 110,
          objectives: [
            'Fit A against c with LINEST and judge the fit by its residuals and intercept',
            'Compute the molar absorptivity from the slope and compare it with the literature value',
            'Find the unknown concentration with an uncertainty and convert it to mg/L in the original drink',
            'Explain the effect of stray light, a skipped blank and carry-over on the result',
          ],
          concepts: [
            'Calibration slope = εb',
            'Intercept and its uncertainty',
            'Linear range',
            'Inverse prediction c = (A − b)/m',
            'Dilution factor back to the sample',
            'mg/L from mol/L',
          ],
          explanation: `**Step 1: the fit.** Average the replicate readings of each standard. Plot A (y) against c in µM (x) and fit with LINEST to get the slope $m$, intercept $b$, their standard errors and $s_y$. Look at the residuals: random scatter of a few thousandths is good data; a curve means points outside the linear range (drop them and say so). The intercept should be zero within about two standard errors; if it is clearly not, suspect the blank.

**Step 2: ε.** The slope is $\\varepsilon b$ per µM. With $b = 1.00$ cm and $m = 0.1287$ µM⁻¹, $\\varepsilon = 0.1287 \\times 10^6 = 1.287 \\times 10^5$ L mol⁻¹ cm⁻¹. Compare with the specification value ($1.30 \\times 10^5$ at 630 nm). A difference of 1% or 2% is normal: commercial dye is not 100% pure, and your wavelength and bandwidth differ from the reference instrument's. This is exactly why you calibrate.

**Step 3: the unknown.** $c_u = (\\bar A_u - b)/m$, with an uncertainty of about $s_y/m$ (plus the scatter of your three unknown readings). If the unknown was a drink diluted 1.00 mL to 10.00 mL, multiply by 10. Convert to mass per litre with the molar mass of the dye as sold (Blue No. 1, disodium salt, 792.85 g/mol): $48.5$ µM is $48.5 \\times 10^{-6} \\times 792.85 = 0.0385$ g/L, or 38.5 mg/L.

**What good data look like.** Three readings of each solution within 0.003; residuals under 0.01 with no pattern; $R^2 > 0.999$; an intercept within ±0.01 of zero; the unknown inside the standard range.

**Common errors and their direction.** No blank: intercept up by about 0.05, unknown unaffected if measured the same way, ε from one point too high. Carry-over from a concentrated solution: readings too high. Fingerprints or bubbles: random scatter, occasionally high. Standards above A ≈ 1.5: slope too low, unknowns overestimated near the top. An error in the stock concentration: every standard off by the same factor, so the unknown is off by that factor (systematic, invisible in R²).

Write your report in the template below; it is the module project.

\`\`\`interactive
lab-report
{"experiment": "beers-law", "caption": "Your report for Experiment 2: insert the table skeleton, add your calibration figure description and residuals, and grade yourself with the rubric."}
\`\`\``,
          resources: [
            ostx('4-5-quantitative-chemical-analysis', '4.5 Quantitative chemical analysis', 'Analytical calculations and the idea of a standard; read the section on titration too, for the next module.', true),
            smc('Chem_11_Experiments/01%3A_Using_Excel_for_Graphical_Analysis_of_Data_(Experiment)', 'Using Excel for graphical analysis of data', 'Review the trendline and slope steps before you fit your calibration.'),
          ],
          exercises: [
            {
              slug: 'fit-your-data',
              title: 'Fit your own calibration',
              prompt:
                'With your data, report: slope and intercept with standard errors, R², a residual plot, ε with uncertainty compared with 1.30 × 10⁵ L mol⁻¹ cm⁻¹ (percent difference), and the unknown concentration with uncertainty. Then use the simulator\'s Check my result and comment on the agreement.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'sports-drink',
              title: 'From absorbance to milligrams per litre',
              prompt:
                'A sports drink is diluted 2.00 mL to 25.00 mL. The diluted solution has A = 0.512 at 630 nm. The calibration is A = 0.1295c + 0.002 (c in µM). Find the Blue No. 1 concentration in the drink in µM and in mg/L (792.85 g/mol). How many milligrams are in a 591 mL bottle?',
              kind: 'problem',
              difficulty: 2,
              hint: 'c = 3.938 µM diluted; ×12.5 = 49.2 µM; ×792.85 g/mol = 39.0 mg/L; 23.1 mg per bottle.',
            },
            {
              slug: 'beers-law-report',
              title: "Write the Experiment 2 report",
              prompt:
                'Write the full report in the template above. The discussion must address the linear range (with your concentrated-standard data), the intercept, the comparison of ε with the specification value, and at least two specific error sources with their directions.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why can your ε differ from the specification value by a percent or two even with perfect technique?',
              answerOutline: 'Dye purity below 100%, instrument bandwidth and wavelength calibration; the calibration line handles these for unknowns measured on the same instrument.',
            },
            {
              question: 'An error in the stock concentration does not show in R². Why not, and how would you detect it?',
              answerOutline: 'All standards are off by the same factor, so they still lie on a straight line; detect it with an independent check standard or a second stock.',
            },
            {
              question: 'How do you convert a concentration measured in a diluted sample back to the original sample?',
              answerOutline: 'Multiply by the dilution factor (final volume / aliquot volume), then convert mol/L to g/L with the molar mass if needed.',
            },
          ],
          quiz: [
            {
              question: 'A calibration (A against c in µM, b = 1.00 cm) has slope 0.1287 µM⁻¹. What is the molar absorptivity?',
              options: ['0.1287 L mol⁻¹ cm⁻¹', '1.287 × 10² L mol⁻¹ cm⁻¹', '1.287 × 10⁵ L mol⁻¹ cm⁻¹', '7.77 L mol⁻¹ cm⁻¹'],
              answer: 2,
              explanation:
                'The slope is per µM, that is per $10^{-6}$ mol/L, so $\\varepsilon = 0.1287 \\times 10^6 / 1.00 = 1.287 \\times 10^5$ L mol⁻¹ cm⁻¹. Forgetting the unit conversion leaves 0.1287; converting from mM instead of µM gives $10^2$; 7.77 is the reciprocal.',
            },
            {
              question: 'A drink was diluted 1.00 mL to 10.00 mL and the diluted solution contains 4.85 µM of Blue No. 1 (792.85 g/mol). How much dye does the drink contain?',
              options: ['3.85 mg/L', '38.5 mg/L', '0.485 mg/L', '385 mg/L'],
              answer: 1,
              explanation:
                'The drink is 48.5 µM; $48.5 \\times 10^{-6} \\times 792.85 = 0.0385$ g/L = 38.5 mg/L. 3.85 mg/L forgets the dilution; 385 mg/L applies it twice.',
            },
            {
              question: 'An instrument has a stray-light fraction of 0.003. A solution whose true absorbance is 2.00 will read about:',
              options: ['1.89', '2.00', '2.10', '1.50'],
              answer: 0,
              explanation:
                'True T = 0.0100; measured $T = (0.0100 + 0.003)/(1.003) = 0.0130$, so $A = -\\log 0.0130 = 1.89$. Stray light always makes high absorbances read low, never high.',
            },
            {
              question: 'Your calibration has $R^2 = 0.9995$ but an intercept of $0.062 \\pm 0.004$. What is the most likely cause?',
              options: [
                'Random noise in the readings',
                'Stray light at high absorbance',
                'Working away from λmax',
                'An offset common to every reading, such as a skipped or faulty blank',
              ],
              answer: 3,
              explanation:
                'An intercept many standard errors from zero, with excellent linearity, means every reading carries the same extra absorbance: a blank problem (or a dirty cuvette used throughout). Stray light bends the top of the line; working off-peak lowers the slope; random noise does not produce a consistent offset.',
            },
          ],
        },
      ],
      project: {
        slug: 'beers-law-lab-report',
        title: "Lab report: Beer's law and food dyes",
        description: `Write the full report on Experiment 2 in the template at the end of the analysis lesson, from your own simulator data: a calibration of at least five standards measured in triplicate, an unknown in triplicate, the variations (no blank, no rinse, off-peak wavelength) and the concentrated-standard set. The report answers: what is the dye concentration of the unknown (and of the original drink, in mg/L), how good is the calibration, and over what range does Beer's law hold on this instrument?`,
        deliverables: [
          'Calibration table and figure with the fitted line, its equation with uncertainties, R² and a residual plot',
          'Unknown concentration with uncertainty, converted to mg/L in the original drink',
          'ε from the slope compared with the specification value, and the linear range with evidence',
          'Discussion of the blank, carry-over and stray light, each with its direction; completed rubric and the downloaded .md file',
        ],
        estimatedHours: 2.5,
        stretchGoals: ['Add the Red No. 40 calibration from the exercise in the experiment lesson and compare the sensitivity and detection limit of the two dyes'],
      },
    },
    {
      slug: 'titrations-and-the-buret',
      title: 'Experiment 3: Titrations, the Burette and the Molar Mass of an Unknown Acid',
      description:
        'Standardise a sodium hydroxide solution against the primary standard KHP, then use it to find the molar mass of an unknown solid acid, reading the burette yourself and watching the titration curve with a pH meter.',
      lessons: [
        {
          slug: 'titration-prelab',
          title: 'Pre-lab: acid-base titration',
          summary:
            'Neutralisation stoichiometry, why NaOH must be standardised and why KHP is a primary standard, equivalence point versus end point, how an indicator works, the shape of a weak-acid titration curve, burette technique and the hazards.',
          estimatedMinutes: 110,
          relatedLessons: ['general-chemistry-1/stoichiometry-and-solutions/acid-base-redox-and-titration'],
          objectives: [
            'Write the titration reaction of KHP with NaOH and compute the KHP mass for a planned titrant volume',
            'Explain why NaOH is standardised and what makes a primary standard',
            'Distinguish the equivalence point from the end point and choose an indicator',
            'Sketch a weak-acid titration curve and read the pKa at half-equivalence',
            'Describe burette preparation: rinsing, removing the tip bubble, reading',
          ],
          concepts: [
            'Titrant and analyte',
            'Primary standard (KHP, 204.22 g/mol)',
            'Standardisation',
            'Equivalence point and end point',
            'Phenolphthalein (colourless to pink, pH 8.2-10)',
            'Half-equivalence: pH = pKa',
            'Rough and precise titrations',
            'Air bubble in the burette tip',
          ],
          explanation: `In a **titration** you add a solution of known concentration (the **titrant**, here NaOH) from a burette to a measured amount of the substance you are analysing (the **analyte**) until the reaction is exactly complete. For an acid HA,

$$
\\mathrm{HA(aq) + OH^-(aq) \\rightarrow A^-(aq) + H_2O(l)},
$$

so at the **equivalence point** moles of NaOH added equal moles of acid: $c_{\\mathrm{NaOH}} V_{\\mathrm{NaOH}} = n_{\\mathrm{acid}}$.

**Why standardise NaOH?** Solid NaOH absorbs water and carbon dioxide from the air, so a weighed mass is not a known amount of NaOH, and its solutions slowly react with CO₂. Its concentration must be measured against a **primary standard**: a substance that is pure, stable, not hygroscopic, has a known formula and a high molar mass (so weighing errors are small). Potassium hydrogen phthalate, KHP (KHC₈H₄O₄, 204.22 g/mol), is the classic choice: it reacts 1 : 1 with NaOH, so about 0.51 g (0.0025 mol) uses about 25 mL of 0.1 M NaOH.

**Equivalence point and end point.** The equivalence point is a stoichiometric fact; the **end point** is what you see, when the indicator changes colour. A good indicator changes within a drop of it. **Phenolphthalein** is colourless below pH about 8.2 and pink above; titrating a weak acid such as KHP, the pH at equivalence is about 9 (the phthalate ion is a weak base), right in that range. The end point is the **first faint pink that lasts 30 seconds** while swirling; deep pink means you overshot.

**The titration curve.** With a pH meter, a weak acid gives a curve that rises gently through a buffer region and then jumps steeply by several pH units near equivalence. At **half the equivalence volume**, $[\\mathrm{HA}] = [\\mathrm{A^-}]$, so $\\mathrm{pH} = \\mathrm{p}K_a$: 5.41 for KHP. A strong acid gives a curve that starts lower and has no buffer region.

**Burette technique.** Rinse the burette twice with the NaOH, fill it, run some out to fill the tip and **remove any air bubble** (one that escapes mid-titration makes the volume read too large). Do one fast **rough** titration, then precise ones: quickly to about 1 mL before the end point, then drops, then half-drops touched off on the flask wall.

**Hazards.** 0.1 M NaOH is an eye and skin irritant (stronger solutions are corrosive): goggles. Phenolphthalein is dissolved in ethanol (flammable) and the solid is classified as a presumed carcinogen under GHS; it is used a few drops at a time and should not touch skin. Fill the burette below eye level, using a funnel you remove afterwards.

**Pre-lab questions.** (1) Why not just weigh out NaOH? (2) Sketch the curve; mark equivalence and half-equivalence.`,
          resources: [
            ostx('14-7-acid-base-titrations', '14.7 Acid-base titrations', 'Titration curves for strong and weak acids, indicators and their ranges.', true),
            mit('titration', 'Titration', 'Burette preparation, reading, swirling and half-drops, shown properly; about 12 minutes.'),
            phet('acid-base-solutions', 'Acid-base solutions', 'Strong against weak acids and the meaning of pH, for the curve shapes.'),
          ],
          exercises: [
            {
              slug: 'titration-prelab-questions',
              title: 'Answer the pre-lab questions',
              prompt:
                'Answer the two pre-lab questions. For (2), draw the curve for 0.51 g of KHP in 50 mL of water titrated with 0.100 M NaOH, marking the starting pH (about 4.2), the half-equivalence volume and pH, the equivalence volume and pH (about 9), and the phenolphthalein range.',
              kind: 'problem',
              difficulty: 1,
              hint: '0.51 g / 204.22 g/mol = 2.50 mmol, so equivalence at 25.0 mL and half-equivalence at 12.5 mL, pH 5.41.',
            },
            {
              slug: 'red-cabbage-indicator',
              title: 'Optional at home: a red-cabbage indicator',
              prompt:
                'Chop a few red-cabbage leaves, cover with hot water from a kettle, let it cool for 15 minutes and strain. Add a spoonful of the purple extract to small glasses of: white vinegar, lemon juice, tap water, baking-soda solution (one teaspoon in a cup of water) and a washing-soda (sodium carbonate) solution if you have one. Record the colours and rank the solutions from most acidic to most basic. Then add baking-soda solution dropwise to a glass of vinegar with extract and note the colour changes: a kitchen titration. Safety: food materials only; washing soda irritates eyes, so wear glasses and rinse spills; never mix with bleach or other cleaners; do not drink the samples.',
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'List four properties of a good primary standard and say why each matters.',
              answerOutline: 'High purity (known amount), stable and not hygroscopic (mass stays true), known stoichiometry (1:1), high molar mass (small relative weighing error); also soluble and cheap.',
            },
            {
              question: 'Why is the pH at the equivalence point of a KHP titration above 7?',
              answerOutline: 'The product phthalate ion is a weak base; the solution of its salt is basic (pH about 9).',
            },
            {
              question: 'What does an air bubble in the burette tip do to the result if it escapes during the titration?',
              answerOutline: 'The burette reading changes by the bubble volume without delivering it, so the recorded volume is too large and the NaOH molarity calculated is too low.',
            },
          ],
          quiz: [
            {
              question: 'How much KHP (204.22 g/mol) should you weigh so that the titration needs about 25 mL of 0.10 M NaOH?',
              options: ['0.051 g', '0.26 g', '0.51 g', '5.1 g'],
              answer: 2,
              explanation:
                '$n = 0.10 \\times 0.025 = 2.5 \\times 10^{-3}$ mol, and $2.5 \\times 10^{-3} \\times 204.22 = 0.51$ g. 0.26 g assumes two acidic hydrogens; 0.051 and 5.1 slip a power of ten.',
            },
            {
              question: 'What is the difference between the equivalence point and the end point?',
              options: [
                'They are the same thing',
                'The end point always comes first, by definition',
                'The equivalence point is where the pH is exactly 7',
                'The equivalence point is where moles of base equal moles of acid; the end point is where the indicator changes, ideally within a drop of it',
              ],
              answer: 3,
              explanation:
                'Equivalence is stoichiometric; the end point is observed. Choosing an indicator whose colour change falls on the steep part of the curve makes them agree within a drop. The pH at equivalence is 7 only for strong acid with strong base.',
            },
            {
              question: 'Halfway to the equivalence point of a KHP titration, the pH meter reads 5.40. What does this tell you?',
              options: [
                'The pKa of the hydrogen phthalate ion is about 5.40',
                'The NaOH concentration is 5.40 × 10⁻² M',
                'The end point has been reached',
                'Ka of the acid is 5.40',
              ],
              answer: 0,
              explanation:
                'At half-equivalence $[\\mathrm{HA}] = [\\mathrm{A^-}]$, so the Henderson-Hasselbalch equation gives pH = pKa (literature 5.41). Ka would be $10^{-5.40} = 4.0 \\times 10^{-6}$, not 5.40.',
            },
            {
              question: 'Why is a sodium hydroxide solution standardised instead of being made from a weighed mass of solid NaOH?',
              options: [
                'NaOH is a weak base, so its concentration cannot be calculated',
                'NaOH solutions change colour over time',
                'Solid NaOH absorbs water and carbon dioxide from the air, so a weighed mass is not a known amount of NaOH',
                'NaOH decomposes into sodium and oxygen when dissolved',
              ],
              answer: 2,
              explanation:
                'NaOH is hygroscopic and reacts with atmospheric CO₂, so neither the solid nor its solutions have a reliably known composition. It is a strong base, colourless, and does not decompose on dissolving.',
            },
          ],
        },
        {
          slug: 'standardizing-naoh',
          title: 'The experiment: standardising NaOH with KHP',
          summary:
            'Run the titration bench: weigh KHP, fill and read the burette, do a rough titration and then three precise ones to a phenolphthalein end point, and see what over-shooting, a tip bubble or the wrong indicator does.',
          estimatedMinutes: 120,
          objectives: [
            'Carry out a rough titration and at least three precise titrations',
            'Read the burette meniscus to 0.01 mL before and after each titration',
            'Approach the end point with drops and half-drops and recognise the first lasting faint pink',
            'Record observations that matter for the error analysis (overshoot, bubbles)',
          ],
          concepts: [
            'Rough titration',
            'Precise (concordant) trials',
            'First persistent faint pink',
            'Half-drop technique',
            'Different KHP masses per trial',
            'Over-shooting',
          ],
          explanation: `Prepare a table with columns: trial, mass of KHP (g), initial burette reading (mL), final burette reading (mL), volume of NaOH (mL), notes.

**Procedure**

1. Start a sample. Set the target mass to about 0.45-0.55 g and **weigh the sample into the flask**. Record the balance reading.
2. Read the **initial burette level** in the magnifier (the numbers increase downward) and record it to 0.01 mL.
3. **Rough titration:** add NaOH in 1 mL streams, watching the colour, until the solution turns pink. Record the final reading. The rough end point tells you where to slow down; do not use it in the calculation.
4. **Precise titration:** weigh a new sample (**New flask**). Read the burette (refill if fewer than about 30 mL remain). Add NaOH quickly to about 2 mL before the expected volume (scaled to this sample's mass), then single drops, swirling (watch for the streak of colour that fades), then **half drops** once the colour fades slowly. Stop at the **first faint pink that stays**. Record the final reading.
5. Repeat step 4 for at least three precise trials. Molarities from different trials should agree within about 0.2%.
6. Variations, recorded separately: (a) a trial where you deliberately overshoot by three drops; (b) a trial with the pH meter in the flask, adding 1 mL at a time far from the end point and drops near it, to see the curve; (c) one trial with **bromothymol blue** as the indicator, stopping at the first green-blue.

\`\`\`interactive
lab-titration
{"mode": "standardize", "caption": "Weigh about 0.5 g of KHP, read the burette, and titrate to the first lasting faint pink. Record every burette reading yourself: the bench never shows the volume added. Check your NaOH molarity only after averaging your trials."}
\`\`\`

A second bench has a burette with **an air bubble in its tip**. Do one titration on it with the same care and compare the molarity you get with your good trials.

\`\`\`interactive
lab-titration
{"mode": "standardize", "bubble": true, "title": "Titration bench: a bubble in the burette tip", "caption": "The bubble escapes with your first delivery. The burette level drops by more than the volume that reached the flask: see which way it moves your molarity."}
\`\`\`

**What you cannot learn here.** Working the stopcock with one hand while swirling with the other, judging a faint pink against a white tile, and the patience of half-drops: practise these if you ever reach a real bench. ChemCollective's KHP standardisation lab is a good second virtual bench.`,
          resources: [
            cc(101, 'Standardization of NaOH with a KHP solution', 'A second virtual standardisation with different glassware choices; compare your answers.', true),
            mit('titration', 'Titration', 'Re-watch the end-point section before your precise trials.'),
            smc('Chem_10_Experiments/11%3A_Titration_of_Vinegar_(Experiment)', 'Titration of vinegar', 'A real student procedure and data sheet for the same technique.'),
          ],
          exercises: [
            {
              slug: 'standardize-three',
              title: 'Three concordant trials',
              prompt:
                'Do a rough titration and at least three precise titrations with different KHP masses (0.40-0.60 g). Record every reading. Compute each molarity; if any trial differs from the others by more than 0.3%, do another and decide, with a stated reason, which to keep.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'error-trials',
              title: 'Measure the size of three errors',
              prompt:
                'Using the variations in step 6 and the bubble bench, measure how much each error changes the molarity: overshoot by three drops, the tip bubble, and bromothymol blue. Express each as a percent of your good mean, and say whether each is random or systematic.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Three drops (0.15 mL) in 25 mL is about −0.6%; the bubble is −0.5% to −0.8%; bromothymol blue stops about 2% early for KHP, making the molarity about 2% high.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a rough titration done first, and why is its result not used?',
              answerOutline: 'To find where the end point is so the precise trials can be done fast and then dropwise; it is deliberately overshot, so it is inaccurate.',
            },
            {
              question: 'Why do the precise trials use different masses of KHP rather than identical ones?',
              answerOutline: 'Any mass gives a valid molarity; different masses mean the volumes differ, so you cannot unconsciously stop at the same reading, and agreement is a real check.',
            },
            {
              question: 'Why does bromothymol blue make the NaOH molarity too high for a KHP titration?',
              answerOutline: 'It changes near pH 7, before the equivalence pH (about 9), so the end point comes too early; the volume is too small, and c = n/V comes out too large.',
            },
          ],
          quiz: [
            {
              question:
                'A trial uses 0.5123 g of KHP (204.22 g/mol). The burette reads 0.48 mL before and 25.12 mL at the end point. What is the NaOH molarity?',
              options: ['0.0999 M', '0.1018 M', '0.2036 M', '0.1000 M'],
              answer: 1,
              explanation:
                '$n = 0.5123/204.22 = 2.5086 \\times 10^{-3}$ mol; $V = 25.12 - 0.48 = 24.64$ mL; $c = 2.5086 \\times 10^{-3}/0.02464 = 0.1018$ M. Using the final reading alone as the volume gives 0.0999 M.',
            },
            {
              question: 'You overshoot the end point: the flask turns deep pink. Using that final reading, the NaOH molarity you calculate is:',
              options: ['too high', 'unchanged', 'too low', 'too high or too low depending on the indicator'],
              answer: 2,
              explanation:
                'The recorded volume is larger than the equivalence volume, and $c = n_{\\mathrm{KHP}}/V$, so c is too low. With phenolphthalein, an overshoot always means too much base.',
            },
            {
              question: 'Before titrating, a little of the dissolved KHP solution splashes out of the flask. The NaOH molarity you calculate is:',
              options: ['too high', 'too low', 'unchanged', 'impossible to predict'],
              answer: 0,
              explanation:
                'Fewer moles of KHP remain than you weighed, so less NaOH is needed. Dividing the full weighed moles by the smaller volume gives a molarity that is too high.',
            },
            {
              question: 'Near the end point, each drop makes a pink streak that disappears when you swirl. What should you do?',
              options: [
                'Stop: the first pink of any kind is the end point',
                'Add a large stream of NaOH to finish quickly',
                'Add more indicator',
                'Keep adding single drops, swirling after each, then half-drops until a faint pink lasts',
              ],
              answer: 3,
              explanation:
                'A fading streak means the base is locally in excess where it lands but the flask as a whole is still acidic: you are close. Slow down to drops and half-drops. Stopping now ends the titration early; a stream overshoots; more indicator does not change the end point.',
            },
          ],
        },
        {
          slug: 'unknown-acid-titration',
          title: 'The experiment: the molar mass of an unknown acid',
          summary:
            'Titrate weighed samples of an unknown monoprotic solid acid with standardised NaOH, follow one titration with the pH meter, and identify the acid from its molar mass and its titration curve.',
          estimatedMinutes: 110,
          objectives: [
            'Plan the mass of an unknown acid to give a convenient titrant volume',
            'Compute a molar mass from a mass, a molarity and a titrant volume',
            'Use a titration curve to tell a weak acid from a strong one and estimate its pKa',
            'Identify an unknown acid from two independent pieces of evidence',
          ],
          concepts: [
            'Molar mass = mass / moles',
            'Monoprotic acid assumption',
            'Planning the sample mass',
            'Curve shape: strong versus weak',
            'pKa from half-equivalence',
            'Two independent lines of evidence',
          ],
          explanation: `UIUC's CHEM 103 has a lab on determining the molar mass of an unknown; this course does it by titration. If the unknown acid HA is **monoprotic**, the moles of acid equal the moles of NaOH at equivalence, so

$$
M = \\frac{m_{\\mathrm{acid}}}{c_{\\mathrm{NaOH}}\\, V_{\\mathrm{NaOH}}} .
$$

The uncertainty of M combines those of the mass, the volume and the NaOH molarity, so a careful standardisation matters here.

**Planning.** You do not know M, so do one rough titration with about 0.3 g. If it needs $V_r$ mL, scale the mass for the precise trials so they need 20-30 mL: $m = 0.3 \\times 25/V_r$ g.

**Procedure**

1. Note the NaOH molarity on the bench label (it was standardised for you; in a real lab you would use your own value from the last lesson).
2. Weigh about 0.30 g of the unknown into the flask and do a rough titration with phenolphthalein. Record all readings.
3. Calculate the mass for about 25 mL and do three precise titrations, each with its own weighed sample.
4. Do one more titration with the **pH meter**: add 1-2 mL at a time early on, 0.1 mL or drops near the jump, and a few millilitres beyond. Note the pH at the start, at half the equivalence volume, and the size of the jump.
5. Identify the acid: the candidates are sulfamic acid (H₃NSO₃, 97.09 g/mol, a strong acid), potassium hydrogen sulfate (KHSO₄, 136.17 g/mol, pKa 1.99) and KHP (204.22 g/mol, pKa 5.41).

\`\`\`interactive
lab-titration
{"mode": "unknown", "phMeter": true, "caption": "The unknown is one of three monoprotic acids. Weigh a sample, titrate to the end point, and compute M = m/(cV) from your own readings. The pH meter shows the curve: a buffer region with pH = pKa at half-equivalence means a weak acid; a curve that starts near pH 1.5 with no buffer region means a strong one."}
\`\`\`

**Two lines of evidence.** A molar mass of 97 g/mol matches sulfamic acid; but a molar mass alone could fit an impurity or an error. The curve gives an independent check: sulfamic acid starts near pH 1.4 with no buffer region; KHSO₄ starts slightly higher and its half-equivalence pH is near 2 (where a weak-acid estimate is unreliable because the acid is fairly strong); KHP shows a clear buffer at pH 5.4. Good practice is to report both.

**What if the acid were diprotic?** Then $n_{\\mathrm{acid}} = n_{\\mathrm{NaOH}}/2$ and the molar mass would be twice what the monoprotic formula gives. The titration curve would show two jumps (if the pKa values are far enough apart): one more reason to look at the curve.`,
          resources: [
            smc('Chem_12_Experiments/04%3A_Determining_the_Equivalent_Mass_of_an_Unknown_Acid_by_Titration_(Experiment)', 'Determining the equivalent mass of an unknown acid by titration', 'The same experiment as a real procedure, including the idea of equivalent mass for polyprotic acids.', true),
            cc(103, 'Unknown acid and base problem', 'Identify unknown acids and bases with a virtual pH meter; good practice in reading curves.'),
            ostx('14-7-acid-base-titrations', '14.7 Acid-base titrations', 'Compare the strong-acid and weak-acid curves in the figures with your pH-meter run.'),
          ],
          exercises: [
            {
              slug: 'identify-the-unknown',
              title: 'Identify your unknown',
              prompt:
                'Do the full procedure on one sample number: rough titration, three precise titrations, one pH-meter run. Report the molar mass as mean ± standard deviation, the starting pH, the half-equivalence pH and your identification with both lines of evidence. Then use Check my result.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'diprotic-trap',
              title: 'The diprotic trap',
              prompt:
                'A student titrates 0.2500 g of an unknown that is actually succinic acid (H₂C₄H₄O₄, 118.09 g/mol, diprotic) with 0.1000 M NaOH, to a phenolphthalein end point. (a) What volume of NaOH is needed? (b) What molar mass does the student report if they assume a monoprotic acid? (c) What feature of the pH-meter curve might warn them, and why might it not (pKa values 4.2 and 5.6)?',
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 2 × 0.2500/118.09 = 4.234 mmol of OH⁻: 42.34 mL. (b) 0.2500/0.004234 = 59.0 g/mol, half the true value. (c) Two equivalence points, but pKa values only 1.4 apart give one merged jump.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does an error in the NaOH molarity carry straight into the molar mass?',
              answerOutline: 'M = m/(cV); a relative error in c gives the same relative error (opposite sign) in M.',
            },
            {
              question: 'How does the titration curve distinguish sulfamic acid from KHP?',
              answerOutline: 'Sulfamic acid is strong: low starting pH (about 1.4), no buffer region, large jump from about 3 to 10. KHP is weak: starts near 4.2, buffer region with pH 5.4 at half-equivalence, smaller jump from about 7 to 10.',
            },
            {
              question: 'Why is a rough titration needed for an unknown?',
              answerOutline: 'Without knowing M, you cannot predict the volume; the rough run lets you scale the sample mass to use 20-30 mL in the precise trials.',
            },
          ],
          quiz: [
            {
              question: 'A 0.2513 g sample of a monoprotic acid needs 25.78 mL of 0.1003 M NaOH. What is its molar mass?',
              options: ['194.4 g/mol', '97.19 g/mol', '25.11 g/mol', '10.31 g/mol'],
              answer: 1,
              explanation:
                '$n = 0.1003 \\times 0.02578 = 2.5857 \\times 10^{-3}$ mol, so $M = 0.2513/2.5857 \\times 10^{-3} = 97.19$ g/mol (sulfamic acid is 97.09). Treating the acid as diprotic would give 194.4 g/mol.',
            },
            {
              question: 'A student titrates the unknown (a weak acid with an equivalence pH near 9) to a bromothymol blue end point (pH about 7). The molar mass they report is:',
              options: ['too low', 'unchanged', 'too high', 'only less precise'],
              answer: 2,
              explanation:
                'Bromothymol blue changes before equivalence, so the recorded volume is too small, the moles of NaOH are too few, and $M = m/n$ comes out too high. The error is systematic, not just scatter.',
            },
            {
              question:
                'Unknown A gives a curve with a buffer region and pH 5.4 at half-equivalence. Unknown B starts at pH 1.4 and shows no buffer region. Which identification fits?',
              options: [
                'A is KHP and B is sulfamic acid',
                'A is sulfamic acid and B is KHP',
                'Both are KHP',
                'Neither: a pH meter cannot distinguish acids',
              ],
              answer: 0,
              explanation:
                'A buffer region with pH = pKa = 5.4 at half-equivalence is the signature of the weak acid KHP. A low starting pH without a buffer region is a strong acid: sulfamic acid. The curve shape is an identification independent of the molar mass.',
            },
          ],
        },
        {
          slug: 'titration-analysis',
          title: 'Analysis: molarity, molar mass and their uncertainties',
          summary:
            'Compute the NaOH molarity and the unknown molar mass trial by trial, judge concordance, propagate uncertainty from the standardisation into the molar mass, find the equivalence point from the curve, and write the report.',
          estimatedMinutes: 110,
          objectives: [
            'Compute molarities and molar masses with correct significant figures',
            'Judge the precision of trials by relative standard deviation',
            'Propagate the uncertainty of the NaOH molarity into the molar mass',
            'Locate the equivalence point on a titration curve from the steepest slope',
            'Explain the direction of the common titration errors',
          ],
          concepts: [
            'c = m/(M V)',
            'Relative standard deviation',
            'Error chain: standardisation to molar mass',
            'Equivalence point at maximum slope',
            'First-derivative plot ΔpH/ΔV',
            'Systematic errors in titration',
          ],
          explanation: `**Standardisation.** For each trial $c = (m_{\\mathrm{KHP}}/204.22)/V$. With three trials of 0.1009, 0.1011 and 0.1010 M, the mean is 0.1010 M, $s = 0.0001$ M and the relative standard deviation 0.1%: good work. Report $c = 0.1010 \\pm 0.0001$ M (n = 3), and say whether you used the standard deviation or the standard error.

**Molar mass.** For each trial $M = m/(cV)$. Its relative uncertainty combines those of $m$ (two readings ±0.0001 g on 0.25 g: 0.06%), $V$ (two readings ±0.01 mL on 25 mL: 0.06%, plus the end-point judgement, about one half-drop, 0.1%) and $c$ (0.1-0.2%). In quadrature the molarity usually dominates: for example $\\sqrt{0.04^2 + 0.1^2 + 0.2^2} = 0.23\\%$, which on 97 g/mol is ±0.2 g/mol.

**Equivalence from the curve.** Put your pH-meter data in a spreadsheet. The equivalence volume is where the curve is steepest. Compute $\\Delta\\mathrm{pH}/\\Delta V$ between successive points and plot it against the mid-point volumes: the peak marks equivalence. Compare it with your indicator end point; they should agree within a drop or two for phenolphthalein. Then read the pH at half that volume.

**What good data look like.** Molarities agreeing within 0.2%; burette readings with two decimals; end points at the first faint pink, never magenta; molar masses within 0.5%; a curve with many points near the jump.

**Common errors and their direction** (for the molarity of NaOH; the molar mass moves the opposite way, since $M \\propto 1/c$ and $M \\propto 1/V$ through moles):

| Error | Volume recorded | c(NaOH) | M(unknown) |
|---|---|---|---|
| Overshoot the end point | too large | too low | too low |
| Bubble escapes from the tip | too large | too low | too low |
| Burette not rinsed with NaOH (diluted) | too large | too low | too low |
| Indicator changes too early (bromothymol blue, weak acid) | too small | too high | too high |
| KHP spilled before titrating | too small | too high | not applicable |
| NaOH absorbed CO₂ after standardising | used in unknown titration: too large | label too high | too low |

Write the report in the template below; it is the module project.

\`\`\`interactive
lab-report
{"experiment": "titration", "caption": "Your report on Experiment 3: standardisation and the unknown acid. Insert the table skeleton, give one worked calculation for each step, and use the error table above in your discussion."}
\`\`\``,
          resources: [
            ostx('4-5-quantitative-chemical-analysis', '4.5 Quantitative chemical analysis', 'Titration calculations with worked examples.', true),
            {
              title: 'NIST Technical Note 1297: Guidelines for evaluating and expressing the uncertainty of NIST measurement results',
              url: 'https://www.nist.gov/pml/nist-technical-note-1297',
              type: 'documentation',
              cost: 'free',
              provider: 'National Institute of Standards and Technology',
              note: 'Combined standard uncertainty for a result computed from several inputs.',
            },
          ],
          exercises: [
            {
              slug: 'derivative-curve',
              title: 'Find equivalence from your curve',
              prompt:
                'Put your pH-meter data in a spreadsheet, compute ΔpH/ΔV and plot it against mid-point volumes. Report the equivalence volume from the peak, compare with your indicator end point, and read the pH at half-equivalence. Is the difference between the two equivalence estimates within one drop (0.05 mL)?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'uncertainty-budget',
              title: 'An uncertainty budget for M',
              prompt:
                'For your best unknown trial, make an uncertainty budget: each input (m, V, c), its uncertainty, its relative uncertainty and its share of the combined variance. Which input dominates? What single improvement would most reduce the uncertainty of M?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'titration-report',
              title: 'Write the Experiment 3 report',
              prompt:
                'Write the full report in the template above, covering both the standardisation and the unknown, with the error-direction table in the discussion and both lines of evidence for the identification.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the equivalence point at the maximum of ΔpH/ΔV?',
              answerOutline: 'The pH changes fastest per unit volume where the buffering is weakest, which is at equivalence; the derivative peaks there.',
            },
            {
              question: 'Why does an overshoot make the NaOH molarity low but the unknown molar mass low as well?',
              answerOutline: 'In standardisation, larger V gives smaller c. In the unknown titration, larger V gives more moles of NaOH, so more moles of acid and a smaller M.',
            },
            {
              question: 'What relative standard deviation should careful titrations reach?',
              answerOutline: 'About 0.1-0.2%.',
            },
          ],
          quiz: [
            {
              question: 'Three molarities are 0.1009, 0.1011 and 0.1010 M. What is the relative standard deviation?',
              options: ['1%', '0.01%', '10%', '0.1%'],
              answer: 3,
              explanation:
                'Mean 0.1010 M; $s = 0.0001$ M; $s/\\bar{x} = 0.0001/0.1010 = 0.1\\%$. This is typical of careful titrations.',
            },
            {
              question: 'The relative uncertainties are 0.04% (mass), 0.1% (volume) and 0.2% (NaOH molarity). What is the relative uncertainty of the molar mass?',
              options: ['0.34%', '0.23%', '0.2%', '0.04%'],
              answer: 1,
              explanation:
                'In quadrature, $\\sqrt{0.04^2 + 0.1^2 + 0.2^2} = \\sqrt{0.0516} = 0.23\\%$. Adding them linearly gives 0.34% (an upper bound); 0.2% keeps only the largest term.',
            },
            {
              question: 'The NaOH bottle stood open for a week after you standardised it and absorbed CO₂, lowering its effective concentration. You titrate the unknown with it, using the old molarity. The molar mass you report is:',
              options: ['too low', 'too high', 'unchanged', 'unchanged on average but less precise'],
              answer: 0,
              explanation:
                'The base is weaker than its label, so more volume is needed. Multiplying that larger volume by the old (too high) molarity overestimates the moles, so $M = m/n$ comes out too low.',
            },
          ],
        },
      ],
      project: {
        slug: 'titration-lab-report',
        title: 'Lab report: titration and the unknown acid',
        description: `Write the full report on Experiment 3 in the template at the end of the analysis lesson, from your own simulator data: a rough and at least three precise standardisation trials, the error trials (overshoot, bubble, bromothymol blue), and the unknown (rough, three precise and one pH-meter run). The report answers: what is the molarity of the NaOH, what is the molar mass of the unknown acid with its uncertainty, and which acid is it, on two independent lines of evidence?`,
        deliverables: [
          'Tables of every burette reading and mass, with molarities and molar masses per trial',
          'NaOH molarity and unknown molar mass as mean ± uncertainty, with an uncertainty budget',
          'Titration curve with the equivalence point from the derivative and the half-equivalence pH',
          'Identification of the acid, discussion of the measured error trials with their directions, completed rubric and the downloaded .md file',
        ],
        estimatedHours: 3,
        stretchGoals: ['Model the full titration curve of your unknown in a spreadsheet from the charge balance and overlay your pH-meter data'],
      },
    },
    {
      slug: 'empirical-formula',
      title: 'Experiment 4: The Empirical Formula of Magnesium Oxide',
      description:
        'Burn a weighed magnesium ribbon in a crucible, heat to constant mass, deal with the magnesium nitride side product, and find the mole ratio of oxygen to magnesium in the product.',
      lessons: [
        {
          slug: 'empirical-formula-prelab',
          title: 'Pre-lab: empirical formulas and heating to constant mass',
          summary:
            'How an empirical formula follows from the masses of the elements, the reaction of magnesium with oxygen and its side reaction with nitrogen, why products are heated to constant mass, crucible technique and the hazards of burning magnesium.',
          estimatedMinutes: 90,
          relatedLessons: ['general-chemistry-1/stoichiometry-and-solutions/formulas-names-and-composition', 'general-chemistry-1/stoichiometry-and-solutions/limiting-reagents-and-percent-yield'],
          objectives: [
            'Compute an empirical formula from the masses of the combined elements',
            'Write the main and side reactions of burning magnesium, and the conversion of the nitride with water',
            'Explain heating to constant mass and why crucibles are cooled before weighing',
            'Predict the mass of product expected from a given mass of magnesium',
          ],
          concepts: [
            'Law of definite proportions',
            'Empirical formula from mole ratio',
            '2Mg + O₂ → 2MgO',
            'Side reaction 3Mg + N₂ → Mg₃N₂',
            'Mg₃N₂ + 6H₂O → 3Mg(OH)₂ + 2NH₃',
            'Constant mass',
            'Crucible, lid, clay triangle, tongs',
          ],
          explanation: `A compound has a fixed composition by mass (the **law of definite proportions**), so its **empirical formula**, the simplest whole-number mole ratio of its elements, can be found by weighing. Here you weigh magnesium, burn it to the oxide, weigh the product, and get the mass of oxygen by difference:

$$
n_{\\mathrm{Mg}} = \\frac{m_{\\mathrm{Mg}}}{24.305}, \\qquad n_{\\mathrm{O}} = \\frac{m_{\\mathrm{product}} - m_{\\mathrm{Mg}}}{15.999}, \\qquad \\text{formula } \\mathrm{MgO}_{x},\\; x = n_{\\mathrm{O}}/n_{\\mathrm{Mg}} .
$$

The expected reaction is $\\mathrm{2Mg(s) + O_2(g) \\rightarrow 2MgO(s)}$, so 0.2450 g of Mg (0.010080 mol) should give $0.010080 \\times 40.304 = 0.4063$ g of MgO.

**The complication.** Air is 78% nitrogen, and hot magnesium also reacts with it: $\\mathrm{3Mg + N_2 \\rightarrow Mg_3N_2}$. Magnesium nitride is lighter per magnesium atom than the oxide (33.6 g against 40.3 g per mole of Mg), so any nitride left in the product lowers the apparent oxygen content. The fix is to cool the crucible, add a few drops of water, $\\mathrm{Mg_3N_2 + 6H_2O \\rightarrow 3Mg(OH)_2 + 2NH_3}$ (you smell ammonia), and heat strongly again, which turns the hydroxide into the oxide: $\\mathrm{Mg(OH)_2 \\rightarrow MgO + H_2O}$.

**Constant mass.** You cannot see when a solid reaction is complete, so you heat, cool, weigh, and repeat until two successive weighings agree (here within 0.002 g). The empty crucible and lid are first heated to constant mass too, which drives off adsorbed moisture. Always cool to room temperature before weighing: a hot crucible reads light because of convection currents.

**Lid technique.** With the lid on, the ribbon is starved of oxygen and reacts slowly (and makes more nitride); with the lid off, it burns fast but white MgO smoke escapes, carrying product away. Heat with the lid slightly ajar, lifting it briefly with tongs to let air in.

UIUC's CHEM 103 has an empirical-formula lab at this point in the semester; burning magnesium is the classic version of it.

**Hazards.** Burning magnesium gives an intensely bright light rich in ultraviolet: do not stare at it. The crucible reaches about 800 °C and looks the same hot or cold; handle it only with tongs and put it on a heat-resistant pad. Ammonia from the nitride is an irritant; do not lean over the crucible. **Never attempt this at home.**

**Pre-lab questions.** (1) Expected mass of MgO from 0.2450 g of Mg? (2) A product weighs 0.4012 g: what is x in MgOₓ? (3) Does unconverted nitride raise or lower x?`,
          resources: [
            ostx('3-2-determining-empirical-and-molecular-formulas', '3.2 Determining empirical and molecular formulas', 'Empirical formulas from masses and percent composition, with worked examples.', true),
            {
              title: 'Los Medanos College lab manual (LibreTexts): Experiment 602, Empirical formula of MgO',
              url: 'https://chem.libretexts.org/Courses/Los_Medanos_College/Chemistry_6_and_Chemistry_7_Combined_Laboratory_Manual_(Los_Medanos_College)/01%3A_Experiments/1.02%3A_Experiment_602_Empirical_Formula_of_MgO_1_4_2',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'A real procedure for this experiment, with the lid technique and the water step.',
            },
            pubchem('Magnesium', 'Hazards of magnesium ribbon (flammable solid) and its combustion.'),
          ],
          exercises: [
            {
              slug: 'formula-prelab',
              title: 'Answer the pre-lab questions',
              prompt:
                'Answer the three pre-lab questions with full working. Then compute the product mass you would expect if 10% of the magnesium (by moles) formed Mg₃N₂ instead of MgO, and the x you would calculate from it.',
              kind: 'problem',
              difficulty: 2,
              hint: 'With 10% as nitride: 0.009072 mol Mg as MgO (0.3656 g) plus 0.001008 mol Mg as Mg₃N₂ (0.000336 mol, 0.0339 g): 0.3996 g, x = 0.958.',
            },
            {
              slug: 'other-formulas',
              title: 'Empirical formulas from masses',
              prompt:
                'Find the empirical formulas: (a) 1.000 g of copper gives 1.252 g of a copper oxide; (b) 0.500 g of tin gives 0.635 g of a tin oxide; (c) 2.50 g of a hydrated salt CuSO₄·xH₂O loses 0.90 g of water on heating (find x). Show the mole ratios before rounding.',
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Cu 0.01574 mol, O 0.01575 mol: CuO. (b) Sn 0.004212 mol, O 0.008438 mol: SnO₂. (c) CuSO₄ 1.60 g = 0.01002 mol, H₂O 0.0500 mol: x = 5.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does magnesium nitride in the product lower the measured O : Mg ratio?',
              answerOutline: 'Per mole of Mg, Mg₃N₂ adds less mass (33.6 g) than MgO (40.3 g), so the product is lighter and the "oxygen" by difference is too small.',
            },
            {
              question: 'What does heating to constant mass guarantee, and what does it not?',
              answerOutline: 'That nothing further is changing under these conditions (reaction or drying complete); it does not guarantee the product is pure MgO (nitride, lost smoke).',
            },
            {
              question: 'Why is the lid kept ajar rather than on or off?',
              answerOutline: 'On starves the ribbon of oxygen (slow, more nitride); off lets MgO smoke escape; ajar admits air while keeping most smoke in.',
            },
          ],
          quiz: [
            {
              question: 'What mass of MgO should 0.2450 g of magnesium (24.305 g/mol) give? MgO is 40.304 g/mol.',
              options: ['0.1613 g', '0.2450 g', '0.4063 g', '0.8126 g'],
              answer: 2,
              explanation:
                '$0.2450/24.305 = 0.010080$ mol of Mg gives 0.010080 mol of MgO, $\\times 40.304 = 0.4063$ g. 0.1613 g is the oxygen alone; 0.8126 g doubles it by misusing the 2 : 2 coefficients.',
            },
            {
              question: '0.2450 g of Mg gives 0.4012 g of product. What is $x$ in $\\mathrm{MgO}_x$?',
              options: ['0.969', '1.03', '0.638', '1.57'],
              answer: 0,
              explanation:
                'O = 0.4012 − 0.2450 = 0.1562 g = 0.009763 mol; Mg = 0.010080 mol; $x = 0.009763/0.010080 = 0.969$. 1.03 is Mg : O; 0.638 and 1.57 are mass ratios, not mole ratios.',
            },
            {
              question: 'Some magnesium forms Mg₃N₂, and it is not converted before the final weighing. The measured O : Mg ratio is:',
              options: ['raised', 'lowered', 'unchanged', 'raised or lowered depending on the lid'],
              answer: 1,
              explanation:
                'Each mole of Mg in the nitride adds only 9.3 g of N instead of 16.0 g of O, so the product is lighter than pure MgO and the oxygen found by difference is too small: x is low.',
            },
          ],
        },
        {
          slug: 'empirical-formula-experiment',
          title: 'The experiment: burning magnesium to constant mass',
          summary:
            'Run the crucible bench: heat the empty crucible to constant mass, add and weigh the ribbon, heat with the lid ajar in cycles, convert the nitride with water, and weigh to constant mass, recording every weighing.',
          estimatedMinutes: 110,
          objectives: [
            'Carry out the heat-cool-weigh cycle until two weighings agree within 0.002 g',
            'Record every weighing in order so a reader can see constant mass was reached',
            'Use the water step to convert magnesium nitride',
            'See the effect of lid position and of weighing hot on the masses',
          ],
          concepts: [
            'Heat, cool, weigh, repeat',
            'Constant mass within 0.002 g',
            'Lid ajar',
            'Water step and reheating',
            'Desiccator cooling',
            'Weighing record',
          ],
          explanation: `Prepare a weighing record: one line per weighing, with what had just been done (for example "after heating cycle 3, cooled") and the mass to 0.0001 g.

**Procedure**

1. Start a sample. **Heat** the empty crucible and lid for 5 minutes, then **cool and weigh**. Repeat until two successive weighings agree within 0.002 g. The first heating drives off moisture.
2. Choose a ribbon length of about 25 cm (about 0.25 g) and **add the ribbon**. **Cool and weigh** (crucible + lid + Mg). The mass of Mg is the difference.
3. Set the lid to **ajar** and **heat** for 5 minutes. Note what you see in the bench log. Repeat until the ribbon no longer glows (three or four cycles).
4. **Cool and weigh.** Heat again and weigh; continue until two successive weighings agree within 0.002 g.
5. **Add water drops** (after cooling), then **heat** again (this drives off the water and converts the hydroxide). **Cool and weigh**, and repeat to constant mass.
6. Variations on new samples, recorded separately: (a) lid **off** throughout; (b) lid **on** throughout; (c) skip the water step; (d) **weigh while hot** once.
7. Only after you have calculated $x$ for each run, open **What happened** to see the hidden bookkeeping (unreacted Mg, nitride, smoke, water) and compare it with your error analysis.

\`\`\`interactive
lab-crucible
{"caption": "Heat the empty crucible to constant mass first, add the ribbon, then heat in cycles with the lid ajar, cooling and weighing between cycles until two weighings agree within 0.002 g. Add water, reheat and weigh again. Record every weighing in order."}
\`\`\`

**What you cannot learn here.** Lighting a Bunsen burner, adjusting the flame, judging when the ribbon has finished glowing, lifting a red-hot lid with tongs. These need supervised practice; never try this experiment outside a laboratory.

**Data check before you analyse.** The product should weigh about 1.6 times the magnesium. If it weighs less than 1.5 times, look for smoke loss or unreacted magnesium; if more than 1.7 times, look for water not driven off.`,
          resources: [
            {
              title: 'Los Medanos College lab manual (LibreTexts): Experiment 602, Empirical formula of MgO',
              url: 'https://chem.libretexts.org/Courses/Los_Medanos_College/Chemistry_6_and_Chemistry_7_Combined_Laboratory_Manual_(Los_Medanos_College)/01%3A_Experiments/1.02%3A_Experiment_602_Empirical_Formula_of_MgO_1_4_2',
              type: 'textbook',
              cost: 'free',
              provider: 'LibreTexts',
              note: 'Compare its procedure step by step with the one above.',
              primary: true,
            },
            mit('using-a-balance', 'Using a balance', 'Weighing technique for the many weighings in this experiment.'),
          ],
          exercises: [
            {
              slug: 'three-runs',
              title: 'Three good runs',
              prompt:
                'Do three complete runs with the correct technique (lid ajar, water step, constant mass at every stage), each on a new sample, recording every weighing. Compute x for each and the mean and standard deviation.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'error-runs',
              title: 'The four variations',
              prompt:
                'Do variations (a) to (d) of step 6, one run each. For each, compute x, predict before opening "What happened" which hidden quantity caused the deviation, and then check. Summarise in a table: variation, x, deviation from your good mean, cause.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the empty crucible be heated to constant mass before the ribbon is added?',
              answerOutline: 'It holds moisture (and maybe residues) that burn off on heating; if not removed first, that loss is wrongly subtracted from the product mass.',
            },
            {
              question: 'What did weighing while hot do to your product mass?',
              answerOutline: 'It read several mg light (convection), making the oxygen mass and x too low.',
            },
            {
              question: 'How can you tell from your weighings alone that the reaction is complete?',
              answerOutline: 'Two successive heat-cool-weigh cycles give masses within 0.002 g, and the product/Mg mass ratio is near 1.66.',
            },
          ],
          quiz: [
            {
              question: 'When is a sample at "constant mass" in this experiment?',
              options: [
                'When it has been heated for 30 minutes in total',
                'When the balance reading stops changing during a single weighing',
                'When the product looks white',
                'When two successive heat-cool-weigh cycles give masses within 0.002 g',
              ],
              answer: 3,
              explanation:
                'Constant mass means further heating no longer changes the mass, shown by two successive cycles that agree within the stated tolerance. A fixed heating time, a stable display or the colour do not show that the change is complete.',
            },
            {
              question: 'You weigh the crucible and product while still hot. Compared with weighing it cool, x comes out:',
              options: ['too high', 'too low', 'unchanged', 'too high or too low at random'],
              answer: 1,
              explanation:
                'The hot crucible reads light because rising warm air pushes on the pan. A lighter product means less oxygen by difference, so x is too low. The effect is systematic (always light), not random.',
            },
            {
              question: 'Which of these makes the measured O : Mg ratio too high?',
              options: [
                'MgO smoke escaping while the lid is off',
                'Magnesium left unreacted',
                'Water from the hydrolysis step not driven off before the final weighing',
                'Weighing the crucible while hot',
              ],
              answer: 2,
              explanation:
                'Leftover water (or undecomposed Mg(OH)₂) adds mass that is counted as oxygen, so x is high. Smoke loss, unreacted Mg and hot weighing all make the product too light, so x is low.',
            },
          ],
        },
        {
          slug: 'empirical-formula-analysis',
          title: 'Analysis: the formula, its uncertainty and what went wrong',
          summary:
            'Compute the O : Mg ratio for each run, show that weighing uncertainty is far smaller than the scatter, combine runs with a mass-of-O against mass-of-Mg plot, and link each deviation to its cause.',
          estimatedMinutes: 100,
          objectives: [
            'Compute x with its weighing uncertainty and compare it with the run-to-run scatter',
            'Use a plot of oxygen mass against magnesium mass to combine several runs',
            'Report a percent error against the formula MgO and explain it with specific causes',
            'Decide which runs to keep, with stated criteria',
          ],
          concepts: [
            'x = n(O)/n(Mg)',
            'Uncertainty of a mass by difference',
            'Systematic error dominates',
            'Slope of m(O) against m(Mg)',
            'Percent error',
            'Criteria for excluding a run',
          ],
          explanation: `**Step 1: each run.** From your weighing record, $m_{\\mathrm{Mg}}$ = (crucible + lid + Mg) − (crucible + lid at constant mass), and $m_{\\mathrm{O}}$ = (final constant mass) − (crucible + lid + Mg). Then $x = (m_{\\mathrm{O}}/15.999)/(m_{\\mathrm{Mg}}/24.305)$.

**Step 2: how big is the weighing uncertainty?** Each mass by difference has an uncertainty of about $\\sqrt{2} \\times 0.0001 = 0.00014$ g. On $m_{\\mathrm{O}} \\approx 0.16$ g that is 0.09%, on $m_{\\mathrm{Mg}} \\approx 0.25$ g 0.06%, so x is uncertain by about 0.1% from weighing. Typical runs scatter by 1-3% and sit 1-5% below 1.00. The lesson: in this experiment the balance is not the limit; **systematic chemistry is**. Your discussion should say so with these numbers.

**Step 3: combining runs.** Plot $m_{\\mathrm{O}}$ (y) against $m_{\\mathrm{Mg}}$ (x) for all good runs (or a class's runs) and fit a line through the origin. The slope is the mass ratio; multiply by $24.305/15.999 = 1.519$ to get the mole ratio. A slope of 0.652 g O per g Mg gives $x = 0.652 \\times 1.519 = 0.990$. Points far below the line identify runs with losses.

**Step 4: percent error.** Against the accepted formula MgO ($x = 1.000$), $x = 0.968$ is a $-3.2\\%$ error.

**What good data look like.** Product mass about 1.64-1.66 times the Mg mass; constant mass reached at every stage; x between 0.97 and 1.01 with the water step.

**Errors and their direction.** Unreacted Mg (lid on, too few cycles): x low. Nitride not converted (water step skipped): x low, by roughly 0.42 × the fraction of Mg present as nitride. MgO smoke lost (lid off): x low. Weighed hot: x low. Water or hydroxide left (not reheated enough after the water step): x high. Moisture on the crucible not driven off first: x low. Notice that almost every error lowers x; a result above 1.00 points to leftover water.

**Excluding runs.** Decide criteria before looking at x: for example, a run is excluded if constant mass was not reached or if your notebook records smoke or a spill. Report excluded runs and why.

Write the report in the template below; it is the module project.

\`\`\`interactive
lab-report
{"experiment": "empirical-formula", "caption": "Your report on Experiment 4. Include the full weighing record in Results, and in the Discussion tie each deviation you measured to its cause and direction."}
\`\`\``,
          resources: [
            ostx('3-2-determining-empirical-and-molecular-formulas', '3.2 Determining empirical and molecular formulas', 'Review the worked examples before writing your calculations section.', true),
            ostx('4-4-reaction-yields', '4.4 Reaction yields', 'Percent yield: your product mass against the 0.4063 g theoretical value is another way to present the result.'),
          ],
          exercises: [
            {
              slug: 'pooled-plot',
              title: 'The pooled plot',
              prompt:
                'Put your good runs and your variation runs on one plot of m(O) against m(Mg), with different markers. Fit a line through the origin to the good runs only and report x from its slope with its standard error. Which variation points fall furthest from the line, and does that match "What happened"?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'nitride-size',
              title: 'How much nitride?',
              prompt:
                'If a run gives x = 0.955 and you believe the only error was unconverted Mg₃N₂, what fraction of the magnesium formed nitride? Set up the mass balance (Mg as MgO plus Mg as Mg₃N₂) and solve. Compare with what "What happened" reports for your own run without the water step.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Let f be the mole fraction of Mg in the nitride. Apparent O per Mg = (1 − f)·1 + f·(2/3)(14.007/15.999) = 1 − 0.416 f. Setting this to 0.955 gives f ≈ 0.11.',
            },
            {
              slug: 'formula-report',
              title: 'Write the Experiment 4 report',
              prompt:
                'Write the full report in the template above, with the weighing record, x for each run, the pooled plot, a comparison of the weighing uncertainty with the observed scatter, and an error discussion covering every variation you ran.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the weighing uncertainty not the main uncertainty in this experiment?',
              answerOutline: 'It contributes about 0.1% to x, while incomplete reaction, nitride and smoke cause 1-5% systematic errors.',
            },
            {
              question: 'Why does almost every error lower x?',
              answerOutline: 'Most errors remove mass from the product or replace oxygen by lighter nitrogen; only added mass (water, hydroxide) raises it.',
            },
            {
              question: 'What does the slope of m(O) against m(Mg) give, and how do you turn it into a formula?',
              answerOutline: 'The mass ratio of O to Mg; multiply by 24.305/15.999 to get the mole ratio x.',
            },
          ],
          quiz: [
            {
              question: 'A line through the origin of $m_{\\mathrm{O}}$ against $m_{\\mathrm{Mg}}$ has slope 0.652. What mole ratio O : Mg does that give?',
              options: ['0.990', '0.652', '1.01', '1.53'],
              answer: 0,
              explanation:
                'The slope is grams of O per gram of Mg; times $24.305/15.999 = 1.519$ gives moles of O per mole of Mg, 0.990. 0.652 is the mass ratio itself; 1.01 is Mg : O; 1.53 divides by the factor instead of multiplying.',
            },
            {
              question: 'Your mean is $x = 0.968$. What is the percent error against MgO?',
              options: ['+3.2%', '−3.2%', '−0.032%', '−96.8%'],
              answer: 1,
              explanation:
                '$100 \\times (0.968 - 1.000)/1.000 = -3.2\\%$. The sign matters: it says the result is low, which is what most errors in this experiment produce.',
            },
            {
              question: 'Three careful runs give $x = 0.94 \\pm 0.01$, while the weighing uncertainty of each x is only about 0.001. Which explanation fits best?',
              options: [
                'Water not driven off after the water step',
                'Balance offset not removed (masses by difference)',
                'Random reading errors on the balance',
                'Incomplete reaction or unconverted nitride: a systematic loss in every run',
              ],
              answer: 3,
              explanation:
                'A consistent 6% shortfall, far larger than the weighing uncertainty, is systematic and in the direction of lost or lighter product: unreacted Mg or unconverted nitride. Leftover water would raise x; an offset cancels in differences; random errors would scatter about 1.00.',
            },
          ],
        },
      ],
      project: {
        slug: 'empirical-formula-lab-report',
        title: 'Lab report: the empirical formula of magnesium oxide',
        description: `Write the full report on Experiment 4 in the template at the end of the analysis lesson, from at least three good simulator runs and the four variation runs. The report answers: what is the empirical formula of the product, how sure are you, and which specific chemistry explains the deviation from MgO?`,
        deliverables: [
          'The complete weighing record of every run, showing constant mass at each stage',
          'x for each run with its weighing uncertainty, the mean and standard deviation, and the pooled m(O)-m(Mg) plot',
          'Error discussion linking each variation to its measured deviation and direction, checked against "What happened"',
          'Completed rubric self-check and the downloaded .md file',
        ],
        estimatedHours: 2.5,
        stretchGoals: ['Estimate from your no-water run the fraction of magnesium that formed nitride, and compare with the simulator\'s bookkeeping'],
      },
    },
    {
      slug: 'gas-collection',
      title: 'Experiment 5: Hydrogen Collected over Water, the Gas Constant and an Unknown Metal',
      description:
        'React a weighed metal with hydrochloric acid, collect the hydrogen over water, correct its pressure for the water column and the vapour pressure of water, and calculate the gas constant or the molar mass of an unknown metal.',
      lessons: [
        {
          slug: 'gas-collection-prelab',
          title: "Pre-lab: Dalton's law and collecting a gas over water",
          summary:
            "Why a gas collected over water is a mixture, Dalton's law of partial pressures and the vapour pressure of water, the correction for a column of water, how much metal to use, and the hazards of hydrochloric acid and hydrogen.",
          estimatedMinutes: 100,
          relatedLessons: ['general-chemistry-1/gases/the-ideal-gas-law', 'general-chemistry-1/gases/partial-pressures-and-gas-mixtures', 'general-chemistry-1/molecular-shape-and-intermolecular-forces/liquids-solids-and-phase-diagrams'],
          objectives: [
            "Apply Dalton's law to find the partial pressure of a gas collected over water",
            'Correct a pressure for a difference in water levels',
            'Use the ideal gas law to plan the mass of metal for a given gas volume',
            'Compute R and the molar volume at STP from collected-gas data',
          ],
          concepts: [
            'Ideal gas law PV = nRT',
            "Dalton's law of partial pressures",
            'Vapour pressure of water',
            'Water column: h(mm H₂O)/13.6 = mmHg',
            'Eudiometer (gas-measuring tube)',
            'Molar volume at STP, 22.41 L/mol',
          ],
          explanation: `Magnesium dissolves in hydrochloric acid, releasing hydrogen:

$$
\\mathrm{Mg(s) + 2HCl(aq) \\rightarrow MgCl_2(aq) + H_2(g)} ,
$$

one mole of H₂ per mole of Mg. You collect the gas in an inverted **gas-measuring tube** (eudiometer) that started full of acid and water and stands in a beaker of water. The gas displaces the liquid, and you read its volume on the tube's scale. Because the tube is inverted, its numbers increase **downward**, like a burette.

**The gas is wet.** Hydrogen bubbling through water becomes saturated with water vapour, so by **Dalton's law** the total pressure in the tube is the sum of partial pressures: $P_{\\mathrm{total}} = P_{\\mathrm{H_2}} + P_{\\mathrm{H_2O}}$. The **vapour pressure of water** depends only on temperature (mmHg, CRC Handbook): 17 °C 14.5; 18 °C 15.5; 19 °C 16.5; 20 °C 17.5; 21 °C 18.7; 22 °C 19.8; 23 °C 21.1; 24 °C 22.4; 25 °C 23.8; 26 °C 25.2; 27 °C 26.7. Interpolate between rows.

**The total pressure.** If the water level inside the tube equals the level outside, $P_{\\mathrm{total}}$ equals the barometric pressure. If the inside level is $h$ mm **higher** than outside, the gas is at lower pressure by the weight of that column. Water is 13.6 times less dense than mercury, so

$$
P_{\\mathrm{H_2}} = P_{\\mathrm{bar}} - \\frac{h_{\\mathrm{mm\\,H_2O}}}{13.6} - P_{\\mathrm{H_2O}}(T) .
$$

Either equalise the levels (move the tube in a tall cylinder of water until they match) or measure $h$ with a ruler.

**Planning the mass.** The tube holds 50 mL. Aim for about 40 mL of gas: at 22 °C and $P_{\\mathrm{H_2}} \\approx 0.96$ atm, $n = PV/RT = (0.96)(0.040)/(0.082057 \\times 295) = 1.59 \\times 10^{-3}$ mol, which is 0.039 g of Mg. Too much metal and the gas overflows the tube.

**Results.** With $n_{\\mathrm{H_2}} = n_{\\mathrm{Mg}}$, $R = P_{\\mathrm{H_2}}V/(nT)$ (accepted 0.082057 L atm mol⁻¹ K⁻¹). The molar volume at STP (0 °C, 1 atm) is $V_{\\mathrm{STP}} = V \\cdot (P_{\\mathrm{H_2}}/1\\,\\mathrm{atm}) \\cdot (273.15/T)/n$ (accepted 22.41 L/mol). For an unknown metal you reverse the logic: moles of H₂ from the gas law give the molar mass, if you know the metal's charge.

**Hazards.** 6 M HCl is corrosive: goggles, gloves, and rinse any splash immediately with plenty of water. Hydrogen is flammable: no flames nearby. The reaction warms the acid.

**Pre-lab questions.** (1) $P_{\\mathrm{bar}} = 752.4$ mmHg, 22.0 °C, levels equal: $P_{\\mathrm{H_2}}$? (2) The same with the inside level 136 mm above outside? (3) What mass of Mg for 40 mL of H₂?`,
          resources: [
            ostx('9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions', "9.3 Stoichiometry of gaseous substances, mixtures and reactions", "Dalton's law and collecting gases over water, with the vapour-pressure table and worked examples.", true),
            ostx('9-2-relating-pressure-volume-amount-and-temperature-the-ideal-gas-law', '9.2 The ideal gas law', 'PV = nRT, STP and molar volume.'),
            phet('gas-properties', 'Gas properties', 'Pressure, volume, temperature and amount in a box of particles, for intuition about each correction.'),
          ],
          exercises: [
            {
              slug: 'gas-prelab-questions',
              title: 'Answer the pre-lab questions',
              prompt:
                'Answer the three pre-lab questions with units. Then repeat (3) for zinc (65.38 g/mol) and for aluminium (26.98 g/mol; 2Al + 6HCl → 2AlCl₃ + 3H₂).',
              kind: 'problem',
              difficulty: 1,
              hint: '(1) 732.6 mmHg. (2) 722.6 mmHg. (3) about 0.039 g Mg, 0.104 g Zn, 0.029 g Al.',
            },
            {
              slug: 'which-correction-matters',
              title: 'Which correction matters most?',
              prompt:
                'For a run at 24.0 °C, 745.0 mmHg barometric pressure, a water column of 95 mm and 38.50 mL of gas from 0.0365 g of Mg, compute R (a) with every correction, (b) ignoring the water column, (c) ignoring the vapour pressure, (d) ignoring both. Express each as a percent error against 0.082057.',
              kind: 'problem',
              difficulty: 2,
              hint: 'P(H₂) = 745.0 − 7.0 − 22.4 = 715.6 mmHg; n = 1.5017 × 10⁻³ mol; R ≈ 0.0812 (−1.0%). Ignoring the column gives 0.0820, ignoring the vapour pressure 0.0838 (+2.1%), ignoring both 0.0846 (+3.1%).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the vapour pressure of water be subtracted?',
              answerOutline: 'The collected gas is saturated with water vapour; only the H₂ partial pressure counts moles of H₂.',
            },
            {
              question: 'If the water inside the tube is higher than outside, is the gas pressure higher or lower than the barometric pressure? Why?',
              answerOutline: 'Lower: the column of water is held up by the difference between atmospheric pressure and the gas pressure.',
            },
            {
              question: 'Why divide a water-column height in mm by 13.6?',
              answerOutline: 'To convert mm of water to mm of mercury; mercury is 13.6 times denser, so the same pressure supports a column 13.6 times shorter.',
            },
          ],
          quiz: [
            {
              question: 'The barometer reads 752.4 mmHg, the water is at 22.0 °C (vapour pressure 19.8 mmHg) and the water levels are equal. What is the partial pressure of hydrogen?',
              options: ['752.4 mmHg', '772.2 mmHg', '732.6 mmHg', '742.4 mmHg'],
              answer: 2,
              explanation:
                '$P_{\\mathrm{H_2}} = 752.4 - 19.8 = 732.6$ mmHg. Adding the vapour pressure gives 772.2; using the barometric pressure unchanged ignores that the gas is wet.',
            },
            {
              question: 'Same conditions, but the water inside the tube stands 136 mm above the outside level. What is $P_{\\mathrm{H_2}}$?',
              options: ['722.6 mmHg', '742.6 mmHg', '596.6 mmHg', '732.6 mmHg'],
              answer: 0,
              explanation:
                '136 mm of water is $136/13.6 = 10.0$ mmHg, and it lowers the gas pressure: $752.4 - 10.0 - 19.8 = 722.6$ mmHg. Subtracting 136 directly treats water as mercury (596.6); adding the column gives 742.6.',
            },
            {
              question: 'About what mass of Mg gives 40 mL of H₂ at 22 °C with $P_{\\mathrm{H_2}} = 0.96$ atm?',
              options: ['0.39 g', '0.019 g', '0.077 g', '0.039 g'],
              answer: 3,
              explanation:
                '$n = (0.96)(0.040)/(0.082057 \\times 295) = 1.59 \\times 10^{-3}$ mol, times 24.305 g/mol = 0.039 g. 0.39 g would make about 400 mL and overflow the tube; 0.019 and 0.077 g come from halving or doubling the mole ratio.',
            },
          ],
        },
        {
          slug: 'gas-collection-experiment',
          title: 'The experiment: collecting hydrogen',
          summary:
            'Run the gas-collection bench: plan and weigh the metal, read the initial and final volumes in the tube, the thermometer, the barometer and the water column, and see what reading too early, an oxide coating and too much metal do.',
          estimatedMinutes: 110,
          objectives: [
            'Weigh a planned mass of metal and read gas volumes to 0.01 mL',
            'Record temperature, barometric pressure and water-column height with their precision',
            'Wait for thermal equilibrium before the final reading',
            'Identify an unknown metal from the hydrogen it produces',
          ],
          concepts: [
            'Initial bubble volume',
            'Final volume after cooling',
            'Equalising levels',
            'Thermal equilibrium of the gas',
            'Oxide coating on the metal',
            'Overflow of the tube',
          ],
          explanation: `Prepare a table: trial, mass of metal (g), initial volume (mL), final volume (mL), water temperature (°C), barometric pressure (mmHg), water column h (mm), notes.

**Procedure**

1. Start a sample. Using your pre-lab calculation, set the ribbon length (target mass) and **cut and weigh the metal**. Record the balance reading.
2. Read the **initial volume** in the magnifier: the small air bubble at the top of the tube. Numbers increase downward; read to 0.01 mL.
3. **Invert the tube and let the metal react.** Do not read yet: the gas is still warmer than the water.
4. **Wait 10 minutes** for the gas to cool to the water temperature.
5. Read the thermometer and the barometer. Either read the **ruler** for the height of the water inside the tube above the outside level, or **move the tube to a tall cylinder and equalise the levels** (h = 0).
6. Read the **final volume** to 0.01 mL.
7. Repeat for at least three trials (**New trial**).
8. Variations, recorded separately: (a) read the final volume immediately after the metal dissolves, before waiting; (b) use about three times the planned mass.

\`\`\`interactive
lab-gas-collection
{"metal": "mg", "caption": "Weigh about 0.035-0.040 g of magnesium, read the initial bubble, let it react, wait for the gas to cool, then read the temperature, barometer, water column (or equalise the levels) and the final volume. Calculate R from your own readings before you check it."}
\`\`\`

**An unknown metal.** The bench below holds a ribbon or turning of an unknown metal: magnesium, zinc or aluminium. Plan the mass for each possibility, start with the smallest safe amount, and find the moles of hydrogen per gram of metal.

\`\`\`interactive
lab-gas-collection
{"metal": "unknown", "title": "Gas collection: an unknown metal", "caption": "Same procedure. From the moles of H₂, compute the molar mass assuming the metal forms a 2+ ion, then ask which real metal and charge fit."}
\`\`\`

**What you cannot learn here.** Filling an eudiometer without trapping air, inverting it under water with a thumb over the end, and threading the copper-wire cage that holds the ribbon. A real bench adds leaks and bubbles stuck to the glass, which the simulator does not.`,
          resources: [
            smc('Chem_10_Experiments/10%3A_Experimental_Determination_of_the_Gas_Constant_(Experiment)', 'Experimental determination of the gas constant', 'The real version of this experiment, with the apparatus drawn and a data sheet.', true),
            phet('gas-properties', 'Gas properties', 'Hold the temperature constant and vary the amount of gas: compare with your volumes.'),
          ],
          exercises: [
            {
              slug: 'three-gas-trials',
              title: 'Three trials for R',
              prompt:
                'Do three trials with magnesium using the full procedure, then the two variations. Record everything, compute R for each trial, and compare the variations with your mean.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'identify-the-metal',
              title: 'Identify the unknown metal',
              prompt:
                'In the unknown-metal bench, do at least two trials. Compute moles of H₂ per gram of metal and the molar mass assuming a 2+ ion. Decide which metal it is, explaining how the charge enters if the apparent molar mass matches no metal. Then check your result.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'If the apparent molar mass is about 18 g/mol, a 3+ metal would have M = 18 × 3/2 = 27 g/mol: aluminium.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why wait before reading the final volume?',
              answerOutline: 'The reaction is exothermic; warm gas occupies more volume. Its temperature must equal the measured water temperature for PV = nRT to use that T.',
            },
            {
              question: 'Why is the initial bubble volume subtracted?',
              answerOutline: 'Only the gas produced by the reaction counts; the initial bubble was there before the metal reacted.',
            },
            {
              question: 'What happens if you use too much metal, and how does the pre-lab calculation prevent it?',
              answerOutline: 'The gas exceeds 50 mL, overflows from the bottom of the tube and the volume is unknown; planning the mass for about 40 mL avoids it.',
            },
          ],
          quiz: [
            {
              question: 'You read the final volume immediately, while the gas is still a few degrees warmer than the water, and use the water temperature in the calculation. Your value of R is:',
              options: ['too low', 'too high', 'unchanged', 'unpredictable'],
              answer: 1,
              explanation:
                'Warm gas occupies a larger volume, but you divide by the (lower) water temperature, so $R = PV/(nT)$ comes out too high, by about 1% for 3 °C.',
            },
            {
              question: 'The magnesium ribbon carries a thin oxide coating, so part of its mass is MgO. Your value of R is:',
              options: ['too high', 'unchanged', 'too low', 'more precise'],
              answer: 2,
              explanation:
                'MgO dissolves in the acid without making hydrogen, so less gas forms than the weighed mass predicts. You divide by a mole count that is too large: R is too low. This is why the ribbon is sanded first.',
            },
            {
              question: 'At 22 °C you forget to subtract the vapour pressure of water (19.8 mmHg; $P_{\\mathrm{H_2}}$ is about 730 mmHg). Your value of R is:',
              options: ['unchanged', 'too low by about 2.7%', 'about 0.1% high', 'too high by about 2.7%'],
              answer: 3,
              explanation:
                'Using the total pressure instead of the hydrogen partial pressure overstates P by $19.8/730 = 2.7\\%$, and R is proportional to P, so it is 2.7% high.',
            },
          ],
        },
        {
          slug: 'gas-collection-analysis',
          title: 'Analysis: R, the molar volume and the unknown metal',
          summary:
            'Correct each pressure, compute R and the molar volume at STP trial by trial, estimate the uncertainty, identify the unknown metal, and write the report.',
          estimatedMinutes: 100,
          objectives: [
            'Carry a gas-collection calculation through every correction with units',
            'Compute R and the molar volume at STP and compare with accepted values',
            'Estimate which measurement limits the uncertainty',
            'Identify a metal from its apparent molar mass and possible charges',
          ],
          concepts: [
            'P(H₂) after both corrections',
            'Kelvin temperature',
            'R in L atm mol⁻¹ K⁻¹',
            'Molar volume at STP',
            'Mass uncertainty dominates (small sample)',
            'Equivalent mass and ion charge',
          ],
          explanation: `**A worked trial.** Mass of Mg 0.0362 g, so $n = 0.0362/24.305 = 1.4894 \\times 10^{-3}$ mol. Volumes 0.55 mL initial and 38.42 mL final, so $V = 37.87$ mL = 0.03787 L. Water at 22.4 °C ($T = 295.55$ K, vapour pressure 20.3 mmHg by interpolation), barometer 748.6 mmHg, levels equalised:

$$
P_{\\mathrm{H_2}} = 748.6 - 20.3 = 728.3 \\text{ mmHg} = 0.9583 \\text{ atm},
$$

$$
R = \\frac{P V}{n T} = \\frac{(0.9583)(0.03787)}{(1.4894 \\times 10^{-3})(295.55)} = 0.08244 \\text{ L atm mol}^{-1}\\text{K}^{-1} ,
$$

which is 0.47% above 0.082057. The molar volume at STP is $V_{\\mathrm{STP}} = 0.03787 \\times 0.9583 \\times (273.15/295.55)/1.4894 \\times 10^{-3} = 22.52$ L/mol, against 22.41.

**Uncertainty.** The mass is the weak point: 0.0362 g on a balance good to ±0.0001 g (by difference ±0.00014) is 0.4%. The volume (two readings ±0.01 mL on 38 mL) contributes 0.04%, the temperature (±0.1 K) 0.03%, the pressure (±0.3 mmHg, mostly from interpolating the vapour pressure) 0.04%. So R is uncertain by about 0.4% from measurement, and a result within 0.5% is as good as this method gets. This is a case where a bigger sample would help, but the tube volume forbids it.

**The unknown metal.** Moles of H₂ come from the same calculation. If the metal forms a 2+ ion, $M = m/n_{\\mathrm{H_2}}$. If that apparent molar mass matches no metal, consider other charges: for a 3+ metal, $n_{\\mathrm{metal}} = \\frac{2}{3}n_{\\mathrm{H_2}}$, so $M = \\frac{3}{2} \\times$ the apparent value. An apparent 18.0 g/mol is aluminium (27.0 g/mol, 3+).

**Errors and their direction** (for R): oxide on the metal, low; gas read warm, high; vapour pressure forgotten, high by about 2.7%; water column ignored, high (about 1% for 136 mm); a leak or gas escaping from an overfilled tube, low.

Write the report in the template below; it is the module project.

\`\`\`interactive
lab-report
{"experiment": "gas-constant", "caption": "Your report on Experiment 5. Show the pressure corrections step by step for one trial, and compare the size of each correction with your final error."}
\`\`\``,
          resources: [
            ostx('9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions', '9.3 Stoichiometry of gaseous substances, mixtures and reactions', 'Work the end-of-section exercises on gases collected over water.', true),
            {
              title: 'NIST Chemistry WebBook',
              url: 'https://webbook.nist.gov/chemistry/',
              type: 'dataset',
              cost: 'free',
              provider: 'National Institute of Standards and Technology',
              note: 'Search "water", then "Phase change data" for authoritative vapour-pressure data to cite.',
            },
          ],
          exercises: [
            {
              slug: 'r-and-vstp',
              title: 'R and the molar volume from your data',
              prompt:
                'For each of your trials compute P(H₂), n, R and the molar volume at STP. Report the mean and standard deviation of each and the percent error against 0.082057 L atm mol⁻¹ K⁻¹ and 22.41 L/mol. Is your error larger than your measurement uncertainty (about 0.4%)? If so, which systematic error is most likely?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'zinc-or-magnesium',
              title: 'Zinc or magnesium?',
              prompt:
                'A 0.1012 g sample of a metal gives 39.10 mL of gas over water at 23.0 °C, barometer 756.2 mmHg, levels equal. Compute the moles of H₂ and the apparent molar mass for a 2+ ion. Which metal is it? What result would aluminium of the same mass have given?',
              kind: 'problem',
              difficulty: 2,
              hint: 'P(H₂) = 756.2 − 21.1 = 735.1 mmHg; n = 1.557 × 10⁻³ mol; M = 65.0 g/mol: zinc. Aluminium would give 5.63 × 10⁻³ mol of H₂ (about 141 mL), far beyond the tube.',
            },
            {
              slug: 'gas-report',
              title: 'Write the Experiment 5 report',
              prompt:
                'Write the full report in the template above, covering the magnesium trials and the unknown metal, with every correction shown for one trial and the size of each correction compared with your final error.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the mass of metal the largest source of uncertainty here?',
              answerOutline: 'The sample is tiny (about 0.035 g), so ±0.00014 g is 0.4%, ten times the relative uncertainty of the volume, temperature or pressure.',
            },
            {
              question: 'How does the charge of the metal ion enter the molar-mass calculation?',
              answerOutline: 'A metal M forming M^n+ gives n/2 mol of H₂ per mole of metal, so moles of metal = 2 n(H₂)/n; the apparent 2+ molar mass must be multiplied by n/2.',
            },
            {
              question: 'Why must temperature be in kelvin?',
              answerOutline: 'Gas volumes are proportional to absolute temperature; the ideal gas law and R are defined with kelvin.',
            },
          ],
          quiz: [
            {
              question:
                '0.0362 g of Mg gives 37.87 mL of H₂ at 22.4 °C; the barometer reads 748.6 mmHg, the levels are equal, and the vapour pressure of water is 20.3 mmHg. What value of R do these data give?',
              options: ['0.08474 L atm mol⁻¹ K⁻¹', '0.08244 L atm mol⁻¹ K⁻¹', '82.44 L atm mol⁻¹ K⁻¹', '0.06244 L atm mol⁻¹ K⁻¹'],
              answer: 1,
              explanation:
                '$P = 728.3$ mmHg = 0.9583 atm; $n = 1.4894 \\times 10^{-3}$ mol; $T = 295.55$ K; $R = (0.9583)(0.03787)/((1.4894 \\times 10^{-3})(295.55)) = 0.08244$. Forgetting the vapour pressure gives 0.08474; using millilitres instead of litres gives 82.44.',
            },
            {
              question: 'For the same trial, what is the molar volume of hydrogen at STP (0 °C, 1 atm)?',
              options: ['25.43 L/mol', '22.52 L/mol', '22.41 L/mol', '23.50 L/mol'],
              answer: 1,
              explanation:
                '$0.03787 \\times 0.9583 \\times (273.15/295.55)/1.4894 \\times 10^{-3} = 22.52$ L/mol. 25.43 is the volume per mole at the lab conditions; 23.50 corrects the temperature but not the pressure; 22.41 is the accepted value, not what these data give.',
            },
            {
              question: 'An unknown metal gives an apparent molar mass of 18.0 g/mol when you assume it forms a 2+ ion. Which conclusion fits?',
              options: [
                'An element with molar mass 18.0 g/mol',
                'Zinc, as Zn²⁺',
                'Magnesium, as Mg²⁺',
                'Aluminium, as Al³⁺ (M = 18.0 × 3/2 = 27.0 g/mol)',
              ],
              answer: 3,
              explanation:
                'No metal has M = 18. A 3+ metal releases 3/2 mol of H₂ per mole, so its true molar mass is 3/2 times the apparent value: 27.0 g/mol, aluminium. Mg (24.3) and Zn (65.4) would give apparent values near their real molar masses.',
            },
          ],
        },
      ],
      project: {
        slug: 'gas-constant-lab-report',
        title: 'Lab report: the gas constant and an unknown metal',
        description: `Write the full report on Experiment 5 in the template at the end of the analysis lesson, from at least three magnesium trials, the two variations and at least two unknown-metal trials. The report answers: what value of R (and of the molar volume at STP) do your data give, with what uncertainty, and which metal is the unknown?`,
        deliverables: [
          'Data table with every reading and the corrected hydrogen pressure for each trial',
          'R and the molar volume at STP as mean ± uncertainty, with percent errors',
          'Identification of the unknown metal with the role of its ion charge explained',
          'Discussion comparing the size of each correction and error with your result; completed rubric and the downloaded .md file',
        ],
        estimatedHours: 2.5,
      },
    },
    {
      slug: 'calorimetry',
      title: 'Experiment 6: Calorimetry, Enthalpies of Solution and Changes of State',
      description:
        'Measure the heat capacity of a coffee-cup calorimeter, the enthalpy of solution of a salt and the enthalpy of fusion of ice, extrapolating temperature-time data to the moment of mixing to correct for heat exchange with the room.',
      lessons: [
        {
          slug: 'calorimetry-prelab',
          title: 'Pre-lab: heat, heat capacity and the coffee-cup calorimeter',
          summary:
            'q = mcΔT, the calorimeter constant, the sign of ΔH, enthalpies of solution, neutralisation and fusion, why temperature-time data are extrapolated, a practice run with neutralisation, and the hazards of the salts used.',
          estimatedMinutes: 110,
          relatedLessons: ['general-chemistry-1/thermochemistry/energy-heat-and-enthalpy', 'general-chemistry-1/thermochemistry/calorimetry'],
          objectives: [
            'Compute heat from mass, specific heat and temperature change, with the right sign',
            'Explain and calculate a calorimeter constant from a hot-cold water mixing experiment',
            'Convert a measured heat into ΔH per mole with the correct sign convention',
            'Explain why the temperature change is found by extrapolating to the mixing time',
          ],
          concepts: [
            'q = mcΔT',
            'Specific heat of water, 4.184 J g⁻¹ °C⁻¹',
            'Calorimeter constant C_cal (J/°C)',
            'System and surroundings',
            'ΔH = −q(solution + calorimeter)/n',
            'Endothermic and exothermic',
            'Extrapolation to the mixing time',
          ],
          explanation: `When a reaction or dissolution happens in water inside an insulated cup, the heat it releases or absorbs shows up as a temperature change of the water and the cup. The heat absorbed by the solution is $q_{\\mathrm{soln}} = m c \\Delta T$, with $c = 4.184$ J g⁻¹ °C⁻¹ for water (and, as an approximation this course and most first-year manuals make, for dilute solutions, with a density of 1.00 g/mL). The cup, lid and thermometer absorb a little too: $q_{\\mathrm{cal}} = C_{\\mathrm{cal}} \\Delta T$, where the **calorimeter constant** $C_{\\mathrm{cal}}$ (J/°C) is measured once for each calorimeter.

**Measuring $C_{\\mathrm{cal}}$.** Pour hot water into cool water in the cup. Energy is conserved: the heat lost by the hot water equals the heat gained by the cool water and the cup,

$$
m_{\\mathrm{h}} c (T_{\\mathrm{h}} - T_{\\mathrm{f}}) = m_{\\mathrm{c}} c (T_{\\mathrm{f}} - T_{\\mathrm{c}}) + C_{\\mathrm{cal}} (T_{\\mathrm{f}} - T_{\\mathrm{c}}) .
$$

With 50.00 g at 52.0 °C into 50.00 g at 22.0 °C and $T_{\\mathrm{f}} = 36.2$ °C, the hot water loses 3305 J, the cool water gains 2971 J, and the cup took the other 335 J: $C_{\\mathrm{cal}} = 335/14.2 = 23.6$ J/°C.

**From heat to enthalpy.** If the process releases heat, the contents warm up. At constant pressure the heat of the process is $q_{\\mathrm{rxn}} = -(q_{\\mathrm{soln}} + q_{\\mathrm{cal}})$, and $\\Delta H = q_{\\mathrm{rxn}}/n$ per mole. A temperature **rise** means $\\Delta H < 0$ (**exothermic**); a fall means $\\Delta H > 0$ (**endothermic**). Literature values used in this course (25 °C, per mole): neutralisation of a strong acid by a strong base −55.8 kJ; dissolving NH₄NO₃ +25.7, KCl +17.2, NaOH −44.5, CaCl₂ −81.3 kJ (infinite dilution); fusion of ice +6.01 kJ.

**Why extrapolate.** A coffee cup is not a perfect insulator, and mixing and dissolving take seconds to minutes. Once the contents differ from room temperature, heat flows in or out, so the highest (or lowest) reading is **not** the temperature the mixture would have reached instantly. Record the temperature every 15-30 s for a few minutes before mixing and for several minutes after. Fit a straight line to the steady part after mixing and **extrapolate it back to the mixing time**; $\\Delta T$ is that extrapolated value minus the temperature just before mixing.

Try the bench now with the simplest reaction, neutralisation, to learn the controls:

\`\`\`interactive
lab-calorimetry
{"mode": "neutralization", "caption": "Run the clock and record the temperature every 15-30 s for about two minutes, read the NaOH thermometer, pour in the NaOH, and keep recording for five minutes. Plot your readings: the line after mixing slopes down slowly as the cup loses heat. Extrapolate it back to the mixing time."}
\`\`\`

**Hazards.** NaOH and HCl at 1 M are corrosive to eyes; ammonium nitrate is an oxidiser (keep it away from combustibles); calcium chloride and solid NaOH release heat on dissolving and irritate eyes and skin. Goggles throughout.

**Pre-lab questions.** (1) Reproduce the $C_{\\mathrm{cal}}$ calculation above. (2) 5.00 g of NH₄NO₃ in 100.0 g of water, $C_{\\mathrm{cal}} = 25$ J/°C, ΔT = −3.45 °C: ΔH of solution? (3) Sketch the expected temperature-time curve for an endothermic dissolution.`,
          resources: [
            ostx('5-2-calorimetry', '5.2 Calorimetry', 'Heat capacity, specific heat and coffee-cup calorimetry with worked examples.', true),
            cc(90, 'Determining the heat of reaction in aqueous solution', 'A virtual coffee-cup calorimeter: plan and run a measurement.'),
            phet('energy-forms-and-changes', 'Energy forms and changes', 'Heat flow between objects at different temperatures, for intuition about the calorimeter and the room.'),
          ],
          exercises: [
            {
              slug: 'calorimetry-prelab-questions',
              title: 'Answer the pre-lab questions',
              prompt:
                'Answer the three pre-lab questions. For (2), state the sign of ΔH and say whether you included the mass of the salt in the solution mass, and why.',
              kind: 'problem',
              difficulty: 1,
              hint: '(2) q = (105.0 × 4.184 + 25)(3.45) = 1602 J absorbed; n = 5.00/80.043 = 0.06247 mol; ΔH = +25.6 kJ/mol.',
            },
            {
              slug: 'neutralization-practice',
              title: 'A neutralisation run',
              prompt:
                'In the bench above, do one complete neutralisation run: at least eight readings before mixing and fifteen after. Copy the data into a spreadsheet, plot it, fit the post-mixing line, extrapolate to the mixing time and compute ΔH of neutralisation per mole of water formed (HCl is limiting: 0.0500 mol). Compare with −55.8 kJ/mol.',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Use the average of the two starting temperatures (HCl in the cup, NaOH in the beaker) as T before mixing, since equal masses were mixed.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a calorimeter constant exist at all, and why is it measured rather than calculated?',
              answerOutline: 'The cup, lid and thermometer absorb or release heat; their heat capacity depends on their materials and how much is in contact with the liquid, so it is measured.',
            },
            {
              question: 'The temperature rose. What is the sign of ΔH and why?',
              answerOutline: 'Negative: the process released heat to the solution and cup (q_rxn = −(q_soln + q_cal) < 0); exothermic.',
            },
            {
              question: 'Why is the maximum temperature reading not the right final temperature?',
              answerOutline: 'Heat leaks to or from the room during the time mixing or reaction takes; extrapolating the post-mixing trend back to the mixing time estimates the instantaneous value.',
            },
          ],
          quiz: [
            {
              question:
                '50.00 g of water at 52.0 °C is poured into 50.00 g at 22.0 °C in a calorimeter. The extrapolated final temperature is 36.2 °C. What is the calorimeter constant?',
              options: ['334.7 J/°C', '23.6 J/°C', '−23.6 J/°C', '0 J/°C'],
              answer: 1,
              explanation:
                'Hot water loses $50.00 \\times 4.184 \\times 15.8 = 3305$ J; cool water gains $50.00 \\times 4.184 \\times 14.2 = 2971$ J; the cup took 335 J over a 14.2 °C rise: 23.6 J/°C. 334.7 is the heat in joules, not per degree; a negative constant is impossible.',
            },
            {
              question: 'Ammonium nitrate dissolves in water and the temperature falls. What is the sign of ΔH of solution?',
              options: [
                'Positive: dissolving absorbs heat from the water',
                'Negative: the solution got colder',
                'Zero: no chemical reaction occurred',
                'It cannot be decided without the mass',
              ],
              answer: 0,
              explanation:
                'The system (the dissolving salt) takes heat from the surroundings (the water), so the water cools and ΔH > 0: endothermic. "It got colder, so negative" confuses the temperature change of the water with the enthalpy change of the process.',
            },
            {
              question:
                '5.00 g of NH₄NO₃ (80.043 g/mol) dissolves in 100.0 g of water; $C_{\\mathrm{cal}} = 25$ J/°C; the extrapolated ΔT is −3.45 °C. What is ΔH of solution?',
              options: ['−25.6 kJ/mol', '+23.1 kJ/mol', '+1.60 kJ/mol', '+25.6 kJ/mol'],
              answer: 3,
              explanation:
                '$q = (105.0 \\times 4.184 + 25)(3.45) = 1602$ J absorbed by the dissolving; $n = 0.06247$ mol; $\\Delta H = +25.6$ kJ/mol. Leaving out the cup and the salt\'s mass gives +23.1; +1.60 is the heat in kJ, not per mole; the sign is positive because the water cooled.',
            },
            {
              question:
                '50.0 mL of 1.000 M HCl and 50.0 mL of 1.050 M NaOH are mixed ($C_{\\mathrm{cal}} = 25$ J/°C; treat the solution as 100.0 g of water). The extrapolated ΔT is 6.30 °C. What is ΔH of neutralisation?',
              options: ['−52.7 kJ/mol', '−53.2 kJ/mol', '−55.9 kJ/mol', '+55.9 kJ/mol'],
              answer: 2,
              explanation:
                '$q = (100.0 \\times 4.184 + 25)(6.30) = 2793$ J released; HCl is limiting, $n = 0.0500$ mol; $\\Delta H = -55.9$ kJ/mol. Using the NaOH moles (0.0525) gives −53.2; leaving out the cup gives −52.7; the sign is negative because the solution warmed.',
            },
          ],
        },
        {
          slug: 'calorimetry-experiment',
          title: 'The experiment: the calorimeter constant and an enthalpy of solution',
          summary:
            'Run the calorimeter: measure its constant by mixing hot and cool water, then dissolve a salt and record the temperature against time, choosing when to read and when to mix.',
          estimatedMinutes: 120,
          objectives: [
            'Collect temperature-time data before and after mixing at regular intervals',
            'Determine the calorimeter constant from a hot-cold water experiment',
            'Measure ΔT for the dissolution of a salt by extrapolation',
            'See the effect of the lid and of reading the maximum instead of extrapolating',
          ],
          concepts: [
            'Baseline before mixing',
            'Regular reading interval',
            'Mixing time t_mix',
            'Post-mixing linear region',
            'Lid on and lid off',
            'Mass of salt by balance',
          ],
          explanation: `Prepare two tables: for each run, the masses (from the setup readings and the balance) and the starting temperatures; and a time-temperature log. The bench's **Record reading** logs the displayed time and temperature for you, and **Copy as CSV** pastes them into a spreadsheet.

**Part A: calorimeter constant**

1. Start a sample in the first bench. Note the masses of cool water (in the cup) and hot water (in the beaker).
2. Run the clock and record the cup temperature every 15 or 30 s for at least 2 minutes.
3. Just before pouring, read the **hot-water thermometer** (it is cooling slowly in its beaker) and record it.
4. **Pour in the hot water** and note the mixing time. Keep recording every 15-30 s for at least 5 minutes.
5. Repeat with **New trial** (same calorimeter) at least twice.

\`\`\`interactive
lab-calorimetry
{"mode": "constant", "caption": "Record a baseline, read the hot water just before pouring, pour, and keep recording. Extrapolate your post-mixing line to the mixing time to get the final temperature. A calorimeter constant is small next to 100 g of water, so expect trial-to-trial scatter of a few J/°C."}
\`\`\`

**Part B: enthalpy of solution**

6. In the second bench, choose a salt (do ammonium nitrate, then calcium chloride). Set a target mass of about 5 g and **weigh the solid**; record the reading.
7. Record a baseline for 2 minutes, **add the solid** (note the time), and record for at least 6 minutes: dissolving takes tens of seconds.
8. Repeat each salt at least twice (**New trial**). The calorimeter constant shown is this cup's value; use your own from Part A in a real lab.
9. Variation: one run with the **lid off**.

\`\`\`interactive
lab-calorimetry
{"mode": "solution", "caption": "Ammonium nitrate cools the water, calcium chloride warms it. Record before and after adding the salt, then extrapolate. Compare a lid-off run: the post-mixing line is steeper, and the error from reading the extreme value instead of extrapolating grows."}
\`\`\`

**What you cannot learn here.** Stirring steadily without splashing, keeping a thermometer off the cup wall, pouring hot water quickly but completely. In a real lab these decide how linear your post-mixing line is.

**Data check.** Before mixing, readings should be steady (within 0.1 °C). After mixing, the temperature should settle within a minute or two into a gentle straight-line drift. If it is still changing quickly when you stop recording, you stopped too soon.`,
          resources: [
            smc("Chem_11_Experiments/12%3A_Calorimetry_and_Hess's_Law_(Experiment)", "Calorimetry and Hess's law", 'A real coffee-cup procedure with the extrapolation explained on its data sheet.', true),
            cc(92, 'Measuring the heat capacity of an engine coolant', 'A second virtual calorimetry problem: measure a heat capacity yourself.'),
          ],
          exercises: [
            {
              slug: 'three-constants',
              title: 'Three calorimeter constants',
              prompt:
                'Do Part A three times. For each trial, plot the data, extrapolate, and compute C_cal. Report the mean and standard deviation. Then compute C_cal once more from one trial using the highest reading instead of the extrapolated value: how different is it, and why is C_cal so sensitive to the final temperature?',
              kind: 'simulation',
              difficulty: 2,
              hint: 'C_cal is a small difference of two heats of about 3000 J each. An error of 0.1 °C in T_f shifts both by about 21 J in opposite directions, so C_cal moves by about 42 J ÷ 14 °C ≈ 3 J/°C. The maximum reading is typically 0.2-0.5 °C below the extrapolated value.',
            },
            {
              slug: 'two-salts',
              title: 'Two salts',
              prompt:
                'Do Part B with NH₄NO₃ and CaCl₂, two trials each, and one lid-off run. Compute ΔH of solution for each trial, compare with +25.7 and −81.3 kJ/mol, and report how much the lid-off run differs when you (a) extrapolate and (b) use the extreme reading.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why record a baseline before mixing?',
              answerOutline: 'To know the starting temperature precisely and to see any drift; the pre-mixing line also extrapolates to the mixing time.',
            },
            {
              question: 'Why is the hot water read just before pouring, not when it was first heated?',
              answerOutline: 'It cools in its beaker; the temperature that matters is the one at the moment of mixing.',
            },
            {
              question: 'What does removing the lid change in the temperature-time curve?',
              answerOutline: 'Faster heat exchange: a steeper post-mixing slope and a larger gap between the extreme reading and the extrapolated value.',
            },
          ],
          quiz: [
            {
              question: 'Why is the post-mixing line extrapolated back to the mixing time instead of using the highest reading?',
              options: [
                'The thermometer is more accurate at the mixing time',
                'Heat is exchanged with the room while mixing and dissolving take place, so the highest reading underestimates the change',
                'Extrapolation removes the need for a calorimeter constant',
                'The highest reading always occurs before mixing',
              ],
              answer: 1,
              explanation:
                'During the seconds or minutes the process takes, the cup is already losing (or gaining) heat, so the peak is lower than the instantaneous value. Extrapolating the steady drift back to the mixing time corrects for that. It does not replace the calorimeter constant.',
            },
            {
              question: 'For calcium chloride dissolving (exothermic), you use the highest reading instead of extrapolating. The magnitude of ΔH you report is:',
              options: ['too small', 'too large', 'unchanged', 'correct as long as the lid is on'],
              answer: 0,
              explanation:
                'The peak is below the extrapolated temperature, so ΔT and the heat are underestimated, and |ΔH| comes out too small. A lid reduces the error but does not remove it.',
            },
            {
              question: 'In $q = mc\\Delta T$ for the solution after dissolving 5.00 g of salt in 100.0 g of water, which mass do you use?',
              options: ['The water only, 100.0 g', 'The salt only, 5.00 g', 'Water plus salt, 105.0 g', 'Water plus the mass of the cup'],
              answer: 2,
              explanation:
                'Everything in the solution changes temperature, so m is the solution mass, 105.0 g. The cup\'s heat capacity is handled separately by $C_{\\mathrm{cal}}$, not by adding its mass.',
            },
          ],
        },
        {
          slug: 'heat-of-fusion',
          title: 'The experiment: the enthalpy of fusion of ice',
          summary:
            'Use the calorimeter to measure a change of state: add ice to warm water, record the temperature as it melts, weigh the cup to find how much ice went in, and account for the meltwater warming up.',
          estimatedMinutes: 100,
          objectives: [
            'Measure the mass of ice added by weighing the cup before and after',
            'Write the energy balance for melting ice and warming the meltwater',
            'Compute ΔH of fusion from extrapolated data',
            'Explain the effect of wet ice and of ice colder than 0 °C',
          ],
          concepts: [
            'Change of state at constant temperature',
            'Heat to melt, heat to warm meltwater',
            'Mass of ice by difference',
            'Ice at 0 °C, patted dry',
            'ΔH_fus = 6.01 kJ/mol (333.5 J/g)',
          ],
          explanation: `UIUC's CHEM 103 follows its enthalpy-of-solution lab with one on **changes of state** using the same calorimeter. Ice melting at 0 °C absorbs heat without changing temperature; once melted, the meltwater warms from 0 °C to the final temperature. The warm water and the cup supply both:

$$
(m_{\\mathrm{w}} c + C_{\\mathrm{cal}})(T_{\\mathrm{i}} - T_{\\mathrm{f}}) = n_{\\mathrm{ice}} \\Delta H_{\\mathrm{fus}} + m_{\\mathrm{ice}}\\, c\\, (T_{\\mathrm{f}} - 0) .
$$

You do not weigh the ice directly (it would melt on the balance and carry water). You weigh the cup with warm water before, and the cup with everything after: the difference is the ice.

**Procedure**

1. Start a sample. Record the setup masses (empty cup, cup with warm water).
2. Run the clock and record the water temperature every 15-30 s for 2 minutes.
3. Choose roughly how much ice to add (about 20-30 g), **add the ice** and note the time. Record every 15 s while it melts, then every 30 s for several minutes after it has gone.
4. **Weigh the cup and contents**. The ice mass is this minus the cup-with-water mass.
5. Repeat at least twice (**New trial**).

\`\`\`interactive
lab-calorimetry
{"mode": "fusion", "caption": "Record the warm water, add the ice, keep recording while it melts and after. Weigh the cup at the end to find the mass of ice. The temperature falls quickly while ice remains, then drifts slowly upward toward room temperature: extrapolate that drift back to the time the ice went in."}
\`\`\`

The second bench uses **wet ice**: cubes taken from water without patting dry, so some of the "ice" is liquid water at 0 °C. Run it the same way and compare.

\`\`\`interactive
lab-calorimetry
{"mode": "fusion", "wetIce": true, "title": "Calorimeter: wet ice", "caption": "Same procedure. The clinging water adds mass that needs no heat to melt: see which way it moves your enthalpy of fusion."}
\`\`\`

**A worked example.** 100.00 g of water at 36.0 °C, $C_{\\mathrm{cal}} = 25$ J/°C, 24.85 g of ice, extrapolated $T_{\\mathrm{f}} = 14.0$ °C. Heat given up: $(418.4 + 25)(22.0) = 9755$ J. Heat to warm the meltwater: $24.85 \\times 4.184 \\times 14.0 = 1456$ J. Heat to melt: $8299$ J for $24.85/18.015 = 1.3794$ mol, so $\\Delta H_{\\mathrm{fus}} = 6.02$ kJ/mol (literature 6.01).

**What you cannot learn here.** Patting ice dry quickly, keeping it from melting in your hand, stirring without splashing. Real ice also arrives a little colder than 0 °C if it comes straight from a freezer, which this simulator does not model; the pre-lab assumes ice from an ice-water bath.`,
          resources: [
            ostx('5-2-calorimetry', '5.2 Calorimetry', 'Review the energy-balance examples; the same bookkeeping applies with a phase change added.', true),
            cc(94, 'Camping problem I', 'A thermochemistry design problem with a phase change in it.'),
          ],
          exercises: [
            {
              slug: 'fusion-trials',
              title: 'Two good trials and a wet one',
              prompt:
                'Do two trials in the first bench and one in the wet-ice bench. For each, extrapolate, find the ice mass by weighing, and compute ΔH_fus. Report the good mean against 6.01 kJ/mol and the wet-ice result with its percent error.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'freezer-ice',
              title: 'Ice from the freezer',
              prompt:
                'Ice at −18 °C (specific heat 2.09 J g⁻¹ °C⁻¹) is used instead of ice at 0 °C, but the student does the calculation as if it were at 0 °C. For 25.0 g of ice, how much extra heat was needed to warm it to 0 °C? By what percent does that inflate the ΔH_fus the student reports (use 8.3 kJ as the true melting heat)?',
              kind: 'problem',
              difficulty: 2,
              hint: '25.0 × 2.09 × 18 = 941 J, which the student counts as melting heat: about +11%.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must the heat to warm the meltwater be included?',
              answerOutline: 'After melting at 0 °C the water ends at T_f; the warm water supplied that heat too, so ignoring it overstates the heat of melting.',
            },
            {
              question: 'Why is the ice mass found by weighing the cup afterwards rather than weighing the ice?',
              answerOutline: 'Ice melts and drips on the balance and carries surface water; the cup difference counts exactly what entered.',
            },
            {
              question: 'Which way does wet ice move ΔH_fus, and why?',
              answerOutline: 'Low: the clinging water adds mass counted as ice but needs no heat to melt.',
            },
          ],
          quiz: [
            {
              question:
                '100.00 g of water at 36.0 °C ($C_{\\mathrm{cal}} = 25$ J/°C) melts 24.85 g of ice; the extrapolated final temperature is 14.0 °C. What is ΔH of fusion?',
              options: ['7.07 kJ/mol', '5.62 kJ/mol', '6.02 kJ/mol', '0.334 kJ/mol'],
              answer: 2,
              explanation:
                'Heat given up: $(418.4 + 25)(22.0) = 9755$ J; minus the meltwater warming $24.85 \\times 4.184 \\times 14.0 = 1456$ J leaves 8299 J for 1.3794 mol: 6.02 kJ/mol. Forgetting the meltwater gives 7.07; leaving out the cup gives 5.62; 0.334 confuses kJ/g with kJ/mol.',
            },
            {
              question: 'The ice cubes carry some liquid water on their surface. The ΔH of fusion you calculate is:',
              options: ['too high', 'unchanged', 'more precise', 'too low'],
              answer: 3,
              explanation:
                'The surface water is counted in the ice mass but needs no heat to melt, so the heat is divided among too many "moles of ice": ΔH_fus comes out low.',
            },
            {
              question: 'Ice straight from a freezer at −18 °C is used, but the calculation assumes ice at 0 °C. The ΔH of fusion reported is:',
              options: ['too high', 'too low', 'unchanged', 'impossible to calculate'],
              answer: 0,
              explanation:
                'Warming the ice to 0 °C absorbs extra heat that the calculation attributes to melting, so ΔH_fus comes out too high (about 11% for 25 g at −18 °C). This is why ice is taken from an ice-water bath.',
            },
          ],
        },
        {
          slug: 'calorimetry-analysis',
          title: 'Analysis: extrapolation, uncertainty and the enthalpy results',
          summary:
            'Extrapolate temperature-time data in a spreadsheet, compute the calorimeter constant, the enthalpies of solution and fusion with uncertainties, compare with literature values, and write the report.',
          estimatedMinutes: 120,
          objectives: [
            'Fit pre- and post-mixing lines in a spreadsheet and extrapolate to the mixing time',
            'Compute q and ΔH with consistent signs and units',
            'Estimate the uncertainty of ΔT and of ΔH',
            'Explain the systematic errors of coffee-cup calorimetry and their directions',
          ],
          concepts: [
            'Post-mixing fit T = a + bt',
            'ΔT at t_mix',
            'Uncertainty of ΔT dominates',
            'Specific heat of the solution assumed equal to water',
            'Percent error against literature',
          ],
          explanation: `**Step 1: ΔT.** In the spreadsheet, select the readings after the curve has settled (usually from about one minute after mixing) and fit $T = a + bt$ with LINEST. The extrapolated temperature at the mixing time is $a + b\\,t_{\\mathrm{mix}}$. Do the same with the readings before mixing (often just their average). For example, a steady baseline of 22.1 °C and a post-mixing line $T = 30.84 - 0.0040\\,t$ with mixing at $t = 120$ s give $T(120) = 30.36$ °C and $\\Delta T = 8.26$ °C. Note the trap: the intercept $a$ (the line at $t = 0$) is not the answer unless you mixed at $t = 0$.

**Step 2: heats and enthalpies.** $q_{\\mathrm{soln}} + q_{\\mathrm{cal}} = (m c + C_{\\mathrm{cal}})\\Delta T$, then $\\Delta H = -(q_{\\mathrm{soln}} + q_{\\mathrm{cal}})/n$. Keep the signs: CaCl₂ warms the water, so $\\Delta T > 0$ and $\\Delta H < 0$; 2.15 kJ absorbed by solution and cup for 0.0300 mol is $\\Delta H = -71.7$ kJ/mol.

**Step 3: uncertainty.** With a 0.1 °C thermometer, each temperature (baseline and extrapolated) is uncertain by about 0.05 °C, so $u_{\\Delta T} = \\sqrt{2} \\times 0.05 = 0.07$ °C, which is 2.0% of a 3.45 °C change. Masses (0.01 g in 100 g) and the calorimeter constant (±5 J/°C in 445 J/°C, 1%) matter less. So ΔH is good to about 2-3%, and that is mainly a thermometer and extrapolation limit: a 0.01 °C probe and a bigger ΔT (more salt) improve it.

**What good data look like.** A flat baseline; a smooth post-mixing curve that becomes a straight line with a small slope; at least 8-10 points on that line; ΔT at least 3 °C.

**Systematic errors and their direction** (for |ΔH|): reading the extreme instead of extrapolating, too small; lid off, too small if not extrapolated; heat capacity of the solution taken as water's (concentrated solutions have $c$ a few percent lower, and a density above 1), a few percent off; ignoring $C_{\\mathrm{cal}}$, too small; salt not fully dissolved, too small; wet ice, ΔH_fus too low; freezer ice, too high. The literature enthalpies of solution are for infinite dilution; at about 0.6 mol/kg real values differ by a few percent. Finally, extrapolation itself is an approximation: when the change takes a minute or more (melting ice, magnesium ribbon), the cup exchanged heat at a different rate during the change than afterwards, so even careful work carries a bias of a percent or two.

Write one report covering Parts A and B and the fusion experiment in the template below; it is the module project.

\`\`\`interactive
lab-report
{"experiment": "calorimetry", "caption": "Your report on Experiment 6: one temperature-time figure per run type with both fitted lines, then the calorimeter constant, the enthalpies of solution and the enthalpy of fusion with uncertainties."}
\`\`\``,
          resources: [
            ostx('5-3-enthalpy', '5.3 Enthalpy', 'Enthalpy, sign conventions and standard enthalpies, for the discussion.', true),
            {
              title: 'Microsoft Support: LINEST function',
              url: 'https://support.microsoft.com/en-us/office/linest-function-84d7d0d9-6e50-4101-977a-fa7abf772b6d',
              type: 'documentation',
              cost: 'free',
              provider: 'Microsoft',
              note: 'Fit the post-mixing line with its standard errors; the intercept uncertainty feeds the uncertainty of ΔT.',
            },
          ],
          exercises: [
            {
              slug: 'extrapolate-all',
              title: 'Extrapolate every run',
              prompt:
                'For each of your runs (constant, two salts, fusion), make the temperature-time plot with both fitted lines, mark t_mix and the extrapolated temperatures, and tabulate ΔT. Compute every ΔH, the means and standard deviations, and the percent errors against the literature values in the pre-lab.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'uncertainty-of-dh',
              title: 'An uncertainty budget for ΔH of solution',
              prompt:
                'For one NH₄NO₃ trial, list each input (mass of water, mass of salt, ΔT, C_cal, specific heat assumption) with its uncertainty and its effect on ΔH. Which dominates? Would you rather have a 0.01 °C thermometer or twice as much salt, and why?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'calorimetry-report',
              title: 'Write the Experiment 6 report',
              prompt:
                'Write the full report in the template above, with the extrapolation figures, the results table, the uncertainty budget and a discussion of the systematic errors you measured (lid off, extreme reading, wet ice).',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the intercept of the post-mixing fit not the extrapolated temperature?',
              answerOutline: 'The intercept is the line at t = 0; the extrapolation must be evaluated at the mixing time.',
            },
            {
              question: 'What limits the precision of a coffee-cup ΔH?',
              answerOutline: 'Mainly the uncertainty of ΔT (thermometer resolution and extrapolation), about 2% for a 3-4 °C change; then the calorimeter constant.',
            },
            {
              question: 'Why can your enthalpy of solution differ from the tabulated value even with perfect technique?',
              answerOutline: 'Tabulated values are for infinite dilution at 25 °C; your solution is finite concentration with a heat capacity not exactly that of water.',
            },
          ],
          quiz: [
            {
              question:
                'The baseline before mixing is steady at 22.1 °C. After mixing at $t = 120$ s, the readings fit $T = 30.84 - 0.0040\\,t$ (t in s). What is ΔT?',
              options: ['8.74 °C', '8.26 °C', '8.02 °C', '30.36 °C'],
              answer: 1,
              explanation:
                'At $t = 120$ s the line gives $30.84 - 0.48 = 30.36$ °C, so $\\Delta T = 30.36 - 22.1 = 8.26$ °C. Using the intercept (the line at t = 0) gives 8.74; 30.36 is the temperature, not the change.',
            },
            {
              question: 'Dissolving 0.0300 mol of CaCl₂ raises the temperature; solution and cup absorb 2.15 kJ. What is ΔH of solution?',
              options: ['+71.7 kJ/mol', '−0.0645 kJ/mol', '+0.0645 kJ/mol', '−71.7 kJ/mol'],
              answer: 3,
              explanation:
                'The process released 2.15 kJ, so $\\Delta H = -2.15/0.0300 = -71.7$ kJ/mol. Multiplying instead of dividing gives 0.0645; the positive sign confuses the heat absorbed by the water with the enthalpy change of the dissolving salt.',
            },
            {
              question: 'The extrapolated ΔT is 3.45 °C and each of the two temperatures that define it is uncertain by ±0.05 °C. What is the relative uncertainty of ΔT?',
              options: ['2.0%', '1.4%', '2.9%', '0.05%'],
              answer: 0,
              explanation:
                'A difference: $\\sqrt{0.05^2 + 0.05^2} = 0.071$ °C, and $0.071/3.45 = 2.0\\%$. Using one temperature only gives 1.4%; adding them gives 2.9%.',
            },
          ],
        },
      ],
      project: {
        slug: 'calorimetry-lab-report',
        title: 'Lab report: calorimetry, enthalpies of solution and fusion',
        description: `Write the full report on Experiment 6 in the template at the end of the analysis lesson, from your own simulator runs: three calorimeter-constant trials, two trials each of NH₄NO₃ and CaCl₂, one lid-off run, two good fusion trials and one wet-ice trial. The report answers: what are the calorimeter constant, the two enthalpies of solution and the enthalpy of fusion of ice, with uncertainties, and how do they compare with literature values?`,
        deliverables: [
          'A temperature-time figure for each type of run with both fitted lines and the extrapolated ΔT marked',
          'Results table: masses, ΔT, q and ΔH for every run, with means, standard deviations and percent errors',
          'An uncertainty budget for one enthalpy of solution',
          'Discussion of the measured systematic errors (lid, extreme reading, wet ice) with directions; completed rubric and the downloaded .md file',
        ],
        estimatedHours: 3,
        stretchGoals: ['Correct one enthalpy of solution for the true heat capacity of the solution (look up the specific heat of a 0.6 mol/kg solution) and say how much it changes'],
      },
    },
    {
      slug: 'hess-law',
      title: "Experiment 7: The Enthalpy of Formation of Magnesium Oxide by Hess's Law",
      description:
        "Measure the enthalpies of two reactions you can run in a coffee cup, magnesium and magnesium oxide dissolving in hydrochloric acid, and combine them with the enthalpy of formation of water to obtain one you cannot measure directly.",
      lessons: [
        {
          slug: 'hess-law-prelab',
          title: "Pre-lab: Hess's law and an indirect enthalpy",
          summary:
            "Why the enthalpy of formation of MgO cannot be measured directly in a calorimeter, how Hess's law combines three reactions to give it, how much solid to use, and the hazards.",
          estimatedMinutes: 90,
          relatedLessons: ['general-chemistry-1/thermochemistry/hess-law-and-formation-enthalpies'],
          objectives: [
            "State Hess's law and explain why it follows from enthalpy being a state function",
            'Combine reactions (reversing and scaling them) to reach a target reaction',
            'Plan the masses of Mg and MgO for a temperature rise of about 8-12 °C',
            'Check that hydrochloric acid is in excess for the planned masses',
          ],
          concepts: [
            "Hess's law",
            'State function',
            'Reversing a reaction changes the sign of ΔH',
            'Standard enthalpy of formation',
            'Target reaction Mg(s) + ½O₂(g) → MgO(s)',
            'Limiting reagent check',
          ],
          explanation: `The standard enthalpy of formation of MgO is the enthalpy change of

$$
\\mathrm{Mg(s) + \\tfrac{1}{2}O_2(g) \\rightarrow MgO(s)} .
$$

You cannot measure it in a coffee cup: magnesium burns in air at over 2000 °C with a blinding flame, and the cup could neither contain it nor capture the heat. But enthalpy is a **state function**, so the enthalpy change between the same start and finish is the same by any route. That is **Hess's law**: if reactions add up to the target, their ΔH values add up to the target's ΔH. UIUC's CHEM 103 does exactly this experiment as one of its last labs.

The route uses two reactions you can run in a cup, plus one from tables:

$$
\\begin{aligned}
(1)\\;& \\mathrm{Mg(s) + 2H^+(aq) \\rightarrow Mg^{2+}(aq) + H_2(g)} && \\Delta H_1 \\text{ (measure)}\\\\
(2)\\;& \\mathrm{MgO(s) + 2H^+(aq) \\rightarrow Mg^{2+}(aq) + H_2O(l)} && \\Delta H_2 \\text{ (measure)}\\\\
(3)\\;& \\mathrm{H_2(g) + \\tfrac{1}{2}O_2(g) \\rightarrow H_2O(l)} && \\Delta H_3 = -285.8 \\text{ kJ/mol}
\\end{aligned}
$$

Reaction (1) plus (3) minus (2) leaves exactly the target (the H⁺, Mg²⁺, H₂ and H₂O cancel), so

$$
\\Delta_f H(\\mathrm{MgO}) = \\Delta H_1 - \\Delta H_2 + \\Delta H_3 .
$$

Reversing reaction (2) changes the sign of its ΔH. With literature values ($\\Delta H_1 = -466.9$, $\\Delta H_2 = -151.1$ kJ/mol) the result is $-466.9 + 151.1 - 285.8 = -601.6$ kJ/mol.

**Planning.** In 100.0 mL of 1.0 M HCl with $C_{\\mathrm{cal}} \\approx 25$ J/°C (total about 445 J/°C), 0.25 g of Mg (0.0103 mol) releases about 4.8 kJ, a rise of about 11 °C; 1.0 g of MgO (0.0248 mol) releases about 3.7 kJ, about 8.5 °C. The acid must be in excess: 0.25 g of Mg needs 0.021 mol of HCl, and 100 mL of 1.0 M holds 0.100 mol.

**Hazards.** 1.0 M HCl is corrosive to eyes; Mg with acid releases hydrogen (flammable: no flames) and spray, so keep the lid on; MgO powder is a mild irritant to breathe.

**Pre-lab questions.** (1) Show that (1) + (3) − (2) gives the target. (2) Compute $\\Delta_f H$ from $\\Delta H_1 = -466$ and $\\Delta H_2 = -151$ kJ/mol. (3) Is 100.0 mL of 1.0 M HCl enough for 0.50 g of Mg?`,
          resources: [
            ostx('5-3-enthalpy', "5.3 Enthalpy", "Hess's law and standard enthalpies of formation, with worked cycles.", true),
            cc(138, "Heats of reactions: Hess' law", 'A virtual Hess\'s-law experiment to compare with this one.'),
          ],
          exercises: [
            {
              slug: 'hess-prelab-questions',
              title: 'Answer the pre-lab questions',
              prompt:
                'Answer the three pre-lab questions. For (1), write the three equations with their ΔH, reverse and add them, and cross out each species that cancels.',
              kind: 'derivation',
              difficulty: 1,
              hint: '(2) −466 + 151 − 285.8 = −600.8 kJ/mol. (3) 0.50 g Mg = 0.0206 mol needs 0.041 mol HCl; 0.100 mol is in excess.',
            },
            {
              slug: 'another-cycle',
              title: 'Another Hess cycle',
              prompt:
                'Design a Hess cycle to obtain the enthalpy of formation of CaO from reactions you could run in a coffee cup with 1 M HCl (Ca metal reacts with water and acid; CaO dissolves in acid). Write the three reactions, the combination, and the formula for ΔfH(CaO). Which practical problem might calcium metal cause that magnesium does not?',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: "Why does Hess's law follow from enthalpy being a state function?",
              answerOutline: 'ΔH depends only on the initial and final states, so any route between them, including a sum of reactions, has the same total ΔH.',
            },
            {
              question: 'Why is reaction (2) subtracted rather than added?',
              answerOutline: 'MgO must appear as a product in the target, but it is a reactant in (2); reversing (2) puts it on the right and changes the sign of ΔH₂.',
            },
            {
              question: 'Why must HCl be in excess?',
              answerOutline: 'So that all the weighed Mg or MgO reacts; then the moles reacting are known from the mass.',
            },
          ],
          quiz: [
            {
              question: 'With $\\Delta H_1 = -466$ kJ/mol, $\\Delta H_2 = -151$ kJ/mol and $\\Delta H_3 = -285.8$ kJ/mol, what is $\\Delta_f H$(MgO)?',
              options: ['−902.8 kJ/mol', '−600.8 kJ/mol', '−29.2 kJ/mol', '+600.8 kJ/mol'],
              answer: 1,
              explanation:
                '$\\Delta H_1 - \\Delta H_2 + \\Delta H_3 = -466 + 151 - 285.8 = -600.8$ kJ/mol. Adding all three gives −902.8 (forgetting to reverse reaction 2); −29.2 reverses reaction 3 as well.',
            },
            {
              question: 'Which reaction is reversed to build the target $\\mathrm{Mg + \\tfrac{1}{2}O_2 \\rightarrow MgO}$?',
              options: [
                'Mg + 2H⁺ → Mg²⁺ + H₂',
                'H₂ + ½O₂ → H₂O',
                'MgO + 2H⁺ → Mg²⁺ + H₂O',
                'None: all three are added as written',
              ],
              answer: 2,
              explanation:
                'MgO must be a product, so the dissolution of MgO is reversed (and its ΔH changes sign). Mg must be a reactant and H₂O must be cancelled by forming it from H₂, so reactions 1 and 3 are used as written.',
            },
            {
              question: 'Why is the enthalpy of formation of MgO not measured directly in a coffee-cup calorimeter?',
              options: [
                'Burning magnesium is far too hot and fast to contain or to capture its heat in a cup of water',
                'MgO does not exist at room temperature',
                'The reaction is endothermic',
                'Hess\'s law forbids direct measurement',
              ],
              answer: 0,
              explanation:
                'Magnesium burns in oxygen at over 2000 °C; a coffee cup cannot contain the reaction or capture its heat. The indirect route uses reactions that happen gently in solution. The formation is strongly exothermic, and Hess\'s law permits any route.',
            },
          ],
        },
        {
          slug: 'hess-law-experiment',
          title: 'The experiment: Mg and MgO in hydrochloric acid',
          summary:
            'Run the calorimeter for both reactions: weigh the solid, record a baseline, add the solid, follow the temperature for long enough, and repeat each reaction at least twice.',
          estimatedMinutes: 110,
          objectives: [
            'Measure ΔT for the reactions of Mg and of MgO with HCl by extrapolation',
            'Record a long enough post-reaction period for the slower magnesium reaction',
            'Repeat each reaction to estimate precision',
            'Compute ΔH₁ and ΔH₂ per mole of solid',
          ],
          concepts: [
            'Slow reaction: longer extrapolation',
            'Mass of solid on an analytical balance',
            'Solution mass includes the solid',
            'Lid on: H₂ and spray',
            'Replicate trials',
          ],
          explanation: `Prepare a table for each reaction: trial, mass of solid (g), baseline temperature, mixing time, extrapolated temperature, ΔT.

**Procedure**

1. Start a sample and choose **Mg ribbon + HCl**. Set a target of about 0.25 g and **weigh the solid**; record the reading.
2. Record the temperature every 15-30 s for 2 minutes.
3. **Add the solid** and note the time. Magnesium takes a minute or more to dissolve; record every 15 s while it fizzes and every 30 s for at least 8 minutes in all.
4. Repeat with **New trial** (aim for at least two good trials).
5. Choose **MgO powder + HCl**, weigh about 1.0 g, and repeat steps 2-4. The powder dissolves faster.
6. Compute ΔH for each trial before checking it in the bench.

\`\`\`interactive
lab-calorimetry
{"mode": "hess", "caption": "Weigh the solid, record a baseline, add it, and follow the temperature well past the peak. Magnesium dissolves slowly, so the temperature keeps rising for a minute or more while the cup is already losing heat: extrapolating the later straight line back to the mixing time matters even more here than for a dissolving salt."}
\`\`\`

**A worked trial.** 0.2510 g of Mg ($n = 0.010327$ mol) in 100.0 mL of HCl, $C_{\\mathrm{cal}} = 25$ J/°C, extrapolated ΔT = 10.83 °C. Solution mass 100.25 g: $q = (100.25 \\times 4.184 + 25)(10.83) = 4813$ J released, so $\\Delta H_1 = -4.813/0.010327 = -466$ kJ/mol.

**What you cannot learn here.** Coiling the ribbon so it stays submerged, keeping the powder from sticking to the cup wall, and the smell and spray of a fizzing acid. In a real lab, a ribbon that floats to the surface reacts slowly and spoils the extrapolation.

**Data check.** The two Mg trials should agree within about 2% once each is divided by its own moles; so should the two MgO trials. If one Mg trial gives a much smaller ΔT per gram, check whether you recorded long enough after mixing.`,
          resources: [
            smc("Chem_11_Experiments/12%3A_Calorimetry_and_Hess's_Law_(Experiment)", "Calorimetry and Hess's law", 'A real procedure for a Hess-cycle experiment in coffee cups.', true),
            cc(138, "Heats of reactions: Hess' law", 'Repeat the idea with different reactions in a second virtual lab.'),
          ],
          exercises: [
            {
              slug: 'hess-trials',
              title: 'Two reactions, two trials each',
              prompt:
                'Do at least two trials of each reaction. For each, plot the data, extrapolate, and compute ΔH per mole of solid. Report mean ± standard deviation for ΔH₁ and ΔH₂.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'short-recording',
              title: 'What if you stop recording too soon?',
              prompt:
                'Take one of your Mg trials and redo the analysis using only the readings up to two minutes after mixing (fitting a line to the last few of them). How much does ΔT change compared with your full analysis, and in which direction? Explain using the shape of the curve.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the magnesium run need a longer post-mixing record than the MgO run?',
              answerOutline: 'Mg dissolves over a minute or more; the straight-line cooling region starts later, and the extrapolation needs it.',
            },
            {
              question: 'Why is ΔH reported per mole of solid rather than per mole of HCl?',
              answerOutline: 'The solid is limiting and its moles are known from the mass; reactions 1 and 2 are written per mole of Mg and MgO.',
            },
            {
              question: 'Which mass goes into q for the solution?',
              answerOutline: 'Acid solution (100 mL ≈ 100 g) plus the solid, treated as water, plus C_cal for the cup.',
            },
          ],
          quiz: [
            {
              question:
                '0.2510 g of Mg in 100.0 mL of HCl ($C_{\\mathrm{cal}} = 25$ J/°C; solution 100.25 g, treated as water) gives an extrapolated ΔT of 10.83 °C. What is $\\Delta H_1$?',
              options: ['+466 kJ/mol', '−440 kJ/mol', '−4.81 kJ/mol', '−466 kJ/mol'],
              answer: 3,
              explanation:
                '$q = (100.25 \\times 4.184 + 25)(10.83) = 4813$ J released by 0.010327 mol: $-466$ kJ/mol. Leaving out the cup gives −440; −4.81 is the heat in kJ, not per mole; the sign is negative because the solution warmed.',
            },
            {
              question: 'Why does extrapolation matter more for the magnesium reaction than for neutralisation?',
              options: [
                'Magnesium reacts instantly',
                'The thermometer reads magnesium solutions less accurately',
                'Magnesium takes a minute or more to dissolve, and the cup loses heat throughout, so the peak falls well short of the instantaneous value',
                'Extrapolation is not needed for magnesium',
              ],
              answer: 2,
              explanation:
                'The slower the heat release, the longer the cup has been losing heat by the time the peak arrives, so the gap between the peak and the extrapolated value grows. Neutralisation is complete within seconds.',
            },
            {
              question: 'Is 100.0 mL of 1.0 M HCl enough to dissolve 0.50 g of magnesium completely?',
              options: [
                'Yes: 0.50 g of Mg needs 0.041 mol of HCl and 0.100 mol is present',
                'No: it needs 0.200 mol of HCl',
                'Exactly: the amounts are stoichiometric',
                'No: HCl is limiting at 0.041 mol',
              ],
              answer: 0,
              explanation:
                '0.50/24.305 = 0.0206 mol of Mg needs 2 × 0.0206 = 0.041 mol of H⁺; 100.0 mL of 1.0 M supplies 0.100 mol, so the acid is in excess by more than a factor of two.',
            },
          ],
        },
        {
          slug: 'hess-law-analysis',
          title: "Analysis: combining the cycle and propagating uncertainty",
          summary:
            'Combine your ΔH₁ and ΔH₂ with ΔH₃ to get the enthalpy of formation of MgO, propagate the uncertainties, compare with −601.6 kJ/mol, identify the systematic errors, and write the report.',
          estimatedMinutes: 100,
          objectives: [
            'Combine measured enthalpies in a Hess cycle with correct signs',
            'Propagate the uncertainties of ΔH₁ and ΔH₂ into the result',
            'Compare the result with the accepted value and judge whether the difference is significant',
            'Identify systematic errors specific to these two reactions',
          ],
          concepts: [
            'ΔfH = ΔH₁ − ΔH₂ + ΔH₃',
            'Uncertainty of a sum or difference',
            'Significant difference: error larger than uncertainty',
            'Oxide coating on Mg',
            'Moisture or carbonate in MgO powder',
          ],
          explanation: `**Step 1: the cycle.** With your means, $\\Delta_f H(\\mathrm{MgO}) = \\Delta H_1 - \\Delta H_2 + \\Delta H_3$, with $\\Delta H_3 = -285.83$ kJ/mol from the tables (NBS/CRC). Keep every sign: $\\Delta H_2$ is negative, so subtracting it adds a positive number.

**Step 2: uncertainty.** A sum or difference combines absolute uncertainties in quadrature, and $\\Delta H_3$ is known far better than your measurements. With $\\Delta H_1 = -462 \\pm 6$ and $\\Delta H_2 = -148 \\pm 3$ kJ/mol, $\\Delta_f H = -462 + 148 - 285.8 = -599.8$ kJ/mol with uncertainty $\\sqrt{6^2 + 3^2} = 6.7$ kJ/mol. Note that ΔH₁ usually dominates: its reaction is slow, so its extrapolation is the least certain, and it is the larger number.

**Step 3: comparison.** The accepted value is −601.6 kJ/mol. A result of −599.8 ± 6.7 differs by 1.8 kJ/mol, well inside its uncertainty: consistent. A result of −585 ± 4 differs by 16.6, four times its uncertainty: a systematic error is present, and your discussion must look for it.

**What good data look like.** Two Mg trials agreeing within about 2%, two MgO trials within 2%, ΔH₁ near −467 and ΔH₂ near −151 kJ/mol, and a cycle result within 1-2% of −601.6.

**Systematic errors and their direction.** An **oxide coating on the magnesium**: part of the weighed mass is MgO, which releases much less heat per gram, so $\\Delta H_1$ per mole of "Mg" is less negative and $\\Delta_f H$ less negative. **MgO that has absorbed moisture or CO₂** (it slowly becomes Mg(OH)₂ and MgCO₃): fewer moles of MgO than you think, so $\\Delta H_2$ is less negative and $\\Delta_f H$ more negative. **Recording too short a time after the Mg reaction** or reading its peak: $\\Delta H_1$ too small in magnitude. **Solution heat capacity taken as water's**: both ΔH values biased the same way by a percent or two, partly cancelling in the difference. The reaction of Mg also carries a little heat away with the escaping hydrogen and water vapour, making $\\Delta H_1$ slightly less negative.

Write the report in the template below; it is the module project.

\`\`\`interactive
lab-report
{"experiment": "hess-law", "caption": "Your report on Experiment 7: both reactions' data and figures, the Hess cycle written out with numbers, and the propagated uncertainty of the result."}
\`\`\``,
          resources: [
            ostx('5-3-enthalpy', '5.3 Enthalpy', 'Check your cycle against the textbook\'s worked Hess\'s-law examples.', true),
            {
              title: 'NIST Chemistry WebBook',
              url: 'https://webbook.nist.gov/chemistry/',
              type: 'dataset',
              cost: 'free',
              provider: 'National Institute of Standards and Technology',
              note: 'Search for water and magnesium oxide: the condensed-phase thermochemistry data give ΔfH values to cite.',
            },
          ],
          exercises: [
            {
              slug: 'your-cycle',
              title: 'Your cycle with uncertainty',
              prompt:
                'Using your means and standard deviations for ΔH₁ and ΔH₂, compute ΔfH(MgO) with its propagated uncertainty. Is the difference from −601.6 kJ/mol significant (larger than twice your uncertainty)? Which of ΔH₁ and ΔH₂ contributes more to the uncertainty?',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'oxide-coating-size',
              title: 'How much does an oxide coating matter?',
              prompt:
                'Suppose 2.0% of the mass of a magnesium ribbon is actually MgO. For 0.2500 g of ribbon, compute the heat released (using the literature ΔH₁ and ΔH₂), the ΔH₁ a student would calculate assuming pure Mg, and the effect on ΔfH(MgO).',
              kind: 'problem',
              difficulty: 3,
              hint: '0.2450 g Mg (0.010080 mol) gives 4.706 kJ; 0.0050 g MgO (0.000124 mol) gives 0.019 kJ; 4.725 kJ / 0.010286 mol = −459.4 kJ/mol, so ΔfH moves to about −594 kJ/mol.',
            },
            {
              slug: 'hess-report',
              title: "Write the Experiment 7 report",
              prompt:
                'Write the full report in the template above, with both reactions\' data, the cycle, the propagated uncertainty, the significance test against −601.6 kJ/mol and a discussion of the systematic errors with directions.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the uncertainty of ΔH₃ hardly matter?',
              answerOutline: 'It is a tabulated value known to about 0.04 kJ/mol, tiny next to the experimental uncertainties of several kJ/mol.',
            },
            {
              question: 'When is a difference from the accepted value significant?',
              answerOutline: 'When it is clearly larger than the combined uncertainty (a common rule: more than about twice the standard uncertainty).',
            },
            {
              question: 'Why does an oxide coating make ΔfH(MgO) less negative?',
              answerOutline: 'Part of the "Mg" is MgO, which releases less heat per gram; ΔH₁ per mole comes out less negative, and ΔfH = ΔH₁ − ΔH₂ + ΔH₃ follows it.',
            },
          ],
          quiz: [
            {
              question: 'Your results are $\\Delta H_1 = -462 \\pm 6$ kJ/mol and $\\Delta H_2 = -148 \\pm 3$ kJ/mol. What is the uncertainty of $\\Delta_f H$(MgO)?',
              options: ['± 9 kJ/mol', '± 6.7 kJ/mol', '± 3 kJ/mol', '± 45 kJ/mol'],
              answer: 1,
              explanation:
                'For a sum or difference, absolute uncertainties combine in quadrature: $\\sqrt{6^2 + 3^2} = 6.7$ kJ/mol. Adding them linearly gives 9 (a worst case); ±45 adds the squares without the square root.',
            },
            {
              question: 'Your cycle gives $\\Delta_f H(\\mathrm{MgO}) = -594.5$ kJ/mol, against the accepted −601.6 kJ/mol. How far off is it?',
              options: [
                '1.2% too negative',
                '7.1% too small in magnitude',
                '1.2% too small in magnitude',
                '0.12% too small in magnitude',
              ],
              answer: 2,
              explanation:
                'The difference is 7.1 kJ/mol, and $7.1/601.6 = 1.2\\%$; −594.5 is less negative than −601.6, so the magnitude is too small. 7.1 is the absolute difference in kJ/mol, not a percentage.',
            },
            {
              question: 'The magnesium ribbon carries an oxide coating. The measured $\\Delta H_1$ per mole of "Mg" is:',
              options: ['more negative', 'unchanged', 'less negative (smaller in magnitude)', 'positive'],
              answer: 2,
              explanation:
                'Part of the weighed mass is MgO, which releases about a third as much heat per mole as Mg, and you divide the heat by moles calculated as if all of it were Mg. So ΔH₁ is less negative, and so is the ΔfH computed from it.',
            },
          ],
        },
      ],
      project: {
        slug: 'hess-law-lab-report',
        title: "Lab report: the enthalpy of formation of MgO by Hess's law",
        description: `Write the full report on Experiment 7 in the template at the end of the analysis lesson, from at least two simulator trials of each reaction. The report answers: what is the enthalpy of formation of magnesium oxide, with what uncertainty, and is it consistent with the accepted value of −601.6 kJ/mol?`,
        deliverables: [
          'Temperature-time figures for one trial of each reaction with the extrapolation marked',
          'Table of masses, moles, ΔT, q and ΔH for every trial, with means and standard deviations',
          'The Hess cycle written out with numbers, the propagated uncertainty and a significance test',
          'Discussion of the oxide coating, MgO purity and extrapolation errors with directions; completed rubric and the downloaded .md file',
        ],
        estimatedHours: 2.5,
      },
    },
    {
      slug: 'le-chatelier',
      title: "Experiment 8: Le Chatelier's Principle",
      description:
        "Disturb two coloured equilibria, iron(III) thiocyanate and the cobalt(II) chloride complexes, by adding reactants, removing them as precipitates, diluting and changing temperature, and explain each colour change with the reaction quotient and the equilibrium constant.",
      lessons: [
        {
          slug: 'le-chatelier-prelab',
          title: "Pre-lab: equilibrium, Q, K and Le Chatelier's principle",
          summary:
            "Dynamic equilibrium, the equilibrium constant and the reaction quotient, how concentration changes shift an equilibrium while temperature changes K itself, the two coloured systems, and the hazards of their reagents.",
          estimatedMinutes: 100,
          relatedLessons: ['general-chemistry-1/chemical-equilibrium/le-chateliers-principle', 'general-chemistry-1/chemical-equilibrium/reaction-quotient-and-ice-tables'],
          objectives: [
            'Write equilibrium-constant expressions for the two systems',
            'Predict the direction of a shift by comparing Q with K',
            'Explain why concentration and dilution stresses change Q but temperature changes K',
            'Compute an equilibrium concentration from initial concentrations and K',
          ],
          concepts: [
            'Dynamic equilibrium',
            'Equilibrium constant K',
            'Reaction quotient Q',
            'Q < K: shift right; Q > K: shift left',
            'Removing a species by precipitation',
            'Dilution and the number of solute particles',
            'Temperature changes K (sign of ΔH)',
          ],
          explanation: `At **equilibrium** the forward and reverse reactions continue at equal rates, so concentrations stay constant. For $\\mathrm{Fe^{3+}(aq) + SCN^-(aq) \\rightleftharpoons FeSCN^{2+}(aq)}$,

$$
K = \\frac{[\\mathrm{FeSCN^{2+}}]}{[\\mathrm{Fe^{3+}}][\\mathrm{SCN^-}]} ,
$$

and the same expression with the current, not-yet-equilibrium concentrations is the **reaction quotient** $Q$. If a disturbance makes $Q < K$, the reaction runs forward until $Q = K$; if $Q > K$, it runs backward. **Le Chatelier's principle** summarises the outcome: a system at equilibrium responds to a stress by shifting in the direction that partly counteracts it.

**Concentration stresses** change Q, not K. Adding Fe³⁺ lowers Q, so more red FeSCN²⁺ forms. Adding Ag⁺ removes SCN⁻ as white AgSCN(s), raising Q, so FeSCN²⁺ breaks up and the colour fades. **Dilution** with water lowers every concentration: in the expression above, halving all three makes $Q = 2K$, so the equilibrium shifts left, toward the side with more dissolved particles, and the colour fades more than dilution alone would explain.

**Temperature** is different: it changes **K itself**. For an endothermic forward reaction, K rises with temperature; for an exothermic one, it falls. The cobalt system shows this clearly:

$$
\\mathrm{[Co(H_2O)_6]^{2+}(aq)}\\ (\\text{pink}) + 4\\mathrm{Cl^-(aq)} \\rightleftharpoons \\mathrm{[CoCl_4]^{2-}(aq)}\\ (\\text{blue}) + 6\\mathrm{H_2O(l)} ,
$$

which turns blue when heated and pink when cooled: the forward reaction is endothermic. Adding concentrated HCl (more Cl⁻) also drives it toward blue; adding water drives it toward pink.

**A number to anchor the colours.** With 1.0 mM each of Fe³⁺ and SCN⁻ and $K = 140$ (a representative value; reported values vary with ionic strength), solving $140 = x/(0.0010 - x)^2$ gives $x = 1.1 \\times 10^{-4}$ M: only about 11% of the iron is in the red complex, so both directions of shift are easy to see.

UIUC ends CHEM 103 with this experiment. **Hazards.** Silver nitrate stains skin black and is corrosive to eyes; iron(III) nitrate solutions contain nitric acid; potassium thiocyanate is harmful if swallowed and releases toxic gas with strong acids; cobalt(II) chloride is classified as a presumed carcinogen and skin sensitiser: gloves, and no contact with skin; concentrated HCl is corrosive and fuming. Dispose of silver and cobalt waste in their labelled containers.

**Pre-lab questions.** (1) Predict the effect of each stress in the experiment on each system. (2) Show that diluting the iron mixture twofold makes $Q = 2K$.`,
          resources: [
            ostx('13-3-shifting-equilibria-le-chateliers-principle', "13.3 Shifting equilibria: Le Châtelier's principle", 'Concentration, pressure and temperature stresses with Q and K; includes the cobalt chloride example.', true),
            ostx('13-2-equilibrium-constants', '13.2 Equilibrium constants', 'K and Q expressions, and predicting the direction of reaction.'),
            phet('reversible-reactions', 'Reversible reactions', 'Watch forward and reverse rates become equal at equilibrium.'),
          ],
          exercises: [
            {
              slug: 'predict-the-shifts',
              title: 'Predict every shift',
              prompt:
                'Make a table with one row per stress (add Fe(NO₃)₃, add KSCN, add AgNO₃, add water to the iron system; add 12 M HCl, add water, heat, cool the cobalt system). For each, say whether Q or K changes, the direction of the shift, and the expected colour change compared with the control.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'solve-the-equilibrium',
              title: 'Solve an equilibrium',
              prompt:
                'With K = 140 and initial concentrations 1.0 mM Fe³⁺ and 1.0 mM SCN⁻, solve for [FeSCN²⁺] exactly (quadratic). Then add Fe³⁺ to make its initial total 5.0 mM (ignore the volume change) and solve again. By what factor does [FeSCN²⁺] increase? Which reactant is now nearly used up?',
              kind: 'problem',
              difficulty: 2,
              hint: 'First 0.111 mM; with 5.0 mM Fe³⁺ about 0.39 mM, a factor of 3.5. SCN⁻ is the reactant that is now largely consumed (61% of it is in the complex).',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between Q and K?',
              answerOutline: 'Same expression; K uses equilibrium concentrations and is fixed at a given temperature, Q uses the current concentrations and tells you which way the reaction will go.',
            },
            {
              question: 'Which stress changes the value of K, and why only that one?',
              answerOutline: 'Temperature; K is related to ΔG° = −RT ln K, which depends on temperature. Concentration stresses change Q, after which the system returns to the same K.',
            },
            {
              question: 'Why does dilution shift the iron thiocyanate equilibrium to the left?',
              answerOutline: 'The left side has two dissolved species and the right one; diluting lowers the denominator more than the numerator, Q rises above K, and the system shifts toward more particles.',
            },
          ],
          quiz: [
            {
              question: 'A few drops of Fe(NO₃)₃ are added to the iron thiocyanate equilibrium. What happens immediately and then?',
              options: [
                'Q > K, so it shifts left',
                'Q = K, so nothing changes',
                'K increases, so it shifts right',
                'Q < K, so it shifts right and more red FeSCN²⁺ forms',
              ],
              answer: 3,
              explanation:
                'Adding Fe³⁺ increases the denominator of Q, so Q falls below K and the forward reaction runs until Q = K again. K does not change; only temperature changes K.',
            },
            {
              question: 'Starting from 1.0 mM Fe³⁺ and 1.0 mM SCN⁻ with K = 140, what is [FeSCN²⁺] at equilibrium?',
              options: ['0.11 mM', '0.14 mM', '1.0 mM', '0.50 mM'],
              answer: 0,
              explanation:
                'Solving $140 = x/(0.0010 - x)^2$ gives $x = 1.1 \\times 10^{-4}$ M. 0.14 mM ignores the depletion of the reactants ($x \\approx K \\times 10^{-6}$); 1.0 mM assumes the reaction goes to completion.',
            },
            {
              question: 'Which stress changes the value of the equilibrium constant?',
              options: ['Adding a reactant', 'Adding water', 'Heating the solution', 'Removing a reactant as a precipitate'],
              answer: 2,
              explanation:
                'K depends only on temperature (for a given reaction). The other stresses change Q, and the system shifts until Q equals the same K again.',
            },
            {
              question: 'A tube of the cobalt system turns blue in a hot-water bath and pink in an ice bath. The forward reaction (toward [CoCl₄]²⁻) is:',
              options: ['exothermic', 'endothermic', 'neither: temperature affects only the rate', 'impossible to classify from colours'],
              answer: 1,
              explanation:
                'Heating favours the blue product, so K increases with temperature, which is the signature of an endothermic forward reaction: heat acts like a reactant.',
            },
          ],
        },
        {
          slug: 'le-chatelier-experiment',
          title: 'The experiment: stressing two equilibria',
          summary:
            'Use a rack of test tubes with a control: apply one stress per tube to the iron thiocyanate and cobalt chloride systems, record each observation against the control, and only then look at the concentrations.',
          estimatedMinutes: 90,
          objectives: [
            'Compare each stressed tube with an unstressed control',
            'Record observations (colour, precipitate) precisely and without interpretation',
            'Apply concentration, dilution and temperature stresses',
            'Separate observation from explanation in the record',
          ],
          concepts: [
            'Control tube',
            'One stress per tube',
            'Observation versus interpretation',
            'Precipitate as a stress (removing a species)',
            'Reversibility of temperature shifts',
          ],
          explanation: `Prepare an observation table: tube, stress applied (what and how much), observation compared with the control. Leave space for the explanation, which you write later.

**Procedure: iron thiocyanate**

1. Choose the **iron** system. Tube 1 is the control: never touch it.
2. Tube 2: **+ Fe(NO₃)₃**. Compare with the control and record.
3. Tube 3: **+ KSCN**. Record.
4. Tube 4: **+ AgNO₃**. Record the colour and anything else you see.
5. Tube 5: **+ 2 mL water**. Compare carefully: is it paler than dilution alone would make it?
6. Optionally stress a tube twice (for example AgNO₃, then KSCN) and record each step.

**Procedure: cobalt chloride**

7. Switch to the **cobalt** system (fresh rack).
8. Tube 2: **+ 12 M HCl**. Tube 3: **+ 1 mL water**. Tube 4: **hot bath**, then **room temperature**. Tube 5: **ice bath**, then **hot bath**.
9. Record each observation against the control, including whether the temperature changes reverse.
10. Only after your table is complete, use **Show the concentrations** to see what happened in each tube.

\`\`\`interactive
lab-equilibrium
{"caption": "Apply one stress per tube and compare it with the control (tube 1). Each tube's description is also given in words beside the rack. Record observations only; write explanations afterwards, then check them against the concentrations."}
\`\`\`

**Observation, not interpretation.** Write "tube 4: white precipitate; solution almost colourless, paler than the control", not "SCN⁻ was removed so the equilibrium shifted left". The interpretation goes in the analysis, where it can be checked against the observation.

**What you cannot learn here.** Judging colour by eye against a white card, the speed of the colour change, and the safety discipline these reagents need (gloves with cobalt chloride, care with silver nitrate and concentrated HCl). The ChemCollective cobalt chloride lab is a second virtual bench.`,
          resources: [
            smc("Chem_12_Experiments/03%3A_Le_Chatelier's_Principle_(Experiment)", "Le Chatelier's principle", 'A real procedure with both systems and an observation table to compare with yours.', true),
            cc(85, "Cobalt chloride and Le Chatelier's principle", 'The cobalt system in a second virtual lab, with temperature and chloride stresses.'),
          ],
          exercises: [
            {
              slug: 'full-rack',
              title: 'Both racks',
              prompt:
                'Carry out steps 1-9 for both systems, recording observations only. Then write a second column of explanations using Q and K, and finally compare with the concentrations from step 10. Note any prediction that turned out wrong and why.',
              kind: 'simulation',
              difficulty: 1,
            },
            {
              slug: 'double-stress',
              title: 'Two stresses in sequence',
              prompt:
                'In one iron tube, add AgNO₃, then KSCN twice. Describe and explain each step. Why does the colour come back only after enough KSCN has been added, and what must have happened to the silver first?',
              kind: 'simulation',
              difficulty: 2,
              hint: 'Excess Ag⁺ precipitates any SCN⁻ added until the silver is used up; only then does free SCN⁻ remain to form FeSCN²⁺.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is a control tube needed?',
              answerOutline: 'Colour judgements are relative; the control shows what the unstressed equilibrium looks like under the same light and at the same time.',
            },
            {
              question: 'Why does adding water make the iron tube paler than a simple dilution would?',
              answerOutline: 'Dilution itself lowers every concentration, and it also raises Q above K, so FeSCN²⁺ partly dissociates.',
            },
            {
              question: 'What does the reversibility of the temperature changes tell you?',
              answerOutline: 'That the colour change is an equilibrium shift (K changed with T and changes back), not a decomposition.',
            },
          ],
          quiz: [
            {
              question: 'AgNO₃ is added to an iron thiocyanate tube. A white precipitate forms and the red colour fades. Why?',
              options: [
                'Ag⁺ reacts with Fe³⁺, removing it',
                'Ag⁺ removes SCN⁻ as AgSCN(s); Q rises above K and FeSCN²⁺ dissociates',
                'The precipitate scatters the red light',
                'Adding a solution always lowers K',
              ],
              answer: 1,
              explanation:
                'Silver thiocyanate is very insoluble, so SCN⁻ is removed, the denominator of Q falls, Q exceeds K and the equilibrium shifts left. Ag⁺ does not precipitate Fe³⁺, and K is unaffected.',
            },
            {
              question: 'Water is added to double the volume of an iron thiocyanate tube. What does Q become, and what follows?',
              options: [
                'Q = 2K, so it shifts left and the colour fades more than dilution alone explains',
                'Q = K/2, so it shifts right',
                'Q = K: dilution never shifts an equilibrium',
                'K halves on dilution',
              ],
              answer: 0,
              explanation:
                'Halving every concentration halves the numerator and quarters the denominator, so $Q = 2K$. The system shifts left (toward more dissolved particles) until $Q = K$ again.',
            },
            {
              question: 'Why must one tube be left unstressed?',
              options: [
                'To keep a spare in case of spills',
                'Because the equilibrium needs time to form in it',
                'Because K must be measured in it',
                'To compare every stressed tube with the unstressed equilibrium under the same conditions',
              ],
              answer: 3,
              explanation:
                'Colour comparisons are only meaningful against a reference seen at the same time and in the same light. The control is that reference.',
            },
          ],
        },
        {
          slug: 'le-chatelier-analysis',
          title: 'Analysis: explaining every observation with Q and K',
          summary:
            'Turn observations into explanations: compute Q after each concentration stress, relate the temperature results to the sign of ΔH, check the explanations against the concentrations, and write the report.',
          estimatedMinutes: 90,
          objectives: [
            'Compute Q after a stress and predict the shift quantitatively',
            'Infer the sign of ΔH from the effect of temperature on colour',
            'Distinguish stresses that change Q from those that change K',
            'Write an explanation table that ties each observation to its cause',
          ],
          concepts: [
            'Q immediately after a stress',
            'Return to the same K',
            'K(T) and the sign of ΔH',
            'Common-ion and precipitation stresses',
            'Spectator ions do not appear in Q',
          ],
          explanation: `**Concentration stresses, quantitatively.** In the iron control, $[\\mathrm{FeSCN^{2+}}] = 0.111$ mM and $[\\mathrm{Fe^{3+}}] = [\\mathrm{SCN^-}] = 0.889$ mM (so $K = 0.111/(0.889)^2 \\times 10^{3} = 140$ with concentrations in mol/L). If Fe³⁺ is suddenly doubled to 1.778 mM, $Q = 0.111 \\times 10^{-3}/((1.778 \\times 10^{-3})(0.889 \\times 10^{-3})) = 70$, half of K, so the reaction runs forward until $Q = 140$ again. The new equilibrium has more FeSCN²⁺, **less** SCN⁻, and more Fe³⁺ than before (the shift uses up only part of what you added). Le Chatelier's principle says "partly counteracts", not "undoes".

**Precipitation.** Ag⁺ precipitates SCN⁻ as AgSCN ($K_{\\mathrm{sp}} \\approx 10^{-12}$). With enough Ag⁺, essentially all thiocyanate is removed, so FeSCN²⁺ falls to almost nothing and the tube is the pale yellow of iron(III) in nitric acid, with a white precipitate.

**Spectator ions.** Adding KSCN adds K⁺ too, and Fe(NO₃)₃ adds NO₃⁻; they do not appear in Q, so they do not shift the equilibrium (apart from small ionic-strength effects on K that this level ignores).

**Temperature.** The cobalt system turned blue when heated and pink when cooled: K increased with temperature, so the forward reaction is endothermic. Quantitatively, the van 't Hoff equation $\\ln(K_2/K_1) = -(\\Delta H/R)(1/T_2 - 1/T_1)$ links the change in K to ΔH. (The simulator's cobalt numbers are illustrative; the sign is what the experiment establishes.) The colour change reversed when the tube returned to room temperature: a shift in equilibrium, not decomposition.

**Chloride and water in the cobalt system.** Adding concentrated HCl raises [Cl⁻]; since $Q = [\\mathrm{CoCl_4^{2-}}]/([\\mathrm{Co(H_2O)_6^{2+}}][\\mathrm{Cl^-}]^4)$, Q falls below K and the tube turns bluer. Adding water dilutes Cl⁻, and the fourth power makes Q rise steeply: the tube turns pink.

**What good records look like.** Every observation is relative to the control, includes precipitates, and is written before any explanation. Every explanation names whether Q or K changed and in which direction.

Write the report in the template below; it is the module project.

\`\`\`interactive
lab-report
{"experiment": "le-chatelier", "caption": "Your report on Experiment 8: the observation table, then an explanation of each observation with Q and K, the sign of ΔH for the cobalt system, and what the concentrations confirmed."}
\`\`\``,
          resources: [
            ostx('13-3-shifting-equilibria-le-chateliers-principle', "13.3 Shifting equilibria: Le Châtelier's principle", 'Work the end-of-section exercises after writing your explanation table.', true),
            smc("Chem_10_Experiments/12%3A_Equilibrium_and_Le_Chatelier's_Principle_(Experiment)", "Equilibrium and Le Chatelier's principle", 'Another real procedure and report sheet, with additional systems for comparison.'),
          ],
          exercises: [
            {
              slug: 'q-after-stress',
              title: 'Q after each stress',
              prompt:
                'Using the control concentrations (0.111 mM FeSCN²⁺, 0.889 mM Fe³⁺ and SCN⁻, K = 140), compute Q immediately after: (a) doubling [SCN⁻]; (b) diluting the tube to three times its volume; (c) removing half of the SCN⁻. State the direction of each shift. Then solve (a) for the new equilibrium and check that [SCN⁻] ends higher than 0.889 mM but lower than 1.778 mM.',
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Q = 70, shifts right; (b) Q = 420, shifts left; (c) Q = 280, shifts left.',
            },
            {
              slug: 'explanation-table',
              title: 'The explanation table',
              prompt:
                'For every tube you stressed, write: the observation, whether Q or K changed, the direction of the shift, the species whose concentration rose and fell, and a one-sentence explanation. Check each against the concentrations from the simulator and correct any mistake, saying what you had wrong.',
              kind: 'writing',
              difficulty: 1,
            },
            {
              slug: 'le-chatelier-report',
              title: 'Write the Experiment 8 report',
              prompt:
                'Write the full report in the template above, built around the observation and explanation tables, with one quantitative Q calculation and the inference of the sign of ΔH for the cobalt system.',
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'After Fe³⁺ is added and the system re-equilibrates, is [SCN⁻] higher or lower than before? Why?',
              answerOutline: 'Lower: the forward shift consumes SCN⁻; nothing added SCN⁻.',
            },
            {
              question: 'Why does K⁺ from added KSCN not shift the equilibrium?',
              answerOutline: 'K⁺ is a spectator ion that does not appear in the reaction or in Q.',
            },
            {
              question: 'How do you know from colours alone that the cobalt forward reaction is endothermic?',
              answerOutline: 'Heating shifts it toward blue [CoCl₄]²⁻ (K increases with T), which is the behaviour of an endothermic reaction.',
            },
          ],
          quiz: [
            {
              question: 'In the iron control ([FeSCN²⁺] = 0.111 mM, [Fe³⁺] = [SCN⁻] = 0.889 mM, K = 140), [Fe³⁺] is suddenly doubled. What is Q, and what happens?',
              options: ['Q = 280, so it shifts left', 'Q = 140, so there is no shift', 'Q = 70, so it shifts right', 'Q = 70, so it shifts left'],
              answer: 2,
              explanation:
                'Doubling one factor of the denominator halves Q: $Q = 70 < K$, so the forward reaction runs and more FeSCN²⁺ forms. Q > K would mean a shift left.',
            },
            {
              question: 'Concentrated HCl is added to a violet cobalt tube and it turns blue. What changed?',
              options: [
                'K increased because HCl is an acid',
                'More Cl⁻ lowered Q below K, so the reaction shifted toward [CoCl₄]²⁻',
                'The water evaporated',
                'H⁺ reacted with the blue complex',
              ],
              answer: 1,
              explanation:
                'Cl⁻ appears to the fourth power in the denominator of Q, so adding it lowers Q sharply and the reaction runs forward toward the blue complex. Only temperature changes K.',
            },
            {
              question: 'Solid KNO₃ (no ion common to the reaction) is dissolved in an iron thiocyanate tube. What do you expect?',
              options: [
                'A strong shift to the right',
                'A strong shift to the left',
                'A white precipitate',
                'Little or no change, because neither K⁺ nor NO₃⁻ appears in Q',
              ],
              answer: 3,
              explanation:
                'Spectator ions do not appear in the equilibrium expression, so Q is unchanged and there is no shift (beyond small ionic-strength effects). It is a useful control for the other additions.',
            },
          ],
        },
      ],
      project: {
        slug: 'le-chatelier-lab-report',
        title: "Lab report: Le Chatelier's principle",
        description: `Write the full report on Experiment 8 in the template at the end of the analysis lesson, from your own observations of both systems. The report answers: how does each equilibrium respond to each stress, and is every response explained by a change in Q (concentration stresses) or in K (temperature)?`,
        deliverables: [
          'Observation table for every tube, written against the control, with precipitates noted',
          'Explanation table: Q or K, direction of shift, species that rose and fell',
          'One quantitative Q calculation and the inference of the sign of ΔH for the cobalt system',
          'Comparison of the explanations with the simulator concentrations; completed rubric and the downloaded .md file',
        ],
        estimatedHours: 2,
      },
    },
  ],
  capstone: {
    slug: 'formal-report-or-designed-experiment',
    title: 'A formal report, or an experiment you design',
    description: `Finish the course with one piece of work that shows everything together: measurement with stated uncertainty, a quantitative method, analysis in a spreadsheet and a full formal report. Choose one of two options.

**Option A: a formal report on one experiment, done properly.** Pick the experiment you found hardest (titration, calorimetry or Hess's law are good choices). Repeat it with at least five good trials and the variations, and write a formal report of 2,000-3,000 words to the standard of a paper: an abstract, an introduction that cites the textbook and the procedure, a methods section someone could follow, results with numbered figures and tables, a complete uncertainty budget, and a discussion in which every error source is tied to a measured or estimated effect.

**Option B: design your own experiment with the simulators.** Ask a question the course did not ask, and answer it. Examples: How does the number of standards and their range affect the uncertainty of an unknown in Beer's law (use the spectrophotometer, varying the design)? What is the smallest KHP mass that still gives a molarity within 0.2%? How much does the lid change the error of a calorimeter result if you do or do not extrapolate? How large must the oxide coating be before the gas-constant result is significantly wrong? State a hypothesis, the variables you change and hold fixed, the number of trials, and how you will decide. Then run it, analyse it, and write it up in the capstone template.

Either way, write in the template below (it saves in your browser and downloads as Markdown), grade it with the rubric, and keep the downloaded file.

\`\`\`interactive
lab-report
{"experiment": "capstone", "caption": "The capstone report: the same sections as every report, with the rubric extended for experimental design and a full uncertainty budget."}
\`\`\``,
    deliverables: [
      'A clear question (Option B) or a chosen experiment with the reason for choosing it (Option A)',
      'Raw data from at least five trials (or a full designed series) in a spreadsheet with a raw-data sheet and formulas',
      'Figures and tables numbered and captioned; every result with uncertainty and units',
      'An uncertainty budget showing each input and its share of the final uncertainty',
      'A discussion that ties every error source to its direction and size, and states what a real bench would add',
      'The finished report (2,000-3,000 words) downloaded as Markdown, with the rubric self-check',
    ],
    estimatedHours: 8,
    stretchGoals: [
      'Do both options',
      'Run one of the safe at-home activities (red cabbage, kitchen densities) as a real experiment with stated uncertainties and compare it with its simulated counterpart',
      'Ask someone else to follow your methods section exactly and see whether they reproduce your result',
    ],
  },
  masteryChecklist: [
    'I can apply RAMP to a procedure, read an SDS for the hazards and PPE of a reagent, and say what is safe to do at home',
    'I can choose glassware for a task and read a burette, pipet or gas-tube meniscus to one tenth of its smallest division',
    'I can report any result as value ± uncertainty with correct significant figures, propagating uncertainty through sums and products',
    'I can keep a notebook whose raw data and corrections another person could audit',
    'I can fit a calibration line with LINEST, judge it from its residuals, and invert it for an unknown',
    'I can standardise a titrant against a primary standard and find the molar mass of an unknown acid, and say how each common error moves the result',
    'I can determine an empirical formula by heating to constant mass and explain why most errors lower the O : Mg ratio',
    "I can correct a gas collected over water for vapour pressure and a water column and compute R or a molar mass",
    'I can extrapolate calorimetry data to the mixing time, compute ΔH with the right sign, and combine measured enthalpies in a Hess cycle',
    "I can explain any Le Chatelier observation with Q and K and infer the sign of ΔH from a temperature effect",
    'I can write a complete lab report whose discussion ties each error source to its direction and size',
  ],
});
