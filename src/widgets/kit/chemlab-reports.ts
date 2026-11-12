/**
 * Lab-report templates and grading rubrics for the lab-report widget. Every report uses the same
 * section order (title, abstract, introduction, materials and methods, results, calculations,
 * discussion with error analysis, conclusion, references); each experiment adds its own prompts,
 * a results-table skeleton in Markdown, and rubric items worth 50 points in all.
 */

export interface ReportSection {
  id: string;
  heading: string;
  /** What to write, shown above the box. */
  prompt: string;
  /** Rough length guide. */
  words: string;
}

export interface RubricItem {
  text: string;
  points: number;
}

export interface ReportTemplate {
  title: string;
  /** Experiment-specific prompts that replace the general ones, by section id. */
  prompts: Partial<Record<string, string>>;
  /** Markdown table(s) inserted into Results on request. */
  table: string;
  /** Experiment-specific rubric items (added to the general ones). */
  rubric: RubricItem[];
}

export const SECTIONS: ReportSection[] = [
  { id: 'abstract', heading: 'Abstract', prompt: 'One paragraph: the aim, the method in a phrase, the main numerical result with its uncertainty and units, and how it compares with the accepted or expected value.', words: '80-150 words' },
  { id: 'introduction', heading: 'Introduction', prompt: 'The question and why it matters, the chemistry behind the method (balanced equations, the key relationship), and what you set out to measure.', words: '150-300 words' },
  { id: 'methods', heading: 'Materials and methods', prompt: 'What you did, in the past tense and in enough detail to repeat it: reagents with concentrations, instruments with their precision, the procedure you followed (cite it), and any deviations. Not a copy of the procedure as a list of commands.', words: '100-250 words' },
  { id: 'results', heading: 'Results', prompt: 'Your raw data in tables with units and the right number of decimal places, then processed results. Number every table and figure and give each a caption. Describe the main observations in a sentence or two; no interpretation yet.', words: 'tables + 50-150 words' },
  { id: 'calculations', heading: 'Calculations', prompt: 'One worked sample calculation for each step, with units carried through, then a summary of all trials (mean, standard deviation, relative uncertainty). Show how the uncertainty of the final result was estimated.', words: 'as needed' },
  { id: 'discussion', heading: 'Discussion and error analysis', prompt: 'Is the result accurate and precise? Compare with the accepted value (percent error) and with your own uncertainty. Name the specific sources of error that could explain the difference, say in which direction each would move the result, and estimate the size of the largest. Suggest a concrete improvement.', words: '250-500 words' },
  { id: 'conclusion', heading: 'Conclusion', prompt: 'Two or three sentences: the answer to the question, with the number, its uncertainty and units.', words: '40-80 words' },
  { id: 'references', heading: 'References', prompt: 'The procedure, the source of every constant you used (for example the density or vapour pressure of water), and any textbook. Use one consistent style (ACS style is standard in chemistry).', words: 'a list' },
];

export const GENERAL_RUBRIC: RubricItem[] = [
  { text: 'Abstract gives the aim, method, the main result with uncertainty and units, and the comparison', points: 4 },
  { text: 'Introduction explains the chemistry with balanced equations and the key relationship', points: 4 },
  { text: 'Methods are in the past tense, reproducible, and name each instrument with its precision', points: 4 },
  { text: 'Tables are numbered, captioned, have units in the headers and correctly recorded precision', points: 5 },
  { text: 'Every calculation step has a worked example with units; results carry correct significant figures', points: 5 },
  { text: 'Discussion compares the result with the accepted value and with its own uncertainty', points: 4 },
  { text: 'At least two specific error sources, each with the direction it would push the result', points: 4 },
  { text: 'Conclusion answers the question with number, uncertainty and units; references are complete', points: 2 },
];

