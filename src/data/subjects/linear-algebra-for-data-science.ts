import { defineSubject } from '../define';

export default defineSubject({
  id: 'linear-algebra-for-data-science',
  title: 'Linear Algebra for Data Science',
  category: 'data-science',
  tagline:
    'Practical, computer-based linear algebra: a dataset is a matrix, and regression, networks, PCA and recommenders are what you can do with one. Plus an honest account of where linear methods fail.',
  description: `A dataset is a matrix. Once you see that, a large share of data science turns into questions about matrices: a regression is a projection, a ranking of web pages is an eigenvector, a recommender is a low-rank factorisation, and PCA is a singular value decomposition. This course teaches linear algebra from that direction, with real data and Python from the first lesson. It follows the topics in the public catalog description of MATH 227 (Linear Algebra for Data Science) at the University of Illinois Urbana-Champaign, the linear algebra course in the Illinois data science core, which is practical and computer-based. All the content here is original, and this course is not affiliated with Illinois.

You start by treating vectors and matrices as data, using NumPy, norms, distances and cosine similarity. You then learn how linear systems are solved, and what rank, null spaces and conditioning say about your data. Orthogonality gives you least squares and linear regression without any calculus. Eigenvalues give you Markov chains, PageRank and graph Laplacians. The singular value decomposition gives you low-rank approximation, PCA and recommender-style factorisation. The last module covers scale, with sparse matrices and iterative and randomised methods, and it is frank about limits: outliers, non-linear structure, and what a linear method cannot see.

Proofs appear when they explain something, and the emphasis is on computing, checking and interpreting. Every result is tried on data, and each exercise asks what the result does and does not show. It assumes the Python, pandas and basic plotting from Data Science Discovery. Two machine problems and a final project use real sports, flight and voting data. Mathematical Methods for Physics covers the same theory from a physicist's angle, and Machine Learning builds directly on this course.`,
  difficulty: 'intermediate',
  estimatedHours: 60,
  prerequisites: ['data-science-discovery'],
  recommendedBackground: [
    'Python as taught in Data Science Discovery: functions, loops, pandas and basic plots',
    'High-school algebra',
    'Calculus is helpful for a few remarks, and it is not required',
  ],
  tags: ['linear algebra', 'numpy', 'regression', 'pca', 'svd', 'networks', 'data science', 'mathematics'],
  core: false,
  modules: [
    {
      slug: 'vectors-and-matrices-as-data',
      title: 'Vectors and Matrices as Data',
      description:
        'NumPy arrays, feature matrices, and the geometry of data: norms, distances and cosine similarity. Then matrix multiplication as an operation that does useful work.',
      lessons: [
        {
          slug: 'numpy-and-feature-matrices',
          title: 'NumPy and feature matrices',
          summary:
            'Moving from a DataFrame to an array: rows as observations, columns as features, vectorised arithmetic, broadcasting, and why shape comes first.',
          estimatedMinutes: 90,
          objectives: [
            'Convert a pandas DataFrame into a NumPy feature matrix',
            'Index, slice and reshape arrays, and always state the shape',
            'Add vectors and multiply by scalars, and interpret both for data',
            'Use broadcasting to centre and standardise a matrix',
            'Compute a dot product and use it to compute a weighted score',
          ],
          concepts: [
            'Vector as a row or column of data',
            'Feature matrix $X \\in \\mathbb{R}^{n \\times p}$',
            'Array shape',
            'Vectorisation',
            'Broadcasting',
            'Linear combination',
            'Dot product',
            'Centring and standardising',
          ],
          explanation: `A **vector** is a list of numbers, and in data science it usually describes one thing: a car's mileage, weight and power, or one feature measured across all cars. Stack the observations as rows and you have a **feature matrix** $X$ with $n$ rows and $p$ columns, written $X \\in \\mathbb{R}^{n \\times p}$. Each row is a point in $p$-dimensional space, and each column is a point in $n$-dimensional space. Both views are useful.

\`\`\`python
import numpy as np, pandas as pd
cars = pd.read_csv("mtcars.csv", index_col=0)
X = cars[["mpg", "disp", "hp", "wt"]].to_numpy(float)
X.shape            # (32, 4): 32 rows, 4 columns
X[0]               # first car, shape (4,)
X[:, 3]            # weight column, shape (32,)
\`\`\`

Make it a habit to say the shape of every array. Most linear algebra bugs are shape bugs.

**Vector arithmetic.** Adding vectors and multiplying by a number work entry by entry. A **linear combination** $c_1 a_1 + c_2 a_2$ is the basic operation of the subject. A shopping total, a weighted grade and a linear model's prediction are all linear combinations.

**The dot product** multiplies matching entries and adds:

$$a \\cdot b = a^T b = \\sum_{i} a_i b_i.$$

If $w$ holds weights and $x$ holds features, then $w \\cdot x$ is a weighted score. In code it is \`w @ x\`.

**Vectorise.** Replace loops with array operations. \`X * 2\`, \`X + Y\` and \`X.mean(axis=0)\` run in compiled code, and they are shorter and much faster. \`axis=0\` collapses rows, giving one value per column.

**Broadcasting** lets arrays of different shapes combine when their trailing dimensions match. To standardise every column,

\`\`\`python
Z = (X - X.mean(axis=0)) / X.std(axis=0, ddof=1)
\`\`\`

Here a \`(32, 4)\` matrix meets a \`(4,)\` vector, which NumPy stretches across the rows. A common bug: subtracting a row mean of shape \`(32,)\` from \`X\` fails, and you need \`keepdims=True\`.

**Why standardise?** The columns above have variances from about 1 to about 15,000, so units alone would dominate any distance. Standardising puts them on a comparable scale, and the next lesson shows what that changes.

Work through the NumPy beginner's guide with this data, rather than toy arrays.`,
          resources: [
            { title: 'NumPy: the absolute basics for beginners', url: 'https://numpy.org/doc/stable/user/absolute_beginners.html', type: 'documentation', cost: 'free', provider: 'NumPy', note: 'Arrays, shapes, indexing and basic operations.', primary: true },
            { title: 'NumPy: broadcasting', url: 'https://numpy.org/doc/stable/user/basics.broadcasting.html', type: 'documentation', cost: 'free', provider: 'NumPy', note: 'The exact rule, with pictures.' },
            { title: 'Introduction to Applied Linear Algebra (VMLS)', url: 'https://web.stanford.edu/~boyd/vmls/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Chapter 1 on vectors uses data examples throughout. This is the main text for the course.' },
            { title: 'Motor Trend car data (mtcars)', url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/mtcars.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'Used in this module and in Module 3.' },
          ],
          exercises: [
            {
              slug: 'build-a-feature-matrix',
              title: 'Build a feature matrix',
              prompt:
                'Load `mtcars`, and build `X` from `mpg`, `disp`, `hp` and `wt`. Print its shape. Without loops, compute each column\'s mean and variance, the car with the largest `hp`, and how many cars have `wt` above 3. Predict the shape of `X.mean(axis=0)` and `X.mean(axis=1)` before running them. Expected: shape `(32, 4)`, `Maserati Bora` has the largest `hp`, and the `disp` column holds about 76% of the total variance.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'weighted-score',
              title: 'A weighted score',
              prompt:
                'Standardise `X`, then compute a score for every car as a dot product with weights $w = (1, -1, -1, -1)$. Do it with a loop, then with `Z @ w`, and time both using `%timeit` or `time.perf_counter`. Report the top three cars. Explain what the weights encode, and say why this score is a choice and not a fact about cars.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'broadcasting-traps',
              title: 'Broadcasting traps',
              prompt:
                'Predict the result or error of each, then run it, with `A = np.ones((3, 4))`: (a) `A + np.arange(4)`, (b) `A + np.arange(3)`, (c) `A + np.arange(3).reshape(3, 1)`, (d) `A.sum(axis=1, keepdims=True).shape`, (e) `np.arange(3) * np.arange(3).reshape(3, 1)`. Explain why (e) gives a matrix, and how an accidental result like that can silently corrupt an analysis.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do the rows and columns of a feature matrix mean?',
              answerOutline: 'Rows are observations, each a point in $p$ dimensions. Columns are features, each a vector of $n$ measurements.',
            },
            {
              question: 'What does `axis=0` do in `X.mean(axis=0)`?',
              answerOutline: 'It averages down the rows, giving one mean per column.',
            },
            {
              question: 'What is a linear combination, and how is a linear model an example?',
              answerOutline: 'A sum of vectors multiplied by scalars. A prediction is a sum of feature values multiplied by coefficients.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/vectors-matrices-and-linear-systems'],
        },
        {
          slug: 'norms-and-distances',
          title: 'Norms and distances',
          summary:
            'Measuring size and separation in many dimensions, why units can decide your answer, and how to find an observation\'s nearest neighbours.',
          estimatedMinutes: 80,
          objectives: [
            'Compute the Euclidean, Manhattan and maximum norms',
            'Compute distances between all pairs of rows with NumPy',
            'Show how a change of units changes a nearest neighbour',
            'Interpret the norm of a residual as root mean square error',
            'Explain why distances lose contrast in high dimensions',
          ],
          concepts: [
            '$\\ell_2$, $\\ell_1$ and $\\ell_\\infty$ norms',
            'Euclidean distance',
            'Triangle inequality',
            'Root mean square',
            'Standardising before distance',
            'Pairwise distance matrix',
            'Curse of dimensionality',
          ],
          explanation: `A **norm** measures the size of a vector. The most common is the Euclidean or $\\ell_2$ norm:

$$\\|x\\|_2 = \\sqrt{x_1^2 + \\dots + x_n^2} = \\sqrt{x^T x}.$$

Two others appear often: the $\\ell_1$ norm $\\|x\\|_1 = \\sum_i |x_i|$, and the maximum norm $\\|x\\|_\\infty = \\max_i |x_i|$. Each obeys the **triangle inequality** $\\|a + b\\| \\le \\|a\\| + \\|b\\|$.

**Distance** is the norm of a difference: $d(a, b) = \\|a - b\\|$. It turns "how similar are these two rows?" into a number. A root mean square error is a norm in disguise:

$$\\text{RMSE} = \\frac{\\|y - \\hat{y}\\|_2}{\\sqrt{n}}.$$

**Units matter.** Distance adds squared differences across columns, so a column measured in big numbers dominates. In \`mtcars\`, with \`mpg\`, \`disp\`, \`hp\` and \`wt\`, the \`disp\` column alone holds 76% of the variance. Using raw values, the nearest cars to the Mazda RX4 are the RX4 Wag at 0.25, then the Merc 280 at 15.2. That second match is just "similar engine displacement". After standardising, the neighbours are the RX4 Wag, the Volvo 142E and the Toyota Corona, because every feature now gets a voice. There is no universally right answer: you are deciding what similarity means, and you should say so.

**All pairs in NumPy.** Broadcasting computes every distance at once:

\`\`\`python
diff = Z[:, None, :] - Z[None, :, :]     # shape (n, n, p)
D = np.sqrt((diff ** 2).sum(axis=2))     # shape (n, n)
\`\`\`

That takes $n^2 p$ work, and memory too, so it suits thousands of rows, not millions. \`scipy.spatial.distance.cdist\` does the same more efficiently.

**The curse of dimensionality.** With many columns of random noise, every pair of points ends up about the same distance apart, so "nearest" stops meaning much. For independent standardised features, squared distance has mean $2p$, with a spread growing like $\\sqrt{p}$, so the relative contrast shrinks. Nearest neighbours work best when the real structure has fewer dimensions than the table has columns, and that idea returns in Module 5.

Read VMLS Chapter 3 on norm and distance, skimming the proofs.`,
          resources: [
            { title: 'Introduction to Applied Linear Algebra (VMLS)', url: 'https://web.stanford.edu/~boyd/vmls/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Chapter 3 covers norm, distance and standard deviation with data applications.', primary: true },
            { title: 'NumPy linear algebra', url: 'https://numpy.org/doc/stable/reference/routines.linalg.html', type: 'documentation', cost: 'free', provider: 'NumPy', note: 'See `numpy.linalg.norm` and its `ord` and `axis` arguments.' },
          ],
          exercises: [
            {
              slug: 'nearest-cars',
              title: 'Nearest cars, two ways',
              prompt:
                'Using `mpg`, `disp`, `hp` and `wt`, find the 3 nearest neighbours of `Mazda RX4`, on raw values and then on standardised values. Report the distances. Explain the change. Then rescale `wt` from thousands of pounds to pounds in the raw matrix, and report what happens. Expected raw: `Mazda RX4 Wag` (0.25), `Merc 280` (15.19), `Merc 280C` (15.42). Expected standardised: `Mazda RX4 Wag` (0.261), `Volvo 142E` (0.361), `Toyota Corona` (0.414).',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'norm-unit-balls',
              title: 'Compare three norms',
              prompt:
                'For $x = (3, -4, 0, 12)$, compute the $\\ell_1$, $\\ell_2$ and $\\ell_\\infty$ norms by hand, and check them with `np.linalg.norm`. Show $\\|x\\|_\\infty \\le \\|x\\|_2 \\le \\|x\\|_1$ on 1,000 random vectors. Plot the points in 2D where each norm equals 1. Expected: 19, 13 and 12.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'distance-concentration',
              title: 'Watch distances concentrate',
              prompt:
                'For $p = 2, 10, 100, 1000$, draw 500 points with independent standard normal features. Compute all pairwise distances, then report the ratio of the largest to the smallest non-zero distance, and the mean squared distance. Use a seed. Compare the mean with $2p$. Say what this means for nearest-neighbour methods on noisy data, and what it does not mean for real data with low-dimensional structure.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Write RMSE using a norm.',
              answerOutline: '$\\|y - \\hat{y}\\|_2 / \\sqrt{n}$.',
            },
            {
              question: 'Why should you usually standardise features before computing distances?',
              answerOutline: 'Squared differences add, so a feature with large units dominates. Standardising gives each feature a similar scale, though that is itself a choice.',
            },
            {
              question: 'What happens to distances between random points as the dimension grows?',
              answerOutline: 'They concentrate: the ratio of largest to smallest approaches 1, so nearest neighbours mean less.',
            },
          ],
          relatedLessons: ['machine-learning/foundations-and-workflow/baselines-and-nearest-neighbours'],
        },
        {
          slug: 'cosine-similarity',
          title: 'Cosine similarity and correlation',
          summary:
            'Comparing direction rather than size: the angle between vectors, why cosine suits text and profiles, and how correlation is a cosine.',
          estimatedMinutes: 80,
          objectives: [
            'Derive the angle between two vectors from the dot product',
            'Compute cosine similarity between rows of a matrix',
            'Decide when cosine is a better measure than distance',
            'Show that correlation is the cosine of centred vectors',
            'Explain why centring changes the answer',
          ],
          concepts: [
            'Angle between vectors',
            'Cosine similarity',
            'Unit vectors',
            'Orthogonal vectors',
            'Correlation as a cosine',
            'Bag-of-words vectors',
            'The effect of centring',
          ],
          explanation: `Two vectors can point the same way and have very different lengths. The **dot product** captures direction:

$$a \\cdot b = \\|a\\|\\,\\|b\\|\\cos\\theta,$$

where $\\theta$ is the angle between them. Rearranging gives **cosine similarity**:

$$\\cos\\theta = \\frac{a \\cdot b}{\\|a\\|\\,\\|b\\|}.$$

It ranges from $-1$ (opposite) through 0 (**orthogonal**, no alignment) to 1 (same direction), and it ignores length. Dividing a vector by its norm makes a **unit vector**, and for unit vectors the cosine is simply the dot product.

**When cosine suits.** Compare two documents by word counts. A long article and a short note on the same topic have very different lengths, so their distance is large, yet they point in nearly the same direction. The same holds for shopping baskets and for voting records. To find all similarities at once, normalise the rows and multiply:

\`\`\`python
N = X / np.linalg.norm(X, axis=1, keepdims=True)
S = N @ N.T     # S[i, j] is the cosine between rows i and j
\`\`\`

**Correlation is a cosine.** Centre two columns by subtracting their means. Then

$$r = \\frac{(x - \\bar{x}) \\cdot (y - \\bar{y})}{\\|x - \\bar{x}\\|\\,\\|y - \\bar{y}\\|},$$

so the Pearson correlation is the cosine of centred vectors. Uncorrelated means orthogonal after centring.

**A trap: all-positive data.** Without centring, vectors with positive entries always lie in the same corner of space, so cosines are close to 1 for nearly everything. The \`USArrests\` data gives crime rates by state, and Assault rates are far larger than the others. On raw values, the states most like Illinois are New York, Wyoming and Delaware, all above 0.999, and even the least similar state, Hawaii, scores 0.74. That is mostly the Assault column talking. After standardising, New York stays top at 0.994, then Florida at 0.876 and Texas at 0.875, and Vermont is at $-0.98$, nearly opposite. Now the cosine separates states. Wyoming, with a similar ratio of crimes but a far lower level and urban share, drops away.

A cosine compares profiles, and choosing what is in the profile is your job. Always ask what the zero point means, because cosine measures direction from zero.

Do the exercises on \`USArrests\`, then read the VMLS section on angles.`,
          resources: [
            { title: 'Introduction to Applied Linear Algebra (VMLS)', url: 'https://web.stanford.edu/~boyd/vmls/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Section 3.4 on angle, including document similarity and correlation.', primary: true },
            { title: 'Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The chapter on dot products and duality shows why the dot product has this geometric meaning.' },
            { title: 'US arrests by state (USArrests)', url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/USArrests.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'Crime rates per 100,000 by state, from 1973. Used again for PCA in Module 5.' },
          ],
          exercises: [
            {
              slug: 'states-like-illinois',
              title: 'Which states are most like Illinois?',
              prompt:
                'Load `USArrests`. For Illinois, compute the cosine with every other state, on raw values and on standardised values, then the Euclidean distance on standardised values. List the top 3 for each, and the least similar state. Explain why raw cosines are all so high, and why the standardised cosine and distance disagree on the third place. State what these similarities do not tell you, given that the data are from 1973. Expected: raw New York, Wyoming, Delaware, with Hawaii lowest at 0.737. Standardised cosine New York (0.994), Florida (0.876), Texas (0.875), with Vermont lowest at $-0.982$. Standardised distance New York (0.35), Texas (0.82), Arizona (1.08).',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'correlation-as-cosine',
              title: 'Correlation is a cosine',
              prompt:
                'Using `USArrests`, compute the correlation of `Murder` and `Assault` three ways: `np.corrcoef`, the cosine of the centred columns, and $\\frac{1}{n-1} z_x \\cdot z_y$ for standardised columns. Confirm they agree to 10 decimals. Then compute the uncentred cosine and explain why it is larger. Expected: $r \\approx 0.802$.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'documents-by-angle',
              title: 'Documents by angle',
              prompt:
                'By hand, with vocabulary (data, matrix, football, goal), the documents have counts $a = (3, 2, 0, 0)$, $b = (30, 20, 0, 5)$, $c = (0, 0, 4, 3)$. Compute all pairwise cosines and Euclidean distances. Which pair is closest by each measure? Explain why document $a$ is nearer $c$ than $b$ in distance, despite being about a different topic. Expected: $\\cos(a, b) \\approx 0.991$, $\\cos(a, c) = 0$, and $d(a, b) \\approx 32.8$ against $d(a, c) \\approx 6.16$.',
              kind: 'problem',
              difficulty: 1,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a cosine similarity of 0 mean?',
              answerOutline: 'The vectors are orthogonal: they have no alignment. For centred vectors, it means zero correlation.',
            },
            {
              question: 'When is cosine better than Euclidean distance?',
              answerOutline: 'When the size of a vector is a nuisance and only its proportions matter, as with document word counts.',
            },
            {
              question: 'Why do uncentred, all-positive vectors have high cosines?',
              answerOutline: 'They all lie in one corner of space, so the angles are small whatever the real differences. Centring moves the origin to the mean.',
            },
          ],
        },
        {
          slug: 'matrix-multiplication',
          title: 'Matrix multiplication as an operation',
          summary:
            'A matrix as something that acts on vectors: columns combined by a vector, composing transformations, and what $X^TX$ and $XX^T$ compute.',
          estimatedMinutes: 100,
          objectives: [
            'Read $Ax$ as a linear combination of the columns of $A$',
            'Compute a matrix product and explain the shape rule',
            'Explain why matrix multiplication is not commutative',
            'Interpret $X^TX$ and $XX^T$ for a feature matrix',
            'Use the identity, transpose and inverse correctly',
          ],
          concepts: [
            'Matrix-vector product',
            'Column picture of $Ax$',
            'Matrix product as composition',
            'Shape rule',
            'Transpose',
            'Identity and inverse',
            'Gram matrix $X^TX$',
            'Covariance matrix',
          ],
          explanation: `A matrix is a table, and it is also a machine. $Ax$ takes a vector and returns another. Read it in two ways.

**By columns.** $Ax$ is a linear combination of the columns of $A$, with the entries of $x$ as the weights:

$$\\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix} \\begin{bmatrix} 4 \\\\ 5 \\end{bmatrix} = 4 \\begin{bmatrix} 2 \\\\ 0 \\end{bmatrix} + 5 \\begin{bmatrix} 1 \\\\ 3 \\end{bmatrix} = \\begin{bmatrix} 13 \\\\ 15 \\end{bmatrix}.$$

This is a linear model: with feature matrix $X$ and coefficients $\\beta$, the predictions are $X\\beta$, one weighted sum of columns.

**By rows.** Entry $i$ of $Ax$ is the dot product of row $i$ with $x$. This is usually how you compute by hand.

**Matrix products.** If $A$ has shape $(m, n)$ and $B$ has shape $(n, k)$, then $AB$ has shape $(m, k)$, and entry $(i, j)$ is row $i$ of $A$ dotted with column $j$ of $B$. The inner dimensions must match. $(AB)x = A(Bx)$, so a product means "do $B$, then do $A$", and that is the reason for this definition.

**Order matters.** In general $AB \\ne BA$: rotating then stretching differs from stretching then rotating. Associativity does hold, $A(BC) = (AB)C$, and this has practical weight, because multiplying vectors first avoids building a big matrix. Compute \`A @ (B @ x)\`, not \`(A @ B) @ x\`.

**Transpose and inverse.** $A^T$ swaps rows and columns, and $(AB)^T = B^T A^T$. The **identity** $I$ does nothing. An **inverse** satisfies $A^{-1}A = I$, and it exists only for square matrices of full rank. In code, solve systems rather than computing inverses, as Module 2 explains.

**Two products every data scientist meets.** For a feature matrix $X$:

- $X^TX$ has shape $(p, p)$, and its entry $(j, k)$ is the dot product of columns $j$ and $k$. If $X$ is centred, $\\frac{1}{n-1} X^TX$ is the **covariance matrix**.
- $XX^T$ has shape $(n, n)$, and its entry $(i, j)$ is the dot product of rows $i$ and $j$. With normalised rows, it is the matrix of cosine similarities.

Both are symmetric, and they have the same non-zero eigenvalues, a fact that powers PCA in Module 5.

**Cost.** Multiplying two $n \\times n$ matrices takes about $n^3$ steps, while a matrix-vector product takes $n^2$.

Watch the 3Blue1Brown chapters on matrices as transformations, then read VMLS Chapter 10.`,
          resources: [
            { title: 'Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The chapters on linear transformations and matrix multiplication as composition.', primary: true },
            { title: 'Introduction to Applied Linear Algebra (VMLS)', url: 'https://web.stanford.edu/~boyd/vmls/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Chapters 6 and 10 on matrices and matrix multiplication.' },
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lectures 1 to 3 cover the geometry of linear equations and matrix multiplication.' },
          ],
          exercises: [
            {
              slug: 'columns-and-rows',
              title: 'Columns and rows',
              prompt:
                'For $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ 5 & 6 \\end{bmatrix}$ and $x = (1, -1)$, compute $Ax$ by columns and by rows, by hand, then check with `A @ x`. Find $A^TA$ and $AA^T$, and state their shapes. Find two $2 \\times 2$ matrices with $AB \\ne BA$. Expected: $Ax = (-1, -1, -1)$, and $A^TA = \\begin{bmatrix} 35 & 44 \\\\ 44 & 56 \\end{bmatrix}$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'covariance-from-gram',
              title: 'Covariance from the Gram matrix',
              prompt:
                'Centre `USArrests` and compute $\\frac{1}{n-1} X^TX$. Check that it equals `np.cov(X, rowvar=False)` to within $10^{-10}$. Standardise and repeat, and check you get the correlation matrix. Which pair of variables is most correlated? Say why the diagonal of the first matrix differs so much from that of the second. Expected: `Murder` and `Assault`, at $r \\approx 0.802$.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'multiplication-order-cost',
              title: 'The cost of multiplication order',
              prompt:
                'Create random matrices $A$ and $B$ of shape `(3000, 3000)` and a vector $x$ with a seed. Time `(A @ B) @ x` and `A @ (B @ x)`, and check that the two results agree. Count the scalar multiplications by formula for each. Then explain how this generalises to a chain of many matrices, and why deep learning libraries evaluate from the vector end.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the column picture of $Ax$?',
              answerOutline: '$Ax$ is a linear combination of the columns of $A$, with the entries of $x$ as weights.',
            },
            {
              question: 'What shapes are allowed in $AB$, and what is the result?',
              answerOutline: 'The inner dimensions must match: $(m, n)$ times $(n, k)$ gives $(m, k)$.',
            },
            {
              question: 'For a centred feature matrix, what do $X^TX$ and $XX^T$ hold?',
              answerOutline: '$X^TX$ holds dot products of columns, proportional to covariances. $XX^T$ holds dot products of rows.',
            },
          ],
          relatedLessons: [
            'math-methods/linear-algebra/vectors-matrices-and-linear-systems',
            'probability-statistics/random-variables-and-distributions/joint-distributions-and-covariance',
          ],
        },
      ],
    },
    {
      slug: 'linear-systems',
      title: 'Linear Systems',
      description:
        'Solving $Ax = b$: elimination and LU factorisation, then what rank, null space, basis and dimension reveal about redundant data, and how conditioning decides whether an answer can be trusted.',
      lessons: [
        {
          slug: 'gaussian-elimination',
          title: 'Gaussian elimination',
          summary:
            'Solving a linear system by hand and in code: row operations, pivots, back substitution, and why you solve rather than invert.',
          estimatedMinutes: 90,
          objectives: [
            'Write a set of linear equations as $Ax = b$',
            'Carry out elimination and back substitution by hand',
            'Explain what pivoting is and why it is needed',
            'Recognise systems with no solution or many solutions',
            'Explain why `solve` beats `inv` in numerical work',
          ],
          concepts: [
            'Linear system',
            'Row operations',
            'Pivot',
            'Upper triangular form',
            'Back substitution',
            'Partial pivoting',
            'Inconsistent and underdetermined systems',
            'Operation count $n^3/3$',
          ],
          explanation: `A linear system is a set of equations such as

$$\\begin{aligned} 2x_1 + x_2 + x_3 &= 5 \\\\ 4x_1 - 6x_2 &= -2 \\\\ -2x_1 + 7x_2 + 2x_3 &= 9 \\end{aligned}$$

which is $Ax = b$ in matrix form. By columns, the question is: what combination of the columns of $A$ gives $b$?

**Elimination.** Subtract multiples of one row from another to clear the entries below the diagonal. Subtract 2 times row 1 from row 2, and add row 1 to row 3. These steps do not change the solution:

$$\\begin{bmatrix} 2 & 1 & 1 & | & 5 \\\\ 0 & -8 & -2 & | & -12 \\\\ 0 & 8 & 3 & | & 14 \\end{bmatrix}.$$

Adding row 2 to row 3 finishes the job:

$$\\begin{bmatrix} 2 & 1 & 1 & | & 5 \\\\ 0 & -8 & -2 & | & -12 \\\\ 0 & 0 & 1 & | & 2 \\end{bmatrix}.$$

The leading entries 2, $-8$ and 1 are the **pivots**. Now the matrix is upper triangular, so **back substitution** solves from the bottom up: $x_3 = 2$, then $x_2 = 1$, then $x_1 = 1$.

**Pivoting.** A zero pivot stops the process, and a tiny one is worse: dividing by it magnifies rounding error enormously. **Partial pivoting** swaps rows so that the largest available entry in each column becomes the pivot. Every serious solver does this.

**Three outcomes.** A zero pivot that cannot be fixed by a swap leaves either a row like $0 = 3$, which means no solution, or $0 = 0$, which means infinitely many. Data problems often have more equations than unknowns, and then there is usually no exact solution. That case gets its own module on least squares.

**Cost.** Elimination takes about $n^3/3$ multiplications, and back substitution only about $n^2/2$. So doubling $n$ makes the first eight times slower.

**Do not invert.** $x = A^{-1}b$ is fine on paper. In code, \`np.linalg.solve(A, b)\` is faster and more accurate than \`np.linalg.inv(A) @ b\`, because forming the inverse takes more work and adds rounding error for no benefit. If you find yourself writing \`inv\`, ask what you really want. Usually it is a solve.

Solve a system by hand once, then watch the elimination lecture from MIT 18.06.`,
          resources: [
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture 2 on elimination with matrices.', primary: true },
            { title: 'Introduction to Applied Linear Algebra (VMLS)', url: 'https://web.stanford.edu/~boyd/vmls/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Chapters 8 and 11 on linear equations and on solving them.' },
          ],
          exercises: [
            {
              slug: 'eliminate-by-hand',
              title: 'Eliminate by hand',
              prompt:
                'Solve the system in the lesson by hand, showing each row operation, then check with `np.linalg.solve`. Then try $x + y = 1,\\ 2x + 2y = 3$ and $x + y = 1,\\ 2x + 2y = 2$, and explain what elimination shows in each. Expected: $(1, 1, 2)$, then no solution, then infinitely many.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'write-a-solver',
              title: 'Write a solver',
              prompt:
                'Write `solve(A, b)` with partial pivoting and back substitution, using NumPy for row arithmetic but not `np.linalg`. Test it on 100 random systems of size 50 against `np.linalg.solve`, using a seed. Then solve $\\begin{bmatrix} 10^{-20} & 1 \\\\ 1 & 1 \\end{bmatrix} x = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}$ with and without pivoting, and report both answers. Expected: with pivoting, $(1, 1)$. Without pivoting, $(0, 1)$, which is wrong.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'solve-versus-inverse',
              title: 'Solve against invert',
              prompt:
                'For random matrices of size 500, 1000 and 2000, with a seed, compare the time of `np.linalg.solve(A, b)` with `np.linalg.inv(A) @ b`, and the residual $\\|Ax - b\\|$ of each. Report a table, and explain the differences using operation counts. Which results would change on a faster computer, and which would not?',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do row operations preserve, and why?',
              answerOutline: 'The solution set, because each operation can be undone, and any solution of the old system solves the new one.',
            },
            {
              question: 'Why is partial pivoting used?',
              answerOutline: 'To avoid dividing by zero or by tiny numbers that magnify rounding error.',
            },
            {
              question: 'Why prefer a solve to an inverse?',
              answerOutline: 'It takes less work, and it is more accurate, since it avoids building a whole matrix you do not need.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/vectors-matrices-and-linear-systems'],
        },
        {
          slug: 'lu-factorisation',
          title: 'LU factorisation',
          summary:
            'Elimination recorded as a factorisation, so that one expensive step serves many right-hand sides, plus Cholesky for symmetric positive definite matrices.',
          estimatedMinutes: 80,
          objectives: [
            'Find the $L$ and $U$ factors of a small matrix',
            'Explain the role of the permutation $P$',
            'Solve $Ax = b$ using forward and back substitution',
            'Explain when LU saves work',
            'Use Cholesky for a symmetric positive definite matrix',
          ],
          concepts: [
            'LU factorisation',
            'Permutation matrix',
            'Forward substitution',
            'Back substitution',
            'Reusing a factorisation',
            'Determinant from pivots',
            'Cholesky factorisation',
          ],
          explanation: `Elimination does two things: it produces $U$, the upper triangular result, and it uses multipliers to get there. Save those multipliers in a lower triangular matrix $L$, with ones on the diagonal, and you have

$$A = LU.$$

Row swaps are recorded in a permutation matrix $P$, so the general form is $PA = LU$. For the matrix $A$ from the last lesson, with partial pivoting,

$$L = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0.5 & 1 & 0 \\\\ -0.5 & 1 & 1 \\end{bmatrix}, \\quad U = \\begin{bmatrix} 4 & -6 & 0 \\\\ 0 & 4 & 1 \\\\ 0 & 0 & 1 \\end{bmatrix}.$$

**Why this helps.** To solve $Ax = b$, solve two triangular systems: $Ly = Pb$ by forward substitution, then $Ux = y$ by back substitution. Factoring costs about $\\frac{2}{3}n^3$ operations, but each triangular solve costs only about $n^2$. So when you must solve for many right-hand sides with one matrix, you factor once and reuse it.

\`\`\`python
import scipy.linalg as sla
lu, piv = sla.lu_factor(A)
x1 = sla.lu_solve((lu, piv), b1)
x2 = sla.lu_solve((lu, piv), b2)
\`\`\`

Looping \`np.linalg.solve\` over 50 right-hand sides with a $2000 \\times 2000$ matrix took about 3.5 seconds on a laptop, while factoring once and reusing it took about 0.1 seconds. This is why simulations, leave-one-out formulas and Newton-style methods keep hold of a factorisation.

**The determinant.** Since $\\det(PA) = \\det(L)\\det(U)$, the determinant is the product of the pivots, up to a sign from the swaps. For this example, the pivots are 4, 4 and 1, and the determinant is $-16$, because one sign flip remains. You will rarely need the determinant in data work, and it is a poor test of near-singularity, as a later lesson shows.

**Cholesky.** If $A$ is symmetric and positive definite, meaning $x^TAx > 0$ for all non-zero $x$, then

$$A = R^T R,$$

with $R$ upper triangular. This takes half the work of LU and needs no pivoting. Matrices of the form $X^TX$ with independent columns are of this kind, and so are covariance matrices. Cholesky is the usual way to draw correlated random numbers: if $z$ is standard normal, then $R^T z$ has covariance $A$.

Work the MIT lecture on LU, then do the exercises, always checking that the product reproduces the matrix.`,
          resources: [
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture 4 on factorisation into $A = LU$.', primary: true },
            { title: 'SciPy linear algebra (scipy.linalg)', url: 'https://docs.scipy.org/doc/scipy/reference/linalg.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'See `lu_factor`, `lu_solve`, `cho_factor` and `cho_solve`.' },
          ],
          exercises: [
            {
              slug: 'lu-by-hand',
              title: 'LU by hand',
              prompt:
                'Find $L$ and $U$ with no row swaps for $A = \\begin{bmatrix} 2 & 1 \\\\ 6 & 8 \\end{bmatrix}$, and for the $3 \\times 3$ matrix in the last lesson\'s system without pivoting. Multiply them to check. Solve $Ax = (3, 14)$ with forward and back substitution. Compare with `scipy.linalg.lu`. Expected: $L = \\begin{bmatrix} 1 & 0 \\\\ 3 & 1 \\end{bmatrix}$, $U = \\begin{bmatrix} 2 & 1 \\\\ 0 & 5 \\end{bmatrix}$ and $x = (1, 1)$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'reuse-the-factorisation',
              title: 'Reuse the factorisation',
              prompt:
                'For a random `(1000, 1000)` matrix and 50 right-hand sides, with a seed, time looping `np.linalg.solve` against `lu_factor` once with 50 calls to `lu_solve`. Check that the answers agree. Then measure how the time of `lu_factor` grows from 500 to 1000 to 2000, and compare with the $n^3$ prediction. Say why a measured ratio may not be exactly 8. Expected: LU reuse is at least 10 times faster.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'cholesky-sampling',
              title: 'Correlated draws with Cholesky',
              prompt:
                'For the correlation matrix of `USArrests`, compute its Cholesky factor. Draw 100,000 correlated standard normal rows as `z @ R`, where `R` comes from `np.linalg.cholesky(C).T`, and compare the sample correlations with the original to 2 decimals. Explain why $\\text{Cov}(R^Tz) = R^TR$. Then try Cholesky on a matrix with a duplicated column, and report what happens and why.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do $L$ and $U$ hold?',
              answerOutline: '$U$ is the result of elimination. $L$ holds the multipliers used, with ones on the diagonal.',
            },
            {
              question: 'When does an LU factorisation save work?',
              answerOutline: 'When many systems share a matrix. The factorisation costs $O(n^3)$ once, and each solve only $O(n^2)$.',
            },
            {
              question: 'When can you use Cholesky, and why is it preferred there?',
              answerOutline: 'For symmetric positive definite matrices, such as $X^TX$ with independent columns. It is about twice as fast and needs no pivoting.',
            },
          ],
        },
        {
          slug: 'rank-and-null-space',
          title: 'Rank and null space',
          summary:
            'How many columns really carry information, what combinations of them vanish, and how redundant features break a model.',
          estimatedMinutes: 90,
          objectives: [
            'Define column space, rank and null space',
            'Find the rank and a null space vector by hand for a small matrix',
            'Compute the rank numerically and explain the tolerance',
            'Explain why rank deficiency makes coefficients non-unique',
            'Diagnose the dummy variable trap',
          ],
          concepts: [
            'Column space',
            'Rank',
            'Null space',
            'Linear dependence',
            'Rank-nullity theorem',
            'Free variables',
            'Dummy variable trap',
            'Numerical rank',
          ],
          explanation: `The **column space** of $A$ is the set of all combinations $Ax$. It holds every possible output, so $Ax = b$ can be solved only if $b$ is in it. The **rank** $r$ is the number of independent columns, which equals the number of pivots. It says how many genuinely different directions the columns provide.

The **null space** is the set of $x$ with $Ax = 0$, which are the combinations of columns that cancel out. Each such $x$ names a redundancy.

**Example.** Take

$$A = \\begin{bmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\\\ 7 & 8 & 9 \\end{bmatrix}.$$

Elimination leaves two pivots, so the rank is 2. Column 3 equals $2 \\times$ column 2 $-$ column 1, so $x = (1, -2, 1)$ is in the null space.

**Rank-nullity.** For a matrix with $n$ columns,

$$\\text{rank} + \\dim(\\text{null space}) = n.$$

Every column is either a pivot column or gives one free direction.

**Why this matters: non-unique answers.** If $Ax = b$ and $Az = 0$, then $A(x + tz) = b$ for every $t$. A model with a redundant column has infinitely many coefficient vectors with identical predictions, so no individual coefficient means anything.

**The dummy variable trap.** Encode the three iris species as three 0/1 columns, and add an intercept column of ones. The species columns sum to the intercept, so the 4 columns have rank 3, and the null vector is $(-1, 1, 1, 1)$. You could add any constant to the three species effects and subtract it from the intercept, with no effect on predictions. The fix is to drop one category. \`pandas.get_dummies(..., drop_first=True)\` exists for this reason. Similar traps: a temperature in both Celsius and Fahrenheit with an intercept (rank 2 of 3, because $F = 32 + 1.8C$), or a total alongside its parts.

**More columns than rows.** A matrix with $p > n$ has a null space of dimension at least $p - n$. So a model with more features than observations cannot have unique least squares coefficients. Regularisation exists largely to pick one.

**Numerical rank.** Rounding means a computed pivot is rarely exactly zero. \`np.linalg.matrix_rank\` counts singular values above a tolerance, so rank in practice is a judgement about what counts as zero.

Watch MIT 18.06 Lectures 6 and 7, and check your feature matrices for rank before fitting anything.`,
          resources: [
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lectures 6 and 7 on column space, null space and solving $Ax = 0$.', primary: true },
            { title: 'Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The chapter on inverse matrices, column space and null space.' },
            { title: 'Iris data (iris)', url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/iris.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'Used for the dummy variable exercise.' },
          ],
          exercises: [
            {
              slug: 'rank-by-hand',
              title: 'Rank and null space by hand',
              prompt:
                'For the matrix in the lesson, reduce it by hand to find its rank and a null space vector. Confirm $Ax = 0$. Then find the rank of $\\begin{bmatrix} 1 & 2 \\\\ 2 & 4 \\\\ 3 & 6 \\end{bmatrix}$, and describe its column space geometrically. Is $(1, 1, 1)$ in it? Compare with `np.linalg.matrix_rank` and `scipy.linalg.null_space`. Expected: rank 2 with null vector proportional to $(1, -2, 1)$, then rank 1, and no.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'dummy-variable-trap',
              title: 'Spring the dummy variable trap',
              prompt:
                'With `iris`, build $X$ with an intercept and 3 species dummies, and predict `Sepal.Length`. Compute the rank of $X$ and its null vector. Fit with `np.linalg.lstsq`, then add $c(-1, 1, 1, 1)$ to the coefficients for several $c$ and show that the predictions do not change. Refit after dropping one dummy, and interpret the coefficients. Expected: rank 3 of 4, and species means of about 5.006, 5.936 and 6.588.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'too-many-features',
              title: 'More features than rows',
              prompt:
                'With a seed, create $X$ with 20 rows and 50 columns of random normals and any target $y$. Find the rank, and the dimension of the null space. Find one exact solution of $X\\beta = y$ with `np.linalg.lstsq`, then build a different exact solution by adding a null space vector. Compare their predictions on 5 new random rows. Explain why zero training error here says nothing about quality.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the rank-nullity theorem.',
              answerOutline: 'Rank plus the dimension of the null space equals the number of columns.',
            },
            {
              question: 'What does a non-zero null space imply for regression coefficients?',
              answerOutline: 'They are not unique: adding any null vector leaves predictions unchanged, so single coefficients have no meaning.',
            },
            {
              question: 'What is the dummy variable trap, and how do you avoid it?',
              answerOutline: 'Full category dummies with an intercept are linearly dependent. Drop one category or the intercept.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/vector-spaces-bases-and-inner-products'],
        },
        {
          slug: 'basis-and-dimension',
          title: 'Basis and dimension',
          summary:
            'Independent directions that describe a whole space, changing coordinates, and the idea that a dataset has a true dimension smaller than its table.',
          estimatedMinutes: 80,
          objectives: [
            'Define span, linear independence and basis',
            'Find a basis for a column space',
            'Compute the coordinates of a vector in a new basis',
            'State the dimensions of the four fundamental subspaces',
            'Explain intrinsic dimension of a dataset',
          ],
          concepts: [
            'Span',
            'Linear independence',
            'Basis',
            'Dimension',
            'Coordinates in a basis',
            'Change of basis',
            'Four fundamental subspaces',
            'Intrinsic dimension',
          ],
          explanation: `A **basis** for a space is a set of vectors that are independent and span it, so every vector in the space can be written as exactly one combination of them. The **dimension** is the number of basis vectors, and every basis of a given space has the same number.

**Span and independence.** The span of some vectors is everything you can reach by combining them. Vectors are **independent** if none is a combination of the others, or equivalently if $Ax = 0$ only for $x = 0$.

**A basis for a column space.** Elimination tells you which columns have pivots, and those original columns form a basis. In the rank 2 example from the last lesson, columns 1 and 2 are a basis for the column space, a 2-dimensional plane inside 3-dimensional space.

**Coordinates.** Choosing a basis means choosing how to describe things. In the standard basis, $(3, 2)$ means 3 of $e_1$ and 2 of $e_2$. In the basis $b_1 = (1, 1)$, $b_2 = (1, -1)$, the same point is $2.5 b_1 + 0.5 b_2$. To find coordinates $c$, solve $Bc = x$, where the columns of $B$ are the basis vectors.

Change of basis is the central idea of the second half of this course. PCA rotates to a basis where the data are simpler, and a Fourier transform changes to a basis of waves.

**The four subspaces.** For an $m \\times n$ matrix of rank $r$:

| Subspace | Lives in | Dimension |
|---|---|---|
| Column space | $\\mathbb{R}^m$ | $r$ |
| Left null space | $\\mathbb{R}^m$ | $m - r$ |
| Row space | $\\mathbb{R}^n$ | $r$ |
| Null space | $\\mathbb{R}^n$ | $n - r$ |

The row space and null space are perpendicular, and so are the column space and left null space. In the next module this explains least squares: the residual lands in the left null space.

**Intrinsic dimension.** A table with 64 columns may hide far fewer true degrees of freedom. A dataset may be near a low-dimensional subspace, even when its exact rank is full, because noise makes every column slightly independent. Rank is all-or-nothing, and dimension in data is a matter of degree. Module 5 makes that precise with singular values.

Watch the 3Blue1Brown chapters on span and on change of basis, then MIT 18.06 Lectures 9 and 10.`,
          resources: [
            { title: 'Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The chapters on linear combinations, span and basis, and on change of basis.', primary: true },
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lectures 9 and 10 on independence, basis, dimension and the four subspaces.' },
            { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'textbook', cost: 'free', provider: 'Deisenroth, Faisal and Ong', note: 'Section 2.6 on generating sets and bases.' },
          ],
          exercises: [
            {
              slug: 'coordinates-in-a-basis',
              title: 'Coordinates in a new basis',
              prompt:
                'Find the coordinates of $(3, 2)$ in the basis $b_1 = (1, 1)$, $b_2 = (1, -1)$, by hand and with `np.linalg.solve`. Then explain why $(1, 2)$ and $(2, 4)$ are not a basis of the plane. For a matrix with shape $(5, 8)$ and rank 3, give the dimension of all four subspaces. Expected: $(2.5, 0.5)$, and dimensions 3, 2, 3, 5.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'pick-a-basis-from-data',
              title: 'Find a basis in a data table',
              prompt:
                'Build a table with columns `a`, `b`, `a + b`, `2a - b`, `c` from random data, with a seed. Use `sympy.Matrix(X).rref()` on a small integer version, or a column-by-column rank test, to choose a maximal independent set of columns. Then express each dropped column as a combination of those kept, by solving with `np.linalg.lstsq`. Expected: rank 3, and combinations exact to rounding error.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'nearly-low-dimensional',
              title: 'Nearly low-dimensional data',
              prompt:
                'With a seed, generate 1,000 rows from 3 hidden factors: $X = F W + \\epsilon$, with $F$ of shape `(1000, 3)`, $W$ of shape `(3, 50)`, and noise of size $\\sigma = 0.01$. Report the rank of $X$ from `matrix_rank`, then the first 6 singular values from `np.linalg.svd`. Explain why the exact rank is 50, while the true dimension is 3. Repeat with $\\sigma = 1$, and say when the 3 stops being clear.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What two properties define a basis?',
              answerOutline: 'Its vectors are independent, and they span the space.',
            },
            {
              question: 'What does changing basis change?',
              answerOutline: 'The coordinates of a vector, not the vector itself.',
            },
            {
              question: 'Why can a table with full rank still be low-dimensional?',
              answerOutline: 'Noise makes the exact rank full, while the data lie close to a low-dimensional subspace.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/vector-spaces-bases-and-inner-products'],
        },
        {
          slug: 'conditioning',
          title: 'Conditioning',
          summary:
            'When a small change in the data makes a large change in the answer: condition numbers, rounding limits, and why economic data can make coefficients meaningless.',
          estimatedMinutes: 90,
          objectives: [
            'Define the condition number and state what it bounds',
            'Estimate the digits you can trust from $\\kappa$',
            'Explain why a small residual need not mean an accurate solution',
            'Show that forming $X^TX$ squares the condition number',
            'Reduce a condition number by rescaling',
          ],
          concepts: [
            'Sensitivity',
            'Condition number $\\kappa(A)$',
            'Residual versus error',
            'Machine epsilon',
            'Ill-conditioning',
            'Collinearity',
            'Variance inflation factor',
            'Rescaling',
          ],
          explanation: `A problem is **ill-conditioned** if tiny changes in its inputs cause big changes in its answer. This is a property of the problem, and no algorithm can remove it. For $Ax = b$, the **condition number** is

$$\\kappa(A) = \\|A\\|\\,\\|A^{-1}\\| = \\frac{\\sigma_{\\max}}{\\sigma_{\\min}},$$

the ratio of the largest stretching $A$ does to the smallest. Then

$$\\frac{\\|\\Delta x\\|}{\\|x\\|} \\le \\kappa(A) \\frac{\\|\\Delta b\\|}{\\|b\\|}.$$

A relative error in the data can be magnified by up to $\\kappa$.

**Digits you lose.** Double precision keeps about 16 significant digits, so a rule of thumb says you can trust about $16 - \\log_{10}\\kappa$ digits of $x$. The Hilbert matrix shows this. Take the true solution as all ones:

| $n$ | $\\kappa$ | Largest error | Residual |
|---|---|---|---|
| 5 | $4.8 \\times 10^{5}$ | $2.8 \\times 10^{-12}$ | $2 \\times 10^{-16}$ |
| 8 | $1.5 \\times 10^{10}$ | $1.2 \\times 10^{-7}$ | $2 \\times 10^{-16}$ |
| 12 | $1.8 \\times 10^{16}$ | $0.70$ | $4 \\times 10^{-16}$ |

Look at the last two columns. At $n = 12$ the solution is badly wrong, yet $Ax$ matches $b$ to machine precision. **A small residual does not mean an accurate answer.** A solver finds an $x$ that reproduces $b$, and when $A$ is close to singular, very different $x$ do that almost equally well.

**In data: collinearity.** The classic \`longley\` data has six yearly economic predictors of employment, several of which trend together. With an intercept, $\\kappa(X) \\approx 2.4 \\times 10^7$. Multiply each predictor by random noise of just 0.1%, far smaller than real measurement error, and over 20 trials the typical coefficient moves by 50% to more than 500% of its value. The fitted values move by only about 1%, so the model can still predict, but its individual coefficients mean little.

**Rescaling helps, a bit.** Part of that $\\kappa$ comes from units: Year is near 1950, while others are in the thousands. Standardising brings $\\kappa$ down to 110. The rest is real collinearity, measured by the **variance inflation factor**, which reaches 1,789 for GNP. Rescaling cannot create information the data lack.

**Never square it.** $\\kappa(X^TX) = \\kappa(X)^2$. Solving least squares through the normal equations therefore loses twice the digits. On \`longley\`, $\\kappa(X^TX) \\approx 5.7 \\times 10^{14}$, right at the edge of double precision. Module 3 shows the fix.

Print $\\kappa$ whenever you fit a linear model.`,
          resources: [
            { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'textbook', cost: 'free', provider: 'Deisenroth, Faisal and Ong', note: 'Chapter 4 on matrix decompositions, for the singular values behind $\\kappa$.', primary: true },
            { title: 'MIT 18.065 Matrix Methods in Data Analysis', url: 'https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'The lecture surveying difficulties with $Ax = b$ covers ill-conditioned systems.' },
            { title: 'Longley economic data (longley)', url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/longley.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'A short table, famous for its collinearity. Used in this module and the next.' },
          ],
          exercises: [
            {
              slug: 'hilbert-experiment',
              title: 'The Hilbert experiment',
              prompt:
                'For $n = 5, 8, 12$, build the Hilbert matrix with `scipy.linalg.hilbert`, set $b = Hx$ with $x$ all ones, solve, and report $\\kappa$, the largest error and the largest residual. Compare the digits lost with $\\log_{10}\\kappa$. Explain the gap between the error and the residual. Expected: values close to the table in the lesson. Exact rounding may vary a little by platform.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'longley-sensitivity',
              title: 'How stable are these coefficients?',
              prompt:
                'Fit `Employed` on the 6 other columns of `longley`, with an intercept. Report $\\kappa$ of the raw and standardised matrices, and of their $X^TX$. Multiply each predictor by $1 + 0.001 z$, with fresh normal $z$, for 20 seeds, and report the median absolute relative change in each coefficient and in the fitted values. Then compute each variance inflation factor. Say which conclusions from the original table you would still defend. Expected: $\\kappa \\approx 2.4 \\times 10^7$ and 110, with $\\kappa(X^TX) \\approx 5.7 \\times 10^{14}$ and 12,200. Median coefficient changes run from about 0.5 to 5.4 times the original size. The largest variance inflation factor is about 1,789, for `GNP`.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'determinant-is-not-conditioning',
              title: 'The determinant is not a test',
              prompt:
                'Show that $0.1 I_{100}$ has determinant $10^{-100}$ and $\\kappa = 1$, while $\\begin{bmatrix} 1 & 1 \\\\ 1 & 1 + 10^{-10} \\end{bmatrix}$ has determinant $10^{-10}$ and $\\kappa \\approx 4 \\times 10^{10}$. Which system is easier to solve accurately? Explain why a small determinant does not mean ill-conditioning, and what you would compute instead.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $\\kappa(A) = 10^{10}$ imply in double precision?',
              answerOutline: 'You can expect to lose about 10 digits, so about 6 digits of $x$ can be trusted.',
            },
            {
              question: 'Can a tiny residual go with a very wrong solution?',
              answerOutline: 'Yes, when $A$ is nearly singular. Many different $x$ reproduce $b$ almost exactly.',
            },
            {
              question: 'Why avoid forming $X^TX$?',
              answerOutline: 'It squares the condition number, which doubles the digits lost.',
            },
            {
              question: 'What can rescaling fix, and what can it not fix?',
              answerOutline: 'It removes the part of $\\kappa$ due to units. It cannot remove true collinearity between features.',
            },
          ],
          relatedLessons: ['computational-physics/numerical-calculus-and-linear-algebra/numerical-linear-algebra'],
        },
      ],
    },
    {
      slug: 'orthogonality-and-regression',
      title: 'Orthogonality and Regression',
      description:
        'Perpendicular directions turn the unsolvable into the solvable: projections, QR factorisation, least squares, linear regression, and the residuals that tell you whether to believe it.',
      lessons: [
        {
          slug: 'projections',
          title: 'Projections',
          summary:
            'The closest point in a subspace: projecting onto a line and onto a column space, and why the leftover is perpendicular.',
          estimatedMinutes: 90,
          objectives: [
            'Project a vector onto another vector',
            'Show that the residual is orthogonal to the subspace',
            'Write a projection matrix and state its properties',
            'Use orthonormal bases to simplify projections',
            'Explain why a projection gives the closest point',
          ],
          concepts: [
            'Orthogonal vectors',
            'Projection onto a line',
            'Residual',
            'Projection matrix $P$',
            'Idempotence',
            'Orthonormal basis',
            'Orthogonal matrix',
            'Pythagoras in $n$ dimensions',
          ],
          explanation: `Most data problems ask you to find the closest thing you can reach. If $b$ is out of reach of a subspace, the best you can do is its **projection**.

**Onto a line.** To project $b$ onto the direction $a$, find the multiple $ca$ such that the leftover $r = b - ca$ is perpendicular to $a$:

$$a \\cdot (b - ca) = 0 \\quad \\Rightarrow \\quad c = \\frac{a \\cdot b}{a \\cdot a}.$$

For $a = (1, 2, 2)$ and $b = (3, 0, 3)$, $c = 9/9 = 1$, so $p = (1, 2, 2)$ and $r = (2, -2, 1)$. Check: $a \\cdot r = 2 - 4 + 2 = 0$.

**Why perpendicular means closest.** Take any other point $q$ in the subspace. Then $b - q = r + (p - q)$, where $p - q$ lies in the subspace and $r$ is perpendicular to it. By Pythagoras,

$$\\|b - q\\|^2 = \\|r\\|^2 + \\|p - q\\|^2 \\ge \\|r\\|^2.$$

So no point is closer, and that proof uses no calculus.

**Onto a column space.** With several basis vectors in the columns of $A$, the requirement is $A^T(b - A\\hat{x}) = 0$, which gives

$$A^TA\\hat{x} = A^Tb, \\qquad p = A\\hat{x} = Pb, \\qquad P = A(A^TA)^{-1}A^T.$$

The **projection matrix** $P$ has two properties that define it: $P^T = P$, and $P^2 = P$, because projecting twice changes nothing. $I - P$ projects onto the perpendicular directions and gives the residual.

**Orthonormal bases.** Life is much simpler if the basis vectors are perpendicular unit vectors, so $Q^TQ = I$. Then $P = QQ^T$, and each coordinate is just a dot product: $c_i = q_i \\cdot b$. No system needs to be solved. A square $Q$ with this property is an **orthogonal matrix**, a rotation or reflection. It preserves all lengths and angles, so it has $\\kappa = 1$ and it cannot amplify error.

**The data view.** Think of $b$ as your target column, with one entry for each of $n$ observations, so $b$ is a single point in $n$-dimensional space. The columns of $X$ span a small subspace, and each possible model is a point in it. Fitting means finding the point closest to $b$.

Watch MIT 18.06 Lectures 14 and 15, and draw the 2D picture of $b$, $p$ and $r$ for yourself.`,
          resources: [
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lectures 14 and 15 on orthogonality and projections onto subspaces.', primary: true },
            { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'textbook', cost: 'free', provider: 'Deisenroth, Faisal and Ong', note: 'Chapter 3, especially the section on orthogonal projections.' },
          ],
          exercises: [
            {
              slug: 'project-by-hand',
              title: 'Project by hand',
              prompt:
                'Project $b = (3, 0, 3)$ onto $a = (1, 2, 2)$ by hand, check that $r \\perp a$, and verify $\\|b\\|^2 = \\|p\\|^2 + \\|r\\|^2$. Then form $P = aa^T/(a^Ta)$ and confirm $P^2 = P$ and $P^T = P$ in NumPy. What is the rank of $P$? Expected: $p = (1, 2, 2)$, $r = (2, -2, 1)$, $18 = 9 + 9$, and rank 1.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'project-onto-a-plane',
              title: 'Project onto a column space',
              prompt:
                'For $A = \\begin{bmatrix} 1 & 0 \\\\ 1 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $b = (6, 0, 0)$, solve $A^TA\\hat{x} = A^Tb$, then find $p$ and $r$. Confirm $A^Tr = 0$. Build $P$ and compute its trace and rank. What straight line does this fit, and through which points? Expected: $\\hat{x} = (5, -3)$, $p = (5, 2, -1)$, $r = (1, -2, 1)$, and trace 2.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'orthogonal-matrices-preserve',
              title: 'Rotations preserve everything',
              prompt:
                'Make a random orthogonal matrix with `np.linalg.qr` of a normal matrix, of size 200, using a seed. Check $Q^TQ = I$ to $10^{-12}$. Show that it preserves norms and dot products on random vectors, that $\\kappa(Q) = 1$, and that rotating a dataset leaves all pairwise distances unchanged. Now say why rotated features can still be useless to a tree model or to a reader, even though no information was lost.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does the closest point make the residual perpendicular?',
              answerOutline: 'By Pythagoras, any other point adds a positive squared length, so the distance is smallest when the leftover is orthogonal.',
            },
            {
              question: 'What two properties define a projection matrix?',
              answerOutline: 'It is symmetric, and $P^2 = P$, since projecting twice changes nothing.',
            },
            {
              question: 'Why are orthonormal bases so convenient?',
              answerOutline: 'Coordinates become dot products, $Q^TQ = I$ removes the need to solve a system, and rounding errors are not amplified.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/vector-spaces-bases-and-inner-products'],
        },
        {
          slug: 'qr-factorisation',
          title: 'QR factorisation',
          summary:
            'Making any set of columns orthonormal: Gram-Schmidt, its numerical weakness, Householder reflections, and why this is how least squares is really computed.',
          estimatedMinutes: 90,
          objectives: [
            'Carry out Gram-Schmidt by hand on two or three vectors',
            'State what $Q$ and $R$ hold in $A = QR$',
            'Measure the loss of orthogonality in Gram-Schmidt',
            'Explain why Householder QR is preferred',
            'Solve a triangular system to get least squares coefficients',
          ],
          concepts: [
            'Gram-Schmidt',
            'Thin QR',
            'Modified Gram-Schmidt',
            'Loss of orthogonality',
            'Householder reflection',
            'Upper triangular $R$',
            'Numerical stability',
          ],
          explanation: `**Gram-Schmidt** turns any independent vectors into an orthonormal set with the same span. Take each vector in turn, subtract its projections onto the ones you already have, and normalise what is left:

$$q_1 = \\frac{a_1}{\\|a_1\\|}, \\quad v_2 = a_2 - (q_1 \\cdot a_2) q_1, \\quad q_2 = \\frac{v_2}{\\|v_2\\|},$$

and so on. Each $a_j$ is then a combination of $q_1, \\dots, q_j$, with the coefficients stored in an upper triangular $R$:

$$A = QR, \\qquad Q^TQ = I.$$

For an $n \\times p$ matrix, the thin version has $Q$ of shape $(n, p)$ and $R$ of shape $(p, p)$. The columns of $Q$ are a clean version of your features, and $R$ records how to get back.

**Least squares from QR.** Substitute $A = QR$ into $A^TA\\hat{x} = A^Tb$. Since $Q^TQ = I$ and $R$ is invertible, this reduces to

$$R\\hat{x} = Q^Tb.$$

That is one triangular solve. It never forms $A^TA$, so it does not square the condition number.

**The catch: rounding.** Classical Gram-Schmidt can lose orthogonality badly on nearly dependent columns. Subtracting two nearly equal vectors cancels most of the digits, and what remains is mostly rounding error. Measure this with the orthogonality loss $\\|Q^TQ - I\\|$, and compare it with the reconstruction error $\\|QR - A\\|$. On the $12 \\times 12$ Hilbert matrix:

| Method | Orthogonality loss | Reconstruction error |
|---|---|---|
| Classical Gram-Schmidt | 5.5 | $10^{-16}$ |
| Modified Gram-Schmidt | 0.33 | $10^{-16}$ |
| Householder (\`np.linalg.qr\`) | $1.4 \\times 10^{-15}$ | $4 \\times 10^{-16}$ |

All three reproduce $A$ perfectly, and this is a trap: a small reconstruction error does not reveal that $Q$ is not orthogonal. **Modified** Gram-Schmidt subtracts each projection one at a time, from the updated vector, and that helps a good deal. **Householder** QR does something different. Rather than building $Q$ column by column, it applies a sequence of reflections that zero out each column below the diagonal. Reflections are exactly orthogonal, so errors do not build up.

**In practice.** Use \`np.linalg.qr\` or \`np.linalg.lstsq\`, which uses the SVD. On \`longley\`, the normal equations disagree with \`lstsq\` by about $6 \\times 10^{-8}$ relative, whereas QR agrees to $3 \\times 10^{-13}$, five orders better. Write Gram-Schmidt yourself once, to see it. Then trust the library.

Read VMLS Sections 5.4 and 10.4, then do the exercises.`,
          resources: [
            { title: 'Introduction to Applied Linear Algebra (VMLS)', url: 'https://web.stanford.edu/~boyd/vmls/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Sections 5.4 and 10.4 on Gram-Schmidt and QR factorisation.', primary: true },
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture 17 on orthogonal matrices and Gram-Schmidt.' },
          ],
          exercises: [
            {
              slug: 'gram-schmidt-by-hand',
              title: 'Gram-Schmidt by hand',
              prompt:
                'Apply Gram-Schmidt to $a_1 = (1, 1, 0)$ and $a_2 = (1, 0, 1)$ by hand. Write $Q$ and $R$, and check that $QR$ reproduces the matrix and $Q^TQ = I$. Expected: $q_1 = (1, 1, 0)/\\sqrt{2}$, $q_2 = (1, -1, 2)/\\sqrt{6}$, and $R = \\begin{bmatrix} \\sqrt{2} & 1/\\sqrt{2} \\\\ 0 & \\sqrt{6}/2 \\end{bmatrix}$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'orthogonality-loss',
              title: 'Measure the loss of orthogonality',
              prompt:
                'Write `cgs(A)` and `mgs(A)`. On Hilbert matrices of size 6, 8, 10 and 12, report $\\|Q^TQ - I\\|$ and $\\|QR - A\\|$ for both, and for `np.linalg.qr`. Plot the orthogonality loss against $\\kappa$. Explain why the reconstruction error alone would mislead you. Expected at size 12: about 5.5, 0.33 and $10^{-15}$, with all three reconstructions near $10^{-16}$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'three-ways-to-fit',
              title: 'Three ways to fit `longley`',
              prompt:
                'Fit `Employed` on the other columns of `longley`, with an intercept, by (a) solving the normal equations, (b) $R\\hat{x} = Q^Tb$ from `np.linalg.qr`, and (c) `np.linalg.lstsq`. Report the largest relative difference from (c). Then repeat using the raw `Year` column squared as an extra feature, and report what happens to $\\kappa$ and each method. Expected before the extra feature: about $6 \\times 10^{-8}$ for (a), and $3 \\times 10^{-13}$ for (b).',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What do $Q$ and $R$ hold?',
              answerOutline: '$Q$ has orthonormal columns with the same span as $A$. $R$ is upper triangular and holds the coefficients that rebuild $A$.',
            },
            {
              question: 'Why does QR avoid the conditioning problem of the normal equations?',
              answerOutline: 'It never forms $A^TA$, so the condition number of the problem is not squared.',
            },
            {
              question: 'How can a QR factorisation reconstruct $A$ well and still be bad?',
              answerOutline: 'The product can match while $Q$ has lost orthogonality. You have to check $Q^TQ$ directly.',
            },
          ],
          relatedLessons: ['computational-physics/numerical-calculus-and-linear-algebra/numerical-linear-algebra'],
        },
        {
          slug: 'least-squares',
          title: 'Least squares',
          summary:
            'Fitting when there are more equations than unknowns: the normal equations from geometry, the residual, and fitting curves with a model that is linear in its coefficients.',
          estimatedMinutes: 90,
          objectives: [
            'Pose an overdetermined fit as minimising $\\|Ax - b\\|^2$',
            'Derive the normal equations from orthogonality',
            'Fit a line and a polynomial with a design matrix',
            'Explain the meaning of "linear" in linear least squares',
            'Add a ridge penalty and explain what it does',
          ],
          concepts: [
            'Overdetermined system',
            'Least squares problem',
            'Normal equations',
            'Design matrix',
            'Linear in the parameters',
            'Polynomial and periodic features',
            'Ridge regression',
          ],
          explanation: `With more rows than columns, $Ax = b$ usually has no solution: $b$ lies outside the column space. So look for the $x$ that comes closest, the **least squares** solution:

$$\\hat{x} = \\arg\\min_x \\|Ax - b\\|^2.$$

**The normal equations.** The projections lesson solved this already. The closest point $A\\hat{x}$ leaves a residual perpendicular to every column:

$$A^T(b - A\\hat{x}) = 0 \\quad \\Rightarrow \\quad A^TA\\hat{x} = A^Tb.$$

If the columns are independent, $A^TA$ is invertible and the solution is unique. Compute it through QR or \`np.linalg.lstsq\`, not by inverting.

**Fitting a line.** To fit $y \\approx \\beta_0 + \\beta_1 x$, build a **design matrix** with a column of ones and a column of $x$. Each row says what the model would predict for one observation.

\`\`\`python
A = np.column_stack([np.ones(len(x)), x])
beta, *_ = np.linalg.lstsq(A, y, rcond=None)
\`\`\`

For the points $(0, 6)$, $(1, 0)$ and $(2, 0)$, you get $\\beta = (5, -3)$, the fit from the projections exercise.

\`\`\`interactive
least-squares
{"title": "The least-squares line through three points", "points": [[0, 6], [1, 0], [2, 0]], "xName": "x", "yName": "y", "coef": "beta", "maxDegree": 2, "view": [-0.6, 2.8, -2, 7.5], "caption": "The green line is y = 5 − 3x, with residuals (1, −2, 1) and sum of squares 6. Turn on 'Draw my own line' and try to get a smaller sum: you cannot. Drag any point and watch β and the normal equations change. Raise the degree to 2: three coefficients fit three points exactly, which is the 'too many columns' warning in miniature."}
\`\`\`

**Linear in the parameters.** "Linear" here does not mean a straight line. It means the prediction is a linear combination of the coefficients, and the columns can be any function of the input. So you can fit

$$y \\approx \\beta_0 + \\beta_1 t + \\beta_2 t^2 + \\beta_3 \\sin(2\\pi t) + \\beta_4 \\cos(2\\pi t)$$

using exactly the same code. Only the design matrix changes. Seasonal trends, step changes and polynomial curves are all linear least squares. A model such as $e^{-kt}$, with $k$ inside the function, is not.

**Too many columns.** Higher-degree polynomials always fit the training data better, since adding a column can only shrink the residual. That is no proof they are better. Hold data back to check. Raw polynomial columns are also highly collinear, so use scaled or orthogonal polynomials.

**Ridge regression.** To stabilise an ill-conditioned or underdetermined problem, add a penalty:

$$\\min_x \\|Ax - b\\|^2 + \\lambda\\|x\\|^2 \\quad \\Rightarrow \\quad (A^TA + \\lambda I)x = A^Tb.$$

Adding $\\lambda$ lifts the small eigenvalues of $A^TA$, so the system becomes invertible and better conditioned. The price is a small bias. Standardise the features first, since the penalty treats all coefficients alike.

Read VMLS Chapters 12 and 13, which are the best applied treatment available.`,
          resources: [
            { title: 'Introduction to Applied Linear Algebra (VMLS)', url: 'https://web.stanford.edu/~boyd/vmls/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Chapters 12 and 13 on least squares and least squares data fitting.', primary: true },
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture 16 on projection matrices and least squares.' },
          ],
          exercises: [
            {
              slug: 'line-by-three-methods',
              title: 'A line by three methods',
              prompt:
                'Fit a line to $(0, 6)$, $(1, 0)$ and $(2, 0)$ by hand using the normal equations, then with QR, then with `np.linalg.lstsq`. Compute the residual vector, and show that it is orthogonal to both columns of $A$. Say what the value $\\|r\\|^2 = 6$ means. Expected: $\\beta = (5, -3)$ and $r = (1, -2, 1)$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'polynomial-overfit',
              title: 'Polynomial fits on real cars',
              prompt:
                'Predict `mpg` from `hp` in `mtcars`, using polynomials of degree 1 to 8. Hold out a random 10 rows with a seed. For each degree, report the training RMSE, the test RMSE and $\\kappa$ of the raw design matrix. Repeat 200 times, with new splits, and plot the average RMSE values. State which degree you would choose. Then explain why $\\kappa$ explodes, and what you would do about it.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'ridge-and-conditioning',
              title: 'Ridge on `longley`',
              prompt:
                'Standardise the predictors of `longley`, and centre `Employed`. For $\\lambda$ from $10^{-3}$ to $10^{2}$, on a log grid, solve the ridge equations, then record the coefficients, $\\kappa(A^TA + \\lambda I)$, and the training RMSE. Plot coefficient paths. Show that at $\\lambda = 0$ you recover ordinary least squares. Say what the penalty fixes, and what it does not, about the interpretation of these coefficients.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Derive the normal equations without calculus.',
              answerOutline: 'The closest point leaves a residual orthogonal to all columns, so $A^T(b - A\\hat{x}) = 0$.',
            },
            {
              question: 'Why is $y = \\beta_0 + \\beta_1 t + \\beta_2 t^2$ a linear model?',
              answerOutline: 'The prediction is linear in the coefficients $\\beta$, even though it is curved in $t$.',
            },
            {
              question: 'Why does adding a column never increase the training error?',
              answerOutline: 'The column space can only grow, so the projection gets closer or stays the same.',
            },
            {
              question: 'How does a ridge penalty improve conditioning?',
              answerOutline: 'It adds $\\lambda$ to every eigenvalue of $A^TA$, so the smallest is no longer near zero.',
            },
          ],
          relatedLessons: [
            'machine-learning/linear-models/linear-regression-and-least-squares',
            'machine-learning/linear-models/regularization-ridge-and-lasso',
          ],
        },
        {
          slug: 'linear-regression',
          title: 'Linear regression',
          summary:
            'Least squares as a data analysis tool: reading coefficients, $R^2$ as a ratio of squared lengths, and what happens when predictors are correlated.',
          estimatedMinutes: 80,
          objectives: [
            'Fit a multiple regression and interpret its coefficients with units',
            'Explain $R^2$ using the Pythagorean split of the data',
            'Explain how a coefficient changes when a correlated predictor is added',
            'State what the partial regression result says',
            'Say what a regression coefficient does not establish',
          ],
          concepts: [
            'Multiple regression',
            'Intercept',
            'Interpretation of coefficients',
            'Fitted values',
            '$R^2$',
            'Sums of squares decomposition',
            'Partial regression',
            'Omitted variables',
          ],
          explanation: `Regression is least squares with a question attached. Stack $n$ observations into $y$ and a design matrix $X$, then $\\hat{\\beta}$ minimises $\\|y - X\\beta\\|^2$, and the fitted values are $\\hat{y} = X\\hat{\\beta}$.

**The geometry of $R^2$.** Let $\\bar{y}$ be the mean. With an intercept in the model, the residual is perpendicular to both the ones column and $\\hat{y}$, so Pythagoras gives

$$\\|y - \\bar{y}\\|^2 = \\|\\hat{y} - \\bar{y}\\|^2 + \\|y - \\hat{y}\\|^2.$$

Total variation equals explained plus residual, and

$$R^2 = 1 - \\frac{\\|y - \\hat{y}\\|^2}{\\|y - \\bar{y}\\|^2}.$$

$R^2$ always rises when you add columns, so use held-out data to compare models.

**Example.** On \`mtcars\`, regressing \`mpg\` on weight alone gives

$$\\widehat{\\text{mpg}} = 37.29 - 5.34\\,\\text{wt}, \\quad R^2 = 0.753.$$

\`wt\` is in thousands of pounds, so each extra 1,000 pounds goes with 5.3 fewer miles per gallon. Adding horsepower gives

$$\\widehat{\\text{mpg}} = 37.23 - 3.88\\,\\text{wt} - 0.032\\,\\text{hp}, \\quad R^2 = 0.827.$$

**Why did the weight coefficient change?** Heavy cars tend to have big engines, so \`wt\` and \`hp\` are correlated. The first model credits weight with some of the effect of horsepower. The second splits the credit. A coefficient means "the change in prediction per unit of this feature, with the others in the model held fixed". Change the other features, and you change its meaning. It is a statement about the model.

**Partial regression.** There is an exact result here. To get the coefficient of \`wt\` in the two-predictor model, regress \`wt\` on the other columns and keep its residual, then regress \`mpg\` on that residual. The slope you get is exactly the same. So a multiple regression coefficient uses only the part of a feature that the other features cannot explain. If a feature is nearly a combination of others, that part is tiny and the coefficient is unstable, which is the conditioning issue again.

**What it does not show.** A coefficient is not an effect of intervening. Add 1,000 pounds to a real car and you would not get exactly this answer. Omitted variables can account for a pattern, and mpg in 1974 cars says little about cars today. Regression describes how columns relate in this table, and whether that applies to the world is a further argument.

Read the first chapters of VMLS on data fitting, or ISLR Chapter 3 for a statistician's account.`,
          resources: [
            { title: 'An Introduction to Statistical Learning', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani', note: 'Chapter 3 on linear regression, with the statistical view of what you built here.', primary: true },
            { title: 'Introduction to Applied Linear Algebra (VMLS)', url: 'https://web.stanford.edu/~boyd/vmls/', type: 'textbook', cost: 'free', provider: 'Boyd and Vandenberghe', note: 'Chapter 13, including validation and feature engineering.' },
          ],
          exercises: [
            {
              slug: 'regression-on-cars',
              title: 'Regress `mpg` on weight and power',
              prompt:
                'Fit `mpg ~ wt` and `mpg ~ wt + hp` with your own QR code. Report the coefficients with units, $R^2$ and RMSE. Verify the Pythagorean split numerically. Check against `numpy.linalg.lstsq`. Expected: $(37.285, -5.344)$ with $R^2 = 0.753$, then $(37.227, -3.878, -0.0318)$ with $R^2 = 0.827$ and RMSE 2.47.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'partial-regression',
              title: 'Check the partial regression result',
              prompt:
                'Using `mtcars`, reproduce the coefficient of `wt` in `mpg ~ wt + hp`: regress `wt` on the ones and `hp`, take the residuals, then regress `mpg` on them. Confirm the slope agrees to 10 decimals. Then compute how much of the variance of `wt` remains after removing `hp`, and connect that to why the coefficient of `wt` is less well determined when `hp` is present. Expected: a slope of $-3.878$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'coefficient-instability',
              title: 'How much do coefficients move?',
              prompt:
                'Using `mtcars`, fit `mpg` on `wt`, `hp`, `disp` and `drat`. Bootstrap the rows 2,000 times with a seed, and record each coefficient. Report the 2.5th and 97.5th percentiles. Compute correlations among the predictors and the $\\kappa$ of the standardised matrix. Decide which coefficient sign you would trust, and which you would not. State clearly what this analysis does not show about what causes fuel use.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'Explain $R^2$ as a statement about right-angled triangles.',
              answerOutline: 'The centred target splits into a fitted part and a perpendicular residual. $R^2$ is the share of squared length in the fitted part.',
            },
            {
              question: 'Why does the coefficient on `wt` change when `hp` is added?',
              answerOutline: 'They are correlated. The first model credits `wt` with part of what `hp` does, and the second splits the credit.',
            },
            {
              question: 'What does partial regression show about multiple regression?',
              answerOutline: 'Each coefficient uses only the part of the feature not explained by the others.',
            },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/linear-regression-and-least-squares'],
        },
        {
          slug: 'residuals-and-diagnostics',
          title: 'Residuals and diagnostics',
          summary:
            'Checking whether a fit deserves belief: residual plots, leverage from the hat matrix, and four datasets with identical regressions that are completely different.',
          estimatedMinutes: 80,
          objectives: [
            'Plot and read residuals against fitted values',
            'Compute leverage from the diagonal of the hat matrix',
            'Tell a high-leverage point from a large residual',
            'Measure a point\'s influence by refitting without it',
            'Use a data transformation to fix a residual pattern',
          ],
          concepts: [
            'Residual plot',
            'Hat matrix',
            'Leverage',
            'Influence',
            'Heteroscedasticity',
            'Non-linearity in residuals',
            'Anscombe\'s quartet',
          ],
          explanation: `A fitted model always gives you numbers, whether or not it fits. The residuals $r = y - \\hat{y}$ hold what the model did not explain, so that is where you look.

**Four datasets.** Anscombe's quartet is a set of four small tables. Each one has the same fit:

$$\\hat{y} = 3.00 + 0.50x, \\quad R^2 = 0.67.$$

Yet the first is ordinary noise around a line, the second is a smooth curve, the third is a tight line with one outlier, and in the fourth, one point alone determines the slope. The summary numbers cannot tell them apart. A plot can, at once.

**Residual plots.** Plot $r$ against $\\hat{y}$. You want a shapeless band around zero. A curve means the model is missing a non-linear term. A funnel means the spread grows with the level, known as **heteroscedasticity**, and a log transform often helps. Clusters suggest a missing category. Residuals are orthogonal to the columns, so any pattern you can see is one the model cannot express.

**Leverage.** The fitted values are a linear function of $y$: $\\hat{y} = Hy$, where $H = X(X^TX)^{-1}X^T$ is the projection matrix, called the **hat matrix** here. Its diagonal entry $h_i$ is the **leverage** of observation $i$, how much its own $y$ pulls its own fit.

Leverage depends only on $X$. It measures how unusual a row's features are. The values lie between $1/n$ and 1, and they sum to the number of columns $p$, so the average is $p/n$. Anything over about 2 or 3 times the average deserves a look. In the fourth Anscombe table, one point has leverage exactly 1, so the line must pass through it. With QR, $h_i = \\|q_i\\|^2$, the squared norm of row $i$ of $Q$.

**Influence.** A point matters most when it has both high leverage and a large residual, and refitting without it measures this directly. On \`mpg ~ wt + hp\`, the largest leverage is the Maserati Bora at 0.39, a car with unusually high power. The largest residuals belong to the Toyota Corolla (5.85) and the Fiat 128 (5.80). Those are different cars: a high-leverage point pulls the line towards itself, so its residual looks small.

**What to do.** Do not delete inconvenient points. Find out why they are unusual. Then report the results both with and without them.

Plot the quartet yourself before reading on.`,
          resources: [
            { title: "Anscombe's quartet", url: 'https://en.wikipedia.org/wiki/Anscombe%27s_quartet', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'The data, with plots and the history behind the example.', primary: true },
            { title: 'An Introduction to Statistical Learning', url: 'https://www.statlearning.com/', type: 'textbook', cost: 'free', provider: 'James, Witten, Hastie, Tibshirani', note: 'Section 3.3.3 on potential problems covers each pattern here.' },
            { title: "Anscombe's data (anscombe)", url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/anscombe.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'For the first exercise.' },
          ],
          exercises: [
            {
              slug: 'anscombe',
              title: 'Reproduce Anscombe',
              prompt:
                'Load `anscombe`. For each of the four pairs, fit a line and report the intercept, slope, $R^2$, largest absolute residual and largest leverage. Plot data with fit and residuals. Write one sentence on what is wrong in each panel, and what a better analysis would do. Expected: all about $(3.00, 0.50)$ with $R^2 = 0.67$. The largest residual is about 3.24 in the third panel, and the largest leverage is 1.0 in the fourth, against 0.318 in the others.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'leverage-with-qr',
              title: 'Leverage from QR',
              prompt:
                'For `mpg ~ wt + hp`, compute leverage as `(Q ** 2).sum(axis=1)` from thin QR, and confirm it matches the diagonal of $H$ and that it sums to 3. List the top 3 by leverage, and the top 3 by residual. For each of those cars, refit without it, then report the change in each coefficient. Which single car moves the fit the most? Expected: `Maserati Bora` (0.394), `Lincoln Continental` (0.209), `Ford Pantera L` (0.204). Top residuals are `Toyota Corolla`, `Fiat 128` and `Chrysler Imperial`.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'fix-a-residual-pattern',
              title: 'Fix a pattern with a transformation',
              prompt:
                'Fit `mpg ~ hp` on `mtcars`, and plot residuals against fitted values. Describe the curve. Then fit `np.log(mpg) ~ np.log(hp)`, and plot its residuals. Compare by leave-one-out RMSE on the original `mpg` scale, computing it with the shortcut $r_i / (1 - h_i)$ for the linear model. Explain what the log model says about percentage changes, and what it does not establish.',
              kind: 'data-analysis',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What should a good residual plot look like, and what do a curve and a funnel mean?',
              answerOutline: 'A shapeless band around zero. A curve suggests missing non-linearity, and a funnel suggests non-constant spread.',
            },
            {
              question: 'What is leverage, and what does it depend on?',
              answerOutline: 'The diagonal of the hat matrix: how much a point pulls its own fit. It depends only on the features, not on $y$.',
            },
            {
              question: 'Why can an influential point have a small residual?',
              answerOutline: 'It pulls the line towards itself, so the fit passes near it.',
            },
          ],
          relatedLessons: ['probability-statistics/hypothesis-testing-and-regression/linear-regression-and-least-squares'],
        },
      ],
    },
    {
      slug: 'eigenvalues-and-networks',
      title: 'Eigenvalues and Networks',
      description:
        'Directions a matrix only stretches: eigenvectors, the long-run behaviour of Markov chains, PageRank, and how graph Laplacians turn the structure of a network into linear algebra.',
      lessons: [
        {
          slug: 'eigenvalues-and-eigenvectors',
          title: 'Eigenvalues and eigenvectors',
          summary:
            'The directions a matrix does not rotate, what they say about repeated multiplication, and the special case of symmetric matrices.',
          estimatedMinutes: 100,
          objectives: [
            'Define an eigenvector and find eigenvalues of a $2 \\times 2$ matrix by hand',
            'Diagonalise a matrix and use it to compute powers',
            'Explain how eigenvalues control repeated multiplication',
            'State the spectral theorem for symmetric matrices',
            'Run power iteration to find a dominant eigenvector',
          ],
          concepts: [
            'Eigenvalue and eigenvector',
            'Characteristic equation',
            'Diagonalisation $A = V\\Lambda V^{-1}$',
            'Matrix powers',
            'Dominant eigenvalue',
            'Spectral theorem',
            'Power iteration',
            'Rayleigh quotient',
          ],
          explanation: `Most vectors change direction when a matrix acts on them. An **eigenvector** does not. It is only stretched:

$$Av = \\lambda v,$$

with the **eigenvalue** $\\lambda$ as the stretch factor.

**By hand.** $Av = \\lambda v$ means $(A - \\lambda I)v = 0$ with $v \\ne 0$, so $A - \\lambda I$ must be singular, which means its determinant is zero. For a $2 \\times 2$ matrix,

$$\\det\\begin{bmatrix} 4 - \\lambda & 1 \\\\ 2 & 3 - \\lambda \\end{bmatrix} = \\lambda^2 - 7\\lambda + 10 = 0,$$

so $\\lambda = 5$ and $\\lambda = 2$. Then solve $(A - \\lambda I)v = 0$ for each: $v = (1, 1)$ and $v = (1, -2)$. Two useful checks: the eigenvalues sum to the trace (7), and multiply to the determinant (10).

**Why they matter: powers.** If $A$ has a full set of independent eigenvectors, then $A = V\\Lambda V^{-1}$, where $\\Lambda$ is diagonal. In that basis, $A$ simply scales each axis, and

$$A^k = V \\Lambda^k V^{-1}.$$

Write a starting vector as $x_0 = c_1 v_1 + c_2 v_2 + \\dots$, and then

$$A^k x_0 = c_1 \\lambda_1^k v_1 + c_2 \\lambda_2^k v_2 + \\dots$$

The largest $|\\lambda|$ dominates as $k$ grows. If it exceeds 1, the system grows, and if it is below 1, it decays.

**Symmetric matrices.** Data science mostly meets symmetric matrices, such as covariance matrices and Laplacians. The **spectral theorem** says they have real eigenvalues and orthonormal eigenvectors: $A = Q\\Lambda Q^T$. So $A = \\sum_i \\lambda_i q_i q_i^T$, a sum of simple pieces. Use \`np.linalg.eigh\` for these. It is faster and more accurate than \`eig\`.

**Computing them.** Determinants are hopeless beyond tiny examples. **Power iteration** uses the formula above: multiply repeatedly, and normalise.

\`\`\`python
x = np.ones(n) / np.sqrt(n)
for _ in range(100):
    y = A @ x
    x = y / np.linalg.norm(y)
lam = x @ (A @ x)        # Rayleigh quotient
\`\`\`

The error shrinks by a factor of $|\\lambda_2 / \\lambda_1|$ per step, so a clear gap between the top two eigenvalues means fast convergence. Each step needs only a matrix-vector product, which is why this works on matrices with billions of rows.

**A warning.** Eigenvectors are determined only up to sign, and \`eig\` may return them in any order. Never compare them without checking the sign.

Watch the 3Blue1Brown chapter, then MIT 18.06 Lectures 21 and 22.`,
          resources: [
            { title: 'Essence of Linear Algebra', url: 'https://www.3blue1brown.com/topics/linear-algebra', type: 'video', cost: 'free', provider: '3Blue1Brown', note: 'The chapter on eigenvectors and eigenvalues.', primary: true },
            { title: 'Eigenvectors and Eigenvalues Explained Visually', url: 'https://setosa.io/ev/eigenvectors-and-eigenvalues/', type: 'interactive', cost: 'free', provider: 'Setosa', note: 'Drag vectors and watch repeated multiplication settle on an eigenvector.' },
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lectures 21, 22 and 25 on eigenvalues, diagonalisation and symmetric matrices.' },
          ],
          exercises: [
            {
              slug: 'eigen-by-hand',
              title: 'Eigenvalues by hand',
              prompt:
                'Find the eigenvalues and eigenvectors of $\\begin{bmatrix} 2 & 1 \\\\ 1 & 2 \\end{bmatrix}$ and $\\begin{bmatrix} 4 & 1 \\\\ 2 & 3 \\end{bmatrix}$ by hand. Check the trace and determinant rules. Confirm that the eigenvectors of the symmetric matrix are orthogonal, and that those of the other are not. Check with `eigh` and `eig`. Expected: 1 and 3, then 2 and 5.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'powers-and-growth',
              title: 'Predict a matrix power',
              prompt:
                'Two groups change each year by $x_{t+1} = Ax_t$, with $A = \\begin{bmatrix} 0 & 1 \\\\ 0.5 & 0.5 \\end{bmatrix}$. Find the eigenvalues. Compute $A^{50}$ from $V\\Lambda^{50}V^{-1}$ and from `np.linalg.matrix_power`, and compare. Starting from $x_0 = (100, 0)$, find the long-run values. Explain which eigenvalue decides the outcome, and how fast the other effect dies. Expected: eigenvalues 1 and $-0.5$, and about 33.33 in each group.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'power-iteration',
              title: 'Write power iteration',
              prompt:
                'Write `power_iteration(A, steps)`. Apply it to the adjacency matrix of Zachary\'s karate club from `networkx.karate_club_graph()`, unweighted, starting from all ones. Record the Rayleigh quotient at steps 1, 5, 10 and 20, and compare with `eigh`. Report the ratio $|\\lambda_2/\\lambda_1|$, and check that it predicts the rate at which the eigenvector error shrinks. Expected: $\\lambda_1 \\approx 6.7257$, and estimates of 4.588, 6.665, 6.725 and 6.7257. The second-largest absolute eigenvalue is about 4.977, a ratio of 0.74.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $Av = \\lambda v$ say geometrically?',
              answerOutline: '$A$ does not rotate $v$. It only scales it by $\\lambda$.',
            },
            {
              question: 'Why does the largest eigenvalue dominate $A^k x$?',
              answerOutline: 'Each eigen-component is multiplied by $\\lambda^k$, so the largest $|\\lambda|$ outgrows the others.',
            },
            {
              question: 'What is special about symmetric matrices?',
              answerOutline: 'Real eigenvalues and orthonormal eigenvectors, so $A = Q\\Lambda Q^T$.',
            },
            {
              question: 'What decides the speed of power iteration?',
              answerOutline: 'The ratio $|\\lambda_2 / \\lambda_1|$. A larger gap gives faster convergence.',
            },
          ],
          relatedLessons: [
            'math-methods/linear-algebra/eigenvalues-and-eigenvectors',
            'math-methods/linear-algebra/diagonalization-and-matrix-functions',
          ],
        },
        {
          slug: 'markov-chains',
          title: 'Markov chains',
          summary:
            'Modelling state changes with a transition matrix, finding the long-run distribution as an eigenvector, and how the second eigenvalue sets the speed of mixing.',
          estimatedMinutes: 90,
          objectives: [
            'Build a transition matrix from a description or from data',
            'Compute the distribution after $k$ steps',
            'Find a stationary distribution as an eigenvector',
            'State when a chain converges, and to what',
            'Estimate the mixing speed from the second eigenvalue',
          ],
          concepts: [
            'State and transition matrix',
            'Row-stochastic matrix',
            'Stationary distribution',
            'Left eigenvector',
            'Irreducible and aperiodic',
            'Mixing',
            'Spectral gap',
          ],
          explanation: `A **Markov chain** moves between states at random, and the next state depends only on the current one. Put the probabilities in a **transition matrix** $P$, where entry $P_{ij}$ is the probability of moving from state $i$ to $j$. Each row sums to 1.

As an example, take three customer states, active, lapsing and churned:

$$P = \\begin{bmatrix} 0.9 & 0.1 & 0 \\\\ 0.2 & 0.7 & 0.1 \\\\ 0 & 0.3 & 0.7 \\end{bmatrix}.$$

**Evolving.** If $x_t$ is a row vector of state probabilities, then $x_{t+1} = x_t P$, so $x_k = x_0 P^k$. Here the matrix multiplies from the right, because the probabilities are in a row.

**Long-run behaviour.** A **stationary distribution** $\\pi$ does not change: $\\pi P = \\pi$. So $\\pi$ is a left eigenvector of $P$ with eigenvalue 1, or an ordinary eigenvector of $P^T$. A stochastic matrix always has eigenvalue 1, and no eigenvalue is larger in absolute value. For this chain, $\\pi = (0.6, 0.3, 0.1)$.

**Will it converge?** If every state can reach every other (**irreducible**) and the chain does not cycle (**aperiodic**), then $x_0 P^k \\to \\pi$ from any start. Starting from all active, the chain has an $\\ell_1$ distance to $\\pi$ of 0.22 after 5 steps, 0.0077 after 20 and $10^{-5}$ after 50.

\`\`\`interactive
markov-chain
{"title": "Active, lapsing and churned customers", "P": [[0.9, 0.1, 0], [0.2, 0.7, 0.1], [0, 0.3, 0.7]], "convention": "row", "states": ["active", "lapsing", "churned"], "x0": [1, 0, 0], "kMax": 50, "caption": "Rows sum to 1 here and the distribution is a row vector, so each step is xₖ₊₁ = xₖP. Step from all active and check the ℓ₁ distance to π = (0.6, 0.3, 0.1): about 0.22 at k = 5 and 0.0077 at k = 20. The purple path crawls across the triangle of probability vectors to π, and on the log plot it falls along the slope 0.8 = |λ₂|. Drag the starting point anywhere in the triangle: the limit is the same. Then lower the churned-to-lapsing probability 0.3 towards 0 (the last entry of each row fills itself in): churned customers rarely return, π shifts towards churned, |λ₂| grows and convergence slows."}
\`\`\`

**How fast?** The eigenvalues of this $P$ are 1, 0.8 and 0.5. Everything except $\\pi$ decays like the second-largest $|\\lambda|$:

$$\\|x_k - \\pi\\| \\approx C |\\lambda_2|^k.$$

So $0.8^{20} \\approx 0.0115$, close to the measured shrinkage. The **spectral gap** $1 - |\\lambda_2|$ sets the mixing speed. A chain with a small gap has states it is slow to leave, which means it has bottlenecks. That idea returns with graph Laplacians.

**Estimating from data.** If you observe a sequence of states, then the maximum likelihood estimate of $P_{ij}$ is the count of $i \\to j$ transitions divided by the count of departures from $i$. Check for rows with few visits, because their probabilities are poorly determined.

**What to be careful about.** The Markov assumption is strong. Real customers have memory, and their behaviour can depend on how long they have been in a state. A stationary distribution also assumes that the matrix itself stays fixed. It is a statement about the model, not a forecast of the world.

Play with the Setosa visual, then read the MMDS section that leads into PageRank.`,
          resources: [
            { title: 'Markov Chains Explained Visually', url: 'https://setosa.io/ev/markov-chains/', type: 'interactive', cost: 'free', provider: 'Setosa', note: 'Build a chain and watch it run.', primary: true },
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture 24 on Markov matrices.' },
            { title: 'Mining of Massive Datasets', url: 'http://www.mmds.org/', type: 'textbook', cost: 'free', provider: 'Leskovec, Rajaraman and Ullman', note: 'Chapter 5 opens with random walks and stationary distributions.' },
          ],
          exercises: [
            {
              slug: 'customer-chain',
              title: 'Analyse a customer chain',
              prompt:
                'For the matrix in the lesson, compute $x_0P^k$ for $k = 1, 5, 20, 50, 100$, starting from $(1, 0, 0)$. Find $\\pi$ with `np.linalg.eig(P.T)`, normalising it to sum to 1. Solve $\\pi(P - I) = 0$ by hand to confirm. Report the eigenvalues, and compare the shrinkage rate of $\\|x_k - \\pi\\|_1$ with the second eigenvalue. Expected: $\\pi = (0.6, 0.3, 0.1)$, eigenvalues 1, 0.8, 0.5, and distances 0.6, 0.223, 0.0077 at $k = 1, 5, 20$.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'estimate-a-chain',
              title: 'Estimate a chain from data',
              prompt:
                'With a seed, simulate 10,000 steps of that chain. Estimate $\\hat{P}$ from counts, then compute its stationary distribution, and compare both to the truth. Repeat with 100 steps. Say how the error scales with sequence length, and which row of $\\hat{P}$ is worst determined, and why. Then look at the time spent in each state, and compare with $\\pi$.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'bottleneck-chain',
              title: 'A chain with a bottleneck',
              prompt:
                'Build a 6-state chain made of two groups of 3 states. Within a group, move uniformly. Between groups, move with probability $\\epsilon$. For $\\epsilon = 0.1, 0.01, 0.001$, compute $|\\lambda_2|$, and count how many steps it takes to get within 0.01 in $\\ell_1$ from a start in one group. Explain how the spectral gap detects the bottleneck, and why this is the basis of spectral clustering.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a stationary distribution, in terms of eigenvectors?',
              answerOutline: 'A left eigenvector of $P$ with eigenvalue 1, normalised so its entries sum to 1.',
            },
            {
              question: 'What conditions make a chain converge to one distribution from any start?',
              answerOutline: 'It must be irreducible and aperiodic.',
            },
            {
              question: 'What does a second eigenvalue near 1 mean?',
              answerOutline: 'Slow mixing, which usually means a bottleneck between groups of states.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/eigenvalues-and-eigenvectors'],
        },
        {
          slug: 'pagerank',
          title: 'PageRank',
          summary:
            'Ranking by following links: the random surfer, the damping factor that makes the problem solvable, and computing a dominant eigenvector by power iteration.',
          estimatedMinutes: 90,
          objectives: [
            'Build a link matrix from a directed graph',
            'State the PageRank equation and explain damping',
            'Handle dangling nodes correctly',
            'Run PageRank by power iteration',
            'Explain how damping sets the convergence rate',
          ],
          concepts: [
            'Random surfer',
            'Column or row stochastic link matrix',
            'Dangling nodes',
            'Damping factor',
            'Teleportation',
            'Google matrix',
            'Spectral gap of $1 - d$',
          ],
          explanation: `How do you rank pages when anyone can write anything? **PageRank** counts links, but weights a link by the importance of who gave it, a circular definition that linear algebra resolves.

**The random surfer.** A surfer follows a random link from the current page. In the long run, the fraction of time spent on each page is its importance. That is the stationary distribution of a Markov chain with $P_{ij} = 1/\\text{out}(i)$ when page $i$ links to $j$.

**Two problems.** A page with no outgoing links, a **dangling node**, absorbs probability, since its row is all zeros. And a group of pages with links only among themselves traps the surfer, so the chain is not irreducible.

**Damping.** Both are fixed by teleportation. With probability $d$ the surfer follows a link, and with probability $1 - d$ jumps to a random page. A dangling node sends its surfer to a random page. The update is

$$x_{t+1} = d\\,(x_t P) + \\frac{d\\,s_t + 1 - d}{n}\\,\\mathbf{1},$$

where $s_t$ is the total probability sitting on dangling nodes. The usual value is $d = 0.85$. This matrix has all positive entries, so a unique stationary distribution exists and is reached from any start.

**Example.** Take links $0 \\to 1$, $0 \\to 2$, $1 \\to 2$, $2 \\to 0$, $3 \\to 2$. With $d = 0.85$,

$$x \\approx (0.372, 0.196, 0.394, 0.038).$$

Page 2 has the most incoming links and wins. Page 0 has just one link in, but ranks close behind, because that link comes from page 2. Page 3 has no links in, so it gets only the teleport share, $0.15/4$.

**Computing it.** Power iteration needs just a matrix-vector product, so it scales to the web.

**Convergence.** Teleporting shrinks every other eigenvalue by a factor of $d$, so $|\\lambda_2| \\le d$, and the error falls at least as fast as $d^k$. So $d$ trades realism against speed: a larger $d$ follows the link structure more closely but converges more slowly.

**Beyond the web.** Any directed network of endorsement works: citations, airline routes, or trade between countries. The interpretation changes, though. On airline routes, PageRank says where a random passenger ends up, which is not the same as which airports hold the network together. MP 2 explores exactly this gap.

Read MMDS Chapter 5 through Section 5.2, then code the update yourself.`,
          resources: [
            { title: 'Mining of Massive Datasets', url: 'http://www.mmds.org/', type: 'textbook', cost: 'free', provider: 'Leskovec, Rajaraman and Ullman', note: 'Chapter 5, Sections 5.1 and 5.2, on PageRank and computing it at scale.', primary: true },
            { title: 'PageRank', url: 'https://en.wikipedia.org/wiki/PageRank', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'The history, and the mathematics of the damping factor.' },
          ],
          exercises: [
            {
              slug: 'pagerank-by-hand',
              title: 'PageRank on a small graph',
              prompt:
                'For the 4-page graph in the lesson, write $P$ and run the update with $d = 0.85$ in NumPy, until the $\\ell_1$ change is below $10^{-10}$. Check that the result sums to 1, and that it is a fixed point. Then add page 4 with no outgoing links and a link from page 0, and handle it correctly. Compare your result with `networkx.pagerank`. Expected for the first part: $(0.3725, 0.1958, 0.3941, 0.0375)$.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'damping-experiment',
              title: 'The effect of damping',
              prompt:
                'On the karate club graph, treating each edge as two directed links, run PageRank with $d = 0.5, 0.85, 0.95, 0.99$. Report the $\\ell_1$ iterations to reach $10^{-12}$, and the top 5 nodes. Compare the counts with the bound $\\ln(10^{-12}) / \\ln d$, and explain why the real counts are lower. Then, on this undirected graph, compare the result at $d = 0.99$ with degree$/\\sum$degree. Expected: 28, 75, 118 and 150 iterations, against bounds of about 40, 170, 539 and 2,749. The top nodes are 33, 0 and 32, with scores 0.101, 0.097 and 0.072 at $d = 0.85$.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'gaming-pagerank',
              title: 'Can PageRank be gamed?',
              prompt:
                'Start from a 100-node random directed graph with a seed. Pick a low-ranked node, and add a "link farm" of $k$ new nodes that link only to it, with it linking back to them. Report its rank and score for $k = 0, 5, 20, 100$. Compare with the effect of a single link from the top-ranked node. Explain what this shows about what PageRank measures, and what the damping factor limits.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does the damping factor do mathematically?',
              answerOutline: 'It mixes in a uniform jump, so the matrix is positive, guaranteeing a unique stationary distribution, and it bounds $|\\lambda_2|$ by $d$.',
            },
            {
              question: 'How do you treat a dangling node, and why?',
              answerOutline: 'Spread its probability uniformly. Otherwise probability leaks out and the total falls.',
            },
            {
              question: 'Why does PageRank suit very large graphs?',
              answerOutline: 'Power iteration needs only matrix-vector products with a sparse matrix.',
            },
          ],
        },
        {
          slug: 'graph-laplacians',
          title: 'Graph Laplacians',
          summary:
            'A matrix that measures how much a labelling varies across edges: zero eigenvalues count components, and the next eigenvector finds the best cut.',
          estimatedMinutes: 100,
          objectives: [
            'Build adjacency, degree and Laplacian matrices',
            'Show that $x^TLx$ sums squared differences across edges',
            'Count connected components from zero eigenvalues',
            'Use the Fiedler vector to split a graph',
            'Explain when to use the normalised Laplacian',
          ],
          concepts: [
            'Adjacency matrix',
            'Degree matrix',
            'Laplacian $L = D - A$',
            'Quadratic form',
            'Algebraic connectivity',
            'Fiedler vector',
            'Conductance',
            'Normalised Laplacian',
          ],
          explanation: `A graph with $n$ nodes has an **adjacency matrix** $A$, with $A_{ij} = 1$ if $i$ and $j$ are linked, and a diagonal **degree matrix** $D$ holding each node's number of links. The **Laplacian** is

$$L = D - A.$$

Its power comes from a single identity. For any vector $x$ with one number per node,

$$x^TLx = \\sum_{\\text{edges } (i, j)} (x_i - x_j)^2.$$

So $L$ measures how much a labelling changes across edges. It is small if linked nodes get similar values, which also shows $L$ is positive semi-definite, so its eigenvalues are at least 0.

**Eigenvalue zero.** $x = \\mathbf{1}$, the same value everywhere, gives zero. If the graph has $c$ connected components, each one gives an independent zero-energy vector, so

$$\\text{number of zero eigenvalues} = \\text{number of components}.$$

Connectivity, a discrete property, becomes a rank question: $\\text{rank}(L) = n - c$.

**The Fiedler vector.** The smallest non-zero eigenvalue $\\lambda_2$, called the **algebraic connectivity**, says how well connected the graph is. Its eigenvector, the **Fiedler vector**, solves

$$\\min_{x \\perp \\mathbf{1},\\ \\|x\\| = 1} x^TLx.$$

That is the smoothest non-constant labelling, so its positive and negative entries divide the graph along a natural weak point.

**A real example.** Zachary's karate club is a network of 34 members and 78 friendships. The club later split in two over a dispute. Using only the friendships, the sign of the Fiedler vector places 32 of the 34 members on the side they really joined. The two it misses, nodes 2 and 8, have close friends on both sides.

**Normalised Laplacian.** $L$ can favour cutting off a few weakly linked nodes rather than making a balanced split. The **normalised Laplacian** $I - D^{-1/2}AD^{-1/2}$ corrects for degree, and it is closely linked to a random walk: its eigenvalues are 1 minus those of the walk matrix $D^{-1}A$. So a small eigenvalue here is the same thing as a slow-mixing chain.

**Measuring a cut.** The **conductance** of a set $S$ is the number of edges leaving $S$ divided by the smaller of the two sides' total degree. A **sweep cut** sorts nodes by the eigenvector and tries every threshold, keeping the lowest conductance. On real networks the best cut is often a small, peripheral cluster rather than a big balanced split, which is itself a finding.

Read von Luxburg's tutorial through Section 5, then do the exercises.`,
          resources: [
            { title: 'A Tutorial on Spectral Clustering', url: 'https://arxiv.org/abs/0711.0189', type: 'article', cost: 'free', provider: 'Ulrike von Luxburg', note: 'The standard introduction. Sections 2 to 5 cover graphs, Laplacians and the algorithms.', primary: true },
            { title: 'Laplacian matrix', url: 'https://en.wikipedia.org/wiki/Laplacian_matrix', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'Definitions and the variants of normalisation.' },
            { title: 'NetworkX: karate_club_graph', url: 'https://networkx.org/documentation/stable/reference/generated/networkx.generators.social.karate_club_graph.html', type: 'documentation', cost: 'free', provider: 'NetworkX', note: 'The data for this lesson, including each member\'s eventual club.' },
          ],
          exercises: [
            {
              slug: 'laplacian-by-hand',
              title: 'A Laplacian by hand',
              prompt:
                'For the path graph $0 - 1 - 2 - 3$, write $A$, $D$ and $L$. Check $x^TLx$ against the edge sum for $x = (1, 2, 4, 8)$. Find the eigenvalues with `eigh`. Then delete the middle edge, and report what happens to the zero eigenvalues. Expected: $x^TLx = 1 + 4 + 16 = 21$, eigenvalues about 0, 0.586, 2, 3.414, and two zero eigenvalues after the deletion.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'split-the-karate-club',
              title: 'Split the karate club',
              prompt:
                'Load the karate club with `networkx`, ignoring edge weights. Compute $L$, $\\lambda_2$ and the Fiedler vector, then split by sign and compare with the `club` attribute. Repeat with the normalised Laplacian. Report the accuracy, the nodes misplaced, and the sweep cut with the lowest conductance. Say what a good match here does and does not prove about spectral methods. Expected: $\\lambda_2 \\approx 0.4685$, 32 of 34 correct for both matrices, with nodes 2 and 8 misplaced.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'prove-the-identity',
              title: 'Prove the quadratic form identity',
              prompt:
                'Prove $x^TLx = \\sum_{(i, j)} (x_i - x_j)^2$ from $L = D - A$. Using it, prove that $L$ is positive semi-definite, and that a connected graph has exactly one zero eigenvalue. Check on a random graph that $\\text{rank}(L) = n - c$, computing $c$ independently using `networkx.number_connected_components`.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $x^TLx$ measure?',
              answerOutline: 'The sum of squared differences of $x$ across all edges.',
            },
            {
              question: 'How do you count connected components from $L$?',
              answerOutline: 'Count its zero eigenvalues, which equals $n$ minus its rank.',
            },
            {
              question: 'Why does the Fiedler vector suggest a cut?',
              answerOutline: 'It is the smoothest labelling orthogonal to the constant, so it changes least across edges, and its sign change falls at a weak point.',
            },
          ],
        },
        {
          slug: 'network-analysis',
          title: 'Network analysis',
          summary:
            'Answering questions about a network with matrices: walks, reachability, centrality, and comparing what degree, PageRank and spectral measures each detect.',
          estimatedMinutes: 80,
          objectives: [
            'Count walks with powers of the adjacency matrix',
            'Compute degree, eigenvector and PageRank centrality',
            'Explain how centrality measures differ, using one network',
            'Find articulation-style weak points by removing nodes',
            'Report the size of the largest connected component',
          ],
          concepts: [
            'Powers of $A$ count walks',
            'Degree centrality',
            'Eigenvector centrality',
            'Hubs versus bridges',
            'Connected components',
            'Robustness to node removal',
            'Rank correlation between measures',
          ],
          explanation: `Network questions turn into matrix questions once you have $A$.

**Walks.** Entry $(i, j)$ of $A^k$ counts the walks of length $k$ from $i$ to $j$. A walk of length 2 picks an intermediate node, and $(A^2)_{ij} = \\sum_m A_{im}A_{mj}$ adds up the options. So $A^2$ on the diagonal gives degrees, and $\\text{trace}(A^3)/6$ counts triangles, a measure of how clustered friendships are. For the karate club, this gives 45 triangles.

**Centrality.** There are several reasonable meanings of "important", and they disagree.

- **Degree**: count of neighbours. It is simple and local.
- **Eigenvector centrality**: your score is proportional to the sum of your neighbours' scores, so $Ax = \\lambda x$ with the dominant eigenvector. It rewards being linked to well-linked nodes.
- **PageRank**: similar, but a node divides its vote among its links, and teleporting keeps things stable. It also works on directed graphs.

On the karate club, degree ranks members 33, 0, 32, 2 and 1, with 17, 16, 12, 10 and 9 links. Eigenvector centrality gives 33, 0, 2, 32 and 1. The top is stable, while the order below changes.

**Hubs are not always bridges.** Centrality measures busy nodes, and a different question is which nodes hold a network together. A **cut vertex** is a node whose removal disconnects the graph. It can have few links: a village airport's only connection may be a modest regional hub. To find one, remove each node in turn and count connected components. That takes $O(n(n + m))$ work with breadth-first search, which is fine for thousands of nodes, and it is an exact answer rather than a spectral estimate.

**Robustness.** A useful experiment removes the top $k$ nodes under each measure, and tracks the size of the largest component. Real networks are often robust to random failures and fragile to targeted ones.

**How to compare measures.** Use a rank correlation, such as Spearman's, because measures have different scales and heavy tails. Then regress one measure on another and read the residuals: a node with far more PageRank than its degree predicts is doing something structural.

**What the numbers do not say.** A network is a choice about what counts as an edge. Unweighted edges hide intensity, snapshots hide time, and missing edges are common. State what an edge means before you interpret anything.

Then read the MMDS chapter on social networks.`,
          resources: [
            { title: 'Mining of Massive Datasets', url: 'http://www.mmds.org/', type: 'textbook', cost: 'free', provider: 'Leskovec, Rajaraman and Ullman', note: 'Chapter 10 on mining social-network graphs.', primary: true },
            { title: 'NetworkX: karate_club_graph', url: 'https://networkx.org/documentation/stable/reference/generated/networkx.generators.social.karate_club_graph.html', type: 'documentation', cost: 'free', provider: 'NetworkX', note: 'NetworkX also provides centrality functions for checking your own code.' },
          ],
          exercises: [
            {
              slug: 'walks-and-triangles',
              title: 'Walks and triangles',
              prompt:
                'For the karate club adjacency matrix, unweighted, compute $A^2$ and $A^3$. Confirm that the diagonal of $A^2$ equals the degrees. Find how many common neighbours members 0 and 33 share. Compute the triangle count from $\\text{trace}(A^3)/6$, and compare with `networkx.triangles`. Expected: 45 triangles.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'compare-centrality',
              title: 'Compare centrality measures',
              prompt:
                'For the karate club, compute degree, eigenvector and PageRank centrality with your own NumPy code. Report the top 5 by each measure, and the Spearman correlation between each pair. Regress log PageRank on log degree, and list the 3 largest residuals in each direction. Say what those members have in common, using the graph. Expected: degree top 5 is 33, 0, 32, 2, 1 and eigenvector top 5 is 33, 0, 2, 32, 1.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'attack-a-network',
              title: 'Random failure against targeted attack',
              prompt:
                'On the karate club, remove nodes in 3 orders: by degree, by PageRank, and at random (averaging 200 orders, with a seed). After each removal, record the size of the largest connected component. Plot the three curves. Then list any cut vertices, and say whether each is high in degree. Explain what such a plot does and does not show about a real organisation.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does $(A^k)_{ij}$ count?',
              answerOutline: 'The number of walks of length $k$ from $i$ to $j$.',
            },
            {
              question: 'How does eigenvector centrality differ from degree?',
              answerOutline: 'It weights neighbours by their own importance, not merely counts them.',
            },
            {
              question: 'Why can a low-degree node matter more than a hub for connectivity?',
              answerOutline: 'It may be a cut vertex, the only link to part of the network, while a hub\'s neighbours have other routes.',
            },
          ],
          relatedLessons: ['data-structures-algorithms/graphs/graph-representations-bfs-dfs'],
        },
      ],
    },
    {
      slug: 'svd-and-pca',
      title: 'SVD and PCA',
      description:
        'The singular value decomposition, the most useful factorisation in data science: its geometry, low-rank approximation, principal component analysis, and predicting missing entries with factorised models.',
      lessons: [
        {
          slug: 'singular-value-decomposition',
          title: 'The singular value decomposition',
          summary:
            'Every matrix is a rotation, a stretch and another rotation. This factorisation works for any shape, and it explains rank, conditioning and the pseudoinverse.',
          estimatedMinutes: 100,
          objectives: [
            'State the SVD and the shapes of its factors',
            'Interpret the factors geometrically',
            'Compute singular values from $A^TA$ for a small matrix',
            'Read rank, condition number and norm from the singular values',
            'Use the pseudoinverse to solve a rank-deficient system',
          ],
          concepts: [
            'Singular values',
            'Left and right singular vectors',
            'Thin SVD',
            'Relation to $A^TA$',
            'Sum of rank-one matrices',
            'Frobenius norm',
            'Pseudoinverse',
          ],
          explanation: `Eigenvectors need a square matrix, and even then they may not be orthogonal. The **singular value decomposition** has neither limit. Every $m \\times n$ matrix can be written

$$A = U\\Sigma V^T,$$

where $U$ and $V$ have orthonormal columns and $\\Sigma$ is diagonal, with **singular values** $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge 0$.

**Geometry.** Any linear map is a rotation ($V^T$), then an axis-aligned stretch ($\\Sigma$), then another rotation ($U$). The map sends the unit circle to an ellipse, and the singular values are the lengths of its axes. Each $v_i$ maps to $\\sigma_i u_i$: $Av_i = \\sigma_i u_i$.

**How to compute one by hand.** Since $A^TA = V\\Sigma^2V^T$, the right singular vectors are eigenvectors of $A^TA$, and the singular values are the square roots of its eigenvalues. For

$$A = \\begin{bmatrix} 3 & 0 \\\\ 4 & 5 \\end{bmatrix}, \\quad A^TA = \\begin{bmatrix} 25 & 20 \\\\ 20 & 25 \\end{bmatrix},$$

the eigenvalues are 45 and 5, so $\\sigma_1 = 3\\sqrt{5} \\approx 6.708$ and $\\sigma_2 = \\sqrt{5} \\approx 2.236$. Real software does not form $A^TA$, because that would square the condition number. Use \`np.linalg.svd(A, full_matrices=False)\`, which gives the **thin** SVD.

\`\`\`interactive
matrix-transform
{"title": "The unit circle under A", "A": [[3, 0], [4, 5]], "x": [1, 0], "view": 7.5, "mode": "svd", "modes": ["svd", "transform"], "presets": ["shear", "rotation", "singular"], "caption": "The dashed circle maps to the cyan ellipse, whose semi-axes σ₁u₁ and σ₂u₂ have lengths 6.708 and 2.236. The dashed v₁ and v₂ on the circle are the directions that land on them: rotate by Vᵀ, stretch by Σ, rotate by U. Move x round the circle with the slider and watch |Ax| stay between σ₂ and σ₁. Drag a column of A towards the other and watch σ₂ shrink: the condition number σ₁/σ₂ grows, and at the Singular preset the ellipse flattens to a segment."}
\`\`\`

**A sum of simple pieces.** The SVD says

$$A = \\sigma_1 u_1 v_1^T + \\sigma_2 u_2 v_2^T + \\dots$$

Each term is a rank-one matrix, ordered by importance. For a data matrix, think of $v_i$ as a pattern across features, $u_i$ as how strongly each row expresses it, and $\\sigma_i$ as the size of that pattern overall.

**One decomposition, many answers.**

- **Rank**: the number of non-zero $\\sigma_i$. Numerically, the number above a tolerance. This is what \`matrix_rank\` counts.
- **Condition number**: $\\sigma_1/\\sigma_r$.
- **Norms**: the Frobenius norm is $\\|A\\|_F = \\sqrt{\\sum_i \\sigma_i^2}$, and the spectral norm is $\\sigma_1$. For the matrix above, $\\|A\\|_F = \\sqrt{50} \\approx 7.07$.
- **Subspaces**: $U$ gives the column space and $V$ the row space, and the rest give the null spaces.

**The pseudoinverse.** $A^+ = V\\Sigma^+U^T$, where $\\Sigma^+$ inverts the non-zero values and leaves zeros alone. Then $x = A^+b$ is the least squares solution with the smallest norm, even if $A$ is rank-deficient. This is what \`np.linalg.lstsq\` computes. In practice you would cut off tiny $\\sigma_i$, because inverting one amplifies noise.

Watch MIT 18.06 Lecture 29 and read VMLS or MML Chapter 4.`,
          resources: [
            { title: 'MIT 18.06 Linear Algebra', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture 29 on the singular value decomposition.', primary: true },
            { title: 'MIT 18.065 Matrix Methods in Data Analysis', url: 'https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lectures 6 and 7 on the SVD and the Eckart-Young theorem.' },
            { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'textbook', cost: 'free', provider: 'Deisenroth, Faisal and Ong', note: 'Chapter 4 on matrix decompositions.' },
          ],
          exercises: [
            {
              slug: 'svd-by-hand',
              title: 'An SVD by hand',
              prompt:
                'For $A = \\begin{bmatrix} 3 & 0 \\\\ 4 & 5 \\end{bmatrix}$, find $A^TA$, the singular values and $V$, then compute $U$ using $u_i = Av_i/\\sigma_i$. Check $U\\Sigma V^T = A$. Compare with `np.linalg.svd`, noting that signs may differ. Report the rank, the Frobenius norm and $\\kappa$. Expected: $\\sigma = (6.708, 2.236)$, $\\|A\\|_F = 7.071$ and $\\kappa = 3$.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'pseudoinverse',
              title: 'Least squares with a rank-deficient matrix',
              prompt:
                'Build a design matrix for `Sepal.Length` in `iris`, with an intercept and all 3 species dummies, so it has rank 3. Compute the pseudoinverse solution from your own SVD code, cutting off singular values below $10^{-10}$. Show that it matches `np.linalg.lstsq` and `np.linalg.pinv`. Add a null vector, and show that the predictions do not change but the norm rises. Explain what makes this solution special among all those that fit equally well.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'singular-values-as-diagnosis',
              title: 'Singular values as a diagnosis',
              prompt:
                'Compute the singular values of the standardised `longley` predictors, and those of 16 rows of 6 independent normal columns with a seed. Plot both on a log scale. Report each $\\kappa$. Explain what the fast drop in the first says about the data. Connect it to the unstable coefficients from Module 2, using the formula for $\\hat\\beta$ in terms of the SVD.',
              kind: 'data-analysis',
              difficulty: 3,
              hint: '$\\hat\\beta = \\sum_i \\frac{u_i^Ty}{\\sigma_i} v_i$, so small $\\sigma_i$ amplify noise.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the SVD say about any linear map?',
              answerOutline: 'It is a rotation, then an axis-aligned stretch, then another rotation.',
            },
            {
              question: 'How are singular values related to eigenvalues?',
              answerOutline: 'They are the square roots of the eigenvalues of $A^TA$.',
            },
            {
              question: 'Name three properties you can read from the singular values.',
              answerOutline: 'The rank, the condition number, and the Frobenius and spectral norms.',
            },
          ],
          relatedLessons: ['math-methods/linear-algebra/diagonalization-and-matrix-functions'],
        },
        {
          slug: 'low-rank-approximation',
          title: 'Low-rank approximation',
          summary:
            'Keeping only the largest pieces of a matrix: the Eckart-Young theorem, compressing an image, and how to choose a rank from the singular value curve.',
          estimatedMinutes: 90,
          objectives: [
            'Build the best rank-$k$ approximation from the SVD',
            'State the Eckart-Young theorem',
            'Compute the error of an approximation from singular values',
            'Compare energy kept with storage used',
            'Choose a rank from a scree plot, and say when that is unclear',
          ],
          concepts: [
            'Truncated SVD',
            'Eckart-Young theorem',
            'Energy of a matrix',
            'Relative error',
            'Scree plot',
            'Storage cost',
            'Signal and noise singular values',
          ],
          explanation: `Truncate the SVD after $k$ terms:

$$A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T = U_k \\Sigma_k V_k^T.$$

The **Eckart-Young theorem** says that $A_k$ is the best rank-$k$ approximation of $A$, in both the Frobenius and spectral norms. No other rank-$k$ matrix comes closer. The error is known exactly:

$$\\|A - A_k\\|_F = \\sqrt{\\sum_{i > k} \\sigma_i^2}, \\qquad \\|A - A_k\\|_2 = \\sigma_{k+1}.$$

So the singular values tell you exactly how much you lose.

**Why this matters.** A rank-$k$ matrix needs only $k(m + n + 1)$ numbers, against $mn$. If data have low-rank structure, you can store, denoise and compute on them with far less work. This is the sense in which a table can have a small true dimension.

**An image.** A photograph is a matrix of brightness values. For the $427 \\times 640$ greyscale \`china.jpg\` that comes with scikit-learn:

| Rank | Energy kept | Relative error | Storage |
|---|---|---|---|
| 5 | 96.6% | 18.4% | 2.0% |
| 20 | 98.1% | 13.6% | 7.8% |
| 50 | 98.9% | 10.3% | 19.5% |
| 100 | 99.5% | 7.4% | 39.1% |

**Energy** is $\\sum_{i \\le k} \\sigma_i^2 / \\sum_i \\sigma_i^2$. Do not be fooled by its high numbers. Here the first singular value mostly captures the average brightness, so energy looks excellent even at rank 5, while the picture is plainly blurry. Relative error, which is the square root of the energy missed, gives a more honest reading. Removing the mean first gives a fairer measure, as PCA does.

\`\`\`interactive
low-rank-image
{"title": "Rank, energy and error on a small image", "k": 3, "images": ["house", "letters", "rings", "noise"], "caption": "A 48 × 48 picture, its SVD computed in your browser. At rank 3 the energy kept is already above 98% while the picture is still poor: compare that with the relative error readout, the square root of the energy missed. The singular value plot is the scree plot of the next paragraph; for Noise it falls smoothly with no elbow, and no small rank looks right. Switch to 'The error' to see what Aₖ leaves out."}
\`\`\`

JPEG does far better at the same quality, since an SVD basis must be stored with the image.

**Choosing $k$.** A **scree plot** shows $\\sigma_i$ against $i$, usually on a log axis. Sometimes there is a clear elbow where the signal values end and a noise floor begins. For a matrix of pure noise, the singular values fall smoothly, and there is no such elbow. Often no clean elbow exists, and the right $k$ depends on the task. Then use held-out performance, or a stated tolerance such as keeping 90% of the variance.

**Denoising.** If $A = \\text{signal} + \\text{noise}$, and the signal has low rank, then truncation drops most of the noise, because noise spreads thinly across all directions while the signal concentrates in a few.

Implement the table above yourself, then look at the pictures.`,
          resources: [
            { title: 'Foundations of Data Science', url: 'https://www.cs.cornell.edu/jeh/book.pdf', type: 'textbook', cost: 'free', provider: 'Blum, Hopcroft and Kannan', note: 'Chapter 3 proves that the SVD gives best-fit subspaces.', primary: true },
            { title: 'MIT 18.065 Matrix Methods in Data Analysis', url: 'https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'Lecture 7 on Eckart-Young and low-rank approximation.' },
          ],
          exercises: [
            {
              slug: 'compress-an-image',
              title: 'Compress an image',
              prompt:
                'Load `sklearn.datasets.load_sample_image("china.jpg")`, which needs `pip install pillow`, and average the channels to get a greyscale matrix. Compute the SVD. For $k = 5, 20, 50, 100$, make the approximation and show it. Report energy, relative error, and storage as a fraction of the original. Confirm that the error computed from singular values matches `np.linalg.norm(A - Ak)`. Then repeat the energy calculation after subtracting the mean, and explain the difference. Expected: the table in the lesson.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'signal-in-noise',
              title: 'Find the signal in noise',
              prompt:
                'With a seed, make a rank-3 matrix of shape `(500, 300)` from random factors, and add noise of standard deviation $\\sigma$. For $\\sigma = 0.1, 1, 5$, plot the singular values. Find the best rank by the error against the clean matrix, and see whether the plot suggests the same answer. Then compare the error of the rank-3 truncation with that of the noisy matrix itself, and explain how truncation can land closer to the truth than the measurement.',
              kind: 'simulation',
              difficulty: 2,
            },
            {
              slug: 'eckart-young-check',
              title: 'Test Eckart-Young',
              prompt:
                'For a random `(100, 60)` matrix with a seed, compute the rank-5 truncation. Then try 10,000 other rank-5 matrices made by slightly perturbing its factors, and confirm that none has a lower Frobenius error. Next, check that keeping the wrong 5 singular vectors, say the second to sixth, is worse, by the amount the formula predicts. Explain why this test is evidence and not a proof.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the Eckart-Young theorem.',
              answerOutline: 'The truncated SVD $A_k$ is the closest rank-$k$ matrix to $A$, in Frobenius and spectral norms.',
            },
            {
              question: 'How do you get the error of $A_k$ without forming it?',
              answerOutline: 'From the remaining singular values: the square root of the sum of their squares.',
            },
            {
              question: 'Why can a high "energy kept" mislead?',
              answerOutline: 'A large first component, often the mean level, inflates it. Relative error or centring gives a more honest number.',
            },
          ],
        },
        {
          slug: 'principal-component-analysis',
          title: 'Principal component analysis',
          summary:
            'Finding the directions of most variance: PCA as an SVD of centred data, reading loadings and scores, and the many ways it goes wrong.',
          estimatedMinutes: 100,
          objectives: [
            'Compute PCA using the SVD of a centred matrix',
            'Interpret scores, loadings and variance explained',
            'Decide whether to standardise first',
            'Project data to two dimensions and read the plot',
            'State the assumptions and limits of PCA',
          ],
          concepts: [
            'Principal components',
            'Scores and loadings',
            'Variance explained',
            'Centring',
            'Standardising or not',
            'Covariance eigenvectors',
            'Sign indeterminacy',
            'Reconstruction',
          ],
          explanation: `**PCA** finds orthogonal directions along which a dataset varies most. The first is the line that, when points are projected onto it, keeps the most variance. Equivalently, it is the line with the smallest total squared distance to the points.

**The recipe.** Centre each column, and take the SVD of $X = U\\Sigma V^T$. Then

- the **loadings** are the columns of $V$, which give each component as a weighted mix of features;
- the **scores** are the columns of $U\\Sigma = XV$, the coordinates of each row in the new basis;
- the variance along component $i$ is $\\sigma_i^2 / (n - 1)$.

Why is this right? The covariance matrix is $\\frac{1}{n-1}X^TX = V\\frac{\\Sigma^2}{n-1}V^T$, so the right singular vectors are the eigenvectors of the covariance. The SVD simply computes this without forming $X^TX$.

**Example.** \`USArrests\` has four columns for 50 states, in 1973. After standardising, the components explain 62.0%, 24.7%, 8.9% and 4.3% of the variance. The first has loadings of about $-0.54$, $-0.58$, $-0.28$ and $-0.54$ on Murder, Assault, UrbanPop and Rape, so it is a general crime measure, running from Florida and Nevada at one end to North Dakota and Vermont at the other. The second is mostly UrbanPop, at 0.87. So two numbers per state capture 87% of the variance.

**To standardise or not?** PCA follows variance, so units matter. On the raw data, the first component explains 96.5% and is almost exactly Assault (loading 0.995), simply because Assault has the biggest numbers. Standardise when columns have different units. Leave them alone when they share a unit and differences in spread are meaningful, as with pixels.

**A larger example.** The 64-pixel images of \`load_digits\` need 21 components for 90% of the variance. Two keep only 28.5%, though clusters are already visible.

**Signs.** A component's sign is arbitrary, because $-v$ works as well as $v$. Fix a convention when comparing runs.

**Limits.** PCA finds linear directions of high variance, and that is all.

- High variance need not mean important. A task-relevant signal can hide in a low-variance direction.
- Components are combinations of all features, and can be hard to name.
- It is sensitive to outliers, because variance squares distances.
- It cannot unroll curved structure.

Module 6 takes up the last two.

Try the Setosa visual, then read the PCA section of the scikit-learn user guide.`,
          resources: [
            { title: 'Principal Component Analysis Explained Visually', url: 'https://setosa.io/ev/principal-component-analysis/', type: 'interactive', cost: 'free', provider: 'Setosa', note: 'Move points and watch the components change.', primary: true },
            { title: 'scikit-learn: decomposition', url: 'https://scikit-learn.org/stable/modules/decomposition.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'PCA and related methods as used in practice.' },
            { title: 'Mathematics for Machine Learning', url: 'https://mml-book.github.io/', type: 'textbook', cost: 'free', provider: 'Deisenroth, Faisal and Ong', note: 'Chapter 10 derives PCA from several angles.' },
          ],
          exercises: [
            {
              slug: 'pca-usarrests',
              title: 'PCA on `USArrests`',
              prompt:
                'Compute PCA on `USArrests` using `np.linalg.svd`, with and without standardising. Report variance explained, the loadings, and the scores of the extreme states. Plot component 1 against component 2 with state labels. Check against `sklearn.decomposition.PCA`. Say what this picture shows, and what it cannot show about crime in 1973. Expected: 62.0%, 24.7%, 8.9% and 4.3% when standardised, and 96.5% on the first component when raw, with an Assault loading of 0.995.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'digits-in-2d',
              title: 'Digits in two dimensions',
              prompt:
                'Load `sklearn.datasets.load_digits`. Centre the data, and compute the singular values. Report the rank, the variance explained by 2 components, and how many are needed for 90% and 95%. Show the first 3 loadings as 8-by-8 images. Reconstruct one digit from 2, 10 and 30 components. Plot the first two scores, coloured by digit, and say which digits overlap. Expected: rank 61, 28.5% for 2 components, then 21 and 29 components.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'pca-before-regression',
              title: 'Does PCA help a model?',
              prompt:
                'On `load_digits`, compare a logistic regression trained on raw pixels with ones trained on 5, 10, 20, 40 PCA components, using 5-fold cross-validation with a fixed seed. Fit PCA inside each fold, not on all the data. Report the accuracy and training time. Say when the reduction helps and when it costs. Explain what would go wrong if you fitted PCA on all rows first.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'How do loadings and scores relate to the SVD?',
              answerOutline: 'Loadings are the columns of $V$. Scores are the columns of $U\\Sigma$, or equivalently $XV$.',
            },
            {
              question: 'Why must data be centred before PCA?',
              answerOutline: 'Otherwise the first component mostly points at the mean, rather than along the direction of largest variance.',
            },
            {
              question: 'When should you standardise?',
              answerOutline: 'When columns have different units or scales, since otherwise the largest-valued column dominates.',
            },
            {
              question: 'Name two things PCA cannot do.',
              answerOutline: 'It cannot find task-relevant low-variance directions, and it cannot unroll curved structure. It is also sensitive to outliers.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/pca-and-dimensionality-reduction'],
        },
        {
          slug: 'recommender-factorisation',
          title: 'Recommender-style factorisation',
          summary:
            'Predicting missing entries with low rank: why a plain SVD does not apply, alternating least squares, and an honest baseline.',
          estimatedMinutes: 100,
          objectives: [
            'Explain why missing entries make the plain SVD unsuitable',
            'Pose matrix factorisation as a least squares problem on observed entries',
            'Derive and implement alternating least squares',
            'Compare a factorised model with honest baselines',
            'Explain the role of regularisation',
          ],
          concepts: [
            'Matrix completion',
            'Observed entries',
            'User and item factors',
            'Alternating least squares',
            'Regularisation',
            'User and item biases',
            'Hold-out evaluation',
            'Cold start',
          ],
          explanation: `A ratings table has users as rows and items as columns, and most entries are missing. The MovieLens small data has 100,836 ratings from 610 users on 9,724 films, so only 1.7% is filled in. The goal is to predict the rest.

**A low-rank model.** Suppose each user and each item is described by $k$ hidden numbers, and a rating is the dot product of the two:

$$\\hat{r}_{ui} = \\mu + b_u + b_i + p_u \\cdot q_i.$$

Here $\\mu$ is the global mean, $b_u$ and $b_i$ are user and item biases (some people rate high, and some films are loved), and $p_u, q_i \\in \\mathbb{R}^k$ are factors.

**Why not simply take the SVD?** An SVD needs every entry. Filling the blanks with 0 or the mean tells the model that the blanks are real values, and it pulls predictions towards the filler. The objective should count only observed entries:

$$\\min_{P, Q} \\sum_{(u, i) \\text{ observed}} (r_{ui} - p_u \\cdot q_i)^2 + \\lambda\\big(\\|P\\|_F^2 + \\|Q\\|_F^2\\big).$$

**Alternating least squares.** The problem is not linear in both matrices at once, but if you fix $Q$, it becomes an ordinary ridge regression for each user: the features are the $q_i$ of the items that user rated. Then fix $P$ and do the same for each item.

$$p_u \\leftarrow (Q_u^TQ_u + \\lambda I)^{-1} Q_u^T r_u.$$

Each step lowers the objective, and 10 to 20 rounds are usually enough.

**Honest evaluation.** Hold out 20% of the ratings. On one such split:

| Model | Test RMSE |
|---|---|
| Global mean | 1.039 |
| User and item biases | 0.861 |
| ALS, $k = 5$, $\\lambda = 10$ | 0.855 |
| ALS, $k = 20$, $\\lambda = 1$ | 1.068 |

Most of the gain comes from the simple biases. Factors add a little, on data this small, and with weak regularisation they make things far worse: training RMSE falls to 0.31 while test RMSE climbs to 1.07, a textbook case of overfitting. Always report a baseline.

**What it cannot do.** A new user or item has no ratings, so it has no factors, the **cold start** problem. Missing entries are also not random: people rate films they chose to see. So the model predicts opinions among those who watched, not what would happen if you recommended a film.

Read MMDS Chapter 9, then build this yourself.`,
          resources: [
            { title: 'Mining of Massive Datasets', url: 'http://www.mmds.org/', type: 'textbook', cost: 'free', provider: 'Leskovec, Rajaraman and Ullman', note: 'Chapter 9 on recommendation systems, including the Netflix challenge.', primary: true },
            { title: 'MovieLens Latest Datasets', url: 'https://grouplens.org/datasets/movielens/latest/', type: 'dataset', cost: 'free', provider: 'GroupLens', note: 'Use the small dataset, which is about 1 MB. Read its usage licence.' },
          ],
          exercises: [
            {
              slug: 'baseline-first',
              title: 'Baselines first',
              prompt:
                'Load MovieLens small. Report its counts, its density, the memory a dense matrix would need, and the mean rating. Hold out 20% with a seed. Compute test RMSE for the global mean, then for a regularised user and item bias model, with $\\lambda = 5$, alternating for 10 rounds. Expected: 100,836 ratings, 610 users, 9,724 films, density 1.7%, about 47 MB dense, and about 1.04 and 0.86, depending on the split.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'build-als',
              title: 'Build alternating least squares',
              prompt:
                'Using your bias residuals, implement ALS on the training entries only. Run $k = 2, 5, 10, 20$ with $\\lambda = 10$, and $k = 20$ with $\\lambda = 1$, for 15 rounds. Plot training and test RMSE. Confirm that your objective falls at every half-step. Say how much value the factors add beyond the biases. Expected on a typical split: test RMSE near 0.855 at $\\lambda = 10$, and near 1.07 with training RMSE near 0.31 at $k = 20$, $\\lambda = 1$.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'read-the-factors',
              title: 'Read the factors',
              prompt:
                'For $k = 10$, list the films at both ends of the first 3 factor columns, keeping films with at least 50 ratings. Give each factor a plain-language name if you honestly can. Find the 5 nearest films to a film you know, by cosine similarity of factors. Note where the factors do not mean anything you can name, and say why that is not a bug.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why not fill missing ratings with zeros and take an SVD?',
              answerOutline: 'The fill-in is treated as real data, biasing predictions. The loss should cover only observed entries.',
            },
            {
              question: 'Why does ALS work when the full problem is not linear?',
              answerOutline: 'With one factor matrix fixed, the other is a set of ordinary ridge regressions, each with a closed form.',
            },
            {
              question: 'What does the role of $\\lambda$ show in the results above?',
              answerOutline: 'Without enough regularisation, a large $k$ memorises the training ratings and test error rises sharply.',
            },
            {
              question: 'What does a low test RMSE not tell you?',
              answerOutline: 'It does not show that recommendations would help, because ratings are not missing at random and offline data have no interventions.',
            },
          ],
          relatedLessons: ['machine-learning/unsupervised-learning/anomaly-detection-and-recommenders'],
        },
      ],
    },
    {
      slug: 'scale-and-limits',
      title: 'Linear Methods at Scale and Their Limits',
      description:
        'Making linear algebra work on large data, with sparse matrices and iterative and randomised methods. Then an honest look at where it breaks: outliers, and structure that is not linear.',
      lessons: [
        {
          slug: 'sparse-matrices',
          title: 'Sparse matrices',
          summary:
            'Storing and computing with only the non-zero entries, how CSR and CSC formats work, and which operations stay cheap.',
          estimatedMinutes: 80,
          objectives: [
            'Explain how CSR and COO formats store a matrix',
            'Build a sparse matrix from triplets',
            'Compare the memory of dense and sparse storage',
            'Explain why a matrix-vector product is fast and factorisation may not be',
            'Avoid operations that turn a sparse matrix dense',
          ],
          concepts: [
            'Sparsity and density',
            'COO format',
            'CSR format',
            'CSC format',
            'Matrix-vector product cost',
            'Fill-in',
            'Densifying operations such as centring',
          ],
          explanation: `Real matrices are often almost entirely zeros. Most users have not rated most films, and most airports have no direct route. Storing only the non-zero entries makes the impossible routine. A $90{,}000 \\times 90{,}000$ matrix would take 64.8 GB in dense form, but with 448,800 non-zeros it takes 5.7 MB.

**COO** (coordinate) format stores three arrays: row, column and value. It is simple and good for building a matrix.

**CSR** (compressed sparse row) stores the values and column indices row by row, plus an array \`indptr\` saying where each row starts:

\`\`\`python
import scipy.sparse as sp
S = sp.csr_matrix((vals, (rows, cols)), shape=(m, n))
row_i_cols = S.indices[S.indptr[i]:S.indptr[i + 1]]
\`\`\`

Reading a row takes a slice, so row access and the product $Sx$ are fast. **CSC** does the same by columns. Convert between them cheaply with \`.tocsc()\`. Note that \`csr_matrix\` adds up duplicate entries when built from triplets, which may be just what you want for counts, or it may be a silent bug.

**The cost that matters.** A sparse matrix-vector product costs $O(\\text{nnz})$, one operation per stored entry, against $O(mn)$ for a dense one. Each power iteration step for PageRank takes time in proportion to the number of links, so a billion-page graph is feasible.

**What stays sparse.** Sums, scalar multiples and products of sparse matrices with vectors are fine. Some operations are traps:

- **Centring** subtracts a mean from every entry, so all the zeros become non-zero. This is why PCA is awkward on sparse data. A common fix is to work with the uncentred matrix or to apply centring implicitly, as a matrix-vector function: $(S - \\mathbf{1}\\mu^T)x = Sx - \\mathbf{1}(\\mu^Tx)$. That costs little.
- **Inverses** of sparse matrices are usually dense. Never form one.
- **Products** $S^TS$ can be much denser than $S$. A single dense row makes it fully dense.
- **Factorisations** suffer **fill-in**: LU and Cholesky create new non-zeros. A good ordering of rows and columns reduces it, and specialised sparse solvers exist. For large problems the usual answer is an iterative method, as in the next lesson.

**In practice.** Keep the matrix sparse through your pipeline, and check that no step calls \`.toarray()\` by accident, as that can quietly use all of your memory. Comparing \`S.nnz\` before and after an operation is a cheap and useful test.

Read the SciPy sparse documentation, then rebuild the MovieLens matrix.`,
          resources: [
            { title: 'SciPy: sparse arrays', url: 'https://docs.scipy.org/doc/scipy/reference/sparse.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'The formats, when to use each, and how to build them.', primary: true },
            { title: 'SciPy: sparse linear algebra', url: 'https://docs.scipy.org/doc/scipy/reference/sparse.linalg.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'Solvers and eigenvalue routines that work with sparse matrices.' },
          ],
          exercises: [
            {
              slug: 'csr-by-hand',
              title: 'CSR by hand',
              prompt:
                'Write the `data`, `indices` and `indptr` arrays for $\\begin{bmatrix} 5 & 0 & 0 \\\\ 0 & 0 & 2 \\\\ 1 & 3 & 0 \\end{bmatrix}$ by hand, and check them with `scipy.sparse`. Then write `csr_matvec(data, indices, indptr, x)` in plain Python, and compare with `S @ x` on a random sparse matrix. Expected: `data = [5, 2, 1, 3]`, `indices = [0, 2, 0, 1]`, `indptr = [0, 1, 2, 4]`.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'movielens-sparse',
              title: 'Store the ratings matrix',
              prompt:
                'Build the MovieLens small matrix in CSR, and report nnz, density and memory against the dense size. Time the product $S^Tx$ in CSR and CSC. Compute user means without densifying. Show what happens to nnz if you subtract the global mean naively from all entries, then implement the centred product as a function. Expected: about 1.2 MB in CSR, against about 47 MB dense.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'fill-in',
              title: 'Measure fill-in',
              prompt:
                'Make an arrowhead matrix of size 2000: a large diagonal plus a dense first row and first column. Compute an LU with `scipy.sparse.linalg.splu`, once with `permc_spec="NATURAL"` and once with `permc_spec="COLAMD"`. Report the non-zeros in $L$ and $U$ for each, and the time. Explain why ordering changes fill-in so sharply, and how that connects to sending the dense row to the end by hand.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What three arrays does CSR use?',
              answerOutline: 'The stored values, their column indices, and a pointer giving where each row starts.',
            },
            {
              question: 'Why does centring a sparse matrix cause trouble?',
              answerOutline: 'It makes zeros non-zero, turning the matrix dense. Apply it implicitly in matrix-vector products instead.',
            },
            {
              question: 'What is fill-in?',
              answerOutline: 'New non-zeros created during a factorisation, which can destroy the benefit of sparsity.',
            },
          ],
        },
        {
          slug: 'iterative-methods',
          title: 'Iterative methods',
          summary:
            'Solving huge systems using matrix-vector products alone: conjugate gradient, how conditioning sets its speed, and Krylov methods for eigenvalues.',
          estimatedMinutes: 90,
          objectives: [
            'Explain the idea of a method based only on matrix-vector products',
            'Run conjugate gradient on a symmetric positive definite system',
            'Relate the iteration count to the condition number',
            'Use a preconditioner, and explain what it does',
            'Use `svds` or `eigsh` for a few singular or eigenvalues',
          ],
          concepts: [
            'Matrix-free methods',
            'Krylov subspace',
            'Conjugate gradient',
            'Convergence and $\\sqrt{\\kappa}$',
            'Preconditioning',
            'Stopping tolerance',
            'Lanczos and truncated SVD',
          ],
          explanation: `For a large sparse matrix, factorising is often out of reach. **Iterative methods** start with a guess and improve it, and they touch the matrix only through products $Av$. So they work if you can multiply, even if the matrix is never stored.

**The idea.** Each product gives one new direction. After $k$ products from a starting vector $b$, you can build anything in the **Krylov subspace**

$$\\text{span}\\{b, Ab, A^2b, \\dots, A^{k-1}b\\}.$$

Power iteration keeps just the last vector. Better methods use the whole space.

**Conjugate gradient.** For a symmetric positive definite $A$, solving $Ax = b$ is the same as minimising $f(x) = \\frac12 x^TAx - b^Tx$. Plain gradient descent zigzags. **CG** picks each step so that it does not undo earlier progress, using directions that are conjugate, $p_i^TAp_j = 0$. In exact arithmetic it finishes in $n$ steps, but what matters is that it is often excellent after far fewer. Each step needs one product and a few vector operations.

**Convergence.** The error falls roughly like

$$\\left(\\frac{\\sqrt{\\kappa} - 1}{\\sqrt{\\kappa} + 1}\\right)^k,$$

so iteration count grows with $\\sqrt{\\kappa}$, against $\\kappa$ for gradient descent. Take the Laplacian of an $n \\times n$ grid. Its size is $n^2$, with a condition number growing like $n^2$, so CG needs a number of iterations growing like $n$. Measured to a tolerance of $10^{-8}$:

| Grid | Unknowns | Iterations |
|---|---|---|
| $100 \\times 100$ | 10,000 | 187 |
| $200 \\times 200$ | 40,000 | 369 |
| $400 \\times 400$ | 160,000 | 734 |

Doubling $n$ doubles the iterations, as predicted. The $300 \\times 300$ case, with 90,000 unknowns, took under half a second on a laptop.

**Preconditioning.** If $M$ approximates $A$ and is easy to invert, solve $M^{-1}Ax = M^{-1}b$ instead. The new system has a lower condition number, so it needs fewer steps. Even the diagonal of $A$ can help when scales differ.

**A few singular vectors.** \`scipy.sparse.linalg.svds\` and \`eigsh\` use Krylov methods, such as Lanczos, to find a few extreme values using products alone. This is how you run PCA on a sparse matrix, and it is far cheaper than a full decomposition if you need only a few components.

**Stopping.** Set a tolerance suited to the task. If your data have 1% noise, then solving to $10^{-12}$ wastes time.

Read Shewchuk's famous introduction, at least through the part on steepest descent.`,
          resources: [
            { title: 'An Introduction to the Conjugate Gradient Method Without the Agonizing Pain', url: 'https://www.cs.cmu.edu/~quake-papers/painless-conjugate-gradient.pdf', type: 'article', cost: 'free', provider: 'Jonathan Shewchuk', note: 'A clear, pictorial account. Read the sections on steepest descent and conjugate directions.', primary: true },
            { title: 'scipy.sparse.linalg.cg', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.linalg.cg.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'Note the `rtol` and `M` arguments, and the `callback` for counting iterations.' },
            { title: 'scipy.sparse.linalg.svds', url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.linalg.svds.html', type: 'documentation', cost: 'free', provider: 'SciPy', note: 'Note that it returns singular values in ascending order.' },
          ],
          exercises: [
            {
              slug: 'cg-on-a-grid',
              title: 'CG on a grid Laplacian',
              prompt:
                'Build the 2D grid Laplacian with `scipy.sparse.kronsum` of the 1D matrix `diags([-1, 2, -1], [-1, 0, 1], shape=(n, n))`. For $n = 100, 200, 300, 400$, and $b$ all ones, run `cg` to `rtol=1e-8`, and count iterations with a callback. Report the time, the relative residual, and the memory compared with dense storage. Fit iterations against $n$, and explain the result using $\\sqrt{\\kappa}$. Expected: 187, 369, 550 and 734 iterations.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'write-cg',
              title: 'Write conjugate gradient',
              prompt:
                'Implement CG from the standard loop in 10 to 15 lines of NumPy, taking a function `matvec(v)` rather than a matrix. Test it against `np.linalg.solve` on a small positive definite matrix, then on the grid Laplacian with a matrix-free function that never builds the matrix. Compare your iteration count with that from SciPy. Expected: the same count, to within 1 or 2.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'preconditioning',
              title: 'See preconditioning work',
              prompt:
                'Take the $n = 100$ grid Laplacian and multiply it on both sides by a random diagonal scaling $D$, with entries spanning 3 orders of magnitude, so that $DLD$ stays symmetric. Add a small multiple of the identity. Run CG with and without a Jacobi preconditioner, using `M = diags(1 / A.diagonal())`. Report iteration counts and $\\kappa$ where you can compute it. Explain why this preconditioner helps here, and why it would not help much on the original matrix.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a matrix-free method need from $A$?',
              answerOutline: 'Only a way to compute $Av$.',
            },
            {
              question: 'How does the CG iteration count depend on $\\kappa$?',
              answerOutline: 'It grows with $\\sqrt{\\kappa}$, a major improvement over the $\\kappa$ for gradient descent.',
            },
            {
              question: 'What does a preconditioner do?',
              answerOutline: 'It transforms the system into one with a smaller condition number, so fewer iterations are needed.',
            },
          ],
          relatedLessons: ['computational-physics/numerical-calculus-and-linear-algebra/numerical-linear-algebra'],
        },
        {
          slug: 'randomised-methods',
          title: 'Randomised methods',
          summary:
            'Using random projections to capture a matrix\'s main directions cheaply: randomised SVD, power iterations, and the Johnson-Lindenstrauss idea.',
          estimatedMinutes: 90,
          objectives: [
            'Explain why a random projection captures the range of a low-rank matrix',
            'Implement randomised SVD',
            'Explain the effect of oversampling and power iterations',
            'Compare the error and cost of randomised and exact SVD',
            'State the Johnson-Lindenstrauss idea',
          ],
          concepts: [
            'Random projection',
            'Range finder',
            'Oversampling',
            'Power iterations',
            'Randomised SVD',
            'Spectral decay',
            'Johnson-Lindenstrauss lemma',
          ],
          explanation: `Multiply a matrix by a few random vectors, and the results tend to line up with its most important directions. This surprising fact gives a simple, very fast SVD.

**Why it works.** Let $\\Omega$ be a random Gaussian matrix with $k + p$ columns. Each column of $Y = A\\Omega$ is a random combination of the columns of $A$, so it is pulled towards the top singular directions, because those get multiplied by the largest $\\sigma_i$. With a small amount of **oversampling** $p$, about 5 to 10, the span of $Y$ almost certainly captures the top $k$ directions.

**Randomised SVD** has two stages:

\`\`\`python
Om = rng.normal(size=(n, k + p))
Y = A @ Om                  # sample the range
Q, _ = np.linalg.qr(Y)      # orthonormal basis
B = Q.T @ A                 # small matrix
Ub, s, Vt = np.linalg.svd(B, full_matrices=False)
U = Q @ Ub                  # lift back
\`\`\`

If $Q$ captures the range, then $A \\approx QQ^TA$, and the small $B$ holds everything you need. The cost is dominated by products with $A$, so a sparse matrix stays cheap.

**Power iterations.** If singular values decay slowly, the sample also picks up plenty of noise directions. Applying $A$ and $A^T$ a few times, with a QR step each time to keep it stable, boosts the gap: the effective singular values become $\\sigma_i^{2q+1}$.

\`\`\`python
for _ in range(q):
    Q, _ = np.linalg.qr(A.T @ Q)
    Q, _ = np.linalg.qr(A @ Q)
\`\`\`

On \`load_digits\`, with $k = 10$ and $p = 5$, the largest error in the top 10 singular values, as a share of $\\sigma_{10}$, is 27% with $q = 0$, 2.7% with $q = 1$ and 0.6% with $q = 2$. The speed benefit appears at scale, on large sparse matrices.

**When to use it.** It suits a large matrix, when you want a modest $k$ and its singular values decay. Scikit-learn's \`TruncatedSVD\` and its PCA use it for large data by default. If you need all singular values, or the spectrum is flat, it gives little benefit. Always measure the error of your approximation, using a small validation.

**Johnson-Lindenstrauss.** A related result says that $n$ points can be projected at random into about $\\log(n)/\\epsilon^2$ dimensions, while keeping all pairwise distances within a factor of $1 \\pm \\epsilon$, regardless of the original dimension.

Read the first section of the Halko, Martinsson and Tropp paper.`,
          resources: [
            { title: 'Finding Structure with Randomness', url: 'https://arxiv.org/abs/0909.4061', type: 'article', cost: 'free', provider: 'Halko, Martinsson and Tropp', note: 'The standard reference. Sections 1 and 4 cover the algorithm and practical advice.', primary: true },
            { title: 'MIT 18.065 Matrix Methods in Data Analysis', url: 'https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/', type: 'course', cost: 'free', provider: 'MIT OpenCourseWare', note: 'The lectures on randomised matrix multiplication.' },
          ],
          exercises: [
            {
              slug: 'randomised-svd',
              title: 'Write randomised SVD',
              prompt:
                'Implement `rsvd(A, k, p=5, q=0, seed=0)` using `@` only, so it works on dense and sparse matrices. On centred `load_digits`, compare the top 10 singular values with the exact ones for $q = 0, 1, 2$. Report the largest absolute error divided by $\\sigma_{10}$. Run 20 seeds to show the spread. Expected for seed 0: about 27%, 2.7% and 0.6%.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'randomised-at-scale',
              title: 'Randomised SVD at scale',
              prompt:
                'On the MovieLens small matrix in sparse form, compare `rsvd`, `scipy.sparse.linalg.svds` and a dense `np.linalg.svd`, for $k = 20$. Report the times, the memory used, and the relative error of each top-20 singular value against `svds`. Then generate a synthetic sparse matrix 10 times larger, keeping the density, and repeat without the dense method. Say where the extra speed is worth the approximation.',
              kind: 'data-analysis',
              difficulty: 2,
            },
            {
              slug: 'johnson-lindenstrauss',
              title: 'Test Johnson-Lindenstrauss',
              prompt:
                'Take 500 random points in 10,000 dimensions, with a seed. Project them with $\\Omega / \\sqrt{d}$ for $d = 50, 200, 1000$, where $\\Omega$ has standard normal entries. For each $d$, report the 1st and 99th percentiles of the ratio of projected to original pairwise distances. Compare with the rule that the error scales as $1/\\sqrt{d}$. Then try the same with points lying on a low-dimensional line, and explain why that is the easy case.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does multiplying by a random matrix find the important directions?',
              answerOutline: 'Each product is a random mix of the columns weighted by singular values, so large singular directions dominate.',
            },
            {
              question: 'What do oversampling and power iterations do?',
              answerOutline: 'Oversampling adds a few extra directions so the top ones are captured. Power iterations sharpen the gap between signal and noise directions.',
            },
            {
              question: 'When is a randomised SVD a poor choice?',
              answerOutline: 'When you need all singular values, the spectrum is flat, or the matrix is small enough for an exact SVD.',
            },
          ],
        },
        {
          slug: 'outliers-and-robustness',
          title: 'Outliers and robustness',
          summary:
            'Why squared error gives a single bad row unlimited power, how to measure that, and robust alternatives for regression and PCA.',
          estimatedMinutes: 80,
          objectives: [
            'Show how one point can flip a regression slope',
            'Show how one row can capture a principal component',
            'Fit a robust regression, and explain how it reweights',
            'Compare a robust and a least squares fit on real data',
            'Decide what to do with an outlier, and report it honestly',
          ],
          concepts: [
            'Breakdown',
            'Influence of a point',
            'Huber regression',
            'Iteratively reweighted least squares',
            'Trimming',
            'Robust PCA by reweighting',
            'Missing values mistaken for moderation',
          ],
          explanation: `Least squares and PCA both square distances, so a single far-away row can have an effect as big as all the others put together. Their **breakdown** point is zero: one bad row can move the answer arbitrarily far.

**A regression flipped.** On \`mtcars\`, \`mpg\` falls with weight, with a slope of $-5.34$ per 1,000 pounds. Add one made-up car, at weight 10 and 60 mpg, and the slope becomes $+1.40$. A single row has reversed the conclusion.

**A component captured.** On \`load_digits\`, replace one row with a saturated value of 2,000 in every pixel. The new first component has a cosine of just 0.01 with the old one.

**Robust regression.** Replace the square with a loss that grows more slowly for big residuals. The **Huber** loss is quadratic near 0 and linear in the tails. To fit it, use **iteratively reweighted least squares**: fit, compute residuals, give large-residual points a smaller weight $w_i$, and repeat, solving weighted least squares at each round:

$$\\min_\\beta \\sum_i w_i (y_i - x_i^T\\beta)^2.$$

On the flipped \`mtcars\` example, a Huber fit gives a slope of $-4.19$, so the sign is recovered, though the bad point still has some pull.

On the classic \`stackloss\` data (21 days of a chemical plant), least squares gives coefficients of 0.716, 1.295 and $-0.152$, with observation 21 having the largest residual. Huber regression gives 0.833, 0.727 and $-0.110$. The coefficient on water temperature changes by nearly half, and the difference between the two fits is itself worth reporting.

**Robust PCA.** Simple options work well in practice: standardise with the median and scaled median absolute deviation rather than the mean and standard deviation, clip extreme values, or fit, drop rows with high reconstruction error, and refit.

**A trap that looks like moderation.** Replacing missing values with the mean, or 0, drags a row's scores towards the middle. Someone with most entries missing will look average, simply because little is known. This is a real problem on survey and voting data. The fix is to project using only observed entries, by least squares on those coordinates.

**What to do with an outlier.** First find out why it is there. A typo can be fixed. A real extreme case may be the most interesting row in the table. Never delete it silently. Report the analysis with and without it.

Plot both fits on one chart.`,
          resources: [
            { title: 'Huber loss', url: 'https://en.wikipedia.org/wiki/Huber_loss', type: 'article', cost: 'free', provider: 'Wikipedia', note: 'The definition, and how the threshold $\\delta$ trades efficiency against robustness.', primary: true },
            { title: 'Plant stack loss data (stackloss)', url: 'https://vincentarelbundock.github.io/Rdatasets/csv/datasets/stackloss.csv', type: 'dataset', cost: 'free', provider: 'Rdatasets', note: 'A classic data set for robust regression.' },
          ],
          exercises: [
            {
              slug: 'flip-a-slope',
              title: 'Flip a slope with one row',
              prompt:
                'Fit `mpg ~ wt` on `mtcars`, then add the single row (weight 10, mpg 60) and refit, by least squares and with `sklearn.linear_model.HuberRegressor`, after standardising weight. Convert the Huber slope back to the original units. Report the leverage of the new row. Then move the point around, and map out which positions flip the sign of the fit. Expected: slopes of $-5.34$, $+1.40$ and about $-4.19$.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'write-irls',
              title: 'Write iteratively reweighted least squares',
              prompt:
                'Implement Huber IRLS for regression using weights $w_i = \\min(1, \\delta/|r_i|)$, with residuals scaled by $1.4826$ times their median absolute deviation, and $\\delta = 1.345$. Run it on `stackloss` for 50 rounds. Compare with ordinary least squares, and with scikit-learn\'s `HuberRegressor`, noting that it scales differently. List the rows that get a small weight. Expected: ordinary least squares coefficients 0.716, 1.295, $-0.152$, with observations 21, 4, 3 and 1 having the largest residuals.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'capture-a-component',
              title: 'Capture a component',
              prompt:
                'Compute the first component of centred `load_digits`. Set the first row to 2,000 in every pixel, and recompute. Report the absolute cosine between the old and new components. Now standardise by median and median absolute deviation, or clip each pixel at its 99th percentile, and repeat. Say which defence works, and why. Expected: an absolute cosine near 0.01 before any defence.',
              kind: 'data-analysis',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What is the breakdown point of least squares?',
              answerOutline: 'Zero: a single bad row can move the fit arbitrarily far.',
            },
            {
              question: 'How does iteratively reweighted least squares work?',
              answerOutline: 'It alternates between fitting weighted least squares and lowering the weights of points with large residuals.',
            },
            {
              question: 'Why can mean-filling make a person look moderate?',
              answerOutline: 'Filled entries pull the row\'s projection towards the centre, so sparse rows look average.',
            },
          ],
        },
        {
          slug: 'non-linear-structure',
          title: 'Non-linear structure',
          summary:
            'What linear methods cannot see: curved manifolds, classes that no line separates, and what kernels and neighbour graphs do about it.',
          estimatedMinutes: 90,
          objectives: [
            'Show on data that a linear method can miss simple structure',
            'Explain the horseshoe effect in principal components',
            'Fix a linear model using a non-linear feature',
            'Explain the kernel idea and neighbour-graph embeddings',
            'Read a non-linear embedding without over-interpreting it',
          ],
          concepts: [
            'Manifold',
            'Swiss roll',
            'Feature expansion',
            'Kernel trick',
            'Isomap',
            'Horseshoe effect',
            'Step versus line',
            'Embedding artefacts',
          ],
          explanation: `Linear methods assume that the structure lies along straight lines or flat subspaces. When it does not, they fail quietly and give a plausible answer.

**The Swiss roll.** Take a flat sheet and roll it up in 3D. The data are really 2-dimensional, with one coordinate running along the roll. With 2,000 points, two principal components keep 72% of the variance, which sounds fine. But the rank correlation of the first component with the position along the roll is only 0.22, so PCA is flattening the roll, not unrolling it. **Isomap** builds a graph linking near neighbours, measures distance along that graph, then applies an eigen-decomposition. Its first coordinate recovers the position almost perfectly, with a rank correlation of 1.00.

**Features can rescue a linear model.** Two concentric rings cannot be split by a line: logistic regression on $(x, y)$ reaches 47.5% accuracy, about chance. Add a single feature, $x^2 + y^2$, and accuracy reaches 100%. "Linear" means linear in the features, and you can choose those. The **kernel trick** extends the idea. Algorithms that use only dot products can replace them with a kernel $k(x, x')$, working in a huge feature space at no extra cost.

**The horseshoe.** Suppose items lie along a single line of gradual change: species along a gradient, or voters along a spectrum. If nearby items are similar and distant ones have nothing in common, PCA can't express that with one straight axis. The first component captures the order, and the second often comes out as a curved function of the first, so the points form an arch. A reader may take the second axis for a separate, independent dimension when it is the same dimension bent. This artefact is well documented, and the Diaconis, Goel and Holmes paper shows it on votes of the US House. The final project tests this directly.

**Steps are not lines.** A linear model predicts along a slope. Many real responses are thresholds: below some value one outcome, above it another. A rank-one model of a step function needs extra components to draw that shape, so linear rank overstates the number of real dimensions.

**Reading embeddings.** t-SNE and UMAP make striking pictures, but cluster sizes and gaps between clusters mean little, and results can change with settings. Use them to generate ideas, not as evidence.

Read the Distill article and the scikit-learn manifold guide, then run the exercises.`,
          resources: [
            { title: 'How to Use t-SNE Effectively', url: 'https://distill.pub/2016/misread-tsne/', type: 'article', cost: 'free', provider: 'Distill', note: 'Interactive examples of how embeddings mislead.', primary: true },
            { title: 'scikit-learn: manifold learning', url: 'https://scikit-learn.org/stable/modules/manifold.html', type: 'documentation', cost: 'free', provider: 'scikit-learn', note: 'Isomap and other methods compared on the same examples.' },
            { title: 'Horseshoes in multidimensional scaling and local kernel methods', url: 'https://arxiv.org/abs/0811.1477', type: 'article', cost: 'free', provider: 'Diaconis, Goel and Holmes', note: 'Explains the arch mathematically, with US House voting data as a worked example.' },
          ],
          exercises: [
            {
              slug: 'swiss-roll',
              title: 'Unroll a Swiss roll',
              prompt:
                'Generate `make_swiss_roll(n_samples=2000, noise=0.05, random_state=0)`. Fit PCA with 2 components and Isomap with 10 neighbours. Report the variance explained, and the absolute Spearman correlation between each first coordinate and the true position `t`. Then vary the neighbour count from 5 to 100, and note where Isomap breaks. Say why. Expected: variance of about 0.41 and 0.31, and correlations of about 0.22 for PCA and 1.00 for Isomap at 10 neighbours.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'rings',
              title: 'Rescue a linear model',
              prompt:
                'Generate `make_circles(n_samples=600, noise=0.08, factor=0.4, random_state=0)`. Report the 5-fold cross-validated accuracy of logistic regression on the raw coordinates, then with $x^2 + y^2$ added. Then try `KernelPCA(kernel="rbf")` as a preprocessing step, and vary `gamma`. Say why the single feature worked so well, and what you would do if you could not guess it. Expected: 0.475 and 1.0.',
              kind: 'data-analysis',
              difficulty: 1,
            },
            {
              slug: 'make-a-horseshoe',
              title: 'Make a horseshoe',
              prompt:
                'Simulate 300 items in order along one line, with 300 binary features, where item $i$ has feature $j$ if $|i - j| < 120$. So there is exactly one underlying dimension. Run PCA on the centred matrix, and plot component 2 against component 1. Report the rank correlation of component 1 with position, the first 4 singular values, and the $R^2$ of a quadratic fit of component 2 on component 1. Then repeat with $|i - j| < 40$, and check whether component 2 is still a function of position. Explain how you would have been misled if this were real data. Expected at 120: a rank correlation of 0.98, singular values near 111, 54, 32, 30, and $R^2 \\approx 0.82$. At 40, the quadratic fit falls to about 0.27, but component 2 still tracks $\\cos(2\\pi i/300)$ with a correlation of about 0.95, so the bend is real and only its shape has changed.',
              kind: 'simulation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is high variance explained no proof that PCA found the structure?',
              answerOutline: 'It measures the variance kept, not whether the coordinates are meaningful. On a Swiss roll, it keeps much variance while mixing distant parts of the sheet.',
            },
            {
              question: 'What is the horseshoe effect?',
              answerOutline: 'For data along one gradient, the second component is a curved function of the first, which looks like a second dimension but is not.',
            },
            {
              question: 'How does a feature expansion help a linear model?',
              answerOutline: 'The model is linear in its features, so adding non-linear features allows curved boundaries with the same algebra.',
            },
            {
              question: 'What should you not conclude from a t-SNE plot?',
              answerOutline: 'Cluster sizes and distances between clusters are not reliable, so do not treat them as measurements.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'linear-analysis-of-a-real-dataset',
    title: 'A linear analysis of a real dataset',
    description:
      'Pick a real table or network, and take it through rank and conditioning checks, a regression with diagnostics, a spectral or low-rank analysis and a report of where the linear view fails.',
    deliverables: [
      'A notebook that runs from raw data to every figure',
      'Rank, conditioning and residual checks for each model',
      'A written account of what the linear methods found and what they missed',
    ],
    estimatedHours: 20,
  },
  masteryChecklist: [
    'I can move between tables, vectors and matrices in NumPy, and I state the shape of every array',
    'I can choose a distance or similarity, and explain what scaling does to the answer',
    'I can solve linear systems, and explain elimination, LU, rank and null space on real data',
    'I can read a condition number and say how many digits or coefficients to trust',
    'I can derive least squares from orthogonality, compute it with QR, and diagnose it with residuals and leverage',
    'I can compute and interpret eigenvectors for Markov chains, PageRank and graph Laplacians',
    'I can use the SVD for low-rank approximation, PCA and matrix completion, with honest baselines',
    'I can work with sparse matrices, and choose iterative or randomised methods at scale',
    'I can show how an outlier or a curved structure defeats a linear method, and say what to do instead',
    'I can report what a linear analysis of real data does and does not show',
  ],
});
