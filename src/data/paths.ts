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
      'databases',
      'computer-networks',
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
      'discrete-mathematics',
      'systems-programming',
      'operating-systems',
      'computer-networks',
      'cybersecurity',
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
      'deep-learning',
    ],
    outcome:
      'You can take a raw dataset to a validated, deployed model and explain the maths behind every step.',
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
