/**
 * University course codes. When course-code mode is on (Settings), a subject that is basically
 * one of the chosen university's courses is labelled by its code, e.g. "MATH 241 (Calculus III)",
 * and listed before subjects with no counterpart.
 *
 * To add a university: add its id to UniversityId and an entry to `universities`. A subject
 * maps to a code only when it covers essentially the same course; leave it out otherwise. A
 * combined code ("MATH 482/484") means the subject covers both courses.
 */

export type UniversityId = 'uiuc';

export interface University {
  id: UniversityId;
  /** Full name for settings and descriptions. */
  name: string;
  /** Short name for labels, e.g. "UIUC". */
  short: string;
  /** Subject id -> course code, e.g. "CS 225". */
  codes: Record<string, string>;
}

const uiuc: University = {
  id: 'uiuc',
  name: 'University of Illinois Urbana-Champaign',
  short: 'UIUC',
  codes: {
    // Computer Science
    'programming-fundamentals': 'CS 124',
    'discrete-mathematics': 'CS 173',
    'data-structures-algorithms': 'CS 225',
    'computer-architecture': 'CS 233',
    'algorithms-for-data-science': 'CS 277',
    'modeling-and-learning': 'CS 307',
    'systems-programming': 'CS 341',
    'text-information-systems': 'CS 410',
    databases: 'CS 411',
    'data-mining': 'CS 412',
    'operating-systems': 'CS 423',
    'distributed-systems': 'CS 425',
    compilers: 'CS 426',
    'software-engineering': 'CS 427',
    'embedded-systems-iot': 'CS 431',
    'computer-networks': 'CS 438',
    'machine-learning': 'CS 446',
    cybersecurity: 'CS 461',
    'theory-of-computation': 'CS 475',
    // Data science and statistics
    'data-science-discovery': 'STAT 107',
    'data-science-exploration': 'STAT 207',
    'statistics-and-probability-2': 'STAT 410',
    'data-ethics-and-policy': 'IS 467',
    'data-management-reproducibility': 'IS 477',
    // Mathematics
    'calculus-1': 'MATH 220/221',
    'calculus-for-data-science': 'MATH 220',
    'linear-algebra-for-data-science': 'MATH 227',
    'calculus-2': 'MATH 231',
    'calculus-3': 'MATH 241',
    'linear-algebra-computational': 'MATH 257',
    'differential-equations': 'MATH 285',
    'higher-mathematics': 'MATH 314',
    'graph-theory': 'MATH 412',
    combinatorics: 'MATH 413',
    'applied-linear-algebra': 'MATH 415',
    'abstract-linear-algebra': 'MATH 416',
    'abstract-algebra': 'MATH 417',
    'differential-geometry': 'MATH 423',
    'ode-theory': 'MATH 441',
    'partial-differential-equations': 'MATH 442',
    'real-analysis': 'MATH 444',
    'complex-variables': 'MATH 446',
    'number-theory': 'MATH 453',
    'probability-theory': 'MATH 461',
    optimization: 'MATH 482/484',
    // Economics
    'microeconomic-principles': 'ECON 102',
    'macroeconomic-principles': 'ECON 103',
    // Physics
    'physics-mechanics': 'PHYS 211',
    'physics-electricity-magnetism': 'PHYS 212',
    'physics-thermal': 'PHYS 213',
    'physics-quantum': 'PHYS 214',
    'classical-mechanics': 'PHYS 325/326',
    'thermodynamics-statistical-mechanics': 'PHYS 427',
    electromagnetism: 'PHYS 435/436',
    'quantum-mechanics': 'PHYS 486/487',
    // Chemistry
    'general-chemistry-1': 'CHEM 102',
    'general-chemistry-lab-1': 'CHEM 103',
    // Astronomy
    'intro-astronomy': 'ASTR 100',
    'stellar-astrophysics': 'ASTR 404',
    'galaxies-cosmology': 'ASTR 406',
  },
};

export const universities: University[] = [uiuc];

export const universityById: Record<UniversityId, University> = Object.fromEntries(
  universities.map((u) => [u.id, u]),
) as Record<UniversityId, University>;

/** Orders codes by department, then course number: "CS 225" < "CS 341" < "MATH 220". */
export function compareCodes(a: string, b: string): number {
  const parse = (c: string) => {
    const m = /^([A-Z]+)\s*(\d+)/.exec(c);
    return m ? { dept: m[1], num: Number(m[2]) } : { dept: c, num: 0 };
  };
  const x = parse(a);
  const y = parse(b);
  return x.dept.localeCompare(y.dept) || x.num - y.num || a.localeCompare(b);
}
