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

\`\`\`interactive
row-reduce
{"title": "Eliminate the worked example yourself", "A": [[1, 2, 1, 1], [2, 5, 3, 3], [-1, 1, 4, 6]], "vars": ["x", "y", "z"], "target": "echelon", "caption": "Choose R₂ → R₂ − 2R₁ (the box fills in the multiplier for you), then R₃ → R₃ + R₁ and R₃ → R₃ − 3R₂. The outlined pivots become 1, 1, 2, and at upper triangular form the widget back-substitutes to (1, −1, 2). Undo and try a bad order to see the pivots lose their staircase shape. Then use Edit matrix to check your multipliers and pivots for the first exercise below, or the mesh-current system."}
\`\`\`

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
              prompt: `Solve $x_1 + x_2 + x_3 = 6$, $2x_1 + 3x_2 + x_3 = 11$, $x_1 - x_2 + 2x_3 = 5$ by elimination and back substitution.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `List the multipliers you use.`, answer: `$\\ell_{21} = 2$ and $\\ell_{31} = 1$ clear column 1, leaving rows $[0\\ 1\\ {-1} \\mid -1]$ and $[0\\ {-2}\\ 1 \\mid -1]$. Then $\\ell_{32} = -2$: add twice row 2 to row 3, giving $[0\\ 0\\ {-1} \\mid -3]$.` },
                { prompt: `Give the three pivots.`, answer: `$1, 1, -1$, read from the diagonal of the triangular system.` },
                { prompt: `Back substitute, and check the solution in the original equations.`, answer: `$x_3 = 3$, then $x_2 = -1 + x_3 = 2$, then $x_1 = 6 - 2 - 3 = 1$, so $x = (1, 2, 3)$. Check: $1 + 2 + 3 = 6$, $2 + 6 + 3 = 11$, $1 - 2 + 6 = 5$.` },
              ],
            },
            {
              slug: 'mesh-currents',
              title: 'Loop currents in a three-mesh circuit',
              prompt: `Mesh analysis of a resistor circuit gives, with currents in amperes, $6I_1 - 2I_2 = 10$, $-2I_1 + 9I_2 - 3I_3 = 2$ and $-3I_2 + 7I_3 = 4$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Solve by elimination.`, answer: `$\\ell_{21} = -\\tfrac13$ turns row 2 into $[0\\ \\tfrac{25}{3}\\ {-3} \\mid \\tfrac{16}{3}]$, and $\\ell_{32} = -\\tfrac{9}{25}$ turns row 3 into $[0\\ 0\\ \\tfrac{148}{25} \\mid \\tfrac{148}{25}]$. So $I_3 = 1$, $I_2 = (\\tfrac{16}{3} + 3)/\\tfrac{25}{3} = 1$ and $I_1 = (10 + 2)/6 = 2$: $(I_1, I_2, I_3) = (2, 1, 1)$ A.` },
                { prompt: `Explain why the matrix is symmetric: what does the $-2$ in positions $(1,2)$ and $(2,1)$ represent physically?`, answer: `It is minus the $2\\ \\Omega$ resistance shared by meshes 1 and 2. A shared resistor carries both loop currents, so it enters the equation of each mesh with the same value, and entry $(i, j)$ equals entry $(j, i)$. The diagonal entries are the total resistance around each mesh.` },
              ],
            },
            {
              slug: 'parameter-cases',
              title: 'Zero, one or infinitely many',
              prompt: `For which values of $h$ and $k$ does the system $x + 2y = 3$, $3x + hy = k$ have each of these solution sets?`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Exactly one solution.`, answer: `Subtract $3$ times row 1: the second equation becomes $(h - 6)y = k - 9$. There is a second pivot exactly when $h \\ne 6$, for any $k$.` },
                { prompt: `No solution.`, answer: `$h = 6$ and $k \\ne 9$: the second equation reads $0 = k - 9 \\ne 0$.` },
                { prompt: `Infinitely many solutions. Write the solution set in parametric form.`, answer: `$h = 6$ and $k = 9$: the second equation is $0 = 0$, $y = t$ is free and $x = 3 - 2t$, so $(x, y) = (3, 0) + t(-2, 1)$.` },
              ],
            },
            {
              slug: 'never-two-solutions',
              title: 'Prove that two solutions give infinitely many',
              prompt: `Let $A$ be an $m \\times n$ matrix and consider the system $Ax = b$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that if $Ax = b$ has two different solutions $x \\ne y$, then the vectors $x + t(y - x)$ are distinct solutions for all real $t$.`, answer: `$A(x + t(y - x)) = Ax + t(Ay - Ax) = b + t(b - b) = b$. If $x + s(y - x) = x + t(y - x)$, then $(s - t)(y - x) = 0$, and $y - x \\ne 0$ forces $s = t$. So different values of $t$ give different solutions.` },
                { prompt: `Conclude that the number of solutions is $0$, $1$ or infinite.`, answer: `If there are at least two solutions, the previous part gives infinitely many. So the number of solutions can never be a finite number larger than $1$.` },
                { prompt: `Show that the set of all solutions is $\\{x_p + z : Az = 0\\}$ for any one particular solution $x_p$.`, answer: `If $Az = 0$ then $A(x_p + z) = b + 0 = b$. Conversely, if $Ax = b$ then $z = x - x_p$ satisfies $Az = b - b = 0$, and $x = x_p + z$. Each set contains the other, so they are equal.` },
              ],
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
          quiz: [
            {
              question: `Eliminate $x$ from $x + 3y = 5$, $2x + 7y = 12$ and back substitute. What is the solution $(x, y)$?`,
              options: [`$(-1, 2)$`, `$(11, 2)$`, `$(-31, 12)$`, `$(2, 1)$`],
              answer: 0,
              explanation: `Subtracting $2$ times row 1 from row 2 gives $y = 12 - 10 = 2$, and then $x = 5 - 3y = -1$. Check: $-1 + 6 = 5$ and $-2 + 14 = 12$. $(11, 2)$ comes from back substituting with the wrong sign, $x = 5 + 3y$. $(-31, 12)$ forgets to subtract on the right-hand side, and $(2, 1)$ satisfies the first equation but not the second, which is why you check in every original equation.`,
            },
            {
              question: `Elimination on a $3 \\times 3$ augmented matrix $[A \\mid b]$ ends with the last row $[0\\ 0\\ 0 \\mid 0]$, and no row of the form $[0\\ 0\\ 0 \\mid c]$ with $c \\ne 0$. What does this say about $Ax = b$?`,
              options: [`It has no solution`, `It has exactly one solution, because $0 = 0$ is always true`, `It has infinitely many solutions`, `It cannot be decided without knowing $b$`],
              answer: 2,
              explanation: `The zero row means one column has no pivot, so one variable is free, and the absence of a row $0 = c$ means the system is consistent. A consistent system with a free variable has infinitely many solutions. The singular matrix alone would leave "none or infinitely many" open, but $b$ has already been carried through the elimination in the last column, so the answer is decided.`,
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

\`\`\`interactive
row-reduce
{"mode": "inverse", "title": "Gauss-Jordan on [K | I]", "A": [[2, -1, 0], [-1, 2, -1], [0, -1, 2]], "name": "K", "caption": "Do the steps of the worked example: R₂ → R₂ + ½R₁ (type 1/2), R₃ → R₃ + ⅔R₂, then scale each row by one over its pivot and clear upward. The exact fractions should match the text at every step, and when the left block becomes I the right block is K⁻¹ = ¼ times rows (3, 2, 1), (2, 4, 2), (1, 2, 3). Next step does the same job in the standard order."}
\`\`\`

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
              prompt: `Let $A = \\begin{pmatrix} 1 & 2\\\\ 3 & 4 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Compute $AB$ and describe in words what multiplying by $B$ on the right does to $A$.`, answer: `$AB = \\begin{pmatrix} 2 & 1\\\\ 4 & 3 \\end{pmatrix}$. Multiplying on the right swaps the columns of $A$: column 1 of $AB$ is $A(0, 1)$, the second column of $A$.` },
                { prompt: `Compute $BA$ and describe in words what multiplying by $B$ on the left does to $A$.`, answer: `$BA = \\begin{pmatrix} 3 & 4\\\\ 1 & 2 \\end{pmatrix}$. Multiplying on the left swaps the rows of $A$.` },
                { prompt: `Compute $(AB)^T$ and check that it equals $B^T A^T$.`, answer: `$(AB)^T = \\begin{pmatrix} 2 & 4\\\\ 1 & 3 \\end{pmatrix}$. Since $B^T = B$, $B^TA^T = \\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} 1 & 3\\\\ 2 & 4 \\end{pmatrix} = \\begin{pmatrix} 2 & 4\\\\ 1 & 3 \\end{pmatrix}$, the same matrix.` },
              ],
            },
            {
              slug: 'difference-and-sum',
              title: 'The difference matrix and its inverse',
              prompt: `Let $D = \\begin{pmatrix} 1 & 0 & 0\\\\ -1 & 1 & 0\\\\ 0 & -1 & 1 \\end{pmatrix}$, so $Dx$ lists the differences $x_1, x_2 - x_1, x_3 - x_2$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find $D^{-1}$ by Gauss-Jordan elimination.`, answer: `Reduce $[D \\mid I]$: add row 1 to row 2, then add the new row 2 to row 3. The left block is then $I$ and $D^{-1} = \\begin{pmatrix} 1 & 0 & 0\\\\ 1 & 1 & 0\\\\ 1 & 1 & 1 \\end{pmatrix}$.` },
                { prompt: `Explain why the answer is a running-sum matrix.`, answer: `$D^{-1}b = (b_1, b_1 + b_2, b_1 + b_2 + b_3)$. If $b$ lists the differences of $x$, you recover $x_k$ by adding the first $k$ differences back up, so undoing differences is taking running sums.` },
                { prompt: `Find the inverse of the upper triangular matrix $\\begin{pmatrix} 1 & 1 & 0\\\\ 0 & 1 & 1\\\\ 0 & 0 & 1 \\end{pmatrix}$.`, answer: `$\\begin{pmatrix} 1 & -1 & 1\\\\ 0 & 1 & -1\\\\ 0 & 0 & 1 \\end{pmatrix}$. Back substitution gives $x_3 = b_3$, $x_2 = b_2 - b_3$, $x_1 = b_1 - b_2 + b_3$, and those coefficients are the rows of the inverse.` },
              ],
            },
            {
              slug: 'unit-load-response',
              title: 'Unit loads on a spring chain',
              prompt: `Use $K^{-1}$ from the worked example for the three forces below.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the displacements when forces $f = (1, 0, -1)$ act on the three masses, and verify by computing $Ku$.`, answer: `$u = K^{-1}f = \\tfrac14(3 - 1, 2 - 2, 1 - 3) = (\\tfrac12, 0, -\\tfrac12)$. Check: $Ku = (1 - 0,\\ -\\tfrac12 + 0 + \\tfrac12,\\ 0 - 1) = (1, 0, -1)$.` },
                { prompt: `Find the displacements when $f = (1, 1, 1)$ (gravity with unit weights), and verify by computing $Ku$.`, answer: `$u = \\tfrac14(6, 8, 6) = (\\tfrac32, 2, \\tfrac32)$. Check: $Ku = (3 - 2,\\ -\\tfrac32 + 4 - \\tfrac32,\\ -2 + 3) = (1, 1, 1)$.` },
                { prompt: `Explain from the symmetry of the chain why the first answer is antisymmetric and the second symmetric.`, answer: `The chain looks the same when reversed, which swaps masses 1 and 3. Reversing $f = (1, 0, -1)$ gives $-f$, so the response reverses to $-u$: $u_3 = -u_1$ and $u_2 = 0$. Reversing $(1, 1, 1)$ leaves it unchanged, so $u$ is unchanged too: $u_3 = u_1$.` },
              ],
            },
            {
              slug: 'inverse-proofs',
              title: 'Inverse rules',
              prompt: `Prove each of these rules for square matrices.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `If $A$ and $B$ are invertible $n \\times n$ matrices, then $AB$ is invertible with inverse $B^{-1}A^{-1}$.`, answer: `$(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$, and in the other order $(B^{-1}A^{-1})(AB) = B^{-1}(A^{-1}A)B = B^{-1}B = I$.` },
                { prompt: `If $A$ is invertible then $A^T$ is invertible and $(A^T)^{-1} = (A^{-1})^T$.`, answer: `Transpose $AA^{-1} = I$ and $A^{-1}A = I$ using $(XY)^T = Y^TX^T$: $(A^{-1})^TA^T = I$ and $A^T(A^{-1})^T = I$. So $(A^{-1})^T$ is the inverse of $A^T$.` },
                { prompt: `If a square matrix $A$ has a nonzero vector $x$ with $Ax = 0$, then $A$ is not invertible.`, answer: `Suppose $A^{-1}$ exists and multiply $Ax = 0$ by it: $x = A^{-1}Ax = A^{-1}0 = 0$, which contradicts $x \\ne 0$.` },
              ],
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
          quiz: [
            {
              question: `What is the inverse of $\\begin{pmatrix} 3 & 1\\\\ 5 & 2 \\end{pmatrix}$?`,
              options: [`$\\begin{pmatrix} 2 & 1\\\\ 5 & 3 \\end{pmatrix}$`, `$\\begin{pmatrix} 3 & -1\\\\ -5 & 2 \\end{pmatrix}$`, `$\\begin{pmatrix} -2 & 1\\\\ 5 & -3 \\end{pmatrix}$`, `$\\begin{pmatrix} 2 & -1\\\\ -5 & 3 \\end{pmatrix}$`],
              answer: 3,
              explanation: `$ad - bc = 6 - 5 = 1$, so the inverse is $\\begin{pmatrix} d & -b\\\\ -c & a \\end{pmatrix} = \\begin{pmatrix} 2 & -1\\\\ -5 & 3 \\end{pmatrix}$; multiplying back gives $I$. Swapping the diagonal without negating the off-diagonal entries gives the first option, and negating them without swapping the diagonal gives the second.`,
            },
            {
              question: `Let $A = \\begin{pmatrix} 1 & 2\\\\ 2 & 4 \\end{pmatrix}$. Does $AB = AC$ force $B = C$?`,
              options: [`Yes: you can always cancel $A$ from both sides`, `No: $A$ is singular, and for example $B = 0$, $C = \\begin{pmatrix} 2 & 0\\\\ -1 & 0 \\end{pmatrix}$ give $AB = AC$`, `Yes, because $A$ is not the zero matrix`, `No, because matrix multiplication is not commutative`],
              answer: 1,
              explanation: `Cancelling means multiplying both sides on the left by $A^{-1}$, which needs $A$ to be invertible. Here $\\det A = 0$ and $A(2, -1) = 0$, so the given $C$ has $AC = 0 = AB$ with $C \\ne B$. Non-commutativity is not the reason: the cancellation is on the same side of both products, and for an invertible $A$ it works.`,
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

\`\`\`interactive
row-reduce
{"mode": "lu", "title": "Factor the spring-chain matrix", "A": [[2, -1, 0], [-1, 2, -1], [0, -1, 2]], "name": "K", "b": [1, 1, 1], "unknown": "u", "caption": "Subtract ℓ₂₁ = −1/2 times R₁ from R₂, note that ℓ₃₁ = 0 needs no step at all, then subtract ℓ₃₂ = −2/3 times R₂ from R₃. Each multiplier lands in L, and the pivots 2, 3/2, 4/3 sit on the diagonal of U. Once U is triangular, the forward and back substitutions give c = (1, 3/2, 2) and u = (3/2, 2, 3/2). Notice that L and U stay bidiagonal: no new non-zeros appear. Then try the no-lu exercise matrix with Edit matrix."}
\`\`\`

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
              prompt: `Let $A = \\begin{pmatrix} 1 & 2 & 0\\\\ 2 & 5 & 3\\\\ 0 & 3 & 10 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the $LU$ factorisation of $A$.`, answer: `The multipliers are $\\ell_{21} = 2$, $\\ell_{31} = 0$ and then $\\ell_{32} = 3$, so $L = \\begin{pmatrix} 1 & 0 & 0\\\\ 2 & 1 & 0\\\\ 0 & 3 & 1 \\end{pmatrix}$ and $U = \\begin{pmatrix} 1 & 2 & 0\\\\ 0 & 1 & 3\\\\ 0 & 0 & 1 \\end{pmatrix}$.` },
                { prompt: `Since $A$ is symmetric, write it as $LDL^T$.`, answer: `All three pivots are $1$, so $D = I$ and $U = L^T$: $A = LDL^T = LL^T$ with the $L$ above.` },
                { prompt: `Use the factors to solve $Ax = (3, 10, 13)$ by forward and back substitution.`, answer: `Forward, $Lc = b$: $c_1 = 3$, $c_2 = 10 - 6 = 4$, $c_3 = 13 - 12 = 1$. Back, $Ux = c$: $x_3 = 1$, $x_2 = 4 - 3 = 1$, $x_1 = 3 - 2 = 1$. So $x = (1, 1, 1)$.` },
              ],
            },
            {
              slug: 'no-lu',
              title: 'An invertible matrix with no LU',
              prompt: `Consider the invertible matrix $\\begin{pmatrix} 0 & 1\\\\ 1 & 1 \\end{pmatrix}$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Show that it cannot be written as $\\begin{pmatrix} 1 & 0\\\\ \\ell & 1 \\end{pmatrix}\\begin{pmatrix} p & q\\\\ 0 & r \\end{pmatrix}$ for any numbers $\\ell, p, q, r$, by multiplying out and comparing entries.`, answer: `The product is $\\begin{pmatrix} p & q\\\\ \\ell p & \\ell q + r \\end{pmatrix}$. The $(1,1)$ entry forces $p = 0$, and then the $(2,1)$ entry is $\\ell p = 0$, never $1$. So no choice of $\\ell, p, q, r$ works.` },
                { prompt: `Show that swapping the rows gives a matrix that does factor.`, answer: `The swapped matrix $\\begin{pmatrix} 1 & 1\\\\ 0 & 1 \\end{pmatrix}$ is already upper triangular, so $L = I$ and $U$ is the matrix itself. With $P$ the row swap, $PA = LU$.` },
              ],
            },
            {
              slug: 'second-difference-pivots',
              title: 'Pivots of the second-difference matrix',
              prompt: `Let $K_n$ be the $n \\times n$ tridiagonal matrix with $2$ on the diagonal and $-1$ beside it, and apply elimination without row exchanges.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove by induction that the pivots are $d_k = (k+1)/k$ for $k = 1, \\dots, n$.`, answer: `When row $k$ has been reduced, it has pivot $d_k$ with $-1$ to its right, and row $k + 1$ still starts $-1, 2$. Its multiplier is $-1/d_k$, so the next pivot is $d_{k+1} = 2 - 1/d_k$. Now induct: $d_1 = 2 = 2/1$, and if $d_k = (k+1)/k$ then $d_{k+1} = 2 - k/(k+1) = (k+2)/(k+1)$.` },
                { prompt: `Show that every multiplier is $\\ell_{k+1,k} = -k/(k+1)$.`, answer: `The multiplier is the entry to clear divided by the pivot: $\\ell_{k+1,k} = -1/d_k = -k/(k+1)$.` },
                { prompt: `Show that $\\det K_n = n + 1$.`, answer: `The determinant is the product of the pivots, which telescopes: $\\tfrac21 \\cdot \\tfrac32 \\cdots \\tfrac{n+1}{n} = n + 1$.` },
              ],
            },
            {
              slug: 'factor-once',
              title: 'Factor once, solve three times',
              prompt: `With $K$ from the worked example, factor $K = LU$ once and use the same $L$ and $U$ to solve $Ku = f$ for each right-hand side.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$f = (1, 0, 0)$`, answer: `$L$ has $\\ell_{21} = -\\tfrac12$ and $\\ell_{32} = -\\tfrac23$; $U$ has pivots $2, \\tfrac32, \\tfrac43$. Forward: $c = (1, \\tfrac12, \\tfrac13)$. Back: $u = (\\tfrac34, \\tfrac12, \\tfrac14)$.` },
                { prompt: `$f = (0, 1, 0)$`, answer: `$c = (0, 1, \\tfrac23)$ and $u = (\\tfrac12, 1, \\tfrac12)$.` },
                { prompt: `$f = (0, 0, 1)$`, answer: `$c = (0, 0, 1)$ and $u = (\\tfrac14, \\tfrac12, \\tfrac34)$.` },
                { prompt: `Confirm that the three solutions are the columns of $K^{-1}$ from the previous lesson.`, answer: `They are the columns of $K^{-1} = \\tfrac14\\begin{pmatrix} 3 & 2 & 1\\\\ 2 & 4 & 2\\\\ 1 & 2 & 3 \\end{pmatrix}$, as they must be: solving $Ku = e_j$ produces column $j$ of $K^{-1}$.` },
                { prompt: `Check all three in NumPy with scipy.linalg.lu_factor and lu_solve.`, answer: `After lu, piv = lu_factor(K), calling lu_solve((lu, piv), np.eye(3)) returns [[0.75, 0.5, 0.25], [0.5, 1, 0.5], [0.25, 0.5, 0.75]]. No row exchanges occur here (piv is [0, 1, 2]), so SciPy's factors are the ones you found by hand.` },
              ],
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
          quiz: [
            {
              question: `Elimination without row exchanges writes $A = \\begin{pmatrix} 2 & 1\\\\ 6 & 8 \\end{pmatrix}$ as $LU$. What are $L$ and $U$?`,
              options: [`$L = \\begin{pmatrix} 1 & 0\\\\ -3 & 1 \\end{pmatrix}$, $U = \\begin{pmatrix} 2 & 1\\\\ 0 & 5 \\end{pmatrix}$`, `$L = \\begin{pmatrix} 1 & 0\\\\ 3 & 1 \\end{pmatrix}$, $U = \\begin{pmatrix} 2 & 1\\\\ 0 & 5 \\end{pmatrix}$`, `$L = \\begin{pmatrix} 1 & 0\\\\ 3 & 1 \\end{pmatrix}$, $U = \\begin{pmatrix} 2 & 1\\\\ 0 & 8 \\end{pmatrix}$`, `$L = \\begin{pmatrix} 1 & 0\\\\ \\tfrac13 & 1 \\end{pmatrix}$, $U = \\begin{pmatrix} 2 & 1\\\\ 0 & 5 \\end{pmatrix}$`],
              answer: 1,
              explanation: `The multiplier is $\\ell_{21} = 6/2 = 3$, and row 2 becomes $[6\\ 8] - 3[2\\ 1] = [0\\ 5]$. $L$ stores the multiplier itself, $+3$, because it undoes the subtraction; $-3$ belongs to the elimination matrix $E$ with $EA = U$, not to $L = E^{-1}$. Check: $LU = \\begin{pmatrix} 2 & 1\\\\ 6 & 8 \\end{pmatrix}$.`,
            },
            {
              question: `For the symmetric matrix $A = \\begin{pmatrix} 4 & 8\\\\ 8 & 25 \\end{pmatrix}$, what is $D$ in $A = LDL^T$?`,
              options: [`$\\begin{pmatrix} 4 & 0\\\\ 0 & 9 \\end{pmatrix}$`, `$\\begin{pmatrix} 4 & 0\\\\ 0 & 25 \\end{pmatrix}$`, `$\\begin{pmatrix} 2 & 0\\\\ 0 & 3 \\end{pmatrix}$`, `$I$, because $L$ has ones on its diagonal`],
              answer: 0,
              explanation: `$D$ holds the pivots. With $\\ell_{21} = 2$, the second pivot is $25 - 2 \\cdot 8 = 9$, so $D = \\operatorname{diag}(4, 9)$ and $L = \\begin{pmatrix} 1 & 0\\\\ 2 & 1 \\end{pmatrix}$. The diagonal of $A$ is not the pivots, and $\\operatorname{diag}(2, 3)$ is the diagonal of the Cholesky factor $LD^{1/2}$, the square roots of the pivots.`,
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

\`\`\`interactive
row-reduce
{"title": "Elimination on a three-digit calculator", "A": [[0.0001, 1, 1], [1, 1, 2]], "digits": 3, "target": "echelon", "pivotToggle": true, "vars": ["x_1", "x_2"], "caption": "Every result here is rounded to three significant digits. Press Next step with partial pivoting off: the multiplier is 10⁴, both −9999 and −9998 round to −1.00 × 10⁴, and back substitution gives the useless answer x₁ = 0, x₂ = 1. Reset, tick partial pivoting and press Next step again: the rows are swapped first, the multiplier is 10⁻⁴, and the answer is (1.00, 1.00). You can also do the swap yourself with Swap rows."}
\`\`\`

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
              prompt: `Check the operation count of elimination, then test it on your own machine.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Verify the identity $\\sum_{j=1}^{n-1} j(j+1) = (n^3 - n)/3$ by induction.`, answer: `At $n = 1$ both sides are $0$. Going from $n$ to $n + 1$ adds $n(n+1)$ to the left side, and adds $\\dfrac{(n+1)^3 - (n+1) - n^3 + n}{3} = \\dfrac{3n^2 + 3n}{3} = n(n+1)$ to the right side.` },
                { prompt: `Estimate how long a dense $n = 10^4$ factorisation takes on a machine sustaining $10^{10}$ floating-point operations per second, using $\\tfrac23 n^3$ operations.`, answer: `$\\tfrac23(10^4)^3 \\approx 6.7 \\times 10^{11}$ operations, so about $67$ seconds: roughly a minute.` },
                { prompt: `Time numpy.linalg.solve for $n = 1000, 2000, 4000$ on your machine and check the ratio between successive times against the factor $8$.`, answer: `Doubling $n$ multiplies $n^3$ by $8$, so you should see ratios approaching $8$. Measured ratios are often below $8$ for small $n$ because of caching and multithreading, and get closer to $8$ as $n$ grows.` },
              ],
            },
            {
              slug: 'pivot-by-hand',
              title: 'Partial pivoting by hand',
              prompt: `Apply elimination with partial pivoting to $A = \\begin{pmatrix} 1 & 2 & 4\\\\ 2 & 1 & 3\\\\ 4 & 2 & 2 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Record each swap and multiplier.`, answer: `Column 1: the largest entry is $4$, in row 3, so swap rows 1 and 3. The multipliers $\\tfrac12$ (for $[2\\ 1\\ 3]$) and $\\tfrac14$ (for $[1\\ 2\\ 4]$) leave $[0\\ 0\\ 2]$ and $[0\\ \\tfrac32\\ \\tfrac72]$. Column 2: the candidates are $0$ and $\\tfrac32$, the latter from the original row 1, so swap those two rows; the last multiplier is $0$.` },
                { prompt: `Write the result as $PA = LU$ and check by multiplying out.`, answer: `$P$ takes the original rows in the order 3, 1, 2: $P = \\begin{pmatrix} 0 & 0 & 1\\\\ 1 & 0 & 0\\\\ 0 & 1 & 0 \\end{pmatrix}$, $L = \\begin{pmatrix} 1 & 0 & 0\\\\ \\tfrac14 & 1 & 0\\\\ \\tfrac12 & 0 & 1 \\end{pmatrix}$, $U = \\begin{pmatrix} 4 & 2 & 2\\\\ 0 & \\tfrac32 & \\tfrac72\\\\ 0 & 0 & 2 \\end{pmatrix}$. Both $LU$ and $PA$ equal $\\begin{pmatrix} 4 & 2 & 2\\\\ 1 & 2 & 4\\\\ 2 & 1 & 3 \\end{pmatrix}$. The multipliers moved with their rows at the second swap.` },
                { prompt: `Compare with scipy.linalg.lu, remembering that SciPy returns $A = PLU$.`, answer: `SciPy returns the same $L$ and $U$, and its permutation is the transpose of the $P$ above, $\\begin{pmatrix} 0 & 1 & 0\\\\ 0 & 0 & 1\\\\ 1 & 0 & 0 \\end{pmatrix}$, because $PA = LU$ means $A = P^TLU$.` },
              ],
            },
            {
              slug: 'tiny-pivot-in-double',
              title: 'A tiny pivot in double precision',
              prompt: `Test elimination without row exchanges on the system $\\varepsilon x_1 + x_2 = 1$, $x_1 + x_2 = 2$ with $\\varepsilon = 10^{-20}$.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Write a ten-line Python function that solves a $2 \\times 2$ system by elimination without row exchanges.`, answer: `The shape of a correct solution: compute $\\ell = a_{21}/a_{11}$, replace $a_{22}$ by $a_{22} - \\ell a_{12}$ and $b_2$ by $b_2 - \\ell b_1$, then return $x_2 = b_2/a_{22}$ and $x_1 = (b_1 - a_{12}x_2)/a_{11}$. Test it first on a harmless system such as $x_1 + x_2 = 2$, $x_1 - x_2 = 0$, which should give $(1, 1)$.` },
                { prompt: `Apply it to the system with $\\varepsilon = 10^{-20}$ and compare with numpy.linalg.solve.`, answer: `Your function returns $x_1 = 0$, $x_2 = 1$. numpy.linalg.solve, which pivots, returns $x_1 = x_2 = 1$. The exact solution is $x_1 = 1/(1 - \\varepsilon)$, $x_2 = (1 - 2\\varepsilon)/(1 - \\varepsilon)$, both within $10^{-20}$ of $1$.` },
                { prompt: `Explain the result in terms of what $1 - 10^{20}$ rounds to in double precision.`, answer: `The multiplier is $10^{20}$, so the reduced equation has coefficient $1 - 10^{20}$ and right-hand side $2 - 10^{20}$. Doubles carry about 16 significant digits, so both round to $-10^{20}$ and the second equation becomes $x_2 = 1$, with its information lost. Then $x_1 = (1 - x_2)/\\varepsilon = 0$.` },
              ],
            },
            {
              slug: 'tridiagonal-count',
              title: 'Elimination on a tridiagonal matrix',
              prompt: `Consider elimination without row exchanges on an $n \\times n$ tridiagonal matrix.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Show that it produces bidiagonal $L$ and $U$.`, answer: `At step $k$ only row $k + 1$ has a nonzero entry below the pivot, so there is a single multiplier $\\ell_{k+1,k}$. Row $k$ is nonzero only in columns $k$ and $k + 1$, so subtracting a multiple of it changes only $a_{k+1,k+1}$ and creates no new nonzeros. $L$ keeps one subdiagonal and $U$ one superdiagonal.` },
                { prompt: `Count the multiplications and divisions needed to factor, and confirm the count $2(n-1)$.`, answer: `Each of the $n - 1$ steps needs one division, $\\ell_{k+1,k} = a_{k+1,k}/d_k$, and one multiplication, $d_{k+1} = a_{k+1,k+1} - \\ell_{k+1,k}a_{k,k+1}$: $2(n - 1)$ in all.` },
                { prompt: `Count the operations to solve one system by forward and back substitution, and show the total is $5n - 4$.`, answer: `Forward, $c_{k+1} = b_{k+1} - \\ell_{k+1,k}c_k$: $n - 1$ multiplications. Back, $x_n = c_n/d_n$ and $x_k = (c_k - u_{k,k+1}x_{k+1})/d_k$: $n - 1$ multiplications and $n$ divisions. Total $2(n - 1) + (n - 1) + (2n - 1) = 5n - 4$.` },
              ],
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
          quiz: [
            {
              question: `Factoring a dense $3000 \\times 3000$ matrix takes $2$ s on your laptop. About how long should a $6000 \\times 6000$ factorisation take?`,
              options: [`$4$ s`, `$8$ s`, `$16$ s`, `$10.7$ s`],
              answer: 2,
              explanation: `The cost grows like $\\tfrac23n^3$, so doubling $n$ multiplies the time by $2^3 = 8$: about $16$ s. The constant $\\tfrac23$ cancels in the ratio, so $10.7$ s (applying it again) is wrong, and $8$ s is the factor $4$ you would get from the $n^2$ cost of a triangular solve, not of the factorisation.`,
            },
            {
              question: `You apply partial pivoting to $\\begin{pmatrix} 1 & 5\\\\ -3 & 2 \\end{pmatrix}$. Which row becomes the first pivot row?`,
              options: [`Row 1, because $1$ is larger than $-3$`, `Row 1, because it contains the largest entry, $5$`, `Neither needs to move: pivoting is only for zero pivots`, `Row 2, because $|-3| > |1|$`],
              answer: 3,
              explanation: `Partial pivoting compares absolute values in the pivot column, so the $-3$ wins and rows are swapped. That keeps every multiplier at most $1$ in size ($\\ell_{21} = -\\tfrac13$ here), which limits the growth of rounding errors. The $5$ sits in column 2 and plays no part in choosing the first pivot, and swapping only for exact zeros is what fails on tiny pivots such as $10^{-20}$.`,
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
              prompt: `Decide, with proof or a counterexample, whether each set is a subspace.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\{x \\in \\mathbb{R}^3 : x_1 = 2x_3\\}$`, answer: `A subspace. It contains $0$, and if $x_1 = 2x_3$ and $y_1 = 2y_3$ then $x_1 + y_1 = 2(x_3 + y_3)$ and $cx_1 = 2(cx_3)$. It is the null space of the row $[1\\ 0\\ {-2}]$.` },
                { prompt: `$\\{x \\in \\mathbb{R}^2 : x_1 x_2 = 0\\}$`, answer: `Not a subspace: it fails addition. $(1, 0)$ and $(0, 1)$ are in it, but their sum $(1, 1)$ is not. The set is the union of the two axes.` },
                { prompt: `$\\{p \\in P_3 : p(1) = 0\\}$`, answer: `A subspace. The zero polynomial vanishes at $1$, and $(p + q)(1) = 0 + 0$ and $(cp)(1) = c \\cdot 0$.` },
                { prompt: `The symmetric $2 \\times 2$ matrices.`, answer: `A subspace: $0^T = 0$, $(A + B)^T = A^T + B^T = A + B$ and $(cA)^T = cA^T = cA$.` },
                { prompt: `$\\{f \\in C[0,1] : \\int_0^1 f(t)\\,dt = 1\\}$`, answer: `Not a subspace: it does not contain $0$, since the zero function has integral $0$. Sums fail too: two members add to a function with integral $2$.` },
              ],
            },
            {
              slug: 'in-the-span',
              title: 'Is it in the span?',
              prompt: `Work with the span of $(1, 0, 1)$ and $(0, 1, 1)$ in $\\mathbb{R}^3$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Does $(1, 2, 3)$ lie in the span?`, answer: `Yes. In $a(1, 0, 1) + b(0, 1, 1) = (1, 2, 3)$ the first two entries force $a = 1$, $b = 2$, and the third entry $a + b = 3$ matches.` },
                { prompt: `Does $(1, 2, 4)$ lie in the span?`, answer: `No. Again $a = 1$ and $b = 2$ are forced, but then the third entry is $a + b = 3 \\ne 4$.` },
                { prompt: `Describe the span as a plane through the origin by giving one equation $a x_1 + b x_2 + c x_3 = 0$ that it satisfies.`, answer: `The span is $\\{(a, b, a + b)\\}$, so $x_1 + x_2 - x_3 = 0$. The two test vectors give $0$ and $-1$, which agrees with the answers above.` },
              ],
            },
            {
              slug: 'intersection-union',
              title: 'Intersections and unions',
              prompt: `Let $U$ and $W$ be subspaces of a vector space $V$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that the intersection $U \\cap W$ is a subspace.`, answer: `$0$ lies in both. If $u, v \\in U \\cap W$, then $u + v$ and $cu$ lie in $U$ because $U$ is a subspace, and in $W$ for the same reason, so they lie in $U \\cap W$.` },
                { prompt: `Show by an example in $\\mathbb{R}^2$ that the union of two subspaces need not be one.`, answer: `Take the two coordinate axes. $(1, 0)$ and $(0, 1)$ are in the union, but $(1, 1)$ lies on neither axis.` },
                { prompt: `Prove that $U \\cup W$ is a subspace only if $U \\subseteq W$ or $W \\subseteq U$.`, answer: `Suppose neither contains the other, and take $u \\in U \\setminus W$ and $w \\in W \\setminus U$. If $u + w \\in U$ then $w = (u + w) - u \\in U$, a contradiction. If $u + w \\in W$ then $u = (u + w) - w \\in W$, also a contradiction. So $u + w$ is not in the union, which is therefore not closed under addition.` },
              ],
            },
            {
              slug: 'oscillator-solutions',
              title: 'Solutions of an oscillator equation',
              prompt: `Compare the unforced equation $y'' + 4y = 0$ with the forced equation $y'' + 4y = 1$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Show that the solutions of $y'' + 4y = 0$ form a subspace of the twice-differentiable functions.`, answer: `The zero function is a solution. If $y_1'' + 4y_1 = 0$ and $y_2'' + 4y_2 = 0$, then $(ay_1 + by_2)'' + 4(ay_1 + by_2) = a \\cdot 0 + b \\cdot 0 = 0$. The set is the null space of the linear map $y \\mapsto y'' + 4y$.` },
                { prompt: `Show that $\\cos 2t$ and $\\sin 2t$ lie in it.`, answer: `$(\\cos 2t)'' = -4\\cos 2t$ and $(\\sin 2t)'' = -4\\sin 2t$, so each gives $-4y + 4y = 0$.` },
                { prompt: `Show that the solutions of the forced equation $y'' + 4y = 1$ do not form a subspace.`, answer: `$y = 0$ gives $0 \\ne 1$, so the zero function is missing. Also the sum of two solutions satisfies $y'' + 4y = 2$.` },
                { prompt: `Show that every solution of the forced equation is $\\tfrac14$ plus a solution of the unforced equation.`, answer: `The constant $\\tfrac14$ is one solution. If $y'' + 4y = 1$, then $z = y - \\tfrac14$ has $z'' + 4z = 1 - 1 = 0$, so $y = \\tfrac14 + z$. Conversely $\\tfrac14 + z$ solves the forced equation for every unforced solution $z$.` },
              ],
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
          quiz: [
            {
              question: `Which of these subsets of $\\mathbb{R}^3$ is a subspace?`,
              options: [`$\\{x : x_1 + 2x_2 - x_3 = 0\\}$`, `$\\{x : x_1 + 2x_2 - x_3 = 1\\}$`, `$\\{x : x_1 \\ge 0\\}$`, `$\\{x : x_1 x_3 = 0\\}$`],
              answer: 0,
              explanation: `The first set is the null space of the row $[1\\ 2\\ {-1}]$, a plane through the origin, so it is closed under addition and scaling. The second is a parallel plane that misses $0$. The half-space fails scaling by $-1$, and $\\{x_1x_3 = 0\\}$ is the union of two planes, which fails addition: $(1, 0, 0) + (0, 0, 1)$ is not in it.`,
            },
            {
              question: `Let $A$ be a $3 \\times 3$ matrix and $b \\ne 0$, and suppose $Ax = b$ has at least one solution. What is its solution set?`,
              options: [`A subspace, because it is the solution set of linear equations`, `A subspace only when $A$ is invertible`, `A subspace whose dimension is the rank of $A$`, `Not a subspace, since it misses $0$; it is $N(A)$ shifted by one particular solution`],
              answer: 3,
              explanation: `$A0 = 0 \\ne b$, so $0$ is not a solution and the set cannot be a subspace. Every solution is $x_p + z$ with $Az = 0$, a copy of the null space moved away from the origin. Only homogeneous equations ($b = 0$) have subspaces as solution sets; even an invertible $A$ gives the single point $A^{-1}b \\ne 0$.`,
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
              prompt: `Test two sets of three vectors in $\\mathbb{R}^3$ for independence.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Are $(1, 1, 0)$, $(1, 0, 1)$, $(0, 1, 1)$ independent? Answer by elimination.`, answer: `Yes. As columns, $\\begin{pmatrix} 1 & 1 & 0\\\\ 1 & 0 & 1\\\\ 0 & 1 & 1 \\end{pmatrix}$. Subtracting row 1 from row 2 gives $[0\\ {-1}\\ 1]$, and adding that to row 3 gives $[0\\ 0\\ 2]$. There are three pivots, $1, -1, 2$, so only the zero combination gives $0$.` },
                { prompt: `Answer the same question with a determinant.`, answer: `The determinant is the product of the pivots, $1 \\cdot (-1) \\cdot 2 = -2 \\ne 0$, so the vectors are independent.` },
                { prompt: `Are $(1, -1, 0)$, $(0, 1, -1)$, $(-1, 0, 1)$ independent? Give a dependence relation if not.`, answer: `No: they sum to zero, $v_1 + v_2 + v_3 = 0$. All three lie in the plane $x_1 + x_2 + x_3 = 0$, which has dimension $2$.` },
              ],
            },
            {
              slug: 'basis-from-equations',
              title: 'A basis for a subspace given by equations',
              prompt: `Let $W = \\{x \\in \\mathbb{R}^4 : x_1 + x_2 + x_3 + x_4 = 0,\\ x_1 - x_2 = 0\\}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find a basis and the dimension of $W$.`, answer: `Take $x_1$ and $x_3$ free. Then $x_2 = x_1$ and $x_4 = -2x_1 - x_3$, so one basis is $(1, 1, 0, -2)$, $(0, 0, 1, -1)$ and $\\dim W = 2$.` },
                { prompt: `Extend your basis to a basis of $\\mathbb{R}^4$ and justify that the extended set is independent.`, answer: `One choice adds $e_1 = (1, 0, 0, 0)$ and $e_4 = (0, 0, 0, 1)$. If $aw_1 + bw_2 + ce_1 + de_4 = 0$, entry 2 gives $a = 0$, entry 3 gives $b = 0$, entry 1 gives $c = 0$ and entry 4 gives $d = 0$. Four independent vectors in $\\mathbb{R}^4$ form a basis. Other choices work if they pass the same test.` },
              ],
            },
            {
              slug: 'n-plus-one-dependent',
              title: 'Too many vectors are dependent',
              prompt: `Let $V$ be spanned by $w_1, \\dots, w_n$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that any $n + 1$ vectors $v_1, \\dots, v_{n+1}$ in $V$ are dependent. Write each $v_j$ in terms of the $w_i$ and use the fact that a homogeneous system with more unknowns than equations has a nonzero solution.`, answer: `Write $v_j = \\sum_i a_{ij}w_i$, which defines an $n \\times (n+1)$ matrix $A = (a_{ij})$. The system $Ac = 0$ has more unknowns than equations, so it has a solution $c \\ne 0$. Then $\\sum_j c_jv_j = \\sum_i \\big(\\sum_j a_{ij}c_j\\big)w_i = \\sum_i (Ac)_i\\,w_i = 0$, a nontrivial dependence.` },
                { prompt: `Deduce that any two bases of $V$ have the same size.`, answer: `If one basis has $m$ vectors and another has $n$, the second spans $V$ and the first is independent, so $m \\le n$: more than $n$ vectors would be dependent. Swapping the roles gives $n \\le m$.` },
              ],
            },
            {
              slug: 'function-independence',
              title: 'Independence of functions',
              prompt: `Decide the independence of two sets of functions.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that $e^t$, $e^{2t}$, $e^{3t}$ are independent by evaluating a vanishing combination at $t = 0$, $\\ln 2$ and $\\ln 3$ and solving the resulting $3 \\times 3$ system.`, answer: `If $c_1e^t + c_2e^{2t} + c_3e^{3t} = 0$ for all $t$, the three values $e^t = 1, 2, 3$ give rows $(x, x^2, x^3)$ for $x = 1, 2, 3$: $\\begin{pmatrix} 1 & 1 & 1\\\\ 2 & 4 & 8\\\\ 3 & 9 & 27 \\end{pmatrix}c = 0$. The determinant is $1 \\cdot 2 \\cdot 3$ times the Vandermonde determinant $(2-1)(3-1)(3-2)$, so it equals $12 \\ne 0$ and $c = 0$.` },
                { prompt: `Show that $1$, $\\cos^2 t$, $\\sin^2 t$ are dependent and find the dimension of their span.`, answer: `$1 - \\cos^2t - \\sin^2t = 0$ is a dependence. $1$ and $\\cos^2t$ are independent because $\\cos^2t$ is not constant, so the span has dimension $2$.` },
              ],
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
          quiz: [
            {
              question: `For which value of $c$ are $(1, 2, 3)$, $(0, 1, 4)$ and $(1, 3, c)$ linearly dependent?`,
              options: [`$c = 12$`, `$c = -7$`, `$c = 7$`, `No value: the first two are independent, so all three are`],
              answer: 2,
              explanation: `With the vectors as columns, the determinant is $c - 7$, so they are dependent exactly when $c = 7$. Then $(1, 3, 7) = (1, 2, 3) + (0, 1, 4)$. $c = 12$ keeps only one term of the cofactor expansion. Two independent vectors say nothing about a third, which can still be their combination.`,
            },
            {
              question: `Five nonzero vectors lie in $\\mathbb{R}^4$, and no two of them are parallel. What must be true?`,
              options: [`They span $\\mathbb{R}^4$`, `They are linearly dependent`, `They contain a basis of $\\mathbb{R}^4$`, `They are independent, since none is a multiple of another`],
              answer: 1,
              explanation: `Any five vectors in a space of dimension $4$ are dependent: $Ac = 0$ with $A$ of size $4 \\times 5$ has a nonzero solution. They need not span, since all five could lie in one plane, and then they contain no basis. Not being parallel only rules out dependence between pairs, not combinations of three or more.`,
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

\`\`\`interactive
row-reduce
{"title": "From [A | b] to the complete solution", "A": [[1, 2, 1, 0, 1], [2, 4, 3, 1, 3], [3, 6, 4, 1, 4]], "free": ["c_1", "c_2"], "caption": "Reduce [A | b] for b = (1, 3, 4), by hand or with Next step. At reduced echelon form the readout shows x₁ = −2c₁ + c₂, x₂ = c₁, x₃ = 1 − c₂, x₄ = c₂, which is x_p = (0, 0, 1, 0) plus the two special solutions. Use Edit matrix to change b₃ from 4 to 5: now b₃ ≠ b₁ + b₂, and a row reading 0 = 1 appears."}
\`\`\`

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
              prompt: `Let $A = \\begin{pmatrix} 1 & 3\\\\ 2 & 6 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find a basis for each of the four subspaces.`, answer: `$C(A)$ is spanned by $(1, 2)$, $N(A)$ by $(-3, 1)$, $C(A^T)$ by $(1, 3)$ and $N(A^T)$ by $(-2, 1)$. Each is a line, since the rank is $1$.` },
                { prompt: `Sketch them in two planes.`, answer: `In the input plane: the row space is the line through $(1, 3)$ and the null space is the perpendicular line through $(-3, 1)$. In the output plane: the column space is the line through $(1, 2)$ and the left null space is the perpendicular line through $(-2, 1)$.` },
                { prompt: `Check the two orthogonality relations.`, answer: `$(1, 3) \\cdot (-3, 1) = 0$, so $N(A) \\perp C(A^T)$, and $(1, 2) \\cdot (-2, 1) = 0$, so $N(A^T) \\perp C(A)$.` },
              ],
            },
            {
              slug: 'complete-solution',
              title: 'Complete solution and solvability',
              prompt: `Let $A = \\begin{pmatrix} 1 & 1 & 2\\\\ 2 & 3 & 5\\\\ 1 & 2 & 3 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the rank.`, answer: `Elimination gives $R = \\begin{pmatrix} 1 & 0 & 1\\\\ 0 & 1 & 1\\\\ 0 & 0 & 0 \\end{pmatrix}$, with pivots in columns 1 and 2, so the rank is $2$.` },
                { prompt: `Find a basis for each of the four subspaces.`, answer: `$C(A)$: the pivot columns of $A$, $(1, 2, 1)$ and $(1, 3, 2)$. $C(A^T)$: the nonzero rows of $R$, $(1, 0, 1)$ and $(0, 1, 1)$. $N(A)$: $(-1, -1, 1)$. $N(A^T)$: $(1, -1, 1)$.` },
                { prompt: `Find the condition on $b$ for $Ax = b$ to be solvable.`, answer: `$b$ must be orthogonal to $N(A^T)$: $b_1 - b_2 + b_3 = 0$.` },
                { prompt: `Find the complete solution for $b = (2, 5, 3)$.`, answer: `The condition holds: $2 - 5 + 3 = 0$. A particular solution is $x_p = (1, 1, 0)$, and the complete solution is $x = (1, 1, 0) + t(-1, -1, 1)$.` },
              ],
            },
            {
              slug: 'orthogonality-proof',
              title: 'Null space is orthogonal to row space',
              prompt: `Let $A$ be an $m \\times n$ matrix.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that every vector in $N(A)$ is orthogonal to every vector in $C(A^T)$.`, answer: `A vector in $C(A^T)$ has the form $A^Ty$. If $Ax = 0$, then $x^T(A^Ty) = (Ax)^Ty = 0$. In words, $Ax = 0$ says $x$ is orthogonal to every row of $A$, so it is orthogonal to every combination of rows.` },
                { prompt: `Prove that if $Ax = b$ is solvable, then $y^T b = 0$ for every $y \\in N(A^T)$.`, answer: `If $b = Ax$ and $A^Ty = 0$, then $y^Tb = y^TAx = (A^Ty)^Tx = 0$.` },
              ],
            },
            {
              slug: 'rank-of-gram',
              title: 'The rank of the Gram matrix',
              prompt: `Let $A$ be a real $m \\times n$ matrix.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $N(A^T A) = N(A)$.`, answer: `If $Ax = 0$ then $A^TAx = 0$. Conversely, if $A^TAx = 0$, multiply on the left by $x^T$: $x^TA^TAx = \\|Ax\\|^2 = 0$, so $Ax = 0$.` },
                { prompt: `Deduce that $\\operatorname{rank}(A^T A) = \\operatorname{rank}(A)$.`, answer: `Both matrices have $n$ columns and the same null space, so rank-nullity gives $\\operatorname{rank}(A^TA) = n - \\dim N(A) = \\operatorname{rank}(A)$.` },
                { prompt: `Conclude that $A^T A$ is invertible exactly when the columns of $A$ are independent.`, answer: `$A^TA$ is $n \\times n$, so it is invertible iff its rank is $n$, iff $\\operatorname{rank}A = n$, iff the $n$ columns of $A$ are independent.` },
                { prompt: `Where does the proof use that the entries are real?`, answer: `In the step $\\|Ax\\|^2 = 0 \\Rightarrow Ax = 0$: a sum of squares of real numbers vanishes only when each one does. Over $\\mathbb{C}$ it fails: for the column $A = (1, i)^T$, $A^TA = 1 + i^2 = 0$ although the column is independent. That is why complex matrices use $A^*A$ (conjugate transpose) instead.` },
              ],
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
          quiz: [
            {
              question: `A $5 \\times 8$ matrix $A$ has rank $3$. What are $\\dim N(A)$ and $\\dim N(A^T)$?`,
              options: [`$2$ and $5$`, `$5$ and $2$`, `$3$ and $3$`, `$5$ and $5$`],
              answer: 1,
              explanation: `$N(A)$ lives in $\\mathbb{R}^8$, the input space, with dimension $n - r = 8 - 3 = 5$. $N(A^T)$ lives in $\\mathbb{R}^5$, the output space, with dimension $m - r = 5 - 3 = 2$. Swapping $m$ and $n$ gives the first option; the rank $3$ is the dimension of the column and row spaces, not of the null spaces.`,
            },
            {
              question: `Elimination reduces $A$ to $R$ with pivots in columns 1 and 3. Which statement is always true?`,
              options: [`Columns 1 and 3 of $R$ form a basis for $C(A)$`, `Rows 1 and 2 of $A$ form a basis for $C(A^T)$`, `Columns 1 and 3 of $A$ form a basis for $C(A)$`, `$N(A)$ has dimension $2$`],
              answer: 2,
              explanation: `Row operations preserve the linear relations among the columns, so the pivot columns of $A$ are independent and span $C(A)$. They do change the column space itself, so columns of $R$ are usually not in $C(A)$ at all. The nonzero rows of $R$ give the row space, but rows 1 and 2 of $A$ could be parallel. $\\dim N(A) = n - 2$ depends on how many columns $A$ has.`,
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
              prompt: `Three nodes are joined by edges $1 \\to 2$, $2 \\to 3$, $1 \\to 3$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Write the $3 \\times 3$ incidence matrix.`, answer: `With $-1$ at the start of each edge and $+1$ at its end, the rows for edges $1 \\to 2$, $2 \\to 3$, $1 \\to 3$ give $A = \\begin{pmatrix} -1 & 1 & 0\\\\ 0 & -1 & 1\\\\ -1 & 0 & 1 \\end{pmatrix}$.` },
                { prompt: `Find its rank.`, answer: `Row 3 is row 1 plus row 2, and rows 1 and 2 are independent, so the rank is $2$.` },
                { prompt: `Find a basis for $N(A)$ and interpret it physically.`, answer: `$(1, 1, 1)$. Equal potentials at every node give zero potential differences, so no current flows: potentials are fixed only up to an added constant.` },
                { prompt: `Find a basis for $N(A^T)$ and interpret it physically.`, answer: `$(1, 1, -1)$: the loop $1 \\to 2 \\to 3 \\to 1$, which uses edges 1 and 2 forwards and edge 3 backwards. A unit current around it satisfies Kirchhoff's current law at every node.` },
              ],
            },
            {
              slug: 'solvable-differences',
              title: 'Which edge differences come from potentials?',
              prompt: `Use the five-edge network of the worked example and its two loop vectors.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the conditions on $b \\in \\mathbb{R}^5$ for $Au = b$ to be solvable.`, answer: `$b$ must be orthogonal to the loops $(1, -1, 1, 0, 0)$ and $(0, 0, 1, -1, 1)$ that span $N(A^T)$: $b_1 - b_2 + b_3 = 0$ and $b_3 - b_4 + b_5 = 0$. Potential differences around every loop must add to zero.` },
                { prompt: `Is $b = (1, 3, 2, 1, -1)$ a valid set of potential differences?`, answer: `Yes: $1 - 3 + 2 = 0$ and $2 - 1 - 1 = 0$.` },
                { prompt: `If so, find the potentials with node 1 grounded ($u_1 = 0$).`, answer: `$u_2 = u_1 + b_1 = 1$, $u_3 = u_1 + b_2 = 3$ and $u_4 = u_2 + b_4 = 2$, so $u = (0, 1, 3, 2)$. The other two edges check: $u_3 - u_2 = 2 = b_3$ and $u_4 - u_3 = -1 = b_5$.` },
              ],
            },
            {
              slug: 'connected-null-space',
              title: 'Connected graphs have a one-dimensional null space',
              prompt: `Relate the null space of an incidence matrix to the connectivity of its graph.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that if a directed graph is connected (ignoring edge directions), then the null space of its incidence matrix is spanned by $(1, \\dots, 1)$.`, answer: `$Au = 0$ says $u_j = u_i$ for every edge $i \\to j$. Between any two nodes there is a path; each edge on it forces equal potentials at its ends, so all potentials are equal and $u = c(1, \\dots, 1)$. Conversely, constant potentials give $Au = 0$.` },
                { prompt: `What is the null space for a graph with $c$ connected components?`, answer: `The potential must be constant on each component, but the constants can differ. So $N(A)$ has dimension $c$, spanned by the indicator vectors of the components, and $\\operatorname{rank}A = n - c$.` },
              ],
            },
            {
              slug: 'complete-graph-loops',
              title: 'Loops in a complete graph',
              prompt: `The complete graph $K_n$ has an edge between every pair of $n$ nodes.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `How many independent loops does it have?`, answer: `It has $m = n(n-1)/2$ edges and, being connected, rank $r = n - 1$. So there are $m - r = n(n-1)/2 - (n - 1) = (n-1)(n-2)/2$ independent loops.` },
                { prompt: `Check your formula for $n = 3$ and $n = 4$ by building the incidence matrix in NumPy and computing $m - \\operatorname{rank}(A)$.`, answer: `The formula gives $1$ and $3$. NumPy agrees: $K_3$ has $m = 3$ and rank $2$, $K_4$ has $m = 6$ and rank $3$.` },
              ],
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
          quiz: [
            {
              question: `A connected network has $6$ nodes and $9$ edges. How many independent loops does it have?`,
              options: [`$3$`, `$5$`, `$9$`, `$4$`],
              answer: 3,
              explanation: `The incidence matrix is $9 \\times 6$ with rank $n - 1 = 5$, so $\\dim N(A^T) = m - r = 9 - 5 = 4$. $3 = m - n$ forgets that the rank is $n - 1$, not $n$; $5$ is the rank itself; and not every edge closes a loop, since the five edges of a spanning tree close none.`,
            },
            {
              question: `For a network with incidence matrix $A$ (edges by nodes), which equation is Kirchhoff's current law?`,
              options: [`$A^Ty = 0$ for the edge currents $y$`, `$Au = 0$ for the node potentials $u$`, `$Ay = 0$ for the edge currents $y$`, `$A^Tu = 0$ for the node potentials $u$`],
              answer: 0,
              explanation: `Row $j$ of $A^Ty$ adds the currents entering node $j$ and subtracts those leaving it, so $A^Ty = 0$ says the net current at every node is zero. $Au = 0$ is a different statement: every potential difference vanishes, which means constant potentials. $Ay$ and $A^Tu$ do not even have matching sizes.`,
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

\`\`\`interactive
matrix-transform
{"title": "Projection onto y = 2x as a map of the plane", "A": [[0.2, 0.4], [0.4, 0.8]], "name": "P", "x": [-2, 1], "view": 3, "modes": ["transform"], "presets": ["projection", "reflection", "rotation", "shear"], "bracket": "p", "caption": "The columns of P are Pe₁ = (0.2, 0.4) and Pe₂ = (0.4, 0.8), both on the line y = 2x, so the whole grid collapses onto that line and det P = 0. The test vector x starts at (−2, 1), on the kernel, and is sent to 0. Drag x along y = 2x and Px = x. Then pick Reflection, which is H = 2P − I: the grid flips across the same line and det H = −1. Drag the column tips to build any map you like: column j is always T(eⱼ)."}
\`\`\`

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
              prompt: `Let $R(\\theta) = \\begin{pmatrix} \\cos\\theta & -\\sin\\theta\\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$ be the rotation matrix.`,
              kind: 'derivation',
              difficulty: 1,
              parts: [
                { prompt: `Multiply $R(\\alpha)R(\\beta)$ and use the fact that composition of rotations adds angles to derive the addition formulas for $\\cos(\\alpha + \\beta)$ and $\\sin(\\alpha + \\beta)$.`, answer: `The first column of $R(\\alpha)R(\\beta)$ is $(\\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta,\\ \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta)$, and the second column is the same pair rotated by $90^\\circ$. Rotating by $\\beta$ and then $\\alpha$ is rotating by $\\alpha + \\beta$, so this must equal the first column of $R(\\alpha + \\beta)$: $\\cos(\\alpha + \\beta) = \\cos\\alpha\\cos\\beta - \\sin\\alpha\\sin\\beta$ and $\\sin(\\alpha + \\beta) = \\sin\\alpha\\cos\\beta + \\cos\\alpha\\sin\\beta$.` },
                { prompt: `What is $R(\\theta)^{-1}$, and how does it relate to $R(\\theta)^T$?`, answer: `Undoing a rotation by $\\theta$ is rotating by $-\\theta$, so $R(\\theta)^{-1} = R(-\\theta) = \\begin{pmatrix} \\cos\\theta & \\sin\\theta\\\\ -\\sin\\theta & \\cos\\theta \\end{pmatrix}$. That is exactly $R(\\theta)^T$: a rotation is an orthogonal matrix.` },
              ],
            },
            {
              slug: 'reflection-matrix',
              title: 'Reflection across a line',
              prompt: `Let $H$ be the reflection across the line through $(1, 2)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the matrix $H$.`, answer: `Projection onto the line is $P = \\dfrac{aa^T}{a^Ta} = \\tfrac15\\begin{pmatrix} 1 & 2\\\\ 2 & 4 \\end{pmatrix}$ with $a = (1, 2)$, and $H = 2P - I = \\tfrac15\\begin{pmatrix} -3 & 4\\\\ 4 & 3 \\end{pmatrix}$.` },
                { prompt: `Verify that $H^2 = I$, and explain it geometrically.`, answer: `$H^2 = \\tfrac1{25}\\begin{pmatrix} 9 + 16 & -12 + 12\\\\ -12 + 12 & 16 + 9 \\end{pmatrix} = I$. Reflecting twice puts every vector back where it started.` },
                { prompt: `Verify that $H(1, 2) = (1, 2)$ and $H(-2, 1) = (2, -1)$, and explain each geometrically.`, answer: `$H(1, 2) = \\tfrac15(-3 + 8, 4 + 6) = (1, 2)$: vectors on the mirror line stay put. $H(-2, 1) = \\tfrac15(6 + 4, -8 + 3) = (2, -1)$: the perpendicular direction is flipped.` },
                { prompt: `Verify that $\\det H = -1$, and explain it geometrically.`, answer: `$\\det H = \\tfrac{1}{25}(-9 - 16) = -1$. A reflection preserves areas (size $1$) and reverses orientation (sign $-$).` },
              ],
            },
            {
              slug: 'derivative-on-cubics',
              title: 'Differentiation on cubics',
              prompt: `Let $D = d/dt$ act on $P_3$ with basis $1, t, t^2, t^3$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write the $4 \\times 4$ matrix of $D$.`, answer: `The columns are the coordinates of $D(1) = 0$, $D(t) = 1$, $D(t^2) = 2t$ and $D(t^3) = 3t^2$: $D = \\begin{pmatrix} 0 & 1 & 0 & 0\\\\ 0 & 0 & 2 & 0\\\\ 0 & 0 & 0 & 3\\\\ 0 & 0 & 0 & 0 \\end{pmatrix}$.` },
                { prompt: `Find its rank, kernel and range.`, answer: `Rank $3$. The kernel is the constants, spanned by $1$, and the range is $P_2$, spanned by $1, t, t^2$. Rank-nullity checks: $3 + 1 = 4$.` },
                { prompt: `Show $D^4 = 0$.`, answer: `Each derivative lowers the degree by one, so four derivatives of any cubic give $0$. In the matrix, each power of $D$ pushes the nonzero entries one diagonal further up, and $D^4$ has none left.` },
                { prompt: `Write the matrix of $T(p) = p + p'$ and explain why $T$ is invertible even though $D$ is not.`, answer: `$T = I + D = \\begin{pmatrix} 1 & 1 & 0 & 0\\\\ 0 & 1 & 2 & 0\\\\ 0 & 0 & 1 & 3\\\\ 0 & 0 & 0 & 1 \\end{pmatrix}$ is upper triangular with ones on the diagonal, so $\\det T = 1$. $D$ kills the constants; $T$ kills nothing, since $p + p' = 0$ would need the leading term of $p$ to vanish. In fact $T^{-1} = I - D + D^2 - D^3$ because $D^4 = 0$.` },
              ],
            },
            {
              slug: 'determined-by-basis',
              title: 'A linear map is fixed by a basis',
              prompt: `Let $v_1, \\dots, v_n$ be a basis of $V$ and $w_1, \\dots, w_n$ any vectors in $W$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that there is exactly one linear map $T$ with $T(v_i) = w_i$ for each $i$.`, answer: `Existence: every $v$ has unique coordinates, $v = \\sum c_iv_i$, so define $T(v) = \\sum c_iw_i$. The coordinates depend linearly on $v$, so $T$ is linear, and $T(v_i) = w_i$. Uniqueness: any linear $S$ with $S(v_i) = w_i$ has $S(v) = \\sum c_iS(v_i) = \\sum c_iw_i = T(v)$.` },
                { prompt: `Use this to find the matrix of the linear map on $\\mathbb{R}^2$ with $T(1, 1) = (2, 0)$ and $T(1, -1) = (0, 4)$.`, answer: `With the inputs as columns of $S = \\begin{pmatrix} 1 & 1\\\\ 1 & -1 \\end{pmatrix}$ and the outputs as columns of $W = \\begin{pmatrix} 2 & 0\\\\ 0 & 4 \\end{pmatrix}$, $TS = W$, so $T = WS^{-1} = \\begin{pmatrix} 1 & 1\\\\ 2 & -2 \\end{pmatrix}$. Check: $T(1, 1) = (2, 0)$ and $T(1, -1) = (0, 4)$.` },
              ],
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
          quiz: [
            {
              question: `A linear map $T$ on $\\mathbb{R}^2$ sends $(1, 0)$ to $(2, 1)$ and $(0, 1)$ to $(-1, 3)$. What is $T(3, 2)$?`,
              options: [`$(4, 9)$`, `$(8, 3)$`, `$(1, 4)$`, `$(6, 6)$`],
              answer: 0,
              explanation: `By linearity, $T(3, 2) = 3T(1, 0) + 2T(0, 1) = (6, 3) + (-2, 6) = (4, 9)$. The images are the columns of the matrix, $\\begin{pmatrix} 2 & -1\\\\ 1 & 3 \\end{pmatrix}$; putting them in as rows gives $(8, 3)$. $(1, 4)$ adds the images without the coefficients $3$ and $2$, and $(6, 6)$ only scales by the diagonal entries.`,
            },
            {
              question: `Let $R$ be rotation by $90^\\circ$ counterclockwise and $F$ reflection across the $x$-axis. What is the map $RF$, which applies $F$ first and then $R$?`,
              options: [`Reflection across the line $y = -x$`, `Rotation by $-90^\\circ$`, `Reflection across the line $y = x$`, `The identity, since the reflection undoes the rotation`],
              answer: 2,
              explanation: `$RF = \\begin{pmatrix} 0 & -1\\\\ 1 & 0 \\end{pmatrix}\\begin{pmatrix} 1 & 0\\\\ 0 & -1 \\end{pmatrix} = \\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}$, which swaps the coordinates: reflection across $y = x$. Its determinant is $-1$, so it cannot be a rotation. Reflection across $y = -x$ is $FR$, the product in the other order, which is the usual slip.`,
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

\`\`\`interactive
matrix-transform
{"title": "The projection in an adapted basis", "A": [[0.2, 0.4], [0.4, 0.8]], "name": "P", "B": [[1, -2], [2, 1]], "basisName": "S", "basisVec": "v", "vec": "v", "x": [3, 1], "view": 3.5, "mode": "basis", "modes": ["basis"], "presets": [], "bracket": "p", "caption": "The purple grid is the coordinate grid of v₁ = (1, 2) and v₂ = (−2, 1). The vector v = (3, 1) has coordinates S⁻¹v = (1, −1): one step along v₁ and one step back along v₂. Pv (red) keeps only the v₁ part, and the readout shows S⁻¹PS = diag(1, 0). Drag v₂ away from the perpendicular direction: S⁻¹PS is no longer diagonal, yet its trace stays 1 and its determinant 0."}
\`\`\`

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
              prompt: `Express $(5, 3)$ in the basis $(1, 1)$, $(1, -1)$, first as it is and then normalised.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the coordinates of $(5, 3)$ in the basis $(1, 1)$, $(1, -1)$.`, answer: `Solve $c_1 + c_2 = 5$, $c_1 - c_2 = 3$: the coordinates are $(4, 1)$, since $4(1, 1) + (1, -1) = (5, 3)$.` },
                { prompt: `Normalise the basis to make it orthonormal and recompute the coordinates using dot products only.`, answer: `$q_1 = (1, 1)/\\sqrt2$ and $q_2 = (1, -1)/\\sqrt2$, so the coordinates are $(5, 3) \\cdot q_1 = 8/\\sqrt2 = 4\\sqrt2$ and $(5, 3) \\cdot q_2 = 2/\\sqrt2 = \\sqrt2$: $(4\\sqrt2, \\sqrt2)$. Shortening each basis vector by $\\sqrt2$ lengthens its coordinate by $\\sqrt2$.` },
              ],
            },
            {
              slug: 'adapted-basis-diagonalises',
              title: 'An adapted basis makes a matrix diagonal',
              prompt: `Let $A = \\begin{pmatrix} 4 & 1\\\\ 2 & 3 \\end{pmatrix}$ and take the basis $v_1 = (1, 1)$, $v_2 = (1, -2)$, the columns of $S$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Compute $Av_1$ and $Av_2$.`, answer: `$Av_1 = (5, 5) = 5v_1$ and $Av_2 = (2, -4) = 2v_2$.` },
                { prompt: `Write down $S^{-1}AS$ without multiplying matrices.`, answer: `Column $j$ of $S^{-1}AS$ holds the coordinates of $Av_j$ in the new basis, which are $(5, 0)$ and $(0, 2)$. So $S^{-1}AS = \\operatorname{diag}(5, 2)$.` },
                { prompt: `Confirm by multiplying.`, answer: `$S^{-1} = \\tfrac13\\begin{pmatrix} 2 & 1\\\\ 1 & -1 \\end{pmatrix}$ and $AS = \\begin{pmatrix} 5 & 2\\\\ 5 & -4 \\end{pmatrix}$, so $S^{-1}AS = \\tfrac13\\begin{pmatrix} 15 & 0\\\\ 0 & 6 \\end{pmatrix} = \\begin{pmatrix} 5 & 0\\\\ 0 & 2 \\end{pmatrix}$.` },
                { prompt: `Check that the trace and determinant agree.`, answer: `$\\operatorname{tr}A = 4 + 3 = 7 = 5 + 2$ and $\\det A = 12 - 2 = 10 = 5 \\cdot 2$.` },
              ],
            },
            {
              slug: 'reflection-two-ways',
              title: 'A reflection in its own basis',
              prompt: `Use the basis $v_1 = (1, 2)$, $v_2 = (-2, 1)$ from the worked example for the reflection across the line $y = 2x$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write down the matrix of the reflection in this basis.`, answer: `$v_1$ lies on the line and is fixed, and $v_2$ is perpendicular and is flipped, so the matrix is $\\operatorname{diag}(1, -1)$.` },
                { prompt: `Convert it to the standard basis with $S(\\cdot)S^{-1}$ and confirm that you recover the reflection matrix from the previous lesson.`, answer: `$S = \\begin{pmatrix} 1 & -2\\\\ 2 & 1 \\end{pmatrix}$ and $S^{-1} = \\tfrac15\\begin{pmatrix} 1 & 2\\\\ -2 & 1 \\end{pmatrix}$, so $S\\operatorname{diag}(1, -1)S^{-1} = \\tfrac15\\begin{pmatrix} -3 & 4\\\\ 4 & 3 \\end{pmatrix}$, the matrix $H = 2P - I$ from the previous lesson.` },
              ],
            },
            {
              slug: 'similarity-invariants',
              title: 'What similarity preserves',
              prompt: `Let $B = S^{-1}AS$ with $S$ invertible.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $\\det B = \\det A$.`, answer: `$\\det B = \\det S^{-1}\\,\\det A\\,\\det S = \\det A$, since $\\det S^{-1} = 1/\\det S$.` },
                { prompt: `Prove $\\operatorname{tr}(XY) = \\operatorname{tr}(YX)$, and use it to show $\\operatorname{tr} B = \\operatorname{tr} A$.`, answer: `$\\operatorname{tr}(XY) = \\sum_i\\sum_j x_{ij}y_{ji}$, and swapping the names of $i$ and $j$ gives $\\operatorname{tr}(YX)$. Then $\\operatorname{tr}(S^{-1}(AS)) = \\operatorname{tr}((AS)S^{-1}) = \\operatorname{tr}A$.` },
                { prompt: `Prove that $\\operatorname{rank} B = \\operatorname{rank} A$.`, answer: `$C(AS) = C(A)$ because $S$ is invertible (every $Ay$ is $AS(S^{-1}y)$). Then $C(S^{-1}AS) = S^{-1}C(A)$, and an invertible map sends a subspace to one of the same dimension.` },
                { prompt: `Give two $2 \\times 2$ matrices with the same trace and determinant that are not similar.`, answer: `$I$ and $\\begin{pmatrix} 1 & 1\\\\ 0 & 1 \\end{pmatrix}$: both have trace $2$ and determinant $1$. But $S^{-1}IS = I$ for every $S$, so the only matrix similar to $I$ is $I$ itself.` },
              ],
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
          quiz: [
            {
              question: `What are the coordinates of $(3, 7)$ in the basis $v_1 = (1, 2)$, $v_2 = (1, 3)$?`,
              options: [`$(3, 7)$`, `$(1, 2)$`, `$(10, 27)$`, `$(2, 1)$`],
              answer: 3,
              explanation: `Solve $c_1v_1 + c_2v_2 = (3, 7)$: $c_1 + c_2 = 3$ and $2c_1 + 3c_2 = 7$ give $c_2 = 1$, $c_1 = 2$. Check: $2(1, 2) + (1, 3) = (3, 7)$. The coordinates are $S^{-1}(3, 7)$; multiplying by $S$ instead gives $(10, 27)$, and $(3, 7)$ is just the standard coordinates.`,
            },
            {
              question: `$S$ has the new basis vectors as its columns, and $A$ is the matrix of a map in the standard basis. Which matrix represents the same map in the new basis?`,
              options: [`$SAS^{-1}$`, `$S^{-1}AS$`, `$S^TAS$`, `$A$ itself, since the map has not changed`],
              answer: 1,
              explanation: `Read right to left: $S$ turns new coordinates into standard ones, $A$ applies the map, and $S^{-1}$ turns the result back into new coordinates. $SAS^{-1}$ goes the other way, from the new-basis matrix to the standard one. $S^TAS$ agrees with $S^{-1}AS$ only when $S$ is orthogonal, and the map is unchanged but its matrix depends on the basis.`,
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

\`\`\`interactive
matrix-transform
{"title": "Area scale and orientation", "A": [[2, 1], [1, 1.5]], "x": [1, -1], "modes": ["transform"], "presets": ["shear", "rotation", "reflection", "singular", "scaling"], "bracket": "p", "caption": "The shaded parallelogram, spanned by the columns, is the image of the unit square: its area is |det A|. Drag the second column across the line of the first: the area falls to 0, where A is singular, and then the shading turns amber because the orientation is reversed and det A < 0. A shear keeps the area (det = 1) however far you push it."}
\`\`\`

**Worked example.** Compute $\\det K$ for $K = \\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}$ in two ways.

By elimination, the LU lesson found pivots $2, \\tfrac32, \\tfrac43$ with no row swaps. So $\\det K = 2 \\cdot \\tfrac32 \\cdot \\tfrac43 = 4$.

By **cofactor expansion** along row 1, each entry multiplies the signed determinant of the matrix left after deleting its row and column:
$$\\det K = 2\\begin{vmatrix} 2 & -1\\\\ -1 & 2 \\end{vmatrix} - (-1)\\begin{vmatrix} -1 & -1\\\\ 0 & 2 \\end{vmatrix} + 0 = 2(4 - 1) + (-2 - 0) = 4.$$
The signs alternate $+, -, +$ along the row. Both methods agree, and the answer matches the pattern $\\det K_n = n + 1$.

\`\`\`interactive
row-reduce
{"title": "det K from the pivots", "A": [[2, -1, 0], [-1, 2, -1], [0, -1, 2]], "name": "K", "aug": 0, "target": "echelon", "det": true, "caption": "Press Next step until K is upper triangular: the readout multiplies the pivots 2 · 3/2 · 4/3 = 4. Reset, swap two rows first and eliminate again: the pivots differ but the sign count keeps det K = 4. Edit the matrix to try the Vandermonde exercise with numbers of your choice."}
\`\`\`

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
              prompt: `Let $A = \\begin{pmatrix} 1 & 2 & 3\\\\ 4 & 5 & 6\\\\ 7 & 8 & 10 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Compute $\\det A$ by elimination, as a product of pivots.`, answer: `Multipliers $4$ and $7$ leave rows $[0\\ {-3}\\ {-6}]$ and $[0\\ {-6}\\ {-11}]$; the multiplier $2$ then leaves $[0\\ 0\\ 1]$. The pivots are $1, -3, 1$, so $\\det A = -3$.` },
                { prompt: `Compute it by cofactor expansion along the first row.`, answer: `$1(50 - 48) - 2(40 - 42) + 3(32 - 35) = 2 + 4 - 9 = -3$.` },
                { prompt: `What is the determinant if the last entry is $9$ instead of $10$, and why could you predict that without computing?`, answer: `$0$. With $9$, row 3 is $(7, 8, 9) = 2(4, 5, 6) - (1, 2, 3)$, so the rows are dependent and the matrix is singular.` },
              ],
            },
            {
              slug: 'determinant-rules',
              title: 'Consequences of the defining properties',
              prompt: `Using only the three defining properties and the product rule, prove each statement. You may use $\\det A^T = \\det A$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `$\\det(cA) = c^n \\det A$ for an $n \\times n$ matrix.`, answer: `$cA$ multiplies each of the $n$ rows by $c$. The determinant is linear in each row separately, so each row contributes one factor $c$: $c^n\\det A$.` },
                { prompt: `$\\det(A^{-1}) = 1/\\det A$.`, answer: `$\\det A\\,\\det A^{-1} = \\det(AA^{-1}) = \\det I = 1$.` },
                { prompt: `If $A^T = -A$ and $n$ is odd, then $\\det A = 0$.`, answer: `$\\det A = \\det A^T = \\det(-A) = (-1)^n\\det A = -\\det A$ for odd $n$, so $\\det A = 0$.` },
                { prompt: `If $Q^TQ = I$ then $\\det Q = \\pm 1$.`, answer: `$1 = \\det(Q^TQ) = \\det Q^T\\det Q = (\\det Q)^2$.` },
              ],
            },
            {
              slug: 'cramer-and-cost',
              title: 'Cramer\'s rule and its cost',
              prompt: `Compare Cramer's rule with elimination, first on a small system and then on a large one.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Solve $3x + 2y = 7$, $x + 4y = 9$ by Cramer's rule.`, answer: `$\\det A = 12 - 2 = 10$. Then $x = \\det\\begin{pmatrix} 7 & 2\\\\ 9 & 4 \\end{pmatrix}/10 = 10/10 = 1$ and $y = \\det\\begin{pmatrix} 3 & 7\\\\ 1 & 9 \\end{pmatrix}/10 = 20/10 = 2$.` },
                { prompt: `Estimate the number of multiplications needed to solve a $20 \\times 20$ system by Cramer's rule with every determinant expanded by cofactors, compared with elimination.`, answer: `Cramer needs $21$ determinants of size $20$: $\\det A$ and one for each unknown. Full cofactor expansion of one has $20! \\approx 2.4 \\times 10^{18}$ terms, each a product of $20$ entries, so the total is about $21 \\times 20! \\times 19 \\approx 10^{21}$ multiplications. Elimination needs about $n^3/3 \\approx 2700$, plus about $n^2 = 400$ for the substitutions: a few thousand.` },
                { prompt: `Say how long each would take at $10^{10}$ multiplications per second.`, answer: `Cramer: about $10^{11}$ s, roughly $3000$ years (still about $160$ years if you count each of the $21 \\times 20!$ products as a single multiplication). Elimination: about $3 \\times 10^{-7}$ s, well under a microsecond.` },
              ],
            },
            {
              slug: 'vandermonde-3',
              title: 'The 3 by 3 Vandermonde determinant',
              prompt: `Let $V = \\begin{pmatrix} 1 & a & a^2\\\\ 1 & b & b^2\\\\ 1 & c & c^2 \\end{pmatrix}$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $\\det V = (b - a)(c - a)(c - b)$ using row operations.`, answer: `Subtract row 1 from rows 2 and 3: they become $(0,\\ b - a,\\ b^2 - a^2)$ and $(0,\\ c - a,\\ c^2 - a^2)$. Factor $b - a$ out of row 2 and $c - a$ out of row 3, leaving $(0, 1, b + a)$ and $(0, 1, c + a)$. Subtracting the new row 2 from row 3 gives $(0, 0, c - b)$, so $\\det V = (b - a)(c - a) \\cdot 1 \\cdot 1 \\cdot (c - b)$.` },
                { prompt: `Deduce that a quadratic polynomial through three points with distinct $x$-coordinates exists and is unique.`, answer: `$p(x) = \\alpha + \\beta x + \\gamma x^2$ passes through $(a, y_1)$, $(b, y_2)$, $(c, y_3)$ exactly when $V(\\alpha, \\beta, \\gamma) = (y_1, y_2, y_3)$. Distinct $a, b, c$ make $\\det V \\ne 0$, so this system has exactly one solution.` },
              ],
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
          quiz: [
            {
              question: `What is $\\det\\begin{pmatrix} 2 & 1 & 0\\\\ 1 & 3 & 1\\\\ 0 & 1 & 4 \\end{pmatrix}$?`,
              options: [`$24$`, `$18$`, `$26$`, `$22$`],
              answer: 1,
              explanation: `Expand along the first row: $2(3 \\cdot 4 - 1 \\cdot 1) - 1(1 \\cdot 4 - 1 \\cdot 0) + 0 = 22 - 4 = 18$. The pivots $2, \\tfrac52, \\tfrac{18}{5}$ multiply to the same value. $26$ comes from using $+$ for the middle cofactor, $22$ from dropping it, and $24$ is the product of the diagonal, which equals the determinant only for a triangular matrix.`,
            },
            {
              question: `A $3 \\times 3$ matrix $A$ has $\\det A = 2$. What is $\\det(2A)$?`,
              options: [`$16$`, `$4$`, `$8$`, `$2$`],
              answer: 0,
              explanation: `Multiplying $A$ by $2$ multiplies each of its three rows by $2$, and each row contributes a factor: $\\det(2A) = 2^3\\det A = 16$. $4 = 2\\det A$ treats the factor $2$ as if it scaled only one row. $8$ is the factor $2^3$ without the original determinant.`,
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
              prompt: `Compare the 1, 2 and infinity norms on a vector and on the plane.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Compute $\\|v\\|_1$, $\\|v\\|_2$ and $\\|v\\|_\\infty$ for $v = (1, -2, 2)$.`, answer: `$\\|v\\|_1 = 1 + 2 + 2 = 5$, $\\|v\\|_2 = \\sqrt{1 + 4 + 4} = 3$ and $\\|v\\|_\\infty = 2$.` },
                { prompt: `Sketch the unit balls $\\{x \\in \\mathbb{R}^2 : \\|x\\| \\le 1\\}$ for the three norms on one set of axes.`, answer: `The 1-norm ball is the diamond with corners $(\\pm1, 0)$ and $(0, \\pm1)$. The 2-norm ball is the unit disc. The infinity-norm ball is the square with corners $(\\pm1, \\pm1)$. They nest: diamond inside disc inside square, touching at $(\\pm1, 0)$ and $(0, \\pm1)$.` },
                { prompt: `Prove $\\|x\\|_\\infty \\le \\|x\\|_2 \\le \\|x\\|_1 \\le n\\|x\\|_\\infty$ in $\\mathbb{R}^n$.`, answer: `If $|x_k|$ is the largest entry, $\\|x\\|_2^2 \\ge x_k^2$, which gives the first inequality. Squaring $\\|x\\|_1$ gives $\\sum x_i^2$ plus the nonnegative cross terms $2|x_i||x_j|$, so $\\|x\\|_1^2 \\ge \\|x\\|_2^2$. Finally each $|x_i| \\le \\|x\\|_\\infty$, so the sum of $n$ of them is at most $n\\|x\\|_\\infty$.` },
              ],
            },
            {
              slug: 'weighted-angle',
              title: 'Angles in a weighted inner product',
              prompt: `Let $\\langle v, w\\rangle = 2v_1 w_1 + 3v_2 w_2$ on $\\mathbb{R}^2$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Show that this is an inner product.`, answer: `It is linear in each argument and symmetric by inspection. Positivity: $\\langle v, v\\rangle = 2v_1^2 + 3v_2^2 > 0$ for $v \\ne 0$ because both weights are positive.` },
                { prompt: `Find the cosine of the angle between $(1, 0)$ and $(1, 1)$ in it.`, answer: `$\\langle a, b\\rangle = 2$, $\\|a\\|^2 = 2$ and $\\|b\\|^2 = 5$, so $\\cos\\theta = 2/\\sqrt{10} \\approx 0.632$, an angle of about $50.8^\\circ$ instead of the usual $45^\\circ$.` },
                { prompt: `Find a nonzero vector orthogonal to $(1, 1)$ in this inner product.`, answer: `You need $2w_1 + 3w_2 = 0$, so $(3, -2)$ works (or any multiple). It is not perpendicular to $(1, 1)$ in the ordinary dot product.` },
              ],
            },
            {
              slug: 'orthogonal-polynomials',
              title: 'Orthogonal polynomials on an interval',
              prompt: `Use the function inner product $\\langle f, g\\rangle = \\int f g\\,dt$, first on $[-1, 1]$ and then on $[0, 1]$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `On $[-1, 1]$, show that $1$, $t$ and $t^2 - \\tfrac13$ are mutually orthogonal.`, answer: `$\\int_{-1}^1 t\\,dt = 0$ and $\\int_{-1}^1 t(t^2 - \\tfrac13)\\,dt = 0$ because the integrands are odd, and $\\int_{-1}^1 (t^2 - \\tfrac13)\\,dt = \\tfrac23 - \\tfrac23 = 0$.` },
                { prompt: `Compute their norms on $[-1, 1]$.`, answer: `The squared norms are $2$, $\\tfrac23$ and $\\tfrac{8}{45}$, so the norms are $\\sqrt2$, $\\sqrt{2/3}$ and $\\sqrt{8/45} \\approx 0.422$.` },
                { prompt: `Compute the angle between $t$ and $t^2$ on $[0, 1]$.`, answer: `$\\langle t, t^2\\rangle = \\tfrac14$, $\\|t\\|^2 = \\tfrac13$ and $\\|t^2\\|^2 = \\tfrac15$, so $\\cos\\theta = \\dfrac{1/4}{\\sqrt{1/15}} = \\dfrac{\\sqrt{15}}{4} \\approx 0.968$ and $\\theta \\approx 14.5^\\circ$: on $[0, 1]$ the two functions are nearly parallel.` },
              ],
            },
            {
              slug: 'cauchy-schwarz-proof',
              title: 'Prove Cauchy-Schwarz and the triangle inequality',
              prompt: `Work in a general real inner product space.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove the Cauchy-Schwarz inequality using the quadratic $\\|v - tw\\|^2 \\ge 0$, including the equality case.`, answer: `If $w = 0$ both sides are $0$. Otherwise $q(t) = \\|v\\|^2 - 2t\\langle v, w\\rangle + t^2\\|w\\|^2 \\ge 0$ for every $t$, so its discriminant is at most $0$: $4\\langle v, w\\rangle^2 - 4\\|v\\|^2\\|w\\|^2 \\le 0$. Equality holds iff the discriminant is $0$, iff $q$ has a root $t_0$, iff $v = t_0w$: the vectors are parallel.` },
                { prompt: `Derive the triangle inequality.`, answer: `$\\|v + w\\|^2 = \\|v\\|^2 + 2\\langle v, w\\rangle + \\|w\\|^2 \\le \\|v\\|^2 + 2\\|v\\|\\|w\\| + \\|w\\|^2 = (\\|v\\| + \\|w\\|)^2$, using Cauchy-Schwarz in the middle. Take square roots.` },
                { prompt: `Show that the 1-norm on $\\mathbb{R}^2$ does not come from any inner product by checking the parallelogram law $\\|v + w\\|^2 + \\|v - w\\|^2 = 2\\|v\\|^2 + 2\\|w\\|^2$ on $v = (1, 0)$, $w = (0, 1)$.`, answer: `$\\|v + w\\|_1 = \\|v - w\\|_1 = 2$, so the left side is $4 + 4 = 8$, while the right side is $2 + 2 = 4$. Every norm that comes from an inner product satisfies the law (expand both squares and add), so the 1-norm does not.` },
              ],
            },
            {
              slug: 'matrix-norms',
              title: 'Induced matrix norms',
              prompt: `Let $A = \\begin{pmatrix} 1 & -2\\\\ 3 & 4 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Compute $\\|A\\|_1$ and $\\|A\\|_\\infty$ from the column and row sum rules.`, answer: `The absolute column sums are $4$ and $6$, so $\\|A\\|_1 = 6$. The absolute row sums are $3$ and $7$, so $\\|A\\|_\\infty = 7$.` },
                { prompt: `Find a vector $x$ with $\\|x\\|_\\infty = 1$ that attains $\\|Ax\\|_\\infty = \\|A\\|_\\infty$.`, answer: `Take the signs of the largest row, row 2: $x = (1, 1)$. Then $Ax = (-1, 7)$ and $\\|Ax\\|_\\infty = 7$.` },
                { prompt: `Check $\\|A\\|_2$ with numpy.linalg.norm(A, 2), and compare it with the other two and with $\\sqrt{\\|A\\|_1\\|A\\|_\\infty}$.`, answer: `$\\|A\\|_2 \\approx 5.117$. It is smaller than both $\\|A\\|_1 = 6$ and $\\|A\\|_\\infty = 7$, so it need not lie between them. What always holds is $\\|A\\|_2 \\le \\sqrt{\\|A\\|_1\\|A\\|_\\infty} = \\sqrt{42} \\approx 6.48$.` },
              ],
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
          quiz: [
            {
              question: `For $v = (2, -6, 3)$, what are $\\|v\\|_1$, $\\|v\\|_2$ and $\\|v\\|_\\infty$?`,
              options: [`$11$, $7$, $3$`, `$-1$, $7$, $6$`, `$11$, $7$, $6$`, `$11$, $49$, $6$`],
              answer: 2,
              explanation: `$\\|v\\|_1 = 2 + 6 + 3 = 11$, $\\|v\\|_2 = \\sqrt{4 + 36 + 9} = 7$ and $\\|v\\|_\\infty = \\max|v_i| = 6$. Every norm uses absolute values: the largest signed entry is $3$ and the signed sum is $-1$, which are the slips in the first two options. $49$ is $\\|v\\|_2^2$.`,
            },
            {
              question: `With the inner product $\\langle v, w\\rangle = v_1w_1 + 4v_2w_2$ on $\\mathbb{R}^2$, are $(1, 1)$ and $(1, -1)$ orthogonal?`,
              options: [`Yes: their dot product is $0$`, `Yes: orthogonality does not depend on the inner product`, `No, because they have different lengths in this inner product`, `No: their inner product is $1 - 4 = -3$`],
              answer: 3,
              explanation: `Orthogonality means $\\langle v, w\\rangle = 0$ in the inner product you are using, and here $\\langle (1, 1), (1, -1)\\rangle = 1 \\cdot 1 + 4 \\cdot 1 \\cdot (-1) = -3$. The ordinary dot product is $0$, but that is a different inner product. Lengths have nothing to do with it: both vectors have length $\\sqrt5$ here.`,
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

\`\`\`interactive
projection-3d
{"mode": "gram-schmidt", "title": "Gram-Schmidt on three vectors in R³", "a": [[1, 1, 0], [1, 0, 1], [0, 1, 1]], "turn": -30, "caption": "Press Next through the five steps. Step 2 subtracts ½(1, 1, 0) from a₂ and leaves v₂ = (½, −½, 1); step 4 subtracts the components along q₁ and q₂ from a₃, drawn dashed, and leaves v₃ = (−⅔, ⅔, ⅔), sticking straight out of the plane of q₁ and q₂. Q and R fill in as you go, and R holds the coefficients ⟨aⱼ, qᵢ⟩. Turn the view to see the three q's at right angles. Then edit a₃ to (2, 1, 1) = a₁ + a₂: the leftover v₃ is zero and r₃₃ = 0, the sign of dependent vectors."}
\`\`\`

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
              prompt: `Use the basis $v_1 = (1, 1, 0)$, $v_2 = (1, -1, 2)$, $v_3 = (-1, 1, 1)$ and the vector $v = (3, 1, 2)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Check that the three basis vectors are mutually orthogonal.`, answer: `$v_1 \\cdot v_2 = 1 - 1 + 0 = 0$, $v_1 \\cdot v_3 = -1 + 1 + 0 = 0$ and $v_2 \\cdot v_3 = -1 - 1 + 2 = 0$.` },
                { prompt: `Expand $v$ in this basis using only dot products.`, answer: `$c_i = (v \\cdot v_i)/(v_i \\cdot v_i)$: $c_1 = 4/2 = 2$, $c_2 = 6/6 = 1$, $c_3 = 0/3 = 0$.` },
                { prompt: `Verify by recombining.`, answer: `$2(1, 1, 0) + 1(1, -1, 2) + 0(-1, 1, 1) = (3, 1, 2)$.` },
              ],
            },
            {
              slug: 'gram-schmidt-polynomials',
              title: 'Gram-Schmidt on polynomials',
              prompt: `Apply Gram-Schmidt (without normalising) to $1, t, t^2$ with $\\langle f, g\\rangle = \\int_0^1 f g\\,dt$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that you obtain $1$, $t - \\tfrac12$, $t^2 - t + \\tfrac16$.`, answer: `$v_2 = t - \\dfrac{\\langle t, 1\\rangle}{\\langle 1, 1\\rangle}1 = t - \\tfrac12$. For $v_3$: $\\langle t^2, 1\\rangle = \\tfrac13$, $\\langle t^2, t - \\tfrac12\\rangle = \\tfrac14 - \\tfrac16 = \\tfrac1{12}$ and $\\|t - \\tfrac12\\|^2 = \\tfrac1{12}$, so $v_3 = t^2 - \\tfrac13 - 1 \\cdot (t - \\tfrac12) = t^2 - t + \\tfrac16$.` },
                { prompt: `Compute the norm of each.`, answer: `$\\|1\\| = 1$, $\\|t - \\tfrac12\\|^2 = \\tfrac1{12}$ and $\\|t^2 - t + \\tfrac16\\|^2 = \\tfrac1{180}$, so the norms are $1$, $1/(2\\sqrt3)$ and $1/(6\\sqrt5)$.` },
                { prompt: `Check the orthogonality with SymPy.`, answer: `With t = sympy.symbols('t'), the three integrals over $[0, 1]$ of the pairwise products, for example sympy.integrate((t - sympy.Rational(1, 2))*(t**2 - t + sympy.Rational(1, 6)), (t, 0, 1)), all return $0$.` },
              ],
            },
            {
              slug: 'orthogonal-matrix-facts',
              title: 'Properties of orthogonal matrices',
              prompt: `Let $Q$ be $n \\times n$ with $Q^TQ = I$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $QQ^T = I$.`, answer: `$Q^TQ = I$ makes $Q^T$ a left inverse of the square matrix $Q$. For square matrices a one-sided inverse is the inverse, so $Q^{-1} = Q^T$ and $QQ^T = I$.` },
                { prompt: `Prove that $\\|Qx\\| = \\|x\\|$ for all $x$.`, answer: `$\\|Qx\\|^2 = (Qx)^T(Qx) = x^TQ^TQx = x^Tx = \\|x\\|^2$.` },
                { prompt: `Prove that the product of two orthogonal matrices is orthogonal.`, answer: `$(Q_1Q_2)^T(Q_1Q_2) = Q_2^T(Q_1^TQ_1)Q_2 = Q_2^TQ_2 = I$.` },
                { prompt: `Prove that $\\det Q = \\pm 1$.`, answer: `$1 = \\det(Q^TQ) = \\det Q^T\\det Q = (\\det Q)^2$.` },
                { prompt: `Give an example of a $3 \\times 2$ matrix $Q$ with $Q^TQ = I$ but $QQ^T \\ne I$, and identify $QQ^T$ geometrically.`, answer: `Take the columns $e_1$ and $e_2$. Then $Q^TQ = I_2$, but $QQ^T = \\operatorname{diag}(1, 1, 0)$, which is the projection onto the $xy$-plane. In general, for a tall $Q$ with orthonormal columns, $QQ^T$ is the projection onto its column space.` },
              ],
            },
            {
              slug: 'classical-vs-modified',
              title: 'Classical against modified Gram-Schmidt',
              prompt: `Compare two versions of Gram-Schmidt in NumPy on the $10 \\times 10$ Hilbert matrix $H_{ij} = 1/(i + j - 1)$ (scipy.linalg.hilbert(10)).`,
              kind: 'coding',
              difficulty: 3,
              parts: [
                { prompt: `Implement classical and modified Gram-Schmidt in NumPy.`, answer: `Classical: for each column $a_j$, set $v = a_j - \\sum_{i<j}(q_i^Ta_j)q_i$, every coefficient computed from the original $a_j$, then $q_j = v/\\|v\\|$. Modified: subtract the projections one at a time from the current vector, $v \\leftarrow v - (q_i^Tv)q_i$, so each coefficient uses the already updated $v$. On the worked example both should reproduce $q_1$, $q_2$, $q_3$ from the text.` },
                { prompt: `Apply both to the Hilbert matrix and report $\\|Q^TQ - I\\|_2$ for each and for numpy.linalg.qr.`, answer: `You should see roughly $3$ for classical Gram-Schmidt (orthogonality lost completely), about $4 \\times 10^{-5}$ for modified, and about $10^{-15}$ for numpy.linalg.qr. The condition number of this matrix is about $1.6 \\times 10^{13}$.` },
                { prompt: `Explain the difference in one paragraph.`, answer: `A good explanation says: rounding errors make the early $q_i$ slightly non-orthogonal, and classical Gram-Schmidt projects against them using the original column, so the errors compound; its loss of orthogonality grows like $\\kappa(A)^2$ times machine precision, which exceeds $1$ here. Modified Gram-Schmidt removes each component from the updated vector, which corrects earlier errors, and its loss is bounded by a multiple of $\\kappa(A)$ times machine precision. Householder QR builds $Q$ from reflections that are orthogonal to working precision, so its $Q$ stays orthogonal whatever $\\kappa(A)$ is.` },
              ],
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
          quiz: [
            {
              question: `Gram-Schmidt is applied to $a_1 = (3, 4)$ and $a_2 = (1, 0)$, normalising as it goes. What is $q_2$?`,
              options: [`$(\\tfrac45, -\\tfrac35)$`, `$(\\tfrac{16}{25}, -\\tfrac{12}{25})$`, `$(1, 0)$`, `$(\\tfrac35, \\tfrac45)$`],
              answer: 0,
              explanation: `$q_1 = (3, 4)/5$ and $a_2 \\cdot q_1 = \\tfrac35$, so $v_2 = (1, 0) - \\tfrac35(\\tfrac35, \\tfrac45) = (\\tfrac{16}{25}, -\\tfrac{12}{25})$. Its length is $\\tfrac{20}{25}$, so $q_2 = (\\tfrac45, -\\tfrac35)$. The second option forgets to normalise, $(1, 0)$ is $a_2$ unchanged (it is a unit vector but not orthogonal to $q_1$), and $(\\tfrac35, \\tfrac45)$ is $q_1$.`,
            },
            {
              question: `$Q$ is a $4 \\times 2$ matrix with orthonormal columns. Which statement is true?`,
              options: [`$QQ^T = I_4$`, `$Q^{-1} = Q^T$`, `$\\det Q = \\pm 1$`, `$Q^TQ = I_2$, and $QQ^T$ is the projection onto $C(Q)$`],
              answer: 3,
              explanation: `Orthonormal columns mean exactly $Q^TQ = I_2$. The $4 \\times 4$ matrix $QQ^T$ has rank $2$, so it cannot be $I_4$; it is the projection onto the plane spanned by the columns. A non-square $Q$ has no inverse and no determinant, so the other two options do not even make sense. $QQ^T = I$ holds only when $Q$ is square.`,
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

\`\`\`interactive
projection-3d
{"title": "What the least-squares solution means", "b": [1, 2, 3], "a": [[1, 1, 0], [1, 0, 1]], "turn": -30, "caption": "The columns of A span the blue plane, and b = (1, 2, 3) is not in it. The least-squares x̂ = (2/3, 5/3) gives the point p = Ax̂ = (7/3, 2/3, 5/3) of the plane nearest to b, and the residual e = (−4/3, 4/3, 4/3) is perpendicular to the plane (it is a multiple of the normal a₁ × a₂). Turn the view until the plane is edge-on to see the right angle. QR reaches the same x̂ by working with an orthonormal basis of this plane."}
\`\`\`

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
              prompt: `Use the Gram-Schmidt worked example to write $A = QR$ for $A$ with columns $(1, 1, 0)$, $(1, 0, 1)$, $(0, 1, 1)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Write down $Q$.`, answer: `Its columns are $q_1 = (1, 1, 0)/\\sqrt2$, $q_2 = (1, -1, 2)/\\sqrt6$ and $q_3 = (-1, 1, 1)/\\sqrt3$.` },
                { prompt: `Give all six nonzero entries of $R$ exactly.`, answer: `$r_{ij} = q_i^Ta_j$ above the diagonal and $r_{jj} = \\|v_j\\|$: $R = \\begin{pmatrix} \\sqrt2 & 1/\\sqrt2 & 1/\\sqrt2\\\\ 0 & \\sqrt{3/2} & 1/\\sqrt6\\\\ 0 & 0 & 2/\\sqrt3 \\end{pmatrix}$.` },
                { prompt: `Check $QR = A$ in NumPy.`, answer: `Q @ R reproduces $A$ to about $10^{-16}$. If you compare with numpy.linalg.qr, expect some columns of $Q$ and the matching rows of $R$ to have the opposite sign: NumPy does not force a positive diagonal.` },
              ],
            },
            {
              slug: 'householder-by-hand',
              title: 'A Householder reflection in three dimensions',
              prompt: `Let $a = (1, 2, 2)$ and $H = I - 2uu^T/u^Tu$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Build the Householder vector $u = a + \\|a\\|e_1$.`, answer: `$\\|a\\| = 3$, so $u = (1 + 3, 2, 2) = (4, 2, 2)$.` },
                { prompt: `Verify by hand that $Ha = (-3, 0, 0)$.`, answer: `$u^Tu = 24$ and $u^Ta = 4 + 4 + 4 = 12$, so $Ha = a - 2\\cdot\\tfrac{12}{24}u = a - u = (-3, 0, 0)$.` },
                { prompt: `Show that $H$ is symmetric and that $H^2 = I$ for any nonzero $u$.`, answer: `$(uu^T)^T = uu^T$, so $H^T = H$. Then $H^2 = I - \\dfrac{4uu^T}{u^Tu} + \\dfrac{4u(u^Tu)u^T}{(u^Tu)^2} = I$. Geometrically, reflecting twice across the plane orthogonal to $u$ changes nothing.` },
              ],
            },
            {
              slug: 'qr-uniqueness',
              title: 'Existence and uniqueness of QR',
              prompt: `Let $A$ have independent columns.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that Gram-Schmidt never divides by zero, and so $A = QR$ with $R$ invertible.`, answer: `At step $j$, $v_j = a_j - \\sum_{i<j}(q_i^Ta_j)q_i$. If $v_j = 0$, then $a_j$ would lie in the span of $q_1, \\dots, q_{j-1}$, which is the span of $a_1, \\dots, a_{j-1}$, contradicting independence. So every $r_{jj} = \\|v_j\\| > 0$, and an upper triangular $R$ with nonzero diagonal is invertible.` },
                { prompt: `Prove uniqueness: if $Q_1R_1 = Q_2R_2$ with both $R$ upper triangular with positive diagonal, show $Q_2^TQ_1 = R_2R_1^{-1}$ is both orthogonal and upper triangular with positive diagonal, hence the identity.`, answer: `Multiply $Q_1R_1 = Q_2R_2$ by $Q_2^T$ on the left and $R_1^{-1}$ on the right: $X = Q_2^TQ_1 = R_2R_1^{-1}$. The right side is upper triangular with positive diagonal. Since $A^TA = R_1^TR_1 = R_2^TR_2$, $X^TX = R_1^{-T}R_2^TR_2R_1^{-1} = I$, so $X$ is orthogonal. Then $X^{-1} = X^T$ is lower triangular, but the inverse of an upper triangular matrix is upper triangular, so $X$ is diagonal with entries $\\pm1$; positivity makes $X = I$. Hence $R_1 = R_2$ and $Q_1 = Q_2$.` },
              ],
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
          quiz: [
            {
              question: `$A$ has columns $a_1 = (0, 3, 4)$ and $a_2 = (1, 1, 2)$. In $A = QR$ with positive diagonal, what are $r_{11}$ and $r_{12}$?`,
              options: [`$r_{11} = 25$, $r_{12} = 11$`, `$r_{11} = 5$, $r_{12} = 11$`, `$r_{11} = 5$, $r_{12} = \\tfrac{11}{5}$`, `$r_{11} = 5$, $r_{12} = \\tfrac{11}{25}$`],
              answer: 2,
              explanation: `$r_{11} = \\|a_1\\| = 5$ and $q_1 = (0, 3, 4)/5$, so $r_{12} = q_1^Ta_2 = (0 + 3 + 8)/5 = \\tfrac{11}{5}$. $11$ is $a_1^Ta_2$, the dot product with the unnormalised column, and $\\tfrac{11}{25}$ is the projection coefficient $a_1^Ta_2/a_1^Ta_1$ used in unnormalised Gram-Schmidt, which multiplies $a_1$ rather than $q_1$.`,
            },
            {
              question: `Why do libraries compute QR with Householder reflections rather than classical Gram-Schmidt?`,
              options: [`Gram-Schmidt only works for square matrices`, `The computed $Q$ stays orthogonal to machine precision, even when $A$ is ill-conditioned`, `Gram-Schmidt cannot produce the matrix $R$`, `Householder reflections need no square roots`],
              answer: 1,
              explanation: `Each Householder reflection is orthogonal to working precision, so their product is too, whatever the condition number of $A$. Classical Gram-Schmidt loses orthogonality as $\\kappa(A)$ grows, completely on the $10 \\times 10$ Hilbert matrix. Gram-Schmidt does produce $R$ (its coefficients are the entries $r_{ij}$) and works for tall matrices, and each Householder vector needs a norm, which is a square root.`,
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

\`\`\`interactive
least-squares
{"title": "Calibrate the spring", "points": [[0, 10], [1, 10.6], [2, 11.1], [3, 11.8]], "xName": "F", "yName": "L", "view": [-0.5, 3.5, 9.6, 12.2], "caption": "The green line is L = 9.99 + 0.59F, and the red residuals are 0.01, 0.02, −0.07, 0.04. The two sums under the plot are the orthogonality checks of the text, and both are zero. Turn on 'Draw my own line' and try to beat the sum of squares by dragging its handles: you cannot. Drag the third measurement up to 11.2 and see the fitted natural length and compliance change."}
\`\`\`

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
              prompt: `Fit $y = c_0 + c_1x$ to the points $(0, 1)$, $(1, 2)$, $(2, 2)$, $(3, 4)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Solve the normal equations.`, answer: `$A^TA = \\begin{pmatrix} 4 & 6\\\\ 6 & 14 \\end{pmatrix}$ and $A^Tb = (9, 18)$. With determinant $20$, $c_0 = (14 \\cdot 9 - 6 \\cdot 18)/20 = 0.9$ and $c_1 = (4 \\cdot 18 - 6 \\cdot 9)/20 = 0.9$.` },
                { prompt: `Compute the residuals and check both orthogonality conditions.`, answer: `$r = b - A\\hat c = (0.1, 0.2, -0.7, 0.4)$. They sum to $0$ (orthogonal to the column of ones), and $\\sum x_ir_i = 0 + 0.2 - 1.4 + 1.2 = 0$ (orthogonal to the column of $x$ values).` },
                { prompt: `Confirm with numpy.linalg.lstsq.`, answer: `numpy.linalg.lstsq(A, b, rcond=None)[0] returns [0.9, 0.9].` },
              ],
            },
            {
              slug: 'projection-matrix',
              title: 'Projection matrices',
              prompt: `Let $A$ have independent columns and $P = A(A^TA)^{-1}A^T$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $P^2 = P$ and $P^T = P$.`, answer: `$P^2 = A(A^TA)^{-1}(A^TA)(A^TA)^{-1}A^T = A(A^TA)^{-1}A^T = P$. Since $A^TA$ is symmetric, so is its inverse, and $P^T = A((A^TA)^{-1})^TA^T = P$.` },
                { prompt: `Prove that $I - P$ projects onto $N(A^T)$.`, answer: `$A^T(I - P) = A^T - A^TA(A^TA)^{-1}A^T = 0$, so every output of $I - P$ lies in $N(A^T)$. If $y \\in N(A^T)$ then $Py = 0$ and $(I - P)y = y$. And $(I - P)^2 = I - 2P + P^2 = I - P$.` },
                { prompt: `Compute $P$ when $A$ is the single column $(1, 1, 1)$, and describe $Pb$ in words.`, answer: `$A^TA = 3$, so $P = \\tfrac13\\begin{pmatrix} 1 & 1 & 1\\\\ 1 & 1 & 1\\\\ 1 & 1 & 1 \\end{pmatrix}$. $Pb$ replaces every entry of $b$ by the mean of the entries: the best constant fit.` },
              ],
            },
            {
              slug: 'weighted-fit',
              title: 'A weighted fit',
              prompt: `In the spring example, suppose the last measurement came from a worse ruler with twice the standard deviation of the others.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Set up the weighted normal equations with weights $1, 1, 1, \\tfrac14$ and solve them.`, answer: `Weights are $1/\\sigma^2$, so doubling $\\sigma$ gives $\\tfrac14$. With $C = \\operatorname{diag}(1, 1, 1, \\tfrac14)$: $A^TCA = \\begin{pmatrix} 3.25 & 3.75\\\\ 3.75 & 7.25 \\end{pmatrix}$ and $A^TCb = (34.65, 41.65)$, giving $c_0 \\approx 10.003$ and $c_1 \\approx 0.571$.` },
                { prompt: `Compare $c_0$ and $c_1$ with the unweighted fit.`, answer: `The unweighted fit was $c_0 = 9.99$, $c_1 = 0.59$. The last point, $11.8$ at $F = 3$, lay above the unweighted line, so trusting it less lowers the slope to about $0.571$ and raises the intercept slightly to about $10.003$.` },
                { prompt: `Derive the weighted normal equations by minimising $\\sum w_i r_i^2$.`, answer: `$E(c) = \\sum w_ir_i^2 = (b - Ac)^TC(b - Ac)$. Its gradient is $-2A^TC(b - Ac)$, and setting it to zero gives $A^TCA\\,\\hat c = A^TCb$.` },
              ],
            },
            {
              slug: 'normal-equations-fail',
              title: 'When the normal equations fail',
              prompt: `Generate $x_i = i/20$ for $i = 0, \\dots, 20$ and $y_i = \\cos(4x_i)$. For each degree below, fit a polynomial by (a) solving the normal equations with numpy.linalg.solve, (b) numpy.linalg.qr, (c) numpy.linalg.lstsq, and report the residual norm and the condition numbers of $A$ and $A^TA$.`,
              kind: 'coding',
              difficulty: 3,
              parts: [
                { prompt: `Degree $5$.`, answer: `All three methods agree, with residual norm about $3.6 \\times 10^{-3}$. $\\kappa(A) \\approx 3 \\times 10^3$ and $\\kappa(A^TA) \\approx 10^7$.` },
                { prompt: `Degree $10$.`, answer: `The residual is about $1.09 \\times 10^{-7}$ for all three, with the normal equations already slightly worse in the third digit. $\\kappa(A) \\approx 2 \\times 10^7$ and $\\kappa(A^TA) \\approx 5 \\times 10^{14}$.` },
                { prompt: `Degree $15$.`, answer: `QR and lstsq reach a residual of about $3 \\times 10^{-14}$, but the normal equations stall near $3 \\times 10^{-8}$ (solve may warn about an ill-conditioned matrix). $\\kappa(A) \\approx 4 \\times 10^{11}$, while $\\kappa(A^TA)$ is beyond $10^{16}$; NumPy reports a value near $10^{17}$, itself unreliable. Exact digits vary a little by machine.` },
                { prompt: `Explain the pattern.`, answer: `$\\kappa(A^TA) = \\kappa(A)^2$, and solving a system loses roughly $\\log_{10}\\kappa$ digits of the $16$ that doubles carry. Once $\\kappa(A)^2$ nears $10^{16}$, forming $A^TA$ has already thrown the answer away, while QR and lstsq work with $A$ itself and only pay $\\kappa(A)$.` },
              ],
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
          quiz: [
            {
              question: `Fit a line through the origin, $y = cx$, to the points $(1, 2)$, $(2, 3)$, $(3, 7)$ by least squares. What is $c$?`,
              options: [`$2$`, `$\\tfrac{29}{14}$`, `$\\tfrac{35}{18}$`, `$\\tfrac{29}{6}$`],
              answer: 1,
              explanation: `With the single column $a = (1, 2, 3)$, the normal equation is $(a^Ta)c = a^Tb$: $14c = 2 + 6 + 21 = 29$. $2 = \\sum y/\\sum x$ and $\\tfrac{35}{18}$ (the mean of the ratios $y_i/x_i$) are reasonable-looking averages that do not minimise the squared error, and $\\tfrac{29}{6}$ divides by $\\sum x_i$ instead of $\\sum x_i^2$.`,
            },
            {
              question: `$\\hat x$ is the least-squares solution of $Ax = b$, and $r = b - A\\hat x$. Which statement is always true?`,
              options: [`$r = 0$ whenever $A$ has independent columns`, `$r$ is orthogonal to $b$`, `$A^Tr = 0$: $r$ is orthogonal to every column of $A$`, `$r$ lies in the column space of $A$`],
              answer: 2,
              explanation: `The normal equations $A^TA\\hat x = A^Tb$ say exactly $A^T(b - A\\hat x) = 0$: the residual lies in $N(A^T)$, perpendicular to $C(A)$. It is in $C(A)$ only when it is $0$, which happens when $b$ is already in $C(A)$, not because the columns are independent. $r$ is orthogonal to the projection $A\\hat x$, not to $b$ itself.`,
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

\`\`\`interactive
matrix-transform
{"title": "The energy xᵀKx as level curves", "A": [[2, -1], [-1, 2]], "name": "K", "x": [1, -1], "view": 2, "mode": "quadratic", "modes": ["quadratic"], "presets": ["definite", "semidefinite", "indefinite"], "bracket": "p", "caption": "For K with rows (2, −1), (−1, 2) the level curves of xᵀKx are ellipses around the origin, and the readouts show the pivots 2 and 3/2 and the leading minors 2 and 3. Press Indefinite for rows (1, 2), (2, 1): the pivots become 1 and −3, the curves turn into hyperbolas, and at x = (1, −1) the readout gives xᵀKx = −2, a direction in which the energy falls without limit. Drag x to explore, and press Semidefinite for the borderline case of a zero eigenvalue."}
\`\`\`

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
              prompt: `Classify each symmetric matrix as positive definite, positive semidefinite or indefinite, using two different tests for each.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `$\\begin{pmatrix} 4 & 2\\\\ 2 & 3 \\end{pmatrix}$`, answer: `Positive definite. Leading minors $4, 8$; pivots $4, 2$; eigenvalues $(7 \\pm \\sqrt{17})/2 \\approx 5.56, 1.44$.` },
                { prompt: `$\\begin{pmatrix} 1 & 2\\\\ 2 & 4 \\end{pmatrix}$`, answer: `Positive semidefinite. Leading minors $1, 0$; eigenvalues $5$ and $0$. Equivalently $x^TKx = (x_1 + 2x_2)^2$, which is zero along $(-2, 1)$.` },
                { prompt: `$\\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 1 \\end{pmatrix}$`, answer: `Positive definite. Leading minors $2, 3, 1$; pivots $2, \\tfrac32, \\tfrac13$, all positive.` },
                { prompt: `$\\begin{pmatrix} 1 & 2 & 0\\\\ 2 & 1 & 0\\\\ 0 & 0 & 3 \\end{pmatrix}$`, answer: `Indefinite. Leading minors $1, -3, -9$; eigenvalues $3, 3, -1$. For example $x = (1, -1, 0)$ gives $x^TKx = -2$.` },
              ],
            },
            {
              slug: 'parameter-range',
              title: 'A parameter range',
              prompt: `Let $K = \\begin{pmatrix} 1 & b\\\\ b & 9 \\end{pmatrix}$ with $b$ real.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `For which $b$ is $K$ positive definite?`, answer: `The leading minors are $1$ and $9 - b^2$, so $K$ is positive definite exactly when $|b| < 3$.` },
                { prompt: `Sketch the level curve $x^TKx = 1$ for $b = 0$, $b = 2$ and $b = 3$, and describe how it changes as $b$ approaches the boundary of the range.`, answer: `$b = 0$: the ellipse $x^2 + 9y^2 = 1$, semi-axes $1$ and $\\tfrac13$ along the axes. $b = 2$: a tilted ellipse; the eigenvalues $5 \\pm 2\\sqrt5 \\approx 9.47, 0.53$ give semi-axes about $0.33$ and $1.37$. As $b \\to 3$ the small eigenvalue goes to $0$ and the long axis grows without bound. At $b = 3$, $x^TKx = (x + 3y)^2$ and the ellipse opens into the two parallel lines $x + 3y = \\pm1$.` },
              ],
            },
            {
              slug: 'cholesky-by-hand',
              title: 'Cholesky by hand',
              prompt: `Let $K = \\begin{pmatrix} 4 & 2\\\\ 2 & 3 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the Cholesky factor $G$ (lower triangular, positive diagonal) with $GG^T = K$.`, answer: `$g_{11} = \\sqrt4 = 2$, $g_{21} = 2/2 = 1$ and $g_{22} = \\sqrt{3 - 1} = \\sqrt2$, so $G = \\begin{pmatrix} 2 & 0\\\\ 1 & \\sqrt2 \\end{pmatrix}$.` },
                { prompt: `Use it to solve $Kx = (2, 3)$ by two triangular solves.`, answer: `$Gc = (2, 3)$ gives $c = (1, \\sqrt2)$. $G^Tx = c$ gives $x_2 = \\sqrt2/\\sqrt2 = 1$ and $x_1 = (1 - 1)/2 = 0$. So $x = (0, 1)$; check $K(0, 1) = (2, 3)$.` },
                { prompt: `Check with numpy.linalg.cholesky.`, answer: `numpy.linalg.cholesky(K) returns [[2, 0], [1, 1.41421356]], the same $G$.` },
              ],
            },
            {
              slug: 'gram-is-definite',
              title: 'When the stiffness matrix is definite',
              prompt: `Let $A$ be $m \\times n$, $C$ diagonal with positive entries, and $K = A^TCA$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $K$ is symmetric positive semidefinite.`, answer: `$K^T = A^TC^TA = A^TCA$ because $C$ is diagonal. For any $x$, $x^TKx = (Ax)^TC(Ax) = \\sum_i c_i(Ax)_i^2 \\ge 0$.` },
                { prompt: `Prove that its null space equals $N(A)$, and hence that it is positive definite if and only if $A$ has independent columns.`, answer: `If $Ax = 0$ then $Kx = 0$. If $Kx = 0$ then $x^TKx = \\sum c_i(Ax)_i^2 = 0$, and positive $c_i$ force $Ax = 0$. So $x^TKx > 0$ for every $x \\ne 0$ exactly when $N(A) = \\{0\\}$, that is, when the columns of $A$ are independent.` },
                { prompt: `Prove the minimum principle identity $P(u) - P(u^*) = \\tfrac12(u - u^*)^TK(u - u^*)$, where $P(u) = \\tfrac12u^TKu - u^Tf$ and $Ku^* = f$.`, answer: `Expand the right side: $\\tfrac12u^TKu - u^TKu^* + \\tfrac12u^{*T}Ku^*$, using the symmetry of $K$. Replace $Ku^*$ by $f$: this is $\\tfrac12u^TKu - u^Tf + \\tfrac12u^{*T}f$. And $P(u^*) = \\tfrac12u^{*T}f - u^{*T}f = -\\tfrac12u^{*T}f$, so the expression equals $P(u) - P(u^*)$. For positive definite $K$ it is positive unless $u = u^*$.` },
              ],
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
          quiz: [
            {
              question: `For which values of $c$ is $\\begin{pmatrix} 2 & 4\\\\ 4 & c \\end{pmatrix}$ positive definite?`,
              options: [`$c > 0$`, `$c > 4$`, `$c \\ge 8$`, `$c > 8$`],
              answer: 3,
              explanation: `The leading minors are $2 > 0$ and $2c - 16$, which is positive exactly when $c > 8$; equivalently the second pivot $c - 8$ must be positive. Positive diagonal entries are necessary but not enough, so $c > 0$ fails (for example $c = 4$ gives determinant $-8$). At $c = 8$ the matrix is only semidefinite: $x = (2, -1)$ gives $x^TKx = 0$.`,
            },
            {
              question: `A symmetric $K$ is positive semidefinite but not positive definite. What follows for $Ku = f$?`,
              options: [`$K$ is singular: $Ku = f$ is solvable only when $f$ is orthogonal to $N(K)$, and then solutions are not unique`, `$K$ is invertible, since none of its eigenvalues is negative`, `$Ku = f$ has a unique solution, the minimiser of $\\tfrac12u^TKu - u^Tf$`, `$\\tfrac12u^TKu - u^Tf$ has a minimum for every $f$`],
              answer: 0,
              explanation: `Not definite means some $x \\ne 0$ has $x^TKx = 0$, and for semidefinite $K$ that forces $Kx = 0$: an eigenvalue is $0$ and $K$ is singular. Since $K$ is symmetric, $C(K) = N(K)^\\perp$, which gives the solvability condition, and any null vector can be added to a solution. If $f$ has a component along $N(K)$, the energy decreases without bound along that direction, so there is no minimum. This is the free-free spring chain.`,
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
              prompt: `Three equal masses $m$ hang between a ceiling and a floor, connected by four equal springs of stiffness $c$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Write $A$ ($4 \\times 3$) and form $K = A^TCA$.`, answer: `$e_1 = u_1$, $e_2 = u_2 - u_1$, $e_3 = u_3 - u_2$, $e_4 = -u_3$, so $A = \\begin{pmatrix} 1 & 0 & 0\\\\ -1 & 1 & 0\\\\ 0 & -1 & 1\\\\ 0 & 0 & -1 \\end{pmatrix}$ and $K = c\\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}$.` },
                { prompt: `Solve $Ku = mg(1, 1, 1)$.`, answer: `With $K^{-1}$ from the inverse lesson, $u = \\tfrac{mg}{c}(\\tfrac32, 2, \\tfrac32)$.` },
                { prompt: `Find all four spring forces and say which springs are stretched and which compressed.`, answer: `$y = cAu = mg(\\tfrac32, \\tfrac12, -\\tfrac12, -\\tfrac32)$. The top two springs are stretched (tension) and the bottom two compressed.` },
                { prompt: `Check that the support reactions add up to $3mg$.`, answer: `The top spring pulls down on the ceiling with $\\tfrac32mg$ and the bottom spring pushes down on the floor with $\\tfrac32mg$: together $3mg$, the total weight.` },
              ],
            },
            {
              slug: 'free-free-chain',
              title: 'A free-free chain',
              prompt: `Three masses are joined by two unit springs with both ends free.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write $A$ and $K$.`, answer: `$e_1 = u_2 - u_1$ and $e_2 = u_3 - u_2$, so $A = \\begin{pmatrix} -1 & 1 & 0\\\\ 0 & -1 & 1 \\end{pmatrix}$ and $K = A^TA = \\begin{pmatrix} 1 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 1 \\end{pmatrix}$.` },
                { prompt: `Find $N(K)$.`, answer: `$N(K) = N(A)$, spanned by $(1, 1, 1)$: the whole chain translating rigidly.` },
                { prompt: `State the condition on $f$ for $Ku = f$ to be solvable.`, answer: `$f$ must be orthogonal to $(1, 1, 1)$: $f_1 + f_2 + f_3 = 0$, so the loads balance.` },
                { prompt: `Solve for $f = (-1, 0, 1)$ and describe the complete solution physically.`, answer: `$u = (-1, 0, 1) + \\alpha(1, 1, 1)$ for any $\\alpha$. The end masses are pulled apart, each spring stretches by $1$ (tension $1$), and the position of the whole chain is undetermined, since a rigid shift costs no energy.` },
              ],
            },
            {
              slug: 'determinate-chain',
              title: 'Why fixed-free is determinate',
              prompt: `Consider a fixed-free chain with $n$ springs of stiffnesses $c_1, \\dots, c_n$ and loads $f_1, \\dots, f_n$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $A$ is invertible.`, answer: `$e_1 = u_1$ and $e_i = u_i - u_{i-1}$, so $A$ is lower triangular with ones on the diagonal and $-1$ below it. Its determinant is $1$.` },
                { prompt: `Prove that the spring forces are $y_i = f_i + f_{i+1} + \\cdots + f_n$ regardless of the stiffnesses.`, answer: `$A^Ty = f$ reads $f_j = y_j - y_{j+1}$ with $y_{n+1} = 0$. Solving from the bottom up gives $y_n = f_n$, $y_{n-1} = f_{n-1} + f_n$, and in general $y_i = f_i + \\cdots + f_n$. No $c_i$ appears: each spring carries everything hanging below it.` },
                { prompt: `Show that $K^{-1} = A^{-1}C^{-1}A^{-T}$ has all entries positive, and interpret that physically.`, answer: `$A^{-1}$ is the running-sum matrix (ones on and below the diagonal), so $(K^{-1})_{ij} = \\sum_{k \\le \\min(i, j)} 1/c_k > 0$. Pushing any single mass down moves every mass down, by the combined compliance of the springs above both of them.` },
              ],
            },
            {
              slug: 'long-chain',
              title: 'A long chain and its continuum limit',
              prompt: `Take a fixed-fixed chain of $n$ equal masses and $n + 1$ equal springs under gravity.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `Prove that $u_j = \\frac{mg}{c}\\cdot\\frac{j(n + 1 - j)}{2}$ by substituting into $Ku = f$.`, answer: `$K = c\\,K_n$ and $f = mg(1, \\dots, 1)$. The formula vanishes at $j = 0$ and $j = n + 1$, matching the fixed ends. The second difference of the quadratic $q_j = j(n + 1 - j)/2$ is $q_{j-1} - 2q_j + q_{j+1} = -1$, so $-q_{j-1} + 2q_j - q_{j+1} = 1$ for every $j$ and $Ku = c \\cdot \\tfrac{mg}{c} \\cdot 1 = mg$ in each row.` },
                { prompt: `Check it numerically for $n = 100$.`, answer: `numpy.linalg.solve on $K_{100}$ with right-hand side all ones agrees with $j(101 - j)/2$ to about $10^{-11}$. The middle masses $j = 50, 51$ move most, $1275\\,mg/c$.` },
                { prompt: `Compare the shape with the parabola $u(x) \\propto x(L - x)$ of a hanging elastic bar.`, answer: `With spacing $h$, $x = jh$ and $L = (n + 1)h$, so $j(n + 1 - j) = x(L - x)/h^2$: the discrete displacements are exactly the parabola sampled at the masses. The second difference is the discrete form of $-u'' = $ constant.` },
              ],
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
          quiz: [
            {
              question: `A fixed-free chain hangs two masses: $10$ N on top and $5$ N below. The top spring has $c_1 = 100$ N/m and the lower one $c_2 = 50$ N/m. How far does the bottom mass move?`,
              options: [`$0.25$ m`, `$0.10$ m`, `$0.20$ m`, `$0.15$ m`],
              answer: 0,
              explanation: `The chain is determinate, so the forces come from balance: the lower spring carries $5$ N and the top spring carries both weights, $15$ N. The elongations are $15/100 = 0.15$ m and $5/50 = 0.10$ m, and the bottom mass moves by their sum, $0.25$ m. Giving the top spring only its own $10$ N gives $0.20$ m; $0.10$ and $0.15$ m are single elongations.`,
            },
            {
              question: `Which support arrangement makes a line of masses and springs statically determinate?`,
              options: [`Fixed-fixed, because both ends hold the chain`, `Free-free, because no support forces are unknown`, `Fixed-free, because $A$ is square and invertible, so $A^Ty = f$ gives the spring forces without the stiffnesses`, `All three, since force balance holds in each`],
              answer: 2,
              explanation: `Determinate means the forces follow from balance alone, which needs $A^Ty = f$ to have exactly one solution: $A$ square and invertible. Fixed-fixed has one spring more than masses, so balance leaves a free parameter and you must solve $Ku = f$ first; that is indeterminate. Free-free has one spring fewer, $A^Ty = f$ is solvable only for balanced loads, and the chain has a rigid motion.`,
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
              prompt: `In the worked example, change the conductance of edge $1 \\to 2$ to $2$ S (resistance $\\tfrac12\\ \\Omega$), keeping the others at $1$ S, with the same source and ground.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Solve for the potentials.`, answer: `$A^TCA = \\begin{pmatrix} 3 & -2 & -1 & 0\\\\ -2 & 4 & -1 & -1\\\\ -1 & -1 & 3 & -1\\\\ 0 & -1 & -1 & 2 \\end{pmatrix}$. Deleting node 4 and solving with $s = (1, 0, 0)$ gives $u = (\\tfrac{11}{13}, \\tfrac{7}{13}, \\tfrac{6}{13}, 0)$ V.` },
                { prompt: `Find all five currents and the current through the bridge edge.`, answer: `$y = -CAu = (\\tfrac{8}{13}, \\tfrac{5}{13}, \\tfrac{1}{13}, \\tfrac{7}{13}, \\tfrac{6}{13})$ A for edges $1 \\to 2$, $1 \\to 3$, $2 \\to 3$, $2 \\to 4$, $3 \\to 4$. The bridge carries $\\tfrac{1}{13}$ A from node 2 to node 3.` },
                { prompt: `Find the effective resistance between nodes 1 and 4.`, answer: `$R_{\\text{eff}} = u_1/(1\\text{ A}) = \\tfrac{11}{13}\\ \\Omega$, less than $1\\ \\Omega$ because one resistor got smaller.` },
                { prompt: `Verify Kirchhoff's current law at every node.`, answer: `Node 1: $\\tfrac{8}{13} + \\tfrac{5}{13} = 1$ A leaves, matching the source. Node 2: $\\tfrac{8}{13}$ in, $\\tfrac{1}{13} + \\tfrac{7}{13}$ out. Node 3: $\\tfrac{5}{13} + \\tfrac{1}{13}$ in, $\\tfrac{6}{13}$ out. Node 4: $\\tfrac{7}{13} + \\tfrac{6}{13} = 1$ A in, leaving through the sink.` },
              ],
            },
            {
              slug: 'series-and-parallel',
              title: 'Series and parallel from the Laplacian',
              prompt: `Using $A^TCA$, derive the effective resistance of two resistors $R_1$, $R_2$. In each case ground one end and inject $1$ A at the other. Write $c_k = 1/R_k$.`,
              kind: 'derivation',
              difficulty: 1,
              parts: [
                { prompt: `In series (three nodes, two edges).`, answer: `Edges $1 \\to 2$ and $2 \\to 3$; ground node 3. The reduced system is $\\begin{pmatrix} c_1 & -c_1\\\\ -c_1 & c_1 + c_2 \\end{pmatrix}u = (1, 0)$. The first row gives $u_1 - u_2 = R_1$, and adding the rows gives $c_2u_2 = 1$, so $u_2 = R_2$ and $R_{\\text{eff}} = u_1 = R_1 + R_2$.` },
                { prompt: `In parallel (two nodes, two edges).`, answer: `Both edges run $1 \\to 2$, so $A^TCA = (c_1 + c_2)\\begin{pmatrix} 1 & -1\\\\ -1 & 1 \\end{pmatrix}$. Grounding node 2 leaves $(c_1 + c_2)u_1 = 1$, so $R_{\\text{eff}} = \\dfrac{1}{1/R_1 + 1/R_2} = \\dfrac{R_1R_2}{R_1 + R_2}$.` },
              ],
            },
            {
              slug: 'laplacian-properties',
              title: 'Properties of the weighted Laplacian',
              prompt: `Let $K = A^TCA$ for a connected network with positive conductances.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove $u^TKu = \\sum_k c_k(u_{\\text{end}(k)} - u_{\\text{start}(k)})^2$.`, answer: `$u^TKu = (Au)^TC(Au) = \\sum_k c_k(Au)_k^2$, and row $k$ of $A$ gives $(Au)_k = u_{\\text{end}(k)} - u_{\\text{start}(k)}$.` },
                { prompt: `Prove that $K$ is positive semidefinite with null space spanned by $(1, \\dots, 1)$.`, answer: `By the formula, $u^TKu \\ge 0$, with equality iff every edge has equal potentials at its ends. For a connected network that means $u$ is constant (follow paths), and $Ku = 0$ iff $u^TKu = 0$ for semidefinite $K$.` },
                { prompt: `Prove that deleting the row and column of any one node leaves a positive definite matrix.`, answer: `For $x$ in the smaller space, extend it by $0$ at the deleted node to get $u$; then $x^TK_{\\text{red}}x = u^TKu \\ge 0$. Equality forces $u$ constant, and a constant vector with one entry $0$ is zero, so $x = 0$.` },
              ],
            },
            {
              slug: 'resistor-grid',
              title: 'Effective resistance of a grid',
              prompt: `Build the incidence matrix of a square grid of unit resistors with $N$ nodes on each side ($N^2$ nodes) in NumPy. Ground one corner and inject $1$ A at the opposite corner.`,
              kind: 'coding',
              difficulty: 3,
              parts: [
                { prompt: `Check $N = 2$ (a single square) by hand.`, answer: `Two paths of two $1\\ \\Omega$ resistors each, $2\\ \\Omega$ apiece, in parallel give $1\\ \\Omega$.` },
                { prompt: `Compute the effective resistance for $N = 2, 4, 8, 16, 32$.`, answer: `You should get about $1.000$, $1.857$, $2.729$, $3.609$ and $4.490\\ \\Omega$. The value for $N = 4$ is exactly $\\tfrac{13}{7}$.` },
                { prompt: `Describe how the resistance grows with $N$.`, answer: `Logarithmically: each doubling of $N$ adds almost the same amount, approaching $(4/\\pi)\\ln2 \\approx 0.88\\ \\Omega$, so $R \\approx (4/\\pi)\\ln N$ plus a constant for large $N$.` },
              ],
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
          quiz: [
            {
              question: `Resistors of $2\\ \\Omega$ and $3\\ \\Omega$ in parallel are connected in series with a $1\\ \\Omega$ resistor. What is the effective resistance?`,
              options: [`$6\\ \\Omega$`, `$\\tfrac{6}{11}\\ \\Omega$`, `$\\tfrac{11}{6}\\ \\Omega$`, `$2.2\\ \\Omega$`],
              answer: 3,
              explanation: `In parallel, conductances add: $\\tfrac12 + \\tfrac13 = \\tfrac56$ S, so the pair is $\\tfrac65 = 1.2\\ \\Omega$. In series, resistances add: $1.2 + 1 = 2.2\\ \\Omega$. $\\tfrac{11}{6}$ adds the conductance $\\tfrac56$ to the resistance $1$ without inverting it, $6\\ \\Omega$ treats everything as series and $\\tfrac{6}{11}$ treats everything as parallel.`,
            },
            {
              question: `Why must you ground a node before solving $A^TCA\\,u = s$ for a resistor network?`,
              options: [`Grounding is what makes the currents satisfy Kirchhoff's current law`, `The Laplacian is singular, with the constants as its null space; fixing one potential removes that freedom and leaves a positive definite system`, `Grounding removes the current source, so the system becomes homogeneous`, `Without a ground the conductance matrix $C$ would not be diagonal`],
              answer: 1,
              explanation: `Adding a constant to every potential changes no current, so $A^TCA$ has the null space $(1, \\dots, 1)$ and cannot be inverted. Setting one potential to $0$ deletes a row and column and leaves a positive definite matrix. Kirchhoff's law is already built into $A^TCA\\,u = s$, and the sources stay in $s$.`,
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
              prompt: `Joint $P$ at the origin hangs from pins at $(-1, 1)$ and $(1, 1)$ by two bars of stiffness $k$ and carries a load $W$ downward.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Write $A$.`, answer: `The unit directions from the pins toward $P$ are $(1, -1)/\\sqrt2$ and $(-1, -1)/\\sqrt2$, so $A = \\tfrac{1}{\\sqrt2}\\begin{pmatrix} 1 & -1\\\\ -1 & -1 \\end{pmatrix}$.` },
                { prompt: `Find the bar forces from $A^Ty = f$.`, answer: `With $f = (0, -W)$: the $x$ row gives $(y_1 - y_2)/\\sqrt2 = 0$ and the $y$ row gives $-(y_1 + y_2)/\\sqrt2 = -W$. So $y_1 = y_2 = W/\\sqrt2$, both in tension.` },
                { prompt: `Show that $K = A^TCA = kI$.`, answer: `$A^TA = \\tfrac12\\begin{pmatrix} 1 + 1 & -1 + 1\\\\ -1 + 1 & 1 + 1 \\end{pmatrix} = I$, so $K = kA^TA = kI$.` },
                { prompt: `Find the displacement of $P$.`, answer: `$u = K^{-1}f = (0, -W/k)$: straight down, by symmetry.` },
              ],
            },
            {
              slug: 'find-the-mechanism',
              title: 'Find and remove a mechanism',
              prompt: `Joints 1 at $(0, 0)$ and 2 at $(1, 0)$ are pinned. Free joints 3 at $(0, 1)$ and 4 at $(1, 1)$ are connected by bars 1-3, 2-4 and 3-4. Order the unknowns as $(u_{3x}, u_{3y}, u_{4x}, u_{4y})$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write the $3 \\times 4$ matrix $A$.`, answer: `Bars 1-3 and 2-4 point straight up and bar 3-4 points in $+x$: $A = \\begin{pmatrix} 0 & 1 & 0 & 0\\\\ 0 & 0 & 0 & 1\\\\ -1 & 0 & 1 & 0 \\end{pmatrix}$.` },
                { prompt: `Find $N(A)$ and describe the mechanism.`, answer: `$Au = 0$ needs $u_{3y} = u_{4y} = 0$ and $u_{3x} = u_{4x}$, so $N(A)$ is spanned by $(1, 0, 1, 0)$: the top bar sways sideways while the two vertical bars tilt, and no bar stretches to first order.` },
                { prompt: `Add the diagonal 1-4 and show the new $A$ is invertible.`, answer: `The new row is $(0, 0, \\tfrac{1}{\\sqrt2}, \\tfrac{1}{\\sqrt2})$, and the $4 \\times 4$ matrix has determinant $\\tfrac{1}{\\sqrt2} \\ne 0$. The diagonal stretches under the sway, so the mechanism is gone and the truss is determinate.` },
                { prompt: `Find the bar forces for a horizontal load $H$ at joint 3.`, answer: `Solving $A^Ty = (H, 0, 0, 0)$: the diagonal carries $\\sqrt2H$ in tension, bar 2-4 carries $H$ in compression, bar 3-4 carries $H$ in compression and bar 1-3 carries nothing.` },
              ],
            },
            {
              slug: 'collinear-bars',
              title: 'Counting is not enough',
              prompt: `A free joint at the origin is held by two bars to pins at $(-1, 0)$ and $(1, 0)$.`,
              kind: 'writing',
              difficulty: 2,
              parts: [
                { prompt: `Show that $A$ is $2 \\times 2$ with rank $1$.`, answer: `The directions toward the joint are $(1, 0)$ and $(-1, 0)$, so $A = \\begin{pmatrix} 1 & 0\\\\ -1 & 0 \\end{pmatrix}$: two bars and two unknowns, but the rows are parallel and the rank is $1$.` },
                { prompt: `Find the infinitesimal mechanism.`, answer: `$N(A)$ is spanned by $(0, 1)$. A vertical displacement $\\delta$ stretches each bar by $\\sqrt{1 + \\delta^2} - 1 \\approx \\delta^2/2$, which is zero to first order.` },
                { prompt: `Explain physically why a real taut cable in this position can still carry a vertical load only by sagging (a nonlinear effect the linear model misses).`, answer: `A good answer says: in the straight position both bars are horizontal and cannot push up at all. After a sag $\\delta$, each bar with tension $T$ has vertical component about $T\\delta$, so balance needs $2T\\delta \\approx W$. The vertical stiffness comes from the tension and the changed geometry, which are second-order effects that $e = Au$ drops.` },
              ],
            },
            {
              slug: 'warren-truss',
              title: 'A small bridge truss in code',
              prompt: `Model a three-panel Warren truss of span $3$ m and height $1$ m (equilateral or isosceles triangles, your choice) pinned at one end and on a roller at the other, with a $10$ kN load at the middle bottom joint.`,
              kind: 'coding',
              difficulty: 3,
              parts: [
                { prompt: `Assemble $A$ in NumPy and check its rank.`, answer: `For example, take bottom joints at $x = 0, 1.5, 3$ and top joints at $(0.75, 1)$ and $(2.25, 1)$: three triangles and seven bars. The pin removes two unknowns and the roller one, leaving $7$, so $A$ is $7 \\times 7$. Its rank should be $7$: the truss is determinate.` },
                { prompt: `Solve $A^Ty = f$ for the $10$ kN load.`, answer: `For the layout above: bottom chord $3.75$ kN tension in each bar, the two inner diagonals $6.25$ kN tension, the two end diagonals $6.25$ kN compression, and the top chord $7.5$ kN compression. Another layout gives other numbers but the same pattern.` },
                { prompt: `Verify the force in one bar by the method of joints by hand.`, answer: `At the pinned support the reaction is $5$ kN upward, by symmetry. The end diagonal has length $1.25$ m and direction $(0.6, 0.8)$, so vertical balance gives $5 + 0.8y = 0$, $y = -6.25$ kN (compression). Horizontal balance then gives the bottom bar $-0.6y = 3.75$ kN tension.` },
                { prompt: `Report which bars are in tension.`, answer: `The bottom chord and the diagonals that slope down toward the load are in tension; the top chord and the end diagonals are in compression, as in a simply supported beam whose bottom fibres stretch.` },
              ],
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
          quiz: [
            {
              question: `Joint $P$ at the origin carries $10$ kN downward. Bar 1 runs horizontally to a wall pin at $(-1, 0)$, and bar 2 runs to a wall pin at $(-3, 4)$. What are the bar forces?`,
              options: [`Bar 2: $12.5$ kN compression; bar 1: $7.5$ kN tension`, `Bar 2: $12.5$ kN tension; bar 1: $7.5$ kN compression`, `Bar 2: $10$ kN tension; bar 1: $0$`, `Bar 2: $8$ kN tension; bar 1: $6$ kN compression`],
              answer: 1,
              explanation: `The directions toward $P$ are $(1, 0)$ and $(3, -4)/5$. The vertical row of $A^Ty = (0, -10)$ gives $-\\tfrac45y_2 = -10$, so $y_2 = 12.5$ kN (tension), and the horizontal row gives $y_1 + \\tfrac35(12.5) = 0$, so $y_1 = -7.5$ kN (compression). $8$ and $6$ kN come from multiplying by $\\tfrac45$ and $\\tfrac35$ instead of dividing, and the diagonal cannot carry the load alone because it also pulls sideways.`,
            },
            {
              question: `A plane truss has $6$ displacement unknowns and $6$ bars. What can you conclude?`,
              options: [`Nothing yet: it is determinate only if the $6 \\times 6$ matrix $A$ is invertible, and a rank-deficient $A$ means a mechanism`, `It is statically determinate`, `It is a mechanism`, `It is statically indeterminate`],
              answer: 0,
              explanation: `Matching counts make $A$ square, which is necessary for determinacy but not sufficient. If the bars are badly placed, as with two collinear bars at a joint, $A$ has a null vector: a mechanism, even with $m = n$. You must check the rank. An indeterminate truss needs more bars than unknowns.`,
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

\`\`\`interactive
matrix-transform
{"title": "Find the eigenvectors by dragging", "A": [[4, 1], [2, 3]], "x": [1, 0.3], "view": 6, "mode": "eigen", "modes": ["eigen", "transform"], "presets": ["rotation90", "defective", "symmetric", "projection"], "bracket": "p", "caption": "Drag x around and watch Ax (red). Only along the dashed lines does Ax point the same way as x (it snaps there): along (1, 1), Ax = 5x, and along (1, −2), Ax = 2x. The readouts check trace 7 and determinant 10. Press Rotation 90° to lose every real eigenline (λ = ±i), and Defective to see a double eigenvalue with just one line; type rows (3, 1), (0, 3) to get the matrix of the multiplicity paragraph."}
\`\`\`

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
              prompt: `Let $A = \\begin{pmatrix} 2 & 1\\\\ 1 & 2 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the eigenvalues and eigenvectors of $A$.`, answer: `$\\det(A - \\lambda I) = \\lambda^2 - 4\\lambda + 3 = (\\lambda - 3)(\\lambda - 1)$. $\\lambda = 3$ has eigenvector $(1, 1)$ and $\\lambda = 1$ has $(1, -1)$.` },
                { prompt: `Check the trace and determinant.`, answer: `$3 + 1 = 4 = \\operatorname{tr}A$ and $3 \\cdot 1 = 3 = \\det A$.` },
                { prompt: `Show that the eigenvectors are orthogonal.`, answer: `$(1, 1) \\cdot (1, -1) = 0$.` },
                { prompt: `What are the eigenvalues of $A^2$, $A^{-1}$ and $A + 5I$, and why?`, answer: `$9, 1$; $\\tfrac13, 1$; $8, 6$, with the same eigenvectors. If $Ax = \\lambda x$ then $A^2x = \\lambda^2x$, $A^{-1}x = \\lambda^{-1}x$ and $(A + 5I)x = (\\lambda + 5)x$.` },
              ],
            },
            {
              slug: 'second-difference-eigen',
              title: 'Eigenvalues of the spring-chain matrix',
              prompt: `Let $K = \\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Show that $K$ has eigenvalues $2 - \\sqrt2$, $2$, $2 + \\sqrt2$ with eigenvectors $(1, \\sqrt2, 1)$, $(1, 0, -1)$, $(1, -\\sqrt2, 1)$.`, answer: `Multiply out: $K(1, \\sqrt2, 1) = (2 - \\sqrt2,\\ 2\\sqrt2 - 2,\\ 2 - \\sqrt2) = (2 - \\sqrt2)(1, \\sqrt2, 1)$; $K(1, 0, -1) = (2, 0, -2)$; and $K(1, -\\sqrt2, 1) = (2 + \\sqrt2,\\ -2\\sqrt2 - 2,\\ 2 + \\sqrt2) = (2 + \\sqrt2)(1, -\\sqrt2, 1)$.` },
                { prompt: `Check the sum and product against the trace and the determinant from the determinants lesson.`, answer: `Sum: $(2 - \\sqrt2) + 2 + (2 + \\sqrt2) = 6 = \\operatorname{tr}K$. Product: $(4 - 2) \\cdot 2 = 4 = \\det K$.` },
                { prompt: `Check that eigenvector $k$ has entries proportional to $\\sin(jk\\pi/4)$, $j = 1, 2, 3$.`, answer: `$k = 1$: $(\\tfrac{\\sqrt2}{2}, 1, \\tfrac{\\sqrt2}{2}) \\propto (1, \\sqrt2, 1)$. $k = 2$: $(1, 0, -1)$. $k = 3$: $(\\tfrac{\\sqrt2}{2}, -1, \\tfrac{\\sqrt2}{2}) \\propto (1, -\\sqrt2, 1)$. The eigenvalues are $2 - 2\\cos(k\\pi/4)$ in the same order.` },
              ],
            },
            {
              slug: 'geometric-eigenvalues',
              title: 'Eigenvalues you can see',
              prompt: `Without computing a determinant, give the eigenvalues and eigenvectors of each map; then confirm by algebra.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Projection onto the line through $(1, 2)$.`, answer: `Vectors on the line are kept: $\\lambda = 1$ with $(1, 2)$. Vectors perpendicular to it go to zero: $\\lambda = 0$ with $(-2, 1)$.` },
                { prompt: `Reflection across that line.`, answer: `$\\lambda = 1$ with $(1, 2)$, which stays put, and $\\lambda = -1$ with $(-2, 1)$, which is flipped.` },
                { prompt: `Rotation by $90^\\circ$ (complex).`, answer: `No real direction is preserved, so there is no real eigenvector. The eigenvalues are $\\pm i$, of size $1$ because rotation keeps lengths.` },
                { prompt: `Confirm the projection and reflection answers with characteristic polynomials.`, answer: `$P = \\tfrac15\\begin{pmatrix} 1 & 2\\\\ 2 & 4 \\end{pmatrix}$ has trace $1$ and determinant $0$, so $\\lambda^2 - \\lambda = 0$ and $\\lambda = 0, 1$. $H = 2P - I$ has trace $0$ and determinant $-1$, so $\\lambda^2 - 1 = 0$ and $\\lambda = \\pm1$.` },
                { prompt: `Find the complex eigenvectors for the rotation.`, answer: `$R = \\begin{pmatrix} 0 & -1\\\\ 1 & 0 \\end{pmatrix}$ has $\\lambda^2 + 1 = 0$. For $\\lambda = i$ the eigenvector is $(1, -i)$, since $R(1, -i) = (i, 1) = i(1, -i)$. For $\\lambda = -i$ it is the conjugate $(1, i)$.` },
              ],
            },
            {
              slug: 'independence-of-eigenvectors',
              title: 'Distinct eigenvalues give independent eigenvectors',
              prompt: `Relate distinct eigenvalues to independent eigenvectors, and see what can go wrong with a repeated one.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove by induction on $k$ that eigenvectors $x_1, \\dots, x_k$ belonging to distinct eigenvalues are linearly independent.`, answer: `One nonzero vector is independent. Suppose the claim holds for $k - 1$ and $c_1x_1 + \\cdots + c_kx_k = 0$. Apply $A$ and subtract $\\lambda_k$ times the original: $c_1(\\lambda_1 - \\lambda_k)x_1 + \\cdots + c_{k-1}(\\lambda_{k-1} - \\lambda_k)x_{k-1} = 0$. By induction each $c_i(\\lambda_i - \\lambda_k) = 0$, and distinctness gives $c_1 = \\cdots = c_{k-1} = 0$. Then $c_kx_k = 0$ forces $c_k = 0$.` },
                { prompt: `Show that $\\begin{pmatrix} 3 & 1\\\\ 0 & 3 \\end{pmatrix}$ has algebraic multiplicity $2$ but geometric multiplicity $1$ for $\\lambda = 3$.`, answer: `The characteristic polynomial is $(\\lambda - 3)^2$, so the algebraic multiplicity is $2$. But $A - 3I = \\begin{pmatrix} 0 & 1\\\\ 0 & 0 \\end{pmatrix}$ has rank $1$, so its null space, spanned by $(1, 0)$, has dimension $1$.` },
              ],
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
          quiz: [
            {
              question: `What are the eigenvalues of $\\begin{pmatrix} 1 & 4\\\\ 2 & 3 \\end{pmatrix}$?`,
              options: [`$1$ and $3$`, `$-5$ and $1$`, `$5$ and $-1$`, `$4$ and $-5$`],
              answer: 2,
              explanation: `The trace is $4$ and the determinant is $3 - 8 = -5$, so $\\lambda^2 - 4\\lambda - 5 = (\\lambda - 5)(\\lambda + 1) = 0$. Check: $5 + (-1) = 4$ and $5 \\cdot (-1) = -5$. The diagonal entries are eigenvalues only for triangular matrices, $-5$ and $1$ come from the wrong sign on the trace term, and $4$ and $-5$ are the trace and determinant themselves.`,
            },
            {
              question: `$A$ is $3 \\times 3$ and upper triangular with diagonal entries $2, 2, 5$. Which statement must be true?`,
              options: [`$A$ has two independent eigenvectors for $\\lambda = 2$`, `$A$ is diagonalisable`, `$\\det A = 9$`, `$\\lambda = 2$ has algebraic multiplicity $2$, but its geometric multiplicity may be $1$ or $2$`],
              answer: 3,
              explanation: `The eigenvalues of a triangular matrix are its diagonal entries, so $2$ appears twice in the characteristic polynomial. How many independent eigenvectors it has depends on the entries above the diagonal: $\\begin{pmatrix} 2 & 1\\\\ 0 & 2 \\end{pmatrix}$ in the top corner gives only one. So neither two eigenvectors nor diagonalisability is guaranteed. $\\det A = 2 \\cdot 2 \\cdot 5 = 20$; $9$ is the trace.`,
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

\`\`\`interactive
matrix-transform
{"title": "Aᵏu₀, one eigen-direction at a time", "A": [[4, 1], [2, 3]], "vec": "u", "x": [1, -1], "view": 2.5, "mode": "powers", "modes": ["powers", "eigen"], "k": 0, "kMax": 10, "presets": [], "bracket": "p", "caption": "Slide k. The readout splits u₀ = (1, −1) into c₁(1, 1) + c₂(1, −2) and shows Aᵏu₀ = c₁5ᵏ(1, 1) + c₂2ᵏ(1, −2), and the matrix Aᵏ agrees with the closed form of the text (try k = 1 and k = 3). The arrows are rescaled to one length so you can watch the direction turn onto the line of (1, 1). Type the defective matrix with rows (1, 1), (0, 1) and watch Aᵏ grow like k instead."}
\`\`\`

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
              prompt: `Let $A = \\begin{pmatrix} 1 & 2\\\\ 2 & 1 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Diagonalise $A$.`, answer: `$\\lambda = 3$ with $(1, 1)$ and $\\lambda = -1$ with $(1, -1)$. So $A = S\\Lambda S^{-1}$ with $S = \\begin{pmatrix} 1 & 1\\\\ 1 & -1 \\end{pmatrix}$, $\\Lambda = \\operatorname{diag}(3, -1)$ and $S^{-1} = \\tfrac12\\begin{pmatrix} 1 & 1\\\\ 1 & -1 \\end{pmatrix}$.` },
                { prompt: `Use the result to write $A^{10}$ exactly.`, answer: `$A^{10} = S\\Lambda^{10}S^{-1}$ with $(-1)^{10} = 1$: $A^{10} = \\tfrac12\\begin{pmatrix} 3^{10} + 1 & 3^{10} - 1\\\\ 3^{10} - 1 & 3^{10} + 1 \\end{pmatrix} = \\begin{pmatrix} 29525 & 29524\\\\ 29524 & 29525 \\end{pmatrix}$.` },
                { prompt: `Check with NumPy using exact integers (numpy.linalg.matrix_power on an integer array).`, answer: `numpy.linalg.matrix_power(np.array([[1, 2], [2, 1]]), 10) returns [[29525, 29524], [29524, 29525]].` },
              ],
            },
            {
              slug: 'fibonacci-closed-form',
              title: 'Fibonacci numbers from eigenvalues',
              prompt: `Use matrices to find a closed form for the Fibonacci numbers $F_{k+2} = F_{k+1} + F_k$, $F_0 = 0$, $F_1 = 1$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Write the recurrence as $u_{k+1} = Au_k$ with $u_k = (F_{k+1}, F_k)$ and $A = \\begin{pmatrix} 1 & 1\\\\ 1 & 0 \\end{pmatrix}$.`, answer: `$Au_k = (F_{k+1} + F_k,\\ F_{k+1}) = (F_{k+2}, F_{k+1}) = u_{k+1}$, starting from $u_0 = (1, 0)$.` },
                { prompt: `Diagonalise $A$.`, answer: `$\\lambda^2 - \\lambda - 1 = 0$ gives $\\varphi, \\psi = (1 \\pm \\sqrt5)/2$. Each eigenvalue $\\lambda$ has eigenvector $(\\lambda, 1)$, since $A(\\lambda, 1) = (\\lambda + 1, \\lambda) = (\\lambda^2, \\lambda)$.` },
                { prompt: `Derive $F_k = (\\varphi^k - \\psi^k)/\\sqrt5$ with $\\varphi, \\psi = (1 \\pm \\sqrt5)/2$.`, answer: `$u_0 = (1, 0) = \\dfrac{(\\varphi, 1) - (\\psi, 1)}{\\varphi - \\psi}$ with $\\varphi - \\psi = \\sqrt5$. So $u_k = \\dfrac{\\varphi^k(\\varphi, 1) - \\psi^k(\\psi, 1)}{\\sqrt5}$, and the second component is $F_k = (\\varphi^k - \\psi^k)/\\sqrt5$.` },
                { prompt: `Explain why $F_{k+1}/F_k \\to \\varphi$.`, answer: `$|\\psi| \\approx 0.618 < 1$, so $\\psi^k \\to 0$ and $F_k \\approx \\varphi^k/\\sqrt5$. The ratio of consecutive terms tends to $\\varphi^{k+1}/\\varphi^k = \\varphi \\approx 1.618$: the dominant eigenvalue wins.` },
              ],
            },
            {
              slug: 'diagonalisable-or-not',
              title: 'Diagonalisable or not?',
              prompt: `For each matrix, decide whether it is diagonalisable over $\\mathbb{R}$, over $\\mathbb{C}$, or neither, and justify.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `$\\begin{pmatrix} 2 & 0\\\\ 0 & 2 \\end{pmatrix}$`, answer: `Diagonalisable over both: it is already diagonal. A repeated eigenvalue is no obstacle when there are enough eigenvectors.` },
                { prompt: `$\\begin{pmatrix} 2 & 1\\\\ 0 & 2 \\end{pmatrix}$`, answer: `Neither. $\\lambda = 2$ is double, but $A - 2I$ has rank $1$, so there is only one independent eigenvector, $(1, 0)$, over either field.` },
                { prompt: `$\\begin{pmatrix} 0 & -1\\\\ 1 & 0 \\end{pmatrix}$`, answer: `Over $\\mathbb{C}$ but not $\\mathbb{R}$. The eigenvalues $\\pm i$ are distinct, so there are two complex eigenvectors, $(1, \\mp i)$, but no real ones.` },
                { prompt: `$\\begin{pmatrix} 1 & 1 & 0\\\\ 0 & 2 & 0\\\\ 0 & 0 & 3 \\end{pmatrix}$`, answer: `Over both. The eigenvalues $1, 2, 3$ are real and distinct, with eigenvectors $(1, 0, 0)$, $(1, 1, 0)$, $(0, 0, 1)$.` },
                { prompt: `$\\begin{pmatrix} 1 & 1\\\\ 0 & 0 \\end{pmatrix}$`, answer: `Over both. The eigenvalues $1$ and $0$ are distinct, with eigenvectors $(1, 0)$ and $(1, -1)$. A singular matrix can be diagonalisable.` },
              ],
            },
            {
              slug: 'power-method',
              title: 'The power method',
              prompt: `Implement the power method $x_{k+1} = Ax_k/\\|Ax_k\\|$ and run it on $A = \\begin{pmatrix} 4 & 1\\\\ 2 & 3 \\end{pmatrix}$ from $x_0 = (1, 0)$.`,
              kind: 'coding',
              difficulty: 3,
              parts: [
                { prompt: `Run the iteration and report where it goes.`, answer: `A few lines suffice: x = A @ x; x /= np.linalg.norm(x) in a loop. The iterates approach $(1, 1)/\\sqrt2$, the eigenvector for $\\lambda_1 = 5$, and $x^TAx$ approaches $5$.` },
                { prompt: `Show that the error in direction shrinks by about the factor $2/5$ per step.`, answer: `The distance from $(1, 1)/\\sqrt2$ is about $0.32, 0.124, 0.049, 0.019, 0.0077, \\dots$, and successive ratios are $0.388, 0.392, 0.396, 0.3985, \\dots$, approaching $0.4$.` },
                { prompt: `Explain this with the closed form for $A^k$.`, answer: `$x_0 = \\tfrac23(1, 1) + \\tfrac13(1, -2)$, so $A^kx_0 = \\tfrac23 5^k(1, 1) + \\tfrac13 2^k(1, -2)$. Relative to the dominant part, the other component is $\\tfrac12(2/5)^k$, so the direction error shrinks by $|\\lambda_2/\\lambda_1| = 2/5$ each step.` },
                { prompt: `What goes wrong if $|\\lambda_1| = |\\lambda_2|$?`, answer: `No eigenvalue dominates, so neither component dies out. With $\\lambda = \\pm1$, for example, the iterates jump between two directions forever; with a complex pair they rotate. The method converges only if the start happens to have no component along the competing eigenvector.` },
              ],
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
          quiz: [
            {
              question: `$A$ has eigenvector $(1, 1)$ with $\\lambda = 2$ and eigenvector $(1, -1)$ with $\\lambda = -1$. What is $A^4(3, 1)$?`,
              options: [`$(33, 31)$`, `$(48, 16)$`, `$(31, 33)$`, `$(17, 15)$`],
              answer: 0,
              explanation: `Expand first: $(3, 1) = 2(1, 1) + 1(1, -1)$. Then $A^4(3, 1) = 2 \\cdot 2^4(1, 1) + 1 \\cdot (-1)^4(1, -1) = (32, 32) + (1, -1) = (33, 31)$. $(48, 16) = 16(3, 1)$ treats $(3, 1)$ as an eigenvector, $(31, 33)$ uses $(-1)^4 = -1$, and $(17, 15)$ drops the coefficient $2$.`,
            },
            {
              question: `Which matrix cannot be diagonalised, even over $\\mathbb{C}$?`,
              options: [`$\\begin{pmatrix} 3 & 0\\\\ 0 & 3 \\end{pmatrix}$`, `$\\begin{pmatrix} 1 & 2\\\\ 0 & 3 \\end{pmatrix}$`, `$\\begin{pmatrix} 0 & 1\\\\ -1 & 0 \\end{pmatrix}$`, `$\\begin{pmatrix} 3 & 1\\\\ 0 & 3 \\end{pmatrix}$`],
              answer: 3,
              explanation: `$\\begin{pmatrix} 3 & 1\\\\ 0 & 3 \\end{pmatrix}$ has the double eigenvalue $3$ but $A - 3I$ has rank $1$, so only one eigenvector: it is defective. $3I$ also has a repeated eigenvalue but is already diagonal, so repetition alone is not the problem. The second matrix has distinct eigenvalues $1, 3$, and the rotation has distinct eigenvalues $\\pm i$, so it diagonalises over $\\mathbb{C}$.`,
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

\`\`\`interactive
matrix-transform
{"title": "Principal axes of 5x² + 4xy + 2y² = 1", "A": [[5, 2], [2, 2]], "x": [0.6, 0.3], "view": 1.8, "symmetric": true, "mode": "quadratic", "modes": ["quadratic", "eigen"], "presets": ["symmetric", "definite", "indefinite"], "bracket": "p", "caption": "The thick cyan curve is the ellipse xᵀAx = 1. Its axes point along q₁ ∝ (2, 1) and q₂ ∝ (1, −2), with semi-axes 1/√6 ≈ 0.41 and 1. Edit the entries (A stays symmetric): the axes always stay perpendicular. Drag x around the ellipse and watch the Rayleigh quotient move between 1 and 6. Switch to Eigen to see the same two directions as the lines that A only stretches."}
\`\`\`

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
              prompt: `A plane stress state has $\\sigma_x = 50$ MPa, $\\sigma_y = -30$ MPa and $\\tau = 30$ MPa, so the stress matrix is $\\begin{pmatrix} 50 & 30\\\\ 30 & -30 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the principal stresses.`, answer: `The trace is $20$ and the determinant $-1500 - 900 = -2400$, so $\\lambda^2 - 20\\lambda - 2400 = (\\lambda - 60)(\\lambda + 40) = 0$: $60$ MPa and $-40$ MPa.` },
                { prompt: `Find the angle of the first principal direction from the $x$-axis.`, answer: `$S - 60I = \\begin{pmatrix} -10 & 30\\\\ 30 & -90 \\end{pmatrix}$ gives the direction $(3, 1)$, at $\\arctan\\tfrac13 \\approx 18.4^\\circ$. The textbook formula agrees: $\\tan2\\theta = 2\\tau/(\\sigma_x - \\sigma_y) = 0.75$.` },
                { prompt: `Verify that the trace (the sum of normal stresses) is unchanged.`, answer: `$50 + (-30) = 20 = 60 + (-40)$.` },
                { prompt: `Write the stress matrix as $Q\\Lambda Q^T$.`, answer: `$Q = \\tfrac{1}{\\sqrt{10}}\\begin{pmatrix} 3 & -1\\\\ 1 & 3 \\end{pmatrix}$ and $\\Lambda = \\operatorname{diag}(60, -40)$; the second column $(-1, 3)$ is the $-40$ MPa direction, perpendicular to the first.` },
              ],
            },
            {
              slug: 'symmetric-proofs',
              title: 'Why symmetric matrices behave',
              prompt: `Let $A$ be a real symmetric matrix.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove carefully that $A$ has real eigenvalues.`, answer: `Let $Ax = \\lambda x$ with $x \\ne 0$, possibly complex, and $\\bar x$ its conjugate. Then $\\bar x^TAx = \\lambda\\,\\bar x^Tx$. The number $\\bar x^TAx$ is real: its conjugate is $x^TA\\bar x = (x^TA\\bar x)^T = \\bar x^TA^Tx = \\bar x^TAx$. And $\\bar x^Tx = \\sum|x_i|^2 > 0$. So $\\lambda$ is a ratio of real numbers.` },
                { prompt: `Prove that eigenvectors for distinct eigenvalues are orthogonal.`, answer: `If $Ax = \\lambda_1x$ and $Ay = \\lambda_2y$, then $\\lambda_1x^Ty = (Ax)^Ty = x^TAy = \\lambda_2x^Ty$, so $(\\lambda_1 - \\lambda_2)x^Ty = 0$ and $x^Ty = 0$.` },
                { prompt: `Show by example that a real non-symmetric matrix can have real eigenvalues with non-orthogonal eigenvectors, using $\\begin{pmatrix} 4 & 1\\\\ 2 & 3 \\end{pmatrix}$.`, answer: `Its eigenvalues are $5$ and $2$ with eigenvectors $(1, 1)$ and $(1, -2)$, whose dot product is $-1 \\ne 0$: they meet at about $108^\\circ$, not $90^\\circ$.` },
              ],
            },
            {
              slug: 'rayleigh-bound',
              title: 'Rayleigh quotient bounds',
              prompt: `Let $K$ be the $3 \\times 3$ second-difference matrix and $R(x) = x^TKx/x^Tx$, with $\\lambda_{\\min} = 2 - \\sqrt2 \\approx 0.586$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Compute $R(x)$ for $x = (1, 1, 1)$ and compare it with $\\lambda_{\\min}$.`, answer: `$Kx = (1, 0, 1)$, so $x^TKx = 2$ and $R = \\tfrac23 \\approx 0.667$, above $\\lambda_{\\min}$.` },
                { prompt: `Compute $R(x)$ for $x = (1, 1.4, 1)$ and compare it with $\\lambda_{\\min}$.`, answer: `$Kx = (0.6, 0.8, 0.6)$, so $x^TKx = 2.32$ and $x^Tx = 3.96$, giving $R \\approx 0.5859$, within $10^{-4}$ of $\\lambda_{\\min}$. The closer the trial vector is to $(1, \\sqrt2, 1)$, the closer $R$ is to $\\lambda_{\\min}$.` },
                { prompt: `Prove that $R(x) \\ge \\lambda_{\\min}$ for all $x \\ne 0$ by expanding $x$ in the eigenvector basis.`, answer: `With orthonormal eigenvectors $q_i$, write $x = \\sum c_iq_i$. Then $x^TKx = \\sum\\lambda_ic_i^2$ and $x^Tx = \\sum c_i^2$, so $R(x) = \\dfrac{\\sum\\lambda_ic_i^2}{\\sum c_i^2} \\ge \\lambda_{\\min}$, a weighted average of the eigenvalues.` },
              ],
            },
            {
              slug: 'inertia-tensor',
              title: 'Principal axes of a rigid body',
              prompt: `Point masses of $1$ kg sit at $(1, 0, 0)$, $(0, 1, 0)$, $(0, 0, 1)$ and $(1, 1, 0)$ m.`,
              kind: 'problem',
              difficulty: 3,
              parts: [
                { prompt: `Compute the inertia tensor $I_{jk} = \\sum m(|r|^2\\delta_{jk} - r_jr_k)$ by hand.`, answer: `$I_{xx} = \\sum(y^2 + z^2) = 3$, $I_{yy} = \\sum(x^2 + z^2) = 3$, $I_{zz} = \\sum(x^2 + y^2) = 4$ and $I_{xy} = -\\sum xy = -1$, the other products being $0$: $I = \\begin{pmatrix} 3 & -1 & 0\\\\ -1 & 3 & 0\\\\ 0 & 0 & 4 \\end{pmatrix}$ kg m$^2$.` },
                { prompt: `Find its principal moments and axes with numpy.linalg.eigh.`, answer: `The principal moments are $2, 4, 4$ kg m$^2$. The moment $2$ is about the axis $(1, 1, 0)/\\sqrt2$. The moment $4$ is repeated, with eigenspace spanned by $(1, -1, 0)/\\sqrt2$ and $(0, 0, 1)$, so any orthonormal pair in that plane is a valid choice of axes, and eigh may return a different pair.` },
                { prompt: `Check that the axes are orthonormal.`, answer: `With V the matrix of eigenvectors from eigh, V.T @ V equals the identity to rounding error, as the spectral theorem promises for a symmetric matrix.` },
              ],
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
          quiz: [
            {
              question: `What are the eigenvalues and orthonormal eigenvectors of $\\begin{pmatrix} 3 & 4\\\\ 4 & -3 \\end{pmatrix}$?`,
              options: [`$3$ and $-3$, with eigenvectors $(1, 0)$ and $(0, 1)$`, `$5$ and $-5$, with eigenvectors $(1, 2)/\\sqrt5$ and $(2, -1)/\\sqrt5$`, `$5$ and $-5$, with eigenvectors $(2, 1)/\\sqrt5$ and $(1, -2)/\\sqrt5$`, `$5$ and $-5$, with eigenvectors $(2, 1)/\\sqrt5$ and $(1, 2)/\\sqrt5$`],
              answer: 2,
              explanation: `The trace is $0$ and the determinant $-25$, so $\\lambda = \\pm5$. Check: $A(2, 1) = (10, 5) = 5(2, 1)$ and $A(1, -2) = (-5, 10) = -5(1, -2)$. $(1, 2)$ is not an eigenvector ($A(1, 2) = (11, -2)$), and $(2, 1)$ and $(1, 2)$ are not orthogonal, which eigenvectors of a symmetric matrix for different eigenvalues must be. The diagonal entries are not eigenvalues of a non-diagonal matrix.`,
            },
            {
              question: `$A$ is symmetric with eigenvalues $1$, $4$ and $9$. Which values can the Rayleigh quotient $x^TAx/x^Tx$ take for $x \\ne 0$?`,
              options: [`Only $1$, $4$ and $9$`, `Every value in $[1, 9]$`, `Every value in $[1, 81]$`, `Any real number, since $x$ is arbitrary`],
              answer: 1,
              explanation: `In the eigenvector basis the quotient is $\\sum\\lambda_ic_i^2/\\sum c_i^2$, a weighted average of $1$, $4$ and $9$ with nonnegative weights. It equals each eigenvalue at its eigenvector and moves continuously between them, so it covers $[1, 9]$ and nothing outside. It reaches eigenvalues only at eigenvectors, and squares of eigenvalues belong to $\\|Ax\\|^2/\\|x\\|^2$, not to this quotient.`,
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

\`\`\`interactive
matrix-transform
{"title": "Circle to ellipse: A = UΣVᵀ", "A": [[3, 0], [4, 5]], "x": [1, 0], "view": 7.5, "mode": "svd", "modes": ["svd", "eigen", "transform"], "presets": ["shear", "rotation", "singular"], "bracket": "p", "caption": "The dashed unit circle maps to the cyan ellipse. The dashed v₁ ∝ (1, 1) and v₂ ∝ (1, −1) land on the semi-axes σ₁u₁ and σ₂u₂, of lengths 3√5 ≈ 6.71 and √5 ≈ 2.24, with u₁ ∝ (1, 3) and u₂ ∝ (3, −1). Move x round the circle (drag it or use the angle slider): |Ax| never leaves the range from σ₂ to σ₁. The readouts confirm σ₁σ₂ = |det A| = 15 and κ = 3, and that the eigenvalues 5 and 3 are different numbers. Drag a column to make A nearly singular and watch σ₂ and the ellipse collapse."}
\`\`\`

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
              prompt: `Find the SVD of $A = \\begin{pmatrix} 2 & 2\\\\ 1 & 1 \\end{pmatrix}$ by hand.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find the singular values.`, answer: `$A^TA = \\begin{pmatrix} 5 & 5\\\\ 5 & 5 \\end{pmatrix}$ has eigenvalues $10$ and $0$, so $\\sigma_1 = \\sqrt{10}$ and $\\sigma_2 = 0$.` },
                { prompt: `Find $v_1$ and $u_1$.`, answer: `$v_1 = (1, 1)/\\sqrt2$, the eigenvector of $A^TA$ for $10$, and $u_1 = Av_1/\\sigma_1 = (4, 2)/(\\sqrt2\\sqrt{10}) = (2, 1)/\\sqrt5$.` },
                { prompt: `Choose $v_2$ and $u_2$ completing orthonormal bases.`, answer: `$v_2 = (1, -1)/\\sqrt2$ and $u_2 = (1, -2)/\\sqrt5$, either up to sign. Since $\\sigma_2 = 0$, $u_2$ is not fixed by $A$; it only has to be orthogonal to $u_1$.` },
                { prompt: `Write $A = \\sigma_1u_1v_1^T$.`, answer: `$\\sqrt{10}\\cdot\\dfrac{(2, 1)}{\\sqrt5}\\cdot\\dfrac{(1, 1)^T}{\\sqrt2} = \\begin{pmatrix} 2\\\\ 1 \\end{pmatrix}\\begin{pmatrix} 1 & 1 \\end{pmatrix} = A$.` },
                { prompt: `Identify the four fundamental subspaces from the singular vectors.`, answer: `$C(A)$ is spanned by $u_1$, $N(A^T)$ by $u_2$, $C(A^T)$ by $v_1$ and $N(A)$ by $v_2$.` },
              ],
            },
            {
              slug: 'two-norm-is-sigma-one',
              title: 'The 2-norm is the largest singular value',
              prompt: `Let $A = U\\Sigma V^T$ with singular values $\\sigma_1 \\ge \\cdots \\ge \\sigma_n$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $\\max_{\\|x\\| = 1}\\|Ax\\|_2 = \\sigma_1$ by writing $x = Vy$ and computing $\\|Ax\\|^2 = \\sum \\sigma_i^2y_i^2$.`, answer: `$V$ is orthogonal, so $\\|y\\| = \\|x\\| = 1$. Then $\\|Ax\\| = \\|U\\Sigma y\\| = \\|\\Sigma y\\|$, and $\\|\\Sigma y\\|^2 = \\sum\\sigma_i^2y_i^2 \\le \\sigma_1^2\\sum y_i^2 = \\sigma_1^2$, with equality at $y = e_1$, that is $x = v_1$.` },
                { prompt: `Deduce that for invertible $A$, $\\|A^{-1}\\|_2 = 1/\\sigma_n$ and $\\kappa(A) = \\sigma_1/\\sigma_n$.`, answer: `$A^{-1} = V\\Sigma^{-1}U^T$ is an SVD with singular values $1/\\sigma_i$, the largest being $1/\\sigma_n$. So $\\kappa(A) = \\|A\\|_2\\|A^{-1}\\|_2 = \\sigma_1/\\sigma_n$.` },
                { prompt: `Compute $\\kappa$ for $\\begin{pmatrix} 1 & 1\\\\ 1 & 1.0001 \\end{pmatrix}$ and explain what it says about solving $Ax = b$.`, answer: `$\\sigma_1 \\approx 2.00005$ and $\\sigma_2 \\approx 5.0 \\times 10^{-5}$, so $\\kappa \\approx 4 \\times 10^4$. A relative error in $b$ can grow by that factor in $x$, so you lose about $4$ to $5$ of the $16$ digits. Geometrically the two equations are nearly parallel lines.` },
              ],
            },
            {
              slug: 'principal-stretches',
              title: 'Principal stretches of a simple shear',
              prompt: `A simple shear has deformation gradient $F = \\begin{pmatrix} 1 & 0.5\\\\ 0 & 1 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Compute the principal stretches (singular values of $F$) by hand from $F^TF$.`, answer: `$F^TF = \\begin{pmatrix} 1 & 0.5\\\\ 0.5 & 1.25 \\end{pmatrix}$ with trace $2.25$ and determinant $1$, so its eigenvalues are $(9 \\pm \\sqrt{17})/8 \\approx 1.640, 0.610$. The stretches are their square roots, about $1.281$ and $0.781$.` },
                { prompt: `Find the material directions that are stretched most and least.`, answer: `The eigenvectors of $F^TF$: most stretched along about $(0.615, 0.788)$, roughly $52^\\circ$ from the $x$-axis; least along the perpendicular direction, about $(-0.788, 0.615)$.` },
                { prompt: `Check that the product of the stretches is $\\det F = 1$.`, answer: `$1.2808 \\times 0.7808 \\approx 1.000$; exactly, the product is $\\sqrt{\\det(F^TF)} = \\sqrt1 = |\\det F|$. Shear preserves area.` },
              ],
            },
            {
              slug: 'low-rank-image',
              title: 'Low-rank approximation of an image',
              prompt: `Load any greyscale image as a matrix $X$ and compute its SVD with numpy.linalg.svd.`,
              kind: 'coding',
              difficulty: 2,
              parts: [
                { prompt: `Reconstruct rank-$k$ approximations for $k = 1, 5, 20, 50$.`, answer: `With U, s, Vt = np.linalg.svd(X, full_matrices=False), the rank-$k$ image is (U[:, :k] * s[:k]) @ Vt[:k]. You should see $k = 1$ as a blur of horizontal and vertical bands, and the image becoming recognisable somewhere around $k = 20$ to $50$.` },
                { prompt: `Plot the singular values on a log scale.`, answer: `Expect a steep drop over the first few values followed by a long, slowly decaying tail; the steepness shows how compressible the image is.` },
                { prompt: `Report the relative 2-norm error for each $k$, and confirm that it equals $\\sigma_{k+1}/\\sigma_1$.`, answer: `np.linalg.norm(X - Xk, 2) / np.linalg.norm(X, 2) should match s[k] / s[0] (zero-based indexing) to rounding error. This is the Eckart-Young theorem: the truncated SVD is the best rank-$k$ approximation, and its 2-norm error is the first singular value it drops.` },
              ],
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
          quiz: [
            {
              question: `What are the singular values of $A = \\begin{pmatrix} 3 & 0\\\\ 4 & 5 \\end{pmatrix}$?`,
              options: [`$3$ and $5$`, `$3\\sqrt5$ and $\\sqrt5$`, `$45$ and $5$`, `$5$ and $5$, the lengths of the columns`],
              answer: 1,
              explanation: `$A^TA = \\begin{pmatrix} 25 & 20\\\\ 20 & 25 \\end{pmatrix}$ has eigenvalues $45$ and $5$, and the singular values are their square roots, $3\\sqrt5 \\approx 6.71$ and $\\sqrt5 \\approx 2.24$. Check: $\\sigma_1\\sigma_2 = 15 = |\\det A|$. $3$ and $5$ are the eigenvalues of $A$, which differ from the singular values for a non-symmetric matrix, and $45$ and $5$ forget the square root.`,
            },
            {
              question: `For a square matrix that is not symmetric, how are its singular values related to its eigenvalues?`,
              options: [`They are the absolute values of the eigenvalues`, `They are the same numbers`, `They are the square roots of the eigenvalues of $A^TA$ and usually differ from $|\\lambda|$, though both products equal $|\\det A|$`, `They are the diagonal entries of $A$`],
              answer: 2,
              explanation: `Singular values come from $A^TA$, eigenvalues from $A$ itself. For $\\begin{pmatrix} 3 & 0\\\\ 4 & 5 \\end{pmatrix}$ the eigenvalues are $3, 5$ and the singular values $6.71, 2.24$. They agree up to sign only for symmetric (more generally normal) matrices. What always matches is the product: $\\prod\\sigma_i = |\\det A| = \\prod|\\lambda_i|$.`,
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

\`\`\`interactive
matrix-transform
{"title": "The two-stage population settling", "A": [[0.6, 0.8], [0.2, 0.6]], "name": "T", "vec": "u", "x": [10, 0], "view": 11, "mode": "powers", "modes": ["powers"], "k": 0, "kMax": 12, "rescale": false, "presets": [], "bracket": "p", "caption": "Slide k: u₁ = (6, 2), and the points march in a straight line, parallel to the eigenvector (2, −1) of λ = 0.2, towards (5, 2.5) on the eigenline of λ = 1, closing the gap by a factor of 5 each year. The readout shows the split u₀ = 2.5(2, 1) + 2.5(2, −1). Drag the start u₀ anywhere: the limit is always a point of the λ = 1 line, a 2:1 ratio. Then raise the 0.8 offspring rate slightly and the population grows instead (spectral radius above 1); tick Rescale to follow its direction."}
\`\`\`

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
              prompt: `For the population matrix $T$ of the worked example, start from $u_0 = (0, 9)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Expand $u_0$ in the eigenvectors.`, answer: `$(0, 9) = 4.5(2, 1) - 4.5(2, -1)$.` },
                { prompt: `Write $u_k$ in closed form and give the limit.`, answer: `$u_k = 4.5(2, 1) - 4.5(0.2)^k(2, -1)$, which tends to $(9, 4.5)$: the same 2:1 ratio as before, at a level set by the start.` },
                { prompt: `Compute $u_1$ and $u_2$ directly and from your formula.`, answer: `Directly, $u_1 = T(0, 9) = (7.2, 5.4)$ and $u_2 = T(7.2, 5.4) = (8.64, 4.68)$. The formula gives $(9, 4.5) - 0.9(2, -1) = (7.2, 5.4)$ and $(9, 4.5) - 0.18(2, -1) = (8.64, 4.68)$.` },
              ],
            },
            {
              slug: 'jacobi-rate',
              title: 'How fast does Jacobi converge?',
              prompt: `Let $K = \\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 2 \\end{pmatrix}$ and apply the Jacobi iteration to $Ku = f$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the Jacobi iteration matrix $B = I - D^{-1}K$ and its eigenvalues.`, answer: `$D = 2I$, so $B = \\tfrac12\\begin{pmatrix} 0 & 1 & 0\\\\ 1 & 0 & 1\\\\ 0 & 1 & 0 \\end{pmatrix}$, with eigenvalues $0$ and $\\pm\\sqrt2/2 \\approx \\pm0.707$.` },
                { prompt: `Estimate how many iterations reduce the error by a factor of $10^6$.`, answer: `The error shrinks by $\\rho(B) = \\sqrt2/2$ per step, so you need $k$ with $(\\sqrt2/2)^k = 10^{-6}$: $k = \\ln(10^{-6})/\\ln(0.707) \\approx 40$ iterations.` },
                { prompt: `Run Jacobi in Python from $u_0 = 0$ with $f = (1, 1, 1)$ and confirm the observed rate.`, answer: `The iterates approach $u = (\\tfrac32, 2, \\tfrac32)$. The error halves every two steps (a factor $0.707$ per step), and it drops below $10^{-6}$ of the solution's size after about $40$ iterations.` },
              ],
            },
            {
              slug: 'stability-proof',
              title: 'Stability and the spectral radius',
              prompt: `Relate the long-run behaviour of $u_{k+1} = Tu_k$ to the spectral radius $\\rho(T)$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Prove that if $T$ is diagonalisable and $\\rho(T) < 1$, then $T^ku_0 \\to 0$ for every $u_0$.`, answer: `Write $u_0 = \\sum c_ix_i$ in eigenvectors. Then $T^ku_0 = \\sum c_i\\lambda_i^kx_i$, and $|\\lambda_i^k| \\le \\rho^k \\to 0$ for each term, so the finite sum tends to $0$.` },
                { prompt: `Prove that if $\\rho(T) > 1$ there is a $u_0$ with $\\|T^ku_0\\| \\to \\infty$.`, answer: `Take $u_0 = x$, an eigenvector with $|\\lambda| = \\rho > 1$. Then $\\|T^kx\\| = |\\lambda|^k\\|x\\| \\to \\infty$. (If $\\lambda$ is complex, the real or imaginary part of $x$ works as a real start.)` },
                { prompt: `Show by computing powers of $\\begin{pmatrix} 0.5 & 10\\\\ 0 & 0.5 \\end{pmatrix}$ that $\\|T^k\\|_2$ rises to about $10$ and stays above $1$ for several steps before it decays, even though $\\rho < 1$.`, answer: `$T^k = \\begin{pmatrix} 0.5^k & 20k\\,0.5^k\\\\ 0 & 0.5^k \\end{pmatrix}$. The norms for $k = 1, 2, \\dots, 8$ are about $10.0, 10.0, 7.5, 5.0, 3.1, 1.9, 1.09, 0.63$, so the norm first drops below $1$ at $k = 8$ and then decays like $k\\,0.5^k$. The matrix is defective, so the eigenvalues only control the eventual rate.` },
              ],
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
          quiz: [
            {
              question: `The iteration $u_{k+1} = Tu_k$ has $T = \\begin{pmatrix} 0.5 & 0.2\\\\ 0.3 & 0.4 \\end{pmatrix}$. About how many steps reduce a typical error by a factor of $1000$?`,
              options: [`About $5$`, `About $10$`, `About $3$`, `About $20$`],
              answer: 3,
              explanation: `The trace is $0.9$ and the determinant $0.14$, so $\\lambda = 0.7$ and $0.2$, and $\\rho(T) = 0.7$. The slowest component shrinks by $0.7$ per step, and $0.7^k = 10^{-3}$ needs $k = \\ln 1000/\\ln(1/0.7) \\approx 19.4$. Using the smaller eigenvalue $0.2$ gives about $5$, which only describes the fast component, and using the largest entry $0.5$ gives about $10$.`,
            },
            {
              question: `Which condition makes the discrete system $u_{k+1} = Tu_k$ asymptotically stable?`,
              options: [`Every eigenvalue of $T$ satisfies $|\\lambda| < 1$`, `Every eigenvalue of $T$ has negative real part`, `Every entry of $T$ is less than $1$ in absolute value`, `$|\\det T| < 1$`],
              answer: 0,
              explanation: `Solutions are combinations of $\\lambda^kx$, which decay exactly when $|\\lambda| < 1$. Negative real parts is the test for $u' = Au$, where solutions are $e^{\\lambda t}x$; for powers, $\\lambda = -2$ explodes. Small entries are not enough ($\\begin{pmatrix} 0.9 & 0.9\\\\ 0.9 & 0.9 \\end{pmatrix}$ has $\\lambda = 1.8$), and a small determinant can hide one large eigenvalue.`,
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

\`\`\`interactive
markov-chain
{"title": "Bikes between two stations", "P": [[0.9, 0.2], [0.1, 0.8]], "states": ["A", "B"], "x0": [1, 0], "vec": "p", "kMax": 25, "caption": "Step from p₀ = (1, 0): p₁ = (0.9, 0.1), and the bars close in on the dashed steady state (2/3, 1/3). On the log plot the distance falls by exactly λ₂ = 0.7 per step, so after 10 days the gap in each entry is about 0.009 (the plot shows the sum of both). Drag the start to any split of the fleet: the limit never changes. Then move both top-row entries (0.9 and 0.2) towards 0.5: λ₂ = trace − 1 shrinks and the chain mixes faster."}
\`\`\`

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
              prompt: `Bikes move between three stations with column-stochastic matrix $P = \\begin{pmatrix} 0.8 & 0.1 & 0.2\\\\ 0.1 & 0.7 & 0.3\\\\ 0.1 & 0.2 & 0.5 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Find the steady state exactly by elimination on $P - I$.`, answer: `The null space of $P - I$ is spanned by $(\\tfrac95, \\tfrac85, 1)$, that is $(9, 8, 5)$. Scaling to sum $1$: $q = (\\tfrac{9}{22}, \\tfrac{8}{22}, \\tfrac{5}{22}) \\approx (0.409, 0.364, 0.227)$.` },
                { prompt: `Find the other two eigenvalues from the trace and determinant (or the characteristic polynomial).`, answer: `They sum to $\\operatorname{tr}P - 1 = 1$, and their product is $\\det P = 0.22$. So $\\lambda^2 - \\lambda + 0.22 = 0$ and $\\lambda = 0.5 \\pm \\sqrt3/10 \\approx 0.673, 0.327$.` },
                { prompt: `Estimate how many days it takes for any start to be within $0.01$ of the steady state in each component.`, answer: `The error decays roughly like $0.673^k$. Computing powers, every column of $P^k$ is within $0.01$ of $q$ from $k = 11$ on (at $k = 10$ the worst entry is still off by about $0.011$). So about $11$ days.` },
              ],
            },
            {
              slug: 'eigenvalue-bounds',
              title: 'Eigenvalues of stochastic matrices',
              prompt: `Let $P$ be column-stochastic: nonnegative entries, each column summing to $1$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $1$ is an eigenvalue of $P$. (Use $\\mathbf{1}^TP = \\mathbf{1}^T$.)`, answer: `$\\mathbf{1}^TP = \\mathbf{1}^T$ says $P^T\\mathbf{1} = \\mathbf{1}$, so $1$ is an eigenvalue of $P^T$. A matrix and its transpose have the same characteristic polynomial, so $1$ is an eigenvalue of $P$.` },
                { prompt: `Prove that all its eigenvalues satisfy $|\\lambda| \\le 1$. (Take an eigenvector of $P^T$ and look at its largest entry in absolute value.)`, answer: `Let $P^Ty = \\lambda y$ and $|y_i|$ be the largest entry. Row $i$ gives $\\lambda y_i = \\sum_j p_{ji}y_j$, so $|\\lambda||y_i| \\le \\sum_j p_{ji}|y_j| \\le |y_i|\\sum_j p_{ji} = |y_i|$. Hence $|\\lambda| \\le 1$, and $P$ has the same eigenvalues as $P^T$.` },
              ],
            },
            {
              slug: 'non-regular-chains',
              title: 'When convergence fails',
              prompt: `Consider $P_1 = \\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}$ and $P_2 = \\begin{pmatrix} 1 & 0.5 & 0\\\\ 0 & 0 & 0\\\\ 0 & 0.5 & 1 \\end{pmatrix}$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `For $P_1$, find the eigenvalues, all steady states, and $\\lim P_1^k p_0$ when it exists.`, answer: `Eigenvalues $1$ and $-1$. The only steady state is $(\\tfrac12, \\tfrac12)$. $P_1$ swaps the two entries, so $P_1^kp_0$ alternates between $p_0$ and its swap; the limit exists only when $p_0 = (\\tfrac12, \\tfrac12)$. The eigenvalue $-1$ has size $1$, so it never dies out.` },
                { prompt: `For $P_2$, find the eigenvalues, all steady states, and $\\lim P_2^k p_0$.`, answer: `Eigenvalues $1, 1, 0$. Every $(a, 0, 1 - a)$ with $0 \\le a \\le 1$ is a steady state. After one step, $p_0 = (p_1, p_2, p_3)$ becomes $(p_1 + \\tfrac12p_2,\\ 0,\\ p_3 + \\tfrac12p_2)$ and stays there, so that is the limit.` },
                { prompt: `Interpret $P_2$ as a walk with two absorbing ends.`, answer: `States 1 and 3 are absorbing: once there, you stay. From the middle state you step to either end with probability $\\tfrac12$. The limit depends on the start because there are two absorbing states, so the steady state is not unique.` },
              ],
            },
            {
              slug: 'simulate-a-chain',
              title: 'Simulate and compare',
              prompt: `Use the three-station chain from the first exercise.`,
              kind: 'simulation',
              difficulty: 1,
              parts: [
                { prompt: `Simulate $10^5$ steps for a single bike with numpy.random and compare the fraction of time spent at each station with the steady state.`, answer: `At each step draw the next station from the current column of $P$, for example with rng.choice(3, p=P[:, s]). The fractions should come out near $(0.409, 0.364, 0.227)$; one run gave $(0.408, 0.367, 0.225)$. Differences of a few thousandths are expected because successive steps are correlated.` },
                { prompt: `Compute $P^{50}$ and comment on its columns.`, answer: `numpy.linalg.matrix_power(P, 50) has all three columns equal to $q \\approx (0.40909, 0.36364, 0.22727)$ to many digits: wherever a bike starts, after $50$ days the distribution has forgotten it, because $0.673^{50} \\approx 3 \\times 10^{-9}$.` },
              ],
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
          quiz: [
            {
              question: `A two-state chain has column-stochastic matrix $P = \\begin{pmatrix} 0.7 & 0.4\\\\ 0.3 & 0.6 \\end{pmatrix}$. What is its steady state?`,
              options: [`$(\\tfrac47, \\tfrac37)$`, `$(\\tfrac37, \\tfrac47)$`, `$(\\tfrac12, \\tfrac12)$`, `$(0.7, 0.3)$`],
              answer: 0,
              explanation: `$Pq = q$ gives $0.7q_1 + 0.4q_2 = q_1$, so $0.3q_1 = 0.4q_2$ and $q \\propto (4, 3)$; normalising gives $(\\tfrac47, \\tfrac37)$. Check: $0.7 \\cdot \\tfrac47 + 0.4 \\cdot \\tfrac37 = \\tfrac{4}{7}$. Balancing the flows the wrong way round gives the swapped vector, and the first column is just where state 1 goes in one step.`,
            },
            {
              question: `A regular column-stochastic matrix has eigenvalues $1$, $0.9$ and $0.2$. Which statement is true?`,
              options: [`The distance to the steady state eventually shrinks by a factor of about $0.2$ per step`, `It shrinks by a factor of about $0.9$ per step, so convergence is slow`, `$P^k$ does not converge, because $0.9$ is close to $1$`, `The steady state is the eigenvector for $0.9$`],
              answer: 1,
              explanation: `$P^kp_0 = q + c_2(0.9)^kx_2 + c_3(0.2)^kx_3$. The $0.2$ part vanishes quickly, but the $0.9$ part survives longest and sets the rate: about $22$ steps per factor of $10$. Any $|\\lambda| < 1$ still dies out, so $P^k$ converges. The steady state is always the eigenvector for $\\lambda = 1$.`,
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
              prompt: `Solve $u' = \\begin{pmatrix} 1 & 2\\\\ 2 & 1 \\end{pmatrix}u$ with $u(0) = (1, 0)$.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Find $u(t)$.`, answer: `$\\lambda = 3$ with $(1, 1)$ and $\\lambda = -1$ with $(1, -1)$. Since $(1, 0) = \\tfrac12(1, 1) + \\tfrac12(1, -1)$, $u(t) = \\tfrac12e^{3t}(1, 1) + \\tfrac12e^{-t}(1, -1)$.` },
                { prompt: `Classify the origin and sketch the phase portrait with the two eigen-directions.`, answer: `Real eigenvalues of opposite signs: a saddle. Trajectories come in along the line through $(1, -1)$ and leave along the line through $(1, 1)$; all others are hyperbola-like curves that bend from the first direction to the second.` },
                { prompt: `Find all initial conditions for which $u(t) \\to 0$.`, answer: `Only starts with no $(1, 1)$ component, that is, starts on the line through $(1, -1)$ (where $u_1 + u_2 = 0$). Every other start grows like $e^{3t}$.` },
              ],
            },
            {
              slug: 'damped-oscillator-system',
              title: 'A damped oscillator as a system',
              prompt: `Solve $x'' + 2x' + 5x = 0$, $x(0) = 1$, $x'(0) = 0$ as a first-order system.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write it as $u' = Au$ and find the complex eigenvalues of $A$.`, answer: `With $u = (x, x')$, $A = \\begin{pmatrix} 0 & 1\\\\ -5 & -2 \\end{pmatrix}$. Then $\\lambda^2 + 2\\lambda + 5 = 0$, so $\\lambda = -1 \\pm 2i$, with eigenvectors $(1, \\lambda)$.` },
                { prompt: `Show $x(t) = e^{-t}(\\cos 2t + \\tfrac12\\sin 2t)$.`, answer: `Write $u = c(1, \\lambda)e^{\\lambda t} + \\bar c(1, \\bar\\lambda)e^{\\bar\\lambda t}$ with $\\lambda = -1 + 2i$. The initial conditions give $2\\operatorname{Re}c = 1$ and $2\\operatorname{Re}(c\\lambda) = 0$, so $c = \\tfrac12 - \\tfrac14i$. Then $x = 2\\operatorname{Re}\\big(c\\,e^{-t}(\\cos2t + i\\sin2t)\\big) = e^{-t}(\\cos2t + \\tfrac12\\sin2t)$.` },
                { prompt: `Check it by substitution.`, answer: `$x(0) = 1$ and $x'(0) = -1 + \\tfrac12 \\cdot 2 = 0$. Differentiating twice gives $x' = -\\tfrac52e^{-t}\\sin2t$ and $x'' = e^{-t}(\\tfrac52\\sin2t - 5\\cos2t)$, so $x'' + 2x' + 5x = e^{-t}\\big(\\tfrac52\\sin2t - 5\\cos2t - 5\\sin2t + 5\\cos2t + \\tfrac52\\sin2t\\big) = 0$.` },
              ],
            },
            {
              slug: 'rlc-circuit',
              title: 'An RLC circuit',
              prompt: `A series RLC circuit with charge $q$ and current $i = q'$ satisfies $Li' + Ri + q/C = 0$. Take $L = 1$ H and $C = 0.25$ F.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Write it as a first-order system in $(q, i)$.`, answer: `$\\begin{pmatrix} q\\\\ i \\end{pmatrix}' = \\begin{pmatrix} 0 & 1\\\\ -1/(LC) & -R/L \\end{pmatrix}\\begin{pmatrix} q\\\\ i \\end{pmatrix} = \\begin{pmatrix} 0 & 1\\\\ -4 & -R \\end{pmatrix}\\begin{pmatrix} q\\\\ i \\end{pmatrix}$.` },
                { prompt: `Find the eigenvalues for $R = 2\\ \\Omega$.`, answer: `$\\lambda^2 + 2\\lambda + 4 = 0$, so $\\lambda = -1 \\pm i\\sqrt3$.` },
                { prompt: `Find the value of $R$ at which the circuit is critically damped.`, answer: `The discriminant $R^2 - 16$ vanishes at $R = 4\\ \\Omega$, which is $2\\sqrt{L/C}$.` },
                { prompt: `Classify the phase portrait for $R$ below and above that value.`, answer: `For $0 < R < 4\\ \\Omega$: complex eigenvalues with negative real part, a stable spiral (underdamped ringing). For $R > 4\\ \\Omega$: two negative real eigenvalues, a stable node (overdamped, no oscillation).` },
              ],
            },
            {
              slug: 'trace-determinant-proof',
              title: 'Stability from trace and determinant',
              prompt: `Prove that a real $2 \\times 2$ system $u' = Au$ is asymptotically stable if and only if $\\operatorname{tr}A < 0$ and $\\det A > 0$.`,
              kind: 'derivation',
              difficulty: 3,
              parts: [
                { prompt: `Treat the case of real eigenvalues.`, answer: `Stability means $\\lambda_1, \\lambda_2 < 0$. If both are negative, their sum $\\operatorname{tr}A$ is negative and their product $\\det A$ is positive. Conversely, $\\det A > 0$ means they have the same sign, and $\\operatorname{tr}A < 0$ makes that sign negative.` },
                { prompt: `Treat the case of complex eigenvalues.`, answer: `$\\lambda = a \\pm bi$ with $b \\ne 0$. Then $\\det A = a^2 + b^2 > 0$ automatically and $\\operatorname{tr}A = 2a$, so stability ($a < 0$) is equivalent to $\\operatorname{tr}A < 0$, and both conditions hold.` },
                { prompt: `Show by example that "$\\operatorname{tr}A < 0$" alone is not enough.`, answer: `$A = \\operatorname{diag}(1, -3)$ has trace $-2$ but determinant $-3$: eigenvalues of opposite signs, a saddle, and $e^{t}$ grows.` },
              ],
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
          quiz: [
            {
              question: `Written as $u' = Au$ with $u = (x, x')$, the equation $x'' + 5x' + 6x = 0$ has $A = \\begin{pmatrix} 0 & 1\\\\ -6 & -5 \\end{pmatrix}$. What are the eigenvalues and the type of the origin?`,
              options: [`$\\lambda = 2$ and $3$: an unstable node`, `$\\lambda = -5$ and $-6$: a stable node`, `$\\lambda = -2$ and $-3$: a stable node, decaying without oscillation`, `$\\lambda = -\\tfrac52 \\pm \\tfrac12i$: a stable spiral`],
              answer: 2,
              explanation: `$\\det(A - \\lambda I) = \\lambda^2 + 5\\lambda + 6 = (\\lambda + 2)(\\lambda + 3)$. Two negative real eigenvalues give a stable node: the solutions are combinations of $e^{-2t}$ and $e^{-3t}$, with no oscillation. Getting $2$ and $3$ drops the signs; the discriminant is $25 - 24 = 1 > 0$, so the roots are real, not complex; and $-5$, $-6$ are entries of $A$, not eigenvalues.`,
            },
            {
              question: `A real $2 \\times 2$ matrix has $\\operatorname{tr}A = -1$ and $\\det A = -2$. What is the origin for $u' = Au$?`,
              options: [`Stable, because the trace is negative`, `A stable spiral`, `A centre, neutrally stable`, `Unstable: a negative determinant means real eigenvalues of opposite signs, a saddle`],
              answer: 3,
              explanation: `The eigenvalues solve $\\lambda^2 + \\lambda - 2 = 0$: $\\lambda = 1$ and $-2$. Their product $\\det A$ is negative, so they have opposite signs, and the $e^t$ mode grows: a saddle. A negative trace is necessary for stability but not sufficient; you also need $\\det A > 0$.`,
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
              prompt: `Let $A = \\begin{pmatrix} -2 & 1\\\\ 1 & -2 \\end{pmatrix}$, the two-room matrix.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Compute $e^{At}$ by diagonalisation.`, answer: `$\\lambda = -1$ with $(1, 1)$ and $\\lambda = -3$ with $(1, -1)$, so $e^{At} = Se^{\\Lambda t}S^{-1} = \\tfrac12\\begin{pmatrix} e^{-t} + e^{-3t} & e^{-t} - e^{-3t}\\\\ e^{-t} - e^{-3t} & e^{-t} + e^{-3t} \\end{pmatrix}$.` },
                { prompt: `Use it to re-derive the two-room solution from the previous lesson.`, answer: `$u(t) = e^{At}(1, 0)$ is the first column: $\\tfrac12(e^{-t} + e^{-3t},\\ e^{-t} - e^{-3t}) = \\tfrac12e^{-t}(1, 1) + \\tfrac12e^{-3t}(1, -1)$, as before.` },
                { prompt: `Check $\\det e^{At} = e^{t\\operatorname{tr}A}$.`, answer: `$\\det e^{At} = \\tfrac14\\big[(e^{-t} + e^{-3t})^2 - (e^{-t} - e^{-3t})^2\\big] = e^{-4t}$, and $\\operatorname{tr}A = -4$.` },
                { prompt: `Check your matrix against scipy.linalg.expm at $t = 0.5$.`, answer: `Both give approximately [[0.41483, 0.19170], [0.19170, 0.41483]].` },
              ],
            },
            {
              slug: 'jordan-exponential',
              title: 'A Jordan block',
              prompt: `Let $A = \\begin{pmatrix} 2 & 1\\\\ 0 & 2 \\end{pmatrix}$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Show directly from the series that $e^{At} = e^{2t}\\begin{pmatrix} 1 & t\\\\ 0 & 1 \\end{pmatrix}$, by writing $A = 2I + N$.`, answer: `$N = \\begin{pmatrix} 0 & 1\\\\ 0 & 0 \\end{pmatrix}$ has $N^2 = 0$, so its series stops: $e^{Nt} = I + Nt$. Since $2I$ commutes with $N$, $e^{At} = e^{2It}e^{Nt} = e^{2t}(I + Nt)$.` },
                { prompt: `Verify that $\\frac{d}{dt}e^{At} = Ae^{At}$ by differentiating your answer.`, answer: `$\\dfrac{d}{dt}\\Big[e^{2t}\\begin{pmatrix} 1 & t\\\\ 0 & 1 \\end{pmatrix}\\Big] = e^{2t}\\begin{pmatrix} 2 & 2t + 1\\\\ 0 & 2 \\end{pmatrix}$, and $Ae^{At} = e^{2t}\\begin{pmatrix} 2 & 1\\\\ 0 & 2 \\end{pmatrix}\\begin{pmatrix} 1 & t\\\\ 0 & 1 \\end{pmatrix} = e^{2t}\\begin{pmatrix} 2 & 2t + 1\\\\ 0 & 2 \\end{pmatrix}$.` },
              ],
            },
            {
              slug: 'non-commuting',
              title: 'When exponentials do not multiply',
              prompt: `Let $A = \\begin{pmatrix} 0 & 1\\\\ 0 & 0 \\end{pmatrix}$ and $B = \\begin{pmatrix} 0 & 0\\\\ 1 & 0 \\end{pmatrix}$.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Compute $e^A$, $e^B$ and $e^Ae^B$ exactly.`, answer: `$A^2 = B^2 = 0$, so $e^A = I + A = \\begin{pmatrix} 1 & 1\\\\ 0 & 1 \\end{pmatrix}$ and $e^B = \\begin{pmatrix} 1 & 0\\\\ 1 & 1 \\end{pmatrix}$, giving $e^Ae^B = \\begin{pmatrix} 2 & 1\\\\ 1 & 1 \\end{pmatrix}$.` },
                { prompt: `Compute $e^{A+B}$ exactly and show $e^Ae^B \\ne e^{A+B}$.`, answer: `$A + B = \\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}$ squares to $I$, so the series splits into even and odd terms: $e^{A+B} = \\cosh1\\,I + \\sinh1\\,(A + B) = \\begin{pmatrix} \\cosh 1 & \\sinh 1\\\\ \\sinh 1 & \\cosh 1 \\end{pmatrix} \\approx \\begin{pmatrix} 1.543 & 1.175\\\\ 1.175 & 1.543 \\end{pmatrix}$, not $e^Ae^B$. Here $AB \\ne BA$.` },
                { prompt: `Prove $e^{A+B} = e^Ae^B$ when $AB = BA$, by multiplying the series.`, answer: `$e^Ae^B = \\sum_j\\sum_k \\dfrac{A^jB^k}{j!\\,k!}$. Group the terms with $j + k = n$: $\\dfrac{1}{n!}\\sum_{j}\\binom{n}{j}A^jB^{n-j}$. When $A$ and $B$ commute, the binomial theorem says this is $(A + B)^n/n!$, so the sum is $e^{A+B}$. Without commuting, $(A + B)^2 = A^2 + AB + BA + B^2 \\ne A^2 + 2AB + B^2$.` },
              ],
            },
            {
              slug: 'forced-system',
              title: 'A forced system',
              prompt: `Consider $u' = Au + b$ with constant $b$ and invertible $A$.`,
              kind: 'coding',
              difficulty: 3,
              parts: [
                { prompt: `Derive $u(t) = e^{At}(u_0 + A^{-1}b) - A^{-1}b$.`, answer: `The equilibrium $u^* = -A^{-1}b$ satisfies $Au^* + b = 0$. Then $w = u - u^*$ solves $w' = Aw$, so $w = e^{At}w(0)$ and $u = e^{At}(u_0 + A^{-1}b) - A^{-1}b$.` },
                { prompt: `For the two-room matrix with $b = (1, 0)$ (a heater in room 1) and $u_0 = (0, 1)$, find the long-run temperatures.`, answer: `$A^{-1} = -\\tfrac13\\begin{pmatrix} 2 & 1\\\\ 1 & 2 \\end{pmatrix}$, so $u^* = -A^{-1}b = (\\tfrac23, \\tfrac13)$. Both eigenvalues are negative, so $e^{At} \\to 0$ and $u(t) \\to (\\tfrac23, \\tfrac13)$.` },
                { prompt: `Check the formula against scipy.integrate.solve_ivp at $t = 0.7$.`, answer: `The formula with scipy.linalg.expm gives about $(0.58503, 0.41497)$ at $t = 0.7$, and solve_ivp with tight tolerances agrees to many digits.` },
              ],
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
          quiz: [
            {
              question: `What is $e^{Nt}$ for $N = \\begin{pmatrix} 0 & 3\\\\ 0 & 0 \\end{pmatrix}$?`,
              options: [`$\\begin{pmatrix} 1 & e^{3t}\\\\ 1 & 1 \\end{pmatrix}$`, `$\\begin{pmatrix} 1 & 3t\\\\ 0 & 1 \\end{pmatrix}$`, `$\\begin{pmatrix} e^{t} & 3te^{t}\\\\ 0 & e^{t} \\end{pmatrix}$`, `$I$, since every eigenvalue of $N$ is $0$`],
              answer: 1,
              explanation: `$N^2 = 0$, so the series stops after two terms: $e^{Nt} = I + Nt$. Exponentiating entry by entry is not the matrix exponential (it even turns the zeros into ones), and the third option is $e^{(I + N)t}$, which has eigenvalue $1$. Zero eigenvalues make $\\det e^{Nt} = 1$, but $e^{Nt}$ is not $I$ because $N$ is not $0$.`,
            },
            {
              question: `When is $e^{A+B} = e^Ae^B$ guaranteed for square matrices $A$ and $B$?`,
              options: [`When $AB = BA$`, `Always, just as for numbers`, `When $A$ and $B$ are both invertible`, `When $A$ and $B$ are both symmetric`],
              answer: 0,
              explanation: `Multiplying the series and collecting terms of degree $n$ gives $(A + B)^n$ only if you can reorder $A$s and $B$s, which needs $AB = BA$. It fails in general: $A = \\begin{pmatrix} 0 & 1\\\\ 0 & 0 \\end{pmatrix}$ and its transpose give different answers. Symmetric matrices need not commute ($\\operatorname{diag}(1, 0)$ and $\\begin{pmatrix} 0 & 1\\\\ 1 & 0 \\end{pmatrix}$ do not), and invertibility is irrelevant.`,
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

\`\`\`interactive
normal-modes
{"title": "Two masses, three springs", "m": [1, 1], "k": [1, 1, 1], "u0": [1, 0], "tMax": 40, "caption": "With m = k = 1, ω₁ = 1 with v₁ = (1, 1) and ω₂ = √3 ≈ 1.732 with v₂ = (1, −1). Press Play: pulling m₁ alone splits into a₁ = a₂ = ½, and the motion never repeats because √3 is irrational. Press Start in mode 1 or mode 2: the masses move exactly in step (or exactly opposite) at a single frequency. Then lower the middle spring to about 0.1 and pull m₁ only: the frequencies come close and the swing passes slowly from m₁ to m₂ and back, the beats of the text."}
\`\`\`

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
              prompt: `Three equal masses $m$ between two walls are joined by four equal springs $k$, so $M = mI$ and $K = k$ times the $3 \\times 3$ second-difference matrix.`,
              kind: 'problem',
              difficulty: 1,
              parts: [
                { prompt: `Using the eigenvalues of the $3 \\times 3$ second-difference matrix, give the three natural frequencies and mode shapes.`, answer: `$\\omega^2 = (2 - \\sqrt2)k/m$, $2k/m$ and $(2 + \\sqrt2)k/m$, so $\\omega \\approx 0.765\\sqrt{k/m}$, $1.414\\sqrt{k/m}$ and $1.848\\sqrt{k/m}$, with modes $(1, \\sqrt2, 1)$, $(1, 0, -1)$ and $(1, -\\sqrt2, 1)$.` },
                { prompt: `Describe each mode in words.`, answer: `Lowest: all three masses move together, the middle one most. Middle: the outer masses move oppositely while the middle one stays still. Highest: neighbours move oppositely, the middle mass against the two outer ones.` },
                { prompt: `Check that the modes are mutually orthogonal.`, answer: `$(1, \\sqrt2, 1) \\cdot (1, 0, -1) = 0$, $(1, \\sqrt2, 1) \\cdot (1, -\\sqrt2, 1) = 1 - 2 + 1 = 0$ and $(1, 0, -1) \\cdot (1, -\\sqrt2, 1) = 0$, as for any symmetric $K$ with $M = mI$.` },
              ],
            },
            {
              slug: 'unequal-masses',
              title: 'Unequal masses',
              prompt: `In the two-mass example, let the first mass be $2m$ and the second $m$, with the same three springs $k$.`,
              kind: 'problem',
              difficulty: 2,
              parts: [
                { prompt: `Solve $\\det(K - \\omega^2M) = 0$ for $\\omega^2$.`, answer: `With $x = m\\omega^2/k$, $(2 - 2x)(2 - x) - 1 = 0$, that is $2x^2 - 6x + 3 = 0$, so $x = (3 \\pm \\sqrt3)/2 \\approx 0.634, 2.366$ and $\\omega^2 \\approx 0.634\\,k/m$ and $2.366\\,k/m$.` },
                { prompt: `Find both mode shapes.`, answer: `The first row gives $v_2 = (2 - 2x)v_1$. For $x = 0.634$: $v = (1, \\sqrt3 - 1) \\approx (1, 0.732)$, the masses moving together. For $x = 2.366$: $v = (1, -1 - \\sqrt3) \\approx (1, -2.732)$, moving oppositely with the light mass moving more.` },
                { prompt: `Check that they are $M$-orthogonal but not orthogonal in the ordinary sense.`, answer: `$v_1^TMv_2 = m\\big[2 + (\\sqrt3 - 1)(-1 - \\sqrt3)\\big] = m(2 - 2) = 0$, while $v_1^Tv_2 = 1 - 2 = -1 \\ne 0$.` },
              ],
            },
            {
              slug: 'linear-triatomic',
              title: 'A linear triatomic molecule',
              prompt: `Model a linear molecule such as CO$_2$ as masses $m$, $M$, $m$ in a line joined by two springs $k$, with both ends free.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Set up $K$ and $M$.`, answer: `$K = k\\begin{pmatrix} 1 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 1 \\end{pmatrix}$ (the free-free chain) and $M = \\operatorname{diag}(m, M, m)$.` },
                { prompt: `Show that the squared frequencies are $0$, $k/m$ and $(k/m)(1 + 2m/M)$.`, answer: `Check three vectors in $Kv = \\omega^2Mv$. $(1, 1, 1)$: $Kv = 0$, so $\\omega^2 = 0$. $(1, 0, -1)$: $Kv = k(1, 0, -1) = (k/m)Mv$. $(1, -2m/M, 1)$: $Kv = k(1 + 2m/M,\\ -2 - 4m/M,\\ 1 + 2m/M) = k(1 + 2m/M)(1, -2, 1)$ and $Mv = m(1, -2, 1)$, so $\\omega^2 = (k/m)(1 + 2m/M)$.` },
                { prompt: `Describe each mode.`, answer: `$\\omega = 0$: the whole molecule translates. $k/m$: symmetric stretch, the end atoms move oppositely and the centre atom stays still. $(k/m)(1 + 2m/M)$: asymmetric stretch, the end atoms move together and the centre atom moves the other way, keeping the centre of mass fixed.` },
                { prompt: `With $m = 16$ and $M = 12$ (atomic mass units), compute the ratio of the two nonzero frequencies.`, answer: `$\\sqrt{1 + 2m/M} = \\sqrt{1 + 32/12} = \\sqrt{11/3} \\approx 1.91$.` },
              ],
            },
            {
              slug: 'shear-building',
              title: 'Free vibration of a three-storey building',
              prompt: `Model a three-storey shear building as three floor masses $m$ with storey stiffnesses $k$ (the ground is fixed, the roof is free), with $m = 2 \\times 10^4$ kg and $k = 4 \\times 10^7$ N/m.`,
              kind: 'simulation',
              difficulty: 3,
              parts: [
                { prompt: `Write $M$ and $K$.`, answer: `$M = mI$ and $K = k\\begin{pmatrix} 2 & -1 & 0\\\\ -1 & 2 & -1\\\\ 0 & -1 & 1 \\end{pmatrix}$, with floors numbered from the ground up; the roof row has a single spring.` },
                { prompt: `Compute the natural frequencies and modes with numpy.linalg.eigh.`, answer: `$\\omega^2 \\approx 396, 3110, 6494$ s$^{-2}$, so $\\omega \\approx 19.9, 55.8, 80.6$ rad/s, or about $3.17, 8.88, 12.83$ Hz. Scaled to $1$ at the first floor, the modes are about $(1, 1.80, 2.25)$, $(1, 0.445, -0.802)$ and $(1, -1.247, 0.555)$.` },
                { prompt: `Simulate the free response to a $1$ cm roof displacement two ways, by modal superposition and by scipy.linalg.expm applied to the first-order system, and plot both.`, answer: `Modal: $u(t) = \\sum_i a_i\\cos(\\omega_it)\\,v_i$ with $a_i = v_i^TMu(0)/(v_i^TMv_i)$ and $u(0) = (0, 0, 0.01)$ m, released from rest. First-order: $z = (u, u')$, $z' = \\begin{pmatrix} 0 & I\\\\ -M^{-1}K & 0 \\end{pmatrix}z$, and $z(t) = e^{tA}z(0)$. The two curves should overlap to rounding error. At the roof, the first mode (period about $0.32$ s) supplies about half of the initial displacement, the second about a third and the third the rest, so the motion is visibly not a single sine wave.` },
              ],
            },
            {
              slug: 'm-orthogonality',
              title: 'Modes are M-orthogonal',
              prompt: `Let $Kv_i = \\omega_i^2Mv_i$ and $Kv_j = \\omega_j^2Mv_j$ with $\\omega_i \\ne \\omega_j$, and $K$, $M$ symmetric.`,
              kind: 'derivation',
              difficulty: 2,
              parts: [
                { prompt: `Prove that $v_i^TMv_j = 0$ and $v_i^TKv_j = 0$.`, answer: `Multiply the first equation by $v_j^T$ and the second by $v_i^T$: $v_j^TKv_i = \\omega_i^2v_j^TMv_i$ and $v_i^TKv_j = \\omega_j^2v_i^TMv_j$. By symmetry the left sides are equal, and so are $v_j^TMv_i = v_i^TMv_j$. Subtracting gives $(\\omega_i^2 - \\omega_j^2)v_i^TMv_j = 0$, so $v_i^TMv_j = 0$, and then $v_i^TKv_j = \\omega_j^2 \\cdot 0 = 0$.` },
                { prompt: `Use this to derive a formula for the modal coefficients $a_i$ from $u(0)$.`, answer: `Write $u(0) = \\sum_j a_jv_j$ and multiply by $v_i^TM$. Every term with $j \\ne i$ vanishes, leaving $v_i^TMu(0) = a_iv_i^TMv_i$, so $a_i = \\dfrac{v_i^TMu(0)}{v_i^TMv_i}$.` },
              ],
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
          quiz: [
            {
              question: `Two masses $m$ are joined by one spring $k$ and float freely, with no walls. What are the natural frequencies?`,
              options: [`$\\sqrt{k/m}$ and $\\sqrt{3k/m}$`, `$\\sqrt{k/m}$ only`, `$\\sqrt{k/m}$ and $\\sqrt{2k/m}$`, `$0$ and $\\sqrt{2k/m}$`],
              answer: 3,
              explanation: `$K = k\\begin{pmatrix} 1 & -1\\\\ -1 & 1 \\end{pmatrix}$ and $M = mI$, so $\\omega^2$ is an eigenvalue of $K/m$: $0$ for $(1, 1)$, a rigid translation, and $2k/m$ for $(1, -1)$, the masses moving oppositely. $\\sqrt{k/m}$ and $\\sqrt{3k/m}$ belong to the version with walls, and forgetting the zero-frequency mode is the usual slip with free-free systems.`,
            },
            {
              question: `For $Kv = \\omega^2Mv$ with symmetric $K$ and a diagonal $M$ that is not a multiple of $I$, which orthogonality do modes with different frequencies satisfy?`,
              options: [`$v_i^Tv_j = 0$`, `None: with unequal masses the modes are not orthogonal in any sense`, `$v_i^TMv_j = 0$, and also $v_i^TKv_j = 0$`, `$v_i^TM^{-1}v_j = 0$`],
              answer: 2,
              explanation: `Subtracting $v_j^TKv_i = \\omega_i^2v_j^TMv_i$ from $v_i^TKv_j = \\omega_j^2v_i^TMv_j$ leaves $(\\omega_i^2 - \\omega_j^2)v_i^TMv_j = 0$. The ordinary dot product is not zero in general: the $2m$, $m$ example has $v_1^Tv_2 = -1$. Ordinary orthogonality returns only when $M$ is a multiple of $I$.`,
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
