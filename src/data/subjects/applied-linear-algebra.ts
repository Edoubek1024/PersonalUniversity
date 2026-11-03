import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const U1 = 'ax-b-and-the-four-subspaces';
const U2 = 'least-squares-determinants-and-eigenvalues';
const U3 = 'positive-definite-matrices-and-applications';

const mit1806 = (unit: string, session: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `MIT 18.06SC Linear Algebra: ${title}`,
  url: `https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/${unit}/${session}/`,
  type: 'lecture',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
  primary,
});

const ila = (page: string, title: string, note: string): ResourceInput => ({
  title: `Interactive Linear Algebra: ${title}`,
  url: `https://textbooks.math.gatech.edu/ila/${page}.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'Margalit and Rabinoff, Georgia Tech',
  note,
});

const threeBlue = (lesson: string, title: string, note: string): ResourceInput => ({
  title: `3Blue1Brown: ${title}`,
  url: `https://www.3blue1brown.com/lessons/${lesson}`,
  type: 'video',
  cost: 'free',
  provider: '3Blue1Brown',
  note,
});

const mit18085 = (note: string, primary = false): ResourceInput => ({
  title: 'MIT 18.085 Computational Science and Engineering I',
  url: 'https://ocw.mit.edu/courses/18-085-computational-science-and-engineering-i-fall-2008/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
  primary,
});

const hefferon = (note: string): ResourceInput => ({
  title: 'Hefferon, Linear Algebra',
  url: 'https://hefferon.net/linearalgebra/',
  type: 'textbook',
  cost: 'free',
  provider: 'Jim Hefferon',
  note,
});

const lebl = (page: string, title: string, note: string): ResourceInput => ({
  title: `Notes on Diffy Qs: ${title}`,
  url: `https://www.jirka.org/diffyqs/html/${page}.html`,
  type: 'textbook',
  cost: 'free',
  provider: 'Jiří Lebl',
  note,
});

const olver = (note: string): ResourceInput => ({
  title: 'Olver and Shakiban, Applied Linear Algebra (2nd edition)',
  url: 'https://www-users.cse.umn.edu/~olver/ala.html',
  type: 'textbook',
  cost: 'paid',
  provider: 'Springer',
  note,
});

