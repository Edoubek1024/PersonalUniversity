import type { LearningPath } from './types';

/**
 * Suggested learning orders. Subjects can appear in several paths; progress is
 * always tracked per subject, never per path.
 */
export const learningPaths: LearningPath[] = [
  {
    id: 'software-engineering-foundations',
    title: 'Software Engineering Foundations',
    description:
      'The core of a computer science degree aimed at building and shipping reliable software: programming, discrete math, algorithms, engineering practice, data and networks.',
    subjectIds: [
      'programming-fundamentals',
      'discrete-mathematics',
      'data-structures-algorithms',
      'software-engineering',
      'typescript-web',
      'databases',
      'computer-networks',
      'go-programming',
      'distributed-systems',
    ],
    outcome:
      'You can design, implement, test and deploy a non-trivial multi-component application and reason about its correctness and performance.',
  },
  {
    id: 'low-level-systems',
    title: 'Low-Level Systems Engineering',
    description:
      'Go from logic gates to a working computer, then up through C, operating systems, and compilers. The path for people who want to know what the machine is really doing.',
    subjectIds: [
      'programming-fundamentals',
      'discrete-mathematics',
      'computer-architecture',
      'systems-programming',
      'cpp-programming',
      'rust-programming',
      'operating-systems',
      'theory-of-computation',
      'compilers',
      'distributed-systems',
    ],
    outcome:
      'You have built a CPU, an assembler, a kernel component, a compiler and can debug code at the level of registers, caches and page tables.',
  },
  {
    id: 'networking-cybersecurity',
    title: 'Networking and Cybersecurity',
    description:
      'Understand protocols and systems well enough to attack and defend them: the network stack, OS internals, memory safety, cryptography and secure design.',
    subjectIds: [
      'programming-fundamentals',
      'bash-scripting',
      'discrete-mathematics',
      'systems-programming',
      'operating-systems',
      'computer-networks',
      'cybersecurity',
      'go-programming',
      'distributed-systems',
    ],
    outcome:
      'You can build a networked service, analyse its traffic, find and fix memory-safety and web vulnerabilities, and apply cryptography correctly.',
  },
  {
    id: 'machine-learning-data-science',
    title: 'Machine Learning and Data Science',
    description:
      'The mathematics, statistics and programming that make modern machine learning work, followed by classical ML and deep learning with real datasets.',
    subjectIds: [
      'programming-fundamentals',
      'math-methods',
      'probability-statistics',
      'data-structures-algorithms',
      'databases',
      'machine-learning',
      'data-mining',
      'text-information-systems',
      'deep-learning',
    ],
    outcome:
      'You can take a raw dataset to a validated, deployed model and explain the maths behind every step.',
  },
  {
    id: 'data-science-degree',
    title: 'Data Science Degree Core',
    description:
      'The eight core courses of the University of Illinois data science bachelor\'s, in a workable order. Calculus and linear algebra run alongside the first two statistics courses.',
    subjectIds: [
      'data-science-discovery',
      'calculus-for-data-science',
      'linear-algebra-for-data-science',
      'data-science-exploration',
      'algorithms-for-data-science',
      'modeling-and-learning',
      'data-management-reproducibility',
      'data-ethics-and-policy',
    ],
    outcome:
      'You can run a data science project from question to report: collect and clean data, model it, explain the results, reproduce the work and answer for its ethics.',
  },
  {
    id: 'mathematics-minor',
    title: 'Mathematics Minor Route',
    description:
      'The calculus sequence, then five electives that count toward the University of Illinois mathematics minor, chosen so that each one prepares you for the next.',
    subjectIds: [
      'calculus-1',
      'calculus-2',
      'calculus-3',
      'linear-algebra-computational',
      'differential-equations',
      'higher-mathematics',
      'abstract-algebra',
      'real-analysis',
    ],
    outcome:
      'You can compute fluently in several variables, solve differential equations, write rigorous proofs, and work in both algebra and analysis.',
  },
  {
    id: 'university-physics',
    title: 'University Physics Sequence',
    description:
      'The four-course calculus-based introduction to physics, alongside the calculus it depends on. This is the on-ramp to the upper-level physics subjects.',
    subjectIds: [
      'calculus-1',
      'calculus-2',
      'physics-mechanics',
      'calculus-3',
      'physics-electricity-magnetism',
      'physics-thermal',
      'physics-quantum',
    ],
    outcome:
      'You can model mechanical, electrical, thermal and quantum systems with calculus, and you are ready for upper-level physics.',
  },
  {
    id: 'embedded-iot',
    title: 'Embedded Systems and IoT',
    description:
      'Microcontrollers, real-time constraints, sensors, and the networking that connects devices to the world.',
    subjectIds: [
      'programming-fundamentals',
      'computer-architecture',
      'systems-programming',
      'cpp-programming',
      'embedded-systems-iot',
      'computer-networks',
      'operating-systems',
      'cybersecurity',
    ],
    outcome:
      'You can design firmware for a microcontroller, interface sensors and radios, and ship a secure connected device.',
  },
  {
    id: 'theoretical-computational-physics',
    title: 'Theoretical and Computational Physics',
    description:
      'The undergraduate physics core with the maths to support it, and the numerical skills to simulate what you derive.',
    subjectIds: [
      'math-methods',
      'programming-fundamentals',
      'classical-mechanics',
      'waves-optics',
      'electromagnetism',
      'probability-statistics',
      'thermodynamics-statistical-mechanics',
      'quantum-mechanics',
      'computational-physics',
      'relativity',
    ],
    outcome:
      'You can derive the standard results of classical, statistical, quantum and relativistic physics, solve problems at the level of a strong physics graduate, and write simulations that reproduce them.',
  },
  {
    id: 'astronomy-astrophysics',
    title: 'Astronomy and Astrophysics',
    description:
      'From naked-eye astronomy to cosmology, with the physics underneath and hands-on work with real telescope and survey data.',
    subjectIds: [
      'intro-astronomy',
      'math-methods',
      'programming-fundamentals',
      'classical-mechanics',
      'probability-statistics',
      'observational-astronomy',
      'planetary-science-exoplanets',
      'electromagnetism',
      'thermodynamics-statistical-mechanics',
      'quantum-mechanics',
      'stellar-astrophysics',
      'relativity',
      'galaxies-cosmology',
      'high-energy-astrophysics',
    ],
    outcome:
      'You can explain the physics of stars, planets, galaxies and the universe, analyse real observational data, and read current astrophysics papers critically.',
  },
];
