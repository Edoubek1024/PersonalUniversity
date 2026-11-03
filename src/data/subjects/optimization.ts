import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const mit15053: ResourceInput = {
  title: 'MIT 15.053 Optimization Methods in Management Science',
  url: 'https://ocw.mit.edu/courses/15-053-optimization-methods-in-management-science-spring-2013/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};
const mit6251: ResourceInput = {
  title: 'MIT 6.251J Introduction to Mathematical Programming',
  url: 'https://ocw.mit.edu/courses/6-251j-introduction-to-mathematical-programming-fall-2009/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};
const mit15083: ResourceInput = {
  title: 'MIT 15.083J Integer Programming and Combinatorial Optimization',
  url: 'https://ocw.mit.edu/courses/15-083j-integer-programming-and-combinatorial-optimization-fall-2009/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};
const mit15084: ResourceInput = {
  title: 'MIT 15.084J Nonlinear Programming',
  url: 'https://ocw.mit.edu/courses/15-084j-nonlinear-programming-spring-2004/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};
const mit6253: ResourceInput = {
  title: 'MIT 6.253 Convex Analysis and Optimization',
  url: 'https://ocw.mit.edu/courses/6-253-convex-analysis-and-optimization-spring-2012/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
};
const ee364a: ResourceInput = {
  title: 'Stanford EE364A Convex Optimization I',
  url: 'https://see.stanford.edu/Course/EE364A',
  type: 'lecture',
  cost: 'free',
  provider: 'Stanford Engineering Everywhere',
};
const scipyOpt: ResourceInput = {
  title: 'SciPy optimize reference',
  url: 'https://docs.scipy.org/doc/scipy/reference/optimize.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SciPy',
};
const linprogDoc: ResourceInput = {
  title: 'scipy.optimize.linprog',
  url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.linprog.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SciPy',
};
const milpDoc: ResourceInput = {
  title: 'scipy.optimize.milp',
  url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.milp.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SciPy',
};
const minimizeDoc: ResourceInput = {
  title: 'scipy.optimize.minimize',
  url: 'https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.minimize.html',
  type: 'documentation',
  cost: 'free',
  provider: 'SciPy',
};
const cvxpy: ResourceInput = {
  title: 'CVXPY',
  url: 'https://www.cvxpy.org/',
  type: 'tool',
  cost: 'free',
  provider: 'CVXPY project',
};
const nxFlow: ResourceInput = {
  title: 'NetworkX flow algorithms',
  url: 'https://networkx.org/documentation/stable/reference/algorithms/flow.html',
  type: 'documentation',
  cost: 'free',
  provider: 'NetworkX',
};
const bubeck: ResourceInput = {
  title: 'Convex Optimization: Algorithms and Complexity',
  url: 'https://arxiv.org/abs/1405.4980',
  type: 'article',
  cost: 'free',
  provider: 'Sebastien Bubeck, arXiv',
};
const orTools: ResourceInput = {
  title: 'Google OR-Tools',
  url: 'https://developers.google.com/optimization',
  type: 'tool',
  cost: 'free',
  provider: 'Google',
};

const main = (r: ResourceInput, note: string): ResourceInput => ({ ...r, note, primary: true });
const also = (r: ResourceInput, note: string): ResourceInput => ({ ...r, note });

export default defineSubject({
  id: 'optimization',
  title: 'Linear and Nonlinear Programming',
  category: 'math',
  tagline:
    'Linear programs, duality, network and integer models, then smooth non-linear and convex optimisation, with the theory proved and the algorithms run.',
  description: `This course merges two University of Illinois courses into one: MATH 482, Linear Programming, and MATH 484, Nonlinear Programming. It is based on their public catalog descriptions. The content here is original and is not affiliated with the University of Illinois.

Optimisation asks for the best choice under constraints, and it runs through operations research, economics, engineering and machine learning. The first half covers linear programming: modelling, the geometry of polyhedra, the simplex method, duality and sensitivity, and then network flows and integer programs, where totally unimodular matrices explain why some integer problems are easy and branch and bound handles the rest. The second half covers smooth non-linear problems: optimality conditions, gradient and Newton methods with line searches, Lagrange multipliers and the Karush-Kuhn-Tucker theorem, penalty and barrier methods, and finally convex programming, where local optima are global and duality returns in a more general form.

Every main theorem is stated with its hypotheses and proved or derived, because in optimisation the hypotheses are exactly where methods fail: a constraint qualification that does not hold, a degenerate vertex, a non-convex objective. Every algorithm is also run in Python, first in a version you write yourself and then with SciPy, NetworkX or CVXPY. You need Calculus III, for gradients and Hessians, and \`linear-algebra-computational\`, for bases, rank and positive definite matrices. Some experience writing proofs helps.

Three module projects and a capstone have you build a simplex solver, an integer programming model with your own branch and bound, an unconstrained optimisation library, and finally an interior-point solver.`,
  difficulty: 'advanced',
  estimatedHours: 80,
  prerequisites: ['calculus-3', 'linear-algebra-computational'],
  recommendedBackground: [
    'Python with NumPy, including writing and testing small numerical programs',
    'Some experience reading and writing proofs',
  ],
  tags: ['linear programming', 'simplex method', 'duality', 'integer programming', 'nonlinear optimisation', 'KKT conditions', 'convex optimisation'],
  core: false,
  modules: [
    {
      slug: 'linear-programming',
      title: 'Linear Programming',
      description:
        'Model problems as linear programs, understand their geometry, and solve them with the simplex method, including how to start it and how degeneracy can stall it.',
      lessons: [
        {
          slug: 'modelling-with-linear-programs',
          title: 'Modelling with linear programs',
          summary:
            'Turn a verbal problem into decision variables, a linear objective and linear constraints, then solve it graphically and with SciPy.',
          estimatedMinutes: 110,
          objectives: [
            'Formulate production, diet and transportation problems as linear programs',
            'Solve a two-variable linear program graphically',
            'Linearise absolute values and maxima of linear functions',
            'Solve a linear program with `scipy.optimize.linprog` and read its output',
          ],
          concepts: [
            'Decision variables',
            'Objective function',
            'Constraints and feasible region',
            'Graphical solution',
            'Linearisation tricks',
          ],
          explanation: `A **linear program** (LP) chooses real numbers $x_1, \\dots, x_n$, the **decision variables**, to maximise or minimise a linear **objective** subject to linear equalities and inequalities. The set of points meeting every constraint is the **feasible region**.

Modelling comes first, and it is where most mistakes happen. Ask three questions: what am I choosing, what am I optimising, and what limits me? Give units to every variable and constraint, and check that each constraint has the same units on both sides.

**Worked example.** A bakery makes bread and cakes. A batch of bread earns 4 units of profit and a batch of cakes 3. Each bread batch needs 2 oven hours, 1 bag of flour and 1 hour of labour. Each cake batch needs 1 oven hour, 1 bag of flour and 3 hours of labour. Each day there are 10 oven hours, 7 bags of flour and 18 hours of labour. With $b$ and $c$ batches,
$$\\max\\ 4b + 3c \\quad \\text{s.t.} \\quad 2b + c \\le 10,\\ \\ b + c \\le 7,\\ \\ b + 3c \\le 18,\\ \\ b, c \\ge 0.$$
Draw the three lines. The feasible region is a pentagon with corners $(0, 0)$, $(5, 0)$, $(3, 4)$, $(1.5, 5.5)$ and $(0, 6)$. The corner $(3, 4)$ is where the oven and flour lines meet: $2b + c = 10$ and $b + c = 7$ give $b = 3$ and $c = 4$, and labour then uses only $15$ of its 18 hours. Evaluating the objective at the five corners gives $0, 20, 24, 22.5, 18$. The best is 24, at $(3, 4)$. The level lines $4b + 3c = k$ are parallel, so you can also slide one outwards until it last touches the region.

Some non-linear-looking requirements can be made linear. To minimise $|x|$, add a variable $t$ with $t \\ge x$ and $t \\ge -x$, and minimise $t$. To minimise $\\max_i (a_i^Tx + b_i)$, minimise $t$ with $t \\ge a_i^Tx + b_i$ for each $i$. These tricks work when you minimise a convex piecewise-linear function. You cannot use them to maximise $|x|$.

In Python, \`linprog\` minimises $c^Tx$ subject to $A_{ub}x \\le b_{ub}$, $A_{eq}x = b_{eq}$ and bounds, which default to $x \\ge 0$. So to maximise, negate $c$ and negate the reported optimum. Turn each $\\ge$ constraint into $\\le$ by multiplying by $-1$. Always check \`res.status\` before trusting \`res.x\`: an infeasible or unbounded problem still returns an object.`,
          resources: [
            main(mit15053, 'The early lectures on formulating linear programs, with many applied examples.'),
            also(linprogDoc, 'The documentation for the solver you will use throughout the first half, including the sign conventions.'),
            also(orTools, 'The linear optimisation guides show another modelling interface for comparison.'),
          ],
          exercises: [
            {
              slug: 'diet-problem',
              title: 'A small diet problem',
              prompt:
                'Food A costs 6 per kilogram and supplies 3 units of protein and 1 unit of fibre per kilogram. Food B costs 5 per kilogram and supplies 2 units of protein and 2 units of fibre. You need at least 12 units of protein and 8 of fibre. Formulate the LP, solve it graphically, and confirm with `linprog`. The optimum is 2 kg of A and 3 kg of B, at cost 27.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'transportation',
              title: 'A transportation problem',
              prompt:
                'Two plants supply 30 and 40 units. Three stores need 20, 25 and 25 units. The cost per unit from plant $i$ to store $j$ is given by rows $(4, 6, 9)$ and $(5, 3, 7)$. Formulate the LP with six variables, solve it with `linprog`, and report the shipping plan. The minimum cost is 350. Explain why the demand constraints can be equalities here, and what would change if total supply were less than total demand.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'l1-regression',
              title: 'Robust line fitting as an LP',
              prompt:
                'Given points $(t_i, y_i)$, show how to find the line minimising $\\sum_i |y_i - a - bt_i|$ as an LP with extra variables. Implement it with `linprog`, and fit it to 30 points from $y = 1 + 2t$ plus small noise, with three points replaced by large outliers. Compare the fitted line with least squares, and explain why the absolute-value fit resists outliers. Then fit the line minimising the largest absolute deviation, and compare.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What three questions structure the formulation of an LP?',
              answerOutline: 'What are the decision variables, what is the objective, and what are the constraints, all with consistent units.',
            },
            {
              question: 'How do you make "minimise $|x - 3|$" linear?',
              answerOutline: 'Add $t$ with $t \\geq x - 3$ and $t \\geq 3 - x$, and minimise $t$.',
            },
            {
              question: 'How do you maximise with `linprog`?',
              answerOutline: 'Minimise $-c^Tx$, and negate the reported optimal value. Check `res.status` first.',
            },
          ],
        },
        {
          slug: 'geometry-and-standard-form',
          title: 'Geometry and standard form',
          summary:
            'See that optima of linear programs sit at vertices, and connect vertices to basic feasible solutions of the standard form.',
          estimatedMinutes: 130,
          objectives: [
            'Convert any LP to standard form',
            'Define polyhedra, extreme points and basic feasible solutions, and show they agree',
            'State and use the fundamental theorem of linear programming',
            'Enumerate the basic solutions of a small LP',
          ],
          concepts: [
            'Standard form',
            'Slack and surplus variables',
            'Polyhedron and extreme point',
            'Basic feasible solution',
            'Fundamental theorem of linear programming',
          ],
          explanation: `Any LP can be rewritten in **standard form**,
$$\\min\\ c^Tx \\quad \\text{s.t.} \\quad Ax = b,\\ x \\ge 0,$$
where $A$ is $m \\times n$. Turn maximising into minimising by negating $c$. Add a **slack** variable $s \\ge 0$ to turn $a^Tx \\le \\beta$ into $a^Tx + s = \\beta$, and subtract a **surplus** for $\\ge$. Replace a free variable by $x^+ - x^-$ with both parts non-negative. Assume, after deleting redundant equations, that $A$ has rank $m$.

The feasible set of an LP is a **polyhedron**, an intersection of finitely many half-spaces. An **extreme point** is a feasible point that is not the midpoint of two other feasible points: a corner.

Corners have an algebraic description. Choose $m$ columns of $A$ that are independent, the **basis** $B$. Set the other variables to zero, and solve $A_Bx_B = b$. The result is a **basic solution**. If also $x_B \\ge 0$, it is a **basic feasible solution** (BFS).

**Theorem.** For $\\{x : Ax = b,\\ x \\ge 0\\}$, the extreme points are exactly the basic feasible solutions.

*Sketch.* If $x$ is a BFS and $x = \\tfrac12(y + z)$ with $y, z$ feasible, then $y$ and $z$ vanish wherever $x$ does, since they are non-negative. So both solve the same independent system $A_B x_B = b$, and they equal $x$. Conversely, if the columns where $x > 0$ are dependent, with $A_Pd = 0$ for some $d \\neq 0$, then $x \\pm \\varepsilon d$ are feasible for small $\\varepsilon$, so $x$ is not extreme. $\\square$

**Fundamental theorem of linear programming.** For a standard-form LP: if it is feasible, it has a BFS; and if it has an optimal solution, it has an optimal BFS. Moreover, a feasible LP whose objective is bounded below on the feasible set has an optimal solution. So you can search corners only, and there are at most $\\binom{n}{m}$ of them.

**Worked example.** Add slacks $s_1, s_2, s_3$ to the bakery LP. Then $m = 3$ and $n = 5$, so there are at most $\\binom{5}{3} = 10$ bases. All 10 sets of three columns turn out to be independent, so there are 10 basic solutions. Exactly 5 are feasible, and they are the 5 corners of the pentagon. For example, the basis $\\{b, c, s_3\\}$ gives $b = 3$, $c = 4$, $s_3 = 3$, the optimum. The basis $\\{b, s_2, s_3\\}$ sets $c = s_1 = 0$, so $2b = 10$ and $b = 5$, giving the corner $(5, 0)$ with slacks $s_2 = 2$ and $s_3 = 13$. Now try $\\{b, s_1, s_2\\}$, which sets $c = s_3 = 0$. The labour equation gives $b = 18$, and then $s_1 = 10 - 36 = -26$, so this basic solution is infeasible. It is the point $(18, 0)$. Each of the 5 infeasible basic solutions is an intersection of two constraint lines that lies outside the pentagon.

Enumerating bases grows combinatorially, which is why the simplex method walks from corner to corner instead.`,
          resources: [
            main(mit6251, 'The lectures on the geometry of linear programming and on basic feasible solutions.'),
            also(mit15053, 'The lectures connecting the geometric and algebraic views of the simplex method.'),
            also(linprogDoc, 'Run the bakery problem and note which constraints are tight from the slack output.'),
          ],
          exercises: [
            {
              slug: 'convert-to-standard-form',
              title: 'Convert to standard form',
              prompt:
                'Rewrite in standard form: maximise $x_1 - 2x_2 + x_3$ subject to $x_1 + x_2 \\geq 2$, $|x_2 - x_3| \\leq 4$, $x_1 \\leq 5$, with $x_1 \\geq 0$, $x_2$ free and $x_3 \\leq 0$. State the matrix $A$, vectors $b$ and $c$, and how to recover the original variables. Solve both versions with `linprog` and confirm they agree.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'enumerate-bases',
              title: 'Enumerate the bases',
              prompt:
                'Write a program that enumerates every choice of $m$ columns for a standard-form LP, skips dependent choices, and reports each basic solution, whether it is feasible, and its objective value. Run it on the bakery LP with slacks, confirming 10 basic solutions, 5 of them feasible, and the optimum 24. Then run it on a random LP with $m = 8$ and $n = 20$, and report how many bases it had to examine. Compare with the number of simplex pivots `linprog` reports.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'prove-fundamental-theorem',
              title: 'Prove the fundamental theorem',
              prompt:
                'Prove that if a standard-form LP has an optimal solution, then it has an optimal basic feasible solution. Use the idea of the sketch: if the positive columns of an optimal $x$ are dependent, move along a null direction $d$ until some variable reaches zero, and explain why the objective cannot change along $d$. Then give an LP whose feasible set has no extreme points, and explain why standard form rules this out.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'If $c^Td \\neq 0$, moving in one of the two directions $\\pm d$ improves the objective while staying feasible.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is a basic feasible solution?',
              answerOutline: 'A solution of $Ax = b$ obtained by choosing $m$ independent columns, setting the other variables to zero, with all resulting values non-negative.',
            },
            {
              question: 'What does the fundamental theorem allow you to restrict the search to?',
              answerOutline: 'The basic feasible solutions (vertices), whenever an optimum exists.',
            },
            {
              question: 'Name the three possible outcomes of an LP.',
              answerOutline: 'Infeasible, unbounded, or a finite optimum that is attained.',
            },
          ],
        },
        {
          slug: 'simplex-method',
          title: 'The simplex method',
          summary:
            'Move from vertex to adjacent vertex with pivots, using reduced costs to choose a direction and the ratio test to stay feasible.',
          estimatedMinutes: 150,
          objectives: [
            'Carry out the simplex method in tableau form',
            'Explain reduced costs and the ratio test',
            'Recognise optimality and unboundedness from a tableau',
            'Implement the method in exact arithmetic',
          ],
          concepts: [
            'Tableau',
            'Reduced cost',
            'Entering and leaving variables',
            'Ratio test',
            'Optimality and unboundedness',
          ],
          explanation: `The **simplex method** starts at a basic feasible solution and pivots to an adjacent one, improving the objective each time, until no improving neighbour exists.

At a basis $B$, express the basic variables and the objective in terms of the non-basic ones. For a maximisation problem in the form $\\max c^Tx$, $Ax \\le b$, $x \\ge 0$, with $b \\ge 0$, the slacks form a starting basis at $x = 0$. A **tableau** stores the current system. Its objective row holds the **reduced costs**: the rate at which the objective changes as each non-basic variable increases from 0 with the others fixed.

One iteration has three steps.
1. **Choose an entering variable.** For maximisation, it is any non-basic variable whose increase improves the objective. **Dantzig's rule** picks the largest improvement rate.
2. **Ratio test.** Increasing that variable changes the basic ones. Increase it until the first basic variable hits zero, the minimum of $(\\text{right-hand side})/(\\text{column entry})$ over rows with positive entries. That variable leaves the basis. If no entry is positive, the objective improves forever, and the LP is **unbounded**.
3. **Pivot.** Row-reduce so that the entering column becomes a unit vector.

If no non-basic variable improves the objective, the current BFS is optimal, since every feasible point is the current point plus non-negative amounts of the non-basic variables.

**Worked example.** Solve the bakery LP, with slacks $s_1, s_2, s_3$ for oven, flour and labour. Start at $b = c = 0$ with objective 0. Both reduced costs are positive, 4 for $b$ and 3 for $c$. By Dantzig's rule, $b$ enters. The ratios are $10/2 = 5$ (oven), $7/1 = 7$ (flour) and $18/1 = 18$ (labour). The smallest is oven, so $s_1$ leaves, and $b = 5$. After pivoting, $b = 5 - \\tfrac12 c - \\tfrac12 s_1$, and the objective is $20 + c - 2s_1$. Now only $c$ improves it, at rate 1. The flour row reads $s_2 = 2 - \\tfrac12 c + \\tfrac12 s_1$, which limits $c$ to 4. The labour row reads $s_3 = 13 - \\tfrac52 c + \\tfrac12 s_1$, which limits $c$ to $5.2$. So $s_2$ leaves and $c = 4$. Pivoting gives $b = 3$, $c = 4$, $s_3 = 3$, and the objective $24 - s_1 - 2s_2$. Both reduced costs are negative, so the solution is optimal at 24. The coefficients 1 and 2 of the slacks reappear in the next module as the shadow prices of oven hours and flour.

Each pivot costs one sweep of row operations. The method visits only a few vertices on typical problems, although there are artificial examples where it visits exponentially many. Production solvers use the **revised simplex method**, which keeps a factorisation of $A_B$ instead of the whole tableau.`,
          resources: [
            main(mit6251, 'The lectures on the simplex method and its implementation.'),
            also(mit15053, 'The lectures on the simplex algorithm, with tableau examples.'),
            also(linprogDoc, 'Note the method options, including the HiGHS dual simplex.'),
          ],
          exercises: [
            {
              slug: 'simplex-by-hand',
              title: 'Simplex by hand',
              prompt:
                'Solve $\\max\\ 2x + 3y$ subject to $x + y \\leq 4$, $x + 3y \\leq 6$, $x \\leq 3.5$, $x, y \\geq 0$ with the tableau simplex method and Dantzig\'s rule. Record each entering and leaving variable and each ratio test. You should pivot twice and reach $(3, 1)$ with value 9, with the third slack equal to $1/2$. Draw the path on the feasible region.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'implement-simplex',
              title: 'Implement the tableau simplex',
              prompt:
                'Implement the tableau simplex method for $\\max c^Tx$, $Ax \\leq b$, $x \\geq 0$, $b \\geq 0$, using Python `fractions.Fraction` so that arithmetic is exact. Return the optimal $x$, the value, the final basis and the list of pivots, or report unboundedness. Test on the bakery LP and the exercise above, on an unbounded LP of your choice, and on 50 random problems, comparing values with `linprog`.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'optimality-and-unboundedness',
              title: 'Justify the stopping rules',
              prompt:
                'Prove that if every reduced cost of a maximisation tableau is non-positive, the current BFS is optimal. Prove that if an improving column has no positive entry, the LP is unbounded, by writing down an explicit ray of feasible points along which the objective tends to infinity. Give a two-variable example of each.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a reduced cost measure?',
              answerOutline: 'The rate of change of the objective as one non-basic variable increases from 0, with the other non-basic variables fixed and the basic variables adjusting.',
            },
            {
              question: 'Why does the ratio test use only positive column entries?',
              answerOutline: 'Only those basic variables decrease as the entering variable grows. Entries that are zero or negative keep the variable non-negative.',
            },
            {
              question: 'What does a column with no positive entry, but an improving reduced cost, mean?',
              answerOutline: 'The LP is unbounded in the direction of improvement.',
            },
          ],
        },
        {
          slug: 'starting-and-degeneracy',
          title: 'Starting the simplex method and degeneracy',
          summary:
            'Find an initial vertex with a phase one problem, detect infeasibility, and handle degenerate pivots and cycling.',
          estimatedMinutes: 120,
          objectives: [
            'Set up and solve a phase one problem with artificial variables',
            'Detect infeasibility from phase one',
            'Recognise degenerate vertices and pivots',
            'Explain cycling and how Bland\'s rule prevents it',
          ],
          concepts: [
            'Artificial variables',
            'Two-phase method',
            'Degenerate basic feasible solution',
            'Cycling',
            'Bland\'s rule',
          ],
          explanation: `The slack basis starts the simplex method only when $b \\ge 0$ and every constraint is $\\le$. Otherwise you need a starting vertex. Write the problem in standard form with $b \\ge 0$, multiplying equations by $-1$ where needed, and add an **artificial** variable $a_i \\ge 0$ to each equation: $Ax + a = b$. Now $x = 0$, $a = b$ is a BFS of this larger problem. **Phase one** minimises $\\sum_i a_i$.

If the phase one optimum is positive, the original LP is **infeasible**, because any feasible $x$ would give a solution with $a = 0$. If it is 0, the final basis gives a BFS of the original problem. (Artificial variables still in the basis at zero must be pivoted out, or their rows are redundant.) **Phase two** then optimises the real objective from that vertex.

**Worked example.** Minimise $x + y$ subject to $x + 2y \\ge 4$, $3x + y \\ge 6$, $x, y \\ge 0$. With surplus variables, $x + 2y - s_1 = 4$ and $3x + y - s_2 = 6$. The point $x = y = 0$ would need $s = (-4, -6)$, so it is not feasible, and no slack basis exists. Add artificials $a_1, a_2$, and minimise $a_1 + a_2$, starting from $a = (4, 6)$. The phase one objective, written in non-basic variables, is $10 - 4x - 3y + s_1 + s_2$. So $x$ enters with rate $-4$. The ratios are $4/1$ and $6/3$, so $a_2$ leaves at $x = 2$. Next, $y$ enters and $a_1$ leaves, giving $x = 1.6$, $y = 1.2$ with both artificials zero. Phase one is complete. Phase two with objective $x + y$ finds that this vertex is already optimal, with value 2.8. You can check by noting that the two constraint normals bracket the objective direction $(1, 1)$.

A BFS is **degenerate** if some basic variable is zero. Then a pivot can have step length zero: the basis changes but the point does not, and the objective does not improve. For example, if the bakery's labour limit is 15 instead of 18, the optimal corner $(3, 4)$ lies on all three constraint lines. One of the three slacks is then basic at value 0.

Degeneracy matters because the usual proof that the simplex method terminates relies on strict improvement: there are finitely many bases, and none can repeat if the objective rises every time. With zero steps, a sequence of bases can repeat forever. This is called **cycling**. **Bland's rule** prevents it: choose the entering variable with the smallest index among the improving ones, and break ties in the ratio test by the smallest index. With Bland's rule, the simplex method always terminates. Real solvers prefer cheaper protections such as perturbing $b$, because Bland's rule can be slow.`,
          resources: [
            main(mit6251, 'The lectures on degeneracy, Bland\'s rule and the two-phase method.'),
            also(mit15053, 'See the material on finding an initial feasible solution.'),
            also(linprogDoc, 'Compare the status codes for infeasible and unbounded problems with what phase one reports.'),
          ],
          exercises: [
            {
              slug: 'phase-one-detects-infeasibility',
              title: 'Phase one detects infeasibility',
              prompt:
                'Run phase one by hand on $x + y \\leq 1$, $x + y \\geq 2$, $x, y \\geq 0$. Show that the phase one optimum is 1, and explain what that number measures. Then add phase one to your simplex implementation, and test it on the worked example, where it should reach $(1.6, 1.2)$ and then the optimum 2.8, and on this infeasible problem.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'beale-cycling',
              title: 'Watch the simplex method cycle',
              prompt:
                'Run your implementation on Beale\'s example: maximise $\\tfrac34 x_1 - 20x_2 + \\tfrac12 x_3 - 6x_4$ subject to $\\tfrac14 x_1 - 8x_2 - x_3 + 9x_4 \\leq 0$, $\\tfrac12 x_1 - 12x_2 - \\tfrac12 x_3 + 3x_4 \\leq 0$, $x_3 \\leq 1$, $x \\geq 0$. Use Dantzig\'s rule, breaking ties by lowest index, and in the ratio test choose the leaving variable of lowest index among ties. Show that after 6 pivots the starting basis returns. Then switch to Bland\'s rule and show that it terminates with value $5/4$. Confirm the value with `linprog`.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Keep a list of bases you have seen, as sorted tuples, and stop if one repeats.',
            },
            {
              slug: 'degenerate-vertex',
              title: 'Degenerate vertices',
              prompt:
                'Change the bakery labour limit to 15. Show that $(3, 4)$ is now a degenerate vertex, and find all the bases that represent it. Run the simplex method from the slack basis and determine whether any pivot is degenerate. Then prove that if every BFS of an LP is non-degenerate, the simplex method terminates with any rule that chooses an improving variable.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What does a positive phase one optimum tell you?',
              answerOutline: 'The original problem is infeasible. The value measures the least total violation achievable in that formulation.',
            },
            {
              question: 'What is a degenerate pivot, and why does it threaten termination?',
              answerOutline: 'A pivot with step length zero. The objective does not increase, so bases could repeat, which is cycling.',
            },
            {
              question: 'State Bland\'s rule.',
              answerOutline: 'Enter the improving variable with the smallest index, and among tied ratio-test rows, remove the basic variable with the smallest index.',
            },
          ],
        },
      ],
      project: {
        slug: 'simplex-solver',
        title: 'A two-phase simplex solver',
        description: `Build a complete two-phase simplex solver for LPs given in general form: maximisation or minimisation, constraints of each kind, and free variables. It should convert to standard form, run phase one and phase two, and report one of three outcomes with a certificate in each case: an optimal solution with its dual values, a ray proving unboundedness, or a phase one result proving infeasibility. Use exact rational arithmetic for correctness, and add a floating-point version to compare speed. Validate against \`linprog\`, and write up what you learn about degeneracy and pivoting rules on real test problems.`,
        deliverables: [
          'A package that reads an LP from a simple text or JSON format and returns status, solution and certificate',
          'Exact and floating-point versions, with Dantzig\'s rule and Bland\'s rule selectable',
          'A test suite of at least 30 LPs, including infeasible, unbounded and degenerate ones and Beale\'s cycling example, all checked against `linprog`',
          'A table comparing pivot counts and run times for the two rules on random LPs of increasing size',
          'A short report explaining the certificates and why each one proves its claim',
        ],
        estimatedHours: 10,
        stretchGoals: ['Implement the revised simplex method with an LU factorisation of the basis', 'Add the dual simplex method and use it to re-solve after adding a constraint'],
      },
    },
    {
      slug: 'duality',
      title: 'Duality and Sensitivity',
      description:
        'Pair every LP with a dual, prove the duality theorems, use complementary slackness to certify optimality, and measure how solutions respond to changes in the data.',
      lessons: [
        {
          slug: 'the-dual-linear-program',
          title: 'The dual linear program',
          summary:
            'Derive the dual of an LP by bounding its objective, and learn the rules for writing duals of any form.',
          estimatedMinutes: 110,
          objectives: [
            'Derive the dual as the best bound from combining constraints',
            'Write the dual of an LP in any form using the correspondence rules',
            'Show that the dual of the dual is the primal',
            'Interpret dual variables economically',
          ],
          concepts: [
            'Primal and dual',
            'Dual variables as multipliers',
            'Correspondence rules',
            'Symmetric form',
            'Economic interpretation',
          ],
          explanation: `Every LP comes with a partner, its **dual**, and the best way to meet it is through bounding.

**Worked example.** For the bakery LP, multiply the three constraints by non-negative numbers $u_1, u_2, u_3$ and add:
$$(2u_1 + u_2 + u_3)\\,b + (u_1 + u_2 + 3u_3)\\,c \\le 10u_1 + 7u_2 + 18u_3.$$
If the coefficient of $b$ is at least 4 and that of $c$ is at least 3, then for every feasible point, $4b + 3c$ is at most the left side (since $b, c \\ge 0$), so it is at most $10u_1 + 7u_2 + 18u_3$. Each such $u$ gives an upper bound on the profit. The best bound solves the **dual LP**:
$$\\min\\ 10u_1 + 7u_2 + 18u_3 \\quad \\text{s.t.} \\quad 2u_1 + u_2 + u_3 \\ge 4,\\ \\ u_1 + u_2 + 3u_3 \\ge 3,\\ \\ u \\ge 0.$$
Try $u = (1, 2, 0)$. It is feasible, since $2 + 2 = 4$ and $1 + 2 = 3$, and it gives the bound 24. The bakery already earns 24 at $(3, 4)$, so both are optimal. The dual solution is a certificate: anyone can check in seconds that no plan earns more than 24.

In general, the primal $\\max\\{c^Tx : Ax \\le b,\\ x \\ge 0\\}$ has dual $\\min\\{b^Ty : A^Ty \\ge c,\\ y \\ge 0\\}$. Other forms follow the same logic, and there are short rules you can verify by bounding. For a maximisation primal:

- A $\\le$ constraint gives a dual variable $y_i \\ge 0$, an equality gives a free $y_i$, and a $\\ge$ constraint gives $y_i \\le 0$.
- A variable $x_j \\ge 0$ gives a dual constraint $\\ge$, a free variable gives an equality, and $x_j \\le 0$ gives $\\le$.

In standard form, $\\min\\{c^Tx : Ax = b,\\ x \\ge 0\\}$ has dual $\\max\\{b^Ty : A^Ty \\le c\\}$, with $y$ free. Taking the dual twice returns the original problem.

The dual variables have a meaning. A dual variable prices one unit of a resource. The value $u = (1, 2, 0)$ says that an extra oven hour is worth 1, an extra bag of flour 2, and labour nothing, since it is not used up. These are **shadow prices**. A company that wanted to buy the bakery's resources would need to offer at least these prices, which is the dual problem in economic language.

Be careful with sign conventions in software. SciPy's \`linprog\` reports marginals for its minimisation form, so for a maximisation that you negated, the dual values appear with flipped signs. For the bakery, it reports $(-1, -2, 0)$.`,
          resources: [
            main(mit6251, 'The lectures on duality theory.'),
            also(mit15053, 'The lectures on duality and its economic interpretation.'),
            also(linprogDoc, 'See the `marginals` fields of the result and their sign convention.'),
          ],
          exercises: [
            {
              slug: 'dual-of-the-diet',
              title: 'The dual of the diet problem',
              prompt:
                'Write the dual of the diet problem from the first lesson. Interpret its variables as prices for protein and fibre that a supplement seller might charge. Solve it by hand, using the fact that both foods are bought at the optimum, to get prices $(7/4, 3/4)$ and value 27. Check that `linprog` reports the same values, up to sign, as the marginals of the primal.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'dual-rules',
              title: 'Derive the correspondence rules',
              prompt:
                'Derive the dual of $\\max\\ c^Tx$ subject to $A_1x \\leq b_1$, $A_2x = b_2$, $A_3x \\geq b_3$, with $x_1 \\geq 0$, $x_2$ free and $x_3 \\leq 0$, from the bounding argument rather than by memorised rules. Then prove that the dual of the dual is the primal, for the symmetric form.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'transport-dual',
              title: 'Prices for the transportation problem',
              prompt:
                'Write the dual of the transportation problem from the first lesson. Interpret its variables as a price at each store and a value at each plant, and explain the dual constraints as a no-arbitrage condition. Solve the dual with `linprog`, confirm the value 350, and check that on every route used in the optimal plan, the dual constraint holds with equality.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does every dual feasible solution give a bound on the primal?',
              answerOutline: 'Combining the constraints with non-negative multipliers gives an inequality whose left side dominates the objective on the feasible set.',
            },
            {
              question: 'What dual variable does an equality constraint produce?',
              answerOutline: 'A free variable, since multiplying an equality by a negative number keeps it valid.',
            },
            {
              question: 'What is a shadow price?',
              answerOutline: 'The value of a dual variable: the rate of change of the optimal value per unit of that resource, within a range.',
            },
          ],
        },
        {
          slug: 'weak-and-strong-duality',
          title: 'Weak and strong duality',
          summary:
            'Prove the duality theorems and the Farkas lemma, and classify the possible outcomes of a primal-dual pair.',
          estimatedMinutes: 130,
          objectives: [
            'Prove weak duality',
            'State the Farkas lemma and use it to prove strong duality',
            'List which combinations of primal and dual outcomes are possible',
            'Read a strong duality proof off the final simplex tableau',
          ],
          concepts: [
            'Weak duality',
            'Strong duality',
            'Farkas lemma',
            'Separating hyperplane',
            'Infeasibility certificate',
          ],
          explanation: `Take the pair $\\max\\{c^Tx : Ax \\le b,\\ x \\ge 0\\}$ and $\\min\\{b^Ty : A^Ty \\ge c,\\ y \\ge 0\\}$.

**Weak duality.** If $x$ is primal feasible and $y$ is dual feasible, then $c^Tx \\le b^Ty$.

*Proof.* $c^Tx \\le (A^Ty)^Tx = y^TAx \\le y^Tb$. The first step uses $x \\ge 0$ with $A^Ty \\ge c$, and the second uses $y \\ge 0$ with $Ax \\le b$. $\\square$

So if feasible $x$ and $y$ have equal objective values, both are optimal. If the primal is unbounded, the dual is infeasible, and vice versa.

**Strong duality.** If either problem has a finite optimum, then so does the other, and the optimal values are equal.

Two proofs are worth knowing. One reads it off the simplex method. At an optimal tableau, the reduced costs of the slack variables, with their signs reversed, form a dual feasible $y$ with $b^Ty$ equal to the primal value. In the bakery, these were $(1, 2, 0)$. This proof needs the simplex method to terminate, which Bland's rule guarantees. The other proof uses geometry.

**Farkas lemma.** For a matrix $A$ and vector $b$, exactly one of these holds: (i) $Ax = b$ has a solution with $x \\ge 0$; (ii) there is $y$ with $A^Ty \\ge 0$ and $b^Ty < 0$.

Both cannot hold, since then $0 > b^Ty = x^TA^Ty \\ge 0$. If (i) fails, then $b$ lies outside the closed convex cone generated by the columns of $A$. A separating hyperplane through the origin then gives $y$. The closedness of a finitely generated cone is the step that needs care. Farkas turns infeasibility into something you can check: $y$ is a **certificate** that no solution exists.

Strong duality follows by applying Farkas to the system "primal feasible and objective at least $z$", for a value $z$ just above the dual optimum.

**Worked example: every combination.** The possible outcomes pair up as follows. Both problems can have finite optima, which are then equal. One can be unbounded while the other is infeasible. And both can be infeasible. Take $\\max x_1$ subject to $x_1 - x_2 \\le -1$, $-x_1 + x_2 \\le -1$, $x \\ge 0$. Adding the constraints gives $0 \\le -2$, so the primal is infeasible. Its dual is $\\min -y_1 - y_2$ subject to $y_1 - y_2 \\ge 1$, $-y_1 + y_2 \\ge 0$, $y \\ge 0$, and adding these gives $0 \\ge 1$, so the dual is infeasible too. The combination never seen is a finite optimum on one side with infeasibility or unboundedness on the other: strong duality rules it out.

Finally, the duality gap in LP is zero whenever either optimum is finite. This fails for non-linear and integer problems. Later modules return to this point.`,
          resources: [
            main(mit6251, 'The lectures on duality theory and on the Farkas lemma.'),
            also(mit6253, 'The early lectures on convex sets and separating hyperplanes, for the geometric proof.'),
            also(linprogDoc, 'Run the infeasible pair from this lesson and compare the status codes.'),
          ],
          exercises: [
            {
              slug: 'farkas-proof',
              title: 'Prove the Farkas lemma',
              prompt:
                'Prove the Farkas lemma, assuming the separating hyperplane theorem for a point and a closed convex set. You may also assume that a finitely generated cone is closed, but state clearly where you use it. Then derive the variant: exactly one of $Ax \\leq b$ with $x$ arbitrary, or $y \\geq 0$ with $A^Ty = 0$ and $b^Ty < 0$, holds.',
              kind: 'derivation',
              difficulty: 3,
            },
            {
              slug: 'strong-duality-from-farkas',
              title: 'Strong duality from Farkas',
              prompt:
                'Prove strong duality for the symmetric pair, assuming that the primal has a finite optimum $z^*$. Apply the Farkas lemma to the system $Ax \\leq b$, $c^Tx \\geq z^* + \\varepsilon$, $x \\geq 0$, which has no solution for $\\varepsilon > 0$, and extract a dual solution with value less than $z^* + \\varepsilon$. Conclude, and explain why the dual optimum is attained.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'The certificate gives multipliers $(y, \\tau)$. Show that $\\tau > 0$, using primal feasibility, then divide by it.',
            },
            {
              slug: 'certificates-in-code',
              title: 'Check certificates in code',
              prompt:
                'Write a function that takes an LP and a claimed certificate and checks it: a primal and dual pair with equal values for optimality, a Farkas vector for infeasibility, or a feasible point plus a ray for unboundedness. Test it on the bakery LP, on the infeasible pair from the lesson, and on an unbounded LP. Explain why checking a certificate is far cheaper than solving the problem.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Prove weak duality in one line.',
              answerOutline: '$c^Tx \\leq (A^Ty)^Tx = y^T(Ax) \\leq y^Tb$, using the signs of $x$ and $y$.',
            },
            {
              question: 'State the Farkas lemma.',
              answerOutline: 'Exactly one of: $Ax = b, x \\geq 0$ is solvable; or some $y$ has $A^Ty \\geq 0$ and $b^Ty < 0$.',
            },
            {
              question: 'Can a primal LP have a finite optimum while its dual is infeasible?',
              answerOutline: 'No. Strong duality says the dual then has an optimum with the same value.',
            },
          ],
        },
        {
          slug: 'complementary-slackness',
          title: 'Complementary slackness',
          summary:
            'Use the conditions that link primal and dual optima to verify a solution, or to compute one from the other.',
          estimatedMinutes: 100,
          objectives: [
            'State and prove the complementary slackness theorem',
            'Verify optimality of a proposed solution by constructing a dual',
            'Recover a dual solution from a primal one',
            'Interpret complementary slackness economically',
          ],
          concepts: [
            'Complementary slackness',
            'Optimality conditions for LP',
            'Tight and slack constraints',
            'Dual recovery',
          ],
          explanation: `Weak duality gives $c^Tx \\le y^TAx \\le y^Tb$, and at optimality both inequalities must be equalities. Writing out what that means term by term gives the **complementary slackness** theorem.

**Theorem.** Let $x$ be feasible for $\\max\\{c^Tx : Ax \\le b,\\ x \\ge 0\\}$ and $y$ feasible for its dual. Then both are optimal if and only if
$$y_i\\,(b_i - (Ax)_i) = 0 \\ \\text{ for all } i \\quad \\text{and} \\quad x_j\\,((A^Ty)_j - c_j) = 0 \\ \\text{ for all } j.$$
In words: if a constraint has slack, its dual variable is zero, and if a dual constraint has slack, the matching primal variable is zero.

*Proof.* We have $y^Tb - c^Tx = y^T(b - Ax) + x^T(A^Ty - c)$. Both terms are sums of products of non-negative numbers, so the difference is zero exactly when every product is zero. By weak duality, equal values hold exactly at a pair of optima. $\\square$

Economically, a resource left over is worth nothing at the margin, and an activity whose resources cost more than it earns is not used.

**Worked example.** Is $(x, y) = (3, 1)$ optimal for $\\max 2x + 3y$ subject to $x + y \\le 4$, $x + 3y \\le 6$, $x \\le 3.5$, $x, y \\ge 0$? It is feasible, using the first two constraints fully and leaving $0.5$ in the third. Complementary slackness then forces $u_3 = 0$. Both $x$ and $y$ are positive, so both dual constraints must be tight:
$$u_1 + u_2 + u_3 = 2, \\qquad u_1 + 3u_2 = 3.$$
With $u_3 = 0$, the solution is $u_2 = \\tfrac12$ and $u_1 = \\tfrac32$. These are non-negative, so $u$ is dual feasible. It satisfies complementary slackness by construction, so both are optimal. As a check, $4 \\cdot \\tfrac32 + 6 \\cdot \\tfrac12 = 9 = 2 \\cdot 3 + 3 \\cdot 1$.

The same procedure refutes a wrong claim. Suppose someone claims that $(0, 2)$ is optimal. The first constraint has slack, since $0 + 2 < 4$, and so does the third, so $u_1 = u_3 = 0$. Since $y > 0$, the second dual constraint must be tight, so $3u_2 = 3$, giving $u_2 = 1$. But the first dual constraint then reads $u_1 + u_2 + u_3 = 1 \\ge 2$, which is false. No dual solution is complementary to $(0, 2)$, so it is not optimal.

Complementary slackness is the LP version of the KKT conditions of a later module. Algorithms use it too: the primal-dual interior-point methods of the capstone drive the products $x_j s_j$ to zero together.`,
          resources: [
            main(mit6251, 'The lectures on complementary slackness and on the optimality conditions.'),
            also(mit15053, 'The lecture on duality applications.'),
            also(linprogDoc, 'Check complementary slackness numerically using `slack` and `marginals`.'),
          ],
          exercises: [
            {
              slug: 'verify-by-slackness',
              title: 'Verify optimality by slackness',
              prompt:
                'For the bakery LP, use complementary slackness to verify that $(3, 4)$ is optimal by computing the unique complementary dual solution. Then test the claims that $(5, 0)$ and $(1.5, 5.5)$ are optimal, and show how complementary slackness rejects each one. Report which dual constraint fails in each case.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'slackness-general-form',
              title: 'Slackness in standard form',
              prompt:
                'State and prove complementary slackness for the pair $\\min\\{c^Tx : Ax = b, x \\geq 0\\}$ and $\\max\\{b^Ty : A^Ty \\leq c\\}$. Explain why equality constraints give no condition. Then show that strict complementarity, meaning exactly one of $x_j$ and $c_j - (A^Ty)_j$ is positive for each $j$, can fail at a pair of optimal solutions, using an LP with several optimal solutions.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'dual-recovery-code',
              title: 'Recover duals in code',
              prompt:
                'Write a function that takes an optimal primal vertex of $\\max\\{c^Tx : Ax \\leq b, x \\geq 0\\}$ and recovers a dual solution by solving the equations complementary slackness forces. Test it on 30 random LPs solved with `linprog`, comparing with the reported marginals. Explain what goes wrong at degenerate vertices, where the dual may not be unique.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State complementary slackness in words.',
              answerOutline: 'At optimality, every slack constraint has a zero dual price, and every dual constraint with slack has a zero primal variable.',
            },
            {
              question: 'How does complementary slackness verify a proposed optimum?',
              answerOutline: 'It forces some dual variables to be zero and some dual constraints to be equalities. Solve those, then check dual feasibility.',
            },
            {
              question: 'Why can the dual be non-unique at a degenerate primal vertex?',
              answerOutline: 'More constraints are tight than the dimension needs, so the equations from complementary slackness are underdetermined.',
            },
          ],
        },
        {
          slug: 'sensitivity-analysis',
          title: 'Sensitivity analysis',
          summary:
            'Find how the optimum responds to changes in resources and prices, and the ranges over which those rates hold.',
          estimatedMinutes: 120,
          objectives: [
            'Interpret dual values as rates of change of the optimal value',
            'Compute ranges for right-hand sides and objective coefficients over which the basis stays optimal',
            'Describe the optimal value as a function of a right-hand side',
            'Use solver output for sensitivity correctly',
          ],
          concepts: [
            'Shadow price',
            'Right-hand side ranging',
            'Objective coefficient ranging',
            'Optimal value function',
            'Basis change',
          ],
          explanation: `Data in real problems is uncertain, so you need to know how the answer moves with it. **Sensitivity analysis** asks what happens when one number changes while the optimal basis stays the same.

**Right-hand sides.** If the basis $B$ stays optimal, the basic solution is $x_B = A_B^{-1}b$, so it moves linearly with $b$, and the optimal value changes at the rate given by the dual values. The basis stays optimal exactly as long as $x_B$ stays non-negative, because changing $b$ does not affect the reduced costs.

**Worked example.** Change the bakery's oven hours from 10 to $10 + \\delta$, keeping the basis $\\{b, c, s_3\\}$. Solve $2b + c = 10 + \\delta$ and $b + c = 7$, which give $b = 3 + \\delta$ and $c = 4 - \\delta$. Labour use is then $b + 3c = 15 - 2\\delta$, so $s_3 = 3 + 2\\delta$. All three stay non-negative while $-1.5 \\le \\delta \\le 4$, that is, for oven hours between 8.5 and 14. Over that range, profit is $24 + \\delta$, so each extra oven hour is worth exactly its shadow price, 1. At 8.5 hours, the labour constraint becomes tight and the basis changes. Below that, an oven hour is worth more, 1.8 per hour down to 6 hours. Above 14 hours, cakes drop to zero, and more oven time is worth nothing.

Flour behaves differently. Its shadow price is 2, but the same calculation with $7 + \\delta$ bags gives $b = 3 - \\delta$ and $c = 4 + 2\\delta$, and labour reaches its limit at $\\delta = 0.6$. So a seventh and a half bag adds 1 to profit, but an eighth whole bag adds less than 2. **A shadow price holds only within its range**, and quoting it without the range is a common error.

**Objective coefficients.** Changing $c_j$ leaves the current solution feasible but changes the reduced costs. The basis remains optimal while all reduced costs keep the right sign. Geometrically, the objective's direction must stay between the normals of the tight constraints. For bread profit $p$ in place of 4, $(3, 4)$ stays optimal while the ratio of $p$ to cake profit 3 lies between the slopes of the flour line (1 to 1) and the oven line (2 to 1). That is, while $3 \\le p \\le 6$.

As $b$ varies over all values, the optimal value of a maximisation LP is a **concave, piecewise-linear** function of $b$, with slopes equal to the dual values on each piece. Its breakpoints are where bases change. That is the same diminishing return that the bakery shows. Solver marginals give you the slope at the current $b$ only, so compute ranges separately or by re-solving.`,
          resources: [
            main(mit15053, 'The lectures on sensitivity analysis and its use in practice.'),
            also(mit6251, 'The lecture on sensitivity analysis and parametric programming.'),
            also(linprogDoc, 'Marginals give slopes at the current data, not ranges.'),
          ],
          exercises: [
            {
              slug: 'ranges-for-the-diet',
              title: 'Ranges for the diet problem',
              prompt:
                'For the diet problem, find the range of the protein requirement over which the optimal basis stays the same, and the cost per unit of extra protein within it. Then find the range of the price of food A, now 6, over which buying 2 kg of A and 3 kg of B stays optimal. Check both by re-solving with `linprog` just inside and just outside each range.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'value-function',
              title: 'Plot the optimal value function',
              prompt:
                'For the bakery, plot the optimal profit against oven hours from 0 to 20 by solving with `linprog` at 81 points. Identify each breakpoint and each slope. You should find slope 1 between 8.5 and 14 hours, slope 1.8 between 6 and 8.5, and slope 0 above 14. Explain each piece in terms of which constraints are tight. Prove that the optimal value of a maximisation LP is concave in $b$.',
              kind: 'coding',
              difficulty: 2,
              hint: 'For concavity, take optimal solutions for $b_1$ and $b_2$ and show that their average is feasible for the average right-hand side.',
            },
            {
              slug: 'objective-range-proof',
              title: 'Ranging an objective coefficient',
              prompt:
                'Derive a general formula for the range of a single objective coefficient $c_j$ of a basic variable over which the current basis stays optimal, in terms of the final tableau. Apply it to bread profit in the bakery, and confirm the range $[3, 6]$. Explain what happens at each endpoint, where two vertices are both optimal.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why does a shadow price hold only within a range?',
              answerOutline: 'It is a slope of a piecewise-linear value function. Once the basis changes, a different slope applies.',
            },
            {
              question: 'What stays fixed when you change a right-hand side, and what stays fixed when you change an objective coefficient?',
              answerOutline: 'A right-hand side change keeps reduced costs and can break feasibility. An objective change keeps feasibility and can break optimality.',
            },
            {
              question: 'What shape is the optimal value of a maximisation LP as a function of $b$?',
              answerOutline: 'Concave and piecewise linear, with slopes equal to the dual values.',
            },
          ],
        },
      ],
    },
    {
      slug: 'network-and-integer-programming',
      title: 'Network and Integer Programming',
      description:
        'Solve flow problems whose LPs have integer optima automatically, then tackle general integer programs with branch and bound and cutting planes.',
      lessons: [
        {
          slug: 'network-flows',
          title: 'Network flows',
          summary:
            'Model maximum flow and minimum-cost flow as LPs, and prove the max-flow min-cut theorem through duality.',
          estimatedMinutes: 120,
          objectives: [
            'Formulate maximum flow and minimum-cost flow as linear programs',
            'Find a maximum flow by augmenting paths',
            'State and prove the max-flow min-cut theorem',
            'Solve flow problems with NetworkX',
          ],
          concepts: [
            'Directed network and capacities',
            'Flow conservation',
            's-t cut',
            'Augmenting path and residual network',
            'Max-flow min-cut theorem',
            'Minimum-cost flow',
          ],
          explanation: `A **network** is a directed graph with a capacity $u_e \\ge 0$ on each arc. An **$s$-$t$ flow** assigns $0 \\le x_e \\le u_e$ to each arc so that at every node other than the source $s$ and the sink $t$, the flow in equals the flow out. Its **value** is the net flow out of $s$. Maximising the value is an LP. So is the **minimum-cost flow** problem, which ships given supplies to given demands at least cost, and which includes transportation, assignment and shortest-path problems as special cases.

An **$s$-$t$ cut** is a set $S$ of nodes containing $s$ but not $t$. Its capacity is the total capacity of arcs leaving $S$. Every unit of flow must cross from $S$ to its complement, so **every flow value is at most every cut capacity**. This is weak duality, in graph form.

**Max-flow min-cut theorem.** The maximum flow value equals the minimum cut capacity.

*Proof by augmenting paths.* Given a flow, the **residual network** has an arc $i \\to j$ wherever more flow can be pushed from $i$ to $j$: either the arc $i \\to j$ has spare capacity, or the arc $j \\to i$ carries flow that can be cancelled. If some path from $s$ to $t$ exists in it, push flow along it, which increases the value. If none exists, let $S$ be the nodes reachable from $s$. Every arc leaving $S$ is full, and every arc entering $S$ is empty, so the flow value equals the capacity of $S$. By weak duality, both are optimal. $\\square$

With integer capacities, each augmentation adds at least 1, so the process ends, and it produces an **integer maximum flow**. That is a first sign of the integrality theme of this module. With irrational capacities, a poor choice of paths need not terminate, but choosing shortest augmenting paths (the Edmonds-Karp rule) always does.

**Worked example.** Arcs and capacities: $s \\to a$ 4, $s \\to b$ 3, $a \\to b$ 2, $a \\to t$ 2, $b \\to t$ 4. Push 2 along $s \\to a \\to t$, then 3 along $s \\to b \\to t$, then 1 along $s \\to a \\to b \\to t$. The total is 6. In the residual network, $a \\to t$ and $b \\to t$ are both full, so $t$ cannot be reached. The reachable set is $S = \\{s, a, b\\}$, whose leaving arcs $a \\to t$ and $b \\to t$ have total capacity $2 + 4 = 6$. The flow and cut match, so both are optimal. Notice that the cut $\\{s\\}$ has capacity 7, so the obvious bottleneck at the source is not the real one.

In NetworkX, \`nx.maximum_flow(G, 's', 't')\` and \`nx.minimum_cut\` read a \`capacity\` attribute on each edge, and \`nx.min_cost_flow\` handles costs and demands.`,
          resources: [
            main(mit15053, 'The lectures on network optimisation and flows.'),
            also(nxFlow, 'Maximum flow, minimum cut and minimum-cost flow functions, with examples.'),
            also(orTools, 'The network flow guides, for comparison with a dedicated solver.'),
          ],
          exercises: [
            {
              slug: 'max-flow-by-hand',
              title: 'Maximum flow by hand',
              prompt:
                'Find a maximum flow and a minimum cut by hand for arcs $s \\to a$ 5, $s \\to b$ 4, $a \\to b$ 2, $a \\to t$ 3, $b \\to t$ 5. The maximum is 8. Show the residual network at the end, and confirm with `nx.maximum_flow` and `nx.minimum_cut`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'flow-lp-dual',
              title: 'The dual of maximum flow',
              prompt:
                'Write maximum flow as an LP, and write its dual. Show that every $s$-$t$ cut gives a feasible dual solution with value equal to the cut capacity, and prove that the dual has an optimal solution of this form. Conclude that max-flow min-cut is an instance of LP strong duality.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Give each node a potential $p_v$, with $p_s = 1$ and $p_t = 0$, and each arc a variable $d_e \\geq p_i - p_j$.',
            },
            {
              slug: 'bipartite-matching-flow',
              title: 'Matchings as flows',
              prompt:
                'Model maximum matching in a bipartite graph as a maximum flow problem with unit capacities. Use it to find a maximum matching between 6 workers and 6 jobs from a compatibility table of your choice, and explain how the minimum cut gives a set of vertices covering every edge, which is König\'s theorem. Check your matching with `nx.bipartite.maximum_matching`.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why is every flow value at most every cut capacity?',
              answerOutline: 'All flow from $s$ to $t$ must cross the cut, using arcs out of $S$, whose total capacity is the cut capacity. Flow back into $S$ only lowers the net amount.',
            },
            {
              question: 'What is the residual network?',
              answerOutline: 'The arcs along which flow can still increase: forward arcs with spare capacity, and reverse arcs where existing flow can be cancelled.',
            },
            {
              question: 'Why does integer capacity give an integer maximum flow?',
              answerOutline: 'Starting from zero, each augmentation adds an integer amount, so the flow stays integral, and the final one is optimal.',
            },
          ],
          relatedLessons: ['discrete-mathematics/graphs-and-trees/paths-connectivity-and-traversal'],
        },
        {
          slug: 'total-unimodularity',
          title: 'Total unimodularity',
          summary:
            'Identify constraint matrices whose LP vertices are always integral, so that an integer problem can be solved as an LP.',
          estimatedMinutes: 120,
          objectives: [
            'Define total unimodularity',
            'Prove that totally unimodular systems with integer data have integral vertices',
            'Show that network and bipartite incidence matrices are totally unimodular',
            'Recognise when the integrality argument fails',
          ],
          concepts: [
            'Integer program and LP relaxation',
            'Totally unimodular matrix',
            'Cramer\'s rule',
            'Incidence matrix',
            'Assignment problem',
          ],
          explanation: `An **integer program** (IP) is an LP with some or all variables required to be integers. Its **LP relaxation** drops that requirement, so the relaxation's optimum bounds the IP's optimum. When the relaxation's optimal vertex happens to be integral, it solves the IP as well. **Total unimodularity** explains when that always happens.

A matrix is **totally unimodular** (TU) if every square submatrix has determinant $0$, $1$ or $-1$. In particular, every entry is $0$ or $\\pm 1$.

**Theorem.** If $A$ is TU and $b$ is an integer vector, then every vertex of $\\{x : Ax \\le b,\\ x \\ge 0\\}$ is integral.

*Proof.* The stacked matrix $[A; -I]$ is also TU, since a square submatrix using rows of $-I$ expands along those rows to $\\pm$ a smaller submatrix of $A$. A vertex is the unique solution of $Mx = d$, for some invertible square submatrix $M$ of the stacked matrix and integer $d$ taken from $b$ and 0. By Cramer's rule, each coordinate is a determinant of integers divided by $\\det M = \\pm 1$, hence an integer. $\\square$

So an LP solver that returns a vertex, as the simplex method does, also solves the IP. Interior-point methods may return a non-vertex point when the optimum is not unique.

Which matrices are TU? The most important are:

- the **node-arc incidence matrix** of a directed graph, with a $+1$ and a $-1$ in each column;
- the **incidence matrix of a bipartite graph**.

Both follow from a criterion: a 0/±1 matrix with at most two non-zeros per column is TU if its rows can be split into two groups such that, in each column with two non-zeros, entries of the same sign lie in different groups and entries of opposite sign in the same group. Induction on the size of the submatrix proves it. So all flow problems with integer data have integer optimal solutions, and so do bipartite matching, assignment and transportation problems.

**Worked example.** Assign three workers to three jobs, one each, with cost rows $(4, 2, 8)$, $(4, 3, 7)$ and $(3, 1, 6)$. Write $x_{ij} \\in \\{0, 1\\}$, with each row sum and each column sum equal to 1. The constraint matrix is the incidence matrix of the complete bipartite graph between workers and jobs, so it is TU. Solve the LP relaxation, with $0 \\le x_{ij}$ in place of $x_{ij} \\in \\{0, 1\\}$, using \`linprog\`. It returns an integral vertex: worker 1 takes job 1, worker 2 takes job 3, and worker 3 takes job 2, at cost $4 + 7 + 1 = 12$. Checking all 6 assignments confirms it.

Without TU, the relaxation can be fractional. A maximum matching in a triangle has one edge. But the LP with $x_e \\ge 0$ and $x_e + x_f \\le 1$ for edges sharing a vertex gives $x = (\\tfrac12, \\tfrac12, \\tfrac12)$ with value $1.5$. The odd cycle breaks the bipartite structure, and its incidence matrix has determinant 2.`,
          resources: [
            main(mit15083, 'The lectures on formulations, polyhedra and total unimodularity.'),
            also(mit6251, 'The lectures on network flow problems and integrality.'),
            also(linprogDoc, 'Run the assignment example, and note that `highs` returns a vertex here.'),
          ],
          exercises: [
            {
              slug: 'incidence-matrix-tu',
              title: 'Incidence matrices are totally unimodular',
              prompt:
                'Prove by induction on the size of the submatrix that the node-arc incidence matrix of a directed graph is TU. Then prove that the incidence matrix of a bipartite graph is TU. Show that the incidence matrix of a triangle is not, by finding a submatrix with determinant $\\pm 2$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'Take a square submatrix. If some column has no non-zero, the determinant is 0; if some column has one, expand along it; otherwise every column has a $+1$ and a $-1$, so the rows sum to 0.',
            },
            {
              slug: 'assignment-by-lp',
              title: 'Assignment by LP',
              prompt:
                'Solve the assignment example of the lesson with `linprog`, confirming the integral optimum 12. Then generate random $n \\times n$ cost matrices for $n = 50$ and 200, and compare `linprog`, `scipy.optimize.linear_sum_assignment` and `milp` for value and time. Report the fraction of LP runs that returned an integral solution.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'interval-scheduling-tu',
              title: 'Consecutive ones',
              prompt:
                'A matrix has the consecutive ones property if, in each column, the 1s appear in a block of consecutive rows. Prove that such 0/1 matrices are TU. Use this to show that scheduling problems where each shift covers a consecutive block of hours, with integer staffing requirements, can be solved as LPs. Solve one such problem with 8 hours and 5 shift types using `linprog`.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Multiply on the left by the matrix that subtracts each row from the next, which turns the matrix into one with at most one $+1$ and one $-1$ per column.',
            },
          ],
          selfAssessment: [
            {
              question: 'Define total unimodularity.',
              answerOutline: 'Every square submatrix has determinant $0$, $1$ or $-1$.',
            },
            {
              question: 'Why are vertices of TU systems with integer right-hand sides integral?',
              answerOutline: 'A vertex solves $Mx = d$ with $M$ an invertible submatrix, so Cramer\'s rule divides integers by $\\det M = \\pm1$.',
            },
            {
              question: 'Give an integer program whose LP relaxation has a fractional optimum.',
              answerOutline: 'Maximum matching on a triangle: the relaxation gives $\\tfrac12$ on each edge with value $1.5$, while the best matching has one edge.',
            },
          ],
        },
        {
          slug: 'branch-and-bound',
          title: 'Branch and bound',
          summary:
            'Solve integer programs by splitting on fractional variables and pruning subproblems with LP bounds.',
          estimatedMinutes: 130,
          objectives: [
            'Describe the branch and bound algorithm for integer programs',
            'Prune subproblems by bound, by infeasibility and by integrality',
            'Run branch and bound by hand on a small problem',
            'Compare search strategies and use `milp`',
          ],
          concepts: [
            'LP relaxation bound',
            'Branching on a fractional variable',
            'Incumbent',
            'Pruning rules',
            'Optimality gap',
          ],
          explanation: `Most integer programs are not TU, and integer programming in general is NP-hard. **Branch and bound** is the standard exact method, and modern solvers combine it with the cutting planes of the next lesson.

The idea for a maximisation IP is as follows. Solve the LP relaxation. If its optimum $x^*$ is integral, you are done. Otherwise, pick a variable with fractional value $x_j^* = f$, and split the problem into two subproblems, one with $x_j \\le \\lfloor f \\rfloor$ and one with $x_j \\ge \\lceil f \\rceil$. Every integer solution lies in one of them, and $x^*$ lies in neither. Repeat on each subproblem. This builds a tree.

Keep the best integer solution found so far, the **incumbent**, with value $z_{\\text{inc}}$. A node can be **pruned** without exploring below it when:
- its LP is infeasible;
- its LP optimum is integral, which may update the incumbent; or
- its LP bound is no better than $z_{\\text{inc}}$, so nothing below it can beat the incumbent. For an IP whose objective coefficients are integers, you may prune whenever $\\lfloor \\text{bound} \\rfloor \\le z_{\\text{inc}}$.

At any time, the largest bound among open nodes and the incumbent bracket the optimum. Their difference is the **optimality gap** that solvers report.

**Worked example.** Maximise $3x + 2y$ subject to $2x + 2y \\le 9$, $3x + y \\le 10$, with $x, y \\ge 0$ integers. The LP relaxation's optimum is where both constraints are tight: $x = 2.75$, $y = 1.75$, with value $11.75$. Branch on $x$.

- **Node $x \\ge 3$.** The second constraint gives $y \\le 10 - 3x \\le 1$. The LP optimum is $(3, 1)$ with value 11, which is integral, so the incumbent becomes 11, and this node is pruned.
- **Node $x \\le 2$.** The LP optimum is $x = 2$, $y = 2.5$, with value 11. Every integer point in this node has value at most $\\lfloor 11 \\rfloor = 11$, which cannot beat the incumbent, so this node is pruned by bound.

The tree has three nodes, and the optimum is $(3, 1)$ with value 11. Checking all integer points confirms this.

Three choices control performance: which fractional variable to branch on, which open node to explore next, and how to find good incumbents early. **Depth-first** search finds integer solutions quickly. **Best-bound** search explores the node with the best bound and proves optimality with fewer nodes. Solvers use mixtures of both, together with heuristics. The quality of the formulation matters most of all. A tighter relaxation, with a bound closer to the IP optimum, can reduce a tree of millions of nodes to a few. SciPy's \`milp\` calls the HiGHS branch-and-cut solver.`,
          resources: [
            main(mit15083, 'The lectures on branch and bound and on solving integer programs in practice.'),
            also(milpDoc, 'The interface to the HiGHS mixed-integer solver.'),
            also(mit15053, 'The lectures on integer programming formulations and methods.'),
          ],
          exercises: [
            {
              slug: 'knapsack-by-hand',
              title: 'Branch and bound on a knapsack',
              prompt:
                'Items have values $(10, 13, 7, 4)$ and weights $(5, 7, 4, 3)$, and capacity is 11. Each item is taken or not. Solve by branch and bound by hand, using the LP relaxation at each node, which you can solve greedily by value per unit weight. The relaxation at the root gives about $21.14$, and the optimum is 20, taking items 2 and 3. Draw the tree and state why each leaf was pruned.',
              kind: 'problem',
              difficulty: 2,
              hint: 'With bounds $0 \\leq x_j \\leq 1$, the fractional knapsack is solved by filling items in decreasing order of value per weight.',
            },
            {
              slug: 'implement-branch-and-bound',
              title: 'Implement branch and bound',
              prompt:
                'Implement branch and bound for pure integer programs in maximisation form, using `linprog` for the relaxations. Support depth-first and best-bound node selection, and the most-fractional variable rule. Test on the lesson example and the knapsack exercise, then on 20 random knapsack problems with 30 items, checking every value against `milp`. Report the average number of nodes for each strategy.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'formulation-strength',
              title: 'Formulations matter',
              prompt:
                'In a facility location model, $y_i \\in \\{0, 1\\}$ opens facility $i$ and $x_{ij} \\in [0, 1]$ is the fraction of customer $j$ served by it. Compare the aggregated constraint $\\sum_j x_{ij} \\leq n\\,y_i$ with the disaggregated constraints $x_{ij} \\leq y_i$ for every $j$. Prove that both give the same integer solutions, and that the disaggregated relaxation is contained in the aggregated one. Solve a random instance with 20 facilities and 60 customers both ways with `milp`, and compare root bounds, node counts and times.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'List the three ways to prune a node.',
              answerOutline: 'Infeasible relaxation, integral relaxation optimum, or a bound no better than the incumbent.',
            },
            {
              question: 'Why does the LP relaxation bound the IP?',
              answerOutline: 'Every integer feasible point is feasible for the relaxation, so the relaxation optimum is at least as good.',
            },
            {
              question: 'What is the optimality gap?',
              answerOutline: 'The difference between the best bound over open nodes and the incumbent value. Zero gap proves optimality.',
            },
          ],
        },
        {
          slug: 'cutting-planes',
          title: 'Cutting planes',
          summary:
            'Add valid inequalities that remove fractional points without removing any integer solution.',
          estimatedMinutes: 120,
          objectives: [
            'Define valid inequalities and the integer hull',
            'Derive Chvatal-Gomory cuts by rounding',
            'Derive a Gomory fractional cut from a simplex tableau',
            'Explain how branch and cut combines cuts with branching',
          ],
          concepts: [
            'Valid inequality',
            'Integer hull',
            'Chvatal-Gomory cut',
            'Gomory fractional cut',
            'Branch and cut',
          ],
          explanation: `The **integer hull** of an IP is the convex hull of its integer feasible points. If you knew its inequalities, the IP would be an LP. You usually do not, but you can add some of them. A **valid inequality** is one that every integer feasible point satisfies. A **cut** is a valid inequality that the current LP optimum violates. Adding it removes that fractional point and keeps every integer solution.

**Chvatal-Gomory cuts.** Take any non-negative combination of the constraints, $u^TAx \\le u^Tb$ with $u \\ge 0$. Since $x \\ge 0$, rounding the coefficients down keeps it valid: $\\sum_j \\lfloor (u^TA)_j \\rfloor x_j \\le u^Tb$. For integer $x$, the left side is an integer, so you may also round the right side down:
$$\\sum_j \\lfloor (u^TA)_j \\rfloor x_j \\le \\lfloor u^Tb \\rfloor.$$
That last rounding is where the cut comes from. Repeating the procedure with every $u$ eventually yields the integer hull, a result of Chvatal, but the number of rounds can be large.

**Worked example.** Return to the last lesson's IP: $\\max 3x + 2y$ subject to $2x + 2y \\le 9$, $3x + y \\le 10$, with integers $x, y \\ge 0$. The LP optimum is $(2.75, 1.75)$. Take $u = (\\tfrac12, 0)$, which gives $x + y \\le 4.5$, and round to get the cut $x + y \\le 4$. The fractional point has $x + y = 4.5$, so the cut removes it. Re-solving with the cut, the optimum is where $x + y = 4$ meets $3x + y = 10$, at $x = 3$, $y = 1$, with value 11. That is integral, so it solves the IP. One cut has replaced the whole branch and bound tree.

**Gomory fractional cuts** come straight from the simplex tableau. Suppose a row of an optimal tableau reads $x_i + \\sum_{j \\in N} \\bar{a}_j x_j = \\bar{b}$, with $\\bar{b}$ fractional and the sum over non-basic variables. Write $f(\\cdot)$ for the fractional part. Then for integer solutions,
$$\\sum_{j \\in N} f(\\bar{a}_j)\\, x_j \\ge f(\\bar{b})$$
is valid, and the current vertex violates it, since it has every $x_j = 0$ for $j \\in N$. Gomory proved that a careful version of this method terminates on pure integer programs. It was long thought impractical because of slow convergence and numerical trouble, but combined with branching it became central to modern solvers.

**Branch and cut** adds cuts at the nodes of the branch and bound tree. These include general cuts like Gomory's, and problem-specific families, such as subtour elimination constraints for the travelling salesman problem, which are added only when violated. The strength of a formulation, the subject of the last exercise in the previous lesson, is the same idea viewed in advance.`,
          resources: [
            main(mit15083, 'The lectures on cutting planes and on branch and cut.'),
            also(mit6251, 'The lectures on integer programming methods.'),
            also(milpDoc, 'HiGHS adds cutting planes automatically; compare its node counts with your own branch and bound.'),
          ],
          exercises: [
            {
              slug: 'chvatal-gomory-validity',
              title: 'Why rounding is valid',
              prompt:
                'Prove that every Chvatal-Gomory inequality is valid for the integer points of $\\{x \\geq 0 : Ax \\leq b\\}$. Explain which step needs $x \\geq 0$ and which needs $x$ integral. Then show that $x + y \\leq 4$ is an edge of the integer hull of the lesson example by finding two integer feasible points on it, and sketch that hull.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'gomory-cut-from-tableau',
              title: 'A Gomory cut from a tableau',
              prompt:
                'Solve the LP relaxation of the lesson example with your exact simplex code, using slacks $s_1, s_2$. From the final tableau, derive a Gomory fractional cut from the row of $x$, write it in terms of $x$ and $y$ by substituting the slacks, add it, and re-solve. Repeat until the solution is integral, and report how many cuts were needed. Prove that the Gomory cut is valid.',
              kind: 'coding',
              difficulty: 3,
              hint: 'Since all data are integers, the slacks are integers at integer points, which is what makes the fractional-part argument work.',
            },
            {
              slug: 'subtour-elimination',
              title: 'Cuts added on demand',
              prompt:
                'Formulate the travelling salesman problem for 15 random points in the plane with binary edge variables and degree-two constraints. Solve with `milp`, find the subtours in the solution, add a subtour elimination constraint for each, and repeat until you get a single tour. Report the number of rounds and cuts, and compare the tour length with a nearest-neighbour heuristic.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What is a cut?',
              answerOutline: 'A valid inequality for all integer feasible points that the current fractional LP optimum violates.',
            },
            {
              question: 'Where does a Chvatal-Gomory cut gain over the original constraints?',
              answerOutline: 'In rounding down the right-hand side, which is valid only because the left side is an integer at integer points.',
            },
            {
              question: 'Why add subtour constraints lazily instead of all at once?',
              answerOutline: 'There are exponentially many of them, and only a few are ever violated by the solutions you see.',
            },
          ],
        },
      ],
      project: {
        slug: 'integer-scheduling-model',
        title: 'An integer programming model of a real schedule',
        description: `Choose a scheduling or allocation problem you care about, such as exam timetabling, a staff rota, a sports league schedule or a course assignment, and model it as an integer program. Build realistic data, with at least 200 binary variables. Solve it with your own branch and bound, then with \`milp\`. Strengthen the formulation with valid inequalities, and measure how much each change helps. The goal is a model that someone could run on their own data, with honest notes on its limitations.`,
        deliverables: [
          'A written model: sets, parameters, variables, objective and every constraint, with the meaning of each',
          'Code that builds the model from data files and solves it with `milp`, with a readable output schedule',
          'A run of your own branch and bound on a reduced instance, checked against `milp`',
          'A table comparing the root LP bound, gap, node count and time for the basic and the strengthened formulations',
          'A one-page note on what the model leaves out and how sensitive the schedule is to the data',
        ],
        estimatedHours: 10,
        stretchGoals: ['Add soft constraints with penalties and report the trade-off curve', 'Detect infeasible data and report a small set of conflicting constraints'],
      },
    },
    {
      slug: 'unconstrained-optimisation',
      title: 'Unconstrained Non-linear Optimisation',
      description:
        'State the conditions for a local minimum of a smooth function, and minimise with gradient descent, line searches, Newton\'s method and quasi-Newton methods.',
      lessons: [
        {
          slug: 'optimality-conditions',
          title: 'Optimality conditions',
          summary:
            'Use the gradient and Hessian to find and classify local minima, and know exactly what each condition does and does not guarantee.',
          estimatedMinutes: 110,
          objectives: [
            'State and prove the first-order necessary condition',
            'State the second-order necessary and sufficient conditions',
            'Classify critical points of functions of several variables',
            'Use coercivity to guarantee that a global minimum exists',
          ],
          concepts: [
            'Local and global minimum',
            'Stationary point',
            'Hessian',
            'Second-order conditions',
            'Saddle point',
            'Coercive function',
          ],
          explanation: `Let $f : \\mathbb{R}^n \\to \\mathbb{R}$ be twice continuously differentiable. A point $x^*$ is a **local minimum** if $f(x^*) \\le f(x)$ for all $x$ near $x^*$, and a **global minimum** if this holds for all $x$.

**First-order necessary condition.** If $x^*$ is a local minimum, then $\\nabla f(x^*) = 0$.

*Proof.* For any direction $d$, the function $\\varphi(t) = f(x^* + td)$ has a local minimum at $t = 0$, so $\\varphi'(0) = \\nabla f(x^*)^Td = 0$. Take $d = -\\nabla f(x^*)$. $\\square$

**Second-order necessary condition.** If $x^*$ is a local minimum, then $\\nabla^2 f(x^*)$ is positive semidefinite.

**Second-order sufficient condition.** If $\\nabla f(x^*) = 0$ and $\\nabla^2 f(x^*)$ is positive definite, then $x^*$ is a strict local minimum.

The sufficient condition follows from Taylor's theorem: $f(x^* + d) = f(x^*) + \\tfrac12 d^T\\nabla^2 f(x^*)\\,d + o(\\|d\\|^2)$, and the quadratic term is at least $\\tfrac12\\lambda_{\\min}\\|d\\|^2$, which dominates the remainder for small $d$.

Neither condition is both necessary and sufficient. The function $x^4 + y^4$ has a global minimum at 0 with zero Hessian, so the sufficient condition fails at a genuine minimum. The function $x^3$ has zero gradient and a positive semidefinite Hessian at 0, and 0 is not a minimum. These conditions are also local. They say nothing about the global minimum unless something else, such as convexity, connects local and global.

**Worked example.** Let $f(x, y) = x^3 - 3x + y^2$. Then $\\nabla f = (3x^2 - 3,\\ 2y)$, which vanishes at $(1, 0)$ and $(-1, 0)$. The Hessian is $\\mathrm{diag}(6x, 2)$. At $(1, 0)$ it is $\\mathrm{diag}(6, 2)$, which is positive definite, so $(1, 0)$ is a strict local minimum, with value $-2$. At $(-1, 0)$ it is $\\mathrm{diag}(-6, 2)$, which is indefinite, so $(-1, 0)$ is a **saddle point**: it is a maximum along the $x$-direction and a minimum along $y$. And $(1, 0)$ is not a global minimum. Along $y = 0$, $f(x, 0) = x^3 - 3x \\to -\\infty$ as $x \\to -\\infty$, so $f$ has no global minimum at all.

When does a global minimum exist? If $f$ is continuous and **coercive**, meaning $f(x) \\to \\infty$ as $\\|x\\| \\to \\infty$, then a sublevel set $\\{x : f(x) \\le f(x_0)\\}$ is closed and bounded, so it is compact, and $f$ attains its minimum on it. The global minimum is then among the stationary points. The worked example is not coercive, which is why it fails.`,
          resources: [
            main(mit15084, 'The early lectures on optimality conditions for unconstrained problems.'),
            also(minimizeDoc, 'The general interface you will use for the rest of the course.'),
            also(bubeck, 'A modern, rigorous treatment of first-order methods, which the next lesson uses.'),
          ],
          exercises: [
            {
              slug: 'classify-critical-points',
              title: 'Classify critical points',
              prompt:
                'Find and classify every critical point of $f(x, y) = x^3 + y^3 - 3xy$. You should find a saddle at $(0, 0)$ and a strict local minimum at $(1, 1)$. Decide whether $(1, 1)$ is a global minimum, with proof. Plot contours with Matplotlib and mark both points.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'second-order-proofs',
              title: 'Prove the second-order conditions',
              prompt:
                'Prove the second-order necessary condition and the second-order sufficient condition using Taylor\'s theorem with remainder. Give an example in two variables showing that the second-order necessary condition at a stationary point does not imply a local minimum, and explain where your proof of sufficiency needs strict positivity.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the example, try $x^2 - y^4$ or $x^2 + y^3$.',
            },
            {
              slug: 'coercive-existence',
              title: 'When a minimum exists',
              prompt:
                'Prove that a continuous coercive function on $\\mathbb{R}^n$ has a global minimum. Decide which of these are coercive: $x^2 + y^2 - 10xy$; $x^4 + y^4 - 3xy$; $e^x + y^2$; $\\|Ax - b\\|^2$ for $A$ with independent columns. For each one that is not, say whether it still has a global minimum.',
              kind: 'derivation',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Is $\\nabla f(x^*) = 0$ sufficient for a local minimum?',
              answerOutline: 'No. Saddle points and maxima also have zero gradient.',
            },
            {
              question: 'Give a minimum at which the second-order sufficient condition fails.',
              answerOutline: '$x^4 + y^4$ at the origin, where the Hessian is zero.',
            },
            {
              question: 'Why does coercivity give a global minimum?',
              answerOutline: 'Sublevel sets become closed and bounded, hence compact, and a continuous function attains its minimum on a compact set.',
            },
          ],
        },
        {
          slug: 'gradient-descent-and-line-search',
          title: 'Gradient descent and line search',
          summary:
            'Minimise by stepping downhill, choose step sizes with line searches, and see how conditioning controls the speed.',
          estimatedMinutes: 130,
          objectives: [
            'State the gradient descent iteration and its convergence rates for smooth convex and strongly convex functions',
            'Prove the descent lemma',
            'Implement backtracking line search with the Armijo condition',
            'Explain the zigzag behaviour of steepest descent on ill-conditioned problems',
          ],
          concepts: [
            'Descent direction',
            'Lipschitz gradient',
            'Strong convexity and condition number',
            'Exact line search',
            'Armijo condition and backtracking',
          ],
          explanation: `**Gradient descent** sets $x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)$. The negative gradient is the direction of steepest local decrease, and any direction $d$ with $\\nabla f(x)^Td < 0$ is a **descent direction**.

How large a step? Suppose $\\nabla f$ is **$L$-Lipschitz**, so that $\\|\\nabla f(x) - \\nabla f(y)\\| \\le L\\|x - y\\|$. Then the **descent lemma** says $f(y) \\le f(x) + \\nabla f(x)^T(y - x) + \\tfrac{L}{2}\\|y - x\\|^2$. With $\\alpha = 1/L$, this gives
$$f(x_{k+1}) \\le f(x_k) - \\tfrac{1}{2L}\\|\\nabla f(x_k)\\|^2,$$
so every step makes progress. For convex $f$, it gives $f(x_k) - f^* \\le L\\|x_0 - x^*\\|^2 / (2k)$. If $f$ is also **$m$-strongly convex**, meaning $\\nabla^2 f \\succeq mI$ for twice-differentiable $f$, then
$$f(x_k) - f^* \\le (1 - m/L)^k\\,(f(x_0) - f^*).$$
The ratio $\\kappa = L/m$ is the **condition number**. When it is large, progress is slow.

**Worked example.** Let $f(x, y) = \\tfrac12(x^2 + 10y^2)$, so $\\nabla f = (x, 10y)$, $m = 1$, $L = 10$ and $\\kappa = 10$. With the fixed step $1/L = 0.1$ from $(10, 1)$, one step gives $(10 - 1,\\ 1 - 1) = (9, 0)$. The steep $y$-direction is solved at once, but $x$ shrinks only by a factor $0.9$ per step, which is $1 - 1/\\kappa$. Now use **exact line search**, which chooses $\\alpha$ to minimise $f$ along the ray. For a quadratic $\\tfrac12 x^THx$ with gradient $g$, this gives $\\alpha = g^Tg / g^THg$. At $(10, 1)$, $g = (10, 10)$, so $\\alpha = 200/1100 = 2/11$, and the next point is
$$(10, 1) - \\tfrac{2}{11}(10, 10) = \\left(\\tfrac{90}{11}, -\\tfrac{9}{11}\\right) = \\tfrac{9}{11}(10, -1).$$
The iterate is the start scaled by $9/11$ and reflected in $y$. Each later step repeats the pattern, zigzagging across the valley, and $f$ falls by exactly $(9/11)^2 = ((\\kappa - 1)/(\\kappa + 1))^2 \\approx 0.67$ per step. That is the worst case for steepest descent, attained here.

Exact line searches are rarely affordable. **Backtracking** starts with $\\alpha = 1$ and halves it until the **Armijo condition** holds:
$$f(x + \\alpha d) \\le f(x) + c\\,\\alpha\\,\\nabla f(x)^Td, \\qquad 0 < c < 1,$$
with $c = 10^{-4}$ a common choice. For a descent direction, this holds for all small $\\alpha$, so the loop ends. It ensures sufficient decrease without your having to know $L$. Wolfe conditions add a curvature requirement, which quasi-Newton methods need. Rescaling variables so that the Hessian is closer to a multiple of $I$ helps every first-order method, which is why preconditioning matters.`,
          resources: [
            main(bubeck, 'The chapters on smooth and strongly convex optimisation give the rates and their proofs.'),
            also(mit15084, 'The lectures on steepest descent and line searches.'),
            also(minimizeDoc, 'See the line-search-based methods and their options.'),
          ],
          exercises: [
            {
              slug: 'zigzag-on-a-quadratic',
              title: 'Zigzag on a quadratic',
              prompt:
                'Implement steepest descent with exact line search for $\\tfrac12 x^THx$. Run it from $(10, 1)$ on $H = \\mathrm{diag}(1, 10)$ and confirm the iterates $\\left(\\tfrac{9}{11}\\right)^k(10, (-1)^k)$. Then repeat with $\\mathrm{diag}(1, 100)$ from $(100, 1)$, predict the factor $((\\kappa - 1)/(\\kappa + 1))^2$ by which $f$ falls per step, and measure it. Plot the iterates on the contours.',
              kind: 'coding',
              difficulty: 1,
            },
            {
              slug: 'descent-lemma-proof',
              title: 'Prove the descent lemma',
              prompt:
                'Prove the descent lemma for $f$ with $L$-Lipschitz gradient, using $f(y) - f(x) = \\int_0^1 \\nabla f(x + t(y - x))^T(y - x)\\,dt$. Deduce that gradient descent with step $1/L$ never increases $f$, and that $\\min_{k < K}\\|\\nabla f(x_k)\\|^2 \\leq 2L(f(x_0) - f^*)/K$ even without convexity.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'backtracking-on-rosenbrock',
              title: 'Backtracking on Rosenbrock',
              prompt:
                'Implement gradient descent with Armijo backtracking ($c = 10^{-4}$, halving). Run it on the Rosenbrock function $(1 - x)^2 + 100(y - x^2)^2$ from $(-1.2, 1)$ until $\\|\\nabla f\\| < 10^{-6}$ or 50,000 iterations. Report the iteration count and the final point, plot $f$ against iteration on a log scale, and explain the slow progress using the condition number of the Hessian at $(1, 1)$.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'What step size does the descent lemma suggest, and what does it guarantee?',
              answerOutline: '$1/L$. Each step lowers $f$ by at least $\\|\\nabla f\\|^2/(2L)$.',
            },
            {
              question: 'How does the condition number affect gradient descent on a strongly convex function?',
              answerOutline: 'The error contracts by about $1 - 1/\\kappa$ per step, so iterations grow roughly in proportion to $\\kappa$.',
            },
            {
              question: 'What does the Armijo condition require?',
              answerOutline: 'That the actual decrease be at least a fraction $c$ of the decrease predicted by the linear model, $c\\alpha\\nabla f^Td$.',
            },
          ],
        },
        {
          slug: 'newton-and-quasi-newton',
          title: 'Newton and quasi-Newton methods',
          summary:
            'Use second-order information for fast local convergence, and approximate it cheaply with BFGS.',
          estimatedMinutes: 130,
          objectives: [
            'Derive Newton\'s method from a quadratic model',
            'State its local quadratic convergence and its hypotheses',
            'Make Newton\'s method robust with damping and Hessian modification',
            'Explain the BFGS update and use quasi-Newton methods in SciPy',
          ],
          concepts: [
            'Newton step',
            'Quadratic convergence',
            'Damped Newton method',
            'Secant condition',
            'BFGS update',
          ],
          explanation: `**Newton's method** minimises the quadratic model of $f$ at the current point. Setting the gradient of $f(x_k) + g^Td + \\tfrac12 d^THd$ to zero, with $g = \\nabla f(x_k)$ and $H = \\nabla^2 f(x_k)$, gives the step
$$H d = -g, \\qquad x_{k+1} = x_k + d.$$
It is unchanged by a linear change of variables, so poor scaling does not slow it down. On a quadratic with positive definite Hessian, it finds the minimum in one step.

**Local convergence.** Suppose $\\nabla^2 f$ is Lipschitz near a point $x^*$ with $\\nabla f(x^*) = 0$ and $\\nabla^2 f(x^*)$ positive definite. Then, for $x_0$ close enough to $x^*$, Newton's method converges **quadratically**: $\\|x_{k+1} - x^*\\| \\le C\\|x_k - x^*\\|^2$. The number of correct digits roughly doubles each step.

Every hypothesis matters. Far from $x^*$, the Hessian may not be positive definite, so $d$ may not be a descent direction. The method seeks stationary points, and will happily converge to a saddle or maximum. Each step needs second derivatives and a linear solve.

**Worked example.** Minimise $f(x) = x - \\ln x$ for $x > 0$, whose minimum is at $x = 1$. Here $f'(x) = 1 - 1/x$ and $f''(x) = 1/x^2$, so the Newton step is
$$x_{k+1} = x_k - \\frac{1 - 1/x_k}{1/x_k^2} = 2x_k - x_k^2.$$
Then $1 - x_{k+1} = (1 - x_k)^2$ exactly: the error squares each step. From $x_0 = 0.5$, the iterates are $0.75$, $0.9375$, $0.99609$, $0.9999847$, with errors $0.25$, $0.0625$, $0.0039$, $1.5 \\times 10^{-5}$. But from $x_0 = 3$, the step gives $x_1 = 6 - 9 = -3$, outside the domain. That is the local nature of the theorem in action.

**Making it robust.** Use the Newton direction with a backtracking line search (the **damped** Newton method). Where the Hessian is not positive definite, modify it, for example by adding $\\tau I$ with $\\tau$ large enough for a Cholesky factorisation to succeed. Trust-region methods instead minimise the model within a ball, whose radius adapts to how well the model predicts.

**Quasi-Newton methods** avoid second derivatives. They keep an approximation $B_k$ of the Hessian and update it so that it satisfies the **secant condition** $B_{k+1}s_k = y_k$, where $s_k = x_{k+1} - x_k$ and $y_k = \\nabla f(x_{k+1}) - \\nabla f(x_k)$. The **BFGS** update is a rank-two correction that keeps $B_k$ positive definite whenever $y_k^Ts_k > 0$, which a Wolfe line search guarantees. BFGS converges superlinearly near a non-degenerate minimum, at the cost of gradients only. L-BFGS keeps only a few recent pairs $(s_k, y_k)$, so it scales to millions of variables. In SciPy, \`minimize(f, x0, method='BFGS', jac=grad)\` is a good default for smooth problems of moderate size.`,
          resources: [
            main(mit15084, 'The lectures on Newton\'s method and on quasi-Newton methods.'),
            also(minimizeDoc, 'Compare `BFGS`, `L-BFGS-B`, `Newton-CG` and `trust-exact`.'),
            also(scipyOpt, 'The overview of SciPy\'s optimisation routines and test functions such as `rosen`.'),
          ],
          exercises: [
            {
              slug: 'newton-one-dimension',
              title: 'Newton\'s method in one dimension',
              prompt:
                'Verify the formula $1 - x_{k+1} = (1 - x_k)^2$ for $f(x) = x - \\ln x$, and find exactly which starting points $x_0 > 0$ converge to 1. Then prove local quadratic convergence of Newton\'s method in one dimension for $f\'\'$ Lipschitz and $f\'\'(x^*) > 0$, using Taylor\'s theorem on $f\'$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'The recurrence for the error $e_k = 1 - x_k$ is $e_{k+1} = e_k^2$, and $x_k > 0$ requires $|e_k| < 1$.',
            },
            {
              slug: 'methods-on-rosenbrock',
              title: 'Compare methods on Rosenbrock',
              prompt:
                'Implement damped Newton with backtracking and a Hessian shift $\\tau I$ when Cholesky fails, and BFGS with a backtracking line search that skips the update when $y_k^Ts_k \\leq 0$. Run both, and your gradient descent, on the Rosenbrock function from $(-1.2, 1)$. Tabulate iterations, function and gradient evaluations, and final error, and compare with SciPy\'s `BFGS` and `Newton-CG`. Plot $\\|x_k - (1, 1)\\|$ on a log scale to show linear, superlinear and quadratic convergence.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'secant-and-positivity',
              title: 'Why BFGS stays positive definite',
              prompt:
                'Write the BFGS update for $B_{k+1}$. Show that it satisfies the secant condition, and prove that if $B_k$ is positive definite and $y_k^Ts_k > 0$ then $B_{k+1}$ is positive definite. Show that $y_k^Ts_k > 0$ holds automatically when $f$ is strongly convex.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Write $B_{k+1} = B_k - \\frac{B_ks_ks_k^TB_k}{s_k^TB_ks_k} + \\frac{y_ky_k^T}{y_k^Ts_k}$, and test $v^TB_{k+1}v$ using Cauchy-Schwarz in the inner product defined by $B_k$.',
            },
          ],
          selfAssessment: [
            {
              question: 'What are the hypotheses of the local quadratic convergence theorem?',
              answerOutline: 'A stationary point with positive definite Hessian, a Lipschitz Hessian nearby, and a start close enough.',
            },
            {
              question: 'Why can pure Newton fail far from the solution?',
              answerOutline: 'The Hessian may be indefinite, so the step may go uphill or towards a saddle. Steps may also overshoot or leave the domain.',
            },
            {
              question: 'What is the secant condition, and why is it natural?',
              answerOutline: '$B_{k+1}s_k = y_k$. The true Hessian approximately maps the step to the change in gradient.',
            },
          ],
        },
      ],
      project: {
        slug: 'unconstrained-optimiser-library',
        title: 'An unconstrained optimisation library',
        description: `Write a small, well-tested library of unconstrained optimisation methods in NumPy, and benchmark it honestly. Include gradient descent with backtracking, a Nesterov accelerated gradient method, damped Newton with Hessian modification, and BFGS with a line search satisfying the Wolfe conditions. Provide a common interface and a log of each run. Benchmark on a suite of test functions with known minima, including Rosenbrock in several dimensions, ill-conditioned quadratics and a logistic regression objective on real data, and present the results as performance profiles.`,
        deliverables: [
          'A package with a common `minimise(f, grad, x0, method, **options)` interface and per-iteration logs',
          'Unit tests checking each method on quadratics where the answer is exact, including a test that Newton solves them in one step',
          'A benchmark of at least 10 test problems, with iterations, evaluations, time and final accuracy for each method and for SciPy\'s equivalents',
          'Performance profile plots and convergence plots on a log scale',
          'A two-page report explaining the results in terms of the convergence theory and condition numbers',
        ],
        estimatedHours: 10,
        stretchGoals: ['Add L-BFGS and test it on a problem with 100,000 variables', 'Add a trust-region Newton method and compare its robustness from bad starting points'],
      },
    },
    {
      slug: 'constrained-optimisation',
      title: 'Constrained Non-linear Optimisation',
      description:
        'Handle equality and inequality constraints with Lagrange multipliers and the Karush-Kuhn-Tucker theorem, then solve constrained problems with penalty and barrier methods.',
      lessons: [
        {
          slug: 'lagrange-multipliers',
          title: 'Lagrange multipliers',
          summary:
            'Find constrained optima with equality constraints, interpret the multipliers, and see what goes wrong without a constraint qualification.',
          estimatedMinutes: 120,
          objectives: [
            'State the Lagrange multiplier theorem with its regularity hypothesis',
            'Solve equality-constrained problems by the Lagrange conditions',
            'Interpret a multiplier as the sensitivity of the optimal value',
            'Recognise failure of the constraint qualification',
          ],
          concepts: [
            'Lagrangian',
            'Lagrange multiplier',
            'Regular point',
            'Linear independence constraint qualification',
            'Sensitivity interpretation',
          ],
          explanation: `Consider minimising $f(x)$ subject to $h_i(x) = 0$ for $i = 1, \\dots, m$, with all functions continuously differentiable. At a constrained minimum, $f$ cannot decrease along any direction that keeps you on the constraint surface, to first order. Those directions are the ones perpendicular to every $\\nabla h_i$. So $\\nabla f$ must lie in the span of the constraint gradients.

**Theorem (Lagrange).** Let $x^*$ be a local minimum, and suppose the gradients $\\nabla h_1(x^*), \\dots, \\nabla h_m(x^*)$ are linearly independent. Then there are multipliers $\\lambda_i$ with
$$\\nabla f(x^*) + \\sum_i \\lambda_i \\nabla h_i(x^*) = 0.$$
The independence hypothesis is the **linear independence constraint qualification** (LICQ), and a point where it holds is **regular**. With the **Lagrangian** $L(x, \\lambda) = f(x) + \\sum_i \\lambda_i h_i(x)$, the conditions say that $\\nabla_x L = 0$ and $h(x) = 0$. Sign conventions differ between books, so check them.

**Worked example.** Minimise $x^2 + y^2$ subject to $x + 2y = b$, with $b = 5$. Write $h = x + 2y - 5$. The conditions are $2x + \\lambda = 0$, $2y + 2\\lambda = 0$, and the constraint. The first two give $y = 2x$, so $5x = 5$, and $x = 1$, $y = 2$, $\\lambda = -2$. The minimum value is 5, the squared distance from the origin to the line. The constraint gradient $(1, 2)$ is non-zero, so the point is regular. Now let $b$ vary. The minimiser is $(b/5, 2b/5)$, and the value is $f^*(b) = b^2/5$, so $df^*/db = 2b/5 = 2$ at $b = 5$. That is $-\\lambda$. In general, for $h(x) = g(x) - b$, the multiplier measures the rate of change of the optimal value with the constraint level: the same idea as a shadow price.

**When the qualification fails.** Minimise $x$ subject to $y^2 - x^3 = 0$. The feasible set is the cusp $x = |y|^{2/3}$, so $x \\ge 0$ and the minimum is at the origin. But the constraint gradient $(-3x^2, 2y)$ is zero there, and $\\nabla f = (1, 0)$ is not a multiple of it. No multiplier exists. The theorem is not contradicted, because its hypothesis fails. The lesson is to check regularity rather than trust that solving the Lagrange equations finds every candidate. Points where the constraint qualification fails must be examined separately.

The Lagrange conditions are necessary only. To confirm a minimum, check second-order conditions on the tangent space: the Hessian of the Lagrangian must be positive definite on the directions $d$ with $\\nabla h_i^Td = 0$. Or use convexity, as the next lessons do. Or, for a coercive problem, compare all candidates.`,
          resources: [
            main(mit15084, 'The lectures on optimality conditions for equality-constrained problems.'),
            also(mit6253, 'The lectures on Lagrange multipliers and their geometric meaning.'),
            also(minimizeDoc, 'See how to pass equality constraints to the `SLSQP` and `trust-constr` methods.'),
          ],
          exercises: [
            {
              slug: 'lagrange-by-hand',
              title: 'Lagrange conditions by hand',
              prompt:
                'Maximise $xyz$ subject to $x + 2y + 3z = 6$ with $x, y, z > 0$. Use the Lagrange conditions to show that the maximiser is $(2, 1, 2/3)$ with value $4/3$. Explain how you know it is a maximum, given that the open feasible region is not compact. Confirm with `minimize` using `SLSQP`.',
              kind: 'problem',
              difficulty: 1,
            },
            {
              slug: 'multiplier-sensitivity',
              title: 'Multipliers as sensitivities',
              prompt:
                'For the problem $\\min f(x)$ subject to $g(x) = b$, assume that the minimiser $x^*(b)$ and multiplier depend smoothly on $b$, with $x^*$ regular. Differentiate $f(x^*(b))$ with respect to $b$ and use the Lagrange condition to show that the derivative equals the multiplier, up to the sign convention. Check the claim numerically on the worked example with central differences.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'tangent-space-second-order',
              title: 'Second-order conditions on the tangent space',
              prompt:
                'Find all points satisfying the Lagrange conditions for $f(x, y) = x^2 - y^2$ on the unit circle. Classify each as a constrained local minimum or maximum by testing the Hessian of the Lagrangian on the tangent space. Explain why the unconstrained Hessian of $f$, which is indefinite everywhere, gives the wrong answer.',
              kind: 'problem',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'Why must $\\nabla f$ lie in the span of the constraint gradients at a regular minimum?',
              answerOutline: 'Otherwise some direction tangent to the constraint surface has $\\nabla f^Td < 0$, which decreases $f$ while staying feasible to first order.',
            },
            {
              question: 'What can go wrong if the constraint gradients are dependent?',
              answerOutline: 'A minimum may have no multipliers, as at the cusp of $y^2 = x^3$, so solving the Lagrange equations misses it.',
            },
            {
              question: 'What does a multiplier measure?',
              answerOutline: 'The rate of change of the optimal value as the constraint level changes, up to sign.',
            },
          ],
        },
        {
          slug: 'kkt-conditions',
          title: 'The Karush-Kuhn-Tucker theorem',
          summary:
            'Extend Lagrange multipliers to inequality constraints, with signs and complementary slackness, and learn when the conditions are necessary and when they are sufficient.',
          estimatedMinutes: 140,
          objectives: [
            'State the KKT conditions for problems with inequality and equality constraints',
            'Solve small problems by considering which constraints are active',
            'State constraint qualifications under which KKT is necessary',
            'Prove that KKT is sufficient for convex problems',
          ],
          concepts: [
            'Active constraint',
            'KKT conditions',
            'Dual feasibility of multipliers',
            'Complementary slackness',
            'Slater\'s condition',
            'Sufficiency under convexity',
          ],
          explanation: `Consider minimising $f(x)$ subject to $g_i(x) \\le 0$ for $i = 1, \\dots, m$ and $h_j(x) = 0$, all continuously differentiable. A constraint $g_i$ is **active** at $x$ if $g_i(x) = 0$.

The **Karush-Kuhn-Tucker (KKT) conditions** at $x^*$ ask for multipliers $\\mu_i$ and $\\lambda_j$ with:
1. **stationarity:** $\\nabla f(x^*) + \\sum_i \\mu_i \\nabla g_i(x^*) + \\sum_j \\lambda_j \\nabla h_j(x^*) = 0$;
2. **primal feasibility:** $g_i(x^*) \\le 0$ and $h_j(x^*) = 0$;
3. **dual feasibility:** $\\mu_i \\ge 0$;
4. **complementary slackness:** $\\mu_i g_i(x^*) = 0$ for each $i$.

The sign condition says that at a minimum, $-\\nabla f$ must point *out of* the feasible set, into the region where active constraints would be violated. Complementary slackness says that inactive constraints have zero multipliers. For an LP, these are exactly the conditions of the duality module.

**When KKT is necessary.** If $x^*$ is a local minimum at which a **constraint qualification** holds, then multipliers exist. Two common ones are LICQ, meaning that the gradients of the active constraints are independent, and, for a convex problem, **Slater's condition**: some point satisfies every inequality strictly and every equality. Without a constraint qualification, a minimum need not satisfy KKT, as the cusp of the last lesson shows.

**When KKT is sufficient.** If $f$ and each $g_i$ are convex and each $h_j$ is affine, then any KKT point is a global minimum.

*Proof.* For feasible $x$, convexity gives $f(x) \\ge f(x^*) + \\nabla f(x^*)^T(x - x^*)$. Stationarity turns the last term into $-\\sum \\mu_i \\nabla g_i(x^*)^T(x - x^*)$, since the equality terms vanish for affine $h_j$ between feasible points. By convexity, $\\nabla g_i(x^*)^T(x - x^*) \\le g_i(x) - g_i(x^*)$, and with $\\mu_i \\ge 0$ and complementary slackness, the result is at least $-\\sum_i \\mu_i g_i(x) \\ge 0$. So $f(x) \\ge f(x^*)$. $\\square$

**Worked example.** Find the closest point to $(2, 1)$ in the triangle $x + y \\le 2$, $x \\ge 0$, $y \\ge 0$. Minimise $(x - 2)^2 + (y - 1)^2$. The point $(2, 1)$ violates $x + y \\le 2$, so guess that this constraint alone is active, with $g = x + y - 2$. Stationarity gives $2(x - 2) + \\mu = 0$ and $2(y - 1) + \\mu = 0$, so $x - 2 = y - 1$. With $x + y = 2$, this gives $x = 1.5$, $y = 0.5$ and $\\mu = 1$. Check every condition: $\\mu \\ge 0$; the point is feasible, with $x, y > 0$, so the multipliers of the inactive bounds are 0. The problem is convex, so this KKT point is the global minimum. If a guessed active set gives a negative multiplier, that constraint should not be active. Drop it and try again. **Active-set methods** do exactly that.`,
          resources: [
            main(mit15084, 'The lectures on the KKT conditions and constraint qualifications.'),
            also(ee364a, 'The lectures on duality and on optimality conditions for convex problems.'),
            also(minimizeDoc, 'Solve inequality-constrained problems with `SLSQP` and check the multipliers it implies.'),
          ],
          exercises: [
            {
              slug: 'kkt-by-active-sets',
              title: 'Solve by active sets',
              prompt:
                'Minimise $-x - y$ subject to $x^2 + y^2 \\leq 1$. Show that the KKT point is $(1/\\sqrt{2}, 1/\\sqrt{2})$ with multiplier $1/\\sqrt{2}$, and explain why it is the global minimum. Then minimise $(x - 3)^2 + (y - 2)^2$ subject to $x + y \\leq 2$, $x \\leq 1$, $y \\geq 0$, trying active sets until all KKT conditions hold. Confirm with `minimize`.',
              kind: 'problem',
              difficulty: 2,
            },
            {
              slug: 'kkt-not-sufficient',
              title: 'KKT without convexity',
              prompt:
                'Minimise $-(x^2 + y^2)$ subject to $x + y \\leq 1$, $x \\geq 0$, $y \\geq 0$. Find all KKT points. Show that one of them is a global maximum of the objective on the feasible set, which proves KKT is not sufficient without convexity. Find the true minima.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'kkt-from-farkas',
              title: 'Derive KKT from Farkas',
              prompt:
                'Let $x^*$ be a local minimum of $f$ subject to $g_i(x) \\leq 0$, with LICQ at $x^*$. Prove that there is no direction $d$ with $\\nabla f(x^*)^Td < 0$ and $\\nabla g_i(x^*)^Td < 0$ for every active $i$. Then apply a theorem of the alternative, a form of the Farkas lemma, to obtain non-negative multipliers. Explain where LICQ is used.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Gordan\'s theorem: exactly one of $Ad < 0$ has a solution, or $A^Ty = 0$ has a non-zero solution with $y \\geq 0$.',
            },
          ],
          selfAssessment: [
            {
              question: 'List the four KKT conditions.',
              answerOutline: 'Stationarity, primal feasibility, non-negative inequality multipliers, and complementary slackness $\\mu_i g_i = 0$.',
            },
            {
              question: 'When are KKT conditions sufficient for a global minimum?',
              answerOutline: 'When $f$ and the $g_i$ are convex and the $h_j$ affine.',
            },
            {
              question: 'What does a negative multiplier for a guessed active constraint tell you?',
              answerOutline: 'That constraint should not be active: relaxing it would improve the objective.',
            },
          ],
        },
        {
          slug: 'penalty-and-barrier-methods',
          title: 'Penalty and barrier methods',
          summary:
            'Turn constrained problems into sequences of unconstrained ones, and see how multipliers emerge in the limit.',
          estimatedMinutes: 120,
          objectives: [
            'Apply a quadratic penalty method and analyse its convergence',
            'Recover multiplier estimates from penalty solutions',
            'Apply a logarithmic barrier method and describe the central path',
            'Explain ill-conditioning and how augmented Lagrangian methods avoid it',
          ],
          concepts: [
            'Quadratic penalty',
            'Exact penalty',
            'Augmented Lagrangian',
            'Logarithmic barrier',
            'Central path',
          ],
          explanation: `Unconstrained methods are well developed, so a natural idea is to solve a constrained problem through a sequence of unconstrained ones.

**Quadratic penalty.** For $\\min f(x)$ subject to $h(x) = 0$, minimise
$$P_\\rho(x) = f(x) + \\tfrac{\\rho}{2}\\|h(x)\\|^2$$
for an increasing sequence of $\\rho$. Each minimiser $x_\\rho$ is generally infeasible, but $h(x_\\rho) \\to 0$, and under mild assumptions, limit points solve the original problem. Setting $\\nabla P_\\rho = 0$ gives $\\nabla f + \\rho h(x_\\rho)\\nabla h = 0$, so $\\rho h(x_\\rho)$ estimates the multiplier.

**Worked example.** Return to $\\min x^2 + y^2$ subject to $x + 2y = 5$, where $(1, 2)$ with $\\lambda = -2$ is the solution in the convention $\\nabla f + \\lambda\\nabla h = 0$. With $h = x + 2y - 5$, the stationarity conditions of $P_\\rho$ are $2x + \\rho h = 0$ and $2y + 2\\rho h = 0$. So $y = 2x$, and $h = 5x - 5$. Then $2x + \\rho(5x - 5) = 0$ gives
$$x_\\rho = \\frac{5\\rho}{2 + 5\\rho}, \\qquad h(x_\\rho) = -\\frac{10}{2 + 5\\rho}.$$
As $\\rho \\to \\infty$, $x_\\rho \\to 1$ and the violation goes to zero like $1/\\rho$. Meanwhile $\\rho h(x_\\rho) \\to -2 = \\lambda$, the multiplier.

The cost is **ill-conditioning**. The Hessian of $P_\\rho$ has an eigenvalue of order $\\rho$, in the direction of $\\nabla h$, and the others are of order 1. So for large $\\rho$, the unconstrained problems become hard to solve accurately. The **augmented Lagrangian** method fixes this by minimising $f + \\lambda^Th + \\tfrac{\\rho}{2}\\|h\\|^2$ and updating $\\lambda \\leftarrow \\lambda + \\rho h(x)$. It converges with $\\rho$ kept moderate, because the multiplier term does the work. An **exact penalty** with $\\rho\\|h\\|_1$ also needs only finite $\\rho$, at the cost of non-smoothness.

**Barrier methods** work from inside the feasible region of inequality constraints $g_i(x) \\le 0$. Minimise
$$B_\\mu(x) = f(x) - \\mu\\sum_i \\ln(-g_i(x))$$
over the strictly feasible points, for $\\mu$ decreasing to 0. The barrier tends to infinity at the boundary, so the iterates stay feasible. For $\\min x$ subject to $x \\ge 1$, the barrier problem $\\min x - \\mu\\ln(x - 1)$ has stationarity $1 - \\mu/(x - 1) = 0$, so $x_\\mu = 1 + \\mu$, which tends to the solution 1. Here $\\mu/(x_\\mu - 1) = 1$ estimates the multiplier.

The curve of minimisers $x_\\mu$ is the **central path**. For linear programs, it leads to an optimal vertex, and following it with Newton steps is the basis of **interior-point methods**. Their stationarity conditions are exactly the KKT conditions, with complementary slackness relaxed to $\\mu_i(-g_i) = \\mu$. These methods solve large LPs in a few dozen Newton steps, and the capstone builds one.`,
          resources: [
            main(mit15084, 'The lectures on penalty, barrier and augmented Lagrangian methods.'),
            also(ee364a, 'The lectures on interior-point methods and the central path.'),
            also(minimizeDoc, 'The `trust-constr` method combines barrier and trust-region ideas; compare it with your own code.'),
          ],
          exercises: [
            {
              slug: 'penalty-in-code',
              title: 'Quadratic penalty in code',
              prompt:
                'Implement the quadratic penalty method for the worked example, minimising $P_\\rho$ with BFGS for $\\rho = 1, 10, \\dots, 10^8$. Tabulate $x_\\rho$, the violation, the multiplier estimate $\\rho h(x_\\rho)$ and the condition number of the Hessian of $P_\\rho$, and compare with the formulas of the lesson. Then implement the augmented Lagrangian method with $\\rho = 10$, and show that it reaches the same accuracy with a well-conditioned subproblem.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'barrier-for-an-lp',
              title: 'A barrier method for a small LP',
              prompt:
                'Solve the bakery LP by a log-barrier method: minimise $-(4b + 3c) - \\mu\\sum_i \\ln(\\text{slack}_i)$, including the bounds $b, c \\geq 0$, with damped Newton steps for $\\mu = 10, 1, 0.1, \\dots, 10^{-6}$, warm-starting each solve. Plot the central path in the plane, show that it approaches $(3, 4)$, and check that $\\mu$ divided by each slack approaches the dual values $(1, 2, 0)$ for the three resource constraints.',
              kind: 'coding',
              difficulty: 3,
            },
            {
              slug: 'penalty-convergence-proof',
              title: 'Why the penalty method converges',
              prompt:
                'Let $f$ be continuous and coercive, $h$ continuous, and the feasible set non-empty. Let $x_k$ minimise $P_{\\rho_k}$ with $\\rho_k \\to \\infty$. Prove that the $x_k$ are bounded, and that every limit point is feasible and is a global minimiser of the constrained problem.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'Compare $P_{\\rho_k}(x_k)$ with $P_{\\rho_k}(\\bar{x})$ for a feasible minimiser $\\bar{x}$.',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you estimate the multiplier from the quadratic penalty method?',
              answerOutline: 'By $\\rho h(x_\\rho)$, which converges to $\\lambda$ in the convention $\\nabla f + \\lambda\\nabla h = 0$.',
            },
            {
              question: 'Why does a large penalty parameter cause numerical trouble?',
              answerOutline: 'The Hessian of the penalised function has eigenvalues of order $\\rho$ and of order 1, so its condition number grows like $\\rho$.',
            },
            {
              question: 'What is the central path?',
              answerOutline: 'The curve of barrier minimisers $x_\\mu$ as $\\mu \\to 0$, along which the KKT conditions hold with complementarity relaxed to $\\mu$.',
            },
          ],
        },
      ],
    },
    {
      slug: 'convex-programming',
      title: 'Convex Programming',
      description:
        'Recognise convex sets, functions and problems, develop Lagrangian duality in general, and apply it to problems from machine learning.',
      lessons: [
        {
          slug: 'convex-sets-and-functions',
          title: 'Convex sets and functions',
          summary:
            'Define convexity, test for it with derivatives, build convex functions from simpler ones, and prove that local minima are global.',
          estimatedMinutes: 120,
          objectives: [
            'Define convex sets and functions, and give the main examples',
            'Use the first- and second-order characterisations of convexity',
            'Show convexity using operations that preserve it',
            'Prove that every local minimum of a convex problem is global',
          ],
          concepts: [
            'Convex set',
            'Convex function and epigraph',
            'First-order characterisation',
            'Hessian test',
            'Operations preserving convexity',
            'Convex optimisation problem',
          ],
          explanation: `A set $C$ is **convex** if it contains the segment between any two of its points. Examples are half-spaces, polyhedra, balls, ellipsoids and the positive semidefinite matrices. Intersections of convex sets are convex. A function $f$ on a convex set is **convex** if
$$f(\\theta x + (1 - \\theta)y) \\le \\theta f(x) + (1 - \\theta)f(y) \\qquad \\text{for } 0 \\le \\theta \\le 1,$$
which says that the chord lies above the graph. Equivalently, its epigraph, the region above the graph, is a convex set.

For differentiable $f$ on an open convex set, convexity is equivalent to the **first-order condition**
$$f(y) \\ge f(x) + \\nabla f(x)^T(y - x) \\quad \\text{for all } x, y:$$
every tangent plane lies below the graph. For twice-differentiable $f$, it is equivalent to $\\nabla^2 f(x) \\succeq 0$ everywhere. A positive definite Hessian gives strict convexity, but the converse fails: $x^4$ is strictly convex with $f''(0) = 0$.

Hessians are often not the quickest test. Convexity is preserved by non-negative weighted sums, by composition with an affine map $x \\mapsto Ax + b$, and by pointwise maxima of convex functions. These rules show that norms, $\\|Ax - b\\|^2$, $\\max_i(a_i^Tx + b_i)$ and $-\\ln x$ are convex, and that the logistic loss $\\ln(1 + e^{-y\\,w^Tx})$ is convex in $w$.

**Worked example.** Show that $f(x, y) = x^2/y$ is convex on $y > 0$. Its Hessian is
$$\\nabla^2 f = \\frac{2}{y^3}\\begin{bmatrix} y^2 & -xy \\\\ -xy & x^2 \\end{bmatrix} = \\frac{2}{y^3}\\begin{bmatrix} y \\\\ -x \\end{bmatrix}\\begin{bmatrix} y & -x \\end{bmatrix}.$$
This is $2/y^3 > 0$ times an outer product $vv^T$, so it is positive semidefinite, with determinant 0. So $f$ is convex but not strictly convex: it is constant along rays $(x, y) = t(x_0, y_0)$, where it equals $t\\,x_0^2/y_0$, which is linear in $t$.

A **convex optimisation problem** minimises a convex function subject to $g_i(x) \\le 0$ with convex $g_i$ and $Ax = b$. Its feasible set is convex.

**Theorem.** For a convex problem, every local minimum is global, and the set of minimisers is convex.

*Proof.* Suppose $x^*$ is a local minimum and some feasible $y$ has $f(y) < f(x^*)$. The points $z = \\theta y + (1 - \\theta)x^*$ are feasible, by convexity of the set, and they approach $x^*$ as $\\theta \\to 0$. Convexity of $f$ gives $f(z) \\le \\theta f(y) + (1 - \\theta)f(x^*) < f(x^*)$, which contradicts local minimality. $\\square$

This theorem is the reason convexity is the dividing line between tractable and hard optimisation. For a convex problem, any method that finds a local minimum has found the answer. Software such as CVXPY checks convexity for you by applying these composition rules, and it rejects problems it cannot prove convex.`,
          resources: [
            main(ee364a, 'The lectures on convex sets and convex functions.'),
            also(mit6253, 'The early lectures on convex analysis.'),
            also(cvxpy, 'Its rules for proving convexity are the composition rules in this lesson.'),
          ],
          exercises: [
            {
              slug: 'prove-convexity',
              title: 'Prove convexity',
              prompt:
                'Prove that each function is convex, using the definition, the Hessian test or the composition rules, and say which method you used: (a) any norm on $\\mathbb{R}^n$; (b) $\\ln(e^{x_1} + \\dots + e^{x_n})$; (c) the logistic loss $\\ln(1 + e^{-y w^Tx})$ as a function of $w$; (d) $-\\ln\\det X$ on positive definite matrices, by restricting to lines $X + tV$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (b), show that $v^T\\nabla^2 f\\,v$ is a variance, which is non-negative.',
            },
            {
              slug: 'first-order-characterisation',
              title: 'Prove the first-order characterisation',
              prompt:
                'Prove that a differentiable function on an open convex set is convex if and only if $f(y) \\geq f(x) + \\nabla f(x)^T(y - x)$ for all $x, y$. Deduce that if $\\nabla f(x^*) = 0$ for a convex $f$, then $x^*$ is a global minimiser, and that for a convex problem, $x^*$ is optimal if and only if $\\nabla f(x^*)^T(y - x^*) \\geq 0$ for every feasible $y$.',
              kind: 'derivation',
              difficulty: 2,
              hint: 'For the forward direction, divide the convexity inequality by $\\theta$ and let $\\theta \\to 0$.',
            },
            {
              slug: 'recognise-convex-problems',
              title: 'Recognise convex problems',
              prompt:
                'For each problem, decide whether it is convex as written, and if not, whether a change of variables makes it convex: (a) minimise $\\|Ax - b\\|_1$ subject to $\\|x\\|_\\infty \\leq 1$; (b) minimise $x^2 + y^2$ subject to $xy \\geq 1$, $x, y > 0$; (c) maximise $\\sqrt{xy}$ subject to $x + y \\leq 1$, $x, y \\geq 0$; (d) minimise $x^2$ subject to $x^2 = 1$. Write each convex one in CVXPY and solve it.',
              kind: 'coding',
              difficulty: 2,
            },
          ],
          selfAssessment: [
            {
              question: 'State the first-order characterisation of convexity.',
              answerOutline: 'Every tangent plane underestimates the function: $f(y) \\geq f(x) + \\nabla f(x)^T(y - x)$.',
            },
            {
              question: 'Is strict convexity equivalent to a positive definite Hessian?',
              answerOutline: 'No. Positive definite implies strict convexity, but $x^4$ is strictly convex with zero second derivative at 0.',
            },
            {
              question: 'Why is every local minimum of a convex problem global?',
              answerOutline: 'A better feasible point would give, by convexity, better points arbitrarily close to the local minimum.',
            },
          ],
        },
        {
          slug: 'lagrangian-duality',
          title: 'Lagrangian duality',
          summary:
            'Form the dual function of any optimisation problem, prove weak duality, and learn when Slater\'s condition gives strong duality.',
          estimatedMinutes: 130,
          objectives: [
            'Form the Lagrangian dual function and dual problem',
            'Prove weak duality in general',
            'State Slater\'s theorem and use it to guarantee strong duality',
            'Relate dual optimal solutions to KKT multipliers',
          ],
          concepts: [
            'Lagrangian dual function',
            'Dual problem',
            'Weak duality',
            'Strong duality and Slater\'s condition',
            'Duality gap',
          ],
          explanation: `For the problem $\\min f(x)$ subject to $g_i(x) \\le 0$ and $h_j(x) = 0$, with optimal value $p^*$, the **Lagrangian** is $L(x, \\mu, \\lambda) = f(x) + \\sum_i \\mu_i g_i(x) + \\sum_j \\lambda_j h_j(x)$. The **dual function** is
$$q(\\mu, \\lambda) = \\inf_x L(x, \\mu, \\lambda),$$
with the infimum over all $x$, not just feasible ones. It may equal $-\\infty$. As an infimum of affine functions of $(\\mu, \\lambda)$, it is always concave, whether or not the original problem is convex. The **dual problem** maximises $q$ over $\\mu \\ge 0$, with optimal value $d^*$.

**Weak duality.** $d^* \\le p^*$, for every problem.

*Proof.* If $x$ is feasible and $\\mu \\ge 0$, then $\\mu_i g_i(x) \\le 0$ and $h_j(x) = 0$, so $L(x, \\mu, \\lambda) \\le f(x)$. Then $q(\\mu, \\lambda) \\le L(x, \\mu, \\lambda) \\le f(x)$. Take the supremum on the left and the infimum on the right. $\\square$

The **duality gap** is $p^* - d^*$. For LP, it is zero whenever an optimum is finite. For non-convex and integer problems, it can be positive, which is why dual bounds from integer programs need not be tight.

**Slater's theorem.** If the problem is convex and some point is **strictly feasible**, meaning $g_i(x) < 0$ for all $i$ and $Ax = b$, then $d^* = p^*$, and if $p^*$ is finite, the dual optimum is attained. Affine inequality constraints need only be satisfied, not strictly.

When strong duality holds and both optima are attained, a primal optimum and a dual optimum together satisfy the KKT conditions. So dual optimal points are exactly KKT multipliers.

**Worked example.** Minimise $x^2$ subject to $1 - x \\le 0$. The answer is $p^* = 1$ at $x = 1$. The Lagrangian is $x^2 + \\mu(1 - x)$, which is minimised over $x$ at $x = \\mu/2$. So
$$q(\\mu) = \\frac{\\mu^2}{4} + \\mu\\left(1 - \\frac{\\mu}{2}\\right) = \\mu - \\frac{\\mu^2}{4}.$$
This is concave, and maximised at $\\mu = 2$, with $q(2) = 1$. So $d^* = p^* = 1$, as Slater predicts ($x = 2$ is strictly feasible). The multiplier $\\mu = 2$ matches the KKT condition $2x - \\mu = 0$ at $x = 1$.

Now see what can happen without Slater. Minimise $x$ subject to $x^2 \\le 0$. The only feasible point is 0, so $p^* = 0$, but no point is strictly feasible. Here $q(\\mu) = \\inf_x (x + \\mu x^2) = -1/(4\\mu)$ for $\\mu > 0$, and $-\\infty$ at $\\mu = 0$. The supremum is 0, so the gap is zero, but no $\\mu$ attains it, and no KKT multiplier exists. Slater's condition is what rules out such degenerate behaviour.

Duality is useful in several ways. A dual feasible point certifies a lower bound. The dual may be easier, or smaller. And it often reveals structure, as with the support vectors of the next lesson.`,
          resources: [
            main(ee364a, 'The lectures on duality, Slater\'s condition and the KKT conditions.'),
            also(mit6253, 'The lectures on Lagrangian duality and the geometry of the duality gap.'),
            also(cvxpy, 'Each constraint\'s `dual_value` gives the multiplier, which you can compare with your hand derivations.'),
          ],
          exercises: [
            {
              slug: 'least-norm-dual',
              title: 'The dual of least-norm',
              prompt:
                'Find the dual of $\\min \\tfrac12\\|x\\|^2$ subject to $Ax = b$, with $A$ having independent rows. Show that the dual optimum gives $x^* = A^T(AA^T)^{-1}b$, and that strong duality holds. Check with CVXPY on a random $5 \\times 12$ problem, comparing the dual variable reported for the constraint with your formula.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'lp-dual-via-lagrangian',
              title: 'LP duality from the Lagrangian',
              prompt:
                'Derive the dual of $\\min c^Tx$ subject to $Ax = b$, $x \\geq 0$ from the Lagrangian, by computing $q$ and showing it is $-\\infty$ unless $A^T\\lambda + c \\geq 0$, in a suitable sign convention. Show that you recover the LP dual of the duality module. Explain why Slater is not needed here.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'duality-gap-example',
              title: 'A positive duality gap',
              prompt:
                'Minimise $-x_1 - x_2$ subject to $x_1 + x_2 \\leq 1.5$ with $x_1, x_2 \\in \\{0, 1\\}$, written as the constraints $x_i^2 - x_i = 0$. Find $p^*$. Compute the dual function and show that $d^* < p^*$. Then compute the bound from the LP relaxation, and compare the two bounds with $p^*$.',
              kind: 'derivation',
              difficulty: 3,
              hint: 'For fixed multipliers, minimise the Lagrangian over each $x_i$ separately. It is bounded below only if $\\lambda_i > 0$, or if $\\lambda_i = 0$ and the coefficient of $x_i$ is zero. You should find $p^* = -1$ and $d^* = -1.5$.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why is the dual function always concave?',
              answerOutline: 'It is a pointwise infimum of functions that are affine in the multipliers.',
            },
            {
              question: 'State Slater\'s condition and what it guarantees.',
              answerOutline: 'For a convex problem, a strictly feasible point exists. Then strong duality holds, and the dual optimum is attained when $p^*$ is finite.',
            },
            {
              question: 'Give a convex problem where the dual optimum is not attained.',
              answerOutline: 'Minimise $x$ subject to $x^2 \\leq 0$: the dual supremum 0 is approached only as $\\mu \\to \\infty$.',
            },
          ],
        },
        {
          slug: 'machine-learning-applications',
          title: 'Applications to machine learning',
          summary:
            'Treat regression, classification and sparse modelling as convex problems, and use duality and proximal methods to solve them.',
          estimatedMinutes: 130,
          objectives: [
            'Formulate least squares, logistic regression, support vector machines and the lasso as convex problems',
            'Derive the support vector machine dual and identify support vectors',
            'Solve the lasso by proximal gradient using soft thresholding',
            'Choose a suitable solver or algorithm for each problem',
          ],
          concepts: [
            'Empirical risk minimisation',
            'Logistic regression',
            'Support vector machine',
            'Lasso and sparsity',
            'Proximal operator and soft thresholding',
          ],
          explanation: `Many machine learning models are trained by minimising a convex objective, so the whole theory of this module applies. Least squares, $\\min_w \\|Xw - y\\|^2$, is convex and has a closed form. **Ridge regression** adds $\\lambda\\|w\\|^2$. **Logistic regression** minimises $\\sum_i \\ln(1 + e^{-y_i w^Tx_i})$ with labels $y_i = \\pm 1$. It is convex and smooth, but has no closed form, so Newton or quasi-Newton methods solve it well. When the classes can be separated, the minimum is not attained: $\\|w\\|$ grows without limit, which is one reason to add regularisation.

The **support vector machine** (SVM) seeks the separating hyperplane with the widest margin. In its hard-margin form,
$$\\min_{w, b}\\ \\tfrac12\\|w\\|^2 \\quad \\text{s.t.} \\quad y_i(w^Tx_i + b) \\ge 1 \\text{ for all } i.$$
This is a convex quadratic program. Its dual is
$$\\max_{\\alpha \\ge 0}\\ \\sum_i \\alpha_i - \\tfrac12\\sum_{i,j}\\alpha_i\\alpha_j y_iy_j\\, x_i^Tx_j \\quad \\text{s.t.} \\quad \\sum_i \\alpha_iy_i = 0,$$
with $w = \\sum_i \\alpha_iy_ix_i$. By complementary slackness, $\\alpha_i > 0$ only for points on the margin, the **support vectors**. The data enter the dual only through inner products $x_i^Tx_j$, and replacing those by a kernel gives non-linear classifiers.

**Worked example.** One-dimensional data: $x = 2$ with label $+1$, and $x = 0$ with label $-1$. The constraints are $2w + b \\ge 1$ and $-b \\ge 1$. The second gives $b \\le -1$, and then the first gives $2w \\ge 1 - b \\ge 2$, so $w \\ge 1$. The minimum of $\\tfrac12 w^2$ is at $w = 1$, $b = -1$. The classifier is $\\operatorname{sign}(x - 1)$, with the boundary midway between the points. Both constraints are tight, so both points are support vectors. The dual solution is $\\alpha = (\\tfrac12, \\tfrac12)$. Check: $\\sum \\alpha_iy_i = \\tfrac12 - \\tfrac12 = 0$, and $w = \\tfrac12(1)(2) + \\tfrac12(-1)(0) = 1$, which agrees.

The **lasso** minimises $\\tfrac12\\|Xw - y\\|^2 + \\lambda\\|w\\|_1$. The $\\ell_1$ penalty is convex but not differentiable, and it drives coefficients exactly to zero, so it selects variables. **Proximal gradient** handles it by taking a gradient step on the smooth part and then applying the **proximal operator** of $\\lambda\\|\\cdot\\|_1$. That operator acts coordinatewise by **soft thresholding**:
$$S_\\lambda(a) = \\operatorname{sign}(a)\\max(|a| - \\lambda, 0).$$
For example, $S_1(3) = 2$, $S_1(-0.5) = 0$ and $S_{0.5}(-2) = -1.5$. The resulting method, ISTA, converges at the same rate as gradient descent, and an accelerated version improves it.

In practice, use specialised solvers where they exist, such as \`scikit-learn\` for the standard models. Use CVXPY to prototype a new model quickly and to check answers.`,
          resources: [
            main(ee364a, 'The lectures on approximation, statistical estimation and classification applications.'),
            also(cvxpy, 'The examples gallery includes lasso, SVM and logistic regression models.'),
            also(
              {
                title: 'Support vector machines in scikit-learn',
                url: 'https://scikit-learn.org/stable/modules/svm.html',
                type: 'documentation',
                cost: 'free',
                provider: 'scikit-learn',
              },
              'The user guide section on SVMs, including the dual formulation and support vectors.',
            ),
          ],
          exercises: [
            {
              slug: 'svm-dual-derivation',
              title: 'Derive the SVM dual',
              prompt:
                'Derive the dual of the hard-margin SVM from the Lagrangian, including the formula for $w$ and the constraint $\\sum_i \\alpha_iy_i = 0$. Explain how to recover $b$ from any support vector. Verify the worked example, then solve a two-dimensional toy problem with 20 separable points using CVXPY for both the primal and the dual, and check that $w$ agrees and that the points with positive $\\alpha_i$ lie on the margin.',
              kind: 'derivation',
              difficulty: 2,
            },
            {
              slug: 'logistic-regression-methods',
              title: 'Train logistic regression three ways',
              prompt:
                'On `sklearn.datasets.load_breast_cancer` with standardised features and a small ridge penalty, train logistic regression with your gradient descent, your Newton method and your BFGS from the earlier module. Report iterations, time and final objective for each, and check the objective against `sklearn.linear_model.LogisticRegression` with matching regularisation. Prove that the objective is convex, and explain why the ridge penalty makes it strongly convex.',
              kind: 'coding',
              difficulty: 2,
            },
            {
              slug: 'lasso-by-proximal-gradient',
              title: 'The lasso by proximal gradient',
              prompt:
                'Prove that $S_\\lambda(a)$ minimises $\\tfrac12(x - a)^2 + \\lambda|x|$ over $x$, by considering $x > 0$, $x < 0$ and $x = 0$. Then implement ISTA for the lasso with step $1/L$, where $L$ is the largest eigenvalue of $X^TX$. Test it on simulated data with 200 samples, 50 features and 5 non-zero true coefficients. Compare with CVXPY, to within $10^{-6}$ in objective, and plot the coefficient paths as $\\lambda$ varies.',
              kind: 'coding',
              difficulty: 3,
            },
          ],
          selfAssessment: [
            {
              question: 'What are support vectors, in terms of duality?',
              answerOutline: 'The training points with positive dual variables, which by complementary slackness lie on the margin.',
            },
            {
              question: 'Why does the lasso produce exactly zero coefficients while ridge does not?',
              answerOutline: 'The $\\ell_1$ penalty has a corner at 0. Its proximal operator, soft thresholding, sets small values exactly to zero.',
            },
            {
              question: 'What happens to unregularised logistic regression on separable data?',
              answerOutline: 'The infimum is 0 but not attained: scaling up a separating $w$ always lowers the loss, so $\\|w\\| \\to \\infty$.',
            },
          ],
        },
      ],
    },
  ],
  capstone: {
    slug: 'interior-point-solver',
    title: 'A primal-dual interior-point solver',
    description: `Build a primal-dual interior-point method for linear programs, and extend it to convex quadratic programs. The method follows the central path: it solves the KKT conditions of the log-barrier problem with Newton steps, keeping primal and dual iterates strictly positive while the complementarity products shrink together. Write it in NumPy with a careful linear solve at each step, test it against \`linprog\` and CVXPY, and use it on a real application with at least a few thousand variables, such as a transportation or blending model, a portfolio optimisation, or a support vector machine. The capstone joins every module: LP geometry and duality, network or integer models, Newton's method, KKT theory, barriers and convex duality.`,
    deliverables: [
      'A documented package solving LPs in standard form and convex QPs, with a Mehrotra-style predictor-corrector step and a stopping rule based on the primal residual, dual residual and duality gap',
      'A derivation, in your own words, of the Newton system for the perturbed KKT conditions, and of why the iterates stay strictly feasible',
      'A test suite on at least 40 problems, including degenerate, infeasible and unbounded ones, with a strategy for detecting the last two and a comparison with `linprog` and CVXPY',
      'A plot of the duality gap against iteration on a log scale for several problem sizes, and a table of iteration counts against size',
      'An application report that formulates a real problem, solves it with your code, interprets the dual values, and checks the result against a production solver',
    ],
    estimatedHours: 20,
    stretchGoals: [
      'Exploit sparsity with `scipy.sparse` and a sparse Cholesky or LDL factorisation',
      'Add a homogeneous self-dual embedding for robust infeasibility detection',
    ],
  },
  masteryChecklist: [
    'I can formulate production, transportation, flow and scheduling problems as linear or integer programs',
    'I can run the simplex method by hand, explain degeneracy and cycling, and start it with phase one',
    'I can write the dual of any LP, prove weak and strong duality, and use complementary slackness to certify an optimum',
    'I can compute sensitivity ranges and explain why shadow prices hold only within them',
    'I can explain why totally unimodular models have integer optima and solve harder integer programs by branch and bound and cutting planes',
    'I can state first- and second-order optimality conditions and choose between gradient, Newton and quasi-Newton methods',
    'I can state the KKT theorem with a constraint qualification, solve small problems with it, and explain penalty and barrier methods',
    'I can recognise convex problems, form their Lagrangian duals, and say when strong duality holds',
  ],
});