export const TEMPLATES: Record<string, ReportTemplate> = {
  practice: {
    title: 'Practice report: calibrating a 10 mL volumetric pipet',
    prompts: {
      introduction: 'Why glassware is calibrated, what "to deliver" (TD) means, and how weighing water and dividing by its density gives the volume actually delivered.',
      discussion: 'Is your pipet within its class A tolerance (±0.02 mL)? Is the scatter between trials larger or smaller than the tolerance? What does air buoyancy do to the result, and by how much?',
    },
    table: `| Trial | Mass of beaker + water (g) | Mass of water delivered (g) | Temperature (°C) | Density of water (g/mL) | Volume delivered (mL) |
|---|---|---|---|---|---|
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |
| 3 |  |  |  |  |  |

Table 1. Calibration of a 10 mL volumetric pipet by weighing delivered water.`,
    rubric: [
      { text: 'Volumes computed from mass and the density of water at the measured temperature', points: 9 },
      { text: 'Mean, standard deviation and comparison with the ±0.02 mL tolerance', points: 9 },
    ],
  },
  density: {
    title: 'Laboratory equipment, the balance and the density of an unknown solution',
    prompts: {
      introduction: 'Density as an intensive property; accuracy against precision; why a volumetric pipet, a burette, a graduated cylinder and a beaker differ in both.',
      results: 'Table 1: water delivered by each piece of glassware (at least three trials each). Table 2: mass and volume of the unknown solution (at least three trials). Figure 1 (optional): volumes by glassware with error bars.',
      discussion: 'Rank the glassware by precision (standard deviation) and by accuracy (mean minus nominal). Which piece did you use for the density, and why? Which single measurement limits the density\'s uncertainty?',
    },
    table: `| Glassware | Trial | Mass delivered (g) | Volume (mL) |
|---|---|---|---|
| Volumetric pipet | 1 |  |  |
| Volumetric pipet | 2 |  |  |
| Volumetric pipet | 3 |  |  |
| Graduated cylinder | 1 |  |  |
| Beaker | 1 |  |  |

Table 1. Volumes delivered, from the mass of water and its density at ___ °C.

| Trial | Mass of unknown (g) | Volume (mL) | Density (g/mL) |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |

Table 2. Density of the unknown solution.`,
    rubric: [
      { text: 'Precision and accuracy of each piece of glassware stated with numbers (SD, mean − nominal)', points: 9 },
      { text: 'Density reported as mean ± uncertainty with justified significant figures', points: 9 },
    ],
  },
  'beers-law': {
    title: "Beer's law and the concentration of a food dye",
    prompts: {
      introduction: "Absorbance and transmittance, Beer's law A = εbc, why the wavelength of maximum absorbance is used, and how the standards were made by serial dilution.",
      results: 'Table 1: standard concentrations (with the dilution that made each) and absorbances. Figure 1: calibration plot of A against c with the least-squares line, its equation and R². Table 2: absorbance of the unknown and its concentration.',
      discussion: 'Does the calibration pass through the origin within its uncertainty? Is it linear over the whole range? What does the slope give you, and how does it compare with the literature molar absorptivity? Effect of skipping the blank, fingerprints, or an unrinsed cuvette.',
    },
    table: `| Solution | Volume of stock (mL) | Total volume (mL) | c (µM) | A at ___ nm |
|---|---|---|---|---|
| Blank | 0 |  | 0 | 0.000 |
| S1 |  |  |  |  |
| S2 |  |  |  |  |
| S3 |  |  |  |  |
| S4 |  |  |  |  |
| S5 |  |  |  |  |
| Unknown | – | – | ? |  |

Table 1. Calibration standards and the unknown.`,
    rubric: [
      { text: 'Calibration plot with labelled axes and units, fitted line, equation, R² and residuals considered', points: 9 },
      { text: 'Unknown concentration from the fit with an uncertainty, and ε compared with the literature', points: 9 },
    ],
  },
  titration: {
    title: 'Standardising NaOH with KHP and the molar mass of an unknown acid',
    prompts: {
      introduction: 'Acid-base titration, the equivalence point and the end point, why KHP is a primary standard, the balanced equations, and how the molar mass of a monoprotic acid follows from moles of NaOH.',
      results: 'Table 1: KHP mass, initial and final burette readings, volume of NaOH, molarity, for each trial. Table 2: the same for the unknown acid, with its molar mass. Figure 1 (if you used the pH meter): the titration curve with the equivalence point marked.',
      discussion: 'Precision of the trials (relative standard deviation), the effect of over-shooting the end point, of an air bubble in the burette tip, and of using bromothymol blue instead of phenolphthalein for a weak acid. Which way does each push the molarity and the molar mass?',
    },
    table: `| Trial | Mass of KHP (g) | Initial burette (mL) | Final burette (mL) | V(NaOH) (mL) | c(NaOH) (mol/L) |
|---|---|---|---|---|---|
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |
| 3 |  |  |  |  |  |

Table 1. Standardisation of NaOH with KHP (204.22 g/mol).

| Trial | Mass of unknown (g) | Initial (mL) | Final (mL) | V(NaOH) (mL) | Molar mass (g/mol) |
|---|---|---|---|---|---|
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |
| 3 |  |  |  |  |  |

Table 2. Titration of the unknown acid.`,
    rubric: [
      { text: 'Burette readings recorded to 0.01 mL; volumes by difference; at least three concordant trials', points: 9 },
      { text: 'Molarity and molar mass reported as mean ± uncertainty, with the error chain from NaOH to molar mass discussed', points: 9 },
    ],
  },
  'empirical-formula': {
    title: 'The empirical formula of magnesium oxide',
    prompts: {
      introduction: 'The law of definite proportions, what an empirical formula is, the reaction of magnesium with oxygen (and the side reaction with nitrogen), and the idea of heating to constant mass.',
      results: 'Table 1: every weighing in order (crucible and lid, with Mg, after each heating cycle) so a reader can see constant mass was reached. Table 2: masses of Mg and O, moles, and the mole ratio for each trial.',
      discussion: 'Compare the O : Mg ratio with 1. For each of these, say whether it raises or lowers the ratio, and why: unreacted Mg, Mg3N2 not converted, MgO lost as smoke, weighing hot, water not driven off.',
    },
    table: `| Step | Mass (g) |
|---|---|
| Crucible + lid, after first heating |  |
| Crucible + lid, constant mass |  |
| Crucible + lid + Mg |  |
| After heating 1 |  |
| After heating 2 |  |
| After water and reheating |  |
| Final (constant mass) |  |

Table 1. Weighings, in order.

| Trial | Mass Mg (g) | Mass O (g) | mol Mg | mol O | O : Mg |
|---|---|---|---|---|---|
| 1 |  |  |  |  |  |

Table 2. Composition of the product.`,
    rubric: [
      { text: 'Weighing record shows constant mass (two weighings within 0.002 g) at each stage', points: 9 },
      { text: 'Mole ratio with an uncertainty, and every error source tied to the direction it moves the ratio', points: 9 },
    ],
  },
  'gas-constant': {
    title: 'The gas constant (or the molar mass of a metal) from hydrogen collected over water',
    prompts: {
      introduction: "The reaction of the metal with HCl, Dalton's law of partial pressures, why the gas is wet, and how the ideal gas law gives R (or moles of H2 and so the molar mass).",
      results: 'Table 1: mass of metal, initial and final gas volumes, water temperature, barometric pressure, water-column height, vapour pressure of water (with its source), partial pressure of H2, moles of H2, and R (or molar mass) for each trial.',
      discussion: 'Percent error against R = 0.08206 L·atm/(mol·K) (or the identity of the metal). Effects of the oxide coating, of reading before the gas cooled, of ignoring the water column, and of forgetting the vapour pressure: which way, and roughly how much?',
    },
    table: `| Trial | Mass of metal (g) | V initial (mL) | V final (mL) | T (°C) | P(bar) (mmHg) | h (mm H2O) | P(H2O) (mmHg) | P(H2) (mmHg) | n(H2) (mol) | R or M |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |  |  |  |  |

Table 1. Hydrogen collected over water.`,
    rubric: [
      { text: 'Pressure corrections shown step by step (water column, vapour pressure with source)', points: 9 },
      { text: 'Result with uncertainty; size of each correction compared with the final error', points: 9 },
    ],
  },
  calorimetry: {
    title: 'Calorimetry: the calorimeter constant, an enthalpy of solution and the enthalpy of fusion of ice',
    prompts: {
      introduction: 'Heat, heat capacity and specific heat, q = mcΔT, the calorimeter constant, the sign convention for ΔH, and why the temperature change is found by extrapolating to the mixing time.',
      results: 'Figure 1 for each run: temperature against time with the pre-mixing and post-mixing lines and the extrapolated ΔT marked. Table 1: masses, temperatures, ΔT, q and ΔH for each run.',
      discussion: 'Compare with the literature values (cite them). Effects of heat exchange with the room, of reading the maximum instead of extrapolating, of wet ice, of assuming the solution\'s specific heat equals water\'s. Which way does each move ΔH?',
    },
    table: `| Run | Masses (g) | T before (°C) | T extrapolated at mixing (°C) | ΔT (°C) | q(solution) (J) | q(calorimeter) (J) | n (mol) | ΔH (kJ/mol) |
|---|---|---|---|---|---|---|---|---|
| Calorimeter constant |  |  |  |  |  |  | – | C = ___ J/°C |
| Solution: ___ |  |  |  |  |  |  |  |  |
| Fusion of ice |  |  |  |  |  |  |  |  |

Table 1. Calorimetry results.`,
    rubric: [
      { text: 'Temperature-time graphs with both fitted lines and the extrapolated ΔT at the mixing time', points: 9 },
      { text: 'Signs of q and ΔH handled correctly; results compared with cited literature values', points: 9 },
    ],
  },
  'hess-law': {
    title: "The enthalpy of formation of magnesium oxide by Hess's law",
    prompts: {
      introduction: "Hess's law, the three reactions (Mg + 2HCl, MgO + 2HCl, and the formation of water) and how they add to give Mg(s) + ½O2(g) → MgO(s).",
      results: 'Figure 1 and 2: temperature against time for each reaction with extrapolation. Table 1: mass, moles, ΔT, q and ΔH for each trial of each reaction. Then the Hess cycle with the numbers.',
      discussion: 'Compare ΔfH(MgO) with −601.6 kJ/mol. Propagate the uncertainties of the two measured ΔH values into the result. Which reaction contributes the most uncertainty, and why?',
    },
    table: `| Reaction | Trial | Mass (g) | n (mol) | ΔT (°C) | q (J) | ΔH (kJ/mol) |
|---|---|---|---|---|---|---|
| Mg + 2HCl | 1 |  |  |  |  |  |
| Mg + 2HCl | 2 |  |  |  |  |  |
| MgO + 2HCl | 1 |  |  |  |  |  |
| MgO + 2HCl | 2 |  |  |  |  |  |

Table 1. Enthalpies of reaction measured in the calorimeter.`,
    rubric: [
      { text: 'Hess cycle written out with each equation, its ΔH and how it is combined (reversed, scaled)', points: 9 },
      { text: 'ΔfH(MgO) with propagated uncertainty and percent error', points: 9 },
    ],
  },
  'le-chatelier': {
    title: "Le Chatelier's principle",
    prompts: {
      introduction: "Dynamic equilibrium, the equilibrium constant and the reaction quotient, Le Chatelier's principle, and the two systems studied with their colours.",
      methods: 'Which stresses you applied to which tube, in what amounts, and how you compared colours (against a control, on a white background).',
      results: 'Table 1: for each tube, the stress, the observation (colour and precipitate, compared with the control), the direction of the shift, and the species whose concentration changed.',
      discussion: 'Explain each observation with Q and K: which stress changes Q (and in which direction), and which changes K itself? For the temperature tubes, what does the colour change say about the sign of ΔH? Why does adding water to the iron system shift it?',
    },
    table: `| Tube | Stress applied | Observation (vs control) | Shift (left/right) | Explanation (Q vs K) |
|---|---|---|---|---|
| 1 | none (control) |  | – | – |
| 2 |  |  |  |  |
| 3 |  |  |  |  |
| 4 |  |  |  |  |
| 5 |  |  |  |  |

Table 1. Stresses and observations.`,
    rubric: [
      { text: 'Every observation recorded against the control, precipitates noted', points: 9 },
      { text: 'Each shift explained with Q and K; temperature effect tied to the sign of ΔH', points: 9 },
    ],
  },
  capstone: {
    title: 'Capstone: a full formal report',
    prompts: {
      introduction: 'Your question, why it is worth answering, the chemistry behind your method, and (for a designed experiment) your hypothesis and the variables you changed and held fixed.',
      methods: 'The full procedure, including how many trials, how the simulator or instruments were used, and every choice you made in the design.',
      discussion: 'All of the general prompts, plus: does the design actually answer the question? What would you change if you ran it again with a real bench?',
    },
    table: `| Trial | Measured quantity 1 (unit) | Measured quantity 2 (unit) | Result (unit) |
|---|---|---|---|
| 1 |  |  |  |
| 2 |  |  |  |
| 3 |  |  |  |

Table 1. Raw data (adapt the columns to your experiment).`,
    rubric: [
      { text: 'A clear question and a design (trials, controls, ranges) able to answer it', points: 9 },
      { text: 'Uncertainty budget: each input with its uncertainty and its share of the final uncertainty', points: 9 },
    ],
  },
};
