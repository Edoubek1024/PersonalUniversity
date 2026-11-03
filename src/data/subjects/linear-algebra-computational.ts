import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const mit1806: ResourceInput = {
  title: 'MIT 18.06SC Linear Algebra',
  url: 'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};
const ila: ResourceInput = {
  title: 'Interactive Linear Algebra',
  url: 'https://textbooks.math.gatech.edu/ila/',
  type: 'textbook',
  cost: 'free',
  provider: 'Margalit and Rabinoff, Georgia Tech',
};
const ula: ResourceInput = {
  title: 'Understanding Linear Algebra',
  url: 'https://understandinglinearalgebra.org/',
  type: 'textbook',
  cost: 'free',
  provider: 'David Austin',
};
const hefferon: ResourceInput = {
  title: 'Linear Algebra (Hefferon)',
  url: 'https://hefferon.net/linearalgebra/',
  type: 'textbook',
  cost: 'free',
  provider: 'Jim Hefferon',
};
const eola: ResourceInput = {
  title: 'Essence of Linear Algebra',
  url: 'https://www.3blue1brown.com/topics/linear-algebra',
  type: 'video',
  cost: 'free',
  provider: '3Blue1Brown',
};
const npLinalg: ResourceInput = {
  title: 'NumPy linear algebra reference',
  url: 'https://numpy.org/doc/stable/reference/routines.linalg.html',
  type: 'documentation',
  cost: 'free',
  provider: 'NumPy',
};
const spLinalg: ResourceInput = {
  title: 'SciPy linear algebra reference',
  url: 'https://docs.scipy.org/doc/scipy/reference/linalg.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SciPy',
};
const pnm: ResourceInput = {
  title: 'Python Programming and Numerical Methods',
  url: 'https://pythonnumericalmethods.studentorg.berkeley.edu/',
  type: 'textbook',
  cost: 'free',
  provider: 'UC Berkeley',
};
const fastNla: ResourceInput = {
  title: 'Computational Linear Algebra for Coders',
  url: 'https://github.com/fastai/numerical-linear-algebra',
  type: 'course',
  cost: 'free',
  provider: 'fast.ai',
};
const mit18065: ResourceInput = {
  title: 'MIT 18.065 Matrix Methods in Data Analysis, Signal Processing, and Machine Learning',
  url: 'https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};

const main = (r: ResourceInput, note: string): ResourceInput => ({ ...r, note, primary: true });
const also = (r: ResourceInput, note: string): ResourceInput => ({ ...r, note });

export default defineSubject({
  id: 'linear-algebra-computational',
  title: 'Linear Algebra with Computational Applications',
  category: 'math',
  tagline:
    'Vectors, matrices, eigenvalues and the SVD, learned by working each idea by hand and then making it run in Python and NumPy.',
  description: `This course follows the University of Illinois course MATH 257, Linear Algebra with Computational Applications, and is based on its public catalog description. The content here is original and is not affiliated with the University of Illinois.

Linear algebra is the mathematics that computers are best at, and most numerical work in science, engineering and machine learning reduces to it. So every idea appears twice here: first as mathematics you can do with a pencil on a small matrix, then as Python code that runs on a large one. You will solve systems by elimination and then see why a library factors the matrix instead. You will meet projections and then fit models to data, meet eigenvalues and then rank web pages, meet the singular value decomposition and then compress an image.

The course assumes Calculus I and basic programming: you can write functions, loops and conditionals in Python, or pick that up quickly. NumPy is introduced as it is needed. Definitions are precise and the key facts are justified, but the proof-based theory, including general fields and canonical forms, belongs to \`abstract-linear-algebra\`. \`linear-algebra-for-data-science\` is a separate, data-driven course, and this one goes further into the mathematics and the numerics.

Modules run from linear systems through vector spaces, transformations and determinants, orthogonality and least squares, and eigenvalues, to symmetric matrices and the SVD. Three module projects and a capstone turn the methods into working programs. Free resources support every lesson, but each lesson is written so that you can learn from the page.`,
  difficulty: 'intermediate',
  estimatedHours: 70,
  prerequisites: ['calculus-1'],
  recommendedBackground: [
    'Basic programming in Python: functions, loops, conditionals and lists',
    'Comfort with algebra and with reading summation notation',
  ],
  tags: ['linear algebra', 'NumPy', 'matrix factorisations', 'least squares', 'eigenvalues', 'SVD', 'numerical computing'],
  core: false,
  modules: [
    {
      slug: 'linear-systems',
      title: 'Linear Systems and Computing with Matrices',
      description:
        'Solve linear systems by elimination, learn the algebra of matrices, turn elimination into the LU factorisation, and see what floating point does to all of it.',
      lessons: [
        {
          slug: 'gaussian-elimination',
          title: 'Gaussian elimination and solution sets',
          summary:
            'Reduce a linear system to echelon form with row operations, then read off whether it has no solution, one solution or infinitely many.',
          estimatedMinutes: 120,
          objectives: [
            'Write a linear system as an augmented matrix and apply the three row operations',
            'Reduce a matrix to echelon and reduced echelon form and identify pivots',
            'Decide from the echelon form whether a system has zero, one or infinitely many solutions',
            'Describe an infinite solution set using free variables',
          ],
          concepts: [
            'Augmented matrix',
            'Elementary row operations',
            'Pivot and pivot column',
            'Row echelon and reduced row echelon form',
            'Free variable',
            'Consistent and inconsistent systems',
          ],
          explanation: `A linear system asks for numbers that satisfy several linear equations at once. **Gaussian elimination** replaces the system with a simpler one that has exactly the same solutions, using three **row operations**: add a multiple of one row to another, swap two rows, multiply a row by a non-zero number. Each operation can be undone, which is why the solution set never changes.

**Worked example.** Solve $x + 2y - z = 3$, $2x + 5y + z = 14$, $-x + y + 4z = 9$. Keep only the numbers, in an augmented matrix:

$$\\left[\\begin{array}{rrr|r} 1 & 2 & -1 & 3 \\\\ 2 & 5 & 1 & 14 \\\\ -1 & 1 & 4 & 9 \\end{array}\\right].$$

Use the first pivot, the 1 in the corner, to clear the column below it: $R_2 \\to R_2 - 2R_1$ gives $[0, 1, 3 \\mid 8]$, and $R_3 \\to R_3 + R_1$ gives $[0, 3, 3 \\mid 12]$. Now use the second pivot: $R_3 \\to R_3 - 3R_2$ gives $[0, 0, -6 \\mid -12]$. The matrix is in **echelon form**: each row's first non-zero entry, its **pivot**, sits to the right of the pivot above. Back substitution finishes the job. The last row gives $z = 2$, the second gives $y = 8 - 3(2) = 2$, and the first gives $x = 3 - 2(2) + 2 = 1$. Check by substituting $(1, 2, 2)$ into all three original equations.

Redo the example yourself in the interactive below. You choose each row operation and it does the arithmetic exactly, in fractions.

\`\`\`interactive
row-reduce
{"title": "Row-reduce the worked example", "A": [[1, 2, -1, 3], [2, 5, 1, 14], [-1, 1, 4, 9]], "vars": ["x", "y", "z"], "caption": "Apply R₂ → R₂ − 2R₁, R₃ → R₃ + R₁ and R₃ → R₃ − 3R₂ (the multiplier box fills itself with the value that clears the entry). The pivots are outlined, and once the matrix is in echelon form the solution (1, 2, 2) is read off by back substitution. Keep going to reduced echelon form, or press Next step to watch the standard order. Then use Edit matrix to enter the first system of the exercise below and see a free variable appear."}
\`\`\`

Echelon form tells you what kind of answer exists. A row $[0, \\dots, 0 \\mid c]$ with $c \\neq 0$ says $0 = c$, so the system is **inconsistent**. Otherwise it is consistent, and each column with no pivot gives a **free variable**. If reduction ends with $x_1 + 2x_2 = 3$ and $x_3 = 1$, then $x_2 = t$ is free and every solution is $(3 - 2t,\\ t,\\ 1)$. So a linear system has no solution, exactly one, or infinitely many. Two solutions and no others is impossible.

**Reduced** echelon form goes further: every pivot is 1 and is the only non-zero entry in its column. It is unique, but echelon form is not, so two people may reach different echelon forms and still be right. A common mistake is to change two rows at once using each other, such as $R_1 \\to R_1 - R_2$ and $R_2 \\to R_2 - R_1$ in one step. Do one operation at a time.

Work a few systems by hand from the resources. In Python, \`sympy.Matrix(A).rref()\` gives an exact answer to compare with yours.`,
          resources: [
            main(ila, 'The early chapter on systems of linear equations, with interactive row reduction.'),
            also(mit1806, 'The opening unit on elimination. Watch the recitation videos for extra worked systems.'),
            also(hefferon, 'A careful treatment of row reduction, with many answered exercises.'),
          ],
          exercises: [
            {
              slug: 'solve-two-systems',
              title: 'One change, a different kind of answer',
              prompt:
                'Solve $x - y + 2z = 5$, $3x + y + z = 8$, $2x + 2y - z = 3$ by hand. This system has a free variable, so give every solution in terms of $t = z$. Then change only the third equation to $2x + 2y + z = 9$ and solve again; this time the solution is unique. Check both answers by substitution.',
              kind: 'problem',
              difficulty: 1,
              hint: 'In the first system the three left-hand sides are dependent: row 3 is a combination of rows 1 and 2.',
            },
            {
              slug: 'classify-by-parameters',
              title: 'Classify a system by its parameters',
              prompt:
                'For $x + 2y = 3$ and $2x + ay = b$, find all pairs $(a, b)$ for which the system has (i) exactly one solution, (ii) no solution, (iii) infinitely many solutions. Give the solution in case (i) in terms of $a$ and $b$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'write-rref',
              title: 'Write your own rref',
              prompt:
                'Write a Python function `rref(A, tol=1e-12)` using NumPy that returns the reduced echelon form and the list of pivot columns, treating entries smaller than `tol` in size as zero. Test it on the matrix with rows $(1,2,1,0)$, $(2,4,0,2)$, $(1,2,3,-2)$. It should report pivots in columns 0 and 2 and produce rows $(1,2,0,1)$, $(0,0,1,-1)$, $(0,0,0,0)$. Compare with `sympy.Matrix(A).rref()` on five random integer matrices.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Keep two indices, one for the pivot row and one for the current column. A column with no usable pivot advances only the column index.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why do row operations not change the solution set?',
              answerOutline:
                'Any solution of the old system satisfies the new one, and each operation has an inverse row operation, so any solution of the new system also satisfies the old one.',
            },
            {
              question: 'How do you tell from echelon form that a system is inconsistent, and how do you count free variables?',
              answerOutline:
                'Inconsistent exactly when a row reads $[0, \\dots, 0 \\mid c]$ with $c \\neq 0$. If consistent, the number of free variables equals the number of variable columns without a pivot.',
            },
            {
              question: 'Can a linear system have exactly two solutions?',
              answerOutline:
                'No. If $x$ and $y$ are different solutions then $x + t(y - x)$ is a solution for every $t$, so there are infinitely many.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/linear-systems/gaussian-elimination'],
        },
        {
          slug: 'matrix-arithmetic',
          title: 'Matrix arithmetic and inverses',
          summary:
            'Read matrix-vector products as combinations of columns, multiply matrices, compute inverses, and write it all in NumPy.',
          estimatedMinutes: 120,
          objectives: [
            'Compute $Ax$ both as a combination of columns and by rows',
            'Multiply matrices and explain why order matters',
            'Find an inverse by Gauss-Jordan elimination and state when it exists',
            'Use the rules for transposes and inverses of products',
            'Write matrix operations in NumPy without confusing `@` and `*`',
          ],
          concepts: [
            'Linear combination of columns',
            'Matrix product as composition',
            'Non-commutativity',
            'Identity matrix',
            'Inverse and Gauss-Jordan elimination',
            'Transpose',
            'NumPy arrays and the @ operator',
          ],
          explanation: `The most useful way to read a matrix-vector product is by columns: $Ax$ is the combination of the columns of $A$ with weights taken from $x$. So $Ax = b$ asks whether $b$ can be built from the columns of $A$, and how.

The product $AB$ is defined so that $(AB)x = A(Bx)$: multiplying matrices composes the actions, with $B$ acting first. Each column of $AB$ is $A$ times the matching column of $B$. The product needs the number of columns of $A$ to equal the number of rows of $B$, and an $m \\times n$ matrix times an $n \\times p$ matrix is $m \\times p$. It is associative, but it is **not commutative**.

**Worked example.** Let
$$A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 1 \\end{bmatrix}, \\qquad B = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}.$$
Then $B$ swaps coordinates. Multiplying gives
$$AB = \\begin{bmatrix} 1 & 2 \\\\ 1 & 1 \\end{bmatrix}, \\qquad BA = \\begin{bmatrix} 1 & 1 \\\\ 2 & 1 \\end{bmatrix}.$$
So $AB$ swaps the columns of $A$ and $BA$ swaps its rows, and $AB \\neq BA$. To invert $A$, row reduce $[A \\mid I]$. Swap the rows to get $[1, 1 \\mid 0, 1]$ and $[2, 1 \\mid 1, 0]$. Then $R_2 \\to R_2 - 2R_1$ gives $[0, -1 \\mid 1, -2]$, negating gives $[0, 1 \\mid -1, 2]$, and $R_1 \\to R_1 - R_2$ gives $[1, 0 \\mid 1, -1]$. So
$$A^{-1} = \\begin{bmatrix} 1 & -1 \\\\ -1 & 2 \\end{bmatrix},$$
and multiplying confirms $AA^{-1} = I$.

\`\`\`interactive
row-reduce
{"mode": "inverse", "title": "Invert A by reducing [A | I]", "A": [[2, 1], [1, 1]], "caption": "Follow the worked example: swap R₁ and R₂, then R₂ → R₂ − 2R₁, scale R₂ by −1 and finally R₁ → R₁ − R₂. When the left block becomes I, the right block is A⁻¹ with rows (1, −1) and (−1, 2). Reset and press Next step instead: a different order of operations reaches the same inverse. Then edit A to a singular matrix such as rows (1, 2), (2, 4) and see elimination run out of pivots."}
\`\`\`

A square matrix $A$ is **invertible** exactly when elimination finds $n$ pivots, and then $Ax = b$ has the unique solution $x = A^{-1}b$. Non-square matrices have no two-sided inverse. Two rules reverse the order: $(AB)^{-1} = B^{-1}A^{-1}$, when both inverses exist, and $(AB)^T = B^T A^T$. Think of socks and shoes: you undo the last action first.

In NumPy, \`A @ B\` is the matrix product and \`A * B\` multiplies entry by entry, which silently gives a wrong answer for square matrices of the same shape. Also watch the cost of grouping: for $n \\times n$ matrices, \`A @ (B @ x)\` takes about $2n^2$ multiplications and \`(A @ B) @ x\` takes about $n^3$.`,
          resources: [
            main(ila, 'The chapters on matrix multiplication and matrix inverses.'),
            also(eola, 'The videos on linear transformations and matrix multiplication as composition.'),
            also(pnm, 'The NumPy introduction and the linear algebra chapter, for array syntax.'),
          ],
          exercises: [
            {
              slug: 'products-both-ways',
              title: 'Products in both orders',
              prompt:
                'Let $A$ have rows $(1, 0, 2)$ and $(0, 1, -1)$, and let $B$ have rows $(1, 2)$, $(0, 1)$, $(3, 0)$. Compute $AB$ and $BA$ by hand, state their shapes, and confirm that $\\operatorname{tr}(AB) = \\operatorname{tr}(BA) = 8$ even though the two products have different sizes. Check with NumPy.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'reverse-order-rules',
              title: 'Why the order reverses',
              prompt:
                'Prove from the definition of matrix multiplication that $(AB)^T = B^T A^T$. Then prove that if $A$ and $B$ are invertible $n \\times n$ matrices, $AB$ is invertible with inverse $B^{-1}A^{-1}$. Give a $2 \\times 2$ example showing that $(AB)^{-1} = A^{-1}B^{-1}$ can fail.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the transpose, compare the $(i,j)$ entry of each side using the sum $\\sum_k a_{ik} b_{kj}$.',
            },
            {
              slug: 'grouping-cost',
              title: 'Measure the cost of grouping',
              prompt:
                'For random $n \\times n$ arrays $A$, $B$ and a random vector $x$, time `(A @ B) @ x` against `A @ (B @ x)` for $n = 500, 1000, 2000$. Tabulate the times and the ratio. Confirm that both give the same vector up to rounding, then explain the growth of the ratio by counting multiplications ($n^3 + n^2$ against $2n^2$).',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Describe $Ax$ in words using the columns of $A$.',
              answerOutline: '$Ax$ is the linear combination $x_1 a_1 + \\dots + x_n a_n$ of the columns of $A$, weighted by the entries of $x$.',
            },
            {
              question: 'What goes wrong if you use `A * B` for square NumPy arrays when you meant a matrix product?',
              answerOutline:
                'It multiplies entry by entry. The shapes agree, so there is no error, and the result is silently wrong. Use `A @ B`.',
            },
            {
              question: 'State a test for whether a square matrix is invertible using elimination.',
              answerOutline:
                'It is invertible exactly when elimination, with row swaps allowed, produces $n$ pivots. Equivalently $Ax = 0$ has only the zero solution.',
            },
          ],
        },
        {
          slug: 'lu-factorisation',
          title: 'The LU factorisation',
          summary:
            'Record elimination as $A = LU$, so that one expensive factorisation makes every later solve cheap, and add pivoting for stability.',
          estimatedMinutes: 130,
          objectives: [
            'Compute an LU factorisation by hand from the elimination multipliers',
            'Solve $Ax = b$ by forward and back substitution',
            'Compare the cost of factoring with the cost of solving',
            'Explain why partial pivoting is needed and use `PA = LU`',
          ],
          concepts: [
            'Lower and upper triangular matrices',
            'Elimination multipliers',
            'Forward and back substitution',
            'Partial pivoting',
            'Permutation matrix',
            'Operation counts',
          ],
          explanation: `Elimination does its work on $A$ and only then touches $b$. So if you must solve $Ax = b$ for many right-hand sides, record the elimination once and reuse it. That record is the **LU factorisation**: $A = LU$, where $U$ is the echelon form and $L$ is lower triangular, with 1s on its diagonal and the elimination multipliers below.

**Worked example.** Take
$$A = \\begin{bmatrix} 2 & 1 & -1 \\\\ 4 & 5 & 0 \\\\ -2 & 2 & 6 \\end{bmatrix}.$$
The first pivot is 2. Subtract $2$ times row 1 from row 2, giving $(0, 3, 2)$, and subtract $-1$ times row 1 from row 3, giving $(0, 3, 5)$. The next pivot is 3. Subtract $1$ times the new row 2 from the new row 3, giving $(0, 0, 3)$. The multipliers $2, -1, 1$ fill in $L$:
$$L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 2 & 1 & 0 \\\\ -1 & 1 & 1 \\end{bmatrix}, \\qquad U = \\begin{bmatrix} 2 & 1 & -1 \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 3 \\end{bmatrix}.$$
Now solve $Ax = b$ for $b = (2, 9, 6)$ in two triangular steps. Forward substitution on $Ly = b$ gives $y_1 = 2$, $y_2 = 9 - 2(2) = 5$ and $y_3 = 6 + 2 - 5 = 3$. Back substitution on $Ux = y$ gives $x_3 = 1$, then $3x_2 + 2 = 5$ so $x_2 = 1$, then $2x_1 + 1 - 1 = 2$ so $x_1 = 1$.

\`\`\`interactive
row-reduce
{"mode": "lu", "title": "Build L from the multipliers", "A": [[2, 1, -1], [4, 5, 0], [-2, 2, 6]], "b": [2, 9, 6], "forward": "y", "caption": "Each elimination step subtracts ℓᵢⱼ times row j from row i, and ℓᵢⱼ drops into L at position (i, j). Clear column 1 with ℓ₂₁ = 2 and ℓ₃₁ = −1, then column 2 with ℓ₃₂ = 1, and compare L and U with the worked example. When U is triangular the widget solves Ly = b and Ux = y for b = (2, 9, 6). Edit the matrix to rows (0, 1, 1), (1, 1, 1), (1, 2, 3): the first pivot is zero, so swap rows first and P appears."}
\`\`\`

**Cost.** Factoring an $n \\times n$ matrix takes about $\\tfrac{2}{3}n^3$ floating-point operations, and each triangular solve takes about $n^2$. For $n = 1000$, factoring is several hundred times the cost of one solve, so reuse pays off quickly.

**Pivoting.** Not every invertible matrix has an LU factorisation without row swaps. A zero pivot stops the algorithm, and a tiny pivot is worse: it produces huge multipliers that swamp the other entries in floating point. **Partial pivoting** swaps rows so that the largest entry in the column, in absolute value, becomes the pivot. This gives $PA = LU$, with $P$ a permutation matrix, and it exists for every invertible $A$.

Library conventions differ, so read the documentation. \`scipy.linalg.lu(A)\` returns \`P, L, U\` with $A = PLU$, which puts $P$ on the other side from the textbook form. For repeated solves use \`lu_factor\` once and then \`lu_solve\` for each right-hand side. \`np.linalg.solve\` does a pivoted LU for you.`,
          resources: [
            main(mit1806, 'The session on factorisation into $A = LU$ and the one on permutations.'),
            also(spLinalg, 'See `lu`, `lu_factor`, `lu_solve` and `solve_triangular`, and note the permutation convention.'),
            also(ula, 'The section on LU factorisations, which is computational in spirit.'),
          ],
          exercises: [
            {
              slug: 'lu-by-hand',
              title: 'Factor and solve by hand',
              prompt:
                'Find $L$ and $U$ for the matrix with rows $(1, 2, 0)$, $(3, 7, 2)$, $(2, 6, 5)$. Multiply them to check. Then solve $Ax = b$ for $b = (3, 11, 13)$ by forward and back substitution; the answer is an integer vector.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'tiny-pivot',
              title: 'A tiny pivot destroys the answer',
              prompt:
                'Take $A$ with rows $(10^{-20}, 1)$ and $(1, 1)$, and $b = (1, 2)$. The true solution is very close to $(1, 1)$. Code elimination without pivoting in double precision and show that you get exactly $(0, 1)$. Explain which subtraction lost the information. Then swap the rows first and show that you recover $(1, 1)$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The multiplier is $10^{20}$, and $1 - 10^{20}$ rounds to $-10^{20}$.',
            },
            {
              slug: 'lu-scaling',
              title: 'Measure how LU scales',
              prompt:
                'Time `scipy.linalg.lu_factor` on random matrices with $n = 1000, 2000, 4000$, and time `lu_solve` for one right-hand side. Estimate the exponent in each cost by fitting the slope of $\\log(\\text{time})$ against $\\log n$. Expect values near 3 and 2, with some departure because of caches and threads. Then, for $n = 2000$, compare solving 100 right-hand sides with `np.linalg.solve` called 100 times against one `lu_factor` and 100 `lu_solve` calls.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What exactly is stored in $L$, and why does its diagonal contain 1s?',
              answerOutline:
                'Below the diagonal, $L$ stores the multipliers used in elimination. The 1s appear because each row keeps its own coefficient of 1 when you rebuild $A$ from $U$.',
            },
            {
              question: 'Why is it better to factor once than to call a full solve for each right-hand side?',
              answerOutline: 'Factoring costs about $\\tfrac23 n^3$ and each pair of triangular solves costs about $2n^2$, so repeating the factorisation wastes a factor of order $n$.',
            },
            {
              question: 'Give an invertible matrix with no LU factorisation unless rows are swapped.',
              answerOutline:
                'The matrix with rows $(0, 1)$ and $(1, 0)$. Its first pivot is zero, and if $A = LU$ then $u_{11} = 0$, which makes $A$ singular, a contradiction.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/linear-systems/lu-factorisation'],
        },
        {
          slug: 'floating-point-and-conditioning',
          title: 'Floating point and conditioning',
          summary:
            'Understand what a computer can represent, what the condition number says about lost accuracy, and why you solve instead of invert.',
          estimatedMinutes: 120,
          objectives: [
            'Explain machine epsilon and give examples of rounding in double precision',
            'Define the condition number and use it to estimate lost digits',
            'Distinguish a small residual from a small error',
            'Explain why `solve` is preferred to computing an inverse',
          ],
          concepts: [
            'Double precision',
            'Machine epsilon',
            'Rounding error',
            'Condition number',
            'Residual and error',
            'Ill-conditioned matrices',
          ],
          explanation: `Python floats are IEEE double-precision numbers, with 53 binary digits of precision. Most decimals have no exact binary form, so \`0.1 + 0.2\` prints \`0.30000000000000004\`. **Machine epsilon**, $\\varepsilon = 2^{-52} \\approx 2.2 \\times 10^{-16}$, is the gap between 1 and the next representable number, and each arithmetic operation is accurate to about that relative size. Never test floats with \`==\`. Use \`np.isclose\`.

\`\`\`interactive
bit-lab
{"title": "Inside a double", "mode": "float", "format": "binary64", "formats": ["binary64", "binary32"], "value": "0.1", "caption": "0.1 is stored as the nearest double, whose exact value is 0.1000000000000000055511151231257827…; the rounding error is under half an ulp. Type 0.2 and 0.3 and compare their errors: they do not cancel, which is why 0.1 + 0.2 misses 0.3. Press the preset 1 and then next ▶: the gap above 1 is 2^−52, machine epsilon. Type 1e16 and read the gap: 2, so adding 1 to 1e16 does nothing."}
\`\`\`

Rounding is usually harmless unless the problem itself is sensitive. The **condition number** measures that sensitivity. For an invertible matrix, $\\kappa(A) = \\|A\\|\\,\\|A^{-1}\\|$, and in the 2-norm it equals the largest singular value divided by the smallest. For $Ax = b$ with a change $\\delta b$ on the right,
$$\\frac{\\|\\delta x\\|}{\\|x\\|} \\le \\kappa(A)\\, \\frac{\\|\\delta b\\|}{\\|b\\|}.$$
As a rule of thumb, expect to lose about $\\log_{10}\\kappa(A)$ of your 16 decimal digits. Always $\\kappa(A) \\ge 1$. It is a property of the problem, so no algorithm can get around it.

**Worked example.** Let $A$ have rows $(1, 1)$ and $(1, 1.0001)$. For $b = (2, 2.0001)$ the solution is $x = (1, 1)$. Change the last entry slightly, to $b = (2, 2.0002)$, and the solution jumps to $x = (0, 2)$. To see why, subtract the rows: $0.0001\\,y = b_2 - b_1$, so a change in $b_2$ is multiplied by $10^4$ in $y$. Here $\\|\\delta b\\| / \\|b\\| \\approx 10^{-4}/2.83 = 3.5 \\times 10^{-5}$, while $\\|\\delta x\\| / \\|x\\| = \\sqrt{2}/\\sqrt{2} = 1$, an amplification of about 28,000. NumPy reports $\\kappa(A) \\approx 40{,}002$, so the bound holds with room to spare.

Two lessons follow. First, a small **residual** $\\|Ax - b\\|$ does not imply a small **error** $\\|x - x_{\\text{true}}\\|$. In the example, $x = (1, 1)$ has residual only $10^{-4}$ for the second system, yet it is far from the true $(0, 2)$. Pivoted LU gives a tiny residual almost always, and the error is then about $\\kappa(A)\\varepsilon$. Second, do not compute \`inv(A) @ b\`. It costs more than \`solve\`, and when $A$ is ill-conditioned but $x$ has moderate size, its residual can be many orders of magnitude larger. If you need $A^{-1}b$, you want the solution of a system, not the inverse as an object.`,
          resources: [
            main(fastNla, 'The early lessons on floating point, conditioning and why algorithms matter.'),
            also(
              {
                title: 'Floating-point arithmetic: issues and limitations',
                url: 'https://docs.python.org/3/tutorial/floatingpoint.html',
                type: 'documentation',
                cost: 'free',
                provider: 'Python Software Foundation',
              },
              'A short explanation of why decimal fractions do not round-trip.',
            ),
            also(npLinalg, 'See `cond`, `norm` and `solve`.'),
          ],
          exercises: [
            {
              slug: 'find-epsilon',
              title: 'Find machine epsilon',
              prompt:
                'Starting from `e = 1.0`, halve `e` while `1.0 + e/2 != 1.0`. Print the final `e` and confirm it equals `np.finfo(float).eps` and $2^{-52}$. Then show that $(1 + \\varepsilon/2) - 1$ evaluates to 0, and explain why $(x + 1) - x$ evaluates to 0 rather than 1 for $x = 10^{17}$.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'hilbert-experiment',
              title: 'Watch digits disappear',
              prompt:
                'The Hilbert matrix has entries $1/(i + j + 1)$ for $i, j$ from 0 (`scipy.linalg.hilbert`). For $n = 5, 10, 15$, set $x = (1, \\dots, 1)$ and $b = Hx$, and solve for $\\hat{x}$. Tabulate $\\kappa(H)$, the relative error $\\|\\hat{x} - x\\| / \\|x\\|$ and the residual $\\|H\\hat{x} - b\\|$. You should see $\\kappa(H_{10}) \\approx 1.6 \\times 10^{13}$, residuals near $10^{-15}$ throughout, and an error that grows until at $n = 15$ no correct digits remain. Explain the contrast between residual and error.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'solve-against-inverse',
              title: 'Solve against invert',
              prompt:
                'For $n = 1500$ with a random matrix $A$, pick a random vector $x_{\\text{true}}$ and set $b = Ax_{\\text{true}}$. Compare `np.linalg.solve(A, b)` with `np.linalg.inv(A) @ b` for time and for residual $\\|Ax - b\\|$. Repeat with a matrix of known bad conditioning: build $A = U\\,\\mathrm{diag}(s)\\,V^T$ from random orthogonal $U, V$ (via QR) and singular values $s$ running from 1 to $10^{-12}$ on a log scale. You should find `solve` faster, and its residual smaller by many orders of magnitude in the ill-conditioned case. Finally use a random $b$ with the same ill-conditioned $A$, and explain why the two residuals now come out about equal.',
              kind: 'coding',
              difficulty: 3,
              hint: 'A stable solve keeps the residual near $\\varepsilon\\|A\\|\\|x\\|$. A random $b$ makes $\\|x\\|$ huge for this $A$.',
            },
          ],
          selfAssessment: [
            {
              question: 'If $\\kappa(A) = 10^{10}$ and you solve in double precision, how many correct digits should you expect?',
              answerOutline: 'About 6: roughly 16 digits minus $\\log_{10}\\kappa = 10$.',
            },
            {
              question: 'Can a solution have a tiny residual and a large error? Why?',
              answerOutline:
                'Yes, when $A$ is ill-conditioned. The relation $x - x_{\\text{true}} = A^{-1}r$ shows that a small residual $r$ can be multiplied by the large norm of $A^{-1}$.',
            },
            {
              question: 'Does a better algorithm fix an ill-conditioned problem?',
              answerOutline:
                'No. Conditioning belongs to the problem. A stable algorithm avoids adding avoidable error, but it cannot recover information lost to the sensitivity of the problem. Reformulating the problem may help.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/linear-systems/conditioning'],
        },
      ],
      project: {
        slug: 'build-a-solver',
        title: 'Build and stress-test a linear solver',
        description: `Write a small dense linear solver in Python and find out how it behaves, rather than assuming it works. Implement LU factorisation with partial pivoting using NumPy array operations for the row updates, plus forward and back substitution. Compare your solver with \`scipy.linalg\` on accuracy and speed, then push it towards failure with ill-conditioned matrices. You will finish with a tested module you understand line by line and a short report on what limits accuracy in practice.`,
        deliverables: [
          'A module `solver.py` with `lu_factor(A)`, `lu_solve(factors, b)` and `solve(A, b)`, including a clear error for a singular matrix',
          'Tests that check $PA = LU$ to within $10^{-12}$ relative error on 100 random matrices, that a matrix needing a row swap works, and that a singular matrix raises the error',
          'A log-log timing plot for $n$ from 100 to 2000 against SciPy, with the fitted exponent',
          'A table of $\\kappa(A)$, relative error and residual for Hilbert matrices up to $n = 15$, for your solver and for SciPy',
          'A one-page write-up explaining what the plot and table show',
        ],
        estimatedHours: 6,
        stretchGoals: [
          'Add iterative refinement and measure how much accuracy it recovers for moderately ill-conditioned matrices',
          'Add a blocked version of the factorisation and compare its speed',
        ],
      },
    },
    {
      slug: 'vector-spaces',
      title: 'Vector Spaces and Subspaces',
      description:
        'Move from individual systems to structure: subspaces, independence, bases, dimension and the four subspaces attached to every matrix.',
      lessons: [
        {
          slug: 'subspaces-and-span',
          title: 'Subspaces and span',
          summary:
            'Identify subsets closed under linear combinations, and test by computer whether a vector lies in a span.',
          estimatedMinutes: 110,
          objectives: [
            'Test whether a subset of $\\mathbb{R}^n$ is a subspace',
            'Describe the span of a set of vectors',
            'Interpret the column space and null space of a matrix as subspaces',
            'Decide whether a vector lies in a span by elimination and by rank',
          ],
          concepts: [
            'Vector space',
            'Subspace test',
            'Linear combination',
            'Span',
            'Column space',
            'Null space',
          ],
          explanation: `A **vector space** is a collection of objects you can add and scale, following the usual rules. The examples here are $\\mathbb{R}^n$, but polynomials and matrices also qualify. A **subspace** is a subset that is itself a vector space. To check that a subset $S$ of $\\mathbb{R}^n$ is a subspace, you need only three things: $0 \\in S$; if $u, v \\in S$ then $u + v \\in S$; and if $u \\in S$ then $cu \\in S$ for every scalar $c$.

Geometrically, the subspaces of $\\mathbb{R}^3$ are the origin, lines through the origin, planes through the origin, and all of $\\mathbb{R}^3$. The phrase *through the origin* matters. The plane $x + y + z = 1$ misses 0, so it is not a subspace. The union of the $x$-axis and the $y$-axis contains 0 and is closed under scaling, but $(1, 0) + (0, 1)$ leaves it. The unit disc fails closure under scaling.

The **span** of $v_1, \\dots, v_k$ is the set of all their linear combinations, and it is always a subspace. Two matrix subspaces matter most. The **column space** $C(A)$ is the span of the columns, so it is exactly the set of $b$ for which $Ax = b$ can be solved. The **null space** $N(A)$ is the solution set of $Ax = 0$. It is a subspace because $A(u + v) = Au + Av = 0$ and $A(cu) = cAu = 0$. The solution set of $Ax = b$ with $b \\neq 0$ is not a subspace, since it does not contain 0.

**Worked example.** Let $v_1 = (1, 0, 1)$ and $v_2 = (1, 1, 2)$. Is $w = (3, 1, 4)$ in their span? Solve $c_1 v_1 + c_2 v_2 = w$. The second coordinate gives $c_2 = 1$. The first gives $c_1 + 1 = 3$, so $c_1 = 2$. The third must then agree: $2 + 2 = 4$, and it does. So $w = 2v_1 + v_2$. For $(3, 1, 5)$ the same values fail the third equation, and since the first two equations force $c_1$ and $c_2$, that vector is not in the span.

On a computer, compare ranks: $b$ lies in the column space of $A$ exactly when appending $b$ as an extra column leaves the rank unchanged.

\`\`\`python
A = np.array([[1, 1], [0, 1], [1, 2]])
b = np.array([3, 1, 5])
np.linalg.matrix_rank(np.c_[A, b])   # 3, but the rank of A is 2
\`\`\`

Rank is defined properly in the next lessons. For now, read it as the number of pivots.`,
          resources: [
            main(ila, 'The chapters on span and on subspaces, with interactive pictures in $\\mathbb{R}^3$.'),
            also(eola, 'The video on linear combinations, span and basis vectors.'),
            also(mit1806, 'The sessions on column space and null space.'),
          ],
          exercises: [
            {
              slug: 'subspace-or-not',
              title: 'Subspace or not',
              prompt:
                'For each subset of $\\mathbb{R}^3$, either prove it is a subspace or show which requirement fails: (a) $x_1 + 2x_2 - x_3 = 0$; (b) $x_1 x_2 = 0$; (c) $x_1 + x_2 = 1$; (d) all vectors $(t, 2t, 3t)$; (e) all vectors with $x_1 \\geq 0$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'membership-in-a-span',
              title: 'Membership in a span',
              prompt:
                'Let $v_1 = (1, 2, 0, 1)$ and $v_2 = (0, 1, 1, 1)$. Show by hand that $(2, 7, 3, 5)$ lies in their span and find the coefficients. Show that $(1, 1, 1, 1)$ does not. Then write a function `in_span(vectors, b)` using `matrix_rank` and test it on both.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'intersections-and-unions',
              title: 'Intersections and unions',
              prompt:
                'Prove that the intersection of two subspaces of $\\mathbb{R}^n$ is a subspace. Show by example that a union of two subspaces need not be. Then prove that the union of subspaces $U$ and $V$ is a subspace only if one contains the other.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the last part, suppose neither contains the other. Take $u \\in U \\setminus V$ and $v \\in V \\setminus U$, and ask where $u + v$ can live.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must every subspace contain the zero vector?',
              answerOutline: 'A subspace is non-empty and closed under scaling, so taking $c = 0$ gives $0$. Our test also requires it directly.',
            },
            {
              question: 'What does it mean, in terms of the column space, for $Ax = b$ to be solvable?',
              answerOutline: 'It is solvable exactly when $b \\in C(A)$, because $Ax$ runs over all combinations of the columns of $A$.',
            },
            {
              question: 'Is the solution set of $Ax = b$ a subspace when $b \\neq 0$?',
              answerOutline: 'No. It does not contain 0, since $A0 = 0 \\neq b$. It is a shifted copy of the null space, or it is empty.',
            },
          ],
        },
        {
          slug: 'independence-basis-dimension',
          title: 'Independence, basis and dimension',
          summary:
            'Remove redundancy from a spanning set, use a basis to give coordinates, and handle numerical rank carefully.',
          estimatedMinutes: 120,
          objectives: [
            'Test a set of vectors for linear independence',
            'Extract a basis from a spanning set using pivot columns',
            'Find the coordinates of a vector relative to a basis',
            'Explain why numerical rank depends on a tolerance',
          ],
          concepts: [
            'Linear independence',
            'Basis',
            'Dimension',
            'Coordinates',
            'Pivot columns',
            'Numerical rank',
          ],
          explanation: `Vectors $v_1, \\dots, v_k$ are **linearly independent** if the only solution of $c_1 v_1 + \\dots + c_k v_k = 0$ is all $c_i = 0$. Otherwise one of them is a combination of the others and adds nothing to the span. Put the vectors in the columns of $A$, and independence says that $Ax = 0$ has only the zero solution, or equivalently that every column has a pivot.

A **basis** of a subspace is an independent set that spans it. Every vector in the subspace is then a combination of basis vectors in exactly one way, and those weights are its **coordinates**. All bases of a subspace have the same size, and that size is its **dimension**. So $\\dim \\mathbb{R}^n = n$. Any $n$ independent vectors in $\\mathbb{R}^n$ form a basis, and any $n + 1$ vectors in $\\mathbb{R}^n$ are dependent.

**Worked example.** Let $v_1 = (1, 1, 0)$, $v_2 = (0, 1, 1)$, $v_3 = (1, 2, 1)$. Row reduce the matrix with these columns:
$$\\begin{bmatrix} 1 & 0 & 1 \\\\ 1 & 1 & 2 \\\\ 0 & 1 & 1 \\end{bmatrix} \\to \\begin{bmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 0 & 0 & 0 \\end{bmatrix}.$$
Columns 1 and 2 hold pivots, so $v_1, v_2$ form a basis of the span, whose dimension is 2. The third column of the reduced matrix reads off the relation $v_3 = v_1 + v_2$. Row operations preserve relations among the columns, but they change the column space, so take the basis vectors from the **original** matrix.

For coordinates, take the basis $b_1 = (1, 1)$, $b_2 = (1, -1)$ of $\\mathbb{R}^2$ and the vector $x = (5, 1)$. Solving $c_1 b_1 + c_2 b_2 = x$ gives $c_1 + c_2 = 5$ and $c_1 - c_2 = 1$, so $c = (3, 2)$. In NumPy, this is \`np.linalg.solve(B, x)\` with the basis vectors in the columns of \`B\`.

Rank is exact on paper and approximate on a computer. Floating-point data rarely has an exact zero pivot, so \`np.linalg.matrix_rank\` counts singular values above a tolerance. A matrix with rows $(1, 2)$ and $(2, 4 + 10^{-10})$ has rank 2 by the default tolerance, and rank 1 if you pass \`tol=1e-8\`. Neither answer is wrong. The question to ask is how large a perturbation you consider to be noise in your data.`,
          resources: [
            main(ila, 'The chapters on linear independence and on basis and dimension.'),
            also(hefferon, 'The chapter on vector spaces gives a fuller treatment, including non-numeric examples.'),
            also(npLinalg, 'See `matrix_rank` and its `tol` argument.'),
          ],
          exercises: [
            {
              slug: 'extract-a-basis',
              title: 'Extract a basis',
              prompt:
                'The columns of a matrix are $(1, 0, 1, 2)$, $(2, 1, 1, 3)$, $(0, 1, -1, -1)$, $(1, 1, 1, 1)$. Row reduce by hand, select a basis of the column space from the original columns, and write the dependent column as a combination of the basis columns. State the dimension of the column space.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'polynomial-coordinates',
              title: 'Coordinates for polynomials',
              prompt:
                'Show that $1$, $1 + t$, $(1 + t)^2$ is a basis of the space of polynomials of degree at most 2. Find the coordinates of $3 + 2t + t^2$ in this basis. Then set up the same question as a $3 \\times 3$ linear system and solve it with NumPy.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'n-plus-one-vectors',
              title: 'Too many vectors',
              prompt:
                'Prove that any $n + 1$ vectors in $\\mathbb{R}^n$ are linearly dependent, by putting them in the columns of a matrix and considering pivots. Then prove that if $v_1, \\dots, v_k$ are independent and $w$ is not in their span, then $v_1, \\dots, v_k, w$ are independent.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'rank-tolerance',
              title: 'When is rank a matter of opinion?',
              prompt:
                'Let $A$ have rows $(1, 2)$ and $(2, 4 + \\delta)$. For $\\delta = 10^{-4}, 10^{-8}, 10^{-12}, 10^{-16}, 10^{-17}$, print the singular values and `matrix_rank(A)` with the default tolerance. Explain each result. In particular, explain why the last two values of $\\delta$ give an exactly rank-1 matrix in double precision, and why the computed second singular value is still not exactly 0 for them.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Doubles near 4 are spaced about $8.9 \\times 10^{-16}$ apart, so test whether `4 + delta == 4.0`. The SVD itself has rounding error of order $\\varepsilon\\sigma_1$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must basis vectors for $C(A)$ come from the original matrix rather than its echelon form?',
              answerOutline:
                'Row operations keep the relations among columns but change the column space. The pivot positions tell you which original columns to take.',
            },
            {
              question: 'Why are coordinates relative to a basis unique?',
              answerOutline:
                'If two combinations gave the same vector, subtracting would give a non-trivial dependence among the basis vectors unless all the coefficients agreed.',
            },
            {
              question: 'How does `matrix_rank` decide rank, and what can change its answer?',
              answerOutline: 'It counts singular values above a tolerance. Changing the tolerance can change the rank for nearly singular matrices.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/linear-systems/basis-and-dimension'],
        },
        {
          slug: 'four-fundamental-subspaces',
          title: 'The four fundamental subspaces',
          summary:
            'Attach four subspaces to every matrix, compute their bases, and see how rank links their dimensions.',
          estimatedMinutes: 130,
          objectives: [
            'Compute bases for the column space, row space, null space and left null space',
            'State the rank-nullity relation and the dimensions of all four subspaces',
            'Use orthogonality between the subspaces to test solvability',
            'Write the complete solution of $Ax = b$ as a particular solution plus the null space',
          ],
          concepts: [
            'Rank',
            'Row space',
            'Left null space',
            'Rank-nullity theorem',
            'Orthogonal complements',
            'Particular solution',
          ],
          explanation: `Every $m \\times n$ matrix $A$ of rank $r$ carries four subspaces. The **column space** $C(A)$ and the **left null space** $N(A^T)$ live in $\\mathbb{R}^m$. The **row space** $C(A^T)$ and the **null space** $N(A)$ live in $\\mathbb{R}^n$. Their dimensions are
$$\\dim C(A) = \\dim C(A^T) = r, \\quad \\dim N(A) = n - r, \\quad \\dim N(A^T) = m - r.$$
The fact that the number of pivots plus the number of free variables equals $n$ is the **rank-nullity theorem**. The row space and null space are orthogonal, because $Ax = 0$ says each row is perpendicular to $x$. In the same way, $C(A)$ and $N(A^T)$ are orthogonal in $\\mathbb{R}^m$.

**Worked example.** Let
$$A = \\begin{bmatrix} 1 & 2 & 1 & 0 \\\\ 2 & 4 & 0 & 2 \\\\ 1 & 2 & 3 & -2 \\end{bmatrix} \\to R = \\begin{bmatrix} 1 & 2 & 0 & 1 \\\\ 0 & 0 & 1 & -1 \\\\ 0 & 0 & 0 & 0 \\end{bmatrix}.$$
Pivots sit in columns 1 and 3, so $r = 2$.

- **Column space:** the pivot columns of the original $A$, $(1, 2, 1)$ and $(1, 0, 3)$.
- **Row space:** the non-zero rows of $R$, $(1, 2, 0, 1)$ and $(0, 0, 1, -1)$.
- **Null space:** with $x_2 = s$ and $x_4 = t$ free, the rows of $R$ give $x_1 = -2s - t$ and $x_3 = t$. So a basis is $(-2, 1, 0, 0)$ and $(-1, 0, 1, 1)$.
- **Left null space:** dimension $3 - 2 = 1$. Solving $y \\cdot (1, 2, 1) = 0$ and $y \\cdot (1, 0, 3) = 0$ gives $y = (-3, 1, 1)$.

The dimensions check: $2 + 2 = 4$ and $2 + 1 = 3$. You can also verify that each null space basis vector is perpendicular to both row space vectors.

This picture answers the solvability question. $Ax = b$ has a solution exactly when $b$ is perpendicular to the left null space, here when $-3b_1 + b_2 + b_3 = 0$. For $b = (2, 2, 4)$ this holds, and a particular solution is $x_p = (1, 0, 1, 0)$. The **complete solution** is $x = x_p + s(-2, 1, 0, 0) + t(-1, 0, 1, 1)$. Every consistent system looks like this: one solution plus the null space.

\`\`\`interactive
row-reduce
{"title": "Reduce [A | b] and read off the complete solution", "A": [[1, 2, 1, 0, 2], [2, 4, 0, 2, 2], [1, 2, 3, -2, 4]], "caption": "Press Next step until the matrix reaches R. The pivots land in columns 1 and 3, the zero row confirms r = 2, and the solution set appears as x₁ = 1 − 2s − t, x₂ = s, x₃ = 1 + t, x₄ = t: the particular solution (1, 0, 1, 0) plus the two special solutions. Use Edit matrix to change b to (2, 2, 5), which breaks −3b₁ + b₂ + b₃ = 0, and watch a row 0 = c appear."}
\`\`\`

On a computer, \`scipy.linalg.null_space(A)\` and \`scipy.linalg.orth(A)\` return orthonormal bases computed from the SVD, which look different from your hand-computed ones but span the same subspaces.`,
          resources: [
            main(mit1806, 'The session on the four fundamental subspaces, with the problem-solving videos that follow it.'),
            also(spLinalg, 'See `null_space` and `orth`.'),
            also(ula, 'The sections on the null space and column space of a matrix.'),
          ],
          exercises: [
            {
              slug: 'all-four-subspaces',
              title: 'All four subspaces',
              prompt:
                'For the matrix with rows $(1, 0, 2)$, $(2, 1, 3)$, $(3, 1, 5)$, find bases of all four subspaces by hand. Verify the dimension formulas and the two orthogonality relations. Confirm with `scipy.linalg.null_space`: its output should be a scalar multiple of your null space vector.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'complete-solution',
              title: 'The complete solution',
              prompt:
                'For the matrix $A$ in the worked example, find the condition on $b$ for $Ax = b$ to be solvable and decide which of $(1, 1, 2)$, $(1, 3, 0)$ and $(0, 1, 2)$ qualify. For one that does, give the complete solution and check it in NumPy with three different values of $(s, t)$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'rank-of-ata',
              title: 'Why the transpose product keeps the rank',
              prompt:
                'Prove that $N(A^T A) = N(A)$ for every real matrix $A$, and deduce that $\\operatorname{rank}(A^T A) = \\operatorname{rank}(A)$. Show by example that this fails over the complex numbers if you use the plain transpose in place of the conjugate transpose.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'If $A^T A x = 0$, multiply on the left by $x^T$. For the example, try $A$ with a single column $(1, i)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Give the dimensions of all four subspaces for a $5 \\times 8$ matrix of rank 3.',
              answerOutline: 'Column space 3, row space 3, null space $8 - 3 = 5$, left null space $5 - 3 = 2$.',
            },
            {
              question: 'Why are the row space and null space orthogonal?',
              answerOutline: '$Ax = 0$ says the dot product of $x$ with every row is 0, so $x$ is perpendicular to every combination of rows.',
            },
            {
              question: 'Do row operations preserve the row space? The column space?',
              answerOutline: 'The row space and null space are preserved. The column space is generally changed, though its dimension is not.',
            },
          ],
        },
      ],
    },
    {
      slug: 'transformations-and-determinants',
      title: 'Linear Transformations and Determinants',
      description:
        'See matrices as maps, express the same map in different bases, and measure how a map scales volume.',
      lessons: [
        {
          slug: 'matrices-of-linear-maps',
          title: 'Matrices of linear maps',
          summary:
            'Build the matrix of any linear map from the images of the basis vectors, and compose maps by multiplying matrices.',
          estimatedMinutes: 110,
          objectives: [
            'Decide whether a map is linear',
            'Write the matrix of a linear map from the images of basis vectors',
            'Construct rotations, reflections, shears and projections in the plane',
            'Compose maps by matrix multiplication in the correct order',
          ],
          concepts: [
            'Linear map',
            'Standard basis',
            'Rotation, reflection, shear, projection',
            'Composition',
            'Kernel and image',
          ],
          explanation: `A map $T$ is **linear** if $T(u + v) = T(u) + T(v)$ and $T(cu) = cT(u)$ for all vectors and scalars. A quick way to rule out linearity is to compute $T(0)$, which must be 0. So a translation $x \\mapsto x + a$ with $a \\neq 0$ is not linear, and neither is any map involving $|x|$ or $x^2$.

Linearity makes a map remarkably cheap to describe. Every vector is $x = x_1 e_1 + \\dots + x_n e_n$, so $T(x) = x_1 T(e_1) + \\dots + x_n T(e_n)$. Once you know where the basis vectors go, you know everything. Therefore **the columns of the matrix of $T$ are the images of the basis vectors**.

This recipe builds the standard maps of the plane. Rotation by $\\theta$ anticlockwise sends $e_1$ to $(\\cos\\theta, \\sin\\theta)$ and $e_2$ to $(-\\sin\\theta, \\cos\\theta)$. A shear fixes $e_1$ and sends $e_2$ to $(k, 1)$. Projection onto the line through a unit vector $u$ has matrix $uu^T$. In the interactive below, drag the tips of $Ae_1$ and $Ae_2$ and watch the matrix entries and the whole grid follow.

\`\`\`interactive
matrix-transform
{"title": "The columns of A are the images of e₁ and e₂", "A": [[1, 1], [0, 1]], "x": [1.5, -1], "modes": ["transform"], "caption": "This starts as the shear that fixes e₁ and sends e₂ to (1, 1). Drag either column tip and the entries change with it, since column j of A is Aeⱼ. Drag the test vector x too: its image Ax (red) is always x₁ times the first column plus x₂ times the second. Try the presets, then type the matrices of the worked example, F with rows (0, 1), (1, 0), R with rows (0, −1), (1, 0) and RF with rows (−1, 0), (0, 1), and check each against the picture."}
\`\`\`

**Worked example.** Let $F$ reflect across the line $y = x$, and let $R$ rotate by $90^\\circ$ anticlockwise. Reading off images of $e_1$ and $e_2$ gives
$$F = \\begin{bmatrix} 0 & 1 \\\\ 1 & 0 \\end{bmatrix}, \\qquad R = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}.$$
Apply $F$ first and then $R$. The matrix is $RF$, because the map acting first sits on the right:
$$RF = \\begin{bmatrix} -1 & 0 \\\\ 0 & 1 \\end{bmatrix}.$$
That is reflection across the $y$-axis. Check it directly: $e_1 \\mapsto e_2 \\mapsto -e_1$, which matches the first column. In the other order, $FR$ has rows $(1, 0)$ and $(0, -1)$, reflection across the $x$-axis. The order changes the result.

Linear maps are not only about geometry. Differentiation on polynomials of degree at most 2, using the basis $1, t, t^2$, sends $1 \\mapsto 0$, $t \\mapsto 1$ and $t^2 \\mapsto 2t$. Its matrix has columns $(0, 0, 0)$, $(1, 0, 0)$, $(0, 2, 0)$. The **kernel** of a map is the null space of its matrix (here, the constants), and the **image** is the column space.

In code, keep your points in the columns of a $2 \\times N$ array \`P\`. Then \`A @ P\` transforms them all at once, which makes it easy to plot a shape before and after. Try this with the exercises below.`,
          resources: [
            main(eola, 'The videos on linear transformations, matrix composition and three-dimensional transformations.'),
            also(ila, 'The chapter on linear transformations and their matrices.'),
            also(hefferon, 'The chapter on maps between spaces, for examples beyond $\\mathbb{R}^n$.'),
          ],
          exercises: [
            {
              slug: 'linear-or-not',
              title: 'Linear or not',
              prompt:
                'For each map on $\\mathbb{R}^2$, prove it is linear and give its matrix, or show it is not: (a) $(x, y) \\mapsto (x - y, 2x)$; (b) $(x, y) \\mapsto (x + y, 1)$; (c) $(x, y) \\mapsto (|x|, y)$; (d) $(x, y) \\mapsto (y, 0)$; (e) $(x, y) \\mapsto (xy, 0)$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'build-plane-maps',
              title: 'Build the plane maps',
              prompt:
                'Find the matrix of (a) rotation by $30^\\circ$ anticlockwise; (b) projection onto the line $y = 2x$, which should come out as $\\tfrac15$ times the matrix with rows $(1, 2), (2, 4)$; (c) reflection across that same line. Check (b) by verifying $P^2 = P$, that $(1, 2)$ is fixed and that $(2, -1)$ goes to 0. Plot the unit square before and after each map and compare the area of the image with $|\\det|$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'A reflection across a line is $2P - I$, where $P$ is the projection onto that line.',
            },
            {
              slug: 'derivative-matrix',
              title: 'Differentiation as a matrix',
              prompt:
                'Write the matrix $D$ of $d/dt$ on polynomials of degree at most 3, in the basis $1, t, t^2, t^3$. Use it to differentiate $1 - 2t + 5t^3$, and check by hand that you get $-2 + 15t^2$. Show that $D^3 \\neq 0$ and $D^4 = 0$, and explain this in terms of polynomials. Find the rank of $D$, and describe its kernel and image.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the columns of the matrix of a linear map?',
              answerOutline: 'They are the images of the basis vectors, written in coordinates.',
            },
            {
              question: 'If $S$ is applied first and then $T$, what is the matrix of the combined map?',
              answerOutline: '$TS$, the rightmost matrix acting first, since $(TS)x = T(Sx)$.',
            },
            {
              question: 'Why is translation not linear, and how do graphics systems work around that?',
              answerOutline:
                'Translation moves 0, and linear maps fix 0. Graphics systems add an extra coordinate, so translation becomes a linear map one dimension up (homogeneous coordinates).',
            },
          ],
        },
        {
          slug: 'change-of-basis',
          title: 'Change of basis',
          summary:
            'Translate coordinates between bases, and see how a well-chosen basis makes a matrix simple.',
          estimatedMinutes: 120,
          objectives: [
            'Convert coordinates between a basis and the standard basis',
            'Compute the matrix of a linear map in a new basis using $P^{-1}AP$',
            'State what similar matrices have in common',
            'Recognise why a change of basis is the idea behind diagonalisation',
          ],
          concepts: [
            'Change-of-basis matrix',
            'Coordinates relative to a basis',
            'Similar matrices',
            'Trace',
            'Invariants of similarity',
          ],
          explanation: `A vector is a geometric object, and its coordinates depend on the basis you describe it in. Put a basis $b_1, \\dots, b_n$ in the columns of $P$. If $c$ is the coordinate vector of $x$ in this basis, then $x = c_1 b_1 + \\dots + c_n b_n = Pc$. So $P$ converts new coordinates into standard ones, and $P^{-1}$ converts back: $c = P^{-1}x$. The direction is easy to get wrong, so test it on $b_1$, whose new coordinates are $(1, 0, \\dots, 0)$.

A linear map also has different matrices in different bases. Suppose $T$ has matrix $A$ in the standard basis. To apply it to a vector given in new coordinates, convert to standard ($P$), apply $A$, and convert back ($P^{-1}$). The matrix of $T$ in the new basis is
$$A' = P^{-1} A P.$$
Matrices related like this are **similar**. They represent one map seen in two coordinate systems, so they share everything that does not depend on the choice of coordinates: determinant, trace, rank and eigenvalues.

**Worked example.** Let
$$A = \\begin{bmatrix} 3 & 1 \\\\ 1 & 3 \\end{bmatrix}, \\qquad b_1 = (1, 1), \\quad b_2 = (1, -1).$$
So $P$ has rows $(1, 1)$ and $(1, -1)$, and $P^{-1} = \\tfrac12 P$. Work out what $T$ does to the new basis: $Ab_1 = (4, 4) = 4b_1$, and $Ab_2 = (2, -2) = 2b_2$. The columns of $A'$ are the coordinates of these images in the new basis, so
$$A' = P^{-1}AP = \\begin{bmatrix} 4 & 0 \\\\ 0 & 2 \\end{bmatrix}.$$
In the standard basis, $A$ mixes coordinates. In this basis, $T$ just stretches by 4 along $(1, 1)$ and by 2 along $(1, -1)$. The trace (6) and determinant (8) are the same for both matrices, as they must be.

\`\`\`interactive
matrix-transform
{"title": "One vector, two coordinate systems", "A": [[3, 1], [1, 3]], "B": [[1, 1], [1, -1]], "x": [2, 1], "view": 4, "mode": "basis", "modes": ["basis"], "presets": [], "caption": "The purple grid is the grid of the basis b₁ = (1, 1), b₂ = (1, −1). The vector x = (2, 1) has coordinates P⁻¹x = (1.5, 0.5): walk 1.5 along b₁ and 0.5 along b₂. The red vector is Ax, and A′ = P⁻¹AP comes out diagonal, diag(4, 2), with the same trace and determinant as A. Drag b₁ or b₂ off the eigenvector directions and A′ stops being diagonal, though its trace and determinant never change. Check the exercise: set A to rows (1, 2), (0, 3) and the basis to (1, 1), (0, 1)."}
\`\`\`

This example is the point of the lesson. A hard-looking matrix may be a simple map in the wrong coordinates. Choosing good coordinates is a recurring strategy, and eigenvectors, in a later module, are how you find them.

In NumPy, avoid forming the inverse. Compute \`A_new = np.linalg.solve(P, A @ P)\`, which solves $PX = AP$ for $X$. Bases need not be orthonormal, and when they are, $P^{-1} = P^T$ and the formula is simply $P^T A P$.`,
          resources: [
            main(eola, 'The video on change of basis, which is especially clear on the direction of the conversion.'),
            also(ila, 'The sections on coordinate systems and on similarity.'),
            also(ula, 'The material on bases and coordinate systems.'),
          ],
          exercises: [
            {
              slug: 'triangular-in-new-basis',
              title: 'A new basis by hand',
              prompt:
                'Let $A$ have rows $(1, 2)$ and $(0, 3)$, and let the new basis be $(1, 1)$, $(0, 1)$. Compute $A\' = P^{-1}AP$ by hand. You should get rows $(3, 2)$ and $(0, 1)$. Check that the trace and determinant match those of $A$. Verify that the first column of $A\'$ correctly describes $Ab_1$ in terms of $b_1$ and $b_2$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'taylor-shift',
              title: 'Re-centre a polynomial',
              prompt:
                'In the space of polynomials of degree at most 2, write the change-of-basis matrix from $1, t-1, (t-1)^2$ to $1, t, t^2$. Use its inverse to rewrite $t^2$ and $3 + 2t + t^2$ in powers of $t - 1$. Check the second answer by expanding it.',
              kind: 'problem',
              difficulty: 2,
              hint: 'The columns of $P$ are the coefficients of $1$, $t-1$ and $(t-1)^2$ in the basis $1, t, t^2$.',
            },
            {
              slug: 'similarity-invariants',
              title: 'What similarity preserves',
              prompt:
                'Prove that similar matrices have the same determinant, the same trace (use $\\operatorname{tr}(XY) = \\operatorname{tr}(YX)$) and the same rank. Then show that the matrices with rows $(1, 1), (0, 1)$ and rows $(1, 0), (0, 1)$ have the same trace, determinant and rank but are not similar.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'What is $P^{-1} I P$ for every invertible $P$?',
            },
          ],
          selfAssessment: [
            {
              question: 'If the columns of $P$ are the new basis, how do you get new coordinates from standard ones?',
              answerOutline: 'Solve $Pc = x$, that is $c = P^{-1}x$.',
            },
            {
              question: 'Why is the new matrix $P^{-1}AP$ and not $PAP^{-1}$?',
              answerOutline: 'Read from the right: $P$ turns new coordinates into standard ones, $A$ acts, and $P^{-1}$ returns to new coordinates.',
            },
            {
              question: 'Name three quantities shared by similar matrices.',
              answerOutline: 'Any three of the determinant, trace, rank, characteristic polynomial and eigenvalues.',
            },
          ],
        },
        {
          slug: 'determinants',
          title: 'Determinants',
          summary:
            'Understand the determinant as a signed volume scale, compute it from elimination, and avoid its numerical traps.',
          estimatedMinutes: 120,
          objectives: [
            'Interpret the determinant as a signed volume scale factor',
            'Compute determinants by elimination and by cofactor expansion',
            'Use the product, transpose and inverse rules',
            'Compute log-determinants safely and explain why a small determinant does not mean near-singular',
          ],
          concepts: [
            'Signed volume',
            'Effect of row operations',
            'Cofactor expansion',
            'Product rule',
            'Log-determinant',
            'Singularity test',
          ],
          explanation: `The **determinant** of a square matrix measures how the map $x \\mapsto Ax$ scales volume: the unit cube goes to a parallelepiped of volume $|\\det A|$. The sign records whether orientation is preserved. So $\\det A = 0$ means that space is flattened into a lower dimension, which is exactly when $A$ is not invertible. Composition multiplies scale factors, which is why $\\det(AB) = \\det(A)\\det(B)$. Also $\\det(A^T) = \\det(A)$, and $\\det(A^{-1}) = 1/\\det(A)$ for invertible $A$.

\`\`\`interactive
matrix-transform
{"title": "The determinant as a signed area", "A": [[2, 1], [1, 1.5]], "x": [1, -1], "modes": ["transform"], "caption": "The shaded parallelogram is the image of the unit square, and its area is |det A|. Drag the tip of Ae₂ across the line through Ae₁: the area shrinks to 0 (the plane collapses onto a line and A has no inverse) and then grows again with the shading turned amber, because the orientation has flipped and det A is negative. Try the Singular, Reflection and Rotation presets."}
\`\`\`

Row operations affect the determinant in a controlled way. Adding a multiple of one row to another leaves it unchanged. Swapping two rows flips its sign. Multiplying a row by $c$ multiplies it by $c$. The determinant of a triangular matrix is the product of its diagonal entries. So the practical algorithm is elimination: $\\det A$ is the product of the pivots, times $(-1)^{\\text{number of swaps}}$.

**Worked example.** From the LU lesson,
$$A = \\begin{bmatrix} 2 & 1 & -1 \\\\ 4 & 5 & 0 \\\\ -2 & 2 & 6 \\end{bmatrix}, \\qquad U = \\begin{bmatrix} 2 & 1 & -1 \\\\ 0 & 3 & 2 \\\\ 0 & 0 & 3 \\end{bmatrix}.$$
No swaps were needed, so $\\det A = 2 \\cdot 3 \\cdot 3 = 18$. As a check, expand along the first row using **cofactors**:
$$\\det A = 2(5 \\cdot 6 - 0 \\cdot 2) - 1(4 \\cdot 6 - 0 \\cdot (-2)) + (-1)(4 \\cdot 2 - 5 \\cdot (-2)) = 60 - 24 - 18 = 18.$$

\`\`\`interactive
row-reduce
{"title": "Determinant by elimination", "A": [[2, 1, -1], [4, 5, 0], [-2, 2, 6]], "aug": 0, "target": "echelon", "det": true, "caption": "Press Next step three times to reach U; once the matrix is triangular the readout multiplies the pivots, 2 · 3 · 3 = 18. Reset and start with a swap of R₁ and R₂ instead: the pivots change, but the sign bookkeeping still gives 18. Scale a row by 2 and the readout divides by that factor."}
\`\`\`

Cofactor expansion is good for small matrices and for theory, but it costs about $n!$ operations. At $n = 25$ that is around $10^{25}$, whereas elimination takes about $10^4$. This gap is a clear lesson in why algorithms matter.

Two numerical traps deserve attention. First, determinants overflow and underflow easily. For $2I$ of size 1100, \`np.linalg.det\` returns \`inf\`, though the true value $2^{1100}$ is finite. Use \`np.linalg.slogdet\`, which returns the sign and $\\log|\\det A|$, here about $762.46$. Second, a small determinant does **not** mean a matrix is close to singular. The matrix $0.1\\,I$ of size 20 has determinant $10^{-20}$ but condition number 1, so it is as well-behaved as a matrix can be. To judge near-singularity, use the condition number.`,
          resources: [
            main(eola, 'The video on the determinant as a scale factor for area and volume.'),
            also(mit1806, 'The sessions on properties of determinants and on cofactor formulas.'),
            also(npLinalg, 'See `det` and `slogdet`.'),
          ],
          exercises: [
            {
              slug: 'determinant-by-elimination',
              title: 'Determinant by elimination',
              prompt:
                'Compute the determinant of the $4 \\times 4$ matrix with rows $(1, 2, 0, 1)$, $(2, 5, 1, 3)$, $(0, 1, 3, 2)$, $(1, 3, 2, 4)$ by elimination, keeping track of every step. Check with SymPy; the answer is 3. Then compute the volume of the parallelepiped with edges $(1, 0, 2)$, $(0, 1, 1)$, $(1, 1, 0)$, and the area of the parallelogram with edges $(3, 1)$, $(1, 2)$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'determinant-rules',
              title: 'Prove the rules you use',
              prompt:
                'Using $\\det(AB) = \\det(A)\\det(B)$, prove that $\\det(A^{-1}) = 1/\\det(A)$, that $\\det(A^k) = \\det(A)^k$, and that similar matrices have equal determinants. Then show that $\\det(A + B) = \\det(A) + \\det(B)$ fails with a $2 \\times 2$ example, and that $\\det(cA) = c^n \\det(A)$ for an $n \\times n$ matrix.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'log-determinant',
              title: 'Determinants that overflow',
              prompt:
                'Write `det_lu(A)` using `scipy.linalg.lu_factor`, multiplying the pivots and tracking the sign from the pivot indices, and a version that sums logs of absolute pivots. Check against `np.linalg.det` on random matrices. Then show that `det` gives `inf` for $2I$ of size 1100, while your log version gives $1100\\ln 2 \\approx 762.46$. Show also that $0.1 I$ of size 20 has determinant $10^{-20}$ and condition number 1.',
              kind: 'coding',
              difficulty: 2,
              hint: 'The `piv` array from `lu_factor` says row $i$ was swapped with row `piv[i]`. Count the entries where `piv[i] != i`.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does $\\det A = -2$ tell you geometrically?',
              answerOutline: 'The map doubles volumes and reverses orientation.',
            },
            {
              question: 'What does each row operation do to the determinant?',
              answerOutline: 'Adding a multiple of a row: no change. Swapping: sign flips. Scaling a row by $c$: multiplied by $c$.',
            },
            {
              question: 'Why is $\\det A$ a poor measure of how close $A$ is to singular?',
              answerOutline: 'It scales with $c^n$ under $A \\mapsto cA$, while singularity does not. The example $0.1I$ has a tiny determinant and condition number 1.',
            },
          ],
        },
      ],
      project: {
        slug: 'wireframe-renderer',
        title: 'A wireframe renderer from matrices',
        description: `Build a small 3D wireframe viewer using only NumPy and Matplotlib, where every step is a matrix. Represent a model, such as a cube or a mesh loaded from a simple OBJ file, as an array of points. Use homogeneous coordinates, so that rotation, scaling and translation are all $4 \\times 4$ matrices that compose by multiplication. Add a camera transform and a perspective projection, then draw the edges. The result shows how composition order, change of basis (the camera is one) and determinants behave in a system you can look at.`,
        deliverables: [
          'A module with functions returning $4 \\times 4$ matrices for rotation about each axis, scaling, translation and a look-at camera',
          'A demonstration that composition order matters: two images of one model, with the same transforms applied in different orders',
          'An animation or image sequence of a rotating model, produced from one composed transform per frame',
          'Tests showing that rotation matrices are orthogonal with determinant 1, and that a scaling by $(a, b, c)$ has determinant $abc$ in its upper-left block',
          'A short note explaining why the camera transform is a change of basis and why perspective is not linear on $\\mathbb{R}^3$',
        ],
        estimatedHours: 6,
        stretchGoals: ['Add back-face culling using the sign of a $3 \\times 3$ determinant', 'Render filled triangles with a depth buffer'],
      },
    },
    {
      slug: 'orthogonality-and-least-squares',
      title: 'Orthogonality and Least Squares',
      description:
        'Use perpendicularity to project, to build well-behaved bases, and to find the best approximate solution of a system that has no exact one.',
      lessons: [
        {
          slug: 'inner-products-and-projections',
          title: 'Inner products and projections',
          summary:
            'Measure lengths and angles with the dot product, and find the closest point in a subspace.',
          estimatedMinutes: 120,
          objectives: [
            'Compute norms, angles and orthogonal projections',
            'State and use the Cauchy-Schwarz inequality',
            'Derive the projection onto a line and onto a column space',
            'Verify the two defining properties of a projection matrix',
          ],
          concepts: [
            'Dot product',
            'Norm and angle',
            'Cauchy-Schwarz inequality',
            'Orthogonal projection',
            'Projection matrix',
            'Residual vector',
          ],
          explanation: `The dot product $u \\cdot v = u^T v$ gives $\\mathbb{R}^n$ its geometry. Length is $\\|v\\| = \\sqrt{v \\cdot v}$, and the angle between non-zero vectors satisfies $u \\cdot v = \\|u\\|\\|v\\|\\cos\\theta$. That formula makes sense in any dimension because of the **Cauchy-Schwarz inequality**, $|u \\cdot v| \\le \\|u\\|\\|v\\|$, with equality exactly when one vector is a multiple of the other. Vectors are **orthogonal** when $u \\cdot v = 0$.

**Projection** answers the question: what is the closest point to $b$ in a given subspace? The key fact is that the closest point $p$ is the one whose error $e = b - p$ is perpendicular to the subspace. For a line through a non-zero vector $a$, write $p = \\hat{x}a$. Then $a \\cdot (b - \\hat{x}a) = 0$ gives
$$\\hat{x} = \\frac{a \\cdot b}{a \\cdot a}, \\qquad p = \\frac{a \\cdot b}{a \\cdot a}\\, a.$$

For a subspace given as the column space of $A$, with independent columns, write $p = A\\hat{x}$. Requiring $e$ to be perpendicular to every column means $A^T(b - A\\hat{x}) = 0$, and so
$$A^T A \\hat{x} = A^T b, \\qquad p = A(A^T A)^{-1}A^T b.$$
The **projection matrix** $P = A(A^T A)^{-1}A^T$ is symmetric and satisfies $P^2 = P$: projecting twice changes nothing. The formula needs independent columns, since otherwise $A^T A$ is singular.

**Worked example.** Let $b = (3, 0, 3)$. To project onto the line through $a = (1, 1, 0)$, compute $a \\cdot b = 3$ and $a \\cdot a = 2$, so $p = (1.5, 1.5, 0)$. Now project onto the plane spanned by $a_1 = (1, 1, 0)$ and $a_2 = (0, 1, 1)$. With these as the columns of $A$,
$$A^T A = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}, \\qquad A^T b = \\begin{bmatrix} 3 \\\\ 3 \\end{bmatrix}.$$
Solving gives $\\hat{x} = (1, 1)$, so $p = a_1 + a_2 = (1, 2, 1)$ and $e = b - p = (2, -2, 2)$. Check the result: $e \\cdot a_1 = 0$ and $e \\cdot a_2 = 0$. The distance from $b$ to the plane is $\\|e\\| = 2\\sqrt{3}$.

\`\`\`interactive
projection-3d
{"title": "Project b = (3, 0, 3) onto a line and a plane", "b": [3, 0, 3], "a": [[1, 1, 0], [0, 1, 1]], "onto": "line", "caption": "Start with the line through a₁: p = (1.5, 1.5, 0), and the red residual e meets the line at a right angle. Switch to the plane of a₁ and a₂ and check x̂ = (1, 1), p = (1, 2, 1), e = (2, −2, 2) and |e| = 2√3 ≈ 3.464. Drag the background (or use the sliders) to turn the picture until you look along the plane edge-on: then e is plainly perpendicular to it. Edit b to try the exercises."}
\`\`\`

The Pythagorean theorem explains why $p$ is closest. For any other point $q$ in the subspace, $p - q$ lies in the subspace and is perpendicular to $e$, so $\\|b - q\\|^2 = \\|e\\|^2 + \\|p - q\\|^2 \\ge \\|e\\|^2$. In code, compute projections by solving, for example with \`np.linalg.lstsq\`, instead of building $P$, since an explicit $P$ is an expensive dense matrix.`,
          resources: [
            main(ila, 'The chapter on orthogonality, especially orthogonal projection.'),
            also(mit1806, 'The session on projections onto subspaces.'),
            also(eola, 'The video on dot products and duality, for the geometric meaning.'),
          ],
          exercises: [
            {
              slug: 'project-onto-a-line',
              title: 'Project onto a line',
              prompt:
                'Project $b = (1, 1, 1)$ onto the line through $a = (2, 1, -2)$. Give $p$ as exact fractions, verify that $e \\cdot a = 0$, and show that the squared distance from $b$ to the line is $26/9$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'project-onto-a-plane',
              title: 'Project onto a plane',
              prompt:
                'The plane $x + y + z = 0$ has normal $n = (1, 1, 1)$. Show that projection onto the plane has matrix $P = I - \\tfrac13 nn^T$. Verify $P^2 = P$ and $P^T = P$, find $P(1, 2, 3)$, and state the rank of $P$. Check your answer in NumPy by building a basis of the plane and using the formula $A(A^T A)^{-1}A^T$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'prove-projection-properties',
              title: 'Prove the projection facts',
              prompt:
                'Let $A$ have independent columns and let $P = A(A^T A)^{-1}A^T$. Prove that $P^T = P$, that $P^2 = P$, that $Pb = b$ for $b \\in C(A)$, and that $Pb = 0$ for $b \\in N(A^T)$. Prove Cauchy-Schwarz by expanding $\\|u - tv\\|^2 \\geq 0$ with a well-chosen $t$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For Cauchy-Schwarz with $v \\neq 0$, take $t = (u \\cdot v)/(v \\cdot v)$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What geometric condition characterises the closest point in a subspace?',
              answerOutline: 'The error $b - p$ is perpendicular to the whole subspace.',
            },
            {
              question: 'What are the eigenvalues of a projection matrix, and why?',
              answerOutline: 'Only 0 and 1. If $Px = \\lambda x$ then $P^2 x = Px$ gives $\\lambda^2 = \\lambda$.',
            },
            {
              question: 'Why does the formula $P = A(A^T A)^{-1}A^T$ need independent columns?',
              answerOutline: 'Otherwise $A^T A$ is singular, because $N(A^T A) = N(A)$ is non-trivial.',
            },
          ],
        },
        {
          slug: 'gram-schmidt-and-qr',
          title: 'Gram-Schmidt and the QR factorisation',
          summary:
            'Turn any independent set into an orthonormal one, record the process as $A = QR$, and see why the way you code it matters.',
          estimatedMinutes: 130,
          objectives: [
            'Carry out Gram-Schmidt by hand',
            'State the properties of orthogonal matrices and of the QR factorisation',
            'Compare classical and modified Gram-Schmidt numerically',
            'Use `np.linalg.qr` and handle its sign convention',
          ],
          concepts: [
            'Orthonormal basis',
            'Orthogonal matrix',
            'Gram-Schmidt process',
            'QR factorisation',
            'Loss of orthogonality',
            'Householder reflections',
          ],
          explanation: `Orthonormal bases make everything easier. If $q_1, \\dots, q_k$ are orthonormal and $Q$ has them as columns, then $Q^T Q = I$, projection onto their span is $QQ^T$, and coordinates are plain dot products. A square $Q$ with orthonormal columns is an **orthogonal matrix**. Then $Q^{-1} = Q^T$, and it preserves lengths, so its condition number is 1.

**Gram-Schmidt** builds such a basis from independent vectors $a_1, \\dots, a_n$. Take each vector, subtract its projections onto the $q$s found so far, and normalise what is left. Recording the coefficients gives the **QR factorisation** $A = QR$. Here $Q$ has orthonormal columns and $R$ is upper triangular, with $r_{ij} = q_i \\cdot a_j$ above the diagonal. The diagonal entries are the lengths of the leftover vectors, which are positive because the columns are independent.

**Worked example.** Let $a_1 = (1, 1, 0)$ and $a_2 = (1, 0, 1)$. First,
$$r_{11} = \\|a_1\\| = \\sqrt{2}, \\qquad q_1 = \\tfrac{1}{\\sqrt{2}}(1, 1, 0).$$
Next, $r_{12} = q_1 \\cdot a_2 = 1/\\sqrt{2}$. Subtract the component along $q_1$:
$$a_2 - r_{12}\\, q_1 = (1, 0, 1) - \\tfrac12(1, 1, 0) = \\left(\\tfrac12, -\\tfrac12, 1\\right).$$
Its length is $r_{22} = \\sqrt{3/2}$, so $q_2 = \\tfrac{1}{\\sqrt{6}}(1, -1, 2)$. Check that $q_1 \\cdot q_2 = 0$, and that $r_{12}q_1 + r_{22}q_2 = (1, 0, 1)$.

\`\`\`interactive
projection-3d
{"mode": "gram-schmidt", "title": "Gram-Schmidt on a₁ = (1, 1, 0), a₂ = (1, 0, 1)", "a": [[1, 1, 0], [1, 0, 1]], "turn": -30,"caption": "Press Next to normalise a₁, then to subtract from a₂ its component r₁₂q₁ (dashed) and finally to normalise what is left. Q and R fill in as you go: r₁₁ = √2 ≈ 1.414, r₁₂ = 1/√2 ≈ 0.707, r₂₂ = √(3/2) ≈ 1.225. Turn the view to see that v₂ is perpendicular to q₁. Then edit the vectors to (1, 2, 2) and (3, 0, 3) from the exercise."}
\`\`\`

The formula on paper is not the end of the story. **Classical Gram-Schmidt** computes every $r_{ij}$ from the original $a_j$, and on ill-conditioned input it loses orthogonality badly. **Modified Gram-Schmidt** subtracts each projection from the current, already updated vector. The two are identical in exact arithmetic, but not in floating point. On the $10 \\times 10$ Hilbert matrix, where $\\kappa \\approx 10^{13}$, a run gave $\\|Q^T Q - I\\| \\approx 3.5$ for classical (complete loss of orthogonality), about $5 \\times 10^{-5}$ for modified, and about $10^{-15}$ for the **Householder reflections** that \`np.linalg.qr\` uses through LAPACK.

Note that \`np.linalg.qr\` does not promise a positive diagonal. On this example it returns $r_{11} \\approx -1.414$, with the first column of $Q$ negated. To match the hand computation, flip the signs of the matching columns of $Q$ and rows of $R$. By default it returns the reduced form, with $Q$ of size $m \\times n$.`,
          resources: [
            main(mit1806, 'The session on orthogonal matrices and Gram-Schmidt.'),
            also(fastNla, 'The lessons on QR and on how different algorithms lose orthogonality.'),
            also(npLinalg, 'See `qr` and its `mode` argument.'),
          ],
          exercises: [
            {
              slug: 'qr-by-hand',
              title: 'QR by hand',
              prompt:
                'Apply Gram-Schmidt to $a_1 = (1, 2, 2)$, $a_2 = (3, 0, 3)$. You should find $q_1 = \\tfrac13(1, 2, 2)$, $q_2 = \\tfrac13(2, -2, 1)$, and $R$ with rows $(3, 3)$ and $(0, 3)$. Check $QR = A$ and $Q^TQ = I$. Then extend $q_1, q_2$ to an orthonormal basis of $\\mathbb{R}^3$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'classical-against-modified',
              title: 'Classical against modified',
              prompt:
                'Implement classical and modified Gram-Schmidt. For Hilbert matrices with $n = 6, 8, 10$, measure $\\|Q^TQ - I\\|$ for both and for `np.linalg.qr`. Tabulate these against $\\kappa$. You should see modified lose orthogonality roughly in proportion to $\\kappa\\varepsilon$ and classical much faster, with no meaningful orthogonality left by $n = 8$, while Householder stays near $10^{-15}$. Then implement classical Gram-Schmidt with a second pass of orthogonalisation, and report the effect.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'qr-is-unique',
              title: 'Uniqueness of QR',
              prompt:
                'Let $A$ be $m \\times n$ with independent columns. Prove that $A$ has exactly one factorisation $A = QR$ with $Q$ having orthonormal columns and $R$ upper triangular with positive diagonal.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'If $Q_1R_1 = Q_2R_2$, then $T = R_1R_2^{-1}$ is upper triangular and $T^TT = R_2^{-T}A^TAR_2^{-1}$ can be shown to equal $I$. An upper triangular orthogonal matrix with positive diagonal must be $I$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does an orthogonal matrix preserve lengths, and what is its condition number?',
              answerOutline: '$\\|Qx\\|^2 = x^TQ^TQx = \\|x\\|^2$. All singular values are 1, so $\\kappa_2(Q) = 1$.',
            },
            {
              question: 'What does a zero diagonal entry in Gram-Schmidt mean?',
              answerOutline: 'The current vector lies in the span of the earlier ones, so the columns are dependent.',
            },
            {
              question: 'Name the difference between classical and modified Gram-Schmidt.',
              answerOutline:
                'Classical computes projections from the original vector. Modified subtracts them one at a time from the updated vector. They agree in exact arithmetic, and modified is far more stable numerically.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/orthogonality-and-regression/qr-factorisation'],
        },
        {
          slug: 'least-squares',
          title: 'Least squares',
          summary:
            'Find the best approximate solution of an overdetermined system, and choose a numerically sound method to compute it.',
          estimatedMinutes: 130,
          objectives: [
            'Derive the normal equations from the projection picture',
            'Fit lines and polynomials by least squares',
            'Solve least-squares problems through QR and explain why this is preferred',
            'Recognise rank-deficient problems and the minimum-norm solution',
          ],
          concepts: [
            'Overdetermined system',
            'Normal equations',
            'Residual',
            'Design matrix',
            'QR solution of least squares',
            'Squared condition number',
          ],
          explanation: `When $Ax = b$ has more equations than unknowns, it usually has no solution, because $b$ is not in $C(A)$. **Least squares** instead minimises the size of the residual, $\\|b - Ax\\|^2$. By the previous lessons, the minimiser makes $A\\hat{x}$ the projection of $b$ onto $C(A)$, so the residual is perpendicular to the columns. That gives the **normal equations**
$$A^T A \\hat{x} = A^T b.$$
If $A$ has independent columns, $\\hat{x}$ is unique.

**Worked example.** Fit a line $y = c_0 + c_1 t$ to the points $(0, 1)$, $(1, 1)$, $(2, 2)$, $(3, 4)$. Each point gives one equation, and the **design matrix** has a column of ones and a column of $t$ values:
$$A = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\\\ 1 & 3 \\end{bmatrix}, \\qquad b = \\begin{bmatrix} 1 \\\\ 1 \\\\ 2 \\\\ 4 \\end{bmatrix}.$$
Then
$$A^T A = \\begin{bmatrix} 4 & 6 \\\\ 6 & 14 \\end{bmatrix}, \\qquad A^T b = \\begin{bmatrix} 8 \\\\ 17 \\end{bmatrix}.$$
Solving gives $c_0 = \\tfrac12$ and $c_1 = 1$, the line $y = \\tfrac12 + t$. The residuals are $(\\tfrac12, -\\tfrac12, -\\tfrac12, \\tfrac12)$, with squared sum 1. Note the check: they sum to 0, because they are perpendicular to the column of ones, and their dot product with $t$ is also 0.

\`\`\`interactive
least-squares
{"title": "Fit a line to the four points", "points": [[0, 1], [1, 1], [2, 2], [3, 4]], "maxDegree": 3, "caption": "The green line is y = 1/2 + t with residuals (red) of squared sum 1. Turn on 'Draw my own line' and drag its two handles: however you place it, its sum of squares stays above 1. Drag a data point and watch the normal equations, the fit and both orthogonality checks update. Raise the degree to 2, the model of the next paragraph, and to 3, where the curve passes through all four points and the residuals vanish."}
\`\`\`

"Linear" in least squares refers to the unknown coefficients, not the model's shape in $t$. A model such as $c_0 + c_1 t + c_2 t^2$, or $c_0 + c_1 \\sin t$, is still a linear system in the $c_i$.

**Computing it.** Forming $A^T A$ squares the condition number, $\\kappa(A^T A) = \\kappa(A)^2$, so the normal equations can lose twice as many digits as necessary. Instead substitute $A = QR$. The normal equations reduce to the triangular system
$$R\\hat{x} = Q^T b.$$
A degree-12 polynomial fit in the monomial basis on 50 points in $[0, 1]$ has $\\kappa(A) \\approx 7 \\times 10^8$. In a test with coefficients all equal to 1, QR recovered them with error about $6 \\times 10^{-9}$, while the normal equations gave an error of about 3, which is useless.

If the columns of $A$ are dependent, infinitely many $\\hat{x}$ minimise the residual. \`np.linalg.lstsq\` uses the SVD and returns the one with the smallest norm. For $x + y + z = 3$ that is $(1, 1, 1)$. Later lessons explain why.`,
          resources: [
            main(ila, 'The sections on the method of least squares, with fitted examples.'),
            also(npLinalg, 'See `lstsq`, `qr` and the meaning of the `rcond` argument.'),
            also(mit1806, 'The session on projection matrices and least squares.'),
          ],
          exercises: [
            {
              slug: 'fit-a-parabola',
              title: 'Fit a parabola',
              prompt:
                'Fit $y = c_0 + c_1 t + c_2 t^2$ to the points $(-1, 1)$, $(0, 0)$, $(1, 1)$, $(2, 3)$ using the normal equations with exact fractions. You should get $c = (3/20, -1/20, 3/4)$. Check that the residual is perpendicular to all three columns, then confirm with `np.linalg.lstsq`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'normal-equations-versus-qr',
              title: 'Normal equations against QR',
              prompt:
                'Take 50 equally spaced points $t$ in $[0, 1]$ and form the monomial design matrix of degree $d = 8, 12, 16$. Set $y = Ac$ with all coefficients $c_i = 1$, then recover $c$ with the normal equations and with QR. Tabulate $\\kappa(A)$ and the error $\\|\\hat{c} - c\\|$ for both. Explain the table using $\\kappa(A^T A) = \\kappa(A)^2$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'calculus-derivation',
              title: 'Derive it with calculus',
              prompt:
                'Let $f(x) = \\|b - Ax\\|^2$ for a function of two unknowns $x = (x_1, x_2)$ with $A$ having independent columns. Expand $f$, set both partial derivatives to zero and show that you recover the normal equations. If partial derivatives are new to you, treat $x_2$ as a constant when differentiating with respect to $x_1$. Then prove without calculus that $\\hat{x}$ is the global minimiser, using the identity $\\|b - Ax\\|^2 = \\|b - A\\hat{x}\\|^2 + \\|A(\\hat{x} - x)\\|^2$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does least squares lead to $A^T(b - A\\hat{x}) = 0$?',
              answerOutline: 'The optimal residual is perpendicular to $C(A)$, so it is perpendicular to every column.',
            },
            {
              question: 'Why is QR preferred to the normal equations?',
              answerOutline: 'Forming $A^TA$ squares the condition number. QR works with $A$ directly, so it loses only about half as many digits.',
            },
            {
              question: 'Is fitting $c_0 + c_1 e^{t}$ a linear least-squares problem? What about $c_0 e^{c_1 t}$?',
              answerOutline: 'The first is, since it is linear in $c_0, c_1$. The second is not, though taking logs gives a related linear fit with different error weighting.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/orthogonality-and-regression/least-squares'],
        },
        {
          slug: 'regression-in-practice',
          title: 'Regression in practice',
          summary:
            'Design features, measure goodness of fit, control overfitting with a held-out set, and use ridge regularisation.',
          estimatedMinutes: 120,
          objectives: [
            'Build design matrices with polynomial, periodic and transformed features',
            'Compute and interpret $R^2$ and residual plots',
            'Detect overfitting with a held-out test set',
            'Compute a ridge solution and explain its effect',
          ],
          concepts: [
            'Feature design',
            'Coefficient of determination',
            'Residual diagnostics',
            'Training and test error',
            'Overfitting',
            'Ridge regression',
          ],
          explanation: `Least squares becomes a modelling tool when you choose the columns of the design matrix. A column is any function of the inputs: $t$, $t^2$, $\\sin(2\\pi t/12)$ for a yearly cycle in monthly data, or $\\log t$. A curved relationship can sometimes be straightened too: if $y \\approx ae^{bt}$, then $\\log y \\approx \\log a + bt$ is linear in the unknowns, though minimising error in $\\log y$ is not the same as minimising error in $y$.

How good is a fit? The **coefficient of determination** compares the residual sum of squares with the total variation about the mean:
$$R^2 = 1 - \\frac{\\sum_i (y_i - \\hat{y}_i)^2}{\\sum_i (y_i - \\bar{y})^2}.$$
For a least-squares fit with an intercept, $0 \\le R^2 \\le 1$. Without an intercept, this formula can go negative.

**Worked example.** In the last lesson, the line through $(0, 1), (1, 1), (2, 2), (3, 4)$ had residual sum 1. The mean of $y$ is 2, so the total sum is $1 + 1 + 0 + 4 = 6$, and $R^2 = 1 - 1/6 = 5/6$. The line accounts for five sixths of the variation. But look at the residuals, $(\\tfrac12, -\\tfrac12, -\\tfrac12, \\tfrac12)$: they go positive, negative, positive in a pattern, which suggests curvature that the line misses. Always plot residuals. A high $R^2$ does not show that a model is right, and adding columns can never reduce $R^2$ on the fitted data.

That last fact is the danger. A degree-9 polynomial through 10 points has $R^2 = 1$ and may predict terribly. So set aside a **test set**, fit on the rest and report the error on the data the model has not seen.

\`\`\`interactive
least-squares
{"title": "R² always rises with the degree", "points": [[0, 4.3], [1, 2.9], [2, 3.1], [3, 2.7], [4, 3.4], [5, 3.2], [6, 4.4], [7, 5.2], [8, 7.1], [9, 8.3]], "degree": 1, "maxDegree": 9, "compare": false, "view": [-1, 10, 0, 10], "caption": "These ten points come from a gentle curve plus noise. The straight line leaves residuals that go positive, negative, positive: the pattern that says curvature is missing. Degree 2 fixes that and R² jumps. Keep raising the degree: R² creeps up to exactly 1 at degree 9, where the curve passes through every point and swings wildly between them, especially near the ends. Drag one point a little and compare how much the degree-2 and degree-9 curves move."}
\`\`\`

**Ridge regression** discourages large coefficients by minimising $\\|b - Ax\\|^2 + \\lambda\\|x\\|^2$ with $\\lambda > 0$. The solution satisfies
$$(A^T A + \\lambda I)\\hat{x} = A^T b,$$
and the matrix on the left is invertible for every $A$ when $\\lambda > 0$. Take $A$ with rows $(1, 0), (0, 1), (1, 1)$ and $b = (1, 2, 3)$. Ordinary least squares gives $(1, 2)$, and it fits exactly. With $\\lambda = 1$, the system has matrix rows $(3, 1), (1, 3)$ and right side $(4, 5)$, so $\\hat{x} = (\\tfrac78, \\tfrac{11}{8})$, which is smaller. As $\\lambda$ grows, $\\|\\hat{x}\\|$ falls towards 0. In practice, centre or scale the columns first, leave any intercept unpenalised, and choose $\\lambda$ on held-out data.`,
          resources: [
            main(ula, 'The sections on least-squares problems and linear regression.'),
            also(mit18065, 'The lectures on least squares, including weighted and regularised versions.'),
            also(pnm, 'The chapter on least-squares regression, for Python worked code.'),
          ],
          exercises: [
            {
              slug: 'recover-a-seasonal-signal',
              title: 'Recover a seasonal signal',
              prompt:
                'Simulate 120 months of data, $y_t = 1 + 0.5t + 2\\sin(2\\pi t/12) + \\epsilon_t$, with $\\epsilon_t$ normal with standard deviation 0.5. Fit columns $1$, $t$, $\\sin(2\\pi t/12)$, $\\cos(2\\pi t/12)$. Your coefficients should come out near $(1, 0.5, 2, 0)$. Report $R^2$, plot the residuals, and then repeat with the seasonal columns removed and describe how the residual plot exposes the missing term.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'exponential-through-logs',
              title: 'An exponential through logs',
              prompt:
                'Fit $y = ae^{bt}$ to $(0, 3)$, $(1, 6.1)$, $(2, 11.9)$, $(3, 24.2)$ by a straight-line fit to $\\log y$. You should get $b \\approx 0.693$ and $a \\approx 3.01$. Then minimise the error in $y$ directly with `scipy.optimize.curve_fit`, compare the two sets of parameters, and explain why they differ slightly.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'overfitting-curve',
              title: 'Draw the overfitting curve',
              prompt:
                'Generate 30 points from $y = \\sin(2\\pi t) + \\epsilon$ on $[0, 1]$ with noise standard deviation 0.2. Use 20 for training and 10 for testing. Fit polynomials of degree 0 to 15, using QR or a Legendre basis, and plot training and test error against degree. Training error should not increase with degree; describe what test error does. Then fix degree 15, add ridge regularisation, and plot test error against $\\lambda$ on a log scale.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'ridge-always-invertible',
              title: 'Why ridge is always solvable',
              prompt:
                'Prove that $A^T A + \\lambda I$ is invertible for every real matrix $A$ and every $\\lambda > 0$. Show that the ridge solution with $A$ as in the lesson and $\\lambda = 1$ is $(7/8, 11/8)$. Then compute $\\|\\hat{x}\\|$ for $\\lambda = 0, 0.1, 1, 10, 100$. You should see 2.2361, 2.1512, 1.6298, 0.4937, 0.0622.',
              kind: 'problem',
              difficulty: 2,
              hint: 'If $(A^TA + \\lambda I)x = 0$, multiply by $x^T$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why can a higher $R^2$ on the training data be misleading?',
              answerOutline: 'Adding columns can never lower it on the fitted data, so it rewards complexity. Only held-out data measures prediction.',
            },
            {
              question: 'What does a pattern in the residuals tell you?',
              answerOutline: 'The model misses a systematic structure such as curvature or seasonality. Good residuals look like noise.',
            },
            {
              question: 'Why should you usually avoid penalising the intercept in ridge regression?',
              answerOutline: 'The intercept only sets the overall level. Penalising it makes the fit depend on the origin of $y$, which has no meaning.',
            },
          ],
        },
      ],
      project: {
        slug: 'fit-the-keeling-curve',
        title: 'Model the Mauna Loa carbon dioxide record',
        description: `Download the monthly mean Mauna Loa atmospheric carbon dioxide series published by the NOAA Global Monitoring Laboratory, and build a least-squares model of it. Start with a straight line, look at the residuals, then add a quadratic trend and the annual cycle using sine and cosine columns, plus a second harmonic. Solve each model through QR that you call yourself, and compare it with the normal equations. Hold out the last five years of data to judge prediction, and let the residuals decide when to stop adding columns.`,
        deliverables: [
          'A script that loads the data, builds each design matrix and fits it with both QR and the normal equations',
          'A table of training RMSE, test RMSE, $R^2$ and $\\kappa(A)$ for at least four models',
          'Plots of the data with the fit, of the residuals for each model, and of the five-year prediction',
          'The estimated amplitude and peak month of the annual cycle, with how you derived them from the sine and cosine coefficients',
          'A one-page note saying which model you would use and what the data does not tell you, such as the cause of the trend',
        ],
        estimatedHours: 6,
        stretchGoals: ['Rescale $t$ to reduce $\\kappa(A)$ and measure the effect', 'Add a slowly varying cycle amplitude and test whether it improves held-out error'],
      },
    },
    {
      slug: 'eigenvalues',
      title: 'Eigenvalues and Dynamics',
      description:
        'Find the directions a matrix only stretches, use them to compute powers, and predict the long-run behaviour of systems that evolve in time.',
      lessons: [
        {
          slug: 'eigenvalues-and-eigenvectors',
          title: 'Eigenvalues and eigenvectors',
          summary:
            'Find the special directions of a matrix from the characteristic polynomial, and know why software does not do it that way.',
          estimatedMinutes: 120,
          objectives: [
            'Compute eigenvalues and eigenvectors of small matrices by hand',
            'Use the trace and determinant as checks',
            'Distinguish algebraic and geometric multiplicity',
            'Use `np.linalg.eig` and read its output correctly',
          ],
          concepts: [
            'Eigenvalue and eigenvector',
            'Characteristic polynomial',
            'Eigenspace',
            'Algebraic and geometric multiplicity',
            'Complex eigenvalues',
            'Trace and determinant relations',
          ],
          explanation: `Most vectors change direction when a matrix acts on them. An **eigenvector** is a non-zero vector that does not: $Av = \\lambda v$, where the scalar $\\lambda$ is the **eigenvalue**. Along an eigenvector, the matrix acts as plain multiplication, and that is why eigenvalues describe repeated action so well.

To find them, rewrite the equation as $(A - \\lambda I)v = 0$. A non-zero $v$ exists exactly when $A - \\lambda I$ is singular, that is, when
$$\\det(A - \\lambda I) = 0.$$
This is the **characteristic equation**, a polynomial of degree $n$ in $\\lambda$. Then find each eigenvector from the null space of $A - \\lambda I$.

**Worked example.** Let
$$A = \\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}.$$
Then $\\det(A - \\lambda I) = (4 - \\lambda)(3 - \\lambda) - 2 = \\lambda^2 - 7\\lambda + 10 = (\\lambda - 5)(\\lambda - 2)$. For $\\lambda = 5$, $A - 5I$ has rows $(-1, 1)$ and $(2, -2)$, so $v = (1, 1)$. For $\\lambda = 2$, $A - 2I$ has rows $(2, 1)$ and $(2, 1)$, so $v = (1, -2)$. Check: $A(1, -2) = (2, -4) = 2(1, -2)$. Two quick checks on the eigenvalues: their sum equals the trace ($5 + 2 = 4 + 3$), and their product equals the determinant ($10 = 12 - 2$). Both hold in general, with eigenvalues counted with multiplicity, including complex ones.

\`\`\`interactive
matrix-transform
{"title": "Hunt for the directions A only stretches", "A": [[4, 1], [2, 3]], "x": [1, 0.3], "mode": "eigen", "modes": ["eigen", "transform"], "presets": ["rotation90", "defective", "symmetric", "projection", "shear"], "caption": "Drag x around the origin and watch Ax (red). Usually Ax points somewhere else, but along the dashed lines through (1, 1) and (1, −2) it lines up with x: there Ax = 5x and Ax = 2x, and x snaps onto the line. Now try the presets: Rotation 90° has eigenvalues ±i and no eigenline at all; Defective, rows (1, 1), (0, 1), has λ = 1 twice but a single eigenline; a projection has eigenvalues 1 and 0."}
\`\`\`

Three things can complicate the picture. **Complex eigenvalues:** a real matrix can have them, in conjugate pairs. Rotation by $90^\\circ$ has $\\lambda = \\pm i$, and it leaves no real direction fixed. **Repeated eigenvalues:** the matrix with rows $(1, 1), (0, 1)$ has $\\lambda = 1$ twice but only one independent eigenvector. Its **algebraic multiplicity** (as a root) is 2 and its **geometric multiplicity** (dimension of the eigenspace) is 1. **Triangular matrices:** the eigenvalues are simply the diagonal entries, but row operations change eigenvalues in general, so you cannot read them from an echelon form.

On a computer, \`w, V = np.linalg.eig(A)\` returns eigenvalues and a matrix whose **columns** are unit eigenvectors, so $v_i$ is \`V[:, i]\`. Eigenvalues come in no guaranteed order, and each eigenvector is only determined up to a scale factor, so the signs may differ from yours. Software does not use the characteristic polynomial, because polynomial roots can be extremely sensitive to rounding in the coefficients. Eigenvalue routines work directly on the matrix with orthogonal transformations.`,
          resources: [
            main(eola, 'The video on eigenvectors and eigenvalues, for the geometric picture.'),
            also(ila, 'The chapter on eigenvalues and eigenvectors, including complex eigenvalues.'),
            also(npLinalg, 'See `eig`, `eigvals` and `eigh`, and how the output is arranged.'),
          ],
          exercises: [
            {
              slug: 'eigenpairs-by-hand',
              title: 'Eigenpairs by hand',
              prompt:
                'Find the eigenvalues and eigenvectors of the matrix with rows $(5, 2), (2, 2)$. You should find eigenvalues 6 and 1. Then find the eigenvalues of the matrix with rows $(2, 1, 0), (0, 2, 0), (0, 0, 3)$, and give the algebraic and geometric multiplicity of each. Check the trace and determinant relations for both.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'eigenvalue-facts',
              title: 'Facts worth proving',
              prompt:
                'Prove that if $Av = \\lambda v$ then $A^k v = \\lambda^k v$ for every positive integer $k$, and that $A^{-1}v = \\lambda^{-1}v$ when $A$ is invertible, and explain why $\\lambda \\neq 0$ in that case. Then prove that eigenvectors for two different eigenvalues are independent. Show by a $2 \\times 2$ example that the eigenvalues of $A + B$ are not in general sums of eigenvalues of $A$ and $B$.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'polynomial-roots-are-unstable',
              title: 'Why not use the characteristic polynomial',
              prompt:
                'Let $A = \\mathrm{diag}(1, 2, \\dots, 20)$. Compute the coefficients of its characteristic polynomial with `np.poly`, find the roots with `np.roots`, and compare them with the true eigenvalues. You should find errors far above machine precision, around 0.01 to 0.1 for the eigenvalues in the upper middle of the range, and some computed roots may even be complex. `np.linalg.eigvals(A)` is exact here. Explain why this makes the polynomial route a poor algorithm even though it is correct mathematics.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the eigenvalue condition $\\det(A - \\lambda I) = 0$?',
              answerOutline: 'A non-zero solution of $(A - \\lambda I)v = 0$ exists exactly when that matrix is singular.',
            },
            {
              question: 'What do the sum and the product of the eigenvalues equal?',
              answerOutline: 'The trace and the determinant, counting complex eigenvalues and multiplicity.',
            },
            {
              question: 'Can a real $2 \\times 2$ matrix have no real eigenvectors? Give an example.',
              answerOutline: 'Yes. A rotation by $90^\\circ$ has eigenvalues $\\pm i$ and moves every real direction.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/eigenvalues-and-eigenvectors'],
        },
        {
          slug: 'diagonalisation',
          title: 'Diagonalisation and matrix powers',
          summary:
            'Write $A = PDP^{-1}$, use it to compute powers in closed form, and recognise matrices for which this fails.',
          estimatedMinutes: 120,
          objectives: [
            'Diagonalise a matrix with $n$ independent eigenvectors',
            'Compute powers of a matrix from its diagonalisation',
            'Decide whether a matrix is diagonalisable',
            'Solve a recurrence such as Fibonacci with eigenvalues',
          ],
          concepts: [
            'Diagonalisation',
            'Eigenvector matrix',
            'Matrix powers',
            'Defective matrix',
            'Distinct eigenvalue criterion',
            'Recurrence relations',
          ],
          explanation: `If an $n \\times n$ matrix $A$ has $n$ independent eigenvectors, put them in the columns of $P$ and their eigenvalues on the diagonal of $D$. The equations $Av_i = \\lambda_i v_i$ combine into $AP = PD$, which gives
$$A = PDP^{-1}.$$
This is a change of basis: in the eigenvector basis, $A$ acts as a diagonal matrix. Powers become easy, because the inner factors cancel:
$$A^k = PD^kP^{-1},$$
and $D^k$ just raises each diagonal entry to the $k$th power.

**Worked example.** Continue with $A$ having rows $(4, 1), (2, 3)$, with eigenvalues 5 and 2 and eigenvectors $(1, 1)$, $(1, -2)$. Then
$$P = \\begin{bmatrix} 1 & 1 \\\\ 1 & -2 \\end{bmatrix}, \\quad D = \\begin{bmatrix} 5 & 0 \\\\ 0 & 2 \\end{bmatrix}, \\quad P^{-1} = \\frac13\\begin{bmatrix} 2 & 1 \\\\ 1 & -1 \\end{bmatrix}.$$
Multiplying out gives
$$A^k = \\frac13\\begin{bmatrix} 2 \\cdot 5^k + 2^k & 5^k - 2^k \\\\ 2 \\cdot 5^k - 2^{k+1} & 5^k + 2^{k+1} \\end{bmatrix}.$$
For $k = 1$ this gives back $A$. For $k = 3$ the top-left entry is $(250 + 8)/3 = 86$, which matches direct multiplication. Notice that for large $k$, the eigenvalue 5 dominates, and $A^k$ looks more and more like a multiple of the rank-one matrix built from $(1, 1)$. That idea drives the rest of this module.

\`\`\`interactive
matrix-transform
{"title": "Powers of A along the eigenvectors", "A": [[4, 1], [2, 3]], "x": [1, -1], "view": 2.5, "mode": "powers", "modes": ["powers", "eigen"], "k": 0, "kMax": 10, "presets": [], "caption": "Slide k from 0 upwards. The readout writes x₀ = (1, −1) in the eigenvector basis and Aᵏx₀ = c₁5ᵏ(1, 1) + c₂2ᵏ(1, −2): each component is just multiplied by its eigenvalue. The arrows are rescaled to the same length so you can follow the direction, which swings onto the line of (1, 1) because 5ᵏ beats 2ᵏ. Check the matrix A³: its top-left entry is 86. Then type the exercise matrix, rows (2, 1), (1, 2), and look at A⁵."}
\`\`\`

**When does it work?** Diagonalisation needs $n$ independent eigenvectors, which means each eigenvalue's geometric multiplicity equals its algebraic multiplicity (over $\\mathbb{C}$, for a full count). Eigenvectors for different eigenvalues are always independent, so $n$ **distinct** eigenvalues guarantee diagonalisability. That condition is sufficient but not necessary: the identity has one repeated eigenvalue and is already diagonal. A matrix that lacks enough eigenvectors is called **defective**, like the matrix with rows $(1, 1), (0, 1)$. Do not confuse diagonalisability with invertibility; they are independent properties. The zero matrix is diagonal but not invertible, and that defective matrix is invertible.

Note a numerical caveat as well. Even for a diagonalisable matrix, \`np.linalg.eig\` may return a badly conditioned $P$ when eigenvectors are nearly parallel. Computing $A^k$ through $PD^kP^{-1}$ then loses accuracy, and \`np.linalg.matrix_power\` is often safer for integer powers.`,
          resources: [
            main(ila, 'The sections on diagonalisation and on what makes a matrix diagonalisable.'),
            also(mit1806, 'The session on diagonalisation and powers of $A$.'),
            also(ula, 'The sections on diagonalisation and dynamical systems.'),
          ],
          exercises: [
            {
              slug: 'closed-form-power',
              title: 'A closed form for powers',
              prompt:
                'Diagonalise the matrix with rows $(2, 1), (1, 2)$. Write a closed form for $A^k$ and use it to show that $A^5$ has rows $(122, 121), (121, 122)$. Confirm with `np.linalg.matrix_power`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'diagonalisable-or-not',
              title: 'Diagonalisable or not',
              prompt:
                'Decide whether each matrix is diagonalisable over the real numbers, and justify your answer: (a) rows $(2, 1), (0, 2)$; (b) rows $(2, 0), (1, 3)$; (c) rows $(0, -1), (1, 0)$; (d) rows $(1, 0, 0), (0, 1, 0), (1, 1, 2)$. For the one that is not diagonalisable over the reals but is over the complex numbers, give $P$ and $D$ over $\\mathbb{C}$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'fibonacci-by-eigenvalues',
              title: 'Fibonacci by eigenvalues',
              prompt:
                'Show that $(F_{n+1}, F_n)^T = M(F_n, F_{n-1})^T$ for $M$ with rows $(1, 1), (1, 0)$. Diagonalise $M$ and derive the closed form $F_n = (\\varphi^n - \\psi^n)/\\sqrt{5}$. Compute $F_{50} = 12586269025$ exactly with Python integers and matrix powers. Then evaluate the closed form in floating point, find the first $n$ for which rounding it gives the wrong integer, and explain why.',
              kind: 'coding',
              difficulty: 2,
              hint: 'Use a Python integer `dtype=object` matrix, or plain lists, to avoid 64-bit overflow beyond about $F_{92}$.',
            },
            {
              slug: 'shared-eigenvectors',
              title: 'Commuting and shared eigenvectors',
              prompt:
                'Prove that if $A = PD_1P^{-1}$ and $B = PD_2P^{-1}$ with the same $P$, then $AB = BA$. Then show that if $Av = \\lambda v$ and $AB = BA$, then $Bv$ is either 0 or an eigenvector of $A$ for the same $\\lambda$.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What are the columns of $P$ and the entries of $D$ in $A = PDP^{-1}$?',
              answerOutline: 'The columns of $P$ are independent eigenvectors, and $D$ has the matching eigenvalues on its diagonal, in the same order.',
            },
            {
              question: 'Does a repeated eigenvalue prevent diagonalisation?',
              answerOutline: 'Not necessarily. It depends on whether the eigenspace has dimension equal to the multiplicity. The identity is the simplest example.',
            },
            {
              question: 'Is every invertible matrix diagonalisable? Is every diagonalisable matrix invertible?',
              answerOutline: 'Neither. The matrix with rows $(1,1),(0,1)$ is invertible and defective. The zero matrix is diagonalisable and singular.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/diagonalization-and-matrix-functions'],
        },
        {
          slug: 'power-method',
          title: 'The power method',
          summary:
            'Find the dominant eigenvalue by repeated multiplication, analyse how fast it converges, and extend it with shifts.',
          estimatedMinutes: 120,
          objectives: [
            'Implement power iteration with normalisation',
            'State its assumptions and convergence rate',
            'Estimate an eigenvalue with the Rayleigh quotient',
            'Use inverse iteration with a shift to find other eigenvalues',
          ],
          concepts: [
            'Power iteration',
            'Dominant eigenvalue',
            'Convergence ratio',
            'Rayleigh quotient',
            'Inverse iteration',
            'Shift',
          ],
          explanation: `For a large sparse matrix, you often want only the largest eigenvalue, and you can afford only matrix-vector products. **Power iteration** does exactly that: start with a vector, multiply by $A$ repeatedly, and rescale so that numbers do not overflow.

Why does it work? Suppose $A$ is diagonalisable with $|\\lambda_1| > |\\lambda_2| \\ge \\dots \\ge |\\lambda_n|$, and expand $x_0 = c_1 v_1 + \\dots + c_n v_n$ with $c_1 \\neq 0$. Then
$$A^k x_0 = \\lambda_1^k \\left( c_1 v_1 + c_2 (\\lambda_2/\\lambda_1)^k v_2 + \\dots \\right),$$
and every term after the first dies away. The error in direction shrinks by a factor of about $|\\lambda_2/\\lambda_1|$ per step. Each assumption matters. If $|\\lambda_1| = |\\lambda_2|$ with different eigenvalues, the direction may not settle. If $c_1 = 0$ exactly, the iteration misses $v_1$, although rounding error usually rescues it in practice.

**Worked example.** Take $A$ with rows $(4, 1), (2, 3)$ and $x_0 = (1, 0)$, and after each step divide by the largest entry.

- $Ax_0 = (4, 2)$, which scales to $x_1 = (1, 0.5)$.
- $Ax_1 = (4.5, 3.5)$, which scales to $x_2 = (1, 0.778)$.
- $Ax_2 = (4.778, 4.333)$, which scales to $x_3 = (1, 0.907)$.
- $Ax_3 = (4.907, 4.721)$, which scales to $x_4 = (1, 0.962)$.

The vectors approach the eigenvector $(1, 1)$, and the scale factors $4, 4.5, 4.778, 4.907$ approach $\\lambda_1 = 5$. The error in the second entry goes $0.5, 0.222, 0.093, 0.038$, each about 0.4 of the last, matching $|\\lambda_2/\\lambda_1| = 2/5$.

\`\`\`interactive
markov-chain
{"mode": "power", "title": "Power iteration on the worked example", "A": [[4, 1], [2, 3]], "x0": [1, 0], "kMax": 25, "caption": "Step from x₀ = (1, 0) and check the table against the worked example: x₁ = (1, 0.5), x₂ = (1, 0.778), scale factors 4, 4.5, 4.778 heading for 5. The red arrow turns onto the amber eigenline of (1, 1), and the log plot falls with slope 2/5. Now move the λ₂ slider: at λ₂ = 4.5 the ratio is 0.9 and convergence crawls; at λ₂ = −5 the two eigenvalues tie in size and the iterates swing for ever. Try x₀ = (1, −2), which has no component along v₁."}
\`\`\`

A better eigenvalue estimate is the **Rayleigh quotient** $r(x) = x^T A x / x^T x$. If $x$ is an exact eigenvector, $r(x) = \\lambda$. For symmetric $A$, an error $\\varepsilon$ in $x$ gives an error of order $\\varepsilon^2$ in $r(x)$, so convergence is twice as fast in digits.

**Inverse iteration** applies the same idea to $(A - \\mu I)^{-1}$, whose eigenvalues are $1/(\\lambda_i - \\mu)$. The largest of these belongs to the $\\lambda_i$ closest to the shift $\\mu$, so a good shift finds any eigenvalue you want, very quickly. Solve with a stored LU factorisation rather than forming the inverse. A useful warning: as $\\mu$ approaches an eigenvalue, the system becomes nearly singular, yet the method still works, since the error it makes lies mostly along the wanted eigenvector.`,
          resources: [
            main(ula, 'The section on the power method, with shifted and inverse variants.'),
            also(fastNla, 'The material on PageRank and eigen decompositions at scale.'),
            also(spLinalg, 'See `eigh` and the related routines, and compare them with your hand-written iteration.'),
          ],
          exercises: [
            {
              slug: 'three-steps-by-hand',
              title: 'Three steps by hand',
              prompt:
                'Take $A$ with rows $(2, 1), (1, 3)$ and $x_0 = (1, 1)$. Do three steps of power iteration by hand, dividing by the largest entry each time. You should get $x_1 = (0.75, 1)$, $x_2 = (2/3, 1)$, $x_3 = (7/11, 1)$. Compare the scale factors with the exact $\\lambda_1 = (5 + \\sqrt{5})/2 \\approx 3.618$, and predict the convergence ratio from the exact eigenvalues.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'measure-the-rate',
              title: 'Measure the convergence rate',
              prompt:
                'Implement power iteration with 2-norm normalisation and a Rayleigh quotient estimate. For the matrix with rows $(2, 1, 0), (1, 3, 1), (0, 1, 4)$, whose eigenvalues are $3 - \\sqrt{3}$, 3, $3 + \\sqrt{3}$, plot the error in the eigenvector and the error in the eigenvalue estimate against iteration on a log scale. Measure the slopes. You should find ratios near $3/(3 + \\sqrt{3}) \\approx 0.634$ and its square, $0.402$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'when-it-fails',
              title: 'Make it fail',
              prompt:
                'Produce and explain three failures: (a) $A$ with rows $(0, 1), (1, 0)$ and $x_0 = (1, 0)$, where the iterates oscillate; (b) $A = \\mathrm{diag}(2, 1)$ with $x_0 = (0, 1)$, where the method finds the wrong eigenvalue; (c) a real matrix with dominant complex pair, such as a rotation times 2. For (b), show that adding a perturbation of $10^{-10}$ to the first entry of $x_0$ restores convergence, and predict how many iterations that takes.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'inverse-iteration',
              title: 'Reach the other eigenvalues',
              prompt:
                'For the $3 \\times 3$ matrix in the convergence exercise, use inverse iteration with shift $\\mu = 1$ and with a stored LU factorisation to find the smallest eigenvalue, $3 - \\sqrt{3} \\approx 1.268$. Predict the convergence ratio from the eigenvalues of $(A - \\mu I)^{-1}$ and compare it with what you measure. Then find the middle eigenvalue with a suitable shift.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What controls the speed of power iteration?',
              answerOutline: 'The ratio $|\\lambda_2/\\lambda_1|$. The closer it is to 1, the slower the convergence.',
            },
            {
              question: 'Why normalise at each step?',
              answerOutline: 'Otherwise $\\|A^k x\\|$ grows or shrinks geometrically and overflows or underflows. Normalising does not change the direction.',
            },
            {
              question: 'What does a shift do in inverse iteration?',
              answerOutline: 'It makes the eigenvalue nearest $\\mu$ the dominant one of $(A - \\mu I)^{-1}$, so the iteration converges to its eigenvector.',
            },
          ],
        },
        {
          slug: 'linear-dynamical-systems',
          title: 'Linear dynamical systems',
          summary:
            'Use eigenvalues to predict growth, decay and oscillation in systems stepping in time or evolving continuously.',
          estimatedMinutes: 120,
          objectives: [
            'Solve $x_{k+1} = Ax_k$ by expanding in eigenvectors',
            'State the stability conditions for discrete and continuous systems',
            'Solve $x\' = Ax$ with exponentials of eigenvalues',
            'Interpret complex eigenvalues as rotation',
          ],
          concepts: [
            'Discrete dynamical system',
            'Growth rate',
            'Long-run structure',
            'Stability',
            'Continuous linear system',
            'Matrix exponential',
          ],
          explanation: `A **discrete dynamical system** updates a state by $x_{k+1} = Ax_k$, so $x_k = A^k x_0$. Expand the start in eigenvectors, $x_0 = c_1 v_1 + \\dots + c_n v_n$, and you get
$$x_k = c_1 \\lambda_1^k v_1 + \\dots + c_n \\lambda_n^k v_n.$$
Each eigenvector evolves independently, and its eigenvalue says what happens to it. If $|\\lambda| < 1$ the component decays, and if $|\\lambda| > 1$ it grows. If every eigenvalue has $|\\lambda| < 1$, then $x_k \\to 0$ from any start. This condition holds for defective matrices too, even though the formula above needs a basis of eigenvectors.

**Worked example.** A population has juveniles $j$ and adults $a$. Each juvenile produces 1 offspring and each adult produces 2. Half of the juveniles survive to adulthood, and adults live one step. So
$$\\begin{bmatrix} j \\\\ a \\end{bmatrix}_{k+1} = \\begin{bmatrix} 1 & 2 \\\\ 0.5 & 0 \\end{bmatrix} \\begin{bmatrix} j \\\\ a \\end{bmatrix}_k.$$
The characteristic equation is $\\lambda^2 - \\lambda - 1 = 0$, so $\\lambda_1 = (1 + \\sqrt{5})/2 \\approx 1.618$ and $\\lambda_2 \\approx -0.618$. The second component dies away with alternating sign. So the population eventually grows by 61.8% per step, whatever the start, provided the start has a component along $v_1$. The eigenvector for $\\lambda_1$ has $j/a = 2\\lambda_1 \\approx 3.24$, which is the **stable age structure**. Starting from $(10, 0)$, the sequence is $(10, 5), (20, 5), (30, 10), (50, 15), (80, 25)$, and $j/a$ moves through $2, 4, 3, 3.33, 3.2$, oscillating towards 3.24.

\`\`\`interactive
matrix-transform
{"title": "The juvenile-adult population", "A": [[1, 2], [0.5, 0]], "x": [10, 0], "mode": "powers", "modes": ["powers"], "k": 0, "kMax": 12, "presets": [], "vec": "x", "caption": "Slide k and compare xₖ with (10, 5), (20, 5), (30, 10), (50, 15), (80, 25). The arrows are rescaled to equal length so you can watch the direction: it zigzags (λ₂ ≈ −0.618 is negative) onto the dashed eigenline of λ₁ ≈ 1.618, the stable age structure j/a ≈ 3.24. Untick Rescale to see the real growth. Then type rows (0.72, −0.54), (0.54, 0.72), the spiral matrix 0.9Q from the exercise, start from (1, 0) and untick Rescale: complex eigenvalues of modulus 0.9 give an inward spiral."}
\`\`\`

**Continuous systems** $x' = Ax$ work the same way, with $e^{\\lambda t}$ in place of $\\lambda^k$:
$$x(t) = c_1 e^{\\lambda_1 t} v_1 + \\dots + c_n e^{\\lambda_n t} v_n.$$
To check this, differentiate: each term's derivative is $\\lambda_i$ times itself, which equals $A$ acting on that term. Now stability needs every eigenvalue to have $\\operatorname{Re}\\lambda < 0$, because $|e^{\\lambda t}| = e^{t\\operatorname{Re}\\lambda}$. For $A$ with rows $(0, 1), (-2, -3)$, $\\lambda = -1, -2$ with eigenvectors $(1, -1), (1, -2)$. From $x(0) = (1, 0)$, the coefficients are 2 and $-1$, so $x_1(t) = 2e^{-t} - e^{-2t}$.

**Complex eigenvalues** mean rotation. For $\\lambda = re^{i\\theta}$ in discrete time, the state spirals with rotation $\\theta$ per step and radius changing by $r$. In code, \`scipy.linalg.expm(A * t)\` computes the solution matrix even when $A$ is defective.`,
          resources: [
            main(ula, 'The sections on dynamical systems and on the geometry of eigenvalues.'),
            also(mit1806, 'The sessions on difference equations and on differential equations and $e^{At}$.'),
            also(
              {
                title: 'scipy.linalg.expm',
                url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.linalg.expm.html',
                type: 'documentation',
                cost: 'free',
                provider: 'SciPy',
              },
              'Computes the matrix exponential, which also handles defective matrices.',
            ),
          ],
          exercises: [
            {
              slug: 'solve-a-discrete-system',
              title: 'Solve a discrete system exactly',
              prompt:
                'Let $A$ have rows $(0.6, 0.5), (-0.16, 1.2)$ and $x_0 = (10, 6)$. Find the eigenvalues (they are $1$ and $0.8$) and show that $x_k = (5, 4) + 0.8^k(5, 2)$. State the long-run limit, and find the first $k$ for which $x_k$ is within 1% of it in each coordinate. Confirm by iteration in NumPy.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'spiral',
              title: 'Spirals from complex eigenvalues',
              prompt:
                'Let $A = 0.9\\,Q$, where $Q$ has rows $(0.8, -0.6), (0.6, 0.8)$. Show that the eigenvalues are complex with modulus $0.9$, and find the rotation angle per step. Iterate from $(1, 0)$ for 50 steps and plot the path. Then replace $0.9$ with $1$ and with $1.02$, and describe how each picture matches the eigenvalues.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'continuous-from-eigenvalues',
              title: 'A continuous system',
              prompt:
                'For $x\' = Ax$ with $A$ having rows $(0, 1), (-2, -3)$ and $x(0) = (1, 0)$, derive $x(t)$ using eigenvectors. Show that $x_1(1) = 2e^{-1} - e^{-2} \\approx 0.6004$ and $x_2(1) \\approx -0.4651$, and confirm with `scipy.linalg.expm`. Explain why this system corresponds to the single equation $y\'\' + 3y\' + 2y = 0$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'stable-but-growing',
              title: 'Stable, but growing first',
              prompt:
                'Let $A$ have rows $(0.9, 5), (0, 0.9)$, so that both eigenvalues are 0.9 and the system is stable. Iterate from $(0, 1)$ and plot $\\|x_k\\|$. Show that it grows to about 19.4, near $k = 9$, before it decays. Derive a formula for $A^k$, and explain why eigenvalues alone do not describe short-term behaviour of a defective or non-normal matrix.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Write $A = 0.9I + N$ with $N^2 = 0$, and use the binomial theorem.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the stability conditions for discrete and for continuous linear systems.',
              answerOutline: 'Discrete: every $|\\lambda| < 1$. Continuous: every $\\operatorname{Re}\\lambda < 0$.',
            },
            {
              question: 'What does the dominant eigenvector represent in a population model?',
              answerOutline: 'The stable age structure: the long-run proportions, reached from any start with a non-zero component along it.',
            },
            {
              question: 'Do eigenvalues tell you the behaviour for small $k$?',
              answerOutline: 'Not reliably. They govern the long run, and non-normal matrices can show large transient growth first.',
            },
          ],
          relatedLessons: ['math-methods/ordinary-differential-equations/systems-of-odes-and-phase-plane'],
        },
        {
          slug: 'markov-chains',
          title: 'Markov chains',
          summary:
            'Model random movement with a stochastic matrix, find its long-run distribution, and build a small PageRank.',
          estimatedMinutes: 120,
          objectives: [
            'Build a stochastic matrix from a description of a process',
            'Find a stationary distribution as an eigenvector for eigenvalue 1',
            'State conditions under which a chain converges',
            'Compute PageRank by power iteration',
          ],
          concepts: [
            'Stochastic matrix',
            'Probability vector',
            'Stationary distribution',
            'Regular chain',
            'Perron-Frobenius theorem',
            'PageRank and damping',
          ],
          explanation: `A **Markov chain** moves between states at random, and the next state depends only on the current one. Collect the probabilities in a matrix $P$, where $P_{ij}$ is the probability of moving from state $j$ to state $i$. Every entry is non-negative and each column sums to 1, so $P$ is **column-stochastic**. Some books use rows instead, so check which convention you are reading. If $x_k$ holds the probabilities of being in each state at step $k$, then $x_{k+1} = Px_k$.

Since each column sums to 1, the rows of $P - I$ sum to the zero row, so $P - I$ is singular and 1 is always an eigenvalue. A **stationary distribution** is a probability vector with $P\\pi = \\pi$.

When is it unique, and does the chain approach it? A chain is **regular** if some power of $P$ has all entries positive. The **Perron-Frobenius theorem** then says: eigenvalue 1 is simple, every other eigenvalue has $|\\lambda| < 1$, there is a unique stationary distribution $\\pi$ with all entries positive, and $P^k x_0 \\to \\pi$ for every probability vector $x_0$. The hypothesis matters. The chain with rows $(0, 1), (1, 0)$ swaps states forever and never settles, because $-1$ is also an eigenvalue. The identity matrix has every probability vector as a stationary distribution.

**Worked example.** A day is sunny or rainy. A sunny day is followed by a sunny day with probability 0.9, and a rainy day is followed by either with probability 0.5. With states in that order,
$$P = \\begin{bmatrix} 0.9 & 0.5 \\\\ 0.1 & 0.5 \\end{bmatrix}.$$
Solve $(P - I)\\pi = 0$: the first row gives $-0.1\\pi_1 + 0.5\\pi_2 = 0$, so $\\pi_1 = 5\\pi_2$. Scaling to sum to 1 gives $\\pi = (5/6, 1/6)$. The trace is 1.4, so the other eigenvalue is 0.4. Starting from a rainy day, $(0, 1)$, the sequence is $(0.5, 0.5), (0.7, 0.3), (0.78, 0.22), (0.812, 0.188)$. The gap from $5/6$ shrinks by exactly 0.4 each step.

\`\`\`interactive
markov-chain
{"title": "Sunny and rainy days", "P": [[0.9, 0.5], [0.1, 0.5]], "states": ["sunny", "rainy"], "x0": [0, 1], "kMax": 25, "caption": "Press Step from a rainy day and compare with (0.5, 0.5), (0.7, 0.3), (0.78, 0.22), (0.812, 0.188). The bars approach the dashed steady state (5/6, 1/6), and on the log plot the distance falls along a line of slope 0.4, the second eigenvalue: the measured ratio is exactly 0.4 every step. Drag the start anywhere on the segment and the limit does not change. Then type a top row of 0 and 1 (the bottom row fills itself in): that chain swaps states every day, has eigenvalue −1 and never settles."}
\`\`\`

**PageRank** applies this to the web. A random surfer follows a random outgoing link. To guarantee regularity, with probability $1 - d$ they jump to a uniformly random page instead, giving
$$G = dS + \\frac{1 - d}{n}\\mathbf{1}\\mathbf{1}^T,$$
usually with $d = 0.85$. Here $S$ is the link matrix, with its columns for pages without links replaced by uniform columns. All entries of $G$ are positive, so the theorem applies, and $|\\lambda_2| \\le d$ makes power iteration converge quickly. The page's score is its entry in $\\pi$. For a huge sparse $S$, each step costs only a sparse product, and the low-rank term never needs to be stored.`,
          resources: [
            main(ila, 'The section on stochastic matrices and the PageRank example.'),
            also(mit1806, 'The session on Markov matrices.'),
            also(fastNla, 'The notebook material on PageRank with sparse matrices.'),
          ],
          exercises: [
            {
              slug: 'three-state-chain',
              title: 'A three-state chain',
              prompt:
                'Let $P$ have columns $(1/2, 1/2, 0)$, $(1/4, 1/2, 1/4)$, $(0, 1/2, 1/2)$. Show that it is column-stochastic and regular, find its stationary distribution, which should be $(1/4, 1/2, 1/4)$, and find all its eigenvalues. Predict the convergence rate, then measure it starting from $(1, 0, 0)$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'why-one-is-an-eigenvalue',
              title: 'Why 1 is always an eigenvalue',
              prompt:
                'Prove that every column-stochastic matrix has eigenvalue 1, by considering $P^T\\mathbf{1}$. Then prove that every eigenvalue has $|\\lambda| \\leq 1$, by applying $P^T$ to an eigenvector of $P^T$ and looking at its largest entry in modulus. Why is it enough to study $P^T$?',
              kind: 'derivation',
              difficulty: 3,
              hint: '$P$ and $P^T$ have the same characteristic polynomial.',
            },
            {
              slug: 'small-pagerank',
              title: 'A small PageRank',
              prompt:
                'Four pages link as follows: 1 links to 2 and 3; 2 links to 3; 3 links to 1; 4 links to 3. Build $S$ and $G$ with $d = 0.85$, and run power iteration until the 1-norm change is below $10^{-10}$. You should get about $(0.3725, 0.1958, 0.3941, 0.0375)$. Compare the iteration count with the prediction from $|\\lambda_2|$, which here is about 0.60. Explain why page 4 receives exactly $(1 - d)/4$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What must be true of a matrix to be column-stochastic?',
              answerOutline: 'All entries are non-negative and each column sums to 1.',
            },
            {
              question: 'Give a Markov chain that does not converge to its stationary distribution, and name the failed hypothesis.',
              answerOutline: 'The two-state swap with rows $(0,1),(1,0)$ from $(1,0)$. It is periodic, so no power has all entries positive, and it is not regular.',
            },
            {
              question: 'What is the role of damping in PageRank?',
              answerOutline: 'It makes $G$ entrywise positive, which gives a unique stationary distribution and bounds $|\\lambda_2|$ by $d$, so convergence is fast.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/eigenvalues-and-networks/markov-chains'],
        },
      ],
      project: {
        slug: 'rank-a-network',
        title: 'Rank the nodes of a real network',
        description: `Pick a network with at least 200 nodes that you find interesting, such as a set of Wikipedia articles and their links, citations among papers, or results between sports teams (where each loss sends a link to the winner). Build its sparse link matrix with \`scipy.sparse\`, implement PageRank by power iteration, handle pages with no outgoing links properly, and study how the method behaves. Then compare the ranking with simple measures such as the number of incoming links, and describe where they disagree and why.`,
        deliverables: [
          'A script that builds the sparse matrix from raw data and computes PageRank using your own power iteration',
          'A convergence plot of the change per iteration on a log scale, for $d = 0.5, 0.85, 0.99$, compared with the rate predicted by $d$',
          'A check against a dense eigenvector routine on a subgraph small enough to solve directly',
          'The top 15 nodes by PageRank and by in-degree, with commentary on three notable differences',
          'A short study of how the ranking changes as $d$ changes',
        ],
        estimatedHours: 7,
        stretchGoals: ['Implement personalised PageRank', 'Measure the second eigenvalue with deflation and relate it to the structure of the network'],
      },
    },
    {
      slug: 'symmetric-matrices-and-svd',
      title: 'Symmetric Matrices and the SVD',
      description:
        'Reach the best-behaved matrices and then the factorisation that works for every matrix, and use it for approximation and data analysis.',
      lessons: [
        {
          slug: 'spectral-theorem',
          title: 'Symmetric matrices and the spectral theorem',
          summary:
            'Real symmetric matrices have real eigenvalues and orthonormal eigenvectors, which gives a clean sum of rank-one pieces.',
          estimatedMinutes: 110,
          objectives: [
            'State the spectral theorem for real symmetric matrices',
            'Orthogonally diagonalise a small symmetric matrix',
            'Write a symmetric matrix as a sum of rank-one projections',
            'Relate extreme eigenvalues to the extreme values of a quadratic form',
          ],
          concepts: [
            'Symmetric matrix',
            'Spectral theorem',
            'Orthogonal diagonalisation',
            'Spectral decomposition',
            'Quadratic form',
            'Rayleigh quotient',
          ],
          explanation: `Symmetric matrices, with $A = A^T$, are the best-behaved class of square matrices, and they appear everywhere: covariance matrices, Hessians, graph Laplacians, $A^T A$ for any $A$.

**Spectral theorem.** If $A$ is a real symmetric $n \\times n$ matrix, then all its eigenvalues are real, and $\\mathbb{R}^n$ has an orthonormal basis of eigenvectors of $A$. In matrix form,
$$A = Q\\Lambda Q^T,$$
with $Q$ orthogonal and $\\Lambda$ real and diagonal. Conversely, any matrix of this form is symmetric. Part of the proof is short. If $Au = \\lambda u$ and $Av = \\mu v$ with $\\lambda \\neq \\mu$, then
$$\\lambda u \\cdot v = (Au) \\cdot v = u \\cdot (Av) = \\mu\\, u \\cdot v,$$
which forces $u \\cdot v = 0$. Symmetry is what lets $A$ move across the dot product. For a repeated eigenvalue, you can still pick an orthonormal basis inside its eigenspace. The hard part, that a symmetric matrix can never be defective, is proved in \`abstract-linear-algebra\`.

Multiplying out $Q\\Lambda Q^T$ gives the **spectral decomposition**:
$$A = \\lambda_1 q_1 q_1^T + \\dots + \\lambda_n q_n q_n^T.$$
Each $q_i q_i^T$ is the projection onto one eigendirection. So $A$ projects onto each direction and scales by its eigenvalue.

**Worked example.** Let
$$A = \\begin{bmatrix} 2 & 2 \\\\ 2 & 5 \\end{bmatrix}.$$
The trace is 7 and the determinant is 6, so the eigenvalues satisfy $\\lambda^2 - 7\\lambda + 6 = 0$, giving 6 and 1. For $\\lambda = 6$, $A - 6I$ has first row $(-4, 2)$, so $v = (1, 2)$. For $\\lambda = 1$, it has first row $(1, 2)$, so $v = (2, -1)$. These are perpendicular, as promised. Normalising gives $q_1 = (1, 2)/\\sqrt{5}$ and $q_2 = (2, -1)/\\sqrt{5}$, and then
$$6q_1q_1^T + q_2q_2^T = \\frac{6}{5}\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\end{bmatrix} + \\frac15\\begin{bmatrix} 4 & -2 \\\\ -2 & 1 \\end{bmatrix} = \\begin{bmatrix} 2 & 2 \\\\ 2 & 5 \\end{bmatrix}.$$

The **quadratic form** $x^T A x$ becomes $\\sum_i \\lambda_i y_i^2$ in the coordinates $y = Q^T x$. So on the unit sphere, $x^TAx$ is largest at $\\lambda_{\\max}$ and smallest at $\\lambda_{\\min}$, attained at the corresponding eigenvectors. For this $A$, the maximum on the unit circle is 6 at $q_1$.

\`\`\`interactive
matrix-transform
{"title": "A symmetric matrix: perpendicular eigenvectors", "A": [[2, 2], [2, 5]], "x": [0.6, 0.2], "view": 3, "symmetric": true, "mode": "eigen", "modes": ["eigen", "quadratic"], "presets": ["symmetric", "definite", "indefinite", "semidefinite"], "caption": "Edit the entries (the two off-diagonal entries stay equal): however you change them, the two eigenlines stay at right angles, here along (1, 2) for λ = 6 and (2, −1) for λ = 1. Switch to Quadratic form to see the level curves of xᵀAx; drag x around the unit circle and watch the Rayleigh quotient reach its largest value 6 at q₁ and its smallest value 1 at q₂."}
\`\`\`

In NumPy, use \`np.linalg.eigh\` for symmetric matrices, not \`eig\`. It is faster, guarantees real eigenvalues in ascending order, and returns orthonormal eigenvectors. Note the ordering: the largest eigenvalue is last.`,
          resources: [
            main(ila, 'The material on symmetric matrices and quadratic forms.'),
            also(mit1806, 'The session on symmetric matrices and positive definiteness.'),
            also(npLinalg, 'See `eigh`, and compare it with `eig`.'),
          ],
          exercises: [
            {
              slug: 'orthogonally-diagonalise',
              title: 'Orthogonally diagonalise',
              prompt:
                'The matrix with rows $(2, -1, 0), (-1, 2, -1), (0, -1, 2)$ has eigenvalues $2 - \\sqrt{2}$, 2, $2 + \\sqrt{2}$. Find the eigenvectors, normalise them, check that they are orthonormal, and verify $A = Q\\Lambda Q^T$ exactly in SymPy.',
              kind: 'problem',
              difficulty: 2,
              hint: 'Try vectors of the form $(1, s, 1)$ and $(1, 0, -1)$.',
            },
            {
              slug: 'real-eigenvalues-proof',
              title: 'Eigenvalues are real',
              prompt:
                'Let $A$ be real symmetric, and suppose $Av = \\lambda v$ with $v$ a complex non-zero vector and $\\lambda$ complex. By computing $\\bar{v}^T A v$ in two ways, prove that $\\lambda$ is real. Then show that the real matrix with rows $(1, 1), (-1, 1)$ fails the conclusion and identify where the proof breaks.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'quadratic-form-extremes',
              title: 'Extremes of a quadratic form',
              prompt:
                'For $A$ with rows $(2, 2), (2, 5)$, evaluate $x^T A x$ at 1000 points on the unit circle and plot it against angle. Confirm that the maximum is 6 and the minimum is 1, attained at the normalised eigenvectors. Then time `eig` and `eigh` on a random symmetric matrix with $n = 1500$, and compare $\\|Q^TQ - I\\|$ for each. Finally, prove the claim for general $n$ using the coordinates $y = Q^T x$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the spectral theorem, including its hypothesis.',
              answerOutline: 'A real symmetric matrix has real eigenvalues and an orthonormal basis of eigenvectors, so $A = Q\\Lambda Q^T$ with $Q$ orthogonal.',
            },
            {
              question: 'Why are eigenvectors of a symmetric matrix for different eigenvalues orthogonal?',
              answerOutline: 'Because $(Au)\\cdot v = u\\cdot(Av)$ gives $(\\lambda - \\mu)u\\cdot v = 0$.',
            },
            {
              question: 'Is a matrix with orthogonal eigenvectors necessarily symmetric?',
              answerOutline:
                'If it has a real orthonormal eigenbasis with real eigenvalues, yes. But a rotation has orthogonal complex eigenvectors and is not symmetric, because its eigenvalues are complex.',
            },
          ],
        },
        {
          slug: 'positive-definite-matrices',
          title: 'Positive definite matrices',
          summary:
            'Recognise matrices whose quadratic form is always positive, and factor them with the fast Cholesky algorithm.',
          estimatedMinutes: 110,
          objectives: [
            'Apply the equivalent tests for positive definiteness',
            'Compute a Cholesky factorisation by hand and with NumPy',
            'Interpret level sets of a quadratic form as ellipsoids',
            'Connect $Ax = b$ with minimising a quadratic',
          ],
          concepts: [
            'Positive definite',
            'Positive semidefinite',
            'Leading principal minors',
            'Cholesky factorisation',
            'Ellipsoid',
            'Energy function',
          ],
          explanation: `A real symmetric matrix $A$ is **positive definite** if $x^T A x > 0$ for every non-zero $x$, and **positive semidefinite** if $x^TAx \\ge 0$ for all $x$. The definition is hard to check directly, but for symmetric $A$ these conditions are all equivalent:

1. $x^T A x > 0$ for all $x \\neq 0$.
2. All eigenvalues are positive.
3. All pivots are positive, in elimination without row swaps.
4. All leading principal minors (the determinants of the upper-left $k \\times k$ blocks) are positive.
5. $A = R^T R$ for some invertible matrix $R$.

Symmetry is part of the definition here. A pitfall: test 4 does not extend to semidefinite matrices by replacing $>$ with $\\ge$. The matrix $\\mathrm{diag}(0, -1)$ has leading minors $0$ and $0$ and is not positive semidefinite.

**Worked example.** Let
$$A = \\begin{bmatrix} 4 & 2 \\\\ 2 & 3 \\end{bmatrix}.$$
The leading minors are $4$ and $12 - 4 = 8$, both positive. Elimination gives pivots 4 and $3 - \\tfrac{2}{4} \\cdot 2 = 2$. Completing the square shows the same numbers:
$$x^TAx = 4x_1^2 + 4x_1x_2 + 3x_2^2 = 4\\left(x_1 + \\tfrac12 x_2\\right)^2 + 2x_2^2.$$
This is a sum of squares with positive weights, and it is zero only when $x_1 = x_2 = 0$. The **Cholesky factorisation** writes $A = LL^T$, with $L$ lower triangular and positive on the diagonal. Here
$$L = \\begin{bmatrix} 2 & 0 \\\\ 1 & \\sqrt{2} \\end{bmatrix},$$
and multiplying out confirms $LL^T = A$. The entries come from solving row by row: $L_{11}^2 = 4$, then $2L_{21} = 2$, then $1 + L_{22}^2 = 3$.

Cholesky costs about $\\tfrac13 n^3$ operations, half of LU, needs no pivoting and is stable. It is also the standard way to test positive definiteness numerically: try it and see whether it fails. \`np.linalg.cholesky\` raises \`LinAlgError\` if the matrix is not positive definite. Be careful, though: it reads only the lower triangle and does not check symmetry. Given rows $(1, 5), (0, 1)$, it returns the identity with no error.

Geometrically, $x^TAx = 1$ is an ellipsoid with axes along the eigenvectors and semi-axis lengths $1/\\sqrt{\\lambda_i}$, as the interactive below shows in the plane. Positive definite matrices also connect linear systems with optimisation: the bowl $\\tfrac12 x^T A x - b^T x$ has its unique minimum at the solution of $Ax = b$. Finally, $A^TA$ is always positive semidefinite, and it is positive definite exactly when $A$ has independent columns.

\`\`\`interactive
matrix-transform
{"title": "Level curves of xᵀAx", "A": [[4, 2], [2, 3]], "x": [0.5, 0.25], "view": 2, "mode": "quadratic", "modes": ["quadratic"], "presets": ["definite", "semidefinite", "indefinite"], "caption": "For the worked example the level curves are ellipses, with axes along the eigenvectors and semi-axes 1/√λ on the level xᵀAx = 1; the readouts give the pivots 4 and 2 and the leading minors 4 and 8. Raise the off-diagonal entry towards and past √12 ≈ 3.46: when det A reaches 0 the ellipses open into parallel lines (semidefinite), and beyond it they become hyperbolas, with negative values (amber) where the form dips below zero (indefinite). Drag x to read xᵀAx anywhere."}
\`\`\``,
          resources: [
            main(mit1806, 'The sessions on positive definite matrices and minima.'),
            also(ula, 'The section on quadratic forms.'),
            also(npLinalg, 'See `cholesky`, including what it does and does not check.'),
          ],
          exercises: [
            {
              slug: 'test-for-definiteness',
              title: 'Test for definiteness',
              prompt:
                'Find all real $b$ for which the matrix with rows $(1, b), (b, 1)$ is positive definite, and all $b$ for which it is positive semidefinite. Then show by leading minors, by pivots and by eigenvalues that the matrix with rows $(2, -1, 0), (-1, 2, -1), (0, -1, 2)$ is positive definite. The pivots are $2, 3/2, 4/3$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'write-cholesky',
              title: 'Write Cholesky',
              prompt:
                'Implement Cholesky from the formula for $L_{ij}$. Raise an error if a value under a square root is not positive, and reject non-symmetric input. Test against `np.linalg.cholesky` on 100 matrices $B^TB + I$. Confirm that a run on an indefinite matrix fails at the right step, and that your code rejects rows $(1, 5), (0, 1)$, which NumPy accepts silently. Measure how much faster `scipy.linalg.cho_factor` is than `lu_factor` at $n = 3000$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'minimum-of-a-quadratic',
              title: 'Linear systems as minimisation',
              prompt:
                'Let $A$ be symmetric positive definite and let $Ax^* = b$. Prove that $\\tfrac12 x^TAx - b^Tx = \\tfrac12(x - x^*)^T A (x - x^*) - \\tfrac12 (x^*)^T A x^*$. Deduce that $x^*$ is the unique minimiser. Then show that $A^TA$ is positive semidefinite for every real $A$, and positive definite exactly when $A$ has independent columns.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Give three equivalent tests for a symmetric matrix to be positive definite.',
              answerOutline: 'Any three of: positive quadratic form, positive eigenvalues, positive pivots, positive leading principal minors, $A = R^TR$ with $R$ invertible.',
            },
            {
              question: 'Why does Cholesky not need pivoting?',
              answerOutline: 'Positive definiteness guarantees positive pivots, and the entries of $L$ are bounded by the diagonal of $A$, so there is no growth.',
            },
            {
              question: 'Does a positive determinant and positive trace imply positive definiteness?',
              answerOutline: 'For a symmetric $2 \\times 2$ matrix, yes, since the eigenvalues have positive sum and product. For larger matrices no: $\\mathrm{diag}(-1, -1, 3)$ has trace 1 and determinant 3 and is indefinite. It also requires symmetry.',
            },
          ],
        },
        {
          slug: 'singular-value-decomposition',
          title: 'The singular value decomposition',
          summary:
            'Every matrix, of any shape, is a rotation, a scaling and another rotation.',
          estimatedMinutes: 140,
          objectives: [
            'State the SVD and describe what each factor means',
            'Compute an SVD of a small matrix from $A^T A$',
            'Read rank, the four subspaces and the condition number from the SVD',
            'Use `np.linalg.svd` correctly',
          ],
          concepts: [
            'Singular values',
            'Left and right singular vectors',
            'Full and reduced SVD',
            'Rank from singular values',
            'Geometry of the unit sphere image',
            'Relation to $A^TA$',
          ],
          explanation: `Eigenvalues need a square matrix and sometimes fail to give a full basis. The **singular value decomposition** has no such limits: every real $m \\times n$ matrix can be written as
$$A = U\\Sigma V^T,$$
where $U$ is $m \\times m$ orthogonal, $V$ is $n \\times n$ orthogonal, and $\\Sigma$ is $m \\times n$ and diagonal, with entries $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0$, the **singular values**. Equivalently, $Av_i = \\sigma_i u_i$. So $A$ takes one orthonormal basis to another, stretching by $\\sigma_i$. Geometrically, it sends the unit sphere to an ellipsoid with semi-axes $\\sigma_i u_i$.

To find it, note that $A^TA = V(\\Sigma^T\\Sigma)V^T$. So the $v_i$ are orthonormal eigenvectors of the symmetric matrix $A^TA$, and $\\sigma_i = \\sqrt{\\lambda_i}$. For $\\sigma_i > 0$, set $u_i = Av_i/\\sigma_i$. Those vectors are automatically orthonormal. Extend them to a full basis if needed.

**Worked example.** Let
$$A = \\begin{bmatrix} 1 & 1 \\\\ 0 & 1 \\\\ 1 & 0 \\end{bmatrix}, \\qquad A^TA = \\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}.$$
The eigenvalues of $A^TA$ are 3 and 1, so $\\sigma_1 = \\sqrt{3}$ and $\\sigma_2 = 1$, with $v_1 = (1, 1)/\\sqrt{2}$ and $v_2 = (1, -1)/\\sqrt{2}$. Then
$$u_1 = \\frac{Av_1}{\\sqrt{3}} = \\frac{(2, 1, 1)}{\\sqrt{6}}, \\qquad u_2 = Av_2 = \\frac{(0, -1, 1)}{\\sqrt{2}}.$$
Complete the basis with a unit vector perpendicular to both: $u_3 = (1, -1, -1)/\\sqrt{3}$. Now check that $\\sigma_1 u_1 v_1^T + \\sigma_2 u_2 v_2^T = A$.

This example is $3 \\times 2$, so its picture lives in $\\mathbb{R}^3$. The interactive shows the same geometry for $2 \\times 2$ matrices in the plane.

\`\`\`interactive
matrix-transform
{"title": "The unit circle becomes an ellipse", "A": [[2, 1], [1, 2]], "x": [1, 0], "mode": "svd", "modes": ["svd", "eigen", "transform"], "presets": ["shear", "rotation", "projection", "singular", "scaling"], "caption": "This is A with rows (2, 1), (1, 2), from the exercise: the circle maps to an ellipse with semi-axes σ₁u₁ and σ₂u₂ of lengths 3 and 1, and the dashed v₁, v₂ on the circle are the directions that land on them. Drag x around the circle: |Ax| is largest at v₁ and smallest at v₂. Type rows (1, 2), (0, 1): the singular values become 1 + √2 and √2 − 1, while both eigenvalues are 1, so singular values are not |eigenvalues| for a non-symmetric matrix. The Singular preset squashes the ellipse to a segment, σ₂ = 0."}
\`\`\`

The SVD exposes the whole structure. The rank $r$ is the number of non-zero singular values. The first $r$ columns of $U$ span $C(A)$, and the rest span $N(A^T)$. The first $r$ columns of $V$ span the row space, and the rest span $N(A)$. The largest stretch is $\\|A\\|_2 = \\sigma_1$, and for an invertible matrix $\\kappa(A) = \\sigma_1/\\sigma_n$. Do not assume that singular values are the absolute values of eigenvalues: that holds for symmetric matrices but not in general.

\`U, s, Vt = np.linalg.svd(A, full_matrices=False)\` returns the **reduced** form, with \`s\` as a vector, and note that it returns $V^T$, not $V$. So \`Vt[0]\` (a row) is $v_1$. Singular vectors have sign ambiguity: you may flip $u_i$ and $v_i$ together. Do not compute the SVD through $A^TA$ in software. As with least squares, that squares the condition number and destroys small singular values. Use the library routine, which works on $A$ directly.`,
          resources: [
            main(mit1806, 'The session on the singular value decomposition, with its recitation.'),
            also(mit18065, 'The lectures on the SVD and its uses in data analysis.'),
            also(
              {
                title: 'numpy.linalg.svd',
                url: 'https://numpy.org/doc/stable/reference/generated/numpy.linalg.svd.html',
                type: 'documentation',
                cost: 'free',
                provider: 'NumPy',
              },
              'Check the shapes of the return values, and the meaning of `full_matrices`.',
            ),
          ],
          exercises: [
            {
              slug: 'svd-by-hand',
              title: 'Two SVDs by hand',
              prompt:
                'Find an SVD of the diagonal matrix with rows $(2, 0), (0, -3)$. Note that $\\sigma_1 = 3$, so the columns must be ordered, and the minus sign has to go into $U$ or $V$. Then find an SVD of the matrix with rows $(1, 1), (1, 1)$, which has rank 1, and give bases of all four subspaces from it.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'circle-to-ellipse',
              title: 'See the ellipse',
              prompt:
                'For $A$ with rows $(2, 1), (1, 2)$, map 200 points of the unit circle and plot the image. Compute the SVD and overlay the semi-axes $\\sigma_i u_i$, which should have lengths 3 and 1. Plot the $v_i$ on the original circle. Then repeat with the non-symmetric matrix with rows $(1, 2), (0, 1)$, and show that its singular values are not the absolute values of its eigenvalues.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'why-not-through-ata',
              title: 'Why not compute it through the normal matrix',
              prompt:
                'Build a $10 \\times 10$ matrix with known singular values $10^{0}, 10^{-1}, \\dots, 10^{-9}$ from random orthogonal factors. Compare the true values with `np.linalg.svd(A)` and with the square roots of the eigenvalues of $A^TA$. Report the relative error of each estimate of the smallest values. Explain the result using the size of $\\varepsilon\\sigma_1^2$ compared with $\\sigma_n^2$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'orthonormal-left-vectors',
              title: 'Why the left vectors are orthonormal',
              prompt:
                'Let $v_1, \\dots, v_r$ be orthonormal eigenvectors of $A^TA$ with positive eigenvalues $\\sigma_i^2$, and set $u_i = Av_i/\\sigma_i$. Prove that the $u_i$ are orthonormal. Prove that $A^TA$ and $AA^T$ have the same non-zero eigenvalues. Finally, prove that the non-zero singular values of a real symmetric matrix are the absolute values of its non-zero eigenvalues.',
              kind: 'derivation',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'How do the singular values relate to $A^TA$?',
              answerOutline: 'They are the square roots of the eigenvalues of $A^TA$.',
            },
            {
              question: 'How do you read off rank and the condition number from an SVD?',
              answerOutline: 'Rank is the number of non-zero singular values. For invertible $A$, $\\kappa_2 = \\sigma_1/\\sigma_n$.',
            },
            {
              question: 'What is the difference between `Vt` and $V$ in the NumPy output?',
              answerOutline: '`Vt` is $V^T$, so the right singular vectors are its rows. `Vt[i]` is $v_{i+1}$.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/svd-and-pca/singular-value-decomposition'],
        },
        {
          slug: 'low-rank-approximation',
          title: 'Low-rank approximation',
          summary:
            'Truncate the SVD to get the best possible approximation of a given rank, and use it to compress images.',
          estimatedMinutes: 120,
          objectives: [
            'Write a matrix as a sum of rank-one terms from its SVD',
            'State the Eckart-Young theorem',
            'Compute the approximation error from singular values',
            'Estimate the storage saved by a truncated SVD',
          ],
          concepts: [
            'Rank-one terms',
            'Truncated SVD',
            'Eckart-Young theorem',
            'Frobenius norm',
            'Spectral norm',
            'Compression ratio',
          ],
          explanation: `The SVD writes a matrix of rank $r$ as a sum of rank-one pieces, arranged in order of importance:
$$A = \\sigma_1 u_1 v_1^T + \\sigma_2 u_2 v_2^T + \\dots + \\sigma_r u_r v_r^T.$$
Stopping after $k$ terms gives the **truncated SVD** $A_k$, which has rank $k$.

**Eckart-Young theorem.** For every $k < r$, and every matrix $B$ of rank at most $k$,
$$\\|A - B\\|_2 \\ge \\|A - A_k\\|_2 = \\sigma_{k+1},$$
$$\\|A - B\\|_F \\ge \\|A - A_k\\|_F = \\sqrt{\\sigma_{k+1}^2 + \\dots + \\sigma_r^2}.$$
Here $\\|\\cdot\\|_F$ is the **Frobenius norm**, the square root of the sum of squared entries, and $\\|\\cdot\\|_2$ is the largest stretch. So $A_k$ is the best rank-$k$ approximation in both senses. When $\\sigma_k = \\sigma_{k+1}$, the best approximation is not unique, but the minimum error still holds. This is a strong result: the problem of choosing the best $B$ among all low-rank matrices has an exact answer, computed directly.

**Worked example.** From the last lesson, $A$ has rows $(1, 1), (0, 1), (1, 0)$, with $\\sigma_1 = \\sqrt{3}$, $\\sigma_2 = 1$. The best rank-one approximation is
$$A_1 = \\sqrt{3} \\cdot \\frac{(2, 1, 1)^T}{\\sqrt{6}} \\cdot \\frac{(1, 1)}{\\sqrt{2}} = \\frac12 \\begin{bmatrix} 2 \\\\ 1 \\\\ 1 \\end{bmatrix}\\begin{bmatrix} 1 & 1 \\end{bmatrix} = \\begin{bmatrix} 1 & 1 \\\\ 0.5 & 0.5 \\\\ 0.5 & 0.5 \\end{bmatrix}.$$
The error matrix $A - A_1$ has rows $(0, 0), (-0.5, 0.5), (0.5, -0.5)$. Its Frobenius norm is $\\sqrt{4 \\times 0.25} = 1$, and its largest singular value is 1. Both match the theorem's value, $\\sigma_2 = 1$.

**Compression.** A rank-$k$ approximation needs $k$ left vectors, $k$ right vectors and $k$ singular values, or $k(m + n + 1)$ numbers rather than $mn$. For a $512 \\times 512$ greyscale image with $k = 20$, that is 20,500 numbers rather than 262,144, about one thirteenth of the size. Real images compress well because their singular values fall quickly. A matrix of random noise does not, and its singular values decay slowly.

\`\`\`interactive
low-rank-image
{"title": "Compress a 48 × 48 picture with the truncated SVD", "k": 5, "caption": "The picture is a 48 × 48 matrix of brightness values and its SVD is computed in your browser. Slide k: by rank 10 the house is recognisable using 970 numbers instead of 2304. The relative error readout from the singular values alone matches the one computed from the pixels, as Eckart-Young says. Switch to 'Only the k-th term' to see that each piece is a rank-one outer product of a column pattern and a row pattern. Then pick Noise: its singular values fall slowly, and no small k looks right."}
\`\`\`

The relative Frobenius error is exactly $\\sqrt{\\sum_{i>k}\\sigma_i^2 / \\sum_i\\sigma_i^2}$, so you can choose $k$ from the singular values alone, without forming $A_k$. In code, \`(U[:, :k] * s[:k]) @ Vt[:k]\` builds $A_k$ efficiently, since multiplying by \`s[:k]\` scales each column. For a large sparse matrix, \`scipy.sparse.linalg.svds\` finds only the top $k$ triplets.`,
          resources: [
            main(mit18065, 'The lecture on low-rank approximation and the Eckart-Young theorem.'),
            also(fastNla, 'The topic modelling and background removal lessons, which use truncated SVDs.'),
            also(eola, 'Review the videos on matrices as transformations, then think of each term as a rank-one map.'),
          ],
          exercises: [
            {
              slug: 'errors-from-singular-values',
              title: 'Errors from singular values',
              prompt:
                'A matrix has singular values 10, 5, 2, 1. Without knowing the matrix, give the spectral and Frobenius errors of its best rank-2 approximation, and the relative Frobenius error. You should find $2$, $\\sqrt{5}$ and about $0.196$. Then build such a $6 \\times 4$ matrix from random orthonormal factors and confirm all three numbers.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'compress-a-photo',
              title: 'Compress a photo',
              prompt:
                'Load a greyscale photo as a matrix with entries in $[0, 1]$. For $k = 1, 5, 20, 50, 100$, show the reconstruction, the compression ratio $k(m + n + 1)/(mn)$, and the relative Frobenius error. Plot the singular values on a log scale. Confirm that the error computed directly matches the formula from the singular values to within $10^{-10}$. Repeat with a matrix of uniform random noise of the same shape, and compare the two singular value curves.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'rank-one-by-hand',
              title: 'Best rank-one by hand',
              prompt:
                'Find the best rank-one approximation of the matrix with rows $(2, 0), (0, 3)$. Its error in the spectral norm should be 2. Now show that the best approximation of $I_2$ by a rank-one matrix is not unique, by giving two different optimal ones. Explain which hypothesis of uniqueness fails.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the Eckart-Young theorem in one sentence.',
              answerOutline: 'The truncated SVD $A_k$ is a closest rank-$k$ matrix to $A$ in both the spectral and Frobenius norms, with errors determined by the discarded singular values.',
            },
            {
              question: 'How many numbers does a rank-$k$ SVD store for an $m \\times n$ matrix?',
              answerOutline: '$k(m + n + 1)$: $km$ for $U$, $kn$ for $V$, and $k$ for the singular values.',
            },
            {
              question: 'Why does an image compress better than random noise?',
              answerOutline: 'Images have correlated structure, so their singular values fall quickly. Noise has no such structure and its energy is spread across many singular values.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/svd-and-pca/low-rank-approximation'],
        },
        {
          slug: 'pseudoinverse-and-pca',
          title: 'The pseudoinverse and principal component analysis',
          summary:
            'Use the SVD to solve any least-squares problem, and to find the main directions of variation in data.',
          estimatedMinutes: 130,
          objectives: [
            'Compute the pseudoinverse from an SVD',
            'Explain why $A^+ b$ is the minimum-norm least-squares solution',
            'Carry out PCA through the SVD of a centred data matrix',
            'State what PCA can and cannot show',
          ],
          concepts: [
            'Moore-Penrose pseudoinverse',
            'Minimum-norm solution',
            'Centring data',
            'Principal components',
            'Explained variance',
            'Scaling features',
          ],
          explanation: `The SVD finishes two stories from earlier in the course. The first is rank-deficient least squares. The **pseudoinverse** of $A = U\\Sigma V^T$ is
$$A^+ = V\\Sigma^+U^T,$$
where $\\Sigma^+$ is the transpose of $\\Sigma$ with each non-zero $\\sigma_i$ replaced by $1/\\sigma_i$. Then $x = A^+b$ is the least-squares solution of $Ax = b$ with the smallest norm. In the coordinates of $U$ and $V$, the problem decouples into one equation per singular value. The components of $x$ along the null space do not affect $Ax$, so the minimum-norm solution sets them to zero, and that is what $A^+$ does. If $A$ has independent columns, then $A^+ = (A^TA)^{-1}A^T$. For $A$ with rows $(1, 1), (0, 1), (1, 0)$, this gives
$$A^+ = \\frac13\\begin{bmatrix} 1 & -1 & 2 \\\\ 1 & 2 & -1 \\end{bmatrix}.$$
In software, singular values below a tolerance are treated as zero. Without that step, dividing by a tiny $\\sigma_i$ amplifies noise enormously.

The second is **principal component analysis**. Put $N$ observations of $d$ variables in the rows of a matrix, then subtract the mean of each column. For this centred matrix $X = U\\Sigma V^T$, the sample covariance matrix is $X^TX/(N - 1)$. Its eigenvectors are the columns of $V$, the **principal directions**, and the variance along $v_i$ is $\\sigma_i^2/(N - 1)$. The first principal direction is the direction along which the data varies most. Keeping $k$ directions gives the best $k$-dimensional summary, by Eckart-Young.

**Worked example.** Take four points that are already centred: $(3, 1), (-3, -1), (1, -1), (-1, 1)$. Then
$$X^TX = \\begin{bmatrix} 20 & 4 \\\\ 4 & 4 \\end{bmatrix},$$
with eigenvalues $\\lambda = 12 \\pm 4\\sqrt{5}$, which are about $20.94$ and $3.06$. These are the squared singular values, and the first direction explains $20.94/24 \\approx 87.3\\%$ of the total variance. The eigenvector for $20.94$ satisfies $(20 - 20.94)a + 4b = 0$, so $b \\approx 0.236a$, and normalising gives $v_1 \\approx (0.973, 0.230)$. Projecting the data onto $v_1$ gives the best one-dimensional summary.

\`\`\`interactive
least-squares
{"mode": "pca", "title": "The first principal direction of four points", "points": [[3, 1], [-3, -1], [1, -1], [-1, 1]], "view": [-4.5, 4.5, -3, 3], "xName": "x₁", "yName": "x₂", "caption": "The green line through the mean is the direction v₁ ≈ (0.973, 0.230), and the readouts show XᵀX, its eigenvalues 20.94 and 3.06 and the 87.3% share. The red segments are perpendicular distances: their squares add up to σ₂² = 3.06, the smallest possible for any line through the mean. Turn on the regression line to see that least squares, which measures vertical errors, picks a different line. Drag a point and the mean moves with it: PCA always works with centred data."}
\`\`\`

Three cautions. Forget to centre, and the first direction largely points at the mean instead of along the spread. Variables in different units need scaling first, because PCA otherwise follows whichever variable has the largest numbers. And components are combinations chosen for variance alone, so a large component need not be meaningful, and PCA ignores any label you care about. Compute with the SVD of $X$, not by eigendecomposition of the covariance matrix.`,
          resources: [
            main(mit18065, 'The lectures on the pseudoinverse and on principal component analysis.'),
            also(ula, 'The sections on the singular value decomposition and on PCA.'),
            also(npLinalg, 'See `pinv` and its `rcond` argument.'),
          ],
          exercises: [
            {
              slug: 'pseudoinverse-by-hand',
              title: 'A pseudoinverse by hand',
              prompt:
                'Using the SVD you found earlier, show that the pseudoinverse of the matrix with rows $(1, 1), (1, 1)$ has every entry equal to $1/4$. Use it to find the minimum-norm solution of $x_1 + x_2 = 2$ written twice, and of the inconsistent system $x_1 + x_2 = 1$, $x_1 + x_2 = 3$. Check both with `np.linalg.pinv` and `lstsq`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'penrose-conditions',
              title: 'The Penrose conditions',
              prompt:
                'Using $A^+ = V\\Sigma^+U^T$, prove that $AA^+A = A$, $A^+AA^+ = A^+$, and that $AA^+$ and $A^+A$ are symmetric. Identify $AA^+$ and $A^+A$ as orthogonal projections, and say onto which of the four subspaces.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'centring-matters',
              title: 'Why you must centre',
              prompt:
                'Generate 200 points in the plane with independent coordinates of standard deviation 3 and 0.5, shifted to have mean $(10, 10)$. Find the first right singular vector of the raw data and of the centred data. The raw one should point close to $(1, 1)/\\sqrt{2}$ and the centred one close to the $x$-axis. Explain both results using the fact that the SVD measures distance from the origin.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'pca-on-real-data',
              title: 'PCA on real data',
              prompt:
                'Load `sklearn.datasets.load_wine`, which has 178 samples and 13 chemical measurements. Using only NumPy, centre and scale the columns, compute the SVD, and report the explained variance ratios. Plot the data on the first two components, coloured by the class label, which PCA did not use. Repeat without scaling, and explain the difference by looking at the standard deviations of the columns. Finally, check your ratios against `sklearn.decomposition.PCA`.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'When does $A^+$ equal $A^{-1}$?',
              answerOutline: 'When $A$ is square and invertible.',
            },
            {
              question: 'Why does $A^+b$ have minimum norm among least-squares solutions?',
              answerOutline: 'All least-squares solutions differ by a null space vector, and $A^+b$ lies in the row space, which is orthogonal to the null space.',
            },
            {
              question: 'Why compute PCA by the SVD of $X$ rather than the eigenvectors of $X^TX$?',
              answerOutline: 'Forming $X^TX$ squares the condition number and loses accuracy in the small components. The SVD works on $X$ directly.',
            },
            {
              question: 'What does PCA not tell you?',
              answerOutline: 'It does not show which directions matter for a particular question or label, nor that components have causal or physical meaning. Results also depend on scaling.',
            },
          ],
          relatedLessons: ['linear-algebra-for-data-science/svd-and-pca/principal-component-analysis'],
        },
      ],
    },
  ],
  capstone: {
    slug: 'svd-toolkit',
    title: 'A matrix decomposition toolkit',
    description: `Build a small Python library of matrix decompositions on top of plain NumPy array operations, then use it on three real tasks. The library must include your own LU with pivoting, Householder or modified Gram-Schmidt QR, a symmetric eigenvalue routine based on power iteration with deflation or on the QR algorithm, and a truncated SVD built from those pieces. The applications are image compression, least-squares model fitting with a study of conditioning, and principal component analysis of a data set of your choice. The point is to connect every module of the course: elimination, subspaces, orthogonality, eigenvalues and low-rank structure each do real work in the result.`,
    deliverables: [
      'A documented Python package with `lu`, `qr`, `eigh_top_k` and `svd_top_k` functions and a test suite that compares each one with NumPy or SciPy on random and on ill-conditioned inputs',
      'An image compression study: a plot of relative error against storage for $k$ from 1 to 200, checked against the Eckart-Young prediction from the singular values',
      'A least-squares study that fits one model through the normal equations, through QR and through the SVD, with a table of accuracy against condition number',
      'A PCA of a real data set, with a scree plot, a two-dimensional projection and a paragraph on what the components mean',
      'A report of at most six pages stating what each decomposition is for, where your implementation is slower or less accurate than the library, and why',
    ],
    estimatedHours: 15,
    stretchGoals: [
      'Implement randomised SVD and compare its speed and accuracy with your deterministic version',
      'Use Lanczos or sparse matrix-vector products so that the top singular values scale to a sparse matrix with a million non-zeros',
    ],
  },
  masteryChecklist: [
    'I can solve a linear system by hand and with an LU factorisation, and explain what pivoting protects against',
    'I can find bases for the four fundamental subspaces of a matrix and state how they relate',
    'I can compute the matrix of a linear map in any basis and interpret the determinant as a volume scale',
    'I can solve a least-squares problem with QR and explain why that beats the normal equations',
    'I can diagonalise a matrix when possible and use eigenvalues to predict the long-run behaviour of a dynamical system or Markov chain',
    'I can compute and interpret an SVD, and use it for low-rank approximation and PCA',
    'I can predict how many digits to trust in a numerical result from the condition number',
  ],
});
