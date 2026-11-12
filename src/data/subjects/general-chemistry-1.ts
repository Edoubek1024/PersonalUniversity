import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

/*
 * Data conventions used throughout this course (stated once here and in the lessons):
 *   molar masses   IUPAC standard atomic weights rounded to 4 significant figures
 *                  (H 1.008, C 12.01, N 14.01, O 16.00, Na 22.99, Al 26.98, S 32.06, Cl 35.45, ...)
 *   N_A            6.02214076e23 /mol (exact); 6.022e23 in worked examples
 *   R              8.314 J/(mol K) and 0.08206 L atm/(mol K)
 *   h, c           6.626e-34 J s, 2.998e8 m/s
 *   R_H            1.097e7 /m (so hcR_H = 2.179e-18 J)
 *   enthalpies     OpenStax Chemistry 2e Appendix G; bond energies OpenStax Table 7.2
 */

const ostx = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `OpenStax Chemistry 2e, ${title}`,
  url: `https://openstax.org/books/chemistry-2e/pages/${slug}`,
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary,
});

const phet = (slug: string, name: string, note: string): ResourceInput => ({
  title: `PhET simulation: ${name}`,
  url: `https://phet.colorado.edu/en/simulations/${slug}`,
  type: 'interactive',
  cost: 'free',
  provider: 'PhET, University of Colorado Boulder',
  note,
});

const mit = (path: string, title: string, note: string): ResourceInput => ({
  title: `MIT 5.111SC Principles of Chemical Science (Fall 2014): ${title}`,
  url: `https://ocw.mit.edu/courses/5-111sc-principles-of-chemical-science-fall-2014/pages/${path}/`,
  type: 'lecture',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const nistConstants: ResourceInput = {
  title: 'NIST Reference on Constants, Units and Uncertainty',
  url: 'https://physics.nist.gov/cuu/Constants/index.html',
  type: 'documentation',
  cost: 'free',
  provider: 'NIST',
  note: 'The CODATA values of h, c, N_A, R and the Rydberg constant; since 2019 h, c, e, k and N_A are exact by definition.',
};

const nistWebBook = (note: string): ResourceInput => ({
  title: 'NIST Chemistry WebBook',
  url: 'https://webbook.nist.gov/chemistry/',
  type: 'dataset',
  cost: 'free',
  provider: 'NIST',
  note,
});

export default defineSubject({
  id: 'general-chemistry-1',
  title: 'General Chemistry I',
  category: 'chemistry',
  tagline:
    'Atoms, light and electrons, the periodic table, chemical bonds and molecular shape, stoichiometry, solutions, gases, thermochemistry and chemical equilibrium, taught with the reasoning behind every rule.',
  description: `Chemistry explains matter by what its atoms do: how electrons arrange themselves around a nucleus, why atoms bond the way they do, what shape the resulting molecules take, and how much of one substance turns into another. This first course builds that picture from measurement and the mole up through quantum atoms, bonding and molecular shape, then uses it quantitatively: reaction stoichiometry, solutions and titrations, gases, the energy of reactions and the balance a reaction settles into at equilibrium.

The course follows the topics of CHEM 102, General Chemistry I, at the University of Illinois Urbana-Champaign, whose catalog describes it as covering the principles governing atomic structure, bonding, states of matter, stoichiometry and chemical equilibrium (CHEM 103 is the separate laboratory course and is not covered here). The module list also follows a topic sheet the Illinois chemistry department has published for CHEM 102 proficiency exams. This is an original course built from those public descriptions; it is not affiliated with or endorsed by the University of Illinois.

Every rule comes with its reason: why significant figures propagate the way they do, why ionisation energy dips at oxygen, why lone pairs squeeze bond angles, why a gas law needs kelvin. Worked examples carry units through every step with dimensional analysis and round only at the end. Interactive diagrams let you fill orbitals, rotate VSEPR shapes, pick hydrogen transitions, colour the periodic table by a property, run a limiting-reagent calculation and push a piston. Each lesson ends with a short quiz built from the mistakes students actually make.

Algebra and scientific notation are all the mathematics you need (the Illinois course asks for college algebra, MATH 112, and a year of high-school chemistry; here the high-school chemistry is helpful but not assumed). Data come from named sources: IUPAC atomic weights, NIST constants and the appendix tables of the free OpenStax *Chemistry 2e* textbook, which is the main reading for the course.`,
  difficulty: 'beginner',
  estimatedHours: 88,
  prerequisites: [],
  recommendedBackground: [
    'High-school algebra: rearranging equations, ratios, exponents, scientific notation and logarithms (the Illinois course lists college algebra, MATH 112, as its prerequisite)',
    'A year of high-school chemistry helps but is not assumed',
    'Calculus is not needed; the calculus-1 course here is useful later but nothing in this course depends on it',
  ],
  tags: ['chemistry', 'stoichiometry', 'atomic structure', 'chemical bonding', 'gases', 'thermochemistry', 'equilibrium'],
  core: false,
  modules: [
    {
      slug: 'measurement-atoms-and-the-mole',
      title: 'Measurement, Atoms and the Mole',
      description:
        'The tools every later calculation uses: SI units and significant figures, dimensional analysis, the structure of atoms and isotopes, and the mole, which connects grams on a balance to numbers of atoms.',
      lessons: [
        {
          slug: 'measurement-and-significant-figures',
          title: 'Measurement, uncertainty and significant figures',
          summary:
            'Every measured number carries an uncertainty. Learn SI units and prefixes, how to count significant figures, and why multiplication and addition round differently.',
          estimatedMinutes: 100,
          objectives: [
            'Use SI base units, derived units and metric prefixes, and write numbers in scientific notation',
            'Count the significant figures in a measured value, including zeros, and recognise exact numbers',
            'Round the result of a multiplication or division to the fewest significant figures and of an addition or subtraction to the fewest decimal places',
            'Distinguish accuracy from precision and random from systematic error',
          ],
          concepts: [
            'SI base units (kg, m, s, mol, K)',
            'Metric prefixes from pico to giga',
            'Scientific notation',
            'Significant figures and the uncertain last digit',
            'Exact numbers: counted or defined',
            'Rounding rules for products and sums',
            'Accuracy versus precision',
            'Density as a derived quantity',
          ],
          explanation: `A measurement is a number, a unit and an uncertainty. If a balance reads $25.47\\ \\mathrm{g}$, the last digit is uncertain (perhaps $\\pm 0.01\\ \\mathrm{g}$) and every digit up to and including it is **significant**. The rules for counting follow from that idea. Non-zero digits count. Zeros between them count ($1.005$ has four). Leading zeros only place the decimal point, so $0.0250$ has three significant figures: the 2, the 5 and the final 0, which someone bothered to write. Trailing zeros in a number with no decimal point are ambiguous ($1500$), which is why chemists write $1.50 \\times 10^3$ for three significant figures. **Exact numbers**, such as 12 eggs or the defined $1\\ \\mathrm{in} = 2.54\\ \\mathrm{cm}$, have no uncertainty and never limit a result.

**Rounding a calculation.** For multiplication and division, the result has as many significant figures as the least precise factor, because the *relative* uncertainties combine. For addition and subtraction, the result is rounded to the fewest *decimal places*, because the *absolute* uncertainties combine. Keep every digit through the calculation and round once at the end.

**Worked example: density by displacement.** A metal sample of mass $25.47\\ \\mathrm{g}$ is dropped into a cylinder, and the water level rises from $21.5\\ \\mathrm{mL}$ to $24.7\\ \\mathrm{mL}$. The volume is $24.7 - 21.5 = 3.2\\ \\mathrm{mL}$: one decimal place, so only **two** significant figures survive the subtraction. Then

$$\\rho = \\frac{25.47\\ \\mathrm{g}}{3.2\\ \\mathrm{mL}} = 7.959\\ldots\\ \\mathrm{g\\,mL^{-1}} \\approx 8.0\\ \\mathrm{g\\,mL^{-1}}.$$

The four-figure mass is wasted on a two-figure volume. A better experiment would use a larger sample, not a better balance.

**Accuracy and precision.** Precision is how closely repeated measurements agree; accuracy is how close they are to the true value. A miscalibrated balance can give beautifully precise, consistently wrong readings: a **systematic error**, which averaging does not remove. Random errors scatter both ways and do shrink with averaging.

The SI base units you will use most are the kilogram, metre, second, kelvin and mole; litres ($1\\ \\mathrm{L} = 1\\ \\mathrm{dm^3} = 1000\\ \\mathrm{cm^3}$) and grams are everyday chemistry units. Read OpenStax 1.4 to 1.5, then do the exercises without a calculator's "round" button: decide the figures yourself.`,
          resources: [
            ostx('1-4-measurements', '1.4 Measurements', 'SI units, prefixes and derived units such as density.', true),
            ostx('1-5-measurement-uncertainty-accuracy-and-precision', '1.5 Measurement uncertainty, accuracy, and precision', 'Significant figures and rounding with worked examples; compare its rules with the reasons given above.'),
            {
              title: 'NIST Guide to the SI: units and prefixes',
              url: 'https://physics.nist.gov/cuu/Units/units.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NIST',
              note: 'The official list of base units, derived units and prefixes.',
            },
          ],
          exercises: [
            {
              slug: 'count-and-round',
              title: 'Count and round',
              prompt: `(a) How many significant figures are in $0.004020$, $6.0220 \\times 10^{23}$, $300.$ and $1.000\\ \\mathrm{L}$? (b) Evaluate and round correctly: $\\dfrac{9.81 \\times 0.0450}{2.1}$; $\\;143.2 + 0.0457 - 10$ where 10 is a measured value with no decimal point; $\\;(3.141 - 3.11) \\times 2.000$. (c) In the last one, explain in one sentence why a 4-figure factor still gives a 1-figure answer.`,
              kind: 'problem',
              difficulty: 1,
              hint: '0.004020 has 4 (leading zeros do not count, the final zero does). The first expression is 0.2102…, rounded to 0.21 (2 figures) because of 2.1. The second sum is limited by 10 (no decimal places): 133. In the third, 3.141 − 3.11 = 0.031 has only two decimal places and so 2 significant figures, giving 0.062.',
            },
            {
              slug: 'density-of-an-alloy',
              title: 'Identify a metal from its density',
              prompt: `A cylinder of metal is $2.54\\ \\mathrm{cm}$ in diameter and $5.08\\ \\mathrm{cm}$ long and has a mass of $229.4\\ \\mathrm{g}$. (a) Compute its volume in $\\mathrm{cm^3}$ and its density with the correct significant figures. (b) Using densities aluminium 2.70, iron 7.87, copper 8.96 and lead $11.3\\ \\mathrm{g\\,cm^{-3}}$, which metal is it most likely to be? (c) Which measurement limits the precision of your density, and by roughly how much would a $\\pm 0.01\\ \\mathrm{cm}$ error in the diameter change the answer?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'V = π(d/2)²L = π(1.27)²(5.08) = 25.7 cm³; density = 8.91 g/cm³, so copper. The volume depends on d², so a 0.4 % error in d becomes about 0.8 % in the density.',
            },
            {
              slug: 'accuracy-precision-data',
              title: 'Accuracy or precision?',
              prompt: `Three students each weigh a certified $10.000\\ \\mathrm{g}$ mass four times. A: 10.012, 10.011, 10.013, 10.012 g. B: 9.991, 10.010, 10.004, 9.996 g. C: 10.001, 9.999, 10.000, 10.001 g. For each, compute the mean and the range, say whether the results are accurate, precise, both or neither, and say what kind of error (random or systematic) dominates. Suggest one fix for student A.`,
              kind: 'data-analysis',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a sum round to the fewest decimal places while a product rounds to the fewest significant figures?',
              answerOutline: 'In a sum the absolute uncertainties add, so the least certain decimal place limits the result. In a product the relative (percentage) uncertainties add, so the factor with the fewest significant figures limits it.',
            },
            {
              question: 'Is the 2 in the formula for a circle\'s circumference, or the 1000 in 1 L = 1000 mL, a limit on significant figures? Why?',
              answerOutline: 'No. Both are exact (a pure number and a definition), so they have unlimited significant figures and never limit a result.',
            },
            {
              question: 'A set of readings is very precise but inaccurate. What does that suggest, and will averaging help?',
              answerOutline: 'A systematic error such as a miscalibrated instrument. Averaging reduces random scatter, not a systematic offset; calibration against a standard is needed.',
            },
          ],
          quiz: [
            {
              question: 'Evaluate $\\dfrac{4.184 \\times 12.0}{0.0250}$ and report it with the correct number of significant figures.',
              options: ['$2008.32$', '$2.008 \\times 10^{3}$', '$2.01 \\times 10^{3}$', '$2.0 \\times 10^{3}$'],
              answer: 2,
              explanation:
                'The unrounded value is $2008.32$. The factors have 4, 3 and 3 significant figures ($0.0250$: leading zeros do not count, the trailing zero does), so the answer gets 3: $2.01 \\times 10^3$. Two figures would wrongly treat $0.0250$ as having two.',
            },
            {
              question: 'Add the measured lengths $12.11\\ \\mathrm{cm} + 0.023\\ \\mathrm{cm} + 3.2\\ \\mathrm{cm}$.',
              options: ['$15.3\\ \\mathrm{cm}$', '$15.333\\ \\mathrm{cm}$', '$15\\ \\mathrm{cm}$', '$15.33\\ \\mathrm{cm}$'],
              answer: 0,
              explanation:
                'Addition keeps the fewest decimal places: $3.2$ has one, so $15.333 \\to 15.3\\ \\mathrm{cm}$. Rounding to 2 significant figures ($15$) applies the multiplication rule to a sum, which throws away a digit you do know.',
            },
            {
              question: 'A thermometer that reads $0.8\\ ^\\circ\\mathrm{C}$ too high is used five times on boiling water and gives $100.8, 100.7, 100.8, 100.9, 100.8\\ ^\\circ\\mathrm{C}$. These readings are best described as',
              options: ['accurate and precise', 'accurate but not precise', 'precise but not accurate, because of a systematic error', 'neither, because of random error'],
              answer: 2,
              explanation:
                'The readings agree within about $0.1\\ ^\\circ\\mathrm{C}$ (precise) but all sit about $0.8\\ ^\\circ\\mathrm{C}$ above the true value (inaccurate). A constant offset is a systematic error; averaging more readings would not remove it.',
            },
          ],
        },
        {
          slug: 'dimensional-analysis',
          title: 'Dimensional analysis and unit conversion',
          summary:
            'Convert any quantity by multiplying by factors equal to one, and let the units tell you whether the set-up is right. Includes density as a conversion factor and temperature scales.',
          estimatedMinutes: 90,
          objectives: [
            'Build a conversion factor from an equality and choose its orientation so units cancel',
            'Chain several conversion factors, including squared and cubed units',
            'Use density to convert between mass and volume',
            'Convert between Celsius, kelvin and Fahrenheit, and explain why these are not simple factors',
          ],
          concepts: [
            'Conversion factor as a ratio equal to one',
            'Unit cancellation',
            'Chained conversions',
            'Squared and cubed units',
            'Density as a mass-volume bridge',
            'Kelvin scale: K = °C + 273.15',
            'Defined versus measured equalities',
          ],
          explanation: `**Dimensional analysis** (the factor-label method) rests on one idea: an equality such as $1\\ \\mathrm{in} = 2.54\\ \\mathrm{cm}$ can be written as a fraction equal to one, $\\frac{2.54\\ \\mathrm{cm}}{1\\ \\mathrm{in}}$ or $\\frac{1\\ \\mathrm{in}}{2.54\\ \\mathrm{cm}}$. Multiplying by one changes the units but not the quantity. You choose the orientation that cancels the unit you have and leaves the unit you want. If the units come out wrong, the set-up is wrong, which makes this a built-in check.

**Worked example: a chain.** Convert $65\\ \\mathrm{mi\\,h^{-1}}$ to $\\mathrm{m\\,s^{-1}}$ ($1\\ \\mathrm{mi} = 1609.344\\ \\mathrm{m}$ exactly):

$$65\\ \\frac{\\mathrm{mi}}{\\mathrm{h}} \\times \\frac{1609.344\\ \\mathrm{m}}{1\\ \\mathrm{mi}} \\times \\frac{1\\ \\mathrm{h}}{3600\\ \\mathrm{s}} = 29.06\\ldots\\ \\mathrm{m\\,s^{-1}} \\approx 29\\ \\mathrm{m\\,s^{-1}}.$$

Miles cancel, hours cancel, and the answer has two significant figures because 65 has two; the defined factors are exact.

**Powers of units.** A factor must be raised to the same power as the unit. Since $1\\ \\mathrm{m} = 100\\ \\mathrm{cm}$, $1\\ \\mathrm{m^3} = (100\\ \\mathrm{cm})^3 = 10^6\\ \\mathrm{cm^3}$, not $100\\ \\mathrm{cm^3}$. Forgetting to cube is the commonest error in volume problems.

**Density as a conversion factor.** Density links mass and volume. What is the mass of $2.00\\ \\mathrm{L}$ of ethanol, density $0.789\\ \\mathrm{g\\,mL^{-1}}$?

$$2.00\\ \\mathrm{L} \\times \\frac{1000\\ \\mathrm{mL}}{1\\ \\mathrm{L}} \\times \\frac{0.789\\ \\mathrm{g}}{1\\ \\mathrm{mL}} = 1578\\ \\mathrm{g} \\approx 1.58 \\times 10^3\\ \\mathrm{g} = 1.58\\ \\mathrm{kg}.$$

**Temperature is different.** Celsius and kelvin have the same size of degree but different zeros, so you add rather than multiply: $T(\\mathrm{K}) = t(^\\circ\\mathrm{C}) + 273.15$. Fahrenheit has both a different zero and a different size: $t_\\mathrm{F} = \\tfrac{9}{5}t_\\mathrm{C} + 32$. A *difference* of temperatures converts with the factor alone (a change of $10\\ ^\\circ\\mathrm{C}$ is a change of $10\\ \\mathrm{K}$ and of $18\\ ^\\circ\\mathrm{F}$). Gas laws and thermodynamics need kelvin, because only the kelvin scale starts at zero energy of motion.

Work through OpenStax 1.6, writing every unit on paper. Dimensional analysis will carry you through the stoichiometry, gas and thermochemistry problems later in this course.`,
          resources: [
            ostx('1-6-mathematical-treatment-of-measurement-results', '1.6 Mathematical treatment of measurement results', 'Conversion factors, dimensional analysis and temperature conversions with worked examples.', true),
            ostx('1-4-measurements', '1.4 Measurements', 'Revisit the table of prefixes when building factors.'),
            mit('unit-i-the-atom/lecture-1', 'Lecture 1, The importance of chemical principles', 'Optional: the opening lecture of MIT\'s first-year chemistry course, for motivation and a sense of where the course goes.'),
          ],
          exercises: [
            {
              slug: 'conversion-chains',
              title: 'Conversion chains',
              prompt: `Convert, showing every factor: (a) $0.0750\\ \\mathrm{km}$ to mm; (b) $3.5\\ \\mathrm{g\\,cm^{-3}}$ to $\\mathrm{kg\\,m^{-3}}$; (c) a flow of $2.5\\ \\mathrm{L\\,min^{-1}}$ to $\\mathrm{mL\\,s^{-1}}$; (d) the area of a $8.5\\ \\mathrm{in} \\times 11.0\\ \\mathrm{in}$ sheet in $\\mathrm{cm^2}$. Give each answer with the right significant figures.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 7.50 × 10⁴ mm. (b) Multiply by 1 kg/1000 g and by (100 cm/1 m)³ = 10⁶: 3.5 × 10³ kg/m³. (c) 42 mL/s. (d) 93.5 in² × (2.54 cm/in)² = 603 cm², rounded to 2 figures because of 8.5: 6.0 × 10² cm².',
            },
            {
              slug: 'mercury-and-the-flask',
              title: 'How much mercury fills a flask?',
              prompt: `A flask holds $250.0\\ \\mathrm{mL}$ of water at $25\\ ^\\circ\\mathrm{C}$. (a) What mass of mercury (density $13.53\\ \\mathrm{g\\,mL^{-1}}$) would fill it? (b) A technician says the flask holds "about 3.4 kg of mercury, or 7.5 pounds". Check the pound figure ($1\\ \\mathrm{lb} = 453.59237\\ \\mathrm{g}$ exactly). (c) Explain why the flask's capacity is stated at a temperature.`,
              kind: 'problem',
              difficulty: 2,
              hint: '250.0 mL × 13.53 g/mL = 3.383 × 10³ g = 3.383 kg; that is 7.457 lb. Glass and liquids expand when heated, so volumes depend on temperature.',
            },
            {
              slug: 'temperature-conversions',
              title: 'Temperature scales',
              prompt: `(a) Liquid nitrogen boils at $77.4\\ \\mathrm{K}$. Give this in °C and °F. (b) At what single temperature do the Celsius and Fahrenheit scales read the same number? (c) A reaction mixture warms from $18.5\\ ^\\circ\\mathrm{C}$ to $26.0\\ ^\\circ\\mathrm{C}$. State the temperature change in K and in °F, and explain why the 273.15 does not appear.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) −195.8 °C and −320.4 °F. (b) Solve t = 9t/5 + 32: t = −40. (c) ΔT = 7.5 K = 13.5 °F; differences cancel the offset.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you decide which way up to write a conversion factor?',
              answerOutline: 'Put the unit you want to cancel in the denominator (if it is in the numerator of what you have) so that it cancels, leaving the unit you want.',
            },
            {
              question: 'Why is 1 m³ equal to 10⁶ cm³ and not 100 cm³?',
              answerOutline: 'A cube 1 m on a side is 100 cm on each of three sides, so its volume is 100 × 100 × 100 cm³; the factor must be cubed along with the unit.',
            },
            {
              question: 'Why can you not convert 20 °C to kelvin by multiplying by a factor?',
              answerOutline: 'The scales have different zero points; converting needs an added offset (273.15), not just a ratio. Only temperature differences convert by a factor.',
            },
          ],
          quiz: [
            {
              question: 'A sample of cooking oil has a density of $0.918\\ \\mathrm{g\\,mL^{-1}}$. What volume does $250.\\ \\mathrm{g}$ of it occupy?',
              options: ['$230.\\ \\mathrm{mL}$', '$272\\ \\mathrm{mL}$', '$0.272\\ \\mathrm{mL}$', '$3.67 \\times 10^{-3}\\ \\mathrm{mL}$'],
              answer: 1,
              explanation:
                '$250.\\ \\mathrm{g} \\times \\dfrac{1\\ \\mathrm{mL}}{0.918\\ \\mathrm{g}} = 272\\ \\mathrm{mL}$. Multiplying by the density instead ($230.$) leaves units of $\\mathrm{g^2\\,mL^{-1}}$: the units show the factor is upside down. Oil is less dense than water, so the volume must exceed 250 mL.',
            },
            {
              question: 'A rectangular tank is $40.0\\ \\mathrm{cm} \\times 25.0\\ \\mathrm{cm} \\times 30.0\\ \\mathrm{cm}$. What is its volume in $\\mathrm{m^3}$?',
              options: ['$3.00\\ \\mathrm{m^3}$', '$300.\\ \\mathrm{m^3}$', '$3.00 \\times 10^{-4}\\ \\mathrm{m^3}$', '$3.00 \\times 10^{-2}\\ \\mathrm{m^3}$'],
              answer: 3,
              explanation:
                'The volume is $3.00 \\times 10^4\\ \\mathrm{cm^3}$. Since $1\\ \\mathrm{m^3} = 10^6\\ \\mathrm{cm^3}$, that is $3.00 \\times 10^{-2}\\ \\mathrm{m^3}$ (30.0 L). Dividing by 100 instead of $10^6$ gives $300.\\ \\mathrm{m^3}$, the error of not cubing the factor.',
            },
            {
              question: 'A gas is warmed from $20\\ ^\\circ\\mathrm{C}$ to $40\\ ^\\circ\\mathrm{C}$. By what factor does its absolute temperature increase?',
              options: ['2.00', '1.07', '1.50', '0.50'],
              answer: 1,
              explanation:
                'Absolute temperatures are $293.15\\ \\mathrm{K}$ and $313.15\\ \\mathrm{K}$, a ratio of $1.07$. The tempting answer 2.00 takes the ratio of Celsius readings, which is meaningless because $0\\ ^\\circ\\mathrm{C}$ is not zero temperature.',
            },
          ],
        },
        {
          slug: 'atoms-isotopes-and-atomic-mass',
          title: 'Atoms, isotopes and atomic mass',
          summary:
            'The nuclear atom: protons, neutrons and electrons, atomic number and mass number, ions, isotopes, and why the atomic mass on the periodic table is a weighted average.',
          estimatedMinutes: 100,
          objectives: [
            'Describe the nuclear model of the atom and the evidence for it',
            'Find the numbers of protons, neutrons and electrons from a nuclear symbol such as ³⁷Cl⁻',
            'Define the atomic mass unit from carbon-12',
            'Compute an average atomic mass from isotopic masses and abundances, and work backwards to an abundance',
            'Read a simple mass spectrum',
          ],
          concepts: [
            'Proton, neutron, electron',
            'Atomic number Z and mass number A',
            'Nuclear symbol and ion charge',
            'Isotopes',
            'Atomic mass unit: 1/12 the mass of carbon-12',
            'Weighted average atomic mass',
            'Mass spectrometry',
            'Rutherford gold-foil experiment',
          ],
          explanation: `Rutherford's gold-foil experiment (1909 to 1911) showed that almost all of an atom's mass and all of its positive charge sit in a tiny **nucleus**, about $10^{-15}\\ \\mathrm{m}$ across, inside an atom about $10^{-10}\\ \\mathrm{m}$ across. Most alpha particles passed straight through the foil; a few bounced almost straight back, which only a small, dense, charged centre could do. The nucleus holds **protons** (charge $+1$, mass about $1.007\\ \\mathrm{u}$) and **neutrons** (no charge, about $1.009\\ \\mathrm{u}$). **Electrons** (charge $-1$, about $1/1836$ of a proton's mass) occupy the space around it and do all of chemistry.

**Counting particles.** The **atomic number** $Z$ is the number of protons, and it defines the element. The **mass number** $A$ counts protons plus neutrons. In the symbol $^{37}_{17}\\mathrm{Cl^-}$, $Z = 17$ protons, $37 - 17 = 20$ neutrons, and the $-1$ charge means one extra electron: 18 electrons. **Isotopes** are atoms of the same element with different numbers of neutrons. Their chemistry is almost identical, because chemistry depends on electrons, but their masses differ.

**The atomic mass unit** is defined as exactly $1/12$ of the mass of one carbon-12 atom, so $^{12}\\mathrm{C}$ has a mass of exactly $12\\ \\mathrm{u}$. Other isotopic masses are measured relative to it with a **mass spectrometer**, which ionises atoms, accelerates them and separates them by mass-to-charge ratio. The peak heights give the relative abundances.

**Average atomic mass.** The mass printed on the periodic table is the abundance-weighted average over the naturally occurring isotopes. Chlorine is 75.76 % $^{35}\\mathrm{Cl}$ ($34.96885\\ \\mathrm{u}$) and 24.24 % $^{37}\\mathrm{Cl}$ ($36.96590\\ \\mathrm{u}$):

$$\\bar m = 0.7576(34.96885) + 0.2424(36.96590) = 35.45\\ \\mathrm{u}.$$

No single chlorine atom has a mass of $35.45\\ \\mathrm{u}$; it is the mean of a population. To work backwards from an average to abundances, let $x$ be the fraction of one isotope and $1 - x$ the other, and solve the linear equation.

A common slip is to average the mass *numbers* (35 and 37) instead of the measured isotopic masses; another is to forget that percentages must be divided by 100. Note also that atomic masses are not whole numbers even for single isotopes (other than carbon-12), because nuclear binding energy changes mass slightly.

Read OpenStax 2.2 and 2.3, then build atoms and isotopes in the PhET simulations before the exercises.`,
          resources: [
            ostx('2-2-evolution-of-atomic-theory', '2.2 Evolution of atomic theory', 'Thomson, Millikan and Rutherford: the experiments behind the nuclear atom.'),
            ostx('2-3-atomic-structure-and-symbolism', '2.3 Atomic structure and symbolism', 'Nuclear symbols, isotopes, the atomic mass unit and average atomic mass, with mass spectra.', true),
            phet('isotopes-and-atomic-mass', 'Isotopes and Atomic Mass', 'Build isotope mixtures and watch the average mass change; check the chlorine calculation.'),
            phet('rutherford-scattering', 'Rutherford Scattering', 'Fire alpha particles at a nucleus and at a "plum pudding" atom and compare the deflections.'),
          ],
          exercises: [
            {
              slug: 'particle-counts',
              title: 'Particle counts',
              prompt: `Give the numbers of protons, neutrons and electrons in: $^{56}\\mathrm{Fe^{3+}}$, $^{18}\\mathrm{O^{2-}}$, $^{238}\\mathrm{U}$, $^{2}\\mathrm{H^+}$. Then write the nuclear symbol of the species with 35 protons, 46 neutrons and 36 electrons.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Fe has Z = 26: 26 p, 30 n, 23 e. The last species is ⁸¹Br⁻.',
            },
            {
              slug: 'magnesium-average',
              title: 'Magnesium from its isotopes',
              prompt: `Natural magnesium is 78.99 % $^{24}\\mathrm{Mg}$ ($23.98504\\ \\mathrm{u}$), 10.00 % $^{25}\\mathrm{Mg}$ ($24.98584\\ \\mathrm{u}$) and 11.01 % $^{26}\\mathrm{Mg}$ ($25.98259\\ \\mathrm{u}$). (a) Compute the average atomic mass and compare with the periodic table value $24.305$. (b) Sketch the mass spectrum you would expect. (c) Why might a sample of magnesium from a meteorite give a slightly different value?`,
              kind: 'problem',
              difficulty: 2,
              hint: '0.7899(23.98504) + 0.1000(24.98584) + 0.1101(25.98259) = 24.31 u. Isotopic ratios vary slightly with the source (processes in stars, chemistry, decay), which is why IUPAC gives ranges for some elements.',
            },
            {
              slug: 'gallium-abundance',
              title: 'Working backwards to abundance',
              prompt: `Gallium has two stable isotopes, $^{69}\\mathrm{Ga}$ ($68.9256\\ \\mathrm{u}$) and $^{71}\\mathrm{Ga}$ ($70.9247\\ \\mathrm{u}$), and an average atomic mass of $69.723\\ \\mathrm{u}$. Find the percentage of each isotope. Then explain why a student who averaged 69 and 71 would conclude, wrongly, that the two isotopes are about equally abundant.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'x(68.9256) + (1 − x)(70.9247) = 69.723 gives x = 0.601: 60.1 % ⁶⁹Ga and 39.9 % ⁷¹Ga.',
            },
          ],
          selfAssessment: [
            {
              question: 'What did the gold-foil experiment show, and which observation was decisive?',
              answerOutline: 'That the positive charge and nearly all the mass sit in a tiny nucleus. The decisive observation was the rare large-angle (back) scattering, impossible for diffuse positive charge.',
            },
            {
              question: 'Why do isotopes of an element have the same chemistry?',
              answerOutline: 'They have the same number of protons and therefore the same number and arrangement of electrons, and chemistry is governed by electrons; only mass (and nuclear properties) differ.',
            },
            {
              question: 'Why is the periodic-table mass of chlorine 35.45 even though no chlorine atom has that mass?',
              answerOutline: 'It is the abundance-weighted average of ³⁵Cl and ³⁷Cl in natural samples; any bulk sample contains both in that proportion.',
            },
          ],
          quiz: [
            {
              question: 'Boron is 19.9 % $^{10}\\mathrm{B}$ ($10.0129\\ \\mathrm{u}$) and 80.1 % $^{11}\\mathrm{B}$ ($11.0093\\ \\mathrm{u}$). What is its average atomic mass?',
              options: ['$10.81\\ \\mathrm{u}$', '$10.51\\ \\mathrm{u}$', '$10.20\\ \\mathrm{u}$', '$10.50\\ \\mathrm{u}$'],
              answer: 0,
              explanation:
                '$0.199(10.0129) + 0.801(11.0093) = 1.993 + 8.818 = 10.81\\ \\mathrm{u}$. The simple mean of the two masses ($10.51$) ignores the abundances, and $10.20$ swaps them; the average must lie closer to the more abundant isotope, $^{11}\\mathrm{B}$.',
            },
            {
              question: 'How many protons, neutrons and electrons are in $^{80}\\mathrm{Se^{2-}}$ (selenium, $Z = 34$)?',
              options: ['34 p, 46 n, 32 e', '34 p, 46 n, 36 e', '36 p, 44 n, 36 e', '34 p, 80 n, 36 e'],
              answer: 1,
              explanation:
                '$Z = 34$ protons; $80 - 34 = 46$ neutrons; a $2-$ charge means two *extra* electrons, $34 + 2 = 36$. Subtracting the charge (32 e) treats the ion as a cation.',
            },
            {
              question: 'Two atoms have the same mass number but different atomic numbers. Which statement is true?',
              options: ['They are isotopes of the same element', 'They have the same chemistry', 'They are different elements with different numbers of neutrons', 'They must have the same number of neutrons'],
              answer: 2,
              explanation:
                'Different $Z$ means different elements (for example $^{14}\\mathrm{C}$ and $^{14}\\mathrm{N}$). With the same $A$ but different $Z$, the neutron counts $A - Z$ must differ. Isotopes are the opposite case: same $Z$, different $A$.',
            },
          ],
        },
        {
          slug: 'the-mole-and-molar-mass',
          title: 'The mole and molar mass',
          summary:
            'The mole counts particles in batches of Avogadro\'s number, and molar mass converts grams to moles. This is the bridge from the balance to the chemical equation.',
          estimatedMinutes: 105,
          objectives: [
            'State the SI definition of the mole and the value of the Avogadro constant',
            'Compute the molar mass of a compound from its formula',
            'Convert between mass, amount in moles, and number of particles, including atoms within a compound',
            'Explain why chemists count in moles rather than grams',
          ],
          concepts: [
            'Mole: 6.02214076 × 10²³ entities, exactly',
            'Avogadro constant N_A',
            'Molar mass in g/mol',
            'Formula mass and molecular mass',
            'Mass to moles to particles',
            'Atoms within a formula unit',
            'Numerical match between u and g/mol',
          ],
          explanation: `Atoms are far too small to count one by one, so chemists count them in batches. Since 2019 the **mole** has been defined as exactly $6.02214076 \\times 10^{23}$ entities (atoms, molecules, ions or formula units). That number, with units $\\mathrm{mol^{-1}}$, is the **Avogadro constant** $N_\\mathrm{A}$. Worked examples here use $6.022 \\times 10^{23}\\ \\mathrm{mol^{-1}}$.

The number was chosen so that the mass of one mole in grams equals the mass of one particle in atomic mass units. One carbon-12 atom is $12\\ \\mathrm{u}$; one mole of them is (to within a part in $10^9$) $12\\ \\mathrm{g}$. So the **molar mass** $M$ of an element in $\\mathrm{g\\,mol^{-1}}$ is just its periodic-table atomic mass, and the molar mass of a compound is the sum over its formula. For water, $M = 2(1.008) + 16.00 = 18.02\\ \\mathrm{g\\,mol^{-1}}$. This course uses IUPAC standard atomic weights rounded to four significant figures.

**Why count in moles?** Equations count particles: $2\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\mathrm{H_2O}$ says two *molecules* of hydrogen per molecule of oxygen. Equal masses of hydrogen and oxygen contain very different numbers of molecules (oxygen molecules are 16 times heavier), so grams cannot be compared directly. Moles can.

**The conversion map.** Mass and moles are linked by $M$; moles and particles by $N_\\mathrm{A}$:

$$\\text{grams} \\xrightarrow{\\ \\div M\\ } \\text{moles} \\xrightarrow{\\ \\times N_\\mathrm{A}\\ } \\text{particles}.$$

**Worked example.** How many molecules, and how many hydrogen atoms, are in $10.0\\ \\mathrm{g}$ of water?

$$10.0\\ \\mathrm{g} \\times \\frac{1\\ \\mathrm{mol}}{18.02\\ \\mathrm{g}} = 0.5549\\ \\mathrm{mol}, \\qquad 0.5549\\ \\mathrm{mol} \\times \\frac{6.022 \\times 10^{23}}{1\\ \\mathrm{mol}} = 3.34 \\times 10^{23}\\ \\text{molecules}.$$

Each molecule has two H atoms, so there are $6.69 \\times 10^{23}$ H atoms (doubling the unrounded value). The subscript is a conversion factor too: $\\frac{2\\ \\text{H atoms}}{1\\ \\mathrm{H_2O\\ molecule}}$.

**Pitfalls.** Multiplying grams directly by $N_\\mathrm{A}$ skips the molar mass and gives an answer too large by a factor of $M$. Using the atomic mass of O ($16.00$) for oxygen gas, $\\mathrm{O_2}$ ($32.00$), is another classic. For ionic compounds such as NaCl there are no molecules; the formula describes a **formula unit**, and the same arithmetic applies.

Read OpenStax 3.1. A sanity check worth building into every answer: a mole of a typical substance is tens to hundreds of grams, and any visible sample contains around $10^{21}$ to $10^{25}$ particles.`,
          resources: [
            ostx('3-1-formula-mass-and-the-mole-concept', '3.1 Formula mass and the mole concept', 'Formula mass, the mole, molar mass and the conversions, with many worked examples.', true),
            {
              title: 'CIAAW: Standard atomic weights',
              url: 'https://www.ciaaw.org/atomic-weights.htm',
              type: 'dataset',
              cost: 'free',
              provider: 'IUPAC Commission on Isotopic Abundances and Atomic Weights',
              note: 'The authoritative source of the atomic weights behind every molar mass; note the intervals given for elements such as H, C and O.',
            },
            nistConstants,
          ],
          exercises: [
            {
              slug: 'molar-mass-drill',
              title: 'Molar masses',
              prompt: `Compute the molar mass of: $\\mathrm{CO_2}$, $\\mathrm{Ca(OH)_2}$, $\\mathrm{Al_2(SO_4)_3}$, glucose $\\mathrm{C_6H_{12}O_6}$ and copper(II) sulfate pentahydrate $\\mathrm{CuSO_4 \\cdot 5H_2O}$. Use H 1.008, C 12.01, O 16.00, Al 26.98, S 32.06, Ca 40.08, Cu 63.55.`,
              kind: 'problem',
              difficulty: 1,
              hint: '44.01, 74.10, 342.1, 180.2 and 249.7 g/mol. For the hydrate, add five whole water molecules (5 × 18.02).',
            },
            {
              slug: 'mole-conversions',
              title: 'Grams, moles and particles',
              prompt: `(a) How many moles and how many molecules are in $1.00\\ \\mathrm{kg}$ of sucrose, $\\mathrm{C_{12}H_{22}O_{11}}$ ($342.3\\ \\mathrm{g\\,mol^{-1}}$)? (b) What is the mass of $2.50 \\times 10^{22}$ atoms of gold ($196.97\\ \\mathrm{g\\,mol^{-1}}$)? (c) How many oxygen atoms are in $15.0\\ \\mathrm{g}$ of $\\mathrm{Al_2(SO_4)_3}$? Show the conversion map for each.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2.921 mol, 1.76 × 10²⁴ molecules. (b) 4.151 × 10⁻² mol, 8.18 g. (c) 0.04384 mol × 12 O per formula unit × N_A = 3.17 × 10²³ O atoms.',
            },
            {
              slug: 'how-big-is-a-mole',
              title: 'How big is a mole?',
              prompt: `Estimate, with one line of dimensional analysis each: (a) the volume of one mole of water molecules (density $1.00\\ \\mathrm{g\\,mL^{-1}}$); (b) the volume of one mole of sand grains, each about $1\\ \\mathrm{mm^3}$, compared with the volume of the Earth ($1.08 \\times 10^{21}\\ \\mathrm{m^3}$); (c) the volume occupied by one water molecule, and from it a rough molecular size. In two sentences, say what this tells you about why atoms must be counted in moles.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 18.0 mL. (b) 6.0 × 10²³ mm³ = 6.0 × 10¹⁴ m³, about 10⁻⁶ of the Earth. (c) 18.0 cm³/6.022 × 10²³ ≈ 3.0 × 10⁻²³ cm³, a cube about 0.31 nm on a side.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the molar mass of an element in g/mol equal its atomic mass in u?',
              answerOutline: 'The mole is (by design) the number of u in one gram: N_A × 1 u ≈ 1 g. So N_A atoms of mass m u have mass m g.',
            },
            {
              question: 'Why can you not compare 10 g of H₂ with 10 g of O₂ directly when applying 2H₂ + O₂ → 2H₂O?',
              answerOutline: 'Equations count particles. Equal masses contain different numbers of molecules (10/2.016 = 4.96 mol of H₂ versus 10/32.00 = 0.313 mol of O₂), so convert to moles first.',
            },
            {
              question: 'What two conversion factors take you from grams of a compound to the number of atoms of one element in it?',
              answerOutline: 'Divide by the molar mass to get moles of compound, multiply by N_A for formula units, and multiply by the subscript (atoms of the element per formula unit).',
            },
          ],
          quiz: [
            {
              question: 'How many oxygen atoms are in $5.00\\ \\mathrm{g}$ of calcium carbonate, $\\mathrm{CaCO_3}$ ($100.09\\ \\mathrm{g\\,mol^{-1}}$)?',
              options: ['$3.01 \\times 10^{22}$', '$3.01 \\times 10^{24}$', '$1.50 \\times 10^{23}$', '$9.03 \\times 10^{22}$'],
              answer: 3,
              explanation:
                '$5.00/100.09 = 0.04996\\ \\mathrm{mol}$ of $\\mathrm{CaCO_3}$, which is $3.008 \\times 10^{22}$ formula units, each with 3 O atoms: $9.03 \\times 10^{22}$. Stopping at the formula units ($3.01 \\times 10^{22}$) forgets the subscript; $5.00 \\times N_\\mathrm{A}$ skips the molar mass.',
            },
            {
              question: 'Which sample contains the most molecules?',
              options: ['$10.0\\ \\mathrm{g}$ of $\\mathrm{O_2}$', '$10.0\\ \\mathrm{g}$ of $\\mathrm{CH_4}$', '$10.0\\ \\mathrm{g}$ of $\\mathrm{CO_2}$', '$10.0\\ \\mathrm{g}$ of $\\mathrm{H_2O}$'],
              answer: 1,
              explanation:
                'For equal masses, the smallest molar mass gives the most moles: $\\mathrm{CH_4}$ ($16.04$) beats $\\mathrm{H_2O}$ ($18.02$), $\\mathrm{O_2}$ ($32.00$) and $\\mathrm{CO_2}$ ($44.01$). $10.0/16.04 = 0.623\\ \\mathrm{mol}$ of methane against $0.555\\ \\mathrm{mol}$ of water.',
            },
            {
              question: 'A chemist needs $0.250\\ \\mathrm{mol}$ of oxygen gas. What mass should she use?',
              options: ['$4.00\\ \\mathrm{g}$', '$8.00\\ \\mathrm{g}$', '$128\\ \\mathrm{g}$', '$0.00781\\ \\mathrm{g}$'],
              answer: 1,
              explanation:
                'Oxygen gas is $\\mathrm{O_2}$, $M = 32.00\\ \\mathrm{g\\,mol^{-1}}$, so $0.250 \\times 32.00 = 8.00\\ \\mathrm{g}$. Using the atomic mass $16.00$ gives $4.00\\ \\mathrm{g}$, half the oxygen needed. Dividing ($0.250/32.00$) inverts the factor.',
            },
          ],
        },
      ],
      project: {
        slug: 'measure-a-mole',
        title: 'Measure a mole at home',
        description: `Use kitchen measurements to make the mole tangible and to practise uncertainty. With a kitchen scale (and a stack of identical items to beat its resolution if necessary), measure the mass of a known number of each of: table salt (NaCl) as a teaspoon of known mass, sugar (sucrose), water, and aluminium foil of measured area and stated thickness. For each, compute the number of moles and the number of formula units or atoms, with an uncertainty estimate from the scale's resolution. For the foil, compare the mass you weigh with the mass predicted from area × thickness × density ($2.70\\ \\mathrm{g\\,cm^{-3}}$), and use the difference to discuss which measurement limits the result.`,
        deliverables: [
          'A data table with every raw measurement, its unit and its uncertainty',
          'Calculations of moles and particle counts with correct significant figures',
          'A one-page discussion: which measurement limits each result, and one systematic error you suspect',
        ],
        estimatedHours: 3,
        stretchGoals: ['Estimate the thickness of the foil from its mass, area and density, and compare with the value on the box'],
      },
    },
    {
      slug: 'light-and-the-quantum-atom',
      title: 'Light and the Quantum Atom',
      description:
        'What light is, why it comes in photons, how the line spectrum of hydrogen revealed quantised energy levels, and how wave mechanics replaced orbits with orbitals described by four quantum numbers.',
      lessons: [
        {
          slug: 'light-and-photons',
          title: 'Electromagnetic radiation and photons',
          summary:
            'Light is a wave with wavelength and frequency linked by c = λν, and it delivers energy in photons of E = hν. The photoelectric effect shows why the photon picture is needed.',
          estimatedMinutes: 100,
          objectives: [
            'Relate wavelength, frequency and the speed of light, and place radiation on the electromagnetic spectrum',
            'Compute the energy of a photon and of a mole of photons from its wavelength or frequency',
            'Explain the photoelectric effect and why intensity cannot make up for frequency',
            'Use the work function to find the threshold frequency and the kinetic energy of ejected electrons',
          ],
          concepts: [
            'Wavelength λ, frequency ν, amplitude',
            'c = λν',
            'Electromagnetic spectrum',
            'Photon energy E = hν = hc/λ',
            'Planck constant h',
            'Photoelectric effect and work function',
            'Threshold frequency',
            'Energy per mole of photons',
          ],
          explanation: `Light is an electromagnetic wave: oscillating electric and magnetic fields travelling at $c = 2.998 \\times 10^8\\ \\mathrm{m\\,s^{-1}}$ in vacuum. Its **wavelength** $\\lambda$ (crest to crest) and **frequency** $\\nu$ (cycles per second, hertz) are linked by

$$c = \\lambda\\nu.$$

Long wavelength means low frequency. The electromagnetic spectrum runs from radio waves (metres) through microwaves, infrared, the narrow visible band (about 380 to 750 nm, violet to red), ultraviolet and X-rays to gamma rays.

**Photons.** Around 1900 several experiments refused to fit a pure wave picture. The clearest is the **photoelectric effect**: light shining on a clean metal ejects electrons, but only if its frequency exceeds a threshold that depends on the metal. Bright red light ejects nothing from sodium; dim violet light ejects electrons immediately. Einstein's explanation (1905) was that light delivers energy in packets, **photons**, each of energy

$$E = h\\nu = \\frac{hc}{\\lambda}, \\qquad h = 6.626 \\times 10^{-34}\\ \\mathrm{J\\,s}.$$

One electron absorbs one photon. If $h\\nu$ is less than the **work function** $\\Phi$ (the energy binding the electron to the metal), no electron escapes, however many photons arrive. Above threshold, the extra energy becomes kinetic energy: $E_\\mathrm{k} = h\\nu - \\Phi$. Intensity sets the *number* of photons, and so the number of electrons, not their energy.

**Worked example.** A green laser pointer emits at $532\\ \\mathrm{nm}$. Then $\\nu = c/\\lambda = (2.998 \\times 10^8)/(532 \\times 10^{-9}) = 5.64 \\times 10^{14}\\ \\mathrm{Hz}$ and

$$E = h\\nu = (6.626 \\times 10^{-34})(5.635 \\times 10^{14}) = 3.73 \\times 10^{-19}\\ \\mathrm{J}\\ \\text{per photon}.$$

Chemists think per mole: $3.734 \\times 10^{-19}\\ \\mathrm{J} \\times 6.022 \\times 10^{23}\\ \\mathrm{mol^{-1}} = 2.25 \\times 10^5\\ \\mathrm{J\\,mol^{-1}} = 225\\ \\mathrm{kJ\\,mol^{-1}}$. That is comparable to the energy of a chemical bond (a C–C bond is about $345\\ \\mathrm{kJ\\,mol^{-1}}$), which is why ultraviolet light, with more energy per photon, can break bonds and damage skin while radio waves cannot.

**Pitfalls.** Convert nanometres to metres ($10^{-9}$) before using $c$ or $h$. Remember that energy rises with frequency and falls with wavelength. And keep "per photon" and "per mole" distinct: the factor between them is $N_\\mathrm{A}$.

Light is not "really" a particle any more than "really" a wave: it propagates and interferes like a wave and exchanges energy in whole photons. The physics course here treats the photoelectric effect in depth; for chemistry, what matters is that atoms absorb and emit light one photon at a time.`,
          resources: [
            ostx('6-1-electromagnetic-energy', '6.1 Electromagnetic energy', 'Waves, the spectrum, blackbody radiation and the photoelectric effect, with worked photon-energy examples.', true),
            phet('photoelectric', 'Photoelectric Effect', 'Vary wavelength and intensity separately for several metals and record when electrons appear and how fast they move.'),
            mit('unit-i-the-atom/lecture-3-wave-particle-duality-of-light', 'Lecture 3, Wave-particle duality of light', 'A lecture on the photoelectric effect from a first-year chemistry course; watch for the worked work-function problem.'),
          ],
          exercises: [
            {
              slug: 'photon-energies',
              title: 'Photon energies across the spectrum',
              prompt: `For each source compute the frequency, the energy per photon and the energy per mole of photons: (a) an FM radio station at $98.7\\ \\mathrm{MHz}$ (also give its wavelength); (b) a microwave oven at $12.2\\ \\mathrm{cm}$; (c) a red laser at $650\\ \\mathrm{nm}$; (d) a UV-C germicidal lamp at $254\\ \\mathrm{nm}$. Compare each energy per mole with a typical bond energy of about $400\\ \\mathrm{kJ\\,mol^{-1}}$ and say which could break bonds directly.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) λ = 3.04 m. (b) E = hc/λ = 1.63 × 10⁻²⁴ J per photon, 0.98 J/mol. (c) 3.06 × 10⁻¹⁹ J, 184 kJ/mol. (d) 7.82 × 10⁻¹⁹ J, 471 kJ/mol: only the UV photons exceed a typical bond energy.',
            },
            {
              slug: 'photoelectric-numbers',
              title: 'Photoelectric effect with numbers',
              prompt: `The work function of a metal is $3.60 \\times 10^{-19}\\ \\mathrm{J}$. (a) Find the threshold frequency and wavelength. (b) Light of $400.\\ \\mathrm{nm}$ shines on it: find the kinetic energy and speed of the ejected electrons ($m_e = 9.109 \\times 10^{-31}\\ \\mathrm{kg}$). (c) The intensity of the $400\\ \\mathrm{nm}$ light is doubled. What changes and what does not? (d) Light of $600\\ \\mathrm{nm}$ at ten times the intensity is used instead. What happens?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) ν₀ = Φ/h = 5.43 × 10¹⁴ Hz, λ₀ = 552 nm. (b) E_photon = 4.97 × 10⁻¹⁹ J, so E_k = 1.37 × 10⁻¹⁹ J and v = √(2E_k/m) = 5.48 × 10⁵ m/s. (c) Twice as many electrons, same speed. (d) 600 nm is beyond the threshold wavelength: no electrons at any intensity.',
            },
            {
              slug: 'photons-per-second',
              title: 'How many photons?',
              prompt: `A $1.00\\ \\mathrm{mW}$ laser pointer emits at $532\\ \\mathrm{nm}$. How many photons leave it each second? How many moles of photons in one hour? Use the result to explain in two or three sentences why the wave picture of light works so well for everyday light even though light is quantised.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Photons per second = power / energy per photon = 1.00 × 10⁻³ J/s ÷ 3.734 × 10⁻¹⁹ J = 2.68 × 10¹⁵ s⁻¹; in an hour 9.64 × 10¹⁸ photons, 1.60 × 10⁻⁵ mol.',
            },
          ],
          selfAssessment: [
            {
              question: 'In the photoelectric effect, why does very bright red light eject no electrons from sodium while dim violet light does?',
              answerOutline: 'Each electron absorbs one photon. A red photon has less energy than the work function, so no single absorption frees an electron; brightness only adds more such photons. A violet photon exceeds the work function.',
            },
            {
              question: 'Which has more energy per photon, infrared or ultraviolet light, and why?',
              answerOutline: 'Ultraviolet: it has higher frequency (shorter wavelength), and E = hν = hc/λ.',
            },
            {
              question: 'What factor converts the energy of one photon into the energy of a mole of photons?',
              answerOutline: 'The Avogadro constant, 6.022 × 10²³ mol⁻¹ (then divide by 1000 to get kJ/mol).',
            },
          ],
          quiz: [
            {
              question: 'What is the energy of one mole of photons of red light with $\\lambda = 650\\ \\mathrm{nm}$?',
              options: ['$3.06 \\times 10^{-19}\\ \\mathrm{kJ\\,mol^{-1}}$', '$1.84 \\times 10^{5}\\ \\mathrm{kJ\\,mol^{-1}}$', '$184\\ \\mathrm{kJ\\,mol^{-1}}$', '$1.84 \\times 10^{-4}\\ \\mathrm{kJ\\,mol^{-1}}$'],
              answer: 2,
              explanation:
                '$E = hc/\\lambda = (6.626 \\times 10^{-34})(2.998 \\times 10^8)/(650 \\times 10^{-9}) = 3.056 \\times 10^{-19}\\ \\mathrm{J}$ per photon; times $N_\\mathrm{A}$ gives $1.84 \\times 10^5\\ \\mathrm{J\\,mol^{-1}} = 184\\ \\mathrm{kJ\\,mol^{-1}}$. The first option is the per-photon energy with a wrong unit; $1.84 \\times 10^5$ forgets to convert J to kJ.',
            },
            {
              question: 'A metal is illuminated with light just above its threshold frequency and electrons are ejected. The intensity is tripled, frequency unchanged. What happens?',
              options: ['Three times as many electrons, with the same maximum kinetic energy', 'The same number of electrons, each with three times the kinetic energy', 'Three times as many electrons, each faster', 'No change, since the frequency is the same'],
              answer: 0,
              explanation:
                'Intensity is the number of photons per second. Each electron still absorbs one photon of the same energy $h\\nu$, so $E_\\mathrm{k} = h\\nu - \\Phi$ is unchanged while the number of electrons triples. Expecting faster electrons is the classical wave prediction that the experiment refuted.',
            },
            {
              question: 'Photon A has twice the wavelength of photon B. How do their energies compare?',
              options: ['$E_A = 2E_B$', '$E_A = 4E_B$', '$E_A = E_B$, since both travel at $c$', '$E_A = E_B/2$'],
              answer: 3,
              explanation:
                '$E = hc/\\lambda$, so doubling the wavelength halves the energy (and the frequency). Equating wavelength with energy, $E_A = 2E_B$, is the common reversal; the shared speed $c$ is why $\\lambda$ and $\\nu$ are inversely related.',
            },
          ],
          relatedLessons: ['physics-quantum/photons/the-photoelectric-effect'],
        },
        {
          slug: 'hydrogen-spectrum-and-the-bohr-model',
          title: 'The hydrogen spectrum and the Bohr model',
          summary:
            'Hot hydrogen emits only certain wavelengths. Bohr explained them with quantised energy levels, E_n = −hcR_H/n², and the Rydberg formula; the model works for hydrogen and fails for everything else.',
          estimatedMinutes: 115,
          objectives: [
            'Explain why a line spectrum implies quantised energy levels',
            'Compute the energy of the levels of hydrogen and of a transition between them',
            'Use the Rydberg formula to find the wavelength of a hydrogen line and name its series and region',
            'Compute the ionisation energy of hydrogen from the model and compare it with experiment',
            'State what the Bohr model gets right and where it fails',
          ],
          concepts: [
            'Continuous versus line spectra',
            'Emission and absorption',
            'Energy levels E_n = −2.179 × 10⁻¹⁸ J / n²',
            'Ground and excited states',
            'Rydberg formula and R_H',
            'Lyman, Balmer and Paschen series',
            'Ionisation energy as the n → ∞ limit',
            'Limits of the Bohr model',
          ],
          explanation: `A hot solid glows with a **continuous** spectrum, but hydrogen gas in a discharge tube emits only a few sharp colours: a **line spectrum**. In the visible there are four lines, at about 656, 486, 434 and 410 nm. If each line is a photon emitted as the atom drops from one energy to another, then the atom can only have certain energies: its energy is **quantised**.

**Bohr's model (1913)** gives the allowed energies of the hydrogen atom as

$$E_n = -\\frac{hcR_\\mathrm{H}}{n^2} = -\\frac{2.179 \\times 10^{-18}\\ \\mathrm{J}}{n^2}, \\qquad n = 1, 2, 3, \\ldots$$

with the Rydberg constant $R_\\mathrm{H} = 1.097 \\times 10^7\\ \\mathrm{m^{-1}}$. Zero energy is the electron at rest infinitely far away, so bound states are negative; $n = 1$ is the **ground state**. When the atom falls from $n_\\mathrm{i}$ to a lower $n_\\mathrm{f}$ it emits a photon carrying the energy difference, and absorbing that same photon lifts it back up. Combining $\\Delta E = hc/\\lambda$ with the level formula gives the **Rydberg formula**:

$$\\frac{1}{\\lambda} = R_\\mathrm{H}\\left(\\frac{1}{n_\\mathrm{f}^2} - \\frac{1}{n_\\mathrm{i}^2}\\right).$$

**Worked example.** The transition $n = 4 \\rightarrow 2$: $\\frac{1}{\\lambda} = 1.097 \\times 10^7\\left(\\frac{1}{4} - \\frac{1}{16}\\right) = 2.057 \\times 10^6\\ \\mathrm{m^{-1}}$, so $\\lambda = 486.2\\ \\mathrm{nm}$, the blue-green line. The photon energy is $2.179 \\times 10^{-18} \\times 0.1875 = 4.086 \\times 10^{-19}\\ \\mathrm{J}$.

All transitions ending on $n = 2$ form the **Balmer series** (visible); those ending on $n = 1$, the **Lyman series**, are ultraviolet because the gap to the ground state is large; $n = 3$ gives the infrared **Paschen series**. The levels crowd together as $n$ grows, so each series converges to a limit. Pick transitions in the diagram below and watch the series pile up.

\`\`\`interactive
hydrogen-spectrum
{"nLower": 2, "nUpper": 4, "caption": "Start with 4 → 2 (486 nm). Step the upper level up and watch the Balmer lines crowd towards the series limit at 365 nm. Switch the lower level to n = 1: every Lyman line is ultraviolet, because the drop to the ground state is so large. The widget uses the more precise R_H = 1.09678 × 10⁷ m⁻¹ and vacuum wavelengths, so its fourth figure can differ from hand calculations with 1.097 × 10⁷."}
\`\`\`

**Ionisation energy.** Removing the electron from $n = 1$ to $n = \\infty$ costs $2.179 \\times 10^{-18}\\ \\mathrm{J}$ per atom, or $1312\\ \\mathrm{kJ\\,mol^{-1}}$, exactly the measured first ionisation energy of hydrogen. That agreement made the model famous.

**Where it fails.** Bohr assumed the electron moves in circular orbits with quantised angular momentum, an assumption without a deeper reason. The model works only for one-electron species (H, He⁺, Li²⁺, with $R$ scaled by $Z^2$), cannot explain the spectra of any atom with two or more electrons, and gives the wrong angular momentum for the ground state. Its lasting ideas are quantised levels and photons carrying energy differences; its orbits are wrong, as the next lesson shows.

Common errors: forgetting to square $n$, getting the sign backwards (use the larger $n$ as $n_\\mathrm{i}$ for emission so $1/\\lambda$ is positive), and confusing the energy of a level with the energy of a transition.`,
          resources: [
            ostx('6-2-the-bohr-model', '6.2 The Bohr model', 'Line spectra, the Bohr energy levels and the Rydberg formula, with worked examples.', true),
            phet('models-of-the-hydrogen-atom', 'Models of the Hydrogen Atom', 'Compare the billiard-ball, plum-pudding, Bohr and Schrödinger models against the observed spectrum.'),
            {
              title: 'NIST Handbook of Basic Atomic Spectroscopic Data: hydrogen lines',
              url: 'https://physics.nist.gov/PhysRefData/Handbook/Tables/hydrogentable2.htm',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Measured wavelengths of the hydrogen lines; compare them with your Rydberg-formula values (NIST lists air wavelengths above 200 nm).',
            },
          ],
          exercises: [
            {
              slug: 'balmer-series',
              title: 'The visible Balmer lines',
              prompt: `Compute the wavelengths of the Balmer lines from $n = 3, 4, 5$ and $6$ to $n = 2$, and the series limit ($n = \\infty \\rightarrow 2$). Give the colour of each visible line. Then compare your values with the measured wavelengths in the NIST table (air wavelengths: 656.28, 486.13, 434.05, 410.17 nm) and suggest why the fourth figure differs slightly.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'With R_H = 1.097 × 10⁷ m⁻¹: 656.3, 486.2, 434.1, 410.2 nm and a limit of 364.6 nm. Differences come from rounding R_H and from air versus vacuum wavelengths.',
            },
            {
              slug: 'identify-a-transition',
              title: 'Identify a transition',
              prompt: `A hydrogen atom emits a photon of wavelength $1875\\ \\mathrm{nm}$. (a) In which region of the spectrum is it? (b) Find the transition, assuming $n_\\mathrm{f} = 3$; show that your $n_\\mathrm{i}$ is a whole number. (c) What wavelength would an atom in the ground state need to absorb to reach $n = 4$?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Infrared. (b) 1/n_i² = 1/9 − 1/(R_H λ) gives n_i = 4.00 (Paschen α). (c) 1/λ = R_H(1 − 1/16): λ = 97.2 nm, in the ultraviolet.',
            },
            {
              slug: 'helium-ion',
              title: 'A one-electron ion',
              prompt: `For a one-electron ion of nuclear charge $Z$, the Bohr energies are $E_n = -Z^2(2.179 \\times 10^{-18}\\ \\mathrm{J})/n^2$. (a) Compute the ionisation energy of $\\mathrm{He^+}$ in $\\mathrm{kJ\\,mol^{-1}}$ and compare with the measured second ionisation energy of helium, $5250\\ \\mathrm{kJ\\,mol^{-1}}$. (b) Find the wavelength of the $\\mathrm{He^+}$ $2 \\rightarrow 1$ transition. (c) Explain why the same formula fails completely for the first ionisation energy of neutral helium ($2372\\ \\mathrm{kJ\\,mol^{-1}}$).`,
              kind: 'derivation',
              difficulty: 3,
              hint: '(a) 4 × 1312 = 5249 kJ/mol, excellent agreement. (b) 1/λ = 4R_H(3/4): λ = 30.4 nm. (c) Neutral He has two electrons that repel and shield each other; the one-electron model has no way to include that.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a line spectrum imply that an atom\'s energy is quantised?',
              answerOutline: 'Each line is a photon whose energy equals a difference between two atomic energies. Only certain photon energies appear, so only certain atomic energies exist.',
            },
            {
              question: 'Why are all the Lyman lines ultraviolet while the Balmer series includes visible lines?',
              answerOutline: 'The gap from any level down to n = 1 is at least 3/4 of 2.179 × 10⁻¹⁸ J (122 nm or shorter), far more than the gaps ending at n = 2, which run from 1.89 eV (656 nm) to 3.40 eV (365 nm), visible and near UV.',
            },
            {
              question: 'Name one success and two failures of the Bohr model.',
              answerOutline: 'Success: hydrogen\'s line wavelengths and ionisation energy. Failures: no explanation of multi-electron spectra; orbits and their quantisation rule have no deeper justification (and the ground-state angular momentum is wrong); no account of line intensities or splitting.',
            },
          ],
          quiz: [
            {
              question: 'What is the wavelength of the photon emitted when a hydrogen atom falls from $n = 3$ to $n = 1$? ($R_\\mathrm{H} = 1.097 \\times 10^7\\ \\mathrm{m^{-1}}$)',
              options: ['$656.3\\ \\mathrm{nm}$', '$136.7\\ \\mathrm{nm}$', '$102.6\\ \\mathrm{nm}$', '$9.75\\ \\mathrm{nm}$'],
              answer: 2,
              explanation:
                '$1/\\lambda = R_\\mathrm{H}(1/1^2 - 1/3^2) = 1.097 \\times 10^7 \\times 8/9 = 9.751 \\times 10^6\\ \\mathrm{m^{-1}}$, so $\\lambda = 102.6\\ \\mathrm{nm}$ (Lyman β, ultraviolet). Forgetting to square the $n$ values gives $136.7\\ \\mathrm{nm}$; $656.3\\ \\mathrm{nm}$ is the $3 \\rightarrow 2$ line.',
            },
            {
              question: 'How much energy is needed to ionise one mole of hydrogen atoms that are all in the $n = 2$ state?',
              options: ['$1312\\ \\mathrm{kJ\\,mol^{-1}}$', '$984\\ \\mathrm{kJ\\,mol^{-1}}$', '$656\\ \\mathrm{kJ\\,mol^{-1}}$', '$328\\ \\mathrm{kJ\\,mol^{-1}}$'],
              answer: 3,
              explanation:
                'From $n = 2$ to $\\infty$ costs $2.179 \\times 10^{-18}/2^2 = 5.448 \\times 10^{-19}\\ \\mathrm{J}$ per atom, or $328\\ \\mathrm{kJ\\,mol^{-1}}$. $1312$ is the value from the ground state; $984$ is the $1 \\rightarrow 2$ excitation energy; $656$ divides by $n$ instead of $n^2$.',
            },
            {
              question: 'Which of these hydrogen transitions absorbs the photon of highest energy?',
              options: ['$n = 1 \\rightarrow 2$', '$n = 2 \\rightarrow 6$', '$n = 6 \\rightarrow 1$', '$n = 3 \\rightarrow 7$'],
              answer: 0,
              explanation:
                'Absorption means going up, so $6 \\rightarrow 1$ is an emission and is excluded. Of the upward jumps, $1 \\rightarrow 2$ spans $\\frac{3}{4}$ of $2.179 \\times 10^{-18}\\ \\mathrm{J}$, far more than $2 \\rightarrow 6$ ($0.222$ of it) or $3 \\rightarrow 7$ ($0.091$). The levels crowd together at high $n$, so a jump that "looks bigger" in $n$ can be smaller in energy.',
            },
          ],
          relatedLessons: ['physics-quantum/atoms-and-applications/the-bohr-atom'],
        },
        {
          slug: 'quantum-numbers-and-orbitals',
          title: 'Matter waves, quantum numbers and orbitals',
          summary:
            'Electrons have a wavelength, so they cannot follow orbits. Wave mechanics describes them with orbitals labelled by four quantum numbers, with characteristic shapes and nodes.',
          estimatedMinutes: 125,
          objectives: [
            'Compute a de Broglie wavelength and explain why wave behaviour matters for electrons but not baseballs',
            'State what the uncertainty principle forbids and why it rules out Bohr orbits',
            'Interpret a wavefunction and its square as a probability density, and describe an orbital',
            'List the allowed values of n, l, m_l and m_s and decide whether a set is allowed',
            'Describe the shapes of s, p and d orbitals and count radial and angular nodes',
          ],
          concepts: [
            'de Broglie wavelength λ = h/mv',
            'Heisenberg uncertainty principle',
            'Wavefunction ψ and probability density ψ²',
            'Orbital',
            'Principal quantum number n (shell)',
            'Angular momentum quantum number l (subshell s, p, d, f)',
            'Magnetic quantum number m_l',
            'Spin quantum number m_s = ±1/2',
            'Radial and angular nodes',
          ],
          explanation: `In 1924 de Broglie proposed that any moving particle has a wavelength

$$\\lambda = \\frac{h}{mv}.$$

An electron moving at $2.19 \\times 10^6\\ \\mathrm{m\\,s^{-1}}$ (its speed in Bohr's ground state) has $\\lambda = 6.626 \\times 10^{-34}/(9.109 \\times 10^{-31} \\times 2.19 \\times 10^6) = 3.32 \\times 10^{-10}\\ \\mathrm{m}$, about the size of an atom. A $0.145\\ \\mathrm{kg}$ baseball at $40\\ \\mathrm{m\\,s^{-1}}$ has $\\lambda = 1.1 \\times 10^{-34}\\ \\mathrm{m}$, far too small ever to notice. Electron diffraction from crystals confirmed the idea in 1927. A wave spread over the whole atom cannot be a point on a circular track; Heisenberg's **uncertainty principle**, $\\Delta x\\,\\Delta p \\gtrsim h/4\\pi$, makes the same point: an electron confined to an atom cannot have both a definite position and a definite momentum, so it has no trajectory.

**Orbitals.** Schrödinger's equation replaces orbits with **wavefunctions** $\\psi$. The square $\\psi^2$ is a probability density: where the electron is likely to be found. An **orbital** is one allowed wavefunction, usually drawn as the surface enclosing about 90 % of the probability. Solving the equation for hydrogen produces three quantum numbers naturally, and electron spin adds a fourth:

| Symbol | Name | Allowed values | Determines |
|---|---|---|---|
| $n$ | principal | $1, 2, 3, \\ldots$ | size and (in H) energy: the shell |
| $l$ | angular momentum | $0$ to $n - 1$ | shape: $s, p, d, f$ for $l = 0, 1, 2, 3$ |
| $m_l$ | magnetic | $-l$ to $+l$ | orientation; $2l + 1$ orbitals per subshell |
| $m_s$ | spin | $+\\tfrac12, -\\tfrac12$ | the two spin states |

So shell $n$ contains $n^2$ orbitals: $n = 3$ has one $3s$, three $3p$ and five $3d$, nine in all, holding at most 18 electrons. Sets such as $(2, 2, 0, +\\tfrac12)$ are impossible because $l$ must be less than $n$.

**Shapes and nodes.** An $s$ orbital is spherical; a $p$ orbital has two lobes on opposite sides of the nucleus with a nodal plane between them; $d$ orbitals mostly have four lobes. A **node** is a surface where $\\psi = 0$. An orbital has $l$ angular nodes (planes or cones) and $n - l - 1$ radial nodes (spheres), $n - 1$ in total. So $2s$ has one radial node, $3p$ has one radial and one angular node. Nodes are why higher orbitals reach farther out, and they matter in bonding, where the sign of $\\psi$ on each side of a node decides whether overlap is constructive.

A common confusion is between orbital and orbit: an orbital is a probability cloud with no path inside it. Another is to think $p$ lobes are two places the electron "jumps" between; the wavefunction simply has a node at the nucleus. Read OpenStax 6.3, then watch the MIT lecture on hydrogen wavefunctions.`,
          resources: [
            ostx('6-3-development-of-quantum-theory', '6.3 Development of quantum theory', 'Matter waves, the uncertainty principle, the Schrödinger model and the four quantum numbers, with orbital pictures.', true),
            mit('unit-i-the-atom/lecture-6-hydrogen-atom-wavefunctions-orbitals', 'Lecture 6, Hydrogen atom wavefunctions (orbitals)', 'Orbital shapes, radial probability distributions and nodes.'),
            mit('unit-i-the-atom/lecture-4-wave-particle-duality-of-matter-schrodinger-equation', 'Lecture 4, Wave-particle duality of matter; Schrödinger equation', 'De Broglie waves and why they lead to quantisation.'),
          ],
          exercises: [
            {
              slug: 'de-broglie-wavelengths',
              title: 'De Broglie wavelengths',
              prompt: `Compute the de Broglie wavelength of: (a) an electron accelerated through $100\\ \\mathrm{V}$ (kinetic energy $100\\ \\mathrm{eV} = 1.602 \\times 10^{-17}\\ \\mathrm{J}$); (b) a proton at $1.00 \\times 10^3\\ \\mathrm{m\\,s^{-1}}$ ($m = 1.673 \\times 10^{-27}\\ \\mathrm{kg}$); (c) a $70\\ \\mathrm{kg}$ person walking at $1.4\\ \\mathrm{m\\,s^{-1}}$. Which of these could be diffracted by a crystal with atomic spacings of about $0.2\\ \\mathrm{nm}$?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) v = √(2E/m) = 5.93 × 10⁶ m/s, λ = 0.123 nm. (b) 0.396 nm. (c) 6.8 × 10⁻³⁶ m. The electron and proton have wavelengths comparable to the spacing; the person does not.',
            },
            {
              slug: 'allowed-quantum-numbers',
              title: 'Allowed quantum numbers',
              prompt: `For each set $(n, l, m_l, m_s)$ say whether it is allowed; if it is, name the orbital (for example $3p$); if not, say which rule it breaks: $(3, 1, -1, +\\tfrac12)$; $(2, 2, 0, -\\tfrac12)$; $(4, 3, -3, +\\tfrac12)$; $(1, 0, 1, +\\tfrac12)$; $(5, 2, 2, 0)$. Then list all $m_l$ values for a $4f$ subshell and give the total number of electrons the $n = 4$ shell can hold.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'l < n, |m_l| ≤ l, m_s = ±½. Allowed: 3p and 4f. 4f has m_l = −3 … +3 (seven orbitals); n = 4 holds 2n² = 32 electrons.',
            },
            {
              slug: 'nodes-and-shapes',
              title: 'Nodes and shapes',
              prompt: `Give the number of radial nodes, angular nodes and total nodes for $1s$, $2p$, $3s$, $3d$ and $4p$. Sketch $2p_z$ and $3d_{xy}$ and mark their nodal planes. In three or four sentences explain why the $2s$ electron in an atom spends some time very close to the nucleus while having its most probable distance farther out than $1s$.`,
              kind: 'writing',
              difficulty: 2,
              hint: 'Radial = n − l − 1, angular = l. 3s: 2 radial, 0 angular; 4p: 2 radial, 1 angular. 2s has a small inner lobe inside its radial node (penetration) but its main lobe lies outside 1s.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can an electron in an atom not move on a Bohr orbit?',
              answerOutline: 'Its de Broglie wavelength is comparable to the atom, so it is spread out as a wave; the uncertainty principle forbids a definite position and momentum together, so there is no trajectory.',
            },
            {
              question: 'What do n, l and m_l each tell you about an orbital?',
              answerOutline: 'n: size and shell (and energy in hydrogen); l: shape (s, p, d, f); m_l: orientation in space. 2l + 1 orbitals per subshell.',
            },
            {
              question: 'How many orbitals and electrons are in n = 3, and how many angular nodes does a 3d orbital have?',
              answerOutline: 'Nine orbitals (3s, three 3p, five 3d), 18 electrons; a 3d orbital has l = 2 angular nodes and no radial nodes.',
            },
          ],
          quiz: [
            {
              question: 'What is the de Broglie wavelength of an electron moving at $5.0 \\times 10^6\\ \\mathrm{m\\,s^{-1}}$? ($m_e = 9.109 \\times 10^{-31}\\ \\mathrm{kg}$)',
              options: ['$0.15\\ \\mathrm{nm}$', '$1.5\\ \\mathrm{nm}$', '$6.9\\ \\mathrm{nm}$', '$1.5 \\times 10^{-4}\\ \\mathrm{nm}$'],
              answer: 0,
              explanation:
                '$\\lambda = h/(mv) = 6.626 \\times 10^{-34}/(9.109 \\times 10^{-31} \\times 5.0 \\times 10^6) = 1.5 \\times 10^{-10}\\ \\mathrm{m} = 0.15\\ \\mathrm{nm}$. Errors in the metre-to-nanometre step give the other powers of ten; a check is that electron wavelengths in atoms are around atomic size, tenths of a nanometre.',
            },
            {
              question: 'Which set of quantum numbers $(n, l, m_l, m_s)$ is allowed?',
              options: ['$(2, 2, 1, +\\tfrac12)$', '$(3, 1, -2, -\\tfrac12)$', '$(4, 2, -2, +\\tfrac12)$', '$(1, 0, 0, +1)$'],
              answer: 2,
              explanation:
                '$(4, 2, -2, +\\tfrac12)$ is a $4d$ electron: $l < n$, $|m_l| \\le l$, $m_s = \\pm\\tfrac12$. The first breaks $l < n$, the second $|m_l| \\le l$, and the last has an impossible spin value.',
            },
            {
              question: 'An orbital has two radial nodes and one angular node. Which is it?',
              options: ['$3p$', '$4p$', '$3d$', '$4s$'],
              answer: 1,
              explanation:
                'One angular node means $l = 1$ (a $p$ orbital). Radial nodes $= n - l - 1 = 2$ gives $n = 4$: a $4p$ orbital. $3p$ has only one radial node; $3d$ has two angular nodes; $4s$ has three radial and no angular nodes.',
            },
            {
              question: 'What is the difference between the $n = 3$ shell and a $3p$ orbital?',
              options: [
                'They are the same thing written two ways',
                'The shell holds up to 18 electrons in nine orbitals; one $3p$ orbital holds at most 2',
                'The shell holds 6 electrons and a $3p$ orbital holds 2',
                'A $3p$ orbital holds 6 electrons; the shell holds 8',
              ],
              answer: 1,
              explanation:
                'Shell $n = 3$ contains the $3s$, $3p$ and $3d$ subshells: $1 + 3 + 5 = 9$ orbitals, $2n^2 = 18$ electrons. Each orbital holds two electrons; the whole $3p$ subshell (three orbitals) holds six. "6" confuses an orbital with a subshell; "8" is the octet, not the shell capacity.',
            },
          ],
          relatedLessons: ['physics-quantum/matter-waves/de-broglie-waves', 'physics-quantum/atoms-and-applications/atomic-structure-and-spin'],
        },
      ],
    },
    {
      slug: 'electron-configurations-and-periodicity',
      title: 'Electron Configurations and Periodic Trends',
      description:
        'How electrons fill orbitals in many-electron atoms, why that filling order builds the periodic table, and how effective nuclear charge explains the trends in size, ionisation energy and electron affinity, including the exceptions.',
      lessons: [
        {
          slug: 'electron-configurations',
          title: 'Electron configurations',
          summary:
            'Fill orbitals in order of energy with the Pauli principle and Hund\'s rule, read configurations off the periodic table, and handle ions, magnetism and the exceptions Cr and Cu.',
          estimatedMinutes: 115,
          objectives: [
            'Explain why subshells of the same n have different energies in a many-electron atom',
            'Write full and noble-gas-core configurations and orbital diagrams using the aufbau principle, the Pauli principle and Hund\'s rule',
            'Read the configuration of any main-group element from its position in the periodic table and identify its valence electrons',
            'Write configurations of ions, removing 4s electrons before 3d for transition metals',
            'Predict paramagnetism from unpaired electrons and explain the Cr and Cu exceptions',
          ],
          concepts: [
            'Shielding and penetration split subshell energies',
            'Aufbau order 1s 2s 2p 3s 3p 4s 3d 4p ...',
            'Pauli exclusion principle',
            'Hund\'s rule',
            'Noble-gas core and valence electrons',
            's, p, d and f blocks',
            'Ion configurations: ns lost before (n−1)d',
            'Paramagnetic and diamagnetic',
            'Exceptions: Cr 3d⁵4s¹, Cu 3d¹⁰4s¹',
          ],
          explanation: `In hydrogen all orbitals with the same $n$ have the same energy. With more than one electron they do not. Each electron is screened (**shielded**) from the nucleus by the others, but the shielding is not uniform: an $s$ electron has some probability very close to the nucleus (it **penetrates** the inner shells), a $p$ electron less, a $d$ electron less still. So within a shell, $E(ns) < E(np) < E(nd)$, and the $3d$ subshell ends up so high that $4s$ fills first. The resulting **aufbau** (building-up) order is

$$1s,\\ 2s,\\ 2p,\\ 3s,\\ 3p,\\ 4s,\\ 3d,\\ 4p,\\ 5s,\\ 4d,\\ 5p,\\ \\ldots$$

Two more rules fix the arrangement. The **Pauli exclusion principle**: no two electrons in an atom share all four quantum numbers, so an orbital holds at most two electrons, with opposite spins. **Hund's rule**: in a set of equal-energy orbitals, electrons occupy separate orbitals with parallel spins before pairing, because electrons in different orbitals repel each other less. Nitrogen is therefore $1s^2 2s^2 2p^3$ with three unpaired $2p$ electrons, not a pair and a single.

\`\`\`interactive
orbital-filling
{"z": 8, "mode": "build", "maxZ": 36, "caption": "Build oxygen (Z = 8) by clicking boxes: each click cycles empty, one electron, a pair. Try pairing two 2p electrons while a 2p box is still empty and read the rule you break. Then switch to element mode and step Z from 1 to 36: watch 4s fill before 3d at K and Ca, and look at Cr (24) and Cu (29)."}
\`\`\`

**Shorthand and the periodic table.** Writing the preceding noble gas in brackets saves space: sulfur is $[\\mathrm{Ne}]\\,3s^2 3p^4$. The **valence electrons** are those outside the noble-gas core (for main-group elements, the $ns$ and $np$ electrons). The table's shape *is* the filling order: groups 1 and 2 are the $s$ block, groups 13 to 18 the $p$ block, the transition metals the $d$ block. Elements in a group share a valence configuration, which is why they share chemistry.

**Ions.** Anions add electrons to the next available orbital ($\\mathrm{Cl^-}$: $[\\mathrm{Ne}]3s^2 3p^6$). Transition metals lose their $4s$ electrons *before* $3d$: $\\mathrm{Fe}$ is $[\\mathrm{Ar}]\\,3d^6 4s^2$ but $\\mathrm{Fe^{2+}}$ is $[\\mathrm{Ar}]\\,3d^6$, not $3d^4 4s^2$. Once $3d$ is occupied it lies below $4s$, so the order of filling is not the order of removal. (This course writes subshells in order of $n$, as in $3d^6 4s^2$; many books write $4s^2 3d^6$. Both mean the same.)

**Magnetism** tests the rules: atoms or ions with unpaired electrons are **paramagnetic** (drawn into a magnetic field); all-paired ones are **diamagnetic**.

**Exceptions.** Chromium is $[\\mathrm{Ar}]\\,3d^5 4s^1$, not $3d^4 4s^2$, and copper is $[\\mathrm{Ar}]\\,3d^{10} 4s^1$. The $4s$ and $3d$ energies are so close that the configuration with a half-filled or filled $d$ set, which has lower electron-electron repulsion and more exchange stabilisation, wins. The aufbau order is a guide to energies, not a law; several heavier elements break it too. Read OpenStax 6.4, then use the widget to test yourself on every element up to krypton.`,
          resources: [
            ostx('6-4-electronic-structure-of-atoms-electron-configurations', '6.4 Electronic structure of atoms (electron configurations)', 'Orbital energies, the aufbau principle, Hund\'s rule, the periodic table as a filling chart and the exceptions.', true),
            mit('unit-i-the-atom/lecture-7', 'Lecture 7, Multielectron atoms', 'Shielding, penetration and why subshell energies split; electron configurations.'),
            phet('build-an-atom', 'Build an Atom', 'Add protons, neutrons and electrons and check charge, mass and the element; a quick warm-up for configurations.'),
          ],
          exercises: [
            {
              slug: 'write-configurations',
              title: 'Write configurations',
              prompt: `Write the full configuration, the noble-gas-core configuration and the orbital diagram of the valence subshells for: P, Ca, Mn, Br and Zn. For each, give the number of valence electrons (main group) and the number of unpaired electrons, and say whether the atom is paramagnetic.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'P [Ne]3s²3p³ (3 unpaired); Ca [Ar]4s² (0); Mn [Ar]3d⁵4s² (5); Br [Ar]3d¹⁰4s²4p⁵ (1); Zn [Ar]3d¹⁰4s² (0, diamagnetic). Check them with the widget.',
            },
            {
              slug: 'ions-and-magnetism',
              title: 'Ions and magnetism',
              prompt: `Write the configurations of $\\mathrm{S^{2-}}$, $\\mathrm{K^+}$, $\\mathrm{Fe^{2+}}$, $\\mathrm{Fe^{3+}}$, $\\mathrm{Cu^+}$ and $\\mathrm{Zn^{2+}}$. Which are isoelectronic with a noble gas? Which are paramagnetic, and how many unpaired electrons does each have? Explain why $\\mathrm{Fe^{3+}}$ is especially stable in terms of its configuration.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'S²⁻ and K⁺ are [Ar]. Fe²⁺ [Ar]3d⁶ (4 unpaired), Fe³⁺ [Ar]3d⁵ (5 unpaired, half-filled), Cu⁺ [Ar]3d¹⁰ and Zn²⁺ [Ar]3d¹⁰ (diamagnetic). Remove 4s electrons first.',
            },
            {
              slug: 'why-4s-before-3d',
              title: 'Why 4s before 3d?',
              prompt: `In about 200 words explain, using shielding and penetration, why potassium's 19th electron goes into $4s$ rather than $3d$, and why $\\mathrm{Ti^{2+}}$ is $[\\mathrm{Ar}]3d^2$ rather than $[\\mathrm{Ar}]4s^2$. Your answer should mention that orbital energies depend on how many electrons are present, so a single fixed "energy ladder" is an approximation.`,
              kind: 'writing',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'State the Pauli principle and Hund\'s rule, and give the reason behind Hund\'s rule.',
              answerOutline: 'Pauli: no two electrons share all four quantum numbers, so at most two (opposite spins) per orbital. Hund: in degenerate orbitals electrons go singly with parallel spins first, because separate orbitals reduce repulsion (and parallel spins gain exchange stabilisation).',
            },
            {
              question: 'Why is the configuration of Fe²⁺ [Ar]3d⁶ and not [Ar]3d⁴4s²?',
              answerOutline: 'In the ion (and once 3d is occupied) the 3d orbitals lie below 4s, so the 4s electrons are the highest in energy and are removed first.',
            },
            {
              question: 'How does the periodic table encode electron configurations?',
              answerOutline: 'Each block corresponds to the subshell being filled (s, p, d, f); the period gives n of the valence s and p electrons; elements in a group share the valence configuration.',
            },
          ],
          quiz: [
            {
              question: 'What is the ground-state configuration of $\\mathrm{Fe^{2+}}$ (Fe: $Z = 26$)?',
              options: ['$[\\mathrm{Ar}]\\,3d^4 4s^2$', '$[\\mathrm{Ar}]\\,3d^6$', '$[\\mathrm{Ar}]\\,3d^5 4s^1$', '$[\\mathrm{Ar}]\\,3d^6 4s^2$'],
              answer: 1,
              explanation:
                'Iron is $[\\mathrm{Ar}]\\,3d^6 4s^2$; ionisation removes the two $4s$ electrons first, giving $[\\mathrm{Ar}]\\,3d^6$. Removing $3d$ electrons ($3d^4 4s^2$) follows the filling order backwards, which is the classic mistake. The last option is neutral iron.',
            },
            {
              question: 'How many unpaired electrons does a ground-state sulfur atom have?',
              options: ['0', '1', '2', '4'],
              answer: 2,
              explanation:
                'S is $[\\mathrm{Ne}]\\,3s^2 3p^4$. Hund\'s rule puts one electron in each of the three $3p$ orbitals and pairs the fourth: $\\uparrow\\downarrow\\ \\uparrow\\ \\uparrow$, two unpaired. "4" counts the $3p$ electrons, not the unpaired ones; "0" pairs everything.',
            },
            {
              question: 'An orbital diagram for carbon shows $2p$: $\\uparrow\\downarrow\\ \\_\\ \\_$. Which rule does it break?',
              options: ['The Pauli principle', 'The aufbau principle', 'Hund\'s rule', 'None: it is a valid ground state'],
              answer: 2,
              explanation:
                'Pairing two electrons while equal-energy $2p$ orbitals are empty violates Hund\'s rule; the ground state is $\\uparrow\\ \\uparrow\\ \\_$. The paired electrons do have opposite spins, so Pauli is satisfied, and the $2p$ is the right subshell, so aufbau is too.',
            },
            {
              question: 'Which is the observed ground-state configuration of copper ($Z = 29$)?',
              options: ['$[\\mathrm{Ar}]\\,3d^9 4s^2$', '$[\\mathrm{Ar}]\\,3d^{10} 4s^2$', '$[\\mathrm{Ar}]\\,3d^{8} 4s^2 4p^1$', '$[\\mathrm{Ar}]\\,3d^{10} 4s^1$'],
              answer: 3,
              explanation:
                'Copper is an exception: moving one $4s$ electron into $3d$ gives a filled $3d^{10}$ set, which lowers the total energy because $3d$ and $4s$ are so close. $3d^9 4s^2$ is the simple aufbau prediction; $3d^{10}4s^2$ has 30 electrons.',
            },
          ],
        },
        {
          slug: 'effective-nuclear-charge-and-atomic-size',
          title: 'Effective nuclear charge and atomic size',
          summary:
            'Valence electrons feel only part of the nuclear charge. That one idea explains why atoms shrink across a period and grow down a group, and why cations are small and anions large.',
          estimatedMinutes: 100,
          objectives: [
            'Estimate the effective nuclear charge on a valence electron and explain how shielding reduces it',
            'Explain the trends in atomic radius across a period and down a group',
            'Compare the sizes of an atom and its ions, and rank an isoelectronic series',
            'Read radius data and point out where the simple trend bends (transition metals)',
          ],
          concepts: [
            'Effective nuclear charge Z_eff = Z − S',
            'Core electrons shield well, same-shell electrons poorly',
            'Covalent radius',
            'Radius decreases across a period',
            'Radius increases down a group',
            'Cations smaller, anions larger than their atoms',
            'Isoelectronic series',
          ],
          explanation: `A valence electron is attracted by the nucleus and repelled by every other electron. The net effect is as if it felt a reduced nuclear charge, the **effective nuclear charge**

$$Z_\\mathrm{eff} = Z - S,$$

where $S$ measures shielding. Core electrons (in lower shells) sit mostly between the nucleus and the valence electron and shield it well; electrons in the same shell shield poorly, because they are on average no closer to the nucleus. As a first estimate, count the core electrons: sodium ($Z = 11$, 10 core electrons) gives $Z_\\mathrm{eff} \\approx 1$; chlorine ($Z = 17$, 10 core) gives $Z_\\mathrm{eff} \\approx 7$. Slater's empirical rules, which give same-shell electrons a shielding of 0.35 each and the next shell in 0.85, refine these to about $2.2$ and $6.1$. The trend is what matters: **across a period $Z_\\mathrm{eff}$ rises steadily**, because each step adds a proton and a poorly shielding same-shell electron.

**Atomic radius.** An atom has no hard edge, so radii are defined from bonds: the **covalent radius** is half the distance between two bonded identical atoms. Two trends follow from $Z_\\mathrm{eff}$ and $n$:

- **Across a period** radius decreases: the valence shell has the same $n$, but rising $Z_\\mathrm{eff}$ pulls it in. Na is $166\\ \\mathrm{pm}$, Cl $102\\ \\mathrm{pm}$.
- **Down a group** radius increases: each period adds a shell with larger $n$, which outweighs the slow rise in $Z_\\mathrm{eff}$. Li $128$, Na $166$, K $203\\ \\mathrm{pm}$.

Colour the table by radius in the widget and look for both trends, then at the plot underneath: every period starts with a big alkali metal and shrinks. Across the transition metals the radius barely changes, because the added electrons go into an inner $(n-1)d$ shell that shields the outer $4s$ electrons fairly well.

\`\`\`interactive
periodic-trends
{"property": "radius", "select": "Na", "highlight": ["Li", "Na", "K", "Rb"], "caption": "Radii here are single-bond covalent radii. Click across period 3 from Na to Cl and watch the radius fall; then down group 1 (outlined) and watch it rise. In the plot each saw-tooth is one period. Notice how flat the transition-metal stretch (Sc to Zn, Z = 21 to 30) is compared with the main-group elements."}
\`\`\`

**Ions.** Removing electrons leaves the same nuclear charge holding fewer electrons, often with a whole shell gone, so **cations are smaller than their atoms**: $\\mathrm{Na^+}$ is about $102\\ \\mathrm{pm}$ (ionic radius) against $166\\ \\mathrm{pm}$ for Na. Adding electrons increases repulsion with no extra charge, so **anions are larger**: $\\mathrm{Cl^-}$ about $181\\ \\mathrm{pm}$. In an **isoelectronic series** (same number of electrons), size is set by nuclear charge alone: $\\mathrm{O^{2-}} > \\mathrm{F^-} > \\mathrm{Na^+} > \\mathrm{Mg^{2+}} > \\mathrm{Al^{3+}}$, all with 10 electrons and from 8 to 13 protons.

The mistake to avoid is "more electrons, so bigger": across a period the electron count rises and the atoms shrink. Ask instead what $n$ the valence electrons have and what $Z_\\mathrm{eff}$ they feel. Covalent, metallic and ionic radii are measured differently, so compare numbers only within one kind. Read OpenStax 6.5 (first half).`,
          resources: [
            ostx('6-5-periodic-variations-in-element-properties', '6.5 Periodic variations in element properties', 'Effective nuclear charge, covalent and ionic radii, isoelectronic series.', true),
            mit('unit-ii-chemical-bonding-structure/lecture-8', 'Lecture 8, Periodic trends', 'Effective nuclear charge and the trends in size and ionisation energy.'),
            phet('build-an-atom', 'Build an Atom', 'Optional warm-up: add electrons to an atom and to its ions and compare the charge and shell picture with the radius trend.'),
          ],
          exercises: [
            {
              slug: 'zeff-estimates',
              title: 'Estimate Z_eff',
              prompt: `Estimate $Z_\\mathrm{eff}$ for the valence electron(s) of Li, C, F, Na and Cl by subtracting core electrons only. Then refine Na and Cl with Slater's rules (same shell 0.35 each, shell $n-1$ 0.85 each, deeper shells 1.00 each). Use your numbers to explain why F is much smaller than Li and why Cl is smaller than Na.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Core-only: Li 1, C 4, F 7, Na 1, Cl 7. Slater for Na 3s: 11 − (8 × 0.85 + 2 × 1.00) = 2.2; for Cl 3p: 17 − (6 × 0.35 + 8 × 0.85 + 2 × 1.00) = 6.1.',
            },
            {
              slug: 'rank-the-sizes',
              title: 'Rank the sizes',
              prompt: `Rank each set from smallest to largest and give a one-line reason: (a) Mg, Al, Si, S; (b) F, Cl, Br, I; (c) $\\mathrm{K^+}$, $\\mathrm{Ca^{2+}}$, $\\mathrm{Cl^-}$, $\\mathrm{S^{2-}}$; (d) Fe, $\\mathrm{Fe^{2+}}$, $\\mathrm{Fe^{3+}}$. Check (a) and (b) in the periodic-trends widget.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) S (105 pm) < Si (111) < Al (121) < Mg (141): same shell, rising Z_eff. (b) F < Cl < Br < I: one more shell each time. (c) is isoelectronic (18 electrons), so more protons means smaller: Ca²⁺ < K⁺ < Cl⁻ < S²⁻. (d) Fe³⁺ < Fe²⁺ < Fe.',
            },
            {
              slug: 'transition-metal-plateau',
              title: 'The transition-metal plateau',
              prompt: `Using the widget's radius data, tabulate the covalent radii from K to Kr. Plot or sketch them against $Z$. Describe the shape in words and explain (a) the steep fall from K to Sc, (b) the near plateau from Sc to Zn, and (c) the jump from Zn to Ga being so small. About 200 words.`,
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does atomic radius decrease across a period even though electrons are being added?',
              answerOutline: 'The added electrons go into the same shell (same n) and shield each other poorly, while each step adds a proton; Z_eff on the valence electrons rises and pulls the shell in.',
            },
            {
              question: 'Why is Cl⁻ larger than Cl but Na⁺ smaller than Na?',
              answerOutline: 'Cl⁻ has an extra electron with the same nuclear charge: more repulsion, lower Z_eff per electron, a larger cloud. Na⁺ has lost its only 3s electron, so its outermost shell is n = 2, held by 11 protons.',
            },
            {
              question: 'In an isoelectronic series, what alone determines the size?',
              answerOutline: 'The nuclear charge: same electron count and arrangement, so more protons pull the same cloud in more tightly.',
            },
          ],
          quiz: [
            {
              question: 'Which has the largest radius: $\\mathrm{S^{2-}}$, $\\mathrm{Cl^-}$, $\\mathrm{K^+}$ or $\\mathrm{Ca^{2+}}$?',
              options: ['$\\mathrm{Ca^{2+}}$', '$\\mathrm{S^{2-}}$', '$\\mathrm{K^+}$', '$\\mathrm{Cl^-}$'],
              answer: 1,
              explanation:
                'All four have 18 electrons (isoelectronic). Size then depends only on nuclear charge: sulfur has the fewest protons (16), so $\\mathrm{S^{2-}}$ is largest and $\\mathrm{Ca^{2+}}$ (20) smallest. Choosing $\\mathrm{Ca^{2+}}$ because calcium atoms are big ignores that these are ions with identical electron counts.',
            },
            {
              question: 'Using core electrons only, what is the effective nuclear charge felt by a valence electron of phosphorus ($Z = 15$)?',
              options: ['15', '10', '5', '3'],
              answer: 2,
              explanation:
                'P is $[\\mathrm{Ne}]\\,3s^2 3p^3$: 10 core electrons, so $Z_\\mathrm{eff} \\approx 15 - 10 = 5$. Subtracting all other electrons (14) would give 1, and "3" counts the $3p$ electrons instead. Slater\'s rules refine this to about 4.8.',
            },
            {
              question: 'Potassium has more electrons than sodium and also more than chlorine. Which statement about the radii is correct?',
              options: [
                'K is larger than both, because it has the most electrons',
                'K is larger than Na because of an extra shell; Cl is smaller than Na because of higher Z_eff in the same shell',
                'Cl is the largest because it has the highest Z_eff',
                'Na and Cl are the same size because they are in the same period',
              ],
              answer: 1,
              explanation:
                'Down a group a new shell (larger $n$) makes K bigger than Na. Across period 3 the shell is the same while $Z_\\mathrm{eff}$ rises from about 1 to 7, so Cl ($102\\ \\mathrm{pm}$) is smaller than Na ($166\\ \\mathrm{pm}$). Electron count alone predicts nothing; the first option reaches the right ranking for K by the wrong reason.',
            },
          ],
        },
        {
          slug: 'ionisation-energy-and-electron-affinity',
          title: 'Ionisation energy and electron affinity',
          summary:
            'How hard it is to remove or add an electron, the trends across the table and their two famous exceptions, and how successive ionisation energies reveal the number of valence electrons.',
          estimatedMinutes: 105,
          objectives: [
            'Define first and successive ionisation energies and electron affinity, with signs',
            'Explain the general trends in first ionisation energy across a period and down a group',
            'Explain the dips at boron and oxygen from electron configurations',
            'Identify an element\'s group from its successive ionisation energies',
            'Relate these trends to metallic and non-metallic behaviour',
          ],
          concepts: [
            'First ionisation energy: X(g) → X⁺(g) + e⁻',
            'Successive ionisation energies',
            'The jump at the core',
            'Dips at group 13 and group 16',
            'Electron affinity: X(g) + e⁻ → X⁻(g)',
            'Metallic character',
            'Periodic trend as competition of Z_eff and n',
          ],
          explanation: `The **first ionisation energy** $IE_1$ is the energy needed to remove the most loosely held electron from a gaseous atom: $\\mathrm{X(g)} \\rightarrow \\mathrm{X^+(g)} + e^-$. It is always positive (removing an electron costs energy) and is tabulated in $\\mathrm{kJ\\,mol^{-1}}$. It follows the radius trend in reverse, for the same reason: an electron held by a larger $Z_\\mathrm{eff}$ at a smaller distance is harder to remove. So **$IE_1$ rises across a period and falls down a group**. Helium ($2372\\ \\mathrm{kJ\\,mol^{-1}}$) is the hardest atom to ionise; caesium among the easiest.

\`\`\`interactive
periodic-trends
{"property": "ie", "select": "O", "highlight": ["Be", "B", "N", "O"], "caption": "Colour by ionisation energy. In the plot, each period climbs from an alkali metal (amber) to a noble gas (green). Look closely at period 2: the climb dips twice, at B (after Be) and at O (after N). Click those four outlined elements and read the values, then find the same dips in period 3 (Al and S)."}
\`\`\`

**Two dips with reasons.** Boron ($801$) is lower than beryllium ($900$): boron's outermost electron is in $2p$, which penetrates less and is shielded by the $2s$ pair, so it is easier to remove than one of Be's $2s$ electrons. Oxygen ($1314$) is lower than nitrogen ($1402$): nitrogen's three $2p$ electrons occupy separate orbitals, while oxygen's fourth must pair, and the repulsion inside that doubly occupied orbital makes one electron easier to remove. Both dips repeat in every period, a good sign that the explanation is right.

**Successive ionisation energies** remove one electron after another. They always increase (each electron leaves a more positive ion), but there is a huge jump when the next electron must come from the noble-gas core. For magnesium:

| | $IE_1$ | $IE_2$ | $IE_3$ |
|---|---|---|---|
| Mg ($\\mathrm{kJ\\,mol^{-1}}$) | 738 | 1451 | 7733 |

The jump between $IE_2$ and $IE_3$ (a factor of five) says Mg has two valence electrons, and it is why magnesium forms $\\mathrm{Mg^{2+}}$ and never $\\mathrm{Mg^{3+}}$.

**Electron affinity** is the energy change for adding an electron to a gaseous atom, $\\mathrm{X(g)} + e^- \\rightarrow \\mathrm{X^-(g)}$. For most non-metals it is negative (energy released): chlorine releases $349\\ \\mathrm{kJ\\,mol^{-1}}$. The trend is rougher than for $IE$: halogens are most negative because the added electron completes a $p$ subshell, while noble gases and group 2 have no favourable place for an extra electron. Fluorine releases slightly less than chlorine ($328$) because its small $2p$ shell is crowded. Books disagree on the sign convention, so always check whether a table lists the energy released or the energy change.

**Why it matters.** Low $IE$ means easily forms cations: metals, at the left and bottom of the table. High $IE$ and strongly negative electron affinity mean a tendency to gain electrons: non-metals, top right. Ionic bonding in the next module is built on exactly these numbers. Read the second half of OpenStax 6.5.`,
          resources: [
            ostx('6-5-periodic-variations-in-element-properties', '6.5 Periodic variations in element properties', 'Ionisation energies, successive ionisation energies and electron affinities with tables.', true),
            {
              title: 'NIST Atomic Spectra Database: ionization energies',
              url: 'https://physics.nist.gov/PhysRefData/ASD/ionEnergy.html',
              type: 'dataset',
              cost: 'free',
              provider: 'NIST',
              note: 'Look up any element\'s successive ionisation energies (in eV; multiply by 96.485 for kJ/mol).',
            },
            mit('unit-ii-chemical-bonding-structure/lecture-8', 'Lecture 8, Periodic trends', 'Ionisation energy and electron affinity trends with the exceptions explained.'),
          ],
          exercises: [
            {
              slug: 'successive-ie',
              title: 'Read successive ionisation energies',
              prompt: `An element in period 3 has successive ionisation energies $578$, $1817$, $2745$, $11577$ and $14842\\ \\mathrm{kJ\\,mol^{-1}}$. (a) Identify it and explain your reasoning. (b) Write the ion it forms. (c) Sketch $\\log(IE_n)$ against $n$ for its first five values and mark where the core begins. (d) Predict where the big jump would come for sulfur.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The jump comes after the third electron: aluminium, Al³⁺. For S (six valence electrons) the jump is between IE₆ and IE₇.',
            },
            {
              slug: 'explain-the-dips',
              title: 'Explain the dips',
              prompt: `Use the widget's data for period 3 (Na to Ar). (a) List $IE_1$ for each element. (b) Identify the two places where the value falls instead of rising. (c) Explain each dip with orbital diagrams. (d) Is the dip between P and S larger or smaller than between N and O, in absolute and in relative terms? Offer one reason.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Mg 738 → Al 578 (3p electron) and P 1012 → S 1000 (paired 3p electron). The S dip is much smaller (12 versus 88 kJ/mol): the larger 3p orbitals make pairing repulsion weaker.',
            },
            {
              slug: 'ie-and-chemistry',
              title: 'From numbers to chemistry',
              prompt: `Explain in about 150 words, using ionisation energies and electron affinities, why sodium and chlorine react violently to form $\\mathrm{Na^+Cl^-}$, and why the reaction $\\mathrm{Na(g)} + \\mathrm{Cl(g)} \\rightarrow \\mathrm{Na^+(g)} + \\mathrm{Cl^-(g)}$ on its own is actually uphill ($496 - 349 = +147\\ \\mathrm{kJ\\,mol^{-1}}$). What makes the overall formation of solid NaCl favourable? (You will meet the answer, lattice energy, in the next module.)`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does first ionisation energy generally increase across a period?',
              answerOutline: 'Z_eff on the valence electrons rises and the radius shrinks, so the outermost electron is held more strongly.',
            },
            {
              question: 'Why is IE₁ of oxygen lower than that of nitrogen?',
              answerOutline: 'Oxygen\'s fourth 2p electron must pair in an orbital already holding one electron; the extra repulsion makes it easier to remove. Nitrogen\'s three 2p electrons are unpaired.',
            },
            {
              question: 'How do successive ionisation energies reveal the number of valence electrons?',
              answerOutline: 'They rise gradually while valence electrons are removed, then jump sharply when the next electron must come from the core; the number before the jump is the number of valence electrons.',
            },
          ],
          quiz: [
            {
              question: 'An element has $IE_1 = 590$, $IE_2 = 1145$, $IE_3 = 4912$ and $IE_4 = 6491\\ \\mathrm{kJ\\,mol^{-1}}$. Which group is it in?',
              options: ['Group 1', 'Group 13', 'Group 3', 'Group 2'],
              answer: 3,
              explanation:
                'The large jump is between $IE_2$ and $IE_3$ (factor of about 4.3), so two electrons are easy to remove: a group 2 element (these are calcium\'s values). Group 13 would show the jump after the third electron.',
            },
            {
              question: 'Which atom has the higher first ionisation energy, and why: nitrogen or oxygen?',
              options: [
                'Oxygen, because it has the higher nuclear charge',
                'Nitrogen, because oxygen\'s fourth 2p electron is paired and repelled by its partner',
                'Oxygen, because it is smaller',
                'They are equal, because both are in period 2',
              ],
              answer: 1,
              explanation:
                'Measured values are $1402$ (N) and $1314\\ \\mathrm{kJ\\,mol^{-1}}$ (O). The general trend would favour oxygen, which is the tempting wrong answer; the pairing repulsion in oxygen\'s doubly occupied $2p$ orbital outweighs its higher $Z_\\mathrm{eff}$.',
            },
            {
              question: 'What is the difference between ionisation energy and electron affinity?',
              options: [
                'They are the same quantity measured on cations and anions',
                'Ionisation energy is for removing an electron from a gaseous atom (always positive); electron affinity is the energy change for adding one (often negative)',
                'Ionisation energy applies to metals and electron affinity to non-metals',
                'Electron affinity is the ionisation energy of the anion with the opposite sign, and both always have the same size for an element',
              ],
              answer: 1,
              explanation:
                '$IE$: $\\mathrm{X(g)} \\rightarrow \\mathrm{X^+(g)} + e^-$, always endothermic. $EA$: $\\mathrm{X(g)} + e^- \\rightarrow \\mathrm{X^-(g)}$, exothermic for most non-metals. Electron affinity is indeed minus the ionisation energy *of the anion*, but that is a different number from the atom\'s own $IE$ (chlorine: $EA = -349$, $IE_1 = +1251\\ \\mathrm{kJ\\,mol^{-1}}$).',
            },
          ],
        },
      ],
    },
    {
      slug: 'chemical-bonding',
      title: 'Chemical Bonding',
      description:
        'Why atoms bond: ionic lattices held by Coulomb attraction and measured by the Born-Haber cycle, covalent bonds and electronegativity, and the bookkeeping of Lewis structures, formal charge and resonance.',
      lessons: [
        {
          slug: 'ionic-bonding-and-lattice-energy',
          title: 'Ionic bonding and lattice energy',
          summary:
            'Ionic solids are held together by the attraction between ions. Coulomb\'s law predicts which lattices are strongest, and the Born-Haber cycle measures lattice energy from thermochemical data.',
          estimatedMinutes: 105,
          objectives: [
            'Explain why metals and non-metals form ionic compounds and predict common ion charges',
            'Use Coulomb\'s law to rank lattice energies by ion charge and size',
            'Construct a Born-Haber cycle and calculate a lattice energy from it',
            'Relate lattice energy to melting point, hardness and brittleness',
          ],
          concepts: [
            'Ionic bond as electrostatic attraction',
            'Coulomb\'s law: E ∝ q₁q₂/r',
            'Lattice energy',
            'Born-Haber cycle',
            'Sublimation, ionisation, bond dissociation, electron affinity steps',
            'Charge matters more than size',
            'Properties of ionic solids',
          ],
          explanation: `Metals have low ionisation energies; non-metals have high ionisation energies and negative electron affinities. When they react, electrons move from metal to non-metal, giving ions with noble-gas configurations ($\\mathrm{Na^+}$, $\\mathrm{Mg^{2+}}$, $\\mathrm{Cl^-}$, $\\mathrm{O^{2-}}$). But the electron transfer alone is uphill: for sodium and chlorine atoms, $IE_1(\\mathrm{Na}) + EA(\\mathrm{Cl}) = 496 - 349 = +147\\ \\mathrm{kJ\\,mol^{-1}}$. What pays for it is the attraction of the ions for one another in a crystal.

**Coulomb's law.** The potential energy of two charges $q_1$ and $q_2$ a distance $r$ apart is proportional to $q_1q_2/r$. Opposite charges give a negative (stabilising) energy that grows with the charges and with closeness. The **lattice energy** $U$ is the energy needed to separate one mole of an ionic solid into gaseous ions, for example $\\mathrm{NaCl(s)} \\rightarrow \\mathrm{Na^+(g)} + \\mathrm{Cl^-(g)}$. From Coulomb's law:

- **Charge dominates.** MgO ($2+$ and $2-$) has a lattice energy of about $3800\\ \\mathrm{kJ\\,mol^{-1}}$, roughly five times NaCl's. The product of charges is four times larger and the ions are also smaller.
- **Smaller ions, larger U** at equal charges: LiF > NaCl > KBr.

**The Born-Haber cycle.** Lattice energies cannot be measured directly, but Hess's law (which you will meet properly in the thermochemistry module) lets you add up steps that can. Forming NaCl from its elements can be done in one step ($\\Delta H_\\mathrm{f}^\\circ = -411.2\\ \\mathrm{kJ\\,mol^{-1}}$) or by this path, all per mole:

| Step | Process | $\\Delta H$ (kJ) |
|---|---|---|
| Sublimation | $\\mathrm{Na(s)} \\rightarrow \\mathrm{Na(g)}$ | $+107.5$ |
| Ionisation | $\\mathrm{Na(g)} \\rightarrow \\mathrm{Na^+(g)} + e^-$ | $+495.8$ |
| Half dissociation | $\\tfrac12\\mathrm{Cl_2(g)} \\rightarrow \\mathrm{Cl(g)}$ | $+121.3$ |
| Electron affinity | $\\mathrm{Cl(g)} + e^- \\rightarrow \\mathrm{Cl^-(g)}$ | $-348.6$ |
| Lattice formation | $\\mathrm{Na^+(g)} + \\mathrm{Cl^-(g)} \\rightarrow \\mathrm{NaCl(s)}$ | $-U$ |

The two paths must give the same total, so $-411.2 = 107.5 + 495.8 + 121.3 - 348.6 - U$, giving $U = 787\\ \\mathrm{kJ\\,mol^{-1}}$. (Tables differ by a few percent depending on the data and method; OpenStax quotes $769$.) Every step except the last is endothermic or only mildly exothermic: the lattice energy is what makes salt stable.

**Pitfalls.** Lattice energy is defined in some books as the energy *released* when the lattice forms, so check the sign convention. Use *half* the $\\mathrm{Cl_2}$ bond energy, because one formula unit needs one Cl atom. And a salt never consists of molecules: "NaCl" is a ratio in an extended lattice where each ion has six neighbours of opposite charge.

**Properties.** Strong, non-directional attractions explain why ionic solids have high melting points (NaCl $801\\ ^\\circ\\mathrm{C}$, MgO about $2800\\ ^\\circ\\mathrm{C}$) and are hard but brittle: shift one layer by half an ion spacing and like charges meet, and the crystal cleaves. Molten or dissolved, the ions move and conduct electricity.

Read OpenStax 7.1, then the lattice-energy part of 7.5, which works a Born-Haber cycle for CsF.`,
          resources: [
            ostx('7-1-ionic-bonding', '7.1 Ionic bonding', 'Formation of ions, ion charges from configurations, properties of ionic compounds.', true),
            ostx('7-5-strengths-of-ionic-and-covalent-bonds', '7.5 Strengths of ionic and covalent bonds', 'Lattice energy, Coulomb\'s law and a fully worked Born-Haber cycle for CsF.'),
            mit('unit-ii-chemical-bonding-structure/lecture-9-periodic-table-ionic-and-covalent-bonds', 'Lecture 9, Periodic table; ionic and covalent bonds', 'The energetics of forming an ionic bond, with a Coulomb-energy calculation for a single NaCl pair.'),
          ],
          exercises: [
            {
              slug: 'rank-lattice-energies',
              title: 'Rank lattice energies',
              prompt: `Rank by lattice energy, largest first, and justify each ranking from Coulomb's law: (a) NaF, NaCl, NaBr, NaI; (b) NaCl, $\\mathrm{MgCl_2}$, MgO, $\\mathrm{Al_2O_3}$ (think about charges first); (c) KF, CaO, ScN. Then predict which of NaCl and MgO has the higher melting point and explain.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Charge product first, then size. (a) NaF > NaCl > NaBr > NaI. (c) ScN (3+, 3−) > CaO (2+, 2−) > KF (1+, 1−).',
            },
            {
              slug: 'born-haber-cacl2',
              title: 'Born-Haber cycle for CaCl₂',
              prompt: `Calculate the lattice energy of $\\mathrm{CaCl_2}$ from: $\\Delta H_\\mathrm{f}^\\circ(\\mathrm{CaCl_2, s}) = -795.8$; sublimation of Ca $+178.2$; $IE_1(\\mathrm{Ca}) = +589.8$; $IE_2(\\mathrm{Ca}) = +1145.4$; bond dissociation of $\\mathrm{Cl_2}$ $+242.6$ (for the whole molecule); $EA(\\mathrm{Cl}) = -348.6$ (all $\\mathrm{kJ\\,mol^{-1}}$). Draw the cycle as an energy diagram. Then explain why $\\mathrm{CaCl}$ (with $\\mathrm{Ca^+}$) does not form even though making $\\mathrm{Ca^+}$ costs less than making $\\mathrm{Ca^{2+}}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Two Cl atoms need the full 242.6 and two electron affinities (2 × −348.6). U = 178.2 + 589.8 + 1145.4 + 242.6 − 697.2 + 795.8 = 2254.6 kJ/mol. The much larger lattice energy of the 2+ salt more than repays the second ionisation energy.',
            },
            {
              slug: 'why-brittle',
              title: 'Why are salts brittle?',
              prompt: `In about 150 words, with a sketch of two layers of a NaCl-type lattice before and after a small shear, explain why ionic crystals are hard yet brittle while metals bend. Then explain why solid NaCl does not conduct electricity but molten NaCl and salt water do.`,
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'If transferring an electron from Na to Cl costs energy, why does NaCl form?',
              answerOutline: 'The lattice energy released when gaseous ions assemble into the crystal (about 787 kJ/mol) far exceeds the +147 kJ/mol cost of the electron transfer and the other steps, so the overall formation is strongly exothermic.',
            },
            {
              question: 'Why is MgO\'s lattice energy roughly five times NaCl\'s?',
              answerOutline: 'Coulomb energy scales with q₁q₂/r: the charge product is 4 instead of 1, and the ions are smaller, so r is shorter.',
            },
            {
              question: 'Why does a Born-Haber cycle use half the Cl₂ bond energy for NaCl?',
              answerOutline: 'One formula unit of NaCl needs one Cl atom, and breaking one Cl₂ molecule gives two; per mole of NaCl only half a mole of Cl₂ is dissociated.',
            },
          ],
          quiz: [
            {
              question: 'Use these data ($\\mathrm{kJ\\,mol^{-1}}$) to find the lattice energy of KCl: sublimation of K $+89.0$; $IE_1(\\mathrm{K}) = +418.8$; $\\tfrac12 D(\\mathrm{Cl_2}) = +121.3$; $EA(\\mathrm{Cl}) = -348.6$; $\\Delta H_\\mathrm{f}^\\circ(\\mathrm{KCl}) = -436.5$.',
              options: ['$717\\ \\mathrm{kJ\\,mol^{-1}}$', '$-156\\ \\mathrm{kJ\\,mol^{-1}}$', '$838\\ \\mathrm{kJ\\,mol^{-1}}$', '$1414\\ \\mathrm{kJ\\,mol^{-1}}$'],
              answer: 0,
              explanation:
                '$-436.5 = 89.0 + 418.8 + 121.3 - 348.6 - U$, so $U = 717\\ \\mathrm{kJ\\,mol^{-1}}$. Dropping the sign of $\\Delta H_\\mathrm{f}^\\circ$ gives $-156$; using the full bond energy of $\\mathrm{Cl_2}$ gives $838$; treating the electron affinity as positive gives $1414$.',
            },
            {
              question: 'Which compound has the largest lattice energy?',
              options: ['NaCl', 'KBr', 'MgO', 'NaF'],
              answer: 2,
              explanation:
                'MgO has a charge product of $2 \\times 2 = 4$ against 1 for the others, and small ions. Among the $1+/1-$ salts NaF would win (smallest ions), which is the tempting choice if you look only at size.',
            },
            {
              question: 'A white solid melts at $1400\\ ^\\circ\\mathrm{C}$, does not conduct as a solid, conducts when molten, and shatters when struck. What best explains this combination?',
              options: [
                'It is a molecular solid with strong covalent bonds inside each molecule',
                'It is a metal with a high melting point',
                'It is an ionic solid: strong non-directional attractions, ions fixed in the solid but mobile in the melt, and like charges meeting when layers shift',
                'It is a covalent network solid such as diamond',
              ],
              answer: 2,
              explanation:
                'Every property points to ions: high melting point (large lattice energy), conduction only when ions can move, brittleness when shifted layers bring like charges together. A network solid such as diamond is also hard and high-melting but does not conduct when molten; a metal conducts as a solid.',
            },
          ],
        },
        {
          slug: 'covalent-bonds-and-electronegativity',
          title: 'Covalent bonds, electronegativity and bond polarity',
          summary:
            'Atoms that share electrons form covalent bonds with characteristic lengths and energies. Electronegativity differences make bonds polar and run continuously from pure covalent to ionic.',
          estimatedMinutes: 100,
          objectives: [
            'Explain covalent bonding with the energy-distance curve of H₂',
            'Relate bond order, bond length and bond energy',
            'Define electronegativity, describe its periodic trend and use differences to classify bonds',
            'Assign partial charges and draw bond dipoles',
            'Distinguish a polar bond from a polar molecule',
          ],
          concepts: [
            'Shared electron pair',
            'Potential-energy curve and bond length',
            'Bond energy (bond dissociation enthalpy)',
            'Single, double, triple bonds',
            'Electronegativity (Pauling scale)',
            'Polar covalent bond and partial charges δ+ δ−',
            'Bond dipole',
            'Ionic-covalent continuum',
          ],
          explanation: `Bring two hydrogen atoms together and the energy falls: each electron is attracted to both nuclei, and the electron density piles up between them. Too close, and the nuclei repel. The minimum of the energy curve sits at $74\\ \\mathrm{pm}$ (the **bond length**) and $436\\ \\mathrm{kJ\\,mol^{-1}}$ below separated atoms (the **bond energy**). A **covalent bond** is this shared pair, and it forms between non-metal atoms whose ionisation energies are too high for a full transfer.

**Order, length, strength.** Sharing two or three pairs makes double and triple bonds, which are shorter and stronger: for carbon-carbon bonds, $\\mathrm{C{-}C}$ is $154\\ \\mathrm{pm}$ and $345\\ \\mathrm{kJ\\,mol^{-1}}$, $\\mathrm{C{=}C}$ is $134\\ \\mathrm{pm}$ and $611$, and $\\mathrm{C{\\equiv}C}$ is $120\\ \\mathrm{pm}$ and $837$ (OpenStax Table 7.2). Note that a double bond is not twice as strong as a single bond; the second pair (a π bond, as you will see later) overlaps less well.

**Electronegativity** ($\\chi$) is an atom's ability to attract the shared electrons in a bond. On Pauling's scale fluorine is highest ($3.98$), then oxygen ($3.44$), nitrogen and chlorine ($3.04$, $3.16$); caesium and francium are lowest. It rises across a period and falls down a group, for the same $Z_\\mathrm{eff}$ and size reasons as ionisation energy. Noble gases mostly have no value because they rarely bond.

\`\`\`interactive
periodic-trends
{"property": "en", "select": "F", "plot": false, "highlight": ["C", "N", "O", "F", "Cl"], "caption": "Colour by electronegativity. The darkest corner, top right, holds F, O, N and Cl; the lightest, bottom left, the alkali metals. Click C, N, O and F to read the steps across period 2, then compare H (2.20) with C (2.55): that small difference is why C–H bonds are nearly nonpolar."}
\`\`\`

**Polarity.** When $\\chi$ differs, the shared pair sits closer to the more electronegative atom, which gains a partial negative charge $\\delta-$: in $\\mathrm{H{-}Cl}$, $\\Delta\\chi = 3.16 - 2.20 = 0.96$, so H is $\\delta+$ and Cl is $\\delta-$. The bond has a **dipole**, drawn as an arrow from $\\delta+$ to $\\delta-$. A rough guide (OpenStax uses the same cut-offs): $\\Delta\\chi < 0.4$, essentially nonpolar covalent ($\\mathrm{C{-}H}$, $0.35$); $0.4$ to $1.8$, polar covalent ($\\mathrm{O{-}H}$, $1.24$); above about $1.8$, mostly ionic ($\\mathrm{Na{-}Cl}$, $2.23$). These are points on a **continuum**, not separate kinds of bond: even NaCl has some sharing, and there is no sharp line.

**Bond versus molecule.** A molecule with polar bonds can be nonpolar overall if the bond dipoles cancel by symmetry, as in $\\mathrm{CO_2}$ (linear, two equal dipoles pointing opposite ways). Deciding that needs the molecule's shape, which is the subject of the next module. Mixing up "polar bond" and "polar molecule" is the most common error here.

Read OpenStax 7.2, and keep the electronegativity values of H, C, N, O, F and Cl in your head; they decide most of organic and biological chemistry.`,
          resources: [
            ostx('7-2-covalent-bonding', '7.2 Covalent bonding', 'Formation of covalent bonds, electronegativity, bond polarity and the covalent-ionic continuum.', true),
            phet('molecule-polarity', 'Molecule Polarity', 'Change the electronegativity of the atoms in a diatomic molecule and watch the partial charges and the bond dipole.'),
            mit('unit-ii-chemical-bonding-structure/lecture-9-periodic-table-ionic-and-covalent-bonds', 'Lecture 9, Periodic table; ionic and covalent bonds', 'Covalent bond formation and the energy-distance curve.'),
          ],
          exercises: [
            {
              slug: 'classify-bonds',
              title: 'Classify bonds',
              prompt: `Using Pauling electronegativities (the widget, or H 2.20, C 2.55, N 3.04, O 3.44, F 3.98, Na 0.93, Mg 1.31, Si 1.90, S 2.58, Cl 3.16, K 0.82, Br 2.96), compute $\\Delta\\chi$ and classify each bond as nonpolar covalent, polar covalent or ionic: C–H, C–O, N–H, O–H, Si–Cl, S–H, Mg–O, K–Br, F–F. For each polar bond, mark $\\delta+$ and $\\delta-$. Rank the polar covalent bonds by polarity.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'O–H 1.24 is the most polar of the covalent ones listed; C–H 0.35 and S–H 0.38 are nearly nonpolar; Mg–O 2.13 and K–Br 2.14 are ionic; F–F is 0.',
            },
            {
              slug: 'length-and-strength',
              title: 'Bond order, length and energy',
              prompt: `From OpenStax Table 7.2/7.3, tabulate length and energy for C–C, C=C, C≡C, C–O, C=O, C≡O, C–N, C=N, C≡N. (a) Plot energy against length; describe the relationship. (b) Is a C=C bond twice as strong as C–C? Is C≡N three times as strong as C–N? (c) Explain in two sentences why bond energy rises with order but less than proportionally.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'C=C 611 is 1.77 × C–C 345; C≡N 891 is 3.07 × C–N 290 (an unusual case because the C–N single bond is weak). Additional pairs are π bonds with less effective sideways overlap.',
            },
            {
              slug: 'continuum-essay',
              title: 'The ionic-covalent continuum',
              prompt: `Write about 200 words arguing that "ionic" and "covalent" are ends of a continuum rather than two kinds of bond. Use at least three of these examples with $\\Delta\\chi$ values: $\\mathrm{Cl_2}$, HCl, HF, LiF, $\\mathrm{AlCl_3}$ (which sublimes at only $180\\ ^\\circ\\mathrm{C}$ despite being a metal chloride). Say what the 1.8 cut-off is useful for and where it misleads.`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What sets the bond length of H₂?',
              answerOutline: 'The minimum of the potential-energy curve, where attraction of the electrons to both nuclei is balanced by nucleus-nucleus (and electron-electron) repulsion.',
            },
            {
              question: 'How does electronegativity vary across the periodic table and why?',
              answerOutline: 'It increases across a period (rising Z_eff, smaller atoms) and decreases down a group (valence electrons farther away); F is highest.',
            },
            {
              question: 'Can a molecule with polar bonds be nonpolar? Give an example.',
              answerOutline: 'Yes, if the bond dipoles cancel by symmetry: CO₂ (linear), CCl₄ (tetrahedral), BF₃ (trigonal planar).',
            },
          ],
          quiz: [
            {
              question: 'Which bond is the most polar? (H 2.20, C 2.55, N 3.04, O 3.44, F 3.98)',
              options: ['C–H', 'N–H', 'O–H', 'H–F'],
              answer: 3,
              explanation:
                '$\\Delta\\chi$ is $0.35$ (C–H), $0.84$ (N–H), $1.24$ (O–H) and $1.78$ (H–F). The largest difference gives the most polar bond: H–F. O–H is highly polar too, but less so.',
            },
            {
              question: 'Which statement about $\\mathrm{CO_2}$ is correct?',
              options: [
                'Its bonds are nonpolar because C and O are both non-metals',
                'Its bonds are polar, but the molecule is nonpolar because the two bond dipoles cancel',
                'Its bonds are polar, so the molecule must be polar',
                'It is ionic because $\\Delta\\chi$ exceeds 0.4',
              ],
              answer: 1,
              explanation:
                'Each C=O bond is polar ($\\Delta\\chi = 0.89$), but $\\mathrm{CO_2}$ is linear, so the two equal dipoles point in opposite directions and cancel. "Polar bonds, so polar molecule" ignores geometry; "non-metals, so nonpolar" ignores electronegativity.',
            },
            {
              question: 'Bond lengths: C–C 154 pm, C=C 134 pm, C≡C 120 pm. What does this pattern show?',
              options: [
                'More shared pairs pull the atoms closer and make the bond stronger',
                'Triple bonds are longest because they hold the most electrons',
                'Bond length does not depend on bond order',
                'Double bonds are exactly twice as strong as single bonds',
              ],
              answer: 0,
              explanation:
                'More electron density between the nuclei pulls them together: higher bond order means shorter and stronger bonds (345, 611 and $837\\ \\mathrm{kJ\\,mol^{-1}}$). The energies rise less than proportionally, so a double bond is not twice a single.',
            },
          ],
        },
        {
          slug: 'lewis-structures',
          title: 'Lewis structures',
          summary:
            'A systematic way to draw where the valence electrons are in a molecule or ion: count, connect, complete octets, then form multiple bonds. Includes organic molecules and the octet-rule exceptions.',
          estimatedMinutes: 115,
          objectives: [
            'Count the valence electrons of a molecule or polyatomic ion',
            'Draw Lewis structures by a reliable step-by-step method, including multiple bonds',
            'Draw Lewis structures of small organic molecules from their condensed formulas',
            'Recognise and draw the three kinds of octet-rule exception',
          ],
          concepts: [
            'Lewis symbols and valence electrons',
            'Octet (duet for H)',
            'Bonding pairs and lone pairs',
            'Central atom: least electronegative, never H',
            'Multiple bonds from lone pairs',
            'Electron-deficient molecules (BF₃)',
            'Odd-electron molecules (NO)',
            'Expanded valence shells (SF₆, PCl₅)',
          ],
          explanation: `A **Lewis structure** shows every valence electron in a molecule as a bond (a shared pair, drawn as a line) or a **lone pair** (dots). Main-group atoms tend to end with eight valence electrons around them, the **octet**, because that fills the $s$ and $p$ subshells of the valence shell; hydrogen needs two.

**The method.**

1. **Count** valence electrons: add the group electrons of all atoms, add one per negative charge, subtract one per positive charge.
2. **Skeleton.** Put the least electronegative atom in the centre (never H, which forms one bond). Connect every outer atom to it with a single bond (2 electrons each).
3. **Complete the outer atoms'** octets with lone pairs.
4. **Place leftovers** on the central atom.
5. **If the central atom lacks an octet**, move lone pairs from outer atoms into multiple bonds until it has one.

**Worked example: HCN.** Electrons: $1 + 4 + 5 = 10$. Skeleton H–C–N uses 4. Give N three lone pairs (6): all 10 used, but C has only 4 electrons. Move two of N's lone pairs into bonds: $\\mathrm{H{-}C{\\equiv}N{:}}$. Now C has 8 (four bonds), N has 8 (three bonds and one lone pair), H has 2. Always finish by checking the total and every octet.

**Organic molecules** follow from carbon's four bonds, nitrogen's three plus one lone pair, oxygen's two plus two lone pairs, and hydrogen's one. Methanol $\\mathrm{CH_3OH}$ has a C bonded to three H and an O, which carries the last H and two lone pairs. Ethene $\\mathrm{C_2H_4}$ needs a C=C double bond; ethyne $\\mathrm{C_2H_2}$ a triple bond. Condensed formulas such as $\\mathrm{CH_3COOH}$ tell you the connectivity.

**Exceptions.**

- **Too few electrons**: boron and beryllium compounds such as $\\mathrm{BF_3}$ (B has only 6). Drawing B=F double bonds would give B an octet but put positive formal charge on fluorine (next lesson), so the 6-electron structure is preferred; the electron deficiency is why $\\mathrm{BF_3}$ eagerly accepts a lone pair from $\\mathrm{NH_3}$.
- **Odd number of electrons**: NO has 11, so one atom must have 7. Such **radicals** are reactive.
- **More than eight**: atoms from period 3 down can carry 10 or 12 electrons, as in $\\mathrm{PCl_5}$ and $\\mathrm{SF_6}$. The usual explanation is size: a larger central atom has room for more neighbours. (The old story that empty $3d$ orbitals are used has been shown to be largely wrong, though you will still see it.) Period 2 atoms never exceed an octet.

**Common mistakes.** Miscounting electrons for ions (forgetting the charge), putting H or a highly electronegative atom in the centre, giving carbon five bonds, and using lone pairs from the central atom to make multiple bonds. A structure is a bookkeeping model: it says nothing yet about shape, which comes from VSEPR in the next module.

Read OpenStax 7.3 and work its examples on paper before the exercises.`,
          resources: [
            ostx('7-3-lewis-symbols-and-structures', '7.3 Lewis symbols and structures', 'The step-by-step method with many worked examples, and the three octet exceptions.', true),
            mit('unit-ii-chemical-bonding-structure/lecture-10', 'Lecture 10, Introduction to Lewis structures', 'Drawing Lewis structures, with formal charge introduced.'),
            mit('unit-ii-chemical-bonding-structure/lecture-11', 'Lecture 11, Lewis structures: breakdown of the octet rule', 'Radicals, electron-deficient molecules and expanded octets.'),
          ],
          exercises: [
            {
              slug: 'draw-lewis-structures',
              title: 'Draw Lewis structures',
              prompt: `Draw Lewis structures, showing every lone pair, for: $\\mathrm{NH_3}$, $\\mathrm{CO_2}$, $\\mathrm{H_2CO}$ (formaldehyde), $\\mathrm{NH_4^+}$, $\\mathrm{ClO_3^-}$ (Cl central), $\\mathrm{N_2}$, $\\mathrm{C_2H_4}$ and $\\mathrm{CH_3OH}$. For each state the total number of valence electrons and check every octet.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Electron counts: 8, 16, 12, 8, 26, 10, 12, 14. ClO₃⁻ has three Cl–O single bonds and one lone pair on Cl in the octet-only structure.',
            },
            {
              slug: 'organic-lewis',
              title: 'Organic Lewis structures',
              prompt: `Draw complete Lewis structures for acetic acid ($\\mathrm{CH_3COOH}$), acetonitrile ($\\mathrm{CH_3CN}$), methylamine ($\\mathrm{CH_3NH_2}$) and acetone ($\\mathrm{CH_3COCH_3}$). For each, count bonding pairs and lone pairs and identify every multiple bond. Then draw two different structures (isomers) with formula $\\mathrm{C_2H_6O}$ and name what distinguishes them.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'C₂H₆O: ethanol CH₃CH₂OH (an O–H bond) and dimethyl ether CH₃OCH₃ (O between the carbons). Same formula, different connectivity.',
            },
            {
              slug: 'octet-exceptions',
              title: 'Octet exceptions',
              prompt: `Draw Lewis structures for $\\mathrm{BCl_3}$, $\\mathrm{NO_2}$, $\\mathrm{SF_4}$, $\\mathrm{XeF_4}$ and $\\mathrm{I_3^-}$. Classify each as electron deficient, odd-electron or expanded valence. Then explain why $\\mathrm{NCl_5}$ does not exist but $\\mathrm{PCl_5}$ does, and why $\\mathrm{NO_2}$ molecules pair up to form $\\mathrm{N_2O_4}$.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'SF₄ has 34 electrons (S has 10: four bonds and one lone pair); XeF₄ 36 (Xe has 12); I₃⁻ 22 (central I has 10). N is too small to hold five neighbours. NO₂ has 17 electrons; pairing the unpaired electrons forms an N–N bond.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you choose the central atom?',
              answerOutline: 'Usually the least electronegative atom that can form the most bonds (never H, rarely F); in oxoacids and oxoanions the non-oxygen atom.',
            },
            {
              question: 'When you run out of electrons and the central atom lacks an octet, what do you do?',
              answerOutline: 'Convert lone pairs on adjacent outer atoms into shared pairs, forming double or triple bonds, until the central atom has an octet (unless it is B or Be, which can stay electron deficient).',
            },
            {
              question: 'Why can sulfur have 12 electrons around it in SF₆ while oxygen never exceeds 8?',
              answerOutline: 'Sulfur is larger and can fit six neighbours; period 2 atoms are small and have only 2s and 2p valence orbitals. (The 3d-orbital explanation is now considered largely incorrect.)',
            },
          ],
          quiz: [
            {
              question: 'How many valence electrons are in the sulfate ion, $\\mathrm{SO_4^{2-}}$?',
              options: ['30', '32', '24', '34'],
              answer: 1,
              explanation:
                'S has 6 and each O has 6: $6 + 4 \\times 6 = 30$; the $2-$ charge adds 2, giving 32. Forgetting the charge gives 30; subtracting it gives 28 (not offered) and adding it twice 34.',
            },
            {
              question: 'In the Lewis structure of HCN, how many lone pairs are there in total?',
              options: ['0', '1', '2', '4'],
              answer: 1,
              explanation:
                '$\\mathrm{H{-}C{\\equiv}N{:}}$ uses 8 of the 10 valence electrons in four bonds (one single, one triple), leaving one lone pair, on nitrogen. Four lone pairs would come from stopping after step 3 with single bonds only, leaving carbon with half an octet.',
            },
            {
              question: 'Which molecule has a central atom with fewer than eight electrons in its best Lewis structure?',
              options: ['$\\mathrm{NH_3}$', '$\\mathrm{SF_6}$', '$\\mathrm{CO_2}$', '$\\mathrm{BF_3}$'],
              answer: 3,
              explanation:
                'Boron in $\\mathrm{BF_3}$ has three bonds and no lone pairs: six electrons. $\\mathrm{SF_6}$ is the opposite exception (12 around S). $\\mathrm{NH_3}$ and $\\mathrm{CO_2}$ obey the octet rule.',
            },
          ],
        },
        {
          slug: 'formal-charge-and-resonance',
          title: 'Formal charge and resonance',
          summary:
            'Formal charge picks the best of several possible Lewis structures; resonance describes molecules that no single structure can represent, with bond orders in between.',
          estimatedMinutes: 105,
          objectives: [
            'Calculate formal charges and check that they add to the overall charge',
            'Use formal charge to choose among Lewis structures',
            'Draw all resonance structures of a molecule or ion and the resonance hybrid',
            'Compute average bond orders from resonance structures and relate them to measured bond lengths',
            'Explain what resonance does and does not mean physically',
          ],
          concepts: [
            'Formal charge = V − N − B/2',
            'Sum of formal charges equals ion charge',
            'Prefer small formal charges, negative on the more electronegative atom',
            'Resonance structures',
            'Resonance hybrid and delocalisation',
            'Fractional bond order',
            'Formal charge is not oxidation number',
          ],
          explanation: `Often more than one Lewis structure obeys the rules. **Formal charge** is a bookkeeping device for choosing among them. For each atom, assume every bond is shared equally:

$$\\text{formal charge} = V - N - \\tfrac{B}{2},$$

where $V$ is the atom's valence electrons, $N$ the electrons in its lone pairs and $B$ the electrons in its bonds. The formal charges always add up to the overall charge, which is a useful check.

**Choosing a structure.** Prefer the structure with formal charges closest to zero; when some charges are unavoidable, put negative charge on the more electronegative atoms and avoid like charges on neighbours. For $\\mathrm{CO_2}$, $\\mathrm{O{=}C{=}O}$ gives every atom zero, while $\\mathrm{O{\\equiv}C{-}O}$ gives $+1$ on the triply bonded O and $-1$ on the other, so the first wins. For the cyanate ion $\\mathrm{OCN^-}$ (16 electrons), three structures are possible:

| Structure | O | C | N |
|---|---|---|---|
| $\\mathrm{O{=}C{=}N}$ | $0$ | $0$ | $-1$ |
| $\\mathrm{O{-}C{\\equiv}N}$ | $-1$ | $0$ | $0$ |
| $\\mathrm{O{\\equiv}C{-}N}$ | $+1$ | $0$ | $-2$ |

The second is best: smallest charges, with the $-1$ on oxygen, the more electronegative atom. The first contributes too; the third hardly at all.

**Resonance.** Nitrate, $\\mathrm{NO_3^-}$ (24 electrons), needs one N=O double bond, and it could be to any of the three oxygens. These three **resonance structures** differ only in where electrons are drawn, never in where atoms are. The real ion is a single **resonance hybrid**: all three N–O bonds are identical (measured at $124\\ \\mathrm{pm}$, between typical single and double N–O lengths), each with bond order

$$\\frac{\\text{total bonds to O}}{\\text{number of N–O links}} = \\frac{4}{3}.$$

The extra pair is **delocalised** over the whole ion. Ozone ($\\mathrm{O_3}$, bond order $1.5$), carbonate and benzene are other classic cases.

**What resonance is not.** The ion does not flip between structures; no structure exists on its own. The double-headed arrow ($\\leftrightarrow$) means "these drawings together describe one thing", unlike the equilibrium arrow $\\rightleftharpoons$ between two real species. A mule is not a horse one moment and a donkey the next.

**What formal charge is not.** Formal charge assumes perfectly equal sharing, which is false for polar bonds, so it is not the real charge on an atom (that comes from electronegativity), and it is not the oxidation number either (which assumes complete transfer). In $\\mathrm{NH_4^+}$ the formal $+1$ sits on nitrogen, yet nitrogen is the most electron-rich atom in the ion.

A last caution: for some expanded-octet species (sulfate, for example), structures with more double bonds give smaller formal charges but are not supported by calculations; the structure with single bonds and charges is now often preferred. Formal charge is a guide, not a law. Read OpenStax 7.4.`,
          resources: [
            ostx('7-4-formal-charges-and-resonance', '7.4 Formal charges and resonance', 'Formal-charge rules and resonance with worked examples for CO₂, NO₃⁻ and more.', true),
            mit('unit-ii-chemical-bonding-structure/lecture-10', 'Lecture 10, Introduction to Lewis structures', 'Formal charge used to choose between structures (second half of the lecture).'),
            phet('build-a-molecule', 'Build a Molecule', 'Assemble small molecules from atoms; use it to check connectivity before assigning charges.'),
          ],
          exercises: [
            {
              slug: 'formal-charges',
              title: 'Assign formal charges',
              prompt: `Assign formal charges to every atom in: $\\mathrm{NH_4^+}$; $\\mathrm{CO}$ ($\\mathrm{{:}C{\\equiv}O{:}}$); $\\mathrm{H_3O^+}$; $\\mathrm{N_2O}$ in the arrangement N–N–O (draw the two best structures); and $\\mathrm{SCN^-}$ (draw three structures and choose the best). Check that each set sums to the overall charge. Comment on the carbon monoxide result: what does the formal charge say, and which way does the measured (small) dipole actually point?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'In CO, C is −1 and O is +1 formally, the opposite of electronegativity; the real dipole is tiny with C slightly negative. For SCN⁻, S=C=N with −1 on N is the main contributor (N is more electronegative than S).',
            },
            {
              slug: 'resonance-and-bond-order',
              title: 'Resonance and bond order',
              prompt: `Draw all resonance structures and the hybrid for: $\\mathrm{O_3}$, $\\mathrm{CO_3^{2-}}$, $\\mathrm{NO_2^-}$ and the acetate ion $\\mathrm{CH_3COO^-}$. Give the average bond order of the delocalised bonds in each. The C–O bonds in carbonate measure about $129\\ \\mathrm{pm}$; typical C–O and C=O lengths are $143$ and $123\\ \\mathrm{pm}$. Is the measured value consistent with your bond order?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'O₃ 1.5, CO₃²⁻ 4/3, NO₂⁻ 1.5, acetate C–O 1.5. 129 pm sits between 143 and 123, closer to the double-bond value, as a bond order of 1.33 suggests.',
            },
            {
              slug: 'resonance-misconception',
              title: 'Explain resonance to a friend',
              prompt: `A friend says "benzene switches back and forth between two structures with alternating double bonds". In about 150 words, explain what is wrong, citing the evidence (all six C–C bonds are $140\\ \\mathrm{pm}$) and the difference between $\\leftrightarrow$ and $\\rightleftharpoons$. Suggest a better everyday analogy than the mule if you can.`,
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Write the formal-charge formula and say how to check your answer.',
              answerOutline: 'FC = valence electrons − lone-pair electrons − ½ bonding electrons. The formal charges must sum to the molecule\'s or ion\'s overall charge.',
            },
            {
              question: 'Given two valid structures, which do you prefer?',
              answerOutline: 'The one with formal charges closest to zero; if charges remain, the one with negative charge on the more electronegative atom and no like charges on adjacent atoms.',
            },
            {
              question: 'Why are all three N–O bonds in nitrate the same length?',
              answerOutline: 'The real ion is the resonance hybrid: the π electrons are delocalised over all three N–O links, so each has bond order 4/3; no single drawn structure is correct.',
            },
          ],
          quiz: [
            {
              question: 'What is the average N–O bond order in the nitrite ion, $\\mathrm{NO_2^-}$?',
              options: ['1', '1.33', '2', '1.5'],
              answer: 3,
              explanation:
                'Nitrite (18 electrons) has two resonance structures, each with one N=O and one N–O: 3 bonds shared over 2 links, bond order 1.5. 1.33 is the nitrate value (4 bonds over 3 links); 2 and 1 are the bonds in a single resonance structure.',
            },
            {
              question: 'For the cyanate ion $\\mathrm{OCN^-}$, which structure is the best single representation?',
              options: ['$\\mathrm{O{=}C{=}N}$ with $-1$ on N', '$\\mathrm{O{-}C{\\equiv}N}$ with $-1$ on O', '$\\mathrm{O{\\equiv}C{-}N}$ with $+1$ on O and $-2$ on N', 'All three are equally good'],
              answer: 1,
              explanation:
                'The first two both have a single $-1$ charge, but oxygen is more electronegative than nitrogen, so the negative charge belongs on O. The third has larger charges and $+1$ on the most electronegative atom. They are not equal: the hybrid is weighted towards $\\mathrm{O{-}C{\\equiv}N}$.',
            },
            {
              question: 'Which statement about resonance structures of the carbonate ion is correct?',
              options: [
                'The ion flips rapidly between three structures, so the bonds average out over time',
                'One of the three structures is correct and the others are drawing errors',
                'The real ion is a single hybrid with three identical C–O bonds of bond order 4/3',
                'Resonance structures are isomers that can be separated',
              ],
              answer: 2,
              explanation:
                'Resonance structures are partial descriptions of one structure; the electrons are delocalised all the time, and the three bonds are identical. The flipping picture confuses resonance ($\\leftrightarrow$) with an equilibrium between real species ($\\rightleftharpoons$); isomers differ in where atoms are, which resonance structures never do.',
            },
            {
              question: 'What is the formal charge on nitrogen in the ammonium ion, $\\mathrm{NH_4^+}$?',
              options: ['$+1$', '$0$', '$-3$', '$+5$'],
              answer: 0,
              explanation:
                'N has $V = 5$, no lone pairs ($N = 0$) and four bonds ($B = 8$): $5 - 0 - 4 = +1$, matching the ion\'s charge since each H is 0. $-3$ is nitrogen\'s *oxidation number*, which assumes N takes all the bonding electrons; that difference is exactly why the two bookkeeping schemes must not be mixed up.',
            },
          ],
        },
      ],
    },
    {
      slug: 'molecular-shape-and-intermolecular-forces',
      title: 'Molecular Shape and Intermolecular Forces',
      description:
        'From a Lewis structure to a three-dimensional shape with VSEPR, from shape to polarity, the valence-bond picture of hybrid orbitals and π bonds, and the forces between molecules that decide boiling points, vapour pressures and the states of matter.',
      lessons: [
        {
          slug: 'vsepr-electron-domains',
          title: 'VSEPR: electron domains and molecular shape',
          summary:
            'Electron domains around a central atom spread as far apart as possible. Count them to get the electron geometry; ignore the lone pairs to name the molecular shape; let lone pairs squeeze the angles.',
          estimatedMinutes: 105,
          objectives: [
            'Count electron domains on a central atom, treating a multiple bond as one domain',
            'Predict electron geometry and ideal bond angles for two, three and four domains',
            'Name the molecular shape when some domains are lone pairs',
            'Explain why lone pairs reduce bond angles, with NH₃ and H₂O as examples',
          ],
          concepts: [
            'Electron domain (bond, multiple bond or lone pair)',
            'Electron-pair geometry',
            'Molecular geometry (shape)',
            'Linear 180°, trigonal planar 120°, tetrahedral 109.5°',
            'Bent and trigonal pyramidal shapes',
            'Lone-pair repulsion compresses angles',
            'Multiple bonds count once',
          ],
          explanation: `Lewis structures are flat drawings; molecules are not. The **valence-shell electron-pair repulsion** (VSEPR) model predicts shape from one idea: the regions of electron density around a central atom (its **electron domains**) repel one another and settle as far apart as possible. A domain is a lone pair, a single bond, or a double or triple bond: the electrons of a multiple bond all lie between the same two atoms, so it counts **once**.

Maximising the separation of $n$ points on a sphere gives the **electron geometry**:

| Domains | Electron geometry | Ideal angle |
|---|---|---|
| 2 | linear | $180^\\circ$ |
| 3 | trigonal planar | $120^\\circ$ |
| 4 | tetrahedral | $109.5^\\circ$ |

The tetrahedral angle is not $90^\\circ$, as a flat drawing of $\\mathrm{CH_4}$ suggests: in three dimensions four domains can get further apart than a square allows, and the angle where they are all equally spaced is $\\cos^{-1}(-\\tfrac13) = 109.5^\\circ$.

**Molecular shape** describes only where the *atoms* are. Lone pairs still occupy positions in the electron geometry, but you cannot see them, so the name changes. Ammonia has four domains (three bonds and one lone pair): the electron geometry is tetrahedral, the molecular shape **trigonal pyramidal**. Water has four domains (two bonds, two lone pairs): tetrahedral electron geometry, **bent** shape. Sulfur dioxide has three domains on S (two bonds, one lone pair): trigonal planar electron geometry, bent shape.

**Lone pairs squeeze.** A lone pair is held by one nucleus rather than shared between two, so it spreads out closer to the central atom and repels more strongly than a bonding pair. Bond angles shrink as lone pairs are added: $\\mathrm{CH_4}$ $109.5^\\circ$, $\\mathrm{NH_3}$ $106.7^\\circ$, $\\mathrm{H_2O}$ $104.5^\\circ$. Double bonds also repel a little more than single bonds, which is why the H–C–H angle in formaldehyde is about $116^\\circ$ rather than $120^\\circ$.

\`\`\`interactive
vsepr-shapes
{"domains": 4, "lone": 0, "central": "C", "terminal": "H", "different": "Cl", "caption": "Start with CH₄: four domains, tetrahedral, 109.5°. Drag to rotate and convince yourself the angle is not 90°. Now set one lone pair (the shape of NH₃: trigonal pyramidal) and two (H₂O: bent). The electron geometry stays tetrahedral; only the name of the shape changes. Then try three domains and two domains."}
\`\`\`

**Method.** Draw the Lewis structure; count domains on the central atom; read off the electron geometry; place lone pairs; name the shape from the atoms; adjust angles for lone pairs. The commonest error is to name the electron geometry when the shape is asked for ("water is tetrahedral"), or to count a double bond as two domains (which would make $\\mathrm{CO_2}$ tetrahedral instead of linear).

**Where VSEPR stops.** It predicts shapes of main-group molecules very well but says nothing about why bonds form or how strong they are, and it fails for many transition-metal compounds. Its angle adjustments are qualitative. Read OpenStax 7.6 (first half) and play with the PhET Molecule Shapes simulation.`,
          resources: [
            ostx('7-6-molecular-structure-and-polarity', '7.6 Molecular structure and polarity', 'VSEPR theory, electron-pair and molecular geometries, with a step-by-step method.', true),
            phet('molecule-shapes', 'Molecule Shapes', 'Add bonds and lone pairs to a central atom; the "Real molecules" tab compares model angles with measured ones.'),
            mit('unit-ii-chemical-bonding-structure/lecture-12-the-shapes-of-molecules-vsepr-theory', 'Lecture 12, The shapes of molecules: VSEPR theory', 'A full lecture on VSEPR with many examples.'),
          ],
          exercises: [
            {
              slug: 'predict-shapes',
              title: 'Predict shapes',
              prompt: `For each molecule or ion, draw the Lewis structure, count electron domains on the central atom, and give the electron geometry, molecular shape and approximate bond angle: $\\mathrm{BeCl_2}$ (gas), $\\mathrm{BF_3}$, $\\mathrm{SO_2}$, $\\mathrm{CH_2O}$, $\\mathrm{NH_4^+}$, $\\mathrm{PCl_3}$, $\\mathrm{H_2S}$, $\\mathrm{HCN}$, $\\mathrm{NO_3^-}$, $\\mathrm{ClO_2^-}$. Check each with the widget.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'SO₂: 3 domains, bent, a little under 120°. NH₄⁺: tetrahedral. PCl₃: trigonal pyramidal. H₂S: bent (measured 92°, much smaller than water; VSEPR gets the direction right but not the size). NO₃⁻: trigonal planar. ClO₂⁻: 4 domains, bent.',
            },
            {
              slug: 'organic-geometry',
              title: 'Geometry around each atom',
              prompt: `In acetic acid, $\\mathrm{CH_3COOH}$, give the electron geometry and approximate bond angles around each of the two carbons and the two oxygens. Do the same for the nitrogen and both carbons of acetonitrile, $\\mathrm{CH_3CN}$. Sketch each molecule in 3D with wedges and dashes.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'CH₃ carbon: tetrahedral, 109.5°. Carboxyl carbon: trigonal planar, about 120°. The OH oxygen: 4 domains, bent. C≡N carbon: linear, 180°.',
            },
            {
              slug: 'why-lone-pairs-squeeze',
              title: 'Why lone pairs squeeze',
              prompt: `The bond angles in the series $\\mathrm{CH_4}$, $\\mathrm{NH_3}$, $\\mathrm{H_2O}$ are $109.5^\\circ$, $106.7^\\circ$, $104.5^\\circ$. In about 150 words explain the trend with the VSEPR picture of lone-pair repulsion. Then note that $\\mathrm{PH_3}$ ($93.5^\\circ$) and $\\mathrm{H_2S}$ ($92^\\circ$) have much smaller angles than their period-2 analogues, and say honestly whether simple VSEPR can explain that.`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the difference between electron geometry and molecular shape? Give an example where they differ.',
              answerOutline: 'Electron geometry places all domains (bonds and lone pairs); shape names the arrangement of atoms only. NH₃: tetrahedral electron geometry, trigonal pyramidal shape.',
            },
            {
              question: 'Why does a double bond count as one electron domain?',
              answerOutline: 'All its electrons lie in the region between the same two nuclei, so they occupy one direction around the central atom.',
            },
            {
              question: 'Why is the tetrahedral angle 109.5° and not 90°?',
              answerOutline: 'In three dimensions four equally spaced directions point to the corners of a tetrahedron; the angle between any two is cos⁻¹(−1/3) = 109.5°, larger than the 90° of a flat square.',
            },
          ],
          quiz: [
            {
              question: 'What is the molecular shape of $\\mathrm{SO_2}$? (S is central; one S=O and one S–O, or two resonance forms, plus one lone pair on S.)',
              options: ['Bent, with an angle a little under $120^\\circ$', 'Linear', 'Trigonal planar', 'Bent, with an angle near $104.5^\\circ$'],
              answer: 0,
              explanation:
                'S has three domains (two bonds, each counted once, and one lone pair): trigonal planar electron geometry, bent shape, angle slightly under $120^\\circ$ (measured $119^\\circ$). Linear forgets the lone pair; trigonal planar names the electron geometry; $104.5^\\circ$ is the four-domain value of water.',
            },
            {
              question: 'Formaldehyde, $\\mathrm{H_2CO}$, has a C=O double bond and two C–H bonds. What is its electron geometry around carbon?',
              options: ['Tetrahedral, because there are four bonds', 'Trigonal pyramidal', 'Bent', 'Trigonal planar'],
              answer: 3,
              explanation:
                'Three domains (the double bond counts once): trigonal planar, with angles near $120^\\circ$. Counting the double bond as two domains gives the tempting but wrong "tetrahedral".',
            },
            {
              question: 'Ammonia and methane both have four electron domains on the central atom. Which statement is correct?',
              options: [
                'Both are tetrahedral molecules with $109.5^\\circ$ angles',
                'Both have tetrahedral electron geometry, but NH₃ is trigonal pyramidal with smaller angles because its lone pair repels more strongly',
                'NH₃ is trigonal planar because it has three hydrogens',
                'NH₃ has larger angles than CH₄ because the lone pair pushes the hydrogens apart',
              ],
              answer: 1,
              explanation:
                'The lone pair is invisible in the shape, so $\\mathrm{NH_3}$ is a pyramid, and it squeezes the H–N–H angle to $106.7^\\circ$. Counting only atoms (three H) gives "trigonal planar", the classic error of ignoring the lone pair.',
            },
          ],
        },
        {
          slug: 'expanded-octets-and-molecular-polarity',
          title: 'Five and six domains, and molecular polarity',
          summary:
            'Trigonal bipyramids and octahedra, why lone pairs go equatorial, and how to decide from shape and bond dipoles whether a molecule is polar.',
          estimatedMinutes: 105,
          objectives: [
            'Predict shapes for five and six electron domains, placing lone pairs correctly',
            'Explain why lone pairs occupy equatorial positions in a trigonal bipyramid',
            'Decide whether a molecule is polar by adding bond dipoles as vectors',
            'Relate polarity to properties such as solubility and behaviour in an electric field',
          ],
          concepts: [
            'Trigonal bipyramidal: axial and equatorial positions',
            'Seesaw, T-shaped, linear (from five domains)',
            'Octahedral, square pyramidal, square planar',
            'Lone pairs avoid 90° interactions',
            'Dipole moment as a vector sum',
            'Symmetric shapes cancel bond dipoles',
            'Polar and nonpolar molecules',
          ],
          explanation: `Atoms from period 3 down can carry five or six domains.

**Five domains: the trigonal bipyramid.** Three **equatorial** positions lie in a plane at $120^\\circ$; two **axial** positions point up and down at $90^\\circ$ to the plane. The positions are not equivalent: an axial domain has three neighbours at $90^\\circ$, an equatorial one only two. Repulsion is fiercest at $90^\\circ$, so lone pairs, which repel most, go **equatorial**. One lone pair gives a **seesaw** ($\\mathrm{SF_4}$), two a **T-shape** ($\\mathrm{ClF_3}$), three a **linear** molecule ($\\mathrm{XeF_2}$, $\\mathrm{I_3^-}$).

**Six domains: the octahedron.** All six positions are equivalent, at $90^\\circ$ to four neighbours. One lone pair gives a **square pyramid** ($\\mathrm{BrF_5}$); a second goes *opposite* the first, giving **square planar** ($\\mathrm{XeF_4}$).

\`\`\`interactive
vsepr-shapes
{"domains": 5, "lone": 1, "central": "S", "terminal": "F", "different": "Cl", "caption": "This is SF₄: five domains, one lone pair. Rotate it: the lone pair sits in the equatorial plane, and the molecule is a seesaw. Add lone pairs one at a time and watch them fill the equatorial positions (T-shaped, then linear). Then set six domains with two lone pairs: they go opposite each other, leaving square-planar XeF₄. Read the polarity verdict each time."}
\`\`\`

**Molecular polarity.** A molecule is polar when its bond dipoles do not cancel. Treat each bond dipole as an arrow from $\\delta+$ to $\\delta-$ and add the arrows; the sum is the molecule's **dipole moment**. Two consequences:

- **Symmetric shapes with identical outer atoms are nonpolar**: linear $\\mathrm{CO_2}$, trigonal planar $\\mathrm{BF_3}$, tetrahedral $\\mathrm{CCl_4}$, trigonal bipyramidal $\\mathrm{PCl_5}$, octahedral $\\mathrm{SF_6}$, square planar $\\mathrm{XeF_4}$ and linear $\\mathrm{XeF_2}$. Each bond is polar, but the arrows cancel.
- **Lone pairs or different outer atoms usually break the symmetry**: bent $\\mathrm{H_2O}$, pyramidal $\\mathrm{NH_3}$, seesaw $\\mathrm{SF_4}$ are polar, and so is tetrahedral $\\mathrm{CH_3Cl}$, because a C–Cl dipole is not cancelled by three weaker C–H dipoles.

\`\`\`interactive
vsepr-shapes
{"domains": 4, "lone": 0, "central": "C", "terminal": "H", "different": "Cl", "polarity": true, "angles": false, "caption": "CH₃Cl: one terminal atom differs, so the bond dipoles no longer cancel and the dashed arrow shows the net dipole. Switch to 'All H' (methane): the arrow disappears. Move the Cl atom: the net dipole always points towards it. Then try six domains with one different atom."}
\`\`\`

The vector sum can cancel even when bonds are very polar ($\\mathrm{CF_4}$), and a molecule with only weakly polar bonds can still be polar if nothing cancels. Lone pairs contribute dipoles of their own, which is why $\\mathrm{NF_3}$ (bond dipoles pointing to F, lone pair the other way) is much less polar than $\\mathrm{NH_3}$.

**Why polarity matters.** Polar molecules align in an electric field, attract each other more strongly (next lessons) and dissolve in polar solvents such as water ("like dissolves like"). The pitfall is again to judge from bonds alone: always decide the shape first. Read the second half of OpenStax 7.6 and use the PhET Molecule Polarity simulation's 3D tab.`,
          resources: [
            ostx('7-6-molecular-structure-and-polarity', '7.6 Molecular structure and polarity', 'Five and six domains, and the polarity section with dipole vectors.', true),
            phet('molecule-polarity', 'Molecule Polarity', 'The "Real molecules" tab shows dipole moments of real molecules in 3D.'),
            phet('molecule-shapes', 'Molecule Shapes', 'Build five- and six-domain shapes and add lone pairs to see where they go.'),
          ],
          exercises: [
            {
              slug: 'big-domain-shapes',
              title: 'Five- and six-domain shapes',
              prompt: `Draw Lewis structures and predict electron geometry, molecular shape and approximate angles for $\\mathrm{PF_5}$, $\\mathrm{SF_4}$, $\\mathrm{ClF_3}$, $\\mathrm{I_3^-}$, $\\mathrm{SF_6}$, $\\mathrm{BrF_5}$, $\\mathrm{XeF_4}$ and $\\mathrm{ICl_4^-}$. For $\\mathrm{SF_4}$ draw both possible positions of the lone pair (axial and equatorial), count the $90^\\circ$ lone-pair/bond interactions in each, and use the count to justify the observed shape.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Equatorial lone pair: 2 interactions at 90°; axial: 3. I₃⁻ and XeF₂ are linear; ICl₄⁻ is square planar like XeF₄.',
            },
            {
              slug: 'polar-or-not',
              title: 'Polar or not?',
              prompt: `Decide whether each is polar, with a sketch of the bond dipoles: $\\mathrm{CO_2}$, $\\mathrm{SO_2}$, $\\mathrm{BF_3}$, $\\mathrm{NF_3}$, $\\mathrm{CH_2Cl_2}$, $\\mathrm{CCl_4}$, $\\mathrm{PCl_5}$, $\\mathrm{SF_4}$, $\\mathrm{XeF_4}$, $\\mathrm{OCS}$. For $\\mathrm{CH_2Cl_2}$, is it possible to arrange two H and two Cl on a tetrahedron so the dipoles cancel? Use the widget to check.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Polar: SO₂, NF₃, CH₂Cl₂, SF₄, OCS. Nonpolar: CO₂, BF₃, CCl₄, PCl₅, XeF₄. In a tetrahedron any two positions are equivalent, so CH₂Cl₂ is always polar.',
            },
            {
              slug: 'like-dissolves-like',
              title: 'Like dissolves like',
              prompt: `Predict, with reasons from polarity, which liquid in each pair mixes better with water: hexane ($\\mathrm{C_6H_{14}}$) or ethanol; $\\mathrm{CCl_4}$ or $\\mathrm{CH_2Cl_2}$; acetone or toluene. Then explain in about 100 words why iodine ($\\mathrm{I_2}$) dissolves much better in hexane than in water.`,
              kind: 'writing',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why do lone pairs take equatorial positions in a trigonal bipyramid?',
              answerOutline: 'An equatorial site has two neighbours at 90°, an axial site three; lone pairs repel most strongly, so they take the site with fewer 90° interactions.',
            },
            {
              question: 'Why is XeF₄ nonpolar although each Xe–F bond is polar?',
              answerOutline: 'It is square planar (two lone pairs opposite each other); the four bond dipoles point to the corners of a square and cancel.',
            },
            {
              question: 'Give the two-step procedure for deciding whether a molecule is polar.',
              answerOutline: 'First determine the shape (Lewis structure, then VSEPR). Then add the bond dipoles (and consider lone pairs) as vectors; a nonzero sum means polar.',
            },
          ],
          quiz: [
            {
              question: 'What is the shape of $\\mathrm{ClF_3}$ (three Cl–F bonds and two lone pairs on Cl)?',
              options: ['Trigonal planar', 'Trigonal pyramidal', 'Seesaw', 'T-shaped'],
              answer: 3,
              explanation:
                'Five domains: the two lone pairs take equatorial positions, leaving the three F atoms in a T (two axial, one equatorial). Trigonal planar ignores the lone pairs; trigonal pyramidal is the four-domain shape with one lone pair; seesaw has only one lone pair.',
            },
            {
              question: 'Which molecule is polar?',
              options: ['$\\mathrm{SF_6}$', '$\\mathrm{PCl_5}$', '$\\mathrm{SF_4}$', '$\\mathrm{XeF_4}$'],
              answer: 2,
              explanation:
                '$\\mathrm{SF_4}$ is a seesaw: the equatorial lone pair breaks the symmetry and the bond dipoles do not cancel. Octahedral $\\mathrm{SF_6}$, trigonal bipyramidal $\\mathrm{PCl_5}$ and square planar $\\mathrm{XeF_4}$ are symmetric with identical outer atoms, so their dipoles cancel.',
            },
            {
              question: 'A student says: "$\\mathrm{CCl_4}$ has four very polar C–Cl bonds, so it must be a polar molecule." What is wrong?',
              options: [
                'Nothing; polar bonds always make a polar molecule',
                'C–Cl bonds are nonpolar',
                'The tetrahedral arrangement makes the four equal bond dipoles cancel, so the molecule is nonpolar',
                'CCl₄ is ionic',
              ],
              answer: 2,
              explanation:
                'Polarity of the molecule is the vector sum of the bond dipoles. In a regular tetrahedron with four identical outer atoms they cancel exactly. The C–Cl bonds are indeed polar ($\\Delta\\chi = 0.61$), so the second option denies a true fact.',
            },
            {
              question: 'In $\\mathrm{XeF_4}$ (six domains, two lone pairs), where are the lone pairs?',
              options: ['Opposite each other, at $180^\\circ$', 'At $90^\\circ$ to each other', 'Both in the equatorial plane at $120^\\circ$', 'One on Xe and one on an F'],
              answer: 0,
              explanation:
                'In an octahedron, two lone pairs as far apart as possible sit trans ($180^\\circ$), leaving the four F atoms in a square plane. At $90^\\circ$ they would repel each other strongly. "Equatorial at $120^\\circ$" mixes in the five-domain geometry.',
            },
          ],
        },
        {
          slug: 'hybridization-and-multiple-bonds',
          title: 'Valence bond theory: hybrid orbitals, σ and π bonds',
          summary:
            'Bonds form where atomic orbitals overlap. Hybrid orbitals (sp, sp², sp³) match the VSEPR geometries; π bonds from side-on p overlap explain double-bond rigidity. The model has limits, shown by O₂.',
          estimatedMinutes: 115,
          objectives: [
            'Describe a covalent bond as the overlap of two half-filled orbitals',
            'Assign sp, sp² or sp³ hybridisation from the number of electron domains',
            'Count σ and π bonds in a molecule',
            'Explain restricted rotation and cis-trans isomerism from π overlap',
            'State a failure of the localised-bond picture (the paramagnetism of O₂) and what explains it',
          ],
          concepts: [
            'Orbital overlap',
            'Hybrid orbitals sp, sp², sp³',
            'Hybridisation matches electron geometry',
            'σ bond: end-on overlap along the axis',
            'π bond: side-on overlap of p orbitals',
            'Double bond = σ + π; triple = σ + 2π',
            'Restricted rotation and cis-trans isomers',
            'Molecular orbital theory for O₂',
          ],
          explanation: `**Valence bond (VB) theory** says a covalent bond forms when an orbital on one atom overlaps an orbital on another and the two electrons pair up in the overlap region. In $\\mathrm{H_2}$ two $1s$ orbitals overlap. But carbon's ground state, $2s^2 2p^2$, has only two half-filled orbitals at $90^\\circ$, while methane has four identical bonds at $109.5^\\circ$. The fix is **hybridisation**: mix carbon's $2s$ and three $2p$ orbitals into four equivalent **$sp^3$** hybrids pointing to the corners of a tetrahedron. Hybrids are a mathematical recombination that matches the observed geometry; they are not a physical process the atom goes through.

The number of hybrids equals the number of electron domains, so hybridisation follows directly from VSEPR:

| Domains | Hybrids | Geometry | Unhybridised $p$ left |
|---|---|---|---|
| 2 | $sp$ | linear | 2 |
| 3 | $sp^2$ | trigonal planar | 1 |
| 4 | $sp^3$ | tetrahedral | 0 |

**σ and π bonds.** Overlap along the line between nuclei (end-on) gives a **σ bond**; every single bond is σ. Leftover $p$ orbitals on neighbouring atoms can overlap side by side, above and below the axis, giving a **π bond**. A double bond is one σ and one π; a triple bond one σ and two π. In ethene each carbon is $sp^2$: three σ bonds in a plane, plus a $p$ orbital perpendicular to it that overlaps with its neighbour's to make the π bond. In ethyne each carbon is $sp$, with two perpendicular π bonds.

**Consequences.** Side-on overlap is weaker than end-on, which is why a double bond is less than twice a single (611 vs $2 \\times 345\\ \\mathrm{kJ\\,mol^{-1}}$). A π bond also locks rotation: twisting one end by $90^\\circ$ would break the $p$ overlap. So 1,2-dichloroethene exists as separate **cis** and **trans** isomers, with different boiling points, while groups joined by a single bond rotate freely. All six atoms of ethene lie in one plane for the same reason.

**Counting.** Acrylonitrile, $\\mathrm{CH_2{=}CH{-}C{\\equiv}N}$, has 3 C–H, 1 C=C, 1 C–C and 1 C≡N: 6 σ bonds and $1 + 2 = 3$ π bonds. The carbons are $sp^2$, $sp^2$ and $sp$.

**Limits.** Many books extend the scheme to $sp^3d$ and $sp^3d^2$ for five and six domains; calculations show $d$ orbitals contribute little, so treat those labels as geometry names only. More seriously, VB theory puts all electrons in pairs between two atoms, so it predicts $\\mathrm{O_2}$ (with an O=O double bond) to be diamagnetic. Liquid oxygen is in fact attracted to a magnet: $\\mathrm{O_2}$ has two unpaired electrons. **Molecular orbital theory**, in which electrons occupy orbitals spread over the whole molecule, gets this right and also explains resonance without drawing several structures. Section 8.4 of OpenStax introduces it; it is optional here, but read the $\\mathrm{O_2}$ example.

Common mistakes: counting a triple bond as three σ bonds, assigning hybridisation from the number of *atoms* attached instead of domains (the N in $\\mathrm{NH_3}$ is $sp^3$, not $sp^2$), and forgetting lone pairs occupy hybrids too. Read OpenStax 8.1 to 8.3.`,
          resources: [
            ostx('8-2-hybrid-atomic-orbitals', '8.2 Hybrid atomic orbitals', 'sp, sp² and sp³ hybrids with pictures, and how to assign them.', true),
            ostx('8-3-multiple-bonds', '8.3 Multiple bonds', 'σ and π bonds in ethene and ethyne, restricted rotation, and resonance in this picture.'),
            ostx('8-4-molecular-orbital-theory', '8.4 Molecular orbital theory', 'Optional: molecular orbitals of diatomic molecules and the paramagnetism of O₂.'),
            mit('unit-ii-chemical-bonding-structure/lecture-14', 'Lecture 14, Valence bond theory and hybridization', 'Hybridisation and σ/π bonding with organic examples.'),
          ],
          exercises: [
            {
              slug: 'assign-hybridisation',
              title: 'Assign hybridisation',
              prompt: `Give the hybridisation of every non-hydrogen atom and count σ and π bonds in: ethanol $\\mathrm{CH_3CH_2OH}$, acetaldehyde $\\mathrm{CH_3CHO}$, acetonitrile $\\mathrm{CH_3CN}$, carbon dioxide, and acetic acid $\\mathrm{CH_3COOH}$. Remember that lone pairs count as domains (so the O in ethanol is $sp^3$).`,
              kind: 'problem',
              difficulty: 1,
              hint: 'CH₃CN: CH₃ carbon sp³, nitrile carbon sp, N sp; 5 σ and 2 π. CO₂: C sp; 2 σ, 2 π. Acetic acid: 7 σ, 1 π.',
            },
            {
              slug: 'cis-trans',
              title: 'Cis and trans',
              prompt: `(a) Draw cis- and trans-1,2-dichloroethene ($\\mathrm{CHCl{=}CHCl}$). Which is polar? (b) Their boiling points are $60.3\\ ^\\circ\\mathrm{C}$ and $47.5\\ ^\\circ\\mathrm{C}$. Match each to its isomer and explain. (c) Explain with a sketch of the $p$ orbitals why the two cannot interconvert at room temperature, while the two ends of 1,2-dichloroethane ($\\mathrm{CH_2Cl{-}CH_2Cl}$) rotate freely.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Cis is polar (dipoles add) and boils higher (60.3 °C); trans is nonpolar (dipoles cancel). Rotation about C=C would break the π overlap, costing roughly the π bond energy.',
            },
            {
              slug: 'oxygen-paramagnetism',
              title: 'The oxygen problem',
              prompt: `Read the $\\mathrm{O_2}$ example in OpenStax 8.4. (a) Draw the Lewis structure of $\\mathrm{O_2}$ and say what it predicts about magnetism. (b) Fill the molecular-orbital diagram for $\\mathrm{O_2}$ (12 valence electrons) and find the bond order and the number of unpaired electrons. (c) In about 100 words, say what this tells you about the status of Lewis structures and VB theory: wrong, or useful approximations?`,
              kind: 'reading',
              difficulty: 3,
              hint: 'MO bond order (8 − 4)/2 = 2, matching the double bond, but the last two electrons occupy two degenerate π* orbitals singly: two unpaired electrons, paramagnetic.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you decide the hybridisation of an atom?',
              answerOutline: 'Count electron domains (bonds, with multiple bonds counted once, plus lone pairs): 2 → sp, 3 → sp², 4 → sp³.',
            },
            {
              question: 'What is the difference between a σ and a π bond, and which bonds contain each?',
              answerOutline: 'σ: overlap along the internuclear axis (all single bonds, and one bond in each multiple bond). π: side-on overlap of parallel p orbitals above and below the axis (the second and third bonds of double and triple bonds).',
            },
            {
              question: 'What observation does VB theory with Lewis structures fail to explain for O₂, and what theory explains it?',
              answerOutline: 'O₂ is paramagnetic (two unpaired electrons) although its Lewis structure pairs every electron; molecular orbital theory explains it.',
            },
          ],
          quiz: [
            {
              question: 'How many σ and π bonds are in acrylonitrile, $\\mathrm{CH_2{=}CH{-}C{\\equiv}N}$?',
              options: ['6 σ and 3 π', '9 σ and 0 π', '6 σ and 2 π', '7 σ and 3 π'],
              answer: 0,
              explanation:
                'Every bond between two atoms has exactly one σ: 3 C–H, C=C, C–C and C≡N give 6 σ. The extra bonds are π: one in C=C and two in C≡N, so 3 π. Counting each line as σ gives 9 σ; treating the triple bond as having one π gives 2.',
            },
            {
              question: 'What is the hybridisation of nitrogen in ammonia, $\\mathrm{NH_3}$?',
              options: ['$sp$', '$sp^2$', '$sp^3d$', '$sp^3$'],
              answer: 3,
              explanation:
                'N has four domains (three bonds and a lone pair), so $sp^3$. Counting only the three attached atoms gives $sp^2$, the classic error of forgetting the lone pair.',
            },
            {
              question: 'Why do cis- and trans-2-butene not interconvert at room temperature, while the two halves of butane rotate freely?',
              options: [
                'The C=C bond is shorter, so the groups bump into each other',
                'Rotating about C=C would break the side-on overlap of the π bond; a σ bond keeps its overlap during rotation',
                'Double bonds are twice as strong as single bonds',
                'The cis isomer is polar and the trans is not',
              ],
              answer: 1,
              explanation:
                'A σ bond is symmetric about the bond axis, so rotation does not change its overlap. The π bond needs the two $p$ orbitals parallel; a $90^\\circ$ twist destroys the overlap, which costs far more energy than is available at room temperature. A double bond is not twice as strong as a single bond, and polarity has nothing to do with rotation.',
            },
          ],
        },
        {
          slug: 'intermolecular-forces',
          title: 'Intermolecular forces',
          summary:
            'Dispersion forces, dipole-dipole forces and hydrogen bonds hold molecules together in liquids and solids. Their strengths explain boiling points, from methane to water.',
          estimatedMinutes: 105,
          objectives: [
            'Distinguish intermolecular forces from chemical bonds and compare their strengths',
            'Explain London dispersion forces and how polarisability, size and shape affect them',
            'Identify dipole-dipole forces and hydrogen bonds, including the requirements for hydrogen bonding',
            'Rank substances by boiling point from their intermolecular forces',
            'Explain the anomalous properties of water',
          ],
          concepts: [
            'Intermolecular versus intramolecular forces',
            'London dispersion forces and polarisability',
            'Molecular size and shape',
            'Dipole-dipole forces',
            'Hydrogen bond: H on N, O or F to a lone pair on N, O or F',
            'Ion-dipole forces',
            'Boiling point as a measure of attraction',
          ],
          explanation: `Covalent bonds hold atoms together *within* molecules; **intermolecular forces** (IMFs) hold molecules to each other. They are much weaker: boiling water takes $40.7\\ \\mathrm{kJ\\,mol^{-1}}$ at $100\\ ^\\circ\\mathrm{C}$, while breaking the two O–H bonds in a water molecule would take about $928$. When water boils, the molecules separate; they do not fall apart into H and O. Every IMF is electrostatic, the attraction of partial charges for each other.

**London dispersion forces** act between all molecules. Electrons move, so at any instant a molecule's charge distribution is slightly lopsided; that temporary dipole induces one in a neighbour, and the two attract. The ease with which an electron cloud is distorted is its **polarisability**, which grows with the number of electrons and the size of the molecule. Hence the halogens go from gases ($\\mathrm{F_2}$, $\\mathrm{Cl_2}$) to a liquid ($\\mathrm{Br_2}$) to a solid ($\\mathrm{I_2}$), and the group 14 hydrides boil at $-161.5$ ($\\mathrm{CH_4}$), $-111.9$ ($\\mathrm{SiH_4}$), $-88$ ($\\mathrm{GeH_4}$) and $-52\\ ^\\circ\\mathrm{C}$ ($\\mathrm{SnH_4}$). **Shape** matters too: long molecules touch along more of their length. n-Pentane boils at $36.1\\ ^\\circ\\mathrm{C}$, its compact, nearly spherical isomer neopentane at $9.5\\ ^\\circ\\mathrm{C}$. Dispersion is often the largest IMF even in polar molecules.

**Dipole-dipole forces** act between polar molecules, which line up $\\delta+$ to $\\delta-$. Among molecules of similar size, polar ones boil higher: acetone ($58$ g/mol, $56\\ ^\\circ\\mathrm{C}$) against butane ($58$ g/mol, $-0.5\\ ^\\circ\\mathrm{C}$).

**Hydrogen bonds** are an especially strong dipole-dipole attraction between an H atom bonded to N, O or F and a lone pair on another N, O or F. The H is nearly a bare proton (tiny and strongly $\\delta+$) and can get very close to the lone pair. The evidence is in the group 16 hydrides: $\\mathrm{H_2S}$ $-60$, $\\mathrm{H_2Se}$ $-41$, $\\mathrm{H_2Te}$ $-2\\ ^\\circ\\mathrm{C}$, rising with size as dispersion predicts, and then water at $+100\\ ^\\circ\\mathrm{C}$, about $160\\ ^\\circ\\mathrm{C}$ above the extrapolated trend. HF and $\\mathrm{NH_3}$ show the same jump. Hydrogen bonds hold DNA's two strands together and give proteins their shapes. In ice each water molecule hydrogen-bonds to four others in an open lattice, which is why ice is less dense than liquid water and floats.

**Ion-dipole forces** between ions and polar molecules are why salts dissolve in water.

**Ranking boiling points.** First compare the *kinds* of force available (hydrogen bonding, then dipole-dipole); then, for similar kinds, compare size (dispersion). Be careful: a large nonpolar molecule can beat a small polar one ($\\mathrm{I_2}$ is a solid while HCl boils at $-85\\ ^\\circ\\mathrm{C}$). The commonest errors are thinking boiling breaks covalent bonds, and calling any molecule with H and O "hydrogen bonded" (in $\\mathrm{CH_3OCH_3}$ the H atoms are on carbon, so it cannot donate a hydrogen bond to itself).

Read OpenStax 10.1, and compare its boiling-point graphs with the data above.`,
          resources: [
            ostx('10-1-intermolecular-forces', '10.1 Intermolecular forces', 'Dispersion, dipole-dipole and hydrogen bonding with boiling-point data and graphs.', true),
            phet('states-of-matter', 'States of Matter', 'Change temperature and the strength of the attraction between particles and watch solids, liquids and gases form.'),
            mit('unit-ii-chemical-bonding-structure/lecture-12-the-shapes-of-molecules-vsepr-theory', 'Lecture 12, The shapes of molecules', 'Optional: the link between shape, polarity and intermolecular attraction.'),
          ],
          exercises: [
            {
              slug: 'identify-imfs',
              title: 'Identify the forces',
              prompt: `List every intermolecular force present in a pure sample of each substance: $\\mathrm{CH_4}$, $\\mathrm{CH_3Cl}$, $\\mathrm{CH_3OH}$, $\\mathrm{CO_2}$, $\\mathrm{HCN}$, $\\mathrm{CH_3NH_2}$, $\\mathrm{(CH_3)_3N}$, $\\mathrm{HF}$. Then say which of them can hydrogen-bond with water even though they cannot hydrogen-bond with themselves.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'H-bonding with themselves: CH₃OH, CH₃NH₂, HF. Trimethylamine has no N–H but its N lone pair can accept a hydrogen bond from water; CH₃Cl and HCN are polar (dipole-dipole); CH₄ and CO₂ dispersion only.',
            },
            {
              slug: 'rank-boiling-points',
              title: 'Rank boiling points',
              prompt: `Rank each set from lowest to highest boiling point and justify: (a) $\\mathrm{F_2}$, $\\mathrm{Cl_2}$, $\\mathrm{Br_2}$, $\\mathrm{I_2}$; (b) propane, dimethyl ether, ethanol (all about 44 to 46 g/mol); (c) n-pentane, neopentane, n-hexane; (d) HF, HCl, HBr, HI. In (d), explain why HF is out of order but HCl to HI follow dispersion.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(b) propane (−42 °C) < dimethyl ether (−24 °C) < ethanol (78 °C). (c) neopentane < n-pentane < n-hexane. (d) HCl < HBr < HI < HF: hydrogen bonding lifts HF (19.5 °C).',
            },
            {
              slug: 'water-anomaly-graph',
              title: 'The water anomaly',
              prompt: `Plot boiling point against period for the group 14 hydrides ($\\mathrm{CH_4}$ $-161.5$, $\\mathrm{SiH_4}$ $-111.9$, $\\mathrm{GeH_4}$ $-88$, $\\mathrm{SnH_4}$ $-52\\ ^\\circ\\mathrm{C}$) and group 16 hydrides ($\\mathrm{H_2O}$ $100$, $\\mathrm{H_2S}$ $-60$, $\\mathrm{H_2Se}$ $-41$, $\\mathrm{H_2Te}$ $-2\\ ^\\circ\\mathrm{C}$). Extrapolate the group 16 trend back to period 2 to estimate what water "should" boil at without hydrogen bonds. Explain why the group 14 line shows no such anomaly.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Extrapolating H₂Te → H₂Se → H₂S back one period gives roughly −70 to −80 °C. CH₄ has no lone pairs and its H atoms are on carbon, so it cannot hydrogen-bond.',
            },
          ],
          selfAssessment: [
            {
              question: 'When water boils, which bonds or forces are overcome?',
              answerOutline: 'Intermolecular forces (mostly hydrogen bonds plus dispersion) between molecules; the covalent O–H bonds inside each molecule stay intact.',
            },
            {
              question: 'What are the requirements for a hydrogen bond?',
              answerOutline: 'An H atom covalently bonded to N, O or F (the donor) and a lone pair on a nearby N, O or F (the acceptor).',
            },
            {
              question: 'Why does neopentane boil about 27 °C lower than n-pentane although both are C₅H₁₂?',
              answerOutline: 'Same number of electrons, but the compact, nearly spherical neopentane has less surface contact between molecules, so weaker dispersion forces.',
            },
          ],
          quiz: [
            {
              question: 'Which has the highest boiling point: propane, dimethyl ether ($\\mathrm{CH_3OCH_3}$), ethanol ($\\mathrm{CH_3CH_2OH}$) or chloromethane ($\\mathrm{CH_3Cl}$)?',
              options: ['Ethanol', 'Dimethyl ether', 'Chloromethane', 'Propane'],
              answer: 0,
              explanation:
                'Only ethanol has an O–H bond, so only it hydrogen-bonds with itself ($78\\ ^\\circ\\mathrm{C}$). Dimethyl ether contains oxygen but its H atoms are all on carbon, so it has only dipole-dipole and dispersion forces ($-24\\ ^\\circ\\mathrm{C}$).',
            },
            {
              question: 'Which substance can form hydrogen bonds with water but not with itself?',
              options: ['$\\mathrm{CH_4}$', '$\\mathrm{CH_3OH}$', '$\\mathrm{(CH_3)_2CO}$ (acetone)', '$\\mathrm{HF}$'],
              answer: 2,
              explanation:
                'Acetone\'s oxygen has lone pairs that accept hydrogen bonds from water\'s O–H, but acetone has no H on N, O or F to donate. Methanol and HF hydrogen-bond with themselves too; methane cannot do either.',
            },
            {
              question: 'Iodine ($\\mathrm{I_2}$) is a solid at room temperature and HCl is a gas, although HCl is polar and $\\mathrm{I_2}$ is not. Why?',
              options: [
                'HCl molecules are hydrogen bonded',
                '$\\mathrm{I_2}$ forms covalent bonds between molecules',
                'Dispersion forces in $\\mathrm{I_2}$, with 106 electrons, are much stronger than the dipole-dipole plus dispersion forces in HCl',
                'Polar molecules always have lower boiling points',
              ],
              answer: 2,
              explanation:
                'Dispersion grows with the number of electrons and polarisability; $\\mathrm{I_2}$ is large and very polarisable. A polar molecule does not automatically beat a nonpolar one: size can matter more. HCl has no hydrogen bonding (H is bonded to Cl, not N, O or F).',
            },
            {
              question: 'When liquid methanol boils, what is broken?',
              options: [
                'O–H covalent bonds',
                'Hydrogen bonds and other attractions between molecules; the molecules stay intact',
                'C–O bonds',
                'Nothing is broken; the molecules simply speed up',
              ],
              answer: 1,
              explanation:
                'Boiling separates molecules from one another, overcoming intermolecular forces. Breaking covalent bonds would be a chemical change and would need far more energy. The molecules do speed up, but the energy of vaporisation goes into overcoming attractions.',
            },
          ],
        },
        {
          slug: 'liquids-solids-and-phase-diagrams',
          title: 'Liquids, solids, vapour pressure and phase diagrams',
          summary:
            'Vapour pressure and boiling, the Clausius-Clapeyron equation, heating curves, phase diagrams of water and carbon dioxide, and the four kinds of crystalline solid.',
          estimatedMinutes: 115,
          objectives: [
            'Explain vapour pressure as a dynamic equilibrium and define the normal boiling point',
            'Use the Clausius-Clapeyron equation to relate vapour pressure, temperature and enthalpy of vaporisation',
            'Calculate the heat needed to move a sample along a heating curve',
            'Read a phase diagram, including the triple and critical points, and explain why water\'s solid-liquid line slopes backwards',
            'Classify solids as ionic, molecular, covalent network or metallic and predict their properties',
          ],
          concepts: [
            'Vapour pressure and dynamic equilibrium',
            'Boiling point and normal boiling point',
            'Enthalpy of vaporisation and fusion',
            'Clausius-Clapeyron equation',
            'Heating curve: plateaus at phase changes',
            'Phase diagram, triple point, critical point',
            'Supercritical fluid',
            'Ionic, molecular, network and metallic solids',
          ],
          explanation: `In a closed container some molecules at the surface of a liquid have enough energy to escape. They build up in the vapour until molecules return as fast as they leave: a **dynamic equilibrium**. The pressure of the vapour then is the liquid's **vapour pressure**. It depends only on the substance and the temperature, rising steeply as temperature rises because the fraction of molecules with enough energy grows exponentially. A liquid **boils** when its vapour pressure equals the external pressure, so bubbles of vapour can form inside it; the **normal boiling point** is the temperature at which the vapour pressure is $1\\ \\mathrm{atm}$ ($760\\ \\mathrm{torr}$). Water boils at about $95\\ ^\\circ\\mathrm{C}$ in Denver, where the air pressure is about $630\\ \\mathrm{torr}$.

**Clausius-Clapeyron.** If the enthalpy of vaporisation $\\Delta H_\\mathrm{vap}$ is roughly constant,

$$\\ln\\frac{P_2}{P_1} = -\\frac{\\Delta H_\\mathrm{vap}}{R}\\left(\\frac{1}{T_2} - \\frac{1}{T_1}\\right).$$

For water, $\\Delta H_\\mathrm{vap} = 40.7\\ \\mathrm{kJ\\,mol^{-1}}$ and $P = 760\\ \\mathrm{torr}$ at $373.15\\ \\mathrm{K}$. At $80.0\\ ^\\circ\\mathrm{C}$ ($353.15\\ \\mathrm{K}$):

$$\\ln\\frac{P_2}{760} = -\\frac{40\\,700}{8.314}\\left(\\frac{1}{353.15} - \\frac{1}{373.15}\\right) = -0.743, \\qquad P_2 = 362\\ \\mathrm{torr}.$$

The measured value is $355\\ \\mathrm{torr}$; the small gap comes from $\\Delta H_\\mathrm{vap}$ not being exactly constant. Use kelvin and J (not kJ) with $R = 8.314$.

\`\`\`interactive
function-explorer
{"title": "Vapour pressure from Clausius-Clapeyron", "f": ["760*exp(-H*1000/8.314*(1/(x + 273.15) - 1/(Tb + 273.15)))", "760 + 0*x"], "sliders": {"H": [40.7, 20, 60, 0.1], "Tb": [100, 30, 150, 0.5]}, "view": [0, 120, 0, 1000], "caption": "The curve is the vapour pressure in torr against temperature in °C for a liquid with enthalpy of vaporisation H (kJ/mol) and normal boiling point Tb (°C); the flat line is 760 torr. With water's values (40.7, 100) read off about 360 torr at 80 °C. Raise H: the curve steepens, because a liquid with stronger intermolecular forces gains vapour pressure more sharply as it warms. Lower Tb to 78 for ethanol (H about 38.6)."}
\`\`\`

**Heating curves.** Heating a solid raises its temperature until it melts; then the temperature stays constant while the heat of fusion goes into separating molecules, and the same happens at the boiling point. The heat for each stage is $q = mc\\Delta T$ on the slopes and $q = n\\Delta H$ on the plateaus. For water the vaporisation plateau is by far the longest ($40.7$ against $6.01\\ \\mathrm{kJ\\,mol^{-1}}$ for fusion), which is why steam burns are so severe.

**Phase diagrams** show which phase is stable at each pressure and temperature. Lines mark coexistence of two phases; the **triple point** is where all three coexist; beyond the **critical point** liquid and gas merge into a **supercritical fluid**. Carbon dioxide's triple point is at $5.11\\ \\mathrm{atm}$ and $-56.6\\ ^\\circ\\mathrm{C}$, above atmospheric pressure, so at $1\\ \\mathrm{atm}$ dry ice sublimes instead of melting. Water's solid-liquid line slopes slightly to the left: pressure favours the denser phase, and liquid water is denser than ice, so pressing on ice lowers its melting point.

**Kinds of solid.** **Ionic** (NaCl): high melting, brittle, conduct only when molten or dissolved. **Molecular** ($\\mathrm{I_2}$, ice, sugar): held by IMFs, so soft and low melting. **Covalent network** (diamond, quartz $\\mathrm{SiO_2}$): one giant covalent lattice, very hard and very high melting. **Metallic** (Cu): cations in a sea of delocalised electrons, malleable and conducting. Read OpenStax 10.2 to 10.5.`,
          resources: [
            ostx('10-3-phase-transitions', '10.3 Phase transitions', 'Vapour pressure, boiling, the Clausius-Clapeyron equation and heating curves, with worked examples.', true),
            ostx('10-4-phase-diagrams', '10.4 Phase diagrams', 'Water and carbon dioxide phase diagrams, triple and critical points, supercritical fluids.'),
            ostx('10-5-the-solid-state-of-matter', '10.5 The solid state of matter', 'Ionic, molecular, covalent network and metallic solids and their properties.'),
            nistWebBook('Look up the vapour pressure (Antoine equation parameters) and enthalpy of vaporisation of any common liquid to test the Clausius-Clapeyron equation.'),
          ],
          exercises: [
            {
              slug: 'clausius-clapeyron-problems',
              title: 'Clausius-Clapeyron problems',
              prompt: `(a) Estimate the boiling point of water at the top of Mount Everest, where the pressure is about $253\\ \\mathrm{torr}$ ($\\Delta H_\\mathrm{vap} = 40.7\\ \\mathrm{kJ\\,mol^{-1}}$). (b) The vapour pressure of water is $23.8\\ \\mathrm{torr}$ at $25\\ ^\\circ\\mathrm{C}$ and $760\\ \\mathrm{torr}$ at $100\\ ^\\circ\\mathrm{C}$. Estimate $\\Delta H_\\mathrm{vap}$ from these two points and compare with $40.7$ (at $100\\ ^\\circ\\mathrm{C}$) and $44.0\\ \\mathrm{kJ\\,mol^{-1}}$ (at $25\\ ^\\circ\\mathrm{C}$). What does the comparison tell you about the constant-$\\Delta H$ assumption?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1/T₂ = 1/373.15 − (R/ΔH) ln(253/760) gives T₂ ≈ 344 K, about 71 °C. (b) ΔH = −R ln(760/23.8)/(1/373.15 − 1/298.15) ≈ 42.7 kJ/mol, between the two tabulated values: ΔH_vap falls as temperature rises.',
            },
            {
              slug: 'heating-curve-calculation',
              title: 'Heating curve',
              prompt: `How much heat is needed to turn $25.0\\ \\mathrm{g}$ of ice at $-10.0\\ ^\\circ\\mathrm{C}$ into steam at $110.0\\ ^\\circ\\mathrm{C}$? Use $c(\\text{ice}) = 2.09$, $c(\\text{water}) = 4.184$, $c(\\text{steam}) = 2.01\\ \\mathrm{J\\,g^{-1}\\,^\\circ C^{-1}}$, $\\Delta H_\\mathrm{fus} = 6.01$ and $\\Delta H_\\mathrm{vap} = 40.7\\ \\mathrm{kJ\\,mol^{-1}}$. Give each of the five stages separately, sketch the heating curve to scale in time (constant heating rate), and say which stage takes longest.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Stages (J): 523, 8.34 × 10³, 1.046 × 10⁴, 5.65 × 10⁴, 503. Total 76.3 kJ; vaporisation is about 74 % of it.',
            },
            {
              slug: 'phase-diagram-reading',
              title: 'Reading phase diagrams',
              prompt: `Using the phase diagrams of water and carbon dioxide in OpenStax 10.4: (a) What phase is $\\mathrm{CO_2}$ in at $1\\ \\mathrm{atm}$ and $-78\\ ^\\circ\\mathrm{C}$, and what happens as it warms? (b) At what minimum pressure can liquid $\\mathrm{CO_2}$ exist? (c) Describe the phases water passes through when heated from $-10$ to $120\\ ^\\circ\\mathrm{C}$ at $0.005\\ \\mathrm{atm}$. (d) Why does a fire extinguisher full of $\\mathrm{CO_2}$ slosh? (e) Classify diamond, dry ice, copper, quartz and calcium fluoride by type of solid.`,
              kind: 'reading',
              difficulty: 2,
              hint: 'Water\'s triple point is 0.006 atm, so at 0.005 atm ice sublimes directly. CO₂ liquid needs at least 5.11 atm; extinguishers hold it at about 60 atm at room temperature.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a liquid boil at a lower temperature at high altitude?',
              answerOutline: 'Boiling occurs when vapour pressure equals the external pressure; with lower atmospheric pressure, a lower temperature (lower vapour pressure) suffices.',
            },
            {
              question: 'Why does the temperature stay constant on a heating-curve plateau?',
              answerOutline: 'The added heat goes into overcoming intermolecular forces during the phase change (increasing potential energy), not into increasing the kinetic energy that temperature measures.',
            },
            {
              question: 'Why does dry ice sublime at 1 atm instead of melting?',
              answerOutline: 'Its triple point (5.11 atm) lies above 1 atm, so at 1 atm the liquid region is never crossed; the solid goes straight to gas.',
            },
          ],
          quiz: [
            {
              question: 'Ethanol has $\\Delta H_\\mathrm{vap} = 38.6\\ \\mathrm{kJ\\,mol^{-1}}$ and a normal boiling point of $78.3\\ ^\\circ\\mathrm{C}$. Estimate its vapour pressure at $25.0\\ ^\\circ\\mathrm{C}$ with the Clausius-Clapeyron equation.',
              options: ['$758\\ \\mathrm{torr}$', '$9.5 \\times 10^{-53}\\ \\mathrm{torr}$', '$380\\ \\mathrm{torr}$', '$72\\ \\mathrm{torr}$'],
              answer: 3,
              explanation:
                '$\\ln(P/760) = -\\dfrac{38\\,600}{8.314}\\left(\\dfrac{1}{298.15} - \\dfrac{1}{351.45}\\right) = -2.36$, so $P = 72\\ \\mathrm{torr}$ (measured: about $59\\ \\mathrm{torr}$, since $\\Delta H_\\mathrm{vap}$ is not constant). Using 38.6 without converting kJ to J gives $758$; using Celsius temperatures gives the absurd $10^{-53}$.',
            },
            {
              question: 'A sample of $\\mathrm{CO_2}$ at $1\\ \\mathrm{atm}$ and $-90\\ ^\\circ\\mathrm{C}$ is warmed to $25\\ ^\\circ\\mathrm{C}$ at constant pressure. What happens? (Triple point: $5.11\\ \\mathrm{atm}$, $-56.6\\ ^\\circ\\mathrm{C}$.)',
              options: [
                'It melts at $-56.6\\ ^\\circ\\mathrm{C}$ and boils later',
                'It sublimes directly from solid to gas, with no liquid',
                'It stays solid',
                'It becomes a supercritical fluid',
              ],
              answer: 1,
              explanation:
                'At $1\\ \\mathrm{atm}$, below the triple-point pressure, the path never crosses the liquid region: the solid sublimes (at $-78.5\\ ^\\circ\\mathrm{C}$). Melting at $-56.6\\ ^\\circ\\mathrm{C}$ would need at least $5.11\\ \\mathrm{atm}$.',
            },
            {
              question: 'A substance is very hard, melts above $1600\\ ^\\circ\\mathrm{C}$, and does not conduct electricity as a solid or as a liquid. What kind of solid is it most likely to be?',
              options: ['Molecular', 'Metallic', 'Covalent network', 'Ionic'],
              answer: 2,
              explanation:
                'Very hard and very high melting means strong bonds throughout the solid: network or ionic. Ionic solids conduct when molten; this one does not, so it is a covalent network (quartz, $\\mathrm{SiO_2}$, melts near $1700\\ ^\\circ\\mathrm{C}$). Metals conduct as solids; molecular solids melt low.',
            },
          ],
        },
      ],
      project: {
        slug: 'boiling-point-detective',
        title: 'Boiling-point detective',
        description: `Use real data to test the intermolecular-force rules. From the NIST Chemistry WebBook, collect normal boiling points and molar masses for at least 30 compounds in families: the straight-chain alkanes $\\mathrm{C_1}$ to $\\mathrm{C_{10}}$; the straight-chain alcohols $\\mathrm{C_1}$ to $\\mathrm{C_8}$; isomers of pentane and hexane; the hydrides of groups 14 to 17; and a few ethers, ketones and amines. Plot boiling point against molar mass (a spreadsheet is fine), one series per family. Explain the patterns: the steady rise with chain length, the gap between alcohols and alkanes and how it shrinks for longer chains, the effect of branching, and the hydrogen-bonding anomalies. Finish by predicting the boiling points of three compounds you did not use, then look them up and comment on your errors.`,
        deliverables: [
          'A data table with every value and its WebBook source',
          'Plots of boiling point against molar mass by family',
          'A 600 to 900 word analysis explaining each pattern with intermolecular forces',
          'Three blind predictions with their measured values and a discussion of the errors',
        ],
        estimatedHours: 3,
        stretchGoals: ['Plot ln(P) against 1/T for one liquid from WebBook vapour-pressure data and extract ΔH_vap from the slope'],
      },
    },
    {
      slug: 'stoichiometry-and-solutions',
      title: 'Stoichiometry and Reactions in Solution',
      description:
        'Naming compounds and finding formulas from composition, balancing equations, mole-ratio calculations with limiting reagents and yields, and reactions in water: molarity, dilution, precipitation, acid-base and redox reactions, and titration.',
      lessons: [
        {
          slug: 'formulas-names-and-composition',
          title: 'Formulas, names and percent composition',
          summary:
            'Name ionic and molecular compounds, compute percent composition, and work back from composition data to empirical and molecular formulas.',
          estimatedMinutes: 115,
          objectives: [
            'Distinguish ionic and molecular compounds and write formulas of ionic compounds from ion charges',
            'Name binary ionic, polyatomic-ion, molecular and simple acid compounds',
            'Compute the percent composition by mass of a compound',
            'Determine an empirical formula from percent composition or combustion data, and a molecular formula from the molar mass',
          ],
          concepts: [
            'Ionic versus molecular compounds',
            'Common polyatomic ions',
            'Roman numerals for variable-charge metals',
            'Greek prefixes for molecular compounds',
            'Percent composition by mass',
            'Empirical formula: simplest whole-number ratio',
            'Molecular formula = (empirical formula)ₙ',
            'Combustion analysis',
          ],
          explanation: `**Formulas and names.** Ionic compounds combine cations and anions in the ratio that makes the total charge zero: $\\mathrm{Al^{3+}}$ and $\\mathrm{O^{2-}}$ give $\\mathrm{Al_2O_3}$. They are named cation first, anion second: sodium chloride, calcium nitrate $\\mathrm{Ca(NO_3)_2}$. Metals with more than one common charge (most transition metals) carry a Roman numeral: $\\mathrm{FeCl_2}$ is iron(II) chloride, $\\mathrm{Fe_2(SO_4)_3}$ iron(III) sulfate. Learn the common polyatomic ions now: ammonium $\\mathrm{NH_4^+}$, hydroxide $\\mathrm{OH^-}$, nitrate $\\mathrm{NO_3^-}$, nitrite $\\mathrm{NO_2^-}$, sulfate $\\mathrm{SO_4^{2-}}$, carbonate $\\mathrm{CO_3^{2-}}$, hydrogen carbonate $\\mathrm{HCO_3^-}$, phosphate $\\mathrm{PO_4^{3-}}$, acetate $\\mathrm{CH_3COO^-}$, permanganate $\\mathrm{MnO_4^-}$. Binary molecular compounds (two non-metals) use Greek prefixes and no charges: $\\mathrm{N_2O_5}$ is dinitrogen pentoxide, CO carbon monoxide. Ionic names never use prefixes: $\\mathrm{CaCl_2}$ is calcium chloride, not calcium dichloride.

**Percent composition** is each element's share of the molar mass. For ammonium nitrate, $\\mathrm{NH_4NO_3}$ ($80.05\\ \\mathrm{g\\,mol^{-1}}$):

$$\\%\\,\\mathrm{N} = \\frac{2 \\times 14.01}{80.05} \\times 100 = 35.00\\,\\%.$$

**From composition to formula.** The **empirical formula** is the simplest whole-number ratio of atoms; the **molecular formula** is the actual number in one molecule, a whole-number multiple of it. The method:

1. Assume a $100\\ \\mathrm{g}$ sample, so percentages become grams.
2. Convert each to moles.
3. Divide by the smallest number of moles.
4. If the ratios are not whole, multiply all by a small integer (a ratio of 1.5 means multiply by 2; 1.33 means 3).

**Worked example.** A sugar is $40.00\\,\\%$ C, $6.71\\,\\%$ H and $53.29\\,\\%$ O, with molar mass $180.2\\ \\mathrm{g\\,mol^{-1}}$. Moles in $100\\ \\mathrm{g}$: C $40.00/12.01 = 3.331$; H $6.71/1.008 = 6.657$; O $53.29/16.00 = 3.331$. Dividing by $3.331$ gives $1 : 1.999 : 1$, so the empirical formula is $\\mathrm{CH_2O}$ ($30.03\\ \\mathrm{g\\,mol^{-1}}$). Then $180.2/30.03 = 6.00$, so the molecular formula is $\\mathrm{C_6H_{12}O_6}$, glucose.

**Combustion analysis** finds C and H by burning a sample in excess oxygen and weighing the $\\mathrm{CO_2}$ and $\\mathrm{H_2O}$: all the carbon ends up in $\\mathrm{CO_2}$ and all the hydrogen in water. Oxygen in the sample is found by difference.

**Pitfalls.** Rounding $1.5$ to 2 (or $1.33$ to 1) destroys the formula; keep three or four figures until the ratios are clear. Forgetting that H in water comes two per molecule halves the hydrogen. And empirical formulas cannot distinguish compounds that share a ratio: acetylene $\\mathrm{C_2H_2}$ and benzene $\\mathrm{C_6H_6}$ are both CH, and formaldehyde, acetic acid and glucose are all $\\mathrm{CH_2O}$.

Read OpenStax 2.6 and 2.7 for names and 3.2 for formulas, and make flashcards of the polyatomic ions.`,
          resources: [
            ostx('2-7-chemical-nomenclature', '2.7 Chemical nomenclature', 'Naming ionic compounds, molecular compounds and acids, with the table of common polyatomic ions.'),
            ostx('3-2-determining-empirical-and-molecular-formulas', '3.2 Determining empirical and molecular formulas', 'Percent composition, empirical formulas from composition and combustion data, molecular formulas.', true),
            ostx('2-6-ionic-and-molecular-compounds', '2.6 Ionic and molecular compounds', 'Predicting ionic formulas from ion charges.'),
          ],
          exercises: [
            {
              slug: 'names-and-formulas',
              title: 'Names and formulas',
              prompt: `Name: $\\mathrm{K_2SO_4}$, $\\mathrm{Mg(OH)_2}$, $\\mathrm{CuCl_2}$, $\\mathrm{(NH_4)_3PO_4}$, $\\mathrm{SF_6}$, $\\mathrm{N_2O_4}$, $\\mathrm{Fe(NO_3)_3}$, $\\mathrm{NaHCO_3}$. Write formulas for: aluminium sulfate, chromium(III) oxide, calcium acetate, dinitrogen trioxide, lithium nitride, potassium permanganate.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Al₂(SO₄)₃, Cr₂O₃, Ca(CH₃COO)₂, N₂O₃, Li₃N, KMnO₄. CuCl₂ is copper(II) chloride; NaHCO₃ is sodium hydrogen carbonate (bicarbonate).',
            },
            {
              slug: 'empirical-formulas',
              title: 'Empirical and molecular formulas',
              prompt: `(a) A compound is $43.64\\,\\%$ P and $56.36\\,\\%$ O, with molar mass about $284\\ \\mathrm{g\\,mol^{-1}}$. Find its empirical and molecular formulas. (b) Ascorbic acid is $40.92\\,\\%$ C, $4.58\\,\\%$ H and $54.50\\,\\%$ O; its molar mass is $176.1\\ \\mathrm{g\\,mol^{-1}}$. Find both formulas, showing the step where you multiply to clear a non-integer ratio.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) P 1.409, O 3.523 mol: ratio 1 : 2.5, so P₂O₅ (141.9); molecular P₄O₁₀. (b) C 3.407, H 4.54, O 3.406: 1 : 1.33 : 1, multiply by 3: C₃H₄O₃ (88.06); molecular C₆H₈O₆.',
            },
            {
              slug: 'combustion-analysis',
              title: 'Combustion analysis',
              prompt: `Burning $0.2000\\ \\mathrm{g}$ of a compound containing only C, H and O gives $0.3825\\ \\mathrm{g}$ $\\mathrm{CO_2}$ and $0.2349\\ \\mathrm{g}$ $\\mathrm{H_2O}$. Find the masses of C, H and (by difference) O in the sample, its empirical formula, and its molecular formula if the molar mass is $46.07\\ \\mathrm{g\\,mol^{-1}}$. Name one compound it could be and one other compound with the same formula.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'C: 0.3825 × 12.01/44.01 = 0.1044 g; H: 0.2349 × 2.016/18.02 = 0.02628 g; O: 0.0693 g. Moles 8.69, 26.1, 4.33 (× 10⁻³): C₂H₆O. Ethanol or dimethyl ether.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does iron(III) sulfate need a Roman numeral but calcium chloride does not?',
              answerOutline: 'Iron forms both Fe²⁺ and Fe³⁺, so the charge must be stated; calcium only ever forms Ca²⁺.',
            },
            {
              question: 'Outline the steps from percent composition to molecular formula.',
              answerOutline: 'Assume 100 g; convert grams to moles; divide by the smallest; multiply to clear fractions to get the empirical formula; divide the molar mass by the empirical formula mass and multiply the subscripts by that integer.',
            },
            {
              question: 'Why can an empirical formula not identify a compound uniquely?',
              answerOutline: 'Different compounds can share the same simplest ratio (C₂H₂ and C₆H₆ are both CH); the molar mass, and often the structure, are needed.',
            },
          ],
          quiz: [
            {
              question: 'A hydrocarbon is $85.6\\,\\%$ C and $14.4\\,\\%$ H by mass, with molar mass $56.1\\ \\mathrm{g\\,mol^{-1}}$. What is its molecular formula?',
              options: ['$\\mathrm{CH_2}$', '$\\mathrm{C_2H_4}$', '$\\mathrm{C_6H_{14}}$', '$\\mathrm{C_4H_8}$'],
              answer: 3,
              explanation:
                'Moles in 100 g: C $7.13$, H $14.3$, ratio $1 : 2.00$, so the empirical formula is $\\mathrm{CH_2}$ ($14.03\\ \\mathrm{g\\,mol^{-1}}$). $56.1/14.03 = 4.00$, so $\\mathrm{C_4H_8}$. $\\mathrm{CH_2}$ is only the empirical formula; $\\mathrm{C_2H_4}$ uses the wrong multiple.',
            },
            {
              question: 'What is the name of $\\mathrm{Fe_2(SO_4)_3}$?',
              options: ['Iron(III) sulfate', 'Diiron trisulfate', 'Iron(II) sulfate', 'Iron(III) sulfite'],
              answer: 0,
              explanation:
                'Three sulfates carry $6-$, shared by two Fe, so each is $\\mathrm{Fe^{3+}}$: iron(III). Ionic compounds never take Greek prefixes, so "diiron trisulfate" is wrong; sulfite is $\\mathrm{SO_3^{2-}}$, a different ion.',
            },
            {
              question: 'Which two compounds have the same empirical formula?',
              options: ['$\\mathrm{C_2H_6}$ and $\\mathrm{C_2H_4}$', '$\\mathrm{CO}$ and $\\mathrm{CO_2}$', '$\\mathrm{H_2O}$ and $\\mathrm{H_2O_2}$', '$\\mathrm{C_2H_2}$ and $\\mathrm{C_6H_6}$'],
              answer: 3,
              explanation:
                'Acetylene and benzene both reduce to CH: same empirical formula, different molecular formulas, different compounds. In the other pairs the atom ratios differ ($\\mathrm{CH_3}$ vs $\\mathrm{CH_2}$, and so on).',
            },
          ],
        },
        {
          slug: 'balancing-and-reaction-stoichiometry',
          title: 'Balancing equations and reaction stoichiometry',
          summary:
            'Balance equations by conserving atoms, then use the coefficients as mole ratios to go from grams of one substance to grams of another.',
          estimatedMinutes: 105,
          objectives: [
            'Balance chemical equations by inspection, including combustion reactions',
            'Interpret coefficients as ratios of particles and of moles, not of masses',
            'Carry out mass-to-mass stoichiometry through moles',
            'Classify simple reactions (combination, decomposition, combustion, single and double displacement)',
          ],
          concepts: [
            'Conservation of mass and atoms',
            'Coefficients versus subscripts',
            'Balancing by inspection',
            'Mole ratio from coefficients',
            'Grams → moles → moles → grams',
            'Combustion of hydrocarbons',
            'Reaction types',
          ],
          explanation: `A **balanced equation** has the same number of each kind of atom on both sides, because atoms are neither created nor destroyed in a chemical reaction. You balance by changing **coefficients** (how many molecules) and never **subscripts** (which would change the substance: $\\mathrm{H_2O_2}$ is not water).

**Balancing by inspection.** Start with the element that appears in the fewest formulas, leave free elements (such as $\\mathrm{O_2}$) for last, and finish by clearing fractions. For propane burning:

$$\\mathrm{C_3H_8} + \\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + \\mathrm{H_2O}.$$

Three C need $3\\,\\mathrm{CO_2}$; eight H need $4\\,\\mathrm{H_2O}$; that makes $6 + 4 = 10$ O atoms on the right, so $5\\,\\mathrm{O_2}$:

$$\\mathrm{C_3H_8} + 5\\,\\mathrm{O_2} \\rightarrow 3\\,\\mathrm{CO_2} + 4\\,\\mathrm{H_2O}.$$

When oxygen comes out odd (as for ethane), use a half coefficient and then double everything: $2\\,\\mathrm{C_2H_6} + 7\\,\\mathrm{O_2} \\rightarrow 4\\,\\mathrm{CO_2} + 6\\,\\mathrm{H_2O}$.

**Coefficients are mole ratios.** The equation says one molecule of propane reacts with five of oxygen, and therefore one mole with five moles. It does *not* say one gram with five grams. Every stoichiometry problem therefore runs through moles:

$$\\text{g of A} \\xrightarrow{\\ \\div M_\\mathrm{A}\\ } \\text{mol A} \\xrightarrow{\\ \\times\\ \\text{ratio B/A}\\ } \\text{mol B} \\xrightarrow{\\ \\times M_\\mathrm{B}\\ } \\text{g of B}.$$

**Worked example.** What mass of $\\mathrm{CO_2}$ does burning $10.0\\ \\mathrm{g}$ of propane produce? $M(\\mathrm{C_3H_8}) = 3(12.01) + 8(1.008) = 44.09\\ \\mathrm{g\\,mol^{-1}}$.

$$10.0\\ \\mathrm{g\\ C_3H_8} \\times \\frac{1\\ \\mathrm{mol}}{44.09\\ \\mathrm{g}} \\times \\frac{3\\ \\mathrm{mol\\ CO_2}}{1\\ \\mathrm{mol\\ C_3H_8}} \\times \\frac{44.01\\ \\mathrm{g}}{1\\ \\mathrm{mol\\ CO_2}} = 29.9\\ \\mathrm{g\\ CO_2}.$$

Three times the mass of fuel comes out as $\\mathrm{CO_2}$, because each carbon picks up two oxygen atoms. Writing the ratio with units (mol $\\mathrm{CO_2}$ per mol $\\mathrm{C_3H_8}$) makes it impossible to flip it by accident.

**Reaction types** help you predict products: combination ($2\\mathrm{Na} + \\mathrm{Cl_2} \\rightarrow 2\\mathrm{NaCl}$), decomposition ($\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}$), combustion (a fuel with $\\mathrm{O_2}$ giving $\\mathrm{CO_2}$ and $\\mathrm{H_2O}$), single displacement ($\\mathrm{Zn} + \\mathrm{CuSO_4} \\rightarrow \\mathrm{ZnSO_4} + \\mathrm{Cu}$) and double displacement (swap partners, usually in solution, next lessons).

**Pitfalls.** Changing subscripts to balance; using a coefficient as a mass ratio; and reading the ratio upside down. A useful check: the total mass of reactants consumed must equal the total mass of products formed. Read OpenStax 4.1 and 4.3, and practise with the PhET balancing game until it is automatic.`,
          resources: [
            ostx('4-1-writing-and-balancing-chemical-equations', '4.1 Writing and balancing chemical equations', 'Balancing by inspection with worked examples, including fractional coefficients.'),
            ostx('4-3-reaction-stoichiometry', '4.3 Reaction stoichiometry', 'Mole ratios and mass-to-mass calculations with a clear flow chart.', true),
            phet('balancing-chemical-equations', 'Balancing Chemical Equations', 'A balancing game with visual atom counts; play the higher levels.'),
          ],
          exercises: [
            {
              slug: 'balance-these',
              title: 'Balance these',
              prompt: `Balance with the smallest whole-number coefficients and classify each reaction: (a) $\\mathrm{Fe} + \\mathrm{O_2} \\rightarrow \\mathrm{Fe_2O_3}$; (b) $\\mathrm{C_4H_{10}} + \\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + \\mathrm{H_2O}$; (c) $\\mathrm{Al} + \\mathrm{HCl} \\rightarrow \\mathrm{AlCl_3} + \\mathrm{H_2}$; (d) $\\mathrm{KClO_3} \\rightarrow \\mathrm{KCl} + \\mathrm{O_2}$; (e) $\\mathrm{C_6H_{12}O_6} + \\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + \\mathrm{H_2O}$; (f) $\\mathrm{NH_3} + \\mathrm{O_2} \\rightarrow \\mathrm{NO} + \\mathrm{H_2O}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 4, 3, 2. (b) 2, 13, 8, 10. (c) 2, 6, 2, 3. (d) 2, 2, 3. (e) 1, 6, 6, 6. (f) 4, 5, 4, 6.',
            },
            {
              slug: 'mass-to-mass',
              title: 'Mass to mass',
              prompt: `(a) How many grams of $\\mathrm{O_2}$ are needed to burn $50.0\\ \\mathrm{g}$ of glucose completely? (b) Heating $\\mathrm{KClO_3}$ releases oxygen: what mass of $\\mathrm{KClO_3}$ gives $12.0\\ \\mathrm{g}$ of $\\mathrm{O_2}$? (c) A car burns $40.0\\ \\mathrm{kg}$ of octane, $\\mathrm{C_8H_{18}}$, on a long trip. Balance the combustion equation and find the mass of $\\mathrm{CO_2}$ released. Show units on every factor.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 50.0/180.16 × 6 × 32.00 = 53.3 g. (b) 12.0/32.00 × 2/3 × 122.55 = 30.6 g. (c) 2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O; 40.0 kg/114.2 × 8 × 44.01 = 123 kg of CO₂.',
            },
            {
              slug: 'conservation-check',
              title: 'Conservation check',
              prompt: `For the propane example in the lesson, compute the mass of $\\mathrm{O_2}$ consumed and of $\\mathrm{H_2O}$ formed when $10.0\\ \\mathrm{g}$ of propane burns. Verify that mass is conserved within rounding. Then explain in two sentences why a burning candle seems to "lose" mass while rusting iron "gains" it.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'O₂: 0.2268 mol × 5 × 32.00 = 36.3 g; H₂O: 0.2268 × 4 × 18.02 = 16.3 g. 10.0 + 36.3 = 46.3 = 29.9 + 16.3 (46.2, within rounding). Gases leave or arrive unseen.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why may you change coefficients but not subscripts when balancing?',
              answerOutline: 'Subscripts define the substance (H₂O vs H₂O₂); coefficients only say how many molecules of each substance take part.',
            },
            {
              question: 'What do the coefficients in an equation tell you about masses?',
              answerOutline: 'Nothing directly: they are ratios of particles and moles. Masses require multiplying moles by molar masses.',
            },
            {
              question: 'Write the general path for converting grams of A into grams of B.',
              answerOutline: 'grams A ÷ molar mass A → mol A; × (coefficient B / coefficient A) → mol B; × molar mass B → grams B.',
            },
          ],
          quiz: [
            {
              question: 'What is the coefficient of $\\mathrm{O_2}$ when $\\mathrm{C_2H_6} + \\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + \\mathrm{H_2O}$ is balanced with the smallest whole numbers?',
              options: ['7', '3.5', '5', '6'],
              answer: 0,
              explanation:
                '$\\mathrm{C_2H_6} + 3.5\\,\\mathrm{O_2} \\rightarrow 2\\,\\mathrm{CO_2} + 3\\,\\mathrm{H_2O}$ balances, but whole numbers are needed, so double: $2, 7, 4, 6$. 3.5 is the fractional intermediate; 6 is the coefficient of water.',
            },
            {
              question: 'What mass of $\\mathrm{O_2}$ is needed to burn $7.50\\ \\mathrm{g}$ of methane? ($\\mathrm{CH_4} + 2\\,\\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + 2\\,\\mathrm{H_2O}$)',
              options: ['$15.0\\ \\mathrm{g}$', '$59.8\\ \\mathrm{g}$', '$7.50\\ \\mathrm{g}$', '$29.9\\ \\mathrm{g}$'],
              answer: 3,
              explanation:
                '$7.50/16.04 = 0.4675\\ \\mathrm{mol}$ $\\mathrm{CH_4}$; $\\times 2 = 0.9350\\ \\mathrm{mol}$ $\\mathrm{O_2}$; $\\times 32.00 = 29.9\\ \\mathrm{g}$. Multiplying grams by the coefficient ($2 \\times 7.50 = 15.0$) treats coefficients as mass ratios; $59.8$ uses the coefficient twice.',
            },
            {
              question: 'The equation $2\\,\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\,\\mathrm{H_2O}$ tells you that',
              options: [
                '2 g of hydrogen react with 1 g of oxygen',
                '2 mol of $\\mathrm{H_2}$ react with 1 mol of $\\mathrm{O_2}$ to give 2 mol of water',
                '3 mol of reactants give 2 mol of products, so mass is lost',
                'hydrogen and oxygen react in a 2 : 1 ratio by volume of liquid',
              ],
              answer: 1,
              explanation:
                'Coefficients count molecules and therefore moles. By mass the ratio is $4.03 : 32.00$, not $2 : 1$. The number of moles can change in a reaction; mass cannot ($4.03 + 32.00 = 36.03\\ \\mathrm{g}$ of water).',
            },
          ],
        },
        {
          slug: 'limiting-reagents-and-percent-yield',
          title: 'Limiting reagents and percent yield',
          summary:
            'When reactants are not in the exact ratio, one runs out first and limits the product. Find it by comparing moles divided by coefficients, then compute theoretical yield, leftovers and percent yield.',
          estimatedMinutes: 115,
          objectives: [
            'Identify the limiting reagent by comparing moles divided by coefficients',
            'Calculate the theoretical yield and the amount of excess reagent left over',
            'Calculate percent yield and explain why actual yields fall short',
            'Organise a calculation as an initial-change-final table',
          ],
          concepts: [
            'Limiting reagent',
            'Excess reagent',
            'n/ν: moles divided by coefficient',
            'Theoretical yield',
            'Actual yield',
            'Percent yield',
            'Initial-change-final table',
          ],
          explanation: `In the real world reactants are rarely mixed in exactly the ratio of the equation. One of them, the **limiting reagent**, runs out first and stops the reaction; the others are in **excess** and some is left over. The sandwich analogy is exact: with 10 slices of bread and 3 slices of cheese, at 2 bread and 1 cheese per sandwich, you make 3 sandwiches and have 4 slices of bread left. Cheese is limiting, even though you have less of it in number *and* it is the less abundant item per sandwich.

**The test.** For each reactant, divide its moles by its coefficient, $n/\\nu$. The smallest value identifies the limiting reagent, and that value (call it the **extent** $\\xi$) tells you how many "times" the reaction as written can run. Then every species changes by its coefficient times $\\xi$.

**Worked example.** $10.0\\ \\mathrm{g}$ of aluminium reacts with $30.0\\ \\mathrm{g}$ of chlorine: $2\\,\\mathrm{Al} + 3\\,\\mathrm{Cl_2} \\rightarrow 2\\,\\mathrm{AlCl_3}$.

| | $\\mathrm{Al}$ | $\\mathrm{Cl_2}$ | $\\mathrm{AlCl_3}$ |
|---|---|---|---|
| moles initially | $10.0/26.98 = 0.3706$ | $30.0/70.90 = 0.4231$ | $0$ |
| $n/\\nu$ | $0.1853$ | $0.1410$ | |
| change ($\\xi = 0.1410$) | $-0.2821$ | $-0.4231$ | $+0.2821$ |
| final moles | $0.0886$ | $0$ | $0.2821$ |

Chlorine is limiting, although there are more grams *and* more moles of it than of aluminium: what matters is moles relative to what the equation demands. The theoretical yield is $0.2821\\ \\mathrm{mol} \\times 133.33\\ \\mathrm{g\\,mol^{-1}} = 37.6\\ \\mathrm{g}$ of $\\mathrm{AlCl_3}$, and $0.0886 \\times 26.98 = 2.39\\ \\mathrm{g}$ of Al is left over. Check: $10.0 + 30.0 = 37.6 + 2.39$ within rounding.

\`\`\`interactive
stoichiometry
{"reaction": "aluminium-chloride", "amounts": [10, 30], "yield": true, "caption": "This starts at the worked example: 10.0 g Al and 30.0 g Cl₂. Read the n/ν column: the smaller value (Cl₂) is limiting. Slide the Al amount down until Al becomes limiting and note where the switch happens. Then pick other reactions: in 'Ammonia synthesis', find amounts where the reactant with the smaller mass is not the limiting one, and watch the warning appear."}
\`\`\`

**Percent yield.** The **theoretical yield** is the most product the limiting reagent allows; the **actual yield** is what you weigh. Then

$$\\text{percent yield} = \\frac{\\text{actual yield}}{\\text{theoretical yield}} \\times 100\\,\\%.$$

If $32.5\\ \\mathrm{g}$ of $\\mathrm{AlCl_3}$ is collected above, the yield is $32.5/37.6 = 86.4\\,\\%$. Yields fall short because of side reactions, incomplete reactions (equilibrium, module 9), and product lost in transfers and purification. A yield above 100 % signals an impure, usually wet, product, not extra success.

**Pitfalls.** Choosing the reactant with less mass, or with fewer moles, without dividing by coefficients; computing the yield from the excess reagent; and using percent yield to scale the *reactants*. Read OpenStax 4.4, then use the PhET "Reactants, Products and Leftovers" sandwiches before the exercises.`,
          resources: [
            ostx('4-4-reaction-yields', '4.4 Reaction yields', 'Limiting reactants, theoretical and percent yield, with worked examples.', true),
            phet('reactants-products-and-leftovers', 'Reactants, Products and Leftovers', 'Sandwiches and molecules: predict what is left over, then check.'),
            {
              title: 'Khan Academy: Chemistry',
              url: 'https://www.khanacademy.org/science/chemistry',
              type: 'course',
              cost: 'free',
              provider: 'Khan Academy',
              note: 'Optional extra practice: find the stoichiometry unit and its limiting-reagent videos and exercises.',
            },
          ],
          exercises: [
            {
              slug: 'limiting-reagent-problems',
              title: 'Limiting reagent problems',
              prompt: `(a) $25.0\\ \\mathrm{g}$ of $\\mathrm{N_2}$ and $5.00\\ \\mathrm{g}$ of $\\mathrm{H_2}$ react to make ammonia. Find the limiting reagent, the theoretical yield of $\\mathrm{NH_3}$, and the mass of excess reagent left. (b) In the thermite reaction $2\\,\\mathrm{Al} + \\mathrm{Fe_2O_3} \\rightarrow \\mathrm{Al_2O_3} + 2\\,\\mathrm{Fe}$, $50.0\\ \\mathrm{g}$ of each reactant is used. How much iron forms? Set out both as initial-change-final tables and check against the widget.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) N₂ 0.8922 mol (n/ν 0.892), H₂ 2.480 mol (n/ν 0.827): H₂ limiting; NH₃ 1.653 mol = 28.2 g; N₂ left 0.0655 mol = 1.83 g. (b) Al 1.853 mol (n/ν 0.927), Fe₂O₃ 0.3131 mol (limiting): Fe 0.6262 mol = 35.0 g.',
            },
            {
              slug: 'percent-yield-aspirin',
              title: 'Percent yield of aspirin',
              prompt: `Aspirin is made by $\\mathrm{C_7H_6O_3} + \\mathrm{C_4H_6O_3} \\rightarrow \\mathrm{C_9H_8O_4} + \\mathrm{C_2H_4O_2}$ (salicylic acid plus acetic anhydride). A student uses $2.00\\ \\mathrm{g}$ of salicylic acid and $5.00\\ \\mathrm{mL}$ of acetic anhydride (density $1.08\\ \\mathrm{g\\,mL^{-1}}$) and obtains $2.10\\ \\mathrm{g}$ of dry aspirin. Find the limiting reagent, the theoretical yield and the percent yield. Suggest two reasons for the loss and one reason a careless student might report more than 100 %.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Salicylic acid 2.00/138.12 = 0.01448 mol; anhydride 5.40/102.09 = 0.0529 mol. Salicylic acid limits: 0.01448 × 180.16 = 2.61 g; yield 80.5 %.',
            },
            {
              slug: 'design-a-mixture',
              title: 'Design a mixture',
              prompt: `You want to make exactly $20.0\\ \\mathrm{g}$ of $\\mathrm{NH_3}$ with no reactant left over, assuming 100 % yield. What masses of $\\mathrm{N_2}$ and $\\mathrm{H_2}$ do you need? An industrial plant deliberately uses a 3 : 1 *volume* ratio of $\\mathrm{H_2}$ to $\\mathrm{N_2}$; explain why that equals the mole ratio for gases (anticipating Avogadro's law in the gases module).`,
              kind: 'problem',
              difficulty: 1,
              hint: '20.0/17.03 = 1.174 mol NH₃ needs 0.5871 mol N₂ (16.4 g) and 1.761 mol H₂ (3.55 g).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the reactant with the smaller mass not necessarily the limiting reagent?',
              answerOutline: 'Reactions consume moles in the ratio of the coefficients; masses must be converted to moles and divided by coefficients before comparing.',
            },
            {
              question: 'How do you find how much excess reagent is left?',
              answerOutline: 'Compute the moles of excess reagent consumed from the limiting reagent and the mole ratio (ν × ξ), subtract from the initial moles, and convert to grams.',
            },
            {
              question: 'What could make a reported percent yield exceed 100 %?',
              answerOutline: 'An impure product: residual solvent or water, unreacted starting material or by-products in the weighed solid; or an arithmetic error (wrong limiting reagent).',
            },
          ],
          quiz: [
            {
              question: '$28.0\\ \\mathrm{g}$ of $\\mathrm{N_2}$ and $8.00\\ \\mathrm{g}$ of $\\mathrm{H_2}$ react: $\\mathrm{N_2} + 3\\,\\mathrm{H_2} \\rightarrow 2\\,\\mathrm{NH_3}$. What is the theoretical yield of ammonia?',
              options: ['$45.1\\ \\mathrm{g}$', '$36.0\\ \\mathrm{g}$', '$17.0\\ \\mathrm{g}$', '$34.0\\ \\mathrm{g}$'],
              answer: 3,
              explanation:
                '$\\mathrm{N_2}$: $0.9993\\ \\mathrm{mol}$ ($n/\\nu = 0.999$); $\\mathrm{H_2}$: $3.968\\ \\mathrm{mol}$ ($n/\\nu = 1.323$). $\\mathrm{N_2}$ limits: $2 \\times 0.9993 = 1.999\\ \\mathrm{mol}$ $\\mathrm{NH_3}$ $= 34.0\\ \\mathrm{g}$. Using $\\mathrm{H_2}$ as limiting gives $45.1$; adding the masses ($36.0$) ignores that $\\mathrm{H_2}$ is left over.',
            },
            {
              question: '$10.0\\ \\mathrm{g}$ each of $\\mathrm{H_2}$ and $\\mathrm{O_2}$ are ignited ($2\\,\\mathrm{H_2} + \\mathrm{O_2} \\rightarrow 2\\,\\mathrm{H_2O}$). Which is limiting?',
              options: [
                '$\\mathrm{O_2}$: $0.3125\\ \\mathrm{mol}$ against $\\mathrm{H_2}$\'s $n/\\nu$ of $2.48$',
                '$\\mathrm{H_2}$, because its coefficient is larger',
                'Neither, because the masses are equal',
                '$\\mathrm{H_2}$, because hydrogen molecules are smaller',
              ],
              answer: 0,
              explanation:
                '$\\mathrm{H_2}$: $10.0/2.016 = 4.96\\ \\mathrm{mol}$, $n/\\nu = 2.48$. $\\mathrm{O_2}$: $10.0/32.00 = 0.3125\\ \\mathrm{mol}$, $n/\\nu = 0.3125$. Oxygen limits by a wide margin. Equal masses say nothing, since the molar masses differ sixteen-fold.',
            },
            {
              question: 'Heating $15.0\\ \\mathrm{g}$ of $\\mathrm{CaCO_3}$ ($100.09\\ \\mathrm{g\\,mol^{-1}}$) gives $7.60\\ \\mathrm{g}$ of CaO ($56.08\\ \\mathrm{g\\,mol^{-1}}$): $\\mathrm{CaCO_3} \\rightarrow \\mathrm{CaO} + \\mathrm{CO_2}$. What is the percent yield?',
              options: ['$50.7\\,\\%$', '$110.6\\,\\%$', '$9.6\\,\\%$', '$90.4\\,\\%$'],
              answer: 3,
              explanation:
                'Theoretical CaO $= (15.0/100.09) \\times 56.08 = 8.40\\ \\mathrm{g}$; $7.60/8.40 = 90.4\\,\\%$. Dividing the product mass by the reactant mass ($7.60/15.0 = 50.7\\,\\%$) ignores the $\\mathrm{CO_2}$ that legitimately leaves; inverting the ratio gives $110.6\\,\\%$.',
            },
          ],
        },
        {
          slug: 'solutions-and-molarity',
          title: 'Solutions, molarity and dilution',
          summary:
            'Molarity counts moles per litre of solution. Use it to prepare solutions, dilute them, find ion concentrations, and classify solutes as strong, weak or non-electrolytes.',
          estimatedMinutes: 100,
          objectives: [
            'Calculate molarity and use it to convert between volume and moles',
            'Describe how to prepare a solution of given molarity from a solid and by dilution',
            'Use $M_1V_1 = M_2V_2$ for dilutions',
            'Find the concentrations of individual ions from the formula of a strong electrolyte',
            'Classify solutes as strong, weak or non-electrolytes',
          ],
          concepts: [
            'Solute, solvent, solution',
            'Molarity M = mol solute / L solution',
            'Volumetric flask preparation',
            'Dilution: moles of solute conserved',
            'Strong, weak and non-electrolytes',
            'Ion concentrations from dissociation',
            'Hydrates in weighing',
          ],
          explanation: `Most reactions in chemistry and biology happen in water. A **solution** is a homogeneous mixture of a **solute** in a **solvent**, and its most useful concentration unit is **molarity**:

$$M = \\frac{\\text{moles of solute}}{\\text{litres of solution}}, \\qquad \\text{unit } \\mathrm{mol\\,L^{-1}}, \\text{ written M}.$$

Note *litres of solution*, not of solvent: to make $0.400\\ \\mathrm{M}$ NaCl you dissolve the salt in some water in a volumetric flask and then add water up to the mark.

**Worked example.** $5.85\\ \\mathrm{g}$ of NaCl ($58.44\\ \\mathrm{g\\,mol^{-1}}$) dissolved to make $250.0\\ \\mathrm{mL}$: $5.85/58.44 = 0.1001\\ \\mathrm{mol}$, and $0.1001\\ \\mathrm{mol}/0.2500\\ \\mathrm{L} = 0.400\\ \\mathrm{M}$. Molarity is a conversion factor between volume and moles, in either direction: $35.0\\ \\mathrm{mL}$ of this solution holds $0.0350\\ \\mathrm{L} \\times 0.400\\ \\mathrm{mol\\,L^{-1}} = 0.0140\\ \\mathrm{mol}$ of NaCl.

**Dilution** adds solvent but not solute, so the moles of solute are the same before and after:

$$M_1V_1 = M_2V_2.$$

Diluting $25.0\\ \\mathrm{mL}$ of $0.400\\ \\mathrm{M}$ NaCl to $100.0\\ \\mathrm{mL}$ gives $M_2 = (0.400)(25.0)/100.0 = 0.100\\ \\mathrm{M}$. Any volume unit works as long as both sides use the same one. $V_2$ is the *final total* volume, not the volume of water added (a common slip: adding $100\\ \\mathrm{mL}$ of water gives $125\\ \\mathrm{mL}$).

\`\`\`interactive
function-explorer
{"title": "Dilution: concentration against final volume", "f": ["M1*V1/x"], "sliders": {"M1": [0.4, 0.1, 2, 0.05], "V1": [25, 5, 100, 1]}, "view": [0, 500, 0, 1], "caption": "The horizontal axis is the final volume V₂ in mL and the curve is M₂ = M₁V₁/V₂ in mol/L. With M₁ = 0.4 M and V₁ = 25 mL, read 0.100 M at V₂ = 100 mL. Doubling V₂ halves the concentration: the curve is a hyperbola because the product M₂V₂ (the moles) never changes."}
\`\`\`

**Electrolytes.** Ionic compounds that dissolve break apart into ions (**dissociate**), and the solution conducts electricity: these are **strong electrolytes**, together with the strong acids (HCl, HBr, HI, $\\mathrm{HNO_3}$, $\\mathrm{H_2SO_4}$, $\\mathrm{HClO_4}$). **Weak electrolytes** such as acetic acid and ammonia ionise only a few percent. **Non-electrolytes** such as sugar and ethanol dissolve as intact molecules. In a strong electrolyte, each ion's concentration follows the formula: $0.10\\ \\mathrm{M}$ $\\mathrm{CaCl_2}$ is $0.10\\ \\mathrm{M}$ in $\\mathrm{Ca^{2+}}$ and $0.20\\ \\mathrm{M}$ in $\\mathrm{Cl^-}$, $0.30\\ \\mathrm{M}$ in ions altogether. Properties that depend on the number of dissolved particles (such as freezing-point depression) care about that total.

**Pitfalls.** Using millilitres in the molarity formula without converting; forgetting a hydrate's water when weighing ($\\mathrm{CuSO_4 \\cdot 5H_2O}$, $249.7\\ \\mathrm{g\\,mol^{-1}}$, not $159.6$); and confusing the concentration of a compound with that of its ions. Read OpenStax 3.3 and 11.2 (electrolytes), and try the PhET Molarity simulation.`,
          resources: [
            ostx('3-3-molarity', '3.3 Molarity', 'Molarity, preparing solutions and dilution with worked examples.', true),
            ostx('11-2-electrolytes', '11.2 Electrolytes', 'Strong, weak and non-electrolytes and why ionic solutions conduct.'),
            phet('molarity', 'Molarity', 'Change solute amount and volume and watch the concentration; see when a solution saturates.'),
          ],
          exercises: [
            {
              slug: 'prepare-solutions',
              title: 'Prepare solutions',
              prompt: `Describe exactly how to prepare each solution, with the mass or volume you would measure: (a) $500.0\\ \\mathrm{mL}$ of $0.250\\ \\mathrm{M}$ $\\mathrm{KNO_3}$ from the solid; (b) $250.0\\ \\mathrm{mL}$ of $0.150\\ \\mathrm{M}$ $\\mathrm{CuSO_4}$ from $\\mathrm{CuSO_4 \\cdot 5H_2O}$; (c) $1.00\\ \\mathrm{L}$ of $0.500\\ \\mathrm{M}$ HCl from $12.0\\ \\mathrm{M}$ stock. For (c), say why you add acid to water and not the reverse.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 0.1250 mol × 101.11 = 12.6 g. (b) 0.03750 mol × 249.7 = 9.36 g of the hydrate. (c) 41.7 mL of stock made up to 1.00 L.',
            },
            {
              slug: 'ion-concentrations',
              title: 'Ion concentrations and mixing',
              prompt: `(a) Give the concentration of each ion in $0.120\\ \\mathrm{M}$ $\\mathrm{Al_2(SO_4)_3}$. (b) $50.0\\ \\mathrm{mL}$ of $0.200\\ \\mathrm{M}$ NaCl is mixed with $25.0\\ \\mathrm{mL}$ of $0.100\\ \\mathrm{M}$ $\\mathrm{CaCl_2}$ (no reaction). Find $[\\mathrm{Na^+}]$, $[\\mathrm{Ca^{2+}}]$ and $[\\mathrm{Cl^-}]$ in the mixture. (c) Which solution conducts best: $0.10\\ \\mathrm{M}$ sucrose, $0.10\\ \\mathrm{M}$ acetic acid or $0.10\\ \\mathrm{M}$ $\\mathrm{MgCl_2}$? Explain.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Al³⁺ 0.240 M, SO₄²⁻ 0.360 M. (b) Total volume 75.0 mL: Na⁺ 0.133 M, Ca²⁺ 0.0333 M, Cl⁻ (10.0 + 5.00 mmol)/75.0 mL = 0.200 M. (c) MgCl₂, a strong electrolyte with three ions per formula unit.',
            },
            {
              slug: 'serial-dilution',
              title: 'Serial dilution',
              prompt: `A biology protocol needs a $1.0 \\times 10^{-5}\\ \\mathrm{M}$ solution of a dye from a $0.010\\ \\mathrm{M}$ stock. (a) Why is a single dilution impractical with ordinary glassware? (b) Design a series of three tenfold dilutions, giving the volumes you would pipette and the final volumes. (c) If each pipetting step has a 1 % uncertainty, estimate the uncertainty of the final concentration.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'A 1000-fold dilution in one step needs, for example, 0.10 mL into 100 mL, which is hard to measure accurately. Three steps of 10.00 mL into 100.0 mL each. Relative uncertainties of independent steps add roughly in quadrature: about 1.7 % (or up to 3 % if added directly).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is molarity defined per litre of solution rather than per litre of solvent?',
              answerOutline: 'Because you measure out volumes of the solution, and the solute changes the total volume; per litre of solution makes volume × molarity = moles exact.',
            },
            {
              question: 'What stays the same in a dilution, and what equation follows?',
              answerOutline: 'The moles of solute; so M₁V₁ = M₂V₂, with V₂ the final total volume.',
            },
            {
              question: 'What is [Cl⁻] in 0.050 M AlCl₃?',
              answerOutline: 'AlCl₃ dissociates into Al³⁺ + 3Cl⁻, so [Cl⁻] = 3 × 0.050 = 0.15 M.',
            },
          ],
          quiz: [
            {
              question: 'What mass of $\\mathrm{CuSO_4 \\cdot 5H_2O}$ ($249.7\\ \\mathrm{g\\,mol^{-1}}$) is needed for $250.0\\ \\mathrm{mL}$ of $0.150\\ \\mathrm{M}$ $\\mathrm{CuSO_4}$?',
              options: ['$9.36\\ \\mathrm{g}$', '$5.99\\ \\mathrm{g}$', '$37.5\\ \\mathrm{g}$', '$9.36 \\times 10^{3}\\ \\mathrm{g}$'],
              answer: 0,
              explanation:
                '$0.2500\\ \\mathrm{L} \\times 0.150\\ \\mathrm{mol\\,L^{-1}} = 0.03750\\ \\mathrm{mol}$; $\\times 249.7 = 9.36\\ \\mathrm{g}$. Using the anhydrous molar mass ($159.6$) gives $5.99\\ \\mathrm{g}$, too little copper sulfate; $37.5\\ \\mathrm{g}$ is the mass for a full litre; $9.36 \\times 10^3$ uses 250.0 mL as if it were litres.',
            },
            {
              question: '$25.0\\ \\mathrm{mL}$ of $6.00\\ \\mathrm{M}$ HCl is diluted to a total volume of $500.0\\ \\mathrm{mL}$. What is the new concentration?',
              options: ['$0.286\\ \\mathrm{M}$', '$120\\ \\mathrm{M}$', '$0.150\\ \\mathrm{M}$', '$0.300\\ \\mathrm{M}$'],
              answer: 3,
              explanation:
                '$M_2 = (6.00)(25.0)/500.0 = 0.300\\ \\mathrm{M}$. Treating 500.0 mL as the water *added* (total 525.0 mL) gives $0.286$; inverting the ratio gives $120\\ \\mathrm{M}$, impossible for a dilution.',
            },
            {
              question: 'In $0.10\\ \\mathrm{M}$ $\\mathrm{CaCl_2}$, what is the concentration of chloride ions?',
              options: ['$0.10\\ \\mathrm{M}$', '$0.05\\ \\mathrm{M}$', '$0.20\\ \\mathrm{M}$', '$0.30\\ \\mathrm{M}$'],
              answer: 2,
              explanation:
                'Each formula unit gives one $\\mathrm{Ca^{2+}}$ and two $\\mathrm{Cl^-}$, so $[\\mathrm{Cl^-}] = 0.20\\ \\mathrm{M}$. $0.30\\ \\mathrm{M}$ is the total ion concentration; $0.10\\ \\mathrm{M}$ is the concentration of the compound (and of $\\mathrm{Ca^{2+}}$).',
            },
          ],
        },
        {
          slug: 'precipitation-and-net-ionic-equations',
          title: 'Precipitation reactions and net ionic equations',
          summary:
            'Predict precipitates from solubility rules, write molecular, complete ionic and net ionic equations, and do precipitation stoichiometry with solutions.',
          estimatedMinutes: 105,
          objectives: [
            'Use solubility rules to predict whether an ionic compound dissolves in water',
            'Predict whether mixing two solutions gives a precipitate',
            'Write molecular, complete ionic and net ionic equations and identify spectator ions',
            'Solve precipitation stoichiometry problems, including limiting reagents and gravimetric analysis',
          ],
          concepts: [
            'Solubility rules',
            'Precipitate',
            'Double displacement (metathesis)',
            'Molecular, complete ionic and net ionic equations',
            'Spectator ions',
            'Stoichiometry with molarity × volume',
            'Gravimetric analysis',
          ],
          explanation: `When two ionic solutions are mixed, every ion is free to meet every other. If some cation-anion pair forms an **insoluble** compound, it comes out as a solid, a **precipitate**. Which pairs are insoluble is summarised by **solubility rules**, a compact digest of experiment:

- Always soluble: compounds of group 1 ions and $\\mathrm{NH_4^+}$; all nitrates, acetates and perchlorates.
- Usually soluble: chlorides, bromides and iodides, *except* with $\\mathrm{Ag^+}$, $\\mathrm{Pb^{2+}}$ and $\\mathrm{Hg_2^{2+}}$; sulfates, *except* with $\\mathrm{Ba^{2+}}$, $\\mathrm{Pb^{2+}}$, $\\mathrm{Sr^{2+}}$ and (slightly) $\\mathrm{Ca^{2+}}$.
- Usually insoluble: carbonates, phosphates, sulfides and hydroxides, *except* with group 1 ions and $\\mathrm{NH_4^+}$ (and hydroxides of $\\mathrm{Ca^{2+}}$, $\\mathrm{Sr^{2+}}$, $\\mathrm{Ba^{2+}}$ are moderately soluble).

"Insoluble" means only that very little dissolves; module 9 makes that quantitative.

**Three ways to write it.** Mixing silver nitrate and sodium chloride:

- **Molecular**: $\\mathrm{AgNO_3(aq)} + \\mathrm{NaCl(aq)} \\rightarrow \\mathrm{AgCl(s)} + \\mathrm{NaNO_3(aq)}$.
- **Complete ionic** (every strong electrolyte split into ions): $\\mathrm{Ag^+} + \\mathrm{NO_3^-} + \\mathrm{Na^+} + \\mathrm{Cl^-} \\rightarrow \\mathrm{AgCl(s)} + \\mathrm{Na^+} + \\mathrm{NO_3^-}$.
- **Net ionic** (cancel the **spectator ions** that appear unchanged on both sides): $\\mathrm{Ag^+(aq)} + \\mathrm{Cl^-(aq)} \\rightarrow \\mathrm{AgCl(s)}$.

The net ionic equation is the chemistry: any soluble silver salt with any soluble chloride does the same thing. Solids, liquids, gases and weak electrolytes stay written as formulas; only dissolved strong electrolytes are split.

**Precipitation stoichiometry.** Moles of an ion come from molarity times volume. Mix $50.0\\ \\mathrm{mL}$ of $0.100\\ \\mathrm{M}$ $\\mathrm{AgNO_3}$ with $30.0\\ \\mathrm{mL}$ of $0.150\\ \\mathrm{M}$ NaCl: $\\mathrm{Ag^+}$ is $5.00\\ \\mathrm{mmol}$, $\\mathrm{Cl^-}$ is $4.50\\ \\mathrm{mmol}$. The net equation is $1 : 1$, so chloride is limiting: $4.50\\ \\mathrm{mmol}$ AgCl ($143.32\\ \\mathrm{g\\,mol^{-1}}$) is $0.645\\ \\mathrm{g}$. The excess $0.50\\ \\mathrm{mmol}$ of $\\mathrm{Ag^+}$ stays in $80.0\\ \\mathrm{mL}$, so $[\\mathrm{Ag^+}] = 0.00625\\ \\mathrm{M}$. Working in millimoles with millilitres (mmol = M × mL) saves powers of ten.

**Gravimetric analysis** turns this around: precipitate one ion completely, filter, dry and weigh, and calculate how much of that ion was in the sample. It is one of the most accurate classical methods, provided the precipitate is pure and truly insoluble.

**Pitfalls.** Splitting a precipitate into ions in the ionic equation; forgetting that the total volume after mixing is the sum of both; and splitting weak electrolytes (acetic acid) or polyatomic ions ($\\mathrm{NO_3^-}$ stays one ion). Read OpenStax 4.2 (precipitation part); OpenStax 15.1 has the solubility table.`,
          resources: [
            ostx('4-2-classifying-chemical-reactions', '4.2 Classifying chemical reactions', 'Precipitation reactions, solubility guidelines and net ionic equations (first part of the section).', true),
            ostx('4-5-quantitative-chemical-analysis', '4.5 Quantitative chemical analysis', 'Gravimetric analysis worked examples (second half of the section).'),
            ostx('15-1-precipitation-and-dissolution', '15.1 Precipitation and dissolution', 'Optional look ahead: solubility as an equilibrium, with tabulated solubility products.'),
          ],
          exercises: [
            {
              slug: 'predict-precipitates',
              title: 'Predict precipitates',
              prompt: `For each mixture of aqueous solutions, predict whether a precipitate forms; if so, write the molecular, complete ionic and net ionic equations: (a) $\\mathrm{Pb(NO_3)_2} + \\mathrm{KI}$; (b) $\\mathrm{BaCl_2} + \\mathrm{Na_2SO_4}$; (c) $\\mathrm{KNO_3} + \\mathrm{NaCl}$; (d) $\\mathrm{FeCl_3} + \\mathrm{NaOH}$; (e) $\\mathrm{(NH_4)_2CO_3} + \\mathrm{CaCl_2}$; (f) $\\mathrm{Na_3PO_4} + \\mathrm{AgNO_3}$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Precipitates: PbI₂, BaSO₄, Fe(OH)₃, CaCO₃, Ag₃PO₄. (c) gives no reaction: every possible product is soluble.',
            },
            {
              slug: 'precipitate-mass',
              title: 'How much precipitate?',
              prompt: `$25.0\\ \\mathrm{mL}$ of $0.200\\ \\mathrm{M}$ $\\mathrm{BaCl_2}$ is mixed with $40.0\\ \\mathrm{mL}$ of $0.100\\ \\mathrm{M}$ $\\mathrm{Na_2SO_4}$. Write the net ionic equation, find the limiting ion, the mass of $\\mathrm{BaSO_4}$ formed, and the concentrations of every ion left in solution.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Ba²⁺ 5.00 mmol, SO₄²⁻ 4.00 mmol: sulfate limits; 4.00 mmol × 233.39 = 0.934 g. In 65.0 mL: Ba²⁺ 1.00 mmol (0.0154 M), Cl⁻ 10.0 mmol (0.154 M), Na⁺ 8.00 mmol (0.123 M), SO₄²⁻ ≈ 0.',
            },
            {
              slug: 'gravimetric-chloride',
              title: 'Gravimetric chloride',
              prompt: `A $0.5000\\ \\mathrm{g}$ sample of a mixture of NaCl and $\\mathrm{KNO_3}$ is dissolved and treated with excess $\\mathrm{AgNO_3}$; $0.6120\\ \\mathrm{g}$ of dry AgCl is collected. Find the mass percent of NaCl in the mixture. List two experimental errors that would make the result too high and one that would make it too low.`,
              kind: 'problem',
              difficulty: 2,
              hint: '0.6120/143.32 = 4.270 × 10⁻³ mol AgCl = mol NaCl; × 58.44 = 0.2495 g; 49.91 %.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are spectator ions and why are they left out of the net ionic equation?',
              answerOutline: 'Ions present in solution before and after the reaction unchanged; they take no part, so omitting them shows the actual chemical change.',
            },
            {
              question: 'Which substances are written as ions in a complete ionic equation?',
              answerOutline: 'Only dissolved strong electrolytes (soluble ionic compounds and strong acids/bases). Solids, liquids, gases, weak electrolytes and non-electrolytes are written as formulas.',
            },
            {
              question: 'How do you find the limiting reactant when mixing two solutions?',
              answerOutline: 'Convert each volume × molarity to moles (or mmol) of the reacting ions and compare with the net ionic equation\'s coefficients.',
            },
          ],
          quiz: [
            {
              question: '$25.0\\ \\mathrm{mL}$ of $0.200\\ \\mathrm{M}$ $\\mathrm{BaCl_2}$ is mixed with $40.0\\ \\mathrm{mL}$ of $0.100\\ \\mathrm{M}$ $\\mathrm{Na_2SO_4}$. What mass of $\\mathrm{BaSO_4}$ ($233.39\\ \\mathrm{g\\,mol^{-1}}$) forms?',
              options: ['$0.934\\ \\mathrm{g}$', '$1.17\\ \\mathrm{g}$', '$2.10\\ \\mathrm{g}$', '$0.467\\ \\mathrm{g}$'],
              answer: 0,
              explanation:
                '$\\mathrm{Ba^{2+}}$: $5.00\\ \\mathrm{mmol}$; $\\mathrm{SO_4^{2-}}$: $4.00\\ \\mathrm{mmol}$; the net equation is $1:1$, so sulfate limits: $4.00\\ \\mathrm{mmol} \\times 233.39 = 0.934\\ \\mathrm{g}$. Assuming barium limits gives $1.17\\ \\mathrm{g}$, more product than the sulfate can make.',
            },
            {
              question: 'Which mixture of aqueous solutions forms a precipitate?',
              options: ['$\\mathrm{KNO_3} + \\mathrm{NaCl}$', '$\\mathrm{NH_4Cl} + \\mathrm{NaNO_3}$', '$\\mathrm{Na_2SO_4} + \\mathrm{KCl}$', '$\\mathrm{Pb(NO_3)_2} + \\mathrm{KI}$'],
              answer: 3,
              explanation:
                'Lead iodide is insoluble (halides of $\\mathrm{Pb^{2+}}$ are exceptions), so yellow $\\mathrm{PbI_2}$ forms. In the other mixtures every possible pairing involves group 1 ions, ammonium or nitrate, all soluble.',
            },
            {
              question: 'What is the net ionic equation for mixing $\\mathrm{Na_2CO_3(aq)}$ and $\\mathrm{CaCl_2(aq)}$?',
              options: [
                '$\\mathrm{Na_2CO_3} + \\mathrm{CaCl_2} \\rightarrow \\mathrm{CaCO_3} + 2\\,\\mathrm{NaCl}$',
                '$\\mathrm{Ca^{2+}(aq)} + \\mathrm{CO_3^{2-}(aq)} \\rightarrow \\mathrm{CaCO_3(s)}$',
                '$2\\,\\mathrm{Na^+} + 2\\,\\mathrm{Cl^-} \\rightarrow 2\\,\\mathrm{NaCl(s)}$',
                '$\\mathrm{Ca^{2+}} + \\mathrm{C^{4+}} + 3\\,\\mathrm{O^{2-}} \\rightarrow \\mathrm{CaCO_3(s)}$',
              ],
              answer: 1,
              explanation:
                '$\\mathrm{Na^+}$ and $\\mathrm{Cl^-}$ are spectators (NaCl is soluble), leaving $\\mathrm{Ca^{2+}} + \\mathrm{CO_3^{2-}} \\rightarrow \\mathrm{CaCO_3(s)}$. The first option is the molecular equation; the last breaks the carbonate ion apart, which never happens.',
            },
          ],
        },
        {
          slug: 'acid-base-redox-and-titration',
          title: 'Acid-base reactions, redox reactions and titration',
          summary:
            'Acids donate protons and bases accept them; redox reactions transfer electrons, tracked with oxidation numbers. Titration uses either kind of reaction to measure an unknown concentration.',
          estimatedMinutes: 125,
          objectives: [
            'Identify acids and bases (Arrhenius and Brønsted-Lowry) and the strong acids and bases',
            'Write net ionic equations for neutralisation, including with weak acids',
            'Assign oxidation numbers and identify the species oxidised, reduced, and the oxidising and reducing agents',
            'Calculate an unknown concentration from titration data, including polyprotic acids',
            'Explain the equivalence point and how an indicator signals it',
          ],
          concepts: [
            'Brønsted-Lowry acid (proton donor) and base (proton acceptor)',
            'Strong acids and strong bases',
            'Neutralisation: H⁺ + OH⁻ → H₂O',
            'Oxidation numbers',
            'Oxidation (loss of electrons) and reduction (gain)',
            'Oxidising and reducing agents',
            'Titration, equivalence point, end point, indicator',
            'Standardisation',
          ],
          explanation: `**Acids and bases.** In the Brønsted-Lowry picture an **acid** donates a proton ($\\mathrm{H^+}$) and a **base** accepts one. Strong acids (HCl, HBr, HI, $\\mathrm{HNO_3}$, $\\mathrm{H_2SO_4}$, $\\mathrm{HClO_4}$) ionise completely in water; strong bases are the soluble hydroxides of groups 1 and 2. Everything else, such as acetic acid and ammonia, is weak. The net ionic equation for any strong acid with any strong base is

$$\\mathrm{H^+(aq)} + \\mathrm{OH^-(aq)} \\rightarrow \\mathrm{H_2O(l)},$$

and with a weak acid the acid keeps its formula: $\\mathrm{CH_3COOH} + \\mathrm{OH^-} \\rightarrow \\mathrm{CH_3COO^-} + \\mathrm{H_2O}$. (In water $\\mathrm{H^+}$ is really $\\mathrm{H_3O^+}$; the shorthand is fine for stoichiometry.)

**Redox reactions** transfer electrons. **Oxidation** is loss of electrons, **reduction** gain ("OIL RIG"). To track them, assign **oxidation numbers**: elements are 0; monatomic ions equal their charge; O is usually $-2$ (peroxides $-1$); H is $+1$ with non-metals; F is always $-1$; and the numbers sum to the overall charge. So in $\\mathrm{MnO_4^-}$, $x + 4(-2) = -1$ gives Mn $+7$; in $\\mathrm{Cr_2O_7^{2-}}$ Cr is $+6$. In $\\mathrm{Zn(s)} + \\mathrm{Cu^{2+}} \\rightarrow \\mathrm{Zn^{2+}} + \\mathrm{Cu(s)}$, zinc goes from 0 to $+2$ (oxidised; it is the **reducing agent**) and copper from $+2$ to 0 (reduced; $\\mathrm{Cu^{2+}}$ is the **oxidising agent**). Oxidation numbers are bookkeeping that assumes complete electron transfer, so they differ from formal charges and from real charges.

**Titration.** A **titration** adds a solution of known concentration (the **titrant**, from a burette) to a measured volume of the unknown until the reaction is exactly complete: the **equivalence point**, where the moles added match the stoichiometry. An **indicator** changes colour at the **end point**, chosen to be as close as possible to the equivalence point (phenolphthalein turns pink just past neutral in an acid titrated with NaOH).

**Worked example.** $25.00\\ \\mathrm{mL}$ of HCl needs $31.42\\ \\mathrm{mL}$ of $0.1050\\ \\mathrm{M}$ NaOH:

$$n(\\mathrm{OH^-}) = 0.03142\\ \\mathrm{L} \\times 0.1050\\ \\mathrm{mol\\,L^{-1}} = 3.299 \\times 10^{-3}\\ \\mathrm{mol} = n(\\mathrm{HCl}),$$

$$[\\mathrm{HCl}] = \\frac{3.299 \\times 10^{-3}\\ \\mathrm{mol}}{0.02500\\ \\mathrm{L}} = 0.1320\\ \\mathrm{M}.$$

The ratio comes from the balanced equation. Sulfuric acid gives two protons, so $\\mathrm{H_2SO_4} + 2\\,\\mathrm{NaOH} \\rightarrow \\mathrm{Na_2SO_4} + 2\\,\\mathrm{H_2O}$ needs twice the moles of base. Using $M_1V_1 = M_2V_2$ for a titration is a dangerous habit: it is only right when the ratio is $1:1$. Redox titrations work the same way (for example permanganate, which is its own indicator because $\\mathrm{MnO_4^-}$ is purple and $\\mathrm{Mn^{2+}}$ nearly colourless).

A weak acid needs exactly as much base as a strong acid of the same concentration and volume: titration counts all the protons available, not how many are ionised at the start. Read the acid-base and redox parts of OpenStax 4.2 and the titration part of 4.5.`,
          resources: [
            ostx('4-2-classifying-chemical-reactions', '4.2 Classifying chemical reactions', 'Acid-base and oxidation-reduction reactions, oxidation numbers and balancing simple redox equations (second half).', true),
            ostx('4-5-quantitative-chemical-analysis', '4.5 Quantitative chemical analysis', 'Titration with worked examples.'),
            phet('acid-base-solutions', 'Acid-Base Solutions', 'Compare strong and weak acids and bases at the molecular level, with conductivity and pH meters.'),
            mit('unit-iii-thermodynamics-chemical-equilibrium/lecture-23', 'Lecture 23, Acid-base titrations part I', 'Optional look ahead: titration curves and the equivalence point, from a course that goes further than this one.'),
          ],
          exercises: [
            {
              slug: 'titration-calculations',
              title: 'Titration calculations',
              prompt: `(a) Standardisation: $0.5106\\ \\mathrm{g}$ of potassium hydrogen phthalate (KHP, $204.22\\ \\mathrm{g\\,mol^{-1}}$, one acidic H) needs $24.68\\ \\mathrm{mL}$ of NaOH. Find the NaOH concentration. (b) That NaOH is used to titrate $10.00\\ \\mathrm{mL}$ of vinegar diluted with water; the end point needs $16.50\\ \\mathrm{mL}$ of $0.1000\\ \\mathrm{M}$ NaOH. Find the molarity of acetic acid in the vinegar and the mass of acetic acid per $10.00\\ \\mathrm{mL}$. (c) Why does adding the water to the vinegar not change the answer?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2.500 × 10⁻³ mol / 0.02468 L = 0.1013 M. (b) 1.650 × 10⁻³ mol in 10.00 mL: 0.1650 M; × 60.05 = 0.0991 g. (c) The moles of acid in the flask are unchanged by dilution.',
            },
            {
              slug: 'oxidation-numbers',
              title: 'Oxidation numbers and redox',
              prompt: `(a) Assign oxidation numbers to every atom in $\\mathrm{H_2SO_4}$, $\\mathrm{NH_4^+}$, $\\mathrm{K_2Cr_2O_7}$, $\\mathrm{H_2O_2}$, $\\mathrm{Fe_3O_4}$ and $\\mathrm{CH_4}$. (b) For each reaction, say whether it is redox; if so, identify what is oxidised, what is reduced, and the oxidising and reducing agents: $2\\,\\mathrm{Na} + \\mathrm{Cl_2} \\rightarrow 2\\,\\mathrm{NaCl}$; $\\mathrm{HCl} + \\mathrm{NaOH} \\rightarrow \\mathrm{NaCl} + \\mathrm{H_2O}$; $\\mathrm{CH_4} + 2\\,\\mathrm{O_2} \\rightarrow \\mathrm{CO_2} + 2\\,\\mathrm{H_2O}$; $\\mathrm{Fe_2O_3} + 3\\,\\mathrm{CO} \\rightarrow 2\\,\\mathrm{Fe} + 3\\,\\mathrm{CO_2}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'S +6; N −3; Cr +6; O in H₂O₂ −1; Fe in Fe₃O₄ +8/3 (an average of +2 and +3); C in CH₄ −4. The neutralisation is not redox. In combustion C goes −4 → +4.',
            },
            {
              slug: 'polyprotic-titration',
              title: 'A diprotic acid',
              prompt: `$0.2250\\ \\mathrm{g}$ of an unknown diprotic acid $\\mathrm{H_2A}$ needs $38.40\\ \\mathrm{mL}$ of $0.1300\\ \\mathrm{M}$ NaOH to reach the second equivalence point. Find its molar mass. Then say what molar mass a student would get if they assumed it was monoprotic, and which of oxalic acid ($90.03$), malonic acid ($104.06$) or succinic acid ($118.09\\ \\mathrm{g\\,mol^{-1}}$) it is most likely to be.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'NaOH 4.992 × 10⁻³ mol → H₂A 2.496 × 10⁻³ mol → 90.1 g/mol: oxalic acid. Assuming monoprotic gives 45.1 g/mol.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can you not use M₁V₁ = M₂V₂ for the titration of H₂SO₄ with NaOH?',
              answerOutline: 'That shortcut assumes a 1:1 mole ratio; H₂SO₄ reacts with 2 NaOH, so moles of base = 2 × moles of acid.',
            },
            {
              question: 'In Zn + Cu²⁺ → Zn²⁺ + Cu, which species is the oxidising agent and why?',
              answerOutline: 'Cu²⁺: it gains electrons (is reduced) and so causes the oxidation of zinc.',
            },
            {
              question: 'What is the difference between the equivalence point and the end point?',
              answerOutline: 'The equivalence point is where reactants are present in exact stoichiometric amounts; the end point is where the indicator changes colour. A good indicator makes them nearly coincide.',
            },
          ],
          quiz: [
            {
              question: '$20.00\\ \\mathrm{mL}$ of $\\mathrm{H_2SO_4}$ is titrated with $0.2000\\ \\mathrm{M}$ NaOH; the end point is at $18.40\\ \\mathrm{mL}$. What is the concentration of the acid?',
              options: ['$0.1840\\ \\mathrm{M}$', '$0.2174\\ \\mathrm{M}$', '$0.3680\\ \\mathrm{M}$', '$0.09200\\ \\mathrm{M}$'],
              answer: 3,
              explanation:
                '$n(\\mathrm{NaOH}) = 0.01840 \\times 0.2000 = 3.680 \\times 10^{-3}\\ \\mathrm{mol}$; each $\\mathrm{H_2SO_4}$ uses two, so $1.840 \\times 10^{-3}\\ \\mathrm{mol}$ in $0.02000\\ \\mathrm{L}$: $0.09200\\ \\mathrm{M}$. $M_1V_1 = M_2V_2$ gives $0.1840$, ignoring the 2:1 ratio; $0.3680$ applies the ratio the wrong way; $0.2174$ inverts the volumes.',
            },
            {
              question: 'What is the oxidation number of manganese in the permanganate ion, $\\mathrm{MnO_4^-}$?',
              options: ['$+7$', '$+8$', '$-1$', '$+4$'],
              answer: 0,
              explanation:
                '$x + 4(-2) = -1$, so $x = +7$. Forgetting the ion\'s charge gives $+8$; $-1$ is the charge of the whole ion, not of Mn.',
            },
            {
              question: 'In $\\mathrm{Zn(s)} + \\mathrm{Cu^{2+}(aq)} \\rightarrow \\mathrm{Zn^{2+}(aq)} + \\mathrm{Cu(s)}$, which statement is correct?',
              options: [
                'Zn is reduced and is the oxidising agent',
                '$\\mathrm{Cu^{2+}}$ is oxidised',
                'Zn is oxidised and is the reducing agent; $\\mathrm{Cu^{2+}}$ is the oxidising agent',
                'No electrons are transferred because the charges balance',
              ],
              answer: 2,
              explanation:
                'Zn loses two electrons (0 to $+2$): oxidised, so it is the reducing agent. $\\mathrm{Cu^{2+}}$ gains them: reduced, so it is the oxidising agent. The agent is named for what it does to the *other* species, which is why "Zn is the oxidising agent" is the usual mix-up.',
            },
            {
              question: '$25.0\\ \\mathrm{mL}$ of $0.10\\ \\mathrm{M}$ HCl and $25.0\\ \\mathrm{mL}$ of $0.10\\ \\mathrm{M}$ acetic acid are each titrated with $0.10\\ \\mathrm{M}$ NaOH. Which needs more base?',
              options: [
                'HCl, because it is a strong acid',
                'Acetic acid, because it has more H atoms',
                'HCl, because acetic acid is only a few percent ionised',
                'They need the same volume, $25.0\\ \\mathrm{mL}$',
              ],
              answer: 3,
              explanation:
                'Both contain $2.5\\ \\mathrm{mmol}$ of acidic protons. As $\\mathrm{OH^-}$ removes the ionised ones, more acetic acid ionises until all has reacted, so both need $25.0\\ \\mathrm{mL}$. Strength affects the pH along the way, not the amount of base. Only the O–H hydrogen of acetic acid is acidic, not all four H atoms.',
            },
          ],
        },
      ],
      project: {
        slug: 'stoichiometry-spreadsheet',
        title: 'A reaction-stoichiometry spreadsheet',
        description: `Build a spreadsheet (no programming needed) that does what the limiting-reagent widget does, for any reaction you type in. One sheet holds a table of atomic masses (IUPAC values). For a reaction with up to three reactants and three products, the user enters each formula's element counts and coefficient; the sheet computes molar masses, converts entered masses (or solution volumes and molarities) to moles, finds the limiting reagent with n/ν, and reports the theoretical yield of each product, the leftover mass of each excess reagent, the mass balance check, and the percent yield from an entered actual yield. Test it on the worked examples of this module and on three reactions of your own, including one precipitation with solution volumes.`,
        deliverables: [
          'The spreadsheet, with input cells clearly marked and a mass-balance check that turns red when mass is not conserved',
          'Test cases: every worked example in this module reproduced to the stated significant figures',
          'Three new reactions with hand calculations that agree with the sheet',
          'A half-page user guide',
        ],
        estimatedHours: 3,
        stretchGoals: ['Add an "excess %" input that tells the user how much of each reagent to weigh for a chosen excess of the cheaper one'],
      },
    },
    {
      slug: 'gases',
      title: 'Gases',
      description:
        'Pressure and the empirical gas laws, the ideal gas law and gas stoichiometry, mixtures and partial pressures, the kinetic-molecular theory that explains them all, and how real gases depart from ideal behaviour.',
      lessons: [
        {
          slug: 'pressure-and-the-gas-laws',
          title: 'Pressure and the simple gas laws',
          summary:
            'What gas pressure is and how it is measured, and the laws of Boyle, Charles, Gay-Lussac and Avogadro, combined into one relation, with temperature always in kelvin.',
          estimatedMinutes: 100,
          objectives: [
            'Explain pressure as force per area from molecular collisions and convert between atm, torr, mmHg, kPa and bar',
            'Describe how a barometer and a manometer measure pressure',
            'State and apply Boyle\'s, Charles\'s, Gay-Lussac\'s and Avogadro\'s laws',
            'Use the combined gas law to find a new state of a fixed amount of gas',
            'Explain why gas-law temperatures must be in kelvin',
          ],
          concepts: [
            'Pressure = force / area',
            '1 atm = 760 torr = 101.325 kPa',
            'Barometer and manometer',
            'Boyle: PV constant at fixed n, T',
            'Charles: V ∝ T at fixed n, P',
            'Gay-Lussac: P ∝ T at fixed n, V',
            'Avogadro: V ∝ n at fixed P, T',
            'Combined gas law',
          ],
          explanation: `Gas molecules are far apart and in fast, random motion. Each collision with a wall pushes on it; the average force per unit area is the **pressure**. The SI unit is the pascal ($1\\ \\mathrm{Pa} = 1\\ \\mathrm{N\\,m^{-2}}$), but chemists also use

$$1\\ \\mathrm{atm} = 760\\ \\mathrm{torr} = 760\\ \\mathrm{mmHg} = 101.325\\ \\mathrm{kPa} = 1.01325\\ \\mathrm{bar}.$$

A **barometer** balances the atmosphere against a column of mercury, which stands about $760\\ \\mathrm{mm}$ high at sea level; a **manometer** compares a gas sample with the atmosphere through the difference in height of two liquid columns.

**The empirical laws.** Four experiments, each holding two quantities fixed, describe how a gas behaves:

- **Boyle** (fixed $n$, $T$): $PV$ is constant. Halve the volume and the pressure doubles, because the molecules hit each area of wall twice as often.
- **Charles** (fixed $n$, $P$): $V \\propto T$. A warmer gas pushes the free piston out.
- **Gay-Lussac** (fixed $n$, $V$): $P \\propto T$. Faster molecules hit harder and more often.
- **Avogadro** (fixed $P$, $T$): $V \\propto n$. Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules, whatever the gas.

The proportionalities in $T$ hold only on the **kelvin** scale. Plot the volume of a gas against Celsius temperature and you get a straight line that, extended, reaches zero volume at $-273.15\\ ^\\circ\\mathrm{C}$; that is absolute zero, the origin of the kelvin scale.

\`\`\`interactive
gas-laws
{"n": 1, "T": 300, "V": 24.62, "hold": "V", "graph": "PV", "caption": "The piston is locked. Drag V and watch the state move along the Boyle hyperbola: PV stays at nRT (read the PV/nT readout, which stays at R). Press Play to see the particles. Then free the piston and switch the graph to V vs T: drag T and the volume follows a straight line that extrapolates to −273.15 °C, not to 0 °C."}
\`\`\`

**The combined gas law.** For a fixed amount of gas changing from state 1 to state 2,

$$\\frac{P_1V_1}{T_1} = \\frac{P_2V_2}{T_2}.$$

**Worked example.** A weather balloon holds $2.50\\ \\mathrm{L}$ of helium at $745\\ \\mathrm{torr}$ and $22.0\\ ^\\circ\\mathrm{C}$. It rises to where the pressure is $380\\ \\mathrm{torr}$ and the temperature $-15.0\\ ^\\circ\\mathrm{C}$. Converting to kelvin ($295.15$ and $258.15\\ \\mathrm{K}$):

$$V_2 = V_1 \\times \\frac{P_1}{P_2} \\times \\frac{T_2}{T_1} = 2.50\\ \\mathrm{L} \\times \\frac{745}{380} \\times \\frac{258.15}{295.15} = 4.29\\ \\mathrm{L}.$$

A good habit is to check each factor's direction: lower pressure should expand the balloon (factor above 1), cooling should shrink it (factor below 1). Pressure units cancel, so any unit works as long as both are the same.

**Pitfalls.** Using Celsius (the classic mistake: "doubling" $20\\ ^\\circ\\mathrm{C}$ to $40\\ ^\\circ\\mathrm{C}$ raises the absolute temperature by under 7 %); mixing pressure units between the two states; and applying Boyle's law when the temperature also changes. Read OpenStax 9.1 and the first half of 9.2.`,
          resources: [
            ostx('9-1-gas-pressure', '9.1 Gas pressure', 'Pressure, units, barometers and manometers.', true),
            ostx('9-2-relating-pressure-volume-amount-and-temperature-the-ideal-gas-law', '9.2 Relating pressure, volume, amount and temperature', 'The empirical laws with data and graphs, leading to the ideal gas law.'),
            phet('gas-properties', 'Gas Properties', 'Pump particles into a box, hold different quantities constant and test each law; the "Laws" screen is ideal.'),
            phet('gases-intro', 'Gases Intro', 'A simpler first look at pressure, volume and temperature.'),
          ],
          exercises: [
            {
              slug: 'unit-conversions',
              title: 'Pressure units',
              prompt: `Convert: (a) $745\\ \\mathrm{torr}$ to atm and kPa; (b) $2.50\\ \\mathrm{bar}$ to atm; (c) a tyre gauge reading of $32\\ \\mathrm{psi}$ (gauge pressure, above atmospheric) to absolute pressure in kPa ($1\\ \\mathrm{atm} = 14.7\\ \\mathrm{psi}$). (d) A mercury barometer reads $630\\ \\mathrm{mmHg}$ in Denver. Why would a water barometer be impractical? (Mercury is $13.6$ times denser than water.)`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 0.980 atm, 99.3 kPa. (b) 2.47 atm. (c) 46.7 psi absolute = 3.18 atm = 322 kPa. (d) The column would be 13.6 × 630 mm ≈ 8.6 m tall.',
            },
            {
              slug: 'gas-law-problems',
              title: 'Gas-law problems',
              prompt: `(a) A $12.0\\ \\mathrm{L}$ scuba tank at $200.\\ \\mathrm{atm}$ releases its air at $1.00\\ \\mathrm{atm}$ and the same temperature. What volume does the air occupy? (b) A $2.50\\ \\mathrm{L}$ balloon at $20.0\\ ^\\circ\\mathrm{C}$ is warmed to $80.0\\ ^\\circ\\mathrm{C}$ at constant pressure. New volume? (c) A tyre is at $32\\ \\mathrm{psi}$ gauge pressure at $10\\ ^\\circ\\mathrm{C}$. After driving it reaches $35\\ ^\\circ\\mathrm{C}$; assuming constant volume, what is the new gauge pressure? Check each with the widget.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2.40 × 10³ L. (b) 3.01 L. (c) Use absolute pressure: 46.7 psi × 308.15/283.15 = 50.8 psi absolute, 36 psi gauge. Using gauge pressure directly gives a wrong answer.',
            },
            {
              slug: 'charles-data',
              title: 'Find absolute zero from data',
              prompt: `A student traps air in a syringe and measures: $V = 30.0, 32.0, 34.1, 36.1\\ \\mathrm{mL}$ at $t = 0, 20, 40, 60\\ ^\\circ\\mathrm{C}$. Plot $V$ against $t$, fit a straight line (by eye or with a spreadsheet), and extrapolate to $V = 0$. How close do you get to $-273\\ ^\\circ\\mathrm{C}$? Name two sources of error in such an experiment.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'The slope is about 0.102 mL/°C and the intercept 30.0 mL, giving t ≈ −294 °C; small errors in the slope move the extrapolated point a lot. Friction in the syringe and water vapour are common culprits.',
            },
          ],
          selfAssessment: [
            {
              question: 'Explain Boyle\'s law in terms of molecular collisions.',
              answerOutline: 'Halving the volume doubles the number of molecules per unit volume, so collisions with each unit of wall area double, doubling the pressure at the same temperature (same average speed).',
            },
            {
              question: 'Why must gas-law temperatures be in kelvin?',
              answerOutline: 'Volume and pressure are proportional to absolute temperature, measured from absolute zero; Celsius has an arbitrary zero, so ratios of Celsius temperatures are meaningless.',
            },
            {
              question: 'State Avogadro\'s law and one consequence for reactions between gases.',
              answerOutline: 'At the same T and P, equal volumes contain equal numbers of molecules (V ∝ n). So volumes of reacting gases are in the ratio of their coefficients (e.g. 1 L N₂ with 3 L H₂ gives 2 L NH₃).',
            },
          ],
          quiz: [
            {
              question: 'A sealed rigid container of gas at $2.00\\ \\mathrm{atm}$ and $25\\ ^\\circ\\mathrm{C}$ is heated to $125\\ ^\\circ\\mathrm{C}$. What is the new pressure?',
              options: ['$10.0\\ \\mathrm{atm}$', '$2.67\\ \\mathrm{atm}$', '$1.50\\ \\mathrm{atm}$', '$2.00\\ \\mathrm{atm}$'],
              answer: 1,
              explanation:
                '$P_2 = 2.00 \\times 398.15/298.15 = 2.67\\ \\mathrm{atm}$. Using Celsius gives $2.00 \\times 125/25 = 10.0\\ \\mathrm{atm}$, the classic error. $1.50$ inverts the ratio; heating a rigid container cannot lower its pressure.',
            },
            {
              question: 'You push a sealed syringe from $60\\ \\mathrm{mL}$ to $20\\ \\mathrm{mL}$ slowly enough that its temperature stays constant. What happens to the pressure of the air inside?',
              options: ['It falls to one third', 'It rises by $40\\ \\mathrm{mL}$ worth', 'It triples', 'It stays the same because the temperature is constant'],
              answer: 2,
              explanation:
                'Boyle\'s law: $P_1V_1 = P_2V_2$, so $P_2 = P_1 \\times 60/20 = 3P_1$. Constant temperature keeps the molecules\' speed fixed, but three times as many hit each square centimetre per second.',
            },
            {
              question: 'A barometer reads $745\\ \\mathrm{torr}$. What is this in kilopascals?',
              options: ['$99.3\\ \\mathrm{kPa}$', '$0.980\\ \\mathrm{kPa}$', '$75\\,500\\ \\mathrm{kPa}$', '$745\\ \\mathrm{kPa}$'],
              answer: 0,
              explanation:
                '$745\\ \\mathrm{torr} \\times \\dfrac{101.325\\ \\mathrm{kPa}}{760\\ \\mathrm{torr}} = 99.3\\ \\mathrm{kPa}$. $0.980$ is the value in atm with the wrong unit; multiplying instead of dividing by 760 gives the absurd $75\\,500$.',
            },
          ],
        },
        {
          slug: 'the-ideal-gas-law',
          title: 'The ideal gas law and gas stoichiometry',
          summary:
            'PV = nRT combines the simple laws. Use it to find any one variable, the molar mass of a gas from its density, and the volumes of gases made or used in reactions.',
          estimatedMinutes: 115,
          objectives: [
            'Use PV = nRT with consistent units and the right value of R',
            'Know the molar volume of an ideal gas at STP and its definition',
            'Determine the molar mass of a gas from its density or from mass, P, V and T',
            'Solve stoichiometry problems in which reactants or products are gases',
          ],
          concepts: [
            'Ideal gas law PV = nRT',
            'R = 0.08206 L atm/(mol K) = 8.314 J/(mol K)',
            'STP and molar volume 22.41 L',
            'Density and molar mass: M = dRT/P',
            'Gas stoichiometry through moles',
            'Volume ratios equal mole ratios for gases',
          ],
          explanation: `Combining Boyle, Charles and Avogadro, $V \\propto nT/P$. Writing the proportionality constant as $R$ gives the **ideal gas law**:

$$PV = nRT, \\qquad R = 0.08206\\ \\mathrm{L\\,atm\\,mol^{-1}\\,K^{-1}} = 8.314\\ \\mathrm{J\\,mol^{-1}\\,K^{-1}}.$$

The two values are the same constant in different units ($1\\ \\mathrm{L\\,atm} = 101.325\\ \\mathrm{J}$). Use $0.08206$ with litres and atmospheres, and $8.314$ with SI units (pascals and cubic metres, or whenever energy in joules is involved). Mixing the two is the commonest error with this law.

**Molar volume.** At **STP**, $0\\ ^\\circ\\mathrm{C}$ and $1\\ \\mathrm{atm}$, one mole of an ideal gas occupies $V = RT/P = 0.08206 \\times 273.15 = 22.41\\ \\mathrm{L}$. (IUPAC now defines STP at $1\\ \\mathrm{bar}$, which gives $22.71\\ \\mathrm{L}$; always check which a source uses.) At $25\\ ^\\circ\\mathrm{C}$ and $1\\ \\mathrm{atm}$ the molar volume is $24.47\\ \\mathrm{L}$.

**Molar mass from density.** Substituting $n = m/M$ and $d = m/V$ gives

$$M = \\frac{dRT}{P}.$$

A gas with density $1.25\\ \\mathrm{g\\,L^{-1}}$ at STP has $M = 1.25 \\times 0.08206 \\times 273.15/1.00 = 28.0\\ \\mathrm{g\\,mol^{-1}}$: nitrogen, or carbon monoxide. Heavier gases are denser, which is why $\\mathrm{CO_2}$ collects in low places.

\`\`\`interactive
gas-laws
{"n": 1, "T": 300, "V": 24.62, "hold": "P", "graph": "VT", "caption": "The piston is free, so P stays at about 1 atm. Change n and watch V grow in proportion (Avogadro); change T and V follows the Charles line. At 273 K and n = 1 the volume is about 22.4 L, the molar volume at STP. The readout PV/nT always shows the same number, R in L·atm/(mol·K)."}
\`\`\`

**Gas stoichiometry.** The ideal gas law turns a gas volume into moles, and the balanced equation does the rest. **Worked example.** A car airbag inflates by decomposing sodium azide: $2\\,\\mathrm{NaN_3(s)} \\rightarrow 2\\,\\mathrm{Na(s)} + 3\\,\\mathrm{N_2(g)}$. What mass of $\\mathrm{NaN_3}$ fills a $65.0\\ \\mathrm{L}$ bag at $1.00\\ \\mathrm{atm}$ and $25.0\\ ^\\circ\\mathrm{C}$?

$$n(\\mathrm{N_2}) = \\frac{PV}{RT} = \\frac{(1.00)(65.0)}{(0.08206)(298.15)} = 2.657\\ \\mathrm{mol},$$

$$2.657\\ \\mathrm{mol\\ N_2} \\times \\frac{2\\ \\mathrm{mol\\ NaN_3}}{3\\ \\mathrm{mol\\ N_2}} \\times \\frac{65.02\\ \\mathrm{g}}{1\\ \\mathrm{mol}} = 115\\ \\mathrm{g\\ NaN_3}.$$

When all the gases are at the same $T$ and $P$, volumes are proportional to moles, so you can use coefficients directly as volume ratios: $1\\ \\mathrm{L}$ of $\\mathrm{N_2}$ reacts with $3\\ \\mathrm{L}$ of $\\mathrm{H_2}$.

**Why "ideal"?** The law assumes molecules take up no space and do not attract each other. It is excellent for most gases near room conditions and fails at high pressure or low temperature (the last lesson of this module). Pitfalls: Celsius, millilitres, and torr used with $R = 0.08206$; and treating the molar volume $22.4\\ \\mathrm{L}$ as valid at any temperature. Read the rest of OpenStax 9.2 and 9.3.`,
          resources: [
            ostx('9-2-relating-pressure-volume-amount-and-temperature-the-ideal-gas-law', '9.2 The ideal gas law', 'PV = nRT, STP and the molar volume, with worked examples.', true),
            ostx('9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions', '9.3 Stoichiometry of gaseous substances, mixtures and reactions', 'Density and molar mass of gases and gas stoichiometry.'),
            phet('gas-properties', 'Gas Properties', 'Check PV = nRT numerically: read P, V, T and the particle count and compute R.'),
          ],
          exercises: [
            {
              slug: 'ideal-gas-calculations',
              title: 'Ideal gas calculations',
              prompt: `(a) What volume does $10.0\\ \\mathrm{g}$ of $\\mathrm{CO_2}$ occupy at $25.0\\ ^\\circ\\mathrm{C}$ and $0.950\\ \\mathrm{atm}$? (b) How many moles of gas are in a $50.0\\ \\mathrm{L}$ cylinder at $150.\\ \\mathrm{atm}$ and $25.0\\ ^\\circ\\mathrm{C}$, and what mass is that if the gas is $\\mathrm{O_2}$? (c) What is the density of air ($M = 28.96\\ \\mathrm{g\\,mol^{-1}}$) at $25.0\\ ^\\circ\\mathrm{C}$ and $1.00\\ \\mathrm{atm}$? Why does a hot-air balloon rise?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 0.2272 mol → 5.85 L. (b) 307 mol, 9.81 kg. (c) 1.18 g/L. Hotter air has lower density (d = PM/RT), so the balloon displaces more weight of cool air than it weighs.',
            },
            {
              slug: 'identify-the-gas',
              title: 'Identify a gas',
              prompt: `A $250.0\\ \\mathrm{mL}$ flask holds $0.580\\ \\mathrm{g}$ of an unknown hydrocarbon gas at $25.0\\ ^\\circ\\mathrm{C}$ and $755\\ \\mathrm{torr}$. (a) Find its molar mass. (b) Its composition is $82.7\\,\\%$ C and $17.3\\,\\%$ H. Find the molecular formula. (c) Draw two possible structures.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) M = mRT/PV = 57.1 g/mol. (b) Empirical C₂H₅ (29.06); 57.1/29.06 ≈ 2: C₄H₁₀ (58.12). (c) Butane and 2-methylpropane.',
            },
            {
              slug: 'gas-stoichiometry',
              title: 'Gas stoichiometry',
              prompt: `(a) What volume of $\\mathrm{O_2}$ at STP is needed to burn $1.00\\ \\mathrm{g}$ of propane completely, and what volume of $\\mathrm{CO_2}$ at STP forms? (b) $5.00\\ \\mathrm{L}$ of $\\mathrm{N_2}$ and $12.0\\ \\mathrm{L}$ of $\\mathrm{H_2}$, both at the same $T$ and $P$, react to form ammonia. Which is limiting and what volume of $\\mathrm{NH_3}$ forms at the same $T$ and $P$? (c) Why could you solve (b) without knowing $T$ or $P$?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 0.02268 mol propane needs 0.1134 mol O₂ = 2.54 L; CO₂ 0.0680 mol = 1.52 L. (b) H₂ limiting (12.0/3 < 5.00): 8.00 L NH₃. (c) Avogadro: at fixed T and P, volume ratios are mole ratios.',
            },
          ],
          selfAssessment: [
            {
              question: 'When do you use R = 0.08206 and when 8.314?',
              answerOutline: '0.08206 L atm/(mol K) when P is in atm and V in L; 8.314 J/(mol K) with SI units (Pa, m³) or when an energy in joules is wanted. Both need T in K.',
            },
            {
              question: 'Derive M = dRT/P from the ideal gas law.',
              answerOutline: 'PV = nRT with n = m/M gives PV = (m/M)RT, so M = (m/V)(RT/P) = dRT/P.',
            },
            {
              question: 'Why is 22.4 L/mol not the molar volume at room temperature?',
              answerOutline: 'It is RT/P at 273.15 K and 1 atm; at 298 K the molar volume is 24.5 L. Molar volume depends on T and P (and IUPAC STP at 1 bar gives 22.7 L).',
            },
          ],
          quiz: [
            {
              question: 'What mass of $\\mathrm{O_2}$ is in a $50.0\\ \\mathrm{L}$ cylinder at $150.\\ \\mathrm{atm}$ and $25\\ ^\\circ\\mathrm{C}$?',
              options: ['$117\\ \\mathrm{kg}$', '$96.8\\ \\mathrm{g}$', '$9.81\\ \\mathrm{kg}$', '$4.90\\ \\mathrm{kg}$'],
              answer: 2,
              explanation:
                '$n = PV/RT = (150)(50.0)/(0.08206 \\times 298.15) = 306.5\\ \\mathrm{mol}$; $\\times 32.00\\ \\mathrm{g\\,mol^{-1}} = 9.81\\ \\mathrm{kg}$. Using $25$ (Celsius) for $T$ gives $117\\ \\mathrm{kg}$; using $R = 8.314$ with atm and L gives $96.8\\ \\mathrm{g}$; using $16.00$ for $\\mathrm{O_2}$ gives $4.90\\ \\mathrm{kg}$.',
            },
            {
              question: 'A gas has a density of $1.96\\ \\mathrm{g\\,L^{-1}}$ at STP ($0\\ ^\\circ\\mathrm{C}$, $1\\ \\mathrm{atm}$). Which gas is it most likely to be?',
              options: ['$\\mathrm{N_2}$', '$\\mathrm{O_2}$', '$\\mathrm{Ar}$', '$\\mathrm{CO_2}$'],
              answer: 3,
              explanation:
                '$M = dRT/P = 1.96 \\times 0.08206 \\times 273.15 / 1.00 = 43.9\\ \\mathrm{g\\,mol^{-1}}$, matching $\\mathrm{CO_2}$ ($44.01$). $\\mathrm{N_2}$, $\\mathrm{O_2}$ and Ar would have densities of $1.25$, $1.43$ and $1.78\\ \\mathrm{g\\,L^{-1}}$.',
            },
            {
              question: 'Two identical flasks at the same temperature and pressure hold $\\mathrm{H_2}$ and $\\mathrm{CO_2}$. Which statement is true?',
              options: [
                'They contain the same number of molecules, but the $\\mathrm{CO_2}$ flask is about 22 times heavier',
                'The $\\mathrm{H_2}$ flask contains more molecules because hydrogen molecules are smaller',
                'The $\\mathrm{CO_2}$ flask contains more molecules because $\\mathrm{CO_2}$ is heavier',
                'They contain the same mass of gas',
              ],
              answer: 0,
              explanation:
                'Avogadro\'s law: equal $V$, $T$ and $P$ mean equal $n$, independent of molecular size or mass. Masses then differ in the ratio of molar masses, $44.01/2.016 = 21.8$. In an ideal gas the size of the molecules plays no role.',
            },
          ],
        },
        {
          slug: 'partial-pressures-and-gas-mixtures',
          title: 'Partial pressures and gas mixtures',
          summary:
            'In a mixture each gas exerts its own pressure as if alone. Dalton\'s law, mole fractions, and the everyday case of a gas collected over water.',
          estimatedMinutes: 100,
          objectives: [
            'State Dalton\'s law of partial pressures and explain it with the ideal gas law',
            'Calculate partial pressures from mole fractions and the reverse',
            'Correct for water vapour when a gas is collected over water',
            'Apply partial pressures to breathing, diving and altitude',
          ],
          concepts: [
            'Partial pressure',
            'Dalton\'s law: P_total = ΣP_i',
            'Mole fraction χ_i = n_i/n_total',
            'P_i = χ_i P_total',
            'Collecting a gas over water',
            'Vapour pressure of water',
          ],
          explanation: `In an ideal gas the molecules ignore one another, so in a mixture each gas behaves as if it were alone in the container. Its **partial pressure** $P_i$ is the pressure it would exert by itself: $P_i = n_iRT/V$. Adding them gives **Dalton's law**:

$$P_\\text{total} = P_A + P_B + \\cdots = (n_A + n_B + \\cdots)\\frac{RT}{V}.$$

Pressure depends on the number of molecules, not on their identity. Dividing $P_i$ by $P_\\text{total}$ gives the **mole fraction** $\\chi_i = n_i/n_\\text{total}$, so

$$P_i = \\chi_i\\,P_\\text{total}.$$

Dry air is $78.08\\,\\%$ $\\mathrm{N_2}$ and $20.95\\,\\%$ $\\mathrm{O_2}$ by moles; at sea level the partial pressure of oxygen is $0.2095\\ \\mathrm{atm}$. On a mountain at $0.65\\ \\mathrm{atm}$ total, the fraction is unchanged but $P_{\\mathrm{O_2}}$ falls to $0.136\\ \\mathrm{atm}$, which is what makes breathing hard. Divers face the reverse problem: at depth the total pressure rises, and so does $P_{\\mathrm{O_2}}$, which becomes toxic above about $1.4\\ \\mathrm{atm}$; deep-diving mixtures therefore *lower* the oxygen fraction.

\`\`\`interactive
gas-laws
{"n": 1, "T": 300, "V": 20, "hold": "V", "graph": "PV", "mixture": true, "n2": 0.5, "labels": ["N₂", "He"], "M": [28, 4], "caption": "Two gases share the cylinder. Change the moles of He and watch its partial pressure change while the N₂ partial pressure stays put: each gas acts as if alone. The partial pressures always add to the total, and each equals its mole fraction times the total. Press Play: He particles move faster (smaller M), yet a mole of He pushes no harder than a mole of N₂."}
\`\`\`

**Collecting a gas over water.** A gas made in the lab is often bubbled into an inverted bottle of water. What collects is the gas *plus* water vapour, at the vapour pressure of water for that temperature ($23.8\\ \\mathrm{torr}$ at $25\\ ^\\circ\\mathrm{C}$). With the water levels inside and outside equal, the total equals the barometric pressure, and

$$P_\\text{gas} = P_\\text{atm} - P_{\\mathrm{H_2O}}.$$

**Worked example.** Zinc reacts with acid, $\\mathrm{Zn} + 2\\,\\mathrm{HCl} \\rightarrow \\mathrm{ZnCl_2} + \\mathrm{H_2}$, and $245\\ \\mathrm{mL}$ of gas is collected over water at $25.0\\ ^\\circ\\mathrm{C}$ and $755.0\\ \\mathrm{torr}$. Then $P_{\\mathrm{H_2}} = 755.0 - 23.8 = 731.2\\ \\mathrm{torr} = 0.9621\\ \\mathrm{atm}$, so

$$n(\\mathrm{H_2}) = \\frac{(0.9621)(0.245)}{(0.08206)(298.15)} = 9.63 \\times 10^{-3}\\ \\mathrm{mol},$$

and the zinc that reacted was $9.63 \\times 10^{-3} \\times 65.38 = 0.630\\ \\mathrm{g}$. Forgetting the water vapour would overestimate the hydrogen by about 3 %.

**Pitfalls.** Using the total pressure for one component; using a mass fraction instead of a mole fraction (equal masses of He and $\\mathrm{N_2}$ give He seven times the partial pressure, because there are seven times as many He atoms); and using the water vapour pressure at the wrong temperature. Read OpenStax 9.3 (partial pressures).`,
          resources: [
            ostx('9-3-stoichiometry-of-gaseous-substances-mixtures-and-reactions', '9.3 Stoichiometry of gaseous substances, mixtures and reactions', 'Dalton\'s law, mole fractions and collecting gases over water, with the vapour-pressure table of water.', true),
            phet('gas-properties', 'Gas Properties', 'Add heavy and light species to one box and compare the pressure each produces.'),
            nistWebBook('Look up the vapour pressure of water at any temperature (search "water", then "Phase change data").'),
          ],
          exercises: [
            {
              slug: 'mixture-calculations',
              title: 'Mixture calculations',
              prompt: `A $10.0\\ \\mathrm{L}$ flask at $300.\\ \\mathrm{K}$ contains $1.00\\ \\mathrm{mol}$ of $\\mathrm{N_2}$ and $0.500\\ \\mathrm{mol}$ of He. (a) Find each partial pressure and the total. (b) Find the mole fractions and check $P_i = \\chi_iP_\\text{total}$. (c) $0.500\\ \\mathrm{mol}$ of Ar is added at constant $V$ and $T$. What happens to $P_{\\mathrm{N_2}}$? To $\\chi_{\\mathrm{N_2}}$? Set the widget to the same numbers and confirm.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) N₂ 2.46 atm, He 1.23 atm, total 3.69 atm. (c) P(N₂) is unchanged; its mole fraction falls from 0.667 to 0.500.',
            },
            {
              slug: 'over-water',
              title: 'Oxygen collected over water',
              prompt: `Heating $\\mathrm{KClO_3}$ ($2\\,\\mathrm{KClO_3} \\rightarrow 2\\,\\mathrm{KCl} + 3\\,\\mathrm{O_2}$) produces $0.350\\ \\mathrm{L}$ of gas collected over water at $22.0\\ ^\\circ\\mathrm{C}$ (water vapour pressure $19.8\\ \\mathrm{torr}$) and a barometric pressure of $748\\ \\mathrm{torr}$. Find the moles of $\\mathrm{O_2}$ and the mass of $\\mathrm{KClO_3}$ that decomposed. By what percentage would you be wrong if you ignored the water vapour?`,
              kind: 'problem',
              difficulty: 2,
              hint: 'P(O₂) = 728.2 torr = 0.9582 atm; n = 0.01385 mol; KClO₃ 0.009233 mol = 1.13 g. Ignoring water overestimates by 19.8/728.2 = 2.7 %.',
            },
            {
              slug: 'diving-gas',
              title: 'Diving gas',
              prompt: `Pressure under water rises by about $1\\ \\mathrm{atm}$ every $10\\ \\mathrm{m}$. (a) What is $P_{\\mathrm{O_2}}$ for a diver breathing air at $40\\ \\mathrm{m}$ (total $5.0\\ \\mathrm{atm}$)? (b) What oxygen mole fraction keeps $P_{\\mathrm{O_2}}$ at $1.4\\ \\mathrm{atm}$ at $60\\ \\mathrm{m}$? (c) Why is helium used to replace much of the nitrogen in deep-diving mixtures? (One or two sentences; nitrogen narcosis is the key term.)`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 0.2095 × 5.0 = 1.05 atm. (b) 1.4/7.0 = 0.20, so at 60 m even ordinary air is at the limit; deeper dives need less oxygen than air.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does each gas in a mixture contribute to the pressure independently?',
              answerOutline: 'In an ideal gas molecules do not interact; each species\' collisions with the walls depend only on its own number density and temperature.',
            },
            {
              question: 'How do you find the pressure of a dry gas collected over water?',
              answerOutline: 'Subtract the vapour pressure of water at the collection temperature from the total (barometric) pressure.',
            },
            {
              question: 'Equal masses of He and N₂ are mixed. Which has the larger partial pressure, and by what factor?',
              answerOutline: 'He: partial pressure is proportional to moles, and n = m/M, so the ratio is M(N₂)/M(He) = 28.02/4.003 ≈ 7.',
            },
          ],
          quiz: [
            {
              question: '$0.150\\ \\mathrm{g}$ of Mg reacts with excess HCl ($\\mathrm{Mg} + 2\\,\\mathrm{HCl} \\rightarrow \\mathrm{MgCl_2} + \\mathrm{H_2}$). The hydrogen is collected over water at $25.0\\ ^\\circ\\mathrm{C}$ ($P_{\\mathrm{H_2O}} = 23.8\\ \\mathrm{torr}$) and $752\\ \\mathrm{torr}$. What volume of gas is collected?',
              options: ['$153\\ \\mathrm{mL}$', '$158\\ \\mathrm{mL}$', '$12.9\\ \\mathrm{mL}$', '$76\\ \\mathrm{mL}$'],
              answer: 1,
              explanation:
                '$n(\\mathrm{H_2}) = 0.150/24.31 = 6.170 \\times 10^{-3}\\ \\mathrm{mol}$; $P_{\\mathrm{H_2}} = (752 - 23.8)/760 = 0.9582\\ \\mathrm{atm}$; $V = nRT/P = 0.158\\ \\mathrm{L}$. Ignoring water vapour gives $153\\ \\mathrm{mL}$; using $25$ instead of $298.15\\ \\mathrm{K}$ gives $12.9$; halving the moles gives $76$.',
            },
            {
              question: 'A mixture of $2.0\\ \\mathrm{mol}$ $\\mathrm{N_2}$, $1.0\\ \\mathrm{mol}$ $\\mathrm{O_2}$ and $1.0\\ \\mathrm{mol}$ He has a total pressure of $2.00\\ \\mathrm{atm}$. What is the partial pressure of $\\mathrm{O_2}$?',
              options: ['$0.667\\ \\mathrm{atm}$', '$1.00\\ \\mathrm{atm}$', '$2.00\\ \\mathrm{atm}$', '$0.500\\ \\mathrm{atm}$'],
              answer: 3,
              explanation:
                '$\\chi_{\\mathrm{O_2}} = 1.0/4.0 = 0.25$, so $P_{\\mathrm{O_2}} = 0.25 \\times 2.00 = 0.500\\ \\mathrm{atm}$. Dividing equally among three gases gives $0.667$; the total pressure belongs to the mixture, not to one gas.',
            },
            {
              question: 'Equal masses of helium and nitrogen are put in a container. Which statement is correct?',
              options: [
                'Helium has about seven times the partial pressure of nitrogen',
                'They have equal partial pressures because their masses are equal',
                'Nitrogen has the larger partial pressure because its molecules are heavier',
                'Helium has the larger partial pressure because its atoms move faster',
              ],
              answer: 0,
              explanation:
                'Partial pressure is proportional to moles. $n = m/M$, so helium ($4.00\\ \\mathrm{g\\,mol^{-1}}$) has $28.0/4.00 = 7$ times as many particles as $\\mathrm{N_2}$. Faster atoms is a real effect but not the reason: at equal temperature lighter particles hit more often but less hard, and a mole of any gas exerts the same pressure.',
            },
          ],
        },
        {
          slug: 'kinetic-molecular-theory-and-real-gases',
          title: 'Kinetic-molecular theory and real gases',
          summary:
            'A model of tiny, fast, non-interacting particles explains every gas law, predicts molecular speeds and Graham\'s law, and shows where real gases depart from ideal behaviour.',
          estimatedMinutes: 115,
          objectives: [
            'State the postulates of the kinetic-molecular theory and use them to explain the gas laws',
            'Relate average kinetic energy to temperature and compute root-mean-square speeds',
            'Describe the Maxwell-Boltzmann distribution of speeds and how it depends on T and M',
            'Apply Graham\'s law of effusion',
            'Explain when and why real gases deviate from ideal behaviour, using the van der Waals equation',
          ],
          concepts: [
            'Postulates of the kinetic-molecular theory',
            'Average kinetic energy ∝ T',
            'Root-mean-square speed u_rms = √(3RT/M)',
            'Maxwell-Boltzmann speed distribution',
            'Effusion, diffusion and Graham\'s law',
            'Real gases: molecular volume and attractions',
            'van der Waals equation',
            'Compressibility factor PV/nRT',
          ],
          explanation: `The **kinetic-molecular theory** pictures a gas as (1) particles whose own volume is negligible compared with the container; (2) in constant, random, straight-line motion; (3) colliding elastically, with (4) no forces between them except during collisions; and (5) with an average kinetic energy proportional to the absolute temperature. From these alone Newton's laws give $PV = \\tfrac13 Nm\\overline{u^2}$, and comparing with $PV = nRT$ gives the average kinetic energy per mole:

$$\\overline{E_\\mathrm{k}} = \\tfrac32 RT.$$

That is what temperature *is* for a gas: a measure of the average energy of molecular motion. It explains each law: heat a gas and the molecules hit harder and more often (Gay-Lussac); compress it and they hit more often (Boyle).

**Speeds.** At a given temperature every gas has the same average kinetic energy, so lighter molecules move faster. The **root-mean-square speed** is

$$u_\\mathrm{rms} = \\sqrt{\\frac{3RT}{M}},$$

with $R = 8.314\\ \\mathrm{J\\,mol^{-1}\\,K^{-1}}$ and $M$ in **kg** per mole. For $\\mathrm{N_2}$ at $298\\ \\mathrm{K}$: $\\sqrt{3(8.314)(298.15)/0.02802} = 515\\ \\mathrm{m\\,s^{-1}}$, faster than a passenger jet. Not all molecules have this speed: the **Maxwell-Boltzmann distribution** spreads them out, and raising $T$ or lowering $M$ shifts the peak to higher speed and broadens it.

\`\`\`interactive
function-explorer
{"title": "Maxwell-Boltzmann distribution of molecular speeds", "f": "4*pi*(M/(2*pi*8.314*T))^1.5*x^2*exp(-M*x^2/(2*8.314*T))", "sliders": {"M": [0.028, 0.004, 0.13, 0.001], "T": [300, 100, 1500, 10]}, "view": [0, 2500, 0, 0.004], "caption": "The horizontal axis is molecular speed in m/s; the curve is the fraction of molecules per unit speed for molar mass M (kg/mol; 0.028 is N₂) at temperature T (K). The area under the curve is always 1. Raise T: the peak moves right and flattens. Lower M to 0.004 (helium): the same happens at a fixed T, because lighter molecules must move faster to have the same kinetic energy."}
\`\`\`

**Graham's law.** **Effusion** is escape through a tiny hole; its rate is proportional to the average speed, so for two gases at the same $T$

$$\\frac{\\text{rate}_A}{\\text{rate}_B} = \\sqrt{\\frac{M_B}{M_A}}.$$

Helium effuses $\\sqrt{39.95/4.003} = 3.16$ times faster than argon, which is why helium balloons go flat overnight. Diffusion (mixing) follows the same trend more slowly, because molecules keep colliding.

**Real gases.** The two weakest postulates are (1) and (4). At high pressure the molecules' own volume is no longer negligible, so the real gas is less compressible than ideal ($PV/nRT > 1$). At low temperature attractions pull molecules together and reduce the force of wall collisions ($PV/nRT < 1$). The **van der Waals equation** corrects both:

$$\\left(P + \\frac{an^2}{V^2}\\right)(V - nb) = nRT,$$

where $b$ is the excluded volume per mole and $a$ measures attraction. For $1.000\\ \\mathrm{mol}$ of $\\mathrm{CO_2}$ in $0.500\\ \\mathrm{L}$ at $300\\ \\mathrm{K}$ ($a = 3.59\\ \\mathrm{L^2\\,atm\\,mol^{-2}}$, $b = 0.0427\\ \\mathrm{L\\,mol^{-1}}$), the ideal gas law predicts $49.2\\ \\mathrm{atm}$; van der Waals gives $\\frac{24.62}{0.4573} - \\frac{3.59}{0.250} = 53.8 - 14.4 = 39.5\\ \\mathrm{atm}$, much closer to experiment. Gases behave most ideally at **high temperature and low pressure**, and molecules with strong attractions (large $a$: polar ones such as $\\mathrm{NH_3}$) deviate most.

Pitfalls: using $M$ in g/mol in $u_\\mathrm{rms}$ (answers come out 31.6 times too small); thinking heavier gases have more kinetic energy at the same $T$; and inverting Graham's law. Read OpenStax 9.4 to 9.6.`,
          resources: [
            ostx('9-5-the-kinetic-molecular-theory', '9.5 The kinetic-molecular theory', 'Postulates, the link between kinetic energy and temperature, molecular speeds and the Maxwell-Boltzmann distribution.', true),
            ostx('9-4-effusion-and-diffusion-of-gases', '9.4 Effusion and diffusion of gases', 'Graham\'s law with worked examples, including uranium enrichment.'),
            ostx('9-6-non-ideal-gas-behavior', '9.6 Non-ideal gas behavior', 'Compressibility factor, the van der Waals equation and its constants table.'),
            phet('diffusion', 'Diffusion', 'Mix two gases of different mass and temperature and watch the lighter one spread faster.'),
          ],
          exercises: [
            {
              slug: 'molecular-speeds',
              title: 'Molecular speeds',
              prompt: `(a) Compute $u_\\mathrm{rms}$ for He, $\\mathrm{N_2}$ and $\\mathrm{CO_2}$ at $300\\ \\mathrm{K}$, and for $\\mathrm{N_2}$ at $1200\\ \\mathrm{K}$. (b) By what factor must the temperature rise to double a gas's rms speed? (c) Compute the average kinetic energy of one mole of any gas at $300\\ \\mathrm{K}$, and explain why it is the same for He and $\\mathrm{CO_2}$ although their speeds differ. Use the widget to compare the distributions.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) He 1.37 × 10³ m/s, N₂ 517 m/s, CO₂ 412 m/s; N₂ at 1200 K: 1.03 × 10³ m/s (double, since T is four times larger). (b) 4. (c) 1.5RT = 3.74 kJ/mol.',
            },
            {
              slug: 'graham-problems',
              title: 'Graham\'s law',
              prompt: `(a) An unknown gas effuses $0.354$ times as fast as helium under the same conditions. Find its molar mass and suggest what it is. (b) Uranium was enriched by repeated effusion of $\\mathrm{UF_6}$. Compute the ratio of effusion rates of $^{235}\\mathrm{UF_6}$ ($349.0\\ \\mathrm{g\\,mol^{-1}}$) and $^{238}\\mathrm{UF_6}$ ($352.0\\ \\mathrm{g\\,mol^{-1}}$), and estimate how many stages are needed to go from $0.72\\,\\%$ to about $3\\,\\%$ $^{235}\\mathrm{U}$ if each stage multiplies the ratio by that factor.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) M = 4.003/0.354² = 31.9 g/mol: O₂. (b) √(352.0/349.0) = 1.0043. The abundance ratio must grow from 0.00725 to about 0.0309, a factor of 4.27: ln 4.27/ln 1.0043 ≈ 340 stages.',
            },
            {
              slug: 'ideal-vs-real',
              title: 'Ideal versus real',
              prompt: `For $1.000\\ \\mathrm{mol}$ of $\\mathrm{NH_3}$ in $1.000\\ \\mathrm{L}$ at $300.\\ \\mathrm{K}$ ($a = 4.17\\ \\mathrm{L^2\\,atm\\,mol^{-2}}$, $b = 0.0371\\ \\mathrm{L\\,mol^{-1}}$), compute the pressure from the ideal gas law and from the van der Waals equation. Which correction dominates, and why is that expected for ammonia? Repeat in $10.00\\ \\mathrm{L}$ and comment on how the two answers converge.`,
              kind: 'problem',
              difficulty: 2,
              hint: '1.000 L: ideal 24.6 atm; vdW 25.57 − 4.17 = 21.4 atm (attraction dominates: NH₃ hydrogen-bonds). 10.00 L: ideal 2.462, vdW 2.471 − 0.0417 = 2.429 atm, within 1.3 %.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the temperature of a gas measure, according to kinetic-molecular theory?',
              answerOutline: 'The average kinetic energy of its molecules: E_k(avg) = (3/2)RT per mole, independent of the gas.',
            },
            {
              question: 'Why do lighter gases effuse faster?',
              answerOutline: 'At the same T all gases have the same average kinetic energy ½mu², so lighter molecules have higher speeds and hit the hole more often; rate ∝ 1/√M.',
            },
            {
              question: 'Under what conditions do real gases deviate most from ideal behaviour, and what do a and b in the van der Waals equation correct for?',
              answerOutline: 'High pressure (molecular volume matters; b, the excluded volume) and low temperature (attractions matter; a, the attraction term). Polar or large molecules deviate most.',
            },
          ],
          quiz: [
            {
              question: 'What is the root-mean-square speed of $\\mathrm{O_2}$ molecules at $300\\ \\mathrm{K}$?',
              options: ['$15.3\\ \\mathrm{m\\,s^{-1}}$', '$145\\ \\mathrm{m\\,s^{-1}}$', '$484\\ \\mathrm{m\\,s^{-1}}$', '$48.0\\ \\mathrm{m\\,s^{-1}}$'],
              answer: 2,
              explanation:
                '$u_\\mathrm{rms} = \\sqrt{3(8.314)(300)/0.03200} = 484\\ \\mathrm{m\\,s^{-1}}$. Using $M = 32.00$ (g instead of kg) gives $15.3$; using $27\\ ^\\circ\\mathrm{C}$ in place of $300\\ \\mathrm{K}$ gives $145$; using $R = 0.08206$ gives $48.0$.',
            },
            {
              question: 'How many times faster does $\\mathrm{H_2}$ effuse than $\\mathrm{O_2}$ at the same temperature and pressure?',
              options: ['15.9', '3.98', '0.251', '1.00'],
              answer: 1,
              explanation:
                '$\\sqrt{M_{\\mathrm{O_2}}/M_{\\mathrm{H_2}}} = \\sqrt{32.00/2.016} = 3.98$. Forgetting the square root gives $15.9$; inverting gives $0.251$ (the rate of $\\mathrm{O_2}$ relative to $\\mathrm{H_2}$).',
            },
            {
              question: 'Helium and xenon are at the same temperature. Which statement is true?',
              options: [
                'Xenon atoms have more kinetic energy because they are heavier',
                'Both have the same average speed',
                'Helium atoms have more kinetic energy because they move faster',
                'Both have the same average kinetic energy, so helium atoms move much faster',
              ],
              answer: 3,
              explanation:
                'Average kinetic energy depends only on $T$: $\\tfrac32 RT$ per mole for any gas. With equal $\\tfrac12 mu^2$, the lighter helium atoms move faster, by $\\sqrt{131.3/4.003} \\approx 5.7$ times in rms speed.',
            },
            {
              question: 'Under which conditions does a real gas behave most like an ideal gas?',
              options: ['High temperature and low pressure', 'Low temperature and high pressure', 'High temperature and high pressure', 'Low temperature and low pressure'],
              answer: 0,
              explanation:
                'Low pressure means molecules are far apart, so their volume is negligible; high temperature means kinetic energy swamps the attractions. Low $T$ and high $P$ is where real gases condense and the ideal law fails worst.',
            },
          ],
          relatedLessons: ['physics-thermal/kinetic-theory/the-ideal-gas', 'physics-thermal/kinetic-theory/maxwell-boltzmann-distribution'],
        },
      ],
      project: {
        slug: 'gas-law-data-analysis',
        title: 'Gas-law data analysis',
        description: `Test the gas laws and find their limits with real data. Part 1: in the PhET Gas Properties simulation, collect at least eight (P, V) points at constant T and eight (V, T) points at constant P. Plot P against 1/V and V against T, fit straight lines in a spreadsheet, and extract R from the slopes using the particle count shown (convert particles to moles). Part 2: from the NIST Chemistry WebBook fluid-properties tool, download the density of $\\mathrm{CO_2}$ at $300\\ \\mathrm{K}$ from 1 to 70 bar. Compute the compressibility factor $Z = PV/nRT$ at each point, plot it, and compare it with the ideal gas law and the van der Waals prediction with $a = 3.59\\ \\mathrm{L^2\\,atm\\,mol^{-2}}$, $b = 0.0427\\ \\mathrm{L\\,mol^{-1}}$. Explain where and why each model fails.`,
        deliverables: [
          'Simulation data tables and the two linear fits, with your value of R and its percent error',
          'The NIST CO₂ data with source and retrieval date, and a plot of Z against P with ideal and van der Waals curves',
          'A 500 to 800 word discussion of the molecular reasons for the deviations',
        ],
        estimatedHours: 3,
        stretchGoals: ['Repeat Part 2 for helium and explain why its Z rises above 1 instead of dipping below'],
      },
    },
    {
      slug: 'thermochemistry',
      title: 'Thermochemistry',
      description:
        'The energy of chemical change: heat, work and the first law, enthalpy, measuring heats of reaction by calorimetry, calculating them with Hess\'s law and standard enthalpies of formation, and estimating them from bond energies.',
      lessons: [
        {
          slug: 'energy-heat-and-enthalpy',
          title: 'Energy, heat, work and enthalpy',
          summary:
            'The first law of thermodynamics in chemistry\'s sign conventions, why enthalpy is the heat at constant pressure, how ΔH and ΔE differ, and how to read and manipulate thermochemical equations.',
          estimatedMinutes: 105,
          objectives: [
            'Distinguish system and surroundings, heat and work, and use the sign conventions of ΔE = q + w',
            'Explain what a state function is and why ΔE and ΔH are state functions while q and w are not',
            'Explain why ΔH equals the heat at constant pressure and calculate the difference between ΔH and ΔE',
            'Interpret, scale and reverse thermochemical equations',
          ],
          concepts: [
            'System and surroundings',
            'Heat q and work w',
            'First law: ΔE = q + w',
            'Pressure-volume work w = −PΔV',
            'State function',
            'Enthalpy H = E + PV; ΔH = q_P',
            'Exothermic (ΔH < 0) and endothermic (ΔH > 0)',
            'Thermochemical equations',
          ],
          explanation: `Thermochemistry divides the world into the **system** (the reacting chemicals) and the **surroundings** (everything else). Energy crosses the boundary as **heat** $q$, flow caused by a temperature difference, or as **work** $w$, such as a gas pushing back the atmosphere. The **first law of thermodynamics** says energy is conserved, so the change in the system's internal energy is

$$\\Delta E = q + w.$$

Chemistry takes the system's point of view: $q > 0$ when heat flows *in*, $w > 0$ when work is done *on* the system. A reaction that releases heat to its surroundings has $q < 0$.

**State functions.** $E$ depends only on the current state of the system (its temperature, pressure, composition), not on how it got there, so $\\Delta E$ is fixed by the start and end states. Heat and work individually are not: the same change can be reached with more heat and less work or the reverse. Altitude is a state function; the length of the path up a mountain is not.

**Enthalpy.** Most reactions run open to the atmosphere at constant pressure. If the gas volume changes, the system does **pressure-volume work** $w = -P\\Delta V$ (negative when it expands, because it does work on the surroundings). The heat at constant pressure is then $q_P = \\Delta E + P\\Delta V$. Defining **enthalpy** $H = E + PV$ makes that heat a state function:

$$\\Delta H = q_P.$$

$\\Delta H < 0$ is **exothermic** (heat released), $\\Delta H > 0$ **endothermic**.

**ΔH versus ΔE.** For reactions of solids and liquids the volume barely changes and $\\Delta H \\approx \\Delta E$. For gases, $P\\Delta V = \\Delta n_\\mathrm{gas}RT$, so $\\Delta H = \\Delta E + \\Delta n_\\mathrm{gas}RT$. Burning methane, $\\mathrm{CH_4(g)} + 2\\,\\mathrm{O_2(g)} \\rightarrow \\mathrm{CO_2(g)} + 2\\,\\mathrm{H_2O(l)}$, has $\\Delta H = -890.6\\ \\mathrm{kJ}$ and $\\Delta n_\\mathrm{gas} = 1 - 3 = -2$, so

$$\\Delta E = \\Delta H - \\Delta n_\\mathrm{gas}RT = -890.6 - (-2)(8.314 \\times 10^{-3})(298.15) = -885.6\\ \\mathrm{kJ}.$$

The difference ($5\\ \\mathrm{kJ}$, the work the atmosphere does as the gas shrinks) is small but real.

**Thermochemical equations** attach $\\Delta H$ to a balanced equation, per mole *of reaction as written*. Three rules: $\\Delta H$ scales with the coefficients (doubling the equation doubles $\\Delta H$); reversing the equation changes its sign; and the states matter ($\\mathrm{H_2O(l)}$ and $\\mathrm{H_2O(g)}$ differ by $44\\ \\mathrm{kJ\\,mol^{-1}}$). So burning $4.00\\ \\mathrm{g}$ of methane ($0.2494\\ \\mathrm{mol}$) releases $0.2494 \\times 890.6 = 222\\ \\mathrm{kJ}$.

**Pitfalls.** Sign conventions (physics texts sometimes write $\\Delta E = q - w$ with $w$ done *by* the system; check which a source uses); forgetting to scale $\\Delta H$ with moles; and thinking "exothermic" means "fast". Energy says nothing about rate. Read OpenStax 5.1 and the first half of 5.3.`,
          resources: [
            ostx('5-1-energy-basics', '5.1 Energy basics', 'Energy, heat, temperature and specific heat; the system and surroundings.'),
            ostx('5-3-enthalpy', '5.3 Enthalpy', 'The first law, state functions, enthalpy and thermochemical equations (first half of the section).', true),
            mit('unit-iii-thermodynamics-chemical-equilibrium/lecture-15', 'Lecture 15, Thermodynamics: bond and reaction enthalpies', 'Enthalpy and its sign conventions, leading into reaction enthalpies.'),
          ],
          exercises: [
            {
              slug: 'first-law-signs',
              title: 'First-law signs',
              prompt: `Find $\\Delta E$ for the system and say whether its energy rises or falls: (a) it absorbs $250\\ \\mathrm{J}$ of heat and does $100\\ \\mathrm{J}$ of work on the surroundings; (b) it releases $1.25\\ \\mathrm{kJ}$ of heat while the surroundings do $300\\ \\mathrm{J}$ of work on it; (c) a gas expands from $2.0$ to $5.0\\ \\mathrm{L}$ against a constant $1.00\\ \\mathrm{atm}$ with no heat flow (give $w$ in joules; $1\\ \\mathrm{L\\,atm} = 101.3\\ \\mathrm{J}$).`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) +150 J. (b) −950 J. (c) w = −PΔV = −3.0 L atm = −304 J, so ΔE = −304 J: the gas cools.',
            },
            {
              slug: 'thermochemical-equations',
              title: 'Using thermochemical equations',
              prompt: `Given $2\\,\\mathrm{H_2(g)} + \\mathrm{O_2(g)} \\rightarrow 2\\,\\mathrm{H_2O(l)}$, $\\Delta H = -571.7\\ \\mathrm{kJ}$: (a) What is $\\Delta H$ for forming one mole of liquid water? (b) For decomposing $36.0\\ \\mathrm{g}$ of liquid water into its elements? (c) How much heat is released when $5.00\\ \\mathrm{g}$ of $\\mathrm{H_2}$ burns? (d) Would burning to water vapour release more or less heat? Explain.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) −285.8 kJ. (b) 36.0 g is 1.998 mol: +571.1 kJ (reversed). (c) 2.480 mol H₂ × 285.8 = 709 kJ. (d) Less, by the 44 kJ/mol needed to vaporise the water.',
            },
            {
              slug: 'delta-h-delta-e',
              title: 'ΔH and ΔE',
              prompt: `For each reaction at $298\\ \\mathrm{K}$, find $\\Delta n_\\mathrm{gas}$, say whether $\\Delta H$ is larger or smaller than $\\Delta E$, and compute $\\Delta H - \\Delta E$ in kJ: (a) $\\mathrm{N_2(g)} + 3\\,\\mathrm{H_2(g)} \\rightarrow 2\\,\\mathrm{NH_3(g)}$; (b) $\\mathrm{CaCO_3(s)} \\rightarrow \\mathrm{CaO(s)} + \\mathrm{CO_2(g)}$; (c) $\\mathrm{C_6H_{12}O_6(s)} + 6\\,\\mathrm{O_2(g)} \\rightarrow 6\\,\\mathrm{CO_2(g)} + 6\\,\\mathrm{H_2O(l)}$. Explain physically, in terms of work done by or on the atmosphere, why (c) has $\\Delta H = \\Delta E$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'ΔH − ΔE = Δn RT with RT = 2.479 kJ/mol. (a) Δn = −2: −4.96 kJ. (b) +1: +2.48 kJ. (c) Δn = 0: no net gas volume change, no PV work.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is ΔH, not ΔE, the quantity measured by a reaction run in an open beaker?',
              answerOutline: 'At constant pressure the heat exchanged equals ΔE + PΔV = ΔH; any PV work against the atmosphere is already included in ΔH.',
            },
            {
              question: 'What happens to ΔH when a thermochemical equation is reversed or doubled?',
              answerOutline: 'Reversing changes the sign; doubling doubles the magnitude. ΔH is per mole of reaction as written.',
            },
            {
              question: 'What makes a quantity a state function? Give one example and one non-example.',
              answerOutline: 'Its value depends only on the current state, so its change depends only on initial and final states. E, H, T, P, V are state functions; q and w are not.',
            },
          ],
          quiz: [
            {
              question: 'A system absorbs $250\\ \\mathrm{J}$ of heat and does $100\\ \\mathrm{J}$ of work on its surroundings. What is $\\Delta E$?',
              options: ['$+350\\ \\mathrm{J}$', '$-150\\ \\mathrm{J}$', '$+150\\ \\mathrm{J}$', '$-350\\ \\mathrm{J}$'],
              answer: 2,
              explanation:
                '$q = +250\\ \\mathrm{J}$ (heat in) and $w = -100\\ \\mathrm{J}$ (work done *by* the system). $\\Delta E = q + w = +150\\ \\mathrm{J}$. Adding the magnitudes ($+350$) treats the work as done on the system.',
            },
            {
              question: '$\\mathrm{CH_4(g)} + 2\\,\\mathrm{O_2(g)} \\rightarrow \\mathrm{CO_2(g)} + 2\\,\\mathrm{H_2O(l)}$, $\\Delta H = -890.6\\ \\mathrm{kJ}$. How much heat is released when $4.00\\ \\mathrm{g}$ of methane burns?',
              options: ['$222\\ \\mathrm{kJ}$', '$3.56 \\times 10^{3}\\ \\mathrm{kJ}$', '$891\\ \\mathrm{kJ}$', '$445\\ \\mathrm{kJ}$'],
              answer: 0,
              explanation:
                '$4.00/16.04 = 0.2494\\ \\mathrm{mol}$ of methane, and $\\Delta H$ is per mole of methane here: $0.2494 \\times 890.6 = 222\\ \\mathrm{kJ}$. Multiplying by grams ($3.56 \\times 10^3$) skips the conversion to moles; $891$ is the heat for a whole mole.',
            },
            {
              question: 'For $\\mathrm{N_2(g)} + 3\\,\\mathrm{H_2(g)} \\rightarrow 2\\,\\mathrm{NH_3(g)}$ at constant pressure, how do $\\Delta H$ and $\\Delta E$ compare?',
              options: [
                'They are equal because the temperature is constant',
                '$\\Delta H$ is larger (less negative) because the gas expands',
                '$\\Delta H$ cannot be compared with $\\Delta E$',
                '$\\Delta H$ is more negative than $\\Delta E$ by about $5\\ \\mathrm{kJ}$, because the gas volume shrinks and the atmosphere does work on the system',
              ],
              answer: 3,
              explanation:
                '$\\Delta n_\\mathrm{gas} = 2 - 4 = -2$, so $\\Delta H - \\Delta E = \\Delta n RT = -2(2.479) = -4.96\\ \\mathrm{kJ}$. As four moles of gas become two, the atmosphere pushes in and does work on the system; that extra energy leaves as heat, so $q_P = \\Delta H$ is more negative than $\\Delta E$. Constant temperature does not make them equal; only $\\Delta n_\\mathrm{gas} = 0$ does.',
            },
          ],
        },
        {
          slug: 'calorimetry',
          title: 'Calorimetry',
          summary:
            'Measure heats of reaction from temperature changes: specific heat and heat capacity, coffee-cup calorimeters at constant pressure, and bomb calorimeters at constant volume.',
          estimatedMinutes: 105,
          objectives: [
            'Use q = mcΔT and q = CΔT with correct signs',
            'Solve heat-transfer problems where a hot object and cold water reach a common temperature',
            'Calculate ΔH of a reaction from coffee-cup calorimetry data',
            'Calibrate a bomb calorimeter and use it to find an energy of combustion (ΔE)',
            'Identify the assumptions in simple calorimetry and their effect on the result',
          ],
          concepts: [
            'Specific heat capacity c',
            'Heat capacity C',
            'q = mcΔT',
            'q_reaction = −q_solution',
            'Coffee-cup calorimeter: constant P, gives ΔH',
            'Bomb calorimeter: constant V, gives ΔE',
            'Calorimeter constant',
            'Water\'s high specific heat',
          ],
          explanation: `A **calorimeter** measures heat by watching a temperature change. The heat needed to raise the temperature of a mass $m$ of a substance by $\\Delta T$ is

$$q = mc\\Delta T,$$

where $c$ is the **specific heat** ($4.184\\ \\mathrm{J\\,g^{-1}\\,^\\circ C^{-1}}$ for water, about $0.45$ for iron and $0.385$ for copper). For a whole object or apparatus, the **heat capacity** $C = mc$ in $\\mathrm{J\\,^\\circ C^{-1}}$ is more convenient. Because a temperature *difference* is the same in °C and K, either unit works for $\\Delta T$. Water's very high specific heat is why coastal climates are mild and why it is used for cooling.

**The key idea: energy lost by one part is gained by the other.** In an insulated calorimeter, $q_\\text{reaction} + q_\\text{solution} = 0$, so $q_\\text{reaction} = -q_\\text{solution}$. If the solution warms up, the reaction released heat and is exothermic.

**Worked example (coffee cup).** $50.0\\ \\mathrm{mL}$ of $1.00\\ \\mathrm{M}$ HCl and $50.0\\ \\mathrm{mL}$ of $1.00\\ \\mathrm{M}$ NaOH, both at $22.00\\ ^\\circ\\mathrm{C}$, are mixed in a foam cup; the temperature rises to $28.65\\ ^\\circ\\mathrm{C}$. Assume the $100.0\\ \\mathrm{mL}$ solution has the mass ($100.0\\ \\mathrm{g}$) and specific heat of water:

$$q_\\text{soln} = (100.0\\ \\mathrm{g})(4.184\\ \\mathrm{J\\,g^{-1}\\,^\\circ C^{-1}})(6.65\\ ^\\circ\\mathrm{C}) = 2782\\ \\mathrm{J},$$

so $q_\\text{rxn} = -2782\\ \\mathrm{J}$ for $0.0500\\ \\mathrm{mol}$ of water formed. A foam cup is open to the air, so this is constant-pressure heat:

$$\\Delta H = \\frac{-2.782\\ \\mathrm{kJ}}{0.0500\\ \\mathrm{mol}} = -55.6\\ \\mathrm{kJ\\,mol^{-1}}.$$

The accepted value for $\\mathrm{H^+} + \\mathrm{OH^-} \\rightarrow \\mathrm{H_2O}$ is about $-56\\ \\mathrm{kJ\\,mol^{-1}}$.

**Mixing problems.** A hot metal dropped into cool water: heat lost by the metal equals heat gained by the water, $m_\\text{m}c_\\text{m}(T_\\text{m} - T_\\text{f}) = m_\\text{w}c_\\text{w}(T_\\text{f} - T_\\text{w})$, which you can solve for $T_\\text{f}$ or for $c_\\text{m}$. The final temperature lies much closer to the water's starting temperature, because water stores so much heat per gram.

**Bomb calorimetry.** Combustions are run in a sealed steel "bomb" in a water bath. The volume is fixed, so no PV work is done and the heat measured is $q_V = \\Delta E$, not $\\Delta H$ (convert with $\\Delta n_\\mathrm{gas}RT$ from the previous lesson if needed). The whole apparatus has a heat capacity $C_\\text{cal}$, found by burning a standard such as benzoic acid ($\\Delta E_\\mathrm{c} = -26.38\\ \\mathrm{kJ\\,g^{-1}}$): if $1.000\\ \\mathrm{g}$ raises the temperature by $2.36\\ ^\\circ\\mathrm{C}$, $C_\\text{cal} = 26.38/2.36 = 11.2\\ \\mathrm{kJ\\,^\\circ C^{-1}}$. This is how food Calories are measured.

**Assumptions to question.** No heat lost to the air or the cup; the solution behaves like pure water; the reaction is complete and fast. Heat leaks make $|\\Delta H|$ come out too small. Read OpenStax 5.2.`,
          resources: [
            ostx('5-2-calorimetry', '5.2 Calorimetry', 'Specific heat, coffee-cup and bomb calorimetry with many worked examples.', true),
            ostx('5-1-energy-basics', '5.1 Energy basics', 'The specific-heat table and heat-transfer examples.'),
            phet('energy-forms-and-changes', 'Energy Forms and Changes', 'Heat iron, brick, water and olive oil and compare how fast their temperatures rise.'),
          ],
          exercises: [
            {
              slug: 'identify-a-metal',
              title: 'Identify a metal by its specific heat',
              prompt: `A $25.0\\ \\mathrm{g}$ piece of metal at $100.0\\ ^\\circ\\mathrm{C}$ is dropped into $50.0\\ \\mathrm{g}$ of water at $20.0\\ ^\\circ\\mathrm{C}$ in an insulated cup. The final temperature is $23.5\\ ^\\circ\\mathrm{C}$. Find the specific heat of the metal and identify it from: Al $0.897$, Fe $0.449$, Cu $0.385$, Ag $0.235$, Pb $0.129\\ \\mathrm{J\\,g^{-1}\\,^\\circ C^{-1}}$. If some heat escaped to the air, would your value be too high or too low?`,
              kind: 'problem',
              difficulty: 1,
              hint: 'c = (50.0)(4.184)(3.5)/[(25.0)(76.5)] = 0.383: copper. Heat lost to the air means the water gained less than the metal lost, so the calculated c is too low.',
            },
            {
              slug: 'bomb-calorimeter',
              title: 'Food energy by bomb calorimetry',
              prompt: `A bomb calorimeter is calibrated by burning $1.000\\ \\mathrm{g}$ of benzoic acid ($\\Delta E_\\mathrm{c} = -26.38\\ \\mathrm{kJ\\,g^{-1}}$), which raises its temperature by $2.36\\ ^\\circ\\mathrm{C}$. Then $0.850\\ \\mathrm{g}$ of sucrose ($342.3\\ \\mathrm{g\\,mol^{-1}}$) raises it by $1.24\\ ^\\circ\\mathrm{C}$. (a) Find $C_\\text{cal}$. (b) Find $\\Delta E_\\mathrm{c}$ of sucrose per gram and per mole. (c) Convert to food Calories per gram ($1\\ \\mathrm{Cal} = 4.184\\ \\mathrm{kJ}$) and compare with the 4 Cal/g on food labels. (d) For sucrose, $\\Delta n_\\mathrm{gas} = 0$; what does that imply about $\\Delta H$?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 11.18 kJ/°C. (b) 13.86 kJ released: −16.3 kJ/g, −5.58 × 10³ kJ/mol. (c) 3.90 Cal/g. (d) ΔH = ΔE.',
            },
            {
              slug: 'design-calorimetry',
              title: 'Design a dissolution experiment',
              prompt: `Design a coffee-cup experiment to measure $\\Delta H$ of dissolving ammonium nitrate (used in instant cold packs). Specify amounts, what you measure, the calculation and the sign you expect. Then, using $\\Delta H_\\text{soln} = +25.7\\ \\mathrm{kJ\\,mol^{-1}}$, predict the temperature change when $8.00\\ \\mathrm{g}$ dissolves in $100.0\\ \\mathrm{g}$ of water (assume $c = 4.18$ for the solution of total mass $108.0\\ \\mathrm{g}$).`,
              kind: 'problem',
              difficulty: 2,
              hint: '8.00/80.05 = 0.0999 mol absorbs 2.57 kJ; ΔT = −2568/(108.0 × 4.18) = −5.7 °C.',
            },
          ],
          selfAssessment: [
            {
              question: 'In a coffee-cup calorimeter the solution warms by 5 °C. What is the sign of q for the reaction and why?',
              answerOutline: 'Negative: the solution gained heat, which came from the reaction (q_rxn = −q_soln); the reaction is exothermic.',
            },
            {
              question: 'Why does a bomb calorimeter measure ΔE rather than ΔH?',
              answerOutline: 'Its volume is fixed, so no pressure-volume work is done and the heat exchanged is q_V = ΔE.',
            },
            {
              question: 'Why does hot metal dropped into the same mass of water end up close to the water\'s initial temperature?',
              answerOutline: 'Water\'s specific heat (4.184 J/g°C) is roughly ten times a typical metal\'s, so the water absorbs the metal\'s heat with only a small rise.',
            },
          ],
          quiz: [
            {
              question: '$45.0\\ \\mathrm{g}$ of iron ($c = 0.449\\ \\mathrm{J\\,g^{-1}\\,^\\circ C^{-1}}$) at $98.0\\ ^\\circ\\mathrm{C}$ is dropped into $60.0\\ \\mathrm{g}$ of water at $22.0\\ ^\\circ\\mathrm{C}$. What is the final temperature?',
              options: ['$60.0\\ ^\\circ\\mathrm{C}$', '$27.7\\ ^\\circ\\mathrm{C}$', '$29.4\\ ^\\circ\\mathrm{C}$', '$22.0\\ ^\\circ\\mathrm{C}$'],
              answer: 1,
              explanation:
                'Set heat lost = heat gained: $45.0(0.449)(98.0 - T) = 60.0(4.184)(T - 22.0)$, giving $T = 27.7\\ ^\\circ\\mathrm{C}$. The simple average ($60.0$) ignores specific heats; $29.4$ uses the specific heats but forgets the masses.',
            },
            {
              question: 'A food sample is burned in a bomb calorimeter. The heat it measures is equal to',
              options: ['$\\Delta H$, because heat is measured', 'The work done by the gases', '$\\Delta H + P\\Delta V$', '$\\Delta E$, because the volume is constant'],
              answer: 3,
              explanation:
                'At constant volume no PV work is done, so $q_V = \\Delta E$. $\\Delta H$ is the heat at constant *pressure* (a coffee cup). The two differ by $\\Delta n_\\mathrm{gas}RT$, small for most foods.',
            },
            {
              question: 'When solid NaOH dissolves in water in a coffee cup, the temperature rises from $21.0$ to $27.5\\ ^\\circ\\mathrm{C}$. What can you conclude?',
              options: [
                'Dissolving is exothermic: $q_\\text{rxn} < 0$ and $\\Delta H_\\text{soln} < 0$',
                'Dissolving is endothermic because the solution absorbed heat',
                '$\\Delta H_\\text{soln} > 0$ because $\\Delta T > 0$',
                'Nothing, because no chemical reaction occurred',
              ],
              answer: 0,
              explanation:
                'The solution (surroundings) gained heat, so the process (system) lost it: $q_\\text{rxn} = -q_\\text{soln} < 0$, exothermic. Treating the solution\'s heat gain as the process\'s sign is the usual error. Physical changes such as dissolving have enthalpy changes too.',
            },
          ],
        },
        {
          slug: 'hess-law-and-formation-enthalpies',
          title: 'Hess\'s law and standard enthalpies of formation',
          summary:
            'Because enthalpy is a state function, reaction enthalpies add like steps on a path. Standard enthalpies of formation turn that idea into one formula for any reaction.',
          estimatedMinutes: 115,
          objectives: [
            'State Hess\'s law and explain why it follows from enthalpy being a state function',
            'Combine thermochemical equations to find an unknown ΔH',
            'Define standard state and standard enthalpy of formation, and say which substances have ΔH°f = 0',
            'Calculate ΔH°rxn from tabulated ΔH°f values',
          ],
          concepts: [
            'Hess\'s law',
            'Manipulating equations: reverse, scale, add',
            'Standard state (1 bar, usually 25 °C)',
            'Standard enthalpy of formation ΔH°f',
            'Elements in standard states: ΔH°f = 0',
            'ΔH°rxn = ΣνΔH°f(products) − ΣνΔH°f(reactants)',
            'Data tables (OpenStax Appendix G, NIST)',
          ],
          explanation: `Since enthalpy is a state function, the enthalpy change between reactants and products is the same whatever route connects them. That is **Hess's law**: if a reaction can be written as the sum of steps, its $\\Delta H$ is the sum of theirs. It lets you find enthalpies of reactions that are impossible or awkward to measure.

**Worked example.** Burning carbon to carbon monoxide cannot be done cleanly (some $\\mathrm{CO_2}$ always forms), but both of these can be measured:

$$\\mathrm{C(s)} + \\mathrm{O_2(g)} \\rightarrow \\mathrm{CO_2(g)} \\qquad \\Delta H = -393.5\\ \\mathrm{kJ}$$
$$\\mathrm{CO(g)} + \\tfrac12\\mathrm{O_2(g)} \\rightarrow \\mathrm{CO_2(g)} \\qquad \\Delta H = -283.0\\ \\mathrm{kJ}$$

Keep the first, reverse the second (changing its sign) and add; $\\mathrm{CO_2}$ and half an $\\mathrm{O_2}$ cancel:

$$\\mathrm{C(s)} + \\tfrac12\\mathrm{O_2(g)} \\rightarrow \\mathrm{CO(g)} \\qquad \\Delta H = -393.5 + 283.0 = -110.5\\ \\mathrm{kJ}.$$

The strategy: arrange each given equation so that the substances you want end up on the correct side with the correct coefficients, scaling $\\Delta H$ along with the equation; check that everything else cancels.

**Standard enthalpies of formation.** The **standard state** of a substance is its pure form at $1\\ \\mathrm{bar}$ (tables are usually at $25\\ ^\\circ\\mathrm{C}$). The **standard enthalpy of formation** $\\Delta H^\\circ_\\mathrm{f}$ is $\\Delta H$ for making one mole of the substance from its elements in their standard states, for example $\\mathrm{C(s)} + 2\\,\\mathrm{H_2(g)} \\rightarrow \\mathrm{CH_4(g)}$, $\\Delta H^\\circ_\\mathrm{f} = -74.6\\ \\mathrm{kJ\\,mol^{-1}}$. By definition, an element in its standard state ($\\mathrm{O_2(g)}$, $\\mathrm{C}$(graphite), $\\mathrm{Br_2(l)}$) has $\\Delta H^\\circ_\\mathrm{f} = 0$; $\\mathrm{O_3(g)}$ or diamond do not.

Imagine any reaction as two steps: break the reactants into elements, then build the products from them. Hess's law gives

$$\\Delta H^\\circ_\\mathrm{rxn} = \\sum \\nu\\,\\Delta H^\\circ_\\mathrm{f}(\\text{products}) - \\sum \\nu\\,\\Delta H^\\circ_\\mathrm{f}(\\text{reactants}).$$

**Worked example.** Using OpenStax Appendix G values ($\\mathrm{CO_2(g)}$ $-393.51$, $\\mathrm{H_2O(l)}$ $-285.83$, $\\mathrm{CH_4(g)}$ $-74.6\\ \\mathrm{kJ\\,mol^{-1}}$), the combustion of methane is

$$\\Delta H^\\circ = [-393.51 + 2(-285.83)] - [-74.6 + 0] = -890.6\\ \\mathrm{kJ}.$$

All data in this course come from that appendix, which in turn draws on NIST; the NIST WebBook has values for thousands more substances (small differences between tables, such as $-74.6$ and $-74.87$ for methane, reflect different evaluations).

**Pitfalls.** Forgetting to multiply by coefficients; forgetting the minus sign in front of the reactant sum, especially when a reactant's $\\Delta H^\\circ_\\mathrm{f}$ is itself negative (minus a negative is a plus); using $\\mathrm{H_2O(g)}$ when the equation says liquid; and giving $\\mathrm{O_2}$ a nonzero value. Read OpenStax 5.3 (Hess's law and formation enthalpies).`,
          resources: [
            ostx('5-3-enthalpy', '5.3 Enthalpy', 'Hess\'s law and standard enthalpies of formation, with worked examples (second half).', true),
            ostx('g-standard-thermodynamic-properties-for-selected-substances', 'Appendix G: Standard thermodynamic properties for selected substances', 'The ΔH°f table used throughout this course.'),
            nistWebBook('Search any compound and open "Gas phase thermochemistry data" or "Condensed phase thermochemistry data" for ΔfH° with references.'),
          ],
          exercises: [
            {
              slug: 'hess-acetylene',
              title: 'Hess\'s law: acetylene',
              prompt: `Use $\\mathrm{C(s)} + \\mathrm{O_2(g)} \\rightarrow \\mathrm{CO_2(g)}$ ($-393.5\\ \\mathrm{kJ}$), $\\mathrm{H_2(g)} + \\tfrac12\\mathrm{O_2(g)} \\rightarrow \\mathrm{H_2O(l)}$ ($-285.8\\ \\mathrm{kJ}$) and $\\mathrm{C_2H_2(g)} + \\tfrac52\\mathrm{O_2(g)} \\rightarrow 2\\,\\mathrm{CO_2(g)} + \\mathrm{H_2O(l)}$ ($-1299.6\\ \\mathrm{kJ}$) to find $\\Delta H$ for $2\\,\\mathrm{C(s)} + \\mathrm{H_2(g)} \\rightarrow \\mathrm{C_2H_2(g)}$. Show which equations you reversed and scaled, and compare with Appendix G ($227.4\\ \\mathrm{kJ\\,mol^{-1}}$). What does a positive $\\Delta H^\\circ_\\mathrm{f}$ tell you about acetylene?`,
              kind: 'problem',
              difficulty: 2,
              hint: '2 × (−393.5) + (−285.8) − (−1299.6) = +226.8 kJ. Acetylene is higher in enthalpy than its elements, which is part of why it burns so hot.',
            },
            {
              slug: 'formation-enthalpy-practice',
              title: 'Reaction enthalpies from ΔH°f',
              prompt: `Using Appendix G values, calculate $\\Delta H^\\circ$ for: (a) propane combustion to liquid water ($\\mathrm{C_3H_8(g)}$ $-103.8$); (b) the thermite reaction $2\\,\\mathrm{Al(s)} + \\mathrm{Fe_2O_3(s)} \\rightarrow \\mathrm{Al_2O_3(s)} + 2\\,\\mathrm{Fe(s)}$ ($\\mathrm{Fe_2O_3}$ $-824.2$, $\\mathrm{Al_2O_3}$ $-1676$); (c) $4\\,\\mathrm{NH_3(g)} + 5\\,\\mathrm{O_2(g)} \\rightarrow 4\\,\\mathrm{NO(g)} + 6\\,\\mathrm{H_2O(g)}$ ($\\mathrm{NH_3}$ $-45.9$, NO $90.25$, $\\mathrm{H_2O(g)}$ $-241.82$). For (b), find the heat released per gram of reactant mixture.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) −2220.0 kJ. (b) −851.8 kJ for 2(26.98) + 159.70 = 213.66 g, so 3.99 kJ/g. (c) −906.3 kJ.',
            },
            {
              slug: 'fuel-comparison',
              title: 'Compare fuels',
              prompt: `Compute the enthalpy of combustion per mole, per gram, and per mole of $\\mathrm{CO_2}$ produced for methane, propane and ethanol ($\\mathrm{C_2H_5OH(l)}$ $-277.6\\ \\mathrm{kJ\\,mol^{-1}}$), all to liquid water. In about 150 words, compare them as fuels, distinguishing energy per mass from carbon dioxide per unit of energy.`,
              kind: 'data-analysis',
              difficulty: 3,
              hint: 'Methane −890.6 kJ/mol (55.5 kJ/g, 890.6 kJ per mol CO₂); propane −2220.0 (50.3 kJ/g, 740 kJ per mol CO₂); ethanol −1366.9 (29.7 kJ/g, 683 kJ per mol CO₂).',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does Hess\'s law hold?',
              answerOutline: 'Enthalpy is a state function: ΔH depends only on the initial and final states, so any path, including a sum of steps, gives the same total.',
            },
            {
              question: 'Which of these have ΔH°f = 0: O₂(g), O₃(g), C(graphite), C(diamond), H₂O(l), Br₂(l)?',
              answerOutline: 'O₂(g), C(graphite) and Br₂(l): elements in their standard states. O₃ and diamond are not the standard forms; H₂O is a compound.',
            },
            {
              question: 'Write the formula for ΔH°rxn from formation enthalpies and say what each term means.',
              answerOutline: 'ΔH°rxn = Σν ΔH°f(products) − Σν ΔH°f(reactants), with ν the coefficients in the balanced equation and states as written.',
            },
          ],
          quiz: [
            {
              question: 'Using $\\Delta H^\\circ_\\mathrm{f}$: $\\mathrm{C_2H_5OH(l)}$ $-277.6$, $\\mathrm{CO_2(g)}$ $-393.51$, $\\mathrm{H_2O(l)}$ $-285.83\\ \\mathrm{kJ\\,mol^{-1}}$, find $\\Delta H^\\circ$ for $\\mathrm{C_2H_5OH(l)} + 3\\,\\mathrm{O_2(g)} \\rightarrow 2\\,\\mathrm{CO_2(g)} + 3\\,\\mathrm{H_2O(l)}$.',
              options: ['$-1366.9\\ \\mathrm{kJ}$', '$-1922.1\\ \\mathrm{kJ}$', '$-401.7\\ \\mathrm{kJ}$', '$+1366.9\\ \\mathrm{kJ}$'],
              answer: 0,
              explanation:
                '$[2(-393.51) + 3(-285.83)] - [-277.6] = -1644.5 + 277.6 = -1366.9\\ \\mathrm{kJ}$. Adding the ethanol term instead of subtracting it gives $-1922.1$; ignoring the coefficients gives $-401.7$; reversing products and reactants flips the sign.',
            },
            {
              question: 'Given $\\mathrm{A} \\rightarrow 2\\,\\mathrm{B}$, $\\Delta H = +40\\ \\mathrm{kJ}$, what is $\\Delta H$ for $\\mathrm{B} \\rightarrow \\tfrac12\\mathrm{A}$?',
              options: ['$+20\\ \\mathrm{kJ}$', '$-40\\ \\mathrm{kJ}$', '$-20\\ \\mathrm{kJ}$', '$-80\\ \\mathrm{kJ}$'],
              answer: 2,
              explanation:
                'Reverse the equation (sign changes: $2\\,\\mathrm{B} \\rightarrow \\mathrm{A}$, $-40$) and halve it ($\\mathrm{B} \\rightarrow \\tfrac12\\mathrm{A}$, $-20\\ \\mathrm{kJ}$). $+20$ halves without reversing; $-40$ reverses without halving.',
            },
            {
              question: 'Which substance has a standard enthalpy of formation of exactly zero?',
              options: ['$\\mathrm{O_3(g)}$', '$\\mathrm{H_2O(l)}$', 'C(diamond)', '$\\mathrm{Br_2(l)}$'],
              answer: 3,
              explanation:
                'Bromine\'s standard state at $25\\ ^\\circ\\mathrm{C}$ and 1 bar is the liquid, so $\\mathrm{Br_2(l)}$ is zero by definition. Ozone and diamond are elements but not in their standard forms ($\\mathrm{O_2}$ and graphite), so their values are positive; water is a compound.',
            },
            {
              question: 'Why can the enthalpy of $\\mathrm{C(s)} + \\tfrac12\\mathrm{O_2(g)} \\rightarrow \\mathrm{CO(g)}$ be found without ever running that reaction cleanly?',
              options: [
                'Because CO is a stable gas',
                'Because $\\Delta H$ depends only on the initial and final states, so it equals the sum for any path, such as burning C to $\\mathrm{CO_2}$ and "un-burning" CO from $\\mathrm{CO_2}$',
                'Because bond energies give exact values',
                'Because the reaction is exothermic',
              ],
              answer: 1,
              explanation:
                'Hess\'s law rests on enthalpy being a state function. Combining two measurable reactions gives $-393.5 + 283.0 = -110.5\\ \\mathrm{kJ}$. Bond energies give only estimates, and being exothermic has nothing to do with it.',
            },
          ],
        },
        {
          slug: 'bond-energies-and-reaction-enthalpy',
          title: 'Bond energies and reaction enthalpies',
          summary:
            'Estimate a reaction enthalpy as the energy to break bonds minus the energy released forming new ones, and see where the estimate works well and where average bond energies fail.',
          estimatedMinutes: 100,
          objectives: [
            'Define bond dissociation energy and average bond energy',
            'Estimate ΔH of a gas-phase reaction from bond energies',
            'Explain why breaking bonds always costs energy and forming them releases it',
            'Judge the accuracy of a bond-energy estimate and explain its errors',
          ],
          concepts: [
            'Bond dissociation energy',
            'Average bond energy',
            'ΔH ≈ Σ(bonds broken) − Σ(bonds formed)',
            'Breaking is endothermic, forming exothermic',
            'Gas-phase assumption',
            'Limits: averages, resonance, phase changes',
          ],
          explanation: `Breaking a bond always takes energy: atoms that attract each other must be pulled apart. Forming a bond releases the same energy. The **bond dissociation energy** is $\\Delta H$ for breaking one mole of a particular bond in the gas phase, such as $\\mathrm{H_2(g)} \\rightarrow 2\\,\\mathrm{H(g)}$, $+436\\ \\mathrm{kJ}$. For bonds such as C–H that occur in many molecules, tables list an **average bond energy** (OpenStax Table 7.2: C–H $415$, O–H $464$, O=O $498$, C=O $741\\ \\mathrm{kJ\\,mol^{-1}}$).

Imagine a reaction as two steps: break every bond in the reactants into gaseous atoms, then form every bond in the products. By Hess's law,

$$\\Delta H \\approx \\sum D(\\text{bonds broken}) - \\sum D(\\text{bonds formed}).$$

A reaction is exothermic when the bonds formed are stronger, in total, than the bonds broken. The energy does not come "out of" the broken bonds: breaking always costs.

**Worked example: works well.** $\\mathrm{H_2(g)} + \\mathrm{Cl_2(g)} \\rightarrow 2\\,\\mathrm{HCl(g)}$. Broken: H–H $436$ and Cl–Cl $243$, total $679$. Formed: two H–Cl, $2 \\times 432 = 864$. So $\\Delta H \\approx 679 - 864 = -185\\ \\mathrm{kJ}$, against $2 \\times (-92.3) = -184.6\\ \\mathrm{kJ}$ from formation enthalpies. Excellent, because these are specific bond energies of these very molecules.

**Worked example: works less well.** $\\mathrm{CH_4(g)} + 2\\,\\mathrm{O_2(g)} \\rightarrow \\mathrm{CO_2(g)} + 2\\,\\mathrm{H_2O(g)}$. Broken: $4(415) + 2(498) = 2656$. Formed: $2(741) + 4(464) = 3338$. Estimate: $-682\\ \\mathrm{kJ}$. Formation enthalpies give $-802.6\\ \\mathrm{kJ}$. The culprit is C=O: the average value $741$ comes from aldehydes and ketones, but the C=O bonds in $\\mathrm{CO_2}$ are much stronger, about $799\\ \\mathrm{kJ\\,mol^{-1}}$ each, which would bring the estimate to about $-798\\ \\mathrm{kJ}$.

**Why estimates differ.** (1) Average bond energies hide real variation with the molecular environment. (2) Bond energies refer to gases; if a reactant or product is liquid or solid, its enthalpy of vaporisation or sublimation is missing. (3) Molecules with resonance (benzene, carbonate) are more stable than any one structure suggests. So use formation enthalpies when you have them, and bond energies to estimate when you do not, or to understand *why* a reaction is exothermic. Typical errors are tens of kJ.

**Connections.** Lattice energy (the chemical-bonding module) is the ionic counterpart of bond energy, and the Born-Haber cycle is the same Hess's-law reasoning. Common mistakes: subtracting in the wrong order (products minus reactants is right for $\\Delta H^\\circ_\\mathrm{f}$ but *reactants minus products* for bond energies, because bond energies are energies of breaking), and miscounting bonds, so always draw the Lewis structures. Read OpenStax 7.5 (covalent part).`,
          resources: [
            ostx('7-5-strengths-of-ionic-and-covalent-bonds', '7.5 Strengths of ionic and covalent bonds', 'Bond energies, Table 7.2, and estimating reaction enthalpies.', true),
            mit('unit-iii-thermodynamics-chemical-equilibrium/lecture-15', 'Lecture 15, Thermodynamics: bond and reaction enthalpies', 'Bond enthalpies and their use, compared with formation enthalpies.'),
            nistWebBook('Compare a bond-energy estimate with reaction enthalpies built from WebBook formation enthalpies.'),
          ],
          exercises: [
            {
              slug: 'bond-energy-estimates',
              title: 'Estimate with bond energies',
              prompt: `Using OpenStax Table 7.2 values, estimate $\\Delta H$ for each gas-phase reaction, drawing Lewis structures to count bonds: (a) $\\mathrm{C_2H_4} + \\mathrm{H_2} \\rightarrow \\mathrm{C_2H_6}$; (b) $\\mathrm{CH_4} + \\mathrm{Cl_2} \\rightarrow \\mathrm{CH_3Cl} + \\mathrm{HCl}$; (c) $\\mathrm{N_2} + 3\\,\\mathrm{H_2} \\rightarrow 2\\,\\mathrm{NH_3}$. Compare (a) and (c) with values from Appendix G ($\\mathrm{C_2H_4}$ $52.4$, $\\mathrm{C_2H_6}$ $-84.0$, $\\mathrm{NH_3}$ $-45.9\\ \\mathrm{kJ\\,mol^{-1}}$) and give the percentage error.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 611 + 436 − 345 − 2(415) = −128 kJ vs −136.4 (6 % off). (b) 415 + 243 − 330 − 432 = −104 kJ. (c) 946 + 3(436) − 6(390) = −86 kJ vs −91.8 (6 % off).',
            },
            {
              slug: 'why-exothermic',
              title: 'Why is combustion exothermic?',
              prompt: `A textbook says "burning releases the energy stored in the fuel's bonds". In about 200 words explain what is misleading about this, using the methane bond-energy calculation: which bonds are broken, which are formed, and why the products' bonds are collectively stronger. Mention the special strength of the C=O bonds in $\\mathrm{CO_2}$ and the O–H bonds in water.`,
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'phase-and-bond-energy',
              title: 'Liquids spoil the estimate',
              prompt: `Estimate $\\Delta H$ for $\\mathrm{H_2(g)} + \\tfrac12\\mathrm{O_2(g)} \\rightarrow \\mathrm{H_2O}$ with bond energies. Compare with $\\Delta H^\\circ_\\mathrm{f}$ of $\\mathrm{H_2O(g)}$ ($-241.82$) and of $\\mathrm{H_2O(l)}$ ($-285.83\\ \\mathrm{kJ\\,mol^{-1}}$). Which does your estimate match, and what physical process accounts for the remaining $44\\ \\mathrm{kJ}$?`,
              kind: 'problem',
              difficulty: 1,
              hint: '436 + ½(498) − 2(464) = −243 kJ, close to the gas value. Condensation of water releases about 44 kJ/mol, which bond energies cannot see.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is ΔH ≈ Σ(broken) − Σ(formed) and not the other way round?',
              answerOutline: 'Bond energies are positive energies of breaking. Breaking reactant bonds adds their energies; forming product bonds releases theirs, so it is subtracted.',
            },
            {
              question: 'Give two reasons a bond-energy estimate differs from the value from formation enthalpies.',
              answerOutline: 'Average values differ from the actual bond in a given molecule (e.g. C=O in CO₂); bond energies are for gases, so phase changes are missed; resonance stabilisation is ignored.',
            },
            {
              question: 'Does a bond release energy when it breaks?',
              answerOutline: 'No. Breaking a bond always requires energy; energy is released only when bonds form.',
            },
          ],
          quiz: [
            {
              question: 'Estimate $\\Delta H$ for $\\mathrm{CH_4(g)} + \\mathrm{Cl_2(g)} \\rightarrow \\mathrm{CH_3Cl(g)} + \\mathrm{HCl(g)}$ from bond energies: C–H $415$, Cl–Cl $243$, C–Cl $330$, H–Cl $432\\ \\mathrm{kJ\\,mol^{-1}}$.',
              options: ['$+104\\ \\mathrm{kJ}$', '$-762\\ \\mathrm{kJ}$', '$-1420\\ \\mathrm{kJ}$', '$-104\\ \\mathrm{kJ}$'],
              answer: 3,
              explanation:
                'Only one C–H and the Cl–Cl break ($415 + 243 = 658$); one C–Cl and one H–Cl form ($330 + 432 = 762$). $\\Delta H \\approx 658 - 762 = -104\\ \\mathrm{kJ}$. Formed minus broken gives $+104$; counting only the bonds formed gives $-762$. The three untouched C–H bonds cancel and need not be counted.',
            },
            {
              question: 'The bond-energy estimate for burning methane ($-682\\ \\mathrm{kJ}$) is far from the accurate value ($-802.6\\ \\mathrm{kJ}$ to water vapour). What is the main reason?',
              options: [
                'Bond energies cannot be used for combustion reactions',
                'The average C=O energy ($741$) is much lower than the actual C=O bonds in $\\mathrm{CO_2}$ (about $799$ each)',
                'The oxygen molecule has no bonds to break',
                'Methane is a liquid at $25\\ ^\\circ\\mathrm{C}$',
              ],
              answer: 1,
              explanation:
                'Two C=O bonds underestimated by about $58\\ \\mathrm{kJ}$ each account for about $116$ of the $121\\ \\mathrm{kJ}$ gap. Averages work well when a bond resembles the molecules the average came from; $\\mathrm{CO_2}$\'s bonds are unusually strong.',
            },
            {
              question: 'Which statement about bonds and energy is correct?',
              options: [
                'Breaking strong bonds releases a lot of energy, which is why fuels burn hot',
                'Forming bonds requires energy input',
                'Breaking any bond requires energy; a reaction is exothermic when the bonds formed are stronger overall than those broken',
                'Bond energies depend on whether the reaction is exothermic',
              ],
              answer: 2,
              explanation:
                'Bond breaking is always endothermic and bond forming exothermic. Fuels release energy because the bonds in $\\mathrm{CO_2}$ and $\\mathrm{H_2O}$ are stronger than those in the fuel and $\\mathrm{O_2}$. The first option is the "energy stored in bonds" misconception.',
            },
          ],
        },
      ],
      project: {
        slug: 'calorimetry-at-home',
        title: 'Kitchen calorimetry',
        description: `Measure two enthalpy changes with a kitchen thermometer (or a cheap digital probe), foam cups and a kitchen scale, then compare with tabulated values. (1) The enthalpy of neutralisation of vinegar (acetic acid, about 5 % by mass; use the label) with a solution of baking soda or, if you have it, sodium hydroxide drain cleaner handled with gloves and eye protection; or, safer, (2) the enthalpy of dissolving calcium chloride (ice-melt pellets) or ammonium nitrate (some cold packs) in water. For each, measure the temperature every 15 s for several minutes, extrapolate the cooling or warming line back to the moment of mixing to correct for heat loss, compute $q$ and $\\Delta H$ per mole, and compare with values built from OpenStax Appendix G. Estimate your uncertainty and identify the biggest source of error.`,
        deliverables: [
          'A safety note and a method someone else could follow',
          'Temperature-time data with the extrapolation shown on a plot',
          'ΔH per mole with an uncertainty estimate and comparison with the tabulated value',
          'A 400 to 600 word discussion of heat losses, the water-like-solution assumption and how to improve the experiment',
        ],
        estimatedHours: 3,
        stretchGoals: ['Nest two foam cups with a lid and measure how much the extrapolated ΔT changes, to estimate the heat leak'],
      },
    },
    {
      slug: 'chemical-equilibrium',
      title: 'Chemical Equilibrium',
      description:
        'Reactions that stop short of completion: dynamic equilibrium, the equilibrium constant and how to manipulate it, the reaction quotient and ICE tables for calculating equilibrium amounts, solubility products, and Le Châtelier\'s principle.',
      lessons: [
        {
          slug: 'the-equilibrium-constant',
          title: 'Dynamic equilibrium and the equilibrium constant',
          summary:
            'At equilibrium forward and reverse reactions run at equal rates. The law of mass action condenses the result into one number, K, whose size tells you how far a reaction goes.',
          estimatedMinutes: 105,
          objectives: [
            'Describe chemical equilibrium as a dynamic state with equal forward and reverse rates',
            'Write Kc and Kp expressions, leaving out pure solids and liquids',
            'Interpret the magnitude of K',
            'Find K for a reversed, scaled or combined reaction',
            'Convert between Kc and Kp with Kp = Kc(RT)^Δn',
          ],
          concepts: [
            'Dynamic equilibrium',
            'Law of mass action',
            'Equilibrium constant Kc (concentrations) and Kp (partial pressures)',
            'Heterogeneous equilibria: solids and liquids omitted',
            'K ≫ 1: products favoured; K ≪ 1: reactants favoured',
            'Reverse: 1/K; multiply by n: Kⁿ; add reactions: multiply K',
            'Kp = Kc(RT)^Δn',
            'K depends on temperature only',
          ],
          explanation: `Many reactions do not go to completion. Seal hydrogen and iodine in a flask at $425\\ ^\\circ\\mathrm{C}$ and they form hydrogen iodide, but the reaction slows and seems to stop with all three present. It has not stopped: HI is still forming, and HI is decomposing back at exactly the same rate. This **dynamic equilibrium** is written with a double arrow:

$$\\mathrm{H_2(g)} + \\mathrm{I_2(g)} \\rightleftharpoons 2\\,\\mathrm{HI(g)}.$$

Start instead from pure HI and you reach the *same* equilibrium mixture, which is strong evidence that it is a balance and not a dead end.

**The law of mass action.** Whatever the starting amounts, at a given temperature the equilibrium concentrations always give the same value of

$$K_c = \\frac{[\\mathrm{HI}]^2}{[\\mathrm{H_2}][\\mathrm{I_2}]},$$

products over reactants, each raised to its coefficient. If equilibrium concentrations are $[\\mathrm{HI}] = 0.156\\ \\mathrm{M}$ and $[\\mathrm{H_2}] = [\\mathrm{I_2}] = 0.0220\\ \\mathrm{M}$, then $K_c = 0.156^2/0.0220^2 = 50$. For gases you can use partial pressures instead, giving $K_p$. Equilibrium constants are written without units (strictly, each concentration is divided by a standard $1\\ \\mathrm{M}$ or $1\\ \\mathrm{bar}$).

**Pure solids and liquids are left out**, because their "concentration" (amount per volume of the pure substance) does not change as the reaction proceeds. For $\\mathrm{CaCO_3(s)} \\rightleftharpoons \\mathrm{CaO(s)} + \\mathrm{CO_2(g)}$, $K_p = P_{\\mathrm{CO_2}}$; for a sparingly soluble salt, $\\mathrm{AgCl(s)} \\rightleftharpoons \\mathrm{Ag^+(aq)} + \\mathrm{Cl^-(aq)}$, $K_\\mathrm{sp} = [\\mathrm{Ag^+}][\\mathrm{Cl^-}] = 1.8 \\times 10^{-10}$, the **solubility product**. Water as the solvent is also omitted.

**What K tells you.** $K \\gg 1$ (say above $10^3$): products dominate at equilibrium. $K \\ll 1$: little product forms. In between, both are present in significant amounts. K says nothing about *speed*: a reaction with $K = 10^{30}$ can be imperceptibly slow.

**Manipulating K.** Because K is built from the equation:

- Reverse the reaction: $K' = 1/K$. (For $2\\,\\mathrm{HI} \\rightleftharpoons \\mathrm{H_2} + \\mathrm{I_2}$, $K = 1/50 = 0.020$.)
- Multiply the coefficients by $n$: $K' = K^n$. (Halving gives $\\sqrt{K}$.)
- Add two reactions: multiply their K values.

Compare enthalpies, where reversing changes the sign and adding adds: K behaves like an exponential of the energy, so sums become products.

**Kc and Kp.** Since $P = (n/V)RT = [\\,]RT$ for an ideal gas, $K_p = K_c(RT)^{\\Delta n}$, where $\\Delta n$ is moles of gaseous products minus gaseous reactants and $R = 0.08206$. For HI, $\\Delta n = 0$ and $K_p = K_c$. For $\\mathrm{N_2} + 3\\,\\mathrm{H_2} \\rightleftharpoons 2\\,\\mathrm{NH_3}$ with $K_c = 0.50$ at $400\\ \\mathrm{K}$, $K_p = 0.50(0.08206 \\times 400)^{-2} = 4.6 \\times 10^{-4}$.

**K changes only with temperature.** Adding reactant, compressing or adding a catalyst changes the amounts present but not K (the third lesson of this module). Pitfalls: including solids or water, forgetting exponents, and writing reactants over products. Read OpenStax 13.1 and 13.2.`,
          resources: [
            ostx('13-1-chemical-equilibria', '13.1 Chemical equilibria', 'Dynamic equilibrium, illustrated with the N₂O₄/NO₂ system.'),
            ostx('13-2-equilibrium-constants', '13.2 Equilibrium constants', 'The reaction quotient and K, Kc and Kp, heterogeneous equilibria, manipulating K.', true),
            mit('unit-iii-thermodynamics-chemical-equilibrium/lecture-18-introduction-to-chemical-equilibrium', 'Lecture 18, Introduction to chemical equilibrium', 'Equilibrium constants and their meaning, with the link to free energy (beyond this course but worth seeing).'),
            phet('reversible-reactions', 'Reversible Reactions', 'Watch molecules react back and forth until forward and reverse rates match.'),
          ],
          exercises: [
            {
              slug: 'write-k-expressions',
              title: 'Write K expressions',
              prompt: `Write $K_c$ (and $K_p$ where all species involved are gases) for: (a) $2\\,\\mathrm{SO_2(g)} + \\mathrm{O_2(g)} \\rightleftharpoons 2\\,\\mathrm{SO_3(g)}$; (b) $\\mathrm{C(s)} + \\mathrm{H_2O(g)} \\rightleftharpoons \\mathrm{CO(g)} + \\mathrm{H_2(g)}$; (c) $\\mathrm{PbI_2(s)} \\rightleftharpoons \\mathrm{Pb^{2+}(aq)} + 2\\,\\mathrm{I^-(aq)}$; (d) $\\mathrm{NH_3(aq)} + \\mathrm{H_2O(l)} \\rightleftharpoons \\mathrm{NH_4^+(aq)} + \\mathrm{OH^-(aq)}$; (e) $\\mathrm{Cu(s)} + 2\\,\\mathrm{Ag^+(aq)} \\rightleftharpoons \\mathrm{Cu^{2+}(aq)} + 2\\,\\mathrm{Ag(s)}$. For (a), find $\\Delta n$ and the relation between $K_p$ and $K_c$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(c) Ksp = [Pb²⁺][I⁻]². (d) Water is omitted. (a) Δn = −1, so Kp = Kc(RT)⁻¹.',
            },
            {
              slug: 'manipulate-k',
              title: 'Manipulate K',
              prompt: `At a certain temperature, $\\mathrm{N_2(g)} + \\mathrm{O_2(g)} \\rightleftharpoons 2\\,\\mathrm{NO(g)}$ has $K_c = 4.1 \\times 10^{-4}$ and $2\\,\\mathrm{NO(g)} + \\mathrm{O_2(g)} \\rightleftharpoons 2\\,\\mathrm{NO_2(g)}$ has $K_c = 6.4 \\times 10^{2}$ (illustrative values). Find $K_c$ for: (a) $\\mathrm{NO(g)} \\rightleftharpoons \\tfrac12\\mathrm{N_2(g)} + \\tfrac12\\mathrm{O_2(g)}$; (b) $\\mathrm{N_2(g)} + 2\\,\\mathrm{O_2(g)} \\rightleftharpoons 2\\,\\mathrm{NO_2(g)}$; (c) $\\mathrm{NO_2(g)} \\rightleftharpoons \\mathrm{NO(g)} + \\tfrac12\\mathrm{O_2(g)}$. Explain the rule you used each time.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) (1/4.1 × 10⁻⁴)^½ = 49. (b) Add the reactions: 4.1 × 10⁻⁴ × 640 = 0.26. (c) (1/640)^½ = 0.040.',
            },
            {
              slug: 'k-from-data',
              title: 'K from experimental data',
              prompt: `Three experiments on $\\mathrm{H_2} + \\mathrm{I_2} \\rightleftharpoons 2\\,\\mathrm{HI}$ at the same temperature reach equilibrium with ($[\\mathrm{H_2}]$, $[\\mathrm{I_2}]$, $[\\mathrm{HI}]$ in M): (0.0222, 0.0222, 0.157); (0.0350, 0.0140, 0.157); (0.0100, 0.0450, 0.150). Compute $K_c$ for each and comment. Then compute the ratio $[\\mathrm{HI}]/([\\mathrm{H_2}][\\mathrm{I_2}])$ (no exponent) for each and explain why it is not constant.`,
              kind: 'data-analysis',
              difficulty: 2,
              hint: 'Kc ≈ 50.0, 50.3, 50.0: constant within rounding. Without the square the ratios are 319, 320, 333, which drift: only the mass-action form is constant.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is "dynamic" about a dynamic equilibrium, and how could you show it experimentally?',
              answerOutline: 'Forward and reverse reactions continue at equal rates. Approaching from either side gives the same mixture, and isotopic labelling (e.g. adding D₂) shows exchange continues at equilibrium.',
            },
            {
              question: 'Why are pure solids and liquids left out of K?',
              answerOutline: 'Their effective concentration (activity) is constant, fixed by their density, and does not change during the reaction, so it is absorbed into K.',
            },
            {
              question: 'How does K change when a reaction is reversed, doubled, or added to another?',
              answerOutline: 'Reversed: 1/K. Doubled: K². Added: the product of the two K values.',
            },
          ],
          quiz: [
            {
              question: 'For $2\\,\\mathrm{SO_2(g)} + \\mathrm{O_2(g)} \\rightleftharpoons 2\\,\\mathrm{SO_3(g)}$, the equilibrium concentrations are $[\\mathrm{SO_2}] = 0.050$, $[\\mathrm{O_2}] = 0.030$ and $[\\mathrm{SO_3}] = 0.20\\ \\mathrm{M}$. What is $K_c$?',
              options: ['133', '16', '$1.9 \\times 10^{-3}$', '533'],
              answer: 3,
              explanation:
                '$K_c = \\dfrac{(0.20)^2}{(0.050)^2(0.030)} = \\dfrac{0.040}{7.5 \\times 10^{-5}} = 533$. Leaving out the exponents gives 133; leaving out $\\mathrm{O_2}$ gives 16; reactants over products gives $1.9 \\times 10^{-3}$.',
            },
            {
              question: '$\\mathrm{N_2} + 3\\,\\mathrm{H_2} \\rightleftharpoons 2\\,\\mathrm{NH_3}$ has $K_c = 0.040$ at some temperature. What is $K_c$ for $\\mathrm{NH_3} \\rightleftharpoons \\tfrac12\\mathrm{N_2} + \\tfrac32\\mathrm{H_2}$?',
              options: ['25', '5.0', '0.20', '$-0.040$'],
              answer: 1,
              explanation:
                'Reversing gives $1/0.040 = 25$; halving the coefficients takes the square root: $\\sqrt{25} = 5.0$. Stopping after the reversal gives 25; $0.20 = \\sqrt{0.040}$ halves without reversing. K is never negative: reversing inverts it, unlike $\\Delta H$, which changes sign.',
            },
            {
              question: 'What is the equilibrium expression for $\\mathrm{CaCO_3(s)} \\rightleftharpoons \\mathrm{CaO(s)} + \\mathrm{CO_2(g)}$?',
              options: [
                '$K_p = P_{\\mathrm{CO_2}}$',
                '$K_p = \\dfrac{[\\mathrm{CaO}]P_{\\mathrm{CO_2}}}{[\\mathrm{CaCO_3}]}$',
                '$K_p = \\dfrac{1}{P_{\\mathrm{CO_2}}}$',
                'No expression exists for a reaction involving solids',
              ],
              answer: 0,
              explanation:
                'The two solids are pure phases with constant activity and are omitted, leaving $K_p = P_{\\mathrm{CO_2}}$: at a given temperature the pressure of $\\mathrm{CO_2}$ over limestone is fixed, however much solid is present. Including the solids is the common error.',
            },
            {
              question: 'Reaction A has $K = 10^{25}$; reaction B has $K = 10^{-3}$. Which statement is justified?',
              options: [
                'Reaction A is fast and reaction B is slow',
                'Reaction B produces no products at all',
                'At equilibrium, reaction A is almost entirely products, while B has mostly reactants with a little product',
                'Reaction A releases more heat',
              ],
              answer: 2,
              explanation:
                'K describes the position of equilibrium, not the rate or the heat. A tiny K still means some product (here about $10^{-3}$ of the reactant level in a simple case), so "no products at all" is too strong. How fast equilibrium is reached is a question of kinetics.',
            },
          ],
        },
        {
          slug: 'reaction-quotient-and-ice-tables',
          title: 'The reaction quotient and equilibrium calculations',
          summary:
            'Compare Q with K to predict which way a mixture will shift; set up ICE tables to find equilibrium concentrations, using the small-x approximation when K is small. Includes solubility from Ksp.',
          estimatedMinutes: 125,
          objectives: [
            'Calculate the reaction quotient Q and predict the direction of reaction by comparing it with K',
            'Set up and solve an ICE (initial, change, equilibrium) table',
            'Use the small-x approximation and check it with the 5 % rule',
            'Calculate molar solubility from Ksp and Ksp from solubility',
          ],
          concepts: [
            'Reaction quotient Q',
            'Q < K: forward; Q > K: reverse; Q = K: at equilibrium',
            'ICE table',
            'Perfect squares and the quadratic formula',
            'Small-x approximation and the 5 % check',
            'Molar solubility and Ksp',
          ],
          explanation: `The **reaction quotient** $Q$ has the same form as $K$ but uses the concentrations *right now*, whatever they are. Comparing it with $K$ tells you which way the mixture will move:

- $Q < K$: too few products; the reaction runs forward.
- $Q > K$: too many products; it runs in reverse.
- $Q = K$: at equilibrium; no net change.

For $\\mathrm{N_2O_4} \\rightleftharpoons 2\\,\\mathrm{NO_2}$ with $K_c = 4.6 \\times 10^{-3}$, a mixture with $[\\mathrm{N_2O_4}] = 0.20$ and $[\\mathrm{NO_2}] = 0.050\\ \\mathrm{M}$ has $Q = 0.050^2/0.20 = 0.0125 > K$, so $\\mathrm{NO_2}$ combines to form $\\mathrm{N_2O_4}$ until $Q$ falls to $K$.

**ICE tables.** To find equilibrium concentrations, tabulate Initial amounts, the Change (written with one unknown $x$ times each coefficient, signs set by the direction), and Equilibrium amounts, then substitute into $K$.

**Worked example.** $0.100\\ \\mathrm{M}$ each of $\\mathrm{H_2}$ and $\\mathrm{I_2}$ react; $K_c = 50.0$.

| | $\\mathrm{H_2}$ | $\\mathrm{I_2}$ | $2\\,\\mathrm{HI}$ |
|---|---|---|---|
| I | $0.100$ | $0.100$ | $0$ |
| C | $-x$ | $-x$ | $+2x$ |
| E | $0.100 - x$ | $0.100 - x$ | $2x$ |

$$50.0 = \\frac{(2x)^2}{(0.100 - x)^2} \\;\\Rightarrow\\; \\frac{2x}{0.100 - x} = \\sqrt{50.0} = 7.071 \\;\\Rightarrow\\; x = 0.0780.$$

So $[\\mathrm{HI}] = 0.156\\ \\mathrm{M}$ and $[\\mathrm{H_2}] = [\\mathrm{I_2}] = 0.0220\\ \\mathrm{M}$. Check: $0.156^2/0.0220^2 = 50$. Taking the square root worked because both sides were perfect squares; otherwise use the quadratic formula and keep the root that gives positive concentrations.

**Small K: the small-x approximation.** For $\\mathrm{A} \\rightleftharpoons 2\\,\\mathrm{B}$ with $K_c = 1.0 \\times 10^{-4}$ and $[\\mathrm{A}]_0 = 0.20\\ \\mathrm{M}$, the equation is $4x^2/(0.20 - x) = 1.0 \\times 10^{-4}$. Since K is small, $x$ will be small and $0.20 - x \\approx 0.20$: $4x^2 = 2.0 \\times 10^{-5}$, $x = 2.24 \\times 10^{-3}$. **Check**: $x$ is $1.1\\,\\%$ of $0.20$, under 5 %, so the approximation is fine (the exact answer is $2.22 \\times 10^{-3}$). If the check fails, solve the quadratic.

**Solubility.** For $\\mathrm{AgCl(s)} \\rightleftharpoons \\mathrm{Ag^+} + \\mathrm{Cl^-}$ in pure water, if $s$ moles per litre dissolve, $K_\\mathrm{sp} = s^2$, so $s = \\sqrt{1.8 \\times 10^{-10}} = 1.3 \\times 10^{-5}\\ \\mathrm{M}$, about $1.9\\ \\mathrm{mg}$ per litre: "insoluble" made quantitative. For a salt such as $\\mathrm{PbI_2}$, $K_\\mathrm{sp} = s(2s)^2 = 4s^3$. If a common ion is already present (AgCl in $0.10\\ \\mathrm{M}$ NaCl), solubility drops sharply: $s = K_\\mathrm{sp}/0.10 = 1.8 \\times 10^{-9}\\ \\mathrm{M}$.

**Pitfalls.** Forgetting coefficients in the change row ($+2x$, not $+x$); using moles instead of concentrations (divide by volume first); and dropping $x$ when $K$ is not small. Read OpenStax 13.4.`,
          resources: [
            ostx('13-4-equilibrium-calculations', '13.4 Equilibrium calculations', 'ICE tables, perfect squares, quadratics and the small-x approximation with many worked examples.', true),
            ostx('13-2-equilibrium-constants', '13.2 Equilibrium constants', 'The reaction quotient and predicting the direction of change.'),
            ostx('15-1-precipitation-and-dissolution', '15.1 Precipitation and dissolution', 'Ksp, molar solubility and the common-ion effect, with a table of Ksp values.'),
            mit('unit-iii-thermodynamics-chemical-equilibrium/lecture-20-solubility-and-acid-base-equilibrium', 'Lecture 20, Solubility and acid-base equilibrium', 'Ksp calculations and the common-ion effect (first part).'),
          ],
          exercises: [
            {
              slug: 'q-and-direction',
              title: 'Which way will it go?',
              prompt: `For $\\mathrm{H_2} + \\mathrm{I_2} \\rightleftharpoons 2\\,\\mathrm{HI}$ ($K_c = 50.0$), decide the direction of reaction for each mixture (in M): (a) $[\\mathrm{H_2}] = [\\mathrm{I_2}] = 0.010$, $[\\mathrm{HI}] = 0.10$; (b) $[\\mathrm{H_2}] = 0.0420$, $[\\mathrm{I_2}] = 0.0220$, $[\\mathrm{HI}] = 0.156$ (the lesson's equilibrium mixture with extra $\\mathrm{H_2}$ added); (c) $[\\mathrm{H_2}] = 0.020$, $[\\mathrm{I_2}] = 0.020$, $[\\mathrm{HI}] = 0.141$. For (b), solve for the new equilibrium concentrations.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Q = 100 > K: reverse. (b) Q ≈ 26 < K: forward. Solving (0.156 + 2x)²/[(0.0420 − x)(0.0220 − x)] = 50.0 gives x ≈ 0.0062: [HI] = 0.168, [H₂] = 0.0358, [I₂] = 0.0158 M. (c) Q = 49.7 ≈ K: at equilibrium.',
            },
            {
              slug: 'ice-problems',
              title: 'ICE problems',
              prompt: `(a) $\\mathrm{CO(g)} + \\mathrm{H_2O(g)} \\rightleftharpoons \\mathrm{CO_2(g)} + \\mathrm{H_2(g)}$ has $K_c = 4.00$ at some temperature. Starting from $0.100\\ \\mathrm{M}$ each of CO and $\\mathrm{H_2O}$, find all equilibrium concentrations. (b) $\\mathrm{PCl_5(g)} \\rightleftharpoons \\mathrm{PCl_3(g)} + \\mathrm{Cl_2(g)}$ has $K_c = 0.0420$. Starting from $0.100\\ \\mathrm{M}$ $\\mathrm{PCl_5}$, find the equilibrium concentrations. Try the small-x approximation first and show that it fails the 5 % test; then solve the quadratic.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) x/(0.100 − x) = 2: x = 0.0667 M CO₂ and H₂, 0.0333 M CO and H₂O. (b) Approximation gives x = √0.00420 = 0.0648 (65 %!). Quadratic: x² + 0.0420x − 0.00420 = 0, x = 0.0471: [PCl₃] = [Cl₂] = 0.0471, [PCl₅] = 0.0529 M.',
            },
            {
              slug: 'solubility-from-ksp',
              title: 'Solubility from Ksp',
              prompt: `(a) $K_\\mathrm{sp}$ of $\\mathrm{PbI_2}$ is $9.8 \\times 10^{-9}$. Find its molar solubility in pure water and in grams per litre. (b) Find its solubility in $0.10\\ \\mathrm{M}$ KI. (c) A saturated solution of $\\mathrm{CaF_2}$ contains $2.1 \\times 10^{-4}\\ \\mathrm{M}$ $\\mathrm{Ca^{2+}}$. Find $K_\\mathrm{sp}$. (d) Explain why the salt with the smaller $K_\\mathrm{sp}$ is not always the less soluble one when the formulas differ.`,
              kind: 'problem',
              difficulty: 3,
              hint: '(a) 4s³ = 9.8 × 10⁻⁹: s = 1.35 × 10⁻³ M, × 461.0 g/mol = 0.62 g/L. (b) s(0.10)² = Ksp: s = 9.8 × 10⁻⁷ M. (c) Ksp = s(2s)² = 4(2.1 × 10⁻⁴)³ = 3.7 × 10⁻¹¹.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you predict the direction of a reaction from Q and K?',
              answerOutline: 'Compute Q from current concentrations. Q < K: forward (towards products); Q > K: reverse; Q = K: at equilibrium.',
            },
            {
              question: 'When is the small-x approximation justified, and how do you check it?',
              answerOutline: 'When K is small relative to the initial concentrations so x is small; after solving, check x is under 5 % of the quantity it was subtracted from. Otherwise solve the quadratic.',
            },
            {
              question: 'Why does AgCl dissolve less in NaCl solution than in pure water?',
              answerOutline: 'The common ion Cl⁻ already present makes Q = [Ag⁺][Cl⁻] reach Ksp at a much smaller [Ag⁺] (Le Châtelier: the dissolution equilibrium is pushed back).',
            },
          ],
          quiz: [
            {
              question: 'For $\\mathrm{N_2O_4} \\rightleftharpoons 2\\,\\mathrm{NO_2}$, $K_c = 4.6 \\times 10^{-3}$. A flask contains $[\\mathrm{N_2O_4}] = 0.20\\ \\mathrm{M}$ and $[\\mathrm{NO_2}] = 0.050\\ \\mathrm{M}$. What happens?',
              options: [
                '$Q = 0.0125 > K$, so $\\mathrm{NO_2}$ is converted to $\\mathrm{N_2O_4}$',
                '$Q = 0.25 > K$, so the reaction runs in reverse',
                '$Q = 0.0125 > K$, so more $\\mathrm{NO_2}$ forms',
                'Nothing: the mixture is at equilibrium',
              ],
              answer: 0,
              explanation:
                '$Q = (0.050)^2/0.20 = 0.0125$, larger than $K$, so there are too many products and the reaction runs in reverse. The third option computes $Q$ correctly but reads the comparison backwards; $0.25$ forgets to square $[\\mathrm{NO_2}]$.',
            },
            {
              question: '$\\mathrm{CO} + \\mathrm{H_2O} \\rightleftharpoons \\mathrm{CO_2} + \\mathrm{H_2}$ has $K_c = 4.00$. Starting with $0.100\\ \\mathrm{M}$ CO and $0.100\\ \\mathrm{M}$ $\\mathrm{H_2O}$ and no products, what is $[\\mathrm{H_2}]$ at equilibrium?',
              options: ['$0.0333\\ \\mathrm{M}$', '$0.0500\\ \\mathrm{M}$', '$0.0667\\ \\mathrm{M}$', '$0.200\\ \\mathrm{M}$'],
              answer: 2,
              explanation:
                '$x^2/(0.100 - x)^2 = 4.00$, so $x/(0.100 - x) = 2.00$ and $x = 0.0667\\ \\mathrm{M}$. $0.0333$ is the remaining CO; $0.0500$ assumes a 50:50 split ($K = 1$); $0.200$ is impossible, since it exceeds the starting amounts.',
            },
            {
              question: 'Silver bromide has $K_\\mathrm{sp} = 5.0 \\times 10^{-13}$. What is its molar solubility in pure water?',
              options: ['$5.0 \\times 10^{-13}\\ \\mathrm{M}$', '$2.5 \\times 10^{-13}\\ \\mathrm{M}$', '$3.5 \\times 10^{-7}\\ \\mathrm{M}$', '$7.1 \\times 10^{-7}\\ \\mathrm{M}$'],
              answer: 3,
              explanation:
                '$\\mathrm{AgBr} \\rightleftharpoons \\mathrm{Ag^+} + \\mathrm{Br^-}$, so $K_\\mathrm{sp} = s^2$ and $s = \\sqrt{5.0 \\times 10^{-13}} = 7.1 \\times 10^{-7}\\ \\mathrm{M}$. Taking $K_\\mathrm{sp}$ itself as the solubility forgets the square root; $3.5 \\times 10^{-7}$ halves the root as if two ions shared $s$.',
            },
            {
              question: 'What is the difference between $Q$ and $K$?',
              options: [
                '$Q$ is for gases and $K$ for solutions',
                '$Q$ uses the concentrations at any moment; $K$ is the value $Q$ takes at equilibrium, fixed at a given temperature',
                '$K$ changes as the reaction proceeds; $Q$ is constant',
                'They are the same number written two ways',
              ],
              answer: 1,
              explanation:
                'Both have the same algebraic form. $Q$ changes as the reaction runs and stops changing when it equals $K$; $K$ depends only on temperature. The third option has them exactly backwards.',
            },
          ],
        },
        {
          slug: 'le-chateliers-principle',
          title: 'Le Châtelier\'s principle',
          summary:
            'How an equilibrium responds to added or removed substances, pressure and volume changes, temperature and catalysts, explained each time by comparing Q with K.',
          estimatedMinutes: 105,
          objectives: [
            'Predict the shift of an equilibrium after adding or removing a reactant or product, and explain it with Q and K',
            'Predict the effect of changing volume (pressure) on gas-phase equilibria',
            'Predict how temperature changes K for exothermic and endothermic reactions',
            'Explain why catalysts and inert gases at constant volume do not shift equilibrium',
            'Apply these ideas to an industrial process such as the Haber-Bosch synthesis of ammonia',
          ],
          concepts: [
            'Le Châtelier\'s principle',
            'Concentration changes: Q moves, K does not',
            'Volume decrease shifts towards fewer moles of gas',
            'Inert gas at constant volume: no shift',
            'Temperature changes K: heat as a reactant or product',
            'Catalysts speed up both directions equally',
            'Haber-Bosch process trade-offs',
          ],
          explanation: `**Le Châtelier's principle**: when a system at equilibrium is disturbed, it shifts in the direction that partly counteracts the disturbance. It is a good rule of thumb, but the reliable explanation is always the same: the disturbance makes $Q \\ne K$ (or changes $K$), and the reaction runs until $Q = K$ again.

**Adding or removing a substance.** Add $\\mathrm{H_2}$ to the equilibrium $\\mathrm{H_2} + \\mathrm{I_2} \\rightleftharpoons 2\\,\\mathrm{HI}$ ($K_c = 50.0$; $0.0220$, $0.0220$, $0.156\\ \\mathrm{M}$), raising $[\\mathrm{H_2}]$ to $0.0420$. Now $Q = 0.156^2/(0.0420 \\times 0.0220) \\approx 26 < K$, so the reaction runs forward, using up some of the added $\\mathrm{H_2}$ and some $\\mathrm{I_2}$ and making more HI. It does not remove all the added $\\mathrm{H_2}$: the new equilibrium has $[\\mathrm{H_2}] = 0.0358\\ \\mathrm{M}$, between the old value and the disturbed one. Removing a product works the same way, which is why chemists drive reactions forward by distilling off a product or letting a gas escape.

**Changing volume.** Compressing a gas mixture raises every partial pressure by the same factor. For $\\mathrm{N_2O_4} \\rightleftharpoons 2\\,\\mathrm{NO_2}$, halving the volume doubles both concentrations, so $Q = [\\mathrm{NO_2}]^2/[\\mathrm{N_2O_4}]$ doubles: $Q > K$ and the system shifts towards $\\mathrm{N_2O_4}$, the side with **fewer moles of gas**. A reaction with equal moles of gas on each side (HI) does not shift. Adding an inert gas such as argon at constant volume changes the total pressure but none of the partial pressures, so $Q$ is unchanged and nothing happens.

**Changing temperature** is different: it changes $K$ itself. Treat heat as a product of an exothermic reaction and a reactant of an endothermic one. For exothermic reactions ($\\Delta H < 0$), raising $T$ *decreases* $K$ and shifts the mixture towards reactants; for endothermic ones, raising $T$ increases $K$. $\\mathrm{N_2O_4} \\rightleftharpoons 2\\,\\mathrm{NO_2}$ is endothermic, so a sealed tube of the gas turns browner (more $\\mathrm{NO_2}$) when warmed.

**Catalysts** lower the energy barrier for the forward and reverse reactions equally. Equilibrium is reached sooner but in the same place; $K$ is unchanged.

**Haber-Bosch.** $\\mathrm{N_2} + 3\\,\\mathrm{H_2} \\rightleftharpoons 2\\,\\mathrm{NH_3}$, $\\Delta H^\\circ = -91.8\\ \\mathrm{kJ}$. High pressure favours ammonia (4 moles of gas become 2). Low temperature favours it too ($K$ is larger), but then the reaction is far too slow, even with an iron catalyst. Plants compromise at about $400$ to $500\\ ^\\circ\\mathrm{C}$ and $150$ to $300\\ \\mathrm{atm}$, and remove ammonia by condensing it so the reaction keeps running forward; this one process supplies the nitrogen in fertiliser for roughly half the world's food.

**Pitfalls.** Saying adding a reactant "increases K" (it changes $Q$, not $K$); predicting a pressure shift for equal moles of gas; counting solids or liquids when comparing moles of gas; and thinking a catalyst increases yield. Read OpenStax 13.3.`,
          resources: [
            ostx('13-3-shifting-equilibria-le-chateliers-principle', '13.3 Shifting equilibria: Le Châtelier\'s principle', 'Concentration, pressure, temperature and catalysts, with the Haber process as a case study.', true),
            mit('unit-iii-thermodynamics-chemical-equilibrium/lecture-19', 'Lecture 19, Chemical equilibrium: Le Châtelier\'s principle', 'A lecture on each kind of disturbance, with the temperature dependence of K.'),
            phet('reversible-reactions', 'Reversible Reactions', 'Change the temperature and the energy profile and watch the equilibrium amounts shift.'),
          ],
          exercises: [
            {
              slug: 'predict-shifts',
              title: 'Predict the shifts',
              prompt: `For $2\\,\\mathrm{SO_2(g)} + \\mathrm{O_2(g)} \\rightleftharpoons 2\\,\\mathrm{SO_3(g)}$, $\\Delta H^\\circ = -198\\ \\mathrm{kJ}$, predict the direction of shift and the effect on $K$ when you: (a) add $\\mathrm{O_2}$; (b) remove $\\mathrm{SO_3}$; (c) halve the volume; (d) raise the temperature; (e) add a vanadium(V) oxide catalyst; (f) add argon at constant volume; (g) add argon at constant total pressure (so the volume grows). Justify (c), (f) and (g) with $Q$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a), (b), (c): forward, K unchanged. (d) Reverse, K decreases. (e) No shift. (f) No shift: partial pressures unchanged. (g) Partial pressures fall, like an expansion: shift towards more moles of gas (reverse).',
            },
            {
              slug: 'quantitative-shift',
              title: 'A quantitative shift',
              prompt: `Carry out the lesson's calculation yourself: starting from the equilibrium $[\\mathrm{H_2}] = [\\mathrm{I_2}] = 0.0220$, $[\\mathrm{HI}] = 0.156\\ \\mathrm{M}$ ($K_c = 50.0$), $[\\mathrm{H_2}]$ is suddenly raised to $0.0420\\ \\mathrm{M}$. Set up the ICE table and solve for the new equilibrium (a quadratic). Show that $[\\mathrm{H_2}]$ ends between $0.0220$ and $0.0420$, and that $[\\mathrm{I_2}]$ falls. Verify that your concentrations give $K_c = 50$.`,
              kind: 'problem',
              difficulty: 3,
              hint: '(0.156 + 2x)² = 50(0.0420 − x)(0.0220 − x) rearranges to 46x² − 3.824x + 0.02186 = 0, with root x ≈ 0.0062 (the other root exceeds 0.0220). New: [HI] 0.168, [H₂] 0.0358, [I₂] 0.0158 M.',
            },
            {
              slug: 'haber-essay',
              title: 'The Haber-Bosch compromise',
              prompt: `In about 250 words, explain the operating conditions of an ammonia plant using Le Châtelier's principle and what you know about reaction rates. Address: why not run at room temperature; why not at $1000\\ ^\\circ\\mathrm{C}$; why high pressure; why ammonia is condensed out and the unreacted gases recycled; and what the catalyst does and does not do.`,
              kind: 'writing',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Adding a reactant shifts an equilibrium forward. Does K change? Explain with Q.',
              answerOutline: 'No. Adding reactant lowers Q below K (reactants are in the denominator); the reaction proceeds forward until Q = K again. Only temperature changes K.',
            },
            {
              question: 'Why does compressing N₂O₄ ⇌ 2NO₂ favour N₂O₄ but compressing H₂ + I₂ ⇌ 2HI have no effect?',
              answerOutline: 'Compression multiplies all concentrations by the same factor; Q changes by that factor raised to Δn_gas. For N₂O₄ ⇌ 2NO₂, Δn = +1, so Q rises above K and the reaction reverses; for HI, Δn = 0, so Q is unchanged.',
            },
            {
              question: 'How does temperature affect K for an exothermic reaction, and why does a catalyst not change K?',
              answerOutline: 'Raising T decreases K (heat is a product). A catalyst speeds forward and reverse reactions by the same factor, so the equilibrium position is unchanged; it is reached faster.',
            },
          ],
          quiz: [
            {
              question: 'The volume of an equilibrium mixture of $\\mathrm{N_2O_4(g)} \\rightleftharpoons 2\\,\\mathrm{NO_2(g)}$ is suddenly halved at constant temperature. What is $Q$ immediately afterwards, and what happens?',
              options: [
                '$Q = K$; nothing happens because temperature is constant',
                '$Q = K/2$; the reaction runs forward',
                '$Q = 2K$; the reaction runs in reverse, towards $\\mathrm{N_2O_4}$',
                '$Q = 4K$; the reaction runs forward',
              ],
              answer: 2,
              explanation:
                'Both concentrations double: $Q = (2[\\mathrm{NO_2}])^2/(2[\\mathrm{N_2O_4}]) = 2K$. With $Q > K$, the reaction runs in reverse, towards the side with fewer moles of gas. $4K$ squares the change in the numerator but forgets the denominator; constant temperature keeps $K$ fixed, not $Q$.',
            },
            {
              question: 'The reaction $\\mathrm{N_2} + 3\\,\\mathrm{H_2} \\rightleftharpoons 2\\,\\mathrm{NH_3}$ is exothermic. What happens to $K$ and to the amount of ammonia at equilibrium when the temperature is raised?',
              options: [
                '$K$ decreases and the equilibrium amount of ammonia falls',
                '$K$ increases, because reactions go faster when hot',
                '$K$ is unchanged; only the rate increases',
                '$K$ decreases but the amount of ammonia rises',
              ],
              answer: 0,
              explanation:
                'For an exothermic reaction heat is effectively a product, so raising $T$ lowers $K$ and less ammonia is present at equilibrium. Rate and equilibrium position are separate questions: heating does speed both directions, which is why plants still run hot.',
            },
            {
              question: 'An iron catalyst is added to a Haber-Bosch reactor already at equilibrium. What changes?',
              options: [
                'More ammonia forms, because the catalyst favours the forward reaction',
                'Nothing changes at equilibrium; a catalyst only helps a mixture that is not yet at equilibrium reach it faster',
                'K increases',
                'The reaction shifts towards reactants',
              ],
              answer: 1,
              explanation:
                'A catalyst lowers the barrier for the forward and reverse reactions equally, so the equilibrium composition and K are untouched. Its value is in reaching equilibrium quickly at a temperature where K is still reasonably large.',
            },
            {
              question: 'Argon is pumped into a rigid container holding the equilibrium $2\\,\\mathrm{SO_2} + \\mathrm{O_2} \\rightleftharpoons 2\\,\\mathrm{SO_3}$. The total pressure rises. What happens?',
              options: [
                'The equilibrium shifts forward, towards fewer moles of gas',
                'The equilibrium shifts in reverse',
                'K increases with the total pressure',
                'Nothing: the partial pressures of $\\mathrm{SO_2}$, $\\mathrm{O_2}$ and $\\mathrm{SO_3}$ are unchanged, so $Q$ still equals $K$',
              ],
              answer: 3,
              explanation:
                'At constant volume, adding an inert gas leaves each reacting gas\'s moles and volume, and so its partial pressure, unchanged. $Q$ is unchanged and there is no shift. "Higher pressure favours fewer moles" applies to compression, which raises the reacting gases\' own pressures.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'chemistry-of-a-fuel',
    title: 'The chemistry of a fuel, from atoms to equilibrium',
    description: `Choose one fuel or energy-storage chemical and follow it through every topic of the course, using only data from named sources (IUPAC atomic weights, OpenStax Appendix G, the NIST Chemistry WebBook). Good choices are methane (natural gas), propane, ethanol, methanol, hydrogen, or ammonia (proposed as a carbon-free fuel). The result is a technical report that a curious non-chemist could follow.

1. **Atoms and structure.** Give the electron configurations of the elements involved, explain the relevant periodic trends (why C, H, N and O bond as they do), draw the Lewis structures of the fuel, the oxidant and every product, and give each molecule's VSEPR shape, polarity and the hybridisation of each central atom.
2. **Physical state.** Explain the fuel's boiling point from its intermolecular forces, compare with two related compounds, and use the Clausius-Clapeyron equation (with a WebBook ΔH_vap) to estimate its vapour pressure at 0 °C and 40 °C. Say what that means for storing it.
3. **Stoichiometry.** Balance the complete combustion. For 1.00 kg of fuel, compute the mass of oxygen needed, the volume of air at 25 °C and 1 atm (air is 20.95 % O₂ by moles), and the masses of each product. Repeat with a 10 % shortfall of air and identify the limiting reagent.
4. **Gases.** Compute the volume the fuel occupies as a gas at 25 °C and 1 atm, and the partial pressure of water in the exhaust. Use the van der Waals equation to estimate how far the gas departs from ideal at a typical storage pressure.
5. **Energy.** Calculate ΔH°comb from formation enthalpies and estimate it from bond energies; explain the difference. Report energy per mole, per gram, per litre (as stored) and per mole of CO₂, and compare with at least two other fuels.
6. **Equilibrium.** Analyse one equilibrium connected to the fuel: for hydrogen or ammonia, the Haber-Bosch synthesis or steam reforming of methane ($\\mathrm{CH_4} + \\mathrm{H_2O} \\rightleftharpoons \\mathrm{CO} + 3\\,\\mathrm{H_2}$); for carbon fuels, the water-gas shift ($\\mathrm{CO} + \\mathrm{H_2O} \\rightleftharpoons \\mathrm{CO_2} + \\mathrm{H_2}$). Using a K value from a cited source, solve an ICE problem for a realistic feed and explain with Le Châtelier's principle how industry chooses temperature and pressure.

A spreadsheet is enough for every calculation; no programming is needed.`,
    deliverables: [
      'A 3,000 to 4,500 word report with sections for the six parts above and a one-page summary for non-chemists',
      'Lewis structures and 3D shape sketches of every species',
      'A calculation appendix (spreadsheet or worked pages) in which every number carries units and correct significant figures',
      'A data appendix listing every value used with its source and table or page',
      'A comparison table of at least three fuels by energy per mass, per volume and per mole of CO₂',
    ],
    estimatedHours: 8,
    stretchGoals: [
      'Calculate the adiabatic flame temperature of the fuel burning in air, assuming all the heat warms the products (use heat capacities from the WebBook), and explain why the real flame is cooler',
      'Compare the fuel with a battery: energy per kilogram, and what fraction of each can be turned into useful work',
    ],
  },
  masteryChecklist: [
    'I can carry units through any calculation with dimensional analysis and report the result with the right significant figures',
    'I can convert between mass, moles, number of particles and (for gases) volume',
    'I can compute photon energies and hydrogen transition wavelengths, and explain why atomic energies are quantised',
    'I can write the electron configuration of any element up to krypton, including ions and the Cr and Cu exceptions',
    'I can explain the periodic trends in size, ionisation energy and electronegativity, and their exceptions, from effective nuclear charge',
    'I can draw Lewis structures with formal charges and resonance, predict VSEPR shapes and hybridisation, and decide whether a molecule is polar',
    'I can rank substances by boiling point from their intermolecular forces and read a phase diagram',
    'I can solve stoichiometry problems with limiting reagents, yields, solutions, precipitation and titrations',
    'I can use the gas laws, Dalton\'s law and kinetic-molecular theory, and explain when gases are not ideal',
    'I can measure and calculate reaction enthalpies with calorimetry, Hess\'s law, formation enthalpies and bond energies',
    'I can write equilibrium expressions, solve ICE problems and predict the effect of disturbances with Q, K and Le Châtelier\'s principle',
  ],
});
