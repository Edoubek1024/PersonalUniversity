import { defineSubject } from '../define';
import type { ResourceInput } from '../types';

const openstax = (slug: string, title: string, note: string, primary = false): ResourceInput => ({
  title: `OpenStax Calculus Volume 3: ${title}`,
  url: `https://openstax.org/books/calculus-volume-3/pages/${slug}`,
  type: 'textbook',
  cost: 'free',
  provider: 'OpenStax',
  note,
  primary,
});

/** `path` is the folder and page, such as "CalcIII/TangentPlanes". Paul keeps vectors under Calculus II. */
const paul = (path: string, title: string, note: string): ResourceInput => ({
  title: `Paul's Online Math Notes: ${title}`,
  url: `https://tutorial.math.lamar.edu/Classes/${path}.aspx`,
  type: 'textbook',
  cost: 'free',
  provider: 'Lamar University',
  note,
});

const mit1802 = (note: string): ResourceInput => ({
  title: 'MIT 18.02SC Multivariable Calculus',
  url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
  type: 'course',
  cost: 'free',
  provider: 'MIT OpenCourseWare',
  note,
});

const khan = (note: string): ResourceInput => ({
  title: 'Multivariable calculus',
  url: 'https://www.khanacademy.org/math/multivariable-calculus',
  type: 'video',
  cost: 'free',
  provider: 'Khan Academy',
  note,
});

const geogebra: ResourceInput = {
  title: 'GeoGebra 3D Calculator',
  url: 'https://www.geogebra.org/3d',
  type: 'tool',
  cost: 'free',
  provider: 'GeoGebra',
  note: 'Plot surfaces, curves and vectors in three dimensions and turn them with the mouse.',
};

