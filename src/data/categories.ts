import type { Category, CategoryId } from './types';

export const categories: Category[] = [
  {
    id: 'cs',
    title: 'Computer Science',
    description:
      'From first programs to compilers, operating systems and machine learning. Build working systems, test them, and understand why they perform the way they do.',
    accent: 'indigo',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description:
      'From your first DataFrame to validated models: the statistics, computing and mathematics of a data science degree, plus the ethics and stewardship of data.',
    accent: 'teal',
  },
  {
    id: 'physics',
    title: 'Physics',
    description:
      'Mechanics, fields, heat, quanta and spacetime. Derive results, solve problems and simulate what you derive.',
    accent: 'sky',
  },
  {
    id: 'astronomy',
    title: 'Astronomy',
    description:
      'Stars, planets, galaxies and the universe as a whole, grounded in physics, observational evidence and real survey data.',
    accent: 'violet',
  },
  {
    id: 'misc',
    title: 'Miscellaneous',
    description: 'Useful subjects outside the main tracks, starting with how to found, fund and run a company.',
    accent: 'amber',
  },
];

export const categoryById: Record<CategoryId, Category> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
) as Record<CategoryId, Category>;