export default defineSubject({
  id: 'applied-linear-algebra',
  title: 'Applied Linear Algebra',
  category: 'math',
  tagline:
    'Linear algebra the engineering way: elimination, subspaces, orthogonality and eigenvalues, worked by hand on springs, circuits, trusses and vibrating systems.',
  description: `This course follows the topics of MATH 415 (Applied Linear Algebra) at the University of Illinois Urbana-Champaign, whose public catalog description lists matrix operations, determinants, linear equations, vector spaces, linear transformations, eigenvalues and eigenvectors, inner products and norms, orthogonality, equilibrium and linear dynamical systems, with applications to engineering. The lessons, examples and exercises here are original. This course is not affiliated with, endorsed by, or a substitute for the Illinois course.

It is the engineering route through linear algebra. You will do nearly every computation by hand on matrices small enough to see, and then confirm the answer with a few lines of NumPy. The applications are physical from the start: loop currents in a circuit, the incidence matrix of a network, the stiffness matrix of a chain of masses and springs, the forces in a pin-jointed truss, the normal modes of a vibrating structure and the long-run state of a Markov process. One pattern ties the middle of the course together. Equilibrium problems in mechanics and circuits all take the form $A^T C A\\,u = f$, and recognising that form tells you the matrix is symmetric, when it is positive definite, and what its null space means physically.

The order is: linear systems and their cost, vector spaces and the four fundamental subspaces, linear maps and determinants, inner products and least squares, equilibrium, eigenvalues and the spectral theorem, and finally linear dynamical systems, both discrete and continuous. A course on computational linear algebra covers similar ground with more programming; this one keeps the arithmetic in your hands so that you learn what each step means.

The main free resources are MIT 18.06SC (Strang), MIT 18.085 for the equilibrium and vibration material, Margalit and Rabinoff's *Interactive Linear Algebra*, Hefferon's *Linear Algebra*, 3Blue1Brown's *Essence of Linear Algebra* and Lebl's *Notes on Diffy Qs* for systems of ODEs. Olver and Shakiban's *Applied Linear Algebra* is a paid companion that matches this course's spirit closely, and nothing here requires it.`,
  difficulty: 'intermediate',
  estimatedHours: 70,
  prerequisites: ['calculus-3'],
  recommendedBackground: [
    'Comfort with multivariable calculus: partial derivatives, gradients and quadratic functions of several variables',
    'A first exposure to differential equations helps in the last module but is not assumed',
    'Enough Python to multiply matrices and call numpy.linalg for checking hand computations',
    'Introductory physics: Hooke\'s law, Ohm\'s law, Newton\'s second law',
  ],
  tags: ['linear algebra', 'matrices', 'engineering', 'equilibrium', 'eigenvalues', 'dynamical systems', 'vibrations'],
  core: false,
  modules: [
    {
      slug: 'matrices-and-linear-systems',
      title: 'Matrices and Linear Systems',
      description:
        'Solve linear systems by Gaussian elimination, learn the algebra of matrices and inverses, record elimination as an LU factorisation, and count what it costs and when row exchanges are needed.',
      lessons: [
        {
          slug: 'gaussian-elimination',
          title: 'Gaussian elimination and back substitution',
          summary:
            'Reduce a linear system to triangular form with row operations, read off pivots, and decide whether the system has no solution, one, or infinitely many.',
          estimatedMinutes: 120,
          objectives: [
            'Write a linear system as an augmented matrix and apply the three elementary row operations',
            'Reduce a system to upper triangular (echelon) form and solve it by back substitution',
            'Identify pivots and free variables and use them to describe the solution set',
            'Recognise an inconsistent system from its echelon form',
            'Explain why a linear system has zero, one or infinitely many solutions and never exactly two',
          ],
          concepts: [
            'Augmented matrix',
            'Elementary row operations',
            'Pivot and multiplier',
            'Row echelon form',
            'Back substitution',
            'Free and basic variables',
            'Consistent and inconsistent systems',
          ],
          explanation: `A linear system $Ax = b$ is solved by replacing it with a simpler system that has the same solutions. Three **row operations** do this without changing the solution set: add a multiple of one equation to another, swap two equations, and multiply an equation by a nonzero number. Gaussian elimination uses the first operation to clear the entries below each **pivot**, the first nonzero entry in a row, column by column, until the matrix is upper triangular. Then **back substitution** solves the last equation and works upward.

**Worked example.** Solve
$$x + 2y + z = 1,\\quad 2x + 5y + 3z = 3,\\quad -x + y + 4z = 6.$$
Write the augmented matrix and eliminate in column 1 with multipliers $\\ell_{21} = 2$ and $\\ell_{31} = -1$:
$$\\left[\\begin{array}{ccc|c} 1 & 2 & 1 & 1\\\\ 2 & 5 & 3 & 3\\\\ -1 & 1 & 4 & 6 \\end{array}\\right] \\to \\left[\\begin{array}{ccc|c} 1 & 2 & 1 & 1\\\\ 0 & 1 & 1 & 1\\\\ 0 & 3 & 5 & 7 \\end{array}\\right].$$
Row 2 became $R_2 - 2R_1$ and row 3 became $R_3 + R_1$. Now clear column 2 with $\\ell_{32} = 3$: row 3 becomes $R_3 - 3R_2 = [0\\ 0\\ 2 \\mid 4]$. The pivots are $1, 1, 2$. Back substitution gives $z = 4/2 = 2$, then $y = 1 - z = -1$, then $x = 1 - 2y - z = 1 + 2 - 2 = 1$. Check in the original equations: $1 - 2 + 2 = 1$, $2 - 5 + 6 = 3$, $-1 - 1 + 8 = 6$.

**When elimination stalls.** If a zero appears in a pivot position, swap with a lower row that has a nonzero entry there. If no such row exists, that column has no pivot and its variable is **free**. The system is then either inconsistent or has infinitely many solutions. A row reading $[0\\ 0\\ \\cdots\\ 0 \\mid c]$ with $c \\ne 0$ says $0 = c$, so there is no solution. Otherwise you choose the free variables arbitrarily and solve for the pivot variables, which gives infinitely many solutions.

Solution sets have a rigid shape. If $x$ and $y$ both solve $Ax = b$, then so does $x + t(y - x)$ for every real $t$, because $A(y - x) = 0$. So two different solutions force infinitely many. A square system has exactly one solution precisely when elimination, with row exchanges allowed, produces $n$ nonzero pivots.

Two habits will save you. Always record the multiplier $\\ell_{ij}$, the number you multiplied row $j$ by before subtracting it from row $i$. The next lesson but one turns those multipliers into the matrix $L$. And always substitute your answer back into the original equations, not the reduced ones, because arithmetic slips happen during elimination.`,
          resources: [
            mit1806(U1, 'elimination-with-matrices', 'Elimination with matrices', 'Strang\'s lecture on elimination, pivots and how elimination fails; work the session problems afterwards.', true),
            ila('row-reduction', 'Row Reduction', 'Echelon and reduced echelon forms with interactive row-reduction demos.'),
            ila('parametric-form', 'Parametric Form', 'Writing the solution set in terms of free variables.'),
            hefferon('Chapter One covers Gauss\'s method with many exercises and full answers in the companion answer file.'),
          ],
          exercises: [
            {
              slug: 'three-by-three',
              title: 'Eliminate a 3 by 3 system',
              prompt:
                'Solve $x_1 + x_2 + x_3 = 6$, $2x_1 + 3x_2 + x_3 = 11$, $x_1 - x_2 + 2x_3 = 5$ by elimination and back substitution. List the multipliers and the three pivots, and check the solution in the original equations.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The multipliers are $\\ell_{21} = 2$, $\\ell_{31} = 1$ and $\\ell_{32} = -2$. The pivots are $1, 1, -1$ and the solution is $(1, 2, 3)$.',
            },
            {
              slug: 'mesh-currents',
              title: 'Loop currents in a three-mesh circuit',
              prompt:
                'Mesh analysis of a resistor circuit gives, with currents in amperes, $6I_1 - 2I_2 = 10$, $-2I_1 + 9I_2 - 3I_3 = 2$ and $-3I_2 + 7I_3 = 4$. Solve by elimination. Explain why the matrix is symmetric: what does the $-2$ in positions $(1,2)$ and $(2,1)$ represent physically?',
              kind: 'problem',
              difficulty: 1,
              hint: 'You should get $(I_1, I_2, I_3) = (2, 1, 1)$ A. Off-diagonal entries are minus the resistance shared by two meshes.',
            },
            {
              slug: 'parameter-cases',
              title: 'Zero, one or infinitely many',
              prompt:
                'For which values of $h$ and $k$ does the system $x + 2y = 3$, $3x + hy = k$ have (a) exactly one solution, (b) no solution, (c) infinitely many solutions? In case (c), write the solution set in parametric form.',
              kind: 'problem',
              difficulty: 2,
              hint: 'After elimination the second equation is $(h - 6)y = k - 9$.',
            },
            {
              slug: 'never-two-solutions',
              title: 'Prove that two solutions give infinitely many',
              prompt:
                'Let $A$ be an $m \\times n$ matrix. Prove that if $Ax = b$ has two different solutions $x \\ne y$, then the vectors $x + t(y - x)$ are distinct solutions for all real $t$. Conclude that the number of solutions is $0$, $1$ or infinite. Then show that the set of all solutions is $\\{x_p + z : Az = 0\\}$ for any one particular solution $x_p$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Which row operations leave the solution set of a linear system unchanged, and why?',
              answerOutline:
                'Adding a multiple of one row to another, swapping rows, scaling a row by a nonzero constant. Each is reversible by an operation of the same kind, so no solution is gained or lost.',
            },
            {
              question: 'How does the echelon form show that a system is inconsistent?',
              answerOutline:
                'A row of the form $[0 \\cdots 0 \\mid c]$ with $c \\ne 0$, which is the equation $0 = c$.',
            },
            {
              question: 'What does a missing pivot in column $j$ of a square matrix mean for $Ax = b$?',
              answerOutline:
                'Variable $x_j$ is free. The matrix is singular, so $Ax = b$ has either no solution or infinitely many, depending on $b$.',
            },
            {
              question: 'Why should you check a solution in the original equations rather than the reduced ones?',
              answerOutline:
                'An arithmetic slip during elimination changes the reduced system; a solution of the wrong reduced system still satisfies it, so only the original equations catch the error.',
            },
          ],
        },
        {
          slug: 'matrix-algebra-and-inverses',
          title: 'Matrix algebra and inverses',
          summary:
            'Matrix-vector and matrix-matrix products, transposes, and the inverse matrix computed by Gauss-Jordan elimination, with the inverse of a spring stiffness matrix as the running example.',
          estimatedMinutes: 120,
          objectives: [
            'Compute $Ax$ as a combination of the columns of $A$ and $AB$ column by column',
            'Use the rules $(AB)^T = B^T A^T$ and $(AB)^{-1} = B^{-1}A^{-1}$ and explain the order reversal',
            'Compute an inverse by Gauss-Jordan elimination on $[A \\mid I]$',
            'State conditions equivalent to invertibility of a square matrix',
            'Interpret the columns of an inverse physically as responses to unit loads',
          ],
          concepts: [
            'Column picture of $Ax$',
            'Matrix product and non-commutativity',
            'Transpose and symmetric matrices',
            'Identity and inverse matrices',
            'Gauss-Jordan elimination',
            'Invertible (nonsingular) matrix',
            'Flexibility (influence) matrix',
          ],
          explanation: `The product $Ax$ has two readings. By rows, entry $i$ is the dot product of row $i$ of $A$ with $x$. By columns, $Ax = x_1 a_1 + \\cdots + x_n a_n$ is a combination of the columns $a_j$ of $A$. The column reading is the one that explains when $Ax = b$ is solvable: $b$ must be a combination of the columns. The product $AB$ is $A$ applied to each column of $B$ in turn. It is defined when the inner sizes agree, and in general $AB \\ne BA$.

The **transpose** swaps rows and columns, and $(AB)^T = B^T A^T$. A matrix is **symmetric** when $A^T = A$. Stiffness and conductance matrices in this course are symmetric because they have the form $A^T C A$, and $(A^T C A)^T = A^T C^T A = A^T C A$ when $C$ is diagonal.

A square matrix $A$ is **invertible** if there is a matrix $A^{-1}$ with $A^{-1}A = AA^{-1} = I$. For square matrices, these statements are equivalent: $A$ is invertible; elimination with row exchanges produces $n$ pivots; $Ax = 0$ has only $x = 0$; $Ax = b$ has exactly one solution for every $b$; $\\det A \\ne 0$. The inverse of a product reverses the order, $(AB)^{-1} = B^{-1}A^{-1}$, as you undo the last operation first. For a $2 \\times 2$ matrix with $ad - bc \\ne 0$, the inverse of $\\begin{pmatrix} a & b\\\\ c & d \\end{pmatrix}$ is $\\frac{1}{ad - bc}\\begin{pmatrix} d & -b\\\\ -c & a \\end{pmatrix}$.

**Worked example: Gauss-Jordan.** Three masses hang between two fixed walls joined by four identical springs of stiffness $1$. The stiffness matrix is
$$K = \\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}.$$
Reduce $[K \\mid I]$. Add $\\tfrac12 R_1$ to $R_2$, giving $[0\\ \\tfrac32\\ {-1} \\mid \\tfrac12\\ 1\\ 0]$. Add $\\tfrac23$ of the new $R_2$ to $R_3$, giving $[0\\ 0\\ \\tfrac43 \\mid \\tfrac13\\ \\tfrac23\\ 1]$. The pivots are $2, \\tfrac32, \\tfrac43$. Now eliminate upward and divide by the pivots. Row 3 becomes $[0\\ 0\\ 1 \\mid \\tfrac14\\ \\tfrac12\\ \\tfrac34]$. Row 2 plus row 3, divided by $\\tfrac32$, gives $[0\\ 1\\ 0 \\mid \\tfrac12\\ 1\\ \\tfrac12]$. Row 1 plus row 2, divided by $2$, gives $[1\\ 0\\ 0 \\mid \\tfrac34\\ \\tfrac12\\ \\tfrac14]$. So
$$K^{-1} = \\frac14\\begin{pmatrix} 3 & 2 & 1\\\\ 2 & 4 & 2\\\\ 1 & 2 & 3 \\end{pmatrix}.$$
Column $j$ of $K^{-1}$ is the displacement of all three masses when a unit force pushes mass $j$ alone. Pushing the middle mass moves it by $1$ and its neighbours by $\\tfrac12$. Every entry is positive, which says that pushing any mass moves every mass the same way.

**Pitfall.** Do not solve $Ax = b$ by computing $A^{-1}$ and multiplying. Elimination on $A$ alone costs about a third of the work of finding $A^{-1}$, and is usually more accurate. Inverses are for understanding, as here, or for small symbolic work.`,
          resources: [
            mit1806(U1, 'multiplication-and-inverse-matrices', 'Multiplication and inverse matrices', 'Four ways to multiply matrices and Gauss-Jordan elimination.', true),
            ila('matrix-inverses', 'Matrix Inverses', 'Computing inverses and solving systems with them.'),
            ila('invertible-matrix-thm', 'The Invertible Matrix Theorem', 'The list of equivalent conditions for invertibility.'),
            threeBlue('inverse-matrices', 'Inverse matrices, column space and null space', 'The geometric meaning of an inverse and of singularity.'),
          ],
          exercises: [
            {
              slug: 'order-matters',
              title: 'Products in both orders',
              prompt:
                'Let $A = \\begin{pmatrix} 1 & 2\\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}$. Compute $AB$ and $BA$, and describe in words what multiplying by $B$ on the right and on the left does to $A$. Then compute $(AB)^T$ and check that it equals $B^T A^T$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$AB = \\begin{pmatrix} 2 & 1\\\\ 4 & 3 \\end{pmatrix}$ swaps the columns; $BA = \\begin{pmatrix} 3 & 4\\\\ 1 & 2 \\end{pmatrix}$ swaps the rows.',
            },
            {
              slug: 'difference-and-sum',
              title: 'The difference matrix and its inverse',
              prompt:
                'Let $D = \\begin{pmatrix} 1 & 0 & 0\\\\ -1 & 1 & 0\\\\ 0 & -1 & 1 \\end{pmatrix}$, so $Dx$ lists the differences $x_1, x_2 - x_1, x_3 - x_2$. Find $D^{-1}$ by Gauss-Jordan elimination and explain why the answer is a running-sum matrix. Then find the inverse of the upper triangular matrix $\\begin{pmatrix} 1 & 1 & 0\\\\ 0 & 1 & 1\\\\ 0 & 0 & 1 \\end{pmatrix}$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$D^{-1}$ is lower triangular with every entry on or below the diagonal equal to $1$. The second inverse is $\\begin{pmatrix} 1 & -1 & 1\\\\ 0 & 1 & -1\\\\ 0 & 0 & 1 \\end{pmatrix}$.',
            },
            {
              slug: 'unit-load-response',
              title: 'Unit loads on a spring chain',
              prompt:
                'Using $K^{-1}$ from the worked example, find the displacements when forces $f = (1, 0, -1)$ act on the three masses, and when $f = (1, 1, 1)$ (gravity with unit weights). Verify each by computing $Ku$. Explain from the symmetry of the chain why the first answer is antisymmetric and the second symmetric.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The answers are $u = (\\tfrac12, 0, -\\tfrac12)$ and $u = (\\tfrac32, 2, \\tfrac32)$.',
            },
            {
              slug: 'inverse-proofs',
              title: 'Inverse rules',
              prompt:
                'Prove: (a) if $A$ and $B$ are invertible $n \\times n$ matrices, then $AB$ is invertible with inverse $B^{-1}A^{-1}$; (b) if $A$ is invertible then $A^T$ is invertible and $(A^T)^{-1} = (A^{-1})^T$; (c) if a square matrix $A$ has a nonzero vector $x$ with $Ax = 0$, then $A$ is not invertible.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (c), suppose $A^{-1}$ exists and multiply $Ax = 0$ by it.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $(AB)^{-1} = B^{-1}A^{-1}$ and not $A^{-1}B^{-1}$?',
              answerOutline:
                '$(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$. The last operation applied ($A$) must be undone first.',
            },
            {
              question: 'Give four conditions equivalent to invertibility of a square matrix $A$.',
              answerOutline:
                '$n$ pivots after elimination with row exchanges; $Ax = 0$ only for $x = 0$; $Ax = b$ uniquely solvable for every $b$; $\\det A \\ne 0$; columns independent.',
            },
            {
              question: 'What does column $j$ of the inverse of a stiffness matrix represent?',
              answerOutline:
                'The displacement vector produced by a unit force applied at degree of freedom $j$ alone (the influence or flexibility column).',
            },
            {
              question: 'Why is solving $Ax = b$ by forming $A^{-1}$ a poor idea in practice?',
              answerOutline:
                'It costs about three times as much as elimination for one right-hand side and is usually less accurate; elimination (LU) solves directly.',
            },
          ],
        },
        {
          slug: 'lu-factorisation',
          title: 'LU factorisation',
          summary:
            'Elimination without row exchanges writes $A = LU$, with the multipliers stored in $L$. Factor once, then solve for many right-hand sides with two triangular solves.',
          estimatedMinutes: 120,
          objectives: [
            'Factor a matrix as $A = LU$ by recording the elimination multipliers',
            'Solve $Ax = b$ by forward substitution $Lc = b$ and back substitution $Ux = c$',
            'Split $U$ as $DU\'$ to get $A = LDU\'$, and $A = LDL^T$ for symmetric $A$',
            'Recognise when LU without row exchanges does not exist',
          ],
          concepts: [
            'Lower and upper triangular matrices',
            'Multipliers $\\ell_{ij}$ stored in $L$',
            'Forward and back substitution',
            '$LDU$ factorisation',
            'Symmetric factorisation $LDL^T$',
            'Uniqueness of LU',
            'Factor once, solve many',
          ],
          explanation: `Elimination is a sequence of steps "subtract $\\ell_{ij}$ times row $j$ from row $i$". Each step is multiplication on the left by an elementary matrix, and undoing all of them in reverse order rebuilds $A$ from $U$. The undoing matrix is remarkably simple. It is the unit lower triangular matrix $L$ whose $(i,j)$ entry is exactly the multiplier $\\ell_{ij}$. So when no row exchanges are needed,
$$A = LU,$$
where $U$ is the upper triangular result of elimination with the pivots on its diagonal. To solve $Ax = b$, solve $Lc = b$ from the top down, then $Ux = c$ from the bottom up. Once $L$ and $U$ are known, every new right-hand side costs only two triangular solves.

Factoring the pivots out of $U$ gives $A = LDU'$, with $D$ diagonal and $U'$ unit upper triangular. If $A$ is symmetric, then $U' = L^T$, so $A = LDL^T$. This symmetric form is the one you will meet again for stiffness matrices in the equilibrium module.

**Worked example.** Factor the spring-chain matrix $K = \\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}$ and solve $Ku = (1,1,1)$.

The first multiplier is $\\ell_{21} = -1/2$. Subtracting $-\\tfrac12 R_1$ from $R_2$ gives row 2 $= (0, \\tfrac32, -1)$. Row 3 has a zero below the first pivot, so $\\ell_{31} = 0$. Next, $\\ell_{32} = (-1)/(\\tfrac32) = -\\tfrac23$, and row 3 becomes $(0, 0, 2 - \\tfrac23) = (0, 0, \\tfrac43)$. Therefore
$$L = \\begin{pmatrix} 1 & 0 & 0\\\\ -\\tfrac12 & 1 & 0\\\\ 0 & -\\tfrac23 & 1 \\end{pmatrix},\\quad U = \\begin{pmatrix} 2 & -1 & 0\\\\ 0 & \\tfrac32 & -1\\\\ 0 & 0 & \\tfrac43 \\end{pmatrix},$$
and $D = \\operatorname{diag}(2, \\tfrac32, \\tfrac43)$ with $K = LDL^T$. Forward substitution on $Lc = (1,1,1)$ gives $c_1 = 1$, $c_2 = 1 + \\tfrac12 = \\tfrac32$ and $c_3 = 1 + \\tfrac23 \\cdot \\tfrac32 = 2$. Back substitution on $Uu = c$ gives $u_3 = 2 / \\tfrac43 = \\tfrac32$, $u_2 = (\\tfrac32 + u_3)/\\tfrac32 = 2$ and $u_1 = (1 + u_2)/2 = \\tfrac32$. Gravity pulls the middle mass furthest, as you would expect.

Notice that $L$ and $U$ are bidiagonal: elimination on a tridiagonal matrix creates no new nonzeros. That fact makes long spring chains and long resistor ladders cheap to solve.

**When LU fails.** If a zero pivot appears, there is no $A = LU$ with those rows in that order. For example, $\\begin{pmatrix} 0 & 1\\\\ 1 & 1 \\end{pmatrix}$ is invertible but has no LU factorisation, because its first pivot is zero. The fix is a row exchange, $PA = LU$, which is the subject of the next lesson. When an LU factorisation with unit diagonal in $L$ exists for an invertible $A$, it is unique.`,
          resources: [
            mit1806(U1, 'factorization-into-a-lu', 'Factorization into A = LU', 'Why the multipliers land in $L$ untouched, and the cost of elimination.', true),
            ila('matrix-multiplication', 'Matrix Multiplication', 'Background for elementary matrices as left multiplication.'),
            hefferon('The chapter on matrix operations treats elementary reduction matrices and the LU idea.'),
            olver('Optional paid companion; its early chapter on elimination develops LU and $LDL^T$ with engineering examples.'),
          ],
          exercises: [
            {
              slug: 'lu-by-hand',
              title: 'Factor and solve',
              prompt:
                'Find the $LU$ factorisation of $A = \\begin{pmatrix} 1 & 2 & 0\\\\ 2 & 5 & 3\\\\ 0 & 3 & 10 \\end{pmatrix}$. Since $A$ is symmetric, write it as $LDL^T$. Use the factors to solve $Ax = (3, 10, 13)$ by forward and back substitution.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The multipliers are $\\ell_{21} = 2$, $\\ell_{31} = 0$, $\\ell_{32} = 3$; all pivots are $1$, so $D = I$. The solution is $(1, 1, 1)$.',
            },
            {
              slug: 'no-lu',
              title: 'An invertible matrix with no LU',
              prompt:
                'Show that $\\begin{pmatrix} 0 & 1\\\\ 1 & 1 \\end{pmatrix}$ cannot be written as $\\begin{pmatrix} 1 & 0\\\\ \\ell & 1 \\end{pmatrix}\\begin{pmatrix} p & q\\\\ 0 & r \\end{pmatrix}$ for any numbers $\\ell, p, q, r$, by multiplying out and comparing entries. Then show that swapping the rows gives a matrix that does factor.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'second-difference-pivots',
              title: 'Pivots of the second-difference matrix',
              prompt:
                'Let $K_n$ be the $n \\times n$ tridiagonal matrix with $2$ on the diagonal and $-1$ beside it. Prove by induction that elimination without row exchanges gives pivots $d_k = (k+1)/k$ for $k = 1, \\dots, n$, that every multiplier is $\\ell_{k+1,k} = -k/(k+1)$, and that $\\det K_n = n + 1$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Show $d_{k+1} = 2 - 1/d_k$ and check that $(k+1)/k$ satisfies it.',
            },
            {
              slug: 'factor-once',
              title: 'Factor once, solve three times',
              prompt:
                'With $K$ from the worked example, use the same $L$ and $U$ to solve $Ku = f$ for $f = (1, 0, 0)$, $(0, 1, 0)$ and $(0, 0, 1)$. Confirm that the three solutions are the columns of $K^{-1}$ from the previous lesson. Then check all three in NumPy with scipy.linalg.lu_factor and lu_solve.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Where do the multipliers from elimination appear in the factorisation $A = LU$?',
              answerOutline:
                'Below the diagonal of $L$, in exactly the positions $(i,j)$ where they were used; $L$ has ones on its diagonal.',
            },
            {
              question: 'Why is $A = LDL^T$ for symmetric $A$ when no row exchanges are needed?',
              answerOutline:
                '$A = LDU\'$ uniquely; transposing gives $A = U\'^T D L^T$, another factorisation of the same form, so by uniqueness $U\' = L^T$.',
            },
            {
              question: 'What is the advantage of LU over solving from scratch when there are many right-hand sides?',
              answerOutline:
                'Factoring costs about $n^3/3$ multiplications once; each new right-hand side then needs only about $n^2$ for the two triangular solves.',
            },
          ],
        },
        {
          slug: 'pivoting-and-cost',
          title: 'Row exchanges, pivoting and the cost of elimination',
          summary:
            'Count the operations elimination needs, see why tiny pivots destroy accuracy, and fix it with partial pivoting and the factorisation $PA = LU$.',
          estimatedMinutes: 110,
          objectives: [
            'Count the multiplications in elimination exactly and state the $n^3/3$ and $n^2$ estimates',
            'Explain how a small pivot amplifies rounding error, with a two-equation example',
            'Carry out partial pivoting by hand and write the result as $PA = LU$',
            'Estimate the run time of a dense solve and contrast it with a tridiagonal solve',
          ],
          concepts: [
            'Operation count $(n^3 - n)/3$',
            'Cost per right-hand side $n^2$',
            'Permutation matrix',
            '$PA = LU$',
            'Partial pivoting',
            'Rounding error and small pivots',
            'Banded and tridiagonal systems',
          ],
          explanation: `**Cost.** At elimination step $k$, each of the $n - k$ rows below the pivot needs one division to form its multiplier and $n - k$ multiplications to update the rest of the row. Writing $j = n - k$, the total number of multiplications and divisions is
$$\\sum_{j=1}^{n-1} j(j+1) = \\frac{(n-1)n(n+1)}{3} = \\frac{n^3 - n}{3} \\approx \\frac{n^3}{3}.$$
Each multiplication comes with a subtraction, so a computer performs about $\\tfrac23 n^3$ floating-point operations. Forward and back substitution for one right-hand side cost about $n^2$ multiplications together. Doubling $n$ multiplies the factorisation time by eight, which is why structure matters. A tridiagonal system, such as a spring chain, needs only about $5n$ multiplications and divisions to factor and solve, so a million unknowns is easy.

**Why pivots must not be small.** Exact arithmetic only needs nonzero pivots. Real arithmetic rounds, and a small pivot makes a huge multiplier that swamps the other entries. Take $\\varepsilon = 10^{-4}$ and the system
$$\\varepsilon x_1 + x_2 = 1,\\qquad x_1 + x_2 = 2,$$
whose exact solution is $x_1 = 1/(1-\\varepsilon) \\approx 1.0001$ and $x_2 = (1-2\\varepsilon)/(1-\\varepsilon) \\approx 0.9999$.

**Worked example.** Compute with three significant digits. Without exchanges, the multiplier is $1/\\varepsilon = 10^4$. The second equation becomes $(1 - 10^4)x_2 = 2 - 10^4$. Both $-9999$ and $-9998$ round to $-1.00 \\times 10^4$, so $x_2 = 1.00$. Then $\\varepsilon x_1 = 1 - x_2 = 0$, so $x_1 = 0$, which is completely wrong. Now exchange the rows first, so the pivot is $1$. The multiplier is $\\varepsilon$, and the second equation becomes $(1 - \\varepsilon)x_2 = 1 - 2\\varepsilon$, which rounds to $1.00\\,x_2 = 1.00$. So $x_2 = 1.00$ and $x_1 = 2 - x_2 = 1.00$, correct to three digits. The rounding of $x_2$ was harmless in the second case because it was not multiplied by $1/\\varepsilon$ afterwards.

**Partial pivoting** makes this automatic. At each step, swap into the pivot position the row whose entry in the current column has the largest absolute value. Then every multiplier satisfies $|\\ell_{ij}| \\le 1$. Recording the swaps in a **permutation matrix** $P$, the identity with its rows reordered, gives
$$PA = LU.$$
Every invertible matrix has such a factorisation. Library routines such as \`numpy.linalg.solve\` and \`scipy.linalg.lu\` use partial pivoting. Note that SciPy returns $P$, $L$ and $U$ with $A = PLU$, so its $P$ is the transpose of the one in $PA = LU$.

Pivoting protects the algorithm. It cannot rescue a problem that is itself sensitive, and that sensitivity, measured by the condition number, comes up again with norms and the SVD.`,
          resources: [
            mit1806(U1, 'transposes-permutations-vector-spaces', 'Transposes, permutations, spaces', 'Permutation matrices and $PA = LU$.', true),
            mit1806(U1, 'factorization-into-a-lu', 'Factorization into A = LU', 'The operation count for elimination.'),
            mit18085('The early lectures treat elimination, tridiagonal second-difference matrices and their cost in an engineering setting.'),
          ],
          exercises: [
            {
              slug: 'count-and-time',
              title: 'Count and time',
              prompt:
                'Verify the identity $\\sum_{j=1}^{n-1} j(j+1) = (n^3 - n)/3$ by induction. Then estimate how long a dense $n = 10^4$ factorisation takes on a machine sustaining $10^{10}$ floating-point operations per second, using $\\tfrac23 n^3$ operations. Time numpy.linalg.solve for $n = 1000, 2000, 4000$ on your machine and check the ratio between successive times against the factor $8$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'About $6.7 \\times 10^{11}$ operations, so roughly a minute. Measured ratios are often below 8 for small $n$ because of caching and threading.',
            },
            {
              slug: 'pivot-by-hand',
              title: 'Partial pivoting by hand',
              prompt:
                'Apply elimination with partial pivoting to $A = \\begin{pmatrix} 1 & 2 & 4\\\\ 2 & 1 & 3\\\\ 4 & 2 & 2 \\end{pmatrix}$. Record each swap and multiplier, and write the result as $PA = LU$. Check by multiplying out, and compare with scipy.linalg.lu, remembering that SciPy returns $A = PLU$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The first pivot is $4$ (row 3). After step 1 the largest candidate in column 2 is $3/2$, from the original row 1. You should get $L = \\begin{pmatrix} 1 & 0 & 0\\\\ \\tfrac14 & 1 & 0\\\\ \\tfrac12 & 0 & 1 \\end{pmatrix}$ and $U = \\begin{pmatrix} 4 & 2 & 2\\\\ 0 & \\tfrac32 & \\tfrac72\\\\ 0 & 0 & 2 \\end{pmatrix}$.',
            },
            {
              slug: 'tiny-pivot-in-double',
              title: 'A tiny pivot in double precision',
              prompt:
                'Write a ten-line Python function that solves a $2 \\times 2$ system by elimination without row exchanges. Apply it to $\\varepsilon x_1 + x_2 = 1$, $x_1 + x_2 = 2$ with $\\varepsilon = 10^{-20}$ and compare with numpy.linalg.solve. Explain the result in terms of what $1 - 10^{20}$ rounds to in double precision.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Without pivoting you should get $x_1 = 0$, $x_2 = 1$, while the true answer is $x_1 \\approx x_2 \\approx 1$.',
            },
            {
              slug: 'tridiagonal-count',
              title: 'Elimination on a tridiagonal matrix',
              prompt:
                'Show that elimination without row exchanges on an $n \\times n$ tridiagonal matrix produces bidiagonal $L$ and $U$. Count the multiplications and divisions needed to factor ($2(n-1)$) and then to solve one system by forward and back substitution, and show the total is $5n - 4$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Roughly how many multiplications does it take to factor a dense $n \\times n$ matrix, and to solve with the factors for one right-hand side?',
              answerOutline: 'About $n^3/3$ (exactly $(n^3 - n)/3$ counting divisions) to factor; about $n^2$ per right-hand side.',
            },
            {
              question: 'What does partial pivoting guarantee about the multipliers, and why does that help?',
              answerOutline:
                'Every $|\\ell_{ij}| \\le 1$, so rounding errors in earlier rows are not multiplied by large factors when rows are combined.',
            },
            {
              question: 'Does partial pivoting make every linear system accurately solvable? Explain.',
              answerOutline:
                'No. It makes the algorithm stable in practice, but an ill-conditioned matrix gives a solution that is sensitive to tiny changes in the data whatever algorithm is used.',
            },
            {
              question: 'SciPy\'s lu returns P, L, U. Which equation do they satisfy?',
              answerOutline: '$A = PLU$, so the permutation in the textbook form $PA = LU$ is the transpose of SciPy\'s $P$.',
            },
          ],
        },
      ],
      project: {
        slug: 'resistor-ladder-solver',
        title: 'A resistor ladder by hand and by machine',
        description: `A resistor ladder is a chain of $n$ nodes, each joined to the next by a series resistor and to ground by a shunt resistor, with a voltage source at one end. Kirchhoff's current law at each node gives a tridiagonal system for the node voltages. In this project you derive the system, solve a small case by hand, and then write your own elimination code to see the cost estimates of this module in practice.

Use series resistance $R$ and shunt resistance $R_s$, and a source $V$ at the left end. Do the $n = 4$ case completely by hand with exact fractions, including the $LU$ factors. Then implement LU with partial pivoting for dense matrices and a separate tridiagonal (Thomas) solver, and compare both with numpy.linalg.solve on ladders up to $n = 2000$.`,
        deliverables: [
          'A derivation of the node equations from Kirchhoff\'s current law, with the matrix written for general $n$',
          'A hand solution of the $n = 4$ ladder with $R = R_s = 1\\ \\Omega$ and $V = 1$ V, showing $L$, $U$ and the node voltages as exact fractions',
          'A Python LU-with-partial-pivoting function and a tridiagonal solver, each tested against numpy.linalg.solve to a relative error below $10^{-10}$',
          'A log-log plot of run time against $n$ for both solvers, with fitted slopes close to 3 and 1, and a paragraph explaining any deviation',
          'A short note on how the voltage decays along a long ladder, with the decay ratio per section computed from the equations',
        ],
        estimatedHours: 8,
        stretchGoals: [
          'Show that the node voltages decay geometrically far from the source and find the ratio from a characteristic equation',
          'Compute the input resistance of the infinite ladder and compare with your finite-$n$ results',
        ],
      },
    },
    {
      slug: 'vector-spaces',
      title: 'Vector Spaces',
      description:
        'Subspaces, independence, bases and dimension, then the four fundamental subspaces of a matrix, which answer every question about existence and uniqueness of solutions. The module ends with the incidence matrix of a network, where the four subspaces have physical meaning.',
      lessons: [
        {
          slug: 'spaces-and-subspaces',
          title: 'Vector spaces and subspaces',
          summary:
            'What makes a set of vectors, polynomials or functions a vector space, how to test whether a subset is a subspace, and why solution sets of homogeneous equations are always subspaces.',
          estimatedMinutes: 100,
          objectives: [
            'State what a vector space is and give examples beyond $\\mathbb{R}^n$',
            'Apply the subspace test to sets of vectors, matrices, polynomials and functions',
            'Show that the solution set of a homogeneous linear equation is a subspace and that of an inhomogeneous one is not',
            'Describe the span of a set of vectors and decide whether a given vector lies in it',
          ],
          concepts: [
            'Vector space axioms',
            'Subspace and the subspace test',
            'Linear combination',
            'Span',
            'Function spaces $C[a,b]$ and $P_n$',
            'Null space of a matrix',
            'Affine set (shifted subspace)',
          ],
          explanation: `A **vector space** is a set $V$ with an addition and a scalar multiplication that obey the familiar rules: addition is commutative and associative, there is a zero vector, every vector has a negative, and scalar multiplication distributes over both kinds of addition. Besides $\\mathbb{R}^n$, applications need the polynomials $P_n$ of degree at most $n$, the $m \\times n$ matrices, and the continuous functions $C[a,b]$. In $C[a,b]$ a "vector" is a whole function, and $f + g$ and $cf$ are defined pointwise.

Most spaces you meet live inside a bigger one. A nonempty subset $W \\subseteq V$ is a **subspace** if it is closed under addition and scalar multiplication: whenever $u, w \\in W$ and $c$ is a scalar, $u + w \\in W$ and $cu \\in W$. Every subspace contains $0$, since $0u = 0$. So the quickest way to reject a candidate is to check whether it contains zero.

**Worked example.** Decide which of these are subspaces.

1. $W_1 = \\{x \\in \\mathbb{R}^3 : x_1 + 2x_2 - x_3 = 0\\}$. If $x$ and $y$ satisfy the equation, then $(x_1 + y_1) + 2(x_2 + y_2) - (x_3 + y_3) = 0 + 0 = 0$, and similarly $cx$ satisfies it. So $W_1$ is a subspace: a plane through the origin, the null space of the $1 \\times 3$ matrix $[1\\ 2\\ {-1}]$.
2. $W_2 = \\{x \\in \\mathbb{R}^2 : x_1 + x_2 = 1\\}$. The zero vector fails the equation, so this is not a subspace. It is a line shifted off the origin.
3. $W_3 = \\{x \\in \\mathbb{R}^2 : x_1 x_2 \\ge 0\\}$, the first and third quadrants. This set is closed under scalar multiplication, since $(cx_1)(cx_2) = c^2 x_1 x_2 \\ge 0$. It is not closed under addition: $(1, 0) + (0, -1) = (1, -1)$ has product $-1$. So it is not a subspace.
4. $W_4 = \\{f \\in C[0,1] : f(0) = 0\\}$ is a subspace, since $(f+g)(0) = 0$ and $(cf)(0) = 0$. In contrast, $\\{f : f(0) = 1\\}$ is not.

The first and last examples follow a pattern worth remembering. **The solutions of a homogeneous linear equation always form a subspace.** That covers $Ax = 0$, a boundary condition such as $f(0) = 0$, and a linear differential equation such as $y'' + \\omega^2 y = 0$. The solutions of an inhomogeneous equation $Ax = b$ with $b \\ne 0$ do not form a subspace. They form a subspace shifted by one particular solution.

The **span** of vectors $v_1, \\dots, v_k$ is the set of all their linear combinations $c_1 v_1 + \\cdots + c_k v_k$. It is the smallest subspace containing them. Asking whether $b$ is in the span of the columns of $A$ is the same as asking whether $Ax = b$ has a solution, so membership in a span is decided by elimination.

**Pitfall.** As $W_3$ shows, closure under scalar multiplication alone is not enough.`,
          resources: [
            ila('subspaces', 'Subspaces', 'The subspace test with many pictures in $\\mathbb{R}^2$ and $\\mathbb{R}^3$.'),
            ila('spans', 'Vector Equations and Spans', 'Spans and the link between span membership and solving $Ax = b$.'),
            mit1806(U1, 'column-space-and-nullspace', 'Column space and nullspace', 'The two subspaces that come with every matrix.', true),
            threeBlue('abstract-vector-spaces', 'Abstract vector spaces', 'Why functions are vectors too.'),
          ],
          exercises: [
            {
              slug: 'subspace-or-not',
              title: 'Subspace or not?',
              prompt:
                'Decide, with proof or a counterexample, whether each set is a subspace: (a) $\\{x \\in \\mathbb{R}^3 : x_1 = 2x_3\\}$; (b) $\\{x \\in \\mathbb{R}^2 : x_1 x_2 = 0\\}$; (c) $\\{p \\in P_3 : p(1) = 0\\}$; (d) the symmetric $2 \\times 2$ matrices; (e) $\\{f \\in C[0,1] : \\int_0^1 f(t)\\,dt = 1\\}$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Subspaces: (a), (c), (d). Not subspaces: (b) fails addition, (e) does not contain $0$.',
            },
            {
              slug: 'in-the-span',
              title: 'Is it in the span?',
              prompt:
                'Decide whether $(1, 2, 3)$ and $(1, 2, 4)$ lie in the span of $(1, 0, 1)$ and $(0, 1, 1)$. Describe the span as a plane through the origin by giving one equation $a x_1 + b x_2 + c x_3 = 0$ that it satisfies.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The span is $\\{(a, b, a+b)\\}$, so its equation is $x_1 + x_2 - x_3 = 0$.',
            },
            {
              slug: 'intersection-union',
              title: 'Intersections and unions',
              prompt:
                'Prove that the intersection of two subspaces of $V$ is a subspace. Show by an example in $\\mathbb{R}^2$ that the union of two subspaces need not be one, and prove that $U \\cup W$ is a subspace only if $U \\subseteq W$ or $W \\subseteq U$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the last part, take $u \\in U \\setminus W$ and $w \\in W \\setminus U$ and ask where $u + w$ lies.',
            },
            {
              slug: 'oscillator-solutions',
              title: 'Solutions of an oscillator equation',
              prompt:
                'Show that the solutions of $y\'\' + 4y = 0$ form a subspace of the twice-differentiable functions, and that $\\cos 2t$ and $\\sin 2t$ lie in it. Then show that the solutions of the forced equation $y\'\' + 4y = 1$ do not form a subspace, and that every solution is $\\tfrac14$ plus a solution of the unforced equation.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the fastest way to show a subset is not a subspace?',
              answerOutline:
                'Check whether it contains the zero vector; if not, it is not a subspace. Otherwise find two vectors whose sum, or a vector and scalar whose product, leaves the set.',
            },
            {
              question: 'Why is the solution set of $Ax = 0$ a subspace while that of $Ax = b$, $b \\ne 0$, is not?',
              answerOutline:
                '$A(x+y) = Ax + Ay = 0$ and $A(cx) = 0$, so it is closed; for $b \\ne 0$ the zero vector is not a solution, and the sum of two solutions solves $Ax = 2b$.',
            },
            {
              question: 'How do you decide whether $b$ lies in the span of $v_1, \\dots, v_k$?',
              answerOutline:
                'Put the $v_i$ as columns of $A$ and decide by elimination whether $Ax = b$ is consistent.',
            },
          ],
        },
        {
          slug: 'independence-basis-dimension',
          title: 'Independence, basis and dimension',
          summary:
            'Linear independence, bases as coordinate systems, and dimension as the size of any basis, tested by elimination for vectors and by evaluation for functions.',
          estimatedMinutes: 110,
          objectives: [
            'Test a set of vectors for linear independence by elimination',
            'Find a basis for a subspace given by equations or by a spanning set',
            'Compute the coordinates of a vector in a given basis',
            'Use the fact that all bases of a space have the same number of vectors',
            'Test functions such as exponentials for independence',
          ],
          concepts: [
            'Linear dependence and independence',
            'Basis',
            'Coordinates relative to a basis',
            'Dimension',
            'Pruning a spanning set, extending an independent set',
            'Independence of functions',
          ],
          explanation: `Vectors $v_1, \\dots, v_k$ are **linearly independent** if the only combination $c_1 v_1 + \\cdots + c_k v_k = 0$ is the one with every $c_i = 0$. Otherwise one of them is a combination of the others. To test vectors in $\\mathbb{R}^m$, put them as the columns of a matrix $A$. They are independent exactly when $Ax = 0$ has only the zero solution, which means every column has a pivot.

A **basis** of a space $V$ is an independent set that spans $V$. Each vector then has exactly one expression $v = c_1 v_1 + \\cdots + c_n v_n$. Existence comes from spanning and uniqueness from independence. The numbers $c_i$ are the **coordinates** of $v$ in that basis. A space has many bases, but they all contain the same number of vectors. That number is the **dimension**. The key fact behind this is that in a space spanned by $n$ vectors, any $n + 1$ vectors are dependent, because a homogeneous system with more unknowns than equations has a nonzero solution.

**Worked example.** Let $v_1 = (1, 2, 0)$, $v_2 = (0, 1, 1)$ and $v_3 = (2, 5, 1)$. With these as the columns of $A$, elimination gives
$$\\begin{pmatrix} 1 & 0 & 2\\\\ 2 & 1 & 5\\\\ 0 & 1 & 1 \\end{pmatrix} \\to \\begin{pmatrix} 1 & 0 & 2\\\\ 0 & 1 & 1\\\\ 0 & 1 & 1 \\end{pmatrix} \\to \\begin{pmatrix} 1 & 0 & 2\\\\ 0 & 1 & 1\\\\ 0 & 0 & 0 \\end{pmatrix}.$$
Column 3 has no pivot, so the vectors are dependent. Reading the null space with $x_3 = 1$ gives $x_2 = -1$ and $x_1 = -2$, so $-2v_1 - v_2 + v_3 = 0$, that is, $v_3 = 2v_1 + v_2$. The span is the plane with basis $\\{v_1, v_2\\}$, of dimension $2$. The pivot columns of the original matrix always give a basis for the span of its columns.

The same ideas apply to polynomials. In $P_2$, the polynomials $1$, $1 + t$ and $1 + t + t^2$ form a basis. To find the coordinates of $p = 3 + 2t + t^2$, write $p = a + b(1+t) + c(1+t+t^2)$ and match coefficients: $t^2$ gives $c = 1$, $t$ gives $b + c = 2$ so $b = 1$, and the constant gives $a + b + c = 3$ so $a = 1$. The coordinates are $(1, 1, 1)$, even though the coefficients of $p$ in the standard basis $1, t, t^2$ are $(3, 2, 1)$.

For functions, evaluate at several points. If $c_1 e^t + c_2 e^{2t} = 0$ for all $t$, then $t = 0$ gives $c_1 + c_2 = 0$ and $t = \\ln 2$ gives $2c_1 + 4c_2 = 0$, so $c_1 = c_2 = 0$. The exponentials are independent.

**Pitfall.** No two of $v_1, v_2, v_3$ above are parallel, yet the three are dependent. Pairwise checks are not enough.`,
          resources: [
            mit1806(U1, 'independence-basis-and-dimension', 'Independence, basis and dimension', 'The lecture and its problem session.', true),
            ila('linear-independence', 'Linear Independence', 'Pictures of dependence and the pivot test.'),
            ila('dimension', 'Basis and Dimension', 'Bases of subspaces given by equations or spans.'),
            ila('bases-as-coord-systems', 'Bases as Coordinate Systems', 'Coordinates relative to a non-standard basis.'),
          ],
          exercises: [
            {
              slug: 'three-vectors',
              title: 'Independent or not',
              prompt:
                'Are $(1, 1, 0)$, $(1, 0, 1)$, $(0, 1, 1)$ independent in $\\mathbb{R}^3$? Answer by elimination and again by a determinant. Then decide whether $(1, -1, 0)$, $(0, 1, -1)$, $(-1, 0, 1)$ are independent, and give a dependence relation if not.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The first determinant is $-2$. The second set sums to zero.',
            },
            {
              slug: 'basis-from-equations',
              title: 'A basis for a subspace given by equations',
              prompt:
                'Find a basis and the dimension of $W = \\{x \\in \\mathbb{R}^4 : x_1 + x_2 + x_3 + x_4 = 0,\\ x_1 - x_2 = 0\\}$. Then extend your basis to a basis of $\\mathbb{R}^4$ and justify that the extended set is independent.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Take $x_1$ and $x_3$ free: one basis is $(1, 1, 0, -2)$, $(0, 0, 1, -1)$, so $\\dim W = 2$.',
            },
            {
              slug: 'n-plus-one-dependent',
              title: 'Too many vectors are dependent',
              prompt:
                'Prove that if $V$ is spanned by $w_1, \\dots, w_n$, then any $n + 1$ vectors $v_1, \\dots, v_{n+1}$ in $V$ are dependent. Write each $v_j$ in terms of the $w_i$ and use the fact that a homogeneous system with more unknowns than equations has a nonzero solution. Deduce that any two bases of $V$ have the same size.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'function-independence',
              title: 'Independence of functions',
              prompt:
                'Show that $e^t$, $e^{2t}$, $e^{3t}$ are independent by evaluating a vanishing combination at $t = 0$, $\\ln 2$ and $\\ln 3$ and solving the resulting $3 \\times 3$ system. Show that $1$, $\\cos^2 t$, $\\sin^2 t$ are dependent and find the dimension of their span.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The rows of the $3 \\times 3$ matrix are $(x, x^2, x^3)$ for $x = 1, 2, 3$. Its determinant is $1 \\cdot 2 \\cdot 3$ times the Vandermonde determinant $(2-1)(3-1)(3-2)$, so it equals $12$. The span of the second set has dimension $2$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How does elimination tell you whether the columns of $A$ are independent?',
              answerOutline: 'They are independent exactly when every column has a pivot, i.e. $Ax = 0$ has only $x = 0$.',
            },
            {
              question: 'Why are coordinates relative to a basis unique?',
              answerOutline:
                'If $\\sum c_i v_i = \\sum d_i v_i$ then $\\sum (c_i - d_i)v_i = 0$, and independence forces $c_i = d_i$.',
            },
            {
              question: 'Which columns of a matrix form a basis for its column space?',
              answerOutline: 'The pivot columns of the original matrix (not of its echelon form).',
            },
            {
              question: 'Give three vectors in $\\mathbb{R}^3$, no two parallel, that are dependent.',
              answerOutline: 'Any three in a plane through the origin, e.g. $(1,0,0)$, $(0,1,0)$, $(1,1,0)$.',
            },
          ],
        },
        {
          slug: 'four-fundamental-subspaces',
          title: 'The four fundamental subspaces',
          summary:
            'Column space, null space, row space and left null space: how to find bases for all four from one elimination, their dimensions, and the solvability condition for $Ax = b$.',
          estimatedMinutes: 130,
          objectives: [
            'Compute the reduced row echelon form and read off the rank',
            'Find bases for $C(A)$, $N(A)$, $C(A^T)$ and $N(A^T)$',
            'State and use the dimension count $r$, $n - r$, $r$, $m - r$',
            'Write the complete solution of $Ax = b$ as a particular solution plus the null space',
            'Express the solvability condition for $Ax = b$ using the left null space',
          ],
          concepts: [
            'Reduced row echelon form',
            'Rank',
            'Column space $C(A)$ and null space $N(A)$',
            'Row space $C(A^T)$ and left null space $N(A^T)$',
            'Rank-nullity: $r + (n - r) = n$',
            'Special solutions',
            'Particular plus homogeneous solution',
          ],
          explanation: `Every $m \\times n$ matrix $A$ of rank $r$ carries four subspaces. The **column space** $C(A) \\subseteq \\mathbb{R}^m$ is the set of all $Ax$, so it is the set of right-hand sides $b$ for which $Ax = b$ is solvable. The **null space** $N(A) \\subseteq \\mathbb{R}^n$ is the set of solutions of $Ax = 0$, and it measures non-uniqueness. The **row space** $C(A^T) \\subseteq \\mathbb{R}^n$ and the **left null space** $N(A^T) \\subseteq \\mathbb{R}^m$ are the same two constructions applied to $A^T$. Their dimensions are
$$\\dim C(A) = \\dim C(A^T) = r,\\qquad \\dim N(A) = n - r,\\qquad \\dim N(A^T) = m - r.$$
Here $r$ is the number of pivots and $n - r$ the number of free variables. Each vector in $N(A)$ is orthogonal to every row, since $Ax = 0$ says exactly that. So $N(A)$ and $C(A^T)$ are orthogonal subspaces of $\\mathbb{R}^n$. In the same way, $N(A^T)$ and $C(A)$ are orthogonal in $\\mathbb{R}^m$. That gives a test you can use without solving anything: **$Ax = b$ is solvable if and only if $y^T b = 0$ for every $y$ in $N(A^T)$.** The orthogonality module proves the "if" direction.

**Worked example.** Let
$$A = \\begin{pmatrix} 1 & 2 & 1 & 0\\\\ 2 & 4 & 3 & 1\\\\ 3 & 6 & 4 & 1 \\end{pmatrix}.$$
Subtract $2R_1$ from $R_2$ and $3R_1$ from $R_3$. Both rows become $(0, 0, 1, 1)$, and subtracting one from the other zeroes row 3. Clearing above the second pivot gives the reduced form
$$R = \\begin{pmatrix} 1 & 2 & 0 & -1\\\\ 0 & 0 & 1 & 1\\\\ 0 & 0 & 0 & 0 \\end{pmatrix}.$$
The pivots are in columns 1 and 3, so $r = 2$.

- $C(A)$ has basis $(1, 2, 3)$ and $(1, 3, 4)$, the pivot columns of $A$ itself.
- $C(A^T)$ has basis $(1, 2, 0, -1)$ and $(0, 0, 1, 1)$, the nonzero rows of $R$.
- $N(A)$: the free variables are $x_2$ and $x_4$, and $R$ says $x_1 = -2x_2 + x_4$ and $x_3 = -x_4$. The special solutions are $(-2, 1, 0, 0)$ and $(1, 0, -1, 1)$, and $\\dim N(A) = 4 - 2 = 2$.
- $N(A^T)$: elimination showed $R_3 - R_1 - R_2 = 0$, so $y = (-1, -1, 1)$ satisfies $y^T A = 0$. Its dimension is $3 - 2 = 1$.

So $Ax = b$ is solvable exactly when $-b_1 - b_2 + b_3 = 0$, that is, $b_3 = b_1 + b_2$. For $b = (1, 3, 4)$ the condition holds. Setting the free variables to zero gives the particular solution $x_p = (0, 0, 1, 0)$. The complete solution is $x = x_p + c_1(-2, 1, 0, 0) + c_2(1, 0, -1, 1)$.

**Pitfall.** Row operations change the column space. Take column-space basis vectors from $A$ and row-space basis vectors from $R$: row operations preserve the row space and the dependencies among the columns.`,
          resources: [
            mit1806(U1, 'the-four-fundamental-subspaces', 'The four fundamental subspaces', 'The central lecture of the first unit.', true),
            mit1806(U1, 'solving-ax-b-row-reduced-form-r', 'Solving Ax = b: row reduced form R', 'Complete solutions and the role of rank.'),
            ila('rank-thm', 'The Rank Theorem', 'Rank plus nullity equals the number of columns.'),
            threeBlue('inverse-matrices', 'Inverse matrices, column space and null space', 'Geometric picture of column space and null space.'),
          ],
          exercises: [
            {
              slug: 'rank-one-subspaces',
              title: 'Four subspaces of a rank-one matrix',
              prompt:
                'For $A = \\begin{pmatrix} 1 & 3\\\\ 2 & 6 \\end{pmatrix}$ find a basis for each of the four subspaces, sketch them in two planes, and check the two orthogonality relations.',
              kind: 'problem',
              difficulty: 1,
              hint: '$C(A)$ is spanned by $(1, 2)$, $N(A)$ by $(-3, 1)$, $C(A^T)$ by $(1, 3)$, $N(A^T)$ by $(-2, 1)$.',
            },
            {
              slug: 'complete-solution',
              title: 'Complete solution and solvability',
              prompt:
                'Let $A = \\begin{pmatrix} 1 & 1 & 2\\\\ 2 & 3 & 5\\\\ 1 & 2 & 3 \\end{pmatrix}$. Find the rank, a basis for each of the four subspaces, and the condition on $b$ for $Ax = b$ to be solvable. Find the complete solution for $b = (2, 5, 3)$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Rank $2$; $N(A)$ is spanned by $(-1, -1, 1)$; $N(A^T)$ by $(1, -1, 1)$, so solvable iff $b_1 - b_2 + b_3 = 0$; $x_p = (1, 1, 0)$.',
            },
            {
              slug: 'orthogonality-proof',
              title: 'Null space is orthogonal to row space',
              prompt:
                'Prove that every vector in $N(A)$ is orthogonal to every vector in $C(A^T)$. Then prove that if $Ax = b$ is solvable, $y^T b = 0$ for every $y \\in N(A^T)$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rank-of-gram',
              title: 'The rank of the Gram matrix',
              prompt:
                'Prove that $N(A^T A) = N(A)$ for any real $m \\times n$ matrix $A$, and deduce that $\\operatorname{rank}(A^T A) = \\operatorname{rank}(A)$. Conclude that $A^T A$ is invertible exactly when the columns of $A$ are independent. Where does the proof use that the entries are real?',
              kind: 'derivation',
              difficulty: 3,
              hint: 'If $A^T A x = 0$, multiply on the left by $x^T$.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the dimensions of the four fundamental subspaces of an $m \\times n$ matrix of rank $r$.',
              answerOutline: '$C(A)$ and $C(A^T)$: $r$; $N(A)$: $n - r$; $N(A^T)$: $m - r$.',
            },
            {
              question: 'Why do you take column-space basis vectors from $A$ rather than from $R$?',
              answerOutline:
                'Row operations change the column space but preserve linear relations among columns, so the pivot columns of $A$ are independent and span $C(A)$.',
            },
            {
              question: 'How does the left null space decide whether $Ax = b$ is solvable?',
              answerOutline: '$Ax = b$ is solvable iff $b$ is orthogonal to every vector in $N(A^T)$.',
            },
            {
              question: 'Describe the complete solution set of a consistent $Ax = b$.',
              answerOutline: '$x_p + N(A)$: one particular solution plus every null-space vector, an affine set of dimension $n - r$.',
            },
          ],
        },
        {
          slug: 'networks-and-incidence-matrices',
          title: 'Networks and incidence matrices',
          summary:
            'The incidence matrix of a directed graph turns node potentials into edge differences. Its four subspaces are constant potentials, potential differences, Kirchhoff\'s current law and independent loops.',
          estimatedMinutes: 110,
          objectives: [
            'Write the incidence matrix of a directed graph with a fixed sign convention',
            'Show that the null space of a connected graph\'s incidence matrix is the constant vectors',
            'Interpret $A^T y = 0$ as Kirchhoff\'s current law and find a basis of loop currents',
            'Use the dimension count to derive the relation edges $-$ nodes $+ 1 =$ independent loops',
          ],
          concepts: [
            'Directed graph: nodes and edges',
            'Incidence matrix',
            'Potential differences $Au$',
            'Kirchhoff\'s current law $A^T y = 0$',
            'Independent loops',
            'Spanning tree',
            'Grounding a node',
          ],
          explanation: `A network has $n$ nodes and $m$ edges, and each edge has a chosen direction. The **incidence matrix** $A$ is $m \\times n$. Row $k$ describes edge $k$: it has $-1$ in the column of the node where the edge starts, $+1$ in the column where it ends, and zeros elsewhere. If $u$ lists potentials (voltages, pressures, temperatures) at the nodes, then $(Au)_k = u_{\\text{end}} - u_{\\text{start}}$ is the potential difference across edge $k$. If $y$ lists the flows on the edges, then $(A^T y)_j$ is the net flow into node $j$. So $A^T y = 0$ is **Kirchhoff's current law**: flow is conserved at every node.

The four subspaces now mean something physical.

- $N(A)$: $Au = 0$ means equal potential at both ends of every edge. For a connected graph, that forces all potentials to be equal, so $N(A)$ is spanned by $(1, 1, \\dots, 1)$ and $r = n - 1$. Physically, only potential differences matter, and you fix one by **grounding** a node.
- $C(A)$: edge differences that come from some potential, of dimension $n - 1$.
- $N(A^T)$: flows that satisfy the current law everywhere. These are combinations of loop flows, and there are $m - r = m - n + 1$ independent ones.
- $C(A^T)$: the possible net inflows $A^Ty$ at the nodes, whose components always sum to zero.

**Worked example.** Take four nodes and five edges: $e_1\\!: 1 \\to 2$, $e_2\\!: 1 \\to 3$, $e_3\\!: 2 \\to 3$, $e_4\\!: 2 \\to 4$ and $e_5\\!: 3 \\to 4$. Then
$$A = \\begin{pmatrix} -1 & 1 & 0 & 0\\\\ -1 & 0 & 1 & 0\\\\ 0 & -1 & 1 & 0\\\\ 0 & -1 & 0 & 1\\\\ 0 & 0 & -1 & 1 \\end{pmatrix}.$$
The graph is connected, so $r = 3$ and $N(A)$ is spanned by $(1,1,1,1)$. There are $m - n + 1 = 2$ independent loops. Going $1 \\to 2 \\to 3$ and back along $e_2$ uses $e_1$ and $e_3$ forwards and $e_2$ backwards, giving $y = (1, -1, 1, 0, 0)$. Going $2 \\to 3 \\to 4$ and back along $e_4$ gives $y = (0, 0, 1, -1, 1)$. Compute $A^T y$ for the first: node 1 gets $-1 + 1 = 0$, node 2 gets $1 - 1 = 0$, node 3 gets $-1 + 1 = 0$, and node 4 gets $0$. The outer loop $1 \\to 2 \\to 4 \\to 3 \\to 1$ is $(1, -1, 0, 1, -1)$, the difference of the two, so it is not independent.

For a planar graph, the dimension count is Euler's formula: (nodes) $-$ (edges) $+$ (independent loops) $= n - m + (m - n + 1) = 1$. The rows of $A$ for the edges of a spanning tree are independent, and adding any other edge closes exactly one loop.

**Pitfall.** Fix the sign convention and keep it. Some books put $+1$ at the start, which flips signs in $Au$ and $A^T y$ but changes no subspace.`,
          resources: [
            mit1806(U1, 'graphs-networks-incidence-matrices', 'Graphs, networks, incidence matrices', 'Strang\'s lecture on exactly this example class.', true),
            mit18085('Its lectures on networks build the incidence matrix and $A^T C A$ for circuits.'),
            {
              title: 'OpenStax University Physics Volume 2: Kirchhoff\'s Rules',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/10-3-kirchhoffs-rules',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'The physics of the junction and loop rules, if you want a refresher.',
            },
          ],
          exercises: [
            {
              slug: 'triangle-graph',
              title: 'The triangle network',
              prompt:
                'Three nodes are joined by edges $1 \\to 2$, $2 \\to 3$, $1 \\to 3$. Write the $3 \\times 3$ incidence matrix, find its rank, and find bases for $N(A)$ and $N(A^T)$. Interpret each basis vector physically.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Rank $2$; $N(A)$ is spanned by $(1, 1, 1)$; $N(A^T)$ by the loop $(1, 1, -1)$.',
            },
            {
              slug: 'solvable-differences',
              title: 'Which edge differences come from potentials?',
              prompt:
                'For the five-edge network of the worked example, find the conditions on $b \\in \\mathbb{R}^5$ for $Au = b$ to be solvable, using the two loop vectors. Is $b = (1, 3, 2, 1, -1)$ a valid set of potential differences? If so, find the potentials with node 1 grounded ($u_1 = 0$).',
              kind: 'problem',
              difficulty: 2,
              hint: 'The conditions are $b_1 - b_2 + b_3 = 0$ and $b_3 - b_4 + b_5 = 0$. Both hold, and $u = (0, 1, 3, 2)$.',
            },
            {
              slug: 'connected-null-space',
              title: 'Connected graphs have a one-dimensional null space',
              prompt:
                'Prove that if a directed graph is connected (ignoring edge directions), then the null space of its incidence matrix is spanned by $(1, \\dots, 1)$. What is the null space for a graph with $c$ connected components?',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Follow a path between any two nodes.',
            },
            {
              slug: 'complete-graph-loops',
              title: 'Loops in a complete graph',
              prompt:
                'The complete graph $K_n$ has an edge between every pair of $n$ nodes. How many independent loops does it have? Check your formula for $n = 3$ and $n = 4$ by building the incidence matrix in NumPy and computing $m - \\operatorname{rank}(A)$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$m = n(n-1)/2$ and $r = n - 1$, so $(n-1)(n-2)/2$ loops: 1 and 3.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $(Au)_k$ for the incidence matrix, and what is $(A^T y)_j$?',
              answerOutline:
                '$(Au)_k$ is the potential at the end of edge $k$ minus that at its start; $(A^T y)_j$ is the net flow into node $j$ (inflow minus outflow).',
            },
            {
              question: 'Why must one node be grounded before solving for potentials?',
              answerOutline:
                '$N(A)$ contains the constant vector, so potentials are determined only up to an additive constant; grounding removes that freedom.',
            },
            {
              question: 'How many independent loops does a connected graph with $n$ nodes and $m$ edges have, and why?',
              answerOutline: '$\\dim N(A^T) = m - r = m - (n - 1) = m - n + 1$.',
            },
          ],
        },
      ],
    },
    {
      slug: 'linear-transformations-and-determinants',
      title: 'Linear Transformations and Determinants',
      description:
        'Linear maps and their matrices, how a matrix changes when you change basis, and the determinant: its defining properties, how to compute it efficiently, and what it measures.',
      lessons: [
        {
          slug: 'linear-maps-and-matrices',
          title: 'Linear maps and their matrices',
          summary:
            'Every linear map between finite-dimensional spaces is a matrix once you choose bases. Build the matrices of rotations, projections, reflections and differentiation from their action on basis vectors.',
          estimatedMinutes: 110,
          objectives: [
            'Decide whether a map is linear from the definition',
            'Build the matrix of a linear map column by column from the images of basis vectors',
            'Write the matrices of rotations, projections onto lines and reflections in $\\mathbb{R}^2$',
            'Represent differentiation on polynomials as a matrix and find its kernel and range',
            'Relate composition of maps to multiplication of matrices',
          ],
          concepts: [
            'Linear transformation',
            'Matrix of a map: columns are images of basis vectors',
            'Rotation matrix',
            'Projection matrix $aa^T/a^Ta$',
            'Reflection matrix $2P - I$',
            'Kernel and range',
            'Composition and matrix product',
          ],
          explanation: `A map $T: V \\to W$ is **linear** if $T(u + v) = T(u) + T(v)$ and $T(cu) = cT(u)$ for all vectors and scalars. Linearity means $T$ is fixed once you know what it does to a basis. If $v = c_1 v_1 + \\cdots + c_n v_n$, then $T(v) = c_1 T(v_1) + \\cdots + c_n T(v_n)$. For $T: \\mathbb{R}^n \\to \\mathbb{R}^m$ with standard bases, this gives the rule for writing the matrix: **column $j$ of $A$ is $T(e_j)$**. Then $T(x) = Ax$ for every $x$. Composition matches multiplication: doing $B$ and then $A$ is the matrix $AB$.

Three planar maps come up constantly. Rotation by angle $\\theta$ sends $e_1$ to $(\\cos\\theta, \\sin\\theta)$ and $e_2$ to $(-\\sin\\theta, \\cos\\theta)$. Projection onto the line through a nonzero vector $a$ is $P = aa^T/(a^T a)$. Reflection across that line is $H = 2P - I$, because the reflected vector is the projection plus the same distance again on the far side.

**Worked example.** Find the matrix of projection onto the line $y = 2x$, and of differentiation on $P_2$.

For the projection, take $a = (1, 2)$, so $a^T a = 5$ and
$$P = \\frac15\\begin{pmatrix} 1 & 2\\\\ 2 & 4 \\end{pmatrix}.$$
Check the defining features. $Pa = \\tfrac15(5, 10) = a$, so vectors on the line are unchanged. $P(-2, 1) = \\tfrac15(0, 0) = 0$, so perpendicular vectors are sent to zero. And $P^2 = P$, since projecting twice changes nothing. The kernel is the perpendicular line, the range is the line $y = 2x$, and the rank is $1$.

For differentiation $D: P_2 \\to P_2$ with basis $1, t, t^2$, compute $D(1) = 0$, $D(t) = 1$ and $D(t^2) = 2t$. In coordinates these images are $(0,0,0)$, $(1,0,0)$ and $(0,2,0)$, so
$$D = \\begin{pmatrix} 0 & 1 & 0\\\\ 0 & 0 & 2\\\\ 0 & 0 & 0 \\end{pmatrix}.$$
To differentiate $p = 3 - t + 5t^2$, multiply $D(3, -1, 5) = (-1, 10, 0)$, which is $-1 + 10t$. The kernel is the constants and the range is $P_1$. Also $D^3 = 0$, because three derivatives kill any quadratic.

The kernel and range of $T$ are the null space and column space of its matrix, so everything from the four-subspaces lesson applies. In particular, $\\dim(\\ker T) + \\dim(\\operatorname{range} T) = \\dim V$.

**Pitfall.** Translation $x \\mapsto x + b$ with $b \\ne 0$ is not linear, since it moves $0$. Every linear map sends $0$ to $0$, so checking $T(0)$ is the quickest test.`,
          resources: [
            ila('linear-transformations', 'Linear Transformations', 'Definition, examples and the standard matrix.'),
            ila('matrix-transformations', 'Matrix Transformations', 'Pictures of what matrices do to the plane.'),
            threeBlue('linear-transformations', 'Linear transformations and matrices', 'The geometric view: a matrix records where the basis vectors land.'),
            mit1806(U3, 'linear-transformations-and-their-matrices', 'Linear transformations and their matrices', 'Strang\'s lecture, including the derivative as a matrix.', true),
          ],
          exercises: [
            {
              slug: 'rotations-compose',
              title: 'Rotations compose by adding angles',
              prompt:
                'Let $R(\\theta)$ be the rotation matrix. Multiply $R(\\alpha)R(\\beta)$ and use the fact that composition of rotations adds angles to derive the addition formulas for $\\cos(\\alpha + \\beta)$ and $\\sin(\\alpha + \\beta)$. What is $R(\\theta)^{-1}$, and how does it relate to $R(\\theta)^T$?',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'reflection-matrix',
              title: 'Reflection across a line',
              prompt:
                'Find the matrix $H$ of reflection across the line through $(1, 2)$. Verify that $H^2 = I$, that $H(1, 2) = (1, 2)$, that $H(-2, 1) = (2, -1)$, and that $\\det H = -1$. Explain each fact geometrically.',
              kind: 'problem',
              difficulty: 1,
              hint: '$H = 2P - I = \\tfrac15\\begin{pmatrix} -3 & 4\\\\ 4 & 3 \\end{pmatrix}$.',
            },
            {
              slug: 'derivative-on-cubics',
              title: 'Differentiation on cubics',
              prompt:
                'Write the $4 \\times 4$ matrix of $D = d/dt$ on $P_3$ with basis $1, t, t^2, t^3$. Find its rank, kernel and range, and show $D^4 = 0$. Then write the matrix of $T(p) = p + p\'$ and explain why $T$ is invertible even though $D$ is not.',
              kind: 'problem',
              difficulty: 2,
              hint: '$T = I + D$ is upper triangular with ones on the diagonal.',
            },
            {
              slug: 'determined-by-basis',
              title: 'A linear map is fixed by a basis',
              prompt:
                'Prove that if $v_1, \\dots, v_n$ is a basis of $V$ and $w_1, \\dots, w_n$ are any vectors in $W$, there is exactly one linear map $T$ with $T(v_i) = w_i$ for each $i$. Use this to find the matrix of the linear map on $\\mathbb{R}^2$ with $T(1, 1) = (2, 0)$ and $T(1, -1) = (0, 4)$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The matrix is $\\begin{pmatrix} 1 & 1\\\\ 2 & -2 \\end{pmatrix}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you build the standard matrix of a linear map $T: \\mathbb{R}^n \\to \\mathbb{R}^m$?',
              answerOutline: 'Column $j$ is $T(e_j)$.',
            },
            {
              question: 'Why does a projection matrix satisfy $P^2 = P$?',
              answerOutline: 'After one projection the vector lies in the target subspace, and projecting a vector already there leaves it unchanged.',
            },
            {
              question: 'What are the kernel and range of differentiation on $P_n$?',
              answerOutline: 'Kernel: the constants (dimension 1). Range: $P_{n-1}$ (dimension $n$). Their dimensions add to $n + 1 = \\dim P_n$.',
            },
          ],
        },
        {
          slug: 'change-of-basis',
          title: 'Coordinates and change of basis',
          summary:
            'Coordinates relative to a basis, the change-of-basis matrix, and the similarity transformation $S^{-1}AS$ that expresses the same map in a better basis.',
          estimatedMinutes: 110,
          objectives: [
            'Compute coordinates of a vector relative to a basis using $S^{-1}$',
            'Find the matrix of a linear map in a new basis as $S^{-1}AS$',
            'Choose a basis adapted to a map so that its matrix becomes diagonal',
            'Prove that similar matrices share determinant and trace',
          ],
          concepts: [
            'Basis matrix $S$ with basis vectors as columns',
            'Coordinate vector $[v]_B = S^{-1}v$',
            'Similar matrices $B = S^{-1}AS$',
            'Invariants of similarity: trace, determinant',
            'Adapted basis',
            'Principal axes',
          ],
          explanation: `A basis $v_1, \\dots, v_n$ of $\\mathbb{R}^n$ is a coordinate system. Put the basis vectors as the columns of a matrix $S$. The coordinates $c = [v]_B$ of a vector $v$ satisfy $v = c_1 v_1 + \\cdots + c_n v_n = Sc$, so $c = S^{-1}v$. When the basis is orthonormal, $S^{-1} = S^T$ and each coordinate is just a dot product.

Now let $A$ be the matrix of a linear map in the standard basis. To apply the map to a vector given in $B$-coordinates, convert to standard coordinates with $S$, apply $A$, and convert back with $S^{-1}$. So the matrix of the same map in the new basis is
$$A_B = S^{-1} A S.$$
Matrices related this way are **similar**. They represent one map seen in two coordinate systems, so they share everything intrinsic to the map: the determinant, the trace, the rank and the eigenvalues. The practical goal is to find a basis in which the map's matrix is simple, ideally diagonal. Engineers call such a basis the **principal axes** of a stress, a strain or an inertia tensor.

**Worked example.** Let $P = \\tfrac15\\begin{pmatrix} 1 & 2\\\\ 2 & 4 \\end{pmatrix}$ be projection onto the line $y = 2x$. Choose a basis adapted to the map: $v_1 = (1, 2)$ along the line and $v_2 = (-2, 1)$ perpendicular to it. Then
$$S = \\begin{pmatrix} 1 & -2\\\\ 2 & 1 \\end{pmatrix},\\qquad S^{-1} = \\frac15\\begin{pmatrix} 1 & 2\\\\ -2 & 1 \\end{pmatrix}.$$
From the previous lesson, $Pv_1 = v_1$ and $Pv_2 = 0$, so $PS = \\begin{pmatrix} 1 & 0\\\\ 2 & 0 \\end{pmatrix}$ and
$$S^{-1}PS = \\frac15\\begin{pmatrix} 1 & 2\\\\ -2 & 1 \\end{pmatrix}\\begin{pmatrix} 1 & 0\\\\ 2 & 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 0\\\\ 0 & 0 \\end{pmatrix}.$$
In the adapted basis, the projection keeps the first coordinate and discards the second. As a check on the invariants, $\\operatorname{tr} P = \\tfrac15(1 + 4) = 1$ and $\\det P = \\tfrac{1}{25}(4 - 4) = 0$, matching the diagonal form.

Coordinates work the same way. The vector $v = (3, 1)$ has coordinates $S^{-1}v = \\tfrac15(3 + 2, -6 + 1) = (1, -1)$. Indeed, $1 \\cdot (1, 2) - 1 \\cdot (-2, 1) = (3, 1)$. So $Pv = 1 \\cdot v_1 = (1, 2)$, read off with no multiplication by $P$ at all.

**Pitfall.** Keep the direction of $S$ straight. $S$ converts new coordinates into standard ones, and $S^{-1}$ converts standard coordinates into new ones. Writing $SAS^{-1}$ instead of $S^{-1}AS$ gives the matrix in a different basis, the one whose vectors are the columns of $S^{-1}$.`,
          resources: [
            threeBlue('change-of-basis', 'Change of basis', 'The clearest picture of why $S^{-1}AS$ is the right formula.'),
            ila('similarity', 'Similarity', 'Similar matrices as the same map in different coordinates.'),
            ila('bases-as-coord-systems', 'Bases as Coordinate Systems', 'Computing $B$-coordinates.'),
            mit1806(U3, 'change-of-basis-image-compression', 'Change of basis; image compression', 'Why the choice of basis matters in practice.', true),
          ],
          exercises: [
            {
              slug: 'coordinates-in-a-basis',
              title: 'Coordinates in a rotated basis',
              prompt:
                'Find the coordinates of $(5, 3)$ in the basis $(1, 1)$, $(1, -1)$. Then normalise the basis to make it orthonormal and recompute the coordinates using dot products only.',
              kind: 'problem',
              difficulty: 1,
              hint: 'In the unnormalised basis the coordinates are $(4, 1)$; in the normalised one, $(4\\sqrt2, \\sqrt2)$.',
            },
            {
              slug: 'adapted-basis-diagonalises',
              title: 'An adapted basis makes a matrix diagonal',
              prompt:
                'Let $A = \\begin{pmatrix} 4 & 1\\\\ 2 & 3 \\end{pmatrix}$ and take the basis $v_1 = (1, 1)$, $v_2 = (1, -2)$. Compute $Av_1$ and $Av_2$, write down $S^{-1}AS$ without multiplying matrices, then confirm by multiplying. Check that the trace and determinant agree.',
              kind: 'problem',
              difficulty: 2,
              hint: '$Av_1 = 5v_1$ and $Av_2 = 2v_2$, so $S^{-1}AS = \\operatorname{diag}(5, 2)$; trace $7$, determinant $10$.',
            },
            {
              slug: 'reflection-two-ways',
              title: 'A reflection in its own basis',
              prompt:
                'Using the basis $v_1 = (1, 2)$, $v_2 = (-2, 1)$ from the worked example, write down the matrix of reflection across the line $y = 2x$ in this basis. Convert it to the standard basis with $S(\\cdot)S^{-1}$ and confirm that you recover the reflection matrix from the previous lesson.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'similarity-invariants',
              title: 'What similarity preserves',
              prompt:
                'Prove that if $B = S^{-1}AS$ then $\\det B = \\det A$, $\\operatorname{tr} B = \\operatorname{tr} A$ and $\\operatorname{rank} B = \\operatorname{rank} A$. For the trace, first prove $\\operatorname{tr}(XY) = \\operatorname{tr}(YX)$. Give two $2 \\times 2$ matrices with the same trace and determinant that are not similar.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Consider $I$ and $\\begin{pmatrix} 1 & 1\\\\ 0 & 1 \\end{pmatrix}$: the only matrix similar to $I$ is $I$.',
            },
          ],
          selfAssessment: [
            {
              question: 'If the columns of $S$ are a basis $B$, how do you get $B$-coordinates of $v$, and the matrix of $A$ in basis $B$?',
              answerOutline: '$[v]_B = S^{-1}v$; the matrix is $S^{-1}AS$.',
            },
            {
              question: 'Name three quantities that similar matrices share.',
              answerOutline: 'Determinant, trace, rank (also eigenvalues and characteristic polynomial).',
            },
            {
              question: 'Why does an orthonormal basis make coordinates easy?',
              answerOutline: '$S^{-1} = S^T$, so each coordinate is the dot product $q_i^T v$.',
            },
          ],
        },
        {
          slug: 'determinants',
          title: 'Determinants: properties, computation and meaning',
          summary:
            'The determinant from three defining properties, computed efficiently by elimination, with its meaning as a volume scale factor and its role as the invertibility test.',
          estimatedMinutes: 130,
          objectives: [
            'State the three defining properties of the determinant and derive the rules for row operations',
            'Compute determinants by elimination and by cofactor expansion',
            'Use $\\det(AB) = \\det A \\det B$ and $\\det A^T = \\det A$',
            'Interpret $|\\det A|$ as the volume scale factor of the map $x \\mapsto Ax$',
            'Explain why Cramer\'s rule and cofactor expansion are impractical for large $n$',
          ],
          concepts: [
            'Determinant defined by properties',
            'Row operations and the determinant',
            'Product of pivots',
            'Cofactor expansion',
            'Product rule $\\det(AB) = \\det A \\det B$',
            'Volume of a parallelepiped',
            'Cramer\'s rule',
          ],
          explanation: `The determinant of a square matrix is the one function with three properties: (1) $\\det I = 1$; (2) swapping two rows changes the sign; (3) it is linear in each row separately when the other rows are held fixed. Everything else follows. If two rows are equal, swapping them changes nothing yet flips the sign, so $\\det = 0$. Adding a multiple of one row to another leaves the determinant unchanged, by linearity in that row plus the equal-rows rule. So elimination preserves the determinant up to the sign of the row swaps, and for a triangular matrix the determinant is the product of the diagonal. Therefore
$$\\det A = \\pm(\\text{product of the pivots}),$$
with the sign $(-1)^{\\text{number of row swaps}}$. This costs about $n^3/3$ operations, and it is how software computes determinants.

From the properties you also get $\\det(AB) = \\det A\\,\\det B$, $\\det A^T = \\det A$ (so column operations work too), $\\det(A^{-1}) = 1/\\det A$, and the fundamental test: $A$ is invertible if and only if $\\det A \\ne 0$. Geometrically, $|\\det A|$ is the volume of the parallelepiped spanned by the columns. It is the factor by which $x \\mapsto Ax$ scales every volume, and the sign records whether orientation is reversed. That is the same factor $|\\det J|$ that appears in a change of variables in a multiple integral.

**Worked example.** Compute $\\det K$ for $K = \\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}$ in two ways.

By elimination, the LU lesson found pivots $2, \\tfrac32, \\tfrac43$ with no row swaps. So $\\det K = 2 \\cdot \\tfrac32 \\cdot \\tfrac43 = 4$.

By **cofactor expansion** along row 1, each entry multiplies the signed determinant of the matrix left after deleting its row and column:
$$\\det K = 2\\begin{vmatrix} 2 & -1\\\\ -1 & 2 \\end{vmatrix} - (-1)\\begin{vmatrix} -1 & -1\\\\ 0 & 2 \\end{vmatrix} + 0 = 2(4 - 1) + (-2 - 0) = 4.$$
The signs alternate $+, -, +$ along the row. Both methods agree, and the answer matches the pattern $\\det K_n = n + 1$.

Cofactor expansion is useful for small matrices, for matrices with many zeros, and for symbolic entries, as in characteristic polynomials. For a general $n \\times n$ matrix it unrolls into $n!$ products, about $2.4 \\times 10^{18}$ for $n = 20$. **Cramer's rule**, $x_i = \\det A_i / \\det A$ where $A_i$ is $A$ with column $i$ replaced by $b$, is a fine formula for theory and for $2 \\times 2$ systems, but a terrible algorithm.

**Pitfall.** $\\det(A + B) \\ne \\det A + \\det B$ in general, and $\\det(cA) = c^n \\det A$, not $c\\det A$. A small determinant also does not mean a matrix is nearly singular. $0.1 I$ in 10 dimensions has determinant $10^{-10}$ and is perfectly well conditioned.`,
          resources: [
            mit1806(U2, 'properties-of-determinants', 'Properties of determinants', 'The three defining properties and everything that follows from them.', true),
            mit1806(U2, 'determinant-formulas-and-cofactors', 'Determinant formulas and cofactors', 'The big formula and cofactor expansion.'),
            ila('determinants-volumes', 'Determinants and Volumes', 'The volume interpretation with interactive figures.'),
            threeBlue('determinant', 'The determinant', 'Determinant as an area or volume scale factor.'),
          ],
          exercises: [
            {
              slug: 'two-ways',
              title: 'A determinant two ways',
              prompt:
                'Compute $\\det\\begin{pmatrix} 1 & 2 & 3\\\\ 4 & 5 & 6\\\\ 7 & 8 & 10 \\end{pmatrix}$ by elimination (as a product of pivots) and by cofactor expansion along the first row. What is the determinant if the last entry is $9$ instead of $10$, and why could you predict that without computing?',
              kind: 'problem',
              difficulty: 1,
              hint: 'The answer is $-3$. With $9$, row 3 is $2R_2 - R_1$, so the determinant is $0$.',
            },
            {
              slug: 'determinant-rules',
              title: 'Consequences of the defining properties',
              prompt:
                'Using only the three defining properties and the product rule, prove: (a) $\\det(cA) = c^n \\det A$ for an $n \\times n$ matrix; (b) $\\det(A^{-1}) = 1/\\det A$; (c) if $A^T = -A$ and $n$ is odd then $\\det A = 0$; (d) if $Q^TQ = I$ then $\\det Q = \\pm 1$. You may use $\\det A^T = \\det A$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'cramer-and-cost',
              title: 'Cramer\'s rule and its cost',
              prompt:
                'Solve $3x + 2y = 7$, $x + 4y = 9$ by Cramer\'s rule. Then estimate the number of multiplications needed to solve a $20 \\times 20$ system by Cramer\'s rule with every determinant expanded by cofactors, compared with elimination, and say how long each would take at $10^{10}$ multiplications per second.',
              kind: 'problem',
              difficulty: 2,
              hint: '$\\det A = 10$ and $(x, y) = (1, 2)$. Cramer with cofactors needs $21$ determinants of roughly $20!$ products each; elimination needs a few thousand multiplications.',
            },
            {
              slug: 'vandermonde-3',
              title: 'The 3 by 3 Vandermonde determinant',
              prompt:
                'Prove that $\\det\\begin{pmatrix} 1 & a & a^2\\\\ 1 & b & b^2\\\\ 1 & c & c^2 \\end{pmatrix} = (b - a)(c - a)(c - b)$ using row operations. Deduce that a quadratic polynomial through three points with distinct $x$-coordinates exists and is unique.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How does software compute $\\det A$, and why not by cofactors?',
              answerOutline: 'By $PA = LU$: $\\det A = \\pm$ product of pivots, about $n^3/3$ operations. Cofactor expansion needs about $n!$ products.',
            },
            {
              question: 'What does $|\\det A|$ measure geometrically, and what does the sign mean?',
              answerOutline: 'The volume of the parallelepiped spanned by the columns, i.e. the volume scale factor of $x \\mapsto Ax$; a negative sign means orientation is reversed.',
            },
            {
              question: 'Is a matrix with a very small determinant nearly singular?',
              answerOutline: 'Not necessarily: $\\det(cI) = c^n$ is tiny for small $c$ yet $cI$ is perfectly conditioned. Conditioning is measured by singular values, not the determinant.',
            },
            {
              question: 'Why does adding a multiple of one row to another leave the determinant unchanged?',
              answerOutline: 'Linearity in that row splits it into $\\det A$ plus $c$ times a determinant with two equal rows, which is zero.',
            },
          ],
        },
      ],
    },
    {
      slug: 'inner-products-and-orthogonality',
      title: 'Inner Products, Norms and Orthogonality',
      description:
        'Measure length and angle with norms and inner products, including weighted and function inner products. Build orthonormal bases by Gram-Schmidt and Householder reflections, factor $A = QR$, and fit data by least squares.',
      lessons: [
        {
          slug: 'norms-and-inner-products',
          title: 'Norms and inner products',
          summary:
            'The axioms of an inner product and a norm, the 1, 2 and infinity norms, weighted and function inner products, and the Cauchy-Schwarz and triangle inequalities.',
          estimatedMinutes: 110,
          objectives: [
            'State the axioms of an inner product and of a norm',
            'Compute the 1, 2 and infinity norms of vectors, and the induced 1 and infinity norms of matrices',
            'Recognise weighted inner products $v^T C w$ and function inner products $\\int f g$',
            'Prove the Cauchy-Schwarz inequality and derive the triangle inequality from it',
            'Compute angles between functions as well as vectors',
          ],
          concepts: [
            'Inner product axioms: bilinear, symmetric, positive',
            'Induced norm $\\|v\\| = \\sqrt{\\langle v, v\\rangle}$',
            '1, 2 and infinity norms',
            'Weighted inner product $v^T C w$',
            'Function inner product on $C[a,b]$',
            'Cauchy-Schwarz inequality',
            'Triangle inequality',
            'Induced matrix norm',
          ],
          explanation: `An **inner product** on a real vector space assigns a number $\\langle v, w\\rangle$ to each pair of vectors. It must be linear in each argument, symmetric ($\\langle v, w\\rangle = \\langle w, v\\rangle$) and positive ($\\langle v, v\\rangle > 0$ for $v \\ne 0$). The dot product $v^T w$ is one inner product. The **weighted** product $\\langle v, w\\rangle = v^T C w$ is another whenever $C$ is symmetric positive definite. With $C$ a stiffness matrix, $\\tfrac12\\langle u, u\\rangle$ is the stored elastic energy. On $C[a,b]$, $\\langle f, g\\rangle = \\int_a^b f(t)g(t)\\,dt$ is an inner product. Each inner product defines a norm $\\|v\\| = \\sqrt{\\langle v, v\\rangle}$ and an angle through $\\cos\\theta = \\langle v, w\\rangle/(\\|v\\|\\|w\\|)$.

That angle makes sense because of the **Cauchy-Schwarz inequality**, $|\\langle v, w\\rangle| \\le \\|v\\|\\,\\|w\\|$, with equality exactly when $v$ and $w$ are parallel. Here is the proof. For real $t$, the quadratic $\\|v - tw\\|^2 = \\|v\\|^2 - 2t\\langle v, w\\rangle + t^2\\|w\\|^2$ is never negative, so its discriminant is at most zero. That discriminant condition is the inequality. Expanding $\\|v + w\\|^2$ and applying Cauchy-Schwarz then gives the **triangle inequality**, $\\|v + w\\| \\le \\|v\\| + \\|w\\|$.

A **norm** in general needs only positivity, $\\|cv\\| = |c|\\,\\|v\\|$, and the triangle inequality. Three norms on $\\mathbb{R}^n$ are standard: $\\|v\\|_1 = \\sum |v_i|$, $\\|v\\|_2 = \\sqrt{\\sum v_i^2}$ and $\\|v\\|_\\infty = \\max |v_i|$. Only the 2-norm comes from an inner product. In finite dimensions all norms are equivalent up to constants; for example, $\\|v\\|_\\infty \\le \\|v\\|_2 \\le \\sqrt n\\,\\|v\\|_\\infty$. A vector norm induces a matrix norm $\\|A\\| = \\max_{x \\ne 0} \\|Ax\\|/\\|x\\|$, the largest stretching factor. The induced 1-norm is the largest absolute column sum, and the induced infinity norm is the largest absolute row sum.

**Worked example.** For $v = (3, -4, 12)$: $\\|v\\|_1 = 3 + 4 + 12 = 19$, $\\|v\\|_2 = \\sqrt{9 + 16 + 144} = 13$ and $\\|v\\|_\\infty = 12$. These satisfy $\\|v\\|_\\infty \\le \\|v\\|_2 \\le \\|v\\|_1$, as they must.

Now the functions $f(t) = 1$ and $g(t) = t$ on $[0, 1]$. Compute $\\langle f, g\\rangle = \\int_0^1 t\\,dt = \\tfrac12$, $\\|f\\|^2 = \\int_0^1 1\\,dt = 1$ and $\\|g\\|^2 = \\int_0^1 t^2\\,dt = \\tfrac13$. So
$$\\cos\\theta = \\frac{1/2}{1 \\cdot (1/\\sqrt3)} = \\frac{\\sqrt3}{2},\\qquad \\theta = 30^\\circ.$$
Cauchy-Schwarz holds, since $\\tfrac12 \\le 1/\\sqrt3 \\approx 0.577$. On $[-1, 1]$ the same two functions are orthogonal, because $\\int_{-1}^1 t\\,dt = 0$. The interval is part of the inner product.

**Pitfall.** Not every symmetric bilinear form is an inner product. $v_1 w_1 - v_2 w_2$ gives $\\langle (0,1), (0,1)\\rangle = -1$, which violates positivity.`,
          resources: [
            ila('dot-product', 'Dot Products and Orthogonality', 'Length, angle and orthogonality in $\\mathbb{R}^n$.'),
            threeBlue('dot-products', 'Dot products and duality', 'Geometric meaning of the dot product.'),
            hefferon('The chapter on maps between spaces and the topic sections give further inner-product examples; full answers are provided.'),
            olver('Optional paid companion with a full chapter on inner products, norms and inequalities, including weighted and function examples.'),
          ],
          exercises: [
            {
              slug: 'three-norms',
              title: 'Three norms and their unit balls',
              prompt:
                'Compute $\\|v\\|_1$, $\\|v\\|_2$ and $\\|v\\|_\\infty$ for $v = (1, -2, 2)$. Sketch the unit balls $\\{x \\in \\mathbb{R}^2 : \\|x\\| \\le 1\\}$ for the three norms on one set of axes, and prove $\\|x\\|_\\infty \\le \\|x\\|_2 \\le \\|x\\|_1 \\le n\\|x\\|_\\infty$ in $\\mathbb{R}^n$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The norms are $5$, $3$ and $2$.',
            },
            {
              slug: 'weighted-angle',
              title: 'Angles in a weighted inner product',
              prompt:
                'Show that $\\langle v, w\\rangle = 2v_1 w_1 + 3v_2 w_2$ is an inner product on $\\mathbb{R}^2$ and find the cosine of the angle between $(1, 0)$ and $(1, 1)$ in it. Find a nonzero vector orthogonal to $(1, 1)$ in this inner product.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The cosine is $2/\\sqrt{10}$; one orthogonal vector is $(3, -2)$.',
            },
            {
              slug: 'orthogonal-polynomials',
              title: 'Orthogonal polynomials on an interval',
              prompt:
                'With $\\langle f, g\\rangle = \\int_{-1}^1 f g\\,dt$, show that $1$, $t$ and $t^2 - \\tfrac13$ are mutually orthogonal and compute their norms. Then compute the angle between $t$ and $t^2$ on $[0, 1]$ instead.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Norms squared: $2$, $\\tfrac23$, $\\tfrac{8}{45}$. On $[0,1]$, $\\cos\\theta = (1/4)/\\sqrt{(1/3)(1/5)} = \\sqrt{15}/4$.',
            },
            {
              slug: 'cauchy-schwarz-proof',
              title: 'Prove Cauchy-Schwarz and the triangle inequality',
              prompt:
                'Prove the Cauchy-Schwarz inequality for a general real inner product using the quadratic $\\|v - tw\\|^2 \\ge 0$, including the equality case. Derive the triangle inequality. Then show that the 1-norm on $\\mathbb{R}^2$ does not come from any inner product by checking the parallelogram law $\\|v + w\\|^2 + \\|v - w\\|^2 = 2\\|v\\|^2 + 2\\|w\\|^2$ on $v = (1, 0)$, $w = (0, 1)$.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'matrix-norms',
              title: 'Induced matrix norms',
              prompt:
                'For $A = \\begin{pmatrix} 1 & -2\\\\ 3 & 4 \\end{pmatrix}$ compute $\\|A\\|_1$ and $\\|A\\|_\\infty$ from the column and row sum rules, and find a vector $x$ with $\\|x\\|_\\infty = 1$ that attains $\\|Ax\\|_\\infty = \\|A\\|_\\infty$. Check $\\|A\\|_2$ with numpy.linalg.norm(A, 2) and confirm it lies between the other two.',
              kind: 'problem',
              difficulty: 2,
              hint: '$\\|A\\|_1 = 6$, $\\|A\\|_\\infty = 7$ attained at $x = (1, 1)$, and $\\|A\\|_2 \\approx 5.117$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What three properties define a real inner product?',
              answerOutline: 'Bilinearity, symmetry, and positivity ($\\langle v, v\\rangle > 0$ for $v \\ne 0$).',
            },
            {
              question: 'Sketch the proof of Cauchy-Schwarz.',
              answerOutline: '$\\|v - tw\\|^2 \\ge 0$ is a quadratic in $t$ that never goes negative, so its discriminant $4\\langle v,w\\rangle^2 - 4\\|v\\|^2\\|w\\|^2 \\le 0$.',
            },
            {
              question: 'When is $v^T C w$ an inner product?',
              answerOutline: 'When $C$ is symmetric positive definite.',
            },
            {
              question: 'How do you compute the induced 1 and infinity norms of a matrix?',
              answerOutline: '1-norm: largest absolute column sum. Infinity norm: largest absolute row sum.',
            },
          ],
        },
        {
          slug: 'orthogonal-bases-and-gram-schmidt',
          title: 'Orthogonal bases, orthogonal matrices and Gram-Schmidt',
          summary:
            'Why orthogonal bases make coordinates trivial, the properties of orthogonal matrices, and the Gram-Schmidt process that turns any basis into an orthonormal one.',
          estimatedMinutes: 120,
          objectives: [
            'Show that nonzero orthogonal vectors are independent',
            'Compute coordinates in an orthogonal basis by inner products',
            'Apply the Gram-Schmidt process to vectors and to polynomials',
            'State and prove the properties of orthogonal matrices',
          ],
          concepts: [
            'Orthogonal and orthonormal sets',
            'Coefficient formula $c_i = \\langle v, v_i\\rangle / \\|v_i\\|^2$',
            'Orthogonal matrix $Q^T Q = I$',
            'Length and angle preservation',
            'Gram-Schmidt process',
            'Classical and modified Gram-Schmidt',
          ],
          explanation: `Vectors $v_1, \\dots, v_k$ are **orthogonal** if $\\langle v_i, v_j\\rangle = 0$ for $i \\ne j$, and **orthonormal** if each also has norm $1$. Nonzero orthogonal vectors are automatically independent. To see this, take the inner product of $\\sum c_j v_j = 0$ with $v_i$: every term but one vanishes, leaving $c_i\\|v_i\\|^2 = 0$. The same calculation gives coordinates without solving any system. If $v = \\sum c_i v_i$ in an orthogonal basis, then
$$c_i = \\frac{\\langle v, v_i\\rangle}{\\|v_i\\|^2}.$$
Fourier series are this formula in a function space.

A square matrix $Q$ with orthonormal columns satisfies $Q^TQ = I$, so $Q^{-1} = Q^T$. It is called an **orthogonal matrix**. Orthogonal matrices preserve inner products, since $(Qx)^T(Qy) = x^Ty$, so they preserve lengths and angles. Their determinant is $\\pm1$. Rotations and reflections are the examples. Because they never amplify errors, orthogonal matrices are the safest tools in numerical work.

**Gram-Schmidt** turns independent vectors $a_1, \\dots, a_n$ into orthonormal $q_1, \\dots, q_n$ with the same nested spans. At step $k$, subtract from $a_k$ its components along the earlier $q$'s, then normalise:
$$v_k = a_k - \\sum_{i<k} \\langle a_k, q_i\\rangle q_i,\\qquad q_k = v_k/\\|v_k\\|.$$

**Worked example.** Orthonormalise $a_1 = (1, 1, 0)$, $a_2 = (1, 0, 1)$ and $a_3 = (0, 1, 1)$.

Step 1: $\\|a_1\\| = \\sqrt2$, so $q_1 = (1, 1, 0)/\\sqrt2$.

Step 2: $\\langle a_2, q_1\\rangle = 1/\\sqrt2$, so $v_2 = a_2 - \\tfrac12(1, 1, 0) = (\\tfrac12, -\\tfrac12, 1)$. Its norm is $\\sqrt{3/2}$, so $q_2 = (1, -1, 2)/\\sqrt6$.

Step 3: $\\langle a_3, q_1\\rangle = 1/\\sqrt2$ and $\\langle a_3, q_2\\rangle = (0 - 1 + 2)/\\sqrt6 = 1/\\sqrt6$. So
$$v_3 = (0, 1, 1) - \\tfrac12(1, 1, 0) - \\tfrac16(1, -1, 2) = (-\\tfrac23, \\tfrac23, \\tfrac23),$$
and $q_3 = (-1, 1, 1)/\\sqrt3$.

Check: $q_1 \\cdot q_2 = (1 - 1 + 0)/\\sqrt{12} = 0$, $q_1 \\cdot q_3 = (-1 + 1)/\\sqrt6 = 0$ and $q_2 \\cdot q_3 = (-1 - 1 + 2)/\\sqrt{18} = 0$.

The same steps work in any inner product space. Applied to $1, t, t^2$ with $\\int_{-1}^{1}$, Gram-Schmidt produces multiples of the Legendre polynomials, the orthogonal functions behind multipole expansions.

**Pitfall.** In floating point, classical Gram-Schmidt as written loses orthogonality when the $a_k$ are nearly dependent. The **modified** version subtracts each projection from the updated vector immediately, and it behaves much better. Householder reflections, in the next lesson, are better still.`,
          resources: [
            mit1806(U2, 'orthogonal-matrices-and-gram-schmidt', 'Orthogonal matrices and Gram-Schmidt', 'The lecture and a worked problem session.', true),
            ila('orthogonal-sets', 'Orthogonal Sets', 'Orthogonal bases, coordinates and Gram-Schmidt with figures.'),
            ila('orthogonal-complements', 'Orthogonal Complements', 'Orthogonal complements and their relation to the four subspaces.'),
          ],
          exercises: [
            {
              slug: 'expand-in-orthogonal-basis',
              title: 'Expand in an orthogonal basis',
              prompt:
                'Check that $(1, 1, 0)$, $(1, -1, 2)$, $(-1, 1, 1)$ are mutually orthogonal and expand $v = (3, 1, 2)$ in this basis using only dot products. Verify by recombining.',
              kind: 'problem',
              difficulty: 1,
              hint: 'The coefficients are $2$, $1$, $0$.',
            },
            {
              slug: 'gram-schmidt-polynomials',
              title: 'Gram-Schmidt on polynomials',
              prompt:
                'Apply Gram-Schmidt (without normalising) to $1, t, t^2$ with $\\langle f, g\\rangle = \\int_0^1 f g\\,dt$. Show that you obtain $1$, $t - \\tfrac12$, $t^2 - t + \\tfrac16$, and compute the norm of each. Check the orthogonality with SymPy.',
              kind: 'problem',
              difficulty: 2,
              hint: '$\\|t - \\tfrac12\\|^2 = \\tfrac1{12}$ and $\\|t^2 - t + \\tfrac16\\|^2 = \\tfrac1{180}$.',
            },
            {
              slug: 'orthogonal-matrix-facts',
              title: 'Properties of orthogonal matrices',
              prompt:
                'Let $Q$ be $n \\times n$ with $Q^TQ = I$. Prove that $QQ^T = I$, that $\\|Qx\\| = \\|x\\|$ for all $x$, that the product of two orthogonal matrices is orthogonal, and that $\\det Q = \\pm 1$. Give an example of a $3 \\times 2$ matrix $Q$ with $Q^TQ = I$ but $QQ^T \\ne I$, and identify $QQ^T$ geometrically.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For a tall $Q$ with orthonormal columns, $QQ^T$ is the projection onto its column space.',
            },
            {
              slug: 'classical-vs-modified',
              title: 'Classical against modified Gram-Schmidt',
              prompt:
                'Implement classical and modified Gram-Schmidt in NumPy. Apply both to the $10 \\times 10$ Hilbert matrix $H_{ij} = 1/(i + j - 1)$ and report $\\|Q^TQ - I\\|_2$ for each and for numpy.linalg.qr. Explain the difference in one paragraph.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Expect classical Gram-Schmidt to lose orthogonality completely (an error of order $1$), modified to keep about five digits (an error near $10^{-5}$), and Householder QR to stay near $10^{-15}$. The condition number of this matrix is about $1.6 \\times 10^{13}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why are nonzero orthogonal vectors independent?',
              answerOutline: 'Taking the inner product of $\\sum c_j v_j = 0$ with $v_i$ leaves $c_i\\|v_i\\|^2 = 0$, so $c_i = 0$.',
            },
            {
              question: 'What does an orthogonal matrix preserve, and what is its inverse?',
              answerOutline: 'Inner products, hence lengths and angles; $Q^{-1} = Q^T$.',
            },
            {
              question: 'In Gram-Schmidt, what is subtracted from $a_k$ at step $k$?',
              answerOutline: 'Its projections $\\langle a_k, q_i\\rangle q_i$ onto all previously found $q_i$, $i < k$.',
            },
          ],
        },
        {
          slug: 'qr-factorisation',
          title: 'The QR factorisation and Householder reflections',
          summary:
            'Gram-Schmidt written as $A = QR$, Householder reflections as the stable way to compute it, and QR as the reliable route to least-squares solutions.',
          estimatedMinutes: 110,
          objectives: [
            'Write the result of Gram-Schmidt as $A = QR$ and compute the entries of $R$',
            'Construct a Householder reflection that maps a vector onto a coordinate axis',
            'Use one Householder step to begin triangularising a matrix',
            'Solve a least-squares problem from $Rx = Q^Tb$',
          ],
          concepts: [
            'Thin (reduced) QR factorisation',
            'Entries $r_{ij} = q_i^T a_j$',
            'Householder reflection $H = I - 2uu^T/u^Tu$',
            'Sign choice to avoid cancellation',
            'Full versus thin QR',
            'Least squares via QR',
          ],
          explanation: `Gram-Schmidt expresses each $a_j$ as a combination of $q_1, \\dots, q_j$: $a_j = r_{1j}q_1 + \\cdots + r_{jj}q_j$, where $r_{ij} = q_i^T a_j$ for $i < j$ and $r_{jj} = \\|v_j\\|$. In matrix form,
$$A = QR,$$
where $Q$ ($m \\times n$) has orthonormal columns and $R$ ($n \\times n$) is upper triangular with positive diagonal. This is the **thin QR factorisation**. It exists whenever the columns of $A$ are independent, and with $r_{jj} > 0$ it is unique.

Software does not use Gram-Schmidt. It applies a sequence of **Householder reflections** to $A$, each one zeroing the entries below the diagonal in one column. For a vector $a$, the reflection
$$H = I - \\frac{2uu^T}{u^Tu},\\qquad u = a + \\operatorname{sign}(a_1)\\|a\\|e_1,$$
maps $a$ to $-\\operatorname{sign}(a_1)\\|a\\|e_1$. The matrix $H$ is symmetric and orthogonal, with $H^2 = I$. The sign is chosen so that $a_1$ and $\\operatorname{sign}(a_1)\\|a\\|$ add rather than cancel. After $n$ reflections, $H_n \\cdots H_1 A = R$, so $Q = H_1 \\cdots H_n$. Because each step is orthogonal, rounding errors are not amplified.

**Worked example.** Factor $A = \\begin{pmatrix} 1 & 1\\\\ 1 & 0\\\\ 0 & 1 \\end{pmatrix}$ and solve the least-squares problem for $b = (1, 2, 3)$.

From the Gram-Schmidt lesson, $q_1 = (1, 1, 0)/\\sqrt2$ and $q_2 = (1, -1, 2)/\\sqrt6$. Then $r_{11} = \\sqrt2$, $r_{12} = q_1^Ta_2 = 1/\\sqrt2$ and $r_{22} = \\|(\\tfrac12, -\\tfrac12, 1)\\| = \\sqrt6/2$, so
$$R = \\begin{pmatrix} \\sqrt2 & 1/\\sqrt2\\\\ 0 & \\sqrt6/2 \\end{pmatrix}.$$
Check the second column: $\\tfrac{1}{\\sqrt2}q_1 + \\tfrac{\\sqrt6}{2}q_2 = (\\tfrac12, \\tfrac12, 0) + (\\tfrac12, -\\tfrac12, 1) = (1, 0, 1)$.

The least-squares solution satisfies $Rx = Q^Tb$, which the next lesson derives. Here $Q^Tb = (3/\\sqrt2,\\ 5/\\sqrt6)$. Back substitution gives $\\tfrac{\\sqrt6}{2}x_2 = 5/\\sqrt6$, so $x_2 = \\tfrac53$. Then $\\sqrt2\\,x_1 + \\tfrac{1}{\\sqrt2}\\cdot\\tfrac53 = \\tfrac{3}{\\sqrt2}$; multiplying by $\\sqrt2$ gives $2x_1 + \\tfrac53 = 3$, so $x_1 = \\tfrac23$. The normal equations give the same answer, $\\hat x = (\\tfrac23, \\tfrac53)$, without forming $A^TA$.

A Householder step by hand: for $a = (3, 4)$, take $u = (3 + 5, 4) = (8, 4)$, so $u^Tu = 80$ and
$$H = I - \\frac{2}{80}\\begin{pmatrix} 64 & 32\\\\ 32 & 16 \\end{pmatrix} = \\begin{pmatrix} -0.6 & -0.8\\\\ -0.8 & 0.6 \\end{pmatrix}.$$
Then $Ha = (-5, 0)$, as promised.

**Pitfall.** NumPy's numpy.linalg.qr may return $R$ with negative diagonal entries. Flipping the sign of a column of $Q$ and the matching row of $R$ gives the positive-diagonal factorisation. Both are correct.`,
          resources: [
            mit1806(U2, 'orthogonal-matrices-and-gram-schmidt', 'Orthogonal matrices and Gram-Schmidt', 'The lecture closes with $A = QR$.', true),
            ila('least-squares', 'The Method of Least Squares', 'Least squares with worked examples, a bridge to the next lesson.'),
            {
              title: 'NumPy linear algebra reference',
              url: 'https://numpy.org/doc/stable/reference/routines.linalg.html',
              type: 'documentation',
              cost: 'free',
              provider: 'NumPy',
              note: 'Documentation for qr, lstsq, solve and norm, used for the checks in this module.',
            },
          ],
          exercises: [
            {
              slug: 'qr-of-three-columns',
              title: 'QR of a 3 by 3 matrix',
              prompt:
                'Use the Gram-Schmidt worked example to write $A = QR$ for $A$ with columns $(1, 1, 0)$, $(1, 0, 1)$, $(0, 1, 1)$. Give all six nonzero entries of $R$ exactly and check $QR = A$ in NumPy.',
              kind: 'problem',
              difficulty: 1,
              hint: '$R = \\begin{pmatrix} \\sqrt2 & 1/\\sqrt2 & 1/\\sqrt2\\\\ 0 & \\sqrt{3/2} & 1/\\sqrt6\\\\ 0 & 0 & 2/\\sqrt3 \\end{pmatrix}$.',
            },
            {
              slug: 'householder-by-hand',
              title: 'A Householder reflection in three dimensions',
              prompt:
                'For $a = (1, 2, 2)$, build the Householder vector $u = a + \\|a\\|e_1$ and verify by hand that $Ha = (-3, 0, 0)$. Show that $H$ is symmetric and that $H^2 = I$ for any nonzero $u$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$u = (4, 2, 2)$, $u^Tu = 24$ and $u^Ta = 12$, so $Ha = a - u$.',
            },
            {
              slug: 'qr-uniqueness',
              title: 'Existence and uniqueness of QR',
              prompt:
                'Prove that if $A$ has independent columns, then Gram-Schmidt never divides by zero, and so $A = QR$ with $R$ invertible. Then prove uniqueness: if $Q_1R_1 = Q_2R_2$ with both $R$ upper triangular with positive diagonal, show $Q_2^TQ_1 = R_2R_1^{-1}$ is both orthogonal and upper triangular with positive diagonal, hence the identity.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the entries of $R$ in $A = QR$ from Gram-Schmidt?',
              answerOutline: '$r_{ij} = q_i^Ta_j$ for $i < j$, $r_{jj} = \\|v_j\\|$ (the norm after subtracting projections), zero below the diagonal.',
            },
            {
              question: 'Why does a Householder vector use $a + \\operatorname{sign}(a_1)\\|a\\|e_1$ rather than $a - \\operatorname{sign}(a_1)\\|a\\|e_1$?',
              answerOutline: 'To avoid subtracting nearly equal numbers in the first component when $a$ is close to a multiple of $e_1$, which would lose accuracy.',
            },
            {
              question: 'How is a least-squares problem solved once $A = QR$ is known?',
              answerOutline: 'Solve the triangular system $R\\hat x = Q^Tb$ by back substitution.',
            },
          ],
        },
        {
          slug: 'least-squares',
          title: 'Least squares and data fitting',
          summary:
            'The best approximate solution of an overdetermined system, from the geometry of projection to the normal equations, with a spring calibration as the worked example and weighted least squares for unequal errors.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the normal equations $A^TA\\hat x = A^Tb$ from orthogonality of the residual',
            'Fit straight lines and polynomials to measured data by hand',
            'Form the projection matrix $P = A(A^TA)^{-1}A^T$ and state its properties',
            'Set up weighted least squares $A^TCA\\hat x = A^TCb$ when measurements have different precision',
            'Explain when the normal equations are numerically risky and QR is preferred',
          ],
          concepts: [
            'Overdetermined system',
            'Residual $r = b - A\\hat x$',
            'Normal equations',
            'Projection onto $C(A)$',
            'Projection matrix',
            'Line and polynomial fitting',
            'Weighted least squares',
            'Squaring the condition number',
          ],
          explanation: `More equations than unknowns usually means no exact solution, since measured data never fit a model perfectly. **Least squares** chooses $\\hat x$ to minimise $\\|b - Ax\\|^2$. The geometry gives the answer. $A\\hat x$ must be the point of the column space nearest $b$, which is the orthogonal projection of $b$ onto $C(A)$. So the residual $r = b - A\\hat x$ is perpendicular to every column of $A$: $A^T(b - A\\hat x) = 0$. Rearranged, these are the **normal equations**
$$A^TA\\,\\hat x = A^Tb.$$
When the columns of $A$ are independent, $A^TA$ is invertible, so $\\hat x$ is unique. The projection is $p = A\\hat x = Pb$, with $P = A(A^TA)^{-1}A^T$. This matrix satisfies $P^2 = P$ and $P^T = P$. Calculus gives the same equations: setting the gradient of $\\|b - Ax\\|^2$ to zero yields $2A^TAx - 2A^Tb = 0$.

**Worked example: calibrating a spring.** Hanging loads $F = 0, 1, 2, 3$ N on a spring gives measured lengths $L = 10.0, 10.6, 11.1, 11.8$ cm. Hooke's law predicts $L = c_0 + c_1F$, where $c_0$ is the natural length and $c_1 = 1/k$. The four equations $c_0 + c_1F_i = L_i$ have
$$A = \\begin{pmatrix} 1 & 0\\\\ 1 & 1\\\\ 1 & 2\\\\ 1 & 3 \\end{pmatrix},\\quad A^TA = \\begin{pmatrix} 4 & 6\\\\ 6 & 14 \\end{pmatrix},\\quad A^Tb = \\begin{pmatrix} 43.5\\\\ 68.2 \\end{pmatrix}.$$
The determinant of $A^TA$ is $56 - 36 = 20$, so
$$c_0 = \\frac{14(43.5) - 6(68.2)}{20} = 9.99,\\qquad c_1 = \\frac{4(68.2) - 6(43.5)}{20} = 0.59.$$
The fitted natural length is $9.99$ cm and the compliance is $0.59$ cm/N, so $k \\approx 1.7$ N/cm, or about $170$ N/m. The residuals $L_i - (c_0 + c_1F_i)$ are $0.01, 0.02, -0.07, 0.04$. They sum to zero, which is orthogonality to the column of ones, and $\\sum F_i r_i = 0 + 0.02 - 0.14 + 0.12 = 0$, which is orthogonality to the second column. Always run these two checks.

**Weighted least squares.** If measurement $i$ has standard deviation $\\sigma_i$, minimise $\\sum (b_i - (Ax)_i)^2/\\sigma_i^2$ instead. With $C = \\operatorname{diag}(1/\\sigma_i^2)$, the normal equations become $A^TCA\\,\\hat x = A^TCb$. This is the first appearance of $A^TCA$, the matrix that runs through the next module.

**Pitfall.** Forming $A^TA$ squares the condition number. For polynomial fits of high degree, or columns that are nearly dependent, solve with QR ($R\\hat x = Q^Tb$) or numpy.linalg.lstsq instead. By hand and for small, well-separated columns, the normal equations are fine.`,
          resources: [
            mit1806(U2, 'projection-matrices-and-least-squares', 'Projection matrices and least squares', 'Fitting a line with projections and normal equations.', true),
            mit1806(U2, 'projections-onto-subspaces', 'Projections onto subspaces', 'The projection matrix and its properties.'),
            ila('least-squares', 'The Method of Least Squares', 'Worked fitting examples with interactive figures.'),
            ila('projections', 'Orthogonal Projection', 'Projection onto subspaces, the geometric core of least squares.'),
          ],
          exercises: [
            {
              slug: 'line-fit',
              title: 'Fit a line by hand',
              prompt:
                'Fit $y = c_0 + c_1x$ to the points $(0, 1)$, $(1, 2)$, $(2, 2)$, $(3, 4)$ by the normal equations. Compute the residuals and check both orthogonality conditions. Confirm with numpy.linalg.lstsq.',
              kind: 'problem',
              difficulty: 1,
              hint: '$c_0 = c_1 = 0.9$; the residuals are $0.1, 0.2, -0.7, 0.4$.',
            },
            {
              slug: 'projection-matrix',
              title: 'Projection matrices',
              prompt:
                'Prove that $P = A(A^TA)^{-1}A^T$ satisfies $P^2 = P$ and $P^T = P$, and that $I - P$ projects onto $N(A^T)$. Compute $P$ when $A$ is the single column $(1, 1, 1)$ and describe $Pb$ in words.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For $A = (1, 1, 1)^T$, $P$ is the $3 \\times 3$ matrix with every entry $\\tfrac13$, and $Pb$ replaces each entry of $b$ by the mean.',
            },
            {
              slug: 'weighted-fit',
              title: 'A weighted fit',
              prompt:
                'In the spring example, suppose the last measurement came from a worse ruler with twice the standard deviation of the others. Set up the weighted normal equations with weights $1, 1, 1, \\tfrac14$, solve them, and compare $c_0$ and $c_1$ with the unweighted fit. Derive the weighted normal equations by minimising $\\sum w_i r_i^2$.',
              kind: 'problem',
              difficulty: 2,
              hint: '$A^TCA = \\begin{pmatrix} 3.25 & 3.75\\\\ 3.75 & 7.25 \\end{pmatrix}$ and $A^TCb = (34.65, 41.65)$, giving $c_0 \\approx 10.003$ and $c_1 \\approx 0.571$.',
            },
            {
              slug: 'normal-equations-fail',
              title: 'When the normal equations fail',
              prompt:
                'Generate $x_i = i/20$ for $i = 0, \\dots, 20$ and $y_i = \\cos(4x_i)$. Fit polynomials of degree $5$, $10$ and $15$ by (a) solving the normal equations with numpy.linalg.solve, (b) numpy.linalg.qr, (c) numpy.linalg.lstsq. Report the residual norm and the condition numbers of $A$ and $A^TA$ for each degree, and explain the pattern.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The condition number of $A^TA$ is the square of that of $A$; once it nears $10^{16}$ the normal-equation solution degrades.',
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the normal equations geometrically in one line.',
              answerOutline: 'The residual $b - A\\hat x$ is orthogonal to $C(A)$, so $A^T(b - A\\hat x) = 0$.',
            },
            {
              question: 'What two checks should residuals of a straight-line fit pass?',
              answerOutline: 'They sum to zero (orthogonal to the column of ones) and $\\sum x_i r_i = 0$ (orthogonal to the $x$ column).',
            },
            {
              question: 'How do the normal equations change for measurements with standard deviations $\\sigma_i$?',
              answerOutline: '$A^TCA\\hat x = A^TCb$ with $C = \\operatorname{diag}(1/\\sigma_i^2)$.',
            },
            {
              question: 'Why can the normal equations be inaccurate in floating point?',
              answerOutline: 'Forming $A^TA$ squares the condition number, so digits are lost that QR would keep.',
            },
          ],
        },
      ],
      project: {
        slug: 'calibration-by-least-squares',
        title: 'Calibrating a sensor by least squares',
        description: `A thermistor's resistance $R$ depends on temperature $T$ (in kelvin) through the Steinhart-Hart model $1/T = a + b\\ln R + c(\\ln R)^3$. It is nonlinear in $T$ and $R$, but linear in the unknown coefficients $a, b, c$. Calibrating a sensor this way is a standard engineering use of least squares.

Generate or collect calibration data. If you have a thermistor and a thermometer, measure 8 to 12 points between about $0^\\circ$C and $80^\\circ$C. Otherwise, use a manufacturer's resistance-temperature table for a $10\\ \\text{k}\\Omega$ NTC thermistor and add your own simulated noise. Fit the model three ways, check the geometry of the fit, and report the result in the form an engineer would use.`,
        deliverables: [
          'The design matrix written out and the normal equations for a reduced three-point problem solved by hand',
          'A thin QR factorisation of the full design matrix computed with your own modified Gram-Schmidt, checked against numpy.linalg.qr',
          'Fitted coefficients from the normal equations, from QR and from numpy.linalg.lstsq, with the condition numbers of $A$ and $A^TA$, and an explanation of any differences',
          'A residual plot in kelvin, with numerical checks that the residual is orthogonal to every column of $A$',
          'A weighted fit in which points near the ends of the range get lower weight, with a paragraph on how the coefficients and residuals change',
        ],
        estimatedHours: 8,
        stretchGoals: [
          'Compare with the simpler beta-parameter model $1/T = 1/T_0 + (1/\\beta)\\ln(R/R_0)$ and decide which the data support',
          'Estimate the uncertainty of the fitted coefficients from the residual variance and $(A^TA)^{-1}$',
        ],
      },
    },
    {
      slug: 'equilibrium',
      title: 'Equilibrium',
      description:
        'Mechanical and electrical equilibrium share one structure, $A^TCA\\,u = f$: a difference or geometry matrix $A$, a diagonal matrix $C$ of physical constants, and a balance law $A^T$. Learn why such matrices are positive definite, why equilibrium minimises energy, and apply the framework to spring chains, resistor networks and trusses.',
      lessons: [
        {
          slug: 'positive-definite-matrices-and-minimisation',
          title: 'Positive definite matrices and minimisation',
          summary:
            'The tests for positive definiteness, the Cholesky factorisation, and the minimum principle: the solution of $Ku = f$ minimises $\\tfrac12u^TKu - u^Tf$ exactly when $K$ is positive definite.',
          estimatedMinutes: 120,
          objectives: [
            'Test a symmetric matrix for positive definiteness by pivots, leading minors and eigenvalues',
            'Show that $A^TCA$ is positive definite when $A$ has independent columns and $C$ is positive diagonal',
            'Prove that $Ku = f$ is the unique minimiser of $P(u) = \\tfrac12u^TKu - u^Tf$ for positive definite $K$',
            'Compute a Cholesky factorisation $K = LL^T$ by hand for a small matrix',
            'Recognise semidefinite and indefinite cases and what they mean physically',
          ],
          concepts: [
            'Quadratic form $x^TKx$',
            'Positive definite and semidefinite',
            'Pivot test and leading-minor test',
            'Gram matrix $A^TA$ and $A^TCA$',
            'Cholesky factorisation',
            'Minimum principle',
            'Completing the square as $LDL^T$',
          ],
          explanation: `A symmetric matrix $K$ is **positive definite** if $x^TKx > 0$ for every $x \\ne 0$. For symmetric $K$, these tests are equivalent:

1. all pivots are positive, with no row exchanges;
2. all leading principal minors $\\det K_{1:k,1:k}$ are positive;
3. all eigenvalues are positive;
4. $K = A^TA$ for some $A$ with independent columns.

Test 4 is the one physics hands you, in the form $K = A^TCA$ with $C$ diagonal and positive. The proof is one line: $x^TA^TCAx = (Ax)^TC(Ax) = \\sum_i c_i (Ax)_i^2 \\ge 0$, with equality only if $Ax = 0$, hence only if $x = 0$. If $A$ has dependent columns, $K$ is only **semidefinite**, and the null-space vectors are the motions that cost no energy.

**The minimum principle.** For positive definite $K$, define $P(u) = \\tfrac12u^TKu - u^Tf$. Let $u^*$ solve $Ku^* = f$. Then for every $u$,
$$P(u) - P(u^*) = \\tfrac12(u - u^*)^TK(u - u^*) \\ge 0,$$
with equality only at $u = u^*$. Equilibrium is the state of minimum potential energy: strain energy $\\tfrac12u^TKu$ minus the work $u^Tf$ done by the loads. The minimum value is $P(u^*) = -\\tfrac12 u^{*T}f$. If $K$ has a negative eigenvalue, $P$ has no minimum at all, and a structure with such a $K$ would buckle or collapse.

**Worked example.** Let $K = \\begin{pmatrix} 2 & -1\\\\ -1 & 2 \\end{pmatrix}$ and $f = (1, 1)$. The pivots are $2$ and $2 - \\tfrac12 = \\tfrac32$. The leading minors are $2$ and $3$. Both tests pass. Completing the square shows where the pivots come from:
$$x^TKx = 2x_1^2 - 2x_1x_2 + 2x_2^2 = 2\\left(x_1 - \\tfrac12x_2\\right)^2 + \\tfrac32x_2^2.$$
The coefficients outside the squares are the pivots, and the $-\\tfrac12$ inside is the multiplier $\\ell_{21}$. This is $K = LDL^T$ written as a sum of squares. Solving $Ku = f$ gives $u^* = (1, 1)$, so the minimum energy is $P(u^*) = -\\tfrac12(1 + 1) = -1$. The **Cholesky factor** is $L\\sqrt{D}$: here $K = GG^T$ with $G = \\begin{pmatrix} \\sqrt2 & 0\\\\ -1/\\sqrt2 & \\sqrt{3/2} \\end{pmatrix}$.

Compare $\\begin{pmatrix} 1 & 2\\\\ 2 & 1 \\end{pmatrix}$. Its pivots are $1$ and $-3$, and $x = (1, -1)$ gives $x^TKx = 1 - 4 + 1 = -2$. It is **indefinite**: $P$ is a saddle with no minimum, even though every entry is positive.

**Pitfall.** Positive entries do not make a matrix positive definite, and negative off-diagonal entries do not prevent it. Use one of the four tests.`,
          resources: [
            mit1806(U3, 'symmetric-matrices-and-positive-definiteness', 'Symmetric matrices and positive definiteness', 'The tests and their equivalence.', true),
            mit1806(U3, 'positive-definite-matrices-and-minima', 'Positive definite matrices and minima', 'Quadratic forms, minima and the second-derivative test.'),
            mit18085('The opening lectures present positive definiteness and the minimum principle as the foundation for equilibrium.'),
          ],
          exercises: [
            {
              slug: 'which-are-definite',
              title: 'Which are positive definite?',
              prompt:
                'Classify each symmetric matrix as positive definite, positive semidefinite or indefinite, using two different tests for each: $\\begin{pmatrix} 4 & 2\\\\ 2 & 3 \\end{pmatrix}$, $\\begin{pmatrix} 1 & 2\\\\ 2 & 4 \\end{pmatrix}$, $\\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 1 \\end{pmatrix}$, $\\begin{pmatrix} 1 & 2 & 0\\\\ 2 & 1 & 0\\\\ 0 & 0 & 3 \\end{pmatrix}$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Leading minors: $4, 8$; $1, 0$ (semidefinite); $2, 3, 1$; $1, -3, -9$ (indefinite).',
            },
            {
              slug: 'parameter-range',
              title: 'A parameter range',
              prompt:
                'For which real $b$ is $\\begin{pmatrix} 1 & b\\\\ b & 9 \\end{pmatrix}$ positive definite? Sketch the level curve $x^TKx = 1$ for $b = 0$, $b = 2$ and $b = 3$ and describe how it changes as $b$ approaches the boundary of the range.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Positive definite iff $|b| < 3$. At $|b| = 3$ the ellipse opens into two parallel lines.',
            },
            {
              slug: 'cholesky-by-hand',
              title: 'Cholesky by hand',
              prompt:
                'Find the Cholesky factor $G$ (lower triangular, positive diagonal) with $GG^T = \\begin{pmatrix} 4 & 2\\\\ 2 & 3 \\end{pmatrix}$. Use it to solve $Kx = (2, 3)$ by two triangular solves. Check with numpy.linalg.cholesky.',
              kind: 'problem',
              difficulty: 2,
              hint: '$G = \\begin{pmatrix} 2 & 0\\\\ 1 & \\sqrt2 \\end{pmatrix}$ and $x = (0, 1)$.',
            },
            {
              slug: 'gram-is-definite',
              title: 'When the stiffness matrix is definite',
              prompt:
                'Let $A$ be $m \\times n$ and $C$ diagonal with positive entries. Prove that $A^TCA$ is symmetric positive semidefinite, that its null space equals $N(A)$, and hence that it is positive definite if and only if $A$ has independent columns. Then prove the minimum principle identity $P(u) - P(u^*) = \\tfrac12(u - u^*)^TK(u - u^*)$.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'List four equivalent tests for a symmetric matrix to be positive definite.',
              answerOutline: 'Positive pivots; positive leading principal minors; positive eigenvalues; $K = A^TA$ with independent columns. (Also $x^TKx > 0$ for $x \\ne 0$.)',
            },
            {
              question: 'What does the minimum principle say, and what is the minimum value?',
              answerOutline: 'For positive definite $K$, $u^* = K^{-1}f$ minimises $\\tfrac12u^TKu - u^Tf$; the minimum is $-\\tfrac12f^TK^{-1}f = -\\tfrac12u^{*T}f$.',
            },
            {
              question: 'What does a null vector of a semidefinite stiffness matrix represent physically?',
              answerOutline: 'A displacement that stretches no spring or bar: a rigid-body motion or a mechanism, costing zero energy.',
            },
          ],
        },
        {
          slug: 'mass-spring-chains',
          title: 'Mass-spring chains and the A-transpose-C-A framework',
          summary:
            'Assemble the stiffness matrix of a line of masses and springs as $K = A^TCA$ from three physical laws, and see how fixed-fixed, fixed-free and free-free supports change the matrix and its null space.',
          estimatedMinutes: 120,
          objectives: [
            'Write the elongation matrix $A$ for a spring chain with given supports',
            'Combine $e = Au$, $y = Ce$ and $f = A^Ty$ into $Ku = f$ with $K = A^TCA$',
            'Distinguish statically determinate chains (square invertible $A$) from indeterminate ones',
            'Explain why a free-free chain has a singular $K$ and state its solvability condition',
          ],
          concepts: [
            'Displacements $u$, elongations $e$, spring forces $y$',
            'Elongation matrix $A$',
            'Hooke\'s law $y = Ce$',
            'Force balance $f = A^Ty$',
            'Stiffness matrix $K = A^TCA$',
            'Fixed-fixed, fixed-free, free-free',
            'Statically determinate and indeterminate',
            'Rigid-body motion',
          ],
          explanation: `Hang $n$ masses in a vertical line, joined by springs, and measure displacements $u_1, \\dots, u_n$ downward. Three laws produce the equations.

1. **Geometry.** Spring $i$ joins mass $i - 1$ above to mass $i$ below, so its elongation is $e_i = u_i - u_{i-1}$. A fixed support has displacement $0$. In matrix form, $e = Au$, where $A$ is a difference matrix.
2. **Material.** Hooke's law gives the tension $y_i = c_i e_i$, so $y = Ce$ with $C = \\operatorname{diag}(c_i)$.
3. **Balance.** Mass $j$ is pulled up by $y_j$ from the spring above and down by $y_{j+1}$ from the spring below, plus its external load $f_j$. Equilibrium says $f_j = y_j - y_{j+1}$, which is exactly $f = A^Ty$.

Together these give $A^TCA\\,u = f$, so $K = A^TCA$. The transpose appearing in step 3 is not a coincidence. It is the principle of virtual work, and it is why $K$ is symmetric.

The supports decide the shape of $A$. **Fixed-free**, with the top attached and the bottom hanging, has $n$ springs, and $A$ is square and invertible. Then $A^Ty = f$ alone gives the spring forces. Such a chain is **statically determinate**: forces come from balance, and stiffness only matters for the displacements. **Fixed-fixed** has $n + 1$ springs, and $A$ is $(n + 1) \\times n$ with independent columns. You must solve $Ku = f$ before you know any force, so the chain is statically indeterminate. **Free-free** has $n - 1$ springs, and $A$ has the null space $(1, \\dots, 1)$. Then $K$ is singular, the whole chain can translate at no cost, and $Ku = f$ is solvable only if the loads balance: $\\sum f_j = 0$.

**Worked example.** A fixed-free chain has three $1$ kg masses and springs $c = (300, 200, 100)$ N/m from the top. With $g = 9.8$ m/s$^2$, $f = (9.8, 9.8, 9.8)$ N. Then
$$A = \\begin{pmatrix} 1 & 0 & 0\\\\ -1 & 1 & 0\\\\ 0 & -1 & 1 \\end{pmatrix},\\quad K = A^TCA = \\begin{pmatrix} 500 & -200 & 0\\\\ -200 & 300 & -100\\\\ 0 & -100 & 100 \\end{pmatrix}.$$
Because $A$ is invertible, solve $A^Ty = f$ from the bottom up. The bottom spring holds one mass, $y_3 = 9.8$ N. The next holds two, $y_2 = 19.6$ N. The top holds all three, $y_1 = 29.4$ N. The elongations $e = C^{-1}y$ are $29.4/300$, $19.6/200$ and $9.8/100$, which all equal $0.098$ m. Summing down the chain, $u = A^{-1}e = (0.098, 0.196, 0.294)$ m. Check the middle row of $Ku$: $-200(0.098) + 300(0.196) - 100(0.294) = -19.6 + 58.8 - 29.4 = 9.8$.

**Pitfall.** Signs follow from one convention: down is positive, and tension is positive. If your $K$ comes out unsymmetric or with a negative diagonal entry, a sign in $A$ or in the balance equation is wrong.`,
          resources: [
            mit18085('Strang\'s treatment of springs and masses as $A^TCA$ is the model for this lesson; use the lecture videos and notes on the course site.', true),
            mit1806(U3, 'symmetric-matrices-and-positive-definiteness', 'Symmetric matrices and positive definiteness', 'Background on why $A^TCA$ is positive definite.'),
            {
              title: 'OpenStax University Physics Volume 1: Conditions for Static Equilibrium',
              url: 'https://openstax.org/books/university-physics-volume-1/pages/12-1-conditions-for-static-equilibrium',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Physics refresher on force balance and free-body diagrams.',
            },
          ],
          exercises: [
            {
              slug: 'fixed-fixed-chain',
              title: 'A fixed-fixed chain under gravity',
              prompt:
                'Three equal masses $m$ hang between a ceiling and a floor, connected by four equal springs of stiffness $c$. Write $A$ ($4 \\times 3$), form $K = A^TCA$, and solve $Ku = mg(1, 1, 1)$. Find all four spring forces and say which springs are stretched and which compressed. Check that the support reactions add up to $3mg$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$u = \\tfrac{mg}{c}(\\tfrac32, 2, \\tfrac32)$ and $y = mg(\\tfrac32, \\tfrac12, -\\tfrac12, -\\tfrac32)$.',
            },
            {
              slug: 'free-free-chain',
              title: 'A free-free chain',
              prompt:
                'Three masses are joined by two unit springs with both ends free. Write $A$ and $K$, find $N(K)$, and state the condition on $f$ for $Ku = f$ to be solvable. Solve for $f = (-1, 0, 1)$ and describe the complete solution physically.',
              kind: 'problem',
              difficulty: 2,
              hint: '$K = \\begin{pmatrix} 1 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 1 \\end{pmatrix}$, solvable iff $f_1 + f_2 + f_3 = 0$, and $u = (-1, 0, 1) + \\alpha(1, 1, 1)$.',
            },
            {
              slug: 'determinate-chain',
              title: 'Why fixed-free is determinate',
              prompt:
                'Prove that for a fixed-free chain with $n$ springs, $A$ is invertible, and that the spring forces are $y_i = f_i + f_{i+1} + \\cdots + f_n$ regardless of the stiffnesses. Then show that $K^{-1} = A^{-1}C^{-1}A^{-T}$ has all entries positive, and interpret that physically.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'long-chain',
              title: 'A long chain and its continuum limit',
              prompt:
                'For a fixed-fixed chain of $n$ equal masses and $n + 1$ equal springs under gravity, prove that $u_j = \\frac{mg}{c}\\cdot\\frac{j(n + 1 - j)}{2}$ by substituting into $Ku = f$. Check it numerically for $n = 100$, and compare the shape with the parabola $u(x) \\propto x(L - x)$ of a hanging elastic bar.',
              kind: 'problem',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Name the three physical laws behind $A^TCA\\,u = f$ for a spring chain and the matrix each contributes.',
              answerOutline: 'Geometry $e = Au$ (difference matrix $A$), Hooke $y = Ce$ (diagonal $C$), balance $f = A^Ty$ ($A^T$).',
            },
            {
              question: 'Why can the forces in a fixed-free chain be found without knowing the spring constants?',
              answerOutline: '$A$ is square and invertible, so $A^Ty = f$ determines $y$ directly; the chain is statically determinate.',
            },
            {
              question: 'When does a free-free chain have a static solution, and how unique is it?',
              answerOutline: 'Only if the loads sum to zero ($f \\perp (1, \\dots, 1)$); the solution is unique up to adding a rigid translation.',
            },
          ],
        },
        {
          slug: 'electrical-networks',
          title: 'Electrical networks',
          summary:
            'Resistor networks in the same framework: incidence matrix, conductances and Kirchhoff\'s current law give $A^TCA\\,u = s$, with a balanced Wheatstone bridge as the worked example.',
          estimatedMinutes: 120,
          objectives: [
            'Set up the node equations of a resistor network as $A^TCA\\,u = s$',
            'Ground a node to remove the null space and solve for potentials',
            'Compute edge currents and effective resistance from the potentials',
            'Include voltage sources in edges through $y = C(b - Au)$',
            'Relate the power dissipated to the quadratic form $u^TKu$',
          ],
          concepts: [
            'Node potentials and edge currents',
            'Conductance matrix $C$',
            'Graph Laplacian $A^TA$',
            'Weighted Laplacian $A^TCA$',
            'Grounding',
            'Effective resistance',
            'Balanced bridge',
            'Power $u^TKu$',
          ],
          explanation: `Use the incidence matrix $A$ from the vector-spaces module: row $k$ has $-1$ at the start node of edge $k$ and $+1$ at its end. Let $u$ be the node potentials and $y$ the edge currents, positive from start to end. The three laws are the same as for springs.

1. **Potential drop** across edge $k$: $u_{\\text{start}} - u_{\\text{end}} = -(Au)_k$.
2. **Ohm's law** with conductances $c_k = 1/R_k$: $y = -CAu$.
3. **Kirchhoff's current law**: $(A^Ty)_j$ is the current flowing into node $j$ through the edges. If a source injects current $s_j$ at node $j$ from outside, conservation gives $A^Ty = -s$.

Combining, $A^TCA\\,u = s$. With all $c_k = 1$, the matrix $A^TA$ is the **graph Laplacian**: node degrees on the diagonal and $-1$ for each edge off the diagonal. For a connected network it is singular with null space the constants, as before. **Grounding** one node ($u = 0$ there) deletes its row and column and leaves a positive definite system. A battery of $b_k$ volts in edge $k$, driving current from start to end, changes Ohm's law to $y = C(b - Au)$, and the equations become $A^TCA\\,u = s + A^TCb$.

**Worked example: a Wheatstone bridge.** Take the five-edge network $1 \\to 2$, $1 \\to 3$, $2 \\to 3$, $2 \\to 4$, $3 \\to 4$ with every resistance $1\\ \\Omega$. Inject $1$ A at node 1, take it out at node 4, and ground node 4. The Laplacian is
$$A^TA = \\begin{pmatrix} 2 & -1 & -1 & 0\\\\ -1 & 3 & -1 & -1\\\\ -1 & -1 & 3 & -1\\\\ 0 & -1 & -1 & 2 \\end{pmatrix}.$$
Delete row and column 4 and solve with $s = (1, 0, 0)$:
$$2u_1 - u_2 - u_3 = 1,\\quad -u_1 + 3u_2 - u_3 = 0,\\quad -u_1 - u_2 + 3u_3 = 0.$$
Subtracting the last two equations gives $4u_2 - 4u_3 = 0$, so $u_2 = u_3$. Then $-u_1 + 2u_2 = 0$ gives $u_1 = 2u_2$, and the first equation gives $4u_2 - 2u_2 = 1$. So $u = (1, \\tfrac12, \\tfrac12, 0)$ V.

The currents $y = -Au$ are $\\tfrac12, \\tfrac12, 0, \\tfrac12, \\tfrac12$ A. The bridge edge $2 \\to 3$ carries nothing, because its ends are at equal potential. The **effective resistance** between nodes 1 and 4 is $u_1/1\\text{ A} = 1\\ \\Omega$, the same as two parallel paths of $2\\ \\Omega$ each. Check the power: $\\sum R_ky_k^2 = 4 \\cdot \\tfrac14 = 1$ W, which equals $u_1 \\times 1$ A.

That last check is general. With no batteries, the power dissipated is $y^TC^{-1}y = u^TA^TCAu = u^TKu = u^Ts$. The currents also minimise dissipated power among all flows obeying Kirchhoff's law (Thomson's principle), the electrical form of the minimum principle.

**Pitfall.** Do not try to solve with the ungrounded Laplacian. It is singular, and numerical solvers will either fail or return a meaningless answer.`,
          resources: [
            mit1806(U1, 'graphs-networks-incidence-matrices', 'Graphs, networks, incidence matrices', 'Strang builds $A^TCA$ for a network at the end of this lecture.', true),
            mit18085('The network lectures develop the graph Laplacian, grounding and the equilibrium equations for circuits.'),
            {
              title: 'OpenStax University Physics Volume 2: Resistors in Series and Parallel',
              url: 'https://openstax.org/books/university-physics-volume-2/pages/10-2-resistors-in-series-and-parallel',
              type: 'textbook',
              cost: 'free',
              provider: 'OpenStax',
              note: 'Use the series and parallel formulas to check effective resistances computed from $A^TCA$.',
            },
          ],
          exercises: [
            {
              slug: 'unbalanced-bridge',
              title: 'Unbalance the bridge',
              prompt:
                'In the worked example, change the conductance of edge $1 \\to 2$ to $2$ S (resistance $\\tfrac12\\ \\Omega$), keeping the others at $1$ S. Solve for the potentials with the same source and ground, find all five currents, the current through the bridge edge, and the effective resistance between nodes 1 and 4. Verify Kirchhoff\'s current law at every node.',
              kind: 'problem',
              difficulty: 2,
              hint: '$u = (\\tfrac{11}{13}, \\tfrac{7}{13}, \\tfrac{6}{13}, 0)$, the bridge carries $\\tfrac1{13}$ A from node 2 to node 3, and $R_{\\text{eff}} = \\tfrac{11}{13}\\ \\Omega$.',
            },
            {
              slug: 'series-and-parallel',
              title: 'Series and parallel from the Laplacian',
              prompt:
                'Using $A^TCA$, derive the effective resistance of (a) two resistors $R_1$, $R_2$ in series (three nodes, two edges) and (b) the same two in parallel (two nodes, two edges). Ground one end and inject $1$ A at the other.',
              kind: 'derivation',
              difficulty: 1,
            },
            {
              slug: 'laplacian-properties',
              title: 'Properties of the weighted Laplacian',
              prompt:
                'Prove that for a connected network with positive conductances, $K = A^TCA$ is positive semidefinite with null space spanned by $(1, \\dots, 1)$, and that deleting the row and column of any one node leaves a positive definite matrix. Then prove $u^TKu = \\sum_k c_k(u_{\\text{end}(k)} - u_{\\text{start}(k)})^2$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'resistor-grid',
              title: 'Effective resistance of a grid',
              prompt:
                'Build the incidence matrix of a square grid of unit resistors with $N$ nodes on each side ($N^2$ nodes) in NumPy. Ground one corner, inject $1$ A at the opposite corner, and compute the effective resistance for $N = 2, 4, 8, 16, 32$. Check $N = 2$ (a single square) by hand, and describe how the resistance grows with $N$.',
              kind: 'coding',
              difficulty: 3,
              hint: 'For a single square, the two paths of $2\\ \\Omega$ in parallel give $1\\ \\Omega$. The growth for large $N$ is logarithmic.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write the three steps that turn a resistor network into $A^TCA\\,u = s$.',
              answerOutline: 'Potential drops $-Au$; Ohm $y = -CAu$; Kirchhoff $A^Ty = -s$ for injected currents $s$. Combine to $A^TCAu = s$.',
            },
            {
              question: 'Why must a node be grounded, and what does grounding do to the matrix?',
              answerOutline: 'The Laplacian has the constant vector in its null space; fixing one potential deletes that row and column and makes the matrix positive definite.',
            },
            {
              question: 'How do you get the effective resistance between two nodes from the solution?',
              answerOutline: 'Inject 1 A at one node with the other grounded; the effective resistance is the potential at the injection node.',
            },
          ],
        },
        {
          slug: 'trusses',
          title: 'Plane trusses',
          summary:
            'Pin-jointed bars in the plane: build the elongation matrix from bar directions, find bar forces and joint displacements, and use the null space of $A$ to detect mechanisms.',
          estimatedMinutes: 130,
          objectives: [
            'Write the rows of $A$ for a plane truss from the unit direction of each bar',
            'Find bar forces from $A^Ty = f$ for a statically determinate truss',
            'Compute joint displacements from bar elongations with $c_i = E_iA_i/L_i$',
            'Detect mechanisms as nonzero vectors in $N(A)$ and fix them with added bars',
            'Count unknowns and bars to classify a truss as unstable, determinate or indeterminate',
          ],
          concepts: [
            'Pin-jointed truss',
            'Bar direction cosines',
            'Elongation $e = Au$ to first order',
            'Bar stiffness $EA/L$',
            'Tension and compression',
            'Mechanism and rigid motion',
            'Statically determinate and indeterminate trusses',
          ],
          explanation: `A plane truss is a set of straight bars joined by frictionless pins. Each free joint has two displacement unknowns, $(u_x, u_y)$. Supported joints have none. For a bar from joint $i$ to joint $j$ with unit direction $n = (\\cos\\theta, \\sin\\theta)$ pointing from $i$ to $j$, the elongation is, to first order in small displacements,
$$e = (u_j - u_i)\\cdot n.$$
So the row of $A$ for that bar has $(-\\cos\\theta, -\\sin\\theta)$ in the columns of joint $i$ and $(\\cos\\theta, \\sin\\theta)$ in the columns of joint $j$. A bar of Young's modulus $E$, cross-section $A_{\\text{bar}}$ and length $L$ has stiffness $c = EA_{\\text{bar}}/L$, so its force is $y = ce$, with tension positive. Balancing forces at each free joint gives $A^Ty = f$, where $f$ lists the external loads. Hence $K = A^TCA$ once again.

Now count. Let $n$ be the number of displacement unknowns and $m$ the number of bars. If $N(A)$ contains a nonzero $u$, the joints can move with no bar stretching. That is a **mechanism**, and the truss cannot carry general loads. This always happens if $m < n$. If $m = n$ and $A$ is invertible, the truss is **statically determinate**. If $m > n$ and the columns of $A$ are independent, it is **indeterminate**, and you need $K$.

**Worked example: a wall bracket.** Joint $P$ at the origin carries a downward load $W$. Bar 1 runs horizontally from a wall pin at $(-1, 0)$ to $P$. Bar 2 runs from a wall pin at $(-1, 1)$ down to $P$. The unit directions toward $P$ are $(1, 0)$ and $(1, -1)/\\sqrt2$, so
$$A = \\begin{pmatrix} 1 & 0\\\\ \\tfrac{1}{\\sqrt2} & -\\tfrac{1}{\\sqrt2} \\end{pmatrix},\\qquad A^Ty = \\begin{pmatrix} y_1 + y_2/\\sqrt2\\\\ -y_2/\\sqrt2 \\end{pmatrix} = \\begin{pmatrix} 0\\\\ -W \\end{pmatrix}.$$
So $y_2 = \\sqrt2\\,W$ in tension and $y_1 = -W$, which is compression. The diagonal hangs the load, and the horizontal bar pushes back against the wall.

For displacements, take both bars with the same $E$ and cross-section, so $c_1 = EA_{\\text{bar}}$ (length $1$) and $c_2 = EA_{\\text{bar}}/\\sqrt2$. The elongations are $e_1 = y_1/c_1 = -W/EA_{\\text{bar}}$ and $e_2 = y_2/c_2 = 2W/EA_{\\text{bar}}$. Solving $Au = e$ gives $u_x = e_1 = -W/EA_{\\text{bar}}$, and then $u_x - u_y = \\sqrt2\\,e_2$, so
$$u_y = -(1 + 2\\sqrt2)\\,\\frac{W}{EA_{\\text{bar}}} \\approx -3.83\\,\\frac{W}{EA_{\\text{bar}}}.$$
The tip moves left, as the compressed bar shortens, and down. Check the second row of $A^Ty$: $-y_2/\\sqrt2 = -W$.

**Mechanisms.** A square of four joints with the bottom two pinned, two vertical bars and a top bar, has $n = 4$ and $m = 3$. Its null space contains the sway $u = (1, 0, 1, 0)$, in which both top joints move sideways together. A diagonal bar removes it. Counting is necessary but not sufficient: two collinear bars meeting at a free joint give $m = n = 2$, yet $A$ has rank $1$, and the joint can move sideways to first order.`,
          resources: [
            {
              title: 'Engineering Statics: Open and Interactive, Equilibrium of Structures',
              url: 'https://engineeringstatics.org/Chapter_06.html',
              type: 'textbook',
              cost: 'free',
              provider: 'Baker and Haynes',
              note: 'Trusses by the method of joints and sections; use it to check bar forces found from $A^Ty = f$.',
              primary: true,
            },
            mit18085('The structures lectures set up trusses as $A^TCA$ and discuss mechanisms through the null space of $A$.'),
            olver('Optional paid companion; its equilibrium chapter treats trusses, mechanisms and rigidity in this framework.'),
          ],
          exercises: [
            {
              slug: 'v-truss',
              title: 'A symmetric V truss',
              prompt:
                'Joint $P$ at the origin hangs from pins at $(-1, 1)$ and $(1, 1)$ by two bars of stiffness $k$ and carries a load $W$ downward. Write $A$, find the bar forces from $A^Ty = f$, show that $K = A^TCA = kI$, and find the displacement of $P$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Both bars carry $W/\\sqrt2$ in tension and $u = (0, -W/k)$.',
            },
            {
              slug: 'find-the-mechanism',
              title: 'Find and remove a mechanism',
              prompt:
                'Joints 1 at $(0, 0)$ and 2 at $(1, 0)$ are pinned. Free joints 3 at $(0, 1)$ and 4 at $(1, 1)$ are connected by bars 1-3, 2-4 and 3-4. Write the $3 \\times 4$ matrix $A$, find $N(A)$, and describe the mechanism. Add the diagonal 1-4, show the new $A$ is invertible, and find the bar forces for a horizontal load $H$ at joint 3.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The mechanism is $u = (1, 0, 1, 0)$. With the diagonal, it carries $\\sqrt2 H$ in tension, bar 2-4 carries $H$ in compression, bar 3-4 carries $H$ in compression and bar 1-3 carries nothing.',
            },
            {
              slug: 'collinear-bars',
              title: 'Counting is not enough',
              prompt:
                'A free joint at the origin is held by two bars to pins at $(-1, 0)$ and $(1, 0)$. Show that $A$ is $2 \\times 2$ with rank $1$, find the infinitesimal mechanism, and explain physically why a real taut cable in this position can still carry a vertical load only by sagging (a nonlinear effect the linear model misses).',
              kind: 'writing',
              difficulty: 2,
            },
            {
              slug: 'warren-truss',
              title: 'A small bridge truss in code',
              prompt:
                'Model a three-panel Warren truss of span $3$ m and height $1$ m (equilateral or isosceles triangles, your choice) pinned at one end and on a roller at the other. Assemble $A$ in NumPy, check its rank, and solve $A^Ty = f$ for a $10$ kN load at the middle bottom joint. Verify the force in one bar by the method of joints by hand, and report which bars are in tension.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the row of $A$ for a bar from joint $i$ to joint $j$ with direction angle $\\theta$?',
              answerOutline: '$(-\\cos\\theta, -\\sin\\theta)$ in the two columns of joint $i$ and $(\\cos\\theta, \\sin\\theta)$ in those of joint $j$; zeros elsewhere.',
            },
            {
              question: 'How do you recognise a mechanism from linear algebra?',
              answerOutline: 'A nonzero $u$ with $Au = 0$: joints move without any bar changing length; $K$ is singular.',
            },
            {
              question: 'Why is $m \\ge n$ bars necessary but not sufficient for a stable truss?',
              answerOutline: 'Fewer bars than unknowns forces a null space; but even with enough bars, a bad geometry (e.g. collinear bars) can make the columns of $A$ dependent.',
            },
          ],
        },
      ],
      project: {
        slug: 'footbridge-truss',
        title: 'Analyse a footbridge truss',
        description: `Design and analyse a plane truss for a small footbridge, about $6$ m long, using the $A^TCA$ framework throughout. Pick a layout (Pratt, Howe or Warren) with four to six panels, pinned at one end and on a roller at the other. Use steel bars ($E = 200$ GPa) with a cross-section you choose.

Do the reasoning by hand where the structure is small enough, and use NumPy for assembly and checking. The goal is to understand the structure, not just to produce numbers: which bars carry most load, how the deflection depends on the bar areas, and what happens if you remove a bar.`,
        deliverables: [
          'A labelled drawing of the truss with joint coordinates, bar numbering and supports, and a count showing whether it is determinate or indeterminate',
          'The matrix $A$ assembled by code, with two rows checked by hand, and a computation of $\\operatorname{rank} A$ and $N(A)$',
          'Bar forces for a uniform deck load and for a single point load at midspan, with at least two bar forces checked by the method of joints',
          'Midspan deflection from $Ku = f$, and how it scales when every cross-section is doubled',
          'An experiment that removes one diagonal: show the null space that appears, sketch the mechanism, and explain it',
        ],
        estimatedHours: 10,
        stretchGoals: [
          'Add a redundant bar to make the truss indeterminate and compare bar forces before and after',
          'Choose bar areas to keep every stress under a limit while minimising total steel volume, by trial or with a simple optimiser',
        ],
      },
    },
    {
      slug: 'eigenvalues-and-eigenvectors',
      title: 'Eigenvalues and Eigenvectors',
      description:
        'Eigenvalues as the directions a matrix only stretches, diagonalisation and matrix powers, the spectral theorem for symmetric matrices with principal stresses as the application, and the singular value decomposition in outline.',
      lessons: [
        {
          slug: 'eigenvalues-and-eigenvectors',
          title: 'Eigenvalues and eigenvectors',
          summary:
            'Find eigenvalues from the characteristic polynomial and eigenvectors from null spaces, use trace and determinant as checks, and meet repeated and complex eigenvalues.',
          estimatedMinutes: 120,
          objectives: [
            'Compute the characteristic polynomial and eigenvalues of $2 \\times 2$ and $3 \\times 3$ matrices by hand',
            'Find a basis for each eigenspace as the null space of $A - \\lambda I$',
            'Check eigenvalues with the trace and determinant',
            'Distinguish algebraic and geometric multiplicity and recognise a defective matrix',
            'Prove that eigenvectors for distinct eigenvalues are independent',
          ],
          concepts: [
            'Eigenvalue equation $Ax = \\lambda x$',
            'Characteristic polynomial $\\det(A - \\lambda I)$',
            'Eigenspace',
            'Trace equals sum, determinant equals product',
            'Algebraic and geometric multiplicity',
            'Defective matrix',
            'Complex eigenvalues of real matrices',
          ],
          explanation: `A nonzero vector $x$ is an **eigenvector** of a square matrix $A$ if $Ax = \\lambda x$ for some number $\\lambda$, the **eigenvalue**. Along $x$, the matrix acts as plain stretching by the factor $\\lambda$. Rewrite the equation as $(A - \\lambda I)x = 0$. A nonzero solution exists exactly when $A - \\lambda I$ is singular, that is, when
$$\\det(A - \\lambda I) = 0.$$
This **characteristic equation** is a polynomial of degree $n$ in $\\lambda$, so there are $n$ eigenvalues counted with multiplicity, possibly complex. For each $\\lambda$, the eigenvectors (together with $0$) form the **eigenspace** $N(A - \\lambda I)$. You find it by elimination, as with any null space.

Two checks catch most arithmetic slips. The sum of the eigenvalues equals the trace, $\\sum a_{ii}$, and their product equals $\\det A$. For triangular matrices the eigenvalues are the diagonal entries.

**Worked example.** Let $A = \\begin{pmatrix} 4 & 1\\\\ 2 & 3 \\end{pmatrix}$. Then
$$\\det(A - \\lambda I) = (4 - \\lambda)(3 - \\lambda) - 2 = \\lambda^2 - 7\\lambda + 10 = (\\lambda - 5)(\\lambda - 2).$$
The checks pass: $5 + 2 = 7$ is the trace, and $5 \\cdot 2 = 10$ is the determinant. For $\\lambda = 5$, the matrix $A - 5I = \\begin{pmatrix} -1 & 1\\\\ 2 & -2 \\end{pmatrix}$ has null space spanned by $(1, 1)$. For $\\lambda = 2$, $A - 2I = \\begin{pmatrix} 2 & 1\\\\ 2 & 1 \\end{pmatrix}$ gives $(1, -2)$. Check one: $A(1, -2) = (4 - 2, 2 - 6) = (2, -4) = 2(1, -2)$. These are the two vectors that made $A$ diagonal in the change-of-basis lesson.

**Multiplicity.** The **algebraic multiplicity** of $\\lambda$ is its multiplicity as a root of the characteristic polynomial. The **geometric multiplicity** is $\\dim N(A - \\lambda I)$. Geometric multiplicity is at least $1$ and at most the algebraic one. For $\\begin{pmatrix} 3 & 1\\\\ 0 & 3 \\end{pmatrix}$, the eigenvalue $3$ is a double root, but $A - 3I$ has rank $1$, so there is only one independent eigenvector. Such a matrix is **defective**.

**Complex eigenvalues.** A real matrix can have complex eigenvalues, which come in conjugate pairs. Rotation by $90^\\circ$, $\\begin{pmatrix} 0 & -1\\\\ 1 & 0 \\end{pmatrix}$, has $\\lambda^2 + 1 = 0$, so $\\lambda = \\pm i$. No real direction is left unturned. In dynamics, complex eigenvalues mean oscillation.

Eigenvectors for distinct eigenvalues are independent. For two, suppose $c_1x_1 + c_2x_2 = 0$. Apply $A$ to get $c_1\\lambda_1x_1 + c_2\\lambda_2x_2 = 0$. Subtract $\\lambda_2$ times the first equation to get $c_1(\\lambda_1 - \\lambda_2)x_1 = 0$, so $c_1 = 0$, and then $c_2 = 0$. Induction extends this to any number.

**Pitfall.** Row operations change eigenvalues. Never row-reduce $A$ before computing $\\det(A - \\lambda I)$. Row-reduce only $A - \\lambda I$, after substituting a specific $\\lambda$.`,
          resources: [
            mit1806(U2, 'eigenvalues-and-eigenvectors', 'Eigenvalues and eigenvectors', 'The lecture plus a recitation with worked problems.', true),
            ila('eigenvectors', 'Eigenvalues and Eigenvectors', 'Geometric pictures and computing eigenspaces.'),
            ila('characteristic-polynomial', 'The Characteristic Polynomial', 'Multiplicities and the trace and determinant checks.'),
            threeBlue('eigenvalues', 'Eigenvectors and eigenvalues', 'The geometric meaning of eigenvectors as unrotated directions.'),
          ],
          exercises: [
            {
              slug: 'two-by-two-eigen',
              title: 'Eigenpairs of a symmetric 2 by 2',
              prompt:
                'Find the eigenvalues and eigenvectors of $\\begin{pmatrix} 2 & 1\\\\ 1 & 2 \\end{pmatrix}$, check the trace and determinant, and show that the eigenvectors are orthogonal. What are the eigenvalues of $A^2$, $A^{-1}$ and $A + 5I$, and why?',
              kind: 'problem',
              difficulty: 1,
              hint: '$\\lambda = 3$ with $(1, 1)$ and $\\lambda = 1$ with $(1, -1)$; then $9, 1$; $\\tfrac13, 1$; $8, 6$.',
            },
            {
              slug: 'second-difference-eigen',
              title: 'Eigenvalues of the spring-chain matrix',
              prompt:
                'Show that $K = \\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}$ has eigenvalues $2 - \\sqrt2$, $2$, $2 + \\sqrt2$ with eigenvectors $(1, \\sqrt2, 1)$, $(1, 0, -1)$, $(1, -\\sqrt2, 1)$. Check the sum and product against the trace and the determinant from the determinants lesson. Then check that eigenvector $k$ has entries proportional to $\\sin(jk\\pi/4)$, $j = 1, 2, 3$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'geometric-eigenvalues',
              title: 'Eigenvalues you can see',
              prompt:
                'Without computing a determinant, give the eigenvalues and eigenvectors of: (a) projection onto the line through $(1, 2)$; (b) reflection across that line; (c) rotation by $90^\\circ$ (complex). Then confirm (a) and (b) with characteristic polynomials and find the complex eigenvectors in (c).',
              kind: 'problem',
              difficulty: 2,
              hint: 'For the rotation, $\\lambda = i$ has eigenvector $(1, -i)$.',
            },
            {
              slug: 'independence-of-eigenvectors',
              title: 'Distinct eigenvalues give independent eigenvectors',
              prompt:
                'Prove by induction on $k$ that eigenvectors $x_1, \\dots, x_k$ belonging to distinct eigenvalues are linearly independent. Then show that $\\begin{pmatrix} 3 & 1\\\\ 0 & 3 \\end{pmatrix}$ has algebraic multiplicity $2$ but geometric multiplicity $1$ for $\\lambda = 3$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why are eigenvalues the roots of $\\det(A - \\lambda I)$?',
              answerOutline: '$Ax = \\lambda x$ with $x \\ne 0$ means $(A - \\lambda I)x = 0$ has a nonzero solution, which happens iff $A - \\lambda I$ is singular.',
            },
            {
              question: 'What two quick checks should eigenvalues of a matrix satisfy?',
              answerOutline: 'Their sum is the trace and their product is the determinant.',
            },
            {
              question: 'What is a defective matrix? Give an example.',
              answerOutline: 'One with fewer independent eigenvectors than its size; e.g. $\\begin{pmatrix} 3 & 1\\\\ 0 & 3 \\end{pmatrix}$.',
            },
          ],
        },
        {
          slug: 'diagonalisation',
          title: 'Diagonalisation and powers of a matrix',
          summary:
            'Write $A = S\\Lambda S^{-1}$ when there are enough eigenvectors, compute $A^k$ in closed form, and see which matrices cannot be diagonalised.',
          estimatedMinutes: 110,
          objectives: [
            'Diagonalise a matrix with $n$ independent eigenvectors as $A = S\\Lambda S^{-1}$',
            'Compute $A^k$ and closed-form solutions of linear recurrences',
            'Decide whether a matrix is diagonalisable from its eigenvalues and eigenspaces',
            'Diagonalise a real matrix with complex eigenvalues over the complex numbers',
          ],
          concepts: [
            'Eigenvector matrix $S$ and eigenvalue matrix $\\Lambda$',
            '$A = S\\Lambda S^{-1}$',
            'Powers $A^k = S\\Lambda^kS^{-1}$',
            'Distinct eigenvalues suffice',
            'Defective matrices are not diagonalisable',
            'Linear recurrences',
          ],
          explanation: `Suppose $A$ has $n$ independent eigenvectors $x_1, \\dots, x_n$. Put them as the columns of $S$ and the eigenvalues on the diagonal of $\\Lambda$. The equations $Ax_i = \\lambda_ix_i$ say $AS = S\\Lambda$, and $S$ is invertible, so
$$A = S\\Lambda S^{-1},\\qquad \\Lambda = S^{-1}AS.$$
This is the change-of-basis formula with the eigenvectors as the basis. Powers become easy, because the $S^{-1}S$ pairs cancel:
$$A^k = S\\Lambda^kS^{-1}.$$
For a vector $u_0 = c_1x_1 + \\cdots + c_nx_n$, this reads $A^ku_0 = c_1\\lambda_1^kx_1 + \\cdots + c_n\\lambda_n^kx_n$. Each eigen-direction grows or decays at its own rate.

**When does it work?** $A$ is diagonalisable exactly when it has $n$ independent eigenvectors. Equivalently, the geometric multiplicity of every eigenvalue equals its algebraic multiplicity. Distinct eigenvalues guarantee this, by the independence result from the last lesson. Repeated eigenvalues may or may not allow it: $I$ is diagonal already, while $\\begin{pmatrix} 1 & 1\\\\ 0 & 1 \\end{pmatrix}$ is defective. Its powers are $\\begin{pmatrix} 1 & k\\\\ 0 & 1 \\end{pmatrix}$, and the growth linear in $k$ is the signature of a missing eigenvector. Diagonalisability is about eigenvectors, and invertibility is about eigenvalues (no $\\lambda = 0$). The two are unrelated.

**Worked example.** Compute $A^k$ for $A = \\begin{pmatrix} 4 & 1\\\\ 2 & 3 \\end{pmatrix}$. From the last lesson, $\\lambda = 5, 2$ with eigenvectors $(1, 1)$ and $(1, -2)$. So
$$S = \\begin{pmatrix} 1 & 1\\\\ 1 & -2 \\end{pmatrix},\\qquad S^{-1} = \\frac13\\begin{pmatrix} 2 & 1\\\\ 1 & -1 \\end{pmatrix},$$
using the $2 \\times 2$ inverse formula with $\\det S = -3$. Then
$$A^k = S\\begin{pmatrix} 5^k & 0\\\\ 0 & 2^k \\end{pmatrix}S^{-1} = \\frac13\\begin{pmatrix} 2\\cdot5^k + 2^k & 5^k - 2^k\\\\ 2\\cdot5^k - 2\\cdot2^k & 5^k + 2\\cdot2^k \\end{pmatrix}.$$
Check $k = 0$: $\\tfrac13\\begin{pmatrix} 3 & 0\\\\ 0 & 3 \\end{pmatrix} = I$. Check $k = 1$: $\\tfrac13\\begin{pmatrix} 12 & 3\\\\ 6 & 9 \\end{pmatrix} = A$. For large $k$ the $5^k$ terms dominate, and $A^ku_0$ lines up with $(1, 1)$ for almost every starting vector. The power method for the largest eigenvalue is based on exactly this.

**Complex eigenvalues.** Over $\\mathbb{C}$, a real matrix with complex eigenvalues $\\alpha \\pm i\\beta$ and $\\beta \\ne 0$ is diagonalisable, with complex conjugate eigenvectors. The real form of the solution combines the conjugate pair into $r^k\\cos(k\\theta)$ and $r^k\\sin(k\\theta)$, where $\\alpha + i\\beta = re^{i\\theta}$.

**Pitfall.** The columns of $S$ and the diagonal of $\\Lambda$ must be in matching order. Swapping two eigenvectors without swapping their eigenvalues produces a wrong $A$.`,
          resources: [
            mit1806(U2, 'diagonalization-and-powers-of-a', 'Diagonalization and powers of A', 'Diagonalisation, powers and the Fibonacci example.', true),
            ila('diagonalization', 'Diagonalization', 'Criteria for diagonalisability with examples.'),
            ila('complex-eigenvalues', 'Complex Eigenvalues', 'Rotation-scaling matrices and the real form of complex eigenvalues.'),
          ],
          exercises: [
            {
              slug: 'tenth-power',
              title: 'A tenth power by hand',
              prompt:
                'Diagonalise $A = \\begin{pmatrix} 1 & 2\\\\ 2 & 1 \\end{pmatrix}$ and use the result to write $A^{10}$ exactly. Check with NumPy using exact integers (numpy.linalg.matrix_power on an integer array).',
              kind: 'problem',
              difficulty: 1,
              hint: '$A^{10} = \\tfrac12\\begin{pmatrix} 3^{10} + 1 & 3^{10} - 1\\\\ 3^{10} - 1 & 3^{10} + 1 \\end{pmatrix} = \\begin{pmatrix} 29525 & 29524\\\\ 29524 & 29525 \\end{pmatrix}$.',
            },
            {
              slug: 'fibonacci-closed-form',
              title: 'Fibonacci numbers from eigenvalues',
              prompt:
                'Write the Fibonacci recurrence $F_{k+2} = F_{k+1} + F_k$ as $u_{k+1} = Au_k$ with $u_k = (F_{k+1}, F_k)$ and $A = \\begin{pmatrix} 1 & 1\\\\ 1 & 0 \\end{pmatrix}$. Diagonalise $A$ and derive $F_k = (\\varphi^k - \\psi^k)/\\sqrt5$ with $\\varphi, \\psi = (1 \\pm \\sqrt5)/2$. Explain why $F_{k+1}/F_k \\to \\varphi$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'diagonalisable-or-not',
              title: 'Diagonalisable or not?',
              prompt:
                'For each matrix, decide whether it is diagonalisable over $\\mathbb{R}$, over $\\mathbb{C}$, or neither, and justify: $\\begin{pmatrix} 2 & 0\\\\ 0 & 2 \\end{pmatrix}$, $\\begin{pmatrix} 2 & 1\\\\ 0 & 2 \\end{pmatrix}$, $\\begin{pmatrix} 0 & -1\\\\ 1 & 0 \\end{pmatrix}$, $\\begin{pmatrix} 1 & 1 & 0\\\\ 0 & 2 & 0\\\\ 0 & 0 & 3 \\end{pmatrix}$, $\\begin{pmatrix} 1 & 1\\\\ 0 & 0 \\end{pmatrix}$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Only the second is not diagonalisable over either field. The third is diagonalisable over $\\mathbb{C}$ but not $\\mathbb{R}$.',
            },
            {
              slug: 'power-method',
              title: 'The power method',
              prompt:
                'Implement the power method $x_{k+1} = Ax_k/\\|Ax_k\\|$ and run it on $A = \\begin{pmatrix} 4 & 1\\\\ 2 & 3 \\end{pmatrix}$ from $x_0 = (1, 0)$. Show that the error in direction shrinks by about the factor $2/5$ per step, and explain this with the closed form for $A^k$. What goes wrong if $|\\lambda_1| = |\\lambda_2|$?',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $A^k = S\\Lambda^kS^{-1}$?',
              answerOutline: '$A^k = (S\\Lambda S^{-1})(S\\Lambda S^{-1})\\cdots$; each inner $S^{-1}S$ cancels, leaving $S\\Lambda^kS^{-1}$.',
            },
            {
              question: 'What exactly is required for $A$ to be diagonalisable?',
              answerOutline: '$n$ independent eigenvectors; equivalently geometric equals algebraic multiplicity for every eigenvalue. Distinct eigenvalues suffice.',
            },
            {
              question: 'Is every invertible matrix diagonalisable? Is every diagonalisable matrix invertible?',
              answerOutline: 'No to both: $\\begin{pmatrix} 1 & 1\\\\ 0 & 1 \\end{pmatrix}$ is invertible but defective; $\\operatorname{diag}(1, 0)$ is diagonal but singular.',
            },
          ],
        },
        {
          slug: 'symmetric-matrices-and-the-spectral-theorem',
          relatedLessons: ['classical-mechanics/rotation-and-rigid-bodies/the-inertia-tensor-and-principal-axes'],
          title: 'Symmetric matrices and the spectral theorem',
          summary:
            'Real symmetric matrices have real eigenvalues and orthonormal eigenvectors, so $A = Q\\Lambda Q^T$. Apply it to quadratic forms, principal stresses and the Rayleigh quotient.',
          estimatedMinutes: 120,
          objectives: [
            'Prove that a real symmetric matrix has real eigenvalues and orthogonal eigenvectors for distinct eigenvalues',
            'State the spectral theorem and write $A = Q\\Lambda Q^T = \\sum \\lambda_i q_iq_i^T$',
            'Find the principal axes of a quadratic form and of a plane stress tensor',
            'Relate positive definiteness to the eigenvalues',
            'Use the Rayleigh quotient to bound the smallest and largest eigenvalues',
          ],
          concepts: [
            'Real symmetric matrix',
            'Orthonormal eigenbasis',
            'Spectral theorem $A = Q\\Lambda Q^T$',
            'Spectral decomposition into rank-one projections',
            'Principal axes',
            'Principal stresses',
            'Rayleigh quotient',
          ],
          explanation: `Symmetric matrices are the best-behaved matrices there are, and every stiffness, conductance, inertia and stress matrix in this course is symmetric.

**Real eigenvalues.** Let $Ax = \\lambda x$ with $x$ possibly complex, and let $\\bar x$ be its conjugate. Then $\\bar x^TAx = \\lambda\\,\\bar x^Tx$. Conjugating and transposing, and using that $A$ is real and symmetric, gives $\\bar x^TAx = \\bar\\lambda\\,\\bar x^Tx$. Since $\\bar x^Tx = \\sum|x_i|^2 > 0$, we get $\\lambda = \\bar\\lambda$.

**Orthogonal eigenvectors.** If $Ax = \\lambda x$ and $Ay = \\mu y$ with $\\lambda \\ne \\mu$, then $\\lambda\\,y^Tx = y^TAx = (Ay)^Tx = \\mu\\,y^Tx$, so $y^Tx = 0$.

The **spectral theorem** says more. Every real symmetric matrix has an orthonormal basis of eigenvectors, even when eigenvalues repeat, so
$$A = Q\\Lambda Q^T = \\lambda_1q_1q_1^T + \\cdots + \\lambda_nq_nq_n^T,$$
with $Q$ orthogonal. Each $q_iq_i^T$ is the projection onto one eigen-direction. In the coordinates $y = Q^Tx$, the quadratic form becomes a weighted sum of squares, $x^TAx = \\sum \\lambda_iy_i^2$. So $A$ is positive definite exactly when every $\\lambda_i > 0$. The level set $x^TAx = 1$ of a positive definite $A$ is an ellipse or ellipsoid whose **principal axes** lie along the $q_i$, with semi-axis lengths $1/\\sqrt{\\lambda_i}$.

**Worked example.** Find the principal axes of $5x^2 + 4xy + 2y^2 = 1$. The matrix is $A = \\begin{pmatrix} 5 & 2\\\\ 2 & 2 \\end{pmatrix}$, with characteristic polynomial $\\lambda^2 - 7\\lambda + 6 = (\\lambda - 6)(\\lambda - 1)$. For $\\lambda = 6$, $A - 6I = \\begin{pmatrix} -1 & 2\\\\ 2 & -4 \\end{pmatrix}$ gives $q_1 = (2, 1)/\\sqrt5$. For $\\lambda = 1$, $q_2 = (1, -2)/\\sqrt5$, orthogonal to $q_1$ as promised. Check the spectral decomposition:
$$6q_1q_1^T + 1\\,q_2q_2^T = \\frac65\\begin{pmatrix} 4 & 2\\\\ 2 & 1 \\end{pmatrix} + \\frac15\\begin{pmatrix} 1 & -2\\\\ -2 & 4 \\end{pmatrix} = \\begin{pmatrix} 5 & 2\\\\ 2 & 2 \\end{pmatrix}.$$
The ellipse has semi-axis $1/\\sqrt6 \\approx 0.41$ along $(2, 1)$ and $1$ along $(1, -2)$.

The same computation gives **principal stresses**. A plane stress state is a symmetric matrix $\\begin{pmatrix} \\sigma_x & \\tau\\\\ \\tau & \\sigma_y \\end{pmatrix}$. Its eigenvalues are the largest and smallest normal stresses over all orientations, and its eigenvectors are the directions on which there is no shear.

**Rayleigh quotient.** For symmetric $A$, $R(x) = x^TAx/x^Tx$ lies between $\\lambda_{\\min}$ and $\\lambda_{\\max}$, and it attains them at the corresponding eigenvectors. Any trial vector therefore gives an upper bound on $\\lambda_{\\min}$. This is how engineers estimate the lowest vibration frequency of a structure from a guessed mode shape.

**Pitfall.** For a repeated eigenvalue, eigenvectors from an elimination need not come out orthogonal. Apply Gram-Schmidt within that eigenspace.`,
          resources: [
            mit1806(U3, 'symmetric-matrices-and-positive-definiteness', 'Symmetric matrices and positive definiteness', 'The spectral theorem and its consequences.', true),
            mit18085('Uses the eigenvalues of the second-difference matrices and Rayleigh quotients throughout.'),
            hefferon('The chapter on similarity covers diagonalisation and the background for the spectral theorem.'),
          ],
          exercises: [
            {
              slug: 'principal-stresses',
              title: 'Principal stresses',
              prompt:
                'A plane stress state has $\\sigma_x = 50$ MPa, $\\sigma_y = -30$ MPa and $\\tau = 30$ MPa. Find the principal stresses and the angle of the first principal direction from the $x$-axis. Verify that the trace (the sum of normal stresses) is unchanged, and write the stress matrix as $Q\\Lambda Q^T$.',
              kind: 'problem',
              difficulty: 1,
              hint: 'Principal stresses $60$ and $-40$ MPa; the $60$ MPa direction is $(3, 1)$, at about $18.4^\\circ$.',
            },
            {
              slug: 'symmetric-proofs',
              title: 'Why symmetric matrices behave',
              prompt:
                'Write out carefully the proofs that a real symmetric matrix has real eigenvalues and that eigenvectors for distinct eigenvalues are orthogonal. Then show by example that a real non-symmetric matrix can have real eigenvalues with non-orthogonal eigenvectors, using $\\begin{pmatrix} 4 & 1\\\\ 2 & 3 \\end{pmatrix}$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rayleigh-bound',
              title: 'Rayleigh quotient bounds',
              prompt:
                'For $K$, the $3 \\times 3$ second-difference matrix, compute $R(x)$ for $x = (1, 1, 1)$ and $x = (1, 1.4, 1)$, and compare both with $\\lambda_{\\min} = 2 - \\sqrt2 \\approx 0.586$. Prove that $R(x) \\ge \\lambda_{\\min}$ for all $x \\ne 0$ by expanding $x$ in the eigenvector basis.',
              kind: 'problem',
              difficulty: 2,
              hint: '$R(1, 1, 1) = \\tfrac23$. The closer the trial vector is to $(1, \\sqrt2, 1)$, the closer $R$ is to $\\lambda_{\\min}$.',
            },
            {
              slug: 'inertia-tensor',
              title: 'Principal axes of a rigid body',
              prompt:
                'Point masses of $1$ kg sit at $(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$ and $(1, 1, 0)$ m. Compute the inertia tensor $I_{jk} = \\sum m(|r|^2\\delta_{jk} - r_jr_k)$ by hand, find its principal moments and axes with numpy.linalg.eigh, and check that the axes are orthonormal.',
              kind: 'problem',
              difficulty: 3,
              hint: 'The tensor is $\\begin{pmatrix} 3 & -1 & 0\\\\ -1 & 3 & 0\\\\ 0 & 0 & 4 \\end{pmatrix}$ kg m$^2$, with principal moments $2, 4, 4$. The moment $4$ is repeated, so any orthonormal pair in its eigenspace is a valid choice of axes.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the spectral theorem for real symmetric matrices.',
              answerOutline: 'There is an orthogonal $Q$ and real diagonal $\\Lambda$ with $A = Q\\Lambda Q^T$; equivalently $A = \\sum \\lambda_iq_iq_i^T$ with orthonormal $q_i$.',
            },
            {
              question: 'How do the eigenvalues determine the shape of $x^TAx = 1$?',
              answerOutline: 'For positive definite $A$ it is an ellipse/ellipsoid with axes along the eigenvectors and semi-axes $1/\\sqrt{\\lambda_i}$.',
            },
            {
              question: 'What is the Rayleigh quotient used for?',
              answerOutline: '$x^TAx/x^Tx$ lies in $[\\lambda_{\\min}, \\lambda_{\\max}]$; a trial vector gives an upper bound on the lowest eigenvalue (e.g. lowest vibration frequency).',
            },
          ],
        },
        {
          slug: 'singular-value-decomposition',
          title: 'The singular value decomposition in outline',
          summary:
            'Every matrix is a rotation, a stretch and a rotation: $A = U\\Sigma V^T$. Compute it from $A^TA$ for small matrices and use it for rank, norm, condition number and principal stretches.',
          estimatedMinutes: 110,
          objectives: [
            'Compute the SVD of a $2 \\times 2$ matrix from the eigen-decomposition of $A^TA$',
            'Read rank, 2-norm and condition number from the singular values',
            'Interpret the SVD geometrically: the image of the unit circle',
            'Relate singular values to principal stretches in a deformation',
            'State the best low-rank approximation property',
          ],
          concepts: [
            'Singular values $\\sigma_i \\ge 0$',
            'Right and left singular vectors',
            '$A = U\\Sigma V^T$',
            'Rank-one expansion',
            '2-norm and condition number',
            'Principal stretches',
            'Best rank-$k$ approximation',
          ],
          explanation: `Eigenvectors need a square matrix and do not always exist. The **singular value decomposition** exists for every real $m \\times n$ matrix:
$$A = U\\Sigma V^T = \\sigma_1u_1v_1^T + \\cdots + \\sigma_ru_rv_r^T.$$
Here $V$ ($n \\times n$) and $U$ ($m \\times m$) are orthogonal, and $\\Sigma$ is $m \\times n$ with the **singular values** $\\sigma_1 \\ge \\sigma_2 \\ge \\cdots \\ge \\sigma_r > 0$ on its diagonal, followed by zeros. Read it as: rotate by $V^T$, stretch along the axes by the $\\sigma_i$, rotate by $U$. The image of the unit circle is an ellipse whose semi-axes are $\\sigma_iu_i$.

To compute it, note that $A^TA = V\\Sigma^T\\Sigma V^T$. So the $v_i$ are orthonormal eigenvectors of the symmetric matrix $A^TA$, and the eigenvalues are $\\sigma_i^2$. Then $u_i = Av_i/\\sigma_i$ for each $\\sigma_i > 0$. These vectors are automatically orthonormal, since $u_i^Tu_j = v_i^TA^TAv_j/(\\sigma_i\\sigma_j) = \\delta_{ij}$.

The SVD answers several questions at once. The rank is the number of nonzero $\\sigma_i$. The $v_i$ and $u_i$ give orthonormal bases of all four fundamental subspaces. The 2-norm is $\\|A\\|_2 = \\sigma_1$, and the **condition number** of an invertible matrix is $\\kappa = \\sigma_1/\\sigma_n$, which bounds how much relative errors in $b$ can be amplified in $x$. Truncating the sum after $k$ terms gives the closest rank-$k$ matrix in the 2-norm, with error $\\sigma_{k+1}$ (the Eckart-Young theorem).

**Worked example.** Let $A = \\begin{pmatrix} 3 & 0\\\\ 4 & 5 \\end{pmatrix}$. Then
$$A^TA = \\begin{pmatrix} 25 & 20\\\\ 20 & 25 \\end{pmatrix},$$
with eigenvalues $45$ and $5$ and eigenvectors $v_1 = (1, 1)/\\sqrt2$ and $v_2 = (1, -1)/\\sqrt2$. So $\\sigma_1 = \\sqrt{45} = 3\\sqrt5$ and $\\sigma_2 = \\sqrt5$. Next,
$$u_1 = \\frac{Av_1}{\\sigma_1} = \\frac{(3, 9)/\\sqrt2}{3\\sqrt5} = \\frac{(1, 3)}{\\sqrt{10}},\\qquad u_2 = \\frac{Av_2}{\\sigma_2} = \\frac{(3, -1)/\\sqrt2}{\\sqrt5} = \\frac{(3, -1)}{\\sqrt{10}}.$$
Check: $u_1 \\cdot u_2 = (3 - 3)/10 = 0$, and $\\sigma_1\\sigma_2 = 15 = |\\det A|$. The condition number is $\\kappa = 3$, and $\\|A\\|_2 = 3\\sqrt5 \\approx 6.71$. Note that the eigenvalues of $A$ itself are $3$ and $5$, which differ from the singular values. For non-symmetric matrices the two decompositions are different things.

**Physical meaning.** In continuum mechanics, a deformation gradient $F$ maps material line elements to their deformed positions. Its singular values are the **principal stretches**, and the $v_i$ are the material directions that are stretched without shearing. The product of the stretches is the area or volume ratio $|\\det F|$.

**Pitfall.** Computing singular values by forming $A^TA$ is fine by hand. In floating point it squares the condition number and loses the small singular values. Library SVD routines work on $A$ directly.`,
          resources: [
            mit1806(U3, 'singular-value-decomposition', 'Singular value decomposition', 'Strang\'s lecture deriving the SVD from $A^TA$.', true),
            {
              title: 'MIT 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning',
              url: 'https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/',
              type: 'course',
              cost: 'free',
              provider: 'MIT OpenCourseWare',
              note: 'Optional further study: the early lectures treat the SVD and low-rank approximation in depth.',
            },
            mit1806(U3, 'left-and-right-inverses-pseudoinverse', 'Left and right inverses; pseudoinverse', 'The pseudoinverse built from the SVD.'),
          ],
          exercises: [
            {
              slug: 'rank-one-svd',
              title: 'SVD of a rank-one matrix',
              prompt:
                'Find the SVD of $A = \\begin{pmatrix} 2 & 2\\\\ 1 & 1 \\end{pmatrix}$ by hand: singular values, $v_1$, $u_1$, and choices of $v_2$ and $u_2$ completing orthonormal bases. Write $A = \\sigma_1u_1v_1^T$ and identify the four fundamental subspaces from the singular vectors.',
              kind: 'problem',
              difficulty: 1,
              hint: '$\\sigma_1 = \\sqrt{10}$, $\\sigma_2 = 0$, $v_1 = (1, 1)/\\sqrt2$, $u_1 = (2, 1)/\\sqrt5$.',
            },
            {
              slug: 'two-norm-is-sigma-one',
              title: 'The 2-norm is the largest singular value',
              prompt:
                'Prove that $\\max_{\\|x\\| = 1}\\|Ax\\|_2 = \\sigma_1$ by writing $x = Vy$ and computing $\\|Ax\\|^2 = \\sum \\sigma_i^2y_i^2$. Deduce that for invertible $A$, $\\|A^{-1}\\|_2 = 1/\\sigma_n$ and $\\kappa(A) = \\sigma_1/\\sigma_n$. Compute $\\kappa$ for $\\begin{pmatrix} 1 & 1\\\\ 1 & 1.0001 \\end{pmatrix}$ and explain what it says about solving $Ax = b$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The condition number is about $4 \\times 10^4$.',
            },
            {
              slug: 'principal-stretches',
              title: 'Principal stretches of a simple shear',
              prompt:
                'A simple shear has deformation gradient $F = \\begin{pmatrix} 1 & 0.5\\\\ 0 & 1 \\end{pmatrix}$. Compute the principal stretches (singular values of $F$) by hand from $F^TF$, find the material directions that are stretched most and least, and check that the product of the stretches is $\\det F = 1$.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The stretches are about $1.281$ and $0.781$.',
            },
            {
              slug: 'low-rank-image',
              title: 'Low-rank approximation of an image',
              prompt:
                'Load any greyscale image as a matrix, compute its SVD with numpy.linalg.svd, and reconstruct rank-$k$ approximations for $k = 1, 5, 20, 50$. Plot the singular values on a log scale, report the relative 2-norm error for each $k$, and confirm that it equals $\\sigma_{k+1}/\\sigma_1$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How are the singular values and right singular vectors of $A$ related to $A^TA$?',
              answerOutline: 'The $v_i$ are orthonormal eigenvectors of $A^TA$ and its eigenvalues are $\\sigma_i^2$.',
            },
            {
              question: 'What do the singular values tell you about $A$?',
              answerOutline: 'Rank (number of nonzero $\\sigma_i$), 2-norm $\\sigma_1$, condition number $\\sigma_1/\\sigma_n$, best low-rank approximations and their errors.',
            },
            {
              question: 'Are the singular values of a square matrix its eigenvalues? When are they?',
              answerOutline: 'Not in general. For symmetric positive semidefinite $A$ they coincide; for symmetric $A$ the singular values are $|\\lambda_i|$.',
            },
          ],
        },
      ],
    },
    {
      slug: 'linear-dynamical-systems',
      title: 'Linear Dynamical Systems',
      description:
        'Systems that evolve by a matrix: discrete iterations and Markov processes, systems of linear ODEs solved by eigenvectors and by the matrix exponential, stability, and the normal modes of vibrating structures.',
      lessons: [
        {
          slug: 'iterative-systems',
          title: 'Iterative systems and stability',
          summary:
            'Solve $u_{k+1} = Tu_k$ by eigenvectors, decide from the spectral radius whether solutions grow or decay, and apply it to a stage-structured population and to the Jacobi iteration for $Ku = f$.',
          estimatedMinutes: 110,
          objectives: [
            'Write the solution of $u_{k+1} = Tu_k$ as a combination of eigen-solutions $\\lambda_i^kx_i$',
            'Use the spectral radius to decide whether an iterative system is asymptotically stable',
            'Identify the long-run growth rate and proportions from the dominant eigenpair',
            'Analyse the convergence of the Jacobi method as an iterative system',
          ],
          concepts: [
            'Discrete linear dynamical system',
            'Eigen-solutions $\\lambda^kx$',
            'Spectral radius $\\rho(T)$',
            'Asymptotic stability: $\\rho(T) < 1$',
            'Dominant eigenvalue and stable distribution',
            'Jacobi iteration and its iteration matrix',
          ],
          explanation: `A **discrete linear dynamical system** advances a state vector by a fixed matrix, $u_{k+1} = Tu_k$, so $u_k = T^ku_0$. When $T$ has a basis of eigenvectors, expand the start as $u_0 = c_1x_1 + \\cdots + c_nx_n$. Then
$$u_k = c_1\\lambda_1^kx_1 + \\cdots + c_n\\lambda_n^kx_n.$$
Each eigen-direction evolves independently. Directions with $|\\lambda| < 1$ die out, those with $|\\lambda| > 1$ blow up, and $|\\lambda| = 1$ persists. The **spectral radius** $\\rho(T) = \\max|\\lambda_i|$ decides the fate of the system: $u_k \\to 0$ for every $u_0$ exactly when $\\rho(T) < 1$. This is **asymptotic stability**, and it holds even for non-diagonalisable $T$, although the decay may then start more slowly. If one eigenvalue $\\lambda_1$ is strictly largest in absolute value, then for large $k$, $u_k \\approx c_1\\lambda_1^kx_1$, provided $c_1 \\ne 0$. The growth rate is $\\lambda_1$ and the proportions are those of $x_1$.

**Worked example: a two-stage population.** Let $u = (j, a)$ count juveniles and adults. Each year, 60% of juveniles stay juvenile and 20% mature, adults have $0.8$ offspring each, and 60% of adults survive:
$$T = \\begin{pmatrix} 0.6 & 0.8\\\\ 0.2 & 0.6 \\end{pmatrix}.$$
The characteristic equation is $(0.6 - \\lambda)^2 - 0.16 = 0$, so $\\lambda = 0.6 \\pm 0.4$, giving $1$ and $0.2$. For $\\lambda = 1$, $T - I = \\begin{pmatrix} -0.4 & 0.8\\\\ 0.2 & -0.4 \\end{pmatrix}$ gives $x_1 = (2, 1)$. For $\\lambda = 0.2$, $x_2 = (2, -1)$. Start with $10$ juveniles and no adults: $(10, 0) = 2.5(2, 1) + 2.5(2, -1)$. Therefore
$$u_k = 2.5(2, 1) + 2.5(0.2)^k(2, -1) \\to (5, 2.5).$$
The population settles at a 2:1 juvenile-to-adult ratio with no growth, since $\\lambda_1 = 1$. The transient dies by a factor of $5$ each year. Check $k = 1$: $T(10, 0) = (6, 2)$, and the formula gives $(5, 2.5) + 0.5(2, -1) = (6, 2)$.

**Iterative solvers are dynamical systems.** To solve $Ku = f$, the Jacobi method splits $K = D + (K - D)$, with $D$ the diagonal of $K$, and iterates $u_{k+1} = D^{-1}(f - (K - D)u_k)$. The error $\\varepsilon_k = u_k - u$ obeys $\\varepsilon_{k+1} = (I - D^{-1}K)\\varepsilon_k$. So Jacobi converges for every starting guess exactly when $\\rho(I - D^{-1}K) < 1$, and the spectral radius is the factor by which the error shrinks per step in the long run.

**Pitfall.** $\\rho(T) < 1$ does not mean $\\|u_k\\|$ decreases at every step. For non-symmetric $T$ the norm can grow for a while before it decays. Stability is a statement about the limit.`,
          resources: [
            mit1806(U2, 'diagonalization-and-powers-of-a', 'Diagonalization and powers of A', 'Difference equations $u_{k+1} = Au_k$ solved by eigenvectors.', true),
            ila('diagonalization', 'Diagonalization', 'Long-term behaviour of $A^kx$.'),
            {
              title: 'Stanford EE263 Introduction to Linear Dynamical Systems',
              url: 'https://see.stanford.edu/Course/EE263',
              type: 'course',
              cost: 'free',
              provider: 'Stanford Engineering Everywhere',
              note: 'Boyd\'s lectures on discrete- and continuous-time linear systems, for a second, more systems-engineering view.',
            },
          ],
          exercises: [
            {
              slug: 'population-from-adults',
              title: 'Start with adults only',
              prompt:
                'For the population matrix $T$ of the worked example, start from $u_0 = (0, 9)$. Expand $u_0$ in the eigenvectors, write $u_k$ in closed form, and give the limit. Compute $u_1$ and $u_2$ directly and from your formula.',
              kind: 'problem',
              difficulty: 1,
              hint: '$u_0 = 4.5(2, 1) - 4.5(2, -1)$, so $u_k \\to (9, 4.5)$.',
            },
            {
              slug: 'jacobi-rate',
              title: 'How fast does Jacobi converge?',
              prompt:
                'For $K = \\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}$, find the Jacobi iteration matrix $B = I - D^{-1}K$ and its eigenvalues. Estimate how many iterations reduce the error by a factor of $10^6$. Then run Jacobi in Python from $u_0 = 0$ with $f = (1, 1, 1)$ and confirm the observed rate.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The eigenvalues are $0$ and $\\pm\\sqrt2/2$, so about $40$ iterations.',
            },
            {
              slug: 'stability-proof',
              title: 'Stability and the spectral radius',
              prompt:
                'Prove that if $T$ is diagonalisable and $\\rho(T) < 1$, then $T^ku_0 \\to 0$ for every $u_0$, and that if $\\rho(T) > 1$ there is a $u_0$ with $\\|T^ku_0\\| \\to \\infty$. Show by computing powers of $\\begin{pmatrix} 0.5 & 10\\\\ 0 & 0.5 \\end{pmatrix}$ that $\\|T^k\\|_2$ rises to about $10$ and stays above $1$ for several steps before it decays, even though $\\rho < 1$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the general solution of $u_{k+1} = Tu_k$ for diagonalisable $T$?',
              answerOutline: '$u_k = \\sum c_i\\lambda_i^kx_i$ with $c$ from expanding $u_0$ in the eigenvectors.',
            },
            {
              question: 'What does the spectral radius decide?',
              answerOutline: 'Whether all solutions decay ($\\rho < 1$), and the asymptotic rate of decay or growth.',
            },
            {
              question: 'When does the Jacobi method converge for every starting vector?',
              answerOutline: 'Exactly when $\\rho(I - D^{-1}K) < 1$.',
            },
          ],
        },
        {
          slug: 'markov-processes',
          title: 'Markov processes',
          summary:
            'Column-stochastic matrices, why $1$ is always an eigenvalue, the steady state as an eigenvector, and when the process converges to it.',
          estimatedMinutes: 100,
          objectives: [
            'Write a Markov transition matrix from a verbal description',
            'Prove that $1$ is an eigenvalue of every stochastic matrix and that $|\\lambda| \\le 1$',
            'Compute the steady state as a normalised null vector of $P - I$',
            'State the convergence theorem for regular stochastic matrices and recognise periodic and reducible cases',
          ],
          concepts: [
            'Column-stochastic matrix',
            'Probability vector',
            'Steady state $Pq = q$',
            'Regular (primitive) matrix',
            'Perron-Frobenius theorem (statement)',
            'Rate of convergence $|\\lambda_2|^k$',
            'Periodic and absorbing chains',
          ],
          explanation: `A **Markov process** with $n$ states has a transition matrix $P$ whose entry $p_{ij}$ is the probability of moving from state $j$ to state $i$ in one step. Each column is a probability distribution, so the entries are nonnegative and each column sums to $1$. Such a $P$ is **column-stochastic**. If $p_k$ is the probability vector at step $k$, then $p_{k+1} = Pp_k$. Some books use rows instead. Then $P$ is row-stochastic and multiplies row vectors from the right, so check the convention before using a formula.

**Why $1$ is an eigenvalue.** Column sums of $1$ mean $\\mathbf{1}^TP = \\mathbf{1}^T$, with $\\mathbf{1} = (1, \\dots, 1)$. So $\\mathbf{1}$ is an eigenvector of $P^T$ with eigenvalue $1$, and $P$ has the same eigenvalues as $P^T$. Every eigenvalue satisfies $|\\lambda| \\le 1$, because $\\|P\\|_1$, the largest column sum, equals $1$. A **steady state** is a probability vector $q$ with $Pq = q$, a null vector of $P - I$ normalised so its entries sum to $1$.

**Convergence.** Call $P$ **regular** if some power $P^k$ has all entries strictly positive. The Perron-Frobenius theorem then gives three facts: the steady state $q$ is unique, it has all entries positive, and every other eigenvalue has $|\\lambda| < 1$. Hence $p_k \\to q$ from every starting distribution, with error shrinking like $|\\lambda_2|^k$. Without regularity, things can fail. $\\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}$ has eigenvalues $\\pm1$ and oscillates forever. A chain with two absorbing states has two independent steady states, and the limit depends on where you start.

**Worked example.** A shared bicycle starts each day at station A or B. A bike at A is at A the next morning with probability $0.9$ and at B with probability $0.1$. A bike at B moves to A with probability $0.2$ and stays with probability $0.8$. So
$$P = \\begin{pmatrix} 0.9 & 0.2\\\\ 0.1 & 0.8 \\end{pmatrix}.$$
The trace is $1.7$ and one eigenvalue is $1$, so the other is $\\lambda_2 = 0.7$. For the steady state, $P - I = \\begin{pmatrix} -0.1 & 0.2\\\\ 0.1 & -0.2 \\end{pmatrix}$ gives $0.1q_A = 0.2q_B$. With $q_A + q_B = 1$, this means $q = (\\tfrac23, \\tfrac13)$. The eigenvector for $0.7$ is $(1, -1)$, since $P(1, -1) = (0.7, -0.7)$. A bike that starts at A has
$$p_k = \\left(\\tfrac23, \\tfrac13\\right) + \\tfrac13(0.7)^k(1, -1),$$
which gives $p_0 = (1, 0)$ and $p_1 = (0.9, 0.1)$, as it should. After $10$ days the deviation from the steady state is $\\tfrac13(0.7)^{10} \\approx 0.009$. In the long run, two-thirds of the fleet is at A, whatever the starting distribution.

**Pitfall.** The steady state is an eigenvector of $P$, not of $P^T$. For a column-stochastic matrix, $\\mathbf{1}$ is the eigenvector of $P^T$. The two coincide only when the rows also sum to $1$.`,
          resources: [
            mit1806(U2, 'markov-matrices-fourier-series', 'Markov matrices; Fourier series', 'Steady states as eigenvectors for $\\lambda = 1$.', true),
            ila('stochastic-matrices', 'Stochastic Matrices', 'The Perron-Frobenius theorem for positive stochastic matrices, with examples.'),
            {
              title: 'Grinstead and Snell, Introduction to Probability',
              url: 'https://math.dartmouth.edu/~prob/prob/prob.pdf',
              type: 'textbook',
              cost: 'free',
              provider: 'Dartmouth College',
              note: 'The Markov chains chapter covers regular and absorbing chains from the probability side. Note that it uses row-stochastic matrices.',
            },
          ],
          exercises: [
            {
              slug: 'three-station-steady-state',
              title: 'Three stations',
              prompt:
                'Bikes move between three stations with column-stochastic matrix $P = \\begin{pmatrix} 0.8 & 0.1 & 0.2\\\\ 0.1 & 0.7 & 0.3\\\\ 0.1 & 0.2 & 0.5 \\end{pmatrix}$. Find the steady state exactly by elimination on $P - I$. Find the other two eigenvalues from the trace and determinant (or the characteristic polynomial), and estimate how many days it takes for any start to be within $0.01$ of the steady state in each component.',
              kind: 'problem',
              difficulty: 2,
              hint: '$q = (\\tfrac{9}{22}, \\tfrac{8}{22}, \\tfrac{5}{22})$; the other eigenvalues are $0.5 \\pm \\sqrt3/10 \\approx 0.673, 0.327$. Every column of $P^k$ is within $0.01$ of $q$ from $k = 11$ on.',
            },
            {
              slug: 'eigenvalue-bounds',
              title: 'Eigenvalues of stochastic matrices',
              prompt:
                'Prove that every column-stochastic matrix has $1$ as an eigenvalue and that all its eigenvalues satisfy $|\\lambda| \\le 1$. (Use $\\mathbf{1}^TP = \\mathbf{1}^T$, and for the bound take an eigenvector of $P^T$ and look at its largest entry in absolute value.)',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'non-regular-chains',
              title: 'When convergence fails',
              prompt:
                'For $P_1 = \\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}$ and $P_2 = \\begin{pmatrix} 1 & 0.5 & 0\\\\ 0 & 0 & 0\\\\ 0 & 0.5 & 1 \\end{pmatrix}$, find the eigenvalues, all steady states, and $\\lim P^k p_0$ when it exists. Interpret $P_2$ as a walk with two absorbing ends.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'simulate-a-chain',
              title: 'Simulate and compare',
              prompt:
                'Simulate $10^5$ steps of the three-station chain for a single bike with numpy.random and compare the fraction of time spent at each station with the steady state. Also compute $P^{50}$ and comment on its columns.',
              kind: 'simulation',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $1$ an eigenvalue of every column-stochastic matrix?',
              answerOutline: 'Columns sum to $1$, so $\\mathbf{1}^TP = \\mathbf{1}^T$; $P^T$ has eigenvalue $1$, and $P$ shares eigenvalues with $P^T$.',
            },
            {
              question: 'What does regularity guarantee?',
              answerOutline: 'A unique positive steady state and convergence to it from every start, at rate $|\\lambda_2|^k$ with $|\\lambda_2| < 1$.',
            },
            {
              question: 'How do you compute the steady state by hand?',
              answerOutline: 'Find the null space of $P - I$ and scale the vector so its entries sum to $1$.',
            },
          ],
        },
        {
          slug: 'systems-of-linear-odes',
          title: 'Systems of linear differential equations',
          summary:
            'Solve $u\' = Au$ with eigenvalues and eigenvectors, read stability from the real parts of the eigenvalues, and classify two-dimensional phase portraits by trace and determinant.',
          estimatedMinutes: 120,
          objectives: [
            'Solve $u\' = Au$, $u(0) = u_0$ by expanding $u_0$ in eigenvectors',
            'Convert complex eigenvalue pairs into real oscillating solutions',
            'Decide stability from the real parts of the eigenvalues',
            'Classify a planar system as a node, saddle, spiral or centre from trace and determinant',
            'Rewrite a second-order equation or circuit as a first-order system',
          ],
          concepts: [
            'Eigen-solutions $e^{\\lambda t}x$',
            'Superposition and initial conditions',
            'Complex eigenvalues and oscillation',
            'Stability: all $\\operatorname{Re}\\lambda < 0$',
            'Trace-determinant plane',
            'Companion matrix',
            'Phase portrait',
          ],
          explanation: `For $u' = Au$, try $u = e^{\\lambda t}x$ with a constant vector $x$. Substituting gives $\\lambda e^{\\lambda t}x = Ae^{\\lambda t}x$, so $Ax = \\lambda x$. Every eigenpair gives a solution, and by superposition so does every combination. When $A$ has $n$ independent eigenvectors,
$$u(t) = c_1e^{\\lambda_1t}x_1 + \\cdots + c_ne^{\\lambda_nt}x_n,$$
with the $c_i$ fixed by $u(0) = c_1x_1 + \\cdots + c_nx_n$. This is the discrete formula with $\\lambda^k$ replaced by $e^{\\lambda t}$. The stability condition changes accordingly. Every solution decays to $0$ exactly when **every eigenvalue has negative real part**, because $|e^{\\lambda t}| = e^{(\\operatorname{Re}\\lambda)t}$.

A complex pair $\\lambda = \\alpha \\pm i\\beta$ gives real solutions $e^{\\alpha t}\\cos\\beta t$ and $e^{\\alpha t}\\sin\\beta t$ times real vectors. These oscillate with angular frequency $\\beta$ and grow or decay at rate $\\alpha$. For a $2 \\times 2$ system, the eigenvalues depend only on $T = \\operatorname{tr}A$ and $D = \\det A$, through $\\lambda^2 - T\\lambda + D = 0$. That gives a classification: $D < 0$ is a saddle; $D > 0$ with $T^2 > 4D$ is a node; $D > 0$ with $T^2 < 4D$ is a spiral, or a centre if $T = 0$. The system is stable exactly when $T < 0$ and $D > 0$.

**Worked example: two coupled rooms.** Temperatures $u_1, u_2$ (deviations from outdoors) of two rooms that exchange heat with each other and lose it to the outside obey
$$u' = \\begin{pmatrix} -2 & 1\\\\ 1 & -2 \\end{pmatrix}u,\\qquad u(0) = (1, 0),$$
with time in hours. The eigenvalues are $-1$ with $x_1 = (1, 1)$ and $-3$ with $x_2 = (1, -1)$. Expanding, $(1, 0) = \\tfrac12(1, 1) + \\tfrac12(1, -1)$, so
$$u(t) = \\tfrac12e^{-t}(1, 1) + \\tfrac12e^{-3t}(1, -1).$$
The difference between the rooms decays at rate $3$, while the common temperature decays more slowly at rate $1$. After about an hour, the rooms are nearly equal and cool together. Check: $u_1' = -\\tfrac12e^{-t} - \\tfrac32e^{-3t}$, and $-2u_1 + u_2 = -(e^{-t} + e^{-3t}) + \\tfrac12(e^{-t} - e^{-3t})$ gives the same.

**Second-order equations** become first-order systems. For $x'' + 2x' + 5x = 0$, set $u = (x, x')$. Then $u' = \\begin{pmatrix} 0 & 1\\\\ -5 & -2 \\end{pmatrix}u$, with $T = -2$ and $D = 5$, so $\\lambda = -1 \\pm 2i$: a stable spiral. The motion decays like $e^{-t}$ and oscillates with angular frequency $2$.

**Pitfall.** For a defective $A$, the eigenvector formula misses solutions. A double eigenvalue with one eigenvector produces $te^{\\lambda t}$ terms. The matrix exponential in the next lesson handles every case uniformly.`,
          resources: [
            mit1806(U2, 'differential-equations-and-exp-at', 'Differential equations and exp(At)', 'Eigenvalue solutions of $u\' = Au$ and stability.', true),
            lebl('eigenmethod_section', 'Eigenvalue method', 'Solving constant-coefficient systems by eigenvectors, including complex eigenvalues.'),
            lebl('sec_twodimaut', 'Two-dimensional systems and their vector fields', 'Phase portraits and the classification of planar systems.'),
            {
              title: "Paul's Online Notes: Phase Plane",
              url: 'https://tutorial.math.lamar.edu/Classes/DE/PhasePlane.aspx',
              type: 'textbook',
              cost: 'free',
              provider: 'Lamar University',
              note: 'Sketching phase portraits for each eigenvalue type.',
            },
          ],
          exercises: [
            {
              slug: 'saddle-solution',
              title: 'Solve a saddle',
              prompt:
                'Solve $u\' = \\begin{pmatrix} 1 & 2\\\\ 2 & 1 \\end{pmatrix}u$ with $u(0) = (1, 0)$. Classify the origin, sketch the phase portrait with the two eigen-directions, and find all initial conditions for which $u(t) \\to 0$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$u = \\tfrac12e^{3t}(1, 1) + \\tfrac12e^{-t}(1, -1)$; only starts on the line through $(1, -1)$ decay.',
            },
            {
              slug: 'damped-oscillator-system',
              title: 'A damped oscillator as a system',
              prompt:
                'Solve $x\'\' + 2x\' + 5x = 0$, $x(0) = 1$, $x\'(0) = 0$ by writing it as $u\' = Au$ and using the complex eigenvalues of $A$. Show $x(t) = e^{-t}(\\cos 2t + \\tfrac12\\sin 2t)$ and check it by substitution.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'rlc-circuit',
              title: 'An RLC circuit',
              prompt:
                'A series RLC circuit with charge $q$ and current $i = q\'$ satisfies $Li\' + Ri + q/C = 0$. Write it as a first-order system in $(q, i)$. For $L = 1$ H and $C = 0.25$ F, find the eigenvalues for $R = 2\\ \\Omega$, and find the value of $R$ at which the circuit is critically damped. Classify the phase portrait for $R$ below and above that value.',
              kind: 'problem',
              difficulty: 2,
              hint: 'For $R = 2$, $\\lambda = -1 \\pm i\\sqrt3$. Critical damping at $R = 2\\sqrt{L/C} = 4\\ \\Omega$.',
            },
            {
              slug: 'trace-determinant-proof',
              title: 'Stability from trace and determinant',
              prompt:
                'Prove that a real $2 \\times 2$ system $u\' = Au$ is asymptotically stable if and only if $\\operatorname{tr}A < 0$ and $\\det A > 0$. Treat real and complex eigenvalues separately. Show by example that "$\\operatorname{tr}A < 0$" alone is not enough.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What condition on the eigenvalues makes $u\' = Au$ asymptotically stable, and how does it differ from the discrete case?',
              answerOutline: 'All $\\operatorname{Re}\\lambda < 0$ (continuous) versus all $|\\lambda| < 1$ (discrete).',
            },
            {
              question: 'What does a complex eigenvalue pair $\\alpha \\pm i\\beta$ mean for the motion?',
              answerOutline: 'Oscillation at angular frequency $\\beta$ with amplitude growing or decaying like $e^{\\alpha t}$.',
            },
            {
              question: 'How do you turn $x\'\' + bx\' + cx = 0$ into a first-order system?',
              answerOutline: 'Let $u = (x, x\')$; then $u\' = \\begin{pmatrix} 0 & 1\\\\ -c & -b \\end{pmatrix}u$.',
            },
          ],
        },
        {
          slug: 'matrix-exponential',
          title: 'The matrix exponential',
          summary:
            'Define $e^{At}$ by its power series, compute it by diagonalisation or by splitting off a nilpotent part, and use it to solve homogeneous and forced linear systems.',
          estimatedMinutes: 110,
          objectives: [
            'Define $e^{At}$ by the power series and show that $u = e^{At}u_0$ solves $u\' = Au$',
            'Compute $e^{At}$ by diagonalisation and by summing the series for special matrices',
            'Compute $e^{At}$ for a Jordan block and explain the $te^{\\lambda t}$ terms',
            'Know when $e^{A+B} = e^Ae^B$ and give a counterexample when it fails',
            'Solve $u\' = Au + b$ with constant forcing',
          ],
          concepts: [
            'Power series $e^{At} = \\sum (At)^k/k!$',
            'Fundamental matrix',
            '$e^{At} = Se^{\\Lambda t}S^{-1}$',
            'Nilpotent matrices',
            'Jordan block exponential',
            'Commuting matrices',
            'Variation of parameters',
          ],
          explanation: `For numbers, $e^{at}$ solves $u' = au$. For matrices, define
$$e^{At} = I + At + \\frac{(At)^2}{2!} + \\frac{(At)^3}{3!} + \\cdots.$$
The series converges for every square $A$. Differentiating term by term gives $\\frac{d}{dt}e^{At} = Ae^{At}$, so $u(t) = e^{At}u_0$ solves $u' = Au$ with $u(0) = u_0$. It is the only solution. This works whether or not $A$ is diagonalisable. Useful properties: $e^{A(s+t)} = e^{As}e^{At}$, $(e^{At})^{-1} = e^{-At}$, and $\\det e^{At} = e^{t\\operatorname{tr}A}$. But $e^{A+B} = e^Ae^B$ is guaranteed only when $AB = BA$.

**Three ways to compute it.**

1. **Diagonalise.** If $A = S\\Lambda S^{-1}$, then every power is $S\\Lambda^kS^{-1}$, so $e^{At} = Se^{\\Lambda t}S^{-1}$ with $e^{\\Lambda t} = \\operatorname{diag}(e^{\\lambda_it})$.
2. **Use a pattern in the powers.** If $A^2 = -I$, the series splits into even and odd terms: $e^{At} = I\\cos t + A\\sin t$.
3. **Split off a nilpotent part.** A Jordan block is $\\lambda I + N$ with $N = \\begin{pmatrix} 0 & 1\\\\ 0 & 0 \\end{pmatrix}$ and $N^2 = 0$. Since $\\lambda I$ commutes with $N$, $e^{(\\lambda I + N)t} = e^{\\lambda t}(I + Nt)$. The series for $N$ stops after two terms. This is where the $te^{\\lambda t}$ solutions of defective systems come from.

**Worked example.** Let $A = \\begin{pmatrix} 0 & 1\\\\ -1 & 0 \\end{pmatrix}$, which is $x'' + x = 0$ written for $u = (x, x')$. Then $A^2 = -I$, $A^3 = -A$, $A^4 = I$, and the powers repeat with period four. Group the series:
$$e^{At} = I\\left(1 - \\frac{t^2}{2!} + \\frac{t^4}{4!} - \\cdots\\right) + A\\left(t - \\frac{t^3}{3!} + \\cdots\\right) = \\begin{pmatrix} \\cos t & \\sin t\\\\ -\\sin t & \\cos t \\end{pmatrix}.$$
With $u_0 = (x_0, v_0)$, the first row gives $x(t) = x_0\\cos t + v_0\\sin t$, the familiar oscillator solution. The determinant is $\\cos^2t + \\sin^2t = 1 = e^{t\\operatorname{tr}A}$, since $\\operatorname{tr}A = 0$. Phase-plane area is conserved, as for any undamped mechanical system.

Next, the Jordan block $A = \\begin{pmatrix} -1 & 1\\\\ 0 & -1 \\end{pmatrix}$ gives
$$e^{At} = e^{-t}\\begin{pmatrix} 1 & t\\\\ 0 & 1 \\end{pmatrix}.$$
The second component decays like $e^{-t}$ and feeds the first, which picks up a $te^{-t}$ term. The system is critically damped.

**Forcing.** For $u' = Au + f(t)$, multiply by $e^{-At}$ and integrate. This gives
$$u(t) = e^{At}u_0 + \\int_0^te^{A(t-s)}f(s)\\,ds.$$
With constant $f = b$ and invertible $A$, the integral evaluates to $u(t) = e^{At}(u_0 + A^{-1}b) - A^{-1}b$. If $A$ is stable, $u(t) \\to -A^{-1}b$, the equilibrium.

**Pitfall.** $e^{At}$ is not the matrix of entrywise exponentials $e^{a_{ij}t}$. The two agree only for diagonal $A$.`,
          resources: [
            mit1806(U2, 'differential-equations-and-exp-at', 'Differential equations and exp(At)', 'The matrix exponential from its series and from $S\\Lambda S^{-1}$.', true),
            lebl('sec_matexp', 'Matrix exponentials', 'Computing $e^{At}$, including the nilpotent case, with exercises.'),
            {
              title: 'SciPy documentation: scipy.linalg.expm',
              url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.linalg.expm.html',
              type: 'documentation',
              cost: 'free',
              provider: 'SciPy',
              note: 'Use it to check every hand computation of $e^{At}$ in this lesson.',
            },
          ],
          exercises: [
            {
              slug: 'exp-by-diagonalising',
              title: 'Exponential by diagonalisation',
              prompt:
                'Compute $e^{At}$ for $A = \\begin{pmatrix} -2 & 1\\\\ 1 & -2 \\end{pmatrix}$ by diagonalisation and use it to re-derive the two-room solution from the previous lesson. Check $\\det e^{At} = e^{t\\operatorname{tr}A}$, and check your matrix against scipy.linalg.expm at $t = 0.5$.',
              kind: 'problem',
              difficulty: 1,
              hint: '$e^{At} = \\tfrac12\\begin{pmatrix} e^{-t} + e^{-3t} & e^{-t} - e^{-3t}\\\\ e^{-t} - e^{-3t} & e^{-t} + e^{-3t} \\end{pmatrix}$.',
            },
            {
              slug: 'jordan-exponential',
              title: 'A Jordan block',
              prompt:
                'Show directly from the series that $e^{At} = e^{2t}\\begin{pmatrix} 1 & t\\\\ 0 & 1 \\end{pmatrix}$ for $A = \\begin{pmatrix} 2 & 1\\\\ 0 & 2 \\end{pmatrix}$, by writing $A = 2I + N$. Verify that $\\frac{d}{dt}e^{At} = Ae^{At}$ by differentiating your answer.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'non-commuting',
              title: 'When exponentials do not multiply',
              prompt:
                'Let $A = \\begin{pmatrix} 0 & 1\\\\ 0 & 0 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 0\\\\ 1 & 0 \\end{pmatrix}$. Compute $e^A$, $e^B$, $e^Ae^B$ and $e^{A+B}$ exactly, and show $e^Ae^B \\ne e^{A+B}$. Then prove $e^{A+B} = e^Ae^B$ when $AB = BA$, by multiplying the series.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$e^Ae^B = \\begin{pmatrix} 2 & 1\\\\ 1 & 1 \\end{pmatrix}$ while $e^{A+B} = \\begin{pmatrix} \\cosh 1 & \\sinh 1\\\\ \\sinh 1 & \\cosh 1 \\end{pmatrix}$.',
            },
            {
              slug: 'forced-system',
              title: 'A forced system',
              prompt:
                'Derive $u(t) = e^{At}(u_0 + A^{-1}b) - A^{-1}b$ for $u\' = Au + b$ with constant $b$ and invertible $A$. For the two-room matrix with $b = (1, 0)$ (a heater in room 1) and $u_0 = (0, 1)$, find the long-run temperatures and check the formula against scipy.integrate.solve_ivp at $t = 0.7$.',
              kind: 'coding',
              difficulty: 3,
              hint: 'The equilibrium is $-A^{-1}b = (\\tfrac23, \\tfrac13)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $u = e^{At}u_0$ solve $u\' = Au$?',
              answerOutline: 'Differentiating the series term by term gives $Ae^{At}$, and $e^{A\\cdot 0} = I$ gives the initial condition.',
            },
            {
              question: 'How do you compute $e^{At}$ for a diagonalisable $A$?',
              answerOutline: '$Se^{\\Lambda t}S^{-1}$ with $e^{\\Lambda t} = \\operatorname{diag}(e^{\\lambda_it})$.',
            },
            {
              question: 'Where do $te^{\\lambda t}$ terms come from?',
              answerOutline: 'From a Jordan block $\\lambda I + N$ with $N^2 = 0$: $e^{(\\lambda I + N)t} = e^{\\lambda t}(I + Nt)$.',
            },
            {
              question: 'When is $e^{A+B} = e^Ae^B$?',
              answerOutline: 'When $A$ and $B$ commute; in general it fails.',
            },
          ],
        },
        {
          slug: 'vibrations-and-normal-modes',
          relatedLessons: ['classical-mechanics/lagrangian-mechanics/small-oscillations-and-applications'],
          title: 'Vibrations and normal modes',
          summary:
            'Undamped structures obey $Mu\'\' + Ku = 0$. Normal modes come from the generalised eigenproblem $Kv = \\omega^2Mv$, and every free vibration is a superposition of them.',
          estimatedMinutes: 130,
          objectives: [
            'Derive $Mu\'\' + Ku = 0$ for a mass-spring system and set up $Kv = \\omega^2Mv$',
            'Find natural frequencies and mode shapes by hand for two and three degrees of freedom',
            'Write a free vibration as a superposition of normal modes fitted to initial conditions',
            'Prove that modes are $M$-orthogonal and explain zero-frequency rigid-body modes',
            'Explain beats in weakly coupled oscillators',
          ],
          concepts: [
            'Mass matrix and stiffness matrix',
            'Generalised eigenproblem $Kv = \\omega^2Mv$',
            'Natural frequency and mode shape',
            'Modal superposition',
            '$M$-orthogonality of modes',
            'Rigid-body (zero-frequency) modes',
            'Beats',
          ],
          explanation: `Newton's law for a structure with mass matrix $M$ and stiffness matrix $K = A^TCA$, with no damping and no load, is
$$Mu'' + Ku = 0.$$
Look for solutions in which every mass moves in step, $u = v\\cos(\\omega t)$. Substituting gives $-\\omega^2Mv + Kv = 0$, the **generalised eigenproblem**
$$Kv = \\omega^2Mv,\\qquad \\det(K - \\omega^2M) = 0.$$
Each root $\\omega_i^2$ gives a **natural frequency** $\\omega_i$, and its vector $v_i$ is the **mode shape**. Because $K$ is symmetric positive semidefinite and $M$ is symmetric positive definite, every $\\omega_i^2$ is real and nonnegative. Modes with different frequencies are **$M$-orthogonal**, $v_i^TMv_j = 0$, by the same argument as for symmetric matrices. A free vibration is a superposition
$$u(t) = \\sum_i v_i\\,(a_i\\cos\\omega_it + b_i\\sin\\omega_it),$$
where the $a_i$ come from $u(0)$ and the $b_i\\omega_i$ from $u'(0)$. If $K$ has a null space, as for a free-floating structure, the corresponding modes have $\\omega = 0$. They are rigid-body motions, $u = (a + bt)v$, not vibrations.

**Worked example: two masses, three springs.** Two equal masses $m$ sit between two walls, joined by three equal springs $k$. Then $M = mI$ and $K = k\\begin{pmatrix} 2 & -1\\\\ -1 & 2 \\end{pmatrix}$, the fixed-fixed chain matrix. So $\\omega^2$ is an eigenvalue of $K/m$, either $k/m$ or $3k/m$:

- $\\omega_1 = \\sqrt{k/m}$ with $v_1 = (1, 1)$. The masses move together, the middle spring never stretches, and each mass feels one outer spring.
- $\\omega_2 = \\sqrt{3k/m}$ with $v_2 = (1, -1)$. The masses move oppositely, and each feels its outer spring plus twice the stretch of the middle one.

Pull mass 1 by one unit and release both from rest: $u(0) = (1, 0)$, $u'(0) = 0$. Expanding, $(1, 0) = \\tfrac12v_1 + \\tfrac12v_2$, and all $b_i = 0$, so
$$u(t) = \\tfrac12\\cos(\\omega_1t)(1, 1) + \\tfrac12\\cos(\\omega_2t)(1, -1).$$
Check: $u(0) = (1, 0)$, and $mu'' = -\\tfrac{k}{2}\\cos(\\omega_1t)(1, 1) - \\tfrac{3k}{2}\\cos(\\omega_2t)(1, -1)$, which equals $-Ku$ because $Kv_1 = kv_1$ and $Kv_2 = 3kv_2$. The motion is not periodic in general, since $\\omega_2/\\omega_1 = \\sqrt3$ is irrational. If the middle spring were much weaker than the outer ones, the two frequencies would be close, and the energy would slosh slowly from one mass to the other. Those are **beats**, at the difference frequency.

**Unequal masses.** With a general diagonal $M$, either solve $\\det(K - \\omega^2M) = 0$ directly, or substitute $u = M^{-1/2}w$. That turns the problem into the ordinary symmetric eigenproblem for $M^{-1/2}KM^{-1/2}$, so the spectral theorem applies.

**Pitfall.** The eigenvalues are $\\omega^2$, not $\\omega$. Frequencies in hertz are $\\omega/2\\pi$.`,
          resources: [
            lebl('sol_section', 'Second-order systems and applications', 'Normal modes of mass-spring systems, worked by eigenvalues.', ),
            mit18085('The dynamics lectures treat $Mu\'\' + Ku = 0$, generalised eigenproblems and modal superposition.', true),
            {
              title: 'PhET Normal Modes simulation',
              url: 'https://phet.colorado.edu/en/simulations/normal-modes',
              type: 'interactive',
              cost: 'free',
              provider: 'University of Colorado Boulder',
              note: 'Set up chains of masses and watch individual modes and their superpositions. Compare with your hand calculations.',
            },
          ],
          exercises: [
            {
              slug: 'three-mass-modes',
              title: 'Three masses, four springs',
              prompt:
                'Three equal masses $m$ between two walls are joined by four equal springs $k$. Using the eigenvalues of the $3 \\times 3$ second-difference matrix, give the three natural frequencies and mode shapes, describe each mode in words, and check that the modes are mutually orthogonal.',
              kind: 'problem',
              difficulty: 1,
              hint: '$\\omega^2 = (2 - \\sqrt2)k/m$, $2k/m$, $(2 + \\sqrt2)k/m$ with modes $(1, \\sqrt2, 1)$, $(1, 0, -1)$, $(1, -\\sqrt2, 1)$.',
            },
            {
              slug: 'unequal-masses',
              title: 'Unequal masses',
              prompt:
                'In the two-mass example, let the first mass be $2m$ and the second $m$, with the same three springs $k$. Solve $\\det(K - \\omega^2M) = 0$ for $\\omega^2$ and find both mode shapes. Check that they are $M$-orthogonal but not orthogonal in the ordinary sense.',
              kind: 'problem',
              difficulty: 2,
              hint: 'With $x = m\\omega^2/k$, $2x^2 - 6x + 3 = 0$, so $x = (3 \\pm \\sqrt3)/2 \\approx 0.634, 2.366$.',
            },
            {
              slug: 'linear-triatomic',
              title: 'A linear triatomic molecule',
              prompt:
                'Model a linear molecule such as CO$_2$ as masses $m$, $M$, $m$ in a line joined by two springs $k$, with both ends free. Set up $K$ and $M$, and show that the squared frequencies are $0$, $k/m$ and $(k/m)(1 + 2m/M)$. Describe each mode. With $m = 16$ and $M = 12$ (atomic mass units), compute the ratio of the two nonzero frequencies.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The ratio is $\\sqrt{1 + 2m/M} = \\sqrt{11/3} \\approx 1.91$.',
            },
            {
              slug: 'shear-building',
              title: 'Free vibration of a three-storey building',
              prompt:
                'Model a three-storey shear building as three floor masses $m$ with storey stiffnesses $k$ (the ground is fixed, the roof is free). Write $M$ and $K$, compute the natural frequencies and modes for $m = 2 \\times 10^4$ kg and $k = 4 \\times 10^7$ N/m with numpy.linalg.eigh, and simulate the free response to a $1$ cm roof displacement two ways: by modal superposition, and by scipy.linalg.expm applied to the first-order system. Plot both and confirm they agree.',
              kind: 'simulation',
              difficulty: 3,
            },
            {
              slug: 'm-orthogonality',
              title: 'Modes are M-orthogonal',
              prompt:
                'Prove that if $Kv_i = \\omega_i^2Mv_i$ and $Kv_j = \\omega_j^2Mv_j$ with $\\omega_i \\ne \\omega_j$, and $K$, $M$ symmetric, then $v_i^TMv_j = 0$ and $v_i^TKv_j = 0$. Use this to derive a formula for the modal coefficients $a_i$ from $u(0)$.',
              kind: 'derivation',
              difficulty: 2,
              hint: '$a_i = v_i^TMu(0)/(v_i^TMv_i)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the eigenproblem for normal modes from $Mu\'\' + Ku = 0$.',
              answerOutline: 'Substitute $u = v\\cos\\omega t$ to get $(K - \\omega^2M)v = 0$, so $\\omega^2$ are roots of $\\det(K - \\omega^2M) = 0$.',
            },
            {
              question: 'Why are all $\\omega^2 \\ge 0$ for a real structure?',
              answerOutline: '$\\omega^2 = v^TKv/v^TMv$ with $K$ positive semidefinite and $M$ positive definite.',
            },
            {
              question: 'What does a zero natural frequency mean?',
              answerOutline: 'A rigid-body mode in $N(K)$: the structure translates or rotates without deforming.',
            },
            {
              question: 'How are the modal amplitudes found from initial conditions?',
              answerOutline: 'Expand $u(0)$ and $u\'(0)$ in the modes, using $M$-orthogonality: $a_i = v_i^TMu(0)/v_i^TMv_i$ and $b_i\\omega_i = v_i^TMu\'(0)/v_i^TMv_i$.',
            },
          ],
        },
      ],
      project: {
        slug: 'coupled-pendulums',
        title: 'Coupled pendulums and beats',
        description: `Two identical pendulums of length $L$ and mass $m$, joined by a weak spring of stiffness $\\kappa$ attached at their bobs, are the classic demonstration of normal modes and beats. For small angles, the equations are $mL\\theta_1'' = -mg\\theta_1 - \\kappa L(\\theta_1 - \\theta_2)$ and the matching equation for $\\theta_2$.

Work out the normal modes and the beat period by hand. Then confirm the prediction by simulation, and, if you can, with a real experiment using two weights on strings and a rubber band or soft spring.`,
        deliverables: [
          'The small-angle equations in the form $M\\theta\'\' + K\\theta = 0$, with both mode frequencies and shapes derived by hand',
          'The solution for $\\theta(0) = (\\theta_0, 0)$, $\\theta\'(0) = 0$ written as a product of a fast oscillation and a slow envelope, and the predicted beat period',
          'A simulation using scipy.linalg.expm on the first-order system, plotted against your formula',
          'A table of beat period against coupling strength, showing how it grows as $\\kappa \\to 0$',
          'Either measurements from a physical build (a phone video timed frame by frame is enough) or a written discussion of which effects, such as damping and finite amplitude, the linear model omits',
        ],
        estimatedHours: 7,
        stretchGoals: [
          'Add light damping $c\\theta\'$ and show how the beats fade',
          'Extend to three pendulums in a line and find the three modes',
        ],
      },
    },
  ],
  capstone: {
    slug: 'structure-statics-and-dynamics',
    title: 'Statics and dynamics of a small structure',
    description: `Choose a small physical structure and analyse it completely with the tools of this course: a plane truss footbridge, a three- to five-storey shear building, or a mass-spring model of a vehicle suspension. The analysis must cover equilibrium, the identification of a parameter from measured data, and free and forced vibration. Do every small computation by hand at least once, and use NumPy and SciPy for the full-size model and for checks.

The point of the capstone is to show that the pieces fit together. The matrix $A$ from geometry, the positive definite $K = A^TCA$, least squares, the spectral theorem and the matrix exponential all describe one object. Write it up as an engineering report that a classmate could follow and reproduce.`,
    deliverables: [
      'Model definition: a drawing, degrees of freedom, $A$, $C$, $K$ and $M$, with a check of $\\operatorname{rank} A$ and of the positive definiteness of $K$ by pivots or eigenvalues',
      'Static analysis: displacements and internal forces for two load cases, with one load case checked by hand on a reduced version of the model',
      'Parameter identification: given simulated noisy static deflections (generate them yourself from a hidden stiffness value), recover the stiffness by least squares and report the fitted value and residuals',
      'Modal analysis: natural frequencies and mode shapes, with $M$-orthogonality checked numerically and the lowest frequency bounded by a Rayleigh quotient from a guessed mode',
      'Dynamics: the free response to an initial displacement by modal superposition and by scipy.linalg.expm, and the response to a suddenly applied constant load, showing it oscillates about the static solution',
      'A report of at most ten pages with figures, explaining each step and stating what the linear model leaves out',
    ],
    estimatedHours: 20,
    stretchGoals: [
      'Add proportional damping $C_d = \\alpha M + \\beta K$ and show that the modes still decouple',
      'Compute the steady-state response to harmonic forcing and plot amplitude against forcing frequency, marking the resonances',
      'Compare the lowest computed frequency with a measurement on a physical model',
    ],
  },
  masteryChecklist: [
    'I can solve a linear system by elimination, factor $A = LU$ or $PA = LU$ by hand, and estimate the cost for large $n$',
    'I can find bases and dimensions of the four fundamental subspaces and decide solvability of $Ax = b$',
    'I can interpret the null spaces of an incidence matrix as constant potentials and loop currents',
    'I can write the matrix of a linear map, change basis with $S^{-1}AS$, and compute determinants efficiently',
    'I can apply Gram-Schmidt and Householder reflections, factor $A = QR$, and fit data by least squares',
    'I can assemble $A^TCA$ for spring chains, resistor networks and trusses, test it for positive definiteness, and detect mechanisms',
    'I can diagonalise matrices, apply the spectral theorem, and compute an SVD for a small matrix',
    'I can solve $u_{k+1} = Tu_k$, Markov processes, $u\' = Au$ and $Mu\'\' + Ku = 0$, using eigenvalues and the matrix exponential, and decide stability',
  ],
});