export default defineSubject({
  id: 'calculus-3',
  title: 'Calculus III',
  category: 'math',
  tagline:
    'Calculus in three dimensions: vectors, curves, partial derivatives, multiple integrals and the theorems of Green, Stokes and Gauss.',
  description: `The world has three dimensions, and most quantities depend on more than one variable. The temperature in a room depends on position, the pressure in the atmosphere on height and time, the cost of a design on several dimensions at once. This course extends the derivative and the integral to that setting.

It starts with vectors and the geometry of lines, planes and surfaces, then studies curves in space and the motion of a particle along them. Partial derivatives and the gradient describe how a function of several variables changes, and they lead to optimisation with and without constraints. Double and triple integrals measure volumes, masses and averages over regions, in whatever coordinates fit the shape. The last third is vector calculus: vector fields, line and surface integrals, and the three great integral theorems, which are the mathematical language of electromagnetism and fluid flow.

The approach is geometric and physical, with every computation done by hand. Draw pictures constantly: a sketch of the region is the most important step in nearly every integral of this course. Each lesson has fully worked examples, and hints hold a first step and, where an exercise has a definite result, the answer to check against.

The course follows the topics of MATH 241 at the University of Illinois Urbana-Champaign, based on the public catalog description. It is an original course and is not affiliated with or endorsed by the University of Illinois. After it, the mathematics category opens up: differential equations, linear algebra, analysis and the rest all assume it.`,
  difficulty: 'intermediate',
  estimatedHours: 100,
  prerequisites: ['calculus-2'],
  recommendedBackground: [
    'Fluency with single-variable differentiation and integration techniques',
    'Polar coordinates and parametric curves from Calculus II',
  ],
  tags: ['calculus', 'multivariable calculus', 'vector calculus', 'vectors', 'multiple integrals', 'mathematics'],
  core: false,
  modules: [
    {
      slug: 'vectors-and-space',
      title: 'Vectors and the Geometry of Space',
      description:
        'Coordinates and vectors in three dimensions, the two products of vectors, lines and planes, and the surfaces and coordinate systems used for the rest of the course.',
      lessons: [
        {
          slug: 'vectors-and-dot-product',
          title: 'Vectors and the dot product',
          summary:
            'Points and vectors in space, lengths, and the dot product that measures angles and projections.',
          estimatedMinutes: 160,
          objectives: [
            'Work with points, distances and spheres in three dimensions',
            'Add vectors, scale them and find unit vectors',
            'Compute a dot product and use it to find angles',
            'Decide when two vectors are orthogonal',
            'Compute projections and the work done by a constant force',
          ],
          concepts: [
            'Three-dimensional coordinates',
            'Vector, magnitude, unit vector',
            'Dot product',
            'Angle between vectors',
            'Orthogonality',
            'Scalar and vector projection',
          ],
          explanation: `A point in space has coordinates $(x,y,z)$, measured along three perpendicular axes arranged by the right-hand rule. The distance between two points is given by Pythagoras twice: $\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$. So the sphere of radius $r$ centred at $(a,b,c)$ is $(x-a)^2+(y-b)^2+(z-c)^2=r^2$.

A **vector** has length and direction but no fixed position. We write $\\mathbf v=\\langle v_1,v_2,v_3\\rangle$. Vectors add componentwise, which matches the tip-to-tail picture, and scale componentwise. The length is $|\\mathbf v|=\\sqrt{v_1^2+v_2^2+v_3^2}$, and $\\mathbf v/|\\mathbf v|$ is the **unit vector** in the same direction.

The **dot product** is $\\mathbf a\\cdot\\mathbf b=a_1b_1+a_2b_2+a_3b_3$, a number. Its geometric meaning comes from the law of cosines:

$$
\\mathbf a\\cdot\\mathbf b=|\\mathbf a|\\,|\\mathbf b|\\cos\\theta,
$$

where $\\theta$ in $[0,\\pi]$ is the angle between the vectors. So $\\mathbf a\\cdot\\mathbf b=0$ exactly when non-zero vectors are perpendicular, or **orthogonal**. The sign tells you whether the angle is acute or obtuse. Also $\\mathbf a\\cdot\\mathbf a=|\\mathbf a|^2$.

**Projection.** The component of $\\mathbf a$ along $\\mathbf b$ is the number $\\text{comp}_{\\mathbf b}\\mathbf a=\\dfrac{\\mathbf a\\cdot\\mathbf b}{|\\mathbf b|}$, which is the length of the shadow of $\\mathbf a$ on the line of $\\mathbf b$, with a sign. The vector projection is

$$
\\text{proj}_{\\mathbf b}\\mathbf a=\\frac{\\mathbf a\\cdot\\mathbf b}{|\\mathbf b|^2}\\,\\mathbf b.
$$

**Worked example.** Let $\\mathbf a=\\langle1,2,2\\rangle$ and $\\mathbf b=\\langle3,0,4\\rangle$. Then $\\mathbf a\\cdot\\mathbf b=3+0+8=11$, $|\\mathbf a|=3$ and $|\\mathbf b|=5$, so

$$
\\cos\\theta=\\frac{11}{15},\\qquad\\theta\\approx42.8^\\circ.
$$

The component of $\\mathbf a$ along $\\mathbf b$ is $11/5$, and the projection is $\\tfrac{11}{25}\\langle3,0,4\\rangle$. A useful check: $\\mathbf a-\\text{proj}_{\\mathbf b}\\mathbf a=\\langle\\tfrac{-8}{25},2,\\tfrac{6}{25}\\rangle$, and its dot product with $\\mathbf b$ is $-\\tfrac{24}{25}+\\tfrac{24}{25}=0$, so the remainder is perpendicular to $\\mathbf b$, as it should be.

**Work.** A constant force $\\mathbf F$ moving an object through a displacement $\\mathbf d$ does work $W=\\mathbf F\\cdot\\mathbf d$. Only the component of the force along the motion counts. Pulling a sled with $50$ N at $30^\\circ$ above the horizontal for $10$ m does $50\\cdot10\\cos30^\\circ\\approx433$ J of work. This idea, generalised to curved paths and varying forces, becomes the line integral of Module 6.

The inequality $|\\mathbf a\\cdot\\mathbf b|\\le|\\mathbf a||\\mathbf b|$ (Cauchy-Schwarz) follows from $|\\cos\\theta|\\le1$, and it holds in any number of dimensions.`,
          resources: [
            openstax('2-2-vectors-in-three-dimensions', 'Vectors in three dimensions', 'Coordinates, spheres and vector algebra.', true),
            openstax('2-3-the-dot-product', 'The dot product', 'Angles, projections and work.'),
            paul('CalcII/DotProduct', 'Dot product', 'Short worked examples.'),
            paul('CalcIII/3DCoords', 'The 3-D coordinate system', 'A first look at equations in three dimensions.'),
          ],
          exercises: [
            {
              slug: 'spheres-and-lengths',
              title: 'Spheres and lengths',
              prompt: `(a) Complete the square to find the centre and radius of the sphere $x^2+y^2+z^2-4x+6y-2z=2$. (b) Find a unit vector in the direction of $\\langle2,-1,2\\rangle$, and a vector of length $6$ in the opposite direction.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Centre (2, -3, 1), radius 4. (b) (1/3)<2, -1, 2> and <-4, 2, -4>.',
            },
            {
              slug: 'angles-and-projections',
              title: 'Angles and projections',
              prompt: `For $\\mathbf u=\\langle2,-1,2\\rangle$ and $\\mathbf v=\\langle1,1,0\\rangle$, find the angle between them, the scalar component of $\\mathbf u$ along $\\mathbf v$, and the vector projection. Then show that the triangle with vertices $A(2,1,0)$, $B(3,3,1)$ and $C(3,0,1)$ has a right angle, and say where.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'cos(theta) = 1/(3 sqrt 2), about 76.4 degrees. Component 1/sqrt 2. Projection <1/2, 1/2, 0>. AB . AC = 0, so the right angle is at A.',
            },
            {
              slug: 'dot-product-proofs',
              title: 'Proofs with the dot product',
              prompt: `Prove, using only the algebra of the dot product: (a) the parallelogram law $|\\mathbf a+\\mathbf b|^2+|\\mathbf a-\\mathbf b|^2=2|\\mathbf a|^2+2|\\mathbf b|^2$, (b) the triangle inequality $|\\mathbf a+\\mathbf b|\\le|\\mathbf a|+|\\mathbf b|$, using Cauchy-Schwarz, (c) that the diagonals of a rhombus are perpendicular.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Expand each squared length as a dot product of a vector with itself. For (c), the diagonals are a + b and a - b with |a| = |b|.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the sign of $\\mathbf a\\cdot\\mathbf b$ tell you?',
              answerOutline: 'Positive: acute angle. Zero: perpendicular. Negative: obtuse angle.',
            },
            {
              question: 'Write the vector projection of $\\mathbf a$ onto $\\mathbf b$.',
              answerOutline: '$\\frac{\\mathbf a\\cdot\\mathbf b}{|\\mathbf b|^2}\\mathbf b$.',
            },
            {
              question: 'Why does only part of a force do work?',
              answerOutline: 'Work is $\\mathbf F\\cdot\\mathbf d$, so only the component of the force along the displacement counts.',
            },
          ],
        },
        {
          slug: 'cross-product',
          title: 'The cross product',
          summary:
            'A product of two vectors that gives a perpendicular vector, with areas, volumes and torque.',
          estimatedMinutes: 150,
          objectives: [
            'Compute a cross product with a determinant',
            'Use the right-hand rule and $|\\mathbf a\\times\\mathbf b|=|\\mathbf a||\\mathbf b|\\sin\\theta$',
            'Find areas of parallelograms and triangles',
            'Use the scalar triple product for volumes and coplanarity',
            'Compute torque',
          ],
          concepts: [
            'Cross product',
            'Determinant form',
            'Right-hand rule',
            'Area of a parallelogram',
            'Scalar triple product',
            'Torque',
          ],
          explanation: `The **cross product** of two vectors in three dimensions is

$$
\\mathbf a\\times\\mathbf b=\\begin{vmatrix}\\mathbf i&\\mathbf j&\\mathbf k\\\\a_1&a_2&a_3\\\\b_1&b_2&b_3\\end{vmatrix}=\\langle a_2b_3-a_3b_2,\\ a_3b_1-a_1b_3,\\ a_1b_2-a_2b_1\\rangle.
$$

Its three key properties are:

- $\\mathbf a\\times\\mathbf b$ is perpendicular to both $\\mathbf a$ and $\\mathbf b$, with direction given by the **right-hand rule**: curl your fingers from $\\mathbf a$ to $\\mathbf b$, and your thumb points along $\\mathbf a\\times\\mathbf b$.
- $|\\mathbf a\\times\\mathbf b|=|\\mathbf a||\\mathbf b|\\sin\\theta$, which is the **area of the parallelogram** with sides $\\mathbf a$ and $\\mathbf b$.
- It is **anticommutative**: $\\mathbf b\\times\\mathbf a=-\\mathbf a\\times\\mathbf b$. So $\\mathbf a\\times\\mathbf a=\\mathbf 0$, and parallel vectors have zero cross product. It is not associative.

**Worked example 1.** For $\\mathbf a=\\langle1,2,3\\rangle$ and $\\mathbf b=\\langle4,5,6\\rangle$,

$$
\\mathbf a\\times\\mathbf b=\\langle2\\cdot6-3\\cdot5,\\ 3\\cdot4-1\\cdot6,\\ 1\\cdot5-2\\cdot4\\rangle=\\langle-3,6,-3\\rangle.
$$

Check: $\\langle-3,6,-3\\rangle\\cdot\\mathbf a=-3+12-9=0$, and the dot product with $\\mathbf b$ is $-12+30-18=0$. Always do this check, since the cross product formula is easy to get wrong.

**Worked example 2.** Find the area of the triangle with vertices $P(1,0,0)$, $Q(0,2,0)$, $R(0,0,3)$. Two sides are $\\overrightarrow{PQ}=\\langle-1,2,0\\rangle$ and $\\overrightarrow{PR}=\\langle-1,0,3\\rangle$. Their cross product is $\\langle6,3,2\\rangle$, which has length $\\sqrt{36+9+4}=7$. The triangle is half the parallelogram, so its area is $\\tfrac72$. The vector $\\langle6,3,2\\rangle$ is also perpendicular to the plane of the triangle, which will be used in the next lesson.

**Triple product.** The number $\\mathbf a\\cdot(\\mathbf b\\times\\mathbf c)$ is the determinant of the matrix with rows $\\mathbf a,\\mathbf b,\\mathbf c$. Its absolute value is the **volume of the parallelepiped** with those edges: the base has area $|\\mathbf b\\times\\mathbf c|$, and the height is the component of $\\mathbf a$ along that normal. If it is zero, the three vectors lie in a plane.

**Torque.** A force $\\mathbf F$ applied at position $\\mathbf r$ from a pivot produces torque $\\boldsymbol\\tau=\\mathbf r\\times\\mathbf F$. Its size is $|\\mathbf r||\\mathbf F|\\sin\\theta$. So a force along the wrench does nothing, and a force perpendicular to it does the most. Angular momentum, magnetic force on a moving charge and the rotation of fluids are all cross products too.

The cross product exists only in three dimensions. That is why the vector calculus of the last two modules is special to three-dimensional space.`,
          resources: [
            openstax('2-4-the-cross-product', 'The cross product', 'Determinants, triple product and torque.', true),
            paul('CalcII/CrossProduct', 'Cross product', 'Worked examples with the determinant.'),
            khan('The vectors videos at the start of the course give a visual account of both products.'),
          ],
          exercises: [
            {
              slug: 'cross-drill',
              title: 'Cross products and areas',
              prompt: `(a) Compute $\\langle2,-1,0\\rangle\\times\\langle1,3,-2\\rangle$ and check that the result is perpendicular to both. (b) Find the area of the triangle with vertices $(1,1,1)$, $(2,3,4)$ and $(4,3,2)$. (c) Find a unit vector perpendicular to the plane of that triangle.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) <2, 4, 7>. (b) The cross product of the two sides is <-4, 8, -4>, length 4 sqrt 6, so the area is 2 sqrt 6. (c) (1/sqrt 6)<-1, 2, -1>.',
            },
            {
              slug: 'volumes-and-torque',
              title: 'Volumes and torque',
              prompt: `(a) Find the volume of the parallelepiped with edges $\\langle1,0,1\\rangle$, $\\langle0,2,1\\rangle$ and $\\langle1,1,3\\rangle$. (b) Are the points $(0,0,0)$, $(1,2,3)$, $(2,3,4)$ and $(3,4,5)$ in one plane? (c) A wrench $0.25$ m long is pushed with $40$ N at an angle of $60^\\circ$ to the handle. Find the size of the torque.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 3. (b) Yes: the triple product is 0. (c) 0.25 times 40 times sin 60 degrees, about 8.66 N m.',
            },
            {
              slug: 'cross-identities',
              title: 'Identities',
              prompt: `Prove: (a) $\\mathbf a\\cdot(\\mathbf a\\times\\mathbf b)=0$, from the components. (b) Lagrange's identity $|\\mathbf a\\times\\mathbf b|^2=|\\mathbf a|^2|\\mathbf b|^2-(\\mathbf a\\cdot\\mathbf b)^2$, and deduce $|\\mathbf a\\times\\mathbf b|=|\\mathbf a||\\mathbf b|\\sin\\theta$. (c) Show by an example that $(\\mathbf a\\times\\mathbf b)\\times\\mathbf c\\ne\\mathbf a\\times(\\mathbf b\\times\\mathbf c)$ in general.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (c), try a = b = i and c = j.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does $|\\mathbf a\\times\\mathbf b|$ measure?',
              answerOutline: 'The area of the parallelogram spanned by $\\mathbf a$ and $\\mathbf b$.',
            },
            {
              question: 'What is $\\mathbf b\\times\\mathbf a$ in terms of $\\mathbf a\\times\\mathbf b$?',
              answerOutline: '$-\\mathbf a\\times\\mathbf b$.',
            },
            {
              question: 'How do you test whether three vectors lie in one plane?',
              answerOutline: 'Their scalar triple product is zero.',
            },
          ],
        },
        {
          slug: 'lines-and-planes',
          title: 'Lines and planes',
          summary:
            'Equations of lines and planes in space, and the distances and angles between them.',
          estimatedMinutes: 170,
          objectives: [
            'Write vector, parametric and symmetric equations of a line',
            'Decide whether two lines are parallel, intersecting or skew',
            'Write the equation of a plane from a point and a normal',
            'Find the plane through three points, and the line where two planes meet',
            'Compute distances from points to planes and between skew lines',
          ],
          concepts: [
            'Vector equation of a line',
            'Direction vector',
            'Skew lines',
            'Normal vector of a plane',
            'Scalar equation of a plane',
            'Distance formulas',
          ],
          explanation: `**Lines.** A line is fixed by a point $\\mathbf r_0$ on it and a direction $\\mathbf v$:

$$
\\mathbf r(t)=\\mathbf r_0+t\\mathbf v,\\quad\\text{or}\\quad x=x_0+at,\\ y=y_0+bt,\\ z=z_0+ct.
$$

In space, two lines can be parallel (with parallel directions), meet in one point, or be **skew**: not parallel and never meeting. To decide, check the directions, then try to solve for parameters giving the same point.

**Planes.** A plane is fixed by a point $\\mathbf r_0$ and a **normal vector** $\\mathbf n=\\langle a,b,c\\rangle$ perpendicular to it. A point $\\mathbf r$ is on the plane exactly when $\\mathbf r-\\mathbf r_0$ is perpendicular to $\\mathbf n$:

$$
\\mathbf n\\cdot(\\mathbf r-\\mathbf r_0)=0,\\quad\\text{that is,}\\quad a(x-x_0)+b(y-y_0)+c(z-z_0)=0.
$$

The coefficients of $x,y,z$ in a plane's equation are its normal vector. Two planes are parallel if their normals are, and the angle between planes is the angle between their normals.

**Worked example 1.** Find the plane through $P(1,0,0)$, $Q(0,2,0)$ and $R(0,0,3)$. From the previous lesson, $\\overrightarrow{PQ}\\times\\overrightarrow{PR}=\\langle6,3,2\\rangle$ is normal. Using $P$:

$$
6(x-1)+3y+2z=0,\\quad\\text{that is,}\\quad6x+3y+2z=6.
$$

Check: $Q$ gives $6$ and $R$ gives $6$, as they should.

**Distance from a point to a plane.** For $ax+by+cz=d$ and a point $(x_1,y_1,z_1)$,

$$
D=\\frac{|ax_1+by_1+cz_1-d|}{\\sqrt{a^2+b^2+c^2}}.
$$

This is the component, along the unit normal, of the vector from any point on the plane to the given point. For the origin and the plane above, $D=6/7$.

**Worked example 2.** Find the line where the planes $x+y+z=1$ and $x-2y+3z=1$ meet. The line lies in both planes, so its direction is perpendicular to both normals:

$$
\\mathbf v=\\langle1,1,1\\rangle\\times\\langle1,-2,3\\rangle=\\langle5,-2,-3\\rangle.
$$

For a point, set $z=0$: then $x+y=1$ and $x-2y=1$ give $y=0$, $x=1$. So the line is $\\mathbf r=\\langle1,0,0\\rangle+t\\langle5,-2,-3\\rangle$.

**Skew lines.** The shortest distance between skew lines through $P_1$ and $P_2$, with directions $\\mathbf v_1$ and $\\mathbf v_2$, is the component of $\\overrightarrow{P_1P_2}$ along $\\mathbf n=\\mathbf v_1\\times\\mathbf v_2$, which is perpendicular to both lines:

$$
D=\\frac{|\\overrightarrow{P_1P_2}\\cdot\\mathbf n|}{|\\mathbf n|}.
$$

Nearly every problem in this lesson comes down to finding the right normal vector, usually as a cross product, and then using a dot product.`,
          resources: [
            openstax('2-5-equations-of-lines-and-planes-in-space', 'Equations of lines and planes in space', 'All the forms and the distance formulas.', true),
            paul('CalcIII/EqnsOfLines', 'Equations of lines', 'Vector, parametric and symmetric forms.'),
            paul('CalcIII/EqnsOfPlanes', 'Equations of planes', 'Normal vectors and plane equations.'),
            geogebra,
          ],
          exercises: [
            {
              slug: 'line-drill',
              title: 'Lines',
              prompt: `(a) Find parametric equations of the line through $(1,-1,2)$ and $(3,1,0)$, and the point where it meets the $xy$-plane. (b) Decide whether the lines $\\mathbf r=\\langle1,0,0\\rangle+t\\langle1,1,0\\rangle$ and $\\mathbf r=\\langle0,1,1\\rangle+s\\langle1,-1,1\\rangle$ are parallel, intersecting or skew. If they are skew, find the distance between them.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) x = 1 + 2t, y = -1 + 2t, z = 2 - 2t, meeting z = 0 at (3, 1, 0). (b) Skew. The cross product of the directions is <1, -1, -2>, and the distance is 4/sqrt 6, about 1.633.',
            },
            {
              slug: 'plane-drill',
              title: 'Planes',
              prompt: `(a) Find the distance from $(1,2,3)$ to the plane $2x-y+2z=4$. (b) Find the angle between the planes $x+y+z=1$ and $x-2y+3z=1$. (c) Find the plane through $(2,1,-1)$ that contains the line $\\mathbf r=\\langle1,0,0\\rangle+t\\langle5,-2,-3\\rangle$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2/3. (b) cos(theta) = 2/sqrt 42, about 72.0 degrees. (c) Use the vectors <1, 1, -1> and <5, -2, -3>, with cross product <-5, -2, -7>: the plane is 5x + 2y + 7z = 5.',
            },
            {
              slug: 'distance-derivation',
              title: 'Derive the distance formula',
              prompt: `Derive the formula for the distance from a point to the plane $ax+by+cz=d$, by projecting a vector from a point on the plane onto the unit normal. Then use it to find the distance between the parallel planes $x+2y-2z=3$ and $2x+4y-4z=18$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'Rewrite the second plane as x + 2y - 2z = 9. The distance is 6/3 = 2.',
            },
          ],
          selfAssessment: [
            {
              question: 'Where can you read off a normal vector from $3x-y+4z=7$?',
              answerOutline: 'From the coefficients: $\\langle3,-1,4\\rangle$.',
            },
            {
              question: 'How do you find the direction of the line where two planes meet?',
              answerOutline: 'Take the cross product of their normals.',
            },
            {
              question: 'What are skew lines?',
              answerOutline: 'Lines that are not parallel and do not meet. They exist only in three or more dimensions.',
            },
          ],
        },
        {
          slug: 'surfaces-and-coordinates',
          title: 'Surfaces, cylindrical and spherical coordinates',
          summary:
            'Recognising cylinders and quadric surfaces from their traces, and describing space in cylindrical and spherical coordinates.',
          estimatedMinutes: 170,
          objectives: [
            'Sketch a surface from its traces in the coordinate planes',
            'Classify the quadric surfaces',
            'Convert points and equations to cylindrical and spherical coordinates',
            'Choose the coordinate system that suits a shape',
          ],
          concepts: [
            'Cylinder in the general sense',
            'Traces',
            'Ellipsoid, paraboloid, hyperboloid, cone',
            'Cylindrical coordinates',
            'Spherical coordinates',
          ],
          explanation: `An equation in $x,y,z$ usually describes a surface. To picture one, look at its **traces**, the curves where it meets planes such as $z=k$, $x=k$ or $y=k$.

**Cylinders.** If one variable is missing, the surface is a **cylinder**: the curve in the other two variables, extended along the missing axis. So $x^2+y^2=1$ in space is a circular tube along the $z$-axis, and $y=x^2$ is a parabolic sheet.

**Quadric surfaces** are given by second-degree equations. With positive constants $a,b,c$:

| equation | surface | traces |
|---|---|---|
| $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$ | ellipsoid | ellipses |
| $z=\\frac{x^2}{a^2}+\\frac{y^2}{b^2}$ | elliptic paraboloid | ellipses, parabolas |
| $z=\\frac{x^2}{a^2}-\\frac{y^2}{b^2}$ | hyperbolic paraboloid (saddle) | hyperbolas, parabolas |
| $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=1$ | hyperboloid of one sheet | ellipses, hyperbolas |
| $\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=-1$ | hyperboloid of two sheets | ellipses, hyperbolas |
| $z^2=\\frac{x^2}{a^2}+\\frac{y^2}{b^2}$ | cone | ellipses, lines |

**Worked example 1.** Identify $4x^2+y^2-z^2+8x=0$. Completing the square, $4(x+1)^2+y^2-z^2=4$, that is, $(x+1)^2+\\dfrac{y^2}{4}-\\dfrac{z^2}{4}=1$. This is a hyperboloid of one sheet with its axis parallel to the $z$-axis through $(-1,0,0)$. Horizontal traces are ellipses, which grow as $|z|$ grows, and are never empty.

**Cylindrical coordinates** are polar coordinates in the $xy$-plane plus height: $x=r\\cos\\theta$, $y=r\\sin\\theta$, $z=z$. They suit shapes with an axis of symmetry: $r=2$ is a cylinder and $z=r^2$ is a paraboloid.

**Spherical coordinates** use the distance $\\rho\\ge0$ from the origin, the angle $\\varphi$ in $[0,\\pi]$ from the positive $z$-axis, and the usual $\\theta$:

$$
x=\\rho\\sin\\varphi\\cos\\theta,\\quad y=\\rho\\sin\\varphi\\sin\\theta,\\quad z=\\rho\\cos\\varphi,\\quad\\rho^2=x^2+y^2+z^2.
$$

They suit spheres and cones: $\\rho=3$ is a sphere and $\\varphi=\\pi/4$ is a cone. Note that this convention, with $\\varphi$ measured from the $z$-axis, is the mathematics one. Physics books often swap the names of $\\theta$ and $\\varphi$, so check the convention whenever you use another source.

**Worked example 2.** For the point $(1,1,\\sqrt2)$: in cylindrical coordinates $r=\\sqrt2$, $\\theta=\\pi/4$, $z=\\sqrt2$. In spherical, $\\rho=\\sqrt{1+1+2}=2$, $\\cos\\varphi=z/\\rho=\\sqrt2/2$ so $\\varphi=\\pi/4$, and $\\theta=\\pi/4$.

**Worked example 3.** What is $\\rho=2\\cos\\varphi$? Multiply by $\\rho$: $\\rho^2=2\\rho\\cos\\varphi$, so $x^2+y^2+z^2=2z$, which is the sphere $x^2+y^2+(z-1)^2=1$, of radius $1$ resting on the origin.

These systems return in Module 5, where they make integrals over balls, cones and cylinders far easier.`,
          resources: [
            openstax('2-6-quadric-surfaces', 'Quadric surfaces', 'Traces and the six types.', true),
            openstax('2-7-cylindrical-and-spherical-coordinates', 'Cylindrical and spherical coordinates', 'Conversions and surfaces.'),
            paul('CalcIII/QuadricSurfaces', 'Quadric surfaces', 'Pictures of each type.'),
            paul('CalcIII/SphericalCoords', 'Spherical coordinates', 'Conversions with examples.'),
            geogebra,
          ],
          exercises: [
            {
              slug: 'classify-surfaces',
              title: 'Classify surfaces',
              prompt: `Name each surface and describe its traces in planes parallel to the coordinate planes: (a) $4x^2+y^2+z^2=4$, (b) $z^2=x^2+y^2$, (c) $z=x^2-y^2$, (d) $x^2+y^2-z^2=-1$, (e) $y=x^2$. Check one of them by plotting it in GeoGebra.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) ellipsoid. (b) cone. (c) hyperbolic paraboloid. (d) hyperboloid of two sheets, with no points for |z| < 1. (e) parabolic cylinder.',
            },
            {
              slug: 'convert-coordinates',
              title: 'Convert coordinates',
              prompt: `(a) Convert the cylindrical point $(2,2\\pi/3,1)$ to Cartesian. (b) Convert the Cartesian point $(0,-2,2)$ to spherical coordinates. (c) Identify each surface: $r=2\\sin\\theta$ (cylindrical), $\\rho\\sin\\varphi=3$ (spherical), $\\varphi=\\pi/6$ (spherical), $z=r^2$ (cylindrical).`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) (-1, sqrt 3, 1). (b) rho = 2 sqrt 2, phi = pi/4, theta = 3 pi/2. (c) the cylinder x^2 + (y - 1)^2 = 1; the cylinder x^2 + y^2 = 9; the upper half of the cone z = sqrt 3 times sqrt(x^2 + y^2); the paraboloid z = x^2 + y^2.',
            },
            {
              slug: 'saddle-lines',
              title: 'Straight lines on a curved surface',
              prompt: `Fix a number $c$, and consider points of the saddle $z=x^2-y^2$ with $x=c+t$ and $y=c-t$. Find $z$ as a function of $t$, and show that these points form a straight line lying entirely on the surface. Deduce that the saddle contains infinitely many straight lines, and explain why that is useful in architecture.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'x^2 - y^2 = (x - y)(x + y) = (2t)(2c) = 4ct, which is linear in t. So z = 4ct gives a straight line.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the equation $x^2+z^2=4$ describe in space?',
              answerOutline: 'A circular cylinder of radius $2$ around the $y$-axis.',
            },
            {
              question: 'How do you tell a hyperboloid of one sheet from one of two sheets?',
              answerOutline: 'By the sign on the right: with one minus sign on the left, $+1$ gives one sheet and $-1$ gives two.',
            },
            {
              question: 'What is the range of $\\varphi$ in spherical coordinates, and what does $\\varphi=\\pi/2$ describe?',
              answerOutline: '$[0,\\pi]$. $\\varphi=\\pi/2$ is the $xy$-plane.',
            },
          ],
        },
      ],
    },
    {
      slug: 'vector-functions',
      title: 'Vector Functions and Motion',
      description:
        'Curves in space described by vector-valued functions: their derivatives and integrals, their length and bending, and the motion of a particle along them.',
      lessons: [
        {
          slug: 'space-curves',
          title: 'Space curves, derivatives and integrals',
          summary:
            'Vector-valued functions, tangent vectors, the derivative rules for products, and integrating to recover position.',
          estimatedMinutes: 150,
          objectives: [
            'Describe a curve in space by a vector function',
            'Differentiate componentwise and interpret the derivative as a tangent vector',
            'Find unit tangent vectors and tangent lines',
            'Use the product rules for dot and cross products',
            'Integrate a vector function and solve initial value problems',
          ],
          concepts: [
            'Vector-valued function',
            'Space curve',
            'Tangent vector',
            'Unit tangent $\\mathbf T$',
            'Product rules',
            'Vector integral',
          ],
          explanation: `A **vector function** $\\mathbf r(t)=\\langle f(t),g(t),h(t)\\rangle$ assigns a vector to each $t$. Its tips trace a **space curve**, which is the three-dimensional version of a parametric curve. Limits, continuity, derivatives and integrals all work one component at a time.

The **derivative**

$$
\\mathbf r'(t)=\\lim_{h\\to0}\\frac{\\mathbf r(t+h)-\\mathbf r(t)}{h}=\\langle f'(t),g'(t),h'(t)\\rangle
$$

is the limit of secant vectors, so it is **tangent** to the curve and points in the direction of motion. If $t$ is time, it is the velocity. Where $\\mathbf r'(t)\\ne\\mathbf 0$, the **unit tangent** is $\\mathbf T=\\mathbf r'/|\\mathbf r'|$.

**Worked example 1.** The helix $\\mathbf r(t)=\\langle\\cos t,\\sin t,t\\rangle$ winds around the cylinder $x^2+y^2=1$, rising $2\\pi$ per turn. Then

$$
\\mathbf r'(t)=\\langle-\\sin t,\\cos t,1\\rangle,\\qquad|\\mathbf r'(t)|=\\sqrt{\\sin^2t+\\cos^2t+1}=\\sqrt2.
$$

At $t=\\pi/2$, the point is $(0,1,\\pi/2)$, and the tangent line is $\\langle0,1,\\pi/2\\rangle+s\\langle-1,0,1\\rangle$. The unit tangent there is $\\tfrac{1}{\\sqrt2}\\langle-1,0,1\\rangle$.

**Product rules.** For vector functions $\\mathbf u$, $\\mathbf v$ and a scalar function $f$,

$$
(f\\mathbf u)'=f'\\mathbf u+f\\mathbf u',\\quad(\\mathbf u\\cdot\\mathbf v)'=\\mathbf u'\\cdot\\mathbf v+\\mathbf u\\cdot\\mathbf v',\\quad(\\mathbf u\\times\\mathbf v)'=\\mathbf u'\\times\\mathbf v+\\mathbf u\\times\\mathbf v'.
$$

In the cross product rule, keep the order of the factors. Each rule is proved by writing out components and using the ordinary product rule.

**Worked example 2.** If $|\\mathbf r(t)|$ is constant, then $\\mathbf r\\cdot\\mathbf r'=0$. Differentiate $\\mathbf r\\cdot\\mathbf r=c^2$ to get $2\\mathbf r\\cdot\\mathbf r'=0$. Geometrically, a curve on a sphere centred at the origin always moves perpendicular to the radius. The same argument applied to $\\mathbf T$, which has constant length $1$, shows that $\\mathbf T'$ is perpendicular to $\\mathbf T$. That fact defines the normal vector in the next lesson.

**Integrals.** Integrate componentwise: $\\int_a^b\\mathbf r(t)\\,dt=\\left\\langle\\int_a^bf,\\int_a^bg,\\int_a^bh\\right\\rangle$, and an indefinite integral has a constant **vector** $\\mathbf C$. Given acceleration and initial data, two integrations give the position. Each integration produces a constant vector, fixed by initial velocity and position.

**Describing an intersection.** To parametrise the curve where the cylinder $x^2+y^2=1$ meets the plane $y+z=2$, use the cylinder to set $x=\\cos t$ and $y=\\sin t$, then solve the plane for $z=2-\\sin t$. The curve, $\\langle\\cos t,\\sin t,2-\\sin t\\rangle$, is an ellipse.`,
          resources: [
            openstax('3-1-vector-valued-functions-and-space-curves', 'Vector-valued functions and space curves', 'Definitions, limits and sketches.', true),
            openstax('3-2-calculus-of-vector-valued-functions', 'Calculus of vector-valued functions', 'Derivatives, tangent vectors and integrals.'),
            paul('CalcIII/VectorFcnsCalculus', 'Calculus with vector functions', 'Short worked examples.'),
            geogebra,
          ],
          exercises: [
            {
              slug: 'tangent-lines',
              title: 'Tangents',
              prompt: `For $\\mathbf r(t)=\\langle t^2,t^3,e^t\\rangle$, find $\\mathbf r'(t)$, the unit tangent at $t=0$, and the tangent line at $t=1$. For $\\mathbf r(t)=\\langle2\\cos t,2\\sin t,3t\\rangle$, show that the speed is constant, and find the angle between the tangent and the $z$-axis.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'At t = 0, r prime = <0, 0, 1>, which is its own unit tangent. At t = 1 the line is <1, 1, e> + s<2, 3, e>. For the helix the speed is sqrt 13, and cos(angle) = 3/sqrt 13, about 33.7 degrees.',
            },
            {
              slug: 'integrate-vectors',
              title: 'Integrate',
              prompt: `(a) Evaluate $\\int_0^1\\left\\langle t,e^{2t},\\dfrac{1}{1+t^2}\\right\\rangle dt$. (b) Solve $\\mathbf r'(t)=\\langle1,2t,3t^2\\rangle$ with $\\mathbf r(0)=\\langle1,0,-1\\rangle$. (c) A particle has acceleration $\\mathbf a=\\langle0,0,-10\\rangle$, starts at the origin, and has initial velocity $\\langle3,4,20\\rangle$. Find its position, and when and where it returns to the plane $z=0$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) <1/2, (e^2 - 1)/2, pi/4>. (b) <1 + t, t^2, t^3 - 1>. (c) r = <3t, 4t, 20t - 5t^2>, back to z = 0 at t = 4 at (12, 16, 0).',
            },
            {
              slug: 'product-rule-proofs',
              title: 'Prove the product rules',
              prompt: `(a) Prove the cross product rule $(\\mathbf u\\times\\mathbf v)'=\\mathbf u'\\times\\mathbf v+\\mathbf u\\times\\mathbf v'$ from components. (b) Show that $\\dfrac{d}{dt}\\left[\\mathbf r\\cdot(\\mathbf r'\\times\\mathbf r'')\\right]=\\mathbf r\\cdot(\\mathbf r'\\times\\mathbf r''')$. (c) Show that if $\\mathbf r''$ is always parallel to $\\mathbf r$, then $\\mathbf r\\times\\mathbf r'$ is constant.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), two of the three terms are triple products with a repeated vector, which are zero. For (c), differentiate r x r prime.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the geometric meaning of $\\mathbf r\'(t)$?',
              answerOutline: 'A tangent vector to the curve, pointing in the direction of increasing $t$. With $t$ as time, the velocity.',
            },
            {
              question: 'Why is $\\mathbf T\'$ perpendicular to $\\mathbf T$?',
              answerOutline: '$\\mathbf T\\cdot\\mathbf T=1$ is constant, so differentiating gives $2\\mathbf T\\cdot\\mathbf T\'=0$.',
            },
            {
              question: 'What is the constant of integration for a vector function?',
              answerOutline: 'A constant vector, one constant for each component.',
            },
          ],
        },
        {
          slug: 'arc-length-and-curvature',
          title: 'Arc length and curvature',
          summary:
            'The length of a space curve, the arc length parameter, and curvature as the rate at which a curve turns.',
          estimatedMinutes: 170,
          objectives: [
            'Compute the length of a space curve',
            'Reparametrise a curve by arc length',
            'Define curvature and compute it with the cross product formula',
            'Compute the curvature of a plane graph',
            'Find the normal and binormal vectors',
          ],
          concepts: [
            'Arc length',
            'Arc length parameter $s$',
            'Curvature $\\kappa$',
            'Radius of curvature',
            'Normal vector $\\mathbf N$',
            'Binormal vector $\\mathbf B$',
          ],
          explanation: `The length of a curve $\\mathbf r(t)$ for $a\\le t\\le b$, traced once, is the integral of the speed:

$$
L=\\int_a^b|\\mathbf r'(t)|\\,dt.
$$

The **arc length function** $s(t)=\\int_a^t|\\mathbf r'(u)|\\,du$ measures distance along the curve, and $ds/dt=|\\mathbf r'(t)|$. Using $s$ itself as the parameter gives a curve traced at unit speed. It is the natural parameter, because it does not depend on how fast you happen to travel.

**Curvature** measures how fast the direction changes per unit of distance:

$$
\\kappa=\\left|\\frac{d\\mathbf T}{ds}\\right|=\\frac{|\\mathbf T'(t)|}{|\\mathbf r'(t)|}=\\frac{|\\mathbf r'(t)\\times\\mathbf r''(t)|}{|\\mathbf r'(t)|^3}.
$$

The last form is usually the easiest to compute. A straight line has $\\kappa=0$. A circle of radius $R$ has $\\kappa=1/R$, so a tight circle bends more, and $1/\\kappa$ is called the **radius of curvature**. For a plane graph $y=f(x)$,

$$
\\kappa=\\frac{|f''(x)|}{\\left(1+f'(x)^2\\right)^{3/2}}.
$$

**Worked example 1.** For the helix $\\mathbf r(t)=\\langle a\\cos t,a\\sin t,bt\\rangle$, with $a>0$, $\\mathbf r'=\\langle-a\\sin t,a\\cos t,b\\rangle$, so $|\\mathbf r'|=\\sqrt{a^2+b^2}$ and one turn has length $2\\pi\\sqrt{a^2+b^2}$. Also $\\mathbf r''=\\langle-a\\cos t,-a\\sin t,0\\rangle$, and

$$
\\mathbf r'\\times\\mathbf r''=\\langle ab\\sin t,\\ -ab\\cos t,\\ a^2\\rangle,\\qquad|\\mathbf r'\\times\\mathbf r''|=a\\sqrt{a^2+b^2}.
$$

So $\\kappa=\\dfrac{a\\sqrt{a^2+b^2}}{(a^2+b^2)^{3/2}}=\\dfrac{a}{a^2+b^2}$. The curvature is constant. With $b=0$ the helix is a circle and $\\kappa=1/a$. As $b$ grows the helix stretches out and bends less.

**Worked example 2.** For the parabola $y=x^2$, $\\kappa=\\dfrac{2}{(1+4x^2)^{3/2}}$. It is $2$ at the vertex, where the best-fitting circle has radius $\\tfrac12$, and only about $0.179$ at $x=1$.

**The moving frame.** Where $\\mathbf T'\\ne\\mathbf 0$, the **unit normal** $\\mathbf N=\\mathbf T'/|\\mathbf T'|$ points toward the centre of the bend, and the **binormal** $\\mathbf B=\\mathbf T\\times\\mathbf N$ completes a right-handed frame of perpendicular unit vectors. $\\mathbf T$ and $\\mathbf N$ span the plane in which the curve is bending at that instant. Engineers designing roads, railways and roller coasters work with exactly these quantities, since the force a passenger feels depends on curvature, as the next lesson shows.`,
          resources: [
            openstax('3-3-arc-length-and-curvature', 'Arc length and curvature', 'Arc length parameter, curvature, normal and binormal.', true),
            paul('CalcIII/VectorArcLength', 'Arc length with vector functions', 'Including reparametrisation.'),
            paul('CalcIII/Curvature', 'Curvature', 'All the formulas, with examples.'),
          ],
          exercises: [
            {
              slug: 'lengths',
              title: 'Lengths',
              prompt: `(a) Find the length of $\\mathbf r(t)=\\langle2t,t^2,\\ln t\\rangle$ for $1\\le t\\le e$. The speed simplifies to a perfect square. (b) Reparametrise the helix $\\langle\\cos t,\\sin t,t\\rangle$ by arc length from $t=0$, and check that the new curve has unit speed.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) |r prime| = 2t + 1/t, so L = e^2. (b) s = sqrt 2 t, so r(s) = <cos(s/sqrt 2), sin(s/sqrt 2), s/sqrt 2>.',
            },
            {
              slug: 'curvature-drill',
              title: 'Curvature',
              prompt: `(a) Find the curvature of the twisted cubic $\\mathbf r(t)=\\langle t,t^2,t^3\\rangle$ at $t=0$ and at $t=1$. (b) Find where $y=\\sin x$ has its greatest curvature, and the value. (c) Find the point on $y=e^x$ of greatest curvature.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2 at t = 0, and sqrt 76/14^(3/2), about 0.166, at t = 1. (b) At x = pi/2 + k pi, with curvature 1. (c) At x = -(ln 2)/2, about -0.347.',
            },
            {
              slug: 'frame-and-circle',
              title: 'The frame of a helix',
              prompt: `For the helix $\\langle\\cos t,\\sin t,t\\rangle$, compute $\\mathbf T$, $\\mathbf N$ and $\\mathbf B$, and show that $\\mathbf N$ always points horizontally toward the axis of the helix. Then parametrise a circle of radius $R$ by arc length, and show directly from $\\kappa=|d\\mathbf T/ds|$ that its curvature is $1/R$ and that $\\mathbf N$ points to the centre.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'N = <-cos t, -sin t, 0>. B = (1/sqrt 2)<sin t, -cos t, 1>.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is the curvature of a circle of radius $5$?',
              answerOutline: '$1/5$.',
            },
            {
              question: 'Why is arc length the natural parameter?',
              answerOutline: 'It depends only on the shape of the curve, not on the speed at which it is traced.',
            },
            {
              question: 'Which way does $\\mathbf N$ point?',
              answerOutline: 'Toward the inside of the bend, in the direction in which $\\mathbf T$ is turning.',
            },
          ],
        },
        {
          slug: 'motion-in-space',
          title: 'Motion in space',
          summary:
            'Velocity and acceleration of a particle, their tangential and normal parts, projectiles, and circular motion.',
          estimatedMinutes: 170,
          objectives: [
            'Compute velocity, speed and acceleration from position',
            'Split acceleration into tangential and normal components',
            'Relate normal acceleration to curvature',
            'Solve projectile problems from Newton\'s second law',
            'Prove that motion under a central force lies in a plane',
          ],
          concepts: [
            'Velocity, speed, acceleration',
            'Tangential component $a_T$',
            'Normal component $a_N$',
            'Centripetal acceleration',
            'Projectile motion',
            'Central forces',
          ],
          explanation: `For a particle at $\\mathbf r(t)$, the **velocity** is $\\mathbf v=\\mathbf r'$, the **speed** is $|\\mathbf v|$, and the **acceleration** is $\\mathbf a=\\mathbf r''$. Newton's second law $\\mathbf F=m\\mathbf a$ turns forces into a differential equation for $\\mathbf r$.

**Splitting the acceleration.** Write $\\mathbf v=v\\mathbf T$, where $v=|\\mathbf v|$. Differentiating with the product rule, and using $\\mathbf T'=|\\mathbf T'|\\mathbf N=\\kappa v\\mathbf N$, gives

$$
\\mathbf a=\\frac{dv}{dt}\\,\\mathbf T+\\kappa v^2\\,\\mathbf N.
$$

The acceleration lies in the plane of $\\mathbf T$ and $\\mathbf N$. The **tangential** part $a_T=dv/dt$ changes the speed. The **normal** part $a_N=\\kappa v^2$ changes the direction. A driver feels the second as a sideways push in a bend, and it grows with the **square** of the speed. Convenient formulas are

$$
a_T=\\frac{\\mathbf v\\cdot\\mathbf a}{|\\mathbf v|},\\qquad a_N=\\frac{|\\mathbf v\\times\\mathbf a|}{|\\mathbf v|}.
$$

For uniform circular motion of radius $R$, $a_T=0$ and $a_N=v^2/R$, the familiar centripetal acceleration.

**Worked example 1.** For $\\mathbf r(t)=\\langle t,t^2,0\\rangle$ at $t=1$, $\\mathbf v=\\langle1,2,0\\rangle$ and $\\mathbf a=\\langle0,2,0\\rangle$. So $a_T=\\dfrac{4}{\\sqrt5}$ and $a_N=\\dfrac{|\\langle0,0,2\\rangle|}{\\sqrt5}=\\dfrac{2}{\\sqrt5}$. As a check, $a_T^2+a_N^2=\\dfrac{16+4}{5}=4=|\\mathbf a|^2$.

**Worked example 2 (projectile).** A ball is launched from the ground at speed $v_0=20$ m/s and angle $\\alpha=30^\\circ$, ignoring air resistance. With $\\mathbf a=\\langle0,-g\\rangle$ and $g=9.8$ m/s$^2$, integrating twice gives

$$
\\mathbf r(t)=\\left\\langle v_0\\cos\\alpha\\,t,\\ v_0\\sin\\alpha\\,t-\\tfrac12gt^2\\right\\rangle.
$$

It lands when the height is zero, at $t=2v_0\\sin\\alpha/g\\approx2.04$ s. The range is

$$
\\frac{v_0^2\\sin2\\alpha}{g}=\\frac{400\\sin60^\\circ}{9.8}\\approx35.3\\text{ m},
$$

and the greatest height is $\\dfrac{(v_0\\sin\\alpha)^2}{2g}=\\dfrac{100}{19.6}\\approx5.10$ m. For fixed $v_0$ the range is largest at $45^\\circ$.

**Central forces.** If the force always points toward the origin, as gravity from the Sun does, then $\\mathbf r''$ is parallel to $\\mathbf r$, and $\\dfrac{d}{dt}(\\mathbf r\\times\\mathbf v)=\\mathbf v\\times\\mathbf v+\\mathbf r\\times\\mathbf a=\\mathbf 0$. So $\\mathbf h=\\mathbf r\\times\\mathbf v$ is constant. The particle stays in the plane through the origin perpendicular to $\\mathbf h$. This conservation of angular momentum is the first step in deriving Kepler's laws, and its size is twice the rate at which area is swept out, which is the second law.`,
          resources: [
            openstax('3-4-motion-in-space', 'Motion in space', 'Components of acceleration, projectiles and Kepler.', true),
            paul('CalcIII/Velocity_Acceleration', 'Velocity and acceleration', 'Tangential and normal components.'),
            mit1802('The sessions on velocity, acceleration and Kepler\'s second law.'),
          ],
          relatedLessons: ['classical-mechanics/kinematics-and-newtons-laws/vectors-and-kinematics'],
          exercises: [
            {
              slug: 'components-drill',
              title: 'Components of acceleration',
              prompt: `Find the speed, $a_T$ and $a_N$ for each motion: (a) the helix $\\mathbf r=\\langle\\cos t,\\sin t,t\\rangle$, (b) $\\mathbf r=\\langle t,t^2,t^3\\rangle$ at $t=1$. For (b), check that $a_T^2+a_N^2=|\\mathbf a|^2$, and use $a_N=\\kappa v^2$ to recover the curvature found in the previous lesson.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Speed sqrt 2, a_T = 0, a_N = 1. (b) v = <1, 2, 3> and a = <0, 2, 6>. a_T = 22/sqrt 14, a_N = sqrt 76/sqrt 14.',
            },
            {
              slug: 'projectile',
              title: 'Clearing a fence',
              prompt: `A baseball is hit from $1$ m above the ground at $40$ m/s, at an angle of $35^\\circ$ to the horizontal. Ignoring air resistance and taking $g=9.8\\ \\text{m/s}^2$, does it clear a fence $2.5$ m high that is $120$ m away? Find where it lands, and its speed on landing.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'At x = 120 m, t is about 3.66 s and the height about 19.3 m, so it clears. It lands about 154.8 m away, at about 40.2 m/s.',
            },
            {
              slug: 'banked-curve',
              title: 'Cars and planets',
              prompt: `(a) A car rounds a flat curve of radius $50$ m at $20$ m/s. What is its normal acceleration, and what coefficient of friction is needed to hold the road? (b) Using $\\mathbf h=\\mathbf r\\times\\mathbf v$, prove that motion under a central force stays in a plane, and that $|\\mathbf h|=r^2\\,d\\theta/dt$ in polar coordinates in that plane.`,
              kind: 'derivation',
              difficulty: 2,
              hint: '(a) 8 m/s^2, so mu must be at least 8/9.8, about 0.82. (b) In the plane, write r = r<cos theta, sin theta, 0> and compute r x v.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does each component of acceleration do?',
              answerOutline: 'The tangential part changes speed. The normal part changes direction.',
            },
            {
              question: 'If you double your speed around the same bend, how does the normal acceleration change?',
              answerOutline: 'It is multiplied by four, since $a_N=\\kappa v^2$.',
            },
            {
              question: 'Why does a central force give planar motion?',
              answerOutline: '$\\mathbf r\\times\\mathbf v$ is constant, so $\\mathbf r$ is always perpendicular to a fixed vector.',
            },
          ],
        },
      ],
      project: {
        slug: 'roller-coaster-loop',
        title: 'Design a roller coaster loop',
        description: `A circular vertical loop gives riders a dangerous jolt: the curvature jumps from zero on the straight approach to $1/R$ at the start of the circle, so the normal acceleration jumps too. Real loops use curves whose curvature grows gradually. Model a car entering a loop at the bottom with a known speed, and use conservation of energy, $v^2=v_0^2-2gh$, for the speed at height $h$. For a circular loop and for a teardrop loop built from a curve of your choice (for example a clothoid, whose curvature grows in proportion to arc length, or a curve made from pieces you can handle by hand), compute the curvature along the track, and the normal acceleration felt by a rider in units of $g$. Find the smallest entry speed for which the car stays on the track at the top, and compare the greatest force on the riders for the two designs.`,
        deliverables: [
          'A parametrisation of each loop, with a plot',
          'The curvature as a function of position along each track, computed by hand where possible and numerically otherwise',
          'The normal acceleration felt by a rider along each track, in units of g',
          'The minimum entry speed for each loop, with a derivation',
          'A short comparison of the designs, explaining why real coasters avoid circular loops',
        ],
        estimatedHours: 6,
        stretchGoals: ['Add the tangential component of gravity, and plot the total force on a rider as a vector along the track'],
      },
    },
    {
      slug: 'partial-derivatives',
      title: 'Partial Derivatives',
      description:
        'How functions of several variables change: limits, partial derivatives, tangent planes, the chain rule, and the gradient that points uphill.',
      lessons: [
        {
          slug: 'functions-and-limits',
          title: 'Functions of several variables and limits',
          summary:
            'Graphs and level curves, and why limits in two variables are harder than in one.',
          estimatedMinutes: 150,
          objectives: [
            'Find the domain of a function of two or three variables',
            'Read level curves and contour maps',
            'Show that a limit fails by finding two paths with different limits',
            'Prove that a limit exists with inequalities or polar coordinates',
            'State what continuity means for functions of several variables',
          ],
          concepts: [
            'Function of several variables',
            'Graph and level curve',
            'Contour map',
            'Limit along a path',
            'Two-path test',
            'Continuity',
          ],
          explanation: `A function $f(x,y)$ assigns a number to each point of a region in the plane. Its graph $z=f(x,y)$ is a surface. Often more useful is a **contour map**: the **level curves** $f(x,y)=k$ drawn for equally spaced values of $k$, as on a hiking map. Where contours crowd together, the function changes quickly. For a function of three variables, $f(x,y,z)=k$ gives **level surfaces**, such as surfaces of equal temperature.

**Limits.** We say $\\lim_{(x,y)\\to(a,b)}f(x,y)=L$ if $f(x,y)$ is close to $L$ whenever $(x,y)$ is close to $(a,b)$, but not equal to it. Precisely: for every $\\varepsilon>0$ there is $\\delta>0$ with $|f(x,y)-L|<\\varepsilon$ whenever $0<\\sqrt{(x-a)^2+(y-b)^2}<\\delta$.

In one variable there are only two directions of approach. In the plane there are infinitely many paths, and the limit must be the same along all of them. That gives a simple test for failure: if two paths give different values, there is no limit.

**Worked example 1.** For $f(x,y)=\\dfrac{xy}{x^2+y^2}$ at the origin, along the line $y=mx$ we get

$$
f(x,mx)=\\frac{mx^2}{(1+m^2)x^2}=\\frac{m}{1+m^2}.
$$

This depends on $m$: it is $0$ along the $x$-axis and $\\tfrac12$ along $y=x$. So the limit does not exist.

Checking lines alone is **not** enough. For $g(x,y)=\\dfrac{xy^2}{x^2+y^4}$, every straight line through the origin gives the limit $0$, yet along the parabola $x=y^2$ we get $g=\\dfrac{y^4}{2y^4}=\\tfrac12$. So again there is no limit.

**Proving that a limit exists** needs an inequality that controls every path at once.

**Worked example 2.** Show that $\\lim_{(x,y)\\to(0,0)}\\dfrac{x^2y}{x^2+y^2}=0$. Since $x^2\\le x^2+y^2$,

$$
\\left|\\frac{x^2y}{x^2+y^2}\\right|\\le|y|\\to0,
$$

and the squeeze theorem gives the limit $0$. Polar coordinates often help too. With $x=r\\cos\\theta$ and $y=r\\sin\\theta$, the expression is $r\\cos^2\\theta\\sin\\theta$, which is at most $r$ in size, whatever $\\theta$ is. The key is that the bound must be independent of $\\theta$.

**Continuity.** $f$ is continuous at $(a,b)$ if its limit there equals $f(a,b)$. Polynomials are continuous everywhere, and sums, products, quotients (away from zeros of the denominator) and compositions of continuous functions are continuous. So, as in one variable, most limits are found by substitution, and the work is at the special points where formulas break down.`,
          resources: [
            openstax('4-1-functions-of-several-variables', 'Functions of several variables', 'Domains, graphs and level curves.', true),
            openstax('4-2-limits-and-continuity', 'Limits and continuity', 'Paths, the two-path test and polar arguments.'),
            paul('CalcIII/MultiVrbleFcns', 'Functions of several variables', 'Level curves and surfaces.'),
            paul('CalcIII/Limits', 'Limits', 'Path arguments with examples.'),
          ],
          exercises: [
            {
              slug: 'domains-and-contours',
              title: 'Domains and level curves',
              prompt: `Describe the domain and sketch several level curves of each function: (a) $\\sqrt{9-x^2-y^2}$, (b) $\\ln(x-y)$, (c) $y-x^2$. Then describe the level surfaces of $x^2+y^2+z^2$ and of $x^2+y^2-z$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) The closed disk of radius 3, with circular level curves. (b) The half-plane x > y, with lines y = x - e^k. (c) All of the plane, with parabolas y = x^2 + k. Spheres, and paraboloids.',
            },
            {
              slug: 'two-variable-limits',
              title: 'Limits in two variables',
              prompt: `Find each limit or show that it does not exist: (a) $\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{x^2-y^2}{x^2+y^2}$, (b) $\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{x^3+y^3}{x^2+y^2}$, (c) $\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{xy}{\\sqrt{x^2+y^2}}$, (d) $\\lim\\limits_{(x,y)\\to(1,2)}\\dfrac{x^2y}{x+y}$, (e) $\\lim\\limits_{(x,y)\\to(0,0)}\\dfrac{\\sin(x^2+y^2)}{x^2+y^2}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) does not exist: 1 along the x-axis, -1 along the y-axis. (b) 0, using polar coordinates. (c) 0. (d) 2/3. (e) 1, with u = x^2 + y^2.',
            },
            {
              slug: 'lines-are-not-enough',
              title: 'Lines are not enough',
              prompt: `For $g(x,y)=\\dfrac{xy^2}{x^2+y^4}$, with $g(0,0)=0$, show that the limit at the origin along every line through the origin is $0$, and that along the parabola $x=y^2$ it is $\\tfrac12$. Is $g$ continuous at the origin? Give a second function for which the same thing happens with the curve $y=x^3$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Along y = mx the value is m^2 x/(1 + m^4 x^2), which tends to 0. Treat the y-axis separately. For the second, try x^3 y/(x^6 + y^2).',
            },
          ],
          selfAssessment: [
            {
              question: 'How do you show that a two-variable limit does not exist?',
              answerOutline: 'Find two paths to the point along which the function has different limits.',
            },
            {
              question: 'If the limit is $0$ along every line through the point, must the limit be $0$?',
              answerOutline: 'No. A curved path can give a different value.',
            },
            {
              question: 'What does a crowded set of level curves mean?',
              answerOutline: 'The function changes rapidly there, like a steep slope on a hiking map.',
            },
          ],
        },
        {
          slug: 'partial-derivatives',
          title: 'Partial derivatives',
          summary:
            'Rates of change in one variable at a time, higher partial derivatives, and Clairaut\'s theorem.',
          estimatedMinutes: 160,
          objectives: [
            'Define and compute partial derivatives',
            'Interpret them as slopes of traces and as rates',
            'Compute higher and mixed partials',
            'State Clairaut\'s theorem with its hypothesis',
            'Check that a function satisfies a partial differential equation',
          ],
          concepts: [
            'Partial derivative',
            'Notation $f_x$, $\\partial f/\\partial x$',
            'Slope of a trace',
            'Second and mixed partials',
            'Clairaut\'s theorem',
            'Partial differential equations',
          ],
          explanation: `To see how $f(x,y)$ changes as $x$ alone changes, hold $y$ fixed and differentiate:

$$
f_x(a,b)=\\frac{\\partial f}{\\partial x}(a,b)=\\lim_{h\\to0}\\frac{f(a+h,b)-f(a,b)}{h}.
$$

Similarly for $f_y$. Geometrically, $f_x(a,b)$ is the slope of the curve cut from the surface by the plane $y=b$. In practice you compute it with the usual rules, treating the other variables as constants.

**Worked example 1.** Let $f(x,y)=x^3y^2+\\sin(xy)$. Then

$$
f_x=3x^2y^2+y\\cos(xy),\\qquad f_y=2x^3y+x\\cos(xy).
$$

**Higher derivatives.** Differentiating again gives $f_{xx}$, $f_{yy}$ and the mixed partials $f_{xy}=(f_x)_y$ and $f_{yx}=(f_y)_x$. Continuing the example,

$$
f_{xy}=6x^2y+\\cos(xy)-xy\\sin(xy)=f_{yx}.
$$

The two mixed partials agree, which is no coincidence.

**Clairaut's theorem.** If $f_{xy}$ and $f_{yx}$ are both continuous on an open disk around $(a,b)$, then $f_{xy}(a,b)=f_{yx}(a,b)$.

The hypothesis is needed. There are functions whose mixed partials exist at a point and differ there, and one is in the exercises. For the functions you usually meet, built from elementary functions away from problem points, the theorem applies, and the order of differentiation does not matter.

**Worked example 2.** For an ideal gas, $PV=nRT$ with $n$ and $R$ constant. Each variable is a function of the other two, and

$$
\\frac{\\partial P}{\\partial V}=-\\frac{nRT}{V^2},\\quad\\frac{\\partial V}{\\partial T}=\\frac{nR}{P},\\quad\\frac{\\partial T}{\\partial P}=\\frac{V}{nR}.
$$

Their product is $-\\dfrac{nRT}{PV}=-1$, not $+1$. The tempting cancellation of the symbols $\\partial P$, $\\partial V$, $\\partial T$ is wrong, because each partial derivative holds a different variable fixed. Partial derivative notation is not a fraction, and in thermodynamics people write the fixed variable as a subscript to keep track.

**Partial differential equations.** Physical laws often take the form of equations in partial derivatives. The heat equation $u_t=ku_{xx}$ describes diffusion, the wave equation $u_{tt}=c^2u_{xx}$ describes waves, and Laplace's equation $u_{xx}+u_{yy}=0$ describes steady states. You can check whether a given function solves one by computing the partials. Solving them in general is the subject of a later course.`,
          resources: [
            openstax('4-3-partial-derivatives', 'Partial derivatives', 'Definitions, higher derivatives and Clairaut.', true),
            paul('CalcIII/PartialDerivatives', 'Partial derivatives', 'Computing them, with interpretation.'),
            paul('CalcIII/HighOrderPartialDerivs', 'Higher order partial derivatives', 'Mixed partials and Clairaut.'),
          ],
          exercises: [
            {
              slug: 'partials-drill',
              title: 'Partials drill',
              prompt: `Find all first partial derivatives of each function: (a) $x^2e^{xy}$, (b) $\\ln(x^2+y^2)$, (c) $\\arctan(y/x)$, (d) $w=xyz+x^2z^3$. For (a), also find $f_{xy}$ and $f_{yx}$, and check that they agree.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) f_x = (2x + x^2 y)e^(xy), f_y = x^3 e^(xy), and f_xy = f_yx = (3x^2 + x^3 y)e^(xy). (b) 2x/(x^2 + y^2), 2y/(x^2 + y^2). (c) -y/(x^2 + y^2), x/(x^2 + y^2). (d) yz + 2xz^3, xz, xy + 3x^2 z^2.',
            },
            {
              slug: 'check-pdes',
              title: 'Check partial differential equations',
              prompt: `(a) Show that $u=\\ln(x^2+y^2)$ satisfies Laplace's equation away from the origin. (b) Show that $u=e^{-kt}\\sin x$ satisfies the heat equation $u_t=ku_{xx}$. (c) For which constants $a$ does $u=\\sin(x-at)$ satisfy the wave equation $u_{tt}=4u_{xx}$?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(c) a = 2 or a = -2.',
            },
            {
              slug: 'clairaut-fails',
              title: 'When Clairaut fails',
              prompt: `Let $f(x,y)=\\dfrac{xy(x^2-y^2)}{x^2+y^2}$ for $(x,y)\\ne(0,0)$ and $f(0,0)=0$. (a) Show from the definition that $f_x(0,y)=-y$ and $f_y(x,0)=x$. (b) Deduce that $f_{xy}(0,0)=-1$ and $f_{yx}(0,0)=1$. (c) Which hypothesis of Clairaut's theorem fails?`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a), f(h, y)/h tends to -y as h tends to 0 when y is fixed. The mixed partials are not continuous at the origin.',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $f_x(a,b)$ geometrically?',
              answerOutline: 'The slope of the trace of the surface in the plane $y=b$, at $x=a$.',
            },
            {
              question: 'When are mixed partials equal?',
              answerOutline: 'When they are continuous near the point, by Clairaut\'s theorem.',
            },
            {
              question: 'Why is $\\frac{\\partial P}{\\partial V}\\frac{\\partial V}{\\partial T}\\frac{\\partial T}{\\partial P}$ equal to $-1$, not $1$?',
              answerOutline: 'Each derivative holds a different variable fixed, so the symbols cannot be cancelled like fractions.',
            },
          ],
        },
        {
          slug: 'tangent-planes-and-linear-approximation',
          title: 'Tangent planes and linear approximation',
          summary:
            'The plane that best fits a surface, what differentiability really means, and propagating errors with differentials.',
          estimatedMinutes: 160,
          objectives: [
            'Write the tangent plane to a graph',
            'Use the linearisation to estimate values',
            'State what differentiability means and give a sufficient condition',
            'Use the total differential to estimate errors',
          ],
          concepts: [
            'Tangent plane',
            'Linearisation',
            'Differentiability',
            'Continuous partials theorem',
            'Total differential',
            'Error propagation',
          ],
          explanation: `If $f$ has continuous partial derivatives near $(a,b)$, the surface $z=f(x,y)$ looks more and more like a plane as you zoom in. That plane is the **tangent plane**:

$$
z=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b).
$$

It contains the tangent lines of both traces, which is why those two slopes determine it. The right side is the **linearisation** $L(x,y)$, and $f(x,y)\\approx L(x,y)$ near $(a,b)$.

**Worked example 1.** Estimate $\\sqrt{3.02^2+3.97^2}$. Take $f(x,y)=\\sqrt{x^2+y^2}$ at $(3,4)$, where $f=5$, $f_x=x/f=\\tfrac35$ and $f_y=\\tfrac45$. Then

$$
f(3.02,3.97)\\approx5+\\tfrac35(0.02)+\\tfrac45(-0.03)=5+0.012-0.024=4.988.
$$

The true value is $4.98812\\ldots$

**Differentiability.** In two variables, the existence of partial derivatives is a weak condition. They see only two directions. We call $f$ **differentiable** at $(a,b)$ if the error $f-L$ shrinks faster than the distance to $(a,b)$:

$$
\\frac{f(x,y)-L(x,y)}{\\sqrt{(x-a)^2+(y-b)^2}}\\to0.
$$

The function $xy/(x^2+y^2)$, with value $0$ at the origin, has both partials at the origin equal to $0$, yet it is not even continuous there, so it has no tangent plane. The useful result is this: **if $f_x$ and $f_y$ exist near $(a,b)$ and are continuous at $(a,b)$, then $f$ is differentiable there.** That is the condition to check in practice.

**Differentials.** With $dx$ and $dy$ small changes, the **total differential** is

$$
dz=f_x\\,dx+f_y\\,dy,
$$

which estimates the change $\\Delta z$. It is the natural tool for errors that come from several measurements.

**Worked example 2.** A cylinder is measured as having radius $r=3\\pm0.05$ cm and height $h=10\\pm0.1$ cm. With $V=\\pi r^2h$,

$$
dV=2\\pi rh\\,dr+\\pi r^2\\,dh=2\\pi(30)(0.05)+\\pi(9)(0.1)=3.9\\pi\\approx12.3\\ \\text{cm}^3,
$$

compared with $V=90\\pi\\approx283\\ \\text{cm}^3$, a relative error of about $4.3\\%$. Dividing by $V$ gives $\\dfrac{dV}{V}=2\\dfrac{dr}{r}+\\dfrac{dh}{h}=2(1.67\\%)+1\\%$. The radius contributes most because it appears squared. Taking both errors at their worst, with the same sign, gives this upper bound. Errors that are random and independent usually combine less badly, as you will meet in statistics.`,
          resources: [
            openstax('4-4-tangent-planes-and-linear-approximations', 'Tangent planes and linear approximations', 'Differentiability and differentials.', true),
            paul('CalcIII/TangentPlanes', 'Tangent planes and linear approximations', 'Worked examples.'),
            khan('The videos on tangent planes and local linearisation.'),
          ],
          exercises: [
            {
              slug: 'tangent-plane-drill',
              title: 'Tangent planes',
              prompt: `Find the tangent plane at the given point: (a) $z=x^2+y^2$ at $(1,2,5)$, (b) $z=xe^y$ at $(1,0,1)$, (c) $z=\\ln(x-2y)$ at $(3,1,0)$. Then use the linearisation of $f(x,y)=x^2y^3$ at $(2,1)$ to estimate $f(2.01,0.98)$, and compare with the true value.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) z = 5 + 2(x - 1) + 4(y - 2). (b) z = x + y. (c) z = x - 2y - 1. The estimate is 3.80, against a true value of about 3.8025.',
            },
            {
              slug: 'error-propagation',
              title: 'Error propagation',
              prompt: `(a) Two resistors $R_1=10\\pm0.1\\ \\Omega$ and $R_2=20\\pm0.2\\ \\Omega$ are in parallel, with $R=\\dfrac{R_1R_2}{R_1+R_2}$. Find $R$ and estimate the largest error with differentials. (b) The period of a pendulum is $T=2\\pi\\sqrt{L/g}$. If $L$ is measured with error $1\\%$ and $T$ with error $0.5\\%$, what is the largest relative error in $g$ computed from them?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) R = 20/3, about 6.667 ohms, with error about 0.067 ohms. (b) g = 4 pi^2 L/T^2, so dg/g = dL/L - 2 dT/T, at worst 1% + 1% = 2%.',
            },
            {
              slug: 'not-differentiable',
              title: 'Partials without differentiability',
              prompt: `Let $f(x,y)=\\dfrac{xy}{x^2+y^2}$ with $f(0,0)=0$. Show from the definition that $f_x(0,0)=f_y(0,0)=0$. Show that $f$ is not continuous at the origin, and explain why it therefore cannot be differentiable there. Then find a function that is continuous at the origin and has both partials there, yet is not differentiable: try $\\sqrt{|xy|}$, and look along the line $y=x$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For sqrt|xy|, both partials at 0 are 0, so L = 0. Along y = x the error is |x|, which does not shrink faster than the distance sqrt 2 |x|.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write the tangent plane to $z=f(x,y)$ at $(a,b)$.',
              answerOutline: '$z=f(a,b)+f_x(a,b)(x-a)+f_y(a,b)(y-b)$.',
            },
            {
              question: 'Does the existence of $f_x$ and $f_y$ at a point imply differentiability?',
              answerOutline: 'No. Continuity of the partials near the point is a sufficient condition.',
            },
            {
              question: 'What does the total differential estimate?',
              answerOutline: 'The change in $f$ produced by small changes $dx$ and $dy$.',
            },
          ],
        },
        {
          slug: 'chain-rule',
          title: 'The chain rule',
          summary:
            'Rates through chains of dependence, tree diagrams, and implicit differentiation in several variables.',
          estimatedMinutes: 160,
          objectives: [
            'Apply the chain rule when the variables depend on one parameter',
            'Apply it when they depend on several parameters',
            'Draw a tree diagram for a chain of dependence',
            'Differentiate implicitly with partial derivatives',
            'Change variables in a differential equation',
          ],
          concepts: [
            'Chain rule, one parameter',
            'Chain rule, several parameters',
            'Tree diagram',
            'Implicit differentiation',
            'Change of variables',
          ],
          explanation: `If $z=f(x,y)$ is differentiable and $x=x(t)$, $y=y(t)$ are differentiable, then

$$
\\frac{dz}{dt}=\\frac{\\partial f}{\\partial x}\\frac{dx}{dt}+\\frac{\\partial f}{\\partial y}\\frac{dy}{dt}.
$$

It is the linearisation in action: a small change $dt$ moves $x$ by $x'\\,dt$ and $y$ by $y'\\,dt$, and each movement changes $z$ at its own rate. Using the gradient of Lesson 5, this is $\\dfrac{dz}{dt}=\\nabla f\\cdot\\mathbf r'(t)$.

When $x$ and $y$ depend on two variables $s$ and $t$, the same rule applies for each one, holding the other fixed:

$$
\\frac{\\partial z}{\\partial s}=\\frac{\\partial z}{\\partial x}\\frac{\\partial x}{\\partial s}+\\frac{\\partial z}{\\partial y}\\frac{\\partial y}{\\partial s}.
$$

A **tree diagram** keeps track: put $z$ at the top, the intermediate variables in the middle and the parameters at the bottom. To find $\\partial z/\\partial s$, add up, over every path from $z$ down to $s$, the product of the derivatives along the path.

**Worked example 1.** Let $z=x^2y+3xy^4$ with $x=\\sin2t$ and $y=\\cos t$. Find $dz/dt$ at $t=0$. At $t=0$, $x=0$ and $y=1$. The partials there are $z_x=2xy+3y^4=3$ and $z_y=x^2+12xy^3=0$. Also $x'=2\\cos2t=2$ and $y'=-\\sin t=0$. So

$$
\\frac{dz}{dt}=3\\cdot2+0\\cdot0=6.
$$

**Implicit differentiation.** Suppose $F(x,y)=0$ defines $y$ as a function of $x$. Differentiating $F(x,y(x))=0$ by the chain rule gives $F_x+F_y\\,y'=0$, so

$$
\\frac{dy}{dx}=-\\frac{F_x}{F_y}\\quad(F_y\\ne0).
$$

This is the formula behind the Calculus I method. Likewise, if $F(x,y,z)=0$ defines $z$ as a function of $x$ and $y$, then $\\dfrac{\\partial z}{\\partial x}=-\\dfrac{F_x}{F_z}$ and $\\dfrac{\\partial z}{\\partial y}=-\\dfrac{F_y}{F_z}$.

**Worked example 2.** For $x^3+y^3+z^3+6xyz=1$, with $F$ the left side minus $1$,

$$
\\frac{\\partial z}{\\partial x}=-\\frac{3x^2+6yz}{3z^2+6xy}=-\\frac{x^2+2yz}{z^2+2xy}.
$$

Note the minus sign. It comes from moving $F_x$ across. Forgetting it is the classic error.

**Changing variables.** The chain rule converts derivatives between coordinate systems, for example from $x,y$ to polar $r,\\theta$, or a wave equation from $x,t$ to $u=x-ct$ and $v=x+ct$. In the second case the wave equation becomes $\\dfrac{\\partial^2z}{\\partial u\\,\\partial v}=0$, whose solutions are $f(u)+g(v)$: every wave is a sum of one wave moving right and one moving left. Changes like these are routine in physics, and the chain rule is the only tool needed.`,
          resources: [
            openstax('4-5-the-chain-rule', 'The chain rule', 'Tree diagrams and implicit differentiation.', true),
            paul('CalcIII/ChainRule', 'Chain rule', 'All the cases, with examples.'),
          ],
          exercises: [
            {
              slug: 'chain-drill',
              title: 'Chain rule drill',
              prompt: `(a) For $w=xy+yz+zx$ with $x=t$, $y=t^2$, $z=t^3$, find $dw/dt$ by the chain rule, and check by substituting first. (b) For $z=e^x\\sin y$ with $x=st^2$ and $y=s^2t$, find $\\partial z/\\partial s$ and $\\partial z/\\partial t$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) dw/dt = 3t^2 + 4t^3 + 5t^4. (b) z_s = e^x (t^2 sin y + 2st cos y), z_t = e^x (2st sin y + s^2 cos y), with x = st^2 and y = s^2 t.',
            },
            {
              slug: 'implicit-partials',
              title: 'Implicit partial derivatives',
              prompt: `(a) For $x^2+y^2+z^2=3xyz$, find $\\partial z/\\partial x$ and $\\partial z/\\partial y$ at $(1,1,1)$. (b) For $x\\cos y+y\\cos z+z\\cos x=1$, write $\\partial z/\\partial x$ in terms of $x,y,z$. (c) Use $dy/dx=-F_x/F_y$ to find the slope of $x^3+y^3=6xy$ at $(3,3)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) Both are -1. (b) -(cos y - z sin x)/(-y sin z + cos x). (c) -1.',
            },
            {
              slug: 'change-variables',
              title: 'Change of variables',
              prompt: `(a) Show that $z=f(x-ct)+g(x+ct)$ satisfies the wave equation $z_{tt}=c^2z_{xx}$ for any twice differentiable $f$ and $g$. (b) If $z=f(x,y)$ with $x=r\\cos\\theta$ and $y=r\\sin\\theta$, prove that $z_x^2+z_y^2=z_r^2+\\dfrac{1}{r^2}z_\\theta^2$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (b), write z_r and z_theta in terms of z_x and z_y, then square and add.',
            },
          ],
          selfAssessment: [
            {
              question: 'Write the chain rule for $z=f(x,y)$ with $x,y$ functions of $t$.',
              answerOutline: '$dz/dt=f_x\\,x\'(t)+f_y\\,y\'(t)$.',
            },
            {
              question: 'Where does the minus sign in $dy/dx=-F_x/F_y$ come from?',
              answerOutline: 'From $F_x+F_yy\'=0$, solved for $y\'$.',
            },
            {
              question: 'How do you read off a chain rule from a tree diagram?',
              answerOutline: 'Multiply the derivatives along each path from the top to the variable, and add over all paths.',
            },
          ],
        },
        {
          slug: 'gradient-and-directional-derivatives',
          title: 'Directional derivatives and the gradient',
          summary:
            'The rate of change in any direction, the gradient vector, and its relation to level curves and surfaces.',
          estimatedMinutes: 170,
          objectives: [
            'Compute a directional derivative with the gradient',
            'Find the direction and size of the greatest rate of increase',
            'Explain why the gradient is perpendicular to level sets',
            'Find tangent planes and normal lines to level surfaces',
          ],
          concepts: [
            'Directional derivative',
            'Gradient vector $\\nabla f$',
            'Direction of steepest ascent',
            'Gradient perpendicular to level sets',
            'Tangent plane to a level surface',
          ],
          explanation: `The partial derivatives give rates of change along the axes. For the rate in the direction of a **unit** vector $\\mathbf u=\\langle a,b\\rangle$, move along the line $(x_0+ta,\\ y_0+tb)$ and use the chain rule:

$$
D_{\\mathbf u}f=f_xa+f_yb=\\nabla f\\cdot\\mathbf u,
$$

where the **gradient** is the vector of partial derivatives:

$$
\\nabla f=\\langle f_x,f_y\\rangle,\\quad\\text{or}\\quad\\langle f_x,f_y,f_z\\rangle\\text{ in three variables}.
$$

The direction must be a unit vector. If you are given $\\langle3,4\\rangle$, divide by its length $5$ first.

**What the gradient tells you.** Since $\\nabla f\\cdot\\mathbf u=|\\nabla f|\\cos\\theta$:

- $f$ increases fastest in the direction of $\\nabla f$, at rate $|\\nabla f|$.
- It decreases fastest in the direction of $-\\nabla f$.
- The rate is zero in directions perpendicular to $\\nabla f$, which are the directions along the level curve.

So **$\\nabla f$ is perpendicular to the level curves of $f$**, and in three variables to its level surfaces. On a contour map, the gradient points straight uphill, across the contours, and it is longest where contours are closest together. Water runs down a hill in the direction of $-\\nabla f$.

**Worked example 1.** For $f(x,y)=x^2+3xy$ at $(1,2)$, in the direction of $\\langle3,4\\rangle$: $\\nabla f=\\langle2x+3y,\\ 3x\\rangle=\\langle8,3\\rangle$, and $\\mathbf u=\\langle\\tfrac35,\\tfrac45\\rangle$, so

$$
D_{\\mathbf u}f=\\frac{24}{5}+\\frac{12}{5}=\\frac{36}{5}.
$$

The largest possible rate at that point is $|\\nabla f|=\\sqrt{73}\\approx8.54$, in the direction of $\\langle8,3\\rangle$.

**Tangent planes to level surfaces.** If a surface is given as $F(x,y,z)=k$, the gradient $\\nabla F(P)$ is normal to it at $P$. So the tangent plane is

$$
F_x(P)(x-x_0)+F_y(P)(y-y_0)+F_z(P)(z-z_0)=0.
$$

This handles surfaces that are not graphs, such as spheres. A graph $z=f(x,y)$ is the level surface $F=f(x,y)-z=0$, which recovers the earlier formula.

**Worked example 2.** Find the tangent plane to the ellipsoid $\\dfrac{x^2}{4}+y^2+\\dfrac{z^2}{9}=3$ at $(-2,1,-3)$. The point is on the surface, since $1+1+1=3$. The gradient is $\\nabla F=\\langle x/2,\\ 2y,\\ 2z/9\\rangle=\\langle-1,2,-\\tfrac23\\rangle$, so the plane is

$$
-(x+2)+2(y-1)-\\tfrac23(z+3)=0,
$$

or $3x-6y+2z+18=0$. The **normal line** goes through the point in the direction of the gradient.

The gradient joins the ideas of this module: linearisation is $f(\\mathbf x)\\approx f(\\mathbf a)+\\nabla f(\\mathbf a)\\cdot(\\mathbf x-\\mathbf a)$, and the chain rule is $\\dfrac{d}{dt}f(\\mathbf r(t))=\\nabla f\\cdot\\mathbf r'$.`,
          resources: [
            openstax('4-6-directional-derivatives-and-the-gradient', 'Directional derivatives and the gradient', 'Including tangent planes to level surfaces.', true),
            paul('CalcIII/DirectionalDeriv', 'Directional derivatives', 'The gradient and its properties.'),
            paul('CalcIII/GradientVectorTangentPlane', 'Gradient vector, tangent planes and normal lines', 'Level surfaces.'),
            khan('The gradient videos, which give the uphill picture.'),
          ],
          relatedLessons: ['math-methods/multivariable-calculus/partial-derivatives-and-gradient'],
          exercises: [
            {
              slug: 'directional-drill',
              title: 'Directional derivatives',
              prompt: `(a) Find the derivative of $f(x,y)=xe^y+\\cos(xy)$ at $(2,0)$ in the direction of $\\langle3,-4\\rangle$. (b) The temperature in a plate is $T=\\dfrac{100}{1+x^2+y^2}$. At $(1,2)$, in which direction does it increase fastest, and at what rate? In which directions does it not change at all?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) The gradient is <1, 2>, so the answer is (3 - 8)/5 = -1. (b) The gradient is <-50/9, -100/9>, so the fastest increase is toward the origin, in the direction of <-1, -2>, at rate 50 sqrt(5)/9, about 12.4. No change along +-<2, -1>.',
            },
            {
              slug: 'level-surface-planes',
              title: 'Tangent planes to level surfaces',
              prompt: `(a) Find the tangent plane and normal line to the cone $z^2=x^2+y^2$ at $(3,4,5)$. Why does the plane pass through the origin? (b) Find the points on the surface $x^2+2y^2+3z^2=12$ where the tangent plane is parallel to the plane $x+y+z=1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 3x + 4y - 5z = 0, with normal line (3, 4, 5) + t<3, 4, -5>. A cone is made of lines through its vertex. (b) The gradient <2x, 4y, 6z> must be parallel to <1, 1, 1>, so x = 2y = 3z. Substituting gives the two points (6, 3, 2) times sqrt(2/11) and (-6, -3, -2) times sqrt(2/11).',
            },
            {
              slug: 'gradient-theory',
              title: 'Why the gradient is perpendicular',
              prompt: `(a) Let $\\mathbf r(t)$ be any curve lying in the level surface $F(x,y,z)=k$. Differentiate $F(\\mathbf r(t))=k$ and use the chain rule to prove that $\\nabla F$ is perpendicular to $\\mathbf r'(t)$. (b) Show that the largest directional derivative at a point is $|\\nabla f|$, using the Cauchy-Schwarz inequality. (c) If $\\nabla f=\\mathbf 0$ at a point, what can you say about every directional derivative there?`,
              kind: 'derivation',
              difficulty: 2,
              hint: '(c) They are all zero: the point is a critical point.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why must $\\mathbf u$ be a unit vector in $D_{\\mathbf u}f=\\nabla f\\cdot\\mathbf u$?',
              answerOutline: 'The directional derivative is a rate per unit of distance. A longer vector would scale the answer.',
            },
            {
              question: 'In which direction does $f$ decrease fastest?',
              answerOutline: 'In the direction of $-\\nabla f$, at rate $|\\nabla f|$.',
            },
            {
              question: 'How is $\\nabla f$ related to the level curves of $f$?',
              answerOutline: 'It is perpendicular to them at every point where it is not zero.',
            },
          ],
        },
      ],
    },
    {
      slug: 'optimisation',
      title: 'Optimisation in Several Variables',
      description:
        'Finding maxima and minima of functions of two or more variables, on open regions, on closed and bounded regions, and subject to constraints.',
      lessons: [
        {
          slug: 'critical-points',
          title: 'Critical points and the second derivative test',
          summary:
            'Where the gradient vanishes, and how the second partial derivatives tell maxima, minima and saddles apart.',
          estimatedMinutes: 170,
          objectives: [
            'Find critical points by solving $\\nabla f=\\mathbf 0$',
            'Classify them with the second derivative test',
            'Recognise when the test is inconclusive',
            'Derive the least squares line as a minimisation problem',
          ],
          concepts: [
            'Local maximum and minimum',
            'Critical point',
            'Saddle point',
            'Discriminant $D=f_{xx}f_{yy}-f_{xy}^2$',
            'Inconclusive case',
            'Least squares',
          ],
          explanation: `If $f$ has a local maximum or minimum at an interior point where its partial derivatives exist, then both partials are zero there, since each one-variable trace has a peak or valley. So we look at **critical points**, where $\\nabla f=\\mathbf 0$ or a partial derivative fails to exist.

A critical point need not be an extremum. At a **saddle point**, the function rises in some directions and falls in others, like $z=x^2-y^2$ at the origin, which is a minimum along the $x$-axis and a maximum along the $y$-axis.

**Second derivative test.** Suppose the second partials are continuous near a critical point $(a,b)$, and let

$$
D=f_{xx}(a,b)f_{yy}(a,b)-f_{xy}(a,b)^2.
$$

- If $D>0$ and $f_{xx}>0$: local minimum.
- If $D>0$ and $f_{xx}<0$: local maximum.
- If $D<0$: saddle point.
- If $D=0$: the test says nothing.

$D$ is the determinant of the matrix of second partials. It comes from the quadratic part of the function's expansion near the point, which is a bowl, a dome or a saddle according to the signs.

**Worked example.** Classify the critical points of $f(x,y)=x^3+y^3-3xy$.

Set $f_x=3x^2-3y=0$ and $f_y=3y^2-3x=0$. The first gives $y=x^2$, and substituting gives $x^4=x$, so $x(x^3-1)=0$. Hence $x=0$ or $x=1$, and the critical points are $(0,0)$ and $(1,1)$.

The second partials are $f_{xx}=6x$, $f_{yy}=6y$ and $f_{xy}=-3$, so $D=36xy-9$.

At $(0,0)$, $D=-9<0$, so it is a saddle. At $(1,1)$, $D=27>0$ and $f_{xx}=6>0$, so it is a local minimum, with $f(1,1)=-1$.

There is no global minimum: $f(x,0)=x^3\\to-\\infty$ as $x\\to-\\infty$. A local minimum is only local.

**When $D=0$.** The functions $x^4+y^4$, $-x^4-y^4$ and $x^4-y^4$ all have $D=0$ at the origin, and they give a minimum, a maximum and a saddle. You must then look at the function directly, for example along lines through the point.

**Least squares.** To fit a line $y=mx+c$ to data points $(x_i,y_i)$, minimise the sum of squared vertical errors

$$
S(m,c)=\\sum_i(y_i-mx_i-c)^2.
$$

Setting $S_m=0$ and $S_c=0$ gives two linear equations for $m$ and $c$, the **normal equations**. The second derivative test confirms that the solution is a minimum, as long as the $x_i$ are not all equal. This is how every fitted line on a scatter plot is computed, and the same idea, with many variables, underlies regression and much of machine learning.

Solving $\\nabla f=\\mathbf 0$ is usually the hardest step, since the equations are non-linear. Look for ways to factor, and solve one equation for one variable in terms of the other, without dividing by anything that might be zero.`,
          resources: [
            openstax('4-7-maxima-minima-problems', 'Maxima/minima problems', 'Critical points, the test and absolute extrema.', true),
            paul('CalcIII/RelativeExtrema', 'Relative minimums and maximums', 'Worked classifications.'),
            mit1802('The sessions on critical points, the second derivative test and least squares.'),
          ],
          exercises: [
            {
              slug: 'classify-critical-points',
              title: 'Classify critical points',
              prompt: `Find and classify all critical points of each function: (a) $x^2+xy+y^2-3x$, (b) $x^4+y^4-4xy+1$, (c) $xy\\,e^{-(x^2+y^2)/2}$. Give the function values at any extrema.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) Minimum at (2, -1), value -3. (b) Saddle at (0, 0); minima at (1, 1) and (-1, -1), value -1. (c) Saddle at (0, 0); maxima at (1, 1) and (-1, -1), value 1/e; minima at (1, -1) and (-1, 1), value -1/e.',
            },
            {
              slug: 'least-squares-line',
              title: 'Fit a line',
              prompt: `Find the least squares line through the points $(0,1)$, $(1,3)$ and $(2,4)$ by minimising $S(m,c)$. Show that the critical point is a minimum. Then write down the normal equations for $n$ general points, and prove that the fitted line passes through the point $(\\bar x,\\bar y)$ of averages.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'm = 3/2 and c = 7/6. The equation S_c = 0 says that the sum of the errors is zero.',
            },
            {
              slug: 'degenerate-cases',
              title: 'When the test fails',
              prompt: `Each function has a critical point at the origin where $D=0$. Decide by direct reasoning whether it is a maximum, a minimum or neither: (a) $x^4+y^4$, (b) $x^2+y^4$, (c) $x^2-y^4$, (d) $x^3-3xy^2$, the monkey saddle. Explain the name of the last.`,
              kind: 'derivation',
              difficulty: 3,
              hint: '(a) minimum. (b) minimum. (c) neither. (d) neither: in polar form it is r^3 cos(3 theta), with three valleys and three hills.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does $D<0$ tell you?',
              answerOutline: 'The critical point is a saddle.',
            },
            {
              question: 'Why is $D>0$ alone not enough to classify a point?',
              answerOutline: 'You also need the sign of $f_{xx}$ to tell a minimum from a maximum.',
            },
            {
              question: 'Is a local minimum always a global minimum?',
              answerOutline: 'No. For example $x^3+y^3-3xy$ has a local minimum but is unbounded below.',
            },
          ],
        },
        {
          slug: 'absolute-extrema',
          title: 'Absolute extrema on closed regions',
          summary:
            'The extreme value theorem in two variables, and how to check the interior and the boundary.',
          estimatedMinutes: 150,
          objectives: [
            'State the extreme value theorem in two variables',
            'Find absolute extrema by checking interior critical points and the boundary',
            'Parametrise the boundary pieces of a region',
            'Solve applied optimisation problems in two variables',
          ],
          concepts: [
            'Closed and bounded set',
            'Extreme value theorem',
            'Interior and boundary',
            'Boundary parametrisation',
            'Applied optimisation',
          ],
          explanation: `A set in the plane is **closed** if it contains its boundary, and **bounded** if it fits in some disk.

**Extreme value theorem.** A function continuous on a closed, bounded set attains an absolute maximum and an absolute minimum on it.

The method mirrors the closed interval method of Calculus I. The difference is that the boundary is now a curve, not two endpoints, so it takes real work.

1. Find the critical points of $f$ **inside** the region, and evaluate $f$ there.
2. Find the extreme values of $f$ **on the boundary**. Parametrise each piece and reduce to a one-variable problem, remembering the corners.
3. The largest of all these values is the absolute maximum, and the smallest is the absolute minimum.

**Worked example.** Find the extreme values of $f(x,y)=x^2+y^2-2x$ on the closed disk $x^2+y^2\\le4$.

*Interior.* $f_x=2x-2=0$ and $f_y=2y=0$ give the critical point $(1,0)$, which lies inside the disk, with $f(1,0)=-1$.

*Boundary.* On the circle, $x^2+y^2=4$, so $f=4-2x$, with $x$ between $-2$ and $2$. This is largest at $x=-2$, with value $8$, and smallest at $x=2$, with value $0$.

*Compare.* The values are $-1$, $8$ and $0$. The absolute maximum is $8$ at $(-2,0)$, and the absolute minimum is $-1$ at $(1,0)$.

Here the constraint gave $f$ directly as a function of $x$. In general you can parametrise the circle as $x=2\\cos t$ and $y=2\\sin t$. Lagrange multipliers, in the next lesson, give a third approach.

A geometric reading helps. Since $f=(x-1)^2+y^2-1$, its value is the squared distance from $(1,0)$, minus $1$. The closest point of the disk to $(1,0)$ is the point itself, and the farthest is $(-2,0)$, at distance $3$, which gives $9-1=8$.

**Applied problems.** As in one variable, write an objective and use the constraint to reduce the number of variables. For example, an open-topped box of volume $V$ has surface area $S=xy+2xz+2yz$ with $z=V/(xy)$, so

$$
S(x,y)=xy+\\frac{2V}{y}+\\frac{2V}{x}.
$$

Setting both partials to zero gives a symmetric solution with $x=y$. The domain here is open, so the extreme value theorem does not apply directly. Instead, argue that $S$ grows without bound near the edges of the domain, so the single critical point must be the minimum.

If the region is unbounded or not closed, the theorem gives no guarantee, and you must study what happens at the edges and far away.`,
          resources: [
            openstax('4-7-maxima-minima-problems', 'Maxima/minima problems', 'The second half covers absolute extrema on closed regions.', true),
            paul('CalcIII/AbsoluteExtrema', 'Absolute minimums and maximums', 'Boundary analysis on several regions.'),
          ],
          exercises: [
            {
              slug: 'triangle-region',
              title: 'Extrema on a triangle',
              prompt: `Find the absolute maximum and minimum of $f(x,y)=xy-x-y+3$ on the closed triangle with vertices $(0,0)$, $(2,0)$ and $(0,4)$. Check the interior critical point, each of the three edges, and all three corners.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The interior critical point (1, 1) gives 2. On the hypotenuse y = 4 - 2x, f = -2x^2 + 5x - 1, with a maximum 17/8 at x = 5/4. Absolute max 3 at (0, 0), absolute min -1 at (0, 4).',
            },
            {
              slug: 'box-design',
              title: 'Design a box',
              prompt: `An open-topped rectangular box must hold $32\\ \\text{m}^3$. Find the dimensions that use the least material, and the area. Then a closed box of the same volume has a lid that costs twice as much per square metre as the sides and base. Find the cheapest dimensions.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Open box: 4 by 4 by 2 m, area 48 m^2. Closed box with cost xy(1 + 2) + 2xz + 2yz: x = y = (64/3)^(1/3), about 2.77 m, and z = 32/x^2, about 4.16 m.',
            },
            {
              slug: 'hottest-point',
              title: 'Hottest point on a plate',
              prompt: `The temperature on the disk $x^2+y^2\\le1$ is $T(x,y)=2x^2+y^2-y$. Find the hottest and coldest points of the plate. Parametrise the boundary as $(\\cos t,\\sin t)$ and solve the one-variable problem by hand.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Interior: (0, 1/2) gives -1/4, the coldest. On the boundary, T = 2 - sin^2 t - sin t, which is largest when sin t = -1/2: the points (+-sqrt(3)/2, -1/2), with T = 9/4.',
            },
          ],
          selfAssessment: [
            {
              question: 'What two hypotheses does the extreme value theorem need?',
              answerOutline: 'A continuous function, on a closed and bounded set.',
            },
            {
              question: 'Why is the boundary harder in two variables than in one?',
              answerOutline: 'The boundary is a curve, which needs its own one-variable optimisation, not just two endpoints.',
            },
            {
              question: 'What must you remember when the boundary has corners?',
              answerOutline: 'Evaluate $f$ at the corners too, since each edge is a closed interval with endpoints.',
            },
          ],
        },
        {
          slug: 'lagrange-multipliers',
          title: 'Lagrange multipliers',
          summary:
            'Optimising subject to a constraint, using the fact that at an optimum the level curve of the objective touches the constraint curve.',
          estimatedMinutes: 170,
          objectives: [
            'Explain the geometry behind $\\nabla f=\\lambda\\nabla g$',
            'Solve constrained problems with one constraint',
            'Handle two constraints',
            'Interpret the multiplier as a rate of change of the optimum',
          ],
          concepts: [
            'Constraint curve or surface',
            'Lagrange condition',
            'Multiplier $\\lambda$',
            'Tangency of level sets',
            'Two constraints',
          ],
          explanation: `To find the extreme values of $f(x,y)$ subject to $g(x,y)=k$, imagine walking along the constraint curve and watching $f$. At a maximum or minimum, the curve does not cross the level curves of $f$. It just touches one. Touching curves have the same normal direction, and normals to level curves are gradients. So:

**Method of Lagrange multipliers.** If $f$ has an extremum on $g=k$ at a point where $\\nabla g\\ne\\mathbf 0$, then for some number $\\lambda$,

$$
\\nabla f=\\lambda\\nabla g,\\qquad g=k.
$$

Solve these equations together: three equations for $x,y,\\lambda$ in two variables, or four for $x,y,z,\\lambda$ in three. Then evaluate $f$ at every solution. If the constraint set is closed and bounded, such as a circle or an ellipse, the largest value is the maximum and the smallest the minimum. Also check points where $\\nabla g=\\mathbf 0$, if any lie on the constraint.

**Worked example.** Find the extreme values of $f=xy$ on the ellipse $x^2+4y^2=8$. The conditions are

$$
y=2\\lambda x,\\qquad x=8\\lambda y,\\qquad x^2+4y^2=8.
$$

Multiply the first equation by $x$ and the second by $y$. Then $xy=2\\lambda x^2=8\\lambda y^2$. If $\\lambda=0$, then $x=y=0$, which is not on the ellipse. Otherwise $x^2=4y^2$. Substituting, $8y^2=8$, so $y=\\pm1$ and $x=\\pm2$. The four candidates give $f=2$ at $(2,1)$ and $(-2,-1)$, and $f=-2$ at $(2,-1)$ and $(-2,1)$. The ellipse is closed and bounded, so the maximum is $2$ and the minimum is $-2$.

The algebra is the hard part. Good habits: eliminate $\\lambda$ early, divide only by quantities you have shown are non-zero, and treat any cases you divide out separately.

**Two constraints.** To optimise $f$ on the curve where $g=k$ and $h=c$ meet, require

$$
\\nabla f=\\lambda\\nabla g+\\mu\\nabla h,
$$

together with both constraints. This gives five equations in five unknowns in three dimensions.

**What $\\lambda$ means.** If $M(k)$ is the optimal value as a function of the constraint level, then $\\lambda=dM/dk$. In economics, $\\lambda$ is the extra value from one more unit of budget, the shadow price. In mechanics, multipliers are the forces of constraint, such as the tension of a pendulum string.

Lagrange multipliers give the candidates on the boundary in the previous lesson's method too. In that case you still need to compare with the interior critical points.`,
          resources: [
            openstax('4-8-lagrange-multipliers', 'Lagrange multipliers', 'One and two constraints.', true),
            paul('CalcIII/LagrangeMultipliers', 'Lagrange multipliers', 'Several worked examples with careful case analysis.'),
            khan('The Lagrange multiplier videos, with the touching-contours picture.'),
          ],
          relatedLessons: ['math-methods/multivariable-calculus/lagrange-multipliers-and-optimization'],
          exercises: [
            {
              slug: 'lagrange-drill',
              title: 'One constraint',
              prompt: `Use Lagrange multipliers for each problem: (a) the extreme values of $x+2y$ on the circle $x^2+y^2=5$, (b) the point of the plane $x+2y+2z=9$ closest to the origin, by minimising the squared distance, (c) the largest product $xyz$ for positive numbers with $x+y+z=30$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 5 at (1, 2) and -5 at (-1, -2). (b) (1, 2, 2), at distance 3. (c) 1000, at x = y = z = 10.',
            },
            {
              slug: 'box-in-ellipsoid',
              title: 'Box in an ellipsoid',
              prompt: `Find the largest volume of a rectangular box with edges parallel to the axes, inscribed in the ellipsoid $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}+\\dfrac{z^2}{c^2}=1$. Then use two constraints to find the highest and lowest points on the curve where the cylinder $x^2+y^2=2$ meets the plane $x+y+z=1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Volume 8abc/(3 sqrt 3). Highest point (-1, -1, 3), lowest point (1, 1, -1).',
            },
            {
              slug: 'maximum-entropy',
              title: 'Maximum entropy',
              prompt: `For probabilities $p_1,\\dots,p_n>0$ with $\\sum p_i=1$, maximise the entropy $H=-\\sum p_i\\ln p_i$ with a Lagrange multiplier, and show that the maximum is at the uniform distribution, with $H=\\ln n$. Then add a second constraint, $\\sum p_iE_i=\\bar E$ for fixed numbers $E_i$, and show that the optimum has the form $p_i\\propto e^{-\\beta E_i}$. This is the Boltzmann distribution of statistical physics.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Differentiating gives -ln p_i - 1 = lambda + mu E_i for every i.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $\\nabla f$ have to be parallel to $\\nabla g$ at a constrained extremum?',
              answerOutline: 'At the extremum the level curve of $f$ is tangent to the constraint curve, so their normals, the gradients, are parallel.',
            },
            {
              question: 'What is a common error when solving the Lagrange equations?',
              answerOutline: 'Dividing by a variable or by $\\lambda$ that could be zero, and so losing solutions.',
            },
            {
              question: 'What does $\\lambda$ measure?',
              answerOutline: 'The rate of change of the optimal value with respect to the constraint level.',
            },
          ],
        },
      ],
      project: {
        slug: 'fit-a-model',
        title: 'Fit a model by least squares',
        description: `Collect a real data set with one input and one output, of twenty or more points. Good choices are the boiling time of different amounts of water, the period of a pendulum against its length, or a public data set such as yearly global temperature anomalies from NASA. First fit a straight line by solving the normal equations by hand, using sums you compute in a spreadsheet, and confirm with the second derivative test that it is a minimum. Then fit a model that suits the physics: for the pendulum, $T=kL^p$ fitted as a line in $\\ln T$ against $\\ln L$. Compare the residuals of the two models, and explain what the fitted constants mean. Finally, add a constraint that you know to be true, such as a line forced through the origin, and solve the constrained fit with a Lagrange multiplier.`,
        deliverables: [
          'The data with its source and a scatter plot',
          'A derivation of the normal equations from minimising a sum of squares',
          'The fitted line, the minimisation check, and a plot of residuals',
          'A physically motivated second model, its fitted constants and their meaning',
          'A constrained fit using a Lagrange multiplier, with the value of the multiplier interpreted',
        ],
        estimatedHours: 6,
        stretchGoals: ['Fit a plane to data with two inputs, and solve the three normal equations by hand'],
      },
    },
    {
      slug: 'multiple-integrals',
      title: 'Multiple Integrals',
      description:
        'Integrating over regions in the plane and in space: iterated integrals, polar, cylindrical and spherical coordinates, and general changes of variables.',
      lessons: [
        {
          slug: 'double-integrals',
          title: 'Double integrals',
          summary:
            'Volume under a surface as a limit of sums, computed as an iterated integral over rectangles and general regions.',
          estimatedMinutes: 180,
          objectives: [
            'Define the double integral as a limit of Riemann sums',
            'Evaluate iterated integrals with Fubini\'s theorem',
            'Describe a region as type I or type II',
            'Reverse the order of integration',
            'Compute volumes and areas',
          ],
          concepts: [
            'Double Riemann sum',
            'Iterated integral',
            'Fubini\'s theorem',
            'Type I and type II regions',
            'Reversing the order',
          ],
          explanation: `Divide a rectangle $R$ into small rectangles of area $\\Delta A$, pick a point in each, and form $\\sum f(x_i^*,y_j^*)\\,\\Delta A$. Each term is the volume of a thin column. The limit, as the rectangles shrink, is the **double integral** $\\iint_Rf\\,dA$. For $f\\ge0$ it is the volume under the surface. With $f=1$ it is the area of the region, and with $f$ a density it is a mass.

**Fubini's theorem.** If $f$ is continuous on $R=[a,b]\\times[c,d]$, then

$$
\\iint_Rf\\,dA=\\int_a^b\\int_c^df(x,y)\\,dy\\,dx=\\int_c^d\\int_a^bf(x,y)\\,dx\\,dy.
$$

You integrate in one variable while holding the other fixed, working from the inside out. Geometrically, each inner integral is the area of a slice, and the outer integral adds up slices. It is the slicing method of Calculus I.

**General regions.** A region is **type I** if it lies between two curves in $x$: $a\\le x\\le b$, $g_1(x)\\le y\\le g_2(x)$. Then

$$
\\iint_Df\\,dA=\\int_a^b\\int_{g_1(x)}^{g_2(x)}f(x,y)\\,dy\\,dx.
$$

A **type II** region lies between two curves in $y$, and you integrate in $x$ first. The limits of the outer integral must be constants. Always sketch the region, and read the inner limits off a typical line drawn across it.

**Worked example 1.** Evaluate $\\iint_D(x+y)\\,dA$, where $D$ is between $y=x^2$ and $y=x$. The curves meet at $x=0$ and $x=1$, and $x\\ge x^2$ on that interval. So

$$
\\int_0^1\\int_{x^2}^{x}(x+y)\\,dy\\,dx=\\int_0^1\\left[xy+\\frac{y^2}{2}\\right]_{x^2}^{x}dx=\\int_0^1\\left(\\frac32x^2-x^3-\\frac12x^4\\right)dx=\\frac12-\\frac14-\\frac1{10}=\\frac{3}{20}.
$$

**Worked example 2 (reversing the order).** The integral $\\int_0^1\\int_x^1e^{y^2}\\,dy\\,dx$ cannot be done as written, since $e^{y^2}$ has no elementary antiderivative. Sketch the region: $0\\le x\\le1$ and $x\\le y\\le1$, a triangle with vertices $(0,0)$, $(0,1)$ and $(1,1)$. Described the other way, it is $0\\le y\\le1$, $0\\le x\\le y$. Then

$$
\\int_0^1\\int_0^ye^{y^2}\\,dx\\,dy=\\int_0^1ye^{y^2}\\,dy=\\frac{e-1}{2}.
$$

Changing the order of integration turned an impossible integral into an easy one. When an inner integral looks hopeless, try reversing the order.

**Properties** are those of single integrals: linearity, additivity over regions that overlap only on their boundaries, and comparison. The **average value** of $f$ over $D$ is $\\dfrac{1}{\\text{area}(D)}\\iint_Df\\,dA$.`,
          resources: [
            openstax('5-1-double-integrals-over-rectangular-regions', 'Double integrals over rectangular regions', 'Riemann sums and Fubini.', true),
            openstax('5-2-double-integrals-over-general-regions', 'Double integrals over general regions', 'Types of region and reversing order.'),
            paul('CalcIII/IteratedIntegrals', 'Iterated integrals', 'Practice on rectangles.'),
            paul('CalcIII/DIGeneralRegion', 'Double integrals over general regions', 'Setting up the limits.'),
          ],
          exercises: [
            {
              slug: 'iterated-drill',
              title: 'Iterated integrals',
              prompt: `Evaluate each integral, sketching the region for (b) and (c): (a) $\\int_0^1\\int_0^2xy^2\\,dy\\,dx$, (b) $\\iint_D xy\\,dA$ where $D$ is bounded by $y=\\sqrt{x}$, $y=0$ and $x=4$, (c) the volume of the tetrahedron bounded by the coordinate planes and $x+\\dfrac y2+\\dfrac z3=1$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 4/3; (b) 32/3; (c) 1.',
            },
            {
              slug: 'reverse-order',
              title: 'Reverse the order',
              prompt: `Each integral is hard or impossible in the given order. Sketch the region, reverse the order, and evaluate: (a) $\\int_0^\\pi\\int_x^\\pi\\dfrac{\\sin y}{y}\\,dy\\,dx$, (b) $\\int_0^1\\int_{\\sqrt{x}}^1e^{y^3}\\,dy\\,dx$, (c) $\\int_0^4\\int_{\\sqrt{x}}^2\\dfrac{dy\\,dx}{y^3+1}$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'Answers: (a) 2; (b) (e - 1)/3; (c) (ln 9)/3, that is (2/3) ln 3.',
            },
            {
              slug: 'fubini-fails',
              title: 'When the order matters',
              prompt: `Compute $\\int_0^1\\int_0^1\\dfrac{x^2-y^2}{(x^2+y^2)^2}\\,dy\\,dx$ and $\\int_0^1\\int_0^1\\dfrac{x^2-y^2}{(x^2+y^2)^2}\\,dx\\,dy$, using $\\dfrac{\\partial}{\\partial y}\\dfrac{y}{x^2+y^2}=\\dfrac{x^2-y^2}{(x^2+y^2)^2}$. Explain why this does not contradict Fubini's theorem.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The two orders give pi/4 and -pi/4. The integrand is unbounded near the origin and not absolutely integrable, so the theorem does not apply.',
            },
          ],
          selfAssessment: [
            {
              question: 'What do the inner and outer limits of a type I region look like?',
              answerOutline: 'Inner limits are functions of $x$. Outer limits are constants.',
            },
            {
              question: 'When should you reverse the order of integration?',
              answerOutline: 'When the inner integral has no elementary antiderivative in the given order, or the region is simpler to describe the other way.',
            },
            {
              question: 'What does $\\iint_D1\\,dA$ give?',
              answerOutline: 'The area of $D$.',
            },
          ],
        },
        {
          slug: 'polar-double-integrals',
          title: 'Double integrals in polar coordinates',
          summary:
            'Integrating over disks, rings and sectors with $dA=r\\,dr\\,d\\theta$, and computing masses and centres of mass.',
          estimatedMinutes: 170,
          objectives: [
            'Explain why $dA=r\\,dr\\,d\\theta$',
            'Convert a double integral to polar form',
            'Compute volumes and areas of round regions',
            'Evaluate the Gaussian integral',
            'Find masses, centres of mass and moments of plates',
          ],
          concepts: [
            'Polar rectangle',
            'Area element $r\\,dr\\,d\\theta$',
            'Polar regions',
            'Gaussian integral',
            'Mass and centre of mass',
            'Moment of inertia',
          ],
          explanation: `Disks, rings and sectors are awkward in $x$ and $y$, and simple in polar coordinates. A small **polar rectangle**, $r$ to $r+dr$ and $\\theta$ to $\\theta+d\\theta$, is nearly a rectangle with sides $dr$ and $r\\,d\\theta$, since an arc of angle $d\\theta$ at radius $r$ has length $r\\,d\\theta$. So

$$
dA=r\\,dr\\,d\\theta,\\qquad\\iint_Df\\,dA=\\int_\\alpha^\\beta\\int_{r_1(\\theta)}^{r_2(\\theta)}f(r\\cos\\theta,r\\sin\\theta)\\,r\\,dr\\,d\\theta.
$$

The extra factor $r$ is essential. It records that polar rectangles far from the origin are bigger.

**Worked example 1.** Find the volume under the paraboloid $z=4-x^2-y^2$ and above the $xy$-plane. The surface meets the plane in the circle $r=2$, so

$$
V=\\int_0^{2\\pi}\\int_0^2(4-r^2)\\,r\\,dr\\,d\\theta=2\\pi\\left[2r^2-\\frac{r^4}{4}\\right]_0^2=2\\pi(8-4)=8\\pi.
$$

**Worked example 2 (the Gaussian integral).** Let $I=\\int_{-\\infty}^\\infty e^{-x^2}dx$. Then

$$
I^2=\\int_{-\\infty}^\\infty e^{-x^2}dx\\int_{-\\infty}^\\infty e^{-y^2}dy=\\iint_{\\mathbb R^2}e^{-(x^2+y^2)}\\,dA=\\int_0^{2\\pi}\\int_0^\\infty e^{-r^2}r\\,dr\\,d\\theta=2\\pi\\cdot\\frac12=\\pi.
$$

So $I=\\sqrt\\pi$. The factor $r$ makes the inner integral elementary. This is the source of the constant in the normal distribution. (Using Fubini on an infinite region needs justification, which holds here because the integrand is positive.)

**Physical applications.** A thin plate occupying $D$ with density $\\rho(x,y)$ has

$$
m=\\iint_D\\rho\\,dA,\\qquad\\bar x=\\frac1m\\iint_Dx\\rho\\,dA,\\qquad\\bar y=\\frac1m\\iint_Dy\\rho\\,dA,
$$

and its moment of inertia about the $z$-axis, which measures resistance to spinning, is $I_0=\\iint_D(x^2+y^2)\\rho\\,dA$. These generalise the formulas of Calculus II to densities that vary in both directions.

For instance, a uniform disk of radius $a$ and density $\\rho$ has $m=\\rho\\pi a^2$ and

$$
I_0=\\rho\\int_0^{2\\pi}\\int_0^ar^2\\cdot r\\,dr\\,d\\theta=\\frac{\\rho\\pi a^4}{2}=\\frac12ma^2.
$$

Use polar coordinates whenever the region is bounded by circles or rays through the origin, or the integrand contains $x^2+y^2$.

To find the limits, sketch the region and draw a ray from the origin at a typical angle $\\theta$. The radius at which the ray enters the region is the lower $r$ limit, and the radius at which it leaves is the upper one. The range of $\\theta$ is the set of angles whose rays meet the region at all. For the disk $(x-1)^2+y^2\\le1$, which passes through the origin, every ray with $-\\pi/2\\le\\theta\\le\\pi/2$ enters at $r=0$ and leaves at $r=2\\cos\\theta$.`,
          resources: [
            openstax('5-3-double-integrals-in-polar-coordinates', 'Double integrals in polar coordinates', 'Polar regions and volumes.', true),
            openstax('5-6-calculating-centers-of-mass-and-moments-of-inertia', 'Calculating centers of mass and moments of inertia', 'Plates and solids.'),
            paul('CalcIII/DIPolarCoords', 'Double integrals in polar coordinates', 'Converting regions.'),
          ],
          relatedLessons: ['classical-mechanics/rotation-and-rigid-bodies/rotational-kinematics-and-moment-of-inertia'],
          exercises: [
            {
              slug: 'polar-drill',
              title: 'Polar integrals',
              prompt: `Evaluate each integral in polar coordinates: (a) $\\iint_D(x^2+y^2)\\,dA$ over the ring $1\\le x^2+y^2\\le4$, (b) $\\iint_De^{-(x^2+y^2)}\\,dA$ over the disk $x^2+y^2\\le4$, (c) $\\int_0^1\\int_0^{\\sqrt{1-x^2}}\\sqrt{x^2+y^2}\\,dy\\,dx$, after describing the region.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 15 pi/2; (b) pi(1 - e^(-4)); (c) pi/6, over a quarter disk.',
            },
            {
              slug: 'polar-volumes',
              title: 'Volumes',
              prompt: `(a) Find the volume of the solid inside the sphere $x^2+y^2+z^2=4$ and outside the cylinder $x^2+y^2=1$. (b) Find the volume of the solid under $z=x^2+y^2$ and above the disk $(x-1)^2+y^2\\le1$, using $r=2\\cos\\theta$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 4 sqrt(3) pi, about 21.8. (b) 3 pi/2.',
            },
            {
              slug: 'plates',
              title: 'Plates',
              prompt: `(a) A half-disk $x^2+y^2\\le a^2$, $y\\ge0$, has density proportional to the distance from the origin, $\\rho=kr$. Find its mass and centre of mass. (b) Compare its moment of inertia about the origin with that of a uniform half-disk of the same mass. Which is harder to spin, and why?`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) m = k pi a^3/3, centre (0, 3a/(2 pi)). (b) I = k pi a^5/5 = (3/5) m a^2, against (1/2) m a^2 for uniform density: harder, because the mass is farther out.',
            },
          ],
          selfAssessment: [
            {
              question: 'Why does $dA$ become $r\\,dr\\,d\\theta$ and not $dr\\,d\\theta$?',
              answerOutline: 'A small polar rectangle has sides $dr$ and $r\\,d\\theta$, since arcs grow with the radius.',
            },
            {
              question: 'Describe the disk $(x-1)^2+y^2\\le1$ in polar coordinates.',
              answerOutline: '$-\\pi/2\\le\\theta\\le\\pi/2$, $0\\le r\\le2\\cos\\theta$.',
            },
            {
              question: 'What is $\\int_{-\\infty}^\\infty e^{-x^2}dx$?',
              answerOutline: '$\\sqrt\\pi$.',
            },
          ],
        },
        {
          slug: 'triple-integrals',
          title: 'Triple integrals',
          summary:
            'Integrals over solid regions, set up as iterated integrals in Cartesian coordinates.',
          estimatedMinutes: 170,
          objectives: [
            'Interpret a triple integral as a volume, mass or average',
            'Describe a solid by bounds on $z$ over a region in the plane',
            'Evaluate triple integrals in Cartesian coordinates',
            'Rewrite a triple integral in a different order',
          ],
          concepts: [
            'Triple integral',
            'Volume as $\\iiint1\\,dV$',
            'Mass and centre of mass of a solid',
            'Projection onto a coordinate plane',
            'Order of integration',
          ],
          explanation: `A triple integral $\\iiint_Ef(x,y,z)\\,dV$ adds up $f$ times small volumes over a solid $E$. With $f=1$ it gives the volume, with a density it gives the mass, and divided by the volume it gives the average of $f$. As before, Fubini turns it into three single integrals.

**Setting up.** The common pattern is to describe $E$ as lying between two surfaces, $u_1(x,y)\\le z\\le u_2(x,y)$, above a region $D$ in the $xy$-plane, which is the shadow, or **projection**, of $E$. Then

$$
\\iiint_Ef\\,dV=\\iint_D\\left[\\int_{u_1(x,y)}^{u_2(x,y)}f\\,dz\\right]dA,
$$

and the outer double integral is set up as in the first lesson. To find $D$, see where the bounding surfaces meet, or flatten the solid onto the plane. Projections onto the other coordinate planes work the same way.

**Worked example 1.** Let $E$ be the tetrahedron $x,y,z\\ge0$, $x+y+z\\le1$. Its projection onto the $xy$-plane is the triangle $x,y\\ge0$, $x+y\\le1$, and over each point $z$ goes from $0$ to $1-x-y$. So the volume is

$$
\\int_0^1\\int_0^{1-x}\\int_0^{1-x-y}dz\\,dy\\,dx=\\int_0^1\\int_0^{1-x}(1-x-y)\\,dy\\,dx=\\int_0^1\\frac{(1-x)^2}{2}\\,dx=\\frac16.
$$

That agrees with one third of base times height: $\\tfrac13\\cdot\\tfrac12\\cdot1$.

**Worked example 2.** For the same solid, $\\iiint_Ez\\,dV=\\int_0^1\\int_0^{1-x}\\tfrac12(1-x-y)^2\\,dy\\,dx=\\int_0^1\\tfrac16(1-x)^3\\,dx=\\tfrac{1}{24}$. Dividing by the volume, the centroid has $\\bar z=\\tfrac{1/24}{1/6}=\\tfrac14$, and by symmetry $\\bar x=\\bar y=\\tfrac14$ too.

**Choosing an order.** There are six orders for $dx$, $dy$ and $dz$. Pick the one in which the solid is easiest to describe, which is usually the one where a line in the innermost direction enters and leaves the solid through a single surface each. Rewriting an integral in another order means describing the same solid differently. Sketch both the solid and its projection, and derive the new limits from the description, not by shuffling symbols.

**A cautionary note.** The most common error is an outer limit that depends on an inner variable. In $\\int\\int\\int\\dots\\,dz\\,dy\\,dx$, the $z$ limits may involve $x$ and $y$, the $y$ limits only $x$, and the $x$ limits must be constants.

For solids with round shapes, Cartesian limits are painful, and the next lesson's coordinates are far better.`,
          resources: [
            openstax('5-4-triple-integrals', 'Triple integrals', 'Setup by projection, and changing order.', true),
            paul('CalcIII/TripleIntegrals', 'Triple integrals', 'Examples of each projection.'),
            mit1802('The sessions on triple integrals, with recitation videos on setting up limits.'),
          ],
          exercises: [
            {
              slug: 'triple-drill',
              title: 'Triple integrals',
              prompt: `Evaluate each triple integral: (a) $\\iiint_Bxyz\\,dV$ over the box $[0,1]\\times[0,2]\\times[0,3]$, (b) the volume of the solid in the first octant under the plane $z=2-x-y$, (c) $\\iiint_E x\\,dV$, where $E$ is bounded by the parabolic cylinder $x=y^2$ and the planes $z=0$ and $x+z=1$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 9/2; (b) 4/3; (c) 8/35.',
            },
            {
              slug: 'change-order',
              title: 'Change the order',
              prompt: `Write $\\int_0^1\\int_0^x\\int_0^yf(x,y,z)\\,dz\\,dy\\,dx$ as an iterated integral in the order $dx\\,dy\\,dz$, and in the order $dy\\,dz\\,dx$, by describing the solid $0\\le z\\le y\\le x\\le1$. Check that both give the volume $1/6$ when $f=1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'dx dy dz: z from 0 to 1, y from z to 1, x from y to 1. dy dz dx: x from 0 to 1, z from 0 to x, y from z to x.',
            },
            {
              slug: 'average-and-centroid',
              title: 'Averages and centroids',
              prompt: `(a) Find the average value of $f=x^2+y^2+z^2$ over the cube $[0,1]^3$. (b) Find the centroid of the solid under $z=4-x^2$ for $0\\le x\\le2$, $0\\le y\\le3$, above $z=0$. (c) Explain, using symmetry, why the integral of $x^3y$ over any solid symmetric under $x\\mapsto-x$ is zero.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 1. (b) The volume is 16. The centroid is (3/4, 3/2, 8/5).',
            },
          ],
          selfAssessment: [
            {
              question: 'What does $\\iiint_E1\\,dV$ compute?',
              answerOutline: 'The volume of $E$.',
            },
            {
              question: 'What is the projection of a solid, and why do you need it?',
              answerOutline: 'Its shadow on a coordinate plane. It gives the region for the outer two integrals.',
            },
            {
              question: 'Which limits must be constant in $\\iiint\\dots\\,dz\\,dy\\,dx$?',
              answerOutline: 'The $x$ limits, on the outermost integral.',
            },
          ],
        },
        {
          slug: 'cylindrical-and-spherical-integrals',
          title: 'Triple integrals in cylindrical and spherical coordinates',
          summary:
            'The volume elements $r\\,dz\\,dr\\,d\\theta$ and $\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$, and integrals over cylinders, cones and balls.',
          estimatedMinutes: 180,
          objectives: [
            'Set up triple integrals in cylindrical coordinates',
            'Explain the spherical volume element',
            'Set up triple integrals in spherical coordinates',
            'Compute volumes, masses, centroids and moments of inertia of round solids',
          ],
          concepts: [
            'Cylindrical volume element',
            'Spherical volume element',
            'Spherical wedge',
            'Ice cream cone region',
            'Moment of inertia of a solid',
          ],
          explanation: `**Cylindrical coordinates** are polar coordinates plus height, so

$$
dV=r\\,dz\\,dr\\,d\\theta.
$$

Use them for solids with an axis of symmetry, such as cylinders, paraboloids and cones around the $z$-axis. For example, the volume of the solid between $z=r^2$ and $z=4$ is

$$
\\int_0^{2\\pi}\\int_0^2\\int_{r^2}^4r\\,dz\\,dr\\,d\\theta=2\\pi\\int_0^2(4r-r^3)\\,dr=8\\pi.
$$

**Spherical coordinates.** A small spherical wedge, $\\rho$ to $\\rho+d\\rho$, $\\varphi$ to $\\varphi+d\\varphi$, $\\theta$ to $\\theta+d\\theta$, is nearly a box. Its sides are $d\\rho$ in the radial direction, $\\rho\\,d\\varphi$ along a line of longitude, and $\\rho\\sin\\varphi\\,d\\theta$ along a circle of latitude, whose radius is $\\rho\\sin\\varphi$. So

$$
dV=\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta.
$$

As a check, the ball of radius $a$ has volume

$$
\\int_0^{2\\pi}\\int_0^\\pi\\int_0^a\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=2\\pi\\cdot2\\cdot\\frac{a^3}{3}=\\frac43\\pi a^3.
$$

Use spherical coordinates for balls, shells and cones with vertex at the origin, and for integrands that involve $x^2+y^2+z^2$.

**Worked example.** Find the volume of the "ice cream cone" inside the sphere $\\rho=2$ and above the cone $\\varphi=\\pi/4$, which is $z=\\sqrt{x^2+y^2}$. The limits are constants:

$$
V=\\int_0^{2\\pi}\\int_0^{\\pi/4}\\int_0^2\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=2\\pi\\left(1-\\frac{\\sqrt2}{2}\\right)\\frac83=\\frac{16\\pi}{3}\\left(1-\\frac{\\sqrt2}{2}\\right)\\approx4.91.
$$

In Cartesian coordinates the same volume needs square roots in every limit.

**Moments of inertia.** The moment of inertia about the $z$-axis of a solid with density $\\rho_m$ is $I_z=\\iiint(x^2+y^2)\\rho_m\\,dV$, where $x^2+y^2$ is the squared distance from the axis. In spherical coordinates that distance squared is $\\rho^2\\sin^2\\varphi$. For a uniform ball of radius $a$ and mass $M$, a short computation gives $I_z=\\tfrac25Ma^2$, a value that appears in every rolling-ball problem in mechanics.

**Notation.** The letter $\\rho$ means the spherical radius here, so write density with a different symbol, or with a subscript, to avoid confusion. And remember the convention: $\\varphi$ runs from $0$ at the north pole to $\\pi$ at the south pole, and $\\sin\\varphi\\ge0$ throughout, so the volume element is never negative.`,
          resources: [
            openstax('5-5-triple-integrals-in-cylindrical-and-spherical-coordinates', 'Triple integrals in cylindrical and spherical coordinates', 'Both systems, with worked solids.', true),
            paul('CalcIII/TICylindricalCoords', 'Triple integrals in cylindrical coordinates', 'Examples.'),
            paul('CalcIII/TISphericalCoords', 'Triple integrals in spherical coordinates', 'Examples.'),
          ],
          exercises: [
            {
              slug: 'round-solids',
              title: 'Round solids',
              prompt: `Evaluate each integral, choosing cylindrical or spherical coordinates: (a) the volume inside $x^2+y^2=4$, above $z=0$ and below $z=x^2+y^2$, (b) $\\iiint_Be^{(x^2+y^2+z^2)^{3/2}}\\,dV$ over the unit ball, (c) the volume of the solid between the spheres $\\rho=1$ and $\\rho=2$ and above the cone $\\varphi=\\pi/3$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 8 pi; (b) (4 pi/3)(e - 1); (c) 7 pi/3.',
            },
            {
              slug: 'centroid-and-inertia',
              title: 'Centroids and moments of inertia',
              prompt: `(a) Show that the solid hemisphere $x^2+y^2+z^2\\le a^2$, $z\\ge0$, has its centroid at height $3a/8$. (b) Show that a uniform solid ball of mass $M$ and radius $a$ has $I_z=\\tfrac25Ma^2$. (c) Show that a uniform solid cylinder of mass $M$ and radius $a$ has $I_z=\\tfrac12Ma^2$ about its axis.`,
              kind: 'derivation',
              difficulty: 2,
              hint: 'For (a), integrate z = rho cos(phi) over the hemisphere and divide by its volume 2 pi a^3/3.',
            },
            {
              slug: 'cone-in-sphere',
              title: 'Set up three ways',
              prompt: `For the ice cream cone of the lesson (inside $\\rho=2$, above $z=\\sqrt{x^2+y^2}$), write the volume integral in cylindrical coordinates and evaluate it. Then write, without evaluating, the integral in Cartesian coordinates. Compare the three setups, and say which you would choose and why.`,
              kind: 'problem',
              difficulty: 3,
              hint: 'In cylindrical form, r goes from 0 to sqrt 2 and z from r to sqrt(4 - r^2). The result is again (16 pi/3)(1 - sqrt(2)/2).',
            },
          ],
          selfAssessment: [
            {
              question: 'What is $dV$ in spherical coordinates?',
              answerOutline: '$\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$.',
            },
            {
              question: 'Where does the factor $\\sin\\varphi$ come from?',
              answerOutline: 'The circle of latitude at angle $\\varphi$ has radius $\\rho\\sin\\varphi$, so its arc for $d\\theta$ is $\\rho\\sin\\varphi\\,d\\theta$.',
            },
            {
              question: 'Which coordinates would you use for a cylinder with a hemispherical cap?',
              answerOutline: 'Cylindrical for the cylinder and spherical for the cap, or cylindrical throughout with square-root limits.',
            },
          ],
        },
        {
          slug: 'change-of-variables',
          title: 'Change of variables and Jacobians',
          summary:
            'General substitutions in multiple integrals, and the Jacobian determinant that measures how areas and volumes stretch.',
          estimatedMinutes: 170,
          objectives: [
            'Compute the Jacobian of a transformation',
            'Explain the Jacobian as an area scaling factor',
            'Choose a substitution that simplifies a region or an integrand',
            'Carry out a change of variables in a double integral',
            'Recover the polar and spherical factors from the Jacobian',
          ],
          concepts: [
            'Transformation of the plane',
            'Jacobian determinant',
            'Area scaling factor',
            'Change of variables formula',
            'Choosing $u$ and $v$',
          ],
          explanation: `A transformation $x=x(u,v)$, $y=y(u,v)$ maps a region $S$ in the $uv$-plane to a region $R$ in the $xy$-plane. A small rectangle of sides $du$ and $dv$ maps to a small curved parallelogram, spanned by the vectors $\\mathbf r_u\\,du$ and $\\mathbf r_v\\,dv$. Its area is the absolute value of a $2\\times2$ determinant, the **Jacobian**:

$$
\\frac{\\partial(x,y)}{\\partial(u,v)}=\\begin{vmatrix}x_u&x_v\\\\y_u&y_v\\end{vmatrix}=x_uy_v-x_vy_u.
$$

So $dA=\\left|\\dfrac{\\partial(x,y)}{\\partial(u,v)}\\right|du\\,dv$, and for a one-to-one transformation with non-zero Jacobian,

$$
\\iint_Rf(x,y)\\,dx\\,dy=\\iint_Sf(x(u,v),y(u,v))\\left|\\frac{\\partial(x,y)}{\\partial(u,v)}\\right|du\\,dv.
$$

This is the multivariable version of $dx=g'(u)\\,du$. For polar coordinates, $x=r\\cos\\theta$ and $y=r\\sin\\theta$ give a Jacobian $\\cos\\theta\\cdot r\\cos\\theta-(-r\\sin\\theta)\\sin\\theta=r$, the familiar factor. The $3\\times3$ version gives $\\rho^2\\sin\\varphi$ for spherical coordinates.

**Choosing a substitution.** Look at the boundary of the region. If it consists of curves $u=\\text{const}$ and $v=\\text{const}$ for some functions $u(x,y)$ and $v(x,y)$, those make the new region a rectangle. Often it is easier to compute $\\dfrac{\\partial(u,v)}{\\partial(x,y)}$ and take its reciprocal.

**Worked example 1.** Evaluate $\\iint_R(x+y)^2\\,dA$, where $R$ is the parallelogram bounded by $x+y=0$, $x+y=2$, $x-y=0$ and $x-y=3$. Let $u=x+y$ and $v=x-y$, so that $R$ becomes the rectangle $0\\le u\\le2$, $0\\le v\\le3$. Then $\\dfrac{\\partial(u,v)}{\\partial(x,y)}=\\begin{vmatrix}1&1\\\\1&-1\\end{vmatrix}=-2$, so $\\left|\\dfrac{\\partial(x,y)}{\\partial(u,v)}\\right|=\\tfrac12$, and

$$
\\iint_R(x+y)^2\\,dA=\\int_0^3\\int_0^2u^2\\cdot\\frac12\\,du\\,dv=\\frac12\\cdot\\frac83\\cdot3=4.
$$

**Worked example 2.** For the area of the ellipse $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}\\le1$, let $x=au$ and $y=bv$, which turns it into the unit disk. The Jacobian is $ab$, so the area is $ab$ times the area of the unit disk, $\\pi ab$. In three dimensions the same idea gives the volume of an ellipsoid as $\\tfrac43\\pi abc$.

Two errors are common. One is forgetting the absolute value. The other is using the Jacobian of the inverse map without taking the reciprocal. Check with a simple case: a map that doubles lengths in both directions should multiply areas by $4$.

The Jacobian is also how probability densities change under a change of variables, which is the reason it appears again in probability theory.`,
          resources: [
            openstax('5-7-change-of-variables-in-multiple-integrals', 'Change of variables in multiple integrals', 'Jacobians in two and three dimensions.', true),
            paul('CalcIII/ChangeOfVariables', 'Change of variables', 'Choosing substitutions from the region.'),
            khan('The videos on the Jacobian, which show the local stretching picture.'),
          ],
          relatedLessons: ['math-methods/multivariable-calculus/coordinate-systems-and-jacobians'],
          exercises: [
            {
              slug: 'jacobian-drill',
              title: 'Jacobians',
              prompt: `Compute the Jacobian of each transformation: (a) $x=u+v$, $y=uv$, (b) $x=u^2-v^2$, $y=2uv$, (c) spherical coordinates, $x=\\rho\\sin\\varphi\\cos\\theta$, $y=\\rho\\sin\\varphi\\sin\\theta$, $z=\\rho\\cos\\varphi$, as a $3\\times3$ determinant. Where is each transformation not locally one-to-one?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) u - v, zero on the line u = v. (b) 4(u^2 + v^2), zero at the origin. (c) The determinant is rho^2 sin(phi), up to sign depending on the order of the variables; it is zero on the z-axis.',
            },
            {
              slug: 'curved-region',
              title: 'A curved region',
              prompt: `Evaluate $\\iint_Rxy\\,dA$, where $R$ is the region in the first quadrant bounded by the hyperbolas $xy=1$ and $xy=4$ and the lines $y=x$ and $y=4x$. Use $u=xy$ and $v=y/x$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The Jacobian of (u, v) with respect to (x, y) is 2y/x = 2v, so dA = du dv/(2v). The result is (15/4) ln 4 = (15/2) ln 2, about 5.20.',
            },
            {
              slug: 'ellipsoid-and-probability',
              title: 'Ellipsoids and densities',
              prompt: `(a) Use the substitution $x=au$, $y=bv$, $z=cw$ to show that the ellipsoid $\\dfrac{x^2}{a^2}+\\dfrac{y^2}{b^2}+\\dfrac{z^2}{c^2}\\le1$ has volume $\\tfrac43\\pi abc$. (b) Find the moment of inertia of a uniform solid ellipsoid of mass $M$ about the $z$-axis, using the same substitution and the ball result $\\iiint_B(u^2+v^2)\\,dV=\\tfrac{8\\pi}{15}$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: '(b) I_z = (M/5)(a^2 + b^2).',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the absolute value of the Jacobian measure?',
              answerOutline: 'How much the transformation multiplies small areas or volumes.',
            },
            {
              question: 'What is the Jacobian of polar coordinates?',
              answerOutline: '$r$.',
            },
            {
              question: 'How do you choose $u$ and $v$ for a region bounded by four curves?',
              answerOutline: 'Choose functions that are constant on opposite pairs of boundary curves, so the region becomes a rectangle.',
            },
          ],
        },
      ],
    },
    {
      slug: 'vector-fields-and-line-integrals',
      title: 'Vector Fields and Line Integrals',
      description:
        'Fields that assign a vector to every point, integrals along curves that measure work and circulation, conservative fields, and Green\'s theorem in the plane.',
      lessons: [
        {
          slug: 'vector-fields',
          title: 'Vector fields',
          summary:
            'Velocity fields, force fields and gradient fields, how to sketch them, and how to recognise a gradient.',
          estimatedMinutes: 140,
          objectives: [
            'Sketch a vector field in the plane',
            'Describe gravitational and electric fields as vector fields',
            'Recognise gradient fields and find potential functions in simple cases',
            'Find flow lines of simple fields',
          ],
          concepts: [
            'Vector field',
            'Velocity field',
            'Inverse-square field',
            'Gradient field',
            'Potential function',
            'Flow line',
          ],
          explanation: `A **vector field** assigns a vector $\\mathbf F(x,y)=\\langle P,Q\\rangle$, or $\\langle P,Q,R\\rangle$ in space, to each point. Examples are everywhere: the velocity of wind or water at each point, the gravitational force on a unit mass, the electric field around a charge, the gradient of a temperature.

To sketch one, draw the vector at a selection of points, scaled down so that they do not overlap. Two basic examples:

- $\\mathbf F=\\langle x,y\\rangle$ points straight away from the origin, growing with distance. It is a source.
- $\\mathbf F=\\langle-y,x\\rangle$ is perpendicular to the position vector, so it circles the origin anticlockwise, with speed growing with radius. It is a rotation.

**Inverse-square fields.** The gravitational field of a mass $M$ at the origin is

$$
\\mathbf F(\\mathbf r)=-\\frac{GM}{|\\mathbf r|^3}\\,\\mathbf r,
$$

which points toward the origin with size $GM/|\\mathbf r|^2$. Coulomb's electric field has the same form. These fields are the motivating examples for the rest of the course.

**Gradient fields.** If $\\mathbf F=\\nabla f$ for some function $f$, then $\\mathbf F$ is a **gradient field**, or **conservative**, and $f$ is a **potential**. (In physics the potential energy is usually $-f$.) The gravitational field above is $\\nabla f$ with $f=GM/|\\mathbf r|$.

In two variables, if $\\mathbf F=\\langle P,Q\\rangle=\\nabla f$ with continuous second partials, then $P_y=f_{xy}=f_{yx}=Q_x$. So

$$
\\frac{\\partial P}{\\partial y}\\ne\\frac{\\partial Q}{\\partial x}\\quad\\Longrightarrow\\quad\\mathbf F\\text{ is not a gradient}.
$$

The rotation field $\\langle-y,x\\rangle$ fails this test: $P_y=-1$ and $Q_x=1$.

**Worked example.** Is $\\mathbf F=\\langle2xy,\\ x^2+3y^2\\rangle$ a gradient? Here $P_y=2x=Q_x$, which is promising. To find $f$, integrate $P$ in $x$: $f=x^2y+g(y)$, with an unknown function of $y$ in place of the constant. Then $f_y=x^2+g'(y)$ must equal $x^2+3y^2$, so $g'(y)=3y^2$ and $g=y^3$. So $f=x^2y+y^3$, plus any constant. Check: $\\nabla f=\\langle2xy,\\ x^2+3y^2\\rangle$.

The next lessons show that passing the test $P_y=Q_x$ is enough on a region without holes, though not on regions with holes.

**Flow lines.** A **flow line** is a curve whose velocity at each point is the field there: $\\mathbf r'(t)=\\mathbf F(\\mathbf r(t))$. It is the path of a particle carried by the flow. For $\\langle-y,x\\rangle$ the flow lines are circles around the origin. For $\\langle x,y\\rangle$ they are rays leaving it. Finding flow lines means solving differential equations, which you can do in simple cases by separating variables in $dy/dx=Q/P$.`,
          resources: [
            openstax('6-1-vector-fields', 'Vector fields', 'Examples, gradient fields and flow lines.', true),
            paul('CalcIII/VectorFields', 'Vector fields', 'Sketches and gradient fields.'),
            geogebra,
          ],
          exercises: [
            {
              slug: 'sketch-fields',
              title: 'Sketch fields',
              prompt: `Sketch each field at about a dozen points, and describe it in words: (a) $\\langle1,0\\rangle$, (b) $\\langle y,0\\rangle$, (c) $\\langle-x,-y\\rangle$, (d) $\\dfrac{\\langle-y,x\\rangle}{x^2+y^2}$. Which of them look as if they could be gradient fields? Test each with $P_y=Q_x$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) and (c) pass the test and are gradients. (b) fails: P_y = 1 and Q_x = 0, a shear flow. (d) passes the test away from the origin, but, as Lesson 3 shows, it is not a gradient on any region circling the origin.',
            },
            {
              slug: 'find-potentials',
              title: 'Find potentials',
              prompt: `Decide whether each field is a gradient, and find a potential where one exists: (a) $\\langle ye^{xy},\\ xe^{xy}\\rangle$, (b) $\\langle2x+y,\\ x+2y\\rangle$, (c) $\\langle y,\\ -x\\rangle$, (d) $\\langle yz,\\ xz,\\ xy+2z\\rangle$, in three variables, integrating one variable at a time.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) e^(xy). (b) x^2 + xy + y^2. (c) not a gradient. (d) xyz + z^2.',
            },
            {
              slug: 'flow-lines',
              title: 'Flow lines and gravity',
              prompt: `(a) Find the flow lines of $\\mathbf F=\\langle x,2y\\rangle$ by solving $dy/dx=2y/x$, and sketch them. (b) Verify that $\\nabla\\left(\\dfrac{GM}{|\\mathbf r|}\\right)=-\\dfrac{GM}{|\\mathbf r|^3}\\mathbf r$, where $|\\mathbf r|=\\sqrt{x^2+y^2+z^2}$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: '(a) The parabolas y = Cx^2, together with the y-axis. (b) Compute the x-component: the derivative of (x^2 + y^2 + z^2)^(-1/2) with respect to x is -x/|r|^3.',
            },
          ],
          selfAssessment: [
            {
              question: 'Describe the field $\\langle-y,x\\rangle$.',
              answerOutline: 'An anticlockwise rotation about the origin, with arrows growing linearly with distance.',
            },
            {
              question: 'What quick test shows that a plane field is not a gradient?',
              answerOutline: '$\\partial P/\\partial y\\ne\\partial Q/\\partial x$.',
            },
            {
              question: 'Why do you add $g(y)$, and not just a constant, when finding a potential?',
              answerOutline: 'Integrating with respect to $x$ treats $y$ as a constant, so the arbitrary part can be any function of $y$.',
            },
          ],
        },
        {
          slug: 'line-integrals',
          title: 'Line integrals',
          summary:
            'Integrating a function along a curve, and integrating a field along a curve to measure work.',
          estimatedMinutes: 170,
          objectives: [
            'Compute line integrals of scalar functions with respect to arc length',
            'Compute line integrals of vector fields as work',
            'Parametrise line segments, circles and pieces of curves',
            'Explain how orientation affects each type of integral',
          ],
          concepts: [
            'Line integral with respect to arc length',
            'Line integral of a vector field',
            'Work',
            'Orientation',
            'Piecewise smooth curve',
            'Notation $\\int P\\,dx+Q\\,dy$',
          ],
          explanation: `**Scalar line integrals.** For a wire along a curve $C$ with density $f$, the mass is a sum of $f\\,ds$ over small pieces. If $\\mathbf r(t)$, $a\\le t\\le b$, traces $C$ once, then

$$
\\int_Cf\\,ds=\\int_a^bf(\\mathbf r(t))\\,|\\mathbf r'(t)|\\,dt.
$$

This does not depend on the parametrisation, or on the direction in which $C$ is traced.

**Line integrals of vector fields.** A force $\\mathbf F$ moving a particle along $C$ does work $\\mathbf F\\cdot d\\mathbf r$ on each small step, so the total work is

$$
\\int_C\\mathbf F\\cdot d\\mathbf r=\\int_a^b\\mathbf F(\\mathbf r(t))\\cdot\\mathbf r'(t)\\,dt.
$$

With $\\mathbf F=\\langle P,Q\\rangle$ this is also written $\\int_CP\\,dx+Q\\,dy$. It equals $\\int_C\\mathbf F\\cdot\\mathbf T\\,ds$, which adds up the tangential component of the field. Reversing the direction of $C$ changes the sign, since the work done going backwards is the negative of the work done going forwards.

Standard parametrisations:

- The segment from $\\mathbf p$ to $\\mathbf q$: $\\mathbf r(t)=(1-t)\\mathbf p+t\\mathbf q$, $0\\le t\\le1$.
- The circle of radius $a$, anticlockwise: $\\langle a\\cos t,a\\sin t\\rangle$, $0\\le t\\le2\\pi$.
- The graph $y=g(x)$: $\\langle t,g(t)\\rangle$.

**Worked example 1.** Find $\\int_Cxy\\,ds$ over the quarter circle of radius $2$ in the first quadrant. With $\\mathbf r=\\langle2\\cos t,2\\sin t\\rangle$ for $0\\le t\\le\\pi/2$, the speed is $2$, so

$$
\\int_0^{\\pi/2}(4\\cos t\\sin t)(2)\\,dt=8\\cdot\\frac12=4.
$$

**Worked example 2.** Let $\\mathbf F=\\langle y,x^2\\rangle$. Compute the work from $(0,0)$ to $(1,1)$ along two paths.

*Along $y=x$:* with $\\mathbf r=\\langle t,t\\rangle$, $\\mathbf r'=\\langle1,1\\rangle$ and $\\mathbf F\\cdot\\mathbf r'=t+t^2$, so the work is $\\tfrac12+\\tfrac13=\\tfrac56$.

*Along $x=y^2$:* with $\\mathbf r=\\langle t^2,t\\rangle$, $\\mathbf r'=\\langle2t,1\\rangle$ and $\\mathbf F=\\langle t,t^4\\rangle$, so $\\mathbf F\\cdot\\mathbf r'=2t^2+t^4$, and the work is $\\tfrac23+\\tfrac15=\\tfrac{13}{15}$.

The answers differ, so for this field the work depends on the path. That is consistent with the test of the previous lesson: $P_y=1$ while $Q_x=2x$, so $\\mathbf F$ is not a gradient.

**Piecewise curves.** If $C$ is made of smooth pieces, such as the sides of a triangle, integrate over each piece with its own parametrisation and add the results.

**Physical meaning.** For a velocity field, the line integral around a closed loop measures the **circulation**, the tendency of the flow to go around the loop. Positive circulation means the flow tends to push you along the loop in its direction.`,
          resources: [
            openstax('6-2-line-integrals', 'Line integrals', 'Scalar and vector line integrals, work, circulation and flux.', true),
            paul('CalcIII/LineIntegralsPtI', 'Line integrals, part I', 'With respect to arc length.'),
            paul('CalcIII/LineIntegralsVectorFields', 'Line integrals of vector fields', 'Work integrals with examples.'),
          ],
          relatedLessons: ['classical-mechanics/energy-momentum-and-systems/work-energy-and-conservative-forces'],
          exercises: [
            {
              slug: 'scalar-line-integrals',
              title: 'Scalar line integrals',
              prompt: `(a) Find $\\int_C(x+y)\\,ds$, where $C$ is the segment from $(0,0)$ to $(3,4)$. (b) A wire bent into the semicircle $x^2+y^2=a^2$, $y\\ge0$, has density equal to its height $y$. Find its mass. (c) Find the length of one turn of the helix $\\langle\\cos t,\\sin t,t\\rangle$ as a line integral.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) 35/2. (b) 2a^2. (c) 2 pi sqrt 2.',
            },
            {
              slug: 'work-integrals',
              title: 'Work integrals',
              prompt: `(a) Find the work done by $\\mathbf F=\\langle y,-x,z\\rangle$ along one turn of the helix $\\langle\\cos t,\\sin t,t\\rangle$, $0\\le t\\le2\\pi$. (b) Evaluate $\\oint_C\\mathbf F\\cdot d\\mathbf r$ for $\\mathbf F=\\langle-y,x\\rangle$ around the circle of radius $a$, anticlockwise. (c) Evaluate $\\int_Cy\\,dx+x\\,dy$ along the three sides of the triangle from $(0,0)$ to $(2,0)$ to $(2,1)$ and back to $(0,0)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 2 pi^2 - 2 pi. (b) 2 pi a^2. (c) 0: the field <y, x> is the gradient of xy.',
            },
            {
              slug: 'parametrisation-independence',
              title: 'Independence of parametrisation',
              prompt: `(a) Show that $\\int_C\\mathbf F\\cdot d\\mathbf r$ does not change if you replace $\\mathbf r(t)$, $a\\le t\\le b$, by $\\mathbf r(g(u))$, where $g$ is increasing and maps $[c,d]$ onto $[a,b]$. (b) Show that it changes sign if $g$ is decreasing. (c) Show that $\\int_Cf\\,ds$ is unchanged in both cases.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Use the chain rule on r(g(u)) and substitute t = g(u). For (c), the speed has an absolute value |g prime|.',
            },
          ],
          selfAssessment: [
            {
              question: 'What happens to $\\int_C\\mathbf F\\cdot d\\mathbf r$ if you reverse the curve?',
              answerOutline: 'It changes sign.',
            },
            {
              question: 'What happens to $\\int_Cf\\,ds$ if you reverse the curve?',
              answerOutline: 'Nothing. Arc length is always positive.',
            },
            {
              question: 'What does $\\int_C\\mathbf F\\cdot d\\mathbf r$ measure for a force field?',
              answerOutline: 'The work done by the force on a particle moving along $C$.',
            },
          ],
        },
        {
          slug: 'conservative-fields',
          title: 'Conservative fields and the fundamental theorem',
          summary:
            'Line integrals of gradients depend only on the end points, and how to tell when a field is a gradient.',
          estimatedMinutes: 160,
          objectives: [
            'State and use the fundamental theorem for line integrals',
            'State the equivalent conditions for a field to be conservative',
            'Use the cross-partials test on simply connected regions',
            'Explain why the test fails on regions with holes',
            'Connect conservative fields to conservation of energy',
          ],
          concepts: [
            'Fundamental theorem for line integrals',
            'Path independence',
            'Closed curves',
            'Simply connected region',
            'Cross-partials test',
            'Conservation of energy',
          ],
          explanation: `**Fundamental theorem for line integrals.** If $C$ is a smooth curve from $A$ to $B$, and $f$ has a continuous gradient on $C$, then

$$
\\int_C\\nabla f\\cdot d\\mathbf r=f(B)-f(A).
$$

*Proof.* By the chain rule, $\\nabla f(\\mathbf r(t))\\cdot\\mathbf r'(t)=\\dfrac{d}{dt}f(\\mathbf r(t))$. Integrating from $a$ to $b$ gives $f(\\mathbf r(b))-f(\\mathbf r(a))$ by the ordinary fundamental theorem. $\\blacksquare$

So the line integral of a gradient field depends only on the end points, not on the path, and around any closed curve it is zero. For a field $\\mathbf F$ on an open connected region, these three statements are equivalent:

1. $\\mathbf F=\\nabla f$ for some $f$.
2. $\\int_C\\mathbf F\\cdot d\\mathbf r$ depends only on the end points of $C$.
3. $\\oint_C\\mathbf F\\cdot d\\mathbf r=0$ around every closed curve.

Such fields are called **conservative**.

**The test.** A region is **simply connected** if it is connected and every closed curve in it can be shrunk to a point without leaving the region. Informally, it has no holes. **On a simply connected region**, a field $\\langle P,Q\\rangle$ with continuous first partials is conservative exactly when $P_y=Q_x$. In three dimensions the condition is that $\\text{curl}\\,\\mathbf F=\\mathbf 0$, which is the subject of Module 7.

**The hole matters.** Let $\\mathbf F=\\dfrac{\\langle-y,x\\rangle}{x^2+y^2}$ on the plane with the origin removed. It satisfies $P_y=Q_x$ everywhere it is defined. Yet around the unit circle, with $\\mathbf r=\\langle\\cos t,\\sin t\\rangle$, $\\mathbf F\\cdot\\mathbf r'=\\sin^2t+\\cos^2t=1$, and

$$
\\oint\\mathbf F\\cdot d\\mathbf r=2\\pi\\ne0.
$$

So the field is not conservative on that region. Locally it is the gradient of the polar angle $\\theta$, but $\\theta$ cannot be defined continuously around a loop that circles the origin, because it gains $2\\pi$ each time.

**Worked example.** Evaluate $\\int_C\\mathbf F\\cdot d\\mathbf r$ for $\\mathbf F=\\langle2xy+z^2,\\ x^2,\\ 2xz\\rangle$ along any path from $(1,0,1)$ to $(2,1,3)$. Look for a potential. From $P$, $f=x^2y+xz^2+g(y,z)$. Then $f_y=x^2+g_y$ must equal $x^2$, so $g$ depends on $z$ alone, and $f_z=2xz+g'(z)$ must equal $2xz$, so $g$ is constant. Thus $f=x^2y+xz^2$, and the integral is

$$
f(2,1,3)-f(1,0,1)=(4+18)-(0+1)=21,
$$

whatever the path.

**Energy.** If a force is conservative, $\\mathbf F=-\\nabla U$ with potential energy $U$. Newton's law and the theorem combine to show that kinetic energy plus potential energy is constant along any motion. This is why such forces are called conservative.`,
          resources: [
            openstax('6-3-conservative-vector-fields', 'Conservative vector fields', 'The fundamental theorem, simply connected regions and potentials.', true),
            paul('CalcIII/FundThmLineIntegrals', 'Fundamental theorem for line integrals', 'Statement and examples.'),
            paul('CalcIII/ConservativeVectorField', 'Conservative vector fields', 'Finding potentials step by step.'),
          ],
          exercises: [
            {
              slug: 'conservative-drill',
              title: 'Conservative or not',
              prompt: `Decide whether each field is conservative on the whole plane. If it is, find a potential: (a) $\\langle3x^2y,\\ x^3+2y\\rangle$, (b) $\\langle y\\cos x,\\ \\sin x+e^y\\rangle$, (c) $\\langle xy,\\ y\\rangle$. Then evaluate $\\int_C\\mathbf F\\cdot d\\mathbf r$ for field (a) along any path from $(0,0)$ to $(2,1)$.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) x^3 y + y^2. (b) y sin x + e^y. (c) not conservative. The integral is 8 + 1 = 9.',
            },
            {
              slug: 'path-integral-trick',
              title: 'Choose the easy route',
              prompt: `Let $\\mathbf F=\\langle e^y,\\ xe^y+\\cos y\\rangle$. Show that $\\mathbf F$ is conservative, and use this to evaluate $\\int_C\\mathbf F\\cdot d\\mathbf r$ where $C$ is the upper half of the ellipse $x^2/4+y^2=1$, from $(2,0)$ to $(-2,0)$. Then do the same integral with a non-conservative field of your choice, along two different paths, to see the difference.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'A potential is x e^y + sin y, so the integral is -2 - 2 = -4.',
            },
            {
              slug: 'vortex-field',
              title: 'The vortex field',
              prompt: `For $\\mathbf F=\\dfrac{\\langle-y,x\\rangle}{x^2+y^2}$: (a) verify that $P_y=Q_x$ away from the origin. (b) Show that $\\theta=\\arctan(y/x)$ satisfies $\\nabla\\theta=\\mathbf F$ where $x>0$. (c) Explain why $\\oint_C\\mathbf F\\cdot d\\mathbf r$ is $0$ for a loop that does not go around the origin, and $2\\pi$ for one that goes around it once anticlockwise.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (c), a loop that avoids circling the origin lies in a region with no hole, where F is a gradient.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the fundamental theorem for line integrals.',
              answerOutline: '$\\int_C\\nabla f\\cdot d\\mathbf r=f(B)-f(A)$, where $C$ runs from $A$ to $B$.',
            },
            {
              question: 'What extra condition makes $P_y=Q_x$ sufficient for a field to be conservative?',
              answerOutline: 'A simply connected domain, with continuous first partials.',
            },
            {
              question: 'What is the line integral of a conservative field around a closed curve?',
              answerOutline: 'Zero.',
            },
          ],
        },
        {
          slug: 'greens-theorem',
          title: "Green's theorem",
          summary:
            'The theorem that turns a line integral around a closed curve into a double integral over the region inside.',
          estimatedMinutes: 180,
          objectives: [
            "State Green's theorem with its hypotheses and orientation",
            'Use it to evaluate line integrals and double integrals',
            'Compute areas with line integrals',
            'Apply it to regions with holes',
            'Read the theorem as a statement about circulation',
          ],
          concepts: [
            'Positive orientation',
            "Green's theorem",
            'Area by line integral',
            'Regions with holes',
            'Circulation density',
          ],
          explanation: `**Green's theorem.** Let $C$ be a positively oriented, piecewise smooth, simple closed curve in the plane, and $D$ the region it bounds. If $P$ and $Q$ have continuous partial derivatives on an open region containing $D$, then

$$
\\oint_CP\\,dx+Q\\,dy=\\iint_D\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dA.
$$

**Positive orientation** means anticlockwise for a simple region, or more generally that the region is on your left as you walk along the boundary.

**Why it is true.** The quantity $Q_x-P_y$ measures the circulation per unit area at a point: around a tiny square, the four sides contribute about $(Q_x-P_y)\\,\\Delta A$. Divide $D$ into many tiny squares and add up their circulations. Each interior edge is traversed twice, once in each direction, and cancels. What is left is the circulation around the outer boundary. For a rectangle you can check it directly: the two horizontal sides give $-\\iint P_y\\,dA$, by the fundamental theorem in $y$.

This is the fundamental theorem of calculus in two dimensions: an integral of a derivative over a region equals a sum of values on its boundary.

**Worked example 1.** Evaluate $\\oint_C(x^2-y)\\,dx+(y^2+x)\\,dy$ around the unit circle, anticlockwise. Here $Q_x-P_y=1-(-1)=2$, so the integral is $2\\cdot\\text{area}=2\\pi$. Computing it directly takes much more work.

**Worked example 2 (area).** If $Q_x-P_y=1$, the double integral is the area. Choosing $P=-\\tfrac y2$ and $Q=\\tfrac x2$ gives

$$
\\text{Area}(D)=\\frac12\\oint_Cx\\,dy-y\\,dx.
$$

For the ellipse $\\langle a\\cos t,b\\sin t\\rangle$, the integrand is $\\tfrac12(ab\\cos^2t+ab\\sin^2t)=\\tfrac12ab$, so the area is $\\pi ab$. A planimeter, a mechanical device that measures area by tracing a boundary, works on this principle.

**Regions with holes.** For a ring-shaped region, the boundary has two parts: the outer curve anticlockwise and the inner curve **clockwise**, so that the region is always on the left. Green's theorem holds with both parts included. This explains the vortex field: for $\\mathbf F=\\dfrac{\\langle-y,x\\rangle}{x^2+y^2}$, we have $Q_x-P_y=0$ everywhere except the origin. So the integrals around any two anticlockwise loops that enclose the origin are equal, since the region between them contributes zero. Each equals the $2\\pi$ found for the unit circle.

**Checking hypotheses.** The theorem needs the partials continuous on the whole region. The vortex field fails at the origin, which is why a loop around the origin gives $2\\pi$ and not $\\iint0\\,dA=0$.

Green's theorem also has a flux form, $\\oint_C\\mathbf F\\cdot\\mathbf n\\,ds=\\iint_D(P_x+Q_y)\\,dA$. Its two forms grow into Stokes' theorem and the divergence theorem in the next module.`,
          resources: [
            openstax('6-4-greens-theorem', "Green's theorem", 'Circulation and flux forms, with regions with holes.', true),
            paul('CalcIII/GreensTheorem', "Green's theorem", 'Worked examples in both directions.'),
            mit1802('The sessions on Green\'s theorem, with the flux form.'),
          ],
          exercises: [
            {
              slug: 'green-drill',
              title: "Use Green's theorem",
              prompt: `(a) Evaluate $\\oint_Cxy\\,dx+x^2\\,dy$ around the triangle with vertices $(0,0)$, $(1,0)$ and $(1,1)$, anticlockwise, using Green's theorem, then check it by computing the three line integrals directly. (b) Evaluate $\\oint_Cy^2\\,dx+3xy\\,dy$, where $C$ is the boundary of the upper half of the ring $1\\le x^2+y^2\\le4$, positively oriented.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) The double integral of (2x - x) gives 1/3. (b) The double integral of y over the half ring gives 14/3.',
            },
            {
              slug: 'areas-by-green',
              title: 'Areas by line integrals',
              prompt: `Use $A=\\frac12\\oint x\\,dy-y\\,dx$ to find the area enclosed by (a) the astroid $\\langle\\cos^3t,\\sin^3t\\rangle$, (b) one arch of the cycloid $\\langle t-\\sin t,1-\\cos t\\rangle$ together with the segment of the $x$-axis below it, taking care with the orientation, (c) the triangle with vertices $(x_1,y_1)$, $(x_2,y_2)$, $(x_3,y_3)$, to derive the shoelace formula.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 3 pi/8. (b) 3 pi. The arch must be traced from right to left for positive orientation. (c) A = (1/2)|x1 y2 - x2 y1 + x2 y3 - x3 y2 + x3 y1 - x1 y3|.',
            },
            {
              slug: 'green-proof',
              title: 'Prove it for a rectangle',
              prompt: `Prove Green's theorem for the rectangle $[a,b]\\times[c,d]$. Show that $\\oint_CP\\,dx=-\\iint_DP_y\\,dA$ by computing the line integral on the four sides, and using the fundamental theorem in $y$. Then do the same for the $Q\\,dy$ term. Finally, explain how the result extends to a region made of several rectangles glued together.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'The vertical sides contribute nothing to the integral of P dx, since dx = 0 there.',
            },
          ],
          selfAssessment: [
            {
              question: "State Green's theorem.",
              answerOutline: '$\\oint_CP\\,dx+Q\\,dy=\\iint_D(Q_x-P_y)\\,dA$ for a positively oriented simple closed curve $C$ bounding $D$, with continuous partials.',
            },
            {
              question: 'How is the inner boundary of a ring oriented?',
              answerOutline: 'Clockwise, so that the region stays on the left.',
            },
            {
              question: 'What does $Q_x-P_y$ measure?',
              answerOutline: 'The circulation per unit area of the field at a point.',
            },
          ],
        },
      ],
    },
    {
      slug: 'surface-integrals-and-theorems',
      title: 'Surface Integrals and the Integral Theorems',
      description:
        'Integrating over surfaces, the flux of a field through a surface, curl and divergence, and the theorems of Stokes and Gauss that complete the subject.',
      lessons: [
        {
          slug: 'parametric-surfaces',
          title: 'Parametric surfaces and surface area',
          summary:
            'Describing surfaces with two parameters, their normal vectors, and the area integral.',
          estimatedMinutes: 160,
          objectives: [
            'Parametrise planes, cylinders, cones, spheres and graphs',
            'Find the normal vector $\\mathbf r_u\\times\\mathbf r_v$',
            'Compute surface areas',
            'Find the tangent plane to a parametric surface',
          ],
          concepts: [
            'Parametric surface',
            'Grid curves',
            'Normal vector $\\mathbf r_u\\times\\mathbf r_v$',
            'Surface area element $dS$',
            'Area of a graph',
          ],
          explanation: `A curve needs one parameter, and a surface needs two. A **parametric surface** is

$$
\\mathbf r(u,v)=\\langle x(u,v),y(u,v),z(u,v)\\rangle,
$$

for $(u,v)$ in a region $D$. Holding $v$ fixed and varying $u$ gives a grid curve with tangent vector $\\mathbf r_u$, and similarly for $\\mathbf r_v$. Both are tangent to the surface, so $\\mathbf r_u\\times\\mathbf r_v$ is **normal** to it.

Useful parametrisations:

- Sphere of radius $a$: $\\langle a\\sin\\varphi\\cos\\theta,\\ a\\sin\\varphi\\sin\\theta,\\ a\\cos\\varphi\\rangle$, with $0\\le\\varphi\\le\\pi$ and $0\\le\\theta\\le2\\pi$.
- Cylinder of radius $a$: $\\langle a\\cos\\theta,\\ a\\sin\\theta,\\ z\\rangle$.
- Cone $z=\\sqrt{x^2+y^2}$: $\\langle r\\cos\\theta,\\ r\\sin\\theta,\\ r\\rangle$.
- Graph $z=g(x,y)$: $\\langle x,\\ y,\\ g(x,y)\\rangle$.

**Surface area.** A small grid rectangle of sides $du$ and $dv$ maps to a small parallelogram spanned by $\\mathbf r_u\\,du$ and $\\mathbf r_v\\,dv$, whose area is $|\\mathbf r_u\\times\\mathbf r_v|\\,du\\,dv$. So

$$
\\text{Area}=\\iint_D|\\mathbf r_u\\times\\mathbf r_v|\\,du\\,dv,\\qquad dS=|\\mathbf r_u\\times\\mathbf r_v|\\,du\\,dv.
$$

For a graph, $\\mathbf r_x\\times\\mathbf r_y=\\langle-g_x,-g_y,1\\rangle$, which gives $dS=\\sqrt{1+g_x^2+g_y^2}\\,dA$.

**Worked example 1.** For the sphere, a direct computation gives $|\\mathbf r_\\varphi\\times\\mathbf r_\\theta|=a^2\\sin\\varphi$. So the area is

$$
\\int_0^{2\\pi}\\int_0^\\pi a^2\\sin\\varphi\\,d\\varphi\\,d\\theta=4\\pi a^2,
$$

and $dS=a^2\\sin\\varphi\\,d\\varphi\\,d\\theta$. Compare the volume element $\\rho^2\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta$: a thin spherical shell has volume $dS\\,d\\rho$.

**Worked example 2.** Find the area of the part of the paraboloid $z=x^2+y^2$ below $z=1$. Here $dS=\\sqrt{1+4x^2+4y^2}\\,dA$ over the unit disk, so in polar coordinates

$$
\\int_0^{2\\pi}\\int_0^1\\sqrt{1+4r^2}\\,r\\,dr\\,d\\theta=2\\pi\\cdot\\frac{1}{12}\\left[(1+4r^2)^{3/2}\\right]_0^1=\\frac{\\pi}{6}\\left(5\\sqrt5-1\\right)\\approx5.33.
$$

As a sanity check, the area is more than that of the unit disk, $\\pi$, as it must be for a surface that curves upward over the disk.

The surface areas of Calculus II, for surfaces of revolution, are special cases of this formula, and you can recover them by parametrising the surface with the axial variable and the angle of rotation.`,
          resources: [
            openstax('6-6-surface-integrals', 'Surface integrals', 'Parametric surfaces, area, and surface integrals of both kinds.', true),
            paul('CalcIII/ParametricSurfaces', 'Parametric surfaces', 'Parametrising the standard surfaces.'),
            paul('CalcIII/SurfaceArea', 'Surface area', 'The area formula with examples.'),
            geogebra,
          ],
          exercises: [
            {
              slug: 'parametrise-surfaces',
              title: 'Parametrise surfaces',
              prompt: `Parametrise each surface and give the parameter domain: (a) the part of the cylinder $x^2+y^2=4$ with $0\\le z\\le3$, (b) the part of the plane $x+2y+z=4$ in the first octant, (c) the part of the cone $z=\\sqrt{x^2+y^2}$ with $1\\le z\\le2$, (d) the torus obtained by rotating the circle $(x-R)^2+z^2=r^2$ about the $z$-axis.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(d) <(R + r cos v) cos u, (R + r cos v) sin u, r sin v>, for u and v in [0, 2 pi].',
            },
            {
              slug: 'surface-areas',
              title: 'Surface areas',
              prompt: `Find each area: (a) the part of the plane $x+2y+z=4$ in the first octant, (b) the helicoid $\\langle u\\cos v,u\\sin v,v\\rangle$ for $0\\le u\\le1$ and $0\\le v\\le2\\pi$, (c) the torus of the previous exercise, (d) the part of the sphere $x^2+y^2+z^2=4$ above $z=1$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 4 sqrt 6. (b) pi(sqrt 2 + ln(1 + sqrt 2)). (c) 4 pi^2 R r. (d) 4 pi.',
            },
            {
              slug: 'revolution-check',
              title: 'Surfaces of revolution again',
              prompt: `Parametrise the surface obtained by rotating $y=f(x)$, $a\\le x\\le b$, $f\\ge0$, about the $x$-axis as $\\langle x,f(x)\\cos\\theta,f(x)\\sin\\theta\\rangle$. Show that $|\\mathbf r_x\\times\\mathbf r_\\theta|=f\\sqrt{1+f'^2}$, which recovers the Calculus II formula $S=2\\pi\\int_a^bf\\sqrt{1+f'^2}\\,dx$.`,
              kind: 'derivation',
              difficulty: 2,
              hint: "The cross product is <f f', -f cos(theta), -f sin(theta)>.",
            },
          ],
          selfAssessment: [
            {
              question: 'Why is $\\mathbf r_u\\times\\mathbf r_v$ normal to the surface?',
              answerOutline: 'Both $\\mathbf r_u$ and $\\mathbf r_v$ are tangent to the surface, and their cross product is perpendicular to both.',
            },
            {
              question: 'What is $dS$ for a graph $z=g(x,y)$?',
              answerOutline: '$\\sqrt{1+g_x^2+g_y^2}\\,dA$.',
            },
            {
              question: 'What is $dS$ on a sphere of radius $a$?',
              answerOutline: '$a^2\\sin\\varphi\\,d\\varphi\\,d\\theta$.',
            },
          ],
        },
        {
          slug: 'flux',
          title: 'Surface integrals and flux',
          summary:
            'Integrating a function over a surface, orienting a surface, and computing the flux of a field through it.',
          estimatedMinutes: 170,
          objectives: [
            'Compute surface integrals of scalar functions',
            'Choose and describe an orientation of a surface',
            'Compute the flux of a vector field through an oriented surface',
            'Interpret flux as a flow rate',
          ],
          concepts: [
            'Surface integral $\\iint f\\,dS$',
            'Orientable surface',
            'Unit normal $\\mathbf n$',
            'Flux $\\iint\\mathbf F\\cdot d\\mathbf S$',
            'Outward orientation of a closed surface',
          ],
          explanation: `**Scalar surface integrals** add up a function times area:

$$
\\iint_Sf\\,dS=\\iint_Df(\\mathbf r(u,v))\\,|\\mathbf r_u\\times\\mathbf r_v|\\,du\\,dv.
$$

With $f$ a density, this gives the mass of a thin shell. Divided by the area, it gives an average over the surface.

**Orientation.** To measure flow through a surface, we must say which way counts as positive. A surface is **orientable** if a unit normal $\\mathbf n$ can be chosen continuously all over it. A Mobius strip cannot, since it has only one side. For a closed surface, such as a sphere or the boundary of a solid, the standard choice is the **outward** normal. For a graph $z=g(x,y)$, the upward normal is the usual choice.

**Flux.** The **flux** of $\\mathbf F$ through the oriented surface $S$ is

$$
\\iint_S\\mathbf F\\cdot d\\mathbf S=\\iint_S\\mathbf F\\cdot\\mathbf n\\,dS=\\iint_D\\mathbf F(\\mathbf r(u,v))\\cdot(\\mathbf r_u\\times\\mathbf r_v)\\,du\\,dv,
$$

where the parametrisation is chosen so that $\\mathbf r_u\\times\\mathbf r_v$ points in the direction of the orientation. If it points the wrong way, change the sign. If $\\mathbf F$ is the velocity of a fluid, the flux is the volume of fluid crossing $S$ per unit time. Only the normal component of the field contributes: flow along the surface does not cross it.

For a graph $z=g(x,y)$ oriented upward, $d\\mathbf S=\\langle-g_x,-g_y,1\\rangle\\,dA$, so

$$
\\iint_S\\mathbf F\\cdot d\\mathbf S=\\iint_D\\left(-Pg_x-Qg_y+R\\right)dA.
$$

**Worked example 1.** Find the outward flux of $\\mathbf F=\\langle x,y,z\\rangle$ through the sphere of radius $a$. On the sphere the outward unit normal is $\\mathbf n=\\langle x,y,z\\rangle/a$, so $\\mathbf F\\cdot\\mathbf n=(x^2+y^2+z^2)/a=a$. The flux is $a\\cdot4\\pi a^2=4\\pi a^3$.

**Worked example 2.** Find the upward flux of $\\mathbf F=\\langle y,x,z\\rangle$ through the paraboloid $z=1-x^2-y^2$, $z\\ge0$. Here $g_x=-2x$ and $g_y=-2y$, so the integrand is

$$
-y(-2x)-x(-2y)+(1-x^2-y^2)=4xy+1-x^2-y^2.
$$

Over the unit disk the $4xy$ term integrates to zero by symmetry, and $\\int_0^{2\\pi}\\int_0^1(1-r^2)\\,r\\,dr\\,d\\theta=2\\pi\\cdot\\frac14=\\frac\\pi2$.

**Electric flux.** For the field of a point charge, $\\mathbf E=\\dfrac{q}{4\\pi\\varepsilon_0}\\dfrac{\\mathbf r}{|\\mathbf r|^3}$, the flux through a sphere centred on the charge is $q/\\varepsilon_0$, independent of the radius. The field weakens as $1/r^2$, and the area grows as $r^2$. That is Gauss's law, which the divergence theorem extends to any closed surface.`,
          resources: [
            openstax('6-6-surface-integrals', 'Surface integrals', 'Orientation and flux are in the second half.', true),
            paul('CalcIII/SurfaceIntegrals', 'Surface integrals', 'Scalar surface integrals.'),
            paul('CalcIII/SurfIntVectorField', 'Surface integrals of vector fields', 'Flux with orientation.'),
          ],
          relatedLessons: ['electromagnetism/electrostatics/gauss-law-and-the-divergence-of-e'],
          exercises: [
            {
              slug: 'scalar-surface-integrals',
              title: 'Scalar surface integrals',
              prompt: `(a) Evaluate $\\iint_Sz\\,dS$ over the upper unit hemisphere, and use it to find the average height of the hemisphere's surface. (b) A conical shell $z=\\sqrt{x^2+y^2}$, $0\\le z\\le1$, has density $\\delta=z$. Find its mass.`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) pi, with an average height of pi/(2 pi) = 1/2. (b) dS = sqrt 2 dA, so the mass is the integral of r sqrt 2 over the unit disk, 2 sqrt(2) pi/3.',
            },
            {
              slug: 'flux-drill',
              title: 'Flux',
              prompt: `Compute each flux: (a) $\\mathbf F=\\langle x,y,0\\rangle$ outward through the side of the cylinder $x^2+y^2=4$, $0\\le z\\le3$, (b) $\\mathbf F=\\langle0,0,z\\rangle$ upward through the part of the plane $z=1-x-y$ in the first octant, (c) $\\mathbf F=\\langle0,0,1\\rangle$ upward through any graph $z=g(x,y)$ over a region $D$. Explain (c) physically.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) 24 pi. (b) 1/6. (c) The area of D: a uniform vertical flow crosses any surface above D at the same rate as it crosses D.',
            },
            {
              slug: 'gauss-sphere',
              title: 'Flux of a point charge',
              prompt: `For $\\mathbf F=\\dfrac{\\mathbf r}{|\\mathbf r|^3}$, show that the outward flux through a sphere of any radius centred at the origin is $4\\pi$. Then compute the flux through a sphere of radius $1$ centred at $(3,0,0)$ by symmetry and the result of the next lessons, or by arguing about field lines. Explain the physical meaning.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For the off-centre sphere, every field line that enters also leaves, so the flux is 0.',
            },
          ],
          selfAssessment: [
            {
              question: 'What does the flux of a velocity field measure?',
              answerOutline: 'The volume of fluid crossing the surface per unit time.',
            },
            {
              question: 'How do you decide the sign of a flux integral?',
              answerOutline: 'Check that $\\mathbf r_u\\times\\mathbf r_v$ points in the chosen orientation, and change sign if not.',
            },
            {
              question: 'What is the upward $d\\mathbf S$ for a graph $z=g(x,y)$?',
              answerOutline: '$\\langle-g_x,-g_y,1\\rangle\\,dA$.',
            },
          ],
        },
        {
          slug: 'curl-and-divergence',
          title: 'Curl and divergence',
          summary:
            'Two derivatives of a vector field, what they measure, and the identities that connect them.',
          estimatedMinutes: 160,
          objectives: [
            'Compute the curl and divergence of a vector field',
            'Interpret curl as rotation and divergence as expansion',
            'Prove the identities $\\nabla\\times\\nabla f=\\mathbf 0$ and $\\nabla\\cdot(\\nabla\\times\\mathbf F)=0$',
            'Use the curl test for conservative fields in space',
            'Compute the Laplacian',
          ],
          concepts: [
            'Del operator $\\nabla$',
            'Curl $\\nabla\\times\\mathbf F$',
            'Divergence $\\nabla\\cdot\\mathbf F$',
            'Irrotational and incompressible fields',
            'Laplacian',
          ],
          explanation: `Write $\\nabla=\\left\\langle\\dfrac{\\partial}{\\partial x},\\dfrac{\\partial}{\\partial y},\\dfrac{\\partial}{\\partial z}\\right\\rangle$ as a formal vector. For $\\mathbf F=\\langle P,Q,R\\rangle$:

$$
\\text{curl}\\,\\mathbf F=\\nabla\\times\\mathbf F=\\left\\langle R_y-Q_z,\\ P_z-R_x,\\ Q_x-P_y\\right\\rangle,
$$

$$
\\text{div}\\,\\mathbf F=\\nabla\\cdot\\mathbf F=P_x+Q_y+R_z.
$$

The curl is a vector, and the divergence is a number at each point.

**Meanings.** The **divergence** measures the net outflow per unit volume: positive at a source, negative at a sink. The field $\\langle x,y,z\\rangle$ has divergence $3$ everywhere, since it spreads out uniformly. A field with zero divergence is **incompressible**: what flows into a small box flows out.

The **curl** measures rotation. Place a tiny paddle wheel in a flow. It spins fastest when its axle points along the curl, and its angular speed is half the size of the curl. The rotation $\\langle-y,x,0\\rangle$ has curl $\\langle0,0,2\\rangle$. A field with zero curl is **irrotational**. The $z$-component of the curl is the $Q_x-P_y$ of Green's theorem.

**Worked example.** For $\\mathbf F=\\langle xz,\\ xyz,\\ -y^2\\rangle$,

$$
\\nabla\\times\\mathbf F=\\left\\langle-2y-xy,\\ x-0,\\ yz-0\\right\\rangle=\\langle-2y-xy,\\ x,\\ yz\\rangle,
$$

$$
\\nabla\\cdot\\mathbf F=z+xz+0=z+xz.
$$

Compute each component carefully from the formula. The middle component is $P_z-R_x$, and its order is the usual place for a sign error.

**Two identities.** For functions with continuous second partials,

$$
\\nabla\\times(\\nabla f)=\\mathbf 0,\\qquad\\nabla\\cdot(\\nabla\\times\\mathbf F)=0.
$$

Both follow from equality of mixed partials. The first says that gradients have no rotation. **Conversely**, if $\\mathbf F$ is defined on all of space, or on a simply connected region, and $\\nabla\\times\\mathbf F=\\mathbf 0$, then $\\mathbf F$ is conservative. That is the three-dimensional version of the test $P_y=Q_x$. The second identity says that a curl field is incompressible, which, for example, is why magnetic fields, being curls, have zero divergence.

**The Laplacian.** The divergence of a gradient is the **Laplacian**:

$$
\\nabla^2f=\\nabla\\cdot\\nabla f=f_{xx}+f_{yy}+f_{zz}.
$$

Functions with $\\nabla^2f=0$ are **harmonic**. They describe steady temperatures and electrostatic potentials in empty space. An important example is $1/|\\mathbf r|$, which is harmonic everywhere except the origin.`,
          resources: [
            openstax('6-5-divergence-and-curl', 'Divergence and curl', 'Definitions, interpretations and identities.', true),
            paul('CalcIII/CurlDivergence', 'Curl and divergence', 'Computations and identities.'),
            khan('The divergence and curl videos, with fluid flow pictures.'),
          ],
          relatedLessons: ['math-methods/vector-calculus/vector-fields-div-grad-curl'],
          exercises: [
            {
              slug: 'curl-div-drill',
              title: 'Curl and divergence',
              prompt: `Compute the curl and divergence of each field: (a) $\\langle x^2y,\\ yz,\\ xz^2\\rangle$, (b) $\\langle e^x\\sin y,\\ e^x\\cos y,\\ z\\rangle$, (c) $\\boldsymbol\\omega\\times\\mathbf r$, for a constant vector $\\boldsymbol\\omega$ and $\\mathbf r=\\langle x,y,z\\rangle$. What does (c) represent physically?`,
              kind: 'problem',
              difficulty: 1,
              hint: '(a) curl <-y, -z^2, -x^2>, div 2xy + z + 2xz. (b) curl 0, div 1. (c) curl 2 omega, div 0: the velocity field of a rigid rotation with angular velocity omega.',
            },
            {
              slug: 'conservative-in-space',
              title: 'Conservative fields in space',
              prompt: `Decide whether each field is conservative on all of space, using the curl, and find a potential if it is: (a) $\\langle yz,\\ xz,\\ xy+2z\\rangle$, (b) $\\langle2xy,\\ x^2+z,\\ y\\rangle$, (c) $\\langle y,\\ x,\\ x\\rangle$. For (a), evaluate the line integral from $(0,0,0)$ to $(1,2,3)$.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) xyz + z^2, so the integral is 6 + 9 = 15. (b) x^2 y + yz. (c) not conservative: the curl is <0, -1, 0>.',
            },
            {
              slug: 'identities',
              title: 'Prove the identities',
              prompt: `(a) Prove that $\\nabla\\times(\\nabla f)=\\mathbf 0$ and $\\nabla\\cdot(\\nabla\\times\\mathbf F)=0$ from the component formulas. (b) Show that $f=1/|\\mathbf r|$ is harmonic for $\\mathbf r\\ne\\mathbf 0$. (c) Prove the product rule $\\nabla\\cdot(f\\mathbf F)=f\\,\\nabla\\cdot\\mathbf F+\\nabla f\\cdot\\mathbf F$, and use it to compute $\\nabla\\cdot(\\mathbf r/|\\mathbf r|^3)$ for $\\mathbf r\\ne\\mathbf 0$.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (c), the divergence of r is 3 and the gradient of |r|^(-3) is -3 r/|r|^5, which give 0.',
            },
          ],
          selfAssessment: [
            {
              question: 'Which is a vector and which a scalar: curl or divergence?',
              answerOutline: 'The curl is a vector and the divergence a scalar.',
            },
            {
              question: 'What does zero divergence mean physically?',
              answerOutline: 'The flow is incompressible: no net outflow from any small region.',
            },
            {
              question: 'What does $\\nabla\\times\\mathbf F=\\mathbf 0$ imply on all of space?',
              answerOutline: 'That $\\mathbf F$ is conservative, the gradient of some function.',
            },
          ],
        },
        {
          slug: 'stokes-theorem',
          title: "Stokes' theorem",
          summary:
            'Circulation around a curve equals the flux of the curl through any surface it bounds.',
          estimatedMinutes: 170,
          objectives: [
            "State Stokes' theorem with the orientation convention",
            'Use it to compute circulation from a surface integral',
            'Use it to compute a surface integral from a line integral',
            'Show that the flux of a curl depends only on the boundary',
            'Explain the theorem as a statement about circulation density',
          ],
          concepts: [
            "Stokes' theorem",
            'Induced orientation of the boundary',
            'Circulation',
            'Surface independence',
            'Curl as circulation per unit area',
          ],
          explanation: `**Stokes' theorem.** Let $S$ be an oriented, piecewise smooth surface whose boundary $C$ is a simple, closed, piecewise smooth curve, with the **positive** orientation: walking along $C$ with your head pointing along the normal $\\mathbf n$, the surface is on your left. If $\\mathbf F$ has continuous partial derivatives on an open region containing $S$, then

$$
\\oint_C\\mathbf F\\cdot d\\mathbf r=\\iint_S(\\nabla\\times\\mathbf F)\\cdot d\\mathbf S.
$$

Green's theorem is the case of a flat surface in the $xy$-plane with upward normal. The reasoning is the same: the component of the curl along $\\mathbf n$ is the circulation per unit area around a tiny loop in the surface. Adding up tiny loops, the interior edges cancel, and the boundary is left.

**Surface independence.** The right side depends only on the boundary curve. Any two surfaces with the same oriented boundary have the same flux of $\\nabla\\times\\mathbf F$. So you may replace a curved surface with a flat disk, which is often far easier.

**Worked example 1.** Let $\\mathbf F=\\langle-y,x,z\\rangle$, and let $S$ be the upper unit hemisphere, oriented outward. Its boundary is the unit circle in the $xy$-plane, anticlockwise when seen from above.

*Line integral:* with $\\mathbf r=\\langle\\cos t,\\sin t,0\\rangle$, $\\mathbf F\\cdot\\mathbf r'=\\sin^2t+\\cos^2t=1$, so the circulation is $2\\pi$.

*Surface integral:* $\\nabla\\times\\mathbf F=\\langle0,0,2\\rangle$. Replace the hemisphere by the flat unit disk with upward normal. The flux is $2\\cdot\\pi=2\\pi$. The two sides agree.

**Worked example 2.** Evaluate $\\oint_C\\mathbf F\\cdot d\\mathbf r$ for $\\mathbf F=\\langle-y^3,\\ x^3,\\ -z^3\\rangle$, where $C$ is the curve where the cylinder $x^2+y^2=1$ meets the plane $x+y+z=1$, anticlockwise from above. Parametrising $C$ is possible but unpleasant. Instead, the curl is $\\langle0,0,3x^2+3y^2\\rangle$. Take $S$ to be the part of the plane inside the cylinder, oriented upward. As the graph $z=1-x-y$, it has $d\\mathbf S=\\langle1,1,1\\rangle\\,dA$ over the unit disk, so

$$
\\oint_C\\mathbf F\\cdot d\\mathbf r=\\iint_{x^2+y^2\\le1}3(x^2+y^2)\\,dA=3\\int_0^{2\\pi}\\int_0^1r^3\\,dr\\,d\\theta=\\frac{3\\pi}{2}.
$$

**Physics.** Faraday's law in integral form says that the voltage induced around a loop equals minus the rate of change of magnetic flux through it. Stokes' theorem converts this into the differential form $\\nabla\\times\\mathbf E=-\\partial\\mathbf B/\\partial t$, which holds at each point. Several of Maxwell's equations are linked to their integral forms in exactly this way.

The orientation rule is the commonest source of sign errors. Before you compute, decide the direction of the normal, then check that the boundary direction agrees with the right-hand rule.`,
          resources: [
            openstax('6-7-stokes-theorem', "Stokes' theorem", 'Statement, orientation and surface independence.', true),
            paul('CalcIII/StokesTheorem', "Stokes' theorem", 'Worked examples in both directions.'),
            mit1802('The sessions on Stokes\' theorem, with the circulation interpretation.'),
          ],
          relatedLessons: ['math-methods/vector-calculus/integral-theorems'],
          exercises: [
            {
              slug: 'verify-stokes',
              title: "Verify Stokes' theorem",
              prompt: `Let $\\mathbf F=\\langle y,z,x\\rangle$, and let $S$ be the triangle with vertices $(1,0,0)$, $(0,1,0)$ and $(0,0,1)$, oriented upward. Compute the flux of $\\nabla\\times\\mathbf F$ through $S$. Then compute $\\oint_C\\mathbf F\\cdot d\\mathbf r$ around the three edges, in the direction that Stokes' theorem requires, and confirm that the two agree.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The curl is <-1, -1, -1>, and dS = <1, 1, 1> dA over a triangle of area 1/2. Both sides equal -3/2.',
            },
            {
              slug: 'stokes-shortcuts',
              title: 'Use the easier side',
              prompt: `(a) Evaluate $\\iint_S(\\nabla\\times\\mathbf F)\\cdot d\\mathbf S$ for $\\mathbf F=\\langle xz,\\ yz,\\ xy\\rangle$, where $S$ is the part of the sphere $x^2+y^2+z^2=4$ inside the cylinder $x^2+y^2=1$ and above the $xy$-plane, oriented upward. Use the boundary circle. (b) Explain why the flux of any curl through a closed surface, such as a whole sphere, is zero.`,
              kind: 'problem',
              difficulty: 2,
              hint: '(a) The boundary is the circle x^2 + y^2 = 1 at height z = sqrt 3. Along it F . r prime = sqrt(3)(-cos t sin t + sin t cos t) + 0 = 0, so the answer is 0. (b) A closed surface has no boundary, or split it into two halves with opposite boundary orientations.',
            },
            {
              slug: 'curl-meaning',
              title: 'What the curl measures',
              prompt: `Use Stokes' theorem on a small disk of radius $\\varepsilon$ centred at a point $P$, with unit normal $\\mathbf n$, to show that $(\\nabla\\times\\mathbf F)(P)\\cdot\\mathbf n=\\lim_{\\varepsilon\\to0}\\dfrac{1}{\\pi\\varepsilon^2}\\oint_{C_\\varepsilon}\\mathbf F\\cdot d\\mathbf r$. Explain why this makes the curl a circulation per unit area, and why a paddle wheel spins fastest when its axle points along the curl.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'Use continuity of the curl: on a tiny disk it is almost constant, so the flux is about (curl F . n) times pi epsilon^2.',
            },
          ],
          selfAssessment: [
            {
              question: "State Stokes' theorem.",
              answerOutline: 'The circulation of $\\mathbf F$ around the positively oriented boundary equals the flux of $\\nabla\\times\\mathbf F$ through the surface.',
            },
            {
              question: 'What is the positive orientation of the boundary?',
              answerOutline: 'Walking along it with your head along $\\mathbf n$, the surface is on your left.',
            },
            {
              question: 'Why may you replace a curved surface by a flat one in Stokes\' theorem?',
              answerOutline: 'The flux of a curl depends only on the boundary curve and its orientation.',
            },
          ],
        },
        {
          slug: 'divergence-theorem',
          title: 'The divergence theorem',
          summary:
            'The outward flux through a closed surface equals the integral of the divergence over the solid inside.',
          estimatedMinutes: 180,
          objectives: [
            'State the divergence theorem with its hypotheses',
            'Use it to compute flux through closed surfaces',
            'Handle solids with cavities and fields with singularities',
            'Derive Gauss\'s law and a conservation law',
            'See the integral theorems as one idea',
          ],
          concepts: [
            'Divergence theorem',
            'Closed surface with outward orientation',
            'Solids with cavities',
            "Gauss's law",
            'Continuity equation',
            'Fundamental theorems compared',
          ],
          explanation: `**Divergence theorem (Gauss's theorem).** Let $E$ be a solid region whose boundary surface $S$ is closed, piecewise smooth and oriented outward. If $\\mathbf F$ has continuous partial derivatives on an open region containing $E$, then

$$
\\iint_S\\mathbf F\\cdot d\\mathbf S=\\iiint_E\\nabla\\cdot\\mathbf F\\,dV.
$$

The divergence is outflow per unit volume, so adding it over the solid gives the total outflow, which is the flux through the boundary. Again, interior faces of tiny boxes cancel, and only the outer surface remains.

**Worked example 1.** For $\\mathbf F=\\langle x,y,z\\rangle$ on the ball of radius $a$, $\\nabla\\cdot\\mathbf F=3$, so the flux is $3\\cdot\\tfrac43\\pi a^3=4\\pi a^3$. This agrees with the direct computation of the previous lessons.

**Worked example 2.** Find the outward flux of $\\mathbf F=\\langle x^3,y^3,z^3\\rangle$ through the sphere of radius $a$. Directly, this is unpleasant. With the theorem, $\\nabla\\cdot\\mathbf F=3(x^2+y^2+z^2)=3\\rho^2$, and in spherical coordinates

$$
\\iiint3\\rho^2\\,dV=3\\int_0^{2\\pi}\\int_0^\\pi\\int_0^a\\rho^4\\sin\\varphi\\,d\\rho\\,d\\varphi\\,d\\theta=3\\cdot4\\pi\\cdot\\frac{a^5}{5}=\\frac{12\\pi a^5}{5}.
$$

**Closed surfaces only.** The theorem needs a closed surface. To find the flux through an open surface, such as a hemisphere, you can close it with a flat disk, apply the theorem to the solid, and subtract the flux through the disk.

**Singularities and Gauss's law.** The field $\\mathbf F=\\mathbf r/|\\mathbf r|^3$ has zero divergence away from the origin, yet its flux through any sphere around the origin is $4\\pi$. There is no contradiction, because $\\mathbf F$ is not defined at the origin, so the theorem cannot be used on a ball that contains it. Instead, apply it to the region between any closed surface $S$ enclosing the origin and a small sphere inside it. The divergence is zero there, so the flux out through $S$ equals the flux out through the small sphere, which is $4\\pi$. So the flux through every closed surface enclosing the origin is $4\\pi$, and it is $0$ through those that do not. For an electric field this is **Gauss's law**: the flux through a closed surface is $q_{\\text{enclosed}}/\\varepsilon_0$.

**Conservation laws.** If $\\rho$ is the density of a fluid and $\\mathbf v$ its velocity, then the rate of loss of mass from a region equals the outward flux of $\\rho\\mathbf v$. Using the theorem on an arbitrary small region gives the **continuity equation** $\\dfrac{\\partial\\rho}{\\partial t}+\\nabla\\cdot(\\rho\\mathbf v)=0$. The heat equation and much of physics come from the same argument.

**One idea.** The fundamental theorem of calculus, the theorem for line integrals, and the theorems of Green, Stokes and Gauss all say the same thing: the integral of a derivative over a region equals an integral of the original quantity over the boundary. In higher mathematics they become one theorem, the general Stokes theorem.`,
          resources: [
            openstax('6-8-the-divergence-theorem', 'The divergence theorem', 'Statement, cavities, and Gauss\'s law.', true),
            paul('CalcIII/DivergenceTheorem', 'Divergence theorem', 'Worked examples.'),
            mit1802('The sessions on the divergence theorem and its physical meaning.'),
          ],
          relatedLessons: ['electromagnetism/electrostatics/gauss-law-and-the-divergence-of-e'],
          exercises: [
            {
              slug: 'divergence-drill',
              title: 'Flux through closed surfaces',
              prompt: `Use the divergence theorem to find each outward flux: (a) $\\mathbf F=\\langle xy,yz,zx\\rangle$ through the surface of the cube $[0,1]^3$, (b) $\\mathbf F=\\langle x^2,y^2,z^2\\rangle$ through the closed cylinder $x^2+y^2\\le1$, $0\\le z\\le2$, including top and bottom, (c) $\\mathbf F=\\langle x,y,z\\rangle$ through the surface of the solid between the spheres of radius $1$ and $2$.`,
              kind: 'problem',
              difficulty: 1,
              hint: 'Answers: (a) 3/2; (b) 4 pi; (c) 28 pi.',
            },
            {
              slug: 'verify-divergence',
              title: 'Check both sides',
              prompt: `For $\\mathbf F=\\langle0,0,z\\rangle$ and the solid upper half of the unit ball, verify the divergence theorem. Compute the flux through the curved hemisphere and through the flat disk at the bottom separately, add them, and compare with $\\iiint\\nabla\\cdot\\mathbf F\\,dV$. Then use the same closing idea to find the flux of $\\langle x,y,z\\rangle$ upward through the paraboloid $z=1-x^2-y^2$, $z\\ge0$.`,
              kind: 'problem',
              difficulty: 2,
              hint: 'The hemisphere gives 2 pi/3 and the disk gives 0, matching the volume 2 pi/3. For the paraboloid: div = 3 and the solid has volume pi/2, so the closed flux is 3 pi/2; the bottom disk contributes 0, so the answer is 3 pi/2.',
            },
            {
              slug: 'gauss-law-derivation',
              title: "Gauss's law and conservation",
              prompt: `(a) Using the region between a closed surface $S$ and a small sphere, prove that the outward flux of $\\mathbf r/|\\mathbf r|^3$ through any closed surface enclosing the origin is $4\\pi$. (b) Derive the continuity equation $\\partial\\rho/\\partial t+\\nabla\\cdot(\\rho\\mathbf v)=0$ from conservation of mass, using the divergence theorem and the fact that a function whose integral over every small ball is zero must itself be zero, if it is continuous.`,
              kind: 'derivation',
              difficulty: 3,
              hint: 'For (a), the boundary of the region between the surfaces consists of S oriented outward and the small sphere oriented inward.',
            },
          ],
          selfAssessment: [
            {
              question: 'State the divergence theorem.',
              answerOutline: 'The outward flux of $\\mathbf F$ through a closed surface equals the triple integral of $\\nabla\\cdot\\mathbf F$ over the solid it encloses.',
            },
            {
              question: 'How do you find the flux through an open surface with the theorem?',
              answerOutline: 'Close it with a simple surface, use the theorem on the solid, and subtract the flux through the added piece.',
            },
            {
              question: 'Why does $\\mathbf r/|\\mathbf r|^3$ have flux $4\\pi$ through a sphere while its divergence is zero?',
              answerOutline: 'The field is singular at the origin, inside the sphere, so the theorem does not apply there.',
            },
          ],
        },
      ],
      project: {
        slug: 'flux-of-a-flow',
        title: 'Measure circulation and flux numerically',
        description: `Write a short program that computes line integrals and surface integrals numerically for any field, using a parametrisation and the midpoint rule in one or two variables. Test it on the worked examples of this module. Then use it to verify Stokes' theorem and the divergence theorem for a field of your own choice that is too awkward to integrate by hand, on a surface that is not a sphere or a plane, such as a torus or a paraboloid with a cap. Study how the error shrinks as you refine the grid. Finally, take the field $\\mathbf r/|\\mathbf r|^3$, compute its flux through an off-centre sphere that contains the origin, and through one that does not, and explain the results with the divergence theorem.`,
        deliverables: [
          'A working program for line and flux integrals, with tests against the worked examples',
          'A numerical check of Stokes\' theorem for a non-trivial field and surface',
          'A numerical check of the divergence theorem for the same or another field, comparing both sides',
          'A table of errors against grid size for at least one integral',
          'Flux results for the inverse-square field through spheres that do and do not contain the origin, with an explanation',
        ],
        estimatedHours: 7,
        stretchGoals: ['Visualise the field and the surface normals in three dimensions'],
      },
    },
  ],
  capstone: {
    slug: 'mountain-model',
    title: 'A mathematical model of a mountain',
    description: `Model a real hill or mountain and analyse it with the whole course. Take a height function $h(x,y)$ that you can handle by hand, built for example from a sum of a few Gaussian bumps $Ae^{-((x-a)^2+(y-b)^2)/s^2}$, fitted by eye to a contour map of a real place from a public source such as the US Geological Survey's topographic maps. If you prefer, work with real elevation data on a grid and use finite differences in place of derivatives.

Then answer, with every computation shown:

1. Where are the summits, the passes between them, and the lowest points? Classify the critical points with the second derivative test.
2. At a point of your choice, what is the steepest direction and slope, and the slope along a given trail direction? Draw the gradient on the contour map.
3. Which route does water take from a chosen point? Trace a path of steepest descent numerically, following $-\\nabla h$.
4. What is the volume of rock above a base level, as a double integral, and the area of the hill's surface, as a surface integral?
5. How much work does a hiker of mass $70$ kg do against gravity along a trail, as a line integral? Show by the fundamental theorem that it depends only on the end points, and compare it with the length of the trail.
6. Rain falls at a steady rate. Model the flow of water over the surface as a field proportional to $-\\nabla h$, and use the divergence form of Green's theorem on a region to relate the flow out across its boundary to the total of $-\\nabla^2h$ inside.

The result should be a short illustrated report in which each section names the theorem or technique it uses.`,
    deliverables: [
      'The height function, its source map, and a contour plot with labelled summits and passes',
      'A classification of all critical points by the second derivative test',
      'Gradient and directional derivative calculations at chosen points, drawn on the map',
      'A numerically traced path of steepest descent, with a description of the method',
      'The volume above a base level and the surface area, as computed integrals with a numerical check',
      'The work done along a trail, computed as a line integral and confirmed by the fundamental theorem for line integrals',
      'A flux computation across a closed boundary, checked against the double integral given by Green\'s theorem',
      'A two-page conclusion on what the model gets right and wrong about the real landscape',
    ],
    estimatedHours: 14,
    stretchGoals: [
      'Use real elevation data on a grid and compare finite-difference gradients with your smooth model',
      'Find the highest point along a fixed trail with a Lagrange multiplier',
    ],
  },
  masteryChecklist: [
    'I can compute dot and cross products and use them for angles, projections, areas, volumes and torque',
    'I can write equations of lines and planes, and compute distances and intersections',
    'I can recognise quadric surfaces and work in cylindrical and spherical coordinates',
    'I can compute velocity, acceleration, arc length and curvature for a curve in space',
    'I can compute partial derivatives, tangent planes, linear approximations and the chain rule',
    'I can use the gradient for directional derivatives, steepest ascent and normals to level surfaces',
    'I can find and classify critical points and solve constrained problems with Lagrange multipliers',
    'I can set up and evaluate double and triple integrals in Cartesian, polar, cylindrical and spherical coordinates, and change variables with a Jacobian',
    'I can compute line integrals and recognise and use conservative fields',
    'I can compute surface areas, surface integrals and flux',
    "I can state and apply Green's theorem, Stokes' theorem and the divergence theorem, with correct orientations",
  ],
});
